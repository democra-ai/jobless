'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Lock, Zap, ChevronDown, Database, Shield, AlertTriangle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Language, translations } from '@/lib/translations';
import { Cpu, Skull, Sparkles } from 'lucide-react';
import { trackExpandToggle, trackInternalNavigation } from '@/lib/analytics';

function DataThreatSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  const [expanded, setExpanded] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Deep parallax layers
  const headerY = useSpring(useTransform(scrollYProgress, [0, 1], [80, -40]), { stiffness: 80, damping: 25 });
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [100, -25]), { stiffness: 80, damping: 25 });
  const ctaY = useSpring(useTransform(scrollYProgress, [0, 1], [120, -15]), { stiffness: 80, damping: 25 });
  const glowY = useSpring(useTransform(scrollYProgress, [0, 1], [-60, 100]), { stiffness: 60, damping: 20 });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 px-4 sm:px-6 relative z-30 overflow-hidden">
      {/* Ambient glow — moves with scroll */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          left: '50%',
          top: '15%',
          x: '-50%',
          y: glowY,
          scale: glowScale,
          background: 'radial-gradient(circle, rgba(255,23,68,0.06) 0%, rgba(255,87,34,0.03) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary ambient glow */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.04) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header — deep parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-16"
          style={{ y: headerY }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{
            background: 'linear-gradient(135deg, rgba(255,23,68,0.08), rgba(255,87,34,0.06))',
            border: '1px solid rgba(255,23,68,0.12)',
            backdropFilter: 'blur(8px)',
          }}>
            <Lock className="w-3.5 h-3.5 text-risk-critical" />
            <span className="text-xs font-semibold text-risk-critical tracking-wider uppercase">DATA THREAT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 section-title leading-[0.95]">
            {t.dataThreatTitle}
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto text-lg leading-relaxed">
            {t.dataThreatSubtitle}
          </p>
        </motion.div>

        {/* Collapsible Last Mile Concept — glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10"
          style={{ y: cardY }}
        >
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
            backdropFilter: 'blur(30px) saturate(150%)',
            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px" style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,107,53,0.3), rgba(255,23,68,0.3), transparent)',
            }} />

            <button
              onClick={() => { const next = !expanded; setExpanded(next); trackExpandToggle('last_mile_concept', next); }}
              className="w-full flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110" style={{
                  background: 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(255,107,53,0.1))',
                  border: '1px solid rgba(212,165,116,0.15)',
                }}>
                  <Zap className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{t.lastMileTitle}</h3>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full flex items-center justify-center" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <ChevronDown className="w-5 h-5 text-foreground-muted" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-foreground-muted/80 mb-10 mt-8 text-base leading-relaxed">{t.lastMileDesc}</p>

                  {/* ═══ Visual Flow — Desktop: 3 dramatic cards with animated connections ═══ */}
                  <div className="hidden md:grid grid-cols-5 gap-3 items-center">
                    {/* Step 1: AI Training */}
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="rounded-2xl p-6 text-center relative group transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,165,116,0.08), rgba(212,165,116,0.02))',
                        border: '1px solid rgba(212,165,116,0.12)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.3)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(212,165,116,0.1)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(212,165,116,0.12)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))',
                      }}>
                        <Cpu className="w-7 h-7 text-brand-accent" />
                      </div>
                      <div className="font-semibold text-sm mb-1">{t.lastMileStep1}</div>
                      <div className="text-xs text-foreground-muted/60 leading-relaxed">{t.lastMileStep1Desc}</div>
                    </motion.div>

                    {/* Arrow 1 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="text-[10px] text-foreground-muted/50 uppercase tracking-wider">{t.lastMileArrow1}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-px bg-risk-high/30" />
                        <div className="text-risk-high text-lg">→</div>
                      </div>
                    </motion.div>

                    {/* Step 2: Your Data (emphasized) */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="rounded-2xl p-6 text-center relative group transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,87,34,0.08), rgba(255,87,34,0.02))',
                        border: '2px solid rgba(255,87,34,0.2)',
                        boxShadow: '0 0 30px rgba(255,87,34,0.05)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,87,34,0.4)';
                        e.currentTarget.style.boxShadow = '0 8px 40px rgba(255,87,34,0.15)';
                        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,87,34,0.2)';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(255,87,34,0.05)';
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      }}
                    >
                      <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, rgba(255,87,34,0.2), rgba(255,87,34,0.05))',
                      }}>
                        <Database className="w-7 h-7 text-risk-high" />
                      </div>
                      <div className="font-semibold text-sm text-risk-high mb-1">{t.lastMileStep2}</div>
                      <div className="text-xs text-foreground-muted/60 leading-relaxed">{t.lastMileStep2Desc}</div>
                    </motion.div>

                    {/* Arrow 2 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <div className="text-[10px] text-foreground-muted/50 uppercase tracking-wider">{t.lastMileArrow2}</div>
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-px bg-risk-critical/30" />
                        <div className="text-risk-critical text-lg">→</div>
                      </div>
                    </motion.div>

                    {/* Step 3: Replacement */}
                    <motion.div
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="rounded-2xl p-6 text-center relative group transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,23,68,0.08), rgba(255,23,68,0.02))',
                        border: '1px solid rgba(255,23,68,0.15)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,23,68,0.35)';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,23,68,0.1)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255,23,68,0.15)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{
                        background: 'linear-gradient(135deg, rgba(255,23,68,0.15), rgba(255,23,68,0.05))',
                      }}>
                        <Skull className="w-7 h-7 text-risk-critical" />
                      </div>
                      <div className="font-semibold text-sm text-risk-critical mb-1">{t.lastMileStep3}</div>
                      <div className="text-xs text-foreground-muted/60 leading-relaxed">{t.lastMileStep3Desc}</div>
                    </motion.div>
                  </div>

                  {/* ═══ Mobile: vertical flow ═══ */}
                  <div className="flex md:hidden flex-col items-center gap-0">
                    <div className="w-full rounded-xl p-5 text-center" style={{
                      background: 'linear-gradient(135deg, rgba(212,165,116,0.08), transparent)',
                      border: '1px solid rgba(212,165,116,0.12)',
                    }}>
                      <Cpu className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                      <div className="font-semibold text-sm">{t.lastMileStep1}</div>
                      <div className="text-xs text-foreground-muted/60 mt-1">{t.lastMileStep1Desc}</div>
                    </div>

                    <div className="flex flex-col items-center py-2">
                      <div className="text-[10px] text-foreground-muted/50 uppercase tracking-wider">{t.lastMileArrow1}</div>
                      <div className="text-risk-high text-lg">↓</div>
                    </div>

                    <div className="w-full rounded-xl p-5 text-center" style={{
                      background: 'linear-gradient(135deg, rgba(255,87,34,0.08), transparent)',
                      border: '2px solid rgba(255,87,34,0.2)',
                      boxShadow: '0 0 20px rgba(255,87,34,0.05)',
                    }}>
                      <Database className="w-8 h-8 text-risk-high mx-auto mb-3" />
                      <div className="font-semibold text-sm text-risk-high">{t.lastMileStep2}</div>
                      <div className="text-xs text-foreground-muted/60 mt-1">{t.lastMileStep2Desc}</div>
                    </div>

                    <div className="flex flex-col items-center py-2">
                      <div className="text-[10px] text-foreground-muted/50 uppercase tracking-wider">{t.lastMileArrow2}</div>
                      <div className="text-risk-critical text-lg">↓</div>
                    </div>

                    <div className="w-full rounded-xl p-5 text-center" style={{
                      background: 'linear-gradient(135deg, rgba(255,23,68,0.08), transparent)',
                      border: '1px solid rgba(255,23,68,0.15)',
                    }}>
                      <Skull className="w-8 h-8 text-risk-critical mx-auto mb-3" />
                      <div className="font-semibold text-sm text-risk-critical">{t.lastMileStep3}</div>
                      <div className="text-xs text-foreground-muted/60 mt-1">{t.lastMileStep3Desc}</div>
                    </div>
                  </div>

                  {/* Skill = New Training Data */}
                  <div className="mt-8 p-5 rounded-xl relative overflow-hidden" style={{
                    background: 'linear-gradient(135deg, rgba(212,165,116,0.06), transparent)',
                    border: '1px solid rgba(212,165,116,0.1)',
                  }}>
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                        background: 'rgba(212,165,116,0.12)',
                      }}>
                        <Sparkles className="w-4 h-4 text-brand-accent" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground mb-1.5">
                          {lang === 'zh' ? 'Skill：一种新型训练数据' : 'Skills: A New Form of Training Data'}
                        </div>
                        <p className="text-xs text-foreground-muted/70 leading-relaxed">
                          {t.lastMileArrow1Note}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Warning — dramatic gradient */}
                  <div className="mt-4 p-5 rounded-xl relative overflow-hidden" style={{
                    background: 'linear-gradient(135deg, rgba(255,23,68,0.06), rgba(255,87,34,0.04))',
                    border: '1px solid rgba(255,23,68,0.1)',
                  }}>
                    {/* Subtle animated line */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,23,68,0.3), transparent)',
                    }} />
                    <p className="text-sm font-semibold text-center flex items-center justify-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-risk-critical flex-shrink-0" />
                      <span>{t.lastMileWarning}</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA — deepest parallax layer */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
          style={{ y: ctaY }}
        >
          <p className="text-foreground-muted/70 mb-6 text-base">{t.viewFullDetailsCta}</p>
          <Link
            href="/data-protection"
            onClick={() => trackInternalNavigation('/data-protection', 'data_threat_section')}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,23,68,0.9), rgba(255,87,34,0.85))',
              boxShadow: '0 4px 20px rgba(255,23,68,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 40px rgba(255,23,68,0.35), inset 0 1px 0 rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,23,68,0.25), inset 0 1px 0 rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
            }}
          >
            <Shield className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>{t.viewFullDetails}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DataThreatSection;
