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
];
const thcsBenefits = [
  'Tăng EQ và biết quản lý cảm xúc',
  'Tự tin giao tiếp tiếng Anh thực chiến',
  'Giảm nghiện game, gắn kết hơn với ba mẹ',
];
const thptBenefits = [
  'Tăng 0.5–1.0 band IELTS thực chiến',
  'Làm chủ AI qua dự án thực tế',
  'Xác định ngành phù hợp và xây dựng hồ sơ ấn tượng',
];

export function getVSLContent(level: VSLLevel, location: string) {
  if (level === 'tieu-hoc') {
    return {
      levelLabel: 'Tiểu học',
      campLabel: 'Lãnh Đạo Tiểu học',
      headline: 'Con bạn đang lớn lên… hay đang bị nghiện màn hình mà không biết?',
      microProof: [
        'Hơn 2.000 bé đã tham gia Lion Camp',
        '89% phụ huynh thấy con thay đổi rõ sau 6 tuần',
        'Lớp nhỏ chỉ 15–18 bé',
      ],
      subheadline: 'Nếu không can thiệp sớm, thói quen này sẽ theo con lên cấp 2 và khó sửa sau này.',
      hookParagraph: 'Ba/Mẹ lo bé suốt ngày dán mắt vào iPad, thiếu tự lập và ngại giao tiếp?',
      hookBullets: 'Điều mà 90% phụ huynh nhận ra quá muộn — và cách Lion Camp giúp bé "lột xác" chỉ sau 6 tuần.',
      benefits: tieuHocBenefits,
      ctaPrimary: 'XEM VIDEO 60 GIÂY: Bé sẽ thay đổi thế nào chỉ sau 1 mùa hè?',
      ctaZalo: 'Không muốn xem video? Nhận báo cáo đánh giá kỹ năng bé miễn phí qua Zalo ngay',
      ctaZaloShort: 'Tư vấn thêm qua Zalo ngay',
      ctaPrimaryTY: 'TÔI MUỐN GIỮ SUẤT 500K & NHẬN HỌC BỔNG CHO CON NGAY!',
      ctaZaloTY: 'Tôi cần tư vấn thêm trước khi giữ chỗ – Chat Zalo ngay',
      bonusIntro: 'Vì Ba/Mẹ đã xem hết video, em xin dành ưu đãi đặc biệt:',
      bonusItems: [
        'Học bổng Early Bird cao nhất hiện có',
        'Quà tặng balo Oxford + sách tiếng Anh',
        'Giữ chỗ chỉ với 500.000 VNĐ (hoàn lại 100% nếu đổi ý)',
      ],
      tyMessage: `<p>Dạ chào Ba/Mẹ,</p><p>Cảm ơn Ba/Mẹ vì đã xem hết Video Sales Letter. Điều này cho thấy Ba/Mẹ đang rất nghiêm túc với mùa hè của bé.</p><p><strong>Báo cáo Đánh giá Kỹ năng Hè Cá nhân hóa</strong> đã được gửi vào Zalo và Email của Ba/Mẹ.</p>`,
      signOff: `Cảm ơn Ba/Mẹ đã dành thời gian cho bé.<br/>Em rất mong được đồng hành cùng gia đình trong một mùa hè giúp con bứt phá!<br/><br/>Trân trọng,<br/><b>Ban Tuyển sinh Trại hè Việt Anh ${location}</b>`,
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
      hookBullets: 'Điều mà hầu hết phụ huynh THCS nhận ra quá muộn — và cách Lion Camp giúp con vượt bão dậy thì chỉ sau 6 tuần.',
      benefits: thcsBenefits,
      ctaPrimary: 'XEM VIDEO 60 GIÂY: Con sẽ thay đổi ra sao sau "bão dậy thì"?',
      ctaZalo: 'Bé nhà tôi hơi bướng & khó thuyết phục, cần Thầy/Cô tư vấn qua Zalo ngay',
      ctaZaloShort: 'Tư vấn thêm qua Zalo ngay',
      ctaPrimaryTY: 'BẤM VÀO ĐÂY ĐỂ GIỮ SUẤT AN TOÀN CHỈ VỚI 500K!',
      ctaZaloTY: 'Bé nhà tôi hơi bướng & khó thuyết phục, Thầy/Cô tư vấn thêm qua Zalo',
      bonusIntro: 'Chỉ cần cọc trước 500.000 VNĐ, Ba/Mẹ khóa ngay suất học và học bổng cao nhất. Nếu con không đồng ý đi — hoàn lại 100% tiền cọc.',
      bonusItems: [
        'Học bổng Early Bird cao nhất hiện có',
        'Bảng hướng dẫn nói chuyện với con tuổi dậy thì',
        'Giữ chỗ chỉ với 500.000 VNĐ (hoàn lại 100%)',
      ],
      tyMessage: `<p>Dạ chào Ba/Mẹ,</p><p>Việc Ba/Mẹ xem hết Video vừa rồi chứng tỏ Ba/Mẹ đang rất <strong>trăn trở tìm cách giúp bé vượt qua "bão dậy thì"</strong> một cách tích cực nhất.</p><p>Để con không phải cắm mặt vào game hay xa cách với gia đình trong 3 tháng hè tới, <strong>Lion Camp Trải Nghiệm</strong> chính là môi trường con cần.</p>`,
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
    hookBullets: 'Điều mà 90% phụ huynh THPT nhận ra quá muộn — và cách Lion Camp giúp con tạo lợi thế xét tuyển đại học chỉ sau 6 tuần.',
    benefits: thptBenefits,
    ctaPrimary: 'XEM VIDEO 60 GIÂY: Tương lai đại học của con bắt đầu từ hè này',
    ctaZalo: 'Con tôi đang mông lung ngành nghề, cần tư vấn qua Zalo ngay',
    ctaZaloShort: 'Tư vấn hướng nghiệp qua Zalo',
    ctaPrimaryTY: 'TÔI MUỐN GIỮ SUẤT 500K & NHẬN HỌC BỔNG CHO CON NGAY!',
    ctaZaloTY: 'Tôi cần tư vấn thêm vì con đang mông lung về ngành nghề',
    bonusIntro: 'Nếu Ba/Mẹ giữ chỗ trong hôm nay, em sẽ dành thêm:',
    bonusItems: [
      'Học bổng Early Bird cao nhất',
      'Bảng so sánh ngành hot 2026–2030',
      'Giữ chỗ chỉ với 500.000 VNĐ (hoàn lại 100% nếu đổi ý)',
    ],
    tyMessage: `<p>Dạ chào Ba/Mẹ,</p><p>Cảm ơn Ba/Mẹ vì đã dành thời gian xem hết Video Sales Letter về <strong>Trại Hè Hướng Nghiệp THPT Lion Camp 2026</strong>. Điều này cho thấy Ba/Mẹ đang rất nghiêm túc với tương lai đại học của con.</p><p><strong>Báo cáo Đánh giá IELTS + Định hướng Đại học</strong> đã được gửi vào Zalo và Email của Ba/Mẹ.</p>`,
    signOff: `Trân trọng,<br/><b>Cô Lan – Phụ trách Trại hè Hướng Nghiệp THPT Việt Anh ${location}</b>`,
  };
}
