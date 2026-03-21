'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import type { Theme } from '@/lib/translations';

export type DesignStyle =
  | 'tech-noir'
  | 'editorial'
  | 'corporate'
  | 'warm-minimal'
  | 'dark-pro'
  | 'brutalist'
  | 'newspaper'
  | 'apple-hig'
  | 'material-3'
  | 'bauhaus'
  | 'candy'
  | 'solarized-light'
  | 'ink-wash'
  | 'art-deco'
  | 'scientific'
  | 'catppuccin-latte'
  | 'oled'
  | 'terminal'
  | 'amber'
  | 'nord'
  | 'monokai'
  | 'military'
  | 'blood'
  | 'copper'
  | 'ocean'
  | 'gruvbox'
  // Brand styles
  | 'pixel'
  | 'notion'
  | 'blueprint'
  | 'neumorphism'
  | 'glassmorphism'
  | 'neon'
  | 'wireframe'
  | 'notebook';

interface StylePreset {
  id: DesignStyle;
  name: string;
  desc: string;
  theme: Theme;
  swatches: [string, string, string, string];
}

const BRAND_PRESETS: StylePreset[] = [
  { id: 'pixel', name: '▦ Pixel', desc: '8-bit retro game UI', theme: 'dark', swatches: ['#000000', '#1a1a2e', '#00FF00', '#FF0000'] },
  { id: 'notion', name: '☰ Notion', desc: 'Clean wiki, line dividers', theme: 'light', swatches: ['#FFFFFF', '#F7F6F3', '#37352F', '#EB5757'] },
  { id: 'blueprint', name: '⊞ Blueprint', desc: 'Technical drawing on blue', theme: 'dark', swatches: ['#0A2463', '#0E3489', '#FFFFFF', '#87CEEB'] },
  { id: 'neumorphism', name: '◉ Neumorphism', desc: 'Soft embossed surfaces', theme: 'light', swatches: ['#E0E5EC', '#E0E5EC', '#6B7B8D', '#2D3748'] },
  { id: 'glassmorphism', name: '◇ Glassmorphism', desc: 'Frosted glass over gradient', theme: 'dark', swatches: ['#0F0C29', '#302B63', '#FF006E', '#FFFFFF'] },
  { id: 'neon', name: '⚡ Neon', desc: 'Glowing neon signs', theme: 'dark', swatches: ['#000000', '#0A0A0A', '#FF1493', '#00BFFF'] },
  { id: 'wireframe', name: '⊡ Wireframe', desc: 'UX prototype sketch', theme: 'light', swatches: ['#FFFFFF', '#F0F0F0', '#999999', '#333333'] },
  { id: 'notebook', name: '✎ Notebook', desc: 'Lined paper, hand-placed', theme: 'light', swatches: ['#FFF8E7', '#F5EFD8', '#4169E1', '#333333'] },
];

const LIGHT_PRESETS: StylePreset[] = [
  { id: 'editorial', name: 'Editorial', desc: 'Clean typographic', theme: 'light', swatches: ['#FAFAF7', '#F3F2EF', '#DC2626', '#1A1A1A'] },
  { id: 'corporate', name: 'Corporate', desc: 'Professional & trustworthy', theme: 'light', swatches: ['#F8F9FB', '#EFF1F5', '#2563EB', '#111827'] },
  { id: 'warm-minimal', name: 'Warm Minimal', desc: 'Organic & calm', theme: 'light', swatches: ['#F5F0EB', '#EDE7E0', '#C2652A', '#2C2420'] },
  { id: 'brutalist', name: 'Brutalist', desc: 'Raw & intentional', theme: 'light', swatches: ['#FFFFFF', '#F0F0F0', '#FF0000', '#000000'] },
  { id: 'newspaper', name: 'Newspaper', desc: 'Broadsheet ink on newsprint', theme: 'light', swatches: ['#F4F1E8', '#EBE7DC', '#CC0000', '#1A1A1A'] },
  { id: 'apple-hig', name: 'Apple HIG', desc: 'System UI, clean & precise', theme: 'light', swatches: ['#FFFFFF', '#F2F2F7', '#007AFF', '#1C1C1E'] },
  { id: 'material-3', name: 'Material 3', desc: 'Google Material You', theme: 'light', swatches: ['#FFFBFE', '#F3EDF7', '#6750A4', '#1C1B1F'] },
  { id: 'bauhaus', name: 'Bauhaus', desc: 'Primary colors, geometric', theme: 'light', swatches: ['#FAFAF0', '#F0F0E0', '#E63312', '#1A1A1A'] },
  { id: 'candy', name: 'Candy Pop', desc: 'Sweet, bubbly pastels', theme: 'light', swatches: ['#FFF5F7', '#FFE4EC', '#FF1493', '#4A1942'] },
  { id: 'solarized-light', name: 'Solarized', desc: 'Classic warm tones', theme: 'light', swatches: ['#FDF6E3', '#EEE8D5', '#268BD2', '#657B83'] },
  { id: 'ink-wash', name: 'Ink Wash 水墨', desc: 'East Asian zen', theme: 'light', swatches: ['#FAF8F2', '#F0EDE4', '#2C2C2C', '#6B6B6B'] },
  { id: 'art-deco', name: 'Art Deco', desc: '1920s gold elegance', theme: 'light', swatches: ['#FBF8F0', '#F0EBD8', '#B8860B', '#2C2418'] },
  { id: 'scientific', name: 'Scientific', desc: 'LaTeX academic', theme: 'light', swatches: ['#FFFFFF', '#F5F6FA', '#1B2A4A', '#333333'] },
  { id: 'catppuccin-latte', name: 'Catppuccin', desc: 'Soothing pastels', theme: 'light', swatches: ['#EFF1F5', '#E6E9EF', '#8839EF', '#4C4F69'] },
];

const DARK_PRESETS: StylePreset[] = [
  { id: 'tech-noir', name: 'Tech Noir', desc: 'Dramatic AI aesthetic', theme: 'dark', swatches: ['#050507', '#15121a', '#ff6b35', '#fafafa'] },
  { id: 'dark-pro', name: 'Dark Pro', desc: 'Clean professional', theme: 'dark', swatches: ['#0D1117', '#161B22', '#58A6FF', '#E6EDF3'] },
  { id: 'oled', name: 'OLED Pure', desc: 'True black, white only', theme: 'dark', swatches: ['#000000', '#0A0A0A', '#FFFFFF', '#E0E0E0'] },
  { id: 'terminal', name: 'Terminal', desc: 'Green phosphor CRT', theme: 'dark', swatches: ['#000000', '#0A0F0A', '#00FF41', '#33FF66'] },
  { id: 'amber', name: 'Amber CRT', desc: 'Amber phosphor', theme: 'dark', swatches: ['#000000', '#0F0A00', '#FFB000', '#FFD580'] },
  { id: 'nord', name: 'Nord', desc: 'Arctic frost palette', theme: 'dark', swatches: ['#000000', '#0A0E14', '#88C0D0', '#ECEFF4'] },
  { id: 'monokai', name: 'Monokai', desc: 'Classic editor', theme: 'dark', swatches: ['#000000', '#0A0A08', '#F92672', '#F8F8F2'] },
  { id: 'military', name: 'Military', desc: 'Tactical operations', theme: 'dark', swatches: ['#000000', '#0A0C06', '#4B5320', '#C8B560'] },
  { id: 'blood', name: 'Blood', desc: 'Deep crimson', theme: 'dark', swatches: ['#000000', '#0A0000', '#CC0000', '#E0C0C0'] },
  { id: 'copper', name: 'Copper', desc: 'Warm metallic', theme: 'dark', swatches: ['#000000', '#0F0A06', '#B87333', '#DEB887'] },
  { id: 'ocean', name: 'Ocean Depth', desc: 'Deep sea turquoise', theme: 'dark', swatches: ['#000000', '#000A0C', '#00CED1', '#B0E0E6'] },
  { id: 'gruvbox', name: 'Gruvbox', desc: 'Retro warm editor', theme: 'dark', swatches: ['#000000', '#0A0806', '#FE8019', '#EBDBB2'] },
];

const ALL_PRESETS = [...BRAND_PRESETS, ...LIGHT_PRESETS, ...DARK_PRESETS];

export function StyleSwitcherButton({
  style,
  onStyleChange,
}: {
  style: DesignStyle;
  onStyleChange: (style: DesignStyle, theme: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<number | null>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const applyPreset = useCallback(
    (id: DesignStyle, showToast = false) => {
      const preset = ALL_PRESETS.find((p) => p.id === id)!;
      document.documentElement.setAttribute('data-style', id);
      document.documentElement.setAttribute('data-theme', preset.theme);
      localStorage.setItem('air-style', id);
      localStorage.setItem('air-theme', preset.theme);
      onStyleChange(id, preset.theme);
      if (showToast) {
        setToast(preset.name);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => setToast(null), 1200);
      }
    },
    [onStyleChange],
  );

  // Keyboard: arrow up/down cycles themes (when panel open OR globally)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
      const idx = ALL_PRESETS.findIndex((p) => p.id === style);
      const next =
        e.key === 'ArrowDown'
          ? (idx + 1) % ALL_PRESETS.length
          : (idx - 1 + ALL_PRESETS.length) % ALL_PRESETS.length;
      applyPreset(ALL_PRESETS[next].id, true);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [style, applyPreset]);

  const renderPreset = (preset: StylePreset) => (
    <button
      key={preset.id}
      onClick={() => {
        applyPreset(preset.id);
        setOpen(false);
      }}
      className="w-full flex items-center gap-2.5 px-2.5 py-2 text-left transition-colors"
      style={{
        borderRadius: 'var(--radius-md)',
        background: style === preset.id ? 'var(--overlay-8)' : undefined,
        color: 'var(--foreground)',
      }}
      onMouseEnter={(e) => {
        if (style !== preset.id) e.currentTarget.style.background = 'var(--overlay-4)';
      }}
      onMouseLeave={(e) => {
        if (style !== preset.id) e.currentTarget.style.background = 'transparent';
      }}
    >
      <div
        className="flex-shrink-0 flex overflow-hidden"
        style={{ borderRadius: 3, border: '1px solid var(--overlay-8)' }}
      >
        {preset.swatches.map((c, i) => (
          <div key={i} style={{ width: 9, height: 24, background: c }} />
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium leading-tight">{preset.name}</div>
        <div className="text-[11px] leading-tight mt-0.5" style={{ color: 'var(--foreground-muted)' }}>
          {preset.desc}
        </div>
      </div>
      {style === preset.id && (
        <span className="text-xs flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
          ✓
        </span>
      )}
    </button>
  );

  const sectionHeader = (label: string) => (
    <div className="px-3 py-1.5 border-b" style={{ borderColor: 'var(--overlay-6)' }}>
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
        {label}
      </span>
    </div>
  );

  return (
    <div ref={ref} className="relative">
      {/* Toast indicator for keyboard navigation */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed left-1/2 z-[200] px-5 py-2.5 text-sm font-semibold pointer-events-none"
            style={{
              top: 'calc(var(--safe-top) + 1rem)',
              transform: 'translateX(-50%)',
              background: 'var(--surface)',
              color: 'var(--foreground)',
              border: '1px solid var(--overlay-12)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 8px 24px var(--shadow-heavy)',
            }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((prev) => !prev)}
        className="z-50 flex items-center justify-center w-11 h-11 bg-surface-elevated hover:bg-accent-purple/80 text-foreground hover:text-white rounded-lg border border-surface-elevated transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch design style"
        aria-expanded={open}
      >
        <Palette className="w-5 h-5" />
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1.5 w-64 overflow-hidden z-[100]"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--overlay-10)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 16px 40px var(--shadow-heavy)',
              maxHeight: '70vh',
              overflowY: 'auto',
            }}
          >
            {sectionHeader('✦ Brand')}
            <div className="p-1.5">{BRAND_PRESETS.map(renderPreset)}</div>
            {sectionHeader('☀ Light')}
            <div className="p-1.5">{LIGHT_PRESETS.map(renderPreset)}</div>
            {sectionHeader('● Dark')}
            <div className="p-1.5">{DARK_PRESETS.map(renderPreset)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
