/**
 * BÀI 2.2 cụm AEO v2.1 — "Quyết định 2422 tóm tắt 5 phút cho phụ huynh".
 * Nguồn: Google Doc 1XdySLZx72q5Bo4zRFw90Is5evm8RMqGMM_HOFEhWXMU (phiếu chấm 96/100).
 * Ưu tiên 1 của lịch tuần 1 — bài tin nóng, cửa sổ citation vài tuần.
 *
 * Đã sửa so với bản thảo:
 *   - 3 link about:blank -> URL thật (pillar 1344, bài 1399, /dat-lich-tham-quan)
 *   - thêm link sang bài 1408 "Dạy con dùng AI đúng cách" (interlink 2 chiều theo kế hoạch)
 *   - bỏ khối FAQPage JSON-LD của bản thảo: [slug].astro TỰ phát FAQPage từ mục
 *     "Câu hỏi thường gặp" (h2 + các cặp h3/p). Dán thêm là ra 2 FAQPage trên 1 trang.
 *   - bảng bọc trong <div class="blog-table-wrap"> để template không chèn hộp marketing
 *     vào giữa bảng, và để mục kết có h2 riêng nhằm chặn phạm vi quét FAQ.
 *
 * CÒN THIẾU: ảnh hero (bản thảo gợi ý "học sinh tiểu học xếp thẻ lệnh giấy, không màn hình").
 * CHỜ BÀI 2.3: khi bài "So sánh 3 khung Bộ–UNESCO–TVA" lên, thêm 1 link từ mục
 *   "12 tiết mỗi năm có đủ không?" sang bài đó.
 *
 * Chạy:  node --env-file=.env scripts/create-post-quyet-dinh-2422.mjs            (tạo, published)
 *        node --env-file=.env scripts/create-post-quyet-dinh-2422.mjs --draft    (tạo dạng nháp)
 *        node --env-file=.env scripts/create-post-quyet-dinh-2422.mjs --update   (cập nhật nội dung,
 *                                                                                 KHÔNG đụng status)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
const STATUS = process.argv.includes('--draft') ? 'draft' : 'published';
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p><strong>Trả lời nhanh:</strong> Quyết định 2422/QĐ-BGDĐT (ký ngày 18/08/2026) quy định từ năm học 2026–2027, mọi học sinh từ lớp 1 đến lớp 12 trên cả nước học tối thiểu 12 tiết về trí tuệ nhân tạo mỗi năm. Không có bài thi, không có đầu điểm riêng, và nhà trường không được thu thêm phí cho nội dung này.</p>

<p>Tuần trước, một phụ huynh nhắn cho tôi: "Anh Dương ơi, nghe nói năm nay con phải học AI, có phải thêm một môn để thi nữa không?" Tôi hiểu ngay nỗi lo đằng sau câu hỏi đó. Không phải lo về AI. Là lo con thêm một gánh nặng.</p>

<p>Tôi đã đọc kỹ toàn văn quyết định này — và tin tốt là: nó được thiết kế khá nhẹ nhàng, thậm chí nhẹ hơn nhiều người nghĩ. Bài này tóm tắt đúng những gì anh chị cần biết, không thêm không bớt, kèm những việc nên làm trước khi năm học bắt đầu.</p>

<h2 id="qd-2422-la-gi">Quyết định 2422 là gì và áp dụng cho ai?</h2>
<p>Đây là văn bản của Bộ Giáo dục và Đào tạo ban hành Khung nội dung giáo dục trí tuệ nhân tạo cho học sinh phổ thông — áp dụng cho <strong>tất cả học sinh lớp 1–12, cả trường công và trường tư</strong>, bắt đầu từ năm học 2026–2027 (Quyết định 2422/QĐ-BGDĐT, 18/08/2026, có hiệu lực ngay từ ngày ký).</p>
<p>Nói ngắn gọn: Việt Nam chính thức đưa AI vào chương trình phổ thông đại trà. Con anh chị học trường nào cũng sẽ được học — khác nhau chỉ ở chỗ học sâu đến đâu.</p>

<h2 id="hoc-gi-trong-12-tiet">Con tôi sẽ học gì trong 12 tiết mỗi năm?</h2>
<p>Học sinh học theo bốn mạch năng lực, và tôi xin dịch chúng ra ngôn ngữ phụ huynh:</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Mạch của Bộ</th><th>Nghĩa là con sẽ…</th></tr>
  </thead>
  <tbody>
    <tr><td>Tư duy lấy con người làm trung tâm</td><td>Hiểu rằng máy phục vụ người, "con người có cảm xúc, AI thì không"</td></tr>
    <tr><td>Đạo đức AI</td><td>Biết bảo vệ thông tin cá nhân, tôn trọng bản quyền, dùng AI trung thực</td></tr>
    <tr><td>Kĩ thuật và ứng dụng AI</td><td>Hiểu máy học từ dữ liệu thế nào, biết dùng công cụ AI đúng cách</td></tr>
    <tr><td>Thiết kế hệ thống AI</td><td>Ở mức cao hơn: tự tạo ra sản phẩm có ứng dụng AI</td></tr>
  </tbody>
</table>
</div>
<p>Yêu cầu tăng dần theo cấp: tiểu học nhận biết và trải nghiệm, THCS hiểu nguyên lý dữ liệu – thuật toán – mô hình, THPT thiết kế được giải pháp và định hướng nghề nghiệp. Khung này kế thừa tinh thần của Khung năng lực AI cho học sinh do UNESCO công bố năm 2024 — nghĩa là hướng đi của Việt Nam khớp với chuẩn quốc tế.</p>

<h2 id="co-phai-thi-khong">Học AI có phải thi không? Có điểm số không?</h2>
<p><strong>Không.</strong> Quyết định ghi rõ: <em>"không quy định bài kiểm tra, bài thi hoặc đầu điểm riêng"</em>. Con được đánh giá qua quá trình học — sản phẩm, dự án, thuyết trình — và ghi nhận bằng nhận xét hoặc mức năng lực, không phải con số.</p>
<p>Tôi cho rằng đây là quyết định đúng đắn nhất trong cả văn bản. Môn học về sáng tạo mà chấm bằng bài thi trắc nghiệm thì hỏng từ gốc. Nhưng nó cũng có mặt trái mà anh chị nên biết: <strong>không thi, không điểm — nghĩa là chất lượng phụ thuộc hoàn toàn vào việc trường có cho con làm ra sản phẩm thật hay không.</strong> Trường làm nghiêm túc và trường dạy cho có sẽ cùng "đạt chuẩn" trên giấy tờ.</p>

<h2 id="co-ton-them-tien-khong">Có tốn thêm tiền không? Trường dạy theo hình thức nào?</h2>
<p>Quyết định yêu cầu nhà trường <strong>không được gây gánh nặng tài chính cho phụ huynh</strong> — công cụ và học liệu phải được sàng lọc phù hợp lứa tuổi và tuân thủ quy định bảo vệ dữ liệu cá nhân. Các học liệu quốc tế miễn phí như Code.org (nền tảng phi lợi nhuận dạy khoa học máy tính) đáp ứng tốt yêu cầu này.</p>
<p>Trường được chọn một trong ba hình thức: dạy thành chuyên đề riêng, tích hợp vào môn có sẵn (thường là Tin học), hoặc đưa vào hoạt động trải nghiệm và câu lạc bộ. Sở Giáo dục nhận kế hoạch của các trường trước ngày 30/8 và báo cáo kết quả trước 15/6 hằng năm.</p>

<h2 id="lop-1-co-som-qua-khong">Lớp 1 đã học AI — có sớm quá không?</h2>
<p>Câu trả lời khiến nhiều anh chị bất ngờ: <strong>học AI ở lớp 1 không có nghĩa là ngồi máy tính.</strong> Phương pháp chuẩn cho lứa tuổi này là "unplugged" — học không cần thiết bị.</p>
<p>Tại Việt Anh, học sinh lớp 1 học thuật toán bằng bộ thẻ lệnh giấy "Buổi sáng của em": một bạn ra lệnh, một bạn làm theo, cả lớp cười ầm khi phát hiện thiếu bước "đánh răng" thì chuỗi lệnh sai. Lớp 2 các con huấn luyện mô hình phân loại "Cá hay Rác" và tự rút ra bài học mà nhiều người lớn chưa hiểu: <em>máy đoán sai vì mình dạy máy chưa đủ ví dụ.</em> Gần một nửa thời lượng ở hai khối này không dùng màn hình, kèm bài học về tư thế ngồi và giới hạn thời gian nhìn màn hình.</p>
<p>Sớm hay muộn không nằm ở độ tuổi. Nằm ở phương pháp.</p>

<h2 id="12-tiet-co-du-khong">12 tiết mỗi năm có đủ không?</h2>
<p>Đủ để con không bị bỏ lại — chưa đủ để con thành thạo. 12 tiết tương đương một tiết mỗi tháng: đủ cho nhận biết, an toàn, và trải nghiệm ban đầu. Đó là mức sàn được thiết kế cho 23 triệu học sinh với điều kiện rất khác nhau, và ở vai trò chính sách quốc gia, tôi nghĩ Bộ đã chọn mức khởi đầu hợp lý.</p>
<p>Còn ở vai trò người làm trường, tôi chọn mức khác: Việt Anh dạy <strong>30 tiết mỗi năm, liên tục từ lớp 1 đến lớp 12</strong>, mỗi năm học kết thúc bằng một sản phẩm thật — vì kỹ năng chỉ hình thành khi được luyện liên tục, giống học bơi không thể mỗi tháng xuống nước một lần. Anh chị có thể xem mô hình đầy đủ trong bài <a href="/blog/truong-viet-anh-ai-powered-school-dau-tien-viet-nam/">AI Powered School đầu tiên của Việt Nam</a>. Nghiên cứu trên 26.811 học sinh (CEPR, Strömberg – Lei – Wu) cũng chỉ ra mặt còn lại của vấn đề: dùng AI sai cách khiến điểm thi giảm tới 20% — <a href="/blog/cho-con-dung-ai-sai-cach-diem-thi-giam-20/">tôi đã phân tích kỹ ở bài này</a>.</p>

<h2 id="phu-huynh-nen-lam-gi">Phụ huynh nên làm gì trước năm học mới?</h2>
<p>Năm việc, không việc nào cần anh chị rành công nghệ:</p>
<ol>
  <li><strong>Hỏi trường của con</strong> sẽ dạy AI theo hình thức nào và bao nhiêu tiết — trường nghiêm túc sẽ trả lời được ngay.</li>
  <li><strong>Hỏi về sản phẩm cuối năm:</strong> con sẽ làm ra gì, phụ huynh được xem ở đâu? Đây là câu hỏi phân biệt trường dạy thật với trường dạy cho có.</li>
  <li><strong>Thống nhất luật dùng AI ở nhà:</strong> bài nào được nhờ AI gợi ý, bài nào phải tự làm — cùng một luật với trường thì con không loạn chuẩn. Cách đặt ranh giới này, tôi hướng dẫn chi tiết trong bài <a href="/blog/day-con-dung-ai-dung-cach/">Dạy con dùng AI đúng cách</a>.</li>
  <li><strong>Kiểm tra khoản thu:</strong> nội dung AI cốt lõi không được thu thêm phí; nếu trường thu, anh chị có quyền hỏi căn cứ.</li>
  <li><strong>Đừng cấm — hãy ngồi cùng:</strong> mỗi tuần một lần, nhờ con giải thích thứ con vừa học hoặc làm với AI. Con giải thích được nghĩa là con thật sự hiểu.</li>
</ol>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Quyết định 2422 có hiệu lực từ khi nào?</h3>
<p>Từ ngày ký 18/08/2026 và triển khai từ năm học 2026–2027 cho toàn bộ học sinh lớp 1–12 trên cả nước, cả trường công và trường tư.</p>
<h3>12 tiết AI có phải môn học mới trong thời khóa biểu không?</h3>
<p>Không bắt buộc. Trường được chọn: chuyên đề riêng, tích hợp vào môn có sẵn như Tin học, hoặc hoạt động trải nghiệm — miễn đủ 12 tiết nội dung cốt lõi mỗi năm.</p>
<h3>Con tôi có bị chấm điểm môn AI không?</h3>
<p>Không. Quyết định 2422 ghi rõ không có bài kiểm tra, bài thi hay đầu điểm riêng. Học sinh được đánh giá qua sản phẩm và quá trình học, ghi nhận bằng nhận xét hoặc mức năng lực.</p>
<h3>Trường có được thu thêm tiền dạy AI không?</h3>
<p>Nội dung cốt lõi 12 tiết là bắt buộc và không được tạo gánh nặng tài chính cho phụ huynh. Nhiều học liệu chuẩn quốc tế như Code.org hoàn toàn miễn phí, nên trường không có lý do thu thêm cho phần này.</p>
<h3>Lớp 1 học AI có hại mắt, nghiện màn hình không?</h3>
<p>Phương pháp chuẩn cho lớp 1–2 là học không dùng thiết bị: thẻ giấy, trò chơi vận động, đóng vai "người ra lệnh – người làm theo". Tại Việt Anh, gần một nửa thời lượng hai khối này không có màn hình, kèm bài học về tư thế ngồi và thời gian sử dụng thiết bị.</p>
<h3>12 tiết của Bộ và 30 tiết của Việt Anh khác nhau thế nào?</h3>
<p>12 tiết là mức sàn quốc gia — đủ để nhận biết và an toàn. 30 tiết mỗi năm liên tục 12 khối lớp cho phép học sinh làm ra sản phẩm thật mỗi năm: từ thẻ lệnh lớp 1, mô hình phân loại lớp 2 đến xe tự hành lớp 10 và dự án cộng đồng lớp 12.</p>

<h2 id="ket-luan">Điều đáng giữ lại sau 5 phút</h2>
<p>Điều tôi muốn anh chị giữ lại sau 5 phút đọc bài này không phải là số hiệu văn bản. Là một sự thật giản dị: từ năm nay, câu hỏi "trường có dạy AI không" đã hết giá trị — trường nào cũng dạy. Câu hỏi mới của người làm cha mẹ là: <em>con mình sẽ là người bấm nút theo hướng dẫn, hay người hiểu chuyện gì xảy ra sau nút bấm?</em></p>
<p>Mười hai tiết hay ba mươi tiết, cuối cùng vẫn quay về một thứ: sản phẩm con làm ra và ánh mắt con khi giải thích nó cho anh chị nghe.</p>
<p>Nếu anh chị muốn tận mắt xem học sinh lớp 1 "lập trình" bằng thẻ giấy và học sinh lớp 10 chạy xe tự hành, hãy <a href="/dat-lich-tham-quan">đặt lịch tham quan một buổi học AI tại Việt Anh</a> — đi xem một buổi đáng giá hơn đọc mười bài viết.</p>

<p><em>Tác giả: <strong>Nguyễn Mạnh Dương</strong> — Nhà sáng lập &amp; Chủ tịch hệ thống giáo dục K-12 Việt Anh (từ 2011), tốt nghiệp Manchester Metropolitan University. 15 năm thiết kế môi trường học tập chủ động cho trẻ 0–18 tuổi. Cập nhật lần cuối: 28/08/2026. Nguồn tham khảo: Quyết định 2422/QĐ-BGDĐT ngày 18/08/2026 (thuvienphapluat.vn); Cổng Xây dựng Chính sách — Chinhphu.vn (toàn văn, 08/2026); UNESCO AI Competency Framework for Students (2024); CEPR Discussion Paper DP21577 — Strömberg, Lei &amp; Wu (26.811 học sinh).</em></p>
`.trim();

const post = {
  title: "Quyết định 2422: Con bạn học 12 tiết AI/năm — tóm tắt 5 phút",
  slug: "quyet-dinh-2422-giao-duc-ai-tom-tat-cho-phu-huynh",
  status: STATUS,
  excerpt: "Từ năm học 2026–2027, mọi học sinh lớp 1–12 học tối thiểu 12 tiết AI/năm theo Quyết định 2422: không bài thi, không đầu điểm riêng, không thu thêm phí.",
  content,
  published_at: "2026-09-01T09:00:00",
  category: "phu-huynh",
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
  if (!UPDATE) { console.log(`Bài đã tồn tại (id=${existing.data[0].id}, status=${existing.data[0].status}). Chạy với --update để cập nhật.`); process.exit(0); }
  // KHÔNG gửi status/published_at khi update — tránh bẫy bật published cho bài đang nháp
  const { status, published_at, ...patch } = post;
  const r = await req('PATCH', `/items/posts/${existing.data[0].id}`, patch);
  console.log(`Đã CẬP NHẬT nội dung bài id=${r.data.id} (giữ nguyên status) — /blog/${r.data.slug}`);
} else {
  const r = await req('POST', '/items/posts', post);
  console.log(`Đã TẠO bài id=${r.data.id}, status=${r.data.status} — /blog/${r.data.slug}`);
}
