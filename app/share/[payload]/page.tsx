import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { decodeSharePayload, type SharePayload, type ShareLang } from '@/lib/share_payload';
import { PROFILE_TYPES, QUIZ_DIMENSIONS, RISK_TIER_INFO } from '@/lib/air_quiz_data';
import { getProfileCalibration } from '@/lib/air_quiz_calculator';
import { generateAdvice } from '@/lib/air_advice_data';

type SharePageProps = {
  params: Promise<{ payload: string }>;
};

// ─── i18n ────────────────────────────────────────────────────────────────────

type L10nObj = { en: string; zh: string; ja?: string; ko?: string; de?: string };

function L(obj: L10nObj, lang: ShareLang): string {
  return (obj as Record<string, string>)[lang] ?? obj.en;
}

const UI: Record<string, Record<ShareLang, string>> = {
  replProb:       { en: 'replacement probability', zh: '替代概率', ja: '代替確率', ko: '대체 확률', de: 'Ersetzungswahrscheinlichkeit' },
  predYear:       { en: 'predicted year', zh: '预测年份', ja: '予測年', ko: '예측 연도', de: 'Prognosejahr' },
  unpredictable:  { en: 'Unpredictable', zh: '不可预测', ja: '予測不能', ko: '예측 불가', de: 'Unvorhersagbar' },
  takeSelf:       { en: 'What\u2019s your risk?', zh: '测测你的风险', ja: 'あなたのリスクは?', ko: '당신의 리스크는?', de: 'Ihr Risiko?' },
  superpower:     { en: 'Superpower', zh: '超能力', ja: '超能力', ko: '초능력', de: 'Superkraft' },
  kryptonite:     { en: 'Weakness', zh: '弱点', ja: '弱点', ko: '약점', de: 'Schwäche' },
  range:          { en: 'Range', zh: '区间', ja: '範囲', ko: '범위', de: 'Bereich' },
};

function t(key: string, lang: ShareLang): string {
  return UI[key]?.[lang] ?? UI[key]?.en ?? key;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];
const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];

const GAUGE_STAGES = [
  { label: 'SAFE', zh: '安全', color: '#34d399' },
  { label: 'ASSIST', zh: '辅助', color: '#4ade80' },
  { label: 'AGENT', zh: '代理', color: '#fbbf24' },
  { label: 'LEAD', zh: '主导', color: '#fb923c' },
  { label: 'KILL', zh: '斩杀', color: '#f43f5e' },
];

function riskColorFromScore(score: number): string {
  if (score >= 60) return '#ff1744';
  if (score >= 40) return '#ff5722';
  if (score >= 20) return '#ffc107';
  return '#34d399';
}

// ─── Metadata ────────────────────────────────────────────────────────────────

function riskLabel(payload: SharePayload): string {
  const isZh = payload.lang === 'zh';
  if (payload.riskLevel === 'very-low') return isZh ? '极低风险' : 'Very Low Risk';
  if (payload.riskLevel === 'low') return isZh ? '低风险' : 'Low Risk';
  if (payload.riskLevel === 'medium') return isZh ? '中等风险' : 'Medium Risk';
  if (payload.riskLevel === 'high') return isZh ? '高风险' : 'High Risk';
  return isZh ? '极高风险' : 'Critical Risk';
}

function riskDescription(payload: SharePayload): string {
  const isZh = payload.lang === 'zh';
  return isZh
    ? `我的 AI 替代风险：${riskLabel(payload)}（${payload.replacementProbability}%），AI 斩杀线：${payload.predictedReplacementYear} 年。`
    : `My AI replacement risk is ${riskLabel(payload)} (${payload.replacementProbability}%), with an AI kill line around ${payload.predictedReplacementYear}.`;
}

async function requestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (!host) return process.env.NEXT_PUBLIC_BASE_URL || 'https://air.democra.ai';
  const proto = h.get('x-forwarded-proto') ?? (host.includes('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const { payload } = await params;
  const decoded = decodeSharePayload(payload);
  const origin = await requestOrigin();

  if (!decoded) {
    const title = 'AIR - Shared AI Risk Result';
    const description = 'Open this result in AIR to calculate and compare your AI replacement risk.';
    const fallbackImage = `${origin}/share-card.png`;
    const url = `${origin}/share/${payload}`;
    return {
      title, description,
      openGraph: { title, description, type: 'website', url, siteName: 'AIR', images: [{ url: fallbackImage, width: 1200, height: 630, alt: title }] },
      twitter: { card: 'summary_large_image', title, description, images: [fallbackImage] },
    };
  }

  const title = decoded.lang === 'zh' ? `AI 风险结果：${riskLabel(decoded)}` : `AI Risk Result: ${riskLabel(decoded)}`;
  const description = riskDescription(decoded);
  const shareImageUrl = `${origin}/share/${payload}/opengraph-image?v=2`;
  const pageUrl = `${origin}/share/${payload}`;

  return {
    title, description,
    openGraph: { title, description, type: 'website', url: pageUrl, siteName: 'AIR', images: [{ url: shareImageUrl, width: 1200, height: 630, alt: 'AIR share card' }] },
    twitter: { card: 'summary_large_image', title, description, images: [shareImageUrl] },
  };
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function ShareResultPage({ params }: SharePageProps) {
  const { payload } = await params;
  const result = decodeSharePayload(payload);
  const origin = await requestOrigin();

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${origin}/share-card.png`} alt="AIR" width={600} height={315} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />
        <div className="max-w-xl w-full p-8 text-center">
          <h1 className="text-2xl font-bold">Invalid Share Link</h1>
          <p className="mt-3 text-foreground-muted">This result link is incomplete or expired.</p>
          <Link href="/#risk-calculator" className="inline-flex mt-6 rounded-xl bg-risk-high px-5 py-2.5 text-white font-semibold hover:bg-risk-high/85 transition-colors">
            Open Calculator
          </Link>
        </div>
      </main>
    );
  }

  const lang = result.lang;
  const profileCode = (result.v === 2 ? result.profileCode : undefined) ?? null;
  const profile = profileCode ? PROFILE_TYPES[profileCode] : null;
  const calibration = profileCode ? getProfileCalibration(profileCode) : null;
  const riskTier = profile?.riskTier;
  const riskColor = riskTier ? RISK_TIER_INFO[riskTier].color : riskColorFromScore(result.replacementProbability);
  const ac = profile?.color || riskColor;

  const dimLetters = profileCode ? profileCode.split('') : [];
  const dimensions = dimLetters.map((letter, i) => {
    const quizDim = QUIZ_DIMENSIONS[i];
    const isFavorable = letter === FAVORABLE_LETTERS[i];
    return { letter, dimensionId: quizDim?.id ?? '', isFavorable, quizDim };
  });

  const adviceList = profileCode
    ? generateAdvice(dimensions.map(d => ({ dimensionId: d.dimensionId, isFavorable: d.isFavorable })))
    : [];

  const isInfinity = !isFinite(result.predictedReplacementYear);
  const prob = result.replacementProbability;
  const activeStageIdx = Math.min(Math.floor(prob / 20), 4);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${origin}/share-card.png`} alt="" width={600} height={315} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />

      <main className="min-h-screen overflow-hidden" style={{ background: '#0a0908' }}>

        {/* ━━━ HERO ZONE ━━━ Full-bleed character reveal */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-end">

          {/* Accent color wash behind character */}
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${ac}, transparent)` }}
          />

          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")', backgroundSize: '256px 256px' }} />

          {/* Profile code as massive watermark */}
          {profileCode && (
            <div
              className="absolute top-[12vh] left-1/2 -translate-x-1/2 select-none pointer-events-none"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(180px, 35vw, 360px)',
                fontWeight: 900,
                letterSpacing: '0.15em',
                lineHeight: 1,
                color: `${ac}06`,
              }}
            >
              {profileCode}
            </div>
          )}

          {/* Character illustration, centered and large */}
          {profileCode && profile && (
            <div className="absolute top-[8vh] sm:top-[6vh] left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/characters/${profileCode}.png`}
                alt={L(profile.archetype, lang)}
                className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          )}

          {/* Bottom content overlay */}
          <div
            className="relative z-10 px-6 sm:px-8 pb-8"
            style={{ background: 'linear-gradient(to top, #0a0908 0%, #0a0908ee 40%, transparent 100%)' }}
          >
            {/* AIR tag */}
            <div className="mb-6 pt-32 sm:pt-40">
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-1"
                style={{ color: ac, borderLeft: `2px solid ${ac}` }}
              >
                AI Replacement Index
              </span>
            </div>

            {/* Archetype name — large, left-aligned */}
            {profile ? (
              <h1
                className="leading-[0.9] tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 10vw, 4.5rem)',
                  fontWeight: 800,
                  color: ac,
                }}
              >
                {L(profile.archetype, lang)}
              </h1>
            ) : (
              <h1
                className="text-5xl sm:text-7xl font-extrabold tracking-tight leading-[0.9]"
                style={{ color: ac }}
              >
                {prob}%
              </h1>
            )}

            {/* Profile code + tagline */}
            {profile && profileCode && (
              <div className="mt-4 flex items-start gap-4">
                <span
                  className="text-sm font-bold tracking-[0.3em] mt-1 flex-shrink-0"
                  style={{ color: `${ac}66`, fontFamily: 'var(--font-body)' }}
                >
                  {profileCode}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: '#8e878099' }}>
                  {L(profile.tagline, lang)}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ━━━ GAUGE STRIP ━━━ Full-width status bar */}
        <section className="relative" style={{ backgroundColor: '#0d0b09' }}>
          {/* Top accent line */}
          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${ac}30, transparent)` }} />

          <div className="px-6 sm:px-8 py-5">
            <div className="flex gap-1">
              {GAUGE_STAGES.map((stage, i) => {
                const segStart = i * 20;
                const segEnd = segStart + 20;
                const fill = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
                const isActive = i === activeStageIdx;

                return (
                  <div key={i} className="flex-1">
                    <div
                      className="relative h-1.5 rounded-sm overflow-hidden"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    >
                      {fill > 0 && (
                        <div
                          className="absolute inset-y-0 left-0 rounded-sm"
                          style={{ width: `${fill * 100}%`, backgroundColor: stage.color }}
                        />
                      )}
                    </div>
                    <div
                      className="mt-2 text-center"
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        letterSpacing: '0.15em',
                        color: isActive ? stage.color : 'rgba(255,255,255,0.12)',
                      }}
                    >
                      {lang === 'zh' ? stage.zh : stage.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${ac}15, transparent)` }} />
        </section>

        {/* ━━━ DATA ZONE ━━━ */}
        <section className="px-6 sm:px-8 pt-10 pb-8">

          {/* Two big numbers side by side */}
          <div className="flex items-baseline gap-8 sm:gap-12">
            {/* Probability */}
            <div>
              <div className="flex items-baseline">
                <span
                  className="tabular-nums leading-none"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(3rem, 12vw, 5rem)',
                    fontWeight: 700,
                    color: ac,
                  }}
                >
                  {prob}
                </span>
                <span
                  className="leading-none ml-1"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
                    fontWeight: 700,
                    color: `${ac}80`,
                  }}
                >
                  %
                </span>
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.12em] font-medium" style={{ color: '#8e878060' }}>
                {t('replProb', lang)}
              </div>
            </div>

            {/* Year */}
            <div>
              <div className="flex items-baseline">
                {isInfinity ? (
                  <span
                    className="leading-none"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(3rem, 12vw, 5rem)',
                      fontWeight: 700,
                      color: '#f5f3f0',
                    }}
                  >
                    &infin;
                  </span>
                ) : (
                  <span
                    className="tabular-nums leading-none"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(3rem, 12vw, 5rem)',
                      fontWeight: 700,
                      color: '#f5f3f0',
                    }}
                  >
                    {result.predictedReplacementYear}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.12em] font-medium" style={{ color: '#8e878060' }}>
                {t('predYear', lang)}
              </div>
              {!isInfinity && (
                <div className="mt-0.5 text-[10px] font-mono" style={{ color: '#8e878030' }}>
                  {t('range', lang)} {result.earliestYear}&ndash;{result.latestYear}
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="mt-10 mb-8 h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />

          {/* 4-Dimension DNA strip */}
          {dimensions.length === 4 && (
            <div className="flex items-stretch gap-0 mb-10">
              {dimensions.map((dim, i) => {
                const quizDim = dim.quizDim;
                if (!quizDim) return null;
                const color = DIMENSION_COLORS[i];
                const label = dim.isFavorable
                  ? L(quizDim.favorableLabel, lang)
                  : L(quizDim.resistantLabel, lang);

                return (
                  <div key={dim.dimensionId} className="flex-1 relative" style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
                    {/* Colored top bar */}
                    <div className="h-1 mb-3" style={{ backgroundColor: color, opacity: 0.7 }} />
                    <div className="px-3">
                      <div
                        className="text-xl sm:text-2xl font-bold leading-none"
                        style={{ color, fontFamily: 'var(--font-body)' }}
                      >
                        {dim.letter}
                      </div>
                      <div className="mt-2 text-[9px] uppercase tracking-[0.08em] font-medium leading-tight" style={{ color: '#8e878040' }}>
                        {L(quizDim.name, lang)}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold leading-tight" style={{ color: `${color}99` }}>
                        {label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Superpower + Kryptonite — editorial layout */}
          {profile && (
            <div className="space-y-6 mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: '#34d399' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: '#34d39999' }}>
                    {t('superpower', lang)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed pl-3" style={{ color: '#f5f3f0bb' }}>
                  {L(profile.superpower, lang)}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 rounded-full" style={{ backgroundColor: '#f43f5e' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: '#f43f5e99' }}>
                    {t('kryptonite', lang)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed pl-3" style={{ color: '#f5f3f0bb' }}>
                  {L(profile.kryptonite, lang)}
                </p>
              </div>
            </div>
          )}

          {/* Vulnerability + Defense (if available) — brief one-liners */}
          {calibration && (
            <div className="mb-10 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-xs leading-relaxed" style={{ color: '#8e878060' }}>
                <span style={{ color: '#f43f5e88' }}>&#9632;</span>{' '}
                {L(calibration.vulnerabilities, lang)}
              </p>
              <p className="text-xs leading-relaxed mt-3" style={{ color: '#8e878060' }}>
                <span style={{ color: '#34d39988' }}>&#9632;</span>{' '}
                {L(calibration.strengths, lang)}
              </p>
            </div>
          )}

          {/* Top 3 action items — numbered list, minimal */}
          {adviceList.length > 0 && (
            <div className="mb-10">
              {adviceList.slice(0, 3).map((advice, ai) => (
                <div
                  key={ai}
                  className="flex items-baseline gap-3 py-3"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}
                >
                  <span
                    className="text-[10px] font-bold tabular-nums flex-shrink-0"
                    style={{ color: ai === 0 ? ac : '#8e878040', fontFamily: 'var(--font-body)' }}
                  >
                    {String(ai + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold" style={{ color: ai === 0 ? '#f5f3f0cc' : '#f5f3f099' }}>
                      {L(advice.title, lang)}
                    </span>
                    <span className="text-[11px] ml-2" style={{ color: '#8e878040' }}>
                      {L(advice.body, lang)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="px-6 sm:px-8 pb-12">
          <Link
            href="/#risk-calculator"
            className="group flex items-center justify-between w-full py-5 px-6 transition-colors duration-300"
            style={{
              backgroundColor: ac,
              color: '#0a0908',
            }}
          >
            <span className="text-base sm:text-lg font-bold tracking-tight">
              {t('takeSelf', lang)}
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: '#8e878030' }}>
              air.democra.ai
            </span>
            <span className="text-[10px]" style={{ color: '#8e878020' }}>
              AI Replacement Index
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
