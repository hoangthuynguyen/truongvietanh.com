# MASTER PLAN: PHÁT TRIỂN TOÀN BỘ SITE TRUONGVIETANH.COM
## Từ hoc.truongvietanh.com → truongvietanh.com
### Phiên bản: 2.0 | Ngày: 2026-04-12

---

## MỤC LỤC

1. [Audit hiện trạng](#1-audit-hiện-trạng)
2. [Kiến trúc site mới 4 tầng](#2-kiến-trúc-site-mới-4-tầng)
3. [Blog Plan chi tiết — thực hiện ngay](#3-blog-plan-chi-tiết)
4. [Sub-pillar pages cần tạo](#4-sub-pillar-pages-cần-tạo)
5. [Chiến lược Internal Linking](#5-chiến-lược-internal-linking)
6. [Chiến lược External Linking](#6-chiến-lược-external-linking)
7. [Technical SEO & CMS](#7-technical-seo--cms)
8. [Content Production Pipeline](#8-content-production-pipeline)
9. [Roadmap thực hiện](#9-roadmap-thực-hiện)
10. [KPI & đo lường](#10-kpi--đo-lường)

---

## 1. AUDIT HIỆN TRẠNG

### 1.1 Tech Stack

| Layer | Công nghệ | Trạng thái | Ghi chú |
|-------|-----------|------------|---------|
| Frontend | Astro SSG | ✅ Production | Output static, PageSpeed <1s |
| CMS | Directus (Docker, Contabo VPS) | ✅ Production | 8 collections, admin.truongvietanh.com |
| Hosting | Cloudflare Workers/Pages | ✅ Production | Edge deploy toàn cầu |
| Media CDN | Cloudflare R2 | ✅ Production | media.truongvietanh.com |
| Lead API | Cloudflare Worker → GHL + Pancake | ✅ Production | /api/lead endpoint |
| Email | AWS SES Singapore | ✅ Production | reply/news/reach.truongvietanh.com |
| CRM | GoHighLevel | ✅ Production | Pipeline + Zalo integration |
| Analytics | GA4 + GTM | ✅ Cài đặt | UTM tracking on all pages |
| Domain | astro.config → `site: truongvietanh.com` | ✅ Đã config | Sẵn sàng go-live |

### 1.2 Inventory nội dung

| Loại | Số lượng | Trạng thái | Chi tiết |
|------|----------|------------|---------|
| **Tổng trang đã build** | **~1,364** | ✅ | Bao gồm blog + landing + pillar |
| Pillar Pages (Tầng 1) | 15 | ✅ Có route, ⚠️ cần nâng nội dung | Từ Directus `pillar_pages` collection |
| Sub-pillar (Tầng 2) | **0** | ❌ CHƯA CÓ | Cần tạo ~42 trang |
| Blog posts trong Directus | 552 | ✅ Có route `/blog/[slug]` | Paginated, flat structure |
| Blog posts markdown chưa import | 655 | ❌ Chưa import | `docs/articles/` — cần lọc + import |
| Landing pages tuyển sinh | 29 | ✅ Có form | 4 cấp × variants |
| Thank you pages | 26 | ✅ | `/cam-on/` pages |
| A/B test variants (Lớp 6) | 10 | ✅ | checklist/early-bird/pain-point/school-tour/webinar × A/B |
| Squeeze pages | 5 | ✅ | Checklist, học thử, test, webinar, ebook |
| Homepage variants | 3 | ✅ | A/B testing |
| Template showcase | 8 | ✅ | `/mau-template/` và `/mau/` |

### 1.3 Directus CMS Collections

| Collection | Records | Dùng cho |
|------------|---------|----------|
| `posts` | ~552 | Blog/tin tức |
| `pillar_pages` | 15 | 15 trang trụ cột |
| `testimonials` | ~20 | Nhận xét phụ huynh |
| `campuses` | 9 | Thông tin cơ sở (GPS, địa chỉ, cấp học) |
| `gallery_categories` | ~10 | Danh mục hình ảnh |
| `nav_items` | ~25 | Menu điều hướng |
| `site_settings` | 1 | Hotline, email, Zalo, thông báo |
| `faq` (trong pillar_pages) | Embedded | FAQ cho 15/15 trang |

### 1.4 SEO & Marketing Assets

| Asset | Số lượng | File |
|-------|----------|------|
| Từ khóa SEO đã nghiên cứu | 200 | `docs/TU-KHOA-SEO-THEO-CAP-HOC.md` |
| Blog URL inventory (kế hoạch) | 500+ URLs / 11 cluster | `docs/blog-url-inventory.md` |
| Content batch plan | 38 batch / ~164 bài seed | `docs/content-batch-plan.md` |
| WordPress URLs gốc (crawled) | 1,485 | `docs/master-index-sheet.csv` |
| Redirect 301 rules | 430 | `docs/redirect-rules.csv` |
| Enriched master index | 1,484 entries | `docs/enriched-master-index.csv` |
| Directus import master | 551 entries | `docs/directus-import-master.csv` |
| Hình ảnh trên R2 | 139 files (72 raster + 21 SVG) | media.truongvietanh.com |
| Blueprint SEO/AIO | 1 doc hoàn chỉnh | `docs/BLUEPRINT-TRANG-SEO-AIO-LEAD.md` |
| Marketing Plan v5.0 | 108KB, 18 chương | `docs/ke-hoach-marketing-sales-v5.0.md` |
| Brand Guidelines | 1 doc | `docs/brand-guidelines.md` |

### 1.5 Đánh giá GAP — Cái gì thiếu?

| # | GAP | Mức độ | Ảnh hưởng |
|---|-----|--------|-----------|
| 1 | **0 sub-pillar pages** — không có Tầng 2 | 🔴 Critical | Mất hàng trăm keyword rankings |
| 2 | **Blog flat** — 552 bài đều nằm `/blog/[slug]` | 🔴 Critical | Không có cluster, internal linking yếu |
| 3 | **655 bài chưa import** — nằm trong `docs/articles/` | 🟡 High | Mất ~400 trang indexed potential |
| 4 | **Internal linking yếu** — ~2 links/trang | 🟡 High | PageRank không flow, topical authority thấp |
| 5 | **0 external links uy tín** | 🟡 Medium | E-E-A-T thiếu dẫn chứng |
| 6 | **Pillar content sơ sài** — nhiều trang <1000 từ | 🟡 Medium | Không đủ depth cho pillar ranking |
| 7 | **Chưa có blog category pages** | 🟡 Medium | `/blog/mam-non/`, `/blog/tieng-anh/` chưa có |
| 8 | **Hình ảnh thiếu** — chỉ 139/1000+ cần | 🟢 Low | Ảnh placeholder vẫn hoạt động |

---

## 2. KIẾN TRÚC SITE MỚI 4 TẦNG

```
TẦNG 0 ─ HOMEPAGE (truongvietanh.com)
│
├── TẦNG 1 ─ MEGA PILLARS (15 trang, 3000-5000 từ)
│   ├── /mam-non
│   ├── /tieu-hoc
│   ├── /trung-hoc-co-so
│   ├── /trung-hoc-pho-thong
│   ├── /hoc-phi
│   ├── /tuyen-sinh
│   ├── /co-so
│   ├── /gioi-thieu
│   ├── /triet-ly-giao-duc
│   ├── /he-thong-pdr
│   ├── /ngoai-khoa
│   ├── /thanh-tich
│   ├── /phu-huynh
│   ├── /lien-he
│   └── /cap-hoc
│
├── TẦNG 2 ─ SUB-PILLARS (42 trang MỚI, 1500-2500 từ)
│   ├── Cluster Mầm Non (8): /mam-non/chuong-trinh, /mam-non/tieng-anh, ...
│   ├── Cluster Tiểu Học (7): /tieu-hoc/chuong-trinh-cambridge, ...
│   ├── Cluster THCS (7): /thcs/chuong-trinh, /thcs/ielts-tu-lop-6, ...
│   ├── Cluster THPT (7): /thpt/chuong-trinh, /thpt/du-hoc, /thpt/rot-lop-10, ...
│   ├── Cluster Học Phí (4): /hoc-phi/mam-non, /hoc-phi/tieu-hoc, ...
│   ├── Cluster Local SEO (5): /co-so/go-vap, /co-so/phu-nhuan, ...
│   └── Cluster So Sánh (4): /so-sanh/viet-anh-vs-vinschool, ...
│
├── TẦNG 3 ─ BLOG CLUSTERS (500+ bài, 800-1500 từ)
│   ├── /blog/mam-non/[slug]      (50 bài)
│   ├── /blog/tieu-hoc/[slug]     (50 bài)
│   ├── /blog/thcs/[slug]         (50 bài)
│   ├── /blog/thpt/[slug]         (50 bài)
│   ├── /blog/tieng-anh/[slug]    (50 bài)
│   ├── /blog/du-hoc/[slug]       (50 bài)
│   ├── /blog/ky-nang/[slug]      (40 bài)
│   ├── /blog/phu-huynh/[slug]    (40 bài)
│   ├── /blog/tuyen-sinh/[slug]   (50 bài)
│   ├── /blog/hoc-phi/[slug]      (30 bài)
│   └── /blog/dia-phuong/[slug]   (40 bài)
│
└── TẦNG 4 ─ LANDING PAGES (conversion, một số noindex)
    ├── /tuyen-sinh/mam-non/* (19 trang)
    ├── /tuyen-sinh/tieu-hoc/* (10 trang)
    ├── /tuyen-sinh/thcs/* (16 trang)
    ├── /tuyen-sinh/thpt/* (12 trang)
    ├── /squeeze/* (5 trang)
    └── /cam-on/* (26 trang)
```

**Tổng sau khi hoàn thành: ~1,600+ trang (từ ~1,364 hiện tại)**

---

## 3. BLOG PLAN CHI TIẾT — THỰC HIỆN NGAY

### 3.1 Thay đổi kỹ thuật cần làm trước

#### A. Chuyển blog từ flat sang cluster routing

**Hiện tại:** `/blog/[slug].astro` — tất cả 552 bài cùng 1 level

**Cần chuyển sang:**
```
src/pages/
  blog/
    index.astro              ← Blog hub (tất cả clusters)
    [cluster]/
      index.astro            ← Cluster listing page (VD: /blog/mam-non/)
      [slug].astro           ← Blog post (VD: /blog/mam-non/may-tuoi-di-hoc)
```

**Cách implement:**
1. Thêm field `cluster` vào Directus collection `posts` (select: mam-non, tieu-hoc, thcs, thpt, tieng-anh, du-hoc, ky-nang, phu-huynh, tuyen-sinh, hoc-phi, dia-phuong)
2. Batch update 552 posts: assign cluster dựa trên slug/keyword (script tự động)
3. Tạo `src/pages/blog/[cluster]/[slug].astro`
4. Tạo `src/pages/blog/[cluster]/index.astro` — listing page cho mỗi cluster
5. Redirect `/blog/[old-slug]` → `/blog/[cluster]/[slug]` (301)
6. Giữ `/blog/[slug].astro` như fallback cho posts chưa assign cluster

#### B. Thêm Directus fields cho blog

| Field | Type | Mục đích |
|-------|------|----------|
| `cluster` | Select (11 options) | Phân nhóm blog |
| `primary_keyword` | Text | Keyword chính nhắm |
| `internal_links` | JSON | Danh sách links cần chèn |
| `related_posts` | M2M → posts | 3-5 bài liên quan |
| `featured_image` | Image | Ảnh đại diện (R2 URL) |
| `reading_time` | Integer | Thời gian đọc (tự tính) |
| `priority` | Select (P1/P2/P3) | Ưu tiên viết |

### 3.2 Danh sách 110 bài blog ưu tiên P1 — Viết trước

Đây là 110 bài cần viết/viết lại TRƯỚC vì nhắm keyword có volume cao nhất và conversion intent mạnh nhất.

#### CLUSTER 1: Mầm Non — 15 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | mam-non/may-tuoi-di-hoc-mam-non | mấy tuổi đi học mầm non | 1200 | Info |
| 2 | mam-non/cach-chon-truong-mam-non-cho-con | chọn trường mầm non | 1500 | Info → Conv |
| 3 | mam-non/truong-mam-non-song-ngu-la-gi | mầm non song ngữ là gì | 1200 | Info |
| 4 | mam-non/so-sanh-mam-non-song-ngu-va-quoc-te | so sánh mầm non song ngữ vs quốc tế | 1500 | Comparison |
| 5 | mam-non/hoc-phi-mam-non-song-ngu-tphcm | học phí mầm non song ngữ tphcm | 1200 | Transactional |
| 6 | mam-non/chi-phi-mam-non-tu-thuc-tphcm-2026 | chi phí mầm non tư thục 2026 | 1200 | Transactional |
| 7 | mam-non/be-3-tuoi-hoc-duoc-gi-o-truong-mam-non | bé 3 tuổi học gì | 1000 | Info |
| 8 | mam-non/chuong-trinh-mam-non-song-ngu-gom-nhung-gi | chương trình mầm non song ngữ | 1500 | Info |
| 9 | mam-non/loi-ich-cho-tre-hoc-tieng-anh-som | lợi ích tiếng Anh sớm | 1200 | Info |
| 10 | mam-non/mam-non-go-vap-nen-chon-truong-nao | mầm non gò vấp | 1500 | Local |
| 11 | mam-non/tre-khoc-khi-di-hoc-mam-non-phai-lam-sao | trẻ khóc mầm non | 1000 | Info |
| 12 | mam-non/phuong-phap-montessori-la-gi | montessori là gì | 1200 | Info |
| 13 | mam-non/mam-non-phu-nhuan-tot-nhat | mầm non phú nhuận | 1200 | Local |
| 14 | mam-non/mam-non-binh-tan-chat-luong | mầm non bình tân | 1200 | Local |
| 15 | mam-non/phuong-phap-steam-cho-mam-non | STEAM mầm non | 1000 | Info |

#### CLUSTER 2: Tiểu Học — 12 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | tieu-hoc/cach-chon-truong-tieu-hoc-cho-con | chọn trường tiểu học | 1500 | Info → Conv |
| 2 | tieu-hoc/tieu-hoc-song-ngu-la-gi | tiểu học song ngữ là gì | 1200 | Info |
| 3 | tieu-hoc/hoc-phi-tieu-hoc-song-ngu-tphcm | học phí tiểu học song ngữ | 1200 | Transactional |
| 4 | tieu-hoc/chuong-trinh-cambridge-tieu-hoc | cambridge tiểu học | 1500 | Info |
| 5 | tieu-hoc/con-lop-1-co-theo-kip-tieng-anh | lớp 1 tiếng anh | 1000 | Info (PH concern) |
| 6 | tieu-hoc/stem-coding-cho-hoc-sinh-tieu-hoc | STEM coding tiểu học | 1200 | Info |
| 7 | tieu-hoc/chuan-bi-cho-con-vao-lop-1 | chuẩn bị lớp 1 | 1500 | Info → Conv |
| 8 | tieu-hoc/tieu-hoc-go-vap-nen-chon-truong-nao | tiểu học gò vấp | 1200 | Local |
| 9 | tieu-hoc/tieu-hoc-phu-nhuan-tot-nhat | tiểu học phú nhuận | 1200 | Local |
| 10 | tieu-hoc/so-sanh-tieu-hoc-cong-va-tu | tiểu học công vs tư | 1500 | Comparison |
| 11 | tieu-hoc/16-ky-nang-the-ky-21-la-gi | kỹ năng thế kỷ 21 | 1200 | Info |
| 12 | tieu-hoc/chuyen-truong-tieu-hoc-giua-chung | chuyển trường tiểu học | 1000 | Info |

#### CLUSTER 3: THCS — 12 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | thcs/chon-truong-cap-2-cho-con | chọn trường cấp 2 | 1500 | Info → Conv |
| 2 | thcs/hoc-phi-thcs-tu-thuc-tphcm | học phí THCS tư thục | 1200 | Transactional |
| 3 | thcs/luyen-ielts-tu-lop-6 | IELTS lớp 6 | 1500 | Info |
| 4 | thcs/rot-lop-6-cong-lap-hoc-o-dau | rớt lớp 6 | 1200 | Info (high intent) |
| 5 | thcs/chuyen-cap-tu-tieu-hoc-len-thcs | chuyển cấp lên THCS | 1200 | Info |
| 6 | thcs/thcs-song-ngu-khac-gi-thcs-thuong | THCS song ngữ vs thường | 1200 | Comparison |
| 7 | thcs/debate-mun-cho-hoc-sinh-cap-2 | debate MUN | 1000 | Info |
| 8 | thcs/thcs-go-vap-truong-nao-tot | THCS gò vấp | 1200 | Local |
| 9 | thcs/ky-nang-lanh-dao-cho-hoc-sinh-thcs | kỹ năng lãnh đạo THCS | 1000 | Info |
| 10 | thcs/tuyen-sinh-lop-6-truong-tu-2026 | tuyển sinh lớp 6 2026 | 1200 | Transactional |
| 11 | thcs/thi-dau-vao-lop-6-truong-tu | thi đầu vào lớp 6 | 1000 | Info |
| 12 | thcs/top-truong-thcs-tu-thuc-tphcm | top THCS tư thục tphcm | 1500 | Comparison |

#### CLUSTER 4: THPT — 12 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | thpt/rot-lop-10-cong-lap-hoc-o-dau | rớt lớp 10 học ở đâu | 1500 | 🔥 Info (volume rất cao) |
| 2 | thpt/hoc-phi-thpt-tu-thuc-tphcm | học phí THPT tư thục | 1200 | Transactional |
| 3 | thpt/chon-truong-cap-3-cho-con | chọn trường cấp 3 | 1500 | Info → Conv |
| 4 | thpt/ielts-6-0-dau-ra-thpt | IELTS 6.0 đầu ra THPT | 1500 | Info |
| 5 | thpt/chuan-bi-du-hoc-tu-thpt | chuẩn bị du học từ THPT | 1500 | Info |
| 6 | thpt/du-hoc-uc-tu-lop-12 | du học Úc lớp 12 | 1200 | Info |
| 7 | thpt/du-hoc-my-tu-lop-11 | du học Mỹ lớp 11 | 1200 | Info |
| 8 | thpt/sat-la-gi-chuan-bi-nhu-the-nao | SAT là gì | 1200 | Info |
| 9 | thpt/tuyen-sinh-lop-10-truong-tu-2026 | tuyển sinh lớp 10 2026 | 1200 | Transactional |
| 10 | thpt/thpt-song-ngu-vs-thpt-chuyen | THPT song ngữ vs chuyên | 1500 | Comparison |
| 11 | thpt/huong-nghiep-cho-hoc-sinh-lop-12 | hướng nghiệp lớp 12 | 1200 | Info |
| 12 | thpt/top-truong-thpt-tu-thuc-tphcm | top THPT tư thục tphcm | 1500 | Comparison |

#### CLUSTER 5: Tiếng Anh — 10 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | tieng-anh/day-tieng-anh-cho-tre-tu-may-tuoi | dạy tiếng Anh cho trẻ | 1200 | Info |
| 2 | tieng-anh/ielts-cho-hoc-sinh-cap-2-cap-3 | IELTS cho học sinh | 1500 | Info |
| 3 | tieng-anh/phuong-phap-immersion-la-gi | immersion là gì | 1200 | Info |
| 4 | tieng-anh/lo-trinh-hoc-ielts-tu-0-den-6-5 | lộ trình IELTS 0-6.5 | 1500 | Info |
| 5 | tieng-anh/tieng-anh-cambridge-vs-ielts | Cambridge vs IELTS | 1200 | Comparison |
| 6 | tieng-anh/loi-ich-hoc-song-ngu-tu-nho | lợi ích song ngữ | 1000 | Info |
| 7 | tieng-anh/giao-vien-ban-ngu-vs-giao-vien-viet | giáo viên bản ngữ vs Việt | 1200 | Comparison |
| 8 | tieng-anh/ket-qua-ielts-truong-viet-anh | kết quả IELTS Việt Anh | 1000 | Social proof |
| 9 | tieng-anh/phonics-la-gi-phuong-phap-doc | phonics là gì | 1000 | Info |
| 10 | tieng-anh/tieng-anh-giao-tiep-vs-tieng-anh-hoc-thuat | tiếng Anh giao tiếp vs học thuật | 1200 | Comparison |

#### CLUSTER 6: Du Học — 8 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | du-hoc/du-hoc-uc-can-nhung-gi | du học Úc cần gì | 1500 | Info |
| 2 | du-hoc/du-hoc-my-can-nhung-gi | du học Mỹ cần gì | 1500 | Info |
| 3 | du-hoc/du-hoc-anh-can-nhung-gi | du học Anh cần gì | 1500 | Info |
| 4 | du-hoc/chi-phi-du-hoc-cac-nuoc-2026 | chi phí du học 2026 | 1500 | Info |
| 5 | du-hoc/hoc-bong-du-hoc-cho-hoc-sinh-gioi | học bổng du học | 1200 | Info |
| 6 | du-hoc/chuan-bi-ho-so-du-hoc-tu-lop-may | chuẩn bị hồ sơ du học | 1500 | Info |
| 7 | du-hoc/truong-viet-anh-ho-tro-du-hoc-nhu-the-nao | Việt Anh hỗ trợ du học | 1200 | Brand + Info |
| 8 | du-hoc/gap-year-hay-du-hoc-ngay-sau-lop-12 | gap year vs du học ngay | 1000 | Info |

#### CLUSTER 7-8: Kỹ Năng + Phụ Huynh — 10 bài P1

| # | Cluster | Slug | Keyword Target | Từ |
|---|---------|------|---------------|-----|
| 1 | ky-nang | ky-nang/16-ky-nang-the-ky-21-wef | 16 kỹ năng WEF | 1500 |
| 2 | ky-nang | ky-nang/ren-tinh-tu-chu-cho-tre | rèn tính tự chủ cho trẻ | 1200 |
| 3 | ky-nang | ky-nang/pdr-la-gi-he-thong-phat-trien-ca-nhan | PDR là gì | 1200 |
| 4 | ky-nang | ky-nang/leader-in-me-la-gi | Leader in Me | 1000 |
| 5 | ky-nang | ky-nang/day-tre-giai-quyet-van-de | dạy trẻ giải quyết vấn đề | 1000 |
| 6 | phu-huynh | phu-huynh/lam-sao-chon-truong-phu-hop-cho-con | chọn trường phù hợp | 1500 |
| 7 | phu-huynh | phu-huynh/dau-hieu-con-bi-ap-luc-hoc-tap | áp lực học tập | 1000 |
| 8 | phu-huynh | phu-huynh/dong-hanh-cung-con-giai-doan-chuyen-cap | đồng hành chuyển cấp | 1200 |
| 9 | phu-huynh | phu-huynh/cam-nang-phu-huynh-truong-tu-thuc | cẩm nang PH trường tư | 1500 |
| 10 | phu-huynh | phu-huynh/so-sanh-truong-cong-va-truong-tu-thuc | so sánh công vs tư | 1500 |

#### CLUSTER 9-10: Tuyển Sinh + Học Phí — 12 bài P1

| # | Cluster | Slug | Keyword Target | Từ |
|---|---------|------|---------------|-----|
| 1 | tuyen-sinh | tuyen-sinh/tuyen-sinh-mam-non-2026-tphcm | tuyển sinh mầm non 2026 | 1200 |
| 2 | tuyen-sinh | tuyen-sinh/tuyen-sinh-tieu-hoc-2026 | tuyển sinh tiểu học 2026 | 1200 |
| 3 | tuyen-sinh | tuyen-sinh/tuyen-sinh-lop-6-2026 | tuyển sinh lớp 6 2026 | 1200 |
| 4 | tuyen-sinh | tuyen-sinh/tuyen-sinh-lop-10-2026 | tuyển sinh lớp 10 2026 | 1200 |
| 5 | tuyen-sinh | tuyen-sinh/lich-tuyen-sinh-truong-tu-tphcm | lịch tuyển sinh trường tư | 1000 |
| 6 | tuyen-sinh | tuyen-sinh/ho-so-nhap-hoc-can-nhung-gi | hồ sơ nhập học | 1000 |
| 7 | tuyen-sinh | tuyen-sinh/hoc-thu-mien-phi-truong-viet-anh | học thử miễn phí | 1000 |
| 8 | hoc-phi | hoc-phi/bang-hoc-phi-truong-tu-thuc-tphcm-2026 | học phí trường tư 2026 | 1500 |
| 9 | hoc-phi | hoc-phi/so-sanh-hoc-phi-truong-song-ngu-tphcm | so sánh học phí song ngữ | 1500 |
| 10 | hoc-phi | hoc-phi/hoc-phi-truong-viet-anh-co-dat-khong | học phí Việt Anh đắt không | 1200 |
| 11 | hoc-phi | hoc-phi/chinh-sach-hoc-bong-truong-viet-anh | học bổng Việt Anh | 1000 |
| 12 | hoc-phi | hoc-phi/tra-gop-hoc-phi-truong-tu-thuc | trả góp học phí | 1000 |

#### CLUSTER 11: Địa Phương — 9 bài P1

| # | Slug | Keyword Target | Từ | Intent |
|---|------|---------------|-----|--------|
| 1 | dia-phuong/truong-tu-thuc-go-vap | trường tư thục gò vấp | 1500 | Local |
| 2 | dia-phuong/truong-tu-thuc-phu-nhuan | trường tư thục phú nhuận | 1500 | Local |
| 3 | dia-phuong/truong-tu-thuc-binh-tan | trường tư thục bình tân | 1500 | Local |
| 4 | dia-phuong/truong-tu-thuc-quan-12 | trường tư thục quận 12 | 1200 | Local |
| 5 | dia-phuong/truong-tu-thuc-thu-duc | trường tư thục thủ đức | 1200 | Local |
| 6 | dia-phuong/truong-tu-thuc-tan-binh | trường tư thục tân bình | 1200 | Local |
| 7 | dia-phuong/truong-song-ngu-can-giuoc-long-an | trường song ngữ cần giuộc | 1000 | Local |
| 8 | dia-phuong/truong-song-ngu-rach-gia-kien-giang | trường song ngữ rạch giá | 1000 | Local |
| 9 | dia-phuong/truong-gan-cityland-go-vap | trường gần cityland gò vấp | 1000 | Local (hyper) |

**Tổng P1: 110 bài × ~1,300 từ TB = ~143,000 từ**

### 3.3 Template chuẩn cho mỗi blog post

```
┌─────────────────────────────────────────────┐
│ META                                         │
│ - Title: [Keyword] | Trường Việt Anh (≤60)   │
│ - Desc: [Value prop + CTA] (≤155)            │
│ - Canonical: /blog/[cluster]/[slug]          │
│ - Schema: Article + BreadcrumbList           │
├─────────────────────────────────────────────┤
│ HEADER + BREADCRUMB                          │
│ Trang chủ > Blog > [Cluster] > [Bài viết]   │
├─────────────────────────────────────────────┤
│ H1: [Keyword-rich title]                     │
│ Meta: Ngày đăng · 5 phút đọc · [Cluster]    │
├─────────────────────────────────────────────┤
│ AIO ANSWER BOX (40-60 từ)                    │
│ Trả lời trực tiếp câu hỏi chính             │
├─────────────────────────────────────────────┤
│ TOC (auto-generated từ H2)                   │
├─────────────────────────────────────────────┤
│ H2 Section 1 (200-400 từ)                    │
│   → 1 internal link (anchor = keyword)       │
│   → Evidence/số liệu nếu có                 │
│                                              │
│ H2 Section 2                                 │
│   → 1 internal link                          │
│   → [INLINE CTA] Đăng ký tham quan           │
│                                              │
│ H2 Section 3                                 │
│   → 1 external link (nguồn uy tín)           │
│                                              │
│ H2 Section 4                                 │
│   → 1 internal link                          │
├─────────────────────────────────────────────┤
│ FAQ (3-5 câu, schema FAQPage)                │
├─────────────────────────────────────────────┤
│ CTA SECTION                                  │
│ [Lead Form 2 bước]                           │
├─────────────────────────────────────────────┤
│ RELATED POSTS (3-4 bài cùng cluster)         │
├─────────────────────────────────────────────┤
│ FOOTER                                       │
└─────────────────────────────────────────────┘
```

### 3.4 Quy tắc linking bắt buộc cho mỗi blog

| Loại link | Số lượng | Anchor text rule |
|-----------|----------|-----------------|
| Link lên Pillar (Tầng 1) | 1 | Keyword chính của pillar |
| Link lên Sub-pillar (Tầng 2) | 1 | Keyword chính của sub-pillar |
| Link ngang (cùng cluster) | 2-3 | Keyword của bài đích |
| Link CTA (conversion page) | 1 | Action keyword (đăng ký, tham quan) |
| External link uy tín | 0-1 | Tên tổ chức/nghiên cứu |
| Related posts cuối bài | 3-4 | Title bài viết |

### 3.5 Lịch publish blog P1

| Tuần | Cluster | Số bài | Tổng tích lũy |
|------|---------|--------|---------------|
| Tuần 1 | Mầm Non (1-8) | 8 | 8 |
| Tuần 2 | Mầm Non (9-15) + Tiểu Học (1-3) | 10 | 18 |
| Tuần 3 | Tiểu Học (4-12) | 9 | 27 |
| Tuần 4 | THCS (1-8) | 8 | 35 |
| Tuần 5 | THCS (9-12) + THPT (1-6) | 10 | 45 |
| Tuần 6 | THPT (7-12) + Tiếng Anh (1-4) | 10 | 55 |
| Tuần 7 | Tiếng Anh (5-10) + Du Học (1-4) | 10 | 65 |
| Tuần 8 | Du Học (5-8) + Kỹ Năng + Phụ Huynh (1-5) | 9 | 74 |
| Tuần 9 | Phụ Huynh (6-10) + Tuyển Sinh (1-4) | 9 | 83 |
| Tuần 10 | Tuyển Sinh (5-7) + Học Phí (1-5) | 8 | 91 |
| Tuần 11 | Học Phí (6-12) + Địa Phương (1-2) | 9 | 100 |
| Tuần 12 | Địa Phương (3-9) + Buffer | 10 | **110** |

**Tốc độ: ~10 bài/tuần × 12 tuần = 110 bài P1 hoàn thành trong 3 tháng**

---

## 4. SUB-PILLAR PAGES CẦN TẠO

*(Chi tiết đầy đủ tại `docs/CHIEN-LUOC-PILLAR-LINKING-BLOG.md` — Phần 3)*

| Cluster | Số sub-pillar | Tổng từ | Ưu tiên |
|---------|--------------|---------|---------|
| Mầm Non | 8 | ~14,000 | Phase 1 |
| Tiểu Học | 7 | ~12,000 | Phase 1 |
| THCS | 7 | ~12,000 | Phase 2 |
| THPT | 7 | ~13,500 | Phase 2 |
| Học Phí | 4 | ~7,500 | Phase 1 |
| Local SEO | 5 | ~9,500 | Phase 3 |
| So Sánh | 4 | ~9,500 | Phase 3 |
| **Tổng** | **42** | **~78,000** | |

### Thứ tự thực hiện sub-pillar:

**Phase 1 (Tuần 1-4):** Mầm Non (8) + Tiểu Học (7) + Học Phí MN/TH (2) = 17 trang
- Lý do: Volume keyword cao nhất, mùa tuyển sinh MN/TH

**Phase 2 (Tuần 5-8):** THCS (7) + THPT (7) + Học Phí THCS/THPT (2) = 16 trang
- Lý do: Mùa thi/chuyển cấp

**Phase 3 (Tuần 9-12):** Local SEO (5) + So Sánh (4) = 9 trang
- Lý do: Local intent, comparison intent

---

## 5. CHIẾN LƯỢC INTERNAL LINKING

### 5.1 Ma trận linking tổng thể

```
Homepage
  ↓ (8 links tới Tầng 1, anchor = keyword chính)
Pillar Pages (Tầng 1)
  ↓ (5-8 links tới Tầng 2, anchor = keyword sub-pillar)
  ↑ (1 link ngược lên Homepage)
  ↔ (2-3 links ngang giữa pillars: MN→TH→THCS→THPT)
Sub-Pillars (Tầng 2)
  ↓ (3-5 links tới Tầng 3, anchor = keyword blog)
  ↑ (1 link lên Pillar gốc)
  ↔ (1-2 links ngang giữa siblings)
Blog Posts (Tầng 3)
  ↑ (1 link lên Pillar, 1 link lên Sub-pillar)
  ↔ (2-3 links ngang cùng cluster)
  → (1 link CTA tới Landing/Squeeze)
```

### 5.2 Anchor text rules

| Loại | Ví dụ ĐÚNG | Ví dụ SAI |
|------|-----------|----------|
| Keyword match | "chương trình mầm non song ngữ" | "xem thêm" |
| Natural variant | "tiếng Anh cho trẻ mầm non" | "click here" |
| Brand + keyword | "mầm non Việt Anh" | "trang này" |
| CTA anchor | "đăng ký tham quan mầm non" | "bấm vào đây" |

**Quy tắc:**
- Anchor 3-7 từ, chứa keyword chính của trang đích
- Mỗi trang đích dùng 2-3 biến thể anchor, không spam 1 anchor
- Mỗi blog post tối thiểu 5 internal links, tối đa 10

---

## 6. CHIẾN LƯỢC EXTERNAL LINKING

### 6.1 Nguyên tắc

1. CHỈ link ra khi cần dẫn chứng E-E-A-T
2. KHÔNG link đến đối thủ
3. Mỗi bài 0-2 external links
4. `rel="noopener noreferrer"` cho tất cả
5. Ưu tiên .gov, .edu, tổ chức quốc tế

### 6.2 Nguồn được phép

| Nhóm | Nguồn | Domain | Khi nào dùng |
|------|-------|--------|--------------|
| GD quốc tế | UNESCO | unesco.org | Báo cáo giáo dục |
| GD quốc tế | WEF | weforum.org | 16 kỹ năng TK21, Future of Jobs |
| GD quốc tế | OECD PISA | oecd.org/pisa | Xếp hạng GD quốc gia |
| Chứng chỉ | Cambridge | cambridgeenglish.org | YLE, KET, PET |
| Chứng chỉ | IELTS Official | ielts.org | Band score, thống kê |
| Chứng chỉ | College Board | collegeboard.org | SAT, AP |
| GD VN | Bộ GD&ĐT | moet.gov.vn | Quy chế, khung chương trình |
| Ngôn ngữ | British Council | britishcouncil.vn | Tiếng Anh, chương trình UK |
| Nghiên cứu | MIT | mit.edu | Ngôn ngữ trẻ em |
| Nghiên cứu | Harvard GSE | gse.harvard.edu | Giáo dục sớm |
| Trẻ em | UNICEF | unicef.org | Phát triển trẻ em |
| Sức khỏe | WHO | who.int | Dinh dưỡng, vận động |
| Du học | Study in Australia | studyaustralia.gov.au | Du học Úc |
| Du học | EducationUSA | educationusa.state.gov | Du học Mỹ |
| Du học | UCAS | ucas.com | Đại học Anh |
| Phương pháp | Montessori Foundation | montessori.org | Giải thích Montessori |
| Phương pháp | FranklinCovey | leaderinme.org | Leader in Me |
| Xếp hạng ĐH | QS Rankings | topuniversities.com | Xếp hạng ĐH |

### 6.3 KHÔNG link đến

- Đối thủ: Vinschool, BVIS, AIS, TAS, SSIS, v.v.
- Wikipedia (không đủ E-E-A-T cho giáo dục)
- Trang review không kiểm soát (muaban.net, toplist, v.v.)
- Trang affiliate/quảng cáo

---

## 7. TECHNICAL SEO & CMS

### 7.1 Directus CMS — Collections cần thêm

| Collection mới | Fields chính | Mục đích |
|---------------|-------------|----------|
| `sub_pillar_pages` | slug, title, cluster, content, parent_pillar, internal_links, faq_items | 42 sub-pillar pages |
| `blog_clusters` | name, slug, description, pillar_link, sub_pillar_links | 11 cluster definitions |
| Thêm fields cho `posts` | cluster, primary_keyword, priority, internal_links, related_posts, featured_image | Blog optimization |

### 7.2 Astro routing mới

| Route | File | Dữ liệu |
|-------|------|---------|
| `/blog/` | `src/pages/blog/index.astro` | All clusters hub |
| `/blog/[cluster]/` | `src/pages/blog/[cluster]/index.astro` | Cluster listing |
| `/blog/[cluster]/[slug]` | `src/pages/blog/[cluster]/[slug].astro` | Blog post |
| `/[slug]` (sub-pillar) | `src/pages/[...slug].astro` (existing) | Từ `sub_pillar_pages` collection |

### 7.3 Schema Markup checklist

| Trang | Schema types |
|-------|-------------|
| Homepage | EducationalOrganization, WebSite, BreadcrumbList |
| Pillar Pages | EducationalOrganization, FAQPage, BreadcrumbList |
| Sub-pillars | Article, FAQPage, BreadcrumbList |
| Blog Posts | Article, FAQPage (nếu có FAQ), BreadcrumbList |
| Landing Pages | EducationalOrganization, BreadcrumbList |
| Cơ sở (Local) | LocalBusiness, GeoCoordinates, BreadcrumbList |

### 7.4 Sitemap strategy

```xml
<!-- sitemap-index.xml -->
<sitemapindex>
  <sitemap><loc>/sitemap-pages.xml</loc></sitemap>      <!-- 15 pillar + 42 sub -->
  <sitemap><loc>/sitemap-blog-mam-non.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog-tieu-hoc.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog-thcs.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog-thpt.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog-tieng-anh.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog-du-hoc.xml</loc></sitemap>
  <sitemap><loc>/sitemap-blog-misc.xml</loc></sitemap>    <!-- ky-nang, phu-huynh, etc -->
  <sitemap><loc>/sitemap-landing.xml</loc></sitemap>       <!-- squeeze, tuyen-sinh -->
</sitemapindex>
```

---

## 8. CONTENT PRODUCTION PIPELINE

### 8.1 Quy trình viết 1 bài blog

```
1. RESEARCH (5 phút)
   - Xác nhận keyword từ danh sách
   - Check Google SERP: ai đang rank? nội dung gì?
   - Xác định search intent (info/comparison/transactional/local)

2. OUTLINE (5 phút)
   - H1 + 4-6 H2 (dạng câu hỏi nếu info intent)
   - AIO answer block cho H1
   - Xác định internal links (pillar, sub-pillar, cluster siblings)
   - Xác định external link uy tín (nếu cần)
   - FAQ 3-5 câu

3. WRITE (30-45 phút AI + HITL)
   - AI draft với prompt chuẩn (xem 8.2)
   - Human review: fact-check, brand voice, link placement
   - Chèn CTA inline

4. OPTIMIZE (10 phút)
   - Title tag ≤60 ký tự
   - Meta desc ≤155 ký tự
   - Alt text cho images
   - Internal links đúng anchor text
   - FAQ schema

5. PUBLISH (5 phút)
   - Post vào Directus
   - Assign cluster + priority + keyword
   - Set related_posts
   - Webhook auto-rebuild
```

### 8.2 AI Writing Prompt Template

```
Viết bài blog 1200 từ cho trang truongvietanh.com.

KEYWORD CHÍNH: [keyword]
CLUSTER: [cluster name]
SEARCH INTENT: [info/comparison/transactional/local]

CẤU TRÚC:
1. AIO Answer Block (40-60 từ): Trả lời trực tiếp keyword chính
2. H2 sections (4-5 sections, mỗi section 200-300 từ):
   - Dùng câu hỏi tự nhiên cho H2 khi intent = info
   - Mỗi section có 1 internal link với anchor text chính xác
3. FAQ (3-5 câu hỏi phụ huynh thường hỏi)

BRAND VOICE:
- Giọng văn: chuyên gia thân thiện, không dạy đời
- USP nhắc tự nhiên: "Vui vẻ & Thực dụng", "0 BTVN", "IELTS cam kết"
- KHÔNG quá PR, KHÔNG spam brand name
- Dẫn chứng cụ thể: số liệu, nghiên cứu khi có thể

INTERNAL LINKS BẮT BUỘC:
- 1 link lên pillar: /[pillar-slug] với anchor "[keyword pillar]"
- 1 link lên sub-pillar: /[sub-pillar-slug] với anchor "[keyword sub-pillar]"
- 2 link ngang: /blog/[cluster]/[sibling-slug]
- 1 CTA: /tuyen-sinh hoặc /squeeze/[relevant]

EXTERNAL LINK (nếu phù hợp):
- 0-1 link đến nguồn uy tín (.edu, .gov, tổ chức quốc tế)
```

### 8.3 Batch production workflow

```
Ngày 1-2: Research + Outline 10 bài (cluster focus)
Ngày 3-5: AI Draft + HITL Review 10 bài
Ngày 6:   CMS Upload + Link Placement + Publish
Ngày 7:   QA — kiểm tra links, schema, mobile
```

**Tốc độ mục tiêu: 10 bài/tuần, 1 cluster/2 tuần**

---

## 9. ROADMAP THỰC HIỆN

### Phase 0: Chuẩn bị kỹ thuật (Tuần 0 — 3 ngày)

| Task | Thời gian | Output |
|------|-----------|--------|
| Thêm fields mới vào Directus (cluster, keyword, etc.) | 2h | CMS ready |
| Tạo collection `sub_pillar_pages` | 1h | Collection ready |
| Tạo blog cluster routing (`/blog/[cluster]/[slug]`) | 3h | Routes ready |
| Tạo blog cluster index pages (`/blog/[cluster]/index`) | 2h | 11 listing pages |
| Batch assign cluster cho 552 posts hiện tại | 1h | Posts categorized |
| Setup redirects `/blog/[old]` → `/blog/[cluster]/[slug]` | 1h | 301s ready |
| Tạo blog post template mới (AIO + linking + CTA) | 2h | Template ready |

### Phase 1: Blog P1 Wave 1 + Sub-pillars MN/TH (Tuần 1-4)

| Tuần | Blog posts | Sub-pillars | Tổng mới |
|------|-----------|-------------|----------|
| 1 | 8 bài MN | 4 sub MN | 12 |
| 2 | 10 bài MN+TH | 4 sub MN | 14 |
| 3 | 9 bài TH | 4 sub TH | 13 |
| 4 | 8 bài THCS | 3 sub TH + 2 sub HP | 13 |
| **Tổng Phase 1** | **35 blog** | **17 sub-pillar** | **52 trang mới** |

### Phase 2: Blog P1 Wave 2 + Sub-pillars THCS/THPT (Tuần 5-8)

| Tuần | Blog posts | Sub-pillars | Tổng mới |
|------|-----------|-------------|----------|
| 5 | 10 bài THCS+THPT | 4 sub THCS | 14 |
| 6 | 10 bài THPT+TA | 3 sub THCS | 13 |
| 7 | 10 bài TA+DH | 4 sub THPT | 14 |
| 8 | 9 bài DH+KN+PH | 3 sub THPT + 2 sub HP | 14 |
| **Tổng Phase 2** | **39 blog** | **16 sub-pillar** | **55 trang mới** |

### Phase 3: Blog P1 Wave 3 + Local/Comparison (Tuần 9-12)

| Tuần | Blog posts | Sub-pillars | Tổng mới |
|------|-----------|-------------|----------|
| 9 | 9 bài PH+TS | 3 sub Local | 12 |
| 10 | 8 bài TS+HP | 2 sub Local | 10 |
| 11 | 9 bài HP+DP | 2 sub So sánh | 11 |
| 12 | 10 bài DP+Buffer | 2 sub So sánh | 12 |
| **Tổng Phase 3** | **36 blog** | **9 sub-pillar** | **45 trang mới** |

### Phase 4: Import legacy + P2 blog (Tuần 13-16)

| Task | Output |
|------|--------|
| Lọc + import ~400 bài markdown từ `docs/articles/` | +400 trang |
| Assign cluster + basic SEO cho legacy posts | Categorized |
| Bắt đầu blog P2 (40 bài/tháng) | +160 bài/4 tháng |
| Nâng nội dung 15 pillar hiện tại (viết lại theo blueprint) | 15 pillar upgraded |

### Phase 5: Go-live truongvietanh.com (Tuần 17+)

| Task | Output |
|------|--------|
| Switch domain hoc.truongvietanh.com → truongvietanh.com | Live |
| Submit sitemap GSC | Indexed |
| Monitor rankings, fix issues | Stable |
| Tắt WordPress hosting cũ | Cost saving |
| Blog P2 ongoing: 10 bài/tuần | +40 bài/tháng |

### Tổng kết Roadmap

| Mốc | Tuần | Tổng trang site |
|-----|------|-----------------|
| Hiện tại | 0 | ~1,364 |
| Sau Phase 0 | 0.5 | ~1,364 (restructured) |
| Sau Phase 1 | 4 | ~1,416 (+52) |
| Sau Phase 2 | 8 | ~1,471 (+55) |
| Sau Phase 3 | 12 | ~1,516 (+45) |
| Sau Phase 4 | 16 | ~1,916 (+400 legacy) |
| 6 tháng | 24 | ~2,100+ |
| 12 tháng | 48 | ~2,600+ |

---

## 10. KPI & ĐO LƯỜNG

### 10.1 SEO KPIs

| Metric | Hiện tại | 3 tháng | 6 tháng | 12 tháng |
|--------|----------|---------|---------|----------|
| Organic traffic/tháng | Baseline | +50% | +150% | +400% |
| Keywords top 10 | ~10 | 40 | 80 | 150 |
| Keywords top 3 | ~2 | 10 | 25 | 50 |
| AIO appearances | 0 | 10 | 30 | 60 |
| Pages indexed | ~800 | 1,200 | 1,600 | 2,500 |
| Internal links TB/trang | ~2 | 5 | 7 | 7 |
| Domain Rating (Ahrefs) | Baseline | +5 | +10 | +15 |
| Backlinks | Baseline | +50 | +150 | +400 |

### 10.2 Content KPIs

| Metric | 3 tháng | 6 tháng | 12 tháng |
|--------|---------|---------|----------|
| Blog posts mới (total) | 110 P1 | 270 | 500 |
| Sub-pillar pages | 42 | 42 | 50+ |
| Content quality score (Clearscope/SurferSEO) | 70+ | 80+ | 85+ |
| Featured snippets | 5 | 15 | 30 |

### 10.3 Lead Generation KPIs

| Metric | Hiện tại | 3 tháng | 6 tháng |
|--------|----------|---------|---------|
| Leads/tháng từ organic | Baseline | +30% | +100% |
| Blog → Lead conversion rate | <1% | 2% | 3% |
| Organic lead cost vs Paid | N/A | 50% cheaper | 70% cheaper |

### 10.4 Cách đo

- **Google Search Console:** Rankings, impressions, clicks, indexed pages
- **GA4:** Organic traffic, engagement, conversions, blog performance
- **GoHighLevel:** Leads by source, pipeline progression
- **Ahrefs/Semrush:** DR, backlinks, keyword positions (tháng/lần)

---

## CHI PHÍ

| Hạng mục | Chi phí |
|----------|---------|
| Cloudflare (Workers + R2) | $0 (free tier) |
| Contabo VPS (Directus) | Đã có |
| Domain | Đã có |
| AI content (Claude/GPT) | Đã có subscription |
| SEO tools (Ahrefs/GSC) | GSC miễn phí, Ahrefs $99/mo optional |
| **Tổng chi phí thêm** | **$0-99/tháng** |

---

*Tài liệu này thay thế `docs/KE-HOACH-TONG-THE-HOC-TRUONGVIETANH.md` (v1) và tích hợp:*
- *`docs/CHIEN-LUOC-PILLAR-LINKING-BLOG.md` (chiến lược linking)*
- *`docs/content-batch-plan.md` (batch plan)*
- *`docs/blog-url-inventory.md` (blog inventory)*
- *`docs/BLUEPRINT-TRANG-SEO-AIO-LEAD.md` (SEO/AIO blueprint)*
- *`docs/ke-hoach-marketing-sales-v5.0.md` (marketing plan - tham khảo)*
