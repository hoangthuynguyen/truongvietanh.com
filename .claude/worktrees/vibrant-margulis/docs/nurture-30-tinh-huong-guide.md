# Nurture Series: 30 Tình Huống Dạy Con — 13 GHL Workflows

## Tổng quan
- **Chuỗi:** 88 emails, 435 ngày, 13 batches
- **Trigger:** Đăng ký nhận sách "30 tình huống dạy con"
- **Tác giả:** Nguyễn Mạnh Dương — Chủ tịch trường Việt Anh
- **Chaining:** Cuối mỗi batch → Add Tag `nurture-batch-{N+1}` → trigger batch kế tiếp

---

## SETTINGS CHO TẤT CẢ EMAILS

```
From Name:  Nguyễn Mạnh Dương
From Email: duong@news.truongvietanh.com
Reply-To:   duong@news.truongvietanh.com
```

**Signature (dán cuối mỗi email, trước footer):**
```
Vì những đứa con yêu thương
Từ bình thường trở nên phi thường
Nguyễn Mạnh Dương
Chủ tịch trường Việt Anh
```

**Footer (dán cuối cùng):**
```
---
Trường Liên cấp Việt Anh
269A Nguyễn Trọng Tuyển, P. Phú Nhuận, TP.HCM
Email này được gửi vì bạn đã đăng ký nhận sách trên website.
Hủy đăng ký: {{unsubscribe_url}}
```

---

## HƯỚNG DẪN TẠO MỖI WORKFLOW

1. Vào GHL > Automation > Workflows > **+ Create Workflow** > **Start from Scratch**
2. Click tên workflow ở header > Đổi tên (vd: `N1 - Tặng quà 30 Tình Huống`)
3. Click **Add New Trigger** > Chọn **Contact Tag**
4. Filters > Tag = `[tag trong hướng dẫn]` > Action: **Is Added** > Save
5. Add actions theo thứ tự: **Send Email** > **Wait** > **Send Email** > **Wait** > ...
6. Action cuối cùng: **Add Tag** > `nurture-batch-{N+1}` (hoặc `nurture-completed` cho batch 13)
7. **Publish**

**Mỗi Send Email action:**
- From Name: `Nguyễn Mạnh Dương`
- From Email: `duong@news.truongvietanh.com`
- Subject: copy từ hướng dẫn bên dưới
- Body: copy toàn bộ nội dung bên dưới + signature + footer

---

# ====================================================
# N1: BATCH 1 — TẶNG QUÀ (Ngày 0-1, 2 emails)
# ====================================================

**Workflow Name:** `N1 - Tặng quà 30 Tình Huống`
**Trigger Tag:** `nurture-30-tinh-huong` (Is Added)
**Chaining:** Cuối → Wait 2 ngày → Add Tag `nurture-batch-2`

**GHL AI Prompt (paste vào ô AI builder):**
> Khi contact có tag nurture-30-tinh-huong: gửi email ngay subject "Sách của bạn đây" từ duong@news.truongvietanh.com, đợi 1 ngày gửi email 2 subject "RE: Sách của bạn đây", đợi 2 ngày thêm tag nurture-batch-2

---

### ACTION 1: Send Email
**Subject:** Sách của bạn đây

**Body:**
```
Chào {{contact.first_name}}

Tôi Dương đây,

Cảm ơn bạn đã đăng ký nhận sách từ tôi

Đây là một quyển sách tuyệt vời làm thay đổi cách giáo dục của cha mẹ, giúp con cái chúng ta lớn lên với một tư duy hoàn toàn khác

Quyển sách 30 tình huống dạy con gồm những tình huống thực tế mà bạn liên tục gặp trong cuộc sống, và cách mà tôi đã áp dụng để dạy nên những đứa trẻ tuyệt vời, của tôi và của nhiều ngàn bậc cha mẹ khác

Nhấp vào đây và chọn nút save (lưu): https://drive.google.com/file/d/1cKFeTFNiPbNwc84TWL7FH0BSoM9Tjg9k/view?usp=sharing

Chỉ cần nhìn qua mục lục, bạn cũng có thể thấy cuộc sống của mình trong đó

Hãy đọc nhé, và chúng ta sẽ tiếp tục trao đổi về nó

À quên, để bạn không bỏ lỡ những nội dung rất hay mà tôi sẽ gửi cho bạn, hãy giúp tôi tránh bị lẫn vào mục thư rác (spam) bằng cách cập nhật email của tôi vào danh bạ của bạn: duong@news.truongvietanh.com

Tôi sẽ gặp lại bạn sau
```

---

### ACTION 2: Wait — 1 ngày

---

### ACTION 3: Send Email
**Subject:** RE: Sách của bạn đây

**Body:**
```
Chào {{contact.first_name}}

Lại là Dương đây,

Hôm qua, nhận được yêu cầu của bạn, tôi đã vội gửi link sách, sao bạn chưa download?

Nên nhớ, quyển sách này kết hợp những nghiên cứu lớn về tâm lý trẻ em trên thế giới với những điều hệ thống trường Mầm non của tôi đã áp dụng thành công, bạn sẽ không tìm đâu ra một tài liệu thực tế hơn thế

Hãy click vào đây để download sách về, để đảm bảo bạn có nó trong tay, có thể đọc nó bất kỳ lúc nào rảnh rỗi: https://drive.google.com/file/d/1cKFeTFNiPbNwc84TWL7FH0BSoM9Tjg9k/view

Nếu bạn chưa có thư mục rõ ràng, hãy tạo riêng thư mục dễ nhớ, đặt tên là "Sách" hoặc "Books", lưu nó vào đó cho dễ tìm kiếm

P/s: quyển sách này mang theo hạnh phúc của con, nhưng chỉ chiếm dung lượng không đáng kể, bạn có thể lưu nó vào cả điện thoại và máy tính để đọc nó ngay cả khi bạn không có wifi
```

---

### ACTION 4: Wait — 2 ngày

### ACTION 5: Add Tag — `nurture-batch-2`

---

# ====================================================
# N2: BATCH 2 — NUÔI DƯỠNG GỐC (Ngày 3-39, 10 emails)
# ====================================================

**Workflow Name:** `N2 - Nuôi dưỡng gốc`
**Trigger Tag:** `nurture-batch-2` (Is Added)
**Chaining:** Cuối → Wait 3 ngày → Add Tag `nurture-batch-3`

**GHL AI Prompt:**
> Khi contact có tag nurture-batch-2: gửi email subject "Hôm nay là một ngày mệt mỏi", đợi 1 ngày gửi "Tin rất vui của tôi", đợi 4 ngày gửi "Cách dạy trẻ tự đi vệ sinh", đợi 3 ngày gửi "Nếu không học Mầm non, con có thể vào lớp 1 không?", đợi 3 ngày gửi "RE: Nếu không học Mầm non, con có thể vào lớp 1 không?", đợi 11 ngày gửi "Tôi phải lòng 1 cô gái chưa từng biết mặt", đợi 2 ngày gửi "RE: Tôi phải lòng 1 cô gái chưa từng biết mặt", đợi 4 ngày gửi "Con đang phải dần quen với điều gì", đợi 2 ngày gửi "RE: Con đang phải dần quen với điều gì", đợi 6 ngày gửi "Những hoạt động gia đình đầy niềm vui", đợi 3 ngày thêm tag nurture-batch-3. Tất cả từ duong@news.truongvietanh.com

---

### ACTION 1: Send Email
**Subject:** Hôm nay là một ngày mệt mỏi

**Body:**
```
{{contact.first_name}} ơi

Ngày hôm nay tôi cảm thấy rất mệt mỏi, để đảm bảo kịp họp với đội ngũ của mình ở trường Quốc Tế Mekong Xanh, Rạch Giá lúc 08:30AM mà vẫn có thể dành trọn vẹn tối buổi tối với các con, tôi đã lựa chọn lái xe rời nhà từ TP HCM lúc 03:30 sáng

Tôi lên giường ngủ từ 21:00, cùng lúc với các con, những trằn trọc mãi, rồi giật mình thức dậy lúc 03:00AM

Lái xe xuyên đêm hoá ra rất thú vị, một mình, tôi tận hưởng cảm giác bá chủ không gian trong xe, và tận hưởng những quyển sách nói một cách trọn vẹn

Chỉ dừng lại 30 phút để ăn sáng, tôi đến nơi lúc 08:10, vừa kịp vào họp

Vì đã 2 tuần tôi mới trở lại, nên công việc ngày đầu tiên của tôi ở Rạch Giá liên tiếp từ sáng đến tận 20:00. Đành phải bỏ qua kế hoạch chạy bộ, tôi về khách sạn video call cho các con, và nhận được tin rất vui từ mẹ tôi

Nhưng thôi, đêm đã khuya, tôi phải tranh thủ đi ngủ đây, ngày mai tôi sẽ viết thư kể cho {{contact.first_name}} đầy đủ về tin vui này nhé
```

---

### ACTION 2: Wait — 1 ngày

---

### ACTION 3: Send Email
**Subject:** Tin rất vui của tôi

**Body:**
```
{{contact.first_name}} ơi

Như đã hứa, tôi phải viết thư này để kể cho bạn nghe tin vui của mình

Một điều rất đơn giản, nhưng đem lại nhiều niềm vui cho một người bố có 3 đứa con. Đó là đứa con trai 2 tuổi của tôi đã có ngày đầu tiên biết tự đi vệ sinh

Tại sao đây là tin rất vui, vì đối với trẻ em, đây là một cột mốc lớn, đánh dấu hành động tự lập đầu tiên, và cũng là bước chuyển để phát triển sự tự tin của trẻ

Thú thật là, điều này không diễn ra một cách tự nhiên, mà có sự nỗ lực của tôi từng bước một. Với sự giúp đỡ của cha mẹ, trẻ có thể được giúp đỡ để nhanh chóng hình thành khả năng tự đi vệ sinh hơn, cũng giống như học được một điều mới lạ trong thế giới của mình

Cách dạy con đi vệ sinh cũng tương đối đơn giản, dựa trên nguyên lý giáo dục của trường Việt Anh đã được áp dụng thành công cho vô số bé Mầm non

Nếu bạn cũng muốn biết cách thức đơn giản này, hãy cho tôi biết, tôi sẽ hướng dẫn thật chi tiết để bạn có thể giúp con tự đi vệ sinh một cách nhẹ nhàng và nhanh chóng
```

---

### ACTION 4: Wait — 4 ngày

---

### ACTION 5: Send Email
**Subject:** Cách dạy trẻ tự đi vệ sinh

**Body:**
```
Hi {{contact.first_name}}

Xin lỗi đã để bạn chờ lâu,

Tôi vừa trải qua một chuyến lái xe dài từ Rạch Giá về lại TP HCM, vì vậy, tôi không thể tách rời những đứa con của mình mỗi khi chúng tan học

Nhưng tôi vẫn nhớ đến lời hẹn của chúng ta, và đây là cách mà bạn có thể dạy con, cháu của mình, hoặc bất kỳ đứa trẻ nào biết cách tự đi vệ sinh lần đầu

Đầu tiên, chúng ta không nên ép buộc trẻ, mà phải nương theo sự phát triển của trẻ để xác định tốt thời điểm nên bắt đầu. Trẻ thường có thể sẵn sàng vào khoảng từ 18-30 tháng tuổi, khi có những dấu hiệu sau:

- Biết báo khi quần ướt hoặc bẩn
- Khoảng cách giữa các lần "đi" khoảng 2 giờ

Khi thời điểm đến, ta dạy như sau:

Bước 1: Làm quen - Plan
- Cho bé ngồi thử bô/ghế toilet nhỏ như một trò chơi.
- Kể chuyện/đọc sách tranh về bạn nhỏ đi vệ sinh.
- Cho bé "lập kế hoạch": "Con muốn thử ngồi bô trước hay sau khi tắm?".

Bước 2: Thực hành – Do
- Đặt bé lên bô vào những thời điểm dễ thành công (khi ngủ dậy, sau bữa ăn).
- Cho bé tự cởi quần (nếu chưa thì phụ giúp nhưng khuyến khích bé làm cùng).
- Khen ngợi ngay khi bé thử, dù có "ra" hay không.

Bước 3: Suy ngẫm – Review
- Sau khi xong, cùng bé xả nước, rửa tay, rồi hỏi: "Con thấy thế nào khi ngồi bô?"
- Cho bé "check" vào bảng theo dõi (giống như chơi trò tích điểm)

Công cụ hỗ trợ: Ghế bô an toàn, quần dây chun, bảng sticker mặt cười

Lưu ý: Không la mắng khi "tai nạn" xảy ra, tạo gắn bó tích cực bằng nghi thức vui vẻ

Đừng chần nữa, hãy thử áp dụng nhé, bất cứ điều gì ta biết mà không làm, ta sẽ nhanh chóng mất đi
```

---

### ACTION 6: Wait — 3 ngày

---

### ACTION 7: Send Email
**Subject:** Nếu không học Mầm non, con có thể vào lớp 1 không?

**Body:**
```
Chào {{contact.first_name}},

Mấy hôm nay tôi được nhiều người hỏi "Nếu không học mẫu giáo, con có thể vào lớp 1 không?"

Theo quy định của Bộ GD&ĐT Việt Nam, trẻ em không bắt buộc phải học mầm non mới được vào lớp 1. Điều kiện vào lớp 1 là trẻ đủ 6 tuổi (tính đến ngày 31/8 của năm vào học).

Tuy nhiên, học mầm non mang lại rất nhiều lợi ích cho sự phát triển của con, đặc biệt là kỹ năng xã hội và cảm xúc.

Trong thực tế, nhiều trường tiểu học khuyến khích (thậm chí "ngầm" yêu cầu) ưu tiên nhận các bé đã học mầm non, vì chương trình lớp 1 được thiết kế trên nền tảng những kỹ năng đó.
```

---

### ACTION 8: Wait — 3 ngày

---

### ACTION 9: Send Email
**Subject:** RE: Nếu không học Mầm non, con có thể vào lớp 1 không?

**Body:**
```
Chào {{contact.first_name}}

Mặc dù câu trả lời là "Có thể", nhưng trẻ có thể gặp nhiều bất lợi. Vì vậy, tôi gửi ngay "Những chuẩn bị cho lớp 1 mà cha mẹ có thể làm tại nhà":

Chuẩn bị tâm lý: Kể chuyện về trường học, tạo lối sống nề nếp đúng giờ

Chuẩn bị kỹ năng: Tự chăm sóc bản thân (ăn, ngủ, vệ sinh, dọn ba lô), tập trung 15-25 phút, vận động tinh

Chuẩn bị ngôn ngữ: Diễn đạt mong muốn rõ ràng, chào hỏi, nói chuyện với người lạ

Hoặc tốt nhất, tìm cách cho bé trải qua 1 khóa tiền tiểu học — nơi các bé yêu thích việc học, biết kỹ năng nhập môn, và giao tiếp cả tiếng Việt lẫn tiếng Anh.

Đọc thêm tại đây nếu bạn có con chuẩn bị vào tiểu học: https://tientieuhoc.tubinhthuongtronenphithuong.com/
```

---

### ACTION 10: Wait — 11 ngày

---

### ACTION 11: Send Email
**Subject:** Tôi phải lòng 1 cô gái chưa từng biết mặt

**Body:**
```
{{contact.first_name}} ơi,

Hôm nay là một ngày may mắn của tôi — tôi vừa nhặt được 80 triệu.

Nói cho đúng hơn, tôi tránh khỏi việc mất 80 triệu vì sự bất cẩn của mình.

Tôi có một giao dịch lớn qua thẻ tín dụng, và vì không để ý, tôi đã rút tiền mặt từ thẻ tín dụng thay vì chuyển khoản thông thường. Phí rút tiền mặt từ tín dụng là 3% — tức gần 2.4 triệu.

Khi tôi gọi lên ngân hàng, một nhân viên trẻ — tôi chưa từng biết mặt — đã hướng dẫn tôi từng bước một cách hủy giao dịch đó và thực hiện lại bằng cách chuyển khoản, tránh hoàn toàn khoản phí.

Cô ấy không cần làm vậy. Cô ấy chỉ cần trả lời câu hỏi của tôi là xong. Nhưng cô ấy chọn đi xa hơn.

Tôi lập tức phải ngồi viết lại khoảnh khắc này. Đây đúng là chất lượng dịch vụ "Vượt ngoài mong đợi" mà ta vẫn đọc trong sách.

Thế là tôi cũng bắt tay triển khai ngay một dịch vụ MIỄN PHÍ cho khách hàng — chương trình khảo sát Tư Duy Toán Học. Nếu bạn muốn biết chương trình này là gì, hãy đợi email sau của tôi nhé
```

---

### ACTION 12: Wait — 2 ngày

---

### ACTION 13: Send Email
**Subject:** RE: Tôi phải lòng 1 cô gái chưa từng biết mặt

**Body:**
```
Chào {{contact.first_name}}

Như đã hứa, tôi muốn giới thiệu với bạn chương trình Khảo sát Tư duy Toán học SAM Singapore — một chương trình phát hiện lỗ hổng tư duy Toán trong 20 phút, kèm tài liệu luyện tập tại nhà.

Chương trình này được thiết kế bởi Singapore Approach to Mathematics (SAM), một trong những phương pháp dạy Toán hiệu quả nhất thế giới, hiện đang được áp dụng tại Trường Việt Anh.

Giá trị chương trình là 1.000.000đ, nhưng tôi quyết định tặng miễn phí cho học sinh từ 4–12 tuổi.

Hãy gọi vào hotline số 0916961409 để giữ chỗ
```

---

### ACTION 14: Wait — 4 ngày

---

### ACTION 15: Send Email
**Subject:** Con đang phải dần quen với điều gì

**Body:**
```
Chào {{contact.first_name}}

Không phải đứa trẻ nào cũng thiếu thốn vật chất, nhưng rất nhiều đứa trẻ đang thiếu thốn thời gian bên cha mẹ — những bữa cơm mà cha mẹ vừa ăn vừa nhìn điện thoại, những buổi tối con muốn kể chuyện nhưng người lớn quá mệt...

Điều đáng buồn nhất không phải là con trách cha mẹ. Mà là con dần quen với việc không cần cha mẹ ở bên.

Trong email tiếp theo, tôi sẽ chia sẻ điều gì xảy ra khi trẻ có đủ thời gian gần gũi cha mẹ.
```

---

### ACTION 16: Wait — 2 ngày

---

### ACTION 17: Send Email
**Subject:** RE: Con đang phải dần quen với điều gì

**Body:**
```
{{contact.first_name}} mến,

Những đứa trẻ thường xuyên có thời gian chất lượng bên cha mẹ tự tin hơn, kiểm soát cảm xúc tốt hơn, và dễ hình thành giá trị tích cực hơn. Không phải vì cha mẹ dạy bài học to tát — mà vì con học từ cách cha mẹ lắng nghe và phản hồi mỗi ngày.

Chỉ cần 15–30 phút/ngày, không điện thoại, không công việc — đó đã là "mảnh đất" màu mỡ cho nhân cách con lớn lên.

Trong các email tiếp theo, tôi sẽ chia sẻ chi tiết các hoạt động đơn giản và hiệu quả mà mọi gia đình có thể áp dụng ngay.
```

---

### ACTION 18: Wait — 6 ngày

---

### ACTION 19: Send Email
**Subject:** Những hoạt động gia đình đầy niềm vui

**Body:**
```
Chào {{contact.first_name}}

Như đã hứa, tôi sẽ gửi cho bạn 3 hoạt động vui vẻ, nhẹ nhàng, đã được thiết kế sẵn từ bộ Home Education Cards của Trường Việt Anh.

Hoạt Động 1 — Làm việc nhà (Trách nhiệm)
Mục tiêu: Tất cả thành viên cùng đóng góp vào công việc gia đình.
Cách làm: Cả nhà liệt kê việc nhà, mỗi người chọn 1 việc, thiết lập thời gian & tiêu chuẩn, cùng ký tên vào tờ "Trách nhiệm gia đình".

Hoạt Động 2 — Vòng tròn Lắng nghe (Tôn trọng và tự trọng)
Mục tiêu: Rèn kỹ năng lắng nghe sâu, không phán xét.
Cách làm: Mỗi người tuyên bố 1-2 mục tiêu SMART, các thành viên đặt 3 câu hỏi, viết lên giấy dán tường.

Hoạt Động 3 — Hũ yêu thương (Yêu thương)
Mục tiêu: Thực hành thể hiện lòng biết ơn và tình yêu thương hàng ngày.
Cách làm: Đặt hũ ở nơi dễ thấy, viết lời biết ơn bỏ vào, cuối tuần cùng đọc to.

Hãy áp dụng và mang lại những khoảnh khắc yêu thương nhé
```

---

### ACTION 20: Wait — 3 ngày

### ACTION 21: Add Tag — `nurture-batch-3`

---

# ====================================================
# N3: BATCH 3 (Ngày 42-68, 8 emails)
# ====================================================

**Workflow Name:** `N3 - Bút chì gãy & Nói dối`
**Trigger Tag:** `nurture-batch-3` (Is Added)
**Chaining:** Cuối → Wait 5 ngày → Add Tag `nurture-batch-4`

**GHL AI Prompt:**
> Khi contact có tag nurture-batch-3: gửi email subject "Đứa trẻ ngồi im suốt cả buổi sáng", đợi 2 ngày gửi "RE: Điều xảy ra sau cái bút chì gãy", đợi 5 ngày gửi "Con tôi hay nói dối — vấn đề thật sự là gì?", đợi 3 ngày gửi "RE: Con tôi hay nói dối — đây là 3 bước cụ thể", đợi 5 ngày gửi "3 hoạt động gia đình: Mục tiêu, Lời hứa, Kỹ năng mới", đợi 4 ngày gửi "Con gái hỏi tôi một câu khiến tôi phải suy nghĩ rất lâu", đợi 3 ngày gửi "RE: Thí nghiệm tiền bạc với con gái", đợi 4 ngày gửi "4 hoạt động gia đình: Dũng cảm, Tiền bạc, Ước mơ, Lời khen", đợi 5 ngày thêm tag nurture-batch-4. Tất cả từ duong@news.truongvietanh.com

**Thứ tự actions:**

| # | Action | Subject / Chi tiết |
|---|--------|-------------------|
| 1 | Send Email | **Đứa trẻ ngồi im suốt cả buổi sáng** — Câu chuyện cậu bé 6 tuổi ôm bút chì gãy, ngồi im cả buổi sáng vì sợ phản ứng của người lớn. |
| 2 | Wait | 2 ngày |
| 3 | Send Email | **RE: Điều xảy ra sau cái bút chì gãy** — Họp đội ngũ giáo viên: "Chúng ta đã tạo ra môi trường mà trẻ cảm thấy an toàn khi mắc lỗi chưa?" Con sợ phản ứng, không sợ cái bút. |
| 4 | Wait | 5 ngày |
| 5 | Send Email | **Con tôi hay nói dối — vấn đề thật sự là gì?** — Trẻ nói dối vì sợ, không vì thích nói dối. Vấn đề về độ an toàn trong gia đình. |
| 6 | Wait | 3 ngày |
| 7 | Send Email | **RE: Con tôi hay nói dối — đây là 3 bước cụ thể** — (1) Cha mẹ tự nhận lỗi trước mặt con, (2) Kiểm soát phản ứng đầu tiên, (3) Tạo "khoảnh khắc an toàn" cố định mỗi tối. |
| 8 | Wait | 5 ngày |
| 9 | Send Email | **3 hoạt động gia đình: Mục tiêu, Lời hứa, Kỹ năng mới** — Mục tiêu tuần SMART, Lời hứa Vàng với sticker, Thử thách kỹ năng mới mỗi tháng. |
| 10 | Wait | 4 ngày |
| 11 | Send Email | **Con gái hỏi tôi một câu khiến tôi phải suy nghĩ rất lâu** — Con hỏi "tại sao nhà bạn A có nhiều đồ chơi còn nhà bạn B thì không?" → tư duy về tiền bạc. |
| 12 | Wait | 3 ngày |
| 13 | Send Email | **RE: Thí nghiệm tiền bạc với con gái** — 3 chiếc lọ: Chi tiêu – Tiết kiệm – Chia sẻ. Con tự chia tiền, tự quyết định, tự học từ hậu quả. |
| 14 | Wait | 4 ngày |
| 15 | Send Email | **4 hoạt động gia đình: Dũng cảm, Tiền bạc, Ước mơ, Lời khen** — Góc Dũng cảm, Quản lý Chi tiêu 3 lọ, Bảng Ước mơ, Chiếc hộp Lời khen cụ thể. |
| 16 | Wait | 5 ngày |
| 17 | Add Tag | `nurture-batch-4` |

---

# ====================================================
# N4-N13: BATCH 4 đến 13
# ====================================================

**Pattern giống N3:** Mỗi batch có bảng actions tương tự.
Dưới đây là bảng tóm tắt cho từng batch — nội dung email đầy đủ lấy từ tài liệu gốc của anh Dương (đã cung cấp trong cuộc trò chuyện).

---

## N4: Batch 4 (Ngày 73-101)
**Workflow Name:** `N4 - Con 2 tuổi & Điện thoại`
**Trigger:** `nurture-batch-4` → Chain: `nurture-batch-5`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Đứa con 2 tuổi dạy tôi một bài học về giáo dục |
| 2 | Wait 3d | |
| 3 | Email | RE: Con không học từ những gì bạn dạy |
| 4 | Wait 5d | |
| 5 | Email | Con nghiện điện thoại — vấn đề thật sự không phải là chiếc điện thoại |
| 6 | Wait 3d | |
| 7 | Email | RE: Con nghiện điện thoại — đây là 3 bước thực dụng |
| 8 | Wait 5d | |
| 9 | Email | 3 hoạt động: Thiện nguyện, Không công nghệ, Hoàn thành trọn vẹn |
| 10 | Wait 4d | |
| 11 | Email | Người khiến con tôi thích đến trường không phải là giáo viên |
| 12 | Wait 3d | |
| 13 | Email | RE: Điều tôi học được từ chú bảo vệ |
| 14 | Wait 5d | |
| 15 | Email | 3 hoạt động: Chơi đẹp, Nhà sáng chế, Đầu bếp yêu thương |
| 16 | Wait 5d | |
| 17 | Add Tag | `nurture-batch-5` |

---

## N5: Batch 5 (Ngày 106-135)
**Workflow Name:** `N5 - Chậu cây & Ranh giới`
**Trigger:** `nurture-batch-5` → Chain: `nurture-batch-6`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Cái chậu cây nhỏ mà con không bao giờ để héo |
| 2 | Wait 3d | |
| 3 | Email | RE: Cách giao trách nhiệm để con tự nguyện làm |
| 4 | Wait 5d | |
| 5 | Email | Khi con không chịu nghe — la mắng không phải lối ra |
| 6 | Wait 3d | |
| 7 | Email | RE: 3 bước đặt ranh giới mà không cần la mắng |
| 8 | Wait 5d | |
| 9 | Email | 3 hoạt động: Người Chăm sóc, Không gian Riêng tư, Thư viện Gia đình |
| 10 | Wait 4d | |
| 11 | Email | Buổi sáng tôi đứng đếm đến 8 |
| 12 | Wait 4d | |
| 13 | Email | RE: Lời xin lỗi 3 phần và nghệ thuật để con tự làm |
| 14 | Wait 5d | |
| 15 | Email | 3 hoạt động: Chiếc Ôm 8 Giây, Tôi có thể tự làm!, Ngân hàng Lời xin lỗi |
| 16 | Wait 5d | |
| 17 | Add Tag | `nurture-batch-6` |

---

## N6: Batch 6 (Ngày 140-170)
**Workflow Name:** `N6 - Đùi gà & Thất bại`
**Trigger:** `nurture-batch-6` → Chain: `nurture-batch-7`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Hai con trai tôi và chiếc đùi gà duy nhất |
| 2 | Wait 3d | |
| 3 | Email | RE: Điều tôi học được từ chiếc đùi gà |
| 4 | Wait 5d | |
| 5 | Email | Lần tôi thất bại trước mặt các con |
| 6 | Wait 4d | |
| 7 | Email | RE: Điều xảy ra sau khi tôi kể cho con nghe về thất bại |
| 8 | Wait 5d | |
| 9 | Email | 3 hoạt động: Không phàn nàn, Thám tử Giải quyết, Kể chuyện về nhau |
| 10 | Wait 4d | |
| 11 | Email | Đứa con hay cằn nhằn dạy tôi điều này |
| 12 | Wait 4d | |
| 13 | Email | RE: Phía sau lời phàn nàn và cách phản ứng thật sự có ích |
| 14 | Wait 5d | |
| 15 | Email | 3 hoạt động: Quy tắc cho mượn đồ, Gương phản chiếu, Lòng tốt Bất ngờ |
| 16 | Wait 5d | |
| 17 | Add Tag | `nurture-batch-7` |

---

## N7: Batch 7 (Ngày 175-208)
**Workflow Name:** `N7 - Đúng giờ & Kiếm tiền`
**Trigger:** `nurture-batch-7` → Chain: `nurture-batch-8`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Buổi sáng tôi quyết định không đợi con nữa |
| 2 | Wait 3d | |
| 3 | Email | RE: Đúng giờ không phải về kỷ luật |
| 4 | Wait 5d | |
| 5 | Email | Đứa con đứng một mình ở góc sân trường |
| 6 | Wait 4d | |
| 7 | Email | RE: Điều tôi tập với con để con bắt đầu được một tình bạn |
| 8 | Wait 6d | |
| 9 | Email | 3 hoạt động: Đúng giờ là Vàng, Đội Tuần tra Xanh, Nhật ký Sức khỏe |
| 10 | Wait 4d | |
| 11 | Email | Lần đầu con tôi kiếm được tiền |
| 12 | Wait 5d | |
| 13 | Email | RE: Câu con nói sau khi kiếm được 200 nghìn đầu tiên |
| 14 | Wait 6d | |
| 15 | Email | 3 hoạt động: Bản đồ Thế giới, Tuyên ngôn Sức mạnh, Người Hùng Thầm lặng |
| 16 | Wait 5d | |
| 17 | Add Tag | `nurture-batch-8` |

---

## N8: Batch 8 (Ngày 213-245)
**Workflow Name:** `N8 - THPT & Kén ăn`
**Trigger:** `nurture-batch-8` → Chain: `nurture-batch-9`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | 15 năm đứng lớp dạy tôi điều này về cha mẹ của học trò |
| 2 | Wait 3d | |
| 3 | Email | RE: Con bạn tuổi THPT đang giữ điều gì không nói với bạn |
| 4 | Wait 6d | |
| 5 | Email | Cuộc chiến bữa tối và đứa con 4 tuổi kén ăn |
| 6 | Wait 4d | |
| 7 | Email | RE: Vì sao trẻ kén ăn và 3 nguyên tắc không tạo ra cuộc chiến |
| 8 | Wait 5d | |
| 9 | Email | 3 hoạt động: Đôi giày của người khác, Sân khấu Gia đình, Dự án Kiếm tiền |
| 10 | Wait 4d | |
| 11 | Email | Học trò cũ gặp tôi trong siêu thị |
| 12 | Wait 4d | |
| 13 | Email | RE: Điều cha mẹ nên và không nên nói khi con đang mùa thi |
| 14 | Wait 6d | |
| 15 | Email | 3 hoạt động: Hộp thư Tha thứ, Kho báu Kỷ niệm, Đêm Truyền thống Gia đình |
| 16 | Wait 5d | |
| 17 | Add Tag | `nurture-batch-9` |

---

## N9: Batch 9 (Ngày 250-282)
**Workflow Name:** `N9 - Nhật ký THCS & Học vì tò mò`
**Trigger:** `nurture-batch-9` → Chain: `nurture-batch-10`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Cuốn nhật ký con không muốn tôi đọc |
| 2 | Wait 3d | |
| 3 | Email | RE: Cách giữ kênh giao tiếp với con tuổi THCS không bị đóng sập |
| 4 | Wait 5d | |
| 5 | Email | Con không sợ điểm kém. Con sợ làm cô buồn. |
| 6 | Wait 3d | |
| 7 | Email | RE: Khi con học vì sợ và khi con học vì tò mò |
| 8 | Wait 6d | |
| 9 | Email | 3 hoạt động: Thời gian cho tôi, Điều quan trọng nhất, Một cây làm chẳng nên non |
| 10 | Wait 15d | |
| 11 | Email | 3 hoạt động: 30 phút trải nghiệm, Tôi chọn việc này, Sách |
| 12 | Wait 5d | |
| 13 | Add Tag | `nurture-batch-10` |

---

## N10: Batch 10 (Ngày 287-320)
**Workflow Name:** `N10 - Chọn ngành & Sợ bóng tối`
**Trigger:** `nurture-batch-10` → Chain: `nurture-batch-11`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Học sinh hỏi tôi một câu mà tôi không trả lời ngay |
| 2 | Wait 4d | |
| 3 | Email | RE: Câu hỏi cha mẹ nên hỏi thay vì "Con học ngành gì?" |
| 4 | Wait 5d | |
| 5 | Email | Hai con trai tôi và chiếc đèn ngủ không bao giờ tắt |
| 6 | Wait 3d | |
| 7 | Email | RE: Nghi thức ngủ ngắn giúp con mầm non tự tin tắt đèn |
| 8 | Wait 6d | |
| 9 | Email | 3 hoạt động: Đánh giá hành động, Không gian sáng tạo, Kế hoạch tài chính gia đình |
| 10 | Wait 15d | |
| 11 | Email | 3 hoạt động: Nếu bạn là tôi, Nếu chuyện đó xảy ra, Hũ cảm xúc |
| 12 | Wait 5d | |
| 13 | Add Tag | `nurture-batch-11` |

---

## N11: Batch 11 (Ngày 325-358)
**Workflow Name:** `N11 - Peer pressure & Burnout`
**Trigger:** `nurture-batch-11` → Chain: `nurture-batch-12`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Đứa học sinh giỏi bỗng dưng thay đổi |
| 2 | Wait 4d | |
| 3 | Email | RE: Cách giúp con THCS có bản sắc đủ mạnh để không bị "hòa tan" |
| 4 | Wait 5d | |
| 5 | Email | Có một giai đoạn tôi không muốn về nhà |
| 6 | Wait 3d | |
| 7 | Email | RE: Khi cha mẹ cần nghỉ ngơi — không phải tội lỗi mà là trách nhiệm |
| 8 | Wait 6d | |
| 9 | Email | 3 hoạt động: Ngôi tháp giấy, Điều con đang nói là..., Siêu anh hùng phản ứng |
| 10 | Wait 15d | |
| 11 | Email | 3 hoạt động: Chiếc hộp tài năng, Thử thách sáng tạo, Người kể chuyện |
| 12 | Wait 5d | |
| 13 | Add Tag | `nurture-batch-12` |

---

## N12: Batch 12 (Ngày 363-396)
**Workflow Name:** `N12 - Mạng xã hội & Điểm mạnh`
**Trigger:** `nurture-batch-12` → Chain: `nurture-batch-13`

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Con đăng ảnh lên rồi xóa đi trong 15 phút |
| 2 | Wait 4d | |
| 3 | Email | RE: Bộ lọc bên trong — thứ giúp con dùng mạng xã hội mà không bị dùng |
| 4 | Wait 5d | |
| 5 | Email | Tôi hỏi cả lớp "Con giỏi gì?" — và hầu hết không trả lời được |
| 6 | Wait 3d | |
| 7 | Email | RE: 3 câu hỏi giúp con khám phá điểm mạnh mà điểm số không đo được |
| 8 | Wait 6d | |
| 9 | Email | 3 hoạt động: Ngôi Sao Trách Nhiệm, Nút Tạm Dừng, Ngôn Ngữ Chủ Động |
| 10 | Wait 15d | |
| 11 | Email | 3 hoạt động: Vòng Tròn Ảnh Hưởng, Người Kiến Tạo Thời Tiết, Câu Chuyện Về Lựa Chọn |
| 12 | Wait 5d | |
| 13 | Add Tag | `nurture-batch-13` |

---

## N13: Batch 13 — FINAL (Ngày 401-435)
**Workflow Name:** `N13 - Đi học đầu tiên & Sứ mệnh gia đình`
**Trigger:** `nurture-batch-13` (Is Added)
**Kết thúc:** Add Tag `nurture-completed` (KHÔNG chain thêm)

| # | Action | Subject |
|---|--------|---------|
| 1 | Email | Sáng hôm đó tôi không muốn rời con |
| 2 | Wait 4d | |
| 3 | Email | RE: Cách chuẩn bị cho ngày đầu con đi học — cho cả con và cha mẹ |
| 4 | Wait 5d | |
| 5 | Email | Học sinh hỏi tôi chuyện mà thường chỉ kể với bạn thân |
| 6 | Wait 4d | |
| 7 | Email | RE: Khi con tuổi THCS bắt đầu có cảm xúc với bạn khác giới — cha mẹ nên làm gì? |
| 8 | Wait 6d | |
| 9 | Email | 3 hoạt động: Tuyên Ngôn Sứ Mệnh Gia Đình, Bản Đồ Kho Báu Tương Lai, Buổi Họp Gia Đình Hàng Tuần |
| 10 | Wait 15d | |
| 11 | Email | 3 hoạt động: Di Sản Gia Đình, Đo Lường Bằng La Bàn, Giải Quyết Xung Đột Cùng Thắng |
| 12 | — | END (không wait, không chain) |
| 13 | Add Tag | `nurture-completed` |

---

# TỔNG KẾT

| Batch | Workflow Name | Trigger Tag | Emails | Chain To |
|-------|--------------|-------------|--------|----------|
| N1 | Tặng quà 30 Tình Huống | `nurture-30-tinh-huong` | 2 | `nurture-batch-2` |
| N2 | Nuôi dưỡng gốc | `nurture-batch-2` | 10 | `nurture-batch-3` |
| N3 | Bút chì gãy & Nói dối | `nurture-batch-3` | 8 | `nurture-batch-4` |
| N4 | Con 2 tuổi & Điện thoại | `nurture-batch-4` | 8 | `nurture-batch-5` |
| N5 | Chậu cây & Ranh giới | `nurture-batch-5` | 8 | `nurture-batch-6` |
| N6 | Đùi gà & Thất bại | `nurture-batch-6` | 8 | `nurture-batch-7` |
| N7 | Đúng giờ & Kiếm tiền | `nurture-batch-7` | 8 | `nurture-batch-8` |
| N8 | THPT & Kén ăn | `nurture-batch-8` | 8 | `nurture-batch-9` |
| N9 | Nhật ký THCS & Học vì tò mò | `nurture-batch-9` | 6 | `nurture-batch-10` |
| N10 | Chọn ngành & Sợ bóng tối | `nurture-batch-10` | 6 | `nurture-batch-11` |
| N11 | Peer pressure & Burnout | `nurture-batch-11` | 6 | `nurture-batch-12` |
| N12 | Mạng xã hội & Điểm mạnh | `nurture-batch-12` | 6 | `nurture-batch-13` |
| N13 | Đi học & Sứ mệnh gia đình | `nurture-batch-13` | 6 | `nurture-completed` |
| **Tổng** | | | **90** | |

---

## LƯU Ý QUAN TRỌNG

1. **Nội dung email đầy đủ:** N1 và N2 có full body text ở trên. N3 có chi tiết tóm tắt mỗi email. N4-N13: nội dung email đầy đủ lấy từ tài liệu gốc của anh Dương (đã cung cấp). Copy-paste nguyên văn vào GHL email editor.

2. **Forever green:** Không nêu ngày tháng cụ thể. Dùng giai đoạn cuộc đời ("khi con gái tôi còn học tiểu học").

3. **Personalization:** Dùng `{{contact.first_name}}` trong mỗi email (GHL variable).

4. **Unsubscribe:** Footer có `{{unsubscribe_url}}` — GHL tự chèn link.

5. **Coexistence:** Subscriber có thể đồng thời ở GHL short workflows (WF1-9) và nurture này. Không conflict.

6. **Monitoring:** Theo dõi open rate batch 1 vs batch 13. Nếu open rate giảm dưới 15% ở batch nào, cân nhắc rút ngắn hoặc điều chỉnh nội dung.
