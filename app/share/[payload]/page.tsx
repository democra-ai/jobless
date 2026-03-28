import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { decodeSharePayload, type SharePayload, type ShareLang } from '@/lib/share_payload';
import { PROFILE_TYPES, QUIZ_DIMENSIONS, RISK_TIER_INFO } from '@/lib/air_quiz_data';
import { getProfileCalibration } from '@/lib/air_quiz_calculator';
import { PROFILE_CAREERS } from '@/lib/air_career_data';
import { generateAdvice } from '@/lib/air_advice_data';

type SharePageProps = {
  params: Promise<{ payload: string }>;
};

// ─── i18n helpers ────────────────────────────────────────────────────────────

type L10nObj = { en: string; zh: string; ja?: string; ko?: string; de?: string };

function L(obj: L10nObj, lang: ShareLang): string {
  return (obj as Record<string, string>)[lang] ?? obj.en;
}

const UI: Record<string, Record<ShareLang, string>> = {
  sharedFrom:     { en: 'Shared from AIR', zh: '来自 AIR 的分享结果', ja: 'AIR からの共有結果', ko: 'AIR에서 공유된 결과', de: 'Geteilt von AIR' },
  replProb:       { en: 'Replacement Probability', zh: '替代概率', ja: '代替確率', ko: '대체 확률', de: 'Ersetzungswahrscheinlichkeit' },
  predYear:       { en: 'Predicted Year', zh: '预测年份', ja: '予測年', ko: '예측 연도', de: 'Prognosejahr' },
  unpredictable:  { en: 'Unpredictable', zh: '不可预测', ja: '予測不能', ko: '예측 불가', de: 'Unvorhersagbar' },
  vulnerable:     { en: "Why You're Vulnerable", zh: '为什么你容易被替代', ja: 'あなたが脆弱な理由', ko: '취약한 이유', de: 'Warum Sie verwundbar sind' },
  defense:        { en: 'Your Defense', zh: '你的防御优势', ja: 'あなたの防御力', ko: '당신의 방어력', de: 'Ihre Verteidigung' },
  careerSpectrum: { en: 'Career Risk Spectrum', zh: '相关职业风险图谱', ja: 'キャリアリスクスペクトラム', ko: '직업 리스크 스펙트럼', de: 'Karriere-Risikospektrum' },
  careerHint:     { en: 'Higher risk = easier to replace', zh: '风险越高 = 越易被AI替代', ja: 'リスクが高い = 代替されやすい', ko: '리스크가 높을수록 = 대체되기 쉬움', de: 'Höheres Risiko = leichter zu ersetzen' },
  actionPlan:     { en: 'Action Plan', zh: '行动建议', ja: 'アクションプラン', ko: '행동 계획', de: 'Aktionsplan' },
  priority:       { en: 'Priority', zh: '首要', ja: '優先', ko: '우선', de: 'Priorität' },
  takeSelf:       { en: 'Take the Test Yourself', zh: '自己来测一下', ja: '自分でテストしてみる', ko: '직접 테스트 해보기', de: 'Selbst testen' },
  realityCheck:   { en: 'Reality Check:', zh: '现实检查：', ja: 'リアリティチェック:', ko: '현실 확인:', de: 'Realitätscheck:' },
  realityText:    { en: 'This is a probability estimate based on dimensional analysis, not a certainty. Your actual trajectory depends on your choices.', zh: '这是基于维度分析的概率估算，并非确定结论。你的实际轨迹取决于你的选择。', ja: 'これは次元分析に基づく確率推定であり、確実性ではありません。あなたの実際の軌跡はあなたの選択次第です。', ko: '이것은 차원 분석에 기반한 확률 추정이며, 확실한 결과가 아닙니다. 실제 경로는 당신의 선택에 달려 있습니다.', de: 'Dies ist eine Wahrscheinlichkeitsschätzung basierend auf Dimensionsanalyse, keine Gewissheit. Ihre tatsächliche Entwicklung hängt von Ihren Entscheidungen ab.' },
};

function t(key: string, lang: ShareLang): string {
  return UI[key]?.[lang] ?? UI[key]?.en ?? key;
}

// ─── Risk color helpers ──────────────────────────────────────────────────────

function riskColorFromScore(score: number): string {
  if (score >= 80) return '#ff1744';
  if (score >= 60) return '#ff1744';
  if (score >= 40) return '#ff5722';
  if (score >= 20) return '#ffc107';
  return '#34d399';
}

const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];

// The favorable letters per dimension (in order: learnability, evaluation, risk, presence)
const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];

// ─── Metadata (unchanged) ────────────────────────────────────────────────────

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
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'website',
        url,
        siteName: 'AIR',
        images: [{ url: fallbackImage, width: 1200, height: 630, alt: title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [fallbackImage],
      },
    };
  }

  const title = decoded.lang === 'zh' ? `AI 风险结果：${riskLabel(decoded)}` : `AI Risk Result: ${riskLabel(decoded)}`;
  const description = riskDescription(decoded);
  const shareImageUrl = `${origin}/share/${payload}/opengraph-image?v=2`;
  const pageUrl = `${origin}/share/${payload}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: pageUrl,
      siteName: 'AIR',
      images: [{ url: shareImageUrl, width: 1200, height: 630, alt: 'AIR share card' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImageUrl],
    },
  };
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function ShareResultPage({ params }: SharePageProps) {
  const { payload } = await params;
  const result = decodeSharePayload(payload);
  const origin = await requestOrigin();

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${origin}/share-card.png`}
          alt="AIR"
          width={600}
          height={315}
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
        />
        <div className="max-w-xl w-full rounded-2xl border border-surface-elevated bg-surface/70 p-8 text-center">
          <h1 className="text-2xl font-bold">Invalid Share Link</h1>
          <p className="mt-3 text-foreground-muted">
            This result link is incomplete or expired. Open AIR to create a new one.
          </p>
          <Link
            href="/#risk-calculator"
            className="inline-flex mt-6 rounded-xl bg-risk-high px-5 py-2.5 text-white font-semibold hover:bg-risk-high/85 transition-colors"
          >
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
  const careers = profileCode ? PROFILE_CAREERS[profileCode] : null;
  const riskTier = profile?.riskTier;
  const riskColor = riskTier ? RISK_TIER_INFO[riskTier].color : riskColorFromScore(result.replacementProbability);

  // Reconstruct dimension info from profileCode letters
  const dimLetters = profileCode ? profileCode.split('') : [];
  const dimensions = dimLetters.map((letter, i) => {
    const quizDim = QUIZ_DIMENSIONS[i];
    const isFavorable = letter === FAVORABLE_LETTERS[i];
    return {
      letter,
      dimensionId: quizDim?.id ?? '',
      isFavorable,
      quizDim,
    };
  });

  // Generate advice from dimensions
  const adviceList = profileCode
    ? generateAdvice(dimensions.map(d => ({ dimensionId: d.dimensionId, isFavorable: d.isFavorable })))
    : [];
  const accentColors = ['#ff1744', '#ffc107', '#34d399', '#448aff', '#e040fb'];

  const isInfinity = !isFinite(result.predictedReplacementYear);
  const probColor = riskColorFromScore(result.replacementProbability);
  const yearsAway = isInfinity ? 99 : result.predictedReplacementYear - new Date().getFullYear();
  const yearColor = isInfinity ? '#34d399' : riskColorFromScore(Math.max(0, Math.min(100, 100 - yearsAway * 4)));

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 sm:py-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${origin}/share-card.png`}
        alt={lang === 'zh' ? 'AI 风险结果' : 'AI Risk Result'}
        width={600}
        height={315}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      />
      <div className="max-w-[640px] mx-auto">
        <div className="mb-4 text-sm text-foreground-muted text-center">
          {t('sharedFrom', lang)}
        </div>

        {/* ══════════════ Unified Result Card ══════════════ */}
        <div
          className="relative overflow-hidden rounded-2xl"
          style={{ border: `1px solid ${riskColor}20` }}
        >
          {/* Background glow */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] opacity-15"
            style={{ backgroundColor: riskColor }}
          />

          <div className="relative z-10 p-6 sm:p-8">

            {/* ── Archetype Reveal (shareable identity) ── */}
            {profileCode && profile ? (
              <div className="text-center mb-6">
                {/* Icon + Archetype name */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/characters/${profileCode}.png`} alt={L(profile.archetype, lang)} className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-2 object-contain" />
                <div
                  className="text-2xl sm:text-3xl font-extrabold"
                  style={{ color: profile.color || riskColor }}
                >
                  {L(profile.archetype, lang)}
                </div>
                <div
                  className="text-sm font-bold tracking-[0.25em] mt-1.5"
                  style={{ color: (profile.color || riskColor) + 'aa', fontFamily: 'var(--font-body)' }}
                >
                  {profileCode}
                </div>
                <p className="text-sm sm:text-base text-foreground-muted mt-2 max-w-md mx-auto italic">
                  &ldquo;{L(profile.tagline, lang)}&rdquo;
                </p>
                <div
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{ color: riskColor, backgroundColor: riskColor + '15', border: `1px solid ${riskColor}30` }}
                >
                  {L(RISK_TIER_INFO[profile.riskTier].label, lang)}
                </div>
              </div>
            ) : (
              <div className="text-center mb-6">
                <div
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: riskColor }}
                >
                  {result.replacementProbability}%
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-widest mt-1"
                  style={{ color: riskColor }}
                >
                  {riskLabel(result)}
                </div>
              </div>
            )}

            {/* ── 4-Dimension Axis Display ── */}
            {dimensions.length === 4 && (
              <div className="space-y-3 mb-6">
                {dimensions.map((dim, i) => {
                  const quizDim = dim.quizDim;
                  if (!quizDim) return null;
                  const color = DIMENSION_COLORS[i];
                  // Without rawAverage, show binary: favorable = 75%, resistant = 25%
                  const positionPct = dim.isFavorable ? 75 : 25;
                  const leftPct = Math.round(100 - positionPct);
                  const rightPct = Math.round(positionPct);

                  return (
                    <div key={dim.dimensionId} className="group relative">
                      <div className="flex items-center gap-3">
                        {/* Letter badge */}
                        <div
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg sm:text-xl"
                          style={{
                            backgroundColor: color + '18',
                            color,
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {dim.letter}
                        </div>

                        {/* Axis bar area */}
                        <div className="flex-1 min-w-0">
                          {/* Axis labels */}
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-[10px] sm:text-[11px] font-medium ${
                              !dim.isFavorable ? 'text-emerald-400' : 'text-foreground-muted/50'
                            }`}>
                              {L(quizDim.resistantLabel, lang)}
                            </span>
                            <span className="text-[10px] text-foreground-muted/40">
                              {L(quizDim.name, lang)}
                            </span>
                            <span className={`text-[10px] sm:text-[11px] font-medium ${
                              dim.isFavorable ? 'text-rose-400' : 'text-foreground-muted/50'
                            }`}>
                              {L(quizDim.favorableLabel, lang)}
                            </span>
                          </div>

                          {/* Horizontal bar */}
                          <div className="relative h-2.5">
                            <div className="absolute inset-0 rounded-full bg-overlay-6 overflow-hidden">
                              {/* Filled portion from center */}
                              <div
                                className="absolute inset-y-0 rounded-full"
                                style={{
                                  background: positionPct >= 50
                                    ? `linear-gradient(to right, ${color}30, ${color}80)`
                                    : `linear-gradient(to left, ${color}30, ${color}80)`,
                                  left: positionPct >= 50 ? '50%' : undefined,
                                  right: positionPct < 50 ? '50%' : undefined,
                                  width: `${Math.abs(positionPct - 50)}%`,
                                }}
                              />
                            </div>
                            {/* Center line */}
                            <div
                              className="absolute top-0 bottom-0 w-px z-[5]"
                              style={{ left: '50%', backgroundColor: 'var(--foreground-dim)', opacity: 0.4 }}
                            />
                            {/* Position dot */}
                            <div
                              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 z-10"
                              style={{
                                left: `${positionPct}%`,
                                backgroundColor: color,
                                borderColor: 'var(--shadow-soft)',
                                boxShadow: `0 0 8px ${color}60`,
                              }}
                            />
                          </div>

                          {/* Direction indicator */}
                          <div className="flex items-center justify-center mt-1.5">
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                              style={{ color, backgroundColor: color + '15' }}
                            >
                              {dim.isFavorable
                                ? `→ ${L(quizDim.favorableLabel, lang)} (${rightPct}%)`
                                : `← ${L(quizDim.resistantLabel, lang)} (${leftPct}%)`
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Metrics Strip ── */}
            <div className="flex items-center justify-center gap-5 sm:gap-8 py-4 border-t border-b border-overlay-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: probColor }}>
                  {result.replacementProbability}%
                </div>
                <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-0.5">
                  {t('replProb', lang)}
                </div>
              </div>
              <div className="w-px h-10 bg-overlay-10" />
              <div className="text-center">
                {isInfinity ? (
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: yearColor }}>&#8734;</div>
                ) : (
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: yearColor }}>
                    {result.predictedReplacementYear}
                  </div>
                )}
                <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-0.5">
                  {t('predYear', lang)}
                </div>
                {isInfinity ? (
                  <div className="text-[10px] text-foreground-muted/40">
                    {t('unpredictable', lang)}
                  </div>
                ) : (
                  <div className="text-[10px] text-foreground-muted/40 font-mono">
                    {result.earliestYear}&ndash;{result.latestYear}
                  </div>
                )}
              </div>
            </div>

            {/* ── Superpower & Kryptonite ── */}
            {profile && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="rounded-xl p-4" style={{ backgroundColor: '#00c85310', border: '1px solid #00c85320' }}>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                    {lang === 'zh' ? '你的超能力' : lang === 'ja' ? '超能力' : lang === 'ko' ? '초능력' : lang === 'de' ? 'Superkraft' : 'Superpower'}
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">{L(profile.superpower, lang)}</p>
                </div>
                <div className="rounded-xl p-4" style={{ backgroundColor: '#ff174410', border: '1px solid #ff174420' }}>
                  <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5">
                    {lang === 'zh' ? '你的弱点' : lang === 'ja' ? '弱点' : lang === 'ko' ? '약점' : lang === 'de' ? 'Schwäche' : 'Kryptonite'}
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed">{L(profile.kryptonite, lang)}</p>
                </div>
              </div>
            )}

            {/* ── Vulnerability & Defense Analysis ── */}
            {calibration && (
              <div className="pt-4 mt-2 border-t border-overlay-6 space-y-3">
                {/* Vulnerability */}
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#ff174420' }}
                  >
                    <span className="text-[10px]">&#9889;</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold" style={{ color: '#ff1744' }}>
                      {t('vulnerable', lang)}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-foreground-muted/55 leading-relaxed mt-0.5">
                      {L(calibration.vulnerabilities, lang)}
                    </p>
                  </div>
                </div>
                {/* Defense */}
                <div className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: '#34d39920' }}
                  >
                    <span className="text-[10px]">&#128737;&#65039;</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold" style={{ color: '#34d399' }}>
                      {t('defense', lang)}
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-foreground-muted/55 leading-relaxed mt-0.5">
                      {L(calibration.strengths, lang)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Career Risk Spectrum ── */}
            {careers && careers.length > 0 && (
              <div className="pt-4 mt-2 border-t border-overlay-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted/70">
                    {t('careerSpectrum', lang)}
                  </h4>
                  <span className="text-[9px] text-foreground-muted/40">
                    {t('careerHint', lang)}
                  </span>
                </div>
                <div className="space-y-2">
                  {careers.map((career, ci) => {
                    const cColor = riskColorFromScore(career.riskScore);
                    return (
                      <div key={ci} className="group/career">
                        <div className="flex items-center gap-2.5">
                          {/* Risk score badge */}
                          <div
                            className="flex-shrink-0 w-9 h-6 rounded flex items-center justify-center text-[10px] font-bold"
                            style={{ backgroundColor: cColor + '18', color: cColor }}
                          >
                            {career.riskScore}
                          </div>
                          {/* Career info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium truncate">
                                {L(career.title, lang)}
                              </span>
                            </div>
                            {/* Risk bar */}
                            <div className="h-1 rounded-full bg-overlay-6 mt-1 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{ backgroundColor: cColor, width: `${career.riskScore}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* Reason */}
                        <div className="max-h-0 group-hover/career:max-h-16 overflow-hidden transition-all duration-200 ease-out">
                          <p className="text-[10px] text-foreground-muted/50 leading-relaxed mt-1 ml-[46px]">
                            {L(career.reason, lang)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Personalized Action Plan ── */}
            {adviceList.length > 0 && (
              <div className="pt-5 mt-3 border-t border-overlay-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted/70 mb-4 flex items-center gap-2">
                  <span className="inline-block w-4 h-px" style={{ background: 'linear-gradient(90deg, #ff1744, #ffc107, #34d399)' }} />
                  {t('actionPlan', lang)}
                  <span className="inline-block flex-1 h-px bg-overlay-6" />
                </h4>
                <div className="space-y-0">
                  {adviceList.map((advice, ai) => {
                    const accent = accentColors[ai % accentColors.length];
                    const isFirst = ai === 0;
                    return (
                      <div key={ai}>
                        <div className={`relative flex items-start gap-3 py-3.5 ${ai > 0 ? 'border-t border-overlay-4' : ''}`}>
                          {/* Icon */}
                          <div className="flex flex-col items-center gap-1 flex-shrink-0 w-7">
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${isFirst ? 'ring-1 ring-overlay-10' : ''}`}
                              style={{ background: isFirst ? `${accent}20` : `${accent}10`, color: accent }}
                            >
                              {advice.icon}
                            </div>
                            {ai < adviceList.length - 1 && (
                              <div className="w-px flex-1 min-h-[8px] bg-overlay-6" />
                            )}
                          </div>
                          {/* Content */}
                          <div className="min-w-0 flex-1 pt-0.5">
                            <div className="flex items-center gap-2">
                              <span
                                className="text-[11px] sm:text-xs font-bold"
                                style={{ color: isFirst ? accent : undefined }}
                              >
                                {L(advice.title, lang)}
                              </span>
                              {isFirst && (
                                <span
                                  className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                  style={{ background: `${accent}20`, color: accent }}
                                >
                                  {t('priority', lang)}
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-foreground-muted/55 leading-relaxed mt-1">
                              {L(advice.body, lang)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Reality check footer */}
          <div className="flex items-start gap-3 px-6 sm:px-8 py-3 bg-overlay-2 border-t border-overlay-4">
            <span className="text-sm flex-shrink-0 mt-0.5" style={{ color: '#ff1744' }}>&#128293;</span>
            <p className="text-[11px] text-foreground-muted/60 leading-relaxed">
              <span className="font-semibold text-foreground-muted/80">{t('realityCheck', lang)}</span>{' '}
              {t('realityText', lang)}
            </p>
          </div>
        </div>

        {/* ── CTA Button ── */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/#risk-calculator"
            className="inline-flex rounded-xl bg-risk-high px-6 py-3 text-white font-semibold hover:bg-risk-high/85 transition-colors"
          >
            {t('takeSelf', lang)}
          </Link>
        </div>
      </div>
    </main>
  );
}
