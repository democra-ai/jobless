'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';
import type { Theme } from '@/lib/translations';

export type DesignStyle = 'tech-noir' | 'editorial' | 'corporate' | 'warm-minimal' | 'dark-pro' | 'brutalist';

interface StylePreset {
  id: DesignStyle;
  name: string;
  desc: string;
  theme: Theme;
  swatches: [string, string, string, string];
}

const PRESETS: StylePreset[] = [
  {
    id: 'tech-noir',
    name: 'Tech Noir',
    desc: 'Dramatic AI aesthetic with glows',
    theme: 'dark',
    swatches: ['#050507', '#15121a', '#ff6b35', '#fafafa'],
  },
  {
    id: 'editorial',
    name: 'Editorial',
    desc: 'Clean typographic, newspaper-inspired',
    theme: 'light',
    swatches: ['#FAFAF7', '#F3F2EF', '#DC2626', '#1A1A1A'],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    desc: 'Professional & trustworthy',
    theme: 'light',
    swatches: ['#F8F9FB', '#EFF1F5', '#2563EB', '#111827'],
  },
  {
    id: 'warm-minimal',
    name: 'Warm Minimal',
    desc: 'Organic & calm, earth tones',
    theme: 'light',
    swatches: ['#F5F0EB', '#EDE7E0', '#C2652A', '#2C2420'],
  },
  {
    id: 'dark-pro',
    name: 'Dark Pro',
    desc: 'Clean professional dark',
    theme: 'dark',
    swatches: ['#0D1117', '#161B22', '#58A6FF', '#E6EDF3'],
  },
  {
    id: 'brutalist',
    name: 'Brutalist',
    desc: 'Raw & intentional',
    theme: 'light',
    swatches: ['#FFFFFF', '#F0F0F0', '#FF0000', '#000000'],
  },
];

export function StyleSwitcherButton({
  style,
  onStyleChange,
}: {
  style: DesignStyle;
  onStyleChange: (style: DesignStyle, theme: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const apply = (id: DesignStyle) => {
    const preset = PRESETS.find((p) => p.id === id)!;
    document.documentElement.setAttribute('data-style', id);
    document.documentElement.setAttribute('data-theme', preset.theme);
    localStorage.setItem('air-style', id);
    localStorage.setItem('air-theme', preset.theme);
    onStyleChange(id, preset.theme);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
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
            }}
          >
            <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--overlay-6)' }}>
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--foreground-muted)' }}
              >
                Design Style
              </span>
            </div>
            <div className="p-1.5">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => apply(preset.id)}
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
                    <div
                      className="text-[11px] leading-tight mt-0.5"
                      style={{ color: 'var(--foreground-muted)' }}
                    >
                      {preset.desc}
                    </div>
                  </div>
                  {style === preset.id && (
                    <span className="text-xs flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
