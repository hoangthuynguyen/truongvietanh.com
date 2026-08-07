/**
 * Bài 4 cụm chi phí — "Học trường công có thật sự gần như miễn phí?".
 * Lưu ý biên tập của tác giả: KHÔNG chốt con số cứng cho chi phí trường công; mọi đơn giá
 * thị trường đều ghi rõ là khoảng tham khảo, bảng tính để trống cho phụ huynh tự điền.
 * Chạy: node --env-file=.env scripts/create-post-tong-chi-phi-that-hoc-truong-cong.mjs   (thêm --update)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Học phí trường công lập tại TP.HCM là khoản nhỏ nhất trong tổng chi phí giáo dục của một đứa trẻ. Phần lớn tiền thật nằm ở những khoản đứng ngoài biên lai nhà trường: học thêm, trung tâm tiếng Anh, bán trú, đưa đón, kỹ năng và thể thao. Cộng đủ những khoản ấy lại, khoảng cách giữa "trường công" và "trường tư trọn gói" thường hẹp hơn nhiều so với cảm nhận ban đầu của phụ huynh.</p>

<p>Bài viết này không nhằm nói trường công đắt hay trường tư rẻ. Nó đưa ra một bảng tính để anh chị tự cộng — bằng chính con số của gia đình mình, không phải con số của ai khác. Cuối bài là phần đối chiếu với mô hình trọn gói, để anh chị thấy mình thực sự đang so sánh cái gì với cái gì.</p>

<h2 id="vi-sao-gay-hieu-nham">Vì sao con số "học phí" gây hiểu nhầm?</h2>
<p>Vì học phí chỉ mua phần chương trình bắt buộc trong giờ hành chính. Mọi thứ nằm ngoài phạm vi đó — tiếng Anh đủ để con giao tiếp được, kỹ năng, thể thao, người trông con buổi trưa và buổi chiều — đều là các giao dịch riêng lẻ mà gia đình tự mua ngoài thị trường, mỗi thứ một nơi, mỗi thứ một giá.</p>
<p>Hai con số làm rõ khoảng trống này. Về tiếng Anh, Chương trình GDPT 2018 quy định tiểu học lớp 3–5 học 4 tiết/tuần, THCS và THPT 3 tiết/tuần, đều do giáo viên Việt Nam đảm nhiệm và hầu như không có giáo viên nước ngoài. Đó là lý do gần như mọi gia đình đô thị đều mua thêm tiếng Anh bên ngoài. Về sĩ số, điều lệ trường tiểu học quy định không quá 35 học sinh/lớp, nhưng thực tế nhiều trường tại TP.HCM ở mức 45–50 học sinh/lớp do tăng dân số cơ học; năm 2025 Sở GD-ĐT TP.HCM xác nhận có lớp trên 50 học sinh (Báo Người Lao Động, 30/11/2025). Sĩ số đông là lý do thứ hai khiến nhiều gia đình phải mua thêm kèm cặp riêng.</p>
<p>Ngoài ra, từ khi Thông tư 29/2024/TT-BGDĐT về dạy thêm, học thêm có hiệu lực, việc dạy thêm trong nhà trường bị siết chặt và phần lớn nhu cầu học thêm chuyển ra các trung tâm bên ngoài — nơi mặt bằng giá cao hơn.</p>

<h2 id="bang-tinh">Bảng tính tổng chi phí thật — anh chị tự điền</h2>
<p>Anh chị hãy điền cột cuối bằng con số thật của gia đình mình trong 12 tháng gần nhất. Cột "khoảng tham khảo" chỉ để gợi ý thứ tự độ lớn, không phải mức chuẩn.</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Khoản chi</th><th>Khoảng tham khảo/năm</th><th>Gia đình tôi</th></tr>
  </thead>
  <tbody>
    <tr><td>Học phí trường công + các khoản thu theo quy định</td><td>Vài triệu</td><td>............</td></tr>
    <tr><td>Học thêm các môn văn hóa (toán, văn, lý, hóa…)</td><td>Phổ biến 10–40 triệu</td><td>............</td></tr>
    <tr><td>Trung tâm tiếng Anh</td><td>Phổ biến 15–40 triệu</td><td>............</td></tr>
    <tr><td>Giáo viên nước ngoài / lớp tiếng Anh 1-1 (nếu có)</td><td>Từ 350.000–450.000đ/tiết 45 phút</td><td>............</td></tr>
    <tr><td>Luyện IELTS (từ cấp 2 trở lên)</td><td>Từ 450.000đ/tiết 1-1</td><td>............</td></tr>
    <tr><td>Bán trú / người trông con buổi trưa, buổi chiều</td><td>............</td><td>............</td></tr>
    <tr><td>Đưa đón (xăng xe, xe ôm, tài xế, thời gian của cha mẹ)</td><td>............</td><td>............</td></tr>
    <tr><td>Năng khiếu: thể thao, nhạc, vẽ</td><td>............</td><td>............</td></tr>
    <tr><td>Kỹ năng sống, trại hè</td><td>............</td><td>............</td></tr>
    <tr><td>Sách vở, đồng phục, thiết bị học</td><td>............</td><td>............</td></tr>
    <tr><td><strong>TỔNG</strong></td><td></td><td>............</td></tr>
  </tbody>
</table>
</div>
<p>Đơn giá lớp 1-1 nêu trên lấy theo bảng phí dịch vụ rèn luyện thêm công bố của Trường Việt Anh năm học 2026–2027 (tiếng Anh 1-1: 350.000đ/tiết tiểu học, 450.000đ/tiết trung học; IELTS 1-1: 450.000đ/tiết), vốn được xây dựng bám sát mặt bằng thị trường TP.HCM — dùng làm mốc quy đổi.</p>

<h2 id="bon-khoan-hay-quen">Bốn khoản mà phụ huynh hay quên cộng vào</h2>
<p><strong>Thứ nhất là thời gian của cha mẹ.</strong> Đưa đón hai lượt mỗi ngày, chờ ngoài trung tâm tiếng Anh ba buổi mỗi tuần, kèm bài buổi tối — nếu quy đổi thành giờ làm việc, đây thường là khoản lớn nhất trong cả bảng và cũng là khoản duy nhất không thể thuê ngoài.</p>
<p><strong>Thứ hai là chi phí phân mảnh.</strong> Con học toán ở một nơi, tiếng Anh ở nơi khác, bơi ở nơi thứ ba. Mỗi nơi một lịch, một cách đánh giá, không ai nhìn thấy toàn cảnh đứa trẻ. Chi phí ở đây không chỉ là tiền mà là sự thiếu nhất quán trong việc dạy con.</p>
<p><strong>Thứ ba là khoảng trống kỹ năng.</strong> Đây là khoản không có hóa đơn nên gần như không ai cộng. Báo cáo Tương lai Việc làm 2025 của Diễn đàn Kinh tế Thế giới cho biết 70% doanh nghiệp xếp tư duy phân tích là kỹ năng cốt lõi số một, 39% kỹ năng cốt lõi của người lao động sẽ thay đổi hoặc lỗi thời đến năm 2030, và cứ 100 người lao động thì 59 người cần được đào tạo lại. Kỹ năng phản biện, hợp tác, lãnh đạo hiếm khi được mua rời như một khóa học — chúng hình thành qua cách một ngôi trường tổ chức việc học mỗi ngày.</p>
<p><strong>Thứ tư là thời gian của con.</strong> Một năm lớp 1 chỉ diễn ra đúng một lần. Nghiên cứu trên khoảng hai phần ba triệu người của Hartshorne và cộng sự (Cognition, 2018) cho thấy khả năng học ngôn ngữ thứ hai đạt gần mức bản ngữ duy trì đến khoảng 17–18 tuổi rồi suy giảm. Tiền học có thể kiếm lại; cửa sổ ấy thì không.</p>

<h2 id="so-sanh">So sánh mà nói: cùng một số tiền, con nhận được gì?</h2>
<p>Khi đã cộng xong bảng trên, phép so sánh đúng không còn là "học phí trường công so với học phí trường tư", mà là tổng chi phí phân mảnh so với chi phí trọn gói — và quan trọng hơn, là những gì con thực sự nhận lại.</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Tiêu chí</th><th>Lộ trình trường công + mua ngoài</th><th>Trường Việt Anh (VAGV, trọn gói)</th></tr>
  </thead>
  <tbody>
    <tr><td>Tiếng Anh/tuần</td><td>3–4 tiết (GDPT 2018), giáo viên Việt Nam</td><td>THCS 9 tiết (6 tiết giáo viên nước ngoài); THPT 11 tiết</td></tr>
    <tr><td>Giáo viên nước ngoài</td><td>Hầu như không có trong trường</td><td>6 tiết/tuần trong chương trình chính khóa</td></tr>
    <tr><td>Sĩ số</td><td>Thực tế TP.HCM 45–50+ học sinh/lớp</td><td>Tối đa 24 học sinh/lớp</td></tr>
    <tr><td>Kỹ năng</td><td>Rời rạc, mua theo khóa</td><td>Lồng ghép mọi môn + Học kỳ Foundation 28 ngày, TLIM, PDR</td></tr>
    <tr><td>Thể thao</td><td>Gia đình tự lo</td><td>Thể thao hằng ngày sau giờ học, Olympic thể thao cấp trường</td></tr>
    <tr><td>Quản lý chi phí</td><td>Nhiều đầu mối, khó dự báo</td><td>Một bảng phí, cam kết không phát sinh chi phí bắt buộc trong năm</td></tr>
    <tr><td>Rủi ro chọn sai</td><td>Không có cơ chế hoàn</td><td>Hoàn 100% học phí, phí CSVC, phí Oxford trong 4 tuần đầu</td></tr>
  </tbody>
</table>
</div>
<p>Để dễ hình dung: tiếng Anh 9 tiết mỗi tuần so với 3 tiết nghĩa là học một năm ở Việt Anh xấp xỉ ba năm ở trường công, chỉ tính riêng thời lượng. Còn 6 tiết với giáo viên nước ngoài so với 0 tiết thì không phải là nhiều hơn — mà là có so với không có. Về sĩ số, 24 so với 48 nghĩa là cùng một giáo viên, con nhận được gấp đôi sự quan tâm.</p>
<p><a href="/hoc-phi">Học phí</a> năm học 2026–2027 tại cơ sở Gò Vấp: lớp 1 là 109.857.000đ, lớp 6 là 125.757.000đ, lớp 10 là 137.257.000đ, lớp 12 là 164.757.000đ. Lớp theo chương trình Oxford International Curriculum đóng thêm 20.000.000đ/năm phí bản quyền.</p>

<h2 id="neu-chon-sai">Và nếu gia đình chọn sai thì sao?</h2>
<p>Đây là điểm khác biệt lớn nhất, và cũng là điều chúng tôi muốn anh chị cân nhắc kỹ nhất. Với lộ trình mua ngoài, tiền đã trả cho trung tâm gần như không lấy lại được. Với Việt Anh, <a href="/chinh-sach#cam-ket-4-tuan">Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026</a> quy định: trong 4 tuần lễ đầu năm học, nếu gia đình thấy con không nhận được giá trị như mong đợi, nhà trường hoàn 100% học phí, phí cơ sở vật chất và phí bản quyền Oxford — không cần nộp đơn, không cần nêu lý do, giải quyết trong 07 ngày làm việc.</p>
<p>Nói cách khác: con số hơn một trăm triệu đồng mỗi năm không phải là ván cược một chiều. Đó là khoản đầu tư có cửa rút trong 28 ngày đầu tiên.</p>
<blockquote>"Tôi không tin trường tư luôn tốt hơn trường công. Tôi chỉ tin rằng phụ huynh nên biết mình đang trả bao nhiêu và nhận lại được gì — bằng con số, không bằng cảm giác. Cộng xong bảng đó rồi, gia đình chọn gì cũng là lựa chọn đúng, vì đó là lựa chọn có hiểu biết."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="truong-cong-hop-ly-voi-ai">Trường công vẫn là lựa chọn hợp lý với ai?</h2>
<p>Nói cho công bằng: với gia đình có ngân sách tối giản, có người thân hỗ trợ đưa đón và trông con, con đã tự học tốt, và định hướng của con là thi đại học trong nước hoặc các ngành đặc thù như công an, quân đội, hành chính — thì lộ trình trường công cộng thêm vài lớp bổ trợ chọn lọc là lựa chọn hợp lý về mặt tài chính. Trường công cũng có những giáo viên tận tụy và những tập thể lớp gắn bó mà không mức học phí nào mua được.</p>
<p>Mô hình trọn gói phù hợp hơn với gia đình muốn con thành thạo tiếng Anh để du học hoặc làm việc trong môi trường quốc tế, muốn con được rèn kỹ năng và thể chất có hệ thống, và muốn dồn thời gian của cha mẹ vào việc đồng hành cùng con thay vì vào việc đưa đón và quản lý lịch học ở năm sáu địa điểm khác nhau.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<div class="faq-block">
<h3>Học trường công một năm thực sự tốn bao nhiêu?</h3>
<p>Không có con số chung, vì phần lớn chi phí nằm ngoài nhà trường và khác nhau rất nhiều giữa các gia đình. Cách duy nhất để biết là cộng đủ: học phí, học thêm, trung tâm tiếng Anh, bán trú, đưa đón, năng khiếu và sách vở trong 12 tháng gần nhất.</p>
<h3>Vì sao gần như gia đình nào cũng phải cho con học thêm tiếng Anh bên ngoài?</h3>
<p>Vì Chương trình GDPT 2018 chỉ bố trí 3–4 tiết tiếng Anh mỗi tuần, do giáo viên Việt Nam dạy, hầu như không có giáo viên nước ngoài — thường chưa đủ để con giao tiếp tự nhiên.</p>
<h3>Học phí Trường Việt Anh đã bao gồm những gì?</h3>
<p>Bao gồm chương trình chính khóa, tiếng Anh tăng cường với giáo viên nước ngoài, chương trình kỹ năng và thể thao trong khung giờ học, với cam kết bằng văn bản không phát sinh chi phí bắt buộc trong năm. Tiền ăn, nội trú, đồng phục và một số dịch vụ tùy chọn tính riêng.</p>
<h3>Nếu đóng học phí rồi mà thấy không phù hợp thì sao?</h3>
<p>Trong 4 tuần lễ đầu năm học, Trường Việt Anh hoàn 100% học phí, phí cơ sở vật chất và phí bản quyền Oxford, không cần đơn từ và không cần nêu lý do, giải quyết trong 07 ngày làm việc.</p>
<h3>Sĩ số lớp có thật sự ảnh hưởng đến kết quả học không?</h3>
<p>Sĩ số quyết định lượng thời gian giáo viên có thể dành cho từng em. Với 24 học sinh so với 48 học sinh, cùng một giáo viên, mỗi em nhận được gấp đôi sự quan tâm — điều này thể hiện rõ nhất ở các môn cần phản hồi cá nhân như viết, thuyết trình và ngoại ngữ.</p>
</div>

<!-- ĐỪNG đặt tiêu đề mục này là đúng chữ "Bước tiếp theo": cleanContent trong
     src/pages/blog/[slug].astro xoá thẻ h2 đó VÀ toàn bộ nội dung phía sau nó. -->
<h2 id="viec-nen-lam-tiep">Việc anh chị nên làm tiếp theo</h2>
<p>Anh chị hãy dành hai mươi phút tối nay cộng đủ bảng trên. Rất nhiều phụ huynh bất ngờ với con số cuối cùng — không phải vì họ tiêu hoang, mà vì các khoản ấy vốn nằm rải rác nên chưa từng được nhìn cùng lúc.</p>
<p><a href="/so-sanh-chi-phi-hoc">Nhận bảng so sánh chi phí thật 2026: trường công + học thêm, song ngữ và quốc tế</a> · <a href="/dat-lich-tham-quan">Đăng ký tham quan trường &amp; tìm hiểu Cam kết Giá trị 4 Tuần</a> · <a href="/blog/chinh-sach-hoan-hoc-phi-truong-tu-tphcm/">7 câu hỏi phải hỏi trước khi đóng học phí</a></p>
<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh. Nguồn: Chương trình GDPT 2018 (Bộ GD&amp;ĐT); Thông tư 29/2024/TT-BGDĐT về dạy thêm, học thêm; Báo Người Lao Động 30/11/2025; WEF Future of Jobs Report 2025; Hartshorne et al., Cognition 2018; Bảng học phí và phí dịch vụ Trường Việt Anh 2026–2027; Quyết định 0728.1/2026/QĐ-MAJOR ngày 29/7/2026.</em></p>
`.trim();

const post = {
  title: 'Học trường công có thật sự "gần như miễn phí"? Bảng tính tổng chi phí thật của một năm học',
  slug: 'tong-chi-phi-that-hoc-truong-cong',
  status: 'published',
  excerpt: 'Học phí trường công thấp, nhưng học thêm, trung tâm tiếng Anh, bán trú và đưa đón thì không. Bảng tính giúp phụ huynh cộng đủ chi phí thật của một năm học.',
  content,
  published_at: '2026-08-02T14:00:00',
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
