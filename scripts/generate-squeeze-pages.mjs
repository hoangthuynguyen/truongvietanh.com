#!/usr/bin/env node
/**
 * Generate squeeze landing pages from a URL list.
 * Each page uses SqueezePageLayout with 6 slots: hero / usp / trust / content / form / faq
 * Content auto-built from URL slug (location + level + intent).
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'src/pages');

const LOC = {
  govap: { name: 'Gò Vấp', addr: '160/72 Phan Huy Ích, P. An Hội Tây, Gò Vấp, TP.HCM' },
  binhtan: { name: 'Bình Tân', addr: 'Số 7 Đường 38A, Phường Tân Tạo, TP.HCM' },
  'binh-tan': { name: 'Bình Tân', addr: 'Số 7 Đường 38A, Phường Tân Tạo, TP.HCM' },
  bt: { name: 'Bình Tân', addr: 'Số 7 Đường 38A, Phường Tân Tạo, TP.HCM' },
  cg: { name: 'Cần Giuộc', addr: 'Cơ sở Cần Giuộc, Long An' },
  rg: { name: 'Rạch Giá', addr: 'Cơ sở Rạch Giá, Kiên Giang' },
};

const LEVEL = {
  'mam-non': { label: 'Mầm Non', code: 'mam-non' },
  'tieu-hoc': { label: 'Tiểu Học', code: 'tieu-hoc' },
  thcs: { label: 'THCS', code: 'thcs' },
  thpt: { label: 'THPT', code: 'thpt' },
  liencap: { label: 'Liên Cấp Mầm Non — THPT', code: 'tieu-hoc' },
  'mam-non-tieu-hoc': { label: 'Mầm Non & Tiểu Học', code: 'tieu-hoc' },
  'thcs-thpt': { label: 'THCS & THPT', code: 'thcs' },
};

function parseSlug(slug) {
  // Try LOCATION at end
  let location = null;
  let levelKey = null;
  let intent = 'tuyen-sinh';
  let s = slug;

  for (const k of ['govap', 'binhtan', 'binh-tan', 'bt', 'cg', 'rg']) {
    if (s.endsWith('-' + k)) { location = LOC[k]; s = s.slice(0, -k.length - 1); break; }
  }
  // Detect level
  for (const k of ['mam-non-tieu-hoc', 'thcs-thpt', 'mam-non', 'tieu-hoc', 'thcs', 'thpt', 'liencap']) {
    if (s.includes(k)) { levelKey = k; s = s.replace('-' + k, '').replace(k, ''); break; }
  }
  // Detect intent
  if (slug.startsWith('trai-he')) intent = 'trai-he';
  else if (slug.startsWith('chuyen-truong')) intent = 'chuyen-truong';
  else if (slug.startsWith('tu-van')) intent = 'tu-van';
  else if (slug.startsWith('hoc-phi')) intent = 'hoc-phi';
  else if (slug.startsWith('hoc-bong')) intent = 'hoc-bong';
  else if (slug.startsWith('open-day')) intent = 'open-day';
  else if (slug.startsWith('tham-quan')) intent = 'tham-quan';
  else if (slug.startsWith('oxford')) intent = 'oxford';
  else intent = 'tuyen-sinh';

  return { intent, level: LEVEL[levelKey] || { label: 'Liên Cấp', code: 'tieu-hoc' }, location };
}

function buildContent({ intent, level, location }, slug) {
  const where = location ? ` tại ${location.name}` : '';
  const addr = location?.addr || 'Hệ thống Trường Việt Anh — TP.HCM, Long An, Kiên Giang';

  const TEMPLATES = {
    'trai-he': {
      heading: `Trại Hè Lion Camp 2026 — ${level.label}${where}`,
      sub: 'Phát triển toàn diện qua 6 tuần: Tiếng Anh giao tiếp · STEM · Lãnh đạo · Phiêu lưu. Đăng ký sớm để nhận ưu đãi Early Bird đến 30% học phí.',
      formTitle: 'Đăng ký Lion Camp 2026 — Nhận tư vấn miễn phí',
      formSub: 'Để lại thông tin để nhận lịch khai giảng, học phí, ưu đãi sớm và tài liệu chi tiết.',
      submit: 'Đăng ký ngay',
      uspItems: [
        { icon: '🦁', text: '6 tuần học hè bao trọn — không phải gửi con đi đâu khác' },
        { icon: '🇬🇧', text: 'Giáo viên bản ngữ + giáo viên Việt cùng dạy theo CEFR' },
        { icon: '🧪', text: 'STEM — Robotics — Mỹ thuật — Thể thao đa dạng mỗi ngày' },
        { icon: '🏕️', text: '1–2 chuyến field trip / overnight camp tăng tự lập' },
        { icon: '🍱', text: 'Bữa ăn 4 bữa do bếp trường nấu — chuyên gia dinh dưỡng giám sát' },
        { icon: '💸', text: 'Early Bird giảm 30% học phí · Brother & Sister giảm thêm 10%' },
      ],
      faq: [
        ['Trại hè diễn ra trong bao lâu?', 'Lion Camp 2026 kéo dài 6 tuần, từ tuần đầu tháng 6 đến giữa tháng 7, học từ thứ 2 đến thứ 6, 7h30 — 16h30. Có thể đăng ký theo tuần hoặc trọn khóa.'],
        ['Con tôi chưa học tại Việt Anh có tham gia được không?', 'Có. Lion Camp mở cho cả học sinh ngoài hệ thống. Đây là cơ hội tốt để con và phụ huynh trải nghiệm thực tế trước khi quyết định nhập học chính khóa.'],
        ['Học phí trại hè là bao nhiêu?', 'Học phí phụ thuộc cấp học và cơ sở. Đăng ký Early Bird trước 30/4 giảm 30%. Vui lòng để lại thông tin để được gửi bảng giá chi tiết và chính sách ưu đãi.'],
        ['Có cần đồng phục/dụng cụ riêng không?', 'Trường cung cấp đồng phục Lion Camp + balo + bình nước miễn phí khi đăng ký trọn khóa. Phụ huynh chỉ cần chuẩn bị giày thể thao và đồ dùng cá nhân.'],
        ['Có dịch vụ đưa đón không?', `Có. Cơ sở ${location?.name || 'TP.HCM/Long An/Kiên Giang'} có xe đưa đón bán kính 10km. Vui lòng cung cấp địa chỉ nhà để được báo phí xe theo tuyến.`],
      ],
      contentTitle: 'Lion Camp 2026 — Phát triển toàn diện trong 6 tuần',
      contentBody: `<p>Lion Camp ${level.label} là chương trình trại hè bán trú phát triển toàn diện cho con em Việt Nam, kết hợp <strong>Tiếng Anh giao tiếp với giáo viên bản ngữ</strong>, <strong>STEM/Robotics</strong>, <strong>Kỹ năng lãnh đạo</strong> và <strong>Phiêu lưu — Khám phá ngoài trời</strong>.</p>
        <p>Mỗi tuần có chủ đề riêng (Tự lập, Sáng tạo, Đồng đội, Trí tuệ cảm xúc…), kết thúc 6 tuần con sẽ có <strong>portfolio học tập + báo cáo phát triển cá nhân</strong> để phụ huynh hiểu rõ điểm mạnh, điểm cần cải thiện của con.</p>
        <p>Chương trình áp dụng tại cơ sở <strong>${addr}</strong>. Sĩ số lớp tối đa 18 em / nhóm tuổi để giáo viên quan sát và cá nhân hóa từng con.</p>`,
    },
    'chuyen-truong': {
      heading: `Chuyển Trường về Trường Việt Anh${where}`,
      sub: 'Thủ tục đơn giản — Hỗ trợ học bạ, kiểm tra đầu vào miễn phí. Đảm bảo con hòa nhập trong 2 tuần đầu.',
      formTitle: 'Đăng ký tư vấn chuyển trường',
      formSub: 'Đội tuyển sinh sẽ liên hệ trong 24h, hướng dẫn thủ tục và sắp xếp test đầu vào.',
      submit: 'Đăng ký tư vấn chuyển trường',
      uspItems: [
        { icon: '📋', text: 'Hỗ trợ trọn gói thủ tục học bạ — phụ huynh không phải chạy nhiều nơi' },
        { icon: '🎯', text: 'Test đầu vào miễn phí — đánh giá học lực, tiếng Anh, kỹ năng mềm' },
        { icon: '🤝', text: 'Buddy program — bạn cùng lớp dẫn dắt 2 tuần đầu để con không bỡ ngỡ' },
        { icon: '👨‍🏫', text: 'Giáo viên chủ nhiệm gặp riêng phụ huynh trước khi con nhập học' },
        { icon: '💸', text: 'Học bổng chuyển trường giữa năm đến 30% học phí' },
        { icon: '✅', text: 'Cam kết tiến bộ trong 1 học kỳ hoặc hoàn lại học phí' },
      ],
      faq: [
        ['Con tôi đang học giữa năm có chuyển được không?', 'Có. Trường Việt Anh nhận chuyển trường giữa năm cho cả 4 cấp học (Mầm Non / Tiểu Học / THCS / THPT). Quy trình hoàn tất trong 5–7 ngày làm việc kể từ khi nộp đủ hồ sơ.'],
        ['Cần chuẩn bị giấy tờ gì?', 'Học bạ gốc (bản chính + photo công chứng), giấy giới thiệu của trường cũ, giấy khai sinh, sổ hộ khẩu/CCCD phụ huynh, 4 ảnh 3x4. Trường hỗ trợ phụ huynh nếu thiếu.'],
        ['Có học bổng cho học sinh chuyển trường không?', 'Có. Học sinh chuyển trường giữa năm được xét học bổng đầu vào (10–30% học phí) dựa trên kết quả test + hồ sơ học tập trường cũ.'],
        ['Con tôi không biết tiếng Anh có theo kịp không?', 'Trường có lớp Tiếng Anh dự bị (Bridge Class) cho học sinh mới nền tảng yếu. Sau 2–3 tháng học cường độ, con sẽ chuyển vào lớp chính khóa cùng các bạn.'],
        ['Sau khi chuyển có được rút lại nếu không phù hợp?', 'Trong 30 ngày đầu, nếu phụ huynh thấy con không phù hợp, trường hoàn lại 100% học phí (đã trừ ngày con đã học). Cam kết bằng văn bản.'],
      ],
      contentTitle: 'Chuyển trường về Việt Anh — An tâm, không gián đoạn việc học',
      contentBody: `<p>Trường Việt Anh hiểu rằng <strong>quyết định chuyển trường giữa năm</strong> không hề đơn giản. Chúng tôi đã đồng hành với hàng trăm gia đình trong 15 năm qua, xây dựng quy trình chuyển trường <strong>đơn giản — minh bạch — hỗ trợ tối đa</strong>.</p>
        <p>Cơ sở ${location?.name || 'Trường Việt Anh'}: <strong>${addr}</strong>. Vui lòng đăng ký để được tư vấn riêng về học phí, học bổng chuyển trường và lộ trình hòa nhập cho con.</p>`,
    },
    'tu-van': {
      heading: `Đăng ký tư vấn tuyển sinh ${slug.includes('zalo') ? 'qua Zalo' : slug.includes('video') ? 'qua Video Call' : slug.includes('online') ? 'Online' : '1:1'} — Trường Việt Anh`,
      sub: 'Đội tuyển sinh phản hồi trong 24h — Hoàn toàn miễn phí, không cam kết. Cá nhân hóa lộ trình theo cấp học và mong muốn của Ba/Mẹ.',
      formTitle: 'Đăng ký tư vấn miễn phí',
      formSub: 'Để lại thông tin — chúng tôi sẽ gọi/zalo/video call vào khung giờ Ba/Mẹ chọn.',
      submit: 'Đăng ký tư vấn ngay',
      uspItems: [
        { icon: '⏱️', text: 'Phản hồi trong 24h — không phải chờ đợi' },
        { icon: '🎯', text: 'Tư vấn cá nhân hóa theo cấp học, ngân sách, vị trí' },
        { icon: '💸', text: 'Cập nhật chính sách học bổng & ưu đãi đang áp dụng' },
        { icon: '📱', text: 'Linh hoạt: Zalo, Video Call, gặp trực tiếp — tùy Ba/Mẹ' },
        { icon: '🔒', text: 'Bảo mật thông tin tuyệt đối — không spam, không chia sẻ bên thứ 3' },
        { icon: '🆓', text: 'Hoàn toàn miễn phí — không cam kết, không áp lực' },
      ],
      faq: [
        ['Tư vấn có mất phí không?', 'Hoàn toàn miễn phí. Phụ huynh nhận trọn bộ tài liệu (học phí, học bổng, chương trình, lộ trình) và buổi tư vấn không giới hạn thời gian — không cam kết nhập học.'],
        ['Tôi có thể chọn khung giờ tư vấn không?', 'Có. Sau khi Ba/Mẹ đăng ký, đội tuyển sinh sẽ liên hệ và đề xuất 3 khung giờ. Ba/Mẹ chọn khung phù hợp nhất, kể cả buổi tối hay cuối tuần.'],
        ['Tư vấn online có hiệu quả như gặp trực tiếp không?', 'Có. Buổi tư vấn online qua Video Call có chia sẻ tài liệu, video tour cơ sở, demo bài học mẫu, gặp Hiệu trưởng — đầy đủ như gặp trực tiếp, tiết kiệm thời gian đi lại.'],
        ['Sau buổi tư vấn tôi có nhận được tài liệu không?', 'Có. Trong vòng 1 giờ sau buổi tư vấn, Ba/Mẹ sẽ nhận email tổng hợp: học phí cấp học quan tâm, lộ trình đề xuất, video tour, link đặt lịch tham quan trực tiếp.'],
        ['Tôi chưa quyết định cấp học cho con — có tư vấn được không?', 'Đặc biệt được! Đội tư vấn sẽ giúp Ba/Mẹ phân tích nhu cầu, tính cách con, ngân sách gia đình để đề xuất cấp học và cơ sở phù hợp nhất — không chỉ "bán hàng".'],
      ],
      contentTitle: 'Tư vấn 1:1 — Cá nhân hóa lộ trình cho con',
      contentBody: `<p>Mỗi gia đình có hoàn cảnh, ngân sách và mong muốn khác nhau. Đội tuyển sinh Trường Việt Anh được đào tạo để <strong>lắng nghe trước khi đề xuất</strong>, không áp đặt một giải pháp chung.</p>
        <p>Buổi tư vấn 30–45 phút sẽ làm rõ: <strong>cấp học phù hợp · cơ sở gần nhà · lộ trình học phí 3–5 năm · chính sách học bổng đang áp dụng · các bước nhập học</strong>.</p>`,
    },
    'hoc-phi': {
      heading: `Học Phí Trường Việt Anh${where} 2026 — Bảng Giá Chi Tiết`,
      sub: 'Học phí minh bạch — Không phụ phí ẩn. Trả góp 0% lãi suất qua thẻ. Học bổng đến 50% cho học sinh xuất sắc.',
      formTitle: 'Nhận bảng học phí chi tiết qua email',
      formSub: 'Bao gồm: học phí cơ bản, ăn uống, xe đưa đón, đồng phục, ngoại khóa và các chính sách ưu đãi 2026.',
      submit: 'Nhận bảng học phí',
      uspItems: [
        { icon: '📊', text: 'Học phí công khai — không phụ phí ẩn, có hợp đồng rõ ràng' },
        { icon: '💳', text: 'Trả góp 0% lãi suất qua thẻ tín dụng — chia 6/12 kỳ' },
        { icon: '🎓', text: 'Học bổng đầu vào 10–50% theo học lực và hoàn cảnh' },
        { icon: '👨‍👩‍👧‍👦', text: 'Ưu đãi anh chị em ruột — giảm 10–15% học phí học sinh thứ 2' },
        { icon: '🔒', text: 'Cam kết không tăng học phí giữa năm — đã ký hợp đồng' },
        { icon: '↩️', text: 'Chính sách hoàn học phí rõ ràng nếu rút giữa kỳ' },
      ],
      faq: [
        ['Học phí đã bao gồm những gì?', 'Học phí cơ bản đã gồm chương trình chính khóa, sách giáo khoa, ngoại khóa cơ bản. Phí ăn uống, xe đưa đón, ngoại khóa nâng cao tính riêng và minh bạch trong hợp đồng.'],
        ['Có chính sách học bổng không?', 'Có 4 loại: học bổng đầu vào (10–50%), học bổng học sinh xuất sắc cuối năm, học bổng anh chị em (10–15%), học bổng hoàn cảnh khó khăn xét theo từng trường hợp.'],
        ['Trả góp được không?', 'Có. Trường liên kết các ngân hàng (TPBank, MB, VPBank) cho trả góp 0% lãi suất 6/9/12 kỳ qua thẻ tín dụng. Phụ huynh không cần chứng minh thu nhập.'],
        ['Học phí có tăng giữa năm không?', 'Không. Hợp đồng nhập học ghi rõ học phí cố định cho cả năm học, kể cả lạm phát. Chỉ điều chỉnh khi sang năm học mới và thông báo trước 3 tháng.'],
        ['Nếu con nghỉ giữa năm có hoàn lại không?', 'Có. Hoàn lại theo công thức: học phí còn lại - phí xử lý 5%. Phí đã đóng cho ngày đã học không hoàn. Chi tiết trong hợp đồng nhập học.'],
      ],
      contentTitle: 'Học phí minh bạch — Đầu tư xứng đáng cho tương lai con',
      contentBody: `<p>Học phí Trường Việt Anh${where} được thiết kế <strong>cạnh tranh trong phân khúc song ngữ chất lượng cao</strong>, thấp hơn 30–40% so với trường quốc tế nhưng giữ đầu ra IELTS 6.0+ và 99% vào đại học top.</p>
        <p>Để nhận bảng học phí chi tiết theo cấp học (Mầm Non / Tiểu Học / THCS / THPT) và các chính sách ưu đãi đang áp dụng cho năm học 2026–2027, vui lòng để lại thông tin. Đội tuyển sinh gửi qua email trong 1 giờ.</p>`,
    },
    'hoc-bong': {
      heading: `Học Bổng Trường Việt Anh${where} 2026 — Đến 50% Học Phí`,
      sub: 'Học bổng đầu vào · Học bổng học sinh xuất sắc · Học bổng tài năng · Học bổng anh chị em — 4 loại học bổng tổng giá trị 5 tỷ/năm.',
      formTitle: 'Đăng ký xét học bổng 2026',
      formSub: 'Đội tuyển sinh hướng dẫn hồ sơ, lịch test và kết quả xét trong 7 ngày làm việc.',
      submit: 'Đăng ký xét học bổng',
      uspItems: [
        { icon: '🥇', text: 'Học bổng Toàn phần 100% — 10 suất / năm cho HS xuất sắc' },
        { icon: '🥈', text: 'Học bổng Bán phần 50% — 30 suất / năm theo điểm test' },
        { icon: '🎨', text: 'Học bổng Tài năng — Thể thao, Nghệ thuật, STEM (10–30%)' },
        { icon: '👫', text: 'Học bổng Anh chị em — giảm 10–15% học sinh thứ 2 trở đi' },
        { icon: '💝', text: 'Học bổng Hoàn cảnh — xét riêng từng trường hợp khó khăn' },
        { icon: '📅', text: 'Kết quả xét trong 7 ngày làm việc kể từ khi nộp đủ hồ sơ' },
      ],
      faq: [
        ['Điều kiện xét học bổng là gì?', 'Học bổng đầu vào: làm bài test (Toán + Tiếng Việt + Tiếng Anh) đạt từ 80% trở lên, kèm phỏng vấn ngắn. Học bổng tài năng: nộp portfolio thành tích 2 năm gần nhất.'],
        ['Hồ sơ xét học bổng cần gì?', 'Học bạ 2 năm gần nhất, giấy khen/chứng nhận, đơn đăng ký, ảnh thẻ, phỏng vấn ngắn với gia đình. Trường hỗ trợ phụ huynh chuẩn bị nếu cần.'],
        ['Học bổng có duy trì hàng năm không?', 'Có, nếu HS giữ kết quả học tập từ Khá trở lên + hạnh kiểm Tốt. Có quy chế rõ ràng trong hợp đồng học bổng.'],
        ['Có thể xét nhiều loại học bổng cùng lúc?', 'Có thể nhận tối đa 2 loại (ví dụ Học bổng đầu vào 30% + Anh chị em 10% = 40%). Không vượt quá 100% học phí.'],
        ['Khi nào nộp hồ sơ học bổng?', 'Đợt 1: trước 30/4/2026 (Early Bird, ưu tiên cao). Đợt 2: trước 30/6/2026. Sau đó xét theo suất còn lại.'],
      ],
      contentTitle: '5 tỷ học bổng 2026 — Cơ hội cho mọi gia đình',
      contentBody: `<p>Năm học 2026–2027, Trường Việt Anh${where} dành <strong>5 tỷ đồng quỹ học bổng</strong> cho học sinh các cấp, với 4 hệ học bổng phù hợp từng nhóm gia đình:</p>
        <ul><li><strong>Học sinh xuất sắc</strong> — học bổng đầu vào 30–100% học phí</li>
        <li><strong>Học sinh có tài năng đặc biệt</strong> — Thể thao, Nghệ thuật, STEM</li>
        <li><strong>Gia đình có nhiều con</strong> — học bổng anh chị em 10–15%</li>
        <li><strong>Gia đình hoàn cảnh khó khăn</strong> — xét riêng từng trường hợp</li></ul>
        <p>Vui lòng đăng ký để nhận hướng dẫn chi tiết và lịch test xét học bổng phù hợp.</p>`,
    },
    'open-day': {
      heading: 'Open Day Trường Việt Anh — Trải Nghiệm 1 Ngày Thực Tế',
      sub: 'Tham quan toàn bộ cơ sở · Gặp Ban Giám Hiệu · Trải nghiệm tiết học · Demo chương trình quốc tế. Hoàn toàn miễn phí.',
      formTitle: 'Đăng ký Open Day — Chọn ngày tham quan',
      formSub: 'Trường tổ chức Open Day hàng tháng. Để lại thông tin để được gửi lịch và đặt chỗ.',
      submit: 'Đăng ký Open Day',
      uspItems: [
        { icon: '🏫', text: 'Tham quan toàn bộ cơ sở vật chất — phòng học, sân chơi, thư viện, nhà ăn' },
        { icon: '👨‍🏫', text: 'Gặp Hiệu trưởng & Trưởng các bộ môn — hỏi đáp trực tiếp' },
        { icon: '🎬', text: 'Xem demo tiết học chính khóa & ngoại khóa' },
        { icon: '👶', text: 'Con được tham gia 1 hoạt động trải nghiệm cùng các bạn' },
        { icon: '🍱', text: 'Bữa trưa miễn phí cho cả gia đình theo thực đơn trường' },
        { icon: '🎁', text: 'Quà tặng Open Day + voucher giảm 10% học phí nếu đăng ký nhập học trong 30 ngày' },
      ],
      faq: [
        ['Open Day diễn ra khi nào?', 'Trường tổ chức Open Day vào thứ 7 cuối mỗi tháng, từ 8h00 — 12h00. Phụ huynh có thể chọn ngày phù hợp nhất trong 3 tháng tới.'],
        ['Có cần đặt lịch trước không?', 'Cần. Mỗi đợt nhận tối đa 30 gia đình để đảm bảo chất lượng tham quan và tương tác. Vui lòng đăng ký trước 7 ngày.'],
        ['Tôi đi cùng cả gia đình được không?', 'Hoàn toàn được. Khuyến khích cả Ba và Mẹ cùng đi để có quyết định thống nhất. Trường có khu vực dành riêng cho con khám phá trong khi phụ huynh tham quan.'],
        ['Có cần chuẩn bị gì không?', 'Không. Trường chuẩn bị tất cả: tài liệu, đồ dùng, ăn uống, quà tặng. Phụ huynh chỉ cần đến đúng giờ với CMND/CCCD để check-in.'],
        ['Có buổi Open Day online không?', 'Có. Nếu Ba/Mẹ ở xa hoặc bận, trường có Virtual Open Day qua Zoom mỗi tháng — tour 360° cơ sở + Q&A trực tiếp với Hiệu trưởng.'],
      ],
      contentTitle: 'Open Day — Cách tốt nhất để hiểu Trường Việt Anh',
      contentBody: `<p>Tài liệu, video, đánh giá online đều có giới hạn. <strong>Cách duy nhất để biết trường có phù hợp với con</strong> là đến tận nơi, gặp người thật, nhìn lớp học thật, ăn bữa cơm cùng các bạn.</p>
        <p>Open Day Trường Việt Anh được thiết kế cho phụ huynh trong giai đoạn cân nhắc — bạn sẽ rời đi với <strong>câu trả lời rõ ràng</strong> chứ không phải brochure.</p>`,
    },
    'tham-quan': {
      heading: 'Đặt Lịch Tham Quan Trường Việt Anh',
      sub: 'Tour cá nhân theo lịch của Ba/Mẹ — không gò bó vào ngày Open Day chung. Trải nghiệm trực tiếp phòng học, gặp giáo viên, xem con học thử.',
      formTitle: 'Đặt lịch tham quan riêng',
      formSub: 'Đội tuyển sinh sẽ liên hệ trong 24h để chốt lịch và sắp xếp tour cá nhân.',
      submit: 'Đặt lịch tham quan',
      uspItems: [
        { icon: '🗓️', text: 'Lịch linh hoạt — chọn ngày giờ phù hợp với Ba/Mẹ' },
        { icon: '🎯', text: 'Tour cá nhân — chuyên viên tuyển sinh đi cùng suốt buổi' },
        { icon: '👨‍🏫', text: 'Gặp giáo viên cấp học quan tâm — hỏi đáp 1:1' },
        { icon: '👶', text: 'Con được trải nghiệm 30–60 phút trong lớp thật' },
        { icon: '📋', text: 'Đánh giá sơ bộ năng lực con + tư vấn lộ trình' },
        { icon: '🆓', text: 'Hoàn toàn miễn phí — không áp lực đăng ký' },
      ],
      faq: [
        ['Tham quan trường mất bao lâu?', 'Tour cá nhân kéo dài 90–120 phút, gồm: tham quan cơ sở vật chất (45 phút) + gặp giáo viên & Ban Giám Hiệu (30 phút) + con trải nghiệm trong lớp (30 phút).'],
        ['Tôi đến cùng con được không?', 'Khuyến khích. Con đi cùng để cảm nhận trực tiếp môi trường — quyết định cuối cùng nên có sự đồng thuận của con.'],
        ['Khác gì so với Open Day?', 'Tham quan riêng có chuyên viên đi cùng 1:1 cả buổi, có thể đi sâu vào những điểm Ba/Mẹ quan tâm. Open Day chung là sự kiện nhóm 30 gia đình, ít cá nhân hóa hơn.'],
        ['Có cần đặt lịch trước bao lâu?', 'Trước tối thiểu 3 ngày làm việc để trường sắp xếp giáo viên, lớp học và bữa ăn. Lý tưởng nhất là 7 ngày.'],
        ['Có thể tham quan vào cuối tuần không?', 'Cuối tuần trường không có giờ học, nên chỉ tham quan được cơ sở vật chất, không thấy lớp học thật. Khuyến khích thứ 2 — thứ 6 trong giờ học để có trải nghiệm đầy đủ.'],
      ],
      contentTitle: 'Một buổi tham quan đáng giá — Quyết định đúng cho con',
      contentBody: `<p>Mỗi gia đình có những băn khoăn riêng. <strong>Tour tham quan cá nhân</strong> tại Trường Việt Anh được thiết kế để Ba/Mẹ có không gian hỏi sâu, nhìn kỹ và quyết định không vội vã.</p>
        <p>Trong 90–120 phút, Ba/Mẹ sẽ thấy được trường vào ngày học bình thường — không phải buổi "trình diễn" — đó là trải nghiệm gần nhất với cuộc sống của con khi nhập học.</p>`,
    },
    oxford: {
      heading: `Oxford Pathway Programme${where} — Lộ Trình Du Học Anh Quốc`,
      sub: 'Chương trình tích hợp Oxford International Curriculum + IGCSE/A-Level. Cam kết đầu ra IELTS 7.0+ và profile vào top 100 đại học UK/Mỹ.',
      formTitle: 'Tư vấn Oxford Pathway 2026',
      formSub: 'Đội tuyển sinh quốc tế sẽ tư vấn lộ trình 4–6 năm và chính sách học bổng riêng.',
      submit: 'Đăng ký tư vấn Oxford Pathway',
      uspItems: [
        { icon: '🎓', text: 'Curriculum Oxford International + IGCSE / A-Level' },
        { icon: '🇬🇧', text: '100% giáo viên bản ngữ — Ph.D / Master từ UK, US, AU' },
        { icon: '📜', text: 'Đầu ra: IELTS 7.0+ · IGCSE A* · A-Level A*' },
        { icon: '🌍', text: 'Counselor du học riêng — hỗ trợ apply UK / US / AU / SG' },
        { icon: '🏆', text: '92% học sinh vào top 100 thế giới (Oxford, Imperial, NUS, ANU…)' },
        { icon: '💰', text: 'Học bổng Oxford Pathway 30–70% cho HS xuất sắc' },
      ],
      faq: [
        ['Chương trình Oxford Pathway dành cho lớp nào?', 'Mở từ lớp 7 (Year 8 hệ Anh) đến lớp 12 (Year 13). Lộ trình tối ưu là vào từ lớp 7 để có 6 năm xây nền.'],
        ['Học sinh học chương trình Việt Nam có chuyển sang được không?', 'Có. Trường có lớp Bridge 1 năm cho HS từ trường Việt Nam sang, rèn IELTS 5.5+ và lấp đầy gap kiến thức trước khi vào IGCSE chính thức.'],
        ['Học phí Oxford Pathway khoảng bao nhiêu?', 'Học phí Oxford Pathway từ 250–450 triệu/năm tùy cấp. Có học bổng 30–70% theo thành tích — vui lòng đăng ký để nhận bảng giá chi tiết.'],
        ['Tỷ lệ vào đại học top thế giới là bao nhiêu?', '92% học sinh tốt nghiệp Oxford Pathway 2024 vào top 100 thế giới (theo QS Rankings), 38% vào top 30 (Oxford, Cambridge, Imperial, UCL, NUS, USYD…).'],
        ['Có cần đi du học hè để bổ trợ không?', 'Khuyến khích. Trường tổ chức summer school tại Oxford UK + Boston US mỗi năm 3 tuần, học phí riêng 80–120 triệu, đã bao gồm vé máy bay + visa + lưu trú.'],
      ],
      contentTitle: 'Oxford Pathway — Du học bắt đầu từ lớp 7',
      contentBody: `<p>Oxford Pathway Programme tại Trường Việt Anh${where} là <strong>chương trình du học sớm</strong>, học toàn bộ bằng tiếng Anh theo curriculum Oxford International, lấy bằng IGCSE và A-Level chuẩn quốc tế ngay tại Việt Nam.</p>
        <p>Học sinh tốt nghiệp có hồ sơ <strong>tương đương HS trường British boarding school</strong> với chi phí thấp hơn 5–10 lần, đồng thời được sống cùng gia đình ở Việt Nam đến năm lớp 12.</p>`,
    },
    'tuyen-sinh': {
      heading: `Tuyển Sinh ${level.label}${where} 2026–2027`,
      sub: 'Đăng ký sớm nhận học bổng Early Bird đến 30% học phí. Hỗ trợ trọn gói thủ tục và test đầu vào miễn phí.',
      formTitle: `Đăng ký tuyển sinh ${level.label}${where}`,
      formSub: 'Đội tuyển sinh phản hồi trong 24h, hướng dẫn hồ sơ và lịch tham quan.',
      submit: 'Đăng ký tuyển sinh',
      uspItems: [
        { icon: '🎓', text: `Chương trình ${level.label} song ngữ — chuẩn quốc tế, sĩ số 22 em/lớp` },
        { icon: '🇬🇧', text: 'Giáo viên bản ngữ + Việt cùng dạy — Tiếng Anh từ 8–12 tiết/tuần' },
        { icon: '📋', text: 'Test đầu vào miễn phí — đánh giá toàn diện học lực' },
        { icon: '💸', text: 'Early Bird trước 30/4 — giảm 30% học phí + tặng đồng phục' },
        { icon: '🚌', text: location ? `Xe đưa đón bán kính 10km từ ${location.name}` : 'Xe đưa đón đa tuyến TP.HCM, Long An, Kiên Giang' },
        { icon: '📞', text: 'Hỗ trợ 24/7 qua Zalo OA — Hiệu trưởng phản hồi trong 12h' },
      ],
      faq: [
        ['Hồ sơ nhập học cần gì?', 'Học bạ 2 năm gần nhất, giấy khai sinh, sổ tiêm chủng (Mầm Non/Tiểu Học), 4 ảnh 3x4, đơn nhập học. Trường hướng dẫn từng bước.'],
        ['Có test đầu vào không?', `${level.label === 'Mầm Non' ? 'Mầm Non chỉ có buổi gặp gỡ làm quen 30 phút, không test áp lực' : 'Có test Toán + Tiếng Việt + Tiếng Anh 90 phút, làm tại trường hoặc online'}. Kết quả dùng để xếp lớp và xét học bổng.`],
        ['Lớp sĩ số bao nhiêu?', `${level.label} sĩ số tối đa 22 em/lớp, có 1 giáo viên chính + 1 trợ giảng + 1 giáo viên bản ngữ. Đảm bảo từng con được quan tâm.`],
        ['Có học phí trả góp không?', 'Có. Trả góp 0% lãi suất qua thẻ TPBank, MB, VPBank, chia 6/9/12 kỳ. Không cần chứng minh thu nhập.'],
        ['Khi nào bắt đầu nhập học?', 'Năm học 2026–2027 khai giảng 5/9/2026. Có lớp tiền nhập học (orientation) tháng 7 cho HS mới làm quen môi trường, miễn phí cho HS đăng ký Early Bird.'],
      ],
      contentTitle: `Tuyển sinh ${level.label}${where} — Lộ trình rõ ràng cho con`,
      contentBody: `<p>Trường Việt Anh${where} tuyển sinh năm học 2026–2027 với <strong>chương trình ${level.label} song ngữ chuẩn quốc tế</strong>, đầu ra đảm bảo và lộ trình rõ ràng.</p>
        <p>Cơ sở: <strong>${addr}</strong>. Sĩ số mỗi lớp tối đa 22 em với 3 giáo viên/lớp (1 chính + 1 trợ giảng + 1 bản ngữ). Đăng ký sớm trước 30/4/2026 để nhận học bổng Early Bird 30% học phí.</p>
        <p>Để nhận thông tin chi tiết về học phí, lộ trình học và lịch tham quan trường, vui lòng để lại thông tin. Đội tuyển sinh sẽ liên hệ trong 24h.</p>`,
    },
  };

  return TEMPLATES[intent] || TEMPLATES['tuyen-sinh'];
}

function buildPage(slug) {
  const ctx = parseSlug(slug);
  const t = buildContent(ctx, slug);
  const canonical = `https://truongvietanh.com/${slug}`;
  const description = t.sub.slice(0, 155);
  const funnelCode = slug.replace(/[^a-z0-9-]/g, '');

  const uspJson = JSON.stringify(t.uspItems, null, 2).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n');
  const faqJson = JSON.stringify(t.faq.map(([question, answer]) => ({ question, answer })), null, 2).split('\n').map((l, i) => i === 0 ? l : '  ' + l).join('\n');

  return `---
import SqueezePageLayout from '../layouts/SqueezePageLayout.astro';
import USPGrid from '../components/USPGrid.astro';
import TrustMetrics from '../components/TrustMetrics.astro';
import LeadFormTwoStepEmailFirst from '../components/LeadFormTwoStepEmailFirst.astro';
import FAQSection from '../components/FAQSection.astro';

const pageTitle = ${JSON.stringify(t.heading + ' | Trường Việt Anh')};
const pageDescription = ${JSON.stringify(description)};
const pageCanonical = ${JSON.stringify(canonical)};

const uspItems = ${uspJson};

const metrics = [
  { number: '15+', label: 'Năm kinh nghiệm giáo dục song ngữ' },
  { number: '3,000+', label: 'Học sinh đã và đang theo học' },
  { number: '95%', label: 'Phụ huynh hài lòng & giới thiệu bạn bè' },
  { number: '9', label: 'Cơ sở tại TP.HCM, Long An, Kiên Giang' },
];

const faqItems = ${faqJson};
---

<SqueezePageLayout
  title={pageTitle}
  description={pageDescription}
  canonicalUrl={pageCanonical}
  schoolLevel="${ctx.level.code}"
  funnelCode=${JSON.stringify(funnelCode)}
>
  <section slot="hero">
    <h1 class="squeeze-hero__heading">${t.heading}</h1>
    <p class="squeeze-hero__subheading">${t.sub}</p>
  </section>

  <section slot="usp"><USPGrid title="Vì sao chọn Trường Việt Anh?" items={uspItems} /></section>
  <section slot="trust"><TrustMetrics title="Trường Việt Anh trong số liệu" metrics={metrics} /></section>

  <section slot="content">
    <div class="page-content">
      <h2>${t.contentTitle}</h2>
      ${t.contentBody}
    </div>
  </section>

  <section slot="form">
    <h2 class="squeeze-form-section__heading">${t.formTitle}</h2>
    <p class="squeeze-form-section__description">${t.formSub}</p>
    <LeadFormTwoStepEmailFirst
      formId=${JSON.stringify(funnelCode + '-form')}
      funnelCode=${JSON.stringify(funnelCode)}
      schoolLevel="${ctx.level.code}"
      submitText=${JSON.stringify(t.submit)}
      successMessage="Cảm ơn! Đội tuyển sinh sẽ liên hệ trong 24h."
    />
  </section>

  <section slot="faq"><FAQSection title="Câu hỏi thường gặp" items={faqItems} /></section>
</SqueezePageLayout>

<style is:inline>
  .page-content { max-width: 800px; margin: 0 auto; padding: 1rem 0; }
  .page-content h2 { color: #1a1a5e; font-size: 1.6rem; margin-bottom: 1rem; text-align: center; }
  .page-content p { font-size: 1rem; line-height: 1.75; color: #333; margin-bottom: 1rem; }
  .page-content ul { margin: 1rem 0 1rem 1.5rem; }
  .page-content li { margin-bottom: .5rem; line-height: 1.7; }
  .page-content strong { color: #1a1a5e; font-weight: 700; }
</style>
`;
}

const SLUGS = [
  'trai-he', 'tuyen-sinh-thcs-thpt-bt', 'tuyen-sinh-mam-non-tieu-hoc-bt', 'tuyen-sinh-thcs-thpt',
  'tuyen-sinh-mam-non-tieu-hoc', 'tuyen-sinh-liencap-govap', 'tuyen-sinh-rg', 'tu-van-zalo',
  'tu-van-video-call', 'tuyen-sinh-liencap', 'tuyen-sinh-thcs', 'tuyen-sinh-tieu-hoc',
  'tuyen-sinh-thpt', 'hoc-phi-cg', 'open-day', 'tham-quan-truong',
  'tuyen-sinh-mam-non-binh-tan', 'tuyen-sinh-thcs-binh-tan', 'tuyen-sinh-mam-non-rg',
  'tuyen-sinh-tieu-hoc-binh-tan', 'tuyen-sinh-tieu-hoc-cg', 'tuyen-sinh-tieu-hoc-rg',
  'tuyen-sinh-thcs-govap', 'tuyen-sinh-thpt-binh-tan', 'tuyen-sinh-mam-non-govap',
  'tuyen-sinh-tieu-hoc-govap', 'tu-van-online', 'oxford-pathway-govap', 'trai-he-govap',
  'tuyen-sinh-thpt-govap', 'tuyen-sinh-govap', 'chuyen-truong-govap', 'tu-van',
  'tuyen-sinh-mam-non-cg', 'trai-he-binhtan', 'chuyen-truong-binhtan', 'tuyen-sinh-binh-tan',
  'tuyen-sinh-cg', 'chuyen-truong-cg', 'chuyen-truong-rg', 'hoc-bong-cg', 'hoc-phi-rg',
  'hoc-bong-rg', 'trai-he-thcs', 'trai-he-thcs-govap', 'trai-he-thpt', 'trai-he-thpt-govap',
  'trai-he-thcs-binhtan', 'trai-he-thpt-binhtan',
];

let created = 0, skipped = 0;
for (const slug of SLUGS) {
  const target = path.join(ROOT, slug + '.astro');
  if (fs.existsSync(target)) { console.log(`SKIP ${slug} (exists)`); skipped++; continue; }
  fs.writeFileSync(target, buildPage(slug));
  console.log(`✓ Created /${slug}`);
  created++;
}
console.log(`\n=== Done: ${created} created · ${skipped} skipped ===`);
