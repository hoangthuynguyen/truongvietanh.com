/**
 * Import extracted pillar pages JSON into Directus
 */

import { createDirectus, rest, staticToken, createItem, updateItem } from '@directus/sdk';
import { readFileSync } from 'fs';
import { join } from 'path';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

const client = createDirectus(DIRECTUS_URL)
  .with(staticToken(DIRECTUS_TOKEN))
  .with(rest());

async function importPages() {
  const dataPath = join(import.meta.dirname, '..', 'data', 'pillar-pages.json');
  const pages = JSON.parse(readFileSync(dataPath, 'utf-8'));

  console.log(`Importing ${pages.length} pillar pages into Directus...\n`);

  for (const page of pages) {
    try {
      // Remove structured_data placeholder
      const data = { ...page };
      if (data.structured_data === 'EXTRACT_MANUALLY') {
        delete data.structured_data;
      }

      await client.request(createItem('pillar_pages', data));
      console.log(`✓ ${page.slug}: imported (${page.faq_items.length} FAQs)`);
    } catch (e) {
      if (e.message?.includes('unique') || e.message?.includes('duplicate')) {
        console.log(`→ ${page.slug}: already exists, skipping`);
      } else {
        console.log(`✗ ${page.slug}: ${e.message?.slice(0, 100)}`);
      }
    }
  }

  // Import site settings
  console.log('\nImporting site settings...');
  try {
    await client.request(updateItem('site_settings', 1, {
      school_name: 'Trường Việt Anh',
      hotline: '0916 961 409',
      email: 'info@truongvietanh.com',
      zalo_url: 'https://zalo.me/0916961409',
      facebook_url: 'https://www.facebook.com/truongvietanhhcm',
      youtube_url: 'https://www.youtube.com/@truongvietanh',
      instagram_url: 'https://www.instagram.com/truongvietanh',
      announcement_text: 'Tuyển sinh 2026–2027 đang mở — Ưu đãi Early Bird giảm đến 15% học phí.',
      announcement_link: '/tuyen-sinh',
      announcement_active: true,
      campuses: [
        { city: 'TP. Hồ Chí Minh', items: [
          { name: 'Trường Việt Anh Phú Nhuận', address: '269A Nguyễn Trọng Tuyển, Phường Phú Nhuận' },
          { name: 'Trường Việt Anh Bình Tân', address: 'Số 7 đường 38A, Tân Tạo, Bình Tân' },
          { name: 'Trường Việt Anh Gò Vấp', address: '160/72 Phan Huy Ích, Phường An Hội Đông' },
          { name: 'Trường Mầm non Việt Anh Gò Vấp', address: '573 Đ. Lê Đức Thọ, Phường An Hội Tây' },
        ]},
        { city: 'Cần Giuộc - Long An', items: [
          { name: 'Trường Mầm non Nhân Lễ', address: '22 Đường D2, KDC, Cần Giuộc' },
          { name: 'Trường Mầm non Thái Sơn', address: 'KDC Thái Sơn - Long Hậu' },
          { name: 'Trường Tiểu học Thái Sơn', address: 'KDC Thái Sơn - Long Hậu' },
        ]},
        { city: 'TP Rạch Giá - Kiên Giang', items: [
          { name: 'Trường Mầm non Quốc Tế Mekong Xanh', address: 'Lô E7, khu đô thị Tây Bắc' },
          { name: 'Trường Tiểu học Quốc Tế Mekong Xanh', address: 'Lô E7, khu đô thị Tây Bắc' },
        ]},
      ],
    }));
    console.log('✓ Site settings imported');
  } catch (e) {
    // Try create instead
    try {
      await client.request(createItem('site_settings', {
        school_name: 'Trường Việt Anh',
        hotline: '0916 961 409',
        email: 'info@truongvietanh.com',
      }));
      console.log('✓ Site settings created');
    } catch (e2) {
      console.log('→ Site settings: ' + e2.message?.slice(0, 80));
    }
  }

  console.log('\nDone! Check Directus admin at: ' + DIRECTUS_URL);
}

importPages().catch(console.error);
