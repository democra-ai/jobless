'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CharacterIllustrationProps {
  profileCode: string;
  archetype: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Whether to animate entrance */
  animate?: boolean;
}

const SIZES = {
  sm: { w: 80, h: 80, imgW: 100, imgH: 100 },
  md: { w: 128, h: 128, imgW: 160, imgH: 160 },
  lg: { w: 180, h: 180, imgW: 220, imgH: 220 },
} as const;

/**
 * Renders an archetype's custom character illustration.
 *
 * Uses Next.js Image component for:
 * - Automatic WebP/AVIF serving
 * - Lazy loading with blur placeholder
 * - Responsive srcset generation
 * - Image CDN optimization via Vercel
 */
export default function CharacterIllustration({
  profileCode,
  archetype,
  size = 'md',
  className = '',
  animate = true,
}: CharacterIllustrationProps) {
  const s = SIZES[size];

  const inner = (
    <div className={`relative ${className}`} style={{ width: s.w, height: s.h }}>
      <Image
        src={`/characters/${profileCode}.webp`}
        alt={archetype}
        width={s.imgW}
        height={s.imgH}
        quality={90}
        priority
        className="object-contain"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );

  if (!animate) return inner;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 18, delay: 0.1 }}
    >
      {inner}
    </motion.div>
  );
}
