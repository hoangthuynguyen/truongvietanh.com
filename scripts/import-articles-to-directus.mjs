/**
 * Import articles tu directus-import-master.csv vao Directus posts collection.
 *
 * Chay: node scripts/import-articles-to-directus.mjs
 *       node scripts/import-articles-to-directus.mjs --dry-run  (xem truoc, khong import)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_FILE = path.join(__dirname, '../docs/directus-import-master.csv');

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;
const DRY_RUN = process.argv.includes('--dry-run');
const BATCH_SIZE = 50;

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

function contentJsonToHtml(jsonStr) {
    try {
        const blocks = JSON.parse(jsonStr);
        return blocks.map(block => {
            switch (block.type) {
                case 'paragraph':
                    return `<p>${block.content}</p>`;
                case 'heading-2':
                    return `<h2>${block.content}</h2>`;
                case 'heading-3':
                    return `<h3>${block.content}</h3>`;
                case 'bullet-list':
                    const items = (block.items || []).map(i => `<li>${i}</li>`).join('');
                    return `<ul>${items}</ul>`;
                case 'faq':
                    return `<div class="faq-item"><h3>${block.question}</h3><p>${block.answer}</p></div>`;
                case 'image':
                    return `<img src="${block.src || block.url || ''}" alt="${block.alt || ''}" />`;
                default:
                    return block.content ? `<p>${block.content}</p>` : '';
            }
        }).join('\n');
    } catch {
        return jsonStr || '';
    }
}

async function directusRequest(method, endpoint, body) {
    const opts = {
        method,
        headers: {
            'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
            'Content-Type': 'application/json',
        },
    };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${DIRECTUS_URL}${endpoint}`, opts);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`${method} ${endpoint}: ${res.status} ${text.substring(0, 200)}`);
    }
    return res.json();
}

async function run() {
    console.log(`Directus URL: ${DIRECTUS_URL}`);
    console.log(`CSV: ${CSV_FILE}`);
    if (DRY_RUN) console.log('DRY RUN MODE\n');

    // Read CSV
    const lines = fs.readFileSync(CSV_FILE, 'utf8').split('\n').filter(l => l.trim());
    const header = parseCSVLine(lines[0]);
    console.log(`CSV headers: ${header.join(', ')}`);
    console.log(`Total rows: ${lines.length - 1}\n`);

    // Get existing slugs to avoid duplicates
    let existingSlugs = new Set();
    try {
        const existing = await directusRequest('GET', '/items/posts?fields=slug&limit=-1');
        existingSlugs = new Set(existing.data.map(p => p.slug));
        console.log(`Existing posts: ${existingSlugs.size}`);
    } catch (e) {
        console.log(`Could not fetch existing posts: ${e.message}`);
    }

    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const row = {};
        header.forEach((h, idx) => { row[h.trim()] = values[idx] || ''; });
        rows.push(row);
    }

    let imported = 0;
    let skipped = 0;
    let failed = 0;
    const batch = [];

    for (const row of rows) {
        // Generate slug from URL
        let slug = (row.url || '')
            .replace(/^\//, '')
            .replace(/\/$/, '')
            .replace(/[^a-zA-Z0-9-]/g, '-')
            .substring(0, 200);

        if (!slug) {
            skipped++;
            continue;
        }

        if (existingSlugs.has(slug)) {
            skipped++;
            continue;
        }

        // Convert content_json to HTML
        const htmlContent = contentJsonToHtml(row.content_json);

        const post = {
            title: row.hero_h1 || row.seo_title || slug,
            slug: slug,
            status: 'published',
            excerpt: row.seo_desc || row.hero_subtext || '',
            content: htmlContent,
            published_at: new Date().toISOString(),
        };

        batch.push(post);

        if (batch.length >= BATCH_SIZE) {
            if (!DRY_RUN) {
                try {
                    await directusRequest('POST', '/items/posts', batch);
                    imported += batch.length;
                    console.log(`  Imported batch: ${imported} posts`);
                } catch (e) {
                    console.error(`  Batch failed: ${e.message}`);
                    // Try one by one
                    for (const p of batch) {
                        try {
                            await directusRequest('POST', '/items/posts', p);
                            imported++;
                        } catch (e2) {
                            console.error(`  Failed: ${p.slug} - ${e2.message.substring(0, 100)}`);
                            failed++;
                        }
                    }
                }
            } else {
                imported += batch.length;
                console.log(`  [DRY RUN] Would import batch: ${imported} posts`);
            }
            batch.length = 0;
        }
    }

    // Import remaining
    if (batch.length > 0) {
        if (!DRY_RUN) {
            try {
                await directusRequest('POST', '/items/posts', batch);
                imported += batch.length;
            } catch (e) {
                for (const p of batch) {
                    try {
                        await directusRequest('POST', '/items/posts', p);
                        imported++;
                    } catch (e2) {
                        console.error(`  Failed: ${p.slug} - ${e2.message.substring(0, 100)}`);
                        failed++;
                    }
                }
            }
        } else {
            imported += batch.length;
        }
    }

    console.log('\n========================================');
    console.log(`Imported: ${imported}`);
    console.log(`Skipped:  ${skipped} (duplicate or empty slug)`);
    console.log(`Failed:   ${failed}`);
    if (DRY_RUN) console.log('(DRY RUN - nothing actually imported)');
    console.log('========================================');
}

run().catch(err => {
    console.error('Fatal:', err);
    process.exit(1);
});
