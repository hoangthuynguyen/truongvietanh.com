#!/usr/bin/env node
/**
 * IMAGE PIPELINE: Google Drive → Optimize → R2 → Match to Articles
 *
 * Usage:
 *   node scripts/image-pipeline.mjs download   # Download from Google Drive
 *   node scripts/image-pipeline.mjs optimize    # Convert to WebP, resize
 *   node scripts/image-pipeline.mjs upload      # Upload to Cloudflare R2
 *   node scripts/image-pipeline.mjs match       # Match images to articles
 *   node scripts/image-pipeline.mjs all         # Run all steps
 */

import fs from 'fs';
import path from 'path';
import { execSync, exec } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Config ──────────────────────────────────────────────
const GDRIVE_FOLDER_ID = '1NSrayCA2lgeQx3HTKW-5KJSu8SrWAM_B';
const RAW_DIR = path.join(ROOT, 'images/drive-raw');
const OPTIMIZED_DIR = path.join(ROOT, 'images/drive-webp');
const R2_BUCKET = 'truongvietanh-media';
const R2_PREFIX = 'images';
const MEDIA_BASE = 'https://media.truongvietanh.com/images';
const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

// Max dimensions for optimization
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 900;
const WEBP_QUALITY = 82;

// ── Step 1: Download from Google Drive ──────────────────
async function downloadFromDrive() {
  console.log('\n📥 STEP 1: Download images from Google Drive\n');

  fs.mkdirSync(RAW_DIR, { recursive: true });

  try {
    execSync(
      `gdown --folder "https://drive.google.com/drive/folders/${GDRIVE_FOLDER_ID}" -O "${RAW_DIR}" --remaining-ok`,
      { stdio: 'inherit', timeout: 600000 }
    );

    const files = getAllImageFiles(RAW_DIR);
    console.log(`\n✅ Downloaded ${files.length} image files to ${RAW_DIR}`);
    return files;
  } catch (e) {
    console.error('❌ Download failed:', e.message);
    console.log('\nAlternative: Manually download the folder from Google Drive and put files in:');
    console.log(`  ${RAW_DIR}`);
    process.exit(1);
  }
}

// ── Step 2: Optimize (resize + convert to WebP) ────────
async function optimizeImages() {
  console.log('\n🖼️  STEP 2: Optimize images (resize + WebP)\n');

  fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });

  // Check which source directory has images
  let sourceDir = RAW_DIR;
  if (!fs.existsSync(RAW_DIR) || getAllImageFiles(RAW_DIR).length === 0) {
    // Fallback to original images folder
    sourceDir = path.join(ROOT, 'images/original');
    if (!fs.existsSync(sourceDir)) {
      console.error('❌ No source images found. Run "download" step first.');
      return;
    }
  }

  const files = getAllImageFiles(sourceDir);
  console.log(`Found ${files.length} images in ${sourceDir}`);

  let converted = 0;
  let skipped = 0;

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, ext);
    const slug = slugify(baseName);
    const outFile = path.join(OPTIMIZED_DIR, `${slug}.webp`);

    if (fs.existsSync(outFile)) {
      skipped++;
      continue;
    }

    try {
      if (ext === '.svg') {
        // Copy SVGs as-is
        fs.copyFileSync(filePath, path.join(OPTIMIZED_DIR, `${slug}.svg`));
        converted++;
        continue;
      }

      if (ext === '.webp') {
        // Already WebP - just resize if needed
        execSync(
          `cwebp -q ${WEBP_QUALITY} -resize ${MAX_WIDTH} 0 "${filePath}" -o "${outFile}" 2>/dev/null`,
          { timeout: 30000 }
        );
      } else if (['.jpg', '.jpeg', '.png', '.tiff', '.bmp'].includes(ext)) {
        execSync(
          `cwebp -q ${WEBP_QUALITY} -resize ${MAX_WIDTH} 0 "${filePath}" -o "${outFile}" 2>/dev/null`,
          { timeout: 30000 }
        );
      } else {
        skipped++;
        continue;
      }

      const origSize = fs.statSync(filePath).size;
      const newSize = fs.statSync(outFile).size;
      const savings = ((1 - newSize / origSize) * 100).toFixed(0);
      console.log(`  ✓ ${slug}.webp (${formatSize(newSize)}, -${savings}%)`);
      converted++;
    } catch (e) {
      console.log(`  ✗ ${baseName} - ${e.message}`);
      skipped++;
    }
  }

  console.log(`\n✅ Optimized: ${converted}, Skipped: ${skipped}`);
}

// ── Step 3: Upload to Cloudflare R2 ────────────────────
async function uploadToR2() {
  console.log('\n☁️  STEP 3: Upload to Cloudflare R2\n');

  // Determine source dir (prefer optimized, fallback to webp)
  let sourceDir = OPTIMIZED_DIR;
  if (!fs.existsSync(sourceDir) || fs.readdirSync(sourceDir).length === 0) {
    sourceDir = path.join(ROOT, 'images/webp');
  }

  const files = fs.readdirSync(sourceDir).filter(f =>
    /\.(webp|svg|png|jpg|jpeg)$/i.test(f)
  );

  console.log(`Found ${files.length} files to upload from ${sourceDir}`);

  let uploaded = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(sourceDir, file);
    const ext = path.extname(file).toLowerCase();
    const contentType = ext === '.svg' ? 'image/svg+xml' :
                        ext === '.webp' ? 'image/webp' :
                        ext === '.png' ? 'image/png' : 'image/jpeg';

    const r2Key = ext === '.svg'
      ? `${R2_PREFIX}/svg/${file}`
      : `${R2_PREFIX}/${file}`;

    try {
      execSync(
        `wrangler r2 object put "${R2_BUCKET}/${r2Key}" --file="${filePath}" --content-type="${contentType}" 2>/dev/null`,
        { timeout: 30000 }
      );
      uploaded++;
      if (uploaded % 10 === 0) console.log(`  Uploaded ${uploaded}/${files.length}...`);
    } catch {
      console.log(`  ✗ Failed: ${file}`);
      failed++;
    }
  }

  console.log(`\n✅ Uploaded: ${uploaded}, Failed: ${failed}`);
  console.log(`   URL pattern: ${MEDIA_BASE}/<filename>`);
}

// ── Step 4: Match images to articles ───────────────────
async function matchImagesToArticles() {
  console.log('\n🔗 STEP 4: Match images to articles\n');

  // 1. Get all available optimized images
  let imageDir = OPTIMIZED_DIR;
  if (!fs.existsSync(imageDir) || fs.readdirSync(imageDir).length === 0) {
    imageDir = path.join(ROOT, 'images/webp');
  }

  const images = fs.readdirSync(imageDir)
    .filter(f => /\.(webp|jpg|png)$/i.test(f))
    .map(f => ({
      filename: f,
      slug: path.basename(f, path.extname(f)),
      url: `${MEDIA_BASE}/${f}`,
      keywords: extractKeywords(path.basename(f, path.extname(f))),
    }));

  console.log(`Available images: ${images.length}`);

  // 2. Get all articles from Directus
  let articles = [];
  try {
    const res = await fetch(
      `${DIRECTUS_URL}/items/posts?fields=id,title,slug,content&limit=-1&filter[status][_eq]=published`,
      { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
    );
    if (res.ok) {
      const data = await res.json();
      articles = data.data || [];
    }
  } catch (e) {
    console.log('⚠️  Could not fetch from Directus:', e.message);
  }

  // Also get local .astro pages
  const astroPages = getAstroPages(path.join(ROOT, 'src/pages'));
  console.log(`Directus articles: ${articles.length}`);
  console.log(`Astro pages: ${astroPages.length}`);

  // 3. Match images to content
  const matches = [];

  for (const image of images) {
    const imageKws = image.keywords;
    if (imageKws.length === 0) continue;

    // Score against each article
    const scored = [];

    for (const article of articles) {
      const titleKws = extractKeywords(article.title || '');
      const slugKws = extractKeywords(article.slug || '');
      const allKws = [...titleKws, ...slugKws];

      const score = computeMatchScore(imageKws, allKws);
      if (score > 0) {
        scored.push({
          type: 'directus',
          id: article.id,
          title: article.title,
          slug: article.slug,
          score,
          hasImage: (article.content || '').includes('<img'),
        });
      }
    }

    for (const page of astroPages) {
      const pageKws = extractKeywords(page.slug);
      const score = computeMatchScore(imageKws, pageKws);
      if (score > 0) {
        scored.push({
          type: 'astro',
          path: page.path,
          slug: page.slug,
          score,
        });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    const topMatches = scored.slice(0, 3);

    if (topMatches.length > 0) {
      matches.push({
        image: image.filename,
        url: image.url,
        keywords: imageKws,
        matches: topMatches,
      });
    }
  }

  // 4. Save matching report
  const reportPath = path.join(ROOT, 'docs/image-article-matches.json');
  fs.writeFileSync(reportPath, JSON.stringify(matches, null, 2));

  // Print summary
  console.log(`\n📊 Matching Results:`);
  console.log(`  Images with matches: ${matches.length}/${images.length}`);

  const directusMatches = matches.filter(m =>
    m.matches.some(x => x.type === 'directus' && !x.hasImage)
  );
  console.log(`  Articles without images that can be matched: ${directusMatches.length}`);

  console.log(`\n  Report saved to: ${reportPath}`);

  // 5. Generate Directus update commands
  if (directusMatches.length > 0) {
    console.log(`\n📝 Top image → article assignments:`);
    for (const m of directusMatches.slice(0, 20)) {
      const best = m.matches[0];
      console.log(`  ${m.image} → "${best.title || best.slug}" (score: ${best.score})`);
    }
  }

  return matches;
}

// ── Step 5: Insert images into Directus articles ───────
async function insertImagesIntoArticles(matches) {
  console.log('\n✏️  STEP 5: Insert matched images into articles\n');

  if (!matches) {
    const reportPath = path.join(ROOT, 'docs/image-article-matches.json');
    if (fs.existsSync(reportPath)) {
      matches = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    } else {
      console.log('No matches found. Run "match" step first.');
      return;
    }
  }

  // Only insert into Directus articles that don't already have images
  const toInsert = matches.filter(m =>
    m.matches.some(x => x.type === 'directus' && !x.hasImage && x.score >= 2)
  );

  console.log(`Articles to update with images: ${toInsert.length}`);

  let updated = 0;
  for (const m of toInsert) {
    const best = m.matches.find(x => x.type === 'directus' && !x.hasImage);
    if (!best) continue;

    // Get current article content
    try {
      const res = await fetch(
        `${DIRECTUS_URL}/items/posts/${best.id}?fields=content`,
        { headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` } }
      );
      if (!res.ok) continue;

      const { data } = await res.json();
      const content = data.content || '';

      // Insert image after first paragraph or heading
      const imgTag = `<figure><img src="${m.url}" alt="${best.title}" loading="lazy" width="1200" height="auto" style="border-radius:8px;margin:1rem 0" /><figcaption>${best.title}</figcaption></figure>`;

      let newContent;
      const firstBreak = content.indexOf('</p>');
      if (firstBreak > 0) {
        newContent = content.slice(0, firstBreak + 4) + '\n' + imgTag + '\n' + content.slice(firstBreak + 4);
      } else {
        newContent = imgTag + '\n' + content;
      }

      // Update in Directus
      const updateRes = await fetch(
        `${DIRECTUS_URL}/items/posts/${best.id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: newContent }),
        }
      );

      if (updateRes.ok) {
        updated++;
        console.log(`  ✓ Updated: "${best.title}" ← ${m.image}`);
      }
    } catch (e) {
      // skip
    }
  }

  console.log(`\n✅ Updated ${updated} articles with images`);
}

// ── Helpers ─────────────────────────────────────────────

function getAllImageFiles(dir) {
  const exts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.tiff', '.bmp', '.gif'];
  const results = [];

  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (exts.includes(path.extname(entry.name).toLowerCase())) {
        results.push(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function extractKeywords(str) {
  const stopWords = new Set([
    'va', 'cua', 'cho', 'trong', 'voi', 'den', 'la', 'mot', 'cac', 'nhung',
    'tai', 'tu', 'tren', 'duoi', 'nhu', 'the', 'nao', 'co', 'khong', 'da',
    'dang', 'se', 'duoc', 'bai', 'nam', 'lop', 'hoc', 'truong', 'img',
    'scaled', 'copy', 'extra', 'big', 'small', 'new', 'old',
    'a', 'b', 'c', 'd', 'e', 'f', 'n', 'index', 'page', 'the',
  ]);

  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w));
}

function computeMatchScore(imageKws, articleKws) {
  let score = 0;
  const articleSet = new Set(articleKws);
  for (const kw of imageKws) {
    if (articleSet.has(kw)) score += 2;
    else {
      for (const ak of articleKws) {
        if (ak.includes(kw) || kw.includes(ak)) { score += 1; break; }
      }
    }
  }
  return score;
}

function getAstroPages(dir) {
  const pages = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name.startsWith('[')) continue;
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.astro')) {
        const rel = path.relative(dir, fullPath).replace(/\.astro$/, '').replace(/\/index$/, '');
        pages.push({ path: fullPath, slug: rel });
      }
    }
  }
  walk(dir);
  return pages;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
}

// ── Main ────────────────────────────────────────────────
const step = process.argv[2] || 'all';

console.log('═══════════════════════════════════════');
console.log('  IMAGE PIPELINE: Drive → R2 → Articles');
console.log('═══════════════════════════════════════');

if (step === 'download' || step === 'all') await downloadFromDrive();
if (step === 'optimize' || step === 'all') await optimizeImages();
if (step === 'upload' || step === 'all') await uploadToR2();

let matches;
if (step === 'match' || step === 'all') matches = await matchImagesToArticles();
if (step === 'insert' || step === 'all') await insertImagesIntoArticles(matches);

console.log('\n═══════════════════════════════════════');
console.log('  DONE!');
console.log('═══════════════════════════════════════\n');
