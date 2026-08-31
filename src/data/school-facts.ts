// =====================================================================
// SỐ LIỆU CHUẨN TOÀN SITE — Trường Việt Anh
// Một nguồn sự thật duy nhất. Sửa ở đây, dùng nhất quán mọi nơi.
// Chuẩn hoá site-wide 24/06/2026 (PR #147). Đừng hard-code lại số ở trang khác.
// =====================================================================

export const schoolFacts = {
  // Lịch sử
  foundedYear: 2011,
  yearsRunning: 15, // thành lập 2011 → 15 năm K-12

  // Quy mô
  campuses: 8, // TP.HCM (3) · Tây Ninh–Cần Giuộc (3) · An Giang–Rạch Giá (2)
  studentsTotal: '3.000+', // tổng học sinh/gia đình đã đồng hành (mọi khẳng định TỔNG)
  currentEnrollment: '1.000+', // học sinh đang học mỗi năm (metric khác với tổng)

  // Đầu ra học thuật
  ielts: '6.0–8.0', // dải đầu ra THPT, trung bình 6.5
  ieltsFloor: '6.0', // sàn cam kết
  collegeRate: '99%', // tỷ lệ vào được đại học theo nguyện vọng
  universitiesCount: '50+', // số trường ĐH trong & ngoài nước tiếp nhận
  awards: '200+', // giải thưởng cấp thành phố & quốc tế

  // Uy tín xã hội
  rating: '4.9', // điểm đánh giá trung bình /5
  reviewCount: '300+', // số lượt đánh giá
} as const;

// =====================================================================
// GIỜ ĐÓN KHÁCH & THAM QUAN TRƯỜNG — anh Dương chốt 31/08/2026
// Thứ 2 – Thứ 7: 07:00–19:00. Chủ Nhật: ngoài giờ, nhưng tham quan được nếu hẹn trước.
// Dùng openingHours cho MỌI schema LocalBusiness/EducationalOrganization.
// Chủ Nhật CỐ TÌNH không nằm trong openingHours: chỉ phục vụ khi có hẹn,
// không phải giờ mở cửa thường trực — khai báo sai sẽ sai thông tin trên Google.
// =====================================================================
export const openingHours = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '07:00',
  closes: '19:00',
  // Câu mô tả chuẩn, dùng lại nguyên văn ở phần nội dung hiển thị cho phụ huynh.
  display: 'Thứ 2 – Thứ 7: 07:00 – 19:00',
  displayFull: 'Thứ 2 – Thứ 7: 07:00 – 19:00. Chủ Nhật: ngoài giờ làm việc, vẫn nhận tham quan nếu hẹn trước.',
  sundayNote: 'Chủ Nhật ngoài giờ làm việc — phụ huynh hẹn trước qua Hotline hoặc Zalo OA vẫn tham quan được.',
} as const;

export const openingHoursSpecification = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: [...openingHours.days],
  opens: openingHours.opens,
  closes: openingHours.closes,
};

// Mã xác minh Google Search Console.
// TODO: thay bằng mã thật từ Search Console (đang để placeholder).
export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder';
