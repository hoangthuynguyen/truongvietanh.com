import fs from 'fs';
import path from 'path';

const SLUGS = ['gan-day','viet-anh','hoc-phi','song-ngu','do-tuoi','khu-vuc','an-toan','so-sanh','tham-quan','vao-lop-1'];
const AG = {
  'gan-day':'AG 01 — Gần đây, quanh đây, Gò Vấp',
  'viet-anh':'AG 02 — Việt Anh, Mầm non Việt Anh (branded)',
  'hoc-phi':'AG 03 — Học phí, chi phí',
  'song-ngu':'AG 04 — Song ngữ, tiếng Anh, giáo viên nước ngoài',
  'do-tuoi':'AG 05 — 13 tháng–6 tuổi, nhà trẻ, bán trú',
  'khu-vuc':'AG 06 — Đường, khu vực + xe đưa đón',
  'an-toan':'AG 07 — An toàn, camera, sĩ số, dinh dưỡng',
  'so-sanh':'AG 08 — So sánh trường, trường nào tốt',
  'tham-quan':'AG 09 — Tham quan, tư vấn, học thử',
  'vao-lop-1':'AG 10 — Tự lập, tự tin, chuẩn bị lớp 1',
};

const dec = (s) => s
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
  .replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&times;/g,'×').replace(/&minus;/g,'−');
const txt = (h) => dec(h.replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();

function grabAll(html, re) { const out=[]; let m; while ((m = re.exec(html))) out.push(m); return out; }

const pages = [];
for (const slug of SLUGS) {
  const file = path.join('dist','mam-non-go-vap',slug,'index.html');
  const html = fs.readFileSync(file,'utf8');
  const body = html.slice(html.indexOf('<body'));

  const meta = {
    slug,
    adGroup: AG[slug],
    url: 'https://truongvietanh.com/mam-non-go-vap/' + slug + '/',
    title: txt((html.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||''),
    description: dec(((html.match(/<meta name="description" content="([^"]*)"/)||[])[1]||'')),
    robots: ((html.match(/<meta name="robots" content="([^"]*)"/)||[])[1]||''),
    funnel: ((html.match(/name="funnel_code" value="([^"]*)"/)||[])[1]||''),
  };

  const heroEyebrow = txt(((body.match(/<p class="hero__eyebrow">([\s\S]*?)<\/p>/)||[])[1])||'');
  const h1 = txt(((body.match(/<h1 class="hero__h1">([\s\S]*?)<\/h1>/)||[])[1])||'');
  const sub = txt(((body.match(/<p class="hero__sub">([\s\S]*?)<\/p>/)||[])[1])||'');
  const points = grabAll(body, /<ul class="hero__points">([\s\S]*?)<\/ul>/g)
    .flatMap(m => grabAll(m[1], /<li>([\s\S]*?)<\/li>/g).map(x => txt(x[1])));
  const metrics = grabAll(body, /<span class="metric__n">([\s\S]*?)<\/span>\s*<span class="metric__l">([\s\S]*?)<\/span>/g)
    .map(m => txt(m[1]) + ' — ' + txt(m[2]));

  // form (lấy ở hero, form thứ nhất)
  const formTitle = txt(((body.match(/<h3 class="form-step-title">([\s\S]*?)<\/h3>/)||[])[1])||'');
  const formDesc  = txt(((body.match(/<p class="form-step-description">([\s\S]*?)<\/p>/)||[])[1])||'');
  const nextBtn   = txt(((body.match(/class="form-btn form-btn--next"[^>]*>([\s\S]*?)<\/button>/)||[])[1])||'');
  const submitBtn = txt(((body.match(/class="form-btn form-btn--submit"[^>]*>([\s\S]*?)<\/button>/)||[])[1])||'');

  // thân trang
  const main = body.slice(body.indexOf('<main class="body">'), body.indexOf('</main>'));
  const blocks = [];
  const secRe = /<section class="sec">([\s\S]*?)<\/section>/g;
  let sm;
  while ((sm = secRe.exec(main))) {
    const sec = sm[1];
    const h2 = txt(((sec.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)||[])[1])||'');
    const lede = txt(((sec.match(/<p class="lede">([\s\S]*?)<\/p>/)||[])[1])||'');
    const items = [];
    for (const c of grabAll(sec, /<div class="card">([\s\S]*?)<\/div>/g)) {
      const ch3 = txt(((c[1].match(/<h3>([\s\S]*?)<\/h3>/)||[])[1])||'');
      const ps = grabAll(c[1], /<p>([\s\S]*?)<\/p>/g).map(x => txt(x[1])).filter(Boolean);
      const lis = grabAll(c[1], /<li>([\s\S]*?)<\/li>/g).map(x => txt(x[1])).filter(Boolean);
      items.push({ kind:'card', head: ch3, paras: ps, list: lis });
    }
    for (const t of grabAll(sec, /<table>([\s\S]*?)<\/table>/g)) {
      const rows = grabAll(t[1], /<tr>([\s\S]*?)<\/tr>/g)
        .map(r => grabAll(r[1], /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g).map(c => txt(c[1])));
      items.push({ kind:'table', rows });
    }
    for (const tl of grabAll(sec, /<ul class="timeline">([\s\S]*?)<\/ul>/g)) {
      const rows = grabAll(tl[1], /<li><b>([\s\S]*?)<\/b><span>([\s\S]*?)<\/span><\/li>/g)
        .map(r => [txt(r[1]), txt(r[2])]);
      items.push({ kind:'timeline', rows });
    }
    for (const pn of grabAll(sec, /<div class="panel">([\s\S]*?)<\/div>\s*<\/section>|<div class="panel">([\s\S]*?)<\/div>/g)) {
      const inner = pn[1] || pn[2] || '';
      const ph3 = txt(((inner.match(/<h3>([\s\S]*?)<\/h3>/)||[])[1])||'');
      const lis = grabAll(inner, /<li>([\s\S]*?)<\/li>/g).map(x => txt(x[1])).filter(Boolean);
      const ps  = grabAll(inner, /<p[^>]*>([\s\S]*?)<\/p>/g).map(x => txt(x[1])).filter(Boolean);
      if (ph3 || lis.length || ps.length) items.push({ kind:'panel', head: ph3, paras: ps, list: lis });
    }
    // checklist đứng riêng ngoài card/panel
    for (const cl of grabAll(sec, /<ul class="checklist">([\s\S]*?)<\/ul>/g)) {
      const lis = grabAll(cl[1], /<li>([\s\S]*?)<\/li>/g).map(x => txt(x[1]));
      if (!items.some(i => JSON.stringify(i.list||[]) === JSON.stringify(lis))) items.push({ kind:'list', list: lis });
    }
    const faqs = grabAll(sec, /<details>[\s\S]*?<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>[\s\S]*?<\/details>/g)
      .map(m => ({ q: txt(m[1]), a: txt(m[2]) }));
    blocks.push({ h2, lede, items, faqs });
  }

  pages.push({ meta, hero:{ heroEyebrow, h1, sub, points, metrics },
    form:{ formTitle, formDesc, nextBtn, submitBtn }, blocks });
}

fs.writeFileSync(process.argv[2], JSON.stringify(pages,null,1),'utf8');
console.log('Đã rút', pages.length, 'trang · tổng khối nội dung:',
  pages.reduce((n,p)=>n+p.blocks.length,0),
  '· tổng FAQ:', pages.reduce((n,p)=>n+p.blocks.reduce((m,b)=>m+b.faqs.length,0),0));
