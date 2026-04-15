/**
 * CMS query layer — Directus SDK wrapper with normalized Page + Block shape.
 * Used by v2 dispatcher and all templates.
 *
 * All reads are cached at build time (SSG); for preview mode, pass ?preview_token=...
 */
import { createDirectus, rest, readItems, readItem, staticToken } from '@directus/sdk';
import type { Page, Form, Funnel, Campus, Testimonial, Author, SiteSettings, Announcement } from '../types/cms';

// Loose schema — satisfies SDK generic constraints while keeping runtime flexible
type Schema = {
  pages: Page[];
  forms: Form[];
  funnels: Funnel[];
  campuses: Campus[];
  testimonials: Testimonial[];
  authors: Author[];
  site_settings: SiteSettings;
  announcements: Announcement[];
  [key: string]: any;
};

const DIRECTUS_URL = import.meta.env.DIRECTUS_URL || 'https://cms.truongvietanh.com';
const DIRECTUS_TOKEN = import.meta.env.DIRECTUS_READ_TOKEN || '';

const client = createDirectus<Schema>(DIRECTUS_URL).with(rest()).with(staticToken(DIRECTUS_TOKEN));

const cache = new Map<string, unknown>();
async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  if (cache.has(key)) return cache.get(key) as T;
  const v = await fn();
  cache.set(key, v);
  return v;
}

// ============================================================
// PAGES
// ============================================================

export async function getAllPageSlugs(opts: { status?: 'published' | 'draft' | 'all' } = {}): Promise<string[]> {
  const filter = opts.status && opts.status !== 'all' ? { status: { _eq: opts.status } } : {};
  const items = await client.request(
    readItems('pages' as never, { fields: ['slug'], filter, limit: -1 }) as any,
  ) as Array<{ slug: string }>;
  return items.map((p) => p.slug);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return cached(`page:${slug}`, async () => {
    const items = await client.request(
      readItems('pages' as never, {
        filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
        fields: [
          '*',
          'blocks.id', 'blocks.collection', 'blocks.sort', 'blocks.item.*',
        ],
        limit: 1,
      }) as any,
    ) as Page[];
    return items[0] || null;
  });
}

// ============================================================
// FORMS / FUNNELS
// ============================================================

export async function getFormById(id: string): Promise<Form | null> {
  return cached(`form:${id}`, async () => {
    try {
      return await client.request(readItem('forms' as never, id) as any) as Form;
    } catch { return null; }
  });
}

export async function getFunnelByCode(code: string): Promise<Funnel | null> {
  return cached(`funnel:${code}`, async () => {
    const items = await client.request(
      readItems('funnels' as never, { filter: { code: { _eq: code } }, limit: 1 }) as any,
    ) as Funnel[];
    return items[0] || null;
  });
}

// ============================================================
// SUPPORTING COLLECTIONS
// ============================================================

export async function getTestimonials(opts: { schoolLevel?: string; campus?: string; limit?: number } = {}): Promise<Testimonial[]> {
  const filter: any = {};
  if (opts.schoolLevel) filter.school_level = { _eq: opts.schoolLevel };
  if (opts.campus) filter.campus_ref = { _eq: opts.campus };
  return await client.request(
    readItems('testimonials' as never, { filter, limit: opts.limit || 6, sort: ['-featured', '-id'] as any } as any) as any,
  ) as Testimonial[];
}

export async function getCampusBySlug(slug: string): Promise<Campus | null> {
  return cached(`campus:${slug}`, async () => {
    const items = await client.request(
      readItems('campuses' as never, { filter: { slug: { _eq: slug } }, limit: 1 }) as any,
    ) as Campus[];
    return items[0] || null;
  });
}

export async function getAuthorById(id: string): Promise<Author | null> {
  return cached(`author:${id}`, async () => {
    try {
      return await client.request(readItem('authors' as never, id) as any) as Author;
    } catch { return null; }
  });
}

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hotline: '0916961409',
  zalo_url: 'https://zalo.me/0916961409',
  zalo_oa_id: '',
  popup_seconds: 15,
  dark_mode_default: false,
  announcement_active: false,
  gtm_id: 'GTM-KPL2NSR9',
};

export async function getSiteSettings(): Promise<SiteSettings> {
  return cached('site_settings', async () => {
    try {
      const s = await client.request(readItem('site_settings' as never, 1) as any) as SiteSettings;
      return { ...DEFAULT_SITE_SETTINGS, ...s };
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });
}

export async function getActiveAnnouncement(): Promise<Announcement | null> {
  const now = new Date().toISOString();
  const items = await client.request(
    readItems('announcements' as never, {
      filter: {
        _and: [
          { active: { _eq: true } },
          { _or: [{ start_date: { _null: true } }, { start_date: { _lte: now } }] },
          { _or: [{ end_date: { _null: true } }, { end_date: { _gte: now } }] },
        ],
      },
      sort: ['-priority'] as any,
      limit: 1,
    } as any) as any,
  ) as Announcement[];
  return items[0] || null;
}
