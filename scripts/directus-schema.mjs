/**
 * Directus Collection Schema cho trang pillar pages
 *
 * Collection: pillar_pages
 * Mỗi trang chính (mam-non, tieu-hoc, ...) là 1 record
 * Template .astro sẽ fetch từ Directus và render giữ nguyên giao diện
 */

import { createDirectus, rest, staticToken, createItem, createCollection, createField } from '@directus/sdk';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

async function createSchema() {
  console.log('Creating Directus collections...');

  // 1. pillar_pages collection
  try {
    await client.request(createCollection({
      collection: 'pillar_pages',
      meta: {
        icon: 'article',
        note: 'Trang pillar chính (mầm non, tiểu học, ...)',
        sort_field: 'sort',
        archive_field: 'status',
        archive_value: 'archived',
        unarchive_value: 'published',
      },
      schema: {},
    }));
    console.log('  ✓ Created collection: pillar_pages');
  } catch (e) {
    console.log('  → pillar_pages already exists or error:', e.message?.slice(0, 80));
  }

  // 2. Fields
  const fields = [
    { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }, { text: 'Archived', value: 'archived' }] }, width: 'half' }, schema: { default_value: 'published' } },
    { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true } },
    { field: 'slug', type: 'string', meta: { interface: 'input', note: 'URL slug: mam-non, tieu-hoc, etc.', required: true, width: 'half' }, schema: { is_unique: true, is_nullable: false } },

    // SEO & Meta
    { field: 'seo_group', type: 'alias', meta: { interface: 'group-raw', special: ['alias', 'no-data', 'group'], options: { title: 'SEO & Meta' } } },
    { field: 'title', type: 'string', meta: { interface: 'input', note: 'Title tag (<title>)', required: true, group: 'seo_group' }, schema: {} },
    { field: 'description', type: 'text', meta: { interface: 'input-multiline', note: 'Meta description (max 160 chars)', group: 'seo_group' }, schema: {} },
    { field: 'og_image', type: 'string', meta: { interface: 'input', note: 'Open Graph image URL', group: 'seo_group' }, schema: {} },
    { field: 'canonical_url', type: 'string', meta: { interface: 'input', note: 'Canonical URL', group: 'seo_group' }, schema: {} },
    { field: 'noindex', type: 'boolean', meta: { interface: 'boolean', group: 'seo_group' }, schema: { default_value: false } },

    // Hero Section
    { field: 'hero_group', type: 'alias', meta: { interface: 'group-raw', special: ['alias', 'no-data', 'group'], options: { title: 'Hero Section' } } },
    { field: 'h1', type: 'string', meta: { interface: 'input', note: 'Heading chính (H1)', required: true, group: 'hero_group' }, schema: {} },
    { field: 'subtitle', type: 'string', meta: { interface: 'input', note: 'Dòng phụ dưới H1', group: 'hero_group' }, schema: {} },
    { field: 'last_updated', type: 'string', meta: { interface: 'input', note: 'Cập nhật lần cuối: Tháng X, 202X', group: 'hero_group' }, schema: {} },
    { field: 'trust_badges', type: 'json', meta: { interface: 'input-code', note: 'JSON array: [{label, value}]', group: 'hero_group', options: { language: 'json' } }, schema: {} },

    // Breadcrumb
    { field: 'breadcrumb', type: 'json', meta: { interface: 'input-code', note: 'JSON array: [{label, href}]', options: { language: 'json' } }, schema: {} },

    // Form
    { field: 'form_group', type: 'alias', meta: { interface: 'group-raw', special: ['alias', 'no-data', 'group'], options: { title: 'Lead Form' } } },
    { field: 'form_heading', type: 'string', meta: { interface: 'input', note: 'Tiêu đề form', group: 'form_group' }, schema: {} },
    { field: 'form_id', type: 'string', meta: { interface: 'input', group: 'form_group' }, schema: {} },
    { field: 'funnel_code', type: 'string', meta: { interface: 'input', group: 'form_group' }, schema: {} },
    { field: 'school_level', type: 'string', meta: { interface: 'input', group: 'form_group' }, schema: {} },

    // Table of Contents
    { field: 'toc_items', type: 'json', meta: { interface: 'input-code', note: 'JSON array: [{label, href}]', options: { language: 'json' } }, schema: {} },

    // Content Sections (main body)
    { field: 'sections', type: 'json', meta: { interface: 'input-code', note: 'JSON array of content sections', options: { language: 'json' } }, schema: {} },

    // FAQ
    { field: 'faq_items', type: 'json', meta: { interface: 'input-code', note: 'JSON array: [{question, answer}]', options: { language: 'json' } }, schema: {} },

    // Bottom CTA
    { field: 'cta_group', type: 'alias', meta: { interface: 'group-raw', special: ['alias', 'no-data', 'group'], options: { title: 'Bottom CTA' } } },
    { field: 'cta_title', type: 'string', meta: { interface: 'input', group: 'cta_group' }, schema: {} },
    { field: 'cta_text', type: 'text', meta: { interface: 'input-multiline', group: 'cta_group' }, schema: {} },
    { field: 'cta_image', type: 'string', meta: { interface: 'input', group: 'cta_group' }, schema: {} },
    { field: 'cta_benefits', type: 'json', meta: { interface: 'input-code', note: 'JSON array of strings', group: 'cta_group', options: { language: 'json' } }, schema: {} },

    // Related / PAA
    { field: 'related_topics', type: 'json', meta: { interface: 'input-code', note: 'JSON array: [{title, desc, href}]', options: { language: 'json' } }, schema: {} },

    // Next Steps
    { field: 'next_steps', type: 'json', meta: { interface: 'input-code', note: 'JSON array: [{label, href, class}]', options: { language: 'json' } }, schema: {} },

    // Structured Data (raw JSON-LD)
    { field: 'structured_data', type: 'json', meta: { interface: 'input-code', note: 'Schema.org JSON-LD array', options: { language: 'json' } }, schema: {} },
  ];

  for (const field of fields) {
    try {
      await client.request(createField('pillar_pages', field));
      console.log(`  ✓ Created field: ${field.field}`);
    } catch (e) {
      console.log(`  → ${field.field}: ${e.message?.slice(0, 60)}`);
    }
  }

  // 3. site_settings collection (global settings)
  try {
    await client.request(createCollection({
      collection: 'site_settings',
      meta: { icon: 'settings', singleton: true, note: 'Cài đặt chung cho website' },
      schema: {},
    }));
    console.log('  ✓ Created collection: site_settings');
  } catch (e) {
    console.log('  → site_settings:', e.message?.slice(0, 60));
  }

  const siteFields = [
    { field: 'school_name', type: 'string', schema: { default_value: 'Trường Việt Anh' } },
    { field: 'hotline', type: 'string', schema: { default_value: '0916 961 409' } },
    { field: 'email', type: 'string', schema: { default_value: 'info@truongvietanh.com' } },
    { field: 'zalo_url', type: 'string', schema: { default_value: 'https://zalo.me/0916961409' } },
    { field: 'facebook_url', type: 'string', schema: {} },
    { field: 'youtube_url', type: 'string', schema: {} },
    { field: 'instagram_url', type: 'string', schema: {} },
    { field: 'announcement_text', type: 'string', meta: { note: 'Announcement bar text' }, schema: {} },
    { field: 'announcement_link', type: 'string', schema: {} },
    { field: 'announcement_active', type: 'boolean', schema: { default_value: true } },
    { field: 'campuses', type: 'json', meta: { interface: 'input-code', note: 'JSON array of campuses', options: { language: 'json' } }, schema: {} },
  ];

  for (const field of siteFields) {
    try {
      await client.request(createField('site_settings', { ...field, meta: { ...field.meta, interface: field.meta?.interface || 'input' } }));
      console.log(`  ✓ Created site_settings.${field.field}`);
    } catch (e) {
      console.log(`  → site_settings.${field.field}: ${e.message?.slice(0, 60)}`);
    }
  }

  console.log('\nDone! Now run: node scripts/extract-content.mjs');
}

createSchema().catch(console.error);
