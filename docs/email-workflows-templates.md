# 9 Email Workflow Templates - Trường Việt Anh

## GHL SMTP Settings
- Host: email-smtp.ap-southeast-1.amazonaws.com
- Port: 587 (TLS)
- Username: AKIARQZY2FTA3OLZJDBV
- Password: BOKcoKG/FfnLFTY8cg1FGL2t7OUppoxEgKRvQMRJ2ORD
- From (transactional): tuvan@reply.truongvietanh.com
- From (marketing): tuyensinh@news.truongvietanh.com
- Configuration Set: ghl-marketing

---

## WF1: Checklist Chọn Trường (4 emails, 7 ngày)
**Trigger tag:** squeeze-checklist
**Workflow ID:** c5f1ccf1-5a1f-4cce-ad55-fcbcfc647aa2

### Email 1 (Ngay - từ reply.)
- Subject: {{contact.first_name}} ạ, Checklist chọn trường dành riêng cho con bạn
- From: tuvan@reply.truongvietanh.com
- Nội dung: Gửi link download Checklist PDF + giới thiệu ngắn về Trường Việt Anh
- CTA: Tải Checklist ngay

### Email 2 (+1 ngày - từ news.)
- Subject: 7 tiêu chí vàng giúp chọn trường phù hợp con bạn
- Nội dung: 3 tiêu chí đầu tiên + mời tham quan
- CTA: Xem đầy đủ 7 tiêu chí

### Email 3 (+3 ngày)
- Subject: So sánh Trường Việt Anh với các trường khác tại TP.HCM
- Nội dung: Thành tích học sinh + feedback phụ huynh + bảng so sánh
- CTA: Đặt lịch tham quan

### Email 4 (+5 ngày)
- Subject: {{contact.first_name}}, ưu đãi đăng ký sớm 2026 sắp hết hạn
- Nội dung: Ưu đãi early-bird + CTA mạnh
- CTA: Đặt lịch tham quan ngay

---

## WF2: Ebook Lộ Trình Lớp 10 (5 emails, 7 ngày)
**Trigger tag:** squeeze-ebook-lo-trinh

### Email 1 (Ngay - từ reply.)
- Subject: Ebook Lộ trình lớp 10 – Tặng ngay cho {{contact.first_name}}
- Nội dung: Link download Ebook + overview nội dung
- CTA: Tải Ebook ngay

### Email 2 (+1 ngày)
- Subject: 3 sai lầm lớn nhất khi chọn lớp 10 mà 87% phụ huynh mắc phải
- Nội dung: Tips cụ thể + chương trình Việt Anh

### Email 3 (+3 ngày)
- Subject: 95% Học Sinh Việt Anh Vào TOP THPT - Bí Quyết
- Nội dung: Thành tích + phương pháp giảng dạy

### Email 4 (+5 ngày)
- Subject: Mời con làm Bài Test Năng Lực Miễn Phí
- Nội dung: Link test + tư vấn 1-1
- CTA: Làm test ngay

### Email 5 (+7 ngày)
- Subject: Cơ hội cuối: Ưu đãi Tuyển Sinh THCS 2026
- Nội dung: Ưu đãi + deadline
- CTA: Đăng ký ngay

---

## WF3: Học Thử Miễn Phí (4 emails, 5 ngày)
**Trigger tag:** squeeze-hoc-thu

### Email 1 (Ngay - từ reply.)
- Subject: Xác nhận đăng ký học thử thành công
- Nội dung: Chi tiết buổi học thử + địa chỉ cơ sở

### Email 2 (+1 ngày)
- Subject: 3 hoạt động học thử thú vị nhất tuần này tại Việt Anh
- Nội dung: Lịch trình ngày học thử + chuẩn bị

### Email 3 (+3 ngày)
- Subject: Phụ huynh nói gì sau ngày học thử tại Việt Anh
- Nội dung: Feedback + FAQ

### Email 4 (+5 ngày)
- Subject: Ưu đãi đặc biệt sau học thử
- Nội dung: Giảm giá + CTA đăng ký chính thức

---

## WF4: Test Năng Lực (4 emails, 5 ngày)
**Trigger tag:** squeeze-test-nang-luc

### Email 1 (Ngay - từ reply.)
- Subject: Link làm Test Năng lực miễn phí cho con {{contact.first_name}}
- Nội dung: Link test + hướng dẫn

### Email 2 (+1 ngày)
- Subject: Kết quả test đã sẵn sàng – Xem báo cáo chi tiết
- Nội dung: Ý nghĩa các chỉ số + lời khuyên

### Email 3 (+3 ngày)
- Subject: Lộ trình phát triển theo năng lực của con
- Nội dung: Chương trình phù hợp tại Việt Anh

### Email 4 (+5 ngày)
- Subject: Đặt lịch tư vấn 1-1 dựa trên kết quả test
- Nội dung: CTA đặt lịch tư vấn

---

## WF5: Webinar Phụ Huynh (5 emails, 5 ngày)
**Trigger tag:** squeeze-webinar
**Workflow ID:** e8bc47e9-ac16-4a4e-90f9-e542edcc4719

### Email 1 (Ngay - từ reply.)
- Subject: Xác nhận tham gia Webinar "Nuôi dạy con tự lập 2026"
- Nội dung: Link tham dự + lịch + diễn giả

### Email 2 (+1 ngày)
- Subject: 4 bí quyết giúp con vào lớp 10 chuyên Anh
- Nội dung: Nội dung chính sẽ chia sẻ trong webinar

### Email 3 (-1 ngày trước webinar)
- Subject: Nhắc nhở: Webinar bắt đầu sau 48 giờ
- Nội dung: Chuẩn bị câu hỏi

### Email 4 (+1 ngày sau webinar)
- Subject: Tóm tắt nhanh điểm nổi bật từ webinar
- Nội dung: Replay link + slides

### Email 5 (+3 ngày)
- Subject: Sau webinar – Đặt lịch tham quan trường
- Nội dung: CTA đặt lịch tour

---

## WF6: Tuyển Sinh Chung (3 emails, 4 ngày)
**Trigger tag:** tuyen-sinh-*

### Email 1 (Ngay - từ reply.)
- Subject: Cảm ơn {{contact.first_name}} đã quan tâm Trường Việt Anh
- Nội dung: Giới thiệu trường theo cấp học

### Email 2 (+2 ngày)
- Subject: Chương trình bán trú & quốc tế 2026-2027
- Nội dung: Thành tích + feedback phụ huynh

### Email 3 (+4 ngày)
- Subject: Còn vài slot tham quan trường tuần này
- Nội dung: CTA đặt lịch tour + ưu đãi

---

## WF7: Re-engagement Inactive (4 emails) — MỚI
**Trigger tag:** inactive-90days

### Email 1 (từ reply.)
- Subject: {{contact.first_name}} ơi, vẫn giữ chỗ học thử cho con bạn
- Nội dung: Nhắc lại + ưu đãi mới

### Email 2 (+3 ngày)
- Subject: 3 lý do phụ huynh quay lại chọn Việt Anh sau 3 tháng
- Nội dung: Cập nhật + thay đổi tích cực

### Email 3 (+7 ngày)
- Subject: Ưu đãi đặc biệt cho phụ huynh cũ quay lại
- Nội dung: Học bổng riêng

### Email 4 (+14 ngày)
- Subject: Cơ hội cuối – năm học mới cùng Việt Anh
- Nội dung: CTA mạnh + deadline

---

## WF8: Post-Tour Follow-up (5 emails) — MỚI
**Trigger tag:** post-tour OR post-hoc-thu
**Workflow ID:** faf0eeab-253d-4c29-bce3-9152f7f36637

### Email 1 (từ reply.)
- Subject: Cảm ơn gia đình đã tham quan hôm nay
- Nội dung: Tóm tắt buổi tour + ấn tượng

### Email 2 (+1 ngày)
- Subject: Con bạn ấn tượng nhất với điều gì?
- Nội dung: Feedback survey

### Email 3 (+2 ngày)
- Subject: Ưu đãi early-bird chỉ còn 48h
- Nội dung: Giá đặc biệt sau tour

### Email 4 (+4 ngày)
- Subject: Báo cáo đánh giá sau buổi học thử
- Nội dung: Nhận xét từ giáo viên

### Email 5 (+7 ngày)
- Subject: Quyết định cuối cùng cho năm học mới
- Nội dung: Hỗ trợ thêm + CTA

---

## WF9: Alumni & Referral (4 emails) — MỚI
**Trigger tag:** alumni-referral

### Email 1 (từ reply.)
- Subject: {{contact.first_name}} ơi, em bạn có muốn học cùng trường?
- Nội dung: Giới thiệu chương trình referral

### Email 2 (+3 ngày)
- Subject: Học bổng 10 triệu dành cho em của cựu học sinh
- Nội dung: Chi tiết ưu đãi

### Email 3 (+7 ngày)
- Subject: 240 gia đình alumni đã giới thiệu em năm ngoái
- Nội dung: Case studies

### Email 4 (+14 ngày)
- Subject: Link giới thiệu em – hoàn tất để nhận ưu đãi
- Nội dung: CTA cuối cùng

---

## Footer chung (thêm vào cuối mọi email)
```
Trường Liên cấp Việt Anh
269A Nguyễn Trọng Tuyển, P. Phú Nhuận, TP.HCM
SĐT: 0916 961 409 | Email: tuyensinh@truongvietanh.com

Email này được gửi vì bạn đã đăng ký trên website hoc.truongvietanh.com.
Hủy đăng ký: {{unsubscribe_url}}
```
