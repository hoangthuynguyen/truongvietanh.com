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

export const siteName = 'Truong Viet Anh';
export const defaultSiteUrl = 'https://staging.truongvietanh.com';
export const adminUrl = 'https://admin.truongvietanh.com/admin';

export const mainNav = [
  { label: 'Trang Chu', href: '/' },
  { label: 'Gioi Thieu', href: '/gioi-thieu' },
  { label: 'Mam Non', href: '/mam-non' },
  { label: 'Tieu Hoc', href: '/tieu-hoc' },
  { label: 'THCS', href: '/trung-hoc-co-so' },
  { label: 'THPT', href: '/trung-hoc-pho-thong' },
  { label: 'Tuyen Sinh', href: '/tuyen-sinh' },
  { label: 'Hoc Phi', href: '/hoc-phi' },
];

export const contactLinks = {
  phoneDisplay: '0916 961 409',
  phoneHref: 'tel:0916961409',
  zaloHref: 'https://zalo.me/0916961409',
  admissionsHref: '/tuyen-sinh',
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
];

export function getPageBySlug(slug: string) {
  return pages.find((page) => page.slug === slug);
}
