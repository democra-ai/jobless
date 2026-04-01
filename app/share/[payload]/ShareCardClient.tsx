'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { ShareLang } from '@/lib/share_payload';
import type { Language, Theme } from '@/lib/translations';
import { getHtmlLang } from '@/lib/translations';
import { LanguageButton, ThemeButton } from '@/components/NavigationControls';
import { Particles } from '@/components/ui/particles';
import { MagicCard } from '@/components/ui/magic-card';
import { BorderBeam } from '@/components/ui/border-beam';

// ─── Types ───────────────────────────────────────────────────────────────────

type L10nObj = { en: string; zh: string; ja?: string; ko?: string; de?: string };

export type ShareCardData = {
  defaultLang: ShareLang;
  prob: number;
  predictedYear: number;
  isInfinity: boolean;
  earliestYear: number;
  latestYear: number;
  activeStageIdx: number;
  ac: string;
  profileCode: string | null;
  profile: {
    archetype: L10nObj;
    tagline: L10nObj;
    superpower: L10nObj;
    kryptonite: L10nObj;
    color?: string;
  } | null;
  riskLabel: Record<ShareLang, string>;
  dimensions: Array<{
    letter: string;
    dimensionId: string;
    isFavorable: boolean;
    name: L10nObj;
    favorableLabel: L10nObj;
    resistantLabel: L10nObj;
    color: string;
  }>;
  calibration: {
    vulnerabilities: L10nObj;
    strengths: L10nObj;
  } | null;
  adviceList: Array<{
    icon: string;
    title: L10nObj;
    body: L10nObj;
  }>;
};

// ─── i18n ────────────────────────────────────────────────────────────────────

function L(obj: L10nObj, lang: ShareLang): string {
  return (obj as Record<string, string>)[lang] ?? obj.en;
}

const UI: Record<string, Record<ShareLang, string>> = {
  replProb:    { en: 'replacement probability', zh: '替代概率', ja: '代替確率', ko: '대체 확률', de: 'Ersetzungswahrscheinlichkeit' },
  predYear:    { en: 'predicted year', zh: '预测年份', ja: '予測年', ko: '예측 연도', de: 'Prognosejahr' },
  takeSelf:    { en: 'What\u2019s your risk?', zh: '测测你的风险', ja: 'あなたのリスクは?', ko: '당신의 리스크는?', de: 'Ihr Risiko?' },
  superpower:  { en: 'Superpower', zh: '超能力', ja: '超能力', ko: '초능력', de: 'Superkraft' },
  kryptonite:  { en: 'Weakness', zh: '弱点', ja: '弱点', ko: '약점', de: 'Schwäche' },
  range:       { en: 'Range', zh: '区间', ja: '範囲', ko: '범위', de: 'Bereich' },
};

function t(key: string, lang: ShareLang): string {
  return UI[key]?.[lang] ?? UI[key]?.en ?? key;
}

const GAUGE_STAGES = [
  { label: 'SAFE', zh: '安全', color: '#34d399' },
  { label: 'ASSIST', zh: '辅助', color: '#4ade80' },
  { label: 'AGENT', zh: '代理', color: '#fbbf24' },
  { label: 'LEAD', zh: '主导', color: '#fb923c' },
  { label: 'KILL', zh: '斩杀', color: '#f43f5e' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShareCardClient({ data }: { data: ShareCardData }) {
  const [lang, setLang] = useState<Language>(data.defaultLang as Language);
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('air-theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    const style = (saved ?? 'dark') === 'light' ? 'editorial' : 'oled';
    document.documentElement.setAttribute('data-style', style);
    localStorage.setItem('air-style', style);

    const storedLang = localStorage.getItem('air-lang') as Language | null;
    if (storedLang && ['en', 'zh', 'ja', 'ko', 'de'].includes(storedLang)) {
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(lang);
    document.documentElement.setAttribute('data-ui-lang', lang);
    localStorage.setItem('air-lang', lang);
  }, [lang]);

  const shareLang = lang as ShareLang;
  const { prob, ac, profileCode, profile, dimensions, calibration, adviceList, activeStageIdx, isInfinity, predictedYear, earliestYear, latestYear } = data;

  // Border beam colors based on accent
  const beamFrom = theme === 'dark' ? '#ffffff' : ac;
  const beamTo = theme === 'dark' ? '#c4b5fd' : '#ff1744';

  return (
    <main className="min-h-screen overflow-x-hidden relative" data-ui-lang={lang}>
      {/* Particles background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles className="absolute inset-0" quantity={120} staticity={40} ease={60} color={theme === 'dark' ? '#ffffff' : '#ff6b35'} size={theme === 'dark' ? 0.5 : 0.4} />
        <Particles className="absolute inset-0" quantity={60} staticity={60} ease={80} color={theme === 'dark' ? '#c4b5fd' : '#ff1744'} size={theme === 'dark' ? 0.3 : 0.3} />
      </div>

      {/* Top-right controls */}
      <div className="fixed z-[96] flex flex-col gap-2" style={{ top: 'calc(var(--safe-top) + 1rem)', right: 'calc(var(--safe-right) + 1rem)' }}>
        <LanguageButton lang={lang} setLang={setLang} />
        <ThemeButton theme={theme} setTheme={setTheme} />
      </div>

      {/* ━━━ CONTENT ━━━ */}
      <div className="relative z-[2] min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">

        {/* Desktop: two-column / Mobile: single column */}
        <div className="w-full max-w-[920px]">
          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">

            {/* ══ LEFT: Hero Card (character + identity + gauge) ══ */}
            <div className="lg:flex-1 lg:sticky lg:top-12">
              <MagicCard className="card-glow-border card-hover rounded-2xl">
                {/* BorderBeam */}
                <div className="absolute -inset-3 rounded-2xl overflow-hidden pointer-events-none z-[45]">
                  <BorderBeam size={150} duration={10} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1.5} />
                </div>

                <div className="p-5 sm:p-6">
                  {/* Top bar */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] pl-2" style={{ color: ac, borderLeft: `2px solid ${ac}` }}>
                      AI Replacement Index
                    </span>
                    <span className="text-[9px] text-foreground-muted/20">air.democra.ai</span>
                  </div>

                  {/* Character + Identity */}
                  {profileCode && profile ? (
                    <div className="flex flex-col items-center text-center lg:items-center">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 blur-[40px] opacity-25 rounded-full" style={{ backgroundColor: ac }} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/characters/${profileCode}.png`}
                          alt={L(profile.archetype, shareLang)}
                          className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 object-contain"
                        />
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[0.95]" style={{ color: ac }}>
                        {L(profile.archetype, shareLang)}
                      </h1>
                      <div className="mt-1.5 text-xs font-bold tracking-[0.3em]" style={{ color: `${ac}55`, fontFamily: 'var(--font-body)' }}>
                        {profileCode}
                      </div>
                      <p className="mt-3 text-[11px] sm:text-xs leading-relaxed text-foreground-muted/50 max-w-xs">
                        {L(profile.tagline, shareLang)}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-5xl font-extrabold" style={{ color: ac }}>{prob}%</div>
                      <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ac }}>{L(data.riskLabel, shareLang)}</div>
                    </div>
                  )}

                  {/* Gauge strip */}
                  <div className="mt-6">
                    <div className="flex gap-[2px]">
                      {GAUGE_STAGES.map((stage, i) => {
                        const segStart = i * 20;
                        const segEnd = segStart + 20;
                        const fill = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
                        const isActive = i === activeStageIdx;
                        return (
                          <div key={i} className="flex-1">
                            <div className="relative h-1.5 overflow-hidden bg-foreground/[0.04] rounded-sm">
                              {fill > 0 && (
                                <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: `${fill * 100}%`, backgroundColor: stage.color }} />
                              )}
                            </div>
                            <div className="mt-1.5 text-center" style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.12em', color: isActive ? stage.color : 'var(--foreground-dim)' }}>
                              {shareLang === 'zh' ? stage.zh : stage.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mt-5 pt-5 border-t border-foreground/[0.05] flex items-baseline justify-center gap-8">
                    <div className="text-center">
                      <div className="flex items-baseline justify-center">
                        <span className="tabular-nums leading-none" style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 700, color: ac }}>{prob}</span>
                        <span className="leading-none ml-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: `${ac}70` }}>%</span>
                      </div>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.1em] font-medium text-foreground-muted/40">{t('replProb', shareLang)}</div>
                    </div>
                    <div className="w-px h-10 bg-foreground/[0.06]" />
                    <div className="text-center">
                      <span className="tabular-nums leading-none text-foreground" style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 700 }}>
                        {isInfinity ? '\u221E' : predictedYear}
                      </span>
                      <div className="mt-1 text-[9px] uppercase tracking-[0.1em] font-medium text-foreground-muted/40">{t('predYear', shareLang)}</div>
                      {!isInfinity && (
                        <div className="text-[9px] font-mono text-foreground-muted/20">{earliestYear}&ndash;{latestYear}</div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/#risk-calculator"
                    className="group flex items-center justify-center gap-2 w-full mt-6 py-3 rounded-lg transition-all duration-300 hover:brightness-110 text-sm font-bold"
                    style={{ backgroundColor: ac, color: '#0a0908' }}
                  >
                    {t('takeSelf', shareLang)}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </MagicCard>
            </div>

            {/* ══ RIGHT: Details (dimensions, strengths, advice) ══ */}
            <div className="mt-4 lg:mt-0 lg:flex-1 space-y-4">

              {/* 4-Dimension DNA */}
              {dimensions.length === 4 && (
                <MagicCard className="card-glow-border card-hover rounded-2xl">
                  <div className="absolute -inset-3 rounded-2xl overflow-hidden pointer-events-none z-[45]">
                    <BorderBeam size={100} duration={12} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1} delay={2} />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex">
                      {dimensions.map((dim, i) => {
                        const label = dim.isFavorable ? L(dim.favorableLabel, shareLang) : L(dim.resistantLabel, shareLang);
                        return (
                          <div key={dim.dimensionId} className="flex-1 pt-1" style={{ borderLeft: i > 0 ? '1px solid var(--overlay-4)' : undefined }}>
                            <div className="h-[3px] w-6 mb-2 mx-2 rounded-sm" style={{ backgroundColor: dim.color, opacity: 0.6 }} />
                            <div className="px-2">
                              <div className="text-lg sm:text-xl font-bold leading-none" style={{ color: dim.color, fontFamily: 'var(--font-body)' }}>{dim.letter}</div>
                              <div className="mt-1 text-[8px] uppercase tracking-[0.06em] font-medium leading-tight text-foreground-muted/25">{L(dim.name, shareLang)}</div>
                              <div className="mt-0.5 text-[9px] font-semibold leading-tight" style={{ color: `${dim.color}88` }}>{label}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </MagicCard>
              )}

              {/* Superpower + Kryptonite */}
              {profile && (
                <MagicCard className="card-glow-border card-hover rounded-2xl">
                  <div className="absolute -inset-3 rounded-2xl overflow-hidden pointer-events-none z-[45]">
                    <BorderBeam size={100} duration={14} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1} delay={4} />
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-[3px] h-3.5 rounded-sm" style={{ backgroundColor: '#34d399' }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: '#34d39988' }}>{t('superpower', shareLang)}</span>
                      </div>
                      <p className="text-xs leading-relaxed pl-[10px] text-foreground/70">{L(profile.superpower, shareLang)}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <div className="w-[3px] h-3.5 rounded-sm" style={{ backgroundColor: '#f43f5e' }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: '#f43f5e88' }}>{t('kryptonite', shareLang)}</span>
                      </div>
                      <p className="text-xs leading-relaxed pl-[10px] text-foreground/70">{L(profile.kryptonite, shareLang)}</p>
                    </div>
                  </div>
                </MagicCard>
              )}

              {/* Vulnerability + Defense */}
              {calibration && (
                <MagicCard className="card-glow-border card-hover rounded-2xl">
                  <div className="absolute -inset-3 rounded-2xl overflow-hidden pointer-events-none z-[45]">
                    <BorderBeam size={80} duration={16} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1} delay={6} />
                  </div>
                  <div className="p-4 sm:p-5 space-y-3">
                    <p className="text-[11px] leading-relaxed text-foreground-muted/50">
                      <span style={{ color: '#f43f5e77' }}>&#9632;</span>{' '}{L(calibration.vulnerabilities, shareLang)}
                    </p>
                    <p className="text-[11px] leading-relaxed text-foreground-muted/50">
                      <span style={{ color: '#34d39977' }}>&#9632;</span>{' '}{L(calibration.strengths, shareLang)}
                    </p>
                  </div>
                </MagicCard>
              )}

              {/* Action items */}
              {adviceList.length > 0 && (
                <MagicCard className="card-glow-border card-hover rounded-2xl">
                  <div className="absolute -inset-3 rounded-2xl overflow-hidden pointer-events-none z-[45]">
                    <BorderBeam size={80} duration={18} colorFrom={beamFrom} colorTo={beamTo} borderWidth={1} delay={8} />
                  </div>
                  <div className="p-4 sm:p-5">
                    {adviceList.slice(0, 3).map((advice, ai) => (
                      <div key={ai} className="flex items-baseline gap-2.5 py-2.5" style={{ borderBottom: ai < 2 ? '1px solid var(--overlay-3)' : undefined }}>
                        <span className="text-[10px] font-bold tabular-nums flex-shrink-0" style={{ color: ai === 0 ? ac : 'var(--foreground-dim)', fontFamily: 'var(--font-body)' }}>
                          {String(ai + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0">
                          <span className="text-xs font-semibold" style={{ color: ai === 0 ? 'var(--foreground)' : 'var(--foreground-muted)' }}>
                            {L(advice.title, shareLang)}
                          </span>
                          <span className="text-[11px] ml-1.5 text-foreground-muted/30">{L(advice.body, shareLang)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </MagicCard>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
