import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type ShareOgProps = {
  params: Promise<{ payload: string }>;
};

/* ── palette per risk tier ── */
function palette(level: SharePayload['riskLevel']) {
  const palettes: Record<string, { main: string; glow: string; bg: string; accent2: string }> = {
    'very-low': { main: '#34d399', glow: '#059669', bg: '#021a12', accent2: '#06b6d4' },
    'low':      { main: '#4ade80', glow: '#16a34a', bg: '#021a15', accent2: '#22d3ee' },
    'medium':   { main: '#fbbf24', glow: '#d97706', bg: '#1a1408', accent2: '#f97316' },
    'high':     { main: '#fb923c', glow: '#ea580c', bg: '#1a0e06', accent2: '#f43f5e' },
    'critical': { main: '#f43f5e', glow: '#dc2626', bg: '#1a0608', accent2: '#a855f7' },
  };
  return palettes[level] || palettes.critical;
}

function riskLabel(level: SharePayload['riskLevel'], isZh: boolean): string {
  const map: Record<string, [string, string]> = {
    'very-low': ['VERY LOW', '极低'],
    'low':      ['LOW', '低'],
    'medium':   ['MEDIUM', '中等'],
    'high':     ['HIGH', '高'],
    'critical': ['CRITICAL', '极高'],
  };
  const pair = map[level] || map.critical;
  return isZh ? pair[1] : pair[0];
}

/* ── stage labels for gauge ── */
const STAGES = [
  { pct: 0,  label: 'SAFE' },
  { pct: 20, label: 'ASSIST' },
  { pct: 40, label: 'AGENT' },
  { pct: 60, label: 'LEAD' },
  { pct: 80, label: 'KILL' },
];

export default async function Image({ params }: ShareOgProps) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  /* ── fallback card ── */
  if (!data) {
    return new ImageResponse(
      <div style={{
        width: '100%', height: '100%', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
        background: '#06080e', color: '#fafafa', fontFamily: 'sans-serif',
      }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
        <span style={{ fontSize: 22, opacity: 0.4, marginTop: 14, letterSpacing: 4 }}>AI REPLACEMENT INDEX</span>
      </div>,
      { ...size },
    );
  }

  const isZh = data.lang === 'zh';
  const p = palette(data.riskLevel);
  const label = riskLabel(data.riskLevel, isZh);
  const prob = data.replacementProbability;
  const yearStr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);

  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: '#06080e', fontFamily: 'sans-serif',
      position: 'relative', overflow: 'hidden', color: '#e4e8f7',
    }}>

      {/* ── BG layer: multi-glow orbs ── */}
      <div style={{ position: 'absolute', top: -160, left: -100, width: 520, height: 520, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${p.glow}18 0%, transparent 70%)` }} />
      <div style={{ position: 'absolute', bottom: -200, right: -60, width: 600, height: 600, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${p.accent2}0c 0%, transparent 65%)` }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', width: 300, height: 300, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${p.main}08 0%, transparent 60%)` }} />

      {/* ── BG layer: horizontal scan lines ── */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', left: 0, right: 0, top: i * 80 + 40, height: 1, display: 'flex',
          background: 'rgba(255,255,255,0.02)',
        }} />
      ))}

      {/* ── top accent bar ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3, display: 'flex',
        background: `linear-gradient(90deg, transparent 5%, ${p.main} 30%, ${p.accent2} 70%, transparent 95%)`,
      }} />
      {/* ── bottom accent bar ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, display: 'flex',
        background: `linear-gradient(90deg, transparent 10%, ${p.main}30 50%, transparent 90%)`,
      }} />

      {/* ── main content ── */}
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
        padding: '44px 56px 36px',
      }}>

        {/* ── header row ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: 6, opacity: 0.5 }}>AIR</span>
            <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.12)', display: 'flex' }} />
            <span style={{ fontSize: 13, letterSpacing: 3, opacity: 0.25 }}>
              {isZh ? 'AI 替代风险指数' : 'AI REPLACEMENT INDEX'}
            </span>
          </div>
          {/* risk badge — glass pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 22px', borderRadius: 100,
            border: `1.5px solid ${p.main}55`,
            background: `linear-gradient(135deg, ${p.main}18, ${p.main}08)`,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: p.main, display: 'flex' }} />
            <span style={{ fontSize: 15, fontWeight: 800, color: p.main, letterSpacing: 3 }}>{label}</span>
          </div>
        </div>

        {/* ── hero row ── */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', marginTop: -8 }}>

          {/* LEFT — the number */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '55%' }}>
            <span style={{ fontSize: 13, letterSpacing: 3, opacity: 0.3, marginBottom: 6 }}>
              {isZh ? '替代概率' : 'REPLACEMENT PROBABILITY'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
              {/* glow behind number */}
              <div style={{
                position: 'absolute', top: '50%', left: 80, width: 240, height: 160, display: 'flex',
                borderRadius: '50%',
                background: `radial-gradient(ellipse, ${p.main}20 0%, transparent 70%)`,
                transform: 'translateY(-50%)',
              }} />
              <span style={{
                fontSize: 172, fontWeight: 900, lineHeight: 0.82, letterSpacing: -6,
                color: p.main, position: 'relative',
              }}>{prob}</span>
              <span style={{
                fontSize: 56, fontWeight: 800, opacity: 0.3, marginLeft: 4, lineHeight: 0.82,
                color: p.main, position: 'relative',
              }}>%</span>
            </div>
          </div>

          {/* RIGHT — stats stack */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '45%', gap: 14, alignItems: 'stretch' }}>
            {/* kill line card */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              padding: '20px 24px', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            }}>
              <span style={{ fontSize: 11, letterSpacing: 3, opacity: 0.3 }}>
                {isZh ? 'AI 斩杀线' : 'AI KILL LINE'}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 64, fontWeight: 900, lineHeight: 1 }}>{yearStr}</span>
                {data.predictedReplacementYear < 2100 && (
                  <span style={{ fontSize: 16, opacity: 0.25 }}>{data.earliestYear}–{data.latestYear}</span>
                )}
              </div>
            </div>
            {/* current degree chip */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 24px', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span style={{ fontSize: 13, opacity: 0.3 }}>{isZh ? '当前替代程度' : 'CURRENT PROGRESS'}</span>
              <span style={{ fontSize: 26, fontWeight: 800, color: '#67e8f9' }}>{data.currentReplacementDegree}%</span>
            </div>
          </div>
        </div>

        {/* ── bottom gauge + CTA ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28 }}>
          {/* segmented gauge */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: 5 }}>
            {/* bar */}
            <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
              {/* 5 segments */}
              {[0, 1, 2, 3, 4].map(i => {
                const segStart = i * 20;
                const segEnd = segStart + 20;
                const filled = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
                return (
                  <div key={i} style={{
                    flex: 1, marginRight: i < 4 ? 3 : 0, borderRadius: 3, display: 'flex',
                    background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${filled * 100}%`, height: '100%', borderRadius: 3, display: 'flex',
                      background: i >= 4 ? p.main : `${p.main}${i < 2 ? '90' : 'cc'}`,
                    }} />
                  </div>
                );
              })}
            </div>
            {/* stage labels */}
            <div style={{ display: 'flex' }}>
              {STAGES.map((s, i) => (
                <div key={i} style={{
                  flex: 1, display: 'flex', justifyContent: i === 0 ? 'flex-start' : i === 4 ? 'flex-end' : 'center',
                }}>
                  <span style={{
                    fontSize: 9, letterSpacing: 1.5, opacity: prob >= s.pct && prob < s.pct + 20 ? 0.6 : 0.15,
                    fontWeight: prob >= s.pct && prob < s.pct + 20 ? 800 : 400,
                    color: prob >= s.pct && prob < s.pct + 20 ? p.main : '#e4e8f7',
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{
            display: 'flex', alignItems: 'center',
            padding: '10px 28px', borderRadius: 10,
            background: `linear-gradient(135deg, ${p.main}, ${p.accent2})`,
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
              {isZh ? '测测你的风险 →' : 'Test yours →'}
            </span>
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
