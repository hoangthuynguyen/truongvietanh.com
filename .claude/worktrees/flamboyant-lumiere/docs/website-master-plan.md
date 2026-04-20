# KIẾN TRÚC WEBSITE & CHIẾN LƯỢC SEO/ADS — TRUONGVIETANH.COM
## Tài Liệu Tổng Hợp Master Plan | Production-Ready v3.0 | Ngày chốt: 2026-03-22

> Website = **Enrollment Engine + SEO Machine + Conversion Machine**
> Template-driven: 16 Template Classes + ~30 UI Blocks + Directus + Astro

---

# 1. NGUYÊN TẮC KIẾN TRÚC

Website đồng thời làm 5 việc:
1. **Trang thương hiệu chính thức** — Trust & brand search
2. **Cỗ máy SEO** — organic traffic, topic clusters
3. **Cỗ máy chuyển đổi** — Google Ads / Meta / Zalo / TikTok
4. **Trung tâm Local SEO** — cho từng cơ sở
5. **Front-end nhẹ, nhanh** — Astro + Directus (<1.5s mobile VN)

5 nhóm URL: Brand/Core · Level/Program · Campus/Local · Admissions/Conversion · Content/SEO

---

# 2. HẠ TẦNG KỸ THUẬT

| Thành phần | Công nghệ |
|---|---|
| Frontend | Astro (SSG, Islands) |
| Deploy | Cloudflare Pages |
| CMS | Directus |
| Media | Cloudflare R2 (`media.truongvietanh.com`) |
| Tracking | GTM + GA4 + Meta Pixel + TikTok Pixel + Zalo/GHL |
| CRM | GoHighLevel |

Subdomains: `staging.` (test) · `cms.` (Directus admin) · `api.` (Directus API) · `media.` (R2 CDN)

### Quy ước URL (Slug Conventions)

- Tất cả slug viết thường, không dấu, dùng dấu `-`
- Không dùng ngày tháng trong slug nếu không cần thiết
- Không nhồi keyword quá mức vào slug
- Landing pages ads đặt dưới `/tuyen-sinh/[slug]`
- Blog đặt dưới `/blog/[cluster]/[slug]`

---

# 3. DANH SÁCH CƠ SỞ (7 CAMPUS)

| # | Campus | Slug | Cấp học | Khu vực |
|---|---|---|---|---|
| 1 | Gò Vấp – Phan Huy Ích | `go-vap-phan-huy-ich` | TH, THCS, THPT | TPHCM Gò Vấp |
| 2 | Phú Nhuận – Nguyễn Trọng Tuyển | `phu-nhuan-nguyen-trong-tuyen` | TH, THCS, THPT | TPHCM Phú Nhuận |
| 3 | Bình Tân – Tỉnh Lộ 10 | `binh-tan-tinh-lo-10` | TH, THCS, THPT | TPHCM Bình Tân |
| 4 | Mầm Non Gò Vấp – Lê Đức Thọ | `mam-non-go-vap-le-duc-tho` | MN | TPHCM Gò Vấp |
| 5 | Nhân Lễ – Cần Giuộc | `nhan-le-can-giuoc` | MN, TH | Long An |
| 6 | Thái Sơn – Long Hậu | `thai-son-long-hau` | MN, TH | Long An |
| 7 | Mekong Xanh – Rạch Giá | `mekong-xanh-rach-gia` | MN, TH | Kiên Giang |

---

# 4. SITEMAP ĐẦY ĐỦ — TẤT CẢ PAGES

## A. TRANG LÕI THƯƠNG HIỆU (8 trang)

| # | URL | Vai trò | SEO/Ads Role |
|---|---|---|---|
| 1 | `/` | Homepage — brand flagship, funnel router | Trust, brand search, điểm đến remarketing |
| 2 | `/gioi-thieu` | Corporate — lịch sử, sứ mệnh, tầm nhìn | Trust page cho organic & ads traffic |
| 3 | `/triet-ly-giao-duc` | Thought leadership — "Vui vẻ và Thực dụng" | SEO pillar |
| 4 | `/he-thong-pdr` | Signature pillar — Plan · Do · Review | Authority content |
| 5 | `/cam-ket-dau-ra-ielts-60` | Authority moat — IELTS commitment | Trust + conversion |
| 6 | `/gia-tri-cot-loi` | Core values page | Brand trust |
| 7 | `/doi-ngu` | Giáo viên bản ngữ + đội ngũ | Trust signal |
| 8 | `/he-sinh-thai-viet-anh` | Hub liên cấp + co-branding sub-brands | Hub page |

## B. TRANG CẤP HỌC — PILLAR PAGES (20 trang)

### B1. Pillar chính (4 trang) — SEO organic & remarketing

| # | URL | Target keyword |
|---|---|---|
| 1 | `/mam-non` | trường mầm non song ngữ tphcm |
| 2 | `/tieu-hoc` | trường tiểu học song ngữ tphcm |
| 3 | `/trung-hoc-co-so` | trường THCS tư thục chất lượng cao tphcm |
| 4 | `/trung-hoc-pho-thong` | trường THPT chuyên Anh tphcm |

### B2. Trang con theo cấp (16 trang)

| Cấp | `/[cap]/chuong-trinh` | `/[cap]/hoc-phi` | `/[cap]/tuyen-sinh` hoặc `hoc-thu` | `/[cap]/cau-hoi-thuong-gap` | `/[cap]/co-so-phu-hop` |
|---|---|---|---|---|---|
| mam-non | ✓ | ✓ | `/mam-non/hoc-thu` | ✓ | ✓ |
| tieu-hoc | ✓ | ✓ | `/tieu-hoc/tuyen-sinh` | ✓ | ✓ |
| trung-hoc-co-so | ✓ | ✓ | `/trung-hoc-co-so/tuyen-sinh` | ✓ | ✓ |
| trung-hoc-pho-thong | ✓ | ✓ | `/trung-hoc-pho-thong/tuyen-sinh` | ✓ | ✓ |

### B3. Trang chương trình bổ sung

| # | URL | Vai trò |
|---|---|---|
| 1 | `/chuong-trinh-song-ngu` | Giới thiệu tổng quan chương trình song ngữ |
| 2 | `/hoat-dong-ngoai-khoa` | Hoạt động ngoại khóa tất cả cấp |

## C. TRANG CƠ SỞ — LOCAL SEO (8 trang)

| # | URL | Campus |
|---|---|---|
| 1 | `/co-so` | Hub campus finder (map + filter) |
| 2 | `/co-so/go-vap-phan-huy-ich` | CS Gò Vấp – TH/THCS/THPT |
| 3 | `/co-so/phu-nhuan-nguyen-trong-tuyen` | CS Phú Nhuận |
| 4 | `/co-so/binh-tan-tinh-lo-10` | CS Bình Tân |
| 5 | `/co-so/mam-non-go-vap-le-duc-tho` | CS Mầm Non Gò Vấp |
| 6 | `/co-so/nhan-le-can-giuoc` | CS Nhân Lễ – Long An |
| 7 | `/co-so/thai-son-long-hau` | CS Thái Sơn – Long An |
| 8 | `/co-so/mekong-xanh-rach-gia` | CS Mekong Xanh – Kiên Giang |

## D. HỆ SINH THÁI SUB-BRAND (3 trang)

| # | URL | Sub-brand |
|---|---|---|
| 1 | `/he-sinh-thai/thai-son` | Trường Thái Sơn |
| 2 | `/he-sinh-thai/mekong-xanh` | Trường Mekong Xanh |
| 3 | `/he-sinh-thai/nhan-le` | Trường Nhân Lễ |

## E. TRANG TUYỂN SINH / CHUYỂN ĐỔI LÕI (10 trang)

| # | URL | Vai trò | SEO/Ads |
|---|---|---|---|
| 1 | `/tuyen-sinh` | Admissions hub | Trung tâm internal links tuyển sinh |
| 2 | `/tuyen-sinh/quy-trinh-tuyen-sinh` | Quy trình step-by-step | Hỗ trợ chiến dịch ads |
| 3 | `/tuyen-sinh/lich-tuyen-sinh` | Lịch tuyển sinh năm | Conversion |
| 4 | `/tuyen-sinh/ho-so-nhap-hoc` | Hồ sơ cần chuẩn bị | Conversion |
| 5 | `/tuyen-sinh/assessment-day` | Assessment Day hub | Campaign landing |
| 6 | `/hoc-phi` | Money page — hub học phí | SEO + conversion |
| 7 | `/hoc-bong` | Học bổng hub | SEO + conversion |
| 8 | `/dang-ky-tu-van` | Central conversion form | CTA chính cho mọi ads |
| 9 | `/tham-quan-truong` | Tour booking | CTA phụ |
| 10 | `/lien-he` | Contact page | Trust + conversion |

## F. TRANG HỌC PHÍ CHI TIẾT (6 trang)

| # | URL |
|---|---|
| 1 | `/hoc-phi/mam-non` |
| 2 | `/hoc-phi/tieu-hoc` |
| 3 | `/hoc-phi/trung-hoc-co-so` |
| 4 | `/hoc-phi/trung-hoc-pho-thong` |
| 5 | `/hoc-phi/chinh-sach-uu-dai` |
| 6 | `/hoc-phi/edu-finance` |

## G. TRANG HỌC BỔNG CHI TIẾT (4 trang)

| # | URL |
|---|---|
| 1 | `/hoc-bong/hoc-bong-chuyen-anh` |
| 2 | `/hoc-bong/hoc-bong-som` |
| 3 | `/hoc-bong/hoc-bong-anh-chi-em` |
| 4 | `/hoc-bong/dieu-kien-xet` |

## H. TRANG SỰ KIỆN / SEASONAL (3 trang)

| # | URL |
|---|---|
| 1 | `/open-day` |
| 2 | `/summer-camp` |
| 3 | `/success-stories-pdr-review` |

## I. TRANG PHÁP LÝ (4 trang)

| # | URL |
|---|---|
| 1 | `/chinh-sach-bao-mat` |
| 2 | `/dieu-khoan-su-dung` |
| 3 | `/chinh-sach-tuyen-sinh` |
| 4 | `/chinh-sach-hoc-phi` |

## J. TIỆN ÍCH / MEDIA (3 trang)

| # | URL | Vai trò |
|---|---|---|
| 1 | `/su-kien` | Lịch sự kiện |
| 2 | `/thu-vien-anh` | Photo gallery |
| 3 | `/video` | Video gallery |

## K. PHỤ HUYNH HUB — THOUGHT LEADERSHIP (10+ trang)

| # | URL | Chủ đề |
|---|---|---|
| 1 | `/phu-huynh/cach-chon-truong-mam-non` | Hướng dẫn chọn trường MN |
| 2 | `/phu-huynh/chuan-bi-vao-lop-1` | Chuẩn bị cho con vào lớp 1 |
| 3 | `/phu-huynh/dong-hanh-cung-con-tu-chu` | Nuôi dạy tự chủ |
| 4 | `/phu-huynh/hoc-tieng-anh-hieu-qua` | Phương pháp học tiếng Anh |
| 5 | `/phu-huynh/ky-nang-the-ky-21` | 16 kỹ năng thế kỷ 21 |
| 6 | `/phu-huynh/hanh-trinh-phat-trien-cua-con` | Phát triển toàn diện |
| 7 | `/phu-huynh/vi-sao-hoc-sinh-can-pdr` | Giải thích PDR cho PH |
| 8 | `/phu-huynh/nuoi-day-su-tu-chu` | Tự lập từ mầm non |
| 9 | `/phu-huynh/dinh-huong-du-hoc` | Lộ trình du học |
| 10 | `/phu-huynh/tam-ly-hoc-duong` | Tâm lý HS các cấp |

---

# 5. LANDING PAGES — DANH SÁCH ĐẦY ĐỦ (~84 trang)

> Nguyên tắc: 1 landing = 1 intent = 1 CTA chính. Tối giản menu, ít distraction.
> Tiêu đề khớp thông điệp ads. Đặt dưới `/tuyen-sinh/[slug]`.

## 5.1 Landing CẤP HỌC + CƠ SỞ (16 trang)

| # | URL | Cấp | Campus |
|---|---|---|---|
| 1 | `/tuyen-sinh/mam-non-go-vap-le-duc-tho` | MN | MN GV Lê Đức Thọ |
| 2 | `/tuyen-sinh/mam-non-nhan-le-can-giuoc` | MN | Nhân Lễ |
| 3 | `/tuyen-sinh/mam-non-thai-son-long-hau` | MN | Thái Sơn |
| 4 | `/tuyen-sinh/mam-non-mekong-xanh-rach-gia` | MN | Mekong Xanh |
| 5 | `/tuyen-sinh/tieu-hoc-go-vap-phan-huy-ich` | TH | GV Phan Huy Ích |
| 6 | `/tuyen-sinh/tieu-hoc-phu-nhuan` | TH | Phú Nhuận |
| 7 | `/tuyen-sinh/tieu-hoc-binh-tan` | TH | Bình Tân |
| 8 | `/tuyen-sinh/tieu-hoc-nhan-le-can-giuoc` | TH | Nhân Lễ |
| 9 | `/tuyen-sinh/tieu-hoc-thai-son-long-hau` | TH | Thái Sơn |
| 10 | `/tuyen-sinh/tieu-hoc-mekong-xanh-rach-gia` | TH | Mekong Xanh |
| 11 | `/tuyen-sinh/thcs-go-vap-phan-huy-ich` | THCS | GV Phan Huy Ích |
| 12 | `/tuyen-sinh/thcs-phu-nhuan` | THCS | Phú Nhuận |
| 13 | `/tuyen-sinh/thcs-binh-tan` | THCS | Bình Tân |
| 14 | `/tuyen-sinh/thpt-go-vap-phan-huy-ich` | THPT | GV Phan Huy Ích |
| 15 | `/tuyen-sinh/thpt-phu-nhuan` | THPT | Phú Nhuận |
| 16 | `/tuyen-sinh/thpt-binh-tan` | THPT | Bình Tân |

## 5.2 Landing HỌC PHÍ (10 trang)

| # | URL |
|---|---|
| 1 | `/tuyen-sinh/hoc-phi-mam-non-go-vap` |
| 2 | `/tuyen-sinh/hoc-phi-mam-non-can-giuoc` |
| 3 | `/tuyen-sinh/hoc-phi-mam-non-rach-gia` |
| 4 | `/tuyen-sinh/hoc-phi-tieu-hoc-go-vap` |
| 5 | `/tuyen-sinh/hoc-phi-tieu-hoc-phu-nhuan` |
| 6 | `/tuyen-sinh/hoc-phi-tieu-hoc-binh-tan` |
| 7 | `/tuyen-sinh/hoc-phi-thcs-go-vap` |
| 8 | `/tuyen-sinh/hoc-phi-thcs-phu-nhuan` |
| 9 | `/tuyen-sinh/hoc-phi-thpt-go-vap` |
| 10 | `/tuyen-sinh/hoc-phi-thpt-binh-tan` |

## 5.3 Landing SỰ KIỆN (14 trang)

| # | URL | Loại |
|---|---|---|
| 1 | `/tuyen-sinh/open-day-mam-non-go-vap` | Open Day |
| 2 | `/tuyen-sinh/open-day-tieu-hoc-go-vap` | Open Day |
| 3 | `/tuyen-sinh/open-day-phu-nhuan` | Open Day |
| 4 | `/tuyen-sinh/open-day-binh-tan` | Open Day |
| 5 | `/tuyen-sinh/open-day-can-giuoc` | Open Day |
| 6 | `/tuyen-sinh/hoc-thu-mam-non-go-vap` | Trial Class |
| 7 | `/tuyen-sinh/hoc-thu-tieu-hoc-go-vap` | Trial Class |
| 8 | `/tuyen-sinh/hoc-thu-phu-nhuan` | Trial Class |
| 9 | `/tuyen-sinh/summer-camp-go-vap-2026` | Summer Camp |
| 10 | `/tuyen-sinh/summer-camp-phu-nhuan-2026` | Summer Camp |
| 11 | `/tuyen-sinh/summer-camp-binh-tan-2026` | Summer Camp |
| 12 | `/tuyen-sinh/summer-camp-can-giuoc-2026` | Summer Camp |
| 13 | `/tuyen-sinh/assessment-day-go-vap` | Assessment |
| 14 | `/tuyen-sinh/assessment-day-phu-nhuan` | Assessment |

## 5.4 Landing LOCAL ADJACENCY (20 trang)

| # | URL | Khu vực target |
|---|---|---|
| 1 | `/tuyen-sinh/mam-non-gan-an-hoi-tay` | Ấn Hội Tây, Gò Vấp |
| 2 | `/tuyen-sinh/mam-non-gan-an-hoi-dong` | Ấn Hội Đông, Gò Vấp |
| 3 | `/tuyen-sinh/mam-non-gan-quang-trung-go-vap` | Quang Trung, Gò Vấp |
| 4 | `/tuyen-sinh/mam-non-gan-quan-12` | Quận 12 |
| 5 | `/tuyen-sinh/mam-non-gan-tan-binh` | Tân Bình |
| 6 | `/tuyen-sinh/mam-non-gan-cityland-go-vap` | Cityland, Gò Vấp |
| 7 | `/tuyen-sinh/mam-non-gan-le-van-tho` | Lê Văn Thọ, Gò Vấp |
| 8 | `/tuyen-sinh/mam-non-gan-pham-van-chieu` | Phạm Văn Chiêu, Gò Vấp |
| 9 | `/tuyen-sinh/tieu-hoc-gan-phan-huy-ich` | Phan Huy Ích, Gò Vấp |
| 10 | `/tuyen-sinh/tieu-hoc-gan-le-duc-tho` | Lê Đức Thọ, Gò Vấp |
| 11 | `/tuyen-sinh/tieu-hoc-gan-truong-chinh` | Trường Chinh, Tân Bình |
| 12 | `/tuyen-sinh/thcs-gan-nguyen-trong-tuyen` | Nguyễn Trọng Tuyển, PN |
| 13 | `/tuyen-sinh/thcs-gan-hoang-van-thu` | Hoàng Văn Thụ, PN |
| 14 | `/tuyen-sinh/thpt-gan-tinh-lo-10` | Tỉnh Lộ 10, Bình Tân |
| 15 | `/tuyen-sinh/thpt-gan-binh-tri-dong` | Bình Trị Đông, BT |
| 16 | `/tuyen-sinh/truong-tu-thuc-go-vap` | Gò Vấp chung |
| 17 | `/tuyen-sinh/truong-tu-thuc-phu-nhuan` | Phú Nhuận chung |
| 18 | `/tuyen-sinh/truong-tu-thuc-binh-tan` | Bình Tân chung |
| 19 | `/tuyen-sinh/truong-tu-thuc-can-giuoc` | Cần Giuộc, Long An |
| 20 | `/tuyen-sinh/truong-tu-thuc-rach-gia` | Rạch Giá, Kiên Giang |

## 5.5 Landing CAMPAIGN / OFFER (12 trang)

| # | URL | Campaign |
|---|---|---|
| 1 | `/tuyen-sinh/hoc-bong-mam-non-2026` | Học bổng MN |
| 2 | `/tuyen-sinh/hoc-bong-tieu-hoc-2026` | Học bổng TH |
| 3 | `/tuyen-sinh/hoc-bong-thcs-2026` | Học bổng THCS |
| 4 | `/tuyen-sinh/hoc-bong-thpt-2026` | Học bổng THPT |
| 5 | `/tuyen-sinh/hoc-bong-chuyen-anh-2026` | HB Chuyên Anh |
| 6 | `/tuyen-sinh/hoc-bong-anh-chi-em-2026` | HB Anh chị em |
| 7 | `/tuyen-sinh/uu-dai-dang-ky-som-2026` | Ưu đãi early bird |
| 8 | `/tuyen-sinh/truong-tu-thuc-chat-luong-cao` | Generic brand |
| 9 | `/tuyen-sinh/truong-song-ngu-quoc-te-tphcm` | Generic brand |
| 10 | `/tuyen-sinh/chuong-trinh-tieng-anh-cambridge` | Chương trình Anh |
| 11 | `/tuyen-sinh/lop-tang-cuong-tieng-anh` | Tăng cường Anh |
| 12 | `/tuyen-sinh/dang-ky-tham-quan-truong` | Tour generic |

**Tổng landing pages: ~84 trang** (mở rộng thêm theo campaign)

---



# 6. HỆ THỐNG BLOG — 11 CLUSTER

## Cấu trúc URL: `truongvietanh.com/blog/[cluster]/[slug]`

Directus tự sinh URL. Blog đóng vai trò **SEO support**, hỗ trợ **topic clusters**, và dẫn traffic sang **pillar pages** + **landing pages**.

---

### CLUSTER 1: `/blog/mam-non/` — Mầm Non (50+ bài)

| # | Full URL | Keyword target |
|---|---|---|
| 1 | `/blog/mam-non/may-tuoi-di-hoc-mam-non` | mấy tuổi đi học mầm non |
| 2 | `/blog/mam-non/tre-khoc-khi-di-hoc-mam-non-phai-lam-sao` | trẻ khóc mầm non |
| 3 | `/blog/mam-non/cach-chon-truong-mam-non-cho-con` | chọn trường mầm non |
| 4 | `/blog/mam-non/truong-mam-non-song-ngu-la-gi` | mầm non song ngữ là gì |
| 5 | `/blog/mam-non/so-sanh-mam-non-song-ngu-va-quoc-te` | so sánh mầm non |
| 6 | `/blog/mam-non/hoc-phi-mam-non-song-ngu-tphcm` | học phí mầm non tphcm |
| 7 | `/blog/mam-non/chi-phi-mam-non-tu-thuc-tphcm-2026` | chi phí mầm non tư thục |
| 8 | `/blog/mam-non/be-3-tuoi-hoc-duoc-gi-o-truong-mam-non` | bé 3 tuổi học gì |
| 9 | `/blog/mam-non/be-4-tuoi-hoc-duoc-gi-o-truong` | bé 4 tuổi học gì |
| 10 | `/blog/mam-non/chuong-trinh-mam-non-song-ngu-gom-nhung-gi` | chương trình mầm non |
| 11 | `/blog/mam-non/loi-ich-cho-tre-hoc-tieng-anh-som` | tiếng Anh sớm |
| 12 | `/blog/mam-non/mam-non-go-vap-nen-chon-truong-nao` | mầm non gò vấp |
| 13 | `/blog/mam-non/mam-non-phu-nhuan-tot-nhat` | mầm non phú nhuận |
| 14 | `/blog/mam-non/mam-non-binh-tan-chat-luong` | mầm non bình tân |
| 15 | `/blog/mam-non/mam-non-can-giuoc-long-an` | mầm non cần giuộc |
| 16 | `/blog/mam-non/mam-non-rach-gia-kien-giang` | mầm non rạch giá |
| 17 | `/blog/mam-non/tre-nho-can-hoc-nhung-ky-nang-gi` | kỹ năng trẻ mầm non |
| 18 | `/blog/mam-non/phuong-phap-montessori-la-gi` | montessori |
| 19 | `/blog/mam-non/phuong-phap-steam-cho-mam-non` | STEAM mầm non |
| 20 | `/blog/mam-non/mam-non-ban-tru-khac-gi-noi-tru` | bán trú vs nội trú |
| 21 | `/blog/mam-non/xe-dua-don-mam-non-an-toan` | xe đưa đón mầm non |
| 22 | `/blog/mam-non/thuc-don-dinh-duong-mam-non` | thực đơn mầm non |
| 23 | `/blog/mam-non/giup-tre-lam-quen-truong-mam-non-moi` | thích nghi mầm non |
| 24 | `/blog/mam-non/danh-gia-truong-mam-non-viet-anh` | đánh giá Việt Anh MN |
| 25 | `/blog/mam-non/truong-mam-non-co-ho-boi-tphcm` | mầm non có hồ bơi |

### CLUSTER 2: `/blog/tieu-hoc/` — Tiểu Học (50+ bài)

| # | Full URL | Keyword target |
|---|---|---|
| 1 | `/blog/tieu-hoc/chuan-bi-vao-lop-1-can-nhung-gi` | chuẩn bị lớp 1 |
| 2 | `/blog/tieu-hoc/chuong-trinh-tieu-hoc-song-ngu-la-gi` | tiểu học song ngữ |
| 3 | `/blog/tieu-hoc/lo-trinh-tieng-anh-cho-hoc-sinh-tieu-hoc` | lộ trình tiếng Anh TH |
| 4 | `/blog/tieu-hoc/hoc-phi-tieu-hoc-tu-thuc-tphcm` | học phí tiểu học tphcm |
| 5 | `/blog/tieu-hoc/truong-tieu-hoc-nao-tot-tai-tphcm` | trường TH tốt tphcm |
| 6 | `/blog/tieu-hoc/cach-giup-con-tu-hoc-o-tieu-hoc` | tự học tiểu học |
| 7 | `/blog/tieu-hoc/tieu-hoc-song-ngu-khac-gi-quoc-te` | song ngữ vs quốc tế |
| 8 | `/blog/tieu-hoc/tieu-hoc-go-vap-truong-nao-tot` | tiểu học gò vấp |
| 9 | `/blog/tieu-hoc/tieu-hoc-phu-nhuan-chat-luong` | tiểu học phú nhuận |
| 10 | `/blog/tieu-hoc/tieu-hoc-binh-tan-truong-nao-chon` | tiểu học bình tân |
| 11 | `/blog/tieu-hoc/ky-nang-doc-viet-cho-hoc-sinh-lop-1` | kỹ năng lớp 1 |
| 12 | `/blog/tieu-hoc/chuong-trinh-icdl-cho-tieu-hoc` | ICDL tiểu học |
| 13 | `/blog/tieu-hoc/hoat-dong-ngoai-khoa-tieu-hoc` | ngoại khóa tiểu học |
| 14 | `/blog/tieu-hoc/hoc-sinh-tieu-hoc-nen-hoc-ielts-chua` | IELTS tiểu học |
| 15 | `/blog/tieu-hoc/danh-gia-truong-tieu-hoc-viet-anh` | đánh giá Việt Anh TH |

### CLUSTER 3: `/blog/trung-hoc-co-so/` — THCS (40+ bài)

| # | Full URL | Keyword target |
|---|---|---|
| 1 | `/blog/trung-hoc-co-so/chuong-trinh-thcs-chat-luong-cao-la-gi` | THCS chất lượng cao |
| 2 | `/blog/trung-hoc-co-so/cach-hoc-tot-tieng-anh-o-thcs` | tiếng Anh THCS |
| 3 | `/blog/trung-hoc-co-so/ky-nang-tu-hoc-cho-hoc-sinh-cap-2` | tự học cấp 2 |
| 4 | `/blog/trung-hoc-co-so/ielts-cho-hoc-sinh-cap-2-bat-dau-tu-dau` | IELTS cấp 2 |
| 5 | `/blog/trung-hoc-co-so/lo-trinh-hoc-tieng-anh-cho-hoc-sinh-thcs` | lộ trình Anh THCS |
| 6 | `/blog/trung-hoc-co-so/truong-thcs-tu-thuc-go-vap` | THCS gò vấp |
| 7 | `/blog/trung-hoc-co-so/truong-thcs-tu-thuc-phu-nhuan` | THCS phú nhuận |
| 8 | `/blog/trung-hoc-co-so/truong-thcs-tu-thuc-binh-tan` | THCS bình tân |
| 9 | `/blog/trung-hoc-co-so/chon-truong-cap-2-cho-con-can-biet-gi` | chọn trường cấp 2 |
| 10 | `/blog/trung-hoc-co-so/phuong-phap-pdr-cho-hoc-sinh-thcs` | PDR THCS |
| 11 | `/blog/trung-hoc-co-so/hoc-sinh-thcs-nen-hoc-nhung-ky-nang-gi` | kỹ năng THCS |
| 12 | `/blog/trung-hoc-co-so/critical-thinking-cho-hoc-sinh-cap-2` | tư duy phản biện |
| 13 | `/blog/trung-hoc-co-so/chuong-trinh-cambridge-thcs` | Cambridge THCS |
| 14 | `/blog/trung-hoc-co-so/danh-gia-truong-thcs-viet-anh` | đánh giá THCS VA |

### CLUSTER 4: `/blog/trung-hoc-pho-thong/` — THPT (40+ bài)

| # | Full URL | Keyword target |
|---|---|---|
| 1 | `/blog/trung-hoc-pho-thong/truong-thpt-chuyen-anh-chat-luong-cao` | THPT chuyên Anh |
| 2 | `/blog/trung-hoc-pho-thong/lo-trinh-hoc-thuat-thpt-viet-anh` | lộ trình THPT |
| 3 | `/blog/trung-hoc-pho-thong/chuan-bi-vao-dai-hoc-tu-bac-thpt` | chuẩn bị đại học |
| 4 | `/blog/trung-hoc-pho-thong/dat-ielts-65-khi-tot-nghiep-thpt` | IELTS 6.5 THPT |
| 5 | `/blog/trung-hoc-pho-thong/du-hoc-sau-thpt-can-chuan-bi-gi` | du học sau THPT |
| 6 | `/blog/trung-hoc-pho-thong/truong-thpt-tu-thuc-go-vap` | THPT gò vấp |
| 7 | `/blog/trung-hoc-pho-thong/truong-thpt-tu-thuc-phu-nhuan` | THPT phú nhuận |
| 8 | `/blog/trung-hoc-pho-thong/truong-thpt-tu-thuc-binh-tan` | THPT bình tân |
| 9 | `/blog/trung-hoc-pho-thong/hoc-sinh-viet-anh-dat-ielts-cao` | thành tích IELTS |
| 10 | `/blog/trung-hoc-pho-thong/chuong-trinh-cambridge-thpt` | Cambridge THPT |
| 11 | `/blog/trung-hoc-pho-thong/dinh-huong-nghe-nghiep-cho-hoc-sinh-thpt` | định hướng nghề |
| 12 | `/blog/trung-hoc-pho-thong/ky-nang-lanh-dao-cho-hoc-sinh-thpt` | lãnh đạo THPT |
| 13 | `/blog/trung-hoc-pho-thong/so-sanh-truong-thpt-tu-thuc-tphcm` | so sánh THPT |
| 14 | `/blog/trung-hoc-pho-thong/danh-gia-truong-thpt-viet-anh` | đánh giá THPT VA |

### CLUSTER 5: `/blog/hoc-phi/` — Học Phí & Tài Chính (30+ bài)

| # | Full URL | Keyword target |
|---|---|---|
| 1 | `/blog/hoc-phi/hoc-phi-truong-tu-thuc-tphcm-2026` | học phí tư thục 2026 |
| 2 | `/blog/hoc-phi/bang-hoc-phi-truong-quoc-te-tphcm` | học phí quốc tế |
| 3 | `/blog/hoc-phi/so-sanh-hoc-phi-truong-tu-thuc-tphcm` | so sánh học phí |
| 4 | `/blog/hoc-phi/hoc-phi-truong-song-ngu-gom-nhung-gi` | cấu thành học phí |
| 5 | `/blog/hoc-phi/cach-tinh-toan-chi-phi-hoc-tu-thuc` | tính toán chi phí |
| 6 | `/blog/hoc-phi/co-nen-cho-con-hoc-truong-tu-thuc` | có nên trường tư |
| 7 | `/blog/hoc-phi/chinh-sach-hoc-bong-truong-tu-thuc` | chính sách học bổng |
| 8 | `/blog/hoc-phi/dieu-kien-xin-hoc-bong-truong-tu-thuc` | điều kiện học bổng |
| 9 | `/blog/hoc-phi/tai-chinh-giao-duc-cho-phu-huynh` | tài chính giáo dục |
| 10 | `/blog/hoc-phi/hoc-phi-mam-non-song-ngu-bao-nhieu` | học phí MN song ngữ |

### CLUSTER 6: `/blog/ky-nang/` — Kỹ Năng Thế Kỷ 21 (30+ bài)

| # | Full URL | Keyword |
|---|---|---|
| 1 | `/blog/ky-nang/16-ky-nang-the-ky-21-la-gi` | kỹ năng thế kỷ 21 |
| 2 | `/blog/ky-nang/ky-nang-tu-duy-phan-bien-cho-hoc-sinh` | tư duy phản biện |
| 3 | `/blog/ky-nang/ky-nang-giao-tiep-cho-tre` | giao tiếp |
| 4 | `/blog/ky-nang/ky-nang-lam-viec-nhom-cho-hoc-sinh` | teamwork |
| 5 | `/blog/ky-nang/ky-nang-lanh-dao-hoc-sinh-ren-tu-som` | lãnh đạo |
| 6 | `/blog/ky-nang/ky-nang-quan-ly-thoi-gian-cho-tre` | quản lý thời gian |
| 7 | `/blog/ky-nang/ky-nang-tai-chinh-cho-hoc-sinh` | tài chính cho HS |
| 8 | `/blog/ky-nang/giai-quyet-van-de-cho-hoc-sinh` | giải quyết vấn đề |
| 9 | `/blog/ky-nang/cong-dan-thoi-dai-so-la-gi` | công dân số |
| 10 | `/blog/ky-nang/mindfulness-tinh-thuc-hoc-duong` | mindfulness |

### CLUSTER 7: `/blog/tieng-anh/` — Tiếng Anh & IELTS (40+ bài)

| # | Full URL | Keyword |
|---|---|---|
| 1 | `/blog/tieng-anh/lo-trinh-hoc-tieng-anh-tu-mam-non-den-thpt` | lộ trình tiếng Anh |
| 2 | `/blog/tieng-anh/chuong-trinh-cambridge-cho-hoc-sinh-viet-nam` | Cambridge VN |
| 3 | `/blog/tieng-anh/ielts-la-gi-va-vi-sao-quan-trong` | IELTS là gì |
| 4 | `/blog/tieng-anh/cach-dat-ielts-60-khi-con-o-cap-3` | IELTS 6.0 |
| 5 | `/blog/tieng-anh/hoc-tieng-anh-voi-giao-vien-ban-ngu` | giáo viên bản ngữ |
| 6 | `/blog/tieng-anh/tieng-anh-mam-non-bat-dau-tu-dau` | tiếng Anh mầm non |
| 7 | `/blog/tieng-anh/tieng-anh-tieu-hoc-phuong-phap-hieu-qua` | tiếng Anh tiểu học |
| 8 | `/blog/tieng-anh/tieng-anh-thcs-lo-trinh-len-ielts` | tiếng Anh THCS |
| 9 | `/blog/tieng-anh/cach-giup-con-yeu-thich-tieng-anh` | yêu thích tiếng Anh |
| 10 | `/blog/tieng-anh/so-sanh-cambridge-ielts-toefl` | so sánh chứng chỉ |

### CLUSTER 8: `/blog/phu-huynh-can-biet/` — Phụ Huynh (30+ bài)

| # | Full URL | Keyword |
|---|---|---|
| 1 | `/blog/phu-huynh-can-biet/phu-huynh-can-chuan-bi-gi-khi-nhap-hoc` | chuẩn bị nhập học |
| 2 | `/blog/phu-huynh-can-biet/kinh-nghiem-chon-truong-cho-con` | kinh nghiệm chọn trường |
| 3 | `/blog/phu-huynh-can-biet/lam-sao-biet-truong-tu-co-tot-khong` | đánh giá trường tư |
| 4 | `/blog/phu-huynh-can-biet/nhung-dieu-can-hoi-khi-tham-quan-truong` | hỏi khi tham quan |
| 5 | `/blog/phu-huynh-can-biet/day-con-tu-lap-tu-mam-non` | dạy con tự lập |
| 6 | `/blog/phu-huynh-can-biet/dong-hanh-cung-con-trong-hoc-tap` | đồng hành học tập |
| 7 | `/blog/phu-huynh-can-biet/tam-ly-hoc-sinh-chuyen-cap` | tâm lý chuyển cấp |
| 8 | `/blog/phu-huynh-can-biet/cach-tao-thoi-quen-doc-sach-cho-con` | thói quen đọc sách |
| 9 | `/blog/phu-huynh-can-biet/xu-ly-khi-con-khong-muon-di-hoc` | con không muốn học |
| 10 | `/blog/phu-huynh-can-biet/co-nen-cho-con-hoc-them-ngoai-truong` | học thêm |

### CLUSTER 9: `/blog/review-so-sanh/` — Review & So Sánh (20+ bài)

| # | Full URL | Keyword |
|---|---|---|
| 1 | `/blog/review-so-sanh/so-sanh-truong-tu-thuc-go-vap` | so sánh GV |
| 2 | `/blog/review-so-sanh/so-sanh-truong-tu-thuc-phu-nhuan` | so sánh PN |
| 3 | `/blog/review-so-sanh/so-sanh-truong-tu-thuc-binh-tan` | so sánh BT |
| 4 | `/blog/review-so-sanh/top-truong-mam-non-song-ngu-tphcm` | top mầm non |
| 5 | `/blog/review-so-sanh/top-truong-tieu-hoc-song-ngu-tphcm` | top tiểu học |
| 6 | `/blog/review-so-sanh/top-truong-thcs-tu-thuc-tphcm` | top THCS |
| 7 | `/blog/review-so-sanh/top-truong-thpt-tu-thuc-tphcm` | top THPT |
| 8 | `/blog/review-so-sanh/truong-tu-thuc-vs-truong-cong-lap` | tư thục vs công |
| 9 | `/blog/review-so-sanh/truong-song-ngu-vs-truong-quoc-te` | song ngữ vs quốc tế |
| 10 | `/blog/review-so-sanh/viet-anh-vs-cac-truong-tu-thuc-khac` | Việt Anh vs đối thủ |

### CLUSTER 10: `/blog/success-stories/` — Câu Chuyện Thành Công (30+ bài)

| # | Full URL | Nội dung |
|---|---|---|
| 1 | `/blog/success-stories/phu-huynh-be-4-tuoi-review-mam-non-viet-anh` | Review MN |
| 2 | `/blog/success-stories/hoc-sinh-lop-5-dat-ielts-45` | Thành tích IELTS TH |
| 3 | `/blog/success-stories/hoc-sinh-viet-anh-dat-ielts-70-lop-12` | Thành tích IELTS THPT |
| 4 | `/blog/success-stories/hanh-trinh-tu-so-0-den-ielts-60` | Journey IELTS |
| 5 | `/blog/success-stories/phu-huynh-tin-tuong-gui-ca-2-con-o-viet-anh` | 2 con cùng trường |
| 6 | `/blog/success-stories/hoc-sinh-viet-anh-du-hoc-thanh-cong` | Du học |
| 7 | `/blog/success-stories/pdr-thay-doi-con-toi-nhu-the-nao` | PDR impact |
| 8 | `/blog/success-stories/giao-vien-ban-ngu-giup-con-toi-tu-tin` | Giáo viên |
| 9 | `/blog/success-stories/con-tien-bo-tieng-anh-chi-sau-1-hoc-ky` | Tiến bộ nhanh |
| 10 | `/blog/success-stories/moi-truong-hoc-tap-hanh-phuc-tai-viet-anh` | Hạnh phúc |

### CLUSTER 11: `/blog/tin-tuc-su-kien/` — Tin Tức (Ongoing)

Bài mới theo sự kiện trường: khai giảng, lễ hội, kết quả thi, open day recap, v.v.
Tần suất: 4-8 bài/tháng.

---

## TỔNG HỢP QUY MÔ BLOG

| Cluster | Năm 1 | Năm 2 | Năm 3 |
|---|---:|---:|---:|
| Mầm Non | 50 | 80 | 120 |
| Tiểu Học | 50 | 80 | 120 |
| THCS | 40 | 60 | 100 |
| THPT | 40 | 60 | 100 |
| Học phí | 30 | 50 | 70 |
| Kỹ năng | 30 | 50 | 70 |
| Tiếng Anh | 40 | 70 | 100 |
| Phụ huynh | 30 | 50 | 70 |
| Review & So sánh | 20 | 40 | 60 |
| Success Stories | 30 | 60 | 100 |
| Tin tức | 50 | 100 | 150 |
| **TỔNG** | **410** | **700** | **1,060** |

---

# 7. TOPIC CLUSTERS — CHIẾN LƯỢC SEO

| Cluster | Pillar Page | Blog Examples | Landing Examples |
|---|---|---|---|
| Tuyển sinh | `/tuyen-sinh` | `/blog/hoc-phi/*`, `/blog/phu-huynh-can-biet/*` | `/tuyen-sinh/mam-non-go-vap`, `/tuyen-sinh/hoc-bong-2026` |
| Mầm non | `/mam-non` | `/blog/mam-non/*` | `/tuyen-sinh/mam-non-*` |
| Tiểu học | `/tieu-hoc` | `/blog/tieu-hoc/*` | `/tuyen-sinh/tieu-hoc-*` |
| THCS | `/trung-hoc-co-so` | `/blog/trung-hoc-co-so/*` | `/tuyen-sinh/thcs-*` |
| THPT | `/trung-hoc-pho-thong` | `/blog/trung-hoc-pho-thong/*` | `/tuyen-sinh/thpt-*` |

---

# 8. VAI TRÒ TỪNG NHÓM TRANG TRONG SEO & ADS

| Nhóm | Mục tiêu SEO | Mục tiêu Ads |
|---|---|---|
| Homepage | Trust, brand search | Không dùng làm đích ads chính |
| Program Pages | SEO theo cấp học, pillar | Remarketing, organic |
| Admission Core | Chuyển đổi, internal links hub | Traffic từ organic & ads |
| Landing Pages | Local SEO, campaign | 1 landing = 1 intent = 1 CTA |
| Blog | Topic clusters, organic traffic | Dẫn traffic sang pillar & landing |

---

# 9. TỔNG HỢP QUY MÔ WEBSITE

| Nhóm | Số trang |
|---|---:|
| Brand / Core | 8 |
| Cấp học (Pillar + con) | 22 |
| Cơ sở (Campus) | 8 |
| Sub-brand (Hệ sinh thái) | 3 |
| Tuyển sinh / Chuyển đổi lõi | 10 |
| Học phí chi tiết | 6 |
| Học bổng chi tiết | 4 |
| Sự kiện / Seasonal | 3 |
| Pháp lý | 4 |
| Tiện ích / Media | 3 |
| Phụ huynh Hub | 10+ |
| Landing pages | 84+ |
| Blog (Năm 1) | 410+ |
| **TỔNG NĂM 1** | **~575+** |
| **TỔNG NĂM 3** | **~1,220+** |

---

# 10. MENU & NAVIGATION

## Desktop (7 mục)

| # | Menu | Dropdown |
|---|---|---|
| 1 | Hệ sinh thái Việt Anh | Liên cấp, PDR, Triết lý, Sub-brands |
| 2 | Cấp học | MN / TH / THCS / THPT (mega-menu + sub) |
| 3 | Cơ sở | 7 campus + "Tìm cơ sở gần bạn" |
| 4 | Tuyển sinh & Trải nghiệm | Assessment Day, Open Day, Học thử, Summer Camp |
| 5 | Học phí & Học bổng | Hub + chính sách ưu đãi |
| 6 | Phụ huynh | Articles |
| 7 | Liên hệ | — |

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

# 11. INTERNAL LINKING RULES

| Rule | Chi tiết |
|---|---|
| R1 | Homepage → mọi pillar + conversion hub + `/he-sinh-thai-viet-anh` |
| R2 | Pillar → campus + conversion + cluster + `/cam-ket-dau-ra-ielts-60` |
| R3 | Campus → pillar + landing + conversion + sub-brand silo |
| R4 | Blog → ≥1 pillar + ≥1 conversion + 1 campus phù hợp |
| R5 | Landing → tối đa 5 internal links (conversion-focused: học phí, học bổng, FAQ, đăng ký tư vấn) |
| R6 | Mọi trang quan trọng nhận ≥2–5 internal links (no orphan) |
| R7 | Success-stories → link chéo tất cả campus + pillar |
| R8 | Không để blog có quá nhiều outbound links gây loãng intent |

## Breadcrumbs

| Loại | Pattern |
|---|---|
| Brand | `Trang chủ > Giới thiệu > [page]` |
| Level | `Trang chủ > Cấp học > Mầm non` |
| Campus | `Trang chủ > Cơ sở > [campus]` |
| Landing | `Trang chủ > Tuyển sinh > [landing]` |
| Blog | `Trang chủ > Blog > [cluster] > [post]` |
| Sub-brand | `Trang chủ > Hệ sinh thái > [brand]` |

---

# 12. FUNNEL MAP

| Stage | Pages | Link forward |
|---|---|---|
| **TOFU** | Blog, Phụ huynh, Triết lý, PDR | → Pillar, Trust, CTA mềm |
| **MOFU** | Pillar, Campus, Học phí, Học bổng | → Admissions, Visit, Open Day |
| **BOFU** | Landing, Đăng ký tư vấn, Tham quan, Open Day | → Form, Call, Zalo, Booking |

---

# 13. THỨ TỰ TRIỂN KHAI

## Phase 1 — Core Launch (~45 trang) — Bắt buộc để staging đánh giá
- 8 brand/core pages (`/`, `/gioi-thieu`, `/triet-ly-giao-duc`, `/he-thong-pdr`, `/cam-ket-dau-ra-ielts-60`, `/gia-tri-cot-loi`, `/doi-ngu`, `/he-sinh-thai-viet-anh`)
- 4 pillar pages + 16 sub-pages (cấp học)
- `/tuyen-sinh` + `/hoc-phi` + `/dang-ky-tu-van` + `/tham-quan-truong` + `/lien-he`
- 5 campus pages chính (TPHCM)
- 10 landing pages core (cấp+cơ sở)
- `/blog` + `/blog/tin-tuc-su-kien/`

## Phase 2 — Conversion & SEO (~60 trang thêm)
- 2 campus còn lại (Long An, Kiên Giang)
- 3 sub-brand pages
- `/hoc-bong` + `/open-day` + `/summer-camp`
- 30 landing pages (học phí + event + local)
- 20 blog bài đầu tiên (MN + TH clusters)
- `/tuyen-sinh/quy-trinh-tuyen-sinh` + `/tuyen-sinh/cau-hoi-thuong-gap`
- `/co-so-vat-chat` + `/doi-ngu-giao-vien` (nếu tách riêng)
- 3-5 landing pages đầu tiên cho ads

## Phase 3 — SEO Scale (~400+ trang thêm)
- Phụ huynh hub 10+ trang
- 50+ landing local adjacency + campaign
- Blog clusters mở rộng (target 410 bài năm 1)
- Success stories factory
- `/chuong-trinh-song-ngu` + `/hoat-dong-ngoai-khoa`
- `/su-kien` + `/thu-vien-anh` + `/video`
- Thêm landing pages theo campaign
- Thêm blog theo keyword map

---

# 14. NOTES CHO MIGRATION TỪ WORDPRESS

- Bài viết cũ không copy nguyên văn, sẽ viết lại theo cluster và search intent mới
- Ảnh sẽ đưa sang R2 và phát qua `media.truongvietanh.com`
- Site WordPress hiện tại giữ nguyên trong suốt quá trình staging
- Redirect mapping sẽ được lập sau khi chốt URL mới

---

> **Tài liệu này được tổng hợp từ:** `website-architecture-v2.md` + `sitemap-seo-ads.md`
> **Ngày tổng hợp:** 2026-03-22
