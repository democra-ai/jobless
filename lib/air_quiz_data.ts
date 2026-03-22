/**
 * AIR (AI Replacement Risk) Quiz Data
 *
 * 四维度 × 5题 = 20题核心问卷 + 4题AI现状快照 + 3题附加调研
 * 每维度取极性 → 2⁴ = 16 种职业画像类型
 * 奇数题（5题/维度）避免了偶数题的五五开问题
 */

export type QuizAnswer = 1 | 2 | 3 | 4 | 5;

export interface QuizQuestion {
  id: string;
  indicator: string;
  direction: 'forward' | 'reverse'; // forward: high = AI favorable; reverse: high = AI resistant
  question: { en: string; zh: string };
  options: { en: string; zh: string }[]; // index 0 = score 1, index 4 = score 5
}

export interface QuizDimension {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  favorableLabel: { en: string; zh: string }; // E, O, F, P side
  resistantLabel: { en: string; zh: string }; // T, S, R, H side
  favorableLetter: string; // E, O, F, P
  resistantLetter: string; // T, S, R, H
  questions: QuizQuestion[];
}

export interface AISnapshotQuestion {
  id: string;
  indicator: string;
  direction: 'forward' | 'reverse';
  question: { en: string; zh: string };
  options: { en: string; zh: string }[];
}

export interface SurveyQuestion {
  id: string;
  topic: { en: string; zh: string };
  question: { en: string; zh: string };
  options: { en: string; zh: string }[];
}

export interface ProfileType {
  code: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  typicalJobs: { en: string; zh: string };
  riskTier: 'extreme-high' | 'high' | 'medium' | 'low' | 'extreme-low';
  /** Primary SOC major group code for job inference */
  primarySOC: number;
}

// ─── Dimension 1: Learnability ───────────────────────────────────────────────

const DIMENSION_LEARNABILITY: QuizDimension = {
  id: 'learnability',
  name: { en: 'Learnability', zh: '可学习性' },
  description: {
    en: 'Can AI acquire and learn the knowledge and skills your job requires?',
    zh: 'AI能否获取并学习你的工作所需的知识和技能？',
  },
  favorableLabel: { en: 'Explicit (E)', zh: '显性型 (E)' },
  resistantLabel: { en: 'Tacit (T)', zh: '隐性型 (T)' },
  favorableLetter: 'E',
  resistantLetter: 'T',
  questions: [
    {
      id: 'Q1',
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
      id: 'Q2',
      indicator: 'Openness',
      direction: 'forward',
      question: {
        en: 'How easy is it for AI to access the knowledge and data your work involves?',
        zh: '你工作涉及的知识和资料，AI容易获取吗？',
      },
      options: [
        { en: 'Almost all confidential or only in people\'s heads', zh: '几乎都是内部机密或只存在脑子里，外面查不到' },
        { en: 'Mostly confidential, some basics are public', zh: '大部分对外保密，少量基础知识公开' },
        { en: 'Some available online, some internal', zh: '一部分网上能找到，一部分是内部积累' },
        { en: 'Most knowledge has public resources', zh: '大部分有公开资料可学' },
        { en: 'Tons of tutorials, standards, and cases online', zh: '网上基本都有，教程规范案例一抓一大把' },
      ],
    },
    {
      id: 'Q3',
      indicator: 'Standardization',
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
      id: 'Q4',
      indicator: 'TacitKnowledge',
      direction: 'reverse',
      question: {
        en: 'How much does your work depend on "hard to articulate" experience?',
        zh: '你的工作有多依赖"只可意会不可言传"的经验？',
      },
      options: [
        { en: 'Not at all — a newbie can do it with the manual', zh: '完全不依赖，照说明书新手也能做' },
        { en: 'Some small tricks but learnable quickly', zh: '有一点小技巧但很快能学会' },
        { en: 'Needs some experience, but can be taught', zh: '需要一定经验积累，但也能教会别人' },
        { en: 'Heavily depends on long-accumulated intuition and feel', zh: '非常依赖长期积累的直觉和手感' },
        { en: 'Entirely relies on years of cultivated "feel" — hard to explain', zh: '全靠多年修炼的"感觉"，说都说不清楚' },
      ],
    },
    {
      id: 'Q5',
      indicator: 'ChangeRate',
      direction: 'reverse',
      question: {
        en: 'How often does your work encounter completely new situations that no one has seen before?',
        zh: '你的工作多久会遇到一次"谁都没见过"的全新情况？',
      },
      options: [
        { en: 'Almost never — same patterns day after day', zh: '几乎不会，天天都是一样的套路' },
        { en: 'Rarely — occasional new cases, mostly routine', zh: '很少，偶尔有新情况但大部分是常规' },
        { en: 'Sometimes — new challenges come up regularly', zh: '时不时有，新挑战定期出现' },
        { en: 'Often — the landscape shifts every few months', zh: '经常变，每隔几个月情况就不一样了' },
        { en: 'Constantly — every project is uncharted territory', zh: '一直在变，每个项目都是未知领域' },
      ],
    },
  ],
};

// ─── Dimension 2: Evaluation Objectivity ─────────────────────────────────────

const DIMENSION_EVALUATION: QuizDimension = {
  id: 'evaluation',
  name: { en: 'Evaluation Objectivity', zh: '评判客观性' },
  description: {
    en: 'Does your work have a "right answer"? Can quality be objectively measured?',
    zh: '你的工作成果有没有"标准答案"？做得好不好，说得清吗？',
  },
  favorableLabel: { en: 'Objective (O)', zh: '客观型 (O)' },
  resistantLabel: { en: 'Subjective (S)', zh: '主观型 (S)' },
  favorableLetter: 'O',
  resistantLetter: 'S',
  questions: [
    {
      id: 'Q6',
      indicator: 'Measurability',
      direction: 'forward',
      question: {
        en: 'Can your work quality be measured with clear metrics?',
        zh: '你的工作做得好不好，能用明确的指标来打分吗？',
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
      id: 'Q7',
      indicator: 'Convergence',
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
      id: 'Q8',
      indicator: 'GoalAmbiguity',
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
      id: 'Q9',
      indicator: 'TasteDependence',
      direction: 'reverse',
      question: {
        en: 'How much does your work depend on personal aesthetics, taste, or insight?',
        zh: '你的工作有多依赖个人审美、品味或洞察力？',
      },
      options: [
        { en: 'Not at all — standard operations only', zh: '完全不需要，执行标准操作' },
        { en: 'Occasionally need a bit of aesthetic judgment', zh: '偶尔需要一点审美判断' },
        { en: 'Half standards, half taste', zh: '一半靠规范标准，一半靠品味' },
        { en: 'Heavily depends on aesthetics and insight', zh: '很依赖审美和洞察力' },
        { en: 'Aesthetics and taste ARE my core competitive advantage', zh: '审美和品味就是我的核心竞争力' },
      ],
    },
    {
      id: 'Q10',
      indicator: 'CrossDomain',
      direction: 'reverse',
      question: {
        en: 'How many different fields of knowledge do you need to combine to make a judgment call?',
        zh: '你做一个决策需要综合多少个不同领域的知识？',
      },
      options: [
        { en: 'Just one — deep expertise in a single area', zh: '一个就够，只需要单一领域的深入知识' },
        { en: 'Mainly one, with a bit of another', zh: '主要一个领域，偶尔涉及另一个' },
        { en: 'Need to combine 2-3 different fields regularly', zh: '经常需要结合2-3个不同领域' },
        { en: 'Routinely synthesize 4+ fields — business, tech, people, etc.', zh: '日常要综合4个以上领域——商业、技术、人情等' },
        { en: 'My entire job IS connecting dots across many unrelated domains', zh: '我的工作本质就是在很多不相关的领域之间找连接' },
      ],
    },
  ],
};

// ─── Dimension 3: Risk Tolerance ─────────────────────────────────────────────

const DIMENSION_RISK: QuizDimension = {
  id: 'riskTolerance',
  name: { en: 'Risk Tolerance', zh: '容错性' },
  description: {
    en: 'If AI makes a mistake, can the consequences be tolerated? Can its output be trusted?',
    zh: 'AI做错了，后果能承受吗？产出能被信任吗？',
  },
  favorableLabel: { en: 'Flexible (F)', zh: '弹性型 (F)' },
  resistantLabel: { en: 'Rigid (R)', zh: '刚性型 (R)' },
  favorableLetter: 'F',
  resistantLetter: 'R',
  questions: [
    {
      id: 'Q11',
      indicator: 'ErrorSeverity',
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
      id: 'Q12',
      indicator: 'Reversibility',
      direction: 'reverse',
      question: {
        en: 'If your work has an error, can it still be fixed?',
        zh: '你的工作出了错，还有机会补救吗？',
      },
      options: [
        { en: 'Can always undo/fix, no pressure', zh: '随时可以撤回修改，没压力' },
        { en: 'Most errors can be fixed after the fact', zh: '大部分错误都能事后弥补' },
        { en: 'Some can be fixed, some can\'t', zh: '有些能补救有些不能' },
        { en: 'Most errors are hard to reverse once made', zh: '大部分错误犯了就很难挽回' },
        { en: 'Once wrong, almost impossible to fix', zh: '一旦出错几乎无法补救' },
      ],
    },
    {
      id: 'Q13',
      indicator: 'Regulation',
      direction: 'reverse',
      question: {
        en: 'How strictly is your work regulated by industry oversight and qualification requirements?',
        zh: '你的工作受行业监管和资质要求的约束严格吗？',
      },
      options: [
        { en: 'No barriers at all — anyone can do it', zh: '完全没有门槛，谁都可以做' },
        { en: 'Some basic requirements but low barrier', zh: '有一些基本要求但门槛很低' },
        { en: 'Requires certain certifications or training', zh: '需要一定的认证或培训资质' },
        { en: 'Strict licensing and industry regulation', zh: '有严格的执照和行业监管' },
        { en: 'Must hold license to practice — violations are prosecuted', zh: '必须持证上岗，违规会被追责' },
      ],
    },
    {
      id: 'Q14',
      indicator: 'Liability',
      direction: 'reverse',
      question: {
        en: 'If something goes wrong in your work, how much personal liability do you bear?',
        zh: '如果你的工作出了问题，你个人要承担多大责任？',
      },
      options: [
        { en: 'Basically none — the company covers it', zh: '基本不需要个人承担，公司兜底' },
        { en: 'Might get criticized but no legal/financial liability', zh: '可能挨批评但不涉及法律经济责任' },
        { en: 'Could face some financial compensation or disciplinary action', zh: '可能面临一定经济赔偿或处分' },
        { en: 'Could face significant lawsuits or compensation', zh: '可能面临较大法律诉讼或赔偿' },
        { en: 'Could go to jail or face huge compensation', zh: '出了事可能坐牢或巨额赔偿' },
      ],
    },
    {
      id: 'Q15',
      indicator: 'PublicTrust',
      direction: 'reverse',
      question: {
        en: 'Would the public accept AI making decisions in your role?',
        zh: '公众能接受让AI在你的岗位上做决策吗？',
      },
      options: [
        { en: 'Totally fine — nobody cares who/what does it', zh: '完全可以，没人在乎是谁做的' },
        { en: 'Most people wouldn\'t mind', zh: '大部分人不介意' },
        { en: 'Mixed feelings — some OK, some uncomfortable', zh: '看情况，有人OK有人不舒服' },
        { en: 'Most people would feel uneasy', zh: '大部分人会觉得不放心' },
        { en: 'Absolutely unacceptable — public would strongly oppose', zh: '完全不能接受，公众会强烈反对' },
      ],
    },
  ],
};

// ─── Dimension 4: Human Presence ─────────────────────────────────────────────

const DIMENSION_HUMAN: QuizDimension = {
  id: 'humanPresence',
  name: { en: 'Human Presence', zh: '人格依赖性' },
  description: {
    en: 'Is your value in "what you produce" or "who you are"?',
    zh: '你的价值在于"做出了什么"，还是"你是谁"？',
  },
  favorableLabel: { en: 'Product (P)', zh: '对事型 (P)' },
  resistantLabel: { en: 'Human (H)', zh: '对人型 (H)' },
  favorableLetter: 'P',
  resistantLetter: 'H',
  questions: [
    {
      id: 'Q16',
      indicator: 'Relationship',
      direction: 'reverse',
      question: {
        en: 'Why do clients/partners choose you?',
        zh: '客户或合作方选择你，主要是因为什么？',
      },
      options: [
        { en: 'Purely price/efficiency — cheapest wins', zh: '纯粹看价格效率，谁便宜找谁' },
        { en: 'Mainly skills/qualifications, no personal preference', zh: '主要看能力资质，对谁没偏好' },
        { en: 'Skills matter, but also working rapport', zh: '能力重要，也考虑合作默契' },
        { en: 'Many clients stay because of the relationship', zh: '很多客户因为关系好才长期合作' },
        { en: 'Clients only work with me — would leave if I\'m gone', zh: '客户只认我，换人就不干了' },
      ],
    },
    {
      id: 'Q17',
      indicator: 'Identity',
      direction: 'reverse',
      question: {
        en: 'How many clients/audiences come specifically for "you as a person"?',
        zh: '有多少客户/受众是冲着"你这个人"来的？',
      },
      options: [
        { en: 'None at all — only care if I can do the job', zh: '完全没有，只看我能不能干好活' },
        { en: 'Very few know me, vast majority look at skills', zh: '极少数人认我，绝大部分看能力' },
        { en: 'Some come for me, more come for skills', zh: '有一部分冲我来的，更多看能力' },
        { en: 'Quite a few come for me — some level of fame', zh: '不少人冲我来的，有一定知名度' },
        { en: 'I AM the brand — people come specifically for me', zh: '我本身就是品牌，就是冲我来的' },
      ],
    },
    {
      id: 'Q18',
      indicator: 'PhysicalPresence',
      direction: 'reverse',
      question: {
        en: 'Must you be physically present in person to do your work?',
        zh: '你的工作必须本人亲自到场、用身体完成吗？',
      },
      options: [
        { en: 'Not at all — can do everything remotely', zh: '完全不用，在哪都能远程完成' },
        { en: 'Occasionally need to be on-site, mostly remote', zh: '偶尔需要到场，大部分可远程' },
        { en: 'Half on-site, half remote', zh: '一半到场，一半远程' },
        { en: 'Mostly need to be physically present', zh: '大部分时候必须到场' },
        { en: 'Must be physically there in person', zh: '必须本人在现场用身体完成' },
      ],
    },
    {
      id: 'Q19',
      indicator: 'EmotionalLabor',
      direction: 'reverse',
      question: {
        en: 'How much of your work involves reading emotions, comforting, or persuading people?',
        zh: '你的工作有多少需要察言观色、安抚情绪或说服他人？',
      },
      options: [
        { en: 'None — I work with data/machines, not people', zh: '完全没有，我对着数据/机器干活' },
        { en: 'Occasionally deal with people, mostly solo work', zh: '偶尔跟人打交道，大部分独立工作' },
        { en: 'About half people interaction, half solo', zh: '差不多一半对人、一半独立' },
        { en: 'Most of my day is managing people and emotions', zh: '大部分时间在跟人打交道、处理情绪' },
        { en: 'My entire value IS understanding and connecting with people', zh: '我的全部价值就在于理解人、连接人' },
      ],
    },
    {
      id: 'Q20',
      indicator: 'HumanPremium',
      direction: 'reverse',
      question: {
        en: 'If clients discovered your work was actually done by AI?',
        zh: '如果客户发现你的工作其实是AI完成的？',
      },
      options: [
        { en: 'Wouldn\'t care — might even think it\'s more efficient', zh: '无所谓，甚至觉得更高效' },
        { en: 'A bit surprised but basically OK', zh: '有点意外但基本能接受' },
        { en: 'Feels like reduced value, but still somewhat OK', zh: '觉得打了折扣，但还算认可' },
        { en: 'Clearly feels less valuable and dissatisfied', zh: '明显觉得价值降低、不满意' },
        { en: 'Completely unacceptable — feels deceived', zh: '完全无法接受，觉得被欺骗了' },
      ],
    },
  ],
};

// ─── AI Snapshot Questions ───────────────────────────────────────────────────

export const AI_SNAPSHOT_QUESTIONS: AISnapshotQuestion[] = [
  {
    id: 'S1',
    indicator: 'PromptFriction',
    direction: 'reverse',
    question: {
      en: 'How much effort does it take to get AI to produce a usable first draft?',
      zh: '让AI给出能用的初稿，要花多少功夫沟通？',
    },
    options: [
      { en: 'Barely need to say anything — satisfied on first try', zh: '几乎不用说，一次就满意' },
      { en: 'Simple description works, occasional tweaking', zh: '简单描述就行，偶尔微调' },
      { en: 'Need to craft prompts carefully, several rounds', zh: '需要花时间组织提示词，来回几轮' },
      { en: 'Takes a lot of effort for barely usable results', zh: '花很大功夫才得到勉强可用的结果' },
      { en: 'No matter what I say, AI can\'t understand', zh: '怎么说AI都理解不了' },
    ],
  },
  {
    id: 'S2',
    indicator: 'Coverage',
    direction: 'forward',
    question: {
      en: 'How much of your daily work can AI currently help with?',
      zh: '在你的日常工作中，AI目前能帮你分担多少？',
    },
    options: [
      { en: 'Barely any help', zh: '几乎帮不上忙' },
      { en: 'Can help with some simple auxiliary tasks', zh: '能帮一些简单辅助工作' },
      { en: 'Can handle close to half the workload', zh: '能承担接近一半工作量' },
      { en: 'Can do most of it — I mainly review and finalize', zh: '能做大部分，我主要把关收尾' },
      { en: 'Handles almost everything — I just check', zh: '几乎全部搞定，我只需检查' },
    ],
  },
  {
    id: 'S3',
    indicator: 'QualityParity',
    direction: 'forward',
    question: {
      en: 'How would you rate the quality of AI\'s current output?',
      zh: '你觉得AI目前产出的东西质量怎么样？',
    },
    options: [
      { en: 'Completely unusable — need to redo everything', zh: '完全不能用，要全部重做' },
      { en: 'Barely acceptable — needs major revisions', zh: '勉强能看，需大幅修改' },
      { en: 'OK — usable with some edits', zh: '还行，修修改改能用' },
      { en: 'Good quality — only needs minor tweaks', zh: '质量不错，只需微调' },
      { en: 'Consistently better than what I\'d produce myself', zh: '质量稳定超过我自己做的' },
    ],
  },
  {
    id: 'S4',
    indicator: 'EditLoad',
    direction: 'reverse',
    question: {
      en: 'After AI generates something, how much editing before you can deliver it?',
      zh: 'AI生成之后，你还需要花多少功夫修改才能交付？',
    },
    options: [
      { en: 'Almost none — ready to deliver', zh: '几乎不用改，直接能交' },
      { en: 'Just a quick polish', zh: '稍微润色一下就行' },
      { en: 'Need a serious round of editing', zh: '需要比较认真地改一轮' },
      { en: 'Major rework needed — lots of changes', zh: '要大幅返工，改动量很大' },
      { en: 'Easier to just do it myself from scratch', zh: '不如自己从头做' },
    ],
  },
];

// ─── Survey Questions (non-scoring) ──────────────────────────────────────────

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'X1',
    topic: { en: 'Company AI Support', zh: '公司AI支持' },
    question: {
      en: 'Does your company provide AI tools for you?',
      zh: '你所在的公司有给你提供AI工具吗？',
    },
    options: [
      { en: 'No', zh: '没有' },
      { en: 'Yes but not great', zh: '有但不好用' },
      { en: 'Yes and I use them often', zh: '有且经常用' },
    ],
  },
  {
    id: 'X2',
    topic: { en: 'Company AI Layoffs', zh: '公司AI裁员' },
    question: {
      en: 'Has your company laid off people due to AI?',
      zh: '你的公司有因为引入AI而裁员吗？',
    },
    options: [
      { en: 'No', zh: '没有' },
      { en: 'Heard rumors but unsure', zh: '听说有但不确定' },
      { en: 'Yes, it\'s happening', zh: '确实在裁' },
    ],
  },
  {
    id: 'X3',
    topic: { en: 'Willingness to Pay', zh: '个人付费意愿' },
    question: {
      en: 'Would you pay out of pocket for the best AI to boost your performance?',
      zh: '你愿意自掏腰包买最好的AI来提升工作表现吗？',
    },
    options: [
      { en: 'Not willing', zh: '不愿意' },
      { en: 'Depends on the price', zh: '看价格' },
      { en: 'Willing — already paying', zh: '愿意，已经在付了' },
    ],
  },
];

// ─── SOC Major Occupational Groups (23 categories) ──────────────────────────

export const SOC_MAJOR_GROUPS: { code: number; name: { en: string; zh: string }; riskScore: number }[] = [
  { code: 11, name: { en: 'Management', zh: '管理' }, riskScore: 28 },
  { code: 13, name: { en: 'Business & Financial Operations', zh: '商业与金融运营' }, riskScore: 72 },
  { code: 15, name: { en: 'Computer & Mathematical', zh: '计算机与数学' }, riskScore: 55 },
  { code: 17, name: { en: 'Architecture & Engineering', zh: '建筑与工程' }, riskScore: 45 },
  { code: 19, name: { en: 'Life, Physical & Social Science', zh: '生命、物理和社会科学' }, riskScore: 30 },
  { code: 21, name: { en: 'Community & Social Service', zh: '社区和社会服务' }, riskScore: 18 },
  { code: 23, name: { en: 'Legal', zh: '法律' }, riskScore: 52 },
  { code: 25, name: { en: 'Educational Instruction & Library', zh: '教育与图书馆' }, riskScore: 35 },
  { code: 27, name: { en: 'Arts, Design, Entertainment, Sports & Media', zh: '艺术、设计、娱乐、体育和媒体' }, riskScore: 58 },
  { code: 29, name: { en: 'Healthcare Practitioners & Technical', zh: '医疗从业者和技术人员' }, riskScore: 25 },
  { code: 31, name: { en: 'Healthcare Support', zh: '医疗辅助' }, riskScore: 42 },
  { code: 33, name: { en: 'Protective Service', zh: '保护性服务' }, riskScore: 15 },
  { code: 35, name: { en: 'Food Preparation & Serving', zh: '餐饮制备和服务' }, riskScore: 65 },
  { code: 37, name: { en: 'Building & Grounds Cleaning/Maintenance', zh: '建筑物和场地清洁维护' }, riskScore: 38 },
  { code: 39, name: { en: 'Personal Care & Service', zh: '个人护理和服务' }, riskScore: 20 },
  { code: 41, name: { en: 'Sales & Related', zh: '销售及相关' }, riskScore: 68 },
  { code: 43, name: { en: 'Office & Administrative Support', zh: '办公室和行政支持' }, riskScore: 85 },
  { code: 45, name: { en: 'Farming, Fishing & Forestry', zh: '农业、渔业和林业' }, riskScore: 40 },
  { code: 47, name: { en: 'Construction & Extraction', zh: '建筑施工和采掘' }, riskScore: 22 },
  { code: 49, name: { en: 'Installation, Maintenance & Repair', zh: '安装、维护和修理' }, riskScore: 32 },
  { code: 51, name: { en: 'Production', zh: '生产制造' }, riskScore: 70 },
  { code: 53, name: { en: 'Transportation & Material Moving', zh: '运输和物料搬运' }, riskScore: 73 },
  { code: 55, name: { en: 'Military Specific', zh: '军事专属' }, riskScore: 12 },
];

// ─── 16 Profile Types ────────────────────────────────────────────────────────

export const PROFILE_TYPES: Record<string, ProfileType> = {
  // Extreme high (4/4 AI favorable)
  EOFP: {
    code: 'EOFP',
    name: { en: 'Full Chain Open', zh: '全链路畅通型' },
    description: {
      en: 'Explicit + Objective + Flexible + Product: Knowledge is transparent, evaluation is clear, errors are fixable, only results matter',
      zh: '显+客+弹+事：知识透明、标准客观、出错可改、只看结果',
    },
    typicalJobs: {
      en: 'Office & Administrative Support (43), Business & Financial Operations (13) — entry-level positions',
      zh: '办公室和行政支持(43)、商业与金融运营(13)基础岗',
    },
    riskTier: 'extreme-high',
    primarySOC: 43,
  },
  // High (3/4 AI favorable)
  EOFH: {
    code: 'EOFH',
    name: { en: 'Relationship Anchored', zh: '关系锚定型' },
    description: {
      en: 'Explicit + Objective + Flexible + Human: AI can do everything, but clients trust YOU specifically',
      zh: '显+客+弹+人：AI全都能做，但客户认的是你这个人',
    },
    typicalJobs: {
      en: 'Sales & Related (41), Business & Financial Operations (13) — client relationship roles',
      zh: '销售及相关(41)、商业与金融运营(13)客户经理方向',
    },
    riskTier: 'high',
    primarySOC: 41,
  },
  EORP: {
    code: 'EORP',
    name: { en: 'Compliance Gatekeeper', zh: '合规守门型' },
    description: {
      en: 'Explicit + Objective + Rigid + Product: AI can learn and do it, but errors are too costly / regulated',
      zh: '显+客+刚+事：AI能学也能做，但出错代价太大/有监管',
    },
    typicalJobs: {
      en: 'Production (51) — quality inspection, Healthcare Practitioners & Technical (29) — pharmacy/lab roles',
      zh: '生产制造(51)质检方向、医疗从业者和技术人员(29)药剂/检验方向',
    },
    riskTier: 'high',
    primarySOC: 51,
  },
  ESFP: {
    code: 'ESFP',
    name: { en: 'Creative Trial-and-Error', zh: '创意试错型' },
    description: {
      en: 'Explicit + Subjective + Flexible + Product: AI can learn, errors are tolerable, only results matter, but quality is subjective',
      zh: '显+主+弹+事：AI能学、可以试错、只看结果，但好坏全靠主观判断',
    },
    typicalJobs: {
      en: 'Arts, Design, Entertainment, Sports & Media (27) — design/planning, Computer & Mathematical (15)',
      zh: '艺术、设计、娱乐、体育和媒体(27)设计/策划方向、计算机与数学(15)',
    },
    riskTier: 'high',
    primarySOC: 27,
  },
  TOFP: {
    code: 'TOFP',
    name: { en: 'Skill Executor', zh: '技能执行型' },
    description: {
      en: 'Tacit + Objective + Flexible + Product: Clear standards, fixable errors, results-only, but needs physical experience',
      zh: '隐+客+弹+事：标准客观、可试错、只看结果，但需要身体经验',
    },
    typicalJobs: {
      en: 'Installation, Maintenance & Repair (49), Transportation & Material Moving (53) — warehouse, Food Preparation & Serving (35) — chain, Building & Grounds Cleaning/Maintenance (37)',
      zh: '安装、维护和修理(49)、运输和物料搬运(53)仓储方向、餐饮制备和服务(35)连锁方向、建筑物和场地清洁维护(37)',
    },
    riskTier: 'high',
    primarySOC: 49,
  },
  // Medium (2/4 AI favorable)
  EORH: {
    code: 'EORH',
    name: { en: 'Licensed Trust', zh: '执证信任型' },
    description: {
      en: 'Explicit + Objective + Rigid + Human: Transparent knowledge + regulated + clients trust you — AI only lacks entry',
      zh: '显+客+刚+人：知识透明+有监管+客户认人，AI只缺一个入口',
    },
    typicalJobs: {
      en: 'Business & Financial Operations (13) — licensed roles, Legal (23) — notary/compliance',
      zh: '商业与金融运营(13)持证方向、法律(23)公证/合规方向',
    },
    riskTier: 'medium',
    primarySOC: 13,
  },
  ESFH: {
    code: 'ESFH',
    name: { en: 'Digital Persona', zh: '数字人格型' },
    description: {
      en: 'Explicit + Subjective + Flexible + Human: AI can learn, but quality is subjective + fans trust the person',
      zh: '显+主+弹+人：AI能学，但好坏靠主观+粉丝认的是人',
    },
    typicalJobs: {
      en: 'Arts, Design, Entertainment, Sports & Media (27) — content creators, Educational Instruction & Library (25)',
      zh: '艺术、设计、娱乐、体育和媒体(27)自媒体/内容方向、教育与图书馆(25)',
    },
    riskTier: 'medium',
    primarySOC: 25,
  },
  ESRP: {
    code: 'ESRP',
    name: { en: 'High-Stakes Creative', zh: '高压创造型' },
    description: {
      en: 'Explicit + Subjective + Rigid + Product: AI can learn, but quality is subjective + errors have serious consequences',
      zh: '显+主+刚+事：AI能学，但好坏靠主观+出错后果严重',
    },
    typicalJobs: {
      en: 'Architecture & Engineering (17), Life, Physical & Social Science (19), Business & Financial Operations (13) — investment management',
      zh: '建筑与工程(17)、生命、物理和社会科学(19)、商业与金融运营(13)投资管理方向',
    },
    riskTier: 'medium',
    primarySOC: 17,
  },
  TOFH: {
    code: 'TOFH',
    name: { en: 'Craftsman Persona', zh: '手艺人格型' },
    description: {
      en: 'Tacit + Objective + Flexible + Human: Physical skills needed + clients come for you specifically',
      zh: '隐+客+弹+人：需要身体技能+客户认你这个人',
    },
    typicalJobs: {
      en: 'Personal Care & Service (39)',
      zh: '个人护理和服务(39)',
    },
    riskTier: 'medium',
    primarySOC: 39,
  },
  TORP: {
    code: 'TORP',
    name: { en: 'Precision Operator', zh: '精密操控型' },
    description: {
      en: 'Tacit + Objective + Rigid + Product: Physical experience needed + errors are irreversible',
      zh: '隐+客+刚+事：需要身体经验+出错不可逆',
    },
    typicalJobs: {
      en: 'Healthcare Practitioners & Technical (29) — surgical, Transportation & Material Moving (53) — aviation, Construction & Extraction (47) — precision',
      zh: '医疗从业者和技术人员(29)外科方向、运输和物料搬运(53)飞行方向、建筑施工和采掘(47)精密方向',
    },
    riskTier: 'medium',
    primarySOC: 29,
  },
  TSFP: {
    code: 'TSFP',
    name: { en: 'Artisan Creator', zh: '匠心创作型' },
    description: {
      en: 'Tacit + Subjective + Flexible + Product: Physical experience + subjective quality, but fixable errors, results-only',
      zh: '隐+主+弹+事：身体经验+好坏靠主观，但可试错、只看结果',
    },
    typicalJobs: {
      en: 'Food Preparation & Serving (35) — independent chef, Farming, Fishing & Forestry (45)',
      zh: '餐饮制备和服务(35)独立主厨方向、农业、渔业和林业(45)',
    },
    riskTier: 'medium',
    primarySOC: 35,
  },
  // Low (1/4 AI favorable)
  ESRH: {
    code: 'ESRH',
    name: { en: 'Authority Advisor', zh: '权威顾问型' },
    description: {
      en: 'Explicit + Subjective + Rigid + Human: AI can learn knowledge, but subjective quality + high liability + clients trust the person',
      zh: '显+主+刚+人：AI能学知识，但好坏靠主观+高责任+客户认人',
    },
    typicalJobs: {
      en: 'Legal (23) — partners, Management (11) — consulting, Healthcare Practitioners & Technical (29) — attending physicians',
      zh: '法律(23)合伙人方向、管理(11)咨询方向、医疗从业者和技术人员(29)主治方向',
    },
    riskTier: 'low',
    primarySOC: 23,
  },
  TORH: {
    code: 'TORH',
    name: { en: 'Life Guardian', zh: '生命守护型' },
    description: {
      en: 'Tacit + Objective + Rigid + Human: Physical experience + irreversible errors + patient trust',
      zh: '隐+客+刚+人：身体经验+出错不可逆+患者信任关系',
    },
    typicalJobs: {
      en: 'Healthcare Practitioners & Technical (29) — dental/obstetric, Healthcare Support (31)',
      zh: '医疗从业者和技术人员(29)口腔/产科方向、医疗辅助(31)',
    },
    riskTier: 'low',
    primarySOC: 29,
  },
  TSFH: {
    code: 'TSFH',
    name: { en: 'Soul Expresser', zh: '灵魂表达型' },
    description: {
      en: 'Tacit + Subjective + Flexible + Human: Physical experience + subjective quality + the person IS the work',
      zh: '隐+主+弹+人：身体经验+好坏靠主观+人本身就是作品',
    },
    typicalJobs: {
      en: 'Arts, Design, Entertainment, Sports & Media (27) — performing arts',
      zh: '艺术、设计、娱乐、体育和媒体(27)表演方向',
    },
    riskTier: 'low',
    primarySOC: 27,
  },
  TSRP: {
    code: 'TSRP',
    name: { en: 'Extreme Judgment', zh: '极限判断型' },
    description: {
      en: 'Tacit + Subjective + Rigid + Product: Physical experience + subjective quality + irreversible errors',
      zh: '隐+主+刚+事：身体经验+好坏靠主观+出错不可逆',
    },
    typicalJobs: {
      en: 'Protective Service (33), Military Specific (55), Healthcare Practitioners & Technical (29) — emergency medicine',
      zh: '保护性服务(33)、军事专属(55)、医疗从业者和技术人员(29)急诊方向',
    },
    riskTier: 'low',
    primarySOC: 33,
  },
  // Extreme low (0/4 AI favorable)
  TSRH: {
    code: 'TSRH',
    name: { en: 'Full Barrier', zh: '全维壁垒型' },
    description: {
      en: 'Tacit + Subjective + Rigid + Human: All four dimensions block AI replacement',
      zh: '隐+主+刚+人：四个维度全部阻断AI替代链路',
    },
    typicalJobs: {
      en: 'Management (11) — top executives, Community & Social Service (21), Arts, Design, Entertainment, Sports & Media (27) — elite athletes',
      zh: '管理(11)最高层、社区和社会服务(21)、艺术、设计、娱乐、体育和媒体(27)顶级运动员方向',
    },
    riskTier: 'extreme-low',
    primarySOC: 11,
  },
};

// ─── Exports ─────────────────────────────────────────────────────────────────

export const QUIZ_DIMENSIONS: QuizDimension[] = [
  DIMENSION_LEARNABILITY,
  DIMENSION_EVALUATION,
  DIMENSION_RISK,
  DIMENSION_HUMAN,
];

/** All 16 core questions in order */
export const ALL_CORE_QUESTIONS: QuizQuestion[] = QUIZ_DIMENSIONS.flatMap(d => d.questions);

/** Total core questions count */
export const CORE_QUESTION_COUNT = ALL_CORE_QUESTIONS.length; // 16

/** Total snapshot questions count */
export const SNAPSHOT_QUESTION_COUNT = AI_SNAPSHOT_QUESTIONS.length; // 4

/** Risk tier display info */
export const RISK_TIER_INFO: Record<ProfileType['riskTier'], {
  label: { en: string; zh: string };
  color: string;
  probability: { min: number; max: number };
}> = {
  'extreme-high': {
    label: { en: 'Extreme High Risk', zh: '极高风险' },
    color: '#ff1744',
    probability: { min: 80, max: 95 },
  },
  'high': {
    label: { en: 'High Risk', zh: '高风险' },
    color: '#ff6d00',
    probability: { min: 60, max: 80 },
  },
  'medium': {
    label: { en: 'Medium Risk', zh: '中等风险' },
    color: '#ffc107',
    probability: { min: 35, max: 60 },
  },
  'low': {
    label: { en: 'Low Risk', zh: '低风险' },
    color: '#00c853',
    probability: { min: 15, max: 35 },
  },
  'extreme-low': {
    label: { en: 'Very Low Risk', zh: '极低风险' },
    color: '#34d399',
    probability: { min: 5, max: 15 },
  },
};
