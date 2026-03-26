#!/usr/bin/env node
/**
 * URL Classification Script for truongvietanh.com
 * Reads master-index-sheet.csv and auto-classifies URLs into 28 Template Classes
 * Outputs enriched CSV ready for Google Sheets import
 */

const fs = require('fs');
const path = require('path');

// === 28 Template Classes ===
const TEMPLATE_CLASSES = {
  FEE_CAPTURE: '1. Class Fee Capture Landing',
  CAMPUS_TOUR: '2. Class Campus Tour / Local Admission Landing',
  OPEN_DAY: '3. Class Open Day / Event Landing',
  TRIAL_CLASS: '4. Class Trial Class / Học Thử Landing',
  TIKTOK_UGC: '5. Class TikTok / Reels Mobile-First UGC Landing',
  ENROLLMENT: '6. Class Enrollment / Registration Form Landing',
  LEVEL_PILLAR: '7. Class Level Pillar',
  CURRICULUM: '8. Class Curriculum / Program Overview',
  CAMPUS_PROFILE: '9. Class Master Campus Profile',
  VIRTUAL_TOUR: '10. Class Virtual Tour 360°',
  LOCAL_INTENT: '11. Class Local Intent Landing',
  PARENT_HUB: '12. Class Parent Hub Article',
  COMPARISON: '13. Class Comparison Engine Page',
  FAQ: '14. Class AI-Ready FAQ / Answer Engine',
  TUITION: '15. Class Tuition & Fee Structure Page',
  OBJECTION: '16. Class Objection Handler Page',
  HOMEPAGE: '17. Class Homepage',
  CONTACT: '18. Class Contact / Multiple Locations Page',
  DYNAMIC_COMPARE: '19. Class Dynamic Comparison',
  THANK_YOU: '20. Class Smart Thank-You Page',
  RETENTION: '21. Class Retention & Referral Page',
  BRAND: '22. Class Corporate Brand & Leadership',
  TEACHER_PROFILE: '23. Class Teacher / Faculty Profile Page',
  ALUMNI: '24. Class Alumni & Success Stories',
  CAREERS: '25. Class Talent Acquisition',
  NEWS_EVENTS: '26. Class News & Events Hub / PR',
  LEGAL: '27. Class Legal & Utility Info',
  OTHER: '28. Other (Khác)',
};

// === Classification Rules (order matters - first match wins) ===
const RULES = [
  // Homepage
  { pattern: /^https:\/\/truongvietanh\.com$/, class: TEMPLATE_CLASSES.HOMEPAGE, pageType: 'Homepage', priority: 'High' },

  // Fee / Học phí pages
  { pattern: /hoc-phi|tuition|fee|bang-gia/i, class: TEMPLATE_CLASSES.TUITION, pageType: 'Tuition Page', priority: 'High' },

  // Enrollment / Registration
  { pattern: /dang-ky|enrollment|registration|nop-ho-so|nhap-hoc/i, class: TEMPLATE_CLASSES.ENROLLMENT, pageType: 'Conversion Landing Page', priority: 'High' },

  // Campus Tour / Tham quan
  { pattern: /tham-quan|campus-tour|tham-truong/i, class: TEMPLATE_CLASSES.CAMPUS_TOUR, pageType: 'Conversion Landing Page', priority: 'High' },

  // Open Day / Events
  { pattern: /open-day|ngay-hoi|su-kien|prom-night|le-khai-giang|le-tong-ket|le-be-giang|le-phat-dong|le-truyen-thong|le-ky-ket/i, class: TEMPLATE_CLASSES.OPEN_DAY, pageType: 'News / Announcement', priority: 'Medium' },

  // Trial Class / Học thử
  { pattern: /hoc-thu|trial|trai-nghiem/i, class: TEMPLATE_CLASSES.TRIAL_CLASS, pageType: 'Conversion Landing Page', priority: 'High' },

  // Contact / Liên hệ
  { pattern: /lien-he|contact|khieu-nai|y-kien|feedback|hotline/i, class: TEMPLATE_CLASSES.CONTACT, pageType: 'Parent Utility Page', priority: 'Medium' },

  // Thank You
  { pattern: /cam-on|thank-you|hoan-thanh/i, class: TEMPLATE_CLASSES.THANK_YOU, pageType: 'Conversion Landing Page', priority: 'Low' },

  // Careers / Tuyển dụng
  { pattern: /tuyen-dung|career|viec-lam|nhan-su|chuyen-vien/i, class: TEMPLATE_CLASSES.CAREERS, pageType: 'Parent Utility Page', priority: 'Low' },

  // Legal / Pháp lý
  { pattern: /chinh-sach|bao-mat|dieu-khoan|legal|privacy|terms|cookie/i, class: TEMPLATE_CLASSES.LEGAL, pageType: 'Parent Utility Page', priority: 'Low' },

  // Brand / Giới thiệu
  { pattern: /gioi-thieu|about|triet-ly|su-menh|gia-tri-cot-loi|lich-su|doi-ngu|he-sinh-thai/i, class: TEMPLATE_CLASSES.BRAND, pageType: 'Program Page', priority: 'Medium' },

  // Teacher profiles
  { pattern: /giao-vien|teacher|thay-co|co-giao/i, class: TEMPLATE_CLASSES.TEACHER_PROFILE, pageType: 'Program Page', priority: 'Medium' },

  // Alumni / Success stories
  { pattern: /cuu-hoc-sinh|alumni|thanh-cong|success/i, class: TEMPLATE_CLASSES.ALUMNI, pageType: 'Review / Testimonial Page', priority: 'Medium' },

  // Level Pillar pages
  { pattern: /^\/(mam-non|tieu-hoc|thcs|thpt|trung-hoc-co-so|trung-hoc-pho-thong)$/i, class: TEMPLATE_CLASSES.LEVEL_PILLAR, pageType: 'Pillar', priority: 'High' },

  // Curriculum / Chương trình
  { pattern: /chuong-trinh|curriculum|program|phuong-phap|methodology|active-learning|stem|coding|ngoai-khoa/i, class: TEMPLATE_CLASSES.CURRICULUM, pageType: 'Program Page', priority: 'Medium' },

  // Campus Profile
  { pattern: /co-so|campus|ktx|ky-tuc-xa|ho-boi|lop-hoc|phong-hoc|co-so-vat-chat/i, class: TEMPLATE_CLASSES.CAMPUS_PROFILE, pageType: 'Campus Page', priority: 'Medium' },

  // Comparison pages
  { pattern: /so-sanh|comparison|vs|truong-cong-lap|truong-tu|truong-quoc-te/i, class: TEMPLATE_CLASSES.COMPARISON, pageType: 'Comparison Page', priority: 'Medium' },

  // FAQ
  { pattern: /faq|hoi-dap|cau-hoi|tra-loi/i, class: TEMPLATE_CLASSES.FAQ, pageType: 'FAQ Page', priority: 'Medium' },

  // News & Events
  { pattern: /tin-tuc|news|ban-tin|thong-bao|announcement|cuoc-thi|giai-thuong|olympic|hoi-thao|da-ngoai|halloween|noel|tet/i, class: TEMPLATE_CLASSES.NEWS_EVENTS, pageType: 'News / Announcement', priority: 'Low' },

  // Photo contests / Khoảnh khắc thầy trò
  { pattern: /khoanh-khac-thay-tro|anh-du-thi|anh-hung/i, class: TEMPLATE_CLASSES.NEWS_EVENTS, pageType: 'News / Announcement', priority: 'Low', action: 'Redirect/Archive' },

  // Tuyển sinh
  { pattern: /tuyen-sinh|admission|chi-tieu|diem-chuan|xet-tuyen|nop-don/i, class: TEMPLATE_CLASSES.LOCAL_INTENT, pageType: 'Admissions Page', priority: 'High' },

  // Học bổng
  { pattern: /hoc-bong|scholarship/i, class: TEMPLATE_CLASSES.FEE_CAPTURE, pageType: 'Conversion Landing Page', priority: 'High' },

  // Du học (Study abroad) - huge category in legacy
  { pattern: /du-hoc|study-abroad|visa|passport/i, class: TEMPLATE_CLASSES.PARENT_HUB, pageType: 'Blog Kiến thức', priority: 'Low', topic: 'Du học' },

  // IELTS / English learning
  { pattern: /ielts|toefl|tieng-anh|english|phat-am|tu-vung|ngu-phap|grammar/i, class: TEMPLATE_CLASSES.PARENT_HUB, pageType: 'Blog Kiến thức', priority: 'Medium', topic: 'Tiếng Anh' },

  // Lớp 10 / Thi cử
  { pattern: /lop-10|thi-tot-nghiep|thi-tuyen|de-thi|dap-an|tuyen-sinh-lop|ky-thi|on-thi/i, class: TEMPLATE_CLASSES.PARENT_HUB, pageType: 'Blog Kiến thức', priority: 'Medium', topic: 'Thi cử & Tuyển sinh' },

  // Parenting / Kỹ năng
  { pattern: /phu-huynh|ky-nang|ki-nang|day-con|giao-duc|hoc-tap|hoc-gioi|bao-me|cha-me|tre-em|phat-trien/i, class: TEMPLATE_CLASSES.PARENT_HUB, pageType: 'Blog Kiến thức', priority: 'Medium', topic: 'Phụ huynh & Kỹ năng' },

  // Summer camp / Trại hè
  { pattern: /trai-he|summer|khoa-he|he-2|mua-he/i, class: TEMPLATE_CLASSES.OPEN_DAY, pageType: 'News / Announcement', priority: 'Low', topic: 'Trại hè' },

  // Scholarship / Bí quyết / Tips
  { pattern: /bi-quyet|bi-kip|meo|kinh-nghiem|huong-dan|cach-hoc|phuong-phap|tips/i, class: TEMPLATE_CLASSES.PARENT_HUB, pageType: 'How-to Guide', priority: 'Medium', topic: 'Học tập & Phương pháp' },

  // Lịch / Schedule
  { pattern: /lich-thi|lich-kiem-tra|thoi-khoa-bieu|ke-hoach-nam-hoc|lich-nghi/i, class: TEMPLATE_CLASSES.LEGAL, pageType: 'Parent Utility Page', priority: 'Low' },

  // Menu / Thực đơn
  { pattern: /thuc-don|menu|bua-trua|dinh-duong/i, class: TEMPLATE_CLASSES.NEWS_EVENTS, pageType: 'News / Announcement', priority: 'Low', action: 'Archive' },

  // Sách / Danh mục
  { pattern: /danh-muc-sach|sach-lop/i, class: TEMPLATE_CLASSES.LEGAL, pageType: 'Parent Utility Page', priority: 'Low' },

  // CLB / Clubs
  { pattern: /cau-lac-bo|clb|club/i, class: TEMPLATE_CLASSES.CURRICULUM, pageType: 'Program Page', priority: 'Medium' },

  // Camera / Tech
  { pattern: /camera|app|phan-mem|thanh-toan/i, class: TEMPLATE_CLASSES.LEGAL, pageType: 'Parent Utility Page', priority: 'Low' },

  // Brochure
  { pattern: /brochure|catalog/i, class: TEMPLATE_CLASSES.ENROLLMENT, pageType: 'Conversion Landing Page', priority: 'Medium' },

  // Video / Media content
  { pattern: /full-hd|clip|video|cwalk/i, class: TEMPLATE_CLASSES.NEWS_EVENTS, pageType: 'News / Announcement', priority: 'Low', action: 'Archive' },

  // Hoc sinh achievements
  { pattern: /hoc-sinh.*dat|hoc-sinh.*gioi|hoc-sinh.*xuat-sac|giai-ba|giai-nhi|giai-dong|doi-tuyen|huy-chuong/i, class: TEMPLATE_CLASSES.ALUMNI, pageType: 'News / Announcement', priority: 'Medium' },

  // School activities / Hoạt động
  { pattern: /hoat-dong|giao-luu|tu-thien|from-charity/i, class: TEMPLATE_CLASSES.NEWS_EVENTS, pageType: 'News / Announcement', priority: 'Low' },
];

// === Read CSV ===
function parseCSV(content) {
  const lines = content.split('\n').filter(l => l.trim());
  const headers = lines[0].split(',');
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace(/\r$/, '');
    if (!line.trim()) continue;
    // Simple CSV parse (handle quoted fields)
    const fields = [];
    let inQuote = false;
    let field = '';
    for (const ch of line) {
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === ',' && !inQuote) { fields.push(field); field = ''; continue; }
      field += ch;
    }
    fields.push(field);
    rows.push(fields);
  }
  return { headers, rows };
}

function classifyURL(url, title) {
  const combined = `${url} ${title}`.toLowerCase();

  for (const rule of RULES) {
    if (rule.pattern.test(combined)) {
      return {
        templateClass: rule.class,
        pageType: rule.pageType || '',
        priority: rule.priority || 'Low',
        topic: rule.topic || '',
        action: rule.action || 'Rewrite',
      };
    }
  }

  // Default: Blog / Parent Hub
  return {
    templateClass: TEMPLATE_CLASSES.OTHER,
    pageType: 'Blog Kiến thức',
    priority: 'Low',
    topic: 'Chưa phân loại',
    action: 'Review',
  };
}

function determineAction(url, title, classification) {
  const combined = `${url} ${title}`.toLowerCase();

  // Pages that should be archived/redirected (very old, low value)
  if (classification.action === 'Archive' || classification.action === 'Redirect/Archive') {
    return classification.action;
  }

  // Duplicate photo contest pages → redirect to hub
  if (/khoanh-khac-thay-tro-\d{4}-anh-du-thi-lop/i.test(url)) {
    return '301 Redirect → /hoat-dong';
  }

  // Old exam answers → archive
  if (/dap-an-de-thi|de-thi-tot-nghiep|de-thi-tuyen-sinh-lop/i.test(url)) {
    return 'Archive (outdated)';
  }

  // Very old news → archive
  if (/ngay-\d{2}-thang-\d{2}-nam-201[4-8]/i.test(url)) {
    return 'Archive (old event)';
  }

  // Content worth rewriting
  if (classification.priority === 'High' || classification.priority === 'Medium') {
    return 'Rewrite SEO';
  }

  return 'Review';
}

// === Main ===
const csvPath = path.resolve(__dirname, '../docs/master-index-sheet.csv');
const outputPath = path.resolve(__dirname, '../docs/enriched-master-index.csv');

const content = fs.readFileSync(csvPath, 'utf-8');
const { headers, rows } = parseCSV(content);

// Stats
const stats = {
  total: 0,
  byClass: {},
  byPriority: { High: 0, Medium: 0, Low: 0 },
  byAction: {},
};

// Process rows
const enrichedRows = rows.map(fields => {
  const [url, title, loaiTrang, templateClass, keyword, status, owner, note] = fields;
  const classification = classifyURL(url || '', title || '');
  const action = determineAction(url || '', title || '', classification);

  stats.total++;
  stats.byClass[classification.templateClass] = (stats.byClass[classification.templateClass] || 0) + 1;
  stats.byPriority[classification.priority]++;
  stats.byAction[action] = (stats.byAction[action] || 0) + 1;

  return [
    url || '',
    title || '',
    classification.pageType,
    classification.templateClass,
    keyword || '',
    action,
    classification.priority,
    classification.topic,
    owner || '',
    note || '',
  ];
});

// Write enriched CSV
const enrichedHeaders = [
  'URL',
  'Title',
  'Page Type',
  'Template Class',
  'Primary Keyword',
  'Recommended Action',
  'Priority',
  'Topic Cluster',
  'Owner',
  'Notes',
];

const csvOutput = [
  enrichedHeaders.join(','),
  ...enrichedRows.map(row =>
    row.map(f => {
      const s = String(f);
      return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(',')
  ),
].join('\n');

fs.writeFileSync(outputPath, csvOutput, 'utf-8');

// Print stats
console.log('\n=== URL Classification Report ===');
console.log(`Total URLs processed: ${stats.total}\n`);

console.log('--- By Template Class ---');
Object.entries(stats.byClass)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cls, count]) => {
    console.log(`  ${cls}: ${count} (${(count / stats.total * 100).toFixed(1)}%)`);
  });

console.log('\n--- By Priority ---');
Object.entries(stats.byPriority).forEach(([pri, count]) => {
  console.log(`  ${pri}: ${count} (${(count / stats.total * 100).toFixed(1)}%)`);
});

console.log('\n--- By Recommended Action ---');
Object.entries(stats.byAction)
  .sort((a, b) => b[1] - a[1])
  .forEach(([action, count]) => {
    console.log(`  ${action}: ${count} (${(count / stats.total * 100).toFixed(1)}%)`);
  });

console.log(`\nEnriched CSV written to: ${outputPath}`);
