/**
 * 🦁 LION CAMP 2026 — TÁCH SEARCH_TINH → CANGIUOC + RACHGIA
 *
 * HƯỚNG DẪN SỬ DỤNG:
 * 1. Mở sheet: https://docs.google.com/spreadsheets/d/1e6f3rkRPDVxWtm91r6M8a51SuZBc3NaX9cmNFh4alUw/edit
 * 2. Menu Extensions → Apps Script
 * 3. Xoá hết code mẫu, paste TOÀN BỘ file này vào
 * 4. Ctrl+S để save
 * 5. Chọn function `splitTinhCampaign` → Run
 * 6. Cho phép permission khi Google hỏi (chỉ chạy trên file sheet này)
 * 7. Quay lại sheet → kiểm tra các tab đã được update
 *
 * Sau đó: File → Download từng tab dưới dạng CSV → Import vào Google Ads Editor
 */

const OLD_CAMPAIGN = 'Search_Tinh_LionCamp2026';
const NEW_CAMPAIGNS = ['Search_CanGiuoc_LionCamp2026', 'Search_RachGia_LionCamp2026'];

function splitTinhCampaign() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const log = [];

  const plan = [
    { tab: '1_Campaigns', campaignCol: 1, rows: CAMPAIGNS_DATA },
    { tab: '2_AdGroups', campaignCol: 1, rows: ADGROUPS_DATA },
    { tab: '3_Keywords', campaignCol: 1, rows: KEYWORDS_DATA },
    { tab: '4_RSA_Ads', campaignCol: 1, rows: RSA_ADS_DATA },
    { tab: '6_Sitelink_Extensions', campaignCol: 1, rows: SITELINKS_DATA },
    { tab: '7_Callout_Extensions', campaignCol: 1, rows: CALLOUTS_DATA },
    { tab: '8_Structured_Snippets', campaignCol: 1, rows: STRUCTURED_DATA },
    { tab: '9_Call_Extensions', campaignCol: 1, rows: CALL_EXT_DATA },
    { tab: '13_Ad_Schedule', campaignCol: 1, rows: AD_SCHEDULE_DATA },
  ];

  plan.forEach(step => {
    const sheet = ss.getSheetByName(step.tab);
    if (!sheet) { log.push('SKIP: no tab ' + step.tab); return; }

    // 1) Delete all rows where col A == OLD_CAMPAIGN (iterate bottom-up)
    const lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      const values = sheet.getRange(2, step.campaignCol, lastRow - 1, 1).getValues();
      let deleted = 0;
      for (let i = values.length - 1; i >= 0; i--) {
        if (values[i][0] === OLD_CAMPAIGN) {
          sheet.deleteRow(i + 2);
          deleted++;
        }
      }
      log.push(step.tab + ': deleted ' + deleted + ' old rows');
    }

    // 2) Append new rows
    if (step.rows.length > 0) {
      const startRow = sheet.getLastRow() + 1;
      sheet.getRange(startRow, 1, step.rows.length, step.rows[0].length).setValues(step.rows);
      log.push(step.tab + ': added ' + step.rows.length + ' new rows');
    }
  });

  // Handle 12_Location_Targets and 15_Bid_Adjustments (may be empty)
  _upsertAnyCampaign(ss, '12_Location_Targets', LOCATION_DATA, log);
  _upsertAnyCampaign(ss, '15_Bid_Adjustments', BIDADJ_DATA, log);

  SpreadsheetApp.getUi().alert('✅ DONE!\n\n' + log.join('\n'));
}

function _upsertAnyCampaign(ss, tabName, rows, log) {
  const sheet = ss.getSheetByName(tabName);
  if (!sheet) { log.push('SKIP: no tab ' + tabName); return; }
  // Delete rows where col A matches either new campaign or old one
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    const values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    let deleted = 0;
    for (let i = values.length - 1; i >= 0; i--) {
      const v = values[i][0];
      if (v === OLD_CAMPAIGN || NEW_CAMPAIGNS.indexOf(v) !== -1) {
        sheet.deleteRow(i + 2);
        deleted++;
      }
    }
    log.push(tabName + ': deleted ' + deleted + ' old rows');
  }
  if (rows.length > 0) {
    const startRow = sheet.getLastRow() + 1;
    sheet.getRange(startRow, 1, rows.length, rows[0].length).setValues(rows);
    log.push(tabName + ': added ' + rows.length + ' new rows');
  }
}

// ============ DATA ============

const CAMPAIGNS_DATA = [
  ['Search_CanGiuoc_LionCamp2026','Search','Enabled','200,000','Maximize conversions','','Google search;Search partners','Vietnamese','Cần Giuộc, Long An, Vietnam','2026-04-18','2026-06-15','Optimize for conversions','','CanGiuoc;Local;Tinh','Form_Submit;Zalo_Click;Book_Tour','15%'],
  ['Search_RachGia_LionCamp2026','Search','Enabled','200,000','Maximize conversions','','Google search;Search partners','Vietnamese','Rạch Giá, Kiên Giang, Vietnam','2026-04-18','2026-06-15','Optimize for conversions','','RachGia;Local;Tinh','Form_Submit;Zalo_Click;Book_Tour','15%'],
];

const ADGROUPS_DATA = [
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','Enabled','8,000','','https://truongvietanh.com/sales-tinh-can-giuoc','CanGiuoc;TH;Phrase','Standard'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','Enabled','10,000','','https://truongvietanh.com/sales-tinh-can-giuoc','CanGiuoc;TH;Exact','Standard'],
  ['Search_CanGiuoc_LionCamp2026','CG_Brand_Local','Enabled','5,000','','https://truongvietanh.com/sales-tinh-can-giuoc','CanGiuoc;Brand','Standard'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','Enabled','8,000','','https://truongvietanh.com/sales-tinh-rach-gia','RachGia;TH;Phrase','Standard'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','Enabled','10,000','','https://truongvietanh.com/sales-tinh-rach-gia','RachGia;TH;Exact','Standard'],
  ['Search_RachGia_LionCamp2026','RG_Brand_Local','Enabled','5,000','','https://truongvietanh.com/sales-tinh-rach-gia','RachGia;Brand','Standard'],
];

const KEYWORDS_DATA = [
  // Cần Giuộc — Phrase (20)
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè cho trẻ em cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè tiểu học long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"lớp hè cho học sinh cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè bán trú long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"khóa hè cho bé long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"chỗ giữ trẻ hè long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trường hè long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè cho con gần khu cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"khóa hè tiếng anh long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè mầm non cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè nhân lễ"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè thái sơn cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè KDC long hậu"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè cần giuộc 2026"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"khóa hè tiểu học cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè trường quốc tế long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè lãnh đạo long an"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè kỹ năng sống cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','"trại hè bán trú cần giuộc"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier2;Phrase'],
  // Cần Giuộc — Exact (7)
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[trại hè cần giuộc]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[trại hè long an]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[trại hè tiểu học cần giuộc]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[khóa hè cần giuộc]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[trại hè bán trú cần giuộc]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[lion camp cần giuộc]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','[trại hè trường việt anh cần giuộc]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Tier1;Exact'],
  // Cần Giuộc — Brand (3)
  ['Search_CanGiuoc_LionCamp2026','CG_Brand_Local','"trường việt anh cần giuộc"','Phrase','5,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Brand'],
  ['Search_CanGiuoc_LionCamp2026','CG_Brand_Local','"lion camp cần giuộc"','Phrase','5,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Brand'],
  ['Search_CanGiuoc_LionCamp2026','CG_Brand_Local','"trường việt anh long an"','Phrase','5,000','Enabled','https://truongvietanh.com/sales-tinh-can-giuoc','Brand'],
  // Rạch Giá — Phrase (18)
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè kiên giang"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè tiểu học rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"lớp hè rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè bán trú kiên giang"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"khóa hè cho bé rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"chỗ giữ trẻ hè rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trường hè rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè KĐT Tây Bắc rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"khóa hè tiếng anh rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè mekong xanh"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè kiên giang 2026"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"khóa hè tiểu học kiên giang"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè lãnh đạo kiên giang"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè trường quốc tế kiên giang"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè anh ngữ rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè kỹ năng sống rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','"trại hè mầm non rạch giá"','Phrase','8,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier2;Phrase'],
  // Rạch Giá — Exact (7)
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[trại hè rạch giá]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[trại hè kiên giang]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[trại hè tiểu học rạch giá]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[khóa hè rạch giá]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[trại hè bán trú rạch giá]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[lion camp rạch giá]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','[trại hè trường việt anh rạch giá]','Exact','10,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Tier1;Exact'],
  // Rạch Giá — Brand (3)
  ['Search_RachGia_LionCamp2026','RG_Brand_Local','"trường việt anh rạch giá"','Phrase','5,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Brand'],
  ['Search_RachGia_LionCamp2026','RG_Brand_Local','"lion camp rạch giá"','Phrase','5,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Brand'],
  ['Search_RachGia_LionCamp2026','RG_Brand_Local','"trường việt anh kiên giang"','Phrase','5,000','Enabled','https://truongvietanh.com/sales-tinh-rach-gia','Brand'],
];

const RSA_ADS_DATA = [
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','Responsive search ad','Enabled','Trại Hè Tiểu Học Cần Giuộc',1,'Lion Camp Nhân Lễ & Thái Sơn',2,'Bán Trú An Toàn Cho Bé',3,'Khai Giảng 15/06 Cần Giuộc','Có Xe Đưa Đón KDC','Ưu Đãi Early Bird 15%','Nhắn Zalo Tư Vấn Miễn Phí','Giáo Viên Bản Ngữ Tiếng Anh','Ba Mẹ Yên Tâm Đi Làm Hè','Chương Trình 6 Tuần','Đặt Tham Quan Cuối Tuần','Hoạt Động Ngoài Trời','Rèn Kỹ Năng Sống Cho Bé','Còn Suất Hè 2026','Hotline 0916 961 409','Trại hè tiểu học bán trú tại Cần Giuộc, Long An. Nhân Lễ & Thái Sơn. An toàn vui.','Giáo viên bản ngữ tiếng Anh + kỹ năng sống + hoạt động ngoài trời mỗi ngày.','Nhắn Zalo 0916 961 409 tư vấn riêng cho con. Ưu đãi Early Bird đến 30/04.','Bán trú 2 bữa ngủ trưa có xe đưa đón. Khai giảng 15/06. Còn suất giữ chỗ ngay.','trai-he','can-giuoc','https://truongvietanh.com/sales-tinh-can-giuoc','Tinh;CanGiuoc;V1'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Phrase','Responsive search ad','Enabled','Trại Hè Long An 2026',1,'6 Tuần Bán Trú Tiếng Anh',2,'Khai Giảng 15/06/2026',3,'Lion Camp Cần Giuộc','Xe Đưa Đón Long Hậu','Tặng Balo Đồng Phục','Học Phí Ưu Đãi Hè','100% HS IELTS 6.0+','Đăng Ký Online Nhận Suất','Top 15 Leader In Me','Giáo Viên Người Nước Ngoài','Rèn Lãnh Đạo Từ Nhỏ','Cam Kết Hoàn Phí 100%','Còn 30 Suất Tiểu Học','Zalo 0916 961 409','Trại hè 6 tuần tại Cần Giuộc, Long An. Bán trú + tiếng Anh bản ngữ + kỹ năng.','KDC Long Hậu Nhân Lễ Thái Sơn. Có xe đưa đón. An toàn tuyệt đối cho bé.','Ưu đãi Early Bird 15% đến 30/04. Đăng ký online nhận ngay học phí tốt nhất.','100% học sinh cũ đạt IELTS 6.0+. Trường Top 15 Leader In Me Châu Á 2023.','trai-he-2026','long-an','https://truongvietanh.com/sales-tinh-can-giuoc','Tinh;CanGiuoc;V2'],
  ['Search_CanGiuoc_LionCamp2026','CG_TH_Exact','Responsive search ad','Enabled','Trại Hè Cần Giuộc 2026',1,'Lion Camp Bán Trú',2,'Đặt Suất Giữ Chỗ Ngay',3,'Khai Giảng 15/06 Cần Giuộc','Còn Suất Tiểu Học Hè','Ưu Đãi 15% Early Bird','Hotline 0916 961 409','Xe Đưa Đón KDC Long Hậu','Giáo Viên Bản Ngữ','6 Tuần Bán Trú An Toàn','Miễn Phí Tham Quan','Học Tiếng Anh IELTS','Rèn Kỹ Năng Lãnh Đạo','Cam Kết Hoàn Phí 100%','Top 15 Leader In Me','Trại hè tiểu học Cần Giuộc khai giảng 15/06/2026. Bán trú an toàn, vui khỏe.','Giáo viên bản ngữ + tiếng Anh IELTS + kỹ năng sống. 6 tuần trải nghiệm.','Đăng ký online hôm nay giữ chỗ cho bé. Ưu đãi Early Bird đến 30/04.','Zalo 0916 961 409 - tư vấn miễn phí. 100% HS IELTS 6.0+. Top 15 Leader In Me.','trai-he','can-giuoc-2026','https://truongvietanh.com/sales-tinh-can-giuoc','Tinh;CanGiuoc;Exact'],
  ['Search_CanGiuoc_LionCamp2026','CG_Brand_Local','Responsive search ad','Enabled','Trường Việt Anh Cần Giuộc',1,'Lion Camp Trại Hè 2026',2,'Khai Giảng 15/06 Cần Giuộc',3,'Chương Trình Hè Bán Trú','Giáo Viên Bản Ngữ IELTS','Top 15 Leader In Me Châu Á','Ưu Đãi 15% Early Bird','Xe Đưa Đón KDC Long Hậu','Nhắn Zalo 0916 961 409','6 Tuần Bán Trú An Toàn','Hoạt Động Ngoài Trời','Kỹ Năng Lãnh Đạo Cho Bé','100% HS IELTS 6.0+','Đặt Tham Quan Miễn Phí','Còn Suất Hè Cần Giuộc','Trường Việt Anh - Lion Camp 2026 tại Cần Giuộc, Long An. Trại hè chuẩn quốc tế.','Top 15 Leader In Me Châu Á 2023. 100% HS IELTS 6.0+. An toàn & vui.','Khai giảng 15/06/2026. 6 tuần bán trú. Xe đưa đón. Giáo viên bản ngữ.','Ưu đãi Early Bird 15% đến 30/04. Nhắn Zalo 0916 961 409 giữ chỗ ngay.','truong-viet-anh','can-giuoc','https://truongvietanh.com/sales-tinh-can-giuoc','Tinh;CanGiuoc;Brand'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','Responsive search ad','Enabled','Trại Hè Tiểu Học Rạch Giá',1,'Lion Camp Mekong Xanh',2,'Bán Trú An Toàn Cho Bé',3,'Khai Giảng 15/06 Rạch Giá','KĐT Tây Bắc Kiên Giang','Ưu Đãi Early Bird 15%','Nhắn Zalo Tư Vấn Miễn Phí','Giáo Viên Bản Ngữ Tiếng Anh','Ba Mẹ Yên Tâm Đi Làm Hè','Chương Trình 6 Tuần','Đặt Tham Quan Cuối Tuần','Hoạt Động Ngoài Trời','Rèn Kỹ Năng Sống Cho Bé','Còn Suất Hè 2026','Hotline 0916 961 409','Trại hè tiểu học bán trú tại Rạch Giá, Kiên Giang. Mekong Xanh KĐT Tây Bắc.','Giáo viên bản ngữ tiếng Anh + kỹ năng sống + hoạt động ngoài trời mỗi ngày.','Nhắn Zalo 0916 961 409 tư vấn riêng cho con. Ưu đãi Early Bird đến 30/04.','Bán trú 2 bữa ngủ trưa có xe đưa đón. Khai giảng 15/06. Còn suất giữ chỗ ngay.','trai-he','rach-gia','https://truongvietanh.com/sales-tinh-rach-gia','Tinh;RachGia;V1'],
  ['Search_RachGia_LionCamp2026','RG_TH_Phrase','Responsive search ad','Enabled','Trại Hè Kiên Giang 2026',1,'6 Tuần Bán Trú Tiếng Anh',2,'Khai Giảng 15/06/2026',3,'Lion Camp Rạch Giá','Xe Đưa Đón Tây Bắc','Tặng Balo Đồng Phục','Học Phí Ưu Đãi Hè','100% HS IELTS 6.0+','Đăng Ký Online Nhận Suất','Top 15 Leader In Me','Giáo Viên Người Nước Ngoài','Rèn Lãnh Đạo Từ Nhỏ','Cam Kết Hoàn Phí 100%','Còn 30 Suất Tiểu Học','Zalo 0916 961 409','Trại hè 6 tuần tại Rạch Giá, Kiên Giang. Bán trú + tiếng Anh bản ngữ + kỹ năng.','KĐT Tây Bắc Mekong Xanh Rạch Sỏi. Có xe đưa đón. An toàn tuyệt đối cho bé.','Ưu đãi Early Bird 15% đến 30/04. Đăng ký online nhận ngay học phí tốt nhất.','100% học sinh cũ đạt IELTS 6.0+. Trường Top 15 Leader In Me Châu Á 2023.','trai-he-2026','kien-giang','https://truongvietanh.com/sales-tinh-rach-gia','Tinh;RachGia;V2'],
  ['Search_RachGia_LionCamp2026','RG_TH_Exact','Responsive search ad','Enabled','Trại Hè Rạch Giá 2026',1,'Lion Camp Bán Trú',2,'Đặt Suất Giữ Chỗ Ngay',3,'Khai Giảng 15/06 Rạch Giá','Còn Suất Tiểu Học Hè','Ưu Đãi 15% Early Bird','Hotline 0916 961 409','Xe Đưa Đón KĐT Tây Bắc','Giáo Viên Bản Ngữ','6 Tuần Bán Trú An Toàn','Miễn Phí Tham Quan','Học Tiếng Anh IELTS','Rèn Kỹ Năng Lãnh Đạo','Cam Kết Hoàn Phí 100%','Top 15 Leader In Me','Trại hè tiểu học Rạch Giá khai giảng 15/06/2026. Bán trú an toàn, vui khỏe.','Giáo viên bản ngữ + tiếng Anh IELTS + kỹ năng sống. 6 tuần trải nghiệm.','Đăng ký online hôm nay giữ chỗ cho bé. Ưu đãi Early Bird đến 30/04.','Zalo 0916 961 409 - tư vấn miễn phí. 100% HS IELTS 6.0+. Top 15 Leader In Me.','trai-he','rach-gia-2026','https://truongvietanh.com/sales-tinh-rach-gia','Tinh;RachGia;Exact'],
  ['Search_RachGia_LionCamp2026','RG_Brand_Local','Responsive search ad','Enabled','Trường Việt Anh Rạch Giá',1,'Lion Camp Trại Hè 2026',2,'Khai Giảng 15/06 Rạch Giá',3,'Chương Trình Hè Bán Trú','Giáo Viên Bản Ngữ IELTS','Top 15 Leader In Me Châu Á','Ưu Đãi 15% Early Bird','Xe Đưa Đón KĐT Tây Bắc','Nhắn Zalo 0916 961 409','6 Tuần Bán Trú An Toàn','Hoạt Động Ngoài Trời','Kỹ Năng Lãnh Đạo Cho Bé','100% HS IELTS 6.0+','Đặt Tham Quan Miễn Phí','Còn Suất Hè Rạch Giá','Trường Việt Anh - Lion Camp 2026 tại Rạch Giá, Kiên Giang. Trại hè chuẩn quốc tế.','Top 15 Leader In Me Châu Á 2023. 100% HS IELTS 6.0+. An toàn & vui.','Khai giảng 15/06/2026. 6 tuần bán trú. Xe đưa đón. Giáo viên bản ngữ.','Ưu đãi Early Bird 15% đến 30/04. Nhắn Zalo 0916 961 409 giữ chỗ ngay.','truong-viet-anh','rach-gia','https://truongvietanh.com/sales-tinh-rach-gia','Tinh;RachGia;Brand'],
];

const SITELINKS_DATA = [
  ['Search_CanGiuoc_LionCamp2026','Xem Học Phí 2026','Bảng học phí trại hè','Ưu đãi Early Bird 15%','https://truongvietanh.com/hoc-phi-lion-camp',''],
  ['Search_CanGiuoc_LionCamp2026','Đặt Tham Quan','Miễn phí cuối tuần','Gặp GV và lớp học','https://truongvietanh.com/dat-tham-quan',''],
  ['Search_CanGiuoc_LionCamp2026','Cơ Sở Cần Giuộc','KDC Long Hậu','Nhân Lễ Thái Sơn','https://truongvietanh.com/co-so-can-giuoc',''],
  ['Search_CanGiuoc_LionCamp2026','FAQ Phụ Huynh','Ăn uống ngủ nghỉ','Xe đưa đón đồng phục','https://truongvietanh.com/faq',''],
  ['Search_CanGiuoc_LionCamp2026','Chương Trình Tiểu Học','Hè 6 tuần bán trú','Tiếng Anh + kỹ năng','https://truongvietanh.com/sales-tinh-can-giuoc',''],
  ['Search_CanGiuoc_LionCamp2026','Hotline 0916 961 409','Tư vấn miễn phí','Zalo 24/7','https://truongvietanh.com/sales-tinh-can-giuoc','mobile'],
  ['Search_RachGia_LionCamp2026','Xem Học Phí 2026','Bảng học phí trại hè','Ưu đãi Early Bird 15%','https://truongvietanh.com/hoc-phi-lion-camp',''],
  ['Search_RachGia_LionCamp2026','Đặt Tham Quan','Miễn phí cuối tuần','Gặp GV và lớp học','https://truongvietanh.com/dat-tham-quan',''],
  ['Search_RachGia_LionCamp2026','Cơ Sở Rạch Giá','KĐT Tây Bắc Mekong Xanh','Rạch Sỏi Kiên Giang','https://truongvietanh.com/co-so-rach-gia',''],
  ['Search_RachGia_LionCamp2026','FAQ Phụ Huynh','Ăn uống ngủ nghỉ','Xe đưa đón đồng phục','https://truongvietanh.com/faq',''],
  ['Search_RachGia_LionCamp2026','Chương Trình Tiểu Học','Hè 6 tuần bán trú','Tiếng Anh + kỹ năng','https://truongvietanh.com/sales-tinh-rach-gia',''],
  ['Search_RachGia_LionCamp2026','Hotline 0916 961 409','Tư vấn miễn phí','Zalo 24/7','https://truongvietanh.com/sales-tinh-rach-gia','mobile'],
];

const CALLOUTS_DATA = (() => {
  const texts = ['Bán Trú 2 Bữa Ngủ Trưa','Xe Đưa Đón Tận Nhà','Giáo Viên Bản Ngữ IELTS','Khai Giảng 15/06/2026','Ưu Đãi Early Bird 15%','Nhắn Zalo Tư Vấn Ngay','100% HS IELTS 6.0+','Hotline 0916 961 409','Cam Kết Hoàn Phí 100%','Top 15 Leader In Me 2023'];
  const out = [];
  NEW_CAMPAIGNS.forEach(c => texts.forEach(t => out.push([c, t, ''])));
  return out;
})();

const STRUCTURED_DATA = [
  ['Search_CanGiuoc_LionCamp2026','Service catalog','Mầm non;Tiểu học;Bán trú;Tiếng Anh;Kỹ năng sống'],
  ['Search_RachGia_LionCamp2026','Service catalog','Mầm non;Tiểu học;Bán trú;Tiếng Anh;Kỹ năng sống'],
];

const CALL_EXT_DATA = [
  ['Search_CanGiuoc_LionCamp2026','VN','0916961409','On','Phone_Call_Conversion','Mon-Sun 7:00-22:00'],
  ['Search_RachGia_LionCamp2026','VN','0916961409','On','Phone_Call_Conversion','Mon-Sun 7:00-22:00'],
];

const LOCATION_DATA = [
  ['Search_CanGiuoc_LionCamp2026','City','Cần Giuộc, Long An, Vietnam','','+0%','No'],
  ['Search_CanGiuoc_LionCamp2026','Radius','Cần Giuộc, Long An, Vietnam','15 km','+10%','No'],
  ['Search_CanGiuoc_LionCamp2026','City','Long An, Vietnam','','+0%','No'],
  ['Search_RachGia_LionCamp2026','City','Rạch Giá, Kiên Giang, Vietnam','','+0%','No'],
  ['Search_RachGia_LionCamp2026','Radius','Rạch Giá, Kiên Giang, Vietnam','20 km','+10%','No'],
  ['Search_RachGia_LionCamp2026','City','Kiên Giang, Vietnam','','+0%','No'],
];

const BIDADJ_DATA = [
  ['Search_CanGiuoc_LionCamp2026','Device','Mobile','+15%'],
  ['Search_CanGiuoc_LionCamp2026','Device','Desktop','+0%'],
  ['Search_CanGiuoc_LionCamp2026','Device','Tablet','-20%'],
  ['Search_RachGia_LionCamp2026','Device','Mobile','+15%'],
  ['Search_RachGia_LionCamp2026','Device','Desktop','+0%'],
  ['Search_RachGia_LionCamp2026','Device','Tablet','-20%'],
];

const AD_SCHEDULE_DATA = (() => {
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const slots = [['06:00','12:00','+0%'],['12:00','17:00','+10%'],['17:00','22:00','+20%'],['22:00','23:00','+0%']];
  const out = [];
  NEW_CAMPAIGNS.forEach(c => days.forEach(d => slots.forEach(s => out.push([c, d, s[0], s[1], s[2]]))));
  return out;
})();
