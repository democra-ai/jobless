'use client';

import React, { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/* ─── 1. Parallax Layer ──────────────────────────────────────
   Moves children at a different speed relative to scroll.
   speed > 0 → moves slower (background feel)
   speed < 0 → moves faster (foreground feel)           */
export function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/* ─── 2. Section Zoom-Blur Transition ────────────────────────
   Mimics healthytogether.co's "transition_camera":
   As you scroll past this section, it scales down and blurs,
   creating a cinematic transition to the next section.       */
export function ZoomBlurSection({
  children,
  className = '',
  stickyHeight = '200vh',
}: {
  children: ReactNode;
  className?: string;
  stickyHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0.85]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, 20]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 1, 0]);
  const filterBlur = useMotionTemplate(blur);

  return (
    <div ref={ref} className="relative" style={{ height: stickyHeight }}>
      <motion.div
        className={`sticky top-0 ${className}`}
        style={{
          scale,
          filter: filterBlur,
          opacity,
          transformOrigin: 'center center',
          willChange: 'transform, filter, opacity',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* helper: template for filter blur */
function useMotionTemplate(blur: MotionValue<number>) {
  return useTransform(blur, (v) => `blur(${v}px)`);
}

/* ─── 3. Scroll Reveal ───────────────────────────────────────
   Fade + slide up on scroll into view.
   Similar to Webflow's scroll-triggered entrance animations. */
export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.4'],
  });

  const dirMap = {
    up: { y: [60, 0], x: [0, 0] },
    down: { y: [-60, 0], x: [0, 0] },
    left: { y: [0, 0], x: [60, 0] },
    right: { y: [0, 0], x: [-60, 0] },
  };

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], dirMap[direction].y);
  const x = useTransform(scrollYProgress, [0, 1], dirMap[direction].x);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{ opacity, y, x, willChange: 'transform, opacity' }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 4. Horizontal Scroll Section (Sticky) ──────────────────
   Content scrolls horizontally while section is pinned.
   Good for feature showcases / card carousels.               */
export function HorizontalScrollSection({
  children,
  className = '',
  panelCount = 3,
}: {
  children: ReactNode;
  className?: string;
  panelCount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `${-(panelCount - 1) * 100}%`]);

  return (
    <div ref={ref} className="relative" style={{ height: `${panelCount * 100}vh` }}>
      <div className={`sticky top-0 h-screen overflow-hidden ${className}`}>
        <motion.div
          className="flex h-full"
          style={{ x, willChange: 'transform' }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── 5. Stacking Cards ──────────────────────────────────────
   Cards stack on top of each other as you scroll,
   like healthytogether's benefits section.                    */
export function StackingCard({
  children,
  index,
  total,
  className = '',
}: {
  children: ReactNode;
  index: number;
  total: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [0.9, 1],
  );
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="sticky top-[15vh]"
        style={{
          scale,
          y,
          zIndex: total - index,
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── 6. Text Split Reveal ───────────────────────────────────
   Each word/line staggers in from below on scroll.           */
export function TextSplitReveal({
  text,
  className = '',
  as: Tag = 'h2',
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.5'],
  });

  const words = text.split(' ');

  return (
    <div ref={ref} className="overflow-hidden">
      <Tag className={className}>
        {words.map((word, i) => {
          const start = i / words.length;
          const end = Math.min(start + 1 / words.length + 0.3, 1);
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </Tag>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const y = useTransform(progress, range, [40, 0]);
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="inline-block overflow-hidden mr-[0.25em]">
      <motion.span
        className="inline-block"
        style={{ y, opacity, willChange: 'transform, opacity' }}
      >
        {children}
      </motion.span>
    </span>
  );
}
