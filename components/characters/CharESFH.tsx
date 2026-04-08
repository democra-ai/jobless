'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * ESFH — 活体品牌 / The Living Brand
 * Corporate Memphis: Jumping figure with pop art dots radiating out,
 * personal icons floating (stars, hearts, speech bubbles),
 * twisted dynamic limbs, giant yellow halo circle backdrop.
 */
export default function CharESFH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Giant yellow halo circle backdrop */}
      <circle cx={200} cy={200} r={150} fill="#FFD54F" opacity={0.25} />
      <circle cx={200} cy={200} r={120} fill="#FFD54F" opacity={0.15} />

      {/* Pop art dots radiating */}
      <circle cx={80} cy={100} r={12} fill="#FF6B9D" opacity={0.6} />
      <circle cx={55} cy={180} r={8} fill="#FF6B9D" opacity={0.45} />
      <circle cx={90} cy={280} r={10} fill="#FF6B9D" opacity={0.5} />
      <circle cx={320} cy={90} r={10} fill="#FF6B9D" opacity={0.55} />
      <circle cx={340} cy={200} r={12} fill="#FF6B9D" opacity={0.5} />
      <circle cx={310} cy={300} r={8} fill="#FF6B9D" opacity={0.4} />
      <circle cx={150} cy={55} r={6} fill="#FF6B9D" opacity={0.4} />
      <circle cx={260} cy={60} r={7} fill="#FF6B9D" opacity={0.45} />

      {/* Floating personal icons */}
      {/* Star */}
      <polygon points="75,140 80,128 85,140 97,142 88,150 90,162 80,156 70,162 72,150 63,142" fill="#FFD54F" opacity={0.7} />
      {/* Heart */}
      <path d="M320 140 Q320 128 332 128 Q344 128 344 140 Q344 155 332 165 Q320 155 320 140 Z" fill="#FF6B9D" opacity={0.6} />
      {/* Speech bubble */}
      <rect x={300} y={240} width={45} height={30} rx={10} fill="#4DD0E1" opacity={0.5} />
      <polygon points="315,270 310,282 325,270" fill="#4DD0E1" opacity={0.5} />
      {/* Another star */}
      <polygon points="340,50 343,42 346,50 354,51 348,56 350,64 343,60 336,64 338,56 332,51" fill="#AED581" opacity={0.6} />
      {/* Music note */}
      <circle cx={65} cy={250} r={8} fill="#CE93D8" opacity={0.5} />
      <rect x={72} y={225} width={3} height={28} rx={1.5} fill="#CE93D8" opacity={0.5} />

      {/* Body — jumping pose, vibrant coral */}
      <path d="M175 195 Q172 185 180 178 L200 172 L220 178 Q228 185 225 195 L228 290 Q228 298 220 300 L180 300 Q172 298 172 290 Z" fill="#FF7043" />

      {/* Left arm — twisted dynamic, reaching up */}
      <path d="M175 200 Q140 170 120 130 Q115 115 110 100" stroke="#FF7043" strokeWidth={16} strokeLinecap="round" fill="none" />
      <circle cx={108} cy={96} r={10} fill="#FADCBC" />

      {/* Right arm — twisted dynamic, reaching out */}
      <path d="M225 200 Q260 180 290 160 Q305 150 315 140" stroke="#FF7043" strokeWidth={16} strokeLinecap="round" fill="none" />
      <circle cx={318} cy={137} r={10} fill="#FADCBC" />

      {/* Left leg — kicked out dynamically */}
      <path d="M180 295 Q150 330 120 350 Q110 360 100 365" stroke="#FF7043" strokeWidth={16} strokeLinecap="round" fill="none" />
      <ellipse cx={96} cy={368} rx={14} ry={8} fill="#E64A19" />

      {/* Right leg — kicked back */}
      <path d="M220 295 Q250 320 275 345 Q285 355 295 360" stroke="#FF7043" strokeWidth={16} strokeLinecap="round" fill="none" />
      <ellipse cx={298} cy={363} rx={14} ry={8} fill="#E64A19" />

      {/* Head */}
      <circle cx={200} cy={145} r={36} fill="#FADCBC" />
      {/* Hair — wild, dynamic */}
      <path d="M164 138 Q167 105 200 100 Q233 105 236 138" fill="#8B3A20" />
      <circle cx={175} cy={108} r={8} fill="#8B3A20" />
      <circle cx={195} cy={100} r={9} fill="#8B3A20" />
      <circle cx={215} cy={102} r={8} fill="#8B3A20" />
      <circle cx={230} cy={110} r={7} fill="#8B3A20" />

      {/* Happy eyes — arched */}
      <path d="M185 142 Q190 137 195 142" stroke="#2C2420" strokeWidth={3} strokeLinecap="round" fill="none" />
      <path d="M205 142 Q210 137 215 142" stroke="#2C2420" strokeWidth={3} strokeLinecap="round" fill="none" />

      {/* Big open smile */}
      <path d="M188 156 Q200 168 212 156" fill="none" stroke="#C08060" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M192 157 Q200 164 208 157" fill="#B71C1C" opacity={0.3} />
    </svg>
  );
}
