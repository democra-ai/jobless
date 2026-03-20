import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type ShareOgProps = {
  params: Promise<{ payload: string }>;
};

function palette(level: SharePayload['riskLevel']) {
  const p: Record<string, { main: string; glow: string; accent2: string }> = {
    'very-low': { main: '#34d399', glow: '#059669', accent2: '#06b6d4' },
    'low':      { main: '#4ade80', glow: '#16a34a', accent2: '#22d3ee' },
    'medium':   { main: '#fbbf24', glow: '#d97706', accent2: '#f97316' },
    'high':     { main: '#fb923c', glow: '#ea580c', accent2: '#f43f5e' },
    'critical': { main: '#f43f5e', glow: '#dc2626', accent2: '#a855f7' },
  };
  return p[level] || p.critical;
}

function riskLabel(level: SharePayload['riskLevel'], isZh: boolean): string {
  const m: Record<string, [string, string]> = {
    'very-low': ['VERY LOW', '极低'], 'low': ['LOW', '低'], 'medium': ['MEDIUM', '中等'],
    'high': ['HIGH', '高'], 'critical': ['CRITICAL', '极高'],
  };
  return (m[level] || m.critical)[isZh ? 1 : 0];
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

  const isZh = data.lang === 'zh';
  const c = palette(data.riskLevel);
  const label = riskLabel(data.riskLevel, isZh);
  const prob = data.replacementProbability;
  const yearStr = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);

  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex',
      background: '#06080e', fontFamily: 'sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* BG glows */}
      <div style={{ position: 'absolute', top: -100, left: '30%', width: 500, height: 500, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.glow}14 0%, transparent 70%)` }} />
      <div style={{ position: 'absolute', bottom: -180, right: '20%', width: 400, height: 400, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.accent2}0a 0%, transparent 65%)` }} />

      {/* Scan lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: i * 63, height: 1, display: 'flex', background: 'rgba(255,255,255,0.015)' }} />
      ))}

      {/* Center card — the poster */}
      <div style={{
        position: 'absolute', top: 28, bottom: 28, left: 260, right: 260,
        display: 'flex', flexDirection: 'column',
        borderRadius: 24,
        border: `1px solid ${c.main}25`,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        padding: '32px 40px 28px',
        overflow: 'hidden',
      }}>
        {/* Card inner glow top */}
        <div style={{ position: 'absolute', top: -60, left: '50%', width: 300, height: 200, borderRadius: '50%', display: 'flex', background: `radial-gradient(circle, ${c.main}12 0%, transparent 70%)`, transform: 'translateX(-50%)' }} />

        {/* Top accent */}
        <div style={{ position: 'absolute', top: 0, left: 40, right: 40, height: 2, display: 'flex', borderRadius: 1, background: `linear-gradient(90deg, transparent, ${c.main}60, transparent)` }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 5, color: '#fff', opacity: 0.45 }}>AIR</span>
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', display: 'flex' }} />
            <span style={{ fontSize: 11, letterSpacing: 2, opacity: 0.2 }}>
              {isZh ? 'AI替代风险' : 'AI RISK'}
            </span>
          </div>
          {/* Badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '5px 16px', borderRadius: 100,
            border: `1px solid ${c.main}40`,
            background: `${c.main}10`,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: c.main, display: 'flex' }} />
            <span style={{ fontSize: 12, fontWeight: 800, color: c.main, letterSpacing: 2 }}>{label}</span>
          </div>
        </div>

        {/* Center hero — the number */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          flex: 1, position: 'relative', marginTop: -8,
        }}>
          {/* Glow behind number */}
          <div style={{ position: 'absolute', width: 280, height: 180, borderRadius: '50%', display: 'flex', background: `radial-gradient(ellipse, ${c.main}18 0%, transparent 70%)` }} />

          <span style={{ fontSize: 11, letterSpacing: 4, opacity: 0.3, marginBottom: 8, position: 'relative' }}>
            {isZh ? '替代概率' : 'REPLACEMENT PROBABILITY'}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
            <span style={{ fontSize: 140, fontWeight: 900, lineHeight: 0.85, letterSpacing: -4, color: c.main }}>{prob}</span>
            <span style={{ fontSize: 48, fontWeight: 800, color: c.main, opacity: 0.4, marginLeft: 2 }}>%</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
          {/* Kill Line */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 18px', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
          }}>
            <span style={{ fontSize: 11, opacity: 0.3, letterSpacing: 2 }}>{isZh ? '斩杀线' : 'KILL LINE'}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#fff' }}>{yearStr}</span>
              {data.predictedReplacementYear < 2100 && (
                <span style={{ fontSize: 11, opacity: 0.2 }}>{data.earliestYear}–{data.latestYear}</span>
              )}
            </div>
          </div>
          {/* Current */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 18px', borderRadius: 14,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            width: 180,
          }}>
            <span style={{ fontSize: 11, opacity: 0.3, letterSpacing: 1 }}>{isZh ? '当前' : 'NOW'}</span>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#67e8f9' }}>{data.currentReplacementDegree}%</span>
          </div>
        </div>

        {/* Gauge bar */}
        <div style={{ display: 'flex', marginTop: 14, gap: 3, position: 'relative' }}>
          {[0, 1, 2, 3, 4].map(i => {
            const segStart = i * 20;
            const segEnd = segStart + 20;
            const filled = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
            return (
              <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, display: 'flex', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{ width: `${filled * 100}%`, height: '100%', borderRadius: 3, display: 'flex', background: i >= 4 ? c.main : `${c.main}${i < 2 ? '80' : 'bb'}` }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: 14, padding: '11px 0', borderRadius: 12,
          background: `linear-gradient(135deg, ${c.main}, ${c.accent2})`,
        }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: 1 }}>
            {isZh ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →"}
          </span>
        </div>
      </div>

      {/* Left side decoration — vertical text */}
      <div style={{
        position: 'absolute', left: 56, top: '50%', display: 'flex',
        transform: 'translateY(-50%) rotate(-90deg)',
      }}>
        <span style={{ fontSize: 11, letterSpacing: 6, opacity: 0.08, fontWeight: 900 }}>
          AIR · AI REPLACEMENT INDEX
        </span>
      </div>

      {/* Right side decoration — vertical text */}
      <div style={{
        position: 'absolute', right: 56, top: '50%', display: 'flex',
        transform: 'translateY(-50%) rotate(90deg)',
      }}>
        <span style={{ fontSize: 11, letterSpacing: 6, opacity: 0.08, fontWeight: 900 }}>
          air.democra.ai
        </span>
      </div>

      {/* Bottom center brand */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', display: 'flex',
        transform: 'translateX(-50%)',
      }}>
        <span style={{ fontSize: 10, letterSpacing: 3, opacity: 0.12 }}>air.democra.ai</span>
      </div>
    </div>,
    { ...size },
  );
}
