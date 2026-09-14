// So sánh trước/sau: production (baseline) vs bản dựng local đã sửa.
import fs from 'node:fs';

const BODY_TAGS = new Set(['P','LI','BLOCKQUOTE','FIGCAPTION','TD','DD','DT','TH','SUMMARY']);
const HEAD_TAGS = new Set(['H1','H2','H3','H4','H5','H6']);
function sev(f){
  if (BODY_TAGS.has(f.tag) && f.lines >= 3) return 'nang';
  if (BODY_TAGS.has(f.tag) && f.lines === 2 && f.wordCount >= 8) return 'nang';
  if (HEAD_TAGS.has(f.tag)) return 'vua';
  if (BODY_TAGS.has(f.tag)) return 'vua';
  return 'nhe';
}
const pathOf = u => { try { return new URL(u).pathname; } catch { return u; } };

function load(file){
  const m = new Map();
  if (file.endsWith('.json')){                       // baseline đã tổng hợp sẵn
    const d = JSON.parse(fs.readFileSync(file,'utf8'));
    for (const p of d.pages){
      const per = { desktop:0, tablet:0, mobile:0 }, sevc = { nang:0, vua:0, nhe:0 };
      const items = [];
      for (const f of p.findings){
        const s = sev({ tag:f.tag, lines:f.lines, wordCount:f.words });
        per[f.vp]++; sevc[s]++;
        items.push({ ...f, wordCount:f.words, sev:s });
      }
      m.set(pathOf(p.url), { per, tong:p.findings.length, sevc, items });
    }
    return m;
  }
  for (const line of fs.readFileSync(file,'utf8').trim().split(/\r?\n/)){
    if (!line) continue;
    const r = JSON.parse(line);
    if (!r.ok) continue;
    const per = {}, sevc = { nang:0, vua:0, nhe:0 };
    let tong = 0;
    const items = [];
    for (const vp of ['desktop','tablet','mobile']){
      const f = r.findings[vp] || [];
      per[vp] = f.length; tong += f.length;
      for (const x of f){ sevc[sev(x)]++; items.push({ ...x, vp, sev: sev(x) }); }
    }
    m.set(pathOf(r.url), { per, tong, sevc, items });
  }
  return m;
}

const A = load(process.argv[2]);  // trước
const B = load(process.argv[3]);  // sau

const keys = [...A.keys()].filter(k => B.has(k));
const sum = (m, ks, f) => ks.reduce((s,k)=> s + f(m.get(k)), 0);
const pagesWith = (m, ks, f) => ks.filter(k => f(m.get(k))).length;

const before = { tong: sum(A,keys,x=>x.tong), nang: sum(A,keys,x=>x.sevc.nang), tr: pagesWith(A,keys,x=>x.tong>0), trN: pagesWith(A,keys,x=>x.sevc.nang>0) };
const after  = { tong: sum(B,keys,x=>x.tong), nang: sum(B,keys,x=>x.sevc.nang), tr: pagesWith(B,keys,x=>x.tong>0), trN: pagesWith(B,keys,x=>x.sevc.nang>0) };
const pct = (a,b) => a ? ('−' + Math.round((1-b/a)*100) + '%') : '—';

console.log('So sánh trên', keys.length, 'trang khớp nhau\n');
console.log('                         TRƯỚC      SAU     THAY ĐỔI');
console.log('Trang dính lỗi        ', String(before.tr).padStart(6), String(after.tr).padStart(8), pct(before.tr, after.tr).padStart(10));
console.log('Trang có lỗi NẶNG     ', String(before.trN).padStart(6), String(after.trN).padStart(8), pct(before.trN, after.trN).padStart(10));
console.log('Tổng chỗ mồ côi       ', String(before.tong).padStart(6), String(after.tong).padStart(8), pct(before.tong, after.tong).padStart(10));
console.log('Chỗ mồ côi NẶNG       ', String(before.nang).padStart(6), String(after.nang).padStart(8), pct(before.nang, after.nang).padStart(10));

console.log('\nTheo khổ màn hình:');
for (const vp of ['desktop','tablet','mobile']){
  const b1 = sum(A,keys,x=>x.per[vp]), a1 = sum(B,keys,x=>x.per[vp]);
  const bp = pagesWith(A,keys,x=>x.per[vp]>0), ap = pagesWith(B,keys,x=>x.per[vp]>0);
  console.log(`  ${vp.padEnd(8)} chỗ ${String(b1).padStart(5)} → ${String(a1).padStart(5)} (${pct(b1,a1)}) · trang ${String(bp).padStart(3)} → ${String(ap).padStart(3)} (${pct(bp,ap)})`);
}

// còn sót gì
const con = [];
for (const k of keys) for (const it of B.get(k).items) con.push({ ...it, slug:k });
const conN = con.filter(x => x.sev === 'nang');
console.log('\nCòn sót:', con.length, 'chỗ (' + conN.length + ' nặng)');
const byTag = {}; conN.forEach(x => byTag[x.tag] = (byTag[x.tag]||0)+1);
console.log('  nặng theo thẻ:', Object.entries(byTag).sort((a,b)=>b[1]-a[1]).map(x=>x[0]+':'+x[1]).join('  '));
const byVp = {}; conN.forEach(x => byVp[x.vp] = (byVp[x.vp]||0)+1);
console.log('  nặng theo khổ:', JSON.stringify(byVp));
const allTag = {}; con.forEach(x => allTag[x.tag] = (allTag[x.tag]||0)+1);
console.log('  tất cả theo thẻ:', Object.entries(allTag).sort((a,b)=>b[1]-a[1]).slice(0,10).map(x=>x[0]+':'+x[1]).join('  '));

// lặp nhiều trang
const rep = new Map();
for (const x of con){
  const key = x.tag + '||' + (x.text||'').replace(/\s+/g,' ').trim().toLowerCase().slice(0,110);
  if (!rep.has(key)) rep.set(key, { tag:x.tag, text:x.text, sev:x.sev, region:x.region, orphan:x.orphan, pages:new Set(), vps:new Set() });
  rep.get(key).pages.add(x.slug); rep.get(key).vps.add(x.vp);
}
const top = [...rep.values()].map(r=>({...r, n:r.pages.size, vps:[...r.vps]})).sort((a,b)=>b.n-a.n);
console.log('\n-- 18 mẫu còn sót lặp nhiều trang nhất --');
top.slice(0,18).forEach(r => console.log(`  ${String(r.n).padStart(3)} trang [${r.sev}] ${r.tag} ${r.region} @${r.vps.join(',')} mồ côi "${r.orphan}"\n        ${JSON.stringify((r.text||'').slice(0,105))}`));

// trang tệ nhất còn lại
const byPage = {};
conN.forEach(x => byPage[x.slug] = (byPage[x.slug]||0)+1);
console.log('\n-- 12 trang còn nhiều lỗi nặng nhất --');
Object.entries(byPage).sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(([s,n]) => console.log(`  ${String(n).padStart(3)}  ${s}`));

// trang tệ đi
const worse = keys.filter(k => B.get(k).sevc.nang > A.get(k).sevc.nang);
console.log('\nTrang XẤU ĐI (nặng tăng):', worse.length);
worse.slice(0,10).forEach(k => console.log(`  ${A.get(k).sevc.nang} → ${B.get(k).sevc.nang}  ${k}`));
