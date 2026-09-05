# Trang Kết nối phụ huynh theo lớp — `/ketnoi`

Một trang dùng chung cho **35 lớp**, không tạo 35 page riêng. Trang đọc tham số `?lop=` để
hiện đúng tên lớp và gán đúng link Zalo theo nhóm.

```
https://truongvietanh.com/ketnoi/?lop=1OIC
https://truongvietanh.com/ketnoi/?lop=6A2
https://truongvietanh.com/ketnoi/?lop=12XH
```

Dựng 05/09/2026 theo brief "Trang kết nối phụ huynh theo lớp".

---

## File nào làm gì

| File | Việc |
|---|---|
| `src/data/ketnoi-lop.ts` | **Nơi duy nhất khai báo link + mapping.** Sửa ở đây, trang tự đổi. |
| `src/pages/ketnoi.astro` | Giao diện + script đọc `?lop=`. Không cần đụng khi đổi link. |
| `scripts/kiem-tra-ketnoi.mjs` | Tự kiểm + sinh lại danh sách 35 URL. |
| `docs/ketnoi/35-url-lop.csv` | 35 URL để sinh QR (mở được bằng Excel, đã có BOM). |
| `scripts/sinh-qr-ketnoi.mjs` | Sinh 35 QR + bản in gộp, tự giải mã kiểm chứng. |
| `docs/ketnoi/qr/` | 35 QR (PNG + SVG) + `in-35-qr.pdf` để in. |
| `public/ketnoi-hero.webp` | Ảnh hero, 800×450, 42 KB. |
| `public/ketnoi-og.jpg` | Ảnh preview khi dán link vào Zalo/Facebook, 1200×630. |

---

## 8 link Zalo — đã gắn xong

Văn tạo và gửi 05/09/2026, đã gắn đủ 8 vào `src/data/ketnoi-lop.ts`. Dạng link:

```
https://chatbot.zalo.me/ref/1678310120468101523?id=<tag>
```

**Zalo CÓ kiểm `id`** — kiểm chứng bất cứ lúc nào bằng cách xem nó nhảy đi đâu:

```bash
curl -sI -G "https://chatbot.zalo.me/ref/1678310120468101523" --data-urlencode "id=2627_ph_gv_tih"
```

- Tag đúng → `Location: zalo://qr/jp/<token>` (mở thẳng app Zalo) ✓
- Tag sai → `Location: https://chatbot.zalo.me` (đá về trang chung) ✗

Cả 8 tag đã kiểm, mỗi tag ra một token riêng biệt.

### ⚠️ Nhóm THPT 10–11 lệch quy ước — đừng "sửa cho gọn"

7 nhóm tên theo mẫu `2627_ph_*`, riêng nhóm này tag thật tên là **`gv-thpt-10–11`**, và ký tự
giữa 10 với 11 là **gạch ngang dài `–` (en dash), không phải gạch nối `-`**.

Đã thử `2627_ph_gv_1011` như brief ghi → Zalo đá về trang chung, tức **tag đó không tồn tại**.
Nên link trong code là đúng, brief mới là chỗ ghi nhầm.

Trong code, ký tự đó lưu dưới dạng mã hoá `%E2%80%9311` — cố ý, vì để nguyên ký tự `–` trong
URL là gãy khi đi qua công cụ khác (đã tái hiện: cùng một link, dạng gõ thẳng thì hỏng, dạng
mã hoá thì chạy).

**Nên làm khi rảnh:** đổi tên tag trên Zalo OA thành `2627_ph_gv_1011` cho đồng bộ với 7 nhóm
kia, rồi sửa lại một dòng trong `ketnoi-lop.ts`. Để tên có dấu gạch ngang dài thì sớm muộn
cũng có người gõ tay rồi sai.

### 2 link chưa dùng đến

`2627_khach_gv` và `2627_khach_binh-tan` — nghe như luồng dành cho **khách/phụ huynh chưa
nhập học** chứ không phải 35 lớp đang học, nên chưa gắn vào trang này. Cần thì báo.

### 8 nhóm và 35 lớp

| Nhóm | Mã nhận diện | Lớp |
|---|---|---|
| Tiểu học — Gò Vấp | `2627_ph_gv_tih` | 1OIC, 2OIC, 3OIC, 4OIC, 5A |
| Tiểu học — Bình Tân | `2627_ph_bt_tih` | 1BT, 2BT, 3BT, 4BT, 5BT |
| THCS 6–7 — Gò Vấp | `2627_ph_gv_67` | 6A2, 6B2, 7A2, 7B2 |
| THCS 8–9 — Gò Vấp | `2627_ph_gv_89` | 8A2, 8B2, 8C2, 9A2, 9B2 |
| THCS — Bình Tân | `2627_ph_bt_thcs` | 6BT, 7BT, 8BT, 9BT |
| THPT 10–11 — Gò Vấp | `2627_ph_gv_1011` | 10A2, 10B2, 10C2, 11A2 |
| THPT 12 — Gò Vấp | `2627_ph_gv_12` | 12A2, 12B2, 12C2, 12D2 |
| THPT — Bình Tân | `2627_ph_bt_thpt` | 10BT, 11BT, 12TN, 12XH |

---

## Link Facebook & YouTube

Brief ghi *"tôi sẽ cung cấp"*. Đã tự dò và kiểm chứng bằng cách gọi thật ngày 05/09/2026,
điền sẵn link đúng — **nếu trường muốn dùng trang khác thì báo để đổi**:

- Facebook: `https://www.facebook.com/truongvietanhhcm` → "Trường Việt Anh | Ho Chi Minh City" ✓
- YouTube: `https://www.youtube.com/@truongvietanhhcm` → 200 ✓

Hai link **sai** đang nằm rải rác trong code cũ, đừng chép nhầm:
`facebook.com/truongvietanh` là trang cá nhân tên "Anh Truong", và
`youtube.com/@truongvietanh` trả **404**.

---

## Vì sao URL trong CSV có dấu `/` trước `?`

`truongvietanh.com/ketnoi?lop=1OIC` bị Cloudflare trả **307** sang
`truongvietanh.com/ketnoi/?lop=1OIC` (query giữ nguyên) rồi mới ra trang.
Dạng có dấu `/` vào thẳng **200**, bớt một vòng đi–về cho mỗi lần quét QR.

**Cả hai dạng đều chạy đúng** — link đã lỡ gửi theo dạng trong brief vẫn dùng được bình thường.

---

## 35 mã QR — đã sinh xong

Nằm ở `docs/ketnoi/qr/`:

| File | Dùng khi |
|---|---|
| `<MA_LOP>.png` | 1200×1200, dán cửa lớp, gửi Zalo cho GVCN |
| `<MA_LOP>.svg` | vector, in khổ lớn (standee, bảng tin) không vỡ |
| `in-35-qr.html` / `in-35-qr.pdf` | **bản in gộp 6 mã/tờ A4**, cắt theo đường đứt |

Sinh lại: `node scripts/sinh-qr-ketnoi.mjs` (cần `npm i --no-save qrcode jimp jsqr`).

Mã dùng mức sửa lỗi **Q (25%)** — vẫn quét được khi bị bẩn, nhoè hay che một góc, vì mã dán
cửa lớp cả năm học. **Không nhúng logo vào giữa mã**: logo che ô dữ liệu, mà cái giá phải trả
là in xong 35 tấm mới phát hiện lớp nào quét chập chờn.

Script tự **giải mã ngược từng file PNG** rồi so với URL của đúng lớp — 35/35 khớp. Đây là
chốt chặn cho yêu cầu "không để QR mở sai lớp" ở mục 8 của brief.

---

## Đo lượt bấm 3 CTA

Gắn **thẳng GA4** (`G-Q2V9JWSXCK`), **cố ý không nạp GTM**. Ba sự kiện
`facebook_click` / `youtube_click` / `zalo_click` lên báo cáo GA4 ngay, kèm tham số `lop` và
`nhom` — không phải cấu hình thêm gì trong GTM.

Vì sao không dùng GTM như các trang khác (đo trên Pixel 7, mạng ~1,6 Mbps, CPU chậm 4×):

| | 2 container GTM | GA4 gắn thẳng |
|---|---|---|
| Request | 39 | **15** |
| Dung lượng | 216 KB | **93 KB** |
| `load` event | 6,4 s | **4,5 s** |

Hai container của site kéo theo Facebook Pixel, TikTok Pixel, Zalo Ads và 3 tag remarketing
Google Ads. Brief yêu cầu "load nhanh", và đây là trang cho phụ huynh **đang học** — không có
lý do gì đẩy họ vào tệp remarketing quảng cáo.

Muốn quay lại dùng GTM: chép 2 khối GTM trong `src/layouts/BaseLayout.astro` sang `<head>` của
`ketnoi.astro`. Hàm `track()` vẫn đẩy `dataLayer` nên chạy được cả hai đường.

---

## Nghiệm thu 1OIC (mục 9 của brief)

| Bước | Trạng thái |
|---|---|
| Quét/mở link → hiện **LỚP 1OIC** | ✅ đã kiểm |
| Facebook đúng | ✅ đã kiểm (link đã xác minh) |
| YouTube đúng | ✅ đã kiểm (link đã xác minh) |
| Zalo mở nhóm GV Tiểu học | ✅ nút trỏ `id=2627_ph_gv_tih`, đi tiếp ra `zalo://qr/jp/p5glbokpyd` |
| Chọn 1OIC → OA gắn tag `2627 1OIC` → hỏi HỌ TÊN CON | ⏳ nằm trong kịch bản OA — phải bấm thử bằng điện thoại thật |

---

## Đã kiểm những gì

Chạy trên bản render thật, ngày 05/09/2026:

- **35/35 mã lớp** ra đúng tên lớp, đúng nhóm và **đúng link Zalo** (đếm được đúng 8 link khác
  nhau), trên **Chrome Android (Pixel 7)** và **Safari iPhone (WebKit, iPhone 13)** — không lỗi JS.
- Mã lớp không phân biệt hoa/thường, bỏ qua khoảng trắng và gạch nối: `?lop=6a2`,
  `?lop=6 A2`, `?lop=6-a2` đều ra 6A2.
- Mã lớp sai hoặc thiếu `?lop=` → hiện thông báo *"Không tìm thấy thông tin lớp…"*, **ẩn hẳn
  3 nút** (để không có chuyện QR mở sai lớp), kèm ô chọn lớp + hotline + Zalo OA.
- Tracking: bắt gói tin thật, xác nhận cả 3 sự kiện `facebook_click` / `youtube_click` /
  `zalo_click` **đã bay tới GA4** kèm `ep.lop`. (GA4 gộp sự kiện vào body POST chứ không
  để ở query string — nhìn query mà kết luận "không có gì gửi đi" là nhầm.)
- Bố cục ở 375 / 390 / 768 / 1440px: không tràn ngang, không nút nào cao dưới 44px,
  nút số 1 nằm trong màn hình đầu ngay cả trên iPhone 13 (390×664).

## Tự kiểm sau mỗi lần sửa

```bash
node scripts/kiem-tra-ketnoi.mjs --ghi
```

Kiểm đủ 35 lớp / 8 nhóm, không lớp nào trùng hay lệch so với brief, trang vẫn đọc `?lop=` và
vẫn còn đủ 3 sự kiện tracking. Có lỗi thì thoát mã 1.
