#!/usr/bin/env node
// Build new tree for squeeze + public + scripts changes
// Output: NEW commit SHA on stdout (last line)
import { execSync } from 'node:child_process';

const PARENT = '70910c34a3bfd63bbb3918fab9f2715857039914';

const SLUGS = [
  '50-truong-dh-xet-ielts','cam-nang-chon-thpt','checklist-10-ky-nang-lop1',
  'chuan-bi-du-hoc-lop10','chuyen-truong-lop6','conversation-cards-song-ngu',
  'ebook-9-linh-vuc-mam-non','giai-doan-vang-ngon-ngu','huong-dan-dang-ky-lop1',
  'lo-trinh-ielts-thcs','lo-trinh-tieng-anh-lop1-5','oxford-cambridge-ib',
  'phuong-phap-hoc-teen','quiz-phuong-phap-giao-duc','reading-challenge-30-ngay',
  'so-sanh-chi-phi-hoc','so-sanh-truong-thcs',
];

// Hashes from previous step
const ASTRO = {
  '50-truong-dh-xet-ielts': '', // we will re-hash to be safe
};

// Re-hash all files for safety
function hash(path) {
  return execSync(`git hash-object -w "${path}"`, { encoding: 'utf8' }).trim();
}

function lsTree(ref) {
  const out = execSync(`git ls-tree ${ref}`, { encoding: 'utf8' });
  return out.trim().split('\n').filter(Boolean).map(line => {
    const [meta, name] = line.split('\t');
    const [mode, type, sha] = meta.split(' ');
    return { mode, type, sha, name };
  });
}

function mktree(entries) {
  // Sort by name (git mktree requires sorted input)
  entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  const stdin = entries.map(e => `${e.mode} ${e.type} ${e.sha}\t${e.name}`).join('\n');
  return execSync('git mktree', { input: stdin, encoding: 'utf8' }).trim();
}

// ── 1. Build new src/pages/squeeze/ tree ──
console.log('Building squeeze tree...');
const SLUG_SET = new Set(SLUGS);
let squeezeEntries = lsTree(`${PARENT}:src/pages/squeeze`);
// Remove old .html entries for our slugs
squeezeEntries = squeezeEntries.filter(e => {
  if (e.name.endsWith('.html')) {
    const slug = e.name.replace(/\.html$/, '');
    return !SLUG_SET.has(slug);
  }
  return true;
});
// Add new .astro entries
for (const slug of SLUGS) {
  const sha = hash(`src/pages/squeeze/${slug}.astro`);
  // Replace existing .astro entry if exists, otherwise add
  const existing = squeezeEntries.findIndex(e => e.name === `${slug}.astro`);
  const entry = { mode: '100644', type: 'blob', sha, name: `${slug}.astro` };
  if (existing >= 0) squeezeEntries[existing] = entry;
  else squeezeEntries.push(entry);
}
const SQ_TREE = mktree(squeezeEntries);
console.log(`SQ_TREE=${SQ_TREE}`);

// ── 2. Build new src/pages/ tree ──
let pagesEntries = lsTree(`${PARENT}:src/pages`);
const sqIdx = pagesEntries.findIndex(e => e.name === 'squeeze');
pagesEntries[sqIdx] = { mode: '040000', type: 'tree', sha: SQ_TREE, name: 'squeeze' };
const PG_TREE = mktree(pagesEntries);
console.log(`PG_TREE=${PG_TREE}`);

// ── 3. Build new src/ tree ──
let srcEntries = lsTree(`${PARENT}:src`);
const pgIdx = srcEntries.findIndex(e => e.name === 'pages');
srcEntries[pgIdx] = { mode: '040000', type: 'tree', sha: PG_TREE, name: 'pages' };
const SR_TREE = mktree(srcEntries);
console.log(`SR_TREE=${SR_TREE}`);

// ── 4. Build new public/ tree (add 17 PNGs) ──
let publicEntries = lsTree(`${PARENT}:public`);
for (const slug of SLUGS) {
  const sha = hash(`public/mockup-${slug}.png`);
  const name = `mockup-${slug}.png`;
  const existing = publicEntries.findIndex(e => e.name === name);
  const entry = { mode: '100644', type: 'blob', sha, name };
  if (existing >= 0) publicEntries[existing] = entry;
  else publicEntries.push(entry);
}
const PB_TREE = mktree(publicEntries);
console.log(`PB_TREE=${PB_TREE}`);

// ── 5. Build new scripts/ tree (add gen-squeeze.mjs + build-tree.mjs) ──
let scriptsEntries = [];
try {
  scriptsEntries = lsTree(`${PARENT}:scripts`);
} catch { /* scripts dir doesn't exist on parent */ }
const genSha = hash('scripts/gen-squeeze.mjs');
const btSha = hash('scripts/build-tree.mjs');
for (const [name, sha] of [['gen-squeeze.mjs', genSha], ['build-tree.mjs', btSha]]) {
  const idx = scriptsEntries.findIndex(e => e.name === name);
  const entry = { mode: '100644', type: 'blob', sha, name };
  if (idx >= 0) scriptsEntries[idx] = entry;
  else scriptsEntries.push(entry);
}
const SC_TREE = mktree(scriptsEntries);
console.log(`SC_TREE=${SC_TREE}`);

// ── 6. Build root tree ──
let rootEntries = lsTree(PARENT);
rootEntries.find(e => e.name === 'src').sha = SR_TREE;
rootEntries.find(e => e.name === 'public').sha = PB_TREE;
const scriptsIdx = rootEntries.findIndex(e => e.name === 'scripts');
const scriptsEntry = { mode: '040000', type: 'tree', sha: SC_TREE, name: 'scripts' };
if (scriptsIdx >= 0) rootEntries[scriptsIdx] = scriptsEntry;
else rootEntries.push(scriptsEntry);
const RT_TREE = mktree(rootEntries);
console.log(`RT_TREE=${RT_TREE}`);

console.log(RT_TREE); // last line for capture
