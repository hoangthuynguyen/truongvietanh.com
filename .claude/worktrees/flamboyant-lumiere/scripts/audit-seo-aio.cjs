const fs = require('fs');
const path = require('path');

const DIR = '/Users/nguyenhoang/Downloads/truongvietanh.com/docs/articles';

// Helper to extract frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const fm = {};
  lines.forEach(l => {
    const idx = l.indexOf(':');
    if (idx > -1) {
      const key = l.slice(0, idx).trim();
      let val = l.slice(idx + 1).trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      fm[key] = val;
    }
  });
  return fm;
}

// SEO & AIO Audit Function
function auditArticle(filename) {
  const content = fs.readFileSync(path.join(DIR, filename), 'utf-8');
  const fm = parseFrontmatter(content);
  
  const body = content.replace(/^---\n[\s\S]*?\n---/, ''); // Remove frontmatter
  
  console.log(`\n=== 🔍 TỰ ĐỘNG AUDIT SEO & AIO: ${filename} ===`);
  
  // 1. Kiểm tra Tiêu đề & Mô tả (Meta)
  console.log(`\n--- 1. Meta Data (Thẻ Title & Description) ---`);
  const title = fm.seo_title || '';
  const desc = fm.seo_description || '';
  const keyword = title.split('|')[0].trim() || fm.primary_keyword || '';
  
  console.log(`• Title: "${title}" (${title.length} chars)`);
  if (title.length < 50 || title.length > 65) console.log(`  ❌ Vi phạm: Chiều dài Title nên từ 50-65 ký tự.`);
  else console.log(`  ✅ Chuẩn SEO cơ bản.`);
  
  console.log(`• Description: "${desc}" (${desc.length} chars)`);
  if (desc.length < 120 || desc.length > 165) console.log(`  ❌ Vi phạm: Meta Description nên từ 120-160 ký tự.`);
  else console.log(`  ✅ Chuẩn SEO cơ bản.`);
  
  // 2. Cấu trúc Heading
  console.log(`\n--- 2. Cấu Trúc Heading ---`);
  const h1s = body.match(/^# /gm) || [];
  const h2s = body.match(/^## /gm) || [];
  const h3s = body.match(/^### /gm) || [];
  
  console.log(`• H1: ${h1s.length} thẻ`);
  if (h1s.length !== 1) console.log(`  ❌ Vi phạm: Mỗi bài chỉ nên có duy nhất 1 thẻ H1.`);
  else console.log(`  ✅ Chuẩn H1.`);
  
  console.log(`• H2/H3 Depth: ${h2s.length} thẻ H2, ${h3s.length} thẻ H3`);
  if (h2s.length === 0) console.log(`  ❌ Vi phạm: Thiếu thẻ H2 để cấu trúc nội dung.`);
  else console.log(`  ✅ Cấu trúc phân cấp tốt.`);
  
  // 3. Chuẩn AIO (AI Overview & GEO)
  console.log(`\n--- 3. Chuẩn AIO & E-E-A-T (Generative Engine Optimization) ---`);
  const hasAnswerBlock = body.includes('💡 **Tóm tắt nhanh') || body.includes('💡 **Câu trả lời nhanh');
  const hasBulletPoints = (body.match(/^- /gm) || []).length > 2;
  const hasTable = body.includes('|---|---|');
  const hasFAQ = body.includes('Câu Hỏi Thường Gặp');
  
  console.log(`• Trả lời trực tiếp (Direct Answer Block cho AI trích xuất): ${hasAnswerBlock ? '✅ Có' : '❌ Không'}`);
  console.log(`• Cấu trúc dạng danh sách (Bullet points): ${hasBulletPoints ? '✅ Có' : '❌ Không'}`);
  console.log(`• Cấu trúc bảng (Bảng biểu dễ trích xuất): ${hasTable ? '✅ Có' : '❌ Không'}`);
  console.log(`• FAQ Section (Tăng E-E-A-T & Voice Search): ${hasFAQ ? '✅ Có' : '❌ Không'}`);
  
  // 4. Mật độ từ khóa (Basic heuristic check for the title keyword)
  console.log(`\n--- 4. Mật Độ Từ Khóa & Phân Bổ ---`);
  // Lấy 3 từ khóa chính tự động (từ title)
  const kwParts = keyword.split(' ');
  const coreKw = kwParts.slice(0, Math.min(kwParts.length, 3)).join(' ');
  const kwCount = (body.toLowerCase().match(new RegExp(coreKw.toLowerCase(), 'g')) || []).length;
  const totalWords = body.split(/\s+/).length;
  const kwDensity = (kwCount * coreKw.split(' ').length / totalWords * 100).toFixed(2);
  
  console.log(`• core keyword ước tính: "${coreKw}"`);
  console.log(`• Xuất hiện: ${kwCount} lần (Mật độ: ~${kwDensity}%)`);
  if (kwDensity < 0.5) console.log(`  ⚠️ Cảnh báo: Mật độ từ khóa hơi thấp (Tối ưu: 1-2%).`);
  else if (kwDensity > 3) console.log(`  ❌ Cảnh báo: Nhồi nhét từ khóa (Keyword stuffing).`);
  else console.log(`  ✅ Mật độ từ khóa tự nhiên, chuẩn E-E-A-T.`);
  
  console.log(`\n---------------------------------------------------------`);
}

// Pick some sample files based on different domains
const sampleFiles = [
  '10-bi-quyet-hoc-tieng-anh-hieu-qua.md', // From previous context
  fs.readdirSync(DIR).find(f => f.includes('hoc-phi') && f.endsWith('.md')),
  fs.readdirSync(DIR).find(f => f.includes('du-hoc') && f.endsWith('.md')),
  fs.readdirSync(DIR).find(f => f.includes('mam-non') && f.endsWith('.md'))
];

sampleFiles.filter(Boolean).forEach(auditArticle);
