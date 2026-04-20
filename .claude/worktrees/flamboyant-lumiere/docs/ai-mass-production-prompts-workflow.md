# Hướng Dẫn Kịch Bản AI & Quy Trình Mass Production 1000+ Pages vào Directus

Tài liệu này giải thích chi tiết cách sử dụng các file `.md` hiện có làm ngữ cảnh (Context) cho mô hình AI (LLM), cách cấu trúc Prompt để sản xuất nội dung hàng loạt, và quy trình đưa dữ liệu này từ Google Sheets vào Directus Headless CMS.

---

## I. CÁC TÀI LIỆU `.md` LÀM NGỮ CẢNH LLM (AI CONTEXT)
Khi sử dụng AI (như OpenAI GPT-4o, Claude 3) qua API hoặc Chat, bạn cần "nhồi" các tài liệu này vào Hệ thống (System Prompt) hoặc Upload làm Knowledge base. AI sẽ dựa vào đó để không bị "trật nhịp" thương hiệu.

1. **`brand-guidelines.md`**: Quan trọng nhất. Chứa Tone of Voice, 7 Brand Pillars (Hạnh phúc, Thực dụng, Tự chủ...), và các Rule cấm (như không dùng "áp lực ảo", không dùng claim vô căn cứ). 
2. **`page-templates.md`**: Giúp AI biết bài viết thuộc 1 trong 28 Template Classes nào và có mục tiêu gì.
3. **`page-block-structure.md` / `production-ready-template-skeletons-vi.md`**: Định hình bố cục JSON hoặc Markdown để biết mỗi trang cần các field gì (Hero Title, Subtext, Testimonial, FAQ, CTA).
4. **`website-architecture-v2.md` / `sitemap-seo-ads.md`**: Giúp AI hiểu vị trí của URL trong tổng thể website (Internal link đi đâu).

---

## II. VIẾT PROMPT MẪU CHO MASS PRODUCTION

Để sản xuất hàng loạt bằng API (n8n/Make + OpenAI) hoặc trên Google Sheets qua add-on, bạn dùng 2 lớp Prompt.

### 1. System Prompt (Giữ cố định cho mọi Request)
*Mục đích: Định hình "nhân cách" và bộ luật thương hiệu cho AI.*

```text
Bạn là AI Copywriter cấp cao của Hệ thống Trường Việt Anh (TP.HCM). 
Sứ mệnh của trường: "Kiến tạo những công dân toàn cầu hạnh phúc", tập trung vào: Hạnh phúc, Tự chủ, Thực dụng, Chuyên Anh, Liên cấp.
Giọng văn (Tone of voice): Chân thành, cụ thể, thực dụng, ấm áp nhưng vững chãi, luôn đưa ra bằng chứng (không giật tít phô trương, không "áp lực", không claim "số 1" vô căn cứ).

Các Quy Tắc Bắt Buộc (Chuẩn SEO/AIO 2026):
- Tối ưu cho AI Overviews (AIO): Sau mỗi Heading (H2/H3), bắt buộc có một "Answer Block" dài 40-60 chữ trả lời trực tiếp vấn đề.
- Chiều dài & Cấu trúc: Tần suất 1 thẻ H2/H3 mỗi 300-400 chữ. Ưu tiên câu hỏi dạng "How to...", "What is the best...". Áp dụng độ dài tiêu chuẩn (Pillar 3000+ từ, Blog sâu 1800+ từ, Bài chuẩn 1000+ từ).
- Tối ưu Meta Data: Meta Title (50-60 ký tự, Keyword mồi đầu). Meta Description (120-160 ký tự, bắt buộc có CTA). H1 (20-70 ký tự, không trùng lặp 100% Meta Title).
- Từ khóa & Thực thể: Mật độ Keyword chính 1-1.5% (xuất hiện trong 100-200 chữ đầu). Có 3-8 Keyword LSI.
- E-E-A-T & Schema: Sẵn sàng cấu trúc Schema, chuẩn bị Author Bio, External links tới các nguồn uy tín.
- Kết thúc phải có CTA thực dụng.
```

### 2. User Prompt Thiết Kế Theo Từng Template
*Ví dụ dưới đây dành cho **Nhóm Trang Local Intent Landing** (Template: Class Local Intent Landing) - Nhóm chiếm số lượng trang nhiều nhất.*

```text
Hãy sinh nội dung chi tiết cho trang Landing Page địa phương dựa trên cấu trúc sau.
Các biến số đầu vào:
- URL Path: /tuyen-sinh/mam-non-go-vap
- Keyword Chính: Trường mầm non Gò Vấp tiếng Anh
- Cấp học: Mầm non
- Local Area: Quận Gò Vấp
- Cơ sở Việt Anh gần nhất: Cơ sở Phan Huy Ích, Gò Vấp

Trả về định dạng JSON (để map thẳng vào Directus CMS), với các trường sau:

{
  "seo_title": "[Viết Meta Title chuẩn SEO dưới 60 ký tự, chứa keyword]",
  "seo_meta_desc": "[Meta Description dưới 150 ký tự, mang tính hành động và kích thích click]",
  "hero_h1": "[H1 mạnh mẽ, trực diện, chứa keyword local, hướng đến lợi ích thực dụng]",
  "hero_subtext": "[1-2 câu giải thích H1, nhắc tới việc có xe đưa rước ở Gò Vấp, nhấn mạnh môi trường tiếng Anh và hạnh phúc]",
  "benefits_block": [
     {"title": "[Tên lợi ích 1]", "desc": "[Mô tả]"},
     {"title": "[Tên lợi ích 2]", "desc": "[Mô tả]"},
     {"title": "[Tên lợi ích 3]", "desc": "[Mô tả]"}
  ],
  "faq_ai_ready": [
     // Sinh 3 câu hỏi FAQ mà phụ huynh ở khu vực Gò Vấp thường hỏi về mầm non (vd: Học phí, Đưa rước, Cơ sở vật chất). 
     // Trả lời theo nguyên tắc "Answer-first", ngắn gọn, khách quan.
     {"question": "...", "answer": "..."}
  ],
  "cta_text": "Đặt lịch tham quan cơ sở Phan Huy Ích"
}
```

---

## III. QUY TRÌNH KẾT NỐI: SHEET -> DIRECTUS -> PUBLISH

### Bước 1: Mapping Database trên Google Sheets
Tạo 1 Google Sheet, đặt các cột chính xác theo tên Field trong **Directus Collection**. Ví dụ Collection `Pages` có các trường:
`slug`, `template_id`, `seo_title`, `seo_description`, `hero_h1`, `content_json`, `status`.

### Bước 2: Dùng n8n / Make.com để Automation Generate (Năng suất: 1000 page/vài giờ)
1. Tạo một workflow trên n8n. Đọc từng dòng chưa có nội dung trên Google Sheets (Dựa vào file `master-index-sheet.csv`).
2. Từng dòng dữ liệu (biến số local, url, keyword) được n8n nối với `System Prompt` + `User Prompt`.
3. Gọi API OpenAI (GPT-4o) > Nhận kết quả file JSON.
4. Update kết quả JSON ngược lại vào các cột của Google Sheets.

### Bước 3: Human QA (Quality Assurance)
- Editor lướt dọc Google Sheets, đọc các câu H1, Meta desc, chỉnh sửa trực tiếp các từ dính "văn mẫu".
- Nhấn đổi Status trên Sheet thành `Approved`.

### Bước 4: Upload Hàng Loạt Vào Directus CMS
Có 2 cách:
**Cách 1 (No-code / Tự động):** Trong Directus có tính năng **Native CSV Import**.
- Bạn xuất Sheet thành file CSV.
- Vào Collection `Pages` trên panel Directus -> Bấm nút `Import/Export` ở góc trên cùng -> Chọn file CSV.
- Directus tự động map đúng tên cột CSV vào tên Field của CMS và tạo ra hàng nghìn record.

**Cách 2 (API via n8n/Make):** 
- Khi người duyệt đổi Status thành `Approved` trên Sheet.
- n8n tự động trigger một API `POST /items/pages` trực tiếp tới Endpoint của Directus để tạo bài. Trạng thái bài trên Directus lúc này là `draft` hoặc `published`.

### Bước 5: Build và Publish từ Headless Web (Astro)
- Directus lưu dữ liệu Headless. Ngay khi dữ liệu được đánh dấu là `published`.
- Astro frontend tự động Re-build (Static Site Generation/Incremental Static Regeneration) bằng Webhooks (Ví dụ: báo cho Vercel/Netlify hoặc local Server build lại).
- Hơn 1000 pages được tạo thành file HTML cực nhẹ siêu tốc hiển thị cho người dùng, toàn bộ SEO chuẩn AIO sẵn sàng.
