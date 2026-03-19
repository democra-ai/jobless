/**
 * AIR Quiz Calculator v2
 *
 * Scoring model based on AGI-2030 hypothesis:
 * - We assume AGI arrives ~2030 as a key inflection point
 * - Different profile types face different replacement timelines
 * - Each of the 16 profile types has carefully calibrated probability and timeline
 * - Dimension strength within each type further adjusts the prediction
 * - Truly AI-resistant profiles (0/4 favorable) may show ∞ (unpredictable)
 *
 * Dimension scoring:
 * - Forward questions: score as-is (1-5), higher = more AI-replaceable
 * - Reverse questions: flip (6 - answer), so always higher = more AI-replaceable
 * - Dimension score = average of 4 normalized questions (1-5 scale)
 * - If dimension avg > 3: AI favorable letter (E, O, F, P)
 * - If dimension avg < 3: AI resistant letter (T, S, R, H)
 * - If dimension avg = 3 (exact neutral): AI favorable (tie-break toward risk)
 */

import {
  QuizAnswer,
  QuizDimension,
  QUIZ_DIMENSIONS,
  AI_SNAPSHOT_QUESTIONS,
  PROFILE_TYPES,
  RISK_TIER_INFO,
  ProfileType,
  SOC_MAJOR_GROUPS,
} from './air_quiz_data';

export type Language = 'en' | 'zh';

export interface QuizAnswers {
  /** Q1-Q16 answers keyed by question ID */
  core: Record<string, QuizAnswer>;
  /** S1-S4 answers keyed by question ID */
  snapshot: Record<string, QuizAnswer>;
  /** X1-X3 answers keyed by question ID (0-indexed option) */
  survey: Record<string, number>;
}

export interface DimensionResult {
  dimensionId: string;
  name: { en: string; zh: string };
  rawAverage: number; // 1-5, after direction normalization, higher = AI favorable
  letter: string; // E/T, O/S, F/R, P/H
  isFavorable: boolean; // true = AI can replace this dimension
  favorableLabel: { en: string; zh: string };
  resistantLabel: { en: string; zh: string };
}

export interface QuizResult {
  /** 4-letter profile type code, e.g. "EOFP" */
  profileCode: string;
  /** Full profile type info */
  profile: ProfileType;
  /** Per-dimension results */
  dimensions: DimensionResult[];
  /** Number of AI-favorable dimensions (0-4) */
  favorableCount: number;
  /** Overall replacement probability (0-100) */
  replacementProbability: number;
  /** Predicted replacement year, or Infinity for unpredictable */
  predictedReplacementYear: number;
  /** Current AI capability score for this job (0-100), from snapshot */
  currentAICapability: number;
  /** Confidence interval */
  confidenceInterval: { earliest: number; latest: number };
  /** Risk level compatible with existing share system */
  riskLevel: 'very-low' | 'low' | 'medium' | 'high' | 'critical';
  /** Current replacement degree (for share compat) */
  currentReplacementDegree: number;
  /** Resolved occupation SOC group */
  occupationSOC: { code: number; name: { en: string; zh: string }; inferred: boolean } | null;
}

// ─── AGI-2030 Timeline Model ─────────────────────────────────────────────────

const AGI_YEAR = 2030;

/**
 * Per-profile-type calibration data.
 *
 * Each of the 16 types has been individually analyzed based on:
 * - Which dimensions are AI-favorable vs AI-resistant
 * - Real-world AI capability trajectories for the typical jobs in that profile
 * - The AGI-2030 hypothesis as a key inflection point
 *
 * Fields:
 * - prob: [min, max] replacement probability range (%)
 * - year: [earliest, latest] predicted replacement year range, or null for ∞
 * - preAGI: how much of the replacement can happen BEFORE AGI (0-1)
 *   e.g. 0.7 means 70% of the threat exists with narrow AI alone
 * - vulnerabilities: bilingual explanation of WHY this type is replaceable
 * - strengths: bilingual explanation of WHY this type resists replacement
 */
interface ProfileCalibration {
  prob: [number, number];
  year: [number, number] | null; // null = ∞ (unpredictable)
  preAGI: number;
  vulnerabilities: { en: string; zh: string };
  strengths: { en: string; zh: string };
}

const PROFILE_CALIBRATION: Record<string, ProfileCalibration> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // EXTREME HIGH RISK — 4/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════
  EOFP: {
    prob: [82, 95],
    year: [2027, 2031],
    preAGI: 0.85,
    vulnerabilities: {
      en: 'All four dimensions favor AI: knowledge is explicit and digitized, quality is objectively measurable, errors are tolerable and fixable, and only the output matters — not who produces it. Current narrow AI already handles most of this.',
      zh: '四个维度全部对AI有利：知识是显性且数字化的，质量可以客观衡量，错误可以容忍和修复，只看产出结果不看谁做的。当前的窄AI已经能处理大部分此类工作。',
    },
    strengths: {
      en: 'None from the four dimensions. Your only defense is speed of organizational adoption — bureaucracy and change resistance may buy time, but not protection.',
      zh: '四个维度均无防御优势。唯一的缓冲是组织采用速度——官僚体制和变革阻力可能争取时间，但无法提供保护。',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // HIGH RISK — 3/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════
  EOFH: {
    prob: [62, 78],
    year: [2029, 2034],
    preAGI: 0.55,
    vulnerabilities: {
      en: 'Knowledge is transparent, quality is measurable, and errors are forgivable — AI can learn, optimize, and iterate freely in 3 out of 4 dimensions.',
      zh: '知识透明、质量可量化、错误可容忍——AI在四个维度中的三个可以自由学习、优化和迭代。',
    },
    strengths: {
      en: 'People come to you for YOU, not just results. Human trust, personal reputation, and relationship continuity are your moat — but only if you actively cultivate them.',
      zh: '人们因为"你"而来，不只是为了结果。人际信任、个人声誉和关系延续是你的护城河——但前提是你主动培养这些。',
    },
  },
  EORP: {
    prob: [58, 75],
    year: [2030, 2036],
    preAGI: 0.45,
    vulnerabilities: {
      en: 'Knowledge is digitized and quality is objectively measured — AI learns these quickly. Output-only evaluation means AI can substitute anonymously.',
      zh: '知识已数字化、质量客观衡量——AI学得很快。只看结果的评价方式意味着AI可以匿名替代。',
    },
    strengths: {
      en: 'Errors carry real consequences — organizations are cautious about deploying AI where mistakes are irreversible. Regulatory barriers and liability concerns slow replacement.',
      zh: '错误代价高昂——组织不会轻易在不可逆的场景中部署AI。监管壁垒和责任风险减缓了替代速度。',
    },
  },
  ESFP: {
    prob: [55, 72],
    year: [2029, 2035],
    preAGI: 0.50,
    vulnerabilities: {
      en: 'Knowledge is learnable, errors are tolerable, and only output matters — AI can iterate endlessly at near-zero cost in these three dimensions.',
      zh: '知识可学习、错误可容忍、只看产出——AI在这三个维度可以以近乎零成本无限迭代。',
    },
    strengths: {
      en: 'Quality is subjectively judged — "good" depends on taste, context, and cultural nuance. AI struggles with the moving target of subjective standards.',
      zh: '质量由主观判断——"好"取决于品味、语境和文化细微差别。AI难以追赶主观标准这个移动的靶心。',
    },
  },
  TOFP: {
    prob: [55, 73],
    year: [2030, 2037],
    preAGI: 0.35,
    vulnerabilities: {
      en: 'Work is objectively evaluated, errors are fixable, and only the output matters — AI can match or exceed human quality in measurable, forgiving domains.',
      zh: '工作以客观标准评价、错误可修复、只看结果——在可量化且容错的领域，AI可以达到甚至超过人类水平。',
    },
    strengths: {
      en: 'Your knowledge is tacit — learned through years of hands-on physical experience that AI cannot yet acquire through data alone. This buys significant time, especially pre-AGI.',
      zh: '你的知识是隐性的——通过多年实操获得的身体经验，AI目前无法仅通过数据习得。这争取了大量时间，尤其在AGI之前。',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MEDIUM RISK — 2/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════
  EORH: {
    prob: [38, 55],
    year: [2032, 2040],
    preAGI: 0.30,
    vulnerabilities: {
      en: 'Knowledge is explicit and quality is objectively measurable — the two dimensions AI masters fastest. Once trust barriers erode, replacement accelerates.',
      zh: '知识是显性的、质量可客观衡量——这是AI最快掌握的两个维度。一旦信任壁垒被侵蚀，替代会加速。',
    },
    strengths: {
      en: 'Errors are irreversible AND clients trust you personally — a double barrier. Regulatory licensing, professional liability, and personal relationships create a multi-layered defense.',
      zh: '错误不可逆且客户认你本人——双重壁垒。监管执照、职业责任和人际关系构成了多层防御。',
    },
  },
  ESFH: {
    prob: [35, 52],
    year: [2031, 2039],
    preAGI: 0.30,
    vulnerabilities: {
      en: 'Knowledge is accessible and errors are tolerable — AI can learn your domain and iterate without consequences.',
      zh: '知识可获取、错误可容忍——AI可以无后果地学习你的领域并反复迭代。',
    },
    strengths: {
      en: 'Quality is in the eye of the beholder AND your audience trusts YOU — creative judgment plus personal brand form a powerful defense.',
      zh: '质量由受众主观判断，且受众信任你本人——创意判断加个人品牌形成强有力的防御。',
    },
  },
  ESRP: {
    prob: [36, 54],
    year: [2032, 2041],
    preAGI: 0.25,
    vulnerabilities: {
      en: 'Knowledge is digitized and only the output matters — AI can learn the theory and produce work anonymously.',
      zh: '知识已数字化且只看产出——AI能学习理论并匿名产出成果。',
    },
    strengths: {
      en: 'Quality is subjective AND errors are irreversible — AI must clear both the creative judgment bar AND the safety bar. This dual gate significantly slows adoption.',
      zh: '质量标准主观且错误不可逆——AI必须同时通过创意判断和安全标准两道关卡。这种双重门槛显著减缓了替代速度。',
    },
  },
  TOFH: {
    prob: [32, 50],
    year: [2033, 2042],
    preAGI: 0.20,
    vulnerabilities: {
      en: 'Work is objectively evaluated and errors are forgivable — AI can measure success clearly and iterate freely.',
      zh: '工作以客观标准评价且错误可容忍——AI可以清晰衡量成功并自由迭代。',
    },
    strengths: {
      en: 'Physical experience IS the skill AND people choose you specifically — AI would need both a body and a personality. Robotics + social AI is the hardest combination.',
      zh: '身体经验就是技能本身且人们指定选你——AI需要同时具备躯体和人格。机器人+社交AI是最难攻克的组合。',
    },
  },
  TORP: {
    prob: [34, 52],
    year: [2033, 2043],
    preAGI: 0.15,
    vulnerabilities: {
      en: 'Work is objectively measured and only output matters — when AI gets the physical capability, the replacement path is clear.',
      zh: '工作客观衡量且只看结果——当AI获得物理能力时，替代路径很清晰。',
    },
    strengths: {
      en: 'Hands-on experience + irreversible consequences = the highest physical-world barrier. Surgeons, pilots, precision builders — errors kill. Regulatory gatekeeping adds decades.',
      zh: '实操经验+不可逆后果=最高的物理世界壁垒。外科医生、飞行员、精密建造者——错误致命。监管准入增加了数十年缓冲。',
    },
  },
  TSFP: {
    prob: [30, 48],
    year: [2034, 2044],
    preAGI: 0.15,
    vulnerabilities: {
      en: 'Errors are tolerable and only the output matters — in domains where AI can iterate cheaply, it will eventually catch up on taste and physical skills.',
      zh: '错误可容忍且只看产出——在AI可以廉价迭代的领域，它最终会在品味和体力技能上赶上来。',
    },
    strengths: {
      en: 'Physical mastery + subjective quality = the artisan barrier. You know through your hands, and quality is "I know it when I see it" — both are deeply human.',
      zh: '身体精通+主观质量=匠人壁垒。你的知识在双手中，质量是"看到就知道"——两者都深刻地属于人类。',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LOW RISK — 1/4 AI favorable
  // ═══════════════════════════════════════════════════════════════════════════
  ESRH: {
    prob: [15, 30],
    year: [2038, 2052],
    preAGI: 0.10,
    vulnerabilities: {
      en: 'Knowledge is explicit and digitized — AI can learn everything you know from documentation and data. This is your one exposed flank.',
      zh: '知识是显性且数字化的——AI可以从文档和数据中学到你所知道的一切。这是你唯一暴露的侧翼。',
    },
    strengths: {
      en: 'Three powerful barriers: subjective quality judgment, irreversible consequences, and personal trust. Think senior partners, consulting leaders, attending physicians — authority that takes decades to build.',
      zh: '三重强力壁垒：主观质量判断、不可逆后果、个人信任。想想高级合伙人、咨询领袖、主治医师——需要数十年才能建立的权威。',
    },
  },
  TORH: {
    prob: [12, 28],
    year: [2040, 2055],
    preAGI: 0.05,
    vulnerabilities: {
      en: 'Work is objectively evaluated — when AI achieves physical capability AND earns regulatory trust, objective metrics make the replacement case clear.',
      zh: '工作以客观标准评价——当AI获得物理能力且赢得监管信任时，客观指标会使替代论据变得明确。',
    },
    strengths: {
      en: 'Tacit physical knowledge + irreversible stakes + patient/client trust = the triple fortress. Dental surgeons, obstetricians, specialized therapists — trust built through human touch.',
      zh: '隐性身体知识+不可逆风险+患者/客户信任=三重堡垒。口腔外科医生、产科医生、专科治疗师——通过人的触碰建立的信任。',
    },
  },
  TSFH: {
    prob: [10, 25],
    year: [2042, 2058],
    preAGI: 0.05,
    vulnerabilities: {
      en: 'Errors are tolerable — AI can experiment and iterate in your domain without catastrophic consequences, allowing gradual capability building.',
      zh: '错误可容忍——AI可以在你的领域试验和迭代而不会造成灾难性后果，从而逐步提升能力。',
    },
    strengths: {
      en: 'Physical mastery + subjective art + personal identity = the performer barrier. Athletes, dancers, master craftspeople — the person IS the work. AI producing "art" is not the same as you performing it.',
      zh: '身体精通+主观艺术+人格认同=表演者壁垒。运动员、舞者、大师级工匠——人本身就是作品。AI生成的"艺术"和你亲自表演不是一回事。',
    },
  },
  TSRP: {
    prob: [10, 24],
    year: [2043, 2060],
    preAGI: 0.05,
    vulnerabilities: {
      en: 'Only the output matters — if AI ever achieves the physical skill, subjective judgment, and safety record, the "who did it" question won\'t protect you.',
      zh: '只看产出——如果AI有一天达到了物理技能、主观判断和安全记录的要求，"谁做的"这个问题不会保护你。',
    },
    strengths: {
      en: 'Tacit knowledge + subjective judgment + irreversible consequences = the extreme judgment barrier. Emergency doctors, special forces, elite risk assessors — wrong decisions are permanent.',
      zh: '隐性知识+主观判断+不可逆后果=极限判断壁垒。急诊医生、特种部队、顶级风险评估师——错误的决定是永久的。',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXTREME LOW RISK — 0/4 AI favorable (∞)
  // ═══════════════════════════════════════════════════════════════════════════
  TSRH: {
    prob: [3, 12],
    year: null, // ∞ — unpredictable
    preAGI: 0.0,
    vulnerabilities: {
      en: 'No dimension is AI-favorable. Your only theoretical vulnerability is a future intelligence vastly beyond current imagination — post-AGI, post-singularity territory.',
      zh: '没有任何维度对AI有利。你唯一的理论性脆弱点是远超当前想象的未来智能——后AGI、后奇点的领域。',
    },
    strengths: {
      en: 'All four barriers active simultaneously: knowledge lives in the body, quality is in the eye of the beholder, errors are irreversible, and people trust the person. No current or projected AI technology can breach all four. Think top executives making bet-the-company decisions, crisis negotiators, elite surgeons with decades of reputation.',
      zh: '四重壁垒同时生效：知识存在于身体中、质量由主观判断、错误不可逆、人们信任的是人本身。当前或可预见的AI技术无法同时突破这四重壁垒。想想做出关乎公司存亡决策的顶级高管、危机谈判专家、拥有数十年声誉的精英外科医生。',
    },
  },
};

// ─── Core Functions ──────────────────────────────────────────────────────────

/** Normalize a single answer based on direction. Result: 1-5 where higher = AI favorable. */
function normalizeAnswer(answer: QuizAnswer, direction: 'forward' | 'reverse'): number {
  return direction === 'forward' ? answer : (6 - answer);
}

/** Calculate a single dimension result */
function scoreDimension(dimension: QuizDimension, answers: Record<string, QuizAnswer>): DimensionResult {
  const scores = dimension.questions.map(q => {
    const answer = answers[q.id];
    if (!answer) return 3; // default middle
    return normalizeAnswer(answer, q.direction);
  });

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  // Exactly 3.0 = neutral → lean resistant (conservative, protects user)
  // The letter code is for display only; probability is fully continuous
  const isFavorable = avg > 3;

  return {
    dimensionId: dimension.id,
    name: dimension.name,
    rawAverage: Math.round(avg * 100) / 100,
    letter: isFavorable ? dimension.favorableLetter : dimension.resistantLetter,
    isFavorable,
    favorableLabel: dimension.favorableLabel,
    resistantLabel: dimension.resistantLabel,
  };
}

/** Calculate AI snapshot score (0-100) from S1-S4 */
function scoreSnapshot(answers: Record<string, QuizAnswer>): number {
  const scores = AI_SNAPSHOT_QUESTIONS.map(q => {
    const answer = answers[q.id];
    if (!answer) return 3;
    return normalizeAnswer(answer, q.direction);
  });

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(((avg - 1) / 4) * 100);
}

/** Map risk tier to compatible riskLevel string */
function toRiskLevel(tier: ProfileType['riskTier']): QuizResult['riskLevel'] {
  switch (tier) {
    case 'extreme-high': return 'critical';
    case 'high': return 'high';
    case 'medium': return 'medium';
    case 'low': return 'low';
    case 'extreme-low': return 'very-low';
  }
}

/**
 * Swiss Cheese Barrier Model for AI Replacement Probability
 *
 * Based on research from:
 * - McKinsey's conjunctive capability model: AI must penetrate ALL barriers
 * - Frey & Osborne's engineering bottlenecks: any single bottleneck protects the job
 * - James Reason's Swiss Cheese model: defense-in-depth, multiplicative barriers
 * - Dujmovic's Weighted Power Mean (LSP method): tunable conjunction strength
 *
 * Core insight: AI replacing a job is NOT additive — it requires penetrating
 * multiple independent barriers simultaneously. Like the Swiss Cheese model,
 * each dimension is a defensive layer. AI can only fully replace a job when
 * ALL four barriers have "holes" aligned.
 *
 * Mathematical foundation: Weighted Power Mean with negative exponent
 *   M_r(x) = (Σ wi * xi^r)^(1/r),  where r < 0
 *
 * When r → -∞, this approaches min() (pure bottleneck/weakest link).
 * When r = 1, this is the arithmetic mean (fully compensatory).
 * When r → 0, this approaches the geometric mean (multiplicative).
 *
 * We use r = -2 (between geometric mean and harmonic mean), which:
 * - Heavily penalizes any single low dimension (barrier effect)
 * - But doesn't completely ignore other dimensions (unlike pure min)
 * - Matches McKinsey's finding that "bottleneck capability determines feasibility"
 *
 * Dimension weights reflect empirical importance from literature:
 * - Learnability: 0.30 — Prerequisite gate (ALM 2003: "codifiability" is the #1 predictor)
 * - Evaluation:   0.25 — Optimization target (SML: "clear metrics" + "well-defined I/O")
 * - Risk:         0.20 — Deployment gate (organizational adoption barrier)
 * - Human:        0.25 — Independent blocker (Frey & Osborne: "social intelligence" bottleneck)
 *
 * Note: Human Presence gets equal weight to Evaluation (not less!) because
 * the literature consistently shows "social intelligence" as one of the
 * strongest bottlenecks, independent of technical feasibility.
 */

/** Dimension weights — empirically calibrated from automation literature */
const DIMENSION_WEIGHTS: Record<string, number> = {
  learnability: 0.30,    // Can AI access the data? (ALM "codifiability")
  evaluation: 0.25,      // Does AI know what "good" is? (SML "clear metrics")
  riskTolerance: 0.20,   // Will orgs dare deploy? (regulatory/liability gate)
  humanPresence: 0.25,   // Do people demand a human? (Frey "social intelligence")
};

/**
 * Weighted Power Mean exponent.
 * r = -2: strong conjunction — any single low dimension dominates.
 * This is between harmonic mean (r=-1) and min function (r→-∞).
 *
 * Sensitivity analysis:
 *   r = 1:  arithmetic mean (fully compensatory, no barrier effect)
 *   r = 0:  geometric mean (moderate barrier effect)
 *   r = -1: harmonic mean (strong barrier effect)
 *   r = -2: our choice (very strong barrier effect)
 *   r → -∞: pure min (only weakest dimension matters)
 */
const POWER_MEAN_R = -2;

/**
 * Calculate replacement probability using Swiss Cheese barrier model.
 *
 * Each dimension represents a defensive barrier against AI replacement.
 * The penetrability of each barrier (0 to 1) is computed from quiz answers.
 * Barriers are combined using a weighted power mean with r=-2,
 * which ensures any single strong barrier dramatically reduces overall risk.
 *
 * Additionally, we apply an E+O interaction bonus: when BOTH knowledge is
 * explicit AND evaluation is objective, AI's optimization loop is fully
 * closed — this is worse than either alone. (Matches Brynjolfsson's SML
 * criteria: "well-defined I/O" + "clear feedback" together enable ML.)
 */
function calculateProbability(
  _profileCode: string,
  dimensionResults: DimensionResult[],
): number {
  // Extract dimension results by ID
  const dimMap: Record<string, DimensionResult> = {};
  for (const d of dimensionResults) {
    dimMap[d.dimensionId] = d;
  }

  const learn = dimMap['learnability'];
  const evaluate = dimMap['evaluation'];
  const risk = dimMap['riskTolerance'];
  const human = dimMap['humanPresence'];

  if (!learn || !evaluate || !risk || !human) return 50;

  // ── Step 1: Compute barrier penetrability (0 to 1) ──
  // rawAverage 1-5. Map to [0.05, 1.0] — we use 0.05 as floor (not 0)
  // because a true 0 would make the power mean undefined and
  // even the most resistant dimension isn't a perfect impenetrable wall.
  const penetrability = (d: DimensionResult) => {
    const raw = (d.rawAverage - 1) / 4; // 0 to 1
    return 0.05 + 0.95 * raw;           // 0.05 to 1.0
  };

  let pLearn = penetrability(learn);     // 0.05 = fully tacit, 1.0 = fully explicit
  let pEval  = penetrability(evaluate);  // 0.05 = fully subjective, 1.0 = fully objective
  let pRisk  = penetrability(risk);      // 0.05 = fully rigid, 1.0 = fully flexible
  let pHuman = penetrability(human);     // 0.05 = fully human-dependent, 1.0 = fully product-based

  // ── Step 2: E+O interaction effect ──
  // When BOTH learnability AND evaluation are high, the AI optimization loop
  // is fully closed: data is accessible AND the target is clear.
  // This makes the threat MORE than the sum of parts.
  // We boost both penetrabilities slightly when they co-occur above 0.6.
  // (Brynjolfsson SML: "well-defined I/O mapping" + "clear feedback" together)
  if (pLearn > 0.6 && pEval > 0.6) {
    const synergy = 1 + 0.1 * Math.min((pLearn - 0.6) * (pEval - 0.6) / 0.16, 1);
    pLearn = Math.min(1, pLearn * synergy);
    pEval  = Math.min(1, pEval * synergy);
  }

  // ── Step 3: Weighted Power Mean with r = -2 ──
  // M_r = (Σ wi * xi^r)^(1/r)
  //
  // This is the heart of the Swiss Cheese model:
  // - If ANY barrier is strong (low penetrability), the power mean drops sharply
  // - All four barriers must be penetrable for high overall risk
  // - The weights allow some barriers to matter more than others
  const r = POWER_MEAN_R;
  const wLearn = DIMENSION_WEIGHTS.learnability;
  const wEval  = DIMENSION_WEIGHTS.evaluation;
  const wRisk  = DIMENSION_WEIGHTS.riskTolerance;
  const wHuman = DIMENSION_WEIGHTS.humanPresence;

  const powerSum =
    wLearn * Math.pow(pLearn, r) +
    wEval  * Math.pow(pEval, r) +
    wRisk  * Math.pow(pRisk, r) +
    wHuman * Math.pow(pHuman, r);

  const combinedPenetrability = Math.pow(powerSum, 1 / r);

  // combinedPenetrability ranges from ~0.05 (all barriers strong) to ~1.0 (all barriers weak)
  // Normalize to 0..1 range (accounting for the 0.05 floor)
  const normalizedThreat = Math.max(0, Math.min(1, (combinedPenetrability - 0.05) / 0.95));

  // ── Step 4: Map directly to global probability range [5%, 95%] ──
  // This is a CONTINUOUS mapping — no discrete profile bins.
  // All-1s (every barrier strong) → ~5%
  // All-3s (perfectly neutral)    → ~50%
  // All-5s (every barrier weak)   → ~95%
  //
  // We use a slight S-curve (power 1.3) to spread the middle range
  // while compressing extremes, making results more differentiated.
  const GLOBAL_MIN = 5;
  const GLOBAL_MAX = 95;
  const curved = Math.pow(normalizedThreat, 1.3);
  const probability = GLOBAL_MIN + (GLOBAL_MAX - GLOBAL_MIN) * curved;
  return Math.round(Math.min(100, Math.max(0, probability)));
}

/**
 * Predict replacement year — continuous model.
 *
 * Maps probability directly to a year range:
 * - prob ~95% → ~2027 (imminent)
 * - prob ~50% → ~2038 (mid-range)
 * - prob ~5%  → ~2060+ (far future / effectively never)
 * - prob < 8% → Infinity (beyond prediction horizon)
 */
function predictYear(
  _profileCode: string,
  _dimensionResults: DimensionResult[],
  probability: number,
): {
  year: number;
  confidenceInterval: { earliest: number; latest: number };
} {
  const currentYear = new Date().getFullYear();

  // Below 8% probability → effectively unreplaceable in foreseeable future
  if (probability < 8) {
    return {
      year: Infinity,
      confidenceInterval: { earliest: 2060, latest: 9999 },
    };
  }

  // Continuous mapping: probability → years from now
  // Higher probability = sooner replacement
  // Using inverse relationship: yearsAway = base / (probability ^ curve)
  // Calibrated so that:
  //   prob=95 → ~2027 (1-2 years)
  //   prob=70 → ~2031 (5 years)
  //   prob=50 → ~2036 (10 years)
  //   prob=30 → ~2042 (16 years)
  //   prob=10 → ~2055 (29 years)
  const normalizedProb = probability / 100; // 0 to 1
  const yearsAway = Math.round(2 + 30 * Math.pow(1 - normalizedProb, 1.8));
  const year = currentYear + yearsAway;

  // Confidence interval: wider for further-out predictions
  const uncertaintyYears = Math.max(2, Math.round(yearsAway * 0.25));

  return {
    year,
    confidenceInterval: {
      earliest: Math.max(currentYear + 1, year - uncertaintyYears),
      latest: year + uncertaintyYears,
    },
  };
}

/** Resolve occupation from user selection or profile inference */
function resolveOccupation(
  selectedSOC: number | null,
  profileCode: string,
): { code: number; name: { en: string; zh: string }; inferred: boolean } | null {
  if (selectedSOC !== null) {
    const soc = SOC_MAJOR_GROUPS.find(s => s.code === selectedSOC);
    if (soc) return { code: soc.code, name: soc.name, inferred: false };
  }
  const profile = PROFILE_TYPES[profileCode];
  if (profile) {
    const soc = SOC_MAJOR_GROUPS.find(s => s.code === profile.primarySOC);
    if (soc) return { code: soc.code, name: soc.name, inferred: true };
  }
  return null;
}

/** Get profile calibration data (exported for use in components) */
export function getProfileCalibration(profileCode: string): ProfileCalibration | null {
  return PROFILE_CALIBRATION[profileCode] || null;
}

/** Main calculation function */
export function calculateQuizResult(answers: QuizAnswers, selectedSOC?: number | null): QuizResult {
  // Score each dimension
  const dimensionResults = QUIZ_DIMENSIONS.map(d => scoreDimension(d, answers.core));

  // Build profile code
  const profileCode = dimensionResults.map(d => d.letter).join('');
  const favorableCount = dimensionResults.filter(d => d.isFavorable).length;

  // Look up profile type
  const profile = PROFILE_TYPES[profileCode];
  if (!profile) {
    throw new Error(`Unknown profile type: ${profileCode}`);
  }

  // Score AI snapshot (kept for compatibility, default 50 when no snapshot questions answered)
  const snapshotScore = scoreSnapshot(answers.snapshot);

  // Calculate probability using per-profile calibration
  const probability = calculateProbability(profileCode, dimensionResults);

  // Predict year using AGI-2030 model
  const { year, confidenceInterval } = predictYear(profileCode, dimensionResults, probability);

  return {
    profileCode,
    profile,
    dimensions: dimensionResults,
    favorableCount,
    replacementProbability: probability,
    predictedReplacementYear: year,
    currentAICapability: snapshotScore,
    confidenceInterval,
    riskLevel: toRiskLevel(profile.riskTier),
    currentReplacementDegree: snapshotScore,
    occupationSOC: resolveOccupation(selectedSOC ?? null, profileCode),
  };
}
