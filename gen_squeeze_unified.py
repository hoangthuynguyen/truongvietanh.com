"""
Generates CRO-optimized squeeze pages — v6
- Logo căn giữa header, to hơn
- Form 2 bước: Step 1 (email) → Step 2 (họ tên + SĐT)
- FOMO bar đỏ với số cụ thể
- Headline: Pain + Consequence
- 3 bullets kết quả
- Testimonial social proof
- Mega CTA mạnh
- Mockup dưới form
"""
import os

BASE = r"D:\truongvietanh.com\.claude\worktrees\jolly-borg-9f4aac\src\pages\squeeze"

PAGES = [
  {
    'slug': 'checklist-mam-non',
    'skip': True,  # done manually
  },
  {
    'slug': 'giai-doan-vang-ngon-ngu',
    'title': 'Giai Đoạn Vàng Phát Triển Ngôn Ngữ — Đừng Bỏ Lỡ | Trường Việt Anh',
    'meta': 'Hướng dẫn miễn phí giúp con phát triển ngôn ngữ tối đa trong giai đoạn vàng 0–6 tuổi.',
    'fomo': '🔥 2,847 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Bỏ lỡ giai đoạn vàng 0–6 tuổi —',
    'h1em': 'Con chậm ngôn ngữ cả đời',
    'sub': 'Hướng dẫn thực tế giúp bạn kích thích ngôn ngữ đúng cách — <strong>chỉ cần 10 phút mỗi ngày, không cần chuyên gia</strong>',
    'bullets': [
      'Nhận biết sớm dấu hiệu chậm nói — <strong>can thiệp đúng lúc trước khi quá muộn</strong>',
      'Timeline phát triển ngôn ngữ từng tháng — <strong>biết ngay con đang ở đâu so với chuẩn</strong>',
      'Tránh 3 sai lầm khiến con <strong>chậm nói dù cha mẹ nói chuyện rất nhiều</strong>',
    ],
    'testimonial': '"Sau khi đọc tài liệu này tôi mới hiểu vì sao con tôi ít nói. Áp dụng 2 tuần là thấy khác biệt!"',
    'testimonial_name': '— Chị Hà Phương, Q.Gò Vấp · Đã tải 1 tuần trước',
    'doc': 'Hướng Dẫn Giai Đoạn Vàng Ngôn Ngữ 0–6 Tuổi',
    'cta': '📥 GỬI TÀI LIỆU VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-giai-doan-vang', 'funnel': 'squeeze-giai-doan-vang', 'level': 'mam-non',
    'mockup': 'mockup-giai-doan-vang.png',
  },
  {
    'slug': 'ebook-9-linh-vuc-mam-non',
    'title': 'Ebook 9 Lĩnh Vực Phát Triển Trẻ Mầm Non — Tải Miễn Phí | Trường Việt Anh',
    'meta': 'Ebook miễn phí về 9 lĩnh vực phát triển toàn diện cho trẻ mầm non.',
    'fomo': '🔥 2,654 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Dạy con theo bản năng —',
    'h1em': 'Bỏ lỡ 9 nền tảng quan trọng nhất',
    'sub': 'Ebook giúp bạn hiểu đúng từng giai đoạn phát triển — <strong>chỉ cần đọc 1 lần, đồng hành đúng cách cả thời thơ ấu</strong>',
    'bullets': [
      'Hiểu đúng 9 lĩnh vực — <strong>không còn lo lắng con phát triển chậm hay lệch</strong>',
      'Tránh những sai lầm phổ biến — <strong>mà hầu hết phụ huynh mắc mà không biết</strong>',
      'Hoạt động thực hành cụ thể — <strong>áp dụng ngay tại nhà, không cần trường lớp thêm</strong>',
    ],
    'testimonial': '"Ebook này giải thích rõ hơn tất cả sách nuôi dạy con tôi từng đọc. Rất thực tế!"',
    'testimonial_name': '— Chị Thanh Vân, Q.Tân Bình · Đã tải 3 ngày trước',
    'doc': 'Ebook 9 Lĩnh Vực Phát Triển Mầm Non',
    'cta': '📥 GỬI EBOOK VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-ebook-9-linh-vuc', 'funnel': 'squeeze-ebook-9-linh-vuc', 'level': 'mam-non',
    'mockup': 'mockup-ebook-9-linh-vuc.png',
  },
  {
    'slug': 'quiz-phuong-phap-giao-duc',
    'title': 'Quiz Phong Cách Giáo Dục — Bạn Đang Nuôi Dạy Con Đúng Cách Chưa? | Trường Việt Anh',
    'meta': 'Quiz miễn phí 10 câu giúp phụ huynh khám phá phong cách giáo dục và điều chỉnh phù hợp.',
    'fomo': '🔥 5,127 phụ huynh đã làm quiz — Kết quả cá nhân hoá miễn phí',
    'h1': 'Nuôi dạy con theo cảm tính —',
    'h1em': 'Không biết mình đang sai ở đâu',
    'sub': 'Quiz 10 câu khoa học — <strong>nhận ngay kết quả phân tích phong cách giáo dục của bạn, không cần chuyên gia tâm lý</strong>',
    'bullets': [
      'Biết chính xác điểm mạnh và điểm cần cải thiện — <strong>không phán đoán chung chung</strong>',
      'Hiểu vì sao con phản ứng như vậy — <strong>xử lý đúng thay vì đoán mò</strong>',
      'Nhận gợi ý điều chỉnh cụ thể — <strong>phù hợp tính cách riêng của từng bé</strong>',
    ],
    'testimonial': '"Kết quả quiz chính xác đến mức tôi ngạc nhiên. Giúp tôi hiểu con hơn hẳn!"',
    'testimonial_name': '— Anh Minh Khoa, Q.3 · Đã làm quiz 5 ngày trước',
    'doc': 'Kết Quả Quiz Phong Cách Giáo Dục — Cá Nhân Hoá',
    'cta': '📥 GỬI KẾT QUẢ VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-quiz-phuong-phap', 'funnel': 'squeeze-quiz-phuong-phap', 'level': 'tieu-hoc',
    'mockup': 'mockup-quiz-phuong-phap.png',
  },
  {
    'slug': 'lo-trinh-tieng-anh-lop1-5',
    'title': 'Lộ Trình Tiếng Anh Lớp 1–5 — 5 Năm Xây Nền Tảng Vững | Trường Việt Anh',
    'meta': 'Lộ trình tiếng Anh 5 năm tiểu học miễn phí. Mỗi lớp cần đạt gì — bản đồ toàn diện.',
    'fomo': '🔥 3,678 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Học Tiếng Anh 5 năm tiểu học —',
    'h1em': 'Vẫn hổng vì không có lộ trình',
    'sub': 'Bản đồ từng lớp 1→5 — <strong>biết con cần đạt gì, học gì tiếp theo, không lo bị hổng kiến thức</strong>',
    'bullets': [
      'Mục tiêu cụ thể từng lớp — <strong>biết ngay con đang ổn hay đang tụt hậu</strong>',
      'Tài liệu và app khuyến nghị — <strong>không mất thời gian tìm kiếm, dùng đúng từ đầu</strong>',
      'Checklist tự đánh giá — <strong>không cần chờ điểm trường, tự kiểm tra được ngay</strong>',
    ],
    'testimonial': '"Nhờ lộ trình này tôi biết con đang thiếu gì. Bổ sung đúng điểm yếu, con tiến bộ rõ!"',
    'testimonial_name': '— Chị Lan Anh, Q.12 · Đã tải 1 tuần trước',
    'doc': 'Lộ Trình Tiếng Anh Lớp 1–5 — Bản Đồ 5 Năm',
    'cta': '📥 GỬI LỘ TRÌNH VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-lo-trinh-tieng-anh', 'funnel': 'squeeze-lo-trinh-tieng-anh', 'level': 'tieu-hoc',
    'mockup': 'mockup-lo-trinh-tieng-anh-lop1-5.png',
  },
  {
    'slug': 'so-sanh-chi-phi-hoc',
    'title': 'Bảng So Sánh Chi Phí Học 2026 — Công Lập vs Tư Thục vs Quốc Tế | Trường Việt Anh',
    'meta': 'Bảng so sánh chi phí học thực tế 2026 tại TP.HCM. Học phí thực sự là bao nhiêu?',
    'fomo': '🔥 3,089 phụ huynh đã nhận — Số liệu thực tế 2026, miễn phí',
    'h1': 'Chọn trường mà không biết chi phí thật —',
    'h1em': 'Bị bất ngờ hàng chục triệu mỗi năm',
    'sub': 'Bảng so sánh chi phí thực tế 2026 — <strong>biết chính xác bạn cần bao nhiêu, không bị "sốc" học phí</strong>',
    'bullets': [
      'Học phí thật từng loại trường — <strong>không bị bất ngờ với các khoản phụ thu phát sinh</strong>',
      'So sánh công lập, tư thục, quốc tế — <strong>chọn đúng tầm tài chính, không phải cắt giảm sau</strong>',
      'Số liệu thực tế 2025–2026 — <strong>không phải ước tính, lên kế hoạch tài chính chính xác</strong>',
    ],
    'testimonial': '"Bảng so sánh này giúp tôi lên được kế hoạch tài chính cho con 5 năm tới. Rất hữu ích!"',
    'testimonial_name': '— Anh Quốc Tuấn, Bình Dương · Đã tải 4 ngày trước',
    'doc': 'Bảng So Sánh Chi Phí Học 2026 — Công Lập / Tư Thục / Quốc Tế',
    'cta': '📥 GỬI BẢNG SO SÁNH VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-so-sanh-chi-phi', 'funnel': 'squeeze-so-sanh-chi-phi', 'level': 'tieu-hoc',
    'mockup': 'mockup-so-sanh-chi-phi.png',
  },
  {
    'slug': 'huong-dan-dang-ky-lop1',
    'title': 'Hướng Dẫn Đăng Ký Vào Lớp 1 Năm 2026 — Hồ Sơ & Lịch | Trường Việt Anh',
    'meta': 'Hướng dẫn đăng ký vào lớp 1 năm 2026 tại TP.HCM. Checklist hồ sơ đầy đủ, lịch tuyển sinh.',
    'fomo': '🔥 4,200+ phụ huynh đã nhận — Deadline đang đến gần!',
    'h1': 'Nộp hồ sơ lớp 1 trễ deadline —',
    'h1em': 'Con mất suất trường tốt vĩnh viễn',
    'sub': 'Checklist hồ sơ đầy đủ + lịch từng quận 2026 — <strong>chuẩn bị đúng, nộp đúng hạn, không lo bị loại</strong>',
    'bullets': [
      'Checklist hồ sơ chi tiết — <strong>không thiếu một giấy tờ nào, không phải chạy lại</strong>',
      'Lịch tuyển sinh từng quận/huyện — <strong>không bao giờ trễ deadline vì không biết ngày</strong>',
      'Tiêu chí ưu tiên công lập — <strong>tận dụng đúng lợi thế, tăng cơ hội được nhận</strong>',
    ],
    'testimonial': '"Nhờ checklist này tôi chuẩn bị hồ sơ đầy đủ, nộp đúng hạn. Con được nhận vào trường như ý!"',
    'testimonial_name': '— Chị Thu Hương, Q.Bình Thạnh · Đã tải 2 tuần trước',
    'doc': 'Hướng Dẫn Đăng Ký Vào Lớp 1 — 2026',
    'cta': '📥 GỬI HƯỚNG DẪN VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-dang-ky-lop1', 'funnel': 'squeeze-dang-ky-lop1', 'level': 'tieu-hoc',
    'mockup': 'mockup-huong-dan-dang-ky-lop1.png',
  },
  {
    'slug': 'reading-challenge-30-ngay',
    'title': 'Thử Thách 30 Ngày Đọc Sách Cùng Con — Bộ Kit In Sẵn | Trường Việt Anh',
    'meta': 'Bộ kit Reading Challenge 30 Ngày miễn phí. In ra, dùng ngay!',
    'fomo': '🔥 2,847 phụ huynh đã nhận — Bộ kit in sẵn, miễn phí',
    'h1': 'Con không chịu đọc sách —',
    'h1em': 'Vì chưa có thử thách đủ thú vị',
    'sub': 'Bộ kit 30 ngày song ngữ Việt–Anh — <strong>in ra dán tường, con tự theo dõi tiến độ mỗi ngày</strong>',
    'bullets': [
      'Poster 30 ngày trực quan — <strong>con tự hào dán sticker, không cần nhắc đọc sách nữa</strong>',
      'Xây thói quen đọc bền vững — <strong>30 ngày tạo thói quen cả năm, không cần ép</strong>',
      'Song ngữ Việt–Anh — <strong>vừa đọc vừa học tiếng Anh tự nhiên, không tốn thêm tiền</strong>',
    ],
    'testimonial': '"Con tôi xin được dán sticker mỗi tối. Từ ghét đọc sách thành thích đọc chỉ sau 2 tuần!"',
    'testimonial_name': '— Chị Ngọc Hân, Q.7 · Đã tải 5 ngày trước',
    'doc': 'Bộ Kit Reading Challenge 30 Ngày — Song Ngữ',
    'cta': '📥 GỬI BỘ KIT VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-reading-challenge', 'funnel': 'squeeze-reading-challenge', 'level': 'tieu-hoc',
    'mockup': 'mockup-reading-challenge.png',
  },
  {
    'slug': 'checklist-10-ky-nang-lop1',
    'title': 'Checklist 10 Kỹ Năng Trước Khi Vào Lớp 1 — Tải Miễn Phí | Trường Việt Anh',
    'meta': 'Checklist 10 kỹ năng con cần có trước lớp 1. Bài tập rèn luyện + Timeline 3 tháng.',
    'fomo': '🔥 3,421 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Bé thông minh vẫn khóc tuần đầu lớp 1 —',
    'h1em': 'Vì thiếu 10 kỹ năng này',
    'sub': 'Kiểm tra ngay con bạn đã sẵn sàng chưa — <strong>chỉ mất 5 phút, biết ngay cần luyện thêm gì</strong>',
    'bullets': [
      'Phát hiện đúng kỹ năng còn thiếu — <strong>rèn đúng chỗ, không lãng phí thời gian</strong>',
      'Timeline 3 tháng cụ thể — <strong>biết làm gì mỗi tuần, không lo không kịp trước ngày khai giảng</strong>',
      'Tránh cú sốc đầu lớp 1 — <strong>con tự tin bước vào trường thay vì khóc mỗi buổi sáng</strong>',
    ],
    'testimonial': '"Con tôi vào lớp 1 tự tin hẳn nhờ luyện đúng theo checklist. Cô giáo khen con độc lập!"',
    'testimonial_name': '— Chị Bảo Châu, Q.Tân Phú · Đã tải 10 ngày trước',
    'doc': 'Checklist 10 Kỹ Năng Vào Lớp 1 + Timeline 3 Tháng',
    'cta': '📥 GỬI CHECKLIST VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-ky-nang-lop1', 'funnel': 'squeeze-ky-nang-lop1', 'level': 'tieu-hoc',
    'mockup': 'mockup-checklist-10-ky-nang.png',
  },
  {
    'slug': 'chuyen-truong-lop6',
    'title': 'Hướng Dẫn Chuyển Trường Lên Lớp 6 — Hồ Sơ & Lịch 2026 | Trường Việt Anh',
    'meta': 'Hướng dẫn đầy đủ chuyển trường lên lớp 6 năm 2026. Checklist hồ sơ, deadline, tiêu chí.',
    'fomo': '🔥 1,876 phụ huynh đã nhận — Deadline lớp 6 đang đến gần!',
    'h1': 'Bỏ lỡ deadline nộp hồ sơ lớp 6 —',
    'h1em': 'Con mất suất THCS tốt không lấy lại được',
    'sub': 'Checklist hồ sơ + timeline deadline 2026 — <strong>chuẩn bị đúng, nộp đúng hạn, không phải chạy nháo nhào</strong>',
    'bullets': [
      'Checklist hồ sơ theo từng loại trường — <strong>không thiếu giấy tờ, không phải chạy lại</strong>',
      '7 lỗi phụ huynh hay mắc — <strong>tránh được ngay, không bị loại vì lý do ngớ ngẩn</strong>',
      'Timeline deadline 2026 — <strong>biết chính xác ngày nộp, không bao giờ trễ</strong>',
    ],
    'testimonial': '"Nhờ tài liệu này tôi chuẩn bị hồ sơ trước 1 tháng. Con vào được trường THCS như mong muốn!"',
    'testimonial_name': '— Chị Phương Linh, Q.Phú Nhuận · Đã tải 1 tuần trước',
    'doc': 'Hướng Dẫn Chuyển Trường Lên Lớp 6 — 2026',
    'cta': '📥 GỬI HƯỚNG DẪN VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-chuyen-truong-lop6', 'funnel': 'squeeze-chuyen-truong-lop6', 'level': 'thcs',
    'mockup': 'mockup-chuyen-truong-lop6.png',
  },
  {
    'slug': 'lo-trinh-ielts-thcs',
    'title': 'Lộ Trình IELTS 6.0 Cho Học Sinh THCS — Kế Hoạch 2 Năm | Trường Việt Anh',
    'meta': 'Lộ trình đạt IELTS 6.0 dành riêng cho học sinh THCS Việt Nam. Kế hoạch 2 năm chi tiết.',
    'fomo': '🔥 1,543 học sinh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Học IELTS 2 năm mà band vẫn dậm chân —',
    'h1em': 'Vì không có lộ trình đúng từ đầu',
    'sub': 'Kế hoạch 2 năm đạt IELTS 6.0 — <strong>biết học gì mỗi tuần, không còn học lan man không tiến bộ</strong>',
    'bullets': [
      '3 giai đoạn rõ ràng — <strong>không bao giờ bị lạc, biết đang ở đâu và làm gì tiếp</strong>',
      'Thời gian biểu thực tế — <strong>phù hợp lịch học trường, không phải hi sinh quá nhiều</strong>',
      'Mốc kiểm tra định kỳ — <strong>tự biết mình đúng hướng hay cần điều chỉnh</strong>',
    ],
    'testimonial': '"Lộ trình này rõ ràng hơn hẳn những gì tôi tự mày mò. Con đạt 6.0 sau đúng 18 tháng!"',
    'testimonial_name': '— Chị Mỹ Dung, TP.Thủ Đức · Đã tải 2 tuần trước',
    'doc': 'Lộ Trình IELTS 6.0 Cho Học Sinh THCS — 2 Năm',
    'cta': '📥 GỬI LỘ TRÌNH IELTS VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-lo-trinh-ielts-thcs', 'funnel': 'squeeze-lo-trinh-ielts-thcs', 'level': 'thcs',
    'mockup': 'mockup-lo-trinh-ielts-thcs.png',
  },
  {
    'slug': 'phuong-phap-hoc-teen',
    'title': '5 Phương Pháp Học Tập Khoa Học Cho Học Sinh Cấp 2–3 | Trường Việt Anh',
    'meta': '5 phương pháp học tập khoa học nhất cho học sinh THCS/THPT. Tải miễn phí.',
    'fomo': '🔥 2,341 học sinh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Học nhiều, ôn nhiều mà điểm vẫn thấp —',
    'h1em': 'Vì chưa biết cách học đúng khoa học',
    'sub': '5 phương pháp được khoa học thần kinh kiểm chứng — <strong>học ít hơn, nhớ lâu hơn, điểm cao hơn</strong>',
    'bullets': [
      'Spaced Repetition + Active Recall — <strong>nhớ gấp 3 lần mà không cần học thêm giờ</strong>',
      'Không học vẹt nữa — <strong>hiểu thật sự và giải thích được, điểm thi không bao giờ bất ngờ</strong>',
      'Thời gian biểu Pomodoro — <strong>tập trung tối đa, xong việc nhanh hơn, còn thời gian nghỉ ngơi</strong>',
    ],
    'testimonial': '"Từ khi áp dụng Spaced Repetition, tôi học ít hơn 30% mà điểm thi lại cao hơn hẳn!"',
    'testimonial_name': '— Em Gia Bảo, lớp 9, Q.1 · Đã tải 6 ngày trước',
    'doc': '5 Phương Pháp Học Tập Khoa Học Nhất Cho Học Sinh',
    'cta': '📥 GỬI TÀI LIỆU VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-phuong-phap-teen', 'funnel': 'squeeze-phuong-phap-teen', 'level': 'thcs',
    'mockup': 'mockup-phuong-phap-teen.png',
  },
  {
    'slug': 'so-sanh-truong-thcs',
    'title': 'So Sánh 4 Loại Trường THCS 2026 — Công Lập, Tư Thục, Song Ngữ, Quốc Tế | Trường Việt Anh',
    'meta': 'Bảng so sánh 4 loại trường THCS theo 10 tiêu chí thực tế.',
    'fomo': '🔥 2,445 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Chọn sai loại trường THCS —',
    'h1em': '4 năm con học không phát triển được',
    'sub': '4 loại trường, 10 tiêu chí thực tế — <strong>chọn đúng từ đầu, không hối hận sau 4 năm tốn tiền</strong>',
    'bullets': [
      'So sánh chất lượng, môi trường, chi phí — <strong>không bị choáng ngợp, ra quyết định tự tin</strong>',
      'Phù hợp tính cách con nào — <strong>không chọn theo đám đông, chọn đúng cho con mình</strong>',
      'Tránh sai lầm chi phí — <strong>không chọn xong mới phát hiện không đủ tài chính theo</strong>',
    ],
    'testimonial': '"Bảng so sánh giúp tôi nhìn rõ được điểm mạnh yếu từng loại trường. Quyết định tự tin hơn hẳn!"',
    'testimonial_name': '— Chị Hồng Nhung, Bình Dương · Đã tải 4 ngày trước',
    'doc': 'Bảng So Sánh 4 Loại Trường THCS 2026',
    'cta': '📥 GỬI BẢNG SO SÁNH VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-so-sanh-thcs', 'funnel': 'squeeze-so-sanh-thcs', 'level': 'thcs',
    'mockup': 'mockup-so-sanh-truong-thcs.png',
  },
  {
    'slug': 'cam-nang-chon-thpt',
    'title': 'Cẩm Nang Chọn Trường THPT 2026 — 15 Tiêu Chí | Trường Việt Anh',
    'meta': 'Cẩm nang chọn trường THPT 2026 với 15 tiêu chí quan trọng.',
    'fomo': '🔥 1,987 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Chọn trường THPT theo cảm tính —',
    'h1em': '3 năm con học không phát huy được tiềm năng',
    'sub': '15 tiêu chí quan trọng nhất — <strong>chọn đúng trường trong 1 buổi, không phải mất tháng trời đắn đo</strong>',
    'bullets': [
      'Tỉ lệ đậu ĐH thực tế — <strong>không bị báo cáo đẹp che mắt, biết số liệu thật</strong>',
      'Checklist 15 tiêu chí khi tham quan — <strong>hỏi đúng câu, không bị ấn tượng vì cơ sở vật chất đẹp</strong>',
      'Phù hợp định hướng con — <strong>không chọn trường giỏi chung mà chọn đúng trường cho con mình</strong>',
    ],
    'testimonial': '"Cẩm nang này giúp tôi đặt đúng câu hỏi khi đi tham quan. Chọn được trường ưng ý trong 2 tuần!"',
    'testimonial_name': '— Chị Kim Loan, Q.Bình Tân · Đã tải 1 tuần trước',
    'doc': 'Cẩm Nang Chọn Trường THPT 2026 — 15 Tiêu Chí',
    'cta': '📥 GỬI CẨM NANG VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-cam-nang-thpt', 'funnel': 'squeeze-cam-nang-thpt', 'level': 'thpt',
    'mockup': 'mockup-cam-nang-chon-thpt.png',
  },
  {
    'slug': 'chuan-bi-du-hoc-lop10',
    'title': 'Chuẩn Bị Du Học Từ Lớp 10 — Lộ Trình 3 Năm | Trường Việt Anh',
    'meta': 'Lộ trình chuẩn bị du học từ lớp 10 — 3 năm hoàn chỉnh.',
    'fomo': '🔥 987 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Muốn con du học mà không biết bắt đầu từ đâu —',
    'h1em': 'Lỡ cơ hội học bổng vì chuẩn bị quá muộn',
    'sub': 'Lộ trình 3 năm từ lớp 10 — <strong>biết từng bước cần làm, không bỏ lỡ deadline học bổng và visa</strong>',
    'bullets': [
      'Kế hoạch từng học kỳ — <strong>không lo lạc hướng, luôn biết bước tiếp theo là gì</strong>',
      'So sánh chi phí 5 nước — <strong>chọn đúng nước phù hợp tài chính, không vỡ kế hoạch giữa chừng</strong>',
      'Timeline học bổng và visa — <strong>không bỏ lỡ cơ hội vì không biết deadline</strong>',
    ],
    'testimonial': '"Lộ trình này giúp tôi và con có kế hoạch rõ ràng. Con vừa nhận học bổng 50% tại Úc!"',
    'testimonial_name': '— Chị Thanh Mai, Q.9 · Đã tải 3 tuần trước',
    'doc': 'Lộ Trình Du Học Từ Lớp 10 — 3 Năm Hoàn Chỉnh',
    'cta': '📥 GỬI LỘ TRÌNH VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-du-hoc-lop10', 'funnel': 'squeeze-du-hoc-lop10', 'level': 'thpt',
    'mockup': 'mockup-chuan-bi-du-hoc-lop10.png',
  },
  {
    'slug': 'oxford-cambridge-ib',
    'title': 'Oxford vs Cambridge vs IB — Chọn Chương Trình Nào Cho Con? | Trường Việt Anh',
    'meta': 'Phân tích chuyên sâu Oxford, Cambridge và IB. Bảng so sánh 10 tiêu chí.',
    'fomo': '🔥 892 phụ huynh đã nhận — Tặng miễn phí có giới hạn',
    'h1': 'Oxford, Cambridge hay IB —',
    'h1em': 'Chọn sai chương trình, con đi sai hướng cả đời',
    'sub': '3 chương trình, 10 tiêu chí so sánh — <strong>chọn đúng trong 1 buổi, không mất tháng trời nghiên cứu</strong>',
    'bullets': [
      'Điểm khác biệt cốt lõi — <strong>hiểu rõ từng chương trình, không bị tên trường đánh lừa</strong>',
      'Phù hợp định hướng nào — <strong>chọn đúng cho con, không chọn vì trường khác chọn</strong>',
      'Bảng so sánh song song — <strong>ra quyết định tự tin trong 5 phút, không còn phân vân</strong>',
    ],
    'testimonial': '"Tài liệu này giải thích rõ hơn cả buổi tư vấn mà tôi phải trả phí. Rất xứng đáng!"',
    'testimonial_name': '— Anh Đức Khải, Q.2 · Đã tải 5 ngày trước',
    'doc': 'So Sánh Oxford / Cambridge / IB — 10 Tiêu Chí',
    'cta': '📥 GỬI TÀI LIỆU SO SÁNH VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-oxford-cambridge-ib', 'funnel': 'squeeze-oxford-cambridge-ib', 'level': 'thpt',
    'mockup': 'mockup-oxford-cambridge-ib.png',
  },
  {
    'slug': 'conversation-cards-song-ngu',
    'title': '50 Conversation Cards Song Ngữ — Luyện Tiếng Anh Cùng Con | Trường Việt Anh',
    'meta': '50 thẻ hội thoại Việt–Anh song ngữ miễn phí. In ra, luyện tiếng Anh cùng con!',
    'fomo': '🔥 4,102 phụ huynh đã nhận — Bộ thẻ in sẵn, miễn phí',
    'h1': 'Cho con học tiếng Anh mãi mà không nói được —',
    'h1em': 'Vì thiếu luyện hội thoại thực tế mỗi ngày',
    'sub': '50 thẻ in sẵn song ngữ Việt–Anh — <strong>chơi cùng con 10 phút mỗi tối, tiếng Anh tự nhiên như thở</strong>',
    'bullets': [
      'Con tự nói tiếng Anh — <strong>không cần ép, không cần gia sư thêm, chỉ chơi cùng thẻ</strong>',
      '10 chủ đề thực tế — <strong>từ vựng dùng được ngay, không học rồi quên</strong>',
      '5 trò chơi ngôn ngữ — <strong>con thích chơi hơn xem điện thoại, tự xin chơi mỗi tối</strong>',
    ],
    'testimonial': '"Con tôi xin chơi thẻ mỗi tối. Tiếng Anh cải thiện rõ rệt chỉ sau 3 tuần!"',
    'testimonial_name': '— Chị Diễm Quỳnh, Q.Tân Bình · Đã tải 1 tuần trước',
    'doc': '50 Conversation Cards Song Ngữ Việt–Anh',
    'cta': '📥 GỬI BỘ THẺ VÀO EMAIL CỦA TÔI →',
    'source': 'squeeze-conversation-cards', 'funnel': 'squeeze-conversation-cards', 'level': 'tieu-hoc',
    'mockup': 'mockup-conversation-cards.png',
  },
  {
    'slug': '50-truong-dh-xet-ielts',
    'title': 'Danh Sách 50 Trường ĐH Xét IELTS 2026 — Tải Miễn Phí | Trường Việt Anh',
    'meta': 'Danh sách 50 trường Đại học Việt Nam xét tuyển bằng IELTS 2026.',
    'fomo': '🔥 3,150 học sinh đã nhận — Danh sách 2026 cập nhật mới nhất',
    'h1': 'Có IELTS mà không biết trường nào xét —',
    'h1em': 'Bỏ phí lợi thế lớn nhất khi vào Đại học',
    'sub': '50 trường ĐH xét IELTS 2026 — <strong>biết điểm chuẩn từng trường, tối đa hoá cơ hội đậu ngay lần đầu</strong>',
    'bullets': [
      'Điểm IELTS yêu cầu từng trường — <strong>biết mình đủ điều kiện nộp chỗ nào, không đoán mò</strong>',
      'Cách quy đổi điểm tối ưu — <strong>cùng band IELTS nhưng quy đổi đúng cách, điểm cộng nhiều hơn</strong>',
      'Bí quyết hồ sơ xét tuyển — <strong>tránh lỗi khiến IELTS cao vẫn trượt vì thiếu một thứ nhỏ</strong>',
    ],
    'testimonial': '"Nhờ danh sách này tôi mới biết thêm 12 trường có thể nộp. Đậu được trường top mà tưởng không đủ điểm!"',
    'testimonial_name': '— Em Anh Thư, lớp 12, Q.Bình Thạnh · Đã tải 3 ngày trước',
    'doc': 'Danh Sách 50 Trường ĐH Xét IELTS 2026',
    'cta': '📥 GỬI DANH SÁCH VÀO EMAIL CỦA TÔI →',
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
  background:#fff;border-bottom:1px solid rgba(0,0,0,.09);
  padding:0 28px;height:64px;flex-shrink:0;
  display:flex;align-items:center;justify-content:space-between;
  position:relative;
}}
.hdr-logo{{height:54px;display:block;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}}
.hdr-right{{display:flex;align-items:center;gap:8px}}
.btn-ph{{display:flex;align-items:center;gap:5px;background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.12);color:#0d1b3e;padding:5px 12px;border-radius:7px;font-size:12px;font-weight:600;text-decoration:none}}
.btn-zl{{background:#0068FF;color:#fff;padding:5px 13px;border-radius:7px;font-size:12px;font-weight:700;text-decoration:none}}

/* ── HERO: 2-COL GRID ── */
.hero{{
  flex:1;min-height:0;
  display:grid;grid-template-columns:1.15fr 0.85fr;
  max-width:1280px;width:100%;margin:0 auto;
  padding:20px 44px 16px;gap:44px;
}}

/* ── LEFT COLUMN ── */
.col-left{{display:flex;flex-direction:column;justify-content:space-between;gap:12px}}

/* ── RIGHT COLUMN ── */
.col-right{{display:flex;flex-direction:column;gap:10px}}

/* ── HEADLINE BLOCK ── */
.fomo{{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(239,68,68,.13);border:1px solid rgba(239,68,68,.38);
  color:#ff8080;padding:4px 12px;border-radius:20px;
  font-size:11px;font-weight:700;letter-spacing:.4px;margin-bottom:10px;
}}
.h1{{
  font-family:'Montserrat',sans-serif;
  font-size:clamp(1.9rem,3vw,2.95rem);
  font-weight:900;line-height:1.1;color:#fff;margin-bottom:11px;
}}
.h1 em{{color:#f0c040;font-style:normal;display:block}}
.sub{{
  font-size:15px;color:rgba(255,255,255,.82);line-height:1.5;font-weight:500;
  border-left:3px solid #d4a843;padding-left:12px;
}}

/* ── BULLETS ── */
.bullets{{list-style:none;display:flex;flex-direction:column;gap:9px}}
.bullets li{{display:flex;align-items:flex-start;gap:9px;font-size:13.5px;color:rgba(255,255,255,.86);line-height:1.4}}
.bico{{width:20px;height:20px;min-width:20px;border-radius:50%;background:rgba(240,192,64,.15);border:1.5px solid rgba(240,192,64,.5);display:flex;align-items:center;justify-content:center;margin-top:1px;flex-shrink:0}}
.bico svg{{width:10px;height:10px;stroke:#f0c040;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}}

/* ── TESTIMONIAL ── */
.testimonial{{background:rgba(255,255,255,.05);border-left:3px solid #f0c040;border-radius:0 8px 8px 0;padding:8px 12px;font-size:12.5px;color:rgba(255,255,255,.7);line-height:1.5;font-style:italic}}
.testimonial strong{{color:#f0c040;font-style:normal;font-size:11px;display:block;margin-top:3px}}

/* ── FORM CARD ── */
.card{{background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.55);flex-shrink:0}}
.card-top{{background:linear-gradient(135deg,#0d1b3e,#162550);padding:10px 16px;text-align:center;border-bottom:2.5px solid #d4a843}}
.card-urgency{{color:#f0c040;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;margin-bottom:2px}}
.card-title{{color:#fff;font-family:'Montserrat',sans-serif;font-weight:800;font-size:.83rem;line-height:1.3}}
.card-body{{padding:14px 16px 12px}}
.form-label{{display:block;font-size:10px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px}}
.form-input{{
  width:100%;padding:13px 14px;
  border:2.5px solid #e5e7eb;border-radius:10px;
  font-size:15px;outline:none;transition:.2s;
  font-family:inherit;color:#111;margin-bottom:10px;
}}
.form-input:focus{{border-color:#d4a843;box-shadow:0 0 0 3px rgba(212,168,67,.15)}}
.form-input.error{{border-color:#ef4444;animation:shake .3s ease}}
@keyframes shake{{0%,100%{{transform:translateX(0)}}25%{{transform:translateX(-6px)}}75%{{transform:translateX(6px)}}}}

/* ★ MEGA CTA ★ */
.btn-cta{{
  width:100%;padding:16px 12px;
  background:linear-gradient(135deg,#d4a843 0%,#f5cc42 60%,#f0c040 100%);
  color:#0d1b3e;font-family:'Montserrat',sans-serif;
  font-weight:900;font-size:15px;border:none;border-radius:11px;
  cursor:pointer;text-transform:uppercase;letter-spacing:.3px;
  box-shadow:0 6px 26px rgba(212,168,67,.65);
  transition:transform .15s,box-shadow .15s;
  position:relative;overflow:hidden;line-height:1.25;
}}
.btn-cta::after{{content:'';position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.18),transparent);border-radius:11px}}
.btn-cta:hover{{transform:translateY(-2px);box-shadow:0 10px 32px rgba(212,168,67,.75)}}
.btn-cta:active{{transform:translateY(0)}}
.urgency-row{{display:flex;align-items:center;justify-content:space-between;margin-top:7px;gap:4px}}
.micro{{font-size:10px;color:#aaa}}
.micro-hot{{font-size:10px;color:#e09a30;font-weight:700}}

/* STEP BAR */
.step-bar{{display:flex;align-items:center;gap:8px;margin-bottom:10px;justify-content:center}}
.step-dot{{width:22px;height:22px;border-radius:50%;background:#e5e7eb;color:#999;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:.3s;flex-shrink:0}}
.step-dot.active{{background:#d4a843;color:#0d1b3e}}
.step-dot.done{{background:#22c55e;color:#fff}}
.step-line{{flex:1;height:2px;background:#e5e7eb;max-width:50px}}
.step-label{{font-size:10px;color:#aaa;font-weight:600}}

/* SUCCESS */
.success-box{{display:none;padding:20px;text-align:center}}
.success-box .s-ico{{font-size:2rem;margin-bottom:6px}}
.success-box h3{{font-family:'Montserrat',sans-serif;color:#0d1b3e;font-size:.9rem;margin-bottom:4px}}
.success-box p{{font-size:12px;color:#666;line-height:1.5}}

/* ── MOCKUP fills remaining height ── */
.mockup-wrap{{flex:1;min-height:0;display:flex;align-items:center;justify-content:center}}
.mockup-wrap img{{max-height:100%;max-width:100%;object-fit:contain;filter:drop-shadow(0 10px 32px rgba(0,0,0,.55));display:block}}

/* ── MOBILE ── */
@media(max-width:900px){{
  html,body{{overflow-x:hidden;overflow-y:auto;height:auto}}
  .hero{{display:flex;flex-direction:column;padding:14px 16px 28px;gap:14px;flex:unset}}
  .col-left,.col-right{{display:contents}}
  .item-headline{{order:1}}
  .item-form    {{order:2}}
  .mockup-wrap  {{order:3;flex:unset;min-height:0}}
  .mockup-wrap img{{max-height:180px}}
  .item-bullets {{order:4}}
  .item-social  {{order:5}}
  .h1{{font-size:1.55rem}}
  .sub{{font-size:13.5px}}
  .hdr{{height:54px;padding:0 16px}}
  .hdr-logo{{height:44px}}
  .btn-cta{{font-size:14.5px;padding:15px 10px}}
}}
@media(max-width:480px){{
  .h1{{font-size:1.35rem}}
  .btn-ph span{{display:none}}
  .btn-cta{{font-size:13.5px}}
}}
</style>
</head>
<body>

<header class="hdr">
  <a href="https://truongvietanh.com">
    <img src="/logo-th-thcs-thpt.png" alt="Trường Việt Anh" class="hdr-logo" />
  </a>
  <div class="hdr-right">
    <a href="tel:0916961409" class="btn-ph">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.69 3.41 2 2 0 0 1 3.65 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
      <span>0916 961 409</span>
    </a>
    <a href="https://zalo.me/0916961409" class="btn-zl">💬 Zalo</a>
  </div>
</header>

<section class="hero">

  <!-- LEFT COLUMN -->
  <div class="col-left">

    <div class="item-headline">
      <div class="fomo">{fomo}</div>
      <h1 class="h1">{h1}<em>{h1em}</em></h1>
      <p class="sub">{sub}</p>
    </div>

    <div class="item-bullets">
      <ul class="bullets">
{bullets_html}
      </ul>
    </div>

    <div class="item-social">
      <div class="testimonial">
        {testimonial}
        <strong>{testimonial_name}</strong>
      </div>
    </div>

  </div>

  <!-- RIGHT COLUMN -->
  <div class="col-right">

    <div class="item-form">
      <div class="card" id="mainCard">
        <div class="card-top">
          <div class="card-urgency">⏰ Miễn phí 100% · Nhận ngay hôm nay</div>
          <div class="card-title">{doc}</div>
        </div>
        <div class="card-body" id="formArea">
          <!-- STEP BAR -->
          <div class="step-bar">
            <div class="step-dot active" id="dot1">1</div>
            <div class="step-line"></div>
            <div class="step-dot" id="dot2">2</div>
            <span class="step-label" id="stepLabel">Email</span>
          </div>
          <!-- STEP 1: EMAIL -->
          <div id="step1">
            <label class="form-label" for="sq-email">Email của bạn</label>
            <input class="form-input" type="email" id="sq-email"
                   placeholder="ten@gmail.com" autocomplete="email" />
            <button class="btn-cta" onclick="sqNext()">TIẾP THEO →</button>
            <div class="urgency-row">
              <span class="micro">🔒 Không spam · Miễn phí hoàn toàn</span>
            </div>
          </div>
          <!-- STEP 2: HỌ TÊN + SĐT -->
          <div id="step2" style="display:none">
            <label class="form-label" for="sq-name">Họ và tên</label>
            <input class="form-input" type="text" id="sq-name"
                   placeholder="Nguyễn Văn A" autocomplete="name" />
            <label class="form-label" for="sq-phone">Số điện thoại</label>
            <input class="form-input" type="tel" id="sq-phone"
                   placeholder="0916 961 409" autocomplete="tel" />
            <button class="btn-cta" onclick="sqSubmit()">{cta}</button>
            <div class="urgency-row">
              <span class="micro"><span onclick="sqBack()" style="cursor:pointer;color:#bbb">← Quay lại</span> · 🔒 Miễn phí</span>
            </div>
          </div>
        </div>
        <div class="success-box" id="sqSuccess">
          <div class="s-ico">🎉</div>
          <h3>Đã gửi thành công!</h3>
          <p>Kiểm tra email ngay — tài liệu gửi trong vài phút.<br><strong>Nhớ kiểm tra Spam / Promotions</strong></p>
        </div>
      </div>
    </div>

    <div class="mockup-wrap">
      <img src="/{mockup}" alt="{doc}"
           onerror="this.parentElement.style.display=\'none\'" />
    </div>

  </div>

</section>

<script>
(function(){{
  var SRC = '{source}';
  var FC  = '{funnel}';
  var SL  = '{level}';

  if (localStorage.getItem('sq_' + SRC)) {{
    document.getElementById('formArea').style.display = 'none';
    document.getElementById('sqSuccess').style.display = 'block';
  }}

  window.sqNext = function() {{
    var el = document.getElementById('sq-email');
    var email = el.value.trim();
    if (!email || email.indexOf('@') < 1) {{
      el.classList.add('error'); el.focus(); return;
    }}
    el.classList.remove('error');
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    document.getElementById('dot1').classList.remove('active');
    document.getElementById('dot1').classList.add('done');
    document.getElementById('dot2').classList.add('active');
    document.getElementById('stepLabel').textContent = 'Họ tên & SĐT';
    document.getElementById('sq-name').focus();
  }};

  window.sqBack = function() {{
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    document.getElementById('dot2').classList.remove('active');
    document.getElementById('dot1').classList.remove('done');
    document.getElementById('dot1').classList.add('active');
    document.getElementById('stepLabel').textContent = 'Email';
  }};

  window.sqSubmit = function() {{
    var nameEl  = document.getElementById('sq-name');
    var phoneEl = document.getElementById('sq-phone');
    var name  = nameEl.value.trim();
    var phone = phoneEl.value.trim();
    if (!name) {{ nameEl.classList.add('error'); nameEl.focus(); return; }}
    nameEl.classList.remove('error');
    if (!phone || phone.replace(/[^0-9]/g,'').length < 9) {{
      phoneEl.classList.add('error'); phoneEl.focus(); return;
    }}
    phoneEl.classList.remove('error');
    var email = document.getElementById('sq-email').value.trim();
    localStorage.setItem('sq_' + SRC, '1');
    document.getElementById('formArea').style.display = 'none';
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
    for item in items[:3]:
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
        fomo=p['fomo'], h1=p['h1'], h1em=p['h1em'], sub=p['sub'],
        bullets_html=bullets_html(p['bullets']),
        testimonial=p['testimonial'], testimonial_name=p['testimonial_name'],
        doc=p['doc'], cta=p['cta'],
        source=p['source'], funnel=p['funnel'], level=p['level'],
        mockup=p['mockup'],
    )
    path = os.path.join(BASE, p['slug'] + '.html')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(html)
    count += 1
    print(f"OK: {p['slug']}")

print(f"\n✅ Generated {count} pages, skipped {skipped}")
