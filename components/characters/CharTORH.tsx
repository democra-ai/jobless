'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TORH — 疗愈之手 / The Healing Hand
 * Corporate Memphis: Two figures interacting, main figure with oversized gentle palm
 * emitting soft pulse waves, covering a smaller figure, warm mint-green and coral,
 * flowing arc curves throughout.
 */
export default function CharTORH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Flowing arc curves background — rounded, warm */}
      <path d="M30 100 Q100 70 170 110" stroke="#80CBC4" strokeWidth={2.5} fill="none" opacity={0.15} />
      <path d="M230 80 Q300 50 370 90" stroke="#F48FB1" strokeWidth={2} fill="none" opacity={0.12} />
      <path d="M50 350 Q150 320 250 360" stroke="#80CBC4" strokeWidth={2} fill="none" opacity={0.12} />
      <path d="M280 340 Q330 320 380 350" stroke="#F48FB1" strokeWidth={2} fill="none" opacity={0.1} />

      {/* Main (healer) figure — left side, larger */}
      {/* Body */}
      <path d="M115 210 Q110 200 118 192 L145 185 L172 192 Q180 200 175 210 L180 340 Q180 352 170 355 L120 355 Q110 352 110 340 Z" fill="#26A69A" />

      {/* Head */}
      <circle cx={145} cy={160} r={34} fill="#FADCBC" />
      <path d="M111 154 Q114 125 145 120 Q176 125 179 154" fill="#5C3A20" />
      {/* Gentle eyes */}
      <path d="M133 158 Q138 153 143 158" stroke="#2C2420" strokeWidth={2.5} strokeLinecap="round" fill="none" />
      <path d="M148 158 Q153 153 158 158" stroke="#2C2420" strokeWidth={2.5} strokeLinecap="round" fill="none" />
      {/* Warm smile */}
      <path d="M137 172 Q145 180 153 172" fill="none" stroke="#C08060" strokeWidth={2} strokeLinecap="round" />

      {/* Left arm (background) */}
      <path d="M115 220 Q90 240 80 270" stroke="#26A69A" strokeWidth={14} strokeLinecap="round" fill="none" />
      <circle cx={78} cy={274} r={9} fill="#FADCBC" />

      {/* Right arm — reaching out with oversized palm */}
      <path d="M175 215 Q210 210 240 200 Q260 195 275 190" stroke="#26A69A" strokeWidth={16} strokeLinecap="round" fill="none" />

      {/* Oversized healing palm */}
      <ellipse cx={295} cy={190} rx={40} ry={35} fill="#FADCBC" />
      {/* Palm lines */}
      <path d="M278 185 Q295 178 312 185" stroke="#E8B88A" strokeWidth={1.2} opacity={0.4} fill="none" />
      <path d="M282 195 Q295 190 308 195" stroke="#E8B88A" strokeWidth={1.2} opacity={0.4} fill="none" />
      {/* Fingers spreading */}
      <rect x={272} y={158} width={10} height={22} rx={5} fill="#FADCBC" />
      <rect x={285} y={152} width={10} height={25} rx={5} fill="#FADCBC" />
      <rect x={298} y={155} width={10} height={23} rx={5} fill="#FADCBC" />
      <rect x={311} y={160} width={10} height={20} rx={5} fill="#FADCBC" />

      {/* Pulse waves from palm */}
      <path d="M275 220 Q295 235 315 220" stroke="#80CBC4" strokeWidth={2.5} fill="none" opacity={0.4} />
      <path d="M268 238 Q295 258 322 238" stroke="#80CBC4" strokeWidth={2} fill="none" opacity={0.3} />
      <path d="M260 255 Q295 278 330 255" stroke="#80CBC4" strokeWidth={1.5} fill="none" opacity={0.2} />

      {/* Smaller (receiving) figure — right side, beneath the palm */}
      {/* Small body */}
      <path d="M275 285 Q272 278 278 272 L295 268 L312 272 Q318 278 315 285 L318 350 Q318 358 310 360 L280 360 Q272 358 272 350 Z" fill="#EF9A9A" />

      {/* Small head */}
      <circle cx={295} cy={252} r={20} fill="#FADCBC" />
      <path d="M275 248 Q278 234 295 230 Q312 234 315 248" fill="#8B3A20" />
      {/* Peaceful closed eyes */}
      <path d="M288 252 L292 252" stroke="#2C2420" strokeWidth={2} strokeLinecap="round" />
      <path d="M298 252 L302 252" stroke="#2C2420" strokeWidth={2} strokeLinecap="round" />
      {/* Peaceful smile */}
      <path d="M290 260 Q295 264 300 260" fill="none" stroke="#C08060" strokeWidth={1.5} strokeLinecap="round" />

      {/* Small arms relaxed */}
      <path d="M275 290 Q260 300 255 315" stroke="#EF9A9A" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M315 290 Q330 300 335 315" stroke="#EF9A9A" strokeWidth={8} strokeLinecap="round" fill="none" />

      {/* Main figure legs */}
      <rect x={122} y={348} width={16} height={38} rx={8} fill="#00897B" />
      <rect x={152} y={348} width={16} height={38} rx={8} fill="#00897B" />
      <ellipse cx={130} cy={388} rx={12} ry={6} fill="#00695C" />
      <ellipse cx={160} cy={388} rx={12} ry={6} fill="#00695C" />
    </svg>
  );
}
