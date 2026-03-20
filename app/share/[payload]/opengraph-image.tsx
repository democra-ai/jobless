import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type ShareOgProps = { params: Promise<{ payload: string }> };

function pal(level: SharePayload['riskLevel']) {
  const p: Record<string, { main: string; glow: string; a2: string }> = {
    'very-low': { main: '#34d399', glow: '#059669', a2: '#06b6d4' },
    'low':      { main: '#4ade80', glow: '#16a34a', a2: '#22d3ee' },
    'medium':   { main: '#fbbf24', glow: '#d97706', a2: '#f97316' },
    'high':     { main: '#fb923c', glow: '#ea580c', a2: '#f43f5e' },
    'critical': { main: '#f43f5e', glow: '#dc2626', a2: '#a855f7' },
  };
  return p[level] || p.critical;
}

function riskLabel(level: SharePayload['riskLevel'], zh: boolean) {
  const m: Record<string, [string, string]> = {
    'very-low': ['VERY LOW', '极低'], 'low': ['LOW', '低'], 'medium': ['MEDIUM', '中等'],
    'high': ['HIGH', '高'], 'critical': ['CRITICAL', '极高'],
  };
  return (m[level] || m.critical)[zh ? 1 : 0];
}

/* Generates N horizontal line elements for grid */
function gridLines(n: number, gap: number, opacity: string) {
  return Array.from({ length: n }).map((_, i) => (
    <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: i * gap, height: 1, display: 'flex', background: `rgba(255,255,255,${opacity})` }} />
  ));
}

function vLines(n: number, gap: number, opacity: string) {
  return Array.from({ length: n }).map((_, i) => (
    <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: i * gap, width: 1, display: 'flex', background: `rgba(255,255,255,${opacity})` }} />
  ));
}

export default async function Image({ params }: ShareOgProps) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: '#06080e', color: '#fafafa', fontFamily: 'sans-serif' }}>
        <span style={{ fontSize: 80, fontWeight: 900, letterSpacing: 12 }}>AIR</span>
        <span style={{ fontSize: 22, opacity: 0.4, marginTop: 14, letterSpacing: 4 }}>AI REPLACEMENT INDEX</span>
      </div>,
      { ...size },
    );
  }

  const zh = data.lang === 'zh';
  const c = pal(data.riskLevel);
  const label = riskLabel(data.riskLevel, zh);
  const prob = data.replacementProbability;
  const yearStr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const stages = ['SAFE', 'ASSIST', 'AGENT', 'LEAD', 'KILL'];

  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: '#06080e', fontFamily: 'sans-serif',
      position: 'relative', overflow: 'hidden', color: '#d0d4e8',
    }}>

      {/* BG: grid lines */}
      {gridLines(9, 70, '0.025')}
      {vLines(11, 110, '0.018')}

      {/* BG: glow orbs */}
      <div style={{ position: 'absolute', top: -80, left: 100, width: 500, height: 500, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.glow}14 0%, transparent 65%)` }} />
      <div style={{ position: 'absolute', bottom: -120, right: 80, width: 400, height: 400, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.a2}0a 0%, transparent 60%)` }} />

      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, display: 'flex', background: `linear-gradient(90deg, transparent 5%, ${c.main} 35%, ${c.a2} 65%, transparent 95%)` }} />

      {/* ═══ MAIN LAYOUT: 2 columns ═══ */}
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: '36px 48px 32px' }}>

        {/* ─── LEFT COLUMN: hero number ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', justifyContent: 'space-between' }}>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 5, opacity: 0.5 }}>AIR</span>
            <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.12)', display: 'flex' }} />
            <span style={{ fontSize: 11, letterSpacing: 2.5, opacity: 0.22 }}>
              {zh ? 'AI 替代风险指数' : 'AI REPLACEMENT INDEX'}
            </span>
          </div>

          {/* Number block */}
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: -20 }}>
            <span style={{ fontSize: 11, letterSpacing: 3, opacity: 0.3, marginBottom: 4 }}>
              {zh ? '替代概率' : 'REPLACEMENT PROBABILITY'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
              {/* glow */}
              <div style={{ position: 'absolute', top: '30%', left: 60, width: 260, height: 180, borderRadius: '50%', display: 'flex', background: `radial-gradient(ellipse, ${c.main}1a 0%, transparent 70%)` }} />
              <span style={{ fontSize: 180, fontWeight: 900, lineHeight: 0.8, letterSpacing: -6, color: c.main, position: 'relative' }}>{prob}</span>
              <span style={{ fontSize: 56, fontWeight: 800, color: c.main, opacity: 0.35, marginLeft: 4, lineHeight: 0.8, position: 'relative' }}>%</span>
            </div>
          </div>

          {/* Dimension letters */}
          <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
            {['E', 'O', 'F', 'H'].map((letter, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '6px 14px', borderRadius: 8,
                border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)',
              }}>
                <span style={{ fontSize: 9, opacity: 0.25, letterSpacing: 1 }}>
                  {['LEARN', 'EVAL', 'RISK', 'HUMAN'][i]}
                </span>
                <span style={{ fontSize: 20, fontWeight: 800, color: i < 3 ? c.main : '#d0d4e8' }}>{letter}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RIGHT COLUMN: data panels ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', paddingLeft: 32, justifyContent: 'space-between' }}>

          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 20px', borderRadius: 100,
              border: `1.5px solid ${c.main}50`, background: `${c.main}10`,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: 4, background: c.main, display: 'flex' }} />
              <span style={{ fontSize: 13, fontWeight: 800, color: c.main, letterSpacing: 2 }}>{label} RISK</span>
            </div>
          </div>

          {/* Kill Line panel */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 24px', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.025)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 10, letterSpacing: 2.5, opacity: 0.3 }}>{zh ? 'AI 斩杀线' : 'AI KILL LINE'}</span>
              <span style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, marginTop: 2, color: '#fff' }}>{yearStr}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
              {data.predictedReplacementYear < 2100 && (
                <span style={{ fontSize: 14, opacity: 0.25, fontFamily: 'monospace' }}>{data.earliestYear}–{data.latestYear}</span>
              )}
              <span style={{ fontSize: 10, opacity: 0.15 }}>CONF 87% · N=19,265</span>
            </div>
          </div>

          {/* Current + mini bar */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: '16px 24px', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 10, letterSpacing: 2, opacity: 0.3 }}>{zh ? '当前AI替代程度' : 'CURRENT AI PROGRESS'}</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#67e8f9' }}>{data.currentReplacementDegree}%</span>
            </div>
            {/* Mini gradient bar */}
            <div style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${data.currentReplacementDegree}%`, height: '100%', display: 'flex', borderRadius: 3, background: `linear-gradient(90deg, #67e8f9, ${c.main})` }} />
              <div style={{ flex: 1, height: '100%', display: 'flex', background: 'rgba(255,255,255,0.05)' }} />
            </div>
          </div>

          {/* CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '14px 0', borderRadius: 12,
            background: `linear-gradient(135deg, ${c.main}, ${c.a2})`,
          }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
              {zh ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →"}
            </span>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM: 5-segment gauge (full width) ═══ */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        display: 'flex', flexDirection: 'column', padding: '0 48px 10px',
      }}>
        {/* Segments */}
        <div style={{ display: 'flex', gap: 3, height: 5 }}>
          {[0, 1, 2, 3, 4].map(i => {
            const s = i * 20, e = s + 20;
            const fill = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
            return (
              <div key={i} style={{ flex: 1, borderRadius: 3, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                <div style={{ width: `${fill * 100}%`, height: '100%', borderRadius: 3, display: 'flex', background: i >= 4 ? c.main : `${c.main}${['70', '90', 'aa', 'cc'][i]}` }} />
              </div>
            );
          })}
        </div>
        {/* Labels */}
        <div style={{ display: 'flex', marginTop: 2 }}>
          {stages.map((s, i) => {
            const active = i * 20 <= prob && prob < i * 20 + 20;
            return (
              <div key={i} style={{ flex: 1, display: 'flex' }}>
                <span style={{ fontSize: 8, letterSpacing: 1.5, opacity: active ? 0.7 : 0.12, color: active ? c.main : '#d0d4e8', fontWeight: active ? 800 : 400 }}>{s}</span>
              </div>
            );
          })}
          <span style={{ fontSize: 8, opacity: 0.12, position: 'absolute', right: 48 }}>air.democra.ai</span>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
