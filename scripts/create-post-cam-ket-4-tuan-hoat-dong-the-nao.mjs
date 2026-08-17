/**
 * Bài 2 cụm chi phí — "Cam kết hoàn học phí 4 tuần hoạt động thế nào?".
 * Bài giải thích QUY TRÌNH, nối trực tiếp bài 1. Bài 3, 4 sẽ trỏ ngược về đây.
 * Chạy: node --env-file=.env scripts/create-post-cam-ket-4-tuan-hoat-dong-the-nao.mjs   (thêm --update)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p>Quy trình gọn trong ba bước: phụ huynh báo với chuyên viên chăm sóc học sinh của lớp — không cần nộp đơn, không cần nêu lý do; chuyên viên có thể mời phụ huynh ký xác nhận nội dung đã trao đổi; nhà trường hoàn tất việc hoàn phí trong 07 ngày làm việc. Điều kiện duy nhất: học sinh đi học đầy đủ trong 04 tuần lễ đầu năm học.</p>

<p>Toàn bộ nội dung này được quy định tại <a href="/chinh-sach#cam-ket-4-tuan">Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026</a> của Công ty CP Giáo dục Major về việc ban hành Chính sách "Cam kết Giá trị 4 Tuần", đăng công khai trên website nhà trường. Bài viết dưới đây giải thích từng bước để phụ huynh nắm rõ trước khi ghi danh cho con.</p>

<h2 id="ba-buoc">Ba bước, và không có bước thứ tư</h2>
<p><strong>Bước 1 — Báo với chuyên viên chăm sóc học sinh.</strong> Mỗi lớp tại Việt Anh có một chuyên viên chăm sóc học sinh phụ trách, là người phụ huynh đã liên lạc hằng ngày từ đầu năm học. Phụ huynh chỉ cần nói với chuyên viên rằng gia đình muốn dừng lại và nhận hoàn phí. Gọi điện, nhắn tin hay gặp trực tiếp đều được. Không có mẫu đơn phải điền, không có ô "lý do" phải viết.</p>
<p><strong>Bước 2 — Ký xác nhận nội dung đã trao đổi.</strong> Chuyên viên có thể đề nghị phụ huynh ký xác nhận những gì hai bên đã trao đổi. Đây không phải là đơn xin, cũng không phải thủ tục xét duyệt — chỉ là căn cứ để bộ phận kế toán thực hiện việc chuyển tiền và để nhà trường lưu hồ sơ. Toàn bộ việc này diễn ra trong một lần gặp.</p>
<p><strong>Bước 3 — Nhận tiền trong 07 ngày làm việc.</strong> Nhà trường hoàn tất việc hoàn phí trong 07 ngày làm việc kể từ ngày tiếp nhận thông báo, chuyển khoản vào tài khoản phụ huynh đăng ký. Cùng lúc, nhà trường bàn giao đầy đủ hồ sơ và hỗ trợ gia đình hoàn tất các thủ tục chuyển trường cho con.</p>
<p>Không có bước thứ tư. Không có cuộc họp thuyết phục gia đình ở lại, không có hội đồng xét duyệt, không có yêu cầu chứng minh "con không tiến bộ".</p>

<h2 id="hoan-khoan-nao">Hoàn những khoản nào, không hoàn khoản nào?</h2>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Hoàn lại 100%</th><th>Không hoàn lại</th></tr>
  </thead>
  <tbody>
    <tr><td>Học phí năm học đã đóng</td><td>Tiền ăn</td></tr>
    <tr><td>Phí cơ sở vật chất</td><td>Phí nội trú</td></tr>
    <tr><td>Phí bản quyền chương trình Oxford International Curriculum (OIC)</td><td>Đồng phục, đồ dùng học tập đã sử dụng hoặc đã bàn giao</td></tr>
  </tbody>
</table>
</div>
<p>Nguyên tắc phân định rất đơn giản và phụ huynh có thể tự kiểm chứng: những gì thuộc về cam kết giáo dục của nhà trường thì hoàn đủ; những gì con đã thực sự tiêu dùng thì không hoàn. Con đã ăn những bữa cơm ấy, đã ngủ ở ký túc xá những đêm ấy, đã mặc bộ đồng phục ấy — đó là chi phí thật đã phát sinh. Còn học phí, phí cơ sở vật chất và phí bản quyền chương trình là tiền gia đình trả cho lời hứa về giá trị giáo dục; nếu lời hứa ấy chưa được cảm nhận, tiền quay về với gia đình.</p>
<p>Đáng chú ý ở khoản thứ ba: phí bản quyền Oxford International Curriculum là 20.000.000 đồng/năm cho lớp OIC, và đây là khoản nhà trường đã trả cho đối tác. Nhà trường vẫn hoàn lại đủ cho phụ huynh. Chi tiết từng khoản có trong <a href="/hoc-phi">bảng học phí năm học 2026–2027</a>.</p>

<h2 id="di-hoc-day-du">"Đi học đầy đủ" — vì sao đây là điều kiện duy nhất?</h2>
<p>Bốn tuần đầu tiên của mỗi năm học tại Việt Anh không phải là bốn tuần học bình thường. Đó là <strong>Học kỳ Foundation</strong> — 28 ngày nền tảng bắt buộc với mọi học sinh, gồm năm nội dung lõi: giáo dục xã hội – cảm xúc (SEL), xây dựng văn hóa lớp và văn hóa trường, xây dựng môi trường học tập, phân công vai trò lãnh đạo cho từng em, và phát triển kỹ năng học tập kèm định hướng môn. Học kỳ kết thúc bằng chuyến dã ngoại hai ngày một đêm.</p>
<p>Đây là 28 ngày đậm đặc "chất Việt Anh" nhất trong cả năm học. Một học sinh đi trọn 28 ngày ấy sẽ có đủ trải nghiệm để gia đình đánh giá: con có được lắng nghe không, con có vai trò gì trong lớp, con kể gì về thầy cô mỗi tối. Ngược lại, một học sinh nghỉ quá nhiều buổi thì cả gia đình lẫn nhà trường đều không có dữ liệu thật để kết luận điều gì.</p>
<p>Vì vậy điều kiện chuyên cần không phải là rào cản kỹ thuật để nhà trường từ chối hoàn tiền. Nó là điều kiện để phép thử có ý nghĩa. Ngoài điều kiện này, Quyết định ghi rõ nhà trường không yêu cầu phụ huynh giải thích lý do và không đặt thêm bất kỳ điều kiện nào khác.</p>
<blockquote>"Chúng tôi cố tình thiết kế quy trình chỉ có ba bước và một điều kiện. Mỗi thủ tục thêm vào là một cách nói ngầm rằng chúng tôi không thực sự muốn trả lại tiền. Nếu đã cam kết, thì phải cam kết cho gọn."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="vi-sao-bo-mau-don">Vì sao nhà trường bỏ luôn cả mẫu đơn?</h2>
<p>Trong hầu hết các quy trình hoàn tiền, tờ đơn không tồn tại vì lý do hành chính. Nó tồn tại như một bộ lọc: mỗi ô trống phải điền, mỗi chữ ký phải xin, mỗi ngày chờ xét duyệt đều làm giảm số người đi đến cuối quy trình. Đó là thiết kế phổ biến, và nó hiệu quả — theo hướng bất lợi cho người tiêu dùng.</p>
<p>Việt Anh chọn bỏ bộ lọc đó. Phụ huynh không phải trình bày với người lạ ở phòng hành chính mà nói chuyện với chính chuyên viên đã đồng hành cùng gia đình từ đầu năm. Việc ký xác nhận diễn ra sau khi đã trao đổi xong, không phải trước.</p>
<p>Chúng tôi hiểu điều này đồng nghĩa với việc một số gia đình sẽ rời đi dễ dàng hơn. Nhưng nếu một ngôi trường phải giữ chân phụ huynh bằng thủ tục thay vì bằng chất lượng, thì việc giữ chân ấy cũng không kéo dài được bao lâu.</p>

<h2 id="neu-o-lai">Nếu gia đình quyết định ở lại thì sao?</h2>
<p>Không cần làm gì cả. Sau khi hết thời hạn 4 tuần, năm học tiếp tục bình thường và áp dụng chính sách phí thông thường đã công bố trong thỏa ước nhập học — trong đó nhà trường cam kết không phát sinh chi phí bắt buộc trong năm học, và mọi thay đổi học phí hằng năm đều được công bố minh bạch trước.</p>
<p>Phần lớn các gia đình sẽ ở lại. Điều đó không đến từ chính sách hoàn phí, mà đến từ những thứ diễn ra trong 28 ngày ấy: sĩ số tối đa 24 học sinh mỗi lớp, 9–11 tiết tiếng Anh mỗi tuần trong đó 6 tiết với giáo viên nước ngoài, chương trình kỹ năng bám khung 16 kỹ năng thế kỷ 21 của Diễn đàn Kinh tế Thế giới, và thể thao mỗi ngày sau giờ học. Chính sách hoàn phí chỉ là lời mời để gia đình đến kiểm chứng những điều đó mà không phải đánh cược.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<div class="faq-block">
<h3>Tôi phải nộp đơn ở đâu để được hoàn học phí?</h3>
<p>Không cần nộp đơn. Phụ huynh chỉ cần liên hệ thông báo với chuyên viên chăm sóc học sinh của lớp. Chuyên viên có thể mời phụ huynh ký xác nhận nội dung đã trao đổi để làm căn cứ thực hiện.</p>
<h3>Bao lâu nhà trường hoàn tiền?</h3>
<p>Trong 07 ngày làm việc kể từ ngày tiếp nhận thông báo, theo Điều 5 Quyết định 0728.1/2026/QĐ-MAJOR.</p>
<h3>Phí bản quyền Oxford (OIC) có được hoàn không?</h3>
<p>Có. Phí bản quyền chương trình Oxford International Curriculum được hoàn 100%, cùng với học phí và phí cơ sở vật chất.</p>
<h3>Tiền ăn và phí nội trú có được hoàn không?</h3>
<p>Không. Tiền ăn, phí nội trú, đồng phục và đồ dùng học tập đã sử dụng hoặc đã bàn giao cho học sinh không thuộc phạm vi hoàn lại.</p>
<h3>Nhà trường có hỏi lý do vì sao gia đình muốn dừng không?</h3>
<p>Không. Quyết định ghi rõ nhà trường không yêu cầu phụ huynh giải thích lý do và không đặt thêm bất kỳ điều kiện nào khác.</p>
<h3>Con tôi chuyển trường có được hỗ trợ hồ sơ không?</h3>
<p>Có. Nhà trường bàn giao đầy đủ hồ sơ và hỗ trợ phụ huynh hoàn tất các thủ tục chuyển trường cho con. Nếu có vướng mắc, phụ huynh gửi phản ánh qua <a href="/khieu-nai">kênh khiếu nại chính thức</a> của nhà trường.</p>
<h3>Học kỳ Foundation là gì?</h3>
<p>Là chương trình nền tảng bắt buộc 28 ngày đầu mỗi năm học tại Việt Anh, gồm giáo dục xã hội – cảm xúc, xây dựng văn hóa lớp và trường, xây dựng môi trường học tập, phân công vai trò lãnh đạo, phát triển kỹ năng học tập, kết thúc bằng chuyến dã ngoại hai ngày một đêm.</p>
</div>

<!-- ĐỪNG đặt tiêu đề mục này là đúng chữ "Bước tiếp theo": cleanContent trong
     src/pages/blog/[slug].astro xoá thẻ h2 đó VÀ toàn bộ nội dung phía sau nó. -->
<h2 id="viec-nen-lam-tiep">Việc anh chị nên làm tiếp theo</h2>
<p>Nếu anh chị đang cân nhắc Việt Anh cho con, việc cần làm không phải là đọc thêm bài viết, mà là đến xem trường và gặp chuyên viên chăm sóc học sinh — chính người anh chị sẽ liên lạc suốt năm học, và cũng chính là người anh chị sẽ báo nếu muốn dừng lại.</p>
<p><a href="/dat-lich-tham-quan">Đăng ký tham quan trường &amp; giữ chỗ trải nghiệm 4 tuần có bảo chứng hoàn phí</a> · <a href="/chinh-sach#cam-ket-4-tuan">Đọc toàn văn Quyết định 0728.1/2026/QĐ-MAJOR</a> · <a href="/blog/truong-viet-anh-co-tra-lai-hoc-phi-khong/">Trường Việt Anh có trả lại học phí không?</a></p>
<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (Major Education, thành lập 2011). Nguồn: Quyết định số 0728.1/2026/QĐ-MAJOR ngày 29/7/2026; Chính sách Sản phẩm &amp; Dịch vụ 2026–2027; WEF New Vision for Education.</em></p>
`.trim();

const post = {
  title: 'Cam kết hoàn học phí 4 tuần hoạt động thế nào? Một điều kiện duy nhất: con đi học đầy đủ',
  slug: 'cam-ket-hoan-hoc-phi-4-tuan-hoat-dong-the-nao',
  status: 'published',
  excerpt: 'Không cần nộp đơn, không cần nêu lý do. Chỉ cần báo với chuyên viên chăm sóc học sinh, nhà trường hoàn 100% học phí trong 07 ngày làm việc. Quy trình chi tiết.',
  content,
  published_at: '2026-08-01T09:00:00',
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
