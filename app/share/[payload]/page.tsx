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
  superpower:     { en: 'Superpower', zh: '超能力', ja: '超能力', ko: '초능력', de: 'Superkraft' },
  kryptonite:     { en: 'Kryptonite', zh: '弱点', ja: '弱点', ko: '약점', de: 'Schwäche' },
  youAreHere:     { en: 'YOU ARE HERE', zh: '你在这里', ja: 'あなたはここ', ko: '당신은 여기', de: 'SIE SIND HIER' },
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

// ─── Gauge helpers ──────────────────────────────────────────────────────────

const GAUGE_STAGES = [
  { label: 'SAFE', labelZh: '安全', color: '#34d399' },
  { label: 'ASSIST', labelZh: '辅助', color: '#4ade80' },
  { label: 'AGENT', labelZh: '代理', color: '#fbbf24' },
  { label: 'LEAD', labelZh: '主导', color: '#fb923c' },
  { label: 'KILL', labelZh: '斩杀', color: '#f43f5e' },
];

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
  const ac = profile?.color || riskColor; // accent color

  // Reconstruct dimension info from profileCode letters
  const dimLetters = profileCode ? profileCode.split('') : [];
  const dimensions = dimLetters.map((letter, i) => {
    const quizDim = QUIZ_DIMENSIONS[i];
    const isFavorable = letter === FAVORABLE_LETTERS[i];
    return { letter, dimensionId: quizDim?.id ?? '', isFavorable, quizDim };
  });

  // Generate advice from dimensions
  const adviceList = profileCode
    ? generateAdvice(dimensions.map(d => ({ dimensionId: d.dimensionId, isFavorable: d.isFavorable })))
    : [];

  const isInfinity = !isFinite(result.predictedReplacementYear);
  const prob = result.replacementProbability;
  const activeStageIdx = Math.min(Math.floor(prob / 20), 4);

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      {/* Hidden image for crawlers */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${origin}/share-card.png`}
        alt={lang === 'zh' ? 'AI 风险结果' : 'AI Risk Result'}
        width={600}
        height={315}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      />

      <div className="max-w-[480px] mx-auto">

        {/* ══════════════ THE CARD ══════════════ */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{
            background: `linear-gradient(180deg, ${ac}08 0%, transparent 40%, ${ac}05 100%)`,
            border: `1px solid ${ac}18`,
            boxShadow: `0 0 80px ${ac}08, 0 24px 48px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Decorative background elements */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
            style={{ background: `radial-gradient(circle, ${ac}, transparent 70%)` }}
          />
          <div
            className="absolute top-20 right-0 w-48 h-48 rounded-full opacity-[0.04]"
            style={{ background: `radial-gradient(circle, ${ac}, transparent 70%)` }}
          />

          <div className="relative z-10">

            {/* ── Top bar: AIR branding ── */}
            <div className="flex items-center justify-between px-6 pt-5 pb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: ac, boxShadow: `0 0 8px ${ac}80` }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-muted/40">
                  AI Replacement Index
                </span>
              </div>
              <span className="text-[10px] text-foreground-muted/30 font-mono">
                air.democra.ai
              </span>
            </div>

            {/* ── HERO: Character + Identity ── */}
            <div className="text-center px-6 pt-4 pb-6">
              {profileCode && profile ? (
                <>
                  {/* Character illustration with glow backdrop */}
                  <div className="relative inline-block mb-4">
                    <div
                      className="absolute inset-0 rounded-full blur-[40px] opacity-20"
                      style={{ backgroundColor: ac }}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/characters/${profileCode}.png`}
                      alt={L(profile.archetype, lang)}
                      className="relative w-36 h-36 sm:w-44 sm:h-44 object-contain"
                    />
                  </div>

                  {/* Archetype name */}
                  <h1
                    className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none"
                    style={{ color: ac }}
                  >
                    {L(profile.archetype, lang)}
                  </h1>

                  {/* Profile code */}
                  <div
                    className="mt-2 text-sm sm:text-base font-bold tracking-[0.35em]"
                    style={{ color: `${ac}88`, fontFamily: 'var(--font-body)' }}
                  >
                    {profileCode}
                  </div>

                  {/* Tagline */}
                  <p className="mt-3 text-sm text-foreground-muted/60 italic max-w-xs mx-auto leading-relaxed">
                    &ldquo;{L(profile.tagline, lang)}&rdquo;
                  </p>
                </>
              ) : (
                <div className="py-4">
                  <div className="text-4xl font-extrabold" style={{ color: ac }}>
                    {result.replacementProbability}%
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ac }}>
                    {riskLabel(result)}
                  </div>
                </div>
              )}
            </div>

            {/* ── GAUGE BAR ── */}
            <div className="px-6 pb-5">
              {/* Pointer */}
              <div className="relative h-5 mb-1">
                <div
                  className="absolute top-0 flex flex-col items-center -translate-x-1/2"
                  style={{ left: `${Math.min(Math.max(prob, 3), 97)}%` }}
                >
                  <span
                    className="text-[8px] font-bold uppercase tracking-[0.15em] whitespace-nowrap"
                    style={{ color: ac }}
                  >
                    {t('youAreHere', lang)}
                  </span>
                  <div
                    className="w-0 h-0 mt-0.5"
                    style={{
                      borderLeft: '4px solid transparent',
                      borderRight: '4px solid transparent',
                      borderTop: `5px solid ${ac}`,
                    }}
                  />
                </div>
              </div>

              {/* Bar segments */}
              <div className="flex gap-[3px]">
                {GAUGE_STAGES.map((stage, i) => {
                  const segStart = i * 20;
                  const segEnd = segStart + 20;
                  const fill = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
                  const isActive = i === activeStageIdx;

                  return (
                    <div key={i} className="flex-1">
                      {/* Segment bar */}
                      <div className="relative h-2 rounded-full overflow-hidden bg-white/[0.04]">
                        {fill > 0 && (
                          <div
                            className="absolute inset-y-0 left-0 rounded-full"
                            style={{ width: `${fill * 100}%`, backgroundColor: stage.color }}
                          />
                        )}
                      </div>
                      {/* Label */}
                      <div
                        className="text-center mt-1.5 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.12em]"
                        style={{
                          color: isActive ? stage.color : 'var(--foreground-muted)',
                          opacity: isActive ? 1 : 0.25,
                        }}
                      >
                        {lang === 'zh' ? stage.labelZh : stage.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Metrics: Probability + Year ── */}
            <div className="mx-6 flex items-stretch rounded-2xl overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex-1 text-center py-4 px-3">
                <div className="text-3xl sm:text-4xl font-extrabold tabular-nums" style={{ color: ac }}>
                  {result.replacementProbability}<span className="text-lg">%</span>
                </div>
                <div className="text-[9px] text-foreground-muted/40 uppercase tracking-[0.12em] mt-1 font-medium">
                  {t('replProb', lang)}
                </div>
              </div>
              <div className="w-px my-3" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
              <div className="flex-1 text-center py-4 px-3">
                {isInfinity ? (
                  <div className="text-3xl sm:text-4xl font-extrabold text-foreground/80">&infin;</div>
                ) : (
                  <div className="text-3xl sm:text-4xl font-extrabold tabular-nums text-foreground/90">
                    {result.predictedReplacementYear}
                  </div>
                )}
                <div className="text-[9px] text-foreground-muted/40 uppercase tracking-[0.12em] mt-1 font-medium">
                  {t('predYear', lang)}
                </div>
                {isInfinity ? (
                  <div className="text-[9px] text-foreground-muted/25 mt-0.5">
                    {t('unpredictable', lang)}
                  </div>
                ) : (
                  <div className="text-[9px] text-foreground-muted/25 font-mono mt-0.5">
                    {result.earliestYear}&ndash;{result.latestYear}
                  </div>
                )}
              </div>
            </div>

            {/* ── 4-Dimension DNA ── */}
            {dimensions.length === 4 && (
              <div className="px-6 pt-6 pb-2">
                <div className="grid grid-cols-4 gap-2">
                  {dimensions.map((dim, i) => {
                    const quizDim = dim.quizDim;
                    if (!quizDim) return null;
                    const color = DIMENSION_COLORS[i];
                    const label = dim.isFavorable
                      ? L(quizDim.favorableLabel, lang)
                      : L(quizDim.resistantLabel, lang);

                    return (
                      <div
                        key={dim.dimensionId}
                        className="text-center rounded-xl py-3 px-1"
                        style={{ backgroundColor: `${color}08`, border: `1px solid ${color}12` }}
                      >
                        {/* Letter */}
                        <div
                          className="text-2xl font-extrabold leading-none"
                          style={{ color, fontFamily: 'var(--font-body)' }}
                        >
                          {dim.letter}
                        </div>
                        {/* Dimension name */}
                        <div className="text-[8px] text-foreground-muted/30 uppercase tracking-wider mt-1.5 font-medium">
                          {L(quizDim.name, lang)}
                        </div>
                        {/* Direction label */}
                        <div
                          className="text-[9px] font-bold mt-1 leading-tight"
                          style={{ color: `${color}cc` }}
                        >
                          {label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Superpower & Kryptonite ── */}
            {profile && (
              <div className="px-6 pt-4 pb-2 space-y-2.5">
                <div className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: '#34d39908', border: '1px solid #34d39912' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#34d39915' }}>
                    <span className="text-sm">&#9889;</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-400/70 mb-0.5">
                      {t('superpower', lang)}
                    </div>
                    <p className="text-xs text-foreground-muted/50 leading-relaxed">{L(profile.superpower, lang)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: '#ff174408', border: '1px solid #ff174412' }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff174415' }}>
                    <span className="text-sm">&#128165;</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-rose-400/70 mb-0.5">
                      {t('kryptonite', lang)}
                    </div>
                    <p className="text-xs text-foreground-muted/50 leading-relaxed">{L(profile.kryptonite, lang)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ── Career Risk Spectrum (compact: top 3) ── */}
            {careers && careers.length > 0 && (
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground-muted/40">
                    {t('careerSpectrum', lang)}
                  </h4>
                  <div className="flex-1 h-px bg-white/[0.04]" />
                </div>
                <div className="space-y-2">
                  {careers.slice(0, 4).map((career, ci) => {
                    const cColor = riskColorFromScore(career.riskScore);
                    return (
                      <div key={ci} className="flex items-center gap-2.5">
                        <span
                          className="flex-shrink-0 w-8 text-right text-[11px] font-bold tabular-nums"
                          style={{ color: cColor }}
                        >
                          {career.riskScore}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] text-foreground/70 font-medium">
                            {L(career.title, lang)}
                          </span>
                          <div className="h-1 rounded-full bg-white/[0.04] mt-1 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ backgroundColor: cColor, width: `${career.riskScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Action Plan (compact: top 3) ── */}
            {adviceList.length > 0 && (
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-foreground-muted/40">
                    {t('actionPlan', lang)}
                  </h4>
                  <div className="flex-1 h-px bg-white/[0.04]" />
                </div>
                <div className="space-y-2">
                  {adviceList.slice(0, 3).map((advice, ai) => {
                    const isFirst = ai === 0;
                    return (
                      <div key={ai} className="flex items-start gap-2.5">
                        <span className="text-sm flex-shrink-0 mt-0.5 opacity-50">{advice.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-[11px] font-bold"
                              style={{ color: isFirst ? ac : undefined }}
                            >
                              {L(advice.title, lang)}
                            </span>
                            {isFirst && (
                              <span
                                className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                style={{ background: `${ac}15`, color: ac }}
                              >
                                {t('priority', lang)}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-foreground-muted/40 leading-relaxed mt-0.5">
                            {L(advice.body, lang)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Footer: Reality check ── */}
            <div className="mx-6 mt-4 mb-6 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <p className="text-[10px] text-foreground-muted/35 leading-relaxed">
                <span className="font-semibold text-foreground-muted/50">{t('realityCheck', lang)}</span>{' '}
                {t('realityText', lang)}
              </p>
            </div>
          </div>
        </div>

        {/* ── CTA Button ── */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/#risk-calculator"
            className="group relative inline-flex items-center gap-2 rounded-2xl px-8 py-3.5 font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${ac}, ${ac}cc)`,
              boxShadow: `0 8px 24px ${ac}30, 0 2px 8px ${ac}20`,
            }}
          >
            {t('takeSelf', lang)}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* ── Branding footer ── */}
        <div className="mt-4 text-center">
          <span className="text-[10px] text-foreground-muted/20 tracking-wider">
            air.democra.ai
          </span>
        </div>
      </div>
    </main>
  );
}
