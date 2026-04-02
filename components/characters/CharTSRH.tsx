'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TSRH — 铁壁堡垒 / The Iron Fortress
 * Commanding leader, crossed arms, full beard, long coat.
 * Four shield icons. Teal accent (#34d399).
 */
export default function CharTSRH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
      {/* Four shield icons — the 4 dimensions */}
      <g opacity={0.35}>
        {/* Top-left: brain (tacit) */}
        <path d="M32 28 L32 44 Q32 52 40 55 Q48 52 48 44 L48 28 Z" fill="#34d399" opacity={0.15} stroke="#34d399" strokeWidth={1.2} />
        <circle cx={40} cy={40} r={4} fill="none" stroke="#34d399" strokeWidth={1} />

        {/* Top-right: eye (subjective) */}
        <path d="M152 28 L152 44 Q152 52 160 55 Q168 52 168 44 L168 28 Z" fill="#34d399" opacity={0.15} stroke="#34d399" strokeWidth={1.2} />
        <ellipse cx={160} cy={40} rx={5} ry={3} fill="none" stroke="#34d399" strokeWidth={1} />

        {/* Mid-left: lock (rigid) */}
        <path d="M22 80 L22 96 Q22 104 30 107 Q38 104 38 96 L38 80 Z" fill="#34d399" opacity={0.15} stroke="#34d399" strokeWidth={1.2} />
        <rect x={27} y={92} width={6} height={5} rx={1} fill="none" stroke="#34d399" strokeWidth={1} />

        {/* Mid-right: person (human) */}
        <path d="M162 80 L162 96 Q162 104 170 107 Q178 104 178 96 L178 80 Z" fill="#34d399" opacity={0.15} stroke="#34d399" strokeWidth={1.2} />
        <circle cx={170} cy={90} r={3} fill="none" stroke="#34d399" strokeWidth={1} />
        <path d="M166 98 Q170 101 174 98" fill="none" stroke="#34d399" strokeWidth={1} />
      </g>

      {/* Coat */}
      <path d="M58 112 L50 180 L150 180 L142 112" fill="#1A3830" />
      {/* Coat opening */}
      <path d="M82 112 L94 140 L100 120 L106 140 L118 112" fill="#225A44" />

      {/* Body under coat */}
      <path d="M74 108 Q74 104 84 102 L100 98 L116 102 Q126 104 126 108 L130 145 L70 145 Z" fill="#2A5A48" />
      {/* Shirt visible at collar */}
      <path d="M92 102 L100 112 L108 102" fill="#D0CCC6" />

      {/* Crossed arms */}
      <path d="M68 118 Q84 130 108 116" fill="#1A3830" />
      <path d="M132 118 Q116 130 92 116" fill="#1A3830" />
      {/* Hands on arms */}
      <circle cx={108} cy={118} r={7} fill="#C69060" />
      <circle cx={92} cy={118} r={7} fill="#C69060" />

      {/* Head */}
      <circle cx={100} cy={66} r={32} fill="#C69060" />

      {/* Hair — short wavy brown */}
      <path d="M68 56 Q68 30 100 28 Q132 30 132 56 L130 48 Q128 36 100 34 Q72 36 70 48 Z" fill="#3A2A1A" />
      <path d="M130 56 Q134 62 132 68" fill="#3A2A1A" />
      <path d="M70 56 Q66 62 68 68" fill="#3A2A1A" />

      {/* Full beard */}
      <path d="M78 76 Q78 98 100 102 Q122 98 122 76" fill="#3A2A1A" />

      {/* Eyes — commanding direct gaze */}
      <circle cx={87} cy={62} r={4} fill="#2C2420" />
      <circle cx={113} cy={62} r={4} fill="#2C2420" />
      <circle cx={88} cy={61} r={1.5} fill="white" />
      <circle cx={114} cy={61} r={1.5} fill="white" />

      {/* Strong eyebrows */}
      <rect x={79} y={53} width={16} height={3.5} rx={1.7} fill="#3A2A1A" />
      <rect x={105} y={53} width={16} height={3.5} rx={1.7} fill="#3A2A1A" />

      {/* Mouth in beard — serious line */}
      <line x1={93} y1={82} x2={107} y2={82} stroke="#2A1A10" strokeWidth={2} strokeLinecap="round" />

      {/* Nose — simple triangle */}
      <path d="M97 68 L100 76 L103 68" fill="#B08050" opacity={0.4} />
    </svg>
  );
}
