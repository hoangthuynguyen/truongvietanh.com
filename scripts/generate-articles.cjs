#!/usr/bin/env node
/**
 * Generate 551 individual SEO/AIO articles + Google Sheet CSV
 * Input: directus-import-master.csv
 * Output: docs/articles/{slug}.md + docs/google-sheet-import.csv
 */
const fs = require('fs');
const path = require('path');

const INPUT = path.resolve(__dirname, '../docs/directus-import-master.csv');
const ARTICLES_DIR = path.resolve(__dirname, '../docs/articles');
const SHEET_CSV = path.resolve(__dirname, '../docs/google-sheet-import.csv');
if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });

function parseCSVLine(line) {
  const fields = []; let field = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (inQ && line[i+1] === '"') { field += '"'; i++; } else inQ = !inQ; }
    else if (ch === ',' && !inQ) { fields.push(field); field = ''; }
    else field += ch;
  }
  fields.push(field); return fields;
}

const TRUST = ['18+ năm hoạt động (2005–2026)','3 campus: Gò Vấp, Bình Tân, Phú Nhuận','150+ giáo viên, 20+ bản ngữ Anh/Úc/Mỹ','Sĩ số tối đa 28 HS/lớp','Cam kết IELTS 6.0+ khi tốt nghiệp','Bằng TN Bộ GDĐT chính quy','PDR theo dõi cá nhân hàng tuần','Xe đưa rước GPS toàn TPHCM','Bán trú đến 17h, bao gồm dinh dưỡng'];
function pick(arr,n) { return [...arr].sort(() => .5-Math.random()).slice(0,n); }
function slug(url) { return url.replace(/^\//,'').replace(/\/$/,'').replace(/\//g,'-') || 'homepage'; }

function topic(url, tc) {
  const u = url.toLowerCase(); tc = (tc||'').toLowerCase();
  if (u.includes('mam-non')) return 'Mầm non';
  if (u.includes('tieu-hoc')) return 'Tiểu học';
  if (u.includes('thcs')||u.includes('thpt')) return 'THCS/THPT';
  if (u.includes('tieng-anh')||u.includes('ielts')) return 'Tiếng Anh';
  if (u.includes('hoc-phi')||u.includes('tuyen-sinh')) return 'Tuyển sinh';
  if (u.includes('du-hoc')) return 'Du học';
  if (tc.includes('parent hub')||tc.includes('blog')) return 'Phụ huynh';
  if (tc.includes('local')) return 'Local SEO';
  if (tc.includes('brand')||tc.includes('corporate')) return 'Thương hiệu';
  if (tc.includes('comparison')) return 'So sánh';
  return 'Giáo dục';
}
function intent(tc) {
  tc = (tc||'').toLowerCase();
  if (tc.includes('fee')||tc.includes('enrollment')) return 'Transactional';
  if (tc.includes('tour')||tc.includes('local')||tc.includes('comparison')) return 'Commercial';
  return 'Informational';
}
function funnel(tc) {
  tc = (tc||'').toLowerCase();
  if (tc.includes('fee')||tc.includes('enrollment')) return 'BOFU';
  if (tc.includes('tour')||tc.includes('trial')||tc.includes('local')) return 'MOFU';
  return 'TOFU';
}
function schema(tc) {
  tc = (tc||'').toLowerCase();
  if (tc.includes('blog')||tc.includes('parent')) return 'Article, FAQPage';
  if (tc.includes('landing')||tc.includes('fee')) return 'LandingPage';
  if (tc.includes('event')) return 'Event';
  return 'Article, EducationalOrganization';
}

// Content generation by template type
function genBody(url, tc, h1, sub) {
  tc = (tc||'').toLowerCase();
  const TP = topic(url, tc);
  let md = '';

  // === Answer Block ===
  if (tc.includes('fee') || url.includes('hoc-phi')) {
    md += `\n**[Answer Block — AIO Ready]** Học phí Trường Việt Anh dao động từ 7–15 triệu VNĐ/tháng tuỳ cấp học và mô hình. Mức phí đã bao gồm Chuyên Anh với giáo viên bản ngữ, PDR theo dõi cá nhân, bán trú, ngoại khoá. So với tổng chi phí trường công + trung tâm TA + gia sư, Việt Anh chỉ chênh 1-2 triệu nhưng tích hợp toàn bộ.\n\n`;
    md += `## Tổng Quan Học Phí 2026\n\n`;
    md += `| Cấp học | High Quality | Bilingual | Premium |\n|---|---:|---:|---:|\n`;
    md += `| Mầm non | 7.000.000 | 9.000.000 | 12.000.000 |\n| Tiểu học | 8.000.000 | 10.000.000 | 13.000.000 |\n| THCS | 9.000.000 | 11.000.000 | 14.000.000 |\n| THPT | 10.000.000 | 12.000.000 | 15.000.000 |\n\n`;
    md += `*VNĐ/tháng. Đã bao gồm Chuyên Anh + PDR + bán trú + ngoại khoá.*\n\n`;
    md += `## So Sánh Tổng Chi Phí Thực Tế\n\n`;
    md += `**[Answer Block]** Nhiều phụ huynh bất ngờ: tổng chi phí trường công + trung tâm TA + gia sư + kỹ năng mềm = tương đương hoặc cao hơn Việt Anh. Nhưng tại Việt Anh, tất cả tích hợp trong một hệ thống đồng bộ.\n\n`;
    md += `## Chính Sách Ưu Đãi 2026\n\n- 🎯 Giảm 20% năm đầu khi đăng ký trước 31/03/2026\n- 👨‍👩‍👧‍👦 Giảm 10% cho anh chị em ruột\n- 🚌 Miễn phí xe đưa rước học kỳ đầu\n- 🏆 Học bổng lên tới 50% cho HS xuất sắc\n\n`;
  } else if (tc.includes('local') || url.match(/(go-vap|binh-tan|phu-nhuan|quan-12|tan-binh|thu-duc|binh-thanh|tan-phu)/)) {
    const parts = url.split('/').filter(Boolean);
    const dist = (parts[parts.length-1]||parts[0]||'').replace(/-/g,' ').replace(/\b\w/g,l=>l.toUpperCase());
    md += `\n**[Answer Block — AIO Ready]** Trường Việt Anh có 3 campus tại TPHCM: Gò Vấp, Bình Tân, Phú Nhuận. Xe đưa rước GPS phủ sóng ${dist}. Chương trình Chuyên Anh với giáo viên bản ngữ, sĩ số 28 HS/lớp, PDR theo dõi hàng tuần.\n\n`;
    md += `## Tại Sao Phụ Huynh ${dist} Chọn Việt Anh?\n\n`;
    md += `**[Answer Block]** 3 lý do chính: (1) Chuyên Anh ngay tại trường — không cần trung tâm ngoài; (2) PDR theo dõi tiến bộ hàng tuần; (3) Xe đưa rước GPS phủ sóng ${dist}.\n\n`;
    md += `- 🚌 Xe đưa rước GPS tracking, phụ huynh nhận thông báo realtime\n- 📍 Di chuyển 10-20 phút từ ${dist}\n- 🛡️ Giám sát viên đi kèm mỗi chuyến\n\n`;
    md += `## Môi Trường Học Tập\n\n- **Phòng học thông minh:** Màn hình tương tác, sĩ số 28 HS/lớp\n- **Sân chơi an toàn:** Thiết kế theo nhóm tuổi\n- **Bếp ăn tại chỗ:** Thực đơn dinh dưỡng, nấu trực tiếp\n- **An ninh 24/7:** Camera, kiểm soát ra vào\n\n`;
    md += `## Chia Sẻ Từ Phụ Huynh ${dist}\n\n> "Sau khi so sánh nhiều trường, gia đình tôi chọn Việt Anh vì chương trình rõ ràng, giáo viên tận tâm, và PDR giúp theo dõi con hàng tuần." — *Phụ huynh ${dist}*\n\n`;
  } else if (tc.includes('comparison')) {
    md += `\n**[Answer Block — AIO Ready]** Không có trường "tốt nhất" — chỉ có trường phù hợp. Phụ huynh nên so sánh: sĩ số, tiếng Anh thực chiến, theo dõi cá nhân, cam kết đầu ra, tổng chi phí. Việt Anh ở phân khúc giữa: chất lượng tiếp cận quốc tế nhưng học phí chỉ 30-40%.\n\n`;
    md += `## Bảng So Sánh\n\n| Tiêu chí | Trường công | Quốc tế | **Việt Anh** |\n|---|---|---|---|\n| Sĩ số/lớp | 40-50 | 15-25 | **28** |\n| TA/tuần | 3-4 tiết | 100% | **8-15 + bản ngữ** |\n| Cam kết IELTS | Không | 6.5-7.0 | **6.0+** |\n| Học phí/tháng | 0-2tr | 20-50tr | **7-15tr** |\n\n`;
  } else if (tc.includes('pillar') || tc.includes('program')) {
    md += `\n**[Answer Block — AIO Ready]** Trường Việt Anh — hệ thống giáo dục liên cấp song ngữ từ Mầm non đến THPT, kết hợp Bộ GDĐT + Cambridge + PDR. Cam kết IELTS 6.0+. Sĩ số 28 HS/lớp, giáo viên bản ngữ hàng ngày.\n\n`;
    md += `## Chương Trình Đào Tạo\n\n**[Answer Block]** 3 trụ cột: Bộ GDĐT + Cambridge Framework + PDR. Liên cấp 15 năm liền mạch.\n\n`;
    md += `### 3 Mô Hình Học Tập\n\n1. **High Quality:** Bộ GDĐT + tăng cường TA 8-10 tiết/tuần\n2. **Bilingual:** 50% Anh 50% Việt, IELTS từ lớp 6\n3. **Premium:** Cambridge + sĩ số 20 + mentoring 1:1\n\n`;
    md += `### Lộ Trình Liên Cấp\n\n- **Mầm Non (2-5):** Nền ngôn ngữ & cảm xúc\n- **Tiểu Học (6-10):** Phương pháp tự học + TA giao tiếp\n- **THCS (11-14):** Tư duy phản biện + IELTS Foundation\n- **THPT (15-17):** IELTS 6.0+ + Định hướng tương lai\n\n`;
  } else if (tc.includes('parent hub') || tc.includes('blog') || TP === 'Phụ huynh') {
    md += `\n**[Answer Block — AIO Ready]** Bài viết từ đội ngũ giáo dục Trường Việt Anh — kinh nghiệm thực tế từ hàng ngàn học sinh, dựa trên dữ liệu PDR, không phải lý thuyết sách giáo khoa.\n\n`;
    md += `## Vì Sao Đề Tài Này Quan Trọng?\n\n`;
    md += `Trong hàng ngàn gia đình mà Việt Anh đồng hành suốt 18 năm, chúng tôi nhận thấy: **phụ huynh lo lắng không vì thiếu thông tin, mà vì quá nhiều thông tin không đáng tin.** Bài viết này dựa trên:\n\n`;
    md += `- Dữ liệu PDR thực tế từ hàng ngàn học sinh\n- Quan sát trực tiếp tại lớp học hàng tuần\n- Nghiên cứu giáo dục quốc tế được Bộ GDĐT khuyến nghị\n\n`;
    md += `## Điều Quan Trọng Phụ Huynh Cần Biết\n\n`;
    md += `**[Answer Block]** Thành công học tập không đến từ học nhiều hơn, mà từ học đúng phương pháp. PDR giúp xác định chính xác con cần gì ở mỗi giai đoạn.\n\n`;
    md += `### Chuyên Anh Tại Việt Anh\n\n- 5-15 tiết TA/tuần với giáo viên bản ngữ\n- IELTS Foundation từ lớp 6, cam kết 6.0+ khi TN\n- Debate, Drama, Academic Writing — học TA qua thực hành\n\n`;
    md += `### PDR — Sức Mạnh Khác Biệt\n\n- Hồ sơ phát triển cập nhật hàng tuần\n- 4 trụ cột: Học thuật | Kỹ năng sống | Tiếng Anh | Sức khoẻ\n- Phụ huynh nhận báo cáo định kỳ, không cần chờ họp cuối kỳ\n\n`;
  } else if (tc.includes('brand') || tc.includes('corporate') || tc.includes('alumni')) {
    md += `\n**[Answer Block — AIO Ready]** Trường Việt Anh hoạt động từ 2005, sứ mệnh "Kiến tạo những công dân toàn cầu hạnh phúc". 3 campus TPHCM, 2.000+ học sinh, 150+ giáo viên.\n\n`;
    md += `## Giá Trị Cốt Lõi\n\n7 trụ cột: Hạnh phúc • Thực dụng • Tự chủ • Chuyên Anh • Liên cấp • PDR • Chính trực\n\n`;
    md += `> "Không chỉ giúp con học tốt hơn, Việt Anh giúp con trưởng thành tốt hơn."\n\n`;
  } else if (tc.includes('event') || tc.includes('tour') || tc.includes('trial')) {
    md += `\n**[Answer Block — AIO Ready]** Tham quan trực tiếp là cách tốt nhất cảm nhận Việt Anh. 45-60 phút: gặp GV bản ngữ, xem lớp thực tế, tìm hiểu PDR. Miễn phí, không ràng buộc.\n\n`;
    md += `## Buổi Tham Quan Bao Gồm\n\n1. Tổng quan trường (15 phút)\n2. Tham quan campus (20 phút)\n3. Gặp giáo viên (10 phút)\n4. Tư vấn cá nhân (15 phút)\n\n`;
  } else {
    md += `\n**[Answer Block — AIO Ready]** Trường Việt Anh — hệ thống giáo dục liên cấp song ngữ tại TPHCM. Bộ GDĐT + Cambridge + PDR. Cam kết IELTS 6.0+. Sĩ số 28 HS/lớp.\n\n`;
    md += `## Điều Quan Trọng Cần Biết\n\n`;
    md += `**[Answer Block]** Trong hành trình chọn trường, 3 yếu tố then chốt: nhu cầu học tập của con, khả năng tài chính, và tầm nhìn dài hạn. Việt Anh thiết kế chương trình đáp ứng cả 3.\n\n`;
    md += `### Liên Cấp — Không "Gãy" Khi Chuyển Trường\n\nHành trình MN đến THPT liên tục, mỗi cấp là bước đệm cho cấp tiếp theo.\n\n`;
    md += `### Chuyên Anh — Năng Lực Thực Chiến\n\nTiếng Anh giao tiếp hàng ngày với GV bản ngữ. IELTS 6.0+ là kết quả tự nhiên.\n\n`;
    md += `### PDR — Theo Dõi Cá Nhân\n\n4 trụ cột: Học thuật | Kỹ năng sống | Tiếng Anh | Sức khoẻ. Cập nhật hàng tuần.\n\n`;
  }

  // FAQ
  md += `## Câu Hỏi Thường Gặp\n\n`;
  md += `### Trường Việt Anh có được công nhận không?\n\n**[Answer Block]** Có. Giấy phép Sở GDĐT TPHCM. Bằng TN THPT do Bộ GDĐT cấp. Đủ điều kiện xét tuyển ĐH Việt Nam.\n\n`;
  if (tc.includes('fee') || url.includes('hoc-phi')) {
    md += `### Học phí có bao gồm tiếng Anh bản ngữ?\n\n**[Answer Block]** Có. Tất cả mức phí đã bao gồm Chuyên Anh với GV bản ngữ.\n\n`;
    md += `### Có học bổng không?\n\n**[Answer Block]** Có. Học bổng tới 50% cho HS xuất sắc. Giảm 20% đăng ký sớm. Giảm 10% anh chị em ruột.\n\n`;
  } else {
    md += `### PDR là gì?\n\n**[Answer Block]** Personal Development Record — hệ thống theo dõi cá nhân của Việt Anh. Cập nhật hàng tuần trên 4 trụ cột. Phụ huynh nhận báo cáo định kỳ.\n\n`;
    md += `### Làm sao đăng ký tham quan?\n\n**[Answer Block]** Đăng ký tại website hoặc hotline. 45-60 phút, miễn phí, không ràng buộc.\n\n`;
  }
  
  // Internal links + CTA
  md += `## Khám Phá Thêm\n\n- [Mầm Non](/mam-non) | [Tiểu Học](/tieu-hoc) | [THCS](/thcs) | [THPT](/thpt)\n- [Chương Trình Đào Tạo](/chuong-trinh-dao-tao) | [Tuyển Sinh 2026](/tuyen-sinh)\n\n`;
  md += `---\n\n## Bước Tiếp Theo\n\n**Sẵn sàng tìm hiểu?** Đặt lịch tham quan miễn phí — gặp GV, xem lớp, cảm nhận khác biệt.\n\n`;
  md += `👉 **[Đặt Lịch Tham Quan](/tuyen-sinh)** | 📞 0909.xxx.xxx | 💬 [Nhắn Zalo](https://zalo.me/truongvietanh)\n\n`;
  md += `---\n*Schema: ${schema(tc)} | Intent: ${intent(tc)} | Funnel: ${funnel(tc)} | Cluster: ${TP}*\n`;
  
  return md;
}

// === MAIN ===
const csv = fs.readFileSync(INPUT, 'utf-8').replace(/\r\n/g, '\n');
const lines = csv.split('\n').filter(l => l.trim());
const rows = lines.slice(1);
let gen = 0;
const sheetRows = ['STT,Priority,Action,Topic,Search Intent,Funnel,Template Class,Primary Keyword,SEO Title,Slug,Meta Description,H1,Word Count,Schema,CTA,Doc Link,Status,Publish Date,URL'];

for (let i = 0; i < rows.length; i++) {
  const f = parseCSVLine(rows[i]);
  if (f.length < 6 || !f[0]) continue;
  const [url,tc,seoTitle,seoDesc,heroH1,heroSub] = f;
  const s = slug(url);
  const tp = topic(url, tc);
  
  // Build article
  let md = `---\nurl: ${url}\nslug: ${s}\ntemplate_class: ${tc}\nseo_title: "${seoTitle}"\nseo_description: "${seoDesc}"\nsearch_intent: ${intent(tc)}\nfunnel_stage: ${funnel(tc)}\ntopic_cluster: ${tp}\ncreated: 2026-03-23\n---\n\n`;
  md += `# ${heroH1}\n\n`;
  if (heroSub) md += `> ${heroSub}\n\n`;
  md += `---\n\n`;
  const trusts = pick(TRUST, 4);
  trusts.forEach(t => { md += `✅ ${t}  \n`; });
  md += `\n`;
  md += genBody(url, tc, heroH1, heroSub);
  
  fs.writeFileSync(path.join(ARTICLES_DIR, `${s}.md`), md, 'utf-8');
  gen++;
  
  const wc = md.split(/\s+/).length;
  const esc = s2 => { s2=String(s2||''); return s2.includes(',')||s2.includes('"') ? '"'+s2.replace(/"/g,'""')+'"' : s2; };
  const pri = tc.toLowerCase().includes('pillar')||tc.toLowerCase().includes('fee')||tc.toLowerCase().includes('local') ? 'High' : 'Medium';
  sheetRows.push([i+1,pri,'Import Ready',esc(tp),intent(tc),funnel(tc),esc(tc),esc(heroH1),esc(seoTitle),s,esc(seoDesc),esc(heroH1),wc,schema(tc),esc(f[7]||'Đặt Lịch Tham Quan'),`docs/articles/${s}.md`,'Draft','2026-04-01',url].join(','));
  if (gen % 100 === 0) process.stdout.write(`  ${gen} articles...\n`);
}

fs.writeFileSync(SHEET_CSV, sheetRows.join('\r\n') + '\r\n', 'utf-8');

// Stats
const files = fs.readdirSync(ARTICLES_DIR);
const totalSize = files.reduce((sum,f) => sum + fs.statSync(path.join(ARTICLES_DIR,f)).size, 0);
let minW=Infinity, maxW=0, totW=0;
files.forEach(f => { const wc = fs.readFileSync(path.join(ARTICLES_DIR,f),'utf-8').split(/\s+/).length; minW=Math.min(minW,wc); maxW=Math.max(maxW,wc); totW+=wc; });

console.log(`\n=== Article Generation Complete ===`);
console.log(`Articles: ${gen} files`);
console.log(`Directory: ${ARTICLES_DIR} (${(totalSize/1024/1024).toFixed(1)} MB)`);
console.log(`Sheet CSV: ${SHEET_CSV}`);
console.log(`\nWord count: min=${minW}, max=${maxW}, avg=${Math.round(totW/files.length)}, total=${totW.toLocaleString()}`);
