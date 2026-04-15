#!/usr/bin/env node
/**
 * Smoke test — runs after deploy to verify v2 endpoints + lead capture work.
 * Usage:
 *   BASE_URL=https://hoc.truongvietanh.com node scripts/smoke-test.mjs
 *   BASE_URL=http://localhost:4321 node scripts/smoke-test.mjs  (dev)
 */

const BASE = process.env.BASE_URL || 'https://hoc.truongvietanh.com';
const TIMEOUT_MS = 15_000;

const results = [];

async function check(name, fn) {
  const start = Date.now();
  try {
    await fn();
    const ms = Date.now() - start;
    results.push({ name, ok: true, ms });
    console.log(`  ✓ ${name} (${ms}ms)`);
  } catch (err) {
    const ms = Date.now() - start;
    results.push({ name, ok: false, ms, error: err.message });
    console.log(`  ✗ ${name} (${ms}ms): ${err.message}`);
  }
}

async function fetchWithTimeout(url, opts = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...opts, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

function expectStatus(res, expected) {
  if (res.status !== expected) throw new Error(`expected ${expected}, got ${res.status}`);
}

function expectContains(text, needle) {
  if (!text.includes(needle)) throw new Error(`response missing "${needle}"`);
}

console.log(`\n🔍 Smoke test: ${BASE}\n`);

// ============================================================
// 1. Root pages respond
// ============================================================
console.log('1. Core pages respond');
await check('GET /', async () => {
  const r = await fetchWithTimeout(BASE);
  expectStatus(r, 200);
  expectContains(await r.text(), 'Trường Việt Anh');
});
await check('GET /tuyen-sinh', async () => {
  const r = await fetchWithTimeout(`${BASE}/tuyen-sinh`);
  expectStatus(r, 200);
});
await check('GET /404 returns 404', async () => {
  const r = await fetchWithTimeout(`${BASE}/this-page-does-not-exist-xyz`);
  if (r.status !== 404) throw new Error(`expected 404, got ${r.status}`);
});

// ============================================================
// 2. V2 demo renders
// ============================================================
console.log('\n2. V2 architecture');
await check('GET /v2/demo renders with blocks', async () => {
  const r = await fetchWithTimeout(`${BASE}/v2/demo`);
  expectStatus(r, 200);
  const html = await r.text();
  expectContains(html, 'b-hero-squeeze');
  expectContains(html, 'b-trust-bar');
  expectContains(html, 'b-cards');
  expectContains(html, 'b-testimonial-grid');
  expectContains(html, 'b-faq');
});

// ============================================================
// 3. Sitemap + robots
// ============================================================
console.log('\n3. SEO surface');
await check('GET /sitemap-index.xml', async () => {
  const r = await fetchWithTimeout(`${BASE}/sitemap-index.xml`);
  expectStatus(r, 200);
  expectContains(await r.text(), 'sitemap');
});
await check('GET /robots.txt', async () => {
  const r = await fetchWithTimeout(`${BASE}/robots.txt`);
  if (r.status !== 200 && r.status !== 404) throw new Error(`unexpected ${r.status}`);
});

// ============================================================
// 4. Lead API — OPTIONS (CORS preflight)
// ============================================================
console.log('\n4. Lead API');
await check('OPTIONS /api/lead returns CORS headers', async () => {
  const r = await fetchWithTimeout(`${BASE}/api/lead`, {
    method: 'OPTIONS',
    headers: { 'Access-Control-Request-Method': 'POST', Origin: BASE },
  });
  if (r.status !== 204 && r.status !== 200) throw new Error(`expected 200/204, got ${r.status}`);
  const allow = r.headers.get('access-control-allow-methods');
  if (!allow?.includes('POST')) throw new Error('POST not allowed by CORS');
});

// ============================================================
// 5. Lead API — POST synthetic test lead
// ============================================================
await check('POST /api/lead accepts test payload', async () => {
  const email = `smoketest-${Date.now()}@example.com`;
  const r = await fetchWithTimeout(`${BASE}/api/lead`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      step: 'full_submit',
      email,
      phone: '0900000000', // clearly fake — sales should tag as test
      full_name: 'Smoke Test — delete me',
      funnel_code: 'smoke-test',
      page: `${BASE}/smoketest`,
      source: 'smoke-test',
      submitted_at: new Date().toISOString(),
    }),
  });
  // 200 (processed) or 403 (turnstile blocked without token) are both acceptable
  if (r.status !== 200 && r.status !== 403) {
    throw new Error(`expected 200 or 403, got ${r.status}`);
  }
});

// ============================================================
// 6. Static assets
// ============================================================
console.log('\n5. Static assets');
await check('GET /scripts/dynamic-form.js', async () => {
  const r = await fetchWithTimeout(`${BASE}/scripts/dynamic-form.js`);
  expectStatus(r, 200);
  expectContains(await r.text(), 'TVA_FORMS');
});
await check('GET /scripts/site-interactions.js', async () => {
  const r = await fetchWithTimeout(`${BASE}/scripts/site-interactions.js`);
  expectStatus(r, 200);
});
await check('GET /scripts/funnel-interactions.js', async () => {
  const r = await fetchWithTimeout(`${BASE}/scripts/funnel-interactions.js`);
  expectStatus(r, 200);
});

// ============================================================
// SUMMARY
// ============================================================
const passed = results.filter((r) => r.ok).length;
const failed = results.filter((r) => !r.ok).length;
const total = results.length;
const avgMs = Math.round(results.reduce((s, r) => s + r.ms, 0) / total);

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`  ${passed}/${total} passed · avg ${avgMs}ms`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

if (failed > 0) {
  console.log(`\n❌ ${failed} check(s) failed:`);
  for (const r of results.filter((r) => !r.ok)) {
    console.log(`   • ${r.name}: ${r.error}`);
  }
  process.exit(1);
}

console.log(`\n✅ All smoke tests passed\n`);
