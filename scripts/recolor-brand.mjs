// Đổi màu toàn site sang bộ màu logo gốc: Navy #26275D + Vàng #F9DD0E
// Ánh xạ giữ nguyên tương quan đậm/nhạt của các sắc độ phái sinh.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd());

// --- Bảng ánh xạ HEX (case-insensitive) ---
const HEX = {
  // Navy base + sắc độ
  '000080': '26275D', // base navy
  '00005c': '1D1E48', '00005a': '1D1E48',
  '000060': '1F2050', '000064': '1F2050', '000066': '1F2050',
  '00006a': '212255', '00006e': '212255',
  '00004d': '18193A', '00004a': '18193A', '000050': '18193A',
  '000046': '141530', '000040': '131428',
  '000033': '101024', '000032': '101024',
  '000088': '2A2B64', '000090': '2E2F6B',
  '00009a': '363876', '0000a0': '363876', '0000a8': '363876',
  '0000aa': '363876', '0000c8': '3A3C80', '0000cc': '3A3C80',
  // Vàng base + sắc độ
  'ffff00': 'F9DD0E', // base gold
  'cccc00': 'CBB30A', // darker gold
  'ffff33': 'FAE34A', 'ffff44': 'FAE34A',
  'ffff66': 'FBE874', 'ffffcc': 'FEF7C2',
  // KHÔNG đụng: ffffff (trắng), 000000 (đen)
};

// --- Bảng ánh xạ RGB (cho rgba/rgb, bỏ qua spacing & alpha) ---
const RGB = [
  [[0, 0, 128], [38, 39, 93]],
  [[0, 0, 154], [54, 56, 118]],
  [[0, 0, 77], [26, 27, 66]],
  [[0, 0, 70], [24, 25, 58]],
  [[0, 0, 50], [16, 16, 36]],
  [[255, 255, 0], [249, 221, 14]],
];

const EXTS = new Set(['.astro', '.css', '.ts', '.js', '.html', '.md']);
const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);
const TARGETS = ['src'];
const EXTRA_FILES = [
  'public/preview-giai-ma-hero.html',
  'public/preview-thu-cam-on.html',
];

function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), acc);
    } else if (EXTS.has(path.extname(e.name))) {
      acc.push(path.join(dir, e.name));
    }
  }
  return acc;
}

function recolor(text) {
  let n = 0;
  // HEX
  for (const [oldHex, newHex] of Object.entries(HEX)) {
    const re = new RegExp('#' + oldHex, 'gi');
    text = text.replace(re, (m) => {
      n++;
      // giữ kiểu chữ: nếu gốc viết hoa thì xuất hoa
      return '#' + (m.slice(1) === m.slice(1).toUpperCase() ? newHex.toUpperCase() : newHex.toLowerCase());
    });
  }
  // RGB / RGBA
  for (const [[r, g, b], [nr, ng, nb]] of RGB) {
    const re = new RegExp(
      `(rgba?\\(\\s*)${r}(\\s*,\\s*)${g}(\\s*,\\s*)${b}\\b`,
      'gi'
    );
    text = text.replace(re, (_m, p1, p2, p3) => {
      n++;
      return `${p1}${nr}${p2}${ng}${p3}${nb}`;
    });
  }
  return { text, n };
}

const files = [];
for (const t of TARGETS) walk(path.join(ROOT, t), files);
for (const f of EXTRA_FILES) {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) files.push(p);
}

let totalFiles = 0, totalRepl = 0;
for (const f of files) {
  const orig = fs.readFileSync(f, 'utf8');
  const { text, n } = recolor(orig);
  if (n > 0 && text !== orig) {
    fs.writeFileSync(f, text);
    totalFiles++;
    totalRepl += n;
  }
}
console.log(`Đổi màu xong: ${totalRepl} chỗ trong ${totalFiles} files.`);
