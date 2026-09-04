/**
 * Bài "Chuyển trường giữa năm học: thủ tục mới và cách để con không tụt lại phía sau".
 * Nguồn: Google Doc 1cwVsYkGaYt7dFLCEHd3GArH8NSnzVOXXJI5gWYlcP3k (bản anh Dương, 03/09/2026)
 *        + bản bổ sung điều kiện chính sách 1s-XNFwDmK73NjrXBx4On7MfBcRigSgynRQxlQwdopNY (04/09/2026).
 *
 * Đã sửa so với bản thảo trong doc:
 *   - BỎ khối JSON-LD của bản thảo: [slug].astro tự phát FAQPage từ mục "Câu hỏi thường gặp"
 *     (h2 + các cặp h3/p, quét đến h2 kế tiếp). Dán thêm JSON-LD là phát trùng, Google chỉ nhận 1.
 *   - FAQ chuyển từ đoạn in đậm sang cặp h3 (câu hỏi) + p (trả lời) cho đúng bộ quét ở trên;
 *     h2 "Điều tôi mong anh chị mang theo" đứng ngay sau để chặn phạm vi quét.
 *   - BỔ SUNG khối "Điều kiện áp dụng của bảo chứng hoà nhập 4 tuần" (h3) — bản thảo hứa
 *     "hoàn 100% học phí" mà thiếu điều kiện chuyên cần 18/20 ngày và danh mục khoản không hoàn,
 *     tức rộng hơn điều khoản đang công bố ở /chinh-sach/chinh-sach-hoan-hoc-phi-4-tuan-dau.
 *   - Ô số 7 trong bảng: bỏ "hỗ trợ chuyển về trường cũ" (trường cũ có nhận lại hay không nằm
 *     ngoài quyền quyết định của Việt Anh) → "hỗ trợ hoàn tất thủ tục rút hồ sơ".
 *   - Học phí: bản thảo ghi "trung bình khoảng 120 triệu/năm" → sửa thành dải 109,9–164,8 triệu
 *     đồng/năm cho khớp trang /hoc-phi và khối FAQ chung trong [slug].astro.
 *   - Giờ tham quan: bản thảo ghi "cả 7 ngày trong tuần" → sửa theo school-facts.ts
 *     (Thứ 2 – Thứ 7 07:00–19:00; Chủ Nhật ngoài giờ làm việc, hẹn trước vẫn tham quan được).
 *   - Thêm liên kết nội bộ: /hoc-phi, /chinh-sach, /chinh-sach/chinh-sach-hoan-hoc-phi-4-tuan-dau,
 *     /he-thong-pdr, /chuyen-truong-lop6, /dat-lich-tham-quan (đã kiểm tra cả 6 trang đều tồn tại).
 *
 * CÒN TREO trước khi để bài này chạy quảng cáo / đẩy mạnh:
 *   1) QĐ 0728.1/2026/QĐ-MAJOR (bản đã ký, đăng toàn văn ở /chinh-sach) giới hạn bảo chứng trong
 *      "04 tuần lễ đầu tiên của NĂM HỌC" — học sinh chuyển vào giữa năm nằm ngoài phạm vi đó.
 *      Trang điều khoản chi tiết đã tính theo "ngày đi học đầu tiên thực tế" nhưng CHƯA có văn bản
 *      ký thay thế. Cần ban hành QĐ sửa đổi có số hiệu mới.
 *   2) Chốt "học thử hai tuần" có tính vào 18/20 ngày chuyên cần của bảo chứng hay không.
 *   3) Giá niêm yết Bản đồ học tập.
 *   4) CHƯA CÓ ẢNH — chưa tìm được ảnh thật phù hợp trong kho /hinh-anh/. Thiếu ảnh trừ điểm SEO.
 *
 * Chạy:  node --env-file=.env scripts/create-post-chuyen-truong-giua-nam-hoc.mjs           (draft)
 *        node --env-file=.env scripts/create-post-chuyen-truong-giua-nam-hoc.mjs --publish
 *        node --env-file=.env scripts/create-post-chuyen-truong-giua-nam-hoc.mjs --update  (giữ status)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
const STATUS = process.argv.includes('--publish') ? 'published' : 'draft';
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN.'); process.exit(1); }

const content = `
<p><strong>Trả lời nhanh:</strong> Từ 10/5/2026, hồ sơ chuyển trường chỉ còn ba loại giấy tờ và nộp được qua Cổng dịch vụ công. Trường nơi con đến phải trả lời trong tối đa 5 ngày làm việc, khác tỉnh là 8 ngày. Thủ tục không còn là rào cản. Rào cản thật là chỗ hổng kiến thức không ai đo cho con.</p>

<p>Mỗi năm, sau buổi họp sơ kết học kỳ I, tôi lại nhận được những tin nhắn có cùng một nhịp. Phụ huynh kể về bảng điểm vừa cầm trên tay, về lời nhận xét của giáo viên, về đứa con dạo này không kể chuyện trường lớp nữa. Rồi câu cuối bao giờ cũng giống nhau: &ldquo;Nhưng thôi để hết năm rồi tính.&rdquo;</p>

<p>Tôi hiểu câu đó. Nó không phải là một quyết định. Nó là chỗ trú của một người đang sợ — sợ thủ tục rắc rối, sợ con hụt chương trình, sợ con mất bạn, và sợ nhất là sợ mình chọn sai thêm một lần nữa.</p>

<p>Bài này viết để tháo từng nỗi sợ đó bằng quy định thật, số liệu thật và những việc trường tôi làm thật. Anh chị đọc xong có thể vẫn quyết định ở lại trường cũ — điều đó hoàn toàn ổn. Nhưng lúc đó nó sẽ là một lựa chọn, không phải một chỗ trú.</p>

<h2 id="co-duoc-khong">Chuyển trường giữa năm học có được không?</h2>
<p>Được. Và từ năm học này, việc đó dễ hơn nhiều so với những gì anh chị từng nghe.</p>
<p>Ngày 24/3/2026, Bộ Giáo dục và Đào tạo ban hành <strong>Thông tư 15/2026/TT-BGDĐT</strong>, có hiệu lực từ <strong>10/5/2026</strong>, ban hành Điều lệ trường tiểu học, trường THCS và trường THPT. Thông tư này thay thế năm văn bản cũ, trong đó có <strong>Quyết định 51/2002/QĐ-BGDĐT</strong> và <strong>Thông tư 50/2021/TT-BGDĐT</strong> — hai văn bản từng quy định việc chuyển trường ở bậc trung học &ldquo;được thực hiện khi kết thúc học kỳ I của năm học hoặc trong thời gian hè trước khi khai giảng năm học mới&rdquo;.</p>
<p>Đây là điểm mà rất nhiều bài viết trên mạng vẫn đang hướng dẫn sai, vì họ chép lại quy định đã hết hiệu lực. Quy định hiện hành không đặt ra khung thời gian cứng đó nữa; thay vào đó nó đặt ra <strong>thời hạn giải quyết</strong> cho các trường.</p>
<p>Một lưu ý thẳng thắn: hướng dẫn của Sở GD&amp;ĐT TP.HCM ban hành ngày 28/7/2025 vẫn còn nêu giới hạn &ldquo;kết thúc học kỳ I hoặc trong hè&rdquo; theo văn bản cũ. Khi hướng dẫn địa phương chưa cập nhật theo thông tư mới, thực tế ở từng trường có thể còn khác nhau. Vì vậy anh chị nên hỏi thẳng trường nơi định chuyển đến — họ là bên nộp và theo hồ sơ.</p>

<h2 id="ho-so-thoi-gian">Hồ sơ chuyển trường gồm những gì, mất bao lâu?</h2>
<p>Hồ sơ theo Thông tư 15/2026 chỉ còn ba thành phần:</p>
<ol>
  <li><strong>Đơn xin chuyển trường</strong> của học sinh hoặc cha mẹ học sinh (bản điện tử hoặc bản giấy).</li>
  <li><strong>Bảng tổng hợp kết quả đánh giá rèn luyện và học tập</strong> của con.</li>
  <li><strong>Kế hoạch giáo dục cá nhân</strong> — chỉ áp dụng với học sinh khuyết tật.</li>
</ol>
<p>So với trước đây, học bạ bản chính và <strong>giấy giới thiệu chuyển trường</strong> không còn là thành phần hồ sơ riêng mà phụ huynh phải tự đi xin. Đơn có thể nộp qua <strong>Cổng dịch vụ công</strong>, nộp trực tuyến, nộp trực tiếp hoặc gửi bưu điện.</p>
<p>Về thời gian, quy định mới ràng buộc các trường bằng những con số cụ thể:</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Bước</th><th>Ai làm</th><th>Thời hạn tối đa</th></tr>
  </thead>
  <tbody>
    <tr><td>Xét đơn, trả lời có tiếp nhận hay không</td><td>Trường nơi con chuyển đến</td><td>5 ngày làm việc (trong tỉnh) — 8 ngày làm việc (khác tỉnh)</td></tr>
    <tr><td>Trả hồ sơ cho học sinh</td><td>Trường nơi con chuyển đi</td><td>3 ngày làm việc</td></tr>
    <tr><td>Trao đổi, xếp lớp cho con</td><td>Trường nơi con chuyển đến</td><td>5 ngày làm việc</td></tr>
  </tbody>
</table>
</div>
<p>Cộng lại, một hồ sơ đầy đủ và thuận lợi mất khoảng <strong>hai tuần làm việc</strong>. Đó là toàn bộ &ldquo;sự phức tạp&rdquo; mà nhiều gia đình đã lấy làm lý do để hoãn một quyết định suốt cả năm. Riêng trường hợp chuyển vào đầu cấp THCS, tôi đã viết riêng một bài về <a href="/chuyen-truong-lop6">chuyển trường lớp 6</a> vì mốc đó có vài điểm khác.</p>

<h2 id="hut-chuong-trinh">Chuyển giữa năm, con có bị hụt chương trình không?</h2>
<p>Có độ vênh. Tôi không nói khác đi được. Các trường cùng chạy khung chương trình quốc gia GDPT 2018, nhưng tiến độ từng môn, từng trường không giống nhau — chắc chắn có chỗ lệch.</p>
<p>Nghiên cứu quốc tế cũng không giấu điều này. Nhà xã hội học <strong>Jeffrey Grigg</strong> (công bố trên tạp chí <em>Sociology of Education</em>, tháng 10/2012, phân tích dữ liệu dọc của học sinh lớp 3–8 tại hệ thống trường công Metropolitan Nashville giai đoạn 1998–2003) thấy rằng năm học có chuyển trường gắn với mức tăng trưởng học tập thấp hơn, tương đương khoảng 6% mức tăng trưởng kỳ vọng — cỡ <strong>10 ngày dạy học</strong>. Giáo sư <strong>Russell Rumberger</strong> (Đại học California, Santa Barbara) còn đưa ra con số nặng hơn khi tổng hợp nhiều nghiên cứu: học sinh Mỹ thường mất khoảng <strong>ba tháng học tập môn đọc và toán</strong> sau mỗi lần đổi trường. Báo cáo của <strong>Government Accountability Office (Hoa Kỳ, 2010)</strong> cho biết 13% học sinh nước này đã đổi trường từ bốn lần trở lên trước khi hết lớp 8.</p>
<p>Nhưng đọc kỹ các nghiên cứu này thì sẽ thấy một điều quan trọng hơn con số. Grigg phát hiện mức thiệt hại <strong>không phụ thuộc vào lý do chuyển trường</strong> — chuyển vì bị buộc hay chuyển vì gia đình chủ động cũng cho kết quả tương tự. Và các tổng kết chính sách đều ghi nhận rằng việc chuyển trường <strong>có chuẩn bị, tự nguyện</strong> ít gây gián đoạn hơn, thậm chí có thể gắn với <strong>cải thiện kết quả học tập nếu nó đưa đứa trẻ đến một nơi có dịch vụ hỗ trợ tốt hơn</strong>.</p>
<p>Nói cách khác: cái quyết định kết quả không phải là <em>chuyển hay không chuyển</em>. Là <em>chuyển rồi có ai đỡ hay không</em>.</p>
<p>Nên tôi muốn đặt ngược câu hỏi cho anh chị: bảng tổng hợp kết quả học kỳ I vừa rồi cho thấy con đang hổng mấy phần? Và nếu cứ giữ nguyên đến hết năm, đến tháng 5 phần hổng đó sẽ thành bao nhiêu? Ở rất nhiều lớp học, không ai đo phần hổng đó cho anh chị cả. Một chỗ hổng không được gọi tên thì không ai lấp được — dù con ở lại hay chuyển đi.</p>

<h2 id="ho-tro-cua-truong">Trường Việt Anh hỗ trợ học sinh chuyển trường giữa năm thế nào?</h2>
<p>Chúng tôi xây chính sách này quanh đúng bốn phiền phức của phụ huynh. Bảy thành phần hỗ trợ, áp dụng cho học sinh chuyển vào giữa năm học:</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>#</th><th>Thành phần</th><th>Nội dung</th><th>Giải quyết vấn đề</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><strong>Hồ sơ tận nơi</strong></td><td>Gia đình ký một giấy uỷ quyền, nhân viên trường làm toàn bộ thủ tục với trường cũ và cơ quan quản lý. Phụ huynh không phải xin nghỉ buổi làm nào</td><td>Thủ tục</td></tr>
    <tr><td>2</td><td><strong>Học thử hai tuần</strong></td><td>Con đi học thật, ngồi lớp thật, ăn bán trú thật, trước khi gia đình ký bất cứ giấy tờ gì</td><td>Sợ chọn sai lần nữa</td></tr>
    <tr><td>3</td><td><strong>Bản đồ học tập trong 7 ngày đầu</strong></td><td>Chẩn đoán con hổng phần nào trong từng môn, có bản in giao tận tay gia đình. Miễn phí cho học sinh chuyển trường</td><td>Nỗi lo mơ hồ thành một tờ giấy có tên vấn đề</td></tr>
    <tr><td>4</td><td><strong>Lộ trình bù lấp 8 tuần</strong></td><td>Dựa trên Bản đồ học tập, con được kèm riêng đúng những phần hổng, miễn phí trong học kỳ đầu tiên</td><td>Sợ hụt chương trình</td></tr>
    <tr><td>5</td><td><strong>Người đỡ đầu 4 tuần</strong></td><td>Một giáo viên được chỉ định đồng hành, cộng một bạn cùng lớp làm &ldquo;người bạn đầu tiên&rdquo;. Gia đình nhận báo cáo vào thứ Sáu hằng tuần</td><td>Sợ con tổn thương</td></tr>
    <tr><td>6</td><td><strong>Học phí theo số tháng còn lại</strong></td><td>Không thu trọn năm, không thu phí ghi danh với học sinh chuyển giữa năm</td><td>Rào cản tài chính</td></tr>
    <tr><td>7</td><td><strong>Bảo chứng hoà nhập 4 tuần</strong></td><td>Trong 4 tuần học đầu tiên của con, nếu gia đình thấy giá trị nhận được chưa như kỳ vọng, trường hoàn 100% học phí đã đóng và hỗ trợ gia đình hoàn tất thủ tục rút hồ sơ. Điều kiện chuyên cần và phạm vi hoàn ghi ngay dưới bảng</td><td>Chuyển rủi ro từ gia đình sang trường</td></tr>
  </tbody>
</table>
</div>
<p>Thành phần số 5 không phải sáng kiến riêng của chúng tôi — nó trùng với đúng khuyến nghị mà các tổng kết nghiên cứu về học sinh chuyển trường đưa ra: <strong>kèm cặp bởi cả người lớn và bạn đồng trang lứa</strong> là biện pháp giảm tác động rõ rệt nhất.</p>

<h3>Điều kiện áp dụng của bảo chứng hoà nhập 4 tuần</h3>
<p>Thành phần số 7 là một cam kết có ràng buộc, nên tôi ghi rõ điều kiện ngay tại đây chứ không để trong chú thích cuối trang:</p>
<ul>
  <li><strong>Áp dụng cho học sinh mới</strong> — em nhập học lần đầu tại một cơ sở thuộc hệ thống Trường Việt Anh, bao gồm học sinh chuyển từ trường khác đến giữa năm. Học sinh đang học tại Việt Anh chuyển cơ sở hoặc chuyển khối trong cùng hệ thống không thuộc phạm vi chính sách này.</li>
  <li><strong>Mốc 4 tuần tính riêng cho từng học sinh</strong> — bắt đầu từ ngày con đi học đầu tiên thực tế, tương đương 20 ngày học, không tính theo lịch chung của cả trường.</li>
  <li><strong>Điều kiện chuyên cần:</strong> con đi học đúng giờ và tham gia tối thiểu <strong>18/20 ngày học (90% thời lượng)</strong>. Nếu con nghỉ nhiều hơn mức này vì lý do đặc biệt như ốm dài ngày, gia đình trao đổi trực tiếp với Phòng Tuyển sinh để nhà trường xem xét từng trường hợp cụ thể.</li>
  <li><strong>Phạm vi hoàn:</strong> 100% học phí đã đóng. Bảo hiểm y tế, tiền ăn, đồng phục, chi phí dã ngoại đã sử dụng hoặc đã đặt chỗ, và các dịch vụ đã dùng (xe đưa rước, câu lạc bộ, bán trú) không nằm trong phạm vi hoàn — đây là khoản chi cho dịch vụ hoặc quyền lợi đã phát sinh trên thực tế.</li>
  <li><strong>Thời gian nhận tiền:</strong> 7 ngày làm việc, tính từ ngày gia đình hoàn tất thủ tục rút hồ sơ, không tính từ ngày báo ý định.</li>
  <li><strong>Không bắt buộc phỏng vấn.</strong> Nhà trường có thể mời gia đình trao đổi ngắn để hiểu lý do và cải thiện chất lượng, nhưng việc tham gia không phải là điều kiện để được hoàn học phí.</li>
  <li><strong>Sau 4 tuần</strong>, chính sách này không còn áp dụng với học sinh đó; việc rút hồ sơ khi ấy theo quy định chung của nhà trường về thôi học và chuyển trường.</li>
</ul>
<p>Toàn văn điều khoản đăng công khai tại trang <a href="/chinh-sach/chinh-sach-hoan-hoc-phi-4-tuan-dau">Chính sách hoàn 100% học phí trong 4 tuần đầu</a>. Văn bản gốc có số hiệu, chữ ký và con dấu đăng tại trang <a href="/chinh-sach">Chính sách &amp; Văn bản công khai</a>. Khi có chênh lệch giữa bài viết này và trang điều khoản, trang điều khoản là văn bản có hiệu lực.</p>

<h2 id="hoa-nhap">Con mất bạn, mất thầy cô quen — làm sao để con hòa nhập?</h2>
<p>Ở Việt Anh, học sinh mới không được giao cho may rủi.</p>
<p>Trường có hệ thống lãnh đạo học sinh tên <strong>Hoa Tiêu</strong> (Student Leadership Council), trong đó nhóm <strong>Hoa tiêu Junior</strong> có một nhiệm vụ cụ thể: đón bạn mới. Không phải đón trong buổi chào cờ rồi thôi, mà là người ngồi cạnh trong tuần đầu, người chỉ chỗ nhà vệ sinh, chỗ để cặp, chỗ xếp hàng ăn trưa — những thứ nhỏ đến mức người lớn quên mất rằng chúng là toàn bộ nỗi sợ của một đứa trẻ trong ngày đầu tiên.</p>
<p>Cùng với đó là nhịp <a href="/he-thong-pdr"><strong>PDR — Plan – Do – Review</strong></a> (Lên kế hoạch – Thực hiện – Nhìn lại; ở mầm non là Plan – Do – Recall, tức Kể lại). Với học sinh mới, vòng PDR đầu tiên thường rất nhỏ: đặt một mục tiêu cho tuần này, cuối tuần ngồi lại xem đã làm được đến đâu, chỗ nào chệch, tuần sau đổi gì. Nhịp này là thứ giúp một đứa trẻ vừa đổi môi trường lấy lại cảm giác mình đang điều khiển việc học của mình, thay vì bị hoàn cảnh cuốn đi.</p>
<p>Tôi cũng muốn nói một điều mà phụ huynh ít khi nghe từ nhà trường: có hai kiểu &ldquo;con đã quen&rdquo;. Một là con thật sự có chỗ trong lớp. Hai là con đã quen với việc mình không có chỗ nào cả. Kiểu quen thứ hai mới là điều đáng lo, và nó không tự hết khi để thêm một năm.</p>

<h2 id="hoc-phi">Học phí tính thế nào khi chuyển giữa năm?</h2>
<p>Học sinh chuyển vào giữa năm <strong>chỉ đóng theo số tháng còn lại của năm học</strong>, không đóng trọn năm và không có phí ghi danh. Phần kèm bù lấp 8 tuần nằm trong học phí, không thu thêm.</p>
<p>Tôi không nói học phí Việt Anh rẻ. Năm học 2026–2027, <a href="/hoc-phi">học phí liên cấp lớp 1–12 tại TP.HCM</a> là 109,9–164,8 triệu đồng/năm tuỳ khối, chưa gồm tiền ăn và phí nội trú. Nhưng tôi đề nghị anh chị đặt con số đó cạnh một con số khác: mỗi tháng gia đình đang chi bao nhiêu cho các ca học thêm ngoài giờ, và mất bao nhiêu thời gian đưa đón cho những ca học đó?</p>
<p>Câu hỏi thật không phải học phí bao nhiêu, mà là số tiền ấy đổi được gì — và có ai đưa cho anh chị bằng chứng về cái &ldquo;đổi được&rdquo; đó không. Ở trường Việt Anh, tất cả những cái &ldquo;đổi được&rdquo; ấy đều rõ ràng minh bạch, đo đếm được trên cả 4 lĩnh vực phát triển (kiến thức, kỹ năng, phẩm chất, sức khoẻ) trong báo cáo định kỳ 3 lần/năm.</p>

<h2 id="nen-chuyen-hay-doi">Nên chuyển ngay hay đợi hết năm?</h2>
<p>Không có câu trả lời chung. Nhưng có vài dấu hiệu đáng để anh chị cân nhắc nghiêm túc thay vì hoãn:</p>
<ol>
  <li><strong>Con không còn kể chuyện trường lớp ở nhà nữa.</strong> Trẻ ngừng kể trước khi ngừng cố gắng.</li>
  <li><strong>Bảng tổng hợp học kỳ I cho thấy một môn tụt liên tục qua hai kỳ</strong>, và chưa ai đưa ra kế hoạch cụ thể để lấp.</li>
  <li><strong>Gia đình đang bù bằng học thêm</strong> — nghĩa là vấn đề đã được chuyển ra ngoài giờ học chứ chưa được giải quyết trong giờ học.</li>
  <li><strong>Con nói về bản thân bằng những câu kết luận:</strong> &ldquo;con dốt Toán&rdquo;, &ldquo;con học không vô&rdquo;. Đây là dấu hiệu về niềm tin, khó đảo ngược hơn điểm số.</li>
</ol>
<p>Và một sai lầm tôi thấy nhiều nhất: <strong>đợi &ldquo;hết năm rồi tính&rdquo; mà không đặt hạn cho chính mình</strong>. Một năm học trôi qua rất nhanh, và đến tháng 5 thì lý do để hoãn tiếp lại xuất hiện — thi cuối kỳ, rồi hè, rồi đầu năm học mới đã bận. Nếu anh chị quyết định chờ, hãy chờ có ngày: chọn một mốc cụ thể, ghi vào lịch, và đến ngày đó ngồi xuống nhìn lại dữ liệu chứ không nhìn lại cảm giác.</p>
<p>Ngược lại, nếu con đang ổn — có bạn thật, có thầy cô mà con quý, kết quả đi ngang hoặc đi lên — thì đổi trường giữa năm là một cái giá không cần trả. Các nghiên cứu ở trên nói rõ: chuyển trường luôn có chi phí. Chỉ nên trả chi phí đó khi thứ nhận lại lớn hơn.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Chuyển trường giữa năm học có phải chờ đến hết học kỳ I không?</h3>
<p>Theo Thông tư 15/2026/TT-BGDĐT có hiệu lực từ 10/5/2026, quy định hiện hành không còn khung &ldquo;chỉ chuyển trong hè hoặc khi kết thúc học kỳ I&rdquo; như Quyết định 51/2002 trước đây. Thông tư mới quy định theo thời hạn giải quyết hồ sơ. Tuy vậy, hướng dẫn của từng địa phương có thể chưa cập nhật đồng bộ, nên gia đình cần hỏi trực tiếp trường nơi định chuyển đến.</p>
<h3>Hồ sơ chuyển trường năm 2026 gồm những gì?</h3>
<p>Ba loại: đơn xin chuyển trường của học sinh hoặc cha mẹ học sinh; bảng tổng hợp kết quả đánh giá rèn luyện và học tập; và kế hoạch giáo dục cá nhân nếu là học sinh khuyết tật. Đơn nộp được qua Cổng dịch vụ công, trực tuyến, trực tiếp hoặc bưu điện. Học bạ bản chính và giấy giới thiệu chuyển trường không còn là thành phần hồ sơ riêng phải tự đi xin.</p>
<h3>Thủ tục chuyển trường mất bao lâu?</h3>
<p>Trường nơi chuyển đến phải trả lời trong tối đa 5 ngày làm việc nếu chuyển trong tỉnh, 8 ngày làm việc nếu từ tỉnh khác. Trường nơi chuyển đi trả hồ sơ trong tối đa 3 ngày làm việc. Trường tiếp nhận có tối đa 5 ngày làm việc để trao đổi và xếp lớp. Tổng cộng khoảng hai tuần làm việc nếu hồ sơ đầy đủ.</p>
<h3>Con tôi có bị hụt kiến thức khi chuyển giữa năm không?</h3>
<p>Có độ vênh về tiến độ giữa các trường, và nghiên cứu quốc tế ghi nhận việc chuyển trường thường kéo theo thiệt hại học tập. Nhưng mức thiệt hại phụ thuộc lớn vào việc trường mới có đo và lấp chỗ hổng cho con hay không. Ở Việt Anh, con làm Bản đồ học tập trong 7 ngày đầu và được kèm riêng theo lộ trình bù lấp 8 tuần, miễn phí trong học kỳ đầu tiên.</p>
<h3>Nếu con chuyển sang mà không hoà nhập được thì sao?</h3>
<p>Trường Việt Anh hoàn 100% học phí trong 4 tuần học đầu tiên của con, tính từ ngày đi học đầu tiên thực tế, áp dụng cho học sinh mới — gồm cả học sinh chuyển trường giữa năm. Điều kiện: con đi học đúng giờ và đủ tối thiểu 18/20 ngày học. Bảo hiểm y tế, tiền ăn, đồng phục, dã ngoại và dịch vụ đã sử dụng không thuộc phạm vi hoàn. Tiền về trong 7 ngày làm việc kể từ ngày rút hồ sơ.</p>
<h3>Học phí có phải đóng trọn năm khi chuyển vào giữa năm không?</h3>
<p>Không. Học sinh chuyển giữa năm chỉ đóng theo số tháng còn lại của năm học và không phải đóng phí ghi danh. Phần kèm bù lấp kiến thức 8 tuần dựa trên Bản đồ học tập cũng nằm trong học phí, không thu thêm. Gia đình nên xác nhận mức học phí theo khối lớp với phòng tuyển sinh trước khi ký.</p>

<h2 id="ket-luan">Điều tôi mong anh chị mang theo</h2>
<p>Trong tất cả những gì viết ở trên, phần tôi muốn anh chị nhớ nhất không phải là bảy thành phần hay các mốc ngày làm việc.</p>
<p>Là câu này: một đứa trẻ không tụt lại vì đổi trường. Nó tụt lại vì có một chỗ hổng mà suốt nhiều tháng không ai gọi tên ra, không ai đo, không ai lấp. Chỗ hổng đó không quan tâm con đang ngồi ở lớp nào.</p>
<p>Vậy nên trước khi hỏi &ldquo;có nên chuyển trường không&rdquo;, hãy hỏi câu dễ hơn và quan trọng hơn: <strong>suốt học kỳ vừa rồi, đã có ai đưa cho anh chị một tờ giấy ghi rõ con đang đứng ở đâu trong từng môn chưa?</strong></p>
<p>Nếu câu trả lời là chưa, thì đó mới là vấn đề cần xử lý — dù bằng cách nào.</p>
<p><strong>Anh chị đặt một buổi tham quan trường đi.</strong> Đến tận nơi, đi vào giờ học thật, nhìn một lớp đang học và hỏi thẳng chúng tôi cách trường đo chỗ hổng của một học sinh mới. Mười lăm phút nhìn tận mắt cho anh chị nhiều thông tin hơn cả tháng đọc trên mạng. Nếu không đến, thì đến tháng 5 anh chị vẫn sẽ đứng ở đúng chỗ đang đứng hôm nay, chỉ là con đã mất thêm một tuổi. Trường đón anh chị Thứ 2 – Thứ 7, 07:00–19:00; Chủ Nhật ngoài giờ làm việc nhưng hẹn trước vẫn tham quan được — <a href="/dat-lich-tham-quan">đặt lịch tham quan tại đây</a>.</p>

<p><em>Tác giả: <strong>Nguyễn Mạnh Dương</strong> — Nhà sáng lập &amp; Chủ tịch hệ thống giáo dục K-12 Việt Anh (từ 2011). 15 năm thiết kế môi trường học tập chủ động cho trẻ 0–18 tuổi. Cập nhật lần cuối: 04/09/2026. Nguồn tham khảo: Thông tư 15/2026/TT-BGDĐT ban hành Điều lệ trường tiểu học, THCS và THPT (ban hành 24/3/2026, hiệu lực 10/5/2026) — Bản tin Xây dựng chính sách, Cổng TTĐT Chính phủ; Quyết định 51/2002/QĐ-BGDĐT và Thông tư 50/2021/TT-BGDĐT (đã được thay thế); Hướng dẫn thủ tục chuyển trường của Sở GD&amp;ĐT TP.HCM, 28/7/2025; Jeffrey Grigg, &ldquo;School Enrollment Changes and Student Achievement Growth&rdquo;, Sociology of Education, 10/2012 (dẫn theo PACE); Russell Rumberger (UC Santa Barbara) và Government Accountability Office (2010), dẫn theo Education Week, 8/2016; Chính sách hoàn 100% học phí trong 4 tuần đầu — Trường Việt Anh, điều khoản áp dụng từ năm học 2026–2027.</em></p>
`.trim();

const post = {
  title: "Chuyển trường giữa năm học: thủ tục mới và cách con theo kịp",
  slug: "chuyen-truong-giua-nam-hoc",
  status: STATUS,
  excerpt: "Từ 10/5/2026, hồ sơ chuyển trường còn 3 loại giấy, giải quyết trong 5–8 ngày làm việc. Thủ tục từng bước và 7 hỗ trợ của Việt Anh cho học sinh chuyển giữa năm.",
  content,
  published_at: "2026-09-04T09:00:00",
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
  if (!UPDATE) { console.log(`Bài đã tồn tại (id=${existing.data[0].id}, status=${existing.data[0].status}). Dùng --update để cập nhật.`); process.exit(0); }
  const { status, published_at, ...patch } = post;
  const r = await req('PATCH', `/items/posts/${existing.data[0].id}`, patch);
  console.log(`Đã CẬP NHẬT nội dung bài id=${r.data.id} (giữ nguyên status) — /blog/${r.data.slug}`);
} else {
  const r = await req('POST', '/items/posts', post);
  console.log(`Đã TẠO bài id=${r.data.id}, status=${r.data.status} — /blog/${r.data.slug}`);
}
