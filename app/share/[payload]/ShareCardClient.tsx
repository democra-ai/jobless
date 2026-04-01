'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import type { ShareLang } from '@/lib/share_payload';

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
  ac: string; // accent color
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

const LANGS: Array<{ code: ShareLang; label: string; flag: string }> = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'zh', label: 'ZH', flag: '🇨🇳' },
  { code: 'ja', label: 'JA', flag: '🇯🇵' },
  { code: 'ko', label: 'KO', flag: '🇰🇷' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShareCardClient({ data }: { data: ShareCardData }) {
  const [lang, setLang] = useState<ShareLang>(data.defaultLang);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Read theme from document
    const currentTheme = document.documentElement.getAttribute('data-theme') as 'dark' | 'light' | null;
    if (currentTheme) setTheme(currentTheme);
    // Read lang from localStorage
    const storedLang = localStorage.getItem('air-lang') as ShareLang | null;
    if (storedLang && ['en', 'zh', 'ja', 'ko', 'de'].includes(storedLang)) {
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const nextStyle = next === 'light' ? 'editorial' : 'oled';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.setAttribute('data-style', nextStyle);
    localStorage.setItem('air-theme', next);
    localStorage.setItem('air-style', nextStyle);
  };

  const switchLang = (newLang: ShareLang) => {
    setLang(newLang);
    localStorage.setItem('air-lang', newLang);
    setLangOpen(false);
  };

  const { prob, ac, profileCode, profile, dimensions, calibration, adviceList, activeStageIdx, isInfinity, predictedYear, earliestYear, latestYear } = data;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 bg-background transition-colors duration-300">
      <div className="w-full max-w-[420px]">

        {/* ── Controls: Lang + Theme ── */}
        <div className="flex items-center justify-end gap-2 mb-3">
          {/* Language */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(v => !v)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-elevated border border-overlay-8 text-foreground-muted hover:text-foreground transition-colors text-xs font-bold"
            >
              {lang.toUpperCase()}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-32 rounded-lg border border-overlay-10 bg-surface-elevated shadow-lg overflow-hidden z-50">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLang(l.code)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:bg-overlay-8 ${
                      lang === l.code ? 'text-foreground font-bold' : 'text-foreground-muted'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-surface-elevated border border-overlay-8 text-foreground-muted hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* ━━━ THE CARD ━━━ */}
        <div
          className="relative overflow-hidden bg-surface transition-colors duration-300"
          style={{ border: '1px solid var(--overlay-6)', borderRadius: '2px' }}
        >
          {/* Accent color wash */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ background: `radial-gradient(ellipse 100% 50% at 50% 0%, ${ac}, transparent)` }}
          />

          {/* ── Hero: Character + Identity ── */}
          <div className="relative pt-5 px-5 pb-4">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-[9px] font-bold uppercase tracking-[0.2em] pl-2"
                style={{ color: ac, borderLeft: `2px solid ${ac}` }}
              >
                AI Replacement Index
              </span>
              <span className="text-[9px] text-foreground-muted/20">
                air.democra.ai
              </span>
            </div>

            {profileCode && profile ? (
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div
                    className="absolute inset-0 blur-[30px] opacity-25 rounded-full"
                    style={{ backgroundColor: ac }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/characters/${profileCode}.png`}
                    alt={L(profile.archetype, lang)}
                    className="relative w-28 h-28 sm:w-32 sm:h-32 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0 pt-2">
                  <h1
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-[0.95]"
                    style={{ color: ac }}
                  >
                    {L(profile.archetype, lang)}
                  </h1>
                  <div
                    className="mt-1.5 text-xs font-bold tracking-[0.3em]"
                    style={{ color: `${ac}55`, fontFamily: 'var(--font-body)' }}
                  >
                    {profileCode}
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-foreground-muted/50">
                    {L(profile.tagline, lang)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-2">
                <div className="text-4xl font-extrabold" style={{ color: ac }}>{prob}%</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: ac }}>{L(data.riskLabel, lang)}</div>
              </div>
            )}
          </div>

          {/* ── Gauge strip ── */}
          <div className="px-5 pb-4">
            <div className="flex gap-[2px]">
              {GAUGE_STAGES.map((stage, i) => {
                const segStart = i * 20;
                const segEnd = segStart + 20;
                const fill = prob >= segEnd ? 1 : prob <= segStart ? 0 : (prob - segStart) / 20;
                const isActive = i === activeStageIdx;
                return (
                  <div key={i} className="flex-1">
                    <div className="relative h-1 overflow-hidden bg-foreground/[0.04]" style={{ borderRadius: '1px' }}>
                      {fill > 0 && (
                        <div className="absolute inset-y-0 left-0" style={{ width: `${fill * 100}%`, backgroundColor: stage.color, borderRadius: '1px' }} />
                      )}
                    </div>
                    <div
                      className="mt-1 text-center"
                      style={{ fontSize: '7px', fontWeight: 800, letterSpacing: '0.12em', color: isActive ? stage.color : 'var(--foreground-dim)' }}
                    >
                      {lang === 'zh' ? stage.zh : stage.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="h-px mx-5 bg-foreground/[0.05]" />

          {/* ── Metrics ── */}
          <div className="px-5 py-4 flex items-baseline gap-6">
            <div>
              <div className="flex items-baseline">
                <span className="tabular-nums leading-none" style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 700, color: ac }}>
                  {prob}
                </span>
                <span className="leading-none ml-0.5" style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: `${ac}70` }}>
                  %
                </span>
              </div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.1em] font-medium text-foreground-muted/40">
                {t('replProb', lang)}
              </div>
            </div>
            <div>
              <span className="tabular-nums leading-none text-foreground" style={{ fontFamily: 'var(--font-body)', fontSize: '2.5rem', fontWeight: 700 }}>
                {isInfinity ? '\u221E' : predictedYear}
              </span>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.1em] font-medium text-foreground-muted/40">
                {t('predYear', lang)}
              </div>
              {!isInfinity && (
                <div className="text-[9px] font-mono text-foreground-muted/20">
                  {t('range', lang)} {earliestYear}&ndash;{latestYear}
                </div>
              )}
            </div>
          </div>

          {/* ── 4-Dimension DNA ── */}
          {dimensions.length === 4 && (
            <div className="flex mx-5 mb-4 border-t border-foreground/[0.04]">
              {dimensions.map((dim, i) => {
                const label = dim.isFavorable ? L(dim.favorableLabel, lang) : L(dim.resistantLabel, lang);
                return (
                  <div
                    key={dim.dimensionId}
                    className="flex-1 pt-3"
                    style={{ borderLeft: i > 0 ? '1px solid var(--overlay-4)' : undefined }}
                  >
                    <div className="h-[3px] w-6 mb-2 mx-2" style={{ backgroundColor: dim.color, opacity: 0.6, borderRadius: '1px' }} />
                    <div className="px-2">
                      <div className="text-base font-bold leading-none" style={{ color: dim.color, fontFamily: 'var(--font-body)' }}>
                        {dim.letter}
                      </div>
                      <div className="mt-1 text-[8px] uppercase tracking-[0.06em] font-medium leading-tight text-foreground-muted/25">
                        {L(dim.name, lang)}
                      </div>
                      <div className="mt-0.5 text-[9px] font-semibold leading-tight" style={{ color: `${dim.color}88` }}>
                        {label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Superpower + Kryptonite ── */}
          {profile && (
            <div className="mx-5 mb-4 space-y-3 border-t border-foreground/[0.04] pt-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-[3px] h-3 rounded-sm" style={{ backgroundColor: '#34d399' }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: '#34d39988' }}>
                    {t('superpower', lang)}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed pl-[9px] text-foreground/70">
                  {L(profile.superpower, lang)}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-[3px] h-3 rounded-sm" style={{ backgroundColor: '#f43f5e' }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: '#f43f5e88' }}>
                    {t('kryptonite', lang)}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed pl-[9px] text-foreground/70">
                  {L(profile.kryptonite, lang)}
                </p>
              </div>
            </div>
          )}

          {/* ── Vulnerability + Defense ── */}
          {calibration && (
            <div className="mx-5 mb-4 py-3 border-t border-foreground/[0.04]">
              <p className="text-[10px] leading-relaxed text-foreground-muted/40">
                <span style={{ color: '#f43f5e77' }}>&#9632;</span>{' '}
                {L(calibration.vulnerabilities, lang)}
              </p>
              <p className="text-[10px] leading-relaxed mt-2 text-foreground-muted/40">
                <span style={{ color: '#34d39977' }}>&#9632;</span>{' '}
                {L(calibration.strengths, lang)}
              </p>
            </div>
          )}

          {/* ── Action items ── */}
          {adviceList.length > 0 && (
            <div className="mx-5 mb-4 border-t border-foreground/[0.04] pt-2.5">
              {adviceList.slice(0, 3).map((advice, ai) => (
                <div
                  key={ai}
                  className="flex items-baseline gap-2 py-2"
                  style={{ borderBottom: ai < 2 ? '1px solid var(--overlay-2)' : undefined }}
                >
                  <span
                    className="text-[9px] font-bold tabular-nums flex-shrink-0"
                    style={{ color: ai === 0 ? ac : 'var(--foreground-dim)', fontFamily: 'var(--font-body)' }}
                  >
                    {String(ai + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold" style={{ color: ai === 0 ? 'var(--foreground)' : 'var(--foreground-muted)' }}>
                      {L(advice.title, lang)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CTA bar ── */}
          <Link
            href="/#risk-calculator"
            className="group flex items-center justify-between w-full py-3.5 px-5 transition-colors duration-300"
            style={{ backgroundColor: ac, color: '#0a0908' }}
          >
            <span className="text-sm font-bold tracking-tight">
              {t('takeSelf', lang)}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </main>
  );
}
