// Bộ tài liệu "Kỷ luật tích cực Việt Anh" — 8 bài, ban hành kèm Quyết định
// số 0909.CEO/2026/QĐ-MAJOR ngày 9/9/2026 của Chủ tịch Công ty CP Major Education.
//
// Thân bài nằm ở src/data/ky-luat-tich-cuc/<slug>.html (HTML thuần, sinh bằng
// scripts/tach-noi-dung-kltc.mjs từ thư mục Web_KLTC do ban soạn thảo gửi).
// File này chỉ giữ phần "khung": thứ tự, tiêu đề, mô tả, file Word đính kèm.
// Menu "Chương trình → Kỷ luật tích cực" trỏ về Bài 01 (KLTC_BASE).

export const KLTC_BASE = '/chuong-trinh/ky-luat-tich-cuc';
export const KLTC_QUYET_DINH = 'Quyết định số 0909.CEO/2026/QĐ-MAJOR';
export const KLTC_NGAY_BAN_HANH = '2026-09-09';
export const KLTC_NGAY_BAN_HANH_VN = '9/9/2026';

export interface BaiKLTC {
  /** "01" … "08" */
  so: string;
  /** Tên file thân bài trong src/data/ky-luat-tich-cuc/ (không đuôi). Bài 01 là "index". */
  slug: string;
  /** Đường dẫn tuyệt đối trên site, KHÔNG có dấu / cuối. */
  path: string;
  /** Tiêu đề đầy đủ hiện ở H1 (không kèm "Bài NN —"). */
  tieuDe: string;
  /** Tên ngắn dùng ở mục lục / nav trước-sau. */
  tieuDeNgan: string;
  /** Một câu mô tả — hiện dưới mục lục và làm meta description. */
  moTa: string;
  /** File Word gốc trong public/downloads/kltc/. */
  docx: string;
}

export const baiKLTC: BaiKLTC[] = [
  {
    so: '01',
    slug: 'index',
    path: KLTC_BASE,
    tieuDe: 'Quy định hỗ trợ học sinh phát triển hành vi tích cực',
    tieuDeNgan: 'Quy định hỗ trợ hành vi tích cực',
    moTa:
      'Văn bản gốc 17 điều: mục đích, năm niềm tin, mười nguyên tắc, năm câu hỏi vàng, 5 Nội quy, quy trình 6 bước, ba tầng hỗ trợ, biện pháp theo Thông tư 19, quyền của học sinh và gia đình.',
    docx: 'TL01_Quy_dinh_ho_tro_hanh_vi_tich_cuc_v1.0.docx',
  },
  {
    so: '02',
    slug: '02-lan-ranh-do',
    path: `${KLTC_BASE}/02-lan-ranh-do`,
    tieuDe: 'Lằn ranh đỏ của Trường Việt Anh',
    tieuDeNgan: 'Lằn ranh đỏ',
    moTa:
      'Mười điều người lớn không bao giờ làm với học sinh — và cách xử lý khi có người vượt lằn ranh. Song ngữ Việt – Anh.',
    docx: 'TL02_Lan_ranh_do_v1.0.docx',
  },
  {
    so: '03',
    slug: '03-bo-cong-cu-tang-1',
    path: `${KLTC_BASE}/03-bo-cong-cu-tang-1`,
    tieuDe: 'Bộ công cụ tầng 1',
    tieuDeNgan: 'Bộ công cụ tầng 1',
    moTa:
      'Sơ đồ 6 bước, thẻ bỏ túi 5 câu hỏi vàng, Ma trận Kỳ vọng 5 Nội quy × 7 địa điểm, họp lớp 15 phút.',
    docx: 'TL03_Bo_cong_cu_tang_1_v1.0.docx',
  },
  {
    so: '04',
    slug: '04-ma-tran-ho-tro-hanh-vi',
    path: `${KLTC_BASE}/04-ma-tran-ho-tro-hanh-vi`,
    tieuDe: 'Ma trận Hỗ trợ hành vi',
    tieuDeNgan: 'Ma trận Hỗ trợ hành vi',
    moTa:
      '27 tình huống thường gặp: điều cần tìm hiểu, kỹ năng cần dạy, khắc phục gợi ý, thẩm quyền và biện pháp theo Thông tư 19.',
    docx: 'TL04_Ma_tran_ho_tro_hanh_vi_v1.0.docx',
  },
  {
    so: '05',
    slug: '05-bo-bon-bieu-mau',
    path: `${KLTC_BASE}/05-bo-bon-bieu-mau`,
    tieuDe: 'Bộ bốn biểu mẫu',
    tieuDeNgan: 'Bộ bốn biểu mẫu',
    moTa:
      'F01 Phiếu ghi nhận hành vi · F02 PDR hành vi · F03 Kế hoạch hỗ trợ cá nhân · F04 Biên bản họp gia đình.',
    docx: 'TL05_Bo_bon_bieu_mau_v1.0.docx',
  },
  {
    so: '06',
    slug: '06-huong-dan-tang-2-3',
    path: `${KLTC_BASE}/06-huong-dan-tang-2-3`,
    tieuDe: 'Hướng dẫn tầng 2 – 3',
    tieuDeNgan: 'Hướng dẫn tầng 2 – 3',
    moTa:
      'Plan B, bảng bốn mục tiêu sai lầm, Check-in/Check-out, trò chuyện phục hồi, kế hoạch cá nhân theo chức năng hành vi, Ban Hành vi tích cực.',
    docx: 'TL06_Huong_dan_tang_2-3_v1.0.docx',
  },
  {
    so: '07',
    slug: '07-an-toan-va-bao-ve-hoc-sinh',
    path: `${KLTC_BASE}/07-an-toan-va-bao-ve-hoc-sinh`,
    tieuDe: 'Quy trình An toàn và Bảo vệ học sinh',
    tieuDeNgan: 'An toàn và Bảo vệ học sinh',
    moTa:
      'Nhóm C: đánh nhau, bắt nạt, thuốc lá và chất kích thích, hành vi tình dục, xâm hại, tự hại, phát ngôn trên mạng, trộm cắp, vật nguy hiểm.',
    docx: 'TL07_An_toan_va_bao_ve_hoc_sinh_v1.0.docx',
  },
  {
    so: '08',
    slug: '08-phu-luc-noi-tru',
    path: `${KLTC_BASE}/08-phu-luc-noi-tru`,
    tieuDe: 'Phụ lục Nội trú',
    tieuDeNgan: 'Phụ lục Nội trú',
    moTa: 'Kỷ luật tích cực trong ký túc xá Việt Anh Gò Vấp và Việt Anh Bình Tân.',
    docx: 'TL08_Phu_luc_noi_tru_v1.0.docx',
  },
];

export function docxUrl(bai: BaiKLTC): string {
  return `/downloads/kltc/${bai.docx}`;
}
