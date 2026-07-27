// Sinh ảnh cho các landing page tuyển sinh "4 Tuần Vàng" từ banner gốc của phòng thiết kế.
// Chạy từ gốc repo:  node scripts/build-lp-images.mjs [đường-dẫn-thư-mục-banner]
// Ảnh gốc KHÔNG nằm trong repo (bộ "Block Hero / BG - website") — chỉ ảnh đã tối ưu
// trong public/lp/<trang>/ được commit.
//
// Mỗi trang có bộ ảnh RIÊNG dù nguồn có thể trùng: đổi ảnh của trang này sau đó
// không được âm thầm đổi trang kia.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = process.argv[2] || 'C:/Users/Van/Desktop/Block Hero _ BG - website-20260727T022255Z-1-001/Block Hero _ BG - website';
const LOGO = 'public/logo-th-thcs-thpt-yellow.png';
const NAVY = { r: 0x26, g: 0x27, b: 0x5d };
const FONT = 'Be Vietnam Pro, Segoe UI, Arial, sans-serif';

// Banner gốc — tất cả đều 1920x650, giữa là dải navy trống để đặt chữ
const TIEU_HOC_1 = `${SRC}/tieu-hoc-banner-chinh-1.jpg`; // 2 bé chạy (trái) · bé gái đọc sách (phải)
const TIEU_HOC_2 = `${SRC}/tieu-hoc-banner-chinh-2.jpg`; // cô giáo + 3 bé (trái) · bé trai chỉ tay (phải)
const THCS_1     = `${SRC}/thcs-banner-chinh-1.jpg`;     // thầy bản ngữ + 2 HS + laptop + đồ hoạ AI (trái) · bé trai giơ ngón cái (phải)
const CHUNG      = `${SRC}/banner-chinh.jpg`;            // mầm non (trái) · nhóm HS lớn tự học (phải)
const THPT_1     = `${SRC}/thpt-banner-chinh-1.jpg`;     // nhóm HS đập tay + đồ hoạ não AI (trái) · HS cầm sách Cambridge MINDSET FOR IELTS (phải)
const THPT_2     = `${SRC}/thpt-banner-chinh-2.jpg`;     // 2 HS + laptop + robot AI (trái) · HS cầm sách (phải)

const PAGES = [
  {
    out: 'public/lp/lop-1',
    hero: TIEU_HOC_1,
    og: ['TUYỂN SINH LỚP 1 · 2026–2027', 'Học thử 4 tuần', 'Không hài lòng — hoàn 100% học phí'],
    cards: [
      { src: TIEU_HOC_2, box: { left: 10, top: 60, width: 570, height: 590 }, name: 'card-english.webp' },
      { src: TIEU_HOC_1, box: { left: 40, top: 80, width: 470, height: 570 }, name: 'card-sport.webp' },
      { src: TIEU_HOC_1, box: { left: 1470, top: 130, width: 450, height: 520 }, name: 'card-coach.webp' },
    ],
    poster: { id: 'xh2YHEItrvU', vertical: true },   // Short 9:16 → cắt khung dọc thật
  },
  {
    out: 'public/lp/tieu-hoc',
    hero: TIEU_HOC_1,
    og: ['CHUYỂN TRƯỜNG TIỂU HỌC · LỚP 2–5', 'Học thử 4 tuần', 'Không hài lòng — hoàn 100% học phí'],
    cards: [
      { src: TIEU_HOC_2, box: { left: 10, top: 60, width: 570, height: 590 }, name: 'card-english.webp' },
      { src: TIEU_HOC_1, box: { left: 40, top: 80, width: 470, height: 570 }, name: 'card-sport.webp' },
      { src: TIEU_HOC_1, box: { left: 1470, top: 130, width: 450, height: 520 }, name: 'card-coach.webp' },
    ],
    poster: { id: 'xh2YHEItrvU', vertical: true },
  },
  {
    out: 'public/lp/thcs',
    hero: THCS_1,
    og: ['TUYỂN SINH THCS · LỚP 6–8 · 2026–2027', 'Học thử 4 tuần', 'Không hài lòng — hoàn 100% học phí'],
    cards: [
      { src: THCS_1, box: { left: 20, top: 40, width: 600, height: 610 }, name: 'card-ai.webp' },
      { src: CHUNG,  box: { left: 1370, top: 70, width: 550, height: 580 }, name: 'card-tuchu.webp' },
      { src: THCS_1, box: { left: 1460, top: 90, width: 460, height: 560 }, name: 'card-vui.webp' },
    ],
    poster: { id: 'T3HyL8vN0GU', vertical: false },  // video 16:9 thường → giữ nguyên khung
  },
  {
    out: 'public/lp/lop-10',
    hero: THPT_2,
    og: ['TUYỂN SINH LỚP 10 · 2026–2027', 'Cam kết IELTS 6.0+', 'Học thử 4 tuần — hoàn 100% nếu không hài lòng'],
    cards: [
      { src: THPT_2, box: { left: 10, top: 120, width: 560, height: 530 }, name: 'card-ai.webp' },
      // vùng cắt gần vuông để resize cover không xén mất chữ trên bìa sách IELTS
      { src: THPT_1, box: { left: 1450, top: 180, width: 470, height: 470 }, name: 'card-ielts.webp' },
      { src: THPT_1, box: { left: 10, top: 180, width: 470, height: 470 }, name: 'card-tuchu.webp' },
    ],
    poster: { id: '5T8j_k5VCW4', vertical: false },  // 16:9 nhưng chỉ có sddefault 4:3 → script tự cắt viền
  },
];

// ── Logo nền trong suốt (file gốc có nền trắng + viền khung mảnh quanh mép)
const logoTrim = await sharp(LOGO).unflatten().trim({ threshold: 12 }).png().toBuffer();
const lt = await sharp(logoTrim).metadata();
// (extract + trim trong cùng một pipeline sharp sẽ lỗi "bad extract area" — tách 2 lượt)
const logoInset = await sharp(logoTrim)
  .extract({ left: 10, top: 10, width: lt.width - 20, height: lt.height - 20 }).png().toBuffer();
const logoOg = await sharp(logoInset).trim({ threshold: 12 }).resize({ width: 320 }).png().toBuffer();

const scrim = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#26275D" stop-opacity="0.10"/>
    <stop offset="0.42" stop-color="#26275D" stop-opacity="0.18"/>
    <stop offset="0.75" stop-color="#26275D" stop-opacity="0.86"/>
    <stop offset="1" stop-color="#26275D" stop-opacity="0.9"/>
  </linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`);

const log = async (p) => {
  const m = await sharp(p).metadata();
  const { size } = await sharp(p).toBuffer({ resolveWithObject: true }).then((r) => r.info);
  console.log(`    ${p.split('/').pop().padEnd(22)} ${m.width}x${m.height} · ${(size / 1024).toFixed(0)}KB`);
};

for (const page of PAGES) {
  mkdirSync(page.out, { recursive: true });
  console.log(`\n${page.out}`);

  // 1. HERO — giữ khung 1920x650, dùng làm background-image
  await sharp(page.hero).resize(1920, 650).webp({ quality: 76 }).toFile(`${page.out}/hero.webp`);

  // 2. OG 1200x630 — banner letterbox trên nền navy + logo + thông điệp
  const [line1, line2, line3] = page.og;
  const heroFit = await sharp(page.hero).resize(1200, 406).toBuffer();
  const textSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <text x="600" y="392" text-anchor="middle" font-family="${FONT}" font-size="27" font-weight="700"
          letter-spacing="2" fill="#f9dd0e">${line1}</text>
    <text x="600" y="452" text-anchor="middle" font-family="${FONT}" font-size="46" font-weight="700"
          fill="#ffffff">${line2}</text>
    <text x="600" y="508" text-anchor="middle" font-family="${FONT}" font-size="33" font-weight="700"
          fill="#ffffff">${line3}</text>
  </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: NAVY } })
    .composite([
      { input: heroFit, top: 112, left: 0 },
      { input: scrim, top: 0, left: 0 },
      { input: logoOg, top: 168, left: Math.round((1200 - 320) / 2) },
      { input: textSvg, top: 0, left: 0 },
    ])
    .jpeg({ quality: 84 }).toFile(`${page.out}/og.jpg`);

  // 3. Ba ảnh vuông cho section "Kết quả mơ ước"
  for (const c of page.cards) {
    await sharp(c.src).extract(c.box).resize(620, 620, { fit: 'cover', position: 'top' })
      .webp({ quality: 80 }).toFile(`${page.out}/${c.name}`);
  }

  // 4. Ảnh bìa video phụ huynh (facade — trang không nạp YouTube tới khi bấm play)
  //    Không phải video nào cũng có maxresdefault: thiếu thì YouTube trả ảnh giữ chỗ 120x90.
  //    → dò lần lượt, lấy bản đầu tiên đủ lớn.
  let raw = null;
  for (const name of ['maxresdefault', 'sddefault', 'hqdefault']) {
    const res = await fetch(`https://i.ytimg.com/vi/${page.poster.id}/${name}.jpg`);
    if (!res.ok) continue;
    const buf = Buffer.from(await res.arrayBuffer());
    if ((await sharp(buf).metadata()).width >= 480) { raw = buf; break; }
  }
  if (raw) {
    const m = await sharp(raw).metadata();
    let img = sharp(raw);
    if (page.poster.vertical) {
      // Short bị YouTube độn nền mờ hai bên cho vừa 16:9 → cắt lấy khung dọc thật
      const w = Math.round((m.height * 9) / 16);
      img = img.extract({ left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height });
    } else if (m.width / m.height < 1.6) {
      // sddefault/hqdefault là khung 4:3, video 16:9 nằm giữa với viền đen trên dưới → cắt viền
      const h = Math.round((m.width * 9) / 16);
      img = img.extract({ left: 0, top: Math.round((m.height - h) / 2), width: m.width, height: h });
    }
    await img.webp({ quality: 82 }).toFile(`${page.out}/testimonial-1.webp`);
  } else {
    console.log('    ! bỏ qua testimonial-1.webp: không tìm được thumbnail đủ lớn');
  }

  for (const f of ['hero.webp', 'og.jpg', ...page.cards.map((c) => c.name), 'testimonial-1.webp']) {
    await log(`${page.out}/${f}`);
  }
}
