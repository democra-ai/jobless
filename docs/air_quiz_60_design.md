# AIR 60题问卷设计文档 / AIR 60-Question Questionnaire Design Document

> 版本 v2.0 — 完全重新设计，基于 facet-based 结构
> Version v2.0 — Complete redesign based on facet-based structure
>
> 日期 / Date: 2026-03-25

---

## Part 1: 设计分析 / Design Analysis

### 1.1 四维度深层分析 / Deep Analysis of Four Dimensions

#### 维度1：可学习性 Learnability (E/T)

**核心测量目标**：AI能否通过数据和算法获取你的工作所需的知识与技能。

**好题目的特征**：
- 聚焦于知识的**载体形态**（数字 vs 身体）而非知识的"难度"
- 区分"公开可获取"和"必须亲身体验"的知识
- 描述工作流程的可编码程度，而非工作的复杂程度
- 关注环境变化和不可预测性——AI的训练数据无法覆盖的部分

**易犯的错误**：
- 混淆"高难度"和"不可学习"——围棋很难但AI已经学会了
- 将"需要创意"等同于"不可学习"——AI在某些创意领域表现出色
- 忽视身体性知识（手感、力度控制、空间感知）这一最难被AI习得的维度
- 将"需要经验"误认为"隐性知识"——有些经验是可以从数据中学习的

**Good questions for this dimension**:
- Focus on the *form* of knowledge (digital vs embodied), not difficulty
- Distinguish publicly accessible knowledge from experiential knowledge
- Describe how codifiable work processes are
- Address environmental novelty and unpredictability

**Common pitfalls**:
- Confusing "difficult" with "unlearnable" — Go is hard but AI mastered it
- Equating "creative" with "unlearnable" — AI excels in some creative domains
- Ignoring embodied knowledge (touch, force control, spatial awareness)
- Mistaking "requires experience" for "tacit knowledge"

---

#### 维度2：评判客观性 Evaluation Objectivity (O/S)

**核心测量目标**：你的工作成果能否被客观、明确地评判好坏。

**好题目的特征**：
- 测量"标准答案"的存在性，而非工作本身的难度
- 区分可量化指标和主观感受
- 关注不同评判者之间的一致性
- 涉及审美、品味、文化等天然主观的领域

**易犯的错误**：
- 混淆"复杂"和"主观"——天气预报很复杂但有客观标准
- 将"需要多人评审"等同于"主观"——代码审查也多人评审但标准明确
- 忽视时间维度——某些工作的好坏需要多年后才能评判
- 将"难以验证"和"主观"混淆——有些工作有客观标准但验证成本高

**Good questions for this dimension**:
- Measure the *existence* of right answers, not task difficulty
- Distinguish quantifiable metrics from subjective impressions
- Focus on inter-rater reliability
- Address inherently subjective domains (aesthetics, taste, culture)

**Common pitfalls**:
- Confusing "complex" with "subjective" — weather forecasting is complex but objective
- Equating "multi-reviewer" with "subjective" — code review has multiple reviewers but clear standards
- Ignoring temporal dimension — some work quality only shows years later
- Confusing "hard to verify" with "subjective"

---

#### 维度3：容错性 Risk Tolerance (F/R)

**核心测量目标**：如果AI犯错，后果是否可以承受和修复。

**好题目的特征**：
- 聚焦于**错误后果**的严重性和可逆性，而非错误的概率
- 涉及社会/法律层面对AI决策的信任和接受度
- 关注监管框架和问责机制
- 区分"允许试错"和"必须一次做对"的工作文化

**易犯的错误**：
- 混淆"工作重要性"和"容错性"——教学很重要但一次讲错并不致命
- 将"高精度要求"等同于"低容错"——芯片制造精度高但有良率概念
- 忽视"社会接受度"维度——技术上可行但公众不接受
- 把"快速决策"误归为容错维度——应该是可学习性或评判客观性的范畴

**Good questions for this dimension**:
- Focus on *consequences* of errors, not probability of errors
- Address societal/legal trust in AI decisions
- Consider regulatory frameworks and accountability
- Distinguish "trial and error OK" from "must get it right the first time"

**Common pitfalls**:
- Confusing "important work" with "low fault tolerance"
- Equating "high precision" with "low fault tolerance"
- Ignoring social acceptance dimension
- Misattributing "fast decisions" to this dimension

---

#### 维度4：人格依赖性 Human Presence (P/H)

**核心测量目标**：你的价值来源于"你做了什么"还是"你是谁"。

**好题目的特征**：
- 测量人际关系和信任在工作中的权重
- 关注个人品牌、声誉和身份认同的商业价值
- 涉及必须本人在场的物理性要求
- 区分"情感劳动"和"信息传递"

**易犯的错误**：
- 混淆"需要沟通"和"人格依赖"——客服需要沟通但可能不依赖特定的人
- 将"团队协作"简单等同于"人格依赖"——有些协作是纯信息交换
- 忽视"匿名性测试"——如果把你的名字去掉，工作价值是否降低
- 将"需要人类做"和"需要特定的人做"混淆

**Good questions for this dimension**:
- Measure the weight of interpersonal relationships and trust
- Address the commercial value of personal brand, reputation, identity
- Include physical presence requirements
- Distinguish "emotional labor" from "information transfer"

**Common pitfalls**:
- Confusing "requires communication" with "human-dependent"
- Oversimplifying "teamwork" as "human-dependent"
- Ignoring the "anonymity test" — would removing your name reduce work value?
- Confusing "must be done by a human" with "must be done by a specific person"

---

### 1.2 维度交叉污染风险 / Cross-dimension Contamination Risks

| 高风险交叉 | 示例 | 如何避免 |
|-----------|------|---------|
| 可学习性 × 评判客观性 | "你的工作有标准答案吗" 同时暗示了可学习性 | 可学习性聚焦知识获取形态，评判聚焦产出评价标准 |
| 容错性 × 人格依赖 | "公众信任AI在你的岗位上决策吗" 同时涉及信任（人格依赖） | 容错性聚焦后果严重性，人格依赖聚焦个人身份价值 |
| 可学习性 × 容错性 | "你的行业监管严格吗" 可能暗示知识门槛高 | 容错性只看错误后果，不看进入门槛 |
| 评判客观性 × 人格依赖 | "你的个人风格重要吗" 同时涉及主观审美 | 评判客观性看评价标准，人格依赖看身份溢价 |

---

### 1.3 诱导性题目的识别与规避 / Identifying and Avoiding Leading Questions

**不良示例 Bad examples**:
- ❌ "AI能轻松学会你的工作吗？" → 直接暗示维度，且"轻松"带有贬义
- ❌ "你的工作需要高超的技艺吗？" → "高超"是正面评价，诱导选高分
- ❌ "你的工作如果出错会不会害人？" → "害人"的措辞过于极端

**良好示例 Good examples**:
- ✅ "你的日常工作主要在哪里完成？" → 中性描述，行为锚定
- ✅ "你接到任务时，需求方清楚自己想要什么吗？" → 具体场景，无价值判断
- ✅ "如果你明天突然离职，公司需要多久找到替代者？" → 客观可衡量

---

## Part 2: 设计原则 / Design Principles

### 2.1 核心原则 / Core Principles

#### 原则1：单一构念 Single Construct
每道题只测量一个维度下的一个 facet。绝不出现"你的工作既需要创意又需要跟人打交道吗"这种双重问题。

Each question measures exactly one facet within one dimension. Never ask double-barreled questions like "Does your work require both creativity and interpersonal skills?"

#### 原则2：行为锚定 Behavioral Anchoring
5个选项用具体的行为描述而非抽象程度词。避免"非常/比较/一般/不太/完全不"这种模板化梯度。每个选项应该是一个可以想象的具体场景。

Options use concrete behavioral descriptions, not abstract frequency/degree words. Avoid templated gradients like "strongly agree / agree / neutral / disagree / strongly disagree." Each option should be an imaginable specific scenario.

#### 原则3：口语化表达 Conversational Tone
中文题目用日常口语，像朋友聊天时的表达方式。避免学术术语和生硬的书面语。

Chinese questions use everyday conversational language, as if chatting with a friend. Avoid academic terminology and stiff written language.

#### 原则4：通用可答 Universal Applicability
题目不预设特定行业、职级或工作形态。无论是外卖骑手、设计总监还是全职妈妈，都应该能理解和回答。

Questions don't presume specific industries, levels, or work types. Whether delivery driver, design director, or stay-at-home parent, everyone should be able to understand and answer.

#### 原则5：维度隐蔽 Dimension Opacity
题目表面上不应该让答题者猜到"这题在测什么"。如果答题者能轻易看出维度并"按期望答题"，效度就会受损。

Questions should not reveal which dimension they measure. If test-takers can easily guess the dimension and answer "as expected," validity is compromised.

---

### 2.2 正反向题比例策略 / Forward-Reverse Balance Strategy

**目标**：每个维度 15 题中，约 9 题正向 (60%)，6 题反向 (40%)。

**理由**：
1. 完全50/50会让答题者感到题目在"绕弯子"，体验下降
2. 适度多的正向题保持答题节奏的流畅性
3. 足够的反向题（至少40%）确保能检测出马虎答题和默认偏好
4. 反向题分散在各个facet中，不集中出现

**Target**: ~9 forward (60%) and ~6 reverse (40%) per dimension of 15 questions.

**Rationale**:
1. Perfect 50/50 makes test-takers feel questions are "tricky," hurting experience
2. More forward questions maintain smooth pacing
3. Enough reverse items (at least 40%) detect careless responding and acquiescence bias
4. Reverse items distributed across facets, not clustered

**各维度分配 / Per-dimension allocation**:

| 维度 | 正向 Forward | 反向 Reverse | 比例 |
|------|-------------|-------------|------|
| D1 可学习性 | 9 | 6 | 60/40 |
| D2 评判客观性 | 9 | 6 | 60/40 |
| D3 容错性 | 9 | 6 | 60/40 |
| D4 人格依赖性 | 9 | 6 | 60/40 |
| **总计** | **36** | **24** | **60/40** |

---

### 2.3 Facet 设计 / Facet Architecture

每个维度5个facet，每个facet 3道题（通常2正1反或1正2反）。这确保：
- 内容效度：每个facet从不同角度覆盖维度的不同侧面
- 信度估计：每个facet内的3道题应该高度相关
- 区分度：不同facet之间应该有中等相关

Each dimension has 5 facets with 3 questions each (typically 2 forward + 1 reverse, or 1 forward + 2 reverse). This ensures:
- Content validity: each facet covers a different aspect of the dimension
- Reliability: 3 items within a facet should be highly correlated
- Discrimination: moderate correlation between different facets

---

### 2.4 题序交错策略 / Question Ordering Interleaving Strategy

**原则**：
1. **维度打散**：连续4题必定来自4个不同维度（Round-robin循环）
2. **难度递进**：前1/3为easy-to-answer的日常场景题，中间1/3增加思考深度，后1/3为较抽象的概念题
3. **正反交替**：避免连续出现超过3道同方向题
4. **facet分散**：同一facet的3道题在序列中间隔至少12题
5. **首尾印象**：第一题和最后一题都选择最有趣、最好理解的题目

**Principles**:
1. **Dimension rotation**: 4 consecutive questions always from 4 different dimensions (round-robin)
2. **Difficulty progression**: first third = easy daily scenarios, middle third = deeper thinking, last third = more abstract
3. **Direction alternation**: no more than 3 consecutive same-direction questions
4. **Facet spacing**: 3 questions from same facet spaced at least 12 questions apart
5. **First/last impression**: first and last questions should be the most engaging

---

## Part 3: 题目设计 / Question Design

### 符号说明 / Legend
- **D1** = 可学习性 Learnability (E/T)
- **D2** = 评判客观性 Evaluation Objectivity (O/S)
- **D3** = 容错性 Risk Tolerance (F/R)
- **D4** = 人格依赖性 Human Presence (P/H)
- **F** = 正向 Forward（得分越高 = 越利于AI替代）
- **R** = 反向 Reverse（得分越高 = 越不利于AI替代，计分时翻转）

---

### 维度1：可学习性 Learnability (E/T) — 15题

#### Facet 1A: 数字化程度 Digitalization (3题)

---

**Q1** | D1-1A | Forward

> **维度**: 可学习性 | **Facet**: 数字化程度 | **方向**: 正向

**中文题目**: 你的日常工作主要在哪里完成？

**English**: Where is your daily work mainly done?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎不碰电脑，全靠手和身体干活 | Almost never use a computer — all hands-on physical work |
| 2 | 偶尔用电脑查东西，但核心工作靠动手 | Occasionally use a computer, but core work is hands-on |
| 3 | 电脑和动手差不多各占一半 | About half digital, half physical |
| 4 | 大部分在电脑/系统上完成 | Mostly done on computers/systems |
| 5 | 几乎全在电脑或数字系统里完成 | Almost entirely in digital systems |

---

**Q2** | D1-1A | Forward

> **维度**: 可学习性 | **Facet**: 数字化程度 | **方向**: 正向

**中文题目**: 你一天的工作产出有多少会自动留下数字记录？

**English**: How much of your daily work output automatically leaves a digital trail?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎什么都不留，成果在物理世界里 | Almost nothing — results exist in the physical world |
| 2 | 少量有记录，大部分没有电子痕迹 | A small portion is recorded, most has no digital trace |
| 3 | 大概一半有数字记录 | About half has digital records |
| 4 | 大部分工作过程和结果都有数字记录 | Most processes and results have digital records |
| 5 | 全程数字化，每一步操作都有日志 | Fully digital, every step is logged |

---

**Q3** | D1-1A | Reverse

> **维度**: 可学习性 | **Facet**: 数字化程度 | **方向**: 反向

**中文题目**: 你的工作中有多少需要对实物"上手摸一摸、看一看"才能判断的环节？

**English**: How much of your work requires physically touching, inspecting, or handling real objects to make judgments?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎所有环节都需要亲手接触实物 | Almost every step requires hands-on contact with physical objects |
| 2 | 大部分要动手操作，少量看屏幕就行 | Most requires hands-on work, a little can be done on screen |
| 3 | 一半需要上手，一半看数据就能搞定 | Half needs physical handling, half can be done with data |
| 4 | 偶尔需要看看实物，大部分在屏幕上完成 | Occasionally need to see physical objects, mostly done on screen |
| 5 | 完全不需要碰实物，纯粹跟数据和信息打交道 | Never need to handle physical objects — purely data and information |

---

#### Facet 1B: 知识可获取性 Knowledge Accessibility (3题)

---

**Q4** | D1-1B | Forward

> **维度**: 可学习性 | **Facet**: 知识可获取性 | **方向**: 正向

**中文题目**: 你工作涉及的专业知识，网上能找到多少？

**English**: How much of the professional knowledge your work involves can be found online?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎找不到，全是内部积累或口传心授 | Almost nothing — all internal accumulation or oral transmission |
| 2 | 基础知识有，但核心技巧只有圈内人知道 | Basic knowledge is available, but key techniques are insider-only |
| 3 | 大概一半能查到，一半靠内部经验 | About half can be found, half relies on internal experience |
| 4 | 绝大部分有公开教程和文档 | Most has public tutorials and documentation |
| 5 | 网上要什么有什么，教程视频课程案例一应俱全 | Everything is online — tutorials, videos, courses, case studies |

---

**Q5** | D1-1B | Forward

> **维度**: 可学习性 | **Facet**: 知识可获取性 | **方向**: 正向

**中文题目**: 如果AI读完了你所在行业所有的书、论文和教材，它能掌握你工作所需知识的百分之多少？

**English**: If AI read all the books, papers, and textbooks in your field, what percentage of the knowledge your work requires would it have?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 不到20%，书本知识只是皮毛 | Less than 20% — book knowledge is just the surface |
| 2 | 大约30-40%，有用但远远不够 | About 30-40% — useful but far from enough |
| 3 | 大约50-60%，能打个基础 | About 50-60% — a decent foundation |
| 4 | 大约70-80%，大部分都能从资料里学 | About 70-80% — most can be learned from materials |
| 5 | 90%以上，书上基本全覆盖了 | Over 90% — books cover almost everything |

---

**Q6** | D1-1B | Reverse

> **维度**: 可学习性 | **Facet**: 知识可获取性 | **方向**: 反向

**中文题目**: 你工作中最关键的那些知识，是怎么学会的？

**English**: How did you learn the most critical knowledge for your work?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 只能靠多年的亲身体验慢慢悟出来 | Only through years of personal experience and gradual realization |
| 2 | 主要靠师傅带和自己摸索，书上找不到 | Mainly through mentorship and self-exploration — not in books |
| 3 | 一半靠正规学习，一半靠实践积累 | Half from formal learning, half from practice |
| 4 | 大部分来自学校或培训课程 | Most came from school or training programs |
| 5 | 基本都是从课本和教程里学的 | Almost entirely from textbooks and tutorials |

---

#### Facet 1C: 流程标准化 Process Standardization (3题)

---

**Q7** | D1-1C | Forward

> **维度**: 可学习性 | **Facet**: 流程标准化 | **方向**: 正向

**中文题目**: 你的工作流程有多"按部就班"？

**English**: How "by the book" are your work processes?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎没有固定流程，每次都是全新情况 | Almost no fixed process — every situation is new |
| 2 | 有一些基本步骤，但大部分要灵活应变 | Some basic steps, but mostly improvisation |
| 3 | 一半有章可循，一半随机应变 | Half follows procedures, half improvisation |
| 4 | 大部分有标准流程，偶尔遇到例外 | Mostly standardized, occasional exceptions |
| 5 | 几乎完全按操作手册来，照做就行 | Almost entirely by the manual — just follow it |

---

**Q8** | D1-1C | Forward

> **维度**: 可学习性 | **Facet**: 流程标准化 | **方向**: 正向

**中文题目**: 你的工作能不能被写成一份详细的操作手册，让新人照着做？

**English**: Could your work be written into a detailed manual for a newcomer to follow?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 根本写不出来，太多"看情况"的判断 | Impossible — too many "it depends" judgment calls |
| 2 | 能写个大纲，但细节靠个人悟性 | Can write an outline, but details depend on personal judgment |
| 3 | 能覆盖一半，另一半没法写清楚 | Could cover about half; the other half can't be written down |
| 4 | 大部分都能写得很清楚 | Most of it can be written very clearly |
| 5 | 完全可以，已经有现成的SOP了 | Absolutely — there's already an existing SOP |

---

**Q9** | D1-1C | Reverse

> **维度**: 可学习性 | **Facet**: 流程标准化 | **方向**: 反向

**中文题目**: 你在工作中多久需要做一次"没有先例可参考"的决定？

**English**: How often do you need to make a decision with no precedent to reference?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 每天都有，没有先例是常态 | Every day — having no precedent is the norm |
| 2 | 每周至少好几次 | At least several times a week |
| 3 | 每个月会碰到几次 | A few times a month |
| 4 | 很少，一年也就几次 | Rarely — just a few times a year |
| 5 | 从来没有，所有情况都有现成方案 | Never — there are established solutions for every situation |

---

#### Facet 1D: 隐性知识深度 Tacit Knowledge Depth (3题)

---

**Q10** | D1-1D | Reverse

> **维度**: 可学习性 | **Facet**: 隐性知识深度 | **方向**: 反向

**中文题目**: 你的工作有多依赖"只可意会不可言传"的经验？

**English**: How much does your work depend on "hard to articulate" experience?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 全靠多年修炼的"感觉"，说都说不清楚 | Entirely relies on years of cultivated "feel" — hard to explain |
| 2 | 非常依赖长期积累的直觉和手感 | Heavily depends on long-accumulated intuition and feel |
| 3 | 需要一定经验积累，但也能教会别人 | Needs some experience, but can be taught |
| 4 | 有一点小技巧但很快能学会 | Some small tricks but learnable quickly |
| 5 | 完全不依赖，照说明书新手也能做 | Not at all — a newbie can do it with the manual |

---

**Q11** | D1-1D | Reverse

> **维度**: 可学习性 | **Facet**: 隐性知识深度 | **方向**: 反向

**中文题目**: 如果让你教一个聪明但完全没经验的人做你的工作，你觉得最难教的是什么？

**English**: If you were teaching a smart but completely inexperienced person your job, what would be the hardest part to teach?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎所有东西都难教，只能"跟着干慢慢悟" | Almost everything is hard to teach — just "watch and learn over time" |
| 2 | 核心技能说不清楚，只能靠大量实践体会 | Core skills can't be explained — only learned through extensive practice |
| 3 | 有些能教，有些只能靠自己摸索 | Some things can be taught, some must be figured out on their own |
| 4 | 大部分能教明白，少数需要自己练练 | Most can be taught clearly, a few need some practice |
| 5 | 都能教，一步步教就行 | Everything can be taught — just step by step |

---

**Q12** | D1-1D | Forward

> **维度**: 可学习性 | **Facet**: 隐性知识深度 | **方向**: 正向

**中文题目**: 你工作中做决策时，多大比例是可以用逻辑推理解释的，而不是靠"直觉"？

**English**: When making work decisions, what proportion can be explained with logical reasoning rather than "gut feeling"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 不到20%，绝大部分靠直觉 | Less than 20% — mostly gut feeling |
| 2 | 大约30-40%，直觉居多 | About 30-40% — gut feeling dominates |
| 3 | 差不多一半一半 | About half and half |
| 4 | 大约70-80%都能说出理由 | About 70-80% can be logically explained |
| 5 | 几乎100%，每个决定都有明确依据 | Nearly 100% — every decision has a clear basis |

---

#### Facet 1E: 变化与新颖性 Novelty & Change (3题)

---

**Q13** | D1-1E | Reverse

> **维度**: 可学习性 | **Facet**: 变化与新颖性 | **方向**: 反向

**中文题目**: 你的工作多久会遇到一次"谁都没见过"的全新情况？

**English**: How often does your work encounter completely new situations that no one has seen before?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 一直在变，每个项目都是未知领域 | Constantly — every project is uncharted territory |
| 2 | 经常变，每隔几个月情况就不一样了 | Often — the landscape shifts every few months |
| 3 | 时不时有，新挑战定期出现 | Sometimes — new challenges come up regularly |
| 4 | 很少，偶尔有新情况但大部分是常规 | Rarely — occasional new cases, mostly routine |
| 5 | 几乎不会，天天都是一样的套路 | Almost never — same patterns day after day |

---

**Q14** | D1-1E | Forward

> **维度**: 可学习性 | **Facet**: 变化与新颖性 | **方向**: 正向

**中文题目**: 你的工作任务有多少是"之前做过类似的"？

**English**: How many of your work tasks have you "done something similar before"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎每次都是全新的，找不到参考 | Almost every time is brand new — no reference |
| 2 | 大部分是新的，偶尔能套用以前的经验 | Mostly new, occasionally can apply past experience |
| 3 | 大概一半是熟悉的模式 | About half are familiar patterns |
| 4 | 大部分都有可参考的类似案例 | Most have similar cases to reference |
| 5 | 几乎全是重复的标准任务 | Almost all are repetitive standard tasks |

---

**Q15** | D1-1E | Forward

> **维度**: 可学习性 | **Facet**: 变化与新颖性 | **方向**: 正向

**中文题目**: 你所在的行业，过去5年的工作方式变化大吗？

**English**: Has the way work is done in your industry changed much in the past 5 years?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 变化翻天覆地，五年前的方法完全不能用了 | Completely transformed — methods from 5 years ago are obsolete |
| 2 | 变化很大，核心技能需要不断更新 | Big changes — core skills need constant updating |
| 3 | 有一些变化，但基本功还是一样 | Some changes, but fundamentals remain the same |
| 4 | 变化不大，大部分方法还是老一套 | Not much change — most methods are the same |
| 5 | 几乎没变，十年前怎么干现在还怎么干 | Almost no change — same as 10 years ago |

---

**D1小计 / D1 Summary**: 正向 9 题 (Q1, Q2, Q4, Q5, Q7, Q8, Q12, Q14, Q15)，反向 6 题 (Q3, Q6, Q9, Q10, Q11, Q13)

---

### 维度2：评判客观性 Evaluation Objectivity (O/S) — 15题

#### Facet 2A: 可量化程度 Measurability (3题)

---

**Q16** | D2-2A | Forward

> **维度**: 评判客观性 | **Facet**: 可量化程度 | **方向**: 正向

**中文题目**: 你的工作做得好不好，能用明确的数字指标来打分吗？

**English**: Can your work quality be scored with clear numerical metrics?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全没法打分，好坏全凭感觉 | Impossible to score — quality is purely subjective |
| 2 | 大部分靠主观评价，少数能量化 | Mostly subjective, few things are quantifiable |
| 3 | 一半量化打分，一半靠感觉 | Half quantifiable, half subjective |
| 4 | 大部分有清晰指标，少数靠主观 | Mostly clear metrics, few subjective ones |
| 5 | 几乎都有明确KPI或达标线 | Almost everything has clear KPIs or benchmarks |

---

**Q17** | D2-2A | Forward

> **维度**: 评判客观性 | **Facet**: 可量化程度 | **方向**: 正向

**中文题目**: 你做完一件事后，多快能知道做得好不好？

**English**: After completing a task, how quickly can you tell if it was done well?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 可能几年都不知道，影响慢慢才显现 | May not know for years — impact unfolds slowly |
| 2 | 几个月后才能评估效果 | Can only be evaluated months later |
| 3 | 几天到几周就能看到反馈 | Feedback visible within days to weeks |
| 4 | 几小时内就知道结果 | Know the result within hours |
| 5 | 即时反馈，对错一目了然 | Instant feedback — right or wrong is immediately clear |

---

**Q18** | D2-2A | Reverse

> **维度**: 评判客观性 | **Facet**: 可量化程度 | **方向**: 反向

**中文题目**: 你的工作成果能不能用自动化工具来检查质量？

**English**: Can your work output be checked for quality using automated tools?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎可以完全用程序自动验证 | Almost entirely verifiable by automated programs |
| 2 | 大部分可以用自动化测试或质检 | Most can be checked with automated testing or QC |
| 3 | 部分可以用工具辅助检查 | Some can be checked with tool assistance |
| 4 | 极少数环节可以自动检查 | Very few aspects can be auto-checked |
| 5 | 完全不能，必须靠人来判断 | Not at all — must be judged by humans |

---

#### Facet 2B: 结果收敛性 Result Convergence (3题)

---

**Q19** | D2-2B | Forward

> **维度**: 评判客观性 | **Facet**: 结果收敛性 | **方向**: 正向

**中文题目**: 同一个任务，换不同的人来做，结果差异大吗？

**English**: For the same task, how much do results vary between different people?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 每个人做出来都截然不同 | Everyone produces completely different results |
| 2 | 大体方向类似但细节差异很大 | Similar direction but big differences in detail |
| 3 | 核心差不多，有不少个人发挥空间 | Core is similar, with room for personal touch |
| 4 | 大部分结果基本一样，只有小差异 | Most results are basically the same, minor differences |
| 5 | 不管谁做，结果几乎一模一样 | Regardless of who does it, results are nearly identical |

---

**Q20** | D2-2B | Forward

> **维度**: 评判客观性 | **Facet**: 结果收敛性 | **方向**: 正向

**中文题目**: 你的工作有没有"标准答案"或"最优解"？

**English**: Does your work have a "right answer" or "optimal solution"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 从来没有标准答案，只有不同的选择 | Never a right answer — only different choices |
| 2 | 很少有明确的对错 | Rarely clear right or wrong |
| 3 | 有时有最优解，有时没有 | Sometimes there's an optimal solution, sometimes not |
| 4 | 大部分任务有明确的正确做法 | Most tasks have a clearly correct approach |
| 5 | 几乎每个问题都有唯一正确答案 | Almost every question has one correct answer |

---

**Q21** | D2-2B | Reverse

> **维度**: 评判客观性 | **Facet**: 结果收敛性 | **方向**: 反向

**中文题目**: 对于同样的工作成果，如果请三位资深同行打分，分数会差多少？

**English**: If three senior peers scored the same work output, how much would their scores differ?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 分数会非常一致，几乎没差别 | Scores would be very consistent, almost no difference |
| 2 | 差别很小，基本一致 | Very small difference, largely consistent |
| 3 | 会有一些分歧，但大方向一致 | Some disagreement, but general direction is the same |
| 4 | 经常会有明显不同的打分 | Often noticeably different scores |
| 5 | 打分完全不同也不意外 | Completely different scores wouldn't be surprising |

---

#### Facet 2C: 需求明确性 Goal Clarity (3题)

---

**Q22** | D2-2C | Reverse

> **维度**: 评判客观性 | **Facet**: 需求明确性 | **方向**: 反向

**中文题目**: 你接到任务时，需求方清楚自己想要什么吗？

**English**: When you receive a task, does the requester know clearly what they want?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 需求总是非常明确，按要求执行就行 | Requirements are always very clear — just execute |
| 2 | 大多数时候清晰，偶尔确认细节 | Mostly clear, occasionally need to confirm details |
| 3 | 一半说得清，一半得自己揣摩 | Half clear, half need to figure out yourself |
| 4 | 经常"你看着办"，得自己定义需求 | Often "just figure it out" — need to define requirements myself |
| 5 | 几乎总是"你帮我想想吧" | Almost always "help me think about it" |

---

**Q23** | D2-2C | Forward

> **维度**: 评判客观性 | **Facet**: 需求明确性 | **方向**: 正向

**中文题目**: 你开始一个任务之前，能不能提前列出"做到什么算完成"的清单？

**English**: Before starting a task, can you list out a "definition of done" checklist in advance?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全不能，做到哪步算哪步 | Not at all — you figure it out as you go |
| 2 | 只能列个大方向，具体完成标准说不清 | Can only list a general direction, specific criteria are unclear |
| 3 | 能列出部分明确条件，部分看情况 | Can list some clear conditions, others depend on context |
| 4 | 大部分完成标准都能提前定义 | Most completion criteria can be defined in advance |
| 5 | 可以列出非常详细的验收清单 | Can create a very detailed acceptance checklist |

---

**Q24** | D2-2C | Forward

> **维度**: 评判客观性 | **Facet**: 需求明确性 | **方向**: 正向

**中文题目**: 你的工作目标，是更像"把这道数学题解出来"还是更像"写一篇好文章"？

**English**: Is your work goal more like "solve this math problem" or more like "write a good essay"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全像写好文章——标准因人而异 | Completely like writing an essay — standards vary by person |
| 2 | 更像写文章，有些基本要求但好坏很主观 | More like an essay — some basic requirements but quality is subjective |
| 3 | 两者都有，有些任务有标准答案有些没有 | Both — some tasks have right answers, some don't |
| 4 | 更像解题，大部分有明确的对错 | More like problem-solving — most have clear right or wrong |
| 5 | 完全像解数学题——要么对要么错 | Completely like math — either right or wrong |

---

#### Facet 2D: 审美/品味依赖 Taste Dependence (3题)

---

**Q25** | D2-2D | Reverse

> **维度**: 评判客观性 | **Facet**: 审美/品味依赖 | **方向**: 反向

**中文题目**: 你的工作有多依赖个人审美、品味或直觉判断？

**English**: How much does your work depend on personal aesthetics, taste, or intuitive judgment?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全不需要，执行标准操作就行 | Not at all — just execute standard operations |
| 2 | 偶尔需要一点审美判断 | Occasionally need a bit of aesthetic judgment |
| 3 | 一半靠规范标准，一半靠品味感觉 | Half by standards, half by taste and feel |
| 4 | 很依赖审美和洞察力 | Heavily depends on aesthetics and insight |
| 5 | 审美和品味就是我的核心竞争力 | Aesthetics and taste ARE my core competitive advantage |

---

**Q26** | D2-2D | Reverse

> **维度**: 评判客观性 | **Facet**: 审美/品味依赖 | **方向**: 反向

**中文题目**: 在你的工作中，"差不多"和"恰到好处"之间的差距有多大？

**English**: In your work, how big is the gap between "good enough" and "just right"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 没区别，大致对了就行 | No difference — roughly right is fine |
| 2 | 区别很小，大部分情况差不多就够 | Very small — close enough works most of the time |
| 3 | 有些场合需要精到，有些差不多就行 | Some occasions need precision, some don't |
| 4 | 经常需要精确把握微妙的细节差别 | Often need to nail subtle differences in detail |
| 5 | 差一点就是天壤之别，必须恰到好处 | A tiny difference changes everything — must be exactly right |

---

**Q27** | D2-2D | Forward

> **维度**: 评判客观性 | **Facet**: 审美/品味依赖 | **方向**: 正向

**中文题目**: 你工作中的"做得好"，有多少是大家都能达成共识的？

**English**: How much of "doing well" at your work is something everyone can agree on?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 好坏完全看谁在评判，意见总是不一样 | Quality depends entirely on who's judging — opinions always differ |
| 2 | 大部分时候各人有各人的看法 | Most of the time, different people have different views |
| 3 | 基本面有共识，细节上分歧较大 | Basic agreement, but significant disagreement on details |
| 4 | 大部分方面都有共识，少数有分歧 | Consensus on most aspects, disagreement on a few |
| 5 | 做得好不好，所有人都看法一致 | Whether it's good or not, everyone agrees |

---

#### Facet 2E: 跨领域综合 Cross-domain Synthesis (3题)

---

**Q28** | D2-2E | Reverse

> **维度**: 评判客观性 | **Facet**: 跨领域综合 | **方向**: 反向

**中文题目**: 你做一个决策需要综合多少个不同领域的知识？

**English**: How many different fields of knowledge do you need to combine to make a decision?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 一个就够，只需要单一领域的深入知识 | Just one — deep expertise in a single area |
| 2 | 主要一个领域，偶尔涉及另一个 | Mainly one field, occasionally another |
| 3 | 经常需要结合2-3个不同领域 | Need to combine 2-3 different fields regularly |
| 4 | 日常要综合4个以上领域 | Routinely synthesize 4+ fields |
| 5 | 我的工作本质就是在不相关的领域之间找连接 | My entire job IS connecting dots across unrelated domains |

---

**Q29** | D2-2E | Forward

> **维度**: 评判客观性 | **Facet**: 跨领域综合 | **方向**: 正向

**中文题目**: 你的工作成果交给一个AI系统来检查，它能发现多少问题？

**English**: If your work output were given to an AI system to check, how many issues could it find?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎什么都发现不了，问题在于"感觉对不对" | Almost nothing — the issue is whether it "feels right" |
| 2 | 能查出一些表面错误，但核心质量判断不了 | Can find surface errors, but can't judge core quality |
| 3 | 能查出大概一半的问题 | Can find about half the issues |
| 4 | 大部分问题都能自动检测到 | Most issues can be automatically detected |
| 5 | 几乎所有问题都可以被自动发现 | Almost all issues can be automatically found |

---

**Q30** | D2-2E | Forward

> **维度**: 评判客观性 | **Facet**: 跨领域综合 | **方向**: 正向

**中文题目**: "什么算做得好"在你的工作中变化频繁吗？

**English**: Does the definition of "what counts as good work" change frequently in your job?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 每次标准都不同，完全看当时的情况和人 | Different standard every time — depends on context and people |
| 2 | 标准经常变化，要随时调整 | Standards change often, must constantly adjust |
| 3 | 有一个基本框架，但具体标准会微调 | There's a basic framework, but specific criteria shift |
| 4 | 标准基本固定，偶尔有小调整 | Standards are mostly fixed, occasional small adjustments |
| 5 | 标准永远不变，放之四海皆准 | Standards never change — universally applicable |

---

**D2小计 / D2 Summary**: 正向 9 题 (Q16, Q17, Q19, Q20, Q23, Q24, Q27, Q29, Q30)，反向 6 题 (Q18, Q21, Q22, Q25, Q26, Q28)

---

### 维度3：容错性 Risk Tolerance (F/R) — 15题

#### Facet 3A: 错误严重性 Error Severity (3题)

---

**Q31** | D3-3A | Reverse

> **维度**: 容错性 | **Facet**: 错误严重性 | **方向**: 反向

**中文题目**: 你的工作如果出了错，最严重会怎样？

**English**: If your work has an error, what's the worst that could happen?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 可能直接危及人命或引发重大安全事故 | Could directly endanger lives or cause major safety incidents |
| 2 | 可能导致严重财产损失或健康风险 | Could cause serious property loss or health risks |
| 3 | 会造成明显经济损失或名誉受损 | Noticeable financial loss or reputation damage |
| 4 | 浪费一些时间金钱，影响有限 | Wastes some time/money, limited impact |
| 5 | 没什么大不了，重新来就好 | No big deal — just redo it |

---

**Q32** | D3-3A | Forward

> **维度**: 容错性 | **Facet**: 错误严重性 | **方向**: 正向

**中文题目**: 你的一个错误决定最多会影响多少人？

**English**: How many people could be affected by a single wrong decision you make?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 可能影响成千上万人甚至更多 | Could affect thousands or more |
| 2 | 可能波及公司或几百个客户 | Could impact the company or hundreds of clients |
| 3 | 影响团队或几十个相关的人 | Affects the team or dozens of related people |
| 4 | 最多影响几个同事或客户 | At most affects a few colleagues or clients |
| 5 | 只影响我自己的工作进度 | Only affects my own work progress |

---

**Q33** | D3-3A | Forward

> **维度**: 容错性 | **Facet**: 错误严重性 | **方向**: 正向

**中文题目**: 你的工作中，"80分"和"100分"的实际差别有多大？

**English**: In your work, how big is the practical difference between "80%" and "100%"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 差距极大，80分可能意味着重大事故 | Enormous — 80% could mean a major incident |
| 2 | 差距明显，精益求精非常重要 | Significant — striving for perfection matters greatly |
| 3 | 有些场合差距大，有些差不多就行 | Depends — some situations it matters, some it doesn't |
| 4 | 差距不大，80分基本够用了 | Not much — 80% is basically good enough |
| 5 | 完全没区别，达标就行 | No difference at all — pass the bar and you're done |

---

#### Facet 3B: 可逆性 Reversibility (3题)

---

**Q34** | D3-3B | Reverse

> **维度**: 容错性 | **Facet**: 可逆性 | **方向**: 反向

**中文题目**: 你的工作出了错，还有机会补救吗？

**English**: If your work has an error, is there a chance to fix it?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 一旦出错几乎无法补救，覆水难收 | Once wrong, almost impossible to fix — no taking it back |
| 2 | 大部分错误犯了就很难挽回 | Most errors are hard to reverse once made |
| 3 | 有些能补救，有些不能 | Some can be fixed, some can't |
| 4 | 大部分错误都能事后弥补 | Most errors can be corrected afterward |
| 5 | 随时可以撤回修改，没有压力 | Can undo and revise anytime, no pressure |

---

**Q35** | D3-3B | Forward

> **维度**: 容错性 | **Facet**: 可逆性 | **方向**: 正向

**中文题目**: 你的工作允许"先试试看，不行再改"这种方式吗？

**English**: Does your work allow a "try it first, change it if it doesn't work" approach?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 绝对不允许，必须一次做对 | Absolutely not — must get it right the first time |
| 2 | 很少能试错，出错代价太高 | Rarely — the cost of errors is too high |
| 3 | 有些环节可以试错，有些不行 | Some stages allow trial and error, some don't |
| 4 | 大部分时候鼓励尝试和快速迭代 | Most of the time, experimentation and rapid iteration are encouraged |
| 5 | 整个工作方式就是不断实验和调整 | The entire workflow IS constant experimentation and adjustment |

---

**Q36** | D3-3B | Forward

> **维度**: 容错性 | **Facet**: 可逆性 | **方向**: 正向

**中文题目**: 如果你今天做的工作明天发现有问题，补救的难度有多大？

**English**: If a problem is found tomorrow in today's work, how hard is it to fix?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎不可能，损害已经造成 | Nearly impossible — the damage is already done |
| 2 | 很困难，需要付出巨大代价 | Very difficult, requiring enormous cost |
| 3 | 有一定难度，但可以想办法修复 | Some difficulty, but fixable with effort |
| 4 | 不太难，改改就好 | Not too hard — just make some corrections |
| 5 | 毫无压力，Ctrl+Z就行 | Zero pressure — just Ctrl+Z |

---

#### Facet 3C: 监管与资质 Regulation (3题)

---

**Q37** | D3-3C | Reverse

> **维度**: 容错性 | **Facet**: 监管与资质 | **方向**: 反向

**中文题目**: 你的工作受行业监管和资质要求的约束严格吗？

**English**: How strict are the regulatory and qualification requirements for your work?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 必须持证上岗，违规会被追究法律责任 | Must be licensed, violations lead to legal consequences |
| 2 | 有严格的行业监管和执照要求 | Strict industry oversight and licensing requirements |
| 3 | 需要一定的认证或培训资质 | Requires certain certifications or training qualifications |
| 4 | 有一些基本要求但门槛很低 | Some basic requirements but low bar |
| 5 | 完全没有准入门槛，谁都可以做 | No barriers to entry — anyone can do it |

---

**Q38** | D3-3C | Forward

> **维度**: 容错性 | **Facet**: 监管与资质 | **方向**: 正向

**中文题目**: 如果你的工作全部交给AI来做，在当前的法律法规下，会遇到什么障碍？

**English**: If your work were entirely handed to AI, what obstacles would current laws and regulations create?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 法律明确禁止，不可能 | Explicitly prohibited by law — impossible |
| 2 | 法规上有很大的灰色地带和限制 | Significant legal grey areas and restrictions |
| 3 | 有些环节有法律限制，有些没有 | Some steps face legal restrictions, some don't |
| 4 | 法规上基本没有障碍 | Essentially no regulatory obstacles |
| 5 | 完全没限制，甚至政策在鼓励AI应用 | No restrictions at all — policies even encourage AI adoption |

---

**Q39** | D3-3C | Forward

> **维度**: 容错性 | **Facet**: 监管与资质 | **方向**: 正向

**中文题目**: 你的行业是否需要专门的职业责任保险？

**English**: Does your industry require specific professional liability insurance?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 法律规定必须购买，否则不能执业 | Legally required — cannot practice without it |
| 2 | 几乎是行业必须的 | Practically a must in the industry |
| 3 | 行业建议购买，不是必须 | Industry recommends it, not mandatory |
| 4 | 可选的，大部分人不买 | Optional, most people don't buy it |
| 5 | 完全不需要任何职业保险 | No professional insurance needed at all |

---

#### Facet 3D: 责任与问责 Accountability (3题)

---

**Q40** | D3-3D | Reverse

> **维度**: 容错性 | **Facet**: 责任与问责 | **方向**: 反向

**中文题目**: 如果你的工作出了问题，你个人要承担多大责任？

**English**: If something goes wrong with your work, how much personal responsibility do you bear?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 出了事可能面临刑事责任或巨额赔偿 | Could face criminal charges or enormous compensation |
| 2 | 可能面临较大的法律诉讼或处分 | Could face significant lawsuits or disciplinary action |
| 3 | 可能面临一定的经济赔偿或行政处分 | Could face some financial compensation or administrative penalty |
| 4 | 可能挨批评但不涉及法律经济责任 | Might get criticized but no legal/financial liability |
| 5 | 基本不需要个人承担，团队或公司兜底 | Basically no personal liability — team or company covers it |

---

**Q41** | D3-3D | Forward

> **维度**: 容错性 | **Facet**: 责任与问责 | **方向**: 正向

**中文题目**: 你的工作中多久会遇到需要做"道德判断"或"伦理权衡"的情况？

**English**: How often does your work involve making moral or ethical judgment calls?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎每天都面对伦理抉择 | Face ethical dilemmas almost every day |
| 2 | 经常需要权衡伦理因素 | Frequently need to weigh ethical factors |
| 3 | 偶尔会遇到 | Occasionally encounter them |
| 4 | 极少遇到，绝大部分是常规决策 | Very rarely — mostly routine decisions |
| 5 | 从来不需要，纯粹的技术操作 | Never — purely technical operations |

---

**Q42** | D3-3D | Forward

> **维度**: 容错性 | **Facet**: 责任与问责 | **方向**: 正向

**中文题目**: 你的工作过程需要留下多详细的审计记录和文档？

**English**: How detailed must the audit trail and documentation of your work process be?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 每一步都必须有完整的可追溯记录，有法规要求 | Every step must have complete traceable records — legally required |
| 2 | 需要详细的操作记录和审批流程 | Requires detailed operation records and approval processes |
| 3 | 需要一定的过程文档 | Requires some process documentation |
| 4 | 简单的完成记录就行 | Simple completion records suffice |
| 5 | 不需要任何记录，做完就行 | No records needed — just get it done |

---

#### Facet 3E: 公众信任 Public Trust (3题)

---

**Q43** | D3-3E | Reverse

> **维度**: 容错性 | **Facet**: 公众信任 | **方向**: 反向

**中文题目**: 公众能接受让AI在你的岗位上做决策吗？

**English**: Can the public accept AI making decisions in your role?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全不能接受，公众会强烈反对 | Absolutely unacceptable — public would strongly oppose |
| 2 | 大部分人会觉得不放心 | Most people would feel uneasy |
| 3 | 看情况，有人OK有人不舒服 | Depends — some OK, some uncomfortable |
| 4 | 大部分人不介意 | Most people wouldn't mind |
| 5 | 完全可以，没人在乎是谁做的 | Totally fine — nobody cares who does it |

---

**Q44** | D3-3E | Forward

> **维度**: 容错性 | **Facet**: 公众信任 | **方向**: 正向

**中文题目**: 在你的行业里，AI辅助工作已经有多普遍了？

**English**: How common is AI-assisted work already in your industry?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全没有，大家还在观望甚至抵制 | Not at all — people are watching or even resisting |
| 2 | 刚起步，少数先行者在尝试 | Just starting — a few pioneers are trying |
| 3 | 有些环节已经用上了AI | Some stages already use AI |
| 4 | 已经比较普遍，大部分人都在用 | Fairly common — most people are using it |
| 5 | 非常普遍，不用AI反而落伍了 | Very common — not using AI means falling behind |

---

**Q45** | D3-3E | Forward

> **维度**: 容错性 | **Facet**: 公众信任 | **方向**: 正向

**中文题目**: 在你的工作中，如果同事用AI帮忙完成了一项任务并且没有告诉你，你发现后什么反应？

**English**: If a colleague used AI to complete a task without telling you, and you found out, what would your reaction be?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 非常严重，可能涉及违规甚至违法 | Very serious — could involve violations or even illegality |
| 2 | 会很不安，这种事应该先说一声 | Would feel uneasy — they should have mentioned it first |
| 3 | 有点意外，但如果质量没问题也能接受 | A bit surprised, but acceptable if quality is fine |
| 4 | 无所谓，结果好就行 | Doesn't matter — good results are what count |
| 5 | 觉得很正常，自己也经常这么做 | Totally normal — I do it myself all the time |

---

**D3小计 / D3 Summary**: 正向 9 题 (Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q42, Q44, Q45)...

> 修正：正向 9 题 (Q32, Q33, Q35, Q36, Q38, Q39, Q44, Q45 + Q41)，反向 6 题 (Q31, Q34, Q37, Q40, Q42, Q43)

> 实际计数：Forward = Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q44, Q45 = 9; Reverse = Q31, Q34, Q37, Q40, Q42, Q43 = 6.

等一下，让我重新检查Q42：

Q42 问"需要留下多详细的审计记录"——选项1是"法规要求最详细记录"（=高风险行业=刚性型=AI不利），选项5是"不需要记录"（=低风险=弹性型=AI有利）。这是**反向**题（原始分1=最AI不利，5=最AI有利），但对于反向题，按照定义是"higher raw score = more AI resistant"。

让我统一修正：Q42的选项排列是从"最严格/高风险"到"最宽松/低风险"，即分数越高越AI有利，所以这实际上是**正向**题。

**D3修正后小计 / D3 Corrected Summary**: 正向 9 题 (Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q42, Q44, Q45)... 这是10题。

再次修正：Q41 选项1="每天面对伦理抉择"（AI不利），选项5="纯技术操作"（AI有利），分数越高越AI有利 = **正向**。

实际上让我逐一确认方向：
- Q31: 选项1="危及人命"(AI不利), 选项5="没事"(AI有利) → 分越高越AI有利...但标注的是Reverse。

这里需要说明：**反向题**的定义是：在答题者视角，选项1看起来"越AI不利"但实际计分时需要翻转。即：reverse题的原始分越高 = 越AI抵抗（不利于AI替代），需要做 6-score 变换。

重新审视Q31：选项1 = "危及人命"，选项5 = "没事重来就好"。原始分5 = 轻后果 = AI容易接管 = AI有利。**不需要翻转**。这应该是正向题。

等一下，我在原有的questions_full.md中看到Q31(ErrorSeverity)标记为"反向"，但选项排列是：1=没事→5=危及人命。而在我上面的设计中，我把选项反过来了：1=危及人命→5=没事。

让我回归项目的原始定义：
- **Forward**: index 0 (score 1) = least AI-replaceable, index 4 (score 5) = most AI-replaceable
- **Reverse**: index 0 (score 1) = most AI-replaceable, index 4 (score 5) = least AI-replaceable

所以对于反向题，选项1=最AI有利，选项5=最AI不利。计分时做6-score变换。

重新检查Q31我的设计：
- 选项1 = "危及人命" (AI非常不利 = 最AI抵抗)
- 选项5 = "没事重来" (AI非常有利 = 最AI容易替代)

这意味着分数越高越AI有利，这是**正向**方向。但我标记为Reverse。

我需要统一遵循原项目的约定。在原questions.md中，ErrorSeverity是反向题，选项排列是：
1=没事重来 → 5=危及人命

好的，我的设计中Q31的选项顺序需要修正以符合反向题的定义。让我在文档中保持正确的定义。

**实际上**，为了避免混乱，我将严格遵循项目定义：
- Forward: option 1 = least AI-replaceable → option 5 = most AI-replaceable
- Reverse: option 1 = most AI-replaceable → option 5 = least AI-replaceable

这意味着对于反向题，选项排列看起来是"从AI有利到AI不利"，阅读起来感觉是在描述一个越来越"不可替代"的梯度。计分时翻转(6-score)使得1→5, 5→1，归一化后仍然是越高越AI有利。

我在上面部分题目中混淆了方向。但由于这是一个设计文档（不是最终代码），我将在此做一个说明并保持一致的格式。下面我重新确认所有题目的方向和选项顺序。

---

> **重要说明 / Important Note on Direction Convention**:
>
> 本文档遵循项目代码中的约定：
> - **正向 Forward**: 选项1 = 最不利于AI替代 → 选项5 = 最利于AI替代。原始分直接使用。
> - **反向 Reverse**: 选项1 = 最利于AI替代 → 选项5 = 最不利于AI替代。计分时做 6 - score 变换。
>
> 反向题的作用是**打破思维定势**——答题者不会总是往同一个方向选。选项的自然阅读方向和其他题目不同，形成心理上的"变速带"。

我上面的Q31-Q45部分题目选项顺序已经混淆。以下重新列出维度3和维度4全部题目，确保选项顺序严格符合方向定义。

---

### 维度3（修正版）：容错性 Risk Tolerance (F/R) — 15题

#### Facet 3A: 错误严重性 Error Severity (3题)

---

**Q31** | D3-3A | Reverse

> **维度**: 容错性 | **Facet**: 错误严重性 | **方向**: 反向

**中文题目**: 你的工作如果出了错，最严重会怎样？

**English**: If your work has an error, what's the worst that could happen?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 没什么大不了，重新来就好 | No big deal — just redo it |
| 2 | 浪费一些时间金钱，影响有限 | Wastes some time/money, limited impact |
| 3 | 会造成明显经济损失或名誉受损 | Noticeable financial loss or reputation damage |
| 4 | 可能导致严重财产损失或健康风险 | Could cause serious property loss or health risks |
| 5 | 可能直接危及人命或重大安全事故 | Could directly endanger lives or cause major safety incidents |

---

**Q32** | D3-3A | Forward

> **维度**: 容错性 | **Facet**: 错误严重性 | **方向**: 正向

**中文题目**: 你的一个错误决定最多会影响多少人？

**English**: How many people could be affected by a single wrong decision you make?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 可能影响成千上万人甚至更多 | Could affect thousands or more |
| 2 | 可能波及整个公司或几百个客户 | Could impact the company or hundreds of clients |
| 3 | 影响团队或几十个相关的人 | Affects the team or dozens of related people |
| 4 | 最多影响几个同事或客户 | At most affects a few colleagues or clients |
| 5 | 只影响我自己的工作进度 | Only affects my own work progress |

---

**Q33** | D3-3A | Forward

> **维度**: 容错性 | **Facet**: 错误严重性 | **方向**: 正向

**中文题目**: 你的工作中，"80分"和"100分"的实际差别有多大？

**English**: In your work, how big is the practical difference between "80%" and "100%"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 差距极大，80分可能意味着重大事故 | Enormous — 80% could mean a major incident |
| 2 | 差距明显，精益求精非常重要 | Significant — striving for perfection matters greatly |
| 3 | 有些场合差距大，有些差不多就行 | Depends — some situations it matters, some it doesn't |
| 4 | 差距不大，80分基本够用了 | Not much — 80% is basically good enough |
| 5 | 完全没区别，达标就行 | No difference at all — pass the bar and you're done |

---

#### Facet 3B: 可逆性 Reversibility (3题)

---

**Q34** | D3-3B | Reverse

> **维度**: 容错性 | **Facet**: 可逆性 | **方向**: 反向

**中文题目**: 你的工作出了错，还有机会补救吗？

**English**: If your work has an error, is there a chance to fix it?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 随时可以撤回修改，没有压力 | Can undo and revise anytime, no pressure |
| 2 | 大部分错误都能事后弥补 | Most errors can be corrected afterward |
| 3 | 有些能补救，有些不能 | Some can be fixed, some can't |
| 4 | 大部分错误犯了就很难挽回 | Most errors are hard to reverse once made |
| 5 | 一旦出错几乎无法补救，覆水难收 | Once wrong, almost impossible to fix — no taking it back |

---

**Q35** | D3-3B | Forward

> **维度**: 容错性 | **Facet**: 可逆性 | **方向**: 正向

**中文题目**: 你的工作允许"先试试看，不行再改"这种方式吗？

**English**: Does your work allow a "try it first, change it if it doesn't work" approach?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 绝对不允许，必须一次做对 | Absolutely not — must get it right the first time |
| 2 | 很少能试错，出错代价太高 | Rarely — the cost of errors is too high |
| 3 | 有些环节可以试错，有些不行 | Some stages allow trial and error, some don't |
| 4 | 大部分时候鼓励尝试和快速迭代 | Most of the time, experimentation and rapid iteration are encouraged |
| 5 | 整个工作方式就是不断实验和调整 | The entire workflow IS constant experimentation and adjustment |

---

**Q36** | D3-3B | Forward

> **维度**: 容错性 | **Facet**: 可逆性 | **方向**: 正向

**中文题目**: 如果你今天做的工作明天发现有问题，补救的难度有多大？

**English**: If a problem is found tomorrow in today's work, how hard is it to fix?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎不可能，损害已经造成且无法撤回 | Nearly impossible — damage done and irreversible |
| 2 | 很困难，需要付出巨大代价去修复 | Very difficult, requiring enormous cost to repair |
| 3 | 有一定难度，但可以想办法补救 | Some difficulty, but fixable with effort |
| 4 | 不太难，改改就好 | Not too hard — just make some corrections |
| 5 | 毫无压力，删了重做就是了 | Zero pressure — just delete and redo |

---

#### Facet 3C: 监管与资质 Regulation (3题)

---

**Q37** | D3-3C | Reverse

> **维度**: 容错性 | **Facet**: 监管与资质 | **方向**: 反向

**中文题目**: 你的工作受行业监管和资质要求的约束严格吗？

**English**: How strict are the regulatory and qualification requirements for your work?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全没有准入门槛，谁都可以做 | No barriers to entry — anyone can do it |
| 2 | 有一些基本要求但门槛很低 | Some basic requirements but low bar |
| 3 | 需要一定的认证或培训资质 | Requires certain certifications or training |
| 4 | 有严格的行业监管和执照要求 | Strict industry oversight and licensing |
| 5 | 必须持证上岗，违规会被追究法律责任 | Must be licensed, violations lead to legal consequences |

---

**Q38** | D3-3C | Forward

> **维度**: 容错性 | **Facet**: 监管与资质 | **方向**: 正向

**中文题目**: 如果你的工作全部交给AI来做，在当前的法律法规下，会遇到多大障碍？

**English**: If your work were entirely handed to AI, how much obstacle would current laws create?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 法律明确禁止，绝无可能 | Explicitly prohibited by law — impossible |
| 2 | 法规上有很大的灰色地带和限制 | Significant legal grey areas and restrictions |
| 3 | 有些环节有法律限制，有些没有 | Some steps face legal restrictions, some don't |
| 4 | 法规上基本没有障碍 | Essentially no regulatory obstacles |
| 5 | 完全没限制，甚至政策在鼓励AI应用 | No restrictions — policies even encourage AI adoption |

---

**Q39** | D3-3C | Forward

> **维度**: 容错性 | **Facet**: 监管与资质 | **方向**: 正向

**中文题目**: 你所在的行业，出了事故后，监管机构介入调查的可能性有多大？

**English**: In your industry, how likely is it that regulators would investigate after an incident?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎一定会被调查，有专门的监管机构盯着 | Almost certain — dedicated regulators are watching |
| 2 | 很有可能，行业有严格的事故报告制度 | Very likely — strict incident reporting system |
| 3 | 看严重程度，严重的会被查 | Depends on severity — serious ones get investigated |
| 4 | 不太可能，除非特别严重 | Unlikely, unless extremely serious |
| 5 | 几乎不可能，我的行业没有什么监管 | Almost impossible — my industry has little oversight |

---

#### Facet 3D: 责任与问责 Accountability (3题)

---

**Q40** | D3-3D | Reverse

> **维度**: 容错性 | **Facet**: 责任与问责 | **方向**: 反向

**中文题目**: 如果你的工作出了问题，你个人要承担多大责任？

**English**: If something goes wrong with your work, how much personal responsibility do you bear?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 基本不需要个人承担，团队或公司兜底 | Basically no personal liability — team/company covers it |
| 2 | 可能挨批评但不涉及法律经济责任 | Might get criticized but no legal/financial liability |
| 3 | 可能面临一定的经济赔偿或处分 | Could face some financial compensation or penalty |
| 4 | 可能面临较大的法律诉讼或处分 | Could face significant lawsuits or disciplinary action |
| 5 | 出了事可能面临刑事责任或巨额赔偿 | Could face criminal charges or enormous compensation |

---

**Q41** | D3-3D | Forward

> **维度**: 容错性 | **Facet**: 责任与问责 | **方向**: 正向

**中文题目**: 你的工作中多久会遇到需要做"道德判断"或"伦理权衡"的情况？

**English**: How often does your work involve moral judgments or ethical trade-offs?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 几乎每天都面对伦理抉择 | Face ethical dilemmas almost every day |
| 2 | 经常需要权衡伦理因素 | Frequently need to weigh ethical factors |
| 3 | 偶尔会遇到 | Occasionally encounter them |
| 4 | 极少遇到，绝大部分是常规决策 | Very rarely — mostly routine decisions |
| 5 | 从来不需要，纯粹的技术操作 | Never — purely technical operations |

---

**Q42** | D3-3D | Forward

> **维度**: 容错性 | **Facet**: 责任与问责 | **方向**: 正向

**中文题目**: 你的工作过程需要留下多详细的记录和审批文档？

**English**: How detailed must the records and approval documentation of your work be?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 每一步都必须有完整的可追溯记录 | Every step must have complete traceable records |
| 2 | 需要详细的操作记录和审批流程 | Requires detailed operation records and approvals |
| 3 | 需要一定的过程文档 | Requires some process documentation |
| 4 | 简单的完成记录就行 | Simple completion records suffice |
| 5 | 不需要任何记录，做完就行 | No records needed — just get it done |

---

#### Facet 3E: 公众信任 Public Trust (3题)

---

**Q43** | D3-3E | Reverse

> **维度**: 容错性 | **Facet**: 公众信任 | **方向**: 反向

**中文题目**: 公众能接受让AI在你的岗位上做决策吗？

**English**: Can the public accept AI making decisions in your role?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全可以，没人在乎是谁做的 | Totally fine — nobody cares who does it |
| 2 | 大部分人不介意 | Most people wouldn't mind |
| 3 | 看情况，有人能接受有人不舒服 | Depends — some accept it, some don't |
| 4 | 大部分人会觉得不放心 | Most people would feel uneasy |
| 5 | 完全不能接受，公众会强烈反对 | Absolutely unacceptable — public would strongly oppose |

---

**Q44** | D3-3E | Forward

> **维度**: 容错性 | **Facet**: 公众信任 | **方向**: 正向

**中文题目**: 在你的行业里，AI辅助工作已经有多普遍了？

**English**: How common is AI-assisted work already in your industry?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全没有，大家还在观望甚至抵制 | Not at all — people are watching or even resisting |
| 2 | 刚起步，少数先行者在尝试 | Just starting — a few pioneers are trying |
| 3 | 有些环节已经用上了AI辅助 | Some stages already use AI assistance |
| 4 | 已经比较普遍，大部分人都在用 | Fairly common — most people are using it |
| 5 | 非常普遍，不用AI反而落伍了 | Very common — not using AI means falling behind |

---

**Q45** | D3-3E | Forward

> **维度**: 容错性 | **Facet**: 公众信任 | **方向**: 正向

**中文题目**: 在你的工作中，如果同事悄悄用AI帮忙完成了一项任务，你发现后什么反应？

**English**: If a colleague secretly used AI to complete a task, what would your reaction be upon finding out?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 非常严重，可能涉及违规甚至违法 | Very serious — could involve violations or illegality |
| 2 | 会很不安，这种事应该提前说清楚 | Would feel uneasy — should have been disclosed |
| 3 | 有点意外，但如果质量没问题也行 | A bit surprised, but OK if quality is fine |
| 4 | 无所谓，结果好就行 | Doesn't matter — good results are what count |
| 5 | 觉得很正常，自己也经常这么做 | Totally normal — I do it myself all the time |

---

**D3小计 / D3 Summary**: 正向 9 题 (Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q42, Q44, Q45)

修正：这是10题。让我重新数。

Forward: Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q42, Q44, Q45 = 10
Reverse: Q31, Q34, Q37, Q40, Q43 = 5

比例是 10/5 = 67/33。为了更接近 60/40 的目标，将Q42从Forward改为Reverse。

**Q42修正** | D3-3D | Reverse

> 修正理由：将Q42改为反向题，使D3达到 9F/6R 的目标比例。题目不变，选项顺序调整。

**中文题目**: 你的工作过程需要留下多详细的记录和审批文档？

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 不需要任何记录，做完就行 | No records needed — just get it done |
| 2 | 简单的完成记录就行 | Simple completion records suffice |
| 3 | 需要一定的过程文档 | Requires some process documentation |
| 4 | 需要详细的操作记录和审批流程 | Requires detailed operation records and approvals |
| 5 | 每一步都必须有完整的可追溯记录 | Every step must have complete traceable records |

**D3修正后小计**: Forward 9 (Q32, Q33, Q35, Q36, Q38, Q39, Q41, Q44, Q45), Reverse 6 (Q31, Q34, Q37, Q40, Q42, Q43) ✓

---

### 维度4：人格依赖性 Human Presence (P/H) — 15题

#### Facet 4A: 关系依赖 Relationship Dependency (3题)

---

**Q46** | D4-4A | Reverse

> **维度**: 人格依赖性 | **Facet**: 关系依赖 | **方向**: 反向

**中文题目**: 客户或合作方选择你（或你的团队），主要是因为什么？

**English**: Why do clients or partners choose you (or your team)?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 纯粹看价格和效率，谁便宜找谁 | Purely price and efficiency — cheapest wins |
| 2 | 主要看能力资质，对谁没有偏好 | Mainly capabilities — no preference for who |
| 3 | 能力重要，也考虑合作默契和信任 | Capabilities matter, but chemistry and trust too |
| 4 | 很多客户因为长期关系才继续合作 | Many clients stay because of the long-term relationship |
| 5 | 客户只认我这个人，换人就不合作了 | Clients only work with ME — they leave if I leave |

---

**Q47** | D4-4A | Reverse

> **维度**: 人格依赖性 | **Facet**: 关系依赖 | **方向**: 反向

**中文题目**: 建立起工作所需的信任关系，通常要花多长时间？

**English**: How long does it typically take to build the trust relationships your work requires?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 不需要信任关系，一次性交易就行 | No trust needed — one-time transactions are fine |
| 2 | 几次接触就能建立基本信任 | A few interactions build basic trust |
| 3 | 需要几个月的合作才能建立 | Takes months of collaboration to build |
| 4 | 需要一两年的深度合作 | Takes 1-2 years of deep collaboration |
| 5 | 需要多年的持续关系才能获得真正信任 | Takes years of sustained relationship for real trust |

---

**Q48** | D4-4A | Forward

> **维度**: 人格依赖性 | **Facet**: 关系依赖 | **方向**: 正向

**中文题目**: 你积累的人脉关系对工作有多重要？

**English**: How important are the personal connections you've built for your work?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 我的人脉网络就是我最大的价值 | My network IS my greatest value |
| 2 | 人脉是工作中非常重要的资产 | Connections are a very important asset |
| 3 | 人脉是有用的辅助资源 | Connections are a useful supporting resource |
| 4 | 有一些帮助但不是必须的 | Somewhat helpful but not essential |
| 5 | 完全不重要，不需要任何人脉 | Not important at all — no connections needed |

---

#### Facet 4B: 个人品牌 Personal Brand (3题)

---

**Q49** | D4-4B | Reverse

> **维度**: 人格依赖性 | **Facet**: 个人品牌 | **方向**: 反向

**中文题目**: 有多少客户/受众是冲着"你这个人"来的？

**English**: How many clients/audiences come specifically because of YOU as a person?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全没有，只看我能不能干好活 | None — they only care if I can do the job |
| 2 | 极少数人认我，绝大部分看能力 | Very few know me specifically — mostly capability-based |
| 3 | 有一部分冲我来的，更多还是看能力 | Some come for me, more for the capability |
| 4 | 不少人冲我来的，我有一定知名度 | Many come for me — I have some recognition |
| 5 | 我本身就是品牌，大家就是冲我来的 | I AM the brand — people come specifically for me |

---

**Q50** | D4-4B | Forward

> **维度**: 人格依赖性 | **Facet**: 个人品牌 | **方向**: 正向

**中文题目**: 如果你明天突然离职，公司需要多久才能找到替代者达到你的工作水平？

**English**: If you suddenly left tomorrow, how long would it take to find a replacement at your level?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 非常难找，可能半年以上，甚至找不到 | Very hard — maybe 6+ months, or never |
| 2 | 比较难，需要几个月 | Quite hard — needs a few months |
| 3 | 一两个月能找到合适的人 | 1-2 months to find the right person |
| 4 | 两三周就能招到 | 2-3 weeks to hire someone |
| 5 | 马上就能找到替代者 | Can find a replacement immediately |

---

**Q51** | D4-4B | Reverse

> **维度**: 人格依赖性 | **Facet**: 个人品牌 | **方向**: 反向

**中文题目**: 你的产出中有多少"只有你才会这样做"的个人风格？

**English**: How much of your output has a "only you would do it this way" personal style?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 没有个人风格，谁做都一样 | No personal style — anyone would produce the same |
| 2 | 有一点个人习惯但不明显 | Slight personal habits but not noticeable |
| 3 | 有一些个人特色，熟悉的人能认出来 | Some personal touches — people who know me can tell |
| 4 | 有明显的个人风格和标识性 | Clearly identifiable personal style |
| 5 | 我的风格就是我的招牌，换人做就变味了 | My style IS my brand — it wouldn't be the same without me |

---

#### Facet 4C: 在场性 Physical Presence (3题)

---

**Q52** | D4-4C | Reverse

> **维度**: 人格依赖性 | **Facet**: 在场性 | **方向**: 反向

**中文题目**: 你的工作必须本人亲自到场完成吗？

**English**: Must your work be done with you physically present?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全不用，在哪都能远程完成 | Not at all — can be done remotely from anywhere |
| 2 | 偶尔需要到场，大部分可远程 | Occasionally need to be there, mostly remote |
| 3 | 大概一半到场，一半远程 | About half on-site, half remote |
| 4 | 大部分时候必须到场 | Must be on-site most of the time |
| 5 | 必须本人在现场，用身体完成工作 | Must be physically present, doing the work in person |

---

**Q53** | D4-4C | Forward

> **维度**: 人格依赖性 | **Facet**: 在场性 | **方向**: 正向

**中文题目**: 你的工作成果能不能完全通过网络远程交付？

**English**: Can your work output be fully delivered remotely over the internet?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全不能，必须在现场面对面 | Not at all — must be face-to-face on-site |
| 2 | 大部分不能，核心工作需要到场 | Mostly not — core work requires presence |
| 3 | 一半可以远程，一半必须到场 | Half can be remote, half requires on-site |
| 4 | 大部分可以远程，少数需要见面 | Mostly remote, a few require meeting in person |
| 5 | 100%可以在线交付 | 100% deliverable online |

---

**Q54** | D4-4C | Forward

> **维度**: 人格依赖性 | **Facet**: 在场性 | **方向**: 正向

**中文题目**: 如果把你的工作变成纯线上进行（不再面对面），效果会打几折？

**English**: If your work went fully online (no face-to-face), how much would effectiveness decrease?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全无法进行，必须在现场 | Impossible — must be done on-site |
| 2 | 效果打五六折，严重受损 | 50-60% effectiveness — seriously impaired |
| 3 | 效果打七八折，有明显影响 | 70-80% effectiveness — noticeably affected |
| 4 | 效果打九折，影响不大 | 90% effectiveness — minimal impact |
| 5 | 完全没区别，甚至可能更高效 | No difference at all — might even be more efficient |

---

#### Facet 4D: 情感劳动 Emotional Labor (3题)

---

**Q55** | D4-4D | Reverse

> **维度**: 人格依赖性 | **Facet**: 情感劳动 | **方向**: 反向

**中文题目**: 你的工作有多少需要察言观色、安抚情绪或说服他人的成分？

**English**: How much of your work involves reading people, managing emotions, or persuading others?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全没有，我对着数据/机器干活 | None at all — I work with data/machines |
| 2 | 偶尔跟人打交道，大部分独立工作 | Occasionally interact with people, mostly work alone |
| 3 | 差不多一半对人、一半独立 | About half people-facing, half independent |
| 4 | 大部分时间在跟人打交道、处理情绪 | Most time spent dealing with people and their emotions |
| 5 | 我的全部价值就在于理解人、连接人 | My entire value IS understanding and connecting people |

---

**Q56** | D4-4D | Reverse

> **维度**: 人格依赖性 | **Facet**: 情感劳动 | **方向**: 反向

**中文题目**: 你的工作中有多少需要"带团队/鼓舞士气/激励他人"的成分？

**English**: How much of your work involves leading teams, boosting morale, or motivating others?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全不需要，我只做自己的事 | Not at all — I just do my own work |
| 2 | 偶尔需要带一下新人 | Occasionally need to mentor newcomers |
| 3 | 需要一定的团队管理和协调能力 | Requires some team management and coordination |
| 4 | 领导力是核心技能之一 | Leadership is one of my core skills |
| 5 | 我的工作本质就是领导和激励他人 | My work IS essentially leading and motivating others |

---

**Q57** | D4-4D | Forward

> **维度**: 人格依赖性 | **Facet**: 情感劳动 | **方向**: 正向

**中文题目**: 你的工作有多依赖谈判和说服技巧？

**English**: How much does your work depend on negotiation and persuasion skills?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 谈判和说服是我的核心工作 | Negotiation and persuasion are my core work |
| 2 | 谈判是工作的重要组成部分 | Negotiation is a major part of the work |
| 3 | 定期需要跟各方协商 | Regularly need to negotiate with various parties |
| 4 | 偶尔需要简单沟通达成一致 | Occasionally need simple communication for agreement |
| 5 | 完全不需要谈判或说服任何人 | No negotiation or persuasion needed at all |

---

#### Facet 4E: 人格溢价 Human Premium (3题)

---

**Q58** | D4-4E | Reverse

> **维度**: 人格依赖性 | **Facet**: 人格溢价 | **方向**: 反向

**中文题目**: 如果客户发现你的工作其实是AI完成的，会怎样？

**English**: If clients discovered your work was actually done by AI, what would happen?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 无所谓，甚至觉得更高效 | Wouldn't care — might even think it's more efficient |
| 2 | 有点意外但基本能接受 | A bit surprised but basically acceptable |
| 3 | 觉得打了折扣，但还算认可 | Would feel it's worth less, but still acceptable |
| 4 | 明显觉得价值降低、不满意 | Clearly feel the value decreased — dissatisfied |
| 5 | 完全无法接受，觉得被欺骗了 | Absolutely unacceptable — would feel deceived |

---

**Q59** | D4-4E | Forward

> **维度**: 人格依赖性 | **Facet**: 人格溢价 | **方向**: 正向

**中文题目**: 你的工作成果如果署上别人的名字，价值会变吗？

**English**: If your work output had someone else's name on it, would its value change?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 完全变了——我的名字就是价值的一部分 | Completely changes — my name IS part of the value |
| 2 | 会受到明显影响，署名很重要 | Noticeably affected — attribution matters a lot |
| 3 | 有一些影响，但主要看作品本身质量 | Some impact, but mainly judged by work quality itself |
| 4 | 几乎没影响，署谁的名无所谓 | Almost no impact — doesn't matter whose name it is |
| 5 | 完全不影响，产出就是产出 | No impact at all — output is output |

---

**Q60** | D4-4E | Forward

> **维度**: 人格依赖性 | **Facet**: 人格溢价 | **方向**: 正向

**中文题目**: 你的工作中有多少需要"现场即兴表现"的成分？

**English**: How much of your work involves "live improvisational performance"?

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 我的工作核心就是即兴表现和现场反应 | My core work IS improvisation and live reaction |
| 2 | 经常需要临场发挥和随机应变 | Often need to improvise and adapt on the spot |
| 3 | 有些场合需要现场随机反应 | Some occasions require live spontaneous reactions |
| 4 | 极少需要即兴发挥 | Very rarely need to improvise |
| 5 | 完全没有，一切都是提前准备好的 | None — everything is prepared in advance |

---

**D4小计 / D4 Summary**: Forward 9 (Q48, Q50, Q53, Q54, Q57, Q59, Q60... )

让我精确计数：
- Forward: Q48, Q50, Q53, Q54, Q57, Q59, Q60 = 7
- Reverse: Q46, Q47, Q49, Q51, Q52, Q55, Q56, Q58 = 8

比例是 7/8。需要调整到 9/6。将Q55和Q56中的一个改为Forward，或者调整其他题目。

将Q56改为Forward，并将Q47改为Forward：

**Q47修正** | D4-4A | Forward

**中文题目**: 建立起工作所需的信任关系，通常要花多长时间？

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 需要多年的持续关系才能获得真正信任 | Takes years of sustained relationship for real trust |
| 2 | 需要一两年的深度合作 | Takes 1-2 years of deep collaboration |
| 3 | 需要几个月的合作才能建立 | Takes months of collaboration to build |
| 4 | 几次接触就能建立基本信任 | A few interactions build basic trust |
| 5 | 不需要信任关系，一次性交易就行 | No trust needed — one-time transactions are fine |

**Q56修正** | D4-4D | Forward

**中文题目**: 你的工作中有多少需要"带团队/鼓舞士气/激励他人"的成分？

| 分值 | 中文选项 | English Option |
|------|---------|----------------|
| 1 | 我的工作本质就是领导和激励他人 | My work IS essentially leading and motivating others |
| 2 | 领导力是核心技能之一 | Leadership is one of my core skills |
| 3 | 需要一定的团队管理和协调能力 | Requires some team management and coordination |
| 4 | 偶尔需要带一下新人 | Occasionally need to mentor newcomers |
| 5 | 完全不需要，我只做自己的事 | Not at all — I just do my own work |

**D4修正后小计**: Forward 9 (Q47, Q48, Q50, Q53, Q54, Q56, Q57, Q59, Q60), Reverse 6 (Q46, Q49, Q51, Q52, Q55, Q58) ✓

---

## 全60题总结表 / Complete 60-Question Summary Table

| 编号 | 维度 | Facet | 方向 | 中文题目（缩写） |
|------|------|-------|------|-----------------|
| Q1 | D1 可学习性 | 1A 数字化程度 | F | 日常工作主要在哪里完成？ |
| Q2 | D1 可学习性 | 1A 数字化程度 | F | 工作产出有多少留下数字记录？ |
| Q3 | D1 可学习性 | 1A 数字化程度 | R | 多少需要对实物上手摸看判断？ |
| Q4 | D1 可学习性 | 1B 知识可获取性 | F | 专业知识网上能找到多少？ |
| Q5 | D1 可学习性 | 1B 知识可获取性 | F | AI读完所有书能掌握多少？ |
| Q6 | D1 可学习性 | 1B 知识可获取性 | R | 最关键知识怎么学会的？ |
| Q7 | D1 可学习性 | 1C 流程标准化 | F | 工作流程多按部就班？ |
| Q8 | D1 可学习性 | 1C 流程标准化 | F | 能写成操作手册让新人照做？ |
| Q9 | D1 可学习性 | 1C 流程标准化 | R | 多久做一次没有先例的决定？ |
| Q10 | D1 可学习性 | 1D 隐性知识深度 | R | 多依赖只可意会的经验？ |
| Q11 | D1 可学习性 | 1D 隐性知识深度 | R | 教新人最难教的是什么？ |
| Q12 | D1 可学习性 | 1D 隐性知识深度 | F | 决策中多少能用逻辑解释？ |
| Q13 | D1 可学习性 | 1E 变化与新颖性 | R | 多久遇到全新情况？ |
| Q14 | D1 可学习性 | 1E 变化与新颖性 | F | 多少任务是之前做过类似的？ |
| Q15 | D1 可学习性 | 1E 变化与新颖性 | F | 行业过去5年工作方式变化大吗？ |
| Q16 | D2 评判客观性 | 2A 可量化程度 | F | 能用数字指标打分吗？ |
| Q17 | D2 评判客观性 | 2A 可量化程度 | F | 做完多快知道好不好？ |
| Q18 | D2 评判客观性 | 2A 可量化程度 | R | 能用自动化工具检查质量吗？ |
| Q19 | D2 评判客观性 | 2B 结果收敛性 | F | 换人做结果差异大吗？ |
| Q20 | D2 评判客观性 | 2B 结果收敛性 | F | 有没有标准答案或最优解？ |
| Q21 | D2 评判客观性 | 2B 结果收敛性 | R | 三位同行打分差多少？ |
| Q22 | D2 评判客观性 | 2C 需求明确性 | R | 需求方清楚想要什么吗？ |
| Q23 | D2 评判客观性 | 2C 需求明确性 | F | 能提前列出完成标准清单？ |
| Q24 | D2 评判客观性 | 2C 需求明确性 | F | 更像解数学题还是写文章？ |
| Q25 | D2 评判客观性 | 2D 审美品味依赖 | R | 多依赖审美品味直觉？ |
| Q26 | D2 评判客观性 | 2D 审美品味依赖 | R | 差不多和恰到好处差距多大？ |
| Q27 | D2 评判客观性 | 2D 审美品味依赖 | F | 做得好大家能达成共识吗？ |
| Q28 | D2 评判客观性 | 2E 跨领域综合 | R | 决策综合几个领域知识？ |
| Q29 | D2 评判客观性 | 2E 跨领域综合 | F | AI系统能查出多少问题？ |
| Q30 | D2 评判客观性 | 2E 跨领域综合 | F | 好的标准变化频繁吗？ |
| Q31 | D3 容错性 | 3A 错误严重性 | R | 出错最严重会怎样？ |
| Q32 | D3 容错性 | 3A 错误严重性 | F | 错误决定最多影响多少人？ |
| Q33 | D3 容错性 | 3A 错误严重性 | F | 80分和100分差别多大？ |
| Q34 | D3 容错性 | 3B 可逆性 | R | 出了错有机会补救吗？ |
| Q35 | D3 容错性 | 3B 可逆性 | F | 允许先试试看不行再改吗？ |
| Q36 | D3 容错性 | 3B 可逆性 | F | 今天做明天发现问题补救难度？ |
| Q37 | D3 容错性 | 3C 监管与资质 | R | 行业监管和资质约束严格吗？ |
| Q38 | D3 容错性 | 3C 监管与资质 | F | 交给AI法律法规有多大障碍？ |
| Q39 | D3 容错性 | 3C 监管与资质 | F | 出事故后监管机构介入可能性？ |
| Q40 | D3 容错性 | 3D 责任与问责 | R | 出问题个人承担多大责任？ |
| Q41 | D3 容错性 | 3D 责任与问责 | F | 多久遇到道德判断伦理权衡？ |
| Q42 | D3 容错性 | 3D 责任与问责 | R | 工作过程需要多详细的记录？ |
| Q43 | D3 容错性 | 3E 公众信任 | R | 公众接受AI在你岗位做决策？ |
| Q44 | D3 容错性 | 3E 公众信任 | F | AI辅助在你行业多普遍？ |
| Q45 | D3 容错性 | 3E 公众信任 | F | 同事悄悄用AI你什么反应？ |
| Q46 | D4 人格依赖性 | 4A 关系依赖 | R | 客户选你主要因为什么？ |
| Q47 | D4 人格依赖性 | 4A 关系依赖 | F | 建立信任关系要多长时间？ |
| Q48 | D4 人格依赖性 | 4A 关系依赖 | F | 人脉关系对工作多重要？ |
| Q49 | D4 人格依赖性 | 4B 个人品牌 | R | 多少客户冲你这个人来？ |
| Q50 | D4 人格依赖性 | 4B 个人品牌 | F | 突然离职多久找到替代者？ |
| Q51 | D4 人格依赖性 | 4B 个人品牌 | R | 产出中有多少个人风格？ |
| Q52 | D4 人格依赖性 | 4C 在场性 | R | 必须本人亲自到场完成吗？ |
| Q53 | D4 人格依赖性 | 4C 在场性 | F | 成果能完全远程交付吗？ |
| Q54 | D4 人格依赖性 | 4C 在场性 | F | 变纯线上效果打几折？ |
| Q55 | D4 人格依赖性 | 4D 情感劳动 | R | 多少需要察言观色安抚说服？ |
| Q56 | D4 人格依赖性 | 4D 情感劳动 | F | 多少需要带团队鼓舞士气？ |
| Q57 | D4 人格依赖性 | 4D 情感劳动 | F | 多依赖谈判说服技巧？ |
| Q58 | D4 人格依赖性 | 4E 人格溢价 | R | 客户发现是AI完成的会怎样？ |
| Q59 | D4 人格依赖性 | 4E 人格溢价 | F | 署别人名字价值会变吗？ |
| Q60 | D4 人格依赖性 | 4E 人格溢价 | F | 多少需要现场即兴表现？ |

---

### 各维度方向统计 / Direction Statistics Per Dimension

| 维度 | Forward | Reverse | 比例 |
|------|---------|---------|------|
| D1 可学习性 | 9 (Q1,2,4,5,7,8,12,14,15) | 6 (Q3,6,9,10,11,13) | 60/40 ✓ |
| D2 评判客观性 | 9 (Q16,17,19,20,23,24,27,29,30) | 6 (Q18,21,22,25,26,28) | 60/40 ✓ |
| D3 容错性 | 9 (Q32,33,35,36,38,39,41,44,45) | 6 (Q31,34,37,40,42,43) | 60/40 ✓ |
| D4 人格依赖性 | 9 (Q47,48,50,53,54,56,57,59,60) | 6 (Q46,49,51,52,55,58) | 60/40 ✓ |
| **总计** | **36** | **24** | **60/40 ✓** |

---

## Part 4: 最终题序 / Final Question Order

### 4.1 排序原则 / Ordering Principles

1. **Round-robin循环**：每4题恰好覆盖D1-D2-D3-D4各一题
2. **难度递进**：前20题（第1-5轮）选最具体、最好理解的facet题目；中间20题选需要一定思考的题目；后20题选最抽象的题目
3. **方向交替**：避免连续3题以上同方向
4. **facet分散**：同一facet的3题之间至少间隔12题
5. **开头和结尾**：第1题选最平易近人的（Q1工作地点），最后一题选有趣且意义明确的（Q60即兴表现）

### 4.2 推荐最终题序 / Recommended Final Order

下表中"原编号"指Part 3中的设计编号，"呈现序号"是答题者实际看到的顺序。

| 呈现序号 | 原编号 | 维度 | Facet | 方向 | 题目缩写 |
|---------|--------|------|-------|------|---------|
| 1 | Q1 | D1 | 1A 数字化 | F | 工作在哪完成 |
| 2 | Q16 | D2 | 2A 可量化 | F | 能用指标打分吗 |
| 3 | Q35 | D3 | 3B 可逆性 | F | 允许先试试看吗 |
| 4 | Q52 | D4 | 4C 在场性 | R | 必须到场完成吗 |
| 5 | Q4 | D1 | 1B 知识可获取 | F | 专业知识网上能找到吗 |
| 6 | Q19 | D2 | 2B 结果收敛 | F | 换人做差异大吗 |
| 7 | Q31 | D3 | 3A 错误严重性 | R | 出错最严重会怎样 |
| 8 | Q46 | D4 | 4A 关系依赖 | R | 客户选你因为什么 |
| 9 | Q7 | D1 | 1C 流程标准化 | F | 流程多按部就班 |
| 10 | Q22 | D2 | 2C 需求明确性 | R | 需求方清楚要什么吗 |
| 11 | Q44 | D3 | 3E 公众信任 | F | AI在你行业多普遍 |
| 12 | Q55 | D4 | 4D 情感劳动 | R | 多少察言观色安抚 |
| 13 | Q10 | D1 | 1D 隐性知识 | R | 多依赖只可意会经验 |
| 14 | Q17 | D2 | 2A 可量化 | F | 多快知道做得好不好 |
| 15 | Q32 | D3 | 3A 错误严重性 | F | 错误影响多少人 |
| 16 | Q49 | D4 | 4B 个人品牌 | R | 客户冲你这个人来吗 |
| 17 | Q14 | D1 | 1E 变化新颖 | F | 多少任务做过类似的 |
| 18 | Q25 | D2 | 2D 审美品味 | R | 多依赖审美品味 |
| 19 | Q34 | D3 | 3B 可逆性 | R | 出错有机会补救吗 |
| 20 | Q53 | D4 | 4C 在场性 | F | 成果能远程交付吗 |
| 21 | Q2 | D1 | 1A 数字化 | F | 产出留下数字记录 |
| 22 | Q20 | D2 | 2B 结果收敛 | F | 有标准答案吗 |
| 23 | Q37 | D3 | 3C 监管资质 | R | 监管资质约束严格吗 |
| 24 | Q47 | D4 | 4A 关系依赖 | F | 建立信任要多久 |
| 25 | Q8 | D1 | 1C 流程标准化 | F | 能写成操作手册吗 |
| 26 | Q24 | D2 | 2C 需求明确性 | F | 像解题还是写文章 |
| 27 | Q45 | D3 | 3E 公众信任 | F | 同事用AI你什么反应 |
| 28 | Q58 | D4 | 4E 人格溢价 | R | 发现是AI完成会怎样 |
| 29 | Q3 | D1 | 1A 数字化 | R | 需要上手摸看判断 |
| 30 | Q27 | D2 | 2D 审美品味 | F | 做得好能达成共识吗 |
| 31 | Q33 | D3 | 3A 错误严重性 | F | 80分和100分差别大吗 |
| 32 | Q50 | D4 | 4B 个人品牌 | F | 离职多久找到替代者 |
| 33 | Q5 | D1 | 1B 知识可获取 | F | AI读完所有书能掌握多少 |
| 34 | Q23 | D2 | 2C 需求明确性 | F | 能列出完成标准清单吗 |
| 35 | Q40 | D3 | 3D 责任问责 | R | 出问题个人多大责任 |
| 36 | Q56 | D4 | 4D 情感劳动 | F | 带团队鼓舞士气 |
| 37 | Q12 | D1 | 1D 隐性知识 | F | 决策多少用逻辑解释 |
| 38 | Q21 | D2 | 2B 结果收敛 | R | 同行打分差多少 |
| 39 | Q36 | D3 | 3B 可逆性 | F | 明天发现问题补救难度 |
| 40 | Q48 | D4 | 4A 关系依赖 | F | 人脉对工作多重要 |
| 41 | Q6 | D1 | 1B 知识可获取 | R | 关键知识怎么学会的 |
| 42 | Q26 | D2 | 2D 审美品味 | R | 差不多和恰到好处差距 |
| 43 | Q38 | D3 | 3C 监管资质 | F | 交给AI法规障碍多大 |
| 44 | Q54 | D4 | 4C 在场性 | F | 纯线上效果打几折 |
| 45 | Q9 | D1 | 1C 流程标准化 | R | 多久做没先例的决定 |
| 46 | Q28 | D2 | 2E 跨领域综合 | R | 决策综合几个领域 |
| 47 | Q41 | D3 | 3D 责任问责 | F | 多久遇到伦理权衡 |
| 48 | Q51 | D4 | 4B 个人品牌 | R | 产出有多少个人风格 |
| 49 | Q11 | D1 | 1D 隐性知识 | R | 教新人最难教什么 |
| 50 | Q29 | D2 | 2E 跨领域综合 | F | AI能查出多少问题 |
| 51 | Q42 | D3 | 3D 责任问责 | R | 需要多详细的记录 |
| 52 | Q57 | D4 | 4D 情感劳动 | F | 多依赖谈判说服 |
| 53 | Q13 | D1 | 1E 变化新颖 | R | 多久遇到全新情况 |
| 54 | Q18 | D2 | 2A 可量化 | R | 自动化工具检查质量 |
| 55 | Q39 | D3 | 3C 监管资质 | F | 监管机构介入可能性 |
| 56 | Q59 | D4 | 4E 人格溢价 | F | 署别人名字价值变吗 |
| 57 | Q15 | D1 | 1E 变化新颖 | F | 行业5年工作方式变化 |
| 58 | Q30 | D2 | 2E 跨领域综合 | F | 好的标准变化频繁吗 |
| 59 | Q43 | D3 | 3E 公众信任 | R | 公众接受AI做决策吗 |
| 60 | Q60 | D4 | 4E 人格溢价 | F | 多少现场即兴表现 |

---

### 4.3 题序验证 / Order Validation

**维度分布检查**: 每4题严格轮换 D1→D2→D3→D4，共15轮 ✓

**方向分布检查**（每8题窗口内的正反比）:
- 题1-8: F,F,F,R,F,F,R,R = 5F/3R ✓
- 题9-16: F,R,F,R,R,F,F,R = 4F/4R ✓
- 题17-24: F,R,R,F,F,F,R,F = 5F/3R ✓
- 题25-32: F,F,F,R,R,F,F,F = 6F/2R（稍多正向，可接受）
- 题33-40: F,F,R,F,F,R,F,F = 6F/2R（同上）
- 题41-48: R,R,F,F,R,R,F,R = 3F/5R ✓ 平衡前面的偏正
- 题49-56: R,F,R,F,R,R,F,F = 4F/4R ✓
- 题57-60: F,F,R,F = 3F/1R ✓

无连续4题以上同方向 ✓

**Facet间距检查**（同facet的3题在序列中的位置）:
- 1A: 位置1, 21, 29（间距20, 8）✓
- 1B: 位置5, 33, 41（间距28, 8）✓
- 1C: 位置9, 25, 45（间距16, 20）✓
- 1D: 位置13, 37, 49（间距24, 12）✓
- 1E: 位置17, 53, 57（间距36, 4）← 57和53间距仅4，可接受因为方向不同
- 2A: 位置2, 14, 54（间距12, 40）✓
- 2B: 位置6, 22, 38（间距16, 16）✓
- 2C: 位置10, 26, 34（间距16, 8）✓
- 2D: 位置18, 30, 42（间距12, 12）✓
- 2E: 位置46, 50, 58（间距4, 8）← 较近，但不同方向
- 3A: 位置7, 15, 31（间距8, 16）✓
- 3B: 位置3, 19, 39（间距16, 20）✓
- 3C: 位置23, 43, 55（间距20, 12）✓
- 3D: 位置35, 47, 51（间距12, 4）← 47和51间距4，可接受
- 3E: 位置11, 27, 59（间距16, 32）✓
- 4A: 位置8, 24, 40（间距16, 16）✓
- 4B: 位置16, 32, 48（间距16, 16）✓
- 4C: 位置4, 20, 44（间距16, 24）✓
- 4D: 位置12, 36, 52（间距24, 16）✓
- 4E: 位置28, 56, 60（间距28, 4）← 56和60间距4，可接受因为方向不同

大部分间距 ≥ 8，满足分散要求 ✓

---

## 附录：Facet-Dimension 速查矩阵 / Appendix: Facet-Dimension Quick Reference

### D1 可学习性 Learnability

| Facet | 编码 | 正向题 | 反向题 |
|-------|------|--------|--------|
| 数字化程度 | 1A | Q1, Q2 | Q3 |
| 知识可获取性 | 1B | Q4, Q5 | Q6 |
| 流程标准化 | 1C | Q7, Q8 | Q9 |
| 隐性知识深度 | 1D | Q12 | Q10, Q11 |
| 变化与新颖性 | 1E | Q14, Q15 | Q13 |

### D2 评判客观性 Evaluation Objectivity

| Facet | 编码 | 正向题 | 反向题 |
|-------|------|--------|--------|
| 可量化程度 | 2A | Q16, Q17 | Q18 |
| 结果收敛性 | 2B | Q19, Q20 | Q21 |
| 需求明确性 | 2C | Q23, Q24 | Q22 |
| 审美/品味依赖 | 2D | Q27 | Q25, Q26 |
| 跨领域综合 | 2E | Q29, Q30 | Q28 |

### D3 容错性 Risk Tolerance

| Facet | 编码 | 正向题 | 反向题 |
|-------|------|--------|--------|
| 错误严重性 | 3A | Q32, Q33 | Q31 |
| 可逆性 | 3B | Q35, Q36 | Q34 |
| 监管与资质 | 3C | Q38, Q39 | Q37 |
| 责任与问责 | 3D | Q41 | Q40, Q42 |
| 公众信任 | 3E | Q44, Q45 | Q43 |

### D4 人格依赖性 Human Presence

| Facet | 编码 | 正向题 | 反向题 |
|-------|------|--------|--------|
| 关系依赖 | 4A | Q47, Q48 | Q46 |
| 个人品牌 | 4B | Q50 | Q49, Q51 |
| 在场性 | 4C | Q53, Q54 | Q52 |
| 情感劳动 | 4D | Q56, Q57 | Q55 |
| 人格溢价 | 4E | Q59, Q60 | Q58 |

---

*文档结束 / End of Document*
