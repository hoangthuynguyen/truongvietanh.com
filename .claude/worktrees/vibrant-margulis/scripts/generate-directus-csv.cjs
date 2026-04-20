#!/usr/bin/env node
/**
 * Generate Directus Import CSV from all batch files
 * Reads markdown batch files and outputs CSV matching directus-import-data.csv format
 * Format: url, template_class, seo_title, seo_desc, hero_h1, hero_subtext, content_json, cta_text
 */

const fs = require('fs');
const path = require('path');

const BATCHES_DIR = path.resolve(__dirname, '../docs/batches');
const OUTPUT_PATH = path.resolve(__dirname, '../docs/directus-import-all.csv');

// Read all .md files in batches dir
const files = fs.readdirSync(BATCHES_DIR).filter(f => f.endsWith('.md')).sort();

const pages = [];

for (const file of files) {
  const content = fs.readFileSync(path.join(BATCHES_DIR, file), 'utf-8');
  
  // Find all page entries (marked by frontmatter blocks starting with ---)
  // Each page has a --- block with url, seo_title, etc. followed by content
  const sections = content.split(/^---$/m);
  
  let currentPage = null;
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();
    if (!section) continue;
    
    // Check if this is a frontmatter-like block with url:
    const urlMatch = section.match(/^url:\s*(.+)$/m);
    if (urlMatch) {
      // Parse frontmatter fields
      const getField = (name) => {
        const m = section.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
        return m ? m[1].trim() : '';
      };
      
      currentPage = {
        url: getField('url'),
        template_class: getField('template_class') || inferTemplateClass(file),
        seo_title: getField('seo_title'),
        seo_desc: getField('seo_desc'),
        hero_h1: getField('hero_h1'),
        hero_subtext: getField('hero_subtext'),
        cta_text: '',
        contentBlocks: [],
        source_file: file,
      };
      pages.push(currentPage);
    } else if (currentPage && section.length > 50) {
      // This is content after a frontmatter block — parse into blocks
      const blocks = parseContentToBlocks(section);
      currentPage.contentBlocks = blocks;
      
      // Extract CTA
      const ctaMatch = section.match(/\*?CTA:?\*?\s*\[(.+?)\]/);
      if (ctaMatch) {
        currentPage.cta_text = ctaMatch[1].replace(/→|←/g, '').trim();
      }
    }
  }
}

function inferTemplateClass(filename) {
  if (filename.startsWith('A')) return 'Level Pillar';
  if (filename.startsWith('B1')) return 'Class Fee Capture Landing';
  if (filename.startsWith('B2')) return 'Class Campus Tour Landing';
  if (filename.startsWith('B3')) return 'Class Open Day Landing';
  if (filename.startsWith('B4')) return 'Class Mixed Conversion';
  if (filename.startsWith('C')) return 'Class Local Intent Landing';
  if (filename.startsWith('D')) return 'Class Parent Hub Article';
  if (filename.startsWith('E')) return 'Class Corporate Brand';
  if (filename.startsWith('F')) return 'Class Legal Utility';
  return 'Other';
}

function parseContentToBlocks(content) {
  const blocks = [];
  const lines = content.split('\n');
  let currentText = '';
  
  for (const line of lines) {
    // Skip CTA lines and dividers
    if (line.startsWith('*CTA') || line.startsWith('CTA:') || line === '---' || line.startsWith('Form:') || line.startsWith('Form fields:')) continue;
    if (line.startsWith('> **Auto-gen') || line.startsWith('> **Lưu ý:**')) continue;
    
    // Headings
    const h2Match = line.match(/^##\s+(.+)/);
    const h3Match = line.match(/^###\s+(.+)/);
    
    if (h2Match) {
      if (currentText.trim()) {
        blocks.push({ type: 'paragraph', content: currentText.trim() });
        currentText = '';
      }
      blocks.push({ type: 'heading-2', content: h2Match[1].trim() });
      continue;
    }
    
    if (h3Match) {
      if (currentText.trim()) {
        blocks.push({ type: 'paragraph', content: currentText.trim() });
        currentText = '';
      }
      blocks.push({ type: 'heading-3', content: h3Match[1].trim() });
      continue;
    }
    
    // Answer blocks
    const answerMatch = line.match(/^\*\*\[Answer Block\]\*\*\s*(.+)/);
    if (answerMatch) {
      if (currentText.trim()) {
        blocks.push({ type: 'paragraph', content: currentText.trim() });
        currentText = '';
      }
      blocks.push({ type: 'answer-block', content: answerMatch[1].trim() });
      continue;
    }
    
    // FAQ
    const faqQMatch = line.match(/^\*\*\[Answer Block\]\*\*\s*(.+)/);
    
    // Bullet list
    if (line.match(/^[-*]\s+/)) {
      if (currentText.trim()) {
        blocks.push({ type: 'paragraph', content: currentText.trim() });
        currentText = '';
      }
      // Collect consecutive bullets
      const bulletText = line.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim();
      if (bulletText) {
        // Check if last block is already a bullet-list
        const last = blocks[blocks.length - 1];
        if (last && last.type === 'bullet-list') {
          last.items.push(bulletText);
        } else {
          blocks.push({ type: 'bullet-list', items: [bulletText] });
        }
      }
      continue;
    }
    
    // Numbered list
    if (line.match(/^\d+\.\s+/)) {
      if (currentText.trim()) {
        blocks.push({ type: 'paragraph', content: currentText.trim() });
        currentText = '';
      }
      const numText = line.replace(/^\d+\.\s+/, '').replace(/\*\*/g, '').trim();
      if (numText) {
        const last = blocks[blocks.length - 1];
        if (last && last.type === 'numbered-list') {
          last.items.push(numText);
        } else {
          blocks.push({ type: 'numbered-list', items: [numText] });
        }
      }
      continue;
    }
    
    // Table (skip for now — tables are handled differently in Directus)
    if (line.startsWith('|')) continue;
    
    // Regular paragraph text
    const cleaned = line.replace(/\*\*/g, '').trim();
    if (cleaned && !cleaned.startsWith('#') && !cleaned.startsWith('>')) {
      currentText += (currentText ? ' ' : '') + cleaned;
    }
  }
  
  if (currentText.trim()) {
    blocks.push({ type: 'paragraph', content: currentText.trim() });
  }
  
  return blocks;
}

// Generate CSV
function escapeCSV(str) {
  if (!str) return '';
  const s = String(str);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

const headers = ['url', 'template_class', 'seo_title', 'seo_desc', 'hero_h1', 'hero_subtext', 'content_json', 'cta_text'];

const csvLines = [headers.join(',')];

for (const page of pages) {
  if (!page.url) continue;
  
  const contentJson = JSON.stringify(page.contentBlocks)
    .replace(/"/g, '""'); // Double-escape for CSV
  
  const row = [
    escapeCSV(page.url),
    escapeCSV(page.template_class),
    escapeCSV(page.seo_title),
    escapeCSV(page.seo_desc),
    escapeCSV(page.hero_h1),
    escapeCSV(page.hero_subtext),
    '"' + contentJson + '"',
    escapeCSV(page.cta_text),
  ];
  
  csvLines.push(row.join(','));
}

fs.writeFileSync(OUTPUT_PATH, csvLines.join('\r\n'), 'utf-8');

console.log(`\n=== Directus Import CSV Generator ===`);
console.log(`Files processed: ${files.length}`);
console.log(`Pages extracted: ${pages.length}`);
console.log(`Pages with content: ${pages.filter(p => p.contentBlocks.length > 0).length}`);
console.log(`Pages title-only (skeleton): ${pages.filter(p => p.contentBlocks.length === 0).length}`);
console.log(`\nOutput: ${OUTPUT_PATH}`);

// Print breakdown by source file
console.log('\n--- Pages per batch file ---');
const byFile = {};
for (const p of pages) {
  byFile[p.source_file] = (byFile[p.source_file] || 0) + 1;
}
Object.entries(byFile).sort().forEach(([f, c]) => {
  console.log(`  ${f}: ${c} pages`);
});
