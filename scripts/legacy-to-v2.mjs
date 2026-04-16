#!/usr/bin/env node
/**
 * Legacy → v2 migration helper.
 *
 * Scans old hand-coded pages under src/pages/**\/*.astro and extracts minimal
 * metadata (title, meta description, h1, form IDs) into a CSV so marketing
 * can review before bulk-seeding into CMS.
 *
 * Does NOT modify source files. Output: reports/legacy-pages-audit.csv
 *
 * Usage:
 *   node scripts/legacy-to-v2.mjs
 *   node scripts/legacy-to-v2.mjs --format=json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pagesDir = path.join(root, 'src', 'pages');
const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });

const format = process.argv.includes('--format=json') ? 'json' : 'csv';

// Recursively collect .astro files under /pages, excluding v2 + special dirs
function walkAstro(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['v2', 'api', 'mau', 'mau-template', 'samples', 'admin'].includes(entry.name)) continue;
      walkAstro(full, acc);
    } else if (entry.isFile() && entry.name.endsWith('.astro')) {
      acc.push(full);
    }
  }
  return acc;
}

function pathToSlug(file) {
  const rel = path.relative(pagesDir, file).replace(/\\/g, '/');
  let slug = rel.replace(/\.astro$/, '');
  slug = slug.replace(/\/index$/, ''); // `/mam-non/index` → `/mam-non`
  if (slug === 'index') slug = '';
  return slug;
}

function classify(slug, source) {
  if (slug === '') return 'homepage';
  if (slug === '404') return 'utility';
  if (slug === 'cam-on' || slug.endsWith('/cam-on')) return 'thankyou';
  if (slug.startsWith('tin-tuc/') || slug.startsWith('blog/')) return 'article';
  if (slug.includes('/lop-6/')) return 'squeeze_ab';
  if (slug.startsWith('tuyen-sinh/') && slug.split('/').length > 1) return 'landing';
  if (slug.startsWith('squeeze/')) return 'squeeze';
  if (['tuyen-sinh', 'hoc-phi', 'co-so', 'thanh-tich', 'so-sanh', 'mam-non', 'tieu-hoc',
       'trung-hoc-co-so', 'trung-hoc-pho-thong', 'he-thong-pdr', 'triet-ly-giao-duc',
       'hoc-bong', 'ngoai-khoa', 'phu-huynh', 'gioi-thieu', 'lien-he', 'tin-tuc',
       'cap-hoc', 'hinh-anh', 'su-kien'].includes(slug)) return 'pillar';
  return 'other';
}

function extract(source) {
  // Title
  const title = (source.match(/title\s*=\s*\{?['"]([^'"]+)['"]\}?/i)
    || source.match(/<title>([^<]+)<\/title>/i))?.[1]?.trim() || '';

  // Meta description
  const desc = (source.match(/description\s*=\s*\{?['"]([^'"]+)['"]\}?/i)
    || source.match(/<meta\s+name="description"\s+content="([^"]+)"/i))?.[1]?.trim() || '';

  // H1
  const h1 = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';

  // Form IDs (both LeadFormTwoStepEmailFirst and form id="..." patterns)
  const formIds = new Set();
  for (const m of source.matchAll(/formId\s*=\s*['"]([^'"]+)['"]/g)) formIds.add(m[1]);
  for (const m of source.matchAll(/funnelCode\s*=\s*['"]([^'"]+)['"]/g)) formIds.add(`funnel:${m[1]}`);
  for (const m of source.matchAll(/<form[^>]+id="([^"]+)"/g)) formIds.add(m[1]);

  // Layout
  const layout = source.match(/import\s+\w+\s+from\s+['"][^'"]*layouts\/([^'"\/]+)/)?.[1] || '';

  // Directus getPillarPage
  const usesCms = /getPillarPage\(|getPageBySlug\(|cmsPage/.test(source);

  // Structured data blocks count
  const structuredData = (source.match(/"@type":\s*"([^"]+)"/g) || []).map((s) => s.split('"')[3]);

  return { title, desc, h1, formIds: Array.from(formIds), layout, usesCms, structuredData };
}

const files = walkAstro(pagesDir);
const rows = files.map((file) => {
  const source = fs.readFileSync(file, 'utf8');
  const slug = pathToSlug(file);
  const meta = extract(source);
  return {
    slug,
    url: `/${slug}`,
    type: classify(slug, source),
    layout: meta.layout,
    title: meta.title,
    h1: meta.h1,
    description: meta.desc,
    forms: meta.formIds.join(' | '),
    uses_cms: meta.usesCms ? 'yes' : 'no',
    schema_types: meta.structuredData.join(' | '),
    file: path.relative(root, file),
    lines: source.split('\n').length,
  };
});

rows.sort((a, b) => a.type.localeCompare(b.type) || a.slug.localeCompare(b.slug));

if (format === 'json') {
  const outFile = path.join(outDir, 'legacy-pages-audit.json');
  fs.writeFileSync(outFile, JSON.stringify(rows, null, 2));
  console.log(`Wrote ${outFile} (${rows.length} pages)`);
} else {
  const headers = ['slug', 'url', 'type', 'layout', 'title', 'h1', 'description', 'forms', 'uses_cms', 'schema_types', 'file', 'lines'];
  const esc = (v) => {
    const s = String(v ?? '').replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => esc(r[h])).join(','))].join('\n');
  const outFile = path.join(outDir, 'legacy-pages-audit.csv');
  fs.writeFileSync(outFile, csv);
  console.log(`Wrote ${outFile} (${rows.length} pages)`);
}

// Stats
const byType = {};
for (const r of rows) byType[r.type] = (byType[r.type] || 0) + 1;
const totalLines = rows.reduce((s, r) => s + r.lines, 0);
console.log(`\nBreakdown by type:`);
for (const [t, n] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(15)} ${n}`);
}
console.log(`\nTotal: ${rows.length} pages, ${totalLines.toLocaleString()} lines of hand-coded Astro`);
console.log(`After v2 migration: ~1 dispatcher file + ${rows.length} CMS records`);
