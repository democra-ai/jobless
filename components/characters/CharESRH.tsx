'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * ESRH — 神谕者 / The Oracle
 * Corporate Memphis: Seated atop a staircase of stacked books,
 * halo of numbers and years floating above head, long drooping arms,
 * deep indigo tones, upward-pointing thin triangle arrows.
 */
export default function CharESRH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Upward thin triangle arrows in background */}
      <polygon points="40,380 45,340 50,380" fill="#3949AB" opacity={0.15} />
      <polygon points="70,390 76,345 82,390" fill="#3949AB" opacity={0.12} />
      <polygon points="100,385 107,335 114,385" fill="#3949AB" opacity={0.13} />
      <polygon points="290,385 297,340 304,385" fill="#3949AB" opacity={0.12} />
      <polygon points="320,380 326,330 332,380" fill="#3949AB" opacity={0.14} />
      <polygon points="350,390 357,348 364,390" fill="#3949AB" opacity={0.11} />
      <polygon points="130,395 136,355 142,395" fill="#3949AB" opacity={0.1} />
      <polygon points="260,395 267,358 274,395" fill="#3949AB" opacity={0.1} />

      {/* Stacked book staircase */}
      <rect x={120} y={320} width={160} height={18} rx={3} fill="#5C6BC0" />
      <rect x={130} y={300} width={140} height={18} rx={3} fill="#7986CB" />
      <rect x={140} y={280} width={120} height={18} rx={3} fill="#5C6BC0" />
      <rect x={148} y={260} width={104} height={18} rx={3} fill="#9FA8DA" />
      <rect x={155} y={240} width={90} height={18} rx={3} fill="#5C6BC0" />
      <rect x={162} y={220} width={76} height={18} rx={3} fill="#7986CB" />
      {/* Book spine lines */}
      <rect x={170} y={322} width={3} height={14} rx={1} fill="#3949AB" opacity={0.3} />
      <rect x={220} y={302} width={3} height={14} rx={1} fill="#3949AB" opacity={0.3} />
      <rect x={190} y={282} width={3} height={14} rx={1} fill="#3949AB" opacity={0.3} />

      {/* Seated body at top of books */}
      <path d="M175 195 Q172 188 178 182 L200 178 L222 182 Q228 188 225 195 L230 240 L170 240 Z" fill="#283593" />

      {/* Long drooping arms */}
      <path d="M175 200 Q150 220 135 260 Q125 290 128 320" stroke="#283593" strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M225 200 Q250 220 265 260 Q275 290 272 320" stroke="#283593" strokeWidth={14} strokeLinecap="round" fill="none" />
      <circle cx={128} cy={324} r={8} fill="#FADCBC" />
      <circle cx={272} cy={324} r={8} fill="#FADCBC" />

      {/* Legs — crossed/folded on books */}
      <path d="M180 235 Q170 250 175 265 Q180 275 195 268" stroke="#283593" strokeWidth={14} strokeLinecap="round" fill="none" />
      <path d="M220 235 Q230 250 225 265 Q220 275 205 268" stroke="#283593" strokeWidth={14} strokeLinecap="round" fill="none" />

      {/* Head */}
      <circle cx={200} cy={155} r={35} fill="#FADCBC" />
      {/* Hair — wise, side-parted */}
      <path d="M165 148 Q168 118 200 112 Q232 118 235 148 L232 135 Q230 122 200 118 Q170 122 168 135 Z" fill="#8A8A8A" />

      {/* Halo of numbers and years above head */}
      <text x={155} y={95} fill="#7986CB" opacity={0.5} fontSize={12} fontFamily="monospace">2024</text>
      <text x={200} y={85} fill="#9FA8DA" opacity={0.45} fontSize={10} fontFamily="monospace">97.3</text>
      <text x={232} y={95} fill="#7986CB" opacity={0.5} fontSize={11} fontFamily="monospace">2019</text>
      <text x={145} y={110} fill="#9FA8DA" opacity={0.4} fontSize={9} fontFamily="monospace">±2.1</text>
      <text x={235} y={108} fill="#7986CB" opacity={0.4} fontSize={10} fontFamily="monospace">n=42</text>
      <text x={180} y={78} fill="#C5CAE9" opacity={0.35} fontSize={9} fontFamily="monospace">∞</text>
      {/* Halo arc */}
      <path d="M150 100 Q175 65 200 60 Q225 65 250 100" fill="none" stroke="#7986CB" strokeWidth={1.5} opacity={0.25} />

      {/* Wise eyes */}
      <circle cx={190} cy={155} r={4} fill="#1A237E" />
      <circle cx={210} cy={155} r={4} fill="#1A237E" />
      {/* Eye glint */}
      <circle cx={191.5} cy={153.5} r={1.2} fill="white" opacity={0.7} />
      <circle cx={211.5} cy={153.5} r={1.2} fill="white" opacity={0.7} />

      {/* Serene smile */}
      <path d="M192 168 Q200 174 208 168" fill="none" stroke="#C08060" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
