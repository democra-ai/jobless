'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TSRP — 终极裁决者 / The Last Call
 * Corporate Memphis: Left side is chaotic black tangled lines, right side is neat
 * bright blue parallel lines. Figure stands at the division, scissor-hands cutting chaos.
 * Hard-lined vest, eyes are two resolute horizontal bars.
 */
export default function CharTSRP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* LEFT SIDE — chaotic black tangled lines */}
      <path d="M20 50 Q60 80 30 120 Q50 100 80 130 Q40 160 70 180 Q30 200 60 230 Q35 260 65 280 Q25 310 55 340 Q40 360 20 380" stroke="#212121" strokeWidth={3} fill="none" opacity={0.5} />
      <path d="M50 30 Q90 60 60 100 Q85 80 110 120 Q70 150 100 170 Q65 200 95 220 Q60 250 90 270 Q55 300 85 330" stroke="#424242" strokeWidth={2.5} fill="none" opacity={0.4} />
      <path d="M10 80 Q45 110 25 140 Q55 125 75 160 Q40 185 65 200 Q30 225 50 250 Q25 275 45 300 Q20 330 40 360" stroke="#333" strokeWidth={2} fill="none" opacity={0.35} />
      <path d="M80 40 Q100 70 90 110 Q115 90 120 140 Q100 165 115 185" stroke="#424242" strokeWidth={2} fill="none" opacity={0.3} />

      {/* RIGHT SIDE — neat bright blue parallel lines */}
      <line x1={260} y1={30} x2={260} y2={400} stroke="#42A5F5" strokeWidth={3} opacity={0.5} />
      <line x1={280} y1={30} x2={280} y2={400} stroke="#42A5F5" strokeWidth={3} opacity={0.5} />
      <line x1={300} y1={30} x2={300} y2={400} stroke="#42A5F5" strokeWidth={3} opacity={0.45} />
      <line x1={320} y1={30} x2={320} y2={400} stroke="#42A5F5" strokeWidth={3} opacity={0.45} />
      <line x1={340} y1={30} x2={340} y2={400} stroke="#42A5F5" strokeWidth={2.5} opacity={0.4} />
      <line x1={360} y1={30} x2={360} y2={400} stroke="#42A5F5" strokeWidth={2.5} opacity={0.4} />
      <line x1={380} y1={30} x2={380} y2={400} stroke="#42A5F5" strokeWidth={2} opacity={0.35} />

      {/* Figure standing at the division — center */}
      {/* Body with hard-lined vest */}
      <path d="M175 180 Q170 172 178 165 L200 158 L222 165 Q230 172 225 180 L230 340 Q230 352 220 355 L180 355 Q170 352 170 340 Z" fill="#455A64" />
      {/* Vest — hard angular lines */}
      <path d="M182 172 L200 210 L218 172" fill="#37474F" />
      <line x1={200} y1={210} x2={200} y2={340} stroke="#37474F" strokeWidth={2} />
      {/* Vest side lines */}
      <line x1={178} y1={190} x2={178} y2={340} stroke="#263238" strokeWidth={1.5} opacity={0.5} />
      <line x1={222} y1={190} x2={222} y2={340} stroke="#263238" strokeWidth={1.5} opacity={0.5} />

      {/* Left arm — scissor hand cutting into chaos */}
      <path d="M175 195 Q150 200 130 195" stroke="#455A64" strokeWidth={16} strokeLinecap="round" fill="none" />
      {/* Scissor fingers — cutting */}
      <path d="M132 190 L100 160" stroke="#FADCBC" strokeWidth={7} strokeLinecap="round" />
      <path d="M132 198 L105 215" stroke="#FADCBC" strokeWidth={7} strokeLinecap="round" />
      {/* Scissor cross point */}
      <circle cx={132} cy={194} r={5} fill="#FADCBC" />

      {/* Right arm — resting by ordered side */}
      <path d="M225 195 Q250 215 255 250" stroke="#455A64" strokeWidth={16} strokeLinecap="round" fill="none" />
      <circle cx={256} cy={254} r={9} fill="#FADCBC" />

      {/* Legs */}
      <rect x={180} y={348} width={18} height={40} rx={9} fill="#37474F" />
      <rect x={202} y={348} width={18} height={40} rx={9} fill="#37474F" />
      <ellipse cx={189} cy={390} rx={14} ry={7} fill="#263238" />
      <ellipse cx={211} cy={390} rx={14} ry={7} fill="#263238" />

      {/* Head */}
      <circle cx={200} cy={132} r={35} fill="#FADCBC" />
      {/* Hair — sharp, angular cut */}
      <path d="M165 125 Q168 95 200 90 Q232 95 235 125 L232 112 Q230 100 200 96 Q170 100 168 112 Z" fill="#2C2420" />

      {/* Eyes — two resolute horizontal bars */}
      <rect x={183} y={130} width={12} height={4} rx={2} fill="#212121" />
      <rect x={205} y={130} width={12} height={4} rx={2} fill="#212121" />

      {/* Determined mouth */}
      <rect x={193} y={146} width={14} height={2.5} rx={1.2} fill="#C08060" />
    </svg>
  );
}
