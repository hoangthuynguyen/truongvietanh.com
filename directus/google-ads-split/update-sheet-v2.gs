/**
 * 🦁 LION CAMP 2026 — WAR MACHINE v3 (ALIGNED WITH XLSX 2026-04-16)
 * Budget: ~630M VND / 8 tuần → mục tiêu 3.000 leads
 *
 * FIXES vs v2:
 * - C_CG = 'Search_CanGiuoc'         (không phải _Core)
 * - C_RG = 'Search_RachGia'          (không phải _Core)
 * - C_RMK = 'Remarketing_Close'      (Search/RLSA, không phải Display)
 * - NEG_MASTER = 'Lion_Camp_2026_Negatives_Master'
 * - Budget: 9M/9M/9M/2.2M/2.7M/1.8M/5.4M/5.9M per day
 * - Bid: Target CPA (280K/280K/290K/320K/300K/180K/–/290K)
 * - URLs aligned với xlsx landing pages
 * - Ad group names per xlsx 2_AdGroups
 * - Keywords expanded từ xlsx 3_Keywords + thêm mới
 * - Negatives: 4 shared sets per xlsx 5_Negatives_Shared
 *
 * HƯỚNG DẪN:
 * 1. Extensions → Apps Script → xoá code cũ → paste file này
 * 2. Ctrl+S → chọn `updateWarMachine` → Run → Authorize
 * 3. Script xoá data cũ (idempotent) và ghi 8 campaigns mới
 * ⚠️  PMax (C8): Asset Groups/Audiences phải setup thủ công trong Ads UI.
 * ⚠️  Remarketing_Close: attach Audience Lists (RMK) trong Ads UI.
 */

// ── Campaign names ─────────────────────────────────────────────────────────────
const C_GOV   = 'Search_Govap_Core';
const C_BT    = 'Search_BinhTan_Core';
const C_PAIN  = 'Search_PainPoint_All';
const C_CG    = 'Search_CanGiuoc';
const C_RG    = 'Search_RachGia';
const C_BRAND = 'Search_Brand_Defense';
const C_RMK   = 'Remarketing_Close';
const C_PMAX  = 'Performance_Max_All';

// Negative keyword shared sets
const NEG_MASTER = 'Lion_Camp_2026_Negatives_Master';
const NEG_TH     = 'Lion_Camp_2026_Negatives_TieuHoc';
const NEG_THPT   = 'Lion_Camp_2026_Negatives_THPT';
const NEG_PP     = 'Lion_Camp_2026_Negatives_PainPoint';

// Old names to clean up (idempotent)
const OLD_NAMES = [
  'Search_Tinh_LionCamp2026','Search_CanGiuoc_LionCamp2026','Search_RachGia_LionCamp2026',
  'Search_GoVap_LionCamp2026','Search_BinhTan_LionCamp2026','RMK_All_LionCamp2026',
  'Search_Tinh_LongHau','Search_CanGiuoc_Core','Search_RachGia_Core',
  'Display_YouTube_Remarketing','LionCamp_MainNeg','LionCamp_TinhNeg',
  NEG_MASTER, NEG_TH, NEG_THPT, NEG_PP,
];
const ALL_NEW    = [C_GOV,C_BT,C_PAIN,C_CG,C_RG,C_BRAND,C_RMK,C_PMAX];
const DELETE_SET = new Set([...OLD_NAMES,...ALL_NEW]);

// ── Landing pages (aligned with xlsx) ─────────────────────────────────────────
const B            = 'https://truongvietanh.com';
const URL_GOV_TH   = B+'/quiz-trai-he-tieu-hoc-go-vap';
const URL_GOV_THCS = B+'/vsl-trai-he-thcs-go-vap';
const URL_GOV_THPT = B+'/vsl-trai-he-thpt-go-vap';
const URL_BT_TH    = B+'/quiz-trai-he-tieu-hoc-binh-tan';
const URL_BT_THCS  = B+'/vsl-trai-he-thcs-binh-tan';
const URL_BT_THPT  = B+'/vsl-trai-he-thpt-binh-tan';
const URL_PAIN_TH  = B+'/quiz-trai-he-tieu-hoc';
const URL_PAIN_THCS= B+'/vsl-trai-he-thcs';
const URL_PAIN_THPT= B+'/vsl-trai-he-thpt';
const URL_CG       = B+'/quiz-trai-he-tieu-hoc-can-giuoc';
const URL_RG_TH    = B+'/quiz-trai-he-tieu-hoc-rach-gia';
const URL_RG_THCS  = B+'/vsl-trai-he-thcs-thpt-tinh';
const URL_CMP      = B+'/sales-comparison';
const URL_BRAND    = B+'/lion-camp';
const URL_FAQ      = B+'/faq';
const URL_COSOU    = B+'/co-so';
const URL_HOCPHI   = B+'/hoc-phi-lion-camp';
const URL_THAMQUAN = B+'/dat-tham-quan';
const URL_DANGKY   = B+'/dang-ky';

// ── Main function ──────────────────────────────────────────────────────────────
function updateWarMachine() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const log = [];
  const plan = [
    { tab:'1_Campaigns',           rows:CAMPAIGNS_DATA },
    { tab:'2_AdGroups',            rows:ADGROUPS_DATA },
    { tab:'3_Keywords',            rows:KEYWORDS_DATA },
    { tab:'4_RSA_Ads',             rows:RSA_ADS_DATA },
    { tab:'5_Negatives_Shared',    rows:NEGATIVES_DATA, create:true },
    { tab:'6_Sitelink_Extensions', rows:SITELINKS_DATA },
    { tab:'7_Callout_Extensions',  rows:CALLOUTS_DATA },
    { tab:'8_Structured_Snippets', rows:STRUCTURED_DATA },
    { tab:'9_Call_Extensions',     rows:CALL_EXT_DATA },
    { tab:'13_Ad_Schedule',        rows:AD_SCHEDULE_DATA },
    { tab:'12_Location_Targets',   rows:LOCATION_DATA },
    { tab:'15_Bid_Adjustments',    rows:BIDADJ_DATA },
  ];
  plan.forEach(step => {
    let sheet = ss.getSheetByName(step.tab);
    if (!sheet) {
      if (step.create) { sheet = ss.insertSheet(step.tab); log.push('➕ TẠO tab: "'+step.tab+'"'); }
      else { log.push('⚠️  SKIP: "'+step.tab+'" không tồn tại'); return; }
    }
    const lr = sheet.getLastRow(); let deleted = 0;
    if (lr >= 2) {
      const vals = sheet.getRange(2,1,lr-1,1).getValues();
      for (let i=vals.length-1;i>=0;i--) {
        if (DELETE_SET.has(vals[i][0])) { sheet.deleteRow(i+2); deleted++; }
      }
    }
    if (step.rows.length > 0) {
      sheet.getRange(sheet.getLastRow()+1,1,step.rows.length,step.rows[0].length).setValues(step.rows);
    }
    log.push('✅ '+step.tab+': -'+deleted+' cũ, +'+step.rows.length+' mới');
  });
  const msg =
    '🎉 WAR MACHINE v3 DEPLOYED!\n\n'+log.join('\n')+
    '\n\n⚠️  PMax (C8): setup Asset Groups/Audiences thủ công trong Ads UI.\n'+
    '⚠️  Remarketing_Close: attach Audience Lists trong Ads UI.\n'+
    'Bid week1→Max Click, week2-3→Max Conv, week4+→tCPA theo plan.';
  Logger.log(msg);
  try { SpreadsheetApp.getUi().alert(msg); } catch(e) { /* chạy từ editor — xem log ở trên */ }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1_Campaigns
// [Campaign, Type, Status, Daily Budget, Bid strategy, tCPA, Networks,
//  Language, Locations, Start, End, Ad rotation, Freq cap, Labels, Conversions]
// ═══════════════════════════════════════════════════════════════════════════════
const CAMPAIGNS_DATA = [
  [C_GOV,  'Search','Enabled','9,000,000','Target CPA','280,000',
   'Google search;Search partners','Vietnamese','Gò Vấp, Ho Chi Minh City, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','GovapCore;Search',
   'Form_Submit;Zalo_Click;Book_Tour;Phone_Call'],
  [C_BT,   'Search','Enabled','9,000,000','Target CPA','280,000',
   'Google search;Search partners','Vietnamese','Bình Tân, Ho Chi Minh City, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','BinhTanCore;Search',
   'Form_Submit;Zalo_Click;Book_Tour;Phone_Call'],
  [C_PAIN, 'Search','Enabled','9,000,000','Target CPA','290,000',
   'Google search;Search partners','Vietnamese','Ho Chi Minh City, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','PainPoint;Search;Scale',
   'Form_Submit;Zalo_Click;Book_Tour;Phone_Call'],
  [C_CG,   'Search','Enabled','2,200,000','Target CPA','320,000',
   'Google search;Search partners','Vietnamese','Cần Giuộc, Long An, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','CanGiuoc;Search;Tinh',
   'Form_Submit;Zalo_Click;Book_Tour'],
  [C_RG,   'Search','Enabled','2,700,000','Target CPA','300,000',
   'Google search;Search partners','Vietnamese','Rạch Giá, Kiên Giang, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','RachGia;Search;Tinh',
   'Form_Submit;Zalo_Click;Book_Tour'],
  [C_BRAND,'Search','Enabled','1,800,000','Target CPA','180,000',
   'Google search','Vietnamese',
   'Ho Chi Minh City, Vietnam;Long An, Vietnam;Kiên Giang, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','Brand;Defense',
   'Form_Submit;Zalo_Click;Book_Tour'],
  [C_RMK,  'Search','Enabled','5,400,000','Maximize conversions','',
   'Google search;Search partners','Vietnamese',
   'Ho Chi Minh City, Vietnam;Long An, Vietnam;Kiên Giang, Vietnam',
   '2026-04-20','2026-06-15','Optimize for conversions','','Remarketing;RLSA;Close',
   'Form_Submit;Zalo_Click'],
  [C_PMAX, 'Performance Max','Enabled','5,900,000','Target CPA','290,000',
   'All networks','Vietnamese',
   'Ho Chi Minh City, Vietnam;Long An, Vietnam;Kiên Giang, Vietnam',
   '2026-04-20','2026-06-15','','','PMax;Expand',
   'Form_Submit;Zalo_Click;Book_Tour'],
];

// ═══════════════════════════════════════════════════════════════════════════════
// 2_AdGroups
// [Campaign, Ad Group, Status, Max CPC, Max CPM, Final URL, Labels, Type]
// ═══════════════════════════════════════════════════════════════════════════════
const ADGROUPS_DATA = [
  // Search_Govap_Core — 7 ad groups
  [C_GOV,'TieuHoc_HighIntent_Govap', 'Enabled','10,000','',URL_GOV_TH,  'GOV;TH;HI',  'Standard'],
  [C_GOV,'TieuHoc_Pain_Govap',       'Enabled','8,000', '',URL_GOV_TH,  'GOV;TH;Pain','Standard'],
  [C_GOV,'THCS_HighIntent_Govap',    'Enabled','10,000','',URL_GOV_THCS,'GOV;THCS;HI','Standard'],
  [C_GOV,'THCS_Pain_Govap',          'Enabled','8,000', '',URL_GOV_THCS,'GOV;THCS;Pain','Standard'],
  [C_GOV,'THPT_HighIntent_Govap',    'Enabled','10,000','',URL_GOV_THPT,'GOV;THPT;HI','Standard'],
  [C_GOV,'THPT_Pain_Govap',          'Enabled','8,000', '',URL_GOV_THPT,'GOV;THPT;Pain','Standard'],
  [C_GOV,'Competitor_Govap',         'Enabled','12,000','',URL_CMP,     'GOV;Competitor','Standard'],
  // Search_BinhTan_Core — 7 ad groups
  [C_BT,'TieuHoc_HighIntent_BinhTan','Enabled','10,000','',URL_BT_TH,   'BT;TH;HI',  'Standard'],
  [C_BT,'TieuHoc_Pain_BinhTan',      'Enabled','8,000', '',URL_BT_TH,   'BT;TH;Pain','Standard'],
  [C_BT,'THCS_HighIntent_BinhTan',   'Enabled','10,000','',URL_BT_THCS, 'BT;THCS;HI','Standard'],
  [C_BT,'THCS_Pain_BinhTan',         'Enabled','8,000', '',URL_BT_THCS, 'BT;THCS;Pain','Standard'],
  [C_BT,'THPT_HighIntent_BinhTan',   'Enabled','10,000','',URL_BT_THPT, 'BT;THPT;HI','Standard'],
  [C_BT,'THPT_Pain_BinhTan',         'Enabled','8,000', '',URL_BT_THPT, 'BT;THPT;Pain','Standard'],
  [C_BT,'Competitor_BinhTan',        'Enabled','12,000','',URL_CMP,     'BT;Competitor','Standard'],
  // Search_PainPoint_All — 3 ad groups
  [C_PAIN,'Pain_TieuHoc_All',        'Enabled','7,000', '',URL_PAIN_TH,  'PAIN;TH',  'Standard'],
  [C_PAIN,'Pain_THCS_All',           'Enabled','7,000', '',URL_PAIN_THCS,'PAIN;THCS','Standard'],
  [C_PAIN,'Pain_THPT_All',           'Enabled','8,000', '',URL_PAIN_THPT,'PAIN;THPT','Standard'],
  // Search_CanGiuoc — 3 ad groups
  [C_CG,'TieuHoc_HighIntent_CanGiuoc','Enabled','8,000','',URL_CG,'CG;TH;HI',  'Standard'],
  [C_CG,'TieuHoc_Pain_CanGiuoc',     'Enabled','6,000','',URL_CG,'CG;TH;Pain','Standard'],
  [C_CG,'Generic_CanGiuoc',          'Enabled','5,000','',URL_CG,'CG;Generic','Standard'],
  // Search_RachGia — 3 ad groups
  [C_RG,'TieuHoc_HighIntent_RachGia','Enabled','8,000', '',URL_RG_TH,  'RG;TH;HI',  'Standard'],
  [C_RG,'TieuHoc_Pain_RachGia',      'Enabled','6,000', '',URL_RG_TH,  'RG;TH;Pain','Standard'],
  [C_RG,'THCS_THPT_RachGia',         'Enabled','7,000', '',URL_RG_THCS,'RG;THCS;THPT','Standard'],
  // Search_Brand_Defense — 1 ad group
  [C_BRAND,'Brand_LionCamp',         'Enabled','5,000', '',URL_BRAND,'Brand;Defense','Standard'],
  // Remarketing_Close — Search/RLSA (3 ad groups)
  [C_RMK,'RMK_QuizAbandon',          'Enabled','8,000', '',URL_PAIN_TH, 'RMK;QuizAbandon','Standard'],
  [C_RMK,'RMK_VSLViewer',            'Enabled','9,000', '',URL_PAIN_THCS,'RMK;VSLViewer','Standard'],
  [C_RMK,'RMK_SalesPageVisit',       'Enabled','10,000','',URL_PAIN_TH, 'RMK;SalesPage','Standard'],
  // Performance_Max_All — no ad groups (asset groups in UI)
];

// ═══════════════════════════════════════════════════════════════════════════════
// 3_Keywords
// [Campaign, Ad Group, Keyword, Match type, Max CPC, Status, Final URL, Labels]
// ═══════════════════════════════════════════════════════════════════════════════
const KEYWORDS_DATA = [

  // ─── C1: Search_Govap_Core ───────────────────────────────────────────────────

  // TieuHoc_HighIntent_Govap — 18 Phrase + 18 Exact (từ xlsx)
  ...[
    'trại hè tiểu học gò vấp','trại hè gò vấp cho trẻ','trại hè bán trú gò vấp',
    'trại hè thiếu nhi gò vấp','trại hè gò vấp 2026','lion camp gò vấp',
    'trại hè gò vấp tiểu học','khóa hè gò vấp cho bé','trại hè bán trú tại gò vấp',
    'tìm trại hè gò vấp','đăng ký trại hè gò vấp','trại hè cho bé gò vấp',
    'trại hè quận gò vấp','camp hè gò vấp','trại hè việt anh gò vấp',
    'trại hè phan huy ích','trại hè gần gò vấp','trại hè trường quốc tế gò vấp',
  ].flatMap(k => [
    [C_GOV,'TieuHoc_HighIntent_Govap','"'+k+'"','Phrase','10,000','Enabled',URL_GOV_TH,'GOV;TH;HI'],
    [C_GOV,'TieuHoc_HighIntent_Govap','['+k+']','Exact', '10,000','Enabled',URL_GOV_TH,'GOV;TH;HI;Exact'],
  ]),

  // TieuHoc_Pain_Govap — 18 Phrase (từ xlsx)
  ...[
    'chỗ giữ trẻ hè gò vấp','gửi con mùa hè gò vấp','chỗ gửi con mùa hè',
    'trường hè tiểu học','khóa hè cho bé lớp 1 5','lớp hè cho trẻ em',
    'giữ trẻ ban ngày mùa hè','hè con không biết làm gì','trại hè bán trú cho con',
    'khóa hè kỹ năng sống cho bé','trại hè phát triển kỹ năng','chương trình hè tiểu học',
    'trại hè tiếng anh tiểu học','khóa hè tiếng anh cho bé','hè ba mẹ đi làm con ở đâu',
    'hè gửi con ở đâu an toàn','chỗ trông con mùa hè','học hè cho con gò vấp',
  ].map(k => [C_GOV,'TieuHoc_Pain_Govap','"'+k+'"','Phrase','8,000','Enabled',URL_GOV_TH,'GOV;TH;Pain']),

  // THCS_HighIntent_Govap — 10 Phrase + 10 Exact
  ...[
    'trại hè thcs gò vấp','trại hè cấp 2 gò vấp','trại hè học sinh cấp 2 gò vấp',
    'lion camp thcs gò vấp','trại hè thcs 2026 gò vấp','khóa hè thcs gò vấp',
    'trại hè lớp 6 7 8 gò vấp','đăng ký trại hè cấp 2 gò vấp',
    'camp hè thcs gò vấp','trại hè lớp 9 gò vấp',
  ].flatMap(k => [
    [C_GOV,'THCS_HighIntent_Govap','"'+k+'"','Phrase','10,000','Enabled',URL_GOV_THCS,'GOV;THCS;HI'],
    [C_GOV,'THCS_HighIntent_Govap','['+k+']','Exact', '10,000','Enabled',URL_GOV_THCS,'GOV;THCS;HI;Exact'],
  ]),

  // THCS_Pain_Govap — 18 Phrase
  ...[
    'khóa hè kỹ năng sống thcs','học hè cho học sinh cấp 2','hoạt động hè cho học sinh',
    'khóa hè tiếng anh cấp 2','trại hè rèn luyện kỹ năng','trại hè tiếng anh thcs',
    'trại hè kỹ năng mềm','trại hè leadership cho teen','khóa hè debate tiếng anh',
    'khóa hè ielts junior','trại hè stem thcs','trại hè cho học sinh lớp 6 7 8',
    'khóa hè giúp con tự lập','hè cho con không nghiện điện thoại',
    'hoạt động ngoài trời cho teen','trại hè phát triển bản thân',
    'con học hè gì tốt','hè cho con cấp 2 làm gì',
  ].map(k => [C_GOV,'THCS_Pain_Govap','"'+k+'"','Phrase','8,000','Enabled',URL_GOV_THCS,'GOV;THCS;Pain']),

  // THPT_HighIntent_Govap — 10 Phrase + 10 Exact
  ...[
    'trại hè thpt gò vấp','trại hè hướng nghiệp gò vấp','lion camp thpt gò vấp',
    'trại hè cấp 3 gò vấp','trại hè học sinh cấp 3 gò vấp','trại hè thpt 2026',
    'khóa hè lớp 10 11 12 gò vấp','đăng ký trại hè thpt gò vấp',
    'trại hè lãnh đạo thpt gò vấp','camp hè cấp 3 gò vấp',
  ].flatMap(k => [
    [C_GOV,'THPT_HighIntent_Govap','"'+k+'"','Phrase','10,000','Enabled',URL_GOV_THPT,'GOV;THPT;HI'],
    [C_GOV,'THPT_HighIntent_Govap','['+k+']','Exact', '10,000','Enabled',URL_GOV_THPT,'GOV;THPT;HI;Exact'],
  ]),

  // THPT_Pain_Govap — 19 Phrase
  ...[
    'hè nên cho con học gì','học sinh cấp 3 làm gì hè','định hướng nghề nghiệp học sinh',
    'khóa hè cho học sinh lớp 10 11 12','trại hè hướng nghiệp thpt',
    'khóa hè ielts cho hs thpt','trại hè chuẩn bị đại học','khóa hè kỹ năng mềm thpt',
    'trại hè lãnh đạo cho học sinh','chương trình hè thpt',
    'hè cho con chuẩn bị vào đại học','khóa hè profile đại học','khóa hè du học',
    'trại hè quốc tế thpt','khóa hè phát triển bản thân thpt','trại hè stem thpt',
    'khóa hè debate thpt','hè con cấp 3 chỉ học thêm','con lớp 10 11 12 nên làm gì hè',
  ].map(k => [C_GOV,'THPT_Pain_Govap','"'+k+'"','Phrase','8,000','Enabled',URL_GOV_THPT,'GOV;THPT;Pain']),

  // Competitor_Govap — 11 Phrase
  ...[
    'trại hè vus gò vấp','trại hè ila gò vấp','trại hè apollo gò vấp',
    'trại hè yola gò vấp','trại hè trường quốc tế gò vấp','trại hè trường song ngữ gò vấp',
    'trại hè vus english gò vấp','trại hè ila english gò vấp','trại hè apollo english gò vấp',
    'trại hè idp gò vấp','trại hè british council gò vấp',
  ].map(k => [C_GOV,'Competitor_Govap','"'+k+'"','Phrase','12,000','Enabled',URL_CMP,'GOV;Competitor']),

  // ─── C2: Search_BinhTan_Core (mirror Govap) ────────────────────────────────

  // TieuHoc_HighIntent_BinhTan — 18 Phrase + 18 Exact
  ...[
    'trại hè tiểu học bình tân','trại hè bình tân cho trẻ','trại hè bán trú bình tân',
    'trại hè thiếu nhi bình tân','trại hè bình tân 2026','lion camp bình tân',
    'trại hè bình tân tiểu học','khóa hè bình tân cho bé','trại hè bán trú tại bình tân',
    'tìm trại hè bình tân','đăng ký trại hè bình tân','trại hè cho bé bình tân',
    'trại hè quận bình tân','camp hè bình tân','trại hè việt anh bình tân',
    'trại hè gần bình tân','trại hè trường quốc tế bình tân','khóa hè tiểu học bình tân',
  ].flatMap(k => [
    [C_BT,'TieuHoc_HighIntent_BinhTan','"'+k+'"','Phrase','10,000','Enabled',URL_BT_TH,'BT;TH;HI'],
    [C_BT,'TieuHoc_HighIntent_BinhTan','['+k+']','Exact', '10,000','Enabled',URL_BT_TH,'BT;TH;HI;Exact'],
  ]),

  // TieuHoc_Pain_BinhTan — 18 Phrase
  ...[
    'chỗ giữ trẻ hè bình tân','gửi con mùa hè bình tân','trường hè tiểu học bình tân',
    'lớp hè cho trẻ em bình tân','giữ trẻ ban ngày mùa hè bình tân',
    'hè con không biết làm gì bình tân','trại hè bán trú cho con bình tân',
    'khóa hè kỹ năng sống cho bé bình tân','chương trình hè tiểu học bình tân',
    'trại hè tiếng anh tiểu học bình tân','khóa hè tiếng anh cho bé bình tân',
    'hè ba mẹ đi làm con ở đâu bình tân','hè gửi con ở đâu an toàn bình tân',
    'chỗ trông con mùa hè bình tân','học hè cho con bình tân',
    'cho con đi đâu hè bình tân','chỗ gửi con mùa hè bình tân','giữ trẻ hè bình tân',
  ].map(k => [C_BT,'TieuHoc_Pain_BinhTan','"'+k+'"','Phrase','8,000','Enabled',URL_BT_TH,'BT;TH;Pain']),

  // THCS_HighIntent_BinhTan — 10 Phrase + 10 Exact
  ...[
    'trại hè thcs bình tân','trại hè cấp 2 bình tân','trại hè học sinh cấp 2 bình tân',
    'lion camp thcs bình tân','trại hè thcs 2026 bình tân','khóa hè thcs bình tân',
    'trại hè lớp 6 7 8 bình tân','đăng ký trại hè cấp 2 bình tân',
    'camp hè thcs bình tân','trại hè lớp 9 bình tân',
  ].flatMap(k => [
    [C_BT,'THCS_HighIntent_BinhTan','"'+k+'"','Phrase','10,000','Enabled',URL_BT_THCS,'BT;THCS;HI'],
    [C_BT,'THCS_HighIntent_BinhTan','['+k+']','Exact', '10,000','Enabled',URL_BT_THCS,'BT;THCS;HI;Exact'],
  ]),

  // THCS_Pain_BinhTan — 10 Phrase
  ...[
    'khóa hè kỹ năng sống thcs bình tân','học hè cho học sinh cấp 2 bình tân',
    'trại hè kỹ năng mềm bình tân','trại hè leadership teen bình tân',
    'khóa hè tiếng anh cấp 2 bình tân','trại hè stem bình tân',
    'trại hè phát triển bản thân bình tân','hè cho con cấp 2 bình tân',
    'hoạt động hè học sinh bình tân','khóa hè ielts junior bình tân',
  ].map(k => [C_BT,'THCS_Pain_BinhTan','"'+k+'"','Phrase','8,000','Enabled',URL_BT_THCS,'BT;THCS;Pain']),

  // THPT_HighIntent_BinhTan — 10 Phrase + 10 Exact
  ...[
    'trại hè thpt bình tân','trại hè hướng nghiệp bình tân','lion camp thpt bình tân',
    'trại hè cấp 3 bình tân','trại hè học sinh cấp 3 bình tân','trại hè thpt 2026 bình tân',
    'khóa hè lớp 10 11 12 bình tân','đăng ký trại hè thpt bình tân',
    'trại hè lãnh đạo thpt bình tân','camp hè cấp 3 bình tân',
  ].flatMap(k => [
    [C_BT,'THPT_HighIntent_BinhTan','"'+k+'"','Phrase','10,000','Enabled',URL_BT_THPT,'BT;THPT;HI'],
    [C_BT,'THPT_HighIntent_BinhTan','['+k+']','Exact', '10,000','Enabled',URL_BT_THPT,'BT;THPT;HI;Exact'],
  ]),

  // THPT_Pain_BinhTan — 10 Phrase
  ...[
    'hè nên cho con học gì bình tân','học sinh cấp 3 làm gì hè bình tân',
    'định hướng nghề nghiệp hs bình tân','trại hè hướng nghiệp thpt bình tân',
    'khóa hè ielts thpt bình tân','trại hè chuẩn bị đại học bình tân',
    'khóa hè kỹ năng mềm thpt bình tân','chương trình hè thpt bình tân',
    'khóa hè profile đại học bình tân','con lớp 10 11 12 nên làm gì hè bình tân',
  ].map(k => [C_BT,'THPT_Pain_BinhTan','"'+k+'"','Phrase','8,000','Enabled',URL_BT_THPT,'BT;THPT;Pain']),

  // Competitor_BinhTan — 8 Phrase
  ...[
    'trại hè vus bình tân','trại hè ila bình tân','trại hè apollo bình tân',
    'trại hè yola bình tân','trại hè trường quốc tế bình tân','trại hè trường song ngữ bình tân',
    'trại hè vus english bình tân','trung tâm tiếng anh bình tân',
  ].map(k => [C_BT,'Competitor_BinhTan','"'+k+'"','Phrase','12,000','Enabled',URL_CMP,'BT;Competitor']),

  // ─── C3: Search_PainPoint_All ─────────────────────────────────────────────

  // Pain_TieuHoc_All — 15 Phrase
  ...[
    'giữ trẻ mùa hè','gửi con mùa hè','chỗ giữ trẻ mùa hè hcm',
    'trường hè tiểu học hcm','khóa hè cho bé lớp 1 2 3 4 5',
    'giữ trẻ ban ngày mùa hè hcm','ba mẹ đi làm gửi con ở đâu hè',
    'hè con không biết làm gì','trại hè bán trú tiểu học hcm',
    'khóa hè kỹ năng sống cho bé hcm','trại hè phát triển kỹ năng hcm',
    'hè gửi con ở đâu an toàn hcm','chỗ trông con mùa hè hcm',
    'lớp hè cho bé tiểu học','chương trình hè tiểu học hcm',
  ].map(k => [C_PAIN,'Pain_TieuHoc_All','"'+k+'"','Phrase','7,000','Enabled',URL_PAIN_TH,'PAIN;TH']),

  // Pain_THCS_All — 12 Phrase
  ...[
    'khóa hè kỹ năng sống thcs hcm','học hè cho học sinh cấp 2 hcm',
    'trại hè kỹ năng mềm hcm','trại hè leadership teen hcm',
    'khóa hè tiếng anh thcs hcm','khóa hè ielts junior hcm',
    'trại hè stem cấp 2 hcm','hè cho con cấp 2 làm gì',
    'hoạt động hè học sinh cấp 2','khóa hè tiếng anh cấp 2 hcm',
    'trại hè phát triển bản thân thcs','hè con không nghiện điện thoại',
  ].map(k => [C_PAIN,'Pain_THCS_All','"'+k+'"','Phrase','7,000','Enabled',URL_PAIN_THCS,'PAIN;THCS']),

  // Pain_THPT_All — 12 Phrase
  ...[
    'hè nên cho con học gì cấp 3','học sinh cấp 3 làm gì hè',
    'định hướng nghề nghiệp học sinh hcm','trại hè hướng nghiệp thpt hcm',
    'khóa hè ielts cho hs thpt hcm','trại hè chuẩn bị đại học hcm',
    'khóa hè kỹ năng mềm thpt hcm','khóa hè profile đại học',
    'khóa hè du học hcm','chương trình hè thpt hcm',
    'hè cho con chuẩn bị vào đại học','con lớp 10 11 12 nên làm gì hè',
  ].map(k => [C_PAIN,'Pain_THPT_All','"'+k+'"','Phrase','8,000','Enabled',URL_PAIN_THPT,'PAIN;THPT']),

  // ─── C4: Search_CanGiuoc ──────────────────────────────────────────────────

  // TieuHoc_HighIntent_CanGiuoc — 12 Phrase + 8 Exact
  ...[
    'trại hè tiểu học cần giuộc','trại hè cần giuộc cho bé','trại hè cần giuộc 2026',
    'lion camp cần giuộc','trại hè long an cho bé','khóa hè cần giuộc tiểu học',
    'trại hè bán trú cần giuộc','trại hè long hậu','đăng ký trại hè cần giuộc',
    'camp hè cần giuộc','trại hè thiếu nhi cần giuộc','trại hè tiếng anh cần giuộc',
  ].map(k => [C_CG,'TieuHoc_HighIntent_CanGiuoc','"'+k+'"','Phrase','8,000','Enabled',URL_CG,'CG;TH;HI']),
  ...[
    'trại hè cần giuộc','trại hè tiểu học cần giuộc','khóa hè cần giuộc',
    'lion camp cần giuộc','trại hè long hậu','trại hè long an','camp hè long an','trại hè bán trú cần giuộc',
  ].map(k => [C_CG,'TieuHoc_HighIntent_CanGiuoc','['+k+']','Exact','8,000','Enabled',URL_CG,'CG;TH;HI;Exact']),

  // TieuHoc_Pain_CanGiuoc — 8 Phrase
  ...[
    'giữ trẻ hè cần giuộc','gửi con mùa hè long an','chỗ giữ trẻ hè long an',
    'cho con đi đâu hè cần giuộc','học hè cho con long an',
    'ba mẹ đi làm gửi con đâu cần giuộc','trường hè tiểu học long an','hè gửi con ở đâu long an',
  ].map(k => [C_CG,'TieuHoc_Pain_CanGiuoc','"'+k+'"','Phrase','6,000','Enabled',URL_CG,'CG;TH;Pain']),

  // Generic_CanGiuoc — 6 Phrase
  ...[
    'trại hè long an','trường hè long an','khóa hè long an',
    'trại hè tiếng anh long an','hoạt động hè cho trẻ long an','trại hè 2026 long an',
  ].map(k => [C_CG,'Generic_CanGiuoc','"'+k+'"','Phrase','5,000','Enabled',URL_CG,'CG;Generic']),

  // ─── C5: Search_RachGia ───────────────────────────────────────────────────

  // TieuHoc_HighIntent_RachGia — 12 Phrase + 7 Exact
  ...[
    'trại hè tiểu học rạch giá','trại hè rạch giá cho bé','trại hè rạch giá 2026',
    'lion camp rạch giá','trại hè kiên giang cho bé','khóa hè rạch giá tiểu học',
    'trại hè bán trú rạch giá','đăng ký trại hè rạch giá','camp hè rạch giá',
    'trại hè thiếu nhi rạch giá','trại hè tiếng anh rạch giá','khóa hè kiên giang',
  ].map(k => [C_RG,'TieuHoc_HighIntent_RachGia','"'+k+'"','Phrase','8,000','Enabled',URL_RG_TH,'RG;TH;HI']),
  ...[
    'trại hè rạch giá','trại hè tiểu học rạch giá','khóa hè rạch giá',
    'lion camp rạch giá','trại hè kiên giang','camp hè kiên giang','trại hè bán trú rạch giá',
  ].map(k => [C_RG,'TieuHoc_HighIntent_RachGia','['+k+']','Exact','8,000','Enabled',URL_RG_TH,'RG;TH;HI;Exact']),

  // TieuHoc_Pain_RachGia — 6 Phrase
  ...[
    'giữ trẻ hè rạch giá','gửi con mùa hè kiên giang','chỗ giữ trẻ hè kiên giang',
    'trường hè tiểu học kiên giang','ba mẹ đi làm gửi con rạch giá','hè gửi con ở đâu rạch giá',
  ].map(k => [C_RG,'TieuHoc_Pain_RachGia','"'+k+'"','Phrase','6,000','Enabled',URL_RG_TH,'RG;TH;Pain']),

  // THCS_THPT_RachGia — 8 Phrase
  ...[
    'trại hè thcs rạch giá','trại hè cấp 2 kiên giang','trại hè thpt kiên giang',
    'trại hè cấp 3 rạch giá','khóa hè kỹ năng rạch giá','trại hè lãnh đạo kiên giang',
    'trại hè hướng nghiệp kiên giang','trại hè tiếng anh thcs rạch giá',
  ].map(k => [C_RG,'THCS_THPT_RachGia','"'+k+'"','Phrase','7,000','Enabled',URL_RG_THCS,'RG;THCS;THPT']),

  // ─── C6: Search_Brand_Defense ────────────────────────────────────────────

  // Brand_LionCamp — 12 Phrase + 12 Exact
  ...[
    'lion camp','lion camp 2026','trại hè việt anh','trại hè trường việt anh',
    'lion camp gò vấp','lion camp bình tân','truong viet anh trai he',
    'trường việt anh trại hè','lion camp việt anh','trại hè liên cấp việt anh',
    'trường việt anh 2026','lion camp tiểu học',
  ].flatMap(k => [
    [C_BRAND,'Brand_LionCamp','"'+k+'"','Phrase','5,000','Enabled',URL_BRAND,'Brand;Phrase'],
    [C_BRAND,'Brand_LionCamp','['+k+']','Exact', '5,000','Enabled',URL_BRAND,'Brand;Exact'],
  ]),

  // ─── C7: Remarketing_Close (RLSA) ────────────────────────────────────────

  // RMK_QuizAbandon — 5 Phrase (phụ huynh đã vào quiz nhưng chưa submit)
  ...[
    'trại hè 2026','lion camp','trại hè việt anh','trại hè gò vấp','trại hè bình tân',
  ].map(k => [C_RMK,'RMK_QuizAbandon','"'+k+'"','Phrase','8,000','Enabled',URL_PAIN_TH,'RMK;QuizAbandon']),

  // RMK_VSLViewer — 5 Phrase (đã xem VSL)
  ...[
    'trại hè tiểu học','trại hè thcs','trại hè cấp 2','khóa hè thcs','trại hè tiếng anh',
  ].map(k => [C_RMK,'RMK_VSLViewer','"'+k+'"','Phrase','9,000','Enabled',URL_PAIN_THCS,'RMK;VSLViewer']),

  // RMK_SalesPageVisit — 5 Phrase (đã vào sales page)
  ...[
    'trại hè ielts','trại hè thpt','trại hè cấp 3','trại hè hướng nghiệp','khóa hè thpt',
  ].map(k => [C_RMK,'RMK_SalesPageVisit','"'+k+'"','Phrase','10,000','Enabled',URL_PAIN_TH,'RMK;SalesPage']),
];

// ═══════════════════════════════════════════════════════════════════════════════
// 4_RSA_Ads (15 headlines: H1-H3 pinned | 4 descriptions)
// [Campaign, AdGroup, Type, Status, H1,H1pin, H2,H2pin, H3,H3pin,
//  H4..H15 (12 items), D1, D2, D3, D4, Path1, Path2, URL, Labels]
// ═══════════════════════════════════════════════════════════════════════════════
const RSA_ADS_DATA = [
  // --- C1 Govap: TieuHoc HighIntent ---
  [C_GOV,'TieuHoc_HighIntent_Govap','Responsive search ad','Enabled',
   'Trại Hè Tiểu Học Gò Vấp',1,'Lion Camp Bán Trú Gò Vấp',2,'Khai Giảng 15/06',3,
   'Ưu Đãi Early Bird 15%','Giáo Viên Bản Ngữ IELTS','Xe Đưa Đón Tận KDC',
   '100% HS IELTS 6.0+','Còn Suất Tiểu Học Hè','Nhắn Zalo 0916 961 409',
   'Cam Kết Hoàn Phí 100%','Top 15 Leader In Me','6 Tuần Bán Trú An Toàn',
   'Đặt Tham Quan Miễn Phí','Ba Mẹ Yên Tâm Đi Làm','Hoạt Động Ngoài Trời',
   'Trại hè tiểu học bán trú Gò Vấp. Giáo viên bản ngữ + IELTS + kỹ năng. Khai giảng 15/06.',
   'Ưu đãi Early Bird 15% đến 30/04. Còn suất – đăng ký online giữ chỗ ngay.',
   '6 tuần bán trú 2 bữa, ngủ trưa, xe đưa đón. Ba mẹ yên tâm đi làm suốt hè.',
   'Top 15 Leader In Me Châu Á 2023. 100% HS cũ IELTS 6.0+. Cam kết hoàn phí.',
   'trai-he','go-vap',URL_GOV_TH,'GOV;TH;HI;V1'],
  // --- C1 Govap: TieuHoc Pain ---
  [C_GOV,'TieuHoc_Pain_Govap','Responsive search ad','Enabled',
   'Giữ Trẻ Hè Gò Vấp Uy Tín',1,'Bán Trú An Toàn Cho Bé',2,'Khai Giảng 15/06',3,
   'Lion Camp Gò Vấp 2026','Tiếng Anh + Kỹ Năng Sống','Xe Đưa Đón Tận Nhà',
   'Giáo Viên Người Nước Ngoài','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Ba Mẹ Yên Tâm Đi Làm Hè','Học Tiếng Anh IELTS','Hoạt Động Ngoài Trời',
   'Còn Suất Đăng Ký Ngay','Top 15 Leader In Me','Cam Kết Hoàn Phí',
   'Gò Vấp: nơi gửi con hè uy tín nhất. Bán trú 2 bữa + ngủ trưa + xe đưa đón.',
   'Lion Camp 2026 – giáo viên bản ngữ, IELTS, kỹ năng lãnh đạo. 6 tuần trọn vẹn.',
   'Nhắn Zalo 0916 961 409 để tư vấn và giữ chỗ. Ưu đãi Early Bird đến 30/04.',
   'Ba mẹ đi làm yên tâm. Bé học vui + phát triển toàn diện. Cam kết hoàn 100%.',
   'giu-tre','he-go-vap',URL_GOV_TH,'GOV;TH;Pain;V1'],
  // --- C1 Govap: THCS HighIntent ---
  [C_GOV,'THCS_HighIntent_Govap','Responsive search ad','Enabled',
   'Trại Hè THCS Gò Vấp',1,'Kỹ Năng Lãnh Đạo Cấp 2',2,'Khai Giảng 15/06/2026',3,
   'Lion Camp Gò Vấp 2026','Tiếng Anh IELTS + Kỹ Năng','Hoạt Động Ngoài Trời',
   'Giáo Viên Bản Ngữ','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Còn Suất Cấp 2 Hè','Top 15 Leader In Me','Cam Kết Hoàn Phí 100%',
   'Đặt Tham Quan Miễn Phí','Xe Đưa Đón Gò Vấp','Rèn Bản Lĩnh Cấp 2',
   'Trại hè THCS Gò Vấp – rèn kỹ năng lãnh đạo, tiếng Anh, bản lĩnh. 6 tuần.',
   'Giáo viên bản ngữ + IELTS + hoạt động ngoài trời. Học sinh cấp 2 bứt phá hè.',
   'Nhắn Zalo 0916 961 409 tư vấn miễn phí. Ưu đãi Early Bird 15% đến 30/04.',
   'Top 15 Leader In Me Châu Á. Khai giảng 15/06. Còn suất – đăng ký ngay.',
   'trai-he','thcs-go-vap',URL_GOV_THCS,'GOV;THCS;V1'],
  // --- C1 Govap: THPT HighIntent ---
  [C_GOV,'THPT_HighIntent_Govap','Responsive search ad','Enabled',
   'Trại Hè THPT Gò Vấp 2026',1,'Hướng Nghiệp + Lãnh Đạo',2,'Khai Giảng 15/06',3,
   'Lion Camp Gò Vấp','IELTS + Kỹ Năng Mềm','Định Hướng Nghề Cấp 3',
   'Giáo Viên Bản Ngữ','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Còn Suất Cấp 3 Hè','Top 15 Leader In Me','Cam Kết Hoàn Phí',
   'CV + Portfolio Hướng Nghiệp','Hoạt Động Thực Tế','Đặt Chỗ Ngay',
   'Trại hè THPT Gò Vấp 2026 – định hướng nghề, lãnh đạo, IELTS. 6 tuần thực chiến.',
   'Phát triển kỹ năng mềm, tư duy phản biện, nói chuyện tự tin. Giáo viên bản ngữ.',
   'Nhắn Zalo 0916 961 409 tư vấn miễn phí. Ưu đãi Early Bird 15% đến 30/04.',
   'Top 15 Leader In Me Châu Á. Khai giảng 15/06. Còn suất cấp 3 – đăng ký ngay.',
   'trai-he','thpt-go-vap',URL_GOV_THPT,'GOV;THPT;V1'],
  // --- C2 BinhTan: TieuHoc ---
  [C_BT,'TieuHoc_HighIntent_BinhTan','Responsive search ad','Enabled',
   'Trại Hè Tiểu Học Bình Tân',1,'Lion Camp Bán Trú Bình Tân',2,'Khai Giảng 15/06',3,
   'Ưu Đãi Early Bird 15%','Giáo Viên Bản Ngữ IELTS','Xe Đưa Đón Tận KDC',
   '100% HS IELTS 6.0+','Còn Suất Tiểu Học Hè','Nhắn Zalo 0916 961 409',
   'Cam Kết Hoàn Phí 100%','Top 15 Leader In Me','6 Tuần Bán Trú An Toàn',
   'Đặt Tham Quan Miễn Phí','Ba Mẹ Yên Tâm Đi Làm','Hoạt Động Ngoài Trời',
   'Trại hè tiểu học bán trú Bình Tân. Giáo viên bản ngữ + IELTS + kỹ năng.',
   'Ưu đãi Early Bird 15% đến 30/04. Còn suất – đăng ký online giữ chỗ ngay.',
   '6 tuần bán trú 2 bữa, ngủ trưa, xe đưa đón. Ba mẹ yên tâm đi làm suốt hè.',
   'Top 15 Leader In Me Châu Á 2023. 100% HS cũ IELTS 6.0+. Cam kết hoàn phí.',
   'trai-he','binh-tan',URL_BT_TH,'BT;TH;HI;V1'],
  // --- C2 BinhTan: TieuHoc Pain ---
  [C_BT,'TieuHoc_Pain_BinhTan','Responsive search ad','Enabled',
   'Giữ Trẻ Hè Bình Tân Uy Tín',1,'Bán Trú An Toàn Cho Bé',2,'Khai Giảng 15/06',3,
   'Lion Camp Bình Tân 2026','Tiếng Anh + Kỹ Năng Sống','Xe Đưa Đón Tận Nhà',
   'Giáo Viên Người Nước Ngoài','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Ba Mẹ Yên Tâm Đi Làm Hè','Học Tiếng Anh IELTS','Hoạt Động Ngoài Trời',
   'Còn Suất Đăng Ký Ngay','Top 15 Leader In Me','Cam Kết Hoàn Phí',
   'Bình Tân: nơi gửi con hè uy tín nhất. Bán trú 2 bữa + ngủ trưa + xe đưa đón.',
   'Lion Camp 2026 – giáo viên bản ngữ, IELTS, kỹ năng lãnh đạo. 6 tuần trọn vẹn.',
   'Nhắn Zalo 0916 961 409 để tư vấn và giữ chỗ. Ưu đãi Early Bird đến 30/04.',
   'Ba mẹ đi làm yên tâm. Bé học vui + phát triển toàn diện. Cam kết hoàn 100%.',
   'giu-tre','he-binh-tan',URL_BT_TH,'BT;TH;Pain;V1'],
  // --- C2 BinhTan: THCS ---
  [C_BT,'THCS_HighIntent_BinhTan','Responsive search ad','Enabled',
   'Trại Hè THCS Bình Tân',1,'Kỹ Năng Lãnh Đạo Cấp 2',2,'Khai Giảng 15/06/2026',3,
   'Lion Camp Bình Tân 2026','Tiếng Anh IELTS + Kỹ Năng','Hoạt Động Ngoài Trời',
   'Giáo Viên Bản Ngữ','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Còn Suất Cấp 2 Hè','Top 15 Leader In Me','Cam Kết Hoàn Phí 100%',
   'Đặt Tham Quan Miễn Phí','Xe Đưa Đón Bình Tân','Rèn Bản Lĩnh Cấp 2',
   'Trại hè THCS Bình Tân – rèn kỹ năng lãnh đạo, tiếng Anh, bản lĩnh. 6 tuần.',
   'Giáo viên bản ngữ + IELTS + hoạt động ngoài trời. Học sinh cấp 2 bứt phá hè.',
   'Nhắn Zalo 0916 961 409 tư vấn miễn phí. Ưu đãi Early Bird 15% đến 30/04.',
   'Top 15 Leader In Me Châu Á. Khai giảng 15/06. Còn suất – đăng ký ngay.',
   'trai-he','thcs-binh-tan',URL_BT_THCS,'BT;THCS;V1'],
  // --- C3 PainPoint ---
  [C_PAIN,'Pain_TieuHoc_All','Responsive search ad','Enabled',
   'Giữ Trẻ Hè An Toàn HCM',1,'Bán Trú 2 Bữa Ngủ Trưa',2,'Khai Giảng 15/06/2026',3,
   'Lion Camp 2026 HCM','Giáo Viên Bản Ngữ IELTS','Xe Đưa Đón Tận Nhà',
   '6 Tuần Bán Trú Tiếng Anh','Ưu Đãi Early Bird 15%','Nhắn Zalo Ngay',
   'Còn Suất Tiểu Học','Top 15 Leader In Me','Cam Kết Hoàn Phí 100%',
   'Ba Mẹ Yên Tâm Đi Làm','Hoạt Động Ngoài Trời','Đặt Tham Quan Miễn Phí',
   'Tìm nơi giữ con hè uy tín? Lion Camp – bán trú 2 bữa, ngủ trưa, an toàn tuyệt đối.',
   'Giáo viên bản ngữ tiếng Anh + kỹ năng sống. Ba mẹ yên tâm đi làm cả hè.',
   'Nhắn Zalo 0916 961 409 tư vấn miễn phí. Ưu đãi Early Bird 15% đến 30/04.',
   '6 tuần trọn vẹn tại Lion Camp. Top 15 Leader In Me Châu Á. Cam kết hoàn phí.',
   'giu-tre','he-hcm',URL_PAIN_TH,'PAIN;TH;V1'],
  [C_PAIN,'Pain_THCS_All','Responsive search ad','Enabled',
   'Trại Hè Kỹ Năng Cấp 2 HCM',1,'Lãnh Đạo + Tiếng Anh',2,'Khai Giảng 15/06',3,
   'Lion Camp THCS 2026','Giáo Viên Bản Ngữ','Hoạt Động Thực Tế',
   'IELTS + Kỹ Năng Mềm','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Còn Suất Cấp 2','Top 15 Leader In Me','Cam Kết Hoàn Phí',
   'Đặt Tham Quan Miễn Phí','Phát Triển Toàn Diện','6 Tuần Bứt Phá',
   'Trại hè THCS HCM 2026 – rèn lãnh đạo, IELTS, kỹ năng mềm. 6 tuần thực chiến.',
   'Giáo viên bản ngữ + hoạt động ngoài trời. Học sinh cấp 2 tự tin bứt phá.',
   'Nhắn Zalo 0916 961 409 tư vấn và giữ chỗ. Ưu đãi Early Bird đến 30/04.',
   'Top 15 Leader In Me Châu Á 2023. Khai giảng 15/06. Còn suất – đăng ký ngay.',
   'trai-he','ky-nang-cap-2',URL_PAIN_THCS,'PAIN;THCS;V1'],
  [C_PAIN,'Pain_THPT_All','Responsive search ad','Enabled',
   'Trại Hè Hướng Nghiệp HCM',1,'Lãnh Đạo + IELTS Cấp 3',2,'Khai Giảng 15/06',3,
   'Lion Camp THPT 2026','Định Hướng Nghề Nghiệp','Kỹ Năng Phỏng Vấn',
   'Giáo Viên Bản Ngữ','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Còn Suất Cấp 3 Hè','Top 15 Leader In Me','Tư Duy Phản Biện',
   'Portfolio + CV Hướng Nghiệp','Đặt Tham Quan Miễn Phí','Bứt Phá Hè Cấp 3',
   'Trại hè THPT HCM 2026 – định hướng nghề, lãnh đạo, IELTS. Học sinh cấp 3 bứt phá.',
   'Phát triển kỹ năng mềm, tư duy phản biện, nói chuyện tự tin. Giáo viên bản ngữ.',
   'Nhắn Zalo 0916 961 409. Ưu đãi Early Bird 15% đến 30/04. Còn suất cấp 3.',
   'Top 15 Leader In Me Châu Á. Khai giảng 15/06. Cam kết hoàn phí 100%.',
   'trai-he','huong-nghiep',URL_PAIN_THPT,'PAIN;THPT;V1'],
  // --- C4 CanGiuoc ---
  [C_CG,'TieuHoc_HighIntent_CanGiuoc','Responsive search ad','Enabled',
   'Trại Hè Tiểu Học Cần Giuộc',1,'Lion Camp Bán Trú Long An',2,'Khai Giảng 15/06',3,
   'Giáo Viên Bản Ngữ IELTS','Xe Đưa Đón KDC','Ưu Đãi Early Bird 15%',
   'Nhắn Zalo 0916 961 409','100% HS IELTS 6.0+','6 Tuần Bán Trú An Toàn',
   'Còn Suất Tiểu Học Hè','Top 15 Leader In Me','Cam Kết Hoàn Phí 100%',
   'Đặt Tham Quan Miễn Phí','Ba Mẹ Yên Tâm','Hoạt Động Ngoài Trời',
   'Trại hè tiểu học bán trú tại Cần Giuộc, Long An. An toàn, vui học. Khai giảng 15/06.',
   'Giáo viên bản ngữ + IELTS + kỹ năng sống. 6 tuần trải nghiệm trọn vẹn.',
   'Nhắn Zalo 0916 961 409 tư vấn miễn phí. Ưu đãi Early Bird 15% đến 30/04.',
   'Top 15 Leader In Me Châu Á 2023. 100% HS IELTS 6.0+. Cam kết hoàn phí.',
   'trai-he','can-giuoc',URL_CG,'CG;TH;V1'],
  // --- C5 RachGia ---
  [C_RG,'TieuHoc_HighIntent_RachGia','Responsive search ad','Enabled',
   'Trại Hè Tiểu Học Rạch Giá',1,'Lion Camp Bán Trú KG',2,'Khai Giảng 15/06/2026',3,
   'Giáo Viên Bản Ngữ IELTS','Xe Đưa Đón Tận Nhà','Ưu Đãi Early Bird 15%',
   'Nhắn Zalo 0916 961 409','100% HS IELTS 6.0+','6 Tuần Bán Trú An Toàn',
   'Còn Suất Tiểu Học Hè','Top 15 Leader In Me','Cam Kết Hoàn Phí 100%',
   'Đặt Tham Quan Miễn Phí','Ba Mẹ Yên Tâm','Kỹ Năng Sống',
   'Trại hè tiểu học bán trú tại Rạch Giá, Kiên Giang. Khai giảng 15/06/2026.',
   'Giáo viên bản ngữ + IELTS + kỹ năng lãnh đạo. 6 tuần trải nghiệm.',
   'Nhắn Zalo 0916 961 409 tư vấn miễn phí. Ưu đãi Early Bird 15% đến 30/04.',
   'Top 15 Leader In Me Châu Á. 100% HS IELTS 6.0+. Cam kết hoàn phí 100%.',
   'trai-he','rach-gia',URL_RG_TH,'RG;TH;V1'],
  [C_RG,'THCS_THPT_RachGia','Responsive search ad','Enabled',
   'Trại Hè THCS THPT Rạch Giá',1,'Lion Camp Kỹ Năng Kiên Giang',2,'Khai Giảng 15/06',3,
   'Lãnh Đạo + Tiếng Anh','Giáo Viên Bản Ngữ','Ưu Đãi Early Bird 15%',
   'Zalo 0916 961 409','Còn Suất Cấp 2 3','Top 15 Leader In Me',
   'Cam Kết Hoàn Phí 100%','Đặt Tham Quan Miễn Phí','Phát Triển Toàn Diện',
   'IELTS + Kỹ Năng Mềm','Hướng Nghiệp Cấp 3','6 Tuần Bứt Phá',
   'Trại hè THCS THPT Rạch Giá – lãnh đạo, IELTS, kỹ năng. Khai giảng 15/06.',
   'Giáo viên bản ngữ + hoạt động thực tế. Học sinh tự tin bứt phá.',
   'Nhắn Zalo 0916 961 409. Ưu đãi Early Bird 15% đến 30/04.',
   'Top 15 Leader In Me Châu Á. Cam kết hoàn phí 100%.',
   'trai-he','kien-giang',URL_RG_THCS,'RG;THCS;THPT;V1'],
  // --- C6 Brand Defense ---
  [C_BRAND,'Brand_LionCamp','Responsive search ad','Enabled',
   'Lion Camp 2026',1,'Trại Hè Trường Việt Anh',2,'Khai Giảng 15/06/2026',3,
   'Top 15 Leader In Me Châu Á','100% HS IELTS 6.0+','Giáo Viên Bản Ngữ',
   'Bán Trú 6 Tuần An Toàn','Ưu Đãi Early Bird 15%','Zalo 0916 961 409',
   'Cam Kết Hoàn Phí 100%','Đặt Tham Quan Miễn Phí','Xe Đưa Đón Tận Nhà',
   'Còn Suất Hè 2026','Hoạt Động Ngoài Trời','Tiếng Anh + Kỹ Năng',
   'Lion Camp 2026 – Trường Việt Anh. Top 15 Leader In Me Châu Á. Bán trú chuẩn quốc tế.',
   '100% học sinh cũ đạt IELTS 6.0+. Giáo viên bản ngữ. Khai giảng 15/06/2026.',
   'Ưu đãi Early Bird 15% đến 30/04. Nhắn Zalo 0916 961 409 giữ chỗ ngay.',
   'Cam kết hoàn phí 100%. Đặt tham quan miễn phí cuối tuần. Còn suất hè 2026.',
   'lion-camp','2026',URL_BRAND,'Brand;Defense;V1'],
  // --- C7 Remarketing (RLSA) ---
  [C_RMK,'RMK_QuizAbandon','Responsive search ad','Enabled',
   'Còn Suất Hè Chưa Ba Mẹ?',1,'Ưu Đãi Early Bird Sắp Hết',2,'Khai Giảng 15/06',3,
   'Lion Camp 2026','Nhắn Zalo Tư Vấn Ngay','Cam Kết Hoàn Phí 100%',
   'Đặt Tham Quan Cuối Tuần','Top 15 Leader In Me','Giáo Viên Bản Ngữ',
   'Xe Đưa Đón Tận KDC','Bán Trú 2 Bữa Ngủ Trưa','Early Bird 15%',
   '100% HS IELTS 6.0+','Ba Mẹ Yên Tâm Đi Làm','Giữ Chỗ Ngay Hôm Nay',
   'Bạn vừa xem chương trình Lion Camp – còn suất hè, đặt giữ chỗ trước khi hết.',
   'Nhắn Zalo 0916 961 409 để được tư vấn và nhận ưu đãi Early Bird 15%.',
   'Cam kết hoàn phí 100% nếu chương trình không đúng mô tả. Đặt tham quan cuối tuần.',
   'Top 15 Leader In Me Châu Á 2023. Khai giảng 15/06. Đăng ký ngay hôm nay.',
   'rmk','quiz-abandon',URL_PAIN_TH,'RMK;QuizAbandon;V1'],
  [C_RMK,'RMK_VSLViewer','Responsive search ad','Enabled',
   'Đã Xem Chương Trình Chưa?',1,'Lion Camp Bán Trú 6 Tuần',2,'Giữ Chỗ Ngay',3,
   'Early Bird 15% Còn Ít Ngày','Nhắn Zalo 0916 961 409','Cam Kết Hoàn Phí',
   'Đặt Tham Quan Miễn Phí','Giáo Viên Bản Ngữ IELTS','Xe Đưa Đón Tận Nhà',
   'Top 15 Leader In Me','100% HS IELTS 6.0+','Ba Mẹ Yên Tâm',
   'Bán Trú 2 Bữa Ngủ Trưa','Còn Suất Hè 2026','Khai Giảng 15/06',
   'Lion Camp 2026 – giáo viên bản ngữ, IELTS, kỹ năng lãnh đạo. Còn suất hè.',
   'Ưu đãi Early Bird 15% sắp kết thúc. Nhắn Zalo 0916 961 409 giữ chỗ ngay.',
   '6 tuần bán trú 2 bữa, ngủ trưa, xe đưa đón. Khai giảng 15/06/2026.',
   'Cam kết hoàn phí 100%. Top 15 Leader In Me Châu Á. 100% HS IELTS 6.0+.',
   'rmk','vsl-viewer',URL_PAIN_THCS,'RMK;VSLViewer;V1'],
  [C_RMK,'RMK_SalesPageVisit','Responsive search ad','Enabled',
   'Suất Hè Sắp Hết – Đăng Ký',1,'Ưu Đãi Hết 30/04 Ba Mẹ Ơi',2,'Giữ Chỗ 5 Phút',3,
   'Lion Camp 2026 Còn Ít Chỗ','Nhắn Zalo Ngay','Cam Kết Hoàn Phí',
   'Khai Giảng 15/06/2026','Top 15 Leader In Me','Giáo Viên Bản Ngữ',
   'Bán Trú 2 Bữa An Toàn','Xe Đưa Đón Tận Nhà','100% HS IELTS 6.0+',
   'Early Bird 15% Cuối Cùng','Đặt Tham Quan Cuối Tuần','Giữ Chỗ Hôm Nay',
   'Suất hè Lion Camp 2026 còn rất ít. Ba mẹ đã xem – đăng ký ngay để giữ chỗ.',
   'Ưu đãi Early Bird 15% kết thúc 30/04. Nhắn Zalo 0916 961 409 ngay hôm nay.',
   'Cam kết hoàn phí 100%. Tham quan miễn phí cuối tuần. Khai giảng 15/06.',
   'Top 15 Leader In Me Châu Á. Giáo viên bản ngữ. 100% HS IELTS 6.0+.',
   'rmk','sales-page',URL_PAIN_TH,'RMK;SalesPage;V1'],
];

// ═══════════════════════════════════════════════════════════════════════════════
// 5_Negatives_Shared
// [Shared Set Name, Keyword, Match Type]
// ═══════════════════════════════════════════════════════════════════════════════
const NEGATIVES_DATA = [

  // ── NEG_MASTER: Lion_Camp_2026_Negatives_Master ───────────────────────────

  // 1. Geo — ngoài vùng target (Phrase)
  ...[
    'hà nội','đà nẵng','nha trang','cần thơ','huế','vũng tàu','đà lạt','sapa',
    'hải phòng','quảng ninh','thanh hóa','nghệ an','hà giang','lào cai',
    'buôn ma thuột','phan thiết','quy nhơn','hội an','hà tĩnh','bắc ninh','hải dương',
  ].map(k => [NEG_MASTER,k,'Phrase']),
  // Geo — Broad (từ xlsx)
  ...[
    'hà nội','đà nẵng','hải phòng','bình dương','đồng nai','tây ninh','bến tre',
    'tiền giang','cần thơ','vũng tàu','đà lạt',
  ].map(k => [NEG_MASTER,k,'Broad']),

  // 2. Sản phẩm sai loại (Phrase)
  ...[
    'miễn phí','free','học online','trực tuyến','pdf','ebook','tự học','game',
    'app học','phần mềm','download','tải về','youtube','tiktok video',
    'làm sao để','cách dạy','tự làm','crack','hack',
  ].map(k => [NEG_MASTER,k,'Phrase']),
  // Sản phẩm sai loại — Broad
  ...[
    'miễn phí','free','online','trực tuyến','zoom','giáo án','sách giáo khoa',
  ].map(k => [NEG_MASTER,k,'Broad']),

  // 3. Sai đối tượng (Phrase)
  ...[
    'mầm non','đại học','người lớn','sinh viên','việc làm','tuyển dụng','thực tập',
    'thạc sĩ','nghiên cứu sinh','trung niên','người cao tuổi','internship','graduate',
    'luyện thi','ôn thi','gia sư',
  ].map(k => [NEG_MASTER,k,'Phrase']),
  // Sai đối tượng — Broad
  ...[
    'đại học','cao đẳng','sinh viên','mầm non','gia sư',
  ].map(k => [NEG_MASTER,k,'Broad']),

  // 4. Intent tiêu cực (Phrase)
  ...[
    'phản ánh','lừa đảo','scam','kém chất lượng','review xấu','phốt',
    'tai nạn','khiếu nại','kiện tụng','đánh giá xấu','tố cáo','bóc phốt',
  ].map(k => [NEG_MASTER,k,'Phrase']),

  // 5. Ngân sách không phù hợp (Phrase)
  ...[
    'giá rẻ','dưới 5 triệu','dưới 3 triệu','học phí rẻ','rẻ nhất','siêu rẻ',
    'giảm giá sốc','học bổng','chứng chỉ','lớp học thêm',
  ].map(k => [NEG_MASTER,k,'Phrase']),

  // 6. Sai format / loại hình (Phrase)
  ...[
    'nội trú','trại qua đêm','camping rừng','trại quân đội',
    'du lịch','tour hè','resort hè','homestay','nhà nghỉ',
    'cắm trại tự túc','app học','pascal','robotics',
    'hè 2025','trại hè mầm non','trại hè tiểu học online',
  ].map(k => [NEG_MASTER,k,'Phrase']),
  // Sai format — Broad
  ...[
    'nội trú','ký túc xá','du lịch','từ xa','video học',
  ].map(k => [NEG_MASTER,k,'Broad']),

  // 7. Đối thủ trực tiếp (Phrase — giữ riêng cho Competitor ad group)
  ...[
    'trại hè vinschool','trại hè ischool','trại hè british council',
    'hội việt mỹ','wall street english','apax english',
  ].map(k => [NEG_MASTER,k,'Phrase']),
  // Đối thủ — Broad
  ...[
    'pascal','apax','cleverlearn',
  ].map(k => [NEG_MASTER,k,'Broad']),

  // ── NEG_TH: Lion_Camp_2026_Negatives_TieuHoc ─────────────────────────────
  // (áp dụng riêng cho Search_Govap_Core và Search_BinhTan_Core TH ad groups)
  ...[
    'thcs','cấp 2','lớp 6','lớp 7','lớp 8','lớp 9',
    'thpt','cấp 3','lớp 10','lớp 11','lớp 12',
    'hướng nghiệp đại học','ielts band 6','ielts band 7',
  ].map(k => [NEG_TH,k,'Phrase']),
  ...[
    'thcs','cấp 2','thpt','cấp 3','đại học',
  ].map(k => [NEG_TH,k,'Broad']),

  // ── NEG_THPT: Lion_Camp_2026_Negatives_THPT ──────────────────────────────
  // (áp dụng riêng cho THPT ad groups)
  ...[
    'luyện thi đại học','ôn thi thpt','ôn thi đại học',
    'thi đại học','luyện thi','ôn tập hè',
  ].map(k => [NEG_THPT,k,'Phrase']),
  ...[
    'luyện thi','thi đại học',
  ].map(k => [NEG_THPT,k,'Broad']),

  // ── NEG_PP: Lion_Camp_2026_Negatives_PainPoint ───────────────────────────
  // (áp dụng cho Search_PainPoint_All — loại trừ search quá generic)
  ...[
    'học thêm','lớp học thêm','gia sư tại nhà','gia sư tiếng anh',
    'trung tâm tiếng anh','luyện thi','thi thử',
  ].map(k => [NEG_PP,k,'Phrase']),
  ...[
    'học thêm','gia sư','trung tâm',
  ].map(k => [NEG_PP,k,'Broad']),
];

// ═══════════════════════════════════════════════════════════════════════════════
// 6_Sitelink_Extensions
// [Campaign, Title, Desc1, Desc2, URL, Device]
// ═══════════════════════════════════════════════════════════════════════════════
const SITELINKS_DATA = (() => {
  const common = [
    ['Xem Học Phí 2026','Bảng học phí trại hè','Ưu đãi Early Bird 15%',URL_HOCPHI,''],
    ['Đặt Tham Quan','Miễn phí cuối tuần','Gặp giáo viên & xem lớp',URL_THAMQUAN,''],
    ['FAQ Phụ Huynh','Ăn uống ngủ nghỉ bán trú','Xe đưa đón đồng phục',URL_FAQ,''],
    ['Hotline 0916 961 409','Tư vấn Zalo miễn phí','7:00–22:00 mỗi ngày',B+'/','mobile'],
  ];
  const specific = {
    [C_GOV]: [
      ['Cơ Sở Gò Vấp','Địa chỉ Lion Camp','Bản đồ & hướng dẫn',B+'/co-so-go-vap',''],
      ['Chương Trình Tiểu Học','Hè 6 tuần bán trú','Tiếng Anh + kỹ năng',URL_GOV_TH,''],
    ],
    [C_BT]: [
      ['Cơ Sở Bình Tân','Địa chỉ Lion Camp','Bản đồ & hướng dẫn',B+'/co-so-binh-tan',''],
      ['Chương Trình Tiểu Học','Hè 6 tuần bán trú','Tiếng Anh + kỹ năng',URL_BT_TH,''],
    ],
    [C_PAIN]: [
      ['So Sánh Chương Trình','Tiểu học vs THCS vs THPT','Xem chi tiết từng cấp',URL_CMP,''],
      ['Đăng Ký Ngay','Giữ chỗ trước 30/04','Ưu đãi Early Bird',URL_DANGKY,''],
    ],
    [C_CG]: [
      ['Cơ Sở Cần Giuộc','Nhân Lễ & Thái Sơn','KDC Long Hậu',B+'/co-so-can-giuoc',''],
      ['Chương Trình Long An','Hè 6 tuần bán trú','Tiếng Anh + kỹ năng',URL_CG,''],
    ],
    [C_RG]: [
      ['Cơ Sở Rạch Giá','Địa chỉ tại Kiên Giang','Bản đồ hướng dẫn',B+'/co-so-rach-gia',''],
      ['Chương Trình Kiên Giang','Hè 6 tuần bán trú','Tiếng Anh + kỹ năng',URL_RG_TH,''],
    ],
    [C_BRAND]: [
      ['Về Trường Việt Anh','Top 15 Leader In Me','Châu Á 2023',B+'/ve-truong-viet-anh',''],
      ['Thành Tích Học Sinh','100% IELTS 6.0+','Kết quả thực tế',B+'/thanh-tich',''],
    ],
    [C_RMK]: [
      ['Đăng Ký Ngay','Còn ít suất hè 2026','Khai giảng 15/06',URL_DANGKY,''],
      ['Giữ Chỗ Gấp','Ưu đãi hết 30/04','Nhắn Zalo ngay',B+'/','mobile'],
    ],
    [C_PMAX]: [
      ['Khám Phá Lion Camp','Campus & hoạt động','Xem video thực tế',B+'/ve-truong-viet-anh',''],
      ['Đăng Ký Trực Tuyến','Giữ chỗ 5 phút','Hỗ trợ 24/7',URL_DANGKY,''],
    ],
  };
  const out = [];
  [C_GOV,C_BT,C_PAIN,C_CG,C_RG,C_BRAND,C_RMK,C_PMAX].forEach(c => {
    (specific[c]||[]).forEach(r => out.push([c,...r]));
    common.forEach(r => out.push([c,...r]));
  });
  return out;
})();

// ═══════════════════════════════════════════════════════════════════════════════
// 7_Callout_Extensions (Unicode đầy đủ — không bị lỗi hiển thị tiếng Việt)
// [Campaign, Callout text, Schedule]
// ═══════════════════════════════════════════════════════════════════════════════
const CALLOUTS_DATA = (() => {
  const texts = [
    'Bán Trú 2 Bữa Ngủ Trưa',
    'Xe Đưa Đón Tận Nhà',
    'Giáo Viên Bản Ngữ IELTS',
    'Khai Giảng 15/06/2026',
    'Ưu Đãi Early Bird 15%',
    'Nhắn Zalo 0916 961 409',
    '100% HS IELTS 6.0+',
    'Cam Kết Hoàn Phí 100%',
    'Top 15 Leader In Me',
    'Còn Suất Hè 2026',
  ];
  const out = [];
  [C_GOV,C_BT,C_PAIN,C_CG,C_RG,C_BRAND,C_RMK,C_PMAX].forEach(c =>
    texts.forEach(t => out.push([c,t,'']))
  );
  return out;
})();

// ═══════════════════════════════════════════════════════════════════════════════
// 8_Structured_Snippets
// [Campaign, Header, Values]
// ═══════════════════════════════════════════════════════════════════════════════
const STRUCTURED_DATA = [
  [C_GOV,  'Service catalog','Tiểu học;THCS;THPT;Bán trú;Tiếng Anh;Kỹ năng lãnh đạo'],
  [C_BT,   'Service catalog','Tiểu học;THCS;THPT;Bán trú;Tiếng Anh;Kỹ năng lãnh đạo'],
  [C_PAIN, 'Service catalog','Tiểu học;THCS;THPT;Kỹ năng sống;Hướng nghiệp;Tiếng Anh'],
  [C_CG,   'Service catalog','Tiểu học;Bán trú;Tiếng Anh;Kỹ năng sống;Long An;Cần Giuộc'],
  [C_RG,   'Service catalog','Tiểu học;THCS;THPT;Bán trú;Tiếng Anh;Kỹ năng sống;Rạch Giá'],
  [C_BRAND,'Service catalog','Tiểu học;THCS;THPT;Lion Camp;Trường Việt Anh;IELTS'],
  [C_RMK,  'Service catalog','Tiểu học;THCS;THPT;Bán trú;Tiếng Anh;Kỹ năng'],
  [C_PMAX, 'Service catalog','Tiểu học;THCS;THPT;Bán trú;Tiếng Anh;Kỹ năng lãnh đạo'],
];

// ═══════════════════════════════════════════════════════════════════════════════
// 9_Call_Extensions
// [Campaign, Country code, Phone, Conversion reporting, Conversion action, Schedule]
// ═══════════════════════════════════════════════════════════════════════════════
const CALL_EXT_DATA = [C_GOV,C_BT,C_PAIN,C_CG,C_RG,C_BRAND,C_RMK,C_PMAX].map(c =>
  [c,'VN','0916961409','On','Phone_Call_Conversion','Mon-Sun 7:00-22:00']
);

// ═══════════════════════════════════════════════════════════════════════════════
// 12_Location_Targets
// [Campaign, Location type, Target, Radius, Bid adjustment, Exclude]
// ═══════════════════════════════════════════════════════════════════════════════
const LOCATION_DATA = [
  // Govap — quận + radius 10km
  [C_GOV,'City',  'Gò Vấp, Ho Chi Minh City, Vietnam','',   '+0%','No'],
  [C_GOV,'Radius','Gò Vấp, Ho Chi Minh City, Vietnam','10 km','+10%','No'],
  // BinhTan — quận + radius 10km
  [C_BT, 'City',  'Bình Tân, Ho Chi Minh City, Vietnam','',   '+0%','No'],
  [C_BT, 'Radius','Bình Tân, Ho Chi Minh City, Vietnam','10 km','+10%','No'],
  // PainPoint — toàn HCM
  [C_PAIN,'City', 'Ho Chi Minh City, Vietnam','','+0%','No'],
  // CanGiuoc — thành phố + radius + tỉnh
  [C_CG,'City',  'Cần Giuộc, Long An, Vietnam','',   '+0%','No'],
  [C_CG,'Radius','Cần Giuộc, Long An, Vietnam','15 km','+10%','No'],
  [C_CG,'City',  'Long An, Vietnam','','+0%','No'],
  // RachGia — thành phố + radius + tỉnh
  [C_RG,'City',  'Rạch Giá, Kiên Giang, Vietnam','',   '+0%','No'],
  [C_RG,'Radius','Rạch Giá, Kiên Giang, Vietnam','20 km','+10%','No'],
  [C_RG,'City',  'Kiên Giang, Vietnam','','+0%','No'],
  // Brand — HCM + tỉnh
  [C_BRAND,'City','Ho Chi Minh City, Vietnam','','+0%','No'],
  [C_BRAND,'City','Long An, Vietnam','',        '+0%','No'],
  [C_BRAND,'City','Kiên Giang, Vietnam','',     '+0%','No'],
  // Remarketing — tất cả vùng đã target
  [C_RMK,'City','Ho Chi Minh City, Vietnam','','+0%','No'],
  [C_RMK,'City','Long An, Vietnam','',         '+0%','No'],
  [C_RMK,'City','Kiên Giang, Vietnam','',      '+0%','No'],
  // PMax — HCM + tỉnh
  [C_PMAX,'City','Ho Chi Minh City, Vietnam','','+0%','No'],
  [C_PMAX,'City','Long An, Vietnam','',         '+0%','No'],
  [C_PMAX,'City','Kiên Giang, Vietnam','',      '+0%','No'],
];

// ═══════════════════════════════════════════════════════════════════════════════
// 15_Bid_Adjustments — Mobile +30%, Tablet -20%
// [Campaign, Adjustment type, Value, Bid adjustment]
// ═══════════════════════════════════════════════════════════════════════════════
const BIDADJ_DATA = (() => {
  const out = [];
  [C_GOV,C_BT,C_PAIN,C_CG,C_RG,C_BRAND,C_RMK,C_PMAX].forEach(c => {
    out.push([c,'Device','Mobile', '+30%']);
    out.push([c,'Device','Desktop','+0%']);
    out.push([c,'Device','Tablet', '-20%']);
  });
  return out;
})();

// ═══════════════════════════════════════════════════════════════════════════════
// 13_Ad_Schedule — 07:00–22:00 mỗi ngày, peak 17:00–22:00 +20%
// [Campaign, Day, Start, End, Bid adjustment]
// ═══════════════════════════════════════════════════════════════════════════════
const AD_SCHEDULE_DATA = (() => {
  const days  = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  const slots = [['07:00','12:00','+0%'],['12:00','17:00','+10%'],['17:00','22:00','+20%']];
  const out   = [];
  [C_GOV,C_BT,C_PAIN,C_CG,C_RG,C_BRAND,C_RMK,C_PMAX].forEach(c =>
    days.forEach(d => slots.forEach(s => out.push([c,d,s[0],s[1],s[2]])))
  );
  return out;
})();
