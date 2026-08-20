/**
 * Đăng dần cụm 3 bài AI thay vì đổ hết cùng lúc.
 *
 * Lịch:  pillar day-con-dung-ai-dung-cach  → đã live 20/08 (Thứ Năm)
 *        ai-lam-ho-bai-dau-hieu-va-cach-sua → 25/08 (Thứ Ba)
 *        truong-hoc-ung-dung-ai-tieu-chi-danh-gia → 28/08 (Thứ Sáu)
 *
 * Query blog CHỈ lọc status=published, KHÔNG lọc published_at<=now — nên bài để
 * published là hiện ngay bất kể ngày. Muốn đăng dần thì phải giữ draft rồi bật
 * đúng ngày, đó là việc script này làm.
 *
 * Bài pillar có link trỏ sang 2 bài kia. Trong lúc 2 bài còn draft, link đó sẽ
 * chết, nên script gỡ thẻ <a> (giữ nguyên chữ) và gắn lại đúng lúc bài lên.
 *
 * Dùng:
 *   node --env-file=.env scripts/dang-bai-cum-ai.mjs --lich-trinh        # xem trạng thái
 *   node --env-file=.env scripts/dang-bai-cum-ai.mjs --hoan <slug>       # hạ về draft + gỡ link
 *   node --env-file=.env scripts/dang-bai-cum-ai.mjs --dang <slug>       # bật published + gắn lại link
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const PILLAR = 'day-con-dung-ai-dung-cach';
const LICH = {
  'ai-lam-ho-bai-dau-hieu-va-cach-sua': {
    ngay: '2026-08-25T09:00:00',
    anchor: 'AI làm hộ bài: 7 dấu hiệu con lệ thuộc AI và cách sửa',
  },
  'truong-hoc-ung-dung-ai-tieu-chi-danh-gia': {
    ngay: '2026-08-28T09:00:00',
    anchor: 'Trường học ứng dụng AI: 7 tiêu chí phụ huynh cần hỏi',
  },
};

const H = { Authorization: `Bearer ${DIRECTUS_TOKEN}`, 'Content-Type': 'application/json' };
async function req(method, endpoint, body) {
  const res = await fetch(`${DIRECTUS_URL}${endpoint}`, { method, headers: H, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}
const layBai = async (slug) =>
  (await req('GET', `/items/posts?fields=id,slug,status,published_at,content&filter%5Bslug%5D%5B_eq%5D=${slug}`)).data[0];

/** Bật/tắt thẻ <a> trong bài pillar trỏ tới slug. */
async function suaLinkPillar(slug, bat) {
  const cfg = LICH[slug];
  const pillar = await layBai(PILLAR);
  if (!pillar) throw new Error('Không tìm thấy bài pillar');
  const co = `<a href="/blog/${slug}/">${cfg.anchor}</a>`;
  const khong = cfg.anchor;
  let content = pillar.content;
  if (bat) {
    if (content.includes(co)) return 'link đã có';
    if (!content.includes(khong)) return 'KHÔNG tìm thấy chỗ gắn link';
    content = content.replace(khong, co);
  } else {
    if (!content.includes(co)) return 'link đã gỡ';
    content = content.replace(co, khong);
  }
  await req('PATCH', `/items/posts/${pillar.id}`, { content });
  return bat ? 'đã gắn lại link trong pillar' : 'đã gỡ link trong pillar';
}

const [, , lenh, slug] = process.argv;

if (lenh === '--lich-trinh') {
  for (const s of [PILLAR, ...Object.keys(LICH)]) {
    const b = await layBai(s);
    const hen = LICH[s] ? ` · hẹn ${LICH[s].ngay.slice(0, 10)}` : ' · pillar';
    console.log(`${(b?.status || 'KHÔNG CÓ').padEnd(10)} ${String(b?.id || '-').padEnd(6)} ${s}${hen}`);
  }
  process.exit(0);
}

if (!['--dang', '--hoan'].includes(lenh) || !LICH[slug]) {
  console.error('Dùng: --lich-trinh | --dang <slug> | --hoan <slug>');
  console.error('Slug hợp lệ: ' + Object.keys(LICH).join(', '));
  process.exit(1);
}

const bai = await layBai(slug);
if (!bai) throw new Error('Không tìm thấy bài: ' + slug);

if (lenh === '--hoan') {
  await req('PATCH', `/items/posts/${bai.id}`, { status: 'draft', published_at: LICH[slug].ngay });
  console.log(`Đã HOÃN id=${bai.id} ${slug} → draft, hẹn ${LICH[slug].ngay.slice(0, 10)}`);
  console.log('  ' + (await suaLinkPillar(slug, false)));
} else {
  await req('PATCH', `/items/posts/${bai.id}`, { status: 'published', published_at: LICH[slug].ngay });
  console.log(`Đã ĐĂNG id=${bai.id} ${slug} → published (${LICH[slug].ngay.slice(0, 10)})`);
  console.log('  ' + (await suaLinkPillar(slug, true)));
  console.log('  Nhớ deploy để bài lên site: push lên main hoặc chạy lại GitHub Actions deploy.');
}
