# GHL SETUP GUIDE — Lion Camp 2026 Full Funnel

> **Direction**: Tư vấn 1:1 miễn phí. Không có bước "đặt cọc" trong funnel — tư vấn viên sẽ trao đổi trực tiếp với phụ huynh qua điện thoại/Zalo sau buổi tư vấn.

---

## 0. CUSTOM FIELDS (Settings → Custom Fields → Contact)

| Field Name | Type | Key | Ghi chú |
|------------|------|-----|---------|
| Quiz Score | Number | `quiz_score` | 0-100 |
| Quiz Level | Text | `quiz_level` | Tốt / Trung bình / Cần hỗ trợ |
| Địa điểm | Text | `dia_diem` | Gò Vấp / Bình Tân / Cần Giuộc / Rạch Giá |
| Cấp học | Text | `cap_hoc` | tieu-hoc / thcs / thpt |
| Tên học sinh | Text | `ten_hoc_sinh` | Từ form |
| Tên phụ huynh | Text | `ten_phu_huynh` | = Contact First Name |
| Lớp | Text | `lop_be` | Optional |
| Báo cáo URL | Text | `report_url` | Link /report/?... |

✅ 4 field đầu đã tạo tự động qua worker. 4 field sau cần tạo thủ công.

---

## 1. PIPELINE (Opportunities → Pipelines)

**Tên**: `Lion Camp 2026 - Trại hè`

**Stages**:
1. 🆕 Quiz Completed
2. 📧 Báo cáo đã gửi
3. 💬 Đã liên hệ / Booked call
4. ✅ Tư vấn xong
5. 💰 Đã đóng cọc
6. 🎉 Nhập học
7. ❌ Lost

---

## 2. WORKFLOW CHÍNH

**Tên**: `🎯 Lion Camp 2026 — Quiz Full Funnel`

### TRIGGER
- **Type**: Contact tag added
- **Tag**: `quiz-lead`

### STEPS

```
1. ⏱ Wait → 10 giây

2. 📝 Update Contact
   - Tag added by worker: quiz-lead, quiz-{level}, cs-{location}, trai-he-{school}

3. 🎯 Add to Pipeline
   - Pipeline: Lion Camp 2026 - Trại hè
   - Stage: Quiz Completed

4. ↔️ Condition (If/Else) — Phân loại theo điểm

   ┌── Branch A: quiz_score < 50 (CẦN CAN THIỆP - HOT)
   │   • Tag: lead-nong
   │   • Assign to: [Sales senior]
   │   • Send SMS/Zalo: "⚠️ LEAD NÓNG — gọi ngay trong 5 phút"
   │   • Task: "Gọi {{contact.first_name}} - Score {{custom_field.quiz_score}}/100"
   │
   ├── Branch B: quiz_score 50-74 (TRUNG BÌNH)
   │   • Tag: lead-am
   │   • Assign to: [Sales 1]
   │   • Send Zalo sales alert
   │
   └── Branch C: quiz_score ≥ 75 (NỀN TẢNG TỐT - NURTURE)
       • Tag: lead-tot
       • Continue to email/zalo nurture

5. 📧 Email 1 (Ngay lập tức) — xem "EMAIL SEQUENCES" bên dưới

6. ⏱ Wait → 1 giờ
7. 💬 Zalo message 1 (Fast action) — nếu có Zalo OA
8. ⏱ Wait → 23 giờ (total 24h)
9. 📧 Email 2 (Day 1)

10. ⏱ Wait → 2 ngày (total Day 3)
11. 📧 Email 3 (Day 3 - video testimonial)
12. 💬 Zalo message 2

13. ⏱ Wait → 2 ngày (total Day 5)
14. 📧 Email 4 (Day 5 - học bổng sắp hết)

15. ⏱ Wait → 2 ngày (total Day 7)
16. 📧 Email 5 (Day 7 - last chance)

17. 🎯 Condition — Qualification
   ┌── Nếu tag "booked-call" → END (chuyển pipeline stage)
   └── Nếu không → Tag: lead-cold, nurture dài hạn
```

### GOALS (trong workflow)

- **Goal 1**: Tag `booked-call` added → exit workflow
- **Goal 2**: Pipeline moved to "Đã đóng cọc" → exit workflow

---

## 3. EMAIL SEQUENCES (5 emails — CTA duy nhất: tư vấn 1:1 qua Zalo/Phone)

### 🎯 TIỂU HỌC — Lion Camp Lãnh Đạo

#### Email 1 — Ngày 0 (ngay sau quiz)
**Subject**: `Báo cáo của bé {{custom_field.ten_hoc_sinh}} đã sẵn sàng — 1 điểm ba/mẹ cần lưu ý`

```
Dạ chào Ba/Mẹ {{contact.first_name}},

Em là Tư vấn viên Lion Camp — Trường Việt Anh.

Cảm ơn Ba/Mẹ đã dành 3 phút làm bài đánh giá kỹ năng cho bé {{custom_field.ten_hoc_sinh}}.

📊 Điểm đánh giá: {{custom_field.quiz_score}}/100 — Mức: {{custom_field.quiz_level}}

👉 Xem báo cáo đầy đủ (6 kỹ năng + khuyến nghị):
{{custom_field.report_url}}

Trong báo cáo có **1 điểm** rất nhiều phụ huynh bất ngờ khi đọc xong.

Nếu Ba/Mẹ muốn **được tư vấn 1:1 miễn phí** (15 phút) để em phân tích chi tiết kết quả và lộ trình Lion Camp 6 tuần cho bé — chat Zalo em ngay nhé:

💬 https://zalo.me/1678310120468101523

Hoặc gọi hotline: 0916 961 409 (phản hồi trong 5 phút)

[Tư vấn viên Lion Camp]
Trường TH-THCS-THPT Việt Anh
```

#### Email 2 — Ngày 1
**Subject**: `Bé {{custom_field.ten_hoc_sinh}} ở nhà hè này: Ai sẽ là người "trông" con?`

```
Dạ chào Ba/Mẹ,

Em hy vọng Ba/Mẹ đã xem báo cáo của bé.

Nhiều phụ huynh sau khi xem đều giật mình vì bé đang dành quá nhiều thời gian cho điện thoại và chưa tự lập tốt.

Ba mẹ đi làm cả ngày, ông bà hoặc người giúp việc rất khó quản lý. Chiếc iPad vô tình trở thành "người bảo mẫu" bất đắc dĩ suốt 3 tháng hè.

Nếu kéo dài, bé sẽ lười vận động, thụ động và ngại giao tiếp khi vào năm học mới.

Tại **Lion Camp Lãnh Đạo**, chúng em có:
• Quy tắc "No-Screen" — Không màn hình suốt 6 tuần
• 100% tiếng Anh với giáo viên bản ngữ
• Dự án nhóm mỗi tuần — phát triển tự tin, tự lập

👉 Ba/Mẹ muốn em gửi **Lịch trình 1 ngày điển hình** của bé không ạ?

💬 Chat Zalo: https://zalo.me/1678310120468101523
📞 Gọi: 0916 961 409

Cảm ơn Ba/Mẹ,
[Tư vấn viên Lion Camp]
```

#### Email 3 — Ngày 3
**Subject**: `🎥 Video thật: Bé sau 6 tuần Lion Camp — Trường Việt Anh`

```
Dạ chào Ba/Mẹ,

Em gửi Ba/Mẹ video ngắn (30 giây) — quay thật một bé tiểu học sau 6 tuần Lion Camp năm ngoái:

[Insert Video Before-After URL]

Từ một bé hay dán mắt vào điện thoại, ngại giao tiếp → trở nên:
✅ Tự tin nói tiếng Anh với thầy cô nước ngoài
✅ Chủ động dọn dẹp, tự làm mọi việc
✅ Hào hứng kể chuyện trải nghiệm mỗi ngày

📍 Hiện tại lớp Tiểu học {{custom_field.dia_diem}} chỉ còn **12 chỗ** cho đợt tháng 6/2026.

Ba/Mẹ muốn em **giữ suất và gửi bảng học bổng Early Bird đến 30%** không ạ?

💬 Chat Zalo ngay: https://zalo.me/1678310120468101523

Em chờ tin Ba/Mẹ,
[Tư vấn viên Lion Camp]
```

#### Email 4 — Ngày 5
**Subject**: `Học bổng Lion Camp 30% cho bé {{custom_field.ten_hoc_sinh}} — còn 48 giờ`

```
Dạ chào Ba/Mẹ,

Em nhắc Ba/Mẹ một điều quan trọng:

🎁 **Ưu đãi Early Bird — học bổng đến 30%** cho Lion Camp 2026 sẽ **đóng cổng trong 48 giờ nữa**.

Sau thời điểm này, học phí sẽ về giá gốc.

Để lock mức học bổng hiện tại cho bé {{custom_field.ten_hoc_sinh}}, Ba/Mẹ chỉ cần:

1️⃣ **Đặt lịch tư vấn 1:1 miễn phí** (15 phút) với em
2️⃣ Em sẽ phân tích chi tiết kết quả quiz + lộ trình 6 tuần phù hợp nhất cho bé
3️⃣ Em sẽ hướng dẫn Ba/Mẹ cách giữ suất và học bổng trực tiếp trong buổi tư vấn

👉 Đặt lịch ngay (chọn khung giờ tiện):
[Link Calendar GHL]

Hoặc chat Zalo: https://zalo.me/1678310120468101523

[Tư vấn viên Lion Camp]
```

#### Email 5 — Ngày 7 (Last Chance)
**Subject**: `⚠️ Đây là email cuối em gửi về Lion Camp cho bé {{custom_field.ten_hoc_sinh}}`

```
Dạ chào Ba/Mẹ,

Em nói thật: Đây có thể là email cuối cùng em gửi về Lion Camp 2026.

📍 Hiện tại lớp Tiểu học {{custom_field.dia_diem}} chỉ còn **7 chỗ cuối cùng** và học bổng Early Bird đã kết thúc.

Nếu Ba/Mẹ còn quan tâm:

💬 Chat Zalo ngay: https://zalo.me/1678310120468101523
📞 Gọi hotline: 0916 961 409

Em tin Ba/Mẹ hiểu đây là thời điểm quan trọng cho bé — 6 tuần hè quyết định rất nhiều cho năm học mới.

Nếu Ba/Mẹ đã có kế hoạch khác, em hoàn toàn hiểu và cảm ơn Ba/Mẹ đã dành thời gian tìm hiểu Lion Camp.

Trân trọng,
[Tư vấn viên Lion Camp]
Trường Việt Anh
```

---

### 🎯 THCS — Lion Camp Trải Nghiệm (adapt nhanh)

Thay subject/nội dung chính:
- Email 1: `Kết quả EQ của bé {{ten_hoc_sinh}} có 1 điểm ba mẹ nên xem ngay`
- Email 2: Pain point = nghiện game, ít chia sẻ, dậy thì
- Email 3: Video testimonial bé THCS → tự tin EQ, giảm game
- Email 4: Học bổng 25-30% + xe đưa đón Bình Tân
- Email 5: Chỉ còn 8 chỗ THCS {{dia_diem}}

### 🎯 THPT — Lion Camp Hướng Nghiệp (adapt nhanh)

Thay subject/nội dung chính:
- Email 1: `Kết quả IELTS & định hướng của bé {{ten_hoc_sinh}} có điểm cần chú ý`
- Email 2: Pain point = IELTS thấp, chưa định hướng ngành, hè quan trọng trước đại học
- Email 3: Video học sinh lớp 11 sau Lion Camp → band IELTS tăng, định hướng rõ
- Email 4: Học bổng 25-30% + tư vấn hướng nghiệp miễn phí
- Email 5: Chỉ còn 7 chỗ THPT {{dia_diem}}

---

## 4. ZALO MESSAGES (dùng action "Send Zalo" nếu có Zalo OA integration)

### Zalo 1 — Sau 1 giờ (Fast Action)

```
Dạ chào Ba/Mẹ {{contact.first_name}},

Em vừa gửi báo cáo của bé {{custom_field.ten_hoc_sinh}} qua email.
Ba/Mẹ đã xem chưa ạ?

📊 Điểm: {{custom_field.quiz_score}}/100 — {{custom_field.quiz_level}}

Nếu muốn được em **tư vấn 1:1 miễn phí 15 phút** (phân tích chi tiết + lộ trình cá nhân hóa), em có thể call trong hôm nay.

Ba/Mẹ cho em biết khung giờ tiện nhé ạ 🙏
```

### Zalo 2 — Ngày 3

```
Dạ Ba/Mẹ,

Em gửi Ba/Mẹ 1 video ngắn bé tiểu học sau Lion Camp năm ngoái nhé:
[link video]

📍 Lớp {{custom_field.cap_hoc}} tại {{custom_field.dia_diem}} còn 12 chỗ.
🎁 Học bổng Early Bird 30% còn 4 ngày.

Em giữ suất cho bé {{custom_field.ten_hoc_sinh}} không ạ?
```

---

## 5. ZALO OA — SETUP APP & TOKEN

### A. Lấy Access Token từ developers.zalo.me

**URL**: `https://developers.zalo.me/app/4580774058394869551/`

1. Vào app Zalo OA (ID: `4580774058394869551`)
2. Menu trái → **Official Account** → **Access Token**
3. Click **"Xác thực"** → popup chọn OA → **Trường Việt Anh** (OA ID: `1678310120468101523`)
4. Đồng ý cấp quyền → nhận 3 giá trị:
   - `access_token` (hết hạn 25h)
   - `refresh_token` (hết hạn 90 ngày — dùng để tự động gia hạn)
   - `expires_in` (giây)

### B. Scopes cần cấp

- `send_message` — gửi tin nhắn chủ động cho user follow OA
- `get_follower` — lấy list user follow OA
- `get_profile_by_user_id` — lấy thông tin user

### C. Lấy user_id của sales (để nhận alert)

**Cách 1 — từ OA Web** (`https://oa.zalo.me/`):
1. Vào OA → menu **Khách hàng** → tìm SĐT sales
2. Click vào profile → URL chứa `user/{user_id}` → copy số đó

**Cách 2 — API**:
```bash
curl -H "access_token: $ZALO_OA_TOKEN" \
  "https://openapi.zalo.me/v3.0/oa/user/getlistfollower?data=%7B%22offset%22%3A0%2C%22count%22%3A50%7D"
```

### D. Set Cloudflare Worker secrets

```bash
cd /Users/nguyenhoang/Downloads/truongvietanh.com

# Access token (cần refresh mỗi 25h — xem phần Auto-Refresh bên dưới)
wrangler secret put ZALO_OA_TOKEN --config wrangler.staging.jsonc
# paste access_token

# Refresh token (90 ngày) — để worker auto-refresh
wrangler secret put ZALO_OA_REFRESH_TOKEN --config wrangler.staging.jsonc
# paste refresh_token

# Sales user_id
wrangler secret put ZALO_SALES_USER_ID --config wrangler.staging.jsonc
# paste user_id

# App secret (để refresh token)
wrangler secret put ZALO_APP_SECRET --config wrangler.staging.jsonc
# paste app secret từ developers.zalo.me → App Info
```

### E. Auto-refresh Access Token (cần code vào worker)

Cần thêm vào worker:
1. Lưu `access_token` + `expires_at` trong **Cloudflare KV**
2. Trước mỗi lần gửi Zalo → check `expires_at` → nếu sắp hết, call `/v4/oa/access_token` với `refresh_token` + `app_secret` để lấy token mới
3. Update KV

Endpoint refresh:
```
POST https://oauth.zaloapp.com/v4/oa/access_token
Content-Type: application/x-www-form-urlencoded
secret_key: {APP_SECRET}

Body:
  refresh_token={REFRESH_TOKEN}
  app_id=4580774058394869551
  grant_type=refresh_token
```

---

## 6. CHECKLIST TRIỂN KHAI

### Trong GHL UI:
- [x] Tạo 6 custom fields: `quiz_score` (0-100), `quiz_level`, `ten_hoc_sinh`, `dia_diem`, `cap_hoc`, `report_url` ✅ đã tạo
- [ ] Tạo Pipeline "Lion Camp 2026 - Trại hè" (7 stages)
- [ ] Tạo Calendar booking "Tư vấn 1:1 Lion Camp" (15 phút)
- [ ] Tạo 5 email templates Tiểu học (paste từ trên)
- [ ] Tạo 5 email templates THCS (adapt)
- [ ] Tạo 5 email templates THPT (adapt)
- [ ] Tạo Workflow "🎯 Lion Camp 2026 — Quiz Full Funnel" theo sơ đồ mục 2
- [ ] Test end-to-end: submit quiz → check contact → check email → check pipeline

### Trong Zalo Developer:
- [ ] Lấy access_token + refresh_token từ developers.zalo.me
- [ ] Lấy user_id của sales từ oa.zalo.me
- [ ] Set 4 secrets vào Cloudflare worker
- [ ] (Code) Thêm auto-refresh logic vào worker + KV

### Test:
- [ ] Submit form trên `/trai-he-tieu-hoc-go-vap-vsl`
- [ ] Check GHL → contact tạo đúng với tags + custom fields
- [ ] Check email inbox → Email 1 đến sau ~1 phút
- [ ] Check Zalo của sales → alert đến (sau khi set secrets)

---

**Deployment**: Sau khi setup xong trong GHL UI, workflow sẽ **tự động trigger** khi worker add tag `quiz-lead` vào contact (đã có trong code).
