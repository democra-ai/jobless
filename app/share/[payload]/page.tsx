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

      <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12" style={{ background: '#0a0908' }}>
        <div className="w-full max-w-[420px]">

          {/* ━━━ THE CARD ━━━ */}
          <div
            className="relative overflow-hidden"
            style={{
              background: '#100e0c',
              border: `1px solid rgba(255,255,255,0.06)`,
              borderRadius: '2px',
            }}
          >
            {/* Accent color wash */}
            <div
              className="absolute inset-0 opacity-[0.08] pointer-events-none"
              style={{ background: `radial-gradient(ellipse 100% 50% at 50% 0%, ${ac}, transparent)` }}
            />

            {/* ── Hero: Character + Identity ── */}
            <div className="relative pt-5 px-5 pb-4">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.2em] pl-2"
                  style={{ color: ac, borderLeft: `2px solid ${ac}` }}
                >
                  AI Replacement Index
                </span>
                <span className="text-[9px]" style={{ color: '#8e878025' }}>
                  air.democra.ai
                </span>
              </div>

              {profileCode && profile ? (
                <div className="flex items-start gap-4">
                  {/* Character */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="absolute inset-0 blur-[30px] opacity-25 rounded-full"
                      style={{ backgroundColor: ac }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/characters/${profileCode}.png`}
                      alt={L(profile.archetype, lang)}
                      className="relative w-28 h-28 sm:w-32 sm:h-32 object-contain"
                    />
                  </div>
                  {/* Identity */}
                  <div className="flex-1 min-w-0 pt-2">
                    <h1
                      className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[0.95]"
                      style={{ color: ac }}
                    >
                      {L(profile.archetype, lang)}
                    </h1>
                    <div
                      className="mt-1.5 text-xs font-bold tracking-[0.3em]"
                      style={{ color: `${ac}55`, fontFamily: 'var(--font-body)' }}
                    >
                      {profileCode}
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed" style={{ color: '#8e878070' }}>
                      {L(profile.tagline, lang)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-2">
                  <div className="text-4xl font-extrabold" style={{ color: ac }}>{prob}%</div>
                  <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ac }}>{riskLabel(result)}</div>
                </div>
              )}
            </div>

            {/* ── Gauge strip ── */}
            <div className="px-5 pb-4">
              <div className="flex gap-[2px]">
                {GAUGE_STAGES.map((stage, i) => {
                  const segStart = i * 20;
                  const segEnd = segStart + 20;
                  const fill = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
                  const isActive = i === activeStageIdx;
                  return (
                    <div key={i} className="flex-1">
                      <div className="relative h-1 overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '1px' }}>
                        {fill > 0 && (
                          <div className="absolute inset-y-0 left-0" style={{ width: `${fill * 100}%`, backgroundColor: stage.color, borderRadius: '1px' }} />
                        )}
                      </div>
                      <div
                        className="mt-1 text-center"
                        style={{ fontSize: '7px', fontWeight: 800, letterSpacing: '0.12em', color: isActive ? stage.color : 'rgba(255,255,255,0.1)' }}
                      >
                        {lang === 'zh' ? stage.zh : stage.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="h-px mx-5" style={{ background: 'rgba(255,255,255,0.05)' }} />

            {/* ── Metrics ── */}
            <div className="px-5 py-4 flex items-baseline gap-6">
              <div>
                <div className="flex items-baseline">
                  <span className="tabular-nums leading-none" style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 700, color: ac }}>
                    {prob}
                  </span>
                  <span className="leading-none ml-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: `${ac}70` }}>
                    %
                  </span>
                </div>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.1em] font-medium" style={{ color: '#8e878050' }}>
                  {t('replProb', lang)}
                </div>
              </div>
              <div>
                <span className="tabular-nums leading-none" style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 700, color: '#f5f3f0' }}>
                  {isInfinity ? '\u221E' : result.predictedReplacementYear}
                </span>
                <div className="mt-0.5 text-[9px] uppercase tracking-[0.1em] font-medium" style={{ color: '#8e878050' }}>
                  {t('predYear', lang)}
                </div>
                {!isInfinity && (
                  <div className="text-[9px] font-mono" style={{ color: '#8e878025' }}>
                    {result.earliestYear}&ndash;{result.latestYear}
                  </div>
                )}
              </div>
            </div>

            {/* ── 4-Dimension DNA ── */}
            {dimensions.length === 4 && (
              <div className="flex mx-5 mb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                {dimensions.map((dim, i) => {
                  const quizDim = dim.quizDim;
                  if (!quizDim) return null;
                  const color = DIMENSION_COLORS[i];
                  const label = dim.isFavorable ? L(quizDim.favorableLabel, lang) : L(quizDim.resistantLabel, lang);
                  return (
                    <div
                      key={dim.dimensionId}
                      className="flex-1 pt-3"
                      style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined }}
                    >
                      <div className="h-[3px] w-6 mb-2 mx-2" style={{ backgroundColor: color, opacity: 0.6, borderRadius: '1px' }} />
                      <div className="px-2">
                        <div className="text-base font-bold leading-none" style={{ color, fontFamily: 'var(--font-body)' }}>
                          {dim.letter}
                        </div>
                        <div className="mt-1 text-[8px] uppercase tracking-[0.06em] font-medium leading-tight" style={{ color: '#8e878035' }}>
                          {L(quizDim.name, lang)}
                        </div>
                        <div className="mt-0.5 text-[9px] font-semibold leading-tight" style={{ color: `${color}88` }}>
                          {label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Superpower + Kryptonite ── */}
            {profile && (
              <div className="mx-5 mb-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px' }}>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-[3px] h-3 rounded-sm" style={{ backgroundColor: '#34d399' }} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: '#34d39988' }}>
                      {t('superpower', lang)}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed pl-[9px]" style={{ color: '#f5f3f0aa' }}>
                    {L(profile.superpower, lang)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-[3px] h-3 rounded-sm" style={{ backgroundColor: '#f43f5e' }} />
                    <span className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: '#f43f5e88' }}>
                      {t('kryptonite', lang)}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed pl-[9px]" style={{ color: '#f5f3f0aa' }}>
                    {L(profile.kryptonite, lang)}
                  </p>
                </div>
              </div>
            )}

            {/* ── Vulnerability + Defense ── */}
            {calibration && (
              <div className="mx-5 mb-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <p className="text-[10px] leading-relaxed" style={{ color: '#8e878050' }}>
                  <span style={{ color: '#f43f5e77' }}>&#9632;</span>{' '}
                  {L(calibration.vulnerabilities, lang)}
                </p>
                <p className="text-[10px] leading-relaxed mt-2" style={{ color: '#8e878050' }}>
                  <span style={{ color: '#34d39977' }}>&#9632;</span>{' '}
                  {L(calibration.strengths, lang)}
                </p>
              </div>
            )}

            {/* ── Action items ── */}
            {adviceList.length > 0 && (
              <div className="mx-5 mb-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
                {adviceList.slice(0, 3).map((advice, ai) => (
                  <div
                    key={ai}
                    className="flex items-baseline gap-2 py-2"
                    style={{ borderBottom: ai < 2 ? '1px solid rgba(255,255,255,0.02)' : undefined }}
                  >
                    <span
                      className="text-[9px] font-bold tabular-nums flex-shrink-0"
                      style={{ color: ai === 0 ? ac : '#8e878035', fontFamily: 'var(--font-body)' }}
                    >
                      {String(ai + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold" style={{ color: ai === 0 ? '#f5f3f0bb' : '#f5f3f088' }}>
                        {L(advice.title, lang)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── CTA bar ── */}
            <Link
              href="/#risk-calculator"
              className="group flex items-center justify-between w-full py-3.5 px-5 transition-colors duration-300"
              style={{ backgroundColor: ac, color: '#0a0908' }}
            >
              <span className="text-sm font-bold tracking-tight">
                {t('takeSelf', lang)}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
