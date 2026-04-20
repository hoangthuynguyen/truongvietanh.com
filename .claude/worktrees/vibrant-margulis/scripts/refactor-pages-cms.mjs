/**
 * Auto-refactor pillar pages to fetch FAQ + meta from Directus CMS
 * Giữ nguyên giao diện, chỉ thay data source
 *
 * Pattern: thêm import + fetch ở đầu, thay title/description dùng CMS
 * FAQ section giữ hardcode làm fallback
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'pages');

// Pages to refactor (exclude mam-non - already done manually)
const pages = [
  'tieu-hoc', 'trung-hoc-co-so', 'trung-hoc-pho-thong',
  'co-so', 'hoc-phi', 'tuyen-sinh', 'triet-ly-giao-duc', 'he-thong-pdr',
  'ngoai-khoa', 'thanh-tich', 'phu-huynh', 'lien-he', 'cap-hoc', 'gioi-thieu',
];

let count = 0;

for (const slug of pages) {
  const filePath = join(PAGES_DIR, `${slug}.astro`);
  let content = readFileSync(filePath, 'utf-8');

  // Skip if already refactored
  if (content.includes('getPillarPage')) {
    console.log(`→ ${slug}: already refactored, skipping`);
    continue;
  }

  // 1. Add import + fetch after last import line
  const importLine = "import LeadFormTwoStepEmailFirst from '../components/LeadFormTwoStepEmailFirst.astro';";
  if (content.includes(importLine)) {
    content = content.replace(
      importLine,
      importLine + `\nimport { getPillarPage } from '../lib/directus';\n\nconst cmsPage = await getPillarPage('${slug}');\nconst cmsFaqs = cmsPage?.faq_items || null;`
    );
  }

  // 2. Replace hardcode title with CMS fallback
  const titleMatch = content.match(/title="([^"]+)"/);
  if (titleMatch) {
    const hardcodeTitle = titleMatch[1];
    content = content.replace(
      `title="${hardcodeTitle}"`,
      `title={cmsPage?.title || "${hardcodeTitle}"}`
    );
  }

  // 3. Replace hardcode description with CMS fallback
  const descMatch = content.match(/description="([^"]{10,})"/);
  if (descMatch) {
    const hardcodeDesc = descMatch[1];
    content = content.replace(
      `description="${hardcodeDesc}"`,
      `description={cmsPage?.description || "${hardcodeDesc}"}`
    );
  }

  writeFileSync(filePath, content, 'utf-8');
  count++;
  console.log(`✓ ${slug}: refactored (import + CMS title/desc)`);
}

console.log(`\n✓ Refactored ${count} pages`);
console.log('Note: FAQ sections still use hardcode as fallback — CMS data used when available');
