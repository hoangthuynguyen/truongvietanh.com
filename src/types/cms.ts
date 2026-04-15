/**
 * CMS Types — Directus schema contracts for pages, blocks, forms, funnels.
 * Matches the Directus collections defined in directus/snapshots/schema.json.
 */

// ============================================================
// PAGE
// ============================================================

export type PageTemplate = 'pillar' | 'landing' | 'squeeze' | 'thankyou' | 'article';
export type LayoutOverride = 'site' | 'funnel' | 'blank' | null;
export type PublishStatus = 'published' | 'draft' | 'archived';

export interface Page {
  id: string;
  status: PublishStatus;
  slug: string;                       // e.g. "tuyen-sinh/mam-non/checklist"
  template: PageTemplate;
  layout_override: LayoutOverride;
  title: string;
  meta_description: string;
  meta_keywords: string;
  og_image?: string;
  canonical_url?: string;
  noindex: boolean;
  robots?: string;
  structured_data?: Record<string, unknown> | Array<Record<string, unknown>>;
  funnel_ref?: string;                // FK → funnels.code
  ab_test_ref?: string;               // FK → ab_tests.id
  campus_ref?: string;                // FK → campuses.slug (cho landing theo cơ sở)
  product_ref?: ProductCode;          // Cho landing theo sản phẩm
  blocks: BlockInstance[];
  published_at?: string;
  updated_at?: string;
  author?: string;
}

// ============================================================
// BLOCKS — M2A junction
// ============================================================

export type BlockCollection =
  // Structural
  | 'block_section_header' | 'block_two_column' | 'block_spacer'
  // Heroes
  | 'block_hero_pillar' | 'block_hero_funnel' | 'block_hero_squeeze' | 'block_article_header'
  // Content
  | 'block_rich_text' | 'block_text_with_image' | 'block_cards' | 'block_features'
  | 'block_stats' | 'block_timeline_roadmap' | 'block_comparison_table'
  | 'block_gallery' | 'block_video_embed'
  // Social proof
  | 'block_testimonial_grid' | 'block_trust_bar' | 'block_aggregate_rating'
  // Conversion
  | 'block_cta_form' | 'block_cta_banner' | 'block_urgency_bar'
  | 'block_pricing_table' | 'block_next_steps'
  // Special
  | 'block_faq' | 'block_author_bio' | 'block_related_articles';

export interface BlockInstance {
  id: string;
  collection: BlockCollection;
  item: Block;                        // Full block data joined from target collection
  sort: number;
}

// ============================================================
// BLOCK CONTRACTS — each CMS collection maps to one interface
// ============================================================

interface BaseBlock { id: string; }

export interface BlockSectionHeader extends BaseBlock {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment: 'left' | 'center' | 'right';
}

export interface BlockTwoColumn extends BaseBlock {
  left_blocks: BlockInstance[];
  right_blocks: BlockInstance[];
  ratio: '50-50' | '60-40' | '70-30' | '40-60' | '30-70';
  reverse_on_mobile?: boolean;
}

export interface BlockSpacer extends BaseBlock {
  height: 'sm' | 'md' | 'lg' | 'xl';
}

export interface BlockHeroPillar extends BaseBlock {
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  rating?: { score: number; count: number };
  badges: Array<{ value: string; label: string }>;
  form_ref?: string;                  // FK → forms.id
  last_updated?: string;
  bg_image?: string;
}

export interface BlockHeroFunnel extends BaseBlock {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  form_ref?: string;
  bg_image?: string;
  overlay_opacity: number;            // 0..1
  urgency_text?: string;
}

export interface BlockHeroSqueeze extends BaseBlock {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  urgency_text?: string;
  form_ref: string;
  crest_icon?: string;
  bg_variant: 'navy' | 'gradient-accent' | 'solid-light';
}

export interface BlockArticleHeader extends BaseBlock {
  title: string;
  subtitle?: string;
  cover_image?: string;
  author_ref?: string;
  publish_date: string;
  read_time_minutes: number;
  category?: string;
}

export interface BlockRichText extends BaseBlock {
  eyebrow?: string;
  title?: string;
  content: string;                    // HTML (sanitized server-side)
}

export interface BlockTextWithImage extends BaseBlock {
  eyebrow?: string;
  title: string;
  body: string;                       // HTML
  image: string;
  image_position: 'left' | 'right';
  primary_cta?: CtaLink;
}

export interface BlockCards extends BaseBlock {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: Array<{ icon?: string; title: string; body: string; link?: CtaLink }>;
  columns: 2 | 3 | 4;
}

export interface BlockFeatures extends BaseBlock {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: Array<{ icon: string; title: string; body: string }>;
  layout: 'grid' | 'list';
}

export interface BlockStats extends BaseBlock {
  eyebrow?: string;
  title?: string;
  items: Array<{ value: string; label: string; note?: string }>;
}

export interface BlockTimelineRoadmap extends BaseBlock {
  eyebrow?: string;
  title?: string;
  items: Array<{ step: string; title: string; description: string; icon?: string }>;
}

export interface BlockComparisonTable extends BaseBlock {
  title?: string;
  columns: string[];
  rows: Array<{ cells: string[] }>;
  highlight_column?: number;
}

export interface BlockGallery extends BaseBlock {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: Array<{ image: string; caption?: string; alt: string }>;
}

export interface BlockVideoEmbed extends BaseBlock {
  provider: 'youtube' | 'vimeo' | 'mp4';
  video_id: string;                   // youtube id or full url for mp4
  aspect_ratio: '16-9' | '4-3' | '1-1';
  title?: string;
  caption?: string;
}

export interface BlockTestimonialGrid extends BaseBlock {
  eyebrow?: string;
  title?: string;
  school_level_filter?: SchoolLevel;
  limit: number;
  testimonial_refs?: string[];        // Manual selection (overrides filter)
}

export interface BlockTrustBar extends BaseBlock {
  items: Array<{ icon?: string; value: string; label: string }>;
  variant: 'light' | 'dark' | 'gradient';
}

export interface BlockAggregateRating extends BaseBlock {
  score: number;
  review_count: number;
  source: 'google' | 'facebook' | 'internal';
  label?: string;
}

export interface BlockCtaForm extends BaseBlock {
  form_ref: string;
  heading?: string;
  subheading?: string;
  variant: 'card' | 'inline' | 'banner';
  bg_style?: 'light' | 'dark' | 'gradient';
}

export interface BlockCtaBanner extends BaseBlock {
  eyebrow?: string;
  title: string;
  body?: string;
  primary_cta: CtaLink;
  secondary_cta?: CtaLink;
  bg_color?: string;
}

export interface BlockUrgencyBar extends BaseBlock {
  text: string;
  countdown_to?: string;              // ISO date; renders live countdown
  style: 'pulsing' | 'static';
}

export interface BlockPricingTable extends BaseBlock {
  eyebrow?: string;
  title?: string;
  plans: Array<{
    name: string;
    price: string;
    price_note?: string;
    features: string[];
    cta: CtaLink;
    featured?: boolean;
  }>;
}

export interface BlockNextSteps extends BaseBlock {
  title?: string;
  items: Array<{ icon?: string; title: string; description?: string; link?: CtaLink }>;
}

export interface BlockFaq extends BaseBlock {
  eyebrow?: string;
  title?: string;
  items: Array<{ question: string; answer: string }>;
  emit_schema: boolean;               // auto-generate FAQPage JSON-LD
}

export interface BlockAuthorBio extends BaseBlock {
  author_ref: string;                 // FK → authors.id
}

export interface BlockRelatedArticles extends BaseBlock {
  title?: string;
  category?: string;
  tags?: string[];
  limit: number;
  exclude_current: boolean;
}

// Union of all block items (for BlocksRenderer dispatch)
export type Block =
  | BlockSectionHeader | BlockTwoColumn | BlockSpacer
  | BlockHeroPillar | BlockHeroFunnel | BlockHeroSqueeze | BlockArticleHeader
  | BlockRichText | BlockTextWithImage | BlockCards | BlockFeatures
  | BlockStats | BlockTimelineRoadmap | BlockComparisonTable
  | BlockGallery | BlockVideoEmbed
  | BlockTestimonialGrid | BlockTrustBar | BlockAggregateRating
  | BlockCtaForm | BlockCtaBanner | BlockUrgencyBar
  | BlockPricingTable | BlockNextSteps
  | BlockFaq | BlockAuthorBio | BlockRelatedArticles;

// ============================================================
// SHARED
// ============================================================

export interface CtaLink {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: string;
  open_in_new_tab?: boolean;
}

export type SchoolLevel = 'mam-non' | 'tieu-hoc' | 'thcs' | 'thpt';

export type ProductCode =
  | 'mam-non' | 'tieu-hoc' | 'thcs' | 'thpt'
  | 'song-ngu' | 'ielts' | 'pdr' | 'hoc-bong'
  | 'ngoai-khoa' | 'mentoring' | 'du-hoc';

// ============================================================
// FORM
// ============================================================

export type FormVariant = 'two_step_email_first' | 'one_step' | 'progressive_3_step' | 'phone_only';
export type FieldType = 'email' | 'text' | 'tel' | 'select' | 'textarea' | 'date' | 'hidden';

export interface FormField {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  required: boolean;
  step: 1 | 2 | 3;
  validate?: 'vn_phone' | 'email' | 'regex';
  validate_pattern?: string;
  options?: Array<{ value: string; label: string }>;
  options_from?: 'campuses' | 'school_levels' | 'products';
  default_value?: string;
}

export interface Form {
  id: string;                          // slug e.g. "homepage-hero"
  name: string;
  variant: FormVariant;
  funnel_code: string;                 // FK → funnels.code
  school_level_default?: SchoolLevel;
  campus_default?: string;
  fields: FormField[];
  submit_label: string;
  success_mode: 'redirect' | 'inline_message';
  thank_you_page?: string;
  success_message?: string;
  ghl_workflow_id?: string;
  pancake_pipeline?: string;
  lead_score_weight: number;
  notifications: {
    email: boolean;
    zalo: boolean;
    slack_webhook?: string;
  };
  gdpr_consent: boolean;
  double_optin: boolean;
  anti_spam: {
    honeypot: boolean;
    turnstile: boolean;
  };
}

// ============================================================
// FUNNEL
// ============================================================

export type FunnelType = 'awareness' | 'lead_magnet' | 'webinar' | 'trial' | 'direct_enrollment';

export interface Funnel {
  code: string;                        // unique, used as lead source
  name: string;
  type: FunnelType;
  school_level?: SchoolLevel;
  product_ref?: ProductCode;
  campus_ref?: string;
  ghl_workflow_id?: string;
  pancake_pipeline?: string;
  nurture_sequence_id?: string;
  expected_cvr: number;                // 0..1
  lead_score_base: number;
  entry_pages: string[];               // slugs
  thank_you_page: string;
}

// ============================================================
// AB TESTING
// ============================================================

export interface AbTest {
  id: string;
  name: string;
  hypothesis: string;
  status: 'draft' | 'running' | 'paused' | 'concluded';
  start_date: string;
  end_date?: string;
  winner_variant?: string;
  variants: AbTestVariant[];
}

export interface AbTestVariant {
  id: string;
  name: string;                        // e.g. "v_a", "v_b"
  weight: number;                      // 0..1 split
  blocks: BlockInstance[];             // override blocks for this variant
}

// ============================================================
// SUPPORTING COLLECTIONS
// ============================================================

export interface Testimonial {
  id: string;
  quote: string;
  author_name: string;
  author_role: string;
  avatar?: string;
  rating: number;
  school_level?: SchoolLevel;
  campus_ref?: string;
  featured: boolean;
}

export interface Campus {
  slug: string;                        // "go-vap" | "phu-nhuan" | ...
  name: string;
  address: string;
  locality: string;
  region: 'tphcm' | 'long-an' | 'kien-giang';
  google_maps_url: string;
  hotline: string;
  hero_image?: string;
  school_levels: SchoolLevel[];
  features: string[];
  coordinates?: { lat: number; lng: number };
  status: PublishStatus;
  sort: number;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  bio: string;
  credentials?: string[];
  social_links?: Array<{ platform: string; url: string }>;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  cover_image?: string;
  body: string;
  category: string;
  tags: string[];
  author_ref: string;
  publish_date: string;
  read_time_minutes: number;
  status: PublishStatus;
}

export interface Announcement {
  id: string;
  text: string;
  link?: string;
  active: boolean;
  start_date?: string;
  end_date?: string;
  priority: number;
}

export interface SiteSettings {
  hotline: string;
  zalo_url: string;
  zalo_oa_id: string;
  popup_seconds: number;
  dark_mode_default: boolean;
  announcement_active: boolean;
  announcement_text?: string;
  announcement_link?: string;
  gtm_id: string;
  ga4_id?: string;
  posthog_key?: string;
}
