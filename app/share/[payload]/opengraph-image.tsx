import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type ShareOgProps = {
  params: Promise<{ payload: string }>;
};

function riskLabel(level: SharePayload['riskLevel'], isZh: boolean): string {
  const map: Record<string, [string, string]> = {
    'very-low': ['VERY LOW', '极低'],
    'low': ['LOW', '低'],
    'medium': ['MEDIUM', '中等'],
    'high': ['HIGH', '高'],
    'critical': ['CRITICAL', '极高'],
  };
  const [en, zh] = map[level] || map.critical;
  return isZh ? zh : en;
}

function riskColor(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return '#22c55e';
  if (level === 'low') return '#4ade80';
  if (level === 'medium') return '#fbbf24';
  if (level === 'high') return '#f97316';
  return '#ef4444';
}

function riskGradient(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return 'linear-gradient(135deg, #22c55e, #10b981)';
  if (level === 'low') return 'linear-gradient(135deg, #4ade80, #22d3ee)';
  if (level === 'medium') return 'linear-gradient(135deg, #fbbf24, #f97316)';
  if (level === 'high') return 'linear-gradient(135deg, #f97316, #ef4444)';
  return 'linear-gradient(135deg, #ef4444, #dc2626)';
}

export default async function Image({ params }: ShareOgProps) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      (
        <div style={{
          width: '100%', height: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          background: '#08090f', color: '#fafafa', fontFamily: 'sans-serif',
        }}>
          <span style={{ fontSize: 72, fontWeight: 800 }}>AIR</span>
          <span style={{ fontSize: 28, opacity: 0.6, marginTop: 12 }}>AI Replacement Index</span>
        </div>
      ),
      { ...size },
    );
  }

  const isZh = data.lang === 'zh';
  const color = riskColor(data.riskLevel);
  const gradient = riskGradient(data.riskLevel);
  const label = riskLabel(data.riskLevel, isZh);
  const prob = data.replacementProbability;
  const yearDisplay = data.predictedReplacementYear >= 2100 ? '∞' : `${data.predictedReplacementYear}`;

  // Progress ring calculation (for a circular gauge)
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const fillPct = prob / 100;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0b10',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid pattern */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        {/* Large glow behind gauge */}
        <div style={{
          position: 'absolute', top: '50%', left: '320px',
          width: 500, height: 500, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}12 0%, transparent 65%)`,
          transform: 'translateY(-50%)',
          display: 'flex',
        }} />

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: gradient, display: 'flex',
        }} />

        {/* Main layout */}
        <div style={{
          display: 'flex', flexDirection: 'row', width: '100%', height: '100%',
          padding: '40px 56px', alignItems: 'center',
        }}>

          {/* LEFT: Circular gauge + number */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            width: '48%', position: 'relative',
          }}>
            {/* Circular gauge */}
            <div style={{ position: 'relative', width: 260, height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Track */}
              <svg width="260" height="260" viewBox="0 0 260 260" style={{ position: 'absolute' }}>
                <circle cx="130" cy="130" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                <circle
                  cx="130" cy="130" r={radius} fill="none"
                  stroke={color} strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference * fillPct} ${circumference * (1 - fillPct)}`}
                  transform="rotate(-90 130 130)"
                  style={{ filter: `drop-shadow(0 0 12px ${color}80)` }}
                />
              </svg>
              {/* Number in center */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{
                    fontSize: 96, fontWeight: 900, color: '#ffffff', lineHeight: 1, letterSpacing: -3,
                  }}>
                    {prob}
                  </span>
                  <span style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', opacity: 0.5, marginLeft: 2 }}>%</span>
                </div>
                <span style={{ fontSize: 14, color, fontWeight: 700, letterSpacing: 3, marginTop: 4 }}>
                  {label} {isZh ? '风险' : 'RISK'}
                </span>
              </div>
            </div>

            {/* Brand below gauge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: 4, color: '#ffffff', opacity: 0.35 }}>AIR</span>
              <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', display: 'flex' }} />
              <span style={{ fontSize: 12, opacity: 0.25, letterSpacing: 1 }}>
                {isZh ? 'AI 替代风险指数' : 'AI Replacement Index'}
              </span>
            </div>
          </div>

          {/* RIGHT: Stats + CTA */}
          <div style={{
            display: 'flex', flexDirection: 'column', width: '52%',
            justifyContent: 'center', gap: 16, paddingLeft: 24,
          }}>
            {/* Kill Line Year */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 28px', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 12, opacity: 0.4, letterSpacing: 2, fontWeight: 600 }}>
                  {isZh ? 'AI 斩杀线' : 'AI KILL LINE'}
                </span>
                <span style={{ fontSize: 48, fontWeight: 900, color: '#ffffff', lineHeight: 1, marginTop: 4 }}>
                  {yearDisplay}
                </span>
              </div>
              {data.predictedReplacementYear < 2100 && (
                <span style={{ fontSize: 16, opacity: 0.3, fontFamily: 'monospace' }}>
                  {data.earliestYear}–{data.latestYear}
                </span>
              )}
            </div>

            {/* Current Degree */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 28px', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              <span style={{ fontSize: 14, opacity: 0.35 }}>
                {isZh ? '当前替代程度' : 'Current AI Progress'}
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#67e8f9' }}>
                {data.currentReplacementDegree}%
              </span>
            </div>

            {/* CTA — the viral hook */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '22px 28px', borderRadius: 16,
              background: gradient,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Glass overlay */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15), transparent)',
                display: 'flex',
              }} />
              <span style={{
                fontSize: 24, fontWeight: 800, color: '#ffffff', letterSpacing: 0.5,
                zIndex: 1, textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}>
                {isZh ? '你的 AI 替代风险是多少？→' : "What's your risk? Take the test →"}
              </span>
            </div>

            {/* URL */}
            <span style={{ fontSize: 14, opacity: 0.2, textAlign: 'center', letterSpacing: 1 }}>
              air.democra.ai
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
