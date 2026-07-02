import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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

    // Link chết trong nội dung CMS (bài blog, trang tin-tuc) — redirect về
    // trang tương đương cho tới khi sửa được nội dung trong Directus.
    '/checklist-thcs':                       '/chon-truong-thcs',
    '/birmingham-city-hcm':                  '/tuyen-sinh/lop-10',
    '/blog/sgk-thong-nhat-2026':             '/blog/7-dieu-phu-huynh-can-biet-sgk-thong-nhat-2026',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/mau-template/') &&
        !page.includes('/mau/') &&
        !page.includes('/samples/') &&
        !page.includes('/mau-cms-') &&
        !page.includes('/admin') &&
        !page.includes('/cam-on/'),
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
