import fs from 'fs';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, PageBreak,
  LevelFormat, Header, Footer, PageNumber,
} from 'docx';

const DATA = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const OUT = process.argv[3];

const NAVY = '26275D';
const GOLD = 'F4C534';
const GREY = '6B6D8C';
const LINE = 'DFDFE9';
const HEADBG = 'F1F1F7';
const WARNBG = 'FBF3DA';

const W = 9020; // bề ngang vùng nội dung (DXA)

const noBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const thinB = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const cellBorders = { top: thinB, bottom: thinB, left: thinB, right: thinB };

const P = (text, opt = {}) => new Paragraph({
  spacing: { before: opt.before ?? 0, after: opt.after ?? 100, line: 276 },
  alignment: opt.align,
  indent: opt.indent,
  border: opt.border,
  children: [new TextRun({
    text: String(text ?? ''),
    bold: opt.bold, italics: opt.italics,
    size: opt.size ?? 20,               // half-points → 20 = 10pt
    color: opt.color ?? '1F2033',
    font: 'Calibri',
  })],
});

const Runs = (runs, opt = {}) => new Paragraph({
  spacing: { before: opt.before ?? 0, after: opt.after ?? 100, line: 276 },
  children: runs.map((r) => new TextRun({
    text: r.t, bold: r.b, italics: r.i, size: r.s ?? 20,
    color: r.c ?? '1F2033', font: 'Calibri',
  })),
});

const H = (text, level, opt = {}) => new Paragraph({
  heading: level,
  spacing: { before: opt.before ?? 260, after: opt.after ?? 120 },
  pageBreakBefore: opt.pageBreak ?? false,
  children: [new TextRun({ text, bold: true, color: opt.color ?? NAVY, size: opt.size, font: 'Calibri' })],
});

const cell = (children, opt = {}) => new TableCell({
  width: { size: opt.w, type: WidthType.DXA },
  shading: opt.bg ? { type: ShadingType.CLEAR, fill: opt.bg, color: 'auto' } : undefined,
  margins: { top: 90, bottom: 90, left: 120, right: 120 },
  borders: cellBorders,
  verticalAlign: 'top',
  children,
});

const table = (colWidths, rows) => new Table({
  columnWidths: colWidths,
  width: { size: colWidths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  rows,
});

const hdrCell = (t, w) => cell([P(t, { bold: true, size: 17, color: GREY })], { w, bg: HEADBG });

const bullets = (items, opt = {}) =>
  items.filter(Boolean).map((t) => new Paragraph({
    numbering: { reference: 'rv-bullets', level: 0 },
    spacing: { after: 60, line: 276 },
    children: [new TextRun({ text: t, size: opt.size ?? 20, color: '1F2033', font: 'Calibri' })],
  }));

// ────────────────────────── Bảng số liệu cần xác nhận ──────────────────────────
const FACTS = [
  ['NGUỒN GỐC', 'Tài liệu "CHƯƠNG TRÌNH MẦM NON VIỆT ANH" — TP.HCM 7/2021, 18 trang', 'Mọi mô tả chương trình bên dưới lấy từ tài liệu này'],
  ['Phương pháp', 'Học tập chủ động (Active learning) — KHÔNG phải Montessori', 'Tài liệu gốc mục 1'],
  ['Khung chương trình', 'Tiêu chuẩn chương trình khung mầm non Hoa Kỳ', 'Tài liệu gốc mục 1'],
  ['8 lĩnh vực', 'Phương pháp học tập · Cảm xúc–xã hội · Thể chất–Sức khoẻ · Ngôn ngữ–Đọc viết–Giao tiếp · Toán học · Nghệ thuật Sáng tạo · Khoa học–Công nghệ · Xã hội học', 'Tài liệu gốc mục 1 & 3'],
  ['Lĩnh vực thứ 9', 'Ngôn ngữ Tiếng Anh — cho bé mà tiếng Anh không phải tiếng mẹ đẻ', 'Tài liệu gốc mục 3'],
  ['Hoạt động cốt lõi', 'Plan – Do – Review (lập kế hoạch – thực hiện – chiêm nghiệm), mỗi ngày', 'Tài liệu gốc mục 3'],
  ['Công cụ đánh giá', 'COR Advantage — 34 yếu tố + 2 yếu tố cho người học tiếng Anh, chấm 8 cấp độ 0–7', 'Tài liệu gốc mục 3'],
  ['Tiếng Anh trong lớp', '100% tiếng Anh trong TOÀN BỘ thời gian tại lớp (phương pháp CLIL)', 'Tài liệu gốc mục 4.1'],
  ['6 phương pháp', 'CLIL · Tích hợp liên môn · Tư duy phản biện · Kỷ luật tích cực · Đa độ tuổi · Đa trình độ', 'Tài liệu gốc mục 4'],
  ['Kỷ luật', 'KHÔNG thưởng, KHÔNG phạt. Bé tự thấy hệ quả rồi tự cam kết', 'Tài liệu gốc mục 4.4'],
  ['Kỹ năng tỉnh thức', 'Góc yên tĩnh nghe nhạc thiền; tập yoga, ngồi thiền, ăn thiền', 'Tài liệu gốc mục 4.4'],
  ['Xếp lớp', 'Đa độ tuổi — bé 3, 4 và 5 tuổi học chung một lớp', '⚠ Trang cũ ghi chia Mầm/Chồi/Lá theo tuổi. CẦN XÁC NHẬN cách xếp lớp hiện nay.'],
  ['Xếp nhóm học', 'Đa trình độ — theo khả năng TỪNG MÔN, đổi nhóm trong năm; có 1 kèm 1 và đôi bạn cùng tiến', 'Tài liệu gốc mục 4.6'],
  ['Khu vực trong lớp', '11 khu: nhà · hình khối · đọc sách · nghệ thuật · khoa học · toán học · cảm giác (đã chuyển ra sân) · vận động · âm nhạc · máy tính · viết chữ', 'Tài liệu gốc mục 7'],
  ['Phòng thể chất', '164m²', 'Tài liệu gốc mục 7'],
  ['Sân chơi', 'Khu vui chơi, sân cỏ nhân tạo, vườn hoa, hố cát và hồ bơi', 'Tài liệu gốc mục 7'],
  ['Thư viện', 'Ngay trong khuôn viên trường', 'Tài liệu gốc mục 7'],
  ['Địa chỉ cơ sở', '573 Đường Lê Đức Thọ, Phường An Hội Đông, Quận Gò Vấp, TP.HCM', 'Trang /co-so/mam-non-go-vap/'],
  ['Tên phường', 'An Hội Tây — nêu kèm chú thích "phường 16 cũ"', 'Trang /co-so/mam-non-go-vap/'],
  ['Hotline mầm non', '0774 588 988 — ghi là trực 24/7', 'Trang /co-so/mam-non-go-vap/'],
  ['Cơ sở liên cấp', '160/72 Phan Huy Ích, Phường An Hội Tây, Gò Vấp', 'Trang /co-so/ và /lien-he/'],
  ['Sĩ số mỗi lớp', '10–24 bé/lớp tùy độ tuổi', '⚠ Trang /co-so/ ghi 10–24; trang bán hàng cũ ghi "tối đa 15". Tài liệu gốc KHÔNG nêu. CẦN CHỐT.'],
  ['Độ tuổi nhận bé', 'Từ 13 tháng đến 6 tuổi', '⚠ Trang cũ có chỗ ghi 12 tháng, chỗ ghi 18 tháng. CẦN CHỐT.'],
  ['Năm thành lập', '2011 — hơn 15 năm vận hành', 'school-facts.ts'],
  ['Số gia đình', '1.000+ gia đình đã đồng hành', '⚠ Trang chương trình cũ ghi "5000+ cựu học sinh". CẦN CHỐT.'],
  ['Đánh giá', '4.9/5 từ 300+ đánh giá', 'school-facts.ts'],
  ['Tỷ lệ học tiếp', '98% gia đình học tiếp năm sau', 'Trang /tuyen-sinh/mam-non/phu-huynh-noi-gi/'],
  ['5 giá trị cốt lõi', 'Tôn trọng · Trách nhiệm · Tài giỏi · Chính trực · Yêu thương', 'Tài liệu gốc mục 5 + trang cơ sở'],
  ['Camera', 'Camera 24/7 toàn khu; phụ huynh MẦM NON được cấp tài khoản xem trực tuyến trong giờ học', 'Bài /blog/co-so-vat-chat/'],
  ['Y tế', 'Phòng y tế trực 8h–17h, kèm bảo hiểm tai nạn học sinh', 'Bài /blog/co-so-vat-chat/'],
  ['PCCC', 'Kiểm tra định kỳ hàng tháng, sprinkler tự động, diễn tập mỗi học kỳ', 'Bài /blog/co-so-vat-chat/'],
  ['Bếp ăn', 'Bếp riêng nấu tại trường, bếp một chiều, không dùng thực phẩm đóng gói công nghiệp', 'Bài /blog/co-so-vat-chat/'],
  ['Thực đơn', 'Xoay vòng chu kỳ 4 tuần, do chuyên gia dinh dưỡng thiết kế', 'Bài /blog/co-so-vat-chat/'],
  ['Học phí đã gồm', 'Học phí, bữa ăn (bán trú), ngoại khoá hàng tuần, bảo hiểm, phòng y tế', 'Trang /tuyen-sinh/mam-non/hoc-phi/'],
  ['Học phí không gồm', 'Đồng phục lần đầu, sách vở, lớp tự chọn (bơi, nhạc)', 'Trang /tuyen-sinh/mam-non/hoc-phi/'],
  ['Cách đóng học phí', '6 phương án; trọn năm giảm 5%; trả góp 12 tháng lãi 0%', 'Trang /tuyen-sinh/mam-non/hoc-phi/'],
  ['Ưu đãi anh chị em', 'Giảm 5% trên CẢ HAI bé, cho gia đình từ 2 con đang học', 'Trang /tuyen-sinh/mam-non/hoc-phi/'],
  ['Chính sách hoàn phí', 'Tháng đầu hoàn 80% · trong 3 tháng đầu hoàn 50% · sau đó chuyển sang quý sau', 'Trang /tuyen-sinh/mam-non/hoc-phi/'],
  ['Thời gian phản hồi', 'Liên hệ lại trong 2 giờ', 'Trang chương trình & học phí'],
  ['MỨC HỌC PHÍ CỤ THỂ', 'KHÔNG in lên trang — toàn site không công bố mức học phí mầm non Gò Vấp', '⚠ Nếu muốn in số, cần phòng Tuyển sinh cung cấp.'],
  ['Ưu đãi mùa hiện tại', 'ĐANG ĐỂ TRỐNG — khối này tự ẩn trên trang', '⚠ Ưu đãi cũ (10–15%, hạn 30/4/2026) ĐÃ HẾT HẠN.'],
  ['Tuyến xe đưa đón', 'ĐANG ĐỂ TRỐNG — trang chỉ nói chung "có xe, có nhân viên đi cùng"', '⚠ Cần tuyến + điểm đón + mức phí thật.'],
];

const factRows = [
  new TableRow({ children: [
    hdrCell('Hạng mục', 1900), hdrCell('Nội dung đang dùng trên 10 trang', 4300),
    hdrCell('Nguồn / lưu ý', 2000), hdrCell('Đúng?', 820),
  ]}),
  ...FACTS.map(([k, v, src]) => {
    const warn = src.startsWith('⚠') || k === k.toUpperCase();
    return new TableRow({ children: [
      cell([P(k, { bold: true, size: 18 })], { w: 1900, bg: warn ? WARNBG : undefined }),
      cell([P(v, { size: 18 })], { w: 4300, bg: warn ? WARNBG : undefined }),
      cell([P(src, { size: 16, color: GREY, italics: true })], { w: 2000, bg: warn ? WARNBG : undefined }),
      cell([P('', { size: 18 })], { w: 820, bg: warn ? WARNBG : undefined }),
    ]});
  }),
];

// ────────────────────────── Nội dung từng trang ──────────────────────────
function pageSection(p, idx) {
  const out = [];
  out.push(H(`${p.meta.adGroup}`, HeadingLevel.HEADING_1, { pageBreak: true, size: 30 }));

  out.push(table([1500, 7520], [
    new TableRow({ children: [hdrCell('Trường', 1500), hdrCell('Nội dung', 7520)] }),
    new TableRow({ children: [cell([P('Địa chỉ trang', { bold: true, size: 18 })], { w: 1500 }), cell([P(p.meta.url, { size: 18, color: '2F3A9E' })], { w: 7520 })] }),
    new TableRow({ children: [cell([P('Tiêu đề SEO', { bold: true, size: 18 })], { w: 1500 }), cell([P(p.meta.title, { size: 18 })], { w: 7520 })] }),
    new TableRow({ children: [cell([P('Mô tả SEO', { bold: true, size: 18 })], { w: 1500 }), cell([P(p.meta.description, { size: 18 })], { w: 7520 })] }),
    new TableRow({ children: [cell([P('Mã phễu', { bold: true, size: 18 })], { w: 1500 }), cell([P(p.meta.funnel + '   ·   Chỉ mục Google: ' + p.meta.robots, { size: 18 })], { w: 7520 })] }),
  ]));
  out.push(P('', { after: 200 }));

  // Hero
  out.push(H('Phần đầu trang', HeadingLevel.HEADING_2, { size: 24 }));
  if (p.hero.heroEyebrow) out.push(P(p.hero.heroEyebrow.toUpperCase(), { size: 16, color: GREY, bold: true, after: 60 }));
  out.push(P(p.hero.h1, { bold: true, size: 26, color: NAVY, after: 80 }));
  out.push(P(p.hero.sub, { size: 20, after: 140 }));
  if (p.hero.points.length) {
    out.push(P('Bốn điểm nhấn:', { bold: true, size: 18, color: GREY, after: 60 }));
    out.push(...bullets(p.hero.points));
  }
  if (p.hero.metrics.length) {
    out.push(P('Dải số liệu dưới phần đầu:', { bold: true, size: 18, color: GREY, before: 120, after: 60 }));
    out.push(...bullets(p.hero.metrics));
  }

  // Form
  out.push(H('Form thu thông tin (2 bước, nằm ngay đầu trang)', HeadingLevel.HEADING_2, { size: 24 }));
  out.push(table([2100, 6920], [
    new TableRow({ children: [cell([P('Tiêu đề form', { bold: true, size: 18 })], { w: 2100 }), cell([P(p.form.formTitle, { size: 18 })], { w: 6920 })] }),
    new TableRow({ children: [cell([P('Mô tả form', { bold: true, size: 18 })], { w: 2100 }), cell([P(p.form.formDesc, { size: 18 })], { w: 6920 })] }),
    new TableRow({ children: [cell([P('Nút bước 1', { bold: true, size: 18 })], { w: 2100 }), cell([P(p.form.nextBtn + '   (bước 1 chỉ hỏi email)', { size: 18 })], { w: 6920 })] }),
    new TableRow({ children: [cell([P('Nút bước 2', { bold: true, size: 18 })], { w: 2100 }), cell([P(p.form.submitBtn + '   (bước 2 hỏi tên và số điện thoại)', { size: 18 })], { w: 6920 })] }),
  ]));
  out.push(P('', { after: 160 }));

  // Body blocks
  for (const b of p.blocks) {
    if (b.faqs.length) continue; // FAQ để riêng phía dưới
    out.push(H(b.h2 || '(khối nội dung)', HeadingLevel.HEADING_2, { size: 24 }));
    if (b.lede) out.push(P(b.lede, { size: 20, italics: true, color: '4A4C6B', after: 140 }));
    for (const it of b.items) {
      if (it.kind === 'card' || it.kind === 'panel') {
        if (it.head) out.push(P(it.head, { bold: true, size: 21, color: NAVY, before: 100, after: 60 }));
        for (const t of (it.paras || [])) out.push(P(t, { size: 20, after: 70 }));
        if ((it.list || []).length) out.push(...bullets(it.list));
      } else if (it.kind === 'list') {
        out.push(...bullets(it.list));
      } else if (it.kind === 'timeline') {
        out.push(table([1700, 7320], [
          new TableRow({ children: [hdrCell('Thời lượng', 1700), hdrCell('Hoạt động', 7320)] }),
          ...it.rows.map((r) => new TableRow({ children: [
            cell([P(r[0], { bold: true, size: 18 })], { w: 1700 }),
            cell([P(r[1], { size: 18 })], { w: 7320 }),
          ]})),
        ]));
        out.push(P('', { after: 140 }));
      } else if (it.kind === 'table') {
        const nCol = Math.max(...it.rows.map((r) => r.length));
        const colW = Array.from({ length: nCol }, () => Math.floor(W / nCol));
        colW[0] = W - colW.slice(1).reduce((a, b) => a + b, 0);
        out.push(table(colW, it.rows.map((r, i) => new TableRow({
          children: r.map((c, j) => i === 0
            ? hdrCell(c, colW[j])
            : cell([P(c, { size: 18 })], { w: colW[j] })),
        }))));
        out.push(P('', { after: 140 }));
      }
    }
  }

  // FAQ
  const faqs = p.blocks.flatMap((b) => b.faqs);
  if (faqs.length) {
    out.push(H('Câu hỏi thường gặp trên trang', HeadingLevel.HEADING_2, { size: 24 }));
    faqs.forEach((f, i) => {
      out.push(Runs([{ t: `${i + 1}. `, b: true, c: GREY, s: 20 }, { t: f.q, b: true, s: 20, c: NAVY }], { before: 120, after: 50 }));
      out.push(P(f.a, { size: 19, after: 80 }));
    });
  }

  out.push(P('Ghi chú của người kiểm tra:', { bold: true, size: 19, color: GREY, before: 220, after: 60 }));
  out.push(new Paragraph({
    spacing: { after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE } },
    children: [new TextRun({ text: ' ', size: 20 })],
  }));
  out.push(new Paragraph({
    spacing: { after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE } },
    children: [new TextRun({ text: ' ', size: 20 })],
  }));
  return out;
}

// ────────────────────────── Ghép tài liệu ──────────────────────────
const intro = [
  P('TRƯỜNG MẦM NON VIỆT ANH — CƠ SỞ GÒ VẤP', { bold: true, size: 18, color: GOLD.replace('F4C534', '8A6D14'), after: 60 }),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'Bản kiểm tra nội dung 10 trang quảng cáo', bold: true, size: 40, color: NAVY, font: 'Calibri' })],
  }),
  P('Tài liệu này là toàn bộ chữ nghĩa của 10 trang đích sắp dùng cho quảng cáo Google. Các trang đã dựng xong nhưng CHƯA đưa lên website — cần bộ phận chuyên môn xác nhận thông tin trước.', { size: 21, after: 140 }),
  P('Cách kiểm tra', { bold: true, size: 22, color: NAVY, before: 160, after: 80 }),
  ...bullets([
    'Đọc "Bảng số liệu cần xác nhận" ở trang sau trước tiên — đó là nơi tập trung mọi con số. Đánh dấu vào cột "Đúng?" hoặc ghi số đúng vào ô đó.',
    'Các dòng tô nền vàng là chỗ đang có mâu thuẫn giữa các trang cũ, hoặc đang để trống chờ số liệu thật. Đây là phần cần chú ý nhất.',
    'Sau đó đọc lướt nội dung từng trang. Chỗ nào sai thì gạch chân và ghi lại ở mục "Ghi chú của người kiểm tra" cuối mỗi trang.',
    'Không cần sửa câu chữ cho hay hơn — chỉ cần soát thông tin có ĐÚNG THỰC TẾ hay không.',
  ], { size: 20 }),
  P('Ba điều đã thống nhất sẵn', { bold: true, size: 22, color: NAVY, before: 220, after: 80 }),
  ...bullets([
    'Không trang nào in mức học phí cụ thể, vì hiện website không công bố mức học phí mầm non Gò Vấp. Trang học phí đổi email lấy bảng giá gửi riêng.',
    'Ưu đãi theo mùa và tuyến xe đưa đón đang để trống. Khối nội dung đó TỰ ẨN trên trang, nên không có chỗ nào hứa sai.',
    'Mọi con số trong tài liệu đều lấy từ các trang đang chạy của trường, không có số nào tự nghĩ ra. Cột "Nguồn" ghi rõ lấy từ đâu.',
  ], { size: 20 }),
];

const doc = new Document({
  creator: 'Trường Việt Anh',
  title: 'Bản kiểm tra nội dung 10 trang quảng cáo — Mầm non Gò Vấp',
  description: 'Nội dung 10 landing page Google Ads, chờ bộ phận chuyên môn xác nhận thông tin.',
  numbering: {
    config: [{
      reference: 'rv-bullets',
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 200 } } },
      }],
    }],
  },
  sections: [{
    properties: { page: { margin: { top: 1100, bottom: 1100, left: 1100, right: 1100 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({
            children: ['Bản kiểm tra nội dung — 10 trang quảng cáo Mầm non Việt Anh Gò Vấp · Trang ', PageNumber.CURRENT, '/', PageNumber.TOTAL_PAGES],
            size: 16, color: GREY, font: 'Calibri',
          })],
        })],
      }),
    },
    children: [
      ...intro,
      H('Bảng số liệu cần xác nhận', HeadingLevel.HEADING_1, { pageBreak: true, size: 32 }),
      P('Các dòng nền vàng là chỗ đang mâu thuẫn hoặc đang trống. Xin ghi số đúng vào cột cuối.', { size: 19, italics: true, color: GREY, after: 160 }),
      table([1900, 4300, 2000, 820], factRows),
      ...DATA.flatMap((p, i) => pageSection(p, i)),
    ],
  }],
});

const buf = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buf);
console.log('✓ Đã tạo ' + OUT + ' (' + Math.round(buf.length / 1024) + ' KB)');
