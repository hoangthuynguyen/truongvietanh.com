/**
 * Bài 5 cụm chi phí — "Chênh lệch học phí lớp 6: mỗi ngày thêm bao nhiêu, đổi lại con nhận gì?".
 * Lưu ý biên tập của tác giả: KHÔNG nêu con số chi phí cụ thể của lộ trình trường công (dẫn về
 * bài 4 để phụ huynh tự cộng); phần quy đổi "mua lẻ ngoài" dùng đơn giá 1-1 của chính nhà trường
 * và phải ghi rõ giả định lớp 1-1 khác lớp nhóm, không so sánh ngang bằng.
 * Chạy: node --env-file=.env scripts/create-post-hoc-phi-lop-6-doi-lai-gi.mjs   (thêm --update)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Học phí lớp 6 tại cơ sở Gò Vấp của Trường Việt Anh năm học 2026–2027 là 125.757.000 đồng một năm. Chia cho khoảng 175 ngày học thực tế, con số ấy tương đương khoảng 719.000 đồng mỗi ngày. Chia tiếp cho khoảng 1.400 tiết học trong năm, mỗi tiết học của con có giá khoảng 90.000 đồng.</p>

<p>Bài viết này không thuyết phục anh chị rằng con số ấy rẻ hay đắt. Nó bóc tách xem 90.000 đồng mỗi tiết mua được những gì, và đặt cạnh mặt bằng giá mà chính gia đình đang trả khi mua từng thứ riêng lẻ ngoài thị trường. Anh chị tự kết luận.</p>

<h2 id="vi-sao-lop-6">Vì sao lớp 6 là thời điểm quyết định?</h2>
<p>Lớp 6 là ngã ba đường rõ rệt nhất trong 12 năm học của một đứa trẻ. Đây là lúc chương trình chuyển từ một giáo viên chủ nhiệm dạy phần lớn các môn sang mô hình mỗi môn một giáo viên; là lúc khối lượng kiến thức tăng vọt và khoảng cách giữa các học sinh bắt đầu doãng ra rõ rệt; và là lúc cửa sổ học ngôn ngữ vẫn còn rộng nhưng đã bắt đầu đếm ngược.</p>
<p>Cũng vì vậy, đây là thời điểm nhiều gia đình cân nhắc chuyển con sang trường tư — và cũng là thời điểm mà một quyết định sai tốn kém nhất, vì bốn năm THCS đặt nền cho toàn bộ giai đoạn THPT và định hướng nghề nghiệp sau đó.</p>

<h2 id="90-nghin-mot-tiet">90.000 đồng một tiết học mua được gì?</h2>
<p>Tại lớp 6 chương trình thường, học sinh Việt Anh học khoảng 40 tiết mỗi tuần: 30 tiết theo Chương trình GDPT 2018 của Bộ Giáo dục và Đào tạo, cộng 10 tiết chương trình riêng của nhà trường. Trong đó:</p>
<ul>
  <li><strong>Tiếng Anh 9 tiết/tuần</strong> — gồm 3 tiết theo chương trình Bộ và 6 tiết tăng cường học với giáo viên nước ngoài.</li>
  <li><strong>Kỹ năng và phẩm chất 4 tiết/tuần</strong> — TLIM (The Leader in Me) 1 tiết, Class Meeting/DEAR 1 tiết, STEAMe 1 tiết, Digital Technology 1 tiết.</li>
  <li><strong>Thể chất</strong> — 2 tiết giáo dục thể chất cộng 2–4 tiết câu lạc bộ thể thao mỗi tuần, trong khung 16:15–17:45.</li>
  <li><strong>Hỗ trợ học tập</strong> — phụ đạo 2 tiết mỗi môn cho học sinh cần củng cố, bồi dưỡng 2–4 tiết cho học sinh giỏi.</li>
</ul>
<p>Với lớp theo chương trình Oxford International Curriculum, con số còn cao hơn: khoảng 44 tiết/tuần, trong đó khoảng 13 tiết học bằng tiếng Anh (Math OIC, Science OIC, Computing OIC, Well-being OIC), phí bản quyền Oxford 20.000.000 đồng/năm đóng thêm.</p>
<p>Sĩ số tối đa 24 học sinh một lớp.</p>

<h2 id="dat-canh-truong-cong">Đặt cạnh mốc trường công: con số nói gì?</h2>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Tiêu chí lớp 6</th><th>Trường công (GDPT 2018)</th><th>Việt Anh VAGV</th></tr>
  </thead>
  <tbody>
    <tr><td>Tổng tiết/tuần</td><td>~30 tiết</td><td>~40 tiết (OIC: ~44)</td></tr>
    <tr><td>Tiếng Anh/tuần</td><td>3 tiết</td><td>9 tiết (OIC: 10 + các môn học bằng tiếng Anh)</td></tr>
    <tr><td>Trong đó giáo viên nước ngoài</td><td>Hầu như không có</td><td>6 tiết/tuần</td></tr>
    <tr><td>Kỹ năng có chương trình riêng</td><td>Không có môn hệ thống</td><td>4 tiết/tuần + Học kỳ Foundation 28 ngày</td></tr>
    <tr><td>Thể thao ngoài giờ</td><td>Gia đình tự lo</td><td>2–4 tiết CLB/tuần trong lịch học</td></tr>
    <tr><td>Sĩ số</td><td>Thực tế TP.HCM 45–50+</td><td>Tối đa 24</td></tr>
    <tr><td>Phụ đạo / bồi dưỡng</td><td>Ngoài giờ, thường mất phí riêng</td><td>Trong chương trình</td></tr>
  </tbody>
</table>
</div>
<p>Để dễ hình dung: 9 tiết tiếng Anh so với 3 tiết nghĩa là học một năm ở Việt Anh xấp xỉ ba năm ở trường công, nếu chỉ tính riêng thời lượng. Còn 6 tiết với giáo viên nước ngoài so với 0 tiết thì không phải là "nhiều hơn" — đó là có so với không có. Về sĩ số, 24 so với 48 nghĩa là cùng một giáo viên, con nhận được gấp đôi sự quan tâm; khác biệt này lộ rõ nhất ở những môn cần phản hồi cá nhân như viết, thuyết trình và ngoại ngữ. Còn tổng chi phí thật của lộ trình trường công thì mỗi gia đình một khác — anh chị có thể tự cộng bằng <a href="/blog/tong-chi-phi-that-hoc-truong-cong/">bảng tính trong bài "Học trường công có thật sự gần như miễn phí?"</a>.</p>

<h2 id="phep-thu-nguoc">Phép thử ngược: nếu mua lẻ từng thứ ngoài thị trường?</h2>
<p>Hãy thử tính riêng phần tiếng Anh với giáo viên nước ngoài. Sáu tiết mỗi tuần trong 35 tuần là 210 tiết một năm. Theo bảng phí dịch vụ rèn luyện thêm mà chính Trường Việt Anh công bố cho năm học 2026–2027, một tiết tiếng Anh 1-1 bậc trung học có giá 450.000 đồng. Nhân lên: 94.500.000 đồng — riêng cho phần tiếng Anh giáo viên nước ngoài.</p>
<p>Con số đó gần bằng ba phần tư học phí cả năm lớp 6, trong khi học phí ấy còn bao gồm toàn bộ chương trình chính khóa, chương trình kỹ năng, thể thao câu lạc bộ và phụ đạo.</p>
<p>Cần nói rõ giả định: đây là quy đổi tham khảo theo đơn giá lớp 1-1, mà lớp 1-1 không giống lớp học nhóm — kèm riêng có ưu thế riêng, còn lớp nhóm nhỏ 24 em lại tạo môi trường tương tác và tranh luận mà học 1-1 không có. Phép tính này không nhằm nói cái nào hơn cái nào, chỉ nhằm cho thấy thứ tự độ lớn của phần giá trị mà học phí trọn gói đang gánh.</p>
<blockquote>"Khi phụ huynh hỏi tôi học phí có đắt không, tôi thường hỏi lại: anh chị đang so với cái gì? So với dòng chữ 'học phí' trên biên lai trường công thì đắt. So với việc mua đủ từng thứ một ở ngoài, cộng thêm thời gian đưa đón của chính anh chị, thì câu trả lời thường khác."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="nhung-gi-con-so-khong-noi">Những gì con số không nói được</h2>
<p>Ba thứ quan trọng nhất trong bốn năm THCS lại không nằm trong bảng nào.</p>
<p><strong>Thứ nhất là chiều sâu tư duy.</strong> Chương trình phổ cập toàn quốc, do phải phù hợp với mọi học sinh trên cả nước, thường đặt mục tiêu ở ba bậc thấp của thang Bloom: Nhớ, Hiểu, Vận dụng. Phương pháp Active Learning tại Việt Anh đặt sàn tối thiểu ở bậc Phân tích và hướng lên Đánh giá, Sáng tạo. Nghiên cứu tổng hợp 225 công trình về giáo dục STEM của Freeman và cộng sự (PNAS, 2014) cho thấy Active Learning giúp điểm thi tăng khoảng 6% và giảm đáng kể tỷ lệ trượt môn so với lối thuyết giảng truyền thống.</p>
<p><strong>Thứ hai là tuổi 11–15.</strong> Đây là giai đoạn hình thành nhân cách rõ nét nhất. Việc con được giao vai trò lãnh đạo trong lớp, được chấm điểm theo 25 hành động cụ thể của 5 giá trị cốt lõi mỗi tuần, được tổ chức sự kiện cấp trường — những điều này không thể hiện ở điểm số học kỳ nhưng để lại dấu vết lâu hơn nhiều so với một bài kiểm tra.</p>
<p><strong>Thứ ba là sức khỏe.</strong> Tỷ lệ thừa cân, béo phì ở trẻ em Việt Nam tăng gấp 2,2 lần trong một thập kỷ, từ 8,5% năm 2010 lên 19% năm 2020, riêng trẻ nội thành TP.HCM vượt 50% (Viện Dinh dưỡng Quốc gia, Tổng điều tra 2019–2020). Thể thao mỗi ngày trong lịch học, cấm tuyệt đối nước ngọt có gas và snack, bữa ăn có định lượng — đó là những khoản đầu tư không có hóa đơn nhưng theo con suốt đời.</p>

<h2 id="neu-chon-sai">Và nếu gia đình chọn sai?</h2>
<p>Đây là chỗ khác biệt lớn nhất so với mọi phép so sánh học phí thông thường. Theo <a href="/chinh-sach#cam-ket-4-tuan">Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026</a>, trong 4 tuần lễ đầu năm học, nếu gia đình thấy con không nhận được giá trị như mong đợi, nhà trường hoàn 100% học phí, phí cơ sở vật chất và phí bản quyền Oxford — không cần nộp đơn, không cần nêu lý do, giải quyết trong 07 ngày làm việc. Điều kiện duy nhất: con đi học đầy đủ trong 4 tuần đó.</p>
<p>Nghĩa là 125.757.000 đồng không phải một ván cược. Đó là khoản đầu tư có cửa rút trong 28 ngày đầu tiên — 28 ngày trùng đúng với Học kỳ Foundation, giai đoạn đậm đặc giá trị nhất của cả năm học.</p>

<h2 id="truong-cong-hop-ly">Trường công vẫn hợp lý với gia đình nào?</h2>
<p>Nói cho công bằng: nếu ngân sách gia đình eo hẹp, có ông bà hỗ trợ đưa đón, con đã có nền tự học tốt và định hướng là thi vào các trường chuyên công lập rồi đại học trong nước, thì lộ trình trường công cộng vài lớp bổ trợ chọn lọc là lựa chọn hợp lý về tài chính. Nhiều trường công tại TP.HCM có đội ngũ giáo viên rất giỏi, và tập thể lớp gắn bó là thứ không mức học phí nào mua được.</p>
<p>Mô hình trọn gói phù hợp hơn với gia đình muốn con thành thạo tiếng Anh đủ để du học hoặc làm việc trong môi trường quốc tế, muốn con được rèn kỹ năng và thể chất một cách có hệ thống thay vì rời rạc, và muốn dồn thời gian buổi tối vào việc trò chuyện với con thay vì đưa đón con qua ba bốn địa điểm học thêm.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<div class="faq-block">
<h3>Học phí lớp 6 Trường Việt Anh là bao nhiêu?</h3>
<p>Năm học 2026–2027, học phí lớp 6 tại cơ sở Gò Vấp (VAGV) là 125.757.000 đồng/năm. Lớp theo chương trình Oxford International Curriculum đóng thêm 20.000.000 đồng/năm phí bản quyền. Nhà trường cam kết bằng văn bản không phát sinh chi phí bắt buộc trong năm học.</p>
<h3>Tính ra mỗi ngày học tốn bao nhiêu?</h3>
<p>Khoảng 719.000 đồng mỗi ngày học, tương đương khoảng 90.000 đồng mỗi tiết, với khoảng 175 ngày và 1.400 tiết học trong một năm.</p>
<h3>Học sinh lớp 6 học bao nhiêu tiết tiếng Anh mỗi tuần?</h3>
<p>Chương trình thường: 9 tiết/tuần, gồm 3 tiết theo chương trình Bộ và 6 tiết tăng cường với giáo viên nước ngoài. Chương trình OIC: 10 tiết tiếng Anh cộng khoảng 13 tiết học các môn bằng tiếng Anh.</p>
<h3>Sĩ số lớp 6 tại Trường Việt Anh là bao nhiêu?</h3>
<p>Tối đa 24 học sinh mỗi lớp. Trong khi đó nhiều trường công tại TP.HCM ở mức 45–50 học sinh/lớp do tăng dân số cơ học (Báo Người Lao Động, 30/11/2025).</p>
<h3>Con tôi đang học trường công, lên lớp 6 chuyển sang có kịp không?</h3>
<p>Học kỳ Foundation 28 ngày đầu năm được thiết kế đúng cho việc này: xây dựng văn hóa lớp, kỹ năng học tập và hòa nhập trước khi vào chương trình chính. Nếu sau 4 tuần gia đình thấy con chưa phù hợp, nhà trường hoàn 100% học phí.</p>
</div>

<!-- ĐỪNG đặt tiêu đề mục này là đúng chữ "Bước tiếp theo": cleanContent trong
     src/pages/blog/[slug].astro xoá thẻ h2 đó VÀ toàn bộ nội dung phía sau nó. -->
<h2 id="viec-nen-lam-tiep">Việc anh chị nên làm tiếp theo</h2>
<p>Trước khi quyết định, anh chị hãy làm hai việc. Một, cộng đủ chi phí thật mà gia đình đang chi cho việc học của con trong 12 tháng qua — <a href="/blog/tong-chi-phi-that-hoc-truong-cong/">bài "Học trường công có thật sự gần như miễn phí?"</a> có sẵn bảng tính. Hai, đến xem một buổi học lớp 6 tại trường, ngồi cuối lớp mười lăm phút. Con số trên giấy không thay thế được điều anh chị nhìn thấy.</p>
<p><a href="/dat-lich-tham-quan">Đăng ký tham quan một buổi học lớp 6</a> · <a href="/so-sanh-chi-phi-hoc">Nhận bảng so sánh chi phí thật 2026</a> · <a href="/blog/truong-viet-anh-co-tra-lai-hoc-phi-khong/">Chính sách hoàn 100% học phí trong 4 tuần đầu</a></p>
<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (Major Education, thành lập 2011). Nguồn: Bảng học phí và phí dịch vụ Trường Việt Anh 2026–2027; Chương trình GDPT 2018 (Bộ GD&amp;ĐT); Báo Người Lao Động 30/11/2025; Freeman et al., PNAS 2014; Viện Dinh dưỡng Quốc gia, Tổng điều tra 2019–2020; Quyết định 0728.1/2026/QĐ-MAJOR ngày 29/7/2026.</em></p>
`.trim();

const post = {
  title: 'Chênh lệch học phí lớp 6: mỗi ngày thêm bao nhiêu, đổi lại con nhận gì?',
  slug: 'hoc-phi-lop-6-truong-viet-anh-doi-lai-gi',
  status: 'published',
  excerpt: 'Học phí lớp 6 VAGV là 125.757.000đ/năm — tương đương 719.000đ mỗi ngày học, khoảng 90.000đ mỗi tiết. Bảng phân tích con nhận lại gì cho từng đồng đó.',
  content,
  published_at: '2026-08-05T09:00:00',
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
