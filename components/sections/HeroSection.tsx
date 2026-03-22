'use client';

import React from 'react';
import { Eye, Zap, TrendingDown, ArrowDown } from 'lucide-react';
import { Language, translations } from '@/lib/translations';
import { trackCtaClick } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { BorderBeam } from '@/components/ui/border-beam';

function HeroSection({ lang, t }: { lang: Language; t: typeof translations.en }) {
  return (
    <section className="relative pt-20 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-32 overflow-hidden">
      {/* Subtle gradient blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, var(--brand-primary), transparent 70%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Badge */}
        <BlurFade delay={0.05} inView>
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase border"
              style={{ borderColor: 'var(--overlay-10)', color: 'var(--foreground-muted)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-risk-critical animate-pulse" />
              {t.alertBadge}
            </span>
          </div>
        </BlurFade>

        {/* Main headline — massive, centered */}
        <BlurFade delay={0.15} inView>
          <h1 className="text-center text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] font-extrabold tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--foreground)' }}>
            {t.heroTitle}
          </h1>
        </BlurFade>

        <BlurFade delay={0.25} inView>
          <p className="text-center text-lg sm:text-xl max-w-2xl mx-auto mb-16 leading-relaxed"
            style={{ color: 'var(--foreground-muted)' }}>
            {t.heroSubtitlePre}{t.heroSubtitlePost}{t.heroSubtitleEnd}
          </p>
        </BlurFade>

        {/* Stats row — big numbers */}
        <BlurFade delay={0.35} inView>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
            {[
              { value: 34.8, suffix: '%', decimals: 1, label: t.exposureLabel, icon: Eye, color: '#ff5722' },
              { value: 71.3, suffix: '%', decimals: 1, label: t.proficiencyLabel, icon: Zap, color: '#d4a574' },
              { value: 92, suffix: 'M', decimals: 0, label: t.jobsBy2030, icon: TrendingDown, color: '#ff1744' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <BlurFade key={i} delay={0.4 + i * 0.1} inView>
                  <div className="relative rounded-2xl p-6 sm:p-8 overflow-hidden text-center"
                    style={{ background: 'var(--surface)', border: '1px solid var(--surface-elevated)' }}>
                    <BorderBeam size={80} duration={10 + i * 2} colorFrom={stat.color} colorTo="transparent" borderWidth={1} delay={i * 2} />
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--foreground-dim)' }}>
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: stat.color, fontVariantNumeric: 'tabular-nums' }}>
                      <NumberTicker value={stat.value} decimalPlaces={stat.decimals} delay={0.6 + i * 0.15} className="text-inherit" />
                      <span className="text-2xl sm:text-3xl ml-0.5">{stat.suffix}</span>
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>
        </BlurFade>

        {/* CTA */}
        <BlurFade delay={0.7} inView>
          <div className="flex justify-center">
            <button
              onClick={() => { trackCtaClick('scroll_to_calculator', 'hero'); document.getElementById('risk-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="group flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'var(--brand-primary)',
                color: '#fff',
                boxShadow: '0 8px 30px -4px rgba(255,107,53,0.35)',
              }}
            >
              {t.transitionCta}
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

export default HeroSection;
