// =====================================================================
// TRANG KẾT NỐI PHỤ HUYNH MẦM NON — /ketnoi-mam-non/
// Một trang, 3 nút bấm tới 3 kênh chính thức. Không có ?lop= như /ketnoi vì
// mầm non không chia nhóm Zalo theo lớp. Trang KHÔNG hiện mã QR (Văn bỏ 11/09/2026);
// mã QR để in nằm ở docs/ketnoi-mam-non/qr/.
//
// ĐÂY LÀ NƠI DUY NHẤT KHAI BÁO LINK. Sửa ở đây, trang tự đổi theo.
// ⚠️ Đổi URL xong PHẢI sinh lại mã QR in, nếu không nút bấm trỏ một đằng còn
//    mã QR đã in/dán vẫn trỏ đường cũ:   node scripts/sinh-qr-ketnoi-mam-non.mjs
//    Chỉ kiểm (không ghi):            node scripts/sinh-qr-ketnoi-mam-non.mjs --kiem
// =====================================================================
// Có đuôi .ts để script Node (scripts/sinh-qr-ketnoi-mam-non.mjs) import thẳng được;
// tsconfig của Astro bật allowImportingTsExtensions nên astro check không kêu.
import { mnFacts } from './mam-non-govap-facts.ts';

export type KenhKetNoi = {
  /** Khoá ổn định — dùng làm id phần tử, tên file QR, tên sự kiện GA4 */
  id: 'fb-mam-non' | 'fb-truong' | 'youtube';
  /** Nền tảng → chọn icon + màu */
  nen: 'facebook' | 'youtube';
  /** Dòng lớn trên nút, vd "Facebook" */
  ten: string;
  /** Dòng nhỏ dưới tên, vd "Mầm non Việt Anh" */
  phu: string;
  /** URL THẬT của kênh — cũng là nội dung mã QR in */
  url: string;
  /** Việc ba mẹ cần làm sau khi mở link */
  hanhDong: string;
  /** Vì sao nên theo dõi kênh này */
  moTa: string;
  /** Tên sự kiện GA4 khi bấm nút */
  ev: string;
};

// Đã kiểm chứng 11/09/2026 bằng cách mở thật từng trang:
//   · facebook.com/mamnonVietAnh    → "Mầm Non Việt Anh", 3,9K người theo dõi,
//                                     573 Lê Đức Thọ, Gò Vấp — đúng cơ sở mầm non ✓
//   · facebook.com/truongvietanhhcm → "Trường Việt Anh", 13K người theo dõi ✓
//   · youtube.com/@truongvietanhhcm → "Trường Việt Anh - YouTube", HTTP 200 ✓
// (Xem thêm ghi chú ở src/data/ketnoi-lop.ts về 2 link SAI hay bị chép nhầm:
//  facebook.com/truongvietanh là trang cá nhân, youtube.com/@truongvietanh 404.)
export const KENH: KenhKetNoi[] = [
  {
    id: 'fb-mam-non',
    nen: 'facebook',
    ten: 'Facebook',
    phu: 'Mầm non Việt Anh',
    url: 'https://www.facebook.com/mamnonVietAnh/',
    hanhDong: 'Bấm Theo dõi (Follow) trang',
    moTa: 'Hình ảnh lớp con mỗi ngày, thực đơn, lịch sự kiện và thông báo của cơ sở mầm non.',
    ev: 'facebook_mamnon_click',
  },
  {
    id: 'fb-truong',
    nen: 'facebook',
    ten: 'Facebook',
    phu: 'Trường Việt Anh',
    url: 'https://www.facebook.com/truongvietanhhcm/',
    hanhDong: 'Bấm Theo dõi (Follow) trang',
    moTa: 'Tin chung toàn hệ thống Việt Anh: chính sách, học bổng, lộ trình lên Tiểu học.',
    ev: 'facebook_truong_click',
  },
  {
    id: 'youtube',
    nen: 'youtube',
    ten: 'YouTube',
    phu: 'Trường Việt Anh',
    url: 'https://www.youtube.com/@truongvietanhhcm',
    hanhDong: 'Bấm Đăng ký (Subscribe) kênh',
    moTa: 'Video hoạt động, chương trình học và những khoảnh khắc của các con tại trường.',
    ev: 'youtube_click',
  },
];

// Liên hệ — lấy từ nguồn sự thật của cơ sở mầm non Gò Vấp, không chép tay.
// Trang Facebook Mầm Non Việt Anh cũng ghi đúng số này (077 458 8988).
export const HOTLINE = mnFacts.hotlineMamNon; // '0774 588 988'
export const HOTLINE_TEL = HOTLINE.replace(/\D/g, '');
export const DIA_CHI = mnFacts.address;
export const EMAIL = 'mamnon@truongvietanh.com';

/** URL công khai của trang — nội dung của mã QR CHUNG (dán bảng tin, thư mời). */
export const URL_TRANG = 'https://truongvietanh.com/ketnoi-mam-non/';
