# WORKFLOW "Trại hè" — Copy-Paste Execution Guide

> **Mục đích**: Cho phép bạn tự setup workflow trong 15-20 phút bằng cách copy-paste content từ file này vào GHL UI.
>
> **URL workflow**: https://app.gohighlevel.com/v2/location/Mo8F9woTvjBHFakzawxY/workflow/023f00e9-d100-40d8-a8dc-2bd575ecb6c4
>
> **Đã có sẵn**:
> - Trigger: `Contact Tag "quiz-lead" added` ✅
> - Action 1: Wait 10 seconds ✅
>
> **Còn lại**: 15 actions + 2 goals + settings — tất cả dưới đây.

---

## 🏷 Action 2 — BỎ QUA "Create/Update Opportunity"

**KHÔNG** thêm action này vào workflow. Worker (`/api/lead`) đã auto-create opportunity qua API rồi — thêm trong workflow sẽ bị **duplicate**.

Nếu bạn đã lỡ thêm action này → xóa đi.

---

## ⚙️ Action 3 — If/Else (3 branches theo Quiz Score)

Click **`+`** sau Wait 10s → search **"If/Else"** → chọn.

### Branch 1: "Lead Nóng"
- **Condition Name**: `Lead Nóng (score < 50)`
- Add Filter:
  - **Filter Type**: `Contact Custom Field`
  - **Field**: `Quiz Score`
  - **Operator**: `Is Less Than`
  - **Value**: `50`

### Branch 2: "Lead Ấm"
- Click **"+ Add Branch"** (bên dưới Branch 1)
- **Condition Name**: `Lead Ấm (50-74)`
- Add Filter 1:
  - `Quiz Score` — `Is Greater Than Or Equal To` — `50`
- Click **"+ AND"**
- Add Filter 2:
  - `Quiz Score` — `Is Less Than` — `75`

### Branch 3: "Lead Tốt" (else branch)
- Click **"+ Add Branch"** → để **empty** (default else)
- **Condition Name**: `Lead Tốt (≥ 75)`
- Không add filter nào → sẽ match mọi contact không rơi vào 2 branch trên

Click **Save Action**.

---

## 🏷 Action 4 — Add Tag trong từng branch

Click **`+`** trong **mỗi branch** → **"Add Contact Tag"**:

| Branch | Tag |
|--------|-----|
| Lead Nóng | `lead-nong` |
| Lead Ấm | `lead-am` |
| Lead Tốt | `lead-tot` |

Save sau mỗi branch.

---

## 👤 Action 5 — CHỈ trong branch "Lead Nóng": Assign + Task + Notify

Trong branch **Lead Nóng** (sau tag `lead-nong`), click **`+`**:

### 5.1 — Assign User

- Action: **"Assign User"** (hoặc "Assign to User")
- **User**: [chọn Sales Senior của bạn, ví dụ Tu hoặc Duong]
- Save

### 5.2 — Create Task

- Action: **"Create Task"**
- **Title**: 
  ```
  🔥 GỌI NGAY - {{contact.first_name}} - Score {{contact.quiz_score}}/100
  ```
- **Description** (paste vào body):
  ```
  Lead nóng - score thấp, cần can thiệp gấp!
  
  Thông tin:
  • Phone: {{contact.phone}}
  • Email: {{contact.email}}
  • Tên học sinh: {{contact.tn_hc_sinh}}
  • Địa điểm: {{contact.dia_diem_trai_he}}
  • Cấp học: {{contact.cap_hoc_trai_he}}
  • Báo cáo: {{contact.bo_co_url}}
  
  👉 Gọi trong 5 phút để giữ lead!
  ```
- **Due Date**: `+5 minutes` (hoặc `Immediately`)
- **Assigned User**: `Assigned User in Contact`
- Save

### 5.3 — (Optional) Send Internal SMS/Notification

- Action: **"Send Internal Notification"** hoặc **"Internal SMS"**
- **Recipient**: SĐT Sales Senior
- **Message**:
  ```
  🔥 LEAD NÓNG - {{contact.first_name}} - {{contact.phone}} - Score {{contact.quiz_score}}/100. Gọi ngay!
  ```
- Save

---

## 📬 Action 6 — Email 1 (Day 0 — Báo cáo sẵn sàng)

**Sau If/Else** workflow tự merge 3 branches. Click **`+`** ở node merge (bên ngoài 3 branches, ngay dưới):

- Action: **"Send Email"**
- **From Name**: `Tư vấn viên Lion Camp`
- **From Email**: `leads@hoc.truongvietanh.com` (hoặc domain đã verify trong GHL)
- **To**: `{{contact.email}}`
- **Subject**:
  ```
  Báo cáo đánh giá kỹ năng của bé {{contact.tn_hc_sinh}} đã sẵn sàng
  ```

### Body (HTML) — chuyển sang chế độ HTML/Source, paste:

```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
  <p>Dạ chào Ba/Mẹ <strong>{{contact.first_name}}</strong>,</p>
  
  <p>Em là Tư vấn viên Lion Camp — Trường Việt Anh. Cảm ơn Ba/Mẹ đã làm bài đánh giá kỹ năng cho bé <strong>{{contact.tn_hc_sinh}}</strong>.</p>
  
  <div style="background:#F0F9FF;border:2px solid #7DD3FC;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
    <div style="font-size:28px;font-weight:800;color:#1F4E79;">{{contact.quiz_score}} / 100 điểm</div>
    <div style="font-weight:700;color:#F59E0B;margin-top:4px;">Mức: {{contact.quiz_level}}</div>
  </div>
  
  <p>👉 <strong>Xem báo cáo đầy đủ</strong> (6 kỹ năng chi tiết + khuyến nghị cá nhân hóa):</p>
  <p style="text-align:center;">
    <a href="{{contact.bo_co_url}}" style="display:inline-block;background:#E8792B;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;">
      📊 Xem báo cáo ngay
    </a>
  </p>
  
  <p>Trong báo cáo có <strong>1 điểm</strong> mà rất nhiều phụ huynh bất ngờ khi đọc xong.</p>
  
  <p>Nếu Ba/Mẹ muốn được <strong>tư vấn 1:1 miễn phí 15 phút</strong> để em phân tích chi tiết kết quả và đề xuất lộ trình Lion Camp phù hợp nhất cho bé:</p>
  
  <p>💬 Chat Zalo: <a href="https://zalo.me/1678310120468101523">https://zalo.me/1678310120468101523</a><br>
  📞 Gọi hotline: <a href="tel:+84916961409">0916 961 409</a> (phản hồi trong 5 phút)</p>
  
  <p>Em chờ tin Ba/Mẹ,<br>
  <strong>Tư vấn viên Lion Camp</strong><br>
  Trường TH - THCS - THPT Việt Anh</p>
</div>
```

Save.

---

## ⏱ Action 7 — Wait 1 day

- Action: **"Wait"**
- **Duration**: `1 Day`
- Save

---

## 📬 Action 8 — Email 2 (Day 1 — Pain point)

- Subject:
  ```
  Bé {{contact.tn_hc_sinh}} ở nhà hè này: Ai sẽ là người "trông" con?
  ```

### Body:
```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
  <p>Dạ chào Ba/Mẹ,</p>
  
  <p>Em hy vọng Ba/Mẹ đã xem báo cáo của bé.</p>
  
  <p>Nhiều phụ huynh sau khi xem đều <strong>giật mình</strong> vì bé đang dành quá nhiều thời gian cho điện thoại và chưa tự lập tốt.</p>
  
  <p>Ba mẹ đi làm cả ngày, ông bà hoặc người giúp việc rất khó quản lý. Chiếc iPad vô tình trở thành <em>"người bảo mẫu"</em> bất đắc dĩ suốt 3 tháng hè.</p>
  
  <p>Tại <strong>Lion Camp</strong>, chúng em có:</p>
  <ul>
    <li>Quy tắc <strong>"No-Screen"</strong> — Không màn hình suốt 6 tuần</li>
    <li>100% tiếng Anh với giáo viên bản ngữ</li>
    <li>Dự án nhóm mỗi tuần — phát triển tự tin, tự lập</li>
    <li>Hoạt động thể chất 2h/ngày</li>
  </ul>
  
  <p>👉 Ba/Mẹ muốn em gửi <strong>Lịch trình 1 ngày điển hình</strong> của bé không ạ?</p>
  
  <p>💬 Chat Zalo: <a href="https://zalo.me/1678310120468101523">https://zalo.me/1678310120468101523</a><br>
  📞 Gọi: <a href="tel:+84916961409">0916 961 409</a></p>
  
  <p>Cảm ơn Ba/Mẹ,<br>
  <strong>Tư vấn viên Lion Camp</strong></p>
</div>
```

---

## ⏱ Action 9 — Wait 2 days (sẽ là Day 3)

- Wait: `2 Days`

---

## 📬 Action 10 — Email 3 (Day 3 — Video testimonial)

- Subject: `🎥 Video thật: Bé sau 6 tuần Lion Camp - Trường Việt Anh`

### Body:
```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
  <p>Dạ chào Ba/Mẹ,</p>
  
  <p>Em gửi Ba/Mẹ video ngắn (30 giây) — quay thật một bé <strong>{{contact.cap_hoc_trai_he}}</strong> sau 6 tuần Lion Camp năm ngoái:</p>
  
  <p style="text-align:center;margin:16px 0;">
    <a href="https://youtube.com/shorts/[YOUR_VIDEO_ID]" style="display:inline-block;background:#EF4444;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;">
      ▶️ Xem video Before/After
    </a>
  </p>
  
  <p>Từ một bé hay dán mắt vào điện thoại, ngại giao tiếp → trở nên:</p>
  <ul>
    <li>✅ Tự tin nói tiếng Anh với thầy cô nước ngoài</li>
    <li>✅ Chủ động, tự lập</li>
    <li>✅ Hào hứng kể chuyện trải nghiệm mỗi ngày</li>
  </ul>
  
  <div style="background:#FEF3C7;border:2px solid #F59E0B;border-radius:10px;padding:14px;margin:16px 0;">
    <p style="margin:0;"><strong>📍 Hiện tại lớp {{contact.cap_hoc_trai_he}} tại {{contact.dia_diem_trai_he}} chỉ còn 12 chỗ.</strong></p>
    <p style="margin:8px 0 0;">🎁 Học bổng <strong>Early Bird đến 30%</strong> sắp hết.</p>
  </div>
  
  <p>Ba/Mẹ muốn em <strong>giữ suất và gửi bảng học bổng</strong> cho bé {{contact.tn_hc_sinh}} không ạ?</p>
  
  <p>💬 Chat Zalo ngay: <a href="https://zalo.me/1678310120468101523">https://zalo.me/1678310120468101523</a></p>
  
  <p>Em chờ tin Ba/Mẹ,<br>
  <strong>Tư vấn viên Lion Camp</strong></p>
</div>
```

---

## ⏱ Action 11 — Wait 2 days (sẽ là Day 5)

- Wait: `2 Days`

---

## 📬 Action 12 — Email 4 (Day 5 — Học bổng deadline)

- Subject: `Học bổng Lion Camp 30% cho bé {{contact.tn_hc_sinh}} — còn 48 giờ`

### Body:
```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
  <p>Dạ chào Ba/Mẹ,</p>
  
  <p>Em nhắc Ba/Mẹ một điều quan trọng:</p>
  
  <div style="background:#FEE2E2;border-left:4px solid #EF4444;padding:14px 18px;margin:16px 0;border-radius:6px;">
    <p style="margin:0;font-weight:700;color:#991B1B;">⏰ Ưu đãi Early Bird — học bổng đến 30%</p>
    <p style="margin:6px 0 0;">Sẽ <strong>đóng cổng trong 48 giờ nữa</strong>. Sau thời điểm này, học phí về giá gốc.</p>
  </div>
  
  <p>Để lock mức học bổng hiện tại cho bé <strong>{{contact.tn_hc_sinh}}</strong>, Ba/Mẹ chỉ cần:</p>
  
  <ol>
    <li><strong>Đặt lịch tư vấn 1:1 miễn phí</strong> (15 phút) với em</li>
    <li>Em sẽ phân tích chi tiết kết quả quiz + lộ trình 6 tuần phù hợp nhất</li>
    <li>Em sẽ hướng dẫn Ba/Mẹ cách giữ suất và học bổng trực tiếp trong buổi tư vấn</li>
  </ol>
  
  <p style="text-align:center;margin:20px 0;">
    <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:linear-gradient(135deg,#E8792B,#F59E0B);color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;">
      💬 Đặt lịch tư vấn miễn phí qua Zalo
    </a>
  </p>
  
  <p>Hoặc gọi: <a href="tel:+84916961409">0916 961 409</a></p>
  
  <p>Em tin Ba/Mẹ hiểu đây là cơ hội quan trọng cho bé.</p>
  
  <p><strong>Tư vấn viên Lion Camp</strong></p>
</div>
```

---

## ⏱ Action 13 — Wait 2 days (sẽ là Day 7)

- Wait: `2 Days`

---

## 📬 Action 14 — Email 5 (Day 7 — Last Chance)

- Subject: `⚠️ Đây là email cuối em gửi về Lion Camp cho bé {{contact.tn_hc_sinh}}`

### Body:
```html
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
  <p>Dạ chào Ba/Mẹ,</p>
  
  <p>Em nói thật: Đây có thể là email cuối cùng em gửi về Lion Camp 2026.</p>
  
  <div style="background:#FEE2E2;border:2px solid #EF4444;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#991B1B;">📍 Chỉ còn 7 chỗ cuối cùng</p>
    <p style="margin:6px 0 0;">Lớp {{contact.cap_hoc_trai_he}} tại {{contact.dia_diem_trai_he}}</p>
    <p style="margin:6px 0 0;color:#666;">Học bổng Early Bird đã kết thúc.</p>
  </div>
  
  <p>Nếu Ba/Mẹ còn quan tâm:</p>
  
  <p style="text-align:center;">
    <a href="https://zalo.me/1678310120468101523" style="display:inline-block;background:#0068FF;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;margin:4px;">💬 Chat Zalo</a>
    <a href="tel:+84916961409" style="display:inline-block;background:#1a1a5e;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;margin:4px;">📞 Gọi 0916 961 409</a>
  </p>
  
  <p>Em tin Ba/Mẹ hiểu đây là thời điểm quan trọng cho bé — 6 tuần hè quyết định rất nhiều cho năm học mới.</p>
  
  <p>Nếu Ba/Mẹ đã có kế hoạch khác, em hoàn toàn hiểu và cảm ơn Ba/Mẹ đã dành thời gian tìm hiểu Lion Camp.</p>
  
  <p>Trân trọng,<br>
  <strong>Tư vấn viên Lion Camp</strong><br>
  Trường Việt Anh</p>
</div>
```

---

## 🏷 Action 15 — Add Tag `lead-cold`

- Action: **"Add Contact Tag"**
- Tag: `lead-cold`

Workflow kết thúc ở đây (tự đến **END** node).

---

## 🎯 GOALS — Exit conditions

Trong workflow builder, tìm tab **"Goals"** (hoặc icon 🎯). Add 2 goals:

### Goal 1: Booked Consultation
- **Name**: `Đã đặt lịch tư vấn`
- **Trigger**: Contact Tag Added
- **Tag**: `booked-call`
- **Action**: Exit Workflow

### Goal 2: Đã đóng cọc
- **Name**: `Đã đóng cọc`
- **Trigger**: Opportunity Stage Changed
- **Stage**: `💰 Đã đóng cọc` (trong pipeline Lion Camp 2026 - Trại hè)
- **Action**: Exit Workflow

Khi contact match bất kỳ goal nào → workflow exit ngay (không gửi email tiếp).

---

## ⚙️ SETTINGS

Click tab **"Settings"** (góc trên trong workflow):

| Setting | Value |
|---------|-------|
| **Workflow Name** | `Trại hè` ✅ (đã có) |
| **Allow Re-Entry** | ❌ OFF (contact chỉ vào 1 lần) |
| **Event Start Time** | ✅ Immediately |
| **Business Hours** | ❌ No restriction |
| **Stop on Response** | ✅ **ON** (nếu PH reply email → pause để sales handle) |
| **Timezone** | `Asia/Ho_Chi_Minh (GMT+07:00)` |
| **Allow multiple opportunities** | ❌ OFF |

Save Settings.

---

## 🚀 PUBLISH

Góc trên cùng workflow → toggle từ **"Draft"** → **"Publish"** (nút xanh).

Workflow sẽ bắt đầu fire khi contact nào có tag `quiz-lead` được add (worker tự làm việc này khi PH submit quiz).

---

## 🧪 TEST NGAY SAU KHI PUBLISH

### 1. Tạo contact test

GHL → **Contacts** → **+ Add Contact**:

| Field | Value |
|-------|-------|
| First Name | `Test Parent` |
| Email | [email của bạn để check inbox] |
| Phone | `0999888777` |
| Quiz Score | `45` (để test branch Lead Nóng) |
| Quiz Level | `Cần can thiệp` |
| Tên học sinh | `Bé Test` |
| Địa điểm Trại hè | `Gò Vấp` |
| Cấp học Trại hè | `Tiểu học` |
| Báo cáo URL | `https://hoc.truongvietanh.com/report/?name=Test&score=45&school=tieu-hoc&loc=Gò+Vấp&q1=2&q2=1&q3=2&q4=1&q5=2&q6=1` |

### 2. Trigger workflow

Click vào contact vừa tạo → tab **"Tags"** → add tag **`quiz-lead`** → Save

### 3. Verify (trong 30 giây)

- ✅ Contact xuất hiện trong workflow "Trại hè" → xem tab **"Enrollment History"**
- ✅ Branch **Lead Nóng** được fire
- ✅ Tag `lead-nong` được thêm
- ✅ Task **"🔥 GỌI NGAY"** được tạo
- ✅ Email 1 đến inbox bạn (check cả Spam)

### 4. Change tags để test branches khác

- Remove `quiz-lead`, update Quiz Score thành `60` (Lead Ấm) → re-add `quiz-lead`
- Remove, update `85` (Lead Tốt) → re-add

---

## 🎉 XONG — End-to-End Flow

```
PH submit quiz trên /trai-he-tieu-hoc-go-vap-vsl
    ↓
Worker: GHL contact + tag quiz-lead + custom fields (score/level/loc/level/report_url)
    ↓
Workflow "Trại hè" FIRE
    ↓
If/Else 3 branches (theo quiz_score /100):
    • < 50 → Lead Nóng: assign senior + task + SMS
    • 50-74 → Lead Ấm
    • ≥ 75 → Lead Tốt
    ↓
Email 1 (Day 0) → Email 2 (Day 1) → Email 3 (Day 3) → Email 4 (Day 5) → Email 5 (Day 7)
    ↓
Goals: booked-call / đóng cọc → exit workflow sớm
```

---

## 📞 Cần gì tiếp theo sau khi publish workflow?

1. **Zalo OA token** — để worker tự send Zalo alert cho sales khi lead mới
2. **Deploy worker mới** (với `report_url` sync) — đã done, live tại hoc.truongvietanh.com
3. **Commit code changes** lên Git branch — chờ user confirm

Báo tôi khi workflow đã publish + test xong để tôi guide các bước tiếp theo.
