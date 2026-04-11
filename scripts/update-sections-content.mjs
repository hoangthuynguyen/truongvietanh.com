/**
 * Extract section HTML from .astro files → update Directus pillar_pages.sections
 * Giúp content team nhìn thấy nội dung thực tế trong CMS
 */

import { readFileSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'pages');
const DIRECTUS_URL = 'http://45.88.188.169:8055';
const TOKEN = 'tva_0b80f9b6cc9c494d98faf0a2a1a966e7';

const pages = [
  'gioi-thieu', 'mam-non', 'tieu-hoc', 'trung-hoc-co-so', 'trung-hoc-pho-thong',
  'co-so', 'hoc-phi', 'tuyen-sinh', 'triet-ly-giao-duc', 'he-thong-pdr',
  'ngoai-khoa', 'thanh-tich', 'phu-huynh', 'lien-he', 'cap-hoc',
];

async function run() {
  for (const slug of pages) {
    const filePath = join(PAGES_DIR, `${slug}.astro`);
    let content;
    try { content = readFileSync(filePath, 'utf-8'); } catch { continue; }

    // Extract sections with their HTML content
    const sectionRegex = /<section[^>]*class="gi-section"[^>]*>([\s\S]*?)<\/section>/g;
    const sections = [];
    let match;
    let idx = 0;
    while ((match = sectionRegex.exec(content)) !== null) {
      const html = match[1];
      const titleMatch = html.match(/<h2[^>]*>[\s\S]*?<\/(?:svg|span)>\s*([^<]+)/);
      const title = titleMatch ? titleMatch[1].trim() : `Section ${idx + 1}`;

      // Clean HTML for CMS display — remove Astro expressions, keep readable HTML
      let cleanHtml = html
        .replace(/<svg[\s\S]*?<\/svg>/g, '') // remove SVGs
        .replace(/<span class="si">[^<]*<\/span>/g, '') // remove icon spans
        .replace(/\{[^}]+\}/g, '') // remove Astro expressions
        .replace(/<img[^>]*\/>/g, '[image]') // simplify images
        .replace(/\s+/g, ' ') // normalize whitespace
        .trim();

      // Take first 500 chars as preview
      if (cleanHtml.length > 500) cleanHtml = cleanHtml.slice(0, 500) + '...';

      sections.push({ id: idx, title, content_html: cleanHtml });
      idx++;
    }

    if (sections.length === 0) continue;

    // Find pillar page ID
    try {
      const findRes = await fetch(`${DIRECTUS_URL}/items/pillar_pages?filter[slug][_eq]=${slug}&fields=id`, {
        headers: { 'Authorization': `Bearer ${TOKEN}` }
      });
      const findData = await findRes.json();
      const pageId = findData.data?.[0]?.id;
      if (!pageId) { console.log(`  ✗ ${slug}: not found in CMS`); continue; }

      // Update sections
      const updateRes = await fetch(`${DIRECTUS_URL}/items/pillar_pages/${pageId}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });
      if (updateRes.ok) {
        console.log(`✓ ${slug}: ${sections.length} sections updated`);
      } else {
        console.log(`✗ ${slug}: ${updateRes.status}`);
      }
    } catch (e) {
      console.log(`✗ ${slug}: ${e.message}`);
    }
  }
}

run();
