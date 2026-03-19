import { ImageResponse } from 'next/og';
import { decodeSharePayload, type SharePayload } from '@/lib/share_payload';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIR Share Result';

type ShareOgProps = {
  params: Promise<{ payload: string }>;
};

function riskLabel(payload: SharePayload): { en: string; zh: string } {
  if (payload.riskLevel === 'very-low') return { en: 'VERY LOW', zh: '极低' };
  if (payload.riskLevel === 'low') return { en: 'LOW', zh: '低' };
  if (payload.riskLevel === 'medium') return { en: 'MEDIUM', zh: '中等' };
  if (payload.riskLevel === 'high') return { en: 'HIGH', zh: '高' };
  return { en: 'CRITICAL', zh: '极高' };
}

function riskColor(level: SharePayload['riskLevel']): string {
  if (level === 'very-low') return '#22c55e';
  if (level === 'low') return '#00d66b';
  if (level === 'medium') return '#f59e0b';
  if (level === 'high') return '#f97316';
  return '#ff1744';
}

function hookLine(data: SharePayload): string {
  const isZh = data.lang === 'zh';
  const p = data.replacementProbability;
  if (p >= 80) return isZh ? 'AI 正在接管这个岗位' : 'AI is coming for this job';
  if (p >= 60) return isZh ? '这份工作正在被重塑' : 'This role is being reshaped';
  if (p >= 40) return isZh ? '变化已经开始了' : 'The shift has started';
  if (p >= 20) return isZh ? '暂时安全，但不能松懈' : 'Safe for now. Not forever.';
  return isZh ? '人类壁垒依然坚固' : 'The human barrier holds strong';
}

export default async function Image({ params }: ShareOgProps) {
  const { payload } = await params;
  const data = decodeSharePayload(payload);

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            background: 'linear-gradient(135deg, #050507 0%, #0d0b10 40%, #15121a 100%)',
            color: '#fafafa',
            fontFamily: 'sans-serif',
          }}
        >
          <span style={{ fontSize: 72, fontWeight: 800 }}>AIR</span>
          <span style={{ fontSize: 30, opacity: 0.85, marginTop: 10 }}>AI Replacement Risk</span>
        </div>
      ),
      { ...size },
    );
  }

  const isZh = data.lang === 'zh';
  const color = riskColor(data.riskLevel);
  const label = riskLabel(data);
  const hook = hookLine(data);
  const yearDisplay = data.predictedReplacementYear >= 2100 ? '∞' : `${data.predictedReplacementYear}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(150deg, #05070d 0%, #0c1020 50%, #15101e 100%)',
          color: '#f0f2ff',
          fontFamily: 'sans-serif',
          padding: '0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 5,
            display: 'flex',
            background: `linear-gradient(90deg, ${color}, #a855f7, #ec4899)`,
          }}
        />

        {/* Subtle glow behind the percentage */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '25%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            padding: '50px 60px 40px',
            gap: 50,
          }}
        >
          {/* Left: The Big Number */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '50%',
            }}
          >
            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: 4, opacity: 0.6 }}>AIR</span>
              <span style={{ fontSize: 16, opacity: 0.35 }}>|</span>
              <span style={{ fontSize: 16, opacity: 0.45, letterSpacing: 1 }}>
                {isZh ? 'AI 替代风险指数' : 'AI Replacement Index'}
              </span>
            </div>

            {/* THE number — this is the visual hammer */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span
                style={{
                  fontSize: 160,
                  fontWeight: 900,
                  lineHeight: 0.85,
                  color,
                  letterSpacing: -6,
                }}
              >
                {data.replacementProbability}
              </span>
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 800,
                  color,
                  opacity: 0.7,
                }}
              >
                %
              </span>
            </div>

            {/* Risk label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color,
                  letterSpacing: 3,
                }}
              >
                {label[isZh ? 'zh' : 'en']}
              </span>
              <span style={{ fontSize: 20, opacity: 0.5 }}>
                {isZh ? '风险' : 'RISK'}
              </span>
            </div>

            {/* Hook line */}
            <span style={{ fontSize: 22, opacity: 0.65, marginTop: 16, lineHeight: 1.3 }}>
              {hook}
            </span>
          </div>

          {/* Right: Key stats */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '50%',
              gap: 16,
            }}
          >
            {/* Kill Line Year */}
            <div
              style={{
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(8,12,24,0.6)',
                padding: '24px 28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: 15, opacity: 0.5, letterSpacing: 1.5 }}>
                {isZh ? 'AI 斩杀线' : 'AI KILL LINE'}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
                <span style={{ fontSize: 72, fontWeight: 900, lineHeight: 1 }}>
                  {yearDisplay}
                </span>
                {data.predictedReplacementYear < 2100 && (
                  <span style={{ fontSize: 20, opacity: 0.4 }}>
                    ({data.earliestYear}–{data.latestYear})
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <div
              style={{
                borderRadius: 20,
                background: `linear-gradient(135deg, ${color}20, rgba(168,85,247,0.12))`,
                border: `1px solid ${color}35`,
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, opacity: 0.9 }}>
                {isZh ? '你的 AI 替代风险是多少？' : "What's your AI replacement risk?"}
              </span>
            </div>

            {/* URL hint */}
            <span style={{ fontSize: 16, opacity: 0.3, textAlign: 'center', letterSpacing: 0.5 }}>
              air.democra.ai
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
