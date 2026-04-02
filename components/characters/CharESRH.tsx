'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * ESRH — 神谕者 / The Oracle
 * Wise advisor in high-back chair, steepled fingers, glasses, gray goatee.
 * Green accent (#00c853).
 */
export default function CharESRH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
      {/* Chair back */}
      <rect x={55} y={55} width={90} height={110} rx={14} fill="#1A3D2E" />
      <path d="M60 60 Q100 48 140 60" fill="#1A3D2E" />

      {/* Books behind (right) */}
      <rect x={155} y={50} width={10} height={22} rx={2} fill="#2A5A40" />
      <rect x={167} y={46} width={8} height={26} rx={2} fill="#1A4A34" />
      <rect x={155} y={76} width={12} height={20} rx={2} fill="#34d399" opacity={0.2} />
      <rect x={169} y={78} width={8} height={18} rx={2} fill="#2A5A40" />

      {/* Scales of justice (left) */}
      <line x1={38} y1={80} x2={38} y2={100} stroke="#34d399" strokeWidth={2} opacity={0.4} />
      <line x1={26} y1={85} x2={50} y2={85} stroke="#34d399" strokeWidth={2} opacity={0.4} />
      <path d="M26 85 L23 94 L29 94 Z" fill="#34d399" opacity={0.2} />
      <path d="M50 85 L47 94 L53 94 Z" fill="#34d399" opacity={0.2} />

      {/* Body — blazer */}
      <path d="M72 110 Q72 106 82 103 L100 98 L118 103 Q128 106 128 110 L134 160 L66 160 Z" fill="#1A4A36" />
      {/* Lapels */}
      <path d="M88 103 L96 120 L100 110" fill="#225A44" />
      <path d="M112 103 L104 120 L100 110" fill="#225A44" />
      {/* Shirt V */}
      <path d="M94 103 L100 116 L106 103" fill="#E8E4DF" />

      {/* Arms — steepled fingers */}
      <rect x={66} y={115} width={12} height={36} rx={6} fill="#1A4A36" transform="rotate(15 72 133)" />
      <rect x={122} y={115} width={12} height={36} rx={6} fill="#1A4A36" transform="rotate(-15 128 133)" />
      {/* Steepled hands */}
      <path d="M86 142 L100 134 L114 142" fill="#E8B88A" />
      <circle cx={86} cy={142} r={5} fill="#E8B88A" />
      <circle cx={114} cy={142} r={5} fill="#E8B88A" />

      {/* Head */}
      <circle cx={100} cy={68} r={30} fill="#E8B88A" />

      {/* Gray hair */}
      <path d="M70 58 Q70 34 100 32 Q130 34 130 58 L128 50 Q126 40 100 38 Q74 40 72 50 Z" fill="#8A8A8A" />
      {/* Side hair */}
      <rect x={68} y={54} width={8} height={16} rx={4} fill="#8A8A8A" />
      <rect x={124} y={54} width={8} height={16} rx={4} fill="#8A8A8A" />

      {/* Glasses — round */}
      <circle cx={88} cy={66} r={11} fill="white" opacity={0.1} stroke="#555" strokeWidth={2} />
      <circle cx={112} cy={66} r={11} fill="white" opacity={0.1} stroke="#555" strokeWidth={2} />
      <line x1={99} y1={66} x2={101} y2={66} stroke="#555" strokeWidth={2} />
      <line x1={68} y1={64} x2={77} y2={66} stroke="#555" strokeWidth={1.5} />
      <line x1={132} y1={64} x2={123} y2={66} stroke="#555" strokeWidth={1.5} />

      {/* Eyes behind glasses — half lidded, wise */}
      <ellipse cx={88} cy={67} rx={3} ry={2} fill="#2C2420" />
      <ellipse cx={112} cy={67} rx={3} ry={2} fill="#2C2420" />

      {/* Eyebrows — raised knowingly */}
      <rect x={80} y={55} width={14} height={2.5} rx={1.2} fill="#8A8A8A" transform="rotate(-5 87 56)" />
      <rect x={106} y={55} width={14} height={2.5} rx={1.2} fill="#8A8A8A" transform="rotate(5 113 56)" />

      {/* Goatee */}
      <path d="M94 80 Q100 90 106 80" fill="#8A8A8A" />

      {/* Mouth — subtle knowing smirk */}
      <path d="M95 79 Q100 82 108 78" fill="none" stroke="#B08060" strokeWidth={1.8} strokeLinecap="round" />

      {/* Crystal ball glow */}
      <circle cx={162} cy={108} r={12} fill="#34d399" opacity={0.08} />
      <circle cx={162} cy={108} r={8} fill="#34d399" opacity={0.12} />
      <circle cx={162} cy={108} r={3} fill="#34d399" opacity={0.2} />
    </svg>
  );
}
