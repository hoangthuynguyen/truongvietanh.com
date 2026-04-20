#!/usr/bin/env node
/**
 * Batch Rewrite 430 Legacy URLs for Directus Import
 * Reads enriched-master-index.csv, filters "Rewrite SEO" URLs,
 * generates SEO-optimized content_json for each, outputs directus-import-legacy.csv
 */

const fs = require('fs');
const path = require('path');

const INPUT = path.resolve(__dirname, '../docs/enriched-master-index.csv');
const OUTPUT = path.resolve(__dirname, '../docs/directus-import-legacy.csv');

// Read CSV
const content = fs.readFileSync(INPUT, 'utf-8');
const lines = content.split('\n').filter(l => l.trim());
const header = lines[0];
const rows = lines.slice(1);

// Parse each row: URL,Title,Page Type,Template Class,Primary Keyword,Recommended Action,Priority,Topic Cluster,Owner,Notes
const parsed = rows.map(row => {
  // Simple CSV parse (no quotes in this file structure)
  const parts = row.split(',');
  return {
    url: parts[0] || '',
    title: parts[1] || '',
    pageType: parts[2] || '',
    templateClass: parts[3] || '',
    primaryKeyword: parts[4] || '',
    action: parts[5] || '',
    priority: parts[6] || '',
    topicCluster: parts[7] || '',
    owner: parts[8] || '',
    notes: parts[9] || '',
  };
});

// Filter Rewrite SEO only
const rewriteUrls = parsed.filter(p => p.action === 'Rewrite SEO');

console.log(`Total legacy URLs: ${parsed.length}`);
console.log(`Rewrite SEO: ${rewriteUrls.length}`);
console.log(`  High: ${rewriteUrls.filter(p => p.priority === 'High').length}`);
console.log(`  Medium: ${rewriteUrls.filter(p => p.priority === 'Medium').length}`);

// Clean title from old WordPress suffix
function cleanTitle(title) {
  return title
    .replace(/\s*[-–—|]\s*Trường\s*(TH\s*)?THCS\s*THPT\s*Việt\s*Anh\s*$/i, '')
    .replace(/\s*[-–—|]\s*Báo\s*24h.*$/i, '')
    .replace(/🏆/g, '').replace(/📢/g, '').replace(/🎊/g, '').replace(/🌈/g, '')
    .replace(/💡/g, '').replace(/🎓/g, '').replace(/✨/g, '').replace(/🔥/g, '')
    .trim();
}

// Generate SEO title (max 60 chars)
function generateSeoTitle(title, topicCluster) {
  const clean = cleanTitle(title);
  const suffix = ' | Trường Việt Anh';
  const maxBody = 60 - suffix.length;
  const body = clean.length > maxBody ? clean.substring(0, maxBody - 3) + '...' : clean;
  return body + suffix;
}

// Generate SEO description (max 155 chars)
function generateSeoDesc(title, topicCluster, templateClass) {
  const clean = cleanTitle(title);
  const tc = (topicCluster || '').toLowerCase();
  
  const baseDesc = `${clean}. `;
  
  if (tc.includes('tiếng anh')) {
    return (baseDesc + 'Chương trình Chuyên Anh Việt Anh giúp học sinh phát triển toàn diện 4 kỹ năng. Cam kết IELTS 6.0+.').substring(0, 155);
  }
  if (tc.includes('phụ huynh') || tc.includes('kỹ năng')) {
    return (baseDesc + 'Chia sẻ từ đội ngũ giáo dục Việt Anh — đồng hành cùng phụ huynh nuôi dạy con tự chủ.').substring(0, 155);
  }
  if (tc.includes('tuyển sinh') || tc.includes('admission')) {
    return (baseDesc + 'Thông tin tuyển sinh Trường Việt Anh 2026. Đăng ký tư vấn và tham quan miễn phí!').substring(0, 155);
  }
  if (tc.includes('du học')) {
    return (baseDesc + 'Lộ trình du học chuẩn bị từ THPT. IELTS 6.0+ cam kết tại Việt Anh giúp con tự tin ứng tuyển.').substring(0, 155);
  }
  if (tc.includes('stem') || tc.includes('học tập')) {
    return (baseDesc + 'Phương pháp Active Learning tại Việt Anh: học bằng làm, nhớ lâu, yêu thích học tập.').substring(0, 155);
  }
  
  return (baseDesc + 'Khám phá tại Trường Việt Anh — hệ thống giáo dục song ngữ liên cấp, PDR cá nhân hoá.').substring(0, 155);
}

// Generate hero H1
function generateHeroH1(title) {
  const clean = cleanTitle(title);
  // Capitalize first letter of each major word
  return clean.replace(/^./, c => c.toUpperCase());
}

// Generate hero subtext
function generateHeroSubtext(title, topicCluster) {
  const clean = cleanTitle(title);
  const tc = (topicCluster || '').toLowerCase();
  
  if (tc.includes('tiếng anh')) {
    return `Chia sẻ từ đội ngũ Chuyên Anh Trường Việt Anh: ${clean.toLowerCase()}. Kinh nghiệm thực tế từ hàng ngàn học sinh.`;
  }
  if (tc.includes('phụ huynh')) {
    return `Hướng dẫn thực tế cho phụ huynh: ${clean.toLowerCase()}. Được biên soạn từ kinh nghiệm đồng hành cùng hàng ngàn gia đình.`;
  }
  return `${clean}. Góc nhìn chuyên sâu từ Trường Việt Anh — nơi giáo dục tự chủ và song ngữ là nền tảng.`;
}

// Generate content_json by template class pattern
function generateContentJson(item) {
  const clean = cleanTitle(item.title);
  const tc = (item.topicCluster || '').toLowerCase();
  const tpl = (item.templateClass || '').toLowerCase();
  const blocks = [];
  
  // 1. Opening paragraph
  if (tpl.includes('parent hub') || tpl.includes('12.')) {
    blocks.push({ type: 'paragraph', content: `${clean} — đây là câu hỏi nhiều phụ huynh đặt ra. Tại Trường Việt Anh, chúng tôi đúc kết từ kinh nghiệm thực tế với hàng ngàn học sinh để chia sẻ góc nhìn thực dụng, không lý thuyết suông.` });
  } else if (tpl.includes('alumni') || tpl.includes('24.')) {
    blocks.push({ type: 'paragraph', content: `${clean}. Câu chuyện thành công của cộng đồng Việt Anh — nơi các thế hệ học sinh không chỉ giỏi kiến thức mà còn tự tin bước vào đời.` });
  } else if (tpl.includes('event') || tpl.includes('3.')) {
    blocks.push({ type: 'paragraph', content: `${clean}. Sự kiện đặc biệt tại Trường Việt Anh — nơi kết nối cộng đồng giáo dục, tạo cơ hội trải nghiệm thực tế cho học sinh và phụ huynh.` });
  } else if (tpl.includes('fee') || tpl.includes('1.')) {
    blocks.push({ type: 'paragraph', content: `${clean}. Thông tin minh bạch về chính sách học phí và học bổng tại Trường Việt Anh — đầu tư thông minh cho tương lai con.` });
  } else if (tpl.includes('curriculum') || tpl.includes('8.')) {
    blocks.push({ type: 'paragraph', content: `${clean}. Chương trình đào tạo tại Trường Việt Anh kết hợp Bộ GDĐT + Cambridge + Active Learning, đảm bảo học sinh phát triển toàn diện.` });
  } else if (tpl.includes('local') || tpl.includes('11.')) {
    blocks.push({ type: 'paragraph', content: `${clean}. Trường Việt Anh phục vụ phụ huynh khu vực TPHCM với 3 campus: Gò Vấp, Bình Tân, Phú Nhuận và hệ thống xe đưa rước phủ sóng rộng.` });
  } else if (tpl.includes('teacher') || tpl.includes('23.')) {
    blocks.push({ type: 'paragraph', content: `${clean}. Đội ngũ giáo viên Trường Việt Anh — 150+ thầy cô tận tâm, bao gồm 20+ giáo viên bản ngữ từ Anh, Mỹ, Úc, Canada.` });
  } else {
    blocks.push({ type: 'paragraph', content: `${clean}. Khám phá cùng Trường Việt Anh — hệ thống giáo dục liên cấp song ngữ với cam kết IELTS 6.0+ và hệ thống PDR phát triển cá nhân.` });
  }
  
  // 2. Main heading
  blocks.push({ type: 'heading-2', content: 'Điểm nổi bật' });
  
  // 3. Content by topic
  if (tc.includes('tiếng anh')) {
    blocks.push({ type: 'paragraph', content: 'Tại Trường Việt Anh, tiếng Anh không phải là "môn học" mà là "ngôn ngữ sống". Học sinh sử dụng tiếng Anh trong giao tiếp hàng ngày với giáo viên bản ngữ — tự nhiên như hơi thở, không áp lực như thi cử.' });
    blocks.push({ type: 'bullet-list', items: [
      'Chương trình Chuyên Anh từ Mầm Non đến THPT',
      '5-15 tiết tiếng Anh/tuần với giáo viên bản ngữ',
      'IELTS Foundation từ lớp 6, cam kết 6.0+ khi tốt nghiệp',
      'Debate, Drama, Academic Writing — học TA qua thực hành',
      'Không cần trung tâm tiếng Anh bên ngoài'
    ]});
  } else if (tc.includes('phụ huynh') || tc.includes('kỹ năng')) {
    blocks.push({ type: 'paragraph', content: 'Giáo dục không chỉ diễn ra ở trường. Việt Anh tin rằng phụ huynh là "giáo viên đầu đời" quan trọng nhất. Hệ thống PDR giúp phụ huynh đồng hành cùng con hiệu quả — biết con cần gì, đang ở đâu, và cần hỗ trợ thế nào.' });
    blocks.push({ type: 'bullet-list', items: [
      'PDR cập nhật tiến bộ của con hàng tuần',
      'Kênh liên lạc trực tiếp với giáo viên chủ nhiệm',
      'Workshop phụ huynh định kỳ hàng tháng',
      'Tâm lý học đường hỗ trợ miễn phí'
    ]});
  } else if (tc.includes('du học')) {
    blocks.push({ type: 'paragraph', content: 'Lộ trình du học thành công bắt đầu từ THPT - không phải từ trung tâm tư vấn. Tại Việt Anh, học sinh được chuẩn bị IELTS, SAT, Personal Statement và kỹ năng tự lập từ khi còn ngồi trên ghế nhà trường.' });
    blocks.push({ type: 'bullet-list', items: [
      'IELTS 6.0+ cam kết tại trường, không cần trung tâm ngoài',
      'Hướng dẫn viết Personal Statement & Portfolio',
      'Mạng lưới cựu học sinh tại 15+ quốc gia',
      'Tư vấn chọn trường phù hợp năng lực và tài chính'
    ]});
  } else if (tc.includes('stem') || tc.includes('học tập') || tc.includes('phương pháp')) {
    blocks.push({ type: 'paragraph', content: 'Active Learning tại Việt Anh: thay vì ngồi nghe giảng, học sinh được thực hành, thí nghiệm, thảo luận, tranh luận. Nghiên cứu cho thấy phương pháp này giúp ghi nhớ 75-90% — so với 5-10% khi nghe giảng thụ động.' });
    blocks.push({ type: 'bullet-list', items: [
      'Context Math: Học toán qua tình huống thực tế',
      'Project-Based Science: Thí nghiệm thay cho lý thuyết',
      'STEM Lab: Robot, Arduino, Máy in 3D',
      'PDR Presentation: Học sinh tự trình bày tiến bộ'
    ]});
  } else {
    blocks.push({ type: 'paragraph', content: 'Trường Việt Anh mang đến môi trường giáo dục liên cấp từ Mầm non đến THPT, với triết lý "Tự chủ — Song ngữ — Hạnh phúc". Mỗi học sinh được theo dõi cá nhân qua hệ thống PDR, đảm bảo không ai bị bỏ lại phía sau.' });
    blocks.push({ type: 'bullet-list', items: [
      'Liên cấp MN — TH — THCS — THPT: không "gãy" khi chuyển trường',
      'Sĩ số 28 HS/lớp: giáo viên quan tâm từng em',
      'PDR theo dõi phát triển hàng tuần',
      'Cam kết IELTS 6.0+ khi tốt nghiệp',
      '3 campus tại TPHCM: Gò Vấp, Bình Tân, Phú Nhuận'
    ]});
  }
  
  // 4. Closing CTA section
  blocks.push({ type: 'heading-2', content: 'Bước tiếp theo cho phụ huynh' });
  blocks.push({ type: 'paragraph', content: 'Đăng ký tham quan miễn phí để trải nghiệm thực tế môi trường học tập tại Việt Anh — gặp giáo viên, xem phòng học, và cảm nhận sự khác biệt.' });
  
  return blocks;
}

// Generate CTA based on template
function generateCTA(templateClass) {
  const tpl = (templateClass || '').toLowerCase();
  if (tpl.includes('fee') || tpl.includes('1.')) return 'Nhận Bảng Học Phí Chi Tiết';
  if (tpl.includes('event') || tpl.includes('3.')) return 'Đăng Ký Sự Kiện Sắp Tới';
  if (tpl.includes('local') || tpl.includes('11.')) return 'Đặt Lịch Tham Quan Campus';
  if (tpl.includes('alumni') || tpl.includes('24.')) return 'Xem Thêm Câu Chuyện Thành Công';
  if (tpl.includes('teacher') || tpl.includes('23.')) return 'Gặp Đội Ngũ Giáo Viên';
  return 'Đặt Lịch Tham Quan Miễn Phí';
}

// --- Generate Output CSV ---
function escapeCSV(str) {
  if (!str) return '';
  const s = String(str);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

const csvHeaders = 'url,template_class,seo_title,seo_desc,hero_h1,hero_subtext,content_json,cta_text';
const csvRows = [csvHeaders];

for (const item of rewriteUrls) {
  const seoTitle = generateSeoTitle(item.title, item.topicCluster);
  const seoDesc = generateSeoDesc(item.title, item.topicCluster, item.templateClass);
  const heroH1 = generateHeroH1(item.title);
  const heroSub = generateHeroSubtext(item.title, item.topicCluster);
  const contentBlocks = generateContentJson(item);
  const ctaText = generateCTA(item.templateClass);
  const contentStr = JSON.stringify(contentBlocks).replace(/"/g, '""');
  
  // Map template class code to readable name
  const tplName = item.templateClass.replace(/^\d+\.\s*/, '');
  
  const row = [
    escapeCSV(item.url),
    escapeCSV(tplName),
    escapeCSV(seoTitle),
    escapeCSV(seoDesc),
    escapeCSV(heroH1),
    escapeCSV(heroSub),
    `"${contentStr}"`,
    escapeCSV(ctaText),
  ].join(',');
  
  csvRows.push(row);
}

fs.writeFileSync(OUTPUT, csvRows.join('\r\n') + '\r\n', 'utf-8');

console.log(`\n=== Legacy URL Rewrite Report ===`);
console.log(`URLs processed: ${rewriteUrls.length}`);
console.log(`Output: ${OUTPUT}`);
console.log(`File size: ${(fs.statSync(OUTPUT).size / 1024).toFixed(1)} KB`);

// Stats by topic cluster
const byCluster = {};
for (const item of rewriteUrls) {
  const tc = item.topicCluster || '(no cluster)';
  byCluster[tc] = (byCluster[tc] || 0) + 1;
}
console.log('\n--- By topic cluster ---');
Object.entries(byCluster).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
  console.log(`  ${k}: ${v}`);
});
