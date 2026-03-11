/**
 * AIR Quiz Calculator
 *
 * Scoring logic:
 * - Forward questions: score as-is (1-5), higher = more AI-replaceable
 * - Reverse questions: flip (6 - answer), so always higher = more AI-replaceable
 * - Dimension score = average of 4 normalized questions (1-5 scale)
 * - If dimension avg > 3: AI favorable letter (E, O, F, P)
 * - If dimension avg ≤ 3: AI resistant letter (T, S, R, H)
 * - 4-letter type → risk tier → probability range
 * - AI Snapshot (S1-S4) gives independent "current AI capability" score
 */

import {
  QuizAnswer,
  QuizDimension,
  QUIZ_DIMENSIONS,
  AI_SNAPSHOT_QUESTIONS,
  PROFILE_TYPES,
  RISK_TIER_INFO,
  ProfileType,
  AISnapshotQuestion,
  SOC_MAJOR_GROUPS,
} from './air_quiz_data';

export type Language = 'en' | 'zh';

export interface QuizAnswers {
  /** Q1-Q16 answers keyed by question ID */
  core: Record<string, QuizAnswer>;
  /** S1-S4 answers keyed by question ID */
  snapshot: Record<string, QuizAnswer>;
  /** X1-X3 answers keyed by question ID (0-indexed option) */
  survey: Record<string, number>;
}

export interface DimensionResult {
  dimensionId: string;
  name: { en: string; zh: string };
  rawAverage: number; // 1-5, after direction normalization, higher = AI favorable
  letter: string; // E/T, O/S, F/R, P/H
  isFavorable: boolean; // true = AI can replace this dimension
  favorableLabel: { en: string; zh: string };
  resistantLabel: { en: string; zh: string };
}

export interface QuizResult {
  /** 4-letter profile type code, e.g. "EOFP" */
  profileCode: string;
  /** Full profile type info */
  profile: ProfileType;
  /** Per-dimension results */
  dimensions: DimensionResult[];
  /** Number of AI-favorable dimensions (0-4) */
  favorableCount: number;
  /** Overall replacement probability (0-100) */
  replacementProbability: number;
  /** Predicted replacement year */
  predictedReplacementYear: number;
  /** Current AI capability score for this job (0-100), from snapshot */
  currentAICapability: number;
  /** Confidence interval */
  confidenceInterval: { earliest: number; latest: number };
  /** Risk level compatible with existing share system */
  riskLevel: 'very-low' | 'low' | 'medium' | 'high' | 'critical';
  /** Current replacement degree (for share compat) */
  currentReplacementDegree: number;
  /** Resolved occupation SOC group */
  occupationSOC: { code: number; name: { en: string; zh: string }; inferred: boolean } | null;
}

/** Normalize a single answer based on direction. Result: 1-5 where higher = AI favorable. */
function normalizeAnswer(answer: QuizAnswer, direction: 'forward' | 'reverse'): number {
  return direction === 'forward' ? answer : (6 - answer);
}

/** Calculate a single dimension result */
function scoreDimension(dimension: QuizDimension, answers: Record<string, QuizAnswer>): DimensionResult {
  const scores = dimension.questions.map(q => {
    const answer = answers[q.id];
    if (!answer) return 3; // default middle
    return normalizeAnswer(answer, q.direction);
  });

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const isFavorable = avg > 3;

  return {
    dimensionId: dimension.id,
    name: dimension.name,
    rawAverage: Math.round(avg * 100) / 100,
    letter: isFavorable ? dimension.favorableLetter : dimension.resistantLetter,
    isFavorable,
    favorableLabel: dimension.favorableLabel,
    resistantLabel: dimension.resistantLabel,
  };
}

/** Calculate AI snapshot score (0-100) from S1-S4 */
function scoreSnapshot(answers: Record<string, QuizAnswer>): number {
  const scores = AI_SNAPSHOT_QUESTIONS.map(q => {
    const answer = answers[q.id];
    if (!answer) return 3;
    return normalizeAnswer(answer, q.direction);
  });

  // Average on 1-5 scale, convert to 0-100
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return Math.round(((avg - 1) / 4) * 100);
}

/** Map risk tier to compatible riskLevel string */
function toRiskLevel(tier: ProfileType['riskTier']): QuizResult['riskLevel'] {
  switch (tier) {
    case 'extreme-high': return 'critical';
    case 'high': return 'high';
    case 'medium': return 'medium';
    case 'low': return 'low';
    case 'extreme-low': return 'very-low';
  }
}

/** Calculate replacement probability from dimension scores and tier */
function calculateProbability(
  dimensionResults: DimensionResult[],
  favorableCount: number,
  snapshotScore: number,
): number {
  const tier = favorableCount === 4 ? 'extreme-high'
    : favorableCount === 3 ? 'high'
    : favorableCount === 2 ? 'medium'
    : favorableCount === 1 ? 'low'
    : 'extreme-low';

  const { min, max } = RISK_TIER_INFO[tier].probability;

  // Within the tier range, use how strongly each dimension leans
  // favorable dimensions: how far above 3 (max 2 points each)
  // resistant dimensions: how far below 3 (subtracts)
  const totalStrength = dimensionResults.reduce((sum, d) => {
    // Normalize to -1..+1 range where + = more AI favorable
    return sum + (d.rawAverage - 3) / 2;
  }, 0);

  // Map totalStrength (-4..+4) to (0..1) within tier range
  const normalizedStrength = (totalStrength + 4) / 8;
  let baseProbability = min + (max - min) * normalizedStrength;

  // Adjust by AI snapshot (current reality): if AI is already very capable, nudge up
  const snapshotAdjust = (snapshotScore - 50) / 100 * 10; // ±5 points
  baseProbability += snapshotAdjust;

  return Math.round(Math.min(100, Math.max(0, baseProbability)));
}

/** Predict replacement year */
function predictYear(probability: number, snapshotScore: number): {
  year: number;
  confidenceInterval: { earliest: number; latest: number };
} {
  const currentYear = new Date().getFullYear();

  // Higher probability = sooner; higher snapshot = AI already capable = sooner
  // Base: probability 100 → ~2 years, probability 0 → ~25 years
  const baseYears = Math.round(2 + (100 - probability) / 100 * 23);

  // Snapshot adjustment: if AI is already 80%+ capable, accelerate by 1-3 years
  const snapshotAcceleration = Math.max(0, (snapshotScore - 50) / 50 * 3);
  const adjustedYears = Math.max(1, Math.round(baseYears - snapshotAcceleration));

  const year = currentYear + adjustedYears;

  // Uncertainty
  const uncertainty = Math.max(1, Math.round(adjustedYears * 0.3));
  return {
    year,
    confidenceInterval: {
      earliest: currentYear + Math.max(1, adjustedYears - uncertainty),
      latest: currentYear + adjustedYears + uncertainty,
    },
  };
}

/** Resolve occupation from user selection or profile inference */
function resolveOccupation(
  selectedSOC: number | null,
  profileCode: string,
): { code: number; name: { en: string; zh: string }; inferred: boolean } | null {
  if (selectedSOC !== null) {
    const soc = SOC_MAJOR_GROUPS.find(s => s.code === selectedSOC);
    if (soc) return { code: soc.code, name: soc.name, inferred: false };
  }
  // Infer from profile's primarySOC
  const profile = PROFILE_TYPES[profileCode];
  if (profile) {
    const soc = SOC_MAJOR_GROUPS.find(s => s.code === profile.primarySOC);
    if (soc) return { code: soc.code, name: soc.name, inferred: true };
  }
  return null;
}

/** Main calculation function */
export function calculateQuizResult(answers: QuizAnswers, selectedSOC?: number | null): QuizResult {
  // Score each dimension
  const dimensionResults = QUIZ_DIMENSIONS.map(d => scoreDimension(d, answers.core));

  // Build profile code
  const profileCode = dimensionResults.map(d => d.letter).join('');
  const favorableCount = dimensionResults.filter(d => d.isFavorable).length;

  // Look up profile type
  const profile = PROFILE_TYPES[profileCode];
  if (!profile) {
    // Shouldn't happen, but fallback
    throw new Error(`Unknown profile type: ${profileCode}`);
  }

  // Score AI snapshot
  const snapshotScore = scoreSnapshot(answers.snapshot);

  // Calculate probability
  const probability = calculateProbability(dimensionResults, favorableCount, snapshotScore);

  // Predict year
  const { year, confidenceInterval } = predictYear(probability, snapshotScore);

  return {
    profileCode,
    profile,
    dimensions: dimensionResults,
    favorableCount,
    replacementProbability: probability,
    predictedReplacementYear: year,
    currentAICapability: snapshotScore,
    confidenceInterval,
    riskLevel: toRiskLevel(profile.riskTier),
    currentReplacementDegree: snapshotScore,
    occupationSOC: resolveOccupation(selectedSOC ?? null, profileCode),
  };
}
