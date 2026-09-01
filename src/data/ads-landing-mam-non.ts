// =====================================================================
// NỘI DUNG 10 LANDING PAGE QUẢNG CÁO — MẦM NON VIỆT ANH GÒ VẤP
// Mỗi mục = 1 ad group Google Ads = 1 Final URL.
// Sửa chữ nghĩa ở ĐÂY, không sửa trong src/pages — trang chỉ là vỏ.
//
// Số liệu và mô tả chương trình lấy từ src/data/mam-non-govap-facts.ts,
// vốn dựa trên tài liệu gốc "CHƯƠNG TRÌNH MẦM NON VIỆT ANH" (TP.HCM, 7/2021).
//
// ⚠️ Chương trình là HỌC TẬP CHỦ ĐỘNG (Active learning), KHÔNG phải Montessori.
//    Đừng viết chữ "Montessori" vào đây như thể đó là phương pháp của trường.
//
// URL sinh ra: https://truongvietanh.com/mam-non-go-vap/<slug>/
// =====================================================================
import { mnFacts, nearbyStreets } from './mam-non-govap-facts';

const F = mnFacts;
const BASE = 'https://truongvietanh.com/mam-non-go-vap/';

export type AdsPage = {
  slug: string;
  adGroup: string;
  keywords: string;
  noindex?: boolean;
  funnelCode: string;
  /* Khối quan tâm ghi vào Pancake. Bỏ trống = 'mau-non' → cột "Khối quan tâm" hiện
     "3 tuổi", đúng cho nhóm quảng cáo mầm non chung. Trang nhắm độ tuổi cụ thể phải
     khai riêng. Giá trị hợp lệ lấy từ KHOI_QUAN_TAM_MAP trong src/staging-worker.js:
     2-tuoi · 3-tuoi · 4-tuoi · 5-tuoi · lop-1…lop-12 (giá trị lạ thì worker bỏ trống
     cột đó chứ không loại lead). */
  schoolLevel?: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  sub: string;
  heroPoints: string[];
  metrics: { number: string; label: string }[];
  formTitle: string;
  formDesc: string;
  formSocialProof: string;
  nextText: string;
  submitText: string;
  successMessage: string;
  body: string;
  faq: { q: string; a: string }[];
};

const callLine = `Cần hỏi nhanh, gọi ${F.hotlineMamNon} — hotline mầm non trực 24/7.`;

// Khối Plan–Do–Review dùng lại ở nhiều trang
const pdrTimeline = `
  <ul class="timeline">
    ${F.pdrSteps.map((s) => `<li><b>${s.step}</b><span>${s.desc}</span></li>`).join('')}
  </ul>`;

export const adsPages: AdsPage[] = [
  // ─────────────────────────────── AG 01 ───────────────────────────────
  {
    slug: 'gan-day',
    adGroup: 'AG 01 — Gần đây, quanh đây, Gò Vấp',
    keywords: 'trường mầm non gò vấp, mầm non gần đây, trường mầm non gần nhà, mẫu giáo gò vấp, trường mầm non quận gò vấp',
    funnelCode: 'mn-govap-gannha',
    title: 'Trường Mầm non Việt Anh Gò Vấp Gần Nhà — 573 Lê Đức Thọ | Trường Việt Anh',
    description: `Trường mầm non tại Gò Vấp, ${F.addressShort}. Nhận bé từ ${F.ageFrom}, lớp ${F.classSize} bé, học tập chủ động, camera 24/7. Đặt lịch tham quan miễn phí.`,
    eyebrow: 'Mầm non · Quận Gò Vấp, TP.HCM',
    h1: 'Trường mầm non ở Gò Vấp, ngay mặt tiền Lê Đức Thọ',
    sub: `Buổi sáng ba/mẹ tấp vào trả bé rồi đi làm tiếp — không phải luồn hẻm, không phải vòng qua Quang Trung giờ cao điểm. Nhận bé từ ${F.ageFrom} đến 6 tuổi.`,
    heroPoints: [
      `Mặt tiền ${F.addressShort} — ${F.wardNote}`,
      'Cơ sở chuyên mầm non, bé không dùng chung sân với anh chị cấp lớn',
      `Lớp ${F.classSizeLabel} — cô lên kế hoạch cho từng bé, không phải một giáo án chung`,
      'Camera 24/7, phụ huynh mầm non được cấp tài khoản xem trong giờ học',
    ],
    metrics: [
      { number: String(F.yearsRunning) + '+', label: `Năm vận hành từ ${F.foundedYear}` },
      { number: F.classSize, label: 'Bé mỗi lớp, tuỳ độ tuổi' },
      { number: F.rating + '/5', label: `Từ ${F.reviewCount} đánh giá phụ huynh` },
      { number: F.familiesServed, label: 'Gia đình đã đồng hành' },
    ],
    formTitle: 'Nhận thông tin & đặt lịch tham quan',
    formDesc: 'Để lại email, nhà trường gửi thông tin cơ sở và hẹn giờ ba/mẹ tới xem lớp thật.',
    formSocialProof: `Phản hồi trong ${F.responseTime} · Không ràng buộc`,
    nextText: 'Nhận thông tin trường',
    submitText: 'Đặt lịch tham quan',
    successMessage: `Đã nhận! Bộ phận Tuyển sinh sẽ liên hệ trong ${F.responseTime} để hẹn giờ và chỉ đường tới ${F.addressShort}.`,
    body: `
<section class="sec">
  <h2>Vì sao khoảng cách lại quan trọng đến thế ở tuổi mầm non</h2>
  <p class="lede">Với trường cấp lớn, xa gần là chuyện tiện nghi. Với mầm non, nó quyết định ba/mẹ có kịp đi làm không, và bé có phải dậy sớm hơn nửa tiếng mỗi ngày suốt cả năm hay không.</p>
  <div class="cards">
    <div class="card">
      <h3>Vị trí mặt tiền, không luồn hẻm</h3>
      <p>Trường nằm ngay mặt tiền ${F.addressShort} — trục ngang lớn của Gò Vấp. Buổi sáng ba/mẹ tấp vào trả bé rồi chạy tiếp được, không phải dắt xe qua hẻm nhỏ hay chờ nhau quay đầu.</p>
    </div>
    <div class="card">
      <h3>Cơ sở dành riêng cho trẻ nhỏ</h3>
      <p>Đây là cơ sở <strong>chuyên mầm non</strong>, không phải một tầng trong trường liên cấp. Lớp học chia thành nhiều khu vực riêng — khu nhà, khu hình khối, khu đọc sách, khu khoa học, khu toán học — để bé tự chọn chỗ mình muốn làm.</p>
    </div>
    <div class="card">
      <h3>Cô lên kế hoạch cho từng bé</h3>
      <p>Sĩ số ${F.classSizeLabel}. ${F.teacherPlanning}. Ở tuổi này, thứ khiến bé thích đi học không phải giáo trình mà là cô có kịp nhìn thấy con hay không.</p>
    </div>
    <div class="card">
      <h3>Gia đình có con nhiều độ tuổi</h3>
      <p>Hệ thống có thêm cơ sở liên cấp tại ${F.campusLienCap} cho Tiểu học đến THPT. Nhà có bé mầm non và anh chị lớn hơn thì đưa đón trong cùng buổi sáng vẫn xoay được, và gia đình từ 2 con đang học được giảm ${F.siblingDiscount}.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Một ngày của bé xoay quanh ba việc</h2>
  <p class="lede">Chương trình mầm non ở đây dựa trên phương pháp ${F.method}. Hoạt động cốt lõi mỗi ngày là ${F.pdrName} — bé tự nghĩ hôm nay mình sẽ làm gì, rồi làm, rồi nhìn lại.</p>
  ${pdrTimeline}
</section>`,
    faq: [
      { q: 'Trường nằm chính xác ở đâu?', a: `${F.address}. Đây là ${F.wardNote} — nhiều ba/mẹ vẫn quen gõ "mầm non phường 16 Gò Vấp" khi tìm trường, và đó cũng chính là nơi này. Trường nằm mặt tiền nên dễ tấp vào buổi sáng. ${callLine}` },
      { q: 'Trường nhận bé từ mấy tuổi?', a: `Từ ${F.ageFrom} đến 6 tuổi. Lớp preschool tổ chức theo mô hình đa độ tuổi: bé 3, 4 và 5 tuổi học chung một lớp, học từ cô và học cả từ nhau. Trong từng môn, cô xếp bé vào nhóm theo khả năng chứ không theo tuổi.` },
      { q: 'Chương trình học theo phương pháp gì?', a: `${F.method}, xây dựng theo ${F.curriculumFrameMid}. Bé tự lên kế hoạch, tự thực hiện và tự chiêm nghiệm; cô đóng vai trò dẫn dắt, xác nhận lại kiến thức và mở rộng lên cấp độ tiếp theo. Toàn bộ thời gian tại lớp tổ chức bằng ${F.englishModelMid}.` },
      { q: 'Một lớp bao nhiêu bé?', a: `${F.classSizeLabel}. Khi ba/mẹ đi tham quan bất kỳ trường nào, hãy hỏi thẳng con số này và xin được nhìn vào lớp thật vào giờ bé đang sinh hoạt, chứ không phải lớp trống lúc tan học.` },
      { q: 'Tham quan có mất phí hay bị ép đăng ký không?', a: 'Tham quan miễn phí và không ràng buộc. Sau buổi tham quan, ba/mẹ về nhà suy nghĩ, trao đổi với gia đình, so sánh với các trường khác. Chuyên viên sẽ hỏi thăm lịch sự để giải đáp thêm, nhưng quyết định hoàn toàn thuộc về ba/mẹ.' },
    ],
  },

  // ─────────────────────────────── AG 02 ───────────────────────────────
  {
    slug: 'viet-anh',
    adGroup: 'AG 02 — Việt Anh, Mầm non Việt Anh (branded)',
    keywords: 'mầm non việt anh, trường việt anh gò vấp, mầm non việt anh có tốt không, trường mầm non việt anh học phí',
    funnelCode: 'mn-govap-brand',
    title: 'Mầm non Việt Anh Gò Vấp — Vui Vẻ & Thực Dụng, Từ Năm 2011',
    description: `Trường Mầm non Việt Anh cơ sở Gò Vấp: học tập chủ động, 100% tiếng Anh trong lớp, lớp ${F.classSize} bé. ${F.familiesServed} gia đình đã đồng hành từ ${F.foundedYear}.`,
    eyebrow: `Hệ thống Trường Liên cấp Việt Anh · từ ${F.foundedYear}`,
    h1: 'Mầm non Việt Anh Gò Vấp — nơi một đứa trẻ hạnh phúc học tốt nhất',
    sub: `Triết lý ${F.philosophy} không phải khẩu hiệu. Nó quyết định cách trường xếp lớp, cách cô phản hồi từng bé, và cả việc trường không dùng thưởng phạt để dạy trẻ.`,
    heroPoints: [
      `${F.yearsRunning}+ năm vận hành, ${F.familiesServed} gia đình đã đồng hành`,
      `${F.method} theo ${F.curriculumFrameMid}`,
      'Kỷ luật tích cực — không thưởng, không phạt, bé tự cam kết',
      `${F.rating}/5 từ ${F.reviewCount} đánh giá, ${F.retention} gia đình học tiếp năm sau`,
    ],
    metrics: [
      { number: String(F.foundedYear), label: 'Năm thành lập hệ thống' },
      { number: F.familiesServed, label: 'Gia đình đã đồng hành' },
      { number: F.retention, label: 'Tỷ lệ gia đình học tiếp' },
      { number: F.rating + '/5', label: `Từ ${F.reviewCount} đánh giá` },
    ],
    formTitle: 'Tìm hiểu Mầm non Việt Anh',
    formDesc: 'Để lại email — nhà trường gửi giới thiệu chương trình, học phí và lịch tham quan cơ sở Gò Vấp.',
    formSocialProof: `${F.familiesServed} gia đình đã chọn Việt Anh`,
    nextText: 'Nhận giới thiệu trường',
    submitText: 'Đăng ký tư vấn',
    successMessage: `Đã nhận! Ba/mẹ kiểm tra email trong vài phút tới. Chuyên viên sẽ liên hệ trong ${F.responseTime}.`,
    body: `
<section class="sec">
  <h2>${F.philosophy} — hai chữ quyết định mọi thứ còn lại</h2>
  <p class="lede">"${F.philosophyLine}" Đây là câu nhà trường đặt làm gốc, và nó dẫn tới những lựa chọn rất cụ thể trong lớp học.</p>
  <div class="cards">
    <div class="card">
      <h3>Vui vẻ</h3>
      <p>Bé tới trường trong trạng thái được tôn trọng, được lắng nghe, và <strong>được phép mắc sai lầm để học</strong>. Không áp lực thành tích, không so sánh bé này với bé kia. Ở tuổi mầm non, một đứa trẻ sợ đi học là một năm học hỏng — dù chương trình có hay tới đâu.</p>
    </div>
    <div class="card">
      <h3>Thực dụng</h3>
      <p>Mọi thứ bé học ở trường phải dùng được ngoài đời, không chỉ trong bài kiểm tra. Ở mầm non điều đó nghĩa là: bé tự lên được kế hoạch cho ngày của mình, tự làm, rồi tự nói lại được mình đã làm gì — trước khi nói tới chữ và số.</p>
    </div>
    <div class="card">
      <h3>5 giá trị cốt lõi</h3>
      <p>${F.coreValues.join(' · ')}. Không dán lên tường rồi thôi — mỗi giá trị đi kèm nội quy tương ứng, tức là hành vi cụ thể mà bé được dạy và được rèn hằng ngày.</p>
    </div>
    <div class="card">
      <h3>Không thưởng, không phạt</h3>
      <p>Nhà trường không dùng "củ cà rốt và cây gậy". Lý do rất thẳng: thưởng phạt khiến trẻ chỉ làm điều đúng khi có người giám sát. Thay vào đó, cô đặt câu hỏi để bé tự thấy hệ quả của hành vi rồi <strong>tự đưa ra cam kết</strong>.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Kỷ luật tích cực được làm bằng năm việc cụ thể</h2>
  <p class="lede">Đây là phần khác biệt nhất so với phần lớn trường mầm non, và cũng là phần ba/mẹ nên hỏi kỹ khi đi tham quan.</p>
  <div class="panel">
    <ul class="checklist">${F.disciplineTools.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec">
  <h2>Phụ huynh nói gì</h2>
  <div class="cards">
    <div class="card">
      <p>"Sau 3 tháng, con tôi thay đổi hoàn toàn — từ một bé nhút nhát thành bé tự tin, chủ động và yêu thích tiếng Anh. Ở nhà con hay hát bài tiếng Anh và kể chuyện về các bạn ở trường."</p>
      <p><strong>— Chị T.M., mẹ bé Minh (4 tuổi)</strong></p>
    </div>
    <div class="card">
      <p>"Điều tôi yêu thích nhất ở Trường Việt Anh là cách các cô giáo lắng nghe, chăm sóc từng em như con riêng của mình."</p>
      <p><strong>— Chị V.H., mẹ bé Linh (3 tuổi)</strong></p>
    </div>
  </div>
</section>`,
    faq: [
      { q: 'Trường Việt Anh có từ bao giờ?', a: `Hệ thống Trường Liên cấp Việt Anh hoạt động từ năm ${F.foundedYear}, tới nay hơn ${F.yearsRunning} năm, đã đồng hành cùng ${F.familiesServed} gia đình. Cơ sở chuyên mầm non tại Gò Vấp đặt ở ${F.address}.` },
      { q: 'Mầm non Việt Anh khác gì các trường tư khác?', a: `Bốn điểm cụ thể: (1) chương trình dựa trên ${F.method} theo ${F.curriculumFrameMid}, không phải chương trình quốc gia và cũng không phải Montessori; (2) ${F.englishModelMid}; (3) lớp tổ chức đa độ tuổi và đa trình độ; (4) kỷ luật tích cực, không thưởng phạt. Ba/mẹ nên yêu cầu xem tận nơi cả bốn thứ này chứ đừng tin mô tả.` },
      { q: 'Trường có bao nhiêu cơ sở?', a: `Hệ thống có nhiều cơ sở tại TP.HCM, Tây Ninh và An Giang. Dù tên gọi tại từng địa phương có khác nhau, tất cả vận hành theo một triết lý và một cam kết chất lượng thống nhất. Cơ sở chuyên mầm non tại TP.HCM là ${F.addressShort}.` },
      { q: 'Học phí mầm non Việt Anh bao nhiêu?', a: 'Học phí khác nhau theo độ tuổi của bé và theo cách ba/mẹ chọn đóng (theo tháng, theo kỳ hay trọn năm). Nhà trường gửi trọn bảng chi tiết qua email kèm giải thích từng khoản, thay vì đưa một con số dễ gây hiểu nhầm. Ba/mẹ điền email ở form trên trang là nhận được.' },
      { q: 'Tỷ lệ phụ huynh học tiếp năm sau là bao nhiêu?', a: `${F.retention}. Với trường mầm non thì đây là con số đáng tin hơn mọi lời quảng cáo — vì phụ huynh gia hạn năm học sau nghĩa là họ đã sống qua một năm thật với nhà trường rồi mới quyết định.` },
    ],
  },

  // ─────────────────────────────── AG 03 ───────────────────────────────
  {
    slug: 'hoc-phi',
    adGroup: 'AG 03 — Học phí, chi phí',
    keywords: 'học phí mầm non gò vấp, học phí trường mầm non tư thục, chi phí học mầm non tphcm, bảng học phí mầm non, học phí mầm non việt anh',
    noindex: true,
    funnelCode: 'mn-govap-hocphi',
    title: 'Học Phí Mầm non Việt Anh Gò Vấp 2026 — Bảng Giá Đầy Đủ, Không Phí Ẩn',
    description: 'Nhận bảng học phí Mầm non Việt Anh Gò Vấp 2026 qua email: học phí theo từng độ tuổi, phí đầu năm, 6 cách đóng, chính sách hoàn phí. Minh bạch từng khoản.',
    eyebrow: 'Học phí 2026 · Mầm non Việt Anh Gò Vấp',
    h1: 'Bảng học phí mầm non Gò Vấp 2026 — từng khoản một, không phí ẩn',
    sub: 'Điều ba/mẹ thật sự muốn biết không phải "bao nhiêu tiền", mà là đóng xong rồi giữa năm còn bị hỏi thêm khoản nào nữa không. Bảng này trả lời cả hai.',
    heroPoints: [
      'Học phí tách riêng theo từng độ tuổi, kèm 3 phương án đóng',
      'Danh sách các khoản nhà trường cam kết KHÔNG thu thêm trong năm',
      `Chính sách hoàn phí bằng văn bản — ${F.refundPolicy[0].toLowerCase()}`,
      `Ưu đãi anh chị em: ${F.siblingDiscount}`,
    ],
    metrics: [
      { number: '6', label: 'Phương án thanh toán' },
      { number: '0%', label: 'Lãi suất khi trả góp 12 tháng' },
      { number: '5%', label: 'Giảm khi đóng trọn năm' },
      { number: '1 phút', label: 'Bảng giá về tới email' },
    ],
    formTitle: 'Nhận bảng học phí đầy đủ qua email',
    formDesc: 'Học phí theo từng độ tuổi + phí đầu năm + danh sách khoản không thu thêm.',
    formSocialProof: 'Minh bạch từng khoản — ba/mẹ đọc kỹ trước khi đi tham quan',
    nextText: 'Nhận bảng học phí',
    submitText: 'Gửi bảng học phí cho tôi',
    successMessage: 'Đã gửi! Ba/mẹ kiểm tra email trong vài phút tới, nhớ xem cả mục Quảng cáo/Spam.',
    body: `
<section class="sec">
  <h2>Học phí đã bao gồm những gì</h2>
  <p class="lede">Đây là phần ba/mẹ nên đọc trước tiên. Nhiều trường báo giá thấp rồi rải phụ phí suốt năm — nên so sánh hai trường bằng con số học phí đứng một mình là so sai.</p>
  <div class="cards">
    <div class="card">
      <h3>Đã nằm trong học phí</h3>
      <ul class="checklist">${F.feeIncludes.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
    <div class="card">
      <h3>Tính riêng, không nằm trong học phí</h3>
      <ul class="checklist">${F.feeExcludes.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p>Ba khoản này đều đóng một lần hoặc tự chọn — ba/mẹ biết trước con số nên cộng ra được tổng chi phí cả năm ngay từ hôm nay.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Sáu cách đóng để ba/mẹ chọn theo dòng tiền gia đình</h2>
  <p class="lede">Đóng trọn năm rẻ nhất nhưng cần một khoản lớn ngay đầu năm. Đóng theo tháng nhẹ hơn. Không có cách nào bị tính thêm phí phạt.</p>
  <ul class="checklist">${F.paymentOptions.map((x) => `<li>${x}</li>`).join('')}</ul>
</section>

<section class="sec">
  <h2>Nếu giữa năm con phải nghỉ</h2>
  <p class="lede">Không ai muốn nghĩ tới, nhưng gia đình chuyển nhà, đổi việc, con không hợp trường — chuyện xảy ra thật. Chính sách ghi rõ trong hợp đồng.</p>
  <div class="panel">
    <ul class="checklist">${F.refundPolicy.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>`,
    faq: [
      { q: 'Vì sao không đăng thẳng con số học phí lên trang?', a: 'Vì một con số trần trụi gần như luôn gây hiểu nhầm. Học phí thay đổi theo độ tuổi của bé, theo việc ba/mẹ chọn đóng theo tháng hay trọn năm, và theo ưu đãi tại thời điểm nhập học. Ba/mẹ nhìn một con số rồi tự suy ra con mình phải đóng bấy nhiêu, sau đó thấy hoá đơn khác đi là mất niềm tin ngay. Nên nhà trường gửi trọn bảng chi tiết theo từng độ tuổi vào email, kèm giải thích từng khoản.' },
      { q: 'Bảng gửi qua email gồm những gì?', a: 'Bốn phần: (1) học phí theo từng độ tuổi kèm ba phương án đóng; (2) phí đầu năm đóng một lần; (3) các khoản trong tháng như tiền ăn và ngoại khoá; (4) danh sách những khoản nhà trường cam kết không thu thêm trong năm học.' },
      { q: 'Gia đình có hai bé cùng học thì tính thế nào?', a: `Giảm ${F.siblingDiscount} — không phải chỉ bé thứ hai. Ưu đãi này cộng dồn được với chương trình ưu đãi theo mùa tuyển sinh. Khi nhận bảng học phí, ba/mẹ nhắn lại số bé dự định gửi để chuyên viên tính sẵn con số cuối cùng.` },
      { q: 'Có trả góp không, và có bị tính lãi không?', a: 'Có trả góp 12 tháng với lãi suất 0%, không phí phạt. Ngoài ra nhà trường có hợp tác với một số ngân hàng cung cấp hạn mức vay giáo dục, và có chương trình hỗ trợ học phí cho gia đình khó khăn — phần này trao đổi riêng với bộ phận Tuyển sinh.' },
      { q: 'Đóng theo tháng có bị tính đắt hơn không?', a: 'Đóng theo tháng không bị cộng thêm phụ phí nào. Chênh lệch nằm ở chiều ngược lại: đóng trọn năm một lần được giảm thêm 5%. Ba/mẹ chọn theo dòng tiền gia đình, không phải theo áp lực từ nhà trường.' },
    ],
  },

  // ─────────────────────────────── AG 04 ───────────────────────────────
  {
    slug: 'song-ngu',
    adGroup: 'AG 04 — Song ngữ, tiếng Anh, giáo viên nước ngoài',
    keywords: 'mầm non song ngữ gò vấp, trường mầm non tiếng anh, mầm non giáo viên nước ngoài, mầm non 100% tiếng anh, mầm non quốc tế gò vấp',
    funnelCode: 'mn-govap-songngu',
    title: 'Mầm Non 100% Tiếng Anh Trong Lớp — Gò Vấp | Trường Việt Anh',
    description: 'Toàn bộ thời gian tại lớp tổ chức bằng 100% tiếng Anh theo phương pháp tích hợp nội dung và ngôn ngữ (CLIL). Bé dùng tiếng Anh như tiếng bản ngữ, không học thuộc.',
    eyebrow: 'CLIL · Học tập chủ động',
    h1: 'Mầm non 100% tiếng Anh trong lớp — bé dùng, không phải học thuộc',
    sub: 'Tiếng Anh không tách thành một tiết riêng. Toàn bộ thời gian tại lớp tổ chức bằng tiếng Anh, nên bé nghe và dùng nó để làm việc mình muốn — đó là cách tiếng bản ngữ hình thành.',
    heroPoints: [
      `${F.englishModel} — phương pháp tích hợp nội dung và ngôn ngữ (CLIL)`,
      `Chương trình theo ${F.curriculumFrameMid}, gồm 8 lĩnh vực`,
      'Tiếng Anh là lĩnh vực thứ 9, dành riêng cho bé chưa nói tiếng Anh ở nhà',
      'Tích hợp liên môn — một chủ đề học ở nhiều môn cùng lúc',
    ],
    metrics: [
      { number: '100%', label: 'Tiếng Anh trong thời gian ở lớp' },
      { number: '8+1', label: 'Lĩnh vực phát triển, cộng lĩnh vực Tiếng Anh' },
      { number: '6', label: 'Phương pháp chính yếu được áp dụng' },
      { number: F.classSize, label: 'Bé mỗi lớp, tuỳ độ tuổi' },
    ],
    formTitle: 'Nhận chi tiết chương trình học',
    formDesc: 'Tám lĩnh vực phát triển, cách tổ chức lớp, và lịch tới xem một buổi học thật.',
    formSocialProof: `Lớp ${F.classSizeLabel} — cô lên kế hoạch cho từng bé`,
    nextText: 'Nhận chi tiết chương trình',
    submitText: 'Đăng ký tư vấn 1-1',
    successMessage: `Đã nhận! Ba/mẹ kiểm tra email trong vài phút tới. ${callLine}`,
    body: `
<section class="sec">
  <h2>Tiếng Anh kiểu "ngấm" khác kiểu "dạy" thế nào</h2>
  <p class="lede">Phần lớn trường tách riêng một tiết tiếng Anh mỗi ngày. Ở đây tiếng Anh là ngôn ngữ vận hành của cả lớp — bé nghe tiếng Anh trong lúc tay đang bận, và dùng nó để đạt được điều mình muốn.</p>
  <div class="cards">
    <div class="card">
      <h3>Tích hợp nội dung và ngôn ngữ (CLIL)</h3>
      <p>Phương pháp này là kết hợp việc học một kiến thức với việc giảng nó bằng chính ngôn ngữ mình muốn bé học được. Nhà trường áp dụng cho <strong>toàn bộ các môn học và giờ sinh hoạt</strong> của bé mầm non. ${F.englishModel} giúp bé tiếp thu và sử dụng tiếng Anh như tiếng bản ngữ.</p>
    </div>
    <div class="card">
      <h3>Tích hợp liên môn</h3>
      <p>Một chủ đề được học ở nhiều góc cạnh. Ví dụ với chủ đề cơ thể người: giờ tiếng Anh bé học từ vựng, giờ khoa học học chức năng từng bộ phận, giờ toán đếm số bộ phận và so sánh nhiều ít, giờ nghệ thuật khám phá hình thù. Bé học cách nhìn một việc từ nhiều hướng và nối kiến thức lại với nhau.</p>
    </div>
    <div class="card">
      <h3>Tiếng Anh là lĩnh vực thứ 9</h3>
      <p>Chương trình có 8 lĩnh vực chính. ${F.ninthArea} Nghĩa là bé không bị đánh giá bằng cùng một thước với bé nói tiếng Anh ở nhà — có 2 yếu tố đánh giá riêng dành cho người học tiếng Anh.</p>
    </div>
    <div class="card">
      <h3>Bé có bị lẫn hai thứ tiếng không</h3>
      <p>Bé vẫn sống trong môi trường tiếng Việt ở nhà, còn tiếng Anh ở lớp được đưa vào qua hoạt động chứ không qua ép buộc. Trẻ mầm non hoàn toàn có khả năng lập hai hệ ngôn ngữ song song; bé có thể trộn câu trong vài tháng đầu, đó là giai đoạn bình thường và sẽ tự tách ra.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Tám lĩnh vực bé phát triển song song</h2>
  <p class="lede">Chương trình xây theo ${F.curriculumFrameMid}. Cô dùng công cụ ${F.assessment} để theo dõi từng bé trên đủ tám lĩnh vực này.</p>
  <div class="tablewrap">
    <table>
      <thead><tr><th>#</th><th>Lĩnh vực</th></tr></thead>
      <tbody>
        ${F.learningAreas.map((a, i) => `<tr><td><strong>${i + 1}</strong></td><td>${a}</td></tr>`).join('')}
        <tr><td><strong>9</strong></td><td>${F.ninthArea}</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="sec">
  <h2>Sáu phương pháp đang được áp dụng</h2>
  <p class="lede">Bậc mầm non ở Việt Anh ${F.noFixedTextbook.toLowerCase()} — nhà trường chọn tạo ra môi trường học tập chủ động và tự do nhất có thể cho bé.</p>
  <div class="tablewrap">
    <table>
      <thead><tr><th>Phương pháp</th><th>Nghĩa là gì trong lớp</th></tr></thead>
      <tbody>
        ${F.methods.map((m) => `<tr><td><strong>${m.name}</strong><br><small>${m.en}</small></td><td>${m.desc}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
</section>`,
    faq: [
      { q: 'Trường dạy song ngữ hay 100% tiếng Anh?', a: `${F.englishModel}. Nhà trường áp dụng phương pháp tích hợp nội dung và ngôn ngữ (CLIL) cho toàn bộ môn học và giờ sinh hoạt, để bé tiếp thu và dùng tiếng Anh như tiếng bản ngữ chứ không phải học nó như một môn.` },
      { q: 'Con học tiếng Anh từ mầm non có sớm quá không?', a: 'Tiếng Anh ở đây được đưa vào qua hoạt động hằng ngày chứ không phải qua tiết học ngồi yên, nên bé tiếp nhận tự nhiên. Chương trình còn có riêng một lĩnh vực đánh giá dành cho bé mà tiếng Anh không phải tiếng mẹ đẻ, nghĩa là bé được theo dõi đúng theo xuất phát điểm của mình.' },
      { q: 'Chương trình theo Montessori phải không?', a: `Không. Chương trình mầm non Việt Anh dựa trên ${F.method}, xây theo ${F.curriculumFrameMid}. Đây là một trường phái khác với Montessori: ở học tập chủ động, hoạt động cốt lõi là ${F.pdrName} với thời gian cụ thể — bé lên kế hoạch, thực hiện rồi chiêm nghiệm; còn Montessori tổ chức thời gian linh hoạt quanh học cụ. Hai cách đều lấy học sinh làm trung tâm nhưng vận hành khác nhau.` },
      { q: 'Cô đánh giá bé bằng cách nào?', a: `Bằng công cụ ${F.assessment}. ${F.assessmentDetail}. Ngoài ra ${F.teacherPlanning.toLowerCase()}.` },
      { q: 'Nếu con chỉ muốn chơi, không muốn làm hoạt động thì sao?', a: `Ở tuổi này chơi chính là học, và cả chương trình được thiết kế quanh việc bé tự chọn. Trong giờ ${F.pdrName}, bé tự nói mình muốn làm gì rồi làm điều đó — nên gần như không có tình huống bé bị kéo ra khỏi thứ mình đang thích. ${callLine}` },
    ],
  },

  // ─────────────────────────────── AG 05 ───────────────────────────────
  {
    slug: 'do-tuoi',
    adGroup: 'AG 05 — 13 tháng–6 tuổi, nhà trẻ, bán trú',
    keywords: 'trường mầm non nhận bé 13 tháng, nhà trẻ gò vấp, giữ trẻ gò vấp, mầm non bán trú, trường cho bé 2 tuổi, lớp nhà trẻ gò vấp',
    funnelCode: 'mn-govap-dotuoi',
    // Nhóm quảng cáo nhà trẻ (13 tháng–2 tuổi) → khối "2 tuổi", không phải mặc định 3 tuổi.
    schoolLevel: '2-tuoi',
    title: `Nhà Trẻ & Mầm non Việt Anh Gò Vấp Nhận Bé Từ ${F.ageFrom} — Bán Trú Cả Ngày`,
    description: `Nhận bé từ ${F.ageRange} tại Gò Vấp. Lớp tổ chức đa độ tuổi và đa trình độ, bán trú cả ngày, bếp nấu tại trường, camera 24/7. Mẹ đi làm yên tâm.`,
    eyebrow: 'Đa độ tuổi · Đa trình độ',
    h1: `Nhận bé từ ${F.ageFrom} — mẹ đi làm lại, con có chỗ tin được`,
    sub: 'Lớp không chia cứng theo tuổi. Bé 3, 4 và 5 tuổi học chung, và trong từng môn cô xếp bé vào nhóm theo khả năng — nên không bé nào bị dán nhãn "chậm" chỉ vì kém bạn cùng tuổi.',
    heroPoints: [
      `Nhận bé từ ${F.ageRange}`,
      F.groupingModel,
      F.groupingDetail,
      'Bán trú cả ngày: ăn, ngủ trưa, hoạt động chiều',
    ],
    metrics: [
      { number: F.ageFrom, label: 'Độ tuổi nhỏ nhất nhận bé' },
      { number: '4', label: 'Hình thức hoạt động: lớp, nhóm, đôi, cá nhân' },
      { number: F.classSize, label: 'Bé mỗi lớp, tuỳ độ tuổi' },
      { number: '4 tuần', label: 'Chu kỳ xoay vòng thực đơn' },
    ],
    formTitle: 'Con mấy tuổi rồi ba/mẹ?',
    formDesc: 'Để lại email — nhà trường gửi thông tin lớp phù hợp với bé và lịch nhận bé.',
    formSocialProof: `Nhận bé từ ${F.ageFrom} · Bán trú cả ngày`,
    nextText: 'Xem lớp phù hợp với con',
    submitText: 'Đăng ký tư vấn',
    successMessage: `Đã nhận! Chuyên viên sẽ liên hệ trong ${F.responseTime} để tư vấn lớp phù hợp với bé.`,
    body: `
<section class="sec">
  <h2>Vì sao lớp không chia cứng theo tuổi</h2>
  <p class="lede">Khi ba/mẹ ghé thăm lớp, sẽ thấy bé 3 tuổi trao đổi, học và chơi cùng anh chị 4 và 5 tuổi. Đó là chủ ý, không phải thiếu lớp.</p>
  <div class="cards">
    <div class="card">
      <h3>Đa độ tuổi (Multi-age)</h3>
      <p>Ngoài đời không ai chỉ làm việc với người cùng tuổi mình, và sự nghiệp cũng không phát triển theo tuổi mà theo năng lực. Nhốt bé trong một lớp toàn bạn cùng tuổi rồi lấy tuổi làm thước đo, vô tình dạy bé rằng khả năng của con cũng chỉ tới bằng các bạn cùng lứa — hoặc tệ hơn, rằng con đang "chậm".</p>
      <p>Học chung nhiều độ tuổi, bé không chỉ học từ cô mà học từ nhau: kỹ năng giao tiếp, phối hợp, đàm phán, giải quyết vấn đề và cả khả năng đồng cảm.</p>
    </div>
    <div class="card">
      <h3>Đa trình độ (Multi-level)</h3>
      <p>Trong từng môn, cô xếp bé vào nhóm theo khả năng của bé <strong>ở chính môn đó</strong> — nên một bé có thể ở nhóm này môn toán và nhóm khác môn ngôn ngữ. Nhóm cũng <strong>đổi trong năm</strong> khi bé tiến bộ, chứ không cố định từ đầu tới cuối.</p>
      <p>Bé nào đi chậm hơn mặt bằng chung sẽ được cô dành thời gian hỗ trợ <strong>1 kèm 1</strong>, hoặc ghép "đôi bạn cùng tiến" để hai bé hỗ trợ nhau.</p>
    </div>
    <div class="card">
      <h3>Bốn hình thức hoạt động</h3>
      <ul class="checklist">${F.groupingForms.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p>Các môn học tổ chức theo nhóm. Còn hoạt động phát triển kỹ năng xã hội, phẩm chất và xây dựng cộng đồng — như thể chất hay các quy trình sinh hoạt chung — thì tổ chức theo lớp.</p>
    </div>
    <div class="card">
      <h3>Cô lên kế hoạch cho từng bé</h3>
      <p>${F.teacherPlanning}. Cô theo dõi bé bằng công cụ ${F.assessment}, ghi chú khách quan theo thời gian rồi chấm trên 34 yếu tố. Nhờ vậy việc xếp nhóm dựa trên quan sát thật chứ không dựa vào cảm tính.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Một ngày bán trú trọn vẹn diễn ra thế nào</h2>
  <p class="lede">Ba/mẹ gửi bé cả ngày thì thứ cần biết không phải "có bán trú không", mà là trong ngày đó bé làm gì, ăn gì, ngủ ra sao. Trục chính của ngày là ${F.pdrName}.</p>
  ${pdrTimeline}
</section>

<section class="sec">
  <h2>Bữa ăn và giấc ngủ — hai thứ mẹ lo nhất khi gửi bé nhỏ</h2>
  <div class="cards">
    <div class="card">
      <h3>Bếp nấu tại trường</h3>
      <ul class="checklist">${F.nutrition.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
    <div class="card">
      <h3>Nề nếp lặp lại mỗi ngày</h3>
      <p>Mọi hoạt động từ giờ học tới giờ ăn, đi vệ sinh đều có kế hoạch, thời gian cụ thể và quy trình rõ ràng, <strong>lặp đi lặp lại hằng ngày không đổi</strong>. Trẻ 0–5 tuổi cần dấu hiệu của sự an toàn và ổn định để yên tâm khám phá, thay vì luôn ở trạng thái lo lắng đề phòng.</p>
      <p>Với bé mới đi học, tuần đầu thường khó ngủ và hay khóc. Đây là giai đoạn bình thường, cô sẽ báo lại tình hình từng ngày để ba/mẹ biết con đang ở đâu trong quá trình làm quen.</p>
    </div>
  </div>
</section>`,
    faq: [
      { q: 'Trường nhận bé nhỏ nhất từ mấy tháng?', a: `Từ ${F.ageFrom}. Lớp preschool tổ chức theo mô hình đa độ tuổi — bé 3, 4 và 5 tuổi học chung một lớp. Ba/mẹ nên hỏi bộ phận Tuyển sinh về cách bố trí lớp cụ thể cho đúng độ tuổi của bé nhà mình.` },
      { q: 'Bé 3 tuổi học chung với bé 5 tuổi thì có thiệt không?', a: 'Ngược lại. Bé nhỏ có anh chị để quan sát và bắt chước, bé lớn có cơ hội hướng dẫn lại — đó là cách kỹ năng xã hội hình thành nhanh nhất. Còn về học thuật thì bé không học chung một mức: trong từng môn, cô xếp nhóm theo khả năng, nên bé nào cũng học ở đúng tầm của mình.' },
      { q: 'Có nhận giữ bé cả ngày cho mẹ đi làm không?', a: 'Có, đây là hình thức bán trú cả ngày: bé ăn, ngủ trưa và tham gia hoạt động chiều tại trường. Bữa ăn trong ngày đã nằm trong học phí bán trú, không tính thêm.' },
      { q: 'Tuần đầu con khóc suốt thì sao?', a: 'Gần như bé nào cũng khóc trong những ngày đầu — đó là phản ứng bình thường khi rời môi trường quen thuộc. Nhà trường xử lý bằng cách giữ mọi quy trình trong ngày lặp lại y hệt nhau, để bé nhanh thấy quen và thấy an toàn. Cô báo lại tình hình từng ngày cho ba/mẹ theo dõi.' },
      { q: 'Con chưa tự xúc ăn, chưa tự đi vệ sinh có nhận không?', a: 'Có, và tập được hai kỹ năng này chính là một phần công việc của cô. Chương trình đặt trọng tâm vào việc bé trở nên độc lập và có trách nhiệm — kỹ năng tự phục vụ đứng trước chữ nghĩa.' },
    ],
  },

  // ─────────────────────────────── AG 06 ───────────────────────────────
  {
    slug: 'khu-vuc',
    adGroup: 'AG 06 — Đường, khu vực + xe đưa đón',
    keywords: 'mầm non lê đức thọ, mầm non phan huy ích, mầm non phường 16 gò vấp, mầm non an hội đông, trường mầm non có xe đưa đón gò vấp',
    funnelCode: 'mn-govap-khuvuc',
    title: 'Mầm Non 573 Lê Đức Thọ Gò Vấp — Đường Đi & Xe Đưa Đón | Việt Anh',
    description: `Trường Mầm non Việt Anh tại 573 Lê Đức Thọ, ${F.wardNote}. Xem đường đi từ Phan Văn Trị, Nguyễn Oanh, Phạm Văn Chiêu và tuyến xe đưa đón quanh Gò Vấp.`,
    eyebrow: `${F.wardNote}`,
    h1: 'Mầm non Việt Anh — 573 Lê Đức Thọ, ngay giữa Gò Vấp',
    sub: 'Để lại địa chỉ nhà, nhà trường chỉ lối đi ngắn nhất theo khung giờ ba/mẹ hay đưa bé, và cho biết xe đưa đón có chạy ngang nhà không.',
    heroPoints: [
      `${F.address}`,
      `${F.wardNote} — nhiều ba/mẹ vẫn quen tìm theo tên phường cũ`,
      'Mặt tiền đường lớn, có chỗ dừng xe cho ba/mẹ đưa đón',
      'Xe đưa đón có nhân viên đi cùng, điểm danh bé lên và xuống xe',
    ],
    metrics: [
      { number: '2', label: 'Cơ sở Việt Anh tại Gò Vấp' },
      { number: F.ageFrom, label: 'Độ tuổi nhỏ nhất nhận bé' },
      { number: F.gymArea, label: 'Phòng giáo dục thể chất' },
      { number: '24/7', label: 'Hotline mầm non trực' },
    ],
    formTitle: 'Nhà ba/mẹ ở khu nào?',
    formDesc: 'Để lại thông tin — nhà trường chỉ lối đi ngắn nhất và cho biết xe đưa đón có chạy ngang nhà không.',
    formSocialProof: 'Nhận bé từ các phường quanh trường trong địa bàn Gò Vấp',
    nextText: 'Xem đường đi & tuyến xe',
    submitText: 'Nhận chỉ đường & tuyến xe',
    successMessage: `Đã nhận! Chuyên viên sẽ liên hệ trong ${F.responseTime} để chỉ đường và cho biết điểm đón gần nhà ba/mẹ nhất.`,
    body: `
<section class="sec">
  <h2>Trường ở đâu và ba/mẹ khu nào đi tiện</h2>
  <p class="lede">Lê Đức Thọ là trục ngang lớn của Gò Vấp. Một đầu nối ra Phan Văn Trị và Nguyễn Oanh, đầu kia thông sang khu Phạm Văn Chiêu, Lê Văn Thọ, Thống Nhất, Cây Trâm.</p>
  <div class="cards">
    <div class="card">
      <h3>Địa chỉ và cách gọi tên phường</h3>
      <p>Trường ở <strong>${F.address}</strong>. Đây là <strong>${F.wardNote}</strong> — nếu ba/mẹ đang tìm "mầm non phường 16 Gò Vấp" thì chính là nơi này. Trường nằm ngay mặt tiền, không phải luồn hẻm.</p>
    </div>
    <div class="card">
      <h3>Các tuyến đường quanh trường</h3>
      <p>${nearbyStreets.join(' · ')}.</p>
      <p>Ba/mẹ ở các tuyến này tới trường không phải vòng qua Quang Trung hay Nguyễn Kiệm — hai chỗ kẹt nhất Gò Vấp vào giờ đi làm.</p>
    </div>
    <div class="card">
      <h3>Buổi sáng có khó dừng xe không</h3>
      <p>Trường có khu vực dừng xe cho ba/mẹ đưa đón, không phải đậu tràn ra lòng đường như nhiều trường trong hẻm. Khung giờ nhận bé được trải ra thay vì dồn vào một mốc, nên tránh được cảnh mấy chục xe tới cùng lúc.</p>
    </div>
    <div class="card">
      <h3>Gia đình có con nhiều độ tuổi</h3>
      <p>Cơ sở liên cấp cho Tiểu học đến THPT ở <strong>${F.campusLienCap}</strong> — cách cơ sở mầm non không xa. Nhà có bé mầm non và anh chị lớn hơn thì đưa đón cùng một buổi sáng vẫn xoay được.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Tới nơi thì bé có gì ở đó</h2>
  <p class="lede">Khuôn viên trường thiết kế rộng rãi cho hoạt động ngoại khoá và vận động ngoài trời.</p>
  <div class="panel">
    <ul class="checklist">${F.facilities.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec">
  <h2>Xe đưa đón trong khu vực Gò Vấp</h2>
  <p class="lede">Trên mỗi chuyến đều có nhân viên đưa rước đi cùng, điểm danh bé lúc lên và lúc xuống xe — không để bé tự lên tự xuống.</p>
  <div class="panel">
    ${F.shuttleRoutes
      ? `<p style="margin:0;color:#4A4C6B;line-height:1.7">${F.shuttleRoutes}</p>`
      : `<p style="margin:0;color:#4A4C6B;line-height:1.7">Tuyến chạy được sắp lại theo từng năm học, tuỳ vị trí nhà của các gia đình đã đăng ký. Danh sách điểm đón cụ thể và mức phí sẽ do bộ phận Tuyển sinh gửi kèm sau khi ba/mẹ để lại địa chỉ. Nếu nhà ba/mẹ nằm ngoài tuyến hiện có, nhà trường vẫn ghi nhận để cân nhắc mở thêm điểm đón khi đủ số bé.</p>`}
  </div>
</section>`,
    faq: [
      { q: 'Trường nằm ở phường nào?', a: `${F.address} — tức ${F.wardNote}. Nhiều ba/mẹ vẫn tìm theo tên phường cũ nên hai cách gọi đều dẫn về cùng một nơi.` },
      { q: 'Nhà tôi ở Phan Văn Trị / Nguyễn Oanh / Quang Trung thì đi có tiện không?', a: 'Lê Đức Thọ nối thẳng ra Phan Văn Trị và Nguyễn Oanh ở một đầu, thông sang Phạm Văn Chiêu, Lê Văn Thọ, Thống Nhất ở đầu kia. Cách chắc ăn nhất là ba/mẹ nhắn địa chỉ nhà — chuyên viên sẽ chỉ đúng lối đi ngắn nhất theo khung giờ ba/mẹ hay đưa bé.' },
      { q: 'Trường có xe đưa đón không và chạy khu nào?', a: 'Có xe đưa đón phục vụ các khu vực quanh trường trong địa bàn Gò Vấp, mỗi chuyến có nhân viên đưa rước đi cùng và điểm danh bé lên xuống. Tuyến chạy sắp lại theo từng năm học tuỳ vị trí nhà của các gia đình đã đăng ký, nên danh sách điểm đón và mức phí sẽ được gửi riêng khi ba/mẹ để lại địa chỉ.' },
      { q: 'Trường có sân chơi và hồ bơi không?', a: `Có. Sân chơi thiết kế thoáng mát với khu vui chơi, sân cỏ nhân tạo, vườn hoa, hố cát và hồ bơi. Ngoài ra có phòng giáo dục thể chất ${F.gymArea} để bé học vận động thô: chạy, nhảy, bò, trườn, leo, bật. Khu vực cảm giác kích thích năm giác quan cũng đã được chuyển ra ngoài sân chơi.` },
      { q: 'Tôi muốn tới xem trường thì đi thế nào?', a: `Ba/mẹ để lại thông tin ở form trên trang, hoặc gọi ${F.hotlineMamNon}. Chuyên viên sẽ hẹn giờ và nhắn kèm chỉ đường tới ${F.addressShort}. Nên tới vào giờ bé đang sinh hoạt để nhìn thấy lớp học thật.` },
    ],
  },

  // ─────────────────────────────── AG 07 ───────────────────────────────
  {
    slug: 'an-toan',
    adGroup: 'AG 07 — An toàn, camera, sĩ số, dinh dưỡng',
    keywords: 'trường mầm non có camera, mầm non sĩ số ít, mầm non bữa ăn dinh dưỡng, trường mầm non an toàn, mầm non gò vấp camera',
    funnelCode: 'mn-govap-antoan',
    title: 'Mầm non Việt Anh Gò Vấp Có Camera Cho Phụ Huynh, Lớp Nhỏ, Bếp Nấu Tại Trường',
    description: `Mẹ đi làm vẫn nhìn thấy con: camera 24/7 có tài khoản cho phụ huynh mầm non, lớp ${F.classSize} bé, bếp riêng nấu tại trường, nề nếp lặp lại mỗi ngày.`,
    eyebrow: 'An toàn · Sĩ số · Dinh dưỡng',
    h1: 'Mẹ đang họp vẫn mở điện thoại nhìn thấy con',
    sub: 'Gắn camera thì trường nào cũng nói có. Khác biệt nằm ở chỗ ba/mẹ có mở lên xem được không — phụ huynh lớp mầm non ở đây được cấp tài khoản xem trực tuyến trong giờ học.',
    heroPoints: [
      'Phụ huynh lớp Mầm non được cấp tài khoản xem camera trong giờ học',
      `Lớp ${F.classSizeLabel} — cô lên kế hoạch cho từng bé, không phải giáo án chung`,
      'Bếp riêng nấu tại trường, không dùng thực phẩm đóng gói công nghiệp',
      'Mọi quy trình trong ngày lặp lại y hệt nhau để bé thấy an toàn',
    ],
    metrics: [
      { number: '24/7', label: 'Camera giám sát toàn khu' },
      { number: F.classSize, label: 'Bé mỗi lớp, tuỳ độ tuổi' },
      { number: '4 tuần', label: 'Chu kỳ xoay vòng thực đơn' },
      { number: '8h–17h', label: 'Phòng y tế trực trong trường' },
    ],
    formTitle: 'Đặt lịch tới xem tận nơi',
    formDesc: 'Ba/mẹ vào lớp lúc bé đang sinh hoạt, ghé khu bếp, hỏi thẳng sĩ số và quy trình y tế.',
    formSocialProof: 'Miễn phí · Lịch linh hoạt sáng, chiều và thứ 7',
    nextText: 'Đặt lịch xem trường',
    submitText: 'Đặt lịch tham quan',
    successMessage: `Đã nhận! Bộ phận Tuyển sinh sẽ liên hệ trong ${F.responseTime} để xác nhận lịch và hướng dẫn đường tới ${F.addressShort}.`,
    body: `
<section class="sec">
  <h2>Nỗi lo thật của mẹ đi làm không phải "con học được gì"</h2>
  <p class="lede">Mà là: lúc mình đang họp, con đang làm gì, có ai để ý tới con không, trưa nay con ăn có ngon không. Ở tuổi mầm non bé chưa kể lại được ngày của mình — nên trường phải kể thay.</p>
  <div class="cards">
    <div class="card">
      <h3>Camera — và tài khoản thật cho ba/mẹ</h3>
      <p>Phụ huynh lớp Mầm non được cấp <strong>tài khoản xem camera trực tuyến trong giờ học</strong>. Nhiều mẹ mở lên lúc nghỉ trưa chỉ để nhìn con ăn, rồi yên tâm làm tiếp. Toàn khu, gồm cả hành lang, có camera giám sát 24/7.</p>
      <p>Với các cấp lớn hơn, camera phục vụ an ninh và quản lý nội bộ chứ không mở tài khoản cho phụ huynh — chính sách này là riêng cho mầm non.</p>
    </div>
    <div class="card">
      <h3>Cô nhìn thấy từng bé, không nhìn cả lớp</h3>
      <p>Lớp ${F.classSizeLabel}. Quan trọng hơn con số: ${F.teacherPlanning.toLowerCase()}. Cô theo dõi bé bằng công cụ ${F.assessment} — ghi chú khách quan theo thời gian rồi chấm trên 34 yếu tố, nên tiến bộ của bé được nhìn bằng dữ liệu chứ không bằng cảm tính.</p>
    </div>
    <div class="card">
      <h3>Bữa ăn — nấu tại trường, không đặt suất công nghiệp</h3>
      <ul class="checklist">${F.nutrition.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
    <div class="card">
      <h3>An toàn về tâm lý, không chỉ an toàn thân thể</h3>
      <p>Trẻ 0–5 tuổi cần dấu hiệu của sự an toàn và ổn định mới yên tâm khám phá. Nên mọi hoạt động — từ giờ học tới giờ ăn, đi vệ sinh — đều có quy trình rõ ràng, <strong>lặp lại hằng ngày không đổi</strong>. Khi bé mất bình tĩnh, bé được đưa tới góc yên tĩnh nghe nhạc thiền để lấy lại cân bằng, thay vì bị phạt.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Các lớp giám sát khác</h2>
  <div class="panel">
    <ul class="checklist">${F.safety.slice(2).map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec">
  <h2>Bốn câu nên hỏi ở bất kỳ trường nào ba/mẹ đang cân nhắc</h2>
  <p class="lede">Kể cả Việt Anh. Trường nào trả lời được bằng con số cụ thể và cho xem tận nơi thì đáng để gửi con.</p>
  <div class="panel">
    <ul class="checklist">
      <li><strong>Một lớp bao nhiêu bé, và cho tôi nhìn vào lớp thật lúc bé đang sinh hoạt được không?</strong> Lớp trống lúc 5h chiều không nói lên điều gì.</li>
      <li><strong>Phụ huynh có tài khoản xem camera không, hay chỉ có camera để trường xem?</strong> Hai chuyện hoàn toàn khác nhau.</li>
      <li><strong>Bếp nấu tại trường hay đặt suất ăn ngoài? Cho tôi xem khu bếp và thực đơn tuần.</strong> Trường không ngại cho xem là trường đáng cân nhắc.</li>
      <li><strong>Khi con làm sai, trường xử lý thế nào?</strong> Nếu câu trả lời là phạt hoặc doạ, hãy hỏi tiếp xem còn cách nào khác không.</li>
    </ul>
  </div>
</section>`,
    faq: [
      { q: 'Tôi có xem được camera lớp của con trong giờ làm không?', a: 'Có. Phụ huynh lớp Mầm non được nhà trường cấp tài khoản xem camera trực tuyến trong giờ học — đây là chính sách riêng cho cấp mầm non, vì đây là độ tuổi bé chưa kể lại được ngày hôm nay của mình. Ngoài lớp học, hành lang và toàn khu đều có camera giám sát 24/7.' },
      { q: 'Một lớp bao nhiêu bé?', a: `${F.classSizeLabel}. Nhưng con số quan trọng không kém là cách cô làm việc: ${F.teacherPlanning.toLowerCase()}. Khi đi tham quan bất kỳ trường nào, ba/mẹ hãy hỏi thẳng cả hai điều này.` },
      { q: 'Bữa ăn của bé nấu ở đâu?', a: 'Trường có bếp riêng nấu tại chỗ, bếp một chiều, không đặt suất ăn công nghiệp và không dùng thực phẩm đóng gói sẵn. Thực đơn do chuyên gia dinh dưỡng thiết kế, xoay vòng theo chu kỳ 4 tuần. Ba/mẹ tới tham quan có thể yêu cầu xem khu bếp và bảng thực đơn tuần.' },
      { q: 'Khi con đánh bạn hoặc không nghe lời thì cô xử lý thế nào?', a: 'Nhà trường không dùng thưởng phạt. Cô đặt câu hỏi để bé tự thấy hệ quả của hành vi rồi tự đưa ra cam kết — ví dụ "Nếu em đánh bạn thì bạn sẽ như thế nào? Nếu bạn đánh em thì em phản ứng ra sao?". Bé cũng được rèn kỹ năng tỉnh thức qua yoga, ngồi thiền và có góc yên tĩnh để bình tâm trước khi quyết định.' },
      { q: 'Nếu bé bị té hoặc sốt ở trường thì xử lý ra sao?', a: 'Trường có phòng y tế trực 8h–17h và mọi học sinh đều có bảo hiểm tai nạn. Với va chạm nhỏ trong lúc chơi, nhân viên y tế xử lý tại chỗ và cô báo lại cho ba/mẹ ngay trong ngày. Với trường hợp cần theo dõi, nhà trường gọi ba/mẹ trực tiếp.' },
    ],
  },

  // ─────────────────────────────── AG 08 ───────────────────────────────
  {
    slug: 'so-sanh',
    adGroup: 'AG 08 — So sánh trường, trường nào tốt',
    keywords: 'trường mầm non nào tốt gò vấp, so sánh trường mầm non, review trường mầm non gò vấp, top trường mầm non gò vấp, chọn trường mầm non',
    funnelCode: 'mn-govap-sosanh',
    title: 'Chọn Trường Mầm non Việt Anh Gò Vấp — Học Tập Chủ Động, Montessori Hay Truyền Thống?',
    description: 'Ba trường phái mầm non khác nhau ở đâu, và bảng 15+ tiêu chí để ba/mẹ tự chấm điểm từng trường mình đi xem. Gửi PDF qua email.',
    eyebrow: 'Ba trường phái · 15+ tiêu chí',
    h1: 'Chọn trường mầm non ở Gò Vấp — so bằng tiêu chí, đừng so bằng cảm giác',
    sub: 'Trước khi so từng trường, nên biết chúng thuộc trường phái nào. Học tập chủ động, Montessori và truyền thống vận hành rất khác nhau — cái nào hợp với con mình mới là câu hỏi đúng.',
    heroPoints: [
      'Bảng so sánh ba trường phái: Học tập chủ động – Montessori – Truyền thống',
      'Hơn 15 tiêu chí: sĩ số, camera, bếp ăn, tiếng Anh, kỷ luật, học phí thực tế',
      'Dùng được cho mọi trường ba/mẹ đang cân nhắc, không riêng Việt Anh',
      'PDF gửi thẳng vào email, không cần chờ ai gọi lại',
    ],
    metrics: [
      { number: '3', label: 'Trường phái được so sánh' },
      { number: '15+', label: 'Tiêu chí trong bảng' },
      { number: F.rating + '/5', label: `Từ ${F.reviewCount} đánh giá phụ huynh` },
      { number: F.retention, label: 'Tỷ lệ gia đình học tiếp' },
    ],
    formTitle: 'Nhận bảng so sánh 15+ tiêu chí',
    formDesc: 'PDF gửi ngay vào email — mang theo khi đi tham quan từng trường.',
    formSocialProof: 'Dùng được cho mọi trường, không riêng Việt Anh',
    nextText: 'Nhận bảng so sánh',
    submitText: 'Gửi PDF cho tôi',
    successMessage: 'Đã gửi! Ba/mẹ kiểm tra email trong vài phút tới, nhớ xem cả mục Quảng cáo/Spam.',
    body: `
<section class="sec">
  <h2>Ba trường phái mầm non khác nhau ở đâu</h2>
  <p class="lede">Đây là bảng so sánh nhà trường dùng nội bộ. Việt Anh theo cột đầu tiên — học tập chủ động.</p>
  <div class="tablewrap">
    <table>
      <thead><tr><th>Tiêu chí</th><th>Học tập chủ động</th><th>Montessori</th><th>Truyền thống</th></tr></thead>
      <tbody>
        <tr><td><strong>Trung tâm</strong></td><td>Học sinh là trung tâm</td><td>Học sinh là trung tâm, tự học</td><td>Giáo viên là trung tâm</td></tr>
        <tr><td><strong>Hình thức</strong></td><td>Cá nhân chủ động — bé trải nghiệm trực tiếp với con người, sự việc, ý tưởng</td><td>Chú ý việc tự học, chơi đồ chơi, trải nghiệm thực tế</td><td>Cô dạy trực tiếp, chủ yếu là học vẹt</td></tr>
        <tr><td><strong>Môi trường</strong></td><td>Môi trường dân chủ</td><td>Môi trường tự do, không khuôn khổ</td><td>Bé bị kiểm soát, hoạt động do cô phân chia</td></tr>
        <tr><td><strong>Tổ chức lớp</strong></td><td>Phân nhóm theo trình độ</td><td>Phân nhóm theo trình độ</td><td>Phân nhóm theo độ tuổi</td></tr>
        <tr><td><strong>Học cụ</strong></td><td>Bé khám phá và dùng theo mục đích, kế hoạch riêng của mình</td><td>Bé tự khám phá, cô hướng dẫn cách dùng</td><td>—</td></tr>
        <tr><td><strong>Hoạt động nổi bật</strong></td><td>Plan – Do – Review, có thời gian cụ thể; bé lên được hai hoặc nhiều kế hoạch</td><td>Hoạt động Montessori, thời gian linh hoạt</td><td>—</td></tr>
        <tr><td><strong>Khen thưởng</strong></td><td>Tôn trọng tiến bộ của từng bé; sự phát triển cá nhân chính là phần thưởng</td><td>Sự phát triển cá nhân chính là phần thưởng</td><td>Động viên trên cơ sở thưởng, phạt</td></tr>
        <tr><td><strong>Kỹ năng xã hội</strong></td><td>Chú trọng</td><td>Chú trọng</td><td>Không chú trọng</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="sec">
  <h2>Sáu thứ phân biệt trường tốt với trường quảng cáo giỏi</h2>
  <p class="lede">Brochure trường nào cũng đẹp. Đây là những thứ chỉ lộ ra khi ba/mẹ hỏi thẳng và xin xem tận nơi.</p>
  <div class="tablewrap">
    <table>
      <thead><tr><th>Tiêu chí</th><th>Câu hỏi cụ thể nên đặt ra</th><th>Ở Việt Anh Gò Vấp</th></tr></thead>
      <tbody>
        <tr><td><strong>Sĩ số</strong></td><td>Một lớp bao nhiêu bé? Cho tôi nhìn vào lớp thật lúc bé đang sinh hoạt được không?</td><td>${F.classSizeLabel}</td></tr>
        <tr><td><strong>Camera</strong></td><td>Phụ huynh có tài khoản xem không, hay chỉ trường xem?</td><td>Phụ huynh mầm non được cấp tài khoản xem trong giờ học</td></tr>
        <tr><td><strong>Bếp ăn</strong></td><td>Nấu tại trường hay đặt suất ngoài? Cho tôi xem bếp và thực đơn tuần.</td><td>Bếp riêng nấu tại trường, thực đơn xoay vòng 4 tuần</td></tr>
        <tr><td><strong>Tiếng Anh</strong></td><td>Bao nhiêu thời gian bé thật sự nghe tiếng Anh mỗi ngày?</td><td>${F.englishModel}</td></tr>
        <tr><td><strong>Kỷ luật</strong></td><td>Khi con làm sai thì trường xử lý thế nào?</td><td>Không thưởng phạt; bé được dẫn dắt để tự thấy hệ quả và tự cam kết</td></tr>
        <tr><td><strong>Học phí</strong></td><td>Con số đã gồm những gì? Khoản nào phát sinh giữa năm?</td><td>Bảng chi tiết kèm danh sách khoản không thu thêm</td></tr>
      </tbody>
    </table>
  </div>
</section>

<section class="sec">
  <h2>Bốn sai lầm hay gặp khi đi xem trường</h2>
  <div class="cards">
    <div class="card">
      <h3>Đi xem lúc trường vắng</h3>
      <p>Lớp trống lúc 5h chiều thì trường nào cũng gọn gàng. Ba/mẹ phải xin đến vào giờ bé đang sinh hoạt — đó là lúc nhìn thấy cô tương tác thật, mức ồn thật, và các bé có vui thật hay không.</p>
    </div>
    <div class="card">
      <h3>So học phí bằng một con số</h3>
      <p>Trường A rẻ hơn trường B mười phần trăm, nhưng thu thêm phí sự kiện, học liệu, ngoại khoá bắt buộc suốt năm. Chỉ khi cộng đủ cả năm mới biết trường nào thực sự rẻ hơn.</p>
    </div>
    <div class="card">
      <h3>Quên hỏi về lúc mọi việc không suôn sẻ</h3>
      <p>Con khóc cả tuần thì cô làm gì? Con té thì bao lâu ba/mẹ được báo? Con đánh bạn thì trường xử lý ra sao? Cách một trường trả lời những câu này nói nhiều hơn cả cơ sở vật chất.</p>
    </div>
    <div class="card">
      <h3>Đi một mình và không ghi lại</h3>
      <p>Xem ba trường trong hai tuần thì tới trường thứ ba là quên trường thứ nhất. Mang bảng so sánh theo, điền ngay tại chỗ — về nhà ba/mẹ mới có cái để ngồi bàn với nhau.</p>
    </div>
  </div>
</section>`,
    faq: [
      { q: 'Học tập chủ động khác Montessori thế nào?', a: `Cả hai đều lấy trẻ làm trung tâm và đều phân nhóm theo trình độ, nhưng vận hành khác nhau. Ở học tập chủ động, hoạt động cốt lõi là ${F.pdrName} với thời gian cụ thể — bé nói trước mình sẽ làm gì, làm, rồi ngồi lại nhìn nhận. Ở Montessori, thời gian linh hoạt hơn và xoay quanh học cụ, bé hoàn tất việc của mình rồi tự đổi sang hoạt động khác. Việt Anh theo hướng thứ nhất.` },
      { q: 'Bảng so sánh này có thiên vị Việt Anh không?', a: 'Bảng liệt kê tiêu chí và câu hỏi nên đặt ra, có cột trống để ba/mẹ tự điền cho từng trường — dùng được cho mọi trường đang cân nhắc. Nếu một trường khác đáp ứng tốt hơn ở những tiêu chí quan trọng với gia đình mình, ba/mẹ nên chọn trường đó.' },
      { q: 'Nên xem bao nhiêu trường trước khi quyết định?', a: 'Hai đến ba trường là đủ để có điểm so sánh mà chưa bị rối. Quan trọng hơn số lượng là xem cùng một khung giờ và hỏi cùng một bộ câu hỏi — nếu không, ba/mẹ đang so trường A buổi sáng với trường B buổi chiều, hai thứ khác hẳn nhau.' },
      { q: 'Trường công hay trường tư tốt hơn cho mầm non?', a: 'Không có câu trả lời chung. Trường công học phí thấp và ổn định nhưng sĩ số thường cao và chương trình theo khung quốc gia. Trường tư linh hoạt hơn về sĩ số, chương trình và giờ giấc nhưng chi phí lớn hơn. Điều nên hỏi là: với đứa trẻ cụ thể của gia đình mình và lịch làm việc cụ thể của ba/mẹ, thứ nào quan trọng hơn?' },
      { q: 'Đánh giá của phụ huynh hiện tại thế nào?', a: `${F.rating}/5 từ ${F.reviewCount} đánh giá, và ${F.retention} gia đình học tiếp năm sau. Với trường mầm non thì tỷ lệ học tiếp là con số đáng tin nhất, vì phụ huynh gia hạn nghĩa là đã sống qua một năm thật rồi mới quyết định.` },
    ],
  },

  // ─────────────────────────────── AG 09 ───────────────────────────────
  {
    slug: 'tham-quan',
    adGroup: 'AG 09 — Tham quan, tư vấn, học thử',
    keywords: 'đăng ký tham quan trường mầm non, tư vấn chọn trường mầm non, học thử mầm non, tham quan mầm non gò vấp, cho con học thử',
    funnelCode: 'mn-govap-thamquan',
    title: 'Tham Quan & Học Thử Mầm non Việt Anh Gò Vấp — Miễn Phí, Không Ràng Buộc',
    description: 'Đặt lịch tham quan Mầm non Việt Anh Gò Vấp: xem một giờ Plan–Do–Review thật, đi hết các khu vực trong lớp, thăm khu bếp, bé chơi thử cùng các bạn. Miễn phí.',
    eyebrow: 'Tham quan & học thử · Miễn phí',
    h1: 'Đến xem một buổi học thật rồi hãy quyết định',
    sub: 'Nên tới đúng giờ bé đang sinh hoạt — nhất là giờ Plan–Do–Review, khi các bé tự nói ra mình sẽ làm gì. Đó là lúc ba/mẹ thấy được chương trình có thật hay chỉ có trên giấy.',
    heroPoints: [
      'Xem một giờ Plan – Do – Review thật, không phải lớp trống',
      'Đi hết các khu vực trong lớp: khu nhà, hình khối, khoa học, toán, viết chữ',
      `Ghé thư viện, phòng giáo dục thể chất ${F.gymArea} và khu bếp`,
      'Bé chơi thử cùng các bạn, ba/mẹ quan sát phản ứng của con',
    ],
    metrics: [
      { number: '60–90', label: 'Phút cho một buổi tham quan' },
      { number: 'Miễn phí', label: 'Không ràng buộc đăng ký' },
      { number: F.responseTime, label: 'Thời gian phản hồi' },
      { number: 'T2–T7', label: 'Lịch linh hoạt sáng & chiều' },
    ],
    formTitle: 'Đặt lịch tham quan miễn phí',
    formDesc: 'Sáng, chiều hay thứ 7 đều được — chọn giờ hợp với lịch làm việc của ba/mẹ.',
    formSocialProof: `Phản hồi trong ${F.responseTime} · Không ràng buộc`,
    nextText: 'Đặt lịch tham quan',
    submitText: 'Xác nhận đặt lịch',
    successMessage: `Đã nhận! Bộ phận Tuyển sinh sẽ liên hệ trong ${F.responseTime} để xác nhận giờ và hướng dẫn đường tới ${F.addressShort}.`,
    body: `
<section class="sec">
  <h2>Thứ đáng xem nhất là giờ Plan – Do – Review</h2>
  <p class="lede">Đây là hoạt động cốt lõi của chương trình. Nhìn một lượt là ba/mẹ biết ngay trường có thật sự để bé chủ động hay chỉ nói vậy.</p>
  ${pdrTimeline}
  <p class="lede" style="margin-top:1.4rem">${F.pdrPurpose}.</p>
</section>

<section class="sec">
  <h2>Các khu vực trong lớp bé sẽ dùng mỗi ngày</h2>
  <p class="lede">Lớp chia thành nhiều khu vực riêng để bé tự chọn chỗ mình muốn làm. Ba/mẹ nên đi hết một vòng và xem bé nhà mình dừng lại lâu nhất ở đâu.</p>
  <div class="tablewrap">
    <table>
      <thead><tr><th>Khu vực</th><th>Bé làm gì ở đó</th></tr></thead>
      <tbody>
        ${F.classAreas.map((a) => `<tr><td><strong>${a.name}</strong></td><td>${a.desc}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>
</section>

<section class="sec">
  <h2>Nên đi vào lúc nào và nên hỏi gì</h2>
  <div class="cards">
    <div class="card">
      <h3>Đi vào giờ bé đang sinh hoạt</h3>
      <p>Lớp trống lúc tan học thì trường nào cũng gọn gàng. Ba/mẹ nên xin đến vào giờ các bé đang học và chơi — đó là lúc nhìn thấy cô tương tác thật, mức ồn thật, và các bé có vui thật hay không.</p>
    </div>
    <div class="card">
      <h3>Cho bé đi cùng</h3>
      <p>Nhà trường khuyến khích bé đi cùng và vào lớp trải nghiệm. Vì lớp tổ chức đa độ tuổi nên bé nhà ba/mẹ sẽ chơi cùng cả anh chị lớn hơn — quan sát bé xoay xở trong tình huống đó cũng là một dữ liệu đáng giá.</p>
    </div>
    <div class="card">
      <h3>Hỏi cả những chuyện không suôn sẻ</h3>
      <p>Con khóc cả tuần thì cô làm gì? Con đánh bạn thì trường xử lý ra sao? Con biếng ăn thì sao? Cách một trường trả lời những câu này nói nhiều hơn cơ sở vật chất.</p>
    </div>
    <div class="card">
      <h3>Không bị ép quyết định tại chỗ</h3>
      <p>Sau tham quan, ba/mẹ về nhà suy nghĩ, bàn với gia đình, so sánh với trường khác. Chuyên viên sẽ hỏi thăm lịch sự để giải đáp thêm, nhưng quyết định hoàn toàn thuộc về ba/mẹ.</p>
    </div>
  </div>
</section>`,
    faq: [
      { q: 'Buổi tham quan gồm những gì?', a: `Ba/mẹ đi hết các khu vực bé sinh hoạt mỗi ngày — lớp học với các khu nhà, hình khối, đọc sách, nghệ thuật, khoa học, toán học, vận động, âm nhạc, máy tính, viết chữ — cùng thư viện, phòng giáo dục thể chất ${F.gymArea} và khu bếp. Sau đó là phần trao đổi riêng với chuyên viên Tuyển sinh.` },
      { q: 'Bé có được đi cùng và vào lớp học thử không?', a: 'Không chỉ được mà nhà trường rất khuyến khích. Bé sẽ vào lớp thật, chơi và tham gia hoạt động cùng các bạn dưới sự hướng dẫn của cô. Vì lớp tổ chức đa độ tuổi nên bé sẽ gặp cả bạn lớn hơn và nhỏ hơn mình.' },
      { q: 'Nên xin xem giờ nào là đáng nhất?', a: `Giờ ${F.pdrName}. Đây là lúc bé ngồi vòng tròn cùng cô nói ra kế hoạch của mình, rồi tự đi làm, rồi cuối giờ quay lại kể mình đã làm được gì. Nhìn một lượt là biết ngay bé có thật sự được chủ động hay không.` },
      { q: 'Có cần đặt lịch trước không?', a: `Nên đặt trước để nhà trường chuẩn bị tốt nhất và để ba/mẹ được chú ý đầy đủ thay vì đi chung đoàn đông. Lịch linh hoạt: sáng, chiều hoặc thứ 7. Sau khi đăng ký, bộ phận Tuyển sinh liên hệ trong ${F.responseTime} để xác nhận giờ và hướng dẫn đường đi.` },
      { q: 'Tham quan có mất phí không?', a: 'Hoàn toàn miễn phí và không ràng buộc. Nhà trường không thu bất kỳ khoản nào cho buổi tham quan hay buổi học thử của bé.' },
    ],
  },

  // ─────────────────────────────── AG 10 ───────────────────────────────
  {
    slug: 'vao-lop-1',
    adGroup: 'AG 10 — Tự lập, tự tin, chuẩn bị vào lớp 1',
    keywords: 'chuẩn bị cho con vào lớp 1, lớp lá gò vấp, tiền tiểu học gò vấp, con nhút nhát vào lớp 1, kỹ năng trước khi vào lớp 1',
    funnelCode: 'mn-govap-lop1',
    // Lớp lá / tiền tiểu học: bé 5 tuổi sắp vào lớp 1 → khối "5 tuổi", không phải 3 tuổi.
    schoolLevel: '5-tuoi',
    title: 'Chuẩn Bị Vào Lớp 1 Ở Gò Vấp — Bằng Tự Lập, Không Phải Học Trước',
    description: 'Con vào lớp 1 cần độc lập, có trách nhiệm và tự tin hơn là biết đọc trước. Mầm non Việt Anh Gò Vấp rèn điều đó qua Plan–Do–Review mỗi ngày.',
    eyebrow: 'Sẵn sàng vào lớp 1',
    h1: 'Con vào lớp 1 vững vì tự lập, không phải vì biết đọc trước',
    sub: 'Bé thông minh vẫn khóc suốt tuần đầu lớp 1 — không phải vì thiếu chữ, mà vì chưa quen tự xoay xở, chưa ngồi lâu được, chưa dám nói khi cần giúp.',
    heroPoints: [
      'Mỗi ngày bé tự lên kế hoạch, tự làm, tự nhìn lại — thành thói quen',
      'Khu vực viết chữ rèn vận động tinh và tính tập trung cho lớp 1',
      'Khu vực toán học dùng giáo cụ trực quan, bé hiểu bản chất chứ không học vẹt',
      'Học chung với anh chị lớn hơn, bé quen việc tự xoay xở trong nhóm',
    ],
    metrics: [
      { number: '3', label: 'Bước mỗi ngày: Plan – Do – Review' },
      { number: '8+1', label: 'Lĩnh vực được theo dõi tiến bộ' },
      { number: F.classSize, label: 'Bé mỗi lớp, tuỳ độ tuổi' },
      { number: F.gymArea, label: 'Phòng giáo dục thể chất' },
    ],
    formTitle: 'Nhận checklist sẵn sàng vào lớp 1',
    formDesc: 'Danh sách kỹ năng con cần có trước khi vào lớp 1, kèm cách ba/mẹ tập cùng con ở nhà.',
    formSocialProof: 'Gửi qua email trong 1 phút · Miễn phí',
    nextText: 'Nhận checklist lớp 1',
    submitText: 'Gửi checklist cho tôi',
    successMessage: 'Đã gửi! Ba/mẹ kiểm tra email trong vài phút tới, nhớ xem cả mục Quảng cáo/Spam.',
    body: `
<section class="sec">
  <h2>Thứ khiến tuần đầu lớp 1 khó khăn không phải chữ</h2>
  <p class="lede">Cô lớp 1 nhìn thấy điều này mỗi năm: bé đọc trơn tru nhưng không dám giơ tay xin đi vệ sinh, không tự mở hộp sữa, không biết làm gì khi bạn giành đồ.</p>
  <div class="cards">
    <div class="card">
      <h3>Thói quen làm việc có kế hoạch</h3>
      <p>Mỗi ngày bé đều đi qua ba bước: nói ra mình sẽ làm gì, làm nó, rồi ngồi lại xem điều gì được điều gì chưa và lần sau sẽ khác thế nào. ${F.pdrPurpose}. Đây chính là thứ lớp 1 đòi hỏi mà nhiều bé chưa từng được tập.</p>
    </div>
    <div class="card">
      <h3>Tự lập và có trách nhiệm</h3>
      <p>Kết quả nhà trường đặt ra cho bậc mầm non ghi rõ: bé trở nên <strong>độc lập, có trách nhiệm và tự tin — sẵn sàng bước vào tiểu học</strong>. Không phải bé đọc được bao nhiêu chữ.</p>
    </div>
    <div class="card">
      <h3>Dám nói khi cần giúp</h3>
      <p>Bé nhút nhát thường không thiếu tự tin bẩm sinh, mà chưa từng được tập nói ra nhu cầu của mình. Trong giờ Plan, bé phải tự nói kế hoạch của mình trước cô và các bạn — mỗi ngày một lần, suốt cả năm. Bé cũng học kỹ năng giao tiếp, đàm phán và giải quyết vấn đề khi chơi cùng các anh chị lớn hơn.</p>
    </div>
    <div class="card">
      <h3>Chữ và số đến qua giáo cụ, không qua vở tập viết</h3>
      <p>Lớp có <strong>khu vực viết chữ</strong> để bé rèn kỹ năng viết chuẩn bị vào lớp 1, hoàn thiện vận động tinh và tính kỷ luật, kiên trì, tập trung. <strong>Khu vực toán học</strong> là một trong những khu nhiều giáo cụ nhất — bé chạm và làm việc trực tiếp với giáo cụ trực quan để hiểu bản chất, thay vì học thuộc con số trừu tượng.</p>
    </div>
  </div>
</section>

<section class="sec">
  <h2>Những gì bé mang theo khi rời mầm non</h2>
  <div class="panel">
    <ul class="checklist">${F.outcomes.map((x) => `<li>${x}</li>`).join('')}</ul>
  </div>
</section>

<section class="sec">
  <h2>Ba/mẹ tập cùng con ở nhà thế nào</h2>
  <div class="panel">
    <ul class="checklist">
      <li>Sáng ra hỏi con "hôm nay con định làm gì?", tối về hỏi "con làm được tới đâu rồi?" — đúng nhịp Plan và Review mà con đang quen ở lớp.</li>
      <li>Để con tự làm những việc con làm được, kể cả khi chậm hơn ba/mẹ làm giúp.</li>
      <li>Khi con làm sai, hỏi "nếu con làm vậy thì chuyện gì xảy ra?" thay vì phạt — giống cách cô làm ở trường, để con không nhận hai thông điệp trái ngược.</li>
      <li>Cho con chờ tới lượt trong những tình huống nhỏ hằng ngày.</li>
      <li>Đọc sách cùng con mỗi tối — mục tiêu là con thích sách, không phải con đọc được sớm.</li>
    </ul>
  </div>
</section>`,
    faq: [
      { q: 'Con chưa biết đọc có vào lớp 1 được không?', a: 'Được. Chương trình lớp 1 được thiết kế để dạy trẻ từ đầu. Thứ khiến bé vất vả trong tuần đầu không phải chữ, mà là chưa quen tự phục vụ, chưa ngồi lâu được và chưa dám nói khi cần giúp — đó mới là những thứ nên tập ở tuổi mầm non.' },
      { q: 'Trường có dạy trước chương trình lớp 1 không?', a: 'Không dạy trước chương trình. Lớp có khu vực viết chữ để bé rèn kỹ năng viết và tính tập trung, và khu vực toán học với giáo cụ trực quan để bé hiểu bản chất con số. Mục tiêu là bé sẵn sàng về kỹ năng và thái độ, chứ không phải biết trước bài của lớp 1.' },
      { q: 'Con nhút nhát thì làm sao để hoà nhập ở lớp 1?', a: 'Trong giờ Plan mỗi ngày, bé phải tự nói ra kế hoạch của mình trước cô và các bạn. Lặp lại suốt năm học, việc nói trước nhóm trở thành chuyện bình thường. Lớp lại tổ chức đa độ tuổi nên bé quen với việc giao tiếp cả với bạn lớn hơn lẫn nhỏ hơn mình.' },
      { q: 'Làm sao biết con đang tiến bộ tới đâu?', a: `Cô theo dõi bé bằng công cụ ${F.assessment} trên đủ 8 lĩnh vực, cộng lĩnh vực Tiếng Anh. ${F.assessmentDetail}. Ba/mẹ có thể hỏi cô về kết quả này thay vì chỉ hỏi "hôm nay con ngoan không".` },
      { q: 'Con học ở đây rồi lên lớp 1 ở đâu?', a: `Hệ thống có cơ sở liên cấp tại ${F.campusLienCap} cho Tiểu học đến THPT, nên bé có thể học tiếp trong cùng hệ thống. Bé cũng hoàn toàn chuyển sang trường khác được. ${callLine}` },
    ],
  },
];

export const adsPagesBySlug = Object.fromEntries(adsPages.map((p) => [p.slug, p]));
export const adsBaseUrl = BASE;
