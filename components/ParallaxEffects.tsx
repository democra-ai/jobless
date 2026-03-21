'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// ============================================
// HOOKS
// ============================================

/** Returns a smooth parallax Y offset driven by scroll position within a container */
export function useParallaxY(ref: React.RefObject<HTMLElement | null>, range: [number, number] = [-50, 50]) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], range);
  return useSpring(raw, { stiffness: 100, damping: 30, mass: 0.5 });
}

/** Returns multiple parallax layers at different speeds */
export function useParallaxLayers(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const slow = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const medium = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const fast = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  const slowSpring = useSpring(slow, { stiffness: 100, damping: 30 });
  const mediumSpring = useSpring(medium, { stiffness: 100, damping: 30 });
  const fastSpring = useSpring(fast, { stiffness: 100, damping: 30 });

  return { slow: slowSpring, medium: mediumSpring, fast: fastSpring, progress: scrollYProgress };
}

/** Returns scroll progress within a section (0 = top enters viewport, 1 = bottom exits) */
export function useSectionProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return scrollYProgress;
}

// ============================================
// COMPONENTS
// ============================================

/** Floating orb that drifts with parallax + subtle animation */
export function ParallaxOrb({
  color,
  size,
  x,
  y,
  parallaxY,
  blur = 80,
  opacity = 0.06,
}: {
  color: string;
  size: number;
  x: string;
  y: string;
  parallaxY: MotionValue<number>;
  blur?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: `blur(${blur}px)`,
        opacity,
        y: parallaxY,
      }}
    />
  );
}

/** Section divider with parallax floating particles */
export function ParallaxDivider({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { slow, medium, fast } = useParallaxLayers(ref);

  return (
    <div ref={ref} className={`relative h-32 sm:h-48 overflow-hidden ${className}`}>
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-brand-primary/20"
        style={{ left: '15%', top: '30%', y: fast }}
      />
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-risk-critical/15"
        style={{ left: '75%', top: '40%', y: medium }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-brand-accent/25"
        style={{ left: '45%', top: '60%', y: slow }}
      />
      <motion.div
        className="absolute w-3 h-0.5 rounded-full bg-risk-high/10 rotate-45"
        style={{ left: '60%', top: '25%', y: fast }}
      />
      <motion.div
        className="absolute w-0.5 h-3 rounded-full bg-brand-primary/10 -rotate-12"
        style={{ left: '30%', top: '55%', y: medium }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-risk-low/20"
        style={{ left: '85%', top: '65%', y: slow }}
      />

      {/* Gradient line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-full"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--overlay-14), transparent)',
          y: slow,
        }}
      />
    </div>
  );
}

/** Scroll-reveal wrapper with parallax depth */
export function ParallaxReveal({
  children,
  className = '',
  depth = 'medium',
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  depth?: 'slow' | 'medium' | 'fast';
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const ranges = { slow: [-15, 15], medium: [-30, 30], fast: [-60, 60] };
  const range = ranges[depth];

  const yRaw = useTransform(scrollYProgress, [0, 1], range);
  const y = useSpring(yRaw, { stiffness: 100, damping: 30 });

  const xVal = direction === 'left' ? range : direction === 'right' ? [range[1], range[0]] : [0, 0];
  const xRaw = useTransform(scrollYProgress, [0, 1], xVal as [number, number]);
  const x = useSpring(xRaw, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: direction === 'up' ? y : undefined, x: direction !== 'up' ? x : undefined }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal scroll-linked progress bar */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--brand-primary), var(--risk-critical))',
      }}
    />
  );
}
