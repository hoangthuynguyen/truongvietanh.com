#!/usr/bin/env node
/**
 * Deploy v2 — orchestrates the full release sequence with safety gates.
 *
 * Sequence:
 *   1. Preflight: git clean + tests pass + build succeeds
 *   2. Apply Directus schema (no-op if already applied)
 *   3. Seed data (idempotent — skips duplicates)
 *   4. Deploy Cloudflare Worker
 *   5. Smoke test the deployed URL
 *   6. Write deploy record to reports/deploys.log
 *
 * Usage:
 *   ENV=staging node scripts/deploy-v2.mjs
 *   ENV=prod node scripts/deploy-v2.mjs
 *   ENV=staging SKIP_SEED=1 node scripts/deploy-v2.mjs  (re-deploy without re-seeding)
 *
 * Flags:
 *   SKIP_TESTS=1       Skip vitest (don't use in CI)
 *   SKIP_SCHEMA=1      Skip Directus schema apply
 *   SKIP_SEED=1        Skip data seeding
 *   SKIP_WORKER=1      Skip Cloudflare deploy
 *   SKIP_SMOKE=1       Skip post-deploy smoke test
 *   DRY_RUN=1          Print commands without executing
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const env = process.env.ENV || 'staging';
const dryRun = process.env.DRY_RUN === '1';

const BASE_URLS = {
  staging: 'https://hoc.truongvietanh.com',
  prod: 'https://truongvietanh.com',
};
const baseUrl = BASE_URLS[env];
if (!baseUrl) {
  console.error(`❌ Unknown ENV: ${env}. Use 'staging' or 'prod'.`);
  process.exit(1);
}

const WRANGLER_CONFIG = env === 'prod' ? 'wrangler.jsonc' : 'wrangler.staging.jsonc';

// ===== HELPERS =====

function run(cmd, opts = {}) {
  console.log(`\n$ ${cmd}`);
  if (dryRun) return '';
  try {
    return execSync(cmd, { cwd: root, stdio: 'inherit', ...opts });
  } catch (err) {
    throw new Error(`Command failed: ${cmd}`);
  }
}

function runCapture(cmd) {
  if (dryRun) return '';
  return execSync(cmd, { cwd: root }).toString().trim();
}

function section(name) {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  ${name}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
}

function skip(flag, label) {
  if (process.env[flag] === '1') {
    console.log(`  ⏭  Skipped (${flag}=1)`);
    return true;
  }
  console.log(`  → ${label}`);
  return false;
}

// ===== 1. PREFLIGHT =====
section(`1/6 Preflight checks [env=${env}]`);

if (!dryRun) {
  const dirty = runCapture('git status --porcelain');
  if (dirty && env === 'prod') {
    console.error('❌ Git working tree not clean (prod requires clean state):');
    console.error(dirty);
    process.exit(1);
  } else if (dirty) {
    console.warn('⚠  Git working tree has changes (staging allows this)');
  }

  const branch = runCapture('git rev-parse --abbrev-ref HEAD');
  console.log(`  Branch: ${branch}`);
  if (env === 'prod' && branch !== 'main') {
    console.error(`❌ Prod deploys must be from main (current: ${branch})`);
    process.exit(1);
  }
}

// ===== 2. TESTS =====
section(`2/6 Run tests`);
if (!skip('SKIP_TESTS', 'npm test')) {
  run('npm test -- --reporter=dot');
}

// ===== 3. BUILD =====
section(`3/6 Astro build`);
if (!skip('SKIP_BUILD', 'npm run build')) {
  run('npm run build');
  if (!dryRun) {
    const pageCount = runCapture('find dist -name "*.html" | wc -l').trim();
    console.log(`  ✓ Built ${pageCount} pages`);
  }
}

// ===== 4. DIRECTUS SCHEMA + SEED =====
section(`4/6 Directus schema + seed`);

if (!process.env.DIRECTUS_ADMIN_TOKEN && env === 'prod') {
  console.warn('⚠  DIRECTUS_ADMIN_TOKEN not set — skipping schema/seed');
} else {
  if (!skip('SKIP_SCHEMA', 'Apply Directus schema snapshot')) {
    if (!dryRun) {
      console.warn('  ℹ  Run manually once: npx directus schema apply directus/snapshots/schema.json');
      console.warn('     (directus CLI needs local Docker or remote hosting)');
    }
  }

  if (!skip('SKIP_SEED', 'Seed Directus (9 campuses + 6 forms + 79 funnels + 79 pages)')) {
    if (process.env.DIRECTUS_ADMIN_TOKEN) {
      run('node --import tsx scripts/seed-directus.ts');
    } else {
      console.warn('  ⏭  DIRECTUS_ADMIN_TOKEN not set — skipped');
    }
  }
}

// ===== 5. DEPLOY WORKER =====
section(`5/6 Deploy Cloudflare Worker`);
if (!skip('SKIP_WORKER', `wrangler deploy -c ${WRANGLER_CONFIG}`)) {
  run(`npx wrangler deploy -c ${WRANGLER_CONFIG}`);
}

// ===== 6. SMOKE TEST =====
section(`6/6 Smoke test ${baseUrl}`);
if (!skip('SKIP_SMOKE', 'scripts/smoke-test.mjs')) {
  // Wait 10s for deploy to propagate
  if (!dryRun) {
    console.log('  Waiting 10s for deploy propagation…');
    await new Promise((r) => setTimeout(r, 10000));
  }
  try {
    run(`BASE_URL=${baseUrl} node scripts/smoke-test.mjs`);
  } catch {
    console.error('\n⚠  Smoke test failed but deploy is already live.');
    console.error('   Investigate logs + consider rolling back via Cloudflare dashboard.');
    process.exit(2);
  }
}

// ===== RECORD =====
section(`✓ Deploy complete`);

if (!dryRun) {
  const logDir = path.join(root, 'reports');
  fs.mkdirSync(logDir, { recursive: true });
  const logFile = path.join(logDir, 'deploys.log');
  const sha = runCapture('git rev-parse --short HEAD');
  const branch = runCapture('git rev-parse --abbrev-ref HEAD');
  const entry = `${new Date().toISOString()}  env=${env}  branch=${branch}  sha=${sha}  url=${baseUrl}\n`;
  fs.appendFileSync(logFile, entry);
  console.log(`\n  📝 Deploy recorded: ${logFile}`);
  console.log(`  🌐 ${baseUrl}`);
}

console.log(`\n✅ Deploy to ${env} successful`);
