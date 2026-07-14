/**
 * Đăng dần backlog blog 7–11/2026: bật các bài tới hạn (draft → published).
 *
 * PHẠM VI AN TOÀN: chỉ xử lý đúng id 1362–1398 (backlog đợt này). KHÔNG đụng tới
 * các bài draft/ẩn khác trong CMS. So sánh theo NGÀY (published_at <= hôm nay) nên
 * chạy giờ nào cũng đúng.
 *
 * Chạy CI:    node scripts/publish-due-posts.mjs
 * Thử tại chỗ: node --env-file=.env scripts/publish-due-posts.mjs --dry-run
 *
 * Ghi `flipped=<n>` vào $GITHUB_OUTPUT (nếu có) để workflow quyết định deploy.
 */

const URL = (process.env.PUBLIC_DIRECTUS_URL || '').trim();
const TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const DRY = process.argv.includes('--dry-run');
const ID_MIN = 1362, ID_MAX = 1398;

if (!URL || !TOKEN) {
  console.error('Thiếu PUBLIC_DIRECTUS_URL / DIRECTUS_TOKEN.');
  process.exit(1);
}

const H = { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' };
const todayUTC = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

async function main() {
  const q = `${URL}/items/posts?fields=id,slug,status,published_at`
    + `&filter%5Bid%5D%5B_gte%5D=${ID_MIN}&filter%5Bid%5D%5B_lte%5D=${ID_MAX}&limit=-1`;
  const res = await fetch(q, { headers: H });
  if (!res.ok) { console.error('GET lỗi', res.status, (await res.text()).slice(0, 300)); process.exit(1); }
  const posts = (await res.json()).data;

  const due = posts.filter(p =>
    p.status === 'draft' && p.published_at && p.published_at.slice(0, 10) <= todayUTC
  );

  console.log(`[${todayUTC}] backlog=${posts.length}, tới hạn cần bật=${due.length}`);
  for (const p of due) console.log(`  → ${p.published_at.slice(0, 10)}  /blog/${p.slug}`);

  if (due.length && !DRY) {
    const r = await fetch(`${URL}/items/posts`, {
      method: 'PATCH', headers: H,
      body: JSON.stringify({ keys: due.map(p => p.id), data: { status: 'published' } }),
    });
    if (!r.ok) { console.error('PATCH lỗi', r.status, (await r.text()).slice(0, 300)); process.exit(1); }
    console.log(`Đã bật ${due.length} bài sang published.`);
  } else if (DRY) {
    console.log('(dry-run — không thay đổi gì)');
  }

  if (process.env.GITHUB_OUTPUT) {
    const { appendFileSync } = await import('node:fs');
    appendFileSync(process.env.GITHUB_OUTPUT, `flipped=${DRY ? 0 : due.length}\n`);
  }
}

main();
