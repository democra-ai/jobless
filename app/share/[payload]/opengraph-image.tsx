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

function label(lv: SharePayload['riskLevel'], zh: boolean) {
  const m: Record<string, [string, string]> = {
    'very-low': ['VERY LOW', '极低'], 'low': ['LOW', '低'], 'medium': ['MEDIUM', '中等'],
    'high': ['HIGH', '高'], 'critical': ['CRITICAL', '极高'],
  };
  return (m[lv] || m.critical)[zh ? 1 : 0];
}

/* grid helper */
function HLines({ n, gap }: { n: number; gap: number }) {
  return <>{Array.from({ length: n }).map((_, i) => (
    <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * gap, height: 1, display: 'flex', background: 'rgba(255,255,255,0.025)' }} />
  ))}</>;
}
function VLines({ n, gap }: { n: number; gap: number }) {
  return <>{Array.from({ length: n }).map((_, i) => (
    <div key={i} style={{ position: 'absolute', top: 0, bottom: 0, left: i * gap, width: 1, display: 'flex', background: 'rgba(255,255,255,0.025)' }} />
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
  const lb = label(data.riskLevel, zh);
  const prob = data.replacementProbability;
  const yr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const stages = ['SAFE', 'ASSIST', 'AGENT', 'LEAD', 'KILL'];
  const dims = [
    { l: 'LEARN', v: 'E' }, { l: 'EVAL', v: 'O' },
    { l: 'RISK', v: 'F' }, { l: 'HUMAN', v: 'H' },
  ];

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#06080e', fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden', color: '#ccd0e4' }}>

      {/* BG grid */}
      <HLines n={20} gap={32} />
      <VLines n={38} gap={32} />

      {/* BG glows */}
      <div style={{ position: 'absolute', top: -80, left: 100, width: 460, height: 460, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.g}12 0%, transparent 65%)` }} />
      <div style={{ position: 'absolute', bottom: -100, right: 200, width: 340, height: 340, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.a}08 0%, transparent 60%)` }} />
      <div style={{ position: 'absolute', top: '35%', left: '42%', width: 280, height: 280, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.m}06 0%, transparent 55%)` }} />

      {/* Top accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, display: 'flex', background: `linear-gradient(90deg, transparent 5%, ${c.m} 35%, ${c.a} 65%, transparent 95%)` }} />

      {/* ═══ CONTENT ═══ */}
      <div style={{ display: 'flex', width: '100%', height: '100%', padding: '32px 44px 28px', flexDirection: 'column' }}>

        {/* ── ROW 1: Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 900, letterSpacing: 5, opacity: 0.5 }}>AIR</span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', display: 'flex' }} />
            <span style={{ fontSize: 10, letterSpacing: 2, opacity: 0.2 }}>{zh ? 'AI替代风险指数' : 'AI REPLACEMENT INDEX'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '5px 16px', borderRadius: 100, border: `1px solid ${c.m}45`, background: `${c.m}0d` }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: c.m, display: 'flex' }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: c.m, letterSpacing: 2 }}>{lb} RISK</span>
          </div>
        </div>

        {/* ── ROW 2: Main content (2 columns) ── */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* LEFT: hero number */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '44%', justifyContent: 'center' }}>
            <span style={{ fontSize: 10, letterSpacing: 3, opacity: 0.3, marginBottom: 2 }}>
              {zh ? '替代概率' : 'REPLACEMENT PROBABILITY'}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '20%', left: 50, width: 240, height: 160, borderRadius: '50%', display: 'flex', background: `radial-gradient(ellipse, ${c.m}18 0%, transparent 70%)` }} />
              <span style={{ fontSize: 180, fontWeight: 900, lineHeight: 0.8, letterSpacing: -6, color: c.m, position: 'relative' }}>{prob}</span>
              <span style={{ fontSize: 56, fontWeight: 800, color: c.m, opacity: 0.3, marginLeft: 4, lineHeight: 0.8, position: 'relative' }}>%</span>
            </div>

            {/* Dimension letters */}
            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              {dims.map((d, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '5px 12px', borderRadius: 7, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontSize: 8, opacity: 0.2, letterSpacing: 1 }}>{d.l}</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: i < 3 ? c.m : '#b0b4c8' }}>{d.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: data panels */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '56%', paddingLeft: 28, gap: 12, justifyContent: 'center' }}>

            {/* Kill Line */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 10, letterSpacing: 2, opacity: 0.3 }}>{zh ? 'AI斩杀线' : 'AI KILL LINE'}</span>
                <span style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, marginTop: 2, color: '#fff' }}>{yr}</span>
                {data.predictedReplacementYear < 2100 && (
                  <span style={{ fontSize: 11, opacity: 0.2, marginTop: 2 }}>{data.earliestYear} — {data.latestYear}</span>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <span style={{ fontSize: 9, opacity: 0.14 }}>CONF 87%</span>
                <span style={{ fontSize: 9, opacity: 0.14 }}>MODEL v3.2</span>
                <span style={{ fontSize: 9, opacity: 0.14 }}>N=19,265</span>
              </div>
            </div>

            {/* Current progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.015)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, letterSpacing: 2, opacity: 0.25 }}>{zh ? '当前AI替代程度' : 'CURRENT AI PROGRESS'}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#67e8f9' }}>{data.currentReplacementDegree}%</span>
              </div>
              <div style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${data.currentReplacementDegree}%`, height: '100%', display: 'flex', borderRadius: 3, background: `linear-gradient(90deg, #67e8f9, ${c.m})` }} />
                <div style={{ flex: 1, height: '100%', display: 'flex', background: 'rgba(255,255,255,0.04)' }} />
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { l: 'EXPOSURE', v: '34.8%', cl: c.m },
                { l: 'WIN RATE', v: '71.3%', cl: c.m },
                { l: 'JOBS', v: '130M', cl: '#67e8f9' },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.015)' }}>
                  <span style={{ fontSize: 8, opacity: 0.2, letterSpacing: 1 }}>{s.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: s.cl }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ROW 3: Gauge bar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 10 }}>
          <div style={{ display: 'flex', gap: 3, height: 6 }}>
            {[0, 1, 2, 3, 4].map(i => {
              const s = i * 20, e = s + 20;
              const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
              return (
                <div key={i} style={{ flex: 1, borderRadius: 3, display: 'flex', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: 3, display: 'flex', background: i >= 4 ? c.m : `${c.m}${['70', '90', 'aa', 'cc'][i]}` }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex' }}>
            {stages.map((s, i) => {
              const active = i * 20 <= prob && prob < i * 20 + 20;
              return (
                <div key={i} style={{ flex: 1, display: 'flex' }}>
                  <span style={{ fontSize: 8, letterSpacing: 1, opacity: active ? 0.6 : 0.1, color: active ? c.m : '#ccd0e4', fontWeight: active ? 800 : 400 }}>{s}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ROW 4: CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 28px', borderRadius: 10, background: `linear-gradient(135deg, ${c.m}, ${c.a})` }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: 0.5 }}>
              {zh ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →"}
            </span>
          </div>
          <span style={{ fontSize: 10, opacity: 0.15, letterSpacing: 1 }}>air.democra.ai</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, display: 'flex', background: `linear-gradient(90deg, transparent 10%, ${c.m}25 50%, transparent 90%)` }} />
    </div>,
    { ...size },
  );
}
