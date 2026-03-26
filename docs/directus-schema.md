# DIRECTUS SCHEMA — PRODUCTION-READY
## truongvietanh.com | Block-Based CMS Architecture

---

# 1. COLLECTIONS TỔNG THỂ

## Nhóm Lõi (Content)
- `template_classes` — 16 template classes
- `pages` — brand, pillar, campus, blog, FAQ hub
- `landing_pages` — performance + ads landing
- `blocks` — thư viện block hệ thống
- `block_instances` — block instance theo page (sort order + props)

## Nhóm Entity
- `campuses` — cơ sở
- `levels` — cấp học
- `offers` — học bổng, ưu đãi, campaign
- `events` — open day, assessment day, summer camp
- `reviews` — đánh giá phụ huynh
- `faq_items` — câu hỏi thường gặp
- `teachers` — giáo viên
- `authors` — tác giả blog

## Nhóm Growth / Ads / CRM
- `campaigns` — chiến dịch ads
- `ad_creatives_library` — thư viện creative
- `comparison_sets` — bảng so sánh
- `objection_sets` — xử lý rào cản
- `thank_you_flows` — luồng sau chuyển đổi
- `ghl_workflows` — GHL CRM triggers

## Nhóm System
- `site_settings` — cấu hình chung
- `menus` — cấu trúc menu
- `redirects` — 301/410 redirect rules
- `seo_aliases` — URL aliases
- `media_assets` — quản lý media

---

# 2. CHI TIẾT COLLECTIONS

---

## `template_classes`

| Field | Type | Ví dụ |
|---|---|---|
| `id` | uuid | — |
| `code` | string | `class_a_fee_capture` |
| `name` | string | `Class A – Fee Capture Landing` |
| `group` | enum | `performance`, `seo_pillar`, `mid_funnel`, `system` |
| `description` | text | — |
| `primary_goal` | enum | `lead_capture`, `tour_booking`, `seo_authority` |
| `traffic_source` | enum | `google_search`, `meta`, `tiktok`, `organic` |
| `expected_cvr_min` | float | 12 |
| `expected_cvr_max` | float | 18 |
| `has_main_menu` | boolean | false |
| `has_footer` | boolean | false |
| `is_mobile_first` | boolean | false |
| `status` | enum | `active`, `draft` |

---

## `pages`

| Field | Type | Mô tả |
|---|---|---|
| `id` | uuid | — |
| `title` | string | Tiêu đề trang |
| `slug` | string | URL slug |
| `full_path` | string | `/mam-non` |
| `page_type` | enum | `homepage`, `pillar`, `campus`, `blog`, `faq_hub`, `brand`, `parent_hub` |
| `template_class_id` | m2o | → `template_classes` |
| `status` | enum | `draft`, `review`, `published`, `archived` |
| `campus_id` | m2o (nullable) | → `campuses` |
| `level_id` | m2o (nullable) | → `levels` |
| `author_id` | m2o (nullable) | → `authors` |
| `hero_headline` | string | — |
| `hero_subheadline` | string | — |
| `summary` | text | — |
| `primary_cta_label` | string | — |
| `primary_cta_url` | string | — |
| `secondary_cta_label` | string | — |
| `secondary_cta_url` | string | — |
| **SEO Fields** | | |
| `seo_title` | string | 50-60 chars |
| `meta_description` | string | 140-155 chars |
| `canonical_url` | string | — |
| `og_title` | string | — |
| `og_description` | string | — |
| `og_image` | file | 1200x630 |
| `schema_type` | enum | `EducationalOrganization`, `Article`, `FAQPage`, `Course` |
| `primary_keyword` | string | — |
| `secondary_keywords` | json | — |
| `intent` | enum | `informational`, `commercial`, `transactional` |
| `funnel_stage` | enum | `tofu`, `mofu`, `bofu` |
| `published_at` | datetime | — |

---

## `landing_pages`

Collection **quan trọng nhất** — điều khiển toàn bộ growth pages.

| Field | Type | Mô tả |
|---|---|---|
| `id` | uuid | — |
| `title` | string | — |
| `slug` | string | — |
| `full_path` | string | `/tuyen-sinh/hoc-phi-mam-non-go-vap` |
| `template_class_id` | m2o | → `template_classes` |
| `status` | enum | `draft`, `review`, `published`, `archived` |
| **Business Mapping** | | |
| `campus_id` | m2o | → `campuses` |
| `level_id` | m2o | → `levels` |
| `offer_id` | m2o (nullable) | → `offers` |
| `event_id` | m2o (nullable) | → `events` |
| `campaign_id` | m2o (nullable) | → `campaigns` |
| **SEO / Intent** | | |
| `primary_keyword` | string | — |
| `secondary_keywords` | json | — |
| `intent` | enum | — |
| `funnel_stage` | enum | — |
| `search_angle` | string | — |
| `seo_title` | string | — |
| `meta_description` | string | — |
| `canonical_url` | string | — |
| `schema_type` | enum | — |
| `quick_answer` | text | — |
| **Paid / CRO** | | |
| `ad_platform` | enum | `google`, `meta`, `tiktok`, `zalo` |
| `ad_headline` | string | — |
| `ad_subheadline` | string | — |
| `offer_type` | string | — |
| `ab_test_variant` | string | — |
| `variant_group` | string | — |
| `tracking_id` | string | — |
| `fb_capi_event` | string | — |
| `tiktok_pixel_event` | string | — |
| `zalo_oa_follow_up_flow_id` | string | — |
| `ghl_workflow_id` | string | — |
| `noindex_for_paid` | boolean | — |
| **Conversion** | | |
| `conversion_goal` | enum | `fee_download`, `tour_booking`, `event_registration`, `trial_booking`, `call`, `zalo_click` |
| `primary_cta_label` | string | — |
| `primary_cta_type` | enum | `form`, `call`, `zalo`, `calendar` |
| `primary_cta_url` | string | — |
| `form_type` | enum | `short`, `event`, `trial`, `referral` |
| `thank_you_flow_id` | m2o | → `thank_you_flows` |
| `hotline_override` | string | — |
| `zalo_url_override` | string | — |
| **Revenue / Ops** | | |
| `lead_quality_score` | integer | — |
| `estimated_ltv` | float | — |
| `cac_target` | float | — |
| `priority` | enum | `critical`, `high`, `medium`, `low` |
| `refresh_due_at` | date | — |

---

## `campuses`

| Field | Type |
|---|---|
| `id` | uuid |
| `name` | string |
| `short_name` | string |
| `slug` | string |
| `brand_display_name` | string |
| `address_line` | string |
| `ward` | string |
| `city_province` | string |
| `latitude` | float |
| `longitude` | float |
| `google_map_embed_code` | text |
| `google_map_url` | string |
| `hotline` | string |
| `zalo_phone` | string |
| `hero_image` | file |
| `hero_video` | file |
| `gallery_images` | o2m (media) |
| `campus_intro` | text |
| `campus_features` | json (repeater) |
| `service_areas` | json |
| `google_review_rating` | float |
| `google_review_count` | integer |
| `active_levels` | m2m → `levels` |
| `active_offers` | m2m → `offers` |
| `local_schema_payload` | json |
| `status` | enum |

---

## `levels`

| Field | Type | Ví dụ |
|---|---|---|
| `id` | uuid | — |
| `code` | string | `mam-non` |
| `name` | string | `Mầm Non` |
| `slug` | string | `mam-non` |
| `age_range` | string | `18 tháng – 5 tuổi` |
| `positioning_statement` | text | — |
| `hero_philosophy` | text | — |
| `curriculum_summary` | text | — |
| `outcomes_summary` | text | — |

---

## `reviews`

| Field | Type |
|---|---|
| `id` | uuid |
| `campus_id` | m2o → `campuses` |
| `level_id` | m2o (nullable) |
| `parent_name_display` | string |
| `review_source` | enum: `google`, `facebook`, `zalo`, `internal` |
| `rating` | integer (1-5) |
| `headline` | string |
| `review_text` | text |
| `child_level` | string |
| `consent_to_publish` | boolean |
| `avatar_image` | file |
| `video_url` | string |
| `featured` | boolean |

---

## `offers`

| Field | Type |
|---|---|
| `id` | uuid |
| `name` | string |
| `slug` | string |
| `offer_type` | enum: `hoc-phi`, `hoc-bong`, `open-day`, `trial-class`, `summer-camp` |
| `headline` | string |
| `description` | text |
| `start_date` | date |
| `end_date` | date |
| `campus_scope` | m2m → `campuses` |
| `level_scope` | m2m → `levels` |
| `countdown_enabled` | boolean |

---

## `events`

| Field | Type |
|---|---|
| `id` | uuid |
| `name` | string |
| `slug` | string |
| `event_type` | enum: `open_day`, `assessment_day`, `summer_camp`, `trial_class` |
| `campus_id` | m2o |
| `level_id` | m2o |
| `event_date` | datetime |
| `event_end_date` | datetime |
| `schedule_items` | json |
| `registration_limit` | integer |
| `countdown_enabled` | boolean |

---

## `faq_items`

| Field | Type |
|---|---|
| `id` | uuid |
| `question` | string |
| `answer` | text |
| `faq_category` | string |
| `campus_id` | m2o (nullable) |
| `level_id` | m2o (nullable) |
| `sort_order` | integer |
| `featured` | boolean |

---

## `blocks` (Library)

| Field | Type | Ví dụ |
|---|---|---|
| `id` | uuid | — |
| `code` | string | `hero_message_match` |
| `name` | string | `Hero Message Match` |
| `category` | enum | `hero`, `conversion`, `trust`, `content`, `nav`, `system` |
| `component_name` | string | `HeroMessageMatch` |
| `is_reusable` | boolean | true |

---

## `block_instances` (Per-page block ordering + data)

| Field | Type | Mô tả |
|---|---|---|
| `id` | uuid | — |
| `page_id` | m2o (nullable) | → `pages` |
| `landing_page_id` | m2o (nullable) | → `landing_pages` |
| `block_id` | m2o | → `blocks` |
| `sort_order` | integer | Thứ tự hiển thị |
| `variant` | string | Biến thể block |
| `is_enabled` | boolean | Bật/tắt block |
| `props_json` | json | Data tùy biến |

**Ví dụ `props_json`:**
```json
{
  "headline": "Học phí Mầm Non Việt Anh Gò Vấp chỉ từ 7 triệu/tháng",
  "subheadline": "Nhận bảng học phí chi tiết 2026–2027",
  "show_form": true,
  "campus_name": "Mầm non Gò Vấp"
}
```

---

## `campaigns`

| Field | Type |
|---|---|
| `id` | uuid |
| `name` | string |
| `campaign_code` | string |
| `platform` | enum: `google`, `meta`, `tiktok`, `zalo` |
| `utm_source` | string |
| `utm_medium` | string |
| `utm_campaign` | string |
| `landing_page_id` | m2o |
| `budget` | float |
| `start_date` | date |
| `end_date` | date |

---

## `thank_you_flows`

| Field | Type |
|---|---|
| `id` | uuid |
| `name` | string |
| `thank_you_message` | text |
| `next_step_items` | json |
| `video_url` | string |
| `pixel_event_name` | string |
| `ghl_trigger_tag` | string |

---

# 3. QUAN HỆ DỮ LIỆU CHÍNH

```
pages ← m2o → template_classes
pages ← m2o → campuses (nullable)
pages ← m2o → levels (nullable)
pages ← o2m → block_instances

landing_pages ← m2o → template_classes
landing_pages ← m2o → campuses
landing_pages ← m2o → levels
landing_pages ← m2o → offers (nullable)
landing_pages ← m2o → events (nullable)
landing_pages ← o2m → block_instances
landing_pages ← m2o → thank_you_flows

campuses ← m2m → levels (active_levels)
campuses ← m2m → offers (active_offers)
campuses ← o2m → reviews
campuses ← o2m → teachers

block_instances ← m2o → blocks
block_instances ← m2o → pages (nullable)
block_instances ← m2o → landing_pages (nullable)
```
