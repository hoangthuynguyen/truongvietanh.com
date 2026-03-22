# truongvietanh.com

Astro frontend deploy tren Cloudflare Workers va ket noi toi Directus backend thong qua REST API.

## Kien truc

- Frontend: Astro + `@astrojs/cloudflare`
- Backend: Directus chay rieng bang Docker hoac Directus Cloud
- Deploy frontend: Cloudflare Workers

Directus khong nen chay ben trong Cloudflare Workers. Worker phu hop cho frontend SSR va API route nhe, con Directus can mot runtime backend rieng.

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
Trong local development, Astro chay dev server thuong de co the goi Directus tren `localhost`. Khi build production, adapter Cloudflare se duoc bat lai.

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

## Bien moi truong tren Cloudflare Workers

Them cac bien sau trong project Worker:

- `PUBLIC_SITE_URL=https://truongvietanh.com`
- `PUBLIC_DIRECTUS_URL=https://your-directus-domain.example`
- `DIRECTUS_TOKEN=...`

Build settings trong Workers Builds:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

## Luu y ve Cloudflare Pages

Project nay dang dung `@astrojs/cloudflare` v13 tren Astro 6. Adapter nay khong con ho tro deploy len Cloudflare Pages nua; no sinh cau hinh danh cho Cloudflare Workers. Neu import repo nay vao Pages, ban se gap cac loi nhu:

- `The name 'ASSETS' is reserved in Pages projects`
- `kv_namespaces[0] bindings should have a string "id" field`
- `Expected "triggers" to be of type object, containing only properties crons, but got {}`

Vi vay, hay tao project trong Cloudflare theo duong dan `Workers & Pages` > `Create application` > `Import a repository`, sau do chon setup cho Worker thay vi Pages.

## Ket noi GitHub vao Workers Builds

1. Vao Cloudflare dashboard > `Workers & Pages`.
2. Chon `Create application`.
3. Chon `Import a repository`.
4. Ket noi GitHub app neu Cloudflare chua co quyen vao repo `hoangthuynguyen/truongvietanh.com`.
5. Chon production branch `main`.
6. Dat build command la `npm run build`.
7. Giu deploy command mac dinh `npx wrangler deploy`.
8. Them cac environment variables o tren va deploy lai.

## Kiem tra nhanh

- Trang chu: hien danh sach `posts` neu Directus tra du lieu
- API health: `/api/health.json`
