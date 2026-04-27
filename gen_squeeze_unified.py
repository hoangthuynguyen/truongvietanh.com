"""
Generates unified high-conversion squeeze pages — no-scroll, above-the-fold design.
v4: Giống checklist-mam-non — 2 cột, 1 email field, overflow:hidden, no footer/topbar.
"""
import os

BASE = r"D:\truongvietanh.com\.claude\worktrees\jolly-borg-9f4aac\src\pages\squeeze"

PAGES = [
  {
    'slug': 'checklist-mam-non',
    'skip': True,  # already done manually
  },
  {
    'slug': 'giai-doan-vang-ngon-ngu',
    'title': 'Giai Đoạn Vàng Phát Triển Ngôn Ngữ — Đừng Bỏ Lỡ Cửa Sổ 0–6 Tuổi | Trường Việt Anh',
    'meta': 'Hướng dẫn miễn phí giúp con phát triển ngôn ngữ tối đa trong giai đoạn vàng 0–6 tuổi.',
    'badge': '💬 PHÁT TRIỂN NGÔN NGỮ · MIỄN PHÍ',
    'h1': 'Bỏ lỡ giai đoạn 0–6 tuổi —<em>Con chậm nói cả đời</em>',
    'sub': 'Hướng dẫn thực tế kích thích ngôn ngữ tối đa trong cửa sổ vàng quan trọng nhất',
    'bullets': [
      'Timeline phát triển ngôn ngữ theo từng tháng tuổi — dễ theo dõi',
      'Nhận biết sớm dấu hiệu chậm nói để can thiệp đúng lúc',
      '20 hoạt động kích thích ngôn ngữ tại nhà không cần gia sư',
    ],
    'doc': 'Hướng Dẫn Giai Đoạn Vàng Phát Triển Ngôn Ngữ 0–6 Tuổi',
    'proof': '3,211 phụ huynh đã tải',
    'cta': '🎁 TẢI MIỄN PHÍ NGAY',
    'source': 'squeeze-giai-doan-vang', 'funnel': 'squeeze-giai-doan-vang', 'level': 'mam-non',
    'mockup': 'mockup-giai-doan-vang.png',
  },
  {
    'slug': 'ebook-9-linh-vuc-mam-non',
    'title': 'Ebook 9 Lĩnh Vực Phát Triển Trẻ Mầm Non — Tải Miễn Phí | Trường Việt Anh',
    'meta': 'Ebook miễn phí về 9 lĩnh vực phát triển toàn diện cho trẻ mầm non.',
    'badge': '🌱 EBOOK MẦM NON · MIỄN PHÍ',
    'h1': 'Hiểu sai 9 lĩnh vực phát triển —<em>Dạy sai cả thời thơ ấu</em>',
    'sub': 'Ebook giúp Ba/Mẹ hiểu đúng để đồng hành cùng con trong giai đoạn quan trọng nhất',
    'bullets': [
      'Phát triển nhận thức, ngôn ngữ, thể chất — hiểu đúng từng giai đoạn',
      'Tránh những sai lầm phổ biến trong nuôi dạy trẻ mầm non',
      'Hoạt động thực hành theo từng lĩnh vực — áp dụng ngay tại nhà',
    ],
    'doc': 'Ebook 9 Lĩnh Vực Phát Triển Mầm Non',
    'proof': '2,654 phụ huynh đã tải',
    'cta': '🎁 TẢI EBOOK MIỄN PHÍ',
    'source': 'squeeze-ebook-9-linh-vuc', 'funnel': 'squeeze-ebook-9-linh-vuc', 'level': 'mam-non',
    'mockup': 'mockup-ebook-9-linh-vuc.png',
  },
  {
    'slug': 'quiz-phuong-phap-giao-duc',
    'title': 'Quiz Phong Cách Giáo Dục — Bạn Nuôi Dạy Con Đúng Cách Chưa? | Trường Việt Anh',
    'meta': 'Quiz miễn phí 10 câu giúp phụ huynh khám phá phong cách giáo dục và điều chỉnh phù hợp.',
    'badge': '📝 QUIZ DÀNH CHO PHỤ HUYNH',
    'h1': 'Bạn đang nuôi dạy con theo bản năng —<em>hay theo khoa học?</em>',
    'sub': 'Quiz 10 câu khoa học — nhận kết quả phân tích phong cách giáo dục của bạn ngay',
    'bullets': [
      'Khám phá điểm mạnh và điểm cần cải thiện trong cách nuôi dạy con',
      'Hiểu vì sao con phản ứng như vậy với từng cách giáo dục',
      'Nhận gợi ý điều chỉnh phù hợp với tính cách riêng của từng bé',
    ],
    'doc': 'Quiz Phong Cách Giáo Dục — Kết Quả Cá Nhân Hoá',
    'proof': '5,127 phụ huynh đã làm quiz',
    'cta': '📝 LÀM QUIZ NGAY · MIỄN PHÍ',
    'source': 'squeeze-quiz-phuong-phap', 'funnel': 'squeeze-quiz-phuong-phap', 'level': 'tieu-hoc',
    'mockup': 'mockup-quiz-phuong-phap.png',
  },
  {
    'slug': 'lo-trinh-tieng-anh-lop1-5',
    'title': 'Lộ Trình Tiếng Anh Lớp 1–5 — 5 Năm Xây Nền Tảng Vững | Trường Việt Anh',
    'meta': 'Lộ trình tiếng Anh 5 năm tiểu học miễn phí. Mỗi lớp cần đạt gì — bản đồ toàn diện.',
    'badge': '📚 LỘ TRÌNH TIẾNG ANH · MIỄN PHÍ',
    'h1': 'Học Tiếng Anh 5 năm tiểu học mà vẫn hổng —<em>Vì không có lộ trình</em>',
    'sub': 'Bản đồ từng lớp 1→5: cần đạt gì, học gì, thi gì — giúp con không bị hổng kiến thức',
    'bullets': [
      'Mục tiêu ngôn ngữ cụ thể cho từng lớp — biết ngay con đang ở đâu',
      'Tài liệu và app khuyến nghị theo từng cấp lớp',
      'Checklist tự đánh giá cuối học kỳ — không cần chờ kết quả trường',
    ],
    'doc': 'Lộ Trình Tiếng Anh Lớp 1–5 — Bản Đồ 5 Năm',
    'proof': '3,678 phụ huynh đã tải',
    'cta': '🎁 TẢI LỘ TRÌNH MIỄN PHÍ',
    'source': 'squeeze-lo-trinh-tieng-anh', 'funnel': 'squeeze-lo-trinh-tieng-anh', 'level': 'tieu-hoc',
    'mockup': 'mockup-lo-trinh-tieng-anh-lop1-5.png',
  },
  {
    'slug': 'so-sanh-chi-phi-hoc',
    'title': 'Bảng So Sánh Chi Phí Học 2026 — Công Lập vs Tư Thục vs Quốc Tế | Trường Việt Anh',
    'meta': 'Bảng so sánh chi phí học thực tế 2026 tại TP.HCM. Học phí thực sự là bao nhiêu?',
    'badge': '💰 SO SÁNH CHI PHÍ 2026 · MIỄN PHÍ',
    'h1': 'Chọn sai loại trường —<em>Tiêu tốn hàng trăm triệu mà không biết</em>',
    'sub': 'Bảng so sánh chi phí thực tế 2026: Công lập vs Tư thục vs Quốc tế tại TP.HCM',
    'bullets': [
      'Học phí thực sự từng loại trường — khoản nào hay bị "bất ngờ"',
      'Số liệu cụ thể năm học 2025–2026, không phỏng đoán',
      'Bảng so sánh song song — quyết định đúng ngay lần đầu',
    ],
    'doc': 'Bảng So Sánh Chi Phí Học 2026 — Công Lập / Tư Thục / Quốc Tế',
    'proof': '3,089 phụ huynh đã tải',
    'cta': '🎁 NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    'source': 'squeeze-so-sanh-chi-phi', 'funnel': 'squeeze-so-sanh-chi-phi', 'level': 'tieu-hoc',
    'mockup': 'mockup-so-sanh-chi-phi.png',
  },
  {
    'slug': 'huong-dan-dang-ky-lop1',
    'title': 'Hướng Dẫn Đăng Ký Vào Lớp 1 Năm 2026 — Hồ Sơ, Lịch & Tiêu Chí | Trường Việt Anh',
    'meta': 'Hướng dẫn đăng ký vào lớp 1 năm 2026 tại TP.HCM. Checklist hồ sơ đầy đủ, lịch tuyển sinh.',
    'badge': '📋 VÀO LỚP 1 NĂM 2026 · MIỄN PHÍ',
    'h1': 'Nộp hồ sơ lớp 1 trễ deadline —<em>Con mất suất trường tốt</em>',
    'sub': 'Checklist hồ sơ đầy đủ + lịch tuyển sinh từng quận — chuẩn bị đúng, nộp đúng hạn',
    'bullets': [
      'Checklist hồ sơ chi tiết — không thiếu một giấy tờ nào',
      'Lịch tuyển sinh lớp 1 năm 2026 từng quận/huyện tại TP.HCM',
      'Tiêu chí ưu tiên tuyển sinh công lập — tận dụng ngay nếu có',
    ],
    'doc': 'Hướng Dẫn Đăng Ký Vào Lớp 1 — 2026',
    'proof': '4,200+ phụ huynh đã tải',
    'cta': '🎁 TẢI HƯỚNG DẪN MIỄN PHÍ',
    'source': 'squeeze-dang-ky-lop1', 'funnel': 'squeeze-dang-ky-lop1', 'level': 'tieu-hoc',
    'mockup': 'mockup-huong-dan-dang-ky-lop1.png',
  },
  {
    'slug': 'reading-challenge-30-ngay',
    'title': 'Thử Thách 30 Ngày Đọc Sách Cùng Con — Bộ Kit In Sẵn Miễn Phí | Trường Việt Anh',
    'meta': 'Bộ kit Reading Challenge 30 Ngày: Poster + Sticker chart + Reading log song ngữ. In ra dùng ngay!',
    'badge': '📚 READING CHALLENGE · IN SẴN',
    'h1': 'Con không chịu đọc sách —<em>Vì chưa có thử thách đủ thú vị</em>',
    'sub': 'Bộ kit 30 ngày song ngữ Việt–Anh: in ra, dán tường, cùng con chinh phục mỗi ngày',
    'bullets': [
      'Poster theo dõi 30 ngày — trực quan, tạo động lực cho con mỗi sáng',
      'Bảng dán sticker phần thưởng — con tự hoàn thành mục tiêu ngày',
      'Reading Log song ngữ — ghi chép sách đã đọc, xây thói quen bền vững',
    ],
    'doc': 'Bộ Kit Reading Challenge 30 Ngày — Song Ngữ',
    'proof': '2,847 phụ huynh đã tải',
    'cta': '🎁 NHẬN BỘ KIT MIỄN PHÍ',
    'source': 'squeeze-reading-challenge', 'funnel': 'squeeze-reading-challenge', 'level': 'tieu-hoc',
    'mockup': 'mockup-reading-challenge.png',
  },
  {
    'slug': 'checklist-10-ky-nang-lop1',
    'title': 'Checklist 10 Kỹ Năng Trước Khi Vào Lớp 1 — Tải Miễn Phí | Trường Việt Anh',
    'meta': 'Checklist 10 kỹ năng con cần có trước lớp 1. Bài tập rèn luyện + Timeline 3 tháng.',
    'badge': '✅ CHECKLIST LỚP 1 · MIỄN PHÍ',
    'h1': 'Bé thông minh vẫn khóc tuần đầu lớp 1 —<em>Vì thiếu 10 kỹ năng này</em>',
    'sub': 'Kiểm tra ngay con bạn đã sẵn sàng chưa — trước khi vào lớp 1 quá muộn',
    'bullets': [
      'Danh sách 10 kỹ năng thiết yếu với bài tập rèn luyện cụ thể',
      'Timeline 3 tháng chuẩn bị — theo tuần, dễ thực hiện tại nhà',
      'Tránh cú sốc đầu lớp 1: tự lập, tập trung, giao tiếp với thầy cô',
    ],
    'doc': 'Checklist 10 Kỹ Năng Vào Lớp 1 + Timeline 3 Tháng',
    'proof': '3,421 phụ huynh đã tải',
    'cta': '🎁 NHẬN CHECKLIST MIỄN PHÍ',
    'source': 'squeeze-ky-nang-lop1', 'funnel': 'squeeze-ky-nang-lop1', 'level': 'tieu-hoc',
    'mockup': 'mockup-checklist-10-ky-nang.png',
  },
  {
    'slug': 'chuyen-truong-lop6',
    'title': 'Hướng Dẫn Chuyển Trường Lên Lớp 6 — Hồ Sơ & Lịch Nộp 2026 | Trường Việt Anh',
    'meta': 'Hướng dẫn đầy đủ chuyển trường lên lớp 6 năm 2026. Checklist hồ sơ, deadline, tiêu chí.',
    'badge': '📋 HỒ SƠ LỚP 6 2026 · MIỄN PHÍ',
    'h1': 'Bỏ lỡ deadline nộp hồ sơ lớp 6 —<em>Con mất suất trường THCS tốt</em>',
    'sub': 'Checklist hồ sơ chi tiết + timeline deadline 2026 — chuẩn bị đúng, không lo trễ',
    'bullets': [
      'Checklist hồ sơ đầy đủ theo từng loại trường THCS',
      'Timeline & deadline nộp hồ sơ 2026 — không bỏ sót ngày quan trọng',
      '7 lỗi thường gặp khi nộp hồ sơ lớp 6 và cách tránh',
    ],
    'doc': 'Hướng Dẫn Chuyển Trường Lên Lớp 6 — 2026',
    'proof': '1,876 phụ huynh đã tải',
    'cta': '🎁 TẢI HƯỚNG DẪN MIỄN PHÍ',
    'source': 'squeeze-chuyen-truong-lop6', 'funnel': 'squeeze-chuyen-truong-lop6', 'level': 'thcs',
    'mockup': 'mockup-chuyen-truong-lop6.png',
  },
  {
    'slug': 'lo-trinh-ielts-thcs',
    'title': 'Lộ Trình IELTS 6.0 Cho Học Sinh THCS — Kế Hoạch 2 Năm | Trường Việt Anh',
    'meta': 'Lộ trình đạt IELTS 6.0 dành riêng cho học sinh THCS Việt Nam. Kế hoạch 2 năm chi tiết.',
    'badge': '🏆 LỘ TRÌNH IELTS THCS · MIỄN PHÍ',
    'h1': 'Học IELTS 2 năm mà band vẫn dậm chân —<em>Vì không có lộ trình đúng</em>',
    'sub': 'Kế hoạch 2 năm đạt IELTS 6.0 — thiết kế riêng cho học sinh THCS Việt Nam',
    'bullets': [
      '3 giai đoạn rõ ràng: Nền tảng → Phát triển → Luyện thi — biết học gì tiếp theo',
      'Thời gian biểu học hàng tuần thực tế, phù hợp lịch học ở trường',
      'Mốc kiểm tra tiến độ định kỳ — tự biết mình đang đúng hướng không',
    ],
    'doc': 'Lộ Trình IELTS 6.0 Cho Học Sinh THCS — 2 Năm',
    'proof': '1,543 học sinh đã tải',
    'cta': '🎁 TẢI LỘ TRÌNH IELTS',
    'source': 'squeeze-lo-trinh-ielts-thcs', 'funnel': 'squeeze-lo-trinh-ielts-thcs', 'level': 'thcs',
    'mockup': 'mockup-lo-trinh-ielts-thcs.png',
  },
  {
    'slug': 'phuong-phap-hoc-teen',
    'title': '5 Phương Pháp Học Tập Khoa Học Cho Học Sinh Cấp 2–3 — Miễn Phí | Trường Việt Anh',
    'meta': '5 phương pháp học tập khoa học nhất cho học sinh THCS/THPT. Tải miễn phí.',
    'badge': '🧠 HỌC THÔNG MINH HƠN · MIỄN PHÍ',
    'h1': 'Học nhiều mà điểm vẫn thấp —<em>Vì chưa biết phương pháp đúng</em>',
    'sub': 'Không học nhiều hơn — mà học đúng cách. 5 phương pháp được khoa học thần kinh kiểm chứng',
    'bullets': [
      'Pomodoro + Active Recall: tập trung cao, nhớ lâu hơn gấp 3 lần',
      'Spaced Repetition: ôn đúng lúc não sắp quên — không tốn thêm giờ học',
      'Feynman: giải thích được là hiểu thật — không học vẹt nữa',
    ],
    'doc': '5 Phương Pháp Học Tập Khoa Học Nhất Cho Học Sinh Cấp 2–3',
    'proof': '2,341 học sinh đã tải',
    'cta': '🎁 TẢI 5 PHƯƠNG PHÁP MIỄN PHÍ',
    'source': 'squeeze-phuong-phap-teen', 'funnel': 'squeeze-phuong-phap-teen', 'level': 'thcs',
    'mockup': 'mockup-phuong-phap-teen.png',
  },
  {
    'slug': 'so-sanh-truong-thcs',
    'title': 'So Sánh 4 Loại Trường THCS 2026 — Công Lập, Tư Thục, Song Ngữ, Quốc Tế | Trường Việt Anh',
    'meta': 'Bảng so sánh 4 loại trường THCS theo 10 tiêu chí thực tế. Chọn đúng trường cho con lên lớp 6.',
    'badge': '🏫 SO SÁNH TRƯỜNG THCS 2026',
    'h1': 'Chọn sai loại trường THCS —<em>4 năm con không phát triển được</em>',
    'sub': '4 loại trường, 10 tiêu chí thực tế — chọn đúng từ đầu, không hối hận sau 4 năm',
    'bullets': [
      'So sánh chất lượng giảng dạy, môi trường và ngoại ngữ từng loại trường',
      'Chi phí thực tế 2026 — không bị bất ngờ với các khoản phát sinh',
      'Phù hợp con nào? Định hướng nghề nghiệp nào? Rõ ràng từng loại',
    ],
    'doc': 'Bảng So Sánh 4 Loại Trường THCS 2026',
    'proof': '2,445 phụ huynh đã tải',
    'cta': '🎁 NHẬN BẢNG SO SÁNH MIỄN PHÍ',
    'source': 'squeeze-so-sanh-thcs', 'funnel': 'squeeze-so-sanh-thcs', 'level': 'thcs',
    'mockup': 'mockup-so-sanh-truong-thcs.png',
  },
  {
    'slug': 'cam-nang-chon-thpt',
    'title': 'Cẩm Nang Chọn Trường THPT 2026 — 15 Tiêu Chí Phụ Huynh Cần Biết | Trường Việt Anh',
    'meta': 'Cẩm nang chọn trường THPT 2026 với 15 tiêu chí quan trọng.',
    'badge': '📚 CẨM NANG THPT 2026 · MIỄN PHÍ',
    'h1': 'Chọn trường THPT theo cảm tính —<em>3 năm con học không phát huy được</em>',
    'sub': '15 tiêu chí quan trọng nhất để chọn đúng trường THPT — công lập, tư thục hay quốc tế',
    'bullets': [
      'Tỉ lệ đậu ĐH, học sinh đạt giải — số liệu thực tế từng trường',
      'Môi trường, áp lực học và thời gian tự do — cân bằng quan trọng như thành tích',
      '15 tiêu chí checklist khi đi tham quan trường — hỏi đúng, chọn đúng',
    ],
    'doc': 'Cẩm Nang Chọn Trường THPT 2026 — 15 Tiêu Chí',
    'proof': '1,987 phụ huynh đã tải',
    'cta': '🎁 NHẬN CẨM NANG MIỄN PHÍ',
    'source': 'squeeze-cam-nang-thpt', 'funnel': 'squeeze-cam-nang-thpt', 'level': 'thpt',
    'mockup': 'mockup-cam-nang-chon-thpt.png',
  },
  {
    'slug': 'chuan-bi-du-hoc-lop10',
    'title': 'Chuẩn Bị Du Học Từ Lớp 10 — Lộ Trình 3 Năm | Trường Việt Anh',
    'meta': 'Lộ trình chuẩn bị du học từ lớp 10 — 3 năm hoàn chỉnh.',
    'badge': '✈️ DU HỌC TỪ LỚP 10 · MIỄN PHÍ',
    'h1': 'Muốn du học mà không biết bắt đầu từ đâu —<em>Lộ trình 3 năm là đây</em>',
    'sub': 'Từ IELTS đến hồ sơ, từ tài chính đến visa — kế hoạch từng học kỳ rõ ràng',
    'bullets': [
      'Kế hoạch từng học kỳ lớp 10–12 — biết làm gì tiếp theo không lo lạc',
      'So sánh chi phí thực tế 5 nước: Úc, Mỹ, Canada, Singapore, Nhật',
      'Timeline học bổng và visa — không bỏ lỡ cơ hội vì thiếu thông tin',
    ],
    'doc': 'Lộ Trình Du Học Từ Lớp 10 — 3 Năm Hoàn Chỉnh',
    'proof': '987 phụ huynh đã tải',
    'cta': '🎁 TẢI LỘ TRÌNH DU HỌC',
    'source': 'squeeze-du-hoc-lop10', 'funnel': 'squeeze-du-hoc-lop10', 'level': 'thpt',
    'mockup': 'mockup-chuan-bi-du-hoc-lop10.png',
  },
  {
    'slug': 'oxford-cambridge-ib',
    'title': 'Oxford vs Cambridge vs IB — Chọn Chương Trình Nào Cho Con? | Trường Việt Anh',
    'meta': 'Phân tích chuyên sâu Oxford, Cambridge và IB. Bảng so sánh 10 tiêu chí giúp phụ huynh chọn đúng.',
    'badge': '🌍 CHƯƠNG TRÌNH QUỐC TẾ · MIỄN PHÍ',
    'h1': 'Oxford, Cambridge hay IB —<em>Chọn sai chương trình, con đi sai hướng</em>',
    'sub': '3 chương trình quốc tế, 10 tiêu chí so sánh — chọn đúng từ đầu, không hối hận',
    'bullets': [
      'Điểm khác biệt cốt lõi giữa Oxford IGCSE, Cambridge và IB',
      'Phù hợp với định hướng học tập nào: khoa học, kinh doanh, nghệ thuật?',
      'Bảng so sánh song song 10 tiêu chí — quyết định rõ ràng trong 5 phút',
    ],
    'doc': 'So Sánh Oxford / Cambridge / IB — 10 Tiêu Chí',
    'proof': '892 phụ huynh đã tải',
    'cta': '🎁 NHẬN TÀI LIỆU SO SÁNH',
    'source': 'squeeze-oxford-cambridge-ib', 'funnel': 'squeeze-oxford-cambridge-ib', 'level': 'thpt',
    'mockup': 'mockup-oxford-cambridge-ib.png',
  },
  {
    'slug': 'conversation-cards-song-ngu',
    'title': '50 Conversation Cards Song Ngữ — Luyện Tiếng Anh Cùng Con | Trường Việt Anh',
    'meta': '50 thẻ hội thoại Việt–Anh song ngữ miễn phí. In ra, luyện tiếng Anh cùng con tại nhà!',
    'badge': '🗣️ LUYỆN TIẾNG ANH TẠI NHÀ',
    'h1': 'Cho con học tiếng Anh mãi mà không nói được —<em>Vì thiếu luyện hội thoại thực tế</em>',
    'sub': '50 thẻ in sẵn song ngữ Việt–Anh — chơi cùng con mỗi tối, tiếng Anh tự nhiên như thở',
    'bullets': [
      '10 chủ đề thực tế: gia đình, trường học, thức ăn, cảm xúc...',
      'Từ vựng + cấu trúc câu kèm theo — học mà không biết mình đang học',
      '5 trò chơi ngôn ngữ dùng thẻ — con thích chơi hơn xem điện thoại',
    ],
    'doc': '50 Conversation Cards Song Ngữ Việt–Anh',
    'proof': '4,102 phụ huynh đã tải',
    'cta': '🎁 TẢI 50 CARDS MIỄN PHÍ',
    'source': 'squeeze-conversation-cards', 'funnel': 'squeeze-conversation-cards', 'level': 'tieu-hoc',
    'mockup': 'mockup-conversation-cards.png',
  },
  {
    'slug': '50-truong-dh-xet-ielts',
    'title': 'Danh Sách 50 Trường ĐH Xét IELTS 2026 — Tải Miễn Phí | Trường Việt Anh',
    'meta': 'Danh sách 50 trường Đại học Việt Nam xét tuyển bằng IELTS 2026. Điểm chuẩn và cách quy đổi.',
    'badge': '🎓 TUYỂN SINH ĐẠI HỌC 2026',
    'h1': 'Có IELTS mà không biết trường nào xét —<em>Bỏ phí lợi thế lớn nhất</em>',
    'sub': '50 trường ĐH xét IELTS 2026 — điểm chuẩn, cách quy đổi và bí quyết đậu top',
    'bullets': [
      '50 trường ĐH xét IELTS: điểm yêu cầu từng trường, từng ngành cụ thể',
      'Cách quy đổi điểm IELTS sang thang 10 — tối đa hoá lợi thế xét tuyển',
      'Bí quyết tối ưu hồ sơ: IELTS cao nhưng vẫn trượt vì thiếu điều này',
    ],
    'doc': 'Danh Sách 50 Trường ĐH Xét IELTS 2026',
    'proof': '3,150 học sinh đã tải',
    'cta': '🎁 TẢI DANH SÁCH MIỄN PHÍ',
    'source': 'squeeze-50-truong-ielts', 'funnel': 'squeeze-50-truong-ielts', 'level': 'thpt',
    'mockup': 'mockup-50-truong-dh-xet-ielts.png',
  },
]

TEMPLATE = '''<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title}</title>
<meta name="description" content="{meta}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
html,body{{height:100%;overflow:hidden}}
body{{font-family:'Open Sans',sans-serif;background:#0b1735;color:#fff;display:flex;flex-direction:column}}

/* ── HEADER ── */
.hdr{{
  background:#0d1b3e;
  border-bottom:1px solid rgba(255,255,255,.08);
  padding:0 32px;height:56px;
  display:flex;align-items:center;justify-content:space-between;
  flex-shrink:0;
}}
.hdr-logo{{height:40px;border-radius:7px;background:#fff;padding:4px 10px;display:block}}
.hdr-right{{display:flex;align-items:center;gap:8px}}
.btn-ph{{
  display:flex;align-items:center;gap:6px;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.15);
  color:#fff;padding:6px 13px;border-radius:7px;font-size:12.5px;font-weight:600;text-decoration:none;
}}
.btn-zl{{background:#0068FF;color:#fff;padding:6px 14px;border-radius:7px;font-size:12.5px;font-weight:700;text-decoration:none}}

/* ── HERO — fills 100% remaining height ── */
.hero{{
  flex:1;min-height:0;
  display:grid;grid-template-columns:1.1fr 0.9fr;
  max-width:1300px;width:100%;margin:0 auto;
  padding:20px 36px 16px;
  gap:32px;align-items:center;
}}

/* ── LEFT COPY ── */
.copy{{display:flex;flex-direction:column;justify-content:center;gap:14px}}

.badge{{
  display:inline-flex;align-items:center;gap:7px;width:fit-content;
  background:rgba(240,192,64,.12);border:1px solid rgba(240,192,64,.32);
  color:#f0c040;padding:5px 14px;border-radius:20px;
  font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;
}}

.h1{{
  font-family:'Montserrat',sans-serif;
  font-size:clamp(2rem,3.2vw,3rem);
  font-weight:900;line-height:1.13;color:#fff;
}}
.h1 em{{color:#f0c040;font-style:normal}}

.sub{{
  font-size:15px;color:rgba(255,255,255,.78);line-height:1.5;font-weight:500;
  border-left:3px solid #d4a843;padding-left:13px;
}}

.bullets{{list-style:none;display:flex;flex-direction:column;gap:10px}}
.bullets li{{
  display:flex;align-items:flex-start;gap:10px;
  font-size:14px;color:rgba(255,255,255,.85);line-height:1.45;
}}
.bico{{
  width:20px;height:20px;min-width:20px;border-radius:50%;
  background:rgba(240,192,64,.15);border:1.5px solid rgba(240,192,64,.45);
  display:flex;align-items:center;justify-content:center;margin-top:1px;
}}
.bico svg{{width:10px;height:10px;stroke:#f0c040;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}}

.trust{{
  display:flex;align-items:center;gap:10px;width:fit-content;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);
  border-radius:10px;padding:9px 14px;font-size:12px;color:rgba(255,255,255,.58);
}}
.trust-stars{{color:#f0c040;letter-spacing:1.5px;font-size:13px}}

/* ── RIGHT ── */
.right{{
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  gap:10px;height:100%;
}}

.mockup-wrap{{
  max-height:26%;
  display:flex;align-items:flex-end;justify-content:center;width:100%;overflow:hidden;
}}
.mockup-wrap img{{
  max-height:100%;max-width:100%;object-fit:contain;
  filter:drop-shadow(0 12px 36px rgba(0,0,0,.55));display:block;
}}

/* ── FORM CARD ── */
.card{{
  background:#fff;border-radius:16px;
  box-shadow:0 20px 64px rgba(0,0,0,.55);
  width:100%;overflow:hidden;
}}
.card-top{{
  background:linear-gradient(135deg,#0d1b3e 0%,#1a2d6e 100%);
  padding:12px 20px;text-align:center;border-bottom:2.5px solid #d4a843;
}}
.card-pretitle{{color:#f0c040;font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:2px}}
.card-title{{color:#fff;font-family:'Montserrat',sans-serif;font-weight:800;font-size:.88rem;line-height:1.35}}

.card-body{{padding:12px 16px 10px}}
.form-label{{display:block;font-size:10.5px;font-weight:700;color:#666;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px}}
.form-input{{
  width:100%;padding:11px 13px;
  border:2px solid #e5e7eb;border-radius:10px;
  font-size:14.5px;outline:none;transition:.2s;
  font-family:inherit;color:#1a1a1a;margin-bottom:10px;
}}
.form-input.s2{{padding:10px 13px;font-size:14px;margin-bottom:8px}}
.form-input:focus{{border-color:#0d1b3e;box-shadow:0 0 0 3px rgba(13,27,62,.08)}}
.form-input.error{{border-color:#ef4444}}

.btn-cta{{
  width:100%;padding:14px;
  background:linear-gradient(135deg,#d4a843 0%,#f5cc42 100%);
  color:#0d1b3e;font-family:'Montserrat',sans-serif;
  font-weight:900;font-size:15px;border:none;border-radius:11px;
  cursor:pointer;transition:.2s;text-transform:uppercase;letter-spacing:.3px;
  box-shadow:0 6px 22px rgba(212,168,67,.55);
}}
.btn-cta:hover{{transform:translateY(-2px);box-shadow:0 12px 30px rgba(212,168,67,.65)}}
.btn-cta:active{{transform:none}}
.guarantee{{text-align:center;font-size:10.5px;color:#aaa;margin-top:7px}}

/* ── STEP BAR ── */
.step-bar{{display:flex;align-items:center;gap:8px;padding:10px 16px 0}}
.step-item{{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#bbb}}
.step-item.active{{color:#0d1b3e}}
.step-item.done{{color:#22c55e}}
.step-num{{width:20px;height:20px;border-radius:50%;background:#e5e7eb;color:#888;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}}
.step-item.active .step-num{{background:#0d1b3e;color:#fff}}
.step-item.done .step-num{{background:#22c55e;color:#fff}}
.step-line{{flex:1;height:2px;background:#e5e7eb;border-radius:2px}}
.step-line.done{{background:#22c55e}}
.btn-back{{background:none;border:none;color:#999;font-size:11.5px;cursor:pointer;padding:4px 0 0;display:inline-flex;align-items:center;gap:4px;font-family:inherit}}
.btn-back:hover{{color:#555}}

.success-box{{display:none;padding:16px;text-align:center}}
.success-box .ico{{font-size:2.4rem;margin-bottom:8px}}
.success-box h3{{font-family:'Montserrat',sans-serif;color:#0d1b3e;font-size:1rem;margin-bottom:5px}}
.success-box p{{font-size:13px;color:#666;line-height:1.6}}

/* ── MOBILE ── */
@media(max-width:900px){{
  html,body{{overflow-x:hidden;overflow-y:auto;height:auto}}
  .hero{{grid-template-columns:1fr;padding:20px 18px 28px;gap:20px;flex:unset}}
  .copy{{gap:12px}}
  .h1{{font-size:1.7rem}}
  .sub{{font-size:13.5px}}
  .mockup-wrap{{max-height:200px}}
  .right{{gap:12px}}
  .hdr{{padding:0 18px;height:52px}}
  .hdr-logo{{height:36px}}
  .btn-cta{{font-size:15px;padding:15px}}
}}
@media(max-width:480px){{
  .btn-ph span{{display:none}}
  .h1{{font-size:1.5rem}}
  .sub{{font-size:13px}}
}}
</style>
</head>
<body>

<!-- HEADER -->
<header class="hdr">
  <a href="https://truongvietanh.com">
    <img src="/logo-th-thcs-thpt.png" alt="Trường Việt Anh" class="hdr-logo" />
  </a>
  <div class="hdr-right">
    <a href="tel:0916961409" class="btn-ph">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.69 3.41 2 2 0 0 1 3.65 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
      <span>0916 961 409</span>
    </a>
    <a href="https://zalo.me/0916961409" class="btn-zl">💬 Zalo</a>
  </div>
</header>

<!-- HERO -->
<section class="hero">

  <!-- LEFT: COPY -->
  <div class="copy">
    <div class="badge">{badge}</div>
    <h1 class="h1">{h1}</h1>
    <p class="sub">{sub}</p>
    <ul class="bullets">
{bullets_html}
    </ul>
    <div class="trust">
      <span class="trust-stars">★★★★★</span>
      <span>{proof} · Miễn phí 100%</span>
    </div>
  </div>

  <!-- RIGHT: MOCKUP + FORM -->
  <div class="right">
    <div class="mockup-wrap">
      <img src="/{mockup}" alt="{doc}"
           onerror="this.parentElement.style.display=\'none\'" />
    </div>
    <div class="card" id="mainCard">
      <div class="card-top">
        <div class="card-pretitle">✨ Nhận ngay · Miễn phí 100%</div>
        <div class="card-title">{doc}</div>
      </div>
      <!-- Step indicator -->
      <div class="step-bar" id="stepBar">
        <div class="step-item active" id="si1"><div class="step-num" id="sn1">1</div><span>Email</span></div>
        <div class="step-line" id="sl1"></div>
        <div class="step-item" id="si2"><div class="step-num">2</div><span>Thông tin</span></div>
      </div>

      <!-- STEP 1: Email -->
      <div class="card-body" id="step1">
        <label class="form-label" for="sq-email">Email của bạn</label>
        <input class="form-input" type="email" id="sq-email"
               placeholder="ten@gmail.com" autocomplete="email" />
        <button class="btn-cta" onclick="sqNext()">Tiếp theo →</button>
        <p class="guarantee">🔒 Bảo mật · Không spam</p>
      </div>

      <!-- STEP 2: Họ tên + SĐT -->
      <div class="card-body" id="step2" style="display:none">
        <label class="form-label" for="sq-name">Họ và tên</label>
        <input class="form-input s2" type="text" id="sq-name"
               placeholder="Nguyễn Thị An" autocomplete="name" />
        <label class="form-label" for="sq-phone">Số điện thoại</label>
        <input class="form-input s2" type="tel" id="sq-phone"
               placeholder="0912 345 678" autocomplete="tel" />
        <button class="btn-cta" onclick="sqSubmit()">{cta}</button>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:5px">
          <button class="btn-back" onclick="sqBack()">← Quay lại</button>
          <span style="font-size:10px;color:#bbb">🔒 Bảo mật · Không spam</span>
        </div>
      </div>

      <div class="success-box" id="sqSuccess">
        <div style="font-size:1.8rem;margin-bottom:6px">🎉</div>
        <h3 style="font-family:Montserrat,sans-serif;color:#0d1b3e;font-size:.9rem;margin-bottom:4px">Đăng ký thành công!</h3>
        <p style="font-size:12px;color:#666;line-height:1.5">Kiểm tra email — tài liệu gửi trong vài phút.<br><strong>Nhớ kiểm tra Spam / Promotions</strong></p>
      </div>
    </div>
  </div>

</section>

<script>
(function(){{
  var SRC = '{source}';
  var FC  = '{funnel}';
  var SL  = '{level}';

  if (localStorage.getItem('sq_' + SRC)) {{
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('stepBar').style.display = 'none';
    document.getElementById('sqSuccess').style.display = 'block';
  }}

  window.sqNext = function() {{
    var el = document.getElementById('sq-email');
    var email = el.value.trim();
    if (!email || email.indexOf('@') < 1) {{ el.classList.add('error'); el.focus(); return; }}
    el.classList.remove('error');
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('si1').classList.remove('active');
    document.getElementById('si1').classList.add('done');
    document.getElementById('sn1').textContent = '✓';
    document.getElementById('sl1').classList.add('done');
    document.getElementById('si2').classList.add('active');
    document.getElementById('sq-name').focus();
  }};

  window.sqBack = function() {{
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('si1').classList.add('active');
    document.getElementById('si1').classList.remove('done');
    document.getElementById('sn1').textContent = '1';
    document.getElementById('sl1').classList.remove('done');
    document.getElementById('si2').classList.remove('active');
  }};

  window.sqSubmit = function() {{
    var email = document.getElementById('sq-email').value.trim();
    var ne = document.getElementById('sq-name');
    var pe = document.getElementById('sq-phone');
    var name = ne.value.trim();
    var phone = pe.value.trim();
    var ok = true;
    if (!name)  {{ ne.classList.add('error'); ok = false; }} else ne.classList.remove('error');
    if (!phone) {{ pe.classList.add('error'); ok = false; }} else pe.classList.remove('error');
    if (!ok) return;
    localStorage.setItem('sq_' + SRC, '1');
    document.getElementById('step2').style.display = 'none';
    document.getElementById('stepBar').style.display = 'none';
    document.getElementById('sqSuccess').style.display = 'block';

    fetch('https://truongvietanh.com/api/lead', {{
      method: 'POST',
      headers: {{'Content-Type':'application/json'}},
      body: JSON.stringify({{
        fullName: name, phone: phone, email: email,
        source: SRC, funnel_code: FC, school_level: SL,
        page_url: location.href,
        submitted_at: new Date().toISOString()
      }}),
      mode: 'cors'
    }}).catch(function(){{}});

    setTimeout(function(){{ window.location.href = '/squeeze/cam-on'; }}, 2000);
  }};

  document.getElementById('sq-email').addEventListener('keydown', function(e){{
    if (e.key === 'Enter') sqNext();
  }});
}})();
</script>
</body>
</html>'''


def bullets_html(items):
    svg = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'
    lines = []
    for item in items[:3]:  # max 3 bullets
        lines.append(f'      <li><span class="bico">{svg}</span><span>{item}</span></li>')
    return '\n'.join(lines)


count = 0
skipped = 0
for p in PAGES:
    if p.get('skip'):
        skipped += 1
        print(f"SKIP: {p['slug']}")
        continue
    html = TEMPLATE.format(
        title=p['title'], meta=p['meta'],
        badge=p['badge'], h1=p['h1'], sub=p['sub'],
        bullets_html=bullets_html(p['bullets']),
        doc=p['doc'], source=p['source'], funnel=p['funnel'], level=p['level'],
        cta=p['cta'], proof=p['proof'], mockup=p['mockup'],
    )
    path = os.path.join(BASE, p['slug'] + '.html')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    count += 1
    print(f"OK: {p['slug']}")

print(f"\n✅ Generated {count} pages, skipped {skipped}")
