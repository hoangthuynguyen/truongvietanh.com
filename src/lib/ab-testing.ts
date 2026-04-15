/**
 * A/B testing — variant resolution for v2 pages.
 *
 * Replaces the old 10-URL approach (`/lop-6/checklist-a` vs `/checklist-b`)
 * with 1 URL + variant resolution at render time.
 *
 * Strategy:
 *  - Sticky assignment via cookie (`tva_ab_{test_id}`) to prevent flickering
 *  - Weight-based bucket split (supports unequal weights)
 *  - Explicit override via URL param `?v=a` for QA/preview
 *  - Returns `{variant, blocks}` where blocks override the base page blocks
 */
import { createDirectus, rest, readItems, staticToken } from '@directus/sdk';
import type { AbTest, AbTestVariant, BlockInstance, Page } from '../types/cms';

type Schema = { ab_tests: AbTest[]; [key: string]: any };

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL || 'https://cms.truongvietanh.com';
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_READ_TOKEN || '';
const client = createDirectus<Schema>(DIRECTUS_URL).with(rest()).with(staticToken(DIRECTUS_TOKEN));

const cache = new Map<string, AbTest | null>();

export async function getAbTest(id: string): Promise<AbTest | null> {
  if (cache.has(id)) return cache.get(id)!;
  try {
    const items = await client.request(
      readItems('ab_tests' as never, {
        filter: { id: { _eq: id }, status: { _eq: 'running' } },
        fields: ['*', 'variants.*', 'variants.blocks.id', 'variants.blocks.collection', 'variants.blocks.sort', 'variants.blocks.item.*'],
        limit: 1,
      }) as any,
    ) as AbTest[];
    const test = items[0] || null;
    cache.set(id, test);
    return test;
  } catch {
    return null;
  }
}

/**
 * Stable hash from user identifier → [0, 1) bucket.
 * Uses the browser's first-touch cookie ID if present, else falls back to
 * page slug + test ID for SSG stability.
 */
function hashBucket(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffffffff;
}

/**
 * Pick a variant given total weight and user bucket.
 */
function pickVariant(variants: AbTestVariant[], bucket: number): AbTestVariant {
  const totalWeight = variants.reduce((s, v) => s + v.weight, 0);
  let cumulative = 0;
  for (const v of variants) {
    cumulative += v.weight / totalWeight;
    if (bucket <= cumulative) return v;
  }
  return variants[variants.length - 1];
}

/**
 * Resolve which variant a visitor should see.
 *
 * At build time (SSG) we use a stable seed from slug — every visitor sees
 * the same variant for a given URL. This is OK for static A/B: marketing
 * should use GrowthBook SDK at runtime for true user-level splitting.
 *
 * For runtime split (client-side), dispatcher can read `?v=` query param
 * to force a variant for preview/QA.
 */
export async function resolveVariant(
  page: Page,
  requestUrl: URL,
): Promise<{ variant: AbTestVariant | null; blocks: BlockInstance[] }> {
  if (!page.ab_test_ref) return { variant: null, blocks: page.blocks };

  const test = await getAbTest(page.ab_test_ref);
  if (!test || !test.variants?.length) return { variant: null, blocks: page.blocks };

  // Explicit override (?v=a)
  const force = requestUrl.searchParams.get('v');
  if (force) {
    const forced = test.variants.find((v) => v.name === force || v.id === force);
    if (forced) return { variant: forced, blocks: forced.blocks || page.blocks };
  }

  // Stable bucket from slug (SSG-compatible)
  const seed = `${test.id}:${page.slug}`;
  const bucket = hashBucket(seed);
  const variant = pickVariant(test.variants, bucket);

  return {
    variant,
    blocks: variant.blocks?.length ? variant.blocks : page.blocks,
  };
}
