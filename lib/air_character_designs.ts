/**
 * AIR Character Design System
 *
 * 16 archetype character designs across multiple illustration styles.
 * Each archetype has a defined visual identity: appearance, expression, clothing, and props
 * that represent their personality and profession.
 *
 * Styles supported:
 * - Open Peeps (react-peeps): hand-drawn half-body characters with clothing
 * - Notion Avatar (react-notion-avatar): minimalist black-and-white head avatars
 * - DiceBear: CDN-based avatar generation (multiple sub-styles)
 */

// ─── Open Peeps (react-peeps) configs ────────────────────────────────────────
// Body types: BustPose | StandingPose | SittingPose
// Face: expression  |  Hair: hairstyle  |  Accessory: eyewear  |  FacialHair

export const PEEPS_CONFIGS: Record<string, {
  body: string;
  face: string;
  hair: string;
  accessory?: string;
  facialHair?: string;
}> = {
  // ── Extreme High Risk ──
  EOFP: {
    // Glass Cannon / 玻璃大炮 — Office admin, fully transparent to AI
    body: 'Device',        // working on a device (data entry vibe)
    face: 'Concerned',     // slightly worried expression
    hair: 'ShortMessy',    // casual, everyday person
    accessory: 'None',
  },

  // ── High Risk ──
  EOFH: {
    // Human Bridge / 人脉桥梁 — Sales, relationship-based
    body: 'Explaining',    // explaining/pitching gesture
    face: 'SmileTeeth',    // big warm smile (salesperson energy)
    hair: 'MediumStraight',
    accessory: 'None',
  },
  EORP: {
    // Final Stamp / 终审印章 — Compliance, quality inspection
    body: 'ArmsCrossed',   // authoritative crossed arms
    face: 'Serious',       // stern, no-nonsense
    hair: 'Short',
    accessory: 'GlassRound', // glasses = bureaucratic precision
  },
  ESFP: {
    // Taste Maker / 品味定义者 — Designer, creative
    body: 'PointingUp',    // pointing up = "I have an idea!"
    face: 'Driven',        // focused creative energy
    hair: 'BangsFilled',   // stylish hair
    accessory: 'GlassButterfly', // fashion-forward eyewear
  },
  TOFP: {
    // Bare Hand / 赤手行者 — Maintenance, physical labor
    body: 'Hoodie',        // casual workwear
    face: 'Calm',          // steady, reliable
    hair: 'FlatTop',       // practical short hair
    accessory: 'None',
  },

  // ── Medium Risk ──
  EORH: {
    // License Wall / 执照之墙 — Licensed finance/legal
    body: 'ButtonShirt',   // professional button-down
    face: 'Solemn',        // dignified, serious
    hair: 'Pomp',          // well-groomed professional
    accessory: 'GlassRoundThick', // thick professional glasses
  },
  ESFH: {
    // Living Brand / 活体品牌 — Content creator, influencer
    body: 'Selena',        // fashionable outfit
    face: 'SmileBig',      // radiating personality
    hair: 'LongBangs',     // distinctive, recognizable look
    accessory: 'SunglassClubmaster', // cool sunglasses
  },
  ESRP: {
    // Pressure Alchemist / 高压炼金师 — Engineer, architect
    body: 'Paper',         // holding papers/blueprints
    face: 'Driven',        // intense focus
    hair: 'ShortVolumed',
    accessory: 'GlassRound',
  },
  TOFH: {
    // Signature Touch / 签名手艺人 — Barber, personal care
    body: 'Coffee',        // relaxed personal vibe
    face: 'Smile',         // warm, approachable
    hair: 'MediumBangs',   // well-styled (practices what they preach)
    accessory: 'None',
  },
  TORP: {
    // Steady Hand / 不颤之手 — Surgeon, pilot
    body: 'Turtleneck',    // clean, precise look
    face: 'Calm',          // absolutely composed
    hair: 'BaldSides',     // no-nonsense, military-adjacent
    accessory: 'None',
  },
  TSFP: {
    // Soul Craftsman / 灵魂匠人 — Chef, artisan
    body: 'Sweater',       // cozy artisan vibes
    face: 'EatingHappy',   // food/craft joy
    hair: 'Bun',           // practical creative style
    accessory: 'None',
  },

  // ── Low Risk ──
  ESRH: {
    // Oracle / 神谕者 — Senior lawyer, consultant
    body: 'BlazerBlackTee', // blazer = authority
    face: 'Contempt',       // knowing smirk (seen everything)
    hair: 'GrayMedium',     // gray = experience/wisdom
    accessory: 'GlassRound',
    facialHair: 'GoateeCircle',
  },
  TORH: {
    // Healing Hand / 疗愈之手 — Dentist, obstetrician
    body: 'ShirtFilled',    // clean medical look
    face: 'Cute',           // gentle, caring
    hair: 'MediumShort',
    accessory: 'None',
  },
  TSFH: {
    // Irreplaceable / 不可替代者 — Performing artist
    body: 'Thunder',        // expressive, dramatic outfit
    face: 'Cheeky',         // playful charisma
    hair: 'LongCurly',      // dramatic, expressive hair
    accessory: 'None',
  },
  TSRP: {
    // Last Call / 终极裁决者 — Emergency responder, military
    body: 'Killer',          // intense, action-ready
    face: 'VeryAngry',       // fierce determination
    hair: 'Mohawk',          // bold, fearless
    accessory: 'Eyepatch',   // battle-hardened
  },

  // ── Extreme Low Risk ──
  TSRH: {
    // Iron Fortress / 铁壁堡垒 — Top executive, elite athlete
    body: 'ShirtCoat',       // coat over shirt = boss energy
    face: 'Serious',         // commanding presence
    hair: 'ShortWavy',       // distinguished
    accessory: 'None',
    facialHair: 'Full',       // full beard = gravitas
  },
};


// ─── Notion Avatar (react-notion-avatar) configs ─────────────────────────────
// Each value is a number index. Range varies by attribute.
// face: 0-11, eye: 0-14, eyebrow: 0-16, glass: 0-13, hair: 0-58,
// mouth: 0-20, nose: 0-14, accessory: 0-13, beard: 0-17, detail: 0-14

export interface NotionAvatarConfig {
  face: number;
  eye: number;
  eyebrow: number;
  glass: number;
  hair: number;
  mouth: number;
  nose: number;
  accessory: number;
  beard: number;
  detail: number;
}

export const NOTION_CONFIGS: Record<string, NotionAvatarConfig> = {
  // ── Extreme High Risk ──
  EOFP: {
    // Glass Cannon — worried office worker
    face: 3, eye: 6, eyebrow: 8, glass: 0, hair: 15,
    mouth: 7, nose: 3, accessory: 0, beard: 0, detail: 0,
  },

  // ── High Risk ──
  EOFH: {
    // Human Bridge — friendly salesperson
    face: 1, eye: 2, eyebrow: 3, glass: 0, hair: 22,
    mouth: 1, nose: 5, accessory: 0, beard: 0, detail: 0,
  },
  EORP: {
    // Final Stamp — strict inspector with glasses
    face: 7, eye: 9, eyebrow: 12, glass: 3, hair: 5,
    mouth: 14, nose: 8, accessory: 0, beard: 0, detail: 0,
  },
  ESFP: {
    // Taste Maker — stylish creative
    face: 4, eye: 1, eyebrow: 5, glass: 8, hair: 42,
    mouth: 3, nose: 2, accessory: 5, beard: 0, detail: 3,
  },
  TOFP: {
    // Bare Hand — practical worker
    face: 0, eye: 4, eyebrow: 0, glass: 0, hair: 33,
    mouth: 0, nose: 0, accessory: 0, beard: 0, detail: 0,
  },

  // ── Medium Risk ──
  EORH: {
    // License Wall — professional with thick glasses
    face: 8, eye: 10, eyebrow: 14, glass: 5, hair: 26,
    mouth: 12, nose: 10, accessory: 0, beard: 0, detail: 0,
  },
  ESFH: {
    // Living Brand — flashy personality
    face: 2, eye: 0, eyebrow: 2, glass: 10, hair: 45,
    mouth: 2, nose: 1, accessory: 8, beard: 0, detail: 7,
  },
  ESRP: {
    // Pressure Alchemist — focused engineer
    face: 5, eye: 7, eyebrow: 6, glass: 2, hair: 10,
    mouth: 8, nose: 6, accessory: 0, beard: 0, detail: 0,
  },
  TOFH: {
    // Signature Touch — warm artisan
    face: 6, eye: 3, eyebrow: 1, glass: 0, hair: 18,
    mouth: 4, nose: 4, accessory: 0, beard: 3, detail: 0,
  },
  TORP: {
    // Steady Hand — composed precision worker
    face: 9, eye: 12, eyebrow: 10, glass: 0, hair: 2,
    mouth: 15, nose: 12, accessory: 0, beard: 0, detail: 0,
  },
  TSFP: {
    // Soul Craftsman — warm chef/artisan
    face: 10, eye: 5, eyebrow: 4, glass: 0, hair: 8,
    mouth: 5, nose: 7, accessory: 0, beard: 5, detail: 0,
  },

  // ── Low Risk ──
  ESRH: {
    // Oracle — wise authority with glasses and beard
    face: 11, eye: 13, eyebrow: 15, glass: 6, hair: 43,
    mouth: 18, nose: 13, accessory: 0, beard: 10, detail: 5,
  },
  TORH: {
    // Healing Hand — gentle caregiver
    face: 1, eye: 8, eyebrow: 7, glass: 0, hair: 30,
    mouth: 6, nose: 9, accessory: 0, beard: 0, detail: 2,
  },
  TSFH: {
    // Irreplaceable — expressive performer
    face: 3, eye: 11, eyebrow: 9, glass: 0, hair: 48,
    mouth: 10, nose: 3, accessory: 11, beard: 0, detail: 9,
  },
  TSRP: {
    // Last Call — fierce emergency responder
    face: 0, eye: 14, eyebrow: 16, glass: 0, hair: 36,
    mouth: 19, nose: 0, accessory: 0, beard: 8, detail: 0,
  },

  // ── Extreme Low Risk ──
  TSRH: {
    // Iron Fortress — commanding leader
    face: 7, eye: 9, eyebrow: 13, glass: 0, hair: 34,
    mouth: 16, nose: 11, accessory: 0, beard: 12, detail: 4,
  },
};


// ─── DiceBear configs ────────────────────────────────────────────────────────
// Multiple DiceBear styles, each with deterministic seeds per archetype.
// Styles: adventurer, notionists, open-peeps, lorelei, personas

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x';

export type DiceBearStyle = 'adventurer' | 'notionists' | 'open-peeps' | 'lorelei' | 'personas';

const DICEBEAR_SEEDS: Record<string, string> = {
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

export function getDiceBearUrl(
  profileCode: string,
  style: DiceBearStyle = 'adventurer',
  format: 'svg' | 'png' = 'svg',
  size = 128,
): string {
  const seed = DICEBEAR_SEEDS[profileCode] || profileCode;
  return `${DICEBEAR_BASE}/${style}/${format}?seed=${encodeURIComponent(seed)}&size=${size}&backgroundColor=transparent`;
}

/** All available DiceBear styles for the style picker */
export const DICEBEAR_STYLES: { id: DiceBearStyle; label: string }[] = [
  { id: 'adventurer', label: 'Adventurer' },
  { id: 'notionists', label: 'Notionists' },
  { id: 'open-peeps', label: 'Open Peeps' },
  { id: 'lorelei', label: 'Lorelei' },
  { id: 'personas', label: 'Personas' },
];


// ─── Unified avatar access ───────────────────────────────────────────────────

export type AvatarStyle = 'peeps' | 'notion' | DiceBearStyle;

export const ALL_AVATAR_STYLES: { id: AvatarStyle; label: string; type: 'component' | 'url' }[] = [
  { id: 'peeps', label: 'Open Peeps', type: 'component' },
  { id: 'notion', label: 'Notion', type: 'component' },
  { id: 'adventurer', label: 'Adventurer', type: 'url' },
  { id: 'notionists', label: 'Notionists', type: 'url' },
  { id: 'open-peeps', label: 'Open Peeps (DiceBear)', type: 'url' },
  { id: 'lorelei', label: 'Lorelei', type: 'url' },
  { id: 'personas', label: 'Personas', type: 'url' },
];
