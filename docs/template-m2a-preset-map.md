# Template M2A Preset Map

## Muc tieu

28 route cu trong `/mau-template/*` duoc xem la **template spec**. Team content khong sua route Astro rieng nua, ma tao page trong Directus va lap block theo preset.

Preset da duoc seed vao collection `template_presets` bang script:

```bash
npm run directus:setup:m2a
```

Script nay dong thoi tao san:

- field Builder `pages.blocks`
- junction collection an `pages_blocks`
- page demo `mau-cms-m2a`

## Rule chung

- 1 page that = 1 item trong `pages`
- 1 builder field = `pages.blocks` hoac `pages.content_blocks`
- 1 block = 1 item trong mot collection `block_*`
- 1 template cu = 1 item trong `template_presets`

## Nhom Performance

- `class-a-fee-capture`: `block_hero`, `block_pricing_table`, `block_features`, `block_quote`, `block_form`, `block_faq`, `block_cta`
- `class-b-campus-tour`: `block_hero`, `block_text_with_image`, `block_gallery`, `block_features`, `block_form`, `block_faq`, `block_cta`
- `class-c-open-day`: `block_hero`, `block_features`, `block_gallery`, `block_form`, `block_faq`, `block_cta`
- `class-d-trial-class`: `block_hero`, `block_text_with_image`, `block_quote`, `block_features`, `block_form`, `block_faq`, `block_cta`
- `class-f-tiktok-ugc`: `block_hero`, `block_gallery`, `block_quote`, `block_features`, `block_cta`
- `class-enrollment-registration-form`: `block_hero`, `block_features`, `block_form`, `block_faq`, `block_cta`

## Nhom SEO / Authority

- `class-level-pillar`: `block_hero`, `block_stats`, `block_text_with_image`, `block_features`, `block_faq`, `block_links`, `block_cta`
- `class-curriculum-program-overview`: `block_hero`, `block_rich_text`, `block_features`, `block_stats`, `block_faq`, `block_cta`
- `class-master-campus-profile`: `block_hero`, `block_gallery`, `block_text_with_image`, `block_features`, `block_quote`, `block_links`, `block_cta`
- `class-virtual-tour-360`: `block_hero`, `block_gallery`, `block_text_with_image`, `block_features`, `block_cta`
- `class-local-intent`: `block_hero`, `block_rich_text`, `block_features`, `block_links`, `block_faq`, `block_cta`
- `class-parent-hub-article`: `block_hero`, `block_rich_text`, `block_links`, `block_faq`, `block_cta`

## Nhom Mid-funnel / Nurturing

- `class-comparison-engine`: `block_hero`, `block_features`, `block_stats`, `block_faq`, `block_cta`
- `class-ai-ready-faq`: `block_hero`, `block_faq`, `block_links`, `block_cta`
- `class-tuition-fee-structure`: `block_hero`, `block_pricing_table`, `block_features`, `block_faq`, `block_cta`
- `class-objection-handler`: `block_hero`, `block_quote`, `block_features`, `block_faq`, `block_cta`

## Nhom System / Utility

- `class-homepage`: `block_hero`, `block_stats`, `block_features`, `block_links`, `block_quote`, `block_cta`
- `class-contact-multiple-locations`: `block_hero`, `block_cards`, `block_form`, `block_links`, `block_cta`
- `class-dynamic-comparison`: `block_hero`, `block_features`, `block_stats`, `block_cta`
- `class-smart-thank-you`: `block_hero`, `block_features`, `block_links`, `block_cta`
- `class-retention-referral`: `block_hero`, `block_features`, `block_quote`, `block_form`, `block_cta`
- `class-corporate-brand-leadership`: `block_hero`, `block_rich_text`, `block_features`, `block_quote`, `block_cta`
- `class-teacher-faculty-profile`: `block_hero`, `block_cards`, `block_quote`, `block_links`, `block_cta`
- `class-alumni-success-stories`: `block_hero`, `block_quote`, `block_cards`, `block_links`, `block_cta`
- `class-talent-acquisition`: `block_hero`, `block_features`, `block_form`, `block_faq`, `block_cta`
- `class-news-events-hub-pr`: `block_hero`, `block_cards`, `block_links`, `block_cta`
- `class-legal-utility-info`: `block_hero`, `block_rich_text`, `block_links`, `block_cta`
- `class-other`: `block_hero`, `block_rich_text`, `block_cards`, `block_links`, `block_cta`

## Cach team content dung

1. Mo `template_presets` trong Directus.
2. Tim slug preset phu hop.
3. Tao 1 item moi trong `pages`.
4. Copy `slug`, `theme`, `page_type`, `CTA`, va `block_collections` tu preset.
5. Tao tung block trong cac collection `block_*`.
6. Gan vao Builder field `pages.blocks`.
7. Publish page.
