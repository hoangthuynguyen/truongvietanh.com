# truongvietanh.com

Astro frontend deploy tren Cloudflare Pages va ket noi toi Directus backend thong qua REST API.

## Kien truc

- Frontend: Astro + `@astrojs/cloudflare`
- Backend: Directus chay rieng bang Docker hoac Directus Cloud
- Deploy frontend: Cloudflare Pages

Directus khong nen chay ben trong Cloudflare Pages. Pages phu hop cho frontend va Pages Functions, con Directus can mot runtime backend rieng.

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

## Bien moi truong tren Cloudflare Pages

Them cac bien sau trong project Pages:

- `PUBLIC_SITE_URL=https://truongvietanh.com`
- `PUBLIC_DIRECTUS_URL=https://your-directus-domain.example`
- `DIRECTUS_TOKEN=...`

Build settings:

- Build command: `npm run build`
- Build output directory: `dist`

## Vi sao Cloudflare dang loi fetch repository

Cloudflare Pages cua ban dang tro vao branch `main`, nhung GitHub repo hien tai dang rong va chua co commit nao. Khi repo chua co branch/commit thuc te, Pages co the loi ngay o buoc fetch repository.

Sau khi push commit dau tien len GitHub:

```bash
git add .
git commit -m "Initial Astro + Directus + Cloudflare Pages setup"
git push -u origin main
```

Neu van loi fetch repository sau khi da co commit, hay vao Cloudflare Pages va:

1. Ngat ket noi repo cu
2. Ket noi lai GitHub repository `hoangthuynguyen/truongvietanh.com`
3. Dam bao Cloudflare GitHub app duoc cap quyen truy cap repo nay
4. Chon production branch la `main`

## Kiem tra nhanh

- Trang chu: hien danh sach `posts` neu Directus tra du lieu
- API health: `/api/health.json`
