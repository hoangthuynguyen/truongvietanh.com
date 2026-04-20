# Zalo OA Setup — Get Access Token for Worker

**App ID**: `4580774058394869551` (Make2GHL)
**OA ID**: `1678310120468101523` (Trường Việt Anh)

## Step 1: Cấu hình quyền (developers.zalo.me)

URL: https://developers.zalo.me/app/4580774058394869551/oa/settings

1. **Official Account Callback URL**: đặt callback endpoint để nhận code OAuth
   - Tạm thời dùng: `https://truongvietanh.com/api/zalo-callback`
   - Sau khi worker code implement callback endpoint, Zalo sẽ POST code đến URL này

2. **Chọn quyền cần yêu cầu** (tick các checkbox):
   - ✅ Gửi tin nhắn chủ động và gửi tin nhắn phản hồi
   - ✅ Upload hình ảnh, ảnh gif và file
   - ✅ Lấy thông tin quota tin nhắn
   - ✅ Lấy thông tin OA
   - ✅ Lấy danh sách người dùng
   - ✅ Lấy thông tin người dùng
   - ✅ Quản lý nhãn

3. Click **"Cập nhật"** để lưu

4. Copy **Authorization URL** được generate (có dạng):
   ```
   https://oauth.zaloapp.com/v4/oa/permission?app_id=4580774058394869551&redirect_uri=...&code_challenge=...
   ```

## Step 2: OA Admin Authorize

1. Gửi Authorization URL (Step 1.4) cho OA admin của "Trường Việt Anh"
2. Admin click URL → đồng ý cấp quyền
3. Zalo redirect về callback URL với `code` và `oa_id` trong query string
4. **Copy code** từ URL callback (có format `?code=abc123&oa_id=1678310120468101523`)

## Step 3: Exchange Code for Access Token

Run command này trên terminal (thay `YOUR_CODE` và `YOUR_APP_SECRET`):

```bash
curl -X POST "https://oauth.zaloapp.com/v4/oa/access_token" \
  -H "secret_key: YOUR_APP_SECRET" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "code=YOUR_CODE&app_id=4580774058394869551&grant_type=authorization_code"
```

Response:
```json
{
  "access_token": "eyJ0eXAiOiJKV1Q...",
  "refresh_token": "xBkD9...",
  "expires_in": "90000"
}
```

**Lưu lại**:
- `access_token` — hết hạn 25h
- `refresh_token` — hết hạn 90 ngày (dùng để gia hạn tự động)

> **App Secret** lấy ở đâu? developers.zalo.me → app của bạn → "Thông tin ứng dụng" → "App Secret Key"

## Step 4: Lấy Sales User ID (để nhận alert)

Cách 1 — từ OA Web:
1. Vào https://oa.zalo.me → chọn OA "Trường Việt Anh"
2. Menu **Khách hàng** → tìm user sales → click vào profile
3. URL chứa `user/6543210987654321` → số cuối là `user_id`

Cách 2 — API:
```bash
curl -H "access_token: YOUR_ACCESS_TOKEN" \
  "https://openapi.zalo.me/v3.0/oa/user/getlistfollower?data=%7B%22offset%22%3A0%2C%22count%22%3A20%7D"
```

Response chứa list followers với `user_id`.

## Step 5: Set Worker Secrets

```bash
cd /Users/nguyenhoang/Downloads/truongvietanh.com

wrangler secret put ZALO_OA_TOKEN --config wrangler.staging.jsonc
# Paste access_token

wrangler secret put ZALO_OA_REFRESH_TOKEN --config wrangler.staging.jsonc
# Paste refresh_token

wrangler secret put ZALO_SALES_USER_ID --config wrangler.staging.jsonc
# Paste sales user_id

wrangler secret put ZALO_APP_SECRET --config wrangler.staging.jsonc
# Paste app secret (để auto-refresh token)
```

## Step 6: Test Zalo Alert

POST test lead:
```bash
curl -X POST "https://truongvietanh.com/api/lead" \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test Zalo","email":"test@example.com","phone":"0999888777","schoolLevel":"tieu-hoc","source":"trai-he-tieu-hoc-go-vap-vsl","funnelCode":"trai-he-tieu-hoc-go-vap-vsl","quiz_score":45,"quiz_answers":[1,2,1,2,1,2]}'
```

Sales user sẽ nhận tin nhắn Zalo:
```
🔔 LEAD MỚI TỪ WEBSITE
👤 Test Zalo
📧 test@example.com
📱 0999888777
📊 QUIZ TRẠI HÈ: 45/100 điểm
🔥 Gọi NGAY — THẤP → CẦN CAN THIỆP GẤP!
```

## Step 7 (Optional): Auto-refresh Token

Access token hết hạn 25h. Worker cần logic tự refresh. Thêm vào worker:

```js
async function refreshZaloToken(env) {
  const res = await fetch('https://oauth.zaloapp.com/v4/oa/access_token', {
    method: 'POST',
    headers: {
      'secret_key': env.ZALO_APP_SECRET,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      refresh_token: env.ZALO_OA_REFRESH_TOKEN,
      app_id: '4580774058394869551',
      grant_type: 'refresh_token',
    }),
  });
  const data = await res.json();
  // Store new tokens in KV or update secrets via API
  return data.access_token;
}
```

Cron trigger (trong wrangler.jsonc):
```jsonc
{
  "triggers": {
    "crons": ["0 0 */1 * *"]  // mỗi ngày
  }
}
```

## Troubleshooting

- **Error -216**: App chưa được OA admin cấp quyền → quay lại Step 2
- **Error -200**: access_token hết hạn → refresh token
- **Error -14**: Rate limit → giảm tần suất gọi API
- **Error -32000**: User chưa follow OA → user phải follow trước khi nhận tin

## Reference

- Docs: https://developers.zalo.me/docs/official-account/quan-ly-va-gui-tin
- OA Management: https://oa.zalo.me/manage
- App Console: https://developers.zalo.me/app/4580774058394869551
