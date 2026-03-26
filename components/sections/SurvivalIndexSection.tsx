'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Share2, Download, Copy, ExternalLink,
  ChevronLeft, ChevronRight, Send, Flame, RefreshCw, ArrowRight, Zap,
  Brain, Shield, Users,
} from 'lucide-react';
import html2canvas from 'html2canvas';
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
  const posterCaptureRef = useRef<HTMLDivElement>(null);
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
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
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
      ctx.roundRect(x, y, w, h, r);
    };

    const truncateText = (text: string, maxWidth: number) => {
      if (ctx.measureText(text).width <= maxWidth) return text;
      let trimmed = text;
      while (trimmed.length > 0 && ctx.measureText(`${trimmed}...`).width > maxWidth) {
        trimmed = trimmed.slice(0, -1);
      }
      return `${trimmed}...`;
    };

    const bg = ctx.createLinearGradient(0, 0, 1080, 1920);
    bg.addColorStop(0, '#060a12');
    bg.addColorStop(0.6, '#0c1220');
    bg.addColorStop(1, '#18121f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1080, 1920);

    const captureNode = posterCaptureRef.current;
    if (!captureNode) return null;

    let contentBottom = 1500;
    try {
      const snapshot = await html2canvas(captureNode, {
        backgroundColor: null, scale: 2, useCORS: true, logging: false,
      });
      const drawX = 48, drawY = 42;
      const drawW = 984;
      const drawH = Math.min(1490, (snapshot.height / snapshot.width) * drawW);
      ctx.save();
      roundedRect(drawX, drawY, drawW, drawH, 30);
      ctx.clip();
      ctx.drawImage(snapshot, drawX, drawY, drawW, drawH);
      ctx.restore();
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1.5;
      roundedRect(drawX, drawY, drawW, drawH, 30);
      ctx.stroke();
      contentBottom = drawY + drawH + 20;
    } catch { contentBottom = 1500; }

    const footerY = Math.max(1640, contentBottom);
    const footerH = 230;
    roundedRect(48, footerY, 984, footerH, 28);
    const footerGrad = ctx.createLinearGradient(48, footerY, 1032, footerY + footerH);
    footerGrad.addColorStop(0, 'rgba(255,255,255,0.08)');
    footerGrad.addColorStop(1, 'rgba(255,255,255,0.03)');
    ctx.fillStyle = footerGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.lineWidth = 1.5;
    roundedRect(48, footerY, 984, footerH, 28);
    ctx.stroke();

    const qrSize = 236;
    const qrBox = qrSize + 16;
    const qrX = 48 + 984 - qrBox - 28;
    const qrY = footerY + (footerH - qrBox) / 2;
    roundedRect(qrX, qrY, qrBox, qrBox, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    try {
      const qrDataUrl = await QRCode.toDataURL(shareUrl, {
        errorCorrectionLevel: 'L', margin: 1, width: qrSize,
        color: { dark: '#0c1322', light: '#ffffff' },
      });
      const qrImage = await loadImage(qrDataUrl);
      ctx.drawImage(qrImage, qrX + 8, qrY + 8, qrSize, qrSize);
    } catch {
      ctx.fillStyle = '#0a1020';
      ctx.font = '700 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QR', qrX + qrBox / 2, qrY + qrBox / 2 + 8);
      ctx.textAlign = 'left';
    }

    const shortUrl = shareUrl.replace(/^https?:\/\//, '');
    const textX = 76;
    const textMax = qrX - textX - 16;
    ctx.fillStyle = '#eef2ff';
    ctx.font = '700 52px sans-serif';
    ctx.fillText(lang === 'en' ? 'Calculate your AI risk' : '测测你的 AI 风险', textX, footerY + 78);
    ctx.fillStyle = 'rgba(183,191,210,0.86)';
    ctx.font = '500 33px sans-serif';
    ctx.fillText(lang === 'en' ? 'Scan the QR code to view this page' : '扫码查看结果页', textX, footerY + 124);
    ctx.fillStyle = 'rgba(238,242,255,0.88)';
    ctx.font = '600 28px sans-serif';
    ctx.fillText(truncateText(shortUrl, textMax), textX, footerY + 164);
    ctx.fillStyle = 'rgba(255,255,255,0.42)';
    ctx.font = '500 22px sans-serif';
    ctx.fillText('Generated by AIR', textX, footerY + 200);

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

  const handleDownloadImage = async () => {
    trackShareClick('download_image', lang);
    const blob = await buildShareImageBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'air-risk-poster.png';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  const riskColor = result ? RISK_TIER_INFO[result.profile.riskTier].color : '#fff';

  return (
    <section
      id="risk-calculator"
      data-mobile-section="risk"
      data-lang={lang}
      className="py-12 sm:py-24 px-4 md:px-6 relative overflow-hidden scroll-mt-8 responsive-copy-scope"
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

              {/* Off-screen poster capture node — premium vertical poster */}
              <div
                aria-hidden="true"
                style={{
                  position: 'fixed', left: '-99999px', top: '0', width: '880px',
                  boxSizing: 'border-box',
                  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                }}
              >
                <div
                  ref={posterCaptureRef}
                  style={{
                    position: 'relative', overflow: 'hidden', width: '880px',
                    background: '#06080e', color: '#ccd0e4',
                    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                    /* CSS grid lines via repeating background */
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.07) 49px, rgba(255,255,255,0.07) 50px),' +
                      'repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.07) 49px, rgba(255,255,255,0.07) 50px)',
                    backgroundSize: '50px 50px',
                  }}
                >
                  {/* BG glow orbs */}
                  <div style={{ position: 'absolute', top: '-120px', left: '60px', width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, ${riskColor}18 0%, transparent 65%)`, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '-80px', right: '100px', width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${riskColor}10 0%, transparent 60%)`, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: '40%', left: '35%', width: '350px', height: '350px', borderRadius: '50%', background: `radial-gradient(circle, ${riskColor}0a 0%, transparent 55%)`, pointerEvents: 'none' }} />

                  {/* Top accent line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent 5%, ${riskColor} 35%, ${riskColor}88 65%, transparent 95%)` }} />

                  {/* Content */}
                  <div style={{ position: 'relative', padding: '40px 48px 36px', display: 'flex', flexDirection: 'column' }}>

                    {/* ── Header row ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ fontSize: '44px', fontWeight: 900, letterSpacing: '10px', opacity: 0.72, color: '#ccd0e4' }}>AIR</span>
                        <div style={{ width: '1.5px', height: '32px', background: 'rgba(255,255,255,0.25)' }} />
                        <span style={{ fontSize: '18px', letterSpacing: '3px', opacity: 0.4, color: '#ccd0e4' }}>{lang === 'zh' ? 'AI替代风险指数' : 'AI REPLACEMENT INDEX'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 26px', borderRadius: '100px', border: `1.5px solid ${riskColor}55`, background: `${riskColor}14` }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '5px', background: riskColor }} />
                        <span style={{ fontSize: '17px', fontWeight: 800, color: riskColor, letterSpacing: '2.5px' }}>
                          {lang === 'zh' ? `${L(RISK_TIER_INFO[result.profile.riskTier].label, lang)}` : `${L(RISK_TIER_INFO[result.profile.riskTier].label, lang).replace(' Risk', '').toUpperCase()} RISK`}
                        </span>
                      </div>
                    </div>

                    {/* ── Hero: probability number ── */}
                    <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                      <div style={{ fontSize: '15px', letterSpacing: '4px', opacity: 0.45, fontWeight: 600, marginBottom: '4px', color: '#ccd0e4' }}>
                        {lang === 'zh' ? '替代概率' : 'REPLACEMENT PROBABILITY'}
                      </div>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        {/* Glow behind number */}
                        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '360px', height: '200px', borderRadius: '50%', background: `radial-gradient(ellipse, ${riskColor}20 0%, transparent 70%)`, pointerEvents: 'none' }} />
                        <span style={{ fontSize: '200px', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-8px', color: riskColor, position: 'relative' }}>{result.replacementProbability}</span>
                        <span style={{ fontSize: '64px', fontWeight: 800, color: riskColor, opacity: 0.3, marginLeft: '4px', lineHeight: 0.8, position: 'relative', verticalAlign: 'top' }}>%</span>
                      </div>
                    </div>

                    {/* ── Profile code + type name ── */}
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                      <div style={{ fontSize: '72px', fontWeight: 900, letterSpacing: '0.25em', color: '#ffffff', lineHeight: 1, marginBottom: '8px' }}>
                        {result.profileCode}
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: riskColor, marginBottom: '4px' }}>
                        {L(result.profile.name, lang)}
                      </div>
                      <div style={{ fontSize: '14px', letterSpacing: '2px', opacity: 0.45, color: '#ccd0e4' }}>
                        {L(RISK_TIER_INFO[result.profile.riskTier].label, lang)}
                      </div>
                    </div>

                    {/* ── Dimension squares row ── */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '36px' }}>
                      {result.dimensions.map((dim, i) => {
                        const dimColor = dim.isFavorable ? '#f43f5e' : '#34d399';
                        const dimBorder = dim.isFavorable ? 'rgba(244,63,94,0.35)' : 'rgba(52,211,153,0.35)';
                        const dimBg = dim.isFavorable ? 'rgba(244,63,94,0.1)' : 'rgba(52,211,153,0.1)';
                        const dimLabel = dim.isFavorable ? L(dim.favorableLabel, lang) : L(dim.resistantLabel, lang);
                        return (
                          <div key={dim.dimensionId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px', border: `1.5px solid ${dimBorder}`, background: dimBg }}>
                              <span style={{ fontSize: '36px', fontWeight: 900, color: dimColor }}>{dim.letter}</span>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: dimColor, letterSpacing: '0.5px' }}>{dimLabel}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* ── Data panel: Predicted Year + AI Capability ── */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                      {/* Predicted Year */}
                      <div style={{ flex: 1, padding: '20px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', opacity: 0.45, color: '#ccd0e4', marginBottom: '4px' }}>
                          {lang === 'zh' ? '预测替代年份' : 'PREDICTED YEAR'}
                        </div>
                        <div style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1, color: '#ffffff' }}>
                          {isFinite(result.predictedReplacementYear) ? result.predictedReplacementYear : '∞'}
                        </div>
                        {isFinite(result.predictedReplacementYear) && (
                          <div style={{ fontSize: '13px', opacity: 0.3, marginTop: '4px', color: '#ccd0e4' }}>
                            {result.confidenceInterval.earliest} — {result.confidenceInterval.latest}
                          </div>
                        )}
                      </div>
                      {/* AI Capability */}
                      <div style={{ flex: 1, padding: '20px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.025)' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3px', opacity: 0.45, color: '#ccd0e4', marginBottom: '4px' }}>
                          {lang === 'zh' ? 'AI当前能力' : 'AI CAPABILITY'}
                        </div>
                        <div style={{ fontSize: '56px', fontWeight: 900, lineHeight: 1, color: '#67e8f9' }}>
                          {result.currentAICapability}%
                        </div>
                        <div style={{ marginTop: '8px', width: '100%', height: '6px', borderRadius: '3px', overflow: 'hidden', background: 'rgba(255,255,255,0.04)' }}>
                          <div style={{ width: `${result.currentAICapability}%`, height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, #67e8f9, ${riskColor})` }} />
                        </div>
                      </div>
                    </div>

                    {/* ── Hook: countdown text ── */}
                    <div style={{ padding: '18px 24px', borderRadius: '16px', border: `1px solid ${riskColor}25`, background: `${riskColor}0a`, textAlign: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: riskColor, letterSpacing: '0.5px' }}>
                        {(() => {
                          const yearsLeft = isFinite(result.predictedReplacementYear) ? result.predictedReplacementYear - new Date().getFullYear() : null;
                          return yearsLeft !== null
                            ? (lang === 'zh' ? `距离你被替代还有 ${yearsLeft} 年` : `${yearsLeft} ${yearsLeft === 1 ? 'year' : 'years'} until you're replaced`)
                            : (lang === 'zh' ? `AI 已经能做你 ${result.currentReplacementDegree}% 的工作` : `AI can already do ${result.currentReplacementDegree}% of your job`);
                        })()}
                      </span>
                    </div>

                    {/* ── Percentile bar ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', marginBottom: '24px' }}>
                      <div style={{ flex: 1, height: '6px', borderRadius: '3px', overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
                        <div style={{ width: `${100 - result.replacementProbability}%`, height: '100%', borderRadius: '3px', background: `linear-gradient(90deg, ${riskColor}, #34d399)` }} />
                      </div>
                      <span style={{ fontSize: '16px', fontWeight: 700, opacity: 0.55, color: '#ccd0e4', whiteSpace: 'nowrap' }}>
                        {lang === 'zh' ? `你比 ${100 - result.replacementProbability}% 的测试者更安全` : `Safer than ${100 - result.replacementProbability}% of test takers`}
                      </span>
                    </div>

                    {/* ── Gauge bar ── */}
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', gap: '4px', height: '10px', marginBottom: '6px' }}>
                        {[0, 1, 2, 3, 4].map(i => {
                          const s = i * 20, e = s + 20;
                          const f = result.replacementProbability >= e ? 1 : result.replacementProbability <= s ? 0 : (result.replacementProbability - s) / 20;
                          const barColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
                          return (
                            <div key={i} style={{ flex: 1, borderRadius: '5px', overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
                              <div style={{ width: `${f * 100}%`, height: '100%', borderRadius: '5px', background: barColors[i] }} />
                            </div>
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex' }}>
                        {['SAFE', 'ASSIST', 'AGENT', 'LEAD', 'KILL'].map((s, i) => {
                          const active = i * 20 <= result.replacementProbability && result.replacementProbability < i * 20 + 20;
                          const stageColors = ['#34d399', '#4ade80', '#fbbf24', '#fb923c', '#f43f5e'];
                          return (
                            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                              <span style={{ fontSize: '13px', letterSpacing: '2px', opacity: active ? 1 : 0.35, color: stageColors[i], fontWeight: 800 }}>{s}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* ── CTA + URL ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ padding: '14px 36px', borderRadius: '14px', background: `linear-gradient(135deg, ${riskColor}, ${riskColor}88)` }}>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', letterSpacing: '0.5px' }}>
                          {lang === 'zh' ? '测测你的 AI 替代风险 →' : "What's your AI risk? Take the test →"}
                        </span>
                      </div>
                      <span style={{ fontSize: '15px', opacity: 0.25, letterSpacing: '1.5px', color: '#ccd0e4' }}>air.democra.ai</span>
                    </div>
                  </div>

                  {/* Bottom accent */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent 10%, ${riskColor}25 50%, transparent 90%)` }} />
                </div>
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
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} onClick={handleDownloadImage} data-testid="share-download-btn" className="flex items-center justify-center gap-2 px-3 py-3 rounded-lg bg-brand-primary/20 hover:bg-brand-primary/30 border border-brand-primary/40 text-sm font-semibold text-brand-primary transition-all">
                          <Download className="w-4 h-4" />{t.shareDownload}
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
