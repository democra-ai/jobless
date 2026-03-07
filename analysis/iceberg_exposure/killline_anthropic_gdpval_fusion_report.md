# AI Kill Line Recalculation Report
# Anthropic Observed Exposure + GDPval Fusion

> Generated: 2026-03-06 (Updated with GPT-5.4)
> Data: Anthropic Economic Index (labor_market_impacts, 2026-03-05) + OpenAI GDPval (GPT-5.2 → GPT-5.4)
> Employment: BLS OES 2023-2024

## 1. Methodology

### 1.1 Baseline (Current)

```
Risk_nat = Sum(E_theoretical x P_win x emp) / Sum(emp) = 21.37%
```

- **E_theoretical**: O*NET task automation score (employment-weighted avg: 43.64%)
- **P_win**: GDPval GPT-5.2 win_rate (global: 49.75%)
- **Problem**: E measures what AI *could theoretically do*, not what it *is actually doing*

### 1.2 New Formula

```
Risk_occ = E_observed x platform_factor x P_win
Risk_nat = Sum(Risk_occ x emp_occ) / Sum(emp_occ)
```

| Variable | Source | Measures |
|----------|--------|----------|
| **E_observed** | Anthropic Economic Index (756 occ) | Real Claude usage: what % of tasks are currently handled by AI |
| **platform_factor** | Market share estimate (x1.5~4.0) | Corrects for Claude being only one of many AI platforms |
| **P_win** | GDPval blind evaluation (44 occ + 9 sectors) | When AI does the task, how often does it outperform humans |

### 1.3 Platform Correction Factor

Anthropic data only covers Claude usage. Other major AI platforms (ChatGPT, Copilot, Midjourney, etc.) are not included.
Correction factors by SOC major group:

| SOC | Category | Factor | Rationale |
|-----|----------|--------|-----------|
| 11 | Management | x2.0 | ChatGPT is the most common AI tool for management |
| 13 | Business & Financial | x2.0 | ChatGPT + specialized finance AI (Bloomberg GPT etc.) |
| 15 | Computer & Math | x3.0 | GitHub Copilot + Cursor dominate coding AI; Claude is minority share |
| 17 | Architecture & Engineering | x2.0 | AutoCAD AI + ChatGPT for engineering calculations |
| 19 | Life & Social Science | x2.0 | ChatGPT for research assistance |
| 21 | Community & Social Service | x1.5 | Limited AI penetration overall; small correction |
| 23 | Legal | x2.0 | Harvey, CoCounsel + ChatGPT in legal |
| 25 | Education | x2.5 | ChatGPT heavily used by students and teachers |
| 27 | Arts & Media | x4.0 | Midjourney, DALL-E, Suno, Runway, ElevenLabs cover visual/audio AI |
| 29 | Healthcare Practitioners | x1.5 | Limited AI penetration overall; small correction |
| 31 | Healthcare Support | x1.5 | Limited AI penetration overall; small correction |
| 33 | Protective Service | x1.5 | Limited AI penetration overall; small correction |
| 35 | Food Preparation | x1.5 | Limited AI penetration overall; small correction |
| 37 | Building & Grounds | x1.5 | Limited AI penetration overall; small correction |
| 39 | Personal Care | x1.5 | Limited AI penetration overall; small correction |
| 41 | Sales | x2.0 | Salesforce AI + ChatGPT for sales |
| 43 | Office & Admin | x2.0 | Microsoft 365 Copilot covers most office scenarios |
| 45 | Farming & Fishing | x1.5 | Limited AI penetration overall; small correction |
| 47 | Construction | x1.5 | Limited AI penetration overall; small correction |
| 49 | Installation & Repair | x1.5 | Limited AI penetration overall; small correction |
| 51 | Production | x1.5 | Limited AI penetration overall; small correction |
| 53 | Transportation | x1.5 | Limited AI penetration overall; small correction |

### 1.4 P_win Source Priority

1. **Direct match** (39 occupations): GDPval has occupation-level win_rate
2. **Sector fallback** (~600 occupations): SOC major group mapped to GDPval 9-sector average
3. **Global fallback**: GPT-5.2 global win_rate = 0.4975

### 1.5 GPT-5.4 Scaling

GPT-5.4 GDPval win+tie = 83.0% (up from GPT-5.2 = 70.9%). Per-occupation win rates are proportionally scaled:

```
P_win_54(occ) = P_win_52(occ) × (83.0 / 70.9) = P_win_52(occ) × 1.1706
P_wintie_54(occ) = P_wintie_52(occ) × (83.0 / 70.9) = P_wintie_52(occ) × 1.1706
```

Values are capped at 1.0.

---

## 2. National Kill Line Results

Employment coverage: **15,771,200**

### 2.1 GPT-5.2 Baseline

| Method | Formula | E avg | P avg | Kill Line |
|--------|---------|-------|-------|-----------|
| Baseline (old) | E_theoretical x P_win | 43.64% | 49.75% | **21.37%** |
| A. Claude raw x win | E_observed x P_win | 12.68% | ~50% | **7.01%** |
| B. Claude raw x win+tie | E_observed x P_wintie | 12.68% | ~71% | **9.50%** |
| C. Multi-platform x win | E_adjusted x P_win | 24.12% | ~50% | **13.15%** |
| D. Multi-platform x win+tie | E_adjusted x P_wintie | 24.12% | ~71% | **18.00%** |

### 2.2 GPT-5.4 Updated (P_win scaled by 83.0/70.9 = 1.1706x)

| Method | Formula | E avg | P avg | Kill Line |
|--------|---------|-------|-------|-----------|
| C. Multi-platform x win | E_adjusted x P_win_54 | 24.12% | ~58% | **15.39%** |
| D. Multi-platform x win+tie | E_adjusted x P_wintie_54 | 24.12% | ~83% | **21.01%** |

### Recommended Value

**Method C (multi-platform corrected x win-only)**

| Model | Kill Line |
|-------|-----------|
| GPT-5.2 | 13.15% |
| **GPT-5.4** | **15.39%** |

Rationale:
- win-only is more conservative than win+tie: only counts cases where AI clearly outperforms
- Platform correction avoids understating reality by only using Claude data
- Corrected E avg (24.12%) is reasonable vs theoretical ceiling (43.64%)
- GPT-5.4 represents a +2.24pp increase over GPT-5.2 due to improved AI performance

---

## 3. Breakdown by SOC Major Group

| SOC | Category | Employment | # Occ | Non-zero | E_obs | E_adj | x pf | Risk(C) |
|-----|----------|-----------|-------|----------|-------|-------|------|---------|
| 15 | Computer & Math |     18,900 | 5 | 100% | 0.3245 | 0.7993 | x3.0 | **39.43%** |
| 43 | Office & Admin |  2,276,100 | 50 | 80% | 0.3655 | 0.6603 | x2.0 | **38.74%** |
| 41 | Sales |  2,015,400 | 20 | 85% | 0.2479 | 0.4766 | x2.0 | **28.06%** |
| 25 | Education |    562,600 | 52 | 65% | 0.1670 | 0.4168 | x2.5 | **25.38%** |
| 13 | Business & Financial |    851,000 | 28 | 86% | 0.2874 | 0.5379 | x2.0 | **23.12%** |
| 27 | Arts & Media |    315,500 | 32 | 69% | 0.1654 | 0.4825 | x4.0 | **19.28%** |
| 23 | Legal |     95,100 | 7 | 100% | 0.2159 | 0.4318 | x2.0 | **15.87%** |
| 19 | Life & Social Science |    114,100 | 37 | 78% | 0.1272 | 0.2545 | x2.0 | **12.27%** |
| 11 | Management |    913,100 | 30 | 73% | 0.1143 | 0.2286 | x2.0 | **9.87%** |
| 21 | Community & Social Service |    263,700 | 12 | 50% | 0.0534 | 0.0801 | x1.5 | **4.29%** |
| 17 | Architecture & Engineering |    224,900 | 34 | 56% | 0.0423 | 0.0847 | x2.0 | **3.54%** |
| 29 | Healthcare Practitioners |    530,600 | 42 | 40% | 0.0408 | 0.0612 | x1.5 | **2.75%** |
| 31 | Healthcare Support |    268,200 | 13 | 38% | 0.0378 | 0.0567 | x1.5 | **2.67%** |
| 33 | Protective Service |    392,500 | 21 | 19% | 0.0227 | 0.0341 | x1.5 | **2.08%** |
| 39 | Personal Care |    703,600 | 24 | 25% | 0.0187 | 0.0280 | x1.5 | **1.15%** |
| 49 | Installation & Repair |    631,800 | 50 | 14% | 0.0141 | 0.0212 | x1.5 | **0.98%** |
| 35 | Food Preparation |  1,735,500 | 14 | 21% | 0.0117 | 0.0176 | x1.5 | **0.98%** |
| 47 | Construction |    892,800 | 51 | 14% | 0.0111 | 0.0166 | x1.5 | **0.77%** |
| 45 | Farming & Fishing |    168,800 | 11 | 9% | 0.0107 | 0.0160 | x1.5 | **0.74%** |
| 37 | Building & Grounds |    794,100 | 8 | 38% | 0.0057 | 0.0086 | x1.5 | **0.52%** |
| 51 | Production |    785,800 | 93 | 16% | 0.0069 | 0.0104 | x1.5 | **0.48%** |
| 53 | Transportation |  1,217,100 | 37 | 11% | 0.0027 | 0.0040 | x1.5 | **0.23%** |

---

## 4. Top 30 Highest Risk Occupations (by risk rate)

| # | SOC | Occupation | E_obs | xpf | E_adj | P_win | P_src | Risk(C) |
|---|-----|-----------|-------|-----|-------|-------|-------|---------|
| 1 | 43-4051 | Customer Service Representatives | 0.701 | x2 | 1.000 | 0.756 | direct | **75.56%** |
| 2 | 27-3041 | Editors | 0.246 | x4 | 0.984 | 0.711 | direct | **69.97%** |
| 3 | 41-3031 | Securities, Commodities, and Financial Services  | 0.441 | x2 | 0.883 | 0.733 | direct | **64.72%** |
| 4 | 25-1022 | Mathematical Science Teachers, Postsecondary | 0.430 | x2 | 1.000 | 0.609 | sector | **60.89%** |
| 5 | 25-4012 | Curators | 0.412 | x2 | 1.000 | 0.609 | sector | **60.89%** |
| 6 | 43-9021 | Data Entry Keyers | 0.671 | x2 | 1.000 | 0.551 | sector | **55.11%** |
| 7 | 43-9111 | Statistical Assistants | 0.510 | x2 | 1.000 | 0.551 | sector | **55.11%** |
| 8 | 25-1123 | English Language and Literature Teachers, Postse | 0.362 | x2 | 0.905 | 0.609 | sector | **55.07%** |
| 9 | 25-1032 | Engineering Teachers, Postsecondary | 0.359 | x2 | 0.897 | 0.609 | sector | **54.63%** |
| 10 | 41-4012 | Sales Representatives, Wholesale and Manufacturi | 0.628 | x2 | 1.000 | 0.533 | direct | **53.33%** |
| 11 | 43-9031 | Desktop Publishers | 0.464 | x2 | 0.928 | 0.551 | sector | **51.14%** |
| 12 | 43-6014 | Secretaries and Administrative Assistants, Excep | 0.453 | x2 | 0.906 | 0.551 | sector | **49.91%** |
| 13 | 43-9061 | Office Clerks, General | 0.450 | x2 | 0.901 | 0.551 | sector | **49.64%** |
| 14 | 13-1161 | Market Research Analysts and Marketing Specialis | 0.648 | x2 | 1.000 | 0.493 | sector | **49.33%** |
| 15 | 15-2021 | Mathematicians | 0.424 | x3 | 1.000 | 0.493 | sector | **49.33%** |
| 16 | 15-2031 | Operations Research Analysts | 0.429 | x3 | 1.000 | 0.493 | sector | **49.33%** |
| 17 | 15-2099 | Mathematical Science Occupations, All Other | 0.479 | x3 | 1.000 | 0.493 | sector | **49.33%** |
| 18 | 25-1066 | Psychology Teachers, Postsecondary | 0.322 | x2 | 0.805 | 0.609 | sector | **49.00%** |
| 19 | 43-4171 | Receptionists and Information Clerks | 0.434 | x2 | 0.868 | 0.551 | sector | **47.81%** |
| 20 | 25-1011 | Business Teachers, Postsecondary | 0.307 | x2 | 0.768 | 0.609 | sector | **46.76%** |
| 21 | 25-1071 | Health Specialties Teachers, Postsecondary | 0.304 | x2 | 0.761 | 0.609 | sector | **46.35%** |
| 22 | 25-9031 | Instructional Coordinators | 0.304 | x2 | 0.761 | 0.609 | sector | **46.32%** |
| 23 | 41-3041 | Travel Agents | 0.405 | x2 | 0.811 | 0.569 | sector | **46.13%** |
| 24 | 25-2022 | Middle School Teachers, Except Special and Caree | 0.297 | x2 | 0.743 | 0.609 | sector | **45.24%** |
| 25 | 31-9094 | Medical Transcriptionists | 0.636 | x2 | 0.955 | 0.471 | sector | **44.98%** |
| 26 | 43-4161 | Human Resources Assistants, Except Payroll and T | 0.405 | x2 | 0.809 | 0.551 | sector | **44.60%** |
| 27 | 13-2051 | Financial and Investment Analysts | 0.572 | x2 | 1.000 | 0.444 | direct | **44.44%** |
| 28 | 25-1042 | Biological Science Teachers, Postsecondary | 0.291 | x2 | 0.728 | 0.609 | sector | **44.36%** |
| 29 | 25-2031 | Secondary School Teachers, Except Special and Ca | 0.290 | x2 | 0.725 | 0.609 | sector | **44.16%** |
| 30 | 19-3094 | Political Scientists | 0.452 | x2 | 0.904 | 0.482 | sector | **43.59%** |

---

## 5. Top 30 Largest Employment Impact (risk x employment)

| # | SOC | Occupation | Employment | E_adj | P_win | Risk(C) | Impact |
|---|-----|-----------|-----------|-------|-------|---------|--------|
| 1 | 43-4051 | Customer Service Representatives |    387,600 | 1.000 | 0.756 | 75.6% |    292,853 |
| 2 | 41-2031 | Retail Salespersons |    641,300 | 0.644 | 0.569 | 36.7% |    235,095 |
| 3 | 43-9061 | Office Clerks, General |    360,400 | 0.901 | 0.551 | 49.6% |    178,917 |
| 4 | 43-6014 | Secretaries and Administrative Assistants,  |    233,500 | 0.906 | 0.551 | 49.9% |    116,537 |
| 5 | 41-4012 | Sales Representatives, Wholesale and Manufa |    151,100 | 1.000 | 0.533 | 53.3% |     80,587 |
| 6 | 43-4171 | Receptionists and Information Clerks |    157,900 | 0.868 | 0.551 | 47.8% |     75,499 |
| 7 | 43-3031 | Bookkeeping, Accounting, and Auditing Clerk |    188,500 | 0.621 | 0.551 | 34.2% |     64,491 |
| 8 | 41-2011 | Cashiers |    661,300 | 0.169 | 0.569 | 9.6% |     63,654 |
| 9 | 41-1011 | First-Line Supervisors of Retail Sales Work |    165,500 | 0.525 | 0.689 | 36.2% |     59,901 |
| 10 | 13-1161 | Market Research Analysts and Marketing Spec |     90,700 | 1.000 | 0.493 | 49.3% |     44,745 |
| 11 | 25-2031 | Secondary School Teachers, Except Special a |     80,300 | 0.725 | 0.609 | 44.2% |     35,460 |
| 12 | 11-1021 | General and Operations Managers |    230,000 | 0.276 | 0.511 | 14.1% |     32,398 |
| 13 | 41-3031 | Securities, Commodities, and Financial Serv |     44,600 | 0.883 | 0.733 | 64.7% |     28,867 |
| 14 | 13-1071 | Human Resources Specialists |     67,700 | 0.807 | 0.493 | 39.8% |     26,946 |
| 15 | 13-1111 | Management Analysts |     99,900 | 0.487 | 0.493 | 24.0% |     24,001 |
| 16 | 43-1011 | First-Line Supervisors of Office and Admini |    161,100 | 0.371 | 0.378 | 14.0% |     22,591 |
| 17 | 13-2011 | Accountants and Auditors |    146,000 | 0.696 | 0.222 | 15.5% |     22,568 |
| 18 | 25-2022 | Middle School Teachers, Except Special and  |     48,300 | 0.743 | 0.609 | 45.2% |     21,851 |
| 19 | 13-1199 | Business Operations Specialists, All Other |    119,600 | 0.369 | 0.493 | 18.2% |     21,784 |
| 20 | 41-3021 | Insurance Sales Agents |     53,400 | 0.638 | 0.569 | 36.3% |     19,369 |
| 21 | 43-6013 | Medical Secretaries and Administrative Assi |     82,400 | 0.725 | 0.311 | 22.5% |     18,576 |
| 22 | 25-2021 | Elementary School Teachers, Except Special  |    112,400 | 0.258 | 0.609 | 15.7% |     17,623 |
| 23 | 41-2021 | Counter and Rental Clerks |     58,700 | 0.410 | 0.689 | 28.2% |     16,563 |
| 24 | 41-1012 | First-Line Supervisors of Non-Retail Sales  |     37,000 | 0.459 | 0.867 | 39.8% |     14,719 |
| 25 | 13-2051 | Financial and Investment Analysts |     30,900 | 1.000 | 0.444 | 44.4% |     13,733 |
| 26 | 25-1071 | Health Specialties Teachers, Postsecondary |     29,400 | 0.761 | 0.609 | 46.4% |     13,627 |
| 27 | 41-9022 | Real Estate Sales Agents |     38,900 | 0.566 | 0.600 | 33.9% |     13,201 |
| 28 | 43-6011 | Executive Secretaries and Executive Adminis |     50,500 | 0.467 | 0.551 | 25.7% |     13,003 |
| 29 | 43-3021 | Billing and Posting Clerks |     60,500 | 0.385 | 0.551 | 21.2% |     12,830 |
| 30 | 27-3031 | Public Relations Specialists |     30,700 | 1.000 | 0.382 | 38.2% |     11,734 |

---

## 6. Old vs New: Key Differences

| Metric | Old Method | New Method(C) | Change |
|--------|-----------|--------------|--------|
| National Kill Line | 21.37% | 13.15% | -8.22pp |
| E avg (emp-weighted) | 43.64% | 24.12% | -19.52pp |
| E data source | O*NET theoretical scores | Anthropic real usage + platform correction | Theory -> Empirical |
| E occupation coverage | 46 (GDPval mapped) | 756 (Anthropic full) | +710 |
| P source | GDPval win-only | GDPval win-only (unchanged) | - |
| P occupation coverage | 44 (direct) | 39 direct + ~600 sector fallback | Same fallback strategy |

### Core Improvements

1. **E: from theory to empirical**: Old E ranges 0.58-0.82 (spread 0.24); New E ranges 0.00-1.00 (spread 1.00). 4x better discrimination.
2. **Coverage: 46 -> 756 occupations**: No longer dependent on GDPval's 44 sampled occupations.
3. **Trackable and updatable**: Anthropic updates the dataset quarterly; E updates automatically.

---

## 7. Sensitivity Analysis: platform_factor Impact

| Scenario | Global multiplier | Kill Line (xP_win) | Kill Line (xP_wintie) |
|----------|-------------------|--------------------|-----------------------|
| Claude only (no correction) | x1.0 | 7.01% | 9.50% |
| Conservative x1.5 | x1.5 | 10.42% | 14.15% |
| Moderate x2.0 | x2.0 | 13.02% | 17.83% |
| **Current (tiered)** | **tiered** | **13.15%** | **18.00%** |
| Aggressive x3.0 | x3.0 | 16.96% | 23.44% |
| Upper bound x4.0 | x4.0 | 19.11% | 26.54% |

The platform_factor is the main source of uncertainty, affecting the result by approx +/-5pp.

---

## 8. Reconciling with 21.37%

The old and new values are not contradictory - they answer different questions:

- **13.15%** (new) = How much work is AI *actually replacing right now* across all platforms
- **21.37%** (old) = How much work *could* AI replace if all theoretical capabilities were deployed

The gap (8.22pp) represents proven-feasible but not-yet-deployed AI potential.

Suggested Kill Line UI: show both numbers:

```
Current replacement:    13.15%   <-- Anthropic observed + GDPval blind eval
Theoretical ceiling:    21.37%   <-- O*NET theoretical + GDPval blind eval
```

---

## 9. Data Files Used

| File | Source | Records | Role |
|------|--------|---------|------|
| `job_exposure.csv` | Anthropic EconomicIndex | 756 occupations | E_observed |
| `task_penetration.csv` | Anthropic EconomicIndex | 17,998 tasks | Task-level penetration |
| `automation_vs_augmentation_by_task.csv` | Anthropic EconomicIndex | 3,364 tasks | Automation vs augmentation classification |
| `gdpval_complete_data.json` | OpenAI GDPval | 44 occupations, 9 sectors | P_win, P_wintie |
| `wage_data.csv` | BLS OES | ~800 occupations | Employment weights, salaries |

## 10. Citations

```bibtex
@online{massenkoffmccrory2026labor,
  author = {Maxim Massenkoff and Peter McCrory},
  title = {Labor market impacts of AI: A new measure and early evidence},
  date = {2026-03-05},
  url = {https://www.anthropic.com/research/labor-market-impacts}
}

@misc{handa2025economictasks,
  title = {Which Economic Tasks are Performed with AI?},
  author = {Kunal Handa and Alex Tamkin and others},
  year = {2025},
  url = {https://arxiv.org/abs/2503.04761}
}
```