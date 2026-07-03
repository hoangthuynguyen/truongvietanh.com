# Cấu hình Directus Webhook → Auto Rebuild

## Mục đích
Khi content team sửa nội dung trong Directus CMS, website tự động rebuild và deploy.

## Cách hoạt động
```
Directus CMS (sửa nội dung)
  → Webhook gọi GitHub API
    → GitHub Actions trigger
      → Build Astro → Deploy Cloudflare
```

## Bước 1: Tạo GitHub Personal Access Token
1. Vào https://github.com/settings/tokens
2. Generate new token (classic)
3. Scope: `repo` (full access)
4. Copy token

## Bước 2: Thêm GitHub Secrets
Vào repo Settings → Secrets → Actions:
- `PUBLIC_DIRECTUS_URL`: `<PUBLIC_DIRECTUS_URL — xem .env, không commit>`
- `DIRECTUS_TOKEN`: `<DIRECTUS_TOKEN — lấy từ trình quản lý mật khẩu, KHÔNG commit vào git>`
- `GH_DISPATCH_TOKEN`: (token từ bước 1)

## Bước 3: Cấu hình Directus Webhook
1. Đăng nhập Directus admin → Settings → Webhooks
2. Tạo webhook mới:
   - **Name**: Auto Rebuild Website
   - **URL**: `https://api.github.com/repos/hoangthuynguyen/truongvietanh.com/dispatches`
   - **Method**: POST
   - **Headers**:
     ```
     Authorization: Bearer <GH_DISPATCH_TOKEN>
     Accept: application/vnd.github.v3+json
     Content-Type: application/json
     ```
   - **Body**:
     ```json
     {"event_type": "cms_content_updated"}
     ```
   - **Trigger on**: pillar_pages (create, update, delete)
   - **Status**: Active

## Bước 4: Test
1. Sửa 1 FAQ trong Directus admin
2. Kiểm tra GitHub Actions → workflow "Deploy to Staging" chạy tự động
3. Sau 2-3 phút, website cập nhật nội dung mới

## Lưu ý
- Mỗi lần rebuild mất ~2-3 phút (build + deploy)
- Nếu sửa nhiều content, đợi sửa xong rồi trigger 1 lần
- Fallback: nếu Directus down, website vẫn hiển thị content hardcode
