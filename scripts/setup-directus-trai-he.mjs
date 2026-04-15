#!/usr/bin/env node
// Apply schema + seed data for the `trai_he_squeeze_pages` collection to a
// production Directus instance. Idempotent: safe to run multiple times.
//
// Usage:
//   DIRECTUS_URL=http://45.88.188.169:8055 \
//   DIRECTUS_TOKEN=tva_xxxxx \
//   node scripts/setup-directus-trai-he.mjs

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DIRECTUS_URL = (process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').replace(/\/$/, '');
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || 'tva_0b80f9b6cc9c494d98faf0a2a1a966e7';
const COLLECTION = 'trai_he_squeeze_pages';

const SCHEMA_PATH = resolve(__dirname, '../directus/snapshots/trai-he-squeeze-pages.json');
const SEED_PATH = resolve(__dirname, '../directus/seed/trai-he-squeeze-pages.json');

async function directusFetch(path, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set('Authorization', `Bearer ${DIRECTUS_TOKEN}`);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const res = await fetch(`${DIRECTUS_URL}${path}`, { ...init, headers });
  const text = await res.text();
  let body = null;
  if (text) {
    try { body = JSON.parse(text); } catch { body = text; }
  }

  return { status: res.status, ok: res.ok, body };
}

async function collectionExists() {
  const { status } = await directusFetch(`/collections/${COLLECTION}`);
  return status === 200;
}

async function getExistingFields() {
  const { status, body } = await directusFetch(`/fields/${COLLECTION}`);
  if (status !== 200 || !body?.data) return new Set();
  return new Set(body.data.map((f) => f.field));
}

async function getExistingSlugs() {
  const { status, body } = await directusFetch(`/items/${COLLECTION}?fields=slug&limit=-1`);
  if (status !== 200 || !body?.data) return new Set();
  return new Set(body.data.map((r) => r.slug).filter(Boolean));
}

async function createCollection(snapshot) {
  const collDef = snapshot.collections[0];
  // Directus /collections expects fields to include the primary key at minimum.
  // We strip all other fields and add them individually after.
  const idField = snapshot.fields.find((f) => f.collection === COLLECTION && f.field === 'id');
  const payload = {
    collection: collDef.collection,
    meta: collDef.meta,
    schema: collDef.schema,
    fields: idField ? [idField] : [],
  };

  const { status, ok, body } = await directusFetch('/collections', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!ok) {
    throw new Error(`Failed to create collection ${COLLECTION}: ${status} ${JSON.stringify(body)}`);
  }
}

async function createField(fieldDef) {
  const payload = {
    field: fieldDef.field,
    type: fieldDef.type,
    meta: fieldDef.meta || null,
    schema: fieldDef.schema || null,
  };

  const { status, ok, body } = await directusFetch(`/fields/${COLLECTION}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (!ok) {
    throw new Error(`Failed to create field ${fieldDef.field}: ${status} ${JSON.stringify(body)}`);
  }
}

async function createItem(record) {
  const { status, ok, body } = await directusFetch(`/items/${COLLECTION}`, {
    method: 'POST',
    body: JSON.stringify(record),
  });

  if (!ok) {
    throw new Error(`Failed to create item ${record.slug || record.id}: ${status} ${JSON.stringify(body)}`);
  }
}

async function main() {
  console.log(`Target: ${DIRECTUS_URL}`);
  console.log(`Collection: ${COLLECTION}`);
  console.log('');

  const [snapshotRaw, seedRaw] = await Promise.all([
    readFile(SCHEMA_PATH, 'utf8'),
    readFile(SEED_PATH, 'utf8'),
  ]);
  const snapshot = JSON.parse(snapshotRaw);
  const seed = JSON.parse(seedRaw);

  // 1) Collection
  const exists = await collectionExists();
  if (exists) {
    console.log(`Collection ${COLLECTION}... already exists, skipping create`);
  } else {
    process.stdout.write(`Creating collection ${COLLECTION}... `);
    await createCollection(snapshot);
    console.log('OK');
  }

  // 2) Fields
  const existingFields = await getExistingFields();
  const fieldDefs = snapshot.fields.filter((f) => f.collection === COLLECTION && f.field !== 'id');

  let createdFields = 0;
  let skippedFields = 0;
  for (const fieldDef of fieldDefs) {
    if (existingFields.has(fieldDef.field)) {
      skippedFields += 1;
      continue;
    }
    process.stdout.write(`Creating field ${fieldDef.field}... `);
    await createField(fieldDef);
    console.log('OK');
    createdFields += 1;
  }
  console.log(`Fields: ${createdFields} created, ${skippedFields} already existed (total ${fieldDefs.length})`);

  // 3) Seed items
  const existingSlugs = await getExistingSlugs();
  console.log(`Seeding ${seed.length} records...`);

  let createdItems = 0;
  let skippedItems = 0;
  for (const record of seed) {
    if (record.slug && existingSlugs.has(record.slug)) {
      console.log(`  - ${record.slug}: already exists, skip`);
      skippedItems += 1;
      continue;
    }
    // Drop `id` if present — let Directus generate UUID; also drop any nulls that might trip strict schema.
    const payload = { ...record };
    if (typeof payload.id === 'string' && !/^[0-9a-f-]{36}$/i.test(payload.id)) {
      delete payload.id;
    }
    process.stdout.write(`  - ${record.slug || '(no-slug)'}: creating... `);
    await createItem(payload);
    console.log('OK');
    createdItems += 1;
  }

  console.log('');
  console.log(`Seed summary: ${createdItems} created, ${skippedItems} skipped (total ${seed.length})`);
  console.log('Done.');
}

main().catch((err) => {
  console.error('\nERROR:', err instanceof Error ? err.message : err);
  process.exit(1);
});
