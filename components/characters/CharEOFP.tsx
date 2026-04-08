'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * EOFP — 玻璃大炮 / The Glass Cannon
 * Corporate Memphis: Translucent blue limbs, glass bottle torso with flowing binary,
 * exaggerated long arms hitting floating geometric keys.
 */
export default function CharEOFP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Background subtle grain texture */}
      <defs>
        <linearGradient id="eofp-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7EC8E3" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#4A90D9" stopOpacity={0.35} />
        </linearGradient>
        <linearGradient id="eofp-key" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FF8A65" />
        </linearGradient>
        <filter id="eofp-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Floating geometric keys */}
      <rect x={40} y={80} width={50} height={40} rx={8} fill="url(#eofp-key)" opacity={0.8} />
      <rect x={48} y={94} width={18} height={4} rx={2} fill="white" opacity={0.6} />
      <rect x={310} y={60} width={55} height={42} rx={8} fill="#FF8A65" opacity={0.7} />
      <rect x={318} y={74} width={20} height={4} rx={2} fill="white" opacity={0.5} />
      <rect x={280} y={130} width={40} height={35} rx={6} fill="#FFD54F" opacity={0.6} />
      <rect x={60} y={150} width={35} height={30} rx={6} fill="#FF8A65" opacity={0.5} />

      {/* Workflow fragments — pink and yellow squares */}
      <rect x={30} y={200} width={24} height={24} rx={4} fill="#FF6B9D" opacity={0.4} transform="rotate(15 42 212)" />
      <rect x={340} y={190} width={28} height={28} rx={4} fill="#FFD54F" opacity={0.35} transform="rotate(-10 354 204)" />
      <rect x={50} y={320} width={20} height={20} rx={3} fill="#FFD54F" opacity={0.3} transform="rotate(25 60 330)" />
      <rect x={320} y={300} width={22} height={22} rx={3} fill="#FF6B9D" opacity={0.3} transform="rotate(-20 331 311)" />

      {/* Glass bottle torso */}
      <path d="M160 180 Q155 175 155 170 L155 155 Q155 140 170 135 L200 130 L230 135 Q245 140 245 155 L245 170 Q245 175 240 180 L245 310 Q245 320 235 325 L165 325 Q155 320 155 310 Z" fill="url(#eofp-glass)" stroke="#7EC8E3" strokeWidth={1.5} />

      {/* Binary code flowing inside torso */}
      <text x={175} y={200} fill="#2196F3" opacity={0.4} fontSize={11} fontFamily="monospace">01101</text>
      <text x={180} y={218} fill="#2196F3" opacity={0.35} fontSize={10} fontFamily="monospace">1001</text>
      <text x={172} y={236} fill="#2196F3" opacity={0.3} fontSize={11} fontFamily="monospace">11010</text>
      <text x={185} y={254} fill="#2196F3" opacity={0.25} fontSize={10} fontFamily="monospace">0110</text>
      <text x={175} y={272} fill="#2196F3" opacity={0.3} fontSize={11} fontFamily="monospace">10011</text>
      <text x={180} y={290} fill="#2196F3" opacity={0.2} fontSize={10} fontFamily="monospace">0101</text>

      {/* Crack lines on glass body */}
      <path d="M165 200 L172 220 L168 235" fill="none" stroke="white" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
      <path d="M238 210 L232 228 L235 240" fill="none" stroke="white" strokeWidth={1} opacity={0.4} strokeLinecap="round" />
      <path d="M175 270 L180 285" fill="none" stroke="white" strokeWidth={1} opacity={0.35} strokeLinecap="round" />

      {/* Left arm — extremely long, reaching to floating key */}
      <path d="M155 190 Q120 170 90 140 Q75 120 60 105" stroke="#7EC8E3" strokeWidth={18} strokeLinecap="round" fill="none" opacity={0.7} />
      {/* Left hand */}
      <circle cx={58} cy={102} r={14} fill="#7EC8E3" opacity={0.75} />

      {/* Right arm — extremely long, reaching to other key */}
      <path d="M245 185 Q280 160 310 130 Q325 110 335 90" stroke="#7EC8E3" strokeWidth={18} strokeLinecap="round" fill="none" opacity={0.7} />
      {/* Right hand */}
      <circle cx={337} cy={87} r={14} fill="#7EC8E3" opacity={0.75} />

      {/* Legs — translucent blue */}
      <rect x={170} y={325} width={22} height={55} rx={11} fill="#7EC8E3" opacity={0.55} />
      <rect x={208} y={325} width={22} height={55} rx={11} fill="#7EC8E3" opacity={0.55} />
      {/* Feet */}
      <ellipse cx={181} cy={382} rx={16} ry={8} fill="#4A90D9" opacity={0.5} />
      <ellipse cx={219} cy={382} rx={16} ry={8} fill="#4A90D9" opacity={0.5} />

      {/* Head */}
      <circle cx={200} cy={115} r={38} fill="#7EC8E3" opacity={0.65} />
      {/* Minimal face — two dots for eyes */}
      <circle cx={188} cy={112} r={4} fill="#1A237E" />
      <circle cx={212} cy={112} r={4} fill="#1A237E" />
      {/* Small line mouth */}
      <path d="M193 126 Q200 130 207 126" fill="none" stroke="#1A237E" strokeWidth={2} strokeLinecap="round" opacity={0.6} />
    </svg>
  );
}
