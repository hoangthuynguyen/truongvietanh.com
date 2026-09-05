import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';

// Bài blog văn mẫu (noindex, chờ viết lại) — loại khỏi sitemap
const NOINDEX_BLOG = new Set(
  JSON.parse(readFileSync(new URL('./src/data/blog-noindex-slugs.json', import.meta.url), 'utf8')),
);
// Bài trùng lặp → 301 về bài chính
const BLOG_REDIRECTS = JSON.parse(
  readFileSync(new URL('./src/data/blog-redirects.json', import.meta.url), 'utf8'),
);

export default defineConfig({
  site: 'https://truongvietanh.com',
  output: 'static',
  // Chỉ khai báo dạng KHÔNG trailing slash — khai cả '/x' lẫn '/x/' tạo ra
  // 2 route trùng nhau (warning "route collision", sẽ thành hard error ở
  // Astro bản sau). Static host tự resolve '/x/' về cùng file /x/index.html.
  redirects: {
    '/squeeze/checklist-mam-non':            '/checklist-mam-non',
    '/squeeze/ebook-9-linh-vuc-mam-non':     '/ebook-9-linh-vuc-mam-non',
    '/squeeze/giai-doan-vang-ngon-ngu':      '/giai-doan-vang-ngon-ngu',
    '/squeeze/quiz-phuong-phap-giao-duc':    '/quiz-phuong-phap-giao-duc',
    '/squeeze/lo-trinh-tieng-anh-lop1-5':    '/lo-trinh-tieng-anh-lop1-5',
    '/squeeze/so-sanh-chi-phi-hoc':          '/so-sanh-chi-phi-hoc',
    '/squeeze/huong-dan-dang-ky-lop1':       '/huong-dan-dang-ky-lop1',
    '/squeeze/reading-challenge-30-ngay':    '/reading-challenge-30-ngay',
    '/squeeze/checklist-10-ky-nang-lop1':    '/checklist-10-ky-nang-lop1',
    '/squeeze/conversation-cards-song-ngu':  '/conversation-cards-song-ngu',
    '/squeeze/chuyen-truong-lop6':           '/chuyen-truong-lop6',
    '/squeeze/lo-trinh-ielts-thcs':          '/lo-trinh-ielts-thcs',
    '/squeeze/phuong-phap-hoc-teen':         '/phuong-phap-hoc-teen',
    '/squeeze/so-sanh-truong-thcs':          '/so-sanh-truong-thcs',
    '/squeeze/cam-nang-chon-thpt':           '/cam-nang-chon-thpt',
    '/squeeze/chuan-bi-du-hoc-lop10':        '/chuan-bi-du-hoc-lop10',
    '/squeeze/oxford-cambridge-ib':          '/oxford-cambridge-ib',
    '/squeeze/50-truong-dh-xet-ielts':       '/50-truong-dh-xet-ielts',
    '/tuyen-sinh/giai-ma-tiem-nang':         '/giai-ma-tiem-nang/',
    '/thanh-tich':                           '/thanh-tich-hoc-tap',

    // Cơ sở Bình Tân KHÔNG có Mầm Non (chỉ Tiểu học – THCS – THPT). 4 landing page
    // cũ rao "tuyển sinh Mầm Non tại Bình Tân" là sai sự thật, đã xoá 02/09/2026.
    // Giữ 301 để quảng cáo/link cũ không rơi vào 404.
    // Trẻ độ tuổi mầm non tại Bình Tân học: Tiền Tiểu học, Toán SAM, Tiếng Anh Trẻ Em.
    '/mam-non-binh-tan':                     '/tuyen-sinh-binh-tan',
    '/tuyen-sinh-mam-non-binh-tan':          '/tuyen-sinh-binh-tan',
    '/tuyen-sinh-mam-non-tieu-hoc-binh-tan': '/tuyen-sinh-tieu-hoc-binh-tan',
    '/mam-non-binh-tan-cam-on':              '/cam-on',

    // Link chết trong nội dung CMS (bài blog, trang tin-tuc) — redirect về
    // trang tương đương cho tới khi sửa được nội dung trong Directus.
    '/checklist-thcs':                       '/chon-truong-thcs',
    '/birmingham-city-hcm':                  '/tuyen-sinh/lop-10',
    '/blog/sgk-thong-nhat-2026':             '/blog/7-dieu-phu-huynh-can-biet-sgk-thong-nhat-2026',

    // Bài blog trùng lặp → 301 về bài chính (danh sách: src/data/blog-redirects.json)
    ...Object.fromEntries(
      Object.entries(BLOG_REDIRECTS).map(([slug, target]) => ['/blog/' + slug, target]),
    ),
  },
  integrations: [
    sitemap({
      // Trang trụ vĩnh viễn (văn bản chính sách) ưu tiên cao hơn trang thường.
      // @astrojs/sitemap chỉ phát <priority>/<lastmod> khi serialize trả về các khoá đó.
      serialize: (item) => {
        if (/\/chinh-sach-ai\/?$/.test(item.url)) {
          return { ...item, priority: 0.9, changefreq: 'monthly', lastmod: '2026-08-28' };
        }
        return item;
      },
      filter: (page) => {
        // Landing page quảng cáo đặt noindex — không đưa vào sitemap
        if (page.includes('/mam-non-go-vap/hoc-phi')) return false;
        // /ketnoi là trang tiện ích quét QR (đích của 35 QR lớp), noindex — không vào sitemap
        if (/\/ketnoi\/?$/.test(page)) return false;
        // Bài blog văn mẫu (noindex) không đưa vào sitemap
        const blogSlug = page.match(/\/blog\/([^/]+)\/?$/);
        if (blogSlug && NOINDEX_BLOG.has(blogSlug[1])) return false;
        return (
          !page.includes('/mau-template/') &&
          !page.includes('/mau/') &&
          !page.includes('/samples/') &&
          !page.includes('/mau-cms-') &&
          !page.includes('/admin') &&
          !page.includes('/cam-on/')
        );
      },
    }),
  ],
  image: {
    domains: ['truongvietanh.com', 'media.truongvietanh.com', 'images.unsplash.com'],
  },
  vite: {
    server: {
      hmr: { timeout: 120000 },
    },
  },
});
