#!/usr/bin/env node
/**
 * Generate 301 redirect rules for archived/obsolete legacy URLs
 */
const fs = require('fs');
const path = require('path');

const INPUT = path.resolve(__dirname, '../docs/enriched-master-index.csv');
const OUTPUT = path.resolve(__dirname, '../docs/redirect-rules.csv');

const content = fs.readFileSync(INPUT, 'utf-8');
const lines = content.split('\n').filter(l => l.trim());
const rows = lines.slice(1);

const header = 'old_url,redirect_to,status_code,reason';
const redirects = [header];

const archiveActions = ['Archive', 'Redirect/Archive', 'Archive (old event)', 'Archive (outdated)'];

// Topic → best redirect target
function getRedirectTarget(url, title, topicCluster, pageType) {
  const u = url.toLowerCase();
  const t = (title || '').toLowerCase();
  const tc = (topicCluster || '').toLowerCase();
  const pt = (pageType || '').toLowerCase();
  
  // Mầm non related
  if (u.includes('mam-non') || u.includes('mau-giao') || t.includes('mầm non') || t.includes('mẫu giáo')) return '/mam-non';
  // Tiểu học
  if (u.includes('tieu-hoc') || t.includes('tiểu học')) return '/tieu-hoc';
  // THCS
  if (u.includes('thcs') || t.includes('trung học cơ sở') || t.includes('cấp 2')) return '/thcs';
  // THPT
  if (u.includes('thpt') || t.includes('trung học phổ thông') || t.includes('cấp 3') || u.includes('lop-10') || u.includes('lop-12')) return '/thpt';
  // Tuyển sinh
  if (u.includes('tuyen-sinh') || u.includes('nhap-hoc') || t.includes('tuyển sinh')) return '/tuyen-sinh';
  // Học phí
  if (u.includes('hoc-phi') || t.includes('học phí')) return '/tuyen-sinh/hoc-phi-mam-non';
  // Tiếng Anh / IELTS
  if (tc.includes('tiếng anh') || u.includes('tieng-anh') || u.includes('ielts')) return '/blog/10-bi-quyet-hoc-tieng-anh-hieu-qua';
  // Du học
  if (u.includes('du-hoc') || t.includes('du học')) return '/blog/du-hoc-sau-thpt';
  // Sự kiện / Open day
  if (u.includes('su-kien') || u.includes('open-day') || u.includes('khai-giang') || t.includes('sự kiện') || t.includes('khai giảng')) return '/blog/su-kien-sap-toi-2026';
  // Tham quan
  if (u.includes('tham-quan') || t.includes('tham quan')) return '/tham-quan/go-vap';
  // Phụ huynh / kỹ năng
  if (tc.includes('phụ huynh') || tc.includes('kỹ năng')) return '/blog/cach-chon-truong-mam-non-cho-con';
  // Học tập 
  if (tc.includes('học tập') || tc.includes('phương pháp')) return '/blog/active-learning-la-gi';
  
  // Default → homepage
  return '/';
}

let count = 0;
for (const row of rows) {
  const parts = row.split(',');
  const url = parts[0];
  const title = parts[1] || '';
  const pageType = parts[2] || '';
  const action = parts[5] || '';
  const topicCluster = parts[7] || '';
  
  if (archiveActions.includes(action)) {
    const target = getRedirectTarget(url, title, topicCluster, pageType);
    const reason = action === 'Archive (old event)' ? 'Past event - consolidated' :
                   action === 'Archive (outdated)' ? 'Outdated content - consolidated' :
                   'Legacy content merged into pillar page';
    redirects.push(`${url},${target},301,${reason}`);
    count++;
  }
}

fs.writeFileSync(OUTPUT, redirects.join('\r\n') + '\r\n', 'utf-8');

console.log(`\n=== Redirect Rules Generated ===`);
console.log(`Total 301 redirects: ${count}`);
console.log(`Output: ${OUTPUT}`);

// Stats by target
const byTarget = {};
redirects.slice(1).forEach(r => {
  const target = r.split(',')[1];
  byTarget[target] = (byTarget[target] || 0) + 1;
});
console.log('\n--- Redirects by target ---');
Object.entries(byTarget).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
  console.log(`  ${k}: ${v}`);
});
