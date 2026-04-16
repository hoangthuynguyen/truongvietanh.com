#!/usr/bin/env node
/**
 * Generate pages.json seed from funnels.json + templates.
 * Each funnel → 1 page with default blocks for its type.
 *
 * Run: node --import tsx scripts/generate-pages-seed.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const seedDir = path.join(__dirname, '..', 'directus', 'seed');

interface FunnelSeed {
  code: string;
  name: string;
  type: 'awareness' | 'lead_magnet' | 'webinar' | 'trial' | 'direct_enrollment';
  school_level?: string;
  product_ref?: string;
  campus_ref?: string;
  entry_pages: string[];
  thank_you_page: string;
  expected_cvr: number;
  lead_score_base: number;
}

const funnels: FunnelSeed[] = JSON.parse(fs.readFileSync(path.join(seedDir, 'funnels.json'), 'utf8'));

// Map funnel type → form template
const FORM_BY_TYPE = {
  lead_magnet: 'form-lead-magnet-download',
  trial: 'form-trial-booking',
  webinar: 'form-webinar-register',
  direct_enrollment: 'form-direct-enrollment',
  awareness: 'form-lead-magnet-download',  // awareness uses soft lead capture
};

// Map funnel type → template + default block structure
const TEMPLATE_BY_TYPE = {
  lead_magnet: 'squeeze',
  trial: 'squeeze',
  webinar: 'squeeze',
  direct_enrollment: 'squeeze',
  awareness: 'landing',
};

// Keyword hints by school level
const KEYWORDS_BY_LEVEL: Record<string, string[]> = {
  'mam-non': ['mầm non', 'trường mầm non tphcm', 'montessori', 'song ngữ mầm non'],
  'tieu-hoc': ['tiểu học', 'trường tiểu học tphcm', 'song ngữ tiểu học', 'lớp 1'],
  'thcs': ['thcs', 'cấp 2', 'trường thcs tphcm', 'lớp 6', 'ielts thcs'],
  'thpt': ['thpt', 'cấp 3', 'lớp 10', 'ielts thpt', 'du học'],
};

const KEYWORDS_BY_PRODUCT: Record<string, string[]> = {
  'song-ngu': ['song ngữ', 'chương trình song ngữ', 'IELTS'],
  'ielts': ['ielts', 'luyện ielts', 'ielts cho học sinh'],
  'pdr': ['pdr', 'phương pháp pdr', 'leader in me'],
  'hoc-bong': ['học bổng', 'ưu đãi học phí', 'miễn giảm học phí'],
  'ngoai-khoa': ['ngoại khoá', 'clb', 'học kỳ hè', 'stem'],
  'mentoring': ['mentoring 1-1', 'định hướng nghề'],
  'du-hoc': ['du học', 'profile du học', 'hồ sơ du học'],
};

function buildBlocks(funnel: FunnelSeed) {
  const blocks: any[] = [];
  const sort = () => blocks.length;

  // 1. HERO (choose by template)
  if (TEMPLATE_BY_TYPE[funnel.type] === 'squeeze') {
    blocks.push({
      sort: sort(),
      collection: 'block_hero_squeeze',
      item: {
        id: randomUUID(),
        eyebrow: funnelEyebrow(funnel),
        title: funnelTitle(funnel),
        subtitle: funnelSubtitle(funnel),
        urgency_text: funnelUrgency(funnel),
        form_ref: FORM_BY_TYPE[funnel.type],
        bg_variant: funnel.type === 'direct_enrollment' ? 'gradient-accent' : 'navy',
      },
    });
  } else {
    blocks.push({
      sort: sort(),
      collection: 'block_hero_funnel',
      item: {
        id: randomUUID(),
        eyebrow: funnelEyebrow(funnel),
        title: funnelTitle(funnel),
        subtitle: funnelSubtitle(funnel),
        bullets: funnelBullets(funnel),
        form_ref: FORM_BY_TYPE[funnel.type],
        overlay_opacity: 0.85,
      },
    });
  }

  // 2. TRUST BAR (always)
  blocks.push({
    sort: sort(),
    collection: 'block_trust_bar',
    item: {
      id: randomUUID(),
      items: [
        { icon: '👨‍👩‍👧', value: '3000+', label: 'phụ huynh tin tưởng' },
        { icon: '🏫', value: '9', label: 'cơ sở toàn quốc' },
        { icon: '📅', value: '15+', label: 'năm kinh nghiệm' },
      ],
      variant: 'gradient',
    },
  });

  // 3. URGENCY BAR for direct_enrollment / webinar
  if (funnel.type === 'direct_enrollment' || funnel.type === 'webinar') {
    blocks.push({
      sort: sort(),
      collection: 'block_urgency_bar',
      item: {
        id: randomUUID(),
        text: funnel.type === 'webinar'
          ? '⏰ Chỉ còn ít chỗ — đăng ký trước khi hết slot'
          : '🔥 Ưu đãi đăng ký sớm — chỉ còn đến 30/6/2026',
        style: 'pulsing',
      },
    });
  }

  // 4. CARDS — value props (always for squeeze)
  if (TEMPLATE_BY_TYPE[funnel.type] === 'squeeze') {
    blocks.push({
      sort: sort(),
      collection: 'block_cards',
      item: {
        id: randomUUID(),
        title: funnelValuePropsTitle(funnel),
        items: funnelValueProps(funnel),
        columns: 3,
      },
    });
  }

  // 5. TESTIMONIAL GRID (filtered by school level / campus)
  blocks.push({
    sort: sort(),
    collection: 'block_testimonial_grid',
    item: {
      id: randomUUID(),
      title: 'Phụ huynh nói gì về chúng tôi',
      school_level_filter: funnel.school_level || null,
      limit: 3,
    },
  });

  // 6. CTA FORM (inline — reinforces conversion)
  blocks.push({
    sort: sort(),
    collection: 'block_cta_form',
    item: {
      id: randomUUID(),
      form_ref: FORM_BY_TYPE[funnel.type],
      heading: funnelCtaHeading(funnel),
      subheading: 'Chỉ mất 30 giây — tư vấn viên sẽ liên hệ trong 15 phút.',
      variant: 'banner',
      bg_style: 'gradient',
    },
  });

  // 7. FAQ
  blocks.push({
    sort: sort(),
    collection: 'block_faq',
    item: {
      id: randomUUID(),
      title: 'Câu hỏi thường gặp',
      items: funnelFaq(funnel),
      emit_schema: true,
    },
  });

  // 8. CTA BANNER (backup CTA — for landing, not squeeze)
  if (TEMPLATE_BY_TYPE[funnel.type] === 'landing') {
    blocks.push({
      sort: sort(),
      collection: 'block_cta_banner',
      item: {
        id: randomUUID(),
        title: 'Còn phân vân? Gọi tư vấn ngay',
        body: 'Đội ngũ tư vấn tuyển sinh sẵn sàng trả lời mọi câu hỏi 7h-21h hàng ngày.',
        primary_cta: { label: '📞 Gọi 0916 961 409', href: 'tel:0916961409', variant: 'primary' },
        secondary_cta: { label: '💬 Chat Zalo', href: 'https://zalo.me/0916961409', variant: 'secondary' },
      },
    });
  }

  return blocks;
}

// === COPY GENERATORS ===

function funnelEyebrow(f: FunnelSeed) {
  const map = {
    lead_magnet: '📥 TÀI LIỆU MIỄN PHÍ',
    trial: '🎁 TRẢI NGHIỆM MIỄN PHÍ',
    webinar: '📅 WEBINAR LIVE',
    direct_enrollment: '🔥 ƯU ĐÃI ĐANG MỞ',
    awareness: 'TRƯỜNG VIỆT ANH',
  };
  return map[f.type];
}

function funnelTitle(f: FunnelSeed) {
  return f.name.replace(/^[^—]+— /, '');  // strip prefix like "Mầm non — "
}

function funnelSubtitle(f: FunnelSeed) {
  const map = {
    lead_magnet: 'Tải ngay — hoàn toàn miễn phí. Không spam, có thể hủy bất kỳ lúc nào.',
    trial: 'Đăng ký 1 buổi miễn phí. Trải nghiệm lớp học thật, gặp giáo viên trực tiếp.',
    webinar: 'Webinar online miễn phí. Nhận link Zoom qua email + Zalo ngay khi đăng ký.',
    direct_enrollment: 'Để lại thông tin — nhận tư vấn chi tiết + giữ chỗ với ưu đãi.',
    awareness: 'Tìm hiểu chi tiết về chương trình. Để lại email nếu bạn muốn nhận thêm thông tin.',
  };
  return map[f.type];
}

function funnelUrgency(f: FunnelSeed) {
  if (f.type === 'direct_enrollment') return 'Chỉ còn ít suất ưu đãi — hết hạn 30/6/2026';
  if (f.type === 'webinar') return 'Giữ chỗ trước 24h để nhận tài liệu kèm theo';
  return '';
}

function funnelBullets(f: FunnelSeed) {
  return [
    '✓ Tài liệu được biên soạn bởi đội ngũ sư phạm 15+ năm kinh nghiệm',
    '✓ Dễ đọc, dễ áp dụng cho phụ huynh bận rộn',
    '✓ Cập nhật theo khung chương trình 2026-2027',
    '✓ Miễn phí 100% — không yêu cầu thẻ',
  ];
}

function funnelValuePropsTitle(f: FunnelSeed) {
  const map = {
    lead_magnet: 'Bên trong tài liệu có gì?',
    trial: 'Trong buổi trải nghiệm, con sẽ được:',
    webinar: 'Bạn sẽ nhận được gì từ webinar?',
    direct_enrollment: 'Ưu đãi đăng ký sớm bao gồm:',
    awareness: 'Điểm khác biệt của Trường Việt Anh',
  };
  return map[f.type];
}

function funnelValueProps(f: FunnelSeed) {
  if (f.type === 'trial') {
    return [
      { icon: '👨‍🏫', title: 'Gặp giáo viên thật', body: 'Trò chuyện trực tiếp với giáo viên chủ nhiệm lớp phù hợp với con.' },
      { icon: '📚', title: 'Tham gia lớp học mẫu', body: 'Con được hoà vào lớp học đang diễn ra, không phải lớp dàn dựng.' },
      { icon: '🍱', title: 'Dùng bữa trưa tại trường', body: 'Trải nghiệm thực đơn bán trú chuẩn, đánh giá vệ sinh & dinh dưỡng.' },
    ];
  }
  if (f.type === 'webinar') {
    return [
      { icon: '🎤', title: '60 phút từ chuyên gia', body: 'Diễn giả là giáo viên/hiệu trưởng có 15+ năm kinh nghiệm.' },
      { icon: '📝', title: 'Tài liệu PDF kèm theo', body: 'Gửi qua email ngay sau khi kết thúc buổi live.' },
      { icon: '❓', title: 'Q&A trực tiếp', body: 'Đặt câu hỏi riêng — diễn giả trả lời trong webinar.' },
    ];
  }
  if (f.type === 'direct_enrollment') {
    return [
      { icon: '💰', title: 'Giảm 10-15% học phí', body: 'Áp dụng cho các phụ huynh đăng ký trước 30/6/2026.' },
      { icon: '🎒', title: 'Tặng balo + đồng phục', body: 'Quà tặng giá trị 2-3 triệu kèm theo khi hoàn tất hồ sơ.' },
      { icon: '📅', title: 'Giữ chỗ 48h', body: 'Không cần đóng phí ngay — giữ chỗ 48h để cân nhắc.' },
    ];
  }
  // lead_magnet default
  return [
    { icon: '📖', title: 'Hướng dẫn chi tiết', body: 'Từng bước cụ thể, có case study thực tế, dễ áp dụng.' },
    { icon: '✅', title: 'Checklist có thể in ra', body: 'Đánh dấu từng hạng mục khi bạn đang khảo sát trường.' },
    { icon: '📊', title: 'Bảng so sánh mẫu', body: 'Mẫu bảng so sánh các tiêu chí giữa các trường bạn quan tâm.' },
  ];
}

function funnelCtaHeading(f: FunnelSeed) {
  const map = {
    lead_magnet: 'Tải tài liệu ngay — còn chờ gì nữa?',
    trial: 'Đặt lịch 1 buổi trải nghiệm miễn phí',
    webinar: 'Giữ chỗ webinar — chỉ còn ít slot',
    direct_enrollment: 'Nhận ưu đãi ngay — liên hệ trong 15 phút',
    awareness: 'Nhận tư vấn cá nhân hoá từ chuyên gia',
  };
  return map[f.type];
}

function funnelFaq(f: FunnelSeed) {
  const generic = [
    { question: 'Form này có thực sự miễn phí không?', answer: 'Có. Toàn bộ tài liệu/buổi trải nghiệm/webinar đều miễn phí 100%. Chúng tôi không yêu cầu thẻ tín dụng hay phí đăng ký.' },
    { question: 'Sau khi đăng ký tôi có bị spam không?', answer: 'Không. Chúng tôi chỉ gửi email liên quan trực tiếp đến nội dung bạn đã đăng ký. Bạn có thể hủy đăng ký bất cứ lúc nào.' },
    { question: 'Bao lâu sau khi đăng ký tôi nhận được tài liệu/xác nhận?', answer: 'Ngay lập tức qua email. Nếu không thấy, kiểm tra thư mục Spam hoặc Zalo (nếu bạn để lại SĐT).' },
  ];
  const trial = { question: 'Con tôi đang học trường khác, có tham gia được không?', answer: 'Hoàn toàn được. Buổi trải nghiệm dành cho tất cả phụ huynh quan tâm — không yêu cầu cam kết nhập học.' };
  const webinar = { question: 'Tôi không xem live được — có bản replay không?', answer: 'Có. Chúng tôi gửi link replay trong 24h sau buổi live qua email.' };
  const enrollment = { question: 'Tôi cần chuẩn bị giấy tờ gì?', answer: 'Sau khi để lại thông tin, tư vấn viên sẽ gửi danh sách hồ sơ cụ thể theo cấp học con bạn đang quan tâm.' };

  if (f.type === 'trial') return [...generic, trial];
  if (f.type === 'webinar') return [...generic, webinar];
  if (f.type === 'direct_enrollment') return [...generic, enrollment];
  return generic;
}

// === KEYWORDS ===
function keywordsFor(f: FunnelSeed): string {
  const kw: string[] = [];
  if (f.school_level && KEYWORDS_BY_LEVEL[f.school_level]) kw.push(...KEYWORDS_BY_LEVEL[f.school_level]);
  if (f.product_ref && KEYWORDS_BY_PRODUCT[f.product_ref]) kw.push(...KEYWORDS_BY_PRODUCT[f.product_ref]);
  kw.push('trường việt anh');
  if (f.campus_ref) kw.push(`cơ sở ${f.campus_ref.replace(/-/g, ' ')}`);
  return [...new Set(kw)].join(', ');
}

// === MAIN ===
const pages = funnels.flatMap((f) => {
  return f.entry_pages.map((slug) => ({
    id: randomUUID(),
    status: 'published',
    slug,
    template: TEMPLATE_BY_TYPE[f.type],
    title: `${f.name} — Trường Việt Anh`,
    meta_description: funnelSubtitle(f).slice(0, 160),
    meta_keywords: keywordsFor(f),
    og_image: f.campus_ref
      ? `https://media.truongvietanh.com/campuses/${f.campus_ref}-og.webp`
      : `https://media.truongvietanh.com/og/${f.school_level || f.product_ref || 'generic'}.webp`,
    canonical_url: `https://truongvietanh.com/${slug}`,
    noindex: f.type === 'direct_enrollment',  // ads-only pages
    funnel_ref: f.code,
    campus_ref: f.campus_ref || null,
    product_ref: f.product_ref || null,
    blocks: buildBlocks(f),
  }));
});

fs.writeFileSync(path.join(seedDir, 'pages.json'), JSON.stringify(pages, null, 2));

console.log(`✓ Generated ${pages.length} pages from ${funnels.length} funnels`);
console.log(`  Breakdown:`);
const counts: Record<string, number> = {};
for (const p of pages) counts[p.template] = (counts[p.template] || 0) + 1;
for (const [tpl, n] of Object.entries(counts)) console.log(`    ${tpl}: ${n}`);
