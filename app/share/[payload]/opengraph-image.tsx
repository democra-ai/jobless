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
    <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * gap, height: 1, display: 'flex', background: 'rgba(255,255,255,0.09)' }} />
  ))}</>;
}
function VLines({ n, gap }: { n: number; gap: number }) {
  return <>{Array.from({ length: n }).map((_, i) => (
    <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: i * gap, width: 1, display: 'flex', background: 'rgba(255,255,255,0.09)' }} />
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
  // Dimension labels: letter → full name
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

  // Profile archetype name + icon lookup (matches PROFILE_TYPES in air_quiz_data.ts)
  const profileArchetypes: Record<string, { en: string; zh: string; icon: string }> = {
    EOFP: { en: 'The Transparent Target', zh: '透明靶心', icon: '🎯' },
    EOFH: { en: 'The Human Bridge', zh: '人脉桥梁', icon: '🤝' },
    EORP: { en: 'The Rule Keeper', zh: '规则守卫', icon: '🛡️' },
    ESFP: { en: 'The Taste Maker', zh: '品味定义者', icon: '🎨' },
    TOFP: { en: 'The Muscle Memory', zh: '肌肉记忆者', icon: '🔧' },
    EORH: { en: 'The Certified Shield', zh: '持证护盾', icon: '📜' },
    ESFH: { en: 'The Living Brand', zh: '活体品牌', icon: '⭐' },
    ESRP: { en: 'The Pressure Alchemist', zh: '高压炼金师', icon: '⚗️' },
    TOFH: { en: 'The Signature Touch', zh: '签名手艺人', icon: '✂️' },
    TORP: { en: 'The Steady Hand', zh: '不颤之手', icon: '🎯' },
    TSFP: { en: 'The Soul Craftsman', zh: '灵魂匠人', icon: '🏺' },
    ESRH: { en: 'The Oracle', zh: '神谕者', icon: '🔮' },
    TORH: { en: 'The Healing Hand', zh: '疗愈之手', icon: '🫀' },
    TSFH: { en: 'The Irreplaceable', zh: '不可替代者', icon: '🦋' },
    TSRP: { en: 'The Last Call', zh: '终极裁决者', icon: '⚡' },
    TSRH: { en: 'The Iron Fortress', zh: '铁壁堡垒', icon: '🏰' },
  };
  const profileArch = profileCode ? profileArchetypes[profileCode] : null;
  const profileName = profileArch?.[zh ? 'zh' : 'en'] ?? null;
  const profileIcon = profileArch?.icon ?? null;

  // Hook: countdown + percentile
  const countdownText = yearsLeft !== null
    ? (zh ? `距离你被替代还有 ${yearsLeft} 年` : `${yearsLeft} ${yearsLeft === 1 ? 'year' : 'years'} until you're replaced`)
    : (zh ? `AI 已经能做你 ${data.currentReplacementDegree}% 的工作` : `AI can already do ${data.currentReplacementDegree}% of your job`);
  const pctText = zh
    ? `你比 ${percentileSafe}% 的测试者更安全`
    : `Safer than ${percentileSafe}% of test takers`;

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#06080e', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden', color: '#ccd0e4' }}>

      {/* BG grid — 50px square cells matching site .grid-bg */}
      <HLines n={13} gap={50} />
      <VLines n={25} gap={50} />

      {/* BG glows */}
      <div style={{ position: 'absolute', top: -80, left: 100, width: 460, height: 460, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.g}12 0%, transparent 65%)` }} />
      <div style={{ position: 'absolute', bottom: -100, right: 200, width: 340, height: 340, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.a}08 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', top: '35%', left: '42%', width: 280, height: 280, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.m}06 0%, transparent 55%)` }} />

      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, display: 'flex', background: `linear-gradient(90deg, transparent 5%, ${c.m} 35%, ${c.a} 65%, transparent 95%)` }} />

      {/* ═══ CONTENT ═══ */}
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: '30px 44px 24px', flexDirection: 'column' }}>

        {/* ── ROW 1: Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 42, fontWeight: 900, letterSpacing: 10, opacity: 0.72 }}>AIR</span>
            <div style={{ width: 1.5, height: 32, background: 'rgba(255,255,255,0.25)', display: 'flex' }} />
            <span style={{ fontSize: 18, letterSpacing: 3, opacity: 0.4 }}>{zh ? 'AI替代风险指数' : 'AI REPLACEMENT INDEX'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 26px', borderRadius: 100, border: `1.5px solid ${c.m}55`, background: `${c.m}14` }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: c.m, display: 'flex' }} />
            <span style={{ fontSize: 17, fontWeight: 800, color: c.m, letterSpacing: 2.5 }}>{zh ? `${lb}风险` : `${lb} RISK`}</span>
          </div>
        </div>

        {/* ── ROW 2: Main content (2 columns) ── */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* LEFT: hero number + dimension squares */}
          <div style={{ display: 'flex', width: '44%', alignItems: 'center', paddingLeft: 36 }}>
            {/* Number block */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: 16, letterSpacing: 3.5, opacity: 0.45, marginBottom: 4, fontWeight: 600 }}>
                {zh ? '替代概率' : 'REPLACEMENT PROBABILITY'}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20%', left: 50, width: 240, height: 160, borderRadius: '50%', display: 'flex', background: `radial-gradient(ellipse, ${c.m}18 0%, transparent 70%)` }} />
                <span style={{ fontSize: 170, fontWeight: 900, lineHeight: 0.8, letterSpacing: -6, color: c.m, position: 'relative' }}>{prob}</span>
                <span style={{ fontSize: 52, fontWeight: 800, color: c.m, opacity: 0.3, marginLeft: 4, lineHeight: 0.8, position: 'relative' }}>%</span>
              </div>
              {/* Profile archetype name */}
              {profileName && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
                  {profileIcon && <span style={{ fontSize: 22 }}>{profileIcon}</span>}
                  <span style={{ fontSize: 22, fontWeight: 800, color: c.m }}>{profileName}</span>
                </div>
              )}
            </div>

            {/* Dimension squares — vertical */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 20, justifyContent: 'center' }}>
              {dims.map((d, i) => {
                const dimColor = d.risky ? '#f43f5e' : '#34d399';
                const dimBorder = d.risky ? 'rgba(244,63,94,0.35)' : 'rgba(52,211,153,0.35)';
                const dimBg = d.risky ? 'rgba(244,63,94,0.1)' : 'rgba(52,211,153,0.1)';
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 10, border: `1.5px solid ${dimBorder}`, background: dimBg }}>
                      <span style={{ fontSize: 26, fontWeight: 900, color: dimColor }}>{d.v}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: dimColor, letterSpacing: 0.5 }}>{d.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: data panels */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '56%', paddingLeft: 24, gap: 10, justifyContent: 'center' }}>

            {/* 1. Predicted Year */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: 3, opacity: 0.45 }}>
                  {zh ? '预测替代年份' : 'PREDICTED REPLACEMENT YEAR'}
                </span>
                <span style={{ fontSize: 52, fontWeight: 900, lineHeight: 1, marginTop: 2, color: '#fff' }}>{yr}</span>
                {data.predictedReplacementYear < 2100 && (
                  <span style={{ fontSize: 13, opacity: 0.3, marginTop: 2 }}>{data.earliestYear} — {data.latestYear}</span>
                )}
              </div>
              {/* Current AI capability — compact inline */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.35, letterSpacing: 1.5 }}>{zh ? 'AI当前能力' : 'AI CAPABILITY'}</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#67e8f9' }}>{data.currentReplacementDegree}%</span>
                <div style={{ display: 'flex', width: 100, height: 5, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${data.currentReplacementDegree}%`, height: '100%', display: 'flex', borderRadius: 3, background: `linear-gradient(90deg, #67e8f9, ${c.m})` }} />
                  <div style={{ flex: 1, height: '100%', display: 'flex', background: 'rgba(255,255,255,0.04)' }} />
                </div>
              </div>
            </div>

            {/* 2. Hook: countdown + urgency */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 24px', borderRadius: 14, border: `1px solid ${c.m}25`, background: `${c.m}0a` }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: c.m, letterSpacing: 0.5 }}>
                {countdownText}
              </span>
            </div>

            {/* 3. Percentile ranking */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 24px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ display: 'flex', flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${percentileSafe}%`, height: '100%', display: 'flex', borderRadius: 3, background: `linear-gradient(90deg, ${c.m}, #34d399)` }} />
                <div style={{ flex: 1, height: '100%', display: 'flex', background: 'rgba(255,255,255,0.06)' }} />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, opacity: 0.55 }}>
                {pctText}
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3: Gauge bar with "You are here" ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 8, position: 'relative' }}>
          {/* "You are here" pointer above the bar */}
          <div style={{ display: 'flex', position: 'relative', height: 24, marginBottom: 2 }}>
            <div style={{ position: 'absolute', left: `${prob}%`, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `7px solid ${c.m}`, display: 'flex' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: c.m, letterSpacing: 1, whiteSpace: 'nowrap' }}>
                {zh ? '你在这里' : 'YOU ARE HERE'}
              </span>
            </div>
          </div>
          {/* Bar segments */}
          <div style={{ display: 'flex', gap: 4, height: 10 }}>
            {[0, 1, 2, 3, 4].map(i => {
              const s = i * 20, e = s + 20;
              const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
              const barColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
              return (
                <div key={i} style={{ flex: 1, borderRadius: 5, display: 'flex', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                  <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 5, display: 'flex', background: barColors[i] }} />
                </div>
              );
            })}
          </div>
          {/* Stage labels */}
          <div style={{ display: 'flex', marginTop: 5 }}>
            {stages.map((s, i) => {
              const active = i * 20 <= prob && prob < i * 20 + 20;
              const stageColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <span style={{ fontSize: 15, letterSpacing: 2, opacity: active ? 1 : 0.4, color: stageColors[i], fontWeight: 800 }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ROW 4: CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 32px', borderRadius: 12, background: `linear-gradient(135deg, ${c.m}, ${c.a})` }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
              {zh ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →"}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, opacity: 0.2, letterSpacing: 1.5 }}>air.democra.ai</span>
            {/* QR code for air.democra.ai */}
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
