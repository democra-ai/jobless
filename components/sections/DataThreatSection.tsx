'use client';

import React, { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, ChevronDown, Database, Shield, AlertTriangle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Language, translations } from '@/lib/translations';
import { Cpu, Skull } from 'lucide-react';
import { trackExpandToggle, trackInternalNavigation } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { AnimatedBeam } from '@/components/ui/animated-beam';

const BeamNode = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; style?: React.CSSProperties }>(
  ({ children, className = '', style }, ref) => (
    <div ref={ref} className={`z-10 flex flex-col items-center justify-center rounded-2xl p-6 sm:p-8 ${className}`}
      style={{ background: 'var(--surface)', border: '1px solid var(--surface-elevated)', ...style }}>
      {children}
    </div>
  ),
);
BeamNode.displayName = 'BeamNode';

function DataThreatSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  const [expanded, setExpanded] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const skillRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 sm:py-32 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase border mb-6"
              style={{ borderColor: 'var(--overlay-10)', color: 'var(--risk-critical)' }}>
              <Lock className="w-3 h-3" />
              Data Threat
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
              {t.dataThreatTitle}
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--foreground-muted)' }}>
              {t.dataThreatSubtitle}
            </p>
          </div>
        </BlurFade>

        {/* Last Mile — collapsible card */}
        <BlurFade delay={0.2} inView>
          <div className="rounded-3xl p-6 sm:p-10 mb-12"
            style={{ background: 'var(--surface)', border: '1px solid var(--surface-elevated)' }}>
            <button
              onClick={() => { const next = !expanded; setExpanded(next); trackExpandToggle('last_mile_concept', next); }}
              className="w-full flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: 'color-mix(in srgb, var(--brand-accent) 15%, transparent)' }}>
                  <Zap className="w-6 h-6" style={{ color: 'var(--brand-accent)' }} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{t.lastMileTitle}</h3>
              </div>
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-5 h-5" style={{ color: 'var(--foreground-dim)' }} />
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
                  <p className="mt-6 mb-10 text-base leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                    {t.lastMileDesc}
                  </p>

                  {/* Desktop: 3-node flow with animated beams */}
                  <div ref={containerRef} className="hidden md:grid grid-cols-3 gap-8 relative mb-10">
                    <BeamNode ref={skillRef}>
                      <Cpu className="w-10 h-10 mb-3" style={{ color: 'var(--brand-accent)' }} />
                      <div className="font-bold text-base mb-1" style={{ color: 'var(--foreground)' }}>{t.lastMileStep1}</div>
                      <div className="text-xs text-center" style={{ color: 'var(--foreground-dim)' }}>{t.lastMileStep1Desc}</div>
                    </BeamNode>

                    <BeamNode ref={dataRef} className="ring-2" style={{ '--tw-ring-color': 'var(--risk-high)', '--tw-ring-opacity': '0.3' } as React.CSSProperties}>
                      <Database className="w-10 h-10 mb-3" style={{ color: 'var(--risk-high)' }} />
                      <div className="font-bold text-base mb-1" style={{ color: 'var(--risk-high)' }}>{t.lastMileStep2}</div>
                      <div className="text-xs text-center" style={{ color: 'var(--foreground-dim)' }}>{t.lastMileStep2Desc}</div>
                    </BeamNode>

                    <BeamNode ref={modelRef}>
                      <Skull className="w-10 h-10 mb-3" style={{ color: 'var(--risk-critical)' }} />
                      <div className="font-bold text-base mb-1" style={{ color: 'var(--risk-critical)' }}>{t.lastMileStep3}</div>
                      <div className="text-xs text-center" style={{ color: 'var(--foreground-dim)' }}>{t.lastMileStep3Desc}</div>
                    </BeamNode>

                    <AnimatedBeam containerRef={containerRef} fromRef={skillRef} toRef={dataRef}
                      gradientStartColor="#d4a574" gradientStopColor="#ff5722" duration={4} />
                    <AnimatedBeam containerRef={containerRef} fromRef={dataRef} toRef={modelRef}
                      gradientStartColor="#ff5722" gradientStopColor="#ff1744" duration={4} delay={1} />
                  </div>

                  {/* Mobile: vertical stack */}
                  <div className="flex md:hidden flex-col gap-3 mb-10">
                    {[
                      { icon: Cpu, color: 'var(--brand-accent)', title: t.lastMileStep1, desc: t.lastMileStep1Desc },
                      { icon: Database, color: 'var(--risk-high)', title: t.lastMileStep2, desc: t.lastMileStep2Desc },
                      { icon: Skull, color: 'var(--risk-critical)', title: t.lastMileStep3, desc: t.lastMileStep3Desc },
                    ].map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <React.Fragment key={i}>
                          <div className="rounded-2xl p-5 text-center"
                            style={{ background: `color-mix(in srgb, ${step.color} 8%, var(--surface))`, border: `1px solid color-mix(in srgb, ${step.color} 20%, transparent)` }}>
                            <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: step.color }} />
                            <div className="font-bold text-sm" style={{ color: step.color }}>{step.title}</div>
                            <div className="text-xs mt-1" style={{ color: 'var(--foreground-dim)' }}>{step.desc}</div>
                          </div>
                          {i < 2 && <div className="text-center text-lg" style={{ color: 'var(--foreground-dim)' }}>&darr;</div>}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Info box */}
                  <div className="rounded-2xl p-5 mb-4 flex items-start gap-4"
                    style={{ background: 'color-mix(in srgb, var(--brand-accent) 6%, var(--surface))', border: '1px solid color-mix(in srgb, var(--brand-accent) 15%, transparent)' }}>
                    <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--brand-accent)' }} />
                    <div>
                      <div className="text-sm font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                        {lang === 'zh' ? 'Skill：一种新型训练数据' : 'Skills: A New Form of Training Data'}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>{t.lastMileArrow1Note}</p>
                    </div>
                  </div>

                  {/* Warning */}
                  <div className="rounded-2xl p-5 text-center"
                    style={{ background: 'color-mix(in srgb, var(--risk-critical) 6%, var(--surface))', border: '1px solid color-mix(in srgb, var(--risk-critical) 15%, transparent)' }}>
                    <AlertTriangle className="w-5 h-5 inline mr-2 align-middle" style={{ color: 'var(--risk-critical)' }} />
                    <span className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{t.lastMileWarning}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.3} inView>
          <div className="text-center">
            <p className="text-base mb-6" style={{ color: 'var(--foreground-muted)' }}>{t.viewFullDetailsCta}</p>
            <Link
              href="/data-protection"
              onClick={() => trackInternalNavigation('/data-protection', 'data_threat_section')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'var(--risk-critical)',
                color: '#fff',
                boxShadow: '0 8px 30px -4px rgba(255,23,68,0.3)',
              }}
            >
              <Shield className="w-5 h-5" />
              {t.viewFullDetails}
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export default DataThreatSection;
