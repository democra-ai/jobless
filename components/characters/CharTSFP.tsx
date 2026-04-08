'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TSFP — 灵魂匠人 / The Soul Craftsman
 * Corporate Memphis: Bent over figure cradling an irregular glowing golden shape,
 * colorful paint splashes on body, asymmetric shoulders, earthy irregular polygons.
 */
export default function CharTSFP({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      <defs>
        <linearGradient id="tsfp-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="50%" stopColor="#FFC107" />
          <stop offset="100%" stopColor="#FF8F00" />
        </linearGradient>
        <filter id="tsfp-gold-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Earthy irregular polygon background */}
      <polygon points="30,350 80,330 60,380" fill="#795548" opacity={0.15} />
      <polygon points="100,360 160,340 140,390 90,385" fill="#8D6E63" opacity={0.12} />
      <polygon points="250,355 320,335 340,375 270,390" fill="#795548" opacity={0.13} />
      <polygon points="340,345 380,330 390,370 355,385" fill="#8D6E63" opacity={0.1} />
      <polygon points="50,80 90,60 110,100 70,110" fill="#A1887F" opacity={0.08} />
      <polygon points="300,70 350,55 360,95 320,100" fill="#8D6E63" opacity={0.08} />

      {/* Body — bent over posture, earthy warm tone */}
      <path d="M185 180 Q175 172 180 165 L200 158 L225 165 Q232 172 228 180 L235 310 Q235 325 225 328 L180 328 Q170 325 170 310 Z" fill="#6D4C41" />

      {/* Asymmetric shoulders */}
      <ellipse cx={175} cy={180} rx={20} ry={12} fill="#6D4C41" />
      <ellipse cx={230} cy={175} rx={22} ry={14} fill="#6D4C41" />

      {/* Paint splashes on body */}
      <circle cx={190} cy={210} r={8} fill="#FF7043" opacity={0.6} />
      <circle cx={215} cy={240} r={6} fill="#42A5F5" opacity={0.5} />
      <circle cx={180} cy={260} r={7} fill="#66BB6A" opacity={0.5} />
      <circle cx={225} cy={200} r={5} fill="#FFD54F" opacity={0.6} />
      <circle cx={195} cy={280} r={5} fill="#AB47BC" opacity={0.4} />
      {/* Splash splatters */}
      <ellipse cx={192} cy={218} rx={12} ry={3} fill="#FF7043" opacity={0.3} transform="rotate(-20 192 218)" />
      <ellipse cx={213} cy={248} rx={10} ry={3} fill="#42A5F5" opacity={0.25} transform="rotate(15 213 248)" />

      {/* Arms — bent forward, cradling the golden shape */}
      <path d="M175 185 Q145 200 130 230 Q120 250 125 270" stroke="#6D4C41" strokeWidth={16} strokeLinecap="round" fill="none" />
      <path d="M230 180 Q260 195 275 225 Q285 250 280 270" stroke="#6D4C41" strokeWidth={16} strokeLinecap="round" fill="none" />

      {/* Hands — cupped, holding */}
      <path d="M118 268 Q110 280 120 290 Q130 295 140 288 Q145 280 138 272 Z" fill="#FADCBC" />
      <path d="M282 268 Q290 280 280 290 Q270 295 260 288 Q255 280 262 272 Z" fill="#FADCBC" />

      {/* Irregular glowing golden geometric shape — the soul craft */}
      <path d="M155 260 L180 230 L220 225 L250 250 L240 285 L195 295 L160 280 Z" fill="url(#tsfp-glow)" filter="url(#tsfp-gold-glow)" />
      {/* Rough edges detail */}
      <path d="M155 260 L180 230 L220 225 L250 250 L240 285 L195 295 L160 280 Z" fill="none" stroke="#FF8F00" strokeWidth={2} opacity={0.6} />
      {/* Inner shimmer */}
      <path d="M175 255 L195 242 L220 240 L235 258 L228 275 L198 280 L172 270 Z" fill="#FFF176" opacity={0.3} />

      {/* Legs */}
      <rect x={178} y={322} width={18} height={48} rx={9} fill="#5D4037" />
      <rect x={208} y={322} width={18} height={48} rx={9} fill="#5D4037" />
      <ellipse cx={187} cy={372} rx={14} ry={7} fill="#4E342E" />
      <ellipse cx={217} cy={372} rx={14} ry={7} fill="#4E342E" />

      {/* Head — looking down at creation */}
      <circle cx={200} cy={138} r={32} fill="#FADCBC" />
      <path d="M168 132 Q172 105 200 100 Q228 105 232 132" fill="#5D4037" />
      {/* Eyes — focused down */}
      <circle cx={190} cy={140} r={3} fill="#2C2420" />
      <circle cx={210} cy={140} r={3} fill="#2C2420" />
      {/* Gentle content smile */}
      <path d="M192 152 Q200 158 208 152" fill="none" stroke="#C08060" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}
