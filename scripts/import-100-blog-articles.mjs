#!/usr/bin/env node
/**
 * Import 100 blog articles tu Google Drive vao Directus.
 *
 * Source:
 *   /Users/manhduongnguyen/Library/CloudStorage/GoogleDrive-duong@truongvietanh.com/My Drive/2. Areas/AI/Codex Blog/truongvietanh.com articles/100 bài tách riêng/*.md
 *
 * Steps:
 *   1) Parse mỗi file .md → trích title, slug, content (theo cấu trúc sections cố định)
 *   2) Convert content sang HTML, fix internal links → /blog/<slug>
 *   3) Tự gán category (mam-non / tieu-hoc / thcs / thpt / hoat-dong / hoc-bong / phu-huynh / tieng-anh / giao-duc) theo từ khóa
 *   4) Pick featured image từ R2 theo category + topic
 *   5) POST vào Directus collection `posts` (status=published)
 *
 * Run: node scripts/import-100-blog-articles.mjs [--dry-run] [--limit=N]
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = '/Users/manhduongnguyen/Library/CloudStorage/GoogleDrive-duong@truongvietanh.com/My Drive/2. Areas/AI/Codex Blog/truongvietanh.com articles/100 bài tách riêng';
const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055';
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN || 'tva_0b80f9b6cc9c494d98faf0a2a1a966e7';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const LIMIT = (() => {
    const m = args.find(a => a.startsWith('--limit='));
    return m ? parseInt(m.split('=')[1], 10) : Infinity;
})();
const ONLY = (() => {
    const m = args.find(a => a.startsWith('--only='));
    return m ? m.split('=')[1] : null;
})();

// ---------------------------------------------------------------------------
// R2 IMAGE POOLS — phân loại theo cấp học / chủ đề
// ---------------------------------------------------------------------------
const IMAGES = {
    'mam-non': [
        'https://media.truongvietanh.com/images/vui-ve/hoc-sinh-choi-1.webp',
        'https://media.truongvietanh.com/images/vui-ve/hoc-sinh-choi-2.webp',
        'https://media.truongvietanh.com/images/vui-ve/hoc-sinh-choi-3.webp',
        'https://media.truongvietanh.com/images/vui-ve/hoc-sinh-choi-4.webp',
        'https://media.truongvietanh.com/images/vui-ve/hoc-sinh-choi-5.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07097-1.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07099-2.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07102-3.webp',
        'https://media.truongvietanh.com/images/phu-huynh/hoc-sinh-va-phu-huynh-1.webp',
        'https://media.truongvietanh.com/images/phu-huynh/hoc-sinh-va-phu-huynh-10.webp',
    ],
    'tieu-hoc': [
        'https://media.truongvietanh.com/images/du-an/dsc07105-4.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07109-5.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07112-6.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07114-7.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07126-8.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07130-9.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07132-10.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02486.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02488.webp',
        'https://media.truongvietanh.com/images/vui-ve/dsc02689.webp',
        'https://media.truongvietanh.com/images/vui-ve/dsc02696.webp',
    ],
    'thcs': [
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02493.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02496.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02497.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02498.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02504.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02505.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02508.webp',
        'https://media.truongvietanh.com/images/olympic/dscf5898.webp',
        'https://media.truongvietanh.com/images/olympic/dscf6725.webp',
        'https://media.truongvietanh.com/images/olympic/dscf6869.webp',
    ],
    'thpt': [
        'https://media.truongvietanh.com/images/olympic/dscf6999.webp',
        'https://media.truongvietanh.com/images/olympic/dscf7289.webp',
        'https://media.truongvietanh.com/images/olympic/dscf9177.webp',
        'https://media.truongvietanh.com/images/olympic/download.webp',
        'https://media.truongvietanh.com/images/olympic/download-1.webp',
        'https://media.truongvietanh.com/images/olympic/download-2.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02510.webp',
    ],
    'hoat-dong': [
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00357.webp',
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00476.webp',
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00480.webp',
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00499.webp',
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00511.webp',
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00530.webp',
        'https://media.truongvietanh.com/images/da-ngoai/09032025-dsc00622.webp',
        'https://media.truongvietanh.com/images/khong-gian-the-thao/hoc-sinh-choi-the-thao-1.webp',
        'https://media.truongvietanh.com/images/khong-gian-the-thao/hoc-sinh-choi-the-thao-2.webp',
        'https://media.truongvietanh.com/images/khong-gian-the-thao/hoc-sinh-choi-the-thao-3.webp',
    ],
    'hoc-bong': [
        'https://media.truongvietanh.com/images/olympic/dscf6999.webp',
        'https://media.truongvietanh.com/images/olympic/dscf6725.webp',
        'https://media.truongvietanh.com/images/olympic/dscf9177.webp',
    ],
    'phu-huynh': [
        'https://media.truongvietanh.com/images/phu-huynh/cdhp-1-09435.webp',
        'https://media.truongvietanh.com/images/phu-huynh/cdhp-1-09576.webp',
        'https://media.truongvietanh.com/images/phu-huynh/cdhp-2-09540.webp',
        'https://media.truongvietanh.com/images/phu-huynh/cdhp-2-09640.webp',
        'https://media.truongvietanh.com/images/phu-huynh/dsc07320.webp',
        'https://media.truongvietanh.com/images/phu-huynh/dsc07431.webp',
    ],
    'tieng-anh': [
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02486.webp',
        'https://media.truongvietanh.com/images/thuyet-trinh/dsc02488.webp',
        'https://media.truongvietanh.com/images/du-an/dsc07097-1.webp',
        'https://media.truongvietanh.com/images/giao-vien/20201005-dsc00065.webp',
        'https://media.truongvietanh.com/images/giao-vien/20201005-dsc00068.webp',
    ],
    'giao-duc': [
        'https://media.truongvietanh.com/images/giao-vien/20201005-dsc00065.webp',
        'https://media.truongvietanh.com/images/giao-vien/20201005-dsc00195.webp',
        'https://media.truongvietanh.com/images/giao-vien/20201005-dsc00219.webp',
        'https://media.truongvietanh.com/images/giao-vien/20201005-dsc00254.webp',
        'https://media.truongvietanh.com/images/giao-vien/dsc-3244.webp',
        'https://media.truongvietanh.com/images/giao-vien/dsc-3313.webp',
    ],
};

// ---------------------------------------------------------------------------
// CATEGORY DETECTION từ tên file / nội dung
// ---------------------------------------------------------------------------
function detectCategory(filename, title, content) {
    // CHỈ dùng filename + title (body có thể nhắc nhiều cấp)
    const txt = (filename + ' ' + title).toLowerCase();

    if (/học bổng/i.test(txt)) return 'hoc-bong';

    // Ưu tiên 1: từ khóa cấp học CỤ THỂ trong filename/title
    if (/\bthpt\b/i.test(txt)) return 'thpt';
    if (/\bthcs\b/i.test(txt)) return 'thcs';
    if (/(mầm non|mẫu giáo|nhà trẻ|preschool|lớp lá|cô mầm non|giáo viên mầm non)/i.test(txt)) return 'mam-non';
    if (/(tiểu học|tiền tiểu học|vào lớp 1|chuẩn bị.*lớp 1|lớp 1|lớp 2|lớp 3|lớp 4|lớp 5)/i.test(txt)) return 'tieu-hoc';

    // Ưu tiên 2: signals gián tiếp
    if (/(cấp 3|lớp 10|lớp 11|lớp 12|gpa|đại học|du học)/i.test(txt)) return 'thpt';
    if (/(cấp 2|lớp 6|lớp 7|lớp 8|lớp 9|trung học cơ sở|dậy thì)/i.test(txt)) return 'thcs';

    // Hoạt động ngoại khóa / thể thao
    if (/(ngoại khóa|thể thao|dã ngoại|trại hè)/i.test(txt)) return 'hoat-dong';
    // Tiếng Anh / song ngữ
    if (/(song ngữ|tiếng anh|bilingual|ielts)/i.test(txt)) return 'tieng-anh';
    // Phụ huynh
    if (/(phụ huynh|cha mẹ đồng hành)/i.test(txt)) return 'phu-huynh';

    return 'giao-duc';
}

// ---------------------------------------------------------------------------
// SLUG sanitizer
// ---------------------------------------------------------------------------
function sanitizeSlug(s) {
    return (s || '')
        .replace(/^\/+|\/+$/g, '')
        .replace(/^https?:\/\/[^\/]+\//i, '')
        .replace(/\/+/g, '-')
        .replace(/[^a-z0-9-]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase()
        .slice(0, 200);
}

// Vietnamese diacritic remover for slug fallback
function viToSlug(s) {
    const map = {
        à: 'a', á: 'a', ạ: 'a', ả: 'a', ã: 'a', â: 'a', ầ: 'a', ấ: 'a', ậ: 'a', ẩ: 'a', ẫ: 'a',
        ă: 'a', ằ: 'a', ắ: 'a', ặ: 'a', ẳ: 'a', ẵ: 'a', è: 'e', é: 'e', ẹ: 'e', ẻ: 'e', ẽ: 'e',
        ê: 'e', ề: 'e', ế: 'e', ệ: 'e', ể: 'e', ễ: 'e', ì: 'i', í: 'i', ị: 'i', ỉ: 'i', ĩ: 'i',
        ò: 'o', ó: 'o', ọ: 'o', ỏ: 'o', õ: 'o', ô: 'o', ồ: 'o', ố: 'o', ộ: 'o', ổ: 'o', ỗ: 'o',
        ơ: 'o', ờ: 'o', ớ: 'o', ợ: 'o', ở: 'o', ỡ: 'o', ù: 'u', ú: 'u', ụ: 'u', ủ: 'u', ũ: 'u',
        ư: 'u', ừ: 'u', ứ: 'u', ự: 'u', ử: 'u', ữ: 'u', ỳ: 'y', ý: 'y', ỵ: 'y', ỷ: 'y', ỹ: 'y',
        đ: 'd',
    };
    return s.toLowerCase().split('').map(c => map[c] !== undefined ? map[c] : c).join('');
}

function slugFromTitle(title) {
    return sanitizeSlug(viToSlug(title.replace(/[?!.,]/g, ' ').replace(/\s+/g, '-')));
}

// ---------------------------------------------------------------------------
// MARKDOWN PARSER (tùy chỉnh cho cấu trúc bài này)
// ---------------------------------------------------------------------------
const SECTION_HEADERS = [
    /^Tóm tắt nhanh\b/i,
    /^Menu bài viết\b/i,
    /^\d+\.\s+/,                       // 1. Một góc nhìn ...
    /^Mid-Article CTA\b/i,
    /^Lead Magnet (giữa bài|gi[ữu]a b[àa]i)/i,
    /^Internal link ưu tiên/i,
    /^FAQ\b/i,
];

function parseMd(raw) {
    // 6 dòng đầu là metadata
    const lines = raw.split(/\r?\n/);
    const meta = {
        title: lines[0]?.trim().replace(/[?]+$/, '?'),
        id: '',
        slug: '',
        keyword: '',
    };
    for (let i = 1; i < Math.min(10, lines.length); i++) {
        const m = lines[i].match(/^(ID|Slug đề xuất|Từ khóa chính|Cluster):\s*(.+)$/i);
        if (m) {
            const k = m[1].toLowerCase();
            const v = m[2].trim();
            if (k === 'id') meta.id = v;
            else if (k.startsWith('slug')) meta.slug = v;
            else if (k.startsWith('từ khóa chính') || k.startsWith('tu khoa chinh')) meta.keyword = v;
        }
    }
    // body bắt đầu sau metadata block (dòng trống đầu tiên sau metadata)
    let bodyStart = 0;
    for (let i = 1; i < lines.length; i++) {
        if (/^Search intent:/i.test(lines[i]) || /^Cluster:/i.test(lines[i])) {
            bodyStart = i + 1;
        }
    }
    const body = lines.slice(bodyStart).join('\n');
    return { meta, body };
}

function escapeHtml(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function rewriteHref(url) {
    const internal = url.match(/^https?:\/\/(?:www\.)?truongvietanh\.com(\/.*)$/i);
    if (!internal) return url;
    const p = internal[1].replace(/\/+$/, '');
    const slug = p.replace(/^\//, '');
    if (!slug) return '/';
    if (slug.startsWith('blog/')) return '/' + slug;
    return '/blog/' + slug;
}

function inlineFormat(text) {
    let out = escapeHtml(text);
    // Restore entities đã encode trong source
    out = out.replace(/&amp;#x27;/g, '\'').replace(/&amp;#39;/g, '\'').replace(/&amp;quot;/g, '"').replace(/&amp;amp;/g, '&');
    // Pattern "anchor text (URL)" — capture 1-8 từ Vietnamese ngay trước (URL).
    // \p{L} là Unicode letter, dừng ở dấu chấm/phẩy/ngoặc.
    out = out.replace(/((?:[\p{L}\d][\p{L}\d'-]*\s+){1,11}[\p{L}\d][\p{L}\d'-]*)\s*\((https?:\/\/[^\s)]+)\)/gu, (m, txt, url) => {
        const href = rewriteHref(url);
        // Trim leading "Đọc thêm" / "Xem thêm" để không nằm trong anchor
        const cleaned = txt.replace(/^(Đọc thêm|Đọc bài|Xem thêm|Tham khảo)\s+/i, '');
        const prefix = txt.length > cleaned.length ? txt.slice(0, txt.length - cleaned.length) : '';
        return `${prefix}<a href="${href}">${cleaned}</a>`;
    });
    // Bare URLs còn lại
    out = out.replace(/(?<![">])(https?:\/\/[^\s<)]+)/g, (m, url) => {
        const href = rewriteHref(url);
        return `<a href="${href}">${href}</a>`;
    });
    // Bold **text**
    out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return out;
}

function buildHtml(body, ctx) {
    const blocks = body.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);

    // PASS 1 — phân loại từng block
    const items = [];
    for (const block of blocks) {
        const firstLine = block.split('\n')[0].trim();
        if (/^Menu bài viết\b/i.test(firstLine)) {
            items.push({ type: 'menu', block });
        } else if (/^Tóm tắt nhanh/i.test(firstLine)) {
            items.push({ type: 'summary', block });
        } else if (/^Lead Magnet|^Mid-Article CTA/i.test(firstLine)) {
            items.push({ type: 'cta', block });
        } else if (/^Internal link ưu tiên/i.test(firstLine)) {
            items.push({ type: 'internal', block });
        } else {
            // Top-level numbered section header: 1-9, sometimes with parenthetical
            // PHẢI có >= 2 từ chữ Việt sau số (để tránh nhầm với "1. multi-age: ..." sub-items)
            const m = firstLine.match(/^(\d+)\.\s+([^\n]{4,200})$/);
            if (m && /\p{L}.{2,}/u.test(m[2]) && parseInt(m[1], 10) <= 9 && !firstLine.includes(':')) {
                const num = parseInt(m[1], 10);
                let head = m[2].replace(/\s*\([^)]*\)\s*$/, '').trim();
                items.push({ type: 'section', num, head, block });
            } else {
                items.push({ type: 'para', block });
            }
        }
    }

    // PASS 2 — render
    const out = [];
    let inserted_hero = false;
    let currentSection = 0; // số section đang xử lý
    let pendingSubItems = []; // gom các "1. xxx: ..." block dưới section 4

    function flushSubItems() {
        if (!pendingSubItems.length) return;
        out.push('<ul>');
        for (const sub of pendingSubItems) {
            const m = sub.match(/^\d+\.\s+([^:]+):\s*([\s\S]+)$/);
            if (m) {
                out.push(`<li><strong>${escapeHtml(m[1].trim())}:</strong> ${inlineFormat(m[2].trim().replace(/\s+/g, ' '))}</li>`);
            } else {
                out.push(`<li>${inlineFormat(sub.replace(/\s+/g, ' '))}</li>`);
            }
        }
        out.push('</ul>');
        pendingSubItems = [];
    }

    for (let i = 0; i < items.length; i++) {
        const it = items[i];

        if (it.type === 'menu') continue;

        if (it.type === 'summary') {
            // Skip — đã có ở field excerpt, render ở blog template (.blog-article__excerpt)
            continue;
        }

        if (it.type === 'cta') {
            flushSubItems();
            const rest = it.block.split('\n').slice(1).join(' ').trim().replace(/^🔔\s*/, '');
            out.push(`<div class="blog-cta-inline" style="margin:2rem 0"><div class="blog-cta-inline__inner" style="background:linear-gradient(135deg,#0d1b3e,#1a1a5e);color:#fff;border-radius:12px;padding:1.5rem 2rem;text-align:center"><p style="margin:0;font-size:1.05rem;line-height:1.6">${inlineFormat(rest)}</p></div></div>`);
            continue;
        }

        if (it.type === 'internal') {
            flushSubItems();
            const lis = it.block.split('\n').slice(1).map(l => l.trim()).filter(l => l.startsWith('-'));
            if (!lis.length) continue;
            out.push('<h2>Đọc thêm</h2>');
            out.push('<ul>');
            for (const li of lis) {
                let txt = li.replace(/^-\s*/, '').trim();
                // Bỏ phần " - Anchor text đề xuất: ..."
                txt = txt.replace(/\s*-\s*Anchor text đề xuất:.*$/i, '');
                out.push(`<li>${inlineFormat(txt)}</li>`);
            }
            out.push('</ul>');
            continue;
        }

        if (it.type === 'section') {
            flushSubItems();
            currentSection = it.num;
            out.push(`<h2>${escapeHtml(it.num + '. ' + it.head)}</h2>`);

            if (!inserted_hero) {
                out.push(`<figure style="margin:1.5rem 0"><img src="${ctx.heroImg}" alt="${escapeHtml(ctx.title)}" loading="lazy" width="1200" style="border-radius:8px;width:100%;height:auto" /></figure>`);
                inserted_hero = true;
            }

            const rest = it.block.split('\n').slice(1).join('\n').trim();
            if (rest) {
                if (currentSection === 7) {
                    renderFaqBlock(rest, out);
                } else if (currentSection === 4 && /^\d+\.\s+[^:]+:\s+/.test(rest.split('\n')[0])) {
                    pendingSubItems.push(rest.replace(/\s+/g, ' '));
                } else {
                    renderParagraphOrList(rest, out);
                }
            }
            continue;
        }

        // type === 'para'
        const firstLine = it.block.split('\n')[0].trim();

        // Section 7 (FAQ) — block tiếp theo cũng là Q/A
        if (currentSection === 7) {
            renderFaqBlock(it.block, out);
            continue;
        }

        // Section 4 (Việt Anh làm gì khác?) — sub-numbered items "1. method: desc"
        if (currentSection === 4 && /^\d+\.\s+[^:]+:\s+/.test(firstLine)) {
            // gom thành list, flush khi gặp non-matching block
            pendingSubItems.push(it.block.replace(/\s+/g, ' '));
            continue;
        }

        flushSubItems();
        renderParagraphOrList(it.block, out);
    }
    flushSubItems();

    return out.join('\n');
}

function renderFaqBlock(block, out) {
    // FAQ block thường có format: "Question?\nAnswer line(s)"
    // Phân biệt Q vs A: Q kết thúc với '?' và là dòng đầu
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) return;
    let q = null, aLines = [];
    const flush = () => {
        if (q) {
            out.push('<div class="faq-item">');
            out.push(`<h3>${escapeHtml(q)}</h3>`);
            out.push(`<p>${inlineFormat(aLines.join(' '))}</p>`);
            out.push('</div>');
        }
        q = null; aLines = [];
    };
    for (const line of lines) {
        if (/\?\s*$/.test(line) && q === null) {
            q = line;
        } else if (/\?\s*$/.test(line) && q !== null) {
            // new Q without blank — flush previous
            flush();
            q = line;
        } else {
            aLines.push(line);
        }
    }
    flush();
}

function renderParagraphOrList(block, out) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    // Detect bullet list (-, •)
    if (lines.length >= 2 && lines.every(l => /^[-•]\s+/.test(l))) {
        out.push('<ul>');
        for (const l of lines) out.push(`<li>${inlineFormat(l.replace(/^[-•]\s+/, ''))}</li>`);
        out.push('</ul>');
        return;
    }
    // Detect numbered list (1. 2. 3. ...)
    if (lines.length >= 2 && lines.every(l => /^\d+\.\s+/.test(l))) {
        out.push('<ol>');
        for (const l of lines) out.push(`<li>${inlineFormat(l.replace(/^\d+\.\s+/, ''))}</li>`);
        out.push('</ol>');
        return;
    }
    // Mixed — paragraph
    out.push(`<p>${inlineFormat(lines.join(' '))}</p>`);
}

// ---------------------------------------------------------------------------
// EXCERPT
// ---------------------------------------------------------------------------
function pickExcerpt(body) {
    // Tìm block sau "Tóm tắt nhanh" — KHÔNG được bắt vào menu (toàn dòng "- xxx")
    const blocks = body.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
    for (let i = 0; i < blocks.length; i++) {
        if (/^Tóm tắt nhanh\b/i.test(blocks[i].split('\n')[0])) {
            // Đoạn ngay trên cùng block (sau dòng "Tóm tắt nhanh")
            const rest = blocks[i].split('\n').slice(1).join(' ').trim();
            if (rest && !/^(-|\*)\s/.test(rest)) {
                return rest.length > 230 ? rest.slice(0, 227).replace(/[\s,;:.\-]+\S*$/, '') + '…' : rest;
            }
            // Hoặc block kế tiếp (nếu summary block chỉ có heading)
            const next = blocks[i + 1];
            if (next && !/^(-|\*)\s/.test(next.split('\n')[0])) {
                const t = next.replace(/\s+/g, ' ').trim();
                return t.length > 230 ? t.slice(0, 227).replace(/[\s,;:.\-]+\S*$/, '') + '…' : t;
            }
        }
    }
    return '';
}

// ---------------------------------------------------------------------------
// FEATURED IMAGE PICKER
// ---------------------------------------------------------------------------
function pickFeaturedImage(category, idx) {
    const pool = IMAGES[category] || IMAGES['giao-duc'];
    return pool[idx % pool.length];
}

// ---------------------------------------------------------------------------
// DIRECTUS REQUEST
// ---------------------------------------------------------------------------
async function directusRequest(method, endpoint, body) {
    const opts = {
        method,
        headers: {
            'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
            'Content-Type': 'application/json',
        },
    };
    if (body) opts.body = JSON.stringify(body);
    const res = await fetch(`${DIRECTUS_URL}${endpoint}`, opts);
    const text = await res.text();
    if (!res.ok) {
        throw new Error(`${method} ${endpoint}: ${res.status} ${text.substring(0, 300)}`);
    }
    return text ? JSON.parse(text) : null;
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
async function run() {
    console.log(`Source: ${SRC_DIR}`);
    console.log(`Directus: ${DIRECTUS_URL}`);
    console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
    if (LIMIT !== Infinity) console.log(`Limit: ${LIMIT}`);
    if (ONLY) console.log(`Only matching: ${ONLY}`);
    console.log('');

    // 1) Load existing slugs
    let existingSlugs = new Set();
    try {
        const data = await directusRequest('GET', '/items/posts?fields=slug&limit=-1');
        existingSlugs = new Set(data.data.map(p => p.slug));
        console.log(`Existing posts: ${existingSlugs.size}`);
    } catch (e) {
        console.error('Cannot fetch existing slugs:', e.message);
        process.exit(1);
    }

    // 2) Walk source dir
    const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.md')).sort();
    console.log(`Source files: ${files.length}`);
    console.log('');

    let imported = 0, skipped = 0, failed = 0, idx = 0;
    const report = [];

    for (const file of files) {
        if (idx >= LIMIT) break;
        if (ONLY && !file.toLowerCase().includes(ONLY.toLowerCase())) continue;

        const filepath = path.join(SRC_DIR, file);
        const raw = fs.readFileSync(filepath, 'utf8');
        const { meta, body } = parseMd(raw);

        // Title — ưu tiên từ line 1 của file
        let title = (meta.title || file.replace(/\.md$/, '')).replace(/\s*\?$/, '?').trim();
        if (!title.endsWith('?') && !title.endsWith('.') && !title.endsWith('!')) {
            // Nếu title không có dấu câu cuối, thêm dấu chấm trông gọn hơn — nhưng giữ nguyên cho đẹp
        }

        // Slug — ưu tiên slug đề xuất, fallback từ title
        let slug = '';
        if (meta.slug) {
            slug = sanitizeSlug(meta.slug.replace(/^\/+|\/+$/g, '').replace(/\//g, '-'));
        }
        if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
            slug = slugFromTitle(title);
        }

        if (existingSlugs.has(slug)) {
            console.log(`  ⊘ skip (exists): ${slug}`);
            skipped++;
            continue;
        }

        const category = detectCategory(file, title, body);
        const heroImg = pickFeaturedImage(category, idx);
        const excerpt = pickExcerpt(body);

        const html = buildHtml(body, { title, heroImg });

        const post = {
            title,
            slug,
            status: 'published',
            excerpt,
            content: html,
            category,
            published_at: new Date().toISOString(),
        };

        report.push({ file, slug, category, heroImg, excerpt: excerpt.slice(0, 80) });

        if (DRY_RUN) {
            console.log(`  [dry] ${slug}  (cat=${category})`);
            if (process.env.DEBUG_FILE && file.toLowerCase().includes(process.env.DEBUG_FILE.toLowerCase())) {
                fs.writeFileSync('/tmp/debug-post.html',
                    `<!doctype html><meta charset="utf-8"><title>${title}</title><body style="max-width:760px;margin:2rem auto;font-family:Inter,sans-serif;font-size:1.05rem;line-height:1.7"><h1>${title}</h1><p style="background:#f1f5f9;padding:1rem;border-left:4px solid #D4A843"><em>${excerpt}</em></p>${html}</body>`);
                console.log('  → debug HTML: /tmp/debug-post.html');
            }
        } else {
            try {
                await directusRequest('POST', '/items/posts', post);
                imported++;
                existingSlugs.add(slug);
                console.log(`  ✓ ${idx + 1}/${files.length}  ${slug}  (cat=${category})`);
            } catch (e) {
                failed++;
                console.error(`  ✗ ${slug}: ${e.message.substring(0, 200)}`);
            }
        }
        idx++;
    }

    console.log('\n========================================');
    console.log(`Imported: ${imported}`);
    console.log(`Skipped:  ${skipped}`);
    console.log(`Failed:   ${failed}`);
    console.log('========================================');

    // Save report
    if (DRY_RUN) {
        const reportPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../tmp-import-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`Report: ${reportPath}`);
    }
}

run().catch(err => {
    console.error('Fatal:', err);
    process.exit(1);
});
