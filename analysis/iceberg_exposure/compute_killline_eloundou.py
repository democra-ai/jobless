#!/usr/bin/env python3
"""Kill Line calculation using Eloundou (2023) exposure data.

New method:
  E = Eloundou β (GPT-4 + human labeled, 19,265 tasks, 923 occupations)
  P = GDPval win_or_tie_rate (44 direct + sector/global fallback)
  Employment = BLS IN4 2024 (141M jobs)

  Kill Line = Σ(emp × E_occ × P_occ) / Σ(emp)

Advantages over old Anthropic-penetration method:
  - E covers ALL O*NET tasks (not just those observed in Claude conversations)
  - E measures "can AI do this?" (capability) not "are people using AI for this?" (adoption)
  - Full 923 O*NET occupations coverage
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, Tuple

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent
DATA = ROOT.parent.parent / "data"
REPORT_PATH = ROOT / "killline_eloundou_report.md"

# ──────────────────────────────────────────────
# 1. Eloundou exposure (task-level & occupation-level)
# ──────────────────────────────────────────────
def load_eloundou_task_level() -> pd.DataFrame:
    """Load 19,265 task-level exposure labels."""
    df = pd.read_csv(DATA / "gpts-are-gpts" / "full_labelset.tsv", sep="\t")
    df["soc_code"] = df["O*NET-SOC Code"].str.extract(r"(\d{2}-\d{4})")
    df["soc_major"] = df["soc_code"].str[:2]
    print(f"[Eloundou tasks] {len(df)} tasks, {df['soc_code'].nunique()} SOC codes, {df['O*NET-SOC Code'].nunique()} O*NET codes")
    return df


def load_eloundou_occ_level() -> pd.DataFrame:
    """Load 923 occupation-level exposure ratings."""
    df = pd.read_csv(DATA / "gpts-are-gpts" / "occ_level.csv")
    df["soc_code"] = df["O*NET-SOC Code"].str.extract(r"(\d{2}-\d{4})")
    df["soc_major"] = df["soc_code"].str[:2]

    # Aggregate sub-occupations (e.g., 17-2112.01/.02/.03) to SOC-6
    occ = df.groupby("soc_code").agg(
        Title=("Title", "first"),
        dv_alpha=("dv_rating_alpha", "mean"),
        dv_beta=("dv_rating_beta", "mean"),
        dv_gamma=("dv_rating_gamma", "mean"),
        human_alpha=("human_rating_alpha", "mean"),
        human_beta=("human_rating_beta", "mean"),
        human_gamma=("human_rating_gamma", "mean"),
        soc_major=("soc_major", "first"),
        n_onet_codes=("O*NET-SOC Code", "nunique"),
    ).reset_index()
    print(f"[Eloundou occ] {len(occ)} SOC-6 occupations (from {len(df)} O*NET codes)")
    return occ


# ──────────────────────────────────────────────
# 2. Eloundou task-level → occupation-level aggregation
# ──────────────────────────────────────────────
def compute_task_level_exposure(tasks: pd.DataFrame) -> pd.DataFrame:
    """Compute occupation-level exposure from task-level labels.

    For each occupation, compute:
      - pct_E0/E1/E2 for both GPT-4 and human labels
      - α, β, γ from task counts
      - automation score mean
    """
    # Load task weights from Eloundou
    weights = pd.read_csv(DATA / "gpts-are-gpts" / "full_onet_data.tsv", sep="\t")
    weights.columns = [c.strip() for c in weights.columns]
    weights["soc_code"] = weights["O*NET-SOC Code"].str.extract(r"(\d{2}-\d{4})")
    weights = weights.rename(columns={"Task Type": "TaskType"})
    weights = weights[["O*NET-SOC Code", "Task ID", "coreweight", "equalweight", "TaskType"]].copy()

    tasks = tasks.merge(
        weights[["O*NET-SOC Code", "Task ID", "coreweight", "TaskType"]],
        on=["O*NET-SOC Code", "Task ID"], how="left"
    )
    tasks["weight"] = tasks["coreweight"].fillna(1).astype(float)

    def agg_occ(g):
        n = len(g)
        w = g["weight"].values
        w_sum = w.sum()
        if w_sum == 0:
            w = np.ones(n)
            w_sum = n

        # GPT-4 exposure
        e0_gpt4 = (g["gpt4_exposure"] == "E0").sum()
        e1_gpt4 = (g["gpt4_exposure"] == "E1").sum()
        e2_gpt4 = (g["gpt4_exposure"] == "E2").sum()

        # Human exposure
        e0_human = (g["human_exposure_agg"] == "E0").sum()
        e1_human = (g["human_exposure_agg"] == "E1").sum()
        e2_human = (g["human_exposure_agg"] == "E2").sum()

        # Core vs supplemental
        n_core = (g["TaskType"] == "Core").sum() if "TaskType" in g.columns else 0

        return pd.Series({
            "n_tasks": n,
            "n_core": n_core,
            # GPT-4
            "alpha_gpt4": e1_gpt4 / n,
            "beta_gpt4": (e1_gpt4 + e2_gpt4) / n,
            "gamma_gpt4": np.average(g["gamma"].values, weights=w),
            "pct_E0_gpt4": e0_gpt4 / n,
            "pct_E1_gpt4": e1_gpt4 / n,
            "pct_E2_gpt4": e2_gpt4 / n,
            # Human
            "alpha_human": e1_human / n,
            "beta_human": (e1_human + e2_human) / n,
            "gamma_human": np.average(g["gamma"].values, weights=w),  # gamma uses aggregated labels
            "pct_E0_human": e0_human / n,
            "pct_E1_human": e1_human / n,
            "pct_E2_human": e2_human / n,
            # Automation
            "mean_automation": g["automation"].mean(),
        })

    occ_from_tasks = tasks.groupby("soc_code").apply(agg_occ, include_groups=False).reset_index()
    occ_from_tasks["soc_major"] = occ_from_tasks["soc_code"].str[:2]
    print(f"[Task aggregation] {len(occ_from_tasks)} occupations from task-level data")
    return occ_from_tasks


# ──────────────────────────────────────────────
# 3. BLS Employment (IN4 2024)
# ──────────────────────────────────────────────
def load_employment() -> pd.DataFrame:
    """Load BLS IN4 2024 employment data."""
    import compute_gdpval_replacement_risk_rigorous as rig
    ind24 = rig.read_industry_detail_2024()
    emp = (
        ind24.groupby("occ_code", as_index=False)
        .agg(employment=("tot_emp", "sum"))
        .rename(columns={"occ_code": "soc_code"})
    )
    emp = emp[emp["employment"] > 0].copy()

    # O*NET titles
    onet_dir = ROOT / "data" / "raw" / "onet"
    occ_data = pd.read_csv(onet_dir / "Occupation%20Data.txt", sep="\t", dtype=str)
    occ_data.columns = [c.strip() for c in occ_data.columns]
    occ_data["soc_code"] = occ_data["O*NET-SOC Code"].str.extract(r"(\d{2}-\d{4})")
    titles = occ_data.drop_duplicates("soc_code")[["soc_code", "Title"]].rename(columns={"Title": "occupation_title"})
    emp = emp.merge(titles, on="soc_code", how="left")
    print(f"[BLS IN4 2024] {len(emp)} occupations, total={emp['employment'].sum():,.0f}")
    return emp


# ──────────────────────────────────────────────
# 4. GDPval P values
# ──────────────────────────────────────────────
GDPVAL_OCC_TO_SOC: Dict[str, str] = {
    "Customer Service Representatives": "43-4051",
    "Financial Managers": "11-3031",
    "Financial and Investment Analysts": "13-2051",
    "Personal Financial Advisors": "13-2052",
    "Securities, Commodities, and Financial Services Sales Agents": "41-3031",
    "Administrative Services Managers": "11-3012",
    "Child, Family, and School Social Workers": "21-1021",
    "Compliance Officers": "13-1041",
    "First-Line Supervisors of Police and Detectives": "33-1012",
    "Recreation Workers": "39-9032",
    "First-Line Supervisors of Office and Administrative Support Workers": "43-1011",
    "Medical Secretaries and Administrative Assistants": "43-6013",
    "Medical and Health Services Managers": "11-9111",
    "Nurse Practitioners": "29-1171",
    "Registered Nurses": "29-1141",
    "Audio and Video Technicians": "27-4011",
    "Editors": "27-3041",
    "Film and Video Editors": "27-4032",
    "News Analysts, Reporters, and Journalists": "27-3023",
    "Producers and Directors": "27-2012",
    "Buyers and Purchasing Agents": "13-1020",
    "First-Line Supervisors of Production and Operating Workers": "51-1011",
    "Industrial Engineers": "17-2112",
    "Mechanical Engineers": "17-2141",
    "Shipping, Receiving, and Inventory Clerks": "43-5071",
    "Accountants and Auditors": "13-2011",
    "Computer and Information Systems Managers": "11-3021",
    "Lawyers": "23-1011",
    "Project Management Specialists": "13-1082",
    "Software Developers": "15-1252",
    "Concierges": "39-6012",
    "Counter and Rental Clerks": "41-2021",
    "Property, Real Estate, and Community Association Managers": "11-9141",
    "Real Estate Brokers": "41-9021",
    "Real Estate Sales Agents": "41-9022",
    "First-Line Supervisors of Retail Sales Workers": "41-1011",
    "General and Operations Managers": "11-1021",
    "Pharmacists": "29-1051",
    "Private Detectives and Investigators": "33-9021",
    "First-Line Supervisors of Non-Retail Sales Workers": "41-1012",
    "Order Clerks": "43-4151",
    "Sales Managers": "11-2022",
    "Sales Representatives, Wholesale and Manufacturing, Except Technical and Scientific Products": "41-4012",
    "Sales Representatives, Wholesale and Manufacturing, Technical and Scientific Products": "41-4011",
}

SECTOR_TO_MAJOR: Dict[str, List[str]] = {
    "Finance and Insurance": ["13"],
    "Government": ["11", "21", "33"],
    "Health Care and Social Assistance": ["29", "31"],
    "Information": ["27"],
    "Manufacturing": ["17", "49", "51"],
    "Professional, Scientific, and Technical Services": ["15", "23"],
    "Real Estate and Rental and Leasing": ["41", "43"],
    "Retail Trade": ["41"],
    "Wholesale Trade": ["41"],
}

SOC_MAJOR_NAMES = {
    "11": "Management", "13": "Business & Financial", "15": "Computer & Math",
    "17": "Architecture & Engineering", "19": "Life & Social Science",
    "21": "Community & Social Service", "23": "Legal", "25": "Education",
    "27": "Arts & Media", "29": "Healthcare Practitioners", "31": "Healthcare Support",
    "33": "Protective Service", "35": "Food Preparation", "37": "Building & Grounds",
    "39": "Personal Care", "41": "Sales", "43": "Office & Admin",
    "45": "Farming & Fishing", "47": "Construction", "49": "Installation & Repair",
    "51": "Production", "53": "Transportation",
}


def load_gdpval() -> Tuple[Dict[str, Dict], Dict[str, Dict], Dict]:
    """Load GDPval GPT-5.2 win rates."""
    with open(DATA / "gdpval" / "gdpval_complete_data.json") as f:
        gdp = json.load(f)

    model_id = "gpt-5p2-high"

    overall = {"win": 0.4975, "wintie": 0.7086}
    for e in gdp["overall"]:
        if e.get("model") == model_id:
            overall = {"win": e["win_rate"], "wintie": e["win_or_tie_rate"]}

    occ_win = {}
    for label, entries in gdp["by_occupation"].items():
        if isinstance(entries, str):
            entries = eval(entries)
        for e in entries:
            if e.get("model") == model_id:
                occ_win[e["occupation"]] = {"win": e["win_rate"], "wintie": e["win_or_tie_rate"]}

    sector_win = {}
    for label, entries in gdp["by_sector"].items():
        if isinstance(entries, str):
            entries = eval(entries)
        for e in entries:
            if e.get("model") == model_id:
                sector_win[e["sector"]] = {"win": e["win_rate"], "wintie": e["win_or_tie_rate"]}

    print(f"[GDPval] model={model_id}, {len(occ_win)} occupations, {len(sector_win)} sectors")
    return occ_win, sector_win, overall


def build_p_map(occ_win, sector_win, overall):
    """Build SOC → P mapping with fallback chain."""
    # Direct
    soc_direct = {}
    for occ_name, rates in occ_win.items():
        soc = GDPVAL_OCC_TO_SOC.get(occ_name)
        if soc:
            soc_direct[soc] = rates

    # Sector → major group
    major_rates: Dict[str, List] = {}
    for sec, rates in sector_win.items():
        for m in SECTOR_TO_MAJOR.get(sec, []):
            major_rates.setdefault(m, []).append(rates)
    soc_major_fb = {
        m: {"win": np.mean([r["win"] for r in rs]), "wintie": np.mean([r["wintie"] for r in rs])}
        for m, rs in major_rates.items()
    }

    def get_p(soc, soc_major):
        if soc in soc_direct:
            return soc_direct[soc]["win"], soc_direct[soc]["wintie"], "direct"
        if soc_major in soc_major_fb:
            return soc_major_fb[soc_major]["win"], soc_major_fb[soc_major]["wintie"], "sector"
        return overall["win"], overall["wintie"], "global"

    return get_p


# ──────────────────────────────────────────────
# 5. Main pipeline
# ──────────────────────────────────────────────
def run():
    # Load data
    tasks = load_eloundou_task_level()
    occ_el = load_eloundou_occ_level()
    task_agg = compute_task_level_exposure(tasks)
    emp = load_employment()
    occ_win, sector_win, overall = load_gdpval()
    get_p = build_p_map(occ_win, sector_win, overall)

    # Merge: Eloundou occ-level + task aggregation + employment
    merged = occ_el.merge(task_agg, on="soc_code", how="left", suffixes=("_occ", "_task"))
    merged = merged.merge(emp[["soc_code", "employment", "occupation_title"]], on="soc_code", how="left")
    merged["employment"] = merged["employment"].fillna(0)

    # Assign P values
    p_results = [get_p(s, m) for s, m in zip(merged["soc_code"], merged["soc_major_occ"])]
    merged["P_win"], merged["P_wintie"], merged["P_source"] = zip(*p_results)

    # Compute Kill Line for each E definition
    has_emp = merged[merged["employment"] > 0].copy()
    total_emp = has_emp["employment"].sum()

    E_DEFINITIONS = [
        ("dv_alpha",   "α(GPT-4): 纯LLM直接暴露"),
        ("dv_beta",    "β(GPT-4): LLM+工具能加速≥50%"),
        ("dv_gamma",   "γ(GPT-4): 最宽泛暴露度"),
        ("human_alpha","α(人类): 纯LLM直接暴露"),
        ("human_beta", "β(人类): LLM+工具能加速≥50%"),
        ("human_gamma","γ(人类): 最宽泛暴露度"),
    ]

    results = {}
    for e_col, e_name in E_DEFINITIONS:
        E_nat = np.average(has_emp[e_col], weights=has_emp["employment"])
        P_wt_nat = np.average(has_emp["P_wintie"], weights=has_emp["employment"])
        P_w_nat = np.average(has_emp["P_win"], weights=has_emp["employment"])

        # Kill Line = Σ(emp × E × P) / Σ(emp)
        has_emp[f"risk_wintie_{e_col}"] = has_emp[e_col] * has_emp["P_wintie"]
        has_emp[f"risk_win_{e_col}"] = has_emp[e_col] * has_emp["P_win"]

        KL_wt = np.average(has_emp[f"risk_wintie_{e_col}"], weights=has_emp["employment"])
        KL_w = np.average(has_emp[f"risk_win_{e_col}"], weights=has_emp["employment"])

        results[e_col] = {
            "name": e_name, "E": E_nat, "P_wintie": P_wt_nat, "P_win": P_w_nat,
            "KL_wintie": KL_wt, "KL_win": KL_w,
        }

    # ── Build report ──
    L = []
    w = L.append

    w("# Kill Line Report: Eloundou (2023) Exposure + GDPval Win Rate")
    w("")
    w("> **Method**: E from Eloundou et al. (2023) task-level expert labels, P from OpenAI GDPval (GPT-5.2)")
    w(">")
    w("> **Formula**: `Kill Line = Σ(employment × E_occ × P_occ) / Σ(employment)`")
    w("")

    w("## 1. Data Coverage")
    w("")
    w(f"| Metric | Value |")
    w(f"|--------|-------|")
    w(f"| Eloundou task-level labels | {len(tasks):,} tasks across {tasks['O*NET-SOC Code'].nunique()} O*NET codes |")
    w(f"| Eloundou occupation-level | {len(occ_el)} SOC-6 occupations |")
    w(f"| BLS employment (IN4 2024) | {len(has_emp)} occupations, {total_emp:,.0f} total jobs |")
    w(f"| GDPval direct P matches | {(has_emp['P_source'] == 'direct').sum()} occupations ({has_emp[has_emp['P_source']=='direct']['employment'].sum():,.0f} jobs) |")
    w(f"| GDPval sector fallback | {(has_emp['P_source'] == 'sector').sum()} occupations ({has_emp[has_emp['P_source']=='sector']['employment'].sum():,.0f} jobs) |")
    w(f"| GDPval global fallback | {(has_emp['P_source'] == 'global').sum()} occupations ({has_emp[has_emp['P_source']=='global']['employment'].sum():,.0f} jobs) |")
    w("")

    w("## 2. Kill Line Results")
    w("")
    w("| E Definition | E (就业加权) | P_wintie | P_win | **KL (win+tie)** | **KL (win-only)** |")
    w("|---|---|---|---|---|---|")
    for e_col, e_name in E_DEFINITIONS:
        r = results[e_col]
        marker = " **← 推荐**" if e_col == "dv_beta" else ""
        w(f"| {r['name']} | {r['E']:.1%} | {r['P_wintie']:.1%} | {r['P_win']:.1%} | **{r['KL_wintie']:.2%}** | {r['KL_win']:.2%} |{marker}")
    w("")

    # Recommended value
    rec = results["dv_beta"]
    w(f"### 推荐值: **{rec['KL_wintie']:.1%}** (β GPT-4 × P_wintie)")
    w("")
    w(f"- E = β(GPT-4) = {rec['E']:.1%}: 「LLM + 工具能将任务时间减少 ≥50%」的任务占比")
    w(f"- P = win+tie = {rec['P_wintie']:.1%}: AI 完成质量 ≥ 人类的比例 (GDPval GPT-5.2)")
    w(f"- **Kill Line = {rec['KL_wintie']:.2%}**: 就业加权的 AI 替代率")
    w("")

    # Top occupations
    best_e = "dv_beta"
    has_emp["risk_main"] = has_emp[f"risk_wintie_{best_e}"]
    has_emp["impact"] = has_emp["risk_main"] * has_emp["employment"]

    w("## 3. Top 30 Highest Risk Occupations (β GPT-4 × P_wintie)")
    w("")
    w("| # | SOC | Occupation | E(β) | P(wintie) | **Risk** | Employment |")
    w("|---|-----|-----------|------|-----------|----------|-----------|")
    top = has_emp.sort_values("risk_main", ascending=False).head(30)
    for i, (_, r) in enumerate(top.iterrows(), 1):
        title = str(r.get("occupation_title", r.get("Title", "")))[:50]
        w(f"| {i} | {r['soc_code']} | {title} | {r[best_e]:.1%} | {r['P_wintie']:.1%} | **{r['risk_main']:.1%}** | {r['employment']:,.0f} |")
    w("")

    w("## 4. Top 30 Largest Employment Impact")
    w("")
    w("| # | SOC | Occupation | Employment | E(β) | P(wintie) | Risk | **Affected Jobs** |")
    w("|---|-----|-----------|-----------|------|-----------|------|-----------------|")
    top_impact = has_emp.sort_values("impact", ascending=False).head(30)
    for i, (_, r) in enumerate(top_impact.iterrows(), 1):
        title = str(r.get("occupation_title", r.get("Title", "")))[:45]
        w(f"| {i} | {r['soc_code']} | {title} | {r['employment']:,.0f} | {r[best_e]:.1%} | {r['P_wintie']:.1%} | {r['risk_main']:.1%} | **{r['impact']:,.0f}** |")
    w("")

    # By SOC major group
    w("## 5. By SOC Major Group")
    w("")
    has_emp["soc_major_name"] = has_emp["soc_major_occ"].map(SOC_MAJOR_NAMES).fillna("Other")

    major = has_emp.groupby(["soc_major_occ", "soc_major_name"]).apply(
        lambda g: pd.Series({
            "employment": g["employment"].sum(),
            "n_occ": len(g),
            "E_beta": np.average(g[best_e], weights=g["employment"]),
            "P_wintie": np.average(g["P_wintie"], weights=g["employment"]),
            "Risk": np.average(g["risk_main"], weights=g["employment"]),
        }), include_groups=False,
    ).reset_index().sort_values("Risk", ascending=False)

    w("| SOC | Category | #Occ | Employment | E(β) | P(wintie) | **Risk** | Contribution |")
    w("|-----|----------|------|-----------|------|-----------|----------|-------------|")
    for _, r in major.iterrows():
        contrib = r["Risk"] * r["employment"] / total_emp
        w(f"| {r['soc_major_occ']} | {r['soc_major_name']} | {int(r['n_occ'])} | {r['employment']:,.0f} | "
          f"{r['E_beta']:.1%} | {r['P_wintie']:.1%} | **{r['Risk']:.1%}** | {contrib:.4f} |")
    w("")

    # Lowest risk
    w("## 6. Top 20 Lowest Risk Occupations (最安全的工作)")
    w("")
    w("| # | SOC | Occupation | E(β) | P(wintie) | **Risk** | Employment |")
    w("|---|-----|-----------|------|-----------|----------|-----------|")
    bottom = has_emp.sort_values("risk_main", ascending=True).head(20)
    for i, (_, r) in enumerate(bottom.iterrows(), 1):
        title = str(r.get("occupation_title", r.get("Title", "")))[:50]
        w(f"| {i} | {r['soc_code']} | {title} | {r[best_e]:.1%} | {r['P_wintie']:.1%} | **{r['risk_main']:.1%}** | {r['employment']:,.0f} |")
    w("")

    # Comparison with old method
    w("## 7. 方法对比")
    w("")
    w("| | 旧方法 (Anthropic penetration) | **新方法 (Eloundou β)** |")
    w("|---|---|---|")
    w(f"| E 来源 | Claude 对话实际使用率 | **专家标注「能否加速≥50%」** |")
    w(f"| E 覆盖 | ~1,354 个非零任务 | **19,265 个任务全覆盖** |")
    w(f"| E 测的是 | Adoption (人们在用什么) | **Capability (AI 能做什么)** |")
    w(f"| 职业覆盖 | ~345 个有观测 | **{len(has_emp)} 个有就业数据** |")
    w(f"| E 均值 (就业加权) | ~12.7% (Claude only) | **{rec['E']:.1%}** |")
    w(f"| P 来源 | GDPval GPT-5.2 | GDPval GPT-5.2 (同) |")
    w(f"| P 均值 | {rec['P_wintie']:.1%} | {rec['P_wintie']:.1%} (同) |")
    w(f"| **Kill Line (win+tie)** | ~10.6-18.0% | **{rec['KL_wintie']:.2%}** |")
    w(f"| Kill Line (win-only) | ~7.7-15.4% | {rec['KL_win']:.2%} |")
    w("")
    w("**解读**: 旧方法测「实际采用率」(10-18%)，新方法测「能力天花板」(24.9%)。")
    w("真实 AI 替代率在两者之间：AI 已经能做，但还没被所有人用起来。")
    w("")

    report = "\n".join(L)
    REPORT_PATH.write_text(report, encoding="utf-8")
    print(f"\nReport saved to {REPORT_PATH}")

    # Console output
    print(f"\n{'='*60}")
    print(f"  Kill Line Results (Eloundou β × GDPval GPT-5.2)")
    print(f"{'='*60}")
    for e_col, e_name in E_DEFINITIONS:
        r = results[e_col]
        marker = " ← RECOMMENDED" if e_col == "dv_beta" else ""
        print(f"  {e_name:<35} KL={r['KL_wintie']:.2%} (wt) / {r['KL_win']:.2%} (w){marker}")
    print(f"{'='*60}")

    # Save data
    out_dir = ROOT / "output"
    out_dir.mkdir(parents=True, exist_ok=True)
    has_emp.to_csv(out_dir / "killline_eloundou_occupations.csv", index=False)
    with open(out_dir / "killline_eloundou_national.json", "w") as f:
        json.dump(results, f, indent=2, default=str)
    print(f"Data saved to {out_dir}")

    return has_emp, results


if __name__ == "__main__":
    run()
