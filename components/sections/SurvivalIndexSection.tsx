'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Share2, Download, Copy, ExternalLink,
  ChevronLeft, ChevronRight, Send, Flame, RefreshCw, ArrowRight,
  Brain, Shield, Zap, Users,
} from 'lucide-react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { Language, translations } from '@/lib/translations';
import { encodeSharePayload } from '@/lib/share_payload';
import {
  QuizAnswer,
  QUIZ_DIMENSIONS,
  AI_SNAPSHOT_QUESTIONS,
  SURVEY_QUESTIONS,
  ALL_CORE_QUESTIONS,
  CORE_QUESTION_COUNT,
  SNAPSHOT_QUESTION_COUNT,
  RISK_TIER_INFO,
} from '@/lib/air_quiz_data';
import { calculateQuizResult, QuizAnswers, QuizResult } from '@/lib/air_quiz_calculator';

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

// ─── Quiz phases ─────────────────────────────────────────────────────────────

type QuizPhase = 'intro' | 'core' | 'snapshot' | 'survey' | 'result';

// ─── Main Component ──────────────────────────────────────────────────────────

function SurvivalIndexSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  // Quiz state
  const [phase, setPhase] = useState<QuizPhase>('intro');
  const [coreIndex, setCoreIndex] = useState(0); // 0-15
  const [snapshotIndex, setSnapshotIndex] = useState(0); // 0-3
  const [surveyIndex, setSurveyIndex] = useState(0); // 0-2

  const [coreAnswers, setCoreAnswers] = useState<Record<string, QuizAnswer>>({});
  const [snapshotAnswers, setSnapshotAnswers] = useState<Record<string, QuizAnswer>>({});
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, number>>({});

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

  const handleCoreAnswer = useCallback((answer: QuizAnswer) => {
    const qId = currentCoreQ.id;
    setCoreAnswers(prev => ({ ...prev, [qId]: answer }));
    // Auto-advance after brief delay
    setTimeout(() => {
      if (coreIndex < CORE_QUESTION_COUNT - 1) {
        setCoreIndex(prev => prev + 1);
      } else {
        setPhase('snapshot');
        setSnapshotIndex(0);
      }
    }, 280);
  }, [coreIndex, currentCoreQ]);

  const handleSnapshotAnswer = useCallback((answer: QuizAnswer) => {
    const qId = AI_SNAPSHOT_QUESTIONS[snapshotIndex].id;
    setSnapshotAnswers(prev => ({ ...prev, [qId]: answer }));
    setTimeout(() => {
      if (snapshotIndex < SNAPSHOT_QUESTION_COUNT - 1) {
        setSnapshotIndex(prev => prev + 1);
      } else {
        setPhase('survey');
        setSurveyIndex(0);
      }
    }, 280);
  }, [snapshotIndex]);

  const handleSurveyAnswer = useCallback((optionIndex: number) => {
    const qId = SURVEY_QUESTIONS[surveyIndex].id;
    setSurveyAnswers(prev => ({ ...prev, [qId]: optionIndex }));
    setTimeout(() => {
      if (surveyIndex < SURVEY_QUESTIONS.length - 1) {
        setSurveyIndex(prev => prev + 1);
      } else {
        finishQuiz();
      }
    }, 280);
  }, [surveyIndex]);

  const finishQuiz = useCallback(() => {
    const answers: QuizAnswers = {
      core: coreAnswers,
      snapshot: snapshotAnswers,
      survey: surveyAnswers,
    };
    const quizResult = calculateQuizResult(answers);
    setResult(quizResult);
    setPhase('result');
    setSharePanelOpen(false);
    setTelegramShareState('idle');
    setCopied(false);
    setWechatCopied(false);
  }, [coreAnswers, snapshotAnswers, surveyAnswers]);

  const skipSurvey = useCallback(() => {
    finishQuiz();
  }, [finishQuiz]);

  // Go back
  const goBack = useCallback(() => {
    if (phase === 'core' && coreIndex > 0) {
      setCoreIndex(prev => prev - 1);
    } else if (phase === 'snapshot' && snapshotIndex > 0) {
      setSnapshotIndex(prev => prev - 1);
    } else if (phase === 'snapshot' && snapshotIndex === 0) {
      setPhase('core');
      setCoreIndex(CORE_QUESTION_COUNT - 1);
    } else if (phase === 'survey' && surveyIndex > 0) {
      setSurveyIndex(prev => prev - 1);
    } else if (phase === 'survey' && surveyIndex === 0) {
      setPhase('snapshot');
      setSnapshotIndex(SNAPSHOT_QUESTION_COUNT - 1);
    }
  }, [phase, coreIndex, snapshotIndex, surveyIndex]);

  // Reset
  const resetQuiz = useCallback(() => {
    setPhase('intro');
    setCoreIndex(0);
    setSnapshotIndex(0);
    setSurveyIndex(0);
    setCoreAnswers({});
    setSnapshotAnswers({});
    setSurveyAnswers({});
    setResult(null);
    setSharePanelOpen(false);
  }, []);

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
    const ok = await copyText(getShareUrl());
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyForWechat = async () => {
    const ok = await copyText(getShareText() + '\n' + getShareUrl());
    if (!ok) return;
    setWechatCopied(true);
    setTimeout(() => setWechatCopied(false), 3000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://x.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const handleShareWeibo = () => {
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
                <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-8 text-left">
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setPhase('core'); setCoreIndex(0); }}
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
                  <h3 className="text-lg sm:text-xl font-bold mb-5">{currentCoreQ.question[lang]}</h3>
                  <div className="space-y-2.5">
                    {currentCoreQ.options.map((opt, idx) => {
                      const score = (idx + 1) as QuizAnswer;
                      const isSelected = coreAnswers[currentCoreQ.id] === score;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleCoreAnswer(score)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'border-violet-400/60 bg-violet-500/15 text-white'
                              : 'border-surface-elevated bg-surface hover:bg-surface-elevated/70 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                              isSelected
                                ? 'border-violet-400 bg-violet-500 text-white'
                                : 'border-white/20 text-foreground-muted'
                            }`}>
                              {score}
                            </span>
                            <span className="text-sm leading-relaxed">{opt[lang]}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
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

          {/* ══════════════ SNAPSHOT PHASE ══════════════ */}
          {phase === 'snapshot' && (
            <div>
              <QuizProgressBar
                current={snapshotIndex + 1}
                total={SNAPSHOT_QUESTION_COUNT}
                phase={t.quizPhaseSnapshot}
                lang={lang}
                t={t}
              />

              <DimensionBadge icon={Zap} label={t.quizPhaseSnapshot} color="#ff9e1f" />
              <p className="text-xs text-foreground-muted mb-4">{t.quizSnapshotIntro}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={AI_SNAPSHOT_QUESTIONS[snapshotIndex].id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-5">
                    {AI_SNAPSHOT_QUESTIONS[snapshotIndex].question[lang]}
                  </h3>
                  <div className="space-y-2.5">
                    {AI_SNAPSHOT_QUESTIONS[snapshotIndex].options.map((opt, idx) => {
                      const score = (idx + 1) as QuizAnswer;
                      const isSelected = snapshotAnswers[AI_SNAPSHOT_QUESTIONS[snapshotIndex].id] === score;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSnapshotAnswer(score)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'border-amber-400/60 bg-amber-500/15 text-white'
                              : 'border-surface-elevated bg-surface hover:bg-surface-elevated/70 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                              isSelected
                                ? 'border-amber-400 bg-amber-500 text-white'
                                : 'border-white/20 text-foreground-muted'
                            }`}>
                              {score}
                            </span>
                            <span className="text-sm leading-relaxed">{opt[lang]}</span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-elevated">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.quizPrev}
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: SNAPSHOT_QUESTION_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === snapshotIndex ? 'bg-amber-400 scale-125'
                        : snapshotAnswers[AI_SNAPSHOT_QUESTIONS[i].id] ? 'bg-amber-400/40'
                        : 'bg-surface-elevated'
                      }`}
                    />
                  ))}
                </div>
                <div className="w-16" />
              </div>
            </div>
          )}

          {/* ══════════════ SURVEY PHASE ══════════════ */}
          {phase === 'survey' && (
            <div>
              <QuizProgressBar
                current={surveyIndex + 1}
                total={SURVEY_QUESTIONS.length}
                phase={t.quizPhaseSurvey}
                lang={lang}
                t={t}
              />

              <p className="text-xs text-foreground-muted mb-4">{t.quizSurveyIntro}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={SURVEY_QUESTIONS[surveyIndex].id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-5">
                    {SURVEY_QUESTIONS[surveyIndex].question[lang]}
                  </h3>
                  <div className="space-y-2.5">
                    {SURVEY_QUESTIONS[surveyIndex].options.map((opt, idx) => {
                      const isSelected = surveyAnswers[SURVEY_QUESTIONS[surveyIndex].id] === idx;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleSurveyAnswer(idx)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            isSelected
                              ? 'border-emerald-400/60 bg-emerald-500/15 text-white'
                              : 'border-surface-elevated bg-surface hover:bg-surface-elevated/70 hover:border-white/20'
                          }`}
                        >
                          <span className="text-sm">{opt[lang]}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-elevated">
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t.quizPrev}
                </button>
                <button
                  onClick={skipSurvey}
                  className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-all"
                >
                  {t.quizSurveySkip}
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
              <div data-testid="share-result-capture" className="space-y-6">

                {/* Profile Type Display */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="result-card rounded-2xl p-8 text-center relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ background: `linear-gradient(90deg, ${riskColor}, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div className="text-sm text-foreground-muted uppercase tracking-wider mb-2">{t.yourType}</div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="text-5xl sm:text-7xl md:text-8xl font-bold mb-2 tracking-widest"
                      style={{ color: riskColor, fontFamily: 'var(--font-display)' }}
                    >
                      {result.profileCode}
                    </motion.div>
                    <div className="text-xl sm:text-2xl font-semibold mb-2">{result.profile.name[lang]}</div>
                    <div className="text-sm text-foreground-muted max-w-lg mx-auto">{result.profile.description[lang]}</div>
                  </div>
                </motion.div>

                {/* Risk Level */}
                <div className="result-card rounded-xl p-5 text-center">
                  <div className="text-sm text-foreground-muted uppercase tracking-wider mb-1">{t.riskLevel}</div>
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: riskColor }}>
                    {RISK_TIER_INFO[result.profile.riskTier].label[lang]}
                  </div>
                  <div className="text-xs text-foreground-muted mt-1">
                    {result.favorableCount}/4 {lang === 'en' ? 'dimensions favor AI' : '个维度利于AI替代'}
                  </div>
                </div>

                {/* Three Metrics */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="result-card rounded-xl p-6 text-center group hover-lift"
                  >
                    <div className="metric-value text-3xl sm:text-4xl md:text-5xl mb-2" style={{ color: 'var(--risk-critical)' }}>
                      <AnimatedNumber value={result.replacementProbability} suffix="%" />
                    </div>
                    <div className="text-xs text-foreground-muted uppercase tracking-wider">{t.metric1Title}</div>
                    <div className="text-xs text-foreground-muted/60 mt-1">{t.metric1Desc}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="result-card rounded-xl p-6 text-center group hover-lift"
                  >
                    <div className="metric-value text-3xl sm:text-4xl md:text-5xl mb-2" style={{ color: 'var(--risk-high)' }}>
                      <AnimatedNumber value={result.predictedReplacementYear} />
                    </div>
                    <div className="text-xs text-foreground-muted uppercase tracking-wider">{t.metric2Title}</div>
                    <div className="text-xs text-foreground-muted/60 mt-1">{lang === 'en' ? 'Projected' : '预计年份'}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="result-card rounded-xl p-6 text-center group hover-lift"
                  >
                    <div className="metric-value text-3xl sm:text-4xl md:text-5xl mb-2" style={{ color: 'var(--brand-primary)' }}>
                      <AnimatedNumber value={result.currentAICapability} suffix="%" />
                    </div>
                    <div className="text-xs text-foreground-muted uppercase tracking-wider">{t.metric3Title}</div>
                    <div className="text-xs text-foreground-muted/60 mt-1">{t.metric3Desc}</div>
                  </motion.div>
                </div>

                {/* Confidence Interval */}
                <div className="result-card rounded-xl p-4 flex items-center justify-between">
                  <span className="text-sm text-foreground-muted">{t.yearRange}</span>
                  <span className="font-mono font-bold text-lg">
                    {result.confidenceInterval.earliest} — {result.confidenceInterval.latest}
                  </span>
                </div>

                {/* Dimension Breakdown */}
                <div className="result-card rounded-xl p-6">
                  <h5 className="font-semibold mb-4">{t.dimensionBreakdown}</h5>
                  <div className="space-y-3">
                    {result.dimensions.map((dim, i) => {
                      const pct = ((dim.rawAverage - 1) / 4) * 100;
                      const color = DIMENSION_COLORS[i];
                      return (
                        <div key={dim.dimensionId}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <div className="flex items-center gap-2">
                              {React.createElement(DIMENSION_ICONS[i], { className: 'w-4 h-4', style: { color } })}
                              <span>{dim.name[lang]}</span>
                            </div>
                            <span className={`font-bold text-xs px-2 py-0.5 rounded-full ${
                              dim.isFavorable
                                ? 'bg-rose-500/20 text-rose-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {dim.letter} — {dim.isFavorable ? dim.favorableLabel[lang] : dim.resistantLabel[lang]}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-surface-elevated rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-foreground-muted mt-0.5">
                            <span>{QUIZ_DIMENSIONS[i].resistantLabel[lang]}</span>
                            <span>{QUIZ_DIMENSIONS[i].favorableLabel[lang]}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Typical Jobs */}
                <div className="result-card rounded-xl p-6">
                  <h5 className="font-semibold mb-2">{t.typicalJobs}</h5>
                  <p className="text-sm text-foreground-muted leading-relaxed">{result.profile.typicalJobs[lang]}</p>
                </div>

                {/* Reality Check */}
                <div className="rounded-xl p-5 bg-gradient-to-r from-risk-critical/10 to-risk-high/10 border border-risk-critical/20">
                  <p className="text-sm">
                    <Flame className="w-5 h-5 inline text-risk-critical mr-2 align-middle" />
                    <span className="font-semibold text-foreground">{t.realityCheck}</span>
                  </p>
                  <p className="text-sm text-foreground-muted mt-2 leading-relaxed">{t.realityCheckText}</p>
                </div>
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
