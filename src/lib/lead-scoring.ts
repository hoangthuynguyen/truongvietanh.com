/**
 * Lead scoring + idempotency — pure functions, extracted from lead-worker-v2.js
 * so they can be unit tested and reused across worker/SSR contexts.
 */

export interface LeadInput {
  email?: string;
  phone?: string;
  full_name?: string;
  child_name?: string;
  school_level?: string;
  preferred_campus?: string;
  preferred_date?: string;
  lead_score_weight?: number;
  utm_source?: string;
  utm_medium?: string;
}

export interface FunnelMeta {
  lead_score_base?: number;
}

/**
 * Normalize Vietnamese phone to 0xxxxxxxxxx format.
 * Accepts +84, 84, or 0 prefix. Strips spaces/dashes/parens.
 */
export function normalizePhone(p: string | undefined | null): string {
  if (!p) return '';
  let s = String(p).replace(/[\s\-()]/g, '');
  if (s.startsWith('+84')) s = '0' + s.slice(3);
  if (s.startsWith('84') && s.length === 11) s = '0' + s.slice(2);
  return s;
}

/**
 * Lead scoring formula:
 *   base = (form_weight × 10) + funnel_base
 *   profile_bonus = +5 per (email, name, child_name, level, campus), +10 per (phone, date)
 *   utm_bonus: google/cpc +8, facebook/paid +5, zalo +6, referral +4
 *   capped at 100
 */
export function computeLeadScore(data: LeadInput, funnel?: FunnelMeta | null): number {
  let score = (data.lead_score_weight || 1.0) * 10;

  if (funnel?.lead_score_base) score += funnel.lead_score_base;

  if (data.email) score += 5;
  if (data.phone) score += 10;
  if (data.full_name) score += 5;
  if (data.child_name) score += 5;
  if (data.school_level) score += 5;
  if (data.preferred_campus) score += 5;
  if (data.preferred_date) score += 10;

  const src = (data.utm_source || '').toLowerCase();
  const medium = (data.utm_medium || '').toLowerCase();
  if (src === 'google' && medium.includes('cpc')) score += 8;
  else if (src === 'facebook' && medium.includes('paid')) score += 5;
  else if (src === 'zalo') score += 6;
  else if (src === 'referral') score += 4;

  return Math.min(100, Math.round(score));
}

/**
 * Hot lead threshold — leads at/above this score get routed to sales-call-now workflow.
 */
export const HOT_LEAD_THRESHOLD = 70;

export function isHotLead(score: number): boolean {
  return score >= HOT_LEAD_THRESHOLD;
}

/**
 * Idempotency key for deduplicating form submissions within a 1-hour window.
 * Uses SHA-256 of `email|phone|page|hourBucket`.
 *
 * Works in both browser (Web Crypto) and Node (webcrypto global in Node 18+).
 */
export async function idempotencyKey(data: {
  email?: string;
  phone?: string;
  page?: string;
}): Promise<string> {
  const hourBucket = Math.floor(Date.now() / 3600000);
  const raw = `${data.email || ''}|${data.phone || ''}|${data.page || ''}|${hourBucket}`;
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * A/B variant bucket — stable hash from a seed string to [0, 1).
 * Uses FNV-1a hash; deterministic across browser/worker/Node.
 */
export function hashBucket(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

/**
 * Pick a variant given weighted list + user bucket.
 */
export function pickVariant<T extends { weight: number }>(variants: T[], bucket: number): T {
  const total = variants.reduce((s, v) => s + v.weight, 0);
  let cum = 0;
  for (const v of variants) {
    cum += v.weight / total;
    if (bucket <= cum) return v;
  }
  return variants[variants.length - 1];
}
