// Blog category definitions for Trường Việt Anh
// Used by: blog/[slug].astro, blog/index.astro, blog/danh-muc/[category].astro

export interface CategoryInfo {
  slug: string;
  label: string;
  icon: string;
}

// PHẢI là array — các trang blog dùng .slice(), .map(), .reduce(), .filter()
// Phần tử đầu (index 0) = "tất cả" — bị bỏ qua bởi CATEGORIES.slice(1)
export const CATEGORIES: CategoryInfo[] = [
  { slug: 'tat-ca',       label: 'Tất cả',          icon: '📋' },
  { slug: 'giao-duc',     label: 'Giáo dục',         icon: '📚' },
  { slug: 'tuyen-sinh',   label: 'Tuyển sinh',        icon: '📝' },
  { slug: 'phu-huynh',    label: 'Phụ huynh',         icon: '👨‍👩‍👧' },
  { slug: 'hoc-sinh',     label: 'Học sinh',           icon: '🎒' },
  { slug: 'tin-tuc',      label: 'Tin tức',            icon: '📰' },
  { slug: 'hoat-dong',    label: 'Hoạt động',          icon: '🏫' },
  { slug: 'kinh-nghiem',  label: 'Kinh nghiệm',        icon: '💡' },
  { slug: 'hoc-bong',     label: 'Học bổng',           icon: '🏆' },
  { slug: 'tieng-anh',    label: 'Tiếng Anh',          icon: '🌍' },
  { slug: 'mam-non',      label: 'Mầm non',            icon: '🌱' },
  { slug: 'tieu-hoc',     label: 'Tiểu học',           icon: '✏️' },
  { slug: 'thcs',         label: 'THCS',               icon: '📐' },
  { slug: 'thpt',         label: 'THPT',               icon: '🎓' },
];

const DEFAULT_CATEGORY: CategoryInfo = { slug: 'tin-tuc', label: 'Tin tức', icon: '📰' };

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
