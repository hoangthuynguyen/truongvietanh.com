/**
 * Tao file mapping tu URL anh WordPress cu → URL moi tren Cloudflare R2.
 *
 * Input:  docs/image_migration_log.csv
 * Output: docs/image-url-mapping.json
 *
 * Chay: node scripts/generate-image-url-map.cjs
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const INPUT_CSV = path.join(__dirname, '../docs/image_migration_log.csv');
const OUTPUT_JSON = path.join(__dirname, '../docs/image-url-mapping.json');
const OUTPUT_SUMMARY = path.join(__dirname, '../docs/image-url-mapping-summary.txt');

// R2 public base URL - UPDATE THIS after creating R2 bucket
const R2_BASE_URL = process.env.R2_PUBLIC_URL || 'https://media.truongvietanh.com';

async function run() {
    const mapping = {};
    const svgMapping = {};
    let rasterCount = 0;
    let svgCount = 0;

    await new Promise((resolve) => {
        fs.createReadStream(INPUT_CSV)
            .pipe(csv())
            .on('data', (row) => {
                const originalUrl = row.OriginalImageURL;
                const seoFilename = row.SEOWebPFileName;
                const type = row.Type || 'raster';

                if (!originalUrl || !seoFilename) return;

                if (type === 'svg') {
                    // SVG: keep original filename
                    const newUrl = `${R2_BASE_URL}/images/svg/${seoFilename}`;
                    mapping[originalUrl] = newUrl;
                    svgMapping[originalUrl] = newUrl;
                    svgCount++;
                } else {
                    // Raster: use SEO WebP filename
                    const newUrl = `${R2_BASE_URL}/images/${seoFilename}`;
                    mapping[originalUrl] = newUrl;
                    rasterCount++;
                }

                // Also map common URL variants
                // http → https
                if (originalUrl.startsWith('https://')) {
                    const httpUrl = originalUrl.replace('https://', 'http://');
                    mapping[httpUrl] = mapping[originalUrl];
                }
                // Relative path variant
                const relativePath = originalUrl.replace('https://truongvietanh.com', '');
                mapping[relativePath] = mapping[originalUrl];
            })
            .on('end', resolve);
    });

    // Write JSON mapping
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(mapping, null, 2));

    // Write summary
    const summary = [
        `Image URL Mapping Summary`,
        `========================`,
        `Generated: ${new Date().toISOString()}`,
        `R2 Base URL: ${R2_BASE_URL}`,
        ``,
        `Raster images (→ WebP): ${rasterCount}`,
        `SVG images (unchanged): ${svgCount}`,
        `Total mappings: ${Object.keys(mapping).length} (includes URL variants)`,
        ``,
        `Output: ${OUTPUT_JSON}`,
        ``,
        `Sample mappings:`,
        ...Object.entries(mapping).slice(0, 10).map(([old, newUrl]) =>
            `  ${old}\n    → ${newUrl}`
        )
    ].join('\n');

    fs.writeFileSync(OUTPUT_SUMMARY, summary);

    console.log(summary);
}

run().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
