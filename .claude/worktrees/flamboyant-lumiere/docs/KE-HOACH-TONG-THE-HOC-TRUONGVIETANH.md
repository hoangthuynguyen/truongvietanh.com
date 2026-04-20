# KẾ HOẠCH TỔNG THỂ: CHUYỂN STAGING → HOC.TRUONGVIETANH.COM
# Viết lại toàn bộ 1,000+ trang theo chuẩn SEO + AIO + Lead Gen

> Ngày tạo: 2026-04-07
> Mục tiêu: Chuyển đổi toàn bộ website WordPress sang hệ thống Astro + Directus
> Domain mới: truongvietanh.com (thay staging.truongvietanh.com)
> Mục tiêu cuối: truongvietanh.com (khi hoàn tất)

---

## TỔNG QUAN DỮ LIỆU

| Nguồn dữ liệu | Số lượng | Trạng thái |
|----------------|----------|------------|
| WordPress URLs gốc | 1,485 | Đã crawl xong |
| Redirect 301 (trang cũ bỏ/gộp) | 430 | ✅ Đã tạo _redirects |
| Bài viết đã import Directus (posts) | 552 | ✅ Trong CMS, ❌ CHƯA CÓ ROUTE |
| Bài viết markdown chưa import | 655 | ❌ Chưa import |
| Pages CMS (Directus) | 24 | ✅ Có route, ⚠️ nội dung sơ sài |
| Trang Astro tĩnh | ~40 | ✅ Có route, ⚠️ chỉ 2 trang đầy đủ |
| Hình ảnh trên R2 | 98 files | ✅ media.truongvietanh.com |
| **TỔNG trang cần có** | **~1,050** | **Hiện chỉ 179 trang trên staging** |

---

## PHẦN A: CHUYỂN DOMAIN STAGING → HOC.TRUONGVIETANH.COM

### Bước 1: Tạo DNS record mới (5 phút)

Vào Cloudflare Dashboard → DNS → truongvietanh.com:

Không cần tạo DNS record thủ công — Cloudflare Workers sẽ tự xử lý khi deploy.

### Bước 2: Cập nhật wrangler config (2 phút)

File `wrangler.staging.jsonc`:
```json
{
  "name": "truongvietanh-hoc",
  "main": "./src/staging-worker.js",
  "routes": [
    {
      "pattern": "truongvietanh.com/*",
      "zone_name": "truongvietanh.com"
    }
  ],
  ...
}
```

### Bước 3: Cập nhật .env và astro.config (2 phút)

```env
PUBLIC_SITE_URL=https://truongvietanh.com
```

### Bước 4: Deploy

```bash
npm run build && npx wrangler deploy -c wrangler.staging.jsonc
```

### Bước 5: Giữ staging.truongvietanh.com hoạt động song song

Không xóa staging — giữ cả 2 domain hoạt động cho đến khi hoc.* ổn định.

**Thời gian: 15 phút**

---

## PHẦN B: TẠO ROUTE CHO 552 BLOG POSTS (ƯU TIÊN CAO NHẤT)

Đây là việc quan trọng nhất — biến 179 trang thành 731 trang ngay lập tức.

### Bước 1: Tạo file `src/pages/blog/[slug].astro`

Route: `/blog/[slug]` (VD: `/blog/vuot-qua-ngai-ngung-khi-hoc-tieng-anh`)

Template cho mỗi blog post:
- Header (SiteHeader)
- Breadcrumb: Trang chủ > Blog > [Tiêu đề]
- H1: Tiêu đề bài viết
- Meta: Ngày đăng, Danh mục
- Nội dung HTML (từ Directus `content` field)
- Sidebar: TOC + CTA form + Related posts
- Bottom CTA: LeadFormTwoStepEmailFirst
- Schema: Article + BreadcrumbList
- Footer

### Bước 2: Cập nhật `/tin-tuc` (blog listing)

Fetch tất cả posts, phân trang (pagination), filter theo danh mục.

### Kết quả: +552 trang → Tổng 731 trang

**Thời gian: 2-3 giờ**

---

## PHẦN C: IMPORT 655 BÀI VIẾT CÒN LẠI

### Phân loại 1,207 markdown articles:

| Nhóm | Số lượng | Hành động |
|------|----------|-----------|
| Đã import vào Directus | 552 | ✅ Xong |
| Chưa import (có nội dung tốt) | ~400 | Import vào Directus posts |
| Trùng lặp / chất lượng thấp | ~100 | Bỏ qua, redirect 301 |
| Thực đơn / sự kiện cũ | ~155 | Bỏ qua, redirect 301 |

### Quy trình import:
1. Lọc 655 file markdown chưa import
2. Chuyển markdown → HTML
3. POST vào Directus /items/posts qua API
4. Build lại → +400 trang

### Kết quả: +400 trang → Tổng ~1,130 trang

**Thời gian: 3-4 giờ (tự động bằng script)**

---

## PHẦN D: VIẾT LẠI NỘI DUNG THEO CHUẨN SEO/AIO

### Phân chia 2 Giai đoạn:

---

### GIAI ĐOẠN 1: TRANG THIẾT YẾU (11 trang Pillar/Hub)

Đây là các trang phụ huynh **tìm kiếm nhiều nhất**, ảnh hưởng trực tiếp đến tuyển sinh.
Mỗi trang viết lại hoàn toàn theo blueprint HubSpot (2,000-3,500 từ).

| # | URL | Keyword mục tiêu | Từ mục tiêu | Trạng thái |
|---|-----|-------------------|-------------|-----------|
| 1 | ✅ `/gioi-thieu` | trường việt anh giới thiệu | 2,000 | ✅ ĐÃ XONG |
| 2 | `/mam-non` | trường mầm non tphcm song ngữ | 3,000 | ❌ Cần viết |
| 3 | `/tieu-hoc` | trường tiểu học song ngữ tphcm | 3,000 | ❌ Cần viết |
| 4 | `/trung-hoc-co-so` | trường thcs tư thục tphcm | 3,000 | ❌ Cần viết |
| 5 | `/trung-hoc-pho-thong` | trường thpt tư thục, rớt lớp 10 | 3,000 | ❌ Cần viết |
| 6 | `/hoc-phi` | học phí trường tư thục tphcm 2026 | 2,500 | ❌ Cần viết |
| 7 | `/tuyen-sinh` | tuyển sinh trường việt anh 2026 | 2,500 | ❌ Cần viết |
| 8 | `/lien-he` | liên hệ trường việt anh | 1,000 | ❌ Cần viết |
| 9 | `/co-so` | cơ sở trường việt anh | 2,000 | ❌ Cần viết |
| 10 | `/he-thong-pdr` | hệ thống PDR giáo dục | 2,000 | ❌ Cần viết |
| 11 | `/triet-ly-giao-duc` | triết lý giáo dục thực dụng | 2,000 | ❌ Cần viết |

**Cấu trúc mỗi trang GĐ1** (theo blueprint):
```
□ Hero + Form 2 bước (above fold)
□ Breadcrumb
□ Sticky TOC sidebar
□ 5-8 H2 dạng câu hỏi (AIO-optimized)
□ Bảng so sánh (comparison table)
□ Đánh giá phụ huynh (testimonials)
□ FAQ accordion (5-7 câu) + FAQPage schema
□ Bottom CTA form
□ Related content (3 blog cards)
□ Schema: EducationalOrganization + FAQPage + BreadcrumbList
□ Mobile sticky CTA bar
```

**Thời gian ước tính: 1-2 ngày (mỗi trang ~2-3 giờ với AI)**

---

### GIAI ĐOẠN 2: TRANG BỔ SUNG (19 trang)

| # | URL | Loại | Từ mục tiêu |
|---|-----|------|-------------|
| 12 | `/co-so/go-vap-phan-huy-ich` | Local SEO | 1,500 |
| 13 | `/co-so/mam-non-go-vap-le-duc-tho` | Local SEO | 1,500 |
| 14 | `/co-so/phu-nhuan-nguyen-trong-tuyen` | Local SEO | 1,500 |
| 15 | `/co-so/binh-tan-tinh-lo-10` | Local SEO | 1,500 |
| 16 | `/hoc-bong` | Subtopic | 1,500 |
| 17 | `/hoc-thu` | CTA Page | 1,000 |
| 18 | `/thanh-tich` | Subtopic | 1,500 |
| 19 | `/cap-hoc` | Hub Page | 1,200 |
| 20 | `/phu-huynh` | Hub Page | 1,500 |
| 21 | `/hinh-anh` | Gallery | 500 |
| 22 | `/tin-tuc` | Blog listing | Dynamic |
| 23 | `/tuyen-sinh/quy-trinh-tuyen-sinh` | Subtopic | 1,500 |
| 24 | `/tuyen-sinh/ho-so-nhap-hoc` | Subtopic | 1,200 |
| 25 | `/tuyen-sinh/lich-tuyen-sinh` | Subtopic | 1,000 |
| 26 | `/tuyen-sinh/dang-ky-tu-van` | CTA Page | 800 |
| 27 | `/tuyen-sinh/tham-quan-truong` | CTA Page | 1,000 |
| 28-30 | Long An + Kiên Giang campuses | Local SEO | 1,200 mỗi trang |

**Thời gian ước tính: 2-3 ngày**

---

## PHẦN E: TỐI ƯU 552 BLOG POSTS CHO SEO/AIO

Không viết lại từng bài, mà tối ưu TEMPLATE + batch update:

### Template blog post chuẩn SEO/AIO:
```
□ Title tag tối ưu: [Keyword] | Trường Việt Anh
□ Meta description có CTA
□ Schema: Article + BreadcrumbList
□ H1 = Title
□ Breadcrumb navigation
□ Table of Contents (auto-generate từ H2)
□ Inline CTA mỗi 500 từ
□ Related posts (3 bài cùng category)
□ Bottom CTA form (LeadFormTwoStepEmailFirst)
□ Author info (Trường Việt Anh)
□ Ngày đăng + ngày cập nhật
□ Social share buttons
□ Mobile sticky CTA
```

### Batch SEO update cho 552 posts:
1. Thêm meta description (auto-generate từ excerpt)
2. Thêm FAQ section cuối mỗi bài (auto-generate)
3. Thêm internal links (auto-detect keywords → link tới pillar pages)
4. Thêm CTA blocks (auto-insert sau mỗi 500 từ)

**Thời gian: 1 ngày (script tự động)**

---

## THỨ TỰ THỰC HIỆN (TIMELINE)

```
NGÀY 1 (Hôm nay)
├── ✅ A1-A5: Chuyển domain → truongvietanh.com (15 phút)
├── ✅ B1-B2: Tạo route blog/[slug].astro (2 giờ) → +552 trang
└── Deploy → truongvietanh.com có 731 trang

NGÀY 2-3
├── D-GĐ1: Viết lại 10 trang thiết yếu (mam-non, tieu-hoc, thcs, thpt,
│          hoc-phi, tuyen-sinh, lien-he, co-so, he-thong-pdr, triet-ly)
└── Deploy liên tục sau mỗi trang

NGÀY 4
├── C: Import 400 bài viết còn lại → +400 trang → Tổng ~1,130 trang
├── E: Tối ưu template blog + batch update 552 posts
└── Deploy → truongvietanh.com có ~1,130 trang

NGÀY 5-7
├── D-GĐ2: Viết 19 trang bổ sung
├── SEO: Submit sitemap, Google Search Console
├── Analytics: Cài GTM + GA4
└── Test toàn diện

NGÀY 8+
├── Go live: Chuyển truongvietanh.com → truongvietanh.com
├── Monitor: Theo dõi rankings, traffic, leads
└── Tắt WordPress hosting cũ
```

---

## TỔNG KẾT SỐ TRANG CUỐI CÙNG

| Loại trang | Số lượng | Template |
|------------|----------|---------|
| Trang chủ | 1 | Custom Astro |
| Pillar Pages (GĐ1) | 11 | Blueprint HubSpot |
| Trang bổ sung (GĐ2) | 19 | Blueprint HubSpot (compact) |
| Blog posts (Directus) | 950+ | Blog template chuẩn SEO |
| Landing/Squeeze pages | 67 | SqueezePageLayout |
| **TỔNG** | **~1,050 trang** | |
| Redirect 301 | 430 | _redirects file |

---

## CHI PHÍ HẠ TẦNG (KHÔNG ĐỔI)

| Dịch vụ | Chi phí |
|---------|---------|
| Cloudflare Workers (deploy) | Miễn phí (100K requests/ngày) |
| Cloudflare R2 (hình ảnh) | Miễn phí (10GB, 10M reads) |
| Contabo VPS (Directus CMS) | Đã có sẵn |
| Domain truongvietanh.com | Đã có sẵn |
| **Tổng thêm** | **$0/tháng** |
