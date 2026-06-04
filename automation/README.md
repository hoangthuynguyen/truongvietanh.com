# VA Content Automation — n8n Workflows (24:00 → 07:00)

Hệ thống tự động hoá content cho **25 kênh** Trường Việt Anh.
Pipeline chạy đêm, sản phẩm sẵn sàng chờ duyệt **lúc 07:00 sáng** hàng ngày.
**Tất cả content pre-approval** — không có auto-publish.

---

## ⏰ Timeline Đêm → Sáng

```
00:00  Cron trigger → kill-switch check → fetch voice cards + insights
00:05  Claude Sonnet 4.6 ideate 3 ý tưởng/kênh × 25 kênh (parallel batch 3)
00:15  Hard rules (forbidden words, claim check, length, child flag)
00:20  Claude Haiku 4.5 soft score 4 dimensions
00:25  Pick best + route by tier → log content_pipeline (status=needs_image|needs_video|needs_text_only)
       Tier 3 → Lark task immediately (cần quay thật)

00:10-06:50  Asset Generator polls every 10 min:
   ├─ Image (carousel/blog hero) → nano-banana Gemini 2.5 Flash Image → R2
   ├─ Video Tier 2 KOL AI children → Kling 2.1 (fal.ai) → R2
   ├─ Video cinematic → Veo 3 Vertex AI → GCS → R2
   ├─ Video Anh Dương avatar → HeyGen → R2
   └─ Voice-over → MiniMax TTS Vietnamese → R2

06:55  Review Dispatcher gửi Telegram:
   - 1 morning summary message (tổng kê)
   - 25 message kèm media preview + 3 nút [✅ Duyệt] [✏️ Sửa] [❌ Bỏ]
   - Throttle 3s/message (Telegram rate limit)

07:00+ Anh Dương mở Telegram, bấm duyệt — ~5-10 phút/post × 25 = 1.5-2 giờ
       Bấm Duyệt → Workflow 02 callback → Publer scheduled publish
       Bấm Sửa → status=editing, anh edit trong Airtable
       Bấm Bỏ → status=rejected (training data cho prompt tuần sau)

Mỗi 30 phút sau publish: Workflow 04 pull engagement 24h/72h + GHL attribution
```

---

## 📦 Files

| File | Vai trò | Trigger |
|------|---------|---------|
| `n8n/01-content-master.json` | **Daily 00:00** — ideate + score + route | Cron `0 0 * * *` |
| `n8n/02-approval-callback.json` | Telegram callback handler (Duyệt/Sửa/Bỏ) | Webhook |
| `n8n/03-insight-harvester.json` | Pull Google Trends + GHL + FB owned comments | Cron `0 */2 * * *` |
| `n8n/04-performance-tracker.json` | 24h/72h post engagement + GHL attribution | Cron `30 * * * *` |
| `n8n/05-asset-generator.json` | **Image + video generation** (Veo 3, Kling, HeyGen, nano-banana, MiniMax) | Cron `*/10 0-6 * * *` |
| `n8n/06-review-dispatcher.json` | **Telegram dispatch 06:55** — gửi 25 review messages | Cron `55 6 * * *` |
| `airtable/SCHEMA.md` | 4 tables: voice_cards, insights, content_pipeline, system_flags | — |
| `prompts/voice-card-template.md` | Template + ví dụ system prompt cho voice cards | — |
| `.env.example` | 18 credentials cần thiết | — |

---

## 🛠️ Tool Stack — Final (sau pass 2026-05-26)

### ✅ ĐANG DÙNG
| Tool | Vai trò | Cost/mo |
|------|---------|---------|
| **n8n** self-host | Orchestrator | $5-20 |
| **Claude Sonnet 4.6 (API)** | Ideate post | ~$50 |
| **Claude Haiku 4.5 (API)** | Soft score | ~$10 |
| **Claude.ai cowork** | Anh Dương viết blog longform + post quan trọng (manual UI) | trong Pro plan |
| **Veo 3** (Vertex AI) | Cinematic video 8s | ~$112 |
| **Kling 2.1** (fal.ai) | Cartoon character video 5s | ~$45 |
| **HeyGen** | CHỈ avatar Anh Dương (1 avatar duy nhất) | $89 |
| **MiniMax** | Voice clone TTS tiếng Việt | ~$15 |
| **nano-banana** (Gemini 2.5 Flash Image) | Image generation 200/ngày | ~$30 |
| **Cloudflare R2** | Asset storage (anh đã có sẵn) | $5 |
| **Airtable** | Database 4 tables | $300 |
| **Telegram Bot** | Approval UI | Free |
| **GHL** | CRM + chatbot built-in (đã có) | đã trả |
| **Lark** | Task cho ekip Tier 3 | Free |
| **Publer** | Publisher 25 kênh | $12 |

### ❌ ĐÃ BỎ
- ~~AIKTP~~ — risk E-E-A-T penalty. **Thay bằng Claude.ai cowork** (anh chốt: chất lượng cao hơn nhiều)
- ~~Botcake~~ — trùng GHL chatbot built-in
- ~~Minigo~~ — trùng n8n
- ~~Base44~~ — đã có Astro site
- ~~AutoVis.ai~~ — DIY bằng Veo 3 + Kling
- ~~Vuna.ai~~ — đổi sang Kling 2.1 fal.ai (API public stable)
- ~~ChatGPT image~~ — đổi sang nano-banana (rẻ hơn 60%)
- ~~Buffer~~ (suggested) — đổi sang Publer (rẻ hơn 10× cho 25 kênh)

### 📊 Xem visual stack: [`DIAGRAM.md`](./DIAGRAM.md)

---

## 🚀 Setup (3 giờ một buổi sáng)

### 1. Hạ tầng n8n (45 phút)
```bash
docker run -d --restart unless-stopped --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  --env-file /Users/manhduongnguyen/truongvietanh.com/automation/.env \
  n8nio/n8n:latest
```

### 2. Airtable (30 phút)
- Tạo base "VA Content Ops" → 4 tables theo `airtable/SCHEMA.md`
- Insert: `system_flags { flag_name: kill_switch, flag_value: off }`
- Personal Access Token + Base ID → `.env`

### 3. Credentials (60 phút) — điền 18 env vars trong `.env`:
- Anthropic, Airtable, Telegram, Publer
- Facebook Page, GHL, Lark
- **GCP** (Vertex AI Veo 3): tạo service account + activate Vertex AI API
- **Gemini** (nano-banana): https://ai.google.dev
- **fal.ai** (Kling): https://fal.ai
- **HeyGen** (chỉ avatar anh Dương): API key + avatar_id + voice_id
- **MiniMax** voice clone
- **Cloudflare R2** (anh đã có)

### 4. Voice Cards (45 phút)
Anh Dương viết 25 records trong `voice_cards` table:
- Template: `prompts/voice-card-template.md`
- Set `channel_tier`: 1 (Pages chính thức) / 2 (AI character) / 2.5 (thầy/cô thật) / 3 (cần quay)
- `audience_tags` phải match với `insights.audience_segment`

### 5. Import 6 workflows vào n8n (15 phút)
Workflows → Import from File → import theo thứ tự:
1. `03-insight-harvester.json` → Activate (chạy first để có insight data)
2. `01-content-master.json` → Test manual trước, activate khi OK
3. `05-asset-generator.json` → Activate
4. `06-review-dispatcher.json` → Activate
5. `02-approval-callback.json` → Activate (cần config Telegram bot credential trong n8n)
6. `04-performance-tracker.json` → Activate

### 6. Smoke test (30 phút)
- Insert 1 insight record manual với intent_level=5
- Run `01-content-master.json` manual
- Verify Airtable `content_pipeline` có record status=needs_image|needs_video
- Run `05-asset-generator.json` manual → verify media URL được tạo
- Run `06-review-dispatcher.json` manual → verify Telegram nhận message + buttons
- Bấm ✅ Duyệt → verify status=published trong Airtable

---

## 🛑 Kill Switch

**Khẩn cấp dừng pipeline:**
1. Airtable → `system_flags` → set `kill_switch.flag_value = "on"`
2. Cron 00:00 tiếp theo sẽ skip, Telegram báo "KILL SWITCH ACTIVE"
3. Bật lại: set về `"off"`

**Pause 1 kênh:**
- Airtable → `voice_cards` → uncheck `active` của card đó

**Pause 1 bài đã sẵn sàng:**
- Airtable → `content_pipeline` → đổi status sang `paused` thủ công trước 06:55

---

## 📊 KPI Đo Lường (Bắc Đẩu)

**KPI duy nhất:** Cost per Enrollment qua Content Channel (CPE-C)

Looker Studio dashboard kết nối 3 nguồn:
- Airtable `content_pipeline` — post performance (score, engagement, leads, enrollments)
- GHL — enrollment events theo utm_content
- Meta Insights — reach organic

Báo cáo tuần Thứ Hai 08:00 → anh Dương + 5 pod lead.

---

## 💰 Cost Estimate (tháng đầu)

| Item | Cost |
|------|------|
| Claude API (Sonnet ideate + Haiku score, ~30k tokens/ngày × 25 cards) | ~$60/mo |
| Gemini nano-banana (~200 ảnh/ngày × 30) | ~$30/mo |
| Veo 3 Vertex AI (~5 clip/ngày × 30 × $0.75) | ~$112/mo |
| Kling 2.1 fal.ai (~5 clip/ngày × 30 × $0.30) | ~$45/mo |
| HeyGen ($89 Creator plan) | $89/mo |
| MiniMax TTS (~30 voiceover/ngày × 30) | ~$15/mo |
| Cloudflare R2 (anh đã có) | ~$5/mo |
| Publer | $12/mo |
| Airtable (Team plan cho 15 user) | $300/mo |
| n8n self-host VPS (anh đã có Astro server) | $0 |
| Telegram, Lark, GHL | $0-already-paid |
| **Total tháng đầu** | **~$668/mo** |

Tương đương ~16 triệu VND/tháng cho 750 post/tháng × 25 kênh = **~22k VND/post automated**.
Anh tự đánh giá: nếu CPE-C giảm > 22k/enrollment so với baseline → ROI positive.

---

## ⚠️ Compliance Reminders

1. KOL AI character (Tier 2) phải disclose "AI" trong bio + hashtag `#AICharacter` mỗi post
2. Thầy/cô KOL (Tier 2.5) phải có hợp đồng KOL nội bộ ký trước khi đăng
3. KHÔNG có Tier 3 fake human persona — workflow đã gate
4. Mọi UTM về landing page có Privacy Policy update theo Nghị định 13/2023/NĐ-CP
