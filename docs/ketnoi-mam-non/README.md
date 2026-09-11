# Trang Kết nối phụ huynh Mầm non — `/ketnoi-mam-non/`

Một trang tĩnh, **3 nút bấm** tới 3 kênh chính thức. Anh em của `/ketnoi` (trang theo lớp
của TH–THCS–THPT) nhưng không có `?lop=` — mầm non không chia nhóm Zalo theo lớp.

Trang **không hiện mã QR** (bản đầu có 3 mã trên trang, Văn bỏ 11/09/2026 vì ba mẹ mở
trang trên điện thoại thì mã trên màn hình không quét được, chỉ rối). Mã QR để in nằm ở
`docs/ketnoi-mam-non/qr/`.

```
https://truongvietanh.com/ketnoi-mam-non/
```

Dựng 11/09/2026.

---

## 3 kênh (đã mở thật để kiểm 11/09/2026)

| # | Kênh | URL | Kiểm |
|---|---|---|---|
| 1 | Facebook **Mầm non Việt Anh** | https://www.facebook.com/mamnonVietAnh/ | "Mầm Non Việt Anh", 3,9K theo dõi, 573 Lê Đức Thọ ✓ |
| 2 | Facebook **Trường Việt Anh** | https://www.facebook.com/truongvietanhhcm/ | "Trường Việt Anh", 13K theo dõi ✓ |
| 3 | YouTube **Trường Việt Anh** | https://www.youtube.com/@truongvietanhhcm | HTTP 200, "Trường Việt Anh - YouTube" ✓ |

Ngoài ra có **mã CHUNG** trỏ về chính trang này (`CHUNG.png|svg`) — dán bảng tin, thư mời,
chiếu màn hình ở buổi họp phụ huynh: ai quét cũng vào trang rồi tự chọn kênh.

## Cách dùng

- **Chiếu màn hình / dán bảng tin / thư mời**: in `CHUNG-co-nhan.png` (hoặc `in-qr.html`).
  Ba mẹ quét → vào trang → bấm 3 nút.
- **Gửi link qua Zalo nhóm lớp**: dán thẳng `https://truongvietanh.com/ketnoi-mam-non/`,
  Zalo tự dựng thẻ preview từ `ketnoi-mam-non-og.jpg`.

## File nào làm gì

| File | Việc |
|---|---|
| `src/data/ketnoi-mam-non.ts` | **Nơi duy nhất khai báo link.** Hotline/địa chỉ lấy từ `mam-non-govap-facts.ts`. |
| `src/pages/ketnoi-mam-non.astro` | Giao diện + đo lượt bấm (GA4 gắn thẳng, không GTM — cùng lý do với `/ketnoi`). |
| `scripts/sinh-qr-ketnoi-mam-non.mjs` | Sinh 4 mã QR để in (PNG + SVG), tự giải mã kiểm ngược. |
| `public/ketnoi-mam-non/logo-mam-non.webp` | Logo chữ mầm non (chữ vàng, chỉ đặt trên nền navy). |
| `public/ketnoi-mam-non-hero.webp` | Ảnh hero 960×540 (album "Hình ảnh đẹp mỗi ngày" trên photos.truongvietanh.com). |
| `public/ketnoi-mam-non-og.jpg` | Ảnh preview 1200×630 khi dán link vào Zalo/Facebook (phải là JPG). |
| `docs/ketnoi-mam-non/qr/` | 4 PNG 1200px + SVG + `CHUNG-co-nhan.png` (mã chung có nhãn) + `in-qr.html` (4 mã / tờ A4). |

## Đổi link thì làm gì

1. Sửa `url` trong `src/data/ketnoi-mam-non.ts`.
2. Sinh lại mã QR in — **bắt buộc**, nếu không nút bấm trỏ đường mới còn mã QR đã in/dán vẫn trỏ đường cũ:

```bash
npm i --no-save qrcode jimp jsqr
node scripts/sinh-qr-ketnoi-mam-non.mjs
```

Script giải mã lại từng PNG vừa ghi và so với file data; lệch là báo đỏ và exit 1.
Chỉ muốn kiểm mà không ghi: `node scripts/sinh-qr-ketnoi-mam-non.mjs --kiem`.

3. Push `main` để deploy (theo quy trình chung của repo).

## Đo lường

GA4 `G-Q2V9JWSXCK`, gắn thẳng (không GTM). Sự kiện khi bấm nút:
`facebook_mamnon_click`, `facebook_truong_click`, `youtube_click` — kèm tham số
`trang=ketnoi-mam-non`, `kenh=<id>`. Mã QR in của từng kênh trỏ thẳng sang Facebook/YouTube,
**không** qua trang nên không đo được — muốn đếm lượt quét thì dùng mã CHUNG (đi qua trang).

## In dán bảng tin

Mở `docs/ketnoi-mam-non/qr/in-qr.html` bằng trình duyệt → Ctrl+P (4 mã / tờ A4), hoặc in thẳng
`CHUNG-co-nhan.png` nếu chỉ cần một mã dẫn về trang.
