/**
 * DiceBear avatar URLs for each archetype.
 * Uses the "adventurer" style with deterministic seeds based on profile code + archetype name.
 * Each archetype always gets the same unique character face.
 *
 * API docs: https://www.dicebear.com/styles/adventurer/
 */

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x/adventurer/svg';

/** Deterministic seeds per archetype — chosen to produce distinct, appealing faces */
const ARCHETYPE_SEEDS: Record<string, string> = {
  EOFP: 'glass-cannon-fire',
  EOFH: 'human-bridge-connect',
  EORP: 'final-stamp-authority',
  ESFP: 'taste-maker-palette',
  TOFP: 'bare-hand-craft',
  EORH: 'license-wall-shield',
  ESFH: 'living-brand-star',
  ESRP: 'pressure-alchemist-forge',
  TOFH: 'signature-touch-blade',
  TORP: 'steady-hand-precision',
  TSFP: 'soul-craftsman-kiln',
  ESRH: 'oracle-crystal-vision',
  TORH: 'healing-hand-pulse',
  TSFH: 'irreplaceable-butterfly',
  TSRP: 'last-call-thunder',
  TSRH: 'iron-fortress-bastion',
};

/**
 * Get the DiceBear avatar URL for a given profile code.
 * Returns an SVG URL that can be used directly in <img> tags.
 */
export function getAvatarUrl(profileCode: string, size = 128): string {
  const seed = ARCHETYPE_SEEDS[profileCode] || profileCode;
  return `${DICEBEAR_BASE}?seed=${encodeURIComponent(seed)}&size=${size}&backgroundColor=transparent`;
}

/**
 * Get avatar URL optimized for OG images (PNG format, larger size).
 * Satori (used by @vercel/og ImageResponse) has limited SVG-in-img support,
 * so we use PNG format for server-rendered OG cards and posters.
 */
export function getAvatarUrlForOG(profileCode: string): string {
  const seed = ARCHETYPE_SEEDS[profileCode] || profileCode;
  return `https://api.dicebear.com/9.x/adventurer/png?seed=${encodeURIComponent(seed)}&size=200&backgroundColor=transparent`;
}
