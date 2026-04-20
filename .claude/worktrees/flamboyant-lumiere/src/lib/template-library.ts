export type TemplateSample = {
  slug: string;
  classCode: string;
  templateClass: string;
  group: 'Performance' | 'SEO / Authority' | 'Mid-funnel / Nurturing' | 'System / Utility';
  theme: 'performance' | 'authority' | 'nurture' | 'system';
  pageRole: string;
  description: string;
  audience: string;
  funnel: string;
  traffic: string;
  cvr: string;
  primaryCta: string;
  secondaryCta: string;
  sampleHeadline: string;
  sampleBody: string;
  previewHighlights: string[];
  blockOrder: string[];
  brandRules: string[];
  seoRules: string[];
  enhancementIdeas: string[];
  internalLinks: { title: string; href: string; body: string }[];
};

export type TemplateBlueprint = {
  answerFirst: string[];
  hubspotInspired: string[];
  schema: string[];
  performance: string[];
  sampleRoute: string;
  productionRoute: string;
};

type TemplateSeed = Omit<
  TemplateSample,
  'classCode' | 'brandRules' | 'seoRules' | 'enhancementIdeas'
> & {
  classNumber: number;
  productionRoute: string;
  schema: string[];
  answerFirst: string[];
  hubspotInspired: string[];
  performance: string[];
  brandRules?: string[];
  seoRules?: string[];
  enhancementIdeas?: string[];
};

const defaultBrandRules = (theme: TemplateSample['theme']) => {
  const common = [
    'Giữ giọng điệu ấm, rõ, có bằng chứng và không dùng khẩu hiệu rỗng.',
    'Ưu tiên ảnh thật, campus thật, con người thật; không dùng stock photo.',
    'CTA phải cụ thể, lịch sự, đúng bước tiếp theo của phụ huynh.',
  ];

  if (theme === 'performance') {
    return [
      ...common,
      'Giữ landing ngắn, thẳng, ít nhiễu và không biến thành trang brochure.',
    ];
  }

  if (theme === 'authority') {
    return [
      ...common,
      'Thể hiện chiều sâu học thuật và local trust nhưng không nặng nề, khô cứng.',
    ];
  }

  if (theme === 'nurture') {
    return [
      ...common,
      'Nội dung phải giải thích và nuôi niềm tin trước khi đẩy sang CTA chuyển đổi.',
    ];
  }

  return [
    ...common,
    'Ưu tiên tính hữu ích, tính định hướng và trải nghiệm hậu chuyển đổi rõ ràng.',
  ];
};

const defaultSeoRules = (group: TemplateSample['group']) => {
  const base = [
    'Dùng H1 duy nhất, heading H2/H3 theo đúng search intent và semantic coverage.',
    'Viết answer-first 40-60 từ đầu trang để tăng khả năng được AI trích xuất.',
    'Dùng dữ liệu dạng text, list hoặc HTML table; không nhét thông tin quan trọng vào ảnh.',
  ];

  if (group === 'Performance') {
    return [
      ...base,
      'Chỉ index khi landing có giá trị SEO thật; nếu không, để noindex và tối ưu cho tốc độ.',
    ];
  }

  if (group === 'SEO / Authority') {
    return [
      ...base,
      'Xây internal links theo mô hình pillar-cluster của HubSpot, có route hai chiều giữa hub và spoke.',
    ];
  }

  if (group === 'Mid-funnel / Nurturing') {
    return [
      ...base,
      'FAQ, comparison và objection pages phải khớp ý định tìm kiếm, tránh trộn nhiều intent trên một trang.',
    ];
  }

  return [
    ...base,
    'Các trang utility cần robots, canonical và lifecycle rõ ràng để không làm loãng crawl budget.',
  ];
};

const defaultEnhancementIdeas = (theme: TemplateSample['theme']) => {
  if (theme === 'performance') {
    return [
      'Thêm tracking chuẩn theo CTA chính, CTA phụ và thank-you path.',
      'A/B test headline, trust strip và biến thể CTA theo campus hoặc cấp học.',
    ];
  }

  if (theme === 'authority') {
    return [
      'Bổ sung schema đầy đủ và route liên kết hai chiều với pillar, campus và money pages.',
      'Chuẩn hóa block proof, review và author/source-of-truth để tăng E-E-A-T.',
    ];
  }

  if (theme === 'nurture') {
    return [
      'Tăng khối FAQ, comparison table hoặc answer snippets cho cụm query AI Overview.',
      'Dùng CTA mềm ở giữa bài và CTA chuyển đổi ở cuối hành trình đọc.',
    ];
  }

  return [
    'Tinh gọn UI và làm rõ next-step logic cho từng đối tượng truy cập.',
    'Ràng buộc index/noindex, redirect và refresh cycle ngay từ đầu.',
  ];
};

const seeds: TemplateSeed[] = [
  {
    classNumber: 1,
    slug: 'class-a-fee-capture',
    templateClass: 'Class Fee Capture Landing (Nhận bảng học phí)',
    group: 'Performance',
    theme: 'performance',
    pageRole: 'Đổi bảng học phí chi tiết lấy lead có chủ đích thương mại.',
    description:
      'Landing học phí phải cực rõ về lợi ích, range chi phí và bước tiếp theo; không được dài dòng hay làm phụ huynh phải đoán.',
    audience: 'Phụ huynh đang tìm học phí theo cấp học, campus hoặc khu vực.',
    funnel: 'BOFU',
    traffic: 'Google Search Ads, SEO commercial, Meta retargeting, Zalo lead ads',
    cvr: '12-18%',
    primaryCta: 'Nhận bảng học phí',
    secondaryCta: 'Nhắn Zalo tư vấn',
    sampleHeadline: 'Nhận bảng học phí chi tiết trong vài phút để so sánh rõ và quyết định tự tin hơn.',
    sampleBody:
      'Trang này cần nói rõ gia đình sẽ nhận được gì, học phí bao gồm gì và nên làm bước tiếp theo nào sau khi để lại thông tin.',
    previewHighlights: [
      'Có bảng học phí dạng text/table, không dùng ảnh chụp bảng giá.',
      'Có trust strip ngắn: review, campus thật, số hotline thật.',
      'Form rất ngắn và xuất hiện sớm trên mobile.',
      'Có liên kết mềm sang campus và tuyển sinh cho người cần đọc thêm.',
    ],
    blockOrder: [
      'Hero message-match với H1, subheadline và CTA học phí.',
      'Bảng học phí tóm tắt bằng HTML table, có chú thích phạm vi áp dụng.',
      'Khối “Học phí đã bao gồm những gì”.',
      'Khối trust: review, số liệu, campus thật.',
      'Form ngắn và FAQ tài chính ngay dưới form.',
      'Sticky CTA gọi/Zalo và next-step sang tour hoặc tuyển sinh.',
    ],
    internalLinks: [
      { title: 'Trang học phí', href: '/hoc-phi', body: 'Money hub tổng để người dùng đọc sâu hơn về chính sách tài chính.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Admissions hub cho nhóm đã sẵn sàng bước sang quy trình tuyển sinh.' },
      { title: 'Campus gần nhất', href: '/co-so/go-vap-phan-huy-ich', body: 'Trang cơ sở để tăng local trust trước khi chốt lịch tham quan.' },
    ],
    productionRoute: '/hoc-phi',
    schema: ['WebPage', 'Offer', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu cần trả lời ngay phụ huynh sẽ nhận bảng học phí cho cấp nào, cơ sở nào và trong bao lâu.',
      'Ngay dưới hero nên có 40-60 từ giải thích học phí đã bao gồm gì để AI không suy diễn sai.',
    ],
    hubspotInspired: [
      'Fee landing là trang BOFU; chỉ một mục tiêu là đổi biểu phí lấy lead chất lượng.',
      'Trang phải nhận link từ tuition hub, pillar page và campus page cùng intent.',
    ],
    performance: [
      'LCP dưới 2.5s trên mobile, hero chỉ dùng một media nhẹ.',
      'HTML table và form server-render; tránh widget nặng hoặc chat popup dày đặc.',
    ],
  },
  {
    classNumber: 2,
    slug: 'class-b-campus-tour',
    templateClass: 'Class Campus Tour / Local Admission Landing (Đặt lịch tham quan)',
    group: 'Performance',
    theme: 'performance',
    pageRole: 'Đưa phụ huynh đến campus thật để tăng lead quality.',
    description:
      'Landing tham quan cơ sở phải làm rõ địa điểm, đường đi, điểm mạnh của campus và booking flow thật ngắn trên mobile.',
    audience: 'Phụ huynh ở gần campus hoặc đang cần xem trường trực tiếp.',
    funnel: 'MOFU → BOFU',
    traffic: 'Local SEO, Google Maps intent, PMax local, Zalo bán kính',
    cvr: '8-14%',
    primaryCta: 'Đặt lịch tham quan',
    secondaryCta: 'Xem đường đi',
    sampleHeadline: 'Muốn nhìn trường bằng mắt thật? Hãy bắt đầu bằng một lịch tham quan rõ ràng và rất dễ đặt.',
    sampleBody:
      'Trang cần cho thấy campus thật, bản đồ thật, ảnh thật và lịch đặt hẹn thật nhanh. Tất cả phải phục vụ quyết định đi xem trường.',
    previewHighlights: [
      'NAP phải đồng nhất với Google Business Profile.',
      'Có map nhúng thật và mô tả đường đi bằng chữ.',
      'Có gallery campus thật và review của phụ huynh tại campus đó.',
      'CTA booking luôn hiện rõ ở vùng dễ chạm trên mobile.',
    ],
    blockOrder: [
      'Hero campus-specific với tên cơ sở, địa chỉ, hotline và CTA.',
      'Khối quick facts: giờ mở cửa, cấp học, khoảng cách, tiện ích xung quanh.',
      'Google Map + hướng dẫn đường đi bằng văn bản.',
      'Gallery thực tế và điểm mạnh campus.',
      'Calendar booking / form đặt lịch.',
      'Review campus và CTA chốt lịch tham quan.',
    ],
    internalLinks: [
      { title: 'Campus profile', href: '/co-so/go-vap-phan-huy-ich', body: 'Trang hồ sơ cơ sở đầy đủ cho người muốn xem sâu hơn.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Trang quy trình tuyển sinh để hiểu các bước sau khi tham quan.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Money page cho người cần đối chiếu chi phí sau khi xem cơ sở.' },
    ],
    productionRoute: '/tham-quan-truong',
    schema: ['EducationalOrganization', 'Place', 'LocalBusiness', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu phải trả lời ngay campus nằm ở đâu, phù hợp cấp học nào và cách đặt lịch nhanh nhất.',
      'Dùng câu văn mô tả đường đi hoặc mốc địa lý để hỗ trợ AI và voice search.',
    ],
    hubspotInspired: [
      'Local landing này là nhánh chuyển đổi trực tiếp từ campus hub và local cluster.',
      'Cần route hai chiều giữa campus profile, level pillar và admissions hub.',
    ],
    performance: [
      'Map lazy-load sau khối thông tin chính.',
      'Gallery chỉ tải thumb ở fold đầu; ảnh lớn lazy-load.',
    ],
  },
  {
    classNumber: 3,
    slug: 'class-c-open-day',
    templateClass: 'Class Open Day / Event Landing (Sự kiện / Ngày hội)',
    group: 'Performance',
    theme: 'performance',
    pageRole: 'Gom lead sự kiện theo đợt bằng timeline và urgency có kiểm soát.',
    description:
      'Landing sự kiện cần tạo cảm giác đáng đi, đáng đăng ký, nhưng vẫn giữ tone thương hiệu lịch sự và minh bạch.',
    audience: 'Phụ huynh cần một dịp cụ thể để đến trường và trải nghiệm.',
    funnel: 'MOFU / BOFU',
    traffic: 'Meta, Instagram, email, Zalo, retargeting',
    cvr: '10-16%',
    primaryCta: 'Đăng ký tham dự',
    secondaryCta: 'Xem lịch chương trình',
    sampleHeadline: 'Một ngày hội tốt không chỉ đông người, mà phải khiến phụ huynh thấy “đi đến là đáng”.',
    sampleBody:
      'Trang event cần trả lời rõ ai nên tham gia, diễn ra khi nào, có gì tại sự kiện và vì sao nên đăng ký ngay hôm nay.',
    previewHighlights: [
      'URL nên evergreen để tái dùng qua từng năm.',
      'Có timeline chi tiết và hoạt động cụ thể cho phụ huynh, học sinh.',
      'Có video hoặc recap năm trước để tăng trust.',
      'Form ngắn và thank-you page điều hướng tốt sau đăng ký.',
    ],
    blockOrder: [
      'Hero sự kiện với ngày, địa điểm, số lượng giới hạn và CTA.',
      'Khối quick answer: ai nên tham gia, nhận được gì.',
      'Timeline chương trình trong ngày.',
      'Guest speakers / hoạt động / khu trải nghiệm.',
      'Form đăng ký và FAQ sự kiện.',
      'CTA cuối trang + link sang campus hoặc tuyển sinh liên quan.',
    ],
    internalLinks: [
      { title: 'Open Day hub', href: '/open-day', body: 'Hub sự kiện dùng để gom và điều phối các event chi tiết.' },
      { title: 'Campus liên quan', href: '/co-so/go-vap-phan-huy-ich', body: 'Tăng local trust và xem trường trước/sau sự kiện.' },
      { title: 'Thank-you event', href: '/thank-you/event', body: 'Bước tiếp theo sau khi đăng ký.' },
    ],
    productionRoute: '/open-day',
    schema: ['Event', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Phải có đoạn 40-60 từ nêu rõ ngày, đối tượng tham gia và lợi ích lớn nhất.',
      'Các mốc thời gian phải ở format text dễ parse và đúng chuẩn ngày giờ.',
    ],
    hubspotInspired: [
      'Event landing là nhánh campaign nhưng vẫn phải link về campus và admissions hub.',
      'Mọi block đều phải phục vụ một ý định: biến quan tâm thành đăng ký sự kiện.',
    ],
    performance: [
      'Countdown dùng script rất nhẹ hoặc render server-side.',
      'Video recap lazy-load; ưu tiên poster ở fold đầu.',
    ],
  },
  {
    classNumber: 4,
    slug: 'class-d-trial-class',
    templateClass: 'Class Trial Class / Học Thử Landing (Đăng ký học thử)',
    group: 'Performance',
    theme: 'performance',
    pageRole: 'Xử lý nỗi lo hòa nhập và chuyển phụ huynh sang trải nghiệm thật.',
    description:
      'Landing học thử cần chạm đúng pain point, có proof cảm xúc và chốt một hành động rất gần với quyết định nhập học.',
    audience: 'Phụ huynh còn lăn tăn về khả năng hòa nhập của con.',
    funnel: 'MOFU / BOFU',
    traffic: 'Retargeting, follow-up sales, Zalo, email',
    cvr: '9-15%',
    primaryCta: 'Đăng ký học thử',
    secondaryCta: 'Nhắn Zalo tư vấn',
    sampleHeadline: 'Con còn nhút nhát? Một buổi học thật sẽ giúp gia đình thấy rõ hơn là đoán nhiều thêm.',
    sampleBody:
      'Trang cần giải tỏa lo lắng rất trực diện: có mất phí không, đi học thử ra sao, bé sẽ được hỗ trợ như thế nào và nên chuẩn bị gì.',
    previewHighlights: [
      'Hero nói thẳng pain point, không gây áp lực hay hù dọa.',
      'Có video/lớp học thật và testimonial sau buổi học thử.',
      'Có lịch chọn ngày giờ ngắn gọn, dễ thao tác.',
      'Có FAQ về chi phí, người đi kèm, thời gian, chuẩn bị.',
    ],
    blockOrder: [
      'Pain-point hero + CTA học thử.',
      'Khối answer-first: học thử có gì, có mất phí không.',
      'Video/lớp học thật và lợi ích của buổi thử.',
      'Lịch chọn ngày giờ / campus.',
      'Testimonial sau trải nghiệm.',
      'FAQ và CTA cuối trang.',
    ],
    internalLinks: [
      { title: 'Học thử hub', href: '/hoc-thu', body: 'Trang tập trung toàn bộ luồng học thử của hệ thống.' },
      { title: 'Campus profile', href: '/co-so/mam-non-go-vap-le-duc-tho', body: 'Xem cơ sở và môi trường thật trước khi đặt lịch.' },
      { title: 'FAQ mầm non', href: '/mam-non/cau-hoi-thuong-gap', body: 'Giải đáp thêm cho nhóm phụ huynh còn nhiều băn khoăn.' },
    ],
    productionRoute: '/hoc-thu',
    schema: ['WebPage', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Dùng BLUF ngay đầu trang: học thử có mất phí không, kéo dài bao lâu, mục tiêu là gì.',
      'Câu trả lời đầu trang cần đủ ngắn để trở thành featured snippet hoặc AI extract.',
    ],
    hubspotInspired: [
      'Trang này thường là “next-step CTA” đi từ bài Parent Hub hoặc objection page.',
      'Internal links nên nối sang FAQ, campus và level pillar đúng cấp học.',
    ],
    performance: [
      'Không dùng video auto-play nặng ở fold đầu.',
      'Date/time picker nên càng nhẹ càng tốt, ưu tiên form ngắn.',
    ],
  },
  {
    classNumber: 5,
    slug: 'class-f-tiktok-ugc',
    templateClass: 'Class TikTok / Reels Mobile-First UGC Landing (Traffic Video ngắn)',
    group: 'Performance',
    theme: 'performance',
    pageRole: 'Chuyển traffic video ngắn thành click Zalo hoặc click gọi.',
    description:
      'Trang này phải gần như chỉ dành cho mobile: ít chữ, nhiều tín hiệu tin cậy và CTA luôn nằm trong vùng ngón cái.',
    audience: 'Phụ huynh vào từ TikTok, Reels, Stories hoặc creator content.',
    funnel: 'TOFU → MOFU nhanh',
    traffic: 'TikTok Ads, Reels Ads, social traffic',
    cvr: '7-12%',
    primaryCta: 'Nhắn Zalo ngay',
    secondaryCta: 'Gọi hotline',
    sampleHeadline: 'Một trang cho video ngắn phải ngắn đúng nghĩa: rõ, gọn và có đường đi cực nhanh.',
    sampleBody:
      'Đây là dạng page ưu tiên tốc độ tải, hook text 1-2 dòng, visual thật và micro-conversion thay vì form dài.',
    previewHighlights: [
      'Thông thường để noindex, chỉ dùng cho paid/social flows.',
      'Vertical hero video là điểm nhấn chính.',
      'CTA Zalo/call phải luôn nổi trên mobile.',
      'Toàn bộ nội dung phải tải cực nhanh và rất ít script.',
    ],
    blockOrder: [
      'Vertical hero video + hook text siêu ngắn.',
      'Trust micro copy: campus thật, hotline thật, review rất ngắn.',
      'Mini gallery hoặc 2-3 clips cắt nhanh.',
      'CTA Zalo và gọi ngay cố định.',
      'Khối fallback sang tuyển sinh hoặc campus nếu cần.',
    ],
    internalLinks: [
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Bước lui an toàn cho người dùng muốn xem kỹ hơn sau social.' },
      { title: 'Campus gần nhất', href: '/co-so/go-vap-phan-huy-ich', body: 'Xác nhận trust sau khi xem clip ngắn.' },
      { title: 'Homepage', href: '/', body: 'Trang thương hiệu mẹ nếu người dùng muốn kiểm tra toàn hệ thống.' },
    ],
    productionRoute: '/tuyen-sinh/mam-non-go-vap-video',
    schema: ['WebPage'],
    answerFirst: [
      'Nếu page được index, vẫn cần một đoạn mô tả ngắn ở dưới hero để AI đọc được ngữ cảnh.',
      'Hook 1-2 dòng phải nói ngay đây là trường gì, ở đâu, CTA là gì.',
    ],
    hubspotInspired: [
      'Một page, một mục tiêu, một CTA chính; không nhồi thêm nhiều intent.',
      'Đây là page cuối phễu paid, không phải cluster SEO.',
    ],
    performance: [
      'Noindex mặc định nếu page chỉ phục vụ ads.',
      'Không preload full video, chỉ preload metadata và poster.',
    ],
  },
  {
    classNumber: 6,
    slug: 'class-enrollment-registration-form',
    templateClass: 'Class Enrollment / Registration Form Landing (Đăng ký nhập học trực tuyến)',
    group: 'Performance',
    theme: 'performance',
    pageRole: 'Cho phép phụ huynh đi thẳng vào bước đăng ký nhập học trực tuyến.',
    description:
      'Trang form nhập học cần tối đa hóa độ rõ ràng, giảm friction và hỗ trợ phụ huynh hoàn tất hồ sơ mà không phải đoán bước tiếp theo.',
    audience: 'Phụ huynh đã đủ tin tưởng và muốn đăng ký nhập học trực tiếp.',
    funnel: 'BOFU',
    traffic: 'Brand search, CRM follow-up, admissions, remarketing',
    cvr: '8-12%',
    primaryCta: 'Bắt đầu đăng ký nhập học',
    secondaryCta: 'Liên hệ tuyển sinh',
    sampleHeadline: 'Khi gia đình đã sẵn sàng, trang đăng ký cần chỉ còn một việc: giúp hoàn tất hồ sơ thật dễ.',
    sampleBody:
      'Nội dung phải làm rõ điều kiện, hồ sơ cần chuẩn bị, thời gian xử lý và nơi liên hệ nếu gặp vướng mắc giữa chừng.',
    previewHighlights: [
      'Có checklist hồ sơ rõ ràng trước form.',
      'Có timeline các bước sau khi submit.',
      'Có CTA liên hệ Admissions khi phụ huynh chưa đủ giấy tờ.',
      'Có nhắc về bảo mật thông tin và xác nhận tiếp nhận hồ sơ.',
    ],
    blockOrder: [
      'Hero xác nhận đây là bước đăng ký chính thức.',
      'Checklist hồ sơ và điều kiện tối thiểu.',
      'Timeline xử lý hồ sơ.',
      'Form đăng ký trực tuyến / CRM embed.',
      'FAQ về giấy tờ, thời gian, xác nhận.',
      'Khối liên hệ admissions và thank-you path.',
    ],
    internalLinks: [
      { title: 'Admissions hub', href: '/tuyen-sinh', body: 'Xem lại quy trình tuyển sinh tổng trước khi vào form.' },
      { title: 'Điều kiện nhập học', href: '/tuyen-sinh/ho-so-nhap-hoc', body: 'Xác minh giấy tờ và yêu cầu trước khi nộp.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Đối chiếu tài chính trước khi hoàn tất đăng ký.' },
    ],
    productionRoute: '/dang-ky-tu-van',
    schema: ['WebPage', 'HowTo', 'BreadcrumbList'],
    answerFirst: [
      'Ngay đầu trang phải nói rõ ai nên dùng form này, cần chuẩn bị gì và thời gian phản hồi bao lâu.',
      'Bước tiếp theo sau khi gửi hồ sơ cần được mô tả thật cụ thể để AI và người dùng hiểu giống nhau.',
    ],
    hubspotInspired: [
      'Đây là conversion endpoint, nên nhận traffic chủ yếu từ admissions hub, fee pages và follow-up channels.',
      'Mọi khối trên trang đều phải giảm friction cho hành động submit form.',
    ],
    performance: [
      'Embed CRM phải lazy-load hoặc tối ưu, tránh làm chậm initial render.',
      'Checklist và timeline nên render thuần HTML.',
    ],
  },
  {
    classNumber: 7,
    slug: 'class-level-pillar',
    templateClass: 'Class Level Pillar (Trang Trụ cột Cấp học)',
    group: 'SEO / Authority',
    theme: 'authority',
    pageRole: 'Pillar page bao phủ toàn bộ một cấp học và điều phối traffic về cluster, campus, admissions.',
    description:
      'Đây là xương sống SEO của từng cấp học: đủ sâu để giữ authority, đủ rõ để dẫn phụ huynh sang campus, học phí và tuyển sinh.',
    audience: 'Phụ huynh đang nghiên cứu cấp học và mô hình phù hợp.',
    funnel: 'TOFU / MOFU',
    traffic: 'Organic, brand search, AI Overviews, internal navigation',
    cvr: '3-6%',
    primaryCta: 'Xem cơ sở phù hợp',
    secondaryCta: 'Nhận tư vấn',
    sampleHeadline: 'Một pillar page tốt không chỉ để rank; nó còn phải giúp phụ huynh hiểu đúng cấp học và biết bước tiếp theo nên làm gì.',
    sampleBody:
      'Trang phải bao phủ triết lý, chương trình, outcomes, môi trường học tập, FAQ và route sang campus, học phí, tuyển sinh.',
    previewHighlights: [
      'Có answer-first intro và mục lục bám dính.',
      'Cấu trúc H2/H3 theo ontology của cấp học.',
      'Có internal links hai chiều tới cluster articles và campus.',
      'Có FAQ cuối trang và CTA mềm đúng giai đoạn cân nhắc.',
    ],
    blockOrder: [
      'Hero triết lý cấp học + answer-first intro.',
      'Mục lục bám dính và quick facts.',
      'Chương trình, outcomes, phương pháp và môi trường.',
      'Khối giáo viên, PDR và điểm khác biệt.',
      'Campus list, học phí, tuyển sinh, blog cluster links.',
      'FAQ + CTA sang campus hoặc admissions.',
    ],
    internalLinks: [
      { title: 'Mầm non', href: '/mam-non', body: 'Ví dụ production route của một pillar page.' },
      { title: 'Học phí', href: '/hoc-phi/mam-non', body: 'Money page đi cùng pillar ở giai đoạn MOFU/BOFU.' },
      { title: 'Campus profile', href: '/co-so/mam-non-go-vap-le-duc-tho', body: 'Trang local trust được pillar đẩy traffic xuống.' },
    ],
    productionRoute: '/mam-non',
    schema: ['CollectionPage', 'EducationalOrganization', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Đoạn mở đầu 40-60 từ phải trả lời cấp học này dành cho ai, khác biệt gì và có những bước tiếp theo nào.',
      'Ngay đầu trang nên có quick-answer box cho 3 truy vấn lớn: chương trình, học phí, tuyển sinh.',
    ],
    hubspotInspired: [
      'Đây là pillar page đúng nghĩa: phải comprehensive và liên kết chặt với các cluster content cùng chủ đề.',
      'Mỗi cluster article phải trỏ ngược về pillar bằng anchor text gần với keyword chính.',
    ],
    performance: [
      'TOC nên dùng HTML/CSS hoặc JS cực nhẹ.',
      'Giảm media ở fold đầu; ưu tiên text-first và proof blocks gọn.',
    ],
  },
  {
    classNumber: 8,
    slug: 'class-curriculum-program-overview',
    templateClass: 'Class Curriculum / Program Overview (Chương trình học chi tiết)',
    group: 'SEO / Authority',
    theme: 'authority',
    pageRole: 'Đi sâu vào cấu trúc chương trình, môn học, outcomes và lộ trình học.',
    description:
      'Đây là trang support authority cho pillar, dùng để giải thích chi tiết chương trình học mà không làm loãng trang trụ cột.',
    audience: 'Phụ huynh cần xem sâu hơn về học thuật và nội dung học tập.',
    funnel: 'MOFU',
    traffic: 'Organic informational, internal navigation, AI answers',
    cvr: '2-5%',
    primaryCta: 'Nhận tư vấn chương trình',
    secondaryCta: 'Xem campus áp dụng',
    sampleHeadline: 'Khi phụ huynh hỏi “con sẽ học gì ở đây?”, trang chương trình phải trả lời thật rõ và thật dễ hiểu.',
    sampleBody:
      'Trang cần trình bày lộ trình học, cấu trúc môn học, outcomes và cách đo tiến bộ, theo ngôn ngữ thực dụng chứ không chỉ là brochure học thuật.',
    previewHighlights: [
      'Có bảng lộ trình môn học hoặc outcomes theo giai đoạn.',
      'Có giải thích “học gì, rèn gì, đầu ra gì”.',
      'Có liên kết ngược về pillar và admissions/tuition liên quan.',
      'Có schema phù hợp để AI hiểu đây là trang giải thích chương trình.',
    ],
    blockOrder: [
      'Hero chương trình + quick answer.',
      'Bảng overview chương trình hoặc roadmap học tập.',
      'Môn học cốt lõi, kỹ năng, tiếng Anh, PDR.',
      'Cách đánh giá tiến bộ và outcomes.',
      'FAQ học thuật và CTA tư vấn.',
      'Liên kết sang pillar, campus, học phí, tuyển sinh.',
    ],
    internalLinks: [
      { title: 'Level pillar', href: '/mam-non', body: 'Trở lại pillar chính của cấp học để nhìn tổng quan hơn.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Xem bước tiếp theo nếu đã phù hợp về chương trình.' },
      { title: 'FAQ', href: '/faq', body: 'Giải đáp thêm các câu hỏi học thuật và vận hành.' },
    ],
    productionRoute: '/mam-non/chuong-trinh',
    schema: ['Course', 'ItemList', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu phải nói rõ chương trình này dành cho giai đoạn nào và khác biệt cốt lõi nằm ở đâu.',
      'Bảng hoặc list summary đầu trang giúp AI và phụ huynh nắm cấu trúc chương trình rất nhanh.',
    ],
    hubspotInspired: [
      'Đây là support page trong cluster “program / curriculum”; luôn phải trỏ ngược về pillar.',
      'Các subtopic như tiếng Anh, kỹ năng, PDR nên được chia heading rõ ràng thay vì nhồi vào một khối dài.',
    ],
    performance: [
      'Bảng curriculum phải là HTML semantic, không render bằng ảnh.',
      'Không dùng slider cho phần nội dung học thuật dài.',
    ],
  },
  {
    classNumber: 9,
    slug: 'class-master-campus-profile',
    templateClass: 'Class Master Campus Profile (Trang Chi tiết Cơ sở)',
    group: 'SEO / Authority',
    theme: 'authority',
    pageRole: 'Trang hồ sơ campus chuẩn cho local SEO, local trust và bridge sang tham quan / tư vấn.',
    description:
      'Trang campus phải cho thấy đây là một nơi thật, có đội ngũ thật, có địa chỉ thật và phụ huynh có thể đến thật.',
    audience: 'Phụ huynh đang tìm trường theo khu vực hoặc campus cụ thể.',
    funnel: 'MOFU',
    traffic: 'Local search, branded local, Maps, referrals',
    cvr: '4-8%',
    primaryCta: 'Đặt lịch tham quan',
    secondaryCta: 'Gọi campus',
    sampleHeadline: 'Trang cơ sở không được chỉ là “contact page kéo dài”; nó phải là local trust page thực thụ.',
    sampleBody:
      'Trang cần có ảnh campus thật, map thật, review thật, cấp học đang vận hành và đường dẫn rõ sang tuyển sinh, học phí, school tour.',
    previewHighlights: [
      'Có NAP, map, review và gallery thật.',
      'Có cấp học đang mở tại cơ sở này.',
      'Có CTA tham quan / gọi / Zalo rõ ràng.',
      'Có local keywords và landmarks xuất hiện tự nhiên trong nội dung.',
    ],
    blockOrder: [
      'Hero cơ sở với tên campus, địa chỉ, hotline.',
      'Khối quick facts: cấp học, giờ hoạt động, bản đồ, chỉ đường.',
      'Gallery thực tế và điểm mạnh campus.',
      'Review / testimonial địa phương.',
      'Thông tin practical: xe đưa đón, ăn bán trú, liên hệ.',
      'CTA tour + link sang học phí, tuyển sinh, FAQ.',
    ],
    internalLinks: [
      { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Chuyển từ trust sang hành động tham quan thực tế.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Điểm money intent sau khi đã xem campus.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Admissions hub cho giai đoạn quyết định.' },
    ],
    productionRoute: '/co-so/go-vap-phan-huy-ich',
    schema: ['LocalBusiness', 'EducationalOrganization', 'AggregateRating', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu phải nói rõ cơ sở ở đâu, có các cấp học nào và phù hợp với nhóm phụ huynh nào.',
      'Nên có một đoạn mô tả vị trí campus bằng landmarks thật để hỗ trợ local AI answers.',
    ],
    hubspotInspired: [
      'Campus profile là local hub, cần nhận link từ pillar và local intent pages.',
      'Nội dung local phải đủ unique để không biến thành phiên bản copy-paste của campus khác.',
    ],
    performance: [
      'Map và review embed phải lazy-load.',
      'Ảnh campus nên dùng gallery nhẹ, tránh carousel phức tạp ở mobile.',
    ],
  },
  {
    classNumber: 10,
    slug: 'class-virtual-tour-360',
    templateClass: 'Class Virtual Tour 360° / Interactive Campus Map (Tham quan thực tế ảo)',
    group: 'SEO / Authority',
    theme: 'authority',
    pageRole: 'Cho phép phụ huynh xem campus theo hướng tương tác trước khi đến trực tiếp.',
    description:
      'Trang này giúp tăng trust và giảm khoảng cách trước tour thật, nhưng phải rất cẩn trọng với tốc độ tải và tính crawlable.',
    audience: 'Phụ huynh ở xa, bận rộn hoặc muốn xem campus kỹ trước khi đến.',
    funnel: 'MOFU',
    traffic: 'Internal, local SEO support, follow-up sales',
    cvr: '3-6%',
    primaryCta: 'Khám phá campus',
    secondaryCta: 'Đặt lịch tham quan thật',
    sampleHeadline: 'Virtual tour tốt không phải là widget nặng; nó phải giúp phụ huynh hình dung không gian thật mà vẫn tải nhanh.',
    sampleBody:
      'Trang cần vừa có trải nghiệm khám phá campus, vừa có phiên bản text-first để AI và search engine hiểu bối cảnh, vị trí và tiện ích của cơ sở.',
    previewHighlights: [
      'Có map tương tác hoặc tour 360 nhưng vẫn có quick summary bằng text.',
      'Có hotspots nêu rõ từng khu chức năng bằng ngôn ngữ dễ hiểu.',
      'Có CTA chuyển sang tour thật và campus profile.',
      'Có fallback nếu thiết bị không hỗ trợ trải nghiệm nặng.',
    ],
    blockOrder: [
      'Hero campus + answer-first summary.',
      'Quick facts về cơ sở và mục đích của virtual tour.',
      'Interactive tour / map 360 với hotspots.',
      'Giải thích từng khu vực bằng text, list hoặc card.',
      'Khối FAQ / chuẩn bị cho school tour.',
      'CTA book visit thật và xem campus profile đầy đủ.',
    ],
    internalLinks: [
      { title: 'Campus profile', href: '/co-so/go-vap-phan-huy-ich', body: 'Xem toàn bộ hồ sơ cơ sở bên cạnh tour ảo.' },
      { title: 'School tour', href: '/tham-quan-truong', body: 'Đi tiếp sang lịch tham quan thật.' },
      { title: 'Liên hệ hệ thống', href: '/lien-he', body: 'Liên hệ nhanh nếu gia đình cần hỗ trợ chọn cơ sở.' },
    ],
    productionRoute: '/co-so/go-vap-phan-huy-ich',
    schema: ['Place', 'ImageGallery', 'BreadcrumbList'],
    answerFirst: [
      'Ngay đầu trang cần nói rõ đây là virtual tour của cơ sở nào và phụ huynh sẽ xem được những gì.',
      'Các khu vực trong tour phải có mô tả text vì AI không thể hiểu từ ảnh 360 đơn thuần.',
    ],
    hubspotInspired: [
      'Trang này là proof support page; nhận traffic từ campus hub, local pages và follow-up channels.',
      'Không nên đứng độc lập, luôn cần route sang campus profile và tour booking.',
    ],
    performance: [
      'Chỉ tải tour 360 sau tương tác hoặc dưới fold đầu.',
      'Luôn có fallback ảnh tĩnh + text cho mobile yếu.',
    ],
  },
  {
    classNumber: 11,
    slug: 'class-local-intent',
    templateClass: 'Class Local Intent Landing (Programmatic SEO Local)',
    group: 'SEO / Authority',
    theme: 'authority',
    pageRole: 'Bắt truy vấn địa phương dài và dẫn đúng về campus thật.',
    description:
      'Đây là local landing dạng programmatic nhưng phải có local proof, copy unique và route đúng sang cơ sở chứ không được thành doorway page.',
    audience: 'Phụ huynh tìm trường gần khu vực, landmark hoặc quận cụ thể.',
    funnel: 'MOFU / BOFU',
    traffic: 'Local organic, “near me”, adjacent-area queries',
    cvr: '5-9%',
    primaryCta: 'Xem cơ sở phù hợp',
    secondaryCta: 'Tư vấn ngay',
    sampleHeadline: 'Trang local tốt phải trả lời rất nhanh: gần ai, gần đâu, cấp học nào và campus nào phù hợp nhất.',
    sampleBody:
      'Local intent landing cần có đoạn giới thiệu riêng cho cộng đồng địa phương, landmarks, tiện ích lân cận và bằng chứng campus thật.',
    previewHighlights: [
      'Có intro local độc bản, không chỉ thay tên quận trong slug.',
      'Có quick answer, khoảng cách, campus đề xuất và CTA rõ.',
      'Có proof campus, review và link sang học phí/tuyển sinh.',
      'Có local query coverage nhưng vẫn đủ chất lượng nội dung.',
    ],
    blockOrder: [
      'Dynamic local hero với khu vực / landmark.',
      'Quick answer block và campus đề xuất.',
      'Khối local proof, review, tiện ích xung quanh.',
      'Thông tin chương trình / cấp học liên quan.',
      'Form ngắn hoặc CTA tư vấn.',
      'Links sang campus, học phí, tuyển sinh, FAQ.',
    ],
    internalLinks: [
      { title: 'Campus tổng', href: '/co-so', body: 'Hub campus để xem toàn bộ các cơ sở trong hệ thống.' },
      { title: 'Campus profile', href: '/co-so/mam-non-go-vap-le-duc-tho', body: 'Trang đích local trust phía sau local intent.' },
      { title: 'Học phí mầm non', href: '/hoc-phi/mam-non', body: 'Money page hỗ trợ nếu phụ huynh đang cân nhắc về chi phí.' },
    ],
    productionRoute: '/tuyen-sinh/mam-non-go-vap',
    schema: ['WebPage', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Intro 40-60 từ phải nói rõ khu vực này gần campus nào và phù hợp cấp học nào.',
      'Nếu có “near me” intent, nên mô tả campus theo landmarks xung quanh thay vì chỉ ghi địa chỉ khô.',
    ],
    hubspotInspired: [
      'Đây là local cluster page; luôn trỏ về master campus profile và level pillar.',
      'Mỗi trang phải unique đủ để tránh bị xem là doorway content.',
    ],
    performance: [
      'Text-first, chỉ 1-2 ảnh proof cốt lõi.',
      'Không nhúng quá nhiều maps hoặc widgets cho nhóm local pages hàng loạt.',
    ],
  },
  {
    classNumber: 12,
    slug: 'class-parent-hub-article',
    templateClass: 'Class Parent Hub Article (Blog Kiến thức Phụ huynh)',
    group: 'Mid-funnel / Nurturing',
    theme: 'nurture',
    pageRole: 'Cluster content kéo traffic thông tin và nuôi trust cho phụ huynh.',
    description:
      'Bài Parent Hub phải giúp ích thực sự, có kết cấu dễ scan, có authorial confidence và route mềm sang chương trình, campus hoặc admissions.',
    audience: 'Phụ huynh đang tìm giải pháp cho một câu hỏi giáo dục cụ thể.',
    funnel: 'TOFU / MOFU',
    traffic: 'Organic informational, AI answers, social sharing',
    cvr: '2-5%',
    primaryCta: 'Xem chương trình phù hợp',
    secondaryCta: 'Nhận tư vấn nhẹ nhàng',
    sampleHeadline: 'Một bài Parent Hub tốt phải giải quyết câu hỏi của phụ huynh trước, rồi mới xin quyền được đồng hành tiếp.',
    sampleBody:
      'Cấu trúc nên theo logic vấn đề → nguyên nhân → giải pháp → cách Việt Anh áp dụng, có TOC, bullets, FAQ và CTA rất mềm.',
    previewHighlights: [
      'Có BLUF ở mở bài và TOC rõ ràng.',
      'Có list/bullets để AI parse tốt hơn.',
      'Có author box và ngày cập nhật.',
      'Có internal link trỏ về pillar, FAQ và campus liên quan.',
    ],
    blockOrder: [
      'Title + answer-first intro.',
      'Mục lục và summary points.',
      'Các H2/H3 theo vấn đề, nguyên nhân, giải pháp.',
      'In-content CTA mềm ở giữa bài.',
      'FAQ hoặc snippets box.',
      'Author box, related posts, CTA cuối bài.',
    ],
    internalLinks: [
      { title: 'Pillar mầm non', href: '/mam-non', body: 'Trang trụ cột của cấp học liên quan đến bài viết.' },
      { title: 'FAQ hub', href: '/faq', body: 'Tăng route sang answer engine khi người dùng cần câu trả lời nhanh hơn.' },
      { title: 'Tư vấn tuyển sinh', href: '/dang-ky-tu-van', body: 'CTA mềm dành cho người đã đủ niềm tin.' },
    ],
    productionRoute: '/phu-huynh/cach-chon-truong-mam-non',
    schema: ['Article', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Mở bài 40-60 từ phải trả lời ngắn gọn câu hỏi của phụ huynh trước khi đi vào diễn giải.',
      'Dùng numbered lists hoặc bullets để tăng khả năng được AI tóm tắt đúng.',
    ],
    hubspotInspired: [
      'Đây là spoke page trong topic cluster; bắt buộc phải trỏ ngược về pillar bằng anchor text gần từ khóa chính.',
      'Nội dung phải giải một vấn đề thật, không viết lan man quanh thương hiệu.',
    ],
    performance: [
      'Không dùng popup cản trở đọc bài.',
      'Text-first, TOC HTML native, media tiết chế.',
    ],
  },
  {
    classNumber: 13,
    slug: 'class-comparison-engine',
    templateClass: 'Class Comparison Engine Page (So sánh minh bạch)',
    group: 'Mid-funnel / Nurturing',
    theme: 'nurture',
    pageRole: 'Xử lý truy vấn so sánh và giúp phụ huynh ra quyết định khách quan hơn.',
    description:
      'Trang so sánh cần minh bạch, logic và có bảng HTML dễ đọc để AI cũng có thể parse và tổng hợp lại.',
    audience: 'Phụ huynh đang ở giai đoạn cân nhắc giữa hai hoặc nhiều mô hình trường.',
    funnel: 'MOFU / BOFU',
    traffic: 'SEO comparison, sales follow-up, retargeting',
    cvr: '4-7%',
    primaryCta: 'Nhận tư vấn chọn trường',
    secondaryCta: 'Xem học phí',
    sampleHeadline: 'So sánh tốt không phải để “dìm” ai, mà để giúp phụ huynh nhìn đúng thứ gia đình mình thực sự cần.',
    sampleBody:
      'Cần dùng bảng so sánh HTML, diễn giải khách quan, nêu rõ điểm khác biệt của Việt Anh và đưa phụ huynh sang bước quyết định phù hợp.',
    previewHighlights: [
      'Có bảng so sánh HTML semantic và mobile-friendly.',
      'Có phần diễn giải sau bảng, không chỉ để dữ liệu khô.',
      'Có FAQ xử lý câu hỏi sau khi so sánh.',
      'Có CTA sang học phí, tour hoặc tư vấn.',
    ],
    blockOrder: [
      'Hero nêu bối cảnh so sánh.',
      'Summary answer-first: khi nào nên chọn mô hình nào.',
      'Bảng so sánh HTML.',
      'Khối diễn giải ưu/nhược và fit theo nhu cầu.',
      'FAQ sau so sánh.',
      'CTA sang money page, tư vấn hoặc tour.',
    ],
    internalLinks: [
      { title: 'Dynamic comparison', href: '/mau-template/class-dynamic-comparison/', body: 'Biến thể scale lớn của mô hình so sánh.' },
      { title: 'Objection handler', href: '/mau-template/class-objection-handler/', body: 'Trang xử lý phản đối đi sau bước so sánh.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Money page cho người muốn đối chiếu chi phí sau khi so sánh.' },
    ],
    productionRoute: '/so-sanh/viet-anh-va-truong-cong',
    schema: ['Article', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Mở bài cần tóm tắt rất ngắn ai nên đọc trang này và 1-2 khác biệt lớn nhất.',
      'Sau bảng nên có một đoạn “khi nào mô hình này phù hợp” để AI dễ hiểu ngữ cảnh hơn dữ liệu thô.',
    ],
    hubspotInspired: [
      'Comparison page là cluster BOFU/MOFU; phải nối sang pillars, tuition, FAQ và admissions.',
      'Trang chỉ nên tập trung một intent so sánh chính để tránh lệch search intent.',
    ],
    performance: [
      'Bảng so sánh phải render bằng HTML/CSS, không dùng JS grid nặng.',
      'Mobile có horizontal scroll hoặc stacked rows rõ ràng.',
    ],
  },
  {
    classNumber: 14,
    slug: 'class-ai-ready-faq',
    templateClass: 'Class AI-Ready FAQ / Answer Engine (Trung tâm Giải đáp)',
    group: 'Mid-funnel / Nurturing',
    theme: 'nurture',
    pageRole: 'Bắt People Also Ask, AI Overviews và voice search bằng answer-first Q&A.',
    description:
      'FAQ hub là nơi gom các câu hỏi thật của phụ huynh thành một hệ thống dễ quét, dễ trích xuất và dễ đi tiếp sang campus, học phí, tuyển sinh.',
    audience: 'Phụ huynh cần câu trả lời nhanh, rõ và có thể tin được.',
    funnel: 'TOFU / MOFU / BOFU nhẹ',
    traffic: 'PAA, voice search, AI engines, internal support',
    cvr: '3-6%',
    primaryCta: 'Gọi ngay để được giải đáp',
    secondaryCta: 'Nhắn Zalo tư vấn',
    sampleHeadline: 'Một FAQ tốt không phải danh sách câu hỏi cho có; nó là answer engine thật sự cho phụ huynh.',
    sampleBody:
      'Mỗi câu hỏi nên có câu trả lời trực diện 40-50 từ, chia theo chủ đề, có schema FAQPage và có đường dẫn đi tiếp thật hợp lý.',
    previewHighlights: [
      'Mỗi H2 là một câu hỏi thật của phụ huynh.',
      'Mỗi câu trả lời mở đầu cực ngắn và rõ.',
      'Có FAQPage schema và liên kết theo từng chủ đề.',
      'Có CTA dưới mỗi nhóm nội dung thay vì chỉ ở cuối trang.',
    ],
    blockOrder: [
      'Quick answer hero và phân nhóm FAQ.',
      'Tabs hoặc nhóm chủ đề lớn.',
      'Accordion Q&A với answer-first copy.',
      'CTA dưới từng nhóm câu hỏi.',
      'Short form hoặc contact fallback.',
      'Liên kết sang tuition, admissions, campus, pillar.',
    ],
    internalLinks: [
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Giải đáp xong thì đẩy sang nơi phụ huynh có thể hành động.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Dẫn các câu hỏi tài chính về money hub đúng chuẩn.' },
      { title: 'Mầm non FAQ', href: '/mam-non/cau-hoi-thuong-gap', body: 'Ví dụ nhánh FAQ theo cấp học.' },
    ],
    productionRoute: '/faq',
    schema: ['FAQPage', 'WebPage', 'BreadcrumbList'],
    answerFirst: [
      'Mỗi câu trả lời đầu tiên nên đủ ngắn để có thể trở thành snippet hoặc AI extract.',
      'Câu hỏi và câu trả lời phải match ngôn ngữ người dùng thật, không dùng cách đặt câu hỏi quá “marketing”.',
    ],
    hubspotInspired: [
      'FAQ hub là answer-engine cluster; mỗi cụm FAQ nên nối sang page chuyển đổi tương ứng.',
      'Không gom tất cả vào một danh sách vô tận; phải có nhóm chủ đề rõ ràng.',
    ],
    performance: [
      'Dùng accordion nhẹ, có thể bằng details/summary.',
      'Hạn chế media để page vẫn là answer engine siêu nhanh.',
    ],
  },
  {
    classNumber: 15,
    slug: 'class-tuition-fee-structure',
    templateClass: 'Class Tuition & Fee Structure Page (Minh bạch Học phí & Tài chính)',
    group: 'Mid-funnel / Nurturing',
    theme: 'nurture',
    pageRole: 'Trang minh bạch tài chính evergreen, không quá landing nhưng vẫn rất gần chuyển đổi.',
    description:
      'Khác với fee capture landing, trang này dùng để trình bày logic học phí, khoản bao gồm, hỗ trợ tài chính và các câu hỏi thường gặp theo cách minh bạch hơn.',
    audience: 'Phụ huynh muốn hiểu cấu trúc học phí trước khi để lại lead.',
    funnel: 'MOFU / BOFU',
    traffic: 'Organic commercial, internal navigation, AI answers',
    cvr: '4-8%',
    primaryCta: 'Nhận báo giá chi tiết',
    secondaryCta: 'Tư vấn kế hoạch tài chính',
    sampleHeadline: 'Minh bạch học phí không chỉ là công khai con số; đó còn là giải thích để phụ huynh hiểu tiền của mình đi vào đâu.',
    sampleBody:
      'Trang cần dùng text, list và bảng HTML để nêu rõ cấu trúc phí, khoản bao gồm, hỗ trợ tài chính, ưu đãi và câu hỏi tài chính phổ biến.',
    previewHighlights: [
      'Có khối “Học phí đã bao gồm gì”.',
      'Có bảng cấu trúc phí theo cấp học hoặc hạng mục.',
      'Có FAQ học phí và CTA nhận báo giá chi tiết.',
      'Có route sang học bổng, tuyển sinh và fee capture landing.',
    ],
    blockOrder: [
      'Hero minh bạch học phí + answer-first.',
      'Khối cấu trúc phí / bảng học phí tổng quan.',
      'Khối “bao gồm gì, chưa bao gồm gì”.',
      'Hỗ trợ tài chính, ưu đãi, học bổng liên quan.',
      'FAQ học phí và objection handling nhẹ.',
      'CTA nhận báo giá / tư vấn tài chính.',
    ],
    internalLinks: [
      { title: 'Fee capture', href: '/hoc-phi', body: 'CTA chuyển sang form nhận bảng học phí chi tiết.' },
      { title: 'Học bổng', href: '/hoc-bong', body: 'Route sang ưu đãi và scholarship pages.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Admissions hub cho phụ huynh đã sẵn sàng đi tiếp.' },
    ],
    productionRoute: '/hoc-phi',
    schema: ['WebPage', 'Offer', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu nên nói rõ học phí được cấu thành như thế nào và phụ huynh nên xem phần nào đầu tiên.',
      'Các khoản mục phải hiển thị bằng text hoặc table, không được ẩn trong ảnh hoặc PDF duy nhất.',
    ],
    hubspotInspired: [
      'Trang này là money-support hub, nhận link từ pillars, FAQ và campus.',
      'Phải tách bạch với fee capture landing để tránh intent mismatch.',
    ],
    performance: [
      'Ưu tiên text-first, HTML tables và FAQ nhẹ.',
      'Không nhúng PDF viewer nặng ngay trên trang.',
    ],
  },
  {
    classNumber: 16,
    slug: 'class-objection-handler',
    templateClass: 'Class Objection Handler Page (Xử lý phản đối)',
    group: 'Mid-funnel / Nurturing',
    theme: 'nurture',
    pageRole: 'Xử lý các câu hỏi phản đối lớn như học phí, khoảng cách, hòa nhập, áp lực học tập.',
    description:
      'Trang objection phải bình tĩnh, logic, có bằng chứng và dẫn phụ huynh sang bước tiếp theo đúng với mối lo họ đang có.',
    audience: 'Phụ huynh đã quan tâm nhưng còn một hoặc hai rào cản lớn.',
    funnel: 'MOFU / BOFU',
    traffic: 'Retargeting, sales follow-up, SEO objection queries',
    cvr: '6-10%',
    primaryCta: 'Nhắn Zalo để được giải đáp',
    secondaryCta: 'Đăng ký học thử / tham quan',
    sampleHeadline: 'Một phản đối không cần slogan để xử lý; nó cần lập luận rõ, proof thật và bước đi tiếp phù hợp.',
    sampleBody:
      'Trang nên xoá nỗi lo bằng dữ liệu, ví dụ thực tế, FAQ, proof campus và một CTA rất gần với rào cản đang được giải quyết.',
    previewHighlights: [
      'Có opening trả lời trực tiếp objection trong 1-2 câu.',
      'Có proof block sau từng objection lớn.',
      'Có CTA gắn với next step phù hợp như học thử, tham quan, gọi.',
      'Không dùng giọng phòng thủ hoặc khoe mẽ quá mức.',
    ],
    blockOrder: [
      'Hero nêu thẳng objection.',
      'Answer-first response và logic giải thích.',
      'Proof blocks: số liệu, review, visual thật.',
      'Accordion cho các câu hỏi phụ liên quan.',
      'CTA theo next step phù hợp.',
      'Links sang học phí, FAQ, trial hoặc tour.',
    ],
    internalLinks: [
      { title: 'Học phí', href: '/hoc-phi', body: 'Nếu objection xoay quanh chi phí thì đây là money hub gốc.' },
      { title: 'Học thử', href: '/hoc-thu', body: 'Phù hợp với objection về hòa nhập hoặc trải nghiệm thực tế.' },
      { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Phù hợp với objection về cơ sở vật chất hoặc khoảng cách.' },
    ],
    productionRoute: '/giai-toa-lo-lang/hoc-phi-cao-co-dang-khong',
    schema: ['FAQPage', 'WebPage', 'BreadcrumbList'],
    answerFirst: [
      'Câu đầu tiên cần trả lời rất thẳng: “Có”, “Không”, hoặc “Tùy nhu cầu gia đình”, rồi mới giải thích.',
      'Dùng logic phản biện rõ ràng để AI có thể trích xuất lập luận của nhà trường một cách công bằng.',
    ],
    hubspotInspired: [
      'Trang này thuộc nhóm BOFU nurture, thường được gửi bởi sales hoặc ads retargeting.',
      'Nó không thay admissions hub, mà đóng vai trò tháo nút thắt trước khi phụ huynh quay lại phễu chính.',
    ],
    performance: [
      'Text-first, proof media nhẹ, accordion đơn giản.',
      'Không chèn quá nhiều khối CTA cạnh tranh nhau.',
    ],
  },
  {
    classNumber: 17,
    slug: 'class-homepage',
    templateClass: 'Class Homepage (Trang chủ - Grand Central Station)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Trang điều phối toàn hệ thống, phân luồng traffic về cấp học, campus, tuyển sinh và học phí.',
    description:
      'Homepage phải nói rõ Việt Anh là ai, khác biệt gì, có những cấp học nào và phụ huynh nên bắt đầu từ đâu.',
    audience: 'Toàn bộ phụ huynh, traffic direct, branded, referral, returning.',
    funnel: 'Mọi tầng',
    traffic: 'Direct, branded, referral, internal navigation',
    cvr: '2-4%',
    primaryCta: 'Đăng ký tư vấn',
    secondaryCta: 'Chọn cấp học / cơ sở',
    sampleHeadline: 'Trang chủ không phải banner đẹp; nó là trung tâm điều phối toàn bộ hành trình của phụ huynh.',
    sampleBody:
      'Cần cho thấy định vị thương hiệu, các cấp học, proof cốt lõi, campus và các đường đi nhanh nhất vào phễu chuyển đổi.',
    previewHighlights: [
      'Hero nói rõ brand + category.',
      'Có quick filter theo cấp học hoặc khu vực.',
      'Có route rõ sang pillars, học phí, tuyển sinh, school tour.',
      'Có schema Organization + WebSite để hỗ trợ entity building.',
    ],
    blockOrder: [
      'Hero brand + category + CTA điều hướng.',
      'Quick filter theo cấp học / cơ sở.',
      'Khối khác biệt cốt lõi và outcomes.',
      'Các card cấp học, campus, money pages, admissions.',
      'Review / social proof / news highlights.',
      'CTA chính và footer điều hướng hệ thống.',
    ],
    internalLinks: [
      { title: 'Mầm non', href: '/mam-non', body: 'Một trong các pillar chính phải xuất hiện rõ ở homepage.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Money page là đích điều hướng quan trọng.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Admissions hub cho phụ huynh đã sẵn sàng hành động.' },
    ],
    productionRoute: '/',
    schema: ['Organization', 'WebSite'],
    answerFirst: [
      'Hero nên trả lời ngay Việt Anh là hệ thống giáo dục gì, tại đâu và phục vụ nhóm gia đình nào.',
      'Có quick-answer cho 4 cấp học hoặc 4 luồng chính để AI và người dùng hiểu kiến trúc site.',
    ],
    hubspotInspired: [
      'Homepage là navigation hub, không phải pillar page nhưng phải route traffic vào các topic hubs đúng cách.',
      'Các đường dẫn từ homepage nên phản ánh architecture thật: pillars, admissions, tuition, campus.',
    ],
    performance: [
      'Không để hero video làm chậm trang; luôn có poster và fallback.',
      'Các block điều hướng nên render thuần HTML/CSS càng nhiều càng tốt.',
    ],
  },
  {
    classNumber: 18,
    slug: 'class-contact-multiple-locations',
    templateClass: 'Class Contact / Multiple Locations Page (Liên hệ hệ thống)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Trang liên hệ hệ thống, tổng hợp nhiều cơ sở và nhiều kênh hỗ trợ.',
    description:
      'Trang liên hệ không chỉ là thông tin cuối trang; nó phải giúp phụ huynh chọn đúng cơ sở, đúng hotline và đúng cách liên hệ.',
    audience: 'Phụ huynh cần liên hệ nhanh hoặc đang phân vân giữa nhiều cơ sở.',
    funnel: 'MOFU / BOFU / Utility',
    traffic: 'Branded, direct, internal navigation',
    cvr: '3-7%',
    primaryCta: 'Liên hệ tuyển sinh',
    secondaryCta: 'Xem cơ sở phù hợp',
    sampleHeadline: 'Một trang liên hệ tốt phải giúp phụ huynh tìm đúng nơi cần gọi, không phải chỉ liệt kê thật nhiều số điện thoại.',
    sampleBody:
      'Trang nên gom tổng đài, từng campus, giờ hỗ trợ, map, email và các đường dẫn nhanh sang admissions hoặc school tour.',
    previewHighlights: [
      'Có tổng đài chung và contact card theo cơ sở.',
      'Có map hệ thống hoặc multiple location listing rõ.',
      'Có route nhanh sang campus, school tour, tuyển sinh.',
      'Có thông tin giờ làm việc, email và kênh chat.',
    ],
    blockOrder: [
      'Hero liên hệ hệ thống + answer-first.',
      'Tổng đài chính và CTA nhanh.',
      'Danh sách nhiều cơ sở kèm map/card thông tin.',
      'Giờ hỗ trợ, email, form liên hệ nhanh.',
      'FAQ về cách liên hệ và chuyển campus.',
      'Links sang campus pages và admissions.',
    ],
    internalLinks: [
      { title: 'Campus hub', href: '/co-so', body: 'Điều hướng sang danh mục cơ sở chi tiết.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Admissions hub cho người cần hỗ trợ hồ sơ hoặc lộ trình.' },
      { title: 'School tour', href: '/tham-quan-truong', body: 'Đặt lịch nếu gia đình muốn xem trường thay vì chỉ gọi điện.' },
    ],
    productionRoute: '/lien-he',
    schema: ['Organization', 'Place', 'BreadcrumbList'],
    answerFirst: [
      'Ngay đầu trang cần nói rõ đây là nơi liên hệ toàn hệ thống và phụ huynh có thể chọn cơ sở nào.',
      'Danh sách nhiều địa điểm phải ở dạng text/card rõ để AI hiểu hệ thống có nhiều cơ sở.',
    ],
    hubspotInspired: [
      'Contact page là utility hub cho navigation và conversion nhẹ.',
      'Nó phải nhận traffic từ footer, campus pages, admissions và thank-you flows.',
    ],
    performance: [
      'Không nhúng quá nhiều map cùng lúc; dùng danh sách card và lazy-load map.',
      'Giữ form liên hệ nhẹ và rõ.',
    ],
  },
  {
    classNumber: 19,
    slug: 'class-dynamic-comparison',
    templateClass: 'Class Dynamic Comparison (Bảng so sánh động)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Phiên bản scale của comparison page, dùng data-driven blocks để mở rộng nhiều biến thể so sánh.',
    description:
      'Trang này cho phép scale kho nội dung so sánh mà vẫn giữ logic minh bạch, dễ parse cho AI và dễ quản lý bằng dữ liệu.',
    audience: 'Phụ huynh đang cần so sánh nhiều biến thể chương trình, campus hoặc mô hình giáo dục.',
    funnel: 'MOFU / BOFU',
    traffic: 'SEO comparison, internal, dynamic content routes',
    cvr: '4-7%',
    primaryCta: 'Xem lựa chọn phù hợp',
    secondaryCta: 'Nhận tư vấn',
    sampleHeadline: 'Khi số lượng trang so sánh tăng lên, dữ liệu phải được chuẩn hóa để vẫn giữ tính khách quan và dễ đọc.',
    sampleBody:
      'Trang cần có narrative mở đầu, bảng động chuẩn HTML, giải thích ngắn sau bảng và CTA theo mục tiêu so sánh cụ thể.',
    previewHighlights: [
      'Dữ liệu phải ra HTML table semantic, không render mù trong canvas/image.',
      'Có opening copy riêng cho từng biến thể so sánh.',
      'Có CTA và links riêng theo loại comparison.',
      'Có quản trị freshness để không bị data stale.',
    ],
    blockOrder: [
      'Hero nêu bối cảnh so sánh và đối tượng phù hợp.',
      'Summary answer-first cho trang động.',
      'Bảng so sánh data-driven.',
      'Khối giải thích và key takeaways.',
      'FAQ / links related comparisons.',
      'CTA theo hướng tư vấn, học phí hoặc tuyển sinh.',
    ],
    internalLinks: [
      { title: 'Comparison engine', href: '/mau-template/class-comparison-engine/', body: 'Bản biên tập tay, giàu narrative hơn của comparison pages.' },
      { title: 'Học phí', href: '/hoc-phi', body: 'Dẫn tới money page nếu user muốn xem chênh lệch tài chính.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Bước tiếp theo sau khi so sánh đủ.' },
    ],
    productionRoute: '/so-sanh/viet-anh-va-song-ngu-khac',
    schema: ['WebPage', 'FAQPage', 'BreadcrumbList'],
    answerFirst: [
      'Trang động vẫn phải có phần mở đầu riêng, không được chỉ là bảng dữ liệu trần.',
      'Sau bảng cần có đoạn giải thích ngắn để AI có thể trích đúng luận điểm chính.',
    ],
    hubspotInspired: [
      'Đây là hệ scale của comparison cluster; mỗi route vẫn phải gắn vào đúng topic graph.',
      'Database-driven nhưng narrative và internal links vẫn cần unique cho từng page.',
    ],
    performance: [
      'Bảng data render server-side, tránh hydrate lớn.',
      'Chỉ tải cột cần thiết trên mobile.',
    ],
  },
  {
    classNumber: 20,
    slug: 'class-smart-thank-you',
    templateClass: 'Class Smart Thank-You Page (Trang cảm ơn thông minh)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Trang hậu submit để xác nhận, fire tracking và điều hướng sang bước tiếp theo thông minh.',
    description:
      'Thank-you page không được chỉ nói cảm ơn; nó phải giữ lead nóng và gợi ý next step sát với ý định vừa hoàn thành.',
    audience: 'Phụ huynh vừa submit form, đăng ký event, nhận học phí hoặc đặt lịch.',
    funnel: 'Post-conversion',
    traffic: 'Form submits, campaign flows, CRM',
    cvr: '15-25% next-step click',
    primaryCta: 'Xem bước tiếp theo',
    secondaryCta: 'Vào Zalo / đặt lịch',
    sampleHeadline: 'Sau khi phụ huynh submit, trang cảm ơn phải giữ được nhịp hành động thay vì để họ rơi khỏi phễu.',
    sampleBody:
      'Trang cần xác nhận rõ việc đã nhận thông tin, nói rõ khi nào đội ngũ liên hệ và đề xuất một bước tiếp theo rất phù hợp với loại lead vừa gửi.',
    previewHighlights: [
      'Có dynamic next-step theo loại form.',
      'Có video/review hoặc PDF nhẹ để giữ tương tác.',
      'Có noindex mặc định và tracking sạch.',
      'Có CTA rõ sang tour, Zalo, campus hoặc học phí.',
    ],
    blockOrder: [
      'Thank-you hero xác nhận đã nhận thông tin.',
      'Khối next-step chính theo loại lead.',
      'Proof / video / campus review nhẹ.',
      'Links sang campus, tour hoặc FAQ.',
      'Hotline / Zalo fallback.',
    ],
    internalLinks: [
      { title: 'Tour booking', href: '/tham-quan-truong', body: 'Bước tiếp theo phổ biến sau lead học phí hoặc tư vấn.' },
      { title: 'Campus profile', href: '/co-so/go-vap-phan-huy-ich', body: 'Cho người muốn xem kỹ trường trong lúc chờ tư vấn.' },
      { title: 'FAQ', href: '/faq', body: 'Giải đáp nhanh các câu hỏi thường nảy sinh sau submit.' },
    ],
    productionRoute: '/thank-you/fee',
    schema: ['WebPage'],
    answerFirst: [
      'Ngay đầu trang cần xác nhận đã nhận thông tin gì và đội ngũ sẽ phản hồi trong bao lâu.',
      'Chỉ nên có một next-step chính để giữ tập trung.',
    ],
    hubspotInspired: [
      'Thank-you page là mắt xích chuyển đổi tiếp theo, không phải dead end.',
      'Nội dung phải thay đổi theo loại conversion vừa hoàn thành nếu có thể.',
    ],
    performance: [
      'Noindex mặc định.',
      'Giữ trang cực nhẹ vì người dùng vừa hoàn thành form và chờ phản hồi ngay.',
    ],
  },
  {
    classNumber: 21,
    slug: 'class-retention-referral',
    templateClass: 'Class Retention & Referral Page (Giữ chân & Giới thiệu)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Trang loyalty, referral, parent benefits và mở rộng LTV.',
    description:
      'Trang này phục vụ phụ huynh hiện hữu hoặc nhóm đã nhập học, giúp referral rõ ràng và giữ gắn kết sau enrolment.',
    audience: 'Phụ huynh hiện hữu, nhóm loyalty, CRM audiences.',
    funnel: 'Retention',
    traffic: 'CRM, email, Zalo, internal parent communications',
    cvr: '8-12%',
    primaryCta: 'Giới thiệu bạn bè',
    secondaryCta: 'Xem ưu đãi phụ huynh',
    sampleHeadline: 'Một chương trình referral tốt phải thật rõ về quyền lợi, cách tham gia và bước xác nhận sau đó.',
    sampleBody:
      'Trang cần giữ giọng cảm ơn, hữu ích, chuyên nghiệp và ưu tiên utility hơn là bán hàng. Nếu có offer, phải nói thật rõ điều kiện áp dụng.',
    previewHighlights: [
      'Có quyền lợi referral rõ ràng, không mập mờ.',
      'Có form hoặc hướng dẫn tham gia đơn giản.',
      'Có links sang summer camp, event hoặc parent benefits.',
      'Thường nên noindex hoặc hạn chế public index.',
    ],
    blockOrder: [
      'Hero cảm ơn và giới thiệu chương trình referral.',
      'Quyền lợi / điều kiện / thời gian áp dụng.',
      'Form referral hoặc các bước tham gia.',
      'Ưu đãi cho phụ huynh hiện hữu.',
      'Links sang event, summer camp hoặc parent hub nội bộ.',
    ],
    internalLinks: [
      { title: 'Ưu đãi phụ huynh', href: '/phu-huynh-uu-dai', body: 'Trang lợi ích dành cho phụ huynh hiện hữu.' },
      { title: 'Summer camp', href: '/summer-camp', body: 'CTA mở rộng engagement theo mùa.' },
      { title: 'Sự kiện', href: '/open-day', body: 'Hoạt động tiếp tục nuôi gắn kết cộng đồng phụ huynh.' },
    ],
    productionRoute: '/gioi-thieu-ban-be',
    schema: ['WebPage'],
    answerFirst: [
      'Đầu trang phải giải thích rất rõ referral này dành cho ai, được gì và làm thế nào để tham gia.',
      'Nếu offer có điều kiện, điều kiện phải ở dạng list dễ parse.',
    ],
    hubspotInspired: [
      'Đây là retention page, nên gắn với CRM lifecycle hơn là organic growth.',
      'Luôn giữ một CTA chính rõ nhất, tránh biến trang thành nơi nhồi nhiều chiến dịch cùng lúc.',
    ],
    performance: [
      'Giữ nhẹ, ít media, form referral ngắn.',
      'Noindex hoặc hạn chế index nếu có thông tin nội bộ.',
    ],
  },
  {
    classNumber: 22,
    slug: 'class-corporate-brand-leadership',
    templateClass: 'Class Corporate Brand & Leadership (Câu chuyện Thương hiệu & BGH)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Trang kể câu chuyện thương hiệu, tầm nhìn, ban giám hiệu và nền tảng E-E-A-T.',
    description:
      'Trang này giúp AI và phụ huynh hiểu Việt Anh là tổ chức nào, ai dẫn dắt, triết lý giáo dục là gì và vì sao mô hình này tồn tại.',
    audience: 'Phụ huynh branded, đối tác, ứng viên, báo chí, AI crawlers.',
    funnel: 'TOFU / Trust',
    traffic: 'Branded, direct, PR, AI answers',
    cvr: '1-3%',
    primaryCta: 'Tìm hiểu hệ thống',
    secondaryCta: 'Xem đội ngũ / cơ sở',
    sampleHeadline: 'Một câu chuyện thương hiệu tốt không làm trang trọng hóa mọi thứ; nó phải cho thấy tầm nhìn, con người và lý do tồn tại thật sự.',
    sampleBody:
      'Trang nên có câu chuyện thành lập, ban giám hiệu, định hướng, giá trị và các tín hiệu tin cậy như chứng nhận, cột mốc, quote lãnh đạo.',
    previewHighlights: [
      'Có founder/leadership quotes bằng text thật.',
      'Có timeline hoặc milestones thương hiệu.',
      'Có links sang đội ngũ, cơ sở và chương trình.',
      'Có AboutPage/Organization schema để tăng E-E-A-T.',
    ],
    blockOrder: [
      'Hero thương hiệu và answer-first brand statement.',
      'Câu chuyện hình thành / milestones.',
      'Tầm nhìn, sứ mệnh, giá trị, định vị.',
      'Ban giám hiệu / leadership highlights.',
      'Links sang chương trình, đội ngũ, campus.',
      'CTA mềm về tìm hiểu hệ thống hoặc liên hệ.',
    ],
    internalLinks: [
      { title: 'Giới thiệu', href: '/gioi-thieu', body: 'Trang thương hiệu production route gần nhất.' },
      { title: 'Đội ngũ giáo viên', href: '/doi-ngu', body: 'Nối sang lớp trust về con người.' },
      { title: 'Hệ sinh thái', href: '/he-sinh-thai-viet-anh', body: 'Làm rõ mối quan hệ brand house và các đơn vị liên quan.' },
    ],
    productionRoute: '/gioi-thieu',
    schema: ['AboutPage', 'Organization', 'Person'],
    answerFirst: [
      'Mở đầu phải định nghĩa ngắn Việt Anh là ai, ở đâu, đang phục vụ nhóm gia đình nào.',
      'Các chức danh và quote của lãnh đạo phải ở dạng text rõ, không nhét trong ảnh thiết kế.',
    ],
    hubspotInspired: [
      'Trang này là authority support page cho toàn site, củng cố E-E-A-T cho mọi cluster.',
      'Nó nên được link từ homepage, footer, career pages và PR content.',
    ],
    performance: [
      'Giữ visual có chọn lọc; đừng biến trang thành album nặng.',
      'Timeline và profile cards nên nhẹ, không dùng animation nặng.',
    ],
  },
  {
    classNumber: 23,
    slug: 'class-teacher-faculty-profile',
    templateClass: 'Class Teacher / Faculty Profile Page (Hồ sơ Đội ngũ Giáo viên)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Xây trust quanh đội ngũ giáo viên, chuyên môn và con người.',
    description:
      'Trang profile giáo viên cần vừa đủ chuyên môn, vừa đủ gần gũi, và giúp phụ huynh thấy chất lượng con người đứng sau trải nghiệm học tập.',
    audience: 'Phụ huynh đang cân nhắc chất lượng đội ngũ, ứng viên, báo chí.',
    funnel: 'MOFU / Trust',
    traffic: 'Branded, internal, AI answers, trust flows',
    cvr: '1-4%',
    primaryCta: 'Xem đội ngũ',
    secondaryCta: 'Đặt lịch tham quan',
    sampleHeadline: 'Đội ngũ giáo viên là một trong những tín hiệu niềm tin mạnh nhất; profile page phải vừa chân thật vừa đủ chuyên môn.',
    sampleBody:
      'Trang nên cho thấy vai trò, chuyên môn, kinh nghiệm, cách dạy và sự gắn kết với triết lý giáo dục của trường; không cần văn phong khuếch đại.',
    previewHighlights: [
      'Có profile thật, ảnh thật, vai trò thật.',
      'Có điểm nhấn chuyên môn hoặc môn/cấp học phụ trách.',
      'Có trích dẫn ngắn hoặc teaching philosophy.',
      'Có links sang chương trình, campus và career nếu phù hợp.',
    ],
    blockOrder: [
      'Hero đội ngũ / faculty intro.',
      'Danh sách profile giáo viên hoặc profile chi tiết.',
      'Trích dẫn hoặc triết lý giảng dạy ngắn.',
      'Proof chuyên môn, chứng chỉ, years of experience.',
      'Liên kết sang chương trình / campus / career.',
      'CTA mềm về tham quan hoặc tìm hiểu thêm.',
    ],
    internalLinks: [
      { title: 'Đội ngũ', href: '/doi-ngu', body: 'Trang production route gần nhất về con người và giáo viên.' },
      { title: 'Chương trình học', href: '/mam-non/chuong-trinh', body: 'Nối từ con người sang nội dung học tập.' },
      { title: 'Tuyển dụng', href: '/tuyen-dung', body: 'Route hỗ trợ employer brand khi phù hợp.' },
    ],
    productionRoute: '/doi-ngu',
    schema: ['ProfilePage', 'Person', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu nên nêu rõ đội ngũ có điểm mạnh gì và đang đồng hành với học sinh ra sao.',
      'Các profile cần có dữ liệu text rõ để AI hiểu chuyên môn, vai trò, cấp học.',
    ],
    hubspotInspired: [
      'Teacher profiles là trust-support content; không phải conversion hub nhưng phải gắn với pillar và campus pages.',
      'Có thể scale theo campus hoặc cấp học nhưng vẫn cần thống nhất format để giữ quality.',
    ],
    performance: [
      'Ảnh profile phải tối ưu kích thước, không dùng gallery quá nặng.',
      'Profile cards render server-side, không cần lọc JS phức tạp ở bản đầu.',
    ],
  },
  {
    classNumber: 24,
    slug: 'class-alumni-success-stories',
    templateClass: 'Class Alumni & Success Stories (Cựu học sinh & Thành tựu)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Gom social proof, thành tích, câu chuyện học sinh và outcomes dài hạn.',
    description:
      'Trang này tạo trust layer mạnh cho BOFU bằng các câu chuyện thành công, thành tích và đầu ra có thể kiểm chứng.',
    audience: 'Phụ huynh đang cần proof về đầu ra, thành tích và câu chuyện thật.',
    funnel: 'MOFU / BOFU',
    traffic: 'Organic branded, AI answers, internal trust flows',
    cvr: '2-6%',
    primaryCta: 'Xem hành trình học tập',
    secondaryCta: 'Nhận tư vấn lộ trình',
    sampleHeadline: 'Thành tựu không nên nằm rải rác; khi gom lại thành trust architecture, nó mới thực sự hỗ trợ chuyển đổi.',
    sampleBody:
      'Trang nên nhóm các câu chuyện cựu học sinh, IELTS, đại học, giải thưởng và testimonial theo cấu trúc dễ quét, dễ trích xuất, dễ liên kết.',
    previewHighlights: [
      'Có outcomes theo nhóm: IELTS, đại học, giải thưởng, câu chuyện cá nhân.',
      'Có quote và profile thật của học sinh / phụ huynh khi được phép.',
      'Có links sang THCS, THPT, tuyển sinh và học bổng.',
      'Có schema Article/Review/Profile phù hợp từng cụm nội dung.',
    ],
    blockOrder: [
      'Hero outcomes / success stories.',
      'Summary answer-first về các tín hiệu đầu ra chính.',
      'Nhóm thành tích, câu chuyện cựu học sinh, testimonial.',
      'Case studies hoặc journeys ngắn.',
      'Links sang chương trình, học bổng, tuyển sinh.',
      'CTA tư vấn lộ trình / school tour.',
    ],
    internalLinks: [
      { title: 'THPT pillar', href: '/trung-hoc-pho-thong', body: 'Đích quan trọng nhất của nhóm content outcomes.' },
      { title: 'Học bổng', href: '/hoc-bong', body: 'Nối sang ưu đãi, học bổng và tuyển sinh theo đầu ra.' },
      { title: 'Tuyển sinh lớp 10', href: '/tuyen-sinh', body: 'CTA chuyển đổi cho nhóm THPT.' },
    ],
    productionRoute: '/cam-ket-dau-ra-ielts-60',
    schema: ['CollectionPage', 'Article', 'Review', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu cần tóm tắt các outcomes chính bằng dữ liệu text rõ ràng.',
      'Các câu chuyện nên có “vấn đề → hành trình → kết quả” để AI hiểu được logic outcome.',
    ],
    hubspotInspired: [
      'Đây là trust cluster; các mẩu thành tích lẻ nên quy về hub này để không phân mảnh authority.',
      'Trang phải nối chặt với THCS, THPT, scholarship và admissions.',
    ],
    performance: [
      'Tối ưu ảnh và quote cards; tránh biến trang thành media wall nặng.',
      'Video testimonial chỉ lazy-load khi thật cần.',
    ],
  },
  {
    classNumber: 25,
    slug: 'class-talent-acquisition',
    templateClass: 'Class Talent Acquisition (Tuyển dụng / Career)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Employer brand và tuyển dụng, gắn thương hiệu với đội ngũ và văn hóa.',
    description:
      'Career page cần phục vụ ứng viên tốt, nhưng vẫn giữ sự liên hệ với triết lý giáo dục và hệ sinh thái Việt Anh.',
    audience: 'Ứng viên giáo viên, nhân sự vận hành, đối tác tuyển dụng.',
    funnel: 'Trust / Utility',
    traffic: 'Branded, job search, referrals, LinkedIn',
    cvr: '2-5%',
    primaryCta: 'Xem vị trí tuyển dụng',
    secondaryCta: 'Tìm hiểu văn hóa',
    sampleHeadline: 'Trang tuyển dụng tốt phải khiến ứng viên hiểu họ sẽ gia nhập môi trường nào, chứ không chỉ nhìn thấy danh sách job title.',
    sampleBody:
      'Trang cần nói rõ văn hóa, đội ngũ, giá trị cốt lõi, cơ hội phát triển và danh sách vị trí đang tuyển theo cấu trúc dễ scan.',
    previewHighlights: [
      'Có employer brand story và values rõ.',
      'Có danh sách vị trí, bộ lọc đơn giản, CTA ứng tuyển.',
      'Có links sang brand story, faculty profiles và news.',
      'Có dữ liệu text đủ để AI hiểu đây là môi trường giáo dục nào.',
    ],
    blockOrder: [
      'Hero tuyển dụng + answer-first employer brand.',
      'Văn hóa, giá trị, môi trường làm việc.',
      'Khối vị trí tuyển dụng mở.',
      'Quy trình ứng tuyển và FAQ ứng viên.',
      'Links sang đội ngũ, leadership, tin tức hệ thống.',
      'CTA ứng tuyển.',
    ],
    internalLinks: [
      { title: 'Tuyển dụng', href: '/tuyen-dung', body: 'Production route dự kiến cho trang career.' },
      { title: 'Leadership', href: '/gioi-thieu', body: 'Hiểu văn hóa và định hướng hệ thống.' },
      { title: 'Đội ngũ giáo viên', href: '/doi-ngu', body: 'Xem con người và chất lượng chuyên môn phía sau môi trường làm việc.' },
    ],
    productionRoute: '/tuyen-dung',
    schema: ['JobPosting', 'Organization', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu phải nói rõ ai phù hợp với môi trường này và Việt Anh đang tìm kiếm điều gì ở ứng viên.',
      'Danh sách job openings nên là text thật, không nhúng dưới dạng ảnh hoặc PDF duy nhất.',
    ],
    hubspotInspired: [
      'Career page củng cố E-E-A-T của toàn hệ thống, đặc biệt ở trục con người và tổ chức.',
      'Nó nên nhận link từ footer, leadership pages và faculty profiles.',
    ],
    performance: [
      'Bảng job openings nên nhẹ, server-render.',
      'Không nhúng quá nhiều iframes hoặc ATS scripts ở fold đầu.',
    ],
  },
  {
    classNumber: 26,
    slug: 'class-news-events-hub-pr',
    templateClass: 'Class News & Events Hub / PR (Tin tức Báo chí & Hoạt động)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Hub tin tức, báo chí, hoạt động và PR của toàn hệ thống.',
    description:
      'Trang này dùng để nhóm những nội dung thời sự và truyền thông, nhưng phải kiểm soát indexation để không lấn át các tầng SEO quan trọng hơn.',
    audience: 'Phụ huynh hiện hữu, báo chí, branded users, social traffic.',
    funnel: 'Awareness / Retention',
    traffic: 'Direct, social, referral, branded',
    cvr: '1-3%',
    primaryCta: 'Xem hoạt động nổi bật',
    secondaryCta: 'Tìm hiểu chương trình',
    sampleHeadline: 'Tin tức và hoạt động cần có chỗ đứng rõ ràng: hỗ trợ thương hiệu và retention, không tranh crawl budget với money pages.',
    sampleBody:
      'Hub này nên phân loại theo news, PR, recap và hoạt động học sinh; đồng thời đánh dấu rõ bài nào nên index, bài nào chỉ nên phục vụ archive.',
    previewHighlights: [
      'Có taxonomy rõ: tin tức, PR, hoạt động, recap.',
      'Có featured stories thật sự nổi bật, không dồn mọi bài lên ngang nhau.',
      'Có links mềm sang campus, chương trình, phụ huynh hub.',
      'Có lifecycle rõ cho nội dung cũ: index/noindex/archive.',
    ],
    blockOrder: [
      'Hero hub tin tức / hoạt động.',
      'Featured stories / PR nổi bật.',
      'Các nhóm category: tin tức, sự kiện, báo chí, hoạt động.',
      'Archive / year filters nhẹ nhàng.',
      'Links sang chương trình, campus, parent hub.',
    ],
    internalLinks: [
      { title: 'Tin tức', href: '/tin-tuc', body: 'Route hub production gần nhất cho nhóm news và PR.' },
      { title: 'Parent Hub', href: '/phu-huynh/cach-chon-truong-mam-non', body: 'Nối từ hoạt động sang nội dung hữu ích cho phụ huynh.' },
      { title: 'Campus', href: '/co-so', body: 'Dẫn người đọc từ hoạt động về cơ sở thật.' },
    ],
    productionRoute: '/tin-tuc',
    schema: ['CollectionPage', 'NewsArticle', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu phải giải thích đây là hub của loại nội dung nào và người đọc sẽ tìm thấy gì.',
      'Các featured stories nên có summary text ngắn để AI nắm ngữ cảnh của hub.',
    ],
    hubspotInspired: [
      'News hub là nhánh support/retention; không nên cạnh tranh với pillars và admissions về cấu trúc điều hướng chính.',
      'Phải có quy tắc archive và noindex rõ cho bài cũ hoặc mỏng.',
    ],
    performance: [
      'Listing page phải nhẹ, ảnh card tối ưu, không infinite scroll ở bản đầu.',
      'Filter/category nav nên đơn giản, ưu tiên server-render.',
    ],
  },
  {
    classNumber: 27,
    slug: 'class-legal-utility-info',
    templateClass: 'Class Legal & Utility Info (Pháp lý & Tiện ích nội bộ)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Các trang pháp lý, chính sách, utility thông tin và nội dung phục vụ vận hành.',
    description:
      'Nhóm này giúp site hoàn chỉnh về pháp lý và utility, nhưng cần kiểm soát rõ indexation và độ ưu tiên crawl.',
    audience: 'Phụ huynh, pháp lý, vận hành, CRM, người dùng cần thông tin hỗ trợ.',
    funnel: 'Utility / Compliance',
    traffic: 'Footer, direct, support traffic',
    cvr: 'N/A',
    primaryCta: 'Xem chính sách',
    secondaryCta: 'Liên hệ hỗ trợ',
    sampleHeadline: 'Trang pháp lý và utility phải rõ ràng, dễ tra cứu, dễ in và không gây rối trải nghiệm chính của site.',
    sampleBody:
      'Các trang này nên cực kỳ sạch, text-first, dễ scan, có cấu trúc heading chuẩn và robots/index rules phù hợp với từng loại utility.',
    previewHighlights: [
      'Có heading rõ, mục lục khi nội dung dài.',
      'Có thông tin pháp lý hoặc utility ở dạng text, không chỉ file tải xuống.',
      'Có liên hệ hỗ trợ nếu người dùng cần giải thích thêm.',
      'Có noindex hoặc canonical khi cần cho utility pages ít giá trị SEO.',
    ],
    blockOrder: [
      'Hero utility/legal đơn giản.',
      'Mục lục hoặc quick links.',
      'Nội dung pháp lý / chính sách / thông tin utility dạng text.',
      'FAQ hoặc contact support nếu cần.',
      'Footer utility links.',
    ],
    internalLinks: [
      { title: 'Chính sách bảo mật', href: '/chinh-sach-bao-mat', body: 'Route pháp lý quan trọng nhất ở footer.' },
      { title: 'Liên hệ', href: '/lien-he', body: 'Liên hệ hỗ trợ nếu người dùng cần làm rõ chính sách.' },
      { title: 'Admissions', href: '/tuyen-sinh', body: 'Khi utility page liên quan đến quy trình hoặc hồ sơ nhập học.' },
    ],
    productionRoute: '/chinh-sach-bao-mat',
    schema: ['WebPage', 'BreadcrumbList'],
    answerFirst: [
      'Mở đầu phải nói rõ đây là loại tài liệu gì và áp dụng cho ai.',
      'Các điều khoản, chính sách, lịch, thực đơn nên ở dạng text thật để tìm kiếm nội bộ và AI đọc được.',
    ],
    hubspotInspired: [
      'Utility pages không phải cluster tăng trưởng, nhưng phải sạch và đáng tin để hỗ trợ toàn hệ thống.',
      'Nên nhận traffic chủ yếu từ footer và support flows, không cần quá nhiều internal links ở lớp trên.',
    ],
    performance: [
      'Text-first, không dùng layout cầu kỳ.',
      'Ưu tiên readability, in-print friendly và tải cực nhanh.',
    ],
  },
  {
    classNumber: 28,
    slug: 'class-other',
    templateClass: 'Other (Khác)',
    group: 'System / Utility',
    theme: 'system',
    pageRole: 'Nhóm tạm cho những page chưa map được về 27 classes chính.',
    description:
      'Other chỉ là vùng chờ để review lại intent, owner và route phù hợp; không nên trở thành bãi chứa one-off pages.',
    audience: 'Nội bộ vận hành và planning.',
    funnel: 'N/A',
    traffic: 'N/A',
    cvr: 'N/A',
    primaryCta: 'Review lại page role',
    secondaryCta: 'Map về class phù hợp',
    sampleHeadline: 'Nếu một page nằm ở “Other” quá lâu, đó thường là dấu hiệu kiến trúc đang bắt đầu lệch intent.',
    sampleBody:
      'Class này không dành để mở rộng production. Nó chỉ giúp đội ngũ giữ kỷ luật thông tin, rà lại vai trò của trang và map ngược về kiến trúc chuẩn.',
    previewHighlights: [
      'Chỉ dùng tạm thời trong planning.',
      'Phải có owner, due date và lý do tồn tại.',
      'Mặc định không ưu tiên index hoặc public release.',
      'Nên quy về 27 classes chính càng sớm càng tốt.',
    ],
    blockOrder: [
      'Context summary.',
      'Business role clarification.',
      'Search intent clarification.',
      'Owner / next-step decision.',
    ],
    internalLinks: [
      { title: 'Template library', href: '/mau-template/', body: 'Quay lại toàn bộ thư viện để map về class phù hợp.' },
      { title: 'Homepage', href: '/', body: 'Trang gốc của kiến trúc hệ thống.' },
      { title: 'Liên hệ hệ thống', href: '/lien-he', body: 'Fallback nếu page utility cần support contact.' },
    ],
    productionRoute: '/mau-template/',
    schema: ['WebPage'],
    answerFirst: [
      'Nếu một page rơi vào đây, phải nói rõ ngay vì sao nó chưa khớp các class chuẩn.',
      'Không nên public rộng rãi hay tối ưu SEO cho nhóm tạm này.',
    ],
    hubspotInspired: [
      'Không dùng “Other” để phá vỡ mô hình topic cluster và intent mapping.',
      'Mỗi page trong Other phải có kế hoạch chuyển lớp rõ ràng.',
    ],
    performance: [
      'Giữ tối giản tuyệt đối.',
      'Không thêm feature phức tạp cho class tạm.',
    ],
  },
];

export const templateSamples: TemplateSample[] = seeds.map((seed) => ({
  slug: seed.slug,
  classCode: `Class ${seed.classNumber}`,
  templateClass: seed.templateClass,
  group: seed.group,
  theme: seed.theme,
  pageRole: seed.pageRole,
  description: seed.description,
  audience: seed.audience,
  funnel: seed.funnel,
  traffic: seed.traffic,
  cvr: seed.cvr,
  primaryCta: seed.primaryCta,
  secondaryCta: seed.secondaryCta,
  sampleHeadline: seed.sampleHeadline,
  sampleBody: seed.sampleBody,
  previewHighlights: seed.previewHighlights,
  blockOrder: seed.blockOrder,
  brandRules: seed.brandRules || defaultBrandRules(seed.theme),
  seoRules: seed.seoRules || defaultSeoRules(seed.group),
  enhancementIdeas: seed.enhancementIdeas || defaultEnhancementIdeas(seed.theme),
  internalLinks: seed.internalLinks,
}));

export const templateGroups = [
  'Performance',
  'SEO / Authority',
  'Mid-funnel / Nurturing',
  'System / Utility',
] as const;

const blueprintBySlug: Record<string, TemplateBlueprint> = Object.fromEntries(
  seeds.map((seed) => [
    seed.slug,
    {
      answerFirst: seed.answerFirst,
      hubspotInspired: seed.hubspotInspired,
      schema: seed.schema,
      performance: seed.performance,
      sampleRoute: `/mau-template/${seed.slug}/`,
      productionRoute: seed.productionRoute,
    },
  ]),
);

export function getTemplateSampleBySlug(slug: string) {
  return templateSamples.find((sample) => sample.slug === slug);
}

export function getTemplateBlueprint(sample: TemplateSample): TemplateBlueprint {
  const blueprint = blueprintBySlug[sample.slug];

  if (!blueprint) {
    throw new Error(`Missing template blueprint for ${sample.slug}`);
  }

  return blueprint;
}

export function getTemplateCheckLinks() {
  return templateSamples.map((sample) => {
    const blueprint = getTemplateBlueprint(sample);

    return {
      classCode: sample.classCode,
      templateClass: sample.templateClass,
      sampleRoute: blueprint.sampleRoute,
      productionRoute: blueprint.productionRoute,
    };
  });
}
