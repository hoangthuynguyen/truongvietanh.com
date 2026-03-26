import { createDirectus, readItems, rest, staticToken } from '@directus/sdk';
import { pages as staticPages, type CardItem, type FAQItem, type LinkItem, type PageSection, type PageSpec, type StatItem, type StepItem } from './site-content';

type Theme = 'brand' | 'pillar' | 'admissions' | 'tuition';

type BlockBase = {
  id: string;
  eyebrow?: string | null;
  title?: string | null;
};

export type HeroBlock = BlockBase & {
  type: 'hero';
  body?: string | null;
  badges: string[];
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
  asideTitle?: string | null;
  asideItems: string[];
};

export type RichTextBlock = BlockBase & {
  type: 'rich_text';
  content: string;
};

export type TextWithImageBlock = BlockBase & {
  type: 'text_with_image';
  body?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  imagePosition: 'left' | 'right';
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
};

export type CardsBlock = BlockBase & {
  type: 'cards';
  intro?: string | null;
  columns: 2 | 3 | 4;
  items: CardItem[];
};

export type FeaturesBlock = BlockBase & {
  type: 'features';
  intro?: string | null;
  items: CardItem[];
};

export type StatsBlock = BlockBase & {
  type: 'stats';
  intro?: string | null;
  items: StatItem[];
};

export type FAQBlock = BlockBase & {
  type: 'faq';
  intro?: string | null;
  items: FAQItem[];
};

export type QuoteBlock = BlockBase & {
  type: 'quote';
  quote: string;
  attribution: string;
};

export type LinksBlock = BlockBase & {
  type: 'links';
  intro?: string | null;
  items: LinkItem[];
};

export type GalleryItem = {
  image: string;
  alt?: string;
  caption?: string;
};

export type GalleryBlock = BlockBase & {
  type: 'gallery';
  intro?: string | null;
  items: GalleryItem[];
};

export type PricingPlan = {
  title: string;
  price: string;
  note?: string;
  features?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

export type PricingTableBlock = BlockBase & {
  type: 'pricing_table';
  intro?: string | null;
  plans: PricingPlan[];
};

export type FormField = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

export type FormBlock = BlockBase & {
  type: 'form';
  intro?: string | null;
  submitLabel?: string | null;
  formAction?: string | null;
  embedHtml?: string | null;
  fields: FormField[];
};

export type CtaBlock = BlockBase & {
  type: 'cta';
  body?: string | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
};

export type ContentBlock =
  | HeroBlock
  | RichTextBlock
  | TextWithImageBlock
  | CardsBlock
  | FeaturesBlock
  | StatsBlock
  | FAQBlock
  | QuoteBlock
  | LinksBlock
  | GalleryBlock
  | PricingTableBlock
  | FormBlock
  | CtaBlock;

export type ContentPage = {
  id?: string;
  source: 'static' | 'directus';
  slug: string;
  title: string;
  description: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImage?: string | null;
  status?: string | null;
  theme: Theme;
  templateClass?: string | null;
  pageType?: string | null;
  showCmsLink?: boolean;
  blocks: ContentBlock[];
};

type GenericSchema = Record<string, Record<string, unknown>[]>;

type DirectusPageRecord = {
  id: number | string;
  slug: string;
  permalink?: string | null;
  title?: string | null;
  description?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  og_image?: string | null;
  status?: string | null;
  theme?: string | null;
  template_class?: string | null;
  page_type?: string | null;
  show_cms_link?: boolean | null;
  blocks?: DirectusM2ABlockRecord[] | null;
  content_blocks?: DirectusM2ABlockRecord[] | null;
};

type DirectusPageBlockRecord = {
  id: number | string;
  sort?: number | null;
  visible?: boolean | null;
  block_key?: string | null;
  block_collection?: string | null;
  block_item_id?: number | string | null;
  pages_id?: number | string | null;
};

type DirectusM2ABlockRecord = {
  id?: number | string;
  sort?: number | null;
  collection?: string | null;
  item?: Record<string, unknown> | null;
};

const supportedBlockCollections = new Set([
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
  'blocks_hero',
  'blocks_rich_text',
  'blocks_cards',
  'blocks_stats',
  'blocks_faq',
  'blocks_quote',
  'blocks_links',
  'blocks_cta',
]);

function getDirectusUrl() {
  return import.meta.env.PUBLIC_DIRECTUS_URL?.trim() || null;
}

function getServerToken() {
  return import.meta.env.DIRECTUS_TOKEN?.trim() || '';
}

function getDirectusClient() {
  const url = getDirectusUrl();

  if (!url) {
    return null;
  }

  const token = getServerToken();
  const baseClient = createDirectus<GenericSchema>(url).with(rest());
  return token ? baseClient.with(staticToken(token)) : baseClient;
}

async function fetchDirectusJson<T>(path: string) {
  const url = getDirectusUrl();

  if (!url) {
    return null;
  }

  const token = getServerToken();
  const headers = new Headers();

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  try {
    const response = await fetch(`${url}${path}`, { headers });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function fetchCollectionItems<T>(collection: string, query: Record<string, unknown>) {
  const client = getDirectusClient();

  if (!client) {
    return [] as T[];
  }

  try {
    const result = await client.request(readItems(collection as never, query as never));
    return Array.isArray(result) ? (result as T[]) : [];
  } catch {
    return [] as T[];
  }
}

function asTheme(value: string | null | undefined): Theme {
  if (value === 'brand' || value === 'pillar' || value === 'admissions' || value === 'tuition') {
    return value;
  }

  return 'brand';
}

function toTextList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? '').trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    if (trimmed.startsWith('[')) {
      try {
        return toTextList(JSON.parse(trimmed));
      } catch {}
    }

    return trimmed
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function parseJsonList(value: unknown) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (!trimmed) {
      return [];
    }

    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function normalizeCardItem(item: unknown): CardItem | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const title = String(record.title ?? '').trim();
  const body = String(record.body ?? '').trim();

  if (!title || !body) {
    return null;
  }

  return {
    title,
    body,
    eyebrow: typeof record.eyebrow === 'string' ? record.eyebrow : undefined,
    href: typeof record.href === 'string' ? record.href : undefined,
    cta: typeof record.cta === 'string' ? record.cta : undefined,
  };
}

function normalizeStatItem(item: unknown): StatItem | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const value = String(record.value ?? '').trim();
  const label = String(record.label ?? '').trim();

  if (!value || !label) {
    return null;
  }

  return {
    value,
    label,
    note: typeof record.note === 'string' ? record.note : undefined,
  };
}

function normalizeFaqItem(item: unknown): FAQItem | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const question = String(record.question ?? '').trim();
  const answer = String(record.answer ?? '').trim();

  if (!question || !answer) {
    return null;
  }

  return { question, answer };
}

function normalizeLinkItem(item: unknown): LinkItem | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const title = String(record.title ?? '').trim();
  const href = String(record.href ?? '').trim();
  const body = String(record.body ?? '').trim();

  if (!title || !href || !body) {
    return null;
  }

  return {
    title,
    href,
    body,
    eyebrow: typeof record.eyebrow === 'string' ? record.eyebrow : undefined,
  };
}

function normalizeGalleryItem(item: unknown): GalleryItem | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const image = String(record.image ?? record.src ?? '').trim();

  if (!image) {
    return null;
  }

  return {
    image,
    alt: typeof record.alt === 'string' ? record.alt : undefined,
    caption: typeof record.caption === 'string' ? record.caption : undefined,
  };
}

function normalizePricingPlan(item: unknown): PricingPlan | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const title = String(record.title ?? '').trim();
  const price = String(record.price ?? '').trim();

  if (!title || !price) {
    return null;
  }

  return {
    title,
    price,
    note: typeof record.note === 'string' ? record.note : undefined,
    features: toTextList(record.features),
    ctaLabel: typeof record.ctaLabel === 'string' ? record.ctaLabel : typeof record.cta_label === 'string' ? record.cta_label : undefined,
    ctaHref: typeof record.ctaHref === 'string' ? record.ctaHref : typeof record.cta_href === 'string' ? record.cta_href : undefined,
  };
}

function normalizeFormField(item: unknown): FormField | null {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const record = item as Record<string, unknown>;
  const label = String(record.label ?? '').trim();
  const name = String(record.name ?? '').trim();

  if (!label || !name) {
    return null;
  }

  return {
    label,
    name,
    type: typeof record.type === 'string' ? record.type : undefined,
    placeholder: typeof record.placeholder === 'string' ? record.placeholder : undefined,
    required: Boolean(record.required),
  };
}

function normalizeColumns(value: unknown): 2 | 3 | 4 {
  return value === 2 || value === '2'
    ? 2
    : value === 4 || value === '4'
      ? 4
      : 3;
}

function normalizeImagePosition(value: unknown): 'left' | 'right' {
  return value === 'left' ? 'left' : 'right';
}

function mapSectionToBlock(page: PageSpec, section: PageSection, index: number): ContentBlock {
  const id = `${page.slug}-${section.type}-${index + 1}`;

  switch (section.type) {
    case 'cards':
      return {
        id,
        type: 'cards',
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        columns: section.columns || 3,
        items: section.items,
      };
    case 'steps':
      return {
        id,
        type: 'cards',
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        columns: 3,
        items: section.items.map((item: StepItem, stepIndex) => ({
          eyebrow: `Bước ${stepIndex + 1}`,
          title: item.title,
          body: item.body,
        })),
      };
    case 'faq':
      return {
        id,
        type: 'faq',
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items: section.items,
      };
    case 'links':
      return {
        id,
        type: 'links',
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items: section.items,
      };
    case 'quote':
      return {
        id,
        type: 'quote',
        eyebrow: section.eyebrow,
        title: section.title,
        quote: section.quote,
        attribution: section.attribution,
      };
    case 'stats':
      return {
        id,
        type: 'stats',
        eyebrow: section.eyebrow,
        title: section.title,
        intro: section.intro,
        items: section.items,
      };
    default:
      return {
        id,
        type: 'rich_text',
        title: page.title,
        content: '',
      };
  }
}

export function pageSpecToContentPage(page: PageSpec): ContentPage {
  const blocks: ContentBlock[] = [
    {
      id: `${page.slug}-hero`,
      type: 'hero',
      eyebrow: page.hero.eyebrow,
      title: page.hero.title,
      body: page.hero.body,
      badges: [page.templateClass, page.pageType, ...page.hero.badges].filter(Boolean),
      primaryCtaLabel: page.hero.primaryCta.label,
      primaryCtaHref: page.hero.primaryCta.href,
      secondaryCtaLabel: page.hero.secondaryCta.label,
      secondaryCtaHref: page.hero.secondaryCta.href,
      asideTitle: page.hero.asideTitle,
      asideItems: page.hero.asideItems,
    },
  ];

  if (page.stats.length > 0) {
    blocks.push({
      id: `${page.slug}-overview-stats`,
      type: 'stats',
      eyebrow: 'KPI hỗ trợ',
      title: 'Trang này được đồng bộ với template class đã chọn, không phải nội dung ngẫu hứng.',
      intro: 'Các chỉ số bên dưới là khung tạm thời để đội content có thể thay thế bằng dữ liệu Directus sau khi migrate.',
      items: page.stats,
    });
  }

  blocks.push(...page.sections.map((section, index) => mapSectionToBlock(page, section, index)));

  blocks.push({
    id: `${page.slug}-next-step`,
    type: 'cta',
    eyebrow: 'Bước tiếp theo',
    title: 'Trang này đã sẵn sàng để nuôi SEO và đẩy người dùng sang hành động.',
    body: 'Sau khi chuyển dữ liệu sang Directus, bạn có thể tiếp tục tách thành campus pages, fee landings và FAQ chi tiết hơn mà không cần sửa route Astro.',
    primaryCtaLabel: 'Vào hub tuyển sinh',
    primaryCtaHref: '/tuyen-sinh',
    secondaryCtaLabel: 'Mở trang học phí',
    secondaryCtaHref: '/hoc-phi',
  });

  return {
    source: 'static',
    slug: page.slug,
    title: page.title,
    description: page.description,
    theme: page.theme,
    templateClass: page.templateClass,
    pageType: page.pageType,
    blocks,
  };
}

function mapDirectusBlock(collection: string, raw: Record<string, unknown>, fallbackId: string): ContentBlock | null {
  const id = String(raw.id ?? fallbackId);

  switch (collection) {
    case 'block_hero':
    case 'blocks_hero':
      return {
        id,
        type: 'hero',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title:
          typeof raw.title === 'string'
            ? raw.title
            : typeof raw.headline === 'string'
              ? raw.headline
              : null,
        body:
          typeof raw.body === 'string'
            ? raw.body
            : typeof raw.subheadline === 'string'
              ? raw.subheadline
              : null,
        badges: toTextList(raw.badges),
        primaryCtaLabel:
          typeof raw.primary_cta_label === 'string'
            ? raw.primary_cta_label
            : typeof raw.button_text === 'string'
              ? raw.button_text
              : null,
        primaryCtaHref:
          typeof raw.primary_cta_href === 'string'
            ? raw.primary_cta_href
            : typeof raw.button_url === 'string'
              ? raw.button_url
              : null,
        secondaryCtaLabel: typeof raw.secondary_cta_label === 'string' ? raw.secondary_cta_label : null,
        secondaryCtaHref: typeof raw.secondary_cta_href === 'string' ? raw.secondary_cta_href : null,
        asideTitle: typeof raw.aside_title === 'string' ? raw.aside_title : null,
        asideItems: toTextList(raw.aside_items),
      };
    case 'block_rich_text':
    case 'blocks_rich_text':
      return {
        id,
        type: 'rich_text',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        content: typeof raw.content === 'string' ? raw.content : '',
      };
    case 'block_text_with_image':
      return {
        id,
        type: 'text_with_image',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title:
          typeof raw.title === 'string'
            ? raw.title
            : typeof raw.headline === 'string'
              ? raw.headline
              : null,
        body:
          typeof raw.body === 'string'
            ? raw.body
            : typeof raw.subheadline === 'string'
              ? raw.subheadline
              : null,
        image:
          typeof raw.image === 'string'
            ? raw.image
            : typeof raw.image_url === 'string'
              ? raw.image_url
              : null,
        imageAlt:
          typeof raw.image_alt === 'string'
            ? raw.image_alt
            : typeof raw.title === 'string'
              ? raw.title
              : null,
        imagePosition: normalizeImagePosition(raw.image_position),
        primaryCtaLabel:
          typeof raw.button_text === 'string'
            ? raw.button_text
            : typeof raw.primary_cta_label === 'string'
              ? raw.primary_cta_label
              : null,
        primaryCtaHref:
          typeof raw.button_url === 'string'
            ? raw.button_url
            : typeof raw.primary_cta_href === 'string'
              ? raw.primary_cta_href
              : null,
      };
    case 'block_cards':
    case 'blocks_cards':
      return {
        id,
        type: 'cards',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        columns: normalizeColumns(raw.columns),
        items: parseJsonList(raw.items_json).map(normalizeCardItem).filter(Boolean) as CardItem[],
      };
    case 'block_features':
      return {
        id,
        type: 'features',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        items: parseJsonList(raw.items_json).map(normalizeCardItem).filter(Boolean) as CardItem[],
      };
    case 'block_stats':
    case 'blocks_stats':
      return {
        id,
        type: 'stats',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        items: parseJsonList(raw.items_json).map(normalizeStatItem).filter(Boolean) as StatItem[],
      };
    case 'block_faq':
    case 'blocks_faq':
      return {
        id,
        type: 'faq',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        items: parseJsonList(raw.items_json).map(normalizeFaqItem).filter(Boolean) as FAQItem[],
      };
    case 'block_quote':
    case 'blocks_quote':
      return {
        id,
        type: 'quote',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        quote: typeof raw.quote === 'string' ? raw.quote : '',
        attribution: typeof raw.attribution === 'string' ? raw.attribution : '',
      };
    case 'block_links':
    case 'blocks_links':
      return {
        id,
        type: 'links',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        items: parseJsonList(raw.items_json).map(normalizeLinkItem).filter(Boolean) as LinkItem[],
      };
    case 'block_gallery':
      return {
        id,
        type: 'gallery',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        items: parseJsonList(raw.items_json).map(normalizeGalleryItem).filter(Boolean) as GalleryItem[],
      };
    case 'block_pricing_table':
      return {
        id,
        type: 'pricing_table',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        plans: parseJsonList(raw.items_json).map(normalizePricingPlan).filter(Boolean) as PricingPlan[],
      };
    case 'block_form':
      return {
        id,
        type: 'form',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        intro: typeof raw.intro === 'string' ? raw.intro : null,
        submitLabel:
          typeof raw.submit_label === 'string'
            ? raw.submit_label
            : typeof raw.button_text === 'string'
              ? raw.button_text
              : null,
        formAction:
          typeof raw.form_action === 'string'
            ? raw.form_action
            : typeof raw.button_url === 'string'
              ? raw.button_url
              : null,
        embedHtml: typeof raw.embed_html === 'string' ? raw.embed_html : null,
        fields: parseJsonList(raw.fields_json).map(normalizeFormField).filter(Boolean) as FormField[],
      };
    case 'block_cta':
    case 'blocks_cta':
      return {
        id,
        type: 'cta',
        eyebrow: typeof raw.eyebrow === 'string' ? raw.eyebrow : null,
        title: typeof raw.title === 'string' ? raw.title : null,
        body: typeof raw.body === 'string' ? raw.body : null,
        primaryCtaLabel: typeof raw.primary_cta_label === 'string' ? raw.primary_cta_label : null,
        primaryCtaHref: typeof raw.primary_cta_href === 'string' ? raw.primary_cta_href : null,
        secondaryCtaLabel: typeof raw.secondary_cta_label === 'string' ? raw.secondary_cta_label : null,
        secondaryCtaHref: typeof raw.secondary_cta_href === 'string' ? raw.secondary_cta_href : null,
      };
    default:
      return null;
  }
}

async function getDirectusPageBlocks(pageId: number | string) {
  const blocks = await fetchCollectionItems<DirectusPageBlockRecord>('page_blocks', {
    fields: ['id', 'sort', 'visible', 'block_key', 'block_collection', 'block_item_id', 'pages_id'],
    filter: {
      pages_id: { _eq: pageId },
      visible: { _neq: false },
    },
    sort: ['sort', 'id'],
    limit: -1,
  });

  return blocks
    .filter((block) => block.block_collection && block.block_item_id !== null && block.block_item_id !== undefined)
    .filter((block) => supportedBlockCollections.has(String(block.block_collection)));
}

async function getDirectusBlocksByCollection(blocks: DirectusPageBlockRecord[]) {
  const grouped = new Map<string, Array<string | number>>();

  for (const block of blocks) {
    const collection = String(block.block_collection);
    const items = grouped.get(collection) || [];
    items.push(block.block_item_id as string | number);
    grouped.set(collection, items);
  }

  const entries = await Promise.all(
    Array.from(grouped.entries()).map(async ([collection, ids]) => {
      const records = await fetchCollectionItems<Record<string, unknown>>(collection, {
        fields: ['*'],
        filter: {
          id: {
            _in: ids,
          },
        },
        limit: -1,
      });

      return [collection, new Map(records.map((record) => [String(record.id), record]))] as const;
    }),
  );

  return new Map(entries);
}

function getM2AFieldScopes(fieldName: 'blocks' | 'content_blocks') {
  const scopes = [
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
    'blocks_hero',
    'blocks_rich_text',
    'blocks_cards',
    'blocks_stats',
    'blocks_faq',
    'blocks_quote',
    'blocks_links',
    'blocks_cta',
  ];

  return [
    `${fieldName}.id`,
    `${fieldName}.collection`,
    `${fieldName}.sort`,
    ...scopes.flatMap((scope) => [`${fieldName}.item:${scope}.*`, `${fieldName}.item:${scope}.*.*`]),
  ];
}

async function getM2APageBySlug(slug: string) {
  const fields = [
    'id',
    'slug',
    'permalink',
    'title',
    'description',
    'seo_title',
    'seo_description',
    'og_image',
    'status',
    'theme',
    'template_class',
    'page_type',
    'show_cms_link',
  ];

  for (const fieldName of ['blocks', 'content_blocks'] as const) {
    const params = new URLSearchParams();
    params.set('limit', '1');
    params.set('filter[_and][0][status][_eq]', 'published');
    params.set('filter[_and][1][_or][0][slug][_eq]', slug);
    params.set('filter[_and][1][_or][1][permalink][_eq]', slug);

    [...fields, ...getM2AFieldScopes(fieldName)].forEach((field) => params.append('fields[]', field));

    const response = await fetchDirectusJson<{ data?: DirectusPageRecord[] }>(`/items/pages?${params.toString()}`);
    const page = response?.data?.[0];

    if (!page) {
      continue;
    }

    const relations = (fieldName === 'blocks' ? page.blocks : page.content_blocks) || [];
    const blocks = relations
      .filter((entry) => entry?.collection && entry?.item)
      .map((entry, index) =>
        mapDirectusBlock(String(entry.collection), entry.item || {}, `${fieldName}-${index + 1}`),
      )
      .filter(Boolean) as ContentBlock[];

    if (blocks.length > 0) {
      return {
        id: String(page.id),
        source: 'directus',
        slug: page.permalink || page.slug,
        title: page.seo_title || page.title || page.permalink || page.slug,
        description: page.seo_description || page.description || 'Trang noi dung duoc dong bo tu Directus.',
        seoTitle: page.seo_title,
        seoDescription: page.seo_description,
        ogImage: page.og_image,
        status: page.status,
        theme: asTheme(page.theme),
        templateClass: page.template_class,
        pageType: page.page_type,
        showCmsLink: Boolean(page.show_cms_link),
        blocks,
      } satisfies ContentPage;
    }
  }

  return null;
}

export async function getCmsPageSlugs() {
  const items = await fetchCollectionItems<Pick<DirectusPageRecord, 'slug' | 'permalink'>>('pages', {
    fields: ['slug', 'permalink'],
    filter: {
      status: {
        _eq: 'published',
      },
    },
    limit: -1,
  });

  return items
    .map((item) => String(item.permalink || item.slug || '').trim())
    .filter(Boolean);
}

export async function getCmsPageBySlug(slug: string) {
  const m2aPage = await getM2APageBySlug(slug);

  if (m2aPage) {
    return m2aPage;
  }

  const items = await fetchCollectionItems<DirectusPageRecord>('pages', {
    fields: [
      'id',
      'slug',
      'permalink',
      'title',
      'description',
      'seo_title',
      'seo_description',
      'og_image',
      'status',
      'theme',
      'template_class',
      'page_type',
      'show_cms_link',
    ],
    filter: {
      _and: [
        { status: { _eq: 'published' } },
        {
          _or: [
            { slug: { _eq: slug } },
            { permalink: { _eq: slug } },
          ],
        },
      ],
    },
    limit: 1,
  });

  const page = items[0];

  if (!page) {
    return null;
  }

  const pageBlocks = await getDirectusPageBlocks(page.id);
  const blockMaps = await getDirectusBlocksByCollection(pageBlocks);
  const blocks = pageBlocks
    .map((entry) => {
      const collection = String(entry.block_collection);
      const record = blockMaps.get(collection)?.get(String(entry.block_item_id));

      if (!record) {
        return null;
      }

      return mapDirectusBlock(collection, record, `${collection}-${entry.block_item_id}`);
    })
    .filter(Boolean) as ContentBlock[];

  return {
    id: String(page.id),
    source: 'directus',
    slug: page.permalink || page.slug,
    title: page.seo_title || page.title || page.permalink || page.slug,
    description: page.seo_description || page.description || 'Trang nội dung được đồng bộ từ Directus.',
    seoTitle: page.seo_title,
    seoDescription: page.seo_description,
    ogImage: page.og_image,
    status: page.status,
    theme: asTheme(page.theme),
    templateClass: page.template_class,
    pageType: page.page_type,
    showCmsLink: Boolean(page.show_cms_link),
    blocks,
  } satisfies ContentPage;
}

export function getStaticPageBySlug(slug: string) {
  const page = staticPages.find((entry) => entry.slug === slug);
  return page ? pageSpecToContentPage(page) : null;
}

export async function getContentPageBySlug(slug: string) {
  const cmsPage = await getCmsPageBySlug(slug);
  return cmsPage || getStaticPageBySlug(slug);
}

export async function getAllContentPageSlugs() {
  const cmsSlugs = await getCmsPageSlugs();
  const staticSlugs = staticPages.map((page) => page.slug);
  return Array.from(new Set([...staticSlugs, ...cmsSlugs]));
}
