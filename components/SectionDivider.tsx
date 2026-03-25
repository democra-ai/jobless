'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Curved arc divider between sections — like healthytogether's circle shapes.
 * Creates an organic, flowing transition instead of a hard line.
 *
 * direction: "down" = arc curves downward (closing current section)
 *            "up"   = arc curves upward (opening next section)
 */
export function CurvedDivider({
  fill = 'var(--background)',
  direction = 'down',
  height = 80,
  className = '',
}: {
  fill?: string;
  direction?: 'down' | 'up';
  height?: number;
  className?: string;
}) {
  // Subtle parallax on the divider itself — it moves slightly slower
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [10, -10]);

  const path =
    direction === 'down'
      ? 'M0,0 L1440,0 L1440,0 Q720,HEIGHT 0,0 Z'
          .replace(/HEIGHT/g, String(height))
      : 'M0,HEIGHT L1440,HEIGHT L1440,HEIGHT Q720,0 0,HEIGHT Z'
          .replace(/HEIGHT/g, String(height));

  return (
    <motion.div
      ref={ref}
      className={`relative w-full overflow-hidden pointer-events-none ${className}`}
      style={{ height, marginTop: direction === 'down' ? -1 : 0, marginBottom: direction === 'up' ? -1 : 0, y }}
    >
      <svg
        viewBox={`0 0 1440 ${height}`}
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d={path} fill={fill} />
      </svg>
    </motion.div>
  );
}

/**
 * Floating parallax orb — decorative glow shape that moves at a different
 * scroll speed, creating depth. Used within sections to add visual layers.
 */
export function FloatingOrb({
  color,
  size = 300,
  blur = 80,
  opacity = 0.15,
  position,
  speed = 0.3,
}: {
  color: string;
  size?: number;
  blur?: number;
  opacity?: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);

  return (
    <div ref={ref} className="absolute pointer-events-none" style={{ ...position, position: 'absolute' }}>
      <motion.div
        style={{
          y,
          width: size,
          height: size,
          borderRadius: '50%',
          background: color,
          filter: `blur(${blur}px)`,
          opacity,
          willChange: 'transform',
        }}
      />
    </div>
  );
}
