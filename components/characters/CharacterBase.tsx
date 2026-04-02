'use client';

/**
 * AIR Character SVG Building Blocks
 *
 * Style: clean flat geometric. NO outlines on faces. Filled shapes only.
 * Big head (head:body = 1:1.5), dot eyes, line mouth, solid color fills.
 * Similar to 16personalities / Kurzgesagt — simple, iconic, instantly readable.
 */

export interface CharacterProps {
  size?: number;
  className?: string;
}

export const SKIN = {
  light: '#FADCBC',
  medium: '#E8B88A',
  tan: '#C69060',
  dark: '#8B6040',
} as const;

export const HAIR_COLORS = {
  black: '#2C2420',
  brown: '#5C3A20',
  auburn: '#8B3A20',
  gray: '#8A8A8A',
  blonde: '#C8A050',
} as const;
