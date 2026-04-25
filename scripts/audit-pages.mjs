#!/usr/bin/env node
// Audit all pages in src/pages → emit CSV + JSON for /sitemap page
// Usage: node scripts/audit-pages.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const ROOT = path.resolve(process.cwd(), 'src/pages');
const OUT_CSV = path.resolve(process.cwd(), 'public/sitemap-audit.csv');
const OUT_JSON = path.resolve(process.cwd(), 'src/data/sitemap-audit.json');
const BASE = 'https://truongvietanh.com';

// === Template registry: slots/blocks for each layout ===
const TEMPLATES = {
  BaseLayout: {
    file: 'src/layouts/BaseLayout.astro',
    slots: ['(default)'],
    description: 'Layout chuẩn cho pillar/blog/info — hero, content tự build, header+footer chung',
    pagesNote: 'Pages dùng template này có thể đổi sang template khác bằng cách thay `import BaseLayout` bằng layout mới và bọc lại slot mặc định',
  },
  SqueezePageLayout: {
    file: 'src/layouts/SqueezePageLayout.astro',
    slots: ['hero', 'usp', 'trust', 'content', 'form', 'faq'],
    description: 'Squeeze landing đơn giản — 6 blocks: hero / usp / trust / content / form / faq + urgency bar tự động',
    pagesNote: 'Đổi template: thay import; cần map các <section slot=...> sang slot của layout mới',
  },
  SalesPageLayout: {
    file: 'src/layouts/SalesPageLayout.astro',
    slots: ['hero', 'stats', 'pain', 'features', 'textimg', 'quote', 'pricing', 'form1', 'cta', 'form2', 'faq'],
    description: 'Long-form sales page — 11 blocks: hero/stats/pain/features/textimg/quote/pricing/form1/cta/form2/faq',
    pagesNote: 'Đổi template: cần ánh xạ 11 slot; nếu chuyển sang Squeeze sẽ rút gọn còn 6',
  },
  VSLSqueezePage: {
    file: 'src/components/VSLSqueezePage.astro',
    slots: [],
    description: 'VSL component (không slot) — toàn bộ nội dung qua Props: headline, hookParagraph, benefits[], videoEmbedUrl, ctaPrimary, …',
    pagesNote: 'Đổi template: thay <VSLSqueezePage> bằng <SqueezePageLayout> hoặc layout khác; chuyển props sang slot',
  },
  VSLThankYouPage: {
    file: 'src/components/VSLThankYouPage.astro',
    slots: [],
    description: 'VSL thank-you (cảm ơn sau VSL) — Props: thankHeadline, nextSteps[], contactInfo',
    pagesNote: 'Tương tự VSLSqueezePage — chuyển sang BaseLayout hoặc layout cảm ơn chung nếu cần',
  },
  SummerCampSalesPage: {
    file: 'src/components/SummerCampSalesPage.astro',
    slots: [],
    description: 'Component sales chuyên cho trại hè — Props: programCode, schedule, price, …',
    pagesNote: 'Có thể swap sang SalesPageLayout nếu cần custom blocks chi tiết hơn',
  },
  inline: {
    file: '(no shared layout)',
    slots: [],
    description: 'Trang tự build hoàn toàn — không qua layout chung; có header/footer riêng hoặc không có',
    pagesNote: 'Nên migrate sang BaseLayout để hưởng chung GTM, schema, header/footer, font loading',
  },
};

// === Helpers ===
function fileToUrl(p) {
  let rel = path.relative(ROOT, p).replaceAll(path.sep, '/').replace(/\.astro$/, '');
  if (rel.endsWith('/index')) rel = rel.slice(0, -6);
  if (rel === 'index') return BASE + '/';
  return BASE + '/' + rel;
}

function gitLastModified(p) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${p}"`, { encoding: 'utf8' }).trim();
    return out || '';
  } catch { return ''; }
}

function detectLayout(c) {
  const m = c.match(/import\s+\w+\s+from\s+['"][^'"]*layouts\/([^'"]+?)\.astro['"]/);
  if (m) return m[1];
  for (const tpl of ['VSLSqueezePage', 'VSLThankYouPage', 'SummerCampSalesPage']) {
    if (new RegExp(`<${tpl}\\b`).test(c)) return tpl;
  }
  return 'inline';
}

function detectForms(c) {
  const forms = new Set();
  for (const m of c.matchAll(/formId\s*=\s*["']([^"']+)["']/g)) forms.add('#' + m[1]);
  for (const m of c.matchAll(/funnelCode\s*=\s*["']([^"']+)["']/g)) forms.add('fc:' + m[1]);
  for (const m of c.matchAll(/<(LeadForm\w*|QuizFunnel)\b/g)) forms.add(m[1]);
  return [...forms].sort();
}

function wordCount(c) {
  if (c.startsWith('---')) {
    const end = c.indexOf('---', 3);
    if (end > 0) c = c.slice(end + 3);
  }
  c = c.replace(/<script[\s\S]*?<\/script>/g, ' ')
       .replace(/<style[\s\S]*?<\/style>/g, ' ')
       .replace(/<[^>]+>/g, ' ')
       .replace(/\{[^}]*\}/g, ' ');
  return (c.match(/\b[\wÀ-ỹà-ỹ]+\b/g) || []).length;
}

function extractTitle(c) {
  let m = c.match(/title\s*[:=]\s*['"`]([^'"`]+)['"`]/);
  if (m) return m[1];
  m = c.match(/const\s+(?:page)?[Tt]itle\s*=\s*['"`]([^'"`]+)['"`]/);
  if (m) return m[1];
  m = c.match(/<title>([^<]+)<\/title>/);
  if (m) return m[1];
  m = c.match(/<h1[^>]*>([^<]+)<\/h1>/);
  return m ? m[1].trim() : '';
}

// === Walk pages ===
function* walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, ent.name);
    if (ent.isDirectory()) yield* walk(fp);
    else if (ent.name.endsWith('.astro')) yield fp;
  }
}

const allForms = new Map(); // form id → {pages: []}
const rows = [];

for (const fp of [...walk(ROOT)].sort()) {
  const rel = path.relative(ROOT, fp).replaceAll(path.sep, '/');
  const isDynamic = rel.includes('[');
  const isDev = /^(admin|samples|mau|mau-template|v2|report|mau-giao-dien)/.test(rel);
  const c = fs.readFileSync(fp, 'utf8');
  const url = fileToUrl(fp);
  const title = extractTitle(c).slice(0, 120);
  const layout = detectLayout(c);
  const forms = detectForms(c);
  const wc = wordCount(c);
  const updated = gitLastModified(fp);
  const tpl = TEMPLATES[layout] || { description: '', pagesNote: '', slots: [] };
  const note = [
    isDynamic && 'dynamic',
    isDev && 'dev/internal',
    layout && tpl.pagesNote ? `Có thể đổi template (${tpl.slots.length ? tpl.slots.join('|') : 'no-slot'})` : '',
  ].filter(Boolean).join(' · ');

  for (const f of forms) {
    if (!allForms.has(f)) allForms.set(f, { pages: [] });
    allForms.get(f).pages.push(url);
  }

  rows.push({ url, title, template: layout, forms: forms.join('; ') || '—', words: wc, updated, note });
}

// === CSV ===
function csvEscape(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
const header = ['URL', 'Title', 'Template', 'Form(s)', 'Words', 'Last Updated', 'Notes'];
const csv = [header.join(',')]
  .concat(rows.map(r => [r.url, r.title, r.template, r.forms, r.words, r.updated, r.note].map(csvEscape).join(',')))
  .join('\n');

fs.mkdirSync(path.dirname(OUT_CSV), { recursive: true });
fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.writeFileSync(OUT_CSV, csv);

// === Templates summary CSV (separate sheet) ===
const tplCsv = ['Template,File,Slots/Blocks,Description,Pages Using,Pages-Note']
  .concat(Object.entries(TEMPLATES).map(([k, v]) => {
    const usingCount = rows.filter(r => r.template === k).length;
    return [k, v.file, v.slots.join('|') || '(no slots — props only)', v.description, usingCount, v.pagesNote].map(csvEscape).join(',');
  }))
  .join('\n');
fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap-templates.csv'), tplCsv);

// === Forms summary CSV ===
const formsCsv = ['Form,Pages Count,Pages']
  .concat([...allForms.entries()].sort().map(([f, d]) => [f, d.pages.length, d.pages.join(' | ')].map(csvEscape).join(',')))
  .join('\n');
fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap-forms.csv'), formsCsv);

// === JSON for /sitemap page ===
const json = {
  generatedAt: new Date().toISOString(),
  totals: { pages: rows.length, templates: Object.keys(TEMPLATES).length, forms: allForms.size },
  pages: rows,
  templates: Object.entries(TEMPLATES).map(([k, v]) => ({
    name: k, ...v,
    pagesUsing: rows.filter(r => r.template === k).length,
  })),
  forms: [...allForms.entries()].sort().map(([f, d]) => ({ form: f, count: d.pages.length, pages: d.pages })),
};
fs.writeFileSync(OUT_JSON, JSON.stringify(json, null, 2));

console.log(`✓ ${rows.length} pages | ${allForms.size} unique forms | ${Object.keys(TEMPLATES).length} templates`);
console.log(`✓ public/sitemap-audit.csv  (${csv.split('\n').length - 1} rows)`);
console.log(`✓ public/sitemap-templates.csv`);
console.log(`✓ public/sitemap-forms.csv`);
console.log(`✓ src/data/sitemap-audit.json  (used by /sitemap page)`);
