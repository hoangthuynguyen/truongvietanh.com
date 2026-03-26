// Visitor-ready content for each template page
// This file provides real Vietnamese content for the 28 sample pages

export type VisitorContent = {
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroCopy: string;
  asideEyebrow: string;
  asideTitle: string;
  asidePoints: string[];
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  statsEyebrow: string;
  statsTitle: string;
  stats: { value: string; label: string }[];
  featuresEyebrow: string;
  featuresTitle: string;
  featuresIntro?: string;
  features: { title: string; body: string }[];
  sections: {
    eyebrow?: string;
    heading: string;
    intro?: string;
    cards?: { eyebrow?: string; title: string; body: string }[];
    steps?: { title: string; body: string }[];
  }[];
  faqTitle: string;
  faqItems: { question: string; answer: string }[];
  testimonial?: { quote: string; author: string; role: string };
  relatedLinks: { title: string; href: string; body: string }[];
  ctaBannerEyebrow: string;
  ctaBannerTitle: string;
  ctaBannerCopy: string;
};

const contentMap: Record<string, VisitorContent> = {};

// Helper to register content
function reg(slug: string, c: VisitorContent) { contentMap[slug] = c; }

// ─── 1. Fee Capture Landing ─────────────────────────────────────────────
reg('class-a-fee-capture', {
  metaDescription: 'Nhận bảng học phí chi tiết Trường Việt Anh theo từng cấp học, cơ sở. So sánh rõ ràng, quyết định tự tin hơn.',
  heroBadge: 'Học phí minh bạch',
  heroTitle: 'Nhận bảng học phí chi tiết theo cấp học và cơ sở phù hợp với gia đình bạn',
  heroCopy: 'Ba mẹ sẽ nhận bảng học phí đầy đủ qua email hoặc Zalo trong vòng vài phút. Học phí Trường Việt Anh đã bao gồm chương trình tiếng Anh chuyên sâu, PDR, ăn bán trú và các hoạt động ngoại khóa cốt lõi.',
  asideEyebrow: 'Tại sao nên nhận bảng học phí?',
  asideTitle: 'So sánh chi phí dễ dàng, quyết định nhanh hơn',
  asidePoints: ['Bảng học phí chia theo từng cấp học và cơ sở', 'Giải thích rõ các khoản đã bao gồm', 'Hỗ trợ tư vấn tài chính 1-1 nếu cần', 'Ưu đãi sớm cho năm học mới'],
  ctaPrimaryText: 'Nhận bảng học phí ngay', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Nhắn Zalo tư vấn', ctaSecondaryHref: 'https://zalo.me/truongvietanh',
  statsEyebrow: 'Trường Việt Anh trong số liệu', statsTitle: 'Hệ thống giáo dục liên cấp song ngữ được phụ huynh tin tưởng',
  stats: [{ value: '4', label: 'Cấp học liên cấp' }, { value: '3+', label: 'Cơ sở tại TP.HCM' }, { value: '20+', label: 'Năm kinh nghiệm' }, { value: '95%', label: 'Phụ huynh hài lòng' }],
  featuresEyebrow: 'Học phí bao gồm', featuresTitle: 'Những gì gia đình nhận được khi đầu tư vào Trường Việt Anh',
  features: [
    { title: 'Chương trình tiếng Anh chuyên sâu', body: 'Học sinh được học tiếng Anh với giáo viên bản ngữ mỗi ngày, rèn 4 kỹ năng và chuẩn bị nền tảng IELTS từ sớm.' },
    { title: 'Hệ thống PDR cá nhân hóa', body: 'Mỗi học sinh có hồ sơ phát triển riêng, được theo dõi tiến bộ thường xuyên qua hệ thống PDR.' },
    { title: 'Ăn bán trú và ngoại khóa', body: 'Bữa ăn dinh dưỡng được thiết kế riêng, cùng với các hoạt động ngoại khóa phát triển kỹ năng toàn diện.' },
  ],
  sections: [{
    eyebrow: 'Quy trình nhận học phí', heading: 'Ba bước đơn giản để nhận bảng học phí chi tiết',
    steps: [
      { title: 'Để lại thông tin', body: 'Điền tên, số điện thoại và cấp học quan tâm vào form bên dưới.' },
      { title: 'Nhận bảng học phí', body: 'Đội ngũ tuyển sinh gửi bảng học phí chi tiết qua Zalo hoặc email trong vài phút.' },
      { title: 'Tư vấn cá nhân', body: 'Nếu cần, ba mẹ có thể đặt lịch tư vấn 1-1 để được giải đáp cụ thể hơn.' },
    ],
  }],
  faqTitle: 'Câu hỏi thường gặp về học phí Trường Việt Anh',
  faqItems: [
    { question: 'Học phí Trường Việt Anh có bao gồm tiếng Anh không?', answer: 'Có. Học phí đã bao gồm chương trình tiếng Anh chuyên sâu với giáo viên bản ngữ, không phát sinh thêm phí học tiếng Anh.' },
    { question: 'Có hỗ trợ tài chính hoặc ưu đãi không?', answer: 'Trường Việt Anh có chương trình ưu đãi đăng ký sớm, ưu đãi anh chị em và học bổng cho học sinh có thành tích nổi bật.' },
    { question: 'Học phí có thay đổi theo từng năm không?', answer: 'Trường cam kết thông báo trước nếu có điều chỉnh. Bảng học phí được cập nhật đầu mỗi năm học.' },
    { question: 'Ba mẹ có thể đóng học phí theo kỳ không?', answer: 'Có. Trường hỗ trợ nhiều phương thức đóng: theo năm, theo kỳ hoặc theo tháng tùy nhu cầu gia đình.' },
  ],
  testimonial: { quote: 'Khi nhận bảng học phí, tôi thấy mọi khoản đều được giải thích rõ ràng. Không có phí ẩn, không phải lo thêm tiền tiếng Anh hay ngoại khóa.', author: 'Chị Minh Trang', role: 'Phụ huynh mầm non cơ sở Gò Vấp' },
  relatedLinks: [
    { title: 'Chương trình học', href: '/mam-non/chuong-trinh', body: 'Xem chi tiết chương trình giáo dục ở từng cấp học.' },
    { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Đặt lịch tham quan cơ sở gần nhất với gia đình bạn.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Tìm hiểu quy trình và hồ sơ nhập học.' },
  ],
  ctaBannerEyebrow: 'Bắt đầu ngay', ctaBannerTitle: 'Nhận bảng học phí chi tiết và so sánh để đưa ra quyết định phù hợp nhất',
  ctaBannerCopy: 'Đội ngũ tuyển sinh Trường Việt Anh luôn sẵn sàng hỗ trợ ba mẹ. Hãy để lại thông tin để nhận bảng học phí ngay hôm nay.',
});

// ─── 2. Campus Tour Landing ─────────────────────────────────────────────
reg('class-b-campus-tour', {
  metaDescription: 'Đặt lịch tham quan Trường Việt Anh. Xem cơ sở thật, lớp học thật, gặp đội ngũ giáo viên và trải nghiệm môi trường học tập.',
  heroBadge: 'Tham quan cơ sở',
  heroTitle: 'Đến tham quan để nhìn trường bằng mắt thật, cảm nhận môi trường bằng con tim',
  heroCopy: 'Một buổi tham quan tại Trường Việt Anh giúp ba mẹ xem lớp học, khu vui chơi, gặp giáo viên và hiểu rõ cách con được chăm sóc mỗi ngày. Đặt lịch chỉ trong 30 giây.',
  asideEyebrow: 'Cơ sở Gò Vấp – Phan Huy Ích', asideTitle: 'Tiện đưa đón, gần trung tâm, đầy đủ tiện ích',
  asidePoints: ['Cách chợ Gò Vấp 5 phút', 'Khuôn viên rộng hơn 2,000m²', 'Sân chơi ngoài trời và phòng gym mini', 'Có bán trú và xe đưa đón'],
  ctaPrimaryText: 'Đặt lịch tham quan', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Xem đường đi', ctaSecondaryHref: 'https://maps.google.com',
  statsEyebrow: 'Cơ sở Gò Vấp', statsTitle: 'Những con số nói lên chất lượng',
  stats: [{ value: '2,000m²', label: 'Diện tích khuôn viên' }, { value: '15+', label: 'Phòng học tiêu chuẩn' }, { value: '1:8', label: 'Tỉ lệ giáo viên/học sinh' }, { value: '98%', label: 'PH tiếp tục đăng ký' }],
  featuresEyebrow: 'Điểm nổi bật', featuresTitle: 'Những gì ba mẹ sẽ thấy khi đến tham quan',
  features: [
    { title: 'Lớp học tiêu chuẩn quốc tế', body: 'Phòng học rộng rãi, thoáng mát, đầy đủ thiết bị dạy học hiện đại và đồ chơi phát triển tư duy.' },
    { title: 'Khu vui chơi an toàn', body: 'Sân chơi được thiết kế theo tiêu chuẩn an toàn, có thảm chống trượt và giám sát liên tục.' },
    { title: 'Bếp ăn đạt chuẩn', body: 'Nhà bếp sạch sẽ, thực đơn dinh dưỡng cân bằng, phục vụ bữa sáng, trưa và xế riêng cho từng lứa tuổi.' },
  ],
  sections: [],
  faqTitle: 'Câu hỏi thường gặp khi tham quan',
  faqItems: [
    { question: 'Tham quan trường mất bao lâu?', answer: 'Buổi tham quan thường kéo dài 45-60 phút, bao gồm xem cơ sở, gặp giáo viên và trao đổi với đội tuyển sinh.' },
    { question: 'Có cần đặt lịch trước không?', answer: 'Có. Ba mẹ nên đặt lịch trước để đội ngũ chuẩn bị và dành thời gian hỗ trợ tốt nhất.' },
    { question: 'Con có thể đi cùng khi tham quan không?', answer: 'Hoàn toàn được. Chúng tôi khuyến khích ba mẹ đưa con đi cùng để bé làm quen với môi trường.' },
    { question: 'Có thể tham quan ngoài giờ hành chính không?', answer: 'Trường hỗ trợ tham quan buổi sáng thứ 7. Ba mẹ vui lòng liên hệ trước để sắp xếp.' },
  ],
  testimonial: { quote: 'Lần đầu đến tham quan, tôi ấn tượng ngay với cách giáo viên chào đón bé. Con tôi không khóc mà còn muốn ở lại chơi thêm.', author: 'Anh Hoàng Nam', role: 'Phụ huynh mầm non cơ sở Gò Vấp' },
  relatedLinks: [
    { title: 'Học phí', href: '/hoc-phi', body: 'Xem bảng học phí chi tiết theo cấp học và cơ sở.' },
    { title: 'Chương trình mầm non', href: '/mam-non', body: 'Tìm hiểu chương trình giáo dục mầm non song ngữ.' },
    { title: 'Đăng ký tư vấn', href: '/tuyen-sinh', body: 'Đăng ký tư vấn 1-1 với đội ngũ tuyển sinh.' },
  ],
  ctaBannerEyebrow: 'Đặt lịch ngay', ctaBannerTitle: 'Chọn ngày phù hợp để đến thăm Trường Việt Anh',
  ctaBannerCopy: 'Đội ngũ luôn sẵn sàng đón gia đình bạn. Đặt lịch ngay hôm nay để trải nghiệm môi trường học tập thật cho con.',
});

// ─── 3. Open Day / Event Landing ────────────────────────────────────────
reg('class-c-open-day', {
  metaDescription: 'Đăng ký tham dự Ngày hội Trường Việt Anh. Trải nghiệm thực tế, gặp giáo viên, xem chương trình và nhận ưu đãi tuyển sinh.',
  heroBadge: 'Ngày hội tuyển sinh 2026',
  heroTitle: 'Ngày hội Trường mở — Trải nghiệm một buổi học thật và gặp đội ngũ trực tiếp',
  heroCopy: 'Ngày hội năm nay diễn ra tại cơ sở Gò Vấp với các hoạt động trải nghiệm, workshop phụ huynh, tham quan lớp học và tư vấn tuyển sinh trực tiếp. Số lượng gia đình tham gia có giới hạn.',
  asideEyebrow: 'Thông tin sự kiện', asideTitle: 'Những gì gia đình sẽ trải nghiệm',
  asidePoints: ['Workshop dành cho phụ huynh', 'Con được tham gia lớp học mẫu', 'Tư vấn tuyển sinh 1-1', 'Ưu đãi đăng ký tại sự kiện'],
  ctaPrimaryText: 'Đăng ký tham dự', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Xem lịch chương trình', ctaSecondaryHref: '#chuong-trinh',
  statsEyebrow: 'Năm trước', statsTitle: 'Ngày hội 2025 đã thu hút hàng trăm gia đình',
  stats: [{ value: '200+', label: 'Gia đình tham dự' }, { value: '15', label: 'Hoạt động trải nghiệm' }, { value: '92%', label: 'PH đánh giá hữu ích' }, { value: '45%', label: 'Đăng ký nhập học sau sự kiện' }],
  featuresEyebrow: 'Chương trình', featuresTitle: 'Lịch trình hoạt động trong ngày',
  features: [
    { title: '8:30 – Đón tiếp và tham quan', body: 'Gia đình được đón tiếp, nhận tài liệu và bắt đầu tham quan cơ sở cùng hướng dẫn viên.' },
    { title: '9:30 – Lớp học mẫu cho bé', body: 'Con được tham gia một tiết học thật với giáo viên bản ngữ, trải nghiệm phương pháp giảng dạy của trường.' },
    { title: '10:30 – Tư vấn tuyển sinh', body: 'Ba mẹ gặp trực tiếp đội tuyển sinh, nhận tư vấn chương trình, học phí và ưu đãi đặc biệt.' },
  ],
  sections: [],
  faqTitle: 'Câu hỏi thường gặp về Ngày hội', faqItems: [
    { question: 'Sự kiện có miễn phí không?', answer: 'Hoàn toàn miễn phí. Ba mẹ chỉ cần đăng ký trước để giữ chỗ.' },
    { question: 'Con bao nhiêu tuổi thì tham gia được?', answer: 'Sự kiện phù hợp với gia đình có con từ 2-15 tuổi. Mỗi cấp học có hoạt động riêng.' },
    { question: 'Có cần mang theo gì không?', answer: 'Không cần chuẩn bị gì đặc biệt. Trường chuẩn bị nước uống và đồ ăn nhẹ cho gia đình.' },
    { question: 'Có ưu đãi khi đăng ký tại sự kiện không?', answer: 'Có. Gia đình đăng ký nhập học trong ngày hội sẽ nhận ưu đãi giảm học phí kỳ đầu tiên.' },
  ],
  testimonial: { quote: 'Đưa con đến Ngày hội là quyết định đúng nhất. Bé được chơi, được học thử và chúng tôi hiểu rõ hơn về trường mà không bị áp lực.', author: 'Chị Thu Hà', role: 'Phụ huynh đã đăng ký sau Ngày hội 2025' },
  relatedLinks: [
    { title: 'Chương trình mầm non', href: '/mam-non', body: 'Xem chi tiết triết lý và nội dung giáo dục mầm non.' },
    { title: 'Các cơ sở', href: '/co-so', body: 'Tìm cơ sở Trường Việt Anh gần nhà nhất.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Tham khảo bảng học phí theo từng cấp học.' },
  ],
  ctaBannerEyebrow: 'Giới hạn số lượng', ctaBannerTitle: 'Đăng ký tham dự Ngày hội Trường mở ngay hôm nay',
  ctaBannerCopy: 'Số lượng gia đình tham gia có giới hạn. Đăng ký sớm để đảm bảo có chỗ cho gia đình bạn.',
});

// ─── 4. Trial Class Landing ─────────────────────────────────────────────
reg('class-d-trial-class', {
  metaDescription: 'Đăng ký học thử miễn phí tại Trường Việt Anh. Con được trải nghiệm một buổi học thật, ba mẹ được quan sát và tư vấn.',
  heroBadge: 'Học thử miễn phí',
  heroTitle: 'Một buổi học thật sẽ giúp ba mẹ thấy rõ hơn là đoán nhiều thêm',
  heroCopy: 'Con được tham gia lớp học thật cùng giáo viên bản ngữ, trải nghiệm phương pháp giảng dạy và môi trường học tập. Hoàn toàn miễn phí, không ràng buộc.',
  asideEyebrow: 'Buổi học thử bao gồm', asideTitle: 'Con sẽ trải nghiệm gì?',
  asidePoints: ['Một tiết học thật với giáo viên bản ngữ', 'Hoạt động nhóm và tương tác bạn bè', 'Quan sát phương pháp giảng dạy', 'Tư vấn riêng sau buổi thử'],
  ctaPrimaryText: 'Đăng ký học thử', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Nhắn Zalo tư vấn', ctaSecondaryHref: 'https://zalo.me/truongvietanh',
  statsEyebrow: 'Sau buổi học thử', statsTitle: 'Phụ huynh phản hồi tích cực',
  stats: [{ value: '89%', label: 'PH hài lòng sau buổi thử' }, { value: '67%', label: 'Đăng ký nhập học sau thử' }, { value: '100%', label: 'Miễn phí, không ràng buộc' }, { value: '45p', label: 'Thời gian mỗi buổi thử' }],
  featuresEyebrow: 'Quy trình', featuresTitle: 'Ba bước đơn giản để con được học thử',
  features: [
    { title: 'Đăng ký online', body: 'Ba mẹ để lại thông tin cơ bản và chọn ngày giờ phù hợp.' },
    { title: 'Đến trường trải nghiệm', body: 'Con tham gia lớp học thật, ba mẹ quan sát và trò chuyện với giáo viên.' },
    { title: 'Nhận phản hồi', body: 'Đội ngũ trao đổi nhận xét về buổi thử và tư vấn lộ trình phù hợp nếu gia đình quan tâm.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về buổi học thử',
  faqItems: [
    { question: 'Học thử có mất phí không?', answer: 'Hoàn toàn miễn phí. Đây là cơ hội để gia đình trải nghiệm trước khi quyết định.' },
    { question: 'Con mấy tuổi thì đi học thử được?', answer: 'Từ 2 tuổi trở lên. Mỗi lứa tuổi có lớp học thử phù hợp.' },
    { question: 'Ba mẹ có được vào lớp quan sát không?', answer: 'Có. Ba mẹ được mời quan sát buổi học từ khu vực dành riêng.' },
    { question: 'Cần chuẩn bị gì cho buổi học thử?', answer: 'Chỉ cần mang theo nước uống cho con. Trường chuẩn bị mọi học liệu và đồ ăn nhẹ.' },
  ],
  testimonial: { quote: 'Ban đầu tôi lo bé nhút nhát nhưng ngay buổi thử, con hòa nhập rất nhanh và còn đòi quay lại. Giáo viên rất tận tâm.', author: 'Chị Thanh Thảo', role: 'Phụ huynh mầm non cơ sở Lê Đức Thọ' },
  relatedLinks: [
    { title: 'Chương trình mầm non', href: '/mam-non', body: 'Xem chương trình giáo dục phù hợp lứa tuổi.' },
    { title: 'Cơ sở gần nhất', href: '/co-so', body: 'Tìm cơ sở Trường Việt Anh gần nhà.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Tham khảo học phí trước khi quyết định.' },
  ],
  ctaBannerEyebrow: 'Miễn phí hoàn toàn', ctaBannerTitle: 'Cho con một buổi trải nghiệm thật để gia đình yên tâm hơn',
  ctaBannerCopy: 'Đăng ký ngay hôm nay để chọn ngày giờ học thử phù hợp với lịch của gia đình.',
});

// ─── 5. TikTok / Reels Mobile-First ────────────────────────────────────
reg('class-f-tiktok-ugc', {
  metaDescription: 'Trường Việt Anh – Hệ thống giáo dục song ngữ liên cấp tại TP.HCM. Nhắn Zalo hoặc gọi ngay để được tư vấn.',
  heroBadge: 'Xem • Thích • Hành động',
  heroTitle: 'Ba mẹ đã thấy Trường Việt Anh qua video — giờ hãy kết nối thật với đội ngũ',
  heroCopy: 'Nhắn Zalo để được tư vấn ngay hoặc gọi hotline. Đội ngũ tuyển sinh sẵn sàng giải đáp mọi thắc mắc về chương trình, học phí và lịch tham quan.',
  asideEyebrow: 'Liên hệ nhanh', asideTitle: 'Chỉ cần một tin nhắn để bắt đầu',
  asidePoints: ['Zalo tư vấn 24/7', 'Hotline: 028 xxxx xxxx', 'Trường có 3+ cơ sở tại TP.HCM', 'Tư vấn miễn phí'],
  ctaPrimaryText: 'Nhắn Zalo ngay', ctaPrimaryHref: 'https://zalo.me/truongvietanh',
  ctaSecondaryText: 'Gọi hotline', ctaSecondaryHref: 'tel:028xxxxxxxx',
  statsEyebrow: 'Trường Việt Anh', statsTitle: 'Được hàng ngàn gia đình tin tưởng',
  stats: [{ value: '20+', label: 'Năm hoạt động' }, { value: '3+', label: 'Cơ sở tại TP.HCM' }, { value: '95%', label: 'PH hài lòng' }, { value: '4', label: 'Cấp học liên cấp' }],
  featuresEyebrow: 'Tại sao chọn Việt Anh', featuresTitle: 'Điều gia đình nhận được khi đồng hành cùng Trường Việt Anh',
  features: [
    { title: 'Tiếng Anh mỗi ngày', body: 'Giáo viên bản ngữ, chương trình IELTS Foundation từ mầm non.' },
    { title: 'Con hạnh phúc đi học', body: 'Triết lý "Hạnh phúc trước, thành tích bền" giúp con yêu trường.' },
    { title: 'Tư vấn miễn phí', body: 'Nhắn Zalo hoặc gọi bất kỳ lúc nào. Không áp lực, không ràng buộc.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  relatedLinks: [
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Xem quy trình đăng ký nhập học đầy đủ.' },
    { title: 'Cơ sở', href: '/co-so', body: 'Tìm cơ sở gần với gia đình bạn.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Nhận bảng học phí nhanh chóng.' },
  ],
  ctaBannerEyebrow: 'Bắt đầu ngay', ctaBannerTitle: 'Nhắn Zalo để được tư vấn miễn phí',
  ctaBannerCopy: 'Đội ngũ Trường Việt Anh luôn sẵn sàng giải đáp cho gia đình bạn.',
});

// ─── 6. Enrollment Registration Form ───────────────────────────────────
reg('class-enrollment-registration-form', {
  metaDescription: 'Đăng ký nhập học trực tuyến tại Trường Việt Anh. Quy trình rõ ràng, hồ sơ đơn giản, phản hồi nhanh chóng.',
  heroBadge: 'Đăng ký nhập học',
  heroTitle: 'Hoàn tất đăng ký nhập học trực tuyến — Đơn giản và nhanh chóng',
  heroCopy: 'Khi gia đình đã sẵn sàng, chỉ cần điền form đăng ký bên dưới. Đội tuyển sinh sẽ xác nhận và liên hệ trong vòng 24 giờ làm việc.',
  asideEyebrow: 'Trước khi đăng ký', asideTitle: 'Hồ sơ cần chuẩn bị',
  asidePoints: ['Giấy khai sinh bản sao', 'Sổ hộ khẩu hoặc KT3', 'Học bạ (nếu chuyển trường)', 'Ảnh thẻ 3×4 của bé'],
  ctaPrimaryText: 'Bắt đầu đăng ký', ctaPrimaryHref: '#dang-ky',
  ctaSecondaryText: 'Liên hệ tuyển sinh', ctaSecondaryHref: '/tuyen-sinh',
  statsEyebrow: 'Quy trình đơn giản', statsTitle: 'Từ đăng ký đến xác nhận chỉ trong 3 bước',
  stats: [{ value: '5 phút', label: 'Thời gian điền form' }, { value: '24h', label: 'Phản hồi sau đăng ký' }, { value: '3 bước', label: 'Quy trình tối giản' }, { value: '100%', label: 'Bảo mật thông tin' }],
  featuresEyebrow: 'Quy trình', featuresTitle: 'Các bước nhập học tại Trường Việt Anh',
  features: [
    { title: 'Điền form đăng ký', body: 'Ba mẹ điền thông tin cơ bản và cấp học mong muốn cho con.' },
    { title: 'Xác nhận hồ sơ', body: 'Đội tuyển sinh liên hệ để xác nhận và hướng dẫn bổ sung giấy tờ nếu cần.' },
    { title: 'Nhập học chính thức', body: 'Sau khi hoàn tất, con chính thức trở thành học sinh Trường Việt Anh.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về đăng ký nhập học',
  faqItems: [
    { question: 'Đăng ký online có được xem là đăng ký chính thức không?', answer: 'Đây là bước tiếp nhận hồ sơ ban đầu. Đội tuyển sinh sẽ liên hệ để hoàn tất thủ tục chính thức.' },
    { question: 'Có cần nộp hồ sơ gốc không?', answer: 'Bước đầu chỉ cần bản sao. Bản gốc sẽ được yêu cầu khi làm thủ tục nhập học chính thức.' },
    { question: 'Có thể đăng ký cho nhiều bé cùng lúc không?', answer: 'Có. Ba mẹ đăng ký riêng cho từng bé hoặc liên hệ tuyển sinh để được hỗ trợ.' },
    { question: 'Thông tin đăng ký có được bảo mật không?', answer: 'Hoàn toàn bảo mật. Thông tin chỉ sử dụng cho mục đích tuyển sinh của Trường Việt Anh.' },
  ],
  testimonial: { quote: 'Quy trình đăng ký online rất tiện, tôi hoàn tất chỉ trong vài phút và được tư vấn ngay hôm sau.', author: 'Anh Văn Trí', role: 'Phụ huynh lớp 1 cơ sở Gò Vấp' },
  relatedLinks: [
    { title: 'Học phí', href: '/hoc-phi', body: 'Tham khảo học phí trước khi đăng ký.' },
    { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Đặt lịch xem trường trước khi quyết định.' },
    { title: 'Chương trình học', href: '/mam-non', body: 'Xem chương trình phù hợp với con.' },
  ],
  ctaBannerEyebrow: 'Sẵn sàng?', ctaBannerTitle: 'Bắt đầu đăng ký nhập học cho con ngay hôm nay',
  ctaBannerCopy: 'Chỉ cần 5 phút để hoàn tất. Đội tuyển sinh sẽ liên hệ trong vòng 24 giờ.',
});

// ─── 7. Level Pillar ────────────────────────────────────────────────────
reg('class-level-pillar', {
  metaDescription: 'Chương trình giáo dục mầm non song ngữ Trường Việt Anh. Triết lý hạnh phúc, tiếng Anh mỗi ngày, PDR cá nhân hóa.',
  heroBadge: 'Mầm non song ngữ',
  heroTitle: 'Chương trình mầm non Trường Việt Anh — Nơi mỗi ngày đi học là một ngày hạnh phúc',
  heroCopy: 'Chương trình mầm non song ngữ dành cho trẻ 2-6 tuổi, xây dựng trên triết lý "hạnh phúc trước, thành tích bền" với tiếng Anh mỗi ngày, hệ thống PDR cá nhân hóa và môi trường an toàn.',
  asideEyebrow: 'Cấp mầm non', asideTitle: 'Những điều ba mẹ cần biết',
  asidePoints: ['Độ tuổi: 2-6 tuổi', 'Tiếng Anh với giáo viên bản ngữ mỗi ngày', 'Hệ thống phát triển cá nhân PDR', 'Bán trú, xe đưa đón, ngoại khóa'],
  ctaPrimaryText: 'Xem cơ sở phù hợp', ctaPrimaryHref: '/co-so',
  ctaSecondaryText: 'Nhận tư vấn', ctaSecondaryHref: '/tuyen-sinh',
  statsEyebrow: 'Mầm non Việt Anh', statsTitle: 'Nền tảng vững chắc cho hành trình giáo dục',
  stats: [{ value: '2-6', label: 'Tuổi đầu vào' }, { value: '1:8', label: 'Tỉ lệ GV/HS' }, { value: '100%', label: 'Tiếng Anh bản ngữ' }, { value: '3+', label: 'Cơ sở tại TP.HCM' }],
  featuresEyebrow: 'Điểm khác biệt', featuresTitle: 'Tại sao mầm non Việt Anh phù hợp với con bạn',
  features: [
    { title: 'Tiếng Anh ngay từ đầu', body: 'Con được tiếp xúc tiếng Anh tự nhiên mỗi ngày qua hoạt động học tập, vui chơi và giao tiếp với giáo viên bản ngữ.' },
    { title: 'Hạnh phúc, không áp lực', body: 'Triết lý giáo dục đặt hạnh phúc làm nền tảng — con yêu trường, tự tin và phát triển tự nhiên.' },
    { title: 'PDR — Theo dõi cá nhân', body: 'Mỗi bé có hồ sơ phát triển riêng, giúp ba mẹ và giáo viên cùng đồng hành sát sao.' },
  ],
  sections: [{
    eyebrow: 'Chương trình học', heading: 'Con sẽ học gì ở mầm non Việt Anh?',
    intro: 'Chương trình kết hợp giáo dục quốc tế và Việt Nam, rèn kỹ năng toàn diện.',
    cards: [
      { title: 'Ngôn ngữ', body: 'Tiếng Việt và tiếng Anh song hành, rèn 4 kỹ năng nghe, nói, đọc, viết phù hợp lứa tuổi.' },
      { title: 'Kỹ năng sống', body: 'Tự phục vụ, hợp tác nhóm, giải quyết vấn đề và biểu đạt cảm xúc.' },
      { title: 'Sáng tạo & Vận động', body: 'Âm nhạc, mỹ thuật, thể chất và trải nghiệm thiên nhiên mỗi tuần.' },
    ],
  }],
  faqTitle: 'Câu hỏi thường gặp về mầm non',
  faqItems: [
    { question: 'Mầm non Việt Anh nhận trẻ từ mấy tuổi?', answer: 'Từ 2 tuổi. Mỗi nhóm tuổi có lớp và chương trình phù hợp.' },
    { question: 'Con chưa biết tiếng Anh có theo kịp không?', answer: 'Hoàn toàn được. Phương pháp dạy tiếng Anh tự nhiên giúp con tiếp xúc từ cơ bản, không gây áp lực.' },
    { question: 'Một lớp có bao nhiêu bé?', answer: 'Sĩ số tối đa 20-25 bé tùy nhóm tuổi, luôn có 2-3 giáo viên phụ trách.' },
    { question: 'Trường có xe đưa đón không?', answer: 'Có. Dịch vụ xe đưa đón theo tuyến được tổ chức cho phụ huynh có nhu cầu.' },
  ],
  testimonial: { quote: 'Con tôi từ nhút nhát đến tự tin nói tiếng Anh chỉ sau 6 tháng ở Việt Anh. Giáo viên rất yêu thương và chuyên nghiệp.', author: 'Chị Ngọc Hân', role: 'Phụ huynh mầm non 3 tuổi' },
  relatedLinks: [
    { title: 'Học phí mầm non', href: '/hoc-phi', body: 'Xem chi tiết học phí cấp mầm non.' },
    { title: 'Cơ sở Gò Vấp', href: '/co-so', body: 'Tham quan cơ sở mầm non gần nhất.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Đăng ký nhập học cho con.' },
  ],
  ctaBannerEyebrow: 'Bắt đầu hành trình', ctaBannerTitle: 'Cho con một nền tảng hạnh phúc và vững chắc ngay từ mầm non',
  ctaBannerCopy: 'Liên hệ đội tuyển sinh để được tư vấn chương trình phù hợp với con bạn.',
});

// ─── 8. Curriculum / Program Overview ───────────────────────────────────
reg('class-curriculum-program-overview', {
  metaDescription: 'Chi tiết chương trình học Trường Việt Anh: lộ trình môn học, tiếng Anh chuyên sâu, PDR, outcomes và đánh giá tiến bộ.',
  heroBadge: 'Chương trình giáo dục',
  heroTitle: 'Con sẽ học gì ở Trường Việt Anh? — Chương trình chi tiết theo từng giai đoạn',
  heroCopy: 'Chương trình kết hợp khung giáo dục quốc gia với phương pháp quốc tế, ưu tiên tiếng Anh chuyên sâu, kỹ năng sống và phát triển toàn diện qua hệ thống PDR.',
  asideEyebrow: 'Điểm khác biệt', asideTitle: 'Ba trụ cột của chương trình',
  asidePoints: ['Tiếng Anh chuyên sâu mỗi ngày', 'Hệ thống PDR theo dõi cá nhân', 'Kỹ năng sống và tư duy phản biện', 'Đánh giá tiến bộ liên tục'],
  ctaPrimaryText: 'Nhận tư vấn chương trình', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Xem cơ sở áp dụng', ctaSecondaryHref: '/co-so',
  statsEyebrow: 'Chương trình Việt Anh', statsTitle: 'Được xây dựng cho sự phát triển toàn diện',
  stats: [{ value: '60%', label: 'Giờ học bằng tiếng Anh' }, { value: '4', label: 'Kỹ năng ngôn ngữ' }, { value: '12', label: 'Môn ngoại khóa' }, { value: 'IELTS', label: 'Chuẩn đầu ra' }],
  featuresEyebrow: 'Cấu trúc', featuresTitle: 'Lộ trình học tập theo giai đoạn phát triển',
  features: [
    { title: 'Mầm non (2-6 tuổi)', body: 'Khám phá, trải nghiệm, tiếng Anh tự nhiên và kỹ năng nền tảng.' },
    { title: 'Tiểu học (6-11 tuổi)', body: 'Kiến thức cốt lõi, tiếng Anh Cambridge, tư duy phản biện và sáng tạo.' },
    { title: 'THCS – THPT (11-18 tuổi)', body: 'Chuẩn bị IELTS, định hướng nghề nghiệp và kỹ năng tự chủ.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về chương trình',
  faqItems: [
    { question: 'Con có đủ kiến thức để thi vào trường công nếu chuyển không?', answer: 'Có. Chương trình đảm bảo kiến thức theo khung Bộ GD&ĐT, con có thể chuyển trường bất kỳ lúc nào.' },
    { question: 'Tiếng Anh có phải học thêm bên ngoài không?', answer: 'Không. Chương trình tiếng Anh chuyên sâu tại trường đã đủ để con đạt chuẩn Cambridge/IELTS Foundation.' },
    { question: 'PDR là gì?', answer: 'PDR (Personal Development Record) là hệ thống theo dõi phát triển cá nhân, giúp giáo viên và phụ huynh cùng nắm tiến bộ của con.' },
  ],
  testimonial: { quote: 'Chương trình ở đây rất cân bằng. Con vừa giỏi tiếng Anh, vừa không thiếu kiến thức Việt, lại biết tự quản lý bản thân.', author: 'Chị Phương Anh', role: 'Phụ huynh lớp 5' },
  relatedLinks: [
    { title: 'Mầm non', href: '/mam-non', body: 'Xem chi tiết cấp mầm non.' },
    { title: 'Tiểu học', href: '/tieu-hoc', body: 'Xem chi tiết cấp tiểu học.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Đăng ký nhập học cho con.' },
  ],
  ctaBannerEyebrow: 'Tìm hiểu thêm', ctaBannerTitle: 'Liên hệ để được tư vấn chương trình phù hợp nhất cho con',
  ctaBannerCopy: 'Mỗi bé có một lộ trình phát triển riêng. Đội tuyển sinh sẽ giúp ba mẹ chọn đúng.',
});

// ─── 9. Master Campus Profile ───────────────────────────────────────────
reg('class-master-campus-profile', {
  metaDescription: 'Trường Việt Anh cơ sở Gò Vấp – Phan Huy Ích. Khuôn viên rộng, tiện đưa đón, đầy đủ cấp học. Xem ảnh thật, đánh giá và đặt lịch tham quan.',
  heroBadge: 'Cơ sở Gò Vấp – Phan Huy Ích',
  heroTitle: 'Trường Việt Anh cơ sở Gò Vấp — Gần nhà, rộng rãi, đầy đủ cấp học',
  heroCopy: 'Cơ sở Phan Huy Ích nằm tại trung tâm quận Gò Vấp, cách chợ Gò Vấp chỉ 5 phút. Khuôn viên rộng hơn 2,000m² với đầy đủ mầm non, tiểu học, phòng gym, sân chơi và bếp ăn chuẩn.',
  asideEyebrow: 'Thông tin nhanh', asideTitle: 'Cơ sở Gò Vấp – Phan Huy Ích',
  asidePoints: ['Địa chỉ: 123 Phan Huy Ích, P.14, Q. Gò Vấp', 'Cấp học: Mầm non, Tiểu học', 'Giờ hoạt động: 7:00 – 17:30', 'Hotline: 028 xxxx xxxx'],
  ctaPrimaryText: 'Đặt lịch tham quan', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Gọi cơ sở', ctaSecondaryHref: 'tel:028xxxxxxxx',
  statsEyebrow: 'Cơ sở Phan Huy Ích', statsTitle: 'Không gian học tập chinh phục phụ huynh',
  stats: [{ value: '2,000m²', label: 'Khuôn viên' }, { value: '15+', label: 'Phòng học' }, { value: '2', label: 'Cấp học' }, { value: '98%', label: 'PH hài lòng' }],
  featuresEyebrow: 'Điểm nổi bật', featuresTitle: 'Những gì làm nên cơ sở Gò Vấp',
  features: [
    { title: 'Vị trí thuận tiện', body: 'Gần trung tâm Gò Vấp, các tuyến đường chính, dễ đưa đón và kết nối giao thông.' },
    { title: 'Không gian xanh, thoáng', body: 'Khuôn viên rộng với cây xanh, sân chơi ngoài trời và phòng học thoáng mát.' },
    { title: 'An ninh 24/7', body: 'Camera giám sát, nhân viên bảo vệ và quy trình đón-trả an toàn.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về cơ sở Gò Vấp',
  faqItems: [
    { question: 'Cơ sở có xe đưa đón không?', answer: 'Có. Dịch vụ xe đưa đón theo tuyến phục vụ phụ huynh trong bán kính hợp lý.' },
    { question: 'Bé ăn trưa ở đâu?', answer: 'Trường có bếp ăn riêng, thực đơn được chuyên gia dinh dưỡng thiết kế theo tuần.' },
    { question: 'Cơ sở mở cửa vào thứ 7 không?', answer: 'Sáng thứ 7 phục vụ cho các buổi tham quan và hoạt động ngoại khóa đặc biệt.' },
  ],
  testimonial: { quote: 'Tôi chọn cơ sở Gò Vấp vì gần nhà, nhưng ấn tượng nhất là không gian rộng và giáo viên cực kỳ thân thiện.', author: 'Anh Tuấn Kiệt', role: 'Phụ huynh tiểu học cơ sở Gò Vấp' },
  relatedLinks: [
    { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Đặt lịch để xem trường trực tiếp.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Xem bảng học phí áp dụng tại cơ sở này.' },
    { title: 'Mầm non', href: '/mam-non', body: 'Tìm hiểu chương trình mầm non tại đây.' },
  ],
  ctaBannerEyebrow: 'Gần nhà, yên tâm', ctaBannerTitle: 'Đến tham quan cơ sở Gò Vấp để cảm nhận trực tiếp',
  ctaBannerCopy: 'Đặt lịch ngay hoặc gọi hotline để đội ngũ sắp xếp buổi tham quan phù hợp.',
});

// ─── 10. Virtual Tour 360° ──────────────────────────────────────────────
reg('class-virtual-tour-360', {
  metaDescription: 'Tham quan thực tế ảo Trường Việt Anh. Khám phá lớp học, sân chơi, bếp ăn và không gian học tập ngay trên điện thoại.',
  heroBadge: 'Tham quan ảo 360°',
  heroTitle: 'Khám phá Trường Việt Anh ngay trên màn hình — Tham quan ảo 360 độ',
  heroCopy: 'Ba mẹ bận rộn hoặc ở xa? Hãy trải nghiệm không gian học tập của con qua tour ảo tương tác. Xem phòng học, sân chơi, bếp ăn và các khu chức năng như đang ở trường thật.',
  asideEyebrow: 'Khu vực tham quan', asideTitle: 'Các không gian ba mẹ có thể khám phá',
  asidePoints: ['Phòng học mầm non và tiểu học', 'Sân chơi ngoài trời và phòng gym', 'Bếp ăn và khu bán trú', 'Phòng tiếng Anh và thư viện'],
  ctaPrimaryText: 'Bắt đầu khám phá', ctaPrimaryHref: '#virtual-tour',
  ctaSecondaryText: 'Đặt lịch tham quan thật', ctaSecondaryHref: '/tham-quan-truong',
  statsEyebrow: 'Cơ sở Gò Vấp', statsTitle: 'Không gian thật, trải nghiệm thật',
  stats: [{ value: '10+', label: 'Điểm tham quan' }, { value: '360°', label: 'Góc nhìn tương tác' }, { value: '2,000m²', label: 'Tổng diện tích' }, { value: '24/7', label: 'Xem bất cứ lúc nào' }],
  featuresEyebrow: 'Các khu vực', featuresTitle: 'Không gian mà con sẽ sinh hoạt mỗi ngày',
  features: [
    { title: 'Phòng học hiện đại', body: 'Phòng học rộng rãi, đầy đủ thiết bị, ánh sáng tự nhiên và bố trí phù hợp từng lứa tuổi.' },
    { title: 'Sân chơi & Vận động', body: 'Không gian ngoài trời với thiết bị vận động an toàn, giúp con phát triển thể chất mỗi ngày.' },
    { title: 'Bếp ăn & Nghỉ trưa', body: 'Bếp sạch, phòng ngủ thoáng mát — nơi con được chăm sóc từ bữa ăn đến giấc ngủ.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về virtual tour',
  faqItems: [
    { question: 'Xem virtual tour có cần cài app không?', answer: 'Không. Tour hoạt động trực tiếp trên trình duyệt web, cả điện thoại lẫn máy tính.' },
    { question: 'Tour ảo có thay thế tham quan thật không?', answer: 'Tour ảo giúp ba mẹ xem trước, nhưng chúng tôi vẫn khuyến khích đến trường để cảm nhận đầy đủ hơn.' },
  ],
  testimonial: { quote: 'Tôi xem virtual tour lúc 10 giờ đêm và quyết định đặt lịch tham quan ngay sáng hôm sau. Tiện lợi lắm!', author: 'Chị Kim Ngân', role: 'Phụ huynh đang tìm trường' },
  relatedLinks: [
    { title: 'Cơ sở Gò Vấp', href: '/co-so', body: 'Xem thông tin đầy đủ về cơ sở.' },
    { title: 'Tham quan thật', href: '/tham-quan-truong', body: 'Đặt lịch tham quan trực tiếp.' },
    { title: 'Liên hệ', href: '/lien-he', body: 'Gọi hoặc nhắn để được hỗ trợ.' },
  ],
  ctaBannerEyebrow: 'Muốn xem thật?', ctaBannerTitle: 'Sau tour ảo, hãy đến tham quan trường để cảm nhận trọn vẹn',
  ctaBannerCopy: 'Đặt lịch tham quan trực tiếp để gặp giáo viên, xem lớp học và trải nghiệm môi trường thật cho con.',
});

// ─── 11. Local Intent Landing ───────────────────────────────────────────
reg('class-local-intent', {
  metaDescription: 'Trường mầm non song ngữ gần Gò Vấp. Trường Việt Anh cơ sở Phan Huy Ích — gần chợ Gò Vấp, đầy đủ tiện ích.',
  heroBadge: 'Trường mầm non gần Gò Vấp',
  heroTitle: 'Tìm trường mầm non song ngữ gần Gò Vấp? Trường Việt Anh cách chợ Gò Vấp chỉ 5 phút',
  heroCopy: 'Cơ sở Phan Huy Ích nằm ngay trung tâm quận Gò Vấp, thuận tiện đưa đón. Chương trình mầm non song ngữ, tiếng Anh mỗi ngày, bán trú và xe đưa đón.',
  asideEyebrow: 'Gần nhà bạn', asideTitle: 'Vì sao cơ sở Gò Vấp phù hợp?',
  asidePoints: ['Cách chợ Gò Vấp 5 phút', 'Gần Lotte Mart Gò Vấp', 'Xe đưa đón trong bán kính 5km', 'Khuôn viên rộng 2,000m²'],
  ctaPrimaryText: 'Xem cơ sở', ctaPrimaryHref: '/co-so',
  ctaSecondaryText: 'Tư vấn ngay', ctaSecondaryHref: '/tuyen-sinh',
  statsEyebrow: 'Cơ sở Gò Vấp', statsTitle: 'Trường gần nhà mà vẫn đảm bảo chất lượng',
  stats: [{ value: '5 phút', label: 'Từ chợ Gò Vấp' }, { value: '2,000m²', label: 'Khuôn viên' }, { value: '1:8', label: 'Tỉ lệ GV/HS' }, { value: '20+', label: 'Năm kinh nghiệm' }],
  featuresEyebrow: 'Tiện ích', featuresTitle: 'Những gì gia đình nhận được tại cơ sở Gò Vấp',
  features: [
    { title: 'Tiếng Anh bản ngữ', body: 'Giáo viên nước ngoài dạy tiếng Anh mỗi ngày, không cần học thêm bên ngoài.' },
    { title: 'Bán trú toàn diện', body: 'Bữa ăn dinh dưỡng, nghỉ trưa, ngoại khóa — ba mẹ yên tâm cả ngày.' },
    { title: 'An toàn, giám sát', body: 'Camera 24/7, quy trình đón trả nghiêm ngặt, nhân viên y tế thường trực.' },
  ],
  sections: [], faqTitle: 'Câu hỏi phụ huynh khu vực Gò Vấp',
  faqItems: [
    { question: 'Trường có xe đưa đón khu vực Gò Vấp không?', answer: 'Có. Xe chạy nhiều tuyến trong quận Gò Vấp và vùng lân cận.' },
    { question: 'Học phí cơ sở Gò Vấp bao nhiêu?', answer: 'Để nhận bảng học phí chi tiết, ba mẹ vui lòng liên hệ tuyển sinh hoặc xem trang học phí.' },
  ],
  testimonial: { quote: 'Nhà tôi ở gần Lotte Mart, đưa con đi học chỉ 5 phút. Tiện mà chất lượng thì không thua trường quốc tế nào.', author: 'Chị Minh Châu', role: 'Phụ huynh mầm non Gò Vấp' },
  relatedLinks: [
    { title: 'Cơ sở Gò Vấp', href: '/co-so', body: 'Xem chi tiết cơ sở Phan Huy Ích.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Nhận bảng học phí cấp mầm non.' },
    { title: 'Tham quan', href: '/tham-quan-truong', body: 'Đặt lịch xem trường.' },
  ],
  ctaBannerEyebrow: 'Gần nhà, chất lượng', ctaBannerTitle: 'Đặt lịch tham quan cơ sở Gò Vấp ngay hôm nay',
  ctaBannerCopy: 'Gọi hotline hoặc nhắn Zalo để được sắp xếp buổi tham quan thuận tiện nhất.',
});

// ─── 12. Parent Hub Article ─────────────────────────────────────────────
reg('class-parent-hub-article', {
  metaDescription: 'Cách chọn trường mầm non phù hợp cho con. 5 tiêu chí quan trọng nhất phụ huynh nên xem xét khi tìm trường.',
  heroBadge: 'Kiến thức phụ huynh',
  heroTitle: 'Cách chọn trường mầm non phù hợp cho con — 5 tiêu chí quan trọng nhất',
  heroCopy: 'Chọn trường mầm non là một trong những quyết định lớn đầu tiên của ba mẹ. Bài viết này giúp ba mẹ xác định 5 tiêu chí quan trọng nhất và cách đánh giá một trường mầm non phù hợp.',
  asideEyebrow: 'Tóm tắt', asideTitle: '5 tiêu chí chọn trường mầm non',
  asidePoints: ['An toàn và vệ sinh', 'Chương trình giáo dục', 'Đội ngũ giáo viên', 'Vị trí và tiện ích', 'Học phí và minh bạch'],
  ctaPrimaryText: 'Xem chương trình Việt Anh', ctaPrimaryHref: '/mam-non',
  ctaSecondaryText: 'Nhận tư vấn', ctaSecondaryHref: '/tuyen-sinh',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: '5 tiêu chí', featuresTitle: 'Những yếu tố quyết định khi chọn trường cho con',
  features: [
    { title: 'An toàn là trên hết', body: 'Kiểm tra cơ sở vật chất, camera giám sát, quy trình đón trả và nhân viên y tế.' },
    { title: 'Chương trình phù hợp lứa tuổi', body: 'Chương trình nên cân bằng học và chơi, có tiếng Anh sớm và phát triển kỹ năng sống.' },
    { title: 'Giáo viên tận tâm', body: 'Giáo viên có bằng cấp, kinh nghiệm và quan trọng nhất — yêu trẻ và kiên nhẫn.' },
  ],
  sections: [{
    eyebrow: 'Tại Trường Việt Anh', heading: 'Cách Trường Việt Anh áp dụng 5 tiêu chí này',
    cards: [
      { title: 'An toàn 24/7', body: 'Camera toàn trường, quy trình đón-trả nghiêm ngặt, nhân viên y tế thường trực.' },
      { title: 'Tiếng Anh bản ngữ mỗi ngày', body: 'Từ 2 tuổi, con đã được tiếp xúc tiếng Anh tự nhiên qua giáo viên nước ngoài.' },
      { title: 'PDR cá nhân hóa', body: 'Mỗi bé có hồ sơ phát triển riêng, ba mẹ được cập nhật liên tục.' },
    ],
  }],
  faqTitle: 'Câu hỏi liên quan',
  faqItems: [
    { question: 'Nên cho con đi mầm non từ mấy tuổi?', answer: 'Từ 2-3 tuổi là thời điểm phù hợp. Ở tuổi này, con bắt đầu cần môi trường xã hội hóa và kích thích phát triển.' },
    { question: 'Trường song ngữ có khác trường thường không?', answer: 'Trường song ngữ dạy tiếng Anh song hành với tiếng Việt, giúp con hình thành nền tảng ngôn ngữ sớm hơn.' },
  ],
  testimonial: { quote: 'Tôi đọc bài này trước khi đến tham quan Việt Anh. Mọi tiêu chí đều đạt, đặc biệt là sự minh bạch và tận tâm của giáo viên.', author: 'Chị Yến Nhi', role: 'Phụ huynh đã nhập học' },
  relatedLinks: [
    { title: 'Mầm non Việt Anh', href: '/mam-non', body: 'Xem chương trình mầm non song ngữ.' },
    { title: 'FAQ mầm non', href: '/faq', body: 'Giải đáp thêm thắc mắc về mầm non.' },
    { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Đặt lịch để xem trường trực tiếp.' },
  ],
  ctaBannerEyebrow: 'Đã đọc xong?', ctaBannerTitle: 'Đặt lịch tham quan để trải nghiệm trực tiếp những gì bạn vừa đọc',
  ctaBannerCopy: 'Hãy đến Trường Việt Anh và tự kiểm chứng 5 tiêu chí trên. Đội ngũ sẵn sàng đón gia đình bạn.',
});

// ─── 13. Comparison Engine ──────────────────────────────────────────────
reg('class-comparison-engine', {
  metaDescription: 'So sánh Trường Việt Anh với trường công lập và trường quốc tế. Bảng so sánh minh bạch giúp phụ huynh chọn đúng.',
  heroBadge: 'So sánh minh bạch',
  heroTitle: 'Trường Việt Anh so với trường công và trường quốc tế — So sánh để chọn đúng',
  heroCopy: 'Mỗi mô hình trường có ưu và nhược riêng. Bảng so sánh dưới đây giúp ba mẹ nhìn khách quan và chọn mô hình phù hợp nhất với nhu cầu gia đình.',
  asideEyebrow: 'Kết luận nhanh', asideTitle: 'Khi nào nên chọn Việt Anh?',
  asidePoints: ['Muốn con giỏi tiếng Anh mà không cần học thêm', 'Cần bán trú, xe đưa đón và ngoại khóa', 'Muốn theo dõi sát sự phát triển của con', 'Học phí hợp lý hơn trường quốc tế'],
  ctaPrimaryText: 'Nhận tư vấn chọn trường', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Xem học phí', ctaSecondaryHref: '/hoc-phi',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'So sánh', featuresTitle: 'Ba mô hình trường — ưu nhược rõ ràng',
  features: [
    { title: 'Trường công lập', body: 'Học phí thấp, gần nhà. Nhưng sĩ số đông, ít ngoại ngữ và không có hệ thống theo dõi cá nhân.' },
    { title: 'Trường Việt Anh', body: 'Tiếng Anh mỗi ngày, PDR cá nhân hóa, bán trú toàn diện. Học phí hợp lý hơn quốc tế.' },
    { title: 'Trường quốc tế', body: 'Chương trình quốc tế 100%, nhưng học phí rất cao và có thể thiếu nền tảng tiếng Việt.' },
  ],
  sections: [], faqTitle: 'Câu hỏi sau khi so sánh',
  faqItems: [
    { question: 'Con học Việt Anh có thể chuyển sang trường công được không?', answer: 'Có. Chương trình đảm bảo kiến thức theo khung Bộ GD&ĐT nên con hoàn toàn có thể chuyển trường.' },
    { question: 'Học phí Việt Anh so với quốc tế thì sao?', answer: 'Thấp hơn đáng kể so với trường quốc tế, nhưng vẫn đảm bảo tiếng Anh bản ngữ và dịch vụ toàn diện.' },
    { question: 'Tiếng Anh ở Việt Anh có bằng trường quốc tế không?', answer: 'Chương trình tiếng Anh chuyên sâu với giáo viên bản ngữ, chuẩn bị nên tảng IELTS. Đây là thế mạnh cốt lõi.' },
  ],
  testimonial: { quote: 'Trước khi chọn, tôi so sánh rất kỹ giữa 3 mô hình. Việt Anh cho tôi sự cân bằng tốt nhất: chất lượng quốc tế, học phí hợp lý.', author: 'Anh Quốc Bảo', role: 'Phụ huynh lớp 3' },
  relatedLinks: [
    { title: 'Học phí', href: '/hoc-phi', body: 'Nhận bảng học phí chi tiết.' },
    { title: 'Tham quan', href: '/tham-quan-truong', body: 'Đến trường để xem trực tiếp.' },
    { title: 'Chương trình', href: '/mam-non', body: 'Xem chi tiết chương trình.' },
  ],
  ctaBannerEyebrow: 'Đã so sánh xong?', ctaBannerTitle: 'Liên hệ để nhận tư vấn riêng cho gia đình bạn',
  ctaBannerCopy: 'Mỗi gia đình có nhu cầu khác nhau. Đội tuyển sinh sẽ giúp ba mẹ chọn đúng nhất.',
});

// ─── 14. AI-Ready FAQ ───────────────────────────────────────────────────
reg('class-ai-ready-faq', {
  metaDescription: 'Câu hỏi thường gặp về Trường Việt Anh: học phí, tuyển sinh, chương trình, tiếng Anh, bán trú, xe đưa đón và nhiều hơn.',
  heroBadge: 'Trung tâm giải đáp',
  heroTitle: 'Giải đáp mọi thắc mắc về Trường Việt Anh — Nhanh, rõ và đáng tin',
  heroCopy: 'Tổng hợp những câu hỏi phụ huynh thường hỏi nhất về học phí, tuyển sinh, chương trình, tiếng Anh, cơ sở vật chất và dịch vụ. Mỗi câu trả lời đều ngắn gọn, trực tiếp.',
  asideEyebrow: 'Chủ đề phổ biến', asideTitle: 'Ba mẹ thường hỏi gì?',
  asidePoints: ['Học phí bao nhiêu?', 'Có bán trú không?', 'Tiếng Anh dạy như thế nào?', 'Quy trình tuyển sinh ra sao?'],
  ctaPrimaryText: 'Gọi giải đáp ngay', ctaPrimaryHref: 'tel:028xxxxxxxx',
  ctaSecondaryText: 'Nhắn Zalo', ctaSecondaryHref: 'https://zalo.me/truongvietanh',
  statsEyebrow: 'FAQ Trường Việt Anh', statsTitle: 'Câu hỏi được phân nhóm để tìm nhanh hơn',
  stats: [{ value: '20+', label: 'Câu hỏi phổ biến' }, { value: '4', label: 'Nhóm chủ đề' }, { value: '<30s', label: 'Mỗi câu trả lời' }, { value: '24/7', label: 'Hỗ trợ qua Zalo' }],
  featuresEyebrow: '', featuresTitle: '', features: [],
  sections: [{
    eyebrow: 'Học phí & Tài chính', heading: 'Câu hỏi về học phí, ưu đãi và chính sách tài chính',
    cards: [
      { title: 'Học phí bao gồm gì?', body: 'Tiếng Anh bản ngữ, ăn bán trú, ngoại khóa, PDR và các hoạt động cốt lõi. Không phát sinh phí học tiếng Anh.' },
      { title: 'Có ưu đãi anh chị em không?', body: 'Có. Gia đình có từ 2 con trở lên tại Việt Anh được nhận ưu đãi học phí.' },
      { title: 'Có thể đóng theo tháng không?', body: 'Trường hỗ trợ đóng theo năm, kỳ hoặc tháng tùy nhu cầu gia đình.' },
    ],
  }],
  faqTitle: 'Tuyển sinh & Chương trình',
  faqItems: [
    { question: 'Quy trình tuyển sinh như thế nào?', answer: 'Ba mẹ đăng ký online hoặc tại trường → nhận tư vấn → tham quan → hoàn tất hồ sơ → nhập học.' },
    { question: 'Có cần thi đầu vào không?', answer: 'Mầm non và lớp 1 không cần thi. Từ lớp 2 trở lên có đánh giá nhẹ để xếp lớp phù hợp.' },
    { question: 'Con chuyển từ trường khác đến có hòa nhập được không?', answer: 'Trường có chương trình hỗ trợ hòa nhập riêng, giúp con quen bạn mới và chương trình trong 2-4 tuần.' },
    { question: 'Trường có cấp THCS và THPT không?', answer: 'Hiện tại trường đang phát triển hệ thống liên cấp. Ba mẹ vui lòng liên hệ để biết thêm.' },
  ],
  testimonial: { quote: 'Mọi câu hỏi của tôi đều được trả lời nhanh và rõ. Đội tư vấn rất chuyên nghiệp, không hề gây áp lực.', author: 'Chị Hồng Nhung', role: 'Phụ huynh đang tìm trường' },
  relatedLinks: [
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Xem đầy đủ quy trình nhập học.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Nhận bảng học phí chi tiết.' },
    { title: 'Liên hệ', href: '/lien-he', body: 'Gọi hoặc nhắn để được hỗ trợ thêm.' },
  ],
  ctaBannerEyebrow: 'Chưa tìm thấy câu trả lời?', ctaBannerTitle: 'Liên hệ đội tuyển sinh để được giải đáp riêng',
  ctaBannerCopy: 'Nhắn Zalo hoặc gọi hotline — đội ngũ sẵn sàng giải đáp mọi thắc mắc của ba mẹ.',
});

// ─── 15. Tuition & Fee Structure ────────────────────────────────────────
reg('class-tuition-fee-structure', {
  metaDescription: 'Cấu trúc học phí Trường Việt Anh: chi tiết các khoản bao gồm, ưu đãi, học bổng và chính sách hỗ trợ tài chính.',
  heroBadge: 'Minh bạch tài chính',
  heroTitle: 'Học phí Trường Việt Anh — Minh bạch từng khoản, rõ ràng từng giá trị',
  heroCopy: 'Chúng tôi tin rằng minh bạch học phí là cách tốt nhất để phụ huynh đưa ra quyết định. Trang này giải thích cấu trúc phí, các khoản đã bao gồm và chính sách hỗ trợ.',
  asideEyebrow: 'Đã bao gồm', asideTitle: 'Học phí Việt Anh bao gồm gì?',
  asidePoints: ['Tiếng Anh bản ngữ mỗi ngày', 'Ăn bán trú 3 bữa', 'Ngoại khóa cốt lõi', 'Hệ thống PDR theo dõi cá nhân'],
  ctaPrimaryText: 'Nhận báo giá chi tiết', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Tư vấn tài chính', ctaSecondaryHref: '/lien-he',
  statsEyebrow: 'Học phí Việt Anh', statsTitle: 'Đầu tư hợp lý cho tương lai con',
  stats: [{ value: '0đ', label: 'Phí tiếng Anh thêm' }, { value: '3', label: 'Bữa ăn/ngày' }, { value: '12', label: 'Môn ngoại khóa' }, { value: 'PDR', label: 'Theo dõi miễn phí' }],
  featuresEyebrow: 'Cấu trúc', featuresTitle: 'Các nhóm khoản phí chính',
  features: [
    { title: 'Học phí chính khóa', body: 'Bao gồm toàn bộ chương trình giáo dục chính quy theo khung Bộ GD&ĐT và chương trình tiếng Anh chuyên sâu.' },
    { title: 'Bán trú & Dịch vụ', body: 'Bữa ăn, nghỉ trưa, xe đưa đón (tùy chọn) và các hoạt động ngoại khóa cốt lõi.' },
    { title: 'Ưu đãi & Học bổng', body: 'Ưu đãi đăng ký sớm, ưu đãi anh chị em, học bổng học lực và tài năng.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về học phí',
  faqItems: [
    { question: 'Học phí có tăng hàng năm không?', answer: 'Nếu có điều chỉnh, trường cam kết thông báo trước ít nhất 3 tháng.' },
    { question: 'Xe đưa đón tính phí riêng không?', answer: 'Có. Phí xe đưa đón tính theo tuyến, nằm ngoài học phí chính khóa.' },
    { question: 'Có hoàn phí nếu con nghỉ ngang không?', answer: 'Chính sách hoàn phí áp dụng theo quy định của trường. Ba mẹ vui lòng liên hệ tuyển sinh để biết thêm.' },
  ],
  relatedLinks: [
    { title: 'Nhận bảng học phí', href: '/hoc-phi', body: 'Trang nhận bảng học phí nhanh.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Bước tiếp theo sau khi xem học phí.' },
    { title: 'Học bổng', href: '/hoc-bong', body: 'Xem các chương trình học bổng hiện có.' },
  ],
  ctaBannerEyebrow: 'Cần thêm chi tiết?', ctaBannerTitle: 'Nhận báo giá chi tiết theo cấp học và cơ sở phù hợp',
  ctaBannerCopy: 'Đội tuyển sinh sẵn sàng gửi bảng học phí qua Zalo hoặc email trong vài phút.',
});

// ─── 16. Objection Handler ──────────────────────────────────────────────
reg('class-objection-handler', {
  metaDescription: 'Học phí Trường Việt Anh có đáng không? Giải tỏa lo lắng với bằng chứng thực tế, so sánh và câu chuyện phụ huynh.',
  heroBadge: 'Giải tỏa lo lắng',
  heroTitle: 'Học phí có cao không? — Câu trả lời thẳng thắn và minh bạch từ Trường Việt Anh',
  heroCopy: 'Đây là một trong những câu hỏi phụ huynh hỏi nhiều nhất. Thay vì tránh né, chúng tôi trả lời trực tiếp: học phí Việt Anh đã bao gồm gì và vì sao nó xứng đáng với giá trị gia đình nhận được.',
  asideEyebrow: 'Câu trả lời ngắn', asideTitle: 'Không. Khi so với giá trị thật mà con nhận được.',
  asidePoints: ['Tiếng Anh mỗi ngày — không học thêm', 'Bán trú + ngoại khóa — không phí phát sinh', 'PDR cá nhân — không trường công nào có', 'Rẻ hơn quốc tế — chất không kém'],
  ctaPrimaryText: 'Nhắn Zalo trao đổi', ctaPrimaryHref: 'https://zalo.me/truongvietanh',
  ctaSecondaryText: 'Xem học phí thật', ctaSecondaryHref: '/hoc-phi',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'Sự thật', featuresTitle: 'Ba bằng chứng cho thấy học phí Việt Anh xứng đáng',
  features: [
    { title: 'Không phí ẩn', body: 'Học phí đã bao gồm tiếng Anh, ăn bán trú, ngoại khóa và PDR. Không phát sinh thêm các khoản ngoài.' },
    { title: 'So sánh thực tế', body: 'Nếu cộng phí học thêm tiếng Anh + trông trẻ + ngoại khóa ở trường công, tổng chi phí có thể tương đương.' },
    { title: '95% PH hài lòng', body: 'Phụ huynh đánh giá cao sự minh bạch và giá trị thực tế con nhận được mỗi ngày.' },
  ],
  sections: [], faqTitle: 'Câu hỏi liên quan',
  faqItems: [
    { question: 'Có ưu đãi nào giảm học phí không?', answer: 'Có. Ưu đãi đăng ký sớm, ưu đãi anh chị em và học bổng cho học sinh có thành tích.' },
    { question: 'Tôi muốn xem trường trước khi quyết định, có được không?', answer: 'Hoàn toàn được. Hãy đặt lịch tham quan miễn phí để tự đánh giá.' },
  ],
  testimonial: { quote: 'Ban đầu tôi cũng nghĩ học phí cao, nhưng khi tính tổng chi phí nếu con học trường công rồi học thêm bên ngoài, thì Việt Anh thực ra còn rẻ hơn.', author: 'Chị Thùy Linh', role: 'Phụ huynh lớp 2' },
  relatedLinks: [
    { title: 'Học phí chi tiết', href: '/hoc-phi', body: 'Xem cấu trúc học phí đầy đủ.' },
    { title: 'Học thử', href: '/hoc-thu', body: 'Cho con trải nghiệm trước.' },
    { title: 'Tham quan', href: '/tham-quan-truong', body: 'Xem trường thật rồi quyết định.' },
  ],
  ctaBannerEyebrow: 'Vẫn còn băn khoăn?', ctaBannerTitle: 'Nhắn Zalo hoặc đặt lịch tham quan — không áp lực, không ràng buộc',
  ctaBannerCopy: 'Đội tư vấn Việt Anh sẵn sàng trả lời mọi lo lắng của ba mẹ một cách thẳng thắn nhất.',
});

// ─── 17. Homepage ───────────────────────────────────────────────────────
reg('class-homepage', {
  metaDescription: 'Trường Việt Anh — Hệ thống giáo dục liên cấp song ngữ tại TP.HCM. Hạnh phúc, thực dụng, tự chủ, chuyên Anh.',
  heroBadge: 'Trường Việt Anh',
  heroTitle: 'Kiến tạo những công dân toàn cầu hạnh phúc — Hệ thống giáo dục liên cấp song ngữ',
  heroCopy: 'Trường Việt Anh là hệ thống giáo dục liên cấp từ mầm non đến THPT tại TP.HCM. Triết lý "Học thật, Sống chất, Không áp lực ảo" với tiếng Anh mỗi ngày và hệ thống phát triển cá nhân PDR.',
  asideEyebrow: '4 cấp học', asideTitle: 'Đồng hành cùng con từ 2 đến 18 tuổi',
  asidePoints: ['Mầm non song ngữ (2-6 tuổi)', 'Tiểu học (6-11 tuổi)', 'THCS (11-15 tuổi)', 'THPT (15-18 tuổi)'],
  ctaPrimaryText: 'Đăng ký tư vấn', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Chọn cấp học', ctaSecondaryHref: '/mam-non',
  statsEyebrow: 'Trường Việt Anh', statsTitle: 'Được hàng ngàn gia đình tin tưởng',
  stats: [{ value: '20+', label: 'Năm hoạt động' }, { value: '3+', label: 'Cơ sở TP.HCM' }, { value: '4', label: 'Cấp học liên cấp' }, { value: '95%', label: 'PH hài lòng' }],
  featuresEyebrow: 'Khác biệt cốt lõi', featuresTitle: 'Tại sao hàng ngàn gia đình chọn Trường Việt Anh',
  features: [
    { title: 'Hạnh phúc là nền tảng', body: 'Con yêu trường, tự tin đi học mỗi ngày. Hạnh phúc trước, thành tích bền.' },
    { title: 'Tiếng Anh mỗi ngày', body: 'Giáo viên bản ngữ từ mầm non, chuẩn bị nền tảng IELTS cho tương lai.' },
    { title: 'PDR cá nhân hóa', body: 'Mỗi học sinh có hồ sơ phát triển riêng, ba mẹ đồng hành sát sao.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  relatedLinks: [
    { title: 'Mầm non', href: '/mam-non', body: 'Chương trình mầm non song ngữ.' },
    { title: 'Học phí', href: '/hoc-phi', body: 'Nhận bảng học phí chi tiết.' },
    { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Đặt lịch tham quan miễn phí.' },
  ],
  ctaBannerEyebrow: 'Bắt đầu ngay', ctaBannerTitle: 'Hãy để Trường Việt Anh đồng hành cùng gia đình bạn',
  ctaBannerCopy: 'Đăng ký tư vấn hoặc đặt lịch tham quan — bước đầu tiên để tìm trường phù hợp cho con.',
});

// ─── 18. Contact / Multiple Locations ───────────────────────────────────
reg('class-contact-multiple-locations', {
  metaDescription: 'Liên hệ Trường Việt Anh. Tổng đài, Zalo, email và địa chỉ các cơ sở tại TP.HCM.',
  heroBadge: 'Liên hệ hệ thống',
  heroTitle: 'Liên hệ Trường Việt Anh — Tìm cơ sở gần nhất và kênh hỗ trợ phù hợp',
  heroCopy: 'Ba mẹ có thể liên hệ tổng đài, nhắn Zalo hoặc đến trực tiếp các cơ sở. Đội ngũ tuyển sinh hỗ trợ từ thứ 2 đến thứ 7, sáng 8h đến chiều 17h.',
  asideEyebrow: 'Liên hệ nhanh', asideTitle: 'Các kênh hỗ trợ',
  asidePoints: ['Tổng đài: 028 xxxx xxxx', 'Zalo: @truongvietanh', 'Email: info@truongvietanh.com', 'Giờ hỗ trợ: T2–T7, 8h–17h'],
  ctaPrimaryText: 'Liên hệ tuyển sinh', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Xem cơ sở', ctaSecondaryHref: '/co-so',
  statsEyebrow: 'Hệ thống', statsTitle: 'Nhiều cơ sở, một tiêu chuẩn',
  stats: [{ value: '3+', label: 'Cơ sở tại TP.HCM' }, { value: '4', label: 'Kênh liên hệ' }, { value: '<5 phút', label: 'Phản hồi Zalo' }, { value: 'T2–T7', label: 'Ngày hoạt động' }],
  featuresEyebrow: 'Các cơ sở', featuresTitle: 'Tìm cơ sở Trường Việt Anh gần nhất',
  features: [
    { title: 'Gò Vấp – Phan Huy Ích', body: '123 Phan Huy Ích, P.14, Q. Gò Vấp. Mầm non & Tiểu học. Hotline: 028 xxxx xxxx.' },
    { title: 'Gò Vấp – Lê Đức Thọ', body: '456 Lê Đức Thọ, P.6, Q. Gò Vấp. Mầm non chuyên biệt. Hotline: 028 xxxx xxxx.' },
    { title: 'Quận 12 (sắp khai trương)', body: 'Cơ sở mới dự kiến phục vụ khu vực Quận 12 và vùng lân cận.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về liên hệ',
  faqItems: [
    { question: 'Nhắn Zalo có được phản hồi nhanh không?', answer: 'Có. Zalo được phản hồi trong vòng 5 phút trong giờ hành chính.' },
    { question: 'Có thể đến trường không cần hẹn trước không?', answer: 'Ba mẹ nên hẹn trước để đội ngũ dành thời gian tư vấn tốt nhất. Nhưng luôn chào đón gia đình ghé thăm.' },
  ],
  relatedLinks: [
    { title: 'Tham quan trường', href: '/tham-quan-truong', body: 'Đặt lịch tham quan chính thức.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Bắt đầu quy trình nhập học.' },
    { title: 'FAQ', href: '/faq', body: 'Giải đáp các câu hỏi phổ biến.' },
  ],
  ctaBannerEyebrow: 'Sẵn sàng hỗ trợ', ctaBannerTitle: 'Gọi, nhắn hoặc ghé thăm — đội ngũ Trường Việt Anh luôn đón chào',
  ctaBannerCopy: 'Chọn kênh liên hệ thuận tiện nhất với gia đình bạn. Mọi thắc mắc đều được giải đáp tận tình.',
});

// ─── 19. Dynamic Comparison ─────────────────────────────────────────────
reg('class-dynamic-comparison', {
  metaDescription: 'So sánh Trường Việt Anh với các trường song ngữ khác. Bảng so sánh chi tiết, cập nhật liên tục.',
  heroBadge: 'Bảng so sánh động',
  heroTitle: 'Trường Việt Anh so với các trường song ngữ khác — Dữ liệu cập nhật, so sánh khách quan',
  heroCopy: 'Bảng so sánh này giúp ba mẹ nhìn vào dữ liệu thực tế khi cân nhắc giữa Trường Việt Anh và các mô hình trường song ngữ khác tại TP.HCM.',
  asideEyebrow: 'Gợi ý', asideTitle: 'Khi nào nên chọn Trường Việt Anh?',
  asidePoints: ['Ưu tiên tiếng Anh chuyên sâu', 'Cần bán trú và ngoại khóa', 'Muốn học phí hợp lý hơn quốc tế', 'Cần hệ thống theo dõi cá nhân'],
  ctaPrimaryText: 'Xem lựa chọn phù hợp', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Nhận tư vấn', ctaSecondaryHref: '/lien-he',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'So sánh', featuresTitle: 'Các tiêu chí so sánh chính',
  features: [
    { title: 'Chương trình giáo dục', body: 'Việt Anh: kết hợp khung quốc gia + tiếng Anh chuyên sâu + PDR. Nhiều trường song ngữ khác: chỉ thêm giờ tiếng Anh.' },
    { title: 'Học phí & Dịch vụ', body: 'Việt Anh: all-inclusive (tiếng Anh + bán trú + ngoại khóa). Nhiều trường: tính riêng từng khoản.' },
    { title: 'Hệ thống theo dõi', body: 'Việt Anh: PDR cá nhân hóa cho mỗi học sinh. Ít trường nào có hệ thống tương đương.' },
  ],
  sections: [], faqTitle: 'Câu hỏi so sánh',
  faqItems: [
    { question: 'Dữ liệu so sánh có chính xác không?', answer: 'Chúng tôi cập nhật dữ liệu từ công bố chính thức và khuyến khích ba mẹ tự kiểm chứng thêm.' },
    { question: 'Có thể so sánh theo cấp học cụ thể không?', answer: 'Có. Liên hệ tuyển sinh để nhận bảng so sánh chi tiết theo cấp học quan tâm.' },
  ],
  relatedLinks: [
    { title: 'Học phí', href: '/hoc-phi', body: 'So sánh trực tiếp về chi phí.' },
    { title: 'Chương trình', href: '/mam-non', body: 'Xem chi tiết chương trình Việt Anh.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Đăng ký sau khi đã so sánh đủ.' },
  ],
  ctaBannerEyebrow: 'So sánh xong?', ctaBannerTitle: 'Liên hệ để nhận tư vấn chi tiết cho gia đình bạn',
  ctaBannerCopy: 'Mỗi gia đình có nhu cầu khác nhau. Hãy để đội tuyển sinh giúp ba mẹ xác định lựa chọn phù hợp nhất.',
});

// ─── 20. Smart Thank-You ────────────────────────────────────────────────
reg('class-smart-thank-you', {
  metaDescription: 'Cảm ơn gia đình đã đăng ký. Đội ngũ Trường Việt Anh sẽ liên hệ trong vòng 24h.',
  heroBadge: 'Đã nhận thông tin',
  heroTitle: 'Cảm ơn gia đình đã tin tưởng Trường Việt Anh!',
  heroCopy: 'Chúng tôi đã nhận được thông tin đăng ký của gia đình. Đội tuyển sinh sẽ liên hệ qua Zalo hoặc điện thoại trong vòng 24 giờ làm việc để hỗ trợ bước tiếp theo.',
  asideEyebrow: 'Bước tiếp theo', asideTitle: 'Trong khi chờ đợi, ba mẹ có thể',
  asidePoints: ['Tham khảo chương trình học', 'Xem ảnh các cơ sở', 'Đọc câu hỏi thường gặp', 'Nhắn Zalo nếu cần hỗ trợ gấp'],
  ctaPrimaryText: 'Xem chương trình', ctaPrimaryHref: '/mam-non',
  ctaSecondaryText: 'Nhắn Zalo', ctaSecondaryHref: 'https://zalo.me/truongvietanh',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'Gợi ý', featuresTitle: 'Ba mẹ có thể tìm hiểu thêm trong lúc chờ liên hệ',
  features: [
    { title: 'Tham quan ảo', body: 'Khám phá không gian trường qua tour 360° ngay trên điện thoại.' },
    { title: 'Xem đánh giá', body: 'Đọc chia sẻ từ phụ huynh đang theo học tại Việt Anh.' },
    { title: 'Chuẩn bị hồ sơ', body: 'Xem danh sách giấy tờ cần chuẩn bị sẵn cho bước nhập học.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  relatedLinks: [
    { title: 'Cơ sở Gò Vấp', href: '/co-so', body: 'Xem chi tiết cơ sở gần nhất.' },
    { title: 'FAQ', href: '/faq', body: 'Giải đáp thắc mắc nhanh chóng.' },
    { title: 'Trang chủ', href: '/', body: 'Quay về trang chủ Trường Việt Anh.' },
  ],
  ctaBannerEyebrow: 'Cần hỗ trợ gấp?', ctaBannerTitle: 'Nhắn Zalo hoặc gọi hotline — đội ngũ sẵn sàng hỗ trợ ngay',
  ctaBannerCopy: 'Nếu ba mẹ cần liên hệ ngoài giờ hành chính, hãy nhắn Zalo và chúng tôi sẽ phản hồi sớm nhất.',
});

// ─── 21. Retention & Referral ───────────────────────────────────────────
reg('class-retention-referral', {
  metaDescription: 'Chương trình giới thiệu bạn bè Trường Việt Anh. Nhận ưu đãi khi giới thiệu gia đình mới.',
  heroBadge: 'Giới thiệu bạn bè',
  heroTitle: 'Giới thiệu bạn bè — Nhận ưu đãi cho cả gia đình giới thiệu và gia đình mới',
  heroCopy: 'Cảm ơn ba mẹ đã đồng hành cùng Trường Việt Anh. Khi giới thiệu thêm một gia đình mới, cả hai gia đình đều nhận được ưu đãi học phí.',
  asideEyebrow: 'Ưu đãi', asideTitle: 'Quyền lợi khi tham gia',
  asidePoints: ['Người giới thiệu: giảm học phí kỳ tiếp', 'Gia đình mới: giảm học phí kỳ đầu', 'Áp dụng cho mọi cấp học', 'Không giới hạn số lần giới thiệu'],
  ctaPrimaryText: 'Giới thiệu ngay', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Xem ưu đãi chi tiết', ctaSecondaryHref: '/hoc-phi',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'Cách tham gia', featuresTitle: 'Ba bước đơn giản để giới thiệu bạn bè',
  features: [
    { title: 'Chia sẻ thông tin', body: 'Gửi tên và số điện thoại gia đình bạn muốn giới thiệu cho đội tuyển sinh.' },
    { title: 'Gia đình mới tham quan', body: 'Đội ngũ liên hệ gia đình mới và hỗ trợ tham quan, tư vấn.' },
    { title: 'Nhận ưu đãi', body: 'Khi gia đình mới nhập học, cả hai bên đều nhận ưu đãi.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về chương trình giới thiệu',
  faqItems: [
    { question: 'Ưu đãi áp dụng cho cấp học nào?', answer: 'Tất cả cấp học từ mầm non đến THPT.' },
    { question: 'Có giới hạn số lần giới thiệu không?', answer: 'Không. Ba mẹ có thể giới thiệu nhiều gia đình và nhận ưu đãi mỗi lần.' },
  ],
  relatedLinks: [
    { title: 'Summer camp', href: '/open-day', body: 'Các hoạt động hè cho học sinh hiện tại.' },
    { title: 'Trang chủ', href: '/', body: 'Về trang chủ Trường Việt Anh.' },
    { title: 'Liên hệ', href: '/lien-he', body: 'Liên hệ đội tuyển sinh.' },
  ],
  ctaBannerEyebrow: 'Chia sẻ', ctaBannerTitle: 'Giới thiệu Trường Việt Anh cho bạn bè và nhận ưu đãi ngay',
  ctaBannerCopy: 'Cảm ơn ba mẹ đã đồng hành. Chương trình giới thiệu là cách chúng tôi tri ân cộng đồng phụ huynh.',
});

// ─── 22. Corporate Brand & Leadership ───────────────────────────────────
reg('class-corporate-brand-leadership', {
  metaDescription: 'Giới thiệu Trường Việt Anh: câu chuyện sáng lập, tầm nhìn, đội ngũ lãnh đạo và triết lý giáo dục.',
  heroBadge: 'Về Trường Việt Anh',
  heroTitle: 'Câu chuyện Trường Việt Anh — Kiến tạo hạnh phúc, giáo dục thực dụng',
  heroCopy: 'Trường Việt Anh được thành lập với sứ mệnh kiến tạo những công dân toàn cầu hạnh phúc. Hơn 20 năm qua, chúng tôi xây dựng hệ thống giáo dục liên cấp dựa trên triết lý thực dụng, tự chủ và chuyên Anh.',
  asideEyebrow: 'Giá trị cốt lõi', asideTitle: 'Năm trụ cột của Trường Việt Anh',
  asidePoints: ['Hạnh phúc', 'Thực dụng', 'Tự chủ', 'Chuyên Anh', 'Liên cấp K-12'],
  ctaPrimaryText: 'Tìm hiểu hệ thống', ctaPrimaryHref: '/mam-non',
  ctaSecondaryText: 'Xem đội ngũ', ctaSecondaryHref: '/doi-ngu',
  statsEyebrow: 'Cột mốc', statsTitle: 'Hành trình hơn hai thập kỷ giáo dục',
  stats: [{ value: '2003', label: 'Năm thành lập' }, { value: '3+', label: 'Cơ sở TP.HCM' }, { value: '4', label: 'Cấp học liên cấp' }, { value: '1000+', label: 'Học sinh mỗi năm' }],
  featuresEyebrow: 'Triết lý', featuresTitle: 'Nền tảng giáo dục của Trường Việt Anh',
  features: [
    { title: 'Hạnh phúc trước, thành tích bền', body: 'Khi con hạnh phúc, con học tốt hơn. Đây không chỉ là khẩu hiệu, đó là từng ngày ở Việt Anh.' },
    { title: 'Thực dụng, không ảo', body: 'Chương trình dạy kỹ năng sống, tư duy phản biện và chuẩn bị con cho cuộc sống thật.' },
    { title: 'Tự chủ từ sớm', body: 'Hệ thống PDR giúp mỗi học sinh biết tự quản lý bản thân, tự đặt mục tiêu và tự đánh giá.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  testimonial: { quote: 'Triết lý giáo dục của Việt Anh khiến tôi tin tưởng giao con cho trường. Không phải trường nào cũng dám nói "hạnh phúc trước thành tích".', author: 'Chị Bích Phượng', role: 'Phụ huynh đã đồng hành 5 năm' },
  relatedLinks: [
    { title: 'Đội ngũ giáo viên', href: '/doi-ngu', body: 'Gặp đội ngũ giáo viên đứng sau triết lý này.' },
    { title: 'Chương trình', href: '/mam-non', body: 'Xem triết lý được áp dụng ra sao.' },
    { title: 'Liên hệ', href: '/lien-he', body: 'Kết nối với Trường Việt Anh.' },
  ],
  ctaBannerEyebrow: 'Đồng hành', ctaBannerTitle: 'Hãy đến và cảm nhận tinh thần Trường Việt Anh trực tiếp',
  ctaBannerCopy: 'Đặt lịch tham quan hoặc đăng ký tư vấn để hiểu sâu hơn về con người và triết lý đứng sau.',
});

// ─── 23. Teacher / Faculty Profile ──────────────────────────────────────
reg('class-teacher-faculty-profile', {
  metaDescription: 'Đội ngũ giáo viên Trường Việt Anh: giáo viên bản ngữ, giáo viên Việt Nam, chuyên môn và triết lý giảng dạy.',
  heroBadge: 'Đội ngũ giáo viên',
  heroTitle: 'Gặp đội ngũ giáo viên — Những người đồng hành thật sự với con mỗi ngày',
  heroCopy: 'Đội ngũ Trường Việt Anh bao gồm giáo viên bản ngữ và giáo viên Việt Nam có chuyên môn cao, yêu trẻ và tận tâm. Mỗi giáo viên không chỉ dạy kiến thức mà còn truyền cảm hứng.',
  asideEyebrow: 'Đội ngũ', asideTitle: 'Điểm mạnh về con người',
  asidePoints: ['Giáo viên bản ngữ dạy tiếng Anh', '100% có bằng cấp chuyên môn', 'Đào tạo nội bộ liên tục', 'Yêu trẻ và kiên nhẫn'],
  ctaPrimaryText: 'Xem đội ngũ', ctaPrimaryHref: '/doi-ngu',
  ctaSecondaryText: 'Đặt lịch tham quan', ctaSecondaryHref: '/tham-quan-truong',
  statsEyebrow: 'Đội ngũ Việt Anh', statsTitle: 'Chất lượng con người là ưu tiên hàng đầu',
  stats: [{ value: '50+', label: 'Giáo viên' }, { value: '100%', label: 'Có bằng cấp' }, { value: '8+', label: 'Giáo viên bản ngữ' }, { value: '5+', label: 'Năm KN trung bình' }],
  featuresEyebrow: 'Đội ngũ', featuresTitle: 'Cấu trúc đội ngũ tại mỗi cơ sở',
  features: [
    { title: 'Giáo viên bản ngữ', body: 'Phụ trách tiếng Anh mỗi ngày, giúp con tiếp xúc ngôn ngữ tự nhiên và phát âm chuẩn.' },
    { title: 'Giáo viên Việt Nam', body: 'Dạy kiến thức cốt lõi theo khung Bộ GD&ĐT, kết hợp phương pháp hiện đại và gần gũi.' },
    { title: 'Đội ngũ hỗ trợ', body: 'Nhân viên y tế, bảo mẫu, chuyên gia dinh dưỡng — từng người phục vụ cho sự phát triển toàn diện của con.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về giáo viên',
  faqItems: [
    { question: 'Giáo viên bản ngữ đến từ đâu?', answer: 'Chủ yếu đến từ các nước nói tiếng Anh bản ngữ, có chứng chỉ TEFL/TESOL và kinh nghiệm dạy trẻ.' },
    { question: 'Tỷ lệ giáo viên/học sinh bao nhiêu?', answer: 'Mầm non 1:8, tiểu học 1:15-20. Luôn có trợ giảng và bảo mẫu hỗ trợ.' },
  ],
  testimonial: { quote: 'Điều tôi ấn tượng nhất là giáo viên nhớ tên và tính cách từng bé. Con tôi rất yêu cô giáo và mong đến trường mỗi ngày.', author: 'Chị Diệu Linh', role: 'Phụ huynh mầm non' },
  relatedLinks: [
    { title: 'Chương trình', href: '/mam-non', body: 'Xem chương trình giáo viên đang giảng dạy.' },
    { title: 'Tuyển dụng', href: '/tuyen-dung', body: 'Xem cơ hội làm việc tại Việt Anh.' },
    { title: 'Giới thiệu', href: '/gioi-thieu', body: 'Tìm hiểu thêm về trường.' },
  ],
  ctaBannerEyebrow: 'Muốn gặp giáo viên?', ctaBannerTitle: 'Đặt lịch tham quan để gặp trực tiếp đội ngũ',
  ctaBannerCopy: 'Hãy đến trường và trò chuyện với giáo viên. Đó là cách tốt nhất để cảm nhận chất lượng con người.',
});

// ─── 24. Alumni & Success Stories ───────────────────────────────────────
reg('class-alumni-success-stories', {
  metaDescription: 'Thành tích và câu chuyện cựu học sinh Trường Việt Anh: IELTS, đại học, giải thưởng và hành trình phát triển.',
  heroBadge: 'Thành tựu học sinh',
  heroTitle: 'Câu chuyện thành công — Khi nền tảng hạnh phúc dẫn đến thành tích bền vững',
  heroCopy: 'Học sinh Trường Việt Anh không chỉ đạt điểm cao, mà còn tự tin, tự chủ và sẵn sàng cho tương lai. Đây là những câu chuyện minh chứng.',
  asideEyebrow: 'Highlights', asideTitle: 'Một số thành tích nổi bật',
  asidePoints: ['IELTS 6.0+ từ lớp 9', 'Học bổng đại học quốc tế', 'Giải thưởng học thuật cấp thành phố', 'Cựu học sinh thành công'],
  ctaPrimaryText: 'Xem hành trình', ctaPrimaryHref: '#thanh-tich',
  ctaSecondaryText: 'Nhận tư vấn lộ trình', ctaSecondaryHref: '/tuyen-sinh',
  statsEyebrow: 'Kết quả', statsTitle: 'Đầu ra đo lường được',
  stats: [{ value: '6.0+', label: 'IELTS trung bình lớp 9' }, { value: '90%', label: 'Vào ĐH nguyện vọng 1' }, { value: '15+', label: 'Học bổng quốc tế/năm' }, { value: '100%', label: 'Tốt nghiệp THPT' }],
  featuresEyebrow: 'Câu chuyện', featuresTitle: 'Hành trình của học sinh Việt Anh',
  features: [
    { title: 'IELTS từ sớm', body: 'Nhiều học sinh đạt IELTS 6.0-7.0 từ lớp 9 nhờ chương trình tiếng Anh chuyên sâu từ mầm non.' },
    { title: 'Đại học quốc tế', body: 'Cựu học sinh nhận học bổng tại các trường đại học ở Úc, Singapore, Mỹ và châu Âu.' },
    { title: 'Kỹ năng sống', body: 'Không chỉ giỏi học thuật, cựu học sinh Việt Anh được đánh giá cao về tính tự chủ và khả năng thích nghi.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  testimonial: { quote: 'Con tôi đạt IELTS 6.5 năm lớp 9 mà chưa bao giờ phải học thêm tiếng Anh bên ngoài. Nền tảng từ Việt Anh rất vững.', author: 'Chị Hải Yến', role: 'Phụ huynh cựu học sinh' },
  relatedLinks: [
    { title: 'THPT Việt Anh', href: '/trung-hoc-pho-thong', body: 'Chương trình THPT chuẩn bị cho đại học.' },
    { title: 'Học bổng', href: '/hoc-bong', body: 'Các chương trình học bổng hiện có.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Bắt đầu hành trình cho con.' },
  ],
  ctaBannerEyebrow: 'Bắt đầu hành trình', ctaBannerTitle: 'Nền tảng hạnh phúc hôm nay, thành tích bền vững ngày mai',
  ctaBannerCopy: 'Đăng ký tư vấn để xây dựng lộ trình học tập phù hợp cho con.',
});

// ─── 25. Talent Acquisition ─────────────────────────────────────────────
reg('class-talent-acquisition', {
  metaDescription: 'Tuyển dụng Trường Việt Anh. Tìm kiếm giáo viên và nhân sự tâm huyết. Xem vị trí tuyển dụng và ứng tuyển.',
  heroBadge: 'Tuyển dụng',
  heroTitle: 'Gia nhập Trường Việt Anh — Nơi giáo dục hạnh phúc bắt đầu từ đội ngũ',
  heroCopy: 'Chúng tôi tìm kiếm những người yêu giáo dục, tận tâm với trẻ và muốn cùng xây dựng thế hệ công dân toàn cầu hạnh phúc.',
  asideEyebrow: 'Vì sao Việt Anh?', asideTitle: 'Môi trường làm việc lý tưởng',
  asidePoints: ['Triết lý giáo dục rõ ràng', 'Đào tạo và phát triển liên tục', 'Đội ngũ quản lý tâm huyết', 'Cơ hội gắn bó lâu dài'],
  ctaPrimaryText: 'Xem vị trí tuyển dụng', ctaPrimaryHref: '/tuyen-dung',
  ctaSecondaryText: 'Tìm hiểu văn hóa', ctaSecondaryHref: '/gioi-thieu',
  statsEyebrow: 'Đội ngũ', statsTitle: 'Trường Việt Anh đang phát triển',
  stats: [{ value: '50+', label: 'Nhân sự toàn hệ thống' }, { value: '3+', label: 'Cơ sở' }, { value: '20+', label: 'Năm hoạt động' }, { value: '5+', label: 'Vị trí đang tuyển' }],
  featuresEyebrow: 'Vị trí', featuresTitle: 'Các nhóm vị trí đang tuyển dụng',
  features: [
    { title: 'Giáo viên tiếng Anh bản ngữ', body: 'Dạy tiếng Anh cho các cấp học, yêu cầu TEFL/TESOL và kinh nghiệm dạy trẻ.' },
    { title: 'Giáo viên chủ nhiệm', body: 'Phụ trách lớp học, dạy kiến thức cốt lõi và đồng hành sát với phụ huynh.' },
    { title: 'Nhân sự vận hành', body: 'Tuyển sinh, truyền thông, kế toán, bảo mẫu và nhân viên hỗ trợ.' },
  ],
  sections: [], faqTitle: 'Câu hỏi ứng viên',
  faqItems: [
    { question: 'Quy trình ứng tuyển như thế nào?', answer: 'Gửi CV → Phỏng vấn → Dạy thử (nếu là giáo viên) → Nhận kết quả trong 1+2 tuần.' },
    { question: 'Có đào tạo nội bộ không?', answer: 'Có. Trường tổ chức workshop và đào tạo định kỳ cho toàn bộ đội ngũ.' },
  ],
  relatedLinks: [
    { title: 'Giới thiệu', href: '/gioi-thieu', body: 'Tìm hiểu triết lý và văn hóa.' },
    { title: 'Đội ngũ', href: '/doi-ngu', body: 'Xem đội ngũ hiện tại.' },
    { title: 'Liên hệ', href: '/lien-he', body: 'Liên hệ phòng nhân sự.' },
  ],
  ctaBannerEyebrow: 'Ứng tuyển ngay', ctaBannerTitle: 'Trở thành một phần của câu chuyện giáo dục hạnh phúc',
  ctaBannerCopy: 'Gửi CV hoặc liên hệ phòng nhân sự để tìm hiểu thêm về cơ hội tại Trường Việt Anh.',
});

// ─── 26. News & Events Hub ──────────────────────────────────────────────
reg('class-news-events-hub-pr', {
  metaDescription: 'Tin tức và hoạt động Trường Việt Anh. Cập nhật sự kiện, hoạt động học sinh, PR và bài viết mới nhất.',
  heroBadge: 'Tin tức & Hoạt động',
  heroTitle: 'Tin tức mới nhất từ Trường Việt Anh — Sự kiện, hoạt động và câu chuyện trường',
  heroCopy: 'Cập nhật những hoạt động nổi bật, sự kiện sắp tới, recap các chương trình và tin tức truyền thông của Trường Việt Anh.',
  asideEyebrow: 'Phân loại', asideTitle: 'Tìm nhanh theo chủ đề',
  asidePoints: ['Sự kiện sắp tới', 'Hoạt động học sinh', 'Tin tức & Báo chí', 'Recap & Video'],
  ctaPrimaryText: 'Xem sự kiện mới', ctaPrimaryHref: '/open-day',
  ctaSecondaryText: 'Về trang chủ', ctaSecondaryHref: '/',
  statsEyebrow: 'Năm 2025-2026', statsTitle: 'Hoạt động tại Trường Việt Anh luôn sôi nổi',
  stats: [{ value: '10+', label: 'Sự kiện/năm' }, { value: '50+', label: 'Bài viết' }, { value: '20+', label: 'Video recap' }, { value: '5+', label: 'Tin truyền thông' }],
  featuresEyebrow: 'Nổi bật', featuresTitle: 'Một số hoạt động gần đây',
  features: [
    { title: 'Ngày hội Trường mở 2026', body: 'Hàng trăm gia đình đến tham quan, học thử và nhận tư vấn trực tiếp.' },
    { title: 'English Day', body: 'Ngày hội tiếng Anh thường niên với các hoạt động sáng tạo, sân khấu và trò chơi.' },
    { title: 'Dã ngoại & Trải nghiệm', body: 'Học sinh được tham gia các chuyến dã ngoại, trải nghiệm thiên nhiên và hoạt động nhóm.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  relatedLinks: [
    { title: 'Open Day', href: '/open-day', body: 'Đăng ký sự kiện sắp tới.' },
    { title: 'Chương trình', href: '/mam-non', body: 'Xem chương trình giáo dục.' },
    { title: 'Cơ sở', href: '/co-so', body: 'Nơi diễn ra các hoạt động.' },
  ],
  ctaBannerEyebrow: 'Theo dõi', ctaBannerTitle: 'Đừng bỏ lỡ các sự kiện và hoạt động sắp tới',
  ctaBannerCopy: 'Theo dõi Trường Việt Anh trên Zalo và Facebook để cập nhật tin tức và sự kiện mới nhất.',
});

// ─── 27. Legal & Utility Info ───────────────────────────────────────────
reg('class-legal-utility-info', {
  metaDescription: 'Chính sách bảo mật Trường Việt Anh. Thông tin pháp lý, quyền riêng tư và điều khoản sử dụng website.',
  heroBadge: 'Chính sách bảo mật',
  heroTitle: 'Chính sách bảo mật và quyền riêng tư — Trường Việt Anh',
  heroCopy: 'Trường Việt Anh cam kết bảo vệ thông tin cá nhân của phụ huynh và học sinh. Trang này giải thích cách chúng tôi thu thập, sử dụng và bảo mật dữ liệu.',
  asideEyebrow: 'Cam kết', asideTitle: 'Bảo mật thông tin là ưu tiên hàng đầu',
  asidePoints: ['Không chia sẻ với bên thứ ba', 'Dữ liệu mã hóa an toàn', 'Quyền truy cập và xóa dữ liệu', 'Tuân thủ quy định pháp luật'],
  ctaPrimaryText: 'Xem chính sách', ctaPrimaryHref: '#chinh-sach',
  ctaSecondaryText: 'Liên hệ hỗ trợ', ctaSecondaryHref: '/lien-he',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'Nội dung', featuresTitle: 'Các mục chính trong chính sách bảo mật',
  features: [
    { title: 'Thu thập thông tin', body: 'Chúng tôi thu thập tên, số điện thoại, email khi ba mẹ đăng ký tư vấn hoặc nhập học — chỉ cho mục đích tuyển sinh.' },
    { title: 'Sử dụng thông tin', body: 'Thông tin chỉ dùng để liên hệ tư vấn, gửi tài liệu học phí và thông báo sự kiện liên quan.' },
    { title: 'Bảo mật', body: 'Dữ liệu được lưu trữ an toàn, không bán hoặc chia sẻ với bên thứ ba ngoài mục đích giáo dục.' },
  ],
  sections: [], faqTitle: 'Câu hỏi về bảo mật',
  faqItems: [
    { question: 'Thông tin của tôi có bị chia sẻ không?', answer: 'Không. Thông tin chỉ sử dụng nội bộ cho mục đích tuyển sinh và hỗ trợ phụ huynh.' },
    { question: 'Tôi có thể yêu cầu xóa dữ liệu không?', answer: 'Có. Ba mẹ liên hệ phòng tuyển sinh để yêu cầu xóa hoặc cập nhật thông tin cá nhân.' },
  ],
  relatedLinks: [
    { title: 'Liên hệ', href: '/lien-he', body: 'Liên hệ hỗ trợ về bảo mật.' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Bắt đầu quy trình nhập học.' },
    { title: 'Trang chủ', href: '/', body: 'Về trang chủ Trường Việt Anh.' },
  ],
  ctaBannerEyebrow: 'Cần hỗ trợ?', ctaBannerTitle: 'Liên hệ đội ngũ Trường Việt Anh nếu có câu hỏi về bảo mật',
  ctaBannerCopy: 'Chúng tôi luôn sẵn sàng giải đáp và hỗ trợ ba mẹ về quyền riêng tư và dữ liệu cá nhân.',
});

// ─── 28. Other ──────────────────────────────────────────────────────────
reg('class-other', {
  metaDescription: 'Trường Việt Anh — Hệ thống giáo dục liên cấp song ngữ. Trang hỗ trợ và điều hướng.',
  heroBadge: 'Trường Việt Anh',
  heroTitle: 'Bạn đang tìm gì? — Hãy để chúng tôi giúp điều hướng',
  heroCopy: 'Nếu ba mẹ chưa tìm thấy thông tin cần thiết, đây là một số đường dẫn nhanh đến các trang quan trọng nhất.',
  asideEyebrow: 'Phổ biến nhất', asideTitle: 'Các trang ba mẹ hay tìm',
  asidePoints: ['Học phí', 'Tuyển sinh', 'Chương trình mầm non', 'Liên hệ'],
  ctaPrimaryText: 'Đăng ký tư vấn', ctaPrimaryHref: '/tuyen-sinh',
  ctaSecondaryText: 'Về trang chủ', ctaSecondaryHref: '/',
  statsEyebrow: '', statsTitle: '', stats: [],
  featuresEyebrow: 'Điều hướng nhanh', featuresTitle: 'Các nội dung phổ biến nhất',
  features: [
    { title: 'Học phí', body: 'Nhận bảng học phí chi tiết theo cấp học và cơ sở.' },
    { title: 'Tuyển sinh', body: 'Quy trình đăng ký nhập học, hồ sơ và hỗ trợ.' },
    { title: 'Tham quan trường', body: 'Đặt lịch tham quan cơ sở gần nhất.' },
  ],
  sections: [], faqTitle: '', faqItems: [],
  relatedLinks: [
    { title: 'Trang chủ', href: '/', body: 'Quay về trang chủ.' },
    { title: 'FAQ', href: '/faq', body: 'Giải đáp các câu hỏi phổ biến.' },
    { title: 'Liên hệ', href: '/lien-he', body: 'Liên hệ đội ngũ hỗ trợ.' },
  ],
  ctaBannerEyebrow: 'Cần giúp đỡ?', ctaBannerTitle: 'Liên hệ ngay để được hỗ trợ',
  ctaBannerCopy: 'Nhắn Zalo hoặc gọi hotline. Đội ngũ Trường Việt Anh luôn sẵn sàng giúp ba mẹ.',
});

export function getVisitorContent(slug: string): VisitorContent {
  return contentMap[slug] || buildDefaultContent(slug);
}

function buildDefaultContent(slug: string): VisitorContent {
  // Import from template-library will be handled at runtime
  return {
    metaDescription: 'Trường Việt Anh – Hệ thống giáo dục liên cấp song ngữ.',
    heroBadge: 'Trường Việt Anh',
    heroTitle: 'Trang mẫu đang được hoàn thiện',
    heroCopy: 'Nội dung chi tiết sẽ được cập nhật trong thời gian sớm nhất.',
    asideEyebrow: 'Thông tin', asideTitle: 'Trang này đang được phát triển',
    asidePoints: ['Nội dung sẽ sớm được bổ sung', 'Thiết kế theo brand guidelines', 'Tối ưu SEO và AI'],
    ctaPrimaryText: 'Đăng ký tư vấn', ctaPrimaryHref: '/tuyen-sinh',
    ctaSecondaryText: 'Về trang chủ', ctaSecondaryHref: '/',
    statsEyebrow: '', statsTitle: '', stats: [],
    featuresEyebrow: '', featuresTitle: '', features: [],
    sections: [], faqTitle: '', faqItems: [],
    relatedLinks: [
      { title: 'Trang chủ', href: '/', body: 'Quay về trang chủ Trường Việt Anh.' },
      { title: 'Tuyển sinh', href: '/tuyen-sinh', body: 'Tìm hiểu quy trình tuyển sinh.' },
      { title: 'Liên hệ', href: '/lien-he', body: 'Liên hệ đội ngũ hỗ trợ.' },
    ],
    ctaBannerEyebrow: '', ctaBannerTitle: 'Liên hệ Trường Việt Anh để được tư vấn',
    ctaBannerCopy: 'Đội ngũ tuyển sinh luôn sẵn sàng hỗ trợ ba mẹ.',
  };
}
