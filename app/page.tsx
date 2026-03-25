'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target } from 'lucide-react';
import { Language, Theme, MobileSection, MOBILE_SECTION_TARGETS, translations, detectBrowserLanguage, getHtmlLang } from '@/lib/translations';
import HeroSection from '@/components/sections/HeroSection';
import SurvivalIndexSection from '@/components/sections/SurvivalIndexSection';
import DataThreatSection from '@/components/sections/DataThreatSection';
import AnalysisLinkSection from '@/components/sections/AnalysisLinkSection';
import Footer from '@/components/sections/Footer';
import { LanguageButton, ThemeButton, MobileBottomNav } from '@/components/NavigationControls';
import SmoothScroll from '@/components/SmoothScroll';
import { FloatingOrb } from '@/components/SectionDivider';

import { trackCtaClick } from '@/lib/analytics';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Particles } from '@/components/ui/particles';

// Lazy-load heavy below-fold components (bundle-dynamic-imports rule)
const InteractiveTimeline = dynamic(() => import('@/components/InteractiveTimeline'), { ssr: false });

export default function Home() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('air-lang') as Language | null;
      if (saved && ['en', 'zh', 'ja', 'ko', 'de'].includes(saved)) return saved;
      return detectBrowserLanguage();
    }
    return 'en';
  });
  const [theme, setTheme] = useState<Theme>('dark');

  const [activeMobileSection, setActiveMobileSection] = useState<MobileSection>('overview');
  const [shouldMountTimeline, setShouldMountTimeline] = useState(false);
  const navLockRef = useRef(false);
  const navLockTargetRef = useRef<MobileSection | null>(null);
  const navLockTimerRef = useRef<number | null>(null);
  const timelineAnchorRef = useRef<HTMLDivElement>(null);
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
    const saved = localStorage.getItem('air-theme') as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    } else {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    const style = (saved ?? 'dark') === 'light' ? 'editorial' : 'oled';
    document.documentElement.setAttribute('data-style', style);
    localStorage.setItem('air-style', style);
  }, []);

  useEffect(() => {
    document.documentElement.lang = getHtmlLang(lang);
    document.documentElement.setAttribute('data-ui-lang', lang);
    localStorage.setItem('air-lang', lang);
  }, [lang]);

  useEffect(() => {
    const sections = Object.entries(MOBILE_SECTION_TARGETS) as Array<[MobileSection, string]>;
    const trackedSections = sections
      .map(([section, id]) => {
        const node = document.getElementById(id);
        return node ? { section, node } : null;
      })
      .filter((item): item is { section: MobileSection; node: HTMLElement } => item !== null);

    const unlockNavIfReached = (nextSection: MobileSection) => {
      if (!navLockRef.current) return true;
      const target = navLockTargetRef.current;
      if (target && nextSection === target) {
        navLockRef.current = false;
        navLockTargetRef.current = null;
        if (navLockTimerRef.current !== null) {
          window.clearTimeout(navLockTimerRef.current);
          navLockTimerRef.current = null;
        }
        return true;
      }
      return false;
    };

    const applyActiveSection = (nextSection: MobileSection) => {
      if (!unlockNavIfReached(nextSection)) return;
      setActiveMobileSection((prev) => (prev === nextSection ? prev : nextSection));
    };

    const syncByDistance = () => {
      const anchorY = Math.min(window.innerHeight * 0.36, 280);
      let nextSection: MobileSection = 'overview';
      let minDistance = Number.POSITIVE_INFINITY;

      trackedSections.forEach(({ section, node }) => {
        const distance = Math.abs(node.getBoundingClientRect().top - anchorY);
        if (distance < minDistance) {
          minDistance = distance;
          nextSection = section;
        }
      });

      applyActiveSection(nextSection);
    };

    if (typeof IntersectionObserver !== 'undefined' && trackedSections.length > 0) {
      const visibility = new Map<MobileSection, number>(sections.map(([section]) => [section, 0]));
      const sectionByNode = new Map<HTMLElement, MobileSection>(
        trackedSections.map(({ section, node }) => [node, section]),
      );
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const section = sectionByNode.get(entry.target as HTMLElement);
            if (!section) return;
            visibility.set(section, entry.isIntersecting ? entry.intersectionRect.height : 0);
          });

          let nextSection: MobileSection = sections[0][0];
          let bestScore = Number.NEGATIVE_INFINITY;
          sections.forEach(([section]) => {
            const score = visibility.get(section) ?? 0;
            if (score > bestScore) {
              bestScore = score;
              nextSection = section;
            }
          });

          if (bestScore <= 0) return;
          applyActiveSection(nextSection);
        },
        {
          rootMargin: '-28% 0px -52% 0px',
          threshold: [0, 0.1, 0.25, 0.45, 0.65, 0.85, 1],
        },
      );

      trackedSections.forEach(({ node }) => observer.observe(node));

      return () => {
        observer.disconnect();
        if (navLockTimerRef.current !== null) {
          window.clearTimeout(navLockTimerRef.current);
          navLockTimerRef.current = null;
        }
      };
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        syncByDistance();
        ticking = false;
      });
    };

    syncByDistance();
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

  useEffect(() => {
    const anchor = timelineAnchorRef.current;
    if (!anchor) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frameId = window.requestAnimationFrame(() => setShouldMountTimeline(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setShouldMountTimeline(true);
        observer.disconnect();
      },
      { rootMargin: '500px 0px' },
    );

    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  /* ─────────────────────────────────────────────────────────────────────
     NARRATIVE PARALLAX — each effect serves the content story
     ───────────────────────────────────────────────────────────────────── */

  /* 1. HERO EXIT: The alarm recedes — you've been warned, now go deeper.
        No zoom-blur (that's for the Data Threat → Timeline transition).
        Just a clean fade + gentle sink, letting the quiz emerge above it. */
  // (Hero internal parallax handles the split: alarm flies away, data lingers)

  /* 2. QUIZ: Zero parallax. User is answering questions — any motion is noise. */

  /* 3. DATA THREAT → TIMELINE: The "zoom out" moment.
        After learning your data is the threat (personal), you pull back to see
        the full historical picture (macro). This is where the cinematic
        camera-zoom effect belongs — zooming OUT from personal to global. */
  const threatRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: threatScroll } = useScroll({
    target: threatRef,
    offset: ['start start', 'end start'],
  });
  // Data Threat scales down + blurs as you scroll past — "zooming out"
  const threatScale = useTransform(threatScroll, [0, 0.5, 1], [1, 1, 0.9]);
  const threatBlur = useTransform(threatScroll, [0, 0.5, 1], [0, 0, 8]);
  const threatFilter = useTransform(threatBlur, (v) => `blur(${v}px)`);
  const threatOpacity = useTransform(threatScroll, [0, 0.6, 1], [1, 1, 0.4]);

  /* 4. TIMELINE ENTRANCE: Emerges from the distance — the big picture arriving.
        Starts small + slightly blurred, grows to full size as you reach it. */
  const tlParallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tlScroll } = useScroll({
    target: tlParallaxRef,
    offset: ['start end', 'start 0.2'],
  });
  const tlScale = useTransform(tlScroll, [0, 1], [0.95, 1]);
  const tlOpacity = useTransform(tlScroll, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <main className="min-h-screen overflow-x-hidden mobile-shell relative" data-ui-lang={lang}>
      <SmoothScroll />
      {/* Global particles background — covers entire page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          className="absolute inset-0"
          quantity={120}
          staticity={40}
          ease={60}
          color={theme === 'dark' ? '#ffffff' : '#ff6b35'}
          size={theme === 'dark' ? 0.5 : 0.4}
        />
        <Particles
          className="absolute inset-0"
          quantity={60}
          staticity={60}
          ease={80}
          color={theme === 'dark' ? '#c4b5fd' : '#ff1744'}
          size={theme === 'dark' ? 0.3 : 0.3}
        />
      </div>
      <ScrollProgress className="h-[2px] bg-gradient-to-r from-[#ff6b35] via-[#ff1744] to-[#a78bdb]" />

      <div
        className="mobile-top-controls fixed z-[96] flex flex-col gap-2"
        style={{ top: 'calc(var(--safe-top) + 1rem)', right: 'calc(var(--safe-right) + 1rem)' }}
      >
        <LanguageButton lang={lang} setLang={setLang} />
        <ThemeButton theme={theme} setTheme={setTheme} />
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ROOM 1: HERO — Dark void. The alarm.
          ═══════════════════════════════════════════════════════════════ */}
      <div id="overview-anchor" data-mobile-section="overview" className="relative z-[2] scroll-mt-28 sm:scroll-mt-0">
        <HeroSection lang={lang} t={t} theme={theme} />
      </div>

      {/* ── Transition: Hero → Quiz ──
          Bold curved arc in deep purple — unmissable visual break.
          Like healthytogether's circle-shape dividers. */}
      <div className="relative z-[3]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ marginBottom: -2 }}>
          <defs>
            <linearGradient id="divider-hero-quiz" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#1a0a2e' : '#e8ddf5'} />
              <stop offset="50%" stopColor={theme === 'dark' ? '#1e1035' : '#e0d4f0'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#1a0a2e' : '#e8ddf5'} />
            </linearGradient>
          </defs>
          <ellipse cx="720" cy="-30" rx="900" ry="150" fill="url(#divider-hero-quiz)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ROOM 2: QUIZ — Deep purple-black. The test.
          Visible color shift: user can FEEL they entered a new space.
          Floating orbs add 3D depth layers behind the quiz.
          ═══════════════════════════════════════════════════════════════ */}
      <div
        className="relative z-[1] overflow-hidden"
        style={{ background: theme === 'dark'
          ? 'linear-gradient(180deg, #1a0a2e 0%, #110a1e 15%, #0c0914 50%, #0a0908 100%)'
          : 'linear-gradient(180deg, #e8ddf5 0%, #f0eef5 15%, #f5f3f8 50%, #f8f9fc 100%)'
        }}
      >
        {/* Depth layer: large slow-moving purple orb (left) */}
        <FloatingOrb
          color={theme === 'dark' ? '#7c4dff' : '#7c4dff'}
          size={500}
          blur={120}
          opacity={theme === 'dark' ? 0.12 : 0.08}
          position={{ top: '5%', left: '-10%' }}
          speed={0.5}
        />
        {/* Depth layer: warm accent orb (right, opposite direction) */}
        <FloatingOrb
          color={theme === 'dark' ? '#ff6b35' : '#e65100'}
          size={400}
          blur={100}
          opacity={theme === 'dark' ? 0.08 : 0.05}
          position={{ top: '50%', right: '-12%' }}
          speed={-0.4}
        />

        <SurvivalIndexSection lang={lang} t={t} theme={theme} />
      </div>

      {/* ── Transition: Quiz → Data Threat ──
          Warm danger arc — crimson/orange gradient signals danger ahead */}
      <div className="relative z-[3]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full block" style={{ marginBottom: -2 }}>
          <defs>
            <linearGradient id="divider-quiz-threat" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#1a0808' : '#f5e8e6'} />
              <stop offset="50%" stopColor={theme === 'dark' ? '#220a0a' : '#f0dbd8'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#1a0808' : '#f5e8e6'} />
            </linearGradient>
          </defs>
          <ellipse cx="720" cy="-20" rx="900" ry="120" fill="url(#divider-quiz-threat)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ROOM 3: DATA THREAT — Crimson-tinted dark. The revelation.
          Visible warm danger tone. User can feel "this is serious."
          EXIT: zooms out to reveal the historical panorama.
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={threatRef}
        id="data-threat-anchor"
        data-mobile-section="threat"
        className="relative scroll-mt-28 sm:scroll-mt-0 overflow-hidden"
        style={{ background: theme === 'dark'
          ? 'linear-gradient(180deg, #1a0808 0%, #150a0e 30%, #0e0a12 70%, #080a14 100%)'
          : 'linear-gradient(180deg, #f5e8e6 0%, #f2eaf0 30%, #eee8f2 70%, #eaecf5 100%)'
        }}
      >
        {/* Danger glow — large, visible, ominous */}
        <FloatingOrb
          color={theme === 'dark' ? '#ff1744' : '#d32f2f'}
          size={600}
          blur={140}
          opacity={theme === 'dark' ? 0.1 : 0.06}
          position={{ top: '15%', left: '30%' }}
          speed={0.2}
        />
        {/* Secondary: deep amber undertone */}
        <FloatingOrb
          color={theme === 'dark' ? '#ff6b35' : '#e65100'}
          size={400}
          blur={120}
          opacity={theme === 'dark' ? 0.08 : 0.04}
          position={{ bottom: '20%', right: '-5%' }}
          speed={-0.3}
        />

        <motion.div
          style={{
            scale: threatScale,
            filter: threatFilter,
            opacity: threatOpacity,
            transformOrigin: 'center center',
            willChange: 'transform, filter, opacity',
          }}
        >
          <DataThreatSection lang={lang} t={t} theme={theme} />
        </motion.div>
      </div>

      {/* ── Transition: Data Threat → Timeline ──
          Cool indigo arc — the zoom-out to historical perspective */}
      <div className="relative z-[3]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ marginBottom: -2 }}>
          <defs>
            <linearGradient id="divider-threat-timeline" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#08091a' : '#e6e8f2'} />
              <stop offset="50%" stopColor={theme === 'dark' ? '#0a0c22' : '#dde0ef'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#08091a' : '#e6e8f2'} />
            </linearGradient>
          </defs>
          <ellipse cx="720" cy="-30" rx="900" ry="150" fill="url(#divider-threat-timeline)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ROOM 4: TIMELINE — Cool indigo-black. The big picture.
          You've "zoomed out." Cool tone = distance, perspective, history.
          ═══════════════════════════════════════════════════════════════ */}
      <div
        ref={tlParallaxRef}
        id="timeline-anchor"
        data-mobile-section="timeline"
        className="relative scroll-mt-28 sm:scroll-mt-0 overflow-hidden"
        style={{ background: theme === 'dark'
          ? 'linear-gradient(180deg, #08091a 0%, #0a0b18 20%, #0a0908 60%, #0a0908 100%)'
          : 'linear-gradient(180deg, #e6e8f2 0%, #eceef5 20%, #f8f9fc 60%, #f8f9fc 100%)'
        }}
      >
        {/* Historical depth — large cool indigo orb */}
        <FloatingOrb
          color={theme === 'dark' ? '#4541fe' : '#3f51b5'}
          size={700}
          blur={160}
          opacity={theme === 'dark' ? 0.1 : 0.06}
          position={{ top: '0%', right: '-15%' }}
          speed={0.3}
        />
        {/* Secondary: teal accent for the "future" end of timeline */}
        <FloatingOrb
          color={theme === 'dark' ? '#5ec6b0' : '#00897b'}
          size={350}
          blur={100}
          opacity={theme === 'dark' ? 0.07 : 0.04}
          position={{ bottom: '10%', left: '-8%' }}
          speed={-0.25}
        />

        <motion.div
          style={{
            scale: tlScale,
            opacity: tlOpacity,
            transformOrigin: 'center top',
            willChange: 'transform, opacity',
          }}
        >
          <div ref={timelineAnchorRef}>
            {shouldMountTimeline ? (
              <InteractiveTimeline lang={lang} theme={theme} />
            ) : (
              <div className="min-h-[300px] sm:min-h-[400px] flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-3xl space-y-3">
                  <div className="h-4 bg-surface-elevated/50 rounded w-1/3 animate-pulse"></div>
                  <div className="h-3 bg-surface-elevated/30 rounded w-2/3 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="mt-6 flex gap-4">
                    <div className="h-20 flex-1 bg-surface-elevated/20 rounded-lg animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-20 flex-1 bg-surface-elevated/20 rounded-lg animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="h-20 flex-1 bg-surface-elevated/20 rounded-lg animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          ROOM 5: ANALYSIS + FOOTER — Back to base dark. Grounded.
          ═══════════════════════════════════════════════════════════════ */}
      <div className="relative z-20">
        <AnalysisLinkSection lang={lang} t={t} theme={theme} />
        <Footer lang={lang} t={t} theme={theme} />
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.28 }}
        onClick={() => { trackCtaClick('risk_fab', 'mobile'); scrollToSection('risk'); }}
        className="mobile-risk-fab fixed right-3 sm:right-5 bottom-[calc(var(--safe-bottom)+5.1rem)] sm:bottom-[calc(var(--safe-bottom)+1.25rem)] z-[96] w-12 h-12 rounded-full border flex items-center justify-center"
        style={{
          background: 'color-mix(in srgb, var(--surface) 88%, transparent)',
          borderColor: 'var(--overlay-14)',
          boxShadow: '0 12px 24px rgba(255,23,68,0.22)',
        }}
        whileTap={{ scale: 0.94 }}
        whileHover={{ scale: 1.04 }}
        aria-label="Check my risk"
        title="Check my risk"
      >
        <Target className="w-5 h-5" style={{ stroke: 'url(#mobile-risk-fab-gradient)' }} />
        <svg width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="mobile-risk-fab-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fb7185" />
            </linearGradient>
          </defs>
        </svg>
      </motion.button>

      <MobileBottomNav
        lang={lang}
        activeSection={activeMobileSection}
        onNavigate={scrollToSection}
      />
    </main>
  );
}
