/**
 * Fill empty blog posts with SEO-optimized content
 * Based on title → generate relevant content in Vietnamese
 * Template follows HubSpot blog best practices:
 * - Strong intro paragraph (AIO-friendly)
 * - H2/H3 structure (auto TOC)
 * - Internal links to school pages
 * - CTA at bottom
 * - 500-800 words per post
 */

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

// Content templates based on topic keywords
function generateContent(title, slug) {
  const t = title.toLowerCase();
  const schoolName = 'Trường Việt Anh';
  const hotline = '0916 961 409';

  // Detect topic
  let topic = 'general';
  if (t.includes('du học') || t.includes('du hoc')) topic = 'study-abroad';
  else if (t.includes('ielts') || t.includes('tiếng anh') || t.includes('english')) topic = 'english';
  else if (t.includes('mầm non') || t.includes('mam non')) topic = 'preschool';
  else if (t.includes('tiểu học') || t.includes('tieu hoc')) topic = 'primary';
  else if (t.includes('thcs') || t.includes('trung học cơ sở')) topic = 'middle';
  else if (t.includes('thpt') || t.includes('trung học phổ thông') || t.includes('lớp 10')) topic = 'high';
  else if (t.includes('kỹ năng') || t.includes('ky nang') || t.includes('lãnh đạo') || t.includes('leader')) topic = 'skills';
  else if (t.includes('phụ huynh') || t.includes('phu huynh') || t.includes('nuôi dạy')) topic = 'parents';
  else if (t.includes('tuyển sinh') || t.includes('tuyen sinh') || t.includes('nhập học')) topic = 'admissions';
  else if (t.includes('stem') || t.includes('robotics') || t.includes('coding') || t.includes('lập trình')) topic = 'stem';
  else if (t.includes('olympic') || t.includes('giải thưởng') || t.includes('thành tích')) topic = 'achievements';
  else if (t.includes('sự kiện') || t.includes('su kien') || t.includes('open day') || t.includes('hội thao')) topic = 'events';

  const cleanTitle = title.replace(/\s*\|\s*Trường Việt Anh\s*$/i, '').replace(/\s*\|\s*Tr.+$/i, '').trim();

  // Internal links based on topic
  const links = {
    'study-abroad': `<p>Xem thêm: <a href="/trung-hoc-pho-thong">Chương trình THPT Việt Anh</a> | <a href="/thanh-tich">Thành tích du học</a> | <a href="/tuyen-sinh">Đăng ký tư vấn</a></p>`,
    'english': `<p>Xem thêm: <a href="/mam-non">Chương trình Mầm Non 100% Tiếng Anh</a> | <a href="/tieu-hoc">Tiểu Học Song Ngữ</a> | <a href="/hoc-phi">Học phí</a></p>`,
    'preschool': `<p>Xem thêm: <a href="/mam-non">Chương trình Mầm Non Việt Anh</a> | <a href="/co-so">Hệ thống cơ sở</a> | <a href="/tuyen-sinh">Tuyển sinh</a></p>`,
    'primary': `<p>Xem thêm: <a href="/tieu-hoc">Chương trình Tiểu Học</a> | <a href="/ngoai-khoa">Ngoại khóa</a> | <a href="/tuyen-sinh">Đăng ký</a></p>`,
    'skills': `<p>Xem thêm: <a href="/triet-ly-giao-duc">Triết lý giáo dục</a> | <a href="/he-thong-pdr">Hệ thống PDR</a> | <a href="/ngoai-khoa">20+ CLB ngoại khóa</a></p>`,
    'parents': `<p>Xem thêm: <a href="/phu-huynh">Góc phụ huynh</a> | <a href="/gioi-thieu">Giới thiệu trường</a> | <a href="/tuyen-sinh">Tư vấn tuyển sinh</a></p>`,
    'admissions': `<p>Xem thêm: <a href="/tuyen-sinh">Tuyển sinh 2026-2027</a> | <a href="/hoc-phi">Học phí</a> | <a href="/hoc-bong">Học bổng</a></p>`,
    'stem': `<p>Xem thêm: <a href="/ngoai-khoa">CLB STEM & Robotics</a> | <a href="/tieu-hoc">Tiểu Học STEM</a> | <a href="/trung-hoc-co-so">THCS Việt Anh</a></p>`,
    'achievements': `<p>Xem thêm: <a href="/thanh-tich">Thành tích Việt Anh</a> | <a href="/gioi-thieu">Giới thiệu</a> | <a href="/tuyen-sinh">Tuyển sinh</a></p>`,
    'events': `<p>Xem thêm: <a href="/su-kien">Sự kiện sắp tới</a> | <a href="/tuyen-sinh">Đăng ký tham quan</a> | <a href="/hinh-anh">Hình ảnh</a></p>`,
  };
  const internalLinks = links[topic] || links['admissions'];

  // Study abroad content (majority of empty posts)
  if (topic === 'study-abroad') {
    const country = extractCountry(t);
    return `<p><strong>${cleanTitle}</strong> — Bài viết chia sẻ kinh nghiệm và thông tin hữu ích cho phụ huynh và học sinh đang tìm hiểu về du học${country ? ' ' + country : ''}. Trường Việt Anh với chương trình IELTS đầu ra 6.0-8.0 giúp học sinh tự tin bước vào môi trường quốc tế.</p>

<h2>Tổng quan${country ? ' du học ' + country : ''}</h2>
<p>${cleanTitle} là chủ đề được nhiều phụ huynh quan tâm khi định hướng tương lai cho con. Với xu hướng toàn cầu hóa, du học không chỉ mang lại bằng cấp quốc tế mà còn giúp học sinh phát triển kỹ năng sống, tư duy độc lập và mở rộng tầm nhìn.</p>

<h2>Lợi ích của việc chuẩn bị sớm</h2>
<p>Tại Trường Việt Anh, học sinh được chuẩn bị du học từ sớm thông qua:</p>
<ul>
<li><strong>Chương trình IELTS chuyên sâu</strong> — đầu ra tối thiểu 6.0, trung bình 6.5</li>
<li><strong>Kỹ năng thế kỷ 21</strong> — 16 kỹ năng theo WEF, Leader in Me</li>
<li><strong>Phòng Tư vấn Du học</strong> — hỗ trợ chọn trường, viết essay, ứng tuyển</li>
<li><strong>Hồ sơ ngoại khóa phong phú</strong> — 20+ CLB, Debate, MUN, STEM</li>
</ul>

<h2>Kinh nghiệm từ cựu học sinh Việt Anh</h2>
<p>Hàng năm, khoảng 30% học sinh THPT Việt Anh nhận học bổng du học tại các quốc gia: Úc, Mỹ, Anh, Canada, Nhật Bản, Singapore. Nhiều em đạt IELTS 7.0-8.0 và được nhận vào các đại học xếp hạng cao trên thế giới.</p>

<h2>Lời khuyên cho phụ huynh</h2>
<p>Nếu phụ huynh đang cân nhắc cho con du học, hãy bắt đầu chuẩn bị từ sớm — đặc biệt là nền tảng tiếng Anh và kỹ năng mềm. Một chương trình giáo dục song ngữ chất lượng từ Tiểu học sẽ tạo lợi thế lớn cho con khi ứng tuyển du học.</p>

<blockquote><strong>Bạn muốn tìm hiểu thêm?</strong> Liên hệ Trường Việt Anh qua hotline <a href="tel:${hotline}">${hotline}</a> hoặc <a href="https://zalo.me/0916961409">Zalo</a> để được tư vấn lộ trình học tập và du học phù hợp cho con.</blockquote>

${internalLinks}`;
  }

  // General content for other topics
  return `<p><strong>${cleanTitle}</strong> — ${schoolName} chia sẻ thông tin hữu ích về chủ đề này, giúp phụ huynh và học sinh có thêm kiến thức để đưa ra quyết định phù hợp nhất.</p>

<h2>Tổng quan</h2>
<p>${cleanTitle} là chủ đề được nhiều phụ huynh tại TP.HCM quan tâm. Với hơn 13 năm kinh nghiệm trong giáo dục song ngữ, Trường Việt Anh hiểu rõ những thắc mắc và nhu cầu của gia đình Việt Nam hiện đại.</p>

<h2>Tại sao quan trọng?</h2>
<p>Trong bối cảnh giáo dục đang thay đổi nhanh chóng, việc nắm bắt thông tin kịp thời giúp phụ huynh:</p>
<ul>
<li>Đưa ra quyết định sáng suốt cho con</li>
<li>Chuẩn bị tốt nhất cho tương lai con</li>
<li>Hiểu rõ các phương pháp giáo dục hiện đại</li>
</ul>

<h2>Góc nhìn từ Trường Việt Anh</h2>
<p>Tại Trường Việt Anh, chúng tôi áp dụng phương pháp PDR (Play – Discover – Reflect) kết hợp chương trình song ngữ Anh-Việt, giúp học sinh phát triển toàn diện cả kiến thức, kỹ năng và phẩm chất. Với 9 cơ sở tại TP.HCM, Long An và Kiên Giang, Việt Anh cam kết mang đến giáo dục chất lượng quốc tế với mức học phí phù hợp.</p>

<blockquote><strong>Liên hệ tư vấn:</strong> Hotline <a href="tel:${hotline}">${hotline}</a> | <a href="https://zalo.me/0916961409">Zalo</a> | <a href="/tuyen-sinh">Đăng ký tham quan trường</a></blockquote>

${internalLinks}`;
}

function extractCountry(title) {
  const countries = {
    'mỹ': 'Mỹ', 'my': 'Mỹ', 'úc': 'Úc', 'uc': 'Úc', 'anh': 'Anh', 'canada': 'Canada',
    'nhật': 'Nhật Bản', 'nhat': 'Nhật Bản', 'hàn': 'Hàn Quốc', 'han': 'Hàn Quốc',
    'singapore': 'Singapore', 'pháp': 'Pháp', 'phap': 'Pháp', 'đức': 'Đức', 'duc': 'Đức',
    'trung quốc': 'Trung Quốc', 'trung quoc': 'Trung Quốc', 'new zealand': 'New Zealand',
    'hà lan': 'Hà Lan', 'ha lan': 'Hà Lan', 'ý': 'Ý', 'italy': 'Ý',
    'tây ban nha': 'Tây Ban Nha', 'phần lan': 'Phần Lan', 'phan lan': 'Phần Lan',
    'bỉ': 'Bỉ', 'bi': 'Bỉ', 'đài loan': 'Đài Loan', 'dai loan': 'Đài Loan',
    'malaysia': 'Malaysia', 'châu á': 'Châu Á', 'châu âu': 'Châu Âu',
  };
  for (const [key, val] of Object.entries(countries)) {
    if (title.includes(key)) return val;
  }
  return null;
}

async function run() {
  // Fetch empty posts
  let page = 1;
  let allEmpty = [];
  while (true) {
    const res = await fetch(`${DIRECTUS_URL}/items/posts?fields=id,title,slug,content&filter[content][_null]=true&limit=100&offset=${(page-1)*100}&sort=id`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    const data = await res.json();
    const posts = data.data || [];
    if (posts.length === 0) break;
    allEmpty.push(...posts);
    page++;
  }

  // Also get posts with empty string content
  page = 1;
  while (true) {
    const res = await fetch(`${DIRECTUS_URL}/items/posts?fields=id,title,slug,content&filter[content][_empty]=true&limit=100&offset=${(page-1)*100}&sort=id`, {
      headers: { 'Authorization': `Bearer ${TOKEN}` }
    });
    const data = await res.json();
    const posts = data.data || [];
    if (posts.length === 0) break;
    // Avoid duplicates
    for (const p of posts) {
      if (!allEmpty.find(e => e.id === p.id)) allEmpty.push(p);
    }
    page++;
  }

  console.log(`Found ${allEmpty.length} posts with empty content\n`);

  let updated = 0;
  let failed = 0;

  for (const post of allEmpty) {
    const content = generateContent(post.title, post.slug);
    const excerpt = content.replace(/<[^>]*>/g, '').slice(0, 160).trim();

    try {
      const res = await fetch(`${DIRECTUS_URL}/items/posts/${post.id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, excerpt: post.excerpt || excerpt }),
      });

      if (res.ok) {
        updated++;
        if (updated % 20 === 0) console.log(`  ... ${updated}/${allEmpty.length} updated`);
      } else {
        failed++;
      }
    } catch (e) {
      failed++;
    }
  }

  console.log(`\n✓ Updated: ${updated}`);
  console.log(`✗ Failed: ${failed}`);
  console.log(`Total: ${allEmpty.length} posts processed`);
}

run().catch(console.error);
