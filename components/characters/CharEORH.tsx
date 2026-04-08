'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * EORH — 执照之墙 / The License Wall
 * Corporate Memphis: Deep blue trapezoid suit, glowing translucent certificate squares
 * in a circular array, thin legs, exaggerated round glasses, raster lines on shield.
 */
export default function CharEORH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="eorh-cert" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#80DEEA" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#4DD0E1" stopOpacity={0.3} />
        </linearGradient>
        <filter id="eorh-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Certificate squares in circular array */}
      <rect x={80} y={80} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} transform="rotate(-30 105 100)" />
      <rect x={45} y={160} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} transform="rotate(-60 70 180)" />
      <rect x={60} y={260} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} transform="rotate(-20 85 280)" />

      <rect x={270} y={80} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} transform="rotate(30 295 100)" />
      <rect x={305} y={160} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} transform="rotate(60 330 180)" />
      <rect x={290} y={260} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} transform="rotate(20 315 280)" />

      {/* Top and bottom certs */}
      <rect x={175} y={45} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} />
      <rect x={175} y={310} width={50} height={40} rx={5} fill="url(#eorh-cert)" stroke="#4DD0E1" strokeWidth={1} />

      {/* Raster glow lines connecting certs */}
      <circle cx={200} cy={200} r={140} fill="none" stroke="#4DD0E1" strokeWidth={1} opacity={0.15} />
      <circle cx={200} cy={200} r={120} fill="none" stroke="#4DD0E1" strokeWidth={0.8} opacity={0.1} />

      {/* Body — deep blue trapezoid suit */}
      <path d="M150 175 L130 340 Q128 355 145 358 L255 358 Q272 355 270 340 L250 175 Z" fill="#1A237E" />
      {/* Suit lapels */}
      <path d="M180 175 L200 210 L220 175" fill="#283593" />
      {/* Shirt */}
      <path d="M188 175 L200 200 L212 175" fill="#E8EAF6" />

      {/* Arms in suit */}
      <path d="M155 190 Q130 210 120 250" stroke="#1A237E" strokeWidth={20} strokeLinecap="round" fill="none" />
      <path d="M245 190 Q270 210 280 250" stroke="#1A237E" strokeWidth={20} strokeLinecap="round" fill="none" />
      <circle cx={118} cy={254} r={10} fill="#FADCBC" />
      <circle cx={282} cy={254} r={10} fill="#FADCBC" />

      {/* Thin legs */}
      <rect x={178} y={350} width={14} height={40} rx={7} fill="#1A237E" />
      <rect x={208} y={350} width={14} height={40} rx={7} fill="#1A237E" />
      <ellipse cx={185} cy={392} rx={12} ry={6} fill="#0D1547" />
      <ellipse cx={215} cy={392} rx={12} ry={6} fill="#0D1547" />

      {/* Head */}
      <circle cx={200} cy={140} r={38} fill="#FADCBC" />
      {/* Hair — neat */}
      <path d="M162 132 Q164 100 200 95 Q236 100 238 132 L236 120 Q234 105 200 102 Q166 105 164 120 Z" fill="#2C2420" />

      {/* Exaggerated large round glasses */}
      <circle cx={184} cy={140} r={18} fill="none" stroke="#2C2420" strokeWidth={3.5} />
      <circle cx={216} cy={140} r={18} fill="none" stroke="#2C2420" strokeWidth={3.5} />
      {/* Bridge */}
      <path d="M202 140 Q200 136 198 140" stroke="#2C2420" strokeWidth={3} fill="none" />
      {/* Temple arms */}
      <path d="M166 138 L158 135" stroke="#2C2420" strokeWidth={3} strokeLinecap="round" />
      <path d="M234 138 L242 135" stroke="#2C2420" strokeWidth={3} strokeLinecap="round" />

      {/* Eyes behind glasses */}
      <circle cx={184} cy={141} r={3.5} fill="#2C2420" />
      <circle cx={216} cy={141} r={3.5} fill="#2C2420" />

      {/* Slight smile */}
      <path d="M193 156 Q200 160 207 156" fill="none" stroke="#C08060" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
