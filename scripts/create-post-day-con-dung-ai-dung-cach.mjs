/**
 * Bài PILLAR cụm AI. Điểm SEO 88/100 (từ khóa "dạy con dùng AI đúng cách", type pillar).
 * Số liệu nghiên cứu đã chỉnh cho khớp bài 1399 đang live: +18% bài tập, -20% thi tháng,
 * -24% thi chuyển cấp, -18% thi đại học, dẫn nguồn gốc CEPR DP21577.
 * Chạy: node --env-file=.env scripts/create-post-day-con-dung-ai-dung-cach.mjs   (thêm --update để cập nhật)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<figure><img src="https://media.truongvietanh.com/images/day-con-dung-ai-dung-cach-me-ngoi-cung-con-hoc.webp" alt="Người mẹ ngồi cùng con học bài buổi tối, minh họa cách dạy con dùng AI đúng cách" width="1200" height="675" loading="eager" /><figcaption>Dạy con dùng AI đúng cách bắt đầu từ một câu hỏi mỗi tối, không phải từ phần mềm giám sát.</figcaption></figure>

<p>Tuần này, hàng triệu học sinh TP.HCM tựu trường. Và năm học 2026-2027 là năm đầu tiên gần như mọi đứa trẻ từ tiểu học trở lên đều biết đến ChatGPT, Gemini hay một ứng dụng AI nào đó. Câu hỏi lớn nhất của cha mẹ không còn là "có nên cho con dùng AI không", mà là <strong>dạy con dùng AI đúng cách</strong> như thế nào.</p>

<p>Một nghiên cứu tại Trung Quốc theo dõi 26.811 học sinh trong 30 tháng đã đưa ra con số khiến nhiều cha mẹ giật mình: nhóm trẻ dùng AI làm bài tập có <strong>điểm bài tập tăng 18%, nhưng điểm thi giảm 20% sau 6 tháng và giảm tới 24% ở kỳ thi chuyển cấp</strong>. Bài viết này phân tích vì sao có nghịch lý đó, và chia sẻ cách Trường Việt Anh — trường học AI-Powered School tại TP.HCM — đang dạy học sinh dùng AI mỗi tuần mà không để các con ỷ lại.</p>

<h2 id="nghien-cuu-noi-gi">Nghiên cứu 26.000 học sinh thực sự nói gì?</h2>
<p>Nghiên cứu do David Strömberg (Đại học Stockholm) cùng Victor Lei và Yanhui Wu (Đại học Hồng Kông) thực hiện, công bố qua CEPR dưới mã DP21577, theo dõi 26.811 học sinh lớp 7 đến lớp 12 trong khoảng 30 tháng. Đây là nghiên cứu dùng phương pháp difference-in-differences trên dữ liệu bảng, không phải khảo sát tự khai.</p>
<p>Thứ nhất, điểm bài tập về nhà của nhóm dùng AI tăng 18%. Điều này dễ hiểu: AI giải bài nhanh, trình bày đẹp, ít sai vặt.</p>
<p>Thứ hai, khi bước vào phòng thi — nơi không có AI — thành tích của chính nhóm này đi xuống: điểm thi hàng tháng giảm 20% sau 6 tháng, và sau khoảng hai năm, điểm thi chuyển cấp giảm 24%, điểm thi đại học giảm 18%.</p>
<p>Kết luận của nghiên cứu không phải là "AI có hại", mà là: <strong>điều quyết định nằm ở chỗ ai đang điều khiển quá trình học — đứa trẻ hay AI</strong>. Chúng tôi đã phân tích chi tiết từng con số, phân biệt rõ số liệu từ công bố gốc và số liệu từ nguồn tổng hợp thứ cấp, trong bài <a href="/blog/cho-con-dung-ai-sai-cach-diem-thi-giam-20/">Cho con dùng AI sai cách: điểm thi có thể giảm 20%</a>.</p>
<p>Xu hướng nghiên cứu chỉ ra trùng khớp với điều các nhà giáo dục trên thế giới đã cảnh báo về "cognitive offloading" — não bộ ngừng luyện tập khi có công cụ làm thay.</p>

<h2 id="vi-sao-nghich-ly">Vì sao điểm bài tập tăng mà điểm thi lại giảm?</h2>
<p>Hiểu được nghịch lý này là bước thứ hai của việc dạy con dùng AI đúng cách. Nó có một lời giải thích sư phạm khá đơn giản: <strong>bài tập đo sản phẩm, bài thi đo năng lực</strong>.</p>
<p>Khi con dùng AI làm hộ bài, sản phẩm nộp cho cô giáo rất tốt — nhưng quá trình luyện tập trong não con không diễn ra. Học tập thực chất xảy ra đúng ở chỗ "khó chịu": lúc con bí, con thử, con sai, con sửa. AI làm hộ nghĩa là cắt bỏ toàn bộ đoạn "khó chịu" đó.</p>
<p>Các nhà tâm lý học giáo dục gọi đây là <strong>ảo tưởng năng lực (illusion of competence)</strong>: con đọc lời giải của AI, thấy hiểu, tưởng mình đã biết. Đến khi ngồi một mình trong phòng thi, không có AI, năng lực thật mới lộ ra.</p>
<p>Ba dấu hiệu cha mẹ có thể quan sát ngay tại nhà:</p>
<ul>
  <li>Con làm bài tập rất nhanh nhưng không giải thích lại được cách làm bằng lời của mình.</li>
  <li>Con mở AI trước cả khi đọc kỹ đề — hỏi AI đã thành phản xạ đầu tiên.</li>
  <li>Điểm bài tập trên lớp cao dần nhưng điểm kiểm tra tại lớp không cải thiện, thậm chí giảm.</li>
</ul>
<p>Nếu con có từ hai dấu hiệu trở lên, con đang ở phía "AI làm hộ" — và cần điều chỉnh sớm, trước khi thành thói quen. Đây cũng là điểm khởi đầu để dạy con dùng AI đúng cách: nhận ra con đang ở phía nào. Bộ dấu hiệu đầy đủ hơn cùng kế hoạch sửa trong 7 ngày nằm ở bài <a href="/blog/ai-lam-ho-bai-dau-hieu-va-cach-sua/">AI làm hộ bài: 7 dấu hiệu con lệ thuộc AI và cách sửa</a>.</p>

<figure><img src="https://media.truongvietanh.com/images/phong-thi-khong-co-ai-hoc-sinh-lam-bai-tren-giay.webp" alt="Học sinh làm bài trong phòng thi không có AI — nơi năng lực thật lộ ra khi không dạy con dùng AI đúng cách" width="1200" height="675" loading="lazy" /><figcaption>Phòng thi là nơi duy nhất không có AI — và là nơi khoảng cách giữa điểm bài tập với năng lực thật hiện ra.</figcaption></figure>

<h2 id="hai-cach-dung">AI làm hộ bài và AI dạy con học: khác nhau ở đâu?</h2>
<p>Cùng một công cụ, hai cách dùng cho hai kết quả ngược nhau. Bảng so sánh dưới đây giúp cha mẹ nhận diện nhanh con mình đang ở phía nào:</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Tiêu chí</th><th>AI làm hộ bài</th><th>AI dạy con học</th></tr>
  </thead>
  <tbody>
    <tr><td>Ai suy nghĩ trước</td><td>AI trả lời ngay, con chép</td><td>Con tự làm trước, AI góp ý sau</td></tr>
    <tr><td>Câu hỏi con đặt</td><td>"Giải bài này cho em"</td><td>"Em làm thế này đúng chưa, sai ở đâu?"</td></tr>
    <tr><td>Vai trò của AI</td><td>Người làm thuê</td><td>Gia sư đặt câu hỏi ngược</td></tr>
    <tr><td>Kết quả ngắn hạn</td><td>Điểm bài tập cao (+18%)</td><td>Tiến bộ chậm hơn nhưng chắc</td></tr>
    <tr><td>Kết quả dài hạn</td><td>Điểm thi giảm 20–24%, mất tư duy độc lập</td><td>Năng lực thật, tự tin khi không có AI</td></tr>
    <tr><td>Người điều khiển</td><td>AI</td><td>Đứa trẻ</td></tr>
    <tr><td>Vai trò người lớn</td><td>Không ai giám sát</td><td>Giáo viên và cha mẹ thiết kế cách dùng</td></tr>
  </tbody>
</table>
</div>
<blockquote>"Ở Trường Việt Anh, chúng tôi có một nguyên tắc khi đưa AI vào lớp học: AI không bao giờ được cầm bút thay học sinh ở phần tư duy nền tảng. Học sinh của chúng tôi học AI hàng tuần, làm báo, làm video bằng AI — nhưng luôn theo chu trình Plan-Do-Review: con lập kế hoạch trước, tự làm, rồi mới dùng AI và cùng thầy cô nhìn lại. Sự khác biệt không nằm ở công cụ, mà nằm ở việc có người lớn thiết kế quá trình hay không."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="quy-tac-den-giao-thong">Quy tắc đèn giao thông: công cụ dạy con dùng AI đúng cách</h2>
<p>Nếu chỉ chọn một công cụ duy nhất để dạy con dùng AI đúng cách, chúng tôi chọn quy tắc này. Đây là cách tiếp cận mà chúng tôi đánh giá là thực dụng và dễ áp dụng nhất cho gia đình Việt Nam. Cha mẹ có thể in ra, dán ở góc học tập:</p>
<ul>
  <li><strong>Đèn đỏ — tuyệt đối tự làm:</strong> các kỹ năng nền tảng như đọc hiểu, diễn đạt bằng lời văn của mình, các phép tính cơ bản. Đây là phần "cơ bắp" của não — thuê ai tập hộ cũng vô nghĩa.</li>
  <li><strong>Đèn vàng — tự làm trước, AI góp ý sau:</strong> bài tập phức tạp, bài văn, dự án. Con phải tự suy nghĩ và làm bản nháp trước, sau đó mới dùng AI để gợi ý hướng khác và kiểm tra lỗi.</li>
  <li><strong>Đèn xanh — dùng AI thoải mái:</strong> tìm kiếm tài liệu, dịch văn bản, nhờ giải thích khái niệm khó theo nhiều cách khác nhau. Đây là lúc AI phát huy đúng vai trò gia sư.</li>
</ul>
<p>Quy tắc chỉ hiệu quả khi có hai điều kiện đi kèm. Một là <strong>thống nhất trước với con</strong>, không áp đặt giữa chừng — đứa trẻ tham gia viết ra quy tắc sẽ giữ quy tắc bền hơn nhiều so với đứa trẻ chỉ được thông báo. Hai là <strong>có người kiểm tra quá trình</strong>, không chỉ kiểm tra kết quả: hỏi con "con làm thế nào ra đáp án này?" quan trọng hơn hỏi "con được mấy điểm?".</p>

<h2 id="vai-tro-truong-hoc">Vì sao trẻ cần trường học có giám sát sư phạm?</h2>
<p>Đây là điểm mấu chốt mà nghiên cứu chỉ ra nhưng ít bài viết nhấn mạnh: vấn đề không nằm ở đứa trẻ, mà nằm ở chỗ <strong>không ai thiết kế quá trình học cùng AI cho trẻ</strong>. Trẻ em, kể cả học sinh THPT, chưa đủ khả năng tự chống lại "cám dỗ đường tắt" — người lớn còn khó.</p>
<p>Bộ Giáo dục và Đào tạo cũng đã xác định hướng đi này: năm học 2026-2027, ngành giáo dục <a href="https://www.vietnamplus.vn/nam-hoc-2026-2027-khong-day-truoc-lop-1-day-manh-stem-ai-va-tieng-anh-post1129145.vnp" target="_blank" rel="noopener">đẩy mạnh STEM, AI và tiếng Anh trong trường phổ thông</a> — nghĩa là AI sẽ vào trường học một cách chính thức, chứ không dừng ở việc trẻ tự mày mò ở nhà. Trên thế giới, <a href="https://www.unesco.org/en/articles/ai-competency-framework-students" target="_blank" rel="noopener">UNESCO đã ban hành Khung năng lực AI dành cho học sinh</a>, nhấn mạnh tư duy phản biện về AI và đạo đức sử dụng — không chỉ kỹ năng bấm nút.</p>
<p>Tại Trường Việt Anh, triết lý "AI có giám sát sư phạm" được triển khai thành hệ thống chứ không phải khẩu hiệu:</p>
<ol>
  <li><strong>AI nằm trong môn học, không tách rời:</strong> học sinh học AI hàng tuần ngay trong các môn hiện có — con học cách dùng AI để học Toán, học Văn, chứ không học AI như một môn "trình diễn".</li>
  <li><strong>Giáo viên được đào tạo trước học sinh:</strong> hơn 30 thầy cô của trường đã tự xây dựng được công cụ và ứng dụng AI phục vụ giảng dạy; giáo án được thiết kế để phân biệt rõ phần nào con phải tự làm, phần nào được dùng AI.</li>
  <li><strong>AI tutor có kiểm soát:</strong> trường đang thử nghiệm trợ lý AI học tập cho môn Toán, được thiết kế để đặt câu hỏi dẫn dắt từng bước thay vì đưa đáp án — đúng nguyên tắc "đèn vàng" ở trên.</li>
  <li><strong>Học đi đôi với sản phẩm thật:</strong> học sinh dùng AI để làm báo, làm video, thuyết trình — những sản phẩm AI không thể "làm hộ trọn gói" vì đòi hỏi chính kiến và trải nghiệm của con. Trong ngày hội Leadership Day, chính học sinh đứng trạm dạy lại phụ huynh cách dùng AI.</li>
</ol>
<p>Cha mẹ muốn kiểm chứng một ngôi trường có làm thật hay không có thể dùng bộ tiêu chí trong bài <a href="/blog/truong-hoc-ung-dung-ai-tieu-chi-danh-gia/">Trường học ứng dụng AI: 7 tiêu chí phụ huynh cần hỏi</a>.</p>
<blockquote>"Nhiều phụ huynh hỏi tôi: trường dạy AI thì con có ỷ lại không? Tôi trả lời bằng đúng nghiên cứu này. Đứa trẻ ỷ lại là đứa trẻ dùng AI một mình, không ai hướng dẫn. Còn đứa trẻ được dạy dùng AI trong môi trường có thầy cô giám sát thì ngược lại: con biết lúc nào được dùng, lúc nào phải tự làm — và đó chính là kỹ năng quan trọng nhất của thế hệ này. Cấm AI là chuẩn bị cho con quá khứ. Dạy con dùng AI đúng cách mới là chuẩn bị cho tương lai."<br />— Nguyễn Mạnh Dương</blockquote>

<h2 id="5-viec-cha-me">5 việc cha mẹ nên làm để dạy con dùng AI đúng cách ngay tuần này</h2>
<p>Dạy con dùng AI đúng cách không cần một buổi nói chuyện lớn, chỉ cần vài việc nhỏ làm đều. Năm học mới là thời điểm vàng để thiết lập lại thói quen, vì mọi nếp cũ đều đang được khởi động lại. Cha mẹ có thể bắt đầu với năm việc cụ thể:</p>
<ol>
  <li><strong>Hỏi con một câu mở:</strong> "Con thường nhờ AI làm gì trong việc học?" — hỏi để hiểu, không phải để bắt lỗi. Phần lớn cha mẹ sẽ ngạc nhiên với mức độ con đã dùng.</li>
  <li><strong>Cùng con dán quy tắc đèn giao thông</strong> ở góc học tập và thống nhất: đỏ tự làm, vàng làm trước rồi hỏi AI, xanh dùng thoải mái.</li>
  <li><strong>Đổi câu hỏi hằng ngày:</strong> thay "con làm bài xong chưa?" bằng "con giải thích cho bố mẹ cách con làm bài này được không?". Nếu con giải thích được, con thật sự hiểu.</li>
  <li><strong>Làm mẫu cho con:</strong> cho con xem chính bạn dùng AI trong công việc thế nào — nháp trước, hỏi AI sau, kiểm tra lại thông tin. Trẻ học từ hành vi của cha mẹ nhanh hơn mọi bài giảng.</li>
  <li><strong>Chọn môi trường có giám sát sư phạm:</strong> nếu con dành 8 tiếng mỗi ngày ở trường, cách trường đó đối xử với AI quan trọng hơn mọi quy tắc ở nhà. Hãy hỏi thẳng trường của con: "Nhà trường dạy học sinh dùng AI như thế nào, và kiểm soát ra sao?"</li>
</ol>

<h2 id="ket-luan">Kết: ai đang điều khiển việc học của con bạn?</h2>
<p>Nghiên cứu 26.811 học sinh không phải lời cảnh báo về AI — nó là lời cảnh báo về việc <strong>để trẻ một mình với AI</strong>. Điểm bài tập tăng 18% là lớp vỏ; điểm thi giảm 20–24% là cái giá của việc không ai dạy con dùng AI đúng cách.</p>
<p>Thế hệ này sẽ sống và làm việc cùng AI cả đời, nên dạy con dùng AI đúng cách là kỹ năng nền chứ không phải chuyện nhất thời. Câu hỏi của cha mẹ vì thế không phải "cấm hay cho", mà là: con đang học dùng AI ở đâu, với ai hướng dẫn, theo quy trình nào. Đó là câu hỏi đáng mang theo khi bước vào năm học mới — và khi chọn trường cho con.</p>
<p>Dạy con dùng AI đúng cách là việc của cả nhà trường lẫn gia đình. Quý phụ huynh muốn xem tận mắt một tiết học có AI với giám sát sư phạm, mời <a href="/tuyen-sinh">đăng ký tham quan trường và nhận tư vấn lộ trình cho con</a>, hoặc đọc thêm <a href="/blog/blog-phu-huynh-review-truong-viet-anh/">chia sẻ thật của phụ huynh đang có con học tại trường</a> và <a href="/blog/hoc-phi-truong-tieu-hoc-thcs-thpt-viet-anh-tphcm/">bảng học phí các cấp</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Có nên cấm hẳn con dùng AI để làm bài tập không?</h3>
<p>Không nên — cấm không phải là dạy con dùng AI đúng cách, mà là né tránh việc dạy. Nghiên cứu 26.811 học sinh cho thấy vấn đề là cách dùng, không phải bản thân công cụ. Cấm hẳn khiến con thiệt kép: vừa dùng lén không ai hướng dẫn, vừa thiếu kỹ năng AI mà chương trình giáo dục và thị trường lao động đang đòi hỏi.</p>
<h3>Con tôi học tiểu học, đã nên cho dùng AI chưa?</h3>
<p>Nên, và dạy con dùng AI đúng cách từ tiểu học còn dễ hơn sửa thói quen ở cấp hai. Nhưng chỉ ở vùng "đèn xanh" và luôn có người lớn ngồi cùng: nhờ AI giải thích khái niệm, kể chuyện, luyện hỏi đáp. Các kỹ năng nền tảng — đọc, viết, tính toán — tuyệt đối để con tự làm, vì tiểu học là giai đoạn xây "cơ bắp" tư duy.</p>
<h3>Làm sao biết con đang dùng AI làm hộ bài?</h3>
<p>Ba dấu hiệu: con làm bài nhanh bất thường nhưng không giải thích lại được; con hỏi AI trước cả khi đọc kỹ đề; điểm bài tập cao nhưng điểm kiểm tra trên lớp không tăng. Cách kiểm tra đơn giản nhất là nhờ con dạy lại cho bạn bài con vừa làm.</p>
<h3>Trường Việt Anh dạy học sinh dùng AI như thế nào?</h3>
<p>Nhà trường xem việc dạy con dùng AI đúng cách là một phần của chương trình chứ không phải hoạt động thêm. Học sinh học AI hàng tuần ngay trong các môn học, theo chu trình Plan-Do-Review: tự lập kế hoạch, tự làm, rồi mới dùng AI và nhìn lại cùng thầy cô. Giáo viên được đào tạo trước để thiết kế rõ phần nào con tự làm, phần nào được dùng AI; trường cũng đang thử nghiệm AI tutor dạng dẫn dắt từng bước thay vì đưa đáp án.</p>
<h3>AI tutor khác gì các app giải bài tập miễn phí?</h3>
<p>App giải bài đưa đáp án ngay — đó chính là kiểu dùng khiến điểm thi giảm. AI tutor có giám sát sư phạm được thiết kế ngược lại: đặt câu hỏi dẫn dắt, bắt học sinh đi từng bước, và có giáo viên theo dõi tiến bộ thật của con qua thời gian.</p>
<h3>Dùng AI nhiều có ảnh hưởng đến khả năng tư duy của trẻ không?</h3>
<p>Có, nếu dùng sai cách. Khi AI làm thay phần suy nghĩ, não bộ mất cơ hội luyện tập — hiện tượng các nhà khoa học gọi là "cognitive offloading". Ngược lại, khi trẻ tự làm trước và dùng AI để đối chiếu, phản biện, AI lại trở thành công cụ luyện tư duy tốt hơn cả học một mình.</p>
<h3>Cha mẹ không rành công nghệ thì đồng hành với con kiểu gì?</h3>
<p>Dạy con dùng AI đúng cách không đòi hỏi cha mẹ rành công nghệ. Bạn không cần giỏi AI hơn con — bạn cần giỏi đặt câu hỏi hơn con. "Con làm thế nào ra kết quả này?" và "Nếu không có AI thì con làm được không?" là hai câu hỏi mà mọi cha mẹ đều hỏi được, và hiệu quả hơn mọi phần mềm kiểm soát.</p>

<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (TP.HCM), hệ thống trường liên cấp từ Mầm non đến THPT theo định hướng AI-Powered School. Nguồn: CEPR Discussion Paper DP21577 (Strömberg, Lei &amp; Wu); UNESCO AI Competency Framework for Students; VietnamPlus về chủ trương năm học 2026-2027 của Bộ GD&amp;ĐT.</em></p>
`.trim();

const post = {
  title: "Dạy con dùng AI đúng cách: Bài học từ nghiên cứu 26.000 học sinh",
  slug: "day-con-dung-ai-dung-cach",
  status: 'published',
  excerpt: "Nghiên cứu 26.811 học sinh: điểm bài tập tăng 18% nhưng điểm thi giảm 20-24% vì lệ thuộc AI. Hướng dẫn cha mẹ dạy con dùng AI đúng cách từ Trường Việt Anh.",
  content,
  published_at: "2026-08-20T09:00:00",
  category: "phu-huynh",
  featured_image: "https://media.truongvietanh.com/images/day-con-dung-ai-dung-cach-me-ngoi-cung-con-hoc.webp",
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
