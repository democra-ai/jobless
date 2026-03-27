'use client';

import React, { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, ChevronDown, Database, Shield, AlertTriangle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Language, translations } from '@/lib/translations';
import { Cpu, Skull } from 'lucide-react';
import { trackExpandToggle, trackInternalNavigation } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { MagicCard } from '@/components/ui/magic-card';
import { ShimmerButton } from '@/components/ui/shimmer-button';

// Circle node for animated beam
const CircleNode = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; style?: React.CSSProperties }>(
  ({ children, className = '', style }, ref) => (
    <div ref={ref} className={`z-10 flex items-center justify-center rounded-xl border-2 bg-surface p-4 ${className}`} style={style}>
      {children}
    </div>
  ),
);
CircleNode.displayName = 'CircleNode';

function DataThreatSection({ lang, t, theme = 'dark' }: { lang: Language; t: (typeof translations)[Language]; theme?: 'dark' | 'light' }) {
  const [expanded, setExpanded] = useState(true);
  const beamFrom = theme === 'dark' ? '#ffffff' : '#ff6b35';
  const beamTo = theme === 'dark' ? '#c4b5fd' : '#ff1744';

  // Refs for animated beams
  const containerRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-30 overflow-hidden border-t border-surface-elevated/50 bg-background">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-risk-critical/10 border border-risk-critical/20 mb-4">
              <Lock className="w-3.5 h-3.5 text-risk-critical" />
              <span className="text-xs font-semibold text-risk-critical tracking-wide uppercase">DATA THREAT</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 section-title">
              {t.dataThreatTitle}
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              {t.dataThreatSubtitle}
            </p>
          </div>
        </BlurFade>

        {/* Collapsible Last Mile Concept with MagicCard */}
        <BlurFade delay={0.25} inView>
          <MagicCard
            className="relative rounded-xl p-0 card-glow-border mb-8"
            gradientColor="rgba(255, 107, 53, 0.06)"
            gradientOpacity={0.8}
          >
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none z-[45]">
              <BorderBeam size={150} duration={10} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1.5} />
            </div>
            <div className="relative p-6 sm:p-8">
              <button
                onClick={() => { const next = !expanded; setExpanded(next); trackExpandToggle('last_mile_concept', next); }}
                className="w-full flex items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent/15 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-brand-accent" />
                  </div>
                  <h3 className="text-xl font-bold">{t.lastMileTitle}</h3>
                </div>
                <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-foreground-muted" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-foreground-muted mb-8 mt-6">{t.lastMileDesc}</p>

                    {/* Desktop: Animated Beam Flow */}
                    <div ref={containerRef} className="hidden md:flex items-center justify-center gap-12 relative py-8">
                      <CircleNode ref={skillRef} className="border-brand-accent/40" style={{ backgroundColor: 'color-mix(in srgb, var(--brand-accent) 10%, var(--surface))' }}>
                        <div className="text-center">
                          <Cpu className="w-8 h-8 text-brand-accent mx-auto mb-2" />
                          <div className="font-semibold text-sm">{t.lastMileStep1}</div>
                          <div className="text-xs text-foreground-muted mt-1 max-w-[120px]">{t.lastMileStep1Desc}</div>
                        </div>
                      </CircleNode>

                      <CircleNode ref={dataRef} className="border-risk-high/50 scale-110" style={{ backgroundColor: 'color-mix(in srgb, var(--risk-high) 10%, var(--surface))' }}>
                        <div className="text-center">
                          <Database className="w-8 h-8 text-risk-high mx-auto mb-2" />
                          <div className="font-semibold text-sm text-risk-high">{t.lastMileStep2}</div>
                          <div className="text-xs text-foreground-muted mt-1 max-w-[120px]">{t.lastMileStep2Desc}</div>
                        </div>
                      </CircleNode>

                      <CircleNode ref={modelRef} className="border-risk-critical/40" style={{ backgroundColor: 'color-mix(in srgb, var(--risk-critical) 10%, var(--surface))' }}>
                        <div className="text-center">
                          <Skull className="w-8 h-8 text-risk-critical mx-auto mb-2" />
                          <div className="font-semibold text-sm text-risk-critical">{t.lastMileStep3}</div>
                          <div className="text-xs text-foreground-muted mt-1 max-w-[120px]">{t.lastMileStep3Desc}</div>
                        </div>
                      </CircleNode>

                      {/* Animated beams connecting the nodes */}
                      <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={skillRef}
                        toRef={dataRef}
                        gradientStartColor="#d4a574"
                        gradientStopColor="#ff5722"
                        duration={4}
                      />
                      <AnimatedBeam
                        containerRef={containerRef}
                        fromRef={dataRef}
                        toRef={modelRef}
                        gradientStartColor="#ff5722"
                        gradientStopColor="#ff1744"
                        duration={4}
                        delay={1}
                      />
                    </div>

                    {/* Mobile: vertical cards */}
                    <div className="flex md:hidden flex-col items-center gap-0">
                      <div className="w-full bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-5 text-center">
                        <Cpu className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                        <div className="font-semibold text-sm">{t.lastMileStep1}</div>
                        <div className="text-xs text-foreground-muted mt-1">{t.lastMileStep1Desc}</div>
                      </div>
                      <div className="flex flex-col items-center py-2">
                        <div className="text-xs text-foreground-muted">{t.lastMileArrow1}</div>
                        <div className="text-xl text-risk-high">&darr;</div>
                      </div>
                      <div className="w-full bg-risk-high/10 border-2 border-risk-high/40 rounded-xl p-5 text-center relative">
                        <Database className="w-8 h-8 text-risk-high mx-auto mb-3" />
                        <div className="font-semibold text-sm text-risk-high">{t.lastMileStep2}</div>
                        <div className="text-xs text-foreground-muted mt-1">{t.lastMileStep2Desc}</div>
                      </div>
                      <div className="flex flex-col items-center py-2">
                        <div className="text-xs text-foreground-muted">{t.lastMileArrow2}</div>
                        <div className="text-xl text-risk-critical">&darr;</div>
                      </div>
                      <div className="w-full bg-risk-critical/10 border border-risk-critical/30 rounded-xl p-5 text-center">
                        <Skull className="w-8 h-8 text-risk-critical mx-auto mb-3" />
                        <div className="font-semibold text-sm text-risk-critical">{t.lastMileStep3}</div>
                        <div className="text-xs text-foreground-muted mt-1">{t.lastMileStep3Desc}</div>
                      </div>
                    </div>

                    {/* Skill = New Training Data */}
                    <div className="mt-6 p-4 rounded-xl bg-brand-accent/5 border border-brand-accent/15">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-bold text-foreground mb-1">
                            {lang === 'zh' ? 'Skill：一种新型训练数据' : 'Skills: A New Form of Training Data'}
                          </div>
                          <p className="text-xs text-foreground-muted leading-relaxed">
                            {t.lastMileArrow1Note}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Warning */}
                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-risk-critical/10 to-risk-high/10 border border-risk-critical/20">
                      <p className="text-sm font-semibold text-center">
                        <AlertTriangle className="w-4 h-4 inline text-risk-critical mr-2 align-middle" />
                        {t.lastMileWarning}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </MagicCard>
        </BlurFade>

        {/* CTA to full data protection page */}
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-foreground-muted mb-4">{t.viewFullDetailsCta}</p>
          <Link
            href="/data-protection"
            onClick={() => trackInternalNavigation('/data-protection', 'data_threat_section')}
            className="inline-flex items-center px-8 py-4 font-semibold text-lg text-foreground-muted hover:text-foreground transition-colors"
          >
            <Shield className="w-5 h-5 mr-2" />
            {t.viewFullDetails}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DataThreatSection;
