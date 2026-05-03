# 📧 GHL PASTE-READY — 15 Email Lead Magnet (Bundle Approach)

> **Cách tiếp cận MỚI — Bundle:**
> - Email 1: Gửi **trọn bộ 3 tài liệu cùng lúc** (1 link Drive folder) — cảm giác "đã"
> - Email 2 & 3: KHÔNG tặng thêm tài liệu. Bóc 1-2 insight đắt giá từ bundle ra **kể chuyện**, chạm cảm xúc, dẫn về tham quan trường.
>
> **Cách dùng:** Mỗi email là 1 khối — copy từng dòng paste vào field tương ứng trong GHL.
>
> **Lưu ý:** Trước khi save, **thay `__LINK_BUNDLE__` bằng URL Drive folder của bundle tương ứng** (chỉ cần 5 link Drive folder, không phải 15 link PDF riêng).

---

## 🎯 5 BUNDLE — UPLOAD DRIVE TRƯỚC

Anh tạo 5 folder trên Google Drive, mỗi folder upload 3 PDF, set share = "Anyone with link · Viewer", lấy link folder:

| # | Bundle Name | 3 PDF trong folder | Link folder cần lấy |
|---|---|---|---|
| 1 | **Bộ Hành Trang Mầm Non Vàng** | Checklist Chọn Trường MN + Ebook 9 Lĩnh Vực + Giai Đoạn Vàng Ngôn Ngữ | `__LINK_BUNDLE_MN__` |
| 2 | **Hành Trang Toàn Diện Cho Con Vào Lớp 1** | Checklist Chọn Trường TH + 10 Kỹ Năng Lớp 1 + Lộ Trình TA Lớp 1-5 | `__LINK_BUNDLE_TH__` |
| 3 | **Bộ Hành Trang Lên Cấp 2** | So Sánh Mô Hình THCS + Chuyển Trường Lớp 6 + Lộ Trình IELTS THCS | `__LINK_BUNDLE_THCS__` |
| 4 | **Bộ Định Hướng THPT & Đại Học** | Cẩm Nang Chọn THPT + 50 Trường ĐH Xét IELTS + Chuẩn Bị Du Học Lớp 10 | `__LINK_BUNDLE_THPT__` |
| 5 | **Bộ Chuẩn Bị Trại Hè Bứt Phá** | Reading Challenge 30 Ngày + Conversation Cards Song Ngữ + PP Học Cho Teen | `__LINK_BUNDLE_TRAIHE__` |

---

## 🎯 5 WORKFLOW CẦN TẠO TRONG GHL

| Workflow Name | Trigger (Tag added) | 3 Email |
|---|---|---|
| `LM - Mam Non` | `mam-non-go-vap`, `mam-non-can-giuoc`, `mam-non-binh-tan`, `mam-non-phu-nhuan`, `mam-non-rach-gia`, `mam-non-thai-son` | MN-1, MN-2, MN-3 |
| `LM - Tieu Hoc` | `tieu-hoc-go-vap`, `tieu-hoc-binh-tan`, `tieu-hoc-thai-son-long-hau` | TH-1, TH-2, TH-3 |
| `LM - THCS` | `thcs-go-vap`, `thcs-binh-tan` | THCS-1, THCS-2, THCS-3 |
| `LM - THPT` | `thpt-go-vap` | THPT-1, THPT-2, THPT-3 |
| `LM - Trai He` | 10 source `trai-he-*` | TraiHe-1, TraiHe-2, TraiHe-3 |

**Workflow structure:** `[Trigger]` → `[Wait 1d]` → `[Send Day 1]` → `[Wait 1d]` → `[Send Day 2]` → `[Wait 1d]` → `[Send Day 3]` → End

---

# 🟢 CHUỖI 1 — MẦM NON

═══════════════════════════════════════════════
## 📧 MN-1 (Day 1) — Gửi nguyên Bundle
═══════════════════════════════════════════════

**Action Name:**
```
MN - Day 1 - Bo Hanh Trang Mam Non Vang
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Bộ Hành Trang Mầm Non Vàng — quà tặng của tôi
```

**Pre-Header:**
```
3 tài liệu trọn vẹn — checklist chọn trường, 9 lĩnh vực phát triển, giai đoạn vàng ngôn ngữ.
```

**Body:**
```
Chào {{contact.first_name}},

Tôi Dương đây.

Cảm ơn bạn đã để lại thông tin với chúng tôi.

Như đã hứa, tôi gửi tặng bạn không phải một, mà là cả Bộ Hành Trang Mầm Non Vàng — 3 tài liệu mà tôi đã đúc kết qua 15 năm vận hành hệ thống Mầm non Việt Anh, từ năm 2011.

Bộ này gồm:

1. Checklist Chọn Trường Mầm Non — 7-8 điểm cốt lõi mọi cha mẹ cần kiểm tra trước khi gửi con
2. Ebook 9 Lĩnh Vực Phát Triển Của Trẻ Mầm Non — bản đồ toàn diện về sự phát triển của con từ 2-6 tuổi
3. Giai Đoạn Vàng Ngôn Ngữ — vì sao 0-6 tuổi là cửa sổ quyết định cả đời con

👉 Tải trọn bộ tại đây: __LINK_BUNDLE_MN__

Tôi không gửi nhỏ giọt từng ngày — vì tôi muốn bạn có đầy đủ tài liệu trong tay ngay từ hôm nay. Bạn có thể đọc theo thứ tự nào bạn muốn.

Hai email tới, tôi sẽ kể bạn nghe hai câu chuyện rút ra trực tiếp từ bộ tài liệu này — những điều mà nhiều phụ huynh đọc xong nói với tôi rằng "giá em biết sớm hơn".

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 MN-2 (Day 2) — Insight: 9 lĩnh vực phát triển
═══════════════════════════════════════════════

**Action Name:**
```
MN - Day 2 - 9 Linh Vuc - Insight Story
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Đứa trẻ giỏi tiếng Anh nhưng không biết tự xúc cơm
```

**Pre-Header:**
```
Một câu chuyện trong giai đoạn đầu xây trường mà tôi nhớ rất lâu — và bài học về 9 lĩnh vực.
```

**Body:**
```
{{contact.first_name}} ơi,

Trong giai đoạn đầu xây dựng hệ thống Mầm non Việt Anh, có một bé gái mà tôi nhớ rất lâu.

Bốn tuổi, con nói tiếng Anh trôi chảy đến mức người lớn cũng phải ngạc nhiên. Phụ huynh của con tự hào, đi đâu cũng cho con biểu diễn vài câu.

Nhưng buổi đầu tiên con vào lớp Mầm non của chúng tôi, một cô giáo gọi tôi ra, ghé tai nói nhỏ: "Anh ơi, bé này không biết tự xúc cơm. Không biết tự đi vệ sinh. Khi bị bạn lấy đồ chơi, con chỉ đứng khóc, không biết phản ứng."

Lòng tôi chùng xuống.

Cha mẹ của con đã đầu tư rất nhiều cho 1 lĩnh vực — ngôn ngữ tiếng Anh — và bỏ trống 8 lĩnh vực còn lại.

Đây là điều mà bộ tài liệu tôi gửi bạn hôm qua — Ebook 9 Lĩnh Vực Phát Triển — muốn nói thẳng với mọi phụ huynh:

Một đứa trẻ Mầm non phát triển toàn diện trên 9 lĩnh vực — vận động tinh, vận động thô, ngôn ngữ, cảm xúc xã hội, nhận thức, thẩm mỹ, đạo đức, kỹ năng sống, tư duy độc lập.

Bỏ trống một lĩnh vực ở giai đoạn này, đứa trẻ phải bù lại trong nhiều năm sau. Có những thứ không bao giờ bù được trọn vẹn.

Nếu bạn chưa mở ebook đó ra — hãy mở tối nay. Đặc biệt phần tự đánh giá: đánh dấu xem con bạn đang vững ở lĩnh vực nào, đang yếu ở lĩnh vực nào.

Đây không phải để chấm điểm con. Đây để bạn biết tuần này nên dành thời gian cho con vào việc gì.

Ngày mai, tôi sẽ kể bạn nghe câu chuyện thứ hai — về một cửa sổ trong đời con chỉ mở 1 lần.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 MN-3 (Day 3) — Insight: Giai đoạn vàng + CTA
═══════════════════════════════════════════════

**Action Name:**
```
MN - Day 3 - Giai Doan Vang - CTA Tham Quan
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Cửa sổ chỉ mở 1 lần trong đời con
```

**Pre-Header:**
```
Câu chuyện hai đứa trẻ — một bắt đầu năm 4 tuổi, một bắt đầu năm 9 tuổi.
```

**Body:**
```
{{contact.first_name}} ơi,

Tôi muốn kể bạn nghe câu chuyện hai đứa trẻ.

Đứa thứ nhất, tiếp xúc tiếng Anh từ 4 tuổi — không học theo kiểu nhồi, chỉ là cô bản ngữ kể chuyện, hát, chơi với con mỗi ngày.

Đứa thứ hai, bắt đầu học tiếng Anh năm 9 tuổi — học rất chăm, đi trung tâm uy tín, có giáo viên giỏi.

Sau 3 năm, cả hai đều "biết" tiếng Anh.

Nhưng có một thứ rất khác: đứa thứ nhất phát âm như một đứa trẻ bản xứ. Đứa thứ hai dù phát âm chuẩn vẫn có "âm Việt" rất nhẹ, không lẫn được.

Đây không phải vì đứa thứ hai dở. Đây là vì đứa thứ nhất đã đi qua một giai đoạn mà não bộ tiếp nhận âm thanh ngôn ngữ như một bản năng — giai đoạn 0 đến 6 tuổi.

Sau 6 tuổi, cơ chế học chuyển sang "có ý thức". Vẫn học được, nhưng không còn cái vô thức tự nhiên đó nữa.

Đây là điều mà tài liệu Giai Đoạn Vàng Ngôn Ngữ trong bộ tôi gửi bạn nói chi tiết — kèm hàng chục nghiên cứu thần kinh học làm bằng chứng.

Tôi viết bộ tài liệu đó không phải để bạn cho con học sớm trong sợ hãi. Tôi viết để bạn biết bạn đang có một cửa sổ — và quyết định một cách bình tĩnh.

Cảm ơn bạn đã đọc 3 email của tôi.

Nếu bạn muốn cho con bước vào một môi trường Mầm non thật sự tận dụng giai đoạn vàng này — hãy đặt lịch tham quan Việt Anh:

👉 https://truongvietanh.com/dat-lich-tham-quan

Tôi sẽ rất vui được gặp gia đình bạn tại trường.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh

📞 0916 961 409 · 💬 zalo.me/1678310120468101523
```

---

# 🟡 CHUỖI 2 — TIỂU HỌC

═══════════════════════════════════════════════
## 📧 TH-1 (Day 1) — Gửi nguyên Bundle
═══════════════════════════════════════════════

**Action Name:**
```
TH - Day 1 - Hanh Trang Toan Dien Vao Lop 1
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Hành Trang Toàn Diện Cho Con Vào Lớp 1 — quà của tôi
```

**Pre-Header:**
```
3 tài liệu trọn bộ — chọn trường, 10 kỹ năng nền, lộ trình tiếng Anh 5 năm.
```

**Body:**
```
Chào {{contact.first_name}},

Tôi Dương đây.

Cảm ơn bạn đã đăng ký nhận tài liệu từ chúng tôi.

Tôi gửi tặng bạn nguyên bộ Hành Trang Toàn Diện Cho Con Vào Lớp 1 — 3 tài liệu mà tôi đã rút ra sau 15 năm vận hành hệ thống Việt Anh:

1. Checklist Chọn Trường Tiểu Học — đối chiếu khi đi tham quan từng trường
2. Checklist 10 Kỹ Năng Cha Mẹ Làm Được Tại Nhà Trước Lớp 1 — không phải dạy chữ, không phải dạy tính
3. Lộ Trình Tiếng Anh Lớp 1-5 — chuẩn theo khung CEFR + cột mốc Cambridge

👉 Tải trọn bộ tại đây: __LINK_BUNDLE_TH__

Tôi gửi bạn cả bộ một lần — để bạn có đầy đủ trong tay, đọc theo nhịp của bạn.

Hai email tới, tôi sẽ kể bạn hai câu chuyện rút ra từ chính bộ tài liệu này — câu chuyện về một kỹ năng rất nhỏ quyết định cả lớp 1, và câu chuyện về một sai lầm lộ trình tiếng Anh khiến cả gia đình phải hối tiếc.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 TH-2 (Day 2) — Insight: 1 kỹ năng quyết định lớp 1
═══════════════════════════════════════════════

**Action Name:**
```
TH - Day 2 - 1 Ky Nang - Insight Story
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Cậu bé ngồi giữa lớp với chiếc ba lô bị tuột quai
```

**Pre-Header:**
```
Một kỹ năng rất nhỏ trong 10 kỹ năng — và nó quyết định cả tháng đầu lớp 1.
```

**Body:**
```
{{contact.first_name}} ơi,

Có một câu chuyện tôi nghe từ một cô giáo lớp 1 của Việt Anh — về buổi sáng đầu tiên của năm học.

Lớp đông. Ba mẹ vừa rời cổng. Một cậu bé ngồi giữa hàng ghế, chiếc ba lô bị tuột quai bên trái, lệch hẳn xuống.

Con không biết phải làm gì. Không biết lấy sách ra. Không biết gắn quai ba lô lại. Cô giáo bận đón từng bé khác, không kịp xuống chỗ con.

Đến giờ học, cô gọi cả lớp lấy vở. Mọi đứa khác mở ba lô, lấy ra. Cậu bé này ngồi im, mắt rưng rưng.

Vấn đề không phải là con không biết chữ. Con biết chữ trước cả hơn nửa lớp.

Vấn đề là con chưa từng tự mở ba lô của mình ở nhà. Mẹ con luôn làm việc đó cho con.

Đây là 1 trong 10 kỹ năng mà tôi đã viết trong bộ tài liệu gửi bạn hôm qua — kỹ năng tự chăm sóc bản thân. Nghe có vẻ không liên quan đến học. Nhưng chính kỹ năng này quyết định việc con bắt nhịp lớp 1 trong tháng đầu.

Trong khi các bé khác đang học, đứa trẻ chưa biết tự chăm sóc bản thân vẫn đang loay hoay với cái ba lô. Khoảng cách bắt đầu hình thành từ đó.

Hãy mở Checklist 10 Kỹ Năng tôi gửi — chọn 2-3 kỹ năng yếu nhất của con, dành 15 phút mỗi tối làm cùng con. Trong vòng 1 tháng bạn sẽ thấy khác.

Ngày mai, tôi sẽ kể câu chuyện thứ hai — về một sai lầm mà rất nhiều cha mẹ đầu tư cho con học tiếng Anh đang mắc phải.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 TH-3 (Day 3) — Insight: Sai lầm lộ trình TA + CTA
═══════════════════════════════════════════════

**Action Name:**
```
TH - Day 3 - Lo Trinh TA - CTA Tham Quan
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Học 5 năm tiếng Anh nhưng vẫn loay hoay ở Starters
```

**Pre-Header:**
```
Một gia đình đầu tư 5 năm. Lớp 5, con vẫn không thi qua được Starters. Vì sao?
```

**Body:**
```
{{contact.first_name}} ơi,

Có một phụ huynh đến gặp tôi cuối năm ngoái — chị đầu tư cho con học tiếng Anh từ lớp 1, đều đặn 3 buổi/tuần ở một trung tâm tốt.

Lớp 5, chị cho con thi Cambridge Starters — nghĩ rằng con phải qua dễ. Kết quả: trượt.

Chị đến gặp tôi trong tâm trạng vừa giận vừa thất vọng. "Em đầu tư 5 năm cho nó, sao bây giờ nó vẫn ở mức Starters?"

Tôi hỏi lại một câu duy nhất: "Chị có lộ trình cụ thể không, hay chỉ học theo từng kỳ?"

Chị im lặng.

Đây là sai lầm phổ biến nhất mà tôi thấy ở phụ huynh Tiểu học. Đầu tư rất nhiều thời gian, tiền bạc — nhưng không có lộ trình rõ ràng. Hệ quả là con học mãi mà không thấy đi đâu, và phụ huynh không biết đo lường tiến độ bằng gì.

Trong tài liệu Lộ Trình Tiếng Anh Lớp 1-5 mà tôi gửi bạn, tôi đã làm rõ:

- Lớp nào nên đạt cấp độ Cambridge nào
- Bao giờ là thời điểm tốt nhất thi chứng chỉ đầu tiên
- 3 sai lầm khiến đầu tư nhiều mà không lên trình

Hãy đối chiếu với lộ trình hiện tại của con bạn. Nếu lệch — bây giờ chỉnh còn kịp.

Cảm ơn bạn đã đọc 3 email của tôi.

Nếu bạn muốn cho con trải nghiệm trực tiếp lớp Tiểu học của Việt Anh — nơi tiếng Anh được dạy theo lộ trình chuẩn quốc tế kết hợp Việt — hãy đặt lịch tham quan và làm bài kiểm tra trình độ miễn phí cho con:

👉 https://truongvietanh.com/dat-lich-tham-quan

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh

📞 0916 961 409
```

---

# 🔵 CHUỖI 3 — THCS

═══════════════════════════════════════════════
## 📧 THCS-1 (Day 1) — Gửi nguyên Bundle
═══════════════════════════════════════════════

**Action Name:**
```
THCS - Day 1 - Bo Hanh Trang Len Cap 2
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Bộ Hành Trang Lên Cấp 2 — quà tặng của tôi
```

**Pre-Header:**
```
3 tài liệu trọn bộ — so sánh các mô hình THCS, chuyển trường lớp 6, lộ trình IELTS.
```

**Body:**
```
Chào {{contact.first_name}},

Tôi Dương đây.

Cảm ơn bạn đã đăng ký nhận tài liệu.

Tôi gửi tặng bạn nguyên bộ Hành Trang Lên Cấp 2 — 3 tài liệu dành cho phụ huynh đang chuẩn bị cho con bước vào THCS:

1. So Sánh Các Mô Hình THCS — công lập, tư thục, song bằng, quốc tế. So sánh thật về học phí, chương trình, đầu ra, điểm yếu của từng mô hình.
2. Hướng Dẫn Chuyển Trường Lớp 6 — 5 câu hỏi cha mẹ cần trả lời + khi nào KHÔNG nên chuyển
3. Lộ Trình IELTS THCS — từ lớp 6 đến lớp 9, kèm cột mốc band điểm

👉 Tải trọn bộ tại đây: __LINK_BUNDLE_THCS__

Tôi gửi cả bộ một lần — để bạn có thể đọc theo nhịp của mình.

Hai email tới, tôi sẽ kể bạn hai câu chuyện thực mà tôi đã chứng kiến — về một quyết định chuyển trường vì sợ thay vì vì con cần, và về một học sinh thay đổi cả hồ sơ vào lớp 10 nhờ một quyết định ở năm lớp 7.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 THCS-2 (Day 2) — Insight: Chuyển trường vì sợ
═══════════════════════════════════════════════

**Action Name:**
```
THCS - Day 2 - Chuyen Truong - Insight Story
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
"Em chuyển trường cho con vì sợ — không phải vì con cần"
```

**Pre-Header:**
```
Một câu chia sẻ của phụ huynh khiến tôi suy nghĩ rất lâu. Có thể bạn cũng đang ở tình huống đó.
```

**Body:**
```
{{contact.first_name}} ơi,

Một phụ huynh từng ngồi trước mặt tôi và nói câu này:

"Anh Dương ơi, em vừa nhận ra em chuyển trường cho con vì em sợ — không phải vì con thật sự cần."

Chị kể: trên hội nhóm phụ huynh, mọi người đua nhau cho con vào trường tư song bằng, quốc tế. Chị nghe nhiều quá, sốt ruột. Con đang học công lập tốt, hòa nhập tốt, kết quả tốt — nhưng chị vẫn quyết định chuyển vào lớp 6.

Sau 3 tháng, con không thích nghi được. Bạn mới khác môi trường cũ, nhịp học khác, con bị tụt hạng. Chị đến gặp tôi trong tâm trạng hối hận.

Tôi không trách chị. Tôi đã thấy quá nhiều phụ huynh đưa ra quyết định lớn vì áp lực xã hội thay vì vì con.

Đây chính là lý do tôi viết phần "Khi nào KHÔNG nên chuyển" trong tài liệu Hướng Dẫn Chuyển Trường Lớp 6 mà tôi gửi bạn hôm qua. Đó có lẽ là phần quan trọng nhất của tài liệu — quan trọng hơn cả checklist hồ sơ.

5 câu hỏi cha mẹ cần trả lời trước khi quyết định:

1. Lý do thật sự muốn chuyển là gì? (cho con cần, hay vì áp lực xã hội?)
2. Trường mới giải quyết được vấn đề cụ thể nào của con?
3. Nếu không chuyển, điều xấu nhất xảy ra là gì?
4. Con đã có ý kiến chưa? Con muốn gì?
5. Gia đình có thực sự sẵn sàng cho 6 tháng đầu khó khăn của con khi chuyển?

Hãy đọc kỹ phần đó. Trả lời thật bằng giấy bút. Sau đó hãy quyết định.

Ngày mai, tôi sẽ kể bạn nghe một câu chuyện khác — về một học sinh đã thay đổi toàn bộ hồ sơ vào lớp 10 nhờ một quyết định vô cùng đơn giản ở năm lớp 7.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 THCS-3 (Day 3) — Insight: IELTS sớm + CTA
═══════════════════════════════════════════════

**Action Name:**
```
THCS - Day 3 - IELTS Som - CTA Tham Quan
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Quyết định lớp 7 đã thay đổi toàn bộ hồ sơ vào lớp 10 của con
```

**Pre-Header:**
```
Một học sinh THCS Việt Anh, một quyết định nhỏ ở năm lớp 7, và kết quả ở lớp 9 khiến mẹ con bật khóc.
```

**Body:**
```
{{contact.first_name}} ơi,

Có một học sinh THCS của Việt Anh mà tôi nhớ rất lâu — vì câu chuyện của con dạy tôi về sức mạnh của thời điểm bắt đầu.

Năm lớp 7, mẹ con đến gặp tôi và hỏi: "Em nên cho con bắt đầu ôn IELTS bây giờ hay đợi lên lớp 9?"

Tôi trả lời: "Bắt đầu bây giờ. Không phải để ôn thi — mà để con tiếp xúc với chuẩn quốc tế từ sớm."

Mẹ con phân vân. Mới lớp 7, sợ con quá tải. Nhưng cuối cùng chị quyết định bắt đầu — chỉ 1-2 buổi/tuần, không nhồi nhét.

Đến năm lớp 9, con thi IELTS được 6.5.

Hồ sơ vào lớp 10 trường top của con khi đó hoàn toàn khác. Con vào được trường công lập song bằng — điều mà ở Việt Nam hiện nay là cánh cửa hẹp.

Khi mẹ con đến trường để cảm ơn, chị bật khóc và nói: "Em không nghĩ một quyết định ở năm lớp 7 lại làm mọi thứ khác đến vậy."

Đây là điều mà tài liệu Lộ Trình IELTS THCS trong bộ tôi gửi bạn nói chi tiết:

- Bao giờ thi thử lần đầu (gợi ý: không phải lớp 9)
- Kỹ năng nào nên tập trung trước (gợi ý: không phải Speaking)
- Cách kết hợp với chương trình chính khóa, không quá tải

Cảm ơn bạn đã đọc 3 email của tôi.

Nếu bạn muốn cho con tham quan và làm bài kiểm tra trình độ tiếng Anh miễn phí tại Việt Anh — để biết con đang ở đâu trên lộ trình IELTS — hãy đặt lịch:

👉 https://truongvietanh.com/dat-lich-tham-quan

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh

📞 0916 961 409
```

---

# 🟣 CHUỖI 4 — THPT

═══════════════════════════════════════════════
## 📧 THPT-1 (Day 1) — Gửi nguyên Bundle
═══════════════════════════════════════════════

**Action Name:**
```
THPT - Day 1 - Bo Dinh Huong THPT Dai Hoc
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Bộ Định Hướng THPT & Đại Học — quà tặng của tôi
```

**Pre-Header:**
```
3 tài liệu trọn bộ — chọn THPT, 50 trường ĐH xét IELTS, chuẩn bị du học từ lớp 10.
```

**Body:**
```
Chào {{contact.first_name}},

Tôi Dương đây.

Cảm ơn bạn đã đăng ký nhận tài liệu.

Tôi gửi tặng bạn nguyên bộ Định Hướng THPT & Đại Học — 3 tài liệu dành cho phụ huynh có con chuẩn bị bước vào lớp 10:

1. Cẩm Nang Chọn Trường THPT — 6 tiêu chí dự đoán đầu ra của con, không phải tiêu chí marketing
2. Danh Sách 50 Trường Đại Học Xét Tuyển IELTS — Ngoại thương, KTQD, Bách khoa, và 47 trường khác
3. Chuẩn Bị Du Học Lớp 10 — lộ trình 3 năm song hành du học và chương trình VN

👉 Tải trọn bộ tại đây: __LINK_BUNDLE_THPT__

Tôi gửi cả bộ một lần — để bạn có đầy đủ trong tay, không phải chờ.

THPT là 3 năm bản lề — quyết định không chỉ điểm thi, mà còn quyết định con vào trường đại học nào, ở Việt Nam hay đi du học, theo ngành nghề nào.

Hai email tới, tôi sẽ kể bạn hai câu chuyện thực — về một học sinh thay đổi cánh cửa đại học chỉ nhờ IELTS, và về một gia đình bắt đầu chuẩn bị du học muộn 1 năm và phải trả giá thế nào.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 THPT-2 (Day 2) — Insight: IELTS mở 50 trường ĐH
═══════════════════════════════════════════════

**Action Name:**
```
THPT - Day 2 - IELTS Mo Cua DH - Insight
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Hai bạn cùng điểm tốt nghiệp — nhưng cánh cửa khác nhau
```

**Pre-Header:**
```
Một bạn thi tốt nghiệp 26 điểm. Một bạn cũng 26. Nhưng chỉ 1 trong 2 vào được Ngoại thương.
```

**Body:**
```
{{contact.first_name}} ơi,

Có một câu chuyện tôi nghe từ chính phụ huynh của một cựu học sinh Việt Anh, sau khi con vào đại học.

Năm đó, con và một bạn thân cùng lớp đều thi tốt nghiệp THPT được khoảng 26 điểm. Cả hai cùng đăng ký vào ĐH Ngoại thương ngành Kinh doanh quốc tế.

Bạn của con: trượt.

Con của chị: đậu.

Khi đó nhiều người bất ngờ. Cùng điểm, cùng ngành, sao một đậu một trượt?

Câu trả lời rất đơn giản: con của chị có IELTS 7.0. Bạn kia không có chứng chỉ tiếng Anh.

Ngoại thương cộng điểm ưu tiên cho thí sinh có IELTS — nửa điểm, một điểm, đôi khi quy đổi cả môn tiếng Anh. Sự khác biệt nửa điểm đó là cánh cửa.

Đây không phải là chuyện hiếm. Hơn 50 trường đại học top tại Việt Nam hiện nay — kể cả ĐH Bách khoa, Kinh tế Quốc dân, Y Hà Nội — đều đang xét tuyển bằng IELTS dưới các hình thức khác nhau.

Trong tài liệu 50 Trường ĐH Xét IELTS mà tôi gửi bạn, có đầy đủ:

- Tên 50 trường + ngành áp dụng
- Mức điểm IELTS tối thiểu của từng trường
- Cách kết hợp với điểm thi tốt nghiệp để tối ưu hồ sơ

Nếu con bạn đang ở lớp 10, đây là 2-3 năm vàng để bắt đầu nghiêm túc với IELTS — không phải vì điểm, mà vì cánh cửa nó mở ra.

Ngày mai, tôi sẽ kể câu chuyện thứ hai — về một gia đình quyết định cho con du học, nhưng bắt đầu chuẩn bị muộn 1 năm và đã phải trả giá thế nào.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 THPT-3 (Day 3) — Insight: Du học muộn 1 năm + CTA
═══════════════════════════════════════════════

**Action Name:**
```
THPT - Day 3 - Du Hoc - CTA Tham Quan
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
"Em mong giá em bắt đầu sớm hơn 1 năm thôi"
```

**Pre-Header:**
```
Câu nói của một mẹ phụ huynh sau khi con đi du học. 1 năm đã đủ tạo ra khoảng cách lớn.
```

**Body:**
```
{{contact.first_name}} ơi,

Có một câu mà mẹ của một cựu học sinh Việt Anh nói với tôi sau khi con đi du học, mà tôi vẫn nhớ:

"Anh Dương ơi, em mong giá em bắt đầu sớm hơn 1 năm thôi."

Câu chuyện thế này: con của chị bắt đầu nghĩ đến du học ở năm lớp 11. Đến giữa lớp 11 mới quyết định chính thức. Lúc đó IELTS chưa có, hồ sơ ngoại khóa chưa xây, SAT chưa thi.

Con của chị vẫn đi du học được. Nhưng kết quả: được nhận vào trường tier 2, không phải trường tier 1 mà gia đình mong muốn ban đầu. Học bổng cũng thấp hơn dự kiến.

Chị nói với tôi: "Nếu em bắt đầu chuẩn bị từ năm lớp 9 hay đầu lớp 10 — chỉ cần 1 năm thêm thôi — IELTS, hồ sơ ngoại khóa, GPA đều khác. Khoảng cách 1 năm = khoảng cách giữa Top 30 và Top 100."

Đây là lý do tôi viết tài liệu Chuẩn Bị Du Học Lớp 10 trong bộ tôi gửi bạn:

- Lộ trình 3 năm lớp 10-12 song hành du học và chương trình VN, không xung đột
- Các chứng chỉ chuẩn hóa cần có (IELTS, SAT, AP) — bao giờ thi
- Cách xây hồ sơ ngoại khóa từ lớp 10
- 4 sai lầm phổ biến khiến hồ sơ bị từ chối ở vòng cuối

Nếu gia đình bạn đang nghĩ đến du học — kể cả khi chưa chắc chắn 100% — bắt đầu sớm là quyết định khôn ngoan nhất. Bạn không mất gì khi chuẩn bị sẵn. Bạn mất rất nhiều khi nhận ra mình muộn.

Cảm ơn bạn đã đọc 3 email của tôi.

Nếu bạn muốn tư vấn 1-1 về lộ trình THPT và đại học cho con — đặt lịch tham quan trường, gặp tôi và đội ngũ:

👉 https://truongvietanh.com/dat-lich-tham-quan

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh

📞 0916 961 409
```

---

# 🟠 CHUỖI 5 — TRẠI HÈ

═══════════════════════════════════════════════
## 📧 TraiHe-1 (Day 1) — Gửi nguyên Bundle
═══════════════════════════════════════════════

**Action Name:**
```
TraiHe - Day 1 - Bo Chuan Bi Trai He
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
Bộ Chuẩn Bị Trại Hè Bứt Phá — quà tặng của tôi
```

**Pre-Header:**
```
3 tài liệu trọn bộ — Reading Challenge 30 ngày, Conversation Cards song ngữ, PP học cho teen.
```

**Body:**
```
Chào {{contact.first_name}},

Tôi Dương đây.

Cảm ơn bạn đã đăng ký Trại hè Việt Anh.

Trong khi chờ ngày trại bắt đầu, tôi gửi tặng bạn nguyên bộ Chuẩn Bị Trại Hè Bứt Phá — 3 tài liệu để gia đình bạn cùng con khởi động trước:

1. Reading Challenge 30 Ngày — bộ thử thách đọc tiếng Anh 15 phút/ngày
2. Conversation Cards Song Ngữ — 50+ chủ đề cho bữa cơm song ngữ tại nhà
3. Phương Pháp Học Cho Teen — đặc biệt nếu con bạn ở tuổi THCS-THPT

👉 Tải trọn bộ tại đây: __LINK_BUNDLE_TRAIHE__

Trại hè kéo dài chỉ 2-4 tuần. Nhưng nếu trước đó con đã có thói quen tốt — hiệu quả của trại tăng gấp đôi.

Hai email tới, tôi sẽ kể bạn hai câu chuyện rút từ chính bộ này — về một đứa trẻ thay đổi sau Reading Challenge, và về cách nói chuyện với teen mà không tạo ra cuộc chiến.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 TraiHe-2 (Day 2) — Insight: Reading Challenge thay đổi 1 đứa trẻ
═══════════════════════════════════════════════

**Action Name:**
```
TraiHe - Day 2 - Reading Challenge - Insight
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
30 ngày — và một đứa trẻ ghét đọc đã tự cầm sách lên
```

**Pre-Header:**
```
Một bé trai từng nói "con ghét đọc sách". Sau 30 ngày, con đọc 4 cuốn liền tay.
```

**Body:**
```
{{contact.first_name}} ơi,

Có một bé trai trong cộng đồng phụ huynh Việt Anh — trước đây con nói thẳng với mẹ: "Con ghét đọc sách."

Mẹ con thử mọi cách. Mua sách đẹp. Mua truyện hay. Đọc cùng con. Đều không hiệu quả. Càng ép con càng kháng cự.

Năm ngoái mẹ con thử Reading Challenge 30 Ngày. Quy tắc đơn giản đến mức không ngờ:

- Mỗi ngày chỉ 1 trang truyện
- Tóm tắt bằng 3 câu
- Tìm 5 từ mới và đặt câu

Không ép đọc nhiều. Không ép đọc lâu. Chỉ đúng 15 phút.

Tuần đầu con vẫn càu nhàu. Tuần thứ hai con bắt đầu đọc xong 1 trang nhưng chưa muốn dừng. Đến tuần thứ tư, con đọc xong 1 cuốn truyện liền tay — không cần ai nhắc.

Sau 30 ngày, con đã đọc 4 cuốn.

Khi mẹ hỏi: "Sao trước đây con ghét đọc, giờ thích?" — con trả lời rất đơn giản: "Trước đây mẹ bắt con đọc nhiều, con sợ. Giờ chỉ cần 1 trang, con không sợ nữa."

Đây là điều mà tôi đã thiết kế cẩn thận trong tài liệu Reading Challenge 30 Ngày tôi gửi bạn — quy tắc nhỏ vừa đủ để đứa trẻ kháng cự nhất cũng không sợ.

Hãy thử bắt đầu cùng con từ tối nay — 1 trang thôi. Sau 1 tuần bạn sẽ thấy khác.

Ngày mai, tôi sẽ kể bạn câu chuyện cuối — về cách nói chuyện với con teen mà không tạo ra cuộc chiến mỗi tối.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

═══════════════════════════════════════════════
## 📧 TraiHe-3 (Day 3) — Insight: Đối thoại với teen + CTA
═══════════════════════════════════════════════

**Action Name:**
```
TraiHe - Day 3 - Doi Thoai Teen - CTA
```

**From Name:**
```
Nguyễn Mạnh Dương
```

**From Email:**
```
duong@reply.truongvietanh.com
```

**Subject:**
```
"Bố mẹ chẳng hiểu gì cả" — và phía sau câu nói đó
```

**Pre-Header:**
```
Mỗi câu nói của con teen đều có thể là cánh cửa đóng lại — hoặc một cách mở ra. Cách bạn phản ứng quyết định.
```

**Body:**
```
{{contact.first_name}} ơi,

Một phụ huynh có con lớp 8 từng nói với tôi: "Anh Dương ơi, mỗi tối em hỏi con 'hôm nay đi học thế nào' — con đáp 'bình thường'. Hỏi 'có gì vui không' — đáp 'không'. Em bất lực."

Tôi hỏi lại: "Khi con nói 'bố mẹ chẳng hiểu gì cả', anh chị thường phản ứng thế nào?"

Chị im lặng một lúc, rồi cười: "Em hay đáp 'mẹ không hiểu thì con giải thích cho mẹ hiểu chứ'."

Đó chính là vấn đề.

Câu trả lời đó nghe có vẻ hợp lý, nhưng với não bộ của một đứa teen, nó là một mệnh lệnh ngầm — "con phải làm việc giải thích cho mẹ". Trong khi điều con thật sự cần là một câu đơn giản: "Mẹ thấy có vẻ con đang khó chịu. Mẹ ngồi đây nếu con muốn nói."

Khác biệt rất nhỏ. Hệ quả rất lớn.

Đây là một trong những điều tôi viết kỹ trong tài liệu Phương Pháp Học Cho Teen mà tôi gửi bạn:

- Vì sao "ép học" càng ngày càng phản tác dụng ở tuổi này
- 3 cách giao tiếp giữ được cả ranh giới và sự gắn kết
- Cách giúp con tự đặt mục tiêu — thay vì cha mẹ đặt thay
- Khi nào nên buông, khi nào nên kéo lại

Nếu nhà bạn đang có con teen và mỗi tối là một cuộc chiến nho nhỏ — hãy mở tài liệu đó tối nay. Đặc biệt phần "3 cách giao tiếp" — thử ngay tối mai.

Cảm ơn bạn đã đọc 3 email của tôi.

Trại hè Việt Anh không chỉ là một khóa học hè. Đó là 2-4 tuần con được đặt vào môi trường mà ở đó việc học trở thành điều con tự muốn.

Hẹn gặp gia đình bạn trong ngày khai mạc trại.

Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh

📞 0916 961 409
```

---

# ✅ CHECKLIST TRƯỚC KHI BẬT WORKFLOW

- [ ] Tạo 5 folder Drive, mỗi folder upload 3 PDF tương ứng, set "Anyone with link · Viewer"
- [ ] Lấy 5 link folder, **search & replace** trong file:
  - `__LINK_BUNDLE_MN__` → link folder MN
  - `__LINK_BUNDLE_TH__` → link folder TH
  - `__LINK_BUNDLE_THCS__` → link folder THCS
  - `__LINK_BUNDLE_THPT__` → link folder THPT
  - `__LINK_BUNDLE_TRAIHE__` → link folder Trại hè
- [ ] Verify domain `reply.truongvietanh.com` đã setup SPF/DKIM trong GHL → Settings → Email Services
- [ ] Test với 1 contact (chính email anh Dương): tạo contact, gắn tag `mam-non-go-vap`, xem 3 email gửi đúng không
- [ ] Sau khi test OK → bật workflow ở chế độ "Publish"
