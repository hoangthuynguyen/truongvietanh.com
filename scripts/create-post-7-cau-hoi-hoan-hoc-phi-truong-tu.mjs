/**
 * Bài 3 cụm chi phí — "Chính sách hoàn học phí trường tư: 7 câu hỏi phải hỏi trước khi đóng tiền".
 * Bài category-level, cố ý KHÔNG nêu tên trường nào khác (lưu ý biên tập của tác giả).
 * Chạy: node --env-file=.env scripts/create-post-7-cau-hoi-hoan-hoc-phi-truong-tu.mjs   (thêm --update)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Câu trả lời thẳng thắn: rất ít. Thông lệ phổ biến trong ngành giáo dục tư thục Việt Nam là học phí đã đóng không hoàn lại sau khi ghi danh, hoặc chỉ hoàn theo tỷ lệ kèm điều kiện báo trước nhiều tháng. Điều đó có nghĩa gia đình phải trả trước cả trăm triệu đồng cho một lời hứa chưa được kiểm chứng, và nếu chọn sai, phần thiệt gần như thuộc về phụ huynh.</p>

<p>Bài viết này không nhằm chê trường nào. Nó đưa cho anh chị bảy câu hỏi cụ thể để hỏi bất kỳ ngôi trường nào — kể cả Trường Việt Anh — trước khi đặt bút ký thỏa ước nhập học. Câu trả lời của trường cho bảy câu này nói rất nhiều về mức độ tự tin của họ vào chất lượng của chính mình.</p>

<h2 id="vi-sao-quan-trong">Vì sao câu hỏi về hoàn phí lại quan trọng đến vậy?</h2>
<p>Chọn trường cho con là một trong những quyết định tốn kém và khó đảo ngược nhất mà cha mẹ phải ra. Khác với mua một món hàng, gia đình không thể "dùng thử" một ngôi trường: học phí đóng trước cả năm, còn kết quả thì phải vài tháng sau mới thấy. Nếu chọn sai, gia đình mất hai thứ cùng lúc — tiền, và một năm học của con vốn chỉ diễn ra đúng một lần.</p>
<p>Từ tháng 7/2024, Luật Bảo vệ quyền lợi người tiêu dùng 2023 có hiệu lực, siết chặt hơn các điều khoản mẫu bất lợi cho người tiêu dùng. Nhưng trên thực tế, phần lớn phụ huynh vẫn ký thỏa ước nhập học mà chưa đọc kỹ phần điều khoản phí. Bảy câu hỏi dưới đây là cách nhanh nhất để đọc kỹ phần ấy.</p>

<h2 id="7-cau-hoi">7 câu hỏi phải hỏi trước khi đóng học phí</h2>
<ol>
  <li><strong>Nếu sau vài tuần gia đình thấy không phù hợp, trường có hoàn học phí không? Hoàn bao nhiêu phần trăm?</strong> Đây là câu hỏi gốc. Hãy nghe kỹ: "có xem xét", "tùy trường hợp", "sẽ trình ban giám hiệu" đều không phải là "có". Câu trả lời đáng tin phải là một con số và một mốc thời gian.</li>
  <li><strong>Điều khoản hoàn phí nằm ở đâu trong văn bản?</strong> Yêu cầu được xem đúng dòng chữ trong thỏa ước hoặc trong một quyết định có số hiệu, có chữ ký và con dấu. Lời hứa miệng của tư vấn viên không có giá trị khi phát sinh tranh chấp.</li>
  <li><strong>Ngoài học phí, trường có hoàn phí cơ sở vật chất và phí bản quyền chương trình không?</strong> Nhiều nơi hoàn học phí nhưng giữ lại phí cơ sở vật chất, phí ghi danh, phí bản quyền chương trình quốc tế — cộng lại có thể lên tới hàng chục triệu đồng. Hỏi rõ từng khoản.</li>
  <li><strong>Thủ tục gồm những bước gì, mất bao lâu?</strong> Số bước thủ tục cho biết mức độ thật của cam kết. Một quy trình yêu cầu đơn từ, xác nhận nhiều cấp, họp xét duyệt và không cam kết thời hạn chi trả là một quy trình được thiết kế để phụ huynh bỏ cuộc giữa chừng.</li>
  <li><strong>Gia đình có phải giải thích lý do không?</strong> Nếu phải giải thích, thì ai là người quyết định lý do ấy có "chính đáng" hay không? Câu trả lời gần như luôn là: chính nhà trường. Đó không còn là cam kết nữa mà là sự xin phép.</li>
  <li><strong>Trong năm học có phát sinh khoản thu bắt buộc nào ngoài bảng phí đã công bố không?</strong> Đây là nơi các khoản chi ẩn thường xuất hiện. Hỏi trường có cam kết bằng văn bản về việc không phát sinh chi phí bắt buộc trong năm hay không.</li>
  <li><strong>Nếu gia đình chuyển trường, trường có bàn giao hồ sơ và hỗ trợ thủ tục không?</strong> Một ngôi trường tự tin sẽ hỗ trợ gia đình ra đi tử tế. Việc gây khó dễ về hồ sơ học bạ là dấu hiệu cảnh báo rõ ràng nhất.</li>
</ol>
<p><strong>Mẹo thực tế:</strong> In bảy câu này ra giấy và mang theo buổi tư vấn. Ghi lại câu trả lời của từng trường vào cùng một tờ. Khi đặt cạnh nhau, sự khác biệt giữa các trường hiện ra rất nhanh — thường rõ hơn cả sự khác biệt về cơ sở vật chất.</p>

<h2 id="viet-anh-tra-loi">Trường Việt Anh trả lời bảy câu hỏi này như thế nào</h2>
<p>Chúng tôi đưa ra bộ câu hỏi trên thì cũng phải tự trả lời trước. Toàn bộ nội dung dưới đây được quy định tại Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026 về Chính sách "Cam kết Giá trị 4 Tuần", <a href="/blog/truong-viet-anh-co-tra-lai-hoc-phi-khong/#toan-van-quyet-dinh">đăng công khai toàn văn trên website nhà trường</a>.</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Câu hỏi</th><th>Trả lời của Trường Việt Anh</th></tr>
  </thead>
  <tbody>
    <tr><td>1. Có hoàn không, bao nhiêu?</td><td>Hoàn 100%, trong 4 tuần lễ đầu năm học</td></tr>
    <tr><td>2. Nằm ở đâu trong văn bản?</td><td>Quyết định 0728.1/2026/QĐ-MAJOR, có số hiệu, chữ ký, con dấu, đăng công khai</td></tr>
    <tr><td>3. Có hoàn phí CSVC và bản quyền không?</td><td>Có — hoàn cả phí cơ sở vật chất và phí bản quyền Oxford (OIC)</td></tr>
    <tr><td>4. Thủ tục và thời hạn?</td><td>Báo với chuyên viên chăm sóc học sinh, ký xác nhận; hoàn trong 07 ngày làm việc</td></tr>
    <tr><td>5. Có phải giải thích lý do?</td><td>Không. Không nộp đơn, không nêu lý do</td></tr>
    <tr><td>6. Có phát sinh thu bắt buộc trong năm?</td><td>Không — cam kết bằng văn bản</td></tr>
    <tr><td>7. Có hỗ trợ chuyển trường?</td><td>Có — bàn giao đầy đủ hồ sơ và hỗ trợ thủ tục</td></tr>
  </tbody>
</table>
</div>
<p>Điều kiện duy nhất: học sinh đi học đầy đủ trong 4 tuần lễ đầu. Các khoản không hoàn gồm tiền ăn, phí nội trú, đồng phục và đồ dùng đã sử dụng — tức những gì con đã thực sự tiêu dùng.</p>

<h2 id="vi-sao-lam-nguoc-thong-le">Vì sao chúng tôi chọn làm ngược thông lệ</h2>
<p>Thẳng thắn mà nói, chính sách "học phí không hoàn lại" có lý do tồn tại của nó: trường phải cam kết ngân sách giáo viên, cơ sở vật chất và chương trình cho cả năm học ngay từ đầu năm. Đó là lập luận hợp lý, không phải ngụy biện.</p>
<p>Nhưng lập luận ấy chuyển toàn bộ rủi ro sang phía gia đình — bên có ít thông tin nhất về chất lượng thật của ngôi trường. Chúng tôi cho rằng bên nào nắm rõ chất lượng của mình hơn thì bên đó nên gánh rủi ro. Nếu Việt Anh tin vào 28 ngày Học kỳ Foundation, vào sĩ số tối đa 24 học sinh mỗi lớp, vào 9–11 tiết tiếng Anh mỗi tuần với 6 tiết giáo viên nước ngoài — thì Việt Anh phải là bên dám đặt cược, chứ không phải phụ huynh.</p>
<blockquote>"Tôi không mong mọi trường đều làm giống chúng tôi. Nhưng tôi mong mọi phụ huynh đều hỏi bảy câu này. Chỉ riêng việc phụ huynh bắt đầu hỏi thôi đã đủ để cả ngành phải minh bạch hơn."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="ba-dau-hieu-canh-bao">Ba dấu hiệu cảnh báo khi nghe tư vấn tuyển sinh</h2>
<p>Ngoài bảy câu hỏi, có ba dấu hiệu đáng để anh chị dừng lại suy nghĩ. Thứ nhất, tư vấn viên hứa miệng nhưng không cho xem văn bản — lời hứa không có số hiệu thì không tồn tại khi cần đến. Thứ hai, chính sách hoàn phí được diễn đạt mơ hồ bằng những cụm như "tùy từng trường hợp cụ thể", "nhà trường sẽ xem xét thiện chí" — mơ hồ luôn nghiêng về phía người soạn văn bản. Thứ ba, trường thúc ép đóng tiền gấp để "giữ chỗ" kèm ưu đãi có hạn, trong khi từ chối trả lời rõ về điều khoản hoàn phí — áp lực thời gian là công cụ khiến người ta ký mà chưa đọc.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<div class="faq-block">
<h3>Trường tư có bắt buộc phải hoàn học phí không?</h3>
<p>Pháp luật hiện hành không buộc trường tư phải hoàn học phí theo một mức cố định; điều này do thỏa ước giữa nhà trường và phụ huynh quy định. Tuy nhiên Luật Bảo vệ quyền lợi người tiêu dùng 2023 siết chặt các điều khoản mẫu bất lợi cho người tiêu dùng, nên phụ huynh cần đọc kỹ và yêu cầu làm rõ trước khi ký.</p>
<h3>Tôi nên hỏi ai trong trường về chính sách hoàn phí?</h3>
<p>Hỏi phòng tuyển sinh, nhưng yêu cầu được xem văn bản có số hiệu và chữ ký, không chỉ nghe giải thích miệng.</p>
<h3>Trường Việt Anh hoàn học phí trong bao lâu?</h3>
<p>07 ngày làm việc kể từ ngày tiếp nhận thông báo, theo Quyết định 0728.1/2026/QĐ-MAJOR.</p>
<h3>Nếu trường từ chối hoàn phí dù đã hứa, tôi làm gì?</h3>
<p>Trước hết đề nghị nhà trường trả lời bằng văn bản, viện dẫn đúng điều khoản trong thỏa ước. Nếu không đạt kết quả, phụ huynh có thể khiếu nại tới cơ quan quản lý giáo dục địa phương hoặc cơ quan bảo vệ quyền lợi người tiêu dùng. Với Trường Việt Anh, phụ huynh có thể gửi phản ánh qua <a href="/khieu-nai">kênh khiếu nại chính thức</a> của nhà trường.</p>
<h3>Phí giữ chỗ có được hoàn không?</h3>
<p>Tùy từng trường — đây chính là khoản cần hỏi rõ ở câu hỏi số 3 trong danh sách trên, trước khi chuyển tiền.</p>
</div>

<h2 id="buoc-tiep-theo">Bước tiếp theo</h2>
<p>Anh chị hãy mang bảy câu hỏi này đi hỏi mọi ngôi trường đang cân nhắc — và hỏi cả Việt Anh. Chúng tôi trả lời bằng văn bản có số hiệu, và mời gia đình đến kiểm chứng trong 28 ngày đầu tiên mà không phải đánh cược.</p>
<p><a href="/squeeze/checklist-chon-truong">Tải danh mục kiểm tra chọn trường (PDF miễn phí)</a> · <a href="/dat-lich-tham-quan">Đăng ký tham quan trường &amp; tìm hiểu Cam kết Giá trị 4 Tuần</a> · <a href="/blog/truong-viet-anh-co-tra-lai-hoc-phi-khong/">Trường Việt Anh có trả lại học phí không?</a></p>
<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh. Nguồn: Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026; Luật Bảo vệ quyền lợi người tiêu dùng 2023 (hiệu lực 01/7/2024).</em></p>
`.trim();

const post = {
  title: 'Trường tư nào tại TP.HCM hoàn học phí nếu phụ huynh không hài lòng? 7 câu hỏi phải hỏi trước khi đóng tiền',
  slug: 'chinh-sach-hoan-hoc-phi-truong-tu-tphcm',
  status: 'published',
  excerpt: 'Trường tư nào tại TP.HCM hoàn học phí nếu phụ huynh không hài lòng? 7 câu hỏi giúp gia đình kiểm tra chính sách hoàn phí của bất kỳ trường nào trước khi ký.',
  content,
  published_at: '2026-08-02T09:00:00',
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
