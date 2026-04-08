# Hướng Dẫn Setup 6 GHL Workflows - Từng Bước

## Thao tác chung cho mỗi workflow:

### Bước 1: Mở workflow link
### Bước 2: Xóa trigger cũ (nếu có) - click trash icon trên trigger card
### Bước 3: Click "Add New Trigger" → chọn "Contact Tag"
### Bước 4: Trong panel bên phải:
   - Workflow Trigger Name: giữ "Contact Tag"
   - Filters → Add filters → Tag = [tên tag]
   - Tag Action: "Is Added"
### Bước 5: Add email actions - click nút "+" giữa trigger và END
   - Chọn "Send Email" → điền subject + from email + nội dung
   - Giữa mỗi email, thêm "Wait" action → set thời gian delay
### Bước 6: Rename workflow - click tên ở header → pencil icon → đổi tên
### Bước 7: Click "Publish" (toggle Draft → Publish ở góc phải trên)

---

## WF2: Ebook Lộ Trình Lớp 10
**Link:** https://app.gohighlevel.com/location/Mo8F9woTvjBHFakzawxY/workflow/70107f73-45e5-4f5f-8be6-d8979fa5b805
**Rename:** WF2 - Ebook Lo Trinh Lop 10

### Bước 2: XÓA trigger "Opportunity Created" hiện có (click trash icon)
### Bước 3-4: Add trigger Contact Tag
   - Filter: Tag = `squeeze-ebook-lo-trinh` | Action: Is Added

### Bước 5: Add actions (từ trên xuống dưới):

**Action 1: Send Email**
- From: tuvan@reply.truongvietanh.com
- Subject: `Ebook Lộ trình lớp 10 – Tặng ngay cho {{contact.first_name}}`
- Body: Link download Ebook + overview nội dung
- CTA button: "Tải Ebook ngay"

**Action 2: Wait 1 day**

**Action 3: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `3 sai lầm lớn nhất khi chọn lớp 10 mà 87% phụ huynh mắc phải`
- Body: Tips cụ thể + chương trình Việt Anh

**Action 4: Wait 2 days** (tổng +3 ngày)

**Action 5: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `95% Học Sinh Việt Anh Vào TOP THPT - Bí Quyết`
- Body: Thành tích + phương pháp giảng dạy

**Action 6: Wait 2 days** (tổng +5 ngày)

**Action 7: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Mời con làm Bài Test Năng Lực Miễn Phí`
- Body: Link test + tư vấn 1-1
- CTA button: "Làm test ngay"

**Action 8: Wait 2 days** (tổng +7 ngày)

**Action 9: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Cơ hội cuối: Ưu đãi Tuyển Sinh THCS 2026`
- Body: Ưu đãi + deadline
- CTA button: "Đăng ký ngay"

→ Publish

---

## WF3: Học Thử Miễn Phí
**Link:** https://app.gohighlevel.com/location/Mo8F9woTvjBHFakzawxY/workflow/6211f592-3aee-4ea8-b94f-51aa7fbbf8ff
**Rename:** WF3 - Hoc Thu Mien Phi

### Bước 2: XÓA trigger cũ nếu có
### Bước 3-4: Add trigger Contact Tag
   - Filter: Tag = `squeeze-hoc-thu` | Action: Is Added

### Bước 5: Add actions:

**Action 1: Send Email**
- From: tuvan@reply.truongvietanh.com
- Subject: `Xác nhận đăng ký học thử thành công`
- Body: Chi tiết buổi học thử + địa chỉ cơ sở 269A Nguyễn Trọng Tuyển, Phú Nhuận

**Action 2: Wait 1 day**

**Action 3: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `3 hoạt động học thử thú vị nhất tuần này tại Việt Anh`
- Body: Lịch trình ngày học thử + chuẩn bị

**Action 4: Wait 2 days** (tổng +3 ngày)

**Action 5: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Phụ huynh nói gì sau ngày học thử tại Việt Anh`
- Body: Feedback + FAQ

**Action 6: Wait 2 days** (tổng +5 ngày)

**Action 7: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Ưu đãi đặc biệt sau học thử`
- Body: Giảm giá + CTA đăng ký chính thức

→ Publish

---

## WF4: Test Năng Lực
**Link:** https://app.gohighlevel.com/location/Mo8F9woTvjBHFakzawxY/workflow/46a3de55-b8ec-428e-9806-1d32fdabac6c
**Rename:** WF4 - Test Nang Luc

### Bước 2: XÓA trigger cũ nếu có
### Bước 3-4: Add trigger Contact Tag
   - Filter: Tag = `squeeze-test-nang-luc` | Action: Is Added

### Bước 5: Add actions:

**Action 1: Send Email**
- From: tuvan@reply.truongvietanh.com
- Subject: `Link làm Test Năng lực miễn phí cho con {{contact.first_name}}`
- Body: Link test + hướng dẫn

**Action 2: Wait 1 day**

**Action 3: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Kết quả test đã sẵn sàng – Xem báo cáo chi tiết`
- Body: Ý nghĩa các chỉ số + lời khuyên

**Action 4: Wait 2 days** (tổng +3 ngày)

**Action 5: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Lộ trình phát triển theo năng lực của con`
- Body: Chương trình phù hợp tại Việt Anh

**Action 6: Wait 2 days** (tổng +5 ngày)

**Action 7: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Đặt lịch tư vấn 1-1 dựa trên kết quả test`
- Body: CTA đặt lịch tư vấn

→ Publish

---

## WF6: Tuyển Sinh Chung
**Link:** https://app.gohighlevel.com/location/Mo8F9woTvjBHFakzawxY/workflow/3b400d8c-6a62-474d-803e-3c21178315c9
**Rename:** WF6 - Tuyen Sinh Chung

### Bước 2: XÓA trigger cũ nếu có
### Bước 3-4: Add trigger Contact Tag
   - Filter: Tag = `tuyen-sinh` (contains) | Action: Is Added

### Bước 5: Add actions:

**Action 1: Send Email**
- From: tuvan@reply.truongvietanh.com
- Subject: `Cảm ơn {{contact.first_name}} đã quan tâm Trường Việt Anh`
- Body: Giới thiệu trường theo cấp học

**Action 2: Wait 2 days**

**Action 3: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Chương trình bán trú & quốc tế 2026-2027`
- Body: Thành tích + feedback phụ huynh

**Action 4: Wait 2 days** (tổng +4 ngày)

**Action 5: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Còn vài slot tham quan trường tuần này`
- Body: CTA đặt lịch tour + ưu đãi

→ Publish

---

## WF7: Re-engagement Inactive
**Link:** https://app.gohighlevel.com/location/Mo8F9woTvjBHFakzawxY/workflow/de732eb3-361b-4c48-9788-15b1f439d4ba
**Rename:** WF7 - Re-engagement Inactive

### Bước 2: Workflow này blank (vừa tạo mới)
### Bước 3-4: Add trigger Contact Tag
   - Filter: Tag = `inactive-90days` | Action: Is Added

### Bước 5: Add actions:

**Action 1: Send Email**
- From: tuvan@reply.truongvietanh.com
- Subject: `{{contact.first_name}} ơi, vẫn giữ chỗ học thử cho con bạn`
- Body: Nhắc lại + ưu đãi mới

**Action 2: Wait 3 days**

**Action 3: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `3 lý do phụ huynh quay lại chọn Việt Anh sau 3 tháng`
- Body: Cập nhật + thay đổi tích cực

**Action 4: Wait 4 days** (tổng +7 ngày)

**Action 5: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Ưu đãi đặc biệt cho phụ huynh cũ quay lại`
- Body: Học bổng riêng

**Action 6: Wait 7 days** (tổng +14 ngày)

**Action 7: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Cơ hội cuối – năm học mới cùng Việt Anh`
- Body: CTA mạnh + deadline

→ Publish

---

## WF9: Alumni & Referral
**Link:** https://app.gohighlevel.com/location/Mo8F9woTvjBHFakzawxY/workflow/627cd5eb-7058-4a2c-8007-d4a38632475f
**Rename:** WF9 - Alumni Referral

### Bước 2: XÓA trigger + content cũ (Inactive Leads Re-Engagement)
### Bước 3-4: Add trigger Contact Tag
   - Filter: Tag = `alumni-referral` | Action: Is Added

### Bước 5: Add actions:

**Action 1: Send Email**
- From: tuvan@reply.truongvietanh.com
- Subject: `{{contact.first_name}} ơi, em bạn có muốn học cùng trường?`
- Body: Giới thiệu chương trình referral

**Action 2: Wait 3 days**

**Action 3: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Học bổng 10 triệu dành cho em của cựu học sinh`
- Body: Chi tiết ưu đãi

**Action 4: Wait 4 days** (tổng +7 ngày)

**Action 5: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `240 gia đình alumni đã giới thiệu em năm ngoái`
- Body: Case studies

**Action 6: Wait 7 days** (tổng +14 ngày)

**Action 7: Send Email**
- From: tuyensinh@news.truongvietanh.com
- Subject: `Link giới thiệu em – hoàn tất để nhận ưu đãi`
- Body: CTA cuối cùng

→ Publish

---

## Footer chung (thêm vào cuối MỌI email)

```
Trường Liên cấp Việt Anh
269A Nguyễn Trọng Tuyển, P. Phú Nhuận, TP.HCM
SĐT: 0916 961 409 | Email: tuyensinh@truongvietanh.com

Email này được gửi vì bạn đã đăng ký trên website hoc.truongvietanh.com.
Hủy đăng ký: {{unsubscribe_url}}
```

---

## GHL AI Shortcut (nhanh hơn)

Thay vì add từng action thủ công, copy prompt sau vào ô AI builder ở đầu mỗi workflow:

**WF2:** "Khi contact có tag squeeze-ebook-lo-trinh: gửi email ngay từ tuvan@reply.truongvietanh.com với subject 'Ebook Lộ trình lớp 10 – Tặng ngay cho {{contact.first_name}}', đợi 1 ngày gửi email 2 subject '3 sai lầm lớn nhất khi chọn lớp 10 mà 87% phụ huynh mắc phải', đợi 2 ngày gửi email 3 subject '95% Học Sinh Việt Anh Vào TOP THPT - Bí Quyết', đợi 2 ngày gửi email 4 subject 'Mời con làm Bài Test Năng Lực Miễn Phí', đợi 2 ngày gửi email 5 subject 'Cơ hội cuối: Ưu đãi Tuyển Sinh THCS 2026'"

**WF3:** "Khi contact có tag squeeze-hoc-thu: gửi email ngay từ tuvan@reply.truongvietanh.com subject 'Xác nhận đăng ký học thử thành công', đợi 1 ngày gửi email 2 subject '3 hoạt động học thử thú vị nhất tuần này tại Việt Anh', đợi 2 ngày gửi email 3 subject 'Phụ huynh nói gì sau ngày học thử tại Việt Anh', đợi 2 ngày gửi email 4 subject 'Ưu đãi đặc biệt sau học thử'"

**WF4:** "Khi contact có tag squeeze-test-nang-luc: gửi email ngay từ tuvan@reply.truongvietanh.com subject 'Link làm Test Năng lực miễn phí cho con {{contact.first_name}}', đợi 1 ngày gửi email 2 subject 'Kết quả test đã sẵn sàng – Xem báo cáo chi tiết', đợi 2 ngày gửi email 3 subject 'Lộ trình phát triển theo năng lực của con', đợi 2 ngày gửi email 4 subject 'Đặt lịch tư vấn 1-1 dựa trên kết quả test'"

**WF6:** "Khi contact có tag tuyen-sinh: gửi email ngay từ tuvan@reply.truongvietanh.com subject 'Cảm ơn {{contact.first_name}} đã quan tâm Trường Việt Anh', đợi 2 ngày gửi email 2 subject 'Chương trình bán trú & quốc tế 2026-2027', đợi 2 ngày gửi email 3 subject 'Còn vài slot tham quan trường tuần này'"

**WF7:** "Khi contact có tag inactive-90days: gửi email ngay từ tuvan@reply.truongvietanh.com subject '{{contact.first_name}} ơi, vẫn giữ chỗ học thử cho con bạn', đợi 3 ngày gửi email 2 subject '3 lý do phụ huynh quay lại chọn Việt Anh sau 3 tháng', đợi 4 ngày gửi email 3 subject 'Ưu đãi đặc biệt cho phụ huynh cũ quay lại', đợi 7 ngày gửi email 4 subject 'Cơ hội cuối – năm học mới cùng Việt Anh'"

**WF9:** "Khi contact có tag alumni-referral: gửi email ngay từ tuvan@reply.truongvietanh.com subject '{{contact.first_name}} ơi, em bạn có muốn học cùng trường?', đợi 3 ngày gửi email 2 subject 'Học bổng 10 triệu dành cho em của cựu học sinh', đợi 4 ngày gửi email 3 subject '240 gia đình alumni đã giới thiệu em năm ngoái', đợi 7 ngày gửi email 4 subject 'Link giới thiệu em – hoàn tất để nhận ưu đãi'"

---

## Sau khi xong tất cả: Save SMTP

1. Vào Settings → Email Services → Custom SMTP
2. Host: email-smtp.ap-southeast-1.amazonaws.com
3. Port: 587
4. Username: [REDACTED — see AWS SES Console]
5. From Email: tuvan@reply.truongvietanh.com
6. Save
