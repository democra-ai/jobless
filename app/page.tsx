'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Language, Theme, MobileSection, MOBILE_SECTION_TARGETS, translations } from '@/lib/translations';
import HeroSection from '@/components/sections/HeroSection';
import SurvivalIndexSection from '@/components/sections/SurvivalIndexSection';
import DataThreatSection from '@/components/sections/DataThreatSection';
import AnalysisLinkSection from '@/components/sections/AnalysisLinkSection';
import Footer from '@/components/sections/Footer';
import { LanguageButton, ThemeButton, MobileBottomNav } from '@/components/NavigationControls';

// Lazy-load heavy below-fold components (bundle-dynamic-imports rule)
const InteractiveTimeline = dynamic(() => import('@/components/InteractiveTimeline'), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeMobileSection, setActiveMobileSection] = useState<MobileSection>('overview');
  const navLockRef = useRef(false);
  const navLockTargetRef = useRef<MobileSection | null>(null);
  const navLockTimerRef = useRef<number | null>(null);
  const t = translations[lang];

  const scrollToSection = (section: MobileSection) => {
    navLockRef.current = true;
    navLockTargetRef.current = section;
    if (navLockTimerRef.current !== null) window.clearTimeout(navLockTimerRef.current);
    navLockTimerRef.current = window.setTimeout(() => {
      navLockRef.current = false;
      navLockTargetRef.current = null;
      navLockTimerRef.current = null;
    }, 900);

    setActiveMobileSection(section);
    document.getElementById(MOBILE_SECTION_TARGETS[section])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const saved = localStorage.getItem('jobless-theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  useEffect(() => {
    const sections = Object.entries(MOBILE_SECTION_TARGETS) as Array<[MobileSection, string]>;

    const syncActiveSection = () => {
      const anchorY = Math.min(window.innerHeight * 0.36, 280);
      let nextSection: MobileSection = 'overview';
      let minDistance = Number.POSITIVE_INFINITY;

      sections.forEach(([section, id]) => {
        const node = document.getElementById(id);
        if (!node) return;
        const distance = Math.abs(node.getBoundingClientRect().top - anchorY);
        if (distance < minDistance) {
          minDistance = distance;
          nextSection = section;
        }
      });

      if (navLockRef.current) {
        const target = navLockTargetRef.current;
        if (target && nextSection === target) {
          navLockRef.current = false;
          navLockTargetRef.current = null;
          if (navLockTimerRef.current !== null) {
            window.clearTimeout(navLockTimerRef.current);
            navLockTimerRef.current = null;
          }
        } else {
          return;
        }
      }

      setActiveMobileSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncActiveSection();
        ticking = false;
      });
    };

    syncActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (navLockTimerRef.current !== null) {
        window.clearTimeout(navLockTimerRef.current);
        navLockTimerRef.current = null;
      }
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden mobile-shell">
      <div
        className="mobile-top-controls fixed z-[96] flex flex-col gap-2"
        style={{ top: 'calc(var(--safe-top) + 1rem)', right: 'calc(var(--safe-right) + 1rem)' }}
      >
        <LanguageButton lang={lang} setLang={setLang} />
        <ThemeButton theme={theme} setTheme={setTheme} />
      </div>

      <div id="overview-anchor" data-mobile-section="overview" className="scroll-mt-28 sm:scroll-mt-0">
        <HeroSection lang={lang} t={t} />
      </div>
      <SurvivalIndexSection lang={lang} t={t} />
      <div id="data-threat-anchor" data-mobile-section="threat" className="scroll-mt-28 sm:scroll-mt-0">
        <DataThreatSection lang={lang} t={t} />
      </div>
      <div id="timeline-anchor" data-mobile-section="timeline" className="scroll-mt-28 sm:scroll-mt-0">
        <InteractiveTimeline lang={lang} theme={theme} />
      </div>
      <AnalysisLinkSection lang={lang} t={t} />
      <Footer lang={lang} t={t} />

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.28 }}
        onClick={() => scrollToSection('risk')}
        className="mobile-risk-fab sm:hidden fixed right-3 z-[96] min-h-[44px] rounded-full px-4 text-xs font-bold text-white shadow-lg"
        style={{
          bottom: 'calc(var(--safe-bottom) + 5.1rem)',
          background: 'linear-gradient(135deg, var(--risk-high), var(--risk-critical))',
          boxShadow: '0 12px 24px rgba(255,23,68,0.3)',
        }}
        whileTap={{ scale: 0.96 }}
        aria-label="Check my risk"
      >
        Check My Risk
      </motion.button>

      <MobileBottomNav
        lang={lang}
        activeSection={activeMobileSection}
        onNavigate={scrollToSection}
      />
    </main>
  );
}
