'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Skull, Info, ChevronDown, Cpu, Bot, Sparkles } from 'lucide-react';
import { Language, translations } from '@/lib/translations';
import Counter from '@/components/Counter';

// 核心数据
export const CURRENT_REPLACEMENT_RATE = 21.37;

// 五阶段模型（按暴露度分档：<20%, 20-40%, 40-60%, 60-80%, ≥80%）
export const KILL_LINE_STAGES = [
  {
    id: 1, start: 0, end: 20,
    label: { en: 'AI Assist', zh: 'AI 辅助' },
    desc: { en: 'Speeds you up', zh: '帮你加速' },
    nature: { en: 'You lead, AI executes', zh: '你主导，AI 执行' },
    color: 'var(--risk-low)',
    tooltip: {
      en: {
        definition: 'AI handles the grunt work — repetitive, low-value tasks you don\'t want to do. It makes you faster and frees up your time for what matters.',
        control: 'You decide everything. AI is a tool that follows instructions.',
        relationship: 'You are the decision-maker. AI is your assistant — it does what you tell it to do.',
        coreNature: 'Speed boost',
      },
      zh: {
        definition: 'AI帮你处理杂活——重复性、低价值、你不愿意干的事。让你更快、把时间留给更重要的事。',
        control: '你完全主导，AI只是听指令的工具。',
        relationship: '你是决策者，AI是你的助手——你说什么它做什么。',
        coreNature: '加速工具',
      },
    },
  },
  {
    id: 2, start: 20, end: 40,
    label: { en: 'AI Augment', zh: 'AI 增强' },
    desc: { en: 'Enhances your ability', zh: '增强个人能力' },
    nature: { en: 'You lead, AI elevates you', zh: '你主导，AI 提升你' },
    color: 'var(--risk-medium)',
    tooltip: {
      en: {
        definition: 'AI gives you suggestions, organizes your thinking, answers questions, and strengthens your logic. It enhances your personal capability and overall work performance.',
        control: 'You lead. AI amplifies what you can do.',
        relationship: 'You are still in charge. AI is your thinking partner — it makes you better at what you do.',
        coreNature: 'Capability amplifier',
      },
      zh: {
        definition: 'AI能给你建议、帮你整理思路和逻辑、回答你的问题。它增强你的个人能力，全面提升工作表现。',
        control: '你主导，AI增强你的能力。',
        relationship: '你仍然掌控全局，AI是你的思考搭档——让你的工作表现更强。',
        coreNature: '能力放大器',
      },
    },
  },
  {
    id: 3, start: 40, end: 60,
    label: { en: 'AI Agent', zh: 'AI 代理' },
    desc: { en: 'You direct, AI works', zh: '你指挥，AI 干活' },
    nature: { en: 'Human-led, AI executes', zh: '人主导，AI 执行' },
    color: 'var(--risk-high)',
    tooltip: {
      en: {
        definition: 'AI takes on entire tasks under your direction — like today\'s coding agents. You assign the task and supervise. AI does the actual work.',
        control: 'You set goals and review results. AI handles execution end-to-end.',
        relationship: 'You are the boss, AI is the worker. You give directions and check results; AI handles the doing.',
        coreNature: 'Execution delegation',
      },
      zh: {
        definition: 'AI负责执行完整任务，你负责指定任务——就像现在的 Coding Agent。你监督AI做事，AI是干活的，你来把关。',
        control: '你设定目标、审核结果。AI负责端到端执行。',
        relationship: '你是老板，AI是执行者。你定方向、看结果，AI负责具体干活。',
        coreNature: '执行权转移',
      },
    },
  },
  {
    id: 4, start: 60, end: 80,
    label: { en: 'AI Lead', zh: 'AI 主导' },
    desc: { en: 'AI leads, you support', zh: 'AI 主导，你配合' },
    nature: { en: 'AI-led, human supports', zh: 'AI 主导，人配合' },
    color: 'var(--risk-critical)',
    tooltip: {
      en: {
        definition: 'AI drives the work. It sets direction, makes decisions, and delivers outcomes. You provide permissions, handle edge cases, or review final deliverables.',
        control: 'AI leads. You support with approvals, resources, or final review.',
        relationship: 'AI is the lead, you are the support. AI makes decisions and drives delivery; you approve, provide resources, or do final review.',
        coreNature: 'Decision authority transfer',
      },
      zh: {
        definition: 'AI主导干活——制定方向、做决策、推动交付。你只需要配合：提供执行权限，或者只关注AI的交付结果做最终审核。',
        control: 'AI主导，你配合审批、提供资源、做最终审核。',
        relationship: 'AI是主导者，你是配合者。AI做决策、推进交付，你负责授权和最终审核。',
        coreNature: '决策权转移',
      },
    },
  },
  {
    id: 5, start: 80, end: 100,
    label: { en: 'Kill Line', zh: '斩杀线' },
    desc: { en: 'Full replacement', zh: '完全替代' },
    nature: { en: 'AI fully autonomous', zh: 'AI 完全自主' },
    color: 'var(--risk-critical)',
    isKillLine: true,
    tooltip: {
      en: {
        definition: 'AI can fully handle the job on its own. No human participation needed. It autonomously performs the entire role — from decision to execution to delivery.',
        control: 'AI operates independently. Humans are structurally unnecessary.',
        relationship: 'There is no human in the loop. AI owns the entire role — the position no longer requires a person.',
        coreNature: 'Structural replacement',
      },
      zh: {
        definition: 'AI已经可以完全替代这项工作。不需要人参与，AI自主胜任整个岗位——从决策到执行到交付。',
        control: 'AI完全自主运行，人类在结构上不再是必要角色。',
        relationship: '不再有人类参与。AI独立承担整个岗位——这个职位不再需要人。',
        coreNature: '结构性替代',
      },
    },
  },
];

// 技术标签组件
function TechTag({ tech, lang }: { tech: string; lang: Language }) {
  const techLabels: Record<string, { en: string; zh: string; color: string }> = {
    LLM: { en: 'LLM', zh: '大语言模型', color: 'bg-purple-500' },
    Agent: { en: 'Agent', zh: '智能体', color: 'bg-blue-500' },
    Skills: { en: 'Skills', zh: '技能', color: 'bg-green-500' },
  };

  const label = techLabels[tech] || { en: tech, zh: tech, color: 'bg-gray-500' };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${label.color} text-white`}>
      {tech === 'LLM' && <Cpu className="w-3 h-3" />}
      {tech === 'Agent' && <Bot className="w-3 h-3" />}
      {tech === 'Skills' && <Sparkles className="w-3 h-3" />}
      <span>{label[lang]}</span>
    </span>
  );
}

// AI 斩杀线进度条
function AIKillLineBar({ lang, t }: { lang: Language; t: typeof translations.en }) {
  const maxPct = 100;
  const basePct = CURRENT_REPLACEMENT_RATE;
  const [displayPct, setDisplayPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const chipScrollRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    const duration = 2000;
    const fps = 60;
    const total = (duration / 1000) * fps;
    let f = 0;
    const id = setInterval(() => {
      f++;
      setDisplayPct((1 - Math.pow(1 - f / total, 3)) * basePct);
      if (f >= total) { clearInterval(id); setDisplayPct(basePct); setReady(true); }
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [basePct]);

  const handleSelectStage = (id: number) => {
    const next = activeTooltip === id ? null : id;
    setActiveTooltip(next);
    if (next !== null) {
      requestAnimationFrame(() => {
        chipRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    }
  };

  const w = (displayPct / maxPct) * 100;
  const activeStage = KILL_LINE_STAGES.find(s => displayPct >= s.start && displayPct < s.end) || KILL_LINE_STAGES[KILL_LINE_STAGES.length - 1];

  return (
    <div className="mb-8" style={{ overflow: 'visible' }}>
      {/* Centered hero stat */}
      <div className="text-center mb-6 relative">
        <div className="relative inline-block">
          <div
            className="text-5xl sm:text-6xl md:text-7xl font-bold mono"
            style={{
              fontVariantNumeric: 'tabular-nums',
              color: 'var(--risk-critical)',
            }}
          >
            <Counter end={CURRENT_REPLACEMENT_RATE} suffix="%" />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="text-sm sm:text-base text-foreground-muted">{t.killLineLabel}</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-risk-critical" />
            <span className="text-xs sm:text-sm mono font-bold text-risk-critical">{t.killLineSpeed}</span>
          </div>
          <div
            className="relative inline-flex items-center justify-center"
            onClick={() => setShowCalc(!showCalc)}
            onMouseEnter={() => setShowCalc(true)}
            onMouseLeave={() => setShowCalc(false)}
          >
            <span
              className="inline-flex items-center justify-center cursor-pointer transition-opacity text-foreground-muted hover:text-foreground min-w-[44px] min-h-[44px]"
              style={{ opacity: showCalc ? 1 : 0.5 }}
            >
              <Info className="w-4 h-4" />
            </span>
            {/* Calculation popup */}
            <AnimatePresence>
              {showCalc && (
                <>
                  {/* Desktop/Tablet popup */}
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="hidden sm:block absolute top-full right-0 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 mt-3 z-[120] w-[calc(100vw-2rem)] max-w-[400px] rounded-xl border border-surface-elevated/50 p-4 sm:p-5 text-left"
                    style={{
                      background: 'var(--surface-card)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(16px)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center mb-4 py-3 rounded-lg" style={{ background: 'var(--surface-elevated)' }}>
                      <span className="mono text-sm font-bold text-foreground">{t.killLineFormula}</span>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center bg-risk-medium/20 text-risk-medium text-xs font-bold mt-0.5">E</div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{t.killLineExposure}</div>
                          <div className="text-xs text-foreground-muted leading-relaxed">{t.killLineExposureDesc}</div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center bg-risk-high/20 text-risk-high text-xs font-bold mt-0.5">P</div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{t.killLineProbability}</div>
                          <div className="text-xs text-foreground-muted leading-relaxed">{t.killLineProbabilityDesc}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-foreground-dim leading-relaxed p-3 rounded-lg mb-2" style={{ background: 'var(--surface-elevated)', borderLeft: '2px solid var(--risk-high)' }}>
                      {t.killLineExample}
                    </div>
                    <div className="text-center mb-2 py-2 px-3 rounded-lg" style={{ background: 'var(--surface-elevated)' }}>
                      <span className="mono text-[11px] font-bold text-foreground-muted">{t.killLineAggregation}</span>
                    </div>
                    <div className="text-[11px] text-foreground-dim text-center">
                      {t.killLineSource}
                    </div>
                  </motion.div>

                  {/* Mobile: compact bottom sheet */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="sm:hidden fixed inset-0 z-[130]"
                  >
                    <button
                      type="button"
                      aria-label={lang === 'zh' ? '关闭说明' : 'Close explanation'}
                      onClick={() => setShowCalc(false)}
                      className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
                    />
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', stiffness: 280, damping: 34 }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute inset-x-0 bottom-0 rounded-t-3xl border px-4 pt-3 pb-4"
                      style={{
                        background: 'var(--surface-card)',
                        borderColor: 'var(--surface-elevated)',
                        boxShadow: '0 -20px 40px rgba(0,0,0,0.45)',
                        paddingBottom: 'calc(1rem + var(--safe-bottom))',
                      }}
                    >
                      <div className="w-12 h-1 rounded-full mx-auto mb-3" style={{ background: 'var(--foreground-dim)' }} />
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-bold text-foreground">{t.killLineHow}</span>
                        <button
                          type="button"
                          onClick={() => setShowCalc(false)}
                          className="min-h-[36px] px-3 rounded-lg text-xs font-semibold"
                          style={{ background: 'var(--surface-elevated)', color: 'var(--foreground-muted)' }}
                        >
                          {lang === 'zh' ? '关闭' : 'Close'}
                        </button>
                      </div>

                      <div className="text-center mb-3 py-2.5 rounded-lg" style={{ background: 'var(--surface-elevated)' }}>
                        <span className="mono text-xs font-bold text-foreground">{t.killLineFormula}</span>
                      </div>

                      <div className="space-y-2.5 mb-3 text-left">
                        <div className="p-2.5 rounded-lg border border-risk-medium/25 bg-risk-medium/8">
                          <div className="text-xs font-semibold text-risk-medium mb-1">E · {t.killLineExposure}</div>
                          <div className="text-[11px] leading-relaxed text-foreground-muted">{t.killLineExposureDesc}</div>
                        </div>
                        <div className="p-2.5 rounded-lg border border-risk-high/25 bg-risk-high/8">
                          <div className="text-xs font-semibold text-risk-high mb-1">P · {t.killLineProbability}</div>
                          <div className="text-[11px] leading-relaxed text-foreground-muted">{t.killLineProbabilityDesc}</div>
                        </div>
                      </div>

                      <div className="text-[11px] text-foreground-dim leading-relaxed p-2.5 rounded-lg mb-2" style={{ background: 'var(--surface-elevated)' }}>
                        {t.killLineExample}
                      </div>
                      <div className="text-center py-2 px-3 rounded-lg mb-1" style={{ background: 'var(--surface-elevated)' }}>
                        <span className="mono text-[10px] font-bold text-foreground-muted">{t.killLineAggregation}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Segmented Bar — outer allows overflow for labels, inner clips bar content */}
      <div className="relative h-10 sm:h-12 mt-6">
        <div className="absolute inset-0 rounded-xl overflow-hidden bar-track">
        {/* Stage 1–4 divider lines */}
        {KILL_LINE_STAGES.filter(s => s.id < 5).map((stage) => {
          const left = (stage.start / maxPct) * 100;
          const width = ((stage.end - stage.start) / maxPct) * 100;
          return (
            <div
              key={stage.id}
              className="absolute top-0 bottom-0"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                borderRight: '1px solid var(--bar-divider)',
              }}
            />
          );
        })}

        {/* Stage 5 — KILL ZONE: completely different visual language */}
        <div
          className="absolute top-0 bottom-0 kill-zone-hazard"
          style={{ left: '80%', width: '20%' }}
        >
          {/* Industrial hazard stripes */}
          <div className="absolute inset-0 kill-zone-stripes" />
          {/* Red gradient undertone */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(90deg, rgba(255,23,68,0.12) 0%, rgba(255,23,68,0.25) 100%)',
          }} />
          {/* Glitch watermark text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="kill-zone-glitch-text" data-text={lang === 'zh' ? 'KILL LINE' : 'KILL LINE'}>
              {lang === 'zh' ? 'KILL LINE' : 'KILL LINE'}
            </span>
          </div>
        </div>

        {/* Kill Line boundary wall at 80% */}
        <motion.div
          className="absolute top-0 bottom-0 z-[5] pointer-events-none"
          style={{ left: '80%' }}
          animate={{
            boxShadow: [
              '0 0 6px 1px rgba(255,23,68,0.5)',
              '0 0 18px 4px rgba(255,23,68,0.8)',
              '0 0 6px 1px rgba(255,23,68,0.5)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-y-0 w-[2px] -ml-[1px]" style={{
            background: 'var(--risk-critical)',
          }} />
        </motion.div>

        {/* Unfilled area — marching stripes */}
        <div className="absolute inset-0 rounded-xl bar-march-stripes" />

        {/* Active stage full-block highlight (rendered for ALL stages, even unfilled) */}
        <AnimatePresence>
          {activeTooltip !== null && (() => {
            const hl = KILL_LINE_STAGES.find(s => s.id === activeTooltip);
            if (!hl) return null;
            const hlLeft = (hl.start / maxPct) * 100;
            const hlWidth = ((hl.end - hl.start) / maxPct) * 100;
            return (
              <motion.div
                key={`hl-${hl.id}`}
                className="absolute top-0 bottom-0 z-[3] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  left: `${hlLeft}%`,
                  width: `${hlWidth}%`,
                  background: hl.color,
                  opacity: 0.35,
                }}
              >
                {/* Glass highlight on top */}
                <div className="absolute inset-x-0 top-0 h-[40%]" style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                }} />
                {/* Skull icon for Kill Line stage */}
                {hl.id === 5 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skull className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 drop-shadow-[0_0_6px_rgba(255,23,68,0.8)]" />
                  </div>
                )}
              </motion.div>
            );
          })()}
        </AnimatePresence>

        {/* Filled area */}
        <div className="absolute inset-y-0 left-0 rounded-l-xl overflow-hidden" style={{ width: `${w}%` }}>
          {/* Per-stage color fill */}
          {KILL_LINE_STAGES.map((stage) => {
            if (stage.start >= displayPct) return null;
            const fillEnd = Math.min(stage.end, displayPct);
            const segLeft = (stage.start / displayPct) * 100;
            const segWidth = ((fillEnd - stage.start) / displayPct) * 100;
            const hasSomeActive = activeTooltip !== null;
            return (
              <div
                key={stage.id}
                className="absolute top-0 bottom-0 transition-opacity duration-300"
                style={{
                  left: `${segLeft}%`,
                  width: `${segWidth}%`,
                  background: stage.color,
                  opacity: hasSomeActive ? 0.25 : 0.75,
                }}
              />
            );
          })}
          {/* Top highlight */}
          <div className="absolute inset-x-0 top-0 h-[38%]" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
          }} />
          {/* Shimmer LTR */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
              animation: 'shimmerLTR 2.5s ease-in-out infinite',
            }} />
          </div>
        </div>
        </div>{/* close inner overflow-hidden */}

        {/* Leading edge line */}
        {w > 1 && (
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{
              left: `${w}%`,
              width: '2px',
              transform: 'translateX(-1px)',
              background: activeStage.color,
            }}
          />
        )}

        {/* Rightward breathing glow — extends from the leading edge to the right */}
        {w > 1 && ready && (
          <div
            className="absolute top-0 bottom-0 z-[9] bar-edge-glow"
            style={{
              left: `${w}%`,
              '--edge-color': '#f57c00',
            } as React.CSSProperties}
          />
        )}

        {/* "We are here" — arrow tip aligned with the leading edge */}
        {w > 1 && (
          <motion.div
            className="absolute z-20 pointer-events-none"
            style={{ left: `${w}%`, bottom: '100%', paddingBottom: '4px' }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 6 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex flex-col items-center" style={{ transform: 'translateX(-50%)' }}>
              <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap" style={{ color: activeStage.color }}>
                WE ARE HERE
              </span>
              <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: `4px solid ${activeStage.color}` }} />
            </div>
          </motion.div>
        )}


      </div>

      {/* Desktop: horizontal stage labels below bar */}
      <div className="relative hidden sm:flex mt-2 pb-2" style={{ overflow: 'visible' }}>
        {/* Stages 1–4 */}
        {KILL_LINE_STAGES.filter(s => s.id < 5).map((stage) => {
          const width = ((stage.end - stage.start) / maxPct) * 100;
          return (
            <div
              key={stage.id}
              className="flex flex-col items-center text-center px-0.5 relative"
              style={{ width: `${width}%` }}
              onMouseEnter={() => setActiveTooltip(stage.id)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => handleSelectStage(stage.id)}
            >
              <div style={{ width: '1px', height: '8px', marginBottom: '4px', background: stage.color, opacity: 0.9 }} />
              <span className="inline-flex items-center justify-center gap-1 text-sm sm:text-base font-bold leading-tight cursor-pointer" style={{ color: stage.color }}>
                {stage.label[lang]}
                <span
                  className="inline-flex items-center justify-center transition-opacity flex-shrink-0"
                  style={{ opacity: activeTooltip === stage.id ? 1 : 0.55 }}
                >
                  <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" viewBox="0 0 16 16" fill="none" style={{ color: stage.color }}>
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 4.5v0.5M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
              <span className="text-xs sm:text-sm mono mt-0.5 font-semibold" style={{ fontVariantNumeric: 'tabular-nums', color: stage.color, opacity: 0.85 }}>
                {stage.start}–{stage.end}%
              </span>
              {/* Desktop tooltip popup */}
              <AnimatePresence>
                {activeTooltip === stage.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute top-full mt-2 z-[120] w-[320px] rounded-xl text-left max-h-[70vh] overflow-y-auto"
                    style={{
                      ...(stage.id <= 2 ? { left: 0 } : stage.id >= 4 ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' }),
                      background: 'var(--surface-card)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(20px)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-4 py-3 flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${stage.color}20, transparent)`, borderBottom: `1px solid ${stage.color}20` }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                      <span className="text-sm font-bold" style={{ color: stage.color }}>{stage.label[lang]}</span>
                      <span className="text-xs mono font-semibold text-foreground-dim ml-auto">{stage.start}–{stage.end}%</span>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="text-xs text-foreground-muted leading-relaxed">{stage.tooltip[lang].definition}</div>
                      <div className="flex gap-2">
                        <div className="w-0.5 rounded-full flex-shrink-0 self-stretch" style={{ background: stage.color, opacity: 0.5 }} />
                        <div className="text-xs text-foreground-muted leading-relaxed">{stage.tooltip[lang].control}</div>
                      </div>
                      <div className="text-xs leading-relaxed p-3 rounded-lg" style={{ background: 'var(--surface-elevated)' }}>
                        <span className="font-semibold text-foreground">{lang === 'zh' ? '人机关系' : 'Human ↔ AI'}: </span>
                        <span className="text-foreground-muted">{stage.tooltip[lang].relationship}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span className="text-[10px] uppercase tracking-wider text-foreground-dim">{lang === 'zh' ? '本质' : 'Nature'}</span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md" style={{ background: `${stage.color}15`, color: stage.color }}>{stage.tooltip[lang].coreNature}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Stage 5: KILL LINE (desktop) */}
        <div
          className="flex flex-col items-center text-center px-0.5 relative"
          style={{ width: '20%' }}
          onMouseEnter={() => setActiveTooltip(5)}
          onMouseLeave={() => setActiveTooltip(null)}
          onClick={() => handleSelectStage(5)}
        >
          <div style={{ width: '1px', height: '8px', marginBottom: '4px', background: 'var(--risk-critical)', opacity: 0.9 }} />
          <div className="kill-zone-badge cursor-pointer transition-all">
            <div className="flex flex-col items-center text-center gap-0.5">
              <span className="text-sm sm:text-base font-bold leading-tight inline-flex items-center gap-1">
                <Skull className="w-4 h-4 sm:w-[18px] sm:h-[18px] inline-block" />
                {lang === 'zh' ? 'AI 斩杀线' : 'AI Kill Line'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeTooltip === 5 ? 'rotate-180' : ''}`} />
              </span>
              <span className="text-xs sm:text-sm mono font-semibold opacity-80" style={{ fontVariantNumeric: 'tabular-nums' }}>80–100%</span>
            </div>
          </div>
          <AnimatePresence>
            {activeTooltip === 5 && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute top-full mt-2 z-[120] w-[320px] rounded-xl text-left max-h-[70vh] overflow-y-auto"
                style={{ right: 0, background: 'var(--surface-card)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 48px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'linear-gradient(135deg, rgba(255,23,68,0.12), transparent)', borderBottom: '1px solid rgba(255,23,68,0.12)' }}>
                  <Skull className="w-4 h-4 text-risk-critical" />
                  <span className="text-sm font-bold text-risk-critical">{lang === 'zh' ? 'AI 斩杀线' : 'AI Kill Line'}</span>
                  <span className="text-xs mono font-semibold text-foreground-dim ml-auto">80–100%</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-xs text-foreground-muted leading-relaxed">{KILL_LINE_STAGES[4].tooltip[lang].definition}</div>
                  <div className="flex gap-2">
                    <div className="w-0.5 rounded-full flex-shrink-0 self-stretch bg-risk-critical" style={{ opacity: 0.5 }} />
                    <div className="text-xs text-foreground-muted leading-relaxed">{KILL_LINE_STAGES[4].tooltip[lang].control}</div>
                  </div>
                  <div className="text-xs leading-relaxed p-3 rounded-lg" style={{ background: 'var(--surface-elevated)' }}>
                    <span className="font-semibold text-foreground">{lang === 'zh' ? '人机关系' : 'Human ↔ AI'}: </span>
                    <span className="text-foreground-muted">{KILL_LINE_STAGES[4].tooltip[lang].relationship}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-[10px] uppercase tracking-wider text-foreground-dim">{lang === 'zh' ? '本质' : 'Nature'}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-risk-critical/12 text-risk-critical">{KILL_LINE_STAGES[4].tooltip[lang].coreNature}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: horizontal chip selector + detail card */}
      <div className="sm:hidden mt-5">
        {/* Stage chips — scrollable row */}
        <div ref={chipScrollRef} className="flex overflow-x-auto gap-2 pb-3 -mx-1 px-1 scrollbar-hide">
          {KILL_LINE_STAGES.map((stage) => {
            const isCurrent = CURRENT_REPLACEMENT_RATE >= stage.start && CURRENT_REPLACEMENT_RATE < stage.end;
            const isActive = activeTooltip === stage.id;
            return (
              <button
                key={stage.id}
                ref={(el) => { chipRefs.current[stage.id] = el; }}
                onClick={() => handleSelectStage(stage.id)}
                className="flex-shrink-0 flex items-center gap-1.5 min-h-[36px] px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: isActive
                    ? `color-mix(in srgb, ${stage.color} 18%, transparent)`
                    : 'var(--surface-elevated)',
                  border: `1.5px solid ${isActive ? stage.color : 'transparent'}`,
                  color: isActive ? stage.color : 'var(--foreground-muted)',
                  boxShadow: isActive ? `0 0 12px color-mix(in srgb, ${stage.color} 20%, transparent)` : 'none',
                }}
              >
                {stage.id === 5 && <Skull className="w-3.5 h-3.5" />}
                <span>{stage.label[lang]}</span>
                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-risk-high animate-pulse flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail card for selected stage */}
        <AnimatePresence mode="wait">
          {activeTooltip !== null && (() => {
            const stage = KILL_LINE_STAGES.find(s => s.id === activeTooltip);
            if (!stage) return null;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                className="rounded-xl p-4"
                style={{
                  background: `color-mix(in srgb, ${stage.color} 5%, var(--surface-elevated))`,
                  border: `1px solid color-mix(in srgb, ${stage.color} 15%, transparent)`,
                }}
              >
                {/* Header row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: stage.color, boxShadow: `0 0 6px ${stage.color}` }}
                    />
                    <span className="text-sm font-bold" style={{ color: stage.color }}>{stage.label[lang]}</span>
                  </div>
                  <span className="text-[11px] mono font-semibold text-foreground-dim">{stage.start}–{stage.end}%</span>
                </div>

                {/* Definition */}
                <p className="text-xs text-foreground-muted leading-relaxed mb-3">
                  {stage.tooltip[lang].definition}
                </p>

                {/* Relationship */}
                <div
                  className="text-xs leading-relaxed p-2.5 rounded-lg mb-3"
                  style={{ background: 'var(--surface-card)', borderLeft: `2px solid ${stage.color}` }}
                >
                  <span className="font-semibold text-foreground">{lang === 'zh' ? '人机关系' : 'Human / AI'}: </span>
                  <span className="text-foreground-muted">{stage.tooltip[lang].relationship}</span>
                </div>

                {/* Nature tag */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-foreground-dim">
                    {lang === 'zh' ? '本质' : 'Core Nature'}
                  </span>
                  <span
                    className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                    style={{
                      background: `color-mix(in srgb, ${stage.color} 12%, transparent)`,
                      color: stage.color,
                    }}
                  >
                    {stage.tooltip[lang].coreNature}
                  </span>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AIKillLineBar;
