# Marketing Workflow — Tạo landing page mới trong 10 phút

> Sau khi v2 architecture đã deploy, Marketing team có thể tự tạo landing/squeeze page mới trong **10-15 phút** mà không cần đợi dev. Hướng dẫn này dành cho người dùng Directus admin — **không yêu cầu biết code**.

---

## 1️⃣ Chuẩn bị (5 phút — một lần duy nhất)

### Bước 1: Xác định mục tiêu
Trả lời 3 câu hỏi trước khi mở Directus:

| Câu hỏi | Ví dụ |
|---------|-------|
| **Ai là khách hàng mục tiêu?** | Phụ huynh có con 5 tuổi ở Gò Vấp |
| **Bạn chào gì (mồi câu)?** | eBook "7 tiêu chí chọn trường mầm non" |
| **Funnel type?** | `lead_magnet` (PDF) / `trial` (học thử) / `webinar` / `direct_enrollment` / `awareness` |

### Bước 2: Chọn template + form
| Funnel type | Template dùng | Form template (có sẵn) |
|-------------|----------------|-------------------------|
| `lead_magnet` | **Squeeze** | `form-lead-magnet-download` |
| `trial` | **Squeeze** | `form-trial-booking` |
| `webinar` | **Squeeze** | `form-webinar-register` |
| `direct_enrollment` | **Squeeze** | `form-direct-enrollment` |
| `awareness` | **Landing** | `form-lead-magnet-download` (soft capture) |

> **Lưu ý:** Squeeze = tập trung conversion (không nav). Landing = có thêm content, ở giữa funnel.

---

## 2️⃣ Tạo Funnel code (1 phút)

**Admin URL:** `https://cms.truongvietanh.com/admin/content/funnels`

1. Click **"+ Create Item"**
2. Điền:
   - **Code** (required, unique): `{type}_{product}_{topic}` — ví dụ `lead_magnet_mn_ebook_7_tieu_chi`
   - **Name**: Hiển thị trong dashboard — ví dụ `Mầm non — eBook 7 tiêu chí`
   - **Type**: Dropdown — chọn đúng funnel type
   - **School level** (tuỳ chọn): mam-non / tieu-hoc / thcs / thpt
   - **Product ref** (tuỳ chọn): mam-non / song-ngu / hoc-bong / …
   - **Campus ref** (tuỳ chọn): phu-nhuan / go-vap / binh-tan / …
   - **GHL workflow ID**: lấy từ GHL (hoặc để mặc định)
   - **Expected CVR**: ước lượng (0.2 = 20%)
   - **Lead score base**: 15 (awareness) → 85 (direct enrollment)
   - **Entry pages**: thêm URL slug sẽ tạo ở bước 3

3. **Save**

---

## 3️⃣ Tạo Page (3 phút)

**Admin URL:** `https://cms.truongvietanh.com/admin/content/pages`

1. Click **"+ Create Item"**
2. Điền phần **SEO** (ở top):
   - **Slug**: `mam-non/ebook-7-tieu-chi` (KHÔNG có `/` ở đầu)
   - **Title**: tiêu đề Google SERP — giới hạn 60 ký tự
   - **Meta description**: giới hạn 160 ký tự
   - **Canonical URL**: `https://truongvietanh.com/mam-non/ebook-7-tieu-chi`
   - **OG Image**: upload ảnh 1200×630 (hoặc URL có sẵn)

3. Phần **Classification**:
   - **Template**: Squeeze (hoặc Landing)
   - **Funnel ref**: chọn funnel vừa tạo
   - **Product ref** + **Campus ref** (nếu có)
   - **Noindex**: ✅ tick nếu dùng cho ads-only (không SEO)

4. Phần **Blocks** — đây là phần QUAN TRỌNG. Kéo-thả các blocks theo thứ tự:

   ```
   1. 🎯 Hero Squeeze  ←  title, eyebrow, subtitle, form_ref
   2. 🏆 Trust Bar     ←  preset: 3000 phụ huynh · 9 cơ sở · 15+ năm
   3. ⚡ Urgency Bar    ←  (chỉ cho direct_enrollment / webinar)
   4. 📦 Cards         ←  3 value propositions
   5. 💬 Testimonial Grid  ←  auto-filter theo school_level
   6. 📝 CTA Form      ←  form reinforcement giữa trang
   7. ❓ FAQ           ←  3-5 câu hỏi thường gặp (auto emit schema)
   8. 📣 CTA Banner    ←  (chỉ cho landing template — backup CTA)
   ```

   Mỗi block có drag handle — đổi thứ tự kéo/thả. Click edit icon để sửa từng trường.

5. **Status**: Published (hoặc Draft nếu chưa muốn public)

6. **Save**

---

## 4️⃣ Content cho từng Block (3 phút)

### Hero Squeeze
| Trường | Gợi ý |
|--------|-------|
| Eyebrow | `📥 TÀI LIỆU MIỄN PHÍ` |
| Title | Ngắn gọn, có số — "eBook: 7 tiêu chí chọn trường mầm non" |
| Subtitle | Lợi ích + objection handling — "Tải ngay, miễn phí 100%, không spam" |
| Urgency text | (nếu có) "⏰ Chỉ còn ít suất nhận ưu đãi early-bird" |
| Form ref | Chọn form template phù hợp |
| BG variant | `navy` (default) / `gradient-accent` (cho direct enrollment) |

### Cards (3 value props)
Mỗi item:
- **Icon**: emoji (📖, ✅, 📊, 👨‍🏫, 🎓, 🏆)
- **Title**: 3-5 từ — "Hướng dẫn chi tiết"
- **Body**: 1-2 câu — tác dụng thực cho phụ huynh

### Testimonial Grid
- **School level filter**: auto-filter testimonials theo cấp học (VD: chọn `mam-non` sẽ chỉ hiện testimonials mầm non)
- **Limit**: 3

### CTA Form
- **Form ref**: CÙNG form với hero (để tracking đồng nhất)
- **Heading**: "Tải tài liệu ngay — còn chờ gì nữa?"
- **Variant**: `banner`
- **BG style**: `gradient`

### FAQ (auto-emit Schema)
3-5 câu thường gặp:
- "Form này có thực sự miễn phí không?"
- "Sau khi đăng ký tôi có bị spam không?"
- "Bao lâu sau khi đăng ký tôi nhận được tài liệu?"

---

## 5️⃣ Preview + Publish (1 phút)

1. Click **"Preview"** (Directus visual editor) để xem page
2. Nếu OK → đổi Status sang **Published**
3. **Save**
4. Chờ 1-2 phút để Cloudflare cache invalidate + rebuild static
5. Truy cập `https://hoc.truongvietanh.com/{slug}` để verify

---

## 6️⃣ Track performance

### Trong GTM dataLayer sẽ tự gửi:
- `funnel_page_view` khi trang load
- `lead_step_complete` khi user điền email (step 1)
- `generate_lead` khi submit đầy đủ
- `scroll_depth` 25/50/75/100%
- `faq_open` khi mở FAQ item

### Query trong CRM
- **Pancake CRM** → Lead list, filter `utm_campaign = {funnel_code}`
- **GHL** → Contacts, filter tags `funnel:{funnel_code}`
- **Email**: kiểm tra `SALES_EMAIL` inbox cho notification

---

## 🎯 Tips để tạo landing chất lượng

### 1. Title + subtitle theo công thức "PAS"
- **P**ain: "Không biết chọn trường mầm non nào cho con?"
- **A**gitate: "6 tuần nữa con vào lớp, bạn đã quyết định chưa?"
- **S**olution: "Tải ngay 7 tiêu chí giúp phụ huynh quyết định đúng"

### 2. Form càng ít field càng tốt
- Squeeze: **email** ở step 1 → **tên + phone** ở step 2
- Trial booking: thêm step 3 với campus + ngày mong muốn

### 3. Testimonials khớp với cấp học
Đừng hiện testimonial từ phụ huynh THPT ở trang mầm non. System tự filter nếu bạn chọn `school_level` trong page metadata.

### 4. Urgency có thực
- **Có deadline thật**: "Đến 30/6/2026" (direct_enrollment)
- **Giới hạn thật**: "Chỉ còn 15 suất tham quan cuối tuần này"
- **Không dùng "urgency giả"**: "Chỉ còn 3 slot!" cho webinar không giới hạn → mất niềm tin

### 5. Mồi câu phải xứng đáng
| Mồi câu tốt | Mồi câu kém |
|--------------|--------------|
| ✅ 15 tiêu chí so sánh 4 trường top | ❌ "Thông tin về chương trình" (generic) |
| ✅ Webinar với hiệu trưởng 30 phút | ❌ "Đăng ký nhận newsletter" |
| ✅ Học thử 1 buổi miễn phí | ❌ "Xem thông tin chi tiết" |

### 6. A/B Test — khi nào bật
Sau 500 lượt xem / 1 tuần, nếu conversion rate dưới expected:
1. Vào **Admin → ab_tests → + Create**
2. Tạo 2 variants với blocks khác nhau (đổi title, hero copy, hoặc CTA)
3. Link vào page qua trường **ab_test_ref**
4. System tự split 50/50, push `ab_test_exposure` event vào GTM

---

## 📊 Benchmark conversion rate (expected_cvr)

| Funnel type | Expected CVR | Nếu dưới mức này | Action |
|-------------|--------------|---------------------|--------|
| `lead_magnet` | 20-28% | < 15% | Sửa title / mồi câu yếu |
| `trial` | 35-45% | < 25% | Form quá dài hoặc thiếu social proof |
| `webinar` | 15-20% | < 10% | Urgency yếu / thời gian không phù hợp |
| `direct_enrollment` | 40-50% | < 30% | Ưu đãi không đủ hấp dẫn / thiếu objection handling |
| `awareness` | 8-15% | < 5% | Content quá dài / CTA không rõ |

---

## 🚨 Khi có sự cố

| Triệu chứng | Nguyên nhân | Fix |
|-------------|-------------|-----|
| Form submit báo lỗi | Turnstile token hết hạn | Reload page |
| Lead không về CRM | Worker env vars thiếu | Kiểm tra `wrangler secret list` |
| Page 404 sau khi publish | Status vẫn là Draft | Đổi sang Published + save |
| Page không có form | Form ref chưa chọn | Edit page → block Hero/CTA Form → chọn form ref |
| Testimonials không hiện | School level filter sai | Bỏ filter hoặc chọn đúng level |
| Cache vẫn show version cũ | Cloudflare TTL | Chờ 60s hoặc purge manually |

---

## 📞 Hỗ trợ

- **Dev team**: dev@truongvietanh.com (reply < 2h trong giờ hành chính)
- **Dashboard Directus**: `https://cms.truongvietanh.com/admin`
- **GHL workflows**: `https://app.gohighlevel.com/…`
- **Pancake CRM**: `https://crm.pancake.vn/workspace/…`
- **Slack #marketing-alerts**: notification cho hot leads (score ≥ 70)
