// Sinh ảnh cho các landing page tuyển sinh Tiểu học từ 2 banner gốc của phòng thiết kế.
// Chạy từ gốc repo:  node scripts/build-lp-images.mjs [đường-dẫn-thư-mục-banner]
// Ảnh gốc KHÔNG nằm trong repo (bộ "Block Hero / BG - website") — chỉ ảnh đã tối ưu
// trong public/lp/<trang>/ được commit.
//
// Mỗi trang có bộ ảnh RIÊNG dù ảnh gốc giống nhau: đổi ảnh của trang này sau đó
// không được âm thầm đổi trang kia. Tốn thêm ~170KB, đáng.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = process.argv[2] || 'C:/Users/Van/Desktop/Block Hero _ BG - website-20260727T022255Z-1-001/Block Hero _ BG - website';
const B1 = `${SRC}/tieu-hoc-banner-chinh-1.jpg`; // 1920x650 — 2 bé chạy (trái) + bé gái đọc sách (phải)
const B2 = `${SRC}/tieu-hoc-banner-chinh-2.jpg`; // 1920x650 — cô giáo + 3 bé (trái) + bé trai chỉ tay (phải)
const LOGO = 'public/logo-th-thcs-thpt-yellow.png';
const NAVY = { r: 0x26, g: 0x27, b: 0x5d };
const FONT = 'Be Vietnam Pro, Segoe UI, Arial, sans-serif';

// Ảnh bìa video phụ huynh — cắt khung dọc thật của Short (YouTube độn nền mờ cho vừa 16:9)
const POSTER_ID = 'xh2YHEItrvU';

const PAGES = [
  {
    out: 'public/lp/lop-1',
    og: ['TUYỂN SINH LỚP 1 · 2026–2027', 'Học thử 4 tuần', 'Không hài lòng — hoàn 100% học phí'],
  },
  {
    out: 'public/lp/tieu-hoc',
    og: ['CHUYỂN TRƯỜNG TIỂU HỌC · LỚP 2–5', 'Học thử 4 tuần', 'Không hài lòng — hoàn 100% học phí'],
  },
];

// ── Logo nền trong suốt (file gốc có nền trắng + viền khung mảnh quanh mép)
const logoTrim = await sharp(LOGO).unflatten().trim({ threshold: 12 }).png().toBuffer();
const lt = await sharp(logoTrim).metadata();
// (extract + trim trong cùng một pipeline sharp sẽ lỗi "bad extract area" — tách 2 lượt)
const logoInset = await sharp(logoTrim)
  .extract({ left: 10, top: 10, width: lt.width - 20, height: lt.height - 20 }).png().toBuffer();
const logoOg = await sharp(logoInset).trim({ threshold: 12 }).resize({ width: 320 }).png().toBuffer();

const heroFit = await sharp(B1).resize(1200, 406).toBuffer();
const scrim = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#26275D" stop-opacity="0.10"/>
    <stop offset="0.42" stop-color="#26275D" stop-opacity="0.18"/>
    <stop offset="0.75" stop-color="#26275D" stop-opacity="0.86"/>
    <stop offset="1" stop-color="#26275D" stop-opacity="0.9"/>
  </linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`);

// Ảnh bìa video: tải thumbnail rồi cắt lấy khung dọc 9:16 ở giữa
const res = await fetch(`https://i.ytimg.com/vi/${POSTER_ID}/maxresdefault.jpg`);
const posterRaw = res.ok ? Buffer.from(await res.arrayBuffer()) : null;

const CARDS = [
  { src: B2, box: { left: 10, top: 60, width: 570, height: 590 }, name: 'card-english.webp' },
  { src: B1, box: { left: 40, top: 80, width: 470, height: 570 }, name: 'card-sport.webp' },
  { src: B1, box: { left: 1470, top: 130, width: 450, height: 520 }, name: 'card-coach.webp' },
];

const log = async (p) => {
  const m = await sharp(p).metadata();
  const { size } = await sharp(p).toBuffer({ resolveWithObject: true }).then((r) => r.info);
  console.log(`    ${p.split('/').pop().padEnd(22)} ${m.width}x${m.height} · ${(size / 1024).toFixed(0)}KB`);
};

for (const page of PAGES) {
  mkdirSync(page.out, { recursive: true });
  console.log(`\n${page.out}`);

  // 1. HERO — giữ khung 1920x650, dùng làm background-image
  await sharp(B1).resize(1920, 650).webp({ quality: 76 }).toFile(`${page.out}/hero.webp`);

  // 2. OG 1200x630 — banner letterbox trên nền navy + logo + thông điệp
  const [line1, line2, line3] = page.og;
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
  for (const c of CARDS) {
    await sharp(c.src).extract(c.box).resize(620, 620, { fit: 'cover', position: 'top' })
      .webp({ quality: 80 }).toFile(`${page.out}/${c.name}`);
  }

  // 4. Ảnh bìa video phụ huynh (facade — trang không nạp YouTube tới khi bấm play)
  if (posterRaw) {
    const m = await sharp(posterRaw).metadata();
    const w = Math.round((m.height * 9) / 16);
    await sharp(posterRaw)
      .extract({ left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height })
      .webp({ quality: 82 }).toFile(`${page.out}/testimonial-1.webp`);
  } else {
    console.log('    ! bỏ qua testimonial-1.webp: không tải được thumbnail YouTube');
  }

  for (const f of ['hero.webp', 'og.jpg', ...CARDS.map((c) => c.name), 'testimonial-1.webp']) {
    await log(`${page.out}/${f}`);
  }
}
