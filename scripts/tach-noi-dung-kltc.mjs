// Tách phần THÂN bài từ 8 file HTML trong thư mục Web_KLTC (bộ Kỷ luật tích cực)
// thành file HTML thuần để layout KyLuatTichCucLayout nạp bằng ?raw.
//
// Nguồn: C:\Users\Van\Desktop\Kỷ Luật Tích Cực\Web_KLTC\*.html
// Đích:  src/data/ky-luat-tich-cuc/<slug>.html
//
// Bỏ khỏi thân bài (layout tự dựng lại): breadcrumb, <h1>, dòng meta, đoạn lead,
// khối .toc (danh sách 8 bài), nút tải Word, thanh nav trước/sau.
// Sửa 4 lỗi nội dung đã rà ngày 20/09/2026 (xem chú thích tại từng bước).
//
// Chạy: node scripts/tach-noi-dung-kltc.mjs [thư-mục-nguồn]

import fs from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2] || 'C:/Users/Van/Desktop/Kỷ Luật Tích Cực/Web_KLTC';
const OUT = path.resolve('src/data/ky-luat-tich-cuc');
fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.html')).sort();
const summary = [];

for (const f of files) {
  const slug = f === 'index.html' ? 'index' : f.replace(/\.html$/, '');
  let html = fs.readFileSync(path.join(SRC, f), 'utf8');

  const m = html.match(/<article class="kltc">([\s\S]*?)<\/article>/);
  if (!m) throw new Error(`${f}: không thấy <article class="kltc">`);
  let body = m[1];

  // 1. Breadcrumb (p.meta đầu tiên) + h1 + dòng meta ban hành
  body = body.replace(/^\s*<p class="meta">[^<]*›[^<]*<\/p>\s*/, '');
  const h1 = (body.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1] || '';
  body = body.replace(/<h1>[\s\S]*?<\/h1>\s*/, '');
  const meta = (body.match(/^\s*<p class="meta">([\s\S]*?)<\/p>/) || [])[1] || '';
  body = body.replace(/^\s*<p class="meta">[\s\S]*?<\/p>\s*/, '');

  // 2. Đoạn lead (chỉ Bài 01 có) — đưa lên hero
  const lead = (body.match(/^\s*<p class="lead">([\s\S]*?)<\/p>/) || [])[1] || '';
  body = body.replace(/^\s*<p class="lead">[\s\S]*?<\/p>\s*/, '');

  // 3. Khối .toc — một dòng duy nhất
  body = body.replace(/^<div class="toc">.*<\/div>\s*$/m, '');

  // 4. Nút tải Word + nav trước/sau ở cuối
  body = body.replace(/<p><a class="dl"[^>]*>[^<]*<\/a><\/p>\s*/g, '');
  body = body.replace(/<div class="nav">[\s\S]*?<\/div>\s*$/, '');

  // 5. Sửa nội dung
  // 5a. Bài 01 Điều 9 gọi bước 4 là "Hướng dẫn"; mọi chỗ khác gọi "Chia sẻ".
  if (slug === 'index') body = body.replace(/4\. Hướng dẫn/g, '4. Chia sẻ');
  // 5b. Ngày ký để trống dù tiêu đề ghi 9/9/2026.
  body = body.replace(/ngày \.{3,} tháng 9 năm 2026/g, 'ngày 9 tháng 9 năm 2026');
  body = body.replace(
    /Decision No\. \.{3,}\/2026\/QĐ-MAJOR dated \.{3,} September 2026/g,
    'Decision No. 0909.CEO/2026/QĐ-MAJOR dated 9 September 2026',
  );
  // 5c. Bài 07 Phần 5: 4 dòng số điện thoại nội bộ để trống — bỏ khỏi bản web công khai.
  if (slug === '07-an-toan-va-bao-ve-hoc-sinh') {
    body = body.replace(/<tr>(?:(?!<\/tr>)[\s\S])*?…{3,}(?:(?!<\/tr>)[\s\S])*?<\/tr>\s*/g, '');
  }

  body = body.trim() + '\n';
  fs.writeFileSync(path.join(OUT, `${slug}.html`), body);
  summary.push({ slug, h1, meta, lead: lead.slice(0, 80), words: body.split(/\s+/).length });
}

console.table(summary);
