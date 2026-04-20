/**
 * Blog category definitions — dùng chung cho /blog/, /blog/danh-muc/[category], và [slug].astro
 *
 * Hiện tại category được detect client-side từ title/excerpt vì Directus chưa có field `category`.
 * Khi Directus được update (thêm field `category` vào collection `posts`), thay hàm
 * `detectCategory()` bằng `post.category` trực tiếp.
 */

export const CATEGORIES = [
  {
    slug: 'tat-ca',
    label: 'Tất Cả',
    icon: '📰',
    description: 'Toàn bộ bài viết từ Trường Việt Anh',
    keywords: [] as string[],
    seoTitle: 'Blog Trường Việt Anh — Kiến Thức Nuôi Dạy Con & Giáo Dục',
    seoDesc: 'Hơn 500 bài viết kiến thức: nuôi dạy con, chuyển cấp, IELTS, kỹ năng sống và tin tức giáo dục từ đội ngũ Trường Việt Anh.',
  },
  {
    slug: 'chuyen-cap',
    label: 'Chuyển Cấp',
    icon: '🎒',
    description: 'Chuẩn bị lớp 1, lớp 6, lớp 10 — định hướng chuyển cấp thành công',
    keywords: ['lớp 1', 'lớp 6', 'lớp 10', 'chuyển cấp', 'tiểu học', 'thcs', 'thpt', 'vào lớp', 'nhập học', 'cấp 1', 'cấp 2', 'cấp 3', 'tuyển sinh'],
    seoTitle: 'Chuyển Cấp — Blog Trường Việt Anh',
    seoDesc: 'Hướng dẫn chuẩn bị vào lớp 1, lớp 6, lớp 10: tâm lý chuyển cấp, chương trình học, cách chọn trường. Kinh nghiệm thực tế từ giáo viên Việt Anh.',
  },
  {
    slug: 'hoc-thuat',
    label: 'Học Thuật',
    icon: '📚',
    description: 'IELTS, Toán tư duy, Khoa học, Olympic — nâng tầm học thuật',
    keywords: ['ielts', 'toán', 'khoa học', 'olympic', 'tiếng anh', 'anh văn', 'đọc hiểu', 'ngữ văn', 'vật lý', 'hóa học', 'sinh học', 'stem', 'cambridge', 'ôn thi', 'kiểm tra', 'bài tập'],
    seoTitle: 'Học Thuật — Blog Trường Việt Anh',
    seoDesc: 'Phương pháp học IELTS cho trẻ, luyện Toán tư duy, chuẩn bị Olympic — từ đội ngũ giáo viên chuyên môn cao của Trường Việt Anh.',
  },
  {
    slug: 'ky-nang-song',
    label: 'Kỹ Năng Sống',
    icon: '⭐',
    description: 'Leadership, 7 thói quen, EQ, tự lập — phát triển toàn diện',
    keywords: ['kỹ năng', 'lãnh đạo', 'tự lập', 'tự tin', 'giao tiếp', 'thói quen', 'cảm xúc', 'trách nhiệm', 'sáng tạo', 'tư duy', 'phát triển bản thân', 'leader', 'eq', 'eq iq'],
    seoTitle: 'Kỹ Năng Sống — Blog Trường Việt Anh',
    seoDesc: 'Giúp trẻ phát triển kỹ năng lãnh đạo, giao tiếp, tự lập và tư duy sáng tạo theo chương trình 7 Thói Quen và Leader in Me.',
  },
  {
    slug: 'phu-huynh-va-con',
    label: 'Phụ Huynh & Con',
    icon: '👨‍👩‍👧',
    description: 'Nuôi dạy con, tâm lý trẻ, mối quan hệ cha mẹ — con — thầy cô',
    keywords: ['phụ huynh', 'ba mẹ', 'cha mẹ', 'nuôi dạy', 'tâm lý', 'trẻ em', 'con cái', 'gia đình', 'bé', 'thiếu nhi', 'trẻ nhỏ', 'stress', 'lo lắng'],
    seoTitle: 'Phụ Huynh & Con — Blog Trường Việt Anh',
    seoDesc: 'Kiến thức nuôi dạy con từ chuyên gia: tâm lý trẻ em, xây dựng thói quen tốt, giải quyết mâu thuẫn cha mẹ — con cái và giao tiếp với thầy cô.',
  },
  {
    slug: 'trai-he-ngoai-khoa',
    label: 'Trại Hè & Ngoại Khóa',
    icon: '🏕️',
    description: 'Lion Camp, CLB thể thao, nghệ thuật — trải nghiệm ngoài lớp học',
    keywords: ['trại hè', 'lion camp', 'hè', 'ngoại khóa', 'clb', 'câu lạc bộ', 'thể thao', 'nghệ thuật', 'dã ngoại', 'tham quan', 'sự kiện', 'hoạt động'],
    seoTitle: 'Trại Hè & Ngoại Khóa — Blog Trường Việt Anh',
    seoDesc: 'Cập nhật Lion Camp, CLB thể thao, nghệ thuật và các hoạt động ngoại khóa của Trường Việt Anh — nơi trẻ học qua trải nghiệm thực tế.',
  },
  {
    slug: 'tin-tuc-truong',
    label: 'Tin Tức Trường',
    icon: '🏫',
    description: 'Thành tích, sự kiện, hoạt động mới nhất của Trường Việt Anh',
    keywords: ['tin tức', 'sự kiện', 'thành tích', 'khai giảng', 'tổng kết', 'lễ', 'giải thưởng', 'vinh danh', 'hội thảo', 'workshop', 'trường', 'việt anh'],
    seoTitle: 'Tin Tức Trường — Blog Trường Việt Anh',
    seoDesc: 'Tin tức, sự kiện và thành tích mới nhất của Trường Việt Anh: khai giảng, tổng kết, giải thưởng và các hoạt động nổi bật của thầy trò.',
  },
  {
    slug: 'du-hoc',
    label: 'Du Học',
    icon: '✈️',
    description: 'Profile du học, học bổng, định hướng đại học quốc tế',
    keywords: ['du học', 'đại học', 'học bổng', 'nước ngoài', 'quốc tế', 'anh', 'mỹ', 'úc', 'canada', 'singapore', 'profile', 'sat', 'act', 'ivy league'],
    seoTitle: 'Du Học — Blog Trường Việt Anh',
    seoDesc: 'Định hướng du học từ cấp 3: xây dựng profile, chuẩn bị IELTS/SAT, tìm học bổng và nộp hồ sơ đại học Anh, Mỹ, Úc, Canada từ kinh nghiệm cựu học sinh Việt Anh.',
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

/**
 * Tự động detect danh mục dựa trên title/excerpt của bài viết.
 * Thay bằng `post.category` khi Directus có field này.
 */
export function detectCategory(title: string, excerpt: string | null | undefined): CategorySlug {
  const text = `${title} ${excerpt ?? ''}`.toLowerCase();
  for (const cat of CATEGORIES.slice(1)) {
    if ((cat.keywords as readonly string[]).some(kw => text.includes(kw))) {
      return cat.slug as CategorySlug;
    }
  }
  return 'tin-tuc-truong'; // default fallback
}

/** Lấy thông tin một category theo slug */
export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug) ?? CATEGORIES[0];
}
