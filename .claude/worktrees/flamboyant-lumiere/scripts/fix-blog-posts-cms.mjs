#!/usr/bin/env node

/**
 * fix-blog-posts-cms.mjs
 *
 * Batch-fix SEO/AIO issues in all blog posts stored in Directus CMS.
 *
 * Fixes applied:
 * 1. Remove duplicate <h1> from content (template already renders H1)
 * 2. Generate excerpt from content if missing
 * 3. Fix phone placeholders 0909.xxx.xxx → 0916 961 409
 * 4. Fix broken internal links (/thcs → /trung-hoc-co-so, etc.)
 * 5. Convert markdown-style tables to proper HTML <table>
 * 6. Remove boilerplate sections (only for AI-rewritten posts ID >= 560)
 *
 * Usage:
 *   node scripts/fix-blog-posts-cms.mjs              # dry-run (default)
 *   node scripts/fix-blog-posts-cms.mjs --apply       # apply changes
 *   node scripts/fix-blog-posts-cms.mjs --apply --batch-size=50
 */

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || 'tva_0b80f9b6cc9c494d98faf0a2a1a966e7';

const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--apply');
const BATCH_SIZE = parseInt((args.find(a => a.startsWith('--batch-size=')) || '').split('=')[1]) || 50;

// ─── Link mapping ───
const LINK_FIXES = {
  '/thcs': '/trung-hoc-co-so',
  '/thpt': '/trung-hoc-pho-thong',
  '/chuong-trinh-dao-tao': '/cap-hoc',
  '/chuong-trinh': '/cap-hoc',
  '/lien-he': '/lien-he',
};

// ─── Boilerplate H2 sections to remove (AI-rewritten posts) ───
const BOILERPLATE_H2_TITLES = [
  'Khám Phá Cùng Việt Anh',
  'Hệ Thống PDR — Khác Biệt Cốt Lõi',
  'Tổng Quan Trường Việt Anh',
  'Chuyên Anh — Không Chỉ Là "Học Thêm Tiếng Anh"',
  'Chuyên Anh — Không Chỉ Là &quot;Học Thêm Tiếng Anh&quot;',
  'Về Nguồn Thông Tin',
  'Lộ Trình Du Học Chuẩn Bị Từ Việt Anh',
  'Câu Hỏi Thường Gặp',
  'Khám Phá Thêm',
  'Bước Tiếp Theo',
];

// ─── Helpers ───

async function directusFetch(path, init = {}) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus ${init.method || 'GET'} ${path} → ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// ─── Fix functions ───

function fixRemoveH1(content) {
  // Remove <h1>...</h1> tags from content — template already provides H1
  return content.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*/gi, '');
}

function fixPhonePlaceholders(content) {
  return content
    .replace(/0909\.xxx\.xxx/g, '0916 961 409')
    .replace(/0909\.?xxx\.?xxx/g, '0916 961 409')
    .replace(/href="tel:0909\d*"/g, 'href="tel:0916961409"')
    .replace(/📞\s*0909[.\s]*xxx[.\s]*xxx/g, '📞 0916 961 409');
}

function fixInternalLinks(content) {
  let result = content;
  for (const [wrong, correct] of Object.entries(LINK_FIXES)) {
    // Only replace exact href matches (not partial matches like /thcs-lop-6)
    const pattern = new RegExp(`href="${wrong.replace(/\//g, '\\/')}"`, 'g');
    result = result.replace(pattern, `href="${correct}"`);
  }
  return result;
}

function fixMarkdownTables(content) {
  // Match consecutive lines that look like markdown tables: | col | col |
  // They appear as <p>| ... |</p> in the HTML content
  const tableBlockRegex = /(?:<p>\s*\|[^<]+\|\s*<\/p>\s*)+/g;

  return content.replace(tableBlockRegex, (block) => {
    // Extract rows from <p>| ... |</p> lines
    const rowMatches = block.match(/<p>\s*(\|[^<]+\|)\s*<\/p>/g);
    if (!rowMatches || rowMatches.length < 2) return block;

    const rows = rowMatches.map(r => {
      const inner = r.replace(/<\/?p>/g, '').trim();
      return inner.split('|').filter(cell => cell.trim() !== '');
    });

    // Check if 2nd row is separator (---)
    const hasSeparator = rows.length >= 2 && rows[1].every(cell => /^[\s-:]+$/.test(cell));
    const headerRow = rows[0];
    const dataRows = hasSeparator ? rows.slice(2) : rows.slice(1);

    if (dataRows.length === 0) return block;

    let html = '<table>\n<thead>\n<tr>';
    for (const cell of headerRow) {
      html += `<th>${cell.trim()}</th>`;
    }
    html += '</tr>\n</thead>\n<tbody>\n';
    for (const row of dataRows) {
      html += '<tr>';
      for (let i = 0; i < headerRow.length; i++) {
        html += `<td>${(row[i] || '').trim()}</td>`;
      }
      html += '</tr>\n';
    }
    html += '</tbody>\n</table>';
    return html;
  });
}

function removeBoilerplateSections(content) {
  // Remove known boilerplate H2 sections and everything until next H2 or end
  let result = content;

  for (const title of BOILERPLATE_H2_TITLES) {
    // Match <h2>Title</h2> and everything until next <h2> or end
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `<h2>${escapedTitle}<\\/h2>[\\s\\S]*?(?=<h2>|$)`,
      'gi'
    );
    result = result.replace(regex, '');
  }

  // Remove the AIO intro boilerplate that appears right after H1
  // Pattern: <p>💡 <strong>Tóm tắt nhanh (AI Overview):</strong> ...
  result = result.replace(
    /<p>💡\s*<strong>Tóm tắt nhanh \(AI Overview\):<\/strong>[\s\S]*?<\/p>\s*/gi,
    ''
  );

  // Remove --- separators
  result = result.replace(/<p>---<\/p>\s*/g, '');

  // Remove ANY standalone credential badge lines (✅ ...)
  result = result.replace(
    /<p>✅[\s\S]*?<\/p>\s*/gi,
    ''
  );

  // Remove "💡 Câu trả lời nhanh:" paragraphs (boilerplate quick-answer blocks)
  result = result.replace(
    /<p>💡\s*<strong>Câu trả lời nhanh:<\/strong>[\s\S]*?<\/p>\s*/gi,
    ''
  );

  // Remove inline 💡 Tóm tắt nhanh within mixed paragraphs
  // Pattern: ", 💡 <strong>Tóm tắt nhanh (AI Overview):</strong> ... </p>" at end of a <p>
  result = result.replace(
    /,?\s*💡\s*<strong>Tóm tắt nhanh \(AI Overview\):<\/strong>[\s\S]*?(?=<\/p>)/gi,
    ''
  );

  // Remove any remaining standalone 💡 boilerplate paragraphs
  result = result.replace(
    /<p>💡[\s\S]*?<\/p>\s*/gi,
    ''
  );

  // Remove "Tại Sao Chọn Trường Việt Anh?" boilerplate H2/H3
  const extraBoilerH = [
    'Tại Sao Chọn Trường Việt Anh\\?',
    'Giá Trị Cốt Lõi',
    'Giáo Dục Hiện Đại: Xu Hướng 2026',
    '3 Campus Tại TPHCM',
    '3 Mô Hình Học Tập',
    'Lộ Trình Tiếng Anh Theo Cấp',
    'Những Điều Phụ Huynh Cần Chuẩn Bị',
    'So Sánh: Tự Chuẩn Bị vs Chuẩn Bị Qua Trường',
    'So Sánh PDR vs Sổ Liên Lạc Truyền Thống',
  ];
  for (const t of extraBoilerH) {
    const rx = new RegExp(`<h[23]>${t}<\\/h[23]>[\\s\\S]*?(?=<h[23]>|<h2>|$)`, 'gi');
    result = result.replace(rx, '');
  }

  // Remove boilerplate single-line intros
  result = result.replace(
    /<p>7 trụ cột:[\s\S]*?<\/p>\s*/gi,
    ''
  );

  // Clean up multiple consecutive empty lines / whitespace
  result = result.replace(/\n{3,}/g, '\n\n').trim();

  return result;
}

function generateExcerpt(content, maxLen = 160) {
  const plain = stripHtml(content);
  if (plain.length <= maxLen) return plain;
  // Cut at last space before maxLen
  const cut = plain.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 80 ? cut.slice(0, lastSpace) : cut) + '...';
}

// ─── Main ───

async function main() {
  console.log(`\n🔧 Blog Post CMS Fixer`);
  console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN (use --apply to write)' : '✏️  APPLYING CHANGES'}`);
  console.log(`   Directus: ${DIRECTUS_URL}`);
  console.log(`   Batch size: ${BATCH_SIZE}\n`);

  // Fetch all posts with pagination
  let allPosts = [];
  let page = 0;
  let hasMore = true;

  console.log('📥 Fetching all posts...');
  while (hasMore) {
    const data = await directusFetch(
      `/items/posts?fields=id,title,slug,excerpt,content,status&limit=${BATCH_SIZE}&offset=${page * BATCH_SIZE}&sort=id`
    );
    allPosts = [...allPosts, ...data.data];
    hasMore = data.data.length === BATCH_SIZE;
    page++;
    process.stdout.write(`   Fetched ${allPosts.length} posts...\r`);
  }
  console.log(`\n✅ Total: ${allPosts.length} posts\n`);

  const stats = {
    total: allPosts.length,
    h1Removed: 0,
    excerptGenerated: 0,
    phoneFixed: 0,
    linksFixed: 0,
    tablesFixed: 0,
    boilerplateRemoved: 0,
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  const updates = [];

  for (const post of allPosts) {
    const content = post.content || '';
    if (!content || content.length < 50) {
      stats.skipped++;
      continue;
    }

    let newContent = content;
    let newExcerpt = post.excerpt || null;
    const isAIRewritten = post.id >= 560;
    const changes = [];

    // 1. Remove H1 from content
    const beforeH1 = newContent;
    newContent = fixRemoveH1(newContent);
    if (newContent !== beforeH1) {
      changes.push('h1');
      stats.h1Removed++;
    }

    // 2. Fix phone placeholders
    const beforePhone = newContent;
    newContent = fixPhonePlaceholders(newContent);
    if (newContent !== beforePhone) {
      changes.push('phone');
      stats.phoneFixed++;
    }

    // 3. Fix internal links
    const beforeLinks = newContent;
    newContent = fixInternalLinks(newContent);
    if (newContent !== beforeLinks) {
      changes.push('links');
      stats.linksFixed++;
    }

    // 4. Convert markdown tables
    const beforeTables = newContent;
    newContent = fixMarkdownTables(newContent);
    if (newContent !== beforeTables) {
      changes.push('tables');
      stats.tablesFixed++;
    }

    // 5. Remove boilerplate (AI-rewritten posts only)
    if (isAIRewritten) {
      const beforeBoiler = newContent;
      newContent = removeBoilerplateSections(newContent);
      if (newContent !== beforeBoiler) {
        changes.push('boilerplate');
        stats.boilerplateRemoved++;
      }
    }

    // 6. Generate excerpt if missing OR if current excerpt contains boilerplate
    const excerptIsBad = !newExcerpt || newExcerpt.trim() === '' ||
      newExcerpt.includes('✅') || newExcerpt.includes('Tóm tắt nhanh') ||
      newExcerpt.includes('AI Overview') ||
      newExcerpt.includes('Câu trả lời nhanh') || newExcerpt.includes('💡') ||
      newExcerpt.includes('Tại Sao Chọn Trường Việt Anh') ||
      newExcerpt.includes('Giáo Dục Hiện Đại');
    if (excerptIsBad) {
      newExcerpt = generateExcerpt(newContent);
      if (newExcerpt) {
        changes.push('excerpt');
        stats.excerptGenerated++;
      }
    }

    // 7. If content is empty/tiny after cleanup, mark as draft
    const contentText = stripHtml(newContent);
    let setDraft = false;
    if (contentText.length < 50 && post.status === 'published') {
      setDraft = true;
      changes.push('→draft');
      stats.setDraft = (stats.setDraft || 0) + 1;
    }

    if (changes.length > 0) {
      updates.push({
        id: post.id,
        title: post.title,
        content: newContent,
        excerpt: newExcerpt,
        changes,
        setDraft,
      });
    } else {
      stats.skipped++;
    }
  }

  console.log('📊 Analysis results:');
  console.log(`   H1 removed: ${stats.h1Removed}`);
  console.log(`   Excerpt generated: ${stats.excerptGenerated}`);
  console.log(`   Phone fixed: ${stats.phoneFixed}`);
  console.log(`   Links fixed: ${stats.linksFixed}`);
  console.log(`   Tables converted: ${stats.tablesFixed}`);
  console.log(`   Boilerplate removed: ${stats.boilerplateRemoved}`);
  console.log(`   Set to draft (empty): ${stats.setDraft || 0}`);
  console.log(`   Posts to update: ${updates.length}`);
  console.log(`   Skipped (no changes): ${stats.skipped}\n`);

  if (DRY_RUN) {
    // Show sample changes
    console.log('📝 Sample changes (first 5):');
    for (const u of updates.slice(0, 5)) {
      console.log(`   ID:${u.id} | ${u.title.slice(0, 50)} → [${u.changes.join(', ')}]`);
      if (u.changes.includes('excerpt')) {
        console.log(`     excerpt: "${u.excerpt?.slice(0, 100)}..."`);
      }
    }
    console.log(`\n💡 Run with --apply to write changes to CMS\n`);
    return;
  }

  // Apply changes
  console.log(`✏️  Applying ${updates.length} updates...`);
  let applied = 0;

  for (const u of updates) {
    try {
      const body = { content: u.content };
      if (u.changes.includes('excerpt')) {
        body.excerpt = u.excerpt;
      }
      if (u.setDraft) {
        body.status = 'draft';
      }

      await directusFetch(`/items/posts/${u.id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      });

      applied++;
      if (applied % 20 === 0 || applied === updates.length) {
        console.log(`   ✅ ${applied}/${updates.length} updated`);
      }
    } catch (err) {
      console.error(`   ❌ ID:${u.id} failed: ${err.message}`);
      stats.errors++;
    }
  }

  stats.updated = applied;

  console.log(`\n✅ Done!`);
  console.log(`   Updated: ${stats.updated}`);
  console.log(`   Errors: ${stats.errors}`);
  console.log(`   Skipped: ${stats.skipped}\n`);
}

main().catch((err) => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
