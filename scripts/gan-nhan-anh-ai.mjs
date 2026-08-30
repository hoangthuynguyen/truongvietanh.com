/**
 * Gắn nhãn "Hình ảnh minh họa được tạo bằng AI" cho các ảnh do AI dựng trên blog.
 *
 * Căn cứ: Điều 11 khoản 4 Luật Trí tuệ nhân tạo 134/2025/QH15 + Điều 18 Nghị định
 * 142/2026/NĐ-CP — buộc gắn nhãn dễ nhận biết với nội dung hình ảnh, video "nhằm mô phỏng,
 * giả lập ngoại hình... của người thật hoặc tái hiện sự kiện thực tế". Nghị định xử phạt
 * 330/2026/NĐ-CP đã hiệu lực 19/8/2026.
 *
 * PHẠM VI — chỉ gắn cho ảnh AI dạng ẢNH CHỤP có người (dễ bị nhầm là ảnh thật).
 * KHÔNG gắn cho đồ họa, infographic, minh hoạ vẽ: chúng không mô phỏng người thật và
 * không tái hiện sự kiện thực tế, nên không thuộc diện. Đã soi từng ảnh trước khi phân loại.
 *
 * Chạy thử (không ghi):  node --env-file=.env scripts/gan-nhan-anh-ai.mjs
 * Ghi thật:              node --env-file=.env scripts/gan-nhan-anh-ai.mjs --apply
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const APPLY = process.argv.includes('--apply');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN.'); process.exit(1); }

const NHAN = 'Hình ảnh minh họa được tạo bằng AI.';

/** Ảnh nằm trong <figure> — gắn nhãn vào chính figcaption của nó. */
const TRONG_BAI = [
  { id: 1344, file: 'ai-powered-school-hero.webp' },
  { id: 1344, file: 'ai-application-vs-game.webp' },
  { id: 1408, file: 'day-con-dung-ai-dung-cach-me-ngoi-cung-con-hoc.webp' },
  { id: 1408, file: 'phong-thi-khong-co-ai-hoc-sinh-lam-bai-tren-giay.webp' },
  { id: 1409, file: 'ai-lam-ho-bai-hoc-sinh-chup-de-bai.webp' },
  { id: 1409, file: 'giao-vien-xem-vo-nhap-truoc-khi-xem-dap-an.webp' },
  { id: 1410, file: 'truong-hoc-ung-dung-ai-hoc-sinh-huong-dan-phu-huynh.webp' },
  { id: 1410, file: 'tap-huan-giao-vien-ung-dung-ai-trong-soan-giang.webp' },
];

/** Ảnh AI chỉ nằm ở featured_image — template không có chỗ chú thích, gắn vào dòng cuối bài. */
const CHI_CO_HERO = [1411, 1345];

/** Đã soi và loại khỏi danh sách — không thuộc diện Điều 11.4:
 *   1344 van-hoa-tien-phong-timeline / 5-tru-cot-ai-education / ai-mindset-hoc-sinh (minh hoạ vẽ)
 *   1356 truong-viet-anh-dung-ai-5-tru-cot (đồ họa)
 *   1357 hoc-sinh-viet-anh-eco-hub-vibe-coding-v2 (infographic, không có người)
 *   1408 dohoa-* ×2 · 1409 dohoa-* ×2 · 1410 dohoa-truong-dan-nhan-vs-truong-that
 *   1399 toàn bộ 6 ảnh — đang 404 trên production, phải sửa ảnh trước rồi mới xét gắn nhãn
 */

async function req(method, endpoint, body) {
  const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
    method, headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

/** Chèn nhãn vào figcaption của <figure> chứa đúng tên file. */
function ganVaoFigcaption(html, file) {
  const re = /<figure>([\s\S]*?)<\/figure>/gi;
  let out = html, found = false, skipped = false;
  out = out.replace(re, (whole, inner) => {
    if (!inner.includes(file)) return whole;
    found = true;
    if (inner.includes(NHAN)) { skipped = true; return whole; }
    const withCap = inner.replace(/<figcaption>([\s\S]*?)<\/figcaption>/i,
      (_m, cap) => `<figcaption>${cap.trim()} <em>${NHAN}</em></figcaption>`);
    // figure không có figcaption thì thêm mới
    const final = withCap === inner ? `${inner}<figcaption><em>${NHAN}</em></figcaption>` : withCap;
    return `<figure>${final}</figure>`;
  });
  return { html: out, found, skipped };
}

/** Chèn câu nhãn vào đoạn <em> cuối bài (hộp tác giả / nguồn). */
function ganVaoCuoiBai(html) {
  if (html.includes('Hình ảnh minh họa trong bài được tạo bằng AI')) return { html, skipped: true };
  const cau = ' Hình ảnh minh họa trong bài được tạo bằng AI.';
  // ưu tiên chèn ngay trước "Nguồn tham khảo"; không có thì nối vào cuối đoạn <em> cuối cùng
  if (/Nguồn tham khảo:/.test(html)) {
    return { html: html.replace('Nguồn tham khảo:', `${cau.trim()} Nguồn tham khảo:`), skipped: false };
  }
  const idx = html.lastIndexOf('</em></p>');
  if (idx === -1) return { html, skipped: false, failed: true };
  return { html: html.slice(0, idx) + cau + html.slice(idx), skipped: false };
}

const canSua = new Map();
const posts = new Map();
const ids = [...new Set([...TRONG_BAI.map(t => t.id), ...CHI_CO_HERO])];
const data = (await req('GET', `/items/posts?filter[id][_in]=${ids.join(',')}&fields=id,slug,content,featured_image&limit=30`)).data;
data.forEach(p => posts.set(p.id, p));

for (const { id, file } of TRONG_BAI) {
  const p = posts.get(id);
  if (!p) { console.log(`  ! ${id} khong tim thay bai`); continue; }
  const cur = canSua.get(id) ?? p.content;
  const r = ganVaoFigcaption(cur, file);
  if (!r.found) console.log(`  ! ${id}  KHONG THAY anh  ${file}`);
  else if (r.skipped) console.log(`  = ${id}  da co nhan   ${file}`);
  else { canSua.set(id, r.html); console.log(`  + ${id}  gan figcaption  ${file}`); }
}

for (const id of CHI_CO_HERO) {
  const p = posts.get(id);
  if (!p) { console.log(`  ! ${id} khong tim thay bai`); continue; }
  if (!p.featured_image) { console.log(`  - ${id}  chua co featured_image, bo qua`); continue; }
  const cur = canSua.get(id) ?? p.content;
  const r = ganVaoCuoiBai(cur);
  if (r.failed) console.log(`  ! ${id}  khong tim duoc cho chen`);
  else if (r.skipped) console.log(`  = ${id}  da co nhan hero`);
  else { canSua.set(id, r.html); console.log(`  + ${id}  gan nhan hero cuoi bai`); }
}

console.log('');
if (!canSua.size) { console.log('Khong co gi de sua.'); process.exit(0); }
if (!APPLY) {
  console.log(`CHAY THU — ${canSua.size} bai se doi. Them --apply de ghi that.`);
  process.exit(0);
}
for (const [id, content] of canSua) {
  await req('PATCH', `/items/posts/${id}`, { content });   // khong dung status/published_at
  console.log(`  da ghi bai ${id}`);
}
console.log(`\nXong ${canSua.size} bai. Nho commit + push de build lai site.`);
