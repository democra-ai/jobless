# Task-Level Fusion Report: O*NET + Anthropic + GDPval

> All calculations done in the **O*NET task space** — exposure and win rate are multiplied per-task, then aggregated.
>
> Data: O*NET 30.1 + Anthropic Economic Index (2026-03) + OpenAI GDPval (GPT-5.2/5.4)

## 1. Data Fusion Pipeline

```
For each O*NET task t (in occupation o):
  E_t = penetration_t(Anthropic) x platform_factor(SOC) 
  P_t = win_rate_occ(GDPval, mapped via SOC)           
  Risk_t = E_t x P_t                                   

Risk_occ = Sum(w_t x Risk_t) / Sum(w_t)   [O*NET importance x prevalence weights]
Risk_national = Sum(emp_occ x Risk_occ) / Sum(emp_occ)  [BLS employment weights]
```

## 2. Data Matching Quality


| Metric                                    | Value          |
| ----------------------------------------- | -------------- |
| O*NET task-occupation rows                | 18,810         |
| Unique SOC codes                          | 798            |
| Tasks with non-zero Anthropic penetration | 1,734 (9.2%)   |
| Tasks with automation classification      | 2,871 (15.3%)  |
| P_win source: direct GDPval match         | 1,395 (7.4%)   |
| P_win source: sector fallback             | 11,212 (59.6%) |
| P_win source: global fallback             | 6,203 (33.0%)  |


## 3. National Results (Employment-Weighted)

Total employment coverage: **130,222,030**
Occupations with employment: **770**

### 3.1 Three Key National Values (using win+tie)


| Metric                                              | GPT-5.2   | GPT-5.4    |
| --------------------------------------------------- | --------- | ---------- |
| **E (Exposure, employment-weighted)**               | 12.88%    | 12.88%     |
| **P_wintie (AI win+tie rate, employment-weighted)** | 71.33%    | 83.14%     |
| **Kill Line = E x P_wintie (employment-weighted)**  | **9.08%** | **10.58%** |


### 3.2 All Methods Comparison


| Method              | E source               | P source | GPT-5.2 Kill Line | GPT-5.4 Kill Line |
| ------------------- | ---------------------- | -------- | ----------------- | ----------------- |
| C: E_adj x P_win    | penetration x pf       | win_rate | **6.62%**         | **7.75%**         |
| D: E_adj x P_wintie | penetration x pf       | wintie   | **9.08%**         | **10.58%**        |
| E: E_auto x P_win   | pen x auto_weight x pf | win_rate | **6.21%**         | **7.27%**         |
| Baseline (old)      | theoretical            | win_rate | **21.37%**        | —                 |


### 3.3 Component Breakdown


| Component                     | Value  | Source                     |
| ----------------------------- | ------ | -------------------------- |
| E_observed (raw, Claude only) | 11.62% | Anthropic task penetration |
| E_adjusted (multi-platform)   | 12.88% | x platform_factor          |
| E_auto_weighted               | 12.03% | x auto_weight x pf         |
| P_win (GPT-5.2)               | 49.87% | GDPval                     |
| P_win (GPT-5.4)               | 58.38% | GDPval x 1.17              |
| P_wintie (GPT-5.2)            | 71.33% | GDPval                     |
| P_wintie (GPT-5.4)            | 83.14% | GDPval x 1.17              |


## 4. Top 30 Highest Risk Occupations (GPT-5.4, Method D: win+tie)


| #   | SOC     | Occupation                                         | Tasks | E_adj | P_wintie | Risk      | Employment |
| --- | ------- | -------------------------------------------------- | ----- | ----- | -------- | --------- | ---------- |
| 1   | 15-1251 | Computer Programmers                               | 17    | 0.667 | 0.832    | **55.5%** | 103,090    |
| 2   | 15-1243 | Database Architects                                | 43    | 0.650 | 0.832    | **54.1%** | 59,450     |
| 3   | 41-4012 | Sales Representatives, Wholesale and Manufacturing | 18    | 0.560 | 0.937    | **52.4%** | 706,000    |
| 4   | 43-4051 | Customer Service Representatives                   | 13    | 0.537 | 0.963    | **51.7%** | 2,368,230  |
| 5   | 41-3091 | Sales Representatives of Services, Except Advertis | 15    | 0.600 | 0.854    | **51.2%** | 1,151,710  |
| 6   | 13-1161 | Market Research Analysts and Marketing Specialists | 49    | 0.563 | 0.760    | **42.8%** | 786,000    |
| 7   | 11-3131 | Training and Development Managers                  | 12    | 0.427 | 0.989    | **42.2%** | 39,490     |
| 8   | 15-2099 | Mathematical Science Occupations, All Other        | 19    | 0.493 | 0.832    | **41.1%** | 3,730      |
| 9   | 15-1254 | Web Developers                                     | 29    | 0.487 | 0.832    | **40.6%** | 73,350     |
| 10  | 11-2032 | Public Relations Managers                          | 27    | 0.407 | 0.989    | **40.3%** | 71,310     |
| 11  | 29-2072 | Medical Records Specialists                        | 17    | 0.471 | 0.832    | **39.2%** | 186,170    |
| 12  | 15-1252 | Software Developers                                | 17    | 0.405 | 0.963    | **39.0%** | 1,571,530  |
| 13  | 19-4061 | Social Science Research Assistants                 | 22    | 0.462 | 0.830    | **38.3%** | 30,740     |
| 14  | 25-1051 | Atmospheric, Earth, Marine, and Space Sciences Tea | 26    | 0.454 | 0.830    | **37.7%** | 11,420     |
| 15  | 25-1193 | Recreation and Fitness Studies Teachers, Postsecon | 23    | 0.453 | 0.830    | **37.6%** | 12,530     |
| 16  | 15-1212 | Information Security Analysts                      | 11    | 0.442 | 0.832    | **36.8%** | 162,990    |
| 17  | 25-1126 | Philosophy and Religion Teachers, Postsecondary    | 22    | 0.443 | 0.830    | **36.8%** | 20,810     |
| 18  | 41-3031 | Securities, Commodities, and Financial Services Sa | 30    | 0.400 | 0.911    | **36.4%** | 222,810    |
| 19  | 25-1061 | Anthropology and Archeology Teachers, Postsecondar | 27    | 0.432 | 0.830    | **35.9%** | 5,230      |
| 20  | 25-1063 | Economics Teachers, Postsecondary                  | 22    | 0.427 | 0.830    | **35.4%** | 12,420     |
| 21  | 25-1032 | Engineering Teachers, Postsecondary                | 24    | 0.422 | 0.830    | **35.0%** | 39,890     |
| 22  | 25-4012 | Curators                                           | 15    | 0.421 | 0.830    | **34.9%** | 11,590     |
| 23  | 25-1054 | Physics Teachers, Postsecondary                    | 24    | 0.419 | 0.830    | **34.7%** | 13,570     |
| 24  | 25-1065 | Political Science Teachers, Postsecondary          | 22    | 0.418 | 0.830    | **34.7%** | 17,160     |
| 25  | 31-9094 | Medical Transcriptionists                          | 15    | 0.415 | 0.832    | **34.6%** | 41,740     |
| 26  | 25-1123 | English Language and Literature Teachers, Postseco | 33    | 0.416 | 0.830    | **34.5%** | 59,560     |
| 27  | 25-1082 | Library Science Teachers, Postsecondary            | 25    | 0.412 | 0.830    | **34.1%** | 4,090      |
| 28  | 11-2021 | Marketing Managers                                 | 20    | 0.345 | 0.989    | **34.1%** | 344,100    |
| 29  | 25-1124 | Foreign Language and Literature Teachers, Postseco | 24    | 0.409 | 0.830    | **34.0%** | 21,070     |
| 30  | 25-1042 | Biological Science Teachers, Postsecondary         | 27    | 0.407 | 0.830    | **33.8%** | 53,080     |


## 5. Top 30 Largest Employment Impact (GPT-5.4, win+tie)


| #   | SOC     | Occupation                                         | Employment | E_adj | P_wintie | Risk  | Affected  |
| --- | ------- | -------------------------------------------------- | ---------- | ----- | -------- | ----- | --------- |
| 1   | 43-4051 | Customer Service Representatives                   | 2,368,230  | 0.537 | 0.963    | 51.7% | 1,223,868 |
| 2   | 43-9061 | Office Clerks, General                             | 2,366,810  | 0.413 | 0.708    | 29.2% | 691,229   |
| 3   | 41-2031 | Retail Salespersons                                | 3,445,580  | 0.234 | 0.854    | 20.0% | 688,700   |
| 4   | 15-1252 | Software Developers                                | 1,571,530  | 0.405 | 0.963    | 39.0% | 612,495   |
| 5   | 41-3091 | Sales Representatives of Services, Except Advertis | 1,151,710  | 0.600 | 0.854    | 51.2% | 589,940   |
| 6   | 43-6014 | Secretaries and Administrative Assistants, Except  | 1,663,680  | 0.374 | 0.708    | 26.4% | 439,952   |
| 7   | 11-1021 | General and Operations Managers                    | 3,232,700  | 0.127 | 1.000    | 12.7% | 410,320   |
| 8   | 41-4012 | Sales Representatives, Wholesale and Manufacturing | 706,000    | 0.560 | 0.937    | 52.4% | 370,167   |
| 9   | 13-1161 | Market Research Analysts and Marketing Specialists | 786,000    | 0.563 | 0.760    | 42.8% | 336,211   |
| 10  | 41-1011 | First-Line Supervisors of Retail Sales Workers     | 887,400    | 0.317 | 0.989    | 31.3% | 278,168   |
| 11  | 25-2021 | Elementary School Teachers, Except Special Educati | 1,392,840  | 0.237 | 0.830    | 19.6% | 273,428   |
| 12  | 43-1011 | First-Line Supervisors of Office and Administrativ | 1,319,300  | 0.206 | 0.963    | 19.9% | 262,218   |
| 13  | 25-2031 | Secondary School Teachers, Except Special and Care | 1,071,590  | 0.294 | 0.830    | 24.4% | 261,744   |
| 14  | 13-1071 | Human Resources Specialists                        | 866,030    | 0.365 | 0.760    | 27.8% | 240,400   |
| 15  | 15-1232 | Computer User Support Specialists                  | 660,120    | 0.389 | 0.832    | 32.4% | 213,999   |
| 16  | 43-4171 | Receptionists and Information Clerks               | 947,140    | 0.313 | 0.708    | 22.2% | 209,980   |
| 17  | 13-1199 | Business Operations Specialists, All Other         | 1,067,020  | 0.244 | 0.760    | 18.5% | 197,509   |
| 18  | 13-2011 | Accountants and Auditors                           | 1,356,720  | 0.276 | 0.468    | 12.9% | 175,299   |
| 19  | 25-2022 | Middle School Teachers, Except Special and Career/ | 619,750    | 0.338 | 0.830    | 28.0% | 173,643   |
| 20  | 43-3031 | Bookkeeping, Accounting, and Auditing Clerks       | 1,309,190  | 0.187 | 0.708    | 13.2% | 173,177   |
| 21  | 41-2011 | Cashiers                                           | 2,241,070  | 0.090 | 0.854    | 7.7%  | 171,896   |
| 22  | 29-1141 | Registered Nurses                                  | 3,277,650  | 0.060 | 0.806    | 4.9%  | 159,200   |
| 23  | 43-6013 | Medical Secretaries and Administrative Assistants  | 823,650    | 0.271 | 0.650    | 17.6% | 145,271   |
| 24  | 11-3021 | Computer and Information Systems Managers          | 606,620    | 0.238 | 1.000    | 23.8% | 144,458   |
| 25  | 13-1111 | Management Analysts                                | 843,910    | 0.224 | 0.760    | 17.0% | 143,708   |
| 26  | 13-1082 | Project Management Specialists                     | 946,430    | 0.150 | 0.858    | 12.9% | 121,875   |
| 27  | 15-1211 | Computer Systems Analysts                          | 466,170    | 0.310 | 0.832    | 25.8% | 120,344   |
| 28  | 11-2021 | Marketing Managers                                 | 344,100    | 0.345 | 0.989    | 34.1% | 117,473   |
| 29  | 41-3021 | Insurance Sales Agents                             | 461,040    | 0.252 | 0.854    | 21.5% | 99,184    |
| 30  | 13-2051 | Financial and Investment Analysts                  | 298,640    | 0.423 | 0.728    | 30.8% | 92,033    |


## 6. By SOC Major Group (GPT-5.4, Method D: win+tie)


| SOC | Category                   | Employment | E_adj | P_wintie_54 | Risk       | Contribution |
| --- | -------------------------- | ---------- | ----- | ----------- | ---------- | ------------ |
| 15  | Computer & Math            | 4,881,440  | 0.362 | 0.874       | **31.87%** | 0.0119       |
| 41  | Sales                      | 10,638,860 | 0.274 | 0.882       | **24.41%** | 0.0199       |
| 43  | Office & Admin             | 16,004,510 | 0.284 | 0.765       | **22.44%** | 0.0276       |
| 25  | Education                  | 6,906,860  | 0.247 | 0.830       | **20.48%** | 0.0109       |
| 13  | Business & Financial       | 8,924,220  | 0.255 | 0.739       | **18.52%** | 0.0127       |
| 11  | Management                 | 9,976,120  | 0.137 | 0.923       | **11.69%** | 0.0090       |
| 27  | Arts & Media               | 1,826,220  | 0.162 | 0.706       | **11.55%** | 0.0016       |
| 23  | Legal                      | 1,201,880  | 0.138 | 0.801       | **10.97%** | 0.0010       |
| 19  | Life & Social Science      | 1,330,290  | 0.091 | 0.830       | **7.55%**  | 0.0008       |
| 21  | Community & Social Service | 1,880,520  | 0.053 | 0.962       | **5.16%**  | 0.0007       |
| 29  | Healthcare Practitioners   | 9,048,950  | 0.062 | 0.821       | **5.09%**  | 0.0035       |
| 17  | Architecture & Engineering | 2,299,890  | 0.062 | 0.792       | **4.90%**  | 0.0009       |
| 39  | Personal Care              | 2,972,380  | 0.039 | 0.836       | **3.10%**  | 0.0007       |
| 45  | Farming & Fishing          | 380,030    | 0.025 | 0.830       | **2.09%**  | 0.0001       |
| 49  | Installation & Repair      | 5,580,120  | 0.023 | 0.822       | **1.92%**  | 0.0008       |
| 33  | Protective Service         | 3,581,080  | 0.019 | 0.989       | **1.89%**  | 0.0005       |
| 31  | Healthcare Support         | 3,436,150  | 0.020 | 0.832       | **1.68%**  | 0.0004       |
| 47  | Construction               | 6,099,730  | 0.020 | 0.830       | **1.63%**  | 0.0008       |
| 51  | Production                 | 5,083,980  | 0.015 | 0.831       | **1.27%**  | 0.0005       |
| 35  | Food Preparation           | 13,051,230 | 0.012 | 0.830       | **0.96%**  | 0.0010       |
| 37  | Building & Grounds         | 4,384,400  | 0.007 | 0.830       | **0.62%**  | 0.0002       |
| 53  | Transportation             | 10,733,170 | 0.004 | 0.830       | **0.31%**  | 0.0003       |


## 7. Comparison: Old vs New Kill Line


|                      | Old Method                      | New (Task-level Fusion)                    |
| -------------------- | ------------------------------- | ------------------------------------------ |
| Kill Line (win+tie)  | 21.37%                          | **10.58%** (GPT-5.4)                       |
| E source             | Keyword heuristic on O*NET text | Anthropic real usage + platform correction |
| P source             | GDPval occupation-level         | GDPval task-level (via occupation SOC)     |
| Multiplication level | Occupation                      | **Task** (then aggregate)                  |
| E avg                | 43.64%                          | 12.88%                                     |
| P avg (wintie)       | 70.86% (5.2)                    | 83.14% (5.4)                               |
| Anthropic raw E      | —                               | 11.62%                                     |


## 8. Methodology Notes

1. **Task-level multiplication**: Unlike previous occupation-level approach, E and P are multiplied per O*NET task before aggregation.
2. **Platform factor**: Corrects for Claude being one of many AI platforms (x1.5-4.0 by sector).
3. **Automation weighting** (Method E): Uses Anthropic's auto/aug classification — automation=1.0x, augmentation=0.5x.
4. **GPT-5.4 scaling**: P_win scaled by 83.0/70.9 = 1.1706x from GPT-5.2 baseline.
5. **Task weight**: O*NET Importance x Prevalence, used for occupation-level aggregation.

