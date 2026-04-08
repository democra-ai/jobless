'use client';

import type { CharacterProps } from './CharacterBase';

/**
 * TOFH — 签名手艺人 / The Signature Touch
 * Corporate Memphis: Center composition of intertwined elegant hands with wave lines,
 * abstract person outline, warm pink and light orange tones, spiral signature curves.
 */
export default function CharTOFH({ size = 200, className }: CharacterProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 400 400" fill="none" className={className}>
      {/* Background spiral signature curves */}
      <path d="M50 300 Q100 250 150 280 Q200 310 250 260 Q300 210 350 250" stroke="#FFAB91" strokeWidth={3} fill="none" opacity={0.2} />
      <path d="M60 330 Q120 280 180 310 Q240 340 300 290 Q340 260 370 280" stroke="#F48FB1" strokeWidth={2.5} fill="none" opacity={0.18} />
      <path d="M40 260 Q90 230 130 250 Q170 270 220 230 Q270 190 330 220" stroke="#FFAB91" strokeWidth={2} fill="none" opacity={0.15} />
      <path d="M80 350 Q140 320 200 345 Q260 370 320 340" stroke="#F48FB1" strokeWidth={2} fill="none" opacity={0.12} />

      {/* Warm background glow */}
      <circle cx={200} cy={180} r={100} fill="#FCE4EC" opacity={0.3} />

      {/* Abstract person outline — subtle */}
      <path d="M170 320 L175 230 Q178 215 185 210 L200 205 L215 210 Q222 215 225 230 L230 320" stroke="#F48FB1" strokeWidth={2} fill="none" opacity={0.35} />
      <circle cx={200} cy={185} r={22} stroke="#F48FB1" strokeWidth={2} fill="none" opacity={0.3} />

      {/* Central intertwined hands */}
      {/* Left hand — flowing, elegant */}
      <path d="M140 180 Q155 150 180 140 Q195 135 200 145" stroke="#FADCBC" strokeWidth={14} strokeLinecap="round" fill="none" />
      {/* Left fingers */}
      <path d="M145 175 Q130 155 125 140" stroke="#FADCBC" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M155 165 Q142 148 138 130" stroke="#FADCBC" strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d="M165 155 Q158 140 155 125" stroke="#FADCBC" strokeWidth={7} strokeLinecap="round" fill="none" />

      {/* Right hand — intertwined with left */}
      <path d="M260 180 Q245 150 220 140 Q205 135 200 145" stroke="#FADCBC" strokeWidth={14} strokeLinecap="round" fill="none" />
      {/* Right fingers */}
      <path d="M255 175 Q270 155 275 140" stroke="#FADCBC" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M245 165 Q258 148 262 130" stroke="#FADCBC" strokeWidth={7} strokeLinecap="round" fill="none" />
      <path d="M235 155 Q242 140 245 125" stroke="#FADCBC" strokeWidth={7} strokeLinecap="round" fill="none" />

      {/* Wave lines emanating from fingertips — the signature touch */}
      <path d="M120 135 Q110 120 100 130 Q90 140 80 125" stroke="#FF8A65" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.6} />
      <path d="M132 122 Q120 108 110 115 Q100 125 88 110" stroke="#F48FB1" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M150 118 Q140 100 130 108" stroke="#FF8A65" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.4} />

      <path d="M280 135 Q290 120 300 130 Q310 140 320 125" stroke="#FF8A65" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.6} />
      <path d="M268 122 Q280 108 290 115 Q300 125 312 110" stroke="#F48FB1" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.5} />
      <path d="M250 118 Q260 100 270 108" stroke="#FF8A65" strokeWidth={2} strokeLinecap="round" fill="none" opacity={0.4} />

      {/* Central wave trail from touch */}
      <path d="M180 155 Q190 145 200 150 Q210 155 220 148" stroke="#FF8A65" strokeWidth={3} strokeLinecap="round" fill="none" opacity={0.7} />
      <path d="M175 168 Q188 158 200 165 Q212 172 225 162" stroke="#F48FB1" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.5} />

      {/* Small signature flourish at bottom */}
      <path d="M160 370 Q180 355 200 365 Q220 375 240 360 Q250 354 260 358" stroke="#FF8A65" strokeWidth={2.5} strokeLinecap="round" fill="none" opacity={0.4} />
    </svg>
  );
}
