// =====================================================================
// TRANG KẾT NỐI PHỤ HUYNH THEO LỚP — /ketnoi?lop=<MA_LOP>
// Một trang dùng chung cho 35 lớp. KHÔNG tạo 35 page riêng.
// Mỗi lớp có 1 URL riêng → dùng để sinh 35 mã QR (mỗi lớp 1 QR).
//
// ĐÂY LÀ NƠI DUY NHẤT KHAI BÁO LINK. Sửa ở đây, trang tự đổi theo.
// Danh sách 35 URL đầy đủ: docs/ketnoi/35-url-lop.csv
// Tự kiểm sau khi sửa file này:  node scripts/kiem-tra-ketnoi.mjs
// =====================================================================

// ---------------------------------------------------------------------
// 1. KÊNH CHUNG (giống nhau cho cả 35 lớp)
// ---------------------------------------------------------------------
// Đã kiểm chứng 05/09/2026 bằng cách gọi thật:
//   · facebook.com/truongvietanhhcm  → "Trường Việt Anh | Ho Chi Minh City" ✓
//   · facebook.com/truongvietanh     → trang cá nhân "Anh Truong", KHÔNG phải trường ✗
//   · youtube.com/@truongvietanhhcm  → 200 ✓
//   · youtube.com/@truongvietanh     → 404 ✗
export const FACEBOOK_URL = 'https://www.facebook.com/truongvietanhhcm';
export const YOUTUBE_URL = 'https://www.youtube.com/@truongvietanhhcm';

// Zalo OA chung của trường — dùng khi lớp CHƯA có link nhóm riêng (xem mục 2)
// và ở phần footer / khối báo lỗi.
export const ZALO_OA_URL = 'https://zalo.me/1678310120468101523';

export const HOTLINE = '0916 961 409';
export const HOTLINE_TEL = '0916961409';

// ---------------------------------------------------------------------
// 2. 8 NHÓM ZALO — đã có đủ URL thật
// ---------------------------------------------------------------------
// `ma` là mã nhận diện nhóm trong brief — chỉ để đối chiếu, KHÔNG phải URL.
// Khi `zalo` còn rỗng, nút Zalo tạm trỏ về OA chung ZALO_OA_URL.
//
// 8 URL thật do Văn tạo, gắn 05/09/2026. Đã kiểm từng cái bằng cách gọi thật:
// Zalo CÓ kiểm `id` — tag đúng thì trả 302 về `zalo://qr/jp/<token>` (mở app),
// tag sai thì đá về `https://chatbot.zalo.me`. Cả 8 đều ra token riêng biệt.
// Kiểm lại bất cứ lúc nào:
//   curl -sI -G "https://chatbot.zalo.me/ref/1678310120468101523" --data-urlencode "id=<tag>"
//
// ⚠️ Nhóm THPT 10–11 KHÔNG theo quy ước như 7 nhóm kia: tag thật tên là
// `gv-thpt-10–11` (gạch ngang dài) chứ không phải `2627_ph_gv_1011` như brief ghi.
// Đã thử `2627_ph_gv_1011` — Zalo đá về trang chung, tức tag đó không tồn tại.
export type NhomZalo = {
  /** Mã nhận diện nhóm theo brief */
  ma: string;
  /** Tên hiển thị cho phụ huynh, ngay dưới nút Zalo */
  ten: string;
  /** URL THẬT của luồng Zalo OA cho nhóm này. Rỗng = chưa có. */
  zalo: string;
};

export const NHOM_ZALO = {
  'gv-th': {
    ma: '2627_ph_gv_tih',
    ten: 'Tiểu học — Cơ sở Gò Vấp',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_gv_tih',
  },
  'bt-th': {
    ma: '2627_ph_bt_tih',
    ten: 'Tiểu học — Cơ sở Bình Tân',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_bt_tih',
  },
  'gv-67': {
    ma: '2627_ph_gv_67',
    ten: 'THCS khối 6–7 — Cơ sở Gò Vấp',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_gv_67',
  },
  'gv-89': {
    ma: '2627_ph_gv_89',
    ten: 'THCS khối 8–9 — Cơ sở Gò Vấp',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_gv_89',
  },
  'bt-thcs': {
    ma: '2627_ph_bt_thcs',
    ten: 'THCS — Cơ sở Bình Tân',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_bt_thcs',
  },
  'gv-1011': {
    // Tag THẬT, khác quy ước 7 nhóm kia. Brief ghi '2627_ph_gv_1011' nhưng tag đó
    // không tồn tại trên OA — đã thử, Zalo đá về trang chung.
    ma: 'gv-thpt-10–11',
    ten: 'THPT khối 10–11 — Cơ sở Gò Vấp',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=gv-thpt-10%E2%80%9311',
  },
  'gv-12': {
    ma: '2627_ph_gv_12',
    ten: 'THPT khối 12 — Cơ sở Gò Vấp',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_gv_12',
  },
  'bt-thpt': {
    ma: '2627_ph_bt_thpt',
    ten: 'THPT — Cơ sở Bình Tân',
    zalo: 'https://chatbot.zalo.me/ref/1678310120468101523?id=2627_ph_bt_thpt',
  },
} as const satisfies Record<string, NhomZalo>;

export type MaNhom = keyof typeof NHOM_ZALO;

// ---------------------------------------------------------------------
// 3. 35 LỚP → NHÓM ZALO
// ---------------------------------------------------------------------
// Thứ tự trong object = thứ tự hiển thị ở ô "chọn lớp" khi mã lớp không hợp lệ.
// Mã lớp so khớp KHÔNG phân biệt hoa/thường và bỏ qua khoảng trắng/gạch nối
// (xem chuanHoaMaLop) — '?lop=6a2', '?lop=6 A2', '?lop=6-A2' đều ra 6A2.
export const LOP: Record<string, MaNhom> = {
  // Nhóm 1 — Gò Vấp Tiểu học (5 lớp)
  '1OIC': 'gv-th',
  '2OIC': 'gv-th',
  '3OIC': 'gv-th',
  '4OIC': 'gv-th',
  '5A': 'gv-th',

  // Nhóm 2 — Bình Tân Tiểu học (5 lớp)
  '1BT': 'bt-th',
  '2BT': 'bt-th',
  '3BT': 'bt-th',
  '4BT': 'bt-th',
  '5BT': 'bt-th',

  // Nhóm 3 — Gò Vấp THCS 6–7 (4 lớp)
  '6A2': 'gv-67',
  '6B2': 'gv-67',
  '7A2': 'gv-67',
  '7B2': 'gv-67',

  // Nhóm 4 — Gò Vấp THCS 8–9 (5 lớp)
  '8A2': 'gv-89',
  '8B2': 'gv-89',
  '8C2': 'gv-89',
  '9A2': 'gv-89',
  '9B2': 'gv-89',

  // Nhóm 5 — Bình Tân THCS (4 lớp)
  '6BT': 'bt-thcs',
  '7BT': 'bt-thcs',
  '8BT': 'bt-thcs',
  '9BT': 'bt-thcs',

  // Nhóm 6 — Gò Vấp THPT 10–11 (4 lớp)
  '10A2': 'gv-1011',
  '10B2': 'gv-1011',
  '10C2': 'gv-1011',
  '11A2': 'gv-1011',

  // Nhóm 7 — Gò Vấp THPT 12 (4 lớp)
  '12A2': 'gv-12',
  '12B2': 'gv-12',
  '12C2': 'gv-12',
  '12D2': 'gv-12',

  // Nhóm 8 — Bình Tân THPT (4 lớp)
  '10BT': 'bt-thpt',
  '11BT': 'bt-thpt',
  '12TN': 'bt-thpt',
  '12XH': 'bt-thpt',
};

/** 35 mã lớp, đúng thứ tự khai báo ở trên. */
export const DANH_SACH_LOP = Object.keys(LOP);

/**
 * Chuẩn hoá mã lớp người dùng gõ/quét về đúng khoá trong LOP.
 * Dùng chung cho cả build-time (script sinh URL) lẫn client-side.
 */
export function chuanHoaMaLop(raw: string): string {
  return String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/[\s._-]/g, '');
}

/**
 * URL công khai của một lớp — nguồn để sinh mã QR.
 * Dấu `/` trước `?` là CỐ Ý: `/ketnoi?lop=` bị Cloudflare trả 307 sang
 * `/ketnoi/?lop=` (query vẫn giữ nguyên), nên dùng sẵn dạng có dấu `/` thì
 * mỗi lần quét QR bớt được một vòng đi–về. Cả hai dạng đều chạy đúng.
 */
export function urlLop(maLop: string, base = 'https://truongvietanh.com'): string {
  return `${base}/ketnoi/?lop=${encodeURIComponent(maLop)}`;
}
