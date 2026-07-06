# Hướng dẫn dự án — truongvietanh.com

Astro static site, deploy lên Cloudflare Workers. **Deploy = push lên nhánh `main`** →
GitHub Actions tự build (cần secret Directus) + `wrangler deploy`. Không build/deploy tay
trừ khi có token Directus hợp lệ trong `.env` (token mặc định thường đã bị thu hồi).

## ⚠️ BẮT BUỘC: Landing page / form thu lead phải gắn UTM

Mọi trang có form gửi lead (`POST /api/lead`) PHẢI bắt UTM để phân biệt **lead quảng cáo
vs organic**. Khi TẠO hoặc SỬA bất kỳ landing page / form lead nào:

**1. Mỗi body POST tới `/api/lead` phải merge object UTM** bằng `Object.assign`, dùng đúng
bộ thu chuẩn `__vaUTM` dưới đây. Nó đọc UTM từ URL, giữ qua `sessionStorage` (bền khi F5 /
form nhiều bước), fallback `direct/none`, và **kèm `page_url`** để worker bắt được
`fbclid`/`gclid` (ads quên gắn UTM vẫn nhận diện được):

```js
Object.assign(BODY_OBJECT, (window.__vaUTM||(window.__vaUTM=function(){var k=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_pke_mkter'],o={};try{var p=new URLSearchParams(location.search);k.forEach(function(x){var g=p.get(x);if(g){try{sessionStorage.setItem('va_'+x,g)}catch(e){}}var v=g||(function(){try{return sessionStorage.getItem('va_'+x)}catch(e){return ''}})()||'';if(v)o[x]=v})}catch(e){}if(!o.utm_source){o.utm_source='direct';o.utm_medium='none'}o.page_url=location.href;return o}))())
```

Ví dụ: `body: JSON.stringify(Object.assign({email:email, funnel_code:C.funnel, ...}, /*__vaUTM*/))`.
Áp cho CẢ lệnh partial-capture (bước 1) LẪN submit chính, và cho `dataLayer.push` nếu có.

**2. `funnel_code` phải là mã RIÊNG cho mỗi trang** (vd `squeeze-hoc-bong-2026`). Đây là
thứ hiện ở cột "Diễn giải nguồn MKT" trong Pancake.

**3. KHÔNG cần sửa worker.** `src/staging-worker.js` (hàm `channelLabel`) tự phân loại
Google/Facebook/TikTok/Zalo/Organic từ `utm_source` + `fbclid`/`gclid` trong `page_url`,
rồi ghi `dien_giai_nguon_mkt = "<funnel> (<kênh>)"`.

**Trang mẫu tham chiếu (copy từ đây):** `src/pages/checklist-cap3.astro` — squeeze 2 bước,
UTM đầy đủ. Layout dùng chung đã tích hợp sẵn: `MamNonHookLayout`, `TraiHeLandingLayout`,
`DarkLPLayout`, component `LeadFormTwoStepEmailFirst*`.

**Tự kiểm sau khi tạo trang:** `grep -c utm_pke_mkter <file>` phải ra ≥1. Nếu = 0 là quên gắn UTM.

> Lưu ý: "link UTM" (`?utm_source=...`) là URL đích khai báo khi set-up quảng cáo trên
> Facebook/Google, KHÔNG nằm trong code trang. Code trang chỉ ĐỌC UTM từ URL người dùng vào.
