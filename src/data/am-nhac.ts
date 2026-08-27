// =====================================================================
// THƯ VIỆN ÂM NHẠC TRƯỜNG VIỆT ANH — nguồn dữ liệu cho trang /am-nhac
// Một nguồn sự thật duy nhất. Thêm bài mới = thêm 1 object vào `baiHatList`.
// KHÔNG sửa markup trang /am-nhac khi chỉ muốn đăng thêm bài.
// =====================================================================
//
// ---------------------------------------------------------------------
// CÁCH ĐĂNG MỘT BÀI HÁT MỚI (3 bước)
// ---------------------------------------------------------------------
// 1. Upload file nhạc lên R2 (bucket truongvietanh-media), thư mục `audio/`:
//
//      wrangler r2 object put truongvietanh-media/audio/ten-bai-hat.mp3 \
//        --file="D:/duong-dan/ten-bai-hat.mp3" --content-type="audio/mpeg" --remote
//
//    → File sẽ có URL: https://media.truongvietanh.com/audio/ten-bai-hat.mp3
//
//    ⚠️ LUÔN dùng tên miền media.truongvietanh.com cho audio.
//    KHÔNG dùng dạng /media/audio/... (proxy trong staging-worker.js chưa hỗ trợ
//    HTTP Range) — iPhone/Safari sẽ KHÔNG phát được và thanh tua sẽ chết.
//    Cách khác cũng an toàn: bỏ file vào public/am-nhac/ rồi trỏ /am-nhac/ten-bai.mp3
//    (Workers Assets hỗ trợ Range sẵn) — hợp với file nhỏ, ít bài.
//
// 2. Ảnh bìa (không bắt buộc): upload tương tự vào `images/am-nhac/`,
//    dùng .webp 800x800, dưới 120 KB.
//
// 3. Thêm một object vào `baiHatList` bên dưới. Chỉ `slug`, `tieuDe`, `sangTac`,
//    `danhMuc`, `trangThai` là bắt buộc — còn lại thiếu thì trang tự ẩn.
//
// Bài chưa có file nhạc: cứ khai `trangThai: 'sap-ra-mat'` và bỏ trống `audioUrl`
// — trang vẫn hiện tên bài + tác giả kèm nhãn "Sắp ra mắt", không hiện nút phát.
// =====================================================================

export type MaDanhMuc = 'truyen-thong' | 'thay-co' | 'su-kien' | 'mam-non';

export type TrangThaiBaiHat = 'da-phat-hanh' | 'sap-ra-mat';

export type BaiHat = {
  /** ID ổn định, dùng cho anchor #slug và deep-link. Không đổi sau khi đã đăng. */
  slug: string;
  tieuDe: string;
  /** Người sáng tác — thầy/cô trong trường, ghi đầy đủ họ tên. */
  sangTac: string;
  /** Chức danh / cơ sở của tác giả. VD: 'Giáo viên Âm nhạc — Cơ sở Gò Vấp' */
  vaiTro?: string;
  /** Người viết lời, chỉ khai khi khác người sáng tác nhạc. */
  vietLoi?: string;
  /** Người trình bày: ca sĩ, tốp ca giáo viên, đội văn nghệ học sinh… */
  theHien?: string;
  namSangTac?: number;
  danhMuc: MaDanhMuc;
  /** 1–2 câu về hoàn cảnh sáng tác — phần này giúp bài lên tốt trên Google/AI. */
  moTa?: string;
  /** URL file nhạc. Bắt buộc nếu trangThai = 'da-phat-hanh'. */
  audioUrl?: string;
  /** ID video YouTube (nếu ca khúc có MV). VD: 'Bt1yyMil3Tg' */
  youtubeId?: string;
  /** Ảnh bìa vuông. Thiếu thì trang dùng ảnh mặc định theo danh mục. */
  anhBia?: string;
  /** Thời lượng dạng 'm:ss' — hiện ngay khi tải trang, trước khi audio nạp xong. */
  thoiLuong?: string;
  /** Lời bài hát. Xuống dòng bằng \n, cách khổ bằng \n\n. */
  loiBaiHat?: string;
  /** Cho phép phụ huynh/giáo viên tải file về (mặc định: có). */
  choPhepTaiVe?: boolean;
  trangThai: TrangThaiBaiHat;
  /** Ngày đăng lên website, dạng YYYY-MM-DD. Dùng để sắp xếp mới → cũ. */
  ngayDang?: string;
};

export const danhMucList: {
  ma: MaDanhMuc;
  ten: string;
  icon: string;
  moTa: string;
}[] = [
  {
    ma: 'truyen-thong',
    ten: 'Ca khúc truyền thống',
    icon: '🎓',
    moTa:
      'Những ca khúc gắn với tên trường, hát trong lễ khai giảng, lễ tổng kết và lễ trưởng thành của Trường Việt Anh.',
  },
  {
    ma: 'thay-co',
    ten: 'Thầy cô sáng tác',
    icon: '🎼',
    moTa:
      'Sáng tác riêng của giáo viên Trường Việt Anh — viết cho học trò, cho đồng nghiệp và cho những mùa học đã đi qua.',
  },
  {
    ma: 'su-kien',
    ten: 'Nhạc sự kiện & lễ hội',
    icon: '🎪',
    moTa:
      'Nhạc nền và ca khúc chủ đề cho hội thao, hội xuân, Trung thu, Ngày hội lãnh đạo và các chương trình lớn của trường.',
  },
  {
    ma: 'mam-non',
    ten: 'Nhạc thiếu nhi mầm non',
    icon: '🧸',
    moTa:
      'Bài hát ngắn, giai điệu đơn giản, dùng trong giờ học và giờ chơi của các bé Mầm non Việt Anh.',
  },
];

// =====================================================================
// DANH SÁCH CA KHÚC
// ---------------------------------------------------------------------
// MẪU — copy nguyên khối này, bỏ dấu comment rồi điền thông tin thật:
//
//   {
//     slug: 'viet-anh-mai-trong-tim',
//     tieuDe: 'Việt Anh Mãi Trong Tim',
//     sangTac: 'Thầy Nguyễn Văn A',
//     vaiTro: 'Giáo viên Âm nhạc — Cơ sở Gò Vấp',
//     vietLoi: 'Cô Trần Thị B',
//     theHien: 'Tốp ca giáo viên Trường Việt Anh',
//     namSangTac: 2026,
//     danhMuc: 'truyen-thong',
//     moTa: 'Viết cho lễ kỷ niệm 15 năm thành lập trường, ra mắt tại lễ tổng kết năm học 2025–2026.',
//     audioUrl: 'https://media.truongvietanh.com/audio/viet-anh-mai-trong-tim.mp3',
//     youtubeId: '',
//     thoiLuong: '4:12',
//     loiBaiHat: `Mái trường thân yêu nơi con lớn khôn\nThầy cô bên con qua bao mùa thi...`,
//     choPhepTaiVe: true,
//     trangThai: 'da-phat-hanh',
//     ngayDang: '2026-08-27',
//   },
//
// =====================================================================

export const baiHatList: BaiHat[] = [
  // ⬇️ Thêm ca khúc vào đây. Xem khối mẫu ở trên.
];

// ---------------------------------------------------------------------
// Tiện ích dùng trong trang — không cần sửa khi thêm bài.
// ---------------------------------------------------------------------

/** Bài đã phát hành xếp trước, trong mỗi nhóm thì mới đăng xếp trước. */
export function sapXepBaiHat(list: BaiHat[]): BaiHat[] {
  return [...list].sort((a, b) => {
    if (a.trangThai !== b.trangThai) return a.trangThai === 'da-phat-hanh' ? -1 : 1;
    return (b.ngayDang || '').localeCompare(a.ngayDang || '');
  });
}

/** Số tác giả riêng biệt — dùng cho ô số liệu ở đầu trang. */
export function demTacGia(list: BaiHat[]): number {
  return new Set(list.map((b) => b.sangTac.trim()).filter(Boolean)).size;
}

/** 'm:ss' → giây. Trả về 0 nếu không hợp lệ. Dùng cho schema `duration`. */
export function thoiLuongRaGiay(t?: string): number {
  if (!t) return 0;
  const phan = t.split(':').map((n) => parseInt(n, 10));
  if (phan.some(Number.isNaN)) return 0;
  if (phan.length === 3) return phan[0] * 3600 + phan[1] * 60 + phan[2];
  if (phan.length === 2) return phan[0] * 60 + phan[1];
  return 0;
}

/** Giây → ISO 8601 duration cho schema.org (PT4M12S). */
export function giayRaISO(giay: number): string {
  if (!giay) return '';
  const p = Math.floor(giay / 60);
  const s = giay % 60;
  return `PT${p}M${s}S`;
}

// ---------------------------------------------------------------------
// BẢN QUYỀN — điều khoản hiển thị trên trang.
// Sửa ở đây = đổi nội dung mục "Bản quyền & Điều khoản sử dụng".
// ---------------------------------------------------------------------

export const emailBanQuyen = 'info@truongvietanh.com';
export const zaloBanQuyen = 'https://zalo.me/1678310120468101523';

export const duocPhep: string[] = [
  'Nghe trực tuyến và tải về cho nhu cầu cá nhân của học sinh, phụ huynh và cán bộ giáo viên Trường Việt Anh.',
  'Sử dụng trong hoạt động dạy học, sinh hoạt lớp, văn nghệ và sự kiện nội bộ của Trường Việt Anh.',
  'Chia sẻ nguyên vẹn đường dẫn trang truongvietanh.com/am-nhac lên mạng xã hội hoặc nhóm lớp.',
  'Báo chí, truyền hình đưa tin về nhà trường được trích dùng, kèm ghi rõ nguồn theo mẫu bên dưới.',
];

export const canXinPhep: string[] = [
  'Dùng cho mục đích thương mại: quảng cáo, bán vé, kinh doanh sản phẩm có gắn ca khúc.',
  'Phối lại (remix), làm lời mới, dịch lời, cover và phát hành dưới tên cá nhân hoặc đơn vị khác.',
  'Đăng tải lại file nhạc lên nền tảng khác (YouTube, TikTok, Spotify, Zing MP3…) dưới danh nghĩa người khác.',
  'Sử dụng trong chương trình, ấn phẩm hoặc tài liệu tuyển sinh của đơn vị giáo dục khác.',
];

/** Mẫu ghi nguồn khi báo chí / đối tác trích dùng. */
export const mauGhiNguon =
  'Nguồn: Trường Việt Anh (truongvietanh.com/am-nhac) — Bản quyền thuộc Trường Việt Anh.';

// ---------------------------------------------------------------------
// GỬI TÁC PHẨM — hướng dẫn cho thầy cô.
// ---------------------------------------------------------------------

export const yeuCauGuiBai: string[] = [
  'File nhạc: MP3 từ 192 kbps trở lên, hoặc WAV. Nếu chỉ có bản thu bằng điện thoại, cứ gửi — nhà trường hỗ trợ thu lại.',
  'Lời bài hát: gõ đầy đủ trong file Word hoặc ngay trong nội dung email.',
  'Thông tin tác giả: họ tên, chức danh, cơ sở đang công tác.',
  'Hoàn cảnh sáng tác: 2–3 câu về lý do và dịp viết ca khúc.',
  'Bản nhạc (sheet) và ảnh bìa nếu có — không bắt buộc.',
];

export const cacBuocGuiBai: { buoc: string; tieuDe: string; moTa: string }[] = [
  {
    buoc: '01',
    tieuDe: 'Chuẩn bị tác phẩm',
    moTa:
      'Thu âm hoặc tập hợp file nhạc, gõ lời bài hát và ghi lại vài dòng về hoàn cảnh sáng tác.',
  },
  {
    buoc: '02',
    tieuDe: 'Gửi về nhà trường',
    moTa:
      'Gửi qua email hoặc Zalo của trường. File nặng thì gửi link Google Drive, nhớ mở quyền xem cho người có link.',
  },
  {
    buoc: '03',
    tieuDe: 'Nhà trường rà soát',
    moTa:
      'Bộ phận truyền thông kiểm tra chất lượng file, xác nhận thông tin tác giả và thống nhất phạm vi sử dụng với thầy cô.',
  },
  {
    buoc: '04',
    tieuDe: 'Đăng lên thư viện',
    moTa:
      'Ca khúc lên trang trong vòng 7 ngày làm việc, ghi rõ tên tác giả. Thầy cô nhận đường dẫn riêng để chia sẻ.',
  },
];
