import type { Metadata } from 'next';
import Link from 'next/link';
import { headers } from 'next/headers';
import { decodeSharePayload, type SharePayload, type ShareLang } from '@/lib/share_payload';
import { PROFILE_TYPES, QUIZ_DIMENSIONS, RISK_TIER_INFO } from '@/lib/air_quiz_data';
import { getProfileCalibration } from '@/lib/air_quiz_calculator';
import { generateAdvice } from '@/lib/air_advice_data';
import ShareCardClient, { type ShareCardData } from './ShareCardClient';

type SharePageProps = {
  params: Promise<{ payload: string }>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

type L10nObj = { en: string; zh: string; ja?: string; ko?: string; de?: string };
const FAVORABLE_LETTERS = ['E', 'O', 'F', 'P'];
const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];

function riskColorFromScore(score: number): string {
  if (score >= 60) return '#ff1744';
  if (score >= 40) return '#ff5722';
  if (score >= 20) return '#ffc107';
  return '#34d399';
}

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
    : `My AI replacement risk is ${riskLabel(payload)} (${payload.replacementProbability}%), with an AI kill threshold around ${payload.predictedReplacementYear}.`;
}

async function requestOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host');
  if (!host) return process.env.NEXT_PUBLIC_BASE_URL || 'https://air.democra.ai';
  const proto = h.get('x-forwarded-proto') ?? (host.includes('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https');
  return `${proto}://${host}`;
}

// ─── Metadata ────────────────────────────────────────────────────────────────

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
      <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${origin}/share-card.png`} alt="AIR" width={600} height={315} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />
        <div className="max-w-xl w-full p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Invalid Share Link</h1>
          <p className="mt-3 text-foreground-muted">This result link is incomplete or expired.</p>
          <Link href="/#risk-calculator" className="inline-flex mt-6 rounded-xl bg-risk-high px-5 py-2.5 text-white font-semibold hover:bg-risk-high/85 transition-colors">
            Open Calculator
          </Link>
        </div>
      </main>
    );
  }

  // Pre-compute all data for the client component
  const lang = result.lang;
  const profileCode = (result.v === 2 ? result.profileCode : undefined) ?? null;
  const profile = profileCode ? PROFILE_TYPES[profileCode] : null;
  const calibration = profileCode ? getProfileCalibration(profileCode) : null;
  const riskTier = profile?.riskTier;
  const riskColor = riskTier ? RISK_TIER_INFO[riskTier].color : riskColorFromScore(result.replacementProbability);
  const ac = profile?.color || riskColor;
  const prob = result.replacementProbability;

  const dimLetters = profileCode ? profileCode.split('') : [];
  const dimensions = dimLetters.map((letter, i) => {
    const quizDim = QUIZ_DIMENSIONS[i];
    const isFavorable = letter === FAVORABLE_LETTERS[i];
    return {
      letter,
      dimensionId: quizDim?.id ?? '',
      isFavorable,
      name: quizDim?.name as L10nObj,
      favorableLabel: quizDim?.favorableLabel as L10nObj,
      resistantLabel: quizDim?.resistantLabel as L10nObj,
      color: DIMENSION_COLORS[i],
    };
  });

  const adviceList = profileCode
    ? generateAdvice(dimensions.map(d => ({ dimensionId: d.dimensionId, isFavorable: d.isFavorable }))).map(a => ({
        icon: a.icon,
        title: a.title as L10nObj,
        body: a.body as L10nObj,
      }))
    : [];

  const riskLabelAllLangs: Record<ShareLang, string> = {
    en: '', zh: '', ja: '', ko: '', de: '',
  };
  for (const l of ['en', 'zh', 'ja', 'ko', 'de'] as ShareLang[]) {
    const fakePayload = { ...result, lang: l };
    riskLabelAllLangs[l] = riskLabel(fakePayload);
  }

  const cardData: ShareCardData = {
    defaultLang: lang,
    prob,
    predictedYear: result.predictedReplacementYear,
    isInfinity: !isFinite(result.predictedReplacementYear),
    earliestYear: result.earliestYear,
    latestYear: result.latestYear,
    activeStageIdx: Math.min(Math.floor(prob / 20), 4),
    ac,
    profileCode,
    profile: profile ? {
      archetype: profile.archetype as L10nObj,
      tagline: profile.tagline as L10nObj,
      superpower: profile.superpower as L10nObj,
      kryptonite: profile.kryptonite as L10nObj,
      color: profile.color,
    } : null,
    riskLabel: riskLabelAllLangs,
    dimensions,
    calibration: calibration ? {
      vulnerabilities: calibration.vulnerabilities as L10nObj,
      strengths: calibration.strengths as L10nObj,
    } : null,
    adviceList,
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${origin}/share-card.png`} alt="" width={600} height={315} aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} />
      <ShareCardClient data={cardData} />
    </>
  );
}
