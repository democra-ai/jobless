/**
 * AIR Personalized Advice
 *
 * Generates advice based on the user's 4-dimension profile.
 * Each dimension that is AI-favorable gets a defensive suggestion.
 * Each dimension that is AI-resistant gets a reinforcement suggestion.
 * Data privacy advice is always included.
 */

export interface Advice {
  icon: string; // emoji
  title: { en: string; zh: string };
  body: { en: string; zh: string };
}

/** Advice when a dimension is AI-FAVORABLE (user is vulnerable on this axis) */
const FAVORABLE_ADVICE: Record<string, Advice> = {
  learnability: {
    // E = Explicit: knowledge is transparent, AI can learn it
    icon: '📚',
    title: { en: 'Build Tacit Expertise', zh: '积累隐性经验' },
    body: {
      en: 'Your work knowledge is largely explicit and digitized — AI learns this fastest. Invest in skills that require physical presence, intuition, or years of hands-on experience that can\'t be captured in documentation.',
      zh: '你的工作知识主要是显性和数字化的——这是AI学得最快的部分。投资于需要身体在场、直觉或多年实操经验的技能，这些无法被文档化。',
    },
  },
  evaluation: {
    // O = Objective: clear evaluation standards
    icon: '🎯',
    title: { en: 'Cultivate Subjective Judgment', zh: '培养主观判断力' },
    body: {
      en: 'Your work is evaluated by clear, measurable standards — which AI can optimize for directly. Develop taste, creative judgment, and the ability to define "good" rather than just execute on predefined metrics.',
      zh: '你的工作以明确、可量化的标准评估——AI可以直接为此优化。培养品味、创意判断力，以及定义"好"的能力，而不只是执行预设指标。',
    },
  },
  risk: {
    // F = Flexible: errors are tolerable/fixable
    icon: '⚠️',
    title: { en: 'Move Toward High-Stakes Work', zh: '转向高风险决策领域' },
    body: {
      en: 'Your work tolerates errors and iteration — AI thrives in trial-and-error environments. Seek roles where mistakes carry real consequences (safety, legal, financial) — organizations keep humans where the cost of failure is high.',
      zh: '你的工作容忍错误和试错——AI在试错环境中如鱼得水。寻找错误代价高昂的岗位（安全、法律、金融方向）——组织会在失败成本高的地方保留人。',
    },
  },
  presence: {
    // P = Product: only results matter, not who does it
    icon: '🤝',
    title: { en: 'Build Human Relationships', zh: '建立人际信任纽带' },
    body: {
      en: 'Your work is judged purely by output — AI can produce results anonymously. Shift toward roles where clients, patients, or stakeholders trust YOU specifically. Personal reputation and relationships are your strongest moat.',
      zh: '你的工作纯粹以产出论——AI可以匿名产出结果。转向客户、患者或利益相关者信任你本人的岗位。个人声誉和关系是你最强的护城河。',
    },
  },
};

/** Advice when a dimension is AI-RESISTANT (user has an advantage) */
const RESISTANT_ADVICE: Record<string, Advice> = {
  learnability: {
    // T = Tacit: knowledge is experiential, hard to digitize
    icon: '🛡️',
    title: { en: 'Deepen Your Tacit Skills', zh: '深化你的隐性技能' },
    body: {
      en: 'Your work relies on experiential knowledge that AI can\'t easily acquire. Keep investing in hands-on mastery — the gap between your physical/intuitive skills and AI\'s capabilities is your biggest advantage.',
      zh: '你的工作依赖AI难以获取的经验知识。持续投资于实操精进——你的身体/直觉技能与AI能力之间的差距是你最大的优势。',
    },
  },
  evaluation: {
    // S = Subjective: quality is in the eye of the beholder
    icon: '✨',
    title: { en: 'Sharpen Your Unique Taste', zh: '锻造独特审美' },
    body: {
      en: 'Your work is judged subjectively — this is hard for AI to optimize. Keep developing your personal aesthetic, creative voice, or professional philosophy. The more distinctive your judgment, the harder you are to replace.',
      zh: '你的工作以主观标准评判——AI难以优化这一点。持续发展个人审美、创作风格或专业哲学。你的判断越独特，越难被替代。',
    },
  },
  risk: {
    // R = Rigid: errors are irreversible/costly
    icon: '🔒',
    title: { en: 'Leverage Your Accountability', zh: '利用你的责任壁垒' },
    body: {
      en: 'Your work involves irreversible consequences — organizations are slow to trust AI here. Pursue certifications, licenses, and formal authority that make you the accountable decision-maker in high-stakes scenarios.',
      zh: '你的工作涉及不可逆后果——组织在这方面不会轻易信任AI。考取认证、执照，获取正式权限，成为高风险场景中的责任决策人。',
    },
  },
  presence: {
    // H = Human: the person matters, not just the output
    icon: '💬',
    title: { en: 'Strengthen Personal Bonds', zh: '强化个人连接' },
    body: {
      en: 'People come to you for YOU — this is your strongest defense. Invest in deepening client relationships, building your personal brand, and becoming indispensable through trust, not just skill.',
      zh: '人们因为"你"而来——这是你最强的防线。投资于深化客户关系、打造个人品牌，通过信任而非仅凭技能变得不可替代。',
    },
  },
};

/** Data privacy advice — always included */
const DATA_PRIVACY_ADVICE: Advice = {
  icon: '🔐',
  title: { en: 'Protect Your Data', zh: '保护你的数据隐私' },
  body: {
    en: 'Your work experience, workflows, and domain knowledge are being used to train AI models that could replace you. Be cautious about what you share on AI platforms — every prompt, every document uploaded, every workflow described becomes training data. Guard your proprietary methods.',
    zh: '你的工作经验、工作流程和领域知识正被用于训练可能替代你的AI模型。谨慎对待你在AI平台上分享的内容——每一次提示、每一份上传的文档、每一个描述的工作流程都会成为训练数据。保护好你的独有方法。',
  },
};

/** Generate personalized advice based on dimension results */
export function generateAdvice(
  dimensions: Array<{ dimensionId: string; isFavorable: boolean }>,
): Advice[] {
  const advice: Advice[] = [];

  for (const dim of dimensions) {
    const pool = dim.isFavorable ? FAVORABLE_ADVICE : RESISTANT_ADVICE;
    const entry = pool[dim.dimensionId];
    if (entry) advice.push(entry);
  }

  // Always add data privacy advice last
  advice.push(DATA_PRIVACY_ADVICE);

  return advice;
}
