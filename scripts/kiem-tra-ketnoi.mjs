#!/usr/bin/env node
// =====================================================================
// Tự kiểm trang /ketnoi + sinh danh sách 35 URL để làm QR.
//
//   node scripts/kiem-tra-ketnoi.mjs          → chỉ kiểm, in kết quả
//   node scripts/kiem-tra-ketnoi.mjs --ghi    → kiểm + ghi lại docs/ketnoi/35-url-lop.csv
//
// Kiểm những thứ sai là hỏng cả chiến dịch QR:
//   1. Đúng 35 mã lớp, không trùng, không thừa/thiếu so với brief.
//   2. Cả 8 nhóm Zalo đều có ít nhất 1 lớp trỏ vào (không nhóm nào mồ côi).
//   3. Nhóm nào còn thiếu URL Zalo thật → cảnh báo (nút sẽ tạm về OA chung).
//   4. src/pages/ketnoi.astro có đọc ?lop= và có gắn tracking 3 CTA.
// =====================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GHI = process.argv.includes('--ghi');

// Đọc thẳng file .ts bằng regex thay vì import — script chạy bằng node trần,
// không có bước biên dịch TypeScript.
const src = fs.readFileSync(path.join(ROOT, 'src/data/ketnoi-lop.ts'), 'utf8');

const nhomIds = [...src.matchAll(/^\s{2}'([a-z0-9-]+)':\s*\{$/gm)].map((m) => m[1]);
const nhomMa = [...src.matchAll(/^\s{4}ma:\s*'([^']*)',$/gm)].map((m) => m[1]);
const nhomTen = [...src.matchAll(/^\s{4}ten:\s*'([^']*)',$/gm)].map((m) => m[1]);
const nhomZalo = [...src.matchAll(/^\s{4}zalo:\s*'([^']*)',$/gm)].map((m) => m[1]);
const nhom = nhomIds.map((id, i) => ({ id, ma: nhomMa[i], ten: nhomTen[i], zalo: nhomZalo[i] }));

const capLop = [...src.matchAll(/^\s{2}'([0-9A-Z]+)':\s*'([a-z0-9-]+)',$/gm)].map((m) => ({
  lop: m[1],
  nhom: m[2],
}));

const loi = [];
const canh = [];

// --- 1. Đúng 35 lớp, không trùng --------------------------------------
if (capLop.length !== 35) loi.push(`Có ${capLop.length} lớp, brief yêu cầu đúng 35.`);
const dem = new Map();
for (const { lop } of capLop) dem.set(lop, (dem.get(lop) || 0) + 1);
for (const [lop, n] of dem) if (n > 1) loi.push(`Mã lớp "${lop}" khai ${n} lần.`);

// Đối chiếu cứng với danh sách trong brief — đổi mã lớp phải sửa cả hai chỗ.
const BRIEF = [
  '1OIC','2OIC','3OIC','4OIC','5A',
  '1BT','2BT','3BT','4BT','5BT',
  '6A2','6B2','7A2','7B2',
  '8A2','8B2','8C2','9A2','9B2',
  '6BT','7BT','8BT','9BT',
  '10A2','10B2','10C2','11A2',
  '12A2','12B2','12C2','12D2',
  '10BT','11BT','12TN','12XH',
];
const co = new Set(capLop.map((x) => x.lop));
for (const b of BRIEF) if (!co.has(b)) loi.push(`Thiếu lớp "${b}" (có trong brief).`);
for (const c of co) if (!BRIEF.includes(c)) loi.push(`Thừa lớp "${c}" (không có trong brief).`);

// --- 2. Nhóm nào cũng phải có lớp trỏ vào ------------------------------
if (nhom.length !== 8) loi.push(`Có ${nhom.length} nhóm Zalo, brief yêu cầu đúng 8.`);
for (const g of nhom) {
  const soLop = capLop.filter((x) => x.nhom === g.id).length;
  if (soLop === 0) loi.push(`Nhóm "${g.id}" (${g.ma}) không có lớp nào trỏ vào.`);
}
for (const { lop, nhom: n } of capLop) {
  if (!nhomIds.includes(n)) loi.push(`Lớp "${lop}" trỏ vào nhóm "${n}" không tồn tại.`);
}

// --- 3. URL Zalo thật đã có chưa --------------------------------------
const thieuZalo = nhom.filter((g) => !g.zalo);
if (thieuZalo.length) {
  canh.push(
    `${thieuZalo.length}/8 nhóm CHƯA có URL Zalo thật (nút tạm trỏ về OA chung): ` +
      thieuZalo.map((g) => g.ma).join(', '),
  );
}

// --- 4. Trang có đọc ?lop= và có tracking ------------------------------
const page = fs.readFileSync(path.join(ROOT, 'src/pages/ketnoi.astro'), 'utf8');
if (!page.includes("get('lop')")) loi.push('src/pages/ketnoi.astro không đọc tham số ?lop=.');
for (const ev of ['facebook_click', 'youtube_click', 'zalo_click']) {
  if (!page.includes(ev)) loi.push(`Thiếu sự kiện tracking "${ev}" trong ketnoi.astro.`);
}
if (!page.includes('Không tìm thấy thông tin lớp')) {
  loi.push('Thiếu thông báo khi mã lớp không hợp lệ.');
}

// --- Sinh danh sách URL ------------------------------------------------
const BASE = 'https://truongvietanh.com';
const hang = capLop.map(({ lop, nhom: id }) => {
  const g = nhom.find((x) => x.id === id);
  return {
    lop,
    // Dau / truoc ? la co y: /ketnoi?lop= bi Cloudflare tra 307 sang /ketnoi/?lop=
    // (query van giu nguyen). Dung san dang co dau / de moi lan quet QR bot 1 vong.
    url: `${BASE}/ketnoi/?lop=${encodeURIComponent(lop)}`,
    nhomMa: g?.ma ?? '',
    nhomTen: g?.ten ?? '',
    zalo: g?.zalo || '(chưa có — tạm dùng OA chung)',
  };
});

if (GHI) {
  const outDir = path.join(ROOT, 'docs/ketnoi');
  fs.mkdirSync(outDir, { recursive: true });
  const csv = [
    'ma_lop,url_qr,nhom_zalo,ten_nhom,link_zalo',
    ...hang.map((r) => `${r.lop},"${r.url}",${r.nhomMa},"${r.nhomTen}","${r.zalo}"`),
  ].join('\n');
  fs.writeFileSync(path.join(outDir, '35-url-lop.csv'), '﻿' + csv, 'utf8');
  console.log('Đã ghi docs/ketnoi/35-url-lop.csv');
}

// --- Báo cáo -----------------------------------------------------------
console.log(`\nLớp: ${capLop.length}/35 · Nhóm Zalo: ${nhom.length}/8`);
for (const g of nhom) {
  const ds = capLop.filter((x) => x.nhom === g.id).map((x) => x.lop);
  console.log(
    `  ${g.zalo ? '✓' : '·'} ${g.ma.padEnd(16)} ${String(ds.length).padStart(2)} lớp  ${ds.join(', ')}`,
  );
}
for (const c of canh) console.log(`\nCẢNH BÁO: ${c}`);
if (loi.length) {
  console.error('\nLỖI:');
  for (const l of loi) console.error('  ✗ ' + l);
  process.exit(1);
}
console.log('\nTất cả kiểm tra bắt buộc đều đạt.');
