# ASTRO COMPONENT SYSTEM — CODE-READY
## truongvietanh.com | Block-Based Architecture

---

# 1. CẤU TRÚC THƯ MỤC ASTRO

```text
src/
├── components/
│   ├── blocks/
│   │   ├── HeroMessageMatch.astro
│   │   ├── HeroPhilosophy.astro
│   │   ├── HeroCampusReal.astro
│   │   ├── HeroVideoBackground.astro
│   │   ├── HeroVideoVertical.astro
│   │   ├── PainPointHero.astro
│   │   ├── FeeSnapshotTable.astro
│   │   ├── TrustMetrics.astro
│   │   ├── FormShort.astro
│   │   ├── FormEventRegistration.astro
│   │   ├── FormTrialClass.astro
│   │   ├── FAQCompact.astro
│   │   ├── FAQAccordion.astro
│   │   ├── FAQTabbedAccordion.astro
│   │   ├── GoogleMapEmbed.astro
│   │   ├── CampusGalleryBlock.astro
│   │   ├── ReviewCarouselByCampus.astro
│   │   ├── TimelineBlock.astro
│   │   ├── CalendarBookingBlock.astro
│   │   ├── CurriculumHighlights.astro
│   │   ├── TeacherProfileBlock.astro
│   │   ├── InternalLinkHub.astro
│   │   ├── TOCBlock.astro
│   │   ├── RelatedPostsBlock.astro
│   │   ├── ThankYouMessage.astro
│   │   ├── NextStepBlocks.astro
│   │   ├── MiniGalleryBlock.astro
│   │   ├── ComparisonTable.astro
│   │   ├── ObjectionAccordionBlock.astro
│   │   ├── StatsCounterBlock.astro
│   │   ├── NewsEventsCarousel.astro
│   │   ├── QuickFilterBlock.astro
│   │   ├── CallNowSticky.astro
│   │   └── FloatingZaloCTASticky.astro
│   ├── ui/
│   │   ├── Button.astro
│   │   ├── Card.astro
│   │   ├── Badge.astro
│   │   └── Container.astro
│   └── global/
│       ├── Header.astro
│       ├── Footer.astro
│       ├── Breadcrumb.astro
│       ├── MobileBottomBar.astro
│       └── SEOHead.astro
├── layouts/
│   ├── DefaultLayout.astro       ← menu + footer đầy đủ (brand/pillar/blog)
│   ├── FullSEOLayout.astro       ← breadcrumb + schema + structured data
│   ├── PerformanceLayout.astro   ← menu tối giản/ẩn (Class A/B/C/D)
│   └── MobileOnlyLayout.astro    ← TikTok/Reels (Class F)
├── lib/
│   ├── directus.ts               ← SDK client
│   ├── blockRenderer.ts          ← block code → component mapping
│   ├── seo.ts                    ← SEO helpers (meta, schema, canonical)
│   └── tracking.ts               ← GA4 / pixel event helpers
├── pages/
│   ├── index.astro               ← Homepage
│   ├── [...slug].astro           ← Dynamic catch-all (pages collection)
│   ├── co-so/
│   │   └── [slug].astro          ← Campus pages
│   ├── tuyen-sinh/
│   │   └── [slug].astro          ← Landing pages
│   ├── blog/
│   │   ├── index.astro
│   │   └── [slug].astro
│   ├── phu-huynh/
│   │   └── [slug].astro
│   └── hoc-phi/
│       └── [slug].astro
└── styles/
    ├── global.css
    ├── blocks.css
    └── utilities.css
```

---

# 2. NGUYÊN TẮC COMPONENT

1. **Nhận `props`** — mọi data qua props, không fetch riêng
2. **Có fallback** — không crash khi data thiếu
3. **Bật/tắt được** — `is_enabled` từ Directus
4. **Đổi variant** — cùng block, nhiều style
5. **Không phụ thuộc cứng** — 1 block dùng 5-10 page

---

# 3. COMPONENT PROPS CHI TIẾT

## HeroMessageMatch

```ts
interface Props {
  headline: string;
  subheadline: string;
  trustMini?: string;
  backgroundImage?: string;
  showForm?: boolean;
  campusName?: string;
  levelName?: string;
}
```

## FeeSnapshotTable

```ts
interface FeeRow {
  level: string;
  program: string;
  feeFrom: string;
  note?: string;
}

interface Props {
  title: string;
  rows: FeeRow[];
  noteText?: string;
}
```

## FormShort

```ts
interface Props {
  title: string;
  submitLabel: string;
  campusId?: string;
  levelId?: string;
  offerType?: string;
  ghlWorkflowId?: string;
  showConsent?: boolean;
  redirectUrl?: string;
}
```

## TrustMetrics

```ts
interface Props {
  reviewsCount?: number;
  rating?: number;
  parentsTrusted?: number;
  testimonialItems?: { name: string; text: string; rating: number }[];
}
```

## HeroCampusReal

```ts
interface Props {
  headline: string;
  subheadline?: string;
  campusImage: string;
  campusVideo?: string;
  address: string;
  hotline: string;
}
```

## GoogleMapEmbed

```ts
interface Props {
  embedCode: string;
  mapUrl: string;
  buttonLabel?: string;
}
```

## CalendarBookingBlock

```ts
interface Props {
  title: string;
  availableSlots?: { date: string; time: string; available: boolean }[];
  campusId?: string;
  submitLabel?: string;
}
```

## ReviewCarouselByCampus

```ts
interface Props {
  reviews: { name: string; text: string; rating: number; source?: string; video?: string }[];
  title?: string;
  showRating?: boolean;
  showSource?: boolean;
}
```

## CurriculumHighlights

```ts
interface Props {
  title?: string;
  items: { icon?: string; title: string; description: string }[];
  outcomes?: string[];
}
```

## FAQCompact / FAQAccordion

```ts
interface Props {
  title?: string;
  faqItems: { question: string; answer: string }[];
  columns?: number; // FAQCompact: 1 or 2 columns
}
```

## FAQTabbedAccordion

```ts
interface Props {
  tabs: { label: string; items: { question: string; answer: string }[] }[];
  ctaLabel?: string;
  ctaUrl?: string;
}
```

## ComparisonTable

```ts
interface Props {
  title?: string;
  columns: string[];
  rows: { feature: string; values: string[] }[];
  highlightColumn?: number;
}
```

## ObjectionAccordionBlock

```ts
interface Props {
  title?: string;
  items: { concern: string; answer: string; proof?: string }[];
  ctaLabel?: string;
  hotline?: string;
  zaloUrl?: string;
}
```

## ThankYouMessage

```ts
interface Props {
  title: string;
  message: string;
  dynamicCampusName?: string;
  dynamicLevelName?: string;
}
```

## QuickFilterBlock

```ts
interface Props {
  levels: { code: string; name: string }[];
  campuses: { slug: string; name: string }[];
  redirectBasePath: string; // e.g. "/tuyen-sinh"
}
```

## HeroVideoVertical (TikTok)

```ts
interface Props {
  videoUrl: string;
  hookText: string;
  subText?: string;
  zaloUrl?: string;
  hotline?: string;
}
```

## StatsCounterBlock

```ts
interface Props {
  items: { value: number; suffix?: string; label: string }[];
}
```

---

# 4. BLOCK RENDERER

```ts
// src/lib/blockRenderer.ts

const blockComponentMap: Record<string, any> = {
  hero_message_match:        () => import('../components/blocks/HeroMessageMatch.astro'),
  hero_philosophy:            () => import('../components/blocks/HeroPhilosophy.astro'),
  hero_campus_real:           () => import('../components/blocks/HeroCampusReal.astro'),
  hero_video_background:      () => import('../components/blocks/HeroVideoBackground.astro'),
  hero_video_vertical:        () => import('../components/blocks/HeroVideoVertical.astro'),
  pain_point_hero:            () => import('../components/blocks/PainPointHero.astro'),
  fee_snapshot_table:         () => import('../components/blocks/FeeSnapshotTable.astro'),
  trust_metrics:              () => import('../components/blocks/TrustMetrics.astro'),
  form_short:                 () => import('../components/blocks/FormShort.astro'),
  form_event_registration:    () => import('../components/blocks/FormEventRegistration.astro'),
  form_trial_class:           () => import('../components/blocks/FormTrialClass.astro'),
  faq_compact:                () => import('../components/blocks/FAQCompact.astro'),
  faq_accordion:              () => import('../components/blocks/FAQAccordion.astro'),
  faq_tabbed_accordion:       () => import('../components/blocks/FAQTabbedAccordion.astro'),
  google_map_embed:           () => import('../components/blocks/GoogleMapEmbed.astro'),
  campus_gallery_block:       () => import('../components/blocks/CampusGalleryBlock.astro'),
  review_carousel_by_campus:  () => import('../components/blocks/ReviewCarouselByCampus.astro'),
  timeline_block:             () => import('../components/blocks/TimelineBlock.astro'),
  calendar_booking_block:     () => import('../components/blocks/CalendarBookingBlock.astro'),
  curriculum_highlights:      () => import('../components/blocks/CurriculumHighlights.astro'),
  teacher_profile_block:      () => import('../components/blocks/TeacherProfileBlock.astro'),
  internal_link_hub:          () => import('../components/blocks/InternalLinkHub.astro'),
  toc_block:                  () => import('../components/blocks/TOCBlock.astro'),
  related_posts_block:        () => import('../components/blocks/RelatedPostsBlock.astro'),
  thank_you_message:          () => import('../components/blocks/ThankYouMessage.astro'),
  next_step_blocks:           () => import('../components/blocks/NextStepBlocks.astro'),
  comparison_table:           () => import('../components/blocks/ComparisonTable.astro'),
  objection_accordion_block:  () => import('../components/blocks/ObjectionAccordionBlock.astro'),
  stats_counter_block:        () => import('../components/blocks/StatsCounterBlock.astro'),
  quick_filter_block:         () => import('../components/blocks/QuickFilterBlock.astro'),
};

export function getBlockComponent(code: string) {
  return blockComponentMap[code] ?? null;
}
```

---

# 5. LAYOUT MODES

| Layout | Menu | Footer | Breadcrumb | Schema | Dùng cho |
|---|---|---|---|---|---|
| `DefaultLayout` | Full | Full | ✓ | Basic | Brand, About |
| `FullSEOLayout` | Full | Full | ✓ | Rich | Pillar, Campus, Blog, FAQ |
| `PerformanceLayout` | Minimal/Hidden | Minimal | ✗ | Minimal | Class A/B/C/D Landing |
| `MobileOnlyLayout` | Hidden | Hidden | ✗ | Minimal | Class F TikTok |

---

# 6. SEO HELPERS

```ts
// src/lib/seo.ts

export function generateMeta(page: any) {
  return {
    title: page.seo_title || page.title,
    description: page.meta_description,
    canonical: page.canonical_url || page.full_path,
    ogTitle: page.og_title || page.seo_title,
    ogDescription: page.og_description || page.meta_description,
    ogImage: page.og_image,
  };
}

export function generateSchema(page: any) {
  const schemas: Record<string, any> = {
    EducationalOrganization: { /* ... */ },
    Article: { /* ... */ },
    FAQPage: { /* ... */ },
    Course: { /* ... */ },
    Event: { /* ... */ },
    Review: { /* ... */ },
  };
  return schemas[page.schema_type] || null;
}

export function generateBreadcrumb(page: any) {
  // Build BreadcrumbList schema from page.full_path
}
```

---

# KẾT LUẬN

Hệ thống này cho phép:
- **16 Template Classes** điều khiển layout + behavior
- **~30 Blocks** reusable across 500+ pages
- **Directus** quản lý 100% content + SEO + CRO data
- **Astro** render static HTML < 500ms TTFB
- Scale từ 50 → 500+ pages **không vỡ layout**
