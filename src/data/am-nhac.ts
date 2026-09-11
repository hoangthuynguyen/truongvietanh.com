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
  /**
   * Ca khúc có dùng AI trong khâu phối khí / dựng bản thu.
   * Bật cờ này thì trang tự hiện nhãn minh bạch trên thẻ bài hát — theo tinh thần
   * Điều 11.4 Luật AI về gắn nhãn nội dung do AI tạo, và đúng cam kết ở /chinh-sach-ai.
   * CHỈ bật khi biết chắc; không rõ thì để trống.
   */
  aiHoTro?: boolean;
  /** Nói rõ phần nào do AI, phần nào do người. Hiện ngay dưới nhãn AI. */
  aiGhiChu?: string;
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
  {
    slug: 'we-are-leaders',
    tieuDe: 'We Are Leaders — Trường ca Việt Anh',
    sangTac: 'Nhạc sĩ Hoài An',
    theHien: 'Tốp ca Trường Việt Anh',
    danhMuc: 'truyen-thong',
    moTa:
      'Trường ca chính thức của Trường Việt Anh, viết ở nhịp D=138. Lời ca gói trọn 5 giá trị cốt lõi nhà trường theo đuổi — tôn trọng và tự trọng, trách nhiệm, tài giỏi, chính trực, yêu thương — cùng tinh thần “định thân”: mỗi người tự xác định nguyên tắc sống của mình và tuyên bố với thiên hạ.',
    audioUrl: 'https://media.truongvietanh.com/audio/we-are-leaders-top-ca.mp3',
    thoiLuong: '3:24',
    loiBaiHat: `Trên con đường dài chông gai
Với nhiều thử thách ngày mai
Vững tin ta bước, “chân cứng đá mềm”
Cùng nhau đi đến thành công

Biết tôn trọng và tự trọng từ tâm
Sống trách nhiệm, tài giỏi trong cộng đồng
Mãi luôn can đảm, chính trực tuyệt vời
Sống yêu thương, chan chứa cuộc đời

Trust yourself, test your limits
Have the grit to succeed
We are players, we are leaders
We are winners, winners…

Sẽ luôn trong ta niềm tin
Định thân cho ngày mai, và cố gắng
Chẳng có khó khăn nào kìm giữ được mình
Chỉ là thử thách mà thôi, hãy vững tin…

Sẽ luôn trong ta “Việt Anh”
Mái nhà thân thương trong tim
Kiến thức tương lai, cảm hứng cuộc đời
Sống hạnh phúc, có ích bạn ơi… cùng tôi`,
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
  {
    slug: 'viet-anh-ai-powered-school',
    tieuDe: 'Việt Anh — AI Powered School',
    sangTac: 'Trường Việt Anh',
    danhMuc: 'truyen-thong',
    moTa:
      'Anthem về 5 trụ cột AI của Việt Anh — AI Mastery, AI Mindset, AI Ethics, AI Application và Human in the Loop. Nhịp tăng dần từ 96 lên 128 BPM, giọng máy xen giọng người, chốt lại bằng thông điệp trung tâm: con người mới là người quyết định cuối cùng.',
    audioUrl: 'https://media.truongvietanh.com/audio/viet-anh-ai-powered-school.mp3',
    thoiLuong: '2:58',
    aiHoTro: true,
    aiGhiChu: 'Lời do Trường Việt Anh viết; phần phối khí và bản thu dựng bằng công cụ AI.',
    loiBaiHat: `[Intro — giọng máy]
“Hello Việt Anh… Leo online!”
Kỷ nguyên A-I đang gọi — are you ready? (Ready!)

[Verse 1]
Bình minh đang gọi tên ta, thế giới đổi thay từng giờ
Sóng A-I cuộn dâng cao — ta không đứng yên trên bờ
Lãnh đạo bản thân mỗi ngày, thầy trò bảo nhau rèn luyện
Thử thách nào cũng vượt qua — Việt Anh never backs down!

[Pre-Chorus — giọng máy gọi, người đáp]
(Mastery!) — Làm chủ AI trong tay
(Mindset!) — Tư duy sắc bén dựng xây
(Ethics!) — Vững vàng giữa thật và sai
(Application!) — Học sâu hơn, đi xa hơn mỗi ngày
Và trên tất cả… HUMAN IN THE LOOP — con người lãnh đạo!

[Chorus]
Ride the wave! Cưỡi lên con sóng!
Lead the way! Ta là người dẫn lối!
A-I trong tay, trái tim rực cháy
Việt Anh vươn xa — vươn xa hơn nữa!
(Oh-oh-oh… oh-oh-oh… AI Powered School!)

[Verse 2]
Đừng lo chi bạn ơi, nhìn quanh đây đồng đội
Cùng nắm tay tiến bước, không một ai đơn côi
Leo ơi! (“I'm here!”) — cùng ta học bài, giải đề
Người chỉ huy, máy đồng hành — that's how we lead, you'll see!

[Bridge — hỏi và đáp]
“Ai quyết định cuối cùng?” — CON NGƯỜI!
“Ai dẫn đầu kỷ nguyên?” — CHÚNG TA!
“Are you afraid?” — NO WAY!
“Then rise up, Việt Anh — LEAD THE WAY!”

[Outro]
“Leo luôn bên bạn — together we rise!”
Việt Anh — AI Powered School!`,
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
  {
    slug: 'loi-cam-ket',
    tieuDe: 'Lời Cam Kết',
    sangTac: 'Trường Việt Anh',
    danhMuc: 'su-kien',
    moTa:
      'Bài hát đinh của Lễ khai giảng: mỗi cấp lần lượt hô lên lời hứa của mình — Tiểu học giữ phẩm chất, THCS rèn kỹ năng, THPT học kiến thức, nội trú giữ sức khoẻ — rồi thầy cô, Student Office và các cô chú canteen cùng cam kết. Bài không gắn năm nên dùng lại được cho mọi mùa khai giảng.',
    audioUrl: 'https://media.truongvietanh.com/audio/loi-cam-ket.mp3',
    thoiLuong: '1:57',
    aiHoTro: true,
    aiGhiChu: 'Lời do Trường Việt Anh viết; phần phối khí và bản thu dựng bằng công cụ AI.',
    loiBaiHat: `[Intro — toàn trường hỏi đáp]
Ai hứa? (Mình hứa!) Ai làm? (Mình làm!)
Việt Anh ơi — lời cam kết hôm nay!

[Verse 1 — học sinh từng cấp]
(Tiểu học:) Tụi em Tiểu học — hứa chăm làm việc tốt
Cảm ơn, xin lỗi, nhường nhau — dễ thương… hết phần thiên hạ! (Phẩm chất!)

(THCS:) Tụi em cấp Hai — hứa giơ tay thật lớn
Dám hỏi, dám làm, dám sai — sai rồi làm lại, ngầu hơn! (Kỹ năng!)

(THPT:) Tụi anh cấp Ba — hứa học sâu hiểu kỹ
Mỗi ngày hỏi khó thầy cô — mà vẫn thương thầy cô nhất! (Kiến thức!)

(Đội nội trú:) Đội quân nội trú — hứa ngủ ngoan dậy sớm
Chăn gấp vuông như hộp quà — tự lập là… chuyện nhỏ! (Sức khoẻ!)

[Chorus — hoà ca toàn trường]
Hôm nay ta hứa! (ta hứa!) — Nói là làm! (là làm!)
Ngàn trái tim chung một lời hôm nay
Hôm nay ta hứa! (ta hứa!) — Nói là làm! (là làm!)
Việt Anh ơi — cam kết là giữ lời!

[Verse 2 — người lớn]
(Thầy cô:) Thầy cô xin hứa — làm gương đi trước
Em bước một bước — có thầy cô kề bên một bước!

(Hiệu trưởng:) Thầy hứa cả trường một điều trọn vẹn:
Kiến thức — Kỹ năng — Phẩm chất — Sức khoẻ!
Đủ cả bốn — không thiếu điều nào!

(Student Office:) Student Office đây — cần gì cứ gọi!
Bất cứ điều gì, bất cứ khi nào — chưa kịp gọi… đã thấy có mặt!

(Cô chú canteen:) Canteen xin hứa — cơm nóng canh ngọt
Ăn vì sức khoẻ mà ngon quên lối về — rau cũng… hết sạch luôn!

[Outro]
Ai hứa? (Mình hứa!) Ai giữ? (Mình giữ!)
Việt Anh — cam kết — GIỮ LỜI!`,
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
  {
    slug: 'leadership-day-song',
    tieuDe: 'Leadership Day Song',
    sangTac: 'Trường Việt Anh',
    danhMuc: 'su-kien',
    moTa: 'Ca khúc chủ đề cho Ngày hội Lãnh đạo (Leadership Day) của Trường Việt Anh.',
    audioUrl: 'https://media.truongvietanh.com/audio/leadership-day-song.mp3',
    thoiLuong: '3:25',
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
  {
    slug: 'lion-camp',
    tieuDe: 'Lion Camp',
    sangTac: 'Trường Việt Anh',
    danhMuc: 'su-kien',
    moTa: 'Ca khúc chủ đề của trại hè Lion Camp — chương trình trải nghiệm ngoài lớp học của học sinh Việt Anh.',
    audioUrl: 'https://media.truongvietanh.com/audio/lion-camp.mp3',
    thoiLuong: '1:52',
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
  {
    slug: 'tam-chia-tay-lop-12',
    tieuDe: 'Tạm Chia Tay — Lớp 12',
    sangTac: 'Trường Việt Anh',
    danhMuc: 'su-kien',
    moTa: 'Ca khúc dành cho lễ trưởng thành và buổi chia tay của học sinh khối 12 Trường Việt Anh.',
    audioUrl: 'https://media.truongvietanh.com/audio/tam-chia-tay-lop-12.mp3',
    thoiLuong: '3:30',
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
  {
    slug: 'moi-ngay',
    tieuDe: '1% Mỗi Ngày',
    sangTac: 'Trường Việt Anh',
    danhMuc: 'su-kien',
    audioUrl: 'https://media.truongvietanh.com/audio/moi-ngay.mp3',
    thoiLuong: '1:57',
    trangThai: 'da-phat-hanh',
    ngayDang: '2026-09-07',
  },
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
