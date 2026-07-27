// Sinh ảnh cho LP /tuyen-sinh/lop-1-uu-dai-vang từ 2 banner gốc của phòng thiết kế.
// Chạy từ gốc repo:  node scripts/build-lp-lop1-images.mjs [đường-dẫn-thư-mục-banner]
// Ảnh gốc KHÔNG nằm trong repo (bộ "Block Hero / BG - website") — chỉ ảnh đã tối ưu
// trong public/lp/lop-1/ được commit.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = process.argv[2] || 'C:/Users/Van/Desktop/Block Hero _ BG - website-20260727T022255Z-1-001/Block Hero _ BG - website';
const B1 = `${SRC}/tieu-hoc-banner-chinh-1.jpg`; // 1920x650 — 2 bé chạy (trái) + bé gái đọc sách (phải)
const B2 = `${SRC}/tieu-hoc-banner-chinh-2.jpg`; // 1920x650 — cô giáo + 3 bé (trái) + bé trai chỉ tay (phải)
const LOGO = 'public/logo-th-thcs-thpt-yellow.png';
const OUT = 'public/lp/lop-1';
const NAVY = { r: 0x26, g: 0x27, b: 0x5d };

mkdirSync(OUT, { recursive: true });

const log = async (p) => {
  const m = await sharp(p).metadata();
  const { size } = await sharp(p).toBuffer({ resolveWithObject: true }).then((r) => r.info);
  console.log(`  ${p.split('/').pop().padEnd(22)} ${String(m.width) + 'x' + m.height} · ${(size / 1024).toFixed(0)}KB`);
};

// 1. HERO — giữ nguyên khung 1920x650, dùng làm background-image
await sharp(B1).resize(1920, 650).webp({ quality: 76 }).toFile(`${OUT}/hero.webp`);

// 2. OG IMAGE 1200x630 — letterbox banner trên nền navy (giữ cả 2 bên có trẻ)
//    + logo và thông điệp ở khoảng trống giữa, để share Facebook/Zalo đọc được ngay.
const heroFit = await sharp(B1).resize(1200, 406).toBuffer();
// unflatten(): biến nền trắng của file logo thành trong suốt để đặt lên nền navy.
// File gốc còn viền khung mảnh quanh mép → trim rồi cắt thêm 10px mỗi cạnh cho sạch.
const logoTrim = await sharp(LOGO)
  .unflatten().trim({ threshold: 12 }).png().toBuffer();
const lt = await sharp(logoTrim).metadata();
// (extract + trim trong cùng một pipeline sharp sẽ lỗi "bad extract area" — tách 2 lượt)
const logoInset = await sharp(logoTrim)
  .extract({ left: 10, top: 10, width: lt.width - 20, height: lt.height - 20 })
  .png()
  .toBuffer();
const logoOg = await sharp(logoInset).trim({ threshold: 12 }).resize({ width: 320 }).png().toBuffer();
const logoH = (await sharp(logoOg).metadata()).height;
const FONT = 'Be Vietnam Pro, Segoe UI, Arial, sans-serif';
const textSvg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <text x="600" y="392" text-anchor="middle" font-family="${FONT}" font-size="27" font-weight="700"
        letter-spacing="2" fill="#f9dd0e">TUYỂN SINH LỚP 1 · 2026–2027</text>
  <text x="600" y="452" text-anchor="middle" font-family="${FONT}" font-size="46" font-weight="700"
        fill="#ffffff">Học thử 4 tuần</text>
  <text x="600" y="508" text-anchor="middle" font-family="${FONT}" font-size="33" font-weight="700"
        fill="#ffffff">Không hài lòng — hoàn 100% học phí</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: NAVY } })
  .composite([
    { input: heroFit, top: 112, left: 0 },
    { input: Buffer.from(
        `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#26275D" stop-opacity="0.10"/>
            <stop offset="0.42" stop-color="#26275D" stop-opacity="0.18"/>
            <stop offset="0.75" stop-color="#26275D" stop-opacity="0.86"/>
            <stop offset="1" stop-color="#26275D" stop-opacity="0.9"/>
          </linearGradient></defs>
          <rect width="1200" height="630" fill="url(#g)"/>
        </svg>`
      ), top: 0, left: 0 },
    { input: logoOg, top: 168, left: Math.round((1200 - 320) / 2) },
    { input: textSvg, top: 0, left: 0 },
  ])
  .jpeg({ quality: 84 })
  .toFile(`${OUT}/og.jpg`);

// 3. 3 ảnh vuông cho Section "Kết quả mơ ước"
const cards = [
  { src: B2, box: { left: 10, top: 60, width: 570, height: 590 }, name: 'card-english.webp' },
  { src: B1, box: { left: 40, top: 80, width: 470, height: 570 }, name: 'card-sport.webp' },
  { src: B1, box: { left: 1470, top: 130, width: 450, height: 520 }, name: 'card-coach.webp' },
];
for (const c of cards) {
  await sharp(c.src).extract(c.box).resize(620, 620, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 }).toFile(`${OUT}/${c.name}`);
}

// 4. ẢNH BÌA VIDEO PHỤ HUYNH — lấy thumbnail của video rồi cắt lấy khung dọc thật
//    (video là Short 9:16, YouTube độn nền mờ hai bên cho vừa khung 16:9).
//    Dùng làm facade: trang chỉ nạp player YouTube khi phụ huynh bấm play.
const POSTERS = [{ id: 'xh2YHEItrvU', name: 'testimonial-1.webp' }];
for (const p of POSTERS) {
  const res = await fetch(`https://i.ytimg.com/vi/${p.id}/maxresdefault.jpg`);
  if (!res.ok) { console.warn(`  ! bỏ qua ${p.name}: thumbnail HTTP ${res.status}`); continue; }
  const raw = Buffer.from(await res.arrayBuffer());
  const m = await sharp(raw).metadata();
  const w = Math.round((m.height * 9) / 16);
  await sharp(raw)
    .extract({ left: Math.round((m.width - w) / 2), top: 0, width: w, height: m.height })
    .webp({ quality: 82 })
    .toFile(`${OUT}/${p.name}`);
}

console.log('Đã tạo:');
for (const f of ['hero.webp', 'og.jpg', ...cards.map((c) => c.name), ...POSTERS.map((p) => p.name)]) {
  await log(`${OUT}/${f}`);
}
