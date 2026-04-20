/**
 * Thay the tat ca URL anh WordPress cu trong CSV bang URL moi tu R2.
 *
 * Input:  docs/image-url-mapping.json (mapping cu→moi)
 *         docs/directus-import-master.csv (va cac file CSV khac)
 * Output: docs/directus-import-master-r2.csv (file moi voi URL da thay)
 *
 * Chay: node scripts/replace-image-urls-in-csv.cjs
 */

const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(__dirname, '../docs/image-url-mapping.json');

// CSV files to process
const CSV_FILES = [
    'docs/directus-import-master.csv',
    'docs/directus-import-combined.csv',
    'docs/directus-import-expanded.csv',
    'docs/directus-import-all.csv',
    'docs/directus-import-legacy.csv',
];

function run() {
    // Load mapping
    if (!fs.existsSync(MAPPING_FILE)) {
        console.error('ERROR: image-url-mapping.json not found.');
        console.error('Run first: node scripts/generate-image-url-map.cjs');
        process.exit(1);
    }

    const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    console.log(`Loaded ${Object.keys(mapping).length} URL mappings.`);

    // Sort by URL length (longest first) to avoid partial replacements
    const sortedEntries = Object.entries(mapping)
        .sort((a, b) => b[0].length - a[0].length);

    let totalReplacements = 0;

    for (const csvRelPath of CSV_FILES) {
        const csvPath = path.join(__dirname, '..', csvRelPath);

        if (!fs.existsSync(csvPath)) {
            console.log(`SKIP: ${csvRelPath} (not found)`);
            continue;
        }

        let content = fs.readFileSync(csvPath, 'utf8');
        const originalLength = content.length;
        let fileReplacements = 0;

        for (const [oldUrl, newUrl] of sortedEntries) {
            // Escape special regex characters in URL
            const escaped = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'g');
            const matches = content.match(regex);
            if (matches) {
                fileReplacements += matches.length;
                content = content.replace(regex, newUrl);
            }
        }

        // Also catch any remaining wp-content/uploads URLs not in mapping
        const wpContentRegex = /https?:\/\/truongvietanh\.com\/wp-content\/uploads\/[^\s,"')}\]]+/g;
        const remainingWpUrls = content.match(wpContentRegex);
        if (remainingWpUrls) {
            const uniqueRemaining = [...new Set(remainingWpUrls)];
            if (uniqueRemaining.length > 0) {
                console.log(`  WARNING: ${uniqueRemaining.length} wp-content URLs NOT in mapping:`);
                uniqueRemaining.slice(0, 5).forEach(url => console.log(`    ${url}`));
                if (uniqueRemaining.length > 5) {
                    console.log(`    ... and ${uniqueRemaining.length - 5} more`);
                }

                // Save unmapped URLs for manual review
                const unmappedFile = path.join(__dirname, '../docs/unmapped-image-urls.txt');
                const existing = fs.existsSync(unmappedFile)
                    ? fs.readFileSync(unmappedFile, 'utf8').split('\n').filter(Boolean)
                    : [];
                const allUnmapped = [...new Set([...existing, ...uniqueRemaining])];
                fs.writeFileSync(unmappedFile, allUnmapped.join('\n'));
            }
        }

        if (fileReplacements > 0) {
            // Write to new file (keep original intact)
            const ext = path.extname(csvRelPath);
            const base = csvRelPath.replace(ext, '');
            const outputPath = path.join(__dirname, '..', `${base}-r2${ext}`);
            fs.writeFileSync(outputPath, content);
            console.log(`OK: ${csvRelPath} → ${fileReplacements} replacements → ${path.basename(outputPath)}`);
        } else {
            console.log(`OK: ${csvRelPath} → no wp-content URLs found`);
        }

        totalReplacements += fileReplacements;
    }

    console.log(`\nTotal replacements: ${totalReplacements}`);
    console.log('Original CSV files are unchanged. New files have "-r2" suffix.');
}

run();
