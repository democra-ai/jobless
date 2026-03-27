import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type Props = { params: Promise<{ payload: string }> };

function pal(lv: SharePayload['riskLevel']) {
  const p: Record<string, { m: string; a: string; g: string }> = {
    'very-low': { m: '#34d399', a: '#06b6d4', g: '#059669' },
    'low':      { m: '#4ade80', a: '#22d3ee', g: '#16a34a' },
    'medium':   { m: '#fbbf24', a: '#f97316', g: '#d97706' },
    'high':     { m: '#fb923c', a: '#f43f5e', g: '#ea580c' },
    'critical': { m: '#f43f5e', a: '#a855f7', g: '#dc2626' },
  };
  return p[lv] || p.critical;
}

function riskLabel(lv: SharePayload['riskLevel'], zh: boolean) {
  const m: Record<string, [string, string]> = {
    'very-low': ['VERY LOW', '极低'], 'low': ['LOW', '低'], 'medium': ['MEDIUM', '中等'],
    'high': ['HIGH', '高'], 'critical': ['CRITICAL', '极高'],
  };
  return (m[lv] || m.critical)[zh ? 1 : 0];
}

/* grid helper */
function HLines({ n, gap }: { n: number; gap: number }) {
  return <>{Array.from({ length: n }).map((_, i) => (
    <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * gap, height: 1, display: 'flex', background: 'rgba(255,255,255,0.07)' }} />
  ))}</>;
}
function VLines({ n, gap }: { n: number; gap: number }) {
  return <>{Array.from({ length: n }).map((_, i) => (
    <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: i * gap, width: 1, display: 'flex', background: 'rgba(255,255,255,0.07)' }} />
  ))}</>;
}

export default async function Image({ params }: Props) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#06080e', color: '#fafafa', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
        <span style={{ fontSize: 22, opacity: 0.4, marginTop: 14, letterSpacing: 4 }}>AI REPLACEMENT INDEX</span>
      </div>, { ...size },
    );
  }

  const zh = data.lang === 'zh';
  const c = pal(data.riskLevel);
  const lb = riskLabel(data.riskLevel, zh);
  const prob = data.replacementProbability;
  const yr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const stages = ['SAFE', 'ASSIST', 'AGENT', 'LEAD', 'KILL'];

  // ── Marketing data ──
  const currentYear = new Date().getFullYear();
  const yearsLeft = data.predictedReplacementYear >= 2100 ? null : data.predictedReplacementYear - currentYear;
  const percentileSafe = 100 - prob;

  // Profile code from payload or fallback
  const profileCode = (data.v === 2 && 'profileCode' in data && data.profileCode) || null;
  const favorableLetters = ['E', 'O', 'F', 'P'];
  const dimMeta: Record<string, { en: string; zh: string }> = {
    E: { en: 'Explicit', zh: '显性型' }, T: { en: 'Tacit', zh: '隐性型' },
    O: { en: 'Objective', zh: '客观型' }, S: { en: 'Subjective', zh: '主观型' },
    F: { en: 'Flexible', zh: '弹性型' }, R: { en: 'Rigid', zh: '刚性型' },
    P: { en: 'Product', zh: '对事型' }, H: { en: 'Human', zh: '对人型' },
  };
  const dims = profileCode
    ? profileCode.split('').map((letter, i) => ({
        v: letter,
        name: dimMeta[letter]?.[zh ? 'zh' : 'en'] ?? letter,
        risky: letter === favorableLetters[i],
      }))
    : [
        { v: 'E', name: zh ? '显性型' : 'Explicit', risky: true },
        { v: 'O', name: zh ? '客观型' : 'Objective', risky: true },
        { v: 'F', name: zh ? '弹性型' : 'Flexible', risky: true },
        { v: 'H', name: zh ? '对人型' : 'Human', risky: false },
      ];

  // Profile archetype name + icon + tagline lookup (must match PROFILE_TYPES in air_quiz_data.ts)
  const profileArchetypes: Record<string, { en: string; zh: string; icon: string; tagEn: string; tagZh: string }> = {
    EOFP: { en: 'The Glass Cannon', zh: '玻璃大炮', icon: '🎯', tagEn: 'Your entire workflow is a tutorial for AI', tagZh: '你的整个工作流程就是 AI 的教程' },
    EOFH: { en: 'The Human Bridge', zh: '人脉桥梁', icon: '🤝', tagEn: 'AI does the work, but they come back for YOU', tagZh: 'AI 能干活，但客户回来找的是你' },
    EORP: { en: 'The Final Stamp', zh: '终审印章', icon: '🛡️', tagEn: 'AI knows the rules — you enforce the consequences', tagZh: 'AI 懂规则，你执行后果' },
    ESFP: { en: 'The Taste Maker', zh: '品味定义者', icon: '🎨', tagEn: 'AI generates a thousand options — you know which one is right', tagZh: 'AI 生成一千个选项，你知道哪个是对的' },
    TOFP: { en: 'The Bare Hand', zh: '赤手行者', icon: '🔧', tagEn: 'Your hands know things your brain can\'t explain', tagZh: '你的双手懂得大脑无法解释的东西' },
    EORH: { en: 'The License Wall', zh: '执照之墙', icon: '📜', tagEn: 'AI has the knowledge, but not the license on the wall', tagZh: 'AI 有知识，但墙上没有你的执照' },
    ESFH: { en: 'The Living Brand', zh: '活体品牌', icon: '⭐', tagEn: 'AI can mimic your style, but it can\'t BE you', tagZh: 'AI 能模仿你的风格，但它成不了你' },
    ESRP: { en: 'The Pressure Alchemist', zh: '高压炼金师', icon: '⚗️', tagEn: 'When failure isn\'t an option, they call a human', tagZh: '当失败不是选项时，他们会找一个人类' },
    TOFH: { en: 'The Signature Touch', zh: '签名手艺人', icon: '✂️', tagEn: 'People don\'t pay for the haircut — they pay for YOUR haircut', tagZh: '人们不是为理发买单——是为你的理发买单' },
    TORP: { en: 'The Steady Hand', zh: '不颤之手', icon: '🎯', tagEn: 'One wrong move and it\'s over — that\'s why they need you', tagZh: '一步走错就完了——这就是为什么他们需要你' },
    TSFP: { en: 'The Soul Craftsman', zh: '灵魂匠人', icon: '🏺', tagEn: 'Your imperfections are what make your work perfect', tagZh: '你的不完美恰恰是作品完美的原因' },
    ESRH: { en: 'The Oracle', zh: '神谕者', icon: '🔮', tagEn: 'People trust your judgment with their careers, fortunes, and lives', tagZh: '人们把职业、财富和生命交给你的判断' },
    TORH: { en: 'The Healing Hand', zh: '疗愈之手', icon: '🫀', tagEn: 'When lives are on the line, no one asks for the AI', tagZh: '命悬一线时，没人想要 AI' },
    TSFH: { en: 'The Irreplaceable', zh: '不可替代者', icon: '🦋', tagEn: 'You ARE the product — no one can automate who you are', tagZh: '你就是产品本身——没人能自动化你这个人' },
    TSRP: { en: 'The Last Call', zh: '终极裁决者', icon: '⚡', tagEn: 'In chaos, you decide who lives — AI freezes', tagZh: '混乱中，你决定谁活——AI 死机了' },
    TSRH: { en: 'The Iron Fortress', zh: '铁壁堡垒', icon: '🏰', tagEn: 'Four walls between you and AI — it can\'t even see you', tagZh: '你和 AI 之间隔着四道墙——它连你的影子都看不到' },
  };
  const profileArch = profileCode ? profileArchetypes[profileCode] : null;
  const profileName = profileArch?.[zh ? 'zh' : 'en'] ?? null;
  const profileIcon = profileArch?.icon ?? null;
  const tagline = profileArch ? (zh ? profileArch.tagZh : profileArch.tagEn) : null;

  // Hook: countdown
  const countdownText = yearsLeft !== null
    ? (zh ? `距离你被替代还有 ${yearsLeft} 年` : `${yearsLeft} ${yearsLeft === 1 ? 'year' : 'years'} until you're replaced`)
    : (zh ? `AI 已经能做你 ${data.currentReplacementDegree}% 的工作` : `AI can already do ${data.currentReplacementDegree}% of your job`);

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#06080e', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden', color: '#ccd0e4' }}>

      {/* BG grid */}
      <HLines n={13} gap={50} />
      <VLines n={25} gap={50} />

      {/* BG glows */}
      <div style={{ position: 'absolute', top: -60, left: '30%', width: 500, height: 500, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.g}15 0%, transparent 65%)` }} />
      <div style={{ position: 'absolute', bottom: -80, right: '20%', width: 400, height: 400, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.a}0a 0%, transparent 60%)` }} />

      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, display: 'flex', background: `linear-gradient(90deg, transparent 5%, ${c.m} 35%, ${c.a} 65%, transparent 95%)` }} />

      {/* ═══ CONTENT ═══ */}
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: '28px 44px 20px', flexDirection: 'column' }}>

        {/* ── ROW 1: Header — AIR brand + risk badge ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 36, fontWeight: 900, letterSpacing: 8, opacity: 0.65 }}>AIR</span>
            <div style={{ width: 1.5, height: 28, background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
            <span style={{ fontSize: 15, letterSpacing: 3, opacity: 0.35 }}>{zh ? 'AI替代风险指数' : 'AI REPLACEMENT INDEX'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 22px', borderRadius: 100, border: `1.5px solid ${c.m}55`, background: `${c.m}14` }}>
            <div style={{ width: 9, height: 9, borderRadius: 5, background: c.m, display: 'flex' }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: c.m, letterSpacing: 2 }}>{zh ? `${lb}风险` : `${lb} RISK`}</span>
          </div>
        </div>

        {/* ── ROW 2: HERO — Identity first (icon + archetype name + tagline) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 4, position: 'relative' }}>
          {/* Archetype icon */}
          {profileIcon && (
            <span style={{ fontSize: 52 }}>{profileIcon}</span>
          )}
          {/* Archetype name — THE PRIMARY VISUAL FOCUS */}
          {profileName && (
            <span style={{ fontSize: 62, fontWeight: 900, color: c.m, lineHeight: 1.1, textAlign: 'center', letterSpacing: 1 }}>
              {profileName}
            </span>
          )}
          {/* Profile code badge */}
          {profileCode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: c.m, opacity: 0.5, letterSpacing: 6 }}>{profileCode}</span>
            </div>
          )}
          {/* Tagline */}
          {tagline && (
            <span style={{ fontSize: 19, fontWeight: 600, opacity: 0.55, textAlign: 'center', maxWidth: 700, lineHeight: 1.3, marginTop: 4, fontStyle: 'italic' }}>
              "{tagline}"
            </span>
          )}
        </div>

        {/* ── ROW 3: Stats bar — probability + year + dimensions (compact) ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>

          {/* Probability */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 56, fontWeight: 900, lineHeight: 0.85, color: c.m }}>{prob}</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: c.m, opacity: 0.4 }}>%</span>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.35, letterSpacing: 1, marginLeft: 4 }}>{zh ? '替代概率' : 'RISK'}</span>
          </div>

          {/* Divider */}
          <div style={{ width: 1.5, height: 40, background: 'rgba(255,255,255,0.1)', display: 'flex' }} />

          {/* Predicted year */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ fontSize: 42, fontWeight: 900, lineHeight: 0.85, color: '#fff' }}>{yr}</span>
            <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.35, letterSpacing: 1, marginLeft: 4 }}>{zh ? '预测年份' : 'YEAR'}</span>
          </div>

          {/* Divider */}
          <div style={{ width: 1.5, height: 40, background: 'rgba(255,255,255,0.1)', display: 'flex' }} />

          {/* 4 dimension letters (compact) */}
          <div style={{ display: 'flex', gap: 6 }}>
            {dims.map((d, i) => {
              const dimColor = d.risky ? '#f43f5e' : '#34d399';
              const dimBg = d.risky ? 'rgba(244,63,94,0.12)' : 'rgba(52,211,153,0.12)';
              const dimBorder = d.risky ? 'rgba(244,63,94,0.3)' : 'rgba(52,211,153,0.3)';
              return (
                <div key={i} style={{ display: 'flex', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 8, border: `1.5px solid ${dimBorder}`, background: dimBg }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: dimColor }}>{d.v}</span>
                </div>
              );
            })}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1, display: 'flex' }} />

          {/* Countdown hook */}
          <div style={{ display: 'flex', padding: '10px 20px', borderRadius: 10, border: `1px solid ${c.m}30`, background: `${c.m}0c` }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: c.m }}>
              {countdownText}
            </span>
          </div>
        </div>

        {/* ── ROW 4: Gauge bar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 10, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 3, height: 8 }}>
            {[0, 1, 2, 3, 4].map(i => {
              const s = i * 20, e = s + 20;
              const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
              const barColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
              return (
                <div key={i} style={{ flex: 1, borderRadius: 4, display: 'flex', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 4, display: 'flex', background: barColors[i] }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', marginTop: 3 }}>
            {stages.map((s, i) => {
              const active = i * 20 <= prob && prob < i * 20 + 20;
              const stageColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontSize: 12, letterSpacing: 2, opacity: active ? 1 : 0.3, color: stageColors[i], fontWeight: 800 }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ROW 5: CTA + QR ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 28px', borderRadius: 10, background: `linear-gradient(135deg, ${c.m}, ${c.a})` }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
              {zh ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →"}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, opacity: 0.2, letterSpacing: 1.5 }}>air.democra.ai</span>
            {/* QR code */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: 3, background: '#fff', borderRadius: 4 }}>
              {([
                [1,1,1,1,1,1,1,0,1,1,1,1,0,1,0,0,0,0,1,1,1,1,1,1,1],
                [1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,1,0,0,0,0,0,1],
                [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,1,0,1,0,1,1,1,0,1],
                [1,0,1,1,1,0,1,0,0,0,1,1,0,1,0,0,1,0,1,0,1,1,1,0,1],
                [1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1],
                [1,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1],
                [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
                [0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0],
                [1,1,0,1,1,0,1,0,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
                [0,1,1,0,0,0,0,0,1,0,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0],
                [0,0,0,1,1,0,1,1,0,1,0,0,1,1,0,1,1,1,0,1,1,1,0,0,1],
                [0,1,1,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1],
                [0,0,0,1,1,0,1,1,1,1,1,0,0,0,0,0,1,0,1,1,0,0,0,0,1],
                [1,0,0,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,0,0,1,0,0,1,0],
                [1,1,1,1,0,1,1,0,1,0,0,0,0,1,0,1,0,0,1,0,1,1,1,1,1],
                [1,0,1,1,0,1,0,1,1,0,1,0,1,0,0,0,0,0,0,1,0,1,1,0,1],
                [1,0,1,0,1,1,1,1,0,0,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0],
                [0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,1,0,1,1,0],
                [1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,0,1,0,1,0,1,0,0,0,1],
                [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,1,0,0,0,1,0,0,0,0],
                [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,1,1,1,1,1,0,0,1,1],
                [1,0,1,1,1,0,1,0,1,0,0,0,1,1,1,0,1,0,1,0,0,0,0,1,1],
                [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,0,0,1,0,0,1,1,1,1,1],
                [1,0,0,0,0,0,1,0,1,1,0,1,1,1,0,0,0,0,0,1,1,0,1,1,1],
                [1,1,1,1,1,1,1,0,1,0,1,1,1,1,0,0,1,1,0,0,0,1,0,0,1],
              ] as number[][]).map((row, y) => (
                <div key={y} style={{ display: 'flex' }}>
                  {row.map((cell, x) => (
                    <div key={x} style={{ width: 2, height: 2, display: 'flex', background: cell ? '#000' : '#fff' }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, display: 'flex', background: `linear-gradient(90deg, transparent 10%, ${c.m}25 50%, transparent 90%)` }} />
    </div>,
    { ...size },
  );
}
