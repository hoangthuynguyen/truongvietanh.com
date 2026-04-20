const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, PageBreak,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign,
        LevelFormat, PageNumber, Header, Footer, TableOfContents } = require('docx');

const outputPath = '/sessions/magical-youthful-faraday/mnt/truongvietanh.com/KH_Tuyen_Sinh_2026_V11_ChiTiet.docx';

// Helper functions
function createHeading(text, level = 1) {
  return new Paragraph({
    heading: level === 1 ? HeadingLevel.HEADING_1 : (level === 2 ? HeadingLevel.HEADING_2 : HeadingLevel.HEADING_3),
    children: [new TextRun({ text, bold: true, font: 'Arial', size: level === 1 ? 32 : (level === 2 ? 28 : 24) })],
    spacing: { before: 240, after: 120 }
  });
}

function createParagraph(text, options = {}) {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Arial', size: options.size || 22, bold: options.bold || false })],
    spacing: { before: options.spaceBefore || 80, after: options.spaceAfter || 80 },
    alignment: options.alignment || AlignmentType.LEFT
  });
}

function createTable(data, columnWidths = null) {
  const border = { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };

  // Default columnWidths if not provided
  if (!columnWidths) {
    columnWidths = Array(data[0].length).fill(9026 / data[0].length);
  }

  const rows = data.map((row, rowIndex) => {
    return new TableRow({
      children: row.map((cell, colIndex) => {
        const isHeader = rowIndex === 0;
        return new TableCell({
          borders,
          width: { size: columnWidths[colIndex], type: WidthType.DXA },
          shading: isHeader ? { fill: "4472C4", type: ShadingType.CLEAR } : undefined,
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [new Paragraph({
            children: [new TextRun({
              text: cell,
              bold: isHeader,
              color: isHeader ? "FFFFFF" : "000000",
              font: 'Arial',
              size: 20
            })]
          })]
        });
      })
    });
  });

  const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: columnWidths,
    rows: rows
  });
}

function createBulletList(items) {
  return items.map((item, index) => new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children: [new TextRun({ text: item, font: 'Arial', size: 22 })],
    spacing: { after: 60 }
  }));
}

function createNumberedList(items) {
  return items.map((item, index) => new Paragraph({
    numbering: { reference: "numbers", level: 0 },
    children: [new TextRun({ text: item, font: 'Arial', size: 22 })],
    spacing: { after: 60 }
  }));
}

// Build document content
const children = [];

// Title page
children.push(
  new Paragraph({
    children: [new TextRun({ text: "KỂ HOẠCH TUYỂN SINH 2026", bold: true, font: 'Arial', size: 48 })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 100 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Phiên Bản 11 - Enrollment Operating System", bold: true, font: 'Arial', size: 28 })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "Trường Việt Anh", bold: true, font: 'Arial', size: 26 })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 }
  }),
  new Paragraph({
    children: [new TextRun({ text: "2026", font: 'Arial', size: 24 })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300 }
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// Table of Contents
children.push(
  createHeading('MỤC LỤC', 1),
  new Paragraph({ children: [new TableOfContents('Mục lục', { hyperlink: true, headingStyleRange: "1-3" })],
    spacing: { after: 200 } }),
  new Paragraph({ children: [new PageBreak()] })
);

// PHẦN A - NỀN TẢNG HỆ THỐNG
children.push(
  createHeading('PHẦN A - NỀN TẢNG HỆ THỐNG', 1),
  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 1: Tổng Quan Enrollment Operating System
children.push(
  createHeading('Chương 1: Tổng Quan Enrollment Operating System', 1),
  createParagraph('Tầm nhìn chuyên nghiệp: Chuyển đổi từ "chạy quảng cáo tuyển sinh" sang "vận hành hệ thống tuyển sinh chuyên nghiệp" với quy trình, số liệu, và kiểm soát.'),
  new Paragraph({ children: [new PageBreak()] }),

  createHeading('1.1 Các KPI Tổng Thể', 2),
  createTable([
    ['Chỉ Tiêu', 'Giá Trị', 'Ghi Chú'],
    ['Mục tiêu tuyển sinh', '1,300 học sinh', 'Toàn hệ thống 6 campus'],
    ['Ngân sách', '13 tỷ VND', '10.8 tỷ cam kết + 2.2 tỷ linh hoạt'],
    ['Thời gian', '28 tuần (26/03 - 30/09/2026)', 'Từ Warm-up đến Close'],
    ['CAC mục tiêu', '< 10 triệu/học sinh', 'Điều chỉnh theo cấp học'],
    ['Conversion rate', '4.5% từ lead → enroll', 'Dựa trên funnel benchmarks']
  ], [2000, 2500, 4526]),

  createHeading('1.2 Timeline 4 Giai Đoạn', 2),
  createParagraph('Chiến dịch chia thành 4 giai đoạn chiến lược:'),
  createNumberedList([
    'Warm-up (T3-T4 | 26/03-30/04): Xây dựng brand awareness, launch landing pages, kích hoạt retargeting audiences',
    'Ramp-up (T5-T6 | 01/05-30/06): Tăng budget chi trả, optimize campaigns, launch summer programs',
    'Peak (T7-T8 | 01/07-31/08): Cuộc tổng tấn công đa kênh, peak demand, aggressive closing',
    'Close (T9 | 01/09-30/09): Nurture đơn chưa hoàn thành, last-minute offers, deadline urgency'
  ]),

  createHeading('1.3 20 Quyết Định Phải Lock Trong 72 Giờ Đầu Tiên', 2),
  createNumberedList([
    'Approval ngân sách committed 10.8 tỷ',
    'Phân bổ budget chi tiết theo 4 giai đoạn và 6 kênh',
    'Lộ trình landing page hoàn thành (deadline mỗi trang)',
    'Danh sách keywords Google Ads finalize',
    'Creative assets (video, image, copy) upload & approve',
    'Influencer partners & collaboration timeline confirm',
    'Campus leads assign cho mỗi cơ sở',
    'Admissions team training schedule',
    'Open Day dates & agendas finalize',
    'Webinar topics & speakers lock',
    'Telesales scripts & objection handling approve',
    'CRM workflows setup & test (GHL + Pancake)',
    'Make.com sync workflows test & live',
    'Analytics setup (GTM tags, CAPI, pixel)',
    'Remarketing audiences create & test',
    'Email sequences write & approve',
    'SMS templates finalize',
    'Zalo OA content calendar upload',
    'Mystery call process define & schedule',
    'Weekly meeting agenda & participants confirm'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 2: Chân Dung Khách Hàng Mục Tiêu
children.push(
  createHeading('Chương 2: Chân Dung Khách Hàng Mục Tiêu (4 Personas)', 1),
  createParagraph('Cơ sở dữ liệu khách hàng mục tiêu gồm 4 personas theo cấp học, mỗi persona có pain points, trigger events, decision factors riêng biệt.'),

  createHeading('2.1 Persona 1: Ba Mẹ Mầm Non (25-35 tuổi)', 2),
  createTable([
    ['Khía Cạnh', 'Chi Tiết'],
    ['Độ tuổi con', '2-5 tuổi'],
    ['Trình độ giáo dục', 'Đại học trở lên (70%)'],
    ['Thu nhập', '15-40 triệu/tháng'],
    ['Lối sống', 'Đô thị, chủ động tìm tòi'],
    ['Pain points', 'Chất lượng giáo dục sớm, tiếng Anh, bạn bè đa dạng'],
    ['Trigger event', 'Con chuẩn bị vào MN, chuyển nhà mới'],
    ['Decision factors', 'Chương trình giáo dục, cơ sở vật chất, biểu phí'],
    ['Information sources', 'Facebook, Google, recommendation, school website'],
    ['Decision timeline', '30-45 ngày từ awareness → enroll'],
    ['Budget concerns', 'Vẫn cân nhắc, cần justify ROI'],
    ['Geographic focus', 'Gò Vấp, Bình Tân, Tây Ninh']
  ], [2500, 6526]),

  createHeading('2.2 Persona 2: Ba Mẹ Tiểu Học (30-40 tuổi)', 2),
  createTable([
    ['Khía Cạnh', 'Chi Tiết'],
    ['Độ tuổi con', '6-11 tuổi'],
    ['Trình độ giáo dục', 'Đại học - Cao học (75%)'],
    ['Thu nhập', '20-50 triệu/tháng'],
    ['Lối sống', 'Bận rộn, cần school quality & convenience'],
    ['Pain points', 'Tiếng Anh + Toán, extra-curricular activities, discipline'],
    ['Trigger event', 'Hết cấp MN, không hài lòng school cũ'],
    ['Decision factors', 'Academic reputation, teacher quality, program breadth'],
    ['Information sources', 'Facebook group, Google review, parent network'],
    ['Decision timeline', '45-60 ngày từ awareness → enroll'],
    ['Budget concerns', 'Đã quyết định chi tiêu, cần good value'],
    ['Geographic focus', 'Gò Vấp (priority), Bình Tân']
  ], [2500, 6526]),

  createHeading('2.3 Persona 3: Ba Mẹ Cấp 2 (35-45 tuổi)', 2),
  createTable([
    ['Khía Cạnh', 'Chi Tiết'],
    ['Độ tuổi con', '12-14 tuổi'],
    ['Trình độ giáo dục', 'Cao học (60%), Kinh doanh chủ động'],
    ['Thu nhập', '30-60+ triệu/tháng'],
    ['Lối sống', 'International mindset, cẩn thận trong chọn lựa'],
    ['Pain points', 'Academic excellence, preparation cho THPT/International, tạo hạnh nhân'],
    ['Trigger event', 'Hết cấp TH, chuẩn bị exam entrance, so sánh schools'],
    ['Decision factors', 'Curriculum quality, university prep, facilities, reputation'],
    ['Information sources', 'Google search, school website, parent review, tour'],
    ['Decision timeline', '60-75 ngày từ awareness → enroll'],
    ['Budget concerns', 'Ít lo lắng, focus quality'],
    ['Geographic focus', 'Gò Vấp, Bình Tân, vilanh từ tỉnh']
  ], [2500, 6526]),

  createHeading('2.4 Persona 4: Ba Mẹ Cấp 3 (38-50 tuổi)', 2),
  createTable([
    ['Khía Cạnh', 'Chi Tiết'],
    ['Độ tuổi con', '15-18 tuổi'],
    ['Trình độ giáo dục', 'Cao học (70%), Leadership roles'],
    ['Thu nhập', '40-80+ triệu/tháng'],
    ['Lối sống', 'Global vision, strategic planning, luxury-conscious'],
    ['Pain points', 'University admission success, international pathway, character development'],
    ['Trigger event', 'Hết cấp THCS, chuẩn bị Đại học, cần advanced curriculum'],
    ['Decision factors', 'International pathways, university outcomes, pedagogy innovation'],
    ['Information sources', 'School website, direct inquiry, top-tier groups, expert advice'],
    ['Decision timeline', '75-90 ngày từ awareness → enroll (can be 180+ for hesitant)'],
    ['Budget concerns', 'Premium positioning, value story critical'],
    ['Geographic focus', 'Gò Vấp (core), suburban HCM, business districts']
  ], [2500, 6526]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 3: Funnel 8 Tầng
children.push(
  createHeading('Chương 3: Funnel 8 Tầng - Pipeline Tuyển Sinh', 1),
  createParagraph('Mô hình pipeline tuyển sinh có 8 tầng rõ ràng, mỗi tầng có tiêu chí chuyển đổi cụ thể.'),

  createHeading('3.1 Định Nghĩa 8 Tầng', 2),
  createNumberedList([
    'New Lead: Dữ liệu mới từ ads/organic/referral, chưa contacted',
    'Contacted: Đã gọi/message, có phản hồi hoặc message pending reply',
    'Qualified: Xác nhận nhu cầu, budget, timeline; sẵn sàng booking',
    'Booked Tour: Đã đặt hẹn tham quan, confirmation sent',
    'Showed Tour: Đã tham quan trực tiếp trường',
    'Offer: Tư vấn viên đã đưa lời mời (quote, pricing, program)',
    'Deposit: Gia đình đã thanh toán deposit/tiền nạp (confirm intent)',
    'Enrolled: Hoàn tất enrollment, sẵn sàng nhập học'
  ]),

  createHeading('3.2 Benchmark Conversion Rates', 2),
  createTable([
    ['Funnel Stage', 'Target Conversion %', 'Meaning'],
    ['Lead → Contacted', '90%', '9 trong 10 lead được contact'],
    ['Contacted → Qualified', '60%', '6 trong 10 contacted thành qualified'],
    ['Qualified → Booked Tour', '50%', '5 trong 10 qualified đặt hẹn'],
    ['Booked → Showed Tour', '70%', '7 trong 10 booked thực sự đến'],
    ['Showed → Offer', '80%', '8 trong 10 đã tour nhận offer'],
    ['Offer → Deposit', '60%', '6 trong 10 offer convert → deposit'],
    ['Deposit → Enrolled', '95%', '95% deposit đủ điều kiện nhập học']
  ], [2500, 3500, 3026]),

  createHeading('3.3 Pipeline Math - Bao Nhiêu Leads Cần Ở Mỗi Tầng?', 2),
  createParagraph('Công thức tính ngược từ mục tiêu 1,300 enrolled:'),
  createNumberedList([
    '1,300 enrolled ÷ 95% (Deposit→Enrolled) = 1,368 deposits cần',
    '1,368 deposits ÷ 60% (Offer→Deposit) = 2,280 offers cần',
    '2,280 offers ÷ 80% (Showed→Offer) = 2,850 showed tour cần',
    '2,850 showed ÷ 70% (Booked→Showed) = 4,071 booked hẹn cần',
    '4,071 booked ÷ 50% (Qualified→Booked) = 8,143 qualified cần',
    '8,143 qualified ÷ 60% (Contacted→Qualified) = 13,572 contacted cần',
    '13,572 contacted ÷ 90% (Lead→Contacted) = 15,080 leads cần'
  ]),
  createParagraph('Kết luận: Cần ~15,080 leads (mới) để đạt 1,300 enrolled với benchmarks này.'),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 4: SLA Tuyển Sinh
children.push(
  createHeading('Chương 4: SLA Tuyển Sinh - Cam Kết Dịch Vụ', 1),
  createParagraph('SLA định rõ response times, touchpoints, recovery procedures để bảo đảm không lead nào bị "rơi thuyền".'),

  createHeading('4.1 Response Time Targets', 2),
  createTable([
    ['Loại Hình', 'Trong Giờ Làm Việc', 'Ngoài Giờ'],
    ['Facebook Lead', '3 phút', '15 phút'],
    ['Google Lead', '5 phút', '20 phút'],
    ['Walk-in/Visit', '2 phút (tiếp đón)', 'N/A'],
    ['Phone Call', 'Pick up < 1 phút', 'Callback < 15 phút'],
    ['Email', '2 giờ', '4 giờ (next business day)'],
    ['SMS Inquiry', '5 phút', '15 phút']
  ], [1500, 3500, 3026]),

  createHeading('4.2 Touchpoint Requirement (7 Ngày Đầu)', 2),
  createParagraph('Mỗi lead mới phải nhận minimum 8-10 touchpoints trong 7 ngày đầu:'),
  createNumberedList([
    'Touchpoint 1: Initial response (call, message, email)',
    'Touchpoint 2-3: Nurture messages (2-3 touchpoints via Zalo/SMS/email)',
    'Touchpoint 4: Schedule tour (explicit booking confirmation)',
    'Touchpoint 5: Pre-tour reminder (12 giờ trước)',
    'Touchpoint 6: Tour itself',
    'Touchpoint 7-8: Post-tour follow-up (1 hari & 3 ngày)',
    'Touchpoint 9-10: Offer + Deadline reminder'
  ]),

  createHeading('4.3 No-Show Recovery', 2),
  createParagraph('Nếu lead không đến tour:'),
  createNumberedList([
    'Step 1: Gọi lại trong 30 phút sau no-show (xác nhận lý do)',
    'Step 2: Offer reschedule với flexibility (khác ngày, khác giờ)',
    'Step 3: Virtual tour option nếu lead ở xa',
    'Step 4: After 2 reschedule fails → move to "Lost → Recovery" campaign'
  ]),

  createHeading('4.4 Escalation Process', 2),
  createNumberedList([
    'Miss SLA 1x → Quản lý team lên tiếng cải thiện',
    'Miss SLA 2-3 lần trong tuần → Meeting với Campus Lead',
    'Miss SLA liên tục → Performance review, retraining, potential replacement'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 5: SOP School Tour
children.push(
  createHeading('Chương 5: SOP School Tour - Quy Trình Tham Quan Trường (75 Phút)', 1),
  createParagraph('Quy trình tham quan được tiêu chuẩn hóa để bảo đảm experience nhất quán & chuyên nghiệp, tăng tour→offer conversion.'),

  createHeading('5.1 Timeline Cấu Trúc (75 Phút)', 2),
  createTable([
    ['Segment', 'Thời Gian', 'Chi Tiết'],
    ['1. Đón Tiếp & Ấm Cúng', '10 phút', 'Đặt vị trí, cà phê, hỏi nhu cầu'],
    ['2. Presentation', '15 phút', 'Giá trị cốt lõi, khác biệt, curriculum'],
    ['3. Tour Cơ Sở Vật Chất', '25 phút', 'Route map, highlight key facilities'],
    ['4. Q&A & Tư Vấn', '15 phút', 'Match nhu cầu → solution, resolve concerns'],
    ['5. Offer & Next Steps', '10 phút', 'Present pricing, tạo urgency, đặt deadline']
  ], [2000, 2000, 5026]),

  createHeading('5.2 Segment 1: Đón Tiếp (10 Phút)', 2),
  createParagraph('Script: "Chào mừng gia đình đến Trường Việt Anh. Xin vui lòng ngồi, tôi sẽ mang cà phê. Hôm nay gia đình quan tâm đặc biệt cấp nào & program nào?"'),
  createNumberedList([
    'Chào hỏi thân thiện, giới thiệu self',
    'Offer nước/cà phê (tạo comfort)',
    'Hỏi các câu open-end: Tại sao gia đình chọn VA? Nhu cầu chính là gì?',
    'Ghi chú chi tiết vào CRM',
    'Set expectation: "Tour sẽ mất 75 phút, sau tour mình có lời đề cử cho gia đình"'
  ]),

  createHeading('5.3 Segment 2: Presentation (15 Phút)', 2),
  createParagraph('Trình bày core value proposition:'),
  createNumberedList([
    'Trường Việt Anh là: International standard education, local values, 6 campuses established',
    'Curriculum highlight: Bilingual, STEM-focused, character development',
    'Outcomes: 99% university admission, international pathway',
    'Use slides + printed materials (không quá dài)',
    'Pause untuk Q&A tinh tươm'
  ]),

  createHeading('5.4 Segment 3: Tour Cơ Sở Vật Chất (25 Phút)', 2),
  createParagraph('Route map per campus (ví dụ Gò Vấp):'),
  createNumberedList([
    'Classrooms (khám phá learning environment)',
    'Science lab (hands-on STEM)',
    'Library (resources, quiet space)',
    'Playground/Sports (facilities)',
    'Cafeteria (nutrition, safety)',
    'Teacher's lounge (expert staff)',
    'Admin office (tổ chức hành chính)'
  ]),
  createParagraph('Highlight points: Safety features, technology integration, student feedback posted.'),

  createHeading('5.5 Segment 4: Q&A & Tư Vấn (15 Phút)', 2),
  createParagraph('Xử lý objections phổ biến:'),
  createTable([
    ['Objection', 'Response Script'],
    ['"Giá cao quá"', '"Chất lượng giáo dục Quốc tế tiêu chuẩn cao, campus hạng A, teacher quality là top. Giáo dục con em là đầu tư dài hạn nhất."'],
    ['"Xa nhà"', '"Có các campus ở Bình Tân, Tây Ninh gần hơn. Ngoài ra shuttle service, carpool community quanh campus."'],
    ['"Chưa quyết định"', '"Hoàn toàn bình thường. Gia đình cân nhắc, so sánh khác school. Đó là lý do tôi tặng early bird pricing & limited spots offer hôm nay."'],
    ['"So sánh khác trường"', '"Rất tự tin so sánh. Mời gia đình tour schools khác, sau đó compare (campus, teacher, program, tuition). Kami confident gia đình chọn VA."']
  ], [2000, 7026]),

  createHeading('5.6 Segment 5: Offer & Next Steps (10 Phút)', 2),
  createParagraph('Create urgency & close:'),
  createNumberedList([
    'Present offer: "Gia đình đăng ký hôm nay, nhận early bird 10% tuition discount, valid đến [DATE]"',
    'Show limited spots: "Chúng ta chỉ còn 8 spots cấp 1 lớp này, nếu gia đình muốn, cần confirm ngay"',
    'Next step: "Điền form đăng ký, deposit 1 triệu xác nhận, sau đó mình schedule placement test"',
    'Handover: "Tôi kết nối gia đình với Admissions Officer để hoàn tất paperwork"',
    'Call-to-action: "Có câu hỏi gì trước khi gia đình quyết định?"'
  ]),

  createHeading('5.7 Checklist Chuẩn Bị Vật Phẩm', 2),
  createNumberedList([
    'Folder brochure (đẹp, full color, info đầy đủ)',
    'Pricing sheet (rõ ràng, so sánh packages)',
    'Enrollment form (sẵn sàng cho signup)',
    'Small gift (pen, notepad, school merch)',
    'Name tag (for staff)',
    'Printed testimonials/parent quotes',
    'Campus photos/videos (if applicable)',
    'iPad/tablet (for digital presentation)',
    'CRM login (để update real-time)'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// PHẦN B - CẤU TRÚC KÊNH & NGÂN SÁCH
children.push(
  createHeading('PHẦN B - CẤU TRÚC KÊNH & NGÂN SÁCH', 1),
  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 6: Cấu Trúc Kênh 4 Trục
children.push(
  createHeading('Chương 6: Cấu Trúc Kênh 4 Trục', 1),
  createParagraph('Chiến dịch tuyển sinh hoạt động trên 4 trục kênh, mỗi trục phục vụ mục tiêu khác nhau trong customer journey.'),

  createHeading('6.1 Trục 1 - Intent Capture (Google Ads, SEO)', 2),
  createParagraph('Bắt khách hàng đang tìm kiếm proactively (high intent):'),
  createNumberedList([
    'Google Search Ads: keywords như "tuyển sinh cấp 1 HCM", "Trường quốc tế Gò Vấp", "School near Bình Tân"',
    'Google Display: banner ads on education websites, parent forums',
    'YouTube Pre-roll: educational content channels (parenting, education)',
    'SEO: Optimize website cho ranking keywords (organic cost-free)',
    'KPI: Lead cost < 1M VND/lead, CTR > 3%',
    'Budget: 30% of committed budget'
  ]),

  createHeading('6.2 Trục 2 - Demand Creation (Meta, TikTok, Zalo)', 2),
  createParagraph('Tạo nhu cầu mới, nurture potential customers:'),
  createNumberedList([
    'Facebook Ads: Awareness campaigns (video, carousel), lookalike audiences',
    'Instagram Ads: Visual storytelling (campus life, student testimonials)',
    'TikTok Ads: Short-form video (viral potential, Gen Z parents targeting)',
    'Zalo Ads: Follower building, direct messaging',
    'KPI: CPM < 20K VND, Engagement rate > 2%',
    'Budget: 35% of committed budget'
  ]),

  createHeading('6.3 Trục 3 - Nurture (Email, SMS, Zalo OA, Retargeting)', 2),
  createParagraph('Nuôi dưỡng leads chưa sẵn sàng quyết định:'),
  createNumberedList([
    'Email sequences: Welcome, value education, social proof, final deadline',
    'SMS: Reminders, urgency, booking confirmation',
    'Zalo OA: Rich content (video, testimonials, FAQs, 1-1 support)',
    'Retargeting: Dynamic ads targeting page visitors, abandoned inquiries',
    'KPI: Open rate > 25%, Click rate > 5%',
    'Budget: 20% of committed budget (mostly platform costs)'
  ]),

  createHeading('6.4 Trục 4 - Conversion (School Tour, Open Day, Webinar, Telesales)', 2),
  createParagraph('Đóng đơn, convert leads thành enrolled students:'),
  createNumberedList([
    'School Tour: Scheduled campus visits (biggest conversion tool)',
    'Open Day Events: Large-scale events (multiple tours per day)',
    'Webinar: Expert panels (admission secrets, curriculum overview)',
    'Telesales: 1-1 phone outreach (handling objections, closing)',
    'KPI: Tour-to-offer > 80%, Offer-to-deposit > 60%',
    'Budget: 15% of committed budget'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 7: Budget Governance
children.push(
  createHeading('Chương 7: Budget Governance - Quản Trị Ngân Sách', 1),
  createParagraph('Ngân sách 13 tỷ VND được quản lý theo khung Committed + Flexible, với CAC caps theo cấp học.'),

  createHeading('7.1 Committed Budget: 10.8 tỷ VND', 2),
  createTable([
    ['Giai Đoạn', 'Tháng', 'Budget (tỷ VND)', 'Allocation %'],
    ['Warm-up', 'T3-T4 (8 tuần)', '2.0', '18.5%'],
    ['Ramp-up', 'T5-T6 (8 tuần)', '3.5', '32.4%'],
    ['Peak', 'T7-T8 (8 tuần)', '4.0', '37.0%'],
    ['Close', 'T9 (4 tuần)', '1.3', '12.0%'],
    ['TOTAL', '', '10.8', '100%']
  ], [2000, 2000, 2000, 3026]),

  createHeading('7.2 Flexible Budget: 2.2 tỷ VND (Release Conditions)', 2),
  createParagraph('Flexible budget được release khi kênh đạt target CPA:'),
  createNumberedList([
    'Condition: Kênh nào đạt CPA < target sau 7 ngày → release 20% flexible budget cho kênh đó',
    'Escalation: Nếu CPA đang 10% dưới target → suggest double the spend',
    'Monitoring: Daily CPA tracking, weekly allocation rebalance',
    'Holdback: 30% flexible budget giữ lại cho last-minute campaigns (tháng 9)'
  ]),

  createHeading('7.3 CAC Caps Per Grade Level', 2),
  createTable([
    ['Cấp Học', 'Mục Tiêu CAC', 'Rationale'],
    ['MN (Mầm non)', '< 8 triệu', 'Volume cao, conversion dễ (ít competitors)'],
    ['TH (Tiểu học)', '< 10 triệu', 'Volume trung bình, competitive'],
    ['THCS (Cấp 2)', '< 12 triệu', 'Volume thấp, high-decision parents'],
    ['THPT (Cấp 3)', '< 15 triệu', 'Rarest (existing students skip to), premium']
  ], [2500, 2500, 3026]),

  createHeading('7.4 Kill Switch Rules', 2),
  createNumberedList([
    'Rule: Nếu campaign CPA > 2x target CAC sau 7 ngày liên tục → tắt campaign',
    'Exception: Chỉ turn off nếu đã tried 2-3 optimization attempts (creative swap, audience refine)',
    'Recovery: Learning phase tối đa 10 ngày, sau đó evaluate và cut losses',
    'Alert: Auto-alert nếu CPA trending upward > 15% 3 ngày liên tiếp'
  ]),

  createHeading('7.5 Monthly Budget Review Process', 2),
  createNumberedList([
    'Every Friday 2pm: Weekly finance check (spend vs. budget, CPA vs. target)',
    'Every Month 1st: Full budget review (month performance, next month reallocation)',
    'Attendees: Marketing Manager, Finance, Principal, Campus Leads',
    'Output: Budget adjustment memo (signed approval required for >10% variance)'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 8: Chi Tiết Paid Media Theo Kênh
children.push(
  createHeading('Chương 8: Chi Tiết Paid Media Theo Kênh', 1),

  createHeading('8.1 Google Ads Strategy', 2),
  createTable([
    ['Campaign Type', 'Keywords', 'Target', 'Budget %'],
    ['Search - MN', 'mầm non HCM, preschool Gò Vấp, nhà trẻ quốc tế', 'Parents 25-35', '15%'],
    ['Search - TH', 'tiểu học Gò Vấp, trường cấp 1 tuyệt vời', 'Parents 30-40', '20%'],
    ['Search - THCS', 'THCS Gò Vấp, trường cấp 2 quốc tế', 'Parents 35-45', '15%'],
    ['Search - THPT', 'THPT quốc tế, cấp 3 HCM', 'Parents 38-50', '10%'],
    ['Display Network', 'Education site placements, parent forums', 'Broad audience', '20%'],
    ['YouTube', 'Pre-roll on education channels', 'Parents researching', '15%'],
    ['Performance Max', 'Auto-optimization, all Google surfaces', 'High intent', '5%']
  ], [1500, 2500, 2000, 1526]),

  createHeading('8.2 Meta Ads (Facebook + Instagram)', 2),
  createParagraph('Meta is the primary demand creation engine (35% of budget):'),
  createNumberedList([
    'Lead Ads: Direct form submission (no landing page friction)',
    'Conversion Ads: Direct-to-tour booking or phone call',
    'Video Ads: 15-30s campus highlights, parent testimonials',
    'Carousel Ads: Program comparison (MN vs. TH, curriculum highlight)',
    'Retargeting: Website visitors, video viewers, lead database',
    'Lookalike Audiences: Copy successful lead source profiles',
    'Budget allocation: 20% awareness, 15% conversion, rest retargeting'
  ]),

  createHeading('8.3 TikTok Ads Strategy', 2),
  createNumberedList([
    'Spark Ads: Native TikTok content (less disruptive)',
    'In-feed Ads: Video within FYP feed (high engagement)',
    'Hashtag Challenge: User-generated content campaign (optional, high effort)',
    'Target: Gen X/Millennial parents (surprising TikTok user base)',
    'Creative: 15-30s vertical video, student testimonials, day-in-life campus',
    'Budget: 15% of Demand Creation, scaling if ROI positive'
  ]),

  createHeading('8.4 Zalo Ads & OA Strategy', 2),
  createNumberedList([
    'Zalo Ads: Zalo Official Account follower acquisition',
    'ZaloOA Content: Rich messages (video, image, PDF), 1-1 customer support',
    'Conversion Ad: Direct booking link, phone call CTA',
    'Segmentation: Followers tagged by grade (MN/TH/THCS/THPT)',
    'Automation: Welcome sequence, nurture drip, deadline reminder',
    'Budget: 10% of demand budget, high-margin channel'
  ]),

  createHeading('8.5 Monthly Budget Allocation per Channel', 2),
  createTable([
    ['Channel', 'T3-T4', 'T5-T6', 'T7-T8', 'T9'],
    ['Google Ads (Search)', '300M', '600M', '700M', '200M'],
    ['Google Display/YouTube', '150M', '350M', '400M', '100M'],
    ['Meta (FB+IG)', '600M', '1,000M', '1,200M', '400M'],
    ['TikTok', '150M', '300M', '400M', '100M'],
    ['Zalo Ads', '100M', '200M', '250M', '50M'],
    ['Retargeting (Dynamic)', '200M', '400M', '500M', '150M'],
    ['Content/Influencer', '150M', '250M', '350M', '50M'],
    ['Reserve/Testing', '250M', '400M', '200M', '150M'],
    ['TOTAL', '2,000M', '3,500M', '4,000M', '1,300M']
  ], [1500, 1500, 1500, 1500, 1526]),

  new Paragraph({ children: [new PageBreak()] })
);

// PHẦN C - VẬN HÀNH HÀNG NGÀY
children.push(
  createHeading('PHẦN C - VẬN HÀNH HÀNG NGÀY', 1),
  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 9: Dashboard 12 Số
children.push(
  createHeading('Chương 9: Dashboard 12 Số Hàng Ngày', 1),
  createParagraph('12 metrics được track real-time hàng ngày để giám sát sức khỏe chiến dịch.'),

  createHeading('9.1 Dashboard Daily 12 Metrics', 2),
  createTable([
    ['Metric #', 'Tên Metric', 'Target Hàng Ngày', 'Data Source', 'Alert If'],
    ['1', 'Spend Hôm Nay (tỷ VND)', 'Theo plan (avg 40M)', 'GHL + Birch', '> 50% deviation'],
    ['2', 'Leads Hôm Nay (số)', 'Theo funnel (avg 40)', 'GHL + Landing Page', '< 30 leads'],
    ['3', 'Leads Qualified Hôm Nay', 'Theo plan (avg 24)', 'GHL status', '< 20 qualified'],
    ['4', 'CPL (Cost Per Lead)', 'Target < 300K', 'Spend / Leads', '> 350K'],
    ['5', 'Avg Response Time (phút)', '< 5 phút', 'GHL timestamp', '> 7 phút'],
    ['6', 'Tours Booked Hôm Nay', 'Theo plan (avg 10)', 'GHL pipeline', '< 5 tours'],
    ['7', 'Tour Show-up Rate %', '> 70%', 'Attended / Booked', '< 60%'],
    ['8', 'Offers Made Hôm Nay', 'Theo plan (avg 8)', 'GHL offer stage', '< 5 offers'],
    ['9', 'Deposits Received (số)', 'Theo plan (avg 4)', 'GHL + Bank', '< 2 deposits'],
    ['10', 'Enrollments Confirmed', 'Theo plan (avg 2)', 'GHL + Admin', '< 1 enroll'],
    ['11', 'CAC Running (VND)', '< Target per grade', 'Cumulative calc', '> CAC cap'],
    ['12', 'Forecast vs Target Gap', 'Track weekly', 'Math model', '> 10% gap']
  ], [800, 1200, 1500, 1800, 2926]),

  createHeading('9.2 Alert Triggers & Actions', 2),
  createNumberedList([
    'RED Alert (Immediate): Any metric > 30% off target → call Marketing Manager right away',
    'YELLOW Alert (Quick Review): Any metric > 15-30% off target → review in next 2 hours, assess',
    'GREEN (Normal): Within 15% → continue, monitor trend',
    'Trend Alert: Same metric yellow 3 days straight → escalate to Principal'
  ]),

  createHeading('9.3 Dashboard Tool & Setup', 2),
  createParagraph('Dashboard source: Google Sheet synced from GHL API + Birch API'),
  createNumberedList([
    'Owner: Digital Specialist',
    'Update frequency: Auto-refresh hourly',
    'Access: Marketing Manager + Principal (read), Digital Specialist (edit)',
    'Backup: Daily CSV export, stored in Google Drive'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 10: Weekly Battleplan
children.push(
  createHeading('Chương 10: Weekly Battleplan - 5 Phases', 1),
  createParagraph('Tuần được chia 5 phase rõ ràng, mỗi phase có objective, attendees, deliverables.'),

  createHeading('10.1 Phase 1 - Monday Data Review (30 Phút, 9:00am)', 2),
  createNumberedList([
    'Attendees: Marketing Manager, Digital Specialist, Campus Leads',
    'Objective: Review 12 dashboard metrics from past week',
    'Agenda:',
    '  - Open dashboard, compare Week vs. Target',
    '  - Identify top 3 issues (CPA trending up? Response time slow?)',
    '  - Root cause analysis (creative fatigue? Audience saturation? QA issue?)',
    'Output: Action list for week (who fixes what by when)',
    'Document: Meeting notes in shared Google Doc'
  ]),

  createHeading('10.2 Phase 2 - Tuesday Channel Optimization (1 giờ, 2:00pm)', 2),
  createNumberedList([
    'Attendees: Digital Specialist, Content Creator',
    'Objective: Optimize campaigns based on Monday data',
    'Actions:',
    '  - Google Ads: Pause underperforming keywords, refresh bid strategy',
    '  - Meta: Swap creative, adjust audience, scale top performers',
    '  - Landing Page: A/B test form length, CTA copy, load time',
    '  - Funnel: Check conversion rates, identify bottlenecks',
    'Output: Optimization checklist signed off',
    'Tools: Birch, Google Ads, Meta Ads Manager, GHL'
  ]),

  createHeading('10.3 Phase 3 - Wednesday Pipeline Review (1.5 giờ, 10:00am)', 2),
  createNumberedList([
    'Attendees: Admissions Officers, Campus Leads, Marketing Manager',
    'Objective: Review every lead in pipeline, ensure no fall-through',
    'Process:',
    '  - Open GHL pipeline, sort by stage',
    '  - "New Lead" stage: Call all, qualify or close',
    '  - "Contacted" stage: Check SLA (should be 90% qualified by now)',
    '  - "Qualified" stage: Book tour or close',
    '  - "Booked" stage: Call morning-of for confirmation',
    '  - "Showed Tour" stage: Deliver offer same day',
    '  - "Offer" stage: Follow up every 2 days, create urgency',
    'Output: Updated GHL status for all leads, follow-up tasks assigned'
  ]),

  createHeading('10.4 Phase 4 - Thursday Content & Campaign Launch (2 giờ, 2:00pm)', 2),
  createNumberedList([
    'Attendees: Content Creator, Digital Specialist, Principal (optional)',
    'Objective: Launch new creative assets & campaigns for next week',
    'Tasks:',
    '  - Content: Review 3-5 new video/image assets (campus tour, testimonial, founder message)',
    '  - Ad Copy: Write & approve 5-10 new ad variations per platform',
    '  - Landing Page: Deploy new page (if any), test load & form',
    '  - Campaigns: Create & schedule new campaign sets (Google, Meta, TikTok)',
    '  - Email/SMS: Load next week nurture sequences',
    '  - Zalo OA: Queue rich message content',
    'Output: All new assets live & scheduled',
    'Quality check: Marketing Manager approves before go-live'
  ]),

  createHeading('10.5 Phase 5 - Friday Forecast & Planning (1 giờ, 3:00pm)', 2),
  createNumberedList([
    'Attendees: Marketing Manager, Campus Leads, Principal',
    'Objective: Forecast next week, anticipate challenges',
    'Items:',
    '  - Forecast: Predict leads, tours, enrollments for next week (based on trend)',
    '  - Events: Any Open Days, webinars, holiday impacts next week?',
    '  - Budget: Check YTD spend vs. budget, adjust allocations if needed',
    '  - Staffing: Are we staffed for forecasted volume? (Telesales, admissions)',
    '  - Challenges: What risks? (Competitor launch, platform outage, team absence)',
    '  - Next Week Priority: Top 3 focus areas',
    'Output: Weekly forecast memo, staffing plan, risk mitigation strategy'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 11: Campus Ownership & RACI
children.push(
  createHeading('Chương 11: Campus Ownership & RACI', 1),
  createParagraph('Mỗi campus có Campus Lead chịu trách nhiệm KPI cuối cùng.'),

  createHeading('11.1 Campus Ownership Model', 2),
  createNumberedList([
    'Campus Lead (1 per campus): Chịu trách nhiệm # enrolled, tour show-up rate, offer conversion',
    'Campus Lead Reports To: Principal (local) + Marketing Manager (functional)',
    'KPI Accountability: # enrolled by end of Sept, CAC per student, parent satisfaction score',
    'Monthly Bonus: If campus hits 100% enrollment target'
  ]),

  createHeading('11.2 RACI Matrix', 2),
  createTable([
    ['Task', 'Marketing', 'Admissions', 'Campus Lead', 'Principal'],
    ['Lead generation', 'R/A', 'S', 'S', 'S'],
    ['Lead distribution', 'A', 'R', 'S', 'I'],
    ['Campus tour quality', 'S', 'R/A', 'R/A', 'S'],
    ['Response time SLA', 'A', 'R', 'A', 'I'],
    ['Offer preparation', 'S', 'R/A', 'R', 'S'],
    ['Enrollment paperwork', 'S', 'R/A', 'S', 'S'],
    ['Budget decisions', 'R/A', 'S', 'S', 'A'],
    ['Team training', 'R', 'A', 'A', 'S'],
    ['KPI reporting', 'R', 'S', 'A', 'A']
  ], [2000, 1800, 1800, 1800, 1628]),

  createHeading('11.3 Lead Distribution Logic', 2),
  createNumberedList([
    'Step 1: Lead comes in from ads → GHL pipeline (unassigned)',
    'Step 2: Qualification call → determine grade level + likely campus choice',
    'Step 3: Assign to preferred campus (or nearest campus)',
    'Step 4: Campus Lead assumes ownership, schedules tour within 48 hours',
    'Step 5: If campus full → transfer to partner campus (inter-campus coordination)'
  ]),

  createHeading('11.4 Inter-Campus Transfer', 2),
  createNumberedList([
    'Situation: Campus A full for Grade 1, but Campus B has spots',
    'Process: Campus A Lead contacts lead, explains transfer, gets approval',
    'SLA: Transfer completed within 24 hours',
    'Tracking: Mark in GHL "transferred campus", note reason',
    'Fairness: Leads distributed evenly among campuses per KPI',
    'Conflict Resolution: Marketing Manager arbitrates if campus disputes lead'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 12: Content Engine
children.push(
  createHeading('Chương 12: Content Engine - Nội Dung Theo Funnel', 1),
  createParagraph('Content được tạo chủ yếu theo funnel stage, không làm content vì content.'),

  createHeading('12.1 Content Map By Funnel Stage', 2),
  createParagraph('TOFU (Awareness) - Trích dẫn từ New Lead:'),
  createNumberedList([
    'Video: "5 Lý Do Chọn Trường Việt Anh" (2-3 min)',
    'Blog: "Cách Chọn Trường Mầm Non Tốt" (1,500 words, SEO-optimized)',
    'Infographic: "Curriculum Comparison Chart" (visual)',
    'Podcast: Parent interview series (monthly)',
    'KPI: 500+ views/week per asset'
  ]),

  createParagraph('MOFU (Consideration) - Lead qua Contacted:'),
  createNumberedList([
    'Testimonial Video: 3-4 parent/student videos (30-60 sec)',
    'School Tour Video: 5-7 min campus walkaround (4K)',
    'Comparison Guide: "VA vs. Other Schools" (PDF guide)',
    'FAQ Page: Q&A on curriculum, tuition, admission process',
    'Case Study: "How VA Helped Johnny Get Into Top University"',
    'KPI: 1,000+ downloads/week, 25%+ email open rate'
  ]),

  createParagraph('BOFU (Decision) - Lead qua Offer stage:'),
  createNumberedList([
    'Offer Details: Pricing sheet, discount tiers, payment plans',
    'Enrollment Guide: Step-by-step "How to Enroll" checklist',
    'Parent Success Stories: 3 short case studies (500 words each)',
    'Deadline Reminder: Urgency-driven countdown email/SMS',
    'FAQ Objection Handler: "Is VA Worth The Price?" content',
    'KPI: 60%+ offer → deposit conversion'
  ]),

  createHeading('12.2 Content Calendar By Week', 2),
  createNumberedList([
    'Monday: Publish blog post (SEO)',
    'Tuesday: Social media teaser (Meta 5x post, TikTok 1x)',
    'Wednesday: Email newsletter (nurture sequence)',
    'Thursday: Video content (YouTube, Zalo OA)',
    'Friday: Testimonial post (user-generated content amplify)',
    'Ongoing: Daily Zalo OA updates (rich content, Q&A responses)'
  ]),

  createHeading('12.3 Social Media Daily Tasks', 2),
  createTable([
    ['Platform', 'Daily Task', 'Frequency', 'Owner'],
    ['Facebook', 'Post + Comment engagement', '2 posts/day', 'Content Creator'],
    ['Instagram', 'Post + Story', '1 post + 3 stories/day', 'Content Creator'],
    ['TikTok', 'Video post', '1-2 videos/day', 'Content Creator'],
    ['Zalo OA', 'Rich message + Q&A response', 'Real-time', 'Admissions Officer'],
    ['LinkedIn', 'Thought leadership post', '3x/week', 'Marketing Manager'],
    ['YouTube', 'Publish edited videos', '1 video/week', 'Content Creator']
  ], [1500, 2500, 1500, 2026]),

  new Paragraph({ children: [new PageBreak()] })
);

// PHẦN D - CÔNG NGHỆ & TRACKING
children.push(
  createHeading('PHẦN D - CÔNG NGHỆ & TRACKING', 1),
  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 13: CRM Kép
children.push(
  createHeading('Chương 13: Hệ Thống CRM Kép (GHL + Pancake)', 1),
  createParagraph('Dual CRM strategy: GoHighLevel (pipeline mgmt) + Pancake (social chat), synced via Make.com.'),

  createHeading('13.1 GoHighLevel (Pipeline Management)', 2),
  createNumberedList([
    'Role: Central pipeline hub, lead tracking, automation',
    'Features Used:',
    '  - Custom pipeline (8 stages: New Lead → Enrolled)',
    '  - Contacts database (tags: grade level, campus, source)',
    '  - Workflows: Auto-SMS, auto-email, task assignment',
    '  - Calendar: Tour booking, reminders',
    '  - Reports: Daily metrics export',
    'Integration: Google Sheets (dashboard), Birch (ad platform)',
    'User Seats: Marketing Manager, Digital Specialist, Admissions Officers (5), Campus Leads (6)'
  ]),

  createHeading('13.2 Pancake CRM (Social Chat Management)', 2),
  createNumberedList([
    'Role: Facebook/Zalo message inbox consolidation',
    'Features Used:',
    '  - Chat inbox (Facebook Messenger, Zalo unified)',
    '  - Lead distribution (auto-assign per campus)',
    '  - Canned responses (SOP templates)',
    '  - Collaboration (team members chat on same thread)',
    'Integration: Webhooks to GHL (sync contact info, create tasks)',
    'User Seats: Admissions Officers (5), Support team (2)'
  ]),

  createHeading('13.3 Make.com Sync Workflow', 2),
  createNumberedList([
    'Sync Direction: Pancake → GHL (primary)',
    'Trigger: New chat message from Facebook/Zalo',
    'Action:',
    '  - Extract sender info, message content',
    '  - Create/update contact in GHL',
    '  - Create task in GHL (assigned to campus)',
    '  - Log interaction in GHL contact history',
    'Reverse Sync: GHL stage change → Pancake note',
    'Error Handling: Slack notification if sync fails'
  ]),

  createHeading('13.4 Lead Flow Diagram', 2),
  createNumberedList([
    'Lead Source: Ad (Google/Meta/TikTok) → Landing Page → GHL',
    'OR: Facebook/Zalo message → Pancake → Make.com → GHL',
    'OR: Walk-in → Admissions Officer enters in GHL manually',
    'Assignment: GHL auto-assigns to Campus Lead (based on campus selection)',
    'Action: Campus Lead follows SOP (contact within 5 min, qualify, book tour)',
    'Tracking: GHL pipeline moves from New Lead → Enrolled'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 14: Funnels & Landing Pages
children.push(
  createHeading('Chương 14: Funnel Chi Tiết & Landing Pages', 1),
  createParagraph('24 landing page funnels at forms.truongvietanh.com, each optimized per campaign type.'),

  createHeading('14.1 Funnel Structure (Ví Dụ: MN Program)', 2),
  createNumberedList([
    'Page 1 (Interest): Hero banner, 3 reasons to choose VA, CTA "Learn More"',
    'Page 2 (Consideration): Curriculum overview, facilities gallery, parent testimonials, CTA "Book Tour"',
    'Page 3 (Tour Booking): Form asking (name, email, phone, preferred date), submit → GHL',
    'Page 4 (Confirmation): "Tour scheduled for [DATE] at [CAMPUS]. See you soon!" + calendar add',
    'Pixel Tracking: Page 1 view → "Interest", Page 2 view → "Consideration", Form submit → "Lead"'
  ]),

  createHeading('14.2 24 Funnels Breakdown', 2),
  createTable([
    ['Funnel Type', 'Count', 'Examples', 'URL Path'],
    ['Grade-based', '4', 'MN, TH, THCS, THPT', '/register/[grade]'],
    ['Seasonal', '3', 'Spring, Summer, Fall intake', '/register/[season]'],
    ['Event-based', '4', 'Open Day, Webinar, Info Session', '/events/[event]'],
    ['Special Offer', '4', 'Early Bird, Sibling Discount, Referral', '/offer/[type]'],
    ['Retargeting', '5', 'Abandoned tour, Video watcher, Site visitor', '/retarget/[source]'],
    ['Campus-specific', '4', 'Gò Vấp, Bình Tân, Tây Ninh, An Giang', '/campus/[name]'],
    ['TOTAL', '24', '', '']
  ], [2000, 1000, 3500, 2526]),

  createHeading('14.3 Form Fields (Standardized)', 2),
  createNumberedList([
    'Required: Full Name, Email, Phone, Grade Level, Campus Choice',
    'Optional: Current School, Sibling at VA?, Message',
    'Privacy: Checkbox "I agree to receive updates"',
    'Submit Button: "Schedule My Tour" (CTA clear & action-oriented)'
  ]),

  createHeading('14.4 Funnel Analytics & A/B Testing', 2),
  createNumberedList([
    'GTM tracking: 25 tags deployed (page view, form submit, CTA click)',
    'Metrics: Form completion rate, avg time on page, scroll depth',
    'A/B Test: Every week, 1 variable test (CTA color, form field, hero copy)',
    'Winner: Stats sig. > 15% improvement, rotate to production'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 15: Analytics GTM Remarketing
children.push(
  createHeading('Chương 15: Analytics, GTM & Remarketing', 1),
  createParagraph('25 GTM tags, 16 triggers, 19 variables deployed untuk tracking & remarketing.'),

  createHeading('15.1 GTM Tag List (25 Tags)', 2),
  createNumberedList([
    'Google Analytics 4 (Page View)',
    'Google Ads Conversion (Lead form submit)',
    'Meta Pixel (Page View, Lead)',
    'TikTok Pixel (Page View, Lead)',
    'Zalo Pixel (Page View, Lead)',
    'Facebook Lead Ads Pixel',
    'LinkedIn Insight Tag',
    'Hotjar (Session recording)',
    'Drift (Live chat trigger)',
    'Intercom (Support widget)',
    'YouTube Video Tracker',
    'Scroll Depth Tracker',
    'Form Interaction Logger (per field)',
    'Video Play Tracker (Vimeo/YouTube)',
    'PDF Download Tracker',
    'Exit Intent Popup',
    'Thank You Page Confirmation',
    'Call Tracking (Phone number)',
    'SMS Opt-in Tracker',
    'Email Click Tracker',
    'CRM Sync Tag (GHL API)',
    'Conversion API (Server-side)',
    'Custom Event Logger',
    'Error Logging',
    'Performance Monitor'
  ]),

  createHeading('15.2 CAPI Setup (Server-Side Tracking)', 2),
  createNumberedList([
    'Purpose: Bypass ad blocker, improve match quality (pixel + CAPI = 2x conversion data)',
    'Implementation: Node.js webhook on backend',
    'Events Sent:',
    '  - ViewContent (any page visit)',
    '  - Lead (form submit)',
    '  - Purchase (deposit received, enrollment confirmed)',
    '  - Schedule (tour booked)',
    'Hashed Data: Phone, email, first name, last name hashed (SHA-256) before send'
  ]),

  createHeading('15.3 Remarketing Audiences', 2),
  createNumberedList([
    'Audience 1: Website Visitors (all pages) - 30 day window',
    'Audience 2: Form Abandoners (reached form, didn\'t submit) - 14 day',
    'Audience 3: Lead Database (all form submits) - 180 day',
    'Audience 4: Tour No-Shows (booked but didn\'t attend) - 7 day (aggressive)',
    'Audience 5: Offer Viewers (opened offer email) - 10 day',
    'Audience 6: Video Viewers (watched > 50% school tour) - 30 day',
    'Exclusion: Enrolled students (remove immediately after enroll)'
  ]),

  createHeading('15.4 UTM Naming Convention', 2),
  createParagraph('Format: ?utm_source=[SOURCE]&utm_medium=[MEDIUM]&utm_campaign=[CAMPAIGN]&utm_content=[CONTENT]&utm_term=[TERM]'),
  createNumberedList([
    'Source: google, facebook, tiktok, zalo, organic, direct, email',
    'Medium: cpc, cpm, organic, email, social, referral',
    'Campaign: [GRADE]_[SEASON]_[PLATFORM] (e.g., mn_spring_fb)',
    'Content: [ADCOPY]_[CREATIVE] (e.g., testimonial_video)',
    'Term: [OFFER] (e.g., earlybird, discount, webinar)'
  ]),

  createHeading('15.5 Channel Review Checklist (12 Channels)', 2),
  createTable([
    ['Channel', 'GTM Tag', 'Conversion Event', 'Attribution Model'],
    ['Google Ads', 'GA4 + Conv', 'Lead + Purchase', 'Last Click'],
    ['Facebook Ads', 'Meta Pixel + CAPI', 'Lead + Purchase', 'Last 7d Click'],
    ['TikTok Ads', 'TikTok Pixel', 'Lead + Purchase', 'Last Click'],
    ['Zalo Ads', 'Zalo Pixel', 'Lead', 'Last Click'],
    ['Email', 'Email Tracker', 'Link Click + Open', 'First Touch'],
    ['SMS', 'SMS Tracker', 'Click', 'Last Click'],
    ['Organic (SEO)', 'GA4', 'Lead', 'First Touch'],
    ['Direct', 'GA4', 'Session', 'N/A'],
    ['Referral', 'GA4', 'Session', 'First Touch'],
    ['Influencer', 'UTM + Pixel', 'Lead', 'Last Click'],
    ['School Tour', 'CRM Manual', 'Offer + Deposit', 'Direct'],
    ['Open Day', 'UTM + Pixel', 'Lead + Offer', 'Last Click']
  ], [1200, 1500, 1800, 2026]),

  new Paragraph({ children: [new PageBreak()] })
);

// PHẦN E - KIỂM SOÁT & CẢI TIẾN
children.push(
  createHeading('PHẦN E - KIỂM SOÁT & CẢI TIẾN', 1),
  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 16: QA & Mystery Call
children.push(
  createHeading('Chương 16: QA & Mystery Call Program', 1),
  createParagraph('Kiểm soát chất lượng tour & telesales thông qua mystery calls & site audits.'),

  createHeading('16.1 Mystery Call Program', 2),
  createNumberedList([
    'Frequency: 1 mystery call per campus per month (6 calls/month total)',
    'Evaluator: External QA vendor (không phải nội bộ)',
    'Scenarios:',
    '  - Incoming call (lead inquiry)',
    '  - Booking request (tour scheduling)',
    '  - Objection handling (price concern)',
    '  - Followup call (post-tour)',
    'Recording: All calls recorded, shared with campus lead'
  ]),

  createHeading('16.2 Call Scoring Rubric (100 points)', 2),
  createTable([
    ['Criteria', 'Points', 'Ideal Response'],
    ['Answer time < 5 sec', '10', 'Pick up immediately'],
    ['Warm greeting', '10', 'Use name, school name, cheerful tone'],
    ['Needs assessment Q\'s', '15', 'Ask 3+ open-end questions'],
    ['Product knowledge', '15', 'Articulate curriculum, facilities, pricing'],
    ['Objection handling', '15', 'Address concern, reframe, social proof'],
    ['Booking specificity', '15', 'Offer multiple date/time options'],
    ['Follow-up setup', '10', 'Confirm email, send calendar invite'],
    ['Professionalism', '5', 'No background noise, clear diction']
  ], [2000, 1000, 6026]),

  createHeading('16.3 Tour Quality Audit (Monthly Per Campus)', 2),
  createNumberedList([
    'Evaluator: Marketing Manager or Principal',
    'Method: Attend 1 tour as "parent" (anonymous evaluator)',
    'Scoring: Same 75-min segments (welcome, presentation, tour, Q&A, offer)',
    'Checklist: Folder & materials available? Script followed? Objection handled? Offer clear?',
    'Output: Audit report, shared with Campus Lead & Principal',
    'Improvement Plan: If score < 80/100, create 2-week remedial plan'
  ]),

  createHeading('16.4 Corrective Action Process', 2),
  createNumberedList([
    'First Fail (< 70/100): Conversation with manager, identify gaps, create action plan',
    'Second Fail: Retraining workshop, role-play practice, peer coaching',
    'Third Fail: Performance improvement plan (PIP) with 30-day deadline',
    'Fourth Fail: Consider role reassignment or termination'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 17: Lost Reasons Tracking
children.push(
  createHeading('Chương 17: Lost Reasons Tracking & Win-Back', 1),
  createParagraph('Bắt buộc tag mọi lead không enroll với lý do, phân tích & win-back.'),

  createHeading('17.1 Lost Reason Categories', 2),
  createNumberedList([
    'Giá cao (Price objection)',
    'Xa (Location/distance)',
    'Chọn trường khác (Chose competitor)',
    'Chưa sẵn sàng (Decision not ready)',
    'Không liên lạc được (No response)',
    'Khác (Other: family move, health, etc.)'
  ]),

  createHeading('17.2 Tagging Process', 2),
  createNumberedList([
    'Responsibility: Admissions Officer closing the lead',
    'Action: In GHL, set pipeline stage "Lost", add tag (lost reason)',
    'Documentation: Add note "Lost reason: [TAG], decision date: [DATE], note: [CONTEXT]"',
    'Escalation: If "Lost" rate > 20%, Marketing Manager reviews root causes'
  ]),

  createHeading('17.3 Monthly Lost Analysis', 2),
  createNumberedList([
    'Report: Every end of month, pull "Lost" leads by reason',
    'Top 3: Identify top 3 reasons (usually 60-70% of losses)',
    'Action Plan:',
    '  - If "Giá cao": Review pricing strategy, create finance plan options',
    '  - If "Xa": Highlight shuttle service, peer groups, convenience',
    '  - If "Chọn trường khác": Do post-mortem comparison (what did competitor do better?)',
    '  - If "Chưa sẵn sàng": Create nurture campaign (email sequence, webinar, testimonial)',
    'Execute: Action plan for next month'
  ]),

  createHeading('17.4 Win-Back Campaigns', 2),
  createNumberedList([
    'Target: Recoverable leads (lost < 30 days, showed tour)',
    'Campaign: 3-email sequence + phone call over 2 weeks',
    '  - Email 1: "We miss you, here\'s a special offer"',
    '  - Email 2: "Final days for early bird pricing"',
    '  - Email 3: "Spots filling fast, let\'s talk"',
    '  - Phone: Last-minute objection handling',
    'Success Rate Target: 10-15% win-back rate',
    'Budget: Included in committed budget (telesales time)'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 18: Offer & Deadline Management
children.push(
  createHeading('Chương 18: Offer & Deadline Management', 1),
  createParagraph('Tiering pricing & creating urgency là kỹ thuật chính để convert offers → deposits.'),

  createHeading('18.1 Early Bird Pricing Tiers', 2),
  createTable([
    ['Tier', 'Dates', 'Discount', 'Tuition Reduction'],
    ['Tier 1 (Early Bird)', '26/03 - 30/04', '15%', 'Apply to full year'],
    ['Tier 2 (Priority)', '01/05 - 31/05', '10%', 'Apply to full year'],
    ['Tier 3 (Standard)', '01/06 - 31/08', '5%', 'Apply to half year'],
    ['Tier 4 (Last Minute)', '01/09 - 30/09', '0%', 'No discount'],
    ['Scholarship (on case)', 'All year', 'Varies', 'Merit/need-based']
  ], [1500, 2500, 2500, 2526]),

  createHeading('18.2 Discount Framework Clarification', 2),
  createNumberedList([
    'Tiered Discounts: Automatically applied based on enrollment date',
    'Sibling Discount: +5% additional if 2+ siblings enroll',
    'Referral Bonus: If refer new family → 500K VND gift card (not tuition)',
    'Payment Plan Options:',
    '  - Full payment upfront: No additional discount',
    '  - Semester payment (2x/year): +1% fee',
    '  - Monthly payment (10x/year): +2% fee'
  ]),

  createHeading('18.3 Urgency Creation Tools', 2),
  createNumberedList([
    'Limited Spots: "Only 8 spots left for Grade 1"',
    'Deadline Countdown: "Early bird pricing expires in 10 days"',
    'Exclusivity: "This offer only for tour participants" ',
    'Scarcity: "Spot guarantees only with deposit by [DATE]"',
    'Social Proof: "15 families enrolled this week, interest is strong"'
  ]),

  createHeading('18.4 Offer Tracking', 2),
  createNumberedList([
    'GHL Pipeline Stage: "Offer" with offer amount, discount type, deadline date',
    'Reminder: Auto-email 3 days before deadline ("Final 3 days for this offer")',
    'Extension: Can extend 1x for 7 days (requires manager approval)',
    'Escalation: If 50% offers expire unclaimed → review offer appeal (too aggressive?)'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Chapter 19: Nhân Sự & Đào Tạo
children.push(
  createHeading('Chương 19: Nhân Sự & Đào Tạo', 1),
  createParagraph('Team structure, KPIs per role, training plan, onboarding.'),

  createHeading('19.1 Team Structure (Tổng 16+ FTE)', 2),
  createTable([
    ['Role', 'Count', 'Reports To', 'Key Responsibilities'],
    ['Marketing Manager', '1', 'Principal', 'Strategy, budget, KPI ownership'],
    ['Digital Specialist', '1', 'Marketing Mgr', 'Google Ads, Meta, analytics, optimization'],
    ['Content Creator', '1', 'Marketing Mgr', 'Video, blog, social media content'],
    ['Admissions Officer (HQ)', '2', 'Marketing Mgr', 'Inbound leads, qualification, CRM'],
    ['Campus Lead', '6 (1 per)', 'Principal + Admissions Mgr', 'Tour coordination, campus KPI'],
    ['Admissions Officer (Campus)', '4-5 per campus', 'Campus Lead', 'Tour execution, offers, paperwork'],
    ['Telesales', '2', 'Admissions Mgr', 'Outbound calling, objection handling'],
    ['TOTAL', '16-18', '', '']
  ], [1500, 800, 2000, 3826]),

  createHeading('19.2 Performance Review KPIs (Quarterly)', 2),
  createTable([
    ['Role', 'KPI 1', 'KPI 2', 'KPI 3'],
    ['Marketing Manager', 'CAC < target', 'YTD enrollments', 'Monthly ad ROI'],
    ['Digital Specialist', 'CPL trends', 'Funnel conversion %', 'Campaign ROAS > 3:1'],
    ['Content Creator', 'Video views/engagement', 'Blog organic traffic', 'Social followers growth'],
    ['Admissions Officer', 'Lead response time < 5 min', 'Qualification rate 60%+', 'Tour booking rate 50%+'],
    ['Campus Lead', 'Campus enrollment target', 'Tour show-up rate > 70%', 'Parent NPS > 8/10'],
    ['Telesales', 'Calls/day > 20', 'Objection resolution rate', 'Offer → deposit > 60%']
  ], [1500, 2000, 2000, 2026]),

  createHeading('19.3 Training Plan (Pre-Launch & Ongoing)', 2),
  createNumberedList([
    'Pre-Launch Training (Weeks 1-2):',
    '  - Product knowledge (curriculum, facilities, alumni outcomes)',
    '  - Sales skills (discovery, needs analysis, objection handling)',
    '  - CRM training (GHL navigation, lead management, reporting)',
    '  - Roleplay: Practice tours, handle objections',
    '  - Mystery call review: Watch best practices',
    '  ',
    'Ongoing Training (Monthly):',
    '  - Sales coaching (review call recordings, 1-1 feedback)',
    '  - Product updates (new programs, pricing changes)',
    '  - Competitive analysis (how to compare with other schools)',
    '  - New campaign tactics (updated marketing approach)'
  ]),

  createHeading('19.4 Onboarding Checklist (For New Hires)', 2),
  createNumberedList([
    'Week 1:',
    '  - [ ] Office setup (desk, computer, phone)',
    '  - [ ] System access (GHL, Pancake, Google Workspace)',
    '  - [ ] Welcome meeting with supervisor',
    '  - [ ] Product orientation (curriculum, campuses)',
    '  - [ ] Shadow existing team member (2 calls/tours)',
    '',
    'Week 2:',
    '  - [ ] CRM training (hands-on GHL)',
    '  - [ ] Sales training (objection handling workshop)',
    '  - [ ] Role-play evaluation (script practice)',
    '  - [ ] First independent call (with supervisor listening)',
    '',
    'Week 3-4:',
    '  - [ ] Full responsibility (with check-ins)',
    '  - [ ] First 10 leads processed',
    '  - [ ] Performance review (response time, conversion rate)',
    '  - [ ] Certification (ready for production)'
  ]),

  new Paragraph({ children: [new PageBreak()] })
);

// Final conclusion
children.push(
  createHeading('KẾT LUẬN', 1),
  createParagraph('Kế hoạch tuyển sinh 2026 phiên bản 11 này biến đổi từ "marketing plan" sang "enrollment operating system" với 19 chapters chi tiết, từ nền tảng hệ thống (4 chapters) đến cấu trúc kênh & ngân sách (3 chapters), vận hành hàng ngày (4 chapters), công nghệ & tracking (3 chapters), và kiểm soát & cải tiến (4 chapters).'),
  createParagraph('Mục tiêu rõ ràng: 1,300 học sinh, 13 tỷ VND, 28 tuần. Phương pháp: 8-tầng funnel, 4-trục kênh, SLA chặt chẽ, QA toàn diện. Khác biệt: Không chỉ "chạy quảng cáo" mà "vận hành hệ thống"—định nghĩa rõ quy trình, SOP, KPI, CRM, analytics. Thành công phụ thuộc vào execution, team alignment, và data-driven optimization tuần sau tuần.'),
  createParagraph('Ngày bắt đầu: 26/03/2026. Deadline enrollment: 30/09/2026. Bắt đầu từ 72 giờ đầu tiên: Lock 20 quyết định chiến lược, xác nhận team, setup công nghệ. Sau đó, chạy hàng tuần theo 5-phase battleplan, track 12 metrics hàng ngày, cải tiến liên tục.')
);

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } }
          }
        ]
      }
    ]
  },
  styles: {
    default: {
      document: {
        run: { font: "Arial", size: 22 }
      }
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: {
          spacing: { before: 240, after: 120 },
          outlineLevel: 0
        }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 28, bold: true, font: "Arial" },
        paragraph: {
          spacing: { before: 180, after: 100 },
          outlineLevel: 1
        }
      },
      {
        id: "Heading3",
        name: "Heading 3",
        basedOn: "Normal",
        next: "Normal",
        quickFormat: true,
        run: { size: 24, bold: true, font: "Arial" },
        paragraph: {
          spacing: { before: 120, after: 80 },
          outlineLevel: 2
        }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [new TextRun({ text: "Kế Hoạch Tuyển Sinh 2026 - V11 Enrollment Operating System", font: 'Arial', size: 20, italic: true })]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            children: [
              new TextRun("Trang "),
              new TextRun({ children: [PageNumber.CURRENT] })
            ],
            alignment: AlignmentType.CENTER
          })
        ]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`DOCX generated successfully: ${outputPath}`);
  console.log(`File size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
});
