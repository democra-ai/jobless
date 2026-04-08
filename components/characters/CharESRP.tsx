'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * ESRP — 高压炼金师 / The Pressure Alchemist
 * Corporate Memphis: Two hands balancing a heavy sphere and a fragile triangle,
 * body as fulcrum/pivot, deep purple tones, tilted gravity lines, pillar-like legs.
 */
export default function CharESRP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="esrp-sphere" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7E57C2" />
          <stop offset="100%" stopColor="#4527A0" />
        </linearGradient>
      </defs>

      {/* Tilted gravity lines in background */}
      <line x1={50} y1={60} x2={350} y2={100} stroke="#CE93D8" strokeWidth={1.5} opacity={0.12} />
      <line x1={40} y1={120} x2={360} y2={155} stroke="#CE93D8" strokeWidth={1.5} opacity={0.1} />
      <line x1={30} y1={180} x2={370} y2={210} stroke="#CE93D8" strokeWidth={1.5} opacity={0.08} />
      <line x1={45} y1={300} x2={355} y2={330} stroke="#CE93D8" strokeWidth={1.5} opacity={0.1} />
      <line x1={35} y1={350} x2={365} y2={375} stroke="#CE93D8" strokeWidth={1.5} opacity={0.08} />

      {/* Body — balanced fulcrum shape, deep purple */}
      <path d="M175 180 Q170 170 180 162 L200 155 L220 162 Q230 170 225 180 L232 330 Q232 345 222 348 L178 348 Q168 345 168 330 Z" fill="#5E35B1" />

      {/* Left arm — holding up heavy sphere */}
      <path d="M175 195 Q130 180 100 150 Q85 130 75 110" stroke="#5E35B1" strokeWidth={18} strokeLinecap="round" fill="none" />
      {/* Left hand/palm */}
      <path d="M70 115 Q60 108 55 100 L85 100 Q90 108 80 115 Z" fill="#FADCBC" />

      {/* Heavy solid sphere */}
      <circle cx={70} cy={75} r={35} fill="url(#esrp-sphere)" />
      {/* Sphere highlight */}
      <circle cx={58} cy={62} r={10} fill="#9575CD" opacity={0.5} />
      {/* Weight indication — small shadow */}
      <ellipse cx={70} cy={112} rx={25} ry={5} fill="#4527A0" opacity={0.15} />

      {/* Right arm — holding fragile triangle */}
      <path d="M225 195 Q270 180 300 150 Q315 130 325 115" stroke="#5E35B1" strokeWidth={18} strokeLinecap="round" fill="none" />
      {/* Right hand/palm */}
      <path d="M320 120 Q310 113 315 105 L340 105 Q345 113 335 120 Z" fill="#FADCBC" />

      {/* Fragile triangle */}
      <polygon points="328,45 355,100 301,100" fill="none" stroke="#CE93D8" strokeWidth={2.5} />
      {/* Crack lines on triangle */}
      <path d="M320 80 L328 90" stroke="#CE93D8" strokeWidth={1} opacity={0.6} />
      <path d="M340 85 L333 95" stroke="#CE93D8" strokeWidth={1} opacity={0.6} />
      {/* Inner fragile glow */}
      <polygon points="328,60 345,92 311,92" fill="#CE93D8" opacity={0.15} />

      {/* Pillar-like legs — sturdy and wide */}
      <rect x={172} y={340} width={24} height={48} rx={4} fill="#4527A0" />
      <rect x={204} y={340} width={24} height={48} rx={4} fill="#4527A0" />
      <rect x={168} y={384} width={32} height={10} rx={4} fill="#311B92" />
      <rect x={200} y={384} width={32} height={10} rx={4} fill="#311B92" />

      {/* Head */}
      <circle cx={200} cy={128} r={35} fill="#FADCBC" />
      {/* Hair */}
      <path d="M165 122 Q168 90 200 85 Q232 90 235 122" fill="#2C2420" />
      {/* Focused eyes — slightly narrowed */}
      <rect x={185} y={126} width={9} height={6} rx={3} fill="#2C2420" />
      <rect x={206} y={126} width={9} height={6} rx={3} fill="#2C2420" />
      {/* Concentrated mouth — flat */}
      <rect x={193} y={142} width={14} height={2.5} rx={1.2} fill="#C08060" />
    </svg>
  );
}
