/**
 * AIR 60-Question Full Quiz Data
 *
 * 4 dimensions x 15 questions = 60 total
 * Each dimension has 5 facets with 3 questions each (typically 2F + 1R or 1F + 2R)
 * Target ratio: 9 forward / 6 reverse per dimension (60/40)
 *
 * Based on: docs/air_quiz_60_design.md v2.0
 */

import { QuizQuestion, QuizDimension } from './air_quiz_data';

// =============================================================================
// Dimension 1: Learnability (E/T) — 15 questions
// =============================================================================

export const DIMENSION_LEARNABILITY_FULL: QuizQuestion[] = [
  // Facet 1A: Digitalization (3 questions)
  {
    id: 'Q1_full',
    indicator: 'Digitalization',
    direction: 'forward',
    question: {
      en: 'Where is your daily work mainly done?',
      zh: '你的日常工作主要在哪里完成？',
    },
    options: [
      { en: 'Almost never use a computer — all hands-on physical work', zh: '几乎不碰电脑，全靠手和身体干活' },
      { en: 'Occasionally use a computer, but core work is hands-on', zh: '偶尔用电脑查东西，但核心工作靠动手' },
      { en: 'About half digital, half physical', zh: '电脑和动手差不多各占一半' },
      { en: 'Mostly done on computers/systems', zh: '大部分在电脑/系统上完成' },
      { en: 'Almost entirely in digital systems', zh: '几乎全在电脑或数字系统里完成' },
    ],
  },
  {
    id: 'Q2_full',
    indicator: 'Digitalization',
    direction: 'forward',
    question: {
      en: 'How much of your daily work output automatically leaves a digital trail?',
      zh: '你一天的工作产出有多少会自动留下数字记录？',
    },
    options: [
      { en: 'Almost nothing — results exist in the physical world', zh: '几乎什么都不留，成果在物理世界里' },
      { en: 'A small portion is recorded, most has no digital trace', zh: '少量有记录，大部分没有电子痕迹' },
      { en: 'About half has digital records', zh: '大概一半有数字记录' },
      { en: 'Most processes and results have digital records', zh: '大部分工作过程和结果都有数字记录' },
      { en: 'Fully digital, every step is logged', zh: '全程数字化，每一步操作都有日志' },
    ],
  },
  {
    id: 'Q3_full',
    indicator: 'Digitalization',
    direction: 'reverse',
    question: {
      en: 'How much of your work requires physically touching, inspecting, or handling real objects to make judgments?',
      zh: '你的工作中有多少需要对实物"上手摸一摸、看一看"才能判断的环节？',
    },
    options: [
      { en: 'Almost every step requires hands-on contact with physical objects', zh: '几乎所有环节都需要亲手接触实物' },
      { en: 'Most requires hands-on work, a little can be done on screen', zh: '大部分要动手操作，少量看屏幕就行' },
      { en: 'Half needs physical handling, half can be done with data', zh: '一半需要上手，一半看数据就能搞定' },
      { en: 'Occasionally need to see physical objects, mostly done on screen', zh: '偶尔需要看看实物，大部分在屏幕上完成' },
      { en: 'Never need to handle physical objects — purely data and information', zh: '完全不需要碰实物，纯粹跟数据和信息打交道' },
    ],
  },

  // Facet 1B: Knowledge Accessibility (3 questions)
  {
    id: 'Q4_full',
    indicator: 'Knowledge Accessibility',
    direction: 'forward',
    question: {
      en: 'How much of the professional knowledge your work involves can be found online?',
      zh: '你工作涉及的专业知识，网上能找到多少？',
    },
    options: [
      { en: 'Almost nothing — all internal accumulation or oral transmission', zh: '几乎找不到，全是内部积累或口传心授' },
      { en: 'Basic knowledge is available, but key techniques are insider-only', zh: '基础知识有，但核心技巧只有圈内人知道' },
      { en: 'About half can be found, half relies on internal experience', zh: '大概一半能查到，一半靠内部经验' },
      { en: 'Most has public tutorials and documentation', zh: '绝大部分有公开教程和文档' },
      { en: 'Everything is online — tutorials, videos, courses, case studies', zh: '网上要什么有什么，教程视频课程案例一应俱全' },
    ],
  },
  {
    id: 'Q5_full',
    indicator: 'Knowledge Accessibility',
    direction: 'forward',
    question: {
      en: 'If AI read all the books, papers, and textbooks in your field, what percentage of the knowledge your work requires would it have?',
      zh: '如果AI读完了你所在行业所有的书、论文和教材，它能掌握你工作所需知识的百分之多少？',
    },
    options: [
      { en: 'Less than 20% — book knowledge is just the surface', zh: '不到20%，书本知识只是皮毛' },
      { en: 'About 30-40% — useful but far from enough', zh: '大约30-40%，有用但远远不够' },
      { en: 'About 50-60% — a decent foundation', zh: '大约50-60%，能打个基础' },
      { en: 'About 70-80% — most can be learned from materials', zh: '大约70-80%，大部分都能从资料里学' },
      { en: 'Over 90% — books cover almost everything', zh: '90%以上，书上基本全覆盖了' },
    ],
  },
  {
    id: 'Q6_full',
    indicator: 'Knowledge Accessibility',
    direction: 'reverse',
    question: {
      en: 'How did you learn the most critical knowledge for your work?',
      zh: '你工作中最关键的那些知识，是怎么学会的？',
    },
    options: [
      { en: 'Only through years of personal experience and gradual realization', zh: '只能靠多年的亲身体验慢慢悟出来' },
      { en: 'Mainly through mentorship and self-exploration — not in books', zh: '主要靠师傅带和自己摸索，书上找不到' },
      { en: 'Half from formal learning, half from practice', zh: '一半靠正规学习，一半靠实践积累' },
      { en: 'Most came from school or training programs', zh: '大部分来自学校或培训课程' },
      { en: 'Almost entirely from textbooks and tutorials', zh: '基本都是从课本和教程里学的' },
    ],
  },

  // Facet 1C: Process Standardization (3 questions)
  {
    id: 'Q7_full',
    indicator: 'Process Standardization',
    direction: 'forward',
    question: {
      en: 'How "by the book" are your work processes?',
      zh: '你的工作流程有多"按部就班"？',
    },
    options: [
      { en: 'Almost no fixed process — every situation is new', zh: '几乎没有固定流程，每次都是全新情况' },
      { en: 'Some basic steps, but mostly improvisation', zh: '有一些基本步骤，但大部分要灵活应变' },
      { en: 'Half follows procedures, half improvisation', zh: '一半有章可循，一半随机应变' },
      { en: 'Mostly standardized, occasional exceptions', zh: '大部分有标准流程，偶尔遇到例外' },
      { en: 'Almost entirely by the manual — just follow it', zh: '几乎完全按操作手册来，照做就行' },
    ],
  },
  {
    id: 'Q8_full',
    indicator: 'Process Standardization',
    direction: 'forward',
    question: {
      en: 'Could your work be written into a detailed manual for a newcomer to follow?',
      zh: '你的工作能不能被写成一份详细的操作手册，让新人照着做？',
    },
    options: [
      { en: 'Impossible — too many "it depends" judgment calls', zh: '根本写不出来，太多"看情况"的判断' },
      { en: 'Can write an outline, but details depend on personal judgment', zh: '能写个大纲，但细节靠个人悟性' },
      { en: 'Could cover about half; the other half can\'t be written down', zh: '能覆盖一半，另一半没法写清楚' },
      { en: 'Most of it can be written very clearly', zh: '大部分都能写得很清楚' },
      { en: 'Absolutely — there\'s already an existing SOP', zh: '完全可以，已经有现成的SOP了' },
    ],
  },
  {
    id: 'Q9_full',
    indicator: 'Process Standardization',
    direction: 'reverse',
    question: {
      en: 'How often do you need to make a decision with no precedent to reference?',
      zh: '你在工作中多久需要做一次"没有先例可参考"的决定？',
    },
    options: [
      { en: 'Every day — having no precedent is the norm', zh: '每天都有，没有先例是常态' },
      { en: 'At least several times a week', zh: '每周至少好几次' },
      { en: 'A few times a month', zh: '每个月会碰到几次' },
      { en: 'Rarely — just a few times a year', zh: '很少，一年也就几次' },
      { en: 'Never — there are established solutions for every situation', zh: '从来没有，所有情况都有现成方案' },
    ],
  },

  // Facet 1D: Tacit Knowledge Depth (3 questions)
  {
    id: 'Q10_full',
    indicator: 'Tacit Knowledge Depth',
    direction: 'reverse',
    question: {
      en: 'How much does your work depend on "hard to articulate" experience?',
      zh: '你的工作有多依赖"只可意会不可言传"的经验？',
    },
    options: [
      { en: 'Entirely relies on years of cultivated "feel" — hard to explain', zh: '全靠多年修炼的"感觉"，说都说不清楚' },
      { en: 'Heavily depends on long-accumulated intuition and feel', zh: '非常依赖长期积累的直觉和手感' },
      { en: 'Needs some experience, but can be taught', zh: '需要一定经验积累，但也能教会别人' },
      { en: 'Some small tricks but learnable quickly', zh: '有一点小技巧但很快能学会' },
      { en: 'Not at all — a newbie can do it with the manual', zh: '完全不依赖，照说明书新手也能做' },
    ],
  },
  {
    id: 'Q11_full',
    indicator: 'Tacit Knowledge Depth',
    direction: 'reverse',
    question: {
      en: 'If you were teaching a smart but completely inexperienced person your job, what would be the hardest part to teach?',
      zh: '如果让你教一个聪明但完全没经验的人做你的工作，你觉得最难教的是什么？',
    },
    options: [
      { en: 'Almost everything is hard to teach — just "watch and learn over time"', zh: '几乎所有东西都难教，只能"跟着干慢慢悟"' },
      { en: 'Core skills can\'t be explained — only learned through extensive practice', zh: '核心技能说不清楚，只能靠大量实践体会' },
      { en: 'Some things can be taught, some must be figured out on their own', zh: '有些能教，有些只能靠自己摸索' },
      { en: 'Most can be taught clearly, a few need some practice', zh: '大部分能教明白，少数需要自己练练' },
      { en: 'Everything can be taught — just step by step', zh: '都能教，一步步教就行' },
    ],
  },
  {
    id: 'Q12_full',
    indicator: 'Tacit Knowledge Depth',
    direction: 'forward',
    question: {
      en: 'When making work decisions, what proportion can be explained with logical reasoning rather than "gut feeling"?',
      zh: '你工作中做决策时，多大比例是可以用逻辑推理解释的，而不是靠"直觉"？',
    },
    options: [
      { en: 'Less than 20% — mostly gut feeling', zh: '不到20%，绝大部分靠直觉' },
      { en: 'About 30-40% — gut feeling dominates', zh: '大约30-40%，直觉居多' },
      { en: 'About half and half', zh: '差不多一半一半' },
      { en: 'About 70-80% can be logically explained', zh: '大约70-80%都能说出理由' },
      { en: 'Nearly 100% — every decision has a clear basis', zh: '几乎100%，每个决定都有明确依据' },
    ],
  },

  // Facet 1E: Novelty & Change (3 questions)
  {
    id: 'Q13_full',
    indicator: 'Novelty & Change',
    direction: 'reverse',
    question: {
      en: 'How often does your work encounter completely new situations that no one has seen before?',
      zh: '你的工作多久会遇到一次"谁都没见过"的全新情况？',
    },
    options: [
      { en: 'Constantly — every project is uncharted territory', zh: '一直在变，每个项目都是未知领域' },
      { en: 'Often — the landscape shifts every few months', zh: '经常变，每隔几个月情况就不一样了' },
      { en: 'Sometimes — new challenges come up regularly', zh: '时不时有，新挑战定期出现' },
      { en: 'Rarely — occasional new cases, mostly routine', zh: '很少，偶尔有新情况但大部分是常规' },
      { en: 'Almost never — same patterns day after day', zh: '几乎不会，天天都是一样的套路' },
    ],
  },
  {
    id: 'Q14_full',
    indicator: 'Novelty & Change',
    direction: 'forward',
    question: {
      en: 'How many of your work tasks have you "done something similar before"?',
      zh: '你的工作任务有多少是"之前做过类似的"？',
    },
    options: [
      { en: 'Almost every time is brand new — no reference', zh: '几乎每次都是全新的，找不到参考' },
      { en: 'Mostly new, occasionally can apply past experience', zh: '大部分是新的，偶尔能套用以前的经验' },
      { en: 'About half are familiar patterns', zh: '大概一半是熟悉的模式' },
      { en: 'Most have similar cases to reference', zh: '大部分都有可参考的类似案例' },
      { en: 'Almost all are repetitive standard tasks', zh: '几乎全是重复的标准任务' },
    ],
  },
  {
    id: 'Q15_full',
    indicator: 'Novelty & Change',
    direction: 'forward',
    question: {
      en: 'Has the way work is done in your industry changed much in the past 5 years?',
      zh: '你所在的行业，过去5年的工作方式变化大吗？',
    },
    options: [
      { en: 'Completely transformed — methods from 5 years ago are obsolete', zh: '变化翻天覆地，五年前的方法完全不能用了' },
      { en: 'Big changes — core skills need constant updating', zh: '变化很大，核心技能需要不断更新' },
      { en: 'Some changes, but fundamentals remain the same', zh: '有一些变化，但基本功还是一样' },
      { en: 'Not much change — most methods are the same', zh: '变化不大，大部分方法还是老一套' },
      { en: 'Almost no change — same as 10 years ago', zh: '几乎没变，十年前怎么干现在还怎么干' },
    ],
  },
];

// =============================================================================
// Dimension 2: Evaluation Objectivity (O/S) — 15 questions
// =============================================================================

export const DIMENSION_EVALUATION_FULL: QuizQuestion[] = [
  // Facet 2A: Measurability (3 questions)
  {
    id: 'Q16_full',
    indicator: 'Measurability',
    direction: 'forward',
    question: {
      en: 'Can your work quality be scored with clear numerical metrics?',
      zh: '你的工作做得好不好，能用明确的数字指标来打分吗？',
    },
    options: [
      { en: 'Impossible to score — quality is purely subjective', zh: '完全没法打分，好坏全凭感觉' },
      { en: 'Mostly subjective, few things are quantifiable', zh: '大部分靠主观评价，少数能量化' },
      { en: 'Half quantifiable, half subjective', zh: '一半量化打分，一半靠感觉' },
      { en: 'Mostly clear metrics, few subjective ones', zh: '大部分有清晰指标，少数靠主观' },
      { en: 'Almost everything has clear KPIs or benchmarks', zh: '几乎都有明确KPI或达标线' },
    ],
  },
  {
    id: 'Q17_full',
    indicator: 'Measurability',
    direction: 'forward',
    question: {
      en: 'After completing a task, how quickly can you tell if it was done well?',
      zh: '你做完一件事后，多快能知道做得好不好？',
    },
    options: [
      { en: 'May not know for years — impact unfolds slowly', zh: '可能几年都不知道，影响慢慢才显现' },
      { en: 'Can only be evaluated months later', zh: '几个月后才能评估效果' },
      { en: 'Feedback visible within days to weeks', zh: '几天到几周就能看到反馈' },
      { en: 'Know the result within hours', zh: '几小时内就知道结果' },
      { en: 'Instant feedback — right or wrong is immediately clear', zh: '即时反馈，对错一目了然' },
    ],
  },
  {
    id: 'Q18_full',
    indicator: 'Measurability',
    direction: 'reverse',
    question: {
      en: 'Can your work output be checked for quality using automated tools?',
      zh: '你的工作成果能不能用自动化工具来检查质量？',
    },
    options: [
      { en: 'Almost entirely verifiable by automated programs', zh: '几乎可以完全用程序自动验证' },
      { en: 'Most can be checked with automated testing or QC', zh: '大部分可以用自动化测试或质检' },
      { en: 'Some can be checked with tool assistance', zh: '部分可以用工具辅助检查' },
      { en: 'Very few aspects can be auto-checked', zh: '极少数环节可以自动检查' },
      { en: 'Not at all — must be judged by humans', zh: '完全不能，必须靠人来判断' },
    ],
  },

  // Facet 2B: Result Convergence (3 questions)
  {
    id: 'Q19_full',
    indicator: 'Result Convergence',
    direction: 'forward',
    question: {
      en: 'For the same task, how much do results vary between different people?',
      zh: '同一个任务，换不同的人来做，结果差异大吗？',
    },
    options: [
      { en: 'Everyone produces completely different results', zh: '每个人做出来都截然不同' },
      { en: 'Similar direction but big differences in detail', zh: '大体方向类似但细节差异很大' },
      { en: 'Core is similar, with room for personal touch', zh: '核心差不多，有不少个人发挥空间' },
      { en: 'Most results are basically the same, minor differences', zh: '大部分结果基本一样，只有小差异' },
      { en: 'Regardless of who does it, results are nearly identical', zh: '不管谁做，结果几乎一模一样' },
    ],
  },
  {
    id: 'Q20_full',
    indicator: 'Result Convergence',
    direction: 'forward',
    question: {
      en: 'Does your work have a "right answer" or "optimal solution"?',
      zh: '你的工作有没有"标准答案"或"最优解"？',
    },
    options: [
      { en: 'Never a right answer — only different choices', zh: '从来没有标准答案，只有不同的选择' },
      { en: 'Rarely clear right or wrong', zh: '很少有明确的对错' },
      { en: 'Sometimes there\'s an optimal solution, sometimes not', zh: '有时有最优解，有时没有' },
      { en: 'Most tasks have a clearly correct approach', zh: '大部分任务有明确的正确做法' },
      { en: 'Almost every question has one correct answer', zh: '几乎每个问题都有唯一正确答案' },
    ],
  },
  {
    id: 'Q21_full',
    indicator: 'Result Convergence',
    direction: 'reverse',
    question: {
      en: 'If three senior peers scored the same work output, how much would their scores differ?',
      zh: '对于同样的工作成果，如果请三位资深同行打分，分数会差多少？',
    },
    options: [
      { en: 'Scores would be very consistent, almost no difference', zh: '分数会非常一致，几乎没差别' },
      { en: 'Very small difference, largely consistent', zh: '差别很小，基本一致' },
      { en: 'Some disagreement, but general direction is the same', zh: '会有一些分歧，但大方向一致' },
      { en: 'Often noticeably different scores', zh: '经常会有明显不同的打分' },
      { en: 'Completely different scores wouldn\'t be surprising', zh: '打分完全不同也不意外' },
    ],
  },

  // Facet 2C: Goal Clarity (3 questions)
  {
    id: 'Q22_full',
    indicator: 'Goal Clarity',
    direction: 'reverse',
    question: {
      en: 'When you receive a task, does the requester know clearly what they want?',
      zh: '你接到任务时，需求方清楚自己想要什么吗？',
    },
    options: [
      { en: 'Requirements are always very clear — just execute', zh: '需求总是非常明确，按要求执行就行' },
      { en: 'Mostly clear, occasionally need to confirm details', zh: '大多数时候清晰，偶尔确认细节' },
      { en: 'Half clear, half need to figure out yourself', zh: '一半说得清，一半得自己揣摩' },
      { en: 'Often "just figure it out" — need to define requirements myself', zh: '经常"你看着办"，得自己定义需求' },
      { en: 'Almost always "help me think about it"', zh: '几乎总是"你帮我想想吧"' },
    ],
  },
  {
    id: 'Q23_full',
    indicator: 'Goal Clarity',
    direction: 'forward',
    question: {
      en: 'Before starting a task, can you list out a "definition of done" checklist in advance?',
      zh: '你开始一个任务之前，能不能提前列出"做到什么算完成"的清单？',
    },
    options: [
      { en: 'Not at all — you figure it out as you go', zh: '完全不能，做到哪步算哪步' },
      { en: 'Can only list a general direction, specific criteria are unclear', zh: '只能列个大方向，具体完成标准说不清' },
      { en: 'Can list some clear conditions, others depend on context', zh: '能列出部分明确条件，部分看情况' },
      { en: 'Most completion criteria can be defined in advance', zh: '大部分完成标准都能提前定义' },
      { en: 'Can create a very detailed acceptance checklist', zh: '可以列出非常详细的验收清单' },
    ],
  },
  {
    id: 'Q24_full',
    indicator: 'Goal Clarity',
    direction: 'forward',
    question: {
      en: 'Is your work goal more like "solve this math problem" or more like "write a good essay"?',
      zh: '你的工作目标，是更像"把这道数学题解出来"还是更像"写一篇好文章"？',
    },
    options: [
      { en: 'Completely like writing an essay — standards vary by person', zh: '完全像写好文章——标准因人而异' },
      { en: 'More like an essay — some basic requirements but quality is subjective', zh: '更像写文章，有些基本要求但好坏很主观' },
      { en: 'Both — some tasks have right answers, some don\'t', zh: '两者都有，有些任务有标准答案有些没有' },
      { en: 'More like problem-solving — most have clear right or wrong', zh: '更像解题，大部分有明确的对错' },
      { en: 'Completely like math — either right or wrong', zh: '完全像解数学题——要么对要么错' },
    ],
  },

  // Facet 2D: Taste Dependence (3 questions)
  {
    id: 'Q25_full',
    indicator: 'Taste Dependence',
    direction: 'reverse',
    question: {
      en: 'How much does your work depend on personal aesthetics, taste, or intuitive judgment?',
      zh: '你的工作有多依赖个人审美、品味或直觉判断？',
    },
    options: [
      { en: 'Not at all — just execute standard operations', zh: '完全不需要，执行标准操作就行' },
      { en: 'Occasionally need a bit of aesthetic judgment', zh: '偶尔需要一点审美判断' },
      { en: 'Half by standards, half by taste and feel', zh: '一半靠规范标准，一半靠品味感觉' },
      { en: 'Heavily depends on aesthetics and insight', zh: '很依赖审美和洞察力' },
      { en: 'Aesthetics and taste ARE my core competitive advantage', zh: '审美和品味就是我的核心竞争力' },
    ],
  },
  {
    id: 'Q26_full',
    indicator: 'Taste Dependence',
    direction: 'reverse',
    question: {
      en: 'In your work, how big is the gap between "good enough" and "just right"?',
      zh: '在你的工作中，"差不多"和"恰到好处"之间的差距有多大？',
    },
    options: [
      { en: 'No difference — roughly right is fine', zh: '没区别，大致对了就行' },
      { en: 'Very small — close enough works most of the time', zh: '区别很小，大部分情况差不多就够' },
      { en: 'Some occasions need precision, some don\'t', zh: '有些场合需要精到，有些差不多就行' },
      { en: 'Often need to nail subtle differences in detail', zh: '经常需要精确把握微妙的细节差别' },
      { en: 'A tiny difference changes everything — must be exactly right', zh: '差一点就是天壤之别，必须恰到好处' },
    ],
  },
  {
    id: 'Q27_full',
    indicator: 'Taste Dependence',
    direction: 'forward',
    question: {
      en: 'How much of "doing well" at your work is something everyone can agree on?',
      zh: '你工作中的"做得好"，有多少是大家都能达成共识的？',
    },
    options: [
      { en: 'Quality depends entirely on who\'s judging — opinions always differ', zh: '好坏完全看谁在评判，意见总是不一样' },
      { en: 'Most of the time, different people have different views', zh: '大部分时候各人有各人的看法' },
      { en: 'Basic agreement, but significant disagreement on details', zh: '基本面有共识，细节上分歧较大' },
      { en: 'Consensus on most aspects, disagreement on a few', zh: '大部分方面都有共识，少数有分歧' },
      { en: 'Whether it\'s good or not, everyone agrees', zh: '做得好不好，所有人都看法一致' },
    ],
  },

  // Facet 2E: Cross-domain Synthesis (3 questions)
  {
    id: 'Q28_full',
    indicator: 'Cross-domain Synthesis',
    direction: 'reverse',
    question: {
      en: 'How many different fields of knowledge do you need to combine to make a decision?',
      zh: '你做一个决策需要综合多少个不同领域的知识？',
    },
    options: [
      { en: 'Just one — deep expertise in a single area', zh: '一个就够，只需要单一领域的深入知识' },
      { en: 'Mainly one field, occasionally another', zh: '主要一个领域，偶尔涉及另一个' },
      { en: 'Need to combine 2-3 different fields regularly', zh: '经常需要结合2-3个不同领域' },
      { en: 'Routinely synthesize 4+ fields', zh: '日常要综合4个以上领域' },
      { en: 'My entire job IS connecting dots across unrelated domains', zh: '我的工作本质就是在不相关的领域之间找连接' },
    ],
  },
  {
    id: 'Q29_full',
    indicator: 'Cross-domain Synthesis',
    direction: 'forward',
    question: {
      en: 'If your work output were given to an AI system to check, how many issues could it find?',
      zh: '你的工作成果交给一个AI系统来检查，它能发现多少问题？',
    },
    options: [
      { en: 'Almost nothing — the issue is whether it "feels right"', zh: '几乎什么都发现不了，问题在于"感觉对不对"' },
      { en: 'Can find surface errors, but can\'t judge core quality', zh: '能查出一些表面错误，但核心质量判断不了' },
      { en: 'Can find about half the issues', zh: '能查出大概一半的问题' },
      { en: 'Most issues can be automatically detected', zh: '大部分问题都能自动检测到' },
      { en: 'Almost all issues can be automatically found', zh: '几乎所有问题都可以被自动发现' },
    ],
  },
  {
    id: 'Q30_full',
    indicator: 'Cross-domain Synthesis',
    direction: 'forward',
    question: {
      en: 'Does the definition of "what counts as good work" change frequently in your job?',
      zh: '"什么算做得好"在你的工作中变化频繁吗？',
    },
    options: [
      { en: 'Different standard every time — depends on context and people', zh: '每次标准都不同，完全看当时的情况和人' },
      { en: 'Standards change often, must constantly adjust', zh: '标准经常变化，要随时调整' },
      { en: 'There\'s a basic framework, but specific criteria shift', zh: '有一个基本框架，但具体标准会微调' },
      { en: 'Standards are mostly fixed, occasional small adjustments', zh: '标准基本固定，偶尔有小调整' },
      { en: 'Standards never change — universally applicable', zh: '标准永远不变，放之四海皆准' },
    ],
  },
];

// =============================================================================
// Dimension 3: Risk Tolerance (F/R) — 15 questions (corrected version)
// =============================================================================

export const DIMENSION_RISK_FULL: QuizQuestion[] = [
  // Facet 3A: Error Severity (3 questions)
  {
    id: 'Q31_full',
    indicator: 'Error Severity',
    direction: 'reverse',
    question: {
      en: 'If your work has an error, what\'s the worst that could happen?',
      zh: '你的工作如果出了错，最严重会怎样？',
    },
    options: [
      { en: 'No big deal — just redo it', zh: '没什么大不了，重新来就好' },
      { en: 'Wastes some time/money, limited impact', zh: '浪费一些时间金钱，影响有限' },
      { en: 'Noticeable financial loss or reputation damage', zh: '会造成明显经济损失或名誉受损' },
      { en: 'Could cause serious property loss or health risks', zh: '可能导致严重财产损失或健康风险' },
      { en: 'Could directly endanger lives or cause major safety incidents', zh: '可能直接危及人命或重大安全事故' },
    ],
  },
  {
    id: 'Q32_full',
    indicator: 'Error Severity',
    direction: 'forward',
    question: {
      en: 'How many people could be affected by a single wrong decision you make?',
      zh: '你的一个错误决定最多会影响多少人？',
    },
    options: [
      { en: 'Could affect thousands or more', zh: '可能影响成千上万人甚至更多' },
      { en: 'Could impact the company or hundreds of clients', zh: '可能波及整个公司或几百个客户' },
      { en: 'Affects the team or dozens of related people', zh: '影响团队或几十个相关的人' },
      { en: 'At most affects a few colleagues or clients', zh: '最多影响几个同事或客户' },
      { en: 'Only affects my own work progress', zh: '只影响我自己的工作进度' },
    ],
  },
  {
    id: 'Q33_full',
    indicator: 'Error Severity',
    direction: 'forward',
    question: {
      en: 'In your work, how big is the practical difference between "80%" and "100%"?',
      zh: '你的工作中，"80分"和"100分"的实际差别有多大？',
    },
    options: [
      { en: 'Enormous — 80% could mean a major incident', zh: '差距极大，80分可能意味着重大事故' },
      { en: 'Significant — striving for perfection matters greatly', zh: '差距明显，精益求精非常重要' },
      { en: 'Depends — some situations it matters, some it doesn\'t', zh: '有些场合差距大，有些差不多就行' },
      { en: 'Not much — 80% is basically good enough', zh: '差距不大，80分基本够用了' },
      { en: 'No difference at all — pass the bar and you\'re done', zh: '完全没区别，达标就行' },
    ],
  },

  // Facet 3B: Reversibility (3 questions)
  {
    id: 'Q34_full',
    indicator: 'Reversibility',
    direction: 'reverse',
    question: {
      en: 'If your work has an error, is there a chance to fix it?',
      zh: '你的工作出了错，还有机会补救吗？',
    },
    options: [
      { en: 'Can undo and revise anytime, no pressure', zh: '随时可以撤回修改，没有压力' },
      { en: 'Most errors can be corrected afterward', zh: '大部分错误都能事后弥补' },
      { en: 'Some can be fixed, some can\'t', zh: '有些能补救，有些不能' },
      { en: 'Most errors are hard to reverse once made', zh: '大部分错误犯了就很难挽回' },
      { en: 'Once wrong, almost impossible to fix — no taking it back', zh: '一旦出错几乎无法补救，覆水难收' },
    ],
  },
  {
    id: 'Q35_full',
    indicator: 'Reversibility',
    direction: 'forward',
    question: {
      en: 'Does your work allow a "try it first, change it if it doesn\'t work" approach?',
      zh: '你的工作允许"先试试看，不行再改"这种方式吗？',
    },
    options: [
      { en: 'Absolutely not — must get it right the first time', zh: '绝对不允许，必须一次做对' },
      { en: 'Rarely — the cost of errors is too high', zh: '很少能试错，出错代价太高' },
      { en: 'Some stages allow trial and error, some don\'t', zh: '有些环节可以试错，有些不行' },
      { en: 'Most of the time, experimentation and rapid iteration are encouraged', zh: '大部分时候鼓励尝试和快速迭代' },
      { en: 'The entire workflow IS constant experimentation and adjustment', zh: '整个工作方式就是不断实验和调整' },
    ],
  },
  {
    id: 'Q36_full',
    indicator: 'Reversibility',
    direction: 'forward',
    question: {
      en: 'If a problem is found tomorrow in today\'s work, how hard is it to fix?',
      zh: '如果你今天做的工作明天发现有问题，补救的难度有多大？',
    },
    options: [
      { en: 'Nearly impossible — damage done and irreversible', zh: '几乎不可能，损害已经造成且无法撤回' },
      { en: 'Very difficult, requiring enormous cost to repair', zh: '很困难，需要付出巨大代价去修复' },
      { en: 'Some difficulty, but fixable with effort', zh: '有一定难度，但可以想办法补救' },
      { en: 'Not too hard — just make some corrections', zh: '不太难，改改就好' },
      { en: 'Zero pressure — just delete and redo', zh: '毫无压力，删了重做就是了' },
    ],
  },

  // Facet 3C: Regulation (3 questions)
  {
    id: 'Q37_full',
    indicator: 'Regulation',
    direction: 'reverse',
    question: {
      en: 'How strict are the regulatory and qualification requirements for your work?',
      zh: '你的工作受行业监管和资质要求的约束严格吗？',
    },
    options: [
      { en: 'No barriers to entry — anyone can do it', zh: '完全没有准入门槛，谁都可以做' },
      { en: 'Some basic requirements but low bar', zh: '有一些基本要求但门槛很低' },
      { en: 'Requires certain certifications or training', zh: '需要一定的认证或培训资质' },
      { en: 'Strict industry oversight and licensing', zh: '有严格的行业监管和执照要求' },
      { en: 'Must be licensed, violations lead to legal consequences', zh: '必须持证上岗，违规会被追究法律责任' },
    ],
  },
  {
    id: 'Q38_full',
    indicator: 'Regulation',
    direction: 'forward',
    question: {
      en: 'If your work were entirely handed to AI, how much obstacle would current laws create?',
      zh: '如果你的工作全部交给AI来做，在当前的法律法规下，会遇到多大障碍？',
    },
    options: [
      { en: 'Explicitly prohibited by law — impossible', zh: '法律明确禁止，绝无可能' },
      { en: 'Significant legal grey areas and restrictions', zh: '法规上有很大的灰色地带和限制' },
      { en: 'Some steps face legal restrictions, some don\'t', zh: '有些环节有法律限制，有些没有' },
      { en: 'Essentially no regulatory obstacles', zh: '法规上基本没有障碍' },
      { en: 'No restrictions — policies even encourage AI adoption', zh: '完全没限制，甚至政策在鼓励AI应用' },
    ],
  },
  {
    id: 'Q39_full',
    indicator: 'Regulation',
    direction: 'forward',
    question: {
      en: 'In your industry, how likely is it that regulators would investigate after an incident?',
      zh: '你所在的行业，出了事故后，监管机构介入调查的可能性有多大？',
    },
    options: [
      { en: 'Almost certain — dedicated regulators are watching', zh: '几乎一定会被调查，有专门的监管机构盯着' },
      { en: 'Very likely — strict incident reporting system', zh: '很有可能，行业有严格的事故报告制度' },
      { en: 'Depends on severity — serious ones get investigated', zh: '看严重程度，严重的会被查' },
      { en: 'Unlikely, unless extremely serious', zh: '不太可能，除非特别严重' },
      { en: 'Almost impossible — my industry has little oversight', zh: '几乎不可能，我的行业没有什么监管' },
    ],
  },

  // Facet 3D: Accountability (3 questions)
  {
    id: 'Q40_full',
    indicator: 'Accountability',
    direction: 'reverse',
    question: {
      en: 'If something goes wrong with your work, how much personal responsibility do you bear?',
      zh: '如果你的工作出了问题，你个人要承担多大责任？',
    },
    options: [
      { en: 'Basically no personal liability — team/company covers it', zh: '基本不需要个人承担，团队或公司兜底' },
      { en: 'Might get criticized but no legal/financial liability', zh: '可能挨批评但不涉及法律经济责任' },
      { en: 'Could face some financial compensation or penalty', zh: '可能面临一定的经济赔偿或处分' },
      { en: 'Could face significant lawsuits or disciplinary action', zh: '可能面临较大的法律诉讼或处分' },
      { en: 'Could face criminal charges or enormous compensation', zh: '出了事可能面临刑事责任或巨额赔偿' },
    ],
  },
  {
    id: 'Q41_full',
    indicator: 'Accountability',
    direction: 'forward',
    question: {
      en: 'How often does your work involve moral judgments or ethical trade-offs?',
      zh: '你的工作中多久会遇到需要做"道德判断"或"伦理权衡"的情况？',
    },
    options: [
      { en: 'Face ethical dilemmas almost every day', zh: '几乎每天都面对伦理抉择' },
      { en: 'Frequently need to weigh ethical factors', zh: '经常需要权衡伦理因素' },
      { en: 'Occasionally encounter them', zh: '偶尔会遇到' },
      { en: 'Very rarely — mostly routine decisions', zh: '极少遇到，绝大部分是常规决策' },
      { en: 'Never — purely technical operations', zh: '从来不需要，纯粹的技术操作' },
    ],
  },
  // Q42 corrected version: changed to Reverse
  {
    id: 'Q42_full',
    indicator: 'Accountability',
    direction: 'reverse',
    question: {
      en: 'How detailed must the records and approval documentation of your work be?',
      zh: '你的工作过程需要留下多详细的记录和审批文档？',
    },
    options: [
      { en: 'No records needed — just get it done', zh: '不需要任何记录，做完就行' },
      { en: 'Simple completion records suffice', zh: '简单的完成记录就行' },
      { en: 'Requires some process documentation', zh: '需要一定的过程文档' },
      { en: 'Requires detailed operation records and approvals', zh: '需要详细的操作记录和审批流程' },
      { en: 'Every step must have complete traceable records', zh: '每一步都必须有完整的可追溯记录' },
    ],
  },

  // Facet 3E: Public Trust (3 questions)
  {
    id: 'Q43_full',
    indicator: 'Public Trust',
    direction: 'reverse',
    question: {
      en: 'Can the public accept AI making decisions in your role?',
      zh: '公众能接受让AI在你的岗位上做决策吗？',
    },
    options: [
      { en: 'Totally fine — nobody cares who does it', zh: '完全可以，没人在乎是谁做的' },
      { en: 'Most people wouldn\'t mind', zh: '大部分人不介意' },
      { en: 'Depends — some accept it, some don\'t', zh: '看情况，有人能接受有人不舒服' },
      { en: 'Most people would feel uneasy', zh: '大部分人会觉得不放心' },
      { en: 'Absolutely unacceptable — public would strongly oppose', zh: '完全不能接受，公众会强烈反对' },
    ],
  },
  {
    id: 'Q44_full',
    indicator: 'Public Trust',
    direction: 'forward',
    question: {
      en: 'How common is AI-assisted work already in your industry?',
      zh: '在你的行业里，AI辅助工作已经有多普遍了？',
    },
    options: [
      { en: 'Not at all — people are watching or even resisting', zh: '完全没有，大家还在观望甚至抵制' },
      { en: 'Just starting — a few pioneers are trying', zh: '刚起步，少数先行者在尝试' },
      { en: 'Some stages already use AI assistance', zh: '有些环节已经用上了AI辅助' },
      { en: 'Fairly common — most people are using it', zh: '已经比较普遍，大部分人都在用' },
      { en: 'Very common — not using AI means falling behind', zh: '非常普遍，不用AI反而落伍了' },
    ],
  },
  {
    id: 'Q45_full',
    indicator: 'Public Trust',
    direction: 'forward',
    question: {
      en: 'If a colleague secretly used AI to complete a task, what would your reaction be upon finding out?',
      zh: '在你的工作中，如果同事悄悄用AI帮忙完成了一项任务，你发现后什么反应？',
    },
    options: [
      { en: 'Very serious — could involve violations or illegality', zh: '非常严重，可能涉及违规甚至违法' },
      { en: 'Would feel uneasy — should have been disclosed', zh: '会很不安，这种事应该提前说清楚' },
      { en: 'A bit surprised, but OK if quality is fine', zh: '有点意外，但如果质量没问题也行' },
      { en: 'Doesn\'t matter — good results are what count', zh: '无所谓，结果好就行' },
      { en: 'Totally normal — I do it myself all the time', zh: '觉得很正常，自己也经常这么做' },
    ],
  },
];

// =============================================================================
// Dimension 4: Human Presence (P/H) — 15 questions
// =============================================================================

export const DIMENSION_HUMAN_FULL: QuizQuestion[] = [
  // Facet 4A: Relationship Dependency (3 questions)
  {
    id: 'Q46_full',
    indicator: 'Relationship Dependency',
    direction: 'reverse',
    question: {
      en: 'Why do clients or partners choose you (or your team)?',
      zh: '客户或合作方选择你（或你的团队），主要是因为什么？',
    },
    options: [
      { en: 'Purely price and efficiency — cheapest wins', zh: '纯粹看价格和效率，谁便宜找谁' },
      { en: 'Mainly capabilities — no preference for who', zh: '主要看能力资质，对谁没有偏好' },
      { en: 'Capabilities matter, but chemistry and trust too', zh: '能力重要，也考虑合作默契和信任' },
      { en: 'Many clients stay because of the long-term relationship', zh: '很多客户因为长期关系才继续合作' },
      { en: 'Clients only work with ME — they leave if I leave', zh: '客户只认我这个人，换人就不合作了' },
    ],
  },
  // Q47 corrected version: changed to Forward
  {
    id: 'Q47_full',
    indicator: 'Relationship Dependency',
    direction: 'forward',
    question: {
      en: 'How long does it typically take to build the trust relationships your work requires?',
      zh: '建立起工作所需的信任关系，通常要花多长时间？',
    },
    options: [
      { en: 'Takes years of sustained relationship for real trust', zh: '需要多年的持续关系才能获得真正信任' },
      { en: 'Takes 1-2 years of deep collaboration', zh: '需要一两年的深度合作' },
      { en: 'Takes months of collaboration to build', zh: '需要几个月的合作才能建立' },
      { en: 'A few interactions build basic trust', zh: '几次接触就能建立基本信任' },
      { en: 'No trust needed — one-time transactions are fine', zh: '不需要信任关系，一次性交易就行' },
    ],
  },
  {
    id: 'Q48_full',
    indicator: 'Relationship Dependency',
    direction: 'forward',
    question: {
      en: 'How important are the personal connections you\'ve built for your work?',
      zh: '你积累的人脉关系对工作有多重要？',
    },
    options: [
      { en: 'My network IS my greatest value', zh: '我的人脉网络就是我最大的价值' },
      { en: 'Connections are a very important asset', zh: '人脉是工作中非常重要的资产' },
      { en: 'Connections are a useful supporting resource', zh: '人脉是有用的辅助资源' },
      { en: 'Somewhat helpful but not essential', zh: '有一些帮助但不是必须的' },
      { en: 'Not important at all — no connections needed', zh: '完全不重要，不需要任何人脉' },
    ],
  },

  // Facet 4B: Personal Brand (3 questions)
  {
    id: 'Q49_full',
    indicator: 'Personal Brand',
    direction: 'reverse',
    question: {
      en: 'How many clients/audiences come specifically because of YOU as a person?',
      zh: '有多少客户/受众是冲着"你这个人"来的？',
    },
    options: [
      { en: 'None — they only care if I can do the job', zh: '完全没有，只看我能不能干好活' },
      { en: 'Very few know me specifically — mostly capability-based', zh: '极少数人认我，绝大部分看能力' },
      { en: 'Some come for me, more for the capability', zh: '有一部分冲我来的，更多还是看能力' },
      { en: 'Many come for me — I have some recognition', zh: '不少人冲我来的，我有一定知名度' },
      { en: 'I AM the brand — people come specifically for me', zh: '我本身就是品牌，大家就是冲我来的' },
    ],
  },
  {
    id: 'Q50_full',
    indicator: 'Personal Brand',
    direction: 'forward',
    question: {
      en: 'If you suddenly left tomorrow, how long would it take to find a replacement at your level?',
      zh: '如果你明天突然离职，公司需要多久才能找到替代者达到你的工作水平？',
    },
    options: [
      { en: 'Very hard — maybe 6+ months, or never', zh: '非常难找，可能半年以上，甚至找不到' },
      { en: 'Quite hard — needs a few months', zh: '比较难，需要几个月' },
      { en: '1-2 months to find the right person', zh: '一两个月能找到合适的人' },
      { en: '2-3 weeks to hire someone', zh: '两三周就能招到' },
      { en: 'Can find a replacement immediately', zh: '马上就能找到替代者' },
    ],
  },
  {
    id: 'Q51_full',
    indicator: 'Personal Brand',
    direction: 'reverse',
    question: {
      en: 'How much of your output has a "only you would do it this way" personal style?',
      zh: '你的产出中有多少"只有你才会这样做"的个人风格？',
    },
    options: [
      { en: 'No personal style — anyone would produce the same', zh: '没有个人风格，谁做都一样' },
      { en: 'Slight personal habits but not noticeable', zh: '有一点个人习惯但不明显' },
      { en: 'Some personal touches — people who know me can tell', zh: '有一些个人特色，熟悉的人能认出来' },
      { en: 'Clearly identifiable personal style', zh: '有明显的个人风格和标识性' },
      { en: 'My style IS my brand — it wouldn\'t be the same without me', zh: '我的风格就是我的招牌，换人做就变味了' },
    ],
  },

  // Facet 4C: Physical Presence (3 questions)
  {
    id: 'Q52_full',
    indicator: 'Physical Presence',
    direction: 'reverse',
    question: {
      en: 'Must your work be done with you physically present?',
      zh: '你的工作必须本人亲自到场完成吗？',
    },
    options: [
      { en: 'Not at all — can be done remotely from anywhere', zh: '完全不用，在哪都能远程完成' },
      { en: 'Occasionally need to be there, mostly remote', zh: '偶尔需要到场，大部分可远程' },
      { en: 'About half on-site, half remote', zh: '大概一半到场，一半远程' },
      { en: 'Must be on-site most of the time', zh: '大部分时候必须到场' },
      { en: 'Must be physically present, doing the work in person', zh: '必须本人在现场，用身体完成工作' },
    ],
  },
  {
    id: 'Q53_full',
    indicator: 'Physical Presence',
    direction: 'forward',
    question: {
      en: 'Can your work output be fully delivered remotely over the internet?',
      zh: '你的工作成果能不能完全通过网络远程交付？',
    },
    options: [
      { en: 'Not at all — must be face-to-face on-site', zh: '完全不能，必须在现场面对面' },
      { en: 'Mostly not — core work requires presence', zh: '大部分不能，核心工作需要到场' },
      { en: 'Half can be remote, half requires on-site', zh: '一半可以远程，一半必须到场' },
      { en: 'Mostly remote, a few require meeting in person', zh: '大部分可以远程，少数需要见面' },
      { en: '100% deliverable online', zh: '100%可以在线交付' },
    ],
  },
  {
    id: 'Q54_full',
    indicator: 'Physical Presence',
    direction: 'forward',
    question: {
      en: 'If your work went fully online (no face-to-face), how much would effectiveness decrease?',
      zh: '如果把你的工作变成纯线上进行（不再面对面），效果会打几折？',
    },
    options: [
      { en: 'Impossible — must be done on-site', zh: '完全无法进行，必须在现场' },
      { en: '50-60% effectiveness — seriously impaired', zh: '效果打五六折，严重受损' },
      { en: '70-80% effectiveness — noticeably affected', zh: '效果打七八折，有明显影响' },
      { en: '90% effectiveness — minimal impact', zh: '效果打九折，影响不大' },
      { en: 'No difference at all — might even be more efficient', zh: '完全没区别，甚至可能更高效' },
    ],
  },

  // Facet 4D: Emotional Labor (3 questions)
  {
    id: 'Q55_full',
    indicator: 'Emotional Labor',
    direction: 'reverse',
    question: {
      en: 'How much of your work involves reading people, managing emotions, or persuading others?',
      zh: '你的工作有多少需要察言观色、安抚情绪或说服他人的成分？',
    },
    options: [
      { en: 'None at all — I work with data/machines', zh: '完全没有，我对着数据/机器干活' },
      { en: 'Occasionally interact with people, mostly work alone', zh: '偶尔跟人打交道，大部分独立工作' },
      { en: 'About half people-facing, half independent', zh: '差不多一半对人、一半独立' },
      { en: 'Most time spent dealing with people and their emotions', zh: '大部分时间在跟人打交道、处理情绪' },
      { en: 'My entire value IS understanding and connecting people', zh: '我的全部价值就在于理解人、连接人' },
    ],
  },
  // Q56 corrected version: changed to Forward
  {
    id: 'Q56_full',
    indicator: 'Emotional Labor',
    direction: 'forward',
    question: {
      en: 'How much of your work involves leading teams, boosting morale, or motivating others?',
      zh: '你的工作中有多少需要"带团队/鼓舞士气/激励他人"的成分？',
    },
    options: [
      { en: 'My work IS essentially leading and motivating others', zh: '我的工作本质就是领导和激励他人' },
      { en: 'Leadership is one of my core skills', zh: '领导力是核心技能之一' },
      { en: 'Requires some team management and coordination', zh: '需要一定的团队管理和协调能力' },
      { en: 'Occasionally need to mentor newcomers', zh: '偶尔需要带一下新人' },
      { en: 'Not at all — I just do my own work', zh: '完全不需要，我只做自己的事' },
    ],
  },
  {
    id: 'Q57_full',
    indicator: 'Emotional Labor',
    direction: 'forward',
    question: {
      en: 'How much does your work depend on negotiation and persuasion skills?',
      zh: '你的工作有多依赖谈判和说服技巧？',
    },
    options: [
      { en: 'Negotiation and persuasion are my core work', zh: '谈判和说服是我的核心工作' },
      { en: 'Negotiation is a major part of the work', zh: '谈判是工作的重要组成部分' },
      { en: 'Regularly need to negotiate with various parties', zh: '定期需要跟各方协商' },
      { en: 'Occasionally need simple communication for agreement', zh: '偶尔需要简单沟通达成一致' },
      { en: 'No negotiation or persuasion needed at all', zh: '完全不需要谈判或说服任何人' },
    ],
  },

  // Facet 4E: Human Premium (3 questions)
  {
    id: 'Q58_full',
    indicator: 'Human Premium',
    direction: 'reverse',
    question: {
      en: 'If clients discovered your work was actually done by AI, what would happen?',
      zh: '如果客户发现你的工作其实是AI完成的，会怎样？',
    },
    options: [
      { en: 'Wouldn\'t care — might even think it\'s more efficient', zh: '无所谓，甚至觉得更高效' },
      { en: 'A bit surprised but basically acceptable', zh: '有点意外但基本能接受' },
      { en: 'Would feel it\'s worth less, but still acceptable', zh: '觉得打了折扣，但还算认可' },
      { en: 'Clearly feel the value decreased — dissatisfied', zh: '明显觉得价值降低、不满意' },
      { en: 'Absolutely unacceptable — would feel deceived', zh: '完全无法接受，觉得被欺骗了' },
    ],
  },
  {
    id: 'Q59_full',
    indicator: 'Human Premium',
    direction: 'forward',
    question: {
      en: 'If your work output had someone else\'s name on it, would its value change?',
      zh: '你的工作成果如果署上别人的名字，价值会变吗？',
    },
    options: [
      { en: 'Completely changes — my name IS part of the value', zh: '完全变了——我的名字就是价值的一部分' },
      { en: 'Noticeably affected — attribution matters a lot', zh: '会受到明显影响，署名很重要' },
      { en: 'Some impact, but mainly judged by work quality itself', zh: '有一些影响，但主要看作品本身质量' },
      { en: 'Almost no impact — doesn\'t matter whose name it is', zh: '几乎没影响，署谁的名无所谓' },
      { en: 'No impact at all — output is output', zh: '完全不影响，产出就是产出' },
    ],
  },
  {
    id: 'Q60_full',
    indicator: 'Human Premium',
    direction: 'forward',
    question: {
      en: 'How much of your work involves "live improvisational performance"?',
      zh: '你的工作中有多少需要"现场即兴表现"的成分？',
    },
    options: [
      { en: 'My core work IS improvisation and live reaction', zh: '我的工作核心就是即兴表现和现场反应' },
      { en: 'Often need to improvise and adapt on the spot', zh: '经常需要临场发挥和随机应变' },
      { en: 'Some occasions require live spontaneous reactions', zh: '有些场合需要现场随机反应' },
      { en: 'Very rarely need to improvise', zh: '极少需要即兴发挥' },
      { en: 'None — everything is prepared in advance', zh: '完全没有，一切都是提前准备好的' },
    ],
  },
];

// =============================================================================
// Combined exports
// =============================================================================

export const ALL_FULL_QUESTIONS: QuizQuestion[] = [
  ...DIMENSION_LEARNABILITY_FULL,
  ...DIMENSION_EVALUATION_FULL,
  ...DIMENSION_RISK_FULL,
  ...DIMENSION_HUMAN_FULL,
];

export const FULL_QUESTION_COUNT = 60;
