import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const directusEnvPath = new URL('../directus/.env', import.meta.url);
const frontendEnvPath = new URL('../.env', import.meta.url);

async function readEnvFile(fileUrl) {
  if (!existsSync(fileUrl)) {
    return {};
  }

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
  if (!value) {
    return null;
  }

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

  if (response.status === 204) {
    return null;
  }

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

async function getCollections(baseUrl, accessToken) {
  const response = await directusFetch(baseUrl, '/collections', {}, accessToken);
  return response?.data || [];
}

async function getFields(baseUrl, collection, accessToken) {
  const response = await directusFetch(baseUrl, `/fields/${collection}`, {}, accessToken);
  return response?.data || [];
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

async function ensureCollection(baseUrl, existingCollections, definition, accessToken) {
  const exists = existingCollections.some((collection) => collection.collection === definition.collection);

  if (exists) {
    process.stdout.write(`Collection ${definition.collection} already exists\n`);
    return;
  }

  await directusFetch(
    baseUrl,
    '/collections',
    {
      method: 'POST',
      body: JSON.stringify({
        collection: definition.collection,
        meta: definition.meta,
        schema: {
          name: definition.collection,
        },
      }),
    },
    accessToken,
  );

  existingCollections.push({ collection: definition.collection });
  process.stdout.write(`Created collection ${definition.collection}\n`);
}

async function ensureField(baseUrl, collection, existingFields, field, accessToken) {
  const exists = existingFields.some((entry) => entry.field === field.field);

  if (exists) {
    return;
  }

  await directusFetch(
    baseUrl,
    `/fields/${collection}`,
    {
      method: 'POST',
      body: JSON.stringify(field),
    },
    accessToken,
  );

  existingFields.push({ field: field.field });
  process.stdout.write(`Created field ${collection}.${field.field}\n`);
}

async function ensureCollections(baseUrl, accessToken) {
  const collections = await getCollections(baseUrl, accessToken);
  const definitions = [
    {
      collection: 'pages',
      meta: {
        icon: 'article',
        note: 'Trang SEO / landing page duoc render boi Astro dynamic route.',
      },
    },
    {
      collection: 'page_blocks',
      meta: {
        icon: 'splitscreen',
        note: 'Junction table noi page voi block collection/item.',
        sort_field: 'sort',
      },
    },
    {
      collection: 'blocks_hero',
      meta: { icon: 'web', note: 'Hero block cho page.' },
    },
    {
      collection: 'blocks_rich_text',
      meta: { icon: 'notes', note: 'Khoi rich text / editorial section.' },
    },
    {
      collection: 'blocks_cards',
      meta: { icon: 'grid_view', note: 'Grid cards block.' },
    },
    {
      collection: 'blocks_stats',
      meta: { icon: 'query_stats', note: 'Stats / KPI block.' },
    },
    {
      collection: 'blocks_faq',
      meta: { icon: 'help', note: 'FAQ block.' },
    },
    {
      collection: 'blocks_quote',
      meta: { icon: 'format_quote', note: 'Quote / testimonial block.' },
    },
    {
      collection: 'blocks_links',
      meta: { icon: 'link', note: 'Link cards block.' },
    },
    {
      collection: 'blocks_cta',
      meta: { icon: 'ads_click', note: 'Closing CTA block.' },
    },
  ];

  for (const definition of definitions) {
    await ensureCollection(baseUrl, collections, definition, accessToken);
  }
}

async function ensureFields(baseUrl, accessToken) {
  const fieldsByCollection = {
    pages: [
      {
        field: 'slug',
        type: 'string',
        meta: { interface: 'input', width: 'half', required: true, note: 'URL slug khong co dau / o dau.' },
        schema: { is_nullable: false, is_unique: true },
      },
      {
        field: 'title',
        type: 'string',
        meta: { interface: 'input', width: 'half', required: true },
        schema: { is_nullable: false },
      },
      {
        field: 'description',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'full' },
        schema: { is_nullable: true },
      },
      {
        field: 'seo_title',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
        schema: { is_nullable: true },
      },
      {
        field: 'seo_description',
        type: 'text',
        meta: { interface: 'input-multiline', width: 'half' },
        schema: { is_nullable: true },
      },
      {
        field: 'og_image',
        type: 'string',
        meta: { interface: 'input', width: 'half', note: 'Tam thoi luu URL anh cover.' },
        schema: { is_nullable: true },
      },
      {
        field: 'status',
        type: 'string',
        meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'draft', value: 'draft' }, { text: 'published', value: 'published' }] } },
        schema: { is_nullable: false, default_value: 'draft' },
      },
      {
        field: 'theme',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          width: 'half',
          options: {
            choices: [
              { text: 'brand', value: 'brand' },
              { text: 'pillar', value: 'pillar' },
              { text: 'admissions', value: 'admissions' },
              { text: 'tuition', value: 'tuition' },
            ],
          },
        },
        schema: { is_nullable: false, default_value: 'brand' },
      },
      {
        field: 'template_class',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
        schema: { is_nullable: true },
      },
      {
        field: 'page_type',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
        schema: { is_nullable: true },
      },
      {
        field: 'show_cms_link',
        type: 'boolean',
        meta: { interface: 'boolean', width: 'half' },
        schema: { is_nullable: false, default_value: false },
      },
    ],
    page_blocks: [
      {
        field: 'pages_id',
        type: 'integer',
        meta: { interface: 'input', width: 'half', required: true, note: 'ID cua page trong collection pages.' },
        schema: { is_nullable: false },
      },
      {
        field: 'sort',
        type: 'integer',
        meta: { interface: 'input', width: 'half' },
        schema: { is_nullable: true },
      },
      {
        field: 'block_collection',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          width: 'half',
          required: true,
          options: {
            choices: [
              { text: 'blocks_hero', value: 'blocks_hero' },
              { text: 'blocks_rich_text', value: 'blocks_rich_text' },
              { text: 'blocks_cards', value: 'blocks_cards' },
              { text: 'blocks_stats', value: 'blocks_stats' },
              { text: 'blocks_faq', value: 'blocks_faq' },
              { text: 'blocks_quote', value: 'blocks_quote' },
              { text: 'blocks_links', value: 'blocks_links' },
              { text: 'blocks_cta', value: 'blocks_cta' },
            ],
          },
        },
        schema: { is_nullable: false },
      },
      {
        field: 'block_item_id',
        type: 'integer',
        meta: { interface: 'input', width: 'half', required: true, note: 'ID ban ghi trong block collection tuong ung.' },
        schema: { is_nullable: false },
      },
      {
        field: 'block_key',
        type: 'string',
        meta: { interface: 'input', width: 'half' },
        schema: { is_nullable: true },
      },
      {
        field: 'visible',
        type: 'boolean',
        meta: { interface: 'boolean', width: 'half' },
        schema: { is_nullable: false, default_value: true },
      },
    ],
    blocks_hero: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full', required: true }, schema: { is_nullable: false } },
      { field: 'body', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: { is_nullable: true } },
      { field: 'primary_cta_label', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'primary_cta_href', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'secondary_cta_label', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'secondary_cta_href', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'badges', type: 'json', meta: { interface: 'input-code', width: 'half', note: 'Nhap JSON array, vi du [\"IELTS 6.0+\", \"16 ky nang\"]' }, schema: { is_nullable: true } },
      { field: 'aside_title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'aside_items', type: 'json', meta: { interface: 'input-code', width: 'full', note: 'Nhap JSON array cac bullet ben phai.' }, schema: { is_nullable: true } },
    ],
    blocks_rich_text: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: { is_nullable: true } },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full', required: true }, schema: { is_nullable: false } },
    ],
    blocks_cards: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: { is_nullable: true } },
      { field: 'intro', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: { is_nullable: true } },
      { field: 'columns', type: 'integer', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: false, default_value: 3 } },
      { field: 'items_json', type: 'json', meta: { interface: 'input-code', width: 'full', note: 'Mang object {title, body, eyebrow?, href?, cta?}' }, schema: { is_nullable: false } },
    ],
    blocks_stats: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: { is_nullable: true } },
      { field: 'intro', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: { is_nullable: true } },
      { field: 'items_json', type: 'json', meta: { interface: 'input-code', width: 'full', note: 'Mang object {value, label, note?}' }, schema: { is_nullable: false } },
    ],
    blocks_faq: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: { is_nullable: true } },
      { field: 'intro', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: { is_nullable: true } },
      { field: 'items_json', type: 'json', meta: { interface: 'input-code', width: 'full', note: 'Mang object {question, answer}' }, schema: { is_nullable: false } },
    ],
    blocks_quote: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: { is_nullable: true } },
      { field: 'quote', type: 'text', meta: { interface: 'input-multiline', width: 'full', required: true }, schema: { is_nullable: false } },
      { field: 'attribution', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: false } },
    ],
    blocks_links: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: { is_nullable: true } },
      { field: 'intro', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: { is_nullable: true } },
      { field: 'items_json', type: 'json', meta: { interface: 'input-code', width: 'full', note: 'Mang object {title, href, body, eyebrow?}' }, schema: { is_nullable: false } },
    ],
    blocks_cta: [
      { field: 'internal_name', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'eyebrow', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full', required: true }, schema: { is_nullable: false } },
      { field: 'body', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: { is_nullable: true } },
      { field: 'primary_cta_label', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'primary_cta_href', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'secondary_cta_label', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
      { field: 'secondary_cta_href', type: 'string', meta: { interface: 'input', width: 'half' }, schema: { is_nullable: true } },
    ],
  };

  for (const [collection, fields] of Object.entries(fieldsByCollection)) {
    const existingFields = await getFields(baseUrl, collection, accessToken);

    for (const field of fields) {
      await ensureField(baseUrl, collection, existingFields, field, accessToken);
    }
  }
}

async function ensureSamplePage(baseUrl, accessToken) {
  const existingPage = await getItems(
    baseUrl,
    'pages',
    {
      filter: { slug: { _eq: 'mau-cms-blocks' } },
      limit: 1,
    },
    accessToken,
  );

  if (existingPage.length > 0) {
    process.stdout.write('Sample CMS page already exists\n');
    return;
  }

  const hero = await createItem(
    baseUrl,
    'blocks_hero',
    {
      internal_name: 'Hero mau blocks',
      eyebrow: 'Directus Dynamic Blocks',
      title: 'Trang nay dang duoc render tu pages + page_blocks + blocks_*',
      body: 'Day la sample page de ban kiem tra luong tao block trong Directus, build Astro, va deploy len Cloudflare ma khong can sua route moi lan them page.',
      primary_cta_label: 'Mo health endpoint',
      primary_cta_href: '/api/health.json',
      secondary_cta_label: 'Xem route dong',
      secondary_cta_href: '/mau-cms-blocks',
      badges: ['Astro', 'Directus', 'Cloudflare', 'Dynamic Blocks'],
      aside_title: 'Editor flow',
      aside_items: [
        'Tao page trong collection pages',
        'Tao cac block trong blocks_*',
        'Noi block vao page_blocks theo sort',
      ],
    },
    accessToken,
  );

  const richText = await createItem(
    baseUrl,
    'blocks_rich_text',
    {
      internal_name: 'Editorial intro',
      eyebrow: 'Workflow',
      title: 'Luot tao noi dung de doi content co the tu van hanh',
      content:
        '<p>Moi page duoc luu trong <strong>pages</strong>, phan bo cuc duoc dieu phoi boi <strong>page_blocks</strong>, va tung block that su nam trong cac collection <strong>blocks_*</strong>.</p><p>Cach nay giu duoc du lieu co cau truc ro, de import hang loat va de route Astro render hang nghin trang ma khong can branch template phuc tap.</p>',
    },
    accessToken,
  );

  const cta = await createItem(
    baseUrl,
    'blocks_cta',
    {
      internal_name: 'Closing CTA',
      eyebrow: 'Next step',
      title: 'Ban co the bat dau migrate cac trang pillar hien tai sang Directus',
      body: 'Khi page trong CMS co cung slug voi page fallback trong repo, route dong se uu tien ban Directus truoc.',
      primary_cta_label: 'Ve tuyen sinh',
      primary_cta_href: '/tuyen-sinh',
      secondary_cta_label: 'Xem hoc phi',
      secondary_cta_href: '/hoc-phi',
    },
    accessToken,
  );

  const page = await createItem(
    baseUrl,
    'pages',
    {
      slug: 'mau-cms-blocks',
      title: 'Mau CMS Blocks',
      description: 'Sample page duoc render boi Directus dynamic blocks.',
      seo_title: 'Mau CMS Blocks | Truong Viet Anh',
      seo_description: 'Trang mau de kiem tra dynamic route Astro + Directus blocks.',
      status: 'published',
      theme: 'brand',
      template_class: 'dynamic-blocks',
      page_type: 'demo',
      show_cms_link: true,
    },
    accessToken,
  );

  await createItem(
    baseUrl,
    'page_blocks',
    {
      pages_id: page.id,
      sort: 1,
      block_collection: 'blocks_hero',
      block_item_id: hero.id,
      block_key: 'hero',
      visible: true,
    },
    accessToken,
  );

  await createItem(
    baseUrl,
    'page_blocks',
    {
      pages_id: page.id,
      sort: 2,
      block_collection: 'blocks_rich_text',
      block_item_id: richText.id,
      block_key: 'intro',
      visible: true,
    },
    accessToken,
  );

  await createItem(
    baseUrl,
    'page_blocks',
    {
      pages_id: page.id,
      sort: 3,
      block_collection: 'blocks_cta',
      block_item_id: cta.id,
      block_key: 'cta',
      visible: true,
    },
    accessToken,
  );

  process.stdout.write('Created sample Directus page /mau-cms-blocks\n');
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

  if (!baseUrl) {
    throw new Error('Khong tim thay DIRECTUS_URL hoac PUBLIC_DIRECTUS_URL.');
  }

  if (!adminEmail || !adminPassword) {
    throw new Error('Can ADMIN_EMAIL va ADMIN_PASSWORD trong directus/.env hoac env shell.');
  }

  const accessToken = await login(baseUrl, adminEmail, adminPassword);
  await ensureCollections(baseUrl, accessToken);
  await ensureFields(baseUrl, accessToken);
  await ensureSamplePage(baseUrl, accessToken);

  process.stdout.write('\nDynamic blocks schema is ready.\n');
  process.stdout.write(`Directus URL: ${baseUrl}\n`);
  process.stdout.write('Sample route: /mau-cms-blocks\n');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
