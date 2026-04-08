'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * EORP — 终审印章 / The Final Stamp
 * Corporate Memphis: Giant cylindrical arms, oversized red stamp,
 * blocking flat palm, stacked document rectangles, bold red line.
 */
export default function CharEORP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Bold red line across bottom */}
      <rect x={0} y={365} width={400} height={8} rx={4} fill="#D32F2F" />

      {/* Stacked document rectangles behind */}
      <rect x={45} y={120} width={80} height={100} rx={6} fill="#ECEFF1" opacity={0.6} />
      <rect x={55} y={110} width={80} height={100} rx={6} fill="#CFD8DC" opacity={0.7} />
      <rect x={65} y={100} width={80} height={100} rx={6} fill="#B0BEC5" opacity={0.8} />

      <rect x={275} y={130} width={75} height={95} rx={6} fill="#ECEFF1" opacity={0.5} />
      <rect x={285} y={120} width={75} height={95} rx={6} fill="#CFD8DC" opacity={0.65} />

      {/* Body — sturdy, dark suit */}
      <path d="M165 175 Q160 165 170 155 L200 148 L230 155 Q240 165 235 175 L242 340 Q242 355 230 358 L170 358 Q158 355 158 340 Z" fill="#37474F" />
      {/* Tie */}
      <path d="M195 158 L200 175 L205 158" fill="#D32F2F" />
      <path d="M197 175 L200 210 L203 175" fill="#D32F2F" />

      {/* Left arm — giant cylindrical, holding stamp */}
      <path d="M165 185 Q120 175 90 160 Q70 150 55 140" stroke="#37474F" strokeWidth={28} strokeLinecap="round" fill="none" />
      {/* Giant red stamp */}
      <rect x={25} y={100} width={55} height={70} rx={8} fill="#D32F2F" />
      <rect x={30} y={105} width={45} height={15} rx={4} fill="#E57373" />
      <rect x={25} y={168} width={55} height={10} rx={2} fill="#B71C1C" />
      {/* Stamp text */}
      <rect x={36} y={130} width={28} height={4} rx={2} fill="white" opacity={0.7} />
      <rect x={40} y={140} width={20} height={4} rx={2} fill="white" opacity={0.5} />

      {/* Right arm — giant cylindrical, blocking palm */}
      <path d="M235 185 Q280 170 310 150 Q330 135 345 120" stroke="#37474F" strokeWidth={28} strokeLinecap="round" fill="none" />
      {/* Giant flat blocking palm */}
      <path d="M330 80 L370 80 Q380 80 380 90 L380 150 Q380 160 370 160 L330 160 Q320 160 320 150 L320 90 Q320 80 330 80 Z" fill="#FADCBC" />
      {/* Palm lines */}
      <path d="M332 105 L368 105" stroke="#E8B88A" strokeWidth={1.5} opacity={0.5} />
      <path d="M332 125 L368 125" stroke="#E8B88A" strokeWidth={1.5} opacity={0.5} />
      {/* Fingers */}
      <rect x={328} y={65} width={12} height={20} rx={6} fill="#FADCBC" />
      <rect x={343} y={60} width={12} height={25} rx={6} fill="#FADCBC" />
      <rect x={358} y={63} width={12} height={22} rx={6} fill="#FADCBC" />

      {/* Legs — sturdy */}
      <rect x={172} y={340} width={24} height={38} rx={12} fill="#37474F" />
      <rect x={204} y={340} width={24} height={38} rx={12} fill="#37474F" />
      <ellipse cx={184} cy={380} rx={17} ry={8} fill="#263238" />
      <ellipse cx={216} cy={380} rx={17} ry={8} fill="#263238" />

      {/* Head */}
      <circle cx={200} cy={118} r={40} fill="#FADCBC" />
      {/* Short dark hair */}
      <path d="M160 110 Q162 75 200 70 Q238 75 240 110 L238 100 Q235 82 200 78 Q165 82 162 100 Z" fill="#2C2420" />
      {/* Stern eyes */}
      <rect x={183} y={114} width={10} height={5} rx={2.5} fill="#2C2420" />
      <rect x={207} y={114} width={10} height={5} rx={2.5} fill="#2C2420" />
      {/* Firm mouth */}
      <rect x={191} y={132} width={18} height={3} rx={1.5} fill="#C08060" />
    </svg>
  );
}
