# HUONG DAN TAO CLOUDFLARE R2 BUCKET

> Thoi gian: ~10 phut
> Can: Tai khoan Cloudflare (da co domain truongvietanh.com)

---

## BUOC 1: Tao R2 Bucket

1. Dang nhap: https://dash.cloudflare.com
2. Menu trai → **R2 Object Storage**
3. Click **Create Bucket**
4. Dat ten: `truongvietanh-media`
5. Location: **Automatic** (hoac chon Asia Pacific neu co)
6. Click **Create Bucket**

## BUOC 2: Bat Public Access qua Custom Domain

1. Trong bucket `truongvietanh-media`, vao tab **Settings**
2. Keo xuong phan **Public Access**
3. Click **Connect Domain**
4. Nhap domain: `media.truongvietanh.com`
5. Click **Connect Domain**
6. Cloudflare se tu dong tao DNS record va cap SSL

**Sau khi xong, tat ca file trong bucket se truy cap qua:**
```
https://media.truongvietanh.com/<path-to-file>
```

Vi du:
```
https://media.truongvietanh.com/images/trang-chu-1.webp
https://media.truongvietanh.com/images/svg/logo-foot.svg
```

## BUOC 3: Kiem tra

Mo trinh duyet, truy cap:
```
https://media.truongvietanh.com/
```
Neu thay XML response hoac "NoSuchKey" la da hoat dong.

## BUOC 4: Upload anh (sau khi download xong)

```bash
# Dam bao da login wrangler
wrangler login

# Chay script upload
bash scripts/upload-images-to-r2.sh
```

## BUOC 5: Kiem tra anh tren R2

Mo trinh duyet:
```
https://media.truongvietanh.com/images/trang-chu-1.webp
```
Neu thay anh hien thi la thanh cong!

---

## GHI CHU

- R2 Free tier: 10GB storage, 10 trieu reads/thang (du cho website nay)
- Khong can tao API token rieng neu da dung `wrangler login`
- Neu muon dung rclone (upload nhanh hon), can tao R2 API Token:
  1. R2 → Manage R2 API Tokens → Create API Token
  2. Permissions: Object Read & Write
  3. Specify bucket: truongvietanh-media
  4. Luu lai Access Key ID va Secret Access Key
