#!/usr/bin/env node
/**
 * Create final master import CSV and redirect rules
 * Merges: directus-import-expanded.csv (154 new) + directus-import-legacy.csv (400 legacy)
 * Also generates redirect rules for 436 archived URLs
 */

const fs = require('fs');
const path = require('path');

// --- PART 1: Merge into master CSV ---
const expandedPath = path.resolve(__dirname, '../docs/directus-import-expanded.csv');
const legacyPath = path.resolve(__dirname, '../docs/directus-import-legacy.csv');
const masterPath = path.resolve(__dirname, '../docs/directus-import-master.csv');
const redirectPath = path.resolve(__dirname, '../docs/redirect-rules.csv');
const enrichedPath = path.resolve(__dirname, '../docs/enriched-master-index.csv');

const expandedContent = fs.readFileSync(expandedPath, 'utf-8').replace(/\r\n/g, '\n');
const legacyContent = fs.readFileSync(legacyPath, 'utf-8').replace(/\r\n/g, '\n');

const expandedLines = expandedContent.split('\n').filter(l => l.trim());
const legacyLines = legacyContent.split('\n').filter(l => l.trim());

const header = expandedLines[0];
const expandedRows = expandedLines.slice(1);
const legacyRows = legacyLines.slice(1);

// Dedup by URL
const seenUrls = new Set();
const masterRows = [];

// Add expanded (new) pages first
for (const row of expandedRows) {
  const url = row.split(',')[0].replace(/"/g, '');
  if (!seenUrls.has(url)) {
    seenUrls.add(url);
    masterRows.push(row);
  }
}

// Add legacy pages
let dupes = 0;
for (const row of legacyRows) {
  const url = row.split(',')[0].replace(/"/g, '');
  if (!seenUrls.has(url)) {
    seenUrls.add(url);
    masterRows.push(row);
  } else {
    dupes++;
  }
}

fs.writeFileSync(masterPath, [header, ...masterRows].join('\r\n') + '\r\n', 'utf-8');

console.log(`\n=== Master Import CSV ===`);
console.log(`New pages: ${expandedRows.length}`);
console.log(`Legacy rewrites: ${legacyRows.length}`);
console.log(`Duplicates removed: ${dupes}`);
console.log(`Master total: ${masterRows.length}`);
console.log(`Output: ${masterPath} (${(fs.statSync(masterPath).size / 1024).toFixed(1)} KB)`);

// --- PART 2: Generate redirect rules ---
const enrichedContent = fs.readFileSync(enrichedPath, 'utf-8');
const enrichedLines = enrichedContent.split('\n').filter(l => l.trim());
const enrichedRows = enrichedLines.slice(1);

const redirectHeader = 'old_url,redirect_to,status_code,reason';
const redirectRows = [redirectHeader];

// Topic cluster → best redirect target
const clusterRedirect = {
  'Tiếng Anh': '/blog/10-bi-quyet-hoc-tieng-anh-hieu-qua',
  'Phụ huynh & Kỹ năng': '/blog/cach-chon-truong-mam-non-cho-con',
  'Thi cử & Tuyển sinh': '/tuyen-sinh',
  'Du học': '/blog/du-hoc-sau-thpt',
  'STEM & Công nghệ': '/blog/stem-cho-tre-tieu-hoc',
  'Học tập & Phương pháp': '/blog/active-learning-la-gi',
  'Mầm non': '/mam-non',
  'Tiểu học': '/tieu-hoc',
};

let archived = 0;
let reviewed = 0;
for (const row of enrichedRows) {
  const parts = row.split(',');
  const url = parts[0];
  const action = parts[5];
  const topicCluster = parts[7];
  
  if (action === 'Archive / Redirect') {
    const target = clusterRedirect[topicCluster] || '/';
    redirectRows.push(`${url},${target},301,Legacy content consolidated to pillar page`);
    archived++;
  } else if (action === 'Review') {
    // Don't redirect — just note for manual review
    reviewed++;
  }
}

fs.writeFileSync(redirectPath, redirectRows.join('\r\n') + '\r\n', 'utf-8');

console.log(`\n=== Redirect Rules ===`);
console.log(`301 redirects generated: ${archived}`);
console.log(`Manual review needed: ${reviewed}`);
console.log(`Output: ${redirectPath} (${(fs.statSync(redirectPath).size / 1024).toFixed(1)} KB)`);

// --- Print final summary ---
console.log(`\n=== FINAL SUMMARY ===`);
console.log(`Master import CSV: ${masterRows.length} pages (ready for Directus)`);
console.log(`Redirect rules: ${archived} 301 redirects`);
console.log(`For review: ${reviewed} URLs`);
console.log(`Total URLs handled: ${masterRows.length + archived + reviewed}`);
