# Quy trình dùng Antigravity (Google AI Ultra) Sản Xuất Trực Tiếp 1000+ Bài Viết

Vì cửa sổ ngữ cảnh (Context Window) của AI dù lớn cũng không thể sinh cùng lúc 1000+ trang chi tiết trong một câu lệnh, quy trình nhanh và chuẩn nhất để dùng trực tiếp tôi (Antigravity) như một "cỗ máy viết bài" sẽ là **chia mẻ (Batch Processing) ngay trong khung chat này**.

---

## I. CÁCH CHÚNG TA SẼ PHỐI HỢP (WORKFLOW)

### Bước 1: Khởi tạo File Data Đích
Tôi sẽ tạo ra một file `docs/directus-import-data.csv` rỗng, có sẵn các cột chuẩn cấu trúc của CMS Directus:
- `id` (Slug URL)
- `template_class`
- `seo_title`
- `seo_desc`
- `hero_h1`
- `hero_subtext`
- `content_blocks` (Dạng JSON)
...

### Bước 2: Chạy Từng Mẻ (Batch Run)
Thay vì API bên ngoài, bạn chỉ cần ra lệnh cho tôi:
> *"Tiếp tục batch 1: Chạy 10 trang đầu tiên của Local Intent Landing - Mầm Non."*

Tôi sẽ:
1. Đọc 10 URL tương ứng từ file `master-index-sheet.csv`.
2. Hấp thụ toàn bộ quy tắc từ `brand-guidelines.md` và `page-blocks` vào trí nhớ cục bộ.
3. Sinh nội dung chuẩn SEO/AIO cực kỳ chất lượng, sắc nét cho 10 trang này.
4. Tự động viết (append) kết quả vào file `docs/directus-import-data.csv`.

Sau đó, tôi báo lại cho bạn xem trước kết quả. Nếu thấy ưng ý, bạn báo "Chạy tiếp Batch 2", tôi lại lấy 10 trang tiếp theo. Chúng ta có thể nâng số lượng lên 20-30 trang 1 mẻ tuỳ độ dài.

### Bước 3: Upload Hàng Loạt Vào Directus CMS (1 Click)
Khi file CSV đã chứa đủ 1000 dòng content chất lượng:
1. Bạn đăng nhập vào Directus Panel.
2. Vào màn hình Collection của trang web -> Góc phải chọn dấu 3 chấm -> Chọn **Import/Export**.
3. Chọn file `directus-import-data.csv`. 
4. Directus sẽ biến 1000 dòng này thành 1000 Record thực tế trên CMS! (Sau đó, giao diện Astro của bạn chỉ việc re-build).

---

## II. "SIÊU PROMPT" SẼ ĐƯỢC DÙNG NGẦM (BACKGROUND PROMPT)

Tôi sẽ xử lý ngầm prompt sau với tư cách System của chính tôi mỗi khi chạy 1 mẻ:

> **QUY TẮC VIẾT BÀI (CHUẨN SEO/AIO 2026):**
> - **Hành văn & Tone:** Thực dụng, tôn trọng người dùng, không giật tít vô nghĩa, hạn chế dùng từ "số 1", "đỉnh cao". Trọng tâm là "Topic Authority".
> - **Chiều dài tối ưu:** Pillar Page (3000-5000+ từ), Blog chuyên sâu (1800-2500 từ), Bài tiêu chuẩn (1000-1500 từ).
> - **Meta & Heading:** Meta Title (50-60 ký tự, Keyword mồi đầu), Meta Description (120-160 ký tự, có CTA). H1 (20-70 ký tự, không trùng 100% Meta Title để mở rộng Entity).
> - **Cấu trúc AIO (Extractability):**
>   - **Answer Block:** NGAY SAU MỖI THẺ H2, phải có 1 đoạn 40-60 chữ trả lời trực tiếp (Answer-first) để Google AI Overviews dễ trích xuất. Đặc biệt ưu tiên câu hỏi dạng "How to...", "What is the best...".
>   - **Tần suất Heading:** Cứ 300-400 chữ phải có 1 thẻ H2/H3.
> - **Từ khóa & Entities:** Mật độ Keyword chính 1-1.5% (xuất hiện ngay trong 100-200 chữ đầu). Bổ sung 3-8 Keyword phụ (LSI).
> - **Tín hiệu Schema & EEAT:** Tuân thủ Schema Article/FAQPage. Khi public đảm bảo có Author Bio link social.
> - **Hero text & CTA:** Thuyết phục người dùng local (nếu là trang khu vực) và có action từ rõ ràng (VD: Đăng ký tư vấn).
> **NHIỆM VỤ:** Viết nội dung cho mảng [danh_sach_url], định dạng thành CSV các trường: seo_title, seo_desc, hero_h1, content, cta. Không dùng văn mẫu. Mỗi URL phải unique.


---

## BƯỚC ACTION NGAY BÂY GIỜ:
1. **Bạn có đồng ý bắt đầu chạy mẻ đầu tiên (Test Batch - 5 trang) của nhóm Local Intent Landing (ví dụ: Mầm non Gò Vấp, Mầm non Tân Bình) để xem chất lượng văn phong không?** 
Tôi sẽ tạo data và nhét ngay vào 1 file CSV cho bạn xem thử.
2. Lúc này script tải hình ảnh vẫn đang tiến hành ngầm.
