import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';

export type Post = {
  id: number | string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  status?: string | null;
  published_at?: string | null;
};

type DirectusSchema = {
  posts: Post[];
};

export type HomepageState = {
  configured: boolean;
  url: string | null;
  usingToken: boolean;
  posts: Post[];
  error: string | null;
};

export function getDirectusUrl() {
  return import.meta.env.PUBLIC_DIRECTUS_URL?.trim() || null;
}

export function getDirectusToken() {
  return import.meta.env.DIRECTUS_TOKEN?.trim() || '';
}

function getServerToken() {
  return getDirectusToken();
}

/**
 * Factory client CMS dùng chung cho mọi trang. Trả về null (kèm cảnh báo
 * trong log build) khi PUBLIC_DIRECTUS_URL chưa cấu hình — caller phải xử lý.
 * Credentials chỉ đọc từ biến môi trường; không hard-code URL/token vào source.
 */
export function createCmsClient<Schema extends object = any>() {
  const url = getDirectusUrl();
  if (!url) {
    console.warn('[Directus] PUBLIC_DIRECTUS_URL chưa được cấu hình — bỏ qua fetch CMS.');
    return null;
  }
  const token = getServerToken();
  return token
    ? createDirectus<Schema>(url).with(staticToken(token)).with(rest())
    : createDirectus<Schema>(url).with(rest());
}

export async function getHomepageState(): Promise<HomepageState> {
  const url = getDirectusUrl();

  if (!url) {
    return {
      configured: false,
      url: null,
      usingToken: false,
      posts: [],
      error: 'Chua co PUBLIC_DIRECTUS_URL, frontend chua biet can goi den Directus nao.',
    };
  }

  const token = getServerToken();
  const client = token
    ? createDirectus<DirectusSchema>(url).with(staticToken(token)).with(rest())
    : createDirectus<DirectusSchema>(url).with(rest());

  try {
    const posts = await client.request(
      readItems('posts', {
        fields: ['id', 'slug', 'title', 'excerpt', 'content', 'status', 'published_at'],
        filter: {
          status: {
            _neq: 'archived',
          },
        },
        sort: ['-published_at', '-id'],
        limit: 6,
      }),
    );

    return {
      configured: true,
      url,
      usingToken: Boolean(token),
      posts,
      error: null,
    };
  } catch (error) {
    const message = (() => {
      if (error instanceof Error) {
        return error.message;
      }

      try {
        return JSON.stringify(error);
      } catch {
        return 'Khong the doc du lieu tu Directus.';
      }
    })();

    return {
      configured: true,
      url,
      usingToken: Boolean(token),
      posts: [],
      error: message,
    };
  }
}

// ===================== PILLAR PAGES (CMS) =====================

export type PillarPage = {
  id: number;
  slug: string;
  sort?: number | null;
  status: string;
  title: string;
  description: string;
  canonical_url: string;
  og_image: string;
  noindex: boolean;
  h1: string;
  subtitle: string;
  last_updated: string;
  trust_badges: Array<{ value: string; label: string }>;
  breadcrumb: Array<{ label: string; href?: string }>;
  form_heading: string;
  form_id: string;
  funnel_code: string;
  school_level: string;
  toc_items: Array<{ label: string; href: string }>;
  sections: Array<{ id: number; title: string; html?: string }>;
  faq_items: Array<{ question: string; answer: string }>;
  cta_title: string;
  cta_text: string;
  cta_image: string;
  cta_benefits: string[];
  related_topics: Array<{ title: string; desc: string; href: string }>;
  next_steps: Array<{ label: string; href: string; class?: string }>;
  structured_data: Record<string, unknown>[] | null;
};

type PillarSchema = {
  pillar_pages: PillarPage[];
};

// Build-time cache to avoid duplicate API calls
const _cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 60_000; // 60s cache during build

function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = _cache.get(key);
  if (hit && Date.now() - hit.ts < CACHE_TTL) return Promise.resolve(hit.data as T);
  return fn().then(data => { _cache.set(key, { data, ts: Date.now() }); return data; });
}

function getPillarClient() {
  const client = createCmsClient<PillarSchema>();
  if (!client) throw new Error('PUBLIC_DIRECTUS_URL chưa được cấu hình');
  return client;
}

/**
 * Fetch a single pillar page by slug
 */
export async function getPillarPage(slug: string): Promise<PillarPage | null> {
  return cached(`pillar:${slug}`, async () => {
  try {
    const client = getPillarClient();
    const items = await client.request(
      readItems('pillar_pages', {
        filter: { slug: { _eq: slug }, status: { _eq: 'published' } },
        limit: 1,
      })
    );
    return (items as PillarPage[])[0] || null;
  } catch (e) {
    console.error(`[Directus] Failed to fetch pillar page "${slug}":`, e instanceof Error ? e.message : e);
    return null;
  }
  });
}

/**
 * Fetch all published pillar page slugs (for getStaticPaths)
 */
export async function getAllPillarSlugs(): Promise<string[]> {
  try {
    const client = getPillarClient();
    const items = await client.request(
      readItems('pillar_pages', {
        filter: { status: { _eq: 'published' } },
        fields: ['slug'],
        sort: ['sort'],
        limit: 50,
      })
    );
    return (items as PillarPage[]).map(p => p.slug);
  } catch (e) {
    console.error('[Directus] Failed to fetch pillar slugs:', e instanceof Error ? e.message : e);
    return [];
  }
}

// ===================== SITE SETTINGS =====================

export type SiteSettings = {
  school_name: string;
  hotline: string;
  email: string;
  zalo_url: string;
  facebook_url: string;
  youtube_url: string;
  instagram_url: string;
  announcement_text: string;
  announcement_link: string;
  announcement_active: boolean;
};

/**
 * Generate FAQPage schema from CMS FAQ items (or fallback)
 */
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer.replace(/<[^>]*>/g, '') },
    })),
  };
}

// ===================== TESTIMONIALS =====================

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  page_slug: string;
};

export async function getTestimonials(pageSlug?: string): Promise<Testimonial[]> {
  return cached(`testimonials:${pageSlug || 'all'}`, async () => {
    try {
      const client = getPillarClient();
      const filter: any = { status: { _eq: 'published' } };
      if (pageSlug) filter.page_slug = { _eq: pageSlug };
      return await client.request(readItems('testimonials' as any, { filter, sort: ['sort'], limit: 20 })) as Testimonial[];
    } catch { return []; }
  });
}

// ===================== CAMPUSES =====================

export type Campus = {
  name: string;
  city: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  levels: string[];
  opening_hours: string;
};

export async function getCampuses(): Promise<Campus[]> {
  return cached('campuses', async () => {
    try {
      const client = getPillarClient();
      return await client.request(readItems('campuses' as any, { filter: { status: { _eq: 'published' } }, sort: ['sort'], limit: 20 })) as Campus[];
    } catch { return []; }
  });
}

// ===================== GALLERY CATEGORIES =====================

export type GalleryCategory = {
  title: string;
  heading: string;
  description: string;
  slug: string;
  image_count: number;
  image_base_url: string;
};

export async function getGalleryCategories(): Promise<GalleryCategory[]> {
  return cached('gallery', async () => {
    try {
      const client = getPillarClient();
      return await client.request(readItems('gallery_categories' as any, { filter: { status: { _eq: 'published' } }, sort: ['sort'], limit: 20 })) as GalleryCategory[];
    } catch { return []; }
  });
}

// ===================== NAV ITEMS =====================

export type NavItem = {
  label: string;
  href: string;
  position: 'left' | 'right';
  parent_label: string | null;
};

export async function getNavItems(): Promise<NavItem[]> {
  return cached('nav', async () => {
    try {
      const client = getPillarClient();
      return await client.request(readItems('nav_items' as any, { sort: ['sort'], limit: 30 })) as NavItem[];
    } catch { return []; }
  });
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return cached('settings', async () => {
    try {
      const client = getPillarClient();
      const items = await client.request(readItems('site_settings' as any, { limit: 1 }));
      return (items as any[])[0] || null;
    } catch { return null; }
  });
}
