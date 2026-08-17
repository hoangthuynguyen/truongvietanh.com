/**
 * Bài 7 cụm chi phí — "Chọn trường trễ một năm, con mất gì?".
 * BA NGUYÊN TẮC BẮT BUỘC của tác giả (bài chạm nỗi lo cha mẹ, ranh giới với hù dọa rất mỏng):
 *   1. Mọi khẳng định về thời điểm đều phải có nguồn nghiên cứu, không suy diễn thêm.
 *   2. Luôn kèm câu nói rõ muộn KHÔNG có nghĩa là vô ích.
 *   3. Không dùng câu mệnh lệnh gây hoảng kiểu "đừng để quá muộn".
 * Mất một trong ba là bài phản tác dụng với chính tệp phụ huynh nhà trường muốn giữ.
 * Chạy: node --env-file=.env scripts/create-post-chon-truong-tre-mot-nam.mjs   (thêm --update)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Có một loại chi phí không bao giờ xuất hiện trên bảng học phí: thời gian của con. Một năm lớp 3 chỉ diễn ra đúng một lần. Tiền học có thể kiếm lại, nhưng năm ấy của con thì không ai bán lại cho cha mẹ.</p>

<p>Bài viết này trình bày những gì khoa học biết được về các mốc thời gian trong sự phát triển của trẻ — cửa sổ ngôn ngữ, giai đoạn não bộ, tỷ suất lợi tức của đầu tư sớm — và những gì các mốc ấy có nghĩa với một quyết định rất cụ thể mà nhiều gia đình đang trì hoãn: chuyển trường cho con, hay đợi thêm một năm nữa.</p>

<p>Xin nói ngay điều quan trọng nhất, để anh chị đọc phần sau mà không thấy nặng nề: <strong>muộn không có nghĩa là vô ích.</strong> Não người có khả năng thích nghi suốt đời. Bài viết này nói về việc tận dụng thời điểm thuận lợi, không phải về việc bỏ lỡ chuyến tàu cuối.</p>

<h2 id="cua-so-ngon-ngu">Cửa sổ ngôn ngữ: khoa học nói gì?</h2>
<p>Nghiên cứu quy mô lớn nhất từng có về chủ đề này — Hartshorne, Tenenbaum và Pinker công bố trên tạp chí Cognition năm 2018, phân tích dữ liệu của khoảng hai phần ba triệu người — cho thấy khả năng đạt tới trình độ gần như bản ngữ ở ngôn ngữ thứ hai duy trì khá ổn định đến khoảng 17–18 tuổi, sau đó suy giảm rõ rệt.</p>
<p>Điều này có hai hàm ý mà cha mẹ nên hiểu đúng:</p>
<ul>
  <li><strong>Hàm ý thứ nhất:</strong> cửa sổ ấy rộng hơn nhiều so với quan niệm phổ biến "quá 6 tuổi là muộn". Một đứa trẻ 11 tuổi bắt đầu học tiếng Anh nghiêm túc vẫn hoàn toàn có thể đạt trình độ rất cao.</li>
  <li><strong>Hàm ý thứ hai:</strong> nhưng cửa sổ ấy có hạn, và mỗi năm trôi qua là một phần của nó khép lại. Nếu con đang học lớp 6, con còn khoảng sáu năm trong vùng thuận lợi nhất. Nếu con lớp 9, còn khoảng ba năm. Quyết định "để năm sau tính tiếp" không phải là một quyết định trung tính — nó tiêu đi một phần đáng kể của quỹ thời gian còn lại.</li>
</ul>
<p>Đặt vào bối cảnh Việt Nam, điều này càng đáng lưu tâm: Chỉ số Thông thạo Anh ngữ EF EPI 2024 xếp Việt Nam hạng 63 trên 116 quốc gia và vùng lãnh thổ, điểm 498 — thuộc nhóm trình độ thấp và tụt 5 bậc so với năm trước. Năng lực tiếng Anh vẫn là yếu tố tạo khác biệt lớn trên thị trường lao động, chưa phải mặt bằng chung ai cũng có.</p>

<h2 id="hai-moc-thoi-gian-khac">Không chỉ ngôn ngữ: hai mốc thời gian khác</h2>
<p><strong>Não bộ những năm đầu đời.</strong> Theo Trung tâm Nghiên cứu Sự phát triển Trẻ em của Đại học Harvard, não trẻ đạt khoảng 90% kích thước não người lớn trước 5 tuổi, và trong những năm đầu, não hình thành hơn một triệu kết nối thần kinh mỗi giây. Đây là lý do môi trường mầm non và tiểu học có sức nặng lớn hơn nhiều so với cảm nhận thông thường của cha mẹ — giai đoạn ấy không phải chỉ là "cho con vui chơi trước khi vào học thật".</p>
<p><strong>Đường cong Heckman.</strong> Nhà kinh tế học James Heckman, người đoạt giải Nobel Kinh tế, đã chỉ ra rằng tỷ suất lợi tức của đầu tư giáo dục càng cao khi đầu tư càng sớm, với mức lên tới khoảng 13% mỗi năm cho giáo dục sớm chất lượng cao. Cần ghi rõ phạm vi: nghiên cứu này thực hiện trên trẻ 0–5 tuổi thuộc nhóm thiệt thòi tại Mỹ, nên không nên áp thẳng con số vào mọi hoàn cảnh. Nhưng nguyên lý — can thiệp sớm hiệu quả hơn sửa chữa muộn — thì đã được kiểm chứng rộng rãi.</p>
<p><strong>Thói quen sức khỏe.</strong> Vận động đều đặn gắn với việc sống lâu hơn 3,4–4,7 năm (Moore và cộng sự, PLOS Medicine 2012, trên hơn 650.000 người). Thói quen ấy hình thành ở tuổi học trò chứ không phải tuổi trưởng thành. Trong khi đó, tỷ lệ thừa cân và béo phì ở trẻ em Việt Nam đã tăng gấp 2,2 lần trong một thập kỷ, từ 8,5% năm 2010 lên 19% năm 2020, riêng trẻ nội thành TP.HCM vượt 50% (Viện Dinh dưỡng Quốc gia, Tổng điều tra 2019–2020).</p>

<h2 id="bang-thoi-gian">Bảng thời gian còn lại của con</h2>
<p>Anh chị hãy tìm dòng tương ứng với con mình.</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Con đang học</th><th>Số năm còn trong vùng thuận lợi học ngôn ngữ</th><th>Điều đáng cân nhắc</th></tr>
  </thead>
  <tbody>
    <tr><td>Mầm non</td><td>~14 năm</td><td>Giai đoạn não phát triển nhanh nhất; lợi tức đầu tư cao nhất theo Heckman</td></tr>
    <tr><td>Lớp 1–3</td><td>~11–13 năm</td><td>Nền tảng phát âm và thói quen học hình thành ở đây</td></tr>
    <tr><td>Lớp 4–5</td><td>~8–10 năm</td><td>Còn kịp xây nền vững trước khi vào giai đoạn áp lực THCS</td></tr>
    <tr><td>Lớp 6–7</td><td>~6–7 năm</td><td>Đủ thời gian cho lộ trình IELTS từ lớp 9, mục tiêu 6.0+ trước tốt nghiệp</td></tr>
    <tr><td>Lớp 8–9</td><td>~4–5 năm</td><td>Vẫn kịp, nhưng cần cường độ cao hơn và ít dư địa cho thử sai</td></tr>
    <tr><td>Lớp 10–11</td><td>~2–3 năm</td><td>Mục tiêu thực tế hơn: IELTS 4.0–5.5, tập trung kỹ năng nền</td></tr>
  </tbody>
</table>
</div>
<p>Bảng này không nhằm gây áp lực. Nó chỉ giúp anh chị thấy rõ một điều: quyết định "đợi thêm một năm" có giá của nó, và cái giá ấy khác nhau tùy con đang ở đâu. Với một em lớp 2, đợi một năm là chuyện nhỏ. Với một em lớp 8, đó là một phần tư quỹ thời gian còn lại.</p>
<blockquote>"Trong hai mươi năm làm giáo dục, điều tôi nghe nhiều nhất từ phụ huynh không phải là 'tôi hối hận vì đã chuyển trường cho con'. Mà là 'giá mà tôi làm sớm hơn một hai năm'. Tôi kể lại điều này như một quan sát cá nhân, không phải một thống kê — nhưng nó lặp lại đủ nhiều để tôi thấy cần nói ra."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="vi-sao-tri-hoan">Vì sao cha mẹ thường trì hoãn?</h2>
<p>Ba lý do phổ biến, và cả ba đều hợp lý.</p>
<ol>
  <li><strong>"Đợi con học hết cấp này đã."</strong> Nghe rất hợp lý, nhưng thực tế mỗi cấp học đều có một điểm dừng tự nhiên tiếp theo, nên lý do này có thể lặp lại vô hạn. Nếu anh chị đã nghĩ đến việc chuyển trường trong hơn một năm, thì điều đang giữ gia đình lại có lẽ không phải là thời điểm.</li>
  <li><strong>"Đợi tài chính ổn định hơn."</strong> Đây là lý do chính đáng nhất, và không nên gạt đi. Nhưng anh chị nên tính cả chi phí đang chi cho học thêm và trung tâm bên ngoài — nhiều gia đình phát hiện khoảng cách nhỏ hơn mình tưởng khi cộng đủ. Bài <a href="/blog/tong-chi-phi-that-hoc-truong-cong/">"Học trường công có thật sự gần như miễn phí?"</a> có sẵn bảng tính để anh chị tự cộng.</li>
  <li><strong>"Sợ chọn sai."</strong> Đây là nỗi lo lớn nhất và cũng chính đáng nhất. Nó là lý do khiến chúng tôi ban hành chính sách hoàn phí — để nỗi sợ ấy không còn là cái giá phải trả cho việc thử.</li>
</ol>

<h2 id="neu-da-muon">Nếu đã muộn thì sao?</h2>
<p>Nếu con anh chị đã lớp 10, lớp 11, xin đừng đọc bài này với cảm giác đã lỡ. Ba điều đúng và cần nói rõ.</p>
<ul>
  <li><strong>Muộn vẫn hơn không.</strong> Nghiên cứu của Hartshorne nói về khả năng đạt trình độ <em>gần như bản ngữ</em> — một tiêu chuẩn rất cao. Người trưởng thành hoàn toàn có thể học tiếng Anh đến mức thành thạo và làm việc quốc tế, chỉ là phát âm khó đạt mức bản ngữ hơn.</li>
  <li><strong>Mục tiêu nên điều chỉnh cho thực tế.</strong> Tại Việt Anh, học sinh bắt đầu lộ trình IELTS từ lớp 9 với đủ năng lực có thể đạt 6.0+ trước khi tốt nghiệp; học sinh bắt đầu từ lớp 11 đặt mục tiêu 4.0. Cả hai đều là mục tiêu thật, đo bằng chu trình Plan-Do-Review với bốn kỳ đánh giá mỗi năm, không phải lời hứa suông.</li>
  <li><strong>Kỹ năng và phẩm chất thì không có cửa sổ đóng.</strong> Tư duy phản biện, khả năng hợp tác, tính kiên định — những thứ mà Diễn đàn Kinh tế Thế giới xếp vào nhóm kỹ năng cốt lõi của thị trường lao động 2030 — vẫn có thể xây ở bất kỳ tuổi nào. Ba năm THPT vẫn đủ để một đứa trẻ thay đổi rất nhiều.</li>
</ul>

<h2 id="thu-ma-khong-danh-cuoc">Cách thử mà không phải đánh cược</h2>
<p>Điều khiến cha mẹ trì hoãn thường không phải là tiền, mà là nỗi sợ quyết định sai và không rút lại được. Chúng tôi đã bỏ nỗi sợ đó khỏi bàn cân.</p>
<p>Theo <a href="/chinh-sach#cam-ket-4-tuan">Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026</a>, trong 4 tuần lễ đầu năm học, nếu gia đình thấy con không nhận được giá trị như mong đợi, Trường Việt Anh hoàn 100% học phí, phí cơ sở vật chất và phí bản quyền Oxford — không cần nộp đơn, không cần nêu lý do, giải quyết trong 07 ngày làm việc. Điều kiện duy nhất: con đi học đầy đủ trong 4 tuần đó.</p>
<p>Bốn tuần ấy trùng đúng với Học kỳ Foundation — 28 ngày nền tảng gồm giáo dục cảm xúc – xã hội, xây dựng văn hóa lớp, nhận vai trò lãnh đạo, rèn kỹ năng học tập và một chuyến dã ngoại. Nghĩa là gia đình được kiểm chứng bằng đúng giai đoạn đậm đặc giá trị nhất của cả năm học.</p>
<p>Nói cách khác: cái giá của việc thử là 28 ngày trong quỹ thời gian của con, không phải một trăm triệu đồng. Còn cái giá của việc đợi thêm một năm là cả một năm trong quỹ ấy. Thủ tục nếu gia đình quyết định dừng lại <a href="/blog/cam-ket-hoan-hoc-phi-4-tuan-hoat-dong-the-nao/">gọn trong ba bước</a>, không đơn từ và không phải giải thích lý do.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<div class="faq-block">
<h3>Trẻ mấy tuổi học tiếng Anh là tốt nhất?</h3>
<p>Càng sớm càng thuận lợi cho phát âm, nhưng khả năng đạt trình độ gần như bản ngữ duy trì đến khoảng 17–18 tuổi rồi mới suy giảm (Hartshorne và cộng sự, Cognition 2018). Nghĩa là học sinh THCS bắt đầu nghiêm túc vẫn hoàn toàn kịp.</p>
<h3>Con tôi đã lớp 9, chuyển trường có còn kịp không?</h3>
<p>Còn khoảng 3–4 năm trong vùng thuận lợi. Tại Trường Việt Anh, học sinh đủ năng lực bắt đầu lộ trình IELTS từ lớp 9 có thể đạt 6.0+ trước khi tốt nghiệp THPT, đo bằng chu trình Plan-Do-Review bốn kỳ mỗi năm.</p>
<h3>Chuyển trường giữa chừng con có bị sốc không?</h3>
<p>Học kỳ Foundation 28 ngày đầu năm được thiết kế cho việc hòa nhập: xây dựng văn hóa lớp, giáo dục cảm xúc – xã hội, phân công vai trò lãnh đạo và rèn kỹ năng học tập trước khi vào chương trình chính.</p>
<h3>Đầu tư giáo dục sớm có thật sự hiệu quả hơn không?</h3>
<p>Nghiên cứu của James Heckman cho thấy tỷ suất lợi tức của đầu tư giáo dục cao nhất ở giai đoạn sớm, tới khoảng 13% mỗi năm với giáo dục sớm chất lượng cao — lưu ý nghiên cứu thực hiện trên trẻ 0–5 tuổi thuộc nhóm thiệt thòi tại Mỹ. Nguyên lý can thiệp sớm hiệu quả hơn sửa chữa muộn thì đã được kiểm chứng rộng rãi.</p>
<h3>Nếu chuyển trường rồi thấy không hợp thì sao?</h3>
<p>Trong 4 tuần lễ đầu năm học, Trường Việt Anh hoàn 100% học phí, phí cơ sở vật chất và phí bản quyền Oxford, không cần đơn từ và không cần nêu lý do, giải quyết trong 07 ngày làm việc, đồng thời hỗ trợ đầy đủ thủ tục chuyển trường.</p>
<h3>Con tôi mới mầm non, có cần quyết định sớm vậy không?</h3>
<p>Đây là giai đoạn não phát triển nhanh nhất — khoảng 90% kích thước não người lớn hình thành trước 5 tuổi. Nhưng "quyết định sớm" không có nghĩa là quyết định vội; nghĩa là dành thời gian tìm hiểu ngay từ bây giờ thay vì để đến lúc phải chọn gấp.</p>
</div>

<!-- ĐỪNG đặt tiêu đề mục này là đúng chữ "Bước tiếp theo": cleanContent trong
     src/pages/blog/[slug].astro xoá thẻ h2 đó VÀ toàn bộ nội dung phía sau nó. -->
<h2 id="viec-nen-lam-tiep">Việc anh chị nên làm tiếp theo</h2>
<p>Anh chị hãy làm một việc rất nhỏ tối nay: tìm dòng tương ứng với con trong bảng thời gian ở trên, và tự trả lời câu hỏi "nếu đợi thêm một năm, phần còn lại của quỹ thời gian ấy giảm bao nhiêu?". Câu trả lời sẽ khác nhau với mỗi gia đình — và đó chính là điều khiến nó đáng để tự hỏi.</p>
<p><a href="/dat-lich-tham-quan">Đăng ký tham quan trường &amp; giữ chỗ trải nghiệm 4 tuần có bảo chứng hoàn phí</a> · <a href="/bang-tinh-chi-phi-12-nam">Nhận bảng tính chi phí giáo dục 12 năm (công cụ miễn phí)</a> · <a href="/blog/dau-tu-12-nam-truong-tu-het-bao-nhieu-roi/">Đầu tư 12 năm trường tư hết bao nhiêu?</a></p>
<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (Major Education, thành lập 2011). Nguồn: Hartshorne, Tenenbaum &amp; Pinker, Cognition 2018; Harvard Center on the Developing Child; James Heckman, heckmanequation.org; Moore et al., PLOS Medicine 2012; EF English Proficiency Index 2024; Viện Dinh dưỡng Quốc gia, Tổng điều tra 2019–2020; WEF Future of Jobs Report 2025; Quyết định 0728.1/2026/QĐ-MAJOR ngày 29/7/2026.</em></p>
`.trim();

const post = {
  title: 'Chọn trường trễ một năm, con mất gì?',
  slug: 'chon-truong-tre-mot-nam-con-mat-gi',
  status: 'published',
  excerpt: 'Khả năng học tiếng Anh gần như bản ngữ duy trì đến khoảng 17–18 tuổi rồi suy giảm. Mỗi năm trì hoãn là một phần cửa sổ khép lại — thứ tiền không mua lại được.',
  content,
  published_at: '2026-08-05T16:00:00',
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
