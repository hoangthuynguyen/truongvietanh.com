#!/usr/bin/env node
/**
 * Legacy pillar → v2 CMS converter.
 *
 * Extracts content from hand-coded pillar .astro files and generates
 * v2 Directus seed records (pages + blocks). The output can be imported
 * via scripts/seed-directus.ts OR merged into directus/seed/pages.json.
 *
 * Extracts:
 *   - Title, meta description, canonical from Astro frontmatter/props
 *   - H1 + subtitle from hero section
 *   - All `<section id="...">` blocks converted to rich_text blocks
 *   - FAQ items from <details>/<summary> patterns
 *   - Existing structured_data JSON-LD
 *
 * Usage:
 *   node scripts/convert-legacy-pillars.mjs
 *   node scripts/convert-legacy-pillars.mjs --write  # merge into pages.json
 *   node scripts/convert-legacy-pillars.mjs --page=tuyen-sinh  # single page
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagesDir = path.join(root, 'src', 'pages');
const outDir = path.join(root, 'directus', 'seed');

// --- CLI flags ---
const args = process.argv.slice(2);
const writeMode = args.includes('--write');
const pageFilter = args.find((a) => a.startsWith('--page='))?.split('=')[1];

// Pillar pages to convert (top-level .astro files that use `gi-*` pattern)
const PILLAR_PAGES = [
  { slug: '',                         file: 'index.astro',                 template: 'pillar', product: null,            funnel: 'pillar_home' },
  { slug: 'tuyen-sinh',               file: 'tuyen-sinh.astro',            template: 'pillar', product: null,            funnel: 'pillar_tuyen_sinh' },
  { slug: 'hoc-phi',                  file: 'hoc-phi.astro',               template: 'pillar', product: null,            funnel: 'pillar_hoc_phi' },
  { slug: 'co-so',                    file: 'co-so.astro',                 template: 'pillar', product: null,            funnel: 'pillar_co_so' },
  { slug: 'thanh-tich',               file: 'thanh-tich.astro',            template: 'pillar', product: null,            funnel: 'pillar_thanh_tich' },
  { slug: 'so-sanh',                  file: 'so-sanh.astro',               template: 'pillar', product: null,            funnel: 'pillar_so_sanh' },
  { slug: 'mam-non',                  file: 'mam-non.astro',               template: 'pillar', product: 'mam-non',       funnel: 'pillar_mam_non' },
  { slug: 'tieu-hoc',                 file: 'tieu-hoc.astro',              template: 'pillar', product: 'tieu-hoc',      funnel: 'pillar_tieu_hoc' },
  { slug: 'trung-hoc-co-so',          file: 'trung-hoc-co-so.astro',       template: 'pillar', product: 'thcs',          funnel: 'pillar_thcs' },
  { slug: 'trung-hoc-pho-thong',      file: 'trung-hoc-pho-thong.astro',   template: 'pillar', product: 'thpt',          funnel: 'pillar_thpt' },
  { slug: 'he-thong-pdr',             file: 'he-thong-pdr.astro',          template: 'pillar', product: 'pdr',           funnel: 'pillar_pdr' },
  { slug: 'triet-ly-giao-duc',        file: 'triet-ly-giao-duc.astro',     template: 'pillar', product: 'pdr',           funnel: 'pillar_triet_ly' },
  { slug: 'hoc-bong',                 file: 'hoc-bong.astro',              template: 'pillar', product: 'hoc-bong',      funnel: 'pillar_hoc_bong' },
  { slug: 'ngoai-khoa',               file: 'ngoai-khoa.astro',            template: 'pillar', product: 'ngoai-khoa',    funnel: 'pillar_ngoai_khoa' },
  { slug: 'phu-huynh',                file: 'phu-huynh.astro',             template: 'pillar', product: null,            funnel: 'pillar_phu_huynh' },
  { slug: 'gioi-thieu',               file: 'gioi-thieu.astro',            template: 'pillar', product: null,            funnel: 'pillar_gioi_thieu' },
  { slug: 'lien-he',                  file: 'lien-he.astro',               template: 'pillar', product: null,            funnel: 'pillar_lien_he' },
  { slug: 'cap-hoc',                  file: 'cap-hoc.astro',               template: 'pillar', product: null,            funnel: 'pillar_cap_hoc' },
  { slug: 'hinh-anh',                 file: 'hinh-anh.astro',              template: 'pillar', product: null,            funnel: 'pillar_hinh_anh' },
  { slug: 'tin-tuc',                  file: 'tin-tuc.astro',               template: 'pillar', product: null,            funnel: 'pillar_tin_tuc' },
];

// --- EXTRACTION HELPERS ---

function extractProp(source, name) {
  // Matches: title="..." OR title={"..."} OR title={cmsPage?.title || "fallback"}
  const m1 = source.match(new RegExp(`${name}\\s*=\\s*\\{?["'\`]([^"'\`]+)["'\`]`, 'i'));
  if (m1) return m1[1].trim();
  // Fallback default from `|| "..."` pattern
  const m2 = source.match(new RegExp(`${name}\\s*=\\s*\\{[^}]*\\|\\|\\s*["']([^"']+)["']`, 'i'));
  return m2?.[1]?.trim() || '';
}

function extractH1(source) {
  return source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
    ?.replace(/<[^>]+>/g, '')
    ?.replace(/\s+/g, ' ')
    ?.trim() || '';
}

function extractSubtitle(source) {
  return source.match(/class="gi-subtitle"[^>]*>([\s\S]*?)<\/p>/i)?.[1]
    ?.replace(/<[^>]+>/g, '')
    ?.trim() || '';
}

/**
 * Extract each <section id="..." class="gi-section"> as a content block.
 * Returns array of { anchor, heading, html }.
 */
function extractSections(source) {
  const sections = [];
  const re = /<section\s+id="([^"]+)"\s+class="gi-section"[^>]*>([\s\S]*?)<\/section>/g;
  let match;
  while ((match = re.exec(source)) !== null) {
    const [, anchor, inner] = match;
    const heading = inner.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]
      ?.replace(/<svg[\s\S]*?<\/svg>/g, '')
      ?.replace(/<[^>]+>/g, '')
      ?.replace(/\s+/g, ' ')
      ?.trim() || '';

    // Strip the h2 from inner content since we'll use it as block title
    const html = inner
      .replace(/<h2[\s\S]*?<\/h2>/, '')
      // Remove SVG icons (they're large inline noise)
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      // Strip form CTA from middle of content (template adds its own)
      .replace(/<div class="gi-cta-inline"[\s\S]*?<\/div>/g, '')
      .trim();

    sections.push({ anchor, heading, html });
  }
  return sections;
}

/**
 * Extract FAQ items from <details class="gi-faq-item"> pattern.
 */
function extractFaqItems(source) {
  const items = [];
  // Hand-rolled <details> with summary + div.gi-faq-answer
  const re = /<details\s+class="gi-faq-item"[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<div\s+class="gi-faq-answer"[^>]*>([\s\S]*?)<\/div>\s*<\/details>/g;
  let m;
  while ((m = re.exec(source)) !== null) {
    const question = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const answer = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (question && answer) items.push({ question, answer });
  }
  // Also pick up CMS-rendered FAQ loop (cmsFaqs.map)
  // For those we'll default to empty; CMS will provide when seeded
  return items;
}

/**
 * Extract structured_data JSON-LD array (if defined as `const structuredData = [...]`).
 */
function extractStructuredData(source) {
  // Find the block: `const structuredData = [`  ... closing `];` at column 0 or indented
  const start = source.indexOf('const structuredData =');
  if (start < 0) return null;
  // Find matching closing `];` — simple bracket counting
  let depth = 0;
  let i = source.indexOf('[', start);
  if (i < 0) return null;
  const arrStart = i;
  for (; i < source.length; i++) {
    if (source[i] === '[') depth++;
    else if (source[i] === ']') {
      depth--;
      if (depth === 0) {
        const arrEnd = i + 1;
        const jsonLike = source.slice(arrStart, arrEnd);
        // Can't eval — but we can note it's present and leave raw; seeder can parse
        try {
          // Attempt via Function constructor (only safe for trusted local files)
          // eslint-disable-next-line no-new-func
          return new Function(`return ${jsonLike}`)();
        } catch {
          return null;
        }
      }
    }
  }
  return null;
}

/**
 * Build v2 block instances from extracted pieces.
 */
function buildBlocks(meta, sections, faqItems, formRef) {
  const blocks = [];
  let sort = 0;
  const next = () => sort++;

  // 1. Hero pillar
  blocks.push({
    sort: next(),
    collection: 'block_hero_pillar',
    item: {
      id: randomUUID(),
      title: meta.h1 || meta.title,
      subtitle: meta.subtitle || meta.description,
      breadcrumbs: meta.slug
        ? [{ label: 'Trang chủ', href: '/' }, { label: meta.h1 || meta.title, href: `/${meta.slug}` }]
        : [],
      rating: { score: 4.9, count: 300 },
      badges: [
        { value: '15+', label: 'năm kinh nghiệm' },
        { value: '9', label: 'cơ sở' },
        { value: '12.000+', label: 'học sinh' },
        { value: '500+', label: 'giáo viên' },
      ],
      form_ref: formRef,
      last_updated: 'Tháng 4, 2026',
    },
  });

  // 2. Trust bar
  blocks.push({
    sort: next(),
    collection: 'block_trust_bar',
    item: {
      id: randomUUID(),
      items: [
        { icon: '👨‍👩‍👧', value: '3000+', label: 'phụ huynh tin tưởng' },
        { icon: '🏫', value: '9', label: 'cơ sở toàn quốc' },
        { icon: '📅', value: '15+', label: 'năm kinh nghiệm' },
      ],
      variant: 'gradient',
    },
  });

  // 3. Section header for content
  if (sections.length > 0) {
    blocks.push({
      sort: next(),
      collection: 'block_section_header',
      item: {
        id: randomUUID(),
        eyebrow: 'Nội dung chi tiết',
        title: `Về ${meta.h1 || meta.title}`,
        alignment: 'center',
      },
    });
  }

  // 4. Each legacy <section> → rich_text block
  for (const sec of sections) {
    blocks.push({
      sort: next(),
      collection: 'block_rich_text',
      item: {
        id: randomUUID(),
        title: sec.heading,
        content: sec.html,
      },
    });
  }

  // 5. CTA form (middle of page)
  blocks.push({
    sort: next(),
    collection: 'block_cta_form',
    item: {
      id: randomUUID(),
      form_ref: formRef,
      heading: 'Nhận tư vấn tuyển sinh miễn phí',
      subheading: 'Tư vấn viên sẽ gọi lại trong 15 phút.',
      variant: 'banner',
      bg_style: 'gradient',
    },
  });

  // 6. FAQ (if items found)
  if (faqItems.length > 0) {
    blocks.push({
      sort: next(),
      collection: 'block_faq',
      item: {
        id: randomUUID(),
        title: 'Câu hỏi thường gặp',
        items: faqItems,
        emit_schema: true,
      },
    });
  }

  // 7. CTA banner (backup)
  blocks.push({
    sort: next(),
    collection: 'block_cta_banner',
    item: {
      id: randomUUID(),
      title: 'Còn phân vân? Gọi tư vấn ngay',
      body: 'Đội ngũ tư vấn sẵn sàng trả lời mọi câu hỏi 7h-21h hàng ngày.',
      primary_cta: { label: '📞 Gọi 0916 961 409', href: 'tel:0916961409', variant: 'primary' },
      secondary_cta: { label: '💬 Chat Zalo', href: 'https://zalo.me/0916961409', variant: 'secondary' },
    },
  });

  return blocks;
}

// --- MAIN ---

const pagesToProcess = pageFilter
  ? PILLAR_PAGES.filter((p) => p.slug === pageFilter)
  : PILLAR_PAGES;

const converted = [];
const skipped = [];

for (const p of pagesToProcess) {
  const filePath = path.join(pagesDir, p.file);
  if (!fs.existsSync(filePath)) {
    skipped.push({ slug: p.slug, reason: 'file not found' });
    continue;
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const title = extractProp(source, 'title');
  const description = extractProp(source, 'description');
  const canonical = extractProp(source, 'canonical');
  const h1 = extractH1(source);
  const subtitle = extractSubtitle(source);
  const sections = extractSections(source);
  const faqItems = extractFaqItems(source);
  const structuredData = extractStructuredData(source);

  if (!title && !h1) {
    skipped.push({ slug: p.slug, reason: 'no title or h1 found' });
    continue;
  }

  const meta = { slug: p.slug, title, description, h1, subtitle };
  const formRef = 'form-lead-magnet-download'; // default pillar form
  const blocks = buildBlocks(meta, sections, faqItems, formRef);

  converted.push({
    id: randomUUID(),
    status: 'published',
    slug: p.slug,
    template: p.template,
    title: title || h1,
    meta_description: description || subtitle,
    meta_keywords: '',
    canonical_url: canonical || `https://truongvietanh.com/${p.slug}`,
    noindex: false,
    funnel_ref: p.funnel,
    product_ref: p.product,
    campus_ref: null,
    structured_data: structuredData,
    blocks,
    _legacy_source: p.file,
    _section_count: sections.length,
    _faq_count: faqItems.length,
  });
}

// --- OUTPUT ---

const outFile = path.join(outDir, 'pages-legacy.json');
fs.writeFileSync(outFile, JSON.stringify(converted, null, 2));

console.log(`\n✓ Converted ${converted.length} legacy pillar pages`);
console.log(`  Output: ${path.relative(root, outFile)}`);
if (skipped.length > 0) {
  console.log(`\n⚠  Skipped ${skipped.length}:`);
  for (const s of skipped) console.log(`   • ${s.slug || '(index)'}: ${s.reason}`);
}

console.log(`\nStats per page:`);
for (const p of converted) {
  console.log(`  /${p.slug || ''}`.padEnd(32) +
    ` sections=${p._section_count} faqs=${p._faq_count} blocks=${p.blocks.length}`);
}

// --- OPTIONAL: merge into pages.json ---
if (writeMode) {
  const mainFile = path.join(outDir, 'pages.json');
  const main = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  const existingSlugs = new Set(main.map((p) => p.slug));
  let added = 0, replaced = 0;

  for (const page of converted) {
    const idx = main.findIndex((p) => p.slug === page.slug);
    // Strip internal markers before merging
    const clean = { ...page };
    delete clean._legacy_source;
    delete clean._section_count;
    delete clean._faq_count;

    if (idx >= 0) { main[idx] = clean; replaced++; }
    else { main.push(clean); added++; }
  }

  fs.writeFileSync(mainFile, JSON.stringify(main, null, 2));
  console.log(`\n✓ Merged into pages.json: ${added} added, ${replaced} replaced`);
  console.log(`  Total pages in seed: ${main.length}`);
}
