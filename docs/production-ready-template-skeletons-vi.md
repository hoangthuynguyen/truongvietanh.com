# PRODUCTION-READY CONTENT SKELETONS — 16 TEMPLATE CLASSES

## Trường Việt Anh | SEO + AIO + CRO + Brand Guidelines | 2026–2030

Tai liệu này là bản skeleton vận hành thực tế cho toàn bộ 16 template classes của `truongvietanh.com`.

Mục tiêu:

1. Giúp team content viết đúng cấu trúc ngay từ đầu
2. Giúp team SEO giữ đúng search intent và internal linking
3. Giúp team dev biết block nào là bắt buộc, block nào nên lazy-load
4. Giúp team growth giữ được conversion mà không làm rẻ thương hiệu
5. Giúp AI systems như ChatGPT Search, Perplexity, Google AI Overviews dễ đọc, dễ trích xuất

## Nguyên tắc chung cho mọi template

### 1. Một trang - một mục tiêu SEO chính

- Không bắt pillar page phải chốt sale như landing ads
- Không bắt landing page mỏng phải đi rank query broad informational
- Không gộp nhiều search intent chính vào cùng một template

### 2. Answer-first là bắt buộc cho mọi trang có ý định index

Mỗi trang index nên có:

- 1 đoạn trả lời ngắn 40-60 từ ngay đầu bài
- 1 H1 rõ nghĩa
- 3-6 H2 bám search intent thật
- 1 khối FAQ nếu chủ đề có People Also Ask / AI query tiềm năng

### 3. Dữ liệu quan trọng phải là HTML thật, không phải ảnh

Đặc biệt với:

- bảng học phí
- bảng so sánh
- timeline sự kiện
- lịch tuyển sinh
- danh sách quyền lợi / điều kiện

### 4. Ưu tiên nhẹ và nhanh

- Text-first layout
- Video / map / gallery chỉ lazy-load khi cần
- Không hydrate block nếu HTML/CSS native đã đủ
- Form và CTA phải render server-side khi có thể

### 5. Brand voice phải đúng lớp của từng template

- Homepage: truyền cảm hứng, rõ, ấm nhưng vững
- Pillar: giải thích, sâu, có chuyên môn
- Campus: gần gũi, cụ thể, bằng chứng thật
- Landing: ngắn, rõ giá trị, rõ hành động
- Parent Hub: hướng dẫn, không phán xét, có chiều sâu
- FAQ / Comparison / Objection: bình tĩnh, logic, minh bạch

---

# NHÓM 1 — PERFORMANCE / PAID-FIRST

## 1. Class A — Fee Capture Landing

### Vai trò

Trang chuyển đổi cho phụ huynh đang tìm học phí hoặc muốn nhận biểu phí chi tiết.

### Search intent chính

- Transactional
- Commercial investigation rất sát BOFU

### Index rule

- Có thể index nếu đủ nội dung và có dữ liệu học phí thật
- Không index nếu chỉ là paid variant quá mỏng hoặc quá giống các landing khác

### Schema gợi ý

- `WebPage`
- `FAQPage`
- `BreadcrumbList`
- `Offer` nếu có dữ liệu học phí đủ chuẩn

### Cấu trúc production-ready

1. Hero answer-first
2. Bảng học phí tóm tắt
3. Học phí đã bao gồm gì
4. Vì sao nhiều phụ huynh vẫn chọn Việt Anh
5. Form nhận biểu phí
6. FAQ ngắn
7. CTA cuối + hotline / Zalo

### Skeleton nội dung

#### H1

Nhận bảng học phí [Cấp học] Trường Việt Anh [Khu vực] 2026–2027

#### Đoạn answer-first 40-60 từ

Phụ huynh có thể nhận bảng học phí chi tiết của Trường Việt Anh trong vài phút, kèm thông tin về các khoản đã bao gồm, ưu đãi đang áp dụng và lộ trình tư vấn phù hợp theo cấp học hoặc cơ sở quan tâm.

#### H2 số 1: Học phí tóm tắt của [cấp học] tại Việt Anh

- Dùng bảng HTML thật
- Có cột: cấp học / cơ sở / mức từ / ghi chú

#### H2 số 2: Học phí đã bao gồm những gì

- Học tập
- Tiếng Anh
- Chăm sóc / bán trú nếu có
- Các khoản tách riêng nếu có

#### H2 số 3: Vì sao phụ huynh vẫn chọn Việt Anh khi cân nhắc học phí

- Môi trường học tập
- Đầu ra
- Trải nghiệm thật
- Sự thuận tiện theo cơ sở

#### H2 số 4: Nhận bảng học phí chi tiết và tư vấn phù hợp

- Form ngắn
- Kỳ vọng sau submit
- Thời gian phản hồi

#### H2 số 5: Câu hỏi thường gặp về học phí

- Học phí đóng theo tháng hay kỳ
- Có ưu đãi anh chị em không
- Có học bổng không
- Có thể đi School Tour trước không

### CTA chính

Nhận bảng học phí

### CTA phụ

- Nhắn Zalo tư vấn
- Đặt lịch tham quan

### Internal links bắt buộc

- `/hoc-phi`
- `/tuyen-sinh`
- campus page liên quan
- level pillar liên quan

### Proof assets bắt buộc

- review phụ huynh thật
- campus thật
- hotline thật
- policy / ưu đãi xác minh được

### Guardrails

- Không dùng ảnh chụp bảng học phí
- Không viết mơ hồ “liên hệ để biết giá”
- Không dùng urgency giả

---

## 2. Class B — Campus Tour / Local Admission Landing

### Vai trò

Trang đặt lịch tham quan cơ sở để tăng lead quality.

### Search intent chính

- Local commercial
- Near-me / local decision intent

### Index rule

- Nên index nếu nội dung đủ local proof
- Paid variants có thể noindex

### Schema gợi ý

- `LocalBusiness`
- `Place`
- `EducationalOrganization`
- `BreadcrumbList`

### Cấu trúc production-ready

1. Hero campus-specific
2. Quick facts: địa chỉ, hotline, giờ tham quan
3. Google Map / chỉ đường
4. Điểm nổi bật của cơ sở
5. Gallery thật
6. Booking block
7. Review phụ huynh theo campus
8. FAQ campus

### Skeleton nội dung

#### H1

Đặt lịch tham quan Trường Việt Anh [Tên cơ sở]

#### Đoạn answer-first 40-60 từ

Nếu gia đình đang tìm một cơ sở Việt Anh gần nhà để tham quan thực tế, trang này sẽ giúp phụ huynh xem nhanh địa chỉ, cấp học đang vận hành, điểm nổi bật của campus và cách đặt lịch tham quan phù hợp trong vài bước ngắn.

#### H2 số 1: Cơ sở [tên campus] nằm ở đâu

- địa chỉ chuẩn NAP
- mô tả đường đi
- khu vực xung quanh

#### H2 số 2: Cơ sở vật chất và không gian học tập thực tế

- lớp học
- sân chơi
- khu vận động
- camera / an toàn / bán trú nếu có

#### H2 số 3: Những cấp học đang vận hành tại cơ sở này

- Mầm non / Tiểu học / THCS / THPT tùy campus

#### H2 số 4: Vì sao phụ huynh thường đi School Tour trước khi quyết định

- cảm nhận thật
- gặp bộ phận tuyển sinh
- xem lớp học / môi trường / tuyến đưa đón nếu có

#### H2 số 5: Đặt lịch tham quan như thế nào

- form
- khung giờ
- xác nhận sau khi đăng ký

### CTA chính

Đặt lịch tham quan

### CTA phụ

- Xem đường đi
- Gọi campus

### Internal links bắt buộc

- campus profile
- admissions hub
- tuition page liên quan
- pillar page liên quan

### Guardrails

- Ảnh phải đúng campus
- Không mô tả campus kiểu copy-paste
- Map phải là embed thật hoặc link chỉ đường thật

---

## 3. Class C — Open Day / Event Landing

### Vai trò

Trang gom đăng ký sự kiện theo mùa hoặc theo đợt.

### Search intent chính

- Event
- transactional / branded seasonal

### Index rule

- Nên dùng evergreen URL
- Có thể index nếu event lặp lại theo mùa
- noindex nếu là bản campaign quá ngắn hạn

### Schema gợi ý

- `Event`
- `FAQPage`
- `BreadcrumbList`

### Cấu trúc production-ready

1. Hero event + countdown
2. Event summary box
3. Timeline
4. Hoạt động / diễn giả / trải nghiệm
5. Video / hình ảnh kỳ trước
6. Registration form
7. FAQ
8. CTA reminder

### Skeleton nội dung

#### H1

Open Day [Cấp học / Campus] Trường Việt Anh

#### Đoạn answer-first 40-60 từ

Open Day của Trường Việt Anh là dịp để phụ huynh trực tiếp tìm hiểu chương trình học, tham quan campus, gặp đội ngũ tuyển sinh và đặt câu hỏi cụ thể trước khi đưa ra quyết định phù hợp cho con.

#### H2 số 1: Sự kiện này dành cho ai

#### H2 số 2: Lịch trình trong ngày

#### H2 số 3: Phụ huynh và học sinh sẽ trải nghiệm những gì

#### H2 số 4: Vì sao nên tham gia Open Day trước khi quyết định

#### H2 số 5: Đăng ký tham dự

#### H2 số 6: Câu hỏi thường gặp về sự kiện

### CTA chính

Đăng ký tham dự

### CTA phụ

- Xem lịch chương trình
- Gọi tư vấn

### Guardrails

- Không dùng URL có năm nếu muốn tái sử dụng SEO equity
- Timeline phải là HTML thật
- Không đếm ngược mà thiếu lý do tham gia

---

## 4. Class D — Trial Class / Học Thử Landing

### Vai trò

Trang xử lý rào cản “con có hợp môi trường này không”.

### Search intent chính

- BOFU / objection-handling
- transactional

### Index rule

- Có thể index nếu nội dung đủ dày và giải quyết rõ pain point
- Retargeting-only variants có thể noindex

### Schema gợi ý

- `WebPage`
- `FAQPage`
- `BreadcrumbList`

### Cấu trúc production-ready

1. Pain-point hero
2. Câu trả lời trực diện
3. Video / hình ảnh lớp học thật
4. Một buổi học thử sẽ diễn ra thế nào
5. Testimonial phụ huynh
6. Form đăng ký
7. FAQ logistics

### Skeleton nội dung

#### H1

Đăng ký học thử tại Trường Việt Anh

#### Đoạn answer-first 40-60 từ

Học thử là cách giúp phụ huynh và học sinh trải nghiệm môi trường Việt Anh trước khi quyết định, đặc biệt hữu ích khi gia đình đang băn khoăn về sự hòa nhập, nhịp học, tiếng Anh hoặc mức độ phù hợp của campus.

#### H2 số 1: Vì sao nhiều phụ huynh chọn học thử trước khi quyết định

#### H2 số 2: Một buổi học thử tại Việt Anh diễn ra như thế nào

#### H2 số 3: Học thử giúp giải tỏa những lo lắng nào

#### H2 số 4: Phụ huynh cần chuẩn bị gì trước buổi học thử

#### H2 số 5: Đăng ký học thử

#### H2 số 6: FAQ về học thử

### CTA chính

Đăng ký học thử

### CTA phụ

- Nhắn Zalo tư vấn
- Xem campus phù hợp

---

## 5. Class F — TikTok / Reels Mobile-First UGC Landing

### Vai trò

Trang mobile-first cho traffic video ngắn.

### Search intent chính

- không phải SEO-first
- social conversion-first

### Index rule

- Thường noindex

### Schema gợi ý

- `WebPage` nếu cần

### Cấu trúc production-ready

1. Hero video dọc
2. Hook text 1-2 dòng
3. CTA nổi
4. Mini proof
5. Gallery ngắn
6. Call / Zalo sticky

### Skeleton nội dung

#### H1

Một ngày của học sinh tại Trường Việt Anh

#### Hook

Môi trường học gần gũi, rõ chương trình, dễ bắt đầu từ một tin nhắn Zalo hoặc một cuộc gọi ngắn.

### CTA chính

Nhắn Zalo ngay

### CTA phụ

Gọi hotline

### Guardrails

- Trang này không nên cố gắng làm quá nhiều SEO
- Ưu tiên tải nhanh và thao tác một chạm

---

# NHÓM 2 — CORE SEO / AUTHORITY

## 6. Class Level Pillar

### Vai trò

Trang pillar cấp học, là trục HubSpot topic cluster của site.

### Search intent chính

- Broad informational
- category-level authority

### Index rule

- Bắt buộc index

### Schema gợi ý

- `WebPage`
- `ItemList`
- `FAQPage`
- `BreadcrumbList`
- `EducationalOrganization`

### Cấu trúc production-ready

1. Hero triết lý cấp học
2. Answer-first summary
3. TOC
4. Chương trình học
5. Môi trường / đội ngũ / phương pháp
6. Outcomes / đầu ra
7. PDR / điểm khác biệt
8. Campus có vận hành cấp học này
9. Học phí / tuyển sinh / học thử
10. FAQ
11. Internal link hub

### Skeleton nội dung

#### H1

[Mầm non / Tiểu học / THCS / THPT] Trường Việt Anh

#### Đoạn answer-first 40-60 từ

Trang này giúp phụ huynh hiểu rõ [cấp học] tại Trường Việt Anh gồm chương trình gì, cách học ra sao, điểm khác biệt nào phù hợp với con và những bước tiếp theo nếu gia đình muốn tìm hiểu sâu hơn về học phí, tuyển sinh hoặc campus phù hợp.

#### H2 số 1: [Cấp học] tại Trường Việt Anh phù hợp với ai

#### H2 số 2: Chương trình học và phương pháp giáo dục

#### H2 số 3: Học sinh phát triển những gì ở giai đoạn này

#### H2 số 4: Vai trò của tiếng Anh / PDR / kỹ năng thế kỷ 21

#### H2 số 5: Đội ngũ giáo viên và môi trường học tập

#### H2 số 6: Các campus đang triển khai [cấp học]

#### H2 số 7: Học phí, tuyển sinh và các bước tiếp theo

#### H2 số 8: Câu hỏi thường gặp về [cấp học]

### CTA chính

Xem cơ sở phù hợp

### CTA phụ

- Nhận tư vấn
- Xem học phí

### Internal links bắt buộc

- cluster articles
- campus pages
- tuition pages
- admissions pages
- FAQ pages

### Guardrails

- Không biến thành landing ads
- Không chỉ kể chương trình mà thiếu outcomes
- Không thiếu TOC nếu bài dài

---

## 7. Class Master Campus Profile

### Vai trò

Trang authority + local trust cho từng campus.

### Search intent chính

- local navigational
- local commercial

### Index rule

- Bắt buộc index

### Schema gợi ý

- `LocalBusiness`
- `EducationalOrganization`
- `Place`
- `Review`
- `AggregateRating`

### Skeleton nội dung

#### H1

Trường Việt Anh [Tên cơ sở]

#### Đoạn answer-first 40-60 từ

Trang campus này giúp phụ huynh xem nhanh Trường Việt Anh [tên cơ sở] nằm ở đâu, đang triển khai cấp học nào, có những điểm nổi bật gì về cơ sở vật chất và cách đặt lịch tham quan phù hợp trước khi ra quyết định.

#### H2 số 1: Cơ sở [tên campus] nằm ở đâu và phù hợp với khu vực nào

#### H2 số 2: Không gian học tập và cơ sở vật chất thực tế

#### H2 số 3: Những cấp học đang vận hành tại campus này

#### H2 số 4: Review và phản hồi của phụ huynh

#### H2 số 5: Học phí, tuyển sinh và School Tour tại cơ sở này

#### H2 số 6: Câu hỏi thường gặp về campus

### CTA chính

Đặt lịch tham quan

### CTA phụ

- Gọi campus
- Xem học phí

---

## 8. Class Local Intent Landing

### Vai trò

Trang bắt local query dài, nhưng phải tránh doorway pages.

### Search intent chính

- local long-tail
- near-me

### Index rule

- Chỉ index khi có unique local content

### Skeleton nội dung

#### H1

[Cấp học] Trường Việt Anh [Khu vực]

#### Đoạn answer-first 40-60 từ

Nếu gia đình đang tìm [cấp học] tại khu vực [địa danh], trang này sẽ giúp phụ huynh xem nhanh campus phù hợp, mức học phí tham khảo, khoảng cách di chuyển và những yếu tố nên cân nhắc trước khi đăng ký tư vấn hoặc School Tour.

#### H2 số 1: Vì sao phụ huynh khu vực [địa danh] quan tâm đến [cấp học] tại Việt Anh

#### H2 số 2: Campus nào gần và phù hợp nhất

#### H2 số 3: Chương trình học và môi trường phù hợp cho con

#### H2 số 4: Học phí và tuyển sinh tại khu vực này

#### H2 số 5: Câu hỏi thường gặp của phụ huynh quanh khu vực [địa danh]

### CTA chính

Xem cơ sở phù hợp

### CTA phụ

Nhận tư vấn ngay

---

# NHÓM 3 — MID-FUNNEL / NURTURING

## 9. Class Parent Hub Article

### Vai trò

Cluster content nuôi dưỡng lead và hỗ trợ topical authority.

### Search intent chính

- informational
- how-to
- guide

### Index rule

- Bắt buộc index nếu chất lượng đủ

### Schema gợi ý

- `Article`
- `Person`
- `FAQPage` nếu có FAQ

### Cấu trúc production-ready

1. H1
2. Answer-first intro
3. TOC
4. Phần thân theo logic Vấn đề -> Nguyên nhân -> Giải pháp -> Ứng dụng
5. In-content CTA
6. FAQ
7. Related links
8. Author / updated date

### Skeleton nội dung

#### H1

[Câu hỏi hoặc vấn đề của phụ huynh]

#### Đoạn answer-first 40-60 từ

[Trả lời trực diện cho câu hỏi chính bằng ngôn ngữ rõ ràng, trung tính, không bán hàng.]

#### H2 số 1: Vấn đề này thường xuất hiện khi nào

#### H2 số 2: Nguyên nhân phổ biến

#### H2 số 3: Phụ huynh có thể làm gì trước

#### H2 số 4: Nhà trường có thể hỗ trợ ra sao

#### H2 số 5: Khi nào nên tìm tư vấn sâu hơn

#### H2 số 6: Câu hỏi thường gặp

### CTA chính

Nhận tư vấn chọn trường

### CTA phụ

Xem chương trình phù hợp

---

## 10. Class Comparison Engine Page

### Vai trò

Trang comparison cho giai đoạn cân nhắc.

### Search intent chính

- comparison
- commercial investigation

### Schema gợi ý

- `WebPage`
- `FAQPage`

### Skeleton nội dung

#### H1

[Chủ đề so sánh] và Trường Việt Anh: nên cân nhắc thế nào

#### Đoạn answer-first 40-60 từ

Trang này giúp phụ huynh nhìn rõ điểm giống và khác giữa [mô hình / lựa chọn A] và [Việt Anh / lựa chọn B], từ đó chọn phương án phù hợp hơn với mục tiêu học tập, ngân sách, tính cách và lộ trình dài hạn của con.

#### H2 số 1: Khi nào nên so sánh theo tiêu chí này

#### H2 số 2: Bảng so sánh các tiêu chí quan trọng

#### H2 số 3: Điểm mạnh và giới hạn của từng lựa chọn

#### H2 số 4: Việt Anh phù hợp với nhóm phụ huynh nào

#### H2 số 5: Những câu hỏi thường gặp trước khi quyết định

### CTA chính

Nhận tư vấn để chọn phù hợp

### CTA phụ

Xem học phí

### Guardrails

- Không bôi xấu đối thủ
- Bảng phải là HTML thật
- Sau bảng phải có đoạn diễn giải

---

## 11. Class AI-Ready FAQ / Answer Engine

### Vai trò

Answer hub cho PAA, voice search, AI Overviews.

### Search intent chính

- FAQ
- direct answer
- voice search

### Schema gợi ý

- `FAQPage`

### Skeleton nội dung

#### H1

Giải đáp những câu hỏi thường gặp về Trường Việt Anh

#### Đoạn answer-first 40-60 từ

Trang FAQ này tổng hợp những câu hỏi phụ huynh hay quan tâm về học phí, tuyển sinh, chương trình học, campus, bán trú, School Tour và các bước tiếp theo để giúp gia đình có câu trả lời nhanh, rõ và dễ hành động hơn.

#### Cấu trúc bắt buộc

- Tab theo chủ đề
- Mỗi câu hỏi là H2 hoặc accordion title
- Mỗi câu trả lời mở đầu bằng 1 đoạn 40-50 từ trực diện
- Sau đó mới giải thích thêm nếu cần

### CTA chính

Gọi ngay để được giải đáp sâu hơn

### CTA phụ

Nhắn Zalo tư vấn

---

# NHÓM 4 — SYSTEM / UTILITY

## 12. Class Homepage

### Vai trò

Brand hub và navigation hub.

### Search intent chính

- branded navigational

### Schema gợi ý

- `Organization`
- `WebSite`

### Skeleton nội dung

#### H1

Trường Việt Anh - Hệ thống giáo dục liên cấp song ngữ tại TP.HCM

#### Đoạn answer-first 40-60 từ

Trường Việt Anh là hệ thống giáo dục liên cấp song ngữ dành cho các gia đình muốn con học tốt, phát triển tiếng Anh, hình thành năng lực tự chủ và lớn lên trong một môi trường học tập hạnh phúc, thực dụng và có định hướng rõ ràng.

#### H2 số 1: Chương trình học theo từng cấp

#### H2 số 2: Vì sao phụ huynh chọn Việt Anh

#### H2 số 3: Các cơ sở của Trường Việt Anh

#### H2 số 4: Học phí, tuyển sinh và School Tour

#### H2 số 5: Tin mới và sự kiện nổi bật

### CTA chính

Đăng ký tư vấn

### CTA phụ

Chọn cấp học / khu vực

---

## 13. Class Smart Thank-You Page

### Vai trò

Trang hậu chuyển đổi.

### Index rule

- Thường noindex

### Skeleton nội dung

#### H1

Cảm ơn ba mẹ đã quan tâm Trường Việt Anh

#### Nội dung bắt buộc

- xác nhận hành động vừa hoàn tất
- bước tiếp theo
- thời gian phản hồi
- CTA phụ phù hợp với form vừa submit

### CTA chính

[Tải tài liệu / Đặt lịch tham quan / Vào Zalo]

---

## 14. Class Dynamic Comparison Page

### Vai trò

Comparison scale bằng dữ liệu động.

### Skeleton nội dung

Giữ cấu trúc giống Class 10, nhưng thêm:

- Intro unique
- Data source note
- Last updated
- Related comparisons

### Guardrails

- Không để data stale
- Không chỉ render table mà thiếu narrative

---

## 15. Class Objection Handler Page

### Vai trò

Trang xử lý phản đối cuối funnel.

### Search intent chính

- objection
- “có đáng không”
- “có nên không”

### Schema gợi ý

- `FAQPage`

### Skeleton nội dung

#### H1

[Objection chính] tại Trường Việt Anh: nên hiểu như thế nào

#### Đoạn answer-first 40-60 từ

Nếu gia đình đang băn khoăn về [objection], trang này sẽ giúp phụ huynh nhìn rõ bản chất vấn đề, những yếu tố cần so sánh thực tế và cách đánh giá điều gì thực sự phù hợp với con thay vì chỉ nhìn vào cảm nhận ban đầu.

#### H2 số 1: Vì sao phụ huynh thường lo lắng về vấn đề này

#### H2 số 2: Thực tế tại Việt Anh được vận hành ra sao

#### H2 số 3: Điều gì nên được so sánh thay vì chỉ nhìn bề mặt

#### H2 số 4: Khi nào nên đi School Tour / học thử / tư vấn

#### H2 số 5: Câu hỏi thường gặp

### CTA chính

Nhận tư vấn phù hợp

### CTA phụ

Đăng ký học thử / School Tour

---

## 16. Class Retention & Referral Page

### Vai trò

Trang retention / loyalty / referral cho phụ huynh hiện hữu.

### Index rule

- Thường noindex

### Skeleton nội dung

#### H1

Giới thiệu bạn bè và nhận ưu đãi cùng Trường Việt Anh

#### Đoạn answer-first

Trang này giúp phụ huynh hiện tại của Trường Việt Anh giới thiệu bạn bè, theo dõi quyền lợi referral hoặc tìm hiểu các ưu đãi loyalty một cách rõ ràng, minh bạch và thuận tiện hơn.

#### H2 số 1: Referral hoạt động như thế nào

#### H2 số 2: Quyền lợi dành cho phụ huynh giới thiệu

#### H2 số 3: Các lưu ý khi tham gia

#### H2 số 4: Sự kiện / ưu đãi liên quan

### CTA chính

Giới thiệu bạn bè

### CTA phụ

Xem ưu đãi phụ huynh

---

# CHECKLIST PUBLISH CHO MỌI TEMPLATE

Trước khi publish, trang phải trả lời đủ:

1. H1 đã rõ chưa?
2. Có answer-first 40-60 từ chưa?
3. Search intent có đúng với CTA không?
4. Có schema phù hợp chưa?
5. Có internal links in/out đúng cluster chưa?
6. Có proof assets thật chưa?
7. Có dùng text thật cho dữ liệu quan trọng chưa?
8. Có block nào đang quá nặng và nên lazy-load không?
9. Voice có đúng với brand guideline không?
10. Trang này nên index hay noindex?

---

# THỨ TỰ ƯU TIÊN VIẾT SKELETON THÀNH BẢN NỘI DUNG THẬT

1. Homepage
2. Level Pillar
3. Master Campus Profile
4. Tuition / Fee Capture
5. Admissions Hub
6. AI-Ready FAQ
7. Parent Hub Article
8. Comparison Engine
9. Objection Handler
10. Trial / Tour / Event
11. Utility templates

