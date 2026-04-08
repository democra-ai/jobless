'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TORP — 不颤之手 / The Steady Hand
 * Corporate Memphis: Gray panoramic scene, one bright green arm is perfectly vertical,
 * pearl on fingertip, everything else wavy/blurred, figure made of sharp lines and perfect circles.
 */
export default function CharTORP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Wavy/blurred background lines — everything unstable */}
      <path d="M30 80 Q80 70 130 90 Q180 110 230 85 Q280 60 330 95 Q360 115 390 90" stroke="#9E9E9E" strokeWidth={2.5} fill="none" opacity={0.2} />
      <path d="M20 140 Q70 160 120 135 Q170 110 220 150 Q270 190 320 145 Q370 100 400 160" stroke="#BDBDBD" strokeWidth={2} fill="none" opacity={0.18} />
      <path d="M30 200 Q90 220 150 195 Q210 170 270 210 Q330 250 380 205" stroke="#9E9E9E" strokeWidth={2} fill="none" opacity={0.15} />
      <path d="M20 260 Q80 240 140 270 Q200 300 260 255 Q320 210 380 265" stroke="#BDBDBD" strokeWidth={2} fill="none" opacity={0.15} />
      <path d="M30 320 Q100 340 170 310 Q240 280 310 330 Q350 350 390 320" stroke="#9E9E9E" strokeWidth={2} fill="none" opacity={0.12} />

      {/* Figure made of sharp geometric lines and perfect circles */}
      {/* Body — precise geometric gray */}
      <rect x={170} y={185} width={60} height={140} rx={4} fill="#616161" />

      {/* Head — perfect circle */}
      <circle cx={200} cy={155} r={35} fill="#757575" />
      {/* Eyes — two precise horizontal bars */}
      <rect x={185} y={152} width={8} height={3} rx={1.5} fill="#E0E0E0" />
      <rect x={207} y={152} width={8} height={3} rx={1.5} fill="#E0E0E0" />
      {/* Mouth — thin precise line */}
      <rect x={192} y={168} width={16} height={2} rx={1} fill="#E0E0E0" />

      {/* Left arm — normal gray, slightly wavy */}
      <path d="M170 200 Q150 215 135 250 Q125 275 130 300" stroke="#616161" strokeWidth={16} strokeLinecap="round" fill="none" />
      <circle cx={130} cy={304} r={10} fill="#757575" />

      {/* RIGHT ARM — THE STAR: bright green, perfectly vertical, absolutely steady */}
      <rect x={228} y={100} width={18} height={160} rx={9} fill="#4CAF50" />
      {/* Forearm detail */}
      <rect x={231} y={110} width={12} height={145} rx={6} fill="#66BB6A" opacity={0.5} />

      {/* Hand at top — precise */}
      <rect x={229} y={85} width={16} height={20} rx={5} fill="#81C784" />
      {/* Fingers holding pearl */}
      <rect x={232} y={70} width={5} height={18} rx={2.5} fill="#81C784" />
      <rect x={237} y={68} width={5} height={20} rx={2.5} fill="#81C784" />
      <rect x={242} y={72} width={5} height={16} rx={2.5} fill="#81C784" />

      {/* Pearl — tiny, perfect, precious */}
      <circle cx={237} cy={60} r={8} fill="#F5F5F5" />
      <circle cx={234} cy={57} r={3} fill="white" opacity={0.8} />
      <circle cx={237} cy={60} r={8} fill="none" stroke="#E0E0E0" strokeWidth={0.8} />

      {/* Subtle glow around pearl */}
      <circle cx={237} cy={60} r={14} fill="none" stroke="#4CAF50" strokeWidth={1} opacity={0.3} />
      <circle cx={237} cy={60} r={20} fill="none" stroke="#4CAF50" strokeWidth={0.5} opacity={0.15} />

      {/* Legs — geometric, precise */}
      <rect x={175} y={320} width={18} height={55} rx={4} fill="#616161" />
      <rect x={207} y={320} width={18} height={55} rx={4} fill="#616161" />
      <rect x={171} y={372} width={26} height={10} rx={4} fill="#424242" />
      <rect x={203} y={372} width={26} height={10} rx={4} fill="#424242" />
    </svg>
  );
}
