/**
 * Khép kín cụm AI: đặt khối "Các bài blog về AI" lên TẤT CẢ bài trong cụm,
 * mỗi bài liệt kê những bài còn lại (bỏ chính nó).
 *
 * Thay khối cũ "Đọc tiếp theo chủ đề" (id="doc-tiep") trên pillar bằng khối mới
 * id="cac-bai-blog-ve-ai". Chạy lại nhiều lần được — luôn dựng lại khối, không nhân đôi.
 *
 * Chỗ chèn, theo thứ tự ưu tiên:
 *   1. thay đúng chỗ khối cũ nếu đã có
 *   2. trước <h2>Về tác giả</h2>
 *   3. trước đoạn <p><em>Tác giả: …</em></p> cuối bài
 *   4. cuối nội dung
 *
 * Chạy thử:  node --env-file=.env scripts/lien-ket-cum-ai.mjs
 * Ghi thật:  node --env-file=.env scripts/lien-ket-cum-ai.mjs --apply
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const APPLY = process.argv.includes('--apply');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN.'); process.exit(1); }

const TIEU_DE = 'Các bài blog về AI';
const ANCHOR_ID = 'cac-bai-blog-ve-ai';

/** Thứ tự đọc hợp lý: trụ → chính sách → chương trình → đồng hành → bằng chứng. */
const CUM = [
  [1344, 'Trường Việt Anh — AI Powered School đầu tiên của Việt Nam'],
  [1411, 'Quyết định 2422: con bạn học 12 tiết AI mỗi năm'],
  [1415, 'So sánh 3 khung giáo dục AI: Bộ GDĐT, UNESCO và Việt Anh'],
  [1413, 'Khung AI Education Việt Anh: 30 tiết/năm, mỗi năm một sản phẩm'],
  [1356, 'Trường Việt Anh dùng AI như thế nào? 5 trụ cột và Human-in-the-Loop'],
  [1408, 'Dạy con dùng AI đúng cách: bài học từ nghiên cứu 26.000 học sinh'],
  [1412, 'Con dùng ChatGPT làm bài tập: khi nào được, khi nào không?'],
  [1409, 'AI làm hộ bài: 7 dấu hiệu con lệ thuộc AI và cách sửa'],
  [1399, 'Cho con dùng AI sai cách: điểm thi có thể giảm 20%'],
  [1410, 'Trường học ứng dụng AI: 7 tiêu chí phụ huynh cần hỏi'],
  [1357, 'Hai học sinh chưa từng lập trình, một tuần, một sản phẩm AI vào bán kết'],
  [1345, 'Làm thế nào để có những "Steve Jobs Việt Nam"? Nuôi dạy con sáng tạo thời AI'],
];

async function req(method, endpoint, body) {
  const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
    method, headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

const ids = CUM.map(c => c[0]);
const rows = (await req('GET', `/items/posts?filter[id][_in]=${ids.join(',')}&fields=id,slug,status,content&limit=30`)).data;
const bySlug = new Map(rows.map(r => [r.id, r.slug]));
const thieu = ids.filter(i => !bySlug.has(i));
if (thieu.length) { console.error('Không tìm thấy bài:', thieu.join(', ')); process.exit(1); }
const chuaLive = rows.filter(r => r.status !== 'published').map(r => r.id);
if (chuaLive.length) console.log(`  ! CẢNH BÁO: bài chưa published sẽ thành link chết: ${chuaLive.join(', ')}\n`);

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function dungKhoi(selfId) {
  const li = CUM.filter(([id]) => id !== selfId)
    .map(([id, text]) => `  <li><a href="/blog/${bySlug.get(id)}/">${esc(text)}</a></li>`)
    .join('\n');
  return `<h2 id="${ANCHOR_ID}">${TIEU_DE}</h2>\n<ul>\n${li}\n</ul>\n\n`;
}

/** Gỡ khối cũ (bản mới hoặc bản "Đọc tiếp theo chủ đề") để dựng lại, tránh nhân đôi. */
function goKhoiCu(html) {
  return html
    .replace(new RegExp(`<h2 id="${ANCHOR_ID}">[\\s\\S]*?<\\/ul>\\s*`, 'i'), '')
    .replace(/<h2 id="doc-tiep">[\s\S]*?<\/ul>\s*/i, '');
}

/**
 * Chèn trước TOÀN BỘ phần đuôi bài. Bài trong cụm có 4 kiểu đuôi khác nhau, nên lấy
 * mốc nào xuất hiện SỚM NHẤT trong văn bản — như vậy khối link luôn nằm trên hộp tác giả,
 * dòng nguồn và dòng nhãn ảnh AI, không lọt xuống dưới cùng.
 */
function chen(html, khoi) {
  const mocs = [
    [/<h2[^>]*>\s*Về tác giả\s*<\/h2>/i, 'truoc h2 Ve tac gia'],
    [/<div class="author-box">/i, 'truoc author-box'],
    [/<p><em>\s*Hình ảnh minh họa trong bài được tạo bằng AI/i, 'truoc dong nhan anh AI'],
    [/<p><em>\s*(?:Tác giả|<strong>)/i, 'truoc dong tac gia'],
  ];
  let best = null;
  for (const [re, ten] of mocs) {
    const m = re.exec(html);
    if (m && (best === null || m.index < best.i)) best = { i: m.index, cho: ten };
  }
  if (best) return { html: html.slice(0, best.i) + khoi + html.slice(best.i), cho: best.cho };
  return { html: html.trimEnd() + '\n\n' + khoi.trimEnd() + '\n', cho: 'cuoi bai (khong tim thay duoi bai)' };
}

const canGhi = new Map();
for (const r of rows) {
  const sach = goKhoiCu(r.content);
  const khoi = dungKhoi(r.id);
  const { html, cho } = chen(sach, khoi);
  const soLink = (khoi.match(/<li>/g) || []).length;
  const daCo = r.content.includes(`id="${ANCHOR_ID}"`) || r.content.includes('id="doc-tiep"');
  if (html === r.content) { console.log(`  = ${r.id}  khong doi`); continue; }
  canGhi.set(r.id, html);
  console.log(`  + ${r.id}  ${soLink} link  | ${cho}${daCo ? '  (thay khoi cu)' : ''}  | ${r.slug.slice(0, 40)}`);
}

console.log('');
if (!canGhi.size) { console.log('Khong co gi de sua.'); process.exit(0); }
if (!APPLY) { console.log(`CHAY THU — ${canGhi.size} bai se doi. Them --apply de ghi that.`); process.exit(0); }
for (const [id, content] of canGhi) {
  await req('PATCH', `/items/posts/${id}`, { content });
  console.log(`  da ghi ${id}`);
}
console.log(`\nXong ${canGhi.size} bai. Nho commit + push de build lai.`);
