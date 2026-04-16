import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';
import seedPages from '../../directus/seed/summer-camp-pages.json';

export type Offering = { icon?: string; title: string; description?: string };
export type Testimonial = { quote: string; author: string };
export type Objection = { q: string; a: string };
export type FAQItem = { question: string; answer: string };
export type TimelineItem = { phase: string; body: string };

export type SummerCampPage = {
  id: string;
  status: 'published' | 'draft' | 'archived';
  slug: string;
  level: 'tieu-hoc' | 'thcs' | 'thpt';
  location_slug: string;
  location_name: string;
  campus_name: string;
  class_label: string;

  seo_title: string;
  seo_description: string;
  og_image?: string | null;

  pre_headline?: string;
  hero_badge?: string;
  headline: string;
  subheadline?: string;
  hero_bullets?: string[];
  primary_cta_text: string;
  secondary_cta_text?: string;

  problems_title?: string;
  problems_intro?: string;
  problems_list?: string[];
  problems_conclusion?: string;

  transformation_title?: string;
  timeline_mode?: boolean;
  before_title?: string;
  before_items?: string[];
  after_title?: string;
  after_items?: string[];
  timeline_items?: TimelineItem[];
  results_title?: string;
  results_items?: string[];

  offerings_title?: string;
  offerings?: Offering[];

  pricing_title?: string;
  price_original?: number;
  price_discounted?: number;
  price_note?: string;
  pricing_breakdown?: string[];
  price_compare_title?: string;
  price_compare_items?: string[];
  price_compare_conclusion?: string;
  early_bird_title?: string;
  early_bird_items?: string[];

  guarantee_title?: string;
  guarantee_body?: string;
  guarantee_tagline?: string;

  testimonials_title?: string;
  testimonials?: Testimonial[];

  objections_title?: string;
  objections?: Objection[];

  final_cta_title?: string;
  final_cta_body?: string;
  seats_remaining?: number;
  hotline?: string;

  faq_title?: string;
  faq_items?: FAQItem[];
};

type Schema = { summer_camp_pages: SummerCampPage[] };

function getDirectusUrl() {
  return import.meta.env.PUBLIC_DIRECTUS_URL?.trim() || null;
}

function getServerToken() {
  return import.meta.env.DIRECTUS_TOKEN?.trim() || '';
}

let cache: SummerCampPage[] | null = null;

async function fetchFromDirectus(): Promise<SummerCampPage[] | null> {
  const url = getDirectusUrl();
  if (!url) return null;
  const token = getServerToken();
  const client = token
    ? createDirectus<Schema>(url).with(staticToken(token)).with(rest())
    : createDirectus<Schema>(url).with(rest());
  try {
    const items = await client.request(
      readItems('summer_camp_pages', {
        fields: ['*'],
        filter: { status: { _eq: 'published' } },
        limit: -1,
      }),
    );
    return items as SummerCampPage[];
  } catch (err) {
    console.warn('[summer-camps] Directus fetch failed, falling back to seed:', (err as Error).message);
    return null;
  }
}

export async function getAllSummerCamps(): Promise<SummerCampPage[]> {
  if (cache) return cache;
  const fromCms = await fetchFromDirectus();
  cache = (fromCms && fromCms.length ? fromCms : (seedPages as SummerCampPage[])).filter(
    (p) => p.status === 'published',
  );
  return cache;
}

export async function getSummerCampBySlug(slug: string): Promise<SummerCampPage | null> {
  const all = await getAllSummerCamps();
  return all.find((p) => p.slug === slug) || null;
}

export async function getAllSummerCampSlugs(): Promise<string[]> {
  const all = await getAllSummerCamps();
  return all.map((p) => p.slug);
}

export function formatVnd(n?: number): string {
  if (!n && n !== 0) return '';
  return new Intl.NumberFormat('vi-VN').format(n) + ' VNĐ';
}
