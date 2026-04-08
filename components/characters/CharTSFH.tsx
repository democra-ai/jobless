'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TSFH — 不可替代者 / The Irreplaceable
 * Corporate Memphis: Body is a flowing rainbow without fixed shape, dancing in space,
 * geometric background distorted by movement, no facial features,
 * extreme color contrast, expressive through body language and negative space.
 */
export default function CharTSFH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="tsfh-rainbow1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="30%" stopColor="#FFD93D" />
          <stop offset="60%" stopColor="#6BCB77" />
          <stop offset="100%" stopColor="#4D96FF" />
        </linearGradient>
        <linearGradient id="tsfh-rainbow2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9B59B6" />
          <stop offset="35%" stopColor="#FF6B6B" />
          <stop offset="70%" stopColor="#FFD93D" />
          <stop offset="100%" stopColor="#4DD0E1" />
        </linearGradient>
        <linearGradient id="tsfh-rainbow3" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#4DD0E1" />
          <stop offset="40%" stopColor="#6BCB77" />
          <stop offset="80%" stopColor="#FF6B6B" />
          <stop offset="100%" stopColor="#9B59B6" />
        </linearGradient>
      </defs>

      {/* Distorted geometric background — warped by movement */}
      <rect x={50} y={80} width={60} height={60} rx={4} fill="#E0E0E0" opacity={0.15} transform="rotate(8 80 110)" />
      <rect x={290} y={60} width={55} height={55} rx={4} fill="#E0E0E0" opacity={0.12} transform="rotate(-12 317 87)" />
      <rect x={30} y={280} width={50} height={50} rx={4} fill="#E0E0E0" opacity={0.12} transform="rotate(15 55 305)" />
      <rect x={310} y={270} width={60} height={60} rx={4} fill="#E0E0E0" opacity={0.13} transform="rotate(-8 340 300)" />
      <circle cx={340} cy={150} r={25} fill="#E0E0E0" opacity={0.1} />
      <circle cx={60} cy={200} r={20} fill="#E0E0E0" opacity={0.1} />

      {/* The flowing rainbow body — dancing, no fixed shape */}
      {/* Core torso flow */}
      <path d="M180 130 Q160 160 170 200 Q180 240 165 280 Q155 310 175 340" stroke="url(#tsfh-rainbow1)" strokeWidth={28} strokeLinecap="round" fill="none" />

      {/* Head area — featureless, just a flowing shape */}
      <circle cx={190} cy={110} r={32} fill="url(#tsfh-rainbow2)" />
      {/* NO facial features — intentional */}

      {/* Left arm — sweeping dramatic arc */}
      <path d="M170 170 Q130 140 90 120 Q65 110 50 130 Q40 150 60 170" stroke="url(#tsfh-rainbow2)" strokeWidth={20} strokeLinecap="round" fill="none" />

      {/* Right arm — extended upward in dance */}
      <path d="M185 160 Q220 130 260 100 Q290 80 310 60 Q325 50 340 65" stroke="url(#tsfh-rainbow3)" strokeWidth={18} strokeLinecap="round" fill="none" />

      {/* Left leg — kicked out in motion */}
      <path d="M170 310 Q140 330 110 355 Q95 370 80 365" stroke="url(#tsfh-rainbow3)" strokeWidth={20} strokeLinecap="round" fill="none" />

      {/* Right leg — trailing behind in dance */}
      <path d="M178 320 Q210 335 250 350 Q280 360 310 345 Q330 335 335 350" stroke="url(#tsfh-rainbow1)" strokeWidth={18} strokeLinecap="round" fill="none" />

      {/* Motion trails / energy wisps */}
      <path d="M55 165 Q45 180 55 195" stroke="#FF6B6B" strokeWidth={3} fill="none" opacity={0.4} />
      <path d="M345 60 Q355 50 365 60" stroke="#9B59B6" strokeWidth={3} fill="none" opacity={0.35} />
      <path d="M75 360 Q65 370 72 380" stroke="#4DD0E1" strokeWidth={2.5} fill="none" opacity={0.35} />
      <path d="M340 345 Q350 355 345 365" stroke="#FFD93D" strokeWidth={2.5} fill="none" opacity={0.3} />

      {/* Scattered color sparks around the figure */}
      <circle cx={120} cy={100} r={5} fill="#FF6B6B" opacity={0.5} />
      <circle cx={280} cy={140} r={4} fill="#FFD93D" opacity={0.5} />
      <circle cx={100} cy={250} r={4} fill="#6BCB77" opacity={0.45} />
      <circle cx={280} cy={280} r={5} fill="#4D96FF" opacity={0.4} />
      <circle cx={250} cy={60} r={3} fill="#9B59B6" opacity={0.45} />
    </svg>
  );
}
