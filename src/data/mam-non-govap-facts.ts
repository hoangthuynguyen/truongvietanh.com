// =====================================================================
// SỐ LIỆU MẦM NON VIỆT ANH — CƠ SỞ GÒ VẤP
// Một nguồn sự thật duy nhất cho 10 landing page quảng cáo Google Ads.
//
// NGUỒN GỐC (ưu tiên cao nhất):
//   "CHƯƠNG TRÌNH MẦM NON VIỆT ANH" — tài liệu nội bộ, TP.HCM 7/2021, 18 trang.
//   Mọi mô tả về chương trình, phương pháp, đánh giá, khu vực lớp học bên dưới
//   đều lấy từ tài liệu này. Đối chiếu ngày 26/08/2026.
//
// NGUỒN PHỤ (chỉ dùng cho thông tin cơ sở, liên hệ, uy tín — những thứ tài liệu
//   gốc không nói tới): các trang đang live trên truongvietanh.com.
//
// ⚠️ CẢNH BÁO QUAN TRỌNG
//   Chương trình mầm non Việt Anh KHÔNG PHẢI Montessori. Nó dựa trên phương pháp
//   HỌC TẬP CHỦ ĐỘNG (Active learning). Tài liệu gốc có hẳn Bảng 1 so sánh
//   Active learning – Montessori – Truyền thống như BA trường phái khác nhau.
//   Trang /tuyen-sinh/mam-non/chuong-trinh-hoc/ đang live ghi sai là "Montessori"
//   — trang đó cần sửa riêng, đừng lấy làm nguồn.
// =====================================================================

export const mnFacts = {
  // ---------- Cơ sở (nguồn: /co-so/mam-non-go-vap/) ----------
  address: '573 Đường Lê Đức Thọ, Phường An Hội Tây, Quận Gò Vấp, TP.HCM',
  addressShort: '573 Lê Đức Thọ, Gò Vấp',
  wardNote: 'Phường An Hội Tây — phường 16 cũ',
  campusLienCap: '160/72 Phan Huy Ích, Phường An Hội Tây, Gò Vấp',
  mapUrl: 'https://maps.google.com/?q=573+L%C3%AA+%C4%90%E1%BB%A9c+Th%E1%BB%8D,+G%C3%B2+V%E1%BA%A5p,+TP.HCM',

  // ---------- Liên hệ ----------
  hotlineMamNon: '0774 588 988',        // hotline riêng cơ sở mầm non Gò Vấp, trực 24/7
  hotlineChung: '0916 961 409',
  zaloUrl: 'https://zalo.me/1678310120468101523',
  responseTime: '2 giờ',

  // ---------- Quy mô lớp ----------
  // Trang cơ sở ghi "10 - 24 học sinh/lớp (tùy độ tuổi)". Tài liệu gốc không nêu sĩ số.
  classSize: '10–24',
  classSizeLabel: '10–24 bé/lớp tùy độ tuổi',

  // ---------- Độ tuổi & cách xếp lớp ----------
  ageFrom: '13 tháng',
  ageRange: '13 tháng – 6 tuổi',
  // ⚠️ Tài liệu gốc mô tả lớp preschool theo mô hình ĐA ĐỘ TUỔI: bé 3, 4 và 5 tuổi
  //    học chung một lớp. Không chia Mầm/Chồi/Lá theo tuổi như cách gọi truyền thống.
  groupingModel: 'Đa độ tuổi (Multi-age) — bé 3, 4 và 5 tuổi học chung một lớp',
  groupingDetail: 'Đa trình độ (Multi-level) — trong từng môn, cô xếp bé vào nhóm theo khả năng, và đổi nhóm trong năm khi bé tiến bộ',
  groupingForms: ['Hoạt động lớp', 'Hoạt động nhóm', 'Hoạt động đôi', 'Hoạt động cá nhân'],

  // ---------- Thương hiệu ----------
  foundedYear: 2011,
  yearsRunning: 15,
  philosophy: 'Vui vẻ & Thực dụng',
  philosophyLine: 'Một đứa trẻ hạnh phúc sẽ học tốt nhất.',
  coreValues: ['Tôn trọng', 'Trách nhiệm', 'Tài giỏi', 'Chính trực', 'Yêu thương'],
  leaderInMe: 'The Leader in Me — chương trình kỹ năng sống dạy 7 thói quen tốt',

  // ---------- Chương trình (TÀI LIỆU GỐC) ----------
  method: 'Học tập chủ động (Active learning)',
  methodNote: 'Bé tự lên kế hoạch, tự thực hiện và tự chiêm nghiệm; người lớn xác nhận lại kiến thức và mở rộng lên cấp độ tiếp theo',
  curriculumFrame: 'Tiêu chuẩn chương trình khung mầm non Hoa Kỳ',
  // Biến thể để chèn giữa câu — KHÔNG dùng .toLowerCase() vì sẽ phá danh từ riêng
  curriculumFrameMid: 'tiêu chuẩn chương trình khung mầm non Hoa Kỳ',
  noFixedTextbook: 'Bậc mầm non không bị ràng buộc bởi một giáo trình cố định nào',

  // 8 lĩnh vực + lĩnh vực thứ 9 dành cho bé chưa nói tiếng Anh
  learningAreas: [
    'Phương pháp học tập',
    'Sự phát triển cảm xúc và xã hội',
    'Phát triển Thể chất và Sức khoẻ',
    'Ngôn ngữ, Đọc viết và Giao tiếp',
    'Toán học',
    'Nghệ thuật Sáng tạo',
    'Khoa học và Công nghệ',
    'Xã hội học',
  ],
  ninthArea: 'Ngôn ngữ Tiếng Anh — đưa vào khi phù hợp, dành cho bé mà tiếng Anh không phải tiếng mẹ đẻ',

  // Hoạt động cốt lõi mỗi ngày
  pdrName: 'Plan – Do – Review (lập kế hoạch – thực hiện – chiêm nghiệm)',
  pdrSteps: [
    { step: 'Plan', desc: 'Cô và bé ngồi thành vòng tròn, cùng bàn xem hôm nay bé sẽ làm gì và làm thế nào' },
    { step: 'Do', desc: 'Bé bắt tay thực hiện đúng kế hoạch mình vừa đặt ra; bé có thể lên hai hoặc nhiều kế hoạch' },
    { step: 'Review', desc: 'Cuối giờ cả lớp ngồi lại: điều gì làm được, điều gì chưa, khó ở đâu, lần sau sẽ làm khác thế nào' },
  ],
  pdrPurpose: 'Rèn thói quen làm việc có mục đích, có kế hoạch rõ ràng, và luôn nhìn lại để tự rút ra bài học',

  // 6 phương pháp chính yếu
  methods: [
    { name: 'Tích hợp nội dung và ngôn ngữ', en: 'CLIL', desc: 'Toàn bộ thời gian tại lớp tổ chức bằng 100% tiếng Anh, để bé tiếp thu và dùng tiếng Anh như tiếng bản ngữ' },
    { name: 'Tích hợp liên môn', en: 'Thematic-based learning', desc: 'Một chủ đề được học ở nhiều môn: giờ tiếng Anh học từ vựng, giờ khoa học học chức năng, giờ toán học đếm và so sánh, giờ nghệ thuật khám phá hình khối' },
    { name: 'Tư duy phản biện', en: 'Critical thinking', desc: 'Cô không đưa ra quyết định thay bé mà đặt câu hỏi dẫn dắt; bé được dạy về trạng thái hiện tại và trạng thái lý tưởng để tự tìm cách đi từ chỗ này sang chỗ kia' },
    { name: 'Kỷ luật tích cực', en: 'Positive discipline', desc: 'Không thưởng, không phạt. Bé được dạy về hệ quả của hành vi rồi tự đưa ra cam kết' },
    { name: 'Đa độ tuổi', en: 'Multi-age', desc: 'Bé 3, 4 và 5 tuổi học chung, học từ cô và học cả từ nhau' },
    { name: 'Đa trình độ', en: 'Multi-level', desc: 'Trong từng môn, cô xếp nhóm theo khả năng và điều chỉnh nhóm trong năm theo tiến bộ của bé' },
  ],
  englishModel: '100% tiếng Anh trong toàn bộ thời gian tại lớp',
  englishModelMid: '100% tiếng Anh trong toàn bộ thời gian tại lớp',

  // Kỷ luật tích cực — 5 công cụ cụ thể
  disciplineTools: [
    'Chương trình kỹ năng sống The Leader in Me — dạy 7 thói quen tốt, thói quen đầu tiên là sự chủ động',
    'Dạy 5 giá trị và nội quy tương ứng với từng giá trị',
    'Với tình huống trên lớp, cô đặt câu hỏi để bé tự thấy hệ quả và tự cam kết, thay vì bị phạt',
    'Rèn kỹ năng tỉnh thức: có góc yên tĩnh nghe nhạc thiền khi bé mất bình tĩnh; tập yoga, ngồi thiền, ăn thiền',
    'Giữ môi trường an toàn và ổn định: mọi hoạt động từ giờ học tới giờ ăn, đi vệ sinh đều có quy trình rõ ràng, lặp lại mỗi ngày không đổi',
  ],

  // Đánh giá
  assessment: 'COR Advantage',
  assessmentDetail: 'Cô ghi chú khách quan về bé theo thời gian, rồi chấm theo 8 cấp độ từ 0 đến 7 trên 34 yếu tố, cộng 2 yếu tố riêng cho người học tiếng Anh',
  teacherPlanning: 'Cô không soạn một kế hoạch chung cho cả lớp mà lên kế hoạch cho từng bé, vì mỗi bé khác nhau về tính cách và trình độ',

  // ---------- Khu vực trong lớp (tài liệu gốc) ----------
  classAreas: [
    { name: 'Khu vực nhà', desc: 'Bé nhập vai bác sĩ, đầu bếp, nội trợ để khám phá cuộc sống và phát triển kỹ năng xã hội' },
    { name: 'Khu vực hình khối', desc: 'Xây mô hình từ khối hình và phương tiện; rèn giải quyết vấn đề, vận động tinh và thô' },
    { name: 'Khu vực đọc sách', desc: 'Góc yên tĩnh với sách nhiều hình, hình thành thói quen đọc từ nhỏ' },
    { name: 'Khu vực nghệ thuật', desc: 'Đầy đủ dụng cụ và vật liệu để bé tự làm ra tác phẩm của mình' },
    { name: 'Khu vực khoa học', desc: 'Bé làm thí nghiệm, cảm nhận vật liệu, tập phỏng đoán – thực hành – kết luận' },
    { name: 'Khu vực toán học', desc: 'Một trong những khu nhiều giáo cụ nhất; bé chạm và làm việc trực tiếp với giáo cụ trực quan thay vì học số trừu tượng' },
    { name: 'Khu vực cảm giác', desc: 'Kích thích đủ năm giác quan; hiện đã chuyển ra ngoài sân chơi' },
    { name: 'Khu vực vận động', desc: 'Bé chạy nhảy, rèn vận động thô, phối hợp và giải quyết vấn đề' },
    { name: 'Khu vực âm nhạc', desc: 'Bé thể hiện tính cách và sở thích qua âm nhạc và vận động theo nhạc' },
    { name: 'Khu vực máy tính', desc: 'Làm quen kỹ năng máy tính như đánh máy 10 ngón, rèn tính kỷ luật và kiên nhẫn' },
    { name: 'Khu vực viết chữ', desc: 'Rèn kỹ năng viết chuẩn bị vào lớp 1, hoàn thiện vận động tinh và tính tập trung' },
  ],

  // ---------- Cơ sở vật chất trường (tài liệu gốc) ----------
  facilities: [
    'Thư viện ngay trong khuôn viên trường, thiết kế thân thiện, bé tự chọn sách mình thích',
    'Phòng giáo dục thể chất 164m², học vận động thô: chạy, nhảy, bò, trườn, leo, bật',
    'Sân chơi có khu vui chơi, sân cỏ nhân tạo, vườn hoa, hố cát và hồ bơi',
    'Lớp học thiết kế trang nhã, dùng màu sắc tự nhiên, chia thành nhiều khu vực riêng',
  ],
  gymArea: '164m²',

  // ---------- Kết quả (tài liệu gốc) ----------
  outcomes: [
    'Bé hạnh phúc khi đến trường',
    'Bé độc lập, có trách nhiệm và tự tin — sẵn sàng bước vào tiểu học',
    'Bé biết lên kế hoạch cho việc học và cho các hoạt động riêng của mình',
    'Bé dùng tốt kỹ năng giao tiếp, đàm phán và giải quyết vấn đề',
    'Bé đạt kỹ năng và kiến thức ở các lĩnh vực thể chất, xã hội và học thuật',
  ],

  // ---------- An toàn (nguồn: bài /blog/co-so-vat-chat/) ----------
  safety: [
    'Camera 24/7 toàn khu, gồm cả hành lang',
    'Phụ huynh lớp Mầm non được cấp tài khoản xem camera trực tuyến trong giờ học',
    'Khách tới trường phải đăng ký và đeo thẻ, có bảo vệ trực',
    'Phòng y tế trực 8h–17h, kèm bảo hiểm tai nạn học sinh',
    'PCCC kiểm tra định kỳ hàng tháng, sprinkler tự động, diễn tập mỗi học kỳ',
  ],

  // ---------- Dinh dưỡng (nguồn: bài /blog/co-so-vat-chat/) ----------
  nutrition: [
    'Bếp riêng nấu tại trường, không dùng thực phẩm đóng gói công nghiệp',
    'Bếp một chiều, thực đơn do chuyên gia dinh dưỡng thiết kế',
    'Thực đơn xoay vòng theo chu kỳ 4 tuần',
    'Khu ăn riêng cho Mầm non, bàn ghế đúng kích thước trẻ nhỏ',
  ],

  // ---------- Học phí (nguồn: /tuyen-sinh/mam-non/hoc-phi/) ----------
  feeIncludes: [
    'Học phí chương trình học tập chủ động, 100% tiếng Anh trong lớp',
    'Bữa ăn trong ngày (lớp bán trú)',
    'Hoạt động ngoại khoá hàng tuần',
    'Bảo hiểm học sinh',
    'Phòng y tế trong trường',
  ],
  feeExcludes: ['Đồng phục lần đầu', 'Sách vở, học liệu cá nhân', 'Lớp tự chọn (bơi, nhạc riêng)'],
  paymentOptions: [
    'Đóng trọn năm — giảm thêm 5%',
    'Đóng theo 2 học kỳ',
    'Đóng theo tháng, không phụ phí',
    'Trả góp 12 tháng, lãi suất 0%',
    'Vay giáo dục qua ngân hàng đối tác',
    'Hỗ trợ học phí cho gia đình khó khăn (trao đổi riêng)',
  ],
  siblingDiscount: '5% trên cả hai bé, cho gia đình có từ 2 con đang học',
  refundPolicy: [
    'Rời trường trong tháng đầu — hoàn 80%',
    'Rời trong 3 tháng đầu — hoàn 50%',
    'Sau 3 tháng — chuyển phần đã đóng sang quý tiếp theo',
    'Tiền ăn và dịch vụ chưa dùng luôn được hoàn khi báo nghỉ đúng quy định',
  ],

  // ---------- Uy tín ----------
  familiesServed: '1.000+',
  rating: '4.9',
  reviewCount: '300+',
  retention: '98%',

  // ---------- Ô CẦN ĐIỀN ----------
  // Để chuỗi rỗng thì khối tương ứng trên trang TỰ ẨN — không hiện ô trống ra ngoài.
  currentOffer: '',      // ưu đãi mùa đang chạy. Ưu đãi cũ (10–15%, hạn 30/4/2026) ĐÃ HẾT.
  shuttleRoutes: '',     // tuyến xe đưa đón cơ sở Lê Đức Thọ + mức phí.
  tuitionFrom: '',       // nếu muốn in mức học phí "từ ... /tháng" lên trang, điền ở đây.
} as const;

// Các tuyến đường quanh trường — dùng cho trang khu vực (AG 06).
// Đây là mô tả vị trí địa lý, KHÔNG phải cam kết vùng phủ xe đưa đón.
export const nearbyStreets = [
  'Lê Đức Thọ', 'Phan Văn Trị', 'Nguyễn Oanh', 'Quang Trung',
  'Phạm Văn Chiêu', 'Lê Văn Thọ', 'Thống Nhất', 'Cây Trâm',
  'Nguyễn Văn Nghi', 'Phan Huy Ích',
];
