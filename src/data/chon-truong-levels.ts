export type ChonTruongLevel = {
  slug: string;                          // URL segment (chon-truong-mam-non)
  levelKey: 'mau-non' | 'tieu-hoc' | 'thcs' | 'thpt';
  levelLabel: string;                    // "Mầm Non", "Tiểu học", etc.
  pdfFile: string;                       // filename in /public/downloads/
  pdfSizeKB: number;
  tagName: string;                       // GHL contact tag
  pageTitle: string;
  pageDescription: string;
  heroHeadline: string;
  heroSub: string;
  ageRange: string;                      // "2–5 tuổi"
  uspTitle: string;
  uspItems: { icon: string; text: string }[];
  metrics: { number: string; label: string }[];
  contentTitle: string;
  contentCards: { heading: string; body: string }[];
  urgencyNote: string;
  formHeading: string;
  formChecklist: string[];               // 4 items shown above form
  urgencyTitleForCam: string;
  faqItems: { question: string; answer: string }[];
};

export const CHON_TRUONG_LEVELS: ChonTruongLevel[] = [
  // -------------------- MẦM NON --------------------
  {
    slug: 'chon-truong-mam-non',
    levelKey: 'mau-non',
    levelLabel: 'Mầm Non',
    pdfFile: 'checklist-chon-truong-mam-non.pdf',
    pdfSizeKB: 321,
    tagName: 'chon-truong-mam-non',
    pageTitle: 'Chọn Trường Mầm Non 2026: Cẩm Nang Toàn Diện Cho Ba/Mẹ | Trường Việt Anh',
    pageDescription: 'Cẩm nang miễn phí giúp Ba/Mẹ chọn trường mầm non đúng cho con tại TP.HCM: 12 tiêu chí vàng, bảng so sánh 5 trường, 7 câu hỏi phải hỏi khi tham quan, timeline tuyển sinh 2026.',
    heroHeadline: 'Cẩm Nang Chọn Trường Mầm Non 2026',
    heroSub: '12 tiêu chí vàng + bảng so sánh 5 trường + 7 câu hỏi phải hỏi khi tham quan + timeline tuyển sinh 2026 tại TP.HCM — dành riêng cho Ba/Mẹ đang tìm trường cho bé 2–5 tuổi.',
    ageRange: '2–5 tuổi',
    uspTitle: 'Trong cẩm nang có gì?',
    uspItems: [
      { icon: '🧒', text: '12 tiêu chí vàng chọn trường mầm non — tỷ lệ giáo viên/trẻ, chất lượng chăm sóc, an toàn, dinh dưỡng, môi trường song ngữ' },
      { icon: '📊', text: 'Bảng so sánh 5 trường mầm non — chấm điểm khách quan để ra quyết định dựa trên dữ liệu thay vì cảm tính' },
      { icon: '💡', text: '7 câu hỏi phải hỏi khi tham quan — khai thác thông tin nhà trường thường không chủ động chia sẻ' },
      { icon: '📅', text: 'Timeline tuyển sinh Mầm non 2026 — tất cả mốc thời gian quan trọng tại TP.HCM, tránh bỏ lỡ deadline' },
      { icon: '🏫', text: 'Hướng dẫn đánh giá môi trường — cách quan sát lớp học, khu vui chơi, phòng ngủ để biết trường có thực sự tốt cho bé' },
      { icon: '📝', text: 'Mẫu ghi chép tham quan — in ra mang theo, tích điểm tại chỗ để so sánh chính xác sau khi về' },
    ],
    metrics: [
      { number: '3,000+', label: 'Phụ huynh đã nhận cẩm nang' },
      { number: '12', label: 'Tiêu chí đánh giá toàn diện' },
      { number: '4.9/5', label: 'Đánh giá từ phụ huynh' },
      { number: '15+', label: 'Năm kinh nghiệm biên soạn' },
    ],
    contentTitle: 'Tại sao Ba/Mẹ cần cẩm nang này?',
    contentCards: [
      { heading: '🔍 Không bỏ sót tiêu chí quan trọng', body: '90% phụ huynh chỉ nhìn học phí và cơ sở vật chất, bỏ sót những tiêu chí quyết định chất lượng chăm sóc con: tỷ lệ giáo viên/trẻ, quy trình an toàn, thực đơn dinh dưỡng, cách xử lý khi bé ốm.' },
      { heading: '📊 So sánh khách quan giữa các trường', body: 'Tham quan 3–5 trường trong vài tuần rất khó nhớ hết. Bảng so sánh cho phép Ba/Mẹ chấm điểm từng tiêu chí, ra quyết định dựa trên dữ liệu.' },
      { heading: '⏰ Kịp thời gian tuyển sinh 2026', body: 'Mùa tuyển sinh mầm non TP.HCM bắt đầu từ tháng 3, nhưng nhiều trường tốt đã nhận hồ sơ từ tháng 1–2. Timeline chi tiết giúp Ba/Mẹ nắm đúng mốc.' },
      { heading: '💬 Biết hỏi đúng câu khi tham quan', body: '7 câu hỏi giúp khai thác thông tin mà trường thường không chủ động chia sẻ: tỷ lệ giáo viên nghỉ việc, quy trình xử lý khi bé gặp sự cố, chính sách hoàn học phí.' },
    ],
    urgencyNote: '⚠️ Lưu ý quan trọng: Mùa tuyển sinh mầm non 2026 tại TP.HCM đang rất nóng. Nhiều trường tốt đã đóng đơn sớm hơn dự kiến.',
    formHeading: 'Nhận cẩm nang MIỄN PHÍ qua email',
    formChecklist: [
      'Cẩm nang 12 tiêu chí chọn trường mầm non (PDF)',
      'Bảng so sánh 5 trường (Google Sheets)',
      '7 câu hỏi phải hỏi khi tham quan',
      'Timeline tuyển sinh Mầm non 2026 TP.HCM',
    ],
    urgencyTitleForCam: 'Cẩm nang Chọn Trường Mầm Non đã sẵn sàng!',
    faqItems: [
      { question: 'Cẩm nang này dành cho bé mấy tuổi?', answer: 'Phù hợp cho Ba/Mẹ có con từ 2–5 tuổi. Cẩm nang có hướng dẫn riêng cho nhà trẻ (2–3 tuổi), mầm (3–4 tuổi), chồi (4–5 tuổi) và lá (5–6 tuổi, chuẩn bị vào lớp 1).' },
      { question: 'Tài liệu gồm những gì?', answer: '4 phần: Cẩm nang 12 tiêu chí (PDF), Bảng so sánh 5 trường (Excel), 7 câu hỏi phải hỏi, Timeline tuyển sinh 2026 tại TP.HCM.' },
      { question: 'Tài liệu có miễn phí không?', answer: 'Hoàn toàn miễn phí và không có cam kết nào. Được Trường Việt Anh biên soạn từ 15+ năm kinh nghiệm và phản hồi của 3,000+ phụ huynh.' },
      { question: 'Tôi nhận tài liệu bằng cách nào?', answer: 'Điền email → nhận ngay PDF tải trực tiếp + email chuỗi 7 ngày với case study, video, timeline chi tiết. Ba/Mẹ có thể hủy nhận email bất cứ lúc nào.' },
      { question: 'Sau khi nhận cẩm nang, tôi có được tư vấn không?', answer: 'Có. Trong 7 ngày, tư vấn viên sẽ gửi thêm nội dung hữu ích qua email và mời tham quan miễn phí cơ sở Mầm non Việt Anh.' },
    ],
  },

  // -------------------- TIỂU HỌC --------------------
  {
    slug: 'chon-truong-tieu-hoc',
    levelKey: 'tieu-hoc',
    levelLabel: 'Tiểu Học',
    pdfFile: 'checklist-chon-truong-tieu-hoc.pdf',
    pdfSizeKB: 320,
    tagName: 'chon-truong-tieu-hoc',
    pageTitle: 'Chọn Trường Tiểu Học 2026: Cẩm Nang Toàn Diện Cho Ba/Mẹ | Trường Việt Anh',
    pageDescription: 'Cẩm nang miễn phí giúp Ba/Mẹ chọn trường tiểu học đúng cho con tại TP.HCM: 14 tiêu chí vàng, so sánh công lập vs tư thục vs quốc tế, chương trình song ngữ, timeline tuyển sinh lớp 1.',
    heroHeadline: 'Cẩm Nang Chọn Trường Tiểu Học 2026',
    heroSub: '14 tiêu chí + so sánh công lập/tư thục/quốc tế + chương trình song ngữ + timeline tuyển sinh lớp 1 tại TP.HCM — dành riêng cho Ba/Mẹ có con chuẩn bị vào lớp 1 (5–10 tuổi).',
    ageRange: '5–10 tuổi',
    uspTitle: 'Trong cẩm nang có gì?',
    uspItems: [
      { icon: '📚', text: '14 tiêu chí vàng — chương trình, giáo viên, sĩ số, thời lượng tiếng Anh, bán trú, ngoại khóa, học phí, hỗ trợ tâm lý' },
      { icon: '⚖️', text: 'So sánh công lập vs tư thục vs song ngữ vs quốc tế — ưu/nhược điểm, chi phí, lộ trình tương lai của con' },
      { icon: '🌐', text: 'Phân tích chương trình song ngữ — Cambridge, Oxford, IB, AP: trường nào phù hợp mục tiêu của bé?' },
      { icon: '📅', text: 'Timeline tuyển sinh Lớp 1 2026 — khảo sát đầu vào, phỏng vấn, hồ sơ, thông báo kết quả tại TP.HCM' },
      { icon: '💬', text: '8 câu hỏi quan trọng khi phỏng vấn trường — cách hỏi để đánh giá chất lượng thật sự' },
      { icon: '📝', text: 'Checklist chuẩn bị cho bé vào lớp 1 — tâm lý, kỹ năng, tài liệu cần có' },
    ],
    metrics: [
      { number: '3,500+', label: 'Phụ huynh đã nhận cẩm nang' },
      { number: '14', label: 'Tiêu chí đánh giá toàn diện' },
      { number: '4.8/5', label: 'Đánh giá từ phụ huynh' },
      { number: '15+', label: 'Năm kinh nghiệm biên soạn' },
    ],
    contentTitle: 'Vì sao chọn trường tiểu học quan trọng?',
    contentCards: [
      { heading: '🎯 Giai đoạn vàng cho nền tảng học tập', body: 'Tiểu học là 5 năm hình thành thói quen học, tư duy nền và tình yêu với việc học. Chọn sai trường — con có thể "chán học" từ lớp 2–3.' },
      { heading: '🗣️ Tiếng Anh quyết định lộ trình tương lai', body: 'Trẻ tiểu học tiếp thu tiếng Anh nhanh gấp 3–5 lần người lớn. Trường có chương trình bản ngữ đủ liều lượng (≥8 tiết/tuần) tạo lợi thế IELTS 6.5+ ở lớp 9.' },
      { heading: '⚖️ Chọn sai kiểu trường = khó chuyển sau', body: 'Công lập → song ngữ chuyển khó; tư thục → công lập lớp 6 cạnh tranh. Hiểu lộ trình từ đầu giúp Ba/Mẹ lựa chọn phù hợp tài chính và mục tiêu.' },
      { heading: '👥 Môi trường bạn bè ảnh hưởng cả đời', body: '5 bạn thân nhất của con ở tiểu học thường đi cùng con suốt 10+ năm. Chọn trường có cộng đồng phụ huynh-học sinh phù hợp với gia đình.' },
    ],
    urgencyNote: '⚠️ Mùa tuyển sinh lớp 1 tại TP.HCM rất cạnh tranh. Nhiều trường tư thục tốt đã bán hết chỉ tiêu từ tháng 2 dù thông báo tháng 4.',
    formHeading: 'Nhận cẩm nang MIỄN PHÍ qua email',
    formChecklist: [
      'Cẩm nang 14 tiêu chí chọn trường tiểu học',
      'So sánh công lập / tư thục / song ngữ / quốc tế',
      '8 câu hỏi phải hỏi khi phỏng vấn trường',
      'Timeline tuyển sinh Lớp 1 2026 TP.HCM',
    ],
    urgencyTitleForCam: 'Cẩm nang Chọn Trường Tiểu Học đã sẵn sàng!',
    faqItems: [
      { question: 'Cẩm nang dành cho bé lớp mấy?', answer: 'Phù hợp Ba/Mẹ có con 5–10 tuổi: đang chuẩn bị lớp 1 hoặc đang học tiểu học muốn chuyển trường. Cẩm nang có phần riêng cho lớp 1 và lớp 2–5.' },
      { question: 'Có phân tích chương trình song ngữ không?', answer: 'Có. Phần so sánh Cambridge vs Oxford vs IB vs AP với bảng ưu/nhược điểm, chi phí trung bình, định hướng đại học phù hợp.' },
      { question: 'Cẩm nang này có miễn phí không?', answer: 'Hoàn toàn miễn phí. Biên soạn bởi đội ngũ Trường Việt Anh với 15+ năm kinh nghiệm tuyển sinh tiểu học tại TP.HCM.' },
      { question: 'Tôi nhận tài liệu bằng cách nào?', answer: 'Điền email → tải PDF ngay + email chuỗi 7 ngày với case study, video giới thiệu cơ sở Tiểu học Việt Anh Gò Vấp / Bình Tân.' },
      { question: 'Sau khi nhận, tôi có được tư vấn riêng không?', answer: 'Có. Tư vấn viên sẽ gửi lời mời tham quan miễn phí cơ sở Tiểu học Việt Anh phù hợp vị trí của Ba/Mẹ.' },
    ],
  },

  // -------------------- THCS --------------------
  {
    slug: 'chon-truong-thcs',
    levelKey: 'thcs',
    levelLabel: 'THCS',
    pdfFile: 'checklist-chon-truong-thcs.pdf',
    pdfSizeKB: 320,
    tagName: 'chon-truong-thcs',
    pageTitle: 'Chọn Trường THCS 2026: Cẩm Nang Toàn Diện Cho Ba/Mẹ | Trường Việt Anh',
    pageDescription: 'Cẩm nang miễn phí giúp Ba/Mẹ chọn trường THCS đúng cho con tại TP.HCM: 15 tiêu chí, so sánh các trường hot, chương trình tiếng Anh lớp 6, hỗ trợ tâm lý tuổi dậy thì, timeline tuyển sinh.',
    heroHeadline: 'Cẩm Nang Chọn Trường THCS 2026',
    heroSub: '15 tiêu chí + so sánh top 10 trường THCS TP.HCM + đánh giá chương trình IELTS lớp 6-9 + hỗ trợ tâm lý tuổi dậy thì + timeline tuyển sinh — dành cho Ba/Mẹ có con chuyển cấp (10–15 tuổi).',
    ageRange: '10–15 tuổi',
    uspTitle: 'Trong cẩm nang có gì?',
    uspItems: [
      { icon: '🎓', text: '15 tiêu chí chọn trường THCS — chương trình, giáo viên, sĩ số, điểm chuẩn đầu vào, tỷ lệ đậu chuyên, hỗ trợ tâm lý' },
      { icon: '🏆', text: 'So sánh top 10 trường THCS hot tại TP.HCM — điểm chuẩn 5 năm, tỷ lệ học sinh đậu THPT chuyên, chất lượng tiếng Anh' },
      { icon: '🗣️', text: 'Phân tích chương trình IELTS lớp 6-9 — trường nào có lộ trình IELTS 6.5+ đến lớp 9 để lên THPT top?' },
      { icon: '💭', text: 'Hỗ trợ tâm lý tuổi dậy thì — tiêu chí đánh giá môi trường an toàn, tư vấn tâm lý học đường, chống bạo lực' },
      { icon: '📅', text: 'Timeline tuyển sinh Lớp 6 2026 — khảo sát đầu vào, hồ sơ, phỏng vấn, thông báo kết quả' },
      { icon: '📝', text: 'Checklist chuẩn bị con vào THCS — tâm lý, kỹ năng tự học, kỹ năng xã hội cần có' },
    ],
    metrics: [
      { number: '2,800+', label: 'Phụ huynh đã nhận cẩm nang' },
      { number: '15', label: 'Tiêu chí đánh giá toàn diện' },
      { number: '4.8/5', label: 'Đánh giá từ phụ huynh' },
      { number: '15+', label: 'Năm kinh nghiệm biên soạn' },
    ],
    contentTitle: 'Vì sao THCS là bước ngoặt quan trọng?',
    contentCards: [
      { heading: '🎯 Nền tảng quyết định đậu THPT top', body: 'Lớp 6-9 là 4 năm xây nền cho THPT. Trường THCS tốt có lộ trình ôn thi vào THPT chuyên từ lớp 7 — học sinh trường yếu thường phải đi học thêm rất nhiều.' },
      { heading: '🗣️ Tiếng Anh phải tăng tốc ngay lớp 6', body: 'Lớp 6 là thời điểm vàng để bứt phá tiếng Anh. Trường có chương trình IELTS bài bản giúp con đạt 6.5+ khi lên lớp 9 — lợi thế xét tuyển THPT và đại học sau này.' },
      { heading: '💭 Tuổi dậy thì cần môi trường phù hợp', body: 'Lứa tuổi 11-15 là "bão dậy thì" — tâm lý dễ tổn thương. Trường có tư vấn tâm lý học đường + thầy cô chủ nhiệm đồng hành quyết định con có giữ được tâm lý tốt hay không.' },
      { heading: '👥 Bạn bè lớp 6-9 ảnh hưởng cả tuổi trẻ', body: 'Bạn thân ở THCS thường kéo nhau lên THPT cùng, ảnh hưởng quyết định chọn ngành, thói quen học tập, lối sống. Chọn trường có cộng đồng học sinh phù hợp là đầu tư dài hạn.' },
    ],
    urgencyNote: '⚠️ Tuyển sinh lớp 6 tại TP.HCM cạnh tranh cao. Các trường THCS tốt (công lập chuyên + tư thục top) đều tổ chức khảo sát từ tháng 3-4 và thường đóng đơn sớm.',
    formHeading: 'Nhận cẩm nang MIỄN PHÍ qua email',
    formChecklist: [
      'Cẩm nang 15 tiêu chí chọn trường THCS',
      'So sánh top 10 trường THCS TP.HCM',
      'Phân tích chương trình IELTS lớp 6-9',
      'Timeline tuyển sinh Lớp 6 2026 TP.HCM',
    ],
    urgencyTitleForCam: 'Cẩm nang Chọn Trường THCS đã sẵn sàng!',
    faqItems: [
      { question: 'Cẩm nang dành cho bé lớp mấy?', answer: 'Phù hợp Ba/Mẹ có con 10–15 tuổi: chuẩn bị vào lớp 6 hoặc đang học THCS muốn chuyển trường/nâng cấp lộ trình.' },
      { question: 'Có so sánh các trường THCS cụ thể không?', answer: 'Có. Cẩm nang so sánh 10 trường THCS top TP.HCM (cả công lập chuyên và tư thục) với điểm chuẩn 5 năm, tỷ lệ đậu THPT chuyên, chương trình tiếng Anh.' },
      { question: 'Tôi quan tâm lộ trình IELTS, cẩm nang có đề cập không?', answer: 'Có. Phần riêng phân tích lộ trình IELTS lớp 6-9 ở các trường top: khi nào bắt đầu, mục tiêu điểm từng năm, so sánh chất lượng giáo viên bản ngữ.' },
      { question: 'Miễn phí hoàn toàn?', answer: 'Có. Biên soạn bởi Trường Việt Anh với 15+ năm kinh nghiệm tuyển sinh THCS tại TP.HCM. Không cam kết, không spam.' },
      { question: 'Sau khi nhận, tôi có được tư vấn riêng?', answer: 'Có. Tư vấn viên sẽ gửi lời mời tham quan miễn phí cơ sở THCS Việt Anh + gọi tư vấn lộ trình cá nhân hóa nếu Ba/Mẹ yêu cầu.' },
    ],
  },

  // -------------------- THPT --------------------
  {
    slug: 'chon-truong-thpt',
    levelKey: 'thpt',
    levelLabel: 'THPT',
    pdfFile: 'checklist-chon-truong-thpt.pdf',
    pdfSizeKB: 320,
    tagName: 'chon-truong-thpt',
    pageTitle: 'Chọn Trường THPT 2026: Cẩm Nang Cho Phụ Huynh Lớp 9 | Trường Việt Anh',
    pageDescription: 'Cẩm nang miễn phí giúp Ba/Mẹ chọn trường THPT đúng cho con tại TP.HCM: 16 tiêu chí, so sánh top 15 trường THPT, định hướng đại học, IELTS 6.5-8.0, timeline thi lớp 10.',
    heroHeadline: 'Cẩm Nang Chọn Trường THPT 2026',
    heroSub: '16 tiêu chí + so sánh top 15 trường THPT TP.HCM + lộ trình IELTS 6.5–8.0 + định hướng đại học trong/ngoài nước + timeline thi lớp 10 — dành cho Ba/Mẹ có con lớp 9 (14–17 tuổi).',
    ageRange: '14–17 tuổi',
    uspTitle: 'Trong cẩm nang có gì?',
    uspItems: [
      { icon: '🎓', text: '16 tiêu chí chọn trường THPT — chương trình, tỷ lệ đậu ĐH, điểm chuẩn, IELTS, định hướng nghề, hỗ trợ du học' },
      { icon: '🏆', text: 'So sánh top 15 trường THPT TP.HCM — Lê Quý Đôn, Lê Hồng Phong, Chuyên KHTN, Marie Curie, Trần Đại Nghĩa + top tư thục quốc tế' },
      { icon: '🗣️', text: 'Lộ trình IELTS 6.5–8.0 — trường nào có đội ngũ dạy IELTS chuẩn, mục tiêu điểm theo lớp 10-12, ai đạt 8.0+' },
      { icon: '🎯', text: 'Định hướng đại học trong/ngoài nước — SAT, ACT, IB, AP, trường nào hỗ trợ hồ sơ du học Mỹ/Úc/Anh tốt nhất' },
      { icon: '📅', text: 'Timeline thi lớp 10 2026 — thi khảo sát, xét tuyển riêng, tuyển thẳng, thông báo kết quả — tránh bỏ lỡ' },
      { icon: '📝', text: 'Checklist 6 tháng chuẩn bị thi lớp 10 — ôn thi, tâm lý, hồ sơ đăng ký dự thi, phương án dự phòng' },
    ],
    metrics: [
      { number: '2,400+', label: 'Phụ huynh đã nhận cẩm nang' },
      { number: '16', label: 'Tiêu chí đánh giá toàn diện' },
      { number: '4.9/5', label: 'Đánh giá từ phụ huynh' },
      { number: '15+', label: 'Năm kinh nghiệm biên soạn' },
    ],
    contentTitle: 'Vì sao chọn trường THPT quyết định tương lai con?',
    contentCards: [
      { heading: '🎓 3 năm quyết định cả đời', body: 'THPT là 3 năm cuối cùng trước đại học. Trường tốt có tỷ lệ học sinh đậu ĐH top >80%, trường yếu chỉ 30–40% — Ba/Mẹ cần chọn dựa trên dữ liệu thực, không quảng cáo.' },
      { heading: '🗣️ IELTS là chìa khóa du học + xét tuyển', body: 'IELTS 7.0+ mở cửa du học Mỹ/Úc/Anh, IELTS 6.5+ giúp xét tuyển đại học Việt Nam top. Trường không có đội ngũ dạy IELTS chuẩn → con phải học ngoài tốn kém và không hiệu quả.' },
      { heading: '🎯 Định hướng đúng tiết kiệm 4 năm đại học', body: '60% sinh viên Việt Nam học trái ngành hoặc chuyển ngành sau năm 1. Trường THPT có chương trình hướng nghiệp bài bản giúp con chọn đúng ngành ngay từ lớp 10.' },
      { heading: '🌏 Du học hay học ĐH trong nước?', body: 'Quyết định du học hay ở lại ảnh hưởng 4+ năm + hàng tỷ đồng. Trường có hỗ trợ hồ sơ du học (SAT, IB, AP, thư giới thiệu) giúp con có nhiều lựa chọn ngay khi tốt nghiệp.' },
    ],
    urgencyNote: '⚠️ Tuyển sinh lớp 10 TP.HCM 2026 khốc liệt. Các trường THPT top (Lê Quý Đôn, Chuyên KHTN, Lê Hồng Phong) có điểm chuẩn tăng mỗi năm — cần chuẩn bị lộ trình từ lớp 8.',
    formHeading: 'Nhận cẩm nang MIỄN PHÍ qua email',
    formChecklist: [
      'Cẩm nang 16 tiêu chí chọn trường THPT',
      'So sánh top 15 trường THPT TP.HCM',
      'Lộ trình IELTS 6.5–8.0 + định hướng đại học',
      'Timeline thi lớp 10 2026 TP.HCM',
    ],
    urgencyTitleForCam: 'Cẩm nang Chọn Trường THPT đã sẵn sàng!',
    faqItems: [
      { question: 'Cẩm nang dành cho bé lớp mấy?', answer: 'Phù hợp Ba/Mẹ có con 14–17 tuổi: lớp 9 chuẩn bị thi lớp 10, hoặc lớp 10-11 muốn chuyển trường/tối ưu lộ trình đại học.' },
      { question: 'Có phân tích các trường THPT cụ thể không?', answer: 'Có. Cẩm nang so sánh 15 trường THPT top TP.HCM: công lập (Lê Quý Đôn, Lê Hồng Phong, Chuyên KHTN, Marie Curie, Trần Đại Nghĩa), tư thục quốc tế (VAS, ISSP, ABC…), song ngữ Việt Anh.' },
      { question: 'Cẩm nang có hướng dẫn du học không?', answer: 'Có. Phần riêng về SAT/ACT/IB/AP, trường nào hỗ trợ hồ sơ du học Mỹ/Úc/Anh tốt nhất, timeline nộp hồ sơ du học song song với thi ĐH Việt Nam.' },
      { question: 'Miễn phí hoàn toàn?', answer: 'Hoàn toàn miễn phí. Biên soạn bởi Trường Việt Anh với 15+ năm kinh nghiệm tuyển sinh THPT và tư vấn du học tại TP.HCM.' },
      { question: 'Sau khi nhận, tôi có được tư vấn lộ trình riêng?', answer: 'Có. Tư vấn viên sẽ gửi lời mời tham quan miễn phí cơ sở THPT Việt Anh + gọi tư vấn lộ trình IELTS + định hướng đại học cá nhân hóa cho con.' },
    ],
  },
];
