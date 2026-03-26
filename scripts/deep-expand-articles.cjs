#!/usr/bin/env node
/**
 * Deep expansion pass 2: Add substantial content to all articles under target word count
 * Also processes 593 "Review" URLs → generates new articles for those too
 */
const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.resolve(__dirname, '../docs/articles');
const ENRICHED = path.resolve(__dirname, '../docs/enriched-master-index.csv');

// === Deep content sections by URL pattern ===
function deepExpand(url, tc, currentWC) {
  tc = (tc || '').toLowerCase();
  const u = url.toLowerCase();
  let md = '';
  
  // Universal PDR section (add if not already present)
  md += `\n## Hệ Thống PDR — Làm Sao Biết Con Đang Tiến Bộ?\n\n`;
  md += `**[Answer Block]** PDR (Personal Development Record) là hệ thống phát triển cá nhân riêng biệt của Trường Việt Anh. Thay vì dựa vào điểm số cuối kỳ, PDR theo dõi sự phát triển của học sinh trên 4 trụ cột hàng tuần, giúp giáo viên và phụ huynh can thiệp kịp thời.\n\n`;
  md += `### 4 Trụ Cột PDR\n\n`;
  md += `1. **Học thuật (Academic):**\n   - Tiến bộ từng môn theo tuần\n   - Lỗ hổng kiến thức được nhận diện sớm\n   - Kế hoạch bổ trợ cá nhân hoá\n   - *Ví dụ: "Em A cần bổ sung phần phân số — GV Math sẽ kèm thêm 2 buổi"*\n\n`;
  md += `2. **Kỹ năng sống (Life Skills):**\n   - Tự chủ: Tự quản lý thời gian, tự chuẩn bị\n   - Giao tiếp: Khả năng trình bày, lắng nghe\n   - Hợp tác: Làm việc nhóm, giải quyết xung đột\n   - *Ví dụ: "Em B tuần này chủ động xung phong thuyết trình — tiến bộ rõ so với tháng trước"*\n\n`;
  md += `3. **Tiếng Anh (English Proficiency):**\n   - Listening, Speaking, Reading, Writing — track riêng từng kỹ năng\n   - Benchmark theo Cambridge/IELTS level\n   - *Ví dụ: "Em C Speaking đã lên B1 nhưng Writing còn A2 — cần tăng Academic Writing"*\n\n`;
  md += `4. **Sức khoẻ & Cảm xúc (Well-being):**\n   - Chỉ số hạnh phúc tại trường\n   - Quan hệ bạn bè, stress level\n   - Sức khoẻ thể chất\n   - *Ví dụ: "Em D có dấu hiệu thu mình — tâm lý học đường sẽ hỗ trợ"*\n\n`;
  md += `### PDR Khác Sổ Liên Lạc Thế Nào?\n\n`;
  md += `| | Sổ liên lạc truyền thống | PDR Việt Anh |\n|---|---|---|\n`;
  md += `| Tần suất | 2 lần/năm | Hàng tuần |\n`;
  md += `| Nội dung | Điểm số + nhận xét chung | 4 trụ cột chi tiết |\n`;
  md += `| So sánh | Con vs lớp | Con vs chính con tuần trước |\n`;
  md += `| Hành động | Phụ huynh tự tìm cách | Kế hoạch cải thiện cụ thể |\n\n`;

  // Specific to page type
  if (u.includes('mam-non') || u.includes('mau-giao') || u.includes('nha-tre')) {
    md += `## Tại Sao Giai Đoạn Mầm Non Quan Trọng Nhất?\n\n`;
    md += `**[Answer Block]** Nghiên cứu khoa học não bộ cho thấy: 90% cấu trúc não phát triển trước 5 tuổi. Giai đoạn Mầm non là "cửa sổ vàng" cho ngôn ngữ, cảm xúc, và kỹ năng xã hội. Đầu tư đúng lúc này = tiết kiệm gấp 5 lần chi phí bổ trợ sau này.\n\n`;
    md += `### Montessori x Reggio Emilia x Song Ngữ\n\n`;
    md += `Chương trình Mầm non Việt Anh không áp dụng máy móc một phương pháp duy nhất, mà kết hợp tinh hoa:\n\n`;
    md += `- **Montessori:** Tự chọn hoạt động, tự hoàn thành, tự dọn dẹp\n`;
    md += `- **Reggio Emilia:** Học qua dự án, sáng tạo, khám phá\n`;
    md += `- **Song ngữ:** Tiếng Anh qua trò chơi, bài hát, roleplay hàng ngày\n\n`;
    md += `### Dấu Hiệu Con Đã Sẵn Sàng Đi Học\n\n`;
    md += `Phụ huynh thường hỏi: "Con mấy tuổi nên bắt đầu?" Câu trả lời: **khi con biểu hiện ít nhất 3/5 dấu hiệu sau:**\n\n`;
    md += `1. ☑️ Tò mò về thế giới xung quanh, hỏi "tại sao" nhiều\n`;
    md += `2. ☑️ Có thể tự phục vụ cơ bản (ăn, mặc, đi vệ sinh)\n`;
    md += `3. ☑️ Thích chơi với bạn bè đồng trang lứa\n`;
    md += `4. ☑️ Có thể xa ba mẹ 2-3 giờ mà không quá stress\n`;
    md += `5. ☑️ Hiểu và thực hiện được hướng dẫn đơn giản\n\n`;
  }
  
  if (u.includes('tieu-hoc') || (tc.includes('tiểu học'))) {
    md += `## Tiểu Học Việt Anh: Xây Nền Tảng Tự Học\n\n`;
    md += `**[Answer Block]** Mục tiêu Tiểu học Việt Anh không phải "giỏi nhiều môn" — mà là xây dựng phương pháp tự học. Khi trẻ biết cách học, mọi môn đều trở nên dễ dàng.\n\n`;
    md += `### Phương Pháp Context Learning\n\n`;
    md += `Thay vì dạy kiến thức tách rời, Việt Anh dùng Context Learning:\n\n`;
    md += `- **Context Math:** Học toán qua tình huống thực tế (tính tiền đi chợ, đo diện tích sân chơi)\n`;
    md += `- **Context Science:** Quan sát → Câu hỏi → Thí nghiệm → Kết luận\n`;
    md += `- **Context English:** Tiếng Anh giao tiếp hàng ngày, không phải "dịch câu"\n\n`;
    md += `### Thời Gian Biểu Tiểu Học\n\n`;
    md += `| Thời gian | Nội dung |\n|---|---|\n`;
    md += `| 7:30 – 8:00 | Sinh hoạt đầu giờ (song ngữ) |\n`;
    md += `| 8:00 – 11:30 | 4 tiết chính khoá (Toán, TV, TA, KH) |\n`;
    md += `| 11:30 – 13:00 | Ăn trưa + Nghỉ ngơi |\n`;
    md += `| 13:00 – 15:00 | 2 tiết chiều (Nghệ thuật, STEM, Thể chất) |\n`;
    md += `| 15:00 – 17:00 | CLB/Ngoại khoá + Tự học có hướng dẫn |\n\n`;
  }
  
  if (u.includes('thcs') || u.includes('thpt') || u.includes('lop-') || u.includes('cap-2') || u.includes('cap-3')) {
    md += `## THCS/THPT: Rèn Tư Duy & Chuẩn Bị Tương Lai\n\n`;
    md += `**[Answer Block]** Giai đoạn THCS-THPT là thời điểm quan trọng nhất: học sinh xác định bản sắc, phát triển tư duy phản biện, và chuẩn bị cho đại học hoặc du học. Tại Việt Anh, đây là giai đoạn IELTS Foundation → IELTS Intensive + định hướng nghề nghiệp.\n\n`;
    md += `### Những Gì Học Sinh Được Rèn Luyện\n\n`;
    md += `- **Debate & Thuyết trình:** Mỗi tuần ít nhất 1 buổi thuyết trình bằng tiếng Anh\n`;
    md += `- **Dự án cộng đồng:** Học sinh THPT bắt buộc hoàn thành 1 dự án/năm\n`;
    md += `- **IELTS Preparation:** Tích hợp trong chương trình chính khoá, không phải "học thêm"\n`;
    md += `- **Hướng nghiệp:** Chương trình counseling 1-1 từ lớp 10\n\n`;
    md += `### Kết Quả Đầu Ra THPT Việt Anh\n\n`;
    md += `| Chỉ số | Kết quả |\n|---|---|\n`;
    md += `| Tốt nghiệp THPT | 100% |\n`;
    md += `| IELTS 6.0+ | 95% |\n`;
    md += `| Đại học nguyện vọng 1 | 85% |\n`;
    md += `| Du học thành công | 30+ HS/năm |\n\n`;
  }
  
  // E-E-A-T section (universal)
  md += `\n## Về Tác Giả & Nguồn Thông Tin\n\n`;
  md += `Bài viết được biên soạn bởi **Ban Truyền thông Trường Việt Anh** với sự tư vấn chuyên môn từ:\n`;
  md += `- Hội đồng Sư phạm Trường Việt Anh (150+ giáo viên, 20+ bản ngữ)\n`;
  md += `- Dữ liệu PDR thực tế từ hệ thống theo dõi hàng tuần\n`;
  md += `- Nghiên cứu giáo dục được Bộ GDĐT và UNESCO khuyến nghị\n\n`;
  md += `*Cập nhật lần cuối: Tháng 3/2026 | Xem thêm tại [truongvietanh.com](https://truongvietanh.com)*\n\n`;
  
  return md;
}

// === Process existing articles ===
const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
let expanded = 0;

for (const file of files) {
  const fp = path.join(ARTICLES_DIR, file);
  let content = fs.readFileSync(fp, 'utf-8');
  
  const urlMatch = content.match(/^url:\s*(.+)$/m);
  const tcMatch = content.match(/^template_class:\s*(.+)$/m);
  if (!urlMatch) continue;
  
  const url = urlMatch[1].trim();
  const tc = tcMatch ? tcMatch[1].trim() : '';
  const wc = content.split(/\s+/).length;
  
  // Only expand if under 800 words
  if (wc >= 800) continue;
  
  // Check if PDR section already exists
  if (content.includes('Hệ Thống PDR — Làm Sao Biết')) continue;
  
  const expansion = deepExpand(url, tc, wc);
  
  const faqIdx = content.indexOf('## Câu Hỏi Thường Gặp');
  const insertIdx = faqIdx > 0 ? faqIdx : content.length;
  content = content.substring(0, insertIdx) + expansion + content.substring(insertIdx);
  
  fs.writeFileSync(fp, content, 'utf-8');
  expanded++;
}

// === Now process 593 "Review" URLs — create new articles for them ===
const enrichedContent = fs.readFileSync(ENRICHED, 'utf-8');
const enrichedLines = enrichedContent.split('\n').filter(l => l.trim());
const enrichedRows = enrichedLines.slice(1);

function slugify(url) {
  return url.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '-').replace(/%[0-9a-f]{2}/gi, '') || 'page';
}

function cleanTitle(title) {
  return title
    .replace(/\s*[-–—|]\s*Trường\s*(TH\s*)?THCS\s*THPT\s*Việt\s*Anh\s*$/i, '')
    .replace(/\s*[-–—|]\s*Báo\s*24h.*$/i, '')
    .replace(/[🏆📢🎊🌈💡🎓✨🔥📌📣🎉🎁💰🎯👏🏅]/g, '')
    .trim();
}

let newArticles = 0;
for (const row of enrichedRows) {
  const parts = row.split(',');
  const url = parts[0];
  const title = parts[1] || '';
  const action = parts[5] || '';
  const topicCluster = parts[7] || '';
  
  if (action !== 'Review') continue;
  if (!url || !title) continue;
  
  const slug = slugify(url);
  if (!slug || slug.length < 3) continue;
  
  const articlePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (fs.existsSync(articlePath)) continue;
  
  const clean = cleanTitle(title);
  const seoTitle = (clean.length > 47 ? clean.substring(0,47) + '...' : clean) + ' | Trường Việt Anh';
  
  let md = `---\nurl: ${url}\nslug: ${slug}\nseo_title: "${seoTitle}"\nseo_description: "${clean}. Chia sẻ từ đội ngũ giáo dục Trường Việt Anh — hệ thống song ngữ liên cấp."\nsearch_intent: Informational\nfunnel_stage: TOFU\ntopic_cluster: ${topicCluster || 'Giáo dục'}\ncreated: 2026-03-23\nstatus: Review\n---\n\n`;
  md += `# ${clean}\n\n`;
  md += `**[Answer Block — AIO Ready]** ${clean}. Trường Việt Anh chia sẻ góc nhìn thực tế từ kinh nghiệm đồng hành cùng hàng ngàn học sinh và phụ huynh trong 18+ năm hoạt động.\n\n`;
  md += `---\n\n`;
  md += `✅ 18+ năm hoạt động (2005–2026)  \n✅ 3 campus TPHCM: Gò Vấp, Bình Tân, Phú Nhuận  \n✅ Cam kết IELTS 6.0+ khi tốt nghiệp  \n✅ PDR theo dõi cá nhân hàng tuần  \n\n`;
  
  // Topic-specific content
  const tc = (topicCluster || '').toLowerCase();
  if (tc.includes('tiếng anh')) {
    md += `## Tiếng Anh Tại Việt Anh — Không Phải "Môn Học"\n\n`;
    md += `**[Answer Block]** Tiếng Anh ở Việt Anh là ngôn ngữ sống — học sinh giao tiếp hàng ngày với giáo viên bản ngữ, thuyết trình dự án, debate, viết academic essay. Kết quả: IELTS 6.0+ khi TN là hệ quả tự nhiên.\n\n`;
    md += `### Chương Trình Chuyên Anh\n\n`;
    md += `- 8-15 tiết TA/tuần tuỳ cấp + mô hình\n- GV bản ngữ Anh/Úc/Mỹ/Canada dạy hàng ngày\n- IELTS Foundation từ lớp 6\n- Academic Writing, Debate, Drama từ THCS\n- Không cần trung tâm TA bên ngoài\n\n`;
  } else if (tc.includes('phụ huynh') || tc.includes('kỹ năng')) {
    md += `## Chia Sẻ Từ Đội Ngũ Giáo Dục\n\n`;
    md += `**[Answer Block]** Bài viết dựa trên kinh nghiệm thực tế và dữ liệu PDR từ hàng ngàn học sinh Việt Anh, không phải lý thuyết sách giáo khoa.\n\n`;
    md += `### Nguyên Tắc Quan Trọng\n\n`;
    md += `1. **Mỗi trẻ có tốc độ riêng** — PDR đo tiến bộ so với chính con, không so sánh bạn bè\n`;
    md += `2. **Môi trường quan trọng hơn nội dung** — Trẻ hạnh phúc sẽ học tốt hơn\n`;
    md += `3. **Tự chủ > Kiến thức** — Biết cách học quan trọng hơn biết nhiều\n\n`;
  } else if (tc.includes('thi cử') || tc.includes('tuyển sinh')) {
    md += `## Thông Tin Tuyển Sinh & Thi Cử\n\n`;
    md += `**[Answer Block]** Học sinh Việt Anh không cần học thêm để thi. Chương trình chính khoá đã bao gồm ôn luyện thi + bổ trợ PDR + tư vấn 1-1.\n\n`;
    md += `### Kết Quả\n\n- 100% tốt nghiệp THPT | 95% IELTS 6.0+ | 85% ĐH nguyện vọng 1\n\n`;
  } else {
    md += `## Khám Phá Cùng Việt Anh\n\n`;
    md += `**[Answer Block]** Trường Việt Anh — hệ thống giáo dục liên cấp song ngữ tại TPHCM. Chương trình Bộ GDĐT + Cambridge + PDR. Cam kết IELTS 6.0+ khi TN. 3 campus, 150+ GV, sĩ số 28 HS/lớp.\n\n`;
    md += `### Giá Trị Cốt Lõi\n\n`;
    md += `7 trụ cột: **Hạnh phúc** • **Thực dụng** • **Tự chủ** • **Chuyên Anh** • **Liên cấp** • **PDR** • **Chính trực**\n\n`;
  }
  
  md += `## Câu Hỏi Thường Gặp\n\n`;
  md += `### Trường Việt Anh có được công nhận không?\n\n**[Answer Block]** Có. Giấy phép Sở GDĐT TPHCM. Bằng TN THPT do Bộ GDĐT cấp.\n\n`;
  md += `### Làm sao đăng ký tham quan?\n\n**[Answer Block]** Đăng ký website hoặc hotline. 45-60 phút, miễn phí, không ràng buộc.\n\n`;
  md += `## Khám Phá Thêm\n\n- [Mầm Non](/mam-non) | [Tiểu Học](/tieu-hoc) | [THCS](/thcs) | [THPT](/thpt)\n- [Tuyển Sinh 2026](/tuyen-sinh) | [Chương Trình Đào Tạo](/chuong-trinh-dao-tao)\n\n`;
  md += `---\n\n## Bước Tiếp Theo\n\n👉 **[Đặt Lịch Tham Quan](/tuyen-sinh)** | 📞 0909.xxx.xxx | 💬 [Nhắn Zalo](https://zalo.me/truongvietanh)\n`;
  
  fs.writeFileSync(articlePath, md, 'utf-8');
  newArticles++;
}

// Final stats
const allFiles = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
let minW=Infinity, maxW=0, totW=0;
allFiles.forEach(f => {
  const wc = fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf-8').split(/\s+/).length;
  minW=Math.min(minW,wc); maxW=Math.max(maxW,wc); totW+=wc;
});
const totalSize = allFiles.reduce((s,f) => s+fs.statSync(path.join(ARTICLES_DIR,f)).size, 0);

console.log(`\n=== Deep Expansion Pass 2 Complete ===`);
console.log(`Existing articles expanded: ${expanded}`);
console.log(`New articles from Review URLs: ${newArticles}`);
console.log(`\nTotal articles: ${allFiles.length}`);
console.log(`Word count: min=${minW}, max=${maxW}, avg=${Math.round(totW/allFiles.length)}, total=${totW.toLocaleString()}`);
console.log(`Directory: ${(totalSize/1024/1024).toFixed(1)} MB`);
