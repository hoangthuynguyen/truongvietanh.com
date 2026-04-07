/**
 * Thay the URL anh WordPress cu trong cac file Astro bang URL R2.
 *
 * Input:  docs/image-url-mapping.json
 * Target: src/pages/*.astro (va subdirs)
 *
 * Chay: node scripts/replace-image-urls-in-astro.cjs
 * Them --dry-run de xem truoc thay doi ma khong ghi file
 */

const fs = require('fs');
const path = require('path');

const MAPPING_FILE = path.join(__dirname, '../docs/image-url-mapping.json');
const SRC_DIR = path.join(__dirname, '../src');
const DRY_RUN = process.argv.includes('--dry-run');

function findAstroFiles(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findAstroFiles(fullPath));
        } else if (entry.name.endsWith('.astro') || entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
            results.push(fullPath);
        }
    }
    return results;
}

function run() {
    if (!fs.existsSync(MAPPING_FILE)) {
        console.error('ERROR: image-url-mapping.json not found.');
        console.error('Run first: node scripts/generate-image-url-map.cjs');
        process.exit(1);
    }

    const mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
    console.log(`Loaded ${Object.keys(mapping).length} URL mappings.`);
    if (DRY_RUN) console.log('DRY RUN MODE - no files will be modified.\n');

    // Sort by URL length (longest first)
    const sortedEntries = Object.entries(mapping)
        .sort((a, b) => b[0].length - a[0].length);

    const files = findAstroFiles(SRC_DIR);
    console.log(`Found ${files.length} source files to scan.\n`);

    let totalReplacements = 0;
    let filesModified = 0;

    for (const filePath of files) {
        let content = fs.readFileSync(filePath, 'utf8');
        let fileReplacements = 0;
        const changes = [];

        for (const [oldUrl, newUrl] of sortedEntries) {
            const escaped = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escaped, 'g');
            const matches = content.match(regex);
            if (matches) {
                fileReplacements += matches.length;
                changes.push({ old: oldUrl, new: newUrl, count: matches.length });
                content = content.replace(regex, newUrl);
            }
        }

        // Also catch wp-content URLs not in mapping (with size variants like -768x432)
        const wpRegex = /https?:\/\/truongvietanh\.com\/wp-content\/uploads\/[^"'\s)`}]+/g;
        const remaining = content.match(wpRegex);

        if (fileReplacements > 0 || (remaining && remaining.length > 0)) {
            const relPath = path.relative(path.join(__dirname, '..'), filePath);
            console.log(`${relPath}:`);

            if (fileReplacements > 0) {
                for (const c of changes) {
                    console.log(`  REPLACE (${c.count}x): ${c.old}`);
                    console.log(`       →  ${c.new}`);
                }
                if (!DRY_RUN) {
                    fs.writeFileSync(filePath, content);
                }
                filesModified++;
            }

            if (remaining && remaining.length > 0) {
                const unique = [...new Set(remaining)];
                for (const url of unique) {
                    console.log(`  WARNING unmapped: ${url}`);
                }
            }

            console.log('');
        }

        totalReplacements += fileReplacements;
    }

    console.log('========================================');
    console.log(`Files modified:     ${filesModified}`);
    console.log(`Total replacements: ${totalReplacements}`);
    if (DRY_RUN) console.log('(DRY RUN - no files actually changed)');
    console.log('========================================');
}

run();
