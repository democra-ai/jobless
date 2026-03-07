#!/usr/bin/env python3
"""Task-level fusion risk: O*NET × Anthropic Observed × GDPval Win Rate.

All multiplication happens in the O*NET task space:
  Risk_t = E_observed_t × platform_factor × P_win_t
  Risk_occ = Σ(w_t × Risk_t) / Σ(w_t)
  Risk_national = Σ(emp_occ × Risk_occ) / Σ(emp_occ)

Data sources:
  - O*NET 30.1: Task Statements + Task Ratings (task universe, weights)
  - Anthropic Economic Index: task_penetration.csv (observed E per task)
  - Anthropic Economic Index: automation_vs_augmentation_by_task.csv (auto weight)
  - OpenAI GDPval: win_rate per occupation (mapped to tasks via SOC)
  - BLS OES: employment by occupation
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent
ONET_DIR = ROOT / "data" / "raw" / "onet"
OUT_DIR = ROOT / "output"
REPORT_PATH = ROOT / "task_level_fusion_report.md"

# Anthropic data paths
ANTHROPIC_TASK_PENETRATION = Path("/tmp/EconomicIndex/labor_market_impacts/task_penetration.csv")
ANTHROPIC_AUTO_AUG = Path("/tmp/EconomicIndex/release_2025_03_27/automation_vs_augmentation_by_task.csv")
ANTHROPIC_JOB_EXPOSURE = Path("/tmp/EconomicIndex/labor_market_impacts/job_exposure.csv")

# GDPval
GDPVAL_JSON = ROOT.parent.parent / "gdpval_complete_data.json"

# BLS employment
BLS_WAGE = Path("/tmp/EconomicIndex/release_2025_02_10/wage_data.csv")

# Platform correction factors by SOC 2-digit major group
PLATFORM_FACTOR: Dict[str, float] = {
    "11": 2.0,  # Management
    "13": 2.0,  # Business & Financial
    "15": 3.0,  # Computer & Math
    "17": 2.0,  # Architecture & Engineering
    "19": 2.0,  # Life & Social Science
    "21": 1.5,  # Community & Social Service
    "23": 2.0,  # Legal
    "25": 2.5,  # Education
    "27": 4.0,  # Arts & Media
    "29": 1.5,  # Healthcare Practitioners
    "31": 1.5,  # Healthcare Support
    "33": 1.5,  # Protective Service
    "35": 1.5,  # Food Preparation
    "37": 1.5,  # Building & Grounds
    "39": 1.5,  # Personal Care
    "41": 2.0,  # Sales
    "43": 2.0,  # Office & Admin
    "45": 1.5,  # Farming & Fishing
    "47": 1.5,  # Construction
    "49": 1.5,  # Installation & Repair
    "51": 1.5,  # Production
    "53": 1.5,  # Transportation
}

# GDPval sector → SOC major group mapping for fallback
GDPVAL_SECTOR_TO_SOC_MAJOR: Dict[str, List[str]] = {
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

# GPT-5.4 scaling factor (wintie: 83.0% vs GPT-5.2's 70.9%)
GPT54_SCALE = 83.0 / 70.9


def to_float(s):
    return pd.to_numeric(s.astype(str).str.replace(",", "", regex=False), errors="coerce")


def normalize_text(s: str) -> str:
    """Normalize task text for matching."""
    return str(s).lower().strip()


# ──────────────────────────────────────────────
# 1. O*NET task universe
# ──────────────────────────────────────────────
def load_onet_tasks() -> pd.DataFrame:
    """Load O*NET tasks with importance/prevalence weights."""
    ts = pd.read_csv(ONET_DIR / "Task%20Statements.txt", sep="\t", dtype=str)
    tr = pd.read_csv(ONET_DIR / "Task%20Ratings.txt", sep="\t", dtype=str)

    ts.columns = [c.strip() for c in ts.columns]
    tr.columns = [c.strip() for c in tr.columns]

    ts = ts.rename(columns={
        "O*NET-SOC Code": "onet_soc_code",
        "Task ID": "task_id",
        "Task": "task_text",
        "Task Type": "task_type",
    })
    tr = tr.rename(columns={
        "O*NET-SOC Code": "onet_soc_code",
        "Task ID": "task_id",
        "Scale ID": "scale_id",
        "Category": "category",
        "Data Value": "data_value",
    })
    tr["data_value"] = to_float(tr["data_value"])
    tr["category_num"] = to_float(tr["category"])

    # Importance (IM): mean across raters
    im = (
        tr[tr["scale_id"] == "IM"]
        .groupby(["onet_soc_code", "task_id"], as_index=False)["data_value"]
        .mean()
        .rename(columns={"data_value": "im"})
    )
    # Relevance (RT)
    rt = (
        tr[tr["scale_id"] == "RT"]
        .groupby(["onet_soc_code", "task_id"], as_index=False)["data_value"]
        .mean()
        .rename(columns={"data_value": "rt"})
    )
    # Frequency (FT): expected category
    ft_raw = tr[tr["scale_id"] == "FT"].copy()
    ft = (
        ft_raw.assign(weighted=ft_raw["category_num"] * ft_raw["data_value"])
        .groupby(["onet_soc_code", "task_id"], as_index=False)
        .agg(ft_w=("weighted", "sum"), ft_d=("data_value", "sum"))
    )
    ft["ft_expected"] = ft["ft_w"] / ft["ft_d"]
    ft = ft[["onet_soc_code", "task_id", "ft_expected"]]

    task = (
        ts[["onet_soc_code", "task_id", "task_text", "task_type"]]
        .drop_duplicates(["onet_soc_code", "task_id"])
        .merge(im, on=["onet_soc_code", "task_id"], how="left")
        .merge(rt, on=["onet_soc_code", "task_id"], how="left")
        .merge(ft, on=["onet_soc_code", "task_id"], how="left")
    )

    # Normalize weights
    task["im_norm"] = ((task["im"] - 1.0) / 4.0).clip(0, 1)
    task["rt_norm"] = (task["rt"] / 100.0).clip(0, 1)
    task["ft_norm"] = ((task["ft_expected"] - 1.0) / 6.0).clip(0, 1)
    task["prevalence"] = np.where(
        task["rt_norm"].notna() & task["ft_norm"].notna(),
        0.5 * task["rt_norm"] + 0.5 * task["ft_norm"],
        task["rt_norm"].fillna(task["ft_norm"]).fillna(0.5),
    )
    task["im_norm"] = task["im_norm"].fillna(task["im_norm"].median())
    task["task_weight"] = (task["im_norm"] * task["prevalence"]).clip(lower=0.01)

    # Extract SOC-6 code (XX-XXXX)
    task["soc_code"] = task["onet_soc_code"].str.extract(r"(\d{2}-\d{4})")
    task["soc_major"] = task["soc_code"].str[:2]
    task["task_text_norm"] = task["task_text"].map(normalize_text)

    task = task[task["soc_code"].notna()].copy()
    print(f"[O*NET] {len(task)} task-occupation rows, {task['task_text_norm'].nunique()} unique task texts, {task['soc_code'].nunique()} SOC codes")
    return task


# ──────────────────────────────────────────────
# 2. Anthropic task penetration
# ──────────────────────────────────────────────
def load_anthropic_penetration() -> pd.DataFrame:
    ap = pd.read_csv(ANTHROPIC_TASK_PENETRATION)
    ap["task_text_norm"] = ap["task"].map(normalize_text)
    nonzero = (ap["penetration"] > 0).sum()
    print(f"[Anthropic penetration] {len(ap)} tasks, {nonzero} non-zero")
    return ap[["task_text_norm", "penetration"]]


# ──────────────────────────────────────────────
# 3. Anthropic automation vs augmentation
# ──────────────────────────────────────────────
def load_anthropic_auto_aug() -> pd.DataFrame:
    """Load and compute automation weight per task.

    Columns: feedback_loop, directive, task_iteration, validation, learning, filtered
    - 'directive' = automation-like (one-shot, no iteration)
    - 'task_iteration' + 'feedback_loop' = augmentation-like (human-in-loop)
    - 'filtered' = not used for work
    - Per Anthropic paper: automation = full weight (1.0), augmentation = half weight (0.5)

    auto_weight = directive + 0.5 * (feedback_loop + task_iteration + validation + learning)
    Normalized by (1 - filtered) to only count work-related usage.
    """
    aa = pd.read_csv(ANTHROPIC_AUTO_AUG)
    aa["task_text_norm"] = aa["task_name"].map(normalize_text)

    # Work-related fraction = 1 - filtered
    aa["work_fraction"] = (1.0 - aa["filtered"]).clip(0, 1)

    # Automation-like: directive (one-shot generation)
    # Augmentation-like: feedback_loop, task_iteration, validation, learning
    aa["auto_weight"] = np.where(
        aa["work_fraction"] > 0.01,
        # Full weight for directive, half weight for iterative/augmentative
        aa["directive"] + 0.5 * (aa["feedback_loop"] + aa["task_iteration"] + aa["validation"] + aa["learning"]),
        0.0,
    )
    aa["auto_weight"] = aa["auto_weight"].clip(0, 1)

    nonzero = (aa["auto_weight"] > 0).sum()
    print(f"[Anthropic auto/aug] {len(aa)} tasks, {nonzero} with auto_weight > 0")
    return aa[["task_text_norm", "auto_weight", "work_fraction",
               "directive", "feedback_loop", "task_iteration", "validation", "learning", "filtered"]]


# ──────────────────────────────────────────────
# 4. GDPval win rates
# ──────────────────────────────────────────────
def load_gdpval_win_rates(model_key: str = "GPT-5.2") -> Tuple[Dict[str, Dict], Dict[str, Dict], Dict]:
    """Load GDPval occupation-level and sector-level win rates.

    Returns:
        occ_win: {occupation_name: {win_rate, win_or_tie_rate}}
        sector_win: {sector_name: {win_rate, win_or_tie_rate}}
        overall: {win_rate, win_or_tie_rate}
    """
    with open(GDPVAL_JSON) as f:
        gdp = json.load(f)

    # model_labels: {model_id: display_name}
    model_labels = gdp.get("model_labels", {})
    model_id = "gpt-5p2-high"  # default
    for mid, display in model_labels.items():
        if model_key.lower() in display.lower() or model_key.lower() in mid.lower():
            model_id = mid
            break

    # Overall (list of dicts)
    overall = {"win_rate": 0.4975, "win_or_tie_rate": 0.7086}
    overall_data = gdp["overall"]
    if isinstance(overall_data, list):
        for e in overall_data:
            if e.get("model") == model_id:
                overall = {"win_rate": e["win_rate"], "win_or_tie_rate": e["win_or_tie_rate"]}
                break

    # By occupation: {display_name: [list of {model, sector, occupation, win_rate, ...}]}
    occ_win = {}
    by_occ = gdp["by_occupation"]
    for label, entries in by_occ.items():
        if isinstance(entries, list):
            for e in entries:
                if e.get("model") == model_id:
                    name = e["occupation"]
                    occ_win[name] = {"win_rate": e["win_rate"], "win_or_tie_rate": e["win_or_tie_rate"]}

    # By sector: {display_name: [list of {model, sector, win_rate, ...}]}
    sector_win = {}
    by_sec = gdp["by_sector"]
    for label, entries in by_sec.items():
        if isinstance(entries, list):
            for e in entries:
                if e.get("model") == model_id:
                    name = e["sector"]
                    sector_win[name] = {"win_rate": e["win_rate"], "win_or_tie_rate": e["win_or_tie_rate"]}

    print(f"[GDPval] model={model_id}, {len(occ_win)} occupations, {len(sector_win)} sectors, overall win={overall['win_rate']:.4f}")
    return occ_win, sector_win, overall


# ──────────────────────────────────────────────
# 5. BLS employment
# ──────────────────────────────────────────────
def load_employment() -> pd.DataFrame:
    """Load BLS IN4 2024 national employment data (full 141M, not Anthropic's subset).

    Uses the same data source as our previous Kill Line calculation.
    """
    import compute_gdpval_replacement_risk_rigorous as rig
    ind24 = rig.read_industry_detail_2024()
    # Aggregate to occupation level
    emp = (
        ind24.groupby("occ_code", as_index=False)
        .agg(employment=("tot_emp", "sum"))
        .rename(columns={"occ_code": "soc_code"})
    )
    emp = emp[emp["employment"] > 0].copy()

    # Get occupation titles from O*NET
    occ_data = pd.read_csv(ONET_DIR / "Occupation%20Data.txt", sep="\t", dtype=str)
    occ_data.columns = [c.strip() for c in occ_data.columns]
    occ_data["soc_code"] = occ_data["O*NET-SOC Code"].str.extract(r"(\d{2}-\d{4})")
    titles = occ_data.drop_duplicates("soc_code")[["soc_code", "Title"]].rename(columns={"Title": "occupation_title"})
    emp = emp.merge(titles, on="soc_code", how="left")

    print(f"[BLS IN4] {len(emp)} occupations with employment, total={emp['employment'].sum():,.0f}")
    return emp


# ──────────────────────────────────────────────
# 6. Map GDPval occupation names → SOC codes
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
    "Buyers and Purchasing Agents": "13-1020",  # broad group
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


def build_soc_win_rate_map(
    occ_win: Dict[str, Dict],
    sector_win: Dict[str, Dict],
    overall: Dict,
) -> Tuple[Dict[str, Dict], Dict[str, Dict]]:
    """Build SOC code → win rate mapping (direct) and SOC major group → win rate (fallback)."""
    # Direct: GDPval occupation → SOC
    soc_direct: Dict[str, Dict] = {}
    for occ_name, rates in occ_win.items():
        soc = GDPVAL_OCC_TO_SOC.get(occ_name)
        if soc:
            soc_direct[soc] = rates

    # Sector fallback: compute average win rate per SOC major group
    # Map GDPval sectors → SOC major groups, then average
    major_rates: Dict[str, List[Dict]] = {}
    for sector_name, rates in sector_win.items():
        majors = GDPVAL_SECTOR_TO_SOC_MAJOR.get(sector_name, [])
        for m in majors:
            if m not in major_rates:
                major_rates[m] = []
            major_rates[m].append(rates)

    soc_major_fallback: Dict[str, Dict] = {}
    for m, rate_list in major_rates.items():
        soc_major_fallback[m] = {
            "win_rate": np.mean([r["win_rate"] for r in rate_list]),
            "win_or_tie_rate": np.mean([r["win_or_tie_rate"] for r in rate_list]),
        }

    print(f"[Win rate map] {len(soc_direct)} direct SOC, {len(soc_major_fallback)} major group fallbacks")
    return soc_direct, soc_major_fallback


# ──────────────────────────────────────────────
# 7. Main fusion pipeline
# ──────────────────────────────────────────────
def run_fusion() -> Tuple[pd.DataFrame, pd.DataFrame, Dict]:
    """Run the full task-level fusion pipeline.

    Returns:
        task_fused: task-level DataFrame with all columns
        occ_result: occupation-level aggregated results
        national: national summary dict
    """
    # Load all data
    onet = load_onet_tasks()
    penetration = load_anthropic_penetration()
    auto_aug = load_anthropic_auto_aug()
    occ_win, sector_win, overall = load_gdpval_win_rates("GPT-5.2")
    emp = load_employment()

    soc_direct, soc_major_fallback = build_soc_win_rate_map(occ_win, sector_win, overall)

    # ── Join Anthropic penetration to O*NET tasks ──
    onet = onet.merge(penetration, on="task_text_norm", how="left")
    onet["penetration"] = onet["penetration"].fillna(0.0)

    matched_pen = (onet["penetration"] > 0).sum()
    print(f"[Join] O*NET tasks with non-zero penetration: {matched_pen}/{len(onet)}")

    # ── Join automation/augmentation classification ──
    onet = onet.merge(auto_aug, on="task_text_norm", how="left")
    onet["auto_weight"] = onet["auto_weight"].fillna(0.0)
    onet["work_fraction"] = onet["work_fraction"].fillna(0.0)

    # ── Compute task-level exposure ──
    # E_task = penetration × auto_weight × platform_factor
    # But we also want a simpler version: E_task_raw = penetration × platform_factor
    # And the paper version: E_task_paper = penetration (just observed, no auto_weight)
    onet["platform_factor"] = onet["soc_major"].map(PLATFORM_FACTOR).fillna(1.5)

    # Method A: Raw penetration × platform factor (simple)
    onet["E_task_simple"] = (onet["penetration"] * onet["platform_factor"]).clip(0, 1)

    # Method B: Penetration × auto_weight (Anthropic-style, auto > aug)
    # For tasks without auto_aug data but with penetration, use 0.75 as default auto_weight
    has_penetration = onet["penetration"] > 0
    has_auto_data = onet["auto_weight"] > 0
    default_auto_weight = np.where(
        has_penetration & ~has_auto_data,
        0.75,  # Default: assume mostly directive for tasks we can't classify
        onet["auto_weight"],
    )
    onet["auto_weight_filled"] = default_auto_weight
    onet["E_task_auto_weighted"] = (onet["penetration"] * onet["auto_weight_filled"] * onet["platform_factor"]).clip(0, 1)

    # Method C: Anthropic's observed exposure directly (no auto_weight, no platform)
    onet["E_task_anthropic_raw"] = onet["penetration"].clip(0, 1)

    # ── Assign P_win to each task ──
    # Priority: direct SOC match > SOC major group fallback > global
    def get_win_rate(soc_code: str, soc_major: str, field: str = "win_rate") -> float:
        # Direct match
        if soc_code in soc_direct:
            return soc_direct[soc_code][field]
        # Try without sub-code (e.g., 13-1020)
        base = soc_code[:5] + "0"
        if base in soc_direct:
            return soc_direct[base][field]
        # Major group fallback
        if soc_major in soc_major_fallback:
            return soc_major_fallback[soc_major][field]
        # Global fallback
        return overall[field]

    onet["P_win"] = [get_win_rate(s, m, "win_rate") for s, m in zip(onet["soc_code"], onet["soc_major"])]
    onet["P_wintie"] = [get_win_rate(s, m, "win_or_tie_rate") for s, m in zip(onet["soc_code"], onet["soc_major"])]

    # GPT-5.4 scaled
    onet["P_win_54"] = (onet["P_win"] * GPT54_SCALE).clip(0, 1)
    onet["P_wintie_54"] = (onet["P_wintie"] * GPT54_SCALE).clip(0, 1)

    # P_win source label
    def get_win_source(soc_code, soc_major):
        if soc_code in soc_direct:
            return "direct"
        base = soc_code[:5] + "0"
        if base in soc_direct:
            return "direct"
        if soc_major in soc_major_fallback:
            return "sector"
        return "global"
    onet["P_source"] = [get_win_source(s, m) for s, m in zip(onet["soc_code"], onet["soc_major"])]

    # ── Task-level risk ──
    # Method C: E_simple × P_win (recommended)
    onet["Risk_task_C"] = onet["E_task_simple"] * onet["P_win"]
    onet["Risk_task_C_54"] = onet["E_task_simple"] * onet["P_win_54"]

    # Method D: E_simple × P_wintie
    onet["Risk_task_D"] = onet["E_task_simple"] * onet["P_wintie"]
    onet["Risk_task_D_54"] = onet["E_task_simple"] * onet["P_wintie_54"]

    # Method E: E_auto_weighted × P_win (auto/aug distinction)
    onet["Risk_task_E"] = onet["E_task_auto_weighted"] * onet["P_win"]
    onet["Risk_task_E_54"] = onet["E_task_auto_weighted"] * onet["P_win_54"]

    # ── Aggregate to occupation level ──
    agg_cols = {
        "task_weight": "sum",
        "penetration": "mean",
        "auto_weight_filled": "mean",
        "platform_factor": "first",
        "E_task_simple": "mean",
        "E_task_auto_weighted": "mean",
        "E_task_anthropic_raw": "mean",
        "P_win": "mean",
        "P_wintie": "mean",
        "P_win_54": "mean",
        "P_wintie_54": "mean",
        "P_source": "first",
        "task_id": "count",
    }

    # Weighted aggregation for risk
    def weighted_agg(group):
        w = group["task_weight"].values
        w_sum = w.sum()
        if w_sum <= 0:
            w = np.ones(len(group))
            w_sum = w.sum()

        result = {
            "task_count": len(group),
            "task_weight_sum": w_sum,
            "penetration_wmean": np.average(group["penetration"].values, weights=w),
            "E_simple_wmean": np.average(group["E_task_simple"].values, weights=w),
            "E_auto_weighted_wmean": np.average(group["E_task_auto_weighted"].values, weights=w),
            "E_anthropic_raw_wmean": np.average(group["E_task_anthropic_raw"].values, weights=w),
            "P_win_wmean": np.average(group["P_win"].values, weights=w),
            "P_wintie_wmean": np.average(group["P_wintie"].values, weights=w),
            "P_win_54_wmean": np.average(group["P_win_54"].values, weights=w),
            "P_wintie_54_wmean": np.average(group["P_wintie_54"].values, weights=w),
            "Risk_C_wmean": np.average(group["Risk_task_C"].values, weights=w),
            "Risk_C_54_wmean": np.average(group["Risk_task_C_54"].values, weights=w),
            "Risk_D_wmean": np.average(group["Risk_task_D"].values, weights=w),
            "Risk_D_54_wmean": np.average(group["Risk_task_D_54"].values, weights=w),
            "Risk_E_wmean": np.average(group["Risk_task_E"].values, weights=w),
            "Risk_E_54_wmean": np.average(group["Risk_task_E_54"].values, weights=w),
            "platform_factor": group["platform_factor"].iloc[0],
            "P_source": group["P_source"].iloc[0],
            "soc_major": group["soc_major"].iloc[0],
            "tasks_with_penetration": (group["penetration"] > 0).sum(),
        }
        return pd.Series(result)

    occ = onet.groupby("soc_code").apply(weighted_agg, include_groups=False).reset_index()

    # Merge employment and titles
    occ = occ.merge(emp[["soc_code", "employment", "occupation_title"]], on="soc_code", how="left")
    occ["employment"] = occ["employment"].fillna(0)

    # Also merge Anthropic's direct job_exposure for comparison
    anthropic_job = pd.read_csv(ANTHROPIC_JOB_EXPOSURE)
    anthropic_job = anthropic_job.rename(columns={"occ_code": "soc_code", "observed_exposure": "anthropic_observed_exposure"})
    occ = occ.merge(anthropic_job[["soc_code", "anthropic_observed_exposure"]], on="soc_code", how="left")

    # ── National aggregation (employment-weighted) ──
    occ_emp = occ[occ["employment"] > 0].copy()
    total_emp = occ_emp["employment"].sum()

    def national_stat(col):
        return np.average(occ_emp[col].values, weights=occ_emp["employment"].values)

    national = {
        "total_employment": float(total_emp),
        "occupations_with_employment": int(len(occ_emp)),
        "occupations_with_penetration": int((occ_emp["tasks_with_penetration"] > 0).sum()),
        # Exposures
        "E_simple_national": float(national_stat("E_simple_wmean")),
        "E_auto_weighted_national": float(national_stat("E_auto_weighted_wmean")),
        "E_anthropic_raw_national": float(national_stat("E_anthropic_raw_wmean")),
        # Win rates
        "P_win_national": float(national_stat("P_win_wmean")),
        "P_wintie_national": float(national_stat("P_wintie_wmean")),
        "P_win_54_national": float(national_stat("P_win_54_wmean")),
        "P_wintie_54_national": float(national_stat("P_wintie_54_wmean")),
        # Risk (Kill Line)
        "Risk_C_national": float(national_stat("Risk_C_wmean")),
        "Risk_C_54_national": float(national_stat("Risk_C_54_wmean")),
        "Risk_D_national": float(national_stat("Risk_D_wmean")),
        "Risk_D_54_national": float(national_stat("Risk_D_54_wmean")),
        "Risk_E_national": float(national_stat("Risk_E_wmean")),
        "Risk_E_54_national": float(national_stat("Risk_E_54_wmean")),
        # GDPval overall
        "gdpval_overall_win": float(overall["win_rate"]),
        "gdpval_overall_wintie": float(overall["win_or_tie_rate"]),
    }

    return onet, occ, national


# ──────────────────────────────────────────────
# 8. Report generation
# ──────────────────────────────────────────────
def build_report(onet: pd.DataFrame, occ: pd.DataFrame, national: Dict) -> str:
    L = []
    w = L.append

    w("# Task-Level Fusion Report: O*NET + Anthropic + GDPval")
    w("")
    w("> All calculations done in the **O*NET task space** — exposure and win rate are multiplied per-task, then aggregated.")
    w(">")
    w("> Data: O*NET 30.1 + Anthropic Economic Index (2026-03) + OpenAI GDPval (GPT-5.2/5.4)")
    w("")

    w("## 1. Data Fusion Pipeline")
    w("")
    w("```")
    w("For each O*NET task t (in occupation o):")
    w("  E_t = penetration_t(Anthropic) x platform_factor(SOC) ")
    w("  P_t = win_rate_occ(GDPval, mapped via SOC)           ")
    w("  Risk_t = E_t x P_t                                   ")
    w("")
    w("Risk_occ = Sum(w_t x Risk_t) / Sum(w_t)   [O*NET importance x prevalence weights]")
    w("Risk_national = Sum(emp_occ x Risk_occ) / Sum(emp_occ)  [BLS employment weights]")
    w("```")
    w("")

    w("## 2. Data Matching Quality")
    w("")
    total_tasks = len(onet)
    nonzero_pen = (onet["penetration"] > 0).sum()
    has_auto = (onet["auto_weight_filled"] > 0).sum()
    unique_soc = onet["soc_code"].nunique()
    p_direct = (onet["P_source"] == "direct").sum()
    p_sector = (onet["P_source"] == "sector").sum()
    p_global = (onet["P_source"] == "global").sum()

    w(f"| Metric | Value |")
    w(f"|--------|-------|")
    w(f"| O*NET task-occupation rows | {total_tasks:,} |")
    w(f"| Unique SOC codes | {unique_soc} |")
    w(f"| Tasks with non-zero Anthropic penetration | {nonzero_pen:,} ({nonzero_pen/total_tasks:.1%}) |")
    w(f"| Tasks with automation classification | {has_auto:,} ({has_auto/total_tasks:.1%}) |")
    w(f"| P_win source: direct GDPval match | {p_direct:,} ({p_direct/total_tasks:.1%}) |")
    w(f"| P_win source: sector fallback | {p_sector:,} ({p_sector/total_tasks:.1%}) |")
    w(f"| P_win source: global fallback | {p_global:,} ({p_global/total_tasks:.1%}) |")
    w("")

    w("## 3. National Results (Employment-Weighted)")
    w("")
    w(f"Total employment coverage: **{national['total_employment']:,.0f}**")
    w(f"Occupations with employment: **{national['occupations_with_employment']}**")
    w("")

    w("### 3.1 Three Key National Values (using win+tie)")
    w("")
    w("| Metric | GPT-5.2 | GPT-5.4 |")
    w("|--------|---------|---------|")
    w(f"| **E (Exposure, employment-weighted)** | {national['E_simple_national']:.2%} | {national['E_simple_national']:.2%} |")
    w(f"| **P_wintie (AI win+tie rate, employment-weighted)** | {national['P_wintie_national']:.2%} | {national['P_wintie_54_national']:.2%} |")
    w(f"| **Kill Line = E x P_wintie (employment-weighted)** | **{national['Risk_D_national']:.2%}** | **{national['Risk_D_54_national']:.2%}** |")
    w("")

    w("### 3.2 All Methods Comparison")
    w("")
    w("| Method | E source | P source | GPT-5.2 Kill Line | GPT-5.4 Kill Line |")
    w("|--------|----------|----------|--------------------|-------------------|")
    w(f"| C: E_adj x P_win | penetration x pf | win_rate | **{national['Risk_C_national']:.2%}** | **{national['Risk_C_54_national']:.2%}** |")
    w(f"| D: E_adj x P_wintie | penetration x pf | wintie | **{national['Risk_D_national']:.2%}** | **{national['Risk_D_54_national']:.2%}** |")
    w(f"| E: E_auto x P_win | pen x auto_weight x pf | win_rate | **{national['Risk_E_national']:.2%}** | **{national['Risk_E_54_national']:.2%}** |")
    w(f"| Baseline (old) | theoretical | win_rate | **21.37%** | — |")
    w("")

    w("### 3.3 Component Breakdown")
    w("")
    w("| Component | Value | Source |")
    w("|-----------|-------|--------|")
    w(f"| E_observed (raw, Claude only) | {national['E_anthropic_raw_national']:.2%} | Anthropic task penetration |")
    w(f"| E_adjusted (multi-platform) | {national['E_simple_national']:.2%} | x platform_factor |")
    w(f"| E_auto_weighted | {national['E_auto_weighted_national']:.2%} | x auto_weight x pf |")
    w(f"| P_win (GPT-5.2) | {national['P_win_national']:.2%} | GDPval |")
    w(f"| P_win (GPT-5.4) | {national['P_win_54_national']:.2%} | GDPval x 1.17 |")
    w(f"| P_wintie (GPT-5.2) | {national['P_wintie_national']:.2%} | GDPval |")
    w(f"| P_wintie (GPT-5.4) | {national['P_wintie_54_national']:.2%} | GDPval x 1.17 |")
    w("")

    # Top occupations — using Method D (win+tie)
    occ_emp = occ[occ["employment"] > 0].copy()
    occ_emp["impact_D_54"] = occ_emp["Risk_D_54_wmean"] * occ_emp["employment"]
    top_risk = occ_emp.sort_values("Risk_D_54_wmean", ascending=False).head(30)
    top_impact = occ_emp.sort_values("impact_D_54", ascending=False).head(30)

    w("## 4. Top 30 Highest Risk Occupations (GPT-5.4, Method D: win+tie)")
    w("")
    w("| # | SOC | Occupation | Tasks | E_adj | P_wintie | Risk | Employment |")
    w("|---|-----|-----------|-------|-------|----------|------|-----------|")
    for i, (_, r) in enumerate(top_risk.iterrows(), 1):
        title = str(r.get("occupation_title", ""))[:50]
        w(f"| {i} | {r['soc_code']} | {title} | {int(r['task_count'])} | "
          f"{r['E_simple_wmean']:.3f} | {r['P_wintie_54_wmean']:.3f} | "
          f"**{r['Risk_D_54_wmean']:.1%}** | {r['employment']:,.0f} |")
    w("")

    w("## 5. Top 30 Largest Employment Impact (GPT-5.4, win+tie)")
    w("")
    w("| # | SOC | Occupation | Employment | E_adj | P_wintie | Risk | Affected |")
    w("|---|-----|-----------|-----------|-------|----------|------|---------|")
    for i, (_, r) in enumerate(top_impact.iterrows(), 1):
        title = str(r.get("occupation_title", ""))[:50]
        w(f"| {i} | {r['soc_code']} | {title} | {r['employment']:,.0f} | "
          f"{r['E_simple_wmean']:.3f} | {r['P_wintie_54_wmean']:.3f} | "
          f"{r['Risk_D_54_wmean']:.1%} | {r['impact_D_54']:,.0f} |")
    w("")

    # By SOC major group
    w("## 6. By SOC Major Group (GPT-5.4, Method D: win+tie)")
    w("")
    occ_emp["soc_major_name"] = occ_emp["soc_major"].map({
        "11": "Management", "13": "Business & Financial", "15": "Computer & Math",
        "17": "Architecture & Engineering", "19": "Life & Social Science",
        "21": "Community & Social Service", "23": "Legal", "25": "Education",
        "27": "Arts & Media", "29": "Healthcare Practitioners", "31": "Healthcare Support",
        "33": "Protective Service", "35": "Food Preparation", "37": "Building & Grounds",
        "39": "Personal Care", "41": "Sales", "43": "Office & Admin",
        "45": "Farming & Fishing", "47": "Construction", "49": "Installation & Repair",
        "51": "Production", "53": "Transportation",
    }).fillna("Other")

    major = occ_emp.groupby(["soc_major", "soc_major_name"]).apply(
        lambda g: pd.Series({
            "employment": g["employment"].sum(),
            "n_occ": len(g),
            "E_adj": np.average(g["E_simple_wmean"], weights=g["employment"]),
            "P_wintie_54": np.average(g["P_wintie_54_wmean"], weights=g["employment"]),
            "Risk_D_54": np.average(g["Risk_D_54_wmean"], weights=g["employment"]),
        }), include_groups=False,
    ).reset_index().sort_values("Risk_D_54", ascending=False)

    total_emp_nat = national["total_employment"]

    w("| SOC | Category | Employment | E_adj | P_wintie_54 | Risk | Contribution |")
    w("|-----|----------|-----------|-------|-------------|------|-------------|")
    for _, r in major.iterrows():
        contrib = r["Risk_D_54"] * r["employment"] / max(total_emp_nat, 1)
        w(f"| {r['soc_major']} | {r['soc_major_name']} | {r['employment']:,.0f} | "
          f"{r['E_adj']:.3f} | {r['P_wintie_54']:.3f} | **{r['Risk_D_54']:.2%}** | {contrib:.4f} |")
    w("")

    w("## 7. Comparison: Old vs New Kill Line")
    w("")
    w("| | Old Method | New (Task-level Fusion) |")
    w("|---|-----------|------------------------|")
    w(f"| Kill Line (win+tie) | 21.37% | **{national['Risk_D_54_national']:.2%}** (GPT-5.4) |")
    w(f"| E source | Keyword heuristic on O*NET text | Anthropic real usage + platform correction |")
    w(f"| P source | GDPval occupation-level | GDPval task-level (via occupation SOC) |")
    w(f"| Multiplication level | Occupation | **Task** (then aggregate) |")
    w(f"| E avg | 43.64% | {national['E_simple_national']:.2%} |")
    w(f"| P avg (wintie) | 70.86% (5.2) | {national['P_wintie_54_national']:.2%} (5.4) |")
    w(f"| Anthropic raw E | — | {national['E_anthropic_raw_national']:.2%} |")
    w("")

    w("## 8. Methodology Notes")
    w("")
    w("1. **Task-level multiplication**: Unlike previous occupation-level approach, E and P are multiplied per O*NET task before aggregation.")
    w("2. **Platform factor**: Corrects for Claude being one of many AI platforms (x1.5-4.0 by sector).")
    w("3. **Automation weighting** (Method E): Uses Anthropic's auto/aug classification — automation=1.0x, augmentation=0.5x.")
    w("4. **GPT-5.4 scaling**: P_win scaled by 83.0/70.9 = 1.1706x from GPT-5.2 baseline.")
    w("5. **Task weight**: O*NET Importance x Prevalence, used for occupation-level aggregation.")
    w("")

    return "\n".join(L)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    onet, occ, national = run_fusion()

    # Save outputs
    onet.to_csv(OUT_DIR / "task_level_fusion_full.csv", index=False)
    occ.to_csv(OUT_DIR / "occupation_fusion_results.csv", index=False)
    with open(OUT_DIR / "task_level_fusion_national.json", "w") as f:
        json.dump(national, f, indent=2, ensure_ascii=False)

    report = build_report(onet, occ, national)
    REPORT_PATH.write_text(report, encoding="utf-8")

    print(f"\n{'='*60}")
    print(f"Task-level Fusion Results (using win+tie)")
    print(f"{'='*60}")
    print(f"E (employment-weighted):       {national['E_simple_national']:.2%}")
    print(f"P_wintie (GPT-5.2):            {national['P_wintie_national']:.2%}")
    print(f"P_wintie (GPT-5.4):            {national['P_wintie_54_national']:.2%}")
    print(f"Kill Line D wintie (5.2):      {national['Risk_D_national']:.2%}")
    print(f"Kill Line D wintie (5.4):      {national['Risk_D_54_national']:.2%}")
    print(f"---")
    print(f"Kill Line C win-only (5.4):    {national['Risk_C_54_national']:.2%}")
    print(f"Kill Line E auto-adj (5.4):    {national['Risk_E_54_national']:.2%}")
    print(f"{'='*60}")
    print(f"Report: {REPORT_PATH}")
    print(f"Output: {OUT_DIR}")


if __name__ == "__main__":
    main()
