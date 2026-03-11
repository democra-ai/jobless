/**
 * AIR Analytics — event tracking layer
 *
 * Dual-writes to:
 * 1. Firebase Analytics (GA4) — for aggregated insights, funnels, retention
 * 2. Firestore — for individual quiz session records (structured, queryable)
 *
 * All functions are safe to call server-side (they no-op).
 * All functions are fire-and-forget (never throw, never block UI).
 */

import { logEvent } from 'firebase/analytics';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import {
  getFirebaseAnalytics,
  getFirebaseFirestore,
  getAnonymousUid,
  isFirebaseConfigured,
} from './firebase';
import type { QuizResult } from './air_quiz_calculator';
import type { QuizAnswer } from './air_quiz_data';

// ─── Types ───────────────────────────────────────────────────────────────────

type Language = 'en' | 'zh';
type Theme = 'dark' | 'light';

interface QuizSessionData {
  uid: string | null;
  sessionId: string;
  timestamp: ReturnType<typeof serverTimestamp>;
  language: Language;
  preset: string | null;
  answers: {
    core: Record<string, QuizAnswer>;
    snapshot: Record<string, QuizAnswer>;
    survey: Record<string, number>;
  };
  dimensions: Record<string, { score: number; letter: string; isFavorable: boolean }>;
  result: {
    profileCode: string;
    profileName: string;
    riskTier: string;
    probability: number;
    year: number;
    aiCapability: number;
    confidenceInterval: { earliest: number; latest: number };
  };
  durationSeconds: number;
  userAgent: string;
  screenSize: string;
  referrer: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Safe wrapper — never throws, never blocks */
async function safeLogEvent(eventName: string, params?: Record<string, unknown>) {
  if (!isFirebaseConfigured()) return;
  try {
    const analytics = await getFirebaseAnalytics();
    if (analytics) {
      logEvent(analytics, eventName, params);
    }
  } catch {
    // Silent — analytics should never break the app
  }
}

// ─── Session tracking ────────────────────────────────────────────────────────

let _quizStartTime: number | null = null;
let _selectedPreset: string | null = null;
let _sessionId: string | null = null;

// ─── Public API ──────────────────────────────────────────────────────────────

/** Track page view */
export function trackPageView(pagePath: string) {
  safeLogEvent('page_view', {
    page_path: pagePath,
    page_title: document.title,
  });
}

/** Track section scroll into view */
export function trackSectionView(sectionName: string) {
  safeLogEvent('section_view', { section_name: sectionName });
}

/** Track quiz start */
export function trackQuizStart(lang: Language) {
  _quizStartTime = Date.now();
  _sessionId = generateSessionId();
  _selectedPreset = null;
  safeLogEvent('quiz_start', { language: lang, session_id: _sessionId });
}

/** Track preset career selection */
export function trackPresetSelect(presetName: string, lang: Language) {
  _selectedPreset = presetName;
  safeLogEvent('preset_select', {
    preset_name: presetName,
    language: lang,
    session_id: _sessionId,
  });
}

/** Track individual question answer */
export function trackQuizAnswer(
  questionId: string,
  answer: number,
  phase: 'core' | 'snapshot' | 'survey',
  questionIndex: number,
) {
  safeLogEvent('quiz_answer', {
    question_id: questionId,
    answer,
    phase,
    question_index: questionIndex,
    session_id: _sessionId,
  });
}

/** Track quiz completion — writes to both Analytics and Firestore */
export async function trackQuizComplete(
  result: QuizResult,
  answers: {
    core: Record<string, QuizAnswer>;
    snapshot: Record<string, QuizAnswer>;
    survey: Record<string, number>;
  },
  lang: Language,
) {
  const durationSeconds = _quizStartTime
    ? Math.round((Date.now() - _quizStartTime) / 1000)
    : 0;

  // 1. Firebase Analytics event
  safeLogEvent('quiz_complete', {
    profile_code: result.profileCode,
    risk_tier: result.profile.riskTier,
    probability: result.replacementProbability,
    year: result.predictedReplacementYear,
    ai_capability: result.currentAICapability,
    favorable_count: result.favorableCount,
    duration_seconds: durationSeconds,
    language: lang,
    preset: _selectedPreset,
    session_id: _sessionId,
  });

  // 2. Firestore detailed record
  if (!isFirebaseConfigured()) return;
  try {
    const db = getFirebaseFirestore();
    if (!db) return;
    const uid = await getAnonymousUid();
    const sessionId = _sessionId || generateSessionId();

    const sessionData: QuizSessionData = {
      uid,
      sessionId,
      timestamp: serverTimestamp(),
      language: lang,
      preset: _selectedPreset,
      answers,
      dimensions: Object.fromEntries(
        result.dimensions.map((d) => [
          d.dimensionId,
          { score: d.rawAverage, letter: d.letter, isFavorable: d.isFavorable },
        ]),
      ),
      result: {
        profileCode: result.profileCode,
        profileName: result.profile.name[lang],
        riskTier: result.profile.riskTier,
        probability: result.replacementProbability,
        year: result.predictedReplacementYear,
        aiCapability: result.currentAICapability,
        confidenceInterval: result.confidenceInterval,
      },
      durationSeconds,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      screenSize:
        typeof window !== 'undefined'
          ? `${window.innerWidth}x${window.innerHeight}`
          : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    };

    const docRef = doc(collection(db, 'quiz_sessions'), sessionId);
    await setDoc(docRef, sessionData);
  } catch {
    // Silent — Firestore write failure should never break the app
  }
}

/** Track share action */
export function trackShareClick(channel: string, lang: Language) {
  safeLogEvent('share_click', {
    channel,
    language: lang,
    session_id: _sessionId,
  });
}

/** Track theme toggle */
export function trackThemeToggle(newTheme: Theme) {
  safeLogEvent('theme_toggle', { theme: newTheme });
}

/** Track language toggle */
export function trackLangToggle(newLang: Language) {
  safeLogEvent('lang_toggle', { language: newLang });
}

/** Track CTA / button click */
export function trackCtaClick(ctaId: string, location: string) {
  safeLogEvent('cta_click', { cta_id: ctaId, location });
}

/** Track navigation (mobile bottom nav) */
export function trackNavigation(section: string) {
  safeLogEvent('nav_click', { section });
}

/** Track quiz abandon (user leaves mid-quiz) */
export function trackQuizAbandon(
  phase: string,
  questionIndex: number,
  lang: Language,
) {
  safeLogEvent('quiz_abandon', {
    phase,
    question_index: questionIndex,
    language: lang,
    session_id: _sessionId,
    duration_seconds: _quizStartTime
      ? Math.round((Date.now() - _quizStartTime) / 1000)
      : 0,
  });
}

/** Track external link click */
export function trackExternalLink(url: string, label: string) {
  safeLogEvent('external_link_click', { url, label });
}

/**
 * Initialize analytics on app mount.
 * Call once from the root client component.
 */
export async function initAnalytics() {
  if (!isFirebaseConfigured()) return;
  // Warm up anonymous auth + analytics in parallel
  await Promise.all([getAnonymousUid(), getFirebaseAnalytics()]);
  // Track initial page view
  if (typeof window !== 'undefined') {
    trackPageView(window.location.pathname);
  }
}
