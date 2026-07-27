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
