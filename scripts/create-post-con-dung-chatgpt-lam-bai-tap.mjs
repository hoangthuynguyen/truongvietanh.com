/**
 * BÀI VỆ TINH SỐ 1 của trang trụ /chinh-sach-ai (bộ thông số AEO tab 2, mục 8 — ưu tiên cao nhất).
 * "Con dùng ChatGPT làm bài tập: khi nào được, khi nào không?"
 *
 * NGUỒN: Google Doc 14yHl_QTqEVfhlyFO7KmoPzZt6a5gCIh2bM1x6gdymNk
 *        ("condungchatgptlambaitap.md", duong@truongvietanh.com, 28/8/2026)
 *        — bài do anh Dương viết, phiếu chấm 5 cổng của doc: 96/100 (ngưỡng 90).
 *
 * HAI ĐIỀU KIỆN CHẶN của phiếu chấm — đã kiểm, cả hai ĐẠT trước khi đăng:
 *   - /chinh-sach-ai/ và /dat-lich-tham-quan/ đều trả 200 (bài phụ thuộc trang chính sách;
 *     doc ghi rõ "không đăng bài trước khi trang chính sách lên sóng").
 *   - Thang A0–A4 đã được công bố công khai trong Chính sách 0828/2026/QĐ-HĐT do Chủ tịch ký.
 *
 * ĐÃ SỬA so với bản thảo:
 *   - Nguồn tham khảo #7 ghi chính sách "ban hành 20/8/2026" -> 28/8/2026 cho khớp số hiệu
 *     0828/2026 và ngày thật trên trang /chinh-sach-ai.
 *   - 4 link tuyệt đối https://truongvietanh.com/... -> link tương đối (chuẩn của các bài khác).
 *   - Bảng markdown -> <table> bọc <div class="blog-table-wrap"> để template không chèn hộp
 *     marketing vào giữa bảng.
 *   - Câu hỏi FAQ từ **in đậm** -> <h3>: [slug].astro phát FAQPage từ cặp h2 "Câu hỏi thường
 *     gặp" + các h3/p. Để in đậm thì KHÔNG sinh được schema.
 *   - BỎ khối JSON-LD của doc: template tự phát BlogPosting + FAQPage, dán thêm là ra 2 khối
 *     trùng nhau trên cùng một trang.
 *   - Thêm ảnh cover (doc yêu cầu chuẩn bị) + nhãn "Hình ảnh minh họa được tạo bằng AI" theo
 *     Điều 12.3 của chính sách vừa ban hành.
 *
 * CÒN CHỜ ANH DƯƠNG (2 mục [CẦN KIỂM CHỨNG] của chính phiếu chấm — bản thảo nói đã đánh dấu
 * trong bài nhưng thực tế KHÔNG có marker nào, nên chúng đang ở dạng khẳng định):
 *   - Tiết PRAAD bắt lỗi AI đã triển khai ở khối lớp nào năm học 2026–2027.
 *   - Nhịp PDR "đôi bạn cùng tiến" hằng tuần ở bậc THCS.
 *   Phiếu chấm cũng đề nghị thay mô tả cơ chế PRAAD bằng một tình huống lớp học có thật
 *   (mục 2.3 đang mất 2 điểm vì lý do này) — cần 1 chi tiết: khối lớp, AI sai chỗ nào,
 *   học sinh phát hiện bằng bước nào.
 *
 * Chạy:  node --env-file=.env scripts/create-post-con-dung-chatgpt-lam-bai-tap.mjs
 *        node --env-file=.env scripts/create-post-con-dung-chatgpt-lam-bai-tap.mjs --draft
 *        node --env-file=.env scripts/create-post-con-dung-chatgpt-lam-bai-tap.mjs --update
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
const STATUS = process.argv.includes('--draft') ? 'draft' : 'published';
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<p><strong>Trả lời nhanh:</strong> Con dùng ChatGPT làm bài tập không mặc nhiên là gian lận. Ranh giới nằm ở hai điều: đề bài cho phép đến đâu, và con có tự giải thích được bài mình nộp hay không. Trường Việt Anh phân định bằng thang 5 mức A0–A4, ghi thẳng lên từng đề bài.</p>

<figure class="blog-figure">
  <img src="https://media.truongvietanh.com/images/ai-lam-ho-bai-hoc-sinh-chup-de-bai.webp" alt="Học sinh dùng điện thoại chụp lại đề bài trong sách giáo khoa vào buổi tối, quyển vở bên cạnh còn để trắng" width="1200" height="900" loading="eager" decoding="async" />
  <figcaption>Khoảnh khắc quyết định không nằm ở chiếc điện thoại, mà ở việc đứa trẻ có biết đề bài này cho dùng AI tới mức nào hay không. <em>Hình ảnh minh họa được tạo bằng AI.</em></figcaption>
</figure>

<p>Một phụ huynh nhắn cho tôi ảnh chụp màn hình điện thoại của con: một đoạn hội thoại dài với ChatGPT, câu lệnh cuối cùng là "viết giúp mình bài văn nghị luận 600 chữ về lòng biết ơn". Chị hỏi tôi có nên tịch thu điện thoại không.</p>

<p>Tôi hỏi lại chị một câu: bài văn đó nộp hôm nào, và cô giáo có nói được dùng AI hay không?</p>

<p>Chị không biết. Con cũng không biết. Và đó mới là vấn đề thật — không phải đứa trẻ, mà là chỗ trống nơi lẽ ra phải có một quy định rõ ràng. Chúng ta đang trách một đứa trẻ vì đã đi qua một ranh giới mà chưa ai vạch ra cho nó.</p>

<h2 id="bao-nhieu-tre-dang-dung">Bao nhiêu đứa trẻ đang dùng ChatGPT làm bài tập?</h2>

<p>Nhiều hơn anh chị nghĩ, và nhiều hơn con thừa nhận. Khảo sát của Pew Research Center trên 1.458 thanh thiếu niên Mỹ 13–17 tuổi (thực hiện tháng 9–10/2025, công bố 24/2/2026, sai số ±3,3 điểm phần trăm) cho thấy <strong>54% đã dùng chatbot AI cho bài tập ở trường</strong> — gấp đôi tỷ lệ hai năm trước đó. 59% trong số các em nói việc gian lận bằng AI xảy ra khá thường xuyên ở trường mình.</p>

<p>Ở Việt Nam con số còn cao hơn. Một khảo sát định lượng trên 500 học sinh lớp 10–12 tại ba trường THPT ở Cần Thơ (Nguyễn Thị Hòa, Võ Phú Thịnh và cộng sự, <em>Tạp chí Thiết bị Giáo dục</em>, số 341, tháng 11/2025) ghi nhận <strong>87,4% học sinh đã dùng ChatGPT</strong>, trong đó 92,1% dùng để làm bài tập và 85,3% dùng để viết bài luận.</p>

<p>Nhưng con số đáng lo nhất trong nghiên cứu đó không phải 87,4%. Là <strong>64,8% học sinh hiếm khi kiểm chứng lại thông tin AI đưa ra</strong>. Vấn đề không nằm ở việc các em dùng. Vấn đề nằm ở việc các em tin.</p>

<h2 id="cam-co-duoc-khong">Cấm con dùng ChatGPT có được không?</h2>

<p>Cấm được, nhưng không hiệu quả, và tôi cho rằng cấm là lựa chọn tệ nhất trong ba lựa chọn có sẵn. Khi 87,4% học sinh đã dùng, lệnh cấm không tạo ra một đứa trẻ không dùng AI — nó tạo ra một đứa trẻ dùng AI mà giấu cha mẹ. Anh chị mất luôn cơ hội dạy con dùng cho đúng.</p>

<p>Còn một lý do thực tế hơn: AI đã vào chương trình chính khóa. Ngày 18/8/2026, Bộ Giáo dục và Đào tạo ban hành <strong>Quyết định 2422/QĐ-BGDĐT</strong> về Khung nội dung giáo dục trí tuệ nhân tạo cho học sinh phổ thông, quy định tối thiểu 12 tiết/lớp/năm học, áp dụng từ năm học 2026–2027. Cấm con dùng AI bây giờ giống như cấm con dùng máy tính cầm tay năm 2005. Tôi đã <a href="/blog/quyet-dinh-2422-giao-duc-ai-tom-tat-cho-phu-huynh/">tóm tắt quyết định này trong 5 phút cho phụ huynh</a>.</p>

<p>Điều đáng cấm không phải công cụ. Là <strong>cách dùng khiến con không còn phải nghĩ</strong>.</p>

<h2 id="khi-nao-la-gian-lan">Dùng AI làm bài tập, khi nào là học và khi nào là gian lận?</h2>

<p>Ranh giới nằm ở hai câu hỏi: <em>đề bài cho phép đến đâu</em>, và <em>con có giải thích được bài mình nộp hay không</em>. Nếu đề bài cho phép và con giải thích được từng câu, đó là học. Nếu đề bài không cho phép, hoặc con không giải thích nổi chính đoạn văn mình vừa nộp, đó là gian lận — bất kể sản phẩm hay đến đâu.</p>

<p>Có một nghiên cứu làm tôi suy nghĩ rất lâu. Nhóm của Nataliya Kosmyna tại <strong>MIT Media Lab</strong> (công bố 6/2025) cho 54 người viết luận trong bốn phiên, chia ba nhóm: dùng LLM, dùng công cụ tìm kiếm, và không dùng gì. Họ đo hoạt động não bằng EEG. Nhóm dùng LLM có mức kết nối thần kinh <strong>yếu nhất</strong>, và — chi tiết khiến tôi lạnh người — <strong>không trích lại được chính bài mình vừa viết xong</strong>. Nhóm tác giả gọi hiện tượng này là <em>cognitive debt</em>, món <strong>nợ nhận thức</strong>: bạn tiết kiệm được công sức hôm nay, và trả lãi bằng năng lực tư duy ngày mai.</p>

<p>Đứa trẻ không nhớ nổi mình vừa viết gì thì chưa học được gì. Nó chỉ vừa nộp bài.</p>

<h2 id="thang-a0-a4">Thang 5 mức Việt Anh ghi lên từng đề bài</h2>

<p>Trường Việt Anh không trả lời câu hỏi "được hay không được" bằng một quy định chung chung. Chúng tôi trả lời bằng <strong>thang A0–A4</strong>, và giáo viên ghi thẳng mức cho phép lên mỗi đề bài, mỗi dự án, mỗi bài kiểm tra. Đề nào không ghi mức thì mặc định là A0 — không được dùng AI.</p>

<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Mức</th><th>Tên gọi</th><th>Con được làm gì</th><th>Dùng cho bài nào</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>A0</strong></td><td>Không dùng AI</td><td>Không dùng ở bất kỳ khâu nào</td><td>Bài kiểm tra định kỳ, bài thi, bài viết tay tại lớp</td></tr>
    <tr><td><strong>A1</strong></td><td>AI để hiểu đề</td><td>Hỏi AI để hiểu khái niệm, hiểu yêu cầu. Phần nộp phải tự viết</td><td>Bài văn, bài toán khó cần gỡ nút hiểu</td></tr>
    <tr><td><strong>A2</strong></td><td>AI để lên ý tưởng, tìm tư liệu</td><td>Brainstorm, lập dàn ý, tìm nguồn. Toàn bộ chữ nộp ra do con viết</td><td>Dự án khoa học, bài thuyết trình nhóm</td></tr>
    <tr><td><strong>A3</strong></td><td>AI là cộng tác viên</td><td>Viết nháp, dịch, sửa lỗi, tạo hình minh họa — có khai báo, và con phải giải thích được mọi câu</td><td>Bài viết dài, sản phẩm truyền thông của câu lạc bộ</td></tr>
    <tr><td><strong>A4</strong></td><td>AI tự do, kiểm chứng bắt buộc</td><td>Dùng không giới hạn. Chấm điểm dựa trên chất lượng câu lệnh và khả năng kiểm chứng</td><td>Capstone Project THPT, bài học về chính AI</td></tr>
  </tbody>
</table>
</div>

<p>Từ A1 trở lên, quy định chung là như nhau: <strong>con phải giải thích được nội dung mình nộp</strong>. Thầy cô có quyền hỏi trực tiếp. Không giải thích được thì bài không được công nhận. Ở mức A3 và A4, con lưu lại lịch sử trao đổi với AI và nộp kèm khi được yêu cầu.</p>

<p>Cái hay của một thang như thế này không nằm ở chỗ nó chặt. Nó nằm ở chỗ nó <strong>công bằng</strong>: đứa trẻ biết trước ranh giới, nên không thể vô tình đi qua. Toàn bộ quy định nằm trong <a href="/chinh-sach-ai">Chính sách sử dụng AI của Trường Việt Anh</a>, công bố công khai để phụ huynh đọc được.</p>

<h2 id="may-tuoi-duoc-dung">Mấy tuổi thì con được dùng ChatGPT?</h2>

<p>UNESCO khuyến nghị <strong>tuổi tối thiểu 13</strong> để học sinh dùng AI tạo sinh trong lớp học — nêu trong <em>Guidance for generative AI in education and research</em>, công bố ngày 7/9/2023. Đây là khuyến nghị, không phải luật, nhưng nó khớp với điều khoản dịch vụ của phần lớn công cụ AI phổ biến hiện nay.</p>

<p>Trường Việt Anh áp dụng giới hạn theo cấp học như sau:</p>

<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Cấp học</th><th>Con dùng AI trực tiếp</th><th>Tài khoản</th><th>Ai giám sát</th></tr>
  </thead>
  <tbody>
    <tr><td><strong>Mầm non</strong></td><td>Không. Chỉ giáo viên dùng để chuẩn bị hoạt động</td><td>—</td><td>—</td></tr>
    <tr><td><strong>Tiểu học</strong></td><td>Chỉ trong giờ học, chỉ công cụ trong danh mục</td><td>Tài khoản lớp do giáo viên quản lý</td><td>Giáo viên có mặt suốt phiên dùng</td></tr>
    <tr><td><strong>THCS</strong></td><td>Trong và ngoài giờ học</td><td>Tài khoản trường cấp riêng từng em</td><td>Giáo viên kiểm tra sản phẩm; trường lưu nhật ký</td></tr>
    <tr><td><strong>THPT</strong></td><td>Tự chủ trong khuôn khổ chính sách</td><td>Tài khoản trường cấp riêng từng em</td><td>Giáo viên kiểm tra sản phẩm</td></tr>
  </tbody>
</table>
</div>

<p>Một điểm anh chị nên biết: con dùng AI bằng <strong>tài khoản của trường</strong> khác hẳn con dùng bằng tài khoản cá nhân lập vội bằng email nào đó. Tài khoản trường có thể tắt việc dùng dữ liệu cho huấn luyện, có nhật ký, có người chịu trách nhiệm. Nếu trường của con chưa cấp tài khoản, câu hỏi đáng hỏi ở buổi họp phụ huynh là: <em>con em đang dùng AI bằng tài khoản của ai?</em></p>

<h2 id="lam-sao-biet-con-tu-lam">Làm sao biết con có tự làm bài hay không?</h2>

<p>Không phải bằng phần mềm phát hiện AI. Đây là chỗ tôi muốn nói thật với anh chị, kể cả khi nó bất tiện cho chính nhà trường.</p>

<p>Nghiên cứu của Weixin Liang, Mert Yuksekgonul, James Zou và cộng sự tại Đại học Stanford (đăng trên tạp chí <em>Patterns</em>, 2023) cho thấy các công cụ phát hiện AI <strong>báo sai một cách có hệ thống</strong> với bài viết của người không phải bản ngữ tiếng Anh — chúng gán nhãn "do AI viết" cho bài của người thật, chỉ vì cách dùng từ đơn giản hơn. Nhóm tác giả khuyến cáo không nên dùng các công cụ này trong bối cảnh giáo dục hay đánh giá.</p>

<p>Học sinh Việt Nam viết tiếng Anh chính là nhóm bị báo sai nhiều nhất. Một đứa trẻ tự viết, viết chân thật, và bị máy kết luận là gian lận — tôi không chấp nhận được rủi ro đó. Vì vậy Trường Việt Anh quy định rõ: <strong>không dùng phần mềm phát hiện AI làm căn cứ duy nhất</strong> để kết luận học sinh gian lận.</p>

<p>Cách đáng tin hơn thì cũ hơn nhiều: <strong>hỏi lại</strong>. "Con giải thích cho cô đoạn này." "Vì sao con chọn ví dụ này mà không phải ví dụ kia?" "Nếu bỏ ý thứ hai đi thì bài còn đứng vững không?" Một đứa trẻ tự làm bài trả lời được trong ba mươi giây. Một đứa trẻ nộp bài của máy sẽ im lặng — và cả hai đều biết điều đó.</p>

<h2 id="tiet-hoc-ai-bi-bat-loi">Thực tế tại Việt Anh: tiết học nơi AI bị bắt lỗi</h2>

<p>Ở Việt Anh có một phương pháp dạy tư duy phản biện gọi là <strong>PRAAD</strong> — Mục đích, Yêu cầu, Giả định, Phân tích, Quyết định. Chúng tôi dùng nó cho nhiều việc, và gần đây dùng cho một việc mới: bắt lỗi AI.</p>

<p>Cách làm rất đơn giản. Giáo viên đưa một câu trả lời do AI sinh ra, không nói trước là đúng hay sai. Học sinh chạy PRAAD trên chính câu trả lời đó: câu này nhằm mục đích gì, nó cần thỏa mãn yêu cầu nào, nó đang <strong>giả định</strong> điều gì mà không nói ra, phân tích từng mắt xích, rồi quyết định giữ hay bỏ.</p>

<p>Bước "Giả định" là bước ăn tiền. Vì AI hiếm khi sai ở dữ kiện — nó sai ở chỗ âm thầm giả định một điều không đúng với bối cảnh Việt Nam, rồi diễn đạt trôi chảy đến mức không ai buồn hỏi lại. Một đứa trẻ đã quen soi bước giả định sẽ không còn là đứa trẻ nằm trong nhóm 64,8% hiếm khi kiểm chứng.</p>

<p>Ở bậc THCS, việc này còn quay lại trong nhịp <strong>PDR — Plan – Do – Review</strong> (Lên kế hoạch – Thực hiện – Nhìn lại) hằng tuần, trong buổi "đôi bạn cùng tiến": con nhìn lại tuần vừa rồi mình đã nhờ AI những gì, chỗ nào đáng lẽ nên tự làm. Không ai chấm điểm câu trả lời đó. Nhưng đứa trẻ nào tuần nào cũng phải tự nói ra thì sớm muộn cũng tự điều chỉnh.</p>

<h2 id="bon-viec-cha-me">Bốn việc cha mẹ làm được ở nhà, bắt đầu từ tối nay</h2>

<ol>
  <li><strong>Hỏi con một câu duy nhất trước mỗi bài tập: "Bài này cô cho dùng AI tới mức nào?"</strong> Nếu con không biết, đó là việc cần hỏi thầy cô, không phải việc cần mắng con. Câu hỏi này dạy con rằng ranh giới là thứ phải xác định trước, không phải thứ đoán sau.</li>
  <li><strong>Yêu cầu con giải thích lại, không yêu cầu con chứng minh trong sạch.</strong> Đừng hỏi "con có dùng ChatGPT không". Hãy hỏi "con đọc lại đoạn này và nói cho mẹ nghe bằng lời của con". Câu thứ nhất dạy con nói dối. Câu thứ hai dạy con học.</li>
  <li><strong>Cùng con bắt AI sai một lần.</strong> Chọn một chủ đề anh chị rành — quê quán, nghề nghiệp, một món ăn của gia đình — rồi hỏi AI và cùng con tìm chỗ nó nói sai. Một lần thấy AI sai về thứ mình biết rõ đáng giá bằng mười lần được dặn "đừng tin AI".</li>
  <li><strong>Thống nhất một mức AI cho việc học ở nhà, viết ra giấy, dán lên bàn học.</strong> Ví dụ: được hỏi AI để hiểu đề, không được nhờ AI viết hộ. Quy tắc viết ra thì con giữ; quy tắc chỉ nói miệng thì con quên.</li>
</ol>

<h2 id="ba-sai-lam">Ba sai lầm cha mẹ hay mắc</h2>

<p><strong>Tịch thu thiết bị và coi như xong.</strong> Con vẫn dùng AI ở lớp, ở nhà bạn, trên máy tính chung. Anh chị chỉ vừa mất kênh nhìn thấy con dùng như thế nào.</p>

<p><strong>Chỉ hỏi kết quả, không hỏi quá trình.</strong> Khi cha mẹ chỉ nhìn điểm số, đứa trẻ sẽ tối ưu cho điểm số — và AI là con đường ngắn nhất tới đó. Hỏi "con làm bài này thế nào" quan trọng hơn hỏi "con được mấy điểm".</p>

<p><strong>Cho rằng con rành công nghệ nên con biết dùng.</strong> Hai chuyện khác nhau. Trẻ con thao tác rất nhanh và kiểm chứng rất kém — đúng như con số 64,8% ở trên. Thành thạo công cụ không phải là năng lực AI; <strong>biết khi nào không nên dùng nó mới là</strong>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>

<h3>Con tôi lớp 7 dùng ChatGPT làm bài tập có sao không?</h3>
<p>Không sao, nếu đề bài cho phép và con giải thích được bài mình nộp. Ở Trường Việt Anh, học sinh THCS được dùng AI trong và ngoài giờ học bằng tài khoản do trường cấp, có giáo viên kiểm tra sản phẩm và có khai báo. Điều cần tránh là để con dùng mà không ai xác định trước ranh giới.</p>

<h3>Dùng AI làm bài tập có bị coi là gian lận không?</h3>
<p>Bị coi là gian lận khi con nộp sản phẩm do AI làm hộ như bài của mình, hoặc dùng AI trong bài kiểm tra và bài thi mà đề không cho phép. Nếu đề bài ghi mức A2 hoặc A3 và con có khai báo, đó không phải gian lận. Ranh giới do đề bài xác định, không do cảm tính người chấm.</p>

<h3>Phần mềm phát hiện AI có đáng tin không?</h3>
<p>Không đáng tin để dùng làm căn cứ duy nhất. Nghiên cứu của Đại học Stanford đăng trên tạp chí Patterns năm 2023 cho thấy các công cụ này báo sai có hệ thống với bài viết của người không phải bản ngữ tiếng Anh — nhóm mà học sinh Việt Nam thuộc về. Trường Việt Anh kết luận dựa trên trao đổi trực tiếp với học sinh và sản phẩm trung gian.</p>

<h3>Mấy tuổi thì con được dùng ChatGPT?</h3>
<p>UNESCO khuyến nghị tuổi tối thiểu 13 cho việc dùng AI tạo sinh trong lớp học, nêu trong hướng dẫn công bố ngày 7/9/2023. Trường Việt Anh không cho học sinh mầm non dùng trực tiếp, học sinh tiểu học chỉ dùng trong giờ học với giáo viên ngồi cạnh, và cấp tài khoản riêng từ bậc THCS.</p>

<h3>Con dùng AI nhiều có làm con lười suy nghĩ không?</h3>
<p>Có, nếu dùng để thay việc nghĩ. Nghiên cứu của MIT Media Lab công bố tháng 6/2025 trên 54 người viết luận cho thấy nhóm dùng AI có kết nối thần kinh yếu nhất và không trích lại được bài mình vừa viết. Đây là lý do Trường Việt Anh đặt ra nguyên tắc AI không được đi tắt qua chỗ học sinh cần tự nghĩ, tự viết, tự luyện.</p>

<h3>Con tôi không rành công nghệ, có bị thiệt so với bạn không?</h3>
<p>Không, và Trường Việt Anh có quy định riêng để bảo đảm điều đó: học sinh không có thiết bị hoặc mạng ở nhà được bố trí thời gian và thiết bị tại trường để hoàn thành nhiệm vụ có dùng AI. Kỹ năng quyết định không phải thao tác nhanh, mà là biết kiểm chứng và biết khi nào không nên dùng.</p>

<h2 id="ket">Đứa trẻ cần một ranh giới, không cần một lệnh cấm</h2>

<p>Tháng 9/2023, UNESCO khảo sát hơn 450 trường học và đại học trên thế giới và phát hiện <strong>chưa tới 10% có quy định chính thức về AI tạo sinh</strong>. Bà Audrey Azoulay, Tổng Giám đốc UNESCO, nói về khoảng trống đó bằng một câu tôi hay nhắc lại: <em>"AI tạo sinh có thể là cơ hội lớn cho sự phát triển của con người, nhưng nó cũng có thể gây hại và định kiến."</em></p>

<p>Chín mươi phần trăm những đứa trẻ đang dùng AI hôm nay không có ai vạch cho chúng một đường vôi. Rồi khi chúng bước qua, người lớn gọi đó là gian lận.</p>

<p>Tôi cho rằng đứa trẻ không cần chúng ta cấm. Nó cần chúng ta nói rõ: chỗ này con được nhờ, chỗ kia con phải tự đi, và bất cứ lúc nào cô cũng có quyền hỏi con giải thích. Một ranh giới rõ ràng không làm đứa trẻ nhỏ lại. Nó làm đứa trẻ tự tin, vì lần đầu tiên nó biết chắc mình đang đứng ở đâu.</p>

<p>Việc học chưa bao giờ là việc nộp ra một sản phẩm. Nó là việc trở thành một người nghĩ được. Không có công cụ nào làm hộ được phần đó — và cũng không nên có.</p>

<p><strong>Anh chị muốn thấy tận mắt một tiết học có AI diễn ra thế nào?</strong> Khi anh chị dự một tiết PRAAD và nghe học sinh chỉ ra chỗ AI giả định sai, câu hỏi "có nên cho con dùng ChatGPT không" thường tự có câu trả lời. Nếu không đến xem, anh chị vẫn sẽ phải quyết định — chỉ là quyết định dựa trên phỏng đoán thay vì dựa trên điều đã thấy. Trường Việt Anh nhận đặt lịch tham quan cả 7 ngày trong tuần, khung 07:00–19:00: <a href="/dat-lich-tham-quan">đặt lịch tham quan tại đây</a>.</p>

<p><em><strong>Nguyễn Mạnh Dương</strong> — Nhà sáng lập &amp; Chủ tịch hệ thống giáo dục K-12 Việt Anh (từ 2011). 15 năm thiết kế môi trường học tập chủ động cho trẻ 0–18 tuổi. Cập nhật lần cuối: 28/8/2026.</em></p>

<p><em><strong>Nguồn tham khảo:</strong> (1) Pew Research Center (2026), <em>How Teens Use and View AI</em>, khảo sát 1.458 thanh thiếu niên 13–17 tuổi tháng 9–10/2025, công bố 24/2/2026. (2) Nguyễn Thị Hòa, Võ Phú Thịnh, Huỳnh Nghĩa Trung, Lê Văn Trân, Nguyễn Ngọc Vân Anh (2025), <em>Khảo sát định lượng về mức độ và tác động của việc sử dụng ChatGPT đến học sinh trung học phổ thông tại thành phố Cần Thơ, Việt Nam</em>, Tạp chí Thiết bị Giáo dục, số 341, tháng 11/2025, n=500. (3) Kosmyna, N. và cộng sự (2025), <em>Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task</em>, MIT Media Lab, arXiv:2506.08872. (4) Liang, W., Yuksekgonul, M., Mao, Y., Wu, E., Zou, J. (2023), <em>GPT detectors are biased against non-native English writers</em>, Patterns (Cell Press). (5) UNESCO (2023), <em>Guidance for generative AI in education and research</em>, công bố 7/9/2023; khảo sát hơn 450 trường học và đại học. (6) Bộ Giáo dục và Đào tạo (2026), Quyết định 2422/QĐ-BGDĐT ngày 18/8/2026. (7) Trường Việt Anh (2026), <em>Chính sách sử dụng Trí tuệ nhân tạo</em>, phiên bản 1.1, số 0828/2026/QĐ-HĐT, ban hành 28/8/2026.</em></p>
`.trim();

const post = {
  title: "Con dùng ChatGPT làm bài tập: khi nào được, khi nào không?",
  slug: "con-dung-chatgpt-lam-bai-tap",
  status: STATUS,
  excerpt: "Con dùng ChatGPT làm bài tập không phải lúc nào cũng là gian lận. Thang 5 mức A0–A4 của Trường Việt Anh giúp cha mẹ và thầy cô phân định rõ ranh giới.",
  content,
  published_at: "2026-08-28T16:00:00",
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
