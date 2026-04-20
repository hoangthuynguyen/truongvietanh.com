# truongvietanh.com

Astro frontend cho `truongvietanh.com`, build tinh tu Directus va deploy len Cloudflare Workers Static Assets.

## Kien truc

- Frontend: Astro static build (`output: 'static'`)
- Backend: Directus chay rieng bang Docker hoac Directus Cloud
- Deploy frontend: Cloudflare Workers Static Assets
- 1 Worker duy nhat: `truongvietanh-com`, phuc vu 3 domain:
  - `truongvietanh.com` (canonical)
  - `www.truongvietanh.com` -> 301 -> `truongvietanh.com`
  - `hoc.truongvietanh.com` -> 301 -> `truongvietanh.com` (legacy staging)

Frontend fetch du lieu tu Directus trong luc build, sau do xuat ra static assets trong `dist`. Cach nay van la Cloudflare Workers, nhung khong chay SSR runtime tren edge.

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

Frontend mac dinh doc Directus tu `PUBLIC_DIRECTUS_URL`. Khi build production, Astro se lay du lieu tu Directus va render san HTML/static JSON vao `dist`.

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

## Chay Directus production tren VPS

- Repo co san file `directus/docker-compose.prod.yml`
- Tao file `directus/.env.prod` tren server tu `directus/.env.prod.example`
- Public URL nen dung `https://admin.truongvietanh.com`

## Bien moi truong cho Workers Builds

Can khai bao trong build environment cua moi Worker:

- `PUBLIC_SITE_URL`
- `PUBLIC_DIRECTUS_URL`
- `DIRECTUS_TOKEN`

Gia tri goi y:

- `PUBLIC_SITE_URL=https://truongvietanh.com`
- `PUBLIC_DIRECTUS_URL=https://admin.truongvietanh.com`

## Cau hinh Worker

Chi dung [wrangler.jsonc](/Users/nguyenhoang/Downloads/truongvietanh.com/wrangler.jsonc). `wrangler.staging.jsonc` da bi bo (da gop lai voi production va dung redirect o worker cho `hoc.truongvietanh.com`).

Lenh deploy local:

```bash
npm run deploy
# hoac: npm run deploy:prod
```

Neu connect GitHub vao Workers Builds:

- Deploy: `npx wrangler deploy -c wrangler.jsonc`

Build command:

```bash
npm run build
```

## Gan domain

Worker `truongvietanh-com` tro ca 3 route:

- `truongvietanh.com/*` (canonical)
- `www.truongvietanh.com/*` -> 301 -> `truongvietanh.com`
- `hoc.truongvietanh.com/*` -> 301 -> `truongvietanh.com` (legacy staging)

Gan trong Cloudflare dashboard tai `Workers & Pages` > Worker > `Domains & Routes`.

## Webhook rebuild

Sau khi Directus publish/sua bai:

- goi deploy hook cua Worker production

Co the dung Directus Flows/Webhook hoac GitHub Actions de trigger lai build/deploy.

## Kiem tra nhanh

- Trang chu hien danh sach `posts` neu Directus tra du lieu
- API health xuat file tinh tai `/api/health.json`
