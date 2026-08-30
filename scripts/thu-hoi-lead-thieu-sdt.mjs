#!/usr/bin/env node
/**
 * Thu hồi lead bị mất vì lỗi "Enter ở bước 1" (đã sửa 30/08/2026, commit 54a0e90).
 *
 * BỐI CẢNH — vì sao có lead mất:
 * Form 2 bước dùng chung có ô email ở bước 1 nằm chung <form> với nút submit của bước 2.
 * Khách gõ email rồi nhấn Enter (rất phổ biến trên điện thoại: nút "Đi"/"Go") là trình
 * duyệt submit luôn. Hệ thống gửi đi với phone rỗng → worker BỎ QUA Pancake
 * (staging-worker.js, `if (!data.phone)` → reason no_phone) → sales không bao giờ thấy.
 * Nhưng GHL thì VẪN nhận, vì GHL không bắt buộc SĐT.
 *
 * → Các lead đó nằm nguyên trong GHL: có email, KHÔNG có SĐT, `source` dạng
 *   "Website - <funnel_code>". Script này lọc ra và xuất CSV để đội sales liên hệ lại
 *   qua email, hoặc để import thủ công sang Pancake.
 *
 * CÁCH CHẠY (key không được commit vào repo, cũng đừng dán vào chat):
 *
 *   GHL_API_KEY=<private-integration-token> node scripts/thu-hoi-lead-thieu-sdt.mjs
 *
 * Tuỳ chọn:
 *   --tu=2026-06-01     chỉ lấy lead tạo từ ngày này (mặc định: 90 ngày trước)
 *   --den=2026-08-30    đến ngày này (mặc định: hôm nay)
 *   --funnel=mn-govap   chỉ lấy funnel bắt đầu bằng chuỗi này (vd chỉ nhóm ads mầm non)
 *   --out=duong/dan.csv nơi ghi file (mặc định: reports/lead-thieu-sdt.csv)
 *
 * Script CHỈ ĐỌC — không sửa, không xoá gì trong GHL.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const GHL_LOCATION_ID = 'Mo8F9woTvjBHFakzawxY';   // trùng với src/staging-worker.js
const API = 'https://services.leadconnectorhq.com';
const VERSION = '2021-07-28';

const KEY = process.env.GHL_API_KEY;
if (!KEY) {
  console.error('Thiếu GHL_API_KEY. Chạy lại kiểu:');
  console.error('  GHL_API_KEY=<token> node scripts/thu-hoi-lead-thieu-sdt.mjs');
  process.exit(1);
}

const arg = (ten, macDinh) => {
  const hit = process.argv.find((a) => a.startsWith(`--${ten}=`));
  return hit ? hit.slice(ten.length + 3) : macDinh;
};

const ngay = (d) => d.toISOString().slice(0, 10);
const homNay = new Date();
const truoc90 = new Date(homNay.getTime() - 90 * 86400_000);

const TU = arg('tu', ngay(truoc90));
const DEN = arg('den', ngay(homNay));
const FUNNEL = arg('funnel', '');
const OUT = arg('out', 'reports/lead-thieu-sdt.csv');

const tuMs = Date.parse(TU + 'T00:00:00Z');
const denMs = Date.parse(DEN + 'T23:59:59Z');

console.log(`Quét GHL location ${GHL_LOCATION_ID}`);
console.log(`Khoảng ngày: ${TU} → ${DEN}${FUNNEL ? ` · funnel bắt đầu bằng "${FUNNEL}"` : ''}`);

/** Gọi API contacts/search, phân trang bằng con trỏ searchAfter. */
async function* quetContacts() {
  let searchAfter = null;
  let trang = 0;

  while (true) {
    const body = {
      locationId: GHL_LOCATION_ID,
      pageLimit: 100,
      sort: [{ field: 'dateAdded', direction: 'desc' }],
    };
    if (searchAfter) body.searchAfter = searchAfter;

    const res = await fetch(`${API}/contacts/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KEY}`,
        Version: VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error(`\nGHL trả lỗi ${res.status}:`);
      console.error(text.slice(0, 600));
      if (res.status === 401) console.error('\n→ Token sai hoặc thiếu scope contacts.readonly.');
      process.exit(1);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('\nGHL trả về thứ không phải JSON — dán đoạn dưới cho Claude xem:');
      console.error(text.slice(0, 600));
      process.exit(1);
    }

    const lo = data.contacts || data.data || [];
    if (!Array.isArray(lo)) {
      console.error('\nKhông tìm thấy mảng contacts trong response. Cấu trúc nhận được:');
      console.error(JSON.stringify(Object.keys(data)));
      process.exit(1);
    }
    if (lo.length === 0) return;

    trang++;
    process.stdout.write(`\r  đã quét ${trang} trang…`);
    for (const c of lo) yield c;

    const cuoi = lo[lo.length - 1];
    searchAfter = cuoi.searchAfter;
    if (!searchAfter) return;          // API hết trang
  }
}

const coSdt = (c) => {
  const p = String(c.phone ?? '').replace(/\D/g, '');
  return p.length >= 8;               // 8 số trở lên mới coi là SĐT thật
};

const ketQua = [];
let tong = 0;
let ngoaiKhoang = 0;

for await (const c of quetContacts()) {
  tong++;

  const src = String(c.source ?? '');
  if (!src.startsWith('Website - ')) continue;      // chỉ lead từ form trên site

  const funnel = src.slice('Website - '.length);
  if (FUNNEL && !funnel.startsWith(FUNNEL)) continue;

  if (coSdt(c)) continue;                            // có SĐT → đã vào Pancake, bỏ qua
  if (!c.email) continue;                            // không email luôn thì không liên hệ được

  const themLuc = Date.parse(c.dateAdded ?? c.createdAt ?? '');
  if (Number.isFinite(themLuc) && (themLuc < tuMs || themLuc > denMs)) {
    ngoaiKhoang++;
    continue;
  }

  ketQua.push({
    ngay_tao: (c.dateAdded ?? c.createdAt ?? '').slice(0, 19).replace('T', ' '),
    ho_ten: c.contactName ?? c.name ?? [c.firstName, c.lastName].filter(Boolean).join(' '),
    email: c.email,
    funnel_code: funnel,
    tags: Array.isArray(c.tags) ? c.tags.join(' | ') : '',
    ghl_contact_id: c.id,
  });
}

process.stdout.write('\r');

// CSV: BOM + CRLF để Excel tiếng Việt mở không vỡ dấu
const cot = ['ngay_tao', 'ho_ten', 'email', 'funnel_code', 'tags', 'ghl_contact_id'];
const oCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const csv = '﻿' + [cot.join(','), ...ketQua.map((r) => cot.map((k) => oCsv(r[k])).join(','))].join('\r\n');

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, csv, 'utf8');

// Thống kê theo funnel để biết trang nào mất nhiều nhất
const theoFunnel = {};
for (const r of ketQua) theoFunnel[r.funnel_code] = (theoFunnel[r.funnel_code] ?? 0) + 1;

console.log(`\nĐã quét ${tong} contact trong GHL.`);
if (ngoaiKhoang) console.log(`Bỏ qua ${ngoaiKhoang} contact nằm ngoài khoảng ngày.`);
console.log(`\nTÌM THẤY ${ketQua.length} lead có email nhưng KHÔNG có SĐT (chưa từng vào Pancake):\n`);

for (const [f, n] of Object.entries(theoFunnel).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${f}`);
}

console.log(`\n→ Đã ghi: ${OUT}`);
if (ketQua.length === 0) {
  console.log('\nKhông có lead nào khớp. Thử nới khoảng ngày bằng --tu=2026-01-01.');
}
