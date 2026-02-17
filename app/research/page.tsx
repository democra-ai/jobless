'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Languages, BookOpen, TrendingUp, AlertTriangle, Users, BarChart3, Globe, Lightbulb, ChevronDown, ChevronRight, FileText, History, CheckCircle2, Database } from 'lucide-react';

type Language = 'en' | 'zh';

const translations = {
  en: {
    // 页面头部
    pageTitle: 'Research Report',
    pageSubtitle: 'Technological Singularity and the Future of Labor: Historical Evolution, Current Status, and Outlook of AI Replacing Human Work',
    backToHome: 'Back to Home',
    lastUpdated: 'Last Updated: February 2026',

    // 导航
    contents: 'Contents',
    abstract: 'Abstract',
    part1: 'Part 1: Historical Context',
    part2: 'Part 2: Current Status Analysis (2020-2025)',
    part3: 'Part 3: Research Institution Overview',
    part4: 'Part 4: Future Trends & Outlook',
    conclusion: 'Conclusion',
    appendix: 'Appendix: Data Comparison',

    // 摘要
    abstractTitle: 'Research Abstract',
    abstractText: `This report comprehensively and systematically explores the profound impact of artificial intelligence (AI) and automation technologies on the global labor market. Based on the latest authoritative research from 2023-2025, it covers historical evolution from the Industrial Revolution to the present, focusing on the current "cognitive automation" wave brought by generative AI.

By integrating empirical data from Goldman Sachs, McKinsey Global Institute (MGI), World Economic Forum (WEF), International Labour Organization (ILO), Organisation for Economic Co-operation and Development (OECD), and top academic institutions like Stanford and MIT, the report reveals a complex transformation landscape: while large-scale technological unemployment has not yet fully appeared in macro data, the microstructure of the labor market is undergoing intense restructuring.

In particular, the "employment freeze" phenomenon for entry-level white-collar positions and "skill restructuring" at the task level indicate that the labor market is at a critical turning point.`,

    // 第一部分
    part1Title: 'Part 1: Historical Context',
    part1Subtitle: 'From Physical Replacement to Cognitive Enhancement',
    part1Intro: 'To understand the uniqueness of the current AI wave, we must first examine it within the long-cycle history of technology-labor interaction. Economic history shows that automation is not simple "replacement," but a dynamic process involving displacement, productivity effects, and reinstatement effects.',

    // 工业革命
    revolution1Title: '1.1 First & Second Industrial Revolutions: Mechanization of Physical Labor (1760-1950)',
    revolution1Text: `Core Logic: "Power Replaces Muscle"

Early Displacement Effects: The late 18th-century Industrial Revolution introduced steam engines and textile machinery. The Luddites movement in the UK saw craftsmen strongly resist machines devaluing traditional skills. Automation primarily replaced skilled manual labor.

Productivity and Demand Expansion: Although specific jobs (like handloom weavers) disappeared, mechanization dramatically reduced unit costs, leading to explosive demand growth and creating more factory jobs operating machines. This era featured technology "complementarity" - machines needed大量 low-skilled labor to operate.

Fundamental Employment Structure Shift: The Second Industrial Revolution (electricity and assembly lines) further accelerated the transfer from agriculture to manufacturing. For example, two-thirds of the US labor force worked in agriculture in the 19th century. With agricultural mechanization, this labor was released and absorbed by emerging manufacturing. While painful, this process did not lead to long-term systemic unemployment but was accompanied by widespread wage growth.`,

    // 计算机革命
    revolution2Title: '1.2 Third Industrial Revolution: Computerization and Automation of Routine Tasks (1970s-2010s)',
    revolution2Text: `In the latter half of the 20th century, with mainframe and personal computer proliferation, the automation frontier shifted from "physical" to "routine cognitive."

Routine-Biased Technological Change (RBTC): Economists like David Autor proposed that computers excel at executing rule-based tasks like bookkeeping, file management, and repetitive assembly line work. This led to labor market "polarization": middle-skill, middle-income jobs (clerks, production line workers) were largely replaced, while low-skill service jobs (hard-to-automate non-routine physical labor) and high-skill abstract analysis jobs (computer-aided decision-making) grew at both ends.

Polanyi's Paradox Limitation: In this stage, automation was limited by Michael Polanyi's paradox - "we know more than we can tell." Many tasks (like recognizing a face, driving a car, complex legal argumentation) depend on tacit knowledge that cannot be written into explicit computer code, so they were considered "safe" at the time.

Skill-Biased Technological Change (SBTC): The mainstream economic view was that technological progress increased demand for highly educated workers (like engineers, analysts), leading to significant college wage premiums and exacerbating wage inequality.`,

    // AI革命
    revolution3Title: '1.3 Fourth Industrial Revolution: Machine Learning & Generative AI (2015-Present)',
    revolution3Text: `The current revolution marks the end of Polanyi's Paradox. Through deep learning and neural networks, machines no longer need humans to write rules - they "learn" rules from massive data.

Cognitive Automation Breakthrough: From ImageNet's 2012 image recognition breakthrough to ChatGPT's 2022 release, AI began conquering non-routine cognitive tasks. This means high-education, high-income "knowledge work" faces direct automation exposure for the first time.

Historical Inversion: Unlike the Industrial Revolution replacing blue-collar workers and the Computer Revolution replacing middle-class white-collar workers, generative AI has the highest exposure to high-paying positions. Research shows AI exposure positively correlates with wage levels, challenging traditional "skill protection theory."

**Evolution Table:**
| Era | Core Technology | Replacement Target | Labor Market Impact |
|------|----------------|-------------------|---------------------|
| Industrial Revolution (1.0 & 2.0) | Steam, electricity, assembly lines | Physical labor, crafts | Agriculture to industry transfer, creating blue-collar jobs |
| Computerization (3.0) | PCs, internet, software | Routine cognitive tasks (calculation, filing) | Job polarization (middle-class hollowing), college wage premiums rise |
| Artificial Intelligence (4.0) | Machine learning, generative AI | Non-routine cognitive tasks (writing, coding, design) | High-skill position exposure, skill barriers lower, creativity reorganized |`,

    // 第二部分
    part2Title: 'Part 2: Current Status Deep Analysis (2020-2025)',
    part2Subtitle: 'From Theory to Practice',
    part2Intro: 'Entering the mid-2020s, AI\'s impact on the job market has shifted from theoretical prediction to actual data. While macro unemployment rates haven\'t soared, micro-level "task substitution" and "hiring freezes" have emerged in specific industries.',

    // 总体就业变化
    overallTitle: '2.1 Overall Employment & Productivity Changes',
    overallText: `According to OECD and ILO 2024-2025 reports, the global labor market shows a complex state of coexisting resilience and fragility.

**Total Stability, Structural Turmoil:** OECD country unemployment rates are at historic lows (4.9% in May 2024), indicating AI hasn't yet triggered large-scale layoffs. However, this masks intense internal turmoil. The WEF "Future of Jobs 2025" report notes that approximately 23% of jobs will undergo structural change over the next five years, including job disappearance and creation.

**Productivity J-Curve:** Despite rapid AI technology diffusion, macro productivity data growth hasn't immediately exploded in 2023-2024. This aligns with the "J-Curve" effect - enterprises need time to redesign workflows, train employees, and deploy infrastructure to truly unleash AI productivity dividends. However, Goldman Sachs research indicates early AI-adopting companies have begun showing significant efficiency improvements.`,

    // 行业分析
    industryTitle: '2.2 Industry-Specific Analysis: Substitution vs. Augmentation Evidence',
    industryIntro: 'AI\'s impact shows significant variation across different industries. Below is a detailed breakdown based on latest industry data:',

    // 编程
    industryITTitle: '2.2.1 Programming & Information Technology (IT)',
    industryITText: `This is the area most directly impacted by generative AI, and a typical sample where "substitution" and "augmentation" coexist.

**Productivity Leap:** GitHub Copilot and similar tools increased programmer coding speed by approximately 56%. This is not just efficiency improvement but changed the nature of work - from writing code to reviewing code.

**Junior Position Crisis:** Stanford University's 2025 study ("Canaries in the Coal Mine") using ADP payroll data found that in AI-exposed occupations (like software development), hiring demand for junior employees (22-25 years old) declined approximately 16% relative to senior positions after late 2022. This shows companies are using AI to replace entry-level coding, causing "junior position hollowing."

**Lowered Skill Barriers:** AI lowers programming entry barriers, enabling non-professionals to generate code through natural language. This compresses entry-level programmer market value to some extent but increases senior architect value.`,

    // 媒体
    industryMediaTitle: '2.2.2 Media, Journalism & Content Creation',
    industryMediaText: `**High Task Replacement Rate:** Content generation driven by Midjourney, Sora and other tools is reshaping creative industries. Pew Research Center data shows 59% of Americans believe AI will reduce journalist job opportunities in the next 20 years.

**Freelance Market Turbulence:** Research on freelance platforms (like Upwork, Fiverr) shows demand and pricing for writing, translation, and illustration tasks declined noticeably after ChatGPT's release. This represents typical "complete substitution" - low-end, standardized creative work is directly taken over by AI.

**Augmentation Mode:** High-end news investigation and in-depth reporting are using AI to assist with data cleaning and lead discovery. This represents "augmentation mode," but these positions are far fewer than automated content generation positions.`,

    // 金融
    industryFinanceTitle: '2.2.3 Financial Services',
    industryFinanceText: `**Data-Intensive Industry Exposure:** Goldman Sachs notes financial industry is one of the most AI-exposed, with approximately 50% of tasks automatable. AI has deeply penetrated algorithmic trading, fraud detection, risk assessment, and customer service.

**From Teller to Advisor:** While back-office processing and basic analysis positions are decreasing, demand for financial advisors who can explain complex AI model outputs and maintain client relationships remains stable. This reflects "human-machine collaboration" necessity - AI processes data, humans handle trust.`,

    // 客服
    industryCSTitle: '2.2.4 Customer Service & Administrative Support',
    industryCSText: `**Direct Substitution Effect:** This is the most obvious substitution area observed. Chatbots and voice AI can already handle complex customer queries. Research shows AI tools enable low-skilled customer service employees to improve performance by 35%, reaching high-skilled employee levels, but this also means enterprises can maintain equal service levels with lower cost and fewer personnel.

**ILO Warning:** International Labour Organization indicates clerical jobs face highest complete automation risk, and these positions are predominantly held by women in low- and middle-income countries, potentially exacerbating gender inequality.`,

    // 医疗教育
    industryHealthTitle: '2.2.5 Healthcare & Education',
    industryHealthText: `**High-Contact Industry Resilience:** Although AI performs excellently in diagnostic imaging analysis (augmentation mode), healthcare nursing and education remain "human interaction-intensive" industries difficult to completely replace.

**Administrative Burden Reduction:** In healthcare, AI is mainly used to reduce physician paperwork time (approximately 20%), freeing more time for patient care.

**Education Transformation:** In education, AI is shifting from simple homework grading to personalized tutoring. However, for core teacher roles - emotional support and moral guidance - AI still cannot substitute. UNESCO emphasizes education should use AI to enhance teacher capabilities, not replace teachers.`,

    // 替代模式边界
    modeBoundaryTitle: '2.3 "Complete Substitution" vs. "Human-Machine Collaboration" Boundary',
    modeBoundaryText: `Based on 2024-2025 data, we can clearly delineate the boundaries of two modes:

**Complete Substitution Mode:**
- Characteristics: Standardized tasks, no emotional interaction needed, objectively verifiable results
- Typical Scenarios/Occupations: Data entry, basic translation, junior code writing, assembly line quality inspection
- Key Data: Freelance translation task volumes decline; junior programmer hiring drops 16%

**Human-Machine Collaboration Mode:**
- Characteristics: Complex decision-making, involves ethical judgment, highly dependent on interpersonal trust
- Typical Scenarios/Occupations: Doctor diagnostic assistance, complex legal case analysis, strategic consulting, senior software architecture
- Key Data: AI use enables Boston Consulting consultants to improve task quality by over 40%

**New Task Creation (Reinstatement):**
- Characteristics: Maintain AI systems, handle AI-generated edge cases, AI ethics supervision
- Typical Positions: Prompt engineer, AI compliance officer, data annotation expert
- Key Data: AI-related job postings grew significantly year-over-year in 2025`,

    // 第三部分
    part3Title: 'Part 3: Authority Institutions & Research Report Overview',
    part3Subtitle: 'Global Research Predictions',
    part3Intro: 'Global major authority institutions use massive data and advanced models to quantify predictions of AI\'s labor market impact. Below is a summary and comparison of core conclusions.',

    // 高盛
    goldmanTitle: '3.1 Goldman Sachs: Optimistic Productivity Narrative',
    goldmanText: `**Core Prediction:** Generative AI may expose 300 million full-time jobs globally to automation.

**Productivity Growth:** If widely adopted, AI could increase global labor productivity growth by 1.5 percentage points annually over the next decade, ultimately driving 7% global GDP growth (approximately $7 trillion).

**Exposure Definition:** Goldman emphasizes "exposure" doesn't equal "unemployment." In the US, about 2/3 of jobs have some tasks (25-50%) that can be AI-assisted, and only 7% of jobs face complete substitution risk.

**Conclusion:** Long-term, AI will offset substitution effects by creating new jobs and reducing costs, overall a net positive for the economy.`,

    // 麦肯锡
    mckinseyTitle: '3.2 McKinsey Global Institute (MGI): Intense Task-Level Restructuring',
    mckinseyText: `**Automation Potential:** By 2030, approximately 30% of US work hours will be automated, a proportion significantly raised due to generative AI (previously predicted 21.5%).

**Occupational Transition:** By 2030, the US will see 12 million occupational transitions. This means workers must massively migrate from declining occupations (office support, customer service) to growing occupations (healthcare, STEM, construction).

**Skill Polarization:** Low-skill positions are 14 times more likely to be automated than high-skill positions (note: this refers to complete automation risk; although high-skill positions have high exposure, most are augmentation). Women face higher transition pressure due to concentration in administrative support positions.`,

    // WEF
    wefTitle: '3.3 World Economic Forum (WEF): Structural Loss vs. Creation Game',
    wefText: `**"Future of Jobs 2025" Report Data:** Expected over the next five years, global labor market will experience 23% structural churn.

**Net Effect:** Report predicts creating 170 million new jobs while eliminating 92 million jobs, net gain of 78 million jobs.

**Driving Factors:** Growth mainly comes from macro trends like green transition and supply chain localization, not directly AI positions; AI primarily plays "displacement" and "efficiency improvement" roles.

**Skills Crisis:** 44% of workers' skills will face obsolescence; creative thinking and AI literacy become most scarce skills.`,

    // ILO
    iloTitle: '3.4 International Labour Organization (ILO): Global Development Imbalance',
    iloText: `**Global Divide:** ILO's 2025 updated report introduces a new exposure index. In high-income countries, 34% of jobs are exposed to generative AI; in low-income countries, this proportion is only 0.4%-11%.

**Outsourcing End Risk:** This implies a dangerous future - as high-income countries use AI for office automation, traditional business process outsourcing (BPO, like Indian call centers) may return or disappear, blocking developing countries' industrialization paths.

**Gender Perspective:** Women globally face greater impact - in high-income countries, women's high-risk exposure proportion is 9.6%, far higher than men's 3.5%.`,

    // 学术界
    academicTitle: '3.5 Academic Frontier Research (MIT, Stanford, NBER)',
    academicText: `**Daron Acemoglu (MIT/NBER 2024):** Cautious about AI's macroeconomic impact. He estimates AI will only improve total factor productivity (TFP) by 0.66% over the next decade. He warns if AI is merely "so-so technology" - barely replacing labor without significantly reducing costs - it will only depress wages without bringing prosperity.

**David Autor (MIT):** Introduced the concept of "New Tasks." Although automation eliminates old tasks, if innovation can create new tasks requiring human wisdom (like medical consultation, personalized education), labor demand will remain robust. He believes AI has potential to rebuild middle class by helping low-skilled workers complete complex tasks ("democratization of expertise").

**Stanford Digital Economy Lab (2025):** Provides the most specific warning - in AI-high-exposure industries, junior employee hiring has significantly slowed, indicating companies are substituting entry-level labor with capital (AI software).`,

    // 第四部分
    part4Title: 'Part 4: Controversies & Future Trends Outlook',
    part4Subtitle: 'Debates and Predictions',
    part4Intro: 'Current academic and industry debate focus isn\'t "whether there will be impact" but "adjustment speed" and "distribution fairness".',

    // 争议
    controversyTitle: '4.1 Technological Unemployment Theory vs. Complementary Creation Theory',
    controversyText: `**Technological Unemployment Theory (Pessimistic):** Believes this time is different. AI replaces not just physical labor but cognitive labor, even possesses creativity. If machines are cheaper and more efficient than humans in all dimensions, human comparative advantage disappears, leading to long-term "technological unemployment" or wage stagnation. History\'s "Engels' Pause" (decades of soaring profits but stagnant wages during early Industrial Revolution) may repeat.

**Complementary Creation Theory (Optimistic):** Believes human demand is infinite. AI reduces costs of certain services (like medical consultation, software development), releasing huge latent demand and creating entirely new industries. For example, 60% of jobs existing in 1940 were completely non-existent earlier. Additionally, labor shortages from population aging (especially in East Asia and Europe) urgently need AI to fill gaps.`,

    // 未来预测
    futureTitle: '4.2 Employment Structure Predictions for Next 5-20 Years',
    futureText: `**Short-term (2025-2030):** This is a "turbulent adjustment period" full of friction. Productivity data fluctuates as enterprises explore optimal AI applications. Junior white-collar hiring continues sluggish, increasing youth unemployment pressure. Significant "skill premium" adjustment emerges: workers who understand AI usage receive higher compensation.

**Mid-term (2030-2040):** Task restructuring completes: most occupations will be redefined. For example, lawyers no longer spend time reviewing files but focus on court strategy and client psychological reassurance. New occupations emerge: AI ethics officer, robot maintenance technician, virtual world designer, personalized medical consultant, etc., become standardized.

**Long-term (2040+):** Population dividend replacement: AI becomes primary tool for addressing global aging. Work meaning transformation: human labor may concentrate more on "care economy," handicraft, art and other fields emphasizing human emotional connection and unique experience - these are "human moats" AI can hardly completely replicate.`,

    // 社会影响
    socialTitle: '4.3 Potential Social Impacts & Policy Responses',
    socialText: `**Income Distribution Deterioration:** AI is capital-intensive technology. If AI replaces大量 labor, income shifts from workers to capital owners (AI model and computing power owners), increasing Gini coefficient.

**Skills Gap:** Technology iteration speed exceeds education system adaptation speed. Existing education systems focus on knowledge灌输, exactly where AI excels. Future education must shift to cultivating critical thinking, collaboration abilities, and tacit knowledge.

**Policy Response Recommendations:**
- **EU Model:** Establish strict regulatory frameworks through "AI Act," protect worker rights, limit surveillance, ensure "human-in-the-loop"
- **China Model:** Emphasize "Industrial AI" and real economy integration, cultivate high-skilled technical workers through vocational education reform, support manufacturing upgrading
- **US Model:** Rely on market mechanism regulation, but policy swings appeared in 2025, from Biden era focus on fairness to Trump era emphasizing deregulation to promote innovation

**Social Security:** Discussion on Universal Basic Income (UBI) or Universal Basic Services (UBS) moves from theory to pilot programs, as bottom-line mechanism应对 labor income share decline.`,

    // 结论
    conclusionTitle: 'Conclusion',
    conclusionText: `History tells us technological progress ultimately expands economic pie and creates new employment, but this process accompanies painful adjustment periods. Current AI revolution is at the beginning of this adjustment period.

Although "complete substitution" remains statistically a minority, "task-level restructuring" is already happening at astonishing speed. Particularly for young people just entering labor market and white-collar workers engaged in routine cognitive work, impact has already appeared.

Future winners will be those who can leverage AI to enhance their capabilities, engage in high emotional value work, and master complex physical world interaction skills. For policy makers, the challenge is how to harness this force to ensure productivity improvement translates into broad social prosperity, not narrow capital gains.`,

    // 附录
    appendixTitle: 'Appendix: Key Data Comparison Table',
    appendixTable: `| Institution/Source | Prediction Time Range | Key Data/Conclusion | Core View |
|---|---|---|---|
| Goldman Sachs | Next 10 years | 300M full-time positions exposed; Global GDP +7% | Productivity leap, long-term net positive, short-term substitution risk |
| McKinsey (MGI) | By 2030 | 30% hours automated; 12M occupational transitions | Accelerated automation, needs massive skill reskilling |
| World Economic Forum (WEF) | 2025-2030 | Create 170M jobs vs eliminate 92M jobs | Net employment growth, but 23% structural churn |
| International Labour Organization (ILO) | 2025 status | 34% positions exposed in high-income countries; women at higher risk | Mainly "job transformation" not "job disappearance," beware inequality |
| Stanford University (ADP data) | 2022-2025 | AI high-exposure industries junior hiring down 16% | "Canaries in the coal mine": junior positions already declining |
| Daron Acemoglu (MIT) | Next 10 years | TFP only grows 0.66% | Questions AI short-term productivity myth, beware labor share decline |`,

    // 标签
    tagResearch: 'Research',
    tagPart: 'Part',
    tagSection: 'Section',
    tagTable: 'Data Table',
  },
  zh: {
    // 页面头部
    pageTitle: '研究报告',
    pageSubtitle: '技术奇点与劳动力的未来：AI取代人类工作的历史演变、现状与展望',
    backToHome: '返回首页',
    lastUpdated: '最后更新：2026年2月',

    // 导航
    contents: '目录',
    abstract: '摘要',
    part1: '第一部分：历史脉络',
    part2: '第二部分：现状分析',
    part3: '第三部分：机构综述',
    part4: '第四部分：未来展望',
    conclusion: '结论',
    appendix: '附录：数据对比',

    // 摘要
    abstractTitle: '研究摘要',
    abstractText: `本报告旨在全面、系统地探讨人工智能（AI）与自动化技术对全球劳动力市场的深远影响。报告基于2023年至2025年的最新权威研究，涵盖了从工业革命至今的历史演变，重点分析了当前生成式AI（Generative AI）带来的"认知自动化"浪潮。

通过整合高盛（Goldman Sachs）、麦肯锡全球研究院（MGI）、世界经济论坛（WEF）、国际劳工组织（ILO）、经合组织（OECD）以及斯坦福大学、麻省理工学院（MIT）等顶尖学术机构的实证数据，本报告揭示了一个复杂的转型图景：尽管大规模的技术性失业尚未在宏观数据中全面显现，但劳动力市场的微观结构正在经历剧烈重组。

特别是针对初级白领职位的"就业冻结"现象，以及任务层面的"技能重构"，预示着劳动力市场正处于一个关键的转折点。`,

    // 第一部分
    part1Title: '第一部分：历史脉络',
    part1Subtitle: '从体力替代到认知增强的演进',
    part1Intro: '要理解当前AI浪潮的独特性，必须首先将其置于技术与劳动力互动的长周期历史中进行审视。经济史表明，自动化并非简单的"替代"，而是一个包含替代（Displacement）、生产力效应（Productivity Effect）和恢复效应（Reinstatement Effect）的动态过程。',

    // 工业革命
    revolution1Title: '1.1 第一与第二次工业革命：体力劳动的机械化（1760–1950）',
    revolution1Text: `**这一阶段，技术进步的核心逻辑是"动力替代肌肉"。**

*替代效应的早期表现：* 18世纪末的工业革命引入了蒸汽机和纺织机械。以英国的卢德运动（Luddites）为代表，手工业者强烈反抗机器对传统技能的贬值。当时的自动化主要替代的是工匠的熟练手工操作。

*生产力与需求的扩张：* 虽然特定工种（如手工织布工）消失了，但机械化大幅降低了纺织品的单位成本，导致需求爆发性增长，反而创造了更多操作机器的工厂就业岗位。这一时期的特点是技术具有"互补性"，机器需要大量低技能劳动力来操作。

*就业结构的根本性转移：* 第二次工业革命（电力与流水线）进一步加速了从农业向制造业的转移。例如，19世纪美国的农业劳动力占比高达三分之二，随着农业机械化的普及，这部分劳动力被释放并被新兴的制造业吸收。这一过程虽然痛苦，但并未导致长期的系统性失业，反而伴随着工资的普遍上涨。`,

    // 计算机革命
    revolution2Title: '1.2 第三次工业革命：计算机化与常规任务的自动化（1970s–2010s）',
    revolution2Text: `20世纪下半叶，随着大型机和个人电脑的普及，自动化的前沿从"体力"转向了"常规认知"。

*常规偏向型技术变革（RBTC）：* 经济学家David Autor等人提出的理论指出，计算机最擅长执行基于明确规则（Rule-based）的任务，如簿记、档案管理和重复性的装配线工作。这导致了劳动力市场的"极化"（Polarization）现象：中等技能、中等收入的工作（如文员、生产线工人）被大量替代，而低技能的服务业工作（难以自动化的非定型体力劳动）和高技能的抽象分析工作（需要计算机辅助的决策）则在两端增长。

*波兰尼悖论（Polanyi's Paradox）的限制：* 在这一阶段，自动化受限于迈克尔·波兰尼（Michael Polanyi）提出的悖论——"我们所知道的远多于我们所能言说的"。许多任务（如识别一张脸、驾驶汽车、进行复杂的法律论证）依赖于隐性知识，无法被编写成明确的计算机代码，因此在当时被认为是"安全"的。

*技能偏向型技术变革（SBTC）：* 这一时期的主流经济学观点认为，技术进步增加了对受过高等教育工人的需求（如工程师、分析师），导致学历溢价（College Premium）显著上升，加剧了工资不平等。`,

    // AI革命
    revolution3Title: '1.3 第四次工业革命：机器学习与生成式AI（2015–至今）',
    revolution3Text: `当前的变革标志着波兰尼悖论的终结。通过深度学习和神经网络，机器不再需要人类编写规则，而是通过海量数据"学习"规则。

**认知自动化的突破：** 从2012年ImageNet的图像识别突破，到2022年ChatGPT的发布，AI开始攻克非常规认知任务（Non-routine Cognitive Tasks）。这意味着高学历、高收入的"知识型工作"首次面临直接的自动化暴露。

**历史的倒置：** 与工业革命替代蓝领、计算机革命替代中产白领不同，生成式AI对高薪职位的暴露度最高。研究表明，AI暴露度与工资水平呈正相关，这对传统的"技能保护论"构成了挑战。

**发展阶段对比表：**
| 发展阶段 | 核心技术 | 替代对象 | 劳动力市场影响 |
|---------|---------|---------|---------------|
| 工业革命 (1.0 & 2.0) | 蒸汽机、电力、流水线 | 体力劳动、工匠技能 | 农业向工业转移，创造大量蓝领岗位 |
| 计算机化 (3.0) | 个人电脑、互联网、软件 | 常规认知任务（计算、归档） | 就业极化（中产空心化），学历溢价上升 |
| 人工智能 (4.0) | 机器学习、生成式AI | 非常规认知任务（写作、编程、设计） | 高技能职位暴露，技能门槛降低，创造力重组 |`,

    // 第二部分
    part2Title: '第二部分：当前现状深度剖析（2020–2025）',
    part2Subtitle: '从理论到实践',
    part2Intro: '进入2020年代中期，AI对就业市场的影响已从理论预测转向实际数据。尽管宏观失业率尚未飙升，但微观层面的"任务替代"和"招聘冻结"已在特定行业显现。',

    // 总体就业变化
    overallTitle: '2.1 总体就业与生产率变化',
    overallText: `根据经合组织（OECD）和国际劳工组织（ILO）2024-2025年的报告，全球劳动力市场展现出一种复杂的韧性与脆弱性并存的状态。

**总量稳定，结构动荡：** OECD国家的失业率处于历史低位（2024年5月为4.9%），这表明AI尚未引发大规模的解雇潮。然而，这掩盖了内部的剧烈动荡。世界经济论坛（WEF）《2025年未来就业报告》指出，未来五年内，约23%的工作岗位将发生结构性变化，包括岗位的消失与新生。

**生产率的J曲线：** 尽管AI技术普及迅速，但宏观生产率数据的增长在2023-2024年间并未立即爆发。这符合"J曲线"效应——企业需要时间重新设计工作流程、培训员工和部署基础设施，才能真正释放AI的生产力红利。然而，高盛的研究指出，早期采用AI的企业已经开始展现出显著的效率提升。`,

    // 行业分析
    industryTitle: '2.2 行业特异性分析：替代与增强的实证',
    industryIntro: 'AI的影响在不同行业表现出极大的差异性。以下基于最新的行业数据进行详细拆解：',

    // 编程
    industryITTitle: '2.2.1 编程与信息技术（IT）',
    industryITText: `这是受生成式AI冲击最直接的领域，也是"替代"与"增强"并存的典型样本。

**生产率飞跃：** GitHub Copilot等工具使程序员的编码速度提升了约56%。这不仅是效率的提升，更改变了工作的性质——从编写代码转变为审查代码。

**初级岗位的危机：** 斯坦福大学2025年的研究（"Canaries in the Coal Mine"）利用ADP工资数据发现，在AI暴露度最高的职业（如软件开发）中，初级员工（22-25岁）的招聘需求在2022年底后相对于高级职位出现了约16%的显著下降。这表明企业正在利用AI替代初级编码工作，导致"初级岗位空心化"。

**技能门槛的降低：** AI降低了编程的准入门槛，使得非专业人员也能通过自然语言生成代码，这在一定程度上压低了初级程序员的市场价值，但提高了高级架构师的价值。`,

    // 媒体
    industryMediaTitle: '2.2.2 媒体、新闻与内容创作',
    industryMediaText: `**任务替代率高：** 由Midjourney、Sora等工具驱动的内容生成正在重塑创意产业。皮尤研究中心（Pew Research）数据显示，59%的美国人认为AI将在未来20年内导致记者工作机会减少。

**自由职业市场的震荡：** 针对自由职业平台（如Upwork、Fiverr）的研究显示，写作、翻译和插画类任务的需求和报价在ChatGPT发布后出现了明显下滑。这属于典型的"完全替代"模式，即低端的、标准化的创意工作被AI直接接管。

**增强模式：** 高端新闻调查和深度报道开始利用AI辅助数据清洗和线索发现，这属于"增强"模式，但这部分岗位的数量远少于被自动化的内容生成岗位。`,

    // 金融
    industryFinanceTitle: '2.2.3 金融服务',
    industryFinanceText: `**数据密集型行业的暴露：** 高盛指出，金融行业是AI暴露度最高的行业之一，约50%的任务可被自动化。AI已深入应用于算法交易、欺诈检测、风险评估和客户服务。

**从柜员到顾问的转变：** 虽然后台处理和基础分析岗位在减少，但对能够解释复杂AI模型输出、维护客户关系的金融顾问的需求保持稳定。这反映了"人机协作"的必要性——AI处理数据，人类处理信任。`,

    // 客服
    industryCSTitle: '2.2.4 客户服务与行政支持',
    industryCSText: `**直接的替代效应：** 这是目前观测到最明显的替代领域。聊天机器人和语音AI已经能够处理复杂的客户查询。研究显示，AI工具能使低技能客服员工的绩效提升35%，使其达到高技能员工的水平，但这也意味着企业可以用更低成本、更少的人力维持同等服务水平。

**ILO的警告：** 国际劳工组织指出，文书类工作（Clerical Jobs）面临最高的完全自动化风险，而这部分岗位在低收入和中等收入国家中由女性占据的比例极高，可能导致性别不平等的加剧。`,

    // 医疗教育
    industryHealthTitle: '2.2.5 医疗与教育',
    industryHealthText: `**高接触行业的韧性：** 尽管AI在诊断影像分析上表现优异（增强模式），但医疗护理和教育依然是"人际互动密集型"行业，难以被完全替代。

**行政减负：** 在医疗领域，AI主要被用于减少医生处理文书工作的时间（约占20%），从而释放更多时间用于患者护理。

**教育的转型：** 在教育领域，AI正从简单的作业批改转向个性化辅导。然而，对于教师角色的核心——情感支持和道德引导，AI仍无法替代。UNESCO强调，教育应利用AI增强教师能力，而非取代教师。`,

    // 替代模式边界
    modeBoundaryTitle: '2.3 "完全替代"与"人机协作"的边界',
    modeBoundaryText: `基于2024-2025年的数据，我们可以清晰地划分出两种模式的边界：

**完全替代 (Substitution)：**
- 特征：任务标准化、无需情感交互、结果可客观验证
- 典型场景/职业：数据录入、基础翻译、初级代码编写、流水线质检
- 关键数据：自由职业翻译任务量下降；初级程序员招聘减少16%

**人机协作 (Augmentation)：**
- 特征：需复杂决策、涉及伦理判断、高度依赖人际信任
- 典型场景/职业：医生诊断辅助、复杂法律案件分析、战略咨询、高级软件架构
- 关键数据：AI使用使波士顿咨询顾问的任务质量提升40%以上

**新任务创造 (Reinstatement)：**
- 特征：维护AI系统、处理AI产生的边缘情况、AI伦理监督
- 典型职位：提示词工程师、AI合规官、数据标注专家
- 关键数据：2025年AI相关职位发布量同比增长显著`,

    // 第三部分
    part3Title: '第三部分：权威机构与研究报告综述',
    part3Subtitle: '全球研究预测',
    part3Intro: '全球各大权威机构利用海量数据和先进模型，对AI的劳动力市场影响进行了量化预测。以下是核心结论的汇总与对比。',

    // 高盛
    goldmanTitle: '3.1 高盛（Goldman Sachs）：乐观的生产力叙事',
    goldmanText: `**核心预测：** 生成式AI可能使全球3亿个全职工作岗位面临自动化暴露。

**生产力增长：** 如果广泛采用，未来10年内，AI每年可将全球劳动生产率增速提高1.5个百分点，最终推动全球GDP增长7%（约7万亿美元）。

**暴露度定义：** 高盛强调"暴露"不等于"失业"。在美国，约2/3的工作有部分任务（25-50%）可被AI辅助，只有7%的工作面临完全替代的风险。

**结论：** 长期来看，AI将通过创造新岗位和降低成本来抵消替代效应，总体对经济是净利好。`,

    // 麦肯锡
    mckinseyTitle: '3.2 麦肯锡全球研究院（MGI）：任务层面的剧烈重组',
    mckinseyText: `**自动化潜力：** 到2030年，美国经济中约30%的工作工时将被自动化，这一比例因生成式AI的出现而显著上调（此前预测为21.5%）。

**职业转型：** 预计到2030年，美国将有1200万次职业转换（Occupational Transitions）。这意味着工人必须从衰退的职业（如办公室支持、客户服务）大规模迁移到增长的职业（如医疗、STEM、建筑）。

**技能极化：** 低薪岗位被自动化的可能性是高薪岗位的14倍（注意：这是指完全自动化风险，尽管高薪岗位暴露度高，但更多是增强）。女性因集中在行政支持岗位，面临更高的转型压力。`,

    // WEF
    wefTitle: '3.3 世界经济论坛（WEF）：结构性流失与新生的博弈',
    wefText: `**《2025年未来就业报告》数据：** 预计未来五年，全球劳动力市场将经历23%的结构性流失（Churn）。

**净效应：** 报告预测将创造1.7亿个新岗位，同时消失9200万个岗位，净增7800万个岗位。

**驱动因素：** 增长主要并非直接来自AI岗位，而是由绿色转型、供应链本地化等宏观趋势驱动；而AI主要扮演"置换"和"提升效率"的角色。

**技能危机：** 44%的工人技能将面临过时，创造性思维和AI素养成为最紧缺的技能。`,

    // ILO
    iloTitle: '3.4 国际劳工组织（ILO）：全球发展的不平衡',
    iloText: `**全球鸿沟：** ILO 2025年的更新报告引入了新的暴露指数。在高收入国家，34%的就业岗位暴露于生成式AI；而在低收入国家，这一比例仅为0.4%–11%。

**外包终结的风险：** 这暗示了一个危险的未来——随着高收入国家利用AI实现办公自动化，传统的业务流程外包（BPO，如印度的呼叫中心）可能回流或消失，阻断发展中国家的工业化路径。

**性别视角：** 女性在全球范围内受到的冲击更大，高收入国家女性的高风险暴露比例为9.6%，远高于男性的3.5%。`,

    // 学术界
    academicTitle: '3.5 学术界前沿研究（MIT, Stanford, NBER）',
    academicText: `**Daron Acemoglu (MIT/NBER 2024)：** 对AI的宏观经济影响持谨慎态度。他估算AI在未来10年对全要素生产率（TFP）的提升仅为0.66%。他警告说，如果AI仅仅是"一般般的技术"（So-so technology），即只能勉强替代人工而不能大幅降低成本，那么它只会压低工资而不会带来繁荣。

**David Autor (MIT)：** 提出了"新任务"（New Tasks）的概念。虽然自动化消除了旧任务，但如果创新能创造出需要人类智慧的新任务（如医疗咨询、个性化教育），劳动力需求将保持旺盛。他认为AI有潜力通过帮助低技能工人完成复杂任务来重建中产阶级（"专业知识的民主化"）。

**Stanford Digital Economy Lab (2025)：** 提供了最具体的预警——在AI高暴露行业，初级员工的招聘已经显著放缓，表明企业正在用资本（AI软件）替代入门级劳动。`,

    // 第四部分
    part4Title: '第四部分：争议与未来趋势展望',
    part4Subtitle: '争论与预测',
    part4Intro: '当前学界和业界的争论焦点不在于"是否会有影响"，而在于"调整的速度"和"分配的公平性"。',

    // 争议
    controversyTitle: '4.1 技术失业论 vs. 互补创造论',
    controversyText: `**技术失业论（悲观派）：** 认为这次不同以往。AI不仅替代体力，还替代脑力，甚至具备创造力。如果机器在所有维度上都比人类便宜且高效，人类的比较优势将不复存在，导致长期的"技术性失业"或工资停滞。历史上的"恩格斯停顿"（Engels' Pause，指工业革命初期利润飙升但工资停滞的几十年）可能会重演。

**互补创造论（乐观派）：** 认为人类的需求是无限的。AI降低了某些服务的成本（如医疗咨询、软件开发），这将释放出巨大的潜在需求，创造出全新的行业。例如，1940年以后产生的60%的工作在当时是完全不存在的。此外，人口老龄化导致的劳动力短缺（特别是在东亚和欧洲）急需AI来填补缺口。`,

    // 未来预测
    futureTitle: '4.2 未来5–20年的就业结构预测',
    futureText: `**短期（2025–2030）：** 这是一个充满摩擦的"混乱调整期"。生产率数据波动，企业在探索AI的最佳应用。初级白领职位的招聘持续低迷，导致青年失业率压力增大。出现明显的"技能溢价"调整：了解如何使用AI的工人将获得更高薪酬。

**中期（2030–2040）：** 任务重组完成：大部分职业将被重新定义。例如，律师将不再花费时间查阅卷宗，而是专注于庭辩策略和客户心理安抚。新职业涌现：AI伦理官、机器人维护师、虚拟世界设计师、个性化医疗顾问等新职位将标准化。

**长期（2040+）：** 人口红利替代：AI将成为应对全球老龄化的主要工具。工作意义的转变：人类劳动可能更多集中在"关怀经济"（Care Economy）、手工艺、艺术等强调人际情感连接和独特体验的领域，这些是AI难以完全复制的"人性护城河"。`,

    // 社会影响
    socialTitle: '4.3 潜在的社会影响与政策应对',
    socialText: `**收入分配恶化：** AI是资本密集型技术。如果AI取代了大量劳动，收入将从劳动者流向资本所有者（AI模型和算力的拥有者），导致基尼系数上升。

**技能鸿沟（Skills Gap）：** 技术迭代速度超过了教育体系的适应速度。现有的教育体系侧重于知识灌输（Codified Knowledge），而AI恰好擅长此道。未来的教育必须转向培养批判性思维、协作能力和隐性知识（Tacit Knowledge）。

**政策应对建议：**
- **欧盟模式：** 通过《AI法案》（EU AI Act）建立严格的监管框架，保护工人权利，限制监控，确保"人在回路"（Human-in-the-loop）
- **中国模式：** 强调"工业AI"和实体经济融合，通过职业教育改革培养高技能技术工人，支持制造业升级
- **美国模式：** 依赖市场机制调节，但在2025年出现了政策摇摆，从拜登时期的关注公平转向特朗普时期强调放松监管以促进创新

**社会保障：** 关于全民基本收入（UBI）或全民基本服务（UBS）的讨论将从理论走向试点，作为应对劳动收入份额下降的托底机制。`,

    // 结论
    conclusionTitle: '结论',
    conclusionText: `历史告诉我们，技术进步最终会做大经济蛋糕并创造新就业，但这一过程伴随着痛苦的调整期。当前的AI革命正处于这一调整期的开端。

虽然"完全替代"在统计上仍是少数，但"任务层面的重构"正在发生，且速度惊人。特别是对于刚刚进入劳动力市场的年轻人，以及从事常规认知工作的白领阶层，冲击已经显现。

未来的赢家将是那些能够利用AI增强自身能力、从事高情感价值工作以及掌握复杂物理世界交互技能的人。对于政策制定者而言，挑战在于如何驾驭这股力量，确保生产力的提升转化为广泛的社会繁荣，而非狭隘的资本收益。`,

    // 附录
    appendixTitle: '附录：关键数据对比表',
    appendixTable: `| 机构/来源 | 预测时间范围 | 关键数据/结论 | 核心观点 |
|---|---|---|---|
| 高盛 (Goldman Sachs) | 未来10年 | 3亿全职岗位暴露；全球GDP提升7% | 生产力跃升，长期净利好，短期有替代风险 |
| 麦肯锡 (MGI) | 到2030年 | 30%工时自动化；1200万职业转换 | 加速自动化，需大规模技能重塑 |
| 世界经济论坛 (WEF) | 2025-2030 | 创造1.7亿岗位 vs 消失9200万岗位 | 净就业增长，但结构性流失（Churn）高达23% |
| 国际劳工组织 (ILO) | 2025现状 | 高收入国家34%岗位暴露；女性风险更高 | 主要是"工作转型"而非"工作消失"，警惕不平等 |
| 斯坦福大学 (ADP数据) | 2022-2025 | AI高暴露行业初级招聘下降16% | "矿井中的金丝雀"：初级岗位已开始减少 |
| Daron Acemoglu (MIT) | 未来10年 | TFP仅增长0.66% | 质疑AI的短期生产力神话，警惕劳动力份额下降 |`,

    // 标签
    tagResearch: '研究',
    tagPart: '部分',
    tagSection: '章节',
    tagTable: '数据表',
  },
};

export default function ResearchPage() {
  const [lang, setLang] = useState<Language>('zh');
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-surface-elevated">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>{t.backToHome}</span>
          </Link>
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="font-bold">{t.pageTitle}</h1>
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-hover transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span className="text-sm font-medium">{lang === 'en' ? '中文' : 'EN'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 页面头部 */}
      <header className="pt-32 pb-16 px-6 bg-gradient-to-b from-surface-elevated/50 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {t.tagResearch}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t.pageSubtitle}
            </h1>
            <p className="text-foreground-muted text-sm">{t.lastUpdated}</p>
          </motion.div>
        </div>
      </header>

      {/* 目录导航 */}
      <nav className="py-12 px-6 bg-surface border-y border-surface-elevated">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            {t.contents}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'abstract', icon: FileText, label: t.abstract },
              { id: 'part1', icon: History, label: t.part1 },
              { id: 'part2', icon: TrendingUp, label: t.part2 },
              { id: 'part3', icon: Globe, label: t.part3 },
              { id: 'part4', icon: Lightbulb, label: t.part4 },
              { id: 'conclusion', icon: CheckCircle2, label: t.conclusion },
              { id: 'appendix', icon: Database, label: t.appendix },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 p-4 rounded-lg bg-surface-elevated hover:bg-surface-hover transition-colors group"
              >
                <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto text-foreground-muted group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 内容区域 */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* 摘要 */}
        <section id="abstract" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                <FileText className="w-5 h-5" />
              </span>
              {t.abstractTitle}
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-foreground-muted leading-relaxed whitespace-pre-line">
                {t.abstractText}
              </p>
            </div>
          </motion.div>
        </section>

        {/* 第一部分 */}
        <section id="part1" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t.part1Title}</h2>
            <p className="text-xl text-foreground-muted mb-8">{t.part1Subtitle}</p>
            <p className="text-foreground-muted leading-relaxed mb-8">{t.part1Intro}</p>

            <div className="space-y-12">
              <div className="p-6 rounded-2xl bg-surface-elevated border border-surface-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 text-sm font-bold">1.1</span>
                  {t.revolution1Title}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.revolution1Text}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-elevated border border-surface-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 text-sm font-bold">1.2</span>
                  {t.revolution2Title}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.revolution2Text}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-surface-elevated border border-surface-border">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 text-sm font-bold">1.3</span>
                  {t.revolution3Title}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.revolution3Text}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 第二部分 */}
        <section id="part2" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t.part2Title}</h2>
            <p className="text-xl text-foreground-muted mb-8">{t.part2Subtitle}</p>
            <p className="text-foreground-muted leading-relaxed mb-8">{t.part2Intro}</p>

            <div className="space-y-12">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-red-500" />
                  {t.overallTitle}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.overallText}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  {t.industryTitle}
                </h3>
                <p className="text-foreground-muted mb-6">{t.industryIntro}</p>

                <div className="space-y-6">
                  {[
                    { title: t.industryITTitle, text: t.industryITText, color: 'blue' },
                    { title: t.industryMediaTitle, text: t.industryMediaText, color: 'purple' },
                    { title: t.industryFinanceTitle, text: t.industryFinanceText, color: 'green' },
                    { title: t.industryCSTitle, text: t.industryCSText, color: 'red' },
                    { title: t.industryHealthTitle, text: t.industryHealthText, color: 'cyan' },
                  ].map((item, idx) => (
                    <details
                      key={idx}
                      className="group p-6 rounded-2xl bg-surface-elevated border border-surface-border hover:border-surface-hover transition-all cursor-pointer"
                    >
                      <summary className="flex items-center justify-between font-bold text-lg">
                        <span className="flex items-center gap-3">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full bg-${item.color}-500/20 text-${item.color}-500 text-sm font-bold`}>
                            2.2.{idx + 1}
                          </span>
                          {item.title}
                        </span>
                        <ChevronDown className="w-5 h-5 text-foreground-muted group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="mt-4 prose max-w-none text-foreground-muted whitespace-pre-line">
                        {item.text}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4">{t.modeBoundaryTitle}</h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.modeBoundaryText}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 第三部分 */}
        <section id="part3" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t.part3Title}</h2>
            <p className="text-xl text-foreground-muted mb-8">{t.part3Subtitle}</p>
            <p className="text-foreground-muted leading-relaxed mb-8">{t.part3Intro}</p>

            <div className="space-y-6">
              {[
                { title: t.goldmanTitle, text: t.goldmanText, icon: '🏦' },
                { title: t.mckinseyTitle, text: t.mckinseyText, icon: '📊' },
                { title: t.wefTitle, text: t.wefText, icon: '🌐' },
                { title: t.iloTitle, text: t.iloText, icon: '👥' },
                { title: t.academicTitle, text: t.academicText, icon: '🎓' },
              ].map((item, idx) => (
                <details
                  key={idx}
                  className="group p-6 rounded-2xl bg-surface-elevated border border-surface-border hover:border-primary/50 transition-all cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-bold text-lg">
                    <span className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      {item.title}
                    </span>
                    <ChevronDown className="w-5 h-5 text-foreground-muted group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="mt-4 prose max-w-none text-foreground-muted whitespace-pre-line">
                    {item.text}
                  </div>
                </details>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 第四部分 */}
        <section id="part4" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t.part4Title}</h2>
            <p className="text-xl text-foreground-muted mb-8">{t.part4Subtitle}</p>
            <p className="text-foreground-muted leading-relaxed mb-8">{t.part4Intro}</p>

            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-purple-500" />
                  {t.controversyTitle}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.controversyText}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  {t.futureTitle}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.futureText}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  {t.socialTitle}
                </h3>
                <div className="prose max-w-none text-foreground-muted whitespace-pre-line">
                  {t.socialText}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 结论 */}
        <section id="conclusion" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 text-green-500">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              {t.conclusionTitle}
            </h2>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/30">
              <p className="text-foreground-muted leading-relaxed whitespace-pre-line text-lg">
                {t.conclusionText}
              </p>
            </div>
          </motion.div>
        </section>

        {/* 附录 */}
        <section id="appendix" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/20 text-cyan-500">
                <Database className="w-5 h-5" />
              </span>
              {t.appendixTitle}
            </h2>
            <div className="p-6 rounded-2xl bg-surface-elevated border border-surface-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border">
                    <th className="text-left p-3 font-bold text-foreground">机构/来源</th>
                    <th className="text-left p-3 font-bold text-foreground">预测时间范围</th>
                    <th className="text-left p-3 font-bold text-foreground">关键数据/结论</th>
                    <th className="text-left p-3 font-bold text-foreground">核心观点</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['高盛 (Goldman Sachs)', '未来10年', '3亿全职岗位暴露；全球GDP提升7%', '生产力跃升，长期净利好，短期有替代风险'],
                    ['麦肯锡 (MGI)', '到2030年', '30%工时自动化；1200万职业转换', '加速自动化，需大规模技能重塑'],
                    ['世界经济论坛 (WEF)', '2025-2030', '创造1.7亿岗位 vs 消失9200万岗位', '净就业增长，但结构性流失（Churn）高达23%'],
                    ['国际劳工组织 (ILO)', '2025现状', '高收入国家34%岗位暴露；女性风险更高', '主要是"工作转型"而非"工作消失"，警惕不平等'],
                    ['斯坦福大学 (ADP数据)', '2022-2025', 'AI高暴露行业初级招聘下降16%', '"矿井中的金丝雀"：初级岗位已开始减少'],
                    ['Daron Acemoglu (MIT)', '未来10年', 'TFP仅增长0.66%', '质疑AI的短期生产力神话，警惕劳动力份额下降'],
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-surface-border/50 hover:bg-surface-hover/50">
                      <td className="p-3 font-medium">{row[0]}</td>
                      <td className="p-3 text-foreground-muted">{row[1]}</td>
                      <td className="p-3 text-foreground-muted">{row[2]}</td>
                      <td className="p-3 text-foreground-muted">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </section>
      </article>

      {/* 页脚 */}
      <footer className="py-12 px-6 border-t border-surface-elevated bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-foreground-muted text-sm">
            本研究报告数据来源于公开研究报告和新闻来源，仅供参考
          </p>
          <p className="text-foreground-muted text-xs mt-2">
            Data sources: MIT, McKinsey, WEF, Goldman Sachs, OECD, ILO, Stanford, NBER
          </p>
        </div>
      </footer>
    </main>
  );
}
