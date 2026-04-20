# BLUEPRINT: CẤU TRÚC TRANG TỐI ƯU SEO + AIO + LEAD GEN
## Phong cách HubSpot Pillar Page — Áp dụng cho truongvietanh.com

> Ngày tạo: 2026-04-07
> Mục tiêu: Mỗi trang vừa rank Google, vừa xuất hiện trong AI Overview, vừa thu lead

---

## MỤC LỤC

1. [Tổng quan kiến trúc Topic Cluster](#1-tổng-quan-kiến-trúc-topic-cluster)
2. [Anatomy chi tiết 1 Pillar Page](#2-anatomy-chi-tiết-1-pillar-page)
3. [Kỹ thuật tối ưu AI Overview (AIO)](#3-kỹ-thuật-tối-ưu-ai-overview-aio)
4. [Lead Capture Framework](#4-lead-capture-framework)
5. [Schema Markup & Technical SEO](#5-schema-markup--technical-seo)
6. [Template HTML/Astro mẫu](#6-template-htmlastro-mẫu)
7. [Checklist trước khi publish](#7-checklist-trước-khi-publish)

---

## 1. TỔNG QUAN KIẾN TRÚC TOPIC CLUSTER

HubSpot sử dụng mô hình **Topic Cluster** — 1 Pillar Page trung tâm kết nối với nhiều Subtopic Pages qua internal links:

```
                    ┌──────────────────┐
                    │   PILLAR PAGE    │
                    │ "Trường Việt Anh"│
                    │   (3000-5000 từ) │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
    ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
    │ Subtopic  │     │ Subtopic  │     │ Subtopic  │
    │ "Mầm non" │     │ "THCS"    │     │ "Học phí" │
    │(1500-2500)│     │(1500-2500)│     │(1500-2500)│
    └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
          │                  │                  │
    ┌─────▼─────┐     ┌─────▼─────┐     ┌─────▼─────┐
    │  Blog     │     │  Blog     │     │  Blog     │
    │"Checklist │     │"Chuyển cấp│     │"Học bổng  │
    │ chọn MN"  │     │ lên THCS" │     │ 2026"     │
    │(800-1500) │     │(800-1500) │     │(800-1500) │
    └───────────┘     └───────────┘     └───────────┘
```

**Áp dụng cho truongvietanh.com:**

| Cấp | Pillar Page | Subtopic Pages | Blog Posts |
|-----|-------------|----------------|------------|
| Tổng | /gioi-thieu | /he-thong-pdr, /triet-ly-giao-duc | /tin-tuc/[slug] |
| Mầm non | /mam-non | /tuyen-sinh/mam-non/*, /co-so/mam-non-* | Blog liên quan |
| Tiểu học | /tieu-hoc | /tuyen-sinh/tieu-hoc/* | Blog liên quan |
| THCS | /trung-hoc-co-so | /tuyen-sinh/thcs/* | Blog liên quan |
| THPT | /trung-hoc-pho-thong | /tuyen-sinh/thpt/* | Blog liên quan |
| Tài chính | /hoc-phi | /hoc-bong | Blog liên quan |

---

## 2. ANATOMY CHI TIẾT 1 PILLAR PAGE

Dưới đây là cấu trúc từng pixel của 1 trang kiểu HubSpot, thiết kế cho giáo dục:

### TẦNG 0: META & HEAD (Không hiển thị)

```html
<title>Trường Mầm Non Quốc Tế Tại TP.HCM — Chương Trình Song Ngữ K-12 | Trường Việt Anh</title>
<!-- Quy tắc: [Keyword chính] — [Giá trị/USP] | [Brand] (≤60 ký tự) -->

<meta name="description" content="Trường Mầm Non Việt Anh tại TP.HCM với chương trình song ngữ,
tiếng Anh 100%, hệ thống PDR phát triển tự chủ. Xem lộ trình học và đăng ký tham quan miễn phí." />
<!-- Quy tắc: [Mô tả giá trị] + [CTA] (≤155 ký tự) -->

<link rel="canonical" href="https://truongvietanh.com/mam-non" />

<!-- Schema (xem Section 5) -->
<script type="application/ld+json">...</script>
```

### TẦNG 1: STICKY NAVIGATION BAR

```
┌─────────────────────────────────────────────────────────────┐
│ TOP BAR (xanh đậm #1a1a5e, 40px)                           │
│ ☎ Hotline: 0916 961 409 | 💬 Zalo OA | 📱 Facebook | Chat  │
│                                          [Tư vấn tuyển sinh]│
├─────────────────────────────────────────────────────────────┤
│ MAIN NAV (trắng, 70px, sticky khi scroll)                   │
│ Trang Chủ  Giới Thiệu▼  Chương Trình▼  Tuyển Sinh▼         │
│                    [LOGO]                                    │
│                         Học Thuật▼  Dịch Vụ▼  Blog  Liên hệ│
└─────────────────────────────────────────────────────────────┘
```

**Kỹ thuật HubSpot:**
- Header sticky nhưng thu gọn khi scroll xuống (60px thay 110px)
- Logo thu nhỏ khi scroll
- CTA button luôn hiện dù scroll

### TẦNG 2: HERO SECTION (Above the Fold)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  BREADCRUMB: Trang chủ > Chương trình > Mầm non            │
│                                                             │
│  ┌─────────────────────┐  ┌──────────────────────────────┐  │
│  │                     │  │                              │  │
│  │  H1: Trường Mầm Non │  │  LEAD FORM (float right)    │  │
│  │  Việt Anh: Nơi Con  │  │  ┌────────────────────────┐ │  │
│  │  Học Tiếng Anh Như   │  │  │ 🎓 Đăng ký tham quan  │ │  │
│  │  Trẻ Bản Xứ         │  │  │    miễn phí            │ │  │
│  │                     │  │  │                        │ │  │
│  │  Subtitle:           │  │  │ Email: [_________]    │ │  │
│  │  Chương trình 100%   │  │  │                        │ │  │
│  │  tiếng Anh, phát     │  │  │ [Tiếp tục →]          │ │  │
│  │  triển tự chủ từ     │  │  │                        │ │  │
│  │  2-6 tuổi            │  │  │ ✓ 1,200+ PH đăng ký   │ │  │
│  │                     │  │  │ ✓ Miễn phí tư vấn     │ │  │
│  │  ★★★★★ 4.9/5        │  │  │ ✓ Phản hồi trong 24h  │ │  │
│  │  (300+ đánh giá)    │  │  └────────────────────────┘ │  │
│  │                     │  │                              │  │
│  └─────────────────────┘  └──────────────────────────────┘  │
│                                                             │
│  [Trust Bar] 15+ năm | 9 cơ sở | IELTS 6-8 | 99% vào ĐH  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Nguyên tắc HubSpot:**
- H1 chứa keyword chính + brand (1 lần duy nhất trên trang)
- Form hoặc CTA nằm NGAY trên hero (above the fold)
- Social proof ngay dưới form (đánh giá, số lượng)
- Breadcrumb giúp SEO + UX
- Không dùng ảnh hero lớn → dùng CSS gradient để tải nhanh

### TẦNG 3: STICKY TABLE OF CONTENTS (Sidebar)

```
┌──────────────────┐  ┌────────────────────────────────────┐
│ MỤC LỤC (sticky) │  │ NỘI DUNG CHÍNH                    │
│                  │  │                                    │
│ 1. Tổng quan     │  │ ...                                │
│ 2. Chương trình  │  │                                    │
│ 3. Phương pháp   │  │                                    │
│ 4. Tiếng Anh     │  │                                    │
│ 5. Học phí       │  │                                    │
│ 6. Cơ sở         │  │                                    │
│ 7. Đánh giá      │  │                                    │
│ 8. FAQ           │  │                                    │
│                  │  │                                    │
│ ──────────────── │  │                                    │
│ [📞 Tư vấn ngay] │  │                                    │
│ ──────────────── │  │                                    │
│                  │  │                                    │
│ 📥 Tải checklist │  │                                    │
│ chọn trường      │  │                                    │
│ (Lead magnet)    │  │                                    │
└──────────────────┘  └────────────────────────────────────┘
```

**Kỹ thuật:**
- TOC sticky ở sidebar trái (desktop) hoặc horizontal scroll (mobile)
- Highlight mục đang đọc (Intersection Observer)
- CTA nhỏ nằm trong TOC sidebar
- Lead magnet download nằm trong sidebar

### TẦNG 4: NỘI DUNG CHÍNH (Content Blocks)

Mỗi section sử dụng cấu trúc **AIO-First**:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  H2: Chương trình tiếng Anh mầm non như thế nào?           │
│  ─────────────────────────────────────────────              │
│                                                             │
│  ┌─── AIO ANSWER BOX (2-3 câu đầu) ───────────────────┐   │
│  │                                                      │   │
│  │  Chương trình tiếng Anh mầm non tại Trường Việt Anh  │   │
│  │  được thiết kế để trẻ 2-6 tuổi tiếp thu ngôn ngữ    │   │
│  │  tự nhiên qua phương pháp immersion — 100% giao tiếp │   │
│  │  bằng tiếng Anh trong lớp với giáo viên bản ngữ.    │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Đoạn mở rộng 1:                                            │
│  Nghiên cứu từ MIT (2018) cho thấy trẻ em dưới 6 tuổi có  │
│  khả năng tiếp thu ngôn ngữ thứ hai gần như bản ngữ nếu    │
│  được tiếp xúc ít nhất 4 giờ/ngày. Tại Việt Anh, học sinh │
│  mầm non học 6 tiếng/ngày hoàn toàn bằng tiếng Anh...     │
│                                                             │
│  ┌─── EVIDENCE BOX (dẫn chứng) ────────────────────────┐   │
│  │  📊 Số liệu: 95% học sinh MN Việt Anh đạt Cambridge │   │
│  │     YLE Starters sau 2 năm học                        │   │
│  │  📋 Nguồn: Báo cáo kết quả Cambridge 2024-2025       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  Đoạn mở rộng 2:                                            │
│  Lộ trình cụ thể: Mầm non (immersion) → Tiểu học (UK      │
│  curriculum + Toán, Khoa học) → THCS (giao tiếp + học      │
│  thuật) → THPT (IELTS 6.0-8.0)                            │
│                                                             │
│  ┌─── INLINE CTA ─────────────────────────────────────┐    │
│  │  👉 Xem chi tiết chương trình tiếng Anh mầm non →   │    │
│  │     [Tải lộ trình PDF miễn phí]                      │    │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  🔗 Bài viết liên quan:                                     │
│  • So sánh phương pháp dạy tiếng Anh: Immersion vs ...    │
│  • 10 dấu hiệu con bạn sẵn sàng học song ngữ             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Quy tắc AIO-First cho mỗi H2 section:**

| Thành phần | Mục đích | Quy tắc |
|------------|----------|---------|
| H2 dạng câu hỏi | Match search intent | Dùng exact query PH hay search |
| 2-3 câu đầu | AIO Answer Box | Trả lời TRỰC TIẾP, không vòng vo |
| Đoạn mở rộng | E-E-A-T depth | Dẫn chứng, số liệu, nguồn uy tín |
| Evidence Box | Trust signals | Số liệu cụ thể + nguồn |
| Inline CTA | Lead capture | 1 CTA mỗi 300-500 từ |
| Related links | Internal linking | 2-3 link đến subtopic/blog |

### TẦNG 5: COMPARISON TABLE (Đặc trưng HubSpot)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  H2: So sánh Trường Việt Anh với các trường tại TP.HCM     │
│                                                             │
│  ┌───────────────┬───────────┬───────────┬─────────────┐    │
│  │ Tiêu chí      │ Việt Anh  │ Trường    │ Trường      │    │
│  │               │           │ công lập  │ QT khác     │    │
│  ├───────────────┼───────────┼───────────┼─────────────┤    │
│  │ Tiếng Anh     │ ✅ IELTS  │ ❌ Cơ bản │ ✅ Tốt      │    │
│  │               │ 6.0-8.0   │           │             │    │
│  ├───────────────┼───────────┼───────────┼─────────────┤    │
│  │ Kỹ năng TK21  │ ✅ 16 KN  │ ❌ Hạn chế│ ⚠️ Một phần │    │
│  ├───────────────┼───────────┼───────────┼─────────────┤    │
│  │ Học phí/tháng │ 5-8 triệu │ 0-500K   │ 15-30 triệu│    │
│  ├───────────────┼───────────┼───────────┼─────────────┤    │
│  │ Xe đưa rước   │ ✅ Có     │ ❌ Không  │ ⚠️ Tuỳ      │    │
│  ├───────────────┼───────────┼───────────┼─────────────┤    │
│  │ PDR cá nhân   │ ✅ Có     │ ❌ Không  │ ❌ Không    │    │
│  └───────────────┴───────────┴───────────┴─────────────┘    │
│                                                             │
│  💡 Kết luận: Việt Anh cung cấp chất lượng tiệm cận        │
│     trường quốc tế với mức học phí phù hợp gia đình        │
│     trung lưu tại TP.HCM.                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Mục đích:** Google thường pull bảng so sánh vào Featured Snippets và AI Overview.

### TẦNG 6: SOCIAL PROOF SECTION

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  H2: Phụ huynh nói gì về Trường Việt Anh?                  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ AGGREGATE RATING BAR                                  │  │
│  │ ★★★★★ 4.9/5 trên Google (312 đánh giá)               │  │
│  │ [Xem trên Google Maps ↗]                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ [📸 Ảnh PH]  │  │ [📸 Ảnh PH]  │  │ [📸 Ảnh PH]  │      │
│  │              │  │              │  │              │      │
│  │ "Con tôi từ  │  │ "Học phí hợp │  │ "Tiếng Anh  │      │
│  │ nhút nhát    │  │ lý, chất     │  │ của con tiến │      │
│  │ thành tự tin │  │ lượng xứng   │  │ bộ rõ rệt   │      │
│  │ giao tiếp    │  │ đáng..."     │  │ sau 1 năm"  │      │
│  │ tiếng Anh"   │  │              │  │              │      │
│  │              │  │              │  │              │      │
│  │ — Chị Lan    │  │ — Anh Minh   │  │ — Chị Hương  │      │
│  │ PH lớp 3A    │  │ PH lớp 7B    │  │ PH MN-A2    │      │
│  │ ★★★★★        │  │ ★★★★★        │  │ ★★★★★        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ◀ ●●●○○ ▶  (carousel nếu >3 đánh giá)                     │
│                                                             │
│  [Xem tất cả đánh giá →]                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### TẦNG 7: FAQ SECTION (AIO + People Also Ask)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  H2: Câu hỏi thường gặp về Trường Mầm Non Việt Anh        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ▾ Học phí trường mầm non Việt Anh bao nhiêu 1 tháng?│    │
│  │                                                     │    │
│  │   Học phí mầm non Việt Anh dao động từ 5-8 triệu   │    │
│  │   đồng/tháng tuỳ chương trình (bán trú hoặc nội    │    │
│  │   trú). Đã bao gồm: học phí, ăn trưa, snack, và   │    │
│  │   tất cả hoạt động ngoại khoá. Không phát sinh      │    │
│  │   thêm phí.                                         │    │
│  │   → Xem bảng học phí chi tiết                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ▸ Trường Việt Anh có xe đưa rước không?              │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ▸ Trường có nhận trẻ từ mấy tuổi?                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ▸ Chương trình tiếng Anh mầm non khác gì trường QT?│    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ ▸ Có chính sách ưu đãi cho anh chị em ruột không?  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Schema: FAQPage (xem Section 5)                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Quy tắc FAQ cho AIO:**
- Câu hỏi = exact match những gì PH search trên Google
- Câu trả lời 2-4 câu, trực tiếp, không marketing
- Mỗi FAQ có 1 internal link
- Dùng FAQPage schema

### TẦNG 8: BOTTOM CTA + FORM

```
┌─────────────────────────────────────────────────────────────┐
│  (Background: gradient xanh đậm)                            │
│                                                             │
│  H2: Sẵn sàng tìm hiểu thêm?                              │
│                                                             │
│  Đoạn CTA: Đặt lịch tham quan miễn phí hoặc nhận tư vấn   │
│  1-1 với chuyên viên tuyển sinh Việt Anh.                   │
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │ FORM 2 BƯỚC (giống hero nhưng full-width)          │     │
│  │                                                    │     │
│  │ Bước 1: Email → [Tiếp tục]                         │     │
│  │ Bước 2: Tên + SĐT + Tên con + Cấp học → [Gửi]    │     │
│  │                                                    │     │
│  │ Social proof: "1,200+ PH đã đăng ký tuần này"     │     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  Hoặc: ☎ Gọi 0916 961 409 | 💬 Chat Zalo | 📱 Messenger    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### TẦNG 9: RELATED CONTENT (Internal Linking)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  H2: Bài viết liên quan                                    │
│                                                             │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │ [Ảnh]          │  │ [Ảnh]          │  │ [Ảnh]          ││
│  │ Category tag   │  │ Category tag   │  │ Category tag   ││
│  │                │  │                │  │                ││
│  │ 10 Tiêu Chí   │  │ So Sánh Trường │  │ Học Bổng       ││
│  │ Chọn Trường    │  │ MN Tại Gò Vấp  │  │ Mầm Non 2026  ││
│  │ Mầm Non Cho   │  │                │  │                ││
│  │ Con            │  │ Đọc thêm →     │  │ Đọc thêm →    ││
│  │                │  │                │  │                ││
│  │ Đọc thêm →    │  │                │  │                ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                             │
│  [Xem tất cả bài viết →]                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### TẦNG 10: FOOTER CTA + FOOTER

```
┌─────────────────────────────────────────────────────────────┐
│ FOOTER CTA BAR (vàng gold)                                  │
│ "Đăng ký tư vấn miễn phí" [Gọi ngay] [Zalo] [Facebook]    │
├─────────────────────────────────────────────────────────────┤
│ FOOTER (xanh đậm)                                          │
│ Logo + Giới thiệu | Links nhanh | Chương trình             │
│ © 2026 truongvietanh.com                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ MOBILE STICKY BAR (fixed bottom, chỉ mobile)               │
│ [📞 Gọi] [💬 Zalo] [📝 Đăng ký miễn phí]                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. KỸ THUẬT TỐI ƯU AI OVERVIEW (AIO)

### 3.1 Nguyên tắc AIO-First Writing

Google AI Overview lấy nội dung từ trang web để tạo câu trả lời tóm tắt. Để được chọn:

**A. Mở đầu mỗi section bằng câu trả lời trực tiếp:**

```
❌ SAI: "Trong bài viết này, chúng tôi sẽ giới thiệu về chương trình..."
✅ ĐÚNG: "Chương trình tiếng Anh mầm non tại Trường Việt Anh sử dụng
          phương pháp immersion — trẻ 2-6 tuổi học 100% bằng tiếng Anh
          với giáo viên bản ngữ, đạt Cambridge YLE sau 2 năm."
```

**B. Dùng H2 dạng câu hỏi (match People Also Ask):**

```
❌ SAI: <h2>Chương trình tiếng Anh</h2>
✅ ĐÚNG: <h2>Chương trình tiếng Anh mầm non tại Trường Việt Anh như thế nào?</h2>
```

**C. Cung cấp số liệu cụ thể + nguồn:**

```
❌ SAI: "Học sinh đạt kết quả tốt"
✅ ĐÚNG: "95% học sinh mầm non Việt Anh đạt Cambridge YLE Starters
          sau 2 năm học (theo báo cáo Cambridge 2024-2025)"
```

**D. Structured Data giúp AIO hiểu ngữ cảnh:**

```
❌ SAI: Không có schema
✅ ĐÚNG: FAQPage + EducationalOrganization + AggregateRating + BreadcrumbList
```

### 3.2 Cấu trúc câu cho AIO

Mỗi H2 section tuân theo công thức:

```
[Câu 1: Định nghĩa/Trả lời trực tiếp — chứa keyword]
[Câu 2: Bổ sung chi tiết — số liệu hoặc so sánh]
[Câu 3: Kết luận ngắn — tại sao điều này quan trọng]

[Đoạn mở rộng: Giải thích sâu với E-E-A-T signals]
[Dẫn chứng: Nghiên cứu, số liệu, trích dẫn chuyên gia]
[Áp dụng: Trường Việt Anh thực hiện như thế nào]
```

### 3.3 Danh sách câu hỏi AIO cho từng cấp học

**Mầm non:**
- Trường mầm non song ngữ tốt nhất tại TP.HCM là trường nào?
- Học phí trường mầm non quốc tế ở Gò Vấp bao nhiêu?
- Nên cho con học mầm non song ngữ từ mấy tuổi?
- So sánh trường mầm non công lập và tư thục tại TP.HCM

**Tiểu học:**
- Trường tiểu học song ngữ tại TP.HCM nào tốt?
- Chương trình tiểu học Cambridge khác gì chương trình Bộ?
- Học phí trường tiểu học tư thục TP.HCM 2026

**THCS:**
- Nên chọn trường THCS tư thục hay công lập?
- Trường THCS nào dạy tiếng Anh tốt tại TP.HCM?
- Chuẩn bị gì cho con chuyển cấp lên lớp 6?

**THPT:**
- Rớt lớp 10 công lập thì học ở đâu?
- Trường THPT tư thục tốt nhất TP.HCM
- Lộ trình IELTS cho học sinh THPT

---

## 4. LEAD CAPTURE FRAMEWORK

### 4.1 Quy tắc đặt CTA (theo HubSpot)

```
Vị trí CTA trên trang:
───────────────────────────────────────────────────────
Hero (above fold)     → Form 2 bước (primary)
Sau section 1         → Inline CTA text link
Sau section 2         → Lead magnet download
Sidebar (sticky)      → CTA button nhỏ
Sau section 4         → Inline CTA banner
FAQ section           → Mỗi FAQ có 1 link
Bottom                → Form 2 bước (full width)
Footer                → CTA bar vàng
Mobile                → Sticky bottom bar
───────────────────────────────────────────────────────
Tổng: 8-10 điểm chạm CTA trên 1 trang
```

### 4.2 Lead Magnet theo cấp học

| Cấp học | Lead Magnet | Funnel Code |
|---------|-------------|-------------|
| Tổng | Checklist 15 tiêu chí chọn trường | squeeze-checklist |
| Mầm non | Ebook "5 dấu hiệu con sẵn sàng đi học" | squeeze-mn-ebook |
| Tiểu học | Lộ trình phát triển tiếng Anh K-12 | squeeze-th-roadmap |
| THCS | Video webinar "Chuyển cấp thành công" | squeeze-thcs-webinar |
| THPT | Ebook "Lộ trình IELTS cho THPT" | squeeze-thpt-ielts |
| Học phí | Bảng học phí chi tiết 2026 | squeeze-hocphi |

### 4.3 Form 2 bước — Conversion Psychology

```
BƯỚC 1 (Ma sát thấp — chỉ email):
┌────────────────────────────────────────┐
│ 📧 Nhập email để nhận [Lead Magnet]   │
│                                        │
│ [email@example.com          ]          │
│                                        │
│ [Nhận ngay →]  (nút vàng, to, nổi bật)│
│                                        │
│ ☑ Tôi đồng ý nhận thông tin           │
│                                        │
│ 🟢 1,200+ phụ huynh đã đăng ký        │
└────────────────────────────────────────┘

↓ Sau khi submit email → webhook partial_capture → CRM

BƯỚC 2 (Commitment escalation — đã "đầu tư"):
┌────────────────────────────────────────┐
│ ✅ Email đã xác nhận!                  │
│                                        │
│ Để nhận tư vấn 1-1, vui lòng bổ sung: │
│                                        │
│ [Họ tên phụ huynh    ] [Số điện thoại] │
│ [Tên con em          ] [Cấp học ▼    ] │
│                                        │
│ [← Quay lại]  [Hoàn tất đăng ký]      │
└────────────────────────────────────────┘

↓ Sau khi submit full → webhook full_submit → CRM + auto email
```

---

## 5. SCHEMA MARKUP & TECHNICAL SEO

### 5.1 Schema cho mỗi Pillar Page

```json
[
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Trường Việt Anh",
    "url": "https://truongvietanh.com",
    "logo": "https://truongvietanh.com/logo-vietanh.webp",
    "description": "Hệ thống trường học liên cấp song ngữ từ Mầm non đến THPT",
    "telephone": "+84916961409",
    "email": "info@truongvietanh.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "269A Nguyễn Trọng Tuyển",
        "addressLocality": "Phú Nhuận",
        "addressRegion": "TP.HCM",
        "addressCountry": "VN"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "312",
      "bestRating": "5"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Học phí trường mầm non Việt Anh bao nhiêu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Học phí mầm non Việt Anh dao động từ 5-8 triệu đồng/tháng..."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Trang chủ", "item": "https://truongvietanh.com"},
      {"@type": "ListItem", "position": 2, "name": "Chương trình", "item": "https://truongvietanh.com/chuong-trinh"},
      {"@type": "ListItem", "position": 3, "name": "Mầm non", "item": "https://truongvietanh.com/mam-non"}
    ]
  }
]
```

### 5.2 Technical SEO Checklist

```
CORE WEB VITALS:
├── LCP < 2.5s    → Preload hero image, no external fonts blocking
├── FID < 100ms   → Defer non-critical JS
├── CLS < 0.1     → Width/height trên mọi img, font-display: swap
└── INP < 200ms   → Event handlers optimized

ON-PAGE:
├── H1: 1 lần duy nhất, chứa keyword chính
├── H2: 5-8 sections, mỗi cái = 1 câu hỏi search
├── Internal links: 15-25 links/trang (cả inline + sidebar + footer)
├── External links: 2-3 links uy tín (WEF, Cambridge, MIT...)
├── Image alt: Mô tả + keyword, không keyword stuffing
├── URL: /mam-non (ngắn, có keyword, không dấu tiếng Việt)
└── Canonical: Self-referencing canonical tag

TECHNICAL:
├── robots.txt: Allow all
├── sitemap.xml: Tự động generate
├── _redirects: 301 từ URL WordPress cũ
├── Cache headers: 1 year cho static assets
├── Preconnect: fonts.googleapis.com, fonts.gstatic.com
├── Lazy load: Tất cả ảnh dưới fold
└── HTTPS: Bắt buộc
```

---

## 6. ÁP DỤNG VÀO CÁC TRANG CỤ THỂ

### Mapping trang hiện tại → Blueprint

| Trang | Loại | Từ khóa chính | Sections cần có |
|-------|------|---------------|-----------------|
| /mam-non | Pillar | trường mầm non tphcm | Hero+Form, Chương trình, Tiếng Anh, PDR, Cơ sở, Đánh giá, FAQ, CTA |
| /tieu-hoc | Pillar | trường tiểu học song ngữ | Hero+Form, Chương trình, Tiếng Anh, Kỹ năng, Cơ sở, Đánh giá, FAQ, CTA |
| /trung-hoc-co-so | Pillar | trường thcs tư thục tphcm | Hero+Form, Chuyển cấp, Tiếng Anh, Leader in Me, Cơ sở, Đánh giá, FAQ, CTA |
| /trung-hoc-pho-thong | Pillar | trường thpt tư thục tphcm | Hero+Form, IELTS, Du học, Kỹ năng, Cơ sở, Đánh giá, FAQ, CTA |
| /hoc-phi | Pillar | học phí trường tư thục tphcm | Hero+Form, Bảng phí, So sánh, Học bổng, FAQ, CTA |
| /gioi-thieu | Pillar | trường việt anh | Hero, Lịch sử, Sứ mệnh, Đội ngũ, Cơ sở, Đánh giá, FAQ, CTA |

---

## 7. CHECKLIST TRƯỚC KHI PUBLISH

```
□ META
  □ Title ≤60 ký tự, chứa keyword + brand
  □ Description ≤155 ký tự, chứa keyword + CTA
  □ Canonical URL đúng
  □ OG tags (title, description, image 1200x630)
  □ Schema: EducationalOrganization + FAQPage + BreadcrumbList

□ CONTENT
  □ H1: 1 lần, chứa keyword chính
  □ H2: 5-8 sections dạng câu hỏi
  □ Mỗi H2 mở đầu bằng AIO answer (2-3 câu trực tiếp)
  □ Số liệu cụ thể + nguồn uy tín
  □ 3000-5000 từ cho Pillar Page
  □ Internal links: 15-25 links
  □ External links: 2-3 links uy tín

□ LEAD CAPTURE
  □ Form 2 bước ở hero (above fold)
  □ Inline CTA mỗi 300-500 từ
  □ Lead magnet offer
  □ Bottom CTA form
  □ Mobile sticky CTA bar
  □ Social proof cạnh mỗi form

□ TECHNICAL
  □ LCP < 2.5s (test PageSpeed)
  □ Tất cả ảnh có width/height + lazy load
  □ Font-display: swap
  □ Preconnect fonts
  □ Alt text trên mọi ảnh
  □ URL ngắn, có keyword, không dấu

□ UX
  □ Breadcrumb navigation
  □ Sticky TOC sidebar (desktop)
  □ FAQ accordion
  □ Comparison table (nếu có)
  □ Testimonials với ảnh + tên thật
  □ Mobile responsive
```

---

## NEXT STEPS

1. **Chọn 1 trang pilot** (khuyến nghị: /mam-non) → triển khai full blueprint
2. **Đo lường**: Cài GTM + GA4 + Search Console
3. **Replicate**: Áp dụng cho 5 pillar pages còn lại
4. **Content**: Viết 20-30 blog posts liên kết với pillar pages
5. **Monitor**: Theo dõi AIO appearances + keyword rankings
