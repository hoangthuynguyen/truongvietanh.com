/**
 * Trại Hè Squeeze Pages — CMS-driven summer camp landing pages
 *
 * Fetches page content from Directus collection `trai_he_squeeze_pages`.
 * Falls back to local seed JSON (directus/seed/trai-he-squeeze-pages.json)
 * at build time if Directus is unreachable — keeps builds deterministic and
 * protects ads traffic from CMS downtime.
 *
 * Follows the same `cached()` + static-token pattern as getPillarPage in
 * `src/lib/directus.ts`.
 */

import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';
import seedData from '../../directus/seed/trai-he-squeeze-pages.json';

export type UspItem = { icon: string; text: string };
export type MetricItem = { number: string; label: string };
export type InfoCard = { icon: string; title: string; body: string };
export type FaqItem = { question: string; answer: string };
export type QuizOption = { label: string; score: number };
export type QuizQuestion = { question: string; options: QuizOption[] };
export type QuizResult = { range: string; title: string; description: string; color: string };

export type TraiHePage = {
  id: string;
  status: string;
  slug: string;
  school_level: 'tieu-hoc' | 'thcs' | 'thpt';
  location: string;
  funnel_code: string;

  // SEO
  page_title: string;
  page_description: string;

  // Hero
  hero_badge?: string;
  hero_headline: string;
  hero_subheading: string;

  // USP
  usp_title: string;
  usp_items: UspItem[];

  // Trust metrics
  metrics_title: string;
  metrics: MetricItem[];

  // Content / testimonial / info cards
  content_title?: string;
  testimonial_text: string;
  testimonial_author: string;
  info_cards: InfoCard[];
  urgency_text: string;

  // Form
  form_heading: string;
  form_description: string;
  form_submit_text: string;
  form_success_message: string;
  quiz_intro_items: string[];

  // Quiz
  quiz_title: string;
  quiz_subtitle: string;
  quiz_questions: QuizQuestion[];
  quiz_results: QuizResult[];

  // FAQ
  faq_title: string;
  faq_items: FaqItem[];

  // Thank-you page
  thank_you_title: string;
  thank_you_description: string;
  thank_you_icon: string;
  thank_you_headline: string;
  thank_you_intro: string;
  thank_you_report_title: string;
  thank_you_report_items: string[];
  thank_you_bonus_title: string;
  thank_you_bonus_items: string[];
  thank_you_show_two_choices: boolean;
  thank_you_two_choices_title?: string;
  thank_you_waiting_text?: string;
  thank_you_reserve_text?: string;
};

type SeedArray = TraiHePage[];
const seedPages: SeedArray = seedData as SeedArray;

// Build-time cache — mirrors the pattern in src/lib/directus.ts
const _cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 60_000;

function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = _cache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return Promise.resolve(hit.data as T);
  return fn().then((data) => {
    _cache.set(key, { data, ts: Date.now() });
    return data;
  });
}

function getDirectusUrl() {
  return import.meta.env.PUBLIC_DIRECTUS_URL?.trim() || null;
}

function getServerToken() {
  return import.meta.env.DIRECTUS_TOKEN?.trim() || '';
}

type Schema = { trai_he_squeeze_pages: TraiHePage[] };

function getClient() {
  const url = getDirectusUrl();
  if (!url) return null;
  const token = getServerToken();
  const base = createDirectus<Schema>(url).with(rest());
  return token ? base.with(staticToken(token)) : base;
}

/**
 * Fetch a single trai-he page by slug. Directus first; falls back to seed.
 */
export async function getTraiHePageBySlug(slug: string): Promise<TraiHePage | null> {
  return cached(`trai-he:${slug}`, async () => {
    const client = getClient();
    if (client) {
      try {
        const items = await client.request(
          readItems('trai_he_squeeze_pages', {
            filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
            limit: 1,
          }) as never,
        );
        const first = Array.isArray(items) ? (items as TraiHePage[])[0] : null;
        if (first) return first;
      } catch (e) {
        console.warn(
          `[trai-he-pages] Directus fetch failed for "${slug}", using seed fallback:`,
          e instanceof Error ? e.message : e,
        );
      }
    }
    // Fallback to seed JSON
    return seedPages.find((p) => p.slug === slug && p.status === 'published') || null;
  });
}

/**
 * Fetch all published trai-he slugs (for getStaticPaths).
 */
export async function getAllTraiHeSlugs(): Promise<string[]> {
  return cached('trai-he:all-slugs', async () => {
    const client = getClient();
    if (client) {
      try {
        const items = await client.request(
          readItems('trai_he_squeeze_pages', {
            filter: { status: { _eq: 'published' } },
            fields: ['slug'],
            limit: 100,
          }) as never,
        );
        const list = Array.isArray(items) ? (items as { slug: string }[]).map((i) => i.slug).filter(Boolean) : [];
        if (list.length > 0) return list;
      } catch (e) {
        console.warn(
          '[trai-he-pages] Directus slug fetch failed, using seed fallback:',
          e instanceof Error ? e.message : e,
        );
      }
    }
    return seedPages.filter((p) => p.status === 'published').map((p) => p.slug);
  });
}
