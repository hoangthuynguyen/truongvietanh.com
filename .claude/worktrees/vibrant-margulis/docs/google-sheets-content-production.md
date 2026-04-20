# Kế Hoạch Sản Xuất Nội Dung 1000+ Pages Trên Google Sheets (Content Production System)

Bản thảo này trình bày hệ thống tổ chức file Google Sheets để quản lý, sáng tạo và kiểm duyệt nội dung cho hơn 1000+ trang web trên hệ thống Trường Việt Anh, đảm bảo khả năng mở rộng, dễ dàng tích hợp AI và đồng bộ mượt mà vào CMS (Directus/Astro).

---

## I. TỔNG QUAN HỆ THỐNG GOOGLE SHEETS

Thay vì tạo một file khổng lồ làm treo trình duyệt hoặc làm rối loạn cấu trúc, chúng ta sẽ chia thành **1 Master Index Sheet** (trung tâm điều hướng) và **nhiều Template Sheets** (nơi chứa nội dung chi tiết theo từng cấu trúc trang).

### 1. Master Index Sheet (Kiểm soát tiến độ toàn cục)
Đây là file tổng hợp toàn bộ 1000+ URLs.

**Cấu trúc cột đề xuất:**
1. `Page ID / Unique Slug`: Ví dụ: `mam-non-go-vap`
2. `URL`: `/tuyen-sinh/mam-non-go-vap`
3. `Loại trang`: Local Intent, Core Pillar, FAQ, Blog...
4. `Template Class`: Class Local Intent Landing, Class Level Pillar... (Matching với 28 Template Classes).
5. `Primary Keyword`: Từ khóa SEO chính.
6. `Search Volume`: (Để phân bổ độ ưu tiên).
7. `Người phụ trách`: Tên Writer/AI Operator.
8. `Trình trạng (Status)`: Backlog, AI Generated, Editing, QA Review, Ready for CMS, Pushed to Directus.
9. `Link tới Sheet Nội Dung`: Hyperlink trỏ thẳng vào Sheet/Tab chứa content chi tiết của trang này.
10. `Ngày cập nhật cuối`: Timestamp.

---

### 2. Các Template Sheets (Nơi sản xuất nội dung thực tế)
Mỗi **Template Class** (ví dụ: Local Intent Landing) sẽ có một Tab hoặc File Sheet riêng. Bởi vì mỗi template có các Component (khối nội dung) khác nhau, các cột trong Sheet cũng sẽ khác nhau.

#### Ví dụ A: Local Intent Landing Sheet (Sản xuất quy mô lớn - Hàng trăm trang)
Loại bản ghi này áp dụng cho các trang dạng "Mầm non Gò Vấp", "Tiểu học Phú Nhuận"... Cần tạo ra hàng loạt nội dung theo công thức nhưng có Localization.
*Cấu trúc cột (Mỗi dòng là 1 URL):*
- `[A] Slug`: `mam-non-go-vap`
- `[B] Tên Địa Điểm (Variable)`: `Quận Gò Vấp`
- `[C] Cơ Sở Gần Nhất (Variable)`: `Phan Huy Ích`
- `[D] Meta Title`: Cần tối ưu SEO (Vd: Trường Mầm Non Gò Vấp Tốt Nhất 2026 - Việt Anh School)
- `[E] Meta Description`: 150 ký tự giới thiệu.
- `[F] Hero H1`: Tiêu đề chính.
- `[G] Hero Subtext`: Câu mô tả dưới H1.
- `[H] Benefit 1 (Title + Desc)`: Lợi ích 1 (giữ chỗ, học phí...).
- `[I] Benefit 2 (Title + Desc)`: Lợi ích 2...
- `[J] Lộ Trình/Combo`: Chi tiết lộ trình đi lại từ địa điểm đó đến cơ sở Việt Anh.
- `[K] Local Testimonial`: Lời khuyên/feedback của phụ huynh ở KV đó (Gen bằng AI hoặc lấy từ database).
- `[L] CTA Text`: (Vd: Đặt lịch tham quan cơ sở Phan Huy Ích).

#### Ví dụ B: Core/Pillar Page Sheet (Nội dung sâu - Vài chục trang)
Loại trang SEO chính (Vd: /mam-non, /tieu-hoc).
*Cấu trúc cột:*
- `[A] Slug`: `mam-non`
- `[B] Meta Title & Desc`: ...
- `[C] Hero Section`: (Title, Subtitle, Video URL).
- `[D] Intro Section`: Đoạn văn bản mô tả triết lý cấp học.
- `[E] Core Methodology (Rich Text)`: Khối phương pháp giáo dục.
- `[F] Subjects List`: Các môn học chính.
- `[G] Output / Cam Kết`: Đầu ra học sinh.
- `[H] FAQ 1-5 (Q&A)`: Bộ câu hỏi thường gặp dạng JSON hoặc tách cột Q1, A1, Q2, A2...
- `[I] Internal Links Bắt Buộc`: Danh sách URL trỏ đi.

---

## II. QUY TRÌNH SẢN XUẤT 1000+ PAGES BẰNG AI VÀ TEAM

Việc viết tay 1000 trang là không khả thi. Cần kết hợp AI Automation (Programmatic SEO) cho nhóm trang số lượng lớn, và Editor con người cho nhóm trang Authority.

### Giai đoạn 1: Chuẩn bị Data & Từ khóa (Tuần 1)
1. Crawl/Extract dữ liệu từ kho từ khóa để list ra hơn 1000 Page URLs dự kiến.
2. Đổ toàn bộ danh sách URL này vào **Master Index Sheet**.
3. Group các URL theo "Template Class". Phân bổ Priority (P1, P2, P3).

### Giai đoạn 2: Programmatic Generation (Tạo nội dung hàng loạt bằng AI) (Tuần 2-3)
*Áp dụng: Local Intent Landings, Comparison Pages, FAQ Pages (Chiếm ~80% số lượng).*
1. Setup Add-on `GPT for Sheets` hoặc dùng `Make.com / n8n` kết hợp OpenAI API.
2. Xây dựng **Prompt Template** chuẩn trong Sheet. (Xem phần III).
3. Chạy script để AI tạo tự động các cột Meta Title, Meta Desc, Hero Text, Benefit Text, FAQ theo từng "Biến số" (ví dụ: Quận, Cấp học).
4. **Kết quả**: Vài trăm trang gen xong trong thời gian ngắn với text unique.

### Giai đoạn 3: Editor Duyệt & Làm giàu (Human in the Loop) (Tuần 4-5)
*Áp dụng: Chỉnh sửa bài AI gen & Viết tay các Core/Pillar Pages.*
1. Team Content/Editor vào từng Sheet. Lọc các dòng có Status = "AI Generated".
2. Đọc lướt, fix lỗi hành văn của AI, cắt gọt cho chuẩn tone of voice "Trường Việt Anh".
3. Add hình ảnh cụ thể, Review URL thực tế.
4. Chuyển Status = "Ready for CMS".

### Giai đoạn 4: Sync & Deploy lên Web
1. Sử dụng tính năng Export CSV hoặc bắn API thẳng từ Google Sheets (qua n8n/Make) vào **Directus CMS Headless**.
2. Astro frontend sẽ tự động fetch data mới & build ra web.

---

## III. THIẾT KẾ CÁC "AI PROMPTS" CHUẨN ĐỂ GEN HÀNG LOẠT TRÊN SHEETS

Để nội dung sinh ra không bị "văn mẫu AI", bạn cần cung cấp Context rất mạnh trong hàm GPT (ví dụ `=GPT(prompt, input)`).

**Mẫu System Prompt Context (Giữ cố định ở 1 ô trong Sheet):**
> "Bạn là chuyên gia Copywriter mảng Giáo dục của Trường Việt Anh (TP.HCM). Thương hiệu định vị: Học sinh giỏi tiếng Anh, không áp lực điểm số, phương pháp học vui vẻ, chương trình chuẩn Anh Quốc và Bộ GDĐT. Tone of voice: Chuyên nghiệp, thấu hiểu phụ huynh, tin cậy, mạch lạc."

**Mẫu Generate Local Hero Text (Prompt cho cột):**
> "Hãy viết 1 thẻ Hero H1 (dưới 60 ký tự) và 1 thẻ Subtext (dưới 150 ký tự) để thuyết phục phụ huynh ở khu vực [Giá_Trị_Cột_Quận] đăng ký cho con học [Giá_Trị_Cột_Cấp_Học] tại trường Việt Anh cơ sở [Cột_Cơ_Sở]. Nhấn mạnh ưu điểm: Có xe đưa rước tận nơi tại [Giá_Trị_Cột_Quận] và môi trường học tiếng Anh mỗi ngày. Trả về đúng định dạng: H1: ... | Subtext: ..."

**Mẫu Generate Objection Handler (Xử lý phản đối):**
> "Khách hàng có lo ngại: [Cột_Lo_Ngại_Khách_Hàng]. Viết 1 đoạn lập luận 3 câu xử lý từ chối khéo léo, dồn CTA về việc mời khách hàng đến trải nghiệm thực tế tại campus."

## IV. GIAI ĐOẠN 5: TỐI ƯU HOÁ & MIGRATE HÌNH ẢNH SANG CLOUDFLARE R2

Để chuẩn bị cho việc chuyển đổi hệ thống từ WordPress cũ sang `staging.truongvietanh.com` và sau đó là live production, toàn bộ hình ảnh cần được tối ưu hoá chuẩn SEO.

### Quy trình đề xuất:
1. **Khảo sát & Tải ảnh**: Dùng script tự động tải toàn bộ thư mục `/wp-content/uploads/` từ trang hiện tại.
2. **Auto-Rename SEO Friendly**: Đổi tên các file ảnh có nghĩa vô thưởng vô phạt (như `IMG_1234.jpg`) thành các tên chứa từ khóa chuẩn SEO (ví dụ: `truong-viet-anh-co-so-go-vap.jpg`, `hoc-sinh-mam-non-truong-viet-anh.jpg`). Có thể mapping tên hình ảnh dựa vào tiêu đề của bài viết chứa nó.
3. **Resize & Format Conversion**: Bulk convert toàn bộ thư viện ảnh sang định dạng **WebP** và resize kích thước tối đa (VD: max width 1920px cho banner hero, 800px cho ảnh trong bài) nhằm tối ưu hoá thời gian tải trang (LCP).
4. **Lưu trữ Cloud & Đồng bộ Headless**: Upload toàn bộ tài nguyên đã tối ưu lên **Cloudflare R2**. Cập nhật lại đường dẫn hình ảnh trong Database (hoặc trong Sheet/Markdown files) trỏ về link bucket mới để sẵn sàng gắn vào giao diện Astro.

---

## TÓM LẠI CÁC BƯỚC ACTION TIẾP THEO:
1. File **[Master Index CSV](master-index-sheet.csv)** khởi tạo từ danh sách URL cũ đã được tạo thành công ở Giai đoạn 1. Bạn hãy xem thử và phản hồi.
2. Bạn có cần tôi viết Script để tự động tải thư mục uploads của WP cũ và thực hiện tối ưu WebP/Rename SEO không?
3. Bạn có muốn kết nối thẳng Google Sheets của bạn để nhập dữ liệu CSV này lên không?
