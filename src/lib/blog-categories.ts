// Blog category definitions for Trường Việt Anh
// Used by src/pages/blog/[slug].astro

export interface CategoryInfo {
  label: string;
  icon: string;
}

export const CATEGORIES: Record<string, CategoryInfo> = {
  'giao-duc':       { label: 'Giáo dục',         icon: '📚' },
  'tuyen-sinh':     { label: 'Tuyển sinh',         icon: '📝' },
  'phu-huynh':      { label: 'Phụ huynh',          icon: '👨‍👩‍👧' },
  'hoc-sinh':       { label: 'Học sinh',            icon: '🎒' },
  'tin-tuc':        { label: 'Tin tức',             icon: '📰' },
  'hoat-dong':      { label: 'Hoạt động',           icon: '🏫' },
  'kinh-nghiem':    { label: 'Kinh nghiệm',         icon: '💡' },
  'hoc-bong':       { label: 'Học bổng',            icon: '🏆' },
  'tieng-anh':      { label: 'Tiếng Anh',           icon: '🌍' },
  'mam-non':        { label: 'Mầm non',             icon: '🌱' },
  'tieu-hoc':       { label: 'Tiểu học',            icon: '✏️' },
  'thcs':           { label: 'THCS',                icon: '📐' },
  'thpt':           { label: 'THPT',                icon: '🎓' },
};

const DEFAULT_CATEGORY: CategoryInfo = { label: 'Tin tức', icon: '📰' };

/**
 * Detect category slug from post title and excerpt keywords.
 * Falls back to 'tin-tuc' if no match found.
 */
export function detectCategory(title: string = '', excerpt: string = ''): string {
  const text = `${title} ${excerpt}`.toLowerCase();

  if (/học bổng/.test(text))                                  return 'hoc-bong';
  if (/tuyển sinh|đăng ký|nhập học|hồ sơ/.test(text))        return 'tuyen-sinh';
  if (/tiếng anh|song ngữ|english/.test(text))               return 'tieng-anh';
  if (/phụ huynh|cha mẹ|ba mẹ/.test(text))                   return 'phu-huynh';
  if (/học sinh|học lực|thành tích/.test(text))              return 'hoc-sinh';
  if (/mầm non/.test(text))                                   return 'mam-non';
  if (/tiểu học/.test(text))                                  return 'tieu-hoc';
  if (/thcs|lớp 6|lớp 7|lớp 8|lớp 9/.test(text))            return 'thcs';
  if (/thpt|lớp 10|lớp 11|lớp 12/.test(text))               return 'thpt';
  if (/hoạt động|sự kiện|event|chương trình/.test(text))     return 'hoat-dong';
  if (/kinh nghiệm|bí quyết|tips|cách/.test(text))           return 'kinh-nghiem';
  if (/giáo dục|phương pháp|chương trình học/.test(text))    return 'giao-duc';

  return 'tin-tuc';
}

/**
 * Get category info by slug. Returns default if slug not found.
 */
export function getCategoryBySlug(slug: string): CategoryInfo {
  return CATEGORIES[slug] ?? DEFAULT_CATEGORY;
}
