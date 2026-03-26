import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pages as staticPages } from '../src/lib/site-content.ts';

const directusEnvPath = new URL('../directus/.env', import.meta.url);
const frontendEnvPath = new URL('../.env', import.meta.url);

const presetBySlug = {
  'gioi-thieu': 'class-corporate-brand-leadership',
  'triet-ly-giao-duc': 'class-corporate-brand-leadership',
  'he-thong-pdr': 'class-curriculum-program-overview',
  'mam-non': 'class-level-pillar',
  'tieu-hoc': 'class-level-pillar',
  'trung-hoc-co-so': 'class-level-pillar',
  'trung-hoc-pho-thong': 'class-level-pillar',
  'tuyen-sinh': 'class-enrollment-registration-form',
  'hoc-phi': 'class-tuition-fee-structure',
};

async function readEnvFile(fileUrl) {
  if (!existsSync(fileUrl)) return {};

  const text = await readFile(fileUrl, 'utf8');
  const entries = {};

  for (const line of text.split('\n')) {
    if (!line || line.trim().startsWith('#') || !line.includes('=')) continue;
    const [key, ...rest] = line.split('=');
    entries[key.trim()] = rest.join('=').trim();
  }

  return entries;
}

function normalizeDirectusUrl(value) {
  if (!value) return null;
  return value.replace(/\/admin\/?$/, '').replace(/\/$/, '');
}

async function directusFetch(baseUrl, path, init = {}, accessToken) {
  const headers = new Headers(init.headers || {});

  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${init.method || 'GET'} ${path} failed: ${response.status} ${text}`);
  }

  if (response.status === 204) return null;

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function login(baseUrl, email, password) {
  const response = await directusFetch(baseUrl, '/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return response.data.access_token;
}

async function getItems(baseUrl, collection, query, accessToken) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    params.set(key, typeof value === 'string' ? value : JSON.stringify(value));
  });

  const response = await directusFetch(baseUrl, `/items/${collection}?${params.toString()}`, {}, accessToken);
  return response?.data || [];
}

async function createItem(baseUrl, collection, payload, accessToken) {
  const response = await directusFetch(
    baseUrl,
    `/items/${collection}`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    accessToken,
  );

  return response?.data;
}

function buildHeroBlock(page) {
  return {
    collection: 'block_hero',
    internal_name: `migration:${page.slug}:hero`,
    payload: {
      internal_name: `migration:${page.slug}:hero`,
      eyebrow: page.hero.eyebrow,
      headline: page.hero.title,
      subheadline: page.hero.body,
      button_text: page.hero.primaryCta.label,
      button_url: page.hero.primaryCta.href,
      secondary_button_text: page.hero.secondaryCta.label,
      secondary_button_url: page.hero.secondaryCta.href,
      badges: page.hero.badges,
      aside_title: page.hero.asideTitle,
      aside_items: page.hero.asideItems,
    },
  };
}

function buildStatsBlock(page) {
  return {
    collection: 'block_stats',
    internal_name: `migration:${page.slug}:stats`,
    payload: {
      internal_name: `migration:${page.slug}:stats`,
      eyebrow: 'Tong quan',
      title: `Nhung diem neo chinh cua ${page.title}`,
      intro: page.description,
      items_json: page.stats,
    },
  };
}

function buildSectionBlock(page, section, index) {
  const internalName = `migration:${page.slug}:section:${index + 1}`;

  if (section.type === 'cards') {
    return {
      collection: 'block_cards',
      internal_name: internalName,
      payload: {
        internal_name: internalName,
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items_json: section.items,
      },
    };
  }

  if (section.type === 'steps') {
    return {
      collection: 'block_features',
      internal_name: internalName,
      payload: {
        internal_name: internalName,
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items_json: section.items,
      },
    };
  }

  if (section.type === 'faq') {
    return {
      collection: 'block_faq',
      internal_name: internalName,
      payload: {
        internal_name: internalName,
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items_json: section.items,
      },
    };
  }

  if (section.type === 'links') {
    return {
      collection: 'block_links',
      internal_name: internalName,
      payload: {
        internal_name: internalName,
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items_json: section.items,
      },
    };
  }

  if (section.type === 'quote') {
    return {
      collection: 'block_quote',
      internal_name: internalName,
      payload: {
        internal_name: internalName,
        eyebrow: section.eyebrow,
        title: section.title,
        quote: section.quote,
        attribution: section.attribution,
      },
    };
  }

  if (section.type === 'stats') {
    return {
      collection: 'block_stats',
      internal_name: internalName,
      payload: {
        internal_name: internalName,
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items_json: section.items,
      },
    };
  }

  return null;
}

function buildClosingCta(page) {
  return {
    collection: 'block_cta',
    internal_name: `migration:${page.slug}:cta`,
    payload: {
      internal_name: `migration:${page.slug}:cta`,
      eyebrow: 'Buoc tiep theo',
      title: `San sang tim hieu sau hon ve ${page.title}?`,
      body: page.description,
      button_text: page.hero.primaryCta.label,
      button_url: page.hero.primaryCta.href,
      secondary_button_text: page.hero.secondaryCta.label,
      secondary_button_url: page.hero.secondaryCta.href,
    },
  };
}

function getPageBlocks(page) {
  return [
    buildHeroBlock(page),
    buildStatsBlock(page),
    ...page.sections.map((section, index) => buildSectionBlock(page, section, index)).filter(Boolean),
    buildClosingCta(page),
  ];
}

async function ensurePage(baseUrl, accessToken, page) {
  const existing = await getItems(
    baseUrl,
    'pages',
    {
      filter: { slug: { _eq: page.slug } },
      limit: 1,
    },
    accessToken,
  );

  if (existing[0]) return existing[0];

  const created = await createItem(
    baseUrl,
    'pages',
    {
      slug: page.slug,
      title: page.title,
      description: page.description,
      seo_title: page.title,
      seo_description: page.description,
      status: 'published',
      theme: page.theme,
      template_class: page.templateClass,
      page_type: page.pageType,
      template_preset: presetBySlug[page.slug] || 'class-other',
      show_cms_link: true,
    },
    accessToken,
  );

  process.stdout.write(`Seeded page ${page.slug}\n`);
  return created;
}

async function ensureBlock(baseUrl, accessToken, block) {
  const existing = await getItems(
    baseUrl,
    block.collection,
    {
      filter: { internal_name: { _eq: block.internal_name } },
      limit: 1,
    },
    accessToken,
  );

  if (existing[0]) return existing[0];

  const created = await createItem(baseUrl, block.collection, block.payload, accessToken);
  process.stdout.write(`Seeded ${block.collection} ${block.internal_name}\n`);
  return created;
}

async function ensureBlockLink(baseUrl, accessToken, pageId, sort, collection, itemId) {
  const existing = await getItems(
    baseUrl,
    'pages_blocks',
    {
      filter: {
        _and: [
          { pages_id: { _eq: pageId } },
          { collection: { _eq: collection } },
          { item: { _eq: String(itemId) } },
        ],
      },
      limit: 1,
    },
    accessToken,
  );

  if (existing[0]) return;

  await createItem(
    baseUrl,
    'pages_blocks',
    {
      pages_id: pageId,
      collection,
      item: String(itemId),
      sort,
    },
    accessToken,
  );
}

async function main() {
  const directusEnv = await readEnvFile(directusEnvPath);
  const frontendEnv = await readEnvFile(frontendEnvPath);
  const baseUrl = normalizeDirectusUrl(
    process.env.DIRECTUS_URL ||
      frontendEnv.PUBLIC_DIRECTUS_URL ||
      directusEnv.PUBLIC_URL ||
      'http://127.0.0.1:8055',
  );
  const adminEmail = process.env.ADMIN_EMAIL || directusEnv.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD || directusEnv.ADMIN_PASSWORD;

  if (!baseUrl || !adminEmail || !adminPassword) {
    throw new Error('Can DIRECTUS_URL, ADMIN_EMAIL, ADMIN_PASSWORD.');
  }

  const accessToken = await login(baseUrl, adminEmail, adminPassword);

  for (const page of staticPages) {
    const directusPage = await ensurePage(baseUrl, accessToken, page);
    const pageBlocks = getPageBlocks(page);

    for (const [index, blockSeed] of pageBlocks.entries()) {
      const blockItem = await ensureBlock(baseUrl, accessToken, blockSeed);
      await ensureBlockLink(baseUrl, accessToken, directusPage.id, index + 1, blockSeed.collection, blockItem.id);
    }
  }

  process.stdout.write(`\nMigrated ${staticPages.length} static pages into Directus M2A.\n`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
