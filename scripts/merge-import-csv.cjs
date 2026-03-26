#!/usr/bin/env node
/**
 * Merge existing directus-import-data.csv (14 rows) with new directus-import-all.csv (141 rows)
 * Deduplicate by URL, prefer existing rows (they have richer content_json)
 * Output: directus-import-combined.csv (production-ready import)
 */

const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  const fields = [];
  let field = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        field += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      fields.push(field);
      field = '';
    } else {
      field += ch;
    }
  }
  fields.push(field);
  return fields;
}

// Read existing import (14 rows with rich content_json)
const existingPath = path.resolve(__dirname, '../docs/directus-import-data.csv');
const existingContent = fs.readFileSync(existingPath, 'utf-8').replace(/\r\n/g, '\n');
const existingLines = existingContent.split('\n').filter(l => l.trim());
const existingHeaders = existingLines[0];
const existingRows = existingLines.slice(1);

// Read new generated import (141 rows)
const newPath = path.resolve(__dirname, '../docs/directus-import-all.csv');
const newContent = fs.readFileSync(newPath, 'utf-8').replace(/\r\n/g, '\n');
const newLines = newContent.split('\n').filter(l => l.trim());
const newRows = newLines.slice(1);

// Parse existing rows into map by URL
const existingByUrl = new Map();
for (const row of existingRows) {
  const fields = parseCSVLine(row);
  const url = fields[0];
  if (url) {
    existingByUrl.set(url, row);
  }
}

// Parse new rows into map by URL
const newByUrl = new Map();
for (const row of newRows) {
  const fields = parseCSVLine(row);
  const url = fields[0];
  if (url) {
    newByUrl.set(url, row);
  }
}

// Combine: existing rows take priority, then add new rows
const combinedRows = [];
const seenUrls = new Set();

// Add existing rows first (they have richer content)
for (const [url, row] of existingByUrl) {
  combinedRows.push(row);
  seenUrls.add(url);
}

// Add new rows that don't conflict
let added = 0;
for (const [url, row] of newByUrl) {
  if (!seenUrls.has(url)) {
    combinedRows.push(row);
    seenUrls.add(url);
    added++;
  }
}

// Write combined CSV
const outputPath = path.resolve(__dirname, '../docs/directus-import-combined.csv');
const output = [existingHeaders, ...combinedRows].join('\r\n') + '\r\n';
fs.writeFileSync(outputPath, output, 'utf-8');

console.log(`\n=== Merge Report ===`);
console.log(`Existing rows (rich content): ${existingByUrl.size}`);
console.log(`New generated rows: ${newByUrl.size}`);
console.log(`Duplicates (kept existing): ${existingByUrl.size + newByUrl.size - combinedRows.length}`);
console.log(`New rows added: ${added}`);
console.log(`Combined total: ${combinedRows.length}`);
console.log(`\nOutput: ${outputPath}`);
