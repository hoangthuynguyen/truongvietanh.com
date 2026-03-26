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
export const defaultSiteUrl = 'https://staging.truongvietanh.com';
export const adminUrl = 'https://admin.truongvietanh.com/admin';

export const mainNav = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Giới thiệu', href: '/gioi-thieu' },
  {
    label: 'Cấp học',
    href: '#',
    children: [
      { label: 'Mầm non', href: '/mam-non' },
      { label: 'Tiểu học', href: '/tieu-hoc' },
      { label: 'THCS', href: '/trung-hoc-co-so' },
      { label: 'THPT', href: '/trung-hoc-pho-thong' },
    ]
  },
  {
    label: 'Cơ sở',
    href: '/co-so',
    children: [
      { label: 'Tổng quan cơ sở', href: '/co-so' },
      { label: 'Gò Vấp Phan Huy Ích', href: '/co-so/go-vap-phan-huy-ich' },
      { label: 'Mầm non Gò Vấp Lê Đức Thọ', href: '/co-so/mam-non-go-vap-le-duc-tho' },
      { label: 'Phú Nhuận Nguyễn Trọng Tuyển', href: '/co-so/phu-nhuan-nguyen-trong-tuyen' },
      { label: 'Bình Tân Tỉnh Lộ 10', href: '/co-so/binh-tan-tinh-lo-10' },
    ]
  },
  {
    label: 'Tuyển sinh',
    href: '/tuyen-sinh',
    children: [
      { label: 'Tổng quan tuyển sinh', href: '/tuyen-sinh' },
      { label: 'Quy trình tuyển sinh', href: '/tuyen-sinh/quy-trinh-tuyen-sinh' },
      { label: 'Hồ sơ nhập học', href: '/tuyen-sinh/ho-so-nhap-hoc' },
      { label: 'Lịch tuyển sinh', href: '/tuyen-sinh/lich-tuyen-sinh' },
      { label: 'Đăng ký tư vấn', href: '/tuyen-sinh/dang-ky-tu-van' },
      { label: 'Tham quan trường', href: '/tuyen-sinh/tham-quan-truong' },
      { label: 'Học thử', href: '/hoc-thu' },
    ]
  },
  {
    label: 'Học phí',
    href: '/hoc-phi',
    children: [
      { label: 'Tổng quan học phí', href: '/hoc-phi' },
      { label: 'Học bổng & ưu đãi', href: '/hoc-bong' },
    ]
  },
  { label: 'Liên hệ', href: '/lien-he' },
];

export const contactLinks = {
  phoneDisplay: '0916 961 409',
  phoneHref: 'tel:0916961409',
  zaloHref: 'https://zalo.me/0916961409',
  email: 'info@truongvietanh.com',
  contactHref: '/lien-he',
  facebookHref: 'https://www.facebook.com/',
  youtubeHref: 'https://www.youtube.com/',
  instagramHref: 'https://www.instagram.com/',
  admissionsHref: '/tuyen-sinh/dang-ky-tu-van',
  tuitionHref: '/hoc-phi',
};

export const launchPages: LinkItem[] = [
  {
    eyebrow: 'Class Homepage',
    title: 'Trang Chu',
    href: '/',
    body: 'Grand Central Station dieu phoi traffic vao cap hoc, hoc phi va admissions hub.',
  },
  {
    eyebrow: 'Brand Core',
    title: 'Gioi Thieu',
    href: '/gioi-thieu',
    body: 'Trang cot loi de ke cau chuyen thuong hieu, lich su va loi hua gia tri.',
  },
  {
    eyebrow: 'Brand Depth',
    title: 'Triet Ly Giao Duc',
    href: '/triet-ly-giao-duc',
    body: 'Trang thought leadership giai thich tinh than vui ve va thuc dung cua Viet Anh.',
  },
  {
    eyebrow: 'Authority Asset',
    title: 'He Thong PDR',
    href: '/he-thong-pdr',
    body: 'Trang signature asset de neo su khac biet ve Plan - Do - Review.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Mam Non',
    href: '/mam-non',
    body: 'Pillar page de bat tu khoa cap hoc va route ve hoc phi, tuyen sinh.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Tieu Hoc',
    href: '/tieu-hoc',
    body: 'Trang tru cot cho phu huynh dang so sanh chuong trinh, tieng Anh va ne nep.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Trung Hoc Co So',
    href: '/trung-hoc-co-so',
    body: 'Pillar THCS noi bat lo trinh hoc thuat, PDR va tu duy chu dong.',
  },
  {
    eyebrow: 'Class Level Pillar',
    title: 'Trung Hoc Pho Thong',
    href: '/trung-hoc-pho-thong',
    body: 'Pillar THPT nhan manh IELTS, dinh huong dai hoc va nang luc tu hoc.',
  },
  {
    eyebrow: 'Admissions Hub',
    title: 'Tuyen Sinh',
    href: '/tuyen-sinh',
    body: 'Trang dieu huong phu huynh vao dung hanh dong: tu van, tham quan, assessment.',
  },
  {
    eyebrow: 'Money Page',
    title: 'Hoc Phi',
    href: '/hoc-phi',
    body: 'Trang hoc phi minh bach, dung intent thuong mai va chuyen doi sang tu van.',
  },
];

export const levelCards: LinkItem[] = [
  {
    eyebrow: 'Level Pillar',
    title: 'Mam Non',
    href: '/mam-non',
    body: 'Tu 18 thang den 5 tuoi, uu tien thich nghi, an toan va phat trien cam xuc.',
  },
  {
    eyebrow: 'Level Pillar',
    title: 'Tieu Hoc',
    href: '/tieu-hoc',
    body: 'Can bang hoc thuat, tieng Anh, ky luat tu hoc va niem vui moi ngay.',
  },
  {
    eyebrow: 'Level Pillar',
    title: 'Trung Hoc Co So',
    href: '/trung-hoc-co-so',
    body: 'Tang toc tieng Anh, du an, PDR va ky nang the ky 21.',
  },
  {
    eyebrow: 'Level Pillar',
    title: 'Trung Hoc Pho Thong',
    href: '/trung-hoc-pho-thong',
    body: 'IELTS, dinh huong dai hoc va mot lo trinh hoc tap co chu dich.',
  },
];

export const admissionsCards: LinkItem[] = [
  {
    eyebrow: 'Admissions Hub',
    title: 'Bat dau tu Tuyen Sinh',
    href: '/tuyen-sinh',
    body: 'Xem quy trinh, moc thoi gian va cach phoi hop voi doi tuyen sinh cua truong.',
  },
  {
    eyebrow: 'Money Page',
    title: 'Xem Hoc Phi',
    href: '/hoc-phi',
    body: 'Nhin ro cau truc hoc phi, range theo cap hoc va cach nhan bang hoc phi chi tiet.',
  },
  {
    eyebrow: 'Direct Contact',
    title: 'Goi tu van ngay',
    href: contactLinks.phoneHref,
    body: 'Phu hop voi phu huynh dang o giai doan BOFU va can xac nhan thong tin nhanh.',
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
      { value: '4', label: 'Cơ sở trọng điểm đang được ưu tiên hiển thị trong đợt đầu' },
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
            eyebrow: 'Kết nối trung tâm',
            title: 'Phú Nhuận Nguyễn Trọng Tuyển',
            body: 'Phù hợp với các gia đình cần vị trí kết nối thuận tiện, dễ tham quan và có đường vào rõ ràng sang tuyển sinh theo cấp học.',
            href: '/co-so/phu-nhuan-nguyen-trong-tuyen',
            cta: 'Xem cơ sở Phú Nhuận',
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
    slug: 'co-so/phu-nhuan-nguyen-trong-tuyen',
    title: 'Cơ Sở Phú Nhuận Nguyễn Trọng Tuyển | Trường Việt Anh',
    description:
      'Trang cơ sở Phú Nhuận Nguyễn Trọng Tuyển của Trường Việt Anh, tập trung local trust, kết nối thuận tiện và chuyển đổi sang tư vấn hoặc tham quan.',
    templateClass: 'Master Campus Profile',
    pageType: 'Campus profile',
    theme: 'brand',
    hero: {
      eyebrow: 'Campus profile',
      title: 'Cơ sở Phú Nhuận cần mang lại cảm giác gần, thuận tiện và đủ tin cậy để phụ huynh muốn đến xem thật.',
      body:
        'Campus page này nên giúp phụ huynh nhanh chóng đối chiếu vị trí, cấp học, lịch tham quan và bước tuyển sinh tiếp theo mà không bị chìm trong mô tả thương hiệu chung.',
      primaryCta: { label: 'Đăng ký tư vấn cho cơ sở này', href: '/tuyen-sinh/dang-ky-tu-van' },
      secondaryCta: { label: 'Đặt lịch tham quan', href: '/tuyen-sinh/tham-quan-truong' },
      badges: ['Phú Nhuận', 'Kết nối trung tâm', 'Local trust'],
      asideTitle: 'Campus page này nên nhấn mạnh',
      asideItems: [
        'Tính thuận tiện về vị trí và quãng đường di chuyển.',
        'Các cấp học phù hợp với nhóm gia đình ở khu vực trung tâm.',
        'Liên kết rõ sang tư vấn, tham quan và học phí.',
      ],
    },
    stats: [
      { value: 'Central', label: 'Phù hợp với nhóm phụ huynh cần vị trí kết nối nhanh' },
      { value: 'Local SEO', label: 'Bắt truy vấn trường tại Phú Nhuận và khu vực lân cận' },
      { value: '2 hướng', label: 'Tập trung vào tham quan và tư vấn' },
      { value: 'Brand bridge', label: 'Nối local trust với thương hiệu mẹ một cách nhất quán' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Nội dung cần rõ',
        title: 'Một campus page tốt luôn nói rõ điều phụ huynh muốn kiểm tra nhanh nhất.',
        intro: 'Trang này không cần nói quá nhiều, nhưng phải nói đúng và đủ để phụ huynh tự tin bấm sang bước tiếp.',
        columns: 2,
        items: [
          { title: 'Địa chỉ và chỉ dẫn', body: 'Thông tin vị trí rõ ràng giúp local SEO mạnh hơn và cũng giảm ma sát cho quyết định tham quan.' },
          { title: 'Chất lượng trải nghiệm', body: 'Review, hình ảnh thật và thông tin campus cụ thể tạo cảm giác đây là một nơi có thể đến thật, không phải một lời hứa chung.' },
          { title: 'Cấp học phù hợp', body: 'Campus page nên cho phụ huynh biết ngay lộ trình nào phù hợp để tránh chuyển qua lại giữa nhiều trang.' },
          { title: 'Bước tiếp theo rõ ràng', body: 'CTA tốt nhất thường là tham quan trường hoặc đăng ký tư vấn chứ không nên phân tán quá nhiều.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Đi tiếp từ Phú Nhuận',
        title: 'Những trang nên được nối trực tiếp từ cơ sở này.',
        intro: 'Đây là cụm link giúp local traffic đi sang các trang giàu ý định hơn.',
        items: [
          {
            eyebrow: 'Admissions',
            title: 'Đăng ký tư vấn',
            href: '/tuyen-sinh/dang-ky-tu-van',
            body: 'Bước đi phù hợp khi phụ huynh đã thấy campus thuận tiện nhưng còn cần chốt cấp học, học phí hoặc thời điểm nhập học.',
          },
          {
            eyebrow: 'Visit',
            title: 'Tham quan trường',
            href: '/tuyen-sinh/tham-quan-truong',
            body: 'Dành cho gia đình muốn kiểm chứng không gian, nề nếp và trải nghiệm thực tế trước khi nói sâu về hồ sơ.',
          },
          {
            eyebrow: 'Hub',
            title: 'Tổng quan các cơ sở',
            href: '/co-so',
            body: 'Nếu phụ huynh vẫn còn đang cân nhắc giữa các khu vực, trang hub là nơi phù hợp để so lại phương án.',
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
    slug: 'tuyen-sinh/tham-quan-truong',
    title: 'Tham Quan Trường | Trường Việt Anh',
    description:
      'Trang đặt lịch tham quan Trường Việt Anh, giúp phụ huynh chọn cơ sở quan tâm và chuyển nhanh từ tìm hiểu online sang trải nghiệm thực tế.',
    templateClass: 'Campus Tour / Local Admission Landing',
    pageType: 'Visit booking',
    theme: 'admissions',
    hero: {
      eyebrow: 'School tour',
      title: 'Với nhiều gia đình, tham quan trường là khoảnh khắc chuyển từ cảm giác hứng thú sang niềm tin thật.',
      body:
        'Trang này nên rất rõ: chọn cơ sở nào, nên đi vào lúc nào, đi để xem điều gì và sau buổi tham quan phụ huynh có thể bước tiếp ra sao.',
      primaryCta: { label: 'Gọi để đặt lịch tham quan', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Nhắn Zalo đặt lịch', href: contactLinks.zaloHref },
      badges: ['School tour', 'Local conversion', 'High-quality lead'],
      asideTitle: 'Một buổi tham quan tốt giúp phụ huynh',
      asideItems: [
        'Nhìn thấy campus thật thay vì chỉ đọc mô tả.',
        'Cảm nhận nề nếp, không gian và cách đội ngũ làm việc.',
        'Đặt câu hỏi đúng hơn về học phí, chương trình và hồ sơ.',
      ],
    },
    stats: [
      { value: 'High intent', label: 'Đây thường là nhóm lead chất lượng cao hơn lead đọc thông tin đơn thuần' },
      { value: '4 cơ sở', label: 'Trang nên điều hướng tới campus phù hợp thay vì để chung chung' },
      { value: 'Tour-first', label: 'Rất phù hợp cho local SEO và quảng cáo khu vực' },
      { value: 'Next step', label: 'Sau tour có thể đi tiếp sang hồ sơ, học phí hoặc học thử' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Chọn cơ sở để tham quan',
        title: 'Điểm bắt đầu của một buổi tham quan luôn là campus phù hợp với nhịp sống của gia đình.',
        intro:
          'Ở giai đoạn hoàn chỉnh, mỗi card có thể nối sang lịch riêng. Hiện tại, chúng đóng vai trò giúp phụ huynh chọn đúng ngữ cảnh trước khi liên hệ.',
        columns: 2,
        items: [
          { title: 'Gò Vấp Phan Huy Ích', body: 'Phù hợp cho nhóm gia đình muốn xem một cơ sở có nhiều điểm chạm tuyển sinh và local trust.', href: '/co-so/go-vap-phan-huy-ich', cta: 'Xem campus này' },
          { title: 'Mầm non Gò Vấp Lê Đức Thọ', body: 'Phù hợp cho gia đình có trẻ nhỏ, muốn bắt đầu từ cảm giác an tâm, sinh hoạt và sự thích nghi.', href: '/co-so/mam-non-go-vap-le-duc-tho', cta: 'Xem campus này' },
          { title: 'Phú Nhuận Nguyễn Trọng Tuyển', body: 'Phù hợp cho gia đình cần vị trí kết nối thuận tiện và muốn kiểm chứng campus trước khi đi tiếp.', href: '/co-so/phu-nhuan-nguyen-trong-tuyen', cta: 'Xem campus này' },
          { title: 'Bình Tân Tỉnh Lộ 10', body: 'Điểm vào phù hợp cho nhóm phụ huynh ở khu Tây TP.HCM đang tìm local option gần hơn.', href: '/co-so/binh-tan-tinh-lo-10', cta: 'Xem campus này' },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Chuẩn bị tham quan',
        title: 'Ba bước giúp buổi tham quan có giá trị hơn và ít cảm giác “đi xem cho biết”.',
        intro:
          'Khi phụ huynh được chuẩn bị đúng, chất lượng trao đổi tại campus sẽ tốt hơn rất nhiều.',
        items: [
          { title: 'Chốt trước cấp học và cơ sở', body: 'Điều này giúp đội tuyển sinh chuẩn bị tuyến nội dung phù hợp hơn cho gia đình.' },
          { title: 'Mang theo câu hỏi thật sự quan trọng', body: 'Ví dụ về học phí, lịch sinh hoạt, nề nếp học tập, khả năng thích nghi hoặc bước nhập học tiếp theo.' },
          { title: 'Xác định ngay hành động sau buổi tham quan', body: 'Sau khi xem trường, gia đình nên biết mình sẽ đi tiếp sang tư vấn, học phí, hồ sơ hay học thử.' },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Sau khi tham quan',
        title: 'Những trang phụ huynh thường cần xem tiếp sau một buổi school tour.',
        intro:
          'Đây là cụm link nên xuất hiện rõ để giữ đà chuyển đổi sau khi gia đình đã đầu tư thời gian tới trường.',
        items: [
          { eyebrow: 'Money page', title: 'Học phí', href: '/hoc-phi', body: 'Khi campus đã tạo niềm tin, học phí thường là câu hỏi tiếp theo cần được đặt trong đúng bối cảnh.' },
          { eyebrow: 'Checklist', title: 'Hồ sơ nhập học', href: '/tuyen-sinh/ho-so-nhap-hoc', body: 'Dành cho gia đình đã khá chắc về quyết định và muốn biết cần chuẩn bị gì tiếp theo.' },
          { eyebrow: 'Trial', title: 'Học thử', href: '/hoc-thu', body: 'Đặc biệt phù hợp với nhóm phụ huynh mầm non hoặc tiểu học còn muốn kiểm chứng thêm mức độ hòa nhập của con.' },
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
    title: 'Gioi Thieu Truong Viet Anh',
    description:
      'Trang gioi thieu cot loi cua Truong Viet Anh, giai thich su hinh thanh, loi hua thuong hieu va cach truong xay mot hanh trinh hoc tap co tinh nguoi.',
    templateClass: 'Pure Page / Brand Core',
    pageType: 'Brand trust page',
    theme: 'brand',
    hero: {
      eyebrow: 'Brand Core Page',
      title: 'Mot he thong truong hoc duoc xay de giup tre vui ve, tu chu va hoc tot that su.',
      body:
        'Trang nay dong vai tro trang cot loi cua brand: giai thich vi sao Truong Viet Anh ton tai, cach truong ket hop ky luat, tieng Anh va moi truong nhan van de giup phu huynh co them niem tin truoc khi vao giai doan so sanh hoc phi.',
      primaryCta: { label: 'Xem lo trinh tuyen sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Tham khao hoc phi', href: '/hoc-phi' },
      badges: ['Brand trust', 'SEO authority', 'Admissions support'],
      asideTitle: 'Trang nay can tra loi 4 cau hoi',
      asideItems: [
        'Truong Viet Anh khac gi so voi mot website giao duc chi noi ve thanh tich?',
        'Viet Anh tin vao triet ly nao khi giao duc tre?',
        'Vi sao phu huynh nen xem tiep cac trang cap hoc va admissions?',
        'CTA chinh la dua phu huynh sang Tuyen Sinh va Hoc Phi, khong ep form qua som.',
      ],
    },
    stats: [
      { value: '2011', label: 'Nam bat dau hanh trinh giao duc' },
      { value: 'Lien cap', label: 'He thong tu mam non den THPT' },
      { value: 'PDR', label: 'Phuong phap Plan - Do - Review xuyen suot' },
      { value: 'Song ngu', label: 'Tieng Anh duoc day nhu mot nang luc song' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Nen tang thuong hieu',
        title: 'Ba lop gia tri giup trang gioi thieu nay khong bi “noi cho hay”.',
        intro:
          'No khong chi ke lai lich su. No can cho thay Viet Anh duoc to chuc de tao ra mot moi truong hoc tap ro muc tieu va de phu huynh hieu buoc tiep theo la gi.',
        columns: 3,
        items: [
          {
            title: 'Nha truong la mot he thong, khong phai mot tap hop phong hoc',
            body:
              'Moi cap hoc, moi trang cap hoc va moi trang tuyen sinh deu duoc noi voi nhau bang mot he thong CTA va noi dung thong nhat.',
          },
          {
            title: 'Tinh nguoi di truoc, hoc thuat di kem',
            body:
              'Thong diep cot loi cua Viet Anh la tre chi co the hoc tot lau dai khi thay an toan, duoc ton trong va duoc huong dan cach tu hoc.',
          },
          {
            title: 'Trang nay dong vai tro neo trust',
            body:
              'Day la page de phu huynh dung lai, doc ky, roi moi chuyen sang pages co intent manh hon nhu hoc phi va admissions.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Brand Story',
        title: 'Lich su duoc ke theo logic ma phu huynh thuc su quan tam.',
        intro:
          'Khong can qua nhieu timeline vu vo. Can 3 lop thong tin: vi sao mo truong, cach van hanh va dieu gi khien phu huynh yen tam giao con.',
        items: [
          {
            title: 'Bat dau tu nhu cau giao duc that',
            body:
              'Viet Anh duoc hinh thanh de giai mot bai toan rat doi thuong: phu huynh can mot noi vua co nen nep, vua co tieng Anh, vua khong bien tuoi tho thanh cuoc dua diem so.',
          },
          {
            title: 'Mo rong thanh he thong lien cap',
            body:
              'Khi hanh trinh cua tre duoc nhin dai han tu mam non den THPT, nha truong co the xay dung mot lo trinh thong suot thay vi moi cap hoc la mot the gioi tach roi.',
          },
          {
            title: 'Dong bo thuong hieu voi van hanh',
            body:
              'Khong chi la khau hieu. PDR, tieng Anh, danh gia su tien bo va cach giao tiep voi phu huynh deu duoc trien khai nhu mot he thong.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Route phu huynh',
        title: 'Sau khi doc trang gioi thieu, phu huynh nen di tiep dau?',
        intro:
          'Day la phan internal linking bat buoc de trang thuong hieu nay ho tro conversion thay vi dung o giai doan “doc cho biet”.',
        items: [
          {
            eyebrow: 'Authority',
            title: 'Triet Ly Giao Duc',
            href: '/triet-ly-giao-duc',
            body: 'Neu phu huynh can hieu sau hon ve cach Viet Anh nhin tre, day la trang tiep theo nen doc.',
          },
          {
            eyebrow: 'Signature',
            title: 'He Thong PDR',
            href: '/he-thong-pdr',
            body: 'Trang signature asset cho thay cach nha truong bien triet ly thanh thoi quen hoc tap va tu chu.',
          },
          {
            eyebrow: 'Conversion',
            title: 'Tuyen Sinh',
            href: '/tuyen-sinh',
            body: 'Khi phu huynh da san sang hanh dong, admissions hub se giai thich quy trinh va cac buoc can thuc hien.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ thuong gap',
        title: 'Nhung cau hoi ma trang gioi thieu can giai toa.',
        intro:
          'Bo FAQ nay giup trang brand tra loi nhung thac mac dau tien truoc khi user sang trang cap hoc chi tiet.',
        items: [
          {
            question: 'Trang gioi thieu khac gi so voi homepage?',
            answer:
              'Homepage dieu phoi traffic. Trang gioi thieu di sau hon vao cau chuyen thuong hieu, cach truong van hanh va su khac biet cot loi.',
          },
          {
            question: 'Vi sao nen doc tiep he thong PDR?',
            answer:
              'Vi PDR la page signature mo ta cach Viet Anh bien “tu hoc va tu chu” thanh mot thoi quen co cau truc, khong chi la thong diep marketing.',
          },
          {
            question: 'Neu phu huynh muon biet hoc phi ngay thi sao?',
            answer:
              'Trang hoc phi duoc dat san de giam friction. O day chi can dua sang /hoc-phi dung luc, khong can ep user dien form qua som.',
          },
        ],
      },
    ],
  },
  {
    slug: 'triet-ly-giao-duc',
    title: 'Triet Ly Giao Duc Truong Viet Anh',
    description:
      'Trang triet ly giao duc giai thich cach Truong Viet Anh ket hop hanh phuc, ky luat va tinh thuc dung de tre hoc tot mot cach ben vung.',
    templateClass: 'Pure Page / Thought Leadership',
    pageType: 'Authority narrative page',
    theme: 'brand',
    hero: {
      eyebrow: 'Thought Leadership Page',
      title: 'Mot dua tre hanh phuc se hoc tot hon, nhung hanh phuc o day khong phai su de dai.',
      body:
        'Trang nay duoc viet de lam ro tinh than “vui ve va thuc dung”: tre duoc ton trong, co ky luat, biet lap ke hoach va co mot lo trinh tien bo ro rang. Day la lop noi dung nuoi trust truoc khi phu huynh so sanh hoc phi hay doi chieu voi truong khac.',
      primaryCta: { label: 'Kham pha he thong PDR', href: '/he-thong-pdr' },
      secondaryCta: { label: 'Xem cac cap hoc', href: '/mam-non' },
      badges: ['Brand depth', 'E-E-A-T support', 'Assisted conversion'],
      asideTitle: 'Tinh than can giu xuyen suot',
      asideItems: [
        'Khong ban truc tiep qua manh tren page nay.',
        'No phai tang trust va chuan bi cho giai doan so sanh.',
        'No phai link sang pillars va PDR de user di sau hon.',
        'Giong dieu can am, ro, tu tin va khong khoa truong.',
      ],
    },
    stats: [
      { value: 'Vui ve', label: 'Tre can mot moi truong tich cuc de mo long va hoc that' },
      { value: 'Thuc dung', label: 'Moi hoat dong deu phai huong den nang luc song va hoc tap cu the' },
      { value: 'Ky luat', label: 'Ky luat duoc day nhu mot ky nang, khong phai su ap dat' },
      { value: 'Dong hanh', label: 'Gia dinh va nha truong cung nhau tao rhythm tien bo' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Cot loi triet ly',
        title: 'Bon y lon ma trang nay can lam ro.',
        intro:
          'Neu chi noi “lay hoc sinh lam trung tam” thi qua chung. Viet Anh can dien giai bang logic ma phu huynh co the cam thay trong doi song hoc tap moi ngay.',
        columns: 2,
        items: [
          {
            title: 'Hanh phuc de mo cua hoc tap',
            body:
              'Tre hoc tot hon khi duoc ton trong, duoc nghe, duoc sai va duoc huong dan cach sua. Hanh phuc la dieu kien de tre san sang hoc, khong phai phan thuong sau cung.',
          },
          {
            title: 'Tinh thuc dung trong giao duc',
            body:
              'Kien thuc can duoc bien thanh kha nang lap ke hoach, hop tac, giao tiep, tu danh gia va su dung ngon ngu de giai quyet tinh huong that.',
          },
          {
            title: 'Ky luat nhan van',
            body:
              'Ky luat khong dong nghia voi ap luc. Tre can duoc huong dan cach xay thoi quen va chiu trach nhiem voi ke hoach cua minh.',
          },
          {
            title: 'Tieng Anh la nang luc song',
            body:
              'Tieng Anh khong chi la mot mon hoc de thi, ma la mot cong cu de tre tim hieu the gioi va tu tin trong giao tiep.',
          },
        ],
      },
      {
        type: 'quote',
        eyebrow: 'Thuong hieu can mot cau neo',
        title: 'Trang nay can co mot “brand sentence” de nguoi doc nho.',
        quote:
          'Chung toi khong chon cach day nhanh hon. Chung toi chon cach day sao cho tre biet minh dang hoc vi dieu gi, tien bo the nao va co the dung kien thuc vao cuoc song ra sao.',
        attribution: 'Editorial note cho voice cua Truong Viet Anh',
      },
      {
        type: 'links',
        eyebrow: 'Noi sang noi dung sau hon',
        title: 'Ba huong di tiep theo tu triet ly giao duc.',
        intro:
          'Neu triet ly da duoc dong y, user can co duong di sang pages “xac minh” triet ly do bang he thong, cap hoc va hanh dong.',
        items: [
          {
            eyebrow: 'Signature system',
            title: 'He Thong PDR',
            href: '/he-thong-pdr',
            body: 'Trang cho thay triet ly duoc bien thanh quy trinh hoc tap lap di lap lai nhu the nao.',
          },
          {
            eyebrow: 'Pillar',
            title: 'Mam Non',
            href: '/mam-non',
            body: 'Xem triet ly duoc trien khai ra sao trong giai doan dau doi, noi phu huynh thuong co nhieu lo lang nhat.',
          },
          {
            eyebrow: 'Admissions',
            title: 'Tuyen Sinh',
            href: '/tuyen-sinh',
            body: 'Khi phu huynh muon tiep tuc di sau vao quy trinh va hanh dong, admissions hub la diem chuyen hop ly nhat.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ triet ly',
        title: 'Ba lo lang thuong gap cua phu huynh khi nghe ve “giao duc hanh phuc”.',
        intro:
          'Muc nay duoc viet de tranh hieu nham rang hanh phuc dong nghia voi de dai hay giam ky luat.',
        items: [
          {
            question: 'Giao duc hanh phuc co lam giam ky luat khong?',
            answer:
              'Khong. Viet Anh xem ky luat la mot phan cua nang luc tu chu. Tre duoc day cach lap ke hoach, hoan thanh va tu danh gia ket qua.',
          },
          {
            question: 'Tinh thuc dung co lam mat di chieu sau hoc thuat khong?',
            answer:
              'Nguoc lai, no giup hoc thuat co y nghia hon. Kien thuc duoc noi voi hanh dong, bai tap duoc noi voi ky nang song va tu duy.',
          },
          {
            question: 'Phu huynh nen doc tiep trang nao neu muon biet cach lam cu the?',
            answer:
              'Trang He Thong PDR va cac pillar page se cho thay triet ly do duoc trien khai o tung cap hoc mot cach cu the ra sao.',
          },
        ],
      },
    ],
  },
  {
    slug: 'he-thong-pdr',
    title: 'He Thong PDR Tai Truong Viet Anh',
    description:
      'Trang signature asset mo ta cach Truong Viet Anh van hanh Plan - Do - Review de tao nang luc tu hoc, tu chu va kha nang phan tu cho hoc sinh.',
    templateClass: 'Authority Page / Signature System',
    pageType: 'Moat page',
    theme: 'brand',
    hero: {
      eyebrow: 'Signature Asset Page',
      title: 'PDR la cach Viet Anh bien muc tieu hoc tap thanh mot nhiep dieu ro rang moi ngay.',
      body:
        'PDR khong phai mot khau hieu dep. Do la mot he thong giup hoc sinh lap ke hoach, thuc hien, roi tu nhin lai va cai tien. Trang nay phai dong vai tro “moat page”: ai doc xong cung hieu vi sao Viet Anh khac biet.',
      primaryCta: { label: 'Xem cap hoc ap dung PDR', href: '/mam-non' },
      secondaryCta: { label: 'Trao doi voi tuyen sinh', href: '/tuyen-sinh' },
      badges: ['Signature asset', 'Trust moat', 'Internal link hub'],
      asideTitle: '3 dieu page nay phai lam duoc',
      asideItems: [
        'Dinh nghia PDR bang ngon ngu de hieu voi phu huynh, khong qua hoc thuat.',
        'Cho thay PDR duoc ap dung o tung cap hoc, khong chi ton tai tren slide.',
        'Lien ket PDR voi loi ich cu the: tu chu, phan tu, giao tiep, trach nhiem.',
      ],
    },
    stats: [
      { value: 'Plan', label: 'Hoc sinh biet minh se lam gi va vi sao' },
      { value: 'Do', label: 'Hoc sinh tap thuc hien voi muc tieu va timebox ro rang' },
      { value: 'Review', label: 'Hoc sinh tu nhin lai de rut kinh nghiem va cai tien' },
      { value: 'Lap lai', label: 'Tien bo den tu nhiep dieu, khong den tu cam hung ngau nhien' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Plan - Do - Review',
        title: 'Ba buoc nghe don gian, nhung la cot song cua nang luc tu hoc.',
        intro:
          'Trang nay nen viet nhu mot trang “giai thich he thong” thay vi mot bai PR. Moi buoc can noi duoc hanh vi cu the ma hoc sinh se lam.',
        items: [
          {
            title: 'Plan',
            body:
              'Hoc sinh hoc cach dat muc tieu, chia nho cong viec, du kien kho khan va biet minh can ho tro gi. Day la buoc giup tre thoat khoi hoc vo dinh.',
          },
          {
            title: 'Do',
            body:
              'Tre thuc hien ke hoach trong mot rhythm ro rang: vao viec, hoan thanh, giao tiep voi thay co va hop tac voi ban be.',
          },
          {
            title: 'Review',
            body:
              'Sau moi chu ky, hoc sinh nhin lai ket qua, nhan biet diem tot, diem can sua va cai gi se thay doi o lan tiep theo.',
          },
        ],
      },
      {
        type: 'cards',
        eyebrow: 'PDR theo cap hoc',
        title: 'Cung la PDR, nhung mo hinh the hien se thay doi theo do tuoi.',
        intro:
          'Muc nay vua lam ro he thong, vua tao internal links rat tu nhien sang 4 pillar pages.',
        columns: 2,
        items: [
          {
            title: 'Mam Non',
            body:
              'PDR duoc the hien qua nhung viec rat nho: be biet chuan bi, hoan thanh, sap xep va chia se lai nhung gi minh da lam.',
            href: '/mam-non',
            cta: 'Xem pillar Mam Non',
          },
          {
            title: 'Tieu Hoc',
            body:
              'Hoc sinh tap lap ke hoach hoc tap co huong dan, theo doi tien do va phan hoi voi bai tap, du an, thoi quen hoc.',
            href: '/tieu-hoc',
            cta: 'Xem pillar Tieu Hoc',
          },
          {
            title: 'Trung Hoc Co So',
            body:
              'THCS la giai doan PDR tang do kho: hoc sinh can tu quan ly bai tap, group work, thuyet trinh va trach nhiem ca nhan.',
            href: '/trung-hoc-co-so',
            cta: 'Xem pillar THCS',
          },
          {
            title: 'Trung Hoc Pho Thong',
            body:
              'THPT dung PDR de noi muc tieu hoc tap voi IELTS, portfolio, dinh huong dai hoc va kha nang tu hoc ben vung.',
            href: '/trung-hoc-pho-thong',
            cta: 'Xem pillar THPT',
          },
        ],
      },
      {
        type: 'quote',
        eyebrow: 'Proof angle',
        title: 'PDR can duoc doc nhu mot loi giai cho “vi sao con can tu chu”.',
        quote:
          'Neu mot hoc sinh chi lam khi co nguoi nhac, em ay dang hoc duoc kien thuc nhung chua xay duoc nang luc. PDR duoc thiet ke de bien viec hoc thanh mot qua trinh co y thuc va co kha nang tu dieu chinh.',
        attribution: 'Trang signature asset cua Truong Viet Anh',
      },
      {
        type: 'faq',
        eyebrow: 'FAQ PDR',
        title: 'FAQ ngan de phu huynh khong bi “nghet” boi thuat ngu.',
        intro:
          'Trang nay can rat de hieu. FAQ duoi day la phan dich PDR sang ngon ngu doi thuong.',
        items: [
          {
            question: 'PDR co phai mot mon hoc rieng khong?',
            answer:
              'Khong. Day la he thong van hanh cach hoc. No chay xuyen qua bai tap, du an, giao tiep va cach hoc sinh tu danh gia tien bo.',
          },
          {
            question: 'PDR co giup tre biet tu hoc that khong?',
            answer:
              'Do la muc tieu trung tam. Khi tre biet lap ke hoach, thuc hien va xem lai, tre dan co kha nang tu hoc ben vung hon.',
          },
          {
            question: 'Sau khi doc page nay, phu huynh nen xem tiep gi?',
            answer:
              'Tot nhat la sang pillar page cua cap hoc phu hop voi con de thay PDR duoc thiet ke cu the ra sao trong tung giai doan.',
          },
        ],
      },
    ],
  },
  {
    slug: 'mam-non',
    title: 'Mam Non Truong Viet Anh',
    description:
      'Pillar page cap hoc mam non cua Truong Viet Anh, nhan manh moi truong song ngu, thich nghi an toan va phat trien cam xuc cho be.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'Mam non Viet Anh duoc thiet ke de be thay an tam, vui ve va san sang hoc tu ngay dau.',
      body:
        'Trang pillar nay co vai tro bat keyword cap hoc, giai thich chuong trinh va route phu huynh sang Tuyen Sinh hoac Hoc Phi ma khong can day user vao form qua som. Noi dung uu tien: thich nghi, an toan, song ngu va phat trien cam xuc.',
      primaryCta: { label: 'Bat dau tu tuyen sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Xem hoc phi mam non', href: '/hoc-phi' },
      badges: ['SEO pillar', 'Parent trust', 'Admissions bridge'],
      asideTitle: 'Intent chinh cua phu huynh mam non',
      asideItems: [
        'Con co hoa nhap duoc khong?',
        'Moi truong co an toan va co nen nep khong?',
        'Tieng Anh va giao tiep duoc day the nao?',
        'Hoc phi va quy trinh nhap hoc bat dau tu dau?',
      ],
    },
    stats: [
      { value: '18 thang+', label: 'Do tuoi co the bat dau lam quen voi moi truong hoc' },
      { value: 'Song ngu', label: 'Tieng Anh duoc dua vao nhe nhang, gan voi sinh hoat' },
      { value: 'Thich nghi', label: 'Chu de lon nhat cua giai doan dau doi duoc dat len dau' },
      { value: 'PDR nhe', label: 'Be tap nhan biet va hoan thanh viec nho moi ngay' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Curriculum Highlights',
        title: 'Bon nhom gia tri ma phu huynh mam non thuong tim kiem.',
        intro:
          'Pillar mam non can noi ro hon ca “chuong trinh hay”. No phai tra loi ve cam xuc, an toan va trai nghiem song ngu hang ngay.',
        columns: 2,
        items: [
          {
            title: 'Thich nghi nhe nhang',
            body:
              'Lop hoc va giao vien duoc to chuc de be chuyen tu sinh hoat gia dinh sang sinh hoat truong hoc mot cach an toan va co support.',
          },
          {
            title: 'Phat trien cam xuc',
            body:
              'Tre hoc cach goi ten cam xuc, cho den luot, hop tac va hinh thanh nhung ne nep dau doi song song voi kien thuc nen tang.',
          },
          {
            title: 'Tieng Anh thong qua trai nghiem',
            body:
              'Tieng Anh duoc dua vao bai hat, tro choi, giao tiep va cac chu de gan gui de tre co phan xa tu nhien hon.',
          },
          {
            title: 'Moi truong co nhiep dieu',
            body:
              'Mot ngay cua be duoc chia rhythm ro rang: don tre, hoc - choi, ngu trua, van dong, review cuoi ngay voi nhieu tin hieu quen thuoc.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Day in life',
        title: 'Mot ngay o khoi mam non can duoc hinh dung that ro.',
        intro:
          'Section nay dong vai tro “giam lo au” cho phu huynh. Cang cu the, pillar cang de chuyen doi sang trang tuyen sinh.',
        items: [
          {
            title: 'Buoi sang binh tinh va co welcome ritual',
            body:
              'Be duoc don trong mot khong khi quen thuoc, co giao tiep tay voi phu huynh va giup be chuyen mood sang moi truong hoc.',
          },
          {
            title: 'Cac khoi hoat dong ngan, nhieu chuyen dong',
            body:
              'Tre o do tuoi nay can nhieu khoang nho de hoc, choi, nghe, noi va van dong xen ke. Mot rhythm tot quan trong hon viec nhieu kien thuc.',
          },
          {
            title: 'Review nhe de tre biet minh da lam duoc gi',
            body:
              'Ngay tu mam non, tre da duoc tap nhin lai nhung viec nho minh da hoan thanh. Day la phien ban rat som cua PDR.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Internal link hub',
        title: 'Ba diem re nhanh phu hop nhat tu pillar mam non.',
        intro:
          'Day la cac link can co de gom phu huynh ve dung hanh dong thay vi de ho luon quan trong.',
        items: [
          {
            eyebrow: 'Admissions',
            title: 'Tuyen Sinh',
            href: '/tuyen-sinh',
            body: 'Diem vao phu hop neu phu huynh muon biet quy trinh dang ky va buoc tiep theo.',
          },
          {
            eyebrow: 'Money intent',
            title: 'Hoc Phi',
            href: '/hoc-phi',
            body: 'Phu hop voi nhom dang tim gia va muon co muc preview minh bach truoc khi goi.',
          },
          {
            eyebrow: 'Brand depth',
            title: 'Triet Ly Giao Duc',
            href: '/triet-ly-giao-duc',
            body: 'Diem doc tiep cho nhom phu huynh can xac nhan su phu hop ve gia tri va cach day tre.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ mam non',
        title: 'Nhung cau hoi co intent chuyen doi cao nhat o khoi mam non.',
        intro:
          'FAQ duoi pillar page giup bat PAA, giam do day cua sales va ho tro phu huynh ra quyet dinh nhanh hon.',
        items: [
          {
            question: 'Be nhut nhat co hoa nhap duoc khong?',
            answer:
              'Day la mot trong nhung noi lo lon nhat, va cung la ly do Viet Anh uu tien rhythm don tre, giao tiep nhe va mot moi truong an toan de be thich nghi tu tu.',
          },
          {
            question: 'Phu huynh nen bat dau tu trang nao neu muon dang ky?',
            answer:
              'Tuyen Sinh la diem vao tot nhat. Neu phu huynh dang so sanh chi phi, co the di tiep sang Hoc Phi.',
          },
          {
            question: 'Tieng Anh o mam non duoc day ra sao?',
            answer:
              'Qua bai hat, tro choi, giao tiep va cac chu de gan gui, de be hinh thanh phan xa ngon ngu song song voi trai nghiem vui.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tieu-hoc',
    title: 'Tieu Hoc Truong Viet Anh',
    description:
      'Pillar page tieu hoc cua Truong Viet Anh, nhan manh can bang hoc thuat, tieng Anh, PDR va ne nep tu hoc cho hoc sinh.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'Tieu hoc Viet Anh duoc xay de hoc sinh vua co ne nep hoc tap, vua giu duoc su ham hoc va tinh chu dong.',
      body:
        'Trang pillar nay phuc vu nhom phu huynh dang so sanh rat manh ve chuong trinh, tieng Anh, giao vien va hoc phi. Vi vay no can can bang giua authority, internal link va conversion support.',
      primaryCta: { label: 'Xem admissions hub', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Xem hoc phi toan cap', href: '/hoc-phi' },
      badges: ['Seed keyword page', 'Intent match', 'Trust builder'],
      asideTitle: 'Thong diep chinh cho phu huynh tieu hoc',
      asideItems: [
        'Hoc sinh duoc day cach hoc, khong chi hoc de hoan thanh bai.',
        'Tieng Anh va ne nep duoc di cung nhau, khong danh doi.',
        'PDR la khung giup hoc sinh tu chu hon moi hoc ky.',
        'CTA mem nhung ro rang: hoc phi, tuyen sinh, trang thuong hieu.',
      ],
    },
    stats: [
      { value: 'Can bang', label: 'Hoc thuat, tieng Anh va ne nep di song song' },
      { value: 'PDR', label: 'Hoc sinh tap lap ke hoach hoc va tu review' },
      { value: 'Tieng Anh', label: 'Ngon ngu duoc dung trong nhieu hoat dong co chu dich' },
      { value: 'Tu hoc', label: 'Nang luc tu hoc duoc xem la dau ra lau dai' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Curriculum Highlights',
        title: 'Trang pillar tieu hoc can cho thay “cham vao ket qua” nhu the nao.',
        intro:
          'Phu huynh cap tieu hoc quan tam ca kien thuc nen tang lan ky nang hoc. Vi vay section nay can rat ro ve structure.',
        columns: 2,
        items: [
          {
            title: 'Nen tang hoc thuat chac',
            body:
              'Hoc sinh duoc xay chac cac mon cot loi, dong thoi hoc cach to chuc bai tap, ghi nho va theo doi tien do cua minh.',
          },
          {
            title: 'Tieng Anh co chu dich',
            body:
              'Tieng Anh khong chi la tiet hoc rieng, ma la mot phan cua moi truong giao tiep va tu duy, de hoc sinh su dung ngon ngu nhu mot cong cu.',
          },
          {
            title: 'Du an va trinh bay',
            body:
              'Tre duoc tap thuyet trinh, lam viec nhom va trinh bay suy nghi tu som, tu do tu tin hon trong lop hoc va ngoai doi song.',
          },
          {
            title: 'Ne nep hoc tap ben vung',
            body:
              'Ky luat duoc day qua nhung viec rat cu the: chuan bi, hoan thanh, phan hoi va review lai cach hoc cua minh.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Learning rhythm',
        title: 'Bon lop trai nghiem ma phu huynh can hinh dung ro o cap tieu hoc.',
        intro:
          'Phu huynh khong chi mua chuong trinh. Ho mua mot nhiep dieu hoc tap ma con co the theo duoc nhieu nam lien.',
        items: [
          {
            title: 'Bat dau bang muc tieu ngay hoc',
            body:
              'Hoc sinh biet hom nay minh can dat dieu gi, bai hoc nao can tap trung va se review ra sao vao cuoi ngay.',
          },
          {
            title: 'Hoc qua hoat dong co dinh huong',
            body:
              'Tiet hoc duoc to chuc de hoc sinh tham gia, tra loi, hop tac va ghi nho qua hanh dong, khong chi nghe thu dong.',
          },
          {
            title: 'Tieng Anh va giao tiep duoc lap lai co chu dich',
            body:
              'Tre duoc tiep xuc ngon ngu theo chu de va ngu canh ro rang de co kha nang su dung that, khong chi hoc de tra bai.',
          },
          {
            title: 'Review de xay thoi quen tu hoc',
            body:
              'Hoc sinh duoc huong dan nhin lai cach lam bai, cach dat muc tieu va cach phoi hop voi giao vien, gia dinh.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ tieu hoc',
        title: 'Cac cau hoi co y nghia lon nhat voi conversion o pillar tieu hoc.',
        intro:
          'Nhung FAQ nay duoc viet de ho tro doi tuyen sinh, dong thoi tao kha nang bat long-tail queries co intent manh.',
        items: [
          {
            question: 'Tieu hoc Viet Anh co qua ap luc khong?',
            answer:
              'Pillar nay can lam ro rang muc tieu khong phai tao ap luc som, ma la xay nen nep hoc tap va kha nang tu hoc co huong dan.',
          },
          {
            question: 'Phu huynh nen xem hoc phi truoc hay admissions truoc?',
            answer:
              'Neu dang so sanh chi phi, vao Hoc Phi truoc. Neu muon biet quy trinh, giay to va buoc tiep theo, vao Tuyen Sinh.',
          },
          {
            question: 'PDR giup hoc sinh tieu hoc the nao?',
            answer:
              'No giup hoc sinh biet lap ke hoach nho, theo doi bai tap, review lai cach hoc va dan dan hinh thanh tinh tu chu.',
          },
        ],
      },
    ],
  },
  {
    slug: 'trung-hoc-co-so',
    title: 'Trung Hoc Co So Truong Viet Anh',
    description:
      'Pillar page THCS cua Truong Viet Anh, tap trung vao lo trinh hoc thuat, tieng Anh, PDR va ky nang tu chu cho hoc sinh.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'THCS la giai doan hoc sinh can mot lo trinh ro rang de vua lon len, vua khong mat nhiep hoc.',
      body:
        'Trang pillar THCS phai noi duoc mot dieu rat quan trong: day la giai doan chuyen tiep de hoc sinh tang toc hoc thuat, tieng Anh va ky nang tu hoc ma khong bi qua tai. Noi dung can giup phu huynh thay duoc su ro rang ve he thong.',
      primaryCta: { label: 'Xem quy trinh tuyen sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Tham khao hoc phi THCS', href: '/hoc-phi' },
      badges: ['THCS authority', 'Mid-funnel support', 'Admissions bridge'],
      asideTitle: 'Cac objection can duoc xu ly',
      asideItems: [
        'Chu trinh hoc co qua nang khong?',
        'Tieng Anh duoc day o muc nao?',
        'Hoc sinh co duoc huong dan cach tu hoc that khong?',
        'THCS co duong link tu nhien sang THPT va hoc phi hay khong?',
      ],
    },
    stats: [
      { value: 'Lo trinh', label: 'THCS duoc nhin nhu giai doan tang toc co huong dan' },
      { value: 'Tieng Anh', label: 'Gia tang kha nang ngon ngu va su tu tin' },
      { value: 'PDR', label: 'Hoc sinh tu quan ly bai tap va group work tot hon' },
      { value: 'Dinh huong', label: 'San sang cho THPT, IELTS va du an lon hon' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'THCS priorities',
        title: 'Bon diem can rat ro tren pillar THCS.',
        intro:
          'Nhieu phu huynh bat dau so sanh rat ky tu THCS. Trang nay vi vay can chat ve logic va co internal links dung luc.',
        columns: 2,
        items: [
          {
            title: 'Hoc thuat co cau truc',
            body:
              'Hoc sinh co mot rhythm hoc tap ro rang hon, biet cach quan ly deadline, project va bai kiem tra theo mot lo trinh co support.',
          },
          {
            title: 'Tieng Anh de mo rong tu duy',
            body:
              'Tieng Anh duoc day de hoc sinh co the doc, nghe, noi va trinh bay suy nghi tu tin hon trong mon hoc va hoat dong du an.',
          },
          {
            title: 'PDR tang cap',
            body:
              'THCS la luc PDR khong chi la thoi quen nho nua, ma tro thanh mot he thong giup hoc sinh tu dieu chinh cach hoc.',
          },
          {
            title: 'Ky nang the ky 21',
            body:
              'Thuyet trinh, hop tac, phan bien va trach nhiem duoc dua vao cach hoc moi ngay de hoc sinh truong thanh hon.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Internal links can co',
        title: 'Ba trang ma THCS phai day user toi mot cach co chu dich.',
        intro:
          'Page nay phai lam viec nhu hub: vua giu authority, vua don luc chuyen doi ve hoc phi va admissions.',
        items: [
          {
            eyebrow: 'Signature system',
            title: 'He Thong PDR',
            href: '/he-thong-pdr',
            body: 'Giup phu huynh nhin ro co che van hanh cua kha nang tu hoc va phan tu.',
          },
          {
            eyebrow: 'Next stage',
            title: 'Trung Hoc Pho Thong',
            href: '/trung-hoc-pho-thong',
            body: 'Cho thay lo trinh THCS khong tach roi ma dan len THPT mot cach logic.',
          },
          {
            eyebrow: 'Commercial support',
            title: 'Hoc Phi',
            href: '/hoc-phi',
            body: 'Noi user co the xem minh bach cac muc hoc phi va huong tu van tiep theo.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ THCS',
        title: 'Cau hoi hay gap nhat truoc khi phu huynh chuyen sang giai doan ra quyet dinh.',
        intro:
          'Nhung cau hoi nay duoc viet de cat giam ma sat o mid-funnel va tao kha nang rank tot hon cho long-tail.',
        items: [
          {
            question: 'THCS Viet Anh co thien ve hoc thuat hay ky nang?',
            answer:
              'Trang nay phai truyen tai ro mot thong diep: day la mo hinh can bang, trong do hoc thuat, tieng Anh va nang luc tu hoc duoc xay dong thoi.',
          },
          {
            question: 'PDR co giup hoc sinh THCS giam phu thuoc vao nhac nho khong?',
            answer:
              'Do chinh la muc tieu. THCS la giai doan hoc sinh bat dau can mot he thong de tu quan ly bai tap, thoi gian va cach hoc cua minh.',
          },
          {
            question: 'Neu phu huynh dang can gia hoac quy trinh ngay, nen vao dau?',
            answer:
              'Hoc Phi giai quyet intent thuong mai. Tuyen Sinh giai quyet intent hanh dong. Hai pages nay duoc thiet ke de ho tro trực tiep cho pillar THCS.',
          },
        ],
      },
    ],
  },
  {
    slug: 'trung-hoc-pho-thong',
    title: 'Trung Hoc Pho Thong Truong Viet Anh',
    description:
      'Pillar page THPT cua Truong Viet Anh, nhan manh lo trinh IELTS, dinh huong dai hoc, PDR va su chu dong cua hoc sinh.',
    templateClass: 'Class Level Pillar',
    pageType: 'Pillar page',
    theme: 'pillar',
    hero: {
      eyebrow: 'Level Pillar',
      title: 'THPT Viet Anh duoc xay de hoc sinh biet minh hoc vi dieu gi, dang chuan bi cho buoc tiep theo nao.',
      body:
        'THPT la trang pillar co intent rat gan conversion. Phu huynh va hoc sinh thuong so sanh manh ve dau ra, IELTS, dinh huong dai hoc va hoc phi. Vi vay page nay phai vua ro ve authority, vua ro ve next step.',
      primaryCta: { label: 'Bat dau tu tuyen sinh', href: '/tuyen-sinh' },
      secondaryCta: { label: 'Xem trang hoc phi', href: '/hoc-phi' },
      badges: ['THPT pillar', 'Commercial assist', 'Outcome-led'],
      asideTitle: 'Cac proof point can duoc goi dung',
      asideItems: [
        'Lo trinh hoc va dinh huong sau THPT.',
        'Tieng Anh / IELTS / kha nang trinh bay.',
        'PDR nhu mot bo khung giup hoc sinh tu chiu trach nhiem.',
        'CTA phai dan den hanh dong, khong chi mo ta.',
      ],
    },
    stats: [
      { value: 'IELTS', label: 'Tieng Anh duoc dat trong boi canh dau ra va dinh huong' },
      { value: 'PDR', label: 'Hoc sinh tu lap ke hoach va theo doi muc tieu hoc tap' },
      { value: 'Portfolio', label: 'Trinh bay nang luc va qua trinh tien bo ro rang hon' },
      { value: 'Dai hoc', label: 'Moi mon hoc duoc noi ve nhung lua chon phia truoc' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Outcome structure',
        title: 'Bon lop gia tri can xuat hien ro rang o THPT.',
        intro:
          'Day la trang pillar “gan tien” nhat trong 4 cap hoc, nen no can noi rat ro ve dau ra va su san sang cho giai doan sau pho thong.',
        columns: 2,
        items: [
          {
            title: 'Lo trinh hoc thuat co dinh huong',
            body:
              'Hoc sinh khong chi hoc de xong chuong trinh, ma hoc trong mot khung co muc tieu ro rang hon ve dai hoc, ky nang va profile ca nhan.',
          },
          {
            title: 'Tieng Anh va IELTS',
            body:
              'Tieng Anh duoc nhin nhu nang luc can de hoc tap va buoc ra the gioi rong hon, khong chi la mot cot diem.',
          },
          {
            title: 'PDR va su chu dong ca nhan',
            body:
              'THPT la giai doan hoc sinh phai tu lap ke hoach, tu quan ly ap luc va biet review de cai tien cach hoc cua chinh minh.',
          },
          {
            title: 'Trinh bay, du an, portfolio',
            body:
              'Hoc sinh can kha nang giao tiep, trinh bay va tong hop trai nghiem - day la mot phan cua dau ra, khong phai phan phu.',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Decision journey',
        title: 'THPT page can dan user qua ba lop quyet dinh.',
        intro:
          'Neu khong co trinh tu ro rang, trang se de roi vao tinh trang “co ve uy tin nhung kho hanh dong”.',
        items: [
          {
            title: 'Hieu ro outcome',
            body:
              'Truoc tien, phu huynh can biet hoc sinh se duoc chuan bi cho gi: hoc thuat, ngon ngu, tu chu va con duong phia sau THPT.',
          },
          {
            title: 'Xac minh bang he thong',
            body:
              'Sau do, ho can thay PDR va cach to chuc hoc tap cua truong du suc de dua hoc sinh den outcome do.',
          },
          {
            title: 'Hanh dong qua admissions va hoc phi',
            body:
              'Cuoi cung, phai co duong ro sang Tuyen Sinh va Hoc Phi de user khong bi dung lai chi vi page qua “authority” ma thieu next step.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ THPT',
        title: 'FAQ duoc viet theo intent BOFU hon ba pillar con lai.',
        intro:
          'No ho tro phu huynh ra quyet dinh nhanh hon va giup doi tuyen sinh xu ly objection co he thong.',
        items: [
          {
            question: 'THPT Viet Anh co thien ve IELTS va du hoc hay khong?',
            answer:
              'Trang nay can dien giai ro rang: tieng Anh va IELTS la mot phan cua lo trinh nang luc, dong hanh cung hoc thuat, tu chu va dinh huong sau THPT.',
          },
          {
            question: 'Hoc sinh THPT co duoc huong dan cach tu hoc that su khong?',
            answer:
              'Co. PDR la bo khung giup hoc sinh tu lap ke hoach, theo doi muc tieu va review qua trinh hoc cua minh mot cach ro rang hon.',
          },
          {
            question: 'Phu huynh nen lam gi tiep theo neu thay phu hop?',
            answer:
              'Trang Tuyen Sinh la diem vao phu hop nhat de bat dau, con Hoc Phi phuc vu nhu cau tham khao chi phi va tu van theo level.',
          },
        ],
      },
    ],
  },
  {
    slug: 'tuyen-sinh',
    title: 'Tuyen Sinh Truong Viet Anh',
    description:
      'Admissions hub cua Truong Viet Anh, giai thich quy trinh tuyen sinh, cac moc hanh dong va cach phu huynh bat dau tu van nhanh.',
    templateClass: 'Admissions Hub',
    pageType: 'Conversion hub',
    theme: 'admissions',
    hero: {
      eyebrow: 'Admissions Hub',
      title: 'Khi phu huynh da san sang hanh dong, trang tuyen sinh can giai quyet friction that nhanh.',
      body:
        'Day la conversion hub cua dot launch dau tien. No khong can qua nhieu van hoa. No can ro quy trinh, ro CTA va ro cach route phu huynh sang level phu hop, hoc phi hoac cuoc goi tu van.',
      primaryCta: { label: 'Goi ngay cho doi tu van', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Xem hoc phi', href: '/hoc-phi' },
      badges: ['Admissions funnel', 'Conversion hub', 'Low-friction routing'],
      asideTitle: 'Ba viec admissions hub phai lam ngay',
      asideItems: [
        'Giai thich quy trinh mot cach ngan gon, khong hanh chinh hoa.',
        'Cho phu huynh thay 4 cap hoc deu co duong vao ro rang.',
        'Tao nhieu next-step don gian: goi, zalo, hoc phi, pillar pages.',
      ],
    },
    stats: [
      { value: '4 buoc', label: 'Tu quan tam den xac nhan nhap hoc' },
      { value: '4 cap hoc', label: 'Mot hub dung cho toan he thong' },
      { value: 'Call / Zalo', label: 'Hai kenh nhu cau hanh dong nhanh nhat' },
      { value: 'Pillar-linked', label: 'Moi level page deu day duoc ve day' },
    ],
    sections: [
      {
        type: 'steps',
        eyebrow: 'Admissions flow',
        title: 'Quy trinh tuyen sinh can ro den muc phu huynh chi can doc 1 phut la biet minh dang o dau.',
        intro:
          'Day la core logic cua conversion hub. Khi quy trinh ro, phu huynh it tri hoan hon va sales goi lai cung de chot hon.',
        items: [
          {
            title: 'Buoc 1: Xac dinh cap hoc phu hop',
            body:
              'Neu phu huynh chua ro, hay bat dau tu 4 pillar pages. Moi trang cap hoc se giai thich chuong trinh, triet ly va intent tiep theo.',
          },
          {
            title: 'Buoc 2: Lam ro hoc phi va muc quan tam',
            body:
              'Trang Hoc Phi cung cap range va logic chi phi. Muc tieu la giam do ma sat truoc khi vao tu van chi tiet.',
          },
          {
            title: 'Buoc 3: Goi, chat hoac hen lich',
            body:
              'Doi admissions co the tiep nhan thong tin qua cuoc goi hoac Zalo, sau do dieu phoi buoc tiep theo cho dung cap hoc.',
          },
          {
            title: 'Buoc 4: Chot hanh dong tiep theo',
            body:
              'Sau khi du thong tin, phu huynh duoc dinh huong sang assessment, tham quan hoac xu ly ho so nhap hoc o phase tiep theo.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Quick routes',
        title: 'Ba luong hanh dong ma admissions hub can route that nhanh.',
        intro:
          'Links duoi day vua la block dieu huong, vua la internal linking support cho 4 pillars va money page.',
        items: [
          {
            eyebrow: 'Cap hoc',
            title: 'Bat dau tu Mam Non',
            href: '/mam-non',
            body: 'Diem vao cho nhom phu huynh can thong tin cap hoc truoc khi quyet dinh tiep.',
          },
          {
            eyebrow: 'Cap hoc',
            title: 'Bat dau tu Tieu Hoc',
            href: '/tieu-hoc',
            body: 'Phu hop voi nhom dang so sanh chuong trinh va can bang hoc thuat - tieng Anh.',
          },
          {
            eyebrow: 'Commercial',
            title: 'Vao thang Hoc Phi',
            href: '/hoc-phi',
            body: 'Diem re nhanh cho user BOFU muon lam ro range chi phi va muc do phu hop.',
          },
        ],
      },
      {
        type: 'cards',
        eyebrow: 'CTA support',
        title: 'Hai kieu user admissions hub can phuc vu cung luc.',
        intro:
          'Neu chỉ co mot CTA, page se mat mot nua nhu cau. Day la ly do block nay can ton tai o gan cuoi trang.',
        columns: 2,
        items: [
          {
            title: 'Nhom can thong tin nhanh',
            body:
              'Voi nhom nay, hotline va Zalo la kenh ma sat thap nhat. Ho can co ngay so dien thoai va duoc huong dan tiep theo nhanh.',
          },
          {
            title: 'Nhom can do sau truoc khi lien he',
            body:
              'Voi nhom nay, pillar pages va Hoc Phi la noi de tiep tuc doc. Admissions hub co nhiem vu route, khong can giam do sau noi dung.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ tuyen sinh',
        title: 'Nhung cau hoi admissions hub phai xu ly rat gon.',
        intro:
          'Bo FAQ nay giup giam call lap lai va ho tro SEO cho nhung truy van co intent hanh dong.',
        items: [
          {
            question: 'Neu chua chac cap hoc nao phu hop thi bat dau tu dau?',
            answer:
              'Bat dau tu trang pillar cua cap hoc gan nhat voi do tuoi hien tai cua con, sau do quay lai admissions hub de tiep tuc hanh dong.',
          },
          {
            question: 'Neu muon biet chi phi truoc khi goi thi sao?',
            answer:
              'Trang Hoc Phi duoc thiet ke chinh xac cho muc dich do. Sau khi co hinh dung range, phu huynh co the goi admissions de duoc tu van cu the hon.',
          },
          {
            question: 'Admissions hub co phai trang dang ky form khong?',
            answer:
              'Trong dot launch dau tien, no la trang dieu huong low-friction: goi, chat Zalo, hoc phi va 4 pillar pages. Form chuyen sau se duoc them o wave tiep theo.',
          },
        ],
      },
    ],
  },
  {
    slug: 'hoc-phi',
    title: 'Hoc Phi Truong Viet Anh',
    description:
      'Money page cua Truong Viet Anh, trinh bay range hoc phi theo cap hoc, logic gia tri va cach tiep tuc nhan bang hoc phi chi tiet qua doi tuyen sinh.',
    templateClass: 'Money Page / Fee Support',
    pageType: 'Commercial intent page',
    theme: 'tuition',
    hero: {
      eyebrow: 'Money Page',
      title: 'Trang hoc phi can minh bach du de tao niem tin, nhung van giu duoc duong day tu van chi tiet.',
      body:
        'Day la money page quan trong nhat cua dot launch dau tien. No khong co muc tieu “an” thong tin. No co muc tieu giup phu huynh hinh dung range hoc phi, hieu cau truc gia tri va di tiep sang hanh dong phu hop.',
      primaryCta: { label: 'Goi de nhan tu van hoc phi', href: contactLinks.phoneHref },
      secondaryCta: { label: 'Quay ve tuyen sinh', href: '/tuyen-sinh' },
      badges: ['Commercial intent', 'Friction reducer', 'Sales support'],
      asideTitle: 'Money page nay duoc xay cho 3 intent',
      asideItems: [
        'Nguoi dang so sanh range hoc phi.',
        'Nguoi can xac nhan co “dang tien” hay khong.',
        'Nguoi muon biet buoc tiep theo de nhan bang phi chi tiet.',
      ],
    },
    stats: [
      { value: '4 levels', label: 'Preview hoc phi theo 4 cap hoc chinh' },
      { value: 'Range preview', label: 'Minh bach du de xoa friction dau funnel' },
      { value: 'Value-led', label: 'Gia tri duoc giai thich cung hoc phi' },
      { value: 'Sales assist', label: 'Page duoc viet de doi admissions goi lai de hon' },
    ],
    sections: [
      {
        type: 'cards',
        eyebrow: 'Fee preview',
        title: 'Preview hoc phi nen du ro de user co moc tham chieu, nhung khong bien page thanh bang gia khung.',
        intro:
          'Voi dot launch dau tien, cach tot nhat la dua ra range theo cap hoc va giai thich cac lop gia tri di kem.',
        columns: 2,
        items: [
          {
            title: 'Mam Non',
            body:
              'Range hoc phi mam non duoc trinh bay nhu mot moc tham chieu de phu huynh can doi voi chuong trinh song ngu, moi truong va nhiep sinh hoat.',
            href: '/mam-non',
            cta: 'Xem pillar Mam Non',
          },
          {
            title: 'Tieu Hoc',
            body:
              'Tieu hoc can duoc nhin trong boi canh hoc thuat, tieng Anh, PDR va moi truong ky luat nhe nhang de tre tu hoc tot hon.',
            href: '/tieu-hoc',
            cta: 'Xem pillar Tieu Hoc',
          },
          {
            title: 'Trung Hoc Co So',
            body:
              'Range THCS can di cung thong diep ve tang toc hoc thuat, tieng Anh, group projects va su chu dong cua hoc sinh.',
            href: '/trung-hoc-co-so',
            cta: 'Xem pillar THCS',
          },
          {
            title: 'Trung Hoc Pho Thong',
            body:
              'THPT la level co intent thuong mai manh hon, vi vay page can noi ro gia tri dau ra, IELTS va dinh huong dai hoc.',
            href: '/trung-hoc-pho-thong',
            cta: 'Xem pillar THPT',
          },
        ],
      },
      {
        type: 'steps',
        eyebrow: 'Fee logic',
        title: 'Ba lop logic can co tren money page de tranh cam giac “gia cao vi thuong hieu”.',
        intro:
          'Phu huynh khong chi hoi bao nhieu tien. Ho dang hoi minh nhan lai duoc dieu gi va no co xung dang khong.',
        items: [
          {
            title: 'Hoc phi duoc gan voi trai nghiem hoc tap',
            body:
              'No phan anh mot he thong giao duc lien cap, su dau tu vao tieng Anh, vao phuong phap va vao nhiep hoc tap co cau truc.',
          },
          {
            title: 'Hoc phi can di cung minh bach',
            body:
              'Minh bach khong co nghia la phai dua moi dong phi ra homepage. Minh bach la cho user mot range de dinh hinh va mot duong day ro de nhan thong tin chi tiet.',
          },
          {
            title: 'Hoc phi la mot phan cua conversation, khong phai dau cuoi',
            body:
              'Money page co nhiem vu cat giam friction, sau do chuyen tiep sang doi tu van de xac nhan cap hoc, nhu cau va buoc tiep theo.',
          },
        ],
      },
      {
        type: 'links',
        eyebrow: 'Commercial routes',
        title: 'Neu user chua san sang goi ngay, day la cac duong di tiep theo hop ly nhat.',
        intro:
          'Money page tot se khong de phu huynh bi dung lai trong mot khong gian chi co bang gia. No phai mo sang triet ly, cap hoc va admissions.',
        items: [
          {
            eyebrow: 'Admissions',
            title: 'Tuyen Sinh',
            href: '/tuyen-sinh',
            body: 'Khi user muon biet quy trinh va cach bat dau, admissions hub la buoc ke tiep hop ly nhat.',
          },
          {
            eyebrow: 'Brand trust',
            title: 'Gioi Thieu',
            href: '/gioi-thieu',
            body: 'Danh cho phu huynh dang can “ly do ton tai” va muc do phu hop ve gia tri truoc khi chot duoc quyet dinh.',
          },
          {
            eyebrow: 'Signature',
            title: 'He Thong PDR',
            href: '/he-thong-pdr',
            body: 'Danh cho nhom muon xac minh rang gia tri hoc phi duoc doi lai bang mot he thong hoc tap ro rang.',
          },
        ],
      },
      {
        type: 'faq',
        eyebrow: 'FAQ hoc phi',
        title: 'Ba cau hoi co the giup money page chuyen doi tot hon.',
        intro:
          'FAQ o day khong can dai, nhung phai danh dung vao friction thuong gap cua phu huynh khi so sanh.',
        items: [
          {
            question: 'Viet Anh co cong khai hoc phi hoan toan khong?',
            answer:
              'Trang nay cong khai range va logic hoc phi de giam friction. Muc phi chi tiet se duoc admissions huong dan theo cap hoc va nhu cau cua gia dinh.',
          },
          {
            question: 'Nen xem hoc phi truoc hay chuong trinh truoc?',
            answer:
              'Neu phu huynh dang o BOFU, hoc phi la diem vao hop ly. Neu van dang so sanh gia tri, hay quay lai pillar page cap hoc de doi chieu ky hon.',
          },
          {
            question: 'Sau khi xem hoc phi thi buoc tiep theo la gi?',
            answer:
              'Buoc tiep theo co the la goi admissions, nhan tu van qua Zalo hoac vao Tuyen Sinh de xem ro quy trinh va cac moc hanh dong.',
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
