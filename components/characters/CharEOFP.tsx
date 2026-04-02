'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * EOFP — 玻璃大炮 / The Glass Cannon
 * Worried office worker at desk. Red accent (#ff1744).
 * Clean flat style: no strokes on skin, pure color blocks.
 */
export default function CharEOFP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
      {/* Floating data icons — what makes them replaceable */}
      <rect x={24} y={18} width={18} height={22} rx={3} fill="#ff1744" opacity={0.15} />
      <rect x={28} y={24} width={10} height={2} rx={1} fill="#ff1744" opacity={0.25} />
      <rect x={28} y={28} width={7} height={2} rx={1} fill="#ff1744" opacity={0.2} />

      <rect x={158} y={25} width={18} height={22} rx={3} fill="#ff1744" opacity={0.12} />
      <rect x={162} y={31} width={10} height={2} rx={1} fill="#ff1744" opacity={0.2} />

      <rect x={152} y={58} width={15} height={19} rx={3} fill="#ff1744" opacity={0.08} />

      {/* Desk */}
      <rect x={35} y={148} width={130} height={8} rx={4} fill="#3D2E22" />

      {/* Laptop */}
      <rect x={68} y={128} width={44} height={20} rx={3} fill="#2A2420" />
      <rect x={72} y={132} width={36} height={12} rx={2} fill="#ff1744" opacity={0.12} />
      <rect x={62} y={147} width={56} height={4} rx={2} fill="#352E28" />

      {/* Body — white shirt */}
      <path d="M72 108 Q72 104 80 102 L100 98 L120 102 Q128 104 128 108 L132 148 L68 148 Z" fill="#F0EBE6" />
      {/* Collar V */}
      <path d="M90 102 L100 114 L110 102" fill="#E0DBD5" />

      {/* Right arm on desk */}
      <rect x={128} y={116} width={14} height={34} rx={7} fill="#F0EBE6" />
      <circle cx={135} cy={146} r={7} fill="#FADCBC" />

      {/* Left arm — hand on head */}
      <rect x={52} y={80} width={14} height={34} rx={7} fill="#F0EBE6" transform="rotate(-25 59 97)" />
      <circle cx={54} cy={78} r={7} fill="#FADCBC" />

      {/* Head */}
      <circle cx={100} cy={68} r={30} fill="#FADCBC" />

      {/* Hair — messy auburn */}
      <path d="M70 60 Q70 36 100 34 Q130 36 130 60 L128 52 Q126 42 100 40 Q74 42 72 52 Z" fill="#8B3A20" />
      {/* Messy tufts */}
      <circle cx={78} cy={42} r={6} fill="#8B3A20" />
      <circle cx={92} cy={36} r={7} fill="#8B3A20" />
      <circle cx={108} cy={37} r={6} fill="#8B3A20" />
      <circle cx={120} cy={42} r={5} fill="#8B3A20" />

      {/* Eyes — dot, looking sideways (worried) */}
      <circle cx={89} cy={66} r={3.5} fill="#2C2420" />
      <circle cx={111} cy={66} r={3.5} fill="#2C2420" />
      {/* Eye whites (looking to side) */}
      <circle cx={90.5} cy={65.5} r={1.2} fill="white" />
      <circle cx={112.5} cy={65.5} r={1.2} fill="white" />

      {/* Eyebrows — raised worried */}
      <rect x={84} y={57} width={12} height={3} rx={1.5} fill="#8B3A20" transform="rotate(-8 90 58)" />
      <rect x={104} y={57} width={12} height={3} rx={1.5} fill="#8B3A20" transform="rotate(8 110 58)" />

      {/* Mouth — small worried curve */}
      <path d="M94 79 Q100 76 106 79" fill="none" stroke="#C08060" strokeWidth={2} strokeLinecap="round" />

      {/* Cheek blush */}
      <circle cx={80} cy={74} r={5} fill="#E8A090" opacity={0.3} />
      <circle cx={120} cy={74} r={5} fill="#E8A090" opacity={0.3} />

      {/* Glass crack lines (fragility) */}
      <path d="M73 100 L78 112 L75 118" fill="none" stroke="#ff1744" strokeWidth={1.2} opacity={0.25} strokeLinecap="round" />
      <path d="M127 104 L124 114" fill="none" stroke="#ff1744" strokeWidth={1.2} opacity={0.2} strokeLinecap="round" />
    </svg>
  );
}
