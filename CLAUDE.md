# Hướng dẫn dự án — truongvietanh.com

Astro static site, deploy lên Cloudflare Workers. **Deploy = push lên nhánh `main`** →
GitHub Actions tự build (cần secret Directus) + `wrangler deploy`. Không build/deploy tay
trừ khi có token Directus hợp lệ trong `.env` (token mặc định thường đã bị thu hồi).

## ⚠️ BẮT BUỘC: Landing page / form thu lead phải gắn UTM

Mọi trang có form gửi lead (`POST /api/lead`) PHẢI bắt UTM để phân biệt **lead quảng cáo
vs organic**. Khi TẠO hoặc SỬA bất kỳ landing page / form lead nào:

**1. Nạp bộ thu dùng chung rồi merge kết quả vào mọi body POST tới `/api/lead`.**
KHÔNG chép lại code UTM vào từng trang nữa — dùng `public/js/va-utm.js`:

```html
<script src="/js/va-utm.js" is:inline></script>   <!-- đặt TRƯỚC script dùng nó -->
```
```js
Object.assign(BODY_OBJECT, (window.__vaUTM ? window.__vaUTM() : {}))
```

`window.__vaUTM()` đọc UTM từ URL, giữ qua `sessionStorage` (bền khi F5 / form nhiều bước),
fallback `direct/none`, kèm `page_url` để worker bắt `fbclid`/`gclid` khi ads quên gắn UTM.
Nó cũng xử lý 2 lỗi mà bản inline cũ mắc phải (đã tái hiện trên production 27/07/2026):
- **Lần chạm mới ghi đè trọn bộ** — bản cũ lưu từng khoá rời nên `utm_content`/`utm_term`
  của quảng cáo trước còn dính vào lead của quảng cáo sau trong cùng phiên.
- **`pke_mkter` và `utm_pke_mkter` là một** — file UTM builder của team sinh ra `pke_mkter`
  (không tiền tố), link cũ dùng `utm_pke_mkter`; giữ cả hai thì worker ưu tiên nhầm cái cũ
  và ghi sai người chạy. Nay chỉ trả về đúng khoá `pke_mkter`.

Áp cho CẢ lệnh partial-capture (bước 1) LẪN submit chính, và cho `dataLayer.push` nếu có.

> Trang cũ còn giữ bản inline `window.__vaUTM||(window.__vaUTM=function(){…})` làm dự phòng:
> file dùng chung nạp được thì nó thắng, không nạp được thì bản inline vẫn chạy. Trang MỚI
> chỉ cần thẻ `<script src>` ở trên, không cần chép lại đoạn inline.

**2. `funnel_code` phải là mã RIÊNG cho mỗi trang** (vd `squeeze-hoc-bong-2026`). Đây là
thứ hiện ở cột "Diễn giải nguồn MKT" trong Pancake.

**3. KHÔNG cần sửa worker.** `src/staging-worker.js` (hàm `channelLabel`) tự phân loại
Google/Facebook/TikTok/Zalo/Organic từ `utm_source` + `fbclid`/`gclid` trong `page_url`,
rồi ghi `dien_giai_nguon_mkt = "<funnel> (<kênh>)"`.

**Trang mẫu tham chiếu (copy từ đây):** `src/pages/checklist-cap3.astro` — squeeze 2 bước,
UTM đầy đủ. Layout dùng chung đã tích hợp sẵn: `MamNonHookLayout`, `TraiHeLandingLayout`,
`DarkLPLayout`, component `LeadFormTwoStepEmailFirst*`.

**Tự kiểm sau khi tạo trang:** `grep -c "va-utm.js" <file>` phải ra ≥1 (trang cũ có thể thay
bằng `grep -c utm_pke_mkter <file>` ≥1). Nếu = 0 là quên gắn UTM.

> Lưu ý: "link UTM" (`?utm_source=...`) là URL đích khai báo khi set-up quảng cáo trên
> Facebook/Google, KHÔNG nằm trong code trang. Code trang chỉ ĐỌC UTM từ URL người dùng vào.

## FAQ trên trang: gập lại, dùng component dùng chung

Chốt 01/09/2026. **Mọi khối FAQ dùng `src/components/FaqAccordion.astro`** — mặc định đóng,
bấm câu hỏi mới hiện câu trả lời. Trước đây quy ước ngược lại ("FAQ dùng h3 + p, KHÔNG dùng
`<details>`") nhưng nó chỉ nằm rải rác trong chú thích code, không có nguồn, và đã bỏ.

```astro
import FaqAccordion from '../components/FaqAccordion.astro';
...
<FaqAccordion faqs={faqs} />
```

Kiểu dáng nằm ở nhóm `.gi-faq-*` trong `src/styles/global.css`. Đừng chép CSS FAQ vào từng
trang nữa — sửa một chỗ là cả site đổi theo.

**Ràng buộc BẮT BUỘC — đây là lý do quy ước cũ tồn tại, đừng phá:**

1. Câu trả lời phải **nằm sẵn trong HTML do server dựng**, chỉ ẩn bằng CSS của `<details>`.
   **TUYỆT ĐỐI không nạp/không render câu trả lời bằng JS.** Làm vậy là nội dung biến mất
   khỏi HTML thô → bot và mô hình không đọc được → mất trắng phần AEO.
2. Trang phải tự sinh schema `FAQPage` từ **cùng một mảng `faqs`** mà component nhận, để chữ
   trong schema luôn trùng chữ hiển thị. Đây mới là thứ Google và các mô hình trích dẫn.
3. Mỗi câu nên có `id` (dạng `faq-...`) để link sâu được. Component đã tự mở đúng câu khi
   người đọc vào bằng link neo — script đó chỉ bật `open`, không sinh nội dung.

**Tự kiểm sau khi sửa FAQ:** số `<details class="gi-faq-item">` trong HTML trả về phải **bằng**
số câu trong schema `FAQPage`, và mỗi câu trả lời phải tìm thấy được trong HTML (nhớ giải mã
HTML entity trước khi so — câu có dấu ngoặc kép sẽ thành `&quot;`).

Ba trang trụ đang dùng: `/hoc-phi`, `/hoc-bong`, `/chinh-sach-ai`. Các trang khác còn FAQ mở
sẵn kiểu cũ (`/tuyen-sinh`, `/gioi-thieu`, `/chuong-trinh`, trang chủ, `blog/[slug]`) — đổi dần
khi có dịp đụng vào.

## Đa ngôn ngữ (bản 1 — máy dịch trên trình duyệt)

Dựng 01/10/2026. 8 ngôn ngữ: Việt (gốc), Anh, Hàn, Nhật, Trung, Pháp, Đức, Phần Lan.
**Nội dung gốc vẫn chỉ viết bằng tiếng Việt** — 7 ngôn ngữ kia do Google Translate dịch ngay
trên trình duyệt người xem. Toàn bộ nằm ở một file: `public/js/va-lang.js`.

- **Nút chọn ngôn ngữ**: đặt `<div data-va-lang></div>` + `<script src="/js/va-lang.js" is:inline defer></script>`.
  Đã có sẵn trong `HeaderBase.astro` và `SiteHeader.astro`. Landing page không có header thì
  không có nút, nhưng vẫn tự dịch theo lựa chọn của khách (integration `va-lang` trong
  `astro.config.mjs` nạp script khi có cookie `googtrans`).
- **Link mở thẳng một ngôn ngữ**: `?lang=en|ko|ja|zh|fr|de|fi|vi`.
- **Tên riêng** (tên trường, cơ sở, đường): thêm vào mảng `GIU_NGUYEN` trong `va-lang.js`, nếu
  không máy dịch sẽ phá — "Gò Vấp" từng bị dịch sang tiếng Hàn thành "người dùng thuốc lá điện
  tử". **Tên người**: gắn `class="notranslate" translate="no"` ngay trên thẻ chứa tên.
- **Form lead**: mọi `<option>` phải có `value` (script đã tự chốt cho option thiếu), và **đừng
  lấy giá trị gửi `/api/lead` từ chữ hiển thị** (`textContent`) — chữ đó sẽ thành tiếng nước
  ngoài, dropdown Pancake không nhận và loại cả lead.
- **Giới hạn**: bot tìm kiếm và mô hình AI KHÔNG thấy bản dịch (không có URL `/en/`, không
  `hreflang`). Đây chỉ là lớp phục vụ người xem; muốn có SEO/AEO tiếng nước ngoài phải dựng
  trang dịch thật — chưa làm.
