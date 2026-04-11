/**
 * Phase 3: Refactor FAQ sections in all pillar pages to use Directus CMS
 * Pattern: wrap existing hardcode FAQ in conditional — CMS data first, hardcode fallback
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PAGES_DIR = join(import.meta.dirname, '..', 'src', 'pages');

const pages = [
  'tieu-hoc', 'trung-hoc-co-so', 'trung-hoc-pho-thong',
  'co-so', 'hoc-phi', 'tuyen-sinh', 'triet-ly-giao-duc', 'he-thong-pdr',
  'ngoai-khoa', 'thanh-tich', 'phu-huynh', 'lien-he', 'cap-hoc', 'gioi-thieu',
];

let count = 0;

for (const slug of pages) {
  const filePath = join(PAGES_DIR, `${slug}.astro`);
  let content = readFileSync(filePath, 'utf-8');

  // Skip if already has cmsFaqs conditional rendering
  if (content.includes('cmsFaqs.map')) {
    console.log(`→ ${slug}: FAQ already CMS-powered, skipping`);
    continue;
  }

  // Find the first <details class="gi-faq-item" open> — this is where FAQ list starts
  const faqStartMarker = '<details class="gi-faq-item" open>';
  const faqStartIdx = content.indexOf(faqStartMarker);
  if (faqStartIdx === -1) {
    console.log(`✗ ${slug}: no FAQ section found, skipping`);
    continue;
  }

  // Find the gi-faq-list div that contains all FAQ items
  const faqListStart = content.lastIndexOf('<div class="gi-faq-list">', faqStartIdx);
  if (faqListStart === -1) {
    console.log(`✗ ${slug}: no gi-faq-list found, skipping`);
    continue;
  }

  // Find closing </div> of gi-faq-list (after all FAQ items)
  // Count nested divs to find the correct closing
  let depth = 0;
  let pos = faqListStart;
  let faqListEnd = -1;
  while (pos < content.length) {
    const nextOpen = content.indexOf('<div', pos + 1);
    const nextClose = content.indexOf('</div>', pos + 1);

    if (nextClose === -1) break;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      pos = nextOpen;
    } else {
      if (depth === 0) {
        faqListEnd = nextClose + '</div>'.length;
        break;
      }
      depth--;
      pos = nextClose;
    }
  }

  if (faqListEnd === -1) {
    console.log(`✗ ${slug}: could not find FAQ list end, skipping`);
    continue;
  }

  // Extract the existing FAQ HTML
  const existingFaqHtml = content.slice(faqListStart, faqListEnd);

  // Build replacement: CMS FAQ first, then hardcode fallback inside Fragment
  const replacement = `<div class="gi-faq-list">
            {cmsFaqs ? (
              cmsFaqs.map((faq, i) => (
                <details class="gi-faq-item" open={i === 0}>
                  <summary>{faq.question}</summary>
                  <div class="gi-faq-answer">
                    <p set:html={faq.answer} />
                  </div>
                </details>
              ))
            ) : (
              <>
            ${existingFaqHtml.replace('<div class="gi-faq-list">', '').replace(/\n\s*<\/div>\s*$/, '')}
              </>
            )}
          </div>`;

  content = content.slice(0, faqListStart) + replacement + content.slice(faqListEnd);

  writeFileSync(filePath, content, 'utf-8');
  count++;
  console.log(`✓ ${slug}: FAQ section CMS-powered with hardcode fallback`);
}

console.log(`\n✓ ${count} pages refactored for CMS FAQ`);
