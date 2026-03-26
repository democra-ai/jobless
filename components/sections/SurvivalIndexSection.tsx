'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Share2, Download, Copy, ExternalLink,
  ChevronLeft, ChevronRight, Send, Flame, RefreshCw, ArrowRight, Zap,
  Brain, Shield, Users,
} from 'lucide-react';
import QRCode from 'qrcode';
import { Language, translations } from '@/lib/translations';
import { BorderBeam } from '@/components/ui/border-beam';
import { MagicCard } from '@/components/ui/magic-card';

/** Safely get a localized string from an object with en/zh keys, falling back to en */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function L(obj: any, lang: Language) { return obj[lang] ?? obj['en']; }
import { encodeSharePayload } from '@/lib/share_payload';
import {
  QuizAnswer,
  QUIZ_DIMENSIONS,
  ALL_CORE_QUESTIONS,
  CORE_QUESTION_COUNT,
  RISK_TIER_INFO,
  SOC_MAJOR_GROUPS,
} from '@/lib/air_quiz_data';
import {
  ALL_FULL_QUESTIONS, FULL_QUESTION_COUNT,
  DIMENSION_LEARNABILITY_FULL, DIMENSION_EVALUATION_FULL,
  DIMENSION_RISK_FULL, DIMENSION_HUMAN_FULL,
} from '@/lib/air_quiz_data_60';
import { calculateQuizResult, calculateQuizResultFull, QuizAnswers, QuizResult, getProfileCalibration } from '@/lib/air_quiz_calculator';
import { PROFILE_CAREERS } from '@/lib/air_career_data';
import { generateAdvice } from '@/lib/air_advice_data';
import {
  trackQuizStart,
  trackQuizAnswer,
  trackQuizComplete,
  trackShareClick,
  trackQuizAbandon,
  trackSOCSelect,
  trackQuizBack,
  trackSharePanelToggle,
  trackPresetPanelToggle,
} from '@/lib/analytics';

/** Get risk color matching the AI Kill Line progress bar stages */
function riskColorFromScore(score: number): string {
  if (score >= 80) return '#ff1744';   // 80-100%: critical (same as --risk-critical)
  if (score >= 60) return '#ff1744';   // 60-80%:  critical (same as --risk-critical)
  if (score >= 40) return '#ff5722';   // 40-60%:  high (same as --risk-high)
  if (score >= 20) return '#ffc107';   // 20-40%:  medium (same as --risk-medium)
  return '#34d399';                    // 0-20%:   low (same as --risk-low)
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);
  return <>{display}{suffix}</>;
}

/** Progress bar showing current position in quiz */
function QuizProgressBar({
  current,
  total,
  phase,
  lang,
  t,
  theme = 'dark',
}: {
  current: number;
  total: number;
  phase: string;
  lang: Language;
  t: typeof translations.en;
  theme?: 'dark' | 'light';
}) {
  const pct = ((current) / total) * 100;
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs text-foreground-muted mb-2">
        <span className="font-medium text-foreground">{phase}</span>
        <span>
          {lang === 'zh'
            ? `${t.quizProgress} ${current} ${t.quizOf} ${total}`
            : `${t.quizProgress} ${current} ${t.quizOf} ${total}`
          }
        </span>
      </div>
      <div className="w-full h-1.5 bg-surface-elevated rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/** Dimension label pill shown above questions */
function DimensionBadge({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4" style={{ borderColor: color + '40', backgroundColor: color + '10' }}>
      <Icon className="w-4 h-4" style={{ color }} />
      <span className="text-sm font-medium" style={{ color }}>{label}</span>
    </div>
  );
}

const DIMENSION_ICONS = [Brain, Target, Shield, Users];
const DIMENSION_COLORS_DARK = ['#7c4dff', '#ff6e40', '#5ec6b0', '#ff80ab'];

function useDimensionColors(): string[] {
  const [colors, setColors] = useState(DIMENSION_COLORS_DARK);
  useEffect(() => {
    const read = () => {
      const s = getComputedStyle(document.documentElement);
      const c = [1, 2, 3, 4].map(i => s.getPropertyValue(`--dim-${i}`).trim());
      if (c.every(v => v)) setColors(c);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return colors;
}

/** Option selector — vertical cards on mobile, horizontal slider on desktop */
function AxisSlider({
  options,
  value,
  onChange,
  accentColor,
  leftLabel,
  rightLabel,
}: {
  options: string[];
  value: number | null; // 1-5 or null
  onChange: (v: QuizAnswer) => void;
  accentColor: string;
  leftLabel?: string;
  rightLabel?: string;
}) {
  const [hoveredStop, setHoveredStop] = useState<number | null>(null);
  const [expandedStop, setExpandedStop] = useState<number | null>(null);

  const activeStop = hoveredStop;

  return (
    <div className="pt-1 pb-1">
      {/* ══ Mobile: vertical option cards ══ */}
      <div className="sm:hidden flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((stop) => {
          const isSelected = value === stop;
          const isExpanded = expandedStop === stop;
          return (
            <motion.button
              key={stop}
              type="button"
              className="relative w-full text-left rounded-xl px-4 py-3 transition-all border"
              style={{
                borderColor: isSelected ? accentColor : isExpanded ? accentColor + '50' : 'var(--overlay-10)',
                backgroundColor: isSelected ? accentColor + '15' : 'var(--surface)',
                boxShadow: isSelected ? `0 0 0 1px ${accentColor}40, 0 2px 8px ${accentColor}15` : undefined,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (isExpanded || isSelected) {
                  // Second tap or re-tap selected → confirm
                  onChange(stop as QuizAnswer);
                  setExpandedStop(null);
                } else {
                  // First tap → expand to preview
                  setExpandedStop(stop);
                }
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                  style={{
                    borderColor: isSelected ? accentColor : 'var(--overlay-15)',
                    backgroundColor: isSelected ? accentColor : 'transparent',
                    color: isSelected ? '#fff' : 'var(--foreground-dim)',
                  }}
                >
                  {stop}
                </div>
                <span
                  className="text-sm leading-snug"
                  style={{ color: isSelected ? accentColor : 'var(--foreground-muted)' }}
                >
                  {options[stop - 1]}
                </span>
                {isSelected && (
                  <div className="ml-auto flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                    <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ══ Desktop: horizontal axis slider ══ */}
      <div className="hidden sm:block">
        <div className="relative mx-4">
          {/* Track background */}
          <div className="h-2 rounded-full relative" style={{ background: 'var(--overlay-15)', boxShadow: 'inset 0 1px 3px var(--overlay-10)' }}>
            {/* Filled track */}
            {value && (
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: accentColor + '60' }}
                initial={{ width: 0 }}
                animate={{ width: `${((value - 1) / 4) * 100}%` }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>

          {/* Stop circles */}
          <div className="absolute inset-0 flex items-center justify-between" style={{ top: '-10px', height: '24px' }}>
            {[1, 2, 3, 4, 5].map((stop) => {
              const isSelected = value === stop;
              const isHovered = activeStop === stop;
              return (
                <button
                  key={stop}
                  type="button"
                  className="relative flex items-center justify-center"
                  style={{ width: '44px', height: '44px', marginLeft: stop === 1 ? '-22px' : undefined, marginRight: stop === 5 ? '-22px' : undefined }}
                  onMouseEnter={() => setHoveredStop(stop)}
                  onMouseLeave={() => setHoveredStop(null)}
                  onClick={() => onChange(stop as QuizAnswer)}
                >
                  <motion.div
                    className="rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors"
                    style={{
                      width: isSelected ? '28px' : isHovered ? '26px' : '22px',
                      height: isSelected ? '28px' : isHovered ? '26px' : '22px',
                      borderColor: isSelected ? accentColor : isHovered ? accentColor + '80' : 'var(--overlay-20)',
                      backgroundColor: isSelected ? accentColor : isHovered ? 'var(--surface-card)' : 'var(--surface)',
                      color: isSelected ? '#fff' : isHovered ? accentColor : 'var(--foreground-dim)',
                      boxShadow: isHovered && !isSelected ? `0 0 0 3px ${accentColor}25` : undefined,
                    }}
                    animate={{ scale: isSelected ? 1.1 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    {stop}
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pole labels */}
        {(leftLabel || rightLabel) && (
          <div className="flex justify-between text-[11px] text-foreground-muted mt-5 mx-1">
            <span>{leftLabel}</span>
            <span>{rightLabel}</span>
          </div>
        )}

        {/* Inline description below slider — shows on hover */}
        <div className="min-h-[36px] mt-2">
          <AnimatePresence mode="wait">
            {activeStop !== null && (
              <motion.div
                key={activeStop}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="text-center px-2"
              >
                <span className="inline-flex items-center gap-1.5 text-xs leading-relaxed rounded-lg px-3 py-1.5 bg-surface-elevated border border-overlay-10">
                  <span className="font-bold min-w-[16px] text-center" style={{ color: accentColor }}>{activeStop}</span>
                  <span className="text-foreground-muted">{options[activeStop - 1]}</span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Quiz phases ─────────────────────────────────────────────────────────────

type QuizPhase = 'intro' | 'core' | 'result';
type QuizMode = 'compact' | 'full';

// ─── Main Component ──────────────────────────────────────────────────────────

function SurvivalIndexSection({ lang, t, theme = 'dark' }: { lang: Language; t: typeof translations.en; theme?: 'dark' | 'light' }) {
  const DIMENSION_COLORS = useDimensionColors();
  // Quiz state
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [quizMode, setQuizMode] = useState<QuizMode>('compact');
  const [coreIndex, setCoreIndex] = useState(0);

  const [coreAnswers, setCoreAnswers] = useState<Record<string, QuizAnswer>>({});
  const [selectedSOC, setSelectedSOC] = useState<number | null>(null);
  const [socOpen, setSOCOpen] = useState(false);

  const [result, setResult] = useState<QuizResult | null>(null);

  // Share state
  const [copied, setCopied] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  const [sharePanelOpen, setSharePanelOpen] = useState(true);
  const [telegramShareState, setTelegramShareState] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const questionContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic question set based on quiz mode
  const activeQuestions = quizMode === 'full' ? ALL_FULL_QUESTIONS : ALL_CORE_QUESTIONS;
  const activeQuestionCount = quizMode === 'full' ? FULL_QUESTION_COUNT : CORE_QUESTION_COUNT;
  const questionsPerDim = quizMode === 'full' ? 15 : 4;

  // Current core question info (clamped to valid range for safety)
  const safeCoreIndex = Math.min(coreIndex, activeQuestionCount - 1);
  const currentCoreQ = activeQuestions[safeCoreIndex];
  const currentDimIndex = Math.floor(safeCoreIndex / questionsPerDim);
  const currentDim = QUIZ_DIMENSIONS[Math.min(currentDimIndex, 3)];

  // Pending advance: when set, a useEffect will auto-advance after delay
  const [pendingAdvance, setPendingAdvance] = useState<{
    nextIndex: number;
    answers: Record<string, QuizAnswer>;
  } | null>(null);

  // ─── Core question handlers ──────────────────────────────────────────────

  const handleCoreAnswer = useCallback((answer: QuizAnswer) => {
    // Prevent double-click: ignore if we're already waiting to advance
    if (pendingAdvance) return;

    const qId = currentCoreQ.id;
    const updatedAnswers = { ...coreAnswers, [qId]: answer };
    setCoreAnswers(updatedAnswers);
    trackQuizAnswer(qId, answer, 'core', coreIndex);

    // Signal that we need to advance (useEffect handles the delay)
    setPendingAdvance({
      nextIndex: coreIndex + 1,
      answers: updatedAnswers,
    });
  }, [coreIndex, currentCoreQ, coreAnswers, pendingAdvance]);

  // Auto-advance after 280ms delay — replaces setTimeout in handler
  useEffect(() => {
    if (!pendingAdvance) return;
    const timer = setTimeout(() => {
      if (pendingAdvance.nextIndex < activeQuestionCount) {
        setCoreIndex(pendingAdvance.nextIndex);
      } else {
        // Finish quiz — all state is fresh from pendingAdvance
        try {
          let quizResult: QuizResult;
          if (quizMode === 'full') {
            quizResult = calculateQuizResultFull(
              pendingAdvance.answers,
              [DIMENSION_LEARNABILITY_FULL, DIMENSION_EVALUATION_FULL, DIMENSION_RISK_FULL, DIMENSION_HUMAN_FULL],
              selectedSOC,
            );
          } else {
            const answers: QuizAnswers = {
              core: pendingAdvance.answers,
              snapshot: {},
              survey: {},
            };
            quizResult = calculateQuizResult(answers, selectedSOC);
          }
          const trackAnswers: QuizAnswers = { core: pendingAdvance.answers, snapshot: {}, survey: {} };
          setResult(quizResult);
          setPhase('result');
          setSharePanelOpen(true);
          setTelegramShareState('idle');
          setCopied(false);
          setWechatCopied(false);
          trackQuizComplete(quizResult, trackAnswers, lang);
        } catch (err) {
          console.error('Quiz calculation error:', err);
        }
      }
      setPendingAdvance(null);
    }, 280);
    return () => clearTimeout(timer);
  }, [pendingAdvance, selectedSOC, lang, activeQuestionCount, quizMode]);


  // Go back
  const goBack = useCallback(() => {
    if (phase === 'core' && coreIndex > 0 && !pendingAdvance) {
      trackQuizBack(phase, coreIndex);
      setCoreIndex(prev => prev - 1);
    }
  }, [phase, coreIndex, pendingAdvance]);

  // Reset
  const resetQuiz = useCallback(() => {
    // Track abandon if resetting mid-quiz (not from result)
    if (phase !== 'intro' && phase !== 'result') {
      trackQuizAbandon(phase, coreIndex, lang);
    }
    setPhase('intro');
    setCoreIndex(0);
    setCoreAnswers({});
    setSelectedSOC(null);
    setResult(null);
    setSharePanelOpen(false);
    setPendingAdvance(null);
    setQuizMode('compact');
  }, [phase, coreIndex, lang]);

  // ─── Share functionality (preserved from V2) ─────────────────────────────

  const getShareText = () => {
    if (!result) return '';
    const levelText = result.riskLevel === 'very-low' ? (lang === 'en' ? 'Very Low' : '极低') :
      result.riskLevel === 'low' ? (lang === 'en' ? 'Low' : '低') :
      result.riskLevel === 'medium' ? (lang === 'en' ? 'Medium' : '中等') :
      result.riskLevel === 'high' ? (lang === 'en' ? 'High' : '高') :
      (lang === 'en' ? 'Critical' : '极高');
    const yearText = isFinite(result.predictedReplacementYear) ? String(result.predictedReplacementYear) : '∞';
    return t.shareText
      .replace('{level}', levelText)
      .replace('{prob}', String(result.replacementProbability))
      .replace('{year}', yearText);
  };

  const getShareUrl = () => {
    if (!result) return window.location.href;
    const payload = encodeSharePayload({
      riskLevel: result.riskLevel,
      replacementProbability: result.replacementProbability,
      predictedReplacementYear: isFinite(result.predictedReplacementYear) ? result.predictedReplacementYear : 9999,
      currentReplacementDegree: result.currentReplacementDegree,
      earliestYear: result.confidenceInterval.earliest,
      latestYear: isFinite(result.confidenceInterval.latest) ? result.confidenceInterval.latest : 9999,
      lang,
      profileCode: result.profileCode,
    });
    const runtimeOrigin = window.location.origin;
    const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i;
    const configuredBase = (process.env.NEXT_PUBLIC_BASE_URL || '').trim().replace(/\/$/, '');
    const fallbackBase = 'https://air.democra.ai';
    const baseOrigin = localhostPattern.test(runtimeOrigin)
      ? (configuredBase || fallbackBase)
      : runtimeOrigin;
    return new URL(`/share/${payload}`, baseOrigin).toString();
  };

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      try { await navigator.clipboard.writeText(text); return true; } catch { /* fallback */ }
    }
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch { return false; }
  };

  const handleCopyLink = async () => {
    trackShareClick('copy_link', lang);
    const ok = await copyText(getShareUrl());
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyForWechat = async () => {
    trackShareClick('wechat', lang);
    const ok = await copyText(getShareText() + '\n' + getShareUrl());
    if (!ok) return;
    setWechatCopied(true);
    setTimeout(() => setWechatCopied(false), 3000);
  };

  const handleShareTwitter = () => {
    trackShareClick('twitter', lang);
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareWeibo = () => {
    trackShareClick('weibo', lang);
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://service.weibo.com/share/share.php?title=${text}&url=${url}`, '_blank');
  };

  const buildShareImageBlob = async (): Promise<Blob | null> => {
    if (!result) return null;
    const shareUrl = getShareUrl();
    const W = 1200, H = 630;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('image load failed'));
        image.src = src;
      });

    const roundedRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(x, y, w, h, r);
      } else {
        // Polyfill for browsers without roundRect
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
      }
    };

    // ── Color palette (matching OG card) ──
    const palMap: Record<string, { m: string; a: string; g: string }> = {
      'very-low': { m: '#34d399', a: '#06b6d4', g: '#059669' },
      'low':      { m: '#4ade80', a: '#22d3ee', g: '#16a34a' },
      'medium':   { m: '#fbbf24', a: '#f97316', g: '#d97706' },
      'high':     { m: '#fb923c', a: '#f43f5e', g: '#ea580c' },
      'critical': { m: '#f43f5e', a: '#a855f7', g: '#dc2626' },
    };
    const c = palMap[result.riskLevel] || palMap.critical;
    const zh = lang === 'zh';
    const prob = result.replacementProbability;
    const yr = result.predictedReplacementYear >= 2100 ? '\u221E' : String(result.predictedReplacementYear);
    const percentileSafe = 100 - prob;
    const currentYear = new Date().getFullYear();
    const yearsLeft = result.predictedReplacementYear >= 2100 ? null : result.predictedReplacementYear - currentYear;

    // Risk label
    const riskLabelMap: Record<string, [string, string]> = {
      'very-low': ['VERY LOW', '\u6781\u4F4E'], 'low': ['LOW', '\u4F4E'], 'medium': ['MEDIUM', '\u4E2D\u7B49'],
      'high': ['HIGH', '\u9AD8'], 'critical': ['CRITICAL', '\u6781\u9AD8'],
    };
    const lb = (riskLabelMap[result.riskLevel] || riskLabelMap.critical)[zh ? 1 : 0];

    // Profile names
    const profileNames: Record<string, { en: string; zh: string }> = {
      EOFP: { en: 'Full Chain Open', zh: '\u5168\u94FE\u8DEF\u7545\u901A\u578B' },
      EOFH: { en: 'Relationship Anchored', zh: '\u5173\u7CFB\u951A\u5B9A\u578B' },
      EORP: { en: 'Compliance Gatekeeper', zh: '\u5408\u89C4\u5B88\u95E8\u578B' },
      ESFP: { en: 'Creative Trial-and-Error', zh: '\u521B\u610F\u8BD5\u9519\u578B' },
      TOFP: { en: 'Skill Executor', zh: '\u6280\u80FD\u6267\u884C\u578B' },
      EORH: { en: 'Licensed Trust', zh: '\u6267\u8BC1\u4FE1\u4EFB\u578B' },
      ESFH: { en: 'Taste Curator', zh: '\u5BA1\u7F8E\u7B56\u5C55\u578B' },
      ESRP: { en: 'Craft Guardian', zh: '\u5DE5\u827A\u5B88\u62A4\u578B' },
      TSFP: { en: 'Experience Catalyst', zh: '\u4F53\u9A8C\u50AC\u5316\u578B' },
      TORP: { en: 'Field Commander', zh: '\u73B0\u573A\u6307\u6325\u578B' },
      TORH: { en: 'Crisis Navigator', zh: '\u5371\u673A\u9886\u822A\u578B' },
      ESRH: { en: 'Meaning Architect', zh: '\u610F\u4E49\u5EFA\u6784\u578B' },
      TSRP: { en: 'Physical Sovereign', zh: '\u8EAB\u4F53\u4E3B\u6743\u578B' },
      TSFH: { en: 'Bond Weaver', zh: '\u7EBD\u5E26\u7F16\u7EC7\u578B' },
      TOFH: { en: 'Embodied Guide', zh: '\u8EAB\u5FC3\u5F15\u5BFC\u578B' },
      TSRH: { en: 'Deep Human Core', zh: '\u6DF1\u5EA6\u4EBA\u6027\u578B' },
    };
    const profileName = profileNames[result.profileCode]?.[zh ? 'zh' : 'en'] ?? null;

    // Dimension data
    const favorableLetters = ['E', 'O', 'F', 'P'];
    const dimMeta: Record<string, { en: string; zh: string }> = {
      E: { en: 'Explicit', zh: '\u663E\u6027\u578B' }, T: { en: 'Tacit', zh: '\u9690\u6027\u578B' },
      O: { en: 'Objective', zh: '\u5BA2\u89C2\u578B' }, S: { en: 'Subjective', zh: '\u4E3B\u89C2\u578B' },
      F: { en: 'Flexible', zh: '\u5F39\u6027\u578B' }, R: { en: 'Rigid', zh: '\u521A\u6027\u578B' },
      P: { en: 'Product', zh: '\u5BF9\u4E8B\u578B' }, H: { en: 'Human', zh: '\u5BF9\u4EBA\u578B' },
    };
    const dims = result.profileCode.split('').map((letter, i) => ({
      v: letter,
      name: dimMeta[letter]?.[zh ? 'zh' : 'en'] ?? letter,
      risky: letter === favorableLetters[i],
    }));

    // Countdown / hook text
    const countdownText = yearsLeft !== null
      ? (zh ? `\u8DDD\u79BB\u4F60\u88AB\u66FF\u4EE3\u8FD8\u6709 ${yearsLeft} \u5E74` : `${yearsLeft} ${yearsLeft === 1 ? 'year' : 'years'} until you're replaced`)
      : (zh ? `AI \u5DF2\u7ECF\u80FD\u505A\u4F60 ${result.currentReplacementDegree}% \u7684\u5DE5\u4F5C` : `AI can already do ${result.currentReplacementDegree}% of your job`);
    const pctText = zh
      ? `\u4F60\u6BD4 ${percentileSafe}% \u7684\u6D4B\u8BD5\u8005\u66F4\u5B89\u5168`
      : `Safer than ${percentileSafe}% of test takers`;

    // ── Helper: hex to rgba ──
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${alpha})`;
    };

    // ═══════════════════════════════════════════════════════════════
    // DRAW — matching OG card layout exactly (1200×630)
    // ═══════════════════════════════════════════════════════════════
    try {

    // 1. Background
    ctx.fillStyle = '#06080e';
    ctx.fillRect(0, 0, W, H);

    // 2. Grid lines (50px spacing)
    ctx.strokeStyle = 'rgba(255,255,255,0.09)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 13; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * 50);
      ctx.lineTo(W, i * 50);
      ctx.stroke();
    }
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 50, 0);
      ctx.lineTo(i * 50, H);
      ctx.stroke();
    }

    // 3. BG glow orbs
    const drawGlow = (cx: number, cy: number, radius: number, color: string, alpha: number) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, hexToRgba(color, alpha));
      grad.addColorStop(0.65, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    };
    drawGlow(330, -80 + 230, 230, c.g, 0.07);
    drawGlow(W - 200 + 170, H + 100 - 170, 170, c.a, 0.03);
    drawGlow(W * 0.42 + 140, H * 0.35 + 140, 140, c.m, 0.024);

    // 4. Top accent line
    const topGrad = ctx.createLinearGradient(0, 0, W, 0);
    topGrad.addColorStop(0.05, 'rgba(0,0,0,0)');
    topGrad.addColorStop(0.35, c.m);
    topGrad.addColorStop(0.65, c.a);
    topGrad.addColorStop(0.95, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGrad;
    ctx.fillRect(0, 0, W, 3);

    // ── CONTENT AREA padding: 30px 44px 24px ──
    const PX = 44, PY = 30;

    // 5. Header row
    ctx.fillStyle = 'rgba(204,208,228,0.72)';
    ctx.font = '900 42px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const headerY = PY + 21;
    // Note: ctx.letterSpacing not widely supported, skip it
    ctx.fillText('AIR', PX, headerY);
    // letterSpacing reset
    const airWidth = ctx.measureText('AIR').width;
    // Divider
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(PX + airWidth + 16, headerY - 16, 1.5, 32);
    // Subtitle
    ctx.fillStyle = 'rgba(204,208,228,0.4)';
    ctx.font = '400 18px sans-serif';
    // letterSpacing 3px
    ctx.fillText(zh ? 'AI\u66FF\u4EE3\u98CE\u9669\u6307\u6570' : 'AI REPLACEMENT INDEX', PX + airWidth + 34, headerY);
    // letterSpacing reset
    // Risk badge pill (right side)
    const badgeText = zh ? `${lb}\u98CE\u9669` : `${lb} RISK`;
    ctx.font = '800 17px sans-serif';
    // letterSpacing 2.5px
    const badgeW = ctx.measureText(badgeText).width + 52 + 10; // padding + dot
    // letterSpacing reset
    const badgeX = W - PX - badgeW;
    const badgeY = headerY - 18;
    const badgeH = 36;
    roundedRect(badgeX, badgeY, badgeW, badgeH, 100);
    ctx.fillStyle = hexToRgba(c.m, 0.08);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(c.m, 0.33);
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Dot
    ctx.beginPath();
    ctx.arc(badgeX + 20, headerY, 5, 0, Math.PI * 2);
    ctx.fillStyle = c.m;
    ctx.fill();
    // Badge text
    ctx.fillStyle = c.m;
    ctx.font = '800 17px sans-serif';
    // letterSpacing 2.5px
    ctx.fillText(badgeText, badgeX + 34, headerY + 1);
    // letterSpacing reset

    // ── ROW 2: Main content (2 columns) ──
    const row2Top = PY + 50;
    const row2Bottom = H - 140; // leave space for gauge + CTA
    const leftW = W * 0.44;

    // === LEFT COLUMN: hero number + dimension squares ===
    const leftX = PX + 36;
    const leftCenterY = (row2Top + row2Bottom) / 2;

    // "REPLACEMENT PROBABILITY" label
    ctx.fillStyle = 'rgba(204,208,228,0.45)';
    ctx.font = '600 16px sans-serif';
    ctx.textAlign = 'left';
    // letterSpacing 3.5px
    ctx.fillText(zh ? '\u66FF\u4EE3\u6982\u7387' : 'REPLACEMENT PROBABILITY', leftX, leftCenterY - 100);
    // letterSpacing reset

    // Glow behind number
    const numGlow = ctx.createRadialGradient(leftX + 120, leftCenterY - 20, 0, leftX + 120, leftCenterY - 20, 120);
    numGlow.addColorStop(0, hexToRgba(c.m, 0.09));
    numGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = numGlow;
    ctx.fillRect(leftX - 10, leftCenterY - 140, 260, 200);

    // Big probability number
    ctx.fillStyle = c.m;
    ctx.font = '900 170px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    const numText = String(prob);
    ctx.fillText(numText, leftX, leftCenterY + 40);
    const numW = ctx.measureText(numText).width;
    // % sign
    ctx.fillStyle = hexToRgba(c.m, 0.3);
    ctx.font = '800 52px sans-serif';
    ctx.fillText('%', leftX + numW + 4, leftCenterY - 38);

    // Profile type name (below number)
    if (profileName) {
      ctx.fillStyle = 'rgba(204,208,228,0.4)';
      ctx.font = '600 13px sans-serif';
      // letterSpacing 2px
      ctx.fillText(zh ? '\u7C7B\u578B' : 'TYPE', leftX, leftCenterY + 68);
      // letterSpacing reset
      ctx.fillStyle = c.m;
      ctx.font = '800 20px sans-serif';
      ctx.fillText(profileName, leftX + (zh ? 40 : 50), leftCenterY + 68);
    }

    // Dimension squares (vertical, to the right of number)
    const dimX = leftX + numW + 70;
    const dimStartY = leftCenterY - 88;
    dims.forEach((d, i) => {
      const dy = dimStartY + i * 56;
      const dimColor = d.risky ? '#f43f5e' : '#34d399';
      const dimBorderColor = d.risky ? 'rgba(244,63,94,0.35)' : 'rgba(52,211,153,0.35)';
      const dimBgColor = d.risky ? 'rgba(244,63,94,0.1)' : 'rgba(52,211,153,0.1)';
      // Box
      roundedRect(dimX, dy, 48, 48, 10);
      ctx.fillStyle = dimBgColor;
      ctx.fill();
      ctx.strokeStyle = dimBorderColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Letter
      ctx.fillStyle = dimColor;
      ctx.font = '900 26px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(d.v, dimX + 24, dy + 24);
      // Label
      ctx.fillStyle = dimColor;
      ctx.font = '800 13px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      // letterSpacing 0.5px
      ctx.fillText(d.name, dimX + 58, dy + 24);
      // letterSpacing reset
    });

    // === RIGHT COLUMN: data panels ===
    const rightX = leftW + PX + 24;
    const rightW = W - rightX - PX;
    const panelCenterY = (row2Top + row2Bottom) / 2;

    // Panel 1: Predicted Year + AI Capability
    const p1Y = panelCenterY - 100;
    const p1H = 100;
    roundedRect(rightX, p1Y, rightW, p1H, 14);
    ctx.fillStyle = 'rgba(255,255,255,0.025)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Left side: predicted year
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(204,208,228,0.45)';
    ctx.font = '700 14px sans-serif';
    // letterSpacing 3px
    ctx.fillText(zh ? '\u9884\u6D4B\u66FF\u4EE3\u5E74\u4EFD' : 'PREDICTED REPLACEMENT YEAR', rightX + 24, p1Y + 16);
    // letterSpacing reset
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(yr, rightX + 24, p1Y + 34);
    // Confidence interval
    if (result.predictedReplacementYear < 2100) {
      ctx.fillStyle = 'rgba(204,208,228,0.3)';
      ctx.font = '400 13px sans-serif';
      ctx.fillText(`${result.confidenceInterval.earliest} \u2014 ${result.confidenceInterval.latest}`, rightX + 24, p1Y + 82);
    }
    // Right side: AI capability
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(204,208,228,0.35)';
    ctx.font = '600 11px sans-serif';
    // letterSpacing 1.5px
    ctx.fillText(zh ? 'AI\u5F53\u524D\u80FD\u529B' : 'AI CAPABILITY', rightX + rightW - 24, p1Y + 18);
    // letterSpacing reset
    ctx.fillStyle = '#67e8f9';
    ctx.font = '800 28px sans-serif';
    ctx.fillText(`${result.currentAICapability}%`, rightX + rightW - 24, p1Y + 34);
    // Capability bar
    const capBarX = rightX + rightW - 124;
    const capBarY = p1Y + 68;
    const capBarW = 100;
    const capBarH = 5;
    roundedRect(capBarX, capBarY, capBarW, capBarH, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fill();
    const capFillW = (result.currentAICapability / 100) * capBarW;
    if (capFillW > 0) {
      const capGrad = ctx.createLinearGradient(capBarX, 0, capBarX + capFillW, 0);
      capGrad.addColorStop(0, '#67e8f9');
      capGrad.addColorStop(1, c.m);
      roundedRect(capBarX, capBarY, capFillW, capBarH, 3);
      ctx.fillStyle = capGrad;
      ctx.fill();
    }

    // Panel 2: Hook / countdown
    const p2Y = p1Y + p1H + 10;
    const p2H = 50;
    roundedRect(rightX, p2Y, rightW, p2H, 14);
    ctx.fillStyle = hexToRgba(c.m, 0.04);
    ctx.fill();
    ctx.strokeStyle = hexToRgba(c.m, 0.15);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = c.m;
    ctx.font = '800 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(countdownText, rightX + rightW / 2, p2Y + p2H / 2);

    // Panel 3: Percentile bar
    const p3Y = p2Y + p2H + 10;
    const p3H = 40;
    roundedRect(rightX, p3Y, rightW, p3H, 14);
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Bar
    const pctBarX = rightX + 24;
    const pctBarW = rightW * 0.45;
    const pctBarY2 = p3Y + (p3H - 6) / 2;
    roundedRect(pctBarX, pctBarY2, pctBarW, 6, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fill();
    const pctFillW = (percentileSafe / 100) * pctBarW;
    if (pctFillW > 0) {
      const pctGrad = ctx.createLinearGradient(pctBarX, 0, pctBarX + pctFillW, 0);
      pctGrad.addColorStop(0, c.m);
      pctGrad.addColorStop(1, '#34d399');
      roundedRect(pctBarX, pctBarY2, pctFillW, 6, 3);
      ctx.fillStyle = pctGrad;
      ctx.fill();
    }
    // Percentile text
    ctx.fillStyle = 'rgba(204,208,228,0.55)';
    ctx.font = '700 16px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(pctText, pctBarX + pctBarW + 14, p3Y + p3H / 2);

    // ── ROW 3: Gauge bar ──
    const gaugeY = H - 108;
    const gaugeBarH = 10;
    const gaugeX = PX;
    const gaugeW = W - PX * 2;
    const segGap = 4;
    const segW = (gaugeW - segGap * 4) / 5;
    const barColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
    const stages = ['SAFE', 'ASSIST', 'AGENT', 'LEAD', 'KILL'];

    // "You are here" pointer
    const pointerX = gaugeX + (prob / 100) * gaugeW;
    ctx.fillStyle = c.m;
    ctx.beginPath();
    ctx.moveTo(pointerX - 5, gaugeY - 10);
    ctx.lineTo(pointerX + 5, gaugeY - 10);
    ctx.lineTo(pointerX, gaugeY - 3);
    ctx.closePath();
    ctx.fill();
    ctx.font = '700 11px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    // letterSpacing 1px
    ctx.fillText(zh ? '\u4F60\u5728\u8FD9\u91CC' : 'YOU ARE HERE', pointerX + 8, gaugeY - 4);
    // letterSpacing reset

    // Bar segments
    for (let i = 0; i < 5; i++) {
      const sx = gaugeX + i * (segW + segGap);
      const s = i * 20, e = s + 20;
      const f = prob >= e ? 1 : prob <= s ? 0 : (prob - s) / 20;
      // Background
      roundedRect(sx, gaugeY, segW, gaugeBarH, 5);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fill();
      // Fill
      if (f > 0) {
        roundedRect(sx, gaugeY, segW * f, gaugeBarH, 5);
        ctx.fillStyle = barColors[i];
        ctx.fill();
      }
    }

    // Stage labels
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    for (let i = 0; i < 5; i++) {
      const sx = gaugeX + i * (segW + segGap) + segW / 2;
      const active = i * 20 <= prob && prob < i * 20 + 20;
      ctx.globalAlpha = active ? 1 : 0.4;
      ctx.fillStyle = barColors[i];
      ctx.font = '800 15px sans-serif';
      // letterSpacing 2px
      ctx.fillText(stages[i], sx, gaugeY + gaugeBarH + 5);
      // letterSpacing reset
    }
    ctx.globalAlpha = 1;

    // ── ROW 4: CTA + QR ──
    const ctaY = H - 52;

    // CTA button
    const ctaText = zh ? '\u6D4B\u6D4B\u4F60\u7684 AI \u66FF\u4EE3\u98CE\u9669 \u2192' : "What's your AI risk? Take the test \u2192";
    ctx.font = '800 17px sans-serif';
    const ctaTextW = ctx.measureText(ctaText).width;
    const ctaBtnW = ctaTextW + 64;
    const ctaBtnH = 42;
    const ctaBtnX = PX;
    const ctaBtnY = ctaY - ctaBtnH / 2;
    const ctaGrad = ctx.createLinearGradient(ctaBtnX, ctaBtnY, ctaBtnX + ctaBtnW, ctaBtnY + ctaBtnH);
    ctaGrad.addColorStop(0, c.m);
    ctaGrad.addColorStop(1, c.a);
    roundedRect(ctaBtnX, ctaBtnY, ctaBtnW, ctaBtnH, 12);
    ctx.fillStyle = ctaGrad;
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 17px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(ctaText, ctaBtnX + ctaBtnW / 2, ctaY);

    // QR code
    const qrSize = 50;
    const qrBoxSize = qrSize + 6;
    const qrX = W - PX - qrBoxSize;
    const qrY2 = ctaY - qrBoxSize / 2;
    try {
      const qrDataUrl = await QRCode.toDataURL(shareUrl, {
        errorCorrectionLevel: 'L', margin: 1, width: qrSize,
        color: { dark: '#000000', light: '#ffffff' },
      });
      const qrImage = await loadImage(qrDataUrl);
      // White background
      roundedRect(qrX, qrY2, qrBoxSize, qrBoxSize, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.drawImage(qrImage, qrX + 3, qrY2 + 3, qrSize, qrSize);
    } catch {
      roundedRect(qrX, qrY2, qrBoxSize, qrBoxSize, 4);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }

    // URL text
    ctx.fillStyle = 'rgba(204,208,228,0.2)';
    ctx.font = '400 13px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    // letterSpacing 1.5px
    ctx.fillText('air.democra.ai', qrX - 10, ctaY);
    // letterSpacing reset

    // Bottom accent line
    const bottomGrad = ctx.createLinearGradient(0, 0, W, 0);
    bottomGrad.addColorStop(0.1, 'rgba(0,0,0,0)');
    bottomGrad.addColorStop(0.5, hexToRgba(c.m, 0.15));
    bottomGrad.addColorStop(0.9, 'rgba(0,0,0,0)');
    ctx.fillStyle = bottomGrad;
    ctx.fillRect(0, H - 1, W, 1);

    } catch (drawErr) {
      console.error('Canvas draw error:', drawErr);
      // Even if drawing partially failed, still try to export what we have
    }

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  const handleShareTelegram = async () => {
    trackShareClick('telegram', lang);
    const shareText = getShareText();
    const shareUrl = getShareUrl();
    const fallbackUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}`;
    const deepLinkUrl = `tg://msg_url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    try {
      setTelegramShareState('sending');
      const imageBlob = await buildShareImageBlob();
      if (imageBlob) {
        const photoForm = new FormData();
        photoForm.append('photo', imageBlob, 'air-risk-poster.png');
        photoForm.append('caption', `${shareText}\n${shareUrl}`);
        const photoResponse = await fetch('/api/share/telegram/photo', { method: 'POST', body: photoForm });
        if (photoResponse.ok) {
          setTelegramShareState('sent');
          setTimeout(() => setTelegramShareState('idle'), 2600);
          return;
        }
      }
      const textResponse = await fetch('/api/share/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: shareText, url: shareUrl }),
      });
      if (textResponse.ok) {
        setTelegramShareState('sent');
        setTimeout(() => setTelegramShareState('idle'), 2600);
        return;
      }
    } catch { /* fallback */ }
    const isMobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobileBrowser) {
      window.location.href = deepLinkUrl;
      window.setTimeout(() => { window.location.href = fallbackUrl; }, 900);
    } else {
      window.open(fallbackUrl, '_blank', 'noopener,noreferrer');
    }
    setTelegramShareState('fallback');
    setTimeout(() => setTelegramShareState('idle'), 3200);
  };

  const handleDownloadResult = async () => {
    trackShareClick('download_result', lang);
    try {
      console.log('[SaveResult] Starting capture...');
      const captureEl = document.querySelector('[data-testid="share-result-capture"]') as HTMLElement;
      if (!captureEl) { console.error('[SaveResult] Capture element not found'); alert('Result element not found'); return; }
      console.log('[SaveResult] Element found, size:', captureEl.offsetWidth, captureEl.offsetHeight);

      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default ?? html2canvasModule;
      console.log('[SaveResult] html2canvas loaded:', typeof html2canvas);

      const snapshot = await html2canvas(captureEl, {
        backgroundColor: '#0a0908',
        scale: 2,
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          // Fix: html2canvas can't parse CSS lab() color function (Tailwind v4)
          // Replace all lab() occurrences with transparent in the cloned DOM
          clonedDoc.querySelectorAll('*').forEach((el) => {
            const style = (el as HTMLElement).style;
            if (style.cssText.includes('lab(')) {
              style.cssText = style.cssText.replace(/lab\([^)]*\)/g, 'transparent');
            }
          });
          // Also fix computed border-color on elements with border-transparent
          clonedDoc.querySelectorAll('[class*="border-transparent"]').forEach((el) => {
            (el as HTMLElement).style.borderColor = 'transparent';
          });
        },
      });
      console.log('[SaveResult] Snapshot captured:', snapshot.width, snapshot.height);

      // Build a designed poster wrapping the screenshot
      const PAD = 80;
      const HEADER_H = 100;
      const FOOTER_H = 120;
      const contentW = snapshot.width;
      const contentH = snapshot.height;
      const W = contentW + PAD * 2;
      const H = HEADER_H + contentH + FOOTER_H + PAD;

      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const palMap: Record<string, { m: string; a: string }> = {
        'very-low': { m: '#34d399', a: '#06b6d4' }, 'low': { m: '#4ade80', a: '#22d3ee' },
        'medium': { m: '#fbbf24', a: '#f97316' }, 'high': { m: '#fb923c', a: '#f43f5e' },
        'critical': { m: '#f43f5e', a: '#a855f7' },
      };
      const cm = (palMap[result!.riskLevel] || palMap.critical).m;
      const ca = (palMap[result!.riskLevel] || palMap.critical).a;

      // Background
      ctx.fillStyle = '#06080e';
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= H / 50; i++) { ctx.beginPath(); ctx.moveTo(0, i*50); ctx.lineTo(W, i*50); ctx.stroke(); }
      for (let i = 0; i <= W / 50; i++) { ctx.beginPath(); ctx.moveTo(i*50, 0); ctx.lineTo(i*50, H); ctx.stroke(); }

      // Top accent line
      const topG = ctx.createLinearGradient(0, 0, W, 0);
      topG.addColorStop(0.05, 'rgba(0,0,0,0)'); topG.addColorStop(0.35, cm); topG.addColorStop(0.65, ca); topG.addColorStop(0.95, 'rgba(0,0,0,0)');
      ctx.fillStyle = topG;
      ctx.fillRect(0, 0, W, 4);

      // Header: AIR logo + risk badge
      const zh = lang === 'zh';
      ctx.fillStyle = 'rgba(204,208,228,0.7)';
      ctx.font = '900 48px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const headerY = 4 + HEADER_H / 2;
      ctx.fillText('AIR', PAD, headerY);
      const airW = ctx.measureText('AIR').width;
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(PAD + airW + 18, headerY - 18, 2, 36);
      ctx.fillStyle = 'rgba(204,208,228,0.35)';
      ctx.font = '400 22px sans-serif';
      ctx.fillText(zh ? 'AI替代风险指数' : 'AI REPLACEMENT INDEX', PAD + airW + 36, headerY);

      // Risk badge (right)
      const riskLabels: Record<string, [string, string]> = {
        'very-low': ['VERY LOW', '极低'], 'low': ['LOW', '低'], 'medium': ['MEDIUM', '中等'],
        'high': ['HIGH', '高'], 'critical': ['CRITICAL', '极高'],
      };
      const lb = (riskLabels[result!.riskLevel] || riskLabels.critical)[zh ? 1 : 0];
      const badgeT = zh ? `${lb}风险` : `${lb} RISK`;
      ctx.font = '800 22px sans-serif';
      const badgeW2 = ctx.measureText(badgeT).width + 60;
      const badgeX2 = W - PAD - badgeW2;

      const rr = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); }
        else { ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath(); }
      };

      rr(badgeX2, headerY - 20, badgeW2, 40, 100);
      const hexA = (hex: string, a: number) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `rgba(${r},${g},${b},${a})`; };
      ctx.fillStyle = hexA(cm, 0.1); ctx.fill();
      ctx.strokeStyle = hexA(cm, 0.35); ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(badgeX2 + 22, headerY, 6, 0, Math.PI * 2); ctx.fillStyle = cm; ctx.fill();
      ctx.fillStyle = cm; ctx.font = '800 22px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(badgeT, badgeX2 + 38, headerY + 1);

      // Draw the captured result content
      ctx.drawImage(snapshot, PAD, 4 + HEADER_H, contentW, contentH);

      // Footer: CTA + URL
      const footerY = 4 + HEADER_H + contentH + 30;
      rr(PAD, footerY, 500, 56, 14);
      const ctaG = ctx.createLinearGradient(PAD, 0, PAD + 500, 0);
      ctaG.addColorStop(0, cm); ctaG.addColorStop(1, ca);
      ctx.fillStyle = ctaG; ctx.fill();
      ctx.fillStyle = '#ffffff'; ctx.font = '800 24px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(zh ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →", PAD + 250, footerY + 28);

      ctx.fillStyle = 'rgba(204,208,228,0.2)'; ctx.font = '400 18px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText('air.democra.ai', W - PAD, footerY + 28);

      // Bottom accent
      const btmG = ctx.createLinearGradient(0, 0, W, 0);
      btmG.addColorStop(0.1, 'rgba(0,0,0,0)'); btmG.addColorStop(0.5, hexA(cm, 0.15)); btmG.addColorStop(0.9, 'rgba(0,0,0,0)');
      ctx.fillStyle = btmG; ctx.fillRect(0, H - 2, W, 2);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'air-result.png';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (err) {
      console.error('Result capture failed:', err);
    }
  };

  /** Build a vertical designed poster (1080×1920) for Save Result */
  const buildResultPosterBlob = async (): Promise<Blob | null> => {
    if (!result) return null;
    const W = 1080, H = 1920;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const palMap: Record<string, { m: string; a: string; g: string }> = {
      'very-low': { m: '#34d399', a: '#06b6d4', g: '#059669' },
      'low':      { m: '#4ade80', a: '#22d3ee', g: '#16a34a' },
      'medium':   { m: '#fbbf24', a: '#f97316', g: '#d97706' },
      'high':     { m: '#fb923c', a: '#f43f5e', g: '#ea580c' },
      'critical': { m: '#f43f5e', a: '#a855f7', g: '#dc2626' },
    };
    const c = palMap[result.riskLevel] || palMap.critical;
    const zh = lang === 'zh';
    const prob = result.replacementProbability;
    const yr = result.predictedReplacementYear >= 2100 ? '∞' : String(result.predictedReplacementYear);
    const currentYear = new Date().getFullYear();
    const yearsLeft = result.predictedReplacementYear >= 2100 ? null : result.predictedReplacementYear - currentYear;
    const percentileSafe = 100 - prob;

    const riskLabelMap: Record<string, [string, string]> = {
      'very-low': ['VERY LOW', '极低'], 'low': ['LOW', '低'], 'medium': ['MEDIUM', '中等'],
      'high': ['HIGH', '高'], 'critical': ['CRITICAL', '极高'],
    };
    const lb = (riskLabelMap[result.riskLevel] || riskLabelMap.critical)[zh ? 1 : 0];

    const profileNames: Record<string, { en: string; zh: string }> = {
      EOFP: { en: 'Full Chain Open', zh: '全链路畅通型' }, EOFH: { en: 'Relationship Anchored', zh: '关系锚定型' },
      EORP: { en: 'Compliance Gatekeeper', zh: '合规守门型' }, ESFP: { en: 'Creative Trial-and-Error', zh: '创意试错型' },
      TOFP: { en: 'Skill Executor', zh: '技能执行型' }, EORH: { en: 'Licensed Trust', zh: '执证信任型' },
      ESFH: { en: 'Taste Curator', zh: '审美策展型' }, ESRP: { en: 'Craft Guardian', zh: '工艺守护型' },
      TSFP: { en: 'Experience Catalyst', zh: '体验催化型' }, TORP: { en: 'Field Commander', zh: '现场指挥型' },
      TORH: { en: 'Crisis Navigator', zh: '危机领航型' }, ESRH: { en: 'Meaning Architect', zh: '意义建构型' },
      TSRP: { en: 'Physical Sovereign', zh: '身体主权型' }, TSFH: { en: 'Bond Weaver', zh: '纽带编织型' },
      TOFH: { en: 'Embodied Guide', zh: '身心引导型' }, TSRH: { en: 'Deep Human Core', zh: '深度人性型' },
    };
    const profileName = profileNames[result.profileCode]?.[zh ? 'zh' : 'en'] ?? result.profileCode;

    const favorableLetters = ['E', 'O', 'F', 'P'];
    const dimMeta: Record<string, { en: string; zh: string }> = {
      E: { en: 'Explicit', zh: '显性型' }, T: { en: 'Tacit', zh: '隐性型' },
      O: { en: 'Objective', zh: '客观型' }, S: { en: 'Subjective', zh: '主观型' },
      F: { en: 'Flexible', zh: '弹性型' }, R: { en: 'Rigid', zh: '刚性型' },
      P: { en: 'Product', zh: '对事型' }, H: { en: 'Human', zh: '对人型' },
    };
    const dims = result.profileCode.split('').map((letter, i) => ({
      v: letter, name: dimMeta[letter]?.[zh ? 'zh' : 'en'] ?? letter,
      risky: letter === favorableLetters[i],
    }));

    const hexA = (hex: string, a: number) => {
      const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
      return `rgba(${r},${g},${b},${a})`;
    };

    const rr = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (ctx.roundRect) { ctx.roundRect(x, y, w, h, r); }
      else { ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath(); }
    };

    try {
    const PX = 60; // horizontal padding

    // Background
    ctx.fillStyle = '#06080e';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= H/50; i++) { ctx.beginPath(); ctx.moveTo(0, i*50); ctx.lineTo(W, i*50); ctx.stroke(); }
    for (let i = 0; i <= W/50; i++) { ctx.beginPath(); ctx.moveTo(i*50, 0); ctx.lineTo(i*50, H); ctx.stroke(); }

    // Glow orbs
    const glow = (cx: number, cy: number, rad: number, col: string, a: number) => {
      const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      gr.addColorStop(0, hexA(col, a)); gr.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gr; ctx.fillRect(cx-rad, cy-rad, rad*2, rad*2);
    };
    glow(200, 300, 350, c.g, 0.08);
    glow(W-150, 900, 300, c.a, 0.05);
    glow(W/2, 600, 400, c.m, 0.04);

    // Top accent
    const topG = ctx.createLinearGradient(0,0,W,0);
    topG.addColorStop(0.05, 'rgba(0,0,0,0)'); topG.addColorStop(0.35, c.m);
    topG.addColorStop(0.65, c.a); topG.addColorStop(0.95, 'rgba(0,0,0,0)');
    ctx.fillStyle = topG; ctx.fillRect(0, 0, W, 4);

    // ── Header ──
    let Y = 60;
    ctx.fillStyle = 'rgba(204,208,228,0.7)';
    ctx.font = '900 48px sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('AIR', PX, Y);
    const airW = ctx.measureText('AIR').width;
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(PX + airW + 18, Y - 18, 2, 36);
    ctx.fillStyle = 'rgba(204,208,228,0.35)';
    ctx.font = '400 20px sans-serif';
    ctx.fillText(zh ? 'AI替代风险指数' : 'AI REPLACEMENT INDEX', PX + airW + 36, Y);

    // Risk badge
    const badgeT = zh ? `${lb}风险` : `${lb} RISK`;
    ctx.font = '800 20px sans-serif';
    const badgeW = ctx.measureText(badgeT).width + 60;
    const badgeX = W - PX - badgeW;
    rr(badgeX, Y-20, badgeW, 40, 100);
    ctx.fillStyle = hexA(c.m, 0.1); ctx.fill();
    ctx.strokeStyle = hexA(c.m, 0.35); ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.arc(badgeX + 22, Y, 6, 0, Math.PI*2); ctx.fillStyle = c.m; ctx.fill();
    ctx.fillStyle = c.m; ctx.font = '800 20px sans-serif'; ctx.fillText(badgeT, badgeX + 38, Y + 1);

    // ── Hero: Big probability number ──
    Y = 220;
    ctx.fillStyle = 'rgba(204,208,228,0.4)';
    ctx.font = '600 18px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(zh ? '替代概率' : 'REPLACEMENT PROBABILITY', W/2, Y);

    // Number glow
    glow(W/2, Y + 160, 200, c.m, 0.12);

    Y += 30;
    ctx.fillStyle = c.m;
    ctx.font = '900 260px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(String(prob), W/2 - 20, Y + 230);
    ctx.fillStyle = hexA(c.m, 0.3);
    ctx.font = '800 80px sans-serif';
    const numW = ctx.measureText(String(prob)).width;
    ctx.textAlign = 'left';
    ctx.fillText('%', W/2 - 20 + numW/2 + 8, Y + 140);

    // Profile name
    Y += 260;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 36px sans-serif';
    ctx.fillText(profileName, W/2, Y);
    Y += 50;
    ctx.fillStyle = c.m;
    ctx.font = '700 22px sans-serif';
    ctx.fillText(result.profileCode, W/2, Y);

    // ── 4 Dimension squares (horizontal row) ──
    Y += 60;
    const dimSize = 70, dimGap = 30;
    const totalDimW = dims.length * dimSize + (dims.length-1) * dimGap;
    let dimX = (W - totalDimW) / 2;
    dims.forEach((d) => {
      const dc = d.risky ? '#f43f5e' : '#34d399';
      rr(dimX, Y, dimSize, dimSize, 14);
      ctx.fillStyle = d.risky ? 'rgba(244,63,94,0.12)' : 'rgba(52,211,153,0.12)'; ctx.fill();
      ctx.strokeStyle = d.risky ? 'rgba(244,63,94,0.4)' : 'rgba(52,211,153,0.4)'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = dc; ctx.font = '900 34px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(d.v, dimX + dimSize/2, Y + dimSize/2 - 2);
      ctx.font = '700 13px sans-serif'; ctx.fillText(d.name, dimX + dimSize/2, Y + dimSize + 18);
      dimX += dimSize + dimGap;
    });

    // ── Data panels ──
    Y += dimSize + 60;

    // Panel: Predicted Year + AI Capability
    const panelW = W - PX*2, panelH = 140;
    rr(PX, Y, panelW, panelH, 20);
    ctx.fillStyle = 'rgba(255,255,255,0.03)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();
    // Year
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(204,208,228,0.4)'; ctx.font = '700 16px sans-serif';
    ctx.fillText(zh ? '预测替代年份' : 'PREDICTED REPLACEMENT YEAR', PX + 30, Y + 20);
    ctx.fillStyle = '#ffffff'; ctx.font = '900 64px sans-serif';
    ctx.fillText(yr, PX + 30, Y + 44);
    if (result.predictedReplacementYear < 2100) {
      ctx.fillStyle = 'rgba(204,208,228,0.25)'; ctx.font = '400 16px sans-serif';
      ctx.fillText(`${result.confidenceInterval.earliest} — ${result.confidenceInterval.latest}`, PX + 30, Y + 112);
    }
    // AI Capability (right)
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(204,208,228,0.3)'; ctx.font = '600 14px sans-serif';
    ctx.fillText(zh ? 'AI当前能力' : 'AI CAPABILITY', W - PX - 30, Y + 22);
    ctx.fillStyle = '#67e8f9'; ctx.font = '800 40px sans-serif';
    ctx.fillText(`${result.currentAICapability}%`, W - PX - 30, Y + 44);
    // Capability bar
    const capBW = 160, capBH = 8, capBX = W - PX - 30 - capBW, capBY = Y + 100;
    rr(capBX, capBY, capBW, capBH, 4); ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fill();
    const capFill = (result.currentAICapability/100) * capBW;
    if (capFill > 0) {
      const cg = ctx.createLinearGradient(capBX, 0, capBX+capFill, 0);
      cg.addColorStop(0, '#67e8f9'); cg.addColorStop(1, c.m);
      rr(capBX, capBY, capFill, capBH, 4); ctx.fillStyle = cg; ctx.fill();
    }

    // Countdown hook panel
    Y += panelH + 20;
    const hookH = 70;
    rr(PX, Y, panelW, hookH, 20);
    ctx.fillStyle = hexA(c.m, 0.06); ctx.fill();
    ctx.strokeStyle = hexA(c.m, 0.2); ctx.lineWidth = 1.5; ctx.stroke();
    const hookText = yearsLeft !== null
      ? (zh ? `距离你被替代还有 ${yearsLeft} 年` : `${yearsLeft} ${yearsLeft === 1 ? 'year' : 'years'} until you're replaced`)
      : (zh ? `AI 已经能做你 ${result.currentAICapability}% 的工作` : `AI can already do ${result.currentAICapability}% of your job`);
    ctx.fillStyle = c.m; ctx.font = '800 28px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(hookText, W/2, Y + hookH/2);

    // Percentile bar panel
    Y += hookH + 20;
    const pctH = 60;
    rr(PX, Y, panelW, pctH, 20);
    ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1; ctx.stroke();
    // Bar
    const barX = PX + 30, barY2 = Y + 20, barW = panelW * 0.55, barH2 = 8;
    rr(barX, barY2, barW, barH2, 4); ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fill();
    const pctFill = (percentileSafe/100) * barW;
    if (pctFill > 0) {
      const pg = ctx.createLinearGradient(barX, 0, barX+pctFill, 0);
      pg.addColorStop(0, c.m); pg.addColorStop(1, '#34d399');
      rr(barX, barY2, pctFill, barH2, 4); ctx.fillStyle = pg; ctx.fill();
    }
    const pctText = zh ? `你比 ${percentileSafe}% 的测试者更安全` : `Safer than ${percentileSafe}% of test takers`;
    ctx.fillStyle = 'rgba(204,208,228,0.5)'; ctx.font = '700 20px sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(pctText, W - PX - 30, Y + pctH/2);

    // ── Gauge bar ──
    Y += pctH + 40;
    const stages = ['SAFE', 'ASSIST', 'AGENT', 'LEAD', 'KILL'];
    const stageColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
    const gaugeW = W - PX*2, segGap = 6;
    const segW = (gaugeW - segGap * 4) / 5;
    // "You are here" pointer
    const pointerX = PX + (prob / 100) * gaugeW;
    ctx.fillStyle = c.m; ctx.font = '700 14px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText(zh ? '你在这里' : 'YOU ARE HERE', pointerX, Y - 4);
    ctx.beginPath(); ctx.moveTo(pointerX-6, Y-2); ctx.lineTo(pointerX+6, Y-2); ctx.lineTo(pointerX, Y+6); ctx.closePath(); ctx.fill();
    // Segments
    const segY = Y + 10, segH = 14;
    for (let i = 0; i < 5; i++) {
      const sx = PX + i * (segW + segGap);
      const s = i*20, e = s+20;
      const f = prob >= e ? 1 : prob <= s ? 0 : (prob-s)/20;
      rr(sx, segY, segW, segH, 7); ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fill();
      if (f > 0) { rr(sx, segY, segW * f, segH, 7); ctx.fillStyle = stageColors[i]; ctx.fill(); }
    }
    // Labels
    ctx.textBaseline = 'top';
    for (let i = 0; i < 5; i++) {
      const sx = PX + i * (segW + segGap) + segW/2;
      const active = i*20 <= prob && prob < i*20+20;
      ctx.fillStyle = active ? stageColors[i] : 'rgba(204,208,228,0.35)';
      ctx.font = `800 ${active ? 18 : 16}px sans-serif`; ctx.textAlign = 'center';
      ctx.fillText(stages[i], sx, segY + segH + 8);
    }

    // ── Dimension detail cards ──
    Y = segY + segH + 60;
    const dimNames = [zh ? '可学习性' : 'Learnability', zh ? '评判客观性' : 'Evaluation', zh ? '容错性' : 'Risk Tolerance', zh ? '人格依赖性' : 'Human Presence'];
    const cardW = (panelW - 20) / 2, cardH = 100;
    result.dimensions.forEach((dim, i) => {
      const cx = PX + (i % 2) * (cardW + 20);
      const cy = Y + Math.floor(i / 2) * (cardH + 16);
      const dc = dim.isFavorable ? '#f43f5e' : '#34d399';
      rr(cx, cy, cardW, cardH, 16);
      ctx.fillStyle = 'rgba(255,255,255,0.025)'; ctx.fill();
      ctx.strokeStyle = hexA(dc, 0.2); ctx.lineWidth = 1; ctx.stroke();
      // Letter
      ctx.fillStyle = dc; ctx.font = '900 32px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText(dim.letter, cx + 20, cy + 16);
      // Name
      ctx.fillStyle = 'rgba(204,208,228,0.6)'; ctx.font = '600 15px sans-serif';
      ctx.fillText(dimNames[i], cx + 60, cy + 22);
      // Score bar
      const sbX = cx + 20, sbY = cy + 60, sbW = cardW - 40, sbH = 6;
      rr(sbX, sbY, sbW, sbH, 3); ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fill();
      const scoreFill = ((dim.rawAverage - 1) / 4) * sbW;
      if (scoreFill > 0) { rr(sbX, sbY, scoreFill, sbH, 3); ctx.fillStyle = dc; ctx.fill(); }
      // Score text
      ctx.fillStyle = dc; ctx.font = '700 14px sans-serif'; ctx.textAlign = 'right';
      ctx.fillText(`${dim.rawAverage.toFixed(1)} / 5.0`, cx + cardW - 20, cy + 80);
      // Label
      ctx.fillStyle = hexA(dc, 0.7); ctx.font = '700 13px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText(dim.isFavorable ? (zh ? 'AI有利' : 'AI Favorable') : (zh ? 'AI不利' : 'AI Resistant'), cx + 20, cy + 78);
    });

    // ── CTA + URL ──
    Y = H - 120;
    rr(PX, Y, 420, 56, 14);
    const ctaG = ctx.createLinearGradient(PX, 0, PX+420, 0);
    ctaG.addColorStop(0, c.m); ctaG.addColorStop(1, c.a);
    ctx.fillStyle = ctaG; ctx.fill();
    ctx.fillStyle = '#ffffff'; ctx.font = '800 22px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(zh ? '测测你的 AI 替代风险 →' : "What's your AI risk? →", PX + 210, Y + 28);
    // URL
    ctx.fillStyle = 'rgba(204,208,228,0.2)'; ctx.font = '400 16px sans-serif'; ctx.textAlign = 'right';
    ctx.fillText('air.democra.ai', W - PX, Y + 28);

    // QR code
    try {
      const qrDataUrl = await QRCode.toDataURL(getShareUrl(), { errorCorrectionLevel: 'L', margin: 1, width: 80, color: { dark: '#0c1322', light: '#ffffff' } });
      const qrImg = new Image(); qrImg.src = qrDataUrl;
      await new Promise<void>((res, rej) => { qrImg.onload = () => res(); qrImg.onerror = () => rej(); });
      const qrS = 60, qrBX = W - PX - qrS - 10, qrBY = Y - 10;
      rr(qrBX-4, qrBY-4, qrS+8, qrS+8, 6); ctx.fillStyle = '#fff'; ctx.fill();
      ctx.drawImage(qrImg, qrBX, qrBY, qrS, qrS);
    } catch { /* QR optional */ }

    // Bottom accent
    const btmG = ctx.createLinearGradient(0,0,W,0);
    btmG.addColorStop(0.1, 'rgba(0,0,0,0)'); btmG.addColorStop(0.5, hexA(c.m, 0.15)); btmG.addColorStop(0.9, 'rgba(0,0,0,0)');
    ctx.fillStyle = btmG; ctx.fillRect(0, H-2, W, 2);

    } catch (err) { console.error('Poster draw error:', err); }

    return new Promise((resolve) => { canvas.toBlob((blob) => resolve(blob), 'image/png'); });
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  const riskColor = result ? RISK_TIER_INFO[result.profile.riskTier].color : '#fff';

  return (
    <section
      id="risk-calculator"
      data-mobile-section="risk"
      data-lang={lang}
      className="py-12 sm:py-24 px-4 md:px-6 relative overflow-hidden scroll-mt-8 responsive-copy-scope bg-background"
    >
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-overlay-10">
            <Target className="w-4 h-4" style={{ stroke: 'url(#badge-gradient)' }} />
            <svg width="0" height="0"><defs><linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#38bdf8" /><stop offset="50%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#fb7185" /></linearGradient></defs></svg>
            <span className="text-sm font-medium bg-gradient-to-r from-sky-400 via-violet-400 to-rose-400 bg-clip-text text-transparent">{t.survivalBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 section-title">
            {t.survivalTitle}
          </h2>
          <p className="section-subtitle text-lg md:text-xl max-w-2xl mx-auto">
            {t.survivalSubtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <MagicCard className="card-glow-border rounded-2xl p-3 md:p-5 relative overflow-hidden" gradientColor="rgba(139, 92, 246, 0.08)" gradientOpacity={0.8}>
          <BorderBeam
            size={150}
            duration={10}
            colorFrom={theme === 'dark' ? '#ffffff' : '#ff6b35'}
            colorTo={theme === 'dark' ? '#c4b5fd' : '#ff1744'}
            borderWidth={1.5}
          />
          {/* ══════════════ INTRO PHASE ══════════════ */}
          {phase === 'intro' && (
            <div className="text-center space-y-6 py-8">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500/15 via-violet-500/15 to-rose-500/10 flex items-center justify-center border border-overlay-10">
                <Brain className="w-10 h-10 text-violet-400" />
              </div>
              <div>
                <p className="text-foreground-muted text-sm mb-6">
                  {quizMode === 'full'
                    ? (lang === 'zh' ? '60 道诊断题 · 4 维度 · 每维度 15 题 · 精准定位你的类型' : lang === 'ja' ? '60問の診断 · 4次元 · 各15問 · 正確なタイプ分析' : lang === 'ko' ? '60문항 진단 · 4차원 · 각 15문항 · 정확한 유형 분석' : lang === 'de' ? '60 Diagnosefragen · 4 Dimensionen · je 15 Fragen · Präzise Typenanalyse' : '60 diagnostic questions · 4 dimensions · 15 each · precise type analysis')
                    : t.quizStartDesc
                  }
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6 text-left">
                  {QUIZ_DIMENSIONS.map((dim, i) => (
                    <div key={dim.id} className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-elevated">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: DIMENSION_COLORS[i] + '20' }}>
                        {React.createElement(DIMENSION_ICONS[i], { className: 'w-4 h-4', style: { color: DIMENSION_COLORS[i] } })}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{L(dim.name, lang)}</div>
                        <div className="text-[10px] text-foreground-muted">{L(dim.favorableLabel, lang)} / {L(dim.resistantLabel, lang)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quiz Mode Selector — compact (16) or full (60) */}
              <div className="max-w-md mx-auto mb-6">
                <p className="text-[11px] text-foreground-muted/50 mb-2 px-1">
                  {lang === 'zh' ? '选择测试版本' : lang === 'ja' ? 'テストバージョンを選択' : lang === 'ko' ? '테스트 버전 선택' : lang === 'de' ? 'Testversion wählen' : 'Choose test version'}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* Compact version */}
                  <button
                    type="button"
                    onClick={() => setQuizMode('compact')}
                    className="relative text-left rounded-xl px-4 py-3 border transition-all"
                    style={{
                      borderColor: quizMode === 'compact' ? '#8b5cf6' : 'var(--overlay-10)',
                      backgroundColor: quizMode === 'compact' ? 'rgba(139, 92, 246, 0.1)' : 'var(--surface)',
                      boxShadow: quizMode === 'compact' ? '0 0 0 1px rgba(139, 92, 246, 0.3), 0 2px 8px rgba(139, 92, 246, 0.1)' : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-3.5 h-3.5" style={{ color: quizMode === 'compact' ? '#8b5cf6' : 'var(--foreground-muted)' }} />
                      <span className="text-sm font-semibold" style={{ color: quizMode === 'compact' ? '#8b5cf6' : 'var(--foreground)' }}>
                        {lang === 'zh' ? '精简版' : lang === 'ja' ? '簡易版' : lang === 'ko' ? '간편 버전' : lang === 'de' ? 'Kurzversion' : 'Quick'}
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground-muted leading-tight">
                      {lang === 'zh' ? '16 道题 · 约 3 分钟' : lang === 'ja' ? '16問 · 約3分' : lang === 'ko' ? '16문항 · 약 3분' : lang === 'de' ? '16 Fragen · ~3 Min.' : '16 questions · ~3 min'}
                    </p>
                  </button>

                  {/* Full version */}
                  <button
                    type="button"
                    onClick={() => setQuizMode('full')}
                    className="relative text-left rounded-xl px-4 py-3 border transition-all"
                    style={{
                      borderColor: quizMode === 'full' ? '#f59e0b' : 'var(--overlay-10)',
                      backgroundColor: quizMode === 'full' ? 'rgba(245, 158, 11, 0.1)' : 'var(--surface)',
                      boxShadow: quizMode === 'full' ? '0 0 0 1px rgba(245, 158, 11, 0.3), 0 2px 8px rgba(245, 158, 11, 0.1)' : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-3.5 h-3.5" style={{ color: quizMode === 'full' ? '#f59e0b' : 'var(--foreground-muted)' }} />
                      <span className="text-sm font-semibold" style={{ color: quizMode === 'full' ? '#f59e0b' : 'var(--foreground)' }}>
                        {lang === 'zh' ? '全面版' : lang === 'ja' ? '完全版' : lang === 'ko' ? '전체 버전' : lang === 'de' ? 'Vollversion' : 'Comprehensive'}
                      </span>
                    </div>
                    <p className="text-[11px] text-foreground-muted leading-tight">
                      {lang === 'zh' ? '60 道题 · 约 12 分钟' : lang === 'ja' ? '60問 · 約12分' : lang === 'ko' ? '60문항 · 약 12분' : lang === 'de' ? '60 Fragen · ~12 Min.' : '60 questions · ~12 min'}
                    </p>
                  </button>
                </div>
              </div>

              {/* SOC Occupation Selector — collapsible dropdown */}
              {(() => {
                const selectedGroup = SOC_MAJOR_GROUPS.find(s => s.code === selectedSOC);
                const selectedColor = selectedGroup ? riskColorFromScore(selectedGroup.riskScore) : undefined;
                return (
                  <div className="text-left max-w-md mx-auto">
                    <p className="text-[11px] text-foreground-muted/50 mb-1.5 px-1">{t.selectOccupationHint}</p>
                    {/* Collapsed trigger */}
                    <button
                      type="button"
                      onClick={() => setSOCOpen(prev => { trackPresetPanelToggle(!prev, lang); return !prev; })}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-overlay-8 bg-overlay-2 hover:bg-overlay-4 transition-all text-sm"
                    >
                      {selectedGroup ? (
                        <>
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selectedColor }} />
                          <span className="flex-1 text-left font-medium">{L(selectedGroup.name, lang)}</span>
                          <span className="text-[10px] font-mono tabular-nums" style={{ color: selectedColor + 'cc' }}>{selectedGroup.riskScore}</span>
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 text-foreground-muted/50 flex-shrink-0" />
                          <span className="flex-1 text-left text-foreground-muted">{t.selectOccupation}</span>
                        </>
                      )}
                      <ChevronRight className={`w-4 h-4 text-foreground-muted/40 transition-transform ${socOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Expandable list */}
                    <AnimatePresence initial={false}>
                      {socOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 space-y-0.5 max-h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                            {[...SOC_MAJOR_GROUPS]
                              .sort((a, b) => b.riskScore - a.riskScore)
                              .map((soc) => {
                                const color = riskColorFromScore(soc.riskScore);
                                const isSelected = selectedSOC === soc.code;
                                return (
                                  <button
                                    key={soc.code}
                                    type="button"
                                    onClick={() => { const next = isSelected ? null : soc.code; setSelectedSOC(next); setSOCOpen(false); if (next !== null) trackSOCSelect(soc.code, soc.name.en, lang); }}
                                    className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-all ${
                                      isSelected
                                        ? 'text-white'
                                        : 'hover:bg-overlay-4 text-foreground-muted'
                                    }`}
                                    style={isSelected ? {
                                      backgroundColor: color + '15',
                                      boxShadow: `inset 0 0 0 1px ${color}40`,
                                    } : undefined}
                                  >
                                    <div className="flex-shrink-0 w-10 h-1 rounded-full bg-overlay-6 overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: `${soc.riskScore}%`, backgroundColor: color }} />
                                    </div>
                                    <span className="flex-1 text-left truncate">{L(soc.name, lang)}</span>
                                    <span className="flex-shrink-0 tabular-nums text-[10px] font-mono" style={{ color: color + 'cc' }}>{soc.riskScore}</span>
                                  </button>
                                );
                              })}
                            <button
                              type="button"
                              onClick={() => { setSelectedSOC(null); setSOCOpen(false); }}
                              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs hover:bg-overlay-4 text-foreground-muted/50 transition-all"
                            >
                              <div className="flex-shrink-0 w-10 h-1 rounded-full bg-overlay-6" />
                              <span className="flex-1 text-left">{t.occupationOtherSkip}</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })()}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setPhase('core'); setCoreIndex(0); trackQuizStart(lang); }}
                className="group px-10 py-3.5 rounded-full font-semibold text-white text-base inline-flex items-center gap-2.5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)',
                  boxShadow: '0 0 20px -4px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
                }}
              >
                {t.quizStart}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          )}

          {/* ══════════════ CORE QUESTIONS PHASE ══════════════ */}
          {phase === 'core' && (
            <div ref={questionContainerRef}>
              <QuizProgressBar
                current={coreIndex + 1}
                total={activeQuestionCount}
                phase={t.quizPhaseCore}
                lang={lang}
                t={t}
                theme={theme}
              />

              {/* Dimension badge - changes based on questions per dimension */}
              <DimensionBadge
                icon={DIMENSION_ICONS[currentDimIndex]}
                label={`${t.quizDimension} ${currentDimIndex + 1}: ${L(currentDim.name, lang)}`}
                color={DIMENSION_COLORS[currentDimIndex]}
              />

              <p className="text-xs text-foreground-muted mb-4">{L(currentDim.description, lang)}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCoreQ.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-6">{L(currentCoreQ.question, lang)}</h3>
                  <AxisSlider
                    options={currentCoreQ.options.map(o => L(o, lang))}
                    value={coreAnswers[currentCoreQ.id] ?? null}
                    onChange={handleCoreAnswer}
                    accentColor={DIMENSION_COLORS[currentDimIndex]}
                    leftLabel={L(currentCoreQ.options[0], lang)}
                    rightLabel={L(currentCoreQ.options[4], lang)}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-elevated">
                <button
                  onClick={goBack}
                  disabled={coreIndex === 0}
                  className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.quizPrev}
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: activeQuestionCount }).map((_, i) => {
                    const dimColor = DIMENSION_COLORS[Math.min(Math.floor(i / questionsPerDim), 3)];
                    const isCurrent = i === coreIndex;
                    const isAnswered = !!coreAnswers[activeQuestions[i]?.id];
                    return (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all"
                        style={{
                          backgroundColor: isCurrent ? dimColor : isAnswered ? dimColor + '50' : 'var(--overlay-15)',
                          transform: isCurrent ? 'scale(1.25)' : undefined,
                          boxShadow: isCurrent ? `0 0 6px ${dimColor}80` : undefined,
                        }}
                      />
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    if (coreIndex < activeQuestionCount - 1) {
                      setCoreIndex(coreIndex + 1);
                    }
                  }}
                  disabled={!coreAnswers[activeQuestions[coreIndex]?.id] || coreIndex >= activeQuestionCount - 1}
                  className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  {t.quizNext}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════ RESULT PHASE ══════════════ */}
          {phase === 'result' && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div data-testid="share-result-capture" className="space-y-5">

                {/* ── Unified Result Card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative overflow-hidden rounded-2xl"
                  style={{ border: `1px solid ${riskColor}20` }}
                >
                  {/* Background glow */}
                  <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[120px] opacity-15" style={{ backgroundColor: riskColor }} />

                  <div className="relative z-10 p-6 sm:p-8">
                    {/* Profile code + Name + Risk tier */}
                    <div className="text-center mb-6">
                      <div
                        className="text-3xl sm:text-4xl font-extrabold tracking-[0.2em]"
                        style={{ color: riskColor, fontFamily: 'var(--font-body)' }}
                      >
                        {result.profileCode}
                      </div>
                      <div className="text-lg sm:text-xl font-semibold mt-1.5">{L(result.profile.name, lang)}</div>
                      <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: riskColor }}>
                        {L(RISK_TIER_INFO[result.profile.riskTier].label, lang)}
                      </div>
                    </div>

                    {/* ── 4-Dimension Horizontal Axis Display (the hero) ── */}
                    <div className="space-y-3 mb-6">
                      {result.dimensions.map((dim, i) => {
                        const quizDim = QUIZ_DIMENSIONS[i];
                        const color = DIMENSION_COLORS[i];
                        const Icon = DIMENSION_ICONS[i];
                        // rawAverage 1-5: 1 = fully resistant, 5 = fully favorable
                        // Map to 0-100% where 0% = resistant side, 100% = favorable side
                        const positionPct = ((dim.rawAverage - 1) / 4) * 100;
                        const leftPct = Math.round(100 - positionPct);
                        const rightPct = Math.round(positionPct);

                        return (
                          <motion.div
                            key={dim.dimensionId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.1 }}
                            className="group relative"
                          >
                            <div className="flex items-center gap-3">
                              {/* Letter badge */}
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.25 + i * 0.1, type: 'spring', stiffness: 300 }}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-lg sm:text-xl"
                                style={{
                                  backgroundColor: color + '18',
                                  color,
                                  fontFamily: 'var(--font-body)',
                                }}
                              >
                                {dim.letter}
                              </motion.div>

                              {/* Axis bar area */}
                              <div className="flex-1 min-w-0">
                                {/* Axis labels */}
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-[10px] sm:text-[11px] font-medium ${
                                    !dim.isFavorable ? 'text-emerald-400' : 'text-foreground-muted/50'
                                  }`}>
                                    {L(quizDim.resistantLabel, lang)}
                                  </span>
                                  <span className="text-[10px] text-foreground-muted/40">{L(dim.name, lang)}</span>
                                  <span className={`text-[10px] sm:text-[11px] font-medium ${
                                    dim.isFavorable ? 'text-rose-400' : 'text-foreground-muted/50'
                                  }`}>
                                    {L(quizDim.favorableLabel, lang)}
                                  </span>
                                </div>

                                {/* Horizontal bar — center-out design */}
                                <div className="relative h-2.5">
                                  {/* Bar track */}
                                  <div className="absolute inset-0 rounded-full bg-overlay-6 overflow-hidden">
                                    {/* Filled portion: extends from center (50%) toward the score */}
                                    <motion.div
                                      className="absolute inset-y-0 rounded-full"
                                      style={{
                                        background: positionPct >= 50
                                          ? `linear-gradient(to right, ${color}30, ${color}80)`
                                          : `linear-gradient(to left, ${color}30, ${color}80)`,
                                        left: positionPct >= 50 ? '50%' : undefined,
                                        right: positionPct < 50 ? '50%' : undefined,
                                      }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${Math.abs(positionPct - 50)}%` }}
                                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                                    />
                                  </div>
                                  {/* Center line marker */}
                                  <div
                                    className="absolute top-0 bottom-0 w-px z-[5]"
                                    style={{ left: '50%', backgroundColor: 'var(--foreground-dim)', opacity: 0.4 }}
                                  />
                                  {/* Position indicator dot */}
                                  <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 z-10"
                                    style={{
                                      backgroundColor: color,
                                      borderColor: 'var(--shadow-soft)',
                                      boxShadow: `0 0 8px ${color}60`,
                                    }}
                                    initial={{ left: '50%' }}
                                    animate={{ left: `${positionPct}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                                  />
                                </div>

                                {/* Direction indicator */}
                                <div className="flex items-center justify-center mt-1.5">
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ color, backgroundColor: color + '15' }}>
                                    {dim.isFavorable
                                      ? `→ ${L(quizDim.favorableLabel, lang)} (${rightPct}%)`
                                      : `← ${L(quizDim.resistantLabel, lang)} (${leftPct}%)`
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* ── Metrics strip ── */}
                    {(() => {
                      const probColor = riskColorFromScore(result.replacementProbability);
                      const isInfinity = !isFinite(result.predictedReplacementYear);
                      // Year urgency: sooner = more red, ∞ = green
                      const yearsAway = isInfinity ? 99 : result.predictedReplacementYear - new Date().getFullYear();
                      const yearColor = isInfinity ? '#34d399' : riskColorFromScore(Math.max(0, Math.min(100, 100 - yearsAway * 4)));
                      return (
                        <div className="flex items-center justify-center gap-5 sm:gap-8 py-4 border-t border-b border-overlay-6">
                          <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold" style={{ color: probColor }}>
                              <AnimatedNumber value={result.replacementProbability} suffix="%" />
                            </div>
                            <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-0.5">{t.metric1Title}</div>
                          </div>
                          <div className="w-px h-10 bg-overlay-10" />
                          <div className="text-center">
                            {isInfinity ? (
                              <div className="text-2xl sm:text-3xl font-bold" style={{ color: yearColor }}>∞</div>
                            ) : (
                              <div className="text-2xl sm:text-3xl font-bold" style={{ color: yearColor }}>
                                <AnimatedNumber value={result.predictedReplacementYear} />
                              </div>
                            )}
                            <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-0.5">{t.metric2Title}</div>
                            {isInfinity ? (
                              <div className="text-[10px] text-foreground-muted/40">
                                {lang === 'zh' ? '不可预测' : 'Unpredictable'}
                              </div>
                            ) : (
                              <div className="text-[10px] text-foreground-muted/40 font-mono">
                                {result.confidenceInterval.earliest}–{result.confidenceInterval.latest}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}

                    {/* ── Description ── */}
                    <div className="pt-4">
                      <p className="text-sm text-foreground-muted leading-relaxed">{L(result.profile.description, lang)}</p>
                      {/* Only show occupation if user explicitly selected one */}
                      {result.occupationSOC && !result.occupationSOC.inferred && (() => {
                        const socGroup = SOC_MAJOR_GROUPS.find(s => s.code === result.occupationSOC!.code);
                        const socColor = socGroup ? riskColorFromScore(socGroup.riskScore) : riskColor;
                        return (
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: socColor }} />
                            <span className="text-xs font-semibold">{L(result.occupationSOC!.name, lang)}</span>
                          </div>
                        );
                      })()}
                    </div>

                    {/* ── Vulnerability & Strength Analysis ── */}
                    {(() => {
                      const cal = getProfileCalibration(result.profileCode);
                      if (!cal) return null;
                      return (
                        <div className="pt-4 mt-2 border-t border-overlay-6 space-y-3">
                          {/* Vulnerability */}
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#ff174420' }}>
                                <span className="text-[10px]">⚡</span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[11px] font-bold" style={{ color: '#ff1744' }}>
                                  {lang === 'zh' ? '为什么你容易被替代' : 'Why You\'re Vulnerable'}
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-foreground-muted/55 leading-relaxed mt-0.5">
                                  {L(cal.vulnerabilities, lang)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                          {/* Strength */}
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.65 }}
                          >
                            <div className="flex items-start gap-2.5">
                              <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#34d39920' }}>
                                <span className="text-[10px]">🛡️</span>
                              </div>
                              <div className="min-w-0">
                                <div className="text-[11px] font-bold" style={{ color: '#34d399' }}>
                                  {lang === 'zh' ? '你的防御优势' : 'Your Defense'}
                                </div>
                                <p className="text-[10px] sm:text-[11px] text-foreground-muted/55 leading-relaxed mt-0.5">
                                  {L(cal.strengths, lang)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      );
                    })()}

                    {/* ── Career Path Risk Breakdown ── */}
                    {(() => {
                      const careers = PROFILE_CAREERS[result.profileCode];
                      if (!careers || careers.length === 0) return null;
                      return (
                        <div className="pt-4 mt-2 border-t border-overlay-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted/70">
                              {lang === 'zh' ? '相关职业风险图谱' : 'Career Risk Spectrum'}
                            </h4>
                            <span className="text-[9px] text-foreground-muted/40">
                              {lang === 'zh' ? '风险越高 = 越易被AI替代' : 'Higher risk = easier to replace'}
                            </span>
                          </div>
                          <div className="space-y-2">
                            {careers.map((career, ci) => {
                              const cColor = riskColorFromScore(career.riskScore);
                              return (
                                <motion.div
                                  key={ci}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.5 + ci * 0.06 }}
                                  className="group/career"
                                >
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
                                        <span className="text-xs font-medium truncate">{L(career.title, lang)}</span>
                                      </div>
                                      {/* Risk bar */}
                                      <div className="h-1 rounded-full bg-overlay-6 mt-1 overflow-hidden">
                                        <motion.div
                                          className="h-full rounded-full"
                                          style={{ backgroundColor: cColor }}
                                          initial={{ width: 0 }}
                                          animate={{ width: `${career.riskScore}%` }}
                                          transition={{ duration: 0.6, delay: 0.6 + ci * 0.06 }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Reason - shows on hover */}
                                  <div className="max-h-0 group-hover/career:max-h-16 overflow-hidden transition-all duration-200 ease-out">
                                    <p className="text-[10px] text-foreground-muted/50 leading-relaxed mt-1 ml-[46px]">
                                      {L(career.reason, lang)}
                                    </p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}

                    {/* ── Personalized Advice ── */}
                    {(() => {
                      const adviceList = generateAdvice(result.dimensions);
                      const accentColors = ['#ff1744', '#ffc107', '#34d399', '#448aff', '#e040fb'];
                      return (
                        <div className="pt-5 mt-3 border-t border-overlay-6">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-foreground-muted/70 mb-4 flex items-center gap-2">
                            <span className="inline-block w-4 h-px" style={{ background: 'linear-gradient(90deg, #ff1744, #ffc107, #34d399)' }} />
                            {lang === 'zh' ? '行动建议' : 'Action Plan'}
                            <span className="inline-block flex-1 h-px bg-overlay-6" />
                          </h4>
                          <div className="space-y-0">
                            {adviceList.map((advice, ai) => {
                              const accent = accentColors[ai % accentColors.length];
                              const isFirst = ai === 0;
                              return (
                                <motion.div
                                  key={ai}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.8 + ai * 0.1, type: 'spring', stiffness: 200, damping: 25 }}
                                >
                                  <div className={`relative flex items-start gap-3 py-3.5 ${ai > 0 ? 'border-t border-overlay-4' : ''}`}>
                                    {/* Accent bar + number */}
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
                                        <span className="text-[11px] sm:text-xs font-bold" style={{ color: isFirst ? accent : undefined }}>
                                          {L(advice.title, lang)}
                                        </span>
                                        {isFirst && (
                                          <span
                                            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                            style={{ background: `${accent}20`, color: accent }}
                                          >
                                            {lang === 'zh' ? '首要' : 'Priority'}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] sm:text-[11px] text-foreground-muted/55 leading-relaxed mt-1">
                                        {L(advice.body, lang)}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Reality check footer */}
                  <div className="flex items-start gap-3 px-6 sm:px-8 py-3 bg-overlay-2 border-t border-overlay-4">
                    <Flame className="w-3.5 h-3.5 text-risk-critical flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-foreground-muted/60 leading-relaxed">
                      <span className="font-semibold text-foreground-muted/80">{t.realityCheck}</span>{' '}
                      {t.realityCheckText}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="result-card rounded-xl p-6"
                style={{ borderColor: riskColor + '30', borderWidth: 1 }}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: riskColor + '20' }}>
                    <Share2 className="w-4 h-4" style={{ color: riskColor }} />
                  </div>
                  <div>
                    <h5 className="font-semibold">{t.shareTitle}</h5>
                    <p className="text-xs text-foreground-muted">{t.shareSubtitle}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSharePanelOpen((prev) => { trackSharePanelToggle(!prev); return !prev; })}
                    data-testid="share-trigger"
                    className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-overlay-10 bg-surface-elevated/70 hover:bg-surface-elevated text-sm font-medium transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    {sharePanelOpen ? t.shareClose : t.shareOpen}
                  </motion.button>
                </div>
                <AnimatePresence initial={false}>
                  {sharePanelOpen && (
                    <motion.div
                      key="share-panel"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      data-testid="share-panel"
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadResult} data-testid="share-download-btn" className="flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-brand-primary/20 hover:bg-brand-primary/30 border border-brand-primary/40 text-sm font-semibold text-brand-primary transition-all">
                          <Download className="w-4 h-4" />{t.shareSaveResult ?? 'Save Result'}
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopyLink} data-testid="share-copy-btn" className="flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-overlay-10 text-sm font-medium transition-all">
                          <Copy className="w-4 h-4" />{copied ? t.shareCopied : t.shareCopyLink}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShareTwitter} data-testid="share-twitter-btn" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 text-sm font-medium text-[#1DA1F2] transition-all">
                          <ExternalLink className="w-4 h-4" />{t.shareTwitter}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleCopyForWechat} data-testid="share-wechat-btn" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#07C160]/10 hover:bg-[#07C160]/20 border border-[#07C160]/20 text-sm font-medium text-[#07C160] transition-all">
                          <Copy className="w-4 h-4" />{wechatCopied ? t.shareWeChatCopied : t.shareWeChat}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShareTelegram} data-testid="share-telegram-btn" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/20 text-sm font-medium text-[#229ED9] transition-all">
                          <Send className="w-4 h-4" />
                          {telegramShareState === 'sending' ? t.shareSending : telegramShareState === 'sent' ? t.shareSent : telegramShareState === 'fallback' ? t.shareTelegramFallback : t.shareTelegram}
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleShareWeibo} data-testid="share-weibo-btn" className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#E6162D]/10 hover:bg-[#E6162D]/20 border border-[#E6162D]/20 text-sm font-medium text-[#E6162D] transition-all">
                          <ExternalLink className="w-4 h-4" />{t.shareWeibo}
                        </motion.button>
                      </div>
                      <p className="text-xs text-foreground-muted">{t.shareTelegramHint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Recalculate */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetQuiz}
                className="w-full bg-surface-elevated hover:bg-surface-elevated/80 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-overlay-10"
              >
                <RefreshCw className="w-5 h-5" />
                {t.recalculate}
              </motion.button>
            </motion.div>
          )}
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Error Boundary ──────────────────────────────────────────────────────────
// Catches any runtime errors in the quiz so the user sees a retry button
// instead of the generic Vercel "Application error" page.

class QuizErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.error('Quiz error caught by boundary:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="py-24 px-4 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <p className="text-foreground-muted">Something went wrong. Please try again.</p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.scrollTo({ top: 0 });
              }}
              className="px-6 py-3 bg-surface-elevated hover:bg-surface-elevated/80 rounded-xl font-semibold border border-overlay-10 transition-all"
            >
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SurvivalIndexSectionWithBoundary(props: { lang: Language; t: typeof translations.en; theme?: 'dark' | 'light' }) {
  return (
    <QuizErrorBoundary>
      <SurvivalIndexSection {...props} />
    </QuizErrorBoundary>
  );
}
