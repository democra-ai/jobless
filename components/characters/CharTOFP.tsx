'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TOFP — 赤手行者 / The Bare Hand
 * Corporate Memphis: Oversized bright orange hands gripping a curved blue vector pipe,
 * small understated body, gear-shaped geometrics, solid ripple lines.
 */
export default function CharTOFP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="tofp-pipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#42A5F5" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>
      </defs>

      {/* Ripple lines background — emphasize physical */}
      <path d="M30 320 Q100 300 200 310 Q300 320 370 300" stroke="#FF9800" strokeWidth={2} fill="none" opacity={0.15} />
      <path d="M30 335 Q100 315 200 325 Q300 335 370 315" stroke="#FF9800" strokeWidth={2} fill="none" opacity={0.12} />
      <path d="M30 350 Q100 330 200 340 Q300 350 370 330" stroke="#FF9800" strokeWidth={2} fill="none" opacity={0.1} />
      <path d="M30 365 Q100 345 200 355 Q300 365 370 345" stroke="#FF9800" strokeWidth={2} fill="none" opacity={0.08} />

      {/* Gear shapes around pipe area */}
      <circle cx={90} cy={160} r={20} fill="none" stroke="#B0BEC5" strokeWidth={3} opacity={0.4} />
      <rect x={82} y={138} width={16} height={8} rx={2} fill="#B0BEC5" opacity={0.3} transform="rotate(0 90 142)" />
      <rect x={82} y={178} width={16} height={8} rx={2} fill="#B0BEC5" opacity={0.3} />
      <rect x={68} y={152} width={8} height={16} rx={2} fill="#B0BEC5" opacity={0.3} />
      <rect x={104} y={152} width={8} height={16} rx={2} fill="#B0BEC5" opacity={0.3} />

      <circle cx={330} cy={180} r={16} fill="none" stroke="#B0BEC5" strokeWidth={2.5} opacity={0.35} />
      <rect x={323} y={162} width={14} height={6} rx={2} fill="#B0BEC5" opacity={0.25} />
      <rect x={323} y={192} width={14} height={6} rx={2} fill="#B0BEC5" opacity={0.25} />

      {/* Blue curved pipe */}
      <path d="M80 200 Q120 140 200 160 Q280 180 320 220" stroke="url(#tofp-pipe)" strokeWidth={22} strokeLinecap="round" fill="none" />
      {/* Pipe highlight */}
      <path d="M85 195 Q125 138 200 155 Q275 172 315 212" stroke="#90CAF9" strokeWidth={6} strokeLinecap="round" fill="none" opacity={0.5} />

      {/* Small body — deliberately understated */}
      <path d="M180 235 Q178 228 183 222 L200 218 L217 222 Q222 228 220 235 L222 320 Q222 328 216 330 L184 330 Q178 328 178 320 Z" fill="#546E7A" />

      {/* Left giant orange hand gripping pipe */}
      <ellipse cx={130} cy={170} rx={32} ry={28} fill="#FF9800" />
      {/* Fingers wrapping around pipe */}
      <rect x={108} y={158} width={14} height={28} rx={7} fill="#FF9800" />
      <rect x={118} y={152} width={14} height={32} rx={7} fill="#FF9800" />
      <rect x={140} y={155} width={14} height={30} rx={7} fill="#FF9800" />
      <rect x={150} y={160} width={12} height={24} rx={6} fill="#FF9800" />
      {/* Thumb */}
      <ellipse cx={125} cy={188} rx={10} ry={8} fill="#FFB74D" />

      {/* Right giant orange hand gripping pipe */}
      <ellipse cx={270} cy={195} rx={32} ry={28} fill="#FF9800" />
      <rect x={248} y={183} width={14} height={28} rx={7} fill="#FF9800" />
      <rect x={258} y={178} width={14} height={32} rx={7} fill="#FF9800" />
      <rect x={280} y={180} width={14} height={30} rx={7} fill="#FF9800" />
      <rect x={290} y={185} width={12} height={24} rx={6} fill="#FF9800" />
      <ellipse cx={265} cy={213} rx={10} ry={8} fill="#FFB74D" />

      {/* Thin arms connecting body to hands */}
      <path d="M180 240 Q160 220 135 180" stroke="#546E7A" strokeWidth={10} strokeLinecap="round" fill="none" />
      <path d="M220 240 Q240 225 265 205" stroke="#546E7A" strokeWidth={10} strokeLinecap="round" fill="none" />

      {/* Legs — small */}
      <rect x={186} y={325} width={12} height={40} rx={6} fill="#546E7A" />
      <rect x={202} y={325} width={12} height={40} rx={6} fill="#546E7A" />
      <ellipse cx={192} cy={368} rx={10} ry={5} fill="#37474F" />
      <ellipse cx={208} cy={368} rx={10} ry={5} fill="#37474F" />

      {/* Head — small relative to body */}
      <circle cx={200} cy={200} r={26} fill="#FADCBC" />
      {/* Cap */}
      <path d="M174 195 Q176 175 200 172 Q224 175 226 195" fill="#FF9800" />
      <rect x={170} y={192} width={60} height={8} rx={4} fill="#F57C00" />
      {/* Eyes */}
      <circle cx={192} cy={200} r={3} fill="#2C2420" />
      <circle cx={208} cy={200} r={3} fill="#2C2420" />
      {/* Determined mouth */}
      <rect x={194} y={210} width={12} height={2.5} rx={1.2} fill="#C08060" />
    </svg>
  );
}
