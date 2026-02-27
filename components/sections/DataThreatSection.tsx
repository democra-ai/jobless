'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Zap, ChevronDown, ChevronRight, Database, Shield, AlertTriangle, ExternalLink, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Language, translations } from '@/lib/translations';
import { dataProtectionTranslations } from '@/lib/data-protection';
import { Cpu, Skull, Sparkles } from 'lucide-react';

// 数据威胁板块（精简版，完整版在 /data-protection）
function DataThreatSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative z-30 overflow-hidden">

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-risk-critical/10 border border-risk-critical/20 mb-6">
            <Lock className="w-4 h-4 text-risk-critical" />
            <span className="text-sm font-medium text-risk-critical">DATA THREAT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 section-title">
            {t.dataThreatTitle}
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto text-lg">
            {t.dataThreatSubtitle}
          </p>
        </motion.div>

        {/* Collapsible Last Mile Concept */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="result-card rounded-2xl p-8 border border-surface-elevated">
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">{t.lastMileTitle}</h3>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
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
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-foreground-muted mb-8 mt-6">{t.lastMileDesc}</p>

                  {/* Visual Flow — Desktop: horizontal 5-col */}
                  <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                    <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-5 text-center">
                      <Cpu className="w-8 h-8 text-brand-accent mx-auto mb-3" />
                      <div className="font-semibold text-sm">{t.lastMileStep1}</div>
                      <div className="text-xs text-foreground-muted mt-1">{t.lastMileStep1Desc}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-xs text-foreground-muted mb-1">{t.lastMileArrow1}</div>
                      <div className="text-2xl text-risk-high">&rarr;</div>
                    </div>

                    <div className="bg-risk-high/10 border-2 border-risk-high/40 rounded-xl p-5 text-center relative">
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-risk-critical rounded-full animate-pulse" />
                      <Database className="w-8 h-8 text-risk-high mx-auto mb-3" />
                      <div className="font-semibold text-sm text-risk-high">{t.lastMileStep2}</div>
                      <div className="text-xs text-foreground-muted mt-1">{t.lastMileStep2Desc}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="text-xs text-foreground-muted mb-1">{t.lastMileArrow2}</div>
                      <div className="text-2xl text-risk-critical">&rarr;</div>
                    </div>

                    <div className="bg-risk-critical/10 border border-risk-critical/30 rounded-xl p-5 text-center">
                      <Skull className="w-8 h-8 text-risk-critical mx-auto mb-3" />
                      <div className="font-semibold text-sm text-risk-critical">{t.lastMileStep3}</div>
                      <div className="text-xs text-foreground-muted mt-1">{t.lastMileStep3Desc}</div>
                    </div>
                  </div>

                  {/* Visual Flow — Mobile: vertical with arrows between each card */}
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
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-risk-critical rounded-full animate-pulse" />
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
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-risk-critical/10 to-risk-high/10 border border-risk-critical/20">
                    <p className="text-sm font-semibold text-center">
                      <AlertTriangle className="w-4 h-4 inline text-risk-critical mr-2 align-middle" />
                      {t.lastMileWarning}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA to full data protection page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-foreground-muted mb-4">{t.viewFullDetailsCta}</p>
          <Link
            href="/data-protection"
            className="inline-flex items-center gap-2 bg-risk-critical hover:bg-risk-critical/80 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all card-hover"
          >
            <Shield className="w-5 h-5" />
            {t.viewFullDetails}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default DataThreatSection;
