// One-off: chèn <script src="/js/phone-vn.js" defer> trước </body> cuối cùng
// của mọi layout + trang .astro có </body>. Idempotent.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src/layouts', 'src/pages'];
const TAG = '<script src="/js/phone-vn.js" defer></script>';

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (name.endsWith('.astro')) acc.push(p);
  }
  return acc;
}

const files = ROOTS.flatMap((r) => walk(r));
let injected = 0;
const done = [];
for (const f of files) {
  let s = readFileSync(f, 'utf8');
  if (s.includes('phone-vn.js')) continue;
  const idx = s.lastIndexOf('</body>');
  if (idx === -1) continue; // không có </body> → trang dùng layout, layout sẽ lo
  s = s.slice(0, idx) + '    ' + TAG + '\n  ' + s.slice(idx);
  writeFileSync(f, s, 'utf8');
  injected++;
  done.push(f.replace(/\\/g, '/'));
}
console.log(`Injected into ${injected} files.`);
for (const d of done) console.log('  · ' + d);
