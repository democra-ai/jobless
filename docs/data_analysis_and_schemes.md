# Kill Line 数据分析：定义对比、数据清单与组合方案

## 表1：你的概念定义 vs 数据实际含义


| 你的概念          | 你的定义                                            | 理想数据长什么样                                   |
| ------------- | ----------------------------------------------- | ------------------------------------------ |
| **E（曝光度）**    | 某职业所需的所有任务中，AI能做的比例                             | 每个O*NET任务一个0/1标签（能/不能），然后算 `能做的任务数 / 总任务数` |
| **P（胜率）**     | 对于AI能做的那些任务，AI完成质量 ≥ 人类的比例                      | 每个任务一个 win_or_tie 率（0-1），最好由独立专家评判         |
| **Kill Line** | `Σ(employment × E_occ × P_occ) / Σ(employment)` | 全国就业加权平均                                   |


---

## 表2：两个 HuggingFace 仓库所有可用数据的完整清单

### 仓库1: `Anthropic/EconomicIndex`


| 文件                                 | 字段                                                                         | 实际含义                          | 方法论                                                  | 颗粒度          | 值域                      |
| ---------------------------------- | -------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------- | ------------ | ----------------------- |
| **v1 onet_task_mappings.csv**      | `task_name, pct`                                                           | 该O*NET任务占所有Claude对话的百分比       | Clio分类器对随机抽样对话做3层层级匹配，映射到O*NET任务                     | 任务级，3,514个任务 | pct: 0.002-4.79，sum=100 |
| **v2 task_pct_v2.csv**             | `task_name, pct`                                                           | 同上，v2更新版（用Sonnet 3.7数据重跑）     | 同上                                                   | 任务级，3,365个任务 | pct: 0.002-6.65，sum=100 |
| **v2 auto_aug_by_task.csv**        | `directive, feedback_loop, task_iteration, validation, learning, filtered` | 对于该任务的Claude对话，各种人机协作模式的比例    | Clio对每个对话分类：Directive=AI一步完成；其余=人参与迭代；filtered=非工作用途 | 任务级，3,364个任务 | 各列0-1，同任务各列之和=1         |
| **v2 task_thinking_fractions.csv** | `thinking_fraction`                                                        | 该任务使用Extended Thinking模式的对话比例 | 统计性的                                                 | 任务级          | 0-1                     |
| **v3 aei_raw_claude_ai (2025-08)** | `facet, variable, cluster_name, value`                                     | v3按国家/州地理维度分的对话统计             | 同Clio，增加地理维度                                         | 国家+任务级       | —                       |
| **v4 aei_raw_claude_ai (2025-11)** | 同上，新增多个facet                                                               | 见下方v4 facet详解                 | Clio + 新分类prompt（见appendix）                          | 国家+任务级       | —                       |
| **v1 bls_employment_may_2023.csv** | `SOC Title, bls_distribution`                                              | BLS就业分布（22大类）                 | BLS官方数据                                              | SOC大类级       | —                       |
| **v1 wage_data.csv**               | `SOCcode, MedianSalary, ChanceAuto...`                                     | O*NET职业工资+自动化概率               | O*NET网站爬取                                            | 职业级，1,090个   | —                       |
| **v1 onet_task_statements.csv**    | `O*NET-SOC Code, Task`                                                     | O*NET任务-职业映射表                 | 美国劳工部                                                | 任务×职业        | —                       |


#### v4 新增 facet 详解（关键数据！）


| Facet                  | 含义                      | Clio分类prompt                                                    | 值域                               | 任务级覆盖           |
| ---------------------- | ----------------------- | --------------------------------------------------------------- | -------------------------------- | --------------- |
| **task_success**       | "AI是否成功完成了用户的任务？"       | Yes/No二分类                                                       | Yes=64.6%, No=35.4% (全球)         | 2,506个任务有逐任务成功率 |
| **ai_autonomy**        | "AI在对话中有多少自主权？"         | 1-5分（1=无，5=极高）                                                  | 全球均值=3.33                        | 3,169个任务        |
| **human_only_time**    | "如果没有AI，人类完成此任务需要多少小时？" | Clio估算小时数                                                       | 均值=3.0小时                         | 3,169个任务        |
| **human_with_ai_time** | "用户在此对话中花了多少分钟？"        | Clio估算分钟数                                                       | 均值=13.8分钟                        | 3,169个任务        |
| **use_case**           | "这个对话是工作/学习/个人用途？"      | Work/Coursework/Personal三分类                                     | Work=35.1%, Personal/Other=64.9% | 3,169个任务        |
| **human_only_ability** | "用户能否独立完成此任务（不用AI）？"    | Yes/No                                                          | —                                | 3,169个任务        |
| **collaboration**      | 人机协作模式                  | Directive/Feedback Loop/Task Iteration/Validation/Learning/None | —                                | 3,169个任务        |


### 仓库2: `Anthropic/labor_market_impacts`


| 文件                       | 字段                                   | 实际含义                                 | 方法论                                           | 颗粒度                   | 值域                         |
| ------------------------ | ------------------------------------ | ------------------------------------ | --------------------------------------------- | --------------------- | -------------------------- |
| **task_penetration.csv** | `task, penetration`                  | **Clio分类器将对话匹配到该O*NET任务的置信度/概率**     | Clio层级遍历时的匹配置信度，<0.5截为0（表示"更可能不是此任务"）         | 任务级，17,998个（非零1,354个） | 非零: 0.50-1.00, median=0.91 |
| **job_exposure.csv**     | `occ_code, title, observed_exposure` | **该职业的O*NET任务中，有多少比例在Claude对话中被观察到** | 论文方法：统计该职业有多少任务在Claude对话中出现过（需≥5用户+15对话），计算比例 | 职业级，756个（非零345个）      | 0-0.745, mean=0.077        |


### 本地数据: GDPval


| 数据                            | 含义                     | 方法论                                               | 颗粒度                  | 值域                                  |
| ----------------------------- | ---------------------- | ------------------------------------------------- | -------------------- | ----------------------------------- |
| **gdpval_complete_data.json** | AI（各模型）vs 人类专家在各职业上的胜率 | OpenAI设计评测场景，让AI和人类同时完成该职业典型任务，由独立评审（裁判模型+人类）判断胜负 | 44个职业 × 11个模型 × 9个行业 | GPT-5.2: win=0.50, wintie=0.71 (全局) |


---

## 表3：Anthropic/OpenAI 他们自己是怎么做的


| 来源                           | 他们想回答的问题              | 他们的方法                                           | 关键假设                                                                              |
| ---------------------------- | --------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------- |
| **Anthropic Economic Index** | "人们实际在用AI做什么经济任务？"    | 随机抽样Claude对话→Clio(Claude)自动分类→映射到O*NET任务体系→统计分布 | ① Clio分类准确（Claude评自己的对话）；② Claude.ai对话能代表全行业AI使用情况（但只覆盖一个平台）；③ O*NET任务体系能完整覆盖AI用途 |
| **GDPval (OpenAI)**          | "AI输出能不能替代人类专业人员的输出？" | 为44个职业设计真实工作场景→让AI和人类都做→盲审评判                    | ① 44个职业能代表整体劳动市场；② 评测场景能代表真实工作；③ 评审者（含GPT-4模型做裁判）判断准确                             |


**关键区别**：Anthropic测的是**"人们在用AI做什么"**（使用率/adoption），OpenAI测的是**"AI做得好不好"**（能力/capability）。两者都不直接等于你要的"AI能替代多少工作"。

---

## 表4：你的定义 vs 各数据的真实含义对比


| 你要的            | 候选数据                               | 实际测的是什么                     | 差距                                   |
| -------------- | ---------------------------------- | --------------------------- | ------------------------------------ |
| **E: AI能做该任务** | `task_penetration`                 | Clio匹配置信度（0.5-1.0），不是"能不能做" | ❌ 完全不匹配。这是分类器置信度，不是能力指标              |
| **E: AI能做该任务** | `job_exposure` (observed_exposure) | 该职业任务中有多少在Claude对话中出现过      | ⚠️ 部分匹配。"被使用过" ≈ "能做"的下界（能做但没人用的被漏掉） |
| **E: AI能做该任务** | v4 `onet_task_pct` > 0 (二值化)       | 该任务是否在Claude对话中出现过          | ⚠️ 同上，且只反映Claude用户的使用习惯              |
| **E: AI能做该任务** | v4 `task_success` = Yes 的任务        | AI成功完成过的任务                  | ✅ 较好匹配！"成功完成" ≈ "能做"。但Clio自评有偏差      |
| **P: AI质量≥人类** | GDPval `win_or_tie_rate`           | 独立评审判定AI输出≥人类的比例            | ✅ 最佳匹配。但只有44个职业                      |
| **P: AI质量≥人类** | v4 `task_success` (yes_pct)        | AI成功完成任务的比例                 | ⚠️ "完成了"≠"比人好"。低标准：只要完成就算，不跟人比       |
| **P: AI质量≥人类** | v4 `ai_autonomy` (1-5)             | AI在对话中的自主决策程度               | ❌ 测的是"谁在主导"，不是"做得好不好"                |


---

## 表5：组合方案 — 如何最接近你的定义

### 方案A：最简单 — 直接用 Anthropic 的 `job_exposure`


| 组成        | 数据来源                                           | 值                  |
| --------- | ---------------------------------------------- | ------------------ |
| E（职业级）    | `job_exposure.csv` → `observed_exposure`       | 0-0.745, 全国加权≈7.7% |
| P（职业级）    | GDPval `win_or_tie_rate` (44个直接匹配，其余用sector回退) | 0.29-0.96          |
| Kill Line | `Σ(emp × E × P) / Σ(emp)`                      | —                  |


**优点**：E 是 Anthropic 官方计算的职业级曝光度，P 是最权威的胜率数据
**缺点**：E 只反映"Claude用户做过的"（使用率下界），不是"AI能做的"；P 只有44个职业

---

### 方案B：用 v4 `task_success` 构造任务级 E


| 组成        | 数据来源                                                               | 逻辑  |
| --------- | ------------------------------------------------------------------ | --- |
| E_task    | v4 `onet_task::task_success`：如果 success_rate > 阈值（如50%）→ 该任务AI"能做" | 二值化 |
| E_occ     | `Σ(能做的任务) / Σ(该职业所有O*NET任务)`                                       | 比例  |
| P_occ     | GDPval `win_or_tie_rate`                                           | 不变  |
| Kill Line | `Σ(emp × E_occ × P_occ) / Σ(emp)`                                  | —   |


**优点**：E 基于"AI成功完成了该任务"，更接近"能做"的概念；任务级颗粒度（2,506个任务）
**缺点**：task_success 是 Clio (Claude) 自评，有自我评价偏差；只覆盖 Claude 对话中出现过的任务；阈值选择主观

---

### 方案C：用 v4 `task_success` 同时构造 E 和 P


| 组成        | 数据来源                                             | 逻辑                 |
| --------- | ------------------------------------------------ | ------------------ |
| E_task    | v4 任务在Claude对话中出现过 → 1，否则 → 0                    | 二值化出现/未出现          |
| P_task    | v4 `onet_task::task_success` → success_rate（每任务） | 0-1 连续值            |
| Risk_task | E_task × P_task                                  | 即：对出现过的任务，风险 = 成功率 |
| Risk_occ  | `Σ(Risk_task) / Σ(该职业任务总数)`                      | 加权平均               |
| Kill Line | `Σ(emp × Risk_occ) / Σ(emp)`                     | —                  |


**优点**：纯 Anthropic 数据，不需要 GDPval；P 是任务级而非职业级
**缺点**：P 的定义变了 —— 从"AI ≥ 人"变成了"AI完成了任务"（标准更低）；E 仍然只覆盖 Claude 用户做过的

---

### 方案D：综合方案 — 最大化匹配你的定义


| 组成         | 数据来源                                                                       | 逻辑            |
| ---------- | -------------------------------------------------------------------------- | ------------- |
| E_task     | v4 `task_success` rate > 0（该任务在Claude对话中被成功完成过） **AND** `use_case` 包含 work | 只算工作场景中AI成功过的 |
| E_occ      | 能做的工作任务数 / 该职业总O*NET任务数                                                    | —             |
| P_occ      | GDPval `win_or_tie_rate`（有直接数据的44个职业用直接值，其余用sector均值）                      | —             |
| Platform修正 | E_occ × platform_factor（1.5-4.0），因为Claude只是多个AI平台之一                        | —             |
| Kill Line  | `Σ(emp × min(E_occ×PF, 1) × P_occ) / Σ(emp)`                               | —             |


**优点**：E 限定在"工作场景中AI成功完成的任务"（最贴合"AI能做的工作"概念）；P 用最权威的GDPval；Platform修正弥补单一平台的观测偏差
**缺点**：仍有Clio自评偏差；platform_factor是主观估计

---

### 方案E：时间替代率 — 利用 v4 独特的时间数据


| 组成               | 数据来源                                         | 逻辑             |
| ---------------- | -------------------------------------------- | -------------- |
| time_saving_task | `1 - (human_with_ai_time / human_only_time)` | AI节省的时间比例      |
| E_task（重新定义）     | time_saving > 阈值（如 50%）→ AI能实质性完成该任务         | 二值化            |
| 或直接用 Risk_task   | `time_saving_task × task_success_rate`       | 连续值：节省时间 × 成功率 |
| Kill Line        | 就业加权平均                                       | —              |


**优点**：time_saving 是一个全新维度，直接衡量"AI替代了多少人类工作时间"；比二元的"能/不能做"更细腻
**缺点**：human_only_time 均值只有3小时，human_with_ai_time均值13.8分钟 — 说明Claude对话处理的是碎片化小任务，不是完整的职业任务；时间估算本身由Clio给出，可靠性存疑

---

## 方案对比总结


| 方案                               | E 概念       | P 概念 | 匹配度  | 数据质量 | 覆盖面              |
| -------------------------------- | ---------- | ---- | ---- | ---- | ---------------- |
| **A: job_exposure + GDPval**     | Claude用户做过 | 专家评审 | ⭐⭐   | ⭐⭐⭐  | E:756职业, P:44职业  |
| **B: task_success>50% + GDPval** | AI成功完成过    | 专家评审 | ⭐⭐⭐  | ⭐⭐⭐  | E:2506任务, P:44职业 |
| **C: 出现+task_success**           | 出现过        | 完成率  | ⭐⭐   | ⭐⭐   | 纯Anthropic       |
| **D: work+success+GDPval+PF**    | 工作场景AI成功   | 专家评审 | ⭐⭐⭐⭐ | ⭐⭐⭐  | 最全组合             |
| **E: 时间替代率**                     | 时间节省       | 成功率  | ⭐⭐⭐  | ⭐⭐   | 时间数据新颖           |


**建议**：**方案D** 最接近原始概念定义。方案B是一个不错的简化版。

---

## 仓库3: Eloundou et al. (2023) — `openai/GPTs-are-GPTs`

> 论文: *GPTs are GPTs: An Early Look at the Labor Market Impact Potential of Large Language Models* (Eloundou, Manning, Mishkin, Rock, 2023)
> 数据地址: `data/gpts-are-gpts/`（本地已下载自 https://github.com/openai/GPTs-are-GPTs/tree/main/data）

### 方法论

Eloundou (2023) 的 Exposure 计算方法：

1. **任务级标注**：对 O*NET 全部 19,265 个任务，分别由**人类标注者**和 **GPT-4** 各自独立标注 exposure 等级：
   - `E0` = 不暴露：LLM 无法将完成时间减少至少 50%
   - `E1` = 直接暴露：仅靠 LLM 文本能力（无额外工具）就能将时间减少 ≥50%
   - `E2` = 间接暴露：需要在 LLM 基础上构建额外软件/工具才能减少 ≥50% 时间

2. **职业级汇总**：将任务级标签转为职业级 exposure 分数：
   - `alpha (α)` = 该职业中被标为 E1（直接暴露）的任务占比
   - `beta (β)` = 被标为 E1 或 E2 的任务占比（含间接暴露）
   - `gamma (γ)` = alpha 和 beta 的上界聚合（最宽泛的暴露度定义）
   - 分别有 `dv_rating`（GPT-4 标注）和 `human_rating`（人类标注）两个版本

3. **关键统计**：
   - 全职业均值：α=0.14, β=0.35, **γ=0.55**（GPT-4标注）
   - 即 GPT-4 认为 **55% 的 O*NET 任务**在工具辅助下可被 LLM 加速 ≥50%
   - 人类标注更保守：α=0.14, β=0.30, γ=0.46

### 数据文件清单

| 文件 | 行数 | 含义 | 关键字段 | 对我们的价值 |
| --- | --- | --- | --- | --- |
| **full_labelset.tsv** | 19,265 | 每个 O*NET 任务的完整 exposure 标签集 | `O*NET-SOC Code`, `Task ID`, `Task`, `human_exposure_agg`(E0/E1/E2), `gpt4_exposure`(E0/E1/E2), `alpha`, `beta`, `gamma`, `automation`(0-1), `human_labels` | **极高** — 这是最完整的任务级 AI exposure 标签，923个职业 × 19,265个任务 |
| **occ_level.csv** | 923 | 职业级 exposure 评分汇总 | `O*NET-SOC Code`, `Title`, `dv_rating_alpha/beta/gamma`, `human_rating_alpha/beta/gamma` | **极高** — 直接可用的职业级 E 值，覆盖全部 923 个 O*NET 职业 |
| **automation_gpt4_human_labels.tsv** | 19,265 | GPT-4 和人类对每个任务的自动化等级标注 | `O*NET-SOC Code`, `Task ID`, `Task`, `gpt4_automation`(T1-T4), `human_automation`(T1-T4) | **高** — T1=无自动化, T2=部分, T3=大部分, T4=完全自动化 |
| **full_onet_data.tsv** | 19,265 | O*NET 任务原始数据 + 权重 | `O*NET-SOC Code`, `Task ID`, `Task`, `Task Type`(Core/Supplemental), `coreweight`, `equalweight` | **高** — 区分核心/补充任务，提供权重 |
| **occupations_onet_bls_matched.csv** | 972 | O*NET 职业与 BLS 就业/薪资数据匹配 | `OCC_CODE`, `TOT_EMP`, `A_MEAN`, `A_MEDIAN` | **高** — 包含就业人数和薪资，可用于加权计算 |
| **occupations_onet_basic_skills.csv** | 873 | 每个职业需要的基础技能 | `Occupation`, `Job Zone`(1-5), `Critical_Thinking`, `Programming`, `Mathematics`, `Writing` 等 12 项 | **中** — 可分析哪些技能组合导致高/低 exposure |
| **occupations_onet_work_contexts.csv** | 873 | 职业的工作环境特征 | `degree_of_automation_context`, `importance_of_being_exact`, `structured_vs_unstructured` | **中** — 原有自动化程度 vs AI 新增暴露度 |
| **occupations_projections_processed.csv** | 1,049 | 就业增长预测 | `occupation`, `pct_emp_change_2020_2030` | **低** — 2020-2030 预测，已过时 |
| **national_May2021_dl.csv** | 1,403 | BLS 2021 年 5 月全国就业薪资数据 | `OCC_CODE`, `OCC_TITLE`, `TOT_EMP`, `A_MEAN`, `A_MEDIAN` | **中** — 薪资数据，但是2021年 |
| **autoScores.csv** | 6,633 | 多维度自动化评分面板数据（含时间序列） | `simpleOcc`, `year`, `pct_software/robot/ai`, `freyOsborne`, `felten_raj_seamans`, `tot_emp`, `a_mean` | **中** — 整合了多个经典自动化指标，可做纵向对比 |
| **BEA_BLS_industry_lp.csv** | 63 | 行业劳动生产率时间序列 (1987-2020) | 行业名, 年度劳动生产率指数 | **低** — 宏观经济背景 |
| **BEA_BLS_industry_tfp.csv** | 63 | 行业全要素生产率时间序列 (1987-2020) | 同上，TFP版 | **低** — 宏观经济背景 |
| **bls_occupation_demographics_2022.xlsx** | — | 职业人口统计（性别、种族） | — | **低** — 公平性分析 |
| **cpsaat11.xlsx** | — | CPS 调查数据 | — | **低** — 背景数据 |
| **nem-onet-to-soc-crosswalk.xlsx** | — | O*NET SOC → BLS SOC 交叉映射表 | — | **高** — 数据对齐必备 |
| **occupation_2023_final.xlsx** | — | 论文最终使用的职业级汇总 | — | **高** — 可能包含论文表格的完整数据 |

### 样例：full_labelset.tsv 一条记录

```
O*NET-SOC Code: 13-2011.00
Task ID:        21519
Task:           "Analyze business operations, trends, costs, revenues, financial commitments,
                 and obligations to project future revenues and expenses or to provide advice."
Title:          Accountants and Auditors
Task Type:      Core
human_exposure: E2 (间接暴露 — 需要工具辅助)
gpt4_exposure:  E2
alpha:          0.0  (不算直接暴露)
beta:           0.5  (算间接暴露)
gamma:          1.0  (最宽口径下算暴露)
automation:     0.50 (GPT-4 判断部分可自动化)
```

### 与我们其他数据的关系

| 对接 | 方法 | 覆盖度 |
| --- | --- | --- |
| **Eloundou → O*NET** | 直接使用 O*NET-SOC Code，完全对齐 | 923 职业, 19,265 任务 |
| **Eloundou → BLS** | 通过 `nem-onet-to-soc-crosswalk.xlsx` 或 `occupations_onet_bls_matched.csv` | 972 个匹配 |
| **Eloundou → GDPval** | GDPval 44 职业 → SOC → O*NET-SOC，可提取其 exposure | 44/923 直接匹配 |
| **Eloundou → Anthropic EI** | 均使用 O*NET 任务体系，Task ID 可直接 join | 完全对齐 |
| **Eloundou → Karpathy** | Karpathy 是 BLS OOH (342职业)，需通过 SOC 映射到 O*NET 的 923 职业 | 约 300+ 可匹配 |

### 对我们的核心价值

**full_labelset.tsv + occ_level.csv 直接解决了 E（曝光度）的问题**：

- 这是最早、最权威的 AI 任务级 exposure 标注数据
- 覆盖 O*NET 全部 923 个职业、19,265 个任务
- 同时有人类标注和 GPT-4 标注，可以交叉验证
- `gamma` 值可以直接作为我们公式中的 **E（曝光度）**
- 结合 GDPval 的 **P（胜率）** 和 BLS 的就业数据，可以计算完整的 Kill Line