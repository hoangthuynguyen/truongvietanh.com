import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { templateM2APresets } from './template-m2a-presets.mjs';

const directusEnvPath = new URL('../directus/.env', import.meta.url);
const frontendEnvPath = new URL('../.env', import.meta.url);

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

async function ensureCollection(baseUrl, collections, definition, accessToken) {
  const exists = collections.some((collection) => collection.collection === definition.collection);

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
        schema: { name: definition.collection },
      }),
    },
    accessToken,
  );

  collections.push({ collection: definition.collection });
  process.stdout.write(`Created collection ${definition.collection}\n`);
}

async function ensureField(baseUrl, collection, fields, field, accessToken) {
  const exists = fields.some((entry) => entry.field === field.field);

  if (exists) return;

  await directusFetch(
    baseUrl,
    `/fields/${collection}`,
    {
      method: 'POST',
      body: JSON.stringify(field),
    },
    accessToken,
  );

  fields.push({ field: field.field });
  process.stdout.write(`Created field ${collection}.${field.field}\n`);
}

async function getPolicies(baseUrl, accessToken) {
  const response = await directusFetch(baseUrl, '/policies?fields=id,name,admin_access', {}, accessToken);
  return response.data;
}

async function getPermissions(baseUrl, accessToken) {
  const response = await directusFetch(baseUrl, '/permissions?fields=id,policy,collection,action', {}, accessToken);
  return response.data;
}

async function ensurePermission(baseUrl, accessToken, permissions, payload) {
  const exists = permissions.find(
    (permission) =>
      permission.policy === payload.policy &&
      permission.collection === payload.collection &&
      permission.action === payload.action,
  );

  if (exists) return;

  await directusFetch(
    baseUrl,
    '/permissions',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    accessToken,
  );

  permissions.push({
    policy: payload.policy,
    collection: payload.collection,
    action: payload.action,
  });
  process.stdout.write(`Created permission ${payload.action} on ${payload.collection}\n`);
}

function jsonField(field, note, width = 'full') {
  return {
    field,
    type: 'json',
    meta: {
      interface: 'input-code',
      width,
      note,
    },
    schema: { is_nullable: true },
  };
}

function inputField(field, width = 'half', note = null, required = false) {
  return {
    field,
    type: 'string',
    meta: {
      interface: 'input',
      width,
      note,
      required,
    },
    schema: { is_nullable: !required },
  };
}

function textareaField(field, width = 'full', note = null, required = false) {
  return {
    field,
    type: 'text',
    meta: {
      interface: 'input-multiline',
      width,
      note,
      required,
    },
    schema: { is_nullable: !required },
  };
}

function selectField(field, choices, width = 'half', defaultValue = null, note = null) {
  return {
    field,
    type: 'string',
    meta: {
      interface: 'select-dropdown',
      width,
      note,
      options: {
        choices: choices.map((choice) => ({ text: choice, value: choice })),
      },
    },
    schema: {
      is_nullable: defaultValue === null,
      default_value: defaultValue,
    },
  };
}

function hiddenField(field, type = 'string') {
  return {
    field,
    type,
    meta: {
      hidden: true,
      interface: type === 'integer' ? 'input' : 'input',
      width: 'full',
    },
    schema: { is_nullable: true },
  };
}

function aliasM2AField(field, note) {
  return {
    field,
    type: 'alias',
    meta: {
      special: ['m2a'],
      interface: 'list-m2a',
      width: 'full',
      note,
      options: {
        enableSelect: true,
        enableCreate: true,
        limit: 15,
        allowDuplicates: false,
      },
    },
  };
}

async function getRelations(baseUrl, accessToken) {
  const response = await directusFetch(baseUrl, '/relations', {}, accessToken);
  return response?.data || [];
}

async function ensureRelation(baseUrl, accessToken, relations, payload) {
  const exists = relations.find(
    (relation) => relation.collection === payload.collection && relation.field === payload.field,
  );

  if (exists) return;

  await directusFetch(
    baseUrl,
    '/relations',
    {
      method: 'POST',
      body: JSON.stringify(payload),
    },
    accessToken,
  );

  relations.push({
    collection: payload.collection,
    field: payload.field,
    related_collection: payload.related_collection ?? null,
  });
  process.stdout.write(`Created relation ${payload.collection}.${payload.field}\n`);
}

async function ensureCollectionsAndFields(baseUrl, accessToken) {
  const collections = await getCollections(baseUrl, accessToken);
  const collectionDefinitions = [
    { collection: 'template_presets', meta: { icon: 'inventory_2', note: 'Preset block order cho 28 template cu.' } },
    {
      collection: 'pages_blocks',
      meta: {
        hidden: true,
        icon: 'import_export',
        note: 'Directus Builder M2A junction cho pages.blocks.',
      },
    },
    { collection: 'block_hero', meta: { icon: 'web', note: 'Builder M2A: hero block.' } },
    { collection: 'block_rich_text', meta: { icon: 'notes', note: 'Builder M2A: rich text block.' } },
    { collection: 'block_text_with_image', meta: { icon: 'media', note: 'Builder M2A: text + image block.' } },
    { collection: 'block_cards', meta: { icon: 'grid_view', note: 'Builder M2A: cards grid block.' } },
    { collection: 'block_features', meta: { icon: 'stars', note: 'Builder M2A: features block.' } },
    { collection: 'block_stats', meta: { icon: 'query_stats', note: 'Builder M2A: stats block.' } },
    { collection: 'block_faq', meta: { icon: 'help', note: 'Builder M2A: faq block.' } },
    { collection: 'block_quote', meta: { icon: 'format_quote', note: 'Builder M2A: quote/testimonial block.' } },
    { collection: 'block_links', meta: { icon: 'link', note: 'Builder M2A: links/navigation block.' } },
    { collection: 'block_gallery', meta: { icon: 'photo_library', note: 'Builder M2A: gallery block.' } },
    { collection: 'block_pricing_table', meta: { icon: 'table_chart', note: 'Builder M2A: pricing block.' } },
    { collection: 'block_form', meta: { icon: 'list_alt', note: 'Builder M2A: form block.' } },
    { collection: 'block_cta', meta: { icon: 'ads_click', note: 'Builder M2A: cta block.' } },
  ];

  for (const definition of collectionDefinitions) {
    await ensureCollection(baseUrl, collections, definition, accessToken);
  }

  const fieldsByCollection = {
    pages: [
      inputField('permalink', 'half', 'Slug/permalink uu tien cho route M2A.', false),
      inputField('template_preset', 'half', 'Slug cua template preset ap dung cho page nay.', false),
      aliasM2AField('blocks', 'Builder / Many-to-Any field cho page blocks.'),
    ],
    pages_blocks: [
      hiddenField('pages_id', 'integer'),
      hiddenField('item', 'string'),
      hiddenField('collection', 'string'),
      hiddenField('sort', 'integer'),
    ],
    template_presets: [
      { ...inputField('slug', 'half', 'Key cua preset.', true), schema: { is_nullable: false, is_unique: true } },
      inputField('class_code', 'half', 'Ma class cu, vi du A1, S1.', true),
      inputField('title', 'full', 'Ten template.', true),
      inputField('group_name', 'half', 'Nhom funnel.', true),
      selectField('theme', ['brand', 'pillar', 'admissions', 'tuition', 'performance', 'nurture', 'system'], 'half', 'brand'),
      inputField('page_type', 'half', 'Loai page.', true),
      inputField('primary_cta', 'half', 'CTA chinh.', false),
      inputField('secondary_cta', 'half', 'CTA phu.', false),
      inputField('sample_route', 'half', 'Route mau hien co.', false),
      inputField('production_route', 'half', 'Route production gan nhat.', false),
      jsonField('block_collections', 'Mang block M2A de team content lap page.'),
      jsonField('editor_notes', 'Checklist ngan cho editor/content.'),
    ],
    block_hero: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('headline', 'full', null, true),
      textareaField('subheadline', 'full'),
      inputField('image_url', 'half'),
      inputField('image_alt', 'half'),
      inputField('button_text', 'half'),
      inputField('button_url', 'half'),
      inputField('secondary_button_text', 'half'),
      inputField('secondary_button_url', 'half'),
      jsonField('badges', 'Vi du [\"IELTS 6.0+\", \"16 ky nang\"]', 'half'),
      inputField('aside_title', 'half'),
      jsonField('aside_items', 'Mang bullet ben phai.'),
    ],
    block_rich_text: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('content', 'full', 'HTML hoac rich text serialised.', true),
    ],
    block_text_with_image: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('headline', 'full', null, true),
      textareaField('body', 'full'),
      inputField('image_url', 'half'),
      inputField('image_alt', 'half'),
      selectField('image_position', ['left', 'right'], 'half', 'right'),
      inputField('button_text', 'half'),
      inputField('button_url', 'half'),
    ],
    block_cards: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {title, body, eyebrow?, href?, cta?}.'),
    ],
    block_features: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {title, body, eyebrow?}.'),
    ],
    block_stats: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {value, label, note?}.'),
    ],
    block_faq: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {question, answer}.'),
    ],
    block_quote: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('quote', 'full', null, true),
      inputField('attribution', 'half', null, true),
    ],
    block_links: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {title, href, body, eyebrow?}.'),
    ],
    block_gallery: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {image, alt?, caption?}.'),
    ],
    block_pricing_table: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      jsonField('items_json', 'Mang object {title, price, note?, features?, ctaLabel?, ctaHref?}.'),
    ],
    block_form: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full'),
      textareaField('intro', 'full'),
      inputField('submit_label', 'half'),
      inputField('form_action', 'half'),
      textareaField('embed_html', 'full', 'Neu co embed tu form ngoai, dat o day.'),
      jsonField('fields_json', 'Mang object {label, name, type?, placeholder?, required?}.'),
    ],
    block_cta: [
      inputField('internal_name', 'half'),
      inputField('eyebrow', 'half'),
      inputField('title', 'full', null, true),
      textareaField('body', 'full'),
      inputField('button_text', 'half'),
      inputField('button_url', 'half'),
      inputField('secondary_button_text', 'half'),
      inputField('secondary_button_url', 'half'),
    ],
  };

  for (const [collection, fieldDefs] of Object.entries(fieldsByCollection)) {
    const fields = await getFields(baseUrl, collection, accessToken);

    for (const field of fieldDefs) {
      await ensureField(baseUrl, collection, fields, field, accessToken);
    }
  }
}

const m2aCollections = [
  'block_hero',
  'block_rich_text',
  'block_text_with_image',
  'block_cards',
  'block_features',
  'block_stats',
  'block_faq',
  'block_quote',
  'block_links',
  'block_gallery',
  'block_pricing_table',
  'block_form',
  'block_cta',
];

async function ensureM2ABuilderRelations(baseUrl, accessToken) {
  const relations = await getRelations(baseUrl, accessToken);

  await ensureRelation(baseUrl, accessToken, relations, {
    collection: 'pages_blocks',
    field: 'pages_id',
    related_collection: 'pages',
    meta: {
      one_field: 'blocks',
      sort_field: 'sort',
      one_deselect_action: 'nullify',
      junction_field: 'item',
    },
    schema: {
      on_delete: 'SET NULL',
    },
  });

  await ensureRelation(baseUrl, accessToken, relations, {
    collection: 'pages_blocks',
    field: 'item',
    related_collection: null,
    meta: {
      one_field: null,
      sort_field: null,
      one_deselect_action: 'nullify',
      one_allowed_collections: m2aCollections,
      one_collection_field: 'collection',
      junction_field: 'pages_id',
    },
    schema: null,
  });
}

async function ensurePermissions(baseUrl, accessToken) {
  const policies = await getPolicies(baseUrl, accessToken);
  const adminPolicy = policies.find((policy) => policy.admin_access === true);
  const publicPolicy = policies.find((policy) => policy.name === '$t:public_label');

  if (!adminPolicy || !publicPolicy) {
    throw new Error('Khong tim thay admin/public policy trong Directus.');
  }

  const permissions = await getPermissions(baseUrl, accessToken);
  const collections = [
    'pages',
    'pages_blocks',
    'template_presets',
    ...m2aCollections,
  ];

  for (const collection of collections) {
    await ensurePermission(baseUrl, accessToken, permissions, {
      policy: publicPolicy.id,
      collection,
      action: 'read',
      permissions: {},
      validation: {},
      presets: {},
      fields: ['*'],
    });
  }

  for (const collection of collections) {
    for (const action of ['read', 'create', 'update', 'delete']) {
      await ensurePermission(baseUrl, accessToken, permissions, {
        policy: adminPolicy.id,
        collection,
        action,
        permissions: {},
        validation: {},
        presets: {},
        fields: ['*'],
      });
    }
  }
}

async function ensureTemplatePresets(baseUrl, accessToken) {
  for (const preset of templateM2APresets) {
    const existing = await getItems(
      baseUrl,
      'template_presets',
      {
        filter: { slug: { _eq: preset.slug } },
        limit: 1,
      },
      accessToken,
    );

    if (existing.length > 0) {
      continue;
    }

    await createItem(
      baseUrl,
      'template_presets',
      {
        slug: preset.slug,
        class_code: preset.class_code,
        title: preset.title,
        group_name: preset.group_name,
        theme: preset.theme,
        page_type: preset.page_type,
        primary_cta: preset.primary_cta,
        secondary_cta: preset.secondary_cta,
        sample_route: preset.sample_route,
        production_route: preset.production_route,
        block_collections: preset.block_collections,
        editor_notes: preset.editor_notes,
      },
      accessToken,
    );

    process.stdout.write(`Seeded template preset ${preset.slug}\n`);
  }
}

async function ensureSampleBuilderPage(baseUrl, accessToken) {
  const sampleSlug = 'mau-cms-m2a';
  const existingPages = await getItems(
    baseUrl,
    'pages',
    {
      filter: { slug: { _eq: sampleSlug } },
      limit: 1,
    },
    accessToken,
  );

  let page = existingPages[0];

  if (!page) {
    page = await createItem(
      baseUrl,
      'pages',
      {
        slug: sampleSlug,
        permalink: '/mau-cms-m2a',
        title: 'Mau CMS M2A Blocks',
        description: 'Page mau dung Directus Builder / Many-to-Any cho Astro route dong.',
        seo_title: 'Mau CMS M2A Blocks',
        seo_description: 'Demo Directus M2A Builder tren repo Astro hien tai.',
        status: 'published',
        theme: 'brand',
        template_preset: 'class-homepage',
        template_class: 'class-homepage',
        page_type: 'builder-demo',
        show_cms_link: true,
      },
      accessToken,
    );

    process.stdout.write(`Seeded page ${sampleSlug}\n`);
  }

  const blockSeeds = [
    {
      collection: 'block_hero',
      sort: 1,
      filter: { internal_name: { _eq: 'seed-m2a-hero' } },
      payload: {
        internal_name: 'seed-m2a-hero',
        eyebrow: 'Builder M2A',
        headline: 'Directus Builder da san sang cho team content',
        subheadline:
          'Page nay duoc lap tu block_* bang field pages.blocks, Astro se doc truc tiep tu Directus khi build.',
        button_text: 'Xem preset',
        button_url: '/mau-template',
        secondary_button_text: 'Lien he tu van',
        secondary_button_url: '/lien-he',
        badges: ['M2A Builder', 'Astro Route Dong', 'Cloudflare Ready'],
        aside_title: 'Checklist nhanh',
        aside_items: ['Tao page', 'Them block', 'Publish', 'Build frontend'],
      },
    },
    {
      collection: 'block_features',
      sort: 2,
      filter: { internal_name: { _eq: 'seed-m2a-features' } },
      payload: {
        internal_name: 'seed-m2a-features',
        eyebrow: 'Quy trinh',
        title: 'Team content chi can nhap CMS',
        intro: 'Preset cu da duoc map lai thanh block M2A de team thao tac trong Directus Studio.',
        items_json: [
          {
            title: 'Chon template preset',
            body: 'Mo template_presets va chon dung class cu phu hop trang moi.',
          },
          {
            title: 'Lap page bang builder',
            body: 'Them Hero, Features, FAQ, Pricing, CTA theo thu tu block co san.',
          },
          {
            title: 'Publish va build',
            body: 'Khi page da published, frontend Astro se doc va render route dong.',
          },
        ],
      },
    },
    {
      collection: 'block_cta',
      sort: 3,
      filter: { internal_name: { _eq: 'seed-m2a-cta' } },
      payload: {
        internal_name: 'seed-m2a-cta',
        eyebrow: 'San sang',
        title: 'Mau Builder nay dung de train team content',
        body: 'Ban co the clone page nay, doi slug, thay noi dung block, va publish them cac route moi.',
        button_text: 'Mo Directus',
        button_url: '/admin',
        secondary_button_text: 'Xem route mau',
        secondary_button_url: '/mau-cms-m2a',
      },
    },
  ];

  const linkedBlocks = [];

  for (const blockSeed of blockSeeds) {
    const existingBlocks = await getItems(
      baseUrl,
      blockSeed.collection,
      {
        filter: blockSeed.filter,
        limit: 1,
      },
      accessToken,
    );

    const block =
      existingBlocks[0] ||
      (await createItem(baseUrl, blockSeed.collection, blockSeed.payload, accessToken));

    if (!existingBlocks[0]) {
      process.stdout.write(`Seeded ${blockSeed.collection} sample block\n`);
    }

    linkedBlocks.push({
      sort: blockSeed.sort,
      collection: blockSeed.collection,
      item: String(block.id),
    });
  }

  for (const linkedBlock of linkedBlocks) {
    const existingLinks = await getItems(
      baseUrl,
      'pages_blocks',
      {
        filter: {
          _and: [
            { pages_id: { _eq: page.id } },
            { collection: { _eq: linkedBlock.collection } },
            { item: { _eq: linkedBlock.item } },
          ],
        },
        limit: 1,
      },
      accessToken,
    );

    if (existingLinks.length > 0) continue;

    await createItem(
      baseUrl,
      'pages_blocks',
      {
        pages_id: page.id,
        collection: linkedBlock.collection,
        item: linkedBlock.item,
        sort: linkedBlock.sort,
      },
      accessToken,
    );
  }

  process.stdout.write(`Builder sample page ready at /${sampleSlug}\n`);
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
  await ensureCollectionsAndFields(baseUrl, accessToken);
  await ensureM2ABuilderRelations(baseUrl, accessToken);
  await ensurePermissions(baseUrl, accessToken);
  await ensureTemplatePresets(baseUrl, accessToken);
  await ensureSampleBuilderPage(baseUrl, accessToken);

  process.stdout.write('\nM2A foundation is ready.\n');
  process.stdout.write(`Directus URL: ${baseUrl}\n`);
  process.stdout.write('Collections block_*, template_presets, pages.blocks, va pages_blocks da san sang.\n');
  process.stdout.write('Sample M2A page: /mau-cms-m2a\n');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
