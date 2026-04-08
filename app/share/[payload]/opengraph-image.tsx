import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type Props = { params: Promise<{ payload: string }> };

function pal(lv: SharePayload['riskLevel']) {
  const p: Record<string, { m: string; a: string }> = {
    'very-low': { m: '#34d399', a: '#059669' },
    'low':      { m: '#4ade80', a: '#16a34a' },
    'medium':   { m: '#fbbf24', a: '#d97706' },
    'high':     { m: '#fb923c', a: '#ea580c' },
    'critical': { m: '#f43f5e', a: '#dc2626' },
  };
  return p[lv] || p.critical;
}

function riskLabel(lv: SharePayload['riskLevel'], zh: boolean) {
  const m: Record<string, [string, string]> = {
    'very-low': ['VERY LOW RISK', '极低风险'], 'low': ['LOW RISK', '低风险'], 'medium': ['MEDIUM RISK', '中等风险'],
    'high': ['HIGH RISK', '高风险'], 'critical': ['CRITICAL RISK', '极高风险'],
  };
  return (m[lv] || m.critical)[zh ? 1 : 0];
}

const profileArchetypes: Record<string, { en: string; zh: string; icon: string; tagEn: string; tagZh: string }> = {
  EOFP: { en: 'The Glass Cannon', zh: '玻璃大炮', icon: '🎯', tagEn: 'Your entire workflow is a tutorial for AI', tagZh: '你的整个工作流程就是 AI 的教程' },
  EOFH: { en: 'The Human Bridge', zh: '人脉桥梁', icon: '🤝', tagEn: 'AI does the work, but they come back for YOU', tagZh: 'AI 能干活，但客户回来找的是你' },
  EORP: { en: 'The Final Stamp', zh: '终审印章', icon: '🛡️', tagEn: 'AI knows the rules — you enforce the consequences', tagZh: 'AI 懂规则，你执行后果' },
  ESFP: { en: 'The Taste Maker', zh: '品味定义者', icon: '🎨', tagEn: 'AI generates a thousand options — you know which one is right', tagZh: 'AI 生成一千个选项，你知道哪个是对的' },
  TOFP: { en: 'The Bare Hand', zh: '赤手行者', icon: '🔧', tagEn: "Your hands know things your brain can't explain", tagZh: '你的双手懂得大脑无法解释的东西' },
  EORH: { en: 'The License Wall', zh: '执照之墙', icon: '📜', tagEn: 'AI has the knowledge, but not the license on the wall', tagZh: 'AI 有知识，但墙上没有你的执照' },
  ESFH: { en: 'The Living Brand', zh: '活体品牌', icon: '⭐', tagEn: "AI can mimic your style, but it can't BE you", tagZh: 'AI 能模仿你的风格，但它成不了你' },
  ESRP: { en: 'The Pressure Alchemist', zh: '高压炼金师', icon: '⚗️', tagEn: "When failure isn't an option, they call a human", tagZh: '当失败不是选项时，他们会找一个人类' },
  TOFH: { en: 'The Signature Touch', zh: '签名手艺人', icon: '✂️', tagEn: "People don't pay for the haircut — they pay for YOUR haircut", tagZh: '人们不是为理发买单——是为你的理发买单' },
  TORP: { en: 'The Steady Hand', zh: '不颤之手', icon: '🎯', tagEn: "One wrong move and it's over — that's why they need you", tagZh: '一步走错就完了——这就是为什么他们需要你' },
  TSFP: { en: 'The Soul Craftsman', zh: '灵魂匠人', icon: '🏺', tagEn: 'Your imperfections are what make your work perfect', tagZh: '你的不完美恰恰是作品完美的原因' },
  ESRH: { en: 'The Oracle', zh: '神谕者', icon: '🔮', tagEn: 'People trust your judgment with their careers, fortunes, and lives', tagZh: '人们把职业、财富和生命交给你的判断' },
  TORH: { en: 'The Healing Hand', zh: '疗愈之手', icon: '🫀', tagEn: 'When lives are on the line, no one asks for the AI', tagZh: '命悬一线时，没人想要 AI' },
  TSFH: { en: 'The Irreplaceable', zh: '不可替代者', icon: '🦋', tagEn: "You ARE the product — no one can automate who you are", tagZh: '你就是产品本身——没人能自动化你这个人' },
  TSRP: { en: 'The Last Call', zh: '终极裁决者', icon: '⚡', tagEn: 'In chaos, you decide who lives — AI freezes', tagZh: '混乱中，你决定谁活——AI 死机了' },
  TSRH: { en: 'The Iron Fortress', zh: '铁壁堡垒', icon: '🏰', tagEn: "Four walls between you and AI — it can't even see you", tagZh: '你和 AI 之间隔着四道墙——它连你的影子都看不到' },
};

const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];
const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];
const dimNames: Record<string, { en: string; zh: string }> = {
  E: { en: 'Learnability', zh: '知识类型' }, T: { en: 'Learnability', zh: '知识类型' },
  O: { en: 'Evaluation', zh: '评判标准' }, S: { en: 'Evaluation', zh: '评判标准' },
  F: { en: 'Risk', zh: '容错空间' }, R: { en: 'Risk', zh: '容错空间' },
  P: { en: 'Presence', zh: '人际依赖' }, H: { en: 'Presence', zh: '人际依赖' },
};

const superpowerData: Record<string, { en: string; zh: string }> = {
  EOFP: { en: 'Efficient, fast execution', zh: '高效快速执行' }, EOFH: { en: 'Human connection + trust', zh: '人脉连接与信任' },
  EORP: { en: 'Legal accountability shield', zh: '法律责任护盾' }, ESFP: { en: 'Aesthetic taste & judgment', zh: '审美品味与判断' },
  TOFP: { en: 'Physical muscle memory', zh: '身体肌肉记忆' }, EORH: { en: 'Regulatory moat', zh: '法规护城河' },
  ESFH: { en: 'Personal brand identity', zh: '个人品牌辨识度' }, ESRP: { en: 'High-stakes decision making', zh: '高风险决策力' },
  TOFH: { en: 'Touch + personal bond', zh: '触感+人际纽带' }, TORP: { en: 'Zero-error physical precision', zh: '零容错精密操作' },
  TSFP: { en: 'Unique handmade signature', zh: '独特手作印记' }, ESRH: { en: 'Decades of trusted judgment', zh: '数十年信任判断' },
  TORH: { en: 'Healing hands + trust', zh: '治愈之手+信任' }, TSFH: { en: 'YOU are the product', zh: '你就是产品本身' },
  TSRP: { en: 'Chaos → order under pressure', zh: '混乱中的秩序决策' }, TSRH: { en: 'All 4 barriers active', zh: '四重壁垒全激活' },
};

const kryptoniteData: Record<string, { en: string; zh: string }> = {
  EOFP: { en: 'All skills are learnable', zh: '所有技能可被学习' }, EOFH: { en: 'AI learning personalization', zh: 'AI 学会个性化' },
  EORP: { en: 'Regulation may change', zh: '法规可能会变' }, ESFP: { en: 'AI taste is improving', zh: 'AI 审美在进步' },
  TOFP: { en: 'Robotics advancing fast', zh: '机器人快速进步' }, EORH: { en: 'License rules may loosen', zh: '执照规则可能放松' },
  ESFH: { en: 'AI deepfakes improving', zh: 'AI 深度伪造进步' }, ESRP: { en: 'AI risk models improving', zh: 'AI 风险模型进步' },
  TOFH: { en: 'Client loyalty can shift', zh: '客户忠诚可能转移' }, TORP: { en: 'Surgical robots advancing', zh: '手术机器人在进步' },
  TSFP: { en: 'Mass customization growing', zh: '大规模定制增长' }, ESRH: { en: 'World is changing around you', zh: '世界在你周围变化' },
  TORH: { en: 'Remote diagnosis improving', zh: '远程诊断在进步' }, TSFH: { en: 'Attention economy shifting', zh: '注意力经济在变' },
  TSRP: { en: 'AI getting better at chaos', zh: 'AI 在混乱中进步' }, TSRH: { en: 'Post-singularity unknown', zh: '后奇点未知' },
};

export default async function Image({ params }: Props) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#0a0908', color: '#f5f3f0', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
        <span style={{ fontSize: 22, opacity: 0.4, marginTop: 14, letterSpacing: 4 }}>AI REPLACEMENT INDEX</span>
      </div>, { ...size },
    );
  }

  const zh = data.lang === 'zh';
  const c = pal(data.riskLevel);
  const prob = data.replacementProbability;
  const yr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const profileCode = (data.v === 2 && 'profileCode' in data && data.profileCode) || null;
  const arch = profileCode ? profileArchetypes[profileCode] : null;
  const archName = arch ? (zh ? arch.zh : arch.en) : null;
  const tagline = arch ? (zh ? arch.tagZh : arch.tagEn) : null;
  const profileIcon = arch?.icon ?? null;
  const sp = profileCode ? superpowerData[profileCode] : null;
  const kp = profileCode ? kryptoniteData[profileCode] : null;

  const dims = profileCode
    ? profileCode.split('').map((letter, i) => ({ letter, name: dimNames[letter]?.[zh ? 'zh' : 'en'] ?? '', color: DIMENSION_COLORS[i] }))
    : [];

  const stages = [
    { label: 'SAFE', zh: '安全', color: '#34d399' },
    { label: 'ASSIST', zh: '辅助', color: '#4ade80' },
    { label: 'AGENT', zh: '代理', color: '#fbbf24' },
    { label: 'LEAD', zh: '主导', color: '#fb923c' },
    { label: 'KILL', zh: '斩杀', color: '#f43f5e' },
  ];

  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#0f0d0b', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden', color: '#f5f3f0',
      padding: '32px 40px 28px',
    }}>
      {/* Subtle glow */}
      <div style={{ position: 'absolute', top: -60, right: '20%', width: 400, height: 300, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.m}0c 0%, transparent 65%)` }} />

      {/* ── ROW 1: Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 3, height: 16, background: c.m, display: 'flex' }} />
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 4, color: c.m }}>AI REPLACEMENT INDEX</span>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>air.democra.ai</span>
      </div>

      {/* ── ROW 2: Hero — Icon + Identity + Metrics ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 20 }}>
        {profileIcon && (
          <div style={{ width: 110, height: 110, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 20, background: `${c.m}12`, border: `1.5px solid ${c.m}25` }}>
            <span style={{ fontSize: 60 }}>{profileIcon}</span>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {archName && (
            <span style={{ fontSize: 40, fontWeight: 900, color: c.m, lineHeight: 1, letterSpacing: -0.5 }}>{archName}</span>
          )}
          {profileCode && (
            <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 5, color: `${c.m}55`, marginTop: 4 }}>{profileCode}</span>
          )}
          {tagline && (
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 8, lineHeight: 1.4 }}>{tagline}</span>
          )}
          {/* Inline metrics */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: c.m, lineHeight: 1 }}>{prob}</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: `${c.m}70`, marginLeft: 2 }}>%</span>
            </div>
            <div style={{ width: 1, height: 36, display: 'flex', background: 'rgba(255,255,255,0.06)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 48, fontWeight: 700, color: '#f5f3f0', lineHeight: 1 }}>{yr}</span>
              {data.predictedReplacementYear < 2100 && (
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 }}>{data.earliestYear}–{data.latestYear}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 3: Gauge ── */}
      <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
        {stages.map((stage, i) => {
          const s = i * 20, e = s + 20;
          const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
          const active = Math.min(Math.floor(prob / 20), 4) === i;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: '100%', height: 6, borderRadius: 3, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                {f > 0 && <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 3, display: 'flex', background: stage.color }} />}
              </div>
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: active ? stage.color : 'rgba(255,255,255,0.12)' }}>
                {zh ? stage.zh : stage.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.06)', marginBottom: 12 }} />

      {/* ── ROW 4: 4-Dimension strip (full width) ── */}
      {dims.length === 4 && (
        <div style={{ display: 'flex', gap: 0, marginBottom: 12 }}>
          {dims.map((dim, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: i > 0 ? 14 : 0, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ width: 22, height: 3, borderRadius: 2, background: dim.color, opacity: 0.7, display: 'flex', marginBottom: 5 }} />
              <span style={{ fontSize: 20, fontWeight: 700, color: dim.color, lineHeight: 1 }}>{dim.letter}</span>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: 1, marginTop: 3 }}>{dim.name}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 1, display: 'flex', background: 'rgba(255,255,255,0.04)', marginBottom: 14 }} />

      {/* ── ROW 5: Superpower + Kryptonite (2-col) ── */}
      <div style={{ display: 'flex', gap: 28, flex: 1 }}>
        {sp && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: '#34d399', display: 'flex' }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: '#34d399cc' }}>{zh ? '超能力' : 'SUPERPOWER'}</span>
            </div>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, paddingLeft: 9 }}>{zh ? sp.zh : sp.en}</span>
          </div>
        )}
        {kp && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 3, height: 14, borderRadius: 2, background: '#f43f5e', display: 'flex' }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: '#f43f5ecc' }}>{zh ? '弱点' : 'WEAKNESS'}</span>
            </div>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, paddingLeft: 9 }}>{zh ? kp.zh : kp.en}</span>
          </div>
        )}
      </div>

      {/* ── ROW 6: CTA (full width) ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '14px 0', borderRadius: 12, background: c.m }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#0a0908' }}>
            {zh ? '测测你的风险 →' : "What's your risk? →"}
          </span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
