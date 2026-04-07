/**
 * Tao file public/_redirects tu docs/redirect-rules.csv
 * Cloudflare Pages/Workers se doc file nay de xu ly redirects.
 *
 * Chay: node scripts/generate-redirects-file.cjs
 */

const fs = require('fs');
const path = require('path');

const CSV_FILE = path.join(__dirname, '../docs/redirect-rules.csv');
const OUTPUT_FILE = path.join(__dirname, '../public/_redirects');

const lines = fs.readFileSync(CSV_FILE, 'utf8').split('\n').filter(l => l.trim());
const header = lines[0];

const redirects = [];

for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    if (parts.length < 3) continue;

    const oldUrl = parts[0].trim();
    const newUrl = parts[1].trim();
    const statusCode = parts[2].trim() || '301';

    if (oldUrl && newUrl) {
        redirects.push(`${oldUrl} ${newUrl} ${statusCode}`);
    }
}

// Write _redirects file
const output = [
    '# Redirect rules - WordPress migration',
    '# Generated: ' + new Date().toISOString(),
    '# Total: ' + redirects.length + ' rules',
    '',
    ...redirects,
    ''
].join('\n');

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Generated ${redirects.length} redirect rules → public/_redirects`);
