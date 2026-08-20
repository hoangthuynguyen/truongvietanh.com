/**
 * Bài cluster #3 cụm AI, intent thương mại. Điểm SEO 88/100 (từ khóa "trường học ứng dụng AI").
 * Giữ nguyên mục tự chấm có nêu hạn chế (AI tutor mới thử nghiệm môn Toán) theo lưu ý biên tập.
 * Chạy: node --env-file=.env scripts/create-post-truong-hoc-ung-dung-ai.mjs   (thêm --update để cập nhật)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Mùa tuyển sinh năm học 2026-2027, gần như trường tư thục nào tại TP.HCM cũng có một dòng về AI trên brochure. Có trường ghi "ứng dụng AI trong giảng dạy", có trường gọi mình là trường công nghệ, có trường tổ chức hẳn ngày hội robot. Phụ huynh đứng giữa, và câu hỏi rất thực tế: một <strong>trường học ứng dụng AI</strong> kiểu nào thì thật sự thay đổi việc học của con, kiểu nào chỉ là một dòng chữ đẹp?</p>

<p>Tôi viết bài này với tư cách người đang trực tiếp xây dựng một hệ thống trường theo định hướng AI-Powered School — nghĩa là tôi có thiên vị, và tôi nói rõ điều đó ngay từ đầu. Nhưng chính vì làm việc này hằng ngày, tôi biết đâu là những phần khó, tốn kém và dễ bị bỏ qua nhất. Bảy tiêu chí dưới đây là những gì tôi sẽ hỏi nếu tôi là phụ huynh đi chọn trường cho con mình.</p>

<h2 id="vi-sao-khong-con-loi-the">Vì sao "có dùng AI" đã không còn là lợi thế?</h2>
<p>Cần nói thẳng một điều trước khi đi vào tiêu chí: bản thân việc một ngôi trường có dùng AI không còn nói lên nhiều điều nữa. Công cụ AI hiện đã miễn phí hoặc rất rẻ, ai cũng cài được trong một buổi chiều.</p>
<p>Nói cách khác: <strong>AI đã trở thành điện, không còn là đèn</strong>. Điều đáng hỏi không phải "trường có AI không", mà "trường dùng AI để làm gì, ai vận hành, và có gì thay đổi trong việc học của con". Bảy tiêu chí sau đi theo đúng logic đó.</p>

<h2 id="7-tieu-chi">Bảy tiêu chí đánh giá một trường học ứng dụng AI</h2>

<h3>Tiêu chí 1 — AI nằm trong môn học hay chỉ là một buổi ngoại khóa?</h3>
<p>Với một trường học ứng dụng AI, đây là tiêu chí phân loại nhanh nhất. Nếu AI ở trường chỉ xuất hiện trong một câu lạc bộ chiều thứ Sáu hoặc một ngày hội công nghệ chụp ảnh đẹp, thì AI chưa chạm vào việc học chính của con.</p>
<p>Trường làm thật đưa AI vào chính các môn hiện có: con dùng AI để học Toán, học Văn, làm dự án Khoa học. Hãy hỏi thẳng: "Tuần vừa rồi con tôi dùng AI trong tiết học nào, làm gì cụ thể?" Câu trả lời chung chung là một tín hiệu.</p>

<h3>Tiêu chí 2 — Giáo viên có được đào tạo trước học sinh không?</h3>
<p>Đây là nút thắt lớn nhất của giáo dục AI trên toàn thế giới, không riêng Việt Nam. Một ngôi trường mua phần mềm AI chỉ mất vài tuần. Đào tạo được đội ngũ giáo viên tự thiết kế bài giảng có AI mất nhiều năm.</p>
<p>Hãy hỏi: "Bao nhiêu phần trăm giáo viên của trường đang dùng AI trong soạn giảng, và trường đào tạo họ theo lộ trình nào?" Đây là câu hỏi phân loại rõ nhất giữa một trường học ứng dụng AI thật sự và một trường mới mua phần mềm.</p>

<h3>Tiêu chí 3 — Trường có quy tắc rõ ràng về việc học sinh được dùng AI đến đâu?</h3>
<p>Một trường học ứng dụng AI nghiêm túc phải trả lời được: phần nào học sinh bắt buộc tự làm, phần nào được dùng AI hỗ trợ. Không có ranh giới này, AI sẽ thành công cụ làm hộ bài — và hậu quả đã được đo bằng số liệu.</p>
<p>Nghiên cứu theo dõi 26.811 học sinh trong khoảng 30 tháng (CEPR Discussion Paper DP21577) ghi nhận nhóm trẻ lệ thuộc AI có điểm bài tập tăng 18% nhưng điểm thi hàng tháng giảm 20% sau 6 tháng, và điểm thi chuyển cấp giảm 24%. Chúng tôi phân tích kỹ trong bài <a href="/blog/day-con-dung-ai-dung-cach/">Dạy con dùng AI đúng cách</a> và bài <a href="/blog/ai-lam-ho-bai-dau-hieu-va-cach-sua/">AI làm hộ bài: 7 dấu hiệu con lệ thuộc</a>.</p>

<h3>Tiêu chí 4 — AI của trường đặt câu hỏi hay đưa đáp án?</h3>
<p>Một trợ lý AI học tập tốt hoạt động như gia sư: dẫn dắt từng bước, hỏi ngược, để học sinh tự đi đến đáp án. Một công cụ đưa đáp án ngay thì học sinh đã có sẵn miễn phí ngoài kia rồi — trường không cần đầu tư để làm lại thứ đó.</p>
<p>Hãy đề nghị được xem thử: "Cho tôi xem trợ lý AI của trường trả lời một bài toán lớp 8 như thế nào." Sự khác biệt lộ ra trong 30 giây.</p>

<h3>Tiêu chí 5 — Trường có dạy an toàn số và đạo đức AI không?</h3>
<p>Đây là tiêu chí phụ huynh hay quên nhưng lại đang là xu hướng lớn: chống lừa đảo, bảo vệ dữ liệu cá nhân, nhận diện nội dung do AI tạo. <a href="https://www.unesco.org/en/articles/ai-competency-framework-students" target="_blank" rel="noopener">UNESCO đặt tư duy phản biện và đạo đức AI vào trung tâm Khung năng lực AI dành cho học sinh</a>.</p>
<p>Con dùng AI giỏi mà không phân biệt được thông tin thật giả là một rủi ro, không phải một thành tích.</p>

<h3>Tiêu chí 6 — Sản phẩm học sinh làm ra là gì?</h3>
<p>Đây là tiêu chí trung thực nhất để đo một trường học ứng dụng AI, vì không thể làm giả bằng brochure. Hãy hỏi được xem sản phẩm thật: bài báo, video, mô hình, bài thuyết trình do chính học sinh tạo cùng AI.</p>
<p>Sản phẩm càng đòi hỏi chính kiến và trải nghiệm cá nhân của đứa trẻ thì càng chứng tỏ AI được dùng đúng vai — vì đó là những thứ AI không thể làm hộ trọn gói.</p>

<h3>Tiêu chí 7 — Phụ huynh có nhận được dữ liệu tiến bộ của con không?</h3>
<p>Giá trị mà app AI miễn phí không bao giờ cung cấp được chính là điều này: bức tranh tiến bộ dài hạn của con, do người thật theo dõi. Một trường học ứng dụng AI đúng nghĩa nên dùng công nghệ để hiểu con sâu hơn — điểm mạnh, lỗ hổng kiến thức, sự thay đổi qua thời gian — và trả lại thông tin đó cho gia đình.</p>
<p>Hãy hỏi: "Tôi sẽ nhận báo cáo về con dưới dạng nào, bao lâu một lần, và có gì khác so với bảng điểm truyền thống?"</p>

<h2 id="bang-doi-chieu">Bảng đối chiếu nhanh: trường làm thật và trường dán nhãn</h2>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Khía cạnh</th><th>Trường dán nhãn AI</th><th>Trường ứng dụng AI thật</th></tr>
  </thead>
  <tbody>
    <tr><td>Vị trí của AI</td><td>Ngoại khóa, sự kiện, ảnh truyền thông</td><td>Trong tiết học các môn chính, hằng tuần</td></tr>
    <tr><td>Giáo viên</td><td>Vài người phụ trách công nghệ</td><td>Đa số giáo viên tự dùng AI soạn giảng</td></tr>
    <tr><td>Quy tắc dùng AI</td><td>Không có, hoặc cấm chung chung</td><td>Rõ phần nào tự làm, phần nào được hỗ trợ</td></tr>
    <tr><td>Công cụ AI</td><td>Đưa đáp án nhanh</td><td>Đặt câu hỏi dẫn dắt từng bước</td></tr>
    <tr><td>An toàn số</td><td>Không nhắc tới</td><td>Có nội dung riêng về đạo đức và an toàn</td></tr>
    <tr><td>Bằng chứng</td><td>Brochure, hình ảnh thiết bị</td><td>Sản phẩm thật của học sinh</td></tr>
    <tr><td>Báo cáo phụ huynh</td><td>Bảng điểm như cũ</td><td>Dữ liệu tiến bộ, lỗ hổng kiến thức</td></tr>
  </tbody>
</table>
</div>
<blockquote>"Tôi khuyên phụ huynh đừng chọn trường vì chữ AI trên bảng hiệu, kể cả trường của tôi. Hãy đi thăm trường vào một ngày học bình thường, không phải ngày hội, rồi hỏi một học sinh bất kỳ: 'Con dùng AI ở trường để làm gì?' Câu trả lời của đứa trẻ trung thực hơn mọi tài liệu tuyển sinh — và nếu con kể được một việc cụ thể con vừa làm tuần trước, thì trường đó làm thật."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="tu-cham">Trường Việt Anh tự chấm mình theo 7 tiêu chí này như thế nào?</h2>
<p>Để bài viết này có giá trị thay vì thành quảng cáo cho một trường học ứng dụng AI, tôi tự đối chiếu hệ thống của mình theo đúng bảy tiêu chí trên — gồm cả phần chưa xong.</p>
<p>Về <strong>tiêu chí 1 và 2</strong>, chúng tôi ở vị trí tương đối vững: học sinh học AI hàng tuần ngay trong các môn học chứ không tách thành môn riêng, và hơn 30 giáo viên đã tự xây dựng được công cụ, ứng dụng AI phục vụ giảng dạy. Hầu hết tư liệu và giáo án của trường hiện được soạn với sự hỗ trợ của AI.</p>
<p>Về <strong>tiêu chí 3 và 4</strong>, chúng tôi vận hành theo chu trình Plan-Do-Review — học sinh lập kế hoạch, tự làm, rồi mới nhìn lại cùng thầy cô và công cụ; riêng bậc Mầm non dùng biến thể Plan-Do-Recall. Trợ lý AI học tập được thiết kế theo hướng dẫn dắt từng bước, hiện <strong>đang thử nghiệm ở môn Toán</strong> và dự kiến hoàn thiện Toán, Tiếng Anh trong năm học 2026-2027. Tôi nói rõ đây là phần đang làm dở, chưa phủ hết các môn.</p>
<p>Về <strong>tiêu chí 5 và 6</strong>, học sinh của trường đã tự làm báo, làm video bằng AI; trong ngày hội Leadership Day có trạm AI Education nơi chính học sinh hướng dẫn lại phụ huynh cách dùng AI. Về <strong>tiêu chí 7</strong>, các báo cáo trong những kỳ họp phụ huynh và báo cáo PDR đều có phần dữ liệu và dự báo được xử lý bằng AI, thay vì chỉ là bảng điểm.</p>
<p>Điều tôi muốn phụ huynh làm không phải là tin bản tự chấm này, mà là <strong>dùng bảy câu hỏi trên để hỏi mọi ngôi trường trong danh sách của mình</strong> — bao gồm cả chúng tôi.</p>

<h2 id="ket-luan">Kết: hỏi bảy câu, đừng đọc bảy dòng brochure</h2>
<p>Trong năm học tới, mọi ngôi trường đều sẽ nói mình là trường học ứng dụng AI — và phần lớn sẽ nói thật ở mức nào đó. Việc của phụ huynh không phải là tìm trường có AI, mà là tìm trường dùng AI theo cách làm con <strong>giỏi hơn khi không có AI</strong>.</p>
<p>Bảy tiêu chí trong bài này là bộ lọc tôi tin dùng được khi đánh giá một trường học ứng dụng AI:</p>
<ul>
  <li>AI nằm trong môn học, không phải hoạt động ngoại khóa</li>
  <li>Giáo viên được đào tạo trước học sinh</li>
  <li>Có quy tắc rõ phần nào con tự làm, phần nào được dùng AI</li>
  <li>Công cụ dẫn dắt từng bước thay vì đưa đáp án</li>
  <li>Có dạy an toàn số và đạo đức AI</li>
  <li>Có sản phẩm thật của học sinh để xem</li>
  <li>Có dữ liệu tiến bộ trả về cho gia đình</li>
</ul>
<p>Hãy mang bảy tiêu chí này đi hỏi — kể cả khi bạn đang đứng trong sân trường của chúng tôi.</p>
<p>Muốn kiểm chứng bảy tiêu chí này tại một ngày học bình thường, mời <a href="/tuyen-sinh">đăng ký tham quan Trường Việt Anh và đặt câu hỏi trực tiếp với giáo viên đứng lớp</a>, hoặc đọc <a href="/blog/blog-phu-huynh-review-truong-viet-anh/">chia sẻ của phụ huynh đang có con theo học</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Trường học ứng dụng AI có làm học phí tăng cao không?</h3>
<p>Không nhất thiết. Chi phí lớn nhất của một trường học ứng dụng AI của giáo dục AI không nằm ở phần mềm — nhiều công cụ mạnh hiện miễn phí hoặc rất rẻ — mà nằm ở thời gian đào tạo giáo viên. Vì vậy hãy so sánh học phí với chất lượng đội ngũ, đừng so với số lượng thiết bị trường trưng bày.</p>
<h3>Con học trường ứng dụng AI thì có bị giảm kỹ năng viết tay, tính nhẩm không?</h3>
<p>Chỉ khi trường không có ranh giới rõ ràng. Một trường học ứng dụng AI làm nghiêm túc luôn giữ vùng bắt buộc tự làm. Trường làm nghiêm túc luôn giữ vùng "bắt buộc tự làm" cho các kỹ năng nền tảng như đọc hiểu, viết tay, tính toán cơ bản — đây chính là tiêu chí số 3 trong bài.</p>
<h3>Trường quốc tế có ứng dụng AI tốt hơn trường tư trong nước không?</h3>
<p>Không có quy luật chung. Mức học phí phản ánh cơ sở vật chất và chương trình quốc tế, không tự động phản ánh năng lực AI. Hãy dùng bảy tiêu chí trên để đánh giá từng trường cụ thể thay vì phân loại theo nhãn quốc tế hay trong nước.</p>
<h3>Học AI ở trường có giúp ích gì cho kỳ thi và xét tuyển đại học không?</h3>
<p>Gián tiếp nhưng đáng kể, nếu dùng đúng: AI giúp con phát hiện lỗ hổng kiến thức sớm và luyện tập có mục tiêu. Ngược lại, dùng sai thì phản tác dụng — đúng như số liệu điểm thi giảm 20–24% ở nhóm trẻ lệ thuộc AI.</p>
<h3>Chính sách của Bộ GD&amp;ĐT về AI trong trường phổ thông hiện thế nào?</h3>
<p>Năm học 2026-2027, ngành giáo dục chủ trương <a href="https://www.vietnamplus.vn/nam-hoc-2026-2027-khong-day-truoc-lop-1-day-manh-stem-ai-va-tieng-anh-post1129145.vnp" target="_blank" rel="noopener">đẩy mạnh STEM, AI và tiếng Anh trong trường phổ thông</a>. Nghĩa là AI sẽ dần thành nội dung phổ biến ở mọi trường; khác biệt giữa các trường sẽ nằm ở chiều sâu triển khai, không phải ở việc có hay không.</p>
<h3>Nên hỏi gì trong buổi tham quan để biết trường làm thật?</h3>
<p>Ba câu đủ dùng: "Tuần trước học sinh dùng AI trong tiết nào, làm gì?", "Cho tôi xem một sản phẩm học sinh làm cùng AI", và "Cho tôi xem trợ lý AI của trường giải một bài tập". Trường làm thật trả lời được ngay tại chỗ.</p>
<h3>Trường Việt Anh đã hoàn thiện hệ thống AI chưa?</h3>
<p>Chưa hoàn thiện, và chúng tôi nói rõ điều đó: trợ lý AI học tập mới thử nghiệm ở môn Toán, dự kiến hoàn thành thêm Tiếng Anh trong năm học này, các môn khác còn đang xây dựng. Phần đã vững là đội ngũ giáo viên và việc AI đã nằm trong nhịp học hàng tuần.</p>

<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (TP.HCM), hệ thống trường liên cấp từ Mầm non đến THPT theo định hướng AI-Powered School. Nguồn: CEPR Discussion Paper DP21577 (Strömberg, Lei &amp; Wu); UNESCO AI Competency Framework for Students; VietnamPlus về chủ trương năm học 2026-2027 của Bộ GD&amp;ĐT.</em></p>
`.trim();

const post = {
  title: "Trường học ứng dụng AI: 7 tiêu chí phụ huynh cần hỏi",
  slug: "truong-hoc-ung-dung-ai-tieu-chi-danh-gia",
  status: 'published',
  excerpt: "Trường học ứng dụng AI kiểu nào là thật? 7 tiêu chí và bộ câu hỏi giúp phụ huynh phân biệt trường làm thật với trường chỉ dán nhãn AI trên brochure.",
  content,
  published_at: "2026-08-20T14:00:00",
  category: "tuyen-sinh",
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
