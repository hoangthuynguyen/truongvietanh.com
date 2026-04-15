# V2 Migration — CMS-First Architecture

## What's new

The v2 architecture replaces ~100 hand-coded `.astro` files in `src/pages/` with:
- **3 layouts** (`SiteLayout`, `FunnelLayout`, `BlankLayout`)
- **5 page templates** (pillar, landing, squeeze, thankyou, article)
- **27 composable blocks** driven from Directus CMS
- **1 dispatcher** (`src/pages/v2/[...slug].astro`) that renders any page from CMS data
- **79 new landing/squeeze pages** for products × campuses (seed data)

## File map

```
src/
  types/cms.ts                          — TypeScript contracts for all CMS collections
  layouts/v2/
    SiteLayout.astro                    — Full chrome (nav, footer, exit popup, mobile CTA)
    FunnelLayout.astro                  — Minimal chrome (logo + hotline only)
    BlankLayout.astro                   — No chrome (print/embed/auto-redirect)
  templates/
    PillarPageTemplate.astro            — SEO hub pages (uses SiteLayout)
    LandingPageTemplate.astro           — Mid-funnel landing (uses FunnelLayout)
    SqueezePageTemplate.astro           — High-intent conversion (uses FunnelLayout)
    ThankYouTemplate.astro              — Post-submit (uses SiteLayout w/ popup blocked)
    ArticleTemplate.astro               — Blog posts (uses SiteLayout)
  components/
    DynamicForm.astro                   — CMS-driven form (replaces LeadFormTwoStepEmailFirst)
    blocks/
      BlocksRenderer.astro              — Dispatches block instances to renderers
      {Block}.astro × 27                — One file per block type
  lib/cms.ts                            — Directus query layer with cache
  pages/v2/[...slug].astro              — Single dispatcher for ALL v2 pages

directus/
  snapshots/schema.json                 — Import into Directus to create all collections
  seed/
    campuses.json                       — 9 campuses
    forms.json                          — 6 form templates (by funnel type)
    funnels.json                        — 79 funnel definitions
    pages.json                          — 79 pages × ~7 blocks each (10,213 lines)

scripts/
  generate-pages-seed.ts                — Regenerate pages.json from funnels.json
  seed-directus.ts                      — Import all seed JSON into Directus
```

## Migration steps

### Phase 1 — Foundation (this PR)

Nothing ships to production. New files live alongside old ones.

- [x] Create `src/layouts/v2/`, `src/templates/`, `src/components/blocks/`, `src/types/cms.ts`
- [x] Write Directus schema snapshot + seed generator
- [x] Generate 79 landing/squeeze pages as seed data
- [x] Create `v2` dispatcher at `src/pages/v2/[...slug].astro`

### Phase 2 — Directus setup (next)

- [ ] Apply schema: `npx directus schema apply directus/snapshots/schema.json`
- [ ] Seed: `DIRECTUS_ADMIN_TOKEN=xxx node --import tsx scripts/seed-directus.ts`
- [ ] Verify: Marketing team opens Directus → sees 9 campuses, 79 funnels, 79 pages, 6 forms

### Phase 3 — Visual implementation

Most blocks are stubs right now (~30 lines each). Fill in visuals:

- [ ] `HeroPillar`, `HeroFunnel` — match current pillar page hero
- [ ] `TrustBar`, `TestimonialGrid`, `Stats`, `Cards`, `Features` — reuse current styling
- [ ] `UrgencyBar` with live countdown from `countdown_to` field
- [ ] `ComparisonTable` — responsive table with sticky first column
- [ ] `TimelineRoadmap` — horizontal on desktop, vertical on mobile
- [ ] `PricingTable` — 3-plan card layout with featured highlight

### Phase 4 — Client scripts

- [ ] `public/scripts/dynamic-form.js` — handles all form variants, wired to `window.__TVA_FORMS__`
- [ ] `public/scripts/site-interactions.js` — announcement close, exit popup, cookie consent, dark mode, back-to-top
- [ ] `public/scripts/funnel-interactions.js` — Turnstile loader, sticky CTA, countdown

### Phase 5 — API Worker v2

- [ ] Lead scoring (weight by form × funnel base × profile completeness × UTM quality)
- [ ] Idempotency key (`sha256(email + phone + page + hour)`) to dedupe
- [ ] Server-side UTM attribution (first-touch cookie + referrer fallback)
- [ ] Turnstile validation before fan-out
- [ ] Route hot leads (score ≥ 70) to `wf-sales-call-now` with Slack ping

### Phase 6 — Cutover

- [ ] Build v2 static site → deploy to `hoc.truongvietanh.com` (staging)
- [ ] Test 5 sample pages (1 per template)
- [ ] Run Lighthouse + axe on sample pages — target CLS < 0.05, LCP < 2s
- [ ] Redirect `src/pages/[...slug].astro` to v2 dispatcher
- [ ] Delete old pages in batches (squeeze → sub-funnels → pillar → blog)

### Phase 7 — A/B framework

- [ ] Migrate 10 `lop-6/*-a.astro`/`*-b.astro` to single page with `ab_test_ref`
- [ ] Implement GrowthBook SDK or custom variant resolver in dispatcher

## Seed data stats

| Collection | Records | Source |
|-----------|---------|--------|
| campuses | 9 | `campuses.json` |
| forms | 6 | `forms.json` (1 per funnel type) |
| funnels | 79 | `funnels.json` |
| pages | 79 | `pages.json` (generated) |
| page_blocks | ~553 | 79 pages × 7 blocks avg |
| block records | ~553 | Hero, Trust, Cards, Testimonials, CTA Form, FAQ, CTA Banner |

## Naming convention (enforced in seed)

Format: `{type}_{product}_{variant?}`

Examples:
- `lead_magnet_mn_ebook_7sai_lam`
- `trial_thcs_tham_quan`
- `direct_mn_early_bird`
- `campus_phu_nhuan_tour`

## Rolling back

Every step is additive. To roll back Phase 2-6:

```bash
# Remove v2 pages from Astro build
rm -rf src/pages/v2/

# Revert Directus (if needed)
# - Delete pages in Directus admin or run inverse seed
```

Old `/src/pages/*.astro` remains untouched throughout.
