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
  const map = {
    'very-low': isZh ? '极低风险' : 'VERY LOW',
    'low': isZh ? '低风险' : 'LOW',
    'medium': isZh ? '中等风险' : 'MEDIUM',
    'high': isZh ? '高风险' : 'HIGH',
    'critical': isZh ? '极高风险' : 'CRITICAL',
  };
  return map[level] || map.critical;
}

function riskColor(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return '#22c55e';
  if (level === 'low') return '#00d66b';
  if (level === 'medium') return '#f59e0b';
  if (level === 'high') return '#f97316';
  return '#ff1744';
}

function riskEmoji(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return '🛡️';
  if (level === 'low') return '🟢';
  if (level === 'medium') return '⚡';
  if (level === 'high') return '🔥';
  return '💀';
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
  const label = riskLabel(data.riskLevel, isZh);
  const emoji = riskEmoji(data.riskLevel);
  const yearDisplay = data.predictedReplacementYear >= 2100 ? '∞' : `${data.predictedReplacementYear}`;
  const prob = data.replacementProbability;

  // Progress bar segments (5 stages matching the kill line bar)
  const barWidth = 520;
  const fillWidth = Math.round((prob / 100) * barWidth);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#08090f',
          color: '#e8eaff',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background radial glow */}
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}08 0%, transparent 70%)`,
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: -200, left: -100,
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${color}, #a855f7, #ec4899)`,
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{
          display: 'flex', flexDirection: 'row',
          width: '100%', height: '100%',
          padding: '48px 56px',
        }}>
          {/* Left column — the result */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            width: '58%', justifyContent: 'space-between',
          }}>
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: 5, color: '#ffffff', opacity: 0.5 }}>AIR</span>
              <span style={{ fontSize: 14, opacity: 0.25, letterSpacing: 1 }}>AI REPLACEMENT INDEX</span>
            </div>

            {/* Main stat block */}
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: -10 }}>
              {/* Emoji + label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 36 }}>{emoji}</span>
                <span style={{ fontSize: 32, fontWeight: 800, color, letterSpacing: 2 }}>{label}</span>
              </div>

              {/* THE big number */}
              <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
                <span style={{
                  fontSize: 144, fontWeight: 900, lineHeight: 0.9,
                  color, letterSpacing: -4,
                }}>
                  {prob}
                </span>
                <span style={{ fontSize: 48, fontWeight: 700, color, opacity: 0.6, marginLeft: 4 }}>%</span>
              </div>

              {/* Mini progress bar */}
              <div style={{ display: 'flex', marginTop: 16, width: barWidth, position: 'relative' }}>
                {/* Track */}
                <div style={{
                  width: barWidth, height: 12, borderRadius: 6,
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex', overflow: 'hidden',
                }}>
                  {/* Fill */}
                  <div style={{
                    width: fillWidth, height: 12,
                    borderRadius: 6,
                    background: `linear-gradient(90deg, ${color}90, ${color})`,
                    display: 'flex',
                  }} />
                </div>
                {/* Markers at 20, 40, 60, 80 */}
                {[20, 40, 60, 80].map(pct => (
                  <div key={pct} style={{
                    position: 'absolute',
                    left: Math.round((pct / 100) * barWidth),
                    top: 0, width: 1, height: 12,
                    background: 'rgba(255,255,255,0.12)',
                    display: 'flex',
                  }} />
                ))}
              </div>

              {/* Sub text */}
              <span style={{ fontSize: 18, opacity: 0.4, marginTop: 12 }}>
                {isZh ? 'AI 替代概率' : 'chance of AI replacement'}
              </span>
            </div>

            {/* CTA */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginTop: 8,
            }}>
              <span style={{ fontSize: 20, fontWeight: 700, opacity: 0.7 }}>
                {isZh ? '→ 测测你的 AI 替代风险' : "→ What's yours?"}
              </span>
              <span style={{ fontSize: 15, opacity: 0.25, marginLeft: 8 }}>air.democra.ai</span>
            </div>
          </div>

          {/* Right column — timeline card */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            width: '42%', justifyContent: 'center',
            paddingLeft: 40,
          }}>
            {/* Kill Line card */}
            <div style={{
              display: 'flex', flexDirection: 'column',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(160deg, rgba(12,16,30,0.9), rgba(16,20,40,0.6))',
              padding: '32px',
            }}>
              <span style={{ fontSize: 13, opacity: 0.4, letterSpacing: 2, fontWeight: 600 }}>
                {isZh ? 'AI 斩杀线' : 'AI KILL LINE'}
              </span>
              <span style={{
                fontSize: 80, fontWeight: 900, lineHeight: 1, marginTop: 10,
                color: '#ffffff',
              }}>
                {yearDisplay}
              </span>
              {data.predictedReplacementYear < 2100 && (
                <span style={{ fontSize: 18, opacity: 0.35, marginTop: 8, fontFamily: 'monospace' }}>
                  {data.earliestYear} — {data.latestYear}
                </span>
              )}
            </div>

            {/* Current degree mini stat */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 16, padding: '16px 24px',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(12,16,30,0.5)',
            }}>
              <span style={{ fontSize: 14, opacity: 0.4 }}>
                {isZh ? '当前替代程度' : 'Current Degree'}
              </span>
              <span style={{ fontSize: 28, fontWeight: 800, color: '#57d9ef' }}>
                {data.currentReplacementDegree}%
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
