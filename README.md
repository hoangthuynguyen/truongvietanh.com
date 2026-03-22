# truongvietanh.com

Astro frontend deploy tren Cloudflare Pages va ket noi toi Directus backend thong qua REST API.

## Kien truc

- Frontend: Astro static build
- Backend: Directus chay rieng bang Docker hoac Directus Cloud
- Deploy frontend: Cloudflare Pages

Frontend se doc Directus trong luc build, sau do xuat trang tinh vao `dist`. Cach nay phu hop voi Cloudflare Pages va khong can chay Directus ben trong Cloudflare runtime.

## Chay frontend local

1. Tao file `.env` tu `.env.example`
2. Cai dependencies:

```bash
npm install
```

3. Chay frontend:

```bash
npm run dev
```

Frontend mac dinh doc Directus tu `PUBLIC_DIRECTUS_URL`.
Trong local development, Astro van co the goi Directus tren `localhost`. Khi build production, Astro se lay du lieu tu Directus va render san HTML/static JSON vao `dist`.

## Chay Directus local

1. Tao file `directus/.env` tu `directus/.env.example`
2. Khoi dong Directus:

```bash
npm run directus:up
```

3. Mo `http://127.0.0.1:8055`
4. Tu dong tao collection `posts`, static token, du lieu mau va file `.env` cho frontend:

```bash
npm run directus:setup
```

Neu lan dau script bao can reload schema, chay them:

```bash
npm run directus:down
npm run directus:up
npm run directus:setup
```

5. Neu can tao thu cong, collection `posts` can cac field:

- `slug` text, unique
- `title` text
- `excerpt` text
- `content` text
- `published_at` datetime
- `status` string

Script setup se cap nhat `.env` o root voi `PUBLIC_DIRECTUS_URL` va `DIRECTUS_TOKEN` de frontend co the doc du lieu private ngay.

Directus local dang dung SQLite voi file database mac dinh tai `/directus/database/data.db`.

## Chay Directus production tren VPS

Repo co san file `directus/docker-compose.prod.yml` de chay Directus tren VPS voi volume rieng va tham gia mang `n8n-contabo_internal` cho reverse proxy neu can.

Can mot file `directus/.env.prod` tren server, co the copy tu `directus/.env.prod.example`.

## Bien moi truong tren Cloudflare Pages

Them cac bien sau trong project Pages:

- `PUBLIC_SITE_URL=https://truongvietanh.com`
- `PUBLIC_DIRECTUS_URL=https://your-directus-domain.example`
- `DIRECTUS_TOKEN=...`

Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Deploy len Cloudflare Pages

1. Vao Cloudflare dashboard > `Workers & Pages`.
2. Chon project `truongvietanh-com` hoac tao moi neu can.
3. Neu deploy tu GitHub:

   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`

4. Them cac environment variables o tren.
5. Deploy lai.

Ban cung co the deploy artifact local bang:

```bash
npm run build
npx wrangler pages deploy dist --project-name truongvietanh-com
```

## Kiem tra nhanh

- Trang chu: hien danh sach `posts` neu Directus tra du lieu
- API health: `/api/health.json`
