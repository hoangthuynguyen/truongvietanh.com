/**
 * Tạo bài blog "Trường Việt Anh có trả lại học phí không?" trên Directus — kèm toàn văn
 * Quyết định số 0728.1/2026/QĐ-MAJOR (Chính sách Cam kết Giá trị 4 Tuần), ký 29/7/2026.
 * Ảnh scan + PDF công văn nằm trong public/van-ban/ (deploy cùng site).
 * Chạy: node --env-file=.env scripts/create-post-hoan-hoc-phi-4-tuan.mjs   (thêm --update để cập nhật)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p><strong>Có. Từ năm học 2026 – 2027, nếu sau 4 tuần lễ đầu tiên, gia đình cảm thấy con không nhận được giá trị như mong đợi, Trường Việt Anh hoàn lại 100% học phí. Không cần nêu lý do. Không cần nộp đơn. Điều kiện duy nhất là con đi học đầy đủ trong 4 tuần đó.</strong></p>

<p>Chính sách được ban hành theo Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026, áp dụng tại toàn Hệ thống Trường Việt Anh. Phụ huynh có thể <a href="#toan-van-quyet-dinh">đọc toàn văn Quyết định ở cuối bài</a>.</p>

<h2 id="vi-sao-la-4-tuan">Vì sao là 4 tuần?</h2>
<p>Bốn tuần đầu tiên của mỗi năm học tại Việt Anh là <strong>Học kỳ Foundation</strong> — 28 ngày nền tảng gồm giáo dục cảm xúc – xã hội, xây dựng văn hóa lớp, nhận vai trò lãnh đạo và một chuyến dã ngoại. Đây là quãng thời gian đậm đặc "chất Việt Anh" nhất trong năm.</p>
<p>Nếu gia đình đi trọn 28 ngày ấy mà vẫn không thấy giá trị, chúng tôi tin mình chưa xứng đáng giữ học phí của gia đình.</p>

<h2 id="hoan-nhung-khoan-nao">Hoàn những khoản nào?</h2>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>HOÀN 100%</th><th>KHÔNG HOÀN</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>Học phí<br />Phí cơ sở vật chất<br />Phí bản quyền Oxford (OIC)</td>
      <td>Tiền ăn<br />Phí nội trú<br />Đồng phục, đồ dùng đã sử dụng</td>
    </tr>
  </tbody>
</table>
</div>

<h2 id="can-lam-gi-de-duoc-hoan">Cần làm gì để được hoàn?</h2>
<ul>
  <li>Không cần nộp đơn, không cần viết lý do.</li>
  <li>Chỉ cần liên hệ thông báo với chuyên viên chăm sóc học sinh của lớp.</li>
  <li>Chuyên viên có thể mời phụ huynh ký xác nhận nội dung đã trao đổi để làm căn cứ thực hiện.</li>
  <li>Nhà trường giải quyết trong 07 ngày làm việc và hỗ trợ đầy đủ thủ tục chuyển trường cho con.</li>
</ul>
<p>Quy trình ba bước được giải thích chi tiết trong bài <a href="/blog/cam-ket-hoan-hoc-phi-4-tuan-hoat-dong-the-nao/">"Cam kết hoàn học phí 4 tuần hoạt động thế nào?"</a>.</p>

<h2 id="vi-sao-chung-toi-lam-dieu-nay">Vì sao chúng tôi làm điều này?</h2>
<p>Chọn trường là một trong những quyết định tốn kém và khó đảo ngược nhất của cha mẹ. Xưa nay, toàn bộ rủi ro của quyết định ấy đặt lên vai gia đình: đóng tiền trước, biết kết quả sau. Chúng tôi muốn đảo ngược điều đó. Nếu Việt Anh tin vào chương trình của mình, thì Việt Anh phải là bên gánh rủi ro, chứ không phải phụ huynh.</p>
<blockquote>Và nếu một gia đình quyết định dừng lại, chúng tôi mong việc dừng lại ấy diễn ra nhẹ nhàng, đàng hoàng, giữ nguyên sự tôn trọng dành cho nhau — kèm lời cảm ơn chân thành vì đã cho chúng tôi cơ hội đồng hành cùng con 4 tuần qua.</blockquote>
<p><strong>Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</strong></p>

<h2 id="toan-van-quyet-dinh">Toàn văn Quyết định ban hành chính sách</h2>
<!-- Bọc cả công văn trong 1 div: script blog chèn CTA vào :scope > p/h2 của body,
     không bọc thì hộp "đăng ký nhận email" rơi vào giữa các Điều của quyết định. -->
<div class="cong-van">
<p><strong>CÔNG TY CP GIÁO DỤC MAJOR — HỆ THỐNG TRƯỜNG VIỆT ANH</strong><br />
Số: 0728.1/2026/QĐ-MAJOR<br />
TP. Hồ Chí Minh, ngày 29 tháng 7 năm 2026</p>

<p><strong>QUYẾT ĐỊNH</strong><br />
Về việc ban hành Chính sách "Cam kết Giá trị 4 Tuần"<br />
<em>Hoàn 100% học phí trong 4 tuần lễ đầu năm học</em></p>

<p><strong>Kính gửi: Quý Phụ huynh học sinh Hệ thống Trường Việt Anh.</strong></p>
<p>Trường Việt Anh tin rằng một gia đình chỉ nên trả tiền cho giá trị mà con thực sự nhận được. Bốn tuần lễ đầu tiên của mỗi năm học tại Việt Anh là Học kỳ Foundation — 28 ngày nền tảng đậm đặc nhất về giá trị, đủ để Quý Phụ huynh kiểm chứng lựa chọn của mình. Vì vậy, Nhà trường ban hành chính sách sau đây, thay thế quy định "học phí không hoàn lại sau ghi danh" trong phạm vi 4 tuần lễ đầu năm học.</p>

<h3>Điều 1. Nội dung cam kết</h3>
<p>Trong 04 tuần lễ đầu tiên của năm học, nếu Quý Phụ huynh hoặc học sinh nhận thấy không nhận được giá trị như mong đợi, Nhà trường hoàn lại 100% các khoản đã đóng, bao gồm: học phí, phí cơ sở vật chất và phí bản quyền chương trình Oxford International Curriculum (OIC).</p>

<h3>Điều 2. Các khoản không hoàn lại</h3>
<p>Tiền ăn, phí nội trú, đồng phục và đồ dùng học tập đã sử dụng hoặc đã bàn giao cho học sinh.</p>

<h3>Điều 3. Điều kiện áp dụng</h3>
<p>Điều kiện duy nhất: học sinh đi học đầy đủ trong 04 tuần lễ đầu năm học. Nhà trường không yêu cầu Quý Phụ huynh giải thích lý do và không đặt thêm bất kỳ điều kiện nào khác.</p>

<h3>Điều 4. Thủ tục</h3>
<p>Quý Phụ huynh không phải nộp đơn. Quý Phụ huynh chỉ cần liên hệ thông báo với chuyên viên chăm sóc học sinh của lớp. Chuyên viên có thể đề nghị Quý Phụ huynh ký xác nhận nội dung đã trao đổi để làm căn cứ thực hiện.</p>

<h3>Điều 5. Thời hạn giải quyết</h3>
<p>Nhà trường hoàn tất việc hoàn phí trong 07 ngày làm việc kể từ ngày tiếp nhận thông báo. Nhà trường bàn giao đầy đủ hồ sơ và hỗ trợ Quý Phụ huynh hoàn tất các thủ tục chuyển trường cho con.</p>

<h3>Điều 6. Hiệu lực thi hành</h3>
<p>Chính sách có hiệu lực từ năm học 2026 – 2027, áp dụng tại toàn Hệ thống Trường Việt Anh. Giám đốc Tuyển sinh, Kế toán trưởng và Hiệu trưởng các cơ sở chịu trách nhiệm thi hành. Mọi trường hợp phát sinh ngoài văn bản được giải quyết theo hướng có lợi cho Quý Phụ huynh.</p>

<p><em>Nơi nhận:</em> Quý Phụ huynh học sinh; Ban Giám hiệu các cơ sở; Phòng Tuyển sinh, Phòng Kế toán; Lưu: VT.</p>
<p><strong>CHỦ TỊCH HỘI ĐỒNG TRƯỜNG</strong><br />(đã ký và đóng dấu)<br /><strong>NGUYỄN MẠNH DƯƠNG</strong></p>

<figure>
  <img src="/van-ban/quyet-dinh-cam-ket-gia-tri-4-tuan-trang-1.jpg" alt="Trang 1 Quyết định số 0728.1/2026/QĐ-MAJOR ban hành Chính sách Cam kết Giá trị 4 Tuần của Hệ thống Trường Việt Anh" width="1400" height="1981" loading="lazy" decoding="async" />
  <figcaption>Trang 1 — Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026.</figcaption>
</figure>
<figure>
  <img src="/van-ban/quyet-dinh-cam-ket-gia-tri-4-tuan-trang-2.jpg" alt="Trang 2 Quyết định Cam kết Giá trị 4 Tuần có chữ ký và con dấu của Chủ tịch Hội đồng Trường Nguyễn Mạnh Dương" width="1400" height="1981" loading="lazy" decoding="async" />
  <figcaption>Trang 2 — có chữ ký và con dấu của Chủ tịch Hội đồng Trường.</figcaption>
</figure>

<p><a href="/van-ban/quyet-dinh-0728-1-2026-cam-ket-gia-tri-4-tuan.pdf" target="_blank" rel="noopener">Tải bản PDF Quyết định số 0728.1/2026/QĐ-MAJOR</a></p>
</div>

<h2 id="dang-ky-trai-nghiem">Đăng ký trải nghiệm 4 tuần có bảo chứng hoàn phí</h2>
<p>Phụ huynh muốn tìm hiểu trực tiếp trước khi quyết định, mời <a href="/dat-lich-tham-quan">đặt lịch tham quan trường</a> hoặc <a href="/tuyen-sinh">đăng ký tư vấn tuyển sinh</a> để giữ chỗ cho con. Mọi thắc mắc về chính sách, phụ huynh có thể gọi <a href="tel:0916961409">0916 961 409</a>.</p>
`.trim();

const post = {
  title: 'Trường Việt Anh có trả lại học phí không? Có — hoàn 100% trong 4 tuần đầu năm học',
  slug: 'truong-viet-anh-co-tra-lai-hoc-phi-khong',
  status: 'published',
  excerpt: 'Có. Trường Việt Anh hoàn 100% học phí, phí CSVC và phí Oxford trong 4 tuần đầu năm học nếu gia đình không nhận được giá trị — không cần đơn từ, không cần lý do.',
  content,
  published_at: '2026-07-31T09:00:00',
  category: 'tuyen-sinh',
};

async function req(method, endpoint, body) {
  const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
    method, headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${text.slice(0, 400)}`);
  return text ? JSON.parse(text) : null;
}
const existing = await req('GET', `/items/posts?fields=id,slug&filter%5Bslug%5D%5B_eq%5D=${post.slug}`);
if (existing.data.length) {
  if (!UPDATE) { console.log(`Bài đã tồn tại (id=${existing.data[0].id}). Chạy với --update để cập nhật.`); process.exit(0); }
  const r = await req('PATCH', `/items/posts/${existing.data[0].id}`, post);
  console.log(`Đã CẬP NHẬT bài id=${r.data.id} — /blog/${r.data.slug}`);
} else {
  const r = await req('POST', '/items/posts', post);
  console.log(`Đã TẠO bài id=${r.data.id} — /blog/${r.data.slug}`);
}
