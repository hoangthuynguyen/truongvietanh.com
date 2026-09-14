// Kiểm bao phủ: trang nào trong dist/ CHƯA có quy tắc chống mồ côi chữ
// (xét cả style nội trang lẫn các file .css mà trang đó nạp).
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'dist';
const cacheCss = new Map();
function cssCo(p) {
  if (!cacheCss.has(p)) {
    let ok = false;
    try { ok = /text-wrap\s*:\s*pretty/.test(fs.readFileSync(path.join(ROOT, p), 'utf8')); } catch { ok = false; }
    cacheCss.set(p, ok);
  }
  return cacheCss.get(p);
}

function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const thieu = [];
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  if (/http-equiv="refresh"/i.test(h) || h.length < 2000) continue;  // trang chuyển hướng, không có nội dung
  if (/text-wrap\s*:\s*pretty/.test(h)) continue;            // có ngay trong trang
  const links = [...h.matchAll(/href="(\/[^"]+\.css)"/g)].map(m => m[1]);
  if (links.some(cssCo)) continue;                            // có trong css trang nạp
  thieu.push(f.replace(/\\/g, '/').replace('dist', '').replace('/index.html', '/') || '/');
}
console.log('Tổng trang HTML trong dist:', files.length);
console.log('Trang CHƯA có quy tắc chống mồ côi:', thieu.length);
thieu.slice(0, 40).forEach(x => console.log('  ', x));
if (thieu.length > 40) console.log('   … và', thieu.length - 40, 'trang nữa');
