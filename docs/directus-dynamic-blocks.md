# Directus Dynamic Blocks

## Muc tieu

Repo nay dung Astro static frontend va Directus lam CMS. Luong deploy dung nhat cho he nay la:

- Contabo: host Directus
- Cloudflare Workers Static Assets: host frontend Astro

Khong can dua Directus len Cloudflare. Cloudflare chi build va phuc vu `dist/`.

## Collections da chuan hoa

- `pages`
- `page_blocks`
- `blocks_hero`
- `blocks_rich_text`
- `blocks_cards`
- `blocks_stats`
- `blocks_faq`
- `blocks_quote`
- `blocks_links`
- `blocks_cta`

## Cau truc du lieu

`pages` luu metadata SEO va theme cua trang.

`page_blocks` la junction table:

- `pages_id`: ID cua page
- `sort`: thu tu block
- `block_collection`: ten collection block
- `block_item_id`: ID cua block item
- `visible`: bat/tat block

Moi `blocks_*` luu du lieu that cho mot loai section.

## Ho tro M2A Builder

Frontend hien da ho tro ca hai che do:

1. `pages` + `page_blocks` + `blocks_*`
2. `pages.blocks` hoac `pages.content_blocks` theo kieu Directus Builder / Many-to-Any

Neu ban tao field `blocks` trong Directus theo Builder/M2A:

- route [src/pages/[...slug].astro](/Users/nguyenhoang/Downloads/truongvietanh.com/src/pages/[...slug].astro) se uu tien doc `blocks`
- neu page khong co `blocks`, frontend moi fallback sang `page_blocks`

Frontend da support cac collection M2A sau:

- `block_hero`
- `block_rich_text`
- `block_text_with_image`
- `block_cards`
- `block_features`
- `block_stats`
- `block_faq`
- `block_quote`
- `block_links`
- `block_gallery`
- `block_pricing_table`
- `block_form`
- `block_cta`

De dung naming moi va seed template presets:

```bash
npm run directus:setup:m2a
```

Script nay se:

- tao collection `block_*`
- tao junction collection an `pages_blocks`
- tao field Builder / M2A `pages.blocks`
- tao relations M2A cho Directus Builder
- tao collection `template_presets`
- seed 28 template cu thanh preset M2A
- them field `pages.permalink` va `pages.template_preset`
- mo quyen `read` cho Public tren cac collection moi
- seed page mau `mau-cms-m2a`

De migrate cac trang production dang nam trong `site-content.ts` sang M2A:

```bash
npm run directus:seed:pages:m2a
```

Script nay seed 9 route hien co vao `pages.blocks` va khong ghi de neu page/block da ton tai.

Va van tuong thich voi bo cu:

- `blocks_hero`
- `blocks_rich_text`
- `blocks_cards`
- `blocks_stats`
- `blocks_faq`
- `blocks_quote`
- `blocks_links`
- `blocks_cta`

## Cach dung

1. Dung Directus hien tai tren Contabo.
2. Chay script:

```bash
npm run directus:setup:m2a
```

3. Dang nhap Directus va kiem tra collections moi.
4. Mo page mau:

- Directus item custom junction cu: `pages.slug = mau-cms-blocks`
- Directus item Builder M2A moi: `pages.slug = mau-cms-m2a`
- Frontend routes: `/mau-cms-blocks`, `/mau-cms-m2a`

## Deploy dung cho he nay

### Contabo

Contabo chi chay Directus:

- App URL tam thoi: `http://45.88.188.169:8055`
- URL muc tieu nen dung: `https://admin.truongvietanh.com`

Tren VPS:

1. Tao `directus/.env.prod`
2. Chay `docker compose -f directus/docker-compose.prod.yml up -d`
3. Reverse proxy `admin.truongvietanh.com` vao `:8055`
4. Them DNS `A record` cho `admin.truongvietanh.com` tro ve IP Contabo

### Cloudflare

Frontend Astro dang deploy bang Wrangler:

```bash
npm run deploy:staging
npm run deploy:prod
```

Can co bien moi truong khi build:

- `PUBLIC_SITE_URL`
- `PUBLIC_DIRECTUS_URL`
- `DIRECTUS_TOKEN`

Gia tri khuyen nghi:

- Staging: `PUBLIC_SITE_URL=https://staging.truongvietanh.com`
- Production: `PUBLIC_SITE_URL=https://truongvietanh.com`
- Directus: `PUBLIC_DIRECTUS_URL=https://admin.truongvietanh.com`

Neu DNS admin chua xong, tam thoi co the build bang IP:

- `PUBLIC_DIRECTUS_URL=http://45.88.188.169:8055`

## Quy trinh editor

1. Tao 1 page trong `pages`
2. Neu dung schema cu: tao block trong `blocks_*` va noi qua `page_blocks`
3. Neu dung Builder moi: tao block trong `block_*` va lap trong `pages.blocks`
4. Publish page
5. Build/deploy frontend Astro

Route [src/pages/[...slug].astro](/Users/nguyenhoang/Downloads/truongvietanh.com/src/pages/[...slug].astro) se uu tien page trong Directus. Neu chua co, no fallback sang bo du lieu tinh trong [src/lib/site-content.ts](/Users/nguyenhoang/Downloads/truongvietanh.com/src/lib/site-content.ts).
