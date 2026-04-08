'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * ESFP — 品味定义者 / The Taste Maker
 * Corporate Memphis: Prism ball head, pointing at one rainbow circle among gray triangles,
 * long curving finger, one star-shaped eye.
 */
export default function CharESFP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="esfp-rainbow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="25%" stopColor="#FFD93D" />
          <stop offset="50%" stopColor="#6BCB77" />
          <stop offset="75%" stopColor="#4D96FF" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
        <linearGradient id="esfp-prism" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E1BEE7" />
          <stop offset="33%" stopColor="#B3E5FC" />
          <stop offset="66%" stopColor="#DCEDC8" />
          <stop offset="100%" stopColor="#FFE0B2" />
        </linearGradient>
        <filter id="esfp-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Gray repetitive triangles */}
      <polygon points="60,340 90,280 120,340" fill="#BDBDBD" opacity={0.5} />
      <polygon points="100,340 130,280 160,340" fill="#9E9E9E" opacity={0.5} />
      <polygon points="140,340 170,280 200,340" fill="#BDBDBD" opacity={0.45} />
      <polygon points="240,340 270,280 300,340" fill="#9E9E9E" opacity={0.5} />
      <polygon points="280,340 310,280 340,340" fill="#BDBDBD" opacity={0.5} />
      <polygon points="320,340 350,280 380,340" fill="#9E9E9E" opacity={0.45} />

      {/* The ONE rainbow circle — standing out */}
      <circle cx={310} cy={200} r={35} fill="url(#esfp-rainbow)" filter="url(#esfp-glow)" />
      <circle cx={310} cy={200} r={25} fill="white" opacity={0.25} />

      {/* Body — vibrant magenta */}
      <path d="M165 185 Q160 175 170 165 L200 158 L230 165 Q240 175 235 185 L240 345 Q240 358 228 360 L172 360 Q160 358 160 345 Z" fill="#AD1457" />

      {/* Left arm at side */}
      <path d="M165 200 Q145 220 140 260" stroke="#AD1457" strokeWidth={18} strokeLinecap="round" fill="none" />
      <circle cx={140} cy={264} r={11} fill="#FADCBC" />

      {/* Right arm — extremely long, pointing at rainbow circle */}
      <path d="M235 195 Q260 190 280 195 Q295 198 305 200" stroke="#AD1457" strokeWidth={18} strokeLinecap="round" fill="none" />
      {/* Long curving pointing finger */}
      <path d="M300 198 Q315 195 330 190 Q340 186 345 182" stroke="#FADCBC" strokeWidth={8} strokeLinecap="round" fill="none" />
      {/* Other fingers curled */}
      <circle cx={305} cy={206} r={6} fill="#FADCBC" />
      <circle cx={300} cy={212} r={5} fill="#FADCBC" />

      {/* Legs */}
      <rect x={175} y={348} width={20} height={38} rx={10} fill="#880E4F" />
      <rect x={205} y={348} width={20} height={38} rx={10} fill="#880E4F" />
      <ellipse cx={185} cy={388} rx={14} ry={7} fill="#6A0036" />
      <ellipse cx={215} cy={388} rx={14} ry={7} fill="#6A0036" />

      {/* Head — prism ball */}
      <circle cx={200} cy={128} r={42} fill="url(#esfp-prism)" />
      {/* Prismatic refraction lines */}
      <path d="M175 110 L165 95" stroke="#FF6B6B" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
      <path d="M180 105 L172 88" stroke="#FFD93D" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
      <path d="M225 110 L235 95" stroke="#4D96FF" strokeWidth={2} opacity={0.5} strokeLinecap="round" />
      <path d="M220 105 L228 88" stroke="#6BCB77" strokeWidth={2} opacity={0.5} strokeLinecap="round" />

      {/* Left eye — star shape (twinkling) */}
      <polygon points="188,125 191,120 194,125 191,130" fill="#2C2420" />
      <polygon points="185,125 191,122 197,125 191,128" fill="#2C2420" />

      {/* Right eye — simple dot */}
      <circle cx={212} cy={125} r={4} fill="#2C2420" />

      {/* Knowing smile */}
      <path d="M192 142 Q200 148 208 142" fill="none" stroke="#880E4F" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}
