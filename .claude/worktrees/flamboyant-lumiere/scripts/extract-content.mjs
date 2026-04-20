/**
 * Extract content from hardcoded .astro pages → JSON for Directus import
 * Giữ nguyên nội dung, chỉ chuyển sang cấu trúc CMS
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'pages');
const OUTPUT_DIR = join(import.meta.dirname, '..', 'data');

// Pages to extract
const pages = [
  'gioi-thieu', 'mam-non', 'tieu-hoc', 'trung-hoc-co-so', 'trung-hoc-pho-thong',
  'co-so', 'hoc-phi', 'tuyen-sinh', 'triet-ly-giao-duc', 'he-thong-pdr',
  'ngoai-khoa', 'thanh-tich', 'phu-huynh', 'lien-he', 'cap-hoc',
];

function extractFromAstro(slug) {
  const filePath = join(PAGES_DIR, `${slug}.astro`);
  const content = readFileSync(filePath, 'utf-8');

  // Extract frontmatter (between --- and ---)
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = fmMatch ? fmMatch[1] : '';
  const htmlPart = fmMatch ? content.slice(fmMatch[0].length) : content;

  // Extract key fields using regex
  const title = extract(htmlPart, /title="([^"]+)"/) || extract(htmlPart, /title='([^']+)'/);
  const description = extract(htmlPart, /description="([^"]+)"/) || extract(htmlPart, /description='([^']+)'/);
  const canonical = extract(htmlPart, /canonical="([^"]+)"/);
  const ogImage = extract(htmlPart, /ogImage="([^"]+)"/);
  const h1 = extract(htmlPart, /gi-h1[^>]*>([^<]+)</);
  const subtitle = extract(htmlPart, /gi-subtitle[^>]*>([^<]+)</);
  const lastUpdated = extract(htmlPart, /gi-last-updated[^>]*>([^<]+)</);
  const formHeading = extract(htmlPart, /gi-form-heading[^>]*>([^<]+)</);
  const formId = extract(htmlPart, /formId="([^"]+)"/);
  const funnelCode = extract(htmlPart, /funnelCode="([^"]+)"/);
  const schoolLevel = extract(htmlPart, /schoolLevel="([^"]+)"/);

  // Extract trust badges
  const badges = [];
  const badgeRegex = /gi-badge[^>]*><strong>([^<]+)<\/strong>\s*([^<]+)/g;
  let m;
  while ((m = badgeRegex.exec(htmlPart)) !== null) {
    badges.push({ value: m[1].trim(), label: m[2].trim() });
  }

  // Extract FAQ items
  const faqs = [];
  const faqRegex = /<summary>([^<]+)<\/summary>\s*<div class="gi-faq-answer">\s*<p>([\s\S]*?)<\/p>/g;
  while ((m = faqRegex.exec(htmlPart)) !== null) {
    faqs.push({ question: m[1].trim(), answer: m[2].trim() });
  }

  // Extract breadcrumb
  const crumbs = [];
  const crumbRegex = /gi-breadcrumb[\s\S]*?<a href="([^"]+)">([^<]+)<\/a>/g;
  while ((m = crumbRegex.exec(htmlPart)) !== null) {
    crumbs.push({ href: m[1], label: m[2].trim() });
  }
  // Add current page
  const currentCrumb = extract(htmlPart, /gi-breadcrumb[\s\S]*?<span>([^<]+)<\/span>\s*<\/nav>/);
  if (currentCrumb) crumbs.push({ label: currentCrumb.trim() });

  // Extract TOC items
  const tocItems = [];
  const tocRegex = /<li><a href="(#[^"]+)">([^<]+)<\/a><\/li>/g;
  while ((m = tocRegex.exec(htmlPart)) !== null) {
    if (htmlPart.indexOf('gi-toc') > 0 && htmlPart.indexOf(m[0]) > htmlPart.indexOf('gi-toc')) {
      tocItems.push({ href: m[1], label: m[2].trim() });
    }
  }

  // Extract bottom CTA
  const ctaTitle = extract(htmlPart, /gi-bottom-cta-text[\s\S]*?<h2>([^<]+)<\/h2>/);
  const ctaText = extract(htmlPart, /gi-bottom-cta-text[\s\S]*?<p>([\s\S]*?)<\/p>/);

  // Extract PAA items
  const paaItems = [];
  const paaRegex = /paa-card[^>]*href="([^"]+)"[^>]*><strong>([^<]+)<\/strong><span>([^<]+)<\/span>/g;
  while ((m = paaRegex.exec(htmlPart)) !== null) {
    paaItems.push({ href: m[1], title: m[2].trim(), desc: m[3].trim() });
  }

  // Extract content sections (between gi-section markers)
  const sections = [];
  const sectionRegex = /<section[^>]*class="gi-section"[^>]*>([\s\S]*?)<\/section>/g;
  let secIdx = 0;
  while ((m = sectionRegex.exec(htmlPart)) !== null) {
    const secHtml = m[1];
    const secTitle = extract(secHtml, /<h2[^>]*>[\s\S]*?<\/(?:svg|span)>\s*([^<]+)/);
    sections.push({
      id: secIdx++,
      title: secTitle || `Section ${secIdx}`,
      html: secHtml.trim(),
    });
  }

  // Build structured data from frontmatter
  let structuredData = null;
  const sdMatch = frontmatter.match(/const structuredData\s*=\s*(\[[\s\S]*?\]);/);
  if (sdMatch) {
    // Keep as raw string — will be stored as JSON in Directus
    structuredData = 'EXTRACT_MANUALLY';
  }

  return {
    slug,
    status: 'published',
    title: title || '',
    description: description || '',
    canonical_url: canonical || `https://truongvietanh.com/${slug}`,
    og_image: ogImage || '',
    noindex: false,
    h1: h1 || '',
    subtitle: subtitle || '',
    last_updated: lastUpdated || '',
    trust_badges: badges,
    breadcrumb: crumbs,
    form_heading: formHeading || '',
    form_id: formId || '',
    funnel_code: funnelCode || '',
    school_level: schoolLevel || '',
    toc_items: tocItems,
    sections: sections.map(s => ({ id: s.id, title: s.title })),
    faq_items: faqs,
    cta_title: ctaTitle || '',
    cta_text: ctaText || '',
    related_topics: paaItems,
    structured_data: structuredData,
  };
}

function extract(text, regex) {
  const m = text.match(regex);
  return m ? m[1].trim() : null;
}

// Run extraction
console.log('Extracting content from .astro pages...\n');

import { mkdirSync } from 'fs';
try { mkdirSync(join(import.meta.dirname, '..', 'data'), { recursive: true }); } catch {}

const allPages = [];
for (const slug of pages) {
  try {
    const data = extractFromAstro(slug);
    allPages.push(data);
    console.log(`✓ ${slug}: h1="${data.h1?.slice(0, 50)}..." ${data.faq_items.length} FAQs`);
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message}`);
  }
}

// Write output
const outputPath = join(import.meta.dirname, '..', 'data', 'pillar-pages.json');
writeFileSync(outputPath, JSON.stringify(allPages, null, 2), 'utf-8');
console.log(`\n✓ Exported ${allPages.length} pages to data/pillar-pages.json`);
console.log(`  Total FAQs: ${allPages.reduce((sum, p) => sum + p.faq_items.length, 0)}`);
