/**
 * Tạo bài blog "AI Powered School" trên Directus.
 * Chạy: node scripts/create-post-ai-powered-school.mjs
 *       node scripts/create-post-ai-powered-school.mjs --update   (cập nhật nếu đã tồn tại)
 */

const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || 'tva_0b80f9b6cc9c494d98faf0a2a1a966e7').trim();
const UPDATE = process.argv.includes('--update');

const IMG = {
  hero: 'https://media.truongvietanh.com/images/ai/ai-powered-school-hero.webp',
  pioneer: 'https://media.truongvietanh.com/images/ai/van-hoa-tien-phong-timeline.webp',
  framework: 'https://media.truongvietanh.com/images/ai/ai-mindset-hoc-sinh.webp',
  pillars: 'https://media.truongvietanh.com/images/ai/5-tru-cot-ai-education.webp',
  application: 'https://media.truongvietanh.com/images/ai/ai-application-vs-game.webp',
};

function fig(src, alt, caption) {
  return `<figure><img src="${src}" alt="${alt}" loading="lazy" />` +
    (caption ? `<figcaption>${caption}</figcaption>` : '') + `</figure>`;
}

const content = `
<p style="font-size:1.15rem;font-weight:700;color:#26275D;">Làm chủ AI — làm chủ tương lai.</p>

<blockquote><strong>Featured snippet:</strong> Từ năm học 2026-2027, Trường Việt Anh chính thức trở thành <strong>AI Powered School đầu tiên của Việt Nam</strong>, triển khai chương trình AI Education toàn diện cho cấp THCS và THPT theo khung năng lực AI của UNESCO (2024) và 16 kỹ năng cốt lõi WEF Davos 2025. Đây là biểu hiện mới nhất của hơn một thập kỷ văn hoá tiên phong tại Việt Anh — không phải chuyển đổi theo trend, mà là bước tiếp theo của hành trình luôn đi trước.</blockquote>

<h2>Tóm tắt nhanh — 5 điều phụ huynh cần biết</h2>
<ul>
  <li><strong>Việt Anh là AI Powered School đầu tiên của Việt Nam</strong> — không phải lần đầu Việt Anh tiên phong: từ Highscope cho mầm non, Oxford International cho tiểu học, đến cam kết IELTS 6.0+ và tuyển thẳng ĐH Birmingham City — văn hoá tiên phong là DNA, AI là biểu hiện mới nhất.</li>
  <li><strong>Triển khai theo chuẩn UNESCO + WEF</strong> — không phụ thuộc một hãng công nghệ. Cả giáo viên lẫn học sinh đều được đào tạo theo khung năng lực AI của UNESCO (công bố 9/2024).</li>
  <li><strong>5 trụ cột AI Education</strong> — AI Mastery, AI Mindset, AI Ethics, AI Application, Human in the Loop. Mỗi trụ cột có triết lý và lộ trình cụ thể.</li>
  <li><strong>Có thêm AI, học sinh có thêm thời gian, không mất đi</strong> — AI giúp học sâu hơn, cá nhân hoá hơn, nhanh hơn — để dành thời gian cho thể thao, gia đình, hoạt động xã hội.</li>
  <li><strong>Bắt đầu năm học 2026-2027</strong> — triển khai chính thức từ tháng 9/2026 tại trường Việt Anh Gò Vấp + Bình Tân, sau đó nhân rộng toàn hệ thống.</li>
</ul>

${fig(IMG.hero, 'Học sinh Trường Việt Anh tương tác cùng AI — AI Powered School đầu tiên của Việt Nam', 'Trường Việt Anh — AI Powered School đầu tiên của Việt Nam: học sinh chủ động làm chủ AI để học sâu hơn và nhanh hơn.')}

<h2 id="boi-canh">1. Bối cảnh: Vì sao AI Education trở thành cấp thiết</h2>
<p>Theo Báo cáo <em>Future of Jobs 2025</em> của Diễn đàn Kinh tế Thế giới (công bố tại Davos tháng 1/2025), trong vòng 5 năm tới, <strong>39% kỹ năng cốt lõi</strong> của người lao động sẽ thay đổi, và AI cùng Big Data trở thành kỹ năng có nhu cầu tăng trưởng nhanh nhất toàn cầu (WEF, 2025).</p>
<p>Cùng thời điểm, UNESCO công bố khung năng lực AI dành cho học sinh và giáo viên (tháng 9/2024) — lần đầu tiên có một bộ chuẩn quốc tế về việc nhà trường nên dạy gì, đào tạo giáo viên ra sao trong thời đại AI.</p>
<p>Tại Việt Nam, nhu cầu của phụ huynh đã rõ rệt: theo khảo sát của HSBC (<em>Quality of Life Report 2024</em>), <strong>68% phụ huynh Việt Nam</strong> lo ngại về tác động của AI lên nghề nghiệp tương lai của con — cao hơn trung bình khu vực châu Á (54%). Nhưng phần lớn các trường K-12 tại Việt Nam vẫn dạy AI như một môn học rời rạc — chưa tích hợp vào triết lý giáo dục cốt lõi.</p>
<p>Đây chính là khoảng trống mà Trường Việt Anh chính thức bước vào từ năm học 2026-2027.</p>

${fig(IMG.application, 'So sánh: dùng AI để học tập hiệu quả so với nghiện game và lướt mạng vô thức', 'Cùng một chiếc màn hình, hai tương lai khác nhau: dùng AI để học sâu, tiết kiệm thời gian và mở rộng tương lai — thay vì nghiện game, lướt mạng vô thức.')}

<h2 id="van-hoa-tien-phong">2. Văn hoá tiên phong — DNA của Việt Anh</h2>
<p>Trước khi nói về AI, cần hiểu vì sao Việt Anh là người đi đầu. Hơn một thập kỷ qua, Việt Anh đã liên tục là trường đầu tiên trong nhiều xu hướng giáo dục lớn:</p>
<div class="blog-table-wrap"><table><thead><tr><th>Cột mốc</th><th>Hành động tiên phong</th></tr></thead><tbody>
  <tr><td>Mầm non</td><td>Tiên phong áp dụng triết lý Highscope và Responsive Classroom vào Việt Nam — hai phương pháp giáo dục mầm non hàng đầu thế giới</td></tr>
  <tr><td>Tiểu học</td><td>Một trong những trường đầu tiên triển khai Oxford International Curriculum kết hợp CLIL English (Content and Language Integrated Learning)</td></tr>
  <tr><td>THCS</td><td>Tích hợp 16 kỹ năng thế kỷ 21 ngay khi WEF công bố — bao gồm DQ (Digital Intelligence Quotient), Digital Technology, AI Education, Lãnh đạo bản thân, Grit, SteamE</td></tr>
  <tr><td>THPT</td><td>Cam kết đầu ra IELTS 6.0+ với học sinh nhập học từ lớp 9 và thực thi đúng chương trình — tỷ lệ thực tế trên 90%</td></tr>
  <tr><td>2026</td><td>Tuyển thẳng ĐH Birmingham City (Vương quốc Anh) — thoả thuận hợp tác mới năm 2026</td></tr>
  <tr><td>Phương pháp</td><td>Coaching cá nhân hoá hàng tuần có minh chứng cụ thể — không cam kết suông</td></tr>
  <tr><td>2026-2027</td><td>AI Powered School đầu tiên Việt Nam — biểu hiện mới nhất của văn hoá tiên phong</td></tr>
</tbody></table></div>
<p>Nhìn vào danh sách này, một điều rõ ràng: Việt Anh không "ăn theo trend". Khi một xu hướng giáo dục mới xuất hiện trên thế giới, Việt Anh là người đầu tiên nghiên cứu và triển khai.</p>

${fig(IMG.pioneer, 'Dòng thời gian văn hoá tiên phong của Trường Việt Anh: Highscope → Oxford → IELTS → Birmingham City → AI Powered', 'Hơn một thập kỷ tiên phong: Highscope → Oxford International → 16 kỹ năng TK21 → cam kết IELTS → Birmingham City → AI Powered School.')}

<h2 id="ai-la-ket-qua">3. AI là kết quả, không phải cái gốc</h2>
<p>Đây là nguyên tắc cốt lõi mà chúng tôi muốn phụ huynh hiểu rõ. <strong>Trường Việt Anh không dựa vào AI.</strong> AI là một kết quả tự nhiên của văn hoá liên tục phát triển, liên tục tiên phong đã có trong DNA Việt Anh từ ngày thành lập.</p>
<p>Nếu Việt Anh đột nhiên gọi mình là "trường AI", đó là dấu hiệu của một quyết định marketing thiếu chiều sâu. Nhưng khi Việt Anh tiếp tục bổ sung AI Education vào chuỗi tiên phong dài hơn 10 năm — Highscope → Oxford International → 16 kỹ năng TK21 → IELTS commit → Birmingham City → AI Powered — thì đây là sự liền mạch của một văn hoá, không phải bước nhảy.</p>
<p>Đó là lý do chúng tôi dùng tagline <strong>"Lãnh đạo AI đầu tiên của Việt Nam"</strong> — với hai nghĩa cùng đắt giá:</p>
<ul>
  <li>Trường lãnh đạo trong giáo dục AI tại Việt Nam (institutional leadership)</li>
  <li>Học sinh trở thành lãnh đạo trong thời đại AI (personal leadership)</li>
</ul>
<blockquote>"Chúng tôi không thay đổi để theo trend. Chúng tôi đơn giản là luôn đi trước."</blockquote>

<h2 id="nen-tang-hoc-thuat">4. Nền tảng học thuật: UNESCO + WEF Davos 2025</h2>
<p>Chương trình AI Education tại Việt Anh không phải sản phẩm marketing nội bộ. Nó được xây dựng trên hai khung tham chiếu quốc tế hàng đầu thế giới.</p>

${fig(IMG.framework, 'Học sinh Trường Việt Anh phát triển tư duy AI theo khung UNESCO và 16 kỹ năng WEF', 'AI Mindset theo chuẩn UNESCO + WEF Davos 2025: học sinh tư duy phản biện và làm việc cùng AI, không bị AI làm thay.')}

<h3>Khung 1 — UNESCO AI Competency Framework (2024-2025)</h3>
<p>Tháng 9/2024, UNESCO công bố hai văn bản chính thức:</p>
<ul>
  <li><strong>AI Competency Framework for Teachers</strong> — khung năng lực AI cho giáo viên</li>
  <li><strong>AI Competency Framework for Students</strong> — khung năng lực AI cho học sinh</li>
</ul>
<p>Việt Anh triển khai cả hai khung này:</p>
<ul>
  <li><strong>Đối với giáo viên:</strong> đào tạo theo UNESCO Teacher Framework — đảm bảo mỗi giáo viên có năng lực AI literacy chuẩn quốc tế trước khi đứng lớp.</li>
  <li><strong>Đối với học sinh:</strong> chương trình học theo UNESCO Student Framework — đảm bảo mỗi học sinh phát triển năng lực AI theo chuẩn UNESCO ngay từ THCS.</li>
</ul>
<p><strong>Vì sao chúng tôi chọn UNESCO làm nền tảng?</strong> Bởi vì UNESCO là tổ chức giáo dục quốc tế trung tính, không phụ thuộc vào bất kỳ hãng công nghệ nào. Học sinh Việt Anh không trở thành "nhân lực của Microsoft" hay "người dùng của OpenAI" — mà trở thành công dân toàn cầu có năng lực AI đạt chuẩn UNESCO, được công nhận trên toàn thế giới và không bị vendor lock-in khi công nghệ thay đổi.</p>

<h3>Khung 2 — 16 kỹ năng cốt lõi WEF Davos 2025</h3>
<p>Báo cáo <em>Future of Jobs Report 2025</em> cập nhật 16 kỹ năng cốt lõi cho lực lượng lao động 2030, với những thay đổi quan trọng so với phiên bản 2020:</p>
<ul>
  <li><strong>Tăng trọng số:</strong> AI và Big Data, Khả năng phục hồi (Resilience), Tư duy phân tích</li>
  <li><strong>Bổ sung mới:</strong> AI Literacy, Tư duy hệ thống (Systems thinking)</li>
  <li><strong>Vẫn quan trọng:</strong> Tư duy sáng tạo, Học tập suốt đời, Lãnh đạo</li>
</ul>
<p>Việt Anh tích hợp toàn bộ 16 kỹ năng WEF 2025 vào chương trình THCS-THPT, đảm bảo mỗi học sinh tốt nghiệp đều sẵn sàng cho lực lượng lao động 2030.</p>

<h2 id="nam-tru-cot">5. Năm trụ cột AI Education tại Việt Anh</h2>

${fig(IMG.pillars, 'Năm trụ cột AI Education tại Trường Việt Anh: Mastery, Mindset, Ethics, Application, Human in the Loop', 'Năm trụ cột AI Education tại Việt Anh: AI Mastery · AI Mindset · AI Ethics · AI Application · Human in the Loop.')}

<h3>Trụ cột 1 — AI MASTERY: Làm chủ công cụ</h3>
<p>Học sinh Việt Anh không chỉ biết dùng AI, mà biết khi nào nên dùng và khi nào không. Họ học cách prompt thông minh, cross-check kết quả AI, tận dụng AI để tăng năng suất học tập một cách có chủ đích — chứ không phụ thuộc.</p>

<h3>Trụ cột 2 — AI MINDSET: Tư duy thời đại mới</h3>
<p>Phát triển tư duy phản biện, sáng tạo và đạo đức để làm việc cùng AI — không phải bị AI làm thay. Điểm nhấn: DQ (Digital Intelligence Quotient), kỹ năng phân biệt thông tin thật/giả, suy luận độc lập trong môi trường nội dung số.</p>

<h3>Trụ cột 3 — AI ETHICS: Đạo đức và trách nhiệm</h3>
<p>Hiểu rõ giới hạn của AI, biết phân biệt thật-giả, biết bảo vệ bản thân và cộng đồng trong môi trường số. Đây là phần cốt lõi của khung UNESCO — AI ethics không phải lý thuyết phụ, mà là kỹ năng sống thiết yếu.</p>

<h3>Trụ cột 4 — AI APPLICATION: Ứng dụng thực tế ⭐</h3>
<p>Đây là trụ cột nhấn mạnh nhất, vì là điểm khác biệt cốt lõi của Việt Anh:</p>
<blockquote>"Không chỉ học VỀ AI — mà DÙNG AI VÀO việc học."</blockquote>
<p><strong>Mục tiêu cụ thể:</strong></p>
<ul>
  <li><strong>Học sâu hơn</strong> — AI giúp đào sâu mọi nội dung đến mức cá nhân hóa từng học sinh</li>
  <li><strong>Học cá nhân hoá hơn</strong> — mỗi em một lộ trình, một tốc độ, một phong cách phù hợp với năng lực và mục tiêu</li>
  <li><strong>Học nhiều hơn trong thời gian ngắn hơn</strong> — hiệu suất tăng đáng kể so với phương pháp truyền thống</li>
</ul>
<p>Và điều quan trọng nhất — đây là điểm phá tan nỗi sợ "AI = nghiện máy, mất kết nối" mà nhiều phụ huynh đang lo: việc sử dụng AI không làm mất đi kết nối với con người và thời gian cho bản thân. Ngược lại, việc tăng hiệu quả học tập giúp học sinh thực sự có thêm thời gian cho nghỉ ngơi, luyện tập thể thao, và các hoạt động xã hội cùng nhau.</p>
<p><strong>AI tại Việt Anh là công cụ giải phóng thời gian sống, không phải chiếm dụng nó.</strong></p>

<h3>Trụ cột 5 — HUMAN IN THE LOOP: Học sinh trong vòng quyết định</h3>
<blockquote>"AI làm việc — học sinh chỉ đạo. Mọi outcome cuối cùng đều có sự tham gia, đánh giá, và quyết định của con người."</blockquote>
<p>"Human in the Loop" (HITL) là một khái niệm kỹ thuật chuyên ngành AI mà Việt Anh đưa vào triết lý giáo dục:</p>
<ul>
  <li>Không có AI nào hoạt động độc lập trong giáo dục Việt Anh</li>
  <li>Học sinh luôn là "người trong vòng" của mọi quy trình — verify kết quả, override khi cần, redirect khi muốn</li>
  <li>AI là cánh tay nối dài, không phải bộ não thay thế</li>
</ul>
<p>Bốn trụ cột nền tảng của giáo dục Việt Anh — Kiến thức, Tiếng Anh, Kỹ năng, Thể chất — vẫn nguyên vẹn. AI chỉ làm tăng hiệu quả từng trụ cột, không thay thế bất kỳ trụ cột nào.</p>

<h2 id="diem-dot-pha">6. Điểm đột phá: AI Application + Human in the Loop</h2>
<p>Hai trụ cột 4 và 5 là điểm đột phá thực sự của AI Powered School Việt Nam, khác biệt với mọi chương trình "dạy AI" khác tại Việt Nam.</p>
<h3>Quy trình HITL chuẩn cho mọi kết quả</h3>
<p>Mọi đầu ra học tập có sự tham gia của AI tại trường Việt Anh đều phải qua quy trình 4 bước:</p>
<ol>
  <li>AI hỗ trợ tạo ra phác thảo ban đầu</li>
  <li>Học sinh đánh giá, phản biện, chỉnh sửa</li>
  <li>Giáo viên review và đặt câu hỏi sâu</li>
  <li>Học sinh quyết định outcome cuối cùng</li>
</ol>
<p>Quy trình này đảm bảo học sinh không "copy AI" — mà thực sự học từ AI, sau đó thể hiện tư duy của bản thân.</p>

<h2 id="lo-trinh">7. Lộ trình triển khai 2026-2027</h2>
<div class="blog-table-wrap"><table><thead><tr><th>Thời gian</th><th>Hoạt động chính</th></tr></thead><tbody>
  <tr><td>Tháng 5-6/2026</td><td>Hoàn thiện chương trình AI Education theo khung UNESCO. Đào tạo giáo viên (4-6 tuần intensive). Chuẩn bị thiết bị và license AI tools.</td></tr>
  <tr><td>Tháng 7/2026</td><td>Triển khai AI Education trong Trại hè Lion Camp.</td></tr>
  <tr><td>Tháng 8/2026</td><td>Ra mắt chính thức "AI Powered School" năm học mới, dạy AI Education trong học kỳ Foundation.</td></tr>
  <tr><td>Tháng 9/2026</td><td>Khai giảng năm học mới với AI Education chính thức cho cấp THCS-THPT.</td></tr>
  <tr><td>Tháng 10-12/2026</td><td>Triển khai Time Freedom Report đầu tiên. Case study tiến độ học sinh sau 3 tháng.</td></tr>
  <tr><td>Năm 2027</td><td>Mở rộng AI Powered ở nhiều lĩnh vực hoạt động và ứng dụng. Báo cáo năm 1 và điều chỉnh.</td></tr>
</tbody></table></div>

<h2 id="ai-phu-hop">8. Ai phù hợp với chương trình AI Powered School?</h2>
<p>Chương trình AI Powered tại Việt Anh đặc biệt phù hợp với những phụ huynh có tinh thần lãnh đạo, cấp tiến, muốn con trở thành một người hiệu suất cao, làm chủ tương lai. Cụ thể:</p>
<ul>
  <li>Phụ huynh là lãnh đạo / chủ doanh nghiệp / quản lý cấp cao trong các ngành tăng trưởng</li>
  <li>Hiểu giá trị của hiệu suất (productivity) và mong con biết dùng đúng công cụ thay vì học vô vọng</li>
  <li>Đặt mục tiêu cao cho con: không chỉ "đậu ĐH" mà "trở thành người làm chủ cuộc đời"</li>
  <li>Sẵn sàng đầu tư cho tương lai con như một investment, không phải chi phí</li>
</ul>
<p>Nếu anh chị thấy mình trong mô tả này, đây có thể là chương trình phù hợp với gia đình mình.</p>

<h2 id="so-sanh">9. So sánh với các trường khác tại Việt Nam</h2>
<div class="blog-table-wrap"><table><thead><tr><th>Tiêu chí</th><th>Việt Anh AI Powered</th><th>Trường tích hợp AI khác</th><th>Trường truyền thống</th></tr></thead><tbody>
  <tr><td>Khung tham chiếu</td><td>UNESCO + WEF Davos 2025</td><td>Tự thiết kế hoặc theo 1 hãng</td><td>Không có</td></tr>
  <tr><td>Đào tạo giáo viên</td><td>Theo UNESCO Teacher Framework</td><td>Tuỳ trường</td><td>Không có chương trình AI cho GV</td></tr>
  <tr><td>Triết lý cốt lõi</td><td>Human in the Loop + AI Application</td><td>"Dạy AI" như môn riêng</td><td>AI chỉ trong môn Tin học</td></tr>
  <tr><td>Tích hợp 16 kỹ năng WEF</td><td>Toàn bộ</td><td>Một phần</td><td>Không</td></tr>
  <tr><td>Time Freedom Report</td><td>Có</td><td>Không</td><td>Không</td></tr>
  <tr><td>Lịch sử tiên phong</td><td>10+ năm (Highscope → Oxford → IELTS commit → AI)</td><td>Mới triển khai</td><td>Không có</td></tr>
  <tr><td>Cam kết đầu ra</td><td>IELTS 6.0+ + Birmingham City pathway</td><td>Tuỳ trường</td><td>Đầu ra phụ thuộc HS</td></tr>
</tbody></table></div>
<p><strong>Nhận định khách quan:</strong> Trên thị trường K-12 tại Việt Nam hiện tại, chưa có trường nào tự tuyên bố là "AI Powered School" với nền tảng UNESCO chính thức. Việt Anh là first-mover ở vị trí này từ năm học 2026-2027.</p>

<h2 id="faq">10. FAQ — Hỏi đáp về AI Powered School</h2>

<h3>AI Powered School của Việt Anh có nghĩa là học sinh suốt ngày trên máy tính không?</h3>
<p>Không. AI Powered có nghĩa là dùng AI để tăng hiệu suất học tập, không phải để AI học thay hoặc dùng AI để đỡ phải học (như nhiều người lầm tưởng), từ đó học sinh có thêm thời gian cho thể thao, gia đình, bạn bè, hoạt động xã hội.</p>

<h3>Giáo viên Việt Anh có thay bằng AI không?</h3>
<p>Không. Theo nguyên tắc Human in the Loop, AI là cánh tay nối dài cho giáo viên — không thay thế. Mọi outcome học tập đều có sự review của giáo viên trước khi học sinh quyết định cuối cùng.</p>

<h3>Học sinh có dùng AI để gian lận không?</h3>
<p>Việt Anh áp dụng quy trình 4 bước HITL cho mọi bài tập có AI: AI tạo phác thảo → HS phản biện → GV đặt câu hỏi sâu → HS quyết định outcome. Quy trình này đảm bảo HS thực sự học từ AI, không "copy AI".</p>

<h3>Chương trình AI Powered áp dụng cho cấp học nào?</h3>
<p>Năm học 2026-2027 triển khai chính thức cho THCS và THPT tại Việt Anh Gò Vấp và Bình Tân. Cấp Mầm non và Tiểu học vẫn được học tích hợp AI, nhưng không phải trực tiếp qua màn hình, mà bằng những nội dung, công cụ được giáo viên tạo ra với sự hỗ trợ của AI.</p>

<h3>Việt Anh có hợp tác với hãng AI nào không?</h3>
<p>Việt Anh chọn UNESCO làm nền tảng chính — cố ý không phụ thuộc một hãng cụ thể (như Microsoft, OpenAI, Google). Học sinh sẽ được học cách sử dụng nhiều AI tools khác nhau theo nguyên tắc UNESCO.</p>

<h3>Học phí có tăng vì AI Powered không?</h3>
<p>Việt Anh cam kết không tăng học phí đột biến vì chương trình AI. Chi tiết học phí năm học 2026-2027 vui lòng liên hệ phòng tuyển sinh.</p>

<h3>Học sinh từ trường khác chuyển sang Việt Anh có theo kịp chương trình AI không?</h3>
<p>Có. Việt Anh có chương trình hỗ trợ AI Education dành cho học sinh chuyển từ trường khác — đảm bảo các em bắt nhịp với chuẩn UNESCO trong 1-2 tháng đầu.</p>

<h3>Phụ huynh không biết AI có hỗ trợ con học được không?</h3>
<p>Việt Anh có chương trình huấn luyện AI Education cho phụ huynh miễn phí — giúp phụ huynh hiểu cách đồng hành cùng con thời đại AI.</p>

<h2 id="dang-ky">11. Đăng ký tham quan</h2>
<p>Tương lai bắt đầu từ hôm nay với AI trong tầm tay. Hãy chat với chúng tôi để nhận lịch sự kiện của trường Việt Anh, và nhìn thấy cách học sinh trưởng thành trong thời đại AI.</p>
<p><a href="/tuyen-sinh"><strong>ĐĂNG KÝ THAM QUAN MIỄN PHÍ →</strong></a></p>

<h2>Về tác giả</h2>
<p><strong>Nguyễn Mạnh Dương</strong> là Chủ tịch Hệ thống Trường Việt Anh — bao gồm các cơ sở Việt Anh Gò Vấp, Bình Tân, MGIS Mekong Xanh (Rạch Giá), Mầm non Nhân Lễ và Mầm non - Tiểu học Thái Sơn (Cần Giuộc). Anh trực tiếp chỉ đạo lộ trình chuyển đổi AI Powered School theo khung UNESCO và là tác giả của triết lý giáo dục "Coaching cá nhân hóa hàng tuần có minh chứng cụ thể" được áp dụng tại toàn hệ thống.</p>

<h2>Nguồn tham khảo</h2>
<ul>
  <li>UNESCO. (2024). <em>AI Competency Framework for Teachers.</em></li>
  <li>UNESCO. (2024). <em>AI Competency Framework for Students.</em></li>
  <li>World Economic Forum. (2025). <em>Future of Jobs Report 2025.</em></li>
  <li>HSBC. (2024). <em>Quality of Life Report 2024 — Asia Education Trends.</em></li>
  <li>McKinsey Global Institute. (2024). <em>The State of AI in Education.</em></li>
  <li>Stanford HAI. (2024). <em>AI Index Report 2024.</em></li>
</ul>
`.trim();

const post = {
  title: 'Trường Việt Anh — AI Powered School Đầu Tiên Của Việt Nam: Lộ Trình 2026-2027 Theo Khung UNESCO',
  slug: 'truong-viet-anh-ai-powered-school-dau-tien-viet-nam',
  status: 'published',
  excerpt: 'Trường Việt Anh chính thức trở thành AI Powered School đầu tiên của Việt Nam từ năm học 2026-2027 — triển khai theo khung năng lực AI của UNESCO và 16 kỹ năng WEF Davos 2025.',
  content,
  published_at: '2026-04-28T08:00:00',
  category: 'tin-tuc',
  featured_image: IMG.hero,
};

async function req(method, endpoint, body) {
  const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
    method,
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${endpoint}: ${res.status} ${text.slice(0, 300)}`);
  return text ? JSON.parse(text) : null;
}

const existing = await req('GET', `/items/posts?fields=id,slug&filter%5Bslug%5D%5B_eq%5D=${post.slug}`);
if (existing.data.length) {
  if (!UPDATE) {
    console.log(`Bài đã tồn tại (id=${existing.data[0].id}). Chạy với --update để cập nhật.`);
    process.exit(0);
  }
  const r = await req('PATCH', `/items/posts/${existing.data[0].id}`, post);
  console.log(`Đã CẬP NHẬT bài id=${r.data.id} — /blog/${r.data.slug}`);
} else {
  const r = await req('POST', '/items/posts', post);
  console.log(`Đã TẠO bài id=${r.data.id} — /blog/${r.data.slug}`);
}
