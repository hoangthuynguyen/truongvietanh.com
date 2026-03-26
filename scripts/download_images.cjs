const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');
const csv = require('csv-parser');
const { createObjectCsvWriter } = require('csv-writer');

const CSV_FILE = path.join(__dirname, '../docs/master-index-sheet.csv');
const OUTPUT_CSV = path.join(__dirname, '../docs/image_migration_log.csv');
const IMG_DIR = path.join(__dirname, '../images/original');
const WEBP_DIR = path.join(__dirname, '../images/webp');

// Create directories if not exist
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
if (!fs.existsSync(WEBP_DIR)) fs.mkdirSync(WEBP_DIR, { recursive: true });

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function downloadImage(url, destPath) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            timeout: 10000
        });
        const writer = fs.createWriteStream(destPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (err) {
        console.error(`Failed to download ${url}: ${err.message}`);
        return null;
    }
}

async function convertToWebP(inputPath, outputPath) {
    try {
        await sharp(inputPath)
            .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920
            .webp({ quality: 80 })
            .toFile(outputPath);
        return true;
    } catch (err) {
        console.error(`Failed to convert ${inputPath}: ${err.message}`);
        return false;
    }
}

// Ensure csv-writer is installed for export log
async function run() {
    const urlsToCrawl = [];
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
        .on('end', async () => {
            console.log(`Loaded ${urlsToCrawl.length} URLs from CSV.`);
            const downloadedImages = new Set();
            let records = [];

            // Just test with the first 5 pages to not overload the server in Step 1
            const LIMIT = 5; 
            const targetUrls = urlsToCrawl.slice(0, LIMIT);
            console.log(`Starting run for top ${LIMIT} URLs...`);

            for (let i = 0; i < targetUrls.length; i++) {
                const pageUrl = targetUrls[i];
                console.log(`\nScanning [${i+1}/${targetUrls.length}]: ${pageUrl}`);
                try {
                    const { data } = await axios.get(pageUrl, { timeout: 15000 });
                    const $ = cheerio.load(data);
                    
                    // Base name from page slug for SEO naming
                    let slug = pageUrl.replace('https://truongvietanh.com', '').replace(/^\/|\/$/g, '').replace(/\//g, '-');
                    if (!slug) slug = 'trang-chu';

                    let imgCount = 1;
                    const imgs = $('img').toArray();

                    for (const img of imgs) {
                        let src = $(img).attr('src');
                        if (!src) continue;

                        // Handle relative urls
                        if (src.startsWith('/')) {
                            src = `https://truongvietanh.com${src}`;
                        } else if (!src.startsWith('http')) {
                            src = `https://truongvietanh.com/${src}`;
                        }

                        // Filter only wp-content/uploads images
                        if (src.includes('wp-content/uploads') && !downloadedImages.has(src)) {
                            downloadedImages.add(src);
                            const ext = path.extname(src.split('?')[0]) || '.jpg';
                            const origFilename = path.basename(src.split('?')[0]);
                            const localOrigPath = path.join(IMG_DIR, origFilename);
                            
                            // SEO friendly logic: [slug]-[index].webp
                            const seoFilename = `${slug}-${imgCount}.webp`;
                            const localWebpPath = path.join(WEBP_DIR, seoFilename);

                            console.log(` Downloading: ${origFilename}`);
                            await downloadImage(src, localOrigPath);

                            if (fs.existsSync(localOrigPath)) {
                                const success = await convertToWebP(localOrigPath, localWebpPath);
                                if (success) {
                                    records.push({
                                        PageURL: pageUrl,
                                        OriginalImageURL: src,
                                        SEOWebPFileName: seoFilename
                                    });
                                }
                            }
                            imgCount++;
                            await delay(200); // polite delay
                        }
                    }
                } catch (e) {
                    console.error(` Error scanning ${pageUrl}: ${e.message}`);
                }
            }

            // Export to CSV
            const createCsvWriter = require('csv-writer').createObjectCsvWriter;
            const csvWriter = createCsvWriter({
                path: OUTPUT_CSV,
                header: [
                    { id: 'PageURL', title: 'PageURL' },
                    { id: 'OriginalImageURL', title: 'OriginalImageURL' },
                    { id: 'SEOWebPFileName', title: 'SEOWebPFileName' }
                ]
            });

            await csvWriter.writeRecords(records);
            console.log(`\nMigration Step 1 Finished. Log saved to docs/image_migration_log.csv`);
        });
}

// We need csv-writer, let's install if missing
try {
    require.resolve('csv-writer');
    run();
} catch (e) {
    const { execSync } = require('child_process');
    console.log('Installing csv-writer...');
    execSync('npm install csv-writer', { stdio: 'inherit' });
    run();
}
