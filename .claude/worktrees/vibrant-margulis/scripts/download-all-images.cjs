const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');
const csv = require('csv-parser');

const CSV_FILE = path.join(__dirname, '../docs/master-index-sheet.csv');
const OUTPUT_CSV = path.join(__dirname, '../docs/image_migration_log.csv');
const IMG_DIR = path.join(__dirname, '../images/original');
const WEBP_DIR = path.join(__dirname, '../images/webp');
const SVG_DIR = path.join(__dirname, '../images/svg');
const PROGRESS_FILE = path.join(__dirname, '../images/.download-progress.json');

// Create directories
[IMG_DIR, WEBP_DIR, SVG_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Load progress (resume support)
function loadProgress() {
    if (fs.existsSync(PROGRESS_FILE)) {
        return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    }
    return { completedPages: [], downloadedImages: {}, records: [] };
}

function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

async function downloadImage(url, destPath) {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
        return true; // Already downloaded
    }
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            timeout: 15000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Migration Bot'
            }
        });
        const writer = fs.createWriteStream(destPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(true));
            writer.on('error', reject);
        });
    } catch (err) {
        console.error(`  FAIL download ${url}: ${err.message}`);
        return false;
    }
}

async function convertToWebP(inputPath, outputPath) {
    if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
        return true; // Already converted
    }
    try {
        await sharp(inputPath)
            .resize({ width: 1920, withoutEnlargement: true })
            .webp({ quality: 80 })
            .toFile(outputPath);
        return true;
    } catch (err) {
        console.error(`  FAIL convert ${inputPath}: ${err.message}`);
        return false;
    }
}

async function run() {
    const urlsToCrawl = [];

    await new Promise((resolve) => {
        fs.createReadStream(CSV_FILE)
            .pipe(csv())
            .on('data', (row) => {
                let finalUrl = row.URL || '';
                if (finalUrl) {
                    if (!finalUrl.startsWith('http')) {
                        finalUrl = `https://truongvietanh.com${finalUrl.startsWith('/') ? '' : '/'}${finalUrl}`;
                    }
                    urlsToCrawl.push(finalUrl);
                }
            })
            .on('end', resolve);
    });

    console.log(`Loaded ${urlsToCrawl.length} URLs from CSV.`);

    const progress = loadProgress();
    const completedSet = new Set(progress.completedPages);
    const downloadedImages = new Map(Object.entries(progress.downloadedImages));
    let records = progress.records || [];
    let newDownloads = 0;
    let skippedPages = 0;
    let failedPages = [];

    // NO LIMIT - process ALL URLs
    for (let i = 0; i < urlsToCrawl.length; i++) {
        const pageUrl = urlsToCrawl[i];

        if (completedSet.has(pageUrl)) {
            skippedPages++;
            continue;
        }

        console.log(`\n[${i + 1}/${urlsToCrawl.length}] ${pageUrl}`);

        try {
            const { data } = await axios.get(pageUrl, {
                timeout: 15000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Migration Bot'
                }
            });
            const $ = cheerio.load(data);

            let slug = pageUrl
                .replace('https://truongvietanh.com', '')
                .replace(/^\/|\/$/g, '')
                .replace(/\//g, '-');
            if (!slug) slug = 'trang-chu';
            // Clean slug for filesystem
            slug = decodeURIComponent(slug).replace(/[^a-zA-Z0-9\-]/g, '').substring(0, 80);
            if (!slug) slug = 'page-' + i;

            let imgCount = 1;
            const imgs = $('img').toArray();

            for (const img of imgs) {
                let src = $(img).attr('src');
                if (!src) continue;

                if (src.startsWith('//')) {
                    src = 'https:' + src;
                } else if (src.startsWith('/')) {
                    src = `https://truongvietanh.com${src}`;
                } else if (!src.startsWith('http')) {
                    src = `https://truongvietanh.com/${src}`;
                }

                // Only wp-content/uploads images
                if (!src.includes('wp-content/uploads')) continue;

                // Skip if already downloaded this exact URL
                if (downloadedImages.has(src)) continue;

                const origFilename = path.basename(src.split('?')[0]);
                const ext = path.extname(origFilename).toLowerCase();
                const localOrigPath = path.join(IMG_DIR, origFilename);

                if (ext === '.svg') {
                    // SVG: download only, no convert
                    const svgDest = path.join(SVG_DIR, origFilename);
                    const ok = await downloadImage(src, svgDest);
                    if (ok) {
                        // Also copy to original dir for reference
                        if (!fs.existsSync(localOrigPath)) {
                            fs.copyFileSync(svgDest, localOrigPath);
                        }
                        const record = {
                            PageURL: pageUrl,
                            OriginalImageURL: src,
                            OriginalFilename: origFilename,
                            SEOWebPFileName: origFilename, // SVG stays as-is
                            Type: 'svg'
                        };
                        records.push(record);
                        downloadedImages.set(src, origFilename);
                        newDownloads++;
                        console.log(`  SVG: ${origFilename}`);
                    }
                } else {
                    // Raster image: download + convert to WebP
                    const seoFilename = `${slug}-${imgCount}.webp`;
                    const localWebpPath = path.join(WEBP_DIR, seoFilename);

                    const ok = await downloadImage(src, localOrigPath);
                    if (ok && fs.existsSync(localOrigPath) && fs.statSync(localOrigPath).size > 0) {
                        const converted = await convertToWebP(localOrigPath, localWebpPath);
                        if (converted) {
                            const record = {
                                PageURL: pageUrl,
                                OriginalImageURL: src,
                                OriginalFilename: origFilename,
                                SEOWebPFileName: seoFilename,
                                Type: 'raster'
                            };
                            records.push(record);
                            downloadedImages.set(src, seoFilename);
                            newDownloads++;
                            console.log(`  OK: ${origFilename} → ${seoFilename}`);
                        }
                    }
                    imgCount++;
                }

                await delay(150); // polite delay
            }

            // Mark page as completed
            completedSet.add(pageUrl);
            progress.completedPages = Array.from(completedSet);
            progress.downloadedImages = Object.fromEntries(downloadedImages);
            progress.records = records;

            // Save progress every 10 pages
            if ((i + 1) % 10 === 0) {
                saveProgress(progress);
                console.log(`  [Progress saved: ${completedSet.size} pages, ${downloadedImages.size} images]`);
            }

        } catch (e) {
            console.error(`  ERROR: ${e.message}`);
            failedPages.push(pageUrl);
        }

        // Small delay between pages
        await delay(300);
    }

    // Final save
    saveProgress(progress);

    // Write final CSV
    const { createObjectCsvWriter } = require('csv-writer');
    const csvWriter = createObjectCsvWriter({
        path: OUTPUT_CSV,
        header: [
            { id: 'PageURL', title: 'PageURL' },
            { id: 'OriginalImageURL', title: 'OriginalImageURL' },
            { id: 'OriginalFilename', title: 'OriginalFilename' },
            { id: 'SEOWebPFileName', title: 'SEOWebPFileName' },
            { id: 'Type', title: 'Type' }
        ]
    });
    await csvWriter.writeRecords(records);

    // Write failed pages log
    if (failedPages.length > 0) {
        fs.writeFileSync(
            path.join(__dirname, '../docs/failed-pages.txt'),
            failedPages.join('\n')
        );
    }

    console.log('\n========================================');
    console.log(`DONE!`);
    console.log(`Pages crawled:    ${completedSet.size}`);
    console.log(`Pages skipped:    ${skippedPages} (already done)`);
    console.log(`Pages failed:     ${failedPages.length}`);
    console.log(`Images total:     ${downloadedImages.size}`);
    console.log(`New downloads:    ${newDownloads}`);
    console.log(`Log: docs/image_migration_log.csv`);
    console.log('========================================');
}

run().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
