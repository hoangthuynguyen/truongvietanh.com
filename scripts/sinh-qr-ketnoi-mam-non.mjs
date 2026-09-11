#!/usr/bin/env node
// =====================================================================
// Sinh mã QR cho trang /ketnoi-mam-non/ — 3 kênh + 1 mã CHUNG trỏ về trang.
//
//   npm i --no-save qrcode jimp jsqr      (cố ý không thêm vào package.json)
//   node scripts/sinh-qr-ketnoi-mam-non.mjs          # sinh + kiểm ngược
//   node scripts/sinh-qr-ketnoi-mam-non.mjs --kiem   # chỉ kiểm file đang có
//
// Nguồn link: src/data/ketnoi-mam-non.ts — import THẲNG (Node ≥ 22.6 tự bỏ
// type annotation), không chép URL vào đây để khỏi lệch hai nơi.
//
// Ra docs/ketnoi-mam-non/qr/: <id>.png 1200×1200 + <id>.svg để in giấy / dán bảng
// tin / chiếu màn hình, kèm CHUNG.png|svg (trỏ về chính trang) và in-qr.html
// (4 mã / tờ A4). Trang web KHÔNG hiện mã QR (Văn bỏ 11/09/2026) nên không ghi gì
// vào public/ nữa.
//
// Mức sửa lỗi Q (25%): quét được khi in mờ, dán lệch hoặc che một góc.
// Không nhúng logo giữa mã — logo che ô dữ liệu, in ra rồi mới biết quét
// chập chờn thì quá muộn.
// =====================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOC = path.join(ROOT, 'docs/ketnoi-mam-non/qr');
const CHI_KIEM = process.argv.includes('--kiem');

const { KENH, URL_TRANG } = await import('../src/data/ketnoi-mam-non.ts');

let QRCode;
try {
  QRCode = (await import('qrcode')).default;
} catch {
  console.error('Thiếu gói qrcode. Chạy:  npm i --no-save qrcode jimp jsqr');
  process.exit(1);
}

const MA = [
  ...KENH.map((k) => ({ id: k.id, url: k.url, nhan: `${k.ten} — ${k.phu}` })),
  { id: 'CHUNG', url: URL_TRANG, nhan: 'Trang Kết nối Mầm non (mã chung)' },
];
const chung = { errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#FFFFFF' } };

if (!CHI_KIEM) {
  fs.mkdirSync(DOC, { recursive: true });
  for (const m of MA) {
    const svg = await QRCode.toString(m.url, { ...chung, type: 'svg' });
    fs.writeFileSync(path.join(DOC, `${m.id}.svg`), svg);
    await QRCode.toFile(path.join(DOC, `${m.id}.png`), m.url, { ...chung, type: 'png', width: 1200 });
  }
}

// --- Kiểm ngược: giải mã PNG đã ghi, so với URL trong file data ----------
// Đây là chốt chặn chính: ai đổi URL trong ketnoi-mam-non.ts mà quên chạy lại
// script thì --kiem sẽ báo lệch.
let sai = 0;
try {
  const { Jimp } = await import('jimp');
  const jsQR = (await import('jsqr')).default;
  for (const m of MA) {
    const f = path.join(DOC, `${m.id}.png`);
    if (!fs.existsSync(f)) {
      sai++;
      console.error(`  ✗ ${m.id}: chưa có ${path.relative(ROOT, f)}`);
      continue;
    }
    const img = await Jimp.read(f);
    const res = jsQR(new Uint8ClampedArray(img.bitmap.data), img.bitmap.width, img.bitmap.height);
    const ok = res && res.data === m.url;
    if (!ok) sai++;
    console.log(`  ${ok ? '✓' : '✗'} ${m.id.padEnd(11)} ${res ? res.data : 'KHÔNG ĐỌC ĐƯỢC'}`);
  }
  console.log(sai ? `\n${sai} mã LỆCH — sinh lại bằng: node scripts/sinh-qr-ketnoi-mam-non.mjs` : `\nĐã kiểm ngược ${MA.length}/${MA.length} mã: khớp file data.`);
} catch (e) {
  console.log('(Bỏ qua bước giải mã kiểm chứng — thiếu jimp/jsqr. Cài: npm i --no-save jimp jsqr)', e.message);
}

// --- Bản in gộp: 4 mã / tờ A4, SVG nhúng thẳng nên mở là in ------------
if (!CHI_KIEM) {
  const the = MA.map((m) => {
    const svg = fs
      .readFileSync(path.join(DOC, `${m.id}.svg`), 'utf8')
      .replace(/<\?xml[^>]*\?>/, '')
      .replace('<svg', '<svg class="qr"');
    return `<figure class="the">
  <div class="ten">${m.nhan}</div>
  ${svg}
  <figcaption><span class="url">${m.url}</span></figcaption>
</figure>`;
  }).join('\n');
  fs.writeFileSync(
    path.join(DOC, 'in-qr.html'),
    `<!doctype html>
<html lang="vi"><head><meta charset="utf-8"><title>Mã QR — Kết nối phụ huynh Mầm non Việt Anh</title>
<style>
  @page { size: A4 portrait; margin: 10mm; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; margin: 0; color: #26275D; }
  .luoi { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0; }
  .the { break-inside: avoid; margin: 0; padding: 8mm 4mm; text-align: center; border: 1px dashed #b9c2d6; }
  .ten { font-size: 13pt; font-weight: 800; margin-bottom: 3mm; }
  .qr { width: 70mm; height: 70mm; display: block; margin: 0 auto; }
  figcaption { margin-top: 3mm; font-size: 8pt; color: #55597a; }
  .url { font-size: 7.5pt; color: #8a90ab; word-break: break-all; }
  h1 { font-size: 13pt; margin: 0 0 4mm; }
  .ghichu { font-size: 8.5pt; color: #55597a; margin: 0 0 5mm; }
  @media print { .ghichu, h1 { display: none; } }
</style></head><body>
<h1>Mã QR — Kết nối phụ huynh Mầm non Việt Anh</h1>
<p class="ghichu">4 mã trên một tờ A4. Cắt theo đường đứt. Quét thử bằng điện thoại trước khi in nhiều bản. Mã "chung" trỏ về trang web gom cả 3 kênh — dùng cho bảng tin, thư mời.</p>
<div class="luoi">
${the}
</div>
</body></html>`,
    'utf8',
  );
  console.log(`Đã ghi ${MA.length} mã QR vào docs/ketnoi-mam-non/qr/ (PNG, SVG, in-qr.html)`);
}
if (sai) process.exit(1);
