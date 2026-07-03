// Blog category definitions for Trường Việt Anh
// Used by: blog/[slug].astro, blog/index.astro, blog/danh-muc/[category].astro

export interface CategoryInfo {
  slug: string;
  label: string;
  icon: string;
  description: string;
}

// PHẢI là array — các trang blog dùng .slice(), .map(), .reduce(), .filter()
// Phần tử đầu (index 0) = "tất cả" — bị bỏ qua bởi CATEGORIES.slice(1)
export const CATEGORIES: CategoryInfo[] = [
  { slug: 'tat-ca',       label: 'Tất cả',          icon: '📋', description: 'Tất cả bài viết từ Trường Việt Anh' },
  { slug: 'giao-duc',     label: 'Giáo dục',         icon: '📚', description: 'Phương pháp giáo dục, chương trình học và xu hướng giáo dục hiện đại' },
  { slug: 'tuyen-sinh',   label: 'Tuyển sinh',        icon: '📝', description: 'Thông tin tuyển sinh, hồ sơ nhập học và lịch tuyển sinh các cấp' },
  { slug: 'phu-huynh',    label: 'Phụ huynh',         icon: '👨‍👩‍👧', description: 'Kinh nghiệm nuôi dạy con và đồng hành cùng con trong học tập' },
  { slug: 'hoc-sinh',     label: 'Học sinh',           icon: '🎒', description: 'Câu chuyện học sinh, thành tích và đời sống học đường' },
  { slug: 'tin-tuc',      label: 'Tin tức',            icon: '📰', description: 'Tin tức và thông báo mới nhất từ Trường Việt Anh' },
  { slug: 'hoat-dong',    label: 'Hoạt động',          icon: '🏫', description: 'Sự kiện, hoạt động ngoại khóa và trại hè tại Trường Việt Anh' },
  { slug: 'kinh-nghiem',  label: 'Kinh nghiệm',        icon: '💡', description: 'Bí quyết học tập và kinh nghiệm chọn trường cho con' },
  { slug: 'hoc-bong',     label: 'Học bổng',           icon: '🏆', description: 'Chính sách học bổng và cơ hội tài chính cho học sinh' },
  { slug: 'tieng-anh',    label: 'Tiếng Anh',          icon: '🌍', description: 'Lộ trình tiếng Anh, IELTS và phương pháp học song ngữ' },
  { slug: 'mam-non',      label: 'Mầm non',            icon: '🌱', description: 'Giáo dục mầm non và phát triển trẻ 2-5 tuổi' },
  { slug: 'tieu-hoc',     label: 'Tiểu học',           icon: '✏️', description: 'Chương trình tiểu học và nền tảng học tập lớp 1-5' },
  { slug: 'thcs',         label: 'THCS',               icon: '📐', description: 'Chương trình THCS và định hướng phát triển lớp 6-9' },
  { slug: 'thpt',         label: 'THPT',               icon: '🎓', description: 'Chương trình THPT, luyện thi IELTS và hướng nghiệp lớp 10-12' },
  { slug: 'ky-nang-song', label: 'Kỹ năng sống',       icon: '⭐', description: 'Kỹ năng sống, an toàn và phát triển bản thân cho trẻ' },
  { slug: 'chuyen-cap',   label: 'Chuyển cấp',         icon: '🎒', description: 'Chuẩn bị chuyển cấp vào lớp 1, lớp 6 và lớp 10' },
  { slug: 'hoc-thuat',    label: 'Học thuật',          icon: '📖', description: 'Kiến thức học thuật, ôn thi và phương pháp học hiệu quả' },
  { slug: 'du-hoc',       label: 'Du học',             icon: '✈️', description: 'Chuẩn bị du học, học bổng quốc tế và lộ trình IELTS' },
];

const DEFAULT_CATEGORY: CategoryInfo = { slug: 'tin-tuc', label: 'Tin tức', icon: '📰', description: 'Tin tức và thông báo mới nhất từ Trường Việt Anh' };

// Lookup map để getCategoryBySlug() chạy O(1)
const _categoryMap = new Map<string, CategoryInfo>(
  CATEGORIES.map(c => [c.slug, c])
);

/**
 * Get category info by slug. Returns default if slug not found.
 */
export function getCategoryBySlug(slug: string): CategoryInfo {
  return _categoryMap.get(slug) ?? DEFAULT_CATEGORY;
}

/**
 * Detect category slug from post title and excerpt keywords.
 * Falls back to 'tin-tuc' if no match found.
 */
export function detectCategory(title: string = '', excerpt: string = ''): string {
  const text = `${title} ${excerpt}`.toLowerCase();

  if (/kỹ năng sống|an toàn|đuối nước|tự lập/.test(text))    return 'ky-nang-song';
  if (/chuyển cấp|vào lớp 1|vào lớp 6|vào lớp 10/.test(text)) return 'chuyen-cap';
  if (/du học|study abroad/.test(text))                       return 'du-hoc';
  if (/học bổng/.test(text))                                 return 'hoc-bong';
  if (/tuyển sinh|đăng ký|nhập học|hồ sơ/.test(text))       return 'tuyen-sinh';
  if (/tiếng anh|song ngữ|english/.test(text))              return 'tieng-anh';
  if (/phụ huynh|cha mẹ|ba mẹ/.test(text))                  return 'phu-huynh';
  if (/học sinh|học lực|thành tích/.test(text))             return 'hoc-sinh';
  if (/mầm non/.test(text))                                  return 'mam-non';
  if (/tiểu học/.test(text))                                 return 'tieu-hoc';
  if (/thcs|lớp 6|lớp 7|lớp 8|lớp 9/.test(text))           return 'thcs';
  if (/thpt|lớp 10|lớp 11|lớp 12/.test(text))              return 'thpt';
  if (/hoạt động|sự kiện|event|chương trình/.test(text))    return 'hoat-dong';
  if (/kinh nghiệm|bí quyết|tips|cách/.test(text))          return 'kinh-nghiem';
  if (/giáo dục|phương pháp|chương trình học/.test(text))   return 'giao-duc';

  return 'tin-tuc';
}
