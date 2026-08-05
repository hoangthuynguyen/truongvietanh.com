/**
 * Bài 6 cụm chi phí (PILLAR) — "Đầu tư 12 năm trường tư hết bao nhiêu, và bao giờ hoàn vốn?".
 * Lưu ý biên tập của tác giả: phần ROI CỐ Ý không điền con số lương tuyệt đối — chỉ đưa công
 * thức và tỷ lệ có nguồn để phụ huynh tự thay số. Bịa một con số lương là cách nhanh nhất làm
 * hỏng uy tín của cả cụm bài. Mục "bốn giới hạn" phải giữ nguyên, đó là phần tự phản biện.
 * Chạy: node --env-file=.env scripts/create-post-dau-tu-12-nam-truong-tu-roi.mjs   (thêm --update)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Cộng đủ học phí từ lớp 1 đến lớp 12 tại cơ sở Gò Vấp của Trường Việt Anh theo bảng phí năm học 2026–2027, tổng số là 1.549.684.000 đồng — khoảng 1,55 tỷ đồng, trung bình 129 triệu đồng mỗi năm. Đó là con số trần trụi, chưa cộng ăn uống, đồng phục hay phí bản quyền Oxford.</p>

<p>Bài viết này làm ba việc: đưa ra bảng cộng đầy đủ để anh chị thấy tiền đi đâu; đặt khoản đầu tư ấy cạnh khung tính lợi tức có nguồn dẫn; và nói thẳng những gì phép tính này không trả lời được. Tôi viết với tư cách người sáng lập ngôi trường, nên anh chị hãy đọc phần cuối cùng — nơi tôi nêu các giới hạn của chính lập luận mình đưa ra.</p>

<h2 id="tong-dau-tu">Tổng đầu tư 12 năm: bảng cộng đầy đủ</h2>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Cấp học</th><th>Các khối</th><th>Tổng học phí</th></tr>
  </thead>
  <tbody>
    <tr><td>Tiểu học</td><td>Lớp 1–5</td><td>581.585.000đ</td></tr>
    <tr><td>Trung học cơ sở</td><td>Lớp 6–9</td><td>523.528.000đ</td></tr>
    <tr><td>Trung học phổ thông</td><td>Lớp 10–12</td><td>444.571.000đ</td></tr>
    <tr><td><strong>Tổng 12 năm</strong></td><td></td><td><strong>1.549.684.000đ</strong></td></tr>
  </tbody>
</table>
</div>
<p><a href="/hoc-phi">Học phí</a> từng khối: lớp 1 là 109.857.000đ, tăng dần đến lớp 11 là 142.557.000đ, riêng lớp 12 là 164.757.000đ do có chương trình ôn thi và định hướng đại học.</p>
<p><strong>Các khoản cần cộng thêm:</strong> phí cơ sở vật chất 5.000.000đ/cấp tiểu học và 6.000.000đ/cấp trung học; tài liệu học tập 2.000.000đ/năm; dã ngoại và sự kiện 4.000.000đ/năm; ăn uống tính theo thực tế sử dụng; phí bản quyền Oxford 20.000.000đ/năm nếu học lớp OIC; nội trú 23.500.000đ/năm nếu ở ký túc xá.</p>
<p><strong>Các khoản làm giảm tổng:</strong> đóng cả năm trước 15/9 giảm 6%; đóng hai lần giảm 2%; học bổng anh chị em ruột giảm 50% học phí cho người có mức phí thấp hơn; ưu đãi giới thiệu 3.000.000đ × 2. Ngoài học bổng 50%, các ưu đãi khác được cộng hưởng. Nhà trường cũng cam kết bằng văn bản không phát sinh chi phí bắt buộc trong năm học, với mức điều chỉnh hằng năm 5–10% được công bố minh bạch trước.</p>

<h2 id="so-sanh-dung">So sánh đúng: 1,55 tỷ với cái gì?</h2>
<p>Phép so sánh sai là đặt 1,55 tỷ cạnh dòng "học phí" trên biên lai trường công. Phép so sánh đúng là đặt nó cạnh tổng chi phí thật của lộ trình thay thế: học phí trường công, cộng học thêm các môn, cộng trung tâm tiếng Anh suốt 12 năm, cộng bán trú hoặc người trông con, cộng đưa đón, cộng năng khiếu và kỹ năng, cộng thời gian của chính cha mẹ.</p>
<p>Rất nhiều gia đình chưa từng cộng con số ấy lại, vì nó nằm rải rác ở năm sáu đầu mối khác nhau. Bài <a href="/blog/tong-chi-phi-that-hoc-truong-cong/">"Học trường công có thật sự gần như miễn phí?"</a> có sẵn bảng tính để anh chị tự điền — làm việc đó trước khi đọc tiếp phần dưới sẽ hữu ích hơn nhiều.</p>

<h2 id="hoan-von-the-nao">Khoản đầu tư này hoàn vốn thế nào?</h2>
<p>Đây là phần cần trình bày cẩn thận, vì rất dễ trở thành lời hứa hão. Tôi đưa ra các tỷ lệ có nguồn dẫn, và để anh chị tự thay số lương của ngành mình biết.</p>
<p><strong>Cơ chế thứ nhất — chênh lệch lương giữa doanh nghiệp FDI và doanh nghiệp nội địa.</strong> Theo khảo sát Talentnet–Mercer 2025, các công ty đa quốc gia tại Việt Nam trả lương cao hơn doanh nghiệp nội địa khoảng 26–33%, và khoảng cách này nới rộng theo cấp bậc: khoảng 21% ở cấp nhân viên lên tới khoảng 43% ở cấp lãnh đạo.</p>
<p><strong>Cơ chế thứ hai — mức thưởng cho năng lực tiếng Anh.</strong> Theo khảo sát nhà tuyển dụng trong Chỉ số Thông thạo Anh ngữ của EF, người thành thạo tiếng Anh xuất sắc có thể nhận mức lương cao hơn 30–50%. Cần ghi rõ: đây là khảo sát cảm nhận của nhà tuyển dụng, không phải số liệu thống kê tiền lương chính thức.</p>
<p>Bối cảnh làm hai cơ chế trên có ý nghĩa: Chỉ số EF EPI 2024 xếp Việt Nam hạng 63/116, điểm 498 — thuộc nhóm trình độ thấp và tụt 5 bậc so với năm trước. Nghĩa là năng lực tiếng Anh vẫn là yếu tố phân hóa mạnh trên thị trường lao động Việt Nam, chưa trở thành mặt bằng chung.</p>
<p><strong>Công thức để anh chị tự tính:</strong> gọi L là thu nhập năm dự kiến của con ở doanh nghiệp nội địa trong ngành anh chị hiểu rõ. Nếu nhờ năng lực tiếng Anh và kỹ năng, con làm việc tại doanh nghiệp FDI, phần chênh lệch mỗi năm là khoảng 0,26 × L đến 0,33 × L. Chia tổng đầu tư 1,55 tỷ cho phần chênh lệch ấy sẽ ra số năm đi làm cần thiết để phần chênh lệch bù lại toàn bộ học phí 12 năm.</p>
<p>Ví dụ minh họa cách dùng công thức, không phải dự báo: nếu phần chênh lệch mỗi năm là 100 triệu đồng, thì cần khoảng 15 năm đi làm; nếu là 200 triệu, cần khoảng 8 năm. Anh chị thay số của mình vào để có con số có ý nghĩa với gia đình.</p>

<h2 id="ba-loi-tuc">Ba lợi tức không quy được ra tiền</h2>
<p><strong>Khoảng trống kỹ năng của thị trường 2030.</strong> Báo cáo Tương lai Việc làm 2025 của Diễn đàn Kinh tế Thế giới cho biết 70% doanh nghiệp xếp tư duy phân tích là kỹ năng cốt lõi số một; 39% kỹ năng cốt lõi của người lao động sẽ thay đổi hoặc lỗi thời đến năm 2030; cứ 100 người lao động thì 59 người cần được đào tạo lại; và 86% doanh nghiệp tin AI sẽ thay đổi mô hình kinh doanh của họ. Trong bối cảnh ấy, những năng lực khó bị tự động hóa — sáng tạo, phản biện, thấu cảm, lãnh đạo — trở thành lợi thế bền nhất. Đây chính là khung mà chương trình 16 kỹ năng thế kỷ 21 của Việt Anh bám theo.</p>
<p><strong>Sức khỏe suốt đời.</strong> Vận động đều đặn gắn với việc sống lâu hơn 3,4–4,7 năm (Moore và cộng sự, PLOS Medicine 2012, trên hơn 650.000 người). Năm thói quen lành mạnh duy trì từ tuổi trung niên gắn với tuổi thọ cao hơn khoảng 10 năm (Harvard, BMJ 2020). Thói quen vận động hình thành ở tuổi học trò; thể thao mỗi ngày trong lịch học và quy định dinh dưỡng nghiêm ngặt là khoản đầu tư không có hóa đơn.</p>
<p><strong>Chiều sâu tư duy.</strong> Trường công theo khung phổ cập thường đặt mục tiêu ở ba bậc thấp của thang Bloom — Nhớ, Hiểu, Vận dụng. Active Learning tại Việt Anh đặt sàn ở Phân tích, hướng lên Đánh giá và Sáng tạo. Nghiên cứu tổng hợp 225 công trình STEM của Freeman và cộng sự (PNAS, 2014) ghi nhận điểm thi tăng khoảng 6% và tỷ lệ trượt môn giảm rõ rệt so với lối thuyết giảng.</p>
<blockquote>"Tôi không thích cách nói 'đầu tư giáo dục sinh lời bao nhiêu phần trăm'. Con cái không phải danh mục đầu tư. Nhưng tôi cũng không thích cách né tránh con số, vì 1,55 tỷ là số tiền thật của một gia đình thật. Cách trung thực là đưa cả con số lẫn các giới hạn của nó, rồi để cha mẹ quyết định."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="gioi-han">Những gì phép tính này không trả lời được</h2>
<p>Tôi phải nói rõ bốn giới hạn, vì bài viết này do chính chủ trường viết.</p>
<ol>
  <li><strong>Không có nghiên cứu nào chứng minh trường tư khiến con chắc chắn có thu nhập cao hơn.</strong> Các tỷ lệ dẫn ở trên là về năng lực tiếng Anh và loại hình doanh nghiệp, không phải về loại hình trường học. Mối liên hệ giữa hai điều đó là hợp lý nhưng không phải nhân quả đã được kiểm chứng.</li>
  <li><strong>Gia đình cũng quan trọng ngang nhà trường.</strong> Một đứa trẻ được cha mẹ đọc sách cùng, trò chuyện mỗi tối và làm gương về thái độ sống có thể phát triển tốt ở bất kỳ ngôi trường nào.</li>
  <li><strong>Con số 1,55 tỷ chỉ đúng nếu học trọn 12 năm ở cùng phân khúc và chưa tính trượt giá</strong> — mức điều chỉnh học phí hằng năm 5–10% có nghĩa tổng thực tế sẽ cao hơn.</li>
  <li><strong>Nếu 1,55 tỷ đồng khiến ngân sách gia đình căng thẳng đến mức ảnh hưởng bầu không khí trong nhà, thì cái giá đó cao hơn mọi lợi ích kể trên.</strong> Áp lực tài chính của cha mẹ luôn truyền sang con.</li>
</ol>

<h2 id="bat-dau-bang-28-ngay">Nếu chưa chắc chắn, hãy bắt đầu bằng 28 ngày</h2>
<p>Không gia đình nào nên cam kết 1,55 tỷ đồng dựa trên một bài viết. Đó là lý do chúng tôi ban hành Chính sách Cam kết Giá trị 4 Tuần theo <a href="/blog/truong-viet-anh-co-tra-lai-hoc-phi-khong/#toan-van-quyet-dinh">Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026</a>: trong 4 tuần lễ đầu năm học, nếu gia đình thấy con không nhận được giá trị như mong đợi, nhà trường hoàn 100% học phí, phí cơ sở vật chất và phí bản quyền Oxford — không cần nộp đơn, không cần nêu lý do, giải quyết trong 07 ngày làm việc.</p>
<p>Hành trình 12 năm bắt đầu bằng một quyết định 28 ngày. Đó là cách duy nhất chúng tôi biết để biến một con số lớn thành một bước đi vừa sức.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<div class="faq-block">
<h3>Học 12 năm trường tư hết bao nhiêu tiền?</h3>
<p>Tại cơ sở Gò Vấp của Trường Việt Anh, tổng học phí từ lớp 1 đến lớp 12 theo bảng phí 2026–2027 là 1.549.684.000 đồng, trung bình khoảng 129 triệu đồng mỗi năm, chưa gồm ăn uống, cơ sở vật chất, tài liệu, dã ngoại và phí bản quyền Oxford.</p>
<h3>Học phí có tăng theo từng năm không?</h3>
<p>Có. Nhà trường điều chỉnh học phí hằng năm ở mức 5–10% và công bố minh bạch trước, đồng thời cam kết không phát sinh chi phí bắt buộc trong năm học.</p>
<h3>Có cách nào giảm tổng chi phí không?</h3>
<p>Có: đóng cả năm trước 15/9 giảm 6%, đóng hai lần giảm 2%, học bổng anh chị em ruột giảm 50% học phí cho người có mức phí thấp hơn, ưu đãi giới thiệu 3.000.000 đồng × 2. Trừ học bổng 50%, các ưu đãi khác được cộng hưởng.</p>
<h3>Đầu tư giáo dục bao lâu thì hoàn vốn?</h3>
<p>Không có con số chung. Cách tính: lấy tổng đầu tư chia cho phần chênh lệch thu nhập hằng năm. Theo khảo sát Talentnet–Mercer 2025, doanh nghiệp FDI trả cao hơn doanh nghiệp nội địa khoảng 26–33%; anh chị thay mức thu nhập dự kiến của ngành mình vào để ra số năm cụ thể.</p>
<h3>Trường tư có đảm bảo con thành công hơn không?</h3>
<p>Không. Không có nghiên cứu nào chứng minh điều đó, và nhà trường không hứa hẹn như vậy. Nhà trường chỉ cam kết về những gì kiểm chứng được: số tiết học, sĩ số tối đa 24 học sinh, chương trình, và quyền hoàn 100% học phí trong 4 tuần đầu nếu gia đình thấy không xứng đáng.</p>
<h3>Nếu giữa chừng gia đình không đủ khả năng tài chính thì sao?</h3>
<p>Anh chị nên trao đổi sớm với phòng tuyển sinh về các phương án học bổng và kỳ hạn đóng phí. Đây là cuộc trò chuyện nên diễn ra trước khi khó khăn trở nên nghiêm trọng.</p>
</div>

<!-- ĐỪNG đặt tiêu đề mục này là đúng chữ "Bước tiếp theo": cleanContent trong
     src/pages/blog/[slug].astro xoá thẻ h2 đó VÀ toàn bộ nội dung phía sau nó. -->
<h2 id="viec-nen-lam-tiep">Việc anh chị nên làm tiếp theo</h2>
<p>Hãy dành một buổi tối cộng đủ chi phí giáo dục thật của gia đình trong 12 tháng qua, rồi nhân với 12 năm. Con số ấy — chứ không phải con số trong bài này — mới là mốc so sánh đúng của gia đình anh chị.</p>
<p><a href="/so-sanh-chi-phi-hoc">Nhận bảng so sánh chi phí thật 2026</a> · <a href="/dat-lich-tham-quan">Đăng ký tham quan trường &amp; tìm hiểu Cam kết Giá trị 4 Tuần</a> · <a href="/blog/hoc-phi-lop-6-truong-viet-anh-doi-lai-gi/">Học phí lớp 6: mỗi ngày thêm bao nhiêu, đổi lại con nhận gì?</a></p>
<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (Major Education, thành lập 2011). Nguồn: Bảng học phí Trường Việt Anh 2026–2027; WEF Future of Jobs Report 2025; EF English Proficiency Index 2024; khảo sát Talentnet–Mercer 2025; Moore et al., PLOS Medicine 2012; Harvard/BMJ 2020; Freeman et al., PNAS 2014; Quyết định 0728.1/2026/QĐ-MAJOR ngày 29/7/2026.</em></p>
`.trim();

const post = {
  title: 'Đầu tư 12 năm trường tư hết bao nhiêu — và bao giờ "hoàn vốn"?',
  slug: 'dau-tu-12-nam-truong-tu-het-bao-nhieu-roi',
  status: 'published',
  excerpt: 'Tổng học phí 12 năm tại Trường Việt Anh là khoảng 1,55 tỷ đồng. Bài phân tích khoản đầu tư này hoàn vốn thế nào, dựa trên số liệu WEF, EF EPI và Talentnet–Mercer.',
  content,
  published_at: '2026-08-05T14:00:00',
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
