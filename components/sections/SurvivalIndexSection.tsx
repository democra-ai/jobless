'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Share2, Download, Copy, ExternalLink,
  ChevronLeft, ChevronRight, Send, Flame, RefreshCw, ArrowRight,
  Brain, Shield, Users,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { Language, translations } from '@/lib/translations';
import { encodeSharePayload } from '@/lib/share_payload';
import {
  QuizAnswer,
  QUIZ_DIMENSIONS,
  ALL_CORE_QUESTIONS,
  CORE_QUESTION_COUNT,
  RISK_TIER_INFO,
  SOC_MAJOR_GROUPS,
} from '@/lib/air_quiz_data';
import { calculateQuizResult, QuizAnswers, QuizResult } from '@/lib/air_quiz_calculator';
import {
  trackQuizStart,
  trackQuizAnswer,
  trackQuizComplete,
  trackShareClick,
  trackQuizAbandon,
} from '@/lib/analytics';

/** Get risk color from a 0-100 risk score */
function riskColorFromScore(score: number): string {
  if (score >= 80) return '#ff1744';   // extreme-high
  if (score >= 60) return '#ff6d00';   // high
  if (score >= 35) return '#ffc107';   // medium
  if (score >= 15) return '#00c853';   // low
  return '#00e676';                    // extreme-low
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
}: {
  current: number;
  total: number;
  phase: string;
  lang: Language;
  t: typeof translations.en;
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
const DIMENSION_COLORS = ['#7c4dff', '#ff6e40', '#64ffda', '#b388ff'];

/** Horizontal axis slider with 5 discrete stops and hover tooltips */
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
  const [touchedStop, setTouchedStop] = useState<number | null>(null);

  const tooltipStop = touchedStop ?? hoveredStop;

  return (
    <div className="pt-2 pb-1">
      {/* Axis track */}
      <div className="relative mx-2 sm:mx-4">
        {/* Tooltip */}
        <AnimatePresence>
          {tooltipStop !== null && (
            <motion.div
              key={tooltipStop}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-2 pointer-events-none z-20"
              style={{
                left: `${((tooltipStop - 1) / 4) * 100}%`,
                transform: 'translate(-50%, -100%)',
                maxWidth: 'min(260px, 80vw)',
              }}
            >
              <div className="bg-surface-elevated border border-white/20 rounded-lg px-3 py-2 text-xs leading-relaxed shadow-xl text-center">
                {options[tooltipStop - 1]}
              </div>
              <div
                className="w-2 h-2 rotate-45 mx-auto -mt-1 border-r border-b border-white/20"
                style={{ backgroundColor: 'var(--surface-elevated)' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Track background */}
        <div className="h-2 bg-surface-elevated rounded-full relative">
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
            return (
              <button
                key={stop}
                type="button"
                className="relative flex items-center justify-center"
                style={{ width: '44px', height: '44px', marginLeft: stop === 1 ? '-22px' : undefined, marginRight: stop === 5 ? '-22px' : undefined }}
                onMouseEnter={() => setHoveredStop(stop)}
                onMouseLeave={() => setHoveredStop(null)}
                onTouchStart={() => setTouchedStop(stop)}
                onTouchEnd={() => { setTimeout(() => setTouchedStop(null), 1500); }}
                onClick={() => onChange(stop as QuizAnswer)}
              >
                <motion.div
                  className="rounded-full border-2 flex items-center justify-center text-xs font-bold transition-colors"
                  style={{
                    width: isSelected ? '28px' : '22px',
                    height: isSelected ? '28px' : '22px',
                    borderColor: isSelected ? accentColor : 'rgba(255,255,255,0.2)',
                    backgroundColor: isSelected ? accentColor : 'var(--surface)',
                    color: isSelected ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                  animate={{
                    scale: isSelected ? 1.1 : 1,
                  }}
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
    </div>
  );
}

// ─── Quiz phases ─────────────────────────────────────────────────────────────

type QuizPhase = 'intro' | 'core' | 'result';

// ─── Main Component ──────────────────────────────────────────────────────────

function SurvivalIndexSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  // Quiz state
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [coreIndex, setCoreIndex] = useState(0); // 0-15

  const [coreAnswers, setCoreAnswers] = useState<Record<string, QuizAnswer>>({});
  const [selectedSOC, setSelectedSOC] = useState<number | null>(null);
  const [socOpen, setSOCOpen] = useState(false);

  const [result, setResult] = useState<QuizResult | null>(null);

  // Share state
  const [copied, setCopied] = useState(false);
  const [wechatCopied, setWechatCopied] = useState(false);
  const [sharePanelOpen, setSharePanelOpen] = useState(false);
  const [telegramShareState, setTelegramShareState] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const posterCaptureRef = useRef<HTMLDivElement>(null);
  const questionContainerRef = useRef<HTMLDivElement>(null);

  // Current core question info
  const currentCoreQ = ALL_CORE_QUESTIONS[coreIndex];
  const currentDimIndex = Math.floor(coreIndex / 4);
  const currentDim = QUIZ_DIMENSIONS[currentDimIndex];

  // ─── Core question handlers ──────────────────────────────────────────────

  const finishQuiz = useCallback((overrideCoreAnswers?: Record<string, QuizAnswer>) => {
    const answers: QuizAnswers = {
      core: overrideCoreAnswers ?? coreAnswers,
      snapshot: {},
      survey: {},
    };
    const quizResult = calculateQuizResult(answers, selectedSOC);
    setResult(quizResult);
    setPhase('result');
    setSharePanelOpen(false);
    setTelegramShareState('idle');
    setCopied(false);
    setWechatCopied(false);
    trackQuizComplete(quizResult, answers, lang);
  }, [coreAnswers, selectedSOC, lang]);

  const handleCoreAnswer = useCallback((answer: QuizAnswer) => {
    const qId = currentCoreQ.id;
    const updatedAnswers = { ...coreAnswers, [qId]: answer };
    setCoreAnswers(updatedAnswers);
    trackQuizAnswer(qId, answer, 'core', coreIndex);
    setTimeout(() => {
      if (coreIndex < CORE_QUESTION_COUNT - 1) {
        setCoreIndex(prev => prev + 1);
      } else {
        finishQuiz(updatedAnswers);
      }
    }, 280);
  }, [coreIndex, currentCoreQ, coreAnswers, finishQuiz]);


  // Go back
  const goBack = useCallback(() => {
    if (phase === 'core' && coreIndex > 0) {
      setCoreIndex(prev => prev - 1);
    }
  }, [phase, coreIndex]);

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
  }, [phase, coreIndex, lang]);

  // ─── Share functionality (preserved from V2) ─────────────────────────────

  const getShareText = () => {
    if (!result) return '';
    const levelText = result.riskLevel === 'very-low' ? (lang === 'en' ? 'Very Low' : '极低') :
      result.riskLevel === 'low' ? (lang === 'en' ? 'Low' : '低') :
      result.riskLevel === 'medium' ? (lang === 'en' ? 'Medium' : '中等') :
      result.riskLevel === 'high' ? (lang === 'en' ? 'High' : '高') :
      (lang === 'en' ? 'Critical' : '极高');
    return t.shareText
      .replace('{level}', levelText)
      .replace('{prob}', String(result.replacementProbability))
      .replace('{year}', String(result.predictedReplacementYear));
  };

  const getShareUrl = () => {
    if (!result) return window.location.href;
    const payload = encodeSharePayload({
      riskLevel: result.riskLevel,
      replacementProbability: result.replacementProbability,
      predictedReplacementYear: result.predictedReplacementYear,
      currentReplacementDegree: result.currentReplacementDegree,
      earliestYear: result.confidenceInterval.earliest,
      latestYear: result.confidenceInterval.latest,
      lang,
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
      className="py-12 sm:py-24 px-4 md:px-6 relative z-30 overflow-hidden scroll-mt-8 responsive-copy-scope"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-white/10">
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
          className="calc-container rounded-3xl p-6 md:p-10 relative"
        >
          {/* ══════════════ INTRO PHASE ══════════════ */}
          {phase === 'intro' && (
            <div className="text-center space-y-6 py-8">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-500/20 via-violet-500/20 to-rose-500/20 flex items-center justify-center border border-white/10">
                <Brain className="w-10 h-10 text-violet-400" />
              </div>
              <div>
                <p className="text-foreground-muted text-sm mb-6">{t.quizStartDesc}</p>
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6 text-left">
                  {QUIZ_DIMENSIONS.map((dim, i) => (
                    <div key={dim.id} className="flex items-center gap-2 p-3 rounded-xl bg-surface border border-surface-elevated">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: DIMENSION_COLORS[i] + '20' }}>
                        {React.createElement(DIMENSION_ICONS[i], { className: 'w-4 h-4', style: { color: DIMENSION_COLORS[i] } })}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{dim.name[lang]}</div>
                        <div className="text-[10px] text-foreground-muted">{dim.favorableLabel[lang]} / {dim.resistantLabel[lang]}</div>
                      </div>
                    </div>
                  ))}
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
                      onClick={() => setSOCOpen(prev => !prev)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all text-sm"
                    >
                      {selectedGroup ? (
                        <>
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: selectedColor }} />
                          <span className="flex-1 text-left font-medium">{selectedGroup.name[lang]}</span>
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
                                    onClick={() => { setSelectedSOC(isSelected ? null : soc.code); setSOCOpen(false); }}
                                    className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs transition-all ${
                                      isSelected
                                        ? 'text-white'
                                        : 'hover:bg-white/[0.04] text-foreground-muted'
                                    }`}
                                    style={isSelected ? {
                                      backgroundColor: color + '15',
                                      boxShadow: `inset 0 0 0 1px ${color}40`,
                                    } : undefined}
                                  >
                                    <div className="flex-shrink-0 w-10 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                      <div className="h-full rounded-full" style={{ width: `${soc.riskScore}%`, backgroundColor: color }} />
                                    </div>
                                    <span className="flex-1 text-left truncate">{soc.name[lang]}</span>
                                    <span className="flex-shrink-0 tabular-nums text-[10px] font-mono" style={{ color: color + 'cc' }}>{soc.riskScore}</span>
                                  </button>
                                );
                              })}
                            <button
                              type="button"
                              onClick={() => { setSelectedSOC(null); setSOCOpen(false); }}
                              className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-xs hover:bg-white/[0.04] text-foreground-muted/50 transition-all"
                            >
                              <div className="flex-shrink-0 w-10 h-1 rounded-full bg-white/[0.06]" />
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
                whileTap={{ scale: 0.98 }}
                onClick={() => { setPhase('core'); setCoreIndex(0); trackQuizStart(lang); }}
                className="calc-btn-primary px-12 py-4 rounded-xl font-semibold text-white text-lg inline-flex items-center gap-3"
              >
                {t.quizStart}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}

          {/* ══════════════ CORE QUESTIONS PHASE ══════════════ */}
          {phase === 'core' && (
            <div ref={questionContainerRef}>
              <QuizProgressBar
                current={coreIndex + 1}
                total={CORE_QUESTION_COUNT}
                phase={t.quizPhaseCore}
                lang={lang}
                t={t}
              />

              {/* Dimension badge - changes every 4 questions */}
              <DimensionBadge
                icon={DIMENSION_ICONS[currentDimIndex]}
                label={`${t.quizDimension} ${currentDimIndex + 1}: ${currentDim.name[lang]}`}
                color={DIMENSION_COLORS[currentDimIndex]}
              />

              <p className="text-xs text-foreground-muted mb-4">{currentDim.description[lang]}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCoreQ.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-6">{currentCoreQ.question[lang]}</h3>
                  <AxisSlider
                    options={currentCoreQ.options.map(o => o[lang])}
                    value={coreAnswers[currentCoreQ.id] ?? null}
                    onChange={handleCoreAnswer}
                    accentColor={DIMENSION_COLORS[currentDimIndex]}
                    leftLabel={currentCoreQ.options[0][lang]}
                    rightLabel={currentCoreQ.options[4][lang]}
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
                  {Array.from({ length: CORE_QUESTION_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === coreIndex ? 'bg-violet-400 scale-125'
                        : coreAnswers[ALL_CORE_QUESTIONS[i].id] ? 'bg-violet-400/40'
                        : 'bg-surface-elevated'
                      }`}
                    />
                  ))}
                </div>
                <div className="w-16" /> {/* spacer for alignment */}
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
                    {/* Name + Risk tier */}
                    <div className="text-center mb-6">
                      <div className="text-lg sm:text-xl font-semibold">{result.profile.name[lang]}</div>
                      <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: riskColor }}>
                        {RISK_TIER_INFO[result.profile.riskTier].label[lang]}
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
                                  fontFamily: 'var(--font-display)',
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
                                    {quizDim.resistantLabel[lang]}
                                  </span>
                                  <span className="text-[10px] text-foreground-muted/40">{dim.name[lang]}</span>
                                  <span className={`text-[10px] sm:text-[11px] font-medium ${
                                    dim.isFavorable ? 'text-rose-400' : 'text-foreground-muted/50'
                                  }`}>
                                    {quizDim.favorableLabel[lang]}
                                  </span>
                                </div>

                                {/* Horizontal bar */}
                                <div className="relative h-2.5">
                                  {/* Bar track */}
                                  <div className="absolute inset-0 rounded-full bg-white/[0.06] overflow-hidden">
                                    {/* Filled portion */}
                                    <motion.div
                                      className="absolute inset-y-0 left-0 rounded-full"
                                      style={{
                                        background: `linear-gradient(to right, ${color}20, ${color}80)`,
                                      }}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${positionPct}%` }}
                                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                                    />
                                  </div>
                                  {/* Position indicator dot (outside overflow) */}
                                  <motion.div
                                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 z-10"
                                    style={{
                                      backgroundColor: color,
                                      borderColor: 'rgba(0,0,0,0.4)',
                                      boxShadow: `0 0 8px ${color}60`,
                                    }}
                                    initial={{ left: '0%' }}
                                    animate={{ left: `${positionPct}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                                  />
                                </div>

                                {/* Hover tooltip - ratio display */}
                                <div className="h-0 overflow-visible">
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between mt-1">
                                    <span className="text-[9px] font-mono text-foreground-muted/50">
                                      {leftPct}%
                                    </span>
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ color, backgroundColor: color + '15' }}>
                                      {dim.isFavorable
                                        ? `→ ${dim.favorableLabel[lang]}`
                                        : `← ${dim.resistantLabel[lang]}`
                                      }
                                    </span>
                                    <span className="text-[9px] font-mono text-foreground-muted/50">
                                      {rightPct}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* ── Metrics strip ── */}
                    <div className="flex items-center justify-center gap-5 sm:gap-8 py-4 border-t border-b border-white/[0.06]">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--risk-critical)' }}>
                          <AnimatedNumber value={result.replacementProbability} suffix="%" />
                        </div>
                        <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-0.5">{t.metric1Title}</div>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--risk-high)' }}>
                          <AnimatedNumber value={result.predictedReplacementYear} />
                        </div>
                        <div className="text-[10px] text-foreground-muted uppercase tracking-wider mt-0.5">{t.metric2Title}</div>
                        <div className="text-[10px] text-foreground-muted/40 font-mono">
                          {result.confidenceInterval.earliest}–{result.confidenceInterval.latest}
                        </div>
                      </div>
                    </div>

                    {/* ── Description + Occupation ── */}
                    <div className="pt-4 space-y-2">
                      <p className="text-sm text-foreground-muted leading-relaxed">{result.profile.description[lang]}</p>
                      {result.occupationSOC && (() => {
                        const socGroup = SOC_MAJOR_GROUPS.find(s => s.code === result.occupationSOC!.code);
                        const socColor = socGroup ? riskColorFromScore(socGroup.riskScore) : riskColor;
                        return (
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: socColor }} />
                            <span className="text-xs font-semibold">{result.occupationSOC!.name[lang]}</span>
                            {result.occupationSOC!.inferred && (
                              <span className="text-[10px] text-foreground-muted/40">({t.occupationInferred})</span>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Reality check footer */}
                  <div className="flex items-start gap-3 px-6 sm:px-8 py-3 bg-white/[0.02] border-t border-white/[0.04]">
                    <Flame className="w-3.5 h-3.5 text-risk-critical flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-foreground-muted/60 leading-relaxed">
                      <span className="font-semibold text-foreground-muted/80">{t.realityCheck}</span>{' '}
                      {t.realityCheckText}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Off-screen poster capture node */}
              <div
                aria-hidden="true"
                style={{
                  position: 'fixed', left: '-99999px', top: '0', width: '880px', padding: '26px',
                  background: 'linear-gradient(145deg, #040811 0%, #0b1020 58%, #1a1320 100%)',
                  borderRadius: '28px', boxSizing: 'border-box', color: '#eef2ff',
                  fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
                }}
              >
                <div ref={posterCaptureRef} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{
                    borderRadius: '20px', border: '1px solid rgba(255,255,255,0.12)',
                    background: 'linear-gradient(90deg, rgba(0,219,255,0.12), rgba(255,61,153,0.1))',
                    padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <span style={{ fontSize: '22px', letterSpacing: '0.6px', fontWeight: 700 }}>AIR</span>
                    <span style={{ fontSize: '16px', opacity: 0.74 }}>{lang === 'en' ? 'AIR Risk Profile' : 'AIR 风险画像'}</span>
                  </div>

                  <div style={{
                    borderRadius: '24px', border: `1.5px solid ${riskColor}66`,
                    background: 'linear-gradient(140deg, rgba(8,14,31,0.9), rgba(14,20,38,0.78))',
                    padding: '24px', textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '12px', letterSpacing: '1.5px', opacity: 0.72 }}>
                      {lang === 'en' ? 'YOUR AIR TYPE' : '你的 AIR 类型'}
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '96px', fontWeight: 800, lineHeight: 1, color: riskColor, letterSpacing: '0.15em' }}>
                      {result.profileCode}
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '36px', fontWeight: 700 }}>
                      {result.profile.name[lang]}
                    </div>
                    <div style={{ marginTop: '8px', fontSize: '20px', opacity: 0.78 }}>
                      {RISK_TIER_INFO[result.profile.riskTier].label[lang]}
                    </div>
                  </div>

                  {[
                    { value: `${result.replacementProbability}%`, label: t.metric1Title, color: '#ff2f67' },
                    { value: `${result.predictedReplacementYear}`, label: t.metric2Title, color: '#ff9e1f' },
                    { value: `${result.currentAICapability}%`, label: t.metric3Title, color: '#57d9ef' },
                  ].map((metric) => (
                    <div key={metric.label} style={{
                      borderRadius: '22px', border: `1.2px solid ${metric.color}66`,
                      background: 'linear-gradient(140deg, rgba(8,14,31,0.9), rgba(14,20,38,0.78))',
                      padding: '20px 24px',
                    }}>
                      <div style={{ fontSize: '62px', fontWeight: 800, lineHeight: 1, color: metric.color }}>{metric.value}</div>
                      <div style={{ marginTop: '8px', fontSize: '38px', fontWeight: 700, lineHeight: 1.1 }}>{metric.label}</div>
                    </div>
                  ))}
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
                    onClick={() => setSharePanelOpen((prev) => !prev)}
                    data-testid="share-trigger"
                    className="ml-auto inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-surface-elevated/70 hover:bg-surface-elevated text-sm font-medium transition-all"
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
                        <motion.button whileTap={{ scale: 0.95 }} onClick={handleCopyLink} data-testid="share-copy-btn" className="flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-lg bg-surface-elevated hover:bg-surface-elevated/80 border border-white/10 text-sm font-medium transition-all">
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
                className="w-full bg-surface-elevated hover:bg-surface-elevated/80 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <RefreshCw className="w-5 h-5" />
                {t.recalculate}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default SurvivalIndexSection;
