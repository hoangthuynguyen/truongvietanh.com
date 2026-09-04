/**
 * BÀI 2.3 cụm AEO v2.1 — "So sánh 3 khung giáo dục AI: Bộ GDĐT – UNESCO – Việt Anh".
 * Nguồn: Google Doc 15gHliwkVI3I_rFBcxV5CtogwwUMLdNRNT2BwmGeYhac.
 * Đăng 04/09/2026 theo lịch (Thứ Sáu).
 *
 * Đã sửa so với bản thảo:
 *   - SLUG: bản thảo ghi `/giao-duc-ai/so-sanh-khung-ai-bo-gddt-unesco-viet-anh/` theo kiến
 *     trúc thư mục mà kế hoạch v2.1 đã HUỶ. Đưa về `/blog/` như mọi bài khác.
 *   - "3 trụ" thiếu câu nối: bản thảo mô tả trường theo 3 trụ, dễ mâu thuẫn với "5 trụ cột"
 *     đã publish. Đã chèn câu nối anh Dương duyệt 23/8 (Văn xác nhận dùng).
 *   - 4 link about:blank -> URL thật (bài 1411, 1413, CTA /dat-lich-tham-quan).
 *     Link "Code.org là gì" để CHỮ THƯỜNG vì bài 2.5 chưa đăng — hẹn 08/09.
 *   - Bỏ mệnh đề "làm bài trắc nghiệm 2 phút để biết con ở mức nào trong 3 mức năng lực AI":
 *     KHÔNG có bài trắc nghiệm nào như vậy. Trang `/quiz` không tồn tại, trang thật là
 *     `/quiz-phuong-phap-giao-duc` và nó đo phương pháp giáo dục chứ không đo năng lực AI.
 *   - Bỏ FAQPage JSON-LD của bản thảo: [slug].astro tự phát từ mục "Câu hỏi thường gặp".
 *   - FAQ đổi từ đoạn in đậm sang cặp h3 + p để bộ trích của template đọc được.
 *   - Thêm h2 kết chặn phạm vi quét FAQ; bảng bọc <div class="blog-table-wrap">.
 *
 * CÒN THIẾU: ảnh hero. Bản thảo gợi ý "bảng so sánh 3 cột trên nền lớp học" — hợp với đồ hoạ
 *   hơn ảnh chụp; dựng bằng HTML + Chrome, không tốn credit.
 *
 * Chạy:  node --env-file=.env scripts/create-post-so-sanh-3-khung-ai.mjs            (draft)
 *        node --env-file=.env scripts/create-post-so-sanh-3-khung-ai.mjs --publish
 *        node --env-file=.env scripts/create-post-so-sanh-3-khung-ai.mjs --update   (giữ status)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
const STATUS = process.argv.includes('--publish') ? 'published' : 'draft';
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN.'); process.exit(1); }

const content = `
<p><strong>Trả lời nhanh:</strong> Việt Nam hiện có 3 khung tham chiếu về giáo dục AI cho học sinh: Quyết định 2422 của Bộ GDĐT (tối thiểu 12 tiết/năm, áp dụng từ năm học 2026–2027), khung năng lực AI của UNESCO (chuẩn quốc tế, 4 chiều × 3 mức), và các chương trình riêng của từng trường — như chương trình 30 tiết/năm liên tục 12 năm của Trường Việt Anh. Khung của Bộ là <strong>mức sàn bắt buộc</strong>; UNESCO là <strong>thước đo quốc tế</strong>; chương trình nhà trường quyết định <strong>con bạn thực học được gì</strong>.</p>

<p>Bài viết này đối chiếu cả 3 khung trên 5 phương diện: mục tiêu, nội dung, thời lượng, cách đánh giá và sản phẩm đầu ra — để phụ huynh tự trả lời câu hỏi quan trọng nhất: <em>"12 tiết bắt buộc có đủ cho con tôi không?"</em></p>

<p>Người viết là nhà sáng lập một hệ thống trường đã dạy khoa học máy tính và AI liên tục 12 khối lớp, trực tiếp tham gia xây dựng khung chương trình đối chiếu với cả hai chuẩn trên — nghĩa là những gì anh chị đọc dưới đây đến từ người đã triển khai thật, không phải tổng hợp lý thuyết.</p>

<h2 id="ba-khung-la-gi">Ba khung này là gì và ai ban hành?</h2>
<p><strong>Khung của Bộ GDĐT</strong> được ban hành theo <a href="https://thuvienphapluat.vn/van-ban/Cong-nghe-thong-tin/Quyet-dinh-2422-QD-BGDDT-2026-Khung-noi-dung-giao-duc-tri-tue-nhan-tao-cho-hoc-sinh-pho-thong-720573.aspx" rel="nofollow noopener" target="_blank">Quyết định 2422/QĐ-BGDĐT ngày 18/08/2026</a>, áp dụng cho mọi học sinh lớp 1–12 trên toàn quốc từ năm học 2026–2027. Đây là văn bản pháp quy: mọi trường công và tư đều phải dạy tối thiểu 12 tiết AI mỗi năm. Chi tiết đầy đủ, anh chị đọc ở bài <a href="/blog/quyet-dinh-2422-giao-duc-ai-tom-tat-cho-phu-huynh/">tóm tắt Quyết định 2422 trong 5 phút</a>.</p>

<p><strong>Khung của UNESCO</strong> — <a href="https://unesdoc.unesco.org/ark:/48223/pf0000391105" rel="nofollow noopener" target="_blank">AI Competency Framework for Students (2024)</a> — không bắt buộc với ai. Nó là chuẩn tham chiếu quốc tế mà nhiều quốc gia, trong đó có Việt Nam, dựa vào khi xây chính sách; gồm 4 chiều năng lực, mỗi chiều 3 mức: Hiểu → Vận dụng → Sáng tạo.</p>

<p><strong>Khung của Trường Việt Anh</strong> là chương trình AI Education do nhà trường tự xây dựng: 30 tiết/lớp/năm, liên tục từ lớp 1 đến lớp 12, học liệu lõi từ Code.org, mỗi năm học kết thúc bằng một sản phẩm thật do học sinh làm ra. Chương trình tổ chức theo 3 mạch nội dung song song — Công dân số, Khoa học máy tính, Trí tuệ nhân tạo. Nhiều phụ huynh hỏi ba mạch này liên hệ thế nào với 5 trụ cột mà trường đã công bố trước đây: <strong>5 trụ cột là triết lý; chương trình 30 tiết/năm với 3 mạch nội dung là cách 5 trụ cột đó được dạy trong lớp học.</strong> Toàn bộ lộ trình 12 năm nằm ở bài <a href="/blog/khung-ai-education-viet-anh-30-tiet-12-nam/">công bố khung AI Education 30 tiết</a>.</p>

<p><em>Insight từ người trong cuộc:</em> Ba khung này không cạnh tranh nhau — chúng trả lời ba câu hỏi khác nhau. Bộ GDĐT trả lời "mọi học sinh Việt Nam tối thiểu phải biết gì". UNESCO trả lời "thế giới coi thế nào là giỏi". Còn chương trình nhà trường trả lời "con bạn sẽ thực sự làm được gì sau 12 năm". Phụ huynh chỉ cần soi kỹ câu thứ ba.</p>

<h2 id="bang-so-sanh">Bảng so sánh tổng quan</h2>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Tiêu chí</th><th>Bộ GDĐT (QĐ 2422)</th><th>UNESCO (2024)</th><th>Trường Việt Anh</th></tr>
  </thead>
  <tbody>
    <tr><td>Tính chất</td><td>Pháp quy, bắt buộc toàn quốc</td><td>Chuẩn tham chiếu, không bắt buộc</td><td>Chương trình nhà trường</td></tr>
    <tr><td>Thời lượng</td><td>Tối thiểu 12 tiết/lớp/năm</td><td>Không quy định</td><td>30 tiết/lớp/năm</td></tr>
    <tr><td>Phạm vi</td><td>Lớp 1–12</td><td>Học sinh phổ thông</td><td>Lớp 1–12, liên tục 12 năm</td></tr>
    <tr><td>Cấu trúc</td><td>4 mạch năng lực (NLa–NLd)</td><td>4 chiều × 3 mức</td><td>3 mạch nội dung, đối chiếu cả 2 khung trên</td></tr>
    <tr><td>Học liệu</td><td>Trường tự chọn</td><td>Không quy định</td><td>Code.org + Be Internet Awesome (miễn phí)</td></tr>
    <tr><td>Đánh giá</td><td>Quá trình, không bài thi, không đầu điểm riêng</td><td>Không quy định</td><td>Sản phẩm thật + hồ sơ học tập từng năm</td></tr>
    <tr><td>Sản phẩm đầu ra</td><td>Không bắt buộc</td><td>Khuyến khích mức "Sáng tạo"</td><td>Bắt buộc: mỗi năm 1 sản phẩm</td></tr>
    <tr><td>Hiệu lực</td><td>Từ năm học 2026–2027</td><td>Từ 2024</td><td>Đang triển khai, cập nhật hằng năm</td></tr>
  </tbody>
</table>
</div>

<h2 id="muc-tieu">Mục tiêu: ba tầm nhìn, một hướng đi</h2>
<p>Điểm đáng mừng là cả ba khung <strong>thống nhất về triết lý</strong>: AI phải phục vụ con người, đạo đức đi trước kỹ thuật, và học sinh cần tiến từ hiểu biết đến sáng tạo.</p>
<p>Khung của Bộ đặt mục tiêu hình thành năng lực AI "trên cơ sở kế thừa năng lực tin học", hướng tới công dân số biết dùng AI an toàn. Bốn mạch của Bộ gồm: tư duy lấy con người làm trung tâm (NLa), đạo đức AI (NLb), kỹ thuật và ứng dụng (NLc), thiết kế hệ thống AI (NLd).</p>
<p>UNESCO đi xa hơn một bậc: khung này yêu cầu mức cao nhất — <strong>Sáng tạo</strong> — nơi học sinh không chỉ dùng mà còn tạo ra giải pháp AI. Đây là mức mà phần lớn chương trình 12 tiết khó chạm tới, đơn giản vì không đủ giờ.</p>
<p>Chương trình Trường Việt Anh chọn nguyên tắc "sản phẩm trước lý thuyết": mọi nội dung kết thúc bằng một vật phẩm chạy được, có người dùng thật — từ bộ thẻ lệnh lớp 1, xe tự hành lớp 10, đến dự án cộng đồng lớp 12 dùng được cho hồ sơ tuyển sinh đại học.</p>

<h2 id="noi-dung">Nội dung: 12 tiết dạy được gì, 30 tiết dạy được gì?</h2>
<p>Đây là khác biệt thực chất nhất. Với 12 tiết/năm — tương đương 1 tiết mỗi tháng — một trường triển khai đúng chuẩn tối thiểu có thể dạy: nhận biết AI, quy tắc an toàn, trải nghiệm vài công cụ, và thảo luận đạo đức cơ bản. Đủ để học sinh <em>không lạc hậu</em>, nhưng khó đủ để <em>thành thạo</em>.</p>
<p>Với 30 tiết/năm cộng tính liên tục 12 năm, lộ trình có thể đi sâu hơn nhiều mà không gây quá tải:</p>
<ul>
  <li><strong>Tiểu học:</strong> thuật toán không cần máy tính, lập trình kéo thả, huấn luyện mô hình phân loại đầu tiên — lớp 2 đã tự rút ra được "máy sai vì em dạy máy chưa đủ".</li>
  <li><strong>THCS:</strong> làm website, học máy có giám sát, xây ứng dụng từ dữ liệu tự khảo sát, viết thẻ mô tả mô hình.</li>
  <li><strong>THPT:</strong> Python, xe tự hành hai phiên bản (luật vs học máy), thị giác máy tính kèm kiểm định công bằng, và lớp 12 làm tác nhân AI với dự án tốt nghiệp.</li>
</ul>
<p><em>Insight từ người trong cuộc:</em> Con số đáng chú ý nhất trong khung của Bộ không phải "12 tiết" mà là quy định <strong>không có bài thi, không đầu điểm riêng</strong> (<a href="https://luatvietnam.vn/tin-van-ban-moi/quyet-dinh-2422-bgddt-noi-dung-giao-duc-ai-khong-co-bai-kiem-tra-va-dau-diem-rieng-186-111628-article.html" rel="nofollow noopener" target="_blank">nguồn: LuatVietnam</a>). Bộ làm đúng: môn này mà thi trắc nghiệm thì hỏng. Nhưng mặt trái là chất lượng sẽ phụ thuộc hoàn toàn vào việc trường có bắt học sinh làm ra sản phẩm thật hay không. Không sản phẩm, không bài thi — nghĩa là không có gì cả.</p>

<h2 id="thoi-luong">Thời lượng và cách triển khai</h2>
<p>Bộ cho phép 3 hình thức: dạy thành chuyên đề riêng, tích hợp vào môn có sẵn, hoặc đưa vào hoạt động trải nghiệm. Sự linh hoạt này giúp mọi trường đều tuân thủ được — nhưng cũng tạo ra khoảng cách lớn giữa các trường: 12 tiết tích hợp rải rác trong môn Tin học sẽ rất khác 30 tiết chuyên đề có giáo viên chuyên trách.</p>
<p>Một điểm cộng lớn của Quyết định 2422: trường phải sàng lọc công cụ AI theo lứa tuổi, tuân thủ quy định bảo vệ dữ liệu, và <strong>không được gây gánh nặng tài chính cho phụ huynh</strong>. Đây là lý do các học liệu miễn phí như Code.org — nền tảng phi lợi nhuận được dùng tại hơn 100 quốc gia — trở thành lựa chọn hợp lý cho mọi trường.</p>

<h2 id="danh-gia">Đánh giá: nhìn vào sản phẩm, đừng nhìn vào điểm</h2>
<p>Cả ba khung cùng từ chối chấm điểm kiểu truyền thống. Bộ quy định đánh giá quá trình qua minh chứng và sản phẩm. UNESCO mô tả mức năng lực định tính. Việt Anh cụ thể hóa bằng: sản phẩm cá nhân và dự án nhóm mỗi năm, ngày hội trưng bày có phụ huynh tham dự, và học sinh phải tự thuyết trình — trả lời câu hỏi về chính sản phẩm của mình.</p>
<p>Với phụ huynh, quy tắc kiểm tra đơn giản nhất là: <strong>cuối năm, hãy yêu cầu xem sản phẩm con làm ra — và nghe con giải thích nó hoạt động thế nào.</strong> Nếu trường không đưa ra được gì ngoài nhận xét chung chung, chương trình AI ở đó mới dừng ở mức tuân thủ.</p>

<h2 id="san-khong-phai-tran">Khung của Bộ là sàn, không phải trần</h2>
<p>Cách đọc đúng cho phụ huynh: Quyết định 2422 bảo đảm mọi đứa trẻ Việt Nam không bị bỏ lại — đó là thành công lớn về chính sách, đưa Việt Nam vào nhóm nước sớm đưa AI vào phổ thông đại trà. Nhưng mức sàn được thiết kế cho 23 triệu học sinh với điều kiện rất khác nhau, nên nó buộc phải thấp để khả thi.</p>
<p>Câu hỏi phụ huynh nên đặt cho bất kỳ trường nào — kể cả Việt Anh — không phải "trường có dạy AI không", vì từ 2026 trường nào cũng phải dạy, mà là:</p>
<ol>
  <li>Dạy bao nhiêu tiết mỗi năm, có liên tục qua các khối lớp không?</li>
  <li>Cuối năm con tôi làm ra sản phẩm gì? Tôi được xem ở đâu?</li>
  <li>Ai dạy — giáo viên có chuyên môn hay kiêm nhiệm?</li>
  <li>Trường dạy đạo đức AI thế nào, có quy tắc dùng AI trong bài tập các môn khác không?</li>
  <li>Có phát sinh chi phí học liệu không?</li>
</ol>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Quyết định 2422 áp dụng từ khi nào?</h3>
<p>Từ năm học 2026–2027, cho toàn bộ học sinh lớp 1–12 trên cả nước. Quyết định được ký ngày 18/08/2026 và có hiệu lực ngay.</p>
<h3>12 tiết AI mỗi năm có phải là môn học mới không?</h3>
<p>Không bắt buộc là môn riêng. Trường được chọn: dạy chuyên đề riêng, tích hợp vào môn có sẵn, hoặc qua hoạt động trải nghiệm — miễn đủ tối thiểu 12 tiết nội dung cốt lõi.</p>
<h3>Học AI có phải thi không, có tính điểm không?</h3>
<p>Không. Bộ quy định rõ không có bài kiểm tra, bài thi hay đầu điểm riêng. Đánh giá qua quá trình học và sản phẩm, ghi nhận bằng nhận xét hoặc mức năng lực.</p>
<h3>Khung UNESCO khác khung của Bộ GDĐT thế nào?</h3>
<p>UNESCO là chuẩn tham chiếu quốc tế gồm 4 chiều năng lực với 3 mức, cao nhất là Sáng tạo, và không bắt buộc. Khung của Bộ là quy định pháp lý tối thiểu cho Việt Nam, có kế thừa tinh thần của UNESCO trong 4 mạch NLa–NLd.</p>
<h3>Chương trình 30 tiết của Việt Anh có thay thế chương trình của Bộ không?</h3>
<p>Không thay thế mà bao trùm: 30 tiết mỗi năm của Việt Anh phủ đủ 4 mạch năng lực của Bộ và đạt mức Sáng tạo theo UNESCO, tức gấp 2,5 lần thời lượng tối thiểu.</p>
<h3>Học AI từ lớp 1 có sớm quá không?</h3>
<p>Ở lớp 1–2, phương pháp chuẩn là "unplugged" — học thuật toán bằng thẻ giấy và trò chơi vận động, gần một nửa thời lượng không dùng máy tính, kèm bài học về tư thế ngồi và thời gian nhìn màn hình.</p>
<h3>Phụ huynh có phải trả thêm tiền học liệu AI không?</h3>
<p>Theo Quyết định 2422, nhà trường không được gây gánh nặng tài chính cho phụ huynh. Các học liệu chuẩn quốc tế như Code.org và Be Internet Awesome đều miễn phí.</p>

<h2 id="ket-luan">Đọc ba khung xong, còn lại đúng một câu hỏi</h2>
<p>Ba văn bản, ba tầm nhìn, nhưng với một gia đình cụ thể thì tất cả quy về một câu: cuối năm nay, con anh chị sẽ cầm về thứ gì và giải thích được nó đến đâu?</p>
<p>Khung của Bộ bảo đảm con không bị bỏ lại. Khung UNESCO cho biết thế giới đo thế nào. Còn thứ quyết định thật thì nằm trong thời khóa biểu của chính ngôi trường con đang học.</p>
<p>Muốn xem con sẽ làm ra sản phẩm gì ở từng lớp trong 12 năm, mời anh chị <a href="/dat-lich-tham-quan">đặt lịch tham quan một buổi học AI tại cơ sở gần nhất</a> — đi xem một buổi rõ hơn đọc ba khung.</p>

<p><em>Tác giả: <strong>Nguyễn Mạnh Dương</strong> — Nhà sáng lập &amp; Chủ tịch hệ thống giáo dục K-12 Việt Anh (từ 2011), tốt nghiệp Manchester Metropolitan University. 15 năm thiết kế môi trường học tập chủ động cho trẻ 0–18 tuổi. Cập nhật lần cuối: 04/09/2026. Nguồn tham khảo: Quyết định 2422/QĐ-BGDĐT ngày 18/08/2026 (thuvienphapluat.vn); UNESCO AI Competency Framework for Students (2024); LuatVietnam — bản tin về quy định không có bài kiểm tra và đầu điểm riêng; Code.org.</em></p>
`.trim();

const post = {
  title: "So sánh khung giáo dục AI: Bộ GDĐT, UNESCO và Việt Anh (2026)",
  slug: "so-sanh-khung-ai-bo-gddt-unesco-viet-anh",
  status: STATUS,
  excerpt: "Đối chiếu 3 khung giáo dục AI cho học sinh: 12 tiết của Bộ GDĐT, khung UNESCO và chương trình 30 tiết của Trường Việt Anh. Phụ huynh cần biết gì?",
  content,
  published_at: "2026-09-04T14:00:00",
  category: "giao-duc",
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

const existing = await req('GET', `/items/posts?fields=id,slug,status&filter%5Bslug%5D%5B_eq%5D=${post.slug}`);
if (existing.data.length) {
  if (!UPDATE) { console.log(`Bài đã tồn tại (id=${existing.data[0].id}, status=${existing.data[0].status}). Dùng --update để cập nhật.`); process.exit(0); }
  const { status, published_at, ...patch } = post;
  const r = await req('PATCH', `/items/posts/${existing.data[0].id}`, patch);
  console.log(`Đã CẬP NHẬT nội dung bài id=${r.data.id} (giữ nguyên status) — /blog/${r.data.slug}`);
} else {
  const r = await req('POST', '/items/posts', post);
  console.log(`Đã TẠO bài id=${r.data.id}, status=${r.data.status}, ngày ${post.published_at} — /blog/${r.data.slug}`);
}
