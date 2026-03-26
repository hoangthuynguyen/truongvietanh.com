# KIẾN TRÚC WEBSITE TRUONGVIETANH.COM — PRODUCTION-READY v2.0

## Cognitive Enrollment Growth & Revenue OS | Tháng 3/2026

> Website = **Enrollment Engine + SEO Machine + Conversion Machine**
> Template-driven: 16 Template Classes + ~30 UI Blocks + Directus + Astro

---

# 1. NGUYÊN TẮC KIẾN TRÚC

Website đồng thời làm 5 việc:

1. **Trang thương hiệu chính thức**
2. **Cỗ máy SEO** — organic traffic
3. **Cỗ máy chuyển đổi** — Google Ads / Meta / Zalo / TikTok
4. **Trung tâm Local SEO** — cho từng cơ sở
5. **Front-end nhẹ, nhanh** — Astro + Directus (<1.5s mobile VN)

5 nhóm URL: Brand/Core · Level/Program · Campus/Local · Admissions/Conversion · Content/SEO

---

# 2. HẠ TẦNG

| Thành phần | Công nghệ                                        |
| ---------- | ------------------------------------------------ |
| Frontend   | Astro (SSG, Islands)                             |
| Deploy     | Cloudflare Pages                                 |
| CMS        | Directus                                         |
| Media      | Cloudflare R2 (`media.truongvietanh.com`)        |
| Tracking   | GTM + GA4 + Meta Pixel + TikTok Pixel + Zalo/GHL |
| CRM        | GoHighLevel                                      |

Subdomains: `staging.` (test) · `cms.` (Directus admin) · `api.` (Directus API) · `media.` (R2 CDN)

---

# 3. DANH SÁCH CƠ SỞ (7 CAMPUS)

| #   | Campus                         | Slug                           | Cấp học        | Khu vực         |
| --- | ------------------------------ | ------------------------------ | -------------- | --------------- |
| 1   | Gò Vấp – Phan Huy Ích          | `go-vap-phan-huy-ich`          | TH, THCS, THPT | TPHCM Gò Vấp    |
| 2   | Phú Nhuận – Nguyễn Trọng Tuyển | `phu-nhuan-nguyen-trong-tuyen` | TH, THCS, THPT | TPHCM Phú Nhuận |
| 3   | Bình Tân – Tỉnh Lộ 10          | `binh-tan-tinh-lo-10`          | TH, THCS, THPT | TPHCM Bình Tân  |
| 4   | Mầm Non Gò Vấp – Lê Đức Thọ    | `mam-non-go-vap-le-duc-tho`    | MN             | TPHCM Gò Vấp    |
| 5   | Nhân Lễ – Cần Giuộc            | `nhan-le-can-giuoc`            | MN, TH         | Long An         |
| 6   | Thái Sơn – Long Hậu            | `thai-son-long-hau`            | MN, TH         | Long An         |
| 7   | Mekong Xanh – Rạch Giá         | `mekong-xanh-rach-gia`         | MN, TH         | Kiên Giang      |

---

# 4. SITEMAP ĐẦY ĐỦ — TẤT CẢ PAGES

## A. TRANG LÕI THƯƠNG HIỆU (8 trang)

| #   | URL                        | Vai trò                                     |
| --- | -------------------------- | ------------------------------------------- |
| 1   | `/`                        | Homepage — brand flagship, funnel router    |
| 2   | `/gioi-thieu`              | Corporate page — lịch sử, sứ mệnh, tầm nhìn |
| 3   | `/triet-ly-giao-duc`       | Thought leadership — "Vui vẻ và Thực dụng"  |
| 4   | `/he-thong-pdr`            | Signature pillar — Plan · Do · Review       |
| 5   | `/cam-ket-dau-ra-ielts-60` | Authority moat — IELTS commitment           |
| 6   | `/gia-tri-cot-loi`         | Core values page                            |
| 7   | `/doi-ngu`                 | Giáo viên bản ngữ + đội ngũ                 |
| 8   | `/he-sinh-thai-viet-anh`   | Hub liên cấp + co-branding sub-brands       |

---

## B. TRANG CẤP HỌC — PILLAR PAGES (20 trang)

### B1. Pillar chính (4 trang)

| #   | URL                    | Target keyword                           |
| --- | ---------------------- | ---------------------------------------- |
| 1   | `/mam-non`             | trường mầm non song ngữ tphcm            |
| 2   | `/tieu-hoc`            | trường tiểu học song ngữ tphcm           |
| 3   | `/trung-hoc-co-so`     | trường THCS tư thục chất lượng cao tphcm |
| 4   | `/trung-hoc-pho-thong` | trường THPT chuyên Anh tphcm             |

### B2. Trang con theo cấp (16 trang)

| Cấp                 | `/[cap]/chuong-trinh` | `/[cap]/hoc-phi` | `/[cap]/tuyen-sinh` hoặc `/[cap]/hoc-thu` | `/[cap]/cau-hoi-thuong-gap` | `/[cap]/co-so-phu-hop` |
| ------------------- | --------------------- | ---------------- | ----------------------------------------- | --------------------------- | ---------------------- |
| mam-non             | ✓                     | ✓                | `/mam-non/hoc-thu`                        | ✓                           | ✓                      |
| tieu-hoc            | ✓                     | ✓                | `/tieu-hoc/tuyen-sinh`                    | ✓                           | ✓                      |
| trung-hoc-co-so     | ✓                     | ✓                | `/trung-hoc-co-so/tuyen-sinh`             | ✓                           | ✓                      |
| trung-hoc-pho-thong | ✓                     | ✓                | `/trung-hoc-pho-thong/tuyen-sinh`         | ✓                           | ✓                      |

---

## C. TRANG CƠ SỞ — LOCAL SEO (8 trang)

| #   | URL                                   | Campus                           |
| --- | ------------------------------------- | -------------------------------- |
| 1   | `/co-so`                              | Hub campus finder (map + filter) |
| 2   | `/co-so/go-vap-phan-huy-ich`          | CS Gò Vấp – TH/THCS/THPT         |
| 3   | `/co-so/phu-nhuan-nguyen-trong-tuyen` | CS Phú Nhuận                     |
| 4   | `/co-so/binh-tan-tinh-lo-10`          | CS Bình Tân                      |
| 5   | `/co-so/mam-non-go-vap-le-duc-tho`    | CS Mầm Non Gò Vấp                |
| 6   | `/co-so/nhan-le-can-giuoc`            | CS Nhân Lễ – Long An             |
| 7   | `/co-so/thai-son-long-hau`            | CS Thái Sơn – Long An            |
| 8   | `/co-so/mekong-xanh-rach-gia`         | CS Mekong Xanh – Kiên Giang      |

---

## D. HỆ SINH THÁI SUB-BRAND (3 trang)

| #   | URL                         | Sub-brand          |
| --- | --------------------------- | ------------------ |
| 1   | `/he-sinh-thai/thai-son`    | Trường Thái Sơn    |
| 2   | `/he-sinh-thai/mekong-xanh` | Trường Mekong Xanh |
| 3   | `/he-sinh-thai/nhan-le`     | Trường Nhân Lễ     |

---

## E. TRANG TUYỂN SINH / CHUYỂN ĐỔI LÕI (10 trang)

| #   | URL                                | Vai trò                  |
| --- | ---------------------------------- | ------------------------ |
| 1   | `/tuyen-sinh`                      | Admissions hub           |
| 2   | `/tuyen-sinh/quy-trinh-tuyen-sinh` | Quy trình step-by-step   |
| 3   | `/tuyen-sinh/lich-tuyen-sinh`      | Lịch tuyển sinh năm      |
| 4   | `/tuyen-sinh/ho-so-nhap-hoc`       | Hồ sơ cần chuẩn bị       |
| 5   | `/tuyen-sinh/assessment-day`       | Assessment Day hub       |
| 6   | `/hoc-phi`                         | Money page — hub học phí |
| 7   | `/hoc-bong`                        | Học bổng hub             |
| 8   | `/dang-ky-tu-van`                  | Central conversion form  |
| 9   | `/tham-quan-truong`                | Tour booking             |
| 10  | `/lien-he`                         | Contact page             |

---

## F. TRANG HỌC PHÍ CHI TIẾT (6 trang)

| #   | URL                            |
| --- | ------------------------------ |
| 1   | `/hoc-phi/mam-non`             |
| 2   | `/hoc-phi/tieu-hoc`            |
| 3   | `/hoc-phi/trung-hoc-co-so`     |
| 4   | `/hoc-phi/trung-hoc-pho-thong` |
| 5   | `/hoc-phi/chinh-sach-uu-dai`   |
| 6   | `/hoc-phi/edu-finance`         |

---

## G. TRANG HỌC BỔNG CHI TIẾT (4 trang)

| #   | URL                             |
| --- | ------------------------------- |
| 1   | `/hoc-bong/hoc-bong-chuyen-anh` |
| 2   | `/hoc-bong/hoc-bong-som`        |
| 3   | `/hoc-bong/hoc-bong-anh-chi-em` |
| 4   | `/hoc-bong/dieu-kien-xet`       |

---

## H. TRANG SỰ KIỆN / SEASONAL (3 trang)

| #   | URL                           |
| --- | ----------------------------- |
| 1   | `/open-day`                   |
| 2   | `/summer-camp`                |
| 3   | `/success-stories-pdr-review` |

---

## I. TRANG PHÁP LÝ (4 trang)

| #   | URL                      |
| --- | ------------------------ |
| 1   | `/chinh-sach-bao-mat`    |
| 2   | `/dieu-khoan-su-dung`    |
| 3   | `/chinh-sach-tuyen-sinh` |
| 4   | `/chinh-sach-hoc-phi`    |

---

## J. PHỤ HUYNH HUB — THOUGHT LEADERSHIP (10+ trang)

| #   | URL                                        | Chủ đề                     |
| --- | ------------------------------------------ | -------------------------- |
| 1   | `/phu-huynh/cach-chon-truong-mam-non`      | Hướng dẫn chọn trường MN   |
| 2   | `/phu-huynh/chuan-bi-vao-lop-1`            | Chuẩn bị cho con vào lớp 1 |
| 3   | `/phu-huynh/dong-hanh-cung-con-tu-chu`     | Nuôi dạy tự chủ            |
| 4   | `/phu-huynh/hoc-tieng-anh-hieu-qua`        | Phương pháp học tiếng Anh  |
| 5   | `/phu-huynh/ky-nang-the-ky-21`             | 16 kỹ năng thế kỷ 21       |
| 6   | `/phu-huynh/hanh-trinh-phat-trien-cua-con` | Phát triển toàn diện       |
| 7   | `/phu-huynh/vi-sao-hoc-sinh-can-pdr`       | Giải thích PDR cho PH      |
| 8   | `/phu-huynh/nuoi-day-su-tu-chu`            | Tự lập từ mầm non          |
| 9   | `/phu-huynh/dinh-huong-du-hoc`             | Lộ trình du học            |
| 10  | `/phu-huynh/tam-ly-hoc-duong`              | Tâm lý HS các cấp          |

---

# 5. LANDING PAGES — DANH SÁCH ĐẦY ĐỦ

Tất cả đặt dưới `/tuyen-sinh/[slug]`. Chia 5 họ:

## 5.1 Landing CẤP HỌC + CƠ SỞ (28 trang)

Ma trận: mỗi campus × mỗi cấp học tại campus đó

| #   | URL                                         | Cấp  | Campus           |
| --- | ------------------------------------------- | ---- | ---------------- |
| 1   | `/tuyen-sinh/mam-non-go-vap-le-duc-tho`     | MN   | MN GV Lê Đức Thọ |
| 2   | `/tuyen-sinh/mam-non-nhan-le-can-giuoc`     | MN   | Nhân Lễ          |
| 3   | `/tuyen-sinh/mam-non-thai-son-long-hau`     | MN   | Thái Sơn         |
| 4   | `/tuyen-sinh/mam-non-mekong-xanh-rach-gia`  | MN   | Mekong Xanh      |
| 5   | `/tuyen-sinh/tieu-hoc-go-vap-phan-huy-ich`  | TH   | GV Phan Huy Ích  |
| 6   | `/tuyen-sinh/tieu-hoc-phu-nhuan`            | TH   | Phú Nhuận        |
| 7   | `/tuyen-sinh/tieu-hoc-binh-tan`             | TH   | Bình Tân         |
| 8   | `/tuyen-sinh/tieu-hoc-nhan-le-can-giuoc`    | TH   | Nhân Lễ          |
| 9   | `/tuyen-sinh/tieu-hoc-thai-son-long-hau`    | TH   | Thái Sơn         |
| 10  | `/tuyen-sinh/tieu-hoc-mekong-xanh-rach-gia` | TH   | Mekong Xanh      |
| 11  | `/tuyen-sinh/thcs-go-vap-phan-huy-ich`      | THCS | GV Phan Huy Ích  |
| 12  | `/tuyen-sinh/thcs-phu-nhuan`                | THCS | Phú Nhuận        |
| 13  | `/tuyen-sinh/thcs-binh-tan`                 | THCS | Bình Tân         |
| 14  | `/tuyen-sinh/thpt-go-vap-phan-huy-ich`      | THPT | GV Phan Huy Ích  |
| 15  | `/tuyen-sinh/thpt-phu-nhuan`                | THPT | Phú Nhuận        |
| 16  | `/tuyen-sinh/thpt-binh-tan`                 | THPT | Bình Tân         |

## 5.2 Landing HỌC PHÍ (10 trang)

| #   | URL                                      |
| --- | ---------------------------------------- |
| 1   | `/tuyen-sinh/hoc-phi-mam-non-go-vap`     |
| 2   | `/tuyen-sinh/hoc-phi-mam-non-can-giuoc`  |
| 3   | `/tuyen-sinh/hoc-phi-mam-non-rach-gia`   |
| 4   | `/tuyen-sinh/hoc-phi-tieu-hoc-go-vap`    |
| 5   | `/tuyen-sinh/hoc-phi-tieu-hoc-phu-nhuan` |
| 6   | `/tuyen-sinh/hoc-phi-tieu-hoc-binh-tan`  |
| 7   | `/tuyen-sinh/hoc-phi-thcs-go-vap`        |
| 8   | `/tuyen-sinh/hoc-phi-thcs-phu-nhuan`     |
| 9   | `/tuyen-sinh/hoc-phi-thpt-go-vap`        |
| 10  | `/tuyen-sinh/hoc-phi-thpt-binh-tan`      |

## 5.3 Landing SỰ KIỆN (14 trang)

| #   | URL                                      | Loại        |
| --- | ---------------------------------------- | ----------- |
| 1   | `/tuyen-sinh/open-day-mam-non-go-vap`    | Open Day    |
| 2   | `/tuyen-sinh/open-day-tieu-hoc-go-vap`   | Open Day    |
| 3   | `/tuyen-sinh/open-day-phu-nhuan`         | Open Day    |
| 4   | `/tuyen-sinh/open-day-binh-tan`          | Open Day    |
| 5   | `/tuyen-sinh/open-day-can-giuoc`         | Open Day    |
| 6   | `/tuyen-sinh/hoc-thu-mam-non-go-vap`     | Trial Class |
| 7   | `/tuyen-sinh/hoc-thu-tieu-hoc-go-vap`    | Trial Class |
| 8   | `/tuyen-sinh/hoc-thu-phu-nhuan`          | Trial Class |
| 9   | `/tuyen-sinh/summer-camp-go-vap-2026`    | Summer Camp |
| 10  | `/tuyen-sinh/summer-camp-phu-nhuan-2026` | Summer Camp |
| 11  | `/tuyen-sinh/summer-camp-binh-tan-2026`  | Summer Camp |
| 12  | `/tuyen-sinh/summer-camp-can-giuoc-2026` | Summer Camp |
| 13  | `/tuyen-sinh/assessment-day-go-vap`      | Assessment  |
| 14  | `/tuyen-sinh/assessment-day-phu-nhuan`   | Assessment  |

## 5.4 Landing LOCAL ADJACENCY (20+ trang)

Target phụ huynh tìm trường gần nhà — SEO local mạnh

| #   | URL                                          | Khu vực target         |
| --- | -------------------------------------------- | ---------------------- |
| 1   | `/tuyen-sinh/mam-non-gan-an-hoi-tay`         | Ấn Hội Tây, Gò Vấp     |
| 2   | `/tuyen-sinh/mam-non-gan-an-hoi-dong`        | Ấn Hội Đông, Gò Vấp    |
| 3   | `/tuyen-sinh/mam-non-gan-quang-trung-go-vap` | Quang Trung, Gò Vấp    |
| 4   | `/tuyen-sinh/mam-non-gan-quan-12`            | Quận 12                |
| 5   | `/tuyen-sinh/mam-non-gan-tan-binh`           | Tân Bình               |
| 6   | `/tuyen-sinh/mam-non-gan-cityland-go-vap`    | Cityland, Gò Vấp       |
| 7   | `/tuyen-sinh/mam-non-gan-le-van-tho`         | Lê Văn Thọ, Gò Vấp     |
| 8   | `/tuyen-sinh/mam-non-gan-pham-van-chieu`     | Phạm Văn Chiêu, Gò Vấp |
| 9   | `/tuyen-sinh/tieu-hoc-gan-phan-huy-ich`      | Phan Huy Ích, Gò Vấp   |
| 10  | `/tuyen-sinh/tieu-hoc-gan-le-duc-tho`        | Lê Đức Thọ, Gò Vấp     |
| 11  | `/tuyen-sinh/tieu-hoc-gan-truong-chinh`      | Trường Chinh, Tân Bình |
| 12  | `/tuyen-sinh/thcs-gan-nguyen-trong-tuyen`    | Nguyễn Trọng Tuyển, PN |
| 13  | `/tuyen-sinh/thcs-gan-hoang-van-thu`         | Hoàng Văn Thụ, PN      |
| 14  | `/tuyen-sinh/thpt-gan-tinh-lo-10`            | Tỉnh Lộ 10, Bình Tân   |
| 15  | `/tuyen-sinh/thpt-gan-binh-tri-dong`         | Bình Trị Đông, BT      |
| 16  | `/tuyen-sinh/truong-tu-thuc-go-vap`          | Gò Vấp chung           |
| 17  | `/tuyen-sinh/truong-tu-thuc-phu-nhuan`       | Phú Nhuận chung        |
| 18  | `/tuyen-sinh/truong-tu-thuc-binh-tan`        | Bình Tân chung         |
| 19  | `/tuyen-sinh/truong-tu-thuc-can-giuoc`       | Cần Giuộc, Long An     |
| 20  | `/tuyen-sinh/truong-tu-thuc-rach-gia`        | Rạch Giá, Kiên Giang   |

## 5.5 Landing CAMPAIGN / OFFER (12 trang)

| #   | URL                                            | Campaign          |
| --- | ---------------------------------------------- | ----------------- |
| 1   | `/tuyen-sinh/hoc-bong-mam-non-2026`            | Học bổng MN       |
| 2   | `/tuyen-sinh/hoc-bong-tieu-hoc-2026`           | Học bổng TH       |
| 3   | `/tuyen-sinh/hoc-bong-thcs-2026`               | Học bổng THCS     |
| 4   | `/tuyen-sinh/hoc-bong-thpt-2026`               | Học bổng THPT     |
| 5   | `/tuyen-sinh/hoc-bong-chuyen-anh-2026`         | HB Chuyên Anh     |
| 6   | `/tuyen-sinh/hoc-bong-anh-chi-em-2026`         | HB Anh chị em     |
| 7   | `/tuyen-sinh/uu-dai-dang-ky-som-2026`          | Ưu đãi early bird |
| 8   | `/tuyen-sinh/truong-tu-thuc-chat-luong-cao`    | Generic brand     |
| 9   | `/tuyen-sinh/truong-song-ngu-quoc-te-tphcm`    | Generic brand     |
| 10  | `/tuyen-sinh/chuong-trinh-tieng-anh-cambridge` | Chương trình Anh  |
| 11  | `/tuyen-sinh/lop-tang-cuong-tieng-anh`         | Tăng cường Anh    |
| 12  | `/tuyen-sinh/dang-ky-tham-quan-truong`         | Tour generic      |

**Tổng landing pages: ~84 trang** (mở rộng thêm theo campaign)

---

# 6. HỆ THỐNG BLOG — 11 CLUSTER × 410 URLs NĂM 1 → 1,060 NĂM 3

> **📄 DANH SÁCH ĐẦY ĐỦ 410 URLs**: xem [`docs/blog-url-inventory.md`](./blog-url-inventory.md)
> **📅 KẾ HOẠCH TRIỂN KHAI 12 THÁNG**: xem [`docs/content-deployment-plan.md`](./content-deployment-plan.md)

## Cấu trúc: `/blog/[cluster]/[slug]`

Directus tự sinh URL. Dưới đây là **danh sách bài mẫu cho mỗi cluster** (mỗi cluster target 30-100+ bài trong năm đầu, xem file inventory để có danh sách đầy đủ từng URL):

---

### CLUSTER 1: `/blog/mam-non/` — Mầm Non (50+ bài)

| #     | Slug                                         | Keyword target          |
| ----- | -------------------------------------------- | ----------------------- |
| 1     | `may-tuoi-di-hoc-mam-non`                    | mấy tuổi đi học mầm non |
| 2     | `tre-khoc-khi-di-hoc-mam-non-phai-lam-sao`   | trẻ khóc mầm non        |
| 3     | `cach-chon-truong-mam-non-cho-con`           | chọn trường mầm non     |
| 4     | `truong-mam-non-song-ngu-la-gi`              | mầm non song ngữ là gì  |
| 5     | `so-sanh-mam-non-song-ngu-va-quoc-te`        | so sánh mầm non         |
| 6     | `hoc-phi-mam-non-song-ngu-tphcm`             | học phí mầm non tphcm   |
| 7     | `chi-phi-mam-non-tu-thuc-tphcm-2026`         | chi phí mầm non tư thục |
| 8     | `be-3-tuoi-hoc-duoc-gi-o-truong-mam-non`     | bé 3 tuổi học gì        |
| 9     | `be-4-tuoi-hoc-duoc-gi-o-truong`             | bé 4 tuổi học gì        |
| 10    | `chuong-trinh-mam-non-song-ngu-gom-nhung-gi` | chương trình mầm non    |
| 11    | `loi-ich-cho-tre-hoc-tieng-anh-som`          | tiếng Anh sớm           |
| 12    | `mam-non-go-vap-nen-chon-truong-nao`         | mầm non gò vấp          |
| 13    | `mam-non-phu-nhuan-tot-nhat`                 | mầm non phú nhuận       |
| 14    | `mam-non-binh-tan-chat-luong`                | mầm non bình tân        |
| 15    | `mam-non-can-giuoc-long-an`                  | mầm non cần giuộc       |
| 16    | `mam-non-rach-gia-kien-giang`                | mầm non rạch giá        |
| 17    | `tre-nho-can-hoc-nhung-ky-nang-gi`           | kỹ năng trẻ mầm non     |
| 18    | `phuong-phap-montessori-la-gi`               | montessori              |
| 19    | `phuong-phap-steam-cho-mam-non`              | STEAM mầm non           |
| 20    | `mam-non-ban-tru-khac-gi-noi-tru`            | bán trú vs nội trú      |
| 21    | `xe-dua-don-mam-non-an-toan`                 | xe đưa đón mầm non      |
| 22    | `thuc-don-dinh-duong-mam-non`                | thực đơn mầm non        |
| 23    | `giup-tre-lam-quen-truong-mam-non-moi`       | thích nghi mầm non      |
| 24    | `danh-gia-truong-mam-non-viet-anh`           | đánh giá Việt Anh MN    |
| 25    | `truong-mam-non-co-ho-boi-tphcm`             | mầm non có hồ bơi       |
| 26–50 | _(mở rộng theo keyword research)_            | —                       |

---

### CLUSTER 2: `/blog/tieu-hoc/` — Tiểu Học (50+ bài)

| #     | Slug                                       | Keyword target         |
| ----- | ------------------------------------------ | ---------------------- |
| 1     | `chuan-bi-vao-lop-1-can-nhung-gi`          | chuẩn bị lớp 1         |
| 2     | `chuong-trinh-tieu-hoc-song-ngu-la-gi`     | tiểu học song ngữ      |
| 3     | `lo-trinh-tieng-anh-cho-hoc-sinh-tieu-hoc` | lộ trình tiếng Anh TH  |
| 4     | `hoc-phi-tieu-hoc-tu-thuc-tphcm`           | học phí tiểu học tphcm |
| 5     | `truong-tieu-hoc-nao-tot-tai-tphcm`        | trường TH tốt tphcm    |
| 6     | `cach-giup-con-tu-hoc-o-tieu-hoc`          | tự học tiểu học        |
| 7     | `tieu-hoc-song-ngu-khac-gi-quoc-te`        | song ngữ vs quốc tế    |
| 8     | `tieu-hoc-go-vap-truong-nao-tot`           | tiểu học gò vấp        |
| 9     | `tieu-hoc-phu-nhuan-chat-luong`            | tiểu học phú nhuận     |
| 10    | `tieu-hoc-binh-tan-truong-nao-chon`        | tiểu học bình tân      |
| 11    | `ky-nang-doc-viet-cho-hoc-sinh-lop-1`      | kỹ năng lớp 1          |
| 12    | `chuong-trinh-icdl-cho-tieu-hoc`           | ICDL tiểu học          |
| 13    | `hoat-dong-ngoai-khoa-tieu-hoc`            | ngoại khóa tiểu học    |
| 14    | `hoc-sinh-tieu-hoc-nen-hoc-ielts-chua`     | IELTS tiểu học         |
| 15    | `danh-gia-truong-tieu-hoc-viet-anh`        | đánh giá Việt Anh TH   |
| 16–50 | _(mở rộng)_                                | —                      |

---

### CLUSTER 3: `/blog/trung-hoc-co-so/` — THCS (40+ bài)

| #     | Slug                                       | Keyword target      |
| ----- | ------------------------------------------ | ------------------- |
| 1     | `chuong-trinh-thcs-chat-luong-cao-la-gi`   | THCS chất lượng cao |
| 2     | `cach-hoc-tot-tieng-anh-o-thcs`            | tiếng Anh THCS      |
| 3     | `ky-nang-tu-hoc-cho-hoc-sinh-cap-2`        | tự học cấp 2        |
| 4     | `ielts-cho-hoc-sinh-cap-2-bat-dau-tu-dau`  | IELTS cấp 2         |
| 5     | `lo-trinh-hoc-tieng-anh-cho-hoc-sinh-thcs` | lộ trình Anh THCS   |
| 6     | `truong-thcs-tu-thuc-go-vap`               | THCS gò vấp         |
| 7     | `truong-thcs-tu-thuc-phu-nhuan`            | THCS phú nhuận      |
| 8     | `truong-thcs-tu-thuc-binh-tan`             | THCS bình tân       |
| 9     | `chon-truong-cap-2-cho-con-can-biet-gi`    | chọn trường cấp 2   |
| 10    | `phuong-phap-pdr-cho-hoc-sinh-thcs`        | PDR THCS            |
| 11    | `hoc-sinh-thcs-nen-hoc-nhung-ky-nang-gi`   | kỹ năng THCS        |
| 12    | `critical-thinking-cho-hoc-sinh-cap-2`     | tư duy phản biện    |
| 13    | `chuong-trinh-cambridge-thcs`              | Cambridge THCS      |
| 14    | `danh-gia-truong-thcs-viet-anh`            | đánh giá THCS VA    |
| 15–40 | _(mở rộng)_                                | —                   |

---

### CLUSTER 4: `/blog/trung-hoc-pho-thong/` — THPT (40+ bài)

| #     | Slug                                       | Keyword target   |
| ----- | ------------------------------------------ | ---------------- |
| 1     | `truong-thpt-chuyen-anh-chat-luong-cao`    | THPT chuyên Anh  |
| 2     | `lo-trinh-hoc-thuat-thpt-viet-anh`         | lộ trình THPT    |
| 3     | `chuan-bi-vao-dai-hoc-tu-bac-thpt`         | chuẩn bị đại học |
| 4     | `dat-ielts-6-khi-tot-nghiep-thpt`          | IELTS 6 THPT     |
| 5     | `du-hoc-sau-thpt-can-chuan-bi-gi`          | du học sau THPT  |
| 6     | `truong-thpt-tu-thuc-go-vap`               | THPT gò vấp      |
| 7     | `truong-thpt-tu-thuc-phu-nhuan`            | THPT phú nhuận   |
| 8     | `truong-thpt-tu-thuc-binh-tan`             | THPT bình tân    |
| 9     | `hoc-sinh-viet-anh-dat-ielts-cao`          | thành tích IELTS |
| 10    | `chuong-trinh-cambridge-thpt`              | Cambridge THPT   |
| 11    | `dinh-huong-nghe-nghiep-cho-hoc-sinh-thpt` | định hướng nghề  |
| 12    | `ky-nang-lanh-dao-cho-hoc-sinh-thpt`       | lãnh đạo THPT    |
| 13    | `so-sanh-truong-thpt-tu-thuc-tphcm`        | so sánh THPT     |
| 14    | `danh-gia-truong-thpt-viet-anh`            | đánh giá THPT VA |
| 15–40 | _(mở rộng)_                                | —                |

---

### CLUSTER 5: `/blog/hoc-phi/` — Học Phí & Tài Chính (30+ bài)

| #     | Slug                                    | Keyword target       |
| ----- | --------------------------------------- | -------------------- |
| 1     | `hoc-phi-truong-tu-thuc-tphcm-2026`     | học phí tư thục 2026 |
| 2     | `bang-hoc-phi-truong-quoc-te-tphcm`     | học phí quốc tế      |
| 3     | `so-sanh-hoc-phi-truong-tu-thuc-tphcm`  | so sánh học phí      |
| 4     | `hoc-phi-truong-song-ngu-gom-nhung-gi`  | cấu thành học phí    |
| 5     | `cach-tinh-toan-chi-phi-hoc-tu-thuc`    | tính toán chi phí    |
| 6     | `co-nen-cho-con-hoc-truong-tu-thuc`     | có nên trường tư     |
| 7     | `chinh-sach-hoc-bong-truong-tu-thuc`    | chính sách học bổng  |
| 8     | `dieu-kien-xin-hoc-bong-truong-tu-thuc` | điều kiện học bổng   |
| 9     | `tai-chinh-giao-duc-cho-phu-huynh`      | tài chính giáo dục   |
| 10    | `hoc-phi-mam-non-song-ngu-bao-nhieu`    | học phí MN song ngữ  |
| 11–30 | _(mở rộng)_                             | —                    |

---

### CLUSTER 6: `/blog/ky-nang/` — Kỹ Năng Thế Kỷ 21 (30+ bài)

| #     | Slug                                    | Keyword           |
| ----- | --------------------------------------- | ----------------- |
| 1     | `16-ky-nang-the-ky-21-la-gi`            | kỹ năng thế kỷ 21 |
| 2     | `ky-nang-tu-duy-phan-bien-cho-hoc-sinh` | tư duy phản biện  |
| 3     | `ky-nang-giao-tiep-cho-tre`             | giao tiếp         |
| 4     | `ky-nang-lam-viec-nhom-cho-hoc-sinh`    | teamwork          |
| 5     | `ky-nang-lanh-dao-hoc-sinh-ren-tu-som`  | lãnh đạo          |
| 6     | `ky-nang-quan-ly-thoi-gian-cho-tre`     | quản lý thời gian |
| 7     | `ky-nang-tai-chinh-cho-hoc-sinh`        | tài chính cho HS  |
| 8     | `giai-quyet-van-de-cho-hoc-sinh`        | giải quyết vấn đề |
| 9     | `cong-dan-thoi-dai-so-la-gi`            | công dân số       |
| 10    | `mindfulness-tinh-thuc-hoc-duong`       | mindfulness       |
| 11–30 | _(mở rộng)_                             | —                 |

---

### CLUSTER 7: `/blog/tieng-anh/` — Tiếng Anh & IELTS (40+ bài)

| #     | Slug                                           | Keyword             |
| ----- | ---------------------------------------------- | ------------------- |
| 1     | `lo-trinh-hoc-tieng-anh-tu-mam-non-den-thpt`   | lộ trình tiếng Anh  |
| 2     | `chuong-trinh-cambridge-cho-hoc-sinh-viet-nam` | Cambridge VN        |
| 3     | `ielts-la-gi-va-vi-sao-quan-trong`             | IELTS là gì         |
| 4     | `cach-dat-ielts-60-khi-con-o-cap-3`            | IELTS 6.0           |
| 5     | `hoc-tieng-anh-voi-giao-vien-ban-ngu`          | giáo viên bản ngữ   |
| 6     | `tieng-anh-mam-non-bat-dau-tu-dau`             | tiếng Anh mầm non   |
| 7     | `tieng-anh-tieu-hoc-phuong-phap-hieu-qua`      | tiếng Anh tiểu học  |
| 8     | `tieng-anh-thcs-lo-trinh-len-ielts`            | tiếng Anh THCS      |
| 9     | `cach-giup-con-yeu-thich-tieng-anh`            | yêu thích tiếng Anh |
| 10    | `so-sanh-cambridge-ielts-toefl`                | so sánh chứng chỉ   |
| 11–40 | _(mở rộng)_                                    | —                   |

---

### CLUSTER 8: `/blog/phu-huynh-can-biet/` — Phụ Huynh (30+ bài)

| #     | Slug                                      | Keyword                 |
| ----- | ----------------------------------------- | ----------------------- |
| 1     | `phu-huynh-can-chuan-bi-gi-khi-nhap-hoc`  | chuẩn bị nhập học       |
| 2     | `kinh-nghiem-chon-truong-cho-con`         | kinh nghiệm chọn trường |
| 3     | `lam-sao-biet-truong-tu-co-tot-khong`     | đánh giá trường tư      |
| 4     | `nhung-dieu-can-hoi-khi-tham-quan-truong` | hỏi khi tham quan       |
| 5     | `day-con-tu-lap-tu-mam-non`               | dạy con tự lập          |
| 6     | `dong-hanh-cung-con-trong-hoc-tap`        | đồng hành học tập       |
| 7     | `tam-ly-hoc-sinh-chuyen-cap`              | tâm lý chuyển cấp       |
| 8     | `cach-tao-thoi-quen-doc-sach-cho-con`     | thói quen đọc sách      |
| 9     | `xu-ly-khi-con-khong-muon-di-hoc`         | con không muốn học      |
| 10    | `co-nen-cho-con-hoc-them-ngoai-truong`    | học thêm                |
| 11–30 | _(mở rộng)_                               | —                       |

---

### CLUSTER 9: `/blog/review-so-sanh/` — Review & So Sánh (20+ bài)

| #     | Slug                                  | Keyword             |
| ----- | ------------------------------------- | ------------------- |
| 1     | `so-sanh-truong-tu-thuc-go-vap`       | so sánh GV          |
| 2     | `so-sanh-truong-tu-thuc-phu-nhuan`    | so sánh PN          |
| 3     | `so-sanh-truong-tu-thuc-binh-tan`     | so sánh BT          |
| 4     | `top-truong-mam-non-song-ngu-tphcm`   | top mầm non         |
| 5     | `top-truong-tieu-hoc-song-ngu-tphcm`  | top tiểu học        |
| 6     | `top-truong-thcs-tu-thuc-tphcm`       | top THCS            |
| 7     | `top-truong-thpt-tu-thuc-tphcm`       | top THPT            |
| 8     | `truong-tu-thuc-vs-truong-cong-lap`   | tư thục vs công     |
| 9     | `truong-song-ngu-vs-truong-quoc-te`   | song ngữ vs quốc tế |
| 10    | `viet-anh-vs-cac-truong-tu-thuc-khac` | Việt Anh vs đối thủ |
| 11–20 | _(mở rộng)_                           | —                   |

---

### CLUSTER 10: `/blog/success-stories/` — Câu Chuyện Thành Công (30+ bài)

| #     | Slug                                          | Nội dung              |
| ----- | --------------------------------------------- | --------------------- |
| 1     | `phu-huynh-be-4-tuoi-review-mam-non-viet-anh` | Review MN             |
| 2     | `hoc-sinh-lop-5-dat-ielts-45`                 | Thành tích IELTS TH   |
| 3     | `hoc-sinh-viet-anh-dat-ielts-70-lop-12`       | Thành tích IELTS THPT |
| 4     | `hanh-trinh-tu-so-0-den-ielts-60`             | Journey IELTS         |
| 5     | `phu-huynh-tin-tuong-gui-ca-2-con-o-viet-anh` | 2 con cùng trường     |
| 6     | `hoc-sinh-viet-anh-du-hoc-thanh-cong`         | Du học                |
| 7     | `pdr-thay-doi-con-toi-nhu-the-nao`            | PDR impact            |
| 8     | `giao-vien-ban-ngu-giup-con-toi-tu-tin`       | Giáo viên             |
| 9     | `con-tien-bo-tieng-anh-chi-sau-1-hoc-ky`      | Tiến bộ nhanh         |
| 10    | `moi-truong-hoc-tap-hạnh-phuc-tai-viet-anh`   | Hạnh phúc             |
| 11–30 | _(mở rộng theo campus + level + chủ đề)_      | —                     |

---

### CLUSTER 11: `/blog/tin-tuc-su-kien/` — Tin Tức (Ongoing)

Bài mới theo sự kiện trường: khai giảng, lễ hội, kết quả thi, open day recap, v.v.
Tần suất: 4-8 bài/tháng.

---

## TỔNG HỢP QUY MÔ BLOG

| Cluster          |   Năm 1 |   Năm 2 |     Năm 3 |
| ---------------- | ------: | ------: | --------: |
| Mầm Non          |      50 |      80 |       120 |
| Tiểu Học         |      50 |      80 |       120 |
| THCS             |      40 |      60 |       100 |
| THPT             |      40 |      60 |       100 |
| Học phí          |      30 |      50 |        70 |
| Kỹ năng          |      30 |      50 |        70 |
| Tiếng Anh        |      40 |      70 |       100 |
| Phụ huynh        |      30 |      50 |        70 |
| Review & So sánh |      20 |      40 |        60 |
| Success Stories  |      30 |      60 |       100 |
| Tin tức          |      50 |     100 |       150 |
| **TỔNG**         | **410** | **700** | **1,060** |

---

# 7. TỔNG HỢP QUY MÔ WEBSITE

| Nhóm                        |    Số trang |
| --------------------------- | ----------: |
| Brand / Core                |           8 |
| Cấp học (Pillar + con)      |          20 |
| Cơ sở (Campus)              |           8 |
| Sub-brand (Hệ sinh thái)    |           3 |
| Tuyển sinh / Chuyển đổi lõi |          10 |
| Học phí chi tiết            |           6 |
| Học bổng chi tiết           |           4 |
| Sự kiện / Seasonal          |           3 |
| Pháp lý                     |           4 |
| Phụ huynh Hub               |         10+ |
| Landing pages               |         84+ |
| Blog (Năm 1)                |        410+ |
| Blog (Năm 3)                |      1,060+ |
| **TỔNG NĂM 1**              |   **~570+** |
| **TỔNG NĂM 3**              | **~1,220+** |

---

# 8. MENU & NAVIGATION

## Desktop (7 mục)

| #   | Menu                     | Dropdown                                       |
| --- | ------------------------ | ---------------------------------------------- |
| 1   | Hệ sinh thái Việt Anh    | Liên cấp, PDR, Triết lý, Sub-brands            |
| 2   | Cấp học                  | MN / TH / THCS / THPT (mega-menu + sub)        |
| 3   | Cơ sở                    | 7 campus + "Tìm cơ sở gần bạn"                 |
| 4   | Tuyển sinh & Trải nghiệm | Assessment Day, Open Day, Học thử, Summer Camp |
| 5   | Học phí & Học bổng       | Hub + chính sách ưu đãi                        |
| 6   | Phụ huynh                | Articles                                       |
| 7   | Liên hệ                  | —                                              |

**CTA Header**: "Đăng ký Assessment Day miễn phí" + "Đặt lịch tham quan"
**Mobile sticky**: 📞 Gọi | 💬 Zalo | 📝 Đăng ký

## Footer (8 sections)

1. Brand (logo + slogan + hotline + email)
2. Cấp học (4 links)
3. Tuyển sinh (6 links)
4. Cơ sở (7 links)
5. Hệ sinh thái & Cam kết (3 links)
6. Phụ huynh (5 links)
7. Chính sách (4 links)
8. Social (Facebook, TikTok, YouTube, Zalo)

---

# 9. INTERNAL LINKING RULES

| Rule | Chi tiết                                                            |
| ---- | ------------------------------------------------------------------- |
| R1   | Homepage → mọi pillar + conversion hub + `/he-sinh-thai-viet-anh`   |
| R2   | Pillar → campus + conversion + cluster + `/cam-ket-dau-ra-ielts-60` |
| R3   | Campus → pillar + landing + conversion + sub-brand silo             |
| R4   | Blog → ≥1 pillar + ≥1 conversion + 1 campus phù hợp                 |
| R5   | Landing → tối đa 5 internal links (conversion-focused)              |
| R6   | Mọi trang quan trọng nhận ≥2–5 internal links (no orphan)           |
| R7   | Success-stories → link chéo tất cả campus + pillar                  |

## Breadcrumbs

| Loại      | Pattern                                 |
| --------- | --------------------------------------- |
| Brand     | `Trang chủ > Giới thiệu > [page]`       |
| Level     | `Trang chủ > Cấp học > Mầm non`         |
| Campus    | `Trang chủ > Cơ sở > [campus]`          |
| Landing   | `Trang chủ > Tuyển sinh > [landing]`    |
| Blog      | `Trang chủ > Blog > [cluster] > [post]` |
| Sub-brand | `Trang chủ > Hệ sinh thái > [brand]`    |

---

# 10. FUNNEL MAP

| Stage    | Pages                                        | Link forward                  |
| -------- | -------------------------------------------- | ----------------------------- |
| **TOFU** | Blog, Phụ huynh, Triết lý, PDR               | → Pillar, Trust, CTA mềm      |
| **MOFU** | Pillar, Campus, Học phí, Học bổng            | → Admissions, Visit, Open Day |
| **BOFU** | Landing, Đăng ký tư vấn, Tham quan, Open Day | → Form, Call, Zalo, Booking   |

---

# 11. THỨ TỰ TRIỂN KHAI

## Wave 1 — Core Launch (~45 trang)

- 8 brand/core pages
- 4 pillar pages + 16 sub-pages
- `/tuyen-sinh` + `/hoc-phi` + `/dang-ky-tu-van` + `/tham-quan-truong`
- 5 campus pages chính (TPHCM)
- 10 landing pages core (cấp+cơ sở)

## Wave 2 — Conversion (~60 trang thêm)

- 2 campus còn lại (siêu tỉnh)
- 3 sub-brand pages
- `/hoc-bong` + `/open-day` + `/summer-camp`
- 30 landing pages (học phí + event + local)
- 20 blog bài đầu tiên (MN + TH clusters)

## Wave 3 — SEO Scale (~400+ trang thêm)

- Parent hub 10+ trang
- 50+ landing local adjacency + campaign
- Blog clusters mở rộng (target 410 bài năm 1)
- Success stories factory

---

# 12. TÀI LIỆU LIÊN QUAN

| File                                                         | Nội dung                                                                      |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [`blog-url-inventory.md`](./blog-url-inventory.md)           | **410 URLs blog đầy đủ** — 11 clusters, keyword + priority cho mỗi bài        |
| [`content-deployment-plan.md`](./content-deployment-plan.md) | **Kế hoạch triển khai 12 tháng** — 4 phase, lịch đăng bài, đội ngũ, ngân sách |
| [`landing-templates.md`](./landing-templates.md)             | **16 Template Classes + Directus Schema + Astro Components + Landing mẫu**    |
| [`page-block-structure.md`](./page-block-structure.md)       | **Block-by-block specs** cho tất cả loại trang                                |
| [`directus-schema.md`](./directus-schema.md)                 | **Directus CMS schema** chi tiết                                              |
| [`astro-components.md`](./astro-components.md)               | **Astro component system** — props, renderer, layouts                         |
