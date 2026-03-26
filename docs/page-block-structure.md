# CẤU TRÚC CHI TIẾT TỪNG NHÓM TRANG — BLOCK-BY-BLOCK
## Template-Driven Growth System | truongvietanh.com

> 16 Template Classes + ~30 UI Blocks reusable + Directus data + Astro rendering

---

# CORE BLOCK LIBRARY (DÙNG CHO TOÀN SITE)

## 30 Block Chính — Reusable

### HERO
- `hero_message_match` — khớp headline ads
- `hero_philosophy` — triết lý cấp học
- `hero_campus_real` — ảnh/video thật campus
- `hero_video_background` — video nền brand
- `hero_video_vertical` — TikTok/Reels mobile-first
- `pain_point_hero` — mở bằng nỗi lo phụ huynh

### CONVERSION
- `form_short` — form 4 trường + consent
- `form_event_registration` — đăng ký sự kiện
- `form_trial_class` — đặt học thử
- `calendar_booking_block` — chọn ngày/giờ tham quan
- `referral_form_block` — giới thiệu bạn bè

### TRUST
- `trust_metrics` — số liệu (học sinh, campus, rating)
- `testimonial_video_short` — video review ngắn
- `review_carousel_by_campus` — review riêng theo cơ sở
- `testimonial_proof_block` — proof block kết hợp

### CONTENT
- `curriculum_highlights` — chương trình nổi bật
- `campus_features_bullet` — điểm mạnh cơ sở
- `timeline_block` — timeline sự kiện / một ngày
- `comparison_table` — so sánh chương trình / trường
- `faq_accordion` — FAQ mở rộng
- `faq_compact` — FAQ ngắn gọn

### NAV / SEO
- `internal_link_hub` — hub link nội bộ
- `toc_block` — mục lục bài viết
- `related_posts_block` — bài liên quan

### SYSTEM
- `quick_filter_block` — lọc cấp học + khu vực
- `stats_counter_block` — counter animation
- `next_step_blocks` — bước tiếp sau thank-you
- `pixel_event_block` — tracking event

---

# A. HOMEPAGE `/` — Class 12: Grand Central Station

## Vai trò
- Brand flagship — định vị toàn hệ trong 5-7 giây
- Funnel router — điều hướng đúng cấp học / cơ sở
- Branded SEO

## Block Flow

| # | Block | Nội dung | CTA |
|---|---|---|---|
| 1 | `hero_video_background` | Video thật campus + HS. Quick filter: chọn cấp học + khu vực → redirect local landing | Đăng ký tư vấn / Tham quan |
| 2 | `stats_counter_block` | Số học sinh, số cơ sở, review 4.9★ | — |
| 3 | `brand_positioning_block` | 4 USP: Liên cấp, PDR, Chuyên Anh, Hạnh phúc | — |
| 4 | `level_navigation_block` | Mầm Non → THPT, mỗi card có CTA | Xem cấp học |
| 5 | `campus_selector_block` | Map + list cơ sở, lọc theo khu vực | Xem cơ sở gần bạn |
| 6 | `trust_metrics` | Review phụ huynh + video ngắn | — |
| 7 | `pdr_block` | Plan – Do – Review visual flow | Tìm hiểu PDR |
| 8 | `news_events_carousel` | Open Day, Summer Camp | Đăng ký ngay |
| 9 | `main_cta_block` | Form ngắn + hotline + Zalo | Đăng ký tư vấn |
| 10 | `faq_compact` | 5 câu hỏi phổ biến nhất | — |
| 11 | `footer_full` | — | — |

---

# B. GIỚI THIỆU `/gioi-thieu`

## Vai trò
Corporate page — tăng trust cho phụ huynh muốn hiểu sâu

## Nội dung bắt buộc
- Lịch sử hình thành (2011)
- Triết lý "Một đứa trẻ hạnh phúc sẽ học tốt nhất"
- Câu chuyện thương hiệu
- Hệ giá trị cốt lõi
- Sứ mệnh và tầm nhìn
- Mô hình liên cấp
- Lời mời tham quan thực tế

---

# C. TRIẾT LÝ GIÁO DỤC `/triet-ly-giao-duc`

## Vai trò
Thought leadership — brand depth — tăng trust trước khi phụ huynh so sánh học phí

## Nội dung
- "Vui vẻ và Thực dụng" là gì
- Học sinh hạnh phúc học tốt hơn như thế nào
- Giáo dục thực dụng nghĩa là gì
- Không chạy theo điểm số đơn thuần
- Môi trường nhân văn nhưng có kỷ luật

> **Không bán trực tiếp** — chỉ tăng niềm tin

---

# D. HỆ THỐNG PDR `/he-thong-pdr`

## Vai trò
**Signature page** — khác biệt chiến lược #1 của Việt Anh
→ Phải là **pillar page thực thụ**, KHÔNG được làm sơ sài

## Nội dung
- PDR là gì — Plan · Do · Review
- Vì sao PDR khác biệt
- Vận hành ra sao theo từng cấp học
- Ví dụ thực tế (HS thuyết trình với phụ huynh)
- Lợi ích: tự chủ, phản tư, trách nhiệm

---

# E. CƠ SỞ HUB `/co-so`

## Vai trò
Hub Local SEO + điều hướng user về campus đúng

## Nội dung
- Bản đồ hệ thống tổng thể
- Danh sách tất cả cơ sở (card view)
- Lọc theo cấp học, lọc theo khu vực
- CTA: "Tìm cơ sở gần bạn"

**Mỗi card cơ sở**: tên, cấp học, địa chỉ, hotline, CTA xem cơ sở / đặt tham quan

---

# F. TRANG CẤP HỌC — Pillar Pages (Class 6)

Áp dụng cho: `/mam-non`, `/tieu-hoc`, `/trung-hoc-co-so`, `/trung-hoc-pho-thong`

## Vai trò
SEO authority + education page + hub linking

## Block Flow

| # | Block | Chi tiết |
|---|---|---|
| 1 | `hero_philosophy` | Triết lý cấp học + quick filter → campus |
| 2 | `curriculum_highlights` | Chương trình học, tiếng Anh, kỹ năng |
| 3 | `outcomes_block` | Chuẩn đầu ra, kỹ năng đạt được |
| 4 | `teacher_profile_block` | Giáo viên bản xứ |
| 5 | `pdr_block` | PDR áp dụng ở cấp này |
| 6 | `day_in_life_block` | "Một ngày của bé" — giúp PH hình dung |
| 7 | `campus_programs_list` | Cơ sở có cấp học + link campus page |
| 8 | `fee_preview_block` | Preview học phí + link `/hoc-phi` |
| 9 | `review_carousel_by_campus` | Testimonials |
| 10 | `internal_link_hub` | Học phí, blog, landing pages |
| 11 | `faq_accordion` | FAQ theo cấp học |
| 12 | `form_short` / `floating_zalo_cta_sticky` | CTA cuối |

### Riêng Mầm Non cần nhấn mạnh thêm:
- Nhận trẻ từ độ tuổi nào
- An toàn, chăm sóc, thích nghi
- Phát triển cảm xúc
- Môi trường song ngữ
- Campus mầm non chính

---

# G. CAMPUS PAGES `/co-so/[slug]` — Class 7: Master Campus Profile

## Vai trò
Local trust page + Local SEO page + Admissions theo cơ sở
→ Phải là "micro-brand page" trong ô thương hiệu Việt Anh, **KHÔNG được** làm như contact page mở rộng

## Block Flow

| # | Block | Chi tiết |
|---|---|---|
| 1 | `hero_campus_real` | Ảnh thật, tên cơ sở, địa chỉ, hotline |
| 2 | `google_map_embed_with_directions` | Bản đồ + chỉ đường |
| 3 | `campus_features_bullet` | Hồ bơi, sân chơi, camera, quy mô... |
| 4 | `campus_gallery_block` | Ảnh thật cơ sở |
| 5 | `campus_programs_list` | Cấp học tại cơ sở + link pillar |
| 6 | `review_carousel_by_campus` | Review **riêng cơ sở** |
| 7 | `transport_block` | Xe đưa đón (optional) |
| 8 | `faq_accordion` | FAQ campus |
| 9 | `form_short` / `calendar_booking_block` | Đặt tham quan |
| 10 | `related_landing_block` | Học phí, Open Day, Trial class |
| 11 | `floating_cta` | Zalo + Call sticky |

---

# H. TUYỂN SINH HUB `/tuyen-sinh`

## Vai trò
Admissions hub — đầu mối toàn bộ phễu chuyển đổi

## Nội dung
- Quy trình tuyển sinh
- Các cấp học đang tuyển
- Campus đang tuyển
- Cách đăng ký + hồ sơ cần chuẩn bị
- Open Day / Assessment Day / Trial Class
- CTA lớn

---

# I. HỌC PHÍ `/hoc-phi` — Money Page

## Vai trò
High-intent commercial page — "money page" quan trọng nhất

## Nội dung
- Nguyên tắc học phí
- Học phí theo cấp học/cơ sở (range nếu không public đầy đủ)
- Giải thích yếu tố cấu thành
- CTA: Nhận bảng học phí chi tiết
- Chính sách ưu đãi / đóng trước / anh chị em / học bổng

> **Không nên ẩn** — phụ huynh VN cần cảm giác minh bạch

---

# J. ĐĂNG KÝ TƯ VẤN `/dang-ky-tu-van` — Central Conversion

**Form**: Họ tên | SĐT | Cấp học quan tâm | Cơ sở quan tâm | Consent checkbox
**Sau submit**: Thank-you page → đẩy GHL → trigger Zalo/CRM

---

# K. THAM QUAN TRƯỜNG `/tham-quan-truong`

High-quality lead capture — **rất quan trọng cho giáo dục**
- Vì sao nên tham quan
- Phụ huynh sẽ trải nghiệm gì
- Chọn campus / ngày / giờ
- CTA booking

---

# L. OPEN DAY `/open-day`

Event conversion page + community builder
- Lịch sự kiện + campus
- Agenda + đối tượng tham gia
- Form đăng ký + quota/urgency

---

# M. HỌC BỔNG `/hoc-bong`

Conversion + seasonal campaign page
- Các loại học bổng / ưu đãi
- Điều kiện + thời hạn
- Cấp học áp dụng + CTA đăng ký

---

# N. PHỤ HUYNH HUB `/phu-huynh/[slug]`

## Khác blog ở:
- Thiên về thought leadership, trust, parent education
- Ít "SEO article vibe"
- Mang tính thương hiệu cao hơn
- Hỗ trợ demand creation + authority

## Ví dụ
- `/phu-huynh/cach-chon-truong-mam-non`
- `/phu-huynh/nuoi-day-su-tu-chu`
- `/phu-huynh/vi-sao-hoc-sinh-can-pdr`

---

# O. BLOG `/blog/[slug]` — SEO Cluster Engine

## Blog KHÔNG phải "tin tức trường" — mà là **cluster engine**

## Clusters
- `/blog/mam-non/` — mấy tuổi đi mầm non, trẻ khóc khi đi học, chọn trường...
- `/blog/tieu-hoc/` — chuẩn bị vào lớp 1, tiếng Anh tiểu học...
- `/blog/trung-hoc-co-so/` — lộ trình học, IELTS cấp 2...
- `/blog/trung-hoc-pho-thong/` — định hướng ĐH, du học...
- `/blog/hoc-phi/` — so sánh, học phí tham khảo...
- `/blog/success-stories/` — review thật (chuyển đổi CAO NHẤT)
- `/blog/review-thuc-te/` — đánh giá thực của phụ huynh

## Blog Rules
- Mọi bài → link về ≥1 pillar page
- Mọi bài → link về ≥1 conversion page phù hợp
