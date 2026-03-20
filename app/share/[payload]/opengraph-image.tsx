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
    'very-low': ['VERY LOW RISK', '极低风险'],
    'low': ['LOW RISK', '低风险'],
    'medium': ['MEDIUM RISK', '中等风险'],
    'high': ['HIGH RISK', '高风险'],
    'critical': ['CRITICAL RISK', '极高风险'],
  };
  const pair = map[level] || map.critical;
  return isZh ? pair[1] : pair[0];
}

function riskColor(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return '#34d399';
  if (level === 'low') return '#4ade80';
  if (level === 'medium') return '#fbbf24';
  if (level === 'high') return '#fb923c';
  return '#f43f5e';
}

function bgGradient(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return 'linear-gradient(140deg, #021a12 0%, #0a1628 50%, #061220 100%)';
  if (level === 'low') return 'linear-gradient(140deg, #021a15 0%, #0a1628 50%, #061220 100%)';
  if (level === 'medium') return 'linear-gradient(140deg, #1a1408 0%, #0f1328 50%, #18101c 100%)';
  if (level === 'high') return 'linear-gradient(140deg, #1a0e06 0%, #12101e 50%, #1a0c14 100%)';
  return 'linear-gradient(140deg, #1a0608 0%, #14081a 50%, #1a060e 100%)';
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
          background: '#080a10', color: '#fafafa', fontFamily: 'sans-serif',
        }}>
          <span style={{ fontSize: 64, fontWeight: 900, letterSpacing: 8 }}>AIR</span>
          <span style={{ fontSize: 24, opacity: 0.5, marginTop: 12, letterSpacing: 2 }}>AI REPLACEMENT INDEX</span>
        </div>
      ),
      { ...size },
    );
  }

  const isZh = data.lang === 'zh';
  const color = riskColor(data.riskLevel);
  const label = riskLabel(data.riskLevel, isZh);
  const prob = data.replacementProbability;
  const yearDisplay = data.predictedReplacementYear >= 2100 ? '∞' : String(data.predictedReplacementYear);
  const bg = bgGradient(data.riskLevel);

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: bg, fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
      }}>
        {/* Accent top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${color}, ${color}80, transparent)`,
          display: 'flex',
        }} />

        {/* Large ambient glow */}
        <div style={{
          position: 'absolute', top: -80, right: -120, width: 500, height: 500,
          borderRadius: '50%', display: 'flex',
          background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
        }} />

        {/* Content wrapper */}
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1,
          padding: '52px 64px 44px',
        }}>

          {/* Row 1: Brand + Risk label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: 6, color: '#fff', opacity: 0.4 }}>AIR</span>
              <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.15)', display: 'flex' }} />
              <span style={{ fontSize: 15, opacity: 0.3, letterSpacing: 2 }}>
                {isZh ? 'AI 替代风险指数' : 'AI REPLACEMENT INDEX'}
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '8px 20px', borderRadius: 100,
              border: `1.5px solid ${color}50`,
              background: `${color}12`,
            }}>
              <span style={{ fontSize: 16, fontWeight: 800, color, letterSpacing: 2 }}>{label}</span>
            </div>
          </div>

          {/* Row 2: THE BIG NUMBER — hero section */}
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginTop: 32, flex: 1,
          }}>
            {/* Left: probability */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 15, opacity: 0.35, letterSpacing: 2, marginBottom: 8 }}>
                {isZh ? '替代概率' : 'REPLACEMENT PROBABILITY'}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{
                  fontSize: 180, fontWeight: 900, color: '#fff', lineHeight: 0.82,
                  letterSpacing: -8,
                }}>{prob}</span>
                <span style={{
                  fontSize: 64, fontWeight: 800, color: '#fff', opacity: 0.35,
                  marginLeft: 4, lineHeight: 0.82,
                }}>%</span>
              </div>
            </div>

            {/* Right: year + stats */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
              gap: 16, marginBottom: 16,
            }}>
              {/* Kill Line */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: 13, opacity: 0.3, letterSpacing: 2 }}>
                  {isZh ? 'AI 斩杀线' : 'AI KILL LINE'}
                </span>
                <span style={{ fontSize: 72, fontWeight: 900, color: '#fff', lineHeight: 1, marginTop: 2 }}>
                  {yearDisplay}
                </span>
                {data.predictedReplacementYear < 2100 && (
                  <span style={{ fontSize: 16, opacity: 0.3, marginTop: 4 }}>
                    {data.earliestYear} – {data.latestYear}
                  </span>
                )}
              </div>

              {/* Current degree */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 20px', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
              }}>
                <span style={{ fontSize: 14, opacity: 0.35 }}>
                  {isZh ? '当前程度' : 'Current'}
                </span>
                <span style={{ fontSize: 28, fontWeight: 800, color: '#67e8f9' }}>
                  {data.currentReplacementDegree}%
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Bottom bar — progress + CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginTop: 24,
          }}>
            {/* Progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, marginRight: 40 }}>
              <div style={{
                width: '100%', height: 8, borderRadius: 4, display: 'flex',
                background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  width: `${prob}%`, height: '100%', borderRadius: 4, display: 'flex',
                  background: `linear-gradient(90deg, ${color}90, ${color})`,
                }} />
                {/* stage markers */}
                {[20, 40, 60, 80].map(pct => (
                  <div key={pct} style={{
                    position: 'absolute', left: `${pct}%`, top: 0, bottom: 0,
                    width: 1, background: 'rgba(255,255,255,0.1)', display: 'flex',
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.2 }}>
                <span style={{ fontSize: 10 }}>0%</span>
                <span style={{ fontSize: 10 }}>KILL LINE →</span>
                <span style={{ fontSize: 10 }}>100%</span>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 12,
              background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
                {isZh ? '测测你的风险 →' : 'Test yours →'}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
