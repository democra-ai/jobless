'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TSRH — 铁壁堡垒 / The Iron Fortress
 * Corporate Memphis: Figure seated upright, wrapped tightly in four concentric
 * colorful shield rings, outermost with castle-wall crenellation edges,
 * perfect symmetry, gold and deep blue palette, immovable authority.
 */
export default function CharTSRH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="tsrh-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>
      </defs>

      {/* Outermost shield ring — with castle crenellation */}
      <circle cx={200} cy={210} r={165} fill="none" stroke="#1A237E" strokeWidth={12} opacity={0.3} />
      {/* Crenellation teeth on outer ring */}
      {/* Top */}
      <rect x={190} y={38} width={20} height={14} fill="#1A237E" opacity={0.3} />
      <rect x={230} y={42} width={18} height={14} fill="#1A237E" opacity={0.25} />
      <rect x={150} y={42} width={18} height={14} fill="#1A237E" opacity={0.25} />
      {/* Sides */}
      <rect x={34} y={200} width={14} height={20} fill="#1A237E" opacity={0.25} />
      <rect x={352} y={200} width={14} height={20} fill="#1A237E" opacity={0.25} />
      <rect x={38} y={250} width={14} height={18} fill="#1A237E" opacity={0.22} />
      <rect x={348} y={250} width={14} height={18} fill="#1A237E" opacity={0.22} />
      <rect x={38} y={155} width={14} height={18} fill="#1A237E" opacity={0.22} />
      <rect x={348} y={155} width={14} height={18} fill="#1A237E" opacity={0.22} />
      {/* Bottom */}
      <rect x={190} y={368} width={20} height={14} fill="#1A237E" opacity={0.25} />
      <rect x={140} y={362} width={18} height={14} fill="#1A237E" opacity={0.22} />
      <rect x={240} y={362} width={18} height={14} fill="#1A237E" opacity={0.22} />

      {/* Second ring — gold */}
      <circle cx={200} cy={210} r={130} fill="none" stroke="url(#tsrh-gold)" strokeWidth={10} opacity={0.5} />

      {/* Third ring — deep blue */}
      <circle cx={200} cy={210} r={100} fill="none" stroke="#283593" strokeWidth={8} opacity={0.45} />

      {/* Fourth (innermost) ring — bright gold */}
      <circle cx={200} cy={210} r={72} fill="none" stroke="#FFD54F" strokeWidth={6} opacity={0.55} />

      {/* Seated figure — perfectly centered, upright posture */}
      {/* Body */}
      <path d="M175 195 Q172 188 178 182 L200 176 L222 182 Q228 188 225 195 L228 280 L172 280 Z" fill="#1A237E" />
      {/* Chest emblem — golden */}
      <circle cx={200} cy={220} r={12} fill="#FFD54F" opacity={0.7} />
      <circle cx={200} cy={220} r={7} fill="#FFA000" opacity={0.5} />

      {/* Arms folded / at sides — composed */}
      <path d="M175 200 Q155 210 148 235" stroke="#1A237E" strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M225 200 Q245 210 252 235" stroke="#1A237E" strokeWidth={14} strokeLinecap="round" fill="none" />
      <circle cx={146} cy={238} r={8} fill="#FADCBC" />
      <circle cx={254} cy={238} r={8} fill="#FADCBC" />

      {/* Legs — seated cross-legged */}
      <path d="M180 275 Q165 295 175 310 Q185 318 200 312" stroke="#1A237E" strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M220 275 Q235 295 225 310 Q215 318 200 312" stroke="#1A237E" strokeWidth={14} strokeLinecap="round" fill="none" />

      {/* Head */}
      <circle cx={200} cy={155} r={32} fill="#FADCBC" />
      {/* Hair — neat, authoritative */}
      <path d="M168 148 Q170 122 200 116 Q230 122 232 148 L230 138 Q228 126 200 122 Q172 126 170 138 Z" fill="#2C2420" />

      {/* Eyes — steady, commanding */}
      <circle cx={190} cy={154} r={4} fill="#1A237E" />
      <circle cx={210} cy={154} r={4} fill="#1A237E" />
      {/* Eye glint */}
      <circle cx={191.5} cy={152.5} r={1.2} fill="white" opacity={0.6} />
      <circle cx={211.5} cy={152.5} r={1.2} fill="white" opacity={0.6} />

      {/* Composed mouth */}
      <rect x={193} y={166} width={14} height={2.5} rx={1.2} fill="#C08060" />
    </svg>
  );
}
