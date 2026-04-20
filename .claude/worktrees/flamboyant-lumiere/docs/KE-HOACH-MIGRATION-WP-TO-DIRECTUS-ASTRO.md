# KE HOACH CHUYEN DOI WORDPRESS → DIRECTUS + ASTRO + CLOUDFLARE

> Trang: truongvietanh.com
> Ngay tao: 2026-04-04
> Staging: staging.truongvietanh.com
> Directus Admin: admin.truongvietanh.com (Contabo VPS)
> Media CDN: media.truongvietanh.com (Cloudflare R2)

---

## TONG QUAN HIEN TRANG

| Hang muc | Trang thai | Ghi chu |
|---|---|---|
| Astro frontend | Da co | `src/pages/`, `src/components/`, deploy Cloudflare Workers |
| Directus CMS | Da co Docker config | `directus/docker-compose.yml` + `docker-compose.prod.yml` |
| Bai viet (articles) | 1,207 file markdown | `docs/articles/` |
| CSV import data | 551 entries | `docs/directus-import-master.csv` |
| Hinh anh da download | 58/??? anh | `images/original/` va `images/webp/` |
| Image migration log | 58 entries | `docs/image_migration_log.csv` |
| Redirect rules | 430 rules | `docs/redirect-rules.csv` |
| Setup scripts | Da co | `scripts/setup-directus*.mjs`, `scripts/seed-*.mjs` |

---

## GIAI DOAN 1: DI CHUYEN HINH ANH + VIDEO LEN CLOUDFLARE R2

### 1.1 — Tao R2 Bucket tren Cloudflare

**Thao tac thu cong tren Cloudflare Dashboard:**

1. Dang nhap https://dash.cloudflare.com
2. Menu trai → R2 Object Storage → Create Bucket
3. Dat ten bucket: `truongvietanh-media`
4. Region: APAC (gan Viet Nam nhat)
5. Sau khi tao xong, vao Settings → Public Access:
   - Bat "Allow public access"
   - Them Custom Domain: `media.truongvietanh.com`
   - Cloudflare se tu dong tao DNS record va SSL

**Ket qua:** Moi file upload len R2 se truy cap duoc qua:
```
https://media.truongvietanh.com/images/ten-file.webp
```

### 1.2 — Download TOAN BO hinh anh tu WordPress

Hien tai chi co 58 anh. Can chay lai script de download het:

```bash
# Buoc 1: Kiem tra bao nhieu URL anh can download
wc -l docs/master-index-sheet.csv

# Buoc 2: Chay script download + convert WebP
node scripts/download_images.cjs

# Buoc 3: Kiem tra ket qua
ls images/original/ | wc -l
ls images/webp/ | wc -l
```

**Luu y quan trong:**
- Script hien tai doc tu `docs/master-index-sheet.csv`
- Download ve `images/original/`, convert sang WebP tai `images/webp/`
- Max width 1920px, quality 80%
- Neu WordPress hosting da tat, can lam NGAY buoc nay truoc khi mat data
- SVG files se giu nguyen (khong convert sang WebP)

### 1.3 — Upload hinh anh len R2

**Cach 1: Dung Wrangler CLI (don gian, tot cho <1000 file)**

```bash
# Cai wrangler neu chua co
npm install -g wrangler

# Login vao Cloudflare
wrangler login

# Upload tat ca file WebP
for file in images/webp/*.webp; do
  filename=$(basename "$file")
  echo "Uploading $filename..."
  wrangler r2 object put truongvietanh-media/images/$filename \
    --file="$file" \
    --content-type="image/webp"
done

# Upload SVG files (giu nguyen)
for file in images/original/*.svg; do
  filename=$(basename "$file")
  echo "Uploading SVG $filename..."
  wrangler r2 object put truongvietanh-media/images/$filename \
    --file="$file" \
    --content-type="image/svg+xml"
done
```

**Cach 2: Dung rclone (tot cho >1000 file, nhanh hon)**

```bash
# Cai rclone
brew install rclone

# Cau hinh rclone cho R2
# Chay: rclone config
# Chon: New remote → Name: r2 → Type: S3 → Provider: Cloudflare
# Nhap: Access Key ID va Secret (lay tu Cloudflare Dashboard → R2 → Manage R2 API Tokens)

# Sync toan bo thu muc
rclone sync images/webp/ r2:truongvietanh-media/images/ --progress
```

### 1.4 — Xu ly Video

| Loai video | Cach xu ly |
|---|---|
| Video nhung YouTube/Vimeo | Giu nguyen embed URL, khong can migrate |
| Video tu host tren WordPress | Download ve → Upload len R2 hoac Cloudflare Stream |
| Video lon (>100MB) | Nen dung Cloudflare Stream (co adaptive bitrate) |

```bash
# Tim tat ca video URL trong noi dung
grep -rih "wp-content/uploads.*\.\(mp4\|mov\|avi\|webm\)" docs/articles/ > docs/video-urls-to-migrate.txt

# Download video (neu co)
# Upload len R2 tuong tu nhu anh
```

### 1.5 — Tao bang mapping URL cu → URL moi

```bash
# Script nay can duoc TAO MOI: scripts/generate-image-url-map.cjs
# Input: docs/image_migration_log.csv
# Output: docs/image-url-mapping.json
```

**Dinh dang mapping:**
```json
{
  "https://truongvietanh.com/wp-content/uploads/2024/12/logo-foot.svg": "https://media.truongvietanh.com/images/trang-chu-1.webp",
  "https://truongvietanh.com/wp-content/uploads/2024/12/fb.svg": "https://media.truongvietanh.com/images/trang-chu-2.webp"
}
```

---

## GIAI DOAN 2: CHUAN BI VA IMPORT NOI DUNG VAO DIRECTUS

### 2.1 — Thay the URL anh trong CSV truoc khi import

```bash
# Script can TAO MOI: scripts/replace-image-urls-in-csv.cjs
# Doc image-url-mapping.json
# Tim-va-thay tat ca URL anh cu trong:
#   - docs/directus-import-master.csv (551 entries)
#   - docs/directus-import-combined.csv
#   - docs/directus-import-expanded.csv
# Dac biet trong cot content_json (chua HTML/JSON voi URL anh nhung)
```

**Can thay the:**
- `https://truongvietanh.com/wp-content/uploads/...` → `https://media.truongvietanh.com/images/...`
- `http://truongvietanh.com/wp-content/uploads/...` → `https://media.truongvietanh.com/images/...`
- Relative paths: `/wp-content/uploads/...` → `https://media.truongvietanh.com/images/...`

### 2.2 — Setup Directus Schema tren Contabo Production

**Tren may local (hoac SSH vao Contabo):**

```bash
# Buoc 1: Chay Directus production
cd directus
docker compose -f docker-compose.prod.yml up -d

# Buoc 2: Doi Directus khoi dong (30-60 giay)
# Kiem tra: curl http://localhost:8055/server/health

# Buoc 3: Tao schema (chay tu may local, tro ve Contabo)
# Sua .env truoc:
#   PUBLIC_DIRECTUS_URL=https://admin.truongvietanh.com
#   DIRECTUS_TOKEN=your-admin-token

npm run directus:setup          # Collections co ban (articles, pages, categories...)
npm run directus:setup:blocks   # Block system cho page builder
npm run directus:setup:m2a      # M2A (Many-to-Any) foundation
```

**Directus Schema bao gom (da dinh nghia trong scripts):**
- `articles` — Bai viet blog
- `pages` — Trang tinh (gioi-thieu, hoc-phi, lien-he...)
- `categories` — Danh muc
- `blocks` — Content blocks (paragraph, heading, image, faq, bullet-list...)
- `page_blocks` — M2A junction (lien ket pages ↔ blocks)

### 2.3 — Import noi dung vao Directus

```bash
# Seed static pages voi M2A blocks
npm run directus:seed:pages:m2a

# Import articles tu CSV
# Can TAO MOI script neu chua co: scripts/import-articles-to-directus.mjs
# Script doc directus-import-master.csv va POST tung entry qua Directus API
```

**Quy trinh import moi article:**
1. Doc CSV row
2. Parse `content_json` → tao cac blocks tuong ung
3. POST /items/articles (title, slug, seo_title, seo_desc, hero_h1...)
4. POST /items/blocks (tung block: paragraph, heading, faq...)
5. POST /items/article_blocks (lien ket article ↔ blocks)

### 2.4 — Kiem tra noi dung sau import

```bash
# Kiem tra so luong articles
curl -s "https://admin.truongvietanh.com/items/articles?aggregate[count]=*" \
  -H "Authorization: Bearer $DIRECTUS_TOKEN"

# Kiem tra so luong pages
curl -s "https://admin.truongvietanh.com/items/pages?aggregate[count]=*" \
  -H "Authorization: Bearer $DIRECTUS_TOKEN"

# Truy cap Directus Admin UI de kiem tra truc quan
# https://admin.truongvietanh.com
```

---

## GIAI DOAN 3: KET NOI ASTRO VOI DIRECTUS + R2

### 3.1 — Cap nhat .env (Astro frontend)

```env
PUBLIC_SITE_URL=https://truongvietanh.com
PUBLIC_DIRECTUS_URL=https://admin.truongvietanh.com
DIRECTUS_TOKEN=your-static-read-token
R2_PUBLIC_URL=https://media.truongvietanh.com
```

### 3.2 — Cap nhat astro.config.mjs

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://truongvietanh.com',
  output: 'static',
  image: {
    domains: [
      'truongvietanh.com',
      'media.truongvietanh.com',   // R2 CDN
      'admin.truongvietanh.com',   // Directus assets
    ],
  },
});
```

### 3.3 — Cap nhat src/lib/directus.ts

Dam bao Directus client tro dung URL:

```ts
import { createDirectus, rest, readItems } from '@directus/sdk';

const directus = createDirectus(import.meta.env.PUBLIC_DIRECTUS_URL)
  .with(rest());

export default directus;
```

### 3.4 — Cap nhat Astro pages de render tu Directus

**File: src/pages/[...slug].astro** — Dynamic route cho tat ca bai viet

Moi trang can:
1. Fetch data tu Directus API (articles hoac pages)
2. Render content blocks qua `BlocksRenderer.astro`
3. Su dung URL anh tu R2 (`media.truongvietanh.com`)

**File: src/components/BlocksRenderer.astro** — Da co, render cac block types:
- paragraph → `<p>`
- heading-2 → `<h2>`
- bullet-list → `<ul><li>`
- faq → FAQ schema markup
- image → `<img src="https://media.truongvietanh.com/...">`

---

## GIAI DOAN 4: REDIRECT RULES (BAO VE SEO)

### 4.1 — Implement Redirect 301

Da co 430 redirect rules trong `docs/redirect-rules.csv`.

**Cach implement (chon 1 trong 2):**

**Cach A: Cloudflare Bulk Redirects (khuyen dung)**
```bash
# Script can TAO MOI: scripts/upload-redirects-to-cloudflare.cjs
# Doc redirect-rules.csv
# Dung Cloudflare API tao Bulk Redirect List
# Uu diem: xu ly o edge, khong ton Astro build time
```

**Cach B: File _redirects (don gian hon)**
```bash
# Script can TAO MOI: scripts/generate-redirects-file.cjs
# Doc redirect-rules.csv → tao public/_redirects
# Dinh dang:
# /old-url /new-url 301
```

### 4.2 — Cap nhat Sitemap

```bash
# Cai them astro sitemap integration
npm install @astrojs/sitemap

# Them vao astro.config.mjs:
# import sitemap from '@astrojs/sitemap';
# integrations: [sitemap()]
```

### 4.3 — Submit Google Search Console

1. Truy cap https://search.google.com/search-console
2. Them property: truongvietanh.com (neu chua co)
3. Submit sitemap moi: https://truongvietanh.com/sitemap-index.xml
4. Dung URL Inspection tool kiem tra cac trang quan trong

---

## GIAI DOAN 5: TESTING TREN STAGING

### 5.1 — Build va Deploy Staging

```bash
# Build
npm run build

# Deploy staging
npm run deploy:staging

# Kiem tra tai:
# https://staging.truongvietanh.com
```

### 5.2 — Checklist kiem tra (PHAI HOAN THANH TRUOC KHI GO LIVE)

**Noi dung:**
- [ ] Trang chu hien thi dung
- [ ] Trang gioi-thieu, hoc-phi, lien-he, tuyen-sinh hien thi dung
- [ ] Tat ca 551+ bai viet hien thi dung noi dung
- [ ] Content blocks render dung (paragraph, heading, list, faq)
- [ ] Khong co noi dung bi thieu hoac sai

**Hinh anh:**
- [ ] Tat ca anh load tu media.truongvietanh.com (KHONG con link wp-content)
- [ ] Khong co broken images (kiem tra Console > Network tab)
- [ ] SVG files hien thi dung (logo, icons)
- [ ] Anh responsive (khong bi vo, khong qua lon)

**SEO:**
- [ ] Meta title va description dung cho moi trang
- [ ] Open Graph tags (og:title, og:description, og:image)
- [ ] Canonical URLs dung
- [ ] Sitemap.xml accessible va day du
- [ ] Robots.txt cho phep crawl

**Redirect:**
- [ ] Thu 10-20 URL cu → redirect dung den URL moi
- [ ] Status code la 301 (khong phai 302)
- [ ] Khong co redirect loops

**Chuc nang:**
- [ ] Form dang ky / lien he hoat dong (LeadFormTwoStepEmailFirst)
- [ ] Menu navigation hoat dong
- [ ] Footer links dung
- [ ] Mobile responsive (test tren iPhone, Android)

**Hieu nang:**
- [ ] Google PageSpeed Insights > 80 (mobile)
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Tat ca anh WebP (khong con JPG/PNG lon)

---

## GIAI DOAN 6: GO LIVE

### 6.1 — Truoc khi chuyen

- [ ] Backup WordPress lan cuoi (database + files)
- [ ] Xac nhan tat ca noi dung da import xong
- [ ] Xac nhan staging test PASSED het checklist
- [ ] Thong bao team/doi tac (neu can)

### 6.2 — Chuyen DNS va Deploy

```bash
# Buoc 1: Deploy production
npm run deploy:prod

# Buoc 2: DNS da duoc quan ly boi Cloudflare
# truongvietanh.com da tro ve Cloudflare Workers (wrangler.jsonc)
# Neu DNS con tro ve WordPress hosting cu:
#   - Vao Cloudflare DNS Settings
#   - Xoa/sua A record cu tro ve IP WordPress
#   - Cloudflare Workers se tu dong handle

# Buoc 3: Kiem tra
curl -I https://truongvietanh.com
# Phai tra ve 200 OK tu Cloudflare Workers
```

### 6.3 — Sau khi Go Live (theo doi 7 ngay)

**Ngay 1-2:**
- [ ] Monitor Cloudflare Analytics (traffic, errors)
- [ ] Kiem tra Google Search Console cho 404 moi
- [ ] Kiem tra form submissions co den dung
- [ ] Thu redirect tu cac URL pho bien cu

**Ngay 3-7:**
- [ ] Kiem tra Google indexing (trang moi duoc index)
- [ ] Kiem tra ranking cac tu khoa quan trong
- [ ] Monitor Core Web Vitals trong Search Console
- [ ] Fix bat ky 404 hoac loi nao phat sinh

**Sau 2 tuan on dinh:**
- [ ] Tat WordPress hosting cu (tiet kiem chi phi)
- [ ] Xoa DNS records cu (neu con)

---

## DANH SACH SCRIPTS CAN TAO MOI

| # | Ten script | Muc dich | Giai doan |
|---|---|---|---|
| 1 | `scripts/generate-image-url-map.cjs` | Tao JSON mapping URL anh cu → moi | 1.5 |
| 2 | `scripts/replace-image-urls-in-csv.cjs` | Thay URL anh trong CSV truoc import | 2.1 |
| 3 | `scripts/upload-images-to-r2.sh` | Upload batch anh len R2 | 1.3 |
| 4 | `scripts/import-articles-to-directus.mjs` | Import articles tu CSV vao Directus API | 2.3 |
| 5 | `scripts/generate-redirects-file.cjs` | Tao _redirects tu redirect-rules.csv | 4.1 |
| 6 | `scripts/verify-migration.cjs` | Kiem tra tat ca URL anh, links sau migration | 5.2 |

---

## THU TU THUC HIEN (TUNG BUOC MOT)

```
BUOC 1  → Chay download_images.cjs (download HET anh tu WP)
BUOC 2  → Tao R2 bucket + custom domain media.truongvietanh.com
BUOC 3  → Tao script generate-image-url-map.cjs
BUOC 4  → Upload anh len R2
BUOC 5  → Tao script replace-image-urls-in-csv.cjs
BUOC 6  → Chay replace URL anh trong CSV
BUOC 7  → Setup Directus schema tren Contabo (npm run directus:setup)
BUOC 8  → Import noi dung vao Directus
BUOC 9  → Cap nhat Astro config + components
BUOC 10 → Implement redirect rules
BUOC 11 → Deploy staging + test checklist
BUOC 12 → Fix loi (neu co)
BUOC 13 → Deploy production (GO LIVE)
BUOC 14 → Monitor 7 ngay
BUOC 15 → Tat WordPress hosting cu
```

---

## GHI CHU KY THUAT

**Cloudflare R2:**
- Free: 10GB storage, 10 trieu Class A operations/thang
- Custom domain: media.truongvietanh.com (free SSL qua Cloudflare)
- API compatible voi S3 (dung duoc AWS SDK, rclone, wrangler)

**Directus tren Contabo:**
- Docker image: directus/directus:11
- Database: SQLite (don gian, du cho website nay)
- Network: ket noi qua proxy network `n8n-contabo_internal`
- Admin URL: https://admin.truongvietanh.com

**Astro Frontend:**
- Output: static (pre-rendered tai build time)
- Deploy: Cloudflare Workers (wrangler)
- Staging: staging.truongvietanh.com
- Production: truongvietanh.com

**Luu y bao mat:**
- DIRECTUS_TOKEN chi dung read-only token cho Astro frontend
- Admin password phai doi ngay sau setup
- R2 bucket chi public READ, khong public WRITE
- Cloudflare Access co the bao ve admin.truongvietanh.com
