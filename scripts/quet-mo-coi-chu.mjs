// Quét lỗi "mồ côi chữ" (orphan): dòng cuối của một khối văn bản chỉ còn 1 từ.
// Chạy trên site production bằng playwright-core (chrome đã cài sẵn).
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = process.env.OUT_DIR || path.join(process.cwd(), '.tmp-orphan');
const URLS_FILE = process.env.URLS_FILE || path.join(OUT_DIR, 'urls.txt');
const OUT_FILE = process.env.OUT_FILE || path.join(OUT_DIR, 'ket-qua.jsonl');
const CONCURRENCY = Number(process.env.CONCURRENCY || 5);
const LIMIT = Number(process.env.LIMIT || 0);

const VIEWPORTS = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet', w: 768, h: 1024 },
  { name: 'mobile', w: 375, h: 812 },
];

// ---- hàm chạy trong trình duyệt ------------------------------------------
function detectOrphansInPage() {
  const SKIP_TAGS = new Set([
    'SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION', 'SELECT', 'IFRAME',
    'SVG', 'PATH', 'CODE', 'PRE', 'TITLE', 'HEAD', 'META', 'LINK', 'INPUT', 'BR',
  ]);
  const INLINE_DISPLAYS = new Set(['inline', 'inline-block', 'inline-flex', 'contents', 'ruby', 'ruby-text']);

  const out = [];
  const all = document.body ? document.body.querySelectorAll('*') : [];

  for (const el of all) {
    if (SKIP_TAGS.has(el.tagName)) continue;

    // phải có text node trực tiếp có nội dung
    let hasOwnText = false;
    for (const n of el.childNodes) {
      if (n.nodeType === 3 && n.nodeValue && n.nodeValue.trim().length > 0) { hasOwnText = true; break; }
    }
    if (!hasOwnText) continue;

    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) continue;
    if (INLINE_DISPLAYS.has(cs.display)) continue; // chỉ lấy khối trong cùng

    // bỏ nếu có con là khối (đã/sẽ xét riêng ở con) — ta chỉ muốn khối trong cùng
    let hasBlockChild = false;
    for (const c of el.children) {
      const d = getComputedStyle(c).display;
      if (d !== 'none' && !INLINE_DISPLAYS.has(d)) { hasBlockChild = true; break; }
    }
    if (hasBlockChild) continue;

    const box = el.getBoundingClientRect();
    if (box.width < 40 || box.height < 6) continue;

    // đo từng từ bằng Range
    const words = [];
    let pendingBr = false;
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null);
    let node = walker.nextNode();
    let bad = false;
    while (node) {
      if (node.nodeType === 1) {
        if (node.tagName === 'BR') pendingBr = true;
        if (SKIP_TAGS.has(node.tagName) && node.tagName !== 'BR') { bad = true; break; }
      } else if (node.nodeType === 3 && node.nodeValue) {
        const t = node.nodeValue;
        const re = /[^\s ]+/g;
        let m;
        while ((m = re.exec(t)) !== null) {
          let rect = null;
          try {
            const r = document.createRange();
            r.setStart(node, m.index);
            r.setEnd(node, m.index + m[0].length);
            rect = r.getBoundingClientRect();
          } catch (e) { rect = null; }
          if (!rect || (rect.width === 0 && rect.height === 0)) { pendingBr = false; continue; }
          words.push({ w: m[0], top: Math.round(rect.top * 10) / 10, bottom: rect.bottom, left: rect.left, right: rect.right, br: pendingBr });
          pendingBr = false;
        }
      }
      node = walker.nextNode();
    }
    if (bad || words.length < 3) continue;

    // gom thành dòng theo toạ độ top
    const lines = [];
    for (const w of words) {
      const last = lines[lines.length - 1];
      if (last && Math.abs(w.top - last.top) <= 3) { last.words.push(w); }
      else lines.push({ top: w.top, words: [w] });
    }
    if (lines.length < 2) continue;

    const lastLine = lines[lines.length - 1];
    if (lastLine.words.length !== 1) continue;

    const orphanWord = lastLine.words[0];
    if (orphanWord.br) continue;            // xuống dòng do <br> — cố ý, bỏ qua
    if (lastLine.top <= lines[lines.length - 2].top + 1) continue; // cùng dòng, nhầm

    // bỏ khi bị cắt bởi line-clamp (dòng cuối không thật sự nhìn thấy)
    const clamp = cs.webkitLineClamp || cs.lineClamp;
    const clamped = clamp && clamp !== 'none' && Number(clamp) > 0 && lines.length > Number(clamp);
    if (clamped) continue;

    // vùng trang
    let region = 'body';
    if (el.closest('header')) region = 'header';
    else if (el.closest('footer')) region = 'footer';
    else if (el.closest('nav')) region = 'nav';

    const fullText = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
    out.push({
      tag: el.tagName,
      cls: (el.getAttribute('class') || '').slice(0, 120),
      region,
      align: cs.textAlign,
      fontSize: Math.round(parseFloat(cs.fontSize)),
      lines: lines.length,
      wordCount: words.length,
      orphan: orphanWord.w,
      orphanLen: orphanWord.w.length,
      widthPx: Math.round(box.width),
      // độ rộng còn trống ở dòng áp chót (để biết có "kéo" từ xuống được không)
      prevLineEndGap: Math.round(box.right - lines[lines.length - 2].words[lines[lines.length - 2].words.length - 1].right),
      text: fullText.slice(0, 260),
      textLen: fullText.length,
    });
  }
  return out;
}

// ---- điều phối ------------------------------------------------------------
let urls = fs.readFileSync(URLS_FILE, 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
if (LIMIT > 0) urls = urls.slice(0, LIMIT);

fs.mkdirSync(OUT_DIR, { recursive: true });
const outStream = fs.createWriteStream(OUT_FILE, { flags: 'w' });

const browser = await chromium.launch({ channel: 'chrome', headless: true });

let done = 0;
const started = Date.now();

async function worker(list, id) {
  const ctx = await browser.newContext({
    viewport: { width: VIEWPORTS[0].w, height: VIEWPORTS[0].h },
    deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OrphanAudit/1.0',
  });
  const page = await ctx.newPage();
  page.on('dialog', d => d.dismiss().catch(() => {}));
  for (const url of list) {
    const rec = { url, ok: false, findings: {} };
    try {
      const resp = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
      rec.status = resp ? resp.status() : 0;
      try { await page.evaluate('document.fonts && document.fonts.ready'); } catch (e) {}
      await page.waitForTimeout(250);
      for (const vp of VIEWPORTS) {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await page.waitForTimeout(180);
        const found = await page.evaluate(detectOrphansInPage);
        rec.findings[vp.name] = found;
      }
      rec.ok = true;
    } catch (e) {
      rec.error = String(e && e.message ? e.message : e).slice(0, 200);
    }
    outStream.write(JSON.stringify(rec) + '\n');
    done++;
    if (done % 20 === 0) {
      const el = (Date.now() - started) / 1000;
      process.stdout.write(`[${done}/${urls.length}] ${el.toFixed(0)}s\n`);
    }
  }
  await ctx.close();
}

const chunks = Array.from({ length: CONCURRENCY }, () => []);
urls.forEach((u, i) => chunks[i % CONCURRENCY].push(u));
await Promise.all(chunks.map((c, i) => worker(c, i)));

await browser.close();
outStream.end();
console.log(`XONG: ${done} trang -> ${OUT_FILE}`);
