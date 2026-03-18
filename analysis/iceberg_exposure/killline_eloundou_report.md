# Kill Line Report: Eloundou (2023) Exposure + GDPval Win Rate

> **Method**: E from Eloundou et al. (2023) task-level expert labels, P from OpenAI GDPval (GPT-5.2)
>
> **Formula**: `Kill Line = Σ(employment × E_occ × P_occ) / Σ(employment)`

## 1. Data Coverage

| Metric | Value |
|--------|-------|
| Eloundou task-level labels | 19,265 tasks across 923 O*NET codes |
| Eloundou occupation-level | 798 SOC-6 occupations |
| BLS employment (IN4 2024) | 770 occupations, 130,222,030 total jobs |
| GDPval direct P matches | 43 occupations (25,804,370 jobs) |
| GDPval sector fallback | 462 occupations (58,907,690 jobs) |
| GDPval global fallback | 265 occupations (45,509,970 jobs) |

## 2. Kill Line Results

| E Definition | E (就业加权) | P_wintie | P_win | **KL (win+tie)** | **KL (win-only)** |
|---|---|---|---|---|---|
| α(GPT-4): 纯LLM直接暴露 | 14.2% | 71.3% | 49.9% | **9.90%** | 7.25% |
| β(GPT-4): LLM+工具能加速≥50% | 34.8% | 71.3% | 49.9% | **24.67%** | 17.51% | **← 推荐**
| γ(GPT-4): 最宽泛暴露度 | 55.4% | 71.3% | 49.9% | **39.44%** | 27.76% |
| α(人类): 纯LLM直接暴露 | 15.4% | 71.3% | 49.9% | **10.97%** | 7.82% |
| β(人类): LLM+工具能加速≥50% | 31.4% | 71.3% | 49.9% | **22.33%** | 15.80% |
| γ(人类): 最宽泛暴露度 | 47.3% | 71.3% | 49.9% | **33.68%** | 23.77% |

### 推荐值: **24.7%** (β GPT-4 × P_wintie)

- E = β(GPT-4) = 34.8%: 「LLM + 工具能将任务时间减少 ≥50%」的任务占比
- P = win+tie = 71.3%: AI 完成质量 ≥ 人类的比例 (GDPval GPT-5.2)
- **Kill Line = 24.67%**: 就业加权的 AI 替代率

## 3. Top 30 Highest Risk Occupations (β GPT-4 × P_wintie)

| # | SOC | Occupation | E(β) | P(wintie) | **Risk** | Employment |
|---|-----|-----------|------|-----------|----------|-----------|
| 1 | 15-1252 | Software Developers | 86.8% | 82.2% | **71.4%** | 1,571,530 |
| 2 | 15-2021 | Mathematicians | 100.0% | 71.1% | **71.1%** | 2,070 |
| 3 | 15-1251 | Computer Programmers | 95.0% | 71.1% | **67.6%** | 103,090 |
| 4 | 15-1242 | Database Administrators | 93.5% | 71.1% | **66.5%** | 67,640 |
| 5 | 15-1254 | Web Developers | 93.3% | 71.1% | **66.3%** | 73,350 |
| 6 | 15-1243 | Database Architects | 91.1% | 71.1% | **64.8%** | 59,450 |
| 7 | 15-1253 | Software Quality Assurance Analysts and Testers | 87.7% | 71.1% | **62.4%** | 188,030 |
| 8 | 31-9094 | Medical Transcriptionists | 87.5% | 71.1% | **62.2%** | 41,740 |
| 9 | 15-2099 | Mathematical Science Occupations, All Other | 86.7% | 71.1% | **61.6%** | 3,730 |
| 10 | 43-9081 | Proofreaders and Copy Markers | 97.5% | 60.4% | **58.9%** | 3,290 |
| 11 | 41-9041 | Telemarketers | 80.6% | 72.9% | **58.7%** | 61,570 |
| 12 | 43-4021 | Correspondence Clerks | 96.4% | 60.4% | **58.3%** | 2,620 |
| 13 | 27-3092 | Court Reporters and Simultaneous Captioners | 95.8% | 59.6% | **57.1%** | 12,490 |
| 14 | 51-9162 | Computer Numerically Controlled Tool Programmers | 80.4% | 70.2% | **56.4%** | 19,690 |
| 15 | 27-3023 | News Analysts, Reporters, and Journalists | 65.0% | 86.7% | **56.3%** | 40,480 |
| 16 | 43-2021 | Telephone Operators | 89.5% | 60.4% | **54.1%** | 3,010 |
| 17 | 43-9021 | Data Entry Keyers | 89.3% | 60.4% | **54.0%** | 120,290 |
| 18 | 43-9111 | Statistical Assistants | 89.1% | 60.4% | **53.9%** | 4,910 |
| 19 | 15-1255 | Web and Digital Interface Designers | 75.0% | 71.1% | **53.3%** | 103,710 |
| 20 | 19-2012 | Physicists | 75.0% | 70.9% | **53.1%** | 20,930 |
| 21 | 27-3091 | Interpreters and Translators | 88.0% | 59.6% | **52.4%** | 49,920 |
| 22 | 15-1299 | Computer Occupations, All Other | 73.6% | 71.1% | **52.3%** | 416,660 |
| 23 | 27-3043 | Writers and Authors | 87.7% | 59.6% | **52.2%** | 45,960 |
| 24 | 15-1244 | Network and Computer Systems Administrators | 73.0% | 71.1% | **51.9%** | 297,230 |
| 25 | 15-2041 | Statisticians | 72.5% | 71.1% | **51.5%** | 28,070 |
| 26 | 17-2061 | Computer Hardware Engineers | 72.7% | 70.2% | **51.1%** | 73,900 |
| 27 | 43-3051 | Payroll and Timekeeping Clerks | 83.8% | 60.4% | **50.6%** | 147,040 |
| 28 | 43-9041 | Insurance Claims and Policy Processing Clerks | 83.3% | 60.4% | **50.4%** | 221,820 |
| 29 | 27-3041 | Editors | 64.7% | 77.8% | **50.3%** | 92,310 |
| 30 | 13-1041 | Compliance Officers | 52.6% | 95.6% | **50.3%** | 373,800 |

## 4. Top 30 Largest Employment Impact

| # | SOC | Occupation | Employment | E(β) | P(wintie) | Risk | **Affected Jobs** |
|---|-----|-----------|-----------|------|-----------|------|-----------------|
| 1 | 11-1021 | General and Operations Managers | 3,232,700 | 48.1% | 93.3% | 44.9% | **1,450,571** |
| 2 | 15-1252 | Software Developers | 1,571,530 | 86.8% | 82.2% | 71.4% | **1,122,128** |
| 3 | 43-4051 | Customer Service Representatives | 2,368,230 | 56.8% | 82.2% | 46.7% | **1,106,370** |
| 4 | 41-2031 | Retail Salespersons | 3,445,580 | 34.2% | 72.9% | 24.9% | **859,615** |
| 5 | 29-1141 | Registered Nurses | 3,277,650 | 38.0% | 68.9% | 26.2% | **858,445** |
| 6 | 43-9061 | Office Clerks, General | 2,366,810 | 57.6% | 60.4% | 34.8% | **823,682** |
| 7 | 43-6014 | Secretaries and Administrative Assistants, Ex | 1,663,680 | 64.4% | 60.4% | 38.9% | **647,840** |
| 8 | 43-3031 | Bookkeeping, Accounting, and Auditing Clerks | 1,309,190 | 80.2% | 60.4% | 48.5% | **634,906** |
| 9 | 41-3091 | Sales Representatives of Services, Except Adv | 1,151,710 | 63.3% | 72.9% | 46.2% | **531,934** |
| 10 | 43-1011 | First-Line Supervisors of Office and Administ | 1,319,300 | 49.0% | 82.2% | 40.3% | **531,079** |
| 11 | 35-1012 | First-Line Supervisors of Food Preparation an | 1,146,890 | 51.1% | 70.9% | 36.2% | **415,365** |
| 12 | 13-1199 | Business Operations Specialists, All Other | 1,067,020 | 58.3% | 64.9% | 37.8% | **403,546** |
| 13 | 13-1082 | Project Management Specialists | 946,430 | 55.0% | 73.3% | 40.3% | **381,727** |
| 14 | 41-1011 | First-Line Supervisors of Retail Sales Worker | 887,400 | 48.6% | 84.4% | 41.1% | **364,554** |
| 15 | 13-1071 | Human Resources Specialists | 866,030 | 64.4% | 64.9% | 41.8% | **362,150** |
| 16 | 53-3032 | Heavy and Tractor-Trailer Truck Drivers | 1,784,230 | 27.9% | 70.9% | 19.8% | **352,540** |
| 17 | 41-4012 | Sales Representatives, Wholesale and Manufact | 706,000 | 62.1% | 80.0% | 49.7% | **350,566** |
| 18 | 41-2011 | Cashiers | 2,241,070 | 20.9% | 72.9% | 15.3% | **342,067** |
| 19 | 25-2021 | Elementary School Teachers, Except Special Ed | 1,392,840 | 31.1% | 70.9% | 22.0% | **306,754** |
| 20 | 43-4171 | Receptionists and Information Clerks | 947,140 | 53.3% | 60.4% | 32.2% | **305,330** |
| 21 | 43-6013 | Medical Secretaries and Administrative Assist | 823,650 | 66.7% | 55.6% | 37.0% | **305,056** |
| 22 | 13-2011 | Accountants and Auditors | 1,356,720 | 56.0% | 40.0% | 22.4% | **303,905** |
| 23 | 11-3021 | Computer and Information Systems Managers | 606,620 | 53.0% | 93.3% | 49.5% | **300,246** |
| 24 | 35-3031 | Waiters and Waitresses | 2,290,120 | 18.4% | 70.9% | 13.0% | **298,056** |
| 25 | 15-1232 | Computer User Support Specialists | 660,120 | 61.1% | 71.1% | 43.5% | **286,867** |
| 26 | 13-1161 | Market Research Analysts and Marketing Specia | 786,000 | 52.5% | 64.9% | 34.0% | **267,555** |
| 27 | 25-2031 | Secondary School Teachers, Except Special and | 1,071,590 | 33.3% | 70.9% | 23.6% | **253,105** |
| 28 | 35-3023 | Fast Food and Counter Workers | 3,639,200 | 9.7% | 70.9% | 6.9% | **250,234** |
| 29 | 11-9199 | Managers, All Other | 594,920 | 49.1% | 84.4% | 41.5% | **246,801** |
| 30 | 53-7065 | Stockers and Order Fillers | 1,906,140 | 18.2% | 70.9% | 12.9% | **245,575** |

## 5. By SOC Major Group

| SOC | Category | #Occ | Employment | E(β) | P(wintie) | **Risk** | Contribution |
|-----|----------|------|-----------|------|-----------|----------|-------------|
| 15 | Computer & Math | 21 | 4,881,440 | 75.3% | 74.7% | **56.7%** | 0.0212 |
| 43 | Office & Admin | 50 | 16,004,510 | 60.0% | 65.4% | **38.9%** | 0.0478 |
| 11 | Management | 37 | 9,976,120 | 46.9% | 82.3% | **38.6%** | 0.0296 |
| 17 | Architecture & Engineering | 35 | 2,299,890 | 51.8% | 67.7% | **35.0%** | 0.0062 |
| 13 | Business & Financial | 30 | 8,924,220 | 54.1% | 63.5% | **34.2%** | 0.0235 |
| 19 | Life & Social Science | 47 | 1,330,290 | 45.4% | 70.9% | **32.2%** | 0.0033 |
| 23 | Legal | 7 | 1,201,880 | 46.3% | 68.4% | **31.8%** | 0.0029 |
| 41 | Sales | 21 | 10,638,860 | 41.2% | 75.4% | **31.3%** | 0.0256 |
| 27 | Arts & Media | 36 | 1,826,220 | 48.3% | 60.3% | **29.4%** | 0.0041 |
| 21 | Community & Social Service | 12 | 1,880,520 | 32.0% | 82.2% | **26.5%** | 0.0038 |
| 25 | Education | 58 | 6,906,860 | 37.1% | 70.9% | **26.3%** | 0.0139 |
| 29 | Healthcare Practitioners | 68 | 9,048,950 | 35.1% | 70.1% | **24.5%** | 0.0171 |
| 33 | Protective Service | 23 | 3,581,080 | 23.9% | 84.6% | **20.2%** | 0.0056 |
| 31 | Healthcare Support | 16 | 3,436,150 | 20.9% | 71.1% | **14.9%** | 0.0039 |
| 39 | Personal Care | 28 | 2,972,380 | 17.8% | 71.4% | **12.6%** | 0.0029 |
| 53 | Transportation | 45 | 10,733,170 | 17.7% | 70.9% | **12.5%** | 0.0103 |
| 51 | Production | 97 | 5,083,980 | 17.0% | 71.0% | **12.2%** | 0.0048 |
| 49 | Installation & Repair | 50 | 5,580,120 | 15.7% | 70.2% | **11.0%** | 0.0047 |
| 35 | Food Preparation | 14 | 13,051,230 | 14.5% | 70.9% | **10.3%** | 0.0103 |
| 45 | Farming & Fishing | 11 | 380,030 | 13.9% | 70.9% | **9.9%** | 0.0003 |
| 47 | Construction | 56 | 6,099,730 | 12.5% | 70.9% | **8.8%** | 0.0041 |
| 37 | Building & Grounds | 8 | 4,384,400 | 3.2% | 70.9% | **2.3%** | 0.0008 |

## 6. Top 20 Lowest Risk Occupations (最安全的工作)

| # | SOC | Occupation | E(β) | P(wintie) | **Risk** | Employment |
|---|-----|-----------|------|-----------|----------|-----------|
| 1 | 47-4061 | Rail-Track Laying and Maintenance Equipment Operat | 0.0% | 70.9% | **0.0%** | 16,250 |
| 2 | 37-2011 | Janitors and Cleaners, Except Maids and Housekeepi | 0.0% | 70.9% | **0.0%** | 2,141,300 |
| 3 | 47-5041 | Continuous Mining Machine Operators | 0.0% | 70.9% | **0.0%** | 13,530 |
| 4 | 51-9123 | Painting, Coating, and Decorating Workers | 0.0% | 70.2% | **0.0%** | 5,490 |
| 5 | 51-9111 | Packaging and Filling Machine Operators and Tender | 0.0% | 70.2% | **0.0%** | 325,420 |
| 6 | 51-4071 | Foundry Mold and Coremakers | 0.0% | 70.2% | **0.0%** | 10,430 |
| 7 | 31-1132 | Orderlies | 0.0% | 71.1% | **0.0%** | 51,040 |
| 8 | 49-9045 | Refractory Materials Repairers, Except Brickmasons | 0.0% | 70.2% | **0.0%** | 690 |
| 9 | 35-9011 | Dining Room and Cafeteria Attendants and Bartender | 0.0% | 70.9% | **0.0%** | 518,870 |
| 10 | 49-3093 | Tire Repairers and Changers | 0.0% | 70.2% | **0.0%** | 104,970 |
| 11 | 51-9031 | Cutters and Trimmers, Hand | 0.0% | 70.2% | **0.0%** | 3,540 |
| 12 | 49-3052 | Motorcycle Mechanics | 0.0% | 70.2% | **0.0%** | 13,700 |
| 13 | 51-4052 | Pourers and Casters, Metal | 0.0% | 70.2% | **0.0%** | 5,210 |
| 14 | 49-3031 | Bus and Truck Mechanics and Diesel Engine Speciali | 0.0% | 70.2% | **0.0%** | 273,210 |
| 15 | 47-3012 | Helpers--Carpenters | 0.0% | 70.9% | **0.0%** | 23,250 |
| 16 | 47-3014 | Helpers--Painters, Paperhangers, Plasterers, and S | 0.0% | 70.9% | **0.0%** | 6,830 |
| 17 | 47-3015 | Helpers--Pipelayers, Plumbers, Pipefitters, and St | 0.0% | 70.9% | **0.0%** | 42,790 |
| 18 | 49-3022 | Automotive Glass Installers and Repairers | 0.0% | 70.2% | **0.0%** | 17,650 |
| 19 | 47-3016 | Helpers--Roofers | 0.0% | 70.9% | **0.0%** | 4,900 |
| 20 | 47-5081 | Helpers--Extraction Workers | 0.0% | 70.9% | **0.0%** | 6,510 |

## 7. 方法对比

| | 旧方法 (Anthropic penetration) | **新方法 (Eloundou β)** |
|---|---|---|
| E 来源 | Claude 对话实际使用率 | **专家标注「能否加速≥50%」** |
| E 覆盖 | ~1,354 个非零任务 | **19,265 个任务全覆盖** |
| E 测的是 | Adoption (人们在用什么) | **Capability (AI 能做什么)** |
| 职业覆盖 | ~345 个有观测 | **770 个有就业数据** |
| E 均值 (就业加权) | ~12.7% (Claude only) | **34.8%** |
| P 来源 | GDPval GPT-5.2 | GDPval GPT-5.2 (同) |
| P 均值 | 71.3% | 71.3% (同) |
| **Kill Line (win+tie)** | ~10.6-18.0% | **24.67%** |
| Kill Line (win-only) | ~7.7-15.4% | 17.51% |

**解读**: 旧方法测「实际采用率」(10-18%)，新方法测「能力天花板」(24.9%)。
真实 AI 替代率在两者之间：AI 已经能做，但还没被所有人用起来。
