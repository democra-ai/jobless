'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * EOFH — 人脉桥梁 / The Human Bridge
 * Corporate Memphis: Arms become countless curves connecting colorful dots,
 * bright yellow core circle on chest, puzzle-piece ground.
 */
export default function CharEOFH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="eofh-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C6BC0" />
          <stop offset="100%" stopColor="#3F51B5" />
        </linearGradient>
      </defs>

      {/* Background grid lines */}
      <line x1={0} y1={100} x2={400} y2={100} stroke="#E8EAF6" strokeWidth={0.8} opacity={0.3} />
      <line x1={0} y1={200} x2={400} y2={200} stroke="#E8EAF6" strokeWidth={0.8} opacity={0.3} />
      <line x1={0} y1={300} x2={400} y2={300} stroke="#E8EAF6" strokeWidth={0.8} opacity={0.3} />
      <line x1={100} y1={0} x2={100} y2={400} stroke="#E8EAF6" strokeWidth={0.8} opacity={0.3} />
      <line x1={200} y1={0} x2={200} y2={400} stroke="#E8EAF6" strokeWidth={0.8} opacity={0.3} />
      <line x1={300} y1={0} x2={300} y2={400} stroke="#E8EAF6" strokeWidth={0.8} opacity={0.3} />

      {/* Puzzle-piece ground blocks */}
      <rect x={20} y={360} width={80} height={40} rx={6} fill="#FF8A65" opacity={0.5} />
      <rect x={110} y={360} width={60} height={40} rx={6} fill="#4DD0E1" opacity={0.5} />
      <rect x={180} y={360} width={90} height={40} rx={6} fill="#FFD54F" opacity={0.4} />
      <rect x={280} y={360} width={55} height={40} rx={6} fill="#AED581" opacity={0.5} />
      <rect x={345} y={360} width={55} height={40} rx={6} fill="#CE93D8" opacity={0.45} />

      {/* Connection curves from arms to dots — left side */}
      <path d="M155 200 Q100 150 55 80" stroke="#FF8A65" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M155 210 Q80 200 30 170" stroke="#4DD0E1" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M155 220 Q90 260 40 300" stroke="#AED581" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M155 195 Q110 120 70 50" stroke="#CE93D8" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.5} />

      {/* Connection curves — right side */}
      <path d="M245 200 Q300 150 345 80" stroke="#FFD54F" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M245 210 Q320 200 370 170" stroke="#FF8A65" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M245 220 Q310 260 360 300" stroke="#4DD0E1" strokeWidth={3} fill="none" strokeLinecap="round" opacity={0.6} />
      <path d="M245 195 Q290 120 340 55" stroke="#AED581" strokeWidth={2.5} fill="none" strokeLinecap="round" opacity={0.5} />

      {/* Connected people dots — left */}
      <circle cx={55} cy={75} r={14} fill="#FF8A65" />
      <circle cx={25} cy={165} r={12} fill="#4DD0E1" />
      <circle cx={35} cy={298} r={13} fill="#AED581" />
      <circle cx={65} cy={45} r={10} fill="#CE93D8" />

      {/* Connected people dots — right */}
      <circle cx={350} cy={75} r={14} fill="#FFD54F" />
      <circle cx={375} cy={165} r={12} fill="#FF8A65" />
      <circle cx={365} cy={298} r={13} fill="#4DD0E1" />
      <circle cx={345} cy={50} r={10} fill="#AED581" />

      {/* Body — standing with hands on hips */}
      <path d="M170 170 Q165 160 175 150 L200 145 L225 150 Q235 160 230 170 L238 340 Q238 355 225 358 L175 358 Q162 355 162 340 Z" fill="url(#eofh-body)" />

      {/* Yellow core circle on chest */}
      <circle cx={200} cy={215} r={32} fill="#FFD54F" />
      <circle cx={200} cy={215} r={22} fill="#FFF176" opacity={0.7} />

      {/* Arms — akimbo pose (hands on hips) */}
      <path d="M170 180 Q140 185 130 210 Q125 230 150 250" stroke="#5C6BC0" strokeWidth={20} strokeLinecap="round" fill="none" />
      <path d="M230 180 Q260 185 270 210 Q275 230 250 250" stroke="#5C6BC0" strokeWidth={20} strokeLinecap="round" fill="none" />

      {/* Legs */}
      <rect x={175} y={340} width={20} height={40} rx={10} fill="#3F51B5" />
      <rect x={205} y={340} width={20} height={40} rx={10} fill="#3F51B5" />
      <ellipse cx={185} cy={382} rx={15} ry={7} fill="#303F9F" />
      <ellipse cx={215} cy={382} rx={15} ry={7} fill="#303F9F" />

      {/* Head */}
      <circle cx={200} cy={120} r={38} fill="#FADCBC" />
      {/* Hair */}
      <path d="M162 112 Q165 80 200 75 Q235 80 238 112" fill="#5C3A20" />
      {/* Eyes — minimal dots */}
      <circle cx={188} cy={118} r={4} fill="#2C2420" />
      <circle cx={212} cy={118} r={4} fill="#2C2420" />
      {/* Warm smile */}
      <path d="M190 134 Q200 142 210 134" fill="none" stroke="#C08060" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}
