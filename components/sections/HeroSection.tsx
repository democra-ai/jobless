'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Eye, Zap, TrendingDown, ExternalLink, ChevronDown } from 'lucide-react';
import { Language, Theme, translations } from '@/lib/translations';
import Counter from '@/components/Counter';
import AIKillLineBar from '@/components/AIKillLineBar';
import { trackCtaClick, trackStatCardExpand } from '@/lib/analytics';
import { BorderBeam } from '@/components/ui/border-beam';
import { MagicCard } from '@/components/ui/magic-card';

function HeroSection({ lang, t, theme = 'dark' }: { lang: Language; t: (typeof translations)[Language]; theme?: Theme }) {
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const beamFrom = theme === 'dark' ? '#ffffff' : '#ff6b35';
  const beamTo = theme === 'dark' ? '#c4b5fd' : '#ff1744';

  return (
    <section className="no-contain relative z-40 pt-16 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-14 overflow-visible">
      <div className="relative z-30 text-center px-4 sm:px-6 max-w-6xl mx-auto hero-glow">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Alert badge */}
          <div className="inline-flex items-center gap-2 bg-risk-critical/10 text-risk-critical px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 border border-risk-critical/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="tracking-wide">{t.alertBadge}</span>
          </div>

          {/* Hero title */}
          <h1 className="calc-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 section-title" style={{ fontFamily: 'var(--font-display)' }}>
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed text-foreground-muted">
            {t.heroSubtitlePre}{t.heroSubtitlePost}{t.heroSubtitleEnd}
          </p>
        </motion.div>

        {/* Upper glow orb — at hero title level */}
        <motion.div
          className="hero-glow-orb absolute left-1/2 -translate-x-1/2 w-[70%] max-w-2xl h-[300px] rounded-full blur-[80px] pointer-events-none z-0"
          style={{ top: '10%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />

        {/* Progress bar section */}
        <motion.div
          className="pt-8 sm:pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagicCard className="relative z-20 calc-container card-glow-border rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 !overflow-visible" gradientColor="rgba(255, 107, 53, 0.08)" gradientOpacity={0.8}>
            {/* Border beam — light traveling along card edge */}
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden pointer-events-none z-0">
              <BorderBeam
                size={150}
                duration={8}
                colorFrom={beamFrom}
                colorTo={beamTo}
                borderWidth={1.5}
              />
            </div>
            {/* Glow orb — sunrise warmth by day, silver starlight by night, centered on progress bar */}
            <motion.div
              className="hero-glow-orb absolute left-1/2 -translate-x-1/2 w-[80%] max-w-2xl h-[250px] rounded-full blur-[80px] pointer-events-none z-0"
              style={{ top: '20%' }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
            />
            <h2 className="relative z-10 text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-foreground text-left">{t.progressTitle}</h2>
            <AIKillLineBar lang={lang} t={t} />

            {/* Stat cards */}
            {(() => {
              const stats = [
                { value: <Counter end={34.8} suffix="%" />, color: 'var(--risk-high)', icon: Eye, label: t.exposureLabel, desc: t.exposureDesc, source: t.exposureSource, url: t.exposureUrl },
                { value: <Counter end={71.3} suffix="%" />, color: 'var(--brand-accent)', icon: Zap, label: t.proficiencyLabel, desc: t.proficiencyDesc, source: t.proficiencySource, url: t.proficiencyUrl },
                { value: <>92M</>, color: 'var(--risk-critical)', icon: TrendingDown, label: t.jobsBy2030, desc: t.jobsBy2030Desc, source: t.jobsBy2030Source, url: t.jobsBy2030Url },
              ] as const;

              return (
                <>
                  {/* Mobile: single unified card with divide-y */}
                  <div className="sm:hidden mt-4 rounded-lg bg-background card-glow-border divide-y divide-white/[0.06]">
                    {stats.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={i}
                          className="px-4 py-3 cursor-pointer transition-colors active:bg-surface-elevated/50"
                          onClick={() => { const next = activeStat === i ? null : i; setActiveStat(next); if (next !== null) trackStatCardExpand(i, stat.label as string); }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)` }}>
                                <Icon className="w-4 h-4" style={{ color: stat.color }} />
                              </div>
                              <span className="text-xs text-foreground-muted font-medium">{stat.label}</span>
                            </div>
                            <span
                              className="inline-flex items-center rounded-md px-2 py-0.5 text-sm mono font-semibold leading-none flex-shrink-0"
                              style={{
                                fontVariantNumeric: 'tabular-nums',
                                color: stat.color,
                                backgroundColor: `color-mix(in srgb, ${stat.color} 10%, transparent)`,
                              }}
                            >
                              {stat.value}
                            </span>
                          </div>
                          <AnimatePresence>
                            {activeStat === i && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-2.5 mt-2.5 text-left" style={{ borderTop: `1px solid color-mix(in srgb, ${stat.color} 15%, transparent)` }}>
                                  <div className="text-xs text-foreground-muted leading-relaxed mb-2">{stat.desc}</div>
                                  <a href={stat.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium transition-colors" style={{ color: stat.color }}>
                                    <ExternalLink className="w-3 h-3" />
                                    {stat.source}
                                  </a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop: 3-column grid — single controlled tooltip */}
                  <div className="hidden sm:grid grid-cols-3 gap-2 md:gap-3 mt-4 relative">
                    {stats.map((stat, i) => {
                      const Icon = stat.icon;
                      return (
                        <div
                          key={i}
                          className="relative rounded-lg p-3 md:p-4 bg-background card-glow-border cursor-pointer"
                          style={{ minHeight: '56px' }}
                          onMouseEnter={() => setActiveStat(i)}
                          onMouseLeave={() => setActiveStat(null)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 15%, transparent)` }}>
                                <Icon className="w-4 h-4" style={{ color: stat.color }} />
                              </div>
                              <span className="hero-stat-label text-xs md:text-sm text-foreground-muted font-medium leading-tight">{stat.label}</span>
                            </div>
                            <span
                              className="inline-flex items-center rounded-md px-2 py-0.5 text-base mono font-semibold leading-none flex-shrink-0"
                              style={{
                                fontVariantNumeric: 'tabular-nums',
                                color: stat.color,
                                backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)`,
                                border: `1px solid color-mix(in srgb, ${stat.color} 30%, transparent)`,
                              }}
                            >
                              {stat.value}
                            </span>
                          </div>

                          {/* Tooltip — only ONE visible at a time, controlled by activeStat */}
                          <AnimatePresence>
                            {activeStat === i && (
                              <motion.div
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.15 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 z-[240] w-max max-w-[260px]"
                              >
                                <div
                                  className="px-3 py-3 rounded-xl"
                                  style={{
                                    background: 'var(--surface-elevated)',
                                    border: '1px solid var(--overlay-15)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                                  }}
                                >
                                  <div className="text-[11px] text-foreground-muted leading-relaxed mb-2">{stat.desc}</div>
                                  <a href={stat.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-medium transition-colors" style={{ color: stat.color }}>
                                    <ExternalLink className="w-3 h-3" />
                                    {stat.source}
                                  </a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </MagicCard>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex justify-center"
        >
          <button
            onClick={() => { trackCtaClick('scroll_to_calculator', 'hero'); document.getElementById('risk-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className="group flex items-center gap-1.5 cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.2, repeat: 2, repeatType: 'loop', ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4 text-foreground-muted" />
            </motion.div>
            <span className="text-sm font-medium text-foreground-muted">
              {t.transitionCta}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
