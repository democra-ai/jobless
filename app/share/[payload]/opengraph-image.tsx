import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type Props = { params: Promise<{ payload: string }> };

function pal(lv: SharePayload['riskLevel']) {
  const p: Record<string, { m: string }> = {
    'very-low': { m: '#34d399' }, 'low': { m: '#4ade80' }, 'medium': { m: '#fbbf24' },
    'high': { m: '#fb923c' }, 'critical': { m: '#f43f5e' },
  };
  return p[lv] || p.critical;
}

const profileArchetypes: Record<string, { en: string; zh: string; tagEn: string; tagZh: string }> = {
  EOFP: { en: 'The Glass Cannon', zh: '玻璃大炮', tagEn: 'Your entire workflow is a tutorial for AI', tagZh: '你的整个工作流程就是 AI 的教程' },
  EOFH: { en: 'The Human Bridge', zh: '人脉桥梁', tagEn: 'AI does the work, but they come back for YOU', tagZh: 'AI 能干活，但客户回来找的是你' },
  EORP: { en: 'The Final Stamp', zh: '终审印章', tagEn: 'AI knows the rules — you enforce the consequences', tagZh: 'AI 懂规则，你执行后果' },
  ESFP: { en: 'The Taste Maker', zh: '品味定义者', tagEn: 'AI generates a thousand options — you know which one is right', tagZh: 'AI 生成一千个选项，你知道哪个是对的' },
  TOFP: { en: 'The Bare Hand', zh: '赤手行者', tagEn: "Your hands know things your brain can't explain", tagZh: '你的双手懂得大脑无法解释的东西' },
  EORH: { en: 'The License Wall', zh: '执照之墙', tagEn: 'AI has the knowledge, but not the license on the wall', tagZh: 'AI 有知识，但墙上没有你的执照' },
  ESFH: { en: 'The Living Brand', zh: '活体品牌', tagEn: "AI can mimic your style, but it can't BE you", tagZh: 'AI 能模仿你的风格，但它成不了你' },
  ESRP: { en: 'The Pressure Alchemist', zh: '高压炼金师', tagEn: "When failure isn't an option, they call a human", tagZh: '当失败不是选项时，他们会找一个人类' },
  TOFH: { en: 'The Signature Touch', zh: '签名手艺人', tagEn: "People don't pay for the haircut — they pay for YOUR haircut", tagZh: '人们不是为理发买单——是为你的理发买单' },
  TORP: { en: 'The Steady Hand', zh: '不颤之手', tagEn: "One wrong move and it's over — that's why they need you", tagZh: '一步走错就完了——这就是为什么他们需要你' },
  TSFP: { en: 'The Soul Craftsman', zh: '灵魂匠人', tagEn: 'Your imperfections are what make your work perfect', tagZh: '你的不完美恰恰是作品完美的原因' },
  ESRH: { en: 'The Oracle', zh: '神谕者', tagEn: 'People trust your judgment with their careers, fortunes, and lives', tagZh: '人们把职业、财富和生命交给你的判断' },
  TORH: { en: 'The Healing Hand', zh: '疗愈之手', tagEn: 'When lives are on the line, no one asks for the AI', tagZh: '命悬一线时，没人想要 AI' },
  TSFH: { en: 'The Irreplaceable', zh: '不可替代者', tagEn: "You ARE the product — no one can automate who you are", tagZh: '你就是产品本身——没人能自动化你这个人' },
  TSRP: { en: 'The Last Call', zh: '终极裁决者', tagEn: 'In chaos, you decide who lives — AI freezes', tagZh: '混乱中，你决定谁活——AI 死机了' },
  TSRH: { en: 'The Iron Fortress', zh: '铁壁堡垒', tagEn: "Four walls between you and AI — it can't even see you", tagZh: '你和 AI 之间隔着四道墙——它连你的影子都看不到' },
};

const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];
const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];
const dimNames: Record<string, { en: string; zh: string }> = {
  E: { en: 'Learnability', zh: '知识类型' }, T: { en: 'Learnability', zh: '知识类型' },
  O: { en: 'Evaluation', zh: '评判标准' }, S: { en: 'Evaluation', zh: '评判标准' },
  F: { en: 'Risk', zh: '容错空间' }, R: { en: 'Risk', zh: '容错空间' },
  P: { en: 'Presence', zh: '人际依赖' }, H: { en: 'Presence', zh: '人际依赖' },
};

const spData: Record<string, { en: string; zh: string }> = {
  EOFP: { en: 'Efficient, fast execution', zh: '高效快速执行' }, EOFH: { en: 'Human connection + trust', zh: '人脉连接与信任' },
  EORP: { en: 'Legal accountability shield', zh: '法律责任护盾' }, ESFP: { en: 'Aesthetic taste & judgment', zh: '审美品味与判断' },
  TOFP: { en: 'Physical muscle memory', zh: '身体肌肉记忆' }, EORH: { en: 'Regulatory moat', zh: '法规护城河' },
  ESFH: { en: 'Personal brand identity', zh: '个人品牌辨识度' }, ESRP: { en: 'High-stakes decision making', zh: '高风险决策力' },
  TOFH: { en: 'Touch + personal bond', zh: '触感+人际纽带' }, TORP: { en: 'Zero-error physical precision', zh: '零容错精密操作' },
  TSFP: { en: 'Unique handmade signature', zh: '独特手作印记' }, ESRH: { en: 'Decades of trusted judgment', zh: '数十年信任判断' },
  TORH: { en: 'Healing hands + trust', zh: '治愈之手+信任' }, TSFH: { en: 'YOU are the product', zh: '你就是产品本身' },
  TSRP: { en: 'Chaos → order under pressure', zh: '混乱中的秩序决策' }, TSRH: { en: 'All 4 barriers active', zh: '四重壁垒全激活' },
};
const kpData: Record<string, { en: string; zh: string }> = {
  EOFP: { en: 'All skills are learnable', zh: '所有技能可被学习' }, EOFH: { en: 'AI learning personalization', zh: 'AI 学会个性化' },
  EORP: { en: 'Regulation may change', zh: '法规可能会变' }, ESFP: { en: 'AI taste is improving', zh: 'AI 审美在进步' },
  TOFP: { en: 'Robotics advancing fast', zh: '机器人快速进步' }, EORH: { en: 'License rules may loosen', zh: '执照规则可能放松' },
  ESFH: { en: 'AI deepfakes improving', zh: 'AI 深度伪造进步' }, ESRP: { en: 'AI risk models improving', zh: 'AI 风险模型进步' },
  TOFH: { en: 'Client loyalty can shift', zh: '客户忠诚可能转移' }, TORP: { en: 'Surgical robots advancing', zh: '手术机器人在进步' },
  TSFP: { en: 'Mass customization growing', zh: '大规模定制增长' }, ESRH: { en: 'World is changing around you', zh: '世界在你周围变化' },
  TORH: { en: 'Remote diagnosis improving', zh: '远程诊断在进步' }, TSFH: { en: 'Attention economy shifting', zh: '注意力经济在变' },
  TSRP: { en: 'AI getting better at chaos', zh: 'AI 在混乱中进步' }, TSRH: { en: 'Post-singularity unknown', zh: '后奇点未知' },
};

// Action item titles for each profile (top 3)
const actionData: Record<string, { en: string[]; zh: string[] }> = {
  EOFP: { en: ['Protect Your Data', 'Build Tacit Skills', 'Sharpen Your Taste'], zh: ['保护你的数据隐私', '深化隐性技能', '锻造独特审美'] },
  EOFH: { en: ['Protect Your Data', 'Deepen Client Bonds', 'Build Unique Value'], zh: ['保护你的数据隐私', '深化客户关系', '建立独特价值'] },
  EORP: { en: ['Protect Your Data', 'Stay Compliance-Current', 'Build Decision Authority'], zh: ['保护你的数据隐私', '紧跟合规变化', '建立决策权威'] },
  ESFP: { en: ['Protect Your Data', 'Sharpen Your Taste', 'Build Personal Brand'], zh: ['保护你的数据隐私', '锻造独特审美', '打造个人品牌'] },
  TOFP: { en: ['Protect Your Data', 'Deepen Tacit Skills', 'Cross-Train Physically'], zh: ['保护你的数据隐私', '深化隐性技能', '交叉训练体能'] },
  EORH: { en: ['Protect Your Data', 'Diversify Credentials', 'Build Trust Networks'], zh: ['保护你的数据隐私', '多元化资质', '建立信任网络'] },
  ESFH: { en: ['Protect Your Data', 'Strengthen Your Brand', 'Diversify Platforms'], zh: ['保护你的数据隐私', '强化个人品牌', '多元化平台'] },
  ESRP: { en: ['Protect Your Data', 'Document Edge Cases', 'Build Decision Track Record'], zh: ['保护你的数据隐私', '记录边界案例', '建立决策记录'] },
  TOFH: { en: ['Protect Your Data', 'Deepen Client Bonds', 'Expand Signature Skills'], zh: ['保护你的数据隐私', '深化客户关系', '拓展标志性技能'] },
  TORP: { en: ['Protect Your Data', 'Master Edge Scenarios', 'Stay Physically Sharp'], zh: ['保护你的数据隐私', '精通极端场景', '保持身体敏锐'] },
  TSFP: { en: ['Protect Your Data', 'Deepen Your Craft', 'Tell Your Story'], zh: ['保护你的数据隐私', '深化你的工艺', '讲述你的故事'] },
  ESRH: { en: ['Protect Your Data', 'Codify Your Judgment', 'Mentor Next Generation'], zh: ['保护你的数据隐私', '编纂你的判断', '指导下一代'] },
  TORH: { en: ['Protect Your Data', 'Deepen Patient Trust', 'Stay Hands-On'], zh: ['保护你的数据隐私', '深化患者信任', '保持亲力亲为'] },
  TSFH: { en: ['Protect Your Data', 'Amplify Your Presence', 'Create Irreplaceable Moments'], zh: ['保护你的数据隐私', '放大你的存在感', '创造不可替代时刻'] },
  TSRP: { en: ['Protect Your Data', 'Train in Chaos', 'Build Command Authority'], zh: ['保护你的数据隐私', '在混乱中训练', '建立指挥权威'] },
  TSRH: { en: ['Protect Your Data', 'Deepen Tacit Skills', 'Sharpen Your Taste'], zh: ['保护你的数据隐私', '深化你的隐性技能', '锻造独特审美'] },
};

async function loadCharImg(code: string): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), 'public', 'characters', `${code}.png`));
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch { return null; }
}

export default async function Image({ params }: Props) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#0a0908', color: '#f5f3f0', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
      </div>, { ...size },
    );
  }

  const zh = data.lang === 'zh';
  const c = pal(data.riskLevel);
  const prob = data.replacementProbability;
  const yr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const pc = (data.v === 2 && 'profileCode' in data && data.profileCode) || null;
  const arch = pc ? profileArchetypes[pc] : null;
  const charImg = pc ? await loadCharImg(pc) : null;
  const sp = pc ? spData[pc] : null;
  const kp = pc ? kpData[pc] : null;
  const actions = pc ? actionData[pc] : null;
  const dims = pc ? pc.split('').map((l, i) => ({ l, name: dimNames[l]?.[zh ? 'zh' : 'en'] ?? '', color: DIMENSION_COLORS[i] })) : [];

  const stages = [
    { label: 'SAFE', zh: '安全', color: '#34d399' },
    { label: 'ASSIST', zh: '辅助', color: '#4ade80' },
    { label: 'AGENT', zh: '代理', color: '#fbbf24' },
    { label: 'LEAD', zh: '主导', color: '#fb923c' },
    { label: 'KILL', zh: '斩杀', color: '#f43f5e' },
  ];

  const P = 32; // padding

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#0f0d0b', fontFamily: 'sans-serif', color: '#f5f3f0', padding: `${P}px ${P + 8}px`, position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <div style={{ position: 'absolute', top: -50, right: '25%', width: 350, height: 250, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.m}0c 0%, transparent 65%)` }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 3, height: 14, background: c.m, display: 'flex' }} />
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 3, color: c.m }}>AI REPLACEMENT INDEX</span>
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>air.democra.ai</span>
      </div>

      {/* Hero: Char + Identity + Metrics */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 14 }}>
        {charImg && (
          <div style={{ width: 120, height: 120, flexShrink: 0, display: 'flex', borderRadius: 12, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={charImg} alt="" width={120} height={120} style={{ objectFit: 'cover' }} />
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {arch && <span style={{ fontSize: 36, fontWeight: 900, color: c.m, lineHeight: 1 }}>{zh ? arch.zh : arch.en}</span>}
          {pc && <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 5, color: `${c.m}50`, marginTop: 3 }}>{pc}</span>}
          {arch && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6, lineHeight: 1.3 }}>{zh ? arch.tagZh : arch.tagEn}</span>}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 44, fontWeight: 700, color: c.m, lineHeight: 1 }}>{prob}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: `${c.m}70`, marginLeft: 2 }}>%</span>
            </div>
            <div style={{ width: 1, height: 32, display: 'flex', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 44, fontWeight: 700, color: '#f5f3f0', lineHeight: 1 }}>{yr}</span>
              {data.predictedReplacementYear < 2100 && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{data.earliestYear}–{data.latestYear}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Gauge */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 10 }}>
        {stages.map((s, i) => {
          const start = i * 20, end = start + 20;
          const f = prob >= end ? 1 : prob <= start ? 0 : (prob - start) / 20;
          const active = Math.min(Math.floor(prob / 20), 4) === i;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{ width: '100%', height: 6, borderRadius: 3, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                {f > 0 && <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 3, display: 'flex', background: s.color }} />}
              </div>
              <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: 2, color: active ? s.color : 'rgba(255,255,255,0.1)' }}>{zh ? s.zh : s.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.05)', marginBottom: 10 }} />

      {/* Dimensions (full width) */}
      {dims.length === 4 && (
        <div style={{ display: 'flex', marginBottom: 10 }}>
          {dims.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: i > 0 ? 12 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ width: 20, height: 3, borderRadius: 2, background: d.color, opacity: 0.7, display: 'flex', marginBottom: 4 }} />
              <span style={{ fontSize: 18, fontWeight: 700, color: d.color, lineHeight: 1 }}>{d.l}</span>
              <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginTop: 3 }}>{d.name}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.04)', marginBottom: 10 }} />

      {/* Superpower + Kryptonite (2-col) */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 10 }}>
        {sp && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <div style={{ width: 3, height: 10, borderRadius: 2, background: '#34d399', display: 'flex' }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: '#34d399bb' }}>{zh ? '超能力' : 'SUPERPOWER'}</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, paddingLeft: 8 }}>{zh ? sp.zh : sp.en}</span>
          </div>
        )}
        {kp && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
              <div style={{ width: 3, height: 10, borderRadius: 2, background: '#f43f5e', display: 'flex' }} />
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: '#f43f5ebb' }}>{zh ? '弱点' : 'WEAKNESS'}</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, paddingLeft: 8 }}>{zh ? kp.zh : kp.en}</span>
          </div>
        )}
      </div>

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.04)', marginBottom: 10 }} />

      {/* Action items (3-col) */}
      {actions && (
        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
          {(zh ? actions.zh : actions.en).slice(0, 3).map((title, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: i === 0 ? c.m : 'rgba(255,255,255,0.2)', marginTop: 1 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', lineHeight: 1.3 }}>{title}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ display: 'flex', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px 0', borderRadius: 10, background: c.m }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#0a0908' }}>{zh ? '测测你的风险 →' : "What's your risk? →"}</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
