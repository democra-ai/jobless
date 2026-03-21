'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { AlertCircle, Eye, Zap, TrendingDown, ExternalLink, ChevronDown } from 'lucide-react';
import { Language, translations } from '@/lib/translations';
import Counter from '@/components/Counter';
import AIKillLineBar from '@/components/AIKillLineBar';
import { trackCtaClick, trackStatCardExpand } from '@/lib/analytics';
import { ParallaxOrb } from '@/components/ParallaxEffects';

function HeroSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  const [activeStat, setActiveStat] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Multi-layer parallax — each element at a different depth
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 180]), { stiffness: 80, damping: 25 });
  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 50]), { stiffness: 100, damping: 30 });
  const badgeY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 30]), { stiffness: 120, damping: 35 });
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 25]), { stiffness: 100, damping: 30 });
  const statsY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 15]), { stiffness: 110, damping: 32 });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  // Floating orb parallax — 5 layers of depth
  const orbLayer1 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 40]), { stiffness: 60, damping: 20 });
  const orbLayer2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 80]), { stiffness: 70, damping: 22 });
  const orbLayer3 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 120]), { stiffness: 80, damping: 24 });
  const orbLayer4 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 160]), { stiffness: 90, damping: 26 });
  const orbLayer5 = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 100, damping: 28 });

  const stats = [
    { value: <Counter end={34.8} suffix="%" />, color: 'var(--risk-high)', icon: Eye, label: t.exposureLabel, desc: t.exposureDesc, source: t.exposureSource, url: t.exposureUrl },
    { value: <Counter end={71.3} suffix="%" />, color: 'var(--brand-accent)', icon: Zap, label: t.proficiencyLabel, desc: t.proficiencyDesc, source: t.proficiencySource, url: t.proficiencyUrl },
    { value: <>92M</>, color: 'var(--risk-critical)', icon: TrendingDown, label: t.jobsBy2030, desc: t.jobsBy2030Desc, source: t.jobsBy2030Source, url: t.jobsBy2030Url },
  ] as const;

  return (
    <section ref={sectionRef} className="no-contain relative z-40 min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* ═══ Parallax Background — 5 depth layers ═══ */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}>
        {/* Central ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand-primary/[0.04] rounded-full blur-[150px]" />

        {/* Depth layer 1 — far background (slow) */}
        <ParallaxOrb color="var(--risk-critical)" size={500} x="5%" y="10%" parallaxY={orbLayer1} blur={180} opacity={0.025} />
        <ParallaxOrb color="var(--accent-purple)" size={400} x="85%" y="5%" parallaxY={orbLayer1} blur={160} opacity={0.03} />

        {/* Depth layer 2 */}
        <ParallaxOrb color="var(--brand-primary)" size={300} x="70%" y="60%" parallaxY={orbLayer2} blur={120} opacity={0.035} />
        <ParallaxOrb color="var(--accent-teal)" size={250} x="15%" y="70%" parallaxY={orbLayer2} blur={100} opacity={0.03} />

        {/* Depth layer 3 — mid */}
        <ParallaxOrb color="var(--brand-accent)" size={200} x="80%" y="30%" parallaxY={orbLayer3} blur={80} opacity={0.04} />

        {/* Depth layer 4 */}
        <ParallaxOrb color="var(--risk-high)" size={120} x="25%" y="40%" parallaxY={orbLayer4} blur={60} opacity={0.03} />

        {/* Depth layer 5 — near foreground (fast) */}
        <ParallaxOrb color="var(--dim-4)" size={80} x="60%" y="25%" parallaxY={orbLayer5} blur={40} opacity={0.04} />
      </motion.div>

      {/* ═══ Floating Particles — CSS animated ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-brand-primary/20"
            style={{
              width: `${2 + i * 0.5}px`,
              height: `${2 + i * 0.5}px`,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float-${['slow', 'medium', 'fast'][i % 3]} ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-30 text-center px-4 sm:px-6 max-w-6xl mx-auto w-full py-16 sm:py-24">
        {/* ═══ Alert Badge — subtle entry ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ y: badgeY }}
        >
          <div className="inline-flex items-center gap-2 bg-risk-critical/8 text-risk-critical px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-8 sm:mb-10 border border-risk-critical/15 backdrop-blur-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="tracking-wider uppercase">{t.alertBadge}</span>
          </div>
        </motion.div>

        {/* ═══ Hero Title — cinematic typography ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: titleY }}
        >
          <h1
            className="calc-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 section-title leading-[0.95]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed text-foreground-muted/80">
            {t.heroSubtitlePre}{t.heroSubtitlePost}{t.heroSubtitleEnd}
          </p>
        </motion.div>

        {/* ═══ Progress Bar Section — glassmorphism container ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: cardY }}
        >
          <div className="relative z-20 glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10" style={{ overflow: 'visible' }}>
            {/* Ambient glow behind the card */}
            <div className="absolute -inset-px rounded-2xl sm:rounded-3xl pointer-events-none" style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.05), transparent 40%, rgba(255,23,68,0.04))',
              zIndex: -1,
              filter: 'blur(40px)',
            }} />

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-5 sm:mb-7 text-foreground text-left" style={{ fontFamily: 'var(--font-display)' }}>
              {t.progressTitle}
            </h2>
            <AIKillLineBar lang={lang} t={t} />

            {/* ═══ Stat Cards ═══ */}
            <motion.div style={{ y: statsY }}>
              {/* Mobile: unified card */}
              <div className="sm:hidden mt-5 rounded-xl glass-card divide-y divide-white/5">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={i}
                      className="px-4 py-3.5 cursor-pointer transition-colors active:bg-white/5"
                      onClick={() => { const next = activeStat === i ? null : i; setActiveStat(next); if (next !== null) trackStatCardExpand(i, stat.label as string); }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 12%, transparent)` }}>
                            <Icon className="w-4 h-4" style={{ color: stat.color }} />
                          </div>
                          <span className="text-xs text-foreground-muted font-medium">{stat.label}</span>
                        </div>
                        <span
                          className="inline-flex items-center rounded-lg px-2.5 py-1 text-sm mono font-bold leading-none flex-shrink-0"
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
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 mt-3 text-left" style={{ borderTop: `1px solid color-mix(in srgb, ${stat.color} 15%, transparent)` }}>
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

              {/* Desktop: 3-column glassmorphism cards */}
              <div className="hidden sm:grid grid-cols-3 gap-3 md:gap-4 mt-5 overflow-visible">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                      className="group relative z-20 hover:z-[220] rounded-xl p-4 md:p-5 stat-card-shine overflow-visible"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
                        minHeight: '64px',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = 'translateY(-4px)';
                        el.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 30px color-mix(in srgb, ${stat.color} 15%, transparent), inset 0 1px 0 rgba(255,255,255,0.08)`;
                        el.style.borderColor = `color-mix(in srgb, ${stat.color} 25%, transparent)`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = 'translateY(0)';
                        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)';
                        el.style.borderColor = 'rgba(255,255,255,0.06)';
                      }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 15%, transparent)` }}>
                            <Icon className="w-4 h-4" style={{ color: stat.color }} />
                          </div>
                          <span className="hero-stat-label text-xs md:text-sm text-foreground-muted font-medium leading-tight">{stat.label}</span>
                        </div>
                        <span
                          className="inline-flex items-center rounded-lg px-2.5 py-1 text-base mono font-bold leading-none flex-shrink-0"
                          style={{
                            fontVariantNumeric: 'tabular-nums',
                            color: stat.color,
                            backgroundColor: `color-mix(in srgb, ${stat.color} 10%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${stat.color} 20%, transparent)`,
                          }}
                        >
                          {stat.value}
                        </span>
                      </div>
                      {/* Desktop: hover tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-[240] w-max max-w-[280px]">
                        <div className="glass-panel px-4 py-4 rounded-xl">
                          <div className="text-[11px] text-foreground-muted leading-relaxed mb-2.5">{stat.desc}</div>
                          <a href={stat.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-medium transition-colors" style={{ color: stat.color }}>
                            <ExternalLink className="w-3 h-3" />
                            {stat.source}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ═══ CTA — scroll to calculator ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <button
            onClick={() => { trackCtaClick('scroll_to_calculator', 'hero'); document.getElementById('risk-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className="group flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-sm font-medium text-foreground-muted/60 tracking-wider uppercase transition-colors group-hover:text-foreground-muted">
              {t.transitionCta}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
            >
              <ChevronDown className="w-5 h-5 text-foreground-muted/40" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
