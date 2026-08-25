/**
 * Bài cluster #2 cụm AI. Điểm SEO 88/100 (từ khóa "AI làm hộ bài").
 * Bảng 7 dấu hiệu trong bài là nguồn cho lead magnet được giao qua comment Google Doc.
 * Chạy: node --env-file=.env scripts/create-post-ai-lam-ho-bai.mjs   (thêm --update để cập nhật)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN. Chạy với: node --env-file=.env ...'); process.exit(1); }

const content = `
<figure><img src="https://media.truongvietanh.com/images/ai-lam-ho-bai-hoc-sinh-chup-de-bai.webp" alt="Học sinh chụp đề bài bằng điện thoại để AI làm hộ bài, vở nháp bên cạnh vẫn còn trắng" width="1200" height="900" loading="eager" /><figcaption>Hỏi AI trước cả khi đọc kỹ đề — dấu hiệu số 1, và vở nháp thì vẫn còn trắng.</figcaption></figure>

<p>Có hai đứa trẻ cùng lớp, cùng mở một ứng dụng AI vào 8 giờ tối. Đứa thứ nhất gõ: "Giải giúp em bài toán này." Đứa thứ hai gõ: "Em giải ra 24 nhưng đáp án là 18, em sai ở bước nào?" Sáu tháng sau, hai đứa trẻ đó ở hai vị trí rất khác nhau — dù bài tập về nhà của cả hai đều được điểm tốt.</p>

<p>Ranh giới giữa <strong>AI làm hộ bài</strong> và AI dạy con học mỏng đến mức phần lớn cha mẹ không nhìn thấy, cho đến khi điểm thi trên lớp nói thay. Bài viết này giúp bạn nhận diện 7 dấu hiệu con đang lệ thuộc, hiểu vì sao thói quen này hình thành nhanh, và quan trọng nhất: một kế hoạch 7 ngày để đưa con từ "AI làm hộ" sang "AI dạy học" — không cần cấm đoán, không cần cãi vã.</p>

<h2 id="hai-con-duong">Hai con đường bắt đầu từ cùng một cánh cửa</h2>
<p>Điều khiến AI làm hộ bài trở nên khó phát hiện là nó không giống các thói xấu truyền thống. Con không trốn học, không giấu điện thoại; ngược lại, con ngồi vào bàn đúng giờ, nộp bài đầy đủ, điểm bài tập thậm chí đẹp hơn trước.</p>
<p>Một nghiên cứu theo dõi 26.811 học sinh trong khoảng 30 tháng — do David Strömberg (Đại học Stockholm) cùng Victor Lei và Yanhui Wu (Đại học Hồng Kông) thực hiện, công bố qua CEPR dưới mã DP21577 — đã đo được đúng khoảng cách này: nhóm trẻ lệ thuộc AI có điểm bài tập tăng 18%, nhưng điểm thi hàng tháng giảm 20% sau 6 tháng, và sau hai năm điểm thi chuyển cấp giảm 24%. Chúng tôi phân tích chi tiết nghiên cứu này trong bài <a href="/blog/day-con-dung-ai-dung-cach/">Dạy con dùng AI đúng cách</a>; bài bạn đang đọc tập trung vào phần thực hành: nhận diện và sửa.</p>
<p>Điểm khác biệt cốt lõi giữa hai con đường không nằm ở thời gian dùng AI, mà ở <strong>thứ tự suy nghĩ</strong>. Trẻ dùng AI đúng cách suy nghĩ trước, hỏi sau. Trẻ để AI làm hộ bài thì hỏi trước, và thường không suy nghĩ nữa.</p>

<h2 id="7-dau-hieu">7 dấu hiệu con đang để AI làm hộ bài</h2>
<p>Dưới đây là bảng 7 dấu hiệu chúng tôi tổng hợp từ quan sát thực tế trong lớp học và trao đổi với phụ huynh. Bạn hãy đếm xem con mình có bao nhiêu dấu hiệu:</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>#</th><th>Dấu hiệu</th><th>Biểu hiện cụ thể</th><th>Mức cảnh báo</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Hỏi AI trước khi đọc đề</td><td>Mở AI như phản xạ, chụp ảnh đề gửi ngay</td><td>Cao</td></tr>
    <tr><td>2</td><td>Không giải thích lại được</td><td>Nộp bài đúng nhưng ấp úng khi hỏi "con làm sao ra?"</td><td>Cao</td></tr>
    <tr><td>3</td><td>Tốc độ làm bài tăng bất thường</td><td>Bài tập 45 phút xong trong 10 phút, đều đặn</td><td>Trung bình</td></tr>
    <tr><td>4</td><td>Điểm "lệch pha"</td><td>Bài tập về nhà điểm cao, kiểm tra tại lớp điểm thấp</td><td>Cao</td></tr>
    <tr><td>5</td><td>Sợ bài không có AI</td><td>Cuống, cáu khi mất mạng hoặc bị thu điện thoại lúc làm bài</td><td>Cao</td></tr>
    <tr><td>6</td><td>Văn mẫu một giọng</td><td>Bài văn trơn tru nhưng không có chi tiết đời sống của con</td><td>Trung bình</td></tr>
    <tr><td>7</td><td>Không còn nháp</td><td>Vở nháp trắng tinh, không có dấu vết thử–sai</td><td>Trung bình</td></tr>
  </tbody>
</table>
</div>
<p>Cách đọc kết quả: <strong>0–1 dấu hiệu</strong> — con đang ổn, chỉ cần duy trì quy tắc. <strong>2–3 dấu hiệu</strong> — đã hình thành thói quen lệ thuộc, cần can thiệp trong tháng này. <strong>Từ 4 dấu hiệu trở lên</strong> — con gần như đã khoán việc học cho AI; cần kế hoạch 7 ngày ở phần dưới, bắt đầu ngay tuần này.</p>
<figure><img src="https://media.truongvietanh.com/images/dohoa-7-dau-hieu-ai-lam-ho-bai.webp" alt="Đồ họa 7 dấu hiệu con đang để AI làm hộ bài kèm mức cảnh báo" width="1200" height="800" loading="lazy" /><figcaption>Bảy dấu hiệu kèm mức cảnh báo — đếm xem con mình có bao nhiêu.</figcaption></figure>

<p>Dấu hiệu số 7 — vở nháp trắng — là dấu hiệu chúng tôi coi trọng nhất. Vở nháp là "hộp đen" của quá trình tư duy: một đứa trẻ thực sự học luôn để lại vết gạch xóa, thử sai. Vở nháp sạch bong cộng với bài nộp hoàn hảo gần như luôn có nghĩa là quá trình tư duy đã diễn ra ở chỗ khác — trong máy chủ của AI, không phải trong đầu con.</p>
<blockquote>"Khi giáo viên của chúng tôi chấm bài, họ được yêu cầu nhìn vở nháp trước khi nhìn đáp án. Ở Trường Việt Anh, học sinh học theo chu trình Plan-Do-Review — con phải trình bày kế hoạch giải trước khi làm, nên việc đi tắt bằng AI lộ ra ngay từ bước Plan. Cha mẹ ở nhà cũng làm được điều tương tự chỉ với một câu hỏi: 'Con định làm bài này theo hướng nào?' — hỏi trước khi con làm, không phải sau."<br />— Nguyễn Mạnh Dương, Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh</blockquote>

<h2 id="vi-sao-nhanh">Vì sao thói quen AI làm hộ bài hình thành nhanh đến vậy?</h2>
<p>AI làm hộ bài không bắt đầu từ sự lười biếng. Cơ chế ở đây là cơ chế của mọi thói quen: <strong>hành vi nào được thưởng ngay thì được lặp lại</strong>.</p>
<p>Khi con hỏi AI và có đáp án trong 5 giây, não nhận được ba phần thưởng cùng lúc: hết căng thẳng vì bài khó biến mất, tiết kiệm thời gian nên được chơi sớm, và được khen vì bài nộp điểm cao. Trong khi đó, tự vật lộn với bài khó chỉ mang lại phần thưởng vô hình và đến chậm — năng lực. Một bên thưởng sau 5 giây, một bên thưởng sau 5 tháng: bộ não 12 tuổi không có cửa thắng trong trận đấu đó, nếu người lớn không thiết kế lại luật chơi.</p>
<p>Điều này lý giải vì sao cấm đoán thường thất bại. Cấm không xóa được nhu cầu thoát khỏi bài khó — nó chỉ đẩy hành vi xuống hoạt động ngầm: con dùng AI trên máy bạn, ở lớp học thêm, trong nhà vệ sinh. Giải pháp không phải là chặn đường cũ, mà là làm cho đường mới — tự làm trước, hỏi AI sau — cũng có phần thưởng tức thì. Đó chính là logic của kế hoạch 7 ngày dưới đây.</p>

<h2 id="ke-hoach-7-ngay">Kế hoạch 7 ngày: từ AI làm hộ bài sang AI dạy con học</h2>
<p>Kế hoạch này không yêu cầu cha mẹ giỏi công nghệ, chỉ yêu cầu làm đúng thứ tự và không bỏ ngày nào. Mỗi ngày 15–20 phút.</p>
<ol>
  <li><strong>Ngày 1 — Quan sát, chưa can thiệp:</strong> ngồi cạnh con một buổi làm bài tập như người xem. Ghi lại: con mở AI lúc nào, hỏi kiểu gì, chép hay đối chiếu. Chưa nhận xét gì cả — dữ liệu trung thực chỉ có khi con chưa đề phòng.</li>
  <li><strong>Ngày 2 — Nói chuyện bằng số liệu, không bằng đạo lý:</strong> kể cho con nghiên cứu 26.811 học sinh với hai con số +18% và −24%, rồi hỏi: "Con nghĩ vì sao điểm bài tập tăng mà điểm thi lại giảm?" Để con tự giải thích — trẻ tự rút ra kết luận sẽ giữ kết luận đó lâu hơn nghe giảng.</li>
  <li><strong>Ngày 3 — Cùng con lập quy tắc đèn giao thông:</strong> đỏ là đọc hiểu, tính toán cơ bản, diễn đạt — tự làm 100%; vàng là bài khó — tự làm nháp trước, AI góp ý sau; xanh là tra cứu, dịch, giải thích khái niệm — dùng thoải mái. Con là người viết bảng quy tắc, cha mẹ chỉ ký tên: quyền tác giả tạo cam kết.</li>
  <li><strong>Ngày 4 — Dạy con câu lệnh "gia sư":</strong> cùng con đổi cách hỏi AI, từ "giải bài này" sang "đừng cho em đáp án, hãy gợi ý từng bước và hỏi lại em". Đây là kỹ năng thật sự đáng học: ra lệnh cho AI làm gia sư thay vì làm người làm thuê. Nhiều trợ lý AI phổ biến hiện đã có chế độ học tập riêng — nếu công cụ con đang dùng có, hãy bật lên trước khi bắt đầu.</li>
  <li><strong>Ngày 5 — Khôi phục vở nháp:</strong> quy ước mới — mọi bài "đèn vàng" phải có nháp trước khi mở AI. Nháp xấu, sai, gạch xóa đều được khen; nháp trắng thì bài coi như chưa làm.</li>
  <li><strong>Ngày 6 — Đổi câu hỏi buổi tối:</strong> thay "làm bài xong chưa?" bằng "dạy lại bố mẹ bài khó nhất hôm nay". Con giảng được là con hiểu; con ấp úng thì cả nhà biết ngay bài đó cần làm lại — phản hồi tức thì, không cần chờ bài kiểm tra.</li>
  <li><strong>Ngày 7 — Tổng kết và thưởng đúng thứ:</strong> cùng con nhìn lại tuần: bao nhiêu bài tự làm trước? Thưởng cho <strong>quá trình</strong> — số bài có nháp, số lần hỏi AI kiểu gia sư — tuyệt đối không thưởng cho điểm số, vì điểm số là thứ AI có thể làm giả, còn quá trình thì không.</li>
</ol>
<figure><img src="https://media.truongvietanh.com/images/dohoa-ke-hoach-7-ngay.webp" alt="Đồ họa kế hoạch 7 ngày đưa con từ AI làm hộ bài sang AI dạy học" width="1200" height="800" loading="lazy" /><figcaption>Bảy ngày, mỗi ngày một việc nhỏ.</figcaption></figure>

<p>Sau 7 ngày, đừng kỳ vọng thói quen AI làm hộ bài biến mất — kỳ vọng đúng là con <strong>chậm lại một nhịp</strong> trước khi mở AI. Nhịp chậm đó chính là tư duy quay trở lại. Duy trì quy tắc đèn giao thông và câu hỏi buổi tối thêm 3–4 tuần, thói quen mới sẽ tự đứng được.</p>

<figure><img src="https://media.truongvietanh.com/images/giao-vien-xem-vo-nhap-truoc-khi-xem-dap-an.webp" alt="Giáo viên lật vở nháp của học sinh trước khi xem đáp án để phát hiện AI làm hộ bài" width="1200" height="675" loading="lazy" /><figcaption>Giáo viên được yêu cầu nhìn vở nháp trước khi nhìn đáp án.</figcaption></figure>

<h2 id="vai-tro-truong">Vai trò của trường học: nơi thói quen được luyện 8 tiếng mỗi ngày</h2>
<p>Sự thật mà mọi cha mẹ đều biết: 15 phút mỗi tối ở nhà không đấu lại được 8 tiếng mỗi ngày ở trường. Nếu ở trường con vẫn được nộp bài AI làm hộ mà không ai phát hiện, kế hoạch 7 ngày sẽ trôi.</p>
<p>Đây là lý do câu hỏi "trường của con đối xử với AI thế nào?" trở thành câu hỏi chọn trường quan trọng của năm học 2026-2027 — nhất là khi Bộ Giáo dục và Đào tạo đã chủ trương <a href="https://www.vietnamplus.vn/nam-hoc-2026-2027-khong-day-truoc-lop-1-day-manh-stem-ai-va-tieng-anh-post1129145.vnp" target="_blank" rel="noopener">đẩy mạnh STEM, AI và tiếng Anh trong trường phổ thông</a> từ năm học này. Bộ tiêu chí đầy đủ để kiểm tra một ngôi trường nằm ở bài <a href="/blog/truong-hoc-ung-dung-ai-tieu-chi-danh-gia/">Trường học ứng dụng AI: 7 tiêu chí phụ huynh cần hỏi</a>.</p>
<p>Tại Trường Việt Anh, câu trả lời nằm trong chính cấu trúc giờ học: học sinh học AI hàng tuần ngay trong môn học, theo chu trình Plan-Do-Review — lập kế hoạch, tự làm, rồi mới nhìn lại cùng thầy cô và công cụ. Hơn 30 giáo viên của trường tự xây dựng được công cụ AI phục vụ giảng dạy, nên họ hiểu rõ AI làm hộ bài được gì và không được gì — và ra đề theo hiểu biết đó. Trợ lý AI học tập của trường đang thử nghiệm cũng được thiết kế theo nguyên tắc gia sư: gợi ý từng bước, không đưa đáp án.</p>
<blockquote>"Phụ huynh hay hỏi tôi có phần mềm nào phát hiện con dùng AI không. Tôi nói thật: không có phần mềm nào đáng tin cả, và đuổi theo công nghệ giám sát là cuộc đua thua sẵn. Thứ phát hiện chính xác nhất là một câu hỏi của con người: 'Con giải thích cho thầy cách con làm được không?' Ở trường chúng tôi, câu hỏi đó nằm trong quy trình. Ở nhà, nó nên nằm trong bữa tối."<br />— Nguyễn Mạnh Dương</blockquote>

<div class="blog-table-wrap" style="border-left:5px solid #f9dd0e;background:#f8fafc;padding:1rem 1.25rem;border-radius:8px">
<p style="margin:0 0 .4rem"><strong>Bản in bảng 7 dấu hiệu và kế hoạch 7 ngày</strong></p>
<p style="margin:0">Bảng tự chấm có ô đánh dấu để in ra, đánh dấu rồi làm lại sau một tháng để so sánh — <a href="/tai-lieu-ai">tải miễn phí tại đây</a>, không cần để lại email.</p>
</div>

<h2 id="ket-luan">Kết: đừng hỏi "con có dùng AI không" — hãy hỏi "ai đang suy nghĩ"</h2>
<p>AI làm hộ bài và AI dạy con học nhìn bề ngoài giống hệt nhau: cùng một đứa trẻ, cùng một màn hình, cùng một bài tập được nộp đúng hạn. Khác biệt duy nhất — và là khác biệt quyết định tương lai — nằm ở câu hỏi: trong 45 phút đó, ai đang suy nghĩ?</p>
<p>Bạn không cần giỏi công nghệ để kéo con ra khỏi thói quen AI làm hộ bài. Bạn cần một bảng quy tắc dán ở góc học tập, một câu hỏi mỗi buổi tối, và một ngôi trường cùng chiến tuyến với bạn 8 tiếng mỗi ngày.</p>
<p>Muốn xem cách một tiết học "AI không làm hộ được" diễn ra thế nào, mời <a href="/tuyen-sinh">đăng ký tham quan Trường Việt Anh và trao đổi trực tiếp với giáo viên</a>, hoặc đọc <a href="/blog/blog-phu-huynh-review-truong-viet-anh/">chia sẻ của phụ huynh đang có con theo học</a>.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Con tôi chối là không dùng AI làm hộ bài, làm sao biết thật giả?</h3>
<p>Đừng biến việc này thành cuộc thẩm vấn. Cách kiểm tra tôn trọng con nhất là nhờ con dạy lại bài vừa làm — con giảng trôi chảy nghĩa là dù có dùng AI, con vẫn hiểu; con ấp úng thì vấn đề tự lộ ra mà bạn không cần buộc tội ai.</p>
<h3>Có nên cài phần mềm chặn ChatGPT và các ứng dụng AI không?</h3>
<p>Không hiệu quả về dài hạn: ứng dụng AI mới xuất hiện mỗi tuần và con luôn nhanh hơn danh sách chặn của cha mẹ. Năng lượng đó nên dành cho việc thiết lập quy tắc đèn giao thông và duy trì câu hỏi "dạy lại bố mẹ" mỗi tối.</p>
<h3>Con dùng AI làm hộ bài từ lâu rồi, giờ sửa còn kịp không?</h3>
<p>Kịp. Thói quen AI làm hộ bài gỡ được, chỉ là cần thời gian. Não bộ trẻ em có khả năng phục hồi thói quen tốt hơn người lớn nhiều. Điều cần chấp nhận là điểm bài tập của con có thể giảm trong 2–4 tuần đầu khi con tự làm thật — đó là dấu hiệu tốt, không phải thất bại. Hãy nói trước với con điều này để con không hoảng.</p>
<h3>Bài văn con nhờ AI viết, giáo viên có phát hiện được không?</h3>
<p>Phần mềm phát hiện văn AI hiện không đủ tin cậy, kể cả với tiếng Việt. Nhưng giáo viên có kinh nghiệm nhận ra theo cách khác: bài văn thiếu chi tiết đời sống thật của đứa trẻ. Vì vậy thay vì lo bị phát hiện, hãy dạy con dùng AI đúng vai: gợi dàn ý, sửa lỗi — còn chất liệu và giọng văn phải là của con.</p>
<h3>Anh chị em trong nhà đứa dùng AI đúng, đứa lệ thuộc — vì sao?</h3>
<p>Vì lệ thuộc AI không phải vấn đề tính cách mà là vấn đề thiết kế môi trường: đứa trẻ nào gặp bài quá sức thường xuyên hơn, ít được hỏi "con làm thế nào" hơn, sẽ trượt về phía đường tắt nhanh hơn. Điều chỉnh độ khó bài tập và tần suất đối thoại cho từng con, đừng dùng chung một khuôn.</p>
<h3>Trường Việt Anh có cấm học sinh dùng AI không?</h3>
<p>Ngược lại — học sinh của trường học AI hàng tuần và dùng AI làm báo, làm video, thuyết trình. Nhưng mọi việc dùng AI đều nằm trong thiết kế của giáo viên theo chu trình Plan-Do-Review: con phải trình bày kế hoạch và tư duy trước, AI chỉ tham gia ở những bước được phép.</p>

<p><em>Tác giả: Nguyễn Mạnh Dương — Nhà sáng lập &amp; Chủ tịch Hệ thống Trường Việt Anh (TP.HCM), hệ thống trường liên cấp từ Mầm non đến THPT theo định hướng AI-Powered School. Nguồn: CEPR Discussion Paper DP21577 (Strömberg, Lei &amp; Wu); VietnamPlus về chủ trương năm học 2026-2027 của Bộ GD&amp;ĐT.</em></p>
`.trim();

const post = {
  title: "AI làm hộ bài: 7 dấu hiệu con bạn lệ thuộc AI và cách sửa",
  slug: "ai-lam-ho-bai-dau-hieu-va-cach-sua",
  status: 'published',
  excerpt: "AI làm hộ bài khiến trẻ mất tư duy độc lập dù điểm bài tập vẫn cao. Nhận diện 7 dấu hiệu con lệ thuộc AI và kế hoạch 7 ngày giúp con dùng AI như gia sư.",
  content,
  published_at: "2026-08-20T11:00:00",
  category: "phu-huynh",
  featured_image: "https://media.truongvietanh.com/images/ai-lam-ho-bai-hoc-sinh-chup-de-bai.webp",
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
  // Bài này nằm trong lịch đăng dần (scripts/dang-bai-cum-ai.mjs) — KHÔNG ghi đè
  // status/published_at khi cập nhật, nếu không bài draft sẽ bị bật published ngoài ý muốn.
  const { status: _s, published_at: _p, ...capNhat } = post;
  const r = await req('PATCH', `/items/posts/${existing.data[0].id}`, capNhat);
  console.log(`Đã CẬP NHẬT bài id=${r.data.id} — /blog/${r.data.slug}`);
} else {
  const r = await req('POST', '/items/posts', post);
  console.log(`Đã TẠO bài id=${r.data.id} — /blog/${r.data.slug}`);
}
