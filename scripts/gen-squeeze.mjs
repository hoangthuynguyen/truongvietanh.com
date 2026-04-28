#!/usr/bin/env node
// Generate 17 squeeze pages from checklist-mam-non.astro template
// Usage: node scripts/gen-squeeze.mjs
import fs from 'node:fs';
import path from 'node:path';

const DEST = 'src/pages/squeeze';

// ── 17 page configs ──────────────────────────────────────────────────
const PAGES = [
  // ═══ MẦM NON ═══
  {
    slug: 'ebook-9-linh-vuc-mam-non',
    title: '9 Lĩnh Vực Phát Triển Toàn Diện Mầm Non – Ebook Miễn Phí | Trường Việt Anh',
    desc: 'Ebook 9 lĩnh vực phát triển toàn diện cho trẻ 2–5 tuổi. 2.654 ba mẹ đã tải. Hoạt động kích thích + dấu hiệu phát triển + tự đánh giá. Miễn phí.',
    eyebrowBadge: 'CẢNH BÁO',
    eyebrowText: 'Dành cho ba mẹ có con 2–5 tuổi',
    headline: `Dạy con theo bản năng —<br><span class="stat">9 trong 10 ba mẹ</span> bỏ lỡ <u>nền tảng quan trọng nhất</u><br>của giai đoạn vàng`,
    sub: `Ebook <strong>9 lĩnh vực phát triển</strong> giúp bạn hiểu con toàn diện và kích thích đúng cách trong giai đoạn 2–5 tuổi — <strong>không hối hận khi con vào lớp 1</strong>`,
    bullets: [
      '<b>9 lĩnh vực phát triển</b> toàn diện (ngôn ngữ, tư duy, thể chất, cảm xúc…) — mục tiêu cụ thể từng độ tuổi',
      '<b>Hoạt động kích thích tại nhà</b> — đơn giản, không cần dụng cụ đắt tiền',
      '<b>Dấu hiệu phát triển bình thường</b> — và khi nào cần lo lắng để can thiệp sớm',
      '<b>Tự đánh giá con</b> trên 9 lĩnh vực — biết ngay điểm mạnh và điểm cần hỗ trợ',
    ],
    proof: '<strong>2.654 ba mẹ</strong> đã tải Ebook · <strong>96%</strong> đọc hết và áp dụng',
    directive: 'Nhấn vào nút vàng bên dưới để nhận Ebook miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN EBOOK MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-ebook-9-linh-vuc-mam-non.png',
    mockupAlt: 'Ebook 9 Lĩnh Vực Phát Triển Toàn Diện Cho Trẻ Mầm Non 2026',
    arrowText: 'Nhấn nút vàng để tải ebook miễn phí',
    quote: '"Tôi cứ nghĩ bé nhà mình phát triển bình thường. Sau khi đọc ebook này, tôi mới biết mình đang bỏ sót 3 lĩnh vực quan trọng."',
    name: 'Chị Thanh Hà',
    meta: 'Mẹ bé 3 tuổi · Quận 3, TP.HCM',
    initials: 'TH',
    urgency: 'suất nhận Ebook + tư vấn miễn phí',
    stickyCta: 'NHẬN EBOOK MIỄN PHÍ NGAY',
    popup1Title: 'Nhập email — nhận Ebook trong 60 giây',
    popup2Title: 'Bước cuối — nhận Ebook + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Ebook 9 lĩnh vực mầm non',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn phương pháp phù hợp',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử 1 buổi tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-mn9',
    funnel: 'squeeze-ebook-9-linh-vuc',
    level: 'mam-non',
  },
  {
    slug: 'giai-doan-vang-ngon-ngu',
    title: 'Giai Đoạn Vàng Ngôn Ngữ 0–6 Tuổi – Tài Liệu Miễn Phí | Trường Việt Anh',
    desc: 'Timeline phát triển ngôn ngữ 0–6 tuổi theo nghiên cứu Cornell. Dấu hiệu chậm + cách kích thích song ngữ. 2.847 ba mẹ đã đọc. Miễn phí.',
    eyebrowBadge: 'QUAN TRỌNG',
    eyebrowText: 'Dành cho ba mẹ có con 0–6 tuổi',
    headline: `Bỏ lỡ giai đoạn vàng 0–6 tuổi —<br><span class="stat">hậu quả ngôn ngữ</span> không thể đảo ngược<br>khi con lớn`,
    sub: `Timeline phát triển ngôn ngữ <strong>chi tiết từng giai đoạn</strong> + cách kích thích song ngữ tự nhiên — <strong>trước khi quá muộn</strong>`,
    bullets: [
      '<b>Timeline chuẩn</b> phát triển ngôn ngữ 0–6 tuổi theo nghiên cứu ĐH Cornell, GS Erika Hoff',
      '<b>Dấu hiệu chậm ngôn ngữ</b> — nhận biết sớm, can thiệp kịp thời, không bỏ lỡ giai đoạn vàng',
      '<b>Cách kích thích song ngữ</b> từ sơ sinh — không cần dạy, chỉ cần tạo môi trường đúng',
      '<b>Khi nào cần gặp chuyên gia</b> — và bước tiếp theo nếu con có dấu hiệu chậm',
    ],
    proof: '<strong>2.847 ba mẹ</strong> đã đọc · <strong>91%</strong> thay đổi cách tương tác với con',
    directive: 'Nhấn nút vàng bên dưới để nhận tài liệu miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN TÀI LIỆU MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-giai-doan-vang-ngon-ngu.png',
    mockupAlt: 'Tài liệu Giai Đoạn Vàng Ngôn Ngữ 0–6 Tuổi 2026',
    arrowText: 'Nhấn nút vàng để tải tài liệu miễn phí',
    quote: '"Đọc xong tôi mới hiểu vì sao bé nhà mình 3 tuổi vẫn nói ít. Áp dụng 2 tuần đã thấy bé chủ động nói nhiều hơn hẳn."',
    name: 'Chị Mỹ Linh',
    meta: 'Mẹ bé 3 tuổi · Bình Thạnh, TP.HCM',
    initials: 'ML',
    urgency: 'suất nhận tài liệu + tư vấn miễn phí',
    stickyCta: 'NHẬN TÀI LIỆU MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận tài liệu trong 60 giây',
    popup2Title: 'Bước cuối — nhận tài liệu + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Giai đoạn vàng ngôn ngữ',
    vsPrice1: '99.000đ',
    vsItem2: '🎯 Tư vấn 1:1 với chuyên gia ngôn ngữ',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử song ngữ tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '949.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-gdv',
    funnel: 'squeeze-giai-doan-vang',
    level: 'mam-non',
  },
  {
    slug: 'quiz-phuong-phap-giao-duc',
    title: 'Quiz: Con Bạn Phù Hợp Phương Pháp Giáo Dục Nào? | Trường Việt Anh',
    desc: '8 câu hỏi → 4 kết quả profile (Khám Phá, Nghệ Sĩ, Lãnh Đạo, Ngôn Ngữ) + gợi ý môi trường học. 5.127 ba mẹ đã làm quiz. Miễn phí.',
    eyebrowBadge: 'QUIZ MIỄN PHÍ',
    eyebrowText: 'Dành cho ba mẹ có con 2–6 tuổi',
    headline: `Nuôi dạy con 5 năm theo cảm tính —<br>chưa biết con phù hợp với<br><span class="stat">phương pháp giáo dục nào</span>`,
    sub: `<strong>8 câu hỏi → 4 kết quả profile</strong> → biết ngay con thuộc nhóm Khám Phá / Nghệ Sĩ / Lãnh Đạo / Ngôn Ngữ — và <strong>trường nào phù hợp nhất</strong>`,
    bullets: [
      '<b>8 câu hỏi quiz</b> về tính cách, sở thích của con — trả lời trong 2 phút',
      '<b>4 nhóm phương pháp</b> (Montessori, STEAM, Art-based, Song ngữ) — phân tích điểm phù hợp',
      '<b>Gợi ý môi trường học</b> cụ thể phù hợp từng nhóm trẻ — không phải đoán mò',
      '<b>Kết quả PDF</b> gửi về email — chia sẻ với thầy cô để hỗ trợ con tốt hơn',
    ],
    proof: '<strong>5.127 phụ huynh</strong> đã làm quiz · <strong>89%</strong> tìm ra hướng phù hợp cho con',
    directive: 'Nhấn nút vàng bên dưới để bắt đầu quiz — kết quả trong 2 phút',
    ctaText: 'LÀM QUIZ NGAY — KẾT QUẢ TRONG 2 PHÚT',
    mockupSrc: '/mockup-quiz-phuong-phap-giao-duc.png',
    mockupAlt: 'Quiz Phương Pháp Giáo Dục Phù Hợp Cho Con 2026',
    arrowText: 'Nhấn nút vàng để bắt đầu quiz miễn phí',
    quote: '"Tôi cứ ép con học Montessori vì hàng xóm khen. Quiz cho biết con tôi hợp Art-based, đổi trường 1 tháng sau bé vui hẳn lên."',
    name: 'Anh Quốc Bảo',
    meta: 'Bố bé 4 tuổi · Quận 7, TP.HCM',
    initials: 'QB',
    urgency: 'suất làm quiz + tư vấn miễn phí',
    stickyCta: 'LÀM QUIZ MIỄN PHÍ NGAY',
    popup1Title: 'Nhập email — nhận quiz và kết quả qua email',
    popup2Title: 'Bước cuối — làm quiz + nhận 3 quà tặng miễn phí',
    vsItem1: '✅ Quiz 8 câu + Kết quả profile PDF',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn phương pháp giáo dục',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử 1 buổi tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-quiz',
    funnel: 'squeeze-quiz-phuong-phap',
    level: 'mam-non',
  },
  // ═══ TIỂU HỌC ═══
  {
    slug: 'lo-trinh-tieng-anh-lop1-5',
    title: 'Lộ Trình Tiếng Anh Lớp 1–5 Chuẩn Oxford – Tải Miễn Phí | Trường Việt Anh',
    desc: 'Lộ trình 5 năm từ Phonics → Cambridge Starters theo chuẩn Oxford. Số tiết, giáo trình, từ vựng từng năm. 3.678 phụ huynh đã tải. Miễn phí.',
    eyebrowBadge: 'CẢNH BÁO',
    eyebrowText: 'Dành cho ba mẹ có con đang học Tiểu học',
    headline: `Học Tiếng Anh 5 năm tiểu học vẫn hổng —<br>vì <span class="stat">thiếu lộ trình chuẩn Oxford</span><br>từ đầu`,
    sub: `Lộ trình 5 năm theo <strong>chuẩn Oxford</strong> từ Lớp 1 → Lớp 5 — mục tiêu từng năm, kỹ năng cần đạt, và <strong>cách theo dõi tiến độ thực sự của con</strong>`,
    bullets: [
      '<b>Lộ trình 5 năm</b> cụ thể: Phonics → Cambridge Starters (Lớp 5) — milestone từng năm',
      '<b>Số tiết/tuần + giáo trình</b> chuẩn quốc tế cho từng cấp lớp — không học sai sách',
      '<b>Từ vựng cần nắm</b> mỗi năm (300 → 2.000+ từ) — và cách kiểm tra đơn giản tại nhà',
      '<b>Dấu hiệu con đang học đúng hướng</b> — vs đang lãng phí thời gian',
    ],
    proof: '<strong>3.678 phụ huynh</strong> đã tải · <strong>88%</strong> điều chỉnh lại cách học của con',
    directive: 'Nhấn nút vàng bên dưới để nhận lộ trình miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN LỘ TRÌNH MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-lo-trinh-tieng-anh-lop1-5.png',
    mockupAlt: 'Lộ Trình Tiếng Anh Tiểu Học Lớp 1–5 Chuẩn Oxford 2026',
    arrowText: 'Nhấn nút vàng để tải lộ trình miễn phí',
    quote: '"Bé học tiếng Anh 3 năm nhưng vẫn không nói được. Đối chiếu lộ trình mới biết bé đang học chậm 1 năm so với chuẩn — đã đổi cách học và tiến bộ rõ rệt."',
    name: 'Chị Phương Mai',
    meta: 'Mẹ bé lớp 3 · Tân Bình, TP.HCM',
    initials: 'PM',
    urgency: 'suất nhận lộ trình + tư vấn miễn phí',
    stickyCta: 'NHẬN LỘ TRÌNH MIỄN PHÍ NGAY',
    popup1Title: 'Nhập email — nhận lộ trình trong 60 giây',
    popup2Title: 'Bước cuối — nhận lộ trình + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Lộ trình tiếng Anh 5 năm',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 lộ trình cá nhân hóa',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử tiếng Anh 1 buổi',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-lota',
    funnel: 'squeeze-lo-trinh-tieng-anh',
    level: 'tieu-hoc',
  },
  {
    slug: 'so-sanh-chi-phi-hoc',
    title: 'Bảng So Sánh Chi Phí Thật 2026: Trường Công vs Song Ngữ vs Quốc Tế',
    desc: 'Bảng so sánh chi phí 1 năm + 5 năm: Trường Công + Học thêm vs Song ngữ vs Quốc tế. Tính cả chi phí ẩn. 3.089 phụ huynh đã xem. Miễn phí.',
    eyebrowBadge: 'SỐ LIỆU 2026',
    eyebrowText: 'Dành cho phụ huynh đang cân nhắc chọn trường',
    headline: `Chọn trường không biết chi phí thật —<br><span class="stat">nhiều gia đình bị bất ngờ</span><br>hàng chục triệu mỗi năm`,
    sub: `Bảng so sánh chi phí thực tế 2026: <strong>Trường Công + Học thêm</strong> vs <strong>Song ngữ (Việt Anh)</strong> vs <strong>Quốc tế</strong> — tính tổng 1 năm + 5 năm, kể cả chi phí ẩn`,
    bullets: [
      '<b>Chi phí thực tế</b> từng loại trường (học phí + sách + đồng phục + ngoại khóa + học thêm)',
      '<b>Chi phí ẩn</b> mà trường không nói trước — phụ huynh hay bị bất ngờ nhất',
      '<b>So sánh tổng 5 năm</b> — trường nào thật sự tiết kiệm hơn khi tính đủ',
      '<b>Học bổng và hỗ trợ</b> tài chính — điều kiện và cách nộp đơn',
    ],
    proof: '<strong>3.089 phụ huynh</strong> đã xem · <strong>76%</strong> thay đổi quyết định chọn trường',
    directive: 'Nhấn nút vàng bên dưới để nhận bảng so sánh miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN BẢNG SO SÁNH MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-so-sanh-chi-phi-hoc.png',
    mockupAlt: 'Bảng So Sánh Chi Phí Trường Công vs Song Ngữ vs Quốc Tế 2026',
    arrowText: 'Nhấn nút vàng để tải bảng so sánh miễn phí',
    quote: '"Tưởng trường tư đắt hơn trường công nhiều, nhưng tính cả học thêm + ngoại khóa thì chỉ chênh 30%. Đáng đồng tiền cho chất lượng nhận lại."',
    name: 'Anh Minh Tuấn',
    meta: 'Bố con lớp 4 · Phú Nhuận, TP.HCM',
    initials: 'MT',
    urgency: 'suất nhận bảng so sánh + tư vấn miễn phí',
    stickyCta: 'NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận bảng so sánh trong 60 giây',
    popup2Title: 'Bước cuối — nhận bảng + 3 quà tặng miễn phí',
    vsItem1: '✅ Bảng so sánh chi phí 1 năm + 5 năm',
    vsPrice1: '99.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn trường theo ngân sách',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử miễn phí tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '949.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-cphi',
    funnel: 'squeeze-so-sanh-chi-phi',
    level: 'tieu-hoc',
  },
  {
    slug: 'huong-dan-dang-ky-lop1',
    title: 'Hướng Dẫn Chuyển Trường Vào Lớp 1 – Checklist + Timeline 6 Tháng',
    desc: 'Timeline 6 tháng + Checklist hồ sơ đầy đủ + 5 tiêu chí đánh giá trường. 4.200 phụ huynh đã tải. 93% nộp hồ sơ đúng hạn. Miễn phí.',
    eyebrowBadge: 'DEADLINE GẦN',
    eyebrowText: 'Dành cho ba mẹ chuẩn bị cho con vào Lớp 1',
    headline: `Nộp hồ sơ lớp 1 trễ deadline —<br><span class="stat">con mất suất trường tốt</span><br>vĩnh viễn, không có đợt 2`,
    sub: `<strong>Timeline 6 tháng</strong> + <strong>Checklist hồ sơ đầy đủ</strong> + Chuẩn bị tâm lý cho con — giúp bạn không bỏ sót bất cứ bước nào trong mùa tuyển sinh`,
    bullets: [
      '<b>Timeline 6 tháng</b> từ tháng 1 → tháng 7 — biết chính xác cần làm gì mỗi tháng',
      '<b>Checklist hồ sơ đầy đủ</b> (11 giấy tờ) — và hậu quả nếu thiếu chỉ 1 giấy',
      '<b>5 tiêu chí đánh giá trường</b> — chọn đúng trường phù hợp con, không phải trường gần nhà',
      '<b>Chuẩn bị tâm lý cho con</b> — 5 bước giảm lo lắng trước ngày nhập học',
    ],
    proof: '<strong>4.200 phụ huynh</strong> đã tải · <strong>93%</strong> nộp hồ sơ đúng hạn và đủ giấy tờ',
    directive: 'Nhấn nút vàng bên dưới để nhận checklist miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN CHECKLIST + TIMELINE MIỄN PHÍ',
    mockupSrc: '/mockup-huong-dan-dang-ky-lop1.png',
    mockupAlt: 'Hướng Dẫn Đăng Ký Lớp 1 — Checklist + Timeline 6 Tháng 2026',
    arrowText: 'Nhấn nút vàng để tải checklist miễn phí',
    quote: '"Tôi suýt nộp hồ sơ trễ vì thiếu 1 bản photo CMND. Cũng may có checklist này phát hiện kịp, nộp hôm cuối cùng còn ngày."',
    name: 'Chị Bích Trâm',
    meta: 'Mẹ bé sắp vào lớp 1 · Quận 2, TP.HCM',
    initials: 'BT',
    urgency: 'suất nhận checklist + tư vấn miễn phí',
    stickyCta: 'NHẬN CHECKLIST MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận checklist trong 60 giây',
    popup2Title: 'Bước cuối — nhận checklist + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Timeline + Checklist hồ sơ lớp 1',
    vsPrice1: '99.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn trường tiểu học',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử lớp 1 tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '949.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-lop1',
    funnel: 'squeeze-dang-ky-lop1',
    level: 'tieu-hoc',
  },
  {
    slug: 'reading-challenge-30-ngay',
    title: 'Reading Challenge 30 Ngày Đọc Sách Song Ngữ – Tải Miễn Phí',
    desc: 'Bộ thử thách 30 ngày đọc sách song ngữ Việt–Anh. Bảng theo dõi + sticker phần thưởng + nhật ký đọc. 2.847 ba mẹ đã tải. Miễn phí.',
    eyebrowBadge: 'THÁCH THỨC',
    eyebrowText: 'Dành cho ba mẹ muốn con yêu sách',
    headline: `Con không chịu đọc sách —<br>vì chưa có <span class="stat">thử thách đủ thú vị</span><br>với phần thưởng rõ ràng`,
    sub: `Bộ thử thách <strong>30 ngày đọc sách song ngữ</strong> Việt–Anh — bảng theo dõi, sticker phần thưởng, nhật ký đọc — <strong>con chủ động đọc, ba mẹ không cần ép</strong>`,
    bullets: [
      '<b>30 ngày × 1 hoạt động đọc</b> — từ 10 phút/ngày, tăng dần, không áp lực',
      '<b>Bảng theo dõi + sticker</b> — con tự dán, tự theo dõi, tự hào về tiến độ',
      '<b>Sách song ngữ Việt–Anh</b> gợi ý mỗi tuần — đọc được ngay, không cần mua thêm',
      '<b>Nhật ký đọc sách</b> — ghi cảm xúc, tóm tắt, và chia sẻ cùng gia đình',
    ],
    proof: '<strong>2.847 phụ huynh</strong> đã tải · <strong>81%</strong> bé hoàn thành đủ 30 ngày',
    directive: 'Nhấn nút vàng bên dưới để nhận bộ thử thách miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN BỘ THÁCH THỨC MIỄN PHÍ',
    mockupSrc: '/mockup-reading-challenge-30-ngay.png',
    mockupAlt: 'Reading Challenge 30 Ngày Đọc Sách Song Ngữ Việt-Anh 2026',
    arrowText: 'Nhấn nút vàng để tải miễn phí',
    quote: '"Lần đầu bé chủ động đòi mẹ mua thêm sách sau 2 tuần thử thách. Sticker phần thưởng đúng là động lực vô địch."',
    name: 'Chị Lan Anh',
    meta: 'Mẹ bé lớp 2 · Bình Tân, TP.HCM',
    initials: 'LA',
    urgency: 'suất nhận bộ thử thách + tư vấn miễn phí',
    stickyCta: 'NHẬN THÁCH THỨC MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận bộ thử thách trong 60 giây',
    popup2Title: 'Bước cuối — nhận bộ + 3 quà tặng miễn phí',
    vsItem1: '✅ Bảng 30 ngày + Sticker + Nhật ký đọc',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn sách phù hợp con',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử Reading Club',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-rc30',
    funnel: 'squeeze-reading-challenge',
    level: 'tieu-hoc',
  },
  {
    slug: 'checklist-10-ky-nang-lop1',
    title: '10 Kỹ Năng Con Cần Có Trước Khi Vào Lớp 1 – Checklist Miễn Phí',
    desc: 'Checklist 10 kỹ năng quan trọng trước Lớp 1 + cách tập tại nhà + bài test kiểm tra. 1.832 phụ huynh đã tải. 87% bé tự tin hơn. Miễn phí.',
    eyebrowBadge: 'CẢNH BÁO',
    eyebrowText: 'Dành cho ba mẹ chuẩn bị cho con vào Lớp 1',
    headline: `Bé thông minh vẫn khóc tuần đầu lớp 1 —<br>vì thiếu <span class="stat">10 kỹ năng này</span><br>mà ba mẹ không biết cần chuẩn bị`,
    sub: `Checklist <strong>10 kỹ năng cần có</strong> trước Lớp 1 — cách tập tại nhà + bài test kiểm tra — giúp bé <strong>tự tin ngay từ ngày đầu</strong>`,
    bullets: [
      '<b>10 kỹ năng</b> cần thiết (tự chủ, giao tiếp, tập trung, cảm xúc…) — tiêu chí đạt rõ ràng',
      '<b>Cách tập tại nhà</b> cho mỗi kỹ năng — đơn giản, có thể làm ngay hôm nay',
      '<b>Bài test kiểm tra</b> mỗi kỹ năng — biết con đang ở đâu trong 5 phút',
      '<b>Lịch tập 8 tuần</b> — từ tháng 5 → tháng 8, chuẩn bị đúng hạn cho năm học mới',
    ],
    proof: '<strong>1.832 phụ huynh</strong> đã tải · <strong>87%</strong> bé tự tin hơn rõ rệt sau 4 tuần tập',
    directive: 'Nhấn nút vàng bên dưới để nhận checklist miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN CHECKLIST 10 KỸ NĂNG MIỄN PHÍ',
    mockupSrc: '/mockup-checklist-10-ky-nang-lop1.png',
    mockupAlt: 'Checklist 10 Kỹ Năng Con Cần Có Trước Khi Vào Lớp 1',
    arrowText: 'Nhấn nút vàng để tải checklist miễn phí',
    quote: '"Bé nhà tôi đã biết đọc, biết đếm, nhưng không biết tự buộc dây giày. Checklist này nhắc tôi nhớ đến những kỹ năng tưởng nhỏ mà rất quan trọng."',
    name: 'Chị Hương Giang',
    meta: 'Mẹ bé sắp lớp 1 · Quận 9, TP.HCM',
    initials: 'HG',
    urgency: 'suất nhận checklist + tư vấn miễn phí',
    stickyCta: 'NHẬN CHECKLIST MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận checklist trong 60 giây',
    popup2Title: 'Bước cuối — nhận checklist + 3 quà tặng miễn phí',
    vsItem1: '✅ Checklist 10 kỹ năng + Bài test',
    vsPrice1: '99.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chuẩn bị tâm lý cho bé',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử lớp 1 tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '949.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-kn1',
    funnel: 'squeeze-ky-nang-lop1',
    level: 'tieu-hoc',
  },
  {
    slug: 'conversation-cards-song-ngu',
    title: '50 Câu Hỏi Song Ngữ Cho Gia Đình Cùng Con – Tải Miễn Phí',
    desc: '50 thẻ câu hỏi song ngữ Việt-Anh, 5 chủ đề. In ra cắt dùng ngay. 4.102 gia đình đã tải. 79% dùng thường xuyên. Miễn phí.',
    eyebrowBadge: 'MIỄN PHÍ',
    eyebrowText: 'Dành cho ba mẹ muốn con học tiếng Anh tự nhiên',
    headline: `Học tiếng Anh mãi mà không nói được —<br>vì thiếu <span class="stat">luyện hội thoại thực tế</span><br>cùng gia đình mỗi ngày`,
    sub: `<strong>50 câu hỏi song ngữ</strong> Việt–Anh cho cả nhà cùng trò chuyện — 5 chủ đề, in ra cắt dùng ngay — <strong>con học tiếng Anh qua chuyện tự nhiên</strong>`,
    bullets: [
      '<b>50 câu hỏi song ngữ</b> (cảm xúc, tương lai, sáng tạo, gia đình, kỷ niệm) — in ra cắt dùng',
      '<b>5 chủ đề</b> phát triển tư duy + ngôn ngữ — con vừa học vừa kết nối gia đình',
      '<b>Bảng từ vựng</b> theo chủ đề — tra ngay khi cần, không cần từ điển',
      '<b>Bảng theo dõi 30 ngày</b> — chụp ảnh gửi nhóm phụ huynh, nhận Chứng Nhận',
    ],
    proof: '<strong>4.102 gia đình</strong> đã tải · <strong>79%</strong> dùng thường xuyên sau 1 tuần',
    directive: 'Nhấn nút vàng bên dưới để nhận bộ thẻ miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN BỘ THẺ SONG NGỮ MIỄN PHÍ',
    mockupSrc: '/mockup-conversation-cards-song-ngu.png',
    mockupAlt: '50 Câu Hỏi Song Ngữ Cho Gia Đình Trò Chuyện Cùng Con',
    arrowText: 'Nhấn nút vàng để tải bộ thẻ miễn phí',
    quote: '"Bữa cơm nào cũng dùng 1 thẻ. Bé nhà tôi từ ngại nói tiếng Anh giờ đã chủ động hỏi câu mới. Cách học tự nhiên hơn nhiều so với app."',
    name: 'Chị Khánh Linh',
    meta: 'Mẹ bé lớp 3 · Gò Vấp, TP.HCM',
    initials: 'KL',
    urgency: 'suất nhận bộ thẻ + tư vấn miễn phí',
    stickyCta: 'NHẬN BỘ THẺ MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận bộ thẻ trong 60 giây',
    popup2Title: 'Bước cuối — nhận bộ thẻ + 3 quà tặng miễn phí',
    vsItem1: '✅ 50 thẻ song ngữ PDF + Bảng theo dõi',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 lộ trình tiếng Anh tự nhiên',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher học thử song ngữ tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-conv',
    funnel: 'squeeze-conversation-cards',
    level: 'tieu-hoc',
  },
  // ═══ THCS ═══
  {
    slug: 'chuyen-truong-lop6',
    title: 'Hướng Dẫn Chuyển Trường Vào Lớp 6 – Checklist + Timeline 4 Tháng',
    desc: 'Timeline 4 tháng + Checklist hồ sơ + So sánh 3 loại trường THCS. 2.156 phụ huynh đã tải. 91% nộp hồ sơ đúng hạn. Miễn phí.',
    eyebrowBadge: 'DEADLINE GẦN',
    eyebrowText: 'Dành cho phụ huynh chuẩn bị cho con vào THCS',
    headline: `Bỏ lỡ deadline nộp hồ sơ lớp 6 —<br><span class="stat">con mất suất THCS tốt</span><br>không lấy lại được trong năm đó`,
    sub: `Timeline <strong>4 tháng</strong> + Checklist hồ sơ chi tiết + So sánh <strong>3 loại trường THCS</strong> — chuẩn bị đúng, nộp đúng hạn, chọn đúng trường`,
    bullets: [
      '<b>Timeline 4 tháng</b> cụ thể — biết chính xác tháng 3, 4, 5, 6 cần làm gì',
      '<b>Checklist hồ sơ nhập học lớp 6</b> (đầy đủ + bản dự phòng) — không thiếu 1 tờ giấy',
      '<b>5 tiêu chí đánh giá trường THCS</b> — IELTS target, chương trình, giáo viên, ngoại khóa',
      '<b>So sánh 3 loại trường</b> (Công lập, Tư thục, Song ngữ Việt Anh) — phù hợp từng mục tiêu',
    ],
    proof: '<strong>2.156 phụ huynh</strong> đã tải · <strong>91%</strong> nộp hồ sơ đúng hạn và vào trường mong muốn',
    directive: 'Nhấn nút vàng bên dưới để nhận checklist miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN CHECKLIST + TIMELINE MIỄN PHÍ',
    mockupSrc: '/mockup-chuyen-truong-lop6.png',
    mockupAlt: 'Hướng Dẫn Chuyển Trường Vào Lớp 6 — Checklist + Timeline',
    arrowText: 'Nhấn nút vàng để tải checklist miễn phí',
    quote: '"Tôi không nghĩ chuyển từ tiểu học sang THCS lại nhiều giấy tờ và deadline khó nhớ vậy. Checklist này thật sự cứu cả nhà tôi."',
    name: 'Chị Thu Hiền',
    meta: 'Mẹ bé sắp lớp 6 · Tân Phú, TP.HCM',
    initials: 'TH',
    urgency: 'suất nhận checklist + tư vấn miễn phí',
    stickyCta: 'NHẬN CHECKLIST MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận checklist trong 60 giây',
    popup2Title: 'Bước cuối — nhận checklist + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Timeline + Checklist + So sánh trường',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn trường THCS phù hợp',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher tham quan trường + học thử',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-lop6',
    funnel: 'squeeze-chuyen-truong-lop6',
    level: 'thcs',
  },
  {
    slug: 'lo-trinh-ielts-thcs',
    title: 'Lộ Trình IELTS 4 Năm THCS (Lớp 6–9) – Tài Liệu Miễn Phí',
    desc: 'Lộ trình IELTS 4 năm THCS từ A2 → B2. Mục tiêu từng năm, kỹ năng trọng tâm, mock test timeline. 1.543 đã tải. 84% cải thiện sau 6 tháng. Miễn phí.',
    eyebrowBadge: 'LỘ TRÌNH CHUẨN',
    eyebrowText: 'Dành cho học sinh và phụ huynh THCS',
    headline: `Học IELTS 2 năm mà band vẫn dậm chân —<br>vì <span class="stat">không có lộ trình cụ thể</span><br>từ đầu`,
    sub: `Lộ trình <strong>4 năm THCS (Lớp 6→9)</strong> đạt IELTS 5.5–6.0 — mục tiêu từng năm, kỹ năng từng giai đoạn, milestone kiểm tra tiến độ`,
    bullets: [
      '<b>Lộ trình 4 năm</b> (A2→B1→B1+→B2) — target IELTS từng năm học cụ thể',
      '<b>Kỹ năng trọng tâm</b> mỗi khối lớp — phân bổ Listening/Reading/Writing/Speaking hợp lý',
      '<b>Từ vựng cần đạt</b> mỗi năm (2.500 → 5.500+ từ) — và cách học từ vựng hiệu quả',
      '<b>Mock test timeline</b> — khi nào thi thử, khi nào thi chính thức, cách cải thiện điểm nhanh',
    ],
    proof: '<strong>1.543 phụ huynh và học sinh</strong> đã tải · <strong>84%</strong> cải thiện band sau 6 tháng',
    directive: 'Nhấn nút vàng bên dưới để nhận lộ trình miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN LỘ TRÌNH IELTS MIỄN PHÍ',
    mockupSrc: '/mockup-lo-trinh-ielts-thcs.png',
    mockupAlt: 'Lộ Trình IELTS THCS Lớp 6–9 (A2 → B2) 2026',
    arrowText: 'Nhấn nút vàng để tải lộ trình miễn phí',
    quote: '"Con tôi học IELTS 1 năm vẫn 4.0. Sau khi áp dụng đúng lộ trình này, sau 8 tháng đã đạt 5.5 — band lệch đúng chuẩn theo phân kỳ."',
    name: 'Anh Đức Long',
    meta: 'Bố con lớp 8 · Quận 1, TP.HCM',
    initials: 'ĐL',
    urgency: 'suất nhận lộ trình + test IELTS miễn phí',
    stickyCta: 'NHẬN LỘ TRÌNH IELTS NGAY',
    popup1Title: 'Nhập email — nhận lộ trình trong 60 giây',
    popup2Title: 'Bước cuối — nhận lộ trình + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Lộ trình IELTS 4 năm THCS',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 lộ trình IELTS cá nhân hóa',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher mock test IELTS miễn phí',
    vsPrice3: '500.000đ',
    vsTotal: '1.149.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-ielts',
    funnel: 'squeeze-lo-trinh-ielts-thcs',
    level: 'thcs',
  },
  {
    slug: 'phuong-phap-hoc-teen',
    title: '5 Phương Pháp Học Hiệu Quả Cho Tuổi Teen – Tải Miễn Phí',
    desc: '5 phương pháp dựa trên khoa học não bộ (Active Recall, Spaced Repetition, Pomodoro, Mind Mapping, Interleaving) + template lịch học. Miễn phí.',
    eyebrowBadge: 'KHOA HỌC',
    eyebrowText: 'Dành cho học sinh và phụ huynh THCS',
    headline: `Học nhiều, ôn nhiều mà điểm vẫn thấp —<br>vì <span class="stat">chưa biết cách học đúng</span><br>theo khoa học não bộ`,
    sub: `<strong>5 phương pháp học</strong> có cơ sở khoa học (Active Recall, Spaced Repetition, Pomodoro, Mind Mapping, Interleaving) + <strong>template lịch học hàng tuần</strong> áp dụng ngay`,
    bullets: [
      '<b>5 phương pháp học</b> dựa trên khoa học não bộ — tại sao hiệu quả hơn học thụ động',
      '<b>Bảng tự đánh giá</b> — con đang dùng phương pháp nào, đang sai ở đâu',
      '<b>Template lịch học hàng tuần</b> — điền vào, dùng ngay, không cần app',
      '<b>Checklist sau buổi học</b> — biết ngay buổi đó học được bao nhiêu %',
    ],
    proof: '<strong>2.341 học sinh và phụ huynh</strong> đã tải · <strong>82%</strong> cải thiện điểm sau 1 tháng',
    directive: 'Nhấn nút vàng bên dưới để nhận tài liệu miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN TÀI LIỆU MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-phuong-phap-hoc-teen.png',
    mockupAlt: '5 Phương Pháp Học Hiệu Quả Cho Tuổi Teen 2026',
    arrowText: 'Nhấn nút vàng để tải tài liệu miễn phí',
    quote: '"Con tôi từng học 6 tiếng/ngày mà điểm vẫn yếu. Áp dụng Pomodoro + Active Recall, học còn 4 tiếng/ngày nhưng điểm tăng đều."',
    name: 'Chị Mỹ Trang',
    meta: 'Mẹ con lớp 9 · Tân Bình, TP.HCM',
    initials: 'MT',
    urgency: 'suất nhận tài liệu + tư vấn 1:1 miễn phí',
    stickyCta: 'NHẬN TÀI LIỆU MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận tài liệu trong 60 giây',
    popup2Title: 'Bước cuối — nhận tài liệu + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF 5 phương pháp + Template lịch học',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 lộ trình học cá nhân hóa',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher tham quan lớp học tại trường',
    vsPrice3: '350.000đ',
    vsTotal: '999.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-teen',
    funnel: 'squeeze-phuong-phap-teen',
    level: 'thcs',
  },
  {
    slug: 'so-sanh-truong-thcs',
    title: 'So Sánh Chương Trình THCS: Việt Anh vs 3 Loại Trường 2026',
    desc: 'Bảng so sánh 10 tiêu chí: Trường Công lập vs Tư thục vs Song ngữ vs Quốc tế. Chi phí, IELTS target, kết quả lớp 10. 2.445 phụ huynh đã xem. Miễn phí.',
    eyebrowBadge: 'SO SÁNH 2026',
    eyebrowText: 'Dành cho phụ huynh chuẩn bị cho con vào lớp 6',
    headline: `Chọn sai loại trường THCS —<br><span class="stat">4 năm con học</span> không<br>phát triển hết tiềm năng`,
    sub: `Bảng so sánh <strong>10 tiêu chí</strong>: Trường Công lập vs Tư thục vs Song ngữ (Việt Anh) vs Quốc tế — phụ huynh tự đánh giá, không cần hỏi sales`,
    bullets: [
      '<b>10 tiêu chí so sánh</b> (học phí, chương trình, IELTS, ngoại khóa…) — số liệu thực tế 2026',
      '<b>Chi phí tổng 4 năm THCS</b> mỗi loại trường — bao gồm cả học thêm bên ngoài',
      '<b>IELTS target + kết quả tuyển sinh lớp 10</b> từng loại trường — so sánh đầu ra thật',
      '<b>Phù hợp với ai?</b> — 3 profile học sinh và loại trường phù hợp nhất',
    ],
    proof: '<strong>2.445 phụ huynh</strong> đã xem · <strong>71%</strong> thay đổi ưu tiên sau khi đọc',
    directive: 'Nhấn nút vàng bên dưới để nhận bảng so sánh miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    mockupSrc: '/mockup-so-sanh-truong-thcs.png',
    mockupAlt: 'Bảng So Sánh Chương Trình THCS — Việt Anh vs 3 Loại Trường',
    arrowText: 'Nhấn nút vàng để tải bảng so sánh miễn phí',
    quote: '"Đọc 1 trang bảng so sánh tiết kiệm tôi 5 buổi đi tham quan trường. Con số biết nói nhiều hơn lời tư vấn của bất kỳ ai."',
    name: 'Anh Tuấn Hải',
    meta: 'Bố con lớp 5 · Quận 7, TP.HCM',
    initials: 'TH',
    urgency: 'suất nhận bảng so sánh + tư vấn miễn phí',
    stickyCta: 'NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận bảng trong 60 giây',
    popup2Title: 'Bước cuối — nhận bảng + 3 quà tặng miễn phí',
    vsItem1: '✅ Bảng so sánh 10 tiêu chí THCS',
    vsPrice1: '99.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn trường THCS',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher tham quan + học thử lớp 6',
    vsPrice3: '350.000đ',
    vsTotal: '949.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-ssthcs',
    funnel: 'squeeze-so-sanh-thcs',
    level: 'thcs',
  },
  // ═══ THPT ═══
  {
    slug: 'cam-nang-chon-thpt',
    title: 'Cẩm Nang Chọn THPT: Công Lập vs Tư Thục vs Quốc Tế 2026',
    desc: 'Cẩm nang 12 tiêu chí + Chi phí 3 năm + ROI giáo dục. Phù hợp 3 mục tiêu: ĐH trong nước / du học / vừa học vừa làm. 1.876 đã tải. Miễn phí.',
    eyebrowBadge: 'PHÂN TÍCH',
    eyebrowText: 'Dành cho phụ huynh chuẩn bị cho con vào lớp 10',
    headline: `Chọn trường THPT theo cảm tính —<br><span class="stat">3 năm con học</span> không phát huy<br>tiềm năng thật sự`,
    sub: `Cẩm nang so sánh THPT <strong>Công lập vs Tư thục/Song ngữ vs Quốc tế</strong> — phân tích 12 tiêu chí, chi phí 3 năm, ROI giáo dục — chọn đúng ngay lần đầu`,
    bullets: [
      '<b>12 tiêu chí phân tích</b> (học phí, IELTS, tỷ lệ ĐH, du học, ngoại khóa…) — số liệu thực 2026',
      '<b>Chi phí 3 năm + ROI</b> — tính tổng, kể cả học thêm, thi IELTS, luyện ĐH',
      '<b>Checklist tự đánh giá</b> theo 3 mục tiêu (ĐH trong nước / du học / vừa học vừa làm)',
      '<b>ROI học tập</b> — trường nào chuẩn bị con tốt nhất cho giai đoạn sau THPT',
    ],
    proof: '<strong>1.876 phụ huynh</strong> đã tải · <strong>88%</strong> tự tin hơn khi đi gặp các trường',
    directive: 'Nhấn nút vàng bên dưới để nhận cẩm nang miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN CẨM NANG MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-cam-nang-chon-thpt.png',
    mockupAlt: 'Cẩm Nang Chọn THPT — Công Lập vs Tư Thục vs Quốc Tế 2026',
    arrowText: 'Nhấn nút vàng để tải cẩm nang miễn phí',
    quote: '"Cẩm nang giúp tôi đặt câu hỏi đúng khi đến tham quan trường. Trước đây hay bị marketing dắt mũi, giờ tự tin đánh giá khách quan."',
    name: 'Chị Thanh Loan',
    meta: 'Mẹ con lớp 9 · Phú Nhuận, TP.HCM',
    initials: 'TL',
    urgency: 'suất nhận cẩm nang + tư vấn 1:1 miễn phí',
    stickyCta: 'NHẬN CẨM NANG MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận cẩm nang trong 60 giây',
    popup2Title: 'Bước cuối — nhận cẩm nang + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Cẩm nang chọn THPT 2026',
    vsPrice1: '199.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn THPT phù hợp con',
    vsPrice2: '500.000đ',
    vsItem3: '🎟️ Voucher tham quan + học thử THPT',
    vsPrice3: '500.000đ',
    vsTotal: '1.199.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-thpt',
    funnel: 'squeeze-cam-nang-thpt',
    level: 'thpt',
  },
  {
    slug: 'chuan-bi-du-hoc-lop10',
    title: 'Hướng Dẫn Chuẩn Bị Hồ Sơ Du Học Từ Lớp 10 – Tải Miễn Phí',
    desc: 'Timeline 3 năm + Checklist hồ sơ Mỹ/Úc/Anh/Canada + Milestone IELTS/SAT + Essay tips. 1.289 phụ huynh đã tải. Miễn phí.',
    eyebrowBadge: 'LỘ TRÌNH DU HỌC',
    eyebrowText: 'Dành cho học sinh và phụ huynh THPT',
    headline: `Muốn con du học mà không biết bắt đầu từ đâu —<br><span class="stat">lỡ học bổng</span> vì chuẩn bị<br>quá muộn 1 năm`,
    sub: `Timeline <strong>3 năm</strong> chuẩn bị hồ sơ du học từ Lớp 10 — Mỹ, Úc, Anh, Canada — checklist từng quốc gia, milestone IELTS/SAT, <strong>không bỏ lỡ deadline</strong>`,
    bullets: [
      '<b>Timeline 3 năm</b> (Lớp 10 → 12) — biết chính xác năm 1, 2, 3 cần đạt gì',
      '<b>Checklist hồ sơ theo từng quốc gia</b> (Mỹ, Úc, Anh, Canada) — đầy đủ, cập nhật 2026',
      '<b>Milestone IELTS/SAT</b> — target từng năm + cách thi lại nếu trượt',
      '<b>Essay + Hoạt động ngoại khóa</b> — cách xây dựng hồ sơ nổi bật từ Lớp 10',
    ],
    proof: '<strong>1.289 phụ huynh</strong> đã tải · <strong>93%</strong> có kế hoạch rõ ràng sau khi đọc',
    directive: 'Nhấn nút vàng bên dưới để nhận lộ trình miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN LỘ TRÌNH DU HỌC MIỄN PHÍ',
    mockupSrc: '/mockup-chuan-bi-du-hoc-lop10.png',
    mockupAlt: 'Hướng Dẫn Chuẩn Bị Hồ Sơ Du Học Từ Lớp 10 — Mỹ/Úc/Anh/Canada',
    arrowText: 'Nhấn nút vàng để tải lộ trình miễn phí',
    quote: '"Tôi cứ tưởng để lớp 12 chuẩn bị du học là vừa. May mà đọc tài liệu này từ lớp 10 — kịp xây dựng hồ sơ ngoại khóa và thi IELTS."',
    name: 'Anh Hoàng Quân',
    meta: 'Bố con lớp 11 · Quận 3, TP.HCM',
    initials: 'HQ',
    urgency: 'suất nhận lộ trình + tư vấn du học 1:1 miễn phí',
    stickyCta: 'NHẬN LỘ TRÌNH DU HỌC',
    popup1Title: 'Nhập email — nhận lộ trình trong 60 giây',
    popup2Title: 'Bước cuối — nhận lộ trình + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Timeline 3 năm + Checklist 4 quốc gia',
    vsPrice1: '199.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn hướng du học',
    vsPrice2: '700.000đ',
    vsItem3: '🎟️ Mock test IELTS/SAT miễn phí',
    vsPrice3: '500.000đ',
    vsTotal: '1.399.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-duhoc',
    funnel: 'squeeze-du-hoc-lop10',
    level: 'thpt',
  },
  {
    slug: 'oxford-cambridge-ib',
    title: 'So Sánh Oxford vs Cambridge vs IB – Phụ Huynh Việt Nam Nên Chọn Gì?',
    desc: 'Bảng so sánh 15 tiêu chí Oxford Enhancement vs Cambridge International vs IB. Chi phí thực tế, ĐH quốc tế accept. 892 phụ huynh đã tải. Miễn phí.',
    eyebrowBadge: 'SO SÁNH',
    eyebrowText: 'Dành cho phụ huynh chọn chương trình THPT quốc tế',
    headline: `Oxford, Cambridge hay IB —<br><span class="stat">chọn sai chương trình</span>,<br>con đi sai hướng 3 năm THPT`,
    sub: `Bảng so sánh <strong>15 tiêu chí chi tiết</strong>: Oxford Enhancement vs Cambridge International vs IB — chi phí thực tế, phù hợp với ai, target ĐH quốc tế`,
    bullets: [
      '<b>15 tiêu chí so sánh</b> (nội dung, phương pháp, chứng chỉ, chi phí, phù hợp với ai…)',
      '<b>Chi phí thực tế</b> 3 năm THPT mỗi chương trình — và ĐH quốc tế nào accept',
      '<b>Phù hợp với ai?</b> — 3 profile học sinh (hướng Anh ngữ / STEM / toàn diện)',
      '<b>Câu hỏi buộc phải hỏi</b> khi đến tư vấn — không bị mislead bởi brochure đẹp',
    ],
    proof: '<strong>892 phụ huynh</strong> đã tải · <strong>85%</strong> thay đổi ưu tiên sau khi đọc',
    directive: 'Nhấn nút vàng bên dưới để nhận bảng so sánh miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    mockupSrc: '/mockup-oxford-cambridge-ib.png',
    mockupAlt: 'So Sánh Oxford vs Cambridge vs IB — Phụ Huynh Việt Nam Nên Chọn Gì',
    arrowText: 'Nhấn nút vàng để tải bảng so sánh miễn phí',
    quote: '"Cứ ngỡ IB là đỉnh nhất nên định cho con học. Sau khi đọc bảng so sánh mới biết Cambridge phù hợp con tôi hơn vì hợp với hệ Anh."',
    name: 'Chị Thanh Hoa',
    meta: 'Mẹ con lớp 10 · Bình Thạnh, TP.HCM',
    initials: 'TH',
    urgency: 'suất nhận bảng + tư vấn chương trình quốc tế miễn phí',
    stickyCta: 'NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận bảng trong 60 giây',
    popup2Title: 'Bước cuối — nhận bảng + 3 quà tặng miễn phí',
    vsItem1: '✅ Bảng so sánh 15 tiêu chí Oxford-Cambridge-IB',
    vsPrice1: '199.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chọn chương trình quốc tế',
    vsPrice2: '700.000đ',
    vsItem3: '🎟️ Voucher tham quan lớp học quốc tế',
    vsPrice3: '500.000đ',
    vsTotal: '1.399.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-oxib',
    funnel: 'squeeze-oxford-cambridge-ib',
    level: 'thpt',
  },
  {
    slug: '50-truong-dh-xet-ielts',
    title: 'Danh Sách 50 Trường ĐH Việt Nam Xét IELTS 2026 – Tải Miễn Phí',
    desc: '50 trường ĐH (TP.HCM, Hà Nội, Đà Nẵng và các tỉnh) xét IELTS 5.5 → 6.5+. Điểm tối thiểu, ngành xét, quy đổi điểm. 3.241 đã tải. Miễn phí.',
    eyebrowBadge: 'CẬP NHẬT 2026',
    eyebrowText: 'Dành cho học sinh THPT có IELTS hoặc đang học',
    headline: `Có IELTS mà không biết trường nào xét —<br><span class="stat">bỏ phí lợi thế lớn nhất</span><br>khi nộp đại học`,
    sub: `Danh sách <strong>50 trường ĐH Việt Nam xét IELTS 2026</strong> — điểm tối thiểu, ngành học, quy đổi điểm — biết ngay <strong>IELTS bao nhiêu thì đủ điều kiện</strong>`,
    bullets: [
      '<b>50 trường ĐH</b> xét IELTS — TP.HCM (17), Hà Nội (16), Đà Nẵng & các tỉnh (17) — cập nhật 2026',
      '<b>Điểm IELTS tối thiểu + quy đổi sang điểm thi ĐH</b> mỗi trường — biết ngay đủ điều kiện không',
      '<b>Ngành học được xét + tỷ lệ chọi</b> những năm gần đây — chọn ngành thực tế',
      '<b>Cách nộp hồ sơ xét IELTS</b> — deadline, hồ sơ cần có, lưu ý tránh bị loại',
    ],
    proof: '<strong>3.241 học sinh</strong> đã tải · <strong>80%</strong> học sinh IELTS 6.5+ vào trường mơ ước',
    directive: 'Nhấn nút vàng bên dưới để nhận danh sách miễn phí — chỉ mất 10 giây',
    ctaText: 'NHẬN DANH SÁCH MIỄN PHÍ — NGAY BÂY GIỜ',
    mockupSrc: '/mockup-50-truong-dh-xet-ielts.png',
    mockupAlt: 'Danh Sách 50 Trường ĐH Việt Nam Xét IELTS 2026',
    arrowText: 'Nhấn nút vàng để tải danh sách miễn phí',
    quote: '"Con tôi IELTS 6.5 mà cứ tưởng phải thi điểm cao mới vào ĐH Bách Khoa. Đọc danh sách mới biết trường có quy đổi — đỡ áp lực cho cả nhà."',
    name: 'Anh Văn Thành',
    meta: 'Bố con lớp 12 · Tân Bình, TP.HCM',
    initials: 'VT',
    urgency: 'suất nhận danh sách + tư vấn xét tuyển miễn phí',
    stickyCta: 'NHẬN DANH SÁCH MIỄN PHÍ',
    popup1Title: 'Nhập email — nhận danh sách trong 60 giây',
    popup2Title: 'Bước cuối — nhận danh sách + 3 quà tặng miễn phí',
    vsItem1: '✅ PDF Danh sách 50 trường ĐH xét IELTS',
    vsPrice1: '149.000đ',
    vsItem2: '🎯 Tư vấn 1:1 chiến lược xét tuyển ĐH',
    vsPrice2: '700.000đ',
    vsItem3: '🎟️ Mock test IELTS miễn phí + chấm Speaking',
    vsPrice3: '500.000đ',
    vsTotal: '1.349.000đ',
    popupCta: 'NHẬN TẤT CẢ NGAY — TRONG 30 GIÂY →',
    formId: 'sq-50dh',
    funnel: 'squeeze-50-truong-ielts',
    level: 'thpt',
  },
];

// ── TEMPLATE ─────────────────────────────────────────────────────────
function gen(p) {
  return `---
// squeeze/${p.slug} — CRO v4 brand template (auto-generated)
// Audience: cold FB + GG traffic
// Goal: max lead (email → name + phone)
// Psychology: curiosity gap · loss aversion · FOMO · commitment bias · price anchoring
---
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${p.title}</title>
<meta name="description" content="${p.desc}" />
<meta name="robots" content="noindex, nofollow" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,800;0,900;1,900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --navy:#08082a;--navy2:#10104a;--border:rgba(255,255,255,.08);
  --text:#eef2ff;--muted:rgba(238,242,255,.58);
  --red:#dc2626;--orange:#F0D048;--amber:#F0D048;--green:#22c55e;--blue:#2563eb;
  --r:10px;
}
html{height:100%}
body{
  min-height:100%;font-family:'Inter',sans-serif;background:var(--navy);
  background-image:
    radial-gradient(ellipse 90% 60% at 72% 105%,rgba(26,26,94,.55) 0%,transparent 55%),
    radial-gradient(ellipse 55% 40% at 4% -4%,rgba(16,16,74,.6) 0%,transparent 50%);
  color:var(--text);overflow:hidden;display:flex;flex-direction:column;
}
.ubar{flex-shrink:0;background:var(--red);padding:7px 16px;display:flex;align-items:center;justify-content:center;gap:8px;font-size:12.5px;font-weight:600;letter-spacing:.1px;animation:slideDown .35s ease both}
.ubar-dot{width:7px;height:7px;border-radius:50%;background:#fca5a5;animation:blink 1.4s ease infinite}
.ubar em{font-style:normal;background:rgba(0,0,0,.25);border-radius:20px;padding:1px 9px;font-weight:800;font-variant-numeric:tabular-nums}
.lbar{flex-shrink:0;background:#fff;padding:4px 40px;display:flex;align-items:center;justify-content:center}
.lbar img{height:74px;display:block}
.lbar-txt{font-family:'Montserrat',sans-serif;font-weight:900;font-size:16px;color:var(--navy);display:none}
.hero{flex:1;min-height:0;display:grid;grid-template-columns:1fr 360px;align-items:center;max-width:1060px;width:100%;margin:0 auto;padding:14px 40px 16px;gap:40px;animation:riseUp .6s ease both .07s}
.left{display:flex;flex-direction:column;gap:clamp(7px,1.25vh,13px)}
.eyebrow{display:inline-flex;align-items:center;gap:7px;background:rgba(220,38,38,.14);border:1px solid rgba(220,38,38,.38);border-radius:30px;padding:3px 14px 3px 5px;width:fit-content;font-size:11.5px;font-weight:700;color:#fca5a5}
.eyebrow b{background:var(--red);color:#fff;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:900;border-radius:20px;padding:2px 9px;text-transform:uppercase;letter-spacing:.3px}
.h1{font-family:'Montserrat',sans-serif;font-size:clamp(1.35rem,2.2vw,1.95rem);font-weight:900;line-height:1.22;letter-spacing:-.3px}
.h1 .stat{color:var(--orange);font-style:italic}
.h1 u{text-decoration:none;border-bottom:2.5px solid rgba(240,208,72,.5)}
.sub{font-size:13.5px;color:var(--muted);line-height:1.65;padding-left:11px;border-left:3px solid var(--orange)}
.sub strong{color:var(--text);font-weight:600}
.blist{list-style:none;display:flex;flex-direction:column;gap:6px}
.blist li{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:rgba(238,242,255,.83);line-height:1.45}
.ck{flex-shrink:0;width:19px;height:19px;border-radius:50%;background:var(--green);display:inline-flex;align-items:center;justify-content:center;margin-top:2px}
.ck svg{width:10px;height:10px}
.blist b{color:var(--text);font-weight:600}
.proof{display:flex;align-items:center;flex-wrap:wrap;gap:8px;font-size:12.5px;color:var(--muted)}
.stars{color:var(--amber);letter-spacing:-1px;font-size:13px}
.proof strong{color:var(--amber);font-weight:700}
.proof-sep{width:1px;height:13px;background:var(--border)}
.directive{font-size:13px;color:rgba(238,242,255,.65);display:flex;align-items:center;gap:6px;font-weight:500}
.cta-block{display:flex;flex-direction:column;gap:8px}
.seats-inline{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:#fca5a5}
.seats-dot{width:8px;height:8px;border-radius:50%;background:#ef4444;animation:blink 1s ease infinite;flex-shrink:0}
.seats-num{background:var(--red);color:#fff;font-family:'Montserrat',sans-serif;font-size:13px;font-weight:900;border-radius:20px;padding:1px 9px;font-variant-numeric:tabular-nums}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--orange);background-image:linear-gradient(135deg,#F8E050 0%,#F0D048 45%,#D4A800 100%);color:#1a1a5e;font-family:'Montserrat',sans-serif;font-size:clamp(.88rem,1.05vw,1rem);font-weight:900;letter-spacing:.8px;text-transform:uppercase;border:none;border-radius:var(--r);padding:17px 30px;cursor:pointer;max-width:440px;position:relative;overflow:hidden;box-shadow:0 6px 32px rgba(240,208,72,.6),0 2px 8px rgba(0,0,0,.45);transition:transform .18s ease,box-shadow .18s ease;animation:btnPulse 2.8s ease-in-out infinite}
.btn::after{content:'';position:absolute;top:0;left:-90%;width:55%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);transition:left .5s ease}
.btn:hover{transform:translateY(-3px) scale(1.025);box-shadow:0 12px 40px rgba(240,208,72,.75),0 2px 8px rgba(0,0,0,.4);animation:none}
.btn:hover::after{left:145%}
.btn:active{transform:scale(.98)}
.btn.shake{animation:shake .55s ease}
.micro{font-size:11px;color:rgba(238,242,255,.35);display:flex;align-items:center;gap:5px}
.right{display:flex;flex-direction:column;align-items:center;gap:12px}
.mscene{position:relative;padding:18px 10px 14px;width:100%;max-width:290px}
.m-glow-bg{position:absolute;inset:-10%;background:radial-gradient(ellipse 80% 60% at 50% 65%,rgba(240,208,72,.3) 0%,rgba(240,208,72,.12) 40%,transparent 70%);z-index:0;pointer-events:none;animation:glowPulse 3.5s ease-in-out infinite}
.m-shadow-el{position:absolute;bottom:4%;left:14%;right:10%;height:35%;background:rgba(0,0,0,.6);filter:blur(26px);border-radius:50%;z-index:1}
.m-ghost-2,.m-ghost-1{position:absolute;inset:0;border-radius:10px;z-index:2}
.m-ghost-2{background:linear-gradient(135deg,#1c3972,#08193c);transform:perspective(700px) rotateY(-5deg) rotateX(4deg) rotate(9deg) translate(18px,18px);opacity:.5;box-shadow:0 8px 28px rgba(0,0,0,.4)}
.m-ghost-1{background:linear-gradient(135deg,#1a3567,#0b1e3e);transform:perspective(700px) rotateY(-5deg) rotateX(4deg) rotate(4.5deg) translate(9px,9px);opacity:.38}
.m-card{position:relative;z-index:3;border-radius:10px;overflow:visible;transform:perspective(700px) rotateY(-5deg) rotateX(4deg);transform-origin:center bottom;filter:drop-shadow(-6px 14px 28px rgba(0,0,0,.6));animation:floatMock 3.8s ease-in-out infinite;transition:transform .35s ease,filter .35s ease;cursor:pointer}
.m-card:hover{transform:perspective(700px) rotateY(-1deg) rotateX(1deg) scale(1.04);filter:drop-shadow(-4px 18px 36px rgba(240,208,72,.4));animation:none}
.m-shine{position:absolute;inset:0;border-radius:10px;background:linear-gradient(135deg,rgba(255,255,255,.2) 0%,rgba(255,255,255,.06) 35%,transparent 60%);pointer-events:none;z-index:4}
.mimg{display:block;width:100%;border-radius:10px;position:relative;z-index:3}
.m-badge-yr{position:absolute;top:-9px;left:-9px;z-index:5;background:linear-gradient(135deg,#1e3a8a,#2563eb);color:#fff;font-family:'Montserrat',sans-serif;font-size:10px;font-weight:900;padding:4px 10px;border-radius:20px;box-shadow:0 3px 10px rgba(37,99,235,.55);letter-spacing:.3px}
.m-arrow{margin-top:8px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:11.5px;font-weight:600;color:rgba(238,242,255,.5);animation:arrowPulse 2s ease-in-out infinite}
.m-arrow svg{flex-shrink:0}
.tcard{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:12px 14px;max-width:265px;width:100%}
.tc-stars{color:var(--amber);font-size:12px;letter-spacing:-1px;margin-bottom:5px}
.tc-q{font-size:12px;color:rgba(238,242,255,.7);line-height:1.55;font-style:italic;margin-bottom:8px}
.tc-auth{display:flex;align-items:center;gap:8px}
.tc-av{width:26px;height:26px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#fff}
.tc-name{font-size:11.5px;font-weight:700;color:rgba(238,242,255,.8)}
.tc-meta{font-size:10.5px;color:rgba(238,242,255,.42)}
.sticky{display:none}
.ov{display:none;position:fixed;inset:0;z-index:999;background:rgba(4,10,24,.84);backdrop-filter:blur(6px);align-items:center;justify-content:center;padding:20px}
.ov.open{display:flex;animation:fadeIn .2s ease}
.popup{background:#fff;color:#111827;border-radius:18px;width:100%;max-width:396px;padding:26px 24px 22px;position:relative;box-shadow:0 32px 100px rgba(0,0,0,.5);animation:springUp .3s cubic-bezier(.34,1.56,.64,1)}
.pcl{position:absolute;top:12px;right:13px;background:#f3f4f6;border:none;border-radius:50%;width:28px;height:28px;font-size:15px;color:#6b7280;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
.pcl:hover{background:#e5e7eb;color:#111}
.pprog{margin-bottom:18px}
.pprog-meta{display:flex;justify-content:space-between;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#9ca3af;margin-bottom:6px}
.pprog-track{height:4px;background:#e5e7eb;border-radius:99px;overflow:hidden}
.pprog-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,#D4A800,#F0D048,#F8E050);transition:width .45s ease}
.ps{display:none}.ps.on{display:block}
.p-ico{font-size:26px;margin-bottom:7px;line-height:1}
.p-title{font-family:'Montserrat',sans-serif;font-size:1.05rem;font-weight:800;color:#0c1b34;line-height:1.3;margin-bottom:3px}
.p-sub{font-size:12.5px;color:#6b7280;margin-bottom:14px;line-height:1.55}
.fg{margin-bottom:10px}
.fl{display:block;font-size:10.5px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.fi{width:100%;padding:12px 13px;border:1.5px solid #e5e7eb;border-radius:8px;font-size:15px;font-family:'Inter',sans-serif;color:#111;outline:none;background:#f9fafb;transition:border-color .2s,box-shadow .2s}
.fi:focus{border-color:var(--orange);box-shadow:0 0 0 3px rgba(240,208,72,.18);background:#fff}
.fi.err{border-color:#ef4444;box-shadow:0 0 0 3px rgba(239,68,68,.1)}
.fe{font-size:11.5px;color:#ef4444;margin-top:3px;display:none}
.fe.on{display:block}
.vstack{background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:11px 13px;margin-bottom:12px}
.vs-hd{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;color:#92400e;margin-bottom:8px;display:flex;align-items:center;gap:5px}
.vs-row{display:flex;align-items:center;gap:7px;font-size:12.5px;color:#78350f;margin-bottom:5px;line-height:1.35}
.vs-row:last-of-type{margin-bottom:0}
.vs-price{margin-left:auto;flex-shrink:0;font-size:11px;color:#b45309;font-weight:700;text-decoration:line-through;opacity:.65;white-space:nowrap}
.vs-total{margin-top:7px;padding-top:7px;border-top:1px dashed #fde68a;display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:700;color:#92400e}
.vs-total-val{background:#16a34a;color:#fff;border-radius:5px;padding:2px 9px;font-family:'Montserrat',sans-serif;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.3px}
.s2-urg{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#dc2626;margin-bottom:10px}
.s2-urg-dot{width:7px;height:7px;border-radius:50%;background:#dc2626;animation:blink 1s ease infinite;flex-shrink:0}
.pbtn{width:100%;background:linear-gradient(135deg,#F8E050,#F0D048,#D4A800);color:#1a1a5e;font-family:'Montserrat',sans-serif;font-size:.93rem;font-weight:900;letter-spacing:.7px;text-transform:uppercase;border:none;border-radius:9px;padding:14px;cursor:pointer;box-shadow:0 4px 20px rgba(240,208,72,.5);transition:transform .18s,box-shadow .18s;margin-top:7px;min-height:50px;display:flex;align-items:center;justify-content:center}
.pbtn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(240,208,72,.65)}
.pbtn:disabled{opacity:.7;cursor:wait}
.pbtn .t{display:block}
.pbtn .s{display:none;width:18px;height:18px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;animation:spin .55s linear infinite}
.pbtn.loading .t{display:none}
.pbtn.loading .s{display:block}
.p-back{background:none;border:none;font-size:12px;color:#9ca3af;cursor:pointer;padding:5px 0;margin-top:4px;display:flex;align-items:center;gap:4px;transition:color .15s}
.p-back:hover{color:#374151}
.psec{font-size:11px;color:#9ca3af;text-align:center;margin-top:8px;display:flex;align-items:center;justify-content:center;gap:4px}
.psuc{display:none;text-align:center;padding:10px 0}
.psuc.on{display:block}
.suc-ico{font-size:52px;margin-bottom:12px}
.suc-h{font-family:'Montserrat',sans-serif;font-size:1.2rem;font-weight:900;color:#16a34a;margin-bottom:8px}
.suc-p{font-size:13.5px;color:#6b7280;line-height:1.65}
@keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
@keyframes riseUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes springUp{from{opacity:0;transform:translateY(30px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes btnPulse{0%,100%{box-shadow:0 6px 32px rgba(240,208,72,.6),0 2px 8px rgba(0,0,0,.45)}50%{box-shadow:0 8px 42px rgba(240,208,72,.85),0 2px 8px rgba(0,0,0,.4)}}
@keyframes shake{0%,100%{transform:translateX(0)}15%,45%,75%{transform:translateX(-5px) rotate(-.4deg)}30%,60%,90%{transform:translateX(5px) rotate(.4deg)}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes floatMock{0%,100%{transform:perspective(700px) rotateY(-5deg) rotateX(4deg) translateY(0)}50%{transform:perspective(700px) rotateY(-5deg) rotateX(4deg) translateY(-10px)}}
@keyframes glowPulse{0%,100%{opacity:.7;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes arrowPulse{0%,100%{transform:translateX(0);opacity:.5}50%{transform:translateX(-5px);opacity:.85}}
@media(max-width:860px){
  html,body{overflow-y:auto;overflow-x:hidden;height:auto}
  body{padding-bottom:72px}
  .hero{grid-template-columns:1fr;padding:12px 18px 20px;gap:0}
  .left{order:1;gap:clamp(8px,2vw,12px)}
  .right{order:2;padding-top:14px;gap:10px}
  .mscene{max-width:220px;padding:14px 8px 10px}
  .tcard{max-width:100%}
  .btn{display:none !important}
  .sticky{display:block;position:fixed;bottom:0;left:0;right:0;z-index:800;padding:10px 16px 14px;background:rgba(6,16,31,.97);backdrop-filter:blur(10px);border-top:1px solid var(--border)}
  .sticky .btn{display:inline-flex !important;max-width:100%;width:100%;padding:16px 20px;font-size:.92rem;animation:btnPulse 2.8s ease-in-out infinite}
  .lbar{padding:4px 20px}
  .lbar img{height:58px}
  .h1{font-size:1.2rem}
}
@media(max-width:400px){.h1{font-size:1.08rem}}
</style>
</head>
<body>

<div class="ubar" role="alert">
  <span class="ubar-dot" aria-hidden="true"></span>
  Hôm nay chỉ còn <em id="uSeats">9</em> ${p.urgency}
  <span class="ubar-dot" aria-hidden="true"></span>
</div>

<div class="lbar">
  <a href="https://truongvietanh.com" tabindex="-1">
    <img src="/logo-th-thcs-thpt.png" alt="Trường Việt Anh"
         onerror="this.style.display='none';document.querySelector('.lbar-txt').style.display='block'"/>
    <span class="lbar-txt">Trường Việt Anh</span>
  </a>
</div>

<section class="hero" aria-label="Offer chính">

  <div class="left">

    <div class="eyebrow">
      <b>${p.eyebrowBadge}</b>
      ${p.eyebrowText}
    </div>

    <h1 class="h1">
      ${p.headline}
    </h1>

    <p class="sub">
      ${p.sub}
    </p>

    <ul class="blist" aria-label="Nội dung bạn nhận được">
      ${p.bullets.map(b => `<li>
        <span class="ck" aria-hidden="true"><svg viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
        <span>${b}</span>
      </li>`).join('\n      ')}
    </ul>

    <div class="proof">
      <span class="stars" aria-label="5 sao">★★★★★</span>
      ${p.proof}
    </div>

    <p class="directive">
      <span aria-hidden="true">👇</span>
      ${p.directive}
    </p>

    <div class="cta-block">
      <div class="seats-inline" aria-live="polite">
        <span class="seats-dot" aria-hidden="true"></span>
        Hôm nay chỉ còn <span class="seats-num" id="cSeats">9</span> suất miễn phí
      </div>

      <button class="btn" id="ctaBtn" aria-haspopup="dialog">
        <span aria-hidden="true">🎁</span>
        ${p.ctaText}
      </button>

      <span class="micro">🔒 Không spam · Miễn phí hoàn toàn · Hủy bất cứ lúc nào</span>
    </div>

  </div>

  <div class="right" aria-hidden="true">

    <div class="mscene">
      <div class="m-glow-bg"></div>
      <div class="m-shadow-el"></div>
      <div class="m-ghost-2"></div>
      <div class="m-ghost-1"></div>
      <div class="m-card">
        <div class="m-shine"></div>
        <span class="m-badge-yr">2026</span>
        <img src="${p.mockupSrc}"
             alt="${p.mockupAlt}"
             class="mimg"
             onerror="this.style.opacity='.15'" loading="eager" />
      </div>
      <div class="m-arrow">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="#F0D048" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        ${p.arrowText}
      </div>
    </div>

    <div class="tcard">
      <div class="tc-stars" aria-label="5 sao">★★★★★</div>
      <blockquote class="tc-q">
        ${p.quote}
      </blockquote>
      <div class="tc-auth">
        <div class="tc-av">${p.initials}</div>
        <div>
          <div class="tc-name">${p.name}</div>
          <div class="tc-meta">${p.meta}</div>
        </div>
      </div>
    </div>

  </div>

</section>

<div class="sticky" aria-hidden="true">
  <button class="btn" id="ctaMob" tabindex="-1">
    <span>🎁</span> ${p.stickyCta}
  </button>
</div>

<div class="ov" id="overlay" role="dialog" aria-modal="true" aria-labelledby="ptitle1">
  <div class="popup" id="popup">
    <button class="pcl" id="pClose" aria-label="Đóng">✕</button>
    <div class="pprog" aria-hidden="true">
      <div class="pprog-meta">
        <span id="pLabel">Bước 1 / 2</span>
        <span id="pPct">50%</span>
      </div>
      <div class="pprog-track">
        <div class="pprog-fill" id="pFill" style="width:50%"></div>
      </div>
    </div>

    <div class="ps on" id="s1">
      <div class="p-ico">📧</div>
      <h2 class="p-title" id="ptitle1">${p.popup1Title}</h2>
      <p class="p-sub">Chỉ cần email. Không cần điền gì thêm ở bước này.</p>
      <div class="fg">
        <label class="fl" for="fEmail">Địa chỉ Email của bạn</label>
        <input class="fi" type="email" id="fEmail" name="email" placeholder="ten@gmail.com" autocomplete="email" inputmode="email" />
        <div class="fe" id="eEmail">Vui lòng nhập email hợp lệ</div>
      </div>
      <button class="pbtn" id="btnNext">
        <span class="t">GỬI TÀI LIỆU VÀO EMAIL TÔI →</span>
        <span class="s" aria-hidden="true"></span>
      </button>
      <p class="psec">🔒 Email an toàn · Không spam · Không chia sẻ bên thứ ba</p>
    </div>

    <div class="ps" id="s2">
      <div class="p-ico">🎁</div>
      <h2 class="p-title">${p.popup2Title}</h2>
      <div class="s2-urg">
        <span class="s2-urg-dot" aria-hidden="true"></span>
        Hôm nay chỉ còn <span id="s2Seats">9</span> suất · Điền trong 10 giây
      </div>
      <div class="vstack" role="note" aria-label="Bạn nhận miễn phí">
        <div class="vs-hd">🎁 Bạn sẽ nhận miễn phí hôm nay:</div>
        <div class="vs-row"><span>${p.vsItem1}</span><span class="vs-price">${p.vsPrice1}</span></div>
        <div class="vs-row"><span>${p.vsItem2}</span><span class="vs-price">${p.vsPrice2}</span></div>
        <div class="vs-row"><span>${p.vsItem3}</span><span class="vs-price">${p.vsPrice3}</span></div>
        <div class="vs-total">
          <span>Tổng trị giá: <s>${p.vsTotal}</s></span>
          <span class="vs-total-val">MIỄN PHÍ HOÀN TOÀN</span>
        </div>
      </div>
      <div class="fg">
        <label class="fl" for="fName">Họ và tên ba/mẹ</label>
        <input class="fi" type="text" id="fName" name="parent_name" placeholder="Nguyễn Thị Lan" autocomplete="name" />
        <div class="fe" id="eName">Vui lòng nhập họ tên của bạn</div>
      </div>
      <div class="fg">
        <label class="fl" for="fPhone">Số điện thoại / Zalo</label>
        <input class="fi" type="tel" id="fPhone" name="phone" placeholder="0912 345 678" autocomplete="tel" inputmode="tel" />
        <div class="fe" id="ePhone">Vui lòng nhập số điện thoại hợp lệ</div>
      </div>
      <button class="pbtn" id="btnSubmit">
        <span class="t">${p.popupCta}</span>
        <span class="s" aria-hidden="true"></span>
      </button>
      <button class="p-back" id="btnBack" type="button">← Quay lại bước trước</button>
      <p class="psec">🔒 Bảo mật 100% · Thông tin chỉ dùng để gửi tài liệu và hỗ trợ tư vấn</p>
    </div>

    <div class="psuc" id="sSuc">
      <div class="suc-ico">🎉</div>
      <div class="suc-h">Đăng ký thành công!</div>
      <p class="suc-p">
        Tài liệu đang được gửi vào email của bạn.<br>
        Nhớ kiểm tra <strong>Spam / Promotions</strong> nếu chưa thấy.
      </p>
    </div>
  </div>
</div>

<script>
(function(){
'use strict';
var C={formId:'${p.formId}',funnel:'${p.funnel}',level:'${p.level}',api:'/api/lead',redirect:'/cam-on/'};
var ov=document.getElementById('overlay'),pClose=document.getElementById('pClose'),s1=document.getElementById('s1'),s2=document.getElementById('s2'),sSuc=document.getElementById('sSuc'),pFill=document.getElementById('pFill'),pLabel=document.getElementById('pLabel'),pPct=document.getElementById('pPct'),btnNext=document.getElementById('btnNext'),btnSubmit=document.getElementById('btnSubmit'),btnBack=document.getElementById('btnBack'),ctaBtn=document.getElementById('ctaBtn'),ctaMob=document.getElementById('ctaMob'),uSeats=document.getElementById('uSeats'),cSeats=document.getElementById('cSeats'),s2Seats=document.getElementById('s2Seats'),email='';
function open(){ov.classList.add('open');document.body.style.overflow='hidden';gtm('popup_open');setTimeout(function(){var el=document.getElementById('fEmail');if(el)el.focus();},320);}
function close(){ov.classList.remove('open');document.body.style.overflow='';}
if(ctaBtn)ctaBtn.addEventListener('click',open);
if(ctaMob)ctaMob.addEventListener('click',open);
pClose.addEventListener('click',close);
ov.addEventListener('click',function(e){if(e.target===ov)close();});
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
function setProgress(n){if(n===1){pFill.style.width='50%';pLabel.textContent='Bước 1 / 2';pPct.textContent='50%';}else{pFill.style.width='100%';pLabel.textContent='Bước 2 / 2';pPct.textContent='100%';}}
function okEmail(v){return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)}
function okPhone(v){return /^[0-9+\\s\\-\\.]{9,15}$/.test(v)}
function fieldErr(inpId,errId,show){var i=document.getElementById(inpId),e=document.getElementById(errId);if(i)i.classList.toggle('err',show);if(e)e.classList.toggle('on',show);}
btnNext.addEventListener('click',function(){var v=(document.getElementById('fEmail')||{}).value||'';if(!okEmail(v.trim())){fieldErr('fEmail','eEmail',true);document.getElementById('fEmail').focus();return;}fieldErr('fEmail','eEmail',false);email=v.trim();try{localStorage.setItem('va_partial_email',email);fetch(C.api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,form_id:C.formId,funnel_code:C.funnel,school_level:C.level,partial:true}),keepalive:true}).catch(noop);}catch(e){}gtm('lead_step1');s1.classList.remove('on');s2.classList.add('on');setProgress(2);setTimeout(function(){var n=document.getElementById('fName');if(n)n.focus();},80);});
btnBack.addEventListener('click',function(){s2.classList.remove('on');s1.classList.add('on');setProgress(1);});
btnSubmit.addEventListener('click',function(){var name=(document.getElementById('fName')||{}).value||'';var phone=(document.getElementById('fPhone')||{}).value||'';var ok=true;if(!name.trim()){fieldErr('fName','eName',true);ok=false;}else fieldErr('fName','eName',false);if(!okPhone(phone.trim())){fieldErr('fPhone','ePhone',true);ok=false;}else fieldErr('fPhone','ePhone',false);if(!ok)return;btnSubmit.classList.add('loading');btnSubmit.disabled=true;fetch(C.api,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email,parent_name:name.trim(),phone:phone.trim(),form_id:C.formId,funnel_code:C.funnel,school_level:C.level}),}).then(function(r){return r.json().catch(noop);}).catch(noop).finally(function(){gtm('lead_submitted');try{localStorage.setItem('va_form_submitted','1');}catch(e){}btnSubmit.classList.remove('loading');btnSubmit.disabled=false;s2.classList.remove('on');sSuc.classList.add('on');setTimeout(function(){window.location.href=C.redirect;},2400);});});
document.getElementById('fEmail').addEventListener('keydown',function(e){if(e.key==='Enter')btnNext.click();});
document.getElementById('fPhone').addEventListener('keydown',function(e){if(e.key==='Enter')btnSubmit.click();});
setTimeout(function(){[ctaBtn,ctaMob].forEach(function(b){if(!b)return;b.classList.add('shake');setTimeout(function(){b.classList.remove('shake');},560);});},3000);
var seats=7+Math.floor(Math.random()*6);
function setSeats(n){if(uSeats)uSeats.textContent=n;if(cSeats)cSeats.textContent=n;if(s2Seats)s2Seats.textContent=n;}
setSeats(seats);
var st=setInterval(function(){if(seats<=1){clearInterval(st);return;}seats--;setSeats(seats);},(180+Math.random()*300)*1000);
function gtm(evt){try{(window.dataLayer=window.dataLayer||[]).push({event:evt,form_id:C.formId,funnel_code:C.funnel,school_level:C.level});}catch(e){}}
function noop(){}
})();
</script>

</body>
</html>
`;
}

// ── WRITE FILES ──────────────────────────────────────────────────────
let written = 0, removed = 0;
for (const p of PAGES) {
  const out = path.join(DEST, p.slug + '.astro');
  fs.writeFileSync(out, gen(p));
  written++;
  // Remove old .html if exists
  const html = path.join(DEST, p.slug + '.html');
  if (fs.existsSync(html)) {
    fs.unlinkSync(html);
    removed++;
  }
}

console.log(`✓ Wrote ${written} .astro files`);
console.log(`✓ Removed ${removed} old .html files`);
console.log(`Done.`);
