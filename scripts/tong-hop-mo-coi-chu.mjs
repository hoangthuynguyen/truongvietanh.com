// Tổng hợp kết quả quét mồ côi chữ -> báo cáo + CSV + JSON cho trang xem
import fs from 'node:fs';
import path from 'node:path';

const IN = process.argv[2] || '.tmp-orphan/ket-qua.jsonl';
const recs = fs.readFileSync(IN, 'utf8').trim().split(/\r?\n/).filter(Boolean).map(l => JSON.parse(l));

const VPS = ['desktop', 'tablet', 'mobile'];
const BODY_TAGS = new Set(['P', 'LI', 'BLOCKQUOTE', 'FIGCAPTION', 'TD', 'DD', 'DT', 'TH', 'SUMMARY']);
const HEAD_TAGS = new Set(['H1', 'H2', 'H3', 'H4', 'H5', 'H6']);

const slug = u => { try { const p = new URL(u).pathname; return p === '/' ? '/' : p; } catch { return u; } };
const group = u => {
  const s = slug(u);
  if (s === '/') return 'Trang chủ';
  if (s.startsWith('/blog/')) return 'Blog';
  if (s.startsWith('/am-nhac/')) return 'Âm nhạc';
  if (s.startsWith('/mam-non-go-vap/')) return 'LP mầm non Gò Vấp';
  if (s.includes('trai-he')) return 'Trại hè';
  if (s.startsWith('/ketnoi')) return 'Kết nối / QR';
  if (s.startsWith('/hinh-anh')) return 'Hình ảnh';
  return 'Trang tĩnh / landing';
};

function sev(f) {
  if (BODY_TAGS.has(f.tag) && f.lines >= 3) return 'nang';
  if (BODY_TAGS.has(f.tag) && f.lines === 2 && f.wordCount >= 8) return 'nang';
  if (HEAD_TAGS.has(f.tag)) return 'vua';
  if (BODY_TAGS.has(f.tag)) return 'vua';
  return 'nhe';
}

const errored = recs.filter(r => !r.ok);
const okRecs = recs.filter(r => r.ok);

const pages = okRecs.map(r => {
  const per = {}, perNang = {};
  let all = [];
  for (const vp of VPS) {
    const f = (r.findings[vp] || []).map(x => ({ ...x, vp }));
    per[vp] = f.length;
    perNang[vp] = f.filter(x => sev(x) === 'nang').length;
    all = all.concat(f);
  }
  const bySev = { nang: 0, vua: 0, nhe: 0 };
  for (const f of all) bySev[sev(f)]++;
  return { url: r.url, slug: slug(r.url), group: group(r.url), per, perNang, total: all.length, bySev, findings: all };
});

const withAny = pages.filter(p => p.total > 0);
const withNang = pages.filter(p => p.bySev.nang > 0);
const withNangVua = pages.filter(p => p.bySev.nang + p.bySev.vua > 0);
const sach = pages.filter(p => p.total === 0);

console.log('=== TỔNG QUAN ===');
console.log('Trang quét được   :', okRecs.length, '| lỗi tải:', errored.length);
for (const vp of VPS) {
  const n = pages.filter(p => p.per[vp] > 0).length;
  const nn = pages.filter(p => p.perNang[vp] > 0).length;
  const c = pages.reduce((s, p) => s + p.per[vp], 0);
  console.log(`  ${vp.padEnd(8)} : ${String(n).padStart(3)} trang dính (${nn} trang có lỗi NẶNG) · ${c} chỗ`);
}
console.log('Trang dính ở ÍT NHẤT 1 khổ:', withAny.length, `(${(withAny.length / okRecs.length * 100).toFixed(1)}%) · sạch cả 3 khổ: ${sach.length}`);
console.log('  - có lỗi NẶNG (đoạn văn)         :', withNang.length, `(${(withNang.length / okRecs.length * 100).toFixed(1)}%)`);
console.log('  - có lỗi nặng hoặc vừa           :', withNangVua.length);
const sevTotal = { nang: 0, vua: 0, nhe: 0 };
pages.forEach(p => Object.keys(sevTotal).forEach(k => sevTotal[k] += p.bySev[k]));
console.log('Tổng số chỗ mồ côi:', pages.reduce((s, p) => s + p.total, 0), '| theo mức:', JSON.stringify(sevTotal));

console.log('\n=== THEO NHÓM TRANG ===');
const byGroup = {};
for (const p of pages) {
  byGroup[p.group] = byGroup[p.group] || { tong: 0, dinh: 0, nangTrang: 0, cho: 0, nang: 0 };
  const g = byGroup[p.group];
  g.tong++; if (p.total > 0) g.dinh++; if (p.bySev.nang > 0) g.nangTrang++;
  g.cho += p.total; g.nang += p.bySev.nang;
}
for (const [g, v] of Object.entries(byGroup).sort((a, b) => b[1].cho - a[1].cho)) {
  console.log(`  ${g.padEnd(22)} ${String(v.dinh).padStart(3)}/${String(v.tong).padEnd(4)} dính · ${String(v.nangTrang).padStart(3)} có lỗi nặng · ${String(v.cho).padStart(4)} chỗ (${v.nang} nặng)`);
}

// gom các chỗ lặp lại nhiều trang (component dùng chung)
const norm = s => s.replace(/\s+/g, ' ').trim().toLowerCase();
const repeats = new Map();
for (const p of pages) {
  const seen = new Set();
  for (const f of p.findings) {
    const key = f.tag + '||' + norm(f.text).slice(0, 120);
    const k2 = key + '||' + p.url;
    if (seen.has(k2)) continue;
    seen.add(k2);
    if (!repeats.has(key)) repeats.set(key, { tag: f.tag, text: f.text, region: f.region, sev: sev(f), pages: new Set(), vps: new Set(), orphans: new Set() });
    const r = repeats.get(key);
    r.pages.add(p.url); r.vps.add(f.vp); r.orphans.add(f.orphan);
  }
}
const repeatList = [...repeats.values()]
  .map(r => ({ tag: r.tag, text: r.text, region: r.region, sev: r.sev, nPages: r.pages.size, vps: [...r.vps], orphans: [...r.orphans], vd: [...r.pages].slice(0, 3).map(slug) }))
  .sort((a, b) => b.nPages - a.nPages);

const lapNhieu = repeatList.filter(r => r.nPages >= 3);
console.log(`\n=== CHỖ LẶP TỪ 3 TRANG TRỞ LÊN: ${lapNhieu.length} mẫu, phủ ${lapNhieu.reduce((s, r) => s + r.nPages, 0)} lượt trang ===`);
for (const r of repeatList.slice(0, 20)) {
  console.log(`  ${String(r.nPages).padStart(3)} trang | ${r.tag.padEnd(9)} ${r.region.padEnd(6)} [${r.sev}] mồ côi "${r.orphans.join('/')}" @${r.vps.join(',')}`);
  console.log(`        ${JSON.stringify(r.text.slice(0, 120))}`);
}

console.log('\n=== 25 TRANG NHIỀU LỖI NẶNG NHẤT ===');
for (const p of [...pages].sort((a, b) => (b.bySev.nang - a.bySev.nang) || (b.total - a.total)).slice(0, 25)) {
  console.log(`  nặng ${String(p.bySev.nang).padStart(3)} · tổng ${String(p.total).padStart(3)} | d${p.per.desktop}/t${p.per.tablet}/m${p.per.mobile} | ${p.slug}`);
}

if (errored.length) {
  console.log('\n=== TRANG KHÔNG TẢI ĐƯỢC ===');
  errored.forEach(r => console.log(' ', r.url, '-', (r.error || r.status)));
}

// ---- xuất dữ liệu ----
const outDir = process.env.REPORT_DIR || 'reports/mo-coi-chu-2026-09-13';
fs.mkdirSync(outDir, { recursive: true });

const payload = {
  quetLuc: new Date().toISOString(),
  tongTrang: okRecs.length,
  loiTai: errored.map(r => ({ url: r.url, error: r.error || ('HTTP ' + r.status) })),
  tongQuan: {
    dinhItNhat1: withAny.length, sach: sach.length,
    coNang: withNang.length, coNangVua: withNangVua.length,
    theoKho: Object.fromEntries(VPS.map(vp => [vp, {
      trang: pages.filter(p => p.per[vp] > 0).length,
      trangNang: pages.filter(p => p.perNang[vp] > 0).length,
      cho: pages.reduce((s, p) => s + p.per[vp], 0),
    }])),
    theoMuc: sevTotal,
    theoNhom: byGroup,
  },
  pages: pages.map(p => ({
    url: p.url, slug: p.slug, nhom: p.group, per: p.per, perNang: p.perNang, total: p.total, bySev: p.bySev,
    findings: p.findings.map(f => ({ vp: f.vp, tag: f.tag, region: f.region, lines: f.lines, words: f.wordCount, orphan: f.orphan, sev: sev(f), text: f.text.slice(0, 200) })),
  })),
  repeats: repeatList.slice(0, 80),
};
fs.writeFileSync(path.join(outDir, 'du-lieu.json'), JSON.stringify(payload));
fs.writeFileSync(path.join(outDir, 'du-lieu.js'), 'window.__MOCOI = ' + JSON.stringify(payload) + ';');

const rows = [['url', 'nhom', 'kho_man_hinh', 'muc_do', 'the', 'vung', 'so_dong', 'so_tu', 'tu_mo_coi', 'noi_dung']];
for (const p of pages) for (const f of p.findings) rows.push([p.slug, p.group, f.vp, sev(f), f.tag, f.region, f.lines, f.wordCount, f.orphan, f.text]);
fs.writeFileSync(path.join(outDir, 'chi-tiet.csv'), '﻿' + rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n'), 'utf8');
console.log('\nĐã ghi:', outDir, '| dòng CSV:', rows.length - 1, '| kích thước JSON:', (fs.statSync(path.join(outDir, 'du-lieu.json')).size / 1024).toFixed(0) + 'KB');
