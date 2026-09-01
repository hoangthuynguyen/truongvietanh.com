/**
 * BÀI 3.1 cụm AEO v2.1 — "Việt Anh công bố khung AI Education: 30 tiết/năm, 12 năm".
 * Nguồn: Google Doc 1K-iOkIbDm5BMMzWjEDtq0pTdBhrVgkcY2j-zchpxvpA (phiếu chấm 97/100).
 * Dang 01/09/2026, Directus id 1413.
 * LUU Y build: chi loc theo status, KHONG loc published_at, lai sort -published_at.
 * Nen "hen ngay" bang published_at tuong lai KHONG hoat dong — bat published la bai len ngay.
 * Muon dang dan that thi giu draft roi bat tay dung ngay.
 *
 * Đã sửa so với bản thảo:
 *   - 4 link about:blank -> URL thật (bài 1356, 1357, 1408, /dat-lich-tham-quan)
 *   - thêm link sang bài QĐ 2422 (1411, đã live 28/8) — bản thảo nhắc quyết định nhiều lần
 *     nhưng không trỏ đi đâu
 *   - bỏ FAQPage JSON-LD của bản thảo: [slug].astro tự phát từ mục "Câu hỏi thường gặp"
 *   - thêm h2 kết "Mười hai lời hứa, mỗi năm một lời" để chặn phạm vi quét FAQ
 *   - bảng 12 khối lớp bọc <div class="blog-table-wrap">
 *
 * ẢNH: dùng ẢNH THẬT của trường lấy từ /hinh-anh/ (album "Hoạt Động Hằng Ngày" và "STEAME"),
 * KHÔNG phải ảnh AI — nên không cần gắn nhãn theo Điều 11.4 Luật AI. Chú thích viết đúng
 * những gì có trong ảnh.
 *
 * CHỜ BÀI 2.3: khi bài "So sánh 3 khung Bộ–UNESCO–TVA" lên, gắn link vào mục
 *   "Chương trình này liên quan gì đến chuẩn của Bộ và UNESCO?" (hiện để chữ thường).
 *
 * Chạy:  node --env-file=.env scripts/create-post-khung-ai-education-30-tiet.mjs           (draft)
 *        node --env-file=.env scripts/create-post-khung-ai-education-30-tiet.mjs --publish
 *        node --env-file=.env scripts/create-post-khung-ai-education-30-tiet.mjs --update  (giữ status)
 */
const DIRECTUS_URL = (process.env.PUBLIC_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://45.88.188.169:8055').trim();
const DIRECTUS_TOKEN = (process.env.DIRECTUS_TOKEN || '').trim();
const UPDATE = process.argv.includes('--update');
const STATUS = process.argv.includes('--publish') ? 'published' : 'draft';
if (!DIRECTUS_TOKEN) { console.error('Thiếu DIRECTUS_TOKEN.'); process.exit(1); }

const HERO = 'https://media.truongvietanh.com/images/ai/tiet-che-tao-phong-steam-viet-anh.webp';

const content = `
<figure><img src="${HERO}" alt="Học sinh tiểu học Trường Việt Anh làm sản phẩm bằng vật liệu thật trong tiết học tại phòng STEAM" width="1200" height="675" loading="eager" /><figcaption>Tiết chế tạo tại phòng STEAM của Trường Việt Anh: cô giáo làm mẫu, học sinh tiểu học làm sản phẩm bằng vật liệu thật, không dùng thiết bị.</figcaption></figure>

<p><strong>Trả lời nhanh:</strong> Từ năm học 2026–2027, chương trình AI Education của Trường Việt Anh triển khai cho toàn hệ lớp 1–12: mỗi lớp 30 tiết/năm — gấp 2,5 lần mức tối thiểu 12 tiết của Bộ GDĐT — theo 3 mạch nội dung (Công dân số, Khoa học máy tính, Trí tuệ nhân tạo), học liệu lõi Code.org miễn phí, và mỗi năm học kết thúc bằng một sản phẩm thật do chính học sinh làm ra.</p>

<p>Hôm nay Trường Việt Anh công bố văn bản mà đội ngũ học thuật của chúng tôi đã xây trong nhiều tháng: khung chương trình AI Education đầy đủ cho 12 khối lớp. Không phải vì Bộ vừa yêu cầu — <a href="/blog/quyet-dinh-2422-giao-duc-ai-tom-tat-cho-phu-huynh/">Quyết định 2422/QĐ-BGDĐT ký ngày 18/08/2026</a> quy định tối thiểu 12 tiết/năm, khung của Trường Việt Anh đã vượt chuẩn đó từ trước khi chuẩn ra đời. Tôi công bố vì một lý do khác: phụ huynh có quyền biết chính xác con mình sẽ học gì, từng năm, và cuối năm cầm về thứ gì.</p>

<h2 id="nguyen-tac">Chương trình được thiết kế theo nguyên tắc nào?</h2>
<p>Năm nguyên tắc, và nguyên tắc đầu tiên quan trọng nhất: <strong>sản phẩm trước lý thuyết</strong> — mọi nội dung đều kết thúc bằng một vật phẩm hoặc hệ thống chạy được, có người dùng thật. Bốn nguyên tắc còn lại: ba trụ chạy song song trong cùng một môn (Công dân số đi trước, Khoa học máy tính làm nền, Trí tuệ nhân tạo là đích đến); học liệu lõi lấy từ Code.org — nền tảng phi lợi nhuận được dùng tại hơn 100 quốc gia, hoàn toàn miễn phí; THPT theo hướng kỹ thuật ứng dụng, mỗi năm một sản phẩm lớn; và <strong>đạo đức là điều kiện tiên quyết</strong> — không phải một bài giảng.</p>
<p>Nhiều phụ huynh đã đọc về <a href="/blog/truong-viet-anh-dung-ai-nhu-the-nao/">5 trụ cột AI Education của Việt Anh</a> và hỏi tôi hai thứ này liên hệ ra sao. Câu trả lời: 5 trụ cột là triết lý; khung 30 tiết/năm với 3 mạch nội dung là cách 5 trụ cột đó bước vào lớp học, có thời khóa biểu, có giáo viên, có sản phẩm để kiểm chứng.</p>

<h2 id="san-pham-tung-lop">Con tôi sẽ làm ra gì ở mỗi lớp?</h2>
<p>Đây là bảng tôi muốn anh chị giữ lại — vì nó là lời hứa có thể kiểm tra được. Cuối mỗi năm học, hãy yêu cầu xem đúng sản phẩm này:</p>
<div class="blog-table-wrap">
<table>
  <thead>
    <tr><th>Lớp</th><th>Chủ đề năm học</th><th>Sản phẩm cuối năm</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Em ra lệnh cho máy</td><td>Hoạt cảnh Play Lab "Câu chuyện của em" + bộ thẻ lệnh giấy, trưng bày tại Ngày hội có mời phụ huynh</td></tr>
    <tr><td>2</td><td>Em dạy máy học</td><td>Mô hình phân loại "Cá hay Rác" tự huấn luyện + bảng tên phát sáng micro:bit</td></tr>
    <tr><td>3</td><td>Bước vào lập trình</td><td>Máy Oẳn tù tì chạy trên micro:bit, chơi được với bạn</td></tr>
    <tr><td>4</td><td>Vòng lặp và trò chơi</td><td>Trò chơi hoàn chỉnh trình làng tại Game Jam của khối</td></tr>
    <tr><td>5</td><td>Hàm, biến, dự án tự chọn</td><td>Thú cưng ảo + dự án cuối khóa tự chọn chủ đề</td></tr>
    <tr><td>6</td><td>Web và tư duy phản biện</td><td>Website cá nhân + cẩm nang "Dùng AI có trách nhiệm" tự biên soạn</td></tr>
    <tr><td>7</td><td>Học máy đầu tiên</td><td>Ứng dụng AI giải quyết một vấn đề thật, xây trên dữ liệu nhóm tự khảo sát</td></tr>
    <tr><td>8</td><td>Thiết bị thông minh</td><td>Nguyên mẫu thiết bị thông minh trưng bày tại Gallery Walk</td></tr>
    <tr><td>9</td><td>Từ khối lệnh sang Python</td><td>Ứng dụng dự đoán phục vụ nhà trường, có ≥5 người dùng thật</td></tr>
    <tr><td>10</td><td>Xe tự hành</td><td>Xe tự hành 2 phiên bản (luật vs học máy) + báo cáo so sánh số liệu</td></tr>
    <tr><td>11</td><td>Thị giác máy tính</td><td>Máy điểm danh nhận diện khuôn mặt chạy thật tại một lớp, bảo vệ trước Hội đồng học thuật</td></tr>
    <tr><td>12</td><td>Tác nhân AI và cộng đồng</td><td>Dự án tốt nghiệp đo được tác động + hồ sơ năng lực dùng cho tuyển sinh đại học</td></tr>
  </tbody>
</table>
</div>

<figure><img src="https://media.truongvietanh.com/images/ai/san-pham-hoc-sinh-tiet-steame.webp" alt="Học sinh Trường Việt Anh cầm tấm biển gỗ tự làm trong tiết STEAME" width="800" height="1067" loading="lazy" /><figcaption>Một sản phẩm cuối buổi trong tiết STEAME: tấm biển gỗ do chính học sinh vẽ và lắp, mang về khoe được.</figcaption></figure>

<p>Tháng 6 vừa rồi, hai học sinh của chúng tôi — chưa từng học lập trình chính khóa — đã dùng đúng cách làm "sản phẩm trước lý thuyết" này để đưa ứng dụng Eco Hub <a href="/blog/hoc-sinh-viet-anh-vibe-coding-eco-hub/">vào bán kết một cuộc thi công nghệ chỉ sau một tuần</a>. Khung chương trình này sinh ra để những câu chuyện như vậy không còn là ngoại lệ.</p>

<h2 id="dao-duc">Vì sao đạo đức là "điều kiện tiên quyết", không phải bài giảng?</h2>
<p>Vì đạo đức chỉ thật khi nó có giá phải trả. Ví dụ cụ thể nhất nằm ở lớp 11: trước khi được chụp một tấm ảnh bạn học nào cho dự án máy điểm danh, nhóm học sinh phải hoàn thành bản đánh giá tác động bảo vệ dữ liệu và biểu mẫu đồng thuận — giáo viên duyệt xong mới được bắt đầu. Không có hồ sơ, không có dự án. Học sinh lớp 11 của chúng tôi học được điều mà nhiều công ty công nghệ trưởng thành còn làm sai: dữ liệu khuôn mặt của một con người không phải thứ "cứ lấy rồi tính sau".</p>
<p>Tinh thần đó chạy suốt 12 năm: lớp 1 học "con người có cảm xúc, AI thì không"; lớp 6 tự biên soạn quy ước dùng AI của lớp; lớp 9 ký cam kết liêm chính học thuật theo thang 4 mức áp dụng cho mọi môn — <a href="/blog/day-con-dung-ai-dung-cach/">thang M0–M3 mà tôi đã hướng dẫn phụ huynh dùng ở nhà</a>.</p>

<h2 id="chuan-bo-unesco">Chương trình này liên quan gì đến chuẩn của Bộ và UNESCO?</h2>
<p>Khung Việt Anh phủ đủ 4 mạch năng lực NLa–NLd của Quyết định 2422/QĐ-BGDĐT (2026) và đối chiếu đủ 12 ô của Khung năng lực AI cho học sinh do UNESCO công bố năm 2024 — bao gồm mức cao nhất, mức Sáng tạo, nơi học sinh không chỉ dùng mà tạo ra giải pháp AI.</p>
<p>Khác biệt nằm ở ba con số: <strong>30 so với 12</strong> (tiết mỗi năm), <strong>12 so với 0</strong> (sản phẩm bắt buộc trong 12 năm — chuẩn của Bộ không yêu cầu sản phẩm), và <strong>0 đồng</strong> (chương trình nằm trong học phí, dùng học liệu mở, đúng quy định không tạo gánh nặng tài chính).</p>

<h2 id="danh-gia">Không có bài thi, vậy làm sao tôi biết con tiến bộ?</h2>
<p>Bằng ba thứ nhìn được, sờ được: sản phẩm cuối năm của chính con (bảng ở trên); Ngày hội trưng bày nơi con phải tự thuyết trình và trả lời câu hỏi của khách tham quan — trong đó có anh chị; và hồ sơ học tập tích lũy 12 năm, đến lớp 12 trở thành hồ sơ năng lực nộp kèm đơn tuyển sinh đại học. Chúng tôi theo đúng nguyên tắc của Quyết định 2422: không bài thi, không đầu điểm riêng — nhưng thay "không thi" bằng "không giấu được": một sản phẩm chạy hay không chạy, cả hội trường nhìn thấy.</p>

<h2 id="phu-huynh-chuan-bi">Phụ huynh cần chuẩn bị gì cho con?</h2>
<p>Không cần gì ngoài ba việc: một, đừng mua khóa học thêm — chương trình đủ và học liệu miễn phí; hai, cuối năm hãy đến Ngày hội, vì ánh mắt con khi trình bày sản phẩm đầu tiên là thứ không quay phim lại được; ba, ở nhà hãy giữ cùng một luật dùng AI với trường — thang 4 mức đã có sẵn, con chỉ cần người lớn nhất quán.</p>

<h2 id="faq">Câu hỏi thường gặp</h2>
<h3>Chương trình AI 30 tiết áp dụng từ khi nào, cho những lớp nào?</h3>
<p>Từ năm học 2026–2027, cho toàn bộ học sinh lớp 1–12 của hệ thống Việt Anh. Mỗi lớp 30 tiết/năm trong thời khóa biểu chính khóa, do giáo viên chuyên trách phụ trách.</p>
<h3>30 tiết có làm nặng thêm lịch học của con không?</h3>
<p>Không. 30 tiết/năm tương đương chưa đến một tiết mỗi tuần, nằm trong thời khóa biểu chính khóa thay vì học thêm ngoài giờ. Ở lớp 1–2, gần một nửa thời lượng là hoạt động không dùng máy tính.</p>
<h3>Chương trình có thu thêm học phí không?</h3>
<p>Không. Chương trình nằm trong học phí hiện hành, dùng học liệu quốc tế miễn phí (Code.org, Be Internet Awesome) — đúng quy định của Quyết định 2422 rằng giáo dục AI không được tạo gánh nặng tài chính cho phụ huynh.</p>
<h3>Con tôi không thích công nghệ thì sao?</h3>
<p>Dự án nhóm chấm đều bốn vai trò: kỹ thuật, thiết kế, dữ liệu – khảo sát, và thuyết trình — vai nào cũng được ghi nhận ngang nhau, và học sinh luân phiên ít nhất hai vai mỗi năm. Mục tiêu không phải biến mọi đứa trẻ thành lập trình viên, mà để không đứa trẻ nào sợ AI.</p>
<h3>Khung này khác gì quy định 12 tiết của Bộ GDĐT?</h3>
<p>Khung Việt Anh phủ đủ 4 mạch năng lực của Bộ và gấp 2,5 lần thời lượng tối thiểu; khác biệt lớn nhất là cam kết sản phẩm: mỗi năm học sinh làm ra một sản phẩm thật, trưng bày công khai — điều chuẩn tối thiểu không yêu cầu.</p>
<h3>Ai dạy chương trình này?</h3>
<p>Giáo viên chuyên trách về khoa học máy tính và AI tại từng cơ sở, được bồi dưỡng qua chương trình đào tạo giáo viên nội bộ vận hành liên tục trong năm học.</p>

<h2 id="ket-luan">Mười hai lời hứa, mỗi năm một lời</h2>
<p>Mười lăm năm làm giáo dục, tôi học được một điều: lời hứa của một ngôi trường không nằm trong brochure. Nó nằm ở thứ đứa trẻ cầm trên tay vào cuối năm học — và ở việc đứa trẻ có giải thích được thứ đó hay không.</p>
<p>Khung chương trình này là 12 lời hứa như vậy, mỗi năm một lời. Và chúng tôi mời anh chị đến kiểm tra.</p>
<p>Hãy <a href="/dat-lich-tham-quan">đặt lịch tham quan một buổi học AI tại cơ sở gần anh chị nhất</a> — xem lớp 1 lập trình bằng thẻ giấy, xem lớp 10 chạy xe tự hành, rồi hãy quyết định.</p>

<p><em>Tác giả: <strong>Nguyễn Mạnh Dương</strong> — Nhà sáng lập &amp; Chủ tịch hệ thống giáo dục K-12 Việt Anh (từ 2011), tốt nghiệp Manchester Metropolitan University. 15 năm thiết kế môi trường học tập chủ động cho trẻ 0–18 tuổi. Cập nhật lần cuối: 01/09/2026. Nguồn tham khảo: Quyết định 2422/QĐ-BGDĐT ngày 18/08/2026 (thuvienphapluat.vn); UNESCO AI Competency Framework for Students (2024); Code.org — học liệu Computer Science Fundamentals, AI Lab, App Lab; Khung AI Education Trường Việt Anh v2.0 (tài liệu nội bộ, 08/2026).</em></p>
`.trim();

const post = {
  title: "Khung AI Education Việt Anh: 30 tiết/năm, mỗi năm một sản phẩm",
  slug: "khung-ai-education-viet-anh-30-tiet-12-nam",
  status: STATUS,
  excerpt: "Việt Anh công bố khung AI Education: 30 tiết/lớp/năm liên tục 12 năm, học liệu Code.org, mỗi năm một sản phẩm thật — gấp 2,5 lần mức tối thiểu của Bộ GDĐT.",
  content,
  published_at: "2026-09-01T11:00:00",
  category: "tin-tuc",
  featured_image: HERO,
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
  console.log(`Đã TẠO bài id=${r.data.id}, status=${r.data.status}, hẹn ${post.published_at} — /blog/${r.data.slug}`);
}
