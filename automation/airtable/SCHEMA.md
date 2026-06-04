# Airtable Schema — VA Content Automation

Base name: **VA Content Ops**
Sau khi tạo base, copy `AIRTABLE_BASE_ID` vào `.env`.

---

## Table 1: `voice_cards`

| Field | Type | Notes |
|-------|------|-------|
| channel_name | Single line text | "VA Mẹ Bỉm Sữa", "Bé Linh VA Kids"... |
| channel_tier | Single select | `1`, `2`, `2.5`, `3` |
| platforms | Multiple select | `facebook`, `tiktok`, `instagram`, `threads`, `youtube`, `zalo` |
| audience | Long text | Mô tả audience |
| audience_tags | Multiple select | Match với insights.audience_segment (`parent_0-6`, `parent_6-12`, `parent_13-18`, `teacher`, `student`...) |
| voice_archetype | Long text | 1-2 dòng character |
| tone_words | Multiple select | `ấm áp`, `vui`, `nghiêm túc`, `truyền cảm hứng`... |
| forbidden_words | Long text | Comma-separated: `tốt nhất, số 1, cam kết 100%` |
| topic_pillars | Long text | "40% pain point, 30% tips, 20% sản phẩm, 10% BTS" |
| format_mix | Long text | "carousel 50%, reel 30%, text 20%" |
| posting_rhythm | Single line text | "1/day at 09:00" |
| cta_pattern | Long text | "Tham gia nhóm Zalo VA Mẹ Bỉm" |
| cta_url | URL | Link gốc của CTA (UTM sẽ append tự động) |
| system_prompt | Long text | **Full system prompt cho Claude** — load từ `/automation/prompts/{slug}.md` |
| buffer_profile_id | Single line text | ID profile trong Buffer cho auto-publish |
| telegram_chat_id | Single line text | Chat ID Telegram cho approval (anh Dương / thầy/cô) |
| owner_pod | Single select | `Pod-Adult-A`, `Pod-Adult-B`, `Pod-Kids`, `Pod-Teen`, `Pod-Ops` |
| verified_claims_only | Checkbox | Default ON. Khi ON, reject mọi numeric claim |
| active | Checkbox | Default ON. Tắt để pause kênh tạm thời |

---

## Table 2: `insights`

| Field | Type | Notes |
|-------|------|-------|
| date | Date with time | UTC ISO |
| source | Single select | `buzzmetrics`, `google_trends`, `ghl_form`, `owned_comments`, `manual` |
| raw_text | Long text | Nội dung insight |
| topic_tag | Multiple select | `trending`, `fb_comment`, `parent_interest`, `pain_point`... |
| audience_segment | Multiple select | Match với voice_cards.audience_tags |
| intent_level | Number (integer) | 1-5, càng cao càng gần buying intent |
| used_in_post | Link to `content_pipeline` | Auto-fill khi insight được dùng |

---

## Table 3: `content_pipeline`

| Field | Type | Notes |
|-------|------|-------|
| created_at | Date with time | |
| voice_card | Link to `voice_cards` | |
| insight_source | Link to `insights` | |
| generated_title | Single line text | |
| generated_body | Long text | |
| format | Single select | `carousel`, `reel`, `text`, `blog` |
| hashtags | Long text | Space-separated |
| hard_rules_passed | Checkbox | |
| score_brand_fit | Number | 0-5 |
| score_insight_depth | Number | 0-5 |
| score_conversion | Number | 0-5 |
| score_education | Number | 0-5 |
| score_total | Number | 0-20 |
| tier_routed | Single select | `tier1_auto_publish`, `tier2_human_review`, `tier2.5_teacher_approval`, `tier3_ekip_task` |
| status | Single select | `pending_review`, `editing`, `approved`, `rejected`, `published`, `failed` |
| approved_by | Single line text | |
| reviewed_by | Single line text | |
| rejected_at | Date with time | |
| published_at | Date with time | |
| platform_post_id | Single line text | ID FB/TikTok post sau khi publish |
| utm_campaign | Single line text | |
| utm_content | Single line text | Unique key, dùng để callback từ Telegram |
| engagement_24h | Long text | JSON: `{impressions, engaged_users, reactions, clicks}` |
| engagement_72h | Long text | JSON |
| ghl_leads_attributed | Number | |
| enrollments_attributed | Number | |

---

## Table 4: `system_flags`

| Field | Type | Notes |
|-------|------|-------|
| flag_name | Single line text | `kill_switch` |
| flag_value | Single line text | `on` / `off` |
| updated_at | Date with time | |
| updated_by | Single line text | |

**Khởi tạo bắt buộc:** Tạo 1 record `flag_name=kill_switch, flag_value=off` ngay sau khi tạo table này.

---

## Quick Setup Checklist

- [ ] Tạo base "VA Content Ops" trên airtable.com
- [ ] Copy 4 tables theo schema trên (tự tạo manual hoặc dùng Airtable CSV import)
- [ ] Tạo 1 record trong `system_flags`: `flag_name=kill_switch`, `flag_value=off`
- [ ] Tạo Personal Access Token tại https://airtable.com/create/tokens (scopes: `data.records:read`, `data.records:write`, `schema.bases:read`)
- [ ] Copy `BASE_ID` (https://airtable.com/{BASE_ID}/...) và token vào `.env`
- [ ] Tạo 25 voice_cards records (1/kênh) — dùng template `/automation/prompts/voice-card-template.md`
