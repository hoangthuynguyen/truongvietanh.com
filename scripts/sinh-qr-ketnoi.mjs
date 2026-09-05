#!/usr/bin/env node
// =====================================================================
// Sinh 35 mã QR cho trang /ketnoi — mỗi lớp một mã.
//
//   npm i --no-save qrcode
//   node scripts/sinh-qr-ketnoi.mjs
//
// Ra thư mục docs/ketnoi/qr/:
//   · <MA_LOP>.png  — 1200×1200, nền trắng, viền trắng dày (in giấy, dán cửa lớp)
//   · <MA_LOP>.svg  — vector, phóng to bao nhiêu cũng nét (in khổ lớn, standee)
//
// Mức sửa lỗi Q (25%): QR vẫn quét được khi bị bẩn, nhoè hoặc che một góc —
// đáng đánh đổi vì mã dán ở cửa lớp cả năm học.
// Không nhúng logo vào giữa mã: logo che mất ô dữ liệu, mà lợi ích thẩm mỹ
// không bù lại rủi ro 35 tấm in ra rồi mới phát hiện lớp nào đó quét chập chờn.
// =====================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

let QRCode;
try {
  QRCode = (await import('qrcode')).default;
} catch {
  console.error('Thiếu gói qrcode. Chạy:  npm i --no-save qrcode');
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'docs/ketnoi/qr');

// Đọc danh sách lớp từ CSV do kiem-tra-ketnoi.mjs sinh ra — một nguồn duy nhất,
// khỏi cảnh QR trỏ một đằng còn trang khai một nẻo.
const csvPath = path.join(ROOT, 'docs/ketnoi/35-url-lop.csv');
if (!fs.existsSync(csvPath)) {
  console.error('Chưa có 35-url-lop.csv. Chạy trước:  node scripts/kiem-tra-ketnoi.mjs --ghi');
  process.exit(1);
}
const rows = fs
  .readFileSync(csvPath, 'utf8')
  .replace(/^﻿/, '')
  .trim()
  .split('\n')
  .slice(1)
  .map((line) => {
    const [lop, url] = line.split(',');
    return { lop, url: url.replace(/^"|"$/g, '') };
  });

fs.mkdirSync(OUT, { recursive: true });

const chung = { errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#FFFFFF' } };

for (const { lop, url } of rows) {
  await QRCode.toFile(path.join(OUT, `${lop}.png`), url, { ...chung, type: 'png', width: 1200 });
  fs.writeFileSync(path.join(OUT, `${lop}.svg`), await QRCode.toString(url, { ...chung, type: 'svg' }));
}

// Kiểm ngược: giải mã lại từng PNG vừa ghi để chắc mã trỏ đúng URL của lớp đó.
// In 35 tấm rồi mới biết dán nhầm lớp thì quá muộn.
let sai = 0;
try {
  const { Jimp } = await import('jimp');
  const jsQR = (await import('jsqr')).default;
  for (const { lop, url } of rows) {
    const img = await Jimp.read(path.join(OUT, `${lop}.png`));
    const res = jsQR(new Uint8ClampedArray(img.bitmap.data), img.bitmap.width, img.bitmap.height);
    if (!res || res.data !== url) {
      sai++;
      console.error(`  ✗ ${lop}: giải mã ra ${res ? res.data : 'KHÔNG ĐỌC ĐƯỢC'}`);
    }
  }
  console.log(`Đã kiểm ngược ${rows.length - sai}/${rows.length} mã bằng cách giải mã lại ảnh.`);
} catch {
  console.log('(Bỏ qua bước giải mã kiểm chứng — thiếu jimp/jsqr. Cài: npm i --no-save jimp jsqr)');
}

// --- Bản in gộp -------------------------------------------------------
// In 35 file PNG rời rất cực. Trang này xếp 6 mã / tờ A4, cắt theo đường đứt là
// dán được ngay lên cửa lớp. SVG nhúng thẳng vào HTML nên mở là in, không cần
// file ảnh đi kèm và in ra luôn nét.
const nhomTheoLop = Object.fromEntries(
  fs
    .readFileSync(csvPath, 'utf8')
    .replace(/^﻿/, '')
    .trim()
    .split('\n')
    .slice(1)
    .map((l) => {
      const c = l.split(',');
      return [c[0], (c[3] || '').replace(/^"|"$/g, '')];
    }),
);

const the = rows
  .map(({ lop, url }) => {
    const svg = fs
      .readFileSync(path.join(OUT, `${lop}.svg`), 'utf8')
      .replace(/<\?xml[^>]*\?>/, '')
      .replace('<svg', '<svg class="qr"');
    return `<figure class="the">
  <div class="lop">LỚP ${lop}</div>
  ${svg}
  <figcaption>${nhomTheoLop[lop] || ''}<br><span class="url">${url}</span></figcaption>
</figure>`;
  })
  .join('\n');

fs.writeFileSync(
  path.join(OUT, 'in-35-qr.html'),
  `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><title>35 mã QR — Kết nối phụ huynh theo lớp</title>
<style>
  @page { size: A4 portrait; margin: 10mm; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; margin: 0; color: #26275D; }
  .luoi { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
  .the { break-inside: avoid; margin: 0; padding: 6mm 4mm; text-align: center;
         border: 1px dashed #b9c2d6; }
  .lop { font-size: 15pt; font-weight: 800; letter-spacing: 1px; margin-bottom: 3mm; }
  .qr { width: 58mm; height: 58mm; display: block; margin: 0 auto; }
  figcaption { margin-top: 3mm; font-size: 8pt; color: #55597a; line-height: 1.4; }
  .url { font-size: 7pt; color: #8a90ab; word-break: break-all; }
  h1 { font-size: 13pt; margin: 0 0 4mm; }
  .ghichu { font-size: 8.5pt; color: #55597a; margin: 0 0 5mm; }
  @media print { .ghichu, h1 { display: none; } }
</style></head><body>
<h1>35 mã QR — Kết nối phụ huynh theo lớp</h1>
<p class="ghichu">6 mã mỗi tờ A4. Cắt theo đường đứt. Quét thử 1 mã bằng điện thoại trước khi in cả bộ.</p>
<div class="luoi">
${the}
</div>
</body></html>`,
  'utf8',
);

console.log(`\nĐã ghi ${rows.length} mã QR (PNG + SVG) vào docs/ketnoi/qr/`);
console.log('Bản in gộp 6 mã/tờ A4: docs/ketnoi/qr/in-35-qr.html');
if (sai) process.exit(1);
