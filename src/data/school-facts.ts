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

// Mã xác minh Google Search Console.
// TODO: thay bằng mã thật từ Search Console (đang để placeholder).
export const GOOGLE_SITE_VERIFICATION =
  import.meta.env.PUBLIC_GOOGLE_SITE_VERIFICATION || 'google-site-verification-placeholder';
