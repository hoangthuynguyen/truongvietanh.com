#!/usr/bin/env node
/**
 * Regenerate google-sheet-import.csv from ALL articles in docs/articles/
 * Reads frontmatter from each .md file → CSV row
 */
const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.resolve(__dirname, '../docs/articles');
const SHEET_CSV = path.resolve(__dirname, '../docs/google-sheet-import.csv');

const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md')).sort();
const esc = s => { s=String(s||''); return s.includes(',')||s.includes('"')||s.includes('\n') ? '"'+s.replace(/"/g,'""')+'"':s; };

const header = 'STT,Priority,Action,Topic,Search Intent,Funnel,Template Class,Primary Keyword,SEO Title,Slug,Meta Description,H1,Word Count,Schema,CTA,Doc Link,Status,Publish Date,URL';
const rows = [header];

files.forEach((file, i) => {
  const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
  
  // Parse frontmatter
  const fm = {};
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    fmMatch[1].split('\n').forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^"(.*)"$/, '$1');
    });
  }
  
  // Extract H1
  const h1Match = content.match(/^# (.+)$/m);
  const h1 = h1Match ? h1Match[1] : fm.seo_title || file.replace('.md','');
  
  const wc = content.split(/\s+/).length;
  const slug = file.replace('.md', '');
  const tc = fm.template_class || '';
  const tcl = tc.toLowerCase();
  const pri = tcl.includes('pillar')||tcl.includes('fee')||tcl.includes('local') ? 'High' : 
              tcl.includes('comparison')||tcl.includes('parent')||tcl.includes('blog') ? 'Medium' : 'Standard';
  const status = fm.status || 'Draft';
  const schema = tcl.includes('blog')||tcl.includes('parent') ? 'Article, FAQPage' : 
                 tcl.includes('landing')||tcl.includes('fee') ? 'LandingPage' : 'Article';
  
  rows.push([
    i+1, pri, 'Import Ready', esc(fm.topic_cluster||''), fm.search_intent||'Informational',
    fm.funnel_stage||'TOFU', esc(tc), esc(h1), esc(fm.seo_title||h1), slug,
    esc(fm.seo_description||''), esc(h1), wc, schema,
    'Đặt Lịch Tham Quan', `docs/articles/${slug}.md`, status, '2026-04-01', fm.url||'/'+slug
  ].join(','));
});

fs.writeFileSync(SHEET_CSV, rows.join('\r\n') + '\r\n', 'utf-8');
console.log(`Sheet CSV regenerated: ${rows.length - 1} rows → ${SHEET_CSV}`);
