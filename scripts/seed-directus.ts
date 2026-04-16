#!/usr/bin/env node
/**
 * Seed Directus CMS from directus/seed/*.json.
 *
 * Order matters:
 *   1. campuses (no deps)
 *   2. forms (no deps except FK to funnels — forms use funnel_code but not strict FK)
 *   3. funnels (depend on campuses)
 *   4. pages + blocks (depend on forms + funnels + campuses)
 *
 * Run: node --import tsx scripts/seed-directus.ts
 * Env: DIRECTUS_URL, DIRECTUS_ADMIN_TOKEN
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createDirectus, rest, staticToken, createItems, createItem, deleteItems, readItems } from '@directus/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedDir = path.join(__dirname, '..', 'directus', 'seed');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://cms.truongvietanh.com';
const DIRECTUS_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;
if (!DIRECTUS_TOKEN) { console.error('Set DIRECTUS_ADMIN_TOKEN env'); process.exit(1); }

const client = createDirectus(DIRECTUS_URL).with(rest()).with(staticToken(DIRECTUS_TOKEN));

function loadJson<T>(name: string): T {
  return JSON.parse(fs.readFileSync(path.join(seedDir, name), 'utf8'));
}

async function seedCollection<T extends { slug?: string; id?: string; code?: string }>(
  collection: string,
  items: T[],
  identifierField: 'slug' | 'id' | 'code' = 'id',
) {
  console.log(`→ Seeding ${collection} (${items.length} items)…`);
  for (const item of items) {
    try {
      await client.request(createItem(collection as any, item as any) as any);
      process.stdout.write('.');
    } catch (err: any) {
      // Likely duplicate — skip silently
      if (err?.errors?.[0]?.extensions?.code === 'RECORD_NOT_UNIQUE') {
        process.stdout.write('·');
      } else {
        process.stdout.write('!');
        if (process.env.VERBOSE) console.error(`\n  ${collection}[${item[identifierField]}]:`, err?.errors?.[0]?.message || err.message);
      }
    }
  }
  console.log(` done`);
}

async function seedPages(pages: any[]) {
  console.log(`→ Seeding pages + blocks (${pages.length} pages)…`);

  for (const page of pages) {
    const { blocks, ...pageData } = page;
    try {
      // Create page
      const created = await client.request(createItem('pages' as any, pageData) as any) as any;
      const pageId = created.id || page.id;

      // Create each block's concrete record, then create junction (page_blocks)
      for (const b of blocks) {
        // 1. Create block item
        const blockItem = await client.request(createItem(b.collection as any, b.item) as any) as any;
        // 2. Create junction
        await client.request(createItem('page_blocks' as any, {
          page_id: pageId,
          collection: b.collection,
          item: blockItem.id || b.item.id,
          sort: b.sort,
        }) as any);
      }
      process.stdout.write('.');
    } catch (err: any) {
      process.stdout.write('!');
      if (process.env.VERBOSE) console.error(`\n  page[${page.slug}]:`, err?.errors?.[0]?.message || err.message);
    }
  }
  console.log(` done`);
}

async function main() {
  console.log(`Seeding Directus at ${DIRECTUS_URL}\n`);

  const campuses = loadJson<any[]>('campuses.json');
  const forms = loadJson<any[]>('forms.json');
  const funnels = loadJson<any[]>('funnels.json');
  const pages = loadJson<any[]>('pages.json');

  await seedCollection('campuses', campuses, 'slug');
  await seedCollection('forms', forms, 'id');
  await seedCollection('funnels', funnels, 'code');
  await seedPages(pages);

  console.log(`\n✓ Seed complete`);
  console.log(`  ${campuses.length} campuses, ${forms.length} forms, ${funnels.length} funnels, ${pages.length} pages`);
}

main().catch((e) => { console.error(e); process.exit(1); });
