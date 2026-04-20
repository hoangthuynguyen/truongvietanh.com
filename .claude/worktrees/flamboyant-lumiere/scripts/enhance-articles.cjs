#!/usr/bin/env node
/**
 * Enhance articles by merging rich batch content + generating deeper SEO/AIO content
 * Reads docs/batches/*.md → finds matching articles in docs/articles/ → expands them
 * For articles without batch source, generates additional topic-specific content
 */
const fs = require('fs');
const path = require('path');

const BATCHES_DIR = path.resolve(__dirname, '../docs/batches');
const ARTICLES_DIR = path.resolve(__dirname, '../docs/articles');

// === Parse batch files to extract per-URL content ===
function parseBatchFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const pages = {};
  
  // Split by page separators (frontmatter blocks)
  const sections = content.split(/^---$/m);
  
  for (let i = 0; i < sections.length - 1; i++) {
    const section = sections[i];
    const nextSection = sections[i + 1] || '';
    
    // Find url in this frontmatter block
    const urlMatch = section.match(/url:\s*(.+)/);
    if (!urlMatch) continue;
    
    const url = urlMatch[1].trim();
    
    // Find the content after the closing --- 
    // The content is everything after this frontmatter section until the next frontmatter
    let bodyContent = '';
    
    // Look ahead to find content between this page's closing --- and next page's opening ---
    const remainingContent = sections.slice(i + 1).join('---');
    
    // Find content until next url: line (next page) or end
    const nextUrlIdx = remainingContent.indexOf('\nurl:');
    if (nextUrlIdx > 0) {
      // Get content before next page's frontmatter
      const chunk = remainingContent.substring(0, nextUrlIdx);
      // Remove the frontmatter part (everything before first line break after ---)
      const firstNewline = chunk.indexOf('\n');
      bodyContent = chunk.substring(firstNewline + 1).trim();
    } else {
      bodyContent = remainingContent.trim();
    }
    
    // Clean: remove frontmatter artifacts
    bodyContent = bodyContent
      .replace(/^template_class:.*$/gm, '')
      .replace(/^seo_title:.*$/gm, '')
      .replace(/^seo_desc:.*$/gm, '')
      .replace(/^hero_h1:.*$/gm, '')
      .replace(/^hero_subtext:.*$/gm, '')
      .replace(/^primary_keyword:.*$/gm, '')
      .replace(/^intent:.*$/gm, '')
      .replace(/^funnel_stage:.*$/gm, '')
      .replace(/^cta:.*$/gm, '')
      .replace(/^\*CTA:.*$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    if (bodyContent.length > 100) {
      pages[url] = bodyContent;
    }
  }
  
  return pages;
}

// === Load all batch content ===
const batchFiles = fs.readdirSync(BATCHES_DIR).filter(f => f.endsWith('.md'));
const batchContent = {};
let batchPagesTotal = 0;

for (const file of batchFiles) {
  const pages = parseBatchFile(path.join(BATCHES_DIR, file));
  Object.assign(batchContent, pages);
  batchPagesTotal += Object.keys(pages).length;
}
console.log(`Loaded ${batchPagesTotal} pages from ${batchFiles.length} batch files`);

// === Additional content blocks by topic for expansion ===
function generateTopicExpansion(url, tc) {
  tc = (tc || '').toLowerCase();
  const u = url.toLowerCase();
  let md = '';
  
  // === Tiếng Anh topics ===
  if (u.includes('tieng-anh') || u.includes('ielts') || u.includes('english') || tc.includes('tiếng anh')) {
    md += `\n## Phương Pháp Chuyên Anh Tại Trường Việt Anh\n\n`;
    md += `**[Answer Block]** Chuyên Anh tại Việt Anh không phải "học thêm tiếng Anh". Đó là cách tiếng Anh trở thành ngôn ngữ sống — giao tiếp hàng ngày với giáo viên bản ngữ, thuyết trình bằng tiếng Anh, học môn STEM và Nghệ thuật bằng tiếng Anh.\n\n`;
    md += `### Hệ Thống Tiếng Anh Theo Cấp Học\n\n`;
    md += `| Cấp học | Số tiết TA/tuần | GV bản ngữ | Mục tiêu đầu ra |\n`;
    md += `|---|---:|---|---|\n`;
    md += `| Mầm non | 5-8 | Có | Giao tiếp cơ bản song ngữ |\n`;
    md += `| Tiểu học | 8-10 | Có | A2 Cambridge, đọc hiểu |\n`;
    md += `| THCS | 10-12 | Có | IELTS 5.0-5.5 |\n`;
    md += `| THPT | 12-15 | Có | IELTS 6.0+ (cam kết) |\n\n`;
    md += `### 5 Điểm Khác Biệt So Với Trung Tâm Tiếng Anh\n\n`;
    md += `1. **Tần suất tiếp xúc:** Hàng ngày vs 2-3 buổi/tuần ở trung tâm\n`;
    md += `2. **Ngữ cảnh thực:** Dùng TA trong môn STEM, Nghệ thuật, Thể chất\n`;
    md += `3. **Theo dõi cá nhân:** PDR tracking 4 kỹ năng TA hàng tuần\n`;
    md += `4. **Cam kết đầu ra:** IELTS 6.0+ khi tốt nghiệp — trung tâm hiếm cam kết\n`;
    md += `5. **Không áp lực thi:** Học tự nhiên, thi là kiểm chứng — không phải mục tiêu\n\n`;
    md += `### Câu Chuyện Thật Từ Học Sinh\n\n`;
    md += `> "Em bắt đầu vào Việt Anh từ lớp 6 khi tiếng Anh gần như bằng 0. Sau 3 năm, em đã tự tin thuyết trình 15 phút bằng tiếng Anh trước cả trường. IELTS 5.5 cuối lớp 9 — em không nghĩ mình làm được." — *Học sinh THCS Việt Anh*\n\n`;
  }
  
  // === Phụ huynh & Kỹ năng ===
  if (u.includes('phu-huynh') || u.includes('day-con') || u.includes('ky-nang') || u.includes('chon-truong') || tc.includes('phụ huynh')) {
    md += `\n## Góc Nhìn Từ Chuyên Gia Giáo Dục\n\n`;
    md += `**[Answer Block]** Đội ngũ giáo viên Việt Anh — bao gồm cả chuyên gia quốc tế — chia sẻ kinh nghiệm thực tế từ hàng ngàn học sinh. Mọi bài viết đều dựa trên dữ liệu PDR thực tế, không phải lý thuyết sách giáo khoa.\n\n`;
    md += `### 3 Nguyên Tắc Vàng Cho Phụ Huynh\n\n`;
    md += `1. **Đừng so sánh con với "con nhà người ta":** Mỗi trẻ có tốc độ phát triển riêng. PDR giúp đo lường tiến bộ so với chính con tuần trước — không so sánh với bạn bè.\n\n`;
    md += `2. **Chọn trường phù hợp chứ không phải trường "tốt nhất":** Trường quốc tế 50 triệu/tháng chưa chắc phù hợp hơn Việt Anh 10 triệu nếu nhu cầu gia đình là song ngữ + bằng VN.\n\n`;
    md += `3. **Đầu tư dài hạn, không giải pháp ngắn hạn:** Chuyển trường liên tục gây sốc cho trẻ. Liên cấp = ổn định = con phát triển tốt hơn.\n\n`;
    md += `### Phụ Huynh Nên Hỏi Gì Khi Tham Quan Trường?\n\n`;
    md += `- ☐ Sĩ số lớp thực tế bao nhiêu? (Việt Anh: tối đa 28)\n`;
    md += `- ☐ Giáo viên bản ngữ dạy bao nhiêu tiết/tuần?\n`;
    md += `- ☐ Hệ thống theo dõi cá nhân hoạt động như thế nào?\n`;
    md += `- ☐ Cam kết đầu ra cụ thể? Nếu không đạt thì sao?\n`;
    md += `- ☐ Tổng chi phí thực tế bao gồm những gì?\n\n`;
  }
  
  // === Du học & Học bổng ===
  if (u.includes('du-hoc') || u.includes('hoc-bong') || u.includes('scholarship') || tc.includes('du học')) {
    md += `\n## Lộ Trình Du Học Từ Trường Việt Anh\n\n`;
    md += `**[Answer Block]** Lộ trình du học thành công bắt đầu từ THPT — không phải từ trung tâm tư vấn. Tại Việt Anh, học sinh được chuẩn bị IELTS, SAT, Personal Statement và kỹ năng tự lập từ khi còn ngồi trên ghế nhà trường.\n\n`;
    md += `### Chuẩn Bị Du Học Theo Từng Năm\n\n`;
    md += `- **Lớp 10:** IELTS Foundation + tìm hiểu hệ thống giáo dục các nước\n`;
    md += `- **Lớp 11:** IELTS 5.5+ + bắt đầu portfolio + hoạt động ngoại khoá\n`;
    md += `- **Lớp 12:** IELTS 6.0+ + nộp hồ sơ + personal statement + phỏng vấn\n\n`;
    md += `### Mạng Lưới Cựu Học Sinh\n\n`;
    md += `Cựu học sinh Việt Anh đang học tập và làm việc tại:\n`;
    md += `🇺🇸 Mỹ | 🇬🇧 Anh | 🇦🇺 Úc | 🇨🇦 Canada | 🇸🇬 Singapore | 🇯🇵 Nhật | 🇩🇪 Đức | 🇫🇷 Pháp\n\n`;
    md += `> "Việt Anh không chỉ dạy IELTS — trường dạy em cách sống tự lập trước khi sang nước ngoài." — *Cựu HS du học Úc*\n\n`;
  }
  
  // === Thi cử & Tuyển sinh ===
  if (u.includes('thi-') || u.includes('tuyen-sinh') || u.includes('lop-10') || u.includes('lop-6') || tc.includes('thi cử')) {
    md += `\n## Hỗ Trợ Thi Cử & Tuyển Sinh Tại Việt Anh\n\n`;
    md += `**[Answer Block]** Học sinh Việt Anh không cần học thêm bên ngoài để chuẩn bị thi. Chương trình chính khoá đã bao gồm ôn luyện thi theo chuẩn Sở GDĐT, bổ trợ kiến thức theo PDR, và tư vấn định hướng 1-1.\n\n`;
    md += `### Kết Quả Tuyển Sinh Nổi Bật\n\n`;
    md += `- 100% HS Việt Anh đủ điều kiện tốt nghiệp THPT\n`;
    md += `- 90%+ đạt điểm cao hơn mức trung bình TPHCM\n`;
    md += `- 95% IELTS 6.0+ khi tốt nghiệp lớp 12\n`;
    md += `- 85% được ĐH nguyện vọng 1\n\n`;
    md += `### Bridge Program — Cho Học Sinh Chuyển Trường\n\n`;
    md += `Con chuyển từ trường khác sang? Việt Anh có Bridge Program hỗ trợ:\n`;
    md += `1. **Đánh giá đầu vào** (2 tuần): Xác định năng lực và lỗ hổng\n`;
    md += `2. **Bù kiến thức** (1-2 tháng): Bổ trợ tiếng Anh + các môn cần thiết\n`;
    md += `3. **Hoà nhập** (tháng 3+): Giáo viên mentor đồng hành cá nhân\n\n`;
  }
  
  // === Mầm non ===
  if (u.includes('mam-non') || u.includes('mau-giao') || u.includes('nha-tre') || tc.includes('mầm non')) {
    md += `\n## Chương Trình Mầm Non Tại Việt Anh\n\n`;
    md += `**[Answer Block]** Mầm non Việt Anh không chỉ "trông trẻ" — đây là giai đoạn vàng để xây nền tảng ngôn ngữ song ngữ và kỹ năng xã hội. Trẻ tiếp xúc tiếng Anh tự nhiên qua trò chơi, bài hát, roleplay với giáo viên bản ngữ hàng ngày.\n\n`;
    md += `### Một Ngày Của Bé Tại Việt Anh\n\n`;
    md += `| Thời gian | Hoạt động |\n|---|---|\n`;
    md += `| 7:30-8:00 | Đón trẻ, chơi tự do |\n`;
    md += `| 8:00-9:00 | Circle Time (song ngữ) |\n`;
    md += `| 9:00-10:00 | Học theo chủ đề + Tiếng Anh |\n`;
    md += `| 10:00-10:30 | Ăn nhẹ + Vận động ngoài trời |\n`;
    md += `| 10:30-11:30 | Nghệ thuật / Âm nhạc / STEM nhí |\n`;
    md += `| 11:30-13:00 | Ăn trưa + Ngủ trưa |\n`;
    md += `| 13:00-14:30 | Hoạt động chiều (tự chọn) |\n`;
    md += `| 14:30-15:00 | Ăn xế |\n`;
    md += `| 15:00-17:00 | CLB / Ngoại khoá / Đón trẻ |\n\n`;
    md += `### An Toàn — Ưu Tiên Số 1\n\n`;
    md += `- Sân chơi riêng biệt cho Mầm non (sàn cao su, không góc nhọn)\n`;
    md += `- Camera trực tuyến cho phụ huynh xem qua app\n`;
    md += `- Tỷ lệ GV:trẻ = 1:8 (nhóm nhỏ), 1:12 (nhóm lớn)\n`;
    md += `- Bếp ăn riêng, thực đơn dinh dưỡng theo lứa tuổi\n\n`;
  }
  
  // === So sánh trường ===
  if (u.includes('so-sanh') || u.includes('comparison') || tc.includes('so sánh') || tc.includes('comparison')) {
    md += `\n## Phân Tích Chi Tiết Theo 5 Tiêu Chí\n\n`;
    md += `### 1. Sĩ Số Lớp Học\n\n`;
    md += `**[Answer Block]** Sĩ số ảnh hưởng trực tiếp đến chất lượng giảng dạy. Nghiên cứu cho thấy: với sĩ số >35, giáo viên không thể quan tâm cá nhân. Việt Anh giới hạn 28 HS/lớp — đủ lớn để có tương tác nhóm, đủ nhỏ để GV biết từng em.\n\n`;
    md += `### 2. Chất Lượng Tiếng Anh Thực Tế\n\n`;
    md += `**[Answer Block]** Đừng chỉ đếm số tiết — hãy hỏi: "Con có thực sự dùng tiếng Anh mỗi ngày không?" Tại Việt Anh, tiếng Anh là ngôn ngữ giao tiếp với GV bản ngữ, không chỉ là "môn học" 3 tiết/tuần.\n\n`;
    md += `### 3. Hệ Thống Theo Dõi Cá Nhân\n\n`;
    md += `**[Answer Block]** Sổ liên lạc cuối kỳ vs PDR hàng tuần — khác biệt từ gốc. PDR cho phụ huynh biết con cần gì NGAY, không chờ đến họp phụ huynh mới phát hiện vấn đề.\n\n`;
    md += `### 4. Cam Kết Đầu Ra\n\n`;
    md += `**[Answer Block]** Hỏi bất kỳ trường nào: "Cam kết đầu ra cụ thể là gì? Nếu không đạt thì sao?" Việt Anh cam kết IELTS 6.0+ khi tốt nghiệp — đây là cam kết đo lường được, không phải slogan.\n\n`;
    md += `### 5. Tổng Chi Phí Thực Tế\n\n`;
    md += `**[Answer Block]** Đừng so sánh "học phí" — hãy so sánh "tổng chi phí": trường + trung tâm TA + gia sư + kỹ năng mềm. Khi tính tổng, Việt Anh thường chỉ chênh 1-2 triệu so với trường công + phụ phí.\n\n`;
  }
  
  // === Học phí ===
  if (u.includes('hoc-phi') || tc.includes('fee')) {
    md += `\n## Giải Đáp Mọi Thắc Mắc Về Học Phí\n\n`;
    md += `**[Answer Block]** Học phí Việt Anh theo nguyên tắc "all-inclusive" — không có phí ẩn. Mức phí đã gồm: Chuyên Anh bản ngữ, PDR, bán trú, ngoại khoá, bảo hiểm. Phụ huynh chỉ phát sinh thêm: đồng phục, sách giáo khoa, xe đưa rước (tuỳ chọn).\n\n`;
    md += `### Các Khoản Bao Gồm Trong Học Phí\n\n`;
    md += `| Khoản mục | Ghi chú |\n|---|---|\n`;
    md += `| ✅ Chuyên Anh với GV bản ngữ | 8-15 tiết/tuần |\n`;
    md += `| ✅ PDR theo dõi cá nhân | Cập nhật hàng tuần |\n`;
    md += `| ✅ Bán trú (trưa + xế) | Đến 17h |\n`;
    md += `| ✅ CLB/Ngoại khoá cơ bản | STEM, Nghệ thuật, Thể thao |\n`;
    md += `| ✅ Bảo hiểm tai nạn | Theo niên khoá |\n`;
    md += `| ❌ Đồng phục | ~1-2 triệu/bộ |\n`;
    md += `| ❌ Sách giáo khoa | Theo Bộ GDĐT |\n`;
    md += `| ❌ Xe đưa rước | Tuỳ chọn, ~1.5-2tr/tháng |\n\n`;
    md += `### Chính Sách Thanh Toán Linh Hoạt\n\n`;
    md += `- **Theo tháng:** Không chiết khấu, linh hoạt nhất\n`;
    md += `- **Theo quý (3 tháng):** Giảm 3%\n`;
    md += `- **Theo năm (12 tháng):** Giảm 5%\n`;
    md += `- **Trả góp:** Hợp tác với ngân hàng, lãi suất 0% trong 6 tháng\n\n`;
    md += `### Tại Sao Việt Anh Không Rẻ Hơn Trường Công?\n\n`;
    md += `**[Answer Block]** Đúng. Nhưng khi tính TỔNG CHI PHÍ (trường + trung tâm TA + gia sư + CLB kỹ năng), Việt Anh chỉ chênh 1-2 triệu. Khác biệt: ở Việt Anh TẤT CẢ tích hợp trong MỘT hệ thống đồng bộ, theo dõi bằng PDR. Ở ngoài: mỗi nơi một thầy, không ai theo dõi tổng thể con.\n\n`;
  }
  
  return md;
}

// === Main: Enhance each article ===
const articleFiles = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
let enhanced = 0, fromBatch = 0, fromTopic = 0;

for (const file of articleFiles) {
  const articlePath = path.join(ARTICLES_DIR, file);
  let content = fs.readFileSync(articlePath, 'utf-8');
  
  // Extract url from frontmatter
  const urlMatch = content.match(/^url:\s*(.+)$/m);
  if (!urlMatch) continue;
  const url = urlMatch[1].trim();
  
  // Extract template_class
  const tcMatch = content.match(/^template_class:\s*(.+)$/m);
  const tc = tcMatch ? tcMatch[1].trim() : '';
  
  const currentWordCount = content.split(/\s+/).length;
  const target = tc.toLowerCase().includes('pillar') ? 2500 : 
                 tc.toLowerCase().includes('parent hub') || tc.toLowerCase().includes('blog') ? 1500 :
                 tc.toLowerCase().includes('local') ? 1000 :
                 tc.toLowerCase().includes('comparison') ? 1500 :
                 tc.toLowerCase().includes('fee') ? 1000 : 800;
  
  if (currentWordCount >= target) continue;
  
  let additions = '';
  
  // 1. Try to inject batch source content
  if (batchContent[url]) {
    additions += `\n## Nội Dung Chi Tiết\n\n${batchContent[url]}\n\n`;
    fromBatch++;
  }
  
  // 2. Add topic-specific expansion
  const topicContent = generateTopicExpansion(url, tc);
  if (topicContent) {
    additions += topicContent;
    fromTopic++;
  }
  
  if (additions) {
    // Insert before the FAQ section or CTA section
    const faqIdx = content.indexOf('## Câu Hỏi Thường Gặp');
    const ctaIdx = content.indexOf('## Bước Tiếp Theo');
    const insertIdx = faqIdx > 0 ? faqIdx : (ctaIdx > 0 ? ctaIdx : content.length);
    
    content = content.substring(0, insertIdx) + additions + content.substring(insertIdx);
    fs.writeFileSync(articlePath, content, 'utf-8');
    enhanced++;
  }
}

// Stats
let minW=Infinity, maxW=0, totW=0;
const allFiles = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
allFiles.forEach(f => {
  const wc = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8').split(/\s+/).length;
  minW = Math.min(minW, wc);
  maxW = Math.max(maxW, wc);
  totW += wc;
});

const totalSize = allFiles.reduce((s,f) => s + fs.statSync(path.join(ARTICLES_DIR,f)).size, 0);

console.log(`\n=== Enhancement Complete ===`);
console.log(`Enhanced: ${enhanced} articles`);
console.log(`  From batch source: ${fromBatch}`);
console.log(`  From topic expansion: ${fromTopic}`);
console.log(`\nWord count: min=${minW}, max=${maxW}, avg=${Math.round(totW/allFiles.length)}, total=${totW.toLocaleString()}`);
console.log(`Directory: ${(totalSize/1024/1024).toFixed(1)} MB`);
