# /qua-tang — trang quà tặng tổng hợp

Một link duy nhất dán được ở mọi kênh MXH. Khác với các squeeze page một-món
(`checklist-10-ky-nang-lop1`, `so-sanh-chi-phi-hoc`…), trang này gom **23 món**
và để phụ huynh tự phân loại trước khi bày quà.

**File:** `src/pages/qua-tang.astro` — trang tự build, không qua layout chung.

## Luồng

```
Màn 1                      Màn 2                        Màn 3
Bé đang ở giai đoạn nào?   Two-step form                🎁 Bốc 1 món hợp tuổi
6 nút                      email → tên + SĐT            + các món còn lại
                                                          trong nhóm, mở sẵn
```

Bốc ngẫu nhiên để giữ cảm giác mở quà, nhưng **các món còn lại trong nhóm hiện
ngay bên dưới** — không ai ra về thiếu thứ mình cần, và không phải điền lại.

Phụ huynh quay lại: `localStorage` nhớ, mở thẳng màn 3 và **ưu tiên bốc món chưa
từng nhận**.

## Lead → Pancake

Đi về `POST /api/lead` như mọi squeeze page khác, worker `src/staging-worker.js`
đẩy tiếp sang Pancake. **Chỉ dùng những trường worker thật sự đọc** — trường tự
đặt tên (kiểu `qua_id`, `giai_doan`) bị rơi mất im lặng, không tới Pancake.

| Trường | Giá trị | Vào Pancake thành |
|---|---|---|
| `email` | Gửi ngay ở **bước 1** kèm `partial: true` | Giữ được email cả khi phụ huynh bỏ dở bước 2 |
| `parent_name`, `phone` | Bước 2 | Tên + SĐT khách |
| `funnel_code`, `source` | `qua-tang-<giai-đoạn>` | Cột **"Diễn giải nguồn MKT"** — mã riêng theo giai đoạn, không dùng chung một mã `qua-tang` |
| `form_id` | `qt-<giai-đoạn>` | |
| `school_level` | `mam-non` / `tieu-hoc` / `thcs` / `thpt` | |
| `tags` | `['qua-tang','giai-doan-<mã>','qua-<id>']` | Worker gộp mảng này vào tag khách hàng — **đây là đường đưa món quà sang CRM** |
| `noi_dung` | `Giai đoạn: … · Quà đã nhận: …` | Ghi chú cho người trực đọc ngay |
| `co_so` | Từ `?cs=` | Cơ sở nào ra lead |
| `step` | 1 hoặc 2 | Phân biệt lead tạm với lead đủ |
| `utm_*`, `page_url` | Xem mục dưới | `channelLabel` phân loại kênh |

Sự kiện dataLayer: `qua_tang_chon_nhom` · `qua_tang_buoc1` · `qua_tang_nhan_qua`
· `qua_tang_mo_file`.

### UTM — có một điểm khác bộ chuẩn `__vaUTM`

Trang này **map thêm `?nguon=` vào `utm_source` / `utm_medium=social` /
`utm_content`** khi URL không có UTM thật. Lý do: link dán comment không có UTM,
nếu để nguyên thì mọi lead organic đều rơi vào `direct/none` → Pancake ghi
"Organic", không biết kênh nào ra lead.

Quảng cáo có UTM thật thì **không bị đè** — `if (!o.utm_source)` chặn sẵn.

⚠️ **Vì thế mã trong `?nguon=` phải bắt đầu bằng tên kênh** để `channelLabel`
phân loại đúng:

| `?nguon=` | Pancake ghi |
|---|---|
| `fb-thaison-1208` | Facebook Fanpage |
| `tiktok-lop1` | TikTok |
| `ig-bio` | Instagram |
| `zalo-oa` | Zalo |
| `bao-chi-1208` | (ghi nguyên chuỗi) |
| *(không có)* | Organic |

## Tham số link cho đội content

Ghép được với nhau, thứ tự nào cũng được.

| Tham số | Làm gì | Giá trị |
|---|---|---|
| `?nguon=` | Biết kênh nào ra lead | `fb-thaison-1208`, `tiktok-lop1`, `ig-bio`, `zalo-oa` |
| `?cs=` | Đổi hotline hiển thị | *(trống)* = 0916 961 409 · `thaison` = 0902 095 956 · `govap` = 0774 588 988 |
| `?nhom=` | Vào thẳng giai đoạn, bỏ màn 1 | `mam-non` `vao-lop-1` `tieu-hoc` `len-lop-6` `thcs` `thpt-duhoc` |
| `?qua=` | Chỉ định luôn món, **không bốc ngẫu nhiên** | `LM01` `LM17` `LM12` `Qua1` `Qua3` `SOTAY` `BANGKIEM` `BANDO`… |

Ví dụ fanpage Thái Sơn đăng bài về chuẩn bị vào lớp 1:

```
https://truongvietanh.com/qua-tang?qua=LM17&cs=thaison&nguon=fb-thaison-vaolop1-1208
```

Link trần `/qua-tang` dùng cho bio và bài ghim.

## Thêm quà mới

Thêm một khối vào mảng `QUA` trong file. Không phải dựng trang mới — món mới tự
có link riêng `?qua=<id>`.

```js
{ id:'LM99', icon:'📗', loai:'Ebook',
  ten:'Tên món quà, đọc lên là biết được gì',
  loi:'Một câu: ba mẹ đang khổ chuyện gì, món này gỡ chuyện đó.',
  trong:['Bên trong có gì','...','...'],
  meta:'PDF 8 trang',
  nhom:['tieu-hoc'],   // nằm được nhiều giai đoạn: ['mam-non','tieu-hoc']
  uu:1,                // 2 = khả năng bốc trúng gấp đôi
  link:'https://drive.google.com/file/d/.../view',
  linkChu:'Mở tài liệu', hien:true }
```

Món **thiếu `link`** hoặc `hien:false` tự bị loại khỏi kho, không bao giờ bốc
trúng — thêm quà chưa có file cũng an toàn.

## Lưu ý kỹ thuật

- `<style is:global>` là **bắt buộc**: thẻ quà, nút nhóm và danh sách món còn lại
  đều do JS tạo lúc chạy nên không mang thuộc tính scope của Astro. Đổi về
  `<style>` thường là toàn bộ phần động mất style.
- `<script is:inline>` để Astro giữ nguyên script, không bundle.
- Quà mở ngay khi submit, **không chờ `/api/lead` trả lời**. Mạng hỏng thì mất
  một lead, còn hơn để phụ huynh điền xong rồi tay trắng.
- Ô bẫy bot ẩn (`#website`); có giá trị thì bỏ qua submit.

## Việc còn thiếu

- [ ] Zalo OA: điền `zalo` cho `vietanh` và `govap` trong `COSO`. Bỏ trống thì
      nút Zalo tự ẩn, trang vẫn chạy.
- [ ] Ảnh OG 1200×630 tại `public/og-qua-tang.jpg`.
- [ ] PDF thực đơn mầm non: upload, dán link vào món `Qua2`, đổi `hien:true`.
- [ ] Đối chiếu nội dung 8 món THCS/THPT/du học (LM19, LM20, LM21, LM24, LM26,
      LM27, LM29, LM33) — chữ trên thẻ đang suy từ tên file.
- [ ] Sửa trong file quà: **LM01** có dòng "chỉ áp dụng cho 30 ba mẹ đăng ký sớm
      nhất trong tháng" chạy trên mọi trang — dán link quanh năm thành nói dối.
      **LM47** ghi tiêu đề "50 câu hỏi" nhưng bên trong chỉ có 30 thẻ.
- [ ] **LM07 không được đưa lên trang**: đó là tài liệu nội bộ chứa đáp án bài
      quiz. Trang đang dùng `/quiz` thay thế.
