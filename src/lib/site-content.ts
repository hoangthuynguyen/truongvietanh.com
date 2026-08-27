export type StatItem = {
  value: string;
  label: string;
  note?: string;
};

export type LinkItem = {
  title: string;
  href: string;
  body: string;
  eyebrow?: string;
};

export type CardItem = {
  title: string;
  body: string;
  eyebrow?: string;
  href?: string;
  cta?: string;
};

export type StepItem = {
  title: string;
  body: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

type CardsSection = {
  type: 'cards';
  eyebrow: string;
  title: string;
  intro: string;
  columns?: 2 | 3 | 4;
  items: CardItem[];
};

type StepsSection = {
  type: 'steps';
  eyebrow: string;
  title: string;
  intro: string;
  items: StepItem[];
};

type FAQSection = {
  type: 'faq';
  eyebrow: string;
  title: string;
  intro: string;
  items: FAQItem[];
};

type LinksSection = {
  type: 'links';
  eyebrow: string;
  title: string;
  intro: string;
  items: LinkItem[];
};

type QuoteSection = {
  type: 'quote';
  eyebrow: string;
  title: string;
  quote: string;
  attribution: string;
};

type StatsSection = {
  type: 'stats';
  eyebrow: string;
  title: string;
  intro: string;
  items: StatItem[];
};

export type PageSection =
  | CardsSection
  | StepsSection
  | FAQSection
  | LinksSection
  | QuoteSection
  | StatsSection;

export type PageSpec = {
  slug: string;
  title: string;
  description: string;
  templateClass: string;
  pageType: string;
  theme: 'brand' | 'pillar' | 'admissions' | 'tuition';
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    badges: string[];
    asideTitle: string;
    asideItems: string[];
  };
  stats: StatItem[];
  sections: PageSection[];
};

export const siteName = 'Trường Việt Anh';
export const defaultSiteUrl = 'https://truongvietanh.com';
export const adminUrl = 'https://admin.truongvietanh.com/admin';

export const mainNavLeft = [
  { label: 'Trang chủ', href: '/' },
  {
    label: 'Giới thiệu',
    href: '/gioi-thieu',
    children: [
      { label: 'Giới thiệu nhà trường', href: '/gioi-thieu' },
      { label: 'Ban Lãnh Đạo', href: '/ban-lanh-dao' },
      { label: 'Giáo viên', href: '/giao-vien' },
      { label: 'Âm nhạc Việt Anh', href: '/am-nhac' },
    ]
  },
  { label: 'Đánh giá', href: '/danh-gia-cua-phu-huynh' },
  {
    label: 'Tuyển sinh',
    href: '/tuyen-sinh',
    children: [
      { label: 'Mầm non', href: '/tuyen-sinh/mam-non' },
      { label: 'Tiểu học', href: '/tuyen-sinh/tieu-hoc' },
      { label: 'THCS', href: '/tuyen-sinh/thcs' },
      { label: 'THPT', href: '/tuyen-sinh/thpt' },
      { label: 'Trại hè', href: '/tuyen-sinh/trai-he' },
      { label: 'Tiếng Anh Evolution', href: '/tuyen-sinh/tieng-anh-evo' },
      { label: 'Tiếng Anh Trẻ Em', href: '/tuyen-sinh/tieng-anh-tre-em' },
      { label: 'Toán Tư Duy', href: '/tuyen-sinh/toan-tu-duy' },
      { label: 'Giải Mã Tiềm Năng', href: '/tuyen-sinh/giai-ma-tiem-nang' },
    ]
  },
];

export const mainNavRight = [
  {
    label: 'Chương trình',
    href: '/cap-hoc',
    children: [
      { label: 'Mầm non', href: '/mam-non' },
      { label: 'Tiểu học', href: '/tieu-hoc' },
      { label: 'THCS', href: '/thcs' },
      { label: 'THPT', href: '/thpt' },
      { label: 'Trại hè', href: '/trai-he-2026' },
      { label: 'Tiếng Anh Trẻ Em', href: '/tuyen-sinh/tieng-anh-tre-em' },
      { label: 'Toán Tư Duy', href: '/toan-tu-duy' },
      { label: 'Giải Mã Tiềm Năng', href: '/tuyen-sinh/giai-ma-tiem-nang' },
      { label: 'Du học', href: '/du-hoc' },
    ]
  },
  // Các trang thành tích thể thao / kỹ năng / ngoại khóa / giáo viên chưa tồn tại —
  // khi nào có trang thì thêm lại children ở đây.
  { label: 'Thành tích', href: '/thanh-tich-hoc-tap' },
  { label: 'Blog', href: '/blog' },
  { label: 'Hình ảnh', href: '/hinh-anh' },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const mainNav = [...mainNavLeft, ...mainNavRight];

export const contactLinks = {
  phoneDisplay: '0916 961 409',
  phoneHref: 'tel:0916961409',
  zaloHref: 'https://zalo.me/1678310120468101523',
  email: 'info@truongvietanh.com',
  contactHref: '/lien-he',
  facebookHref: 'https://www.facebook.com/truongvietanhhcm',
  youtubeHref: 'https://www.youtube.com/',
  instagramHref: 'https://www.instagram.com/',
  admissionsHref: '/tuyen-sinh/dang-ky-tu-van',
  tuitionHref: '/hoc-phi',
};

export const launchPages: LinkItem[] = [
  {
    eyebrow: 'Class Homepage',
    title: 'Trang Chủ',
    href: '/',
    body: 'Grand Central Station điều phối traffic vào cấp học, học phí và admissions hub.',
  },
  {
    eyebrow: 'Brand Core',
    title: 'Giới Thiệu',
    href: '/gioi-thieu',
    body: 'Trang cốt lõi để kể câu chuyện thương hiệu, lịch sử và lời hứa giá trị.',
  },
  {
    eyebrow: 'Brand Depth',
    title: 'Triết Lý Giáo Dục',
    href: '/triet-ly-giao-duc',
    body: 'Trang thought leadership giải thích tinh thần vui vẻ và thực dụng của Việt Anh.',
  },
  {
    eyebrow: 'Authority Asset',
    title: 'Hệ Thống PDR',
    href: '/he-thong-pdr',
    body: 'Trang signature asset để neo sự khác biệt về Plan - Do - Review.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Mầm Non',
    href: '/mam-non',
    body: 'Pillar page để bắt từ khóa cấp học và route về học phí, tuyển sinh.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Tiểu Học',
    href: '/tieu-hoc',
    body: 'Trang trụ cột cho phụ huynh đang so sánh chương trình, tiếng Anh và nề nếp.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Trung Học Cơ Sở',
    href: '/trung-hoc-co-so',
    body: 'Pillar THCS nổi bật lộ trình học thuật, PDR và tư duy chủ động.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Trung Học Phổ Thông',
    href: '/trung-hoc-pho-thong',
    body: 'Pillar THPT nhấn mạnh IELTS, định hướng đại học và năng lực tự học.',
  },
  {
    eyebrow: 'Admissions Hub',
    title: 'Tuyển Sinh',
    href: '/tuyen-sinh',
    body: 'Trang điều hướng phụ huynh vào đúng hành động: tư vấn, tham quan, assessment.',
  },
  {
    eyebrow: 'Money Page',
    title: 'Học Phí',
    href: '/hoc-phi',
    body: 'Trang học phí minh bạch, đúng intent thương mại và chuyển đổi sang tư vấn.',
  },
];

export const levelCards: LinkItem[] = [
  {
    eyebrow: 'Level Pillar',
    title: 'Mầm Non',
    href: '/mam-non',
    body: 'Từ 18 tháng đến 5 tuổi, ưu tiên thích nghi, an toàn và phát triển cảm xúc.',
  },
  {
    eyebrow: 'Level Pillar',
    title: 'Tiểu Học',
    href: '/tieu-hoc',
    body: 'Cân bằng học thuật, tiếng Anh, kỷ luật tự học và niềm vui mỗi ngày.',
  },
  {
    eyebrow: 'Level Pillar',
    title: 'Trung Học Cơ Sở',
    href: '/trung-hoc-co-so',
    body: 'Tăng tốc tiếng Anh, dự án, PDR và kỹ năng thế kỷ 21.',
  },
  {
    eyebrow: 'Level Pillar',
    title: 'Trung Học Phổ Thông',
    href: '/trung-hoc-pho-thong',
    body: 'IELTS, định hướng đại học và một lộ trình học tập có chủ đích.',
  },
];

export const admissionsCards: LinkItem[] = [
  {
    eyebrow: 'Admissions Hub',
    title: 'Bắt đầu từ Tuyển Sinh',
    href: '/tuyen-sinh',
    body: 'Xem quy trình, mốc thời gian và cách phối hợp với đội tuyển sinh của trường.',
  },
  {
    eyebrow: 'Money Page',
    title: 'Xem Học Phí',
    href: '/hoc-phi',
    body: 'Nhìn rõ cấu trúc học phí, range theo cấp học và cách nhận bảng học phí chi tiết.',
  },
  {
    eyebrow: 'Direct Contact',
    title: 'Gọi tư vấn ngay',
    href: contactLinks.phoneHref,
    body: 'Phù hợp với phụ huynh đang ở giai đoạn BOFU và cần xác nhận thông tin nhanh.',
  },
];

const priorityPages: PageSpec[] = [
  {
    slug: 'co-so',
    title: 'Cơ Sở Trường Việt Anh',
    description:
      'Trang tổng hợp cơ sở của Trường Việt Anh, giúp phụ huynh chọn khu vực phù hợp, xem cấp học đang vận hành và đi tiếp sang tham quan hoặc tư vấn.',
    templateClass: 'Campus Hub',
    pageType: 'Local trust hub',
    theme: 'brand',
    hero: {
      eyebrow: 'Campus Hub',
      title: 'Chọn cơ sở phù hợp để bắt đầu hành trình tuyển sinh gần nhà, đúng cấp học và thuận tiện cho gia đình.',
      body:
        'Trang này gom các cơ sở trọng điểm của Việt Anh để phụ huynh nhìn nhanh khu vực phục vụ, cấp học đang mở và bước tiếp theo rõ ràng nhất: tham quan trường, nhận tư vấn hoặc xem học phí.',
      primaryCta: { label: 'Đặt lịch tham quan', href: '/tuyen-sinh/tham-quan-truong' },
      secondaryCta: { label: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van' },
      badges: ['Local SEO', 'Campus trust', 'Admissions bridge'],
      asideTitle: 'Phụ huynh thường bắt đầu từ 3 câu hỏi',
      asideItems: [
        'Cơ sở nào thuận tiện cho việc đưa đón mỗi ngày?',
        'Cơ sở đó đang có những cấp học nào?',
        'Bước tiếp theo nên là tham quan, học thử hay nhận tư vấn?',
      ],
    },
    stats: [
      { value: '3', label: 'Cơ sở trọng điểm đang được ưu tiên hiển thị trong đợt đầu' },
      { value: '4 cấp học', label: 'Hành trình liên cấp từ Mầm non đến THPT' },
      { value: '1 hub', label: 'Một điểm điều hướng cho local trust và tuyển sinh' },
      { value: '2 CTA', label: 'Tập trung vào tham quan trường và tư vấn' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Cơ sở nổi bật',
        title: 'Những điểm bắt đầu quan trọng nhất cho phụ huynh đang tìm trường tại TP.HCM.',
        intro:
          'Mỗi cơ sở nên có trang riêng để thể hiện rõ hình ảnh thật, khu vực phục vụ, cấp học đang mở và CTA phù hợp với địa phương.',
        columns: 2,
        items: [
          {
            eyebrow: 'Flagship campus',
            title: 'Gò Vấp Phan Huy Ích',
            body: 'Phù hợp với phụ huynh muốn xem một cơ sở có nhiều điểm chạm tuyển sinh, học phí và tham quan ngay từ đầu.',
            href: '/co-so/go-vap-phan-huy-ich',
            cta: 'Xem cơ sở Gò Vấp',
          },
          {
            eyebrow: 'Mầm non chuyên sâu',
            title: 'Mầm non Gò Vấp Lê Đức Thọ',
            body: 'Điểm bắt đầu mạnh cho nhóm phụ huynh đang tìm môi trường mầm non gần nhà, cần cảm giác an tâm và nhịp sinh hoạt phù hợp.',
            href: '/co-so/mam-non-go-vap-le-duc-tho',
            cta: 'Xem cơ sở Lê Đức Thọ',
          },
          {
            eyebrow: 'Khu Tây TP.HCM',
            title: 'Bình Tân Tỉnh Lộ 10',
            body: 'Cơ sở giúp Việt Anh có điểm hiện diện gần hơn với nhóm gia đình ở khu vực Bình Tân và vùng lân cận.',
            href: '/co-so/binh-tan-tinh-lo-10',
            cta: 'Xem cơ sở Bình Tân',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Cách chọn cơ sở',
        title: 'Ba tiêu chí nên xem trước khi quyết định cơ sở phù hợp.',
        intro:
          'Một trang cơ sở tốt không chỉ kể về địa điểm. Nó phải giúp phụ huynh nhìn ra cơ sở nào gần với nhịp sống và nhu cầu học tập của con.',
        items: [
          {
            title: 'Bắt đầu từ quãng đường đưa đón',
            body: 'Khoảng cách, hướng di chuyển và thời gian trong giờ cao điểm thường là yếu tố ảnh hưởng mạnh nhất tới trải nghiệm lâu dài của gia đình.',
          },
          {
            title: 'Đối chiếu cơ sở với cấp học quan tâm',
            body: 'Không phải cơ sở nào cũng có cùng điểm mạnh. Hãy xem rõ cấp học đang mở, các dịch vụ bổ trợ và trải nghiệm thực tế tại campus đó.',
          },
          {
            title: 'Chuyển nhanh sang bước có giá trị hơn',
            body: 'Nếu đã thấy cơ sở phù hợp, bước tiếp theo nên là tham quan trường hoặc tư vấn thay vì tiếp tục dò tìm quá nhiều nội dung rời rạc.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Đường đi tiếp theo',
        title: 'Sau khi chọn được cơ sở, đây là các trang nên đi tiếp.',
        intro:
          'Cụm campus chỉ thực sự mạnh khi được nối đúng sang các trang tuyển sinh, học phí và cấp học.',
        items: [
          {
            eyebrow: 'Admissions',
            title: 'Tham quan trường',
            href: '/tuyen-sinh/tham-quan-truong',
            body: 'Dành cho phụ huynh muốn chốt lịch đến campus thật để cảm nhận không gian, nề nếp và cách đội ngũ tiếp đón.',
          },
          {
            eyebrow: 'Money page',
            title: 'Xem học phí',
            href: '/hoc-phi',
            body: 'Khi phụ huynh muốn cân đối ngân sách và so sánh giá trị, học phí là bước tiếp theo hợp lý nhất.',
          },
          {
            eyebrow: 'Consultation',
            title: 'Đăng ký tư vấn',
            href: '/tuyen-sinh/dang-ky-tu-van',
            body: 'Nếu gia đình còn đang cân nhắc giữa nhiều cơ sở hoặc nhiều cấp học, tư vấn là bước đi tiết kiệm thời gian hơn cả.',
          },
        ],
      },
    ],
  },
  {
    slug: 'co-so/go-vap-phan-huy-ich',
    title: 'Cơ Sở Gò Vấp Phan Huy Ích | Trường Việt Anh',
    description:
      'Trang campus profile cho cơ sở Gò Vấp Phan Huy Ích của Trường Việt Anh, tập trung local trust, tham quan trường và định hướng tuyển sinh theo cấp học.',
    templateClass: 'Master Campus Profile',
    pageType: 'Campus profile',
    theme: 'brand',
    hero: {
      eyebrow: 'Campus profile',
      title: 'Cơ sở Gò Vấp Phan Huy Ích là điểm chạm quan trọng cho phụ huynh muốn xem trường thật, hỏi kỹ và đi tiếp nhanh sang tuyển sinh.',
      body:
        'Trang này nên cho phụ huynh cảm giác rõ ràng về khu vực, cấp học, các điểm mạnh thực tế của campus và lý do nên đến tham quan thay vì chỉ đọc mô tả chung chung.',
      primaryCta: { label: 'Đặt lịch tham quan cơ sở này', href: '/tuyen-sinh/tham-quan-truong' },
      secondaryCta: { label: 'Tư vấn theo cấp học', href: '/tuyen-sinh/dang-ky-tu-van' },
      badges: ['Gò Vấp', 'Campus trust', 'School tour'],
      asideTitle: 'Điểm mạnh nên làm rõ trên campus page',
      asideItems: [
        'Khu vực phục vụ và tính thuận tiện khi đưa đón.',
        'Cấp học đang vận hành và lộ trình học tập nổi bật.',
        'Bằng chứng thực tế: hình ảnh, review, lịch tham quan và hotline.',
      ],
    },
    stats: [
      { value: 'Flagship', label: 'Một trong những campus tạo niềm tin mạnh nhất trên tuyến tuyển sinh' },
      { value: 'Tour-ready', label: 'Phù hợp để đẩy phụ huynh sang bước tham quan' },
      { value: 'Local intent', label: 'Bắt truy vấn trường tại Gò Vấp và khu vực lân cận' },
      { value: 'Cross-link', label: 'Nối tốt sang cấp học, học phí và tuyển sinh' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Điểm phụ huynh quan tâm',
        title: 'Những nội dung cần xuất hiện rõ trên trang cơ sở Gò Vấp.',
        intro: 'Thay vì nói quá nhiều về thương hiệu, campus page nên trả lời những câu hỏi rất đời thường của phụ huynh.',
        columns: 2,
        items: [
          {
            title: 'Không gian học và trải nghiệm thực tế',
            body: 'Hình ảnh, video và lịch tham quan giúp phụ huynh chuyển từ cảm giác tò mò sang niềm tin cụ thể.',
          },
          {
            title: 'Cấp học đang mở tại campus',
            body: 'Phụ huynh cần biết ngay cơ sở này phù hợp với giai đoạn nào của con để không phải dò nhiều lớp nội dung khác nhau.',
          },
          {
            title: 'Nhịp di chuyển và đưa đón',
            body: 'Địa chỉ rõ, chỉ dẫn rõ và ngữ cảnh khu vực là yếu tố quan trọng với local SEO và cả chuyển đổi thực tế.',
          },
          {
            title: 'CTA tham quan và tư vấn',
            body: 'Khi phụ huynh đã có thiện cảm với cơ sở, CTA phải đủ rõ để giữ được đà hành động.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Liên kết theo nhu cầu',
        title: 'Từ cơ sở Gò Vấp, phụ huynh nên đi tiếp theo các hướng nào.',
        intro: 'Internal linking ở đây cần phục vụ quyết định thật, không phải chỉ để tăng số link trên trang.',
        items: [
          {
            eyebrow: 'Mầm non',
            title: 'Xem chương trình Mầm non',
            href: '/mam-non',
            body: 'Dành cho gia đình đang tìm môi trường đầu đời, cần ưu tiên sự thích nghi, giao tiếp và cảm xúc.',
          },
          {
            eyebrow: 'Admissions',
            title: 'Quy trình tuyển sinh',
            href: '/tuyen-sinh/quy-trinh-tuyen-sinh',
            body: 'Giúp phụ huynh nhìn rõ các bước sau khi đã chọn được campus quan tâm.',
          },
          {
            eyebrow: 'Money page',
            title: 'Học phí theo nhu cầu',
            href: '/hoc-phi',
            body: 'Một campus page mạnh nên luôn có đường đi ngắn sang học phí để giảm ma sát ở giai đoạn cân nhắc.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ campus',
        title: 'Những câu hỏi thường gặp trước khi phụ huynh quyết định ghé thăm.',
        intro: 'FAQ ngắn, rõ và thực dụng sẽ có ích hơn nhiều so với những đoạn văn giới thiệu dài.',
        items: [
          {
            question: 'Phụ huynh nên xem cơ sở này trước hay gọi tư vấn trước?',
            answer: 'Nếu gia đình đã nghiêng về khu vực Gò Vấp, nên đặt lịch tham quan để tiết kiệm thời gian. Nếu còn đang so sánh nhiều phương án, hãy bắt đầu từ tư vấn.',
          },
          {
            question: 'Trang campus này cần có gì để đủ tin cậy?',
            answer: 'Điều quan trọng nhất là hình ảnh thật, review thật, địa chỉ rõ, cấp học rõ và CTA rõ. Các tín hiệu đó giúp campus page vừa mạnh về local SEO vừa hỗ trợ tuyển sinh.',
          },
          {
            question: 'Sau khi xem trang cơ sở, bước tiếp theo là gì?',
            answer: 'Bước tiếp theo tốt nhất thường là đặt lịch tham quan hoặc đăng ký tư vấn để đối chiếu campus với nhu cầu cụ thể của gia đình.',
          },
        ],
      },
    ],
  },
  {
    slug: 'co-so/mam-non-go-vap-le-duc-tho',
    title: 'Mầm Non Gò Vấp Lê Đức Thọ | Trường Việt Anh',
    description:
      'Trang campus profile cho cơ sở Mầm non Gò Vấp Lê Đức Thọ của Trường Việt Anh, tập trung vào local trust, học thử và tham quan trường.',
    templateClass: 'Master Campus Profile',
    pageType: 'Campus profile',
    theme: 'brand',
    hero: {
      eyebrow: 'Campus profile',
      title: 'Cơ sở Mầm non Gò Vấp Lê Đức Thọ nên giúp phụ huynh nhìn thấy cảm giác an tâm, nhịp sinh hoạt và khả năng thích nghi của con.',
      body:
        'Với nhóm phụ huynh mầm non, campus page cần rất thực tế: con học ở đâu, nhịp sinh hoạt thế nào, không gian ra sao và làm sao để bắt đầu từ một bước nhẹ nhàng như tham quan hoặc học thử.',
      primaryCta: { label: 'Đăng ký học thử', href: '/hoc-thu' },
      secondaryCta: { label: 'Đặt lịch tham quan', href: '/tuyen-sinh/tham-quan-truong' },
      badges: ['Mầm non', 'Gò Vấp', 'Học thử'],
      asideTitle: 'Những tín hiệu tạo niềm tin cho phụ huynh mầm non',
      asideItems: [
        'Môi trường an toàn, sáng sủa và gần với nhịp sống của trẻ nhỏ.',
        'Đội ngũ đồng hành biết cách giúp bé thích nghi từng bước.',
        'Thông tin học phí, học thử và tham quan đi ra từ cùng một hành trình.',
      ],
    },
    stats: [
      { value: 'MN', label: 'Điểm chạm local SEO mạnh cho nhóm tìm trường mầm non tại Gò Vấp' },
      { value: '2 CTA', label: 'Học thử và tham quan là hai hành động có ý nghĩa nhất' },
      { value: 'Warm lead', label: 'Phù hợp với phụ huynh đang ở giai đoạn cân nhắc gần quyết định' },
      { value: 'Trust-first', label: 'Campus page cần nhiều bằng chứng thực tế hơn lời hứa' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Điều phụ huynh cần thấy',
        title: 'Trang mầm non nên làm rõ những chi tiết nhỏ nhưng quyết định rất nhiều tới cảm giác an tâm.',
        intro: 'Ở giai đoạn đầu đời, phụ huynh thường đánh giá trường bằng cảm giác tin tưởng cụ thể hơn là lời giới thiệu lớn.',
        columns: 2,
        items: [
          {
            title: 'Không gian gần gũi với trẻ nhỏ',
            body: 'Trang nên thể hiện rõ môi trường học, vui chơi và sinh hoạt hằng ngày thay vì chỉ nói về tầm nhìn chung.',
          },
          {
            title: 'Lộ trình thích nghi nhẹ nhàng',
            body: 'Học thử, tham quan và tư vấn cần được nối thành một chuỗi hành động tự nhiên cho phụ huynh.',
          },
          {
            title: 'Giao tiếp rõ ràng với gia đình',
            body: 'Khi trường giao tiếp bình tĩnh, thực dụng và giàu tính người, phụ huynh sẽ dễ tin hơn những câu cam kết quá mạnh.',
          },
          {
            title: 'Thông tin đủ để ra quyết định tiếp theo',
            body: 'Địa chỉ, cấp học, học phí và các bước đầu cần phải đủ rõ để phụ huynh không phải quay lại trang chủ quá nhiều lần.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Liên kết hỗ trợ',
        title: 'Những trang nên đi cùng campus mầm non này.',
        intro: 'Đây là cụm link quan trọng cho cả SEO và chuyển đổi ở giai đoạn phụ huynh đang cân nhắc.',
        items: [
          {
            eyebrow: 'Pillar',
            title: 'Trang Mầm non',
            href: '/mam-non',
            body: 'Giúp phụ huynh nhìn rộng hơn về triết lý, chương trình và cách Việt Anh đồng hành với trẻ nhỏ.',
          },
          {
            eyebrow: 'Action page',
            title: 'Học thử',
            href: '/hoc-thu',
            body: 'Đây là bước hợp lý nhất nếu gia đình còn lo con nhút nhát hoặc chưa biết bé có phù hợp với môi trường mới hay không.',
          },
          {
            eyebrow: 'Money page',
            title: 'Học phí',
            href: '/hoc-phi',
            body: 'Khi đã cảm thấy campus phù hợp, phụ huynh thường muốn nhìn nhanh mức học phí và cách nhận tư vấn chi tiết.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ mầm non',
        title: 'Các câu hỏi ngắn nhưng có sức nặng lớn với phụ huynh ở giai đoạn đầu.',
        intro: 'FAQ nên trả lời đúng điều phụ huynh đang băn khoăn thay vì lặp lại nội dung giới thiệu chung.',
        items: [
          {
            question: 'Nếu bé còn nhút nhát thì nên bắt đầu thế nào?',
            answer: 'Bắt đầu từ tham quan hoặc học thử là hợp lý nhất. Cách tiếp cận nhẹ giúp gia đình quan sát phản ứng của bé trước khi ra quyết định lớn hơn.',
          },
          {
            question: 'Campus page có cần công khai toàn bộ học phí không?',
            answer: 'Không nhất thiết. Campus page nên cho phụ huynh đường đi ngắn sang trang học phí và tư vấn, để thông tin được cá nhân hóa theo đúng nhu cầu.',
          },
          {
            question: 'Phụ huynh nên gọi ngay hay đặt lịch trước?',
            answer: 'Nếu gia đình đã xác định được khu vực và độ tuổi của con, đặt lịch trước sẽ giúp buổi tham quan có giá trị hơn và được chuẩn bị kỹ hơn.',
          },
        ],
      },
    ],
  },
  {
    slug: 'co-so/binh-tan-tinh-lo-10',
    title: 'Cơ Sở Bình Tân Tỉnh Lộ 10 | Trường Việt Anh',
    description:
      'Trang cơ sở Bình Tân Tỉnh Lộ 10 của Trường Việt Anh, giúp phụ huynh ở khu Tây TP.HCM bắt đầu từ local trust, tư vấn và tham quan trường.',
    templateClass: 'Master Campus Profile',
    pageType: 'Campus profile',
    theme: 'brand',
    hero: {
      eyebrow: 'Campus profile',
      title: 'Cơ sở Bình Tân nên cho phụ huynh cảm giác gần gũi, rõ địa phương và đủ chắc chắn để mở một cuộc trao đổi thật.',
      body:
        'Đây là loại campus page rất cần local context: khu vực phục vụ, khoảng cách đưa đón, CTA tham quan và lộ trình học phù hợp để gia đình ra quyết định nhanh hơn.',
      primaryCta: { label: 'Liên hệ tư vấn cơ sở này', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Xem học phí', href: '/hoc-phi' },
      badges: ['Bình Tân', 'Local intent', 'Admissions'],
      asideTitle: 'Giá trị của campus page khu vực',
      asideItems: [
        'Tạo cảm giác trường đang hiện diện thật trong khu vực phụ huynh sống.',
        'Giảm quãng đường giữa nhận biết thương hiệu và quyết định liên hệ.',
        'Giúp local query có điểm hạ cánh rõ ràng thay vì dồn hết vào homepage.',
      ],
    },
    stats: [
      { value: 'Local', label: 'Trang đích cho nhóm phụ huynh khu Tây TP.HCM' },
      { value: '1 bước', label: 'Từ local trust sang tư vấn chỉ nên cách nhau một cú nhấp' },
      { value: 'SEO', label: 'Phù hợp để nuôi cụm truy vấn địa phương' },
      { value: 'Bridge', label: 'Nối sang học phí, tuyển sinh và hub cơ sở' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Điều nên thể hiện',
        title: 'Campus page Bình Tân cần ngắn gọn nhưng phải đúng điều phụ huynh đang cần kiểm tra.',
        intro: 'Khi truy cập từ local search, người dùng thường muốn thấy ngay tính phù hợp về địa điểm và bước liên hệ tiếp theo.',
        columns: 2,
        items: [
          { title: 'Vị trí và khu vực phục vụ', body: 'Nội dung nên nhấn mạnh sự thuận tiện và bối cảnh khu vực mà không phóng đại quá mức.' },
          { title: 'Lộ trình học tập', body: 'Campus page cần nối rõ sang cấp học phù hợp để phụ huynh hiểu con sẽ đi theo hành trình nào.' },
          { title: 'Minh bạch bước tiếp theo', body: 'CTA nên dẫn tới tư vấn, học phí hoặc tham quan tùy theo mức sẵn sàng của gia đình.' },
          { title: 'Bằng chứng thật', body: 'Review, hình ảnh và thông tin liên hệ thật sẽ mạnh hơn nhiều so với các đoạn mô tả hoa mỹ.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Các trang nên đi kèm',
        title: 'Những đường link hỗ trợ quyết định ở giai đoạn đầu.',
        intro: 'Local page nên kéo được người dùng vào cụm tuyển sinh có giá trị cao hơn.',
        items: [
          { eyebrow: 'Hub', title: 'Tổng quan cơ sở', href: '/co-so', body: 'Để phụ huynh so sánh nhanh giữa các khu vực trước khi chốt cơ sở.' },
          { eyebrow: 'Admissions', title: 'Quy trình tuyển sinh', href: '/tuyen-sinh/quy-trinh-tuyen-sinh', body: 'Giúp gia đình hình dung rõ hành trình sau khi đã chọn được campus.' },
          { eyebrow: 'Action', title: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van', body: 'Bước đi phù hợp nhất nếu phụ huynh còn muốn xác nhận thêm về cấp học và thời điểm nhập học.' },
        ],
      },
    ],
  },
  {
    slug: 'tuyen-sinh/quy-trinh-tuyen-sinh',
    title: 'Quy Trình Tuyển Sinh | Trường Việt Anh',
    description:
      'Trang quy trình tuyển sinh của Trường Việt Anh, giúp phụ huynh nhìn rõ các bước từ tư vấn, tham quan, hồ sơ đến thời điểm nhập học.',
    templateClass: 'Admissions Support',
    pageType: 'Process page',
    theme: 'admissions',
    hero: {
      eyebrow: 'Admissions process',
      title: 'Một quy trình tuyển sinh tốt cần giúp phụ huynh biết ngay mình đang ở bước nào và nên làm gì tiếp theo.',
      body:
        'Trang này được viết để giảm ma sát ở giữa funnel: ít mơ hồ hơn, ít vòng lặp hơn và ít cảm giác “phải tự đoán” hơn trong quá trình chuẩn bị hồ sơ cho con.',
      primaryCta: { label: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Xem hồ sơ nhập học', href: '/tuyen-sinh/ho-so-nhap-hoc' },
      badges: ['Admissions', 'Low friction', 'Parent clarity'],
      asideTitle: 'Trang này phục vụ 3 nhu cầu chính',
      asideItems: [
        'Gia đình mới bắt đầu tìm hiểu và cần khung hành trình rõ ràng.',
        'Gia đình đã chọn được cấp học nhưng chưa biết chuẩn bị gì trước.',
        'Gia đình muốn chuyển nhanh sang tư vấn hoặc tham quan trường.',
      ],
    },
    stats: [
      { value: '4 bước', label: 'Từ tìm hiểu ban đầu đến hoàn tất hồ sơ' },
      { value: '2 CTA', label: 'Tư vấn và hồ sơ là hai lối ra quan trọng nhất' },
      { value: 'BOFU', label: 'Trang hỗ trợ quyết định gần chuyển đổi' },
      { value: 'Bridge', label: 'Nối giữa tuyển sinh, học phí và campus' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Quy trình',
        title: 'Bốn bước nên được trình bày thật gọn để phụ huynh không bị quá tải.',
        intro:
          'Trong thực tế, phụ huynh chỉ cần nhìn ra bước hiện tại và bước tiếp theo. Một process page tốt không cần phức tạp hơn mức đó.',
        items: [
          {
            title: 'Bước 1: Xác định cấp học và cơ sở phù hợp',
            body: 'Gia đình có thể bắt đầu từ trang cấp học hoặc trang cơ sở để xem nhanh chương trình, vị trí và định hướng tuyển sinh.',
          },
          {
            title: 'Bước 2: Tư vấn hoặc tham quan trường',
            body: 'Đây là giai đoạn giúp phụ huynh kiểm chứng cảm giác phù hợp, học phí và lịch trình thực tế trước khi chuẩn bị giấy tờ.',
          },
          {
            title: 'Bước 3: Chuẩn bị hồ sơ nhập học',
            body: 'Khi gia đình đã chốt định hướng, danh sách hồ sơ rõ ràng giúp tiết kiệm thời gian và tránh quay lại nhiều lần.',
          },
          {
            title: 'Bước 4: Xác nhận mốc thời gian và nhập học',
            body: 'Lịch tuyển sinh nên cho phụ huynh biết hạn nộp, mốc phản hồi và các thời điểm quan trọng để chủ động hơn.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Các trang đi kèm',
        title: 'Quy trình tuyển sinh cần đi chung với những trang nào.',
        intro:
          'Để process page thực sự hữu ích, phụ huynh phải được dẫn tới đúng tài nguyên tiếp theo thay vì bị cắt ngang hành trình.',
        items: [
          {
            eyebrow: 'Checklist',
            title: 'Hồ sơ nhập học',
            href: '/tuyen-sinh/ho-so-nhap-hoc',
            body: 'Dành cho phụ huynh đã đi qua giai đoạn tìm hiểu và muốn chuẩn bị giấy tờ đúng ngay từ đầu.',
          },
          {
            eyebrow: 'Timeline',
            title: 'Lịch tuyển sinh',
            href: '/tuyen-sinh/lich-tuyen-sinh',
            body: 'Giúp gia đình nhìn nhanh mốc thời gian, đợt tuyển sinh và các bước cần sắp xếp.',
          },
          {
            eyebrow: 'Action',
            title: 'Đăng ký tư vấn',
            href: '/tuyen-sinh/dang-ky-tu-van',
            body: 'Phù hợp khi phụ huynh muốn đi từ đọc thông tin sang một cuộc trao đổi cụ thể hơn.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ tuyển sinh',
        title: 'Ba câu hỏi thường làm phụ huynh chậm quyết định nhất.',
        intro:
          'FAQ ở đây cần bình tĩnh, minh bạch và đủ cụ thể để phụ huynh cảm thấy quy trình nằm trong tầm kiểm soát.',
        items: [
          {
            question: 'Nên đi tham quan trước hay chuẩn bị hồ sơ trước?',
            answer: 'Thông thường, tham quan hoặc tư vấn nên đến trước để gia đình xác nhận sự phù hợp của cơ sở và cấp học rồi mới chuẩn bị hồ sơ theo hướng chắc chắn hơn.',
          },
          {
            question: 'Nếu chưa chắc về cấp học hoặc campus thì sao?',
            answer: 'Đăng ký tư vấn là bước phù hợp nhất. Đội tuyển sinh có thể giúp thu gọn phương án để gia đình không phải tự lọc quá nhiều lựa chọn.',
          },
          {
            question: 'Trang này có thay cho tư vấn cá nhân không?',
            answer: 'Không. Trang này chỉ giúp phụ huynh nhìn rõ hành trình. Tư vấn vẫn là bước cần thiết để chốt thời điểm, hồ sơ và các chi tiết cụ thể.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tuyen-sinh/ho-so-nhap-hoc',
    title: 'Hồ Sơ Nhập Học | Trường Việt Anh',
    description:
      'Trang hồ sơ nhập học của Trường Việt Anh, tổng hợp các nhóm giấy tờ phụ huynh cần chuẩn bị và cách phối hợp với đội tuyển sinh.',
    templateClass: 'Admissions Utility',
    pageType: 'Checklist page',
    theme: 'admissions',
    hero: {
      eyebrow: 'Admissions checklist',
      title: 'Trang hồ sơ nhập học nên giúp phụ huynh chuẩn bị đúng ngay từ lần đầu, thay vì phải bổ sung từng phần một.',
      body:
        'Đây là utility page rất quan trọng ở cuối funnel. Cách tốt nhất là nhóm hồ sơ theo logic dễ kiểm tra, dễ gửi và dễ đối chiếu với đội tuyển sinh.',
      primaryCta: { label: 'Liên hệ đội tuyển sinh', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Xem lịch tuyển sinh', href: '/tuyen-sinh/lich-tuyen-sinh' },
      badges: ['Checklist', 'Admissions utility', 'Final step support'],
      asideTitle: 'Trang này cần mang lại cảm giác',
      asideItems: [
        'Rõ ràng hơn về giấy tờ cần chuẩn bị.',
        'Ít lo sót thông tin hơn.',
        'Dễ biết nên hỏi ai khi cần xác nhận thêm.',
      ],
    },
    stats: [
      { value: 'Utility', label: 'Một trong những trang giảm ma sát mạnh nhất cuối funnel' },
      { value: '2 link', label: 'Nên đi kèm lịch tuyển sinh và tư vấn' },
      { value: 'Checklist', label: 'Nội dung nên ưu tiên tính rõ ràng hơn độ dài' },
      { value: 'Trust', label: 'Minh bạch thủ tục là một phần của brand trust' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Nhóm giấy tờ',
        title: 'Cách trình bày hồ sơ nên theo nhóm dễ kiểm tra, không nên dồn thành một danh sách dài khó nhớ.',
        intro:
          'Trong phiên bản nội dung hoàn chỉnh, mỗi nhóm có thể được cập nhật theo cấp học và năm tuyển sinh. Giai đoạn này, trang cần cho phụ huynh một khung chuẩn để chuẩn bị.',
        columns: 2,
        items: [
          { title: 'Thông tin cá nhân của học sinh', body: 'Các giấy tờ nhận diện cơ bản cần được liệt kê rõ để phụ huynh biết mình cần chuẩn bị bản sao hay bản đối chiếu.' },
          { title: 'Thông tin của phụ huynh', body: 'Nhóm giấy tờ liên quan đến người đại diện và thông tin liên lạc nên được ghi rõ từ đầu để tránh thiếu sót khi nhập học.' },
          { title: 'Hồ sơ học tập trước đó', body: 'Tùy cấp học, gia đình có thể cần chuẩn bị thêm thông tin học tập, kết quả hoặc xác nhận từ trường cũ.' },
          { title: 'Biểu mẫu tuyển sinh của trường', body: 'Trang nên hướng phụ huynh tới đội tuyển sinh để nhận đúng biểu mẫu, đúng phiên bản và đúng mốc thời gian.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Hành động đi kèm',
        title: 'Hai trang luôn nên đi cùng checklist hồ sơ.',
        intro: 'Trang utility tốt là trang giúp phụ huynh tiếp tục công việc của mình ngay sau khi đọc xong.',
        items: [
          {
            eyebrow: 'Timeline',
            title: 'Lịch tuyển sinh',
            href: '/tuyen-sinh/lich-tuyen-sinh',
            body: 'Để đối chiếu giấy tờ với các mốc quan trọng, hạn hoàn tất và thời điểm nhập học.',
          },
          {
            eyebrow: 'Support',
            title: 'Đăng ký tư vấn',
            href: '/tuyen-sinh/dang-ky-tu-van',
            body: 'Khi gia đình cần xác nhận hồ sơ phù hợp với cấp học hoặc trường hợp chuyển cấp cụ thể.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tuyen-sinh/lich-tuyen-sinh',
    title: 'Lịch Tuyển Sinh | Trường Việt Anh',
    description:
      'Trang lịch tuyển sinh của Trường Việt Anh, giúp phụ huynh nhìn nhanh các mốc thời gian quan trọng và sắp xếp kế hoạch theo năm học.',
    templateClass: 'Admissions Timeline',
    pageType: 'Timeline page',
    theme: 'admissions',
    hero: {
      eyebrow: 'Admissions timeline',
      title: 'Lịch tuyển sinh nên được trình bày như một bản đồ thời gian ngắn gọn để phụ huynh chủ động hơn trong việc sắp xếp.',
      body:
        'Trang này cần làm một việc rất rõ: giúp gia đình biết đâu là mốc cần quan tâm, khi nào nên tư vấn, khi nào nên tham quan và khi nào cần hoàn tất hồ sơ.',
      primaryCta: { label: 'Đăng ký tư vấn tuyển sinh', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Xem quy trình tuyển sinh', href: '/tuyen-sinh/quy-trinh-tuyen-sinh' },
      badges: ['Timeline', 'Admissions clarity', 'Planning support'],
      asideTitle: 'Lịch tuyển sinh cần trả lời',
      asideItems: [
        'Năm học đang mở tuyển sinh ở giai đoạn nào?',
        'Gia đình nên đi tham quan và chuẩn bị hồ sơ vào lúc nào?',
        'Những mốc nào cần ưu tiên để tránh bị động?',
      ],
    },
    stats: [
      { value: '4 mốc', label: 'Nhận biết, tư vấn, hồ sơ và nhập học' },
      { value: '1 trang', label: 'Giúp giảm rất nhiều câu hỏi lặp trong giai đoạn cao điểm' },
      { value: 'Planner', label: 'Hữu ích cho cả phụ huynh lẫn đội tuyển sinh' },
      { value: 'SEO', label: 'Có thể bám intent tìm lịch tuyển sinh theo năm học' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Mốc thời gian',
        title: 'Khung thời gian tuyển sinh nên được đọc trong chưa đến hai phút.',
        intro:
          'Giai đoạn này trang đang đóng vai trò mẫu. Khi vào Directus, các mốc có thể được cập nhật linh hoạt theo năm học và từng chiến dịch.',
        items: [
          { title: 'Giai đoạn 1: Tìm hiểu và định hướng', body: 'Phụ huynh nên bắt đầu từ cấp học, cơ sở và một cuộc tư vấn ngắn để xác định hướng đi phù hợp.' },
          { title: 'Giai đoạn 2: Tham quan hoặc học thử', body: 'Đây là giai đoạn quan trọng để chuyển từ cảm nhận online sang trải nghiệm thực tế tại trường.' },
          { title: 'Giai đoạn 3: Chuẩn bị và nộp hồ sơ', body: 'Gia đình cần bám checklist hồ sơ và các mốc do đội tuyển sinh hướng dẫn.' },
          { title: 'Giai đoạn 4: Xác nhận nhập học', body: 'Hoàn tất các bước cuối theo lịch trình đã thống nhất để tránh vội vàng sát ngày.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Trang liên quan',
        title: 'Lịch tuyển sinh chỉ thật sự hữu ích khi đi cùng các trang hỗ trợ đúng bước.',
        intro:
          'Người xem timeline thường đang sẵn sàng hơn mức đọc tin tức thông thường, nên đường ra khỏi trang phải rõ và ít hơn.',
        items: [
          { eyebrow: 'Process', title: 'Quy trình tuyển sinh', href: '/tuyen-sinh/quy-trinh-tuyen-sinh', body: 'Giúp phụ huynh đối chiếu timeline với từng bước hành động cụ thể.' },
          { eyebrow: 'Checklist', title: 'Hồ sơ nhập học', href: '/tuyen-sinh/ho-so-nhap-hoc', body: 'Dùng khi gia đình muốn chuẩn bị trước để không bị cập rập về sau.' },
          { eyebrow: 'Action', title: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van', body: 'Phù hợp khi phụ huynh cần xác nhận mốc phù hợp với tình huống cụ thể của con.' },
        ],
      },
    ],
  },
  {
    slug: 'tuyen-sinh/dang-ky-tu-van',
    title: 'Đăng Ký Tư Vấn | Trường Việt Anh',
    description:
      'Trang đăng ký tư vấn của Trường Việt Anh, giúp phụ huynh để lại nhu cầu theo cấp học, cơ sở quan tâm và bước tiếp theo phù hợp.',
    templateClass: 'Consultation Page',
    pageType: 'Lead capture',
    theme: 'admissions',
    hero: {
      eyebrow: 'Lead capture',
      title: 'Khi phụ huynh còn đang cân nhắc giữa cấp học, cơ sở và học phí, tư vấn là cách đi nhanh và nhẹ nhàng nhất.',
      body:
        'Trang này cần ngắn, rõ, lịch sự và thực dụng. Mục tiêu không phải ép chốt ngay, mà là thu gọn lựa chọn để gia đình có một cuộc trao đổi đáng giá với đội tuyển sinh.',
      primaryCta: { label: 'Gọi ngay 0916 961 409', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Nhắn Zalo tư vấn', href: contactLinks.zaloHref },
      badges: ['Lead capture', 'Admissions', 'Warm intent'],
      asideTitle: 'Tư vấn đặc biệt hữu ích khi',
      asideItems: [
        'Gia đình chưa chắc nên bắt đầu từ cấp học nào.',
        'Phụ huynh đang so sánh giữa nhiều cơ sở.',
        'Gia đình muốn hỏi nhanh về học phí, học thử hoặc hồ sơ.',
      ],
    },
    stats: [
      { value: '1 cuộc gọi', label: 'Có thể rút ngắn nhiều ngày tự tìm hiểu rời rạc' },
      { value: '4 nhóm hỏi', label: 'Cấp học, cơ sở, học phí và quy trình' },
      { value: 'BOFU', label: 'Trang hỗ trợ chuyển đổi gần hành động' },
      { value: 'CRM-ready', label: 'Phù hợp để nối sang form hoặc workflow ở giai đoạn sau' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Tư vấn cho ai',
        title: 'Những trường hợp nên được dẫn thẳng tới trang tư vấn thay vì tiếp tục đọc thêm.',
        intro: 'Nếu phụ huynh thuộc một trong các nhóm dưới đây, tư vấn thường là bước tiết kiệm thời gian nhất.',
        columns: 2,
        items: [
          { title: 'Gia đình muốn so nhanh nhiều lựa chọn', body: 'Thay vì tự đối chiếu giữa nhiều cấp học, cơ sở và mốc tuyển sinh, một cuộc tư vấn ngắn có thể thu hẹp lựa chọn rõ rệt.' },
          { title: 'Gia đình đã quan tâm học phí', body: 'Khi học phí bắt đầu trở thành câu hỏi chính, tư vấn giúp đặt nó trong đúng bối cảnh về cấp học, campus và dịch vụ.' },
          { title: 'Gia đình muốn lên lịch tham quan', body: 'Đây là nơi phù hợp để chuyển từ nhu cầu online sang lịch hẹn cụ thể với campus hoặc đội tuyển sinh.' },
          { title: 'Gia đình cần xác nhận hồ sơ', body: 'Một số trường hợp cần xác nhận hồ sơ theo cấp học hoặc chuyển trường; tư vấn là điểm vào tự nhiên nhất.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Các đường đi phù hợp',
        title: 'Nếu phụ huynh chưa muốn gọi ngay, đây là ba trang nên xem tiếp.',
        intro:
          'Consultation page tốt không giữ người dùng lại bằng mọi giá, mà giúp họ đi đúng bước tiếp theo.',
        items: [
          {
            eyebrow: 'Visit',
            title: 'Tham quan trường',
            href: '/tuyen-sinh/tham-quan-truong',
            body: 'Dành cho phụ huynh muốn nhìn campus thật và kiểm chứng cảm giác phù hợp trước khi bàn sâu hơn.',
          },
          {
            eyebrow: 'Money page',
            title: 'Học phí',
            href: '/hoc-phi',
            body: 'Giúp gia đình nhìn nhanh khung học phí trước khi mở cuộc trao đổi chi tiết hơn.',
          },
          {
            eyebrow: 'Process',
            title: 'Quy trình tuyển sinh',
            href: '/tuyen-sinh/quy-trinh-tuyen-sinh',
            body: 'Phù hợp với phụ huynh muốn có cái nhìn tổng thể trước khi để lại thông tin.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ tư vấn',
        title: 'Ba câu hỏi thường khiến phụ huynh chần chừ trước khi bấm liên hệ.',
        intro: 'Trả lời đúng những băn khoăn này thường giúp consultation page chuyển đổi tốt hơn rất nhiều.',
        items: [
          {
            question: 'Nếu tôi chưa biết chọn cơ sở nào thì có nên đăng ký tư vấn không?',
            answer: 'Có. Đây chính là một trong những lý do quan trọng nhất để tư vấn: đội tuyển sinh giúp đối chiếu nhu cầu gia đình với cơ sở và cấp học phù hợp hơn.',
          },
          {
            question: 'Trang này có cần form dài không?',
            answer: 'Không. Với intent hiện tại, trang chỉ cần đủ ngắn để mở cuộc trao đổi. Những trường dữ liệu chi tiết có thể được bổ sung sau trong CRM.',
          },
          {
            question: 'Nếu tôi muốn xem trường trước thì sao?',
            answer: 'Khi phụ huynh đã nghiêng về một khu vực hoặc một cơ sở cụ thể, tham quan trường có thể là bước tiếp theo tốt hơn so với tư vấn qua điện thoại.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hoc-thu',
    title: 'Học Thử | Trường Việt Anh',
    description:
      'Trang học thử của Trường Việt Anh, giúp phụ huynh bắt đầu từ một bước nhẹ nhàng để quan sát mức độ phù hợp, sự thích nghi và trải nghiệm thật của con.',
    templateClass: 'Trial Class Landing',
    pageType: 'Trial booking',
    theme: 'admissions',
    hero: {
      eyebrow: 'Trial class',
      title: 'Khi còn băn khoăn về sự hòa nhập, học thử là một bước rất nhẹ nhưng lại tạo ra niềm tin rất mạnh.',
      body:
        'Trang này nên chạm đúng nỗi lo thật của phụ huynh: con có hợp không, có nhút nhát không, có theo được nhịp học không và gia đình nên quan sát điều gì trong buổi trải nghiệm đầu tiên.',
      primaryCta: { label: 'Đăng ký tư vấn học thử', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Đặt lịch tham quan trước', href: '/tuyen-sinh/tham-quan-truong' },
      badges: ['Trial class', 'Objection handling', 'Warm conversion'],
      asideTitle: 'Học thử đặc biệt phù hợp khi',
      asideItems: [
        'Phụ huynh còn lo con nhút nhát hoặc khó thích nghi.',
        'Gia đình muốn nhìn phản ứng thật của con trong môi trường mới.',
        'Campus đã tạo thiện cảm nhưng quyết định cuối cùng vẫn cần thêm một bước nhẹ.',
      ],
    },
    stats: [
      { value: '1 buổi', label: 'Có thể giúp gia đình ra quyết định tự tin hơn nhiều so với chỉ đọc mô tả' },
      { value: 'Warm lead', label: 'Nhóm phụ huynh này thường đã ở khá gần bước quyết định' },
      { value: 'Pain-point', label: 'Trang phục vụ rất rõ cho nỗi lo về hòa nhập' },
      { value: 'Bridge', label: 'Nối tốt sang campus, học phí và tư vấn' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Học thử theo nhu cầu',
        title: 'Những tình huống mà học thử có thể giải quyết rất tốt.',
        intro:
          'Học thử không phải để kéo dài quyết định. Nó là bước giúp gia đình xác minh cảm giác phù hợp một cách nhẹ nhàng và thực tế.',
        columns: 2,
        items: [
          { title: 'Con còn nhút nhát', body: 'Buổi trải nghiệm giúp phụ huynh quan sát cách đội ngũ đón trẻ và cách con phản ứng với môi trường mới.' },
          { title: 'Gia đình đang so sánh hai lựa chọn', body: 'Học thử giúp chuyển cuộc so sánh từ lý thuyết sang trải nghiệm thật, từ đó ra quyết định chắc hơn.' },
          { title: 'Phụ huynh muốn xem nề nếp lớp học', body: 'Thay vì chỉ nghe giới thiệu, gia đình có thể nhìn trực tiếp nhịp học, cách tương tác và năng lượng của lớp.' },
          { title: 'Cần nối sang tuyển sinh chính thức', body: 'Sau buổi trải nghiệm, phụ huynh thường dễ đi tiếp sang tư vấn, học phí và hồ sơ hơn rất nhiều.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Các trang nên đi cùng',
        title: 'Học thử mạnh nhất khi được nối đúng với campus và tuyển sinh.',
        intro: 'Đây là cụm internal links giúp trang học thử vừa có ích cho phụ huynh vừa rõ vai trò trong toàn site.',
        items: [
          { eyebrow: 'Campus', title: 'Tổng quan cơ sở', href: '/co-so', body: 'Giúp phụ huynh chọn campus phù hợp trước khi chốt trải nghiệm cho con.' },
          { eyebrow: 'Visit', title: 'Tham quan trường', href: '/tuyen-sinh/tham-quan-truong', body: 'Nếu gia đình vẫn cần nhìn không gian trước, đây là bước chuẩn bị rất hợp lý.' },
          { eyebrow: 'Consultation', title: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van', body: 'Phù hợp khi phụ huynh muốn nhờ đội tuyển sinh định hướng luôn cấp học và cơ sở phù hợp.' },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ học thử',
        title: 'Ba câu hỏi nên trả lời thật bình tĩnh và rõ ràng.',
        intro: 'Đây là những băn khoăn xuất hiện rất thường xuyên ở nhóm phụ huynh gần quyết định.',
        items: [
          {
            question: 'Có nên học thử trước khi đi tham quan không?',
            answer: 'Nếu gia đình đã xác định khá rõ cơ sở và cấp học, học thử có thể diễn ra rất sớm. Nếu còn muốn nhìn campus trước, tham quan là bước chuẩn bị tốt hơn.',
          },
          {
            question: 'Học thử có giúp biết con có phù hợp hay không không?',
            answer: 'Một buổi trải nghiệm không thay thế toàn bộ hành trình nhập học, nhưng nó giúp phụ huynh quan sát rất rõ phản ứng ban đầu, mức độ thoải mái và cách con tương tác với môi trường.',
          },
          {
            question: 'Sau học thử thì nên đi tiếp như thế nào?',
            answer: 'Gia đình nên đi tiếp sang tư vấn, học phí hoặc hồ sơ tùy theo mức độ sẵn sàng. Quan trọng là luôn có một bước tiếp theo rõ ràng ngay sau trải nghiệm.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hoc-bong',
    title: 'Học Bổng & Ưu Đãi | Trường Việt Anh',
    description:
      'Trang học bổng và ưu đãi của Trường Việt Anh, giúp phụ huynh nhìn nhanh các hướng hỗ trợ chi phí và lý do nên liên hệ để được tư vấn theo trường hợp cụ thể.',
    templateClass: 'Offer Page',
    pageType: 'Scholarship page',
    theme: 'tuition',
    hero: {
      eyebrow: 'Offer page',
      title: 'Học bổng và ưu đãi nên được trình bày như một công cụ giảm ma sát, không phải một lớp quảng cáo quá tay.',
      body:
        'Trang này có nhiệm vụ rất rõ: cho phụ huynh biết Việt Anh có những hướng hỗ trợ nào về chi phí, những trường hợp nào nên hỏi kỹ hơn và bước tiếp theo cần làm để nhận tư vấn phù hợp.',
      primaryCta: { label: 'Nhận tư vấn học bổng', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Xem học phí', href: '/hoc-phi' },
      badges: ['Offer page', 'Friction reducer', 'Commercial support'],
      asideTitle: 'Trang này nên giữ đúng tinh thần thương hiệu',
      asideItems: [
        'Minh bạch nhưng không giật gân.',
        'Giảm áp lực tài chính nhưng không làm rẻ thương hiệu.',
        'Dẫn rõ sang tư vấn thay vì treo nhiều lời hứa mơ hồ.',
      ],
    },
    stats: [
      { value: '3 nhóm', label: 'Học bổng, ưu đãi sớm và hỗ trợ theo gia đình' },
      { value: 'BOFU', label: 'Rất gần ý định chuyển đổi về tư vấn hoặc nhập học' },
      { value: 'Value-led', label: 'Nội dung phải đặt học phí trong bối cảnh giá trị thật' },
      { value: 'Bridge', label: 'Nối giữa học phí, tuyển sinh và campus' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Nhóm ưu đãi',
        title: 'Ba hướng nội dung nên xuất hiện rõ trên trang học bổng.',
        intro:
          'Ở giai đoạn triển khai đầu, trang nên đóng vai trò định hướng và gom lead chất lượng, chưa cần trở thành kho thông tin quá chi tiết.',
        columns: 3,
        items: [
          { title: 'Ưu đãi nhập học sớm', body: 'Phù hợp với nhóm phụ huynh đã khá chắc về quyết định và chỉ còn cần một cú hích nhẹ để chốt hành động.' },
          { title: 'Chính sách theo năng lực hoặc định hướng tiếng Anh', body: 'Đây là nơi có thể làm rõ hơn những hỗ trợ phù hợp với học sinh có định hướng tiếng Anh nổi bật.' },
          { title: 'Ưu đãi theo gia đình hoặc nhóm đặc thù', body: 'Những chính sách dạng anh chị em hoặc nhóm đối tượng rõ ràng sẽ giúp trang vừa thực dụng vừa có sức gợi mở.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Trang nên xem cùng',
        title: 'Học bổng nên luôn đi cùng học phí và tuyển sinh.',
        intro: 'Nếu tách riêng khỏi hai cụm này, trang dễ trở thành một “offer island” ít giá trị thật cho phụ huynh.',
        items: [
          { eyebrow: 'Money page', title: 'Học phí', href: '/hoc-phi', body: 'Giúp gia đình nhìn khung chi phí tổng thể trước khi bàn về ưu đãi cụ thể.' },
          { eyebrow: 'Admissions', title: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van', body: 'Bước đi hợp lý nhất khi phụ huynh muốn biết trường hợp của mình có phù hợp với chính sách nào hay không.' },
          { eyebrow: 'Process', title: 'Quy trình tuyển sinh', href: '/tuyen-sinh/quy-trinh-tuyen-sinh', body: 'Giúp đặt câu chuyện học bổng đúng vào hành trình tuyển sinh tổng thể, không bị tách rời.' },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ học bổng',
        title: 'Ba câu hỏi nên xuất hiện để giữ sự minh bạch.',
        intro: 'Với trang offer, minh bạch sẽ tạo niềm tin mạnh hơn rất nhiều so với sự phô trương.',
        items: [
          {
            question: 'Trang này có cần công bố tất cả mức ưu đãi không?',
            answer: 'Không nhất thiết. Điều quan trọng hơn là giúp phụ huynh hiểu có những nhóm chính sách nào và khi nào nên liên hệ để được tư vấn theo trường hợp cụ thể.',
          },
          {
            question: 'Học bổng nên gắn với giá trị nào?',
            answer: 'Học bổng nên được đặt trong bối cảnh chương trình, đầu ra, định hướng tiếng Anh và mức độ phù hợp với học sinh, không nên tách rời thành một thông điệp giảm giá đơn thuần.',
          },
          {
            question: 'Sau khi xem học bổng, nên làm gì tiếp?',
            answer: 'Bước tốt nhất thường là xem học phí tổng quan rồi đăng ký tư vấn để đội tuyển sinh hỗ trợ theo đúng cấp học, cơ sở và thời điểm nhập học.',
          },
        ],
      },
    ],
  },
  {
    slug: 'lien-he',
    title: 'Liên Hệ Trường Việt Anh',
    description:
      'Trang liên hệ của Trường Việt Anh, tổng hợp các kênh tư vấn, đường dẫn tuyển sinh và các điểm chạm phù hợp cho phụ huynh đang cần hỗ trợ nhanh.',
    templateClass: 'Contact / Utility Page',
    pageType: 'Contact page',
    theme: 'admissions',
    hero: {
      eyebrow: 'Liên hệ',
      title: 'Khi phụ huynh đã sẵn sàng nói chuyện với nhà trường, trang liên hệ nên thật rõ, thật ngắn và đủ đáng tin.',
      body:
        'Trang này không cần quá nhiều lời giới thiệu. Nó cần gom đúng các kênh liên hệ, chỉ ra bước đi phù hợp và dẫn phụ huynh tới đúng campus hoặc đúng trang tuyển sinh khi cần.',
      primaryCta: { label: 'Gọi 0916 961 409', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Nhắn Zalo', href: contactLinks.zaloHref },
      badges: ['Contact page', 'Utility', 'Support'],
      asideTitle: 'Những lý do phụ huynh thường vào trang này',
      asideItems: [
        'Cần hỏi nhanh về cấp học hoặc học phí.',
        'Muốn đặt lịch tư vấn hoặc tham quan.',
        'Muốn được điều hướng tới campus phù hợp hơn.',
      ],
    },
    stats: [
      { value: '3 kênh', label: 'Điện thoại, Zalo và tư vấn tuyển sinh' },
      { value: '4 campus', label: 'Có thể được nối sang từng cơ sở nếu cần' },
      { value: 'Fast path', label: 'Trang rút ngắn đường đi tới hỗ trợ thật' },
      { value: 'Utility', label: 'Một trang nhỏ nhưng ảnh hưởng lớn đến trải nghiệm' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Kênh liên hệ',
        title: 'Mỗi kênh nên gắn với một nhu cầu rõ để phụ huynh chọn nhanh hơn.',
        intro:
          'Trang liên hệ tốt là trang khiến người dùng không phải suy nghĩ nhiều về việc nên bấm vào đâu tiếp theo.',
        columns: 3,
        items: [
          { title: 'Gọi điện thoại', body: 'Phù hợp khi phụ huynh cần xác nhận thông tin nhanh, hỏi mốc tuyển sinh hoặc chốt bước tiếp theo trong ngày.' },
          { title: 'Nhắn Zalo', body: 'Phù hợp với phụ huynh muốn trao đổi ngắn, gửi thông tin hoặc giữ một kênh liên lạc nhẹ và tiện.' },
          { title: 'Đăng ký tư vấn', body: 'Phù hợp khi gia đình muốn một cuộc trao đổi có cấu trúc hơn về cấp học, cơ sở, học phí và hồ sơ.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Các trang nên đi cùng',
        title: 'Trang liên hệ nên nối sang những điểm nào trong hệ tuyển sinh.',
        intro:
          'Đây là nơi contact page chuyển từ utility sang điều hướng thông minh.',
        items: [
          { eyebrow: 'Admissions', title: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van', body: 'Dành cho phụ huynh cần một cuộc trao đổi rõ hơn về lộ trình phù hợp.' },
          { eyebrow: 'Visit', title: 'Tham quan trường', href: '/tuyen-sinh/tham-quan-truong', body: 'Dành cho gia đình muốn đi từ online sang trải nghiệm thực tế tại campus.' },
          { eyebrow: 'Campus hub', title: 'Xem các cơ sở', href: '/co-so', body: 'Phù hợp khi phụ huynh chưa chắc campus nào là điểm bắt đầu đúng nhất.' },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ liên hệ',
        title: 'Các câu hỏi đơn giản nhưng rất thường gặp trước khi phụ huynh bấm liên hệ.',
        intro:
          'Trang liên hệ càng gọn thì FAQ càng nên thực dụng và ít hơn.',
        items: [
          {
            question: 'Nếu tôi chưa biết rõ cơ sở nào phù hợp thì sao?',
            answer: 'Bạn có thể bắt đầu từ đăng ký tư vấn hoặc xem trang tổng quan cơ sở. Hai hướng này giúp thu gọn lựa chọn nhanh hơn việc tự đọc rời rạc nhiều trang.',
          },
          {
            question: 'Trang liên hệ có thay cho trang tuyển sinh không?',
            answer: 'Không. Trang liên hệ là điểm vào ngắn nhất tới hỗ trợ. Nếu bạn muốn hiểu đầy đủ hành trình, nên xem thêm cụm tuyển sinh và học phí.',
          },
          {
            question: 'Nếu tôi muốn xem trường thật thì nên làm gì?',
            answer: 'Hãy đi thẳng tới trang tham quan trường. Đây là bước phù hợp nhất khi gia đình muốn kiểm chứng campus và trải nghiệm thực tế.',
          },
        ],
      },
    ],
  },
];

export const pages: PageSpec[] = [
  {
    slug: 'gioi-thieu',
    title: 'Giới Thiệu Trường Việt Anh',
    description:
      'Trang giới thiệu cốt lõi của Trường Việt Anh, giải thích sự hình thành, lời hứa thương hiệu và cách trường xây một hành trình học tập có tính người.',
    templateClass: 'Pure Page / Brand Core',
    pageType: 'Brand trust page',
    theme: 'brand',
    hero: {
      eyebrow: 'Brand Core Page',
      title: 'Một hệ thống trường học được xây để giúp trẻ vui vẻ, tự chủ và học tốt thật sự.',
      body:
        'Trang này đóng vai trò trang cốt lõi của brand: giải thích vì sao Trường Việt Anh tồn tại, cách trường kết hợp kỷ luật, tiếng Anh và môi trường nhân văn để giúp phụ huynh có thêm niềm tin trước khi vào giai đoạn so sánh học phí.',
      primaryCta: { label: 'Xem lộ trình tuyển sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Tham khảo học phí', href: '/hoc-phi' },
      badges: ['Brand trust', 'SEO authority', 'Admissions support'],
      asideTitle: 'Trang này cần trả lời 4 câu hỏi',
      asideItems: [
        'Trường Việt Anh khác gì so với một website giáo dục chỉ nói về thành tích?',
        'Việt Anh tin vào triết lý nào khi giáo dục trẻ?',
        'Vì sao phụ huynh nên xem tiếp các trang cấp học và admissions?',
        'CTA chính là đưa phụ huynh sang Tuyển Sinh và Học Phí, không ép form quá sớm.',
      ],
    },
    stats: [
      { value: '2011', label: 'Năm bắt đầu hành trình giáo dục' },
      { value: 'Liên cấp', label: 'Hệ thống từ mầm non đến THPT' },
      { value: 'PDR', label: 'Phương pháp Plan - Do - Review xuyên suốt' },
      { value: 'Song ngữ', label: 'Tiếng Anh được dạy như một năng lực sống' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Nền tảng thương hiệu',
        title: 'Ba lớp giá trị giúp trang giới thiệu này không bị “nói cho hay”.',
        intro:
          'Nó không chỉ kể lại lịch sử. Nó cần cho thấy Việt Anh được tổ chức để tạo ra một môi trường học tập rõ mục tiêu và để phụ huynh hiểu bước tiếp theo là gì.',
        columns: 3,
        items: [
          {
            title: 'Nhà trường là một hệ thống, không phải một tập hợp phòng học',
            body:
              'Mỗi cấp học, mỗi trang cấp học và mỗi trang tuyển sinh đều được nối với nhau bằng một hệ thống CTA và nội dung thống nhất.',
          },
          {
            title: 'Tính người đi trước, học thuật đi kèm',
            body:
              'Thông điệp cốt lõi của Việt Anh là trẻ chỉ có thể học tốt lâu dài khi thấy an toàn, được tôn trọng và được hướng dẫn cách tự học.',
          },
          {
            title: 'Trang này đóng vai trò neo trust',
            body:
              'Đây là page để phụ huynh dừng lại, đọc kỹ, rồi mới chuyển sang pages có intent mạnh hơn như học phí và admissions.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Brand Story',
        title: 'Lịch sử được kể theo logic mà phụ huynh thực sự quan tâm.',
        intro:
          'Không cần quá nhiều timeline vụ vơ. Cần 3 lớp thông tin: vì sao mở trường, cách vận hành và điều gì khiến phụ huynh yên tâm giao con.',
        items: [
          {
            title: 'Bắt đầu từ nhu cầu giáo dục thật',
            body:
              'Việt Anh được hình thành để giải một bài toán rất đời thường: phụ huynh cần một nơi vừa có nền nếp, vừa có tiếng Anh, vừa không biến tuổi thơ thành cuộc đua điểm số.',
          },
          {
            title: 'Mở rộng thành hệ thống liên cấp',
            body:
              'Khi hành trình của trẻ được nhìn dài hạn từ mầm non đến THPT, nhà trường có thể xây dựng một lộ trình thông suốt thay vì mỗi cấp học là một thế giới tách rời.',
          },
          {
            title: 'Đồng bộ thương hiệu với vận hành',
            body:
              'Không chỉ là khẩu hiệu. PDR, tiếng Anh, đánh giá sự tiến bộ và cách giao tiếp với phụ huynh đều được triển khai như một hệ thống.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Route phụ huynh',
        title: 'Sau khi đọc trang giới thiệu, phụ huynh nên đi tiếp đâu?',
        intro:
          'Đây là phần internal linking bắt buộc để trang thương hiệu này hỗ trợ conversion thay vì dừng ở giai đoạn “đọc cho biết”.',
        items: [
          {
            eyebrow: 'Authority',
            title: 'Triết Lý Giáo Dục',
            href: '/triet-ly-giao-duc',
            body: 'Nếu phụ huynh cần hiểu sâu hơn về cách Việt Anh nhìn trẻ, đây là trang tiếp theo nên đọc.',
          },
          {
            eyebrow: 'Signature',
            title: 'Hệ Thống PDR',
            href: '/he-thong-pdr',
            body: 'Trang signature asset cho thấy cách nhà trường biến triết lý thành thói quen học tập và tự chủ.',
          },
          {
            eyebrow: 'Conversion',
            title: 'Tuyển Sinh',
            href: '/tuyen-sinh',
            body: 'Khi phụ huynh đã sẵn sàng hành động, admissions hub sẽ giải thích quy trình và các bước cần thực hiện.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ thường gặp',
        title: 'Những câu hỏi mà trang giới thiệu cần giải toả.',
        intro:
          'Bộ FAQ này giúp trang brand trả lời những thắc mắc đầu tiên trước khi user sang trang cấp học chi tiết.',
        items: [
          {
            question: 'Trang giới thiệu khác gì so với homepage?',
            answer:
              'Homepage điều phối traffic. Trang giới thiệu đi sâu hơn vào câu chuyện thương hiệu, cách trường vận hành và sự khác biệt cốt lõi.',
          },
          {
            question: 'Vì sao nên đọc tiếp hệ thống PDR?',
            answer:
              'Vì PDR là page signature mô tả cách Việt Anh biến “tự học và tự chủ” thành một thói quen có cấu trúc, không chỉ là thông điệp marketing.',
          },
          {
            question: 'Nếu phụ huynh muốn biết học phí ngay thì sao?',
            answer:
              'Trang học phí được đặt sẵn để giảm friction. Ở đây chỉ cần đưa sang /hoc-phi đúng lúc, không cần ép user điền form quá sớm.',
          },
        ],
      },
    ],
  },
  {
    slug: 'triet-ly-giao-duc',
    title: 'Triết Lý Giáo Dục Trường Việt Anh',
    description:
      'Trang triết lý giáo dục giải thích cách Trường Việt Anh kết hợp hạnh phúc, kỷ luật và tính thực dụng để trẻ học tốt một cách bền vững.',
    templateClass: 'Pure Page / Thought Leadership',
    pageType: 'Authority narrative page',
    theme: 'brand',
    hero: {
      eyebrow: 'Thought Leadership Page',
      title: 'Một đứa trẻ hạnh phúc sẽ học tốt hơn, nhưng hạnh phúc ở đây không phải sự dễ dãi.',
      body:
        'Trang này được viết để làm rõ tinh thần “vui vẻ và thực dụng”: trẻ được tôn trọng, có kỷ luật, biết lập kế hoạch và có một lộ trình tiến bộ rõ ràng. Đây là lớp nội dung nuôi trust trước khi phụ huynh so sánh học phí hay đối chiếu với trường khác.',
      primaryCta: { label: 'Khám phá hệ thống PDR', href: '/he-thong-pdr' },
      secondaryCta: { label: 'Xem các cấp học', href: '/mam-non' },
      badges: ['Brand depth', 'E-E-A-T support', 'Assisted conversion'],
      asideTitle: 'Tinh thần cần giữ xuyên suốt',
      asideItems: [
        'Không bán trực tiếp quá mạnh trên page này.',
        'Nó phải tăng trust và chuẩn bị cho giai đoạn so sánh.',
        'Nó phải link sang pillars và PDR để user đi sâu hơn.',
        'Giọng điệu cần ấm, rõ, tự tin và không khoa trương.',
      ],
    },
    stats: [
      { value: 'Vui vẻ', label: 'Trẻ cần một môi trường tích cực để mở lòng và học thật' },
      { value: 'Thực dụng', label: 'Mọi hoạt động đều phải hướng đến năng lực sống và học tập cụ thể' },
      { value: 'Trách nhiệm', label: 'Trách nhiệm được dạy như một kỹ năng, không phải sự áp đặt' },
      { value: 'Đồng hành', label: 'Gia đình và nhà trường cùng nhau tạo rhythm tiến bộ' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Cốt lõi triết lý',
        title: 'Bốn ý lớn mà trang này cần làm rõ.',
        intro:
          'Nếu chỉ nói “lấy học sinh làm trung tâm” thì quá chung. Việt Anh cần diễn giải bằng logic mà phụ huynh có thể cảm thấy trong đời sống học tập mỗi ngày.',
        columns: 2,
        items: [
          {
            title: 'Hạnh phúc để mở cửa học tập',
            body:
              'Trẻ học tốt hơn khi được tôn trọng, được nghe, được sai và được hướng dẫn cách sửa. Hạnh phúc là điều kiện để trẻ sẵn sàng học, không phải phần thưởng sau cùng.',
          },
          {
            title: 'Tính thực dụng trong giáo dục',
            body:
              'Kiến thức cần được biến thành khả năng lập kế hoạch, hợp tác, giao tiếp, tự đánh giá và sử dụng ngôn ngữ để giải quyết tình huống thật.',
          },
          {
            title: 'Trách nhiệm nhân văn',
            body:
              'Trách nhiệm không đồng nghĩa với áp lực. Trẻ cần được hướng dẫn cách xây thói quen và chịu trách nhiệm với kế hoạch của mình.',
          },
          {
            title: 'Tiếng Anh là năng lực sống',
            body:
              'Tiếng Anh không chỉ là một môn học để thi, mà là một công cụ để trẻ tìm hiểu thế giới và tự tin trong giao tiếp.',
          },
        ],
      },
      {
        type: 'quote',
        eyebrow: 'Thương hiệu cần một câu neo',
        title: 'Trang này cần có một “brand sentence” để người đọc nhớ.',
        quote:
          'Chúng tôi không chọn cách dạy nhanh hơn. Chúng tôi chọn cách dạy sao cho trẻ biết mình đang học vì điều gì, tiến bộ thế nào và có thể dùng kiến thức vào cuộc sống ra sao.',
        attribution: 'Editorial note cho voice của Trường Việt Anh',
      },
      {
        type: 'links',
        eyebrow: 'Nối sang nội dung sâu hơn',
        title: 'Ba hướng đi tiếp theo từ triết lý giáo dục.',
        intro:
          'Nếu triết lý đã được đồng ý, user cần có đường đi sang pages “xác minh” triết lý đó bằng hệ thống, cấp học và hành động.',
        items: [
          {
            eyebrow: 'Signature system',
            title: 'Hệ Thống PDR',
            href: '/he-thong-pdr',
            body: 'Trang cho thấy triết lý được biến thành quy trình học tập lặp đi lặp lại như thế nào.',
          },
          {
            eyebrow: 'Pillar',
            title: 'Mầm Non',
            href: '/mam-non',
            body: 'Xem triết lý được triển khai ra sao trong giai đoạn đầu đời, nơi phụ huynh thường có nhiều lo lắng nhất.',
          },
          {
            eyebrow: 'Admissions',
            title: 'Tuyển Sinh',
            href: '/tuyen-sinh',
            body: 'Khi phụ huynh muốn tiếp tục đi sâu vào quy trình và hành động, admissions hub là điểm chuyển hợp lý nhất.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ triết lý',
        title: 'Ba lo lắng thường gặp của phụ huynh khi nghe về “giáo dục hạnh phúc”.',
        intro:
          'Mục này được viết để tránh hiểu nhầm rằng hạnh phúc đồng nghĩa với dễ dãi hay giảm kỷ luật.',
        items: [
          {
            question: 'Giáo dục hạnh phúc có làm giảm kỷ luật không?',
            answer:
              'Không. Việt Anh xem kỷ luật là một phần của năng lực tự chủ. Trẻ được dạy cách lập kế hoạch, hoàn thành và tự đánh giá kết quả.',
          },
          {
            question: 'Tính thực dụng có làm mất đi chiều sâu học thuật không?',
            answer:
              'Ngược lại, nó giúp học thuật có ý nghĩa hơn. Kiến thức được nối với hành động, bài tập được nối với kỹ năng sống và tư duy.',
          },
          {
            question: 'Phụ huynh nên đọc tiếp trang nào nếu muốn biết cách làm cụ thể?',
            answer:
              'Trang Hệ Thống PDR và các pillar page sẽ cho thấy triết lý đó được triển khai ở từng cấp học một cách cụ thể ra sao.',
          },
        ],
      },
    ],
  },
  {
    slug: 'he-thong-pdr',
    title: 'Hệ Thống PDR Tại Trường Việt Anh',
    description:
      'Trang signature asset mô tả cách Trường Việt Anh vận hành Plan - Do - Review để tạo năng lực tự học, tự chủ và khả năng phản tư cho học sinh.',
    templateClass: 'Authority Page / Signature System',
    pageType: 'Moat page',
    theme: 'brand',
    hero: {
      eyebrow: 'Signature Asset Page',
      title: 'PDR là cách Việt Anh biến mục tiêu học tập thành một nhịp điệu rõ ràng mỗi ngày.',
      body:
        'PDR không phải một khẩu hiệu đẹp. Đó là một hệ thống giúp học sinh lập kế hoạch, thực hiện, rồi tự nhìn lại và cải tiến. Trang này phải đóng vai trò “moat page”: ai đọc xong cũng hiểu vì sao Việt Anh khác biệt.',
      primaryCta: { label: 'Xem cấp học áp dụng PDR', href: '/mam-non' },
      secondaryCta: { label: 'Trao đổi với tuyển sinh', href: '/tuyen-sinh' },
      badges: ['Signature asset', 'Trust moat', 'Internal link hub'],
      asideTitle: '3 điều page này phải làm được',
      asideItems: [
        'Định nghĩa PDR bằng ngôn ngữ dễ hiểu với phụ huynh, không quá học thuật.',
        'Cho thấy PDR được áp dụng ở từng cấp học, không chỉ tồn tại trên slide.',
        'Liên kết PDR với lợi ích cụ thể: tự chủ, phản tư, giao tiếp, trách nhiệm.',
      ],
    },
    stats: [
      { value: 'Plan', label: 'Học sinh biết mình sẽ làm gì và vì sao' },
      { value: 'Do', label: 'Học sinh tập thực hiện với mục tiêu và timebox rõ ràng' },
      { value: 'Review', label: 'Học sinh tự nhìn lại để rút kinh nghiệm và cải tiến' },
      { value: 'Lặp lại', label: 'Tiến bộ đến từ nhịp điệu, không đến từ cảm hứng ngẫu nhiên' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Plan - Do - Review',
        title: 'Ba bước nghe đơn giản, nhưng là cốt sống của năng lực tự học.',
        intro:
          'Trang này nên viết như một trang “giải thích hệ thống” thay vì một bài PR. Mỗi bước cần nói được hành vi cụ thể mà học sinh sẽ làm.',
        items: [
          {
            title: 'Plan',
            body:
              'Học sinh học cách đặt mục tiêu, chia nhớ công việc, dự kiến khó khăn và biết mình cần hỗ trợ gì. Đây là bước giúp trẻ thoát khỏi học vô định.',
          },
          {
            title: 'Do',
            body:
              'Trẻ thực hiện kế hoạch trong một rhythm rõ ràng: vào việc, hoàn thành, giao tiếp với thầy cô và hợp tác với bạn bè.',
          },
          {
            title: 'Review',
            body:
              'Sau mỗi chu kỳ, học sinh nhìn lại kết quả, nhận biết điểm tốt, điểm cần sửa và cái gì sẽ thay đổi ở lần tiếp theo.',
          },
        ],
      },
      {
        type: 'cards',
        eyebrow: 'PDR theo cấp học',
        title: 'Cũng là PDR, nhưng mô hình thể hiện sẽ thay đổi theo độ tuổi.',
        intro:
          'Mục này vừa làm rõ hệ thống, vừa tạo internal links rất tự nhiên sang 4 pillar pages.',
        columns: 2,
        items: [
          {
            title: 'Mầm Non',
            body:
              'PDR được thể hiện qua những việc rất nhỏ: bé biết chuẩn bị, hoàn thành, sắp xếp và chia sẻ lại những gì mình đã làm.',
            href: '/mam-non',
            cta: 'Xem pillar Mầm Non',
          },
          {
            title: 'Tiểu Học',
            body:
              'Học sinh tập lập kế hoạch học tập có hướng dẫn, theo dõi tiến độ và phản hồi với bài tập, dự án, thói quen học.',
            href: '/tieu-hoc',
            cta: 'Xem pillar Tiểu Học',
          },
          {
            title: 'Trung Học Cơ Sở',
            body:
              'THCS là giai đoạn PDR tăng độ khó: học sinh cần tự quản lý bài tập, group work, thuyết trình và trách nhiệm cá nhân.',
            href: '/trung-hoc-co-so',
            cta: 'Xem pillar THCS',
          },
          {
            title: 'Trung Học Phổ Thông',
            body:
              'THPT dùng PDR để nói mục tiêu học tập với IELTS, portfolio, định hướng đại học và khả năng tự học bền vững.',
            href: '/trung-hoc-pho-thong',
            cta: 'Xem pillar THPT',
          },
        ],
      },
      {
        type: 'quote',
        eyebrow: 'Proof angle',
        title: 'PDR cần được đọc như một lời giải cho “vì sao con cần tự chủ”.',
        quote:
          'Nếu một học sinh chỉ làm khi có người nhắc, em ấy đang học được kiến thức nhưng chưa xây được năng lực. PDR được thiết kế để biến việc học thành một quá trình có ý thức và có khả năng tự điều chỉnh.',
        attribution: 'Trang signature asset của Trường Việt Anh',
      },
      {
        type: 'faq',
        eyebrow: 'FAQ PDR',
        title: 'FAQ ngắn để phụ huynh không bị “nghet” bởi thuật ngữ.',
        intro:
          'Trang này cần rất dễ hiểu. FAQ dưới đây là phần dịch PDR sang ngôn ngữ đời thường.',
        items: [
          {
            question: 'PDR có phải một môn học riêng không?',
            answer:
              'Không. Đây là hệ thống vận hành cách học. Nó chạy xuyên qua bài tập, dự án, giao tiếp và cách học sinh tự đánh giá tiến bộ.',
          },
          {
            question: 'PDR có giúp trẻ biết tự học thật không?',
            answer:
              'Đó là mục tiêu trung tâm. Khi trẻ biết lập kế hoạch, thực hiện và xem lại, trẻ dần có khả năng tự học bền vững hơn.',
          },
          {
            question: 'Sau khi đọc page này, phụ huynh nên xem tiếp gì?',
            answer:
              'Tốt nhất là sang pillar page của cấp học phù hợp với con để thấy PDR được thiết kế cụ thể ra sao trong từng giai đoạn.',
          },
        ],
      },
    ],
  },
  {
    slug: 'mam-non',
    title: 'Mầm Non Trường Việt Anh',
    description:
      'Pillar page cấp học mầm non của Trường Việt Anh, nhấn mạnh môi trường song ngữ, thích nghi an toàn và phát triển cảm xúc cho bé.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'Mầm non Việt Anh được thiết kế để bé thấy an tâm, vui vẻ và sẵn sàng học từ ngày đầu.',
      body:
        'Trang pillar này có vai trò bắt keyword cấp học, giải thích chương trình và route phụ huynh sang Tuyển Sinh hoặc Học Phí mà không cần dẫn user vào form quá sớm. Nội dung ưu tiên: thích nghi, an toàn, song ngữ và phát triển cảm xúc.',
      primaryCta: { label: 'Bắt đầu từ tuyển sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Xem học phí mầm non', href: '/hoc-phi' },
      badges: ['SEO pillar', 'Parent trust', 'Admissions bridge'],
      asideTitle: 'Intent chính của phụ huynh mầm non',
      asideItems: [
        'Con có hoà nhập được không?',
        'Môi trường có an toàn và có nề nếp không?',
        'Tiếng Anh và giao tiếp được dạy thế nào?',
        'Học phí và quy trình nhập học bắt đầu từ đầu?',
      ],
    },
    stats: [
      { value: '18 tháng+', label: 'Độ tuổi có thể bắt đầu làm quen với môi trường học' },
      { value: 'Song ngữ', label: 'Tiếng Anh được đưa vào nhẹ nhàng, gắn với sinh hoạt' },
      { value: 'Thích nghi', label: 'Chủ đề lớn nhất của giai đoạn đầu đời được đặt lên đầu' },
      { value: 'PDR nhẹ', label: 'Bé tập nhận biết và hoàn thành việc nhỏ mỗi ngày' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Curriculum Highlights',
        title: 'Bốn nhóm giá trị mà phụ huynh mầm non thường tìm kiếm.',
        intro:
          'Pillar mầm non cần nói rõ hơn cả “chương trình hay”. Nó phải trả lời về cảm xúc, an toàn và trải nghiệm song ngữ hàng ngày.',
        columns: 2,
        items: [
          {
            title: 'Thích nghi nhẹ nhàng',
            body:
              'Lớp học và giáo viên được tổ chức để bé chuyển từ sinh hoạt gia đình sang sinh hoạt trường học một cách an toàn và có support.',
          },
          {
            title: 'Phát triển cảm xúc',
            body:
              'Trẻ học cách gọi tên cảm xúc, cho đến lượt, hợp tác và hình thành những nề nếp đầu đời gắn với kiến thức nền tảng.',
          },
          {
            title: 'Tiếng Anh thông qua trải nghiệm',
            body:
              'Tiếng Anh được đưa vào bài hát, trò chơi, giao tiếp và các chủ đề gần gũi để trẻ có phản xạ tự nhiên hơn.',
          },
          {
            title: 'Môi trường có nhịp điệu',
            body:
              'Một ngày của bé được chia rhythm rõ ràng: đón trẻ, học - chơi, ngủ trưa, vận động, review cuối ngày với nhiều tín hiệu quen thuộc.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'A Day in Life',
        title: 'Một ngày ở khối mầm non cần được hình dung thật rõ.',
        intro:
          'Section này đóng vai trò “giảm lo au” cho phụ huynh. Càng cụ thể, pillar càng dễ chuyển đổi sang trang tuyển sinh.',
        items: [
          {
            title: 'Buổi sáng bình tĩnh và có welcome ritual',
            body:
              'Bé được đón trong một không khí quen thuộc, có giao tiếp tay với phụ huynh và giúp bé chuyển mood sang môi trường học.',
          },
          {
            title: 'Các khối hoạt động ngắn, nhiều chuyển động',
            body:
              'Trẻ ở độ tuổi này cần nhiều khoảng nghỉ để học, chơi, nghe, nói và vận động xen kẽ. Một rhythm tốt quan trọng hơn việc nhiều kiến thức.',
          },
          {
            title: 'Review nhẹ để trẻ biết mình đã làm được gì',
            body:
              'Ngày từ mầm non, trẻ đã được tập nhìn lại những việc nhỏ mình đã hoàn thành. Đây là phiên bản rất sớm của PDR.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Internal link hub',
        title: 'Ba điểm rẽ nhanh phù hợp nhất từ pillar mầm non.',
        intro:
          'Đây là các link cần có để gom phụ huynh về đúng hành động thay vì để họ luẩn quẩn.',
        items: [
          {
            eyebrow: 'Admissions',
            title: 'Tuyển Sinh',
            href: '/tuyen-sinh',
            body: 'Điểm vào phù hợp nếu phụ huynh muốn biết quy trình đăng ký và bước tiếp theo.',
          },
          {
            eyebrow: 'Money intent',
            title: 'Học Phí',
            href: '/hoc-phi',
            body: 'Phù hợp với nhóm đang tìm giá và muốn có mục preview minh bạch trước khi gọi.',
          },
          {
            eyebrow: 'Brand depth',
            title: 'Triết Lý Giáo Dục',
            href: '/triet-ly-giao-duc',
            body: 'Điểm đọc tiếp cho nhóm phụ huynh cần xác nhận sự phù hợp về giá trị và cách dạy trẻ.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ mầm non',
        title: 'Những câu hỏi có intent chuyển đổi cao nhất ở khối mầm non.',
        intro:
          'FAQ dưới pillar page giúp bắt PAA, giảm tải cho sales và hỗ trợ phụ huynh ra quyết định nhanh hơn.',
        items: [
          {
            question: 'Bé nhút nhát có hoà nhập được không?',
            answer:
              'Đây là một trong những nỗi lo lớn nhất, và cũng là lý do Việt Anh ưu tiên rhythm đón trẻ, giao tiếp nhẹ và một môi trường an toàn để bé thích nghi từ từ.',
          },
          {
            question: 'Phụ huynh nên bắt đầu từ trang nào nếu muốn đăng ký?',
            answer:
              'Tuyển Sinh là điểm vào tốt nhất. Nếu phụ huynh đang so sánh chi phí, có thể đi tiếp sang Học Phí.',
          },
          {
            question: 'Tiếng Anh ở mầm non được dạy ra sao?',
            answer:
              'Qua bài hát, trò chơi, giao tiếp và các chủ đề gần gũi, để bé hình thành phản xạ ngôn ngữ gắn với trải nghiệm vui.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tieu-hoc',
    title: 'Tiểu Học Trường Việt Anh',
    description:
      'Pillar page tiểu học của Trường Việt Anh, nhấn mạnh cân bằng học thuật, tiếng Anh, PDR và nề nếp tự học cho học sinh.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'Tiểu học Việt Anh được xây để học sinh vừa có nề nếp học tập, vừa giữ được sự ham học và tính chủ động.',
      body:
        'Trang pillar này phục vụ nhóm phụ huynh đang so sánh rất mạnh về chương trình, tiếng Anh, giáo viên và học phí. Vì vậy nó cần cân bằng giữa authority, internal link và conversion support.',
      primaryCta: { label: 'Xem admissions hub', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Xem học phí toàn cấp', href: '/hoc-phi' },
      badges: ['Seed keyword page', 'Intent match', 'Trust builder'],
      asideTitle: 'Thông điệp chính cho phụ huynh tiểu học',
      asideItems: [
        'Học sinh được dạy cách học, không chỉ học để hoàn thành bài.',
        'Tiếng Anh và nề nếp được dạy cùng nhau, không đánh đổi.',
        'PDR là khung giúp học sinh tự chủ hơn mỗi học kỳ.',
        'CTA mềm nhưng rõ ràng: học phí, tuyển sinh, trang thương hiệu.',
      ],
    },
    stats: [
      { value: 'Cân bằng', label: 'Học thuật, tiếng Anh và nề nếp đi cùng nhau' },
      { value: 'PDR', label: 'Học sinh tập lập kế hoạch học và tự review' },
      { value: 'Tiếng Anh', label: 'Ngôn ngữ được dùng trong nhiều hoạt động có chủ đích' },
      { value: 'Tự học', label: 'Năng lực tự học được xem là đầu ra lâu dài' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Curriculum Highlights',
        title: 'Trang pillar tiểu học cần cho thấy “chạm vào kết quả” như thế nào.',
        intro:
          'Phụ huynh cấp tiểu học quan tâm cả kiến thức nền tảng lẫn kỹ năng học. Vì vậy section này cần rất rõ về structure.',
        columns: 2,
        items: [
          {
            title: 'Nền tảng học thuật chắc',
            body:
              'Học sinh được xây chắc các môn cốt lõi, đồng thời học cách tổ chức bài tập, ghi nhớ và theo dõi tiến độ của mình.',
          },
          {
            title: 'Tiếng Anh có chủ đích',
            body:
              'Tiếng Anh không chỉ là tiết học riêng, mà là một phần của môi trường giao tiếp và tư duy, để học sinh sử dụng ngôn ngữ như một công cụ.',
          },
          {
            title: 'Dự án và trình bày',
            body:
              'Trẻ được tập thuyết trình, làm việc nhóm và trình bày suy nghĩ từ sớm, từ đó tự tin hơn trong lớp học và ngoài đời sống.',
          },
          {
            title: 'Nề nếp học tập bền vững',
            body:
              'Trách nhiệm được dạy qua những việc rất cụ thể: chuẩn bị, hoàn thành, phản hồi và review lại cách học của mình.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Learning rhythm',
        title: 'Bốn lớp trải nghiệm mà phụ huynh cần hình dung rõ ở cấp tiểu học.',
        intro:
          'Phụ huynh không chỉ mua chương trình. Họ mua một nhịp điệu học tập mà con có thể theo được nhiều năm liền.',
        items: [
          {
            title: 'Bắt đầu bằng mục tiêu ngày học',
            body:
              'Học sinh biết hôm nay mình cần đặt điều gì, bài học nào cần tập trung và sẽ review ra sao vào cuối ngày.',
          },
          {
            title: 'Học qua hoạt động có định hướng',
            body:
              'Tiết học được tổ chức để học sinh tham gia, trả lời, hợp tác và ghi nhớ qua hành động, không chỉ nghe thụ động.',
          },
          {
            title: 'Tiếng Anh và giao tiếp được lặp lại có chủ đích',
            body:
              'Trẻ được tiếp xúc ngôn ngữ theo chủ đề và ngữ cảnh rõ ràng để có khả năng sử dụng thật, không chỉ học để tra bài.',
          },
          {
            title: 'Review để xây thói quen tự học',
            body:
              'Học sinh được hướng dẫn nhìn lại cách làm bài, cách đặt mục tiêu và cách phối hợp với giáo viên, gia đình.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ tiểu học',
        title: 'Các câu hỏi có ý nghĩa lớn nhất với conversion ở pillar tiểu học.',
        intro:
          'Những FAQ này được viết để hỗ trợ đội tuyển sinh, đồng thời tạo khả năng bắt long-tail queries có intent mạnh.',
        items: [
          {
            question: 'Tiểu học Việt Anh có quá áp lực không?',
            answer:
              'Pillar này cần làm rõ ràng mục tiêu không phải tạo áp lực sớm, mà là xây nề nếp học tập và khả năng tự học có hướng dẫn.',
          },
          {
            question: 'Phụ huynh nên xem học phí trước hay admissions trước?',
            answer:
              'Nếu đang so sánh chi phí, vào Học Phí trước. Nếu muốn biết quy trình, giấy tờ và bước tiếp theo, vào Tuyển Sinh.',
          },
          {
            question: 'PDR giúp học sinh tiểu học thế nào?',
            answer:
              'Nó giúp học sinh biết lập kế hoạch nhỏ, theo dõi bài tập, review lại cách học và dần dần hình thành tính tự chủ.',
          },
        ],
      },
    ],
  },
  {
    slug: 'trung-hoc-co-so',
    title: 'Trung Học Cơ Sở Trường Việt Anh',
    description:
      'Pillar page THCS của Trường Việt Anh, tập trung vào lộ trình học thuật, tiếng Anh, PDR và kỹ năng tự chủ cho học sinh.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'THCS là giai đoạn học sinh cần một lộ trình rõ ràng để vừa lớn lên, vừa không mất nhịp học.',
      body:
        'Trang pillar THCS phải nói được một điều rất quan trọng: đây là giai đoạn chuyển tiếp để học sinh tăng tốc học thuật, tiếng Anh và kỹ năng tự học mà không bị quá tải. Nội dung cần giúp phụ huynh thấy được sự rõ ràng về hệ thống.',
      primaryCta: { label: 'Xem quy trình tuyển sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Tham khảo học phí THCS', href: '/hoc-phi' },
      badges: ['THCS authority', 'Mid-funnel support', 'Admissions bridge'],
      asideTitle: 'Các objection cần được xử lý',
      asideItems: [
        'Chương trình học có quá nặng không?',
        'Tiếng Anh được dạy ở mức nào?',
        'Học sinh có được hướng dẫn cách tự học thật không?',
        'THCS có đường link tự nhiên sang THPT và học phí hay không?',
      ],
    },
    stats: [
      { value: 'Lộ trình', label: 'THCS được nhìn như giai đoạn tăng tốc có hướng dẫn' },
      { value: 'Tiếng Anh', label: 'Gia tăng khả năng ngôn ngữ và sự tự tin' },
      { value: 'PDR', label: 'Học sinh tự quản lý bài tập và group work tốt hơn' },
      { value: 'Định hướng', label: 'Sẵn sàng cho THPT, IELTS và dự án lớn hơn' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'THCS priorities',
        title: 'Bốn điểm cần rất rõ trên pillar THCS.',
        intro:
          'Nhiều phụ huynh bắt đầu so sánh rất kỹ từ THCS. Trang này vì vậy cần chặt về logic và có internal links đúng lúc.',
        columns: 2,
        items: [
          {
            title: 'Học thuật có cấu trúc',
            body:
              'Học sinh có một rhythm học tập rõ ràng hơn, biết cách quản lý deadline, project và bài kiểm tra theo một lộ trình có support.',
          },
          {
            title: 'Tiếng Anh để mở rộng tư duy',
            body:
              'Tiếng Anh được dạy để học sinh có thể đọc, nghe, nói và trình bày suy nghĩ tự tin hơn trong môn học và hoạt động dự án.',
          },
          {
            title: 'PDR tăng cấp',
            body:
              'THCS là lúc PDR không chỉ là thói quen nhỏ nữa, mà trở thành một hệ thống giúp học sinh tự điều chỉnh cách học.',
          },
          {
            title: 'Kỹ năng thế kỷ 21',
            body:
              'Thuyết trình, hợp tác, phản biện và trách nhiệm được đưa vào cách học mỗi ngày để học sinh trưởng thành hơn.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Internal links cần có',
        title: 'Ba trang mà THCS phải dẫn user tới một cách có chủ đích.',
        intro:
          'Page này phải làm việc như hub: vừa giữ authority, vừa dồn lực chuyển đổi về học phí và admissions.',
        items: [
          {
            eyebrow: 'Signature system',
            title: 'Hệ Thống PDR',
            href: '/he-thong-pdr',
            body: 'Giúp phụ huynh nhìn rõ cơ chế vận hành của khả năng tự học và phản tư.',
          },
          {
            eyebrow: 'Next stage',
            title: 'Trung Học Phổ Thông',
            href: '/trung-hoc-pho-thong',
            body: 'Cho thấy lộ trình THCS không tách rời mà dần lên THPT một cách logic.',
          },
          {
            eyebrow: 'Commercial support',
            title: 'Học Phí',
            href: '/hoc-phi',
            body: 'Nói user có thể xem minh bạch các mục học phí và hướng tư vấn tiếp theo.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ THCS',
        title: 'Câu hỏi hay gặp nhất trước khi phụ huynh chuyển sang giai đoạn ra quyết định.',
        intro:
          'Những câu hỏi này được viết để cắt giảm ma sát ở mid-funnel và tạo khả năng rank tốt hơn cho long-tail.',
        items: [
          {
            question: 'THCS Việt Anh có thiên về học thuật hay kỹ năng?',
            answer:
              'Trang này phải truyền tải rõ một thông điệp: đây là mô hình cân bằng, trong đó học thuật, tiếng Anh và năng lực tự học được xây đồng thời.',
          },
          {
            question: 'PDR có giúp học sinh THCS giảm phụ thuộc vào nhắc nhớ không?',
            answer:
              'Đó chính là mục tiêu. THCS là giai đoạn học sinh bắt đầu cần một hệ thống để tự quản lý bài tập, thời gian và cách học của mình.',
          },
          {
            question: 'Nếu phụ huynh đang cần giá hoặc quy trình ngay, nên vào đâu?',
            answer:
              'Học Phí giải quyết intent thương mại. Tuyển Sinh giải quyết intent hành động. Hai pages này được thiết kế để hỗ trợ trực tiếp cho pillar THCS.',
          },
        ],
      },
    ],
  },
  {
    slug: 'trung-hoc-pho-thong',
    title: 'Trung Học Phổ Thông Trường Việt Anh',
    description:
      'Pillar page THPT của Trường Việt Anh, nhấn mạnh lộ trình IELTS, định hướng đại học, PDR và sự chủ động của học sinh.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'THPT Việt Anh được xây để học sinh biết mình học vì điều gì, đang chuẩn bị cho bước tiếp theo nào.',
      body:
        'THPT là trang pillar có intent rất gần conversion. Phụ huynh và học sinh thường so sánh mạnh về đầu ra, IELTS, định hướng đại học và học phí. Vì vậy page này phải vừa rõ về authority, vừa rõ về next step.',
      primaryCta: { label: 'Bắt đầu từ tuyển sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Xem trang học phí', href: '/hoc-phi' },
      badges: ['THPT pillar', 'Commercial assist', 'Outcome-led'],
      asideTitle: 'Các proof point cần được gọi dùng',
      asideItems: [
        'Lộ trình học và định hướng sau THPT.',
        'Tiếng Anh / IELTS / khả năng trình bày.',
        'PDR như một bộ khung giúp học sinh tự chịu trách nhiệm.',
        'CTA phải dẫn đến hành động, không chỉ mô tả.',
      ],
    },
    stats: [
      { value: 'IELTS', label: 'Tiếng Anh được đặt trong bối cảnh đầu ra và định hướng' },
      { value: 'PDR', label: 'Học sinh tự lập kế hoạch và theo dõi mục tiêu học tập' },
      { value: 'Portfolio', label: 'Trình bày năng lực và quá trình tiến bộ rõ ràng hơn' },
      { value: 'Đại học', label: 'Mỗi môn học được nói về những lựa chọn phía trước' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Outcome structure',
        title: 'Bốn lớp giá trị cần xuất hiện rõ ràng ở THPT.',
        intro:
          'Đây là trang pillar “gần tiền” nhất trong 4 cấp học, nên nó cần nói rất rõ về đầu ra và sự sẵn sàng cho giai đoạn sau phổ thông.',
        columns: 2,
        items: [
          {
            title: 'Lộ trình học thuật có định hướng',
            body:
              'Học sinh không chỉ học để xong chương trình, mà học trong một khung có mục tiêu rõ ràng hơn về đại học, kỹ năng và profile cá nhân.',
          },
          {
            title: 'Tiếng Anh và IELTS',
            body:
              'Tiếng Anh được nhìn như năng lực cần để học tập và bước ra thế giới rộng hơn, không chỉ là một cột điểm.',
          },
          {
            title: 'PDR và sự chủ động cá nhân',
            body:
              'THPT là giai đoạn học sinh phải tự lập kế hoạch, tự quản lý áp lực và biết review để cải tiến cách học của chính mình.',
          },
          {
            title: 'Trình bày, dự án, portfolio',
            body:
              'Học sinh cần khả năng giao tiếp, trình bày và tổng hợp trải nghiệm - đây là một phần của đầu ra, không phải phần phụ.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Decision journey',
        title: 'THPT page cần dẫn user qua ba lớp quyết định.',
        intro:
          'Nếu không có trình tự rõ ràng, trang sẽ dễ rơi vào tình trạng “có vẻ uy tín nhưng khó hành động”.',
        items: [
          {
            title: 'Hiểu rõ outcome',
            body:
              'Trước tiên, phụ huynh cần biết học sinh sẽ được chuẩn bị cho gì: học thuật, ngôn ngữ, tự chủ và con đường phía sau THPT.',
          },
          {
            title: 'Xác minh bằng hệ thống',
            body:
              'Sau đó, họ cần thấy PDR và cách tổ chức học tập của trường đủ sức để đưa học sinh đến outcome đó.',
          },
          {
            title: 'Hành động qua admissions và học phí',
            body:
              'Cuối cùng, phải có đường rõ sang Tuyển Sinh và Học Phí để user không bị dừng lại chỉ vì page quá “authority” mà thiếu next step.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ THPT',
        title: 'FAQ được viết theo intent BOFU hơn ba pillar còn lại.',
        intro:
          'Nó hỗ trợ phụ huynh ra quyết định nhanh hơn và giúp đội tuyển sinh xử lý objection có hệ thống.',
        items: [
          {
            question: 'THPT Việt Anh có thiên về IELTS và du học hay không?',
            answer:
              'Trang này cần diễn giải rõ ràng: tiếng Anh và IELTS là một phần của lộ trình năng lực, đồng hành cùng học thuật, tự chủ và định hướng sau THPT.',
          },
          {
            question: 'Học sinh THPT có được hướng dẫn cách tự học thật sự không?',
            answer:
              'Có. PDR là bộ khung giúp học sinh tự lập kế hoạch, theo dõi mục tiêu và review quá trình học của mình một cách rõ ràng hơn.',
          },
          {
            question: 'Phụ huynh nên làm gì tiếp theo nếu thấy phù hợp?',
            answer:
              'Trang Tuyển Sinh là điểm vào phù hợp nhất để bắt đầu, còn Học Phí phục vụ nhu cầu tham khảo chi phí và tư vấn theo level.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tuyen-sinh',
    title: 'Tuyển Sinh Trường Việt Anh',
    description:
      'Admissions hub của Trường Việt Anh, giải thích quy trình tuyển sinh, các mốc hành động và cách phụ huynh bắt đầu tư vấn nhanh.',
    templateClass: 'Admissions Hub',
    pageType: 'Conversion hub',
    theme: 'admissions',
    hero: {
      eyebrow: 'Admissions Hub',
      title: 'Khi phụ huynh đã sẵn sàng hành động, trang tuyển sinh cần giải quyết friction thật nhanh.',
      body:
        'Đây là conversion hub của đợt launch đầu tiên. Nó không cần quá nhiều văn hóa. Nó cần rõ quy trình, rõ CTA và rõ cách route phụ huynh sang level phù hợp, học phí hoặc cuộc gọi tư vấn.',
      primaryCta: { label: 'Gọi ngay cho đội tư vấn', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Xem học phí', href: '/hoc-phi' },
      badges: ['Admissions funnel', 'Conversion hub', 'Low-friction routing'],
      asideTitle: 'Ba việc admissions hub phải làm ngay',
      asideItems: [
        'Giải thích quy trình một cách ngắn gọn, không hành chính hóa.',
        'Cho phụ huynh thấy 4 cấp học đều có đường vào rõ ràng.',
        'Tạo nhiều next-step đơn giản: gọi, zalo, học phí, pillar pages.',
      ],
    },
    stats: [
      { value: '4 bước', label: 'Tự quan tâm đến xác nhận nhập học' },
      { value: '4 cấp học', label: 'Một hub dùng cho toàn hệ thống' },
      { value: 'Call / Zalo', label: 'Hai kênh cho nhu cầu hành động nhanh nhất' },
      { value: 'Pillar-linked', label: 'Mỗi level page đều dẫn được về đây' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Admissions flow',
        title: 'Quy trình tuyển sinh cần rõ đến mức phụ huynh chỉ cần đọc 1 phút là biết mình đang ở đâu.',
        intro:
          'Đây là core logic của conversion hub. Khi quy trình rõ, phụ huynh ít trì hoãn hơn và sales gọi lại cũng để chốt hơn.',
        items: [
          {
            title: 'Bước 1: Xác định cấp học phù hợp',
            body:
              'Nếu phụ huynh chưa rõ, hãy bắt đầu từ 4 pillar pages. Mỗi trang cấp học sẽ giải thích chương trình, triết lý và intent tiếp theo.',
          },
          {
            title: 'Bước 2: Làm rõ học phí và mục quan tâm',
            body:
              'Trang Học Phí cung cấp range và logic chi phí. Mục tiêu là giảm ma sát trước khi vào tư vấn chi tiết.',
          },
          {
            title: 'Bước 3: Gọi, chat hoặc hẹn lịch',
            body:
              'Đội admissions có thể tiếp nhận thông tin qua cuộc gọi hoặc Zalo, sau đó điều phối bước tiếp theo cho đúng cấp học.',
          },
          {
            title: 'Bước 4: Chốt hành động tiếp theo',
            body:
              'Sau khi đủ thông tin, phụ huynh được định hướng sang assessment, tham quan hoặc xử lý hồ sơ nhập học ở phase tiếp theo.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Quick routes',
        title: 'Ba luồng hành động mà admissions hub cần route thật nhanh.',
        intro:
          'Links dưới đây vừa là block điều hướng, vừa là internal linking support cho 4 pillars và money page.',
        items: [
          {
            eyebrow: 'Cấp học',
            title: 'Bắt đầu từ Mầm Non',
            href: '/mam-non',
            body: 'Điểm vào cho nhóm phụ huynh cần thông tin cấp học trước khi quyết định tiếp.',
          },
          {
            eyebrow: 'Cấp học',
            title: 'Bắt đầu từ Tiểu Học',
            href: '/tieu-hoc',
            body: 'Phù hợp với nhóm đang so sánh chương trình và cân bằng học thuật - tiếng Anh.',
          },
          {
            eyebrow: 'Commercial',
            title: 'Vào thẳng Học Phí',
            href: '/hoc-phi',
            body: 'Điểm rẽ nhanh cho user BOFU muốn làm rõ range chi phí và mức độ phù hợp.',
          },
        ],
      },
      {
        type: 'cards',
        eyebrow: 'CTA support',
        title: 'Hai kiểu user admissions hub cần phục vụ cùng lúc.',
        intro:
          'Nếu chỉ có một CTA, page sẽ mất một nửa nhu cầu. Đây là lý do block này cần tồn tại ở gần cuối trang.',
        columns: 2,
        items: [
          {
            title: 'Nhóm cần thông tin nhanh',
            body:
              'Với nhóm này, hotline và Zalo là kênh ma sát thấp nhất. Họ cần có ngay số điện thoại và được hướng dẫn tiếp theo nhanh.',
          },
          {
            title: 'Nhóm cần đọc sâu trước khi liên hệ',
            body:
              'Với nhóm này, pillar pages và Học Phí là nơi để tiếp tục đọc. Admissions hub có nhiệm vụ route, không cần đào sâu nội dung.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ tuyển sinh',
        title: 'Những câu hỏi admissions hub phải xử lý rất gọn.',
        intro:
          'Bộ FAQ này giúp giảm call lặp lại và hỗ trợ SEO cho những truy vấn có intent hành động.',
        items: [
          {
            question: 'Nếu chưa chắc cấp học nào phù hợp thì bắt đầu từ đâu?',
            answer:
              'Bắt đầu từ trang pillar của cấp học gần nhất với độ tuổi hiện tại của con, sau đó quay lại admissions hub để tiếp tục hành động.',
          },
          {
            question: 'Nếu muốn biết chi phí trước khi gọi thì sao?',
            answer:
              'Trang Học Phí được thiết kế chính xác cho mục đích đó. Sau khi có hình dung range, phụ huynh có thể gọi admissions để được tư vấn cụ thể hơn.',
          },
          {
            question: 'Admissions hub có phải trang đăng ký form không?',
            answer:
              'Trong đợt launch đầu tiên, nó là trang điều hướng low-friction: gọi, chat Zalo, học phí và 4 pillar pages. Form chuyên sâu sẽ được thêm ở wave tiếp theo.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hoc-phi',
    title: 'Học Phí Trường Việt Anh',
    description:
      'Money page của Trường Việt Anh, trình bày range học phí theo cấp học, logic giá trị và cách tiếp tục nhận bảng học phí chi tiết qua đội tuyển sinh.',
    templateClass: 'Money Page / Fee Support',
    pageType: 'Commercial intent page',
    theme: 'tuition',
    hero: {
      eyebrow: 'Money Page',
      title: 'Trang học phí cần minh bạch đủ để tạo niềm tin, nhưng vẫn giữ được đường dẫn tư vấn chi tiết.',
      body:
        'Đây là money page quan trọng nhất của đợt launch đầu tiên. Nó không có mục tiêu “ăn” thông tin. Nó có mục tiêu giúp phụ huynh hình dung range học phí, hiểu cấu trúc giá trị và đi tiếp sang hành động phù hợp.',
      primaryCta: { label: 'Gọi để nhận tư vấn học phí', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Quay về tuyển sinh', href: '/tuyen-sinh' },
      badges: ['Commercial intent', 'Friction reducer', 'Sales support'],
      asideTitle: 'Money page này được xây cho 3 intent',
      asideItems: [
        'Người đang so sánh range học phí.',
        'Người cần xác nhận có “đáng tiền” hay không.',
        'Người muốn biết bước tiếp theo để nhận bảng phí chi tiết.',
      ],
    },
    stats: [
      { value: '4 levels', label: 'Preview học phí theo 4 cấp học chính' },
      { value: 'Range preview', label: 'Minh bạch đủ để xóa friction đầu funnel' },
      { value: 'Value-led', label: 'Giá trị được giải thích cùng học phí' },
      { value: 'Sales assist', label: 'Page được viết để đội admissions gọi lại dễ hơn' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Fee preview',
        title: 'Preview học phí nên đủ rõ để user có mốc tham chiếu, nhưng không biến page thành bảng giá khung.',
        intro:
          'Với đợt launch đầu tiên, cách tốt nhất là đưa ra range theo cấp học và giải thích các lớp giá trị đi kèm.',
        columns: 2,
        items: [
          {
            title: 'Mầm Non',
            body:
              'Range học phí mầm non được trình bày như một mốc tham chiếu để phụ huynh cân đối với chương trình song ngữ, môi trường và nhịp sinh hoạt.',
            href: '/mam-non',
            cta: 'Xem pillar Mầm Non',
          },
          {
            title: 'Tiểu Học',
            body:
              'Tiểu học cần được nhìn trong bối cảnh học thuật, tiếng Anh, PDR và môi trường kỷ luật nhẹ nhàng để trẻ tự học tốt hơn.',
            href: '/tieu-hoc',
            cta: 'Xem pillar Tiểu Học',
          },
          {
            title: 'Trung Học Cơ Sở',
            body:
              'Range THCS cần đi cùng thông điệp về tăng tốc học thuật, tiếng Anh, group projects và sự chủ động của học sinh.',
            href: '/trung-hoc-co-so',
            cta: 'Xem pillar THCS',
          },
          {
            title: 'Trung Học Phổ Thông',
            body:
              'THPT là level có intent thương mại mạnh hơn, vì vậy page cần nói rõ giá trị đầu ra, IELTS và định hướng đại học.',
            href: '/trung-hoc-pho-thong',
            cta: 'Xem pillar THPT',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Fee logic',
        title: 'Ba lớp logic cần có trên money page để tránh cảm giác “giá cao vì thương hiệu”.',
        intro:
          'Phụ huynh không chỉ hỏi bao nhiêu tiền. Họ đang hỏi mình nhận lại được điều gì và nó có xứng đáng không.',
        items: [
          {
            title: 'Học phí được gắn với trải nghiệm học tập',
            body:
              'Nó phản ánh một hệ thống giáo dục liên cấp, sự đầu tư vào tiếng Anh, vào phương pháp và vào nhịp học tập có cấu trúc.',
          },
          {
            title: 'Học phí cần đi cùng minh bạch',
            body:
              'Minh bạch không có nghĩa là phải đưa mọi đồng phí ra homepage. Minh bạch là cho user một range để định hình và một đường dẫn rõ để nhận thông tin chi tiết.',
          },
          {
            title: 'Học phí là một phần của conversation, không phải điểm cuối',
            body:
              'Money page có nhiệm vụ cắt giảm friction, sau đó chuyển tiếp sang đội tư vấn để xác nhận cấp học, nhu cầu và bước tiếp theo.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Commercial routes',
        title: 'Nếu user chưa sẵn sàng gọi ngay, đây là các đường đi tiếp theo hợp lý nhất.',
        intro:
          'Money page tốt sẽ không để phụ huynh bị dừng lại trong một không gian chỉ có bảng giá. Nó phải mở sang triết lý, cấp học và admissions.',
        items: [
          {
            eyebrow: 'Admissions',
            title: 'Tuyển Sinh',
            href: '/tuyen-sinh',
            body: 'Khi user muốn biết quy trình và cách bắt đầu, admissions hub là bước kế tiếp hợp lý nhất.',
          },
          {
            eyebrow: 'Brand trust',
            title: 'Giới Thiệu',
            href: '/gioi-thieu',
            body: 'Dành cho phụ huynh đang cần “lý do tồn tại” và mức độ phù hợp về giá trị trước khi chốt được quyết định.',
          },
          {
            eyebrow: 'Signature',
            title: 'Hệ Thống PDR',
            href: '/he-thong-pdr',
            body: 'Dành cho nhóm muốn xác minh rằng giá trị học phí được đổi lại bằng một hệ thống học tập rõ ràng.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ học phí',
        title: 'Ba câu hỏi có thể giúp money page chuyển đổi tốt hơn.',
        intro:
          'FAQ ở đây không cần dài, nhưng phải đánh đúng vào friction thường gặp của phụ huynh khi so sánh.',
        items: [
          {
            question: 'Việt Anh có công khai học phí hoàn toàn không?',
            answer:
              'Trang này công khai range và logic học phí để giảm friction. Mục phí chi tiết sẽ được admissions hướng dẫn theo cấp học và nhu cầu của gia đình.',
          },
          {
            question: 'Nên xem học phí trước hay chương trình trước?',
            answer:
              'Nếu phụ huynh đang ở BOFU, học phí là điểm vào hợp lý. Nếu vẫn đang so sánh giá trị, hãy quay lại pillar page cấp học để đối chiếu kỹ hơn.',
          },
          {
            question: 'Sau khi xem học phí thì bước tiếp theo là gì?',
            answer:
              'Bước tiếp theo có thể là gọi admissions, nhận tư vấn qua Zalo hoặc vào Tuyển Sinh để xem rõ quy trình và các mốc hành động.',
          },
        ],
      },
    ],
  },
  ...priorityPages,
];

export function getPageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}
