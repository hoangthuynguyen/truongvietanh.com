const fs = require('fs');
const path = require('path');

const DIR = '/Users/nguyenhoang/Downloads/truongvietanh.com/docs/articles';

// Helper to extract frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { fm: {}, fmRaw: '', body: content };
  
  const fmRaw = match[1];
  const lines = fmRaw.split('\n');
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
  
  const body = content.replace(/^---\n[\s\S]*?\n---/, '').trim();
  return { fm, fmRaw, body };
}

// Optimization Function
function optimizeArticle(filename) {
  const filePath = path.join(DIR, filename);
  const content = fs.readFileSync(filePath, 'utf-8');
  let { fm, fmRaw, body } = parseFrontmatter(content);
  
  // Skip if already optimized (detect by checking snippet prefix)
  if (body.includes('💡 **Tóm tắt nhanh:')) return false;

  const h1Match = body.match(/^# (.+)$/m);
  const h1 = h1Match ? h1Match[1].trim() : (fm.seo_title || filename.replace('.md', '').split('-').join(' '));
  
  // 1. Phân tích & Tạo Từ Khóa Chính
  // Extract primary keyword from H1 (first 3-4 words usually)
  let coreKw = fm.primary_keyword || '';
  if (!coreKw) {
    const words = h1.replace(/[🏆📢🎊🌈💡🎓✨🔥✈🏔🔑]/g, '').trim().split(' ');
    coreKw = words.slice(0, Math.min(words.length, 4)).join(' ');
  }
  
  // 2. Tối ưu Meta Data (Title & Description)
  let newTitle = fm.seo_title || '';
  if (!newTitle || newTitle.length < 10) {
    newTitle = h1.length > 55 ? h1.substring(0, 52) + '...' : h1 + ' | Việt Anh';
  }
  
  let newDesc = fm.seo_description || '';
  if (!newDesc || newDesc.length < 30) {
    newDesc = `Tìm hiểu chi tiết về ${coreKw} tại Trường Việt Anh. Cam kết chất lượng giáo dục song ngữ liên cấp, IELTS 6.0+, cơ sở vật chất hiện đại tại TPHCM.`;
  }
  
  // 3. Cải thiện định dạng AIO (AI Overview & GEO)
  // Replace dry developer tags with user/AI friendly semantic tags
  body = body.replace(/\*\*\[Answer Block — AIO Ready\]\*\*/g, `💡 **Tóm tắt nhanh (AI Overview):**`);
  body = body.replace(/\*\*\[Answer Block\]\*\*/g, `💡 **Câu trả lời nhanh:**`);
  
  // 4. Tăng mật độ từ khóa và Semantic SEO (Bolding entities)
  // Ensure the core keyword is bolded in the first paragraph
  const firstParaMatch = body.match(/\n\n(?!#|>|✅|-)(.+?)\n/);
  if (firstParaMatch && !firstParaMatch[1].toLowerCase().includes(coreKw.toLowerCase())) {
    const injected = `Khi tìm hiểu về **${coreKw}**, ` + firstParaMatch[1].charAt(0).toLowerCase() + firstParaMatch[1].slice(1);
    body = body.replace(firstParaMatch[1], injected);
  } else if (firstParaMatch && firstParaMatch[1].toLowerCase().includes(coreKw.toLowerCase()) && !firstParaMatch[1].includes(`**${coreKw}`)) {
     // If it has it but not bolded, bold it (case insensitive replace is tricky, we'll rough it)
     const reg = new RegExp(`(${coreKw})`, 'i');
     body = body.replace(firstParaMatch[1], firstParaMatch[1].replace(reg, '**$1**'));
  }

  // Bolding crucial E-E-A-T entities (only replace first few to avoid over-bolding)
  const entities = ['Trường Việt Anh', 'IELTS 6.0+', 'PDR', 'giáo viên bản ngữ', 'Bộ GDĐT'];
  entities.forEach(ent => {
    // Replace the first 2 occurrences of the entity with bolded version if not already bolded
    let count = 0;
    const regex = new RegExp(`(?<!\\*\\*)(${ent.replace(/\+/g, '\\+')})(?!\\*\\*)`, 'g');
    body = body.replace(regex, (match) => {
      count++;
      return count <= 2 ? `**${match}**` : match;
    });
  });

  // Rebuild File
  let newFmRaw = fmRaw;
  
  // Update Title
  if (fm.seo_title !== newTitle) {
    if (newFmRaw.includes('seo_title:')) {
      newFmRaw = newFmRaw.replace(/^seo_title:.*$/m, `seo_title: "${newTitle.replace(/"/g, '\\"')}"`);
    } else {
      newFmRaw += `\nseo_title: "${newTitle.replace(/"/g, '\\"')}"`;
    }
  }
  // Update Desc
  if (fm.seo_description !== newDesc) {
    if (newFmRaw.includes('seo_description:')) {
      newFmRaw = newFmRaw.replace(/^seo_description:.*$/m, `seo_description: "${newDesc.replace(/"/g, '\\"')}"`);
    } else {
      newFmRaw += `\nseo_description: "${newDesc.replace(/"/g, '\\"')}"`;
    }
  }
  // Ensure primary keyword exists
  if (!newFmRaw.includes('primary_keyword:')) {
    newFmRaw += `\nprimary_keyword: "${coreKw}"`;
  }
  
  const finalContent = `---\n${newFmRaw}\n---\n\n${body}`;
  fs.writeFileSync(filePath, finalContent, 'utf-8');
  return true;
}

const files = fs.readdirSync(DIR).filter(f => f.endsWith('.md'));
let optimizedCount = 0;

console.log(`Bắt đầu tối ưu hoá SEO & AIO cho ${files.length} bài viết...`);
files.forEach((f, idx) => {
  if (optimizeArticle(f)) optimizedCount++;
  if ((idx + 1) % 100 === 0) console.log(`  Đã xử lý: ${idx + 1} files...`);
});

console.log(`\n✅ Hoàn tất! Đã tối ưu SEO & AIO cho ${optimizedCount} bài viết.`);
console.log(`Các thay đổi chính: Khôi phục Meta lỗi, chuyển Text Tag thành chuẩn Semantic AIO, in đậm Entity (E-E-A-T), và tăng cường Mật độ từ khóa.`);
