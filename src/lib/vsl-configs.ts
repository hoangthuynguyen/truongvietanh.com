export type VSLLevel = 'tieu-hoc' | 'thcs' | 'thpt';

export interface VSLLocationConfig {
  slug: string;
  location: string;
  level: VSLLevel;
}

export const ZALO_URL = 'https://zalo.me/0916961409';

const tieuHocBenefits = [
  'Cai nghiện màn hình vui vẻ',
  'Tăng tự lập và lãnh đạo bản thân',
  'Tự tin nói tiếng Anh với giáo viên bản ngữ',
  'Làm chủ AI phù hợp lứa tuổi theo khung UNESCO',
];
const thcsBenefits = [
  'Tăng EQ và biết quản lý cảm xúc',
  'Tự tin giao tiếp tiếng Anh thực chiến',
  'Giảm nghiện game, gắn kết hơn với ba mẹ',
  'Dự án AI thực tế + tư duy phản biện',
];
const thptBenefits = [
  'Tăng 0.5–1.0 band IELTS thực chiến',
  'Làm chủ AI qua dự án thực tế',
  'Xác định ngành phù hợp và xây dựng hồ sơ ấn tượng',
  'Kiến tập doanh nghiệp + thuyết trình tiếng Anh',
];

export function getVSLContent(level: VSLLevel, location: string) {
  if (level === 'tieu-hoc') {
    return {
      levelLabel: 'Tiểu học',
      campLabel: 'Lãnh Đạo Tiểu học',
      headline: 'Con bạn đang lớn lên… hay đang bị nghiện màn hình mà không biết?',
      microProof: [
        'Hơn 2.000 bé đã tham gia Trại Hè Lion Camp',
        '89% phụ huynh thấy con thay đổi rõ sau 6 tuần',
        'Lớp nhỏ chỉ 15–18 bé',
      ],
      subheadline: 'Nếu không can thiệp sớm, thói quen này sẽ theo con lên cấp 2 và khó sửa sau này.',
      hookParagraph: 'Ba/Mẹ lo bé suốt ngày dán mắt vào iPad, thiếu tự lập và ngại giao tiếp?',
      hookBullets: 'Điều mà 90% phụ huynh nhận ra quá muộn — và cách Trại Hè Lion Camp giúp bé "lột xác" chỉ sau 6 tuần.',
      benefits: tieuHocBenefits,
      ctaPrimary: 'ĐĂNG KÝ TƯ VẤN MIỄN PHÍ — Nhận lộ trình Trại Hè Lion Camp cho bé',
      ctaZalo: 'Nhận báo cáo đánh giá kỹ năng bé miễn phí qua Zalo ngay',
      ctaZaloShort: 'Tư vấn thêm qua Zalo ngay',
      ctaPrimaryTY: 'TÔI MUỐN ĐĂNG KÝ TƯ VẤN 1:1 CHO CON NGAY!',
      ctaZaloTY: 'Tôi cần trao đổi thêm – Chat Zalo với tư vấn viên ngay',
      bonusIntro: 'Khi đăng ký tư vấn hôm nay, Ba/Mẹ sẽ nhận:',
      bonusItems: [
        'Báo cáo đánh giá kỹ năng cá nhân hóa cho bé',
        'Lộ trình Trại Hè Lion Camp 6 tuần phù hợp',
        'Ưu đãi Early Bird khi đăng ký trong đợt tư vấn',
      ],
      tyMessage: `<p>Dạ chào Ba/Mẹ,</p><p>Cảm ơn Ba/Mẹ đã đăng ký tư vấn. <strong>Tư vấn viên sẽ gọi/Zalo trong 24 giờ</strong> để trao đổi chi tiết về chương trình phù hợp cho bé.</p><p><strong>Báo cáo Đánh giá Kỹ năng Hè</strong> đã được gửi vào Email của Ba/Mẹ.</p>`,
      signOff: `Cảm ơn Ba/Mẹ đã dành thời gian cho bé.<br/>Em rất mong được đồng hành cùng gia đình!<br/><br/>Trân trọng,<br/><b>Ban Tuyển sinh Trại hè Việt Anh ${location}</b>`,
    };
  }
  if (level === 'thcs') {
    return {
      levelLabel: 'THCS',
      campLabel: 'Trải Nghiệm THCS',
      headline: 'Con bạn đang vào đời… hay đang chìm sâu vào màn hình và "bão dậy thì"?',
      microProof: [
        'Hơn 1.800 học sinh THCS đã tham gia',
        '89% phụ huynh thấy con thay đổi rõ sau 6 tuần',
        'Lớp nhỏ chỉ 15–18 em',
      ],
      subheadline: 'Đây là giai đoạn duy nhất con hình thành EQ — nếu bỏ lỡ sẽ rất khó sửa sau này.',
      hookParagraph: 'Ba/Mẹ đang thấy con cãi lại, thu mình, nghiện game và dần xa cách với gia đình?',
      hookBullets: 'Điều mà hầu hết phụ huynh THCS nhận ra quá muộn — và cách Trại Hè Lion Camp giúp con vượt bão dậy thì chỉ sau 6 tuần.',
      benefits: thcsBenefits,
      ctaPrimary: 'ĐĂNG KÝ TƯ VẤN MIỄN PHÍ — Tìm lộ trình phù hợp cho con',
      ctaZalo: 'Bé nhà tôi hơi bướng, cần Thầy/Cô tư vấn qua Zalo ngay',
      ctaZaloShort: 'Tư vấn thêm qua Zalo ngay',
      ctaPrimaryTY: 'ĐĂNG KÝ TƯ VẤN 1:1 ĐỂ HIỂU THÊM VỀ CHƯƠNG TRÌNH!',
      ctaZaloTY: 'Bé nhà tôi hơi bướng, Thầy/Cô tư vấn thêm qua Zalo',
      bonusIntro: 'Khi đăng ký tư vấn hôm nay, Ba/Mẹ sẽ nhận:',
      bonusItems: [
        'Báo cáo đánh giá EQ cá nhân hóa cho bé',
        'Hướng dẫn nói chuyện với con tuổi dậy thì',
        'Ưu đãi Early Bird khi đăng ký trong đợt tư vấn',
      ],
      tyMessage: `<p>Dạ chào Ba/Mẹ,</p><p>Ba/Mẹ đang rất <strong>trăn trở tìm cách giúp bé vượt qua "bão dậy thì"</strong>.</p><p><strong>Tư vấn viên sẽ liên hệ trong 24 giờ</strong> để trao đổi chi tiết về chương trình phù hợp cho bé.</p>`,
      signOff: `Trân trọng,<br/><b>Ban Tuyển sinh Trại hè Việt Anh ${location}</b>`,
    };
  }
  // thpt
  return {
    levelLabel: 'THPT',
    campLabel: 'Hướng Nghiệp THPT',
    headline: '90% học sinh lớp 10–12 đang tụt lại mà không biết — con bạn có nằm trong số đó?',
    microProof: [
      'Hơn 1.500 học sinh THPT đã tham gia',
      '89% phụ huynh thấy con thay đổi rõ sau 6 tuần',
      'Lớp nhỏ chỉ 15–18 em',
    ],
    subheadline: 'Trong khi con bạn đang chần chừ, nhiều học sinh khác đã bắt đầu chuẩn bị hồ sơ đại học từ lớp 10.',
    hookParagraph: 'Ba/Mẹ lo con vẫn mông lung ngành nghề, band IELTS thấp và hồ sơ ngoại khóa trống trơn?',
    hookBullets: 'Điều mà 90% phụ huynh THPT nhận ra quá muộn — và cách Trại Hè Lion Camp giúp con tạo lợi thế xét tuyển đại học chỉ sau 6 tuần.',
    benefits: thptBenefits,
    ctaPrimary: 'ĐĂNG KÝ TƯ VẤN HƯỚNG NGHIỆP MIỄN PHÍ CHO CON',
    ctaZalo: 'Con tôi đang mông lung ngành nghề, cần tư vấn qua Zalo ngay',
    ctaZaloShort: 'Tư vấn hướng nghiệp qua Zalo',
    ctaPrimaryTY: 'ĐĂNG KÝ TƯ VẤN HƯỚNG NGHIỆP 1:1 CHO CON NGAY!',
    ctaZaloTY: 'Tôi cần tư vấn thêm vì con đang mông lung về ngành nghề',
    bonusIntro: 'Khi đăng ký tư vấn hôm nay, Ba/Mẹ sẽ nhận:',
    bonusItems: [
      'Báo cáo đánh giá IELTS + định hướng đại học',
      'Bảng so sánh ngành hot 2026–2030',
      'Ưu đãi Early Bird khi đăng ký trong đợt tư vấn',
    ],
    tyMessage: `<p>Dạ chào Ba/Mẹ,</p><p>Cảm ơn Ba/Mẹ đã đăng ký tư vấn <strong>Trại Hè Hướng Nghiệp THPT Lion Camp 2026</strong>.</p><p><strong>Tư vấn viên sẽ liên hệ trong 24 giờ</strong> để trao đổi chi tiết về lộ trình IELTS + hướng nghiệp phù hợp cho con.</p><p><strong>Báo cáo Đánh giá</strong> đã được gửi vào Email của Ba/Mẹ.</p>`,
    signOff: `Trân trọng,<br/><b>Cô Lan – Phụ trách Trại hè Hướng Nghiệp THPT Việt Anh ${location}</b>`,
  };
}
