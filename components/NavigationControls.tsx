'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, Sun, Moon, Activity, Target, Shield, Clock } from 'lucide-react';
import { Language, Theme, MobileSection, SUPPORTED_LANGUAGES } from '@/lib/translations';
import { trackThemeToggle, trackLangToggle, trackNavigation } from '@/lib/analytics';

// 语言切换按钮（下拉选择）
export function LanguageButton({ lang, setLang }: { lang: Language; setLang: (lang: Language) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="z-50 flex items-center justify-center bg-surface-elevated hover:bg-risk-high/80 text-foreground hover:text-white w-11 h-11 rounded-lg border border-surface-elevated transition-all card-hover lang-toggle-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <span className="text-sm font-bold leading-none">{current?.code.toUpperCase()}</span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1.5 w-36 rounded-lg border border-surface-elevated bg-surface-elevated backdrop-blur-xl shadow-lg overflow-hidden z-[100]"
          >
            {SUPPORTED_LANGUAGES.map((l, i) => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); trackLangToggle(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-colors hover:bg-risk-high/20 ${
                  lang === l.code
                    ? 'bg-risk-high/15 text-risk-high font-semibold'
                    : 'text-foreground'
                } ${i > 0 ? 'border-t border-surface-elevated/60' : ''}`}
              >
                <span className="text-base leading-none">{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && <span className="ml-auto text-xs opacity-60">&#10003;</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 主题切换按钮
export function ThemeButton({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  return (
    <motion.button
      onClick={() => {
        const next = theme === 'dark' ? 'light' : 'dark';
        const nextStyle = next === 'light' ? 'editorial' : 'oled';
        setTheme(next);
        document.documentElement.setAttribute('data-theme', next);
        document.documentElement.setAttribute('data-style', nextStyle);
        localStorage.setItem('air-theme', next);
        localStorage.setItem('air-style', nextStyle);
        trackThemeToggle(next);
      }}
      className="z-50 flex items-center justify-center w-11 h-11 bg-surface-elevated hover:bg-brand-accent/80 text-foreground hover:text-white rounded-lg border border-surface-elevated transition-all theme-toggle-btn"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </motion.button>
  );
}

export function MobileBottomNav({
  lang,
  activeSection,
  onNavigate,
}: {
  lang: Language;
  activeSection: MobileSection;
  onNavigate: (section: MobileSection) => void;
}) {
  const navLabels: Record<MobileSection, Record<Language, string>> = {
    overview: { en: 'Overview', zh: '概览', ja: '概要', ko: '개요', de: 'Übersicht' },
    risk: { en: 'Risk', zh: '评估', ja: 'リスク', ko: '위험', de: 'Risiko' },
    threat: { en: 'Threat', zh: '数据威胁', ja: '脅威', ko: '위협', de: 'Bedrohung' },
    timeline: { en: 'Timeline', zh: '时间线', ja: '年表', ko: '타임라인', de: 'Zeitstrahl' },
  };
  const navItems: Array<{
    id: MobileSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'overview', label: navLabels.overview[lang], icon: Activity },
    { id: 'risk', label: navLabels.risk[lang], icon: Target },
    { id: 'threat', label: navLabels.threat[lang], icon: Shield },
    { id: 'timeline', label: navLabels.timeline[lang], icon: Clock },
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<MobileSection, HTMLButtonElement | null>>({
    overview: null,
    risk: null,
    threat: null,
    timeline: null,
  });
  const [pill, setPill] = useState({ x: 0, width: 0, ready: false });

  const syncPill = useCallback(() => {
    const track = trackRef.current;
    const activeButton = buttonRefs.current[activeSection];
    if (!track || !activeButton) return;

    const x = activeButton.offsetLeft;
    const width = activeButton.offsetWidth;
    setPill((prev) => {
      const changed = prev.x !== x || prev.width !== width || !prev.ready;
      if (!changed) return prev;
      return { x, width, ready: true };
    });
  }, [activeSection]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(syncPill);
    const onResize = () => syncPill();
    window.addEventListener('resize', onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [syncPill]);

  return (
    <div className="mobile-bottom-nav sm:hidden fixed left-0 right-0 z-[95] px-3" style={{ bottom: 'calc(var(--safe-bottom) + 0.55rem)' }}>
      <nav
        className="rounded-2xl border p-1.5 backdrop-blur-xl"
        style={{
          background: 'color-mix(in srgb, var(--surface) 90%, transparent)',
          borderColor: 'var(--overlay-12)',
          boxShadow: '0 16px 36px var(--shadow-soft)',
        }}
        aria-label={{ en: 'Mobile navigation', zh: '移动端导航', ja: 'モバイルナビゲーション', ko: '모바일 내비게이션', de: 'Mobile Navigation' }[lang]}
      >
        <div ref={trackRef} className="relative grid grid-cols-4 gap-1">
          <motion.div
            initial={false}
            className="pointer-events-none absolute top-0 bottom-0 rounded-xl"
            animate={{ x: pill.x, width: pill.width, opacity: pill.ready ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }}
            style={{
              background: 'var(--pill-gradient)',
              boxShadow: 'var(--pill-shadow)',
            }}
          />
          {navItems.map((item) => {
            const active = activeSection === item.id;
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                ref={(el) => { buttonRefs.current[item.id] = el; }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { onNavigate(item.id); trackNavigation(item.id); }}
                className="relative z-10 flex min-h-[48px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-[11px] font-medium transition-all"
                style={{
                  color: active ? '#fff' : 'var(--foreground-muted)',
                }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="w-4 h-4" />
                <span className="leading-none whitespace-nowrap">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
