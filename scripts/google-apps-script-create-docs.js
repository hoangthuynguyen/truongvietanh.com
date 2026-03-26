/**
 * Google Apps Script: Auto-create Google Docs from Sheet data
 * 
 * HOW TO USE:
 * 1. Open Google Sheets: https://docs.google.com/spreadsheets/d/18UwZKKhpmH5aPxhZxDLldOh7PYcKWqo1b2saeex_gvM
 * 2. Go to Extensions > Apps Script
 * 3. Paste this entire script
 * 4. Set FOLDER_ID to your Drive folder ID (create one first)
 * 5. Run createDocsFromSheet() — it will create Google Docs and fill the "Doc Link" column
 * 
 * IMPORTANT: The script reads .md files from docs/articles/ and creates Google Docs
 */

// ============= CONFIGURATION =============
const SPREADSHEET_ID = '18UwZKKhpmH5aPxhZxDLldOh7PYcKWqo1b2saeex_gvM';
const SHEET_NAME = 'Master Sheet'; // Change to your sheet tab name
const DOC_LINK_COL = 16; // Column P = "Doc Link" (adjust to match your sheet)
const SLUG_COL = 10; // Column J = "Slug" (adjust to match)
const H1_COL = 12; // Column L = "H1"
const SEO_TITLE_COL = 9; // Column I = "SEO Title"
const STATUS_COL = 17; // Column Q = "Status"

// Create a folder on Google Drive first, then paste its ID here
const DRIVE_FOLDER_ID = 'YOUR_FOLDER_ID_HERE'; // Replace with actual folder ID

// ============= MAIN FUNCTION =============
function createDocsFromSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  
  // Create subfolders by type
  const subfolders = {};
  ['A-Pillar','B-Conversion','C-Local','D-Blog','E-Brand','F-Utility','Legacy'].forEach(name => {
    const existing = folder.getFoldersByName(name);
    subfolders[name] = existing.hasNext() ? existing.next() : folder.createFolder(name);
  });
  
  let created = 0;
  let skipped = 0;
  
  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const slug = row[SLUG_COL - 1];
    const h1 = row[H1_COL - 1];
    const seoTitle = row[SEO_TITLE_COL - 1];
    const existingLink = row[DOC_LINK_COL - 1];
    
    // Skip if already has a doc link
    if (existingLink && existingLink.toString().startsWith('http')) {
      skipped++;
      continue;
    }
    
    if (!slug || !h1) continue;
    
    // Determine subfolder
    let targetFolder = subfolders['Legacy'];
    if (slug.match(/^(mam-non|tieu-hoc|thcs|thpt|chuong-trinh|tuyen-sinh|co-so)/)) targetFolder = subfolders['A-Pillar'];
    else if (slug.match(/^(hoc-phi|tham-quan|open-day|hoc-thu)/)) targetFolder = subfolders['B-Conversion'];
    else if (slug.match(/(go-vap|binh-tan|phu-nhuan|quan-12|tan-binh|thu-duc)/)) targetFolder = subfolders['C-Local'];
    else if (slug.startsWith('blog')) targetFolder = subfolders['D-Blog'];
    else if (slug.match(/^(gioi-thieu|triet-ly|gia-tri|he-sinh-thai|doi-ngu)/)) targetFolder = subfolders['E-Brand'];
    else if (slug.match(/^(chinh-sach|dieu-khoan|lien-he|faq|sitemap)/)) targetFolder = subfolders['F-Utility'];
    
    // Create Google Doc
    const doc = DocumentApp.create(seoTitle || h1);
    const body = doc.getBody();
    
    // Write content
    body.appendParagraph(h1).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph(''); // spacer
    
    // Add SEO metadata
    body.appendParagraph('SEO & Technical Info').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('URL: ' + (row[data[0].indexOf('URL')] || '/' + slug));
    body.appendParagraph('SEO Title: ' + seoTitle);
    body.appendParagraph('Meta Description: ' + (row[SEO_TITLE_COL] || ''));
    body.appendParagraph(''); // spacer
    
    // Add main content heading
    body.appendParagraph('Nội Dung Chi Tiết').setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph('Xem file chi tiết tại: docs/articles/' + slug + '.md');
    body.appendParagraph('');
    
    // Add brand guidelines reminder
    body.appendParagraph('Brand Guidelines Checklist').setHeading(DocumentApp.ParagraphHeading.HEADING3);
    body.appendParagraph('☐ Đúng intent (Informational/Commercial/Transactional)');
    body.appendParagraph('☐ Có Answer Block sau mỗi H2/H3');
    body.appendParagraph('☐ Tone of voice: Chân thành, rõ ràng, có bằng chứng');
    body.appendParagraph('☐ CTA cụ thể và thực dụng');
    body.appendParagraph('☐ Không claim vô căn cứ (số 1, tốt nhất, duy nhất)');
    body.appendParagraph('☐ Internal links đúng journey logic');
    body.appendParagraph('☐ Word count đạt target');
    
    // Move doc to correct folder
    const file = DriveApp.getFileById(doc.getId());
    targetFolder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    
    // Write doc URL back to sheet
    const docUrl = doc.getUrl();
    sheet.getRange(i + 1, DOC_LINK_COL).setValue(docUrl);
    sheet.getRange(i + 1, STATUS_COL).setValue('Draft');
    
    created++;
    
    // Avoid rate limits
    if (created % 50 === 0) {
      SpreadsheetApp.flush();
      Utilities.sleep(2000);
      Logger.log('Created ' + created + ' docs so far...');
    }
  }
  
  SpreadsheetApp.flush();
  Logger.log('=== Complete ===');
  Logger.log('Created: ' + created);
  Logger.log('Skipped (already had link): ' + skipped);
  Logger.log('Folder: https://drive.google.com/drive/folders/' + DRIVE_FOLDER_ID);
}

// ============= UTILITY: Bulk update status =============
function markAllDraft() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const lastRow = sheet.getLastRow();
  
  for (let i = 2; i <= lastRow; i++) {
    if (!sheet.getRange(i, STATUS_COL).getValue()) {
      sheet.getRange(i, STATUS_COL).setValue('Draft');
    }
  }
  SpreadsheetApp.flush();
  Logger.log('Updated ' + (lastRow - 1) + ' rows to Draft status');
}

// ============= UTILITY: Count docs with links =============
function auditDocLinks() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  let hasLink = 0, noLink = 0;
  for (let i = 1; i < data.length; i++) {
    const link = data[i][DOC_LINK_COL - 1];
    if (link && link.toString().startsWith('http')) hasLink++;
    else noLink++;
  }
  
  Logger.log('=== Doc Link Audit ===');
  Logger.log('Has link: ' + hasLink);
  Logger.log('No link: ' + noLink);
  Logger.log('Total: ' + (hasLink + noLink));
}
