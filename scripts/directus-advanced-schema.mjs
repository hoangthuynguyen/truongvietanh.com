/**
 * Advanced Directus collections cho CMS đầy đủ
 * - testimonials: đánh giá phụ huynh/học sinh
 * - campuses: hệ thống cơ sở
 * - gallery_categories: danh mục ảnh
 * - homepage_sections: content sections homepage
 */

import { createDirectus, rest, staticToken, createCollection, createField, createItem } from '@directus/sdk';

const DIRECTUS_URL = process.env.PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

const client = createDirectus(DIRECTUS_URL).with(staticToken(DIRECTUS_TOKEN)).with(rest());

async function safeCreate(fn, label) {
  try { await fn(); console.log(`  ✓ ${label}`); }
  catch (e) { console.log(`  → ${label}: ${e.message?.slice(0, 60)}`); }
}

async function run() {
  console.log('Creating advanced collections...\n');

  // === TESTIMONIALS ===
  await safeCreate(() => client.request(createCollection({
    collection: 'testimonials', meta: { icon: 'format_quote', sort_field: 'sort' }, schema: {}
  })), 'collection: testimonials');

  for (const f of [
    { field: 'sort', type: 'integer', meta: { hidden: true } },
    { field: 'status', type: 'string', schema: { default_value: 'published' }, meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] } } },
    { field: 'name', type: 'string', meta: { required: true } },
    { field: 'role', type: 'string', meta: { note: 'Học sinh lớp X / Phụ huynh' } },
    { field: 'quote', type: 'text', meta: { interface: 'input-multiline', required: true } },
    { field: 'initials', type: 'string', meta: { note: '2 chữ cái tắt (VD: NH)', width: 'half' } },
    { field: 'page_slug', type: 'string', meta: { note: 'Hiển thị trên trang nào (index, mam-non, ...)' } },
  ]) {
    await safeCreate(() => client.request(createField('testimonials', f)), `  testimonials.${f.field}`);
  }

  // === CAMPUSES ===
  await safeCreate(() => client.request(createCollection({
    collection: 'campuses', meta: { icon: 'location_on', sort_field: 'sort' }, schema: {}
  })), 'collection: campuses');

  for (const f of [
    { field: 'sort', type: 'integer', meta: { hidden: true } },
    { field: 'status', type: 'string', schema: { default_value: 'published' } },
    { field: 'name', type: 'string', meta: { required: true } },
    { field: 'city', type: 'string', meta: { note: 'TP.HCM / Long An / Kiên Giang' } },
    { field: 'address', type: 'string' },
    { field: 'phone', type: 'string' },
    { field: 'lat', type: 'float', meta: { note: 'Latitude' } },
    { field: 'lng', type: 'float', meta: { note: 'Longitude' } },
    { field: 'levels', type: 'json', meta: { note: 'C��p học: ["mam-non","tieu-hoc"]', interface: 'input-code' } },
    { field: 'opening_hours', type: 'string', schema: { default_value: 'T2-T7: 7:00-17:00' } },
  ]) {
    await safeCreate(() => client.request(createField('campuses', f)), `  campuses.${f.field}`);
  }

  // === GALLERY CATEGORIES ===
  await safeCreate(() => client.request(createCollection({
    collection: 'gallery_categories', meta: { icon: 'photo_library', sort_field: 'sort' }, schema: {}
  })), 'collection: gallery_categories');

  for (const f of [
    { field: 'sort', type: 'integer', meta: { hidden: true } },
    { field: 'status', type: 'string', schema: { default_value: 'published' } },
    { field: 'title', type: 'string', meta: { required: true } },
    { field: 'heading', type: 'string' },
    { field: 'description', type: 'text', meta: { interface: 'input-multiline' } },
    { field: 'slug', type: 'string', meta: { required: true } },
    { field: 'image_count', type: 'integer', schema: { default_value: 4 } },
    { field: 'image_base_url', type: 'string', schema: { default_value: 'https://media.truongvietanh.com/images' } },
  ]) {
    await safeCreate(() => client.request(createField('gallery_categories', f)), `  gallery.${f.field}`);
  }

  // === IMPORT TESTIMONIALS DATA ===
  console.log('\nImporting testimonials...');
  const testimonials = [
    { name: 'Nguyễn Ngọc Thị Giang', role: 'Học sinh lớp 7', quote: 'Từ một học sinh còn rụt rè, em dần tự tin hơn khi được khuyến khích nói, trình bày và tìm ra điểm mạnh của mình.', initials: 'NG', page_slug: 'index', sort: 1, status: 'published' },
    { name: 'Nguyễn Chí Toàn', role: 'Học sinh lớp 6', quote: 'Điều tạo khác biệt là sự gần gũi của thầy cô. Khi gặp khó khăn, em biết mình luôn có người đồng hành để tiến bộ từng bước.', initials: 'NT', page_slug: 'index', sort: 2, status: 'published' },
    { name: 'Phụ huynh Hoàng Diễm', role: 'Cảm nhận phụ huynh', quote: 'Niềm tin không đến từ khẩu hiệu mà đến từ cách trường chăm học sinh, cách giao tiếp với phụ huynh và tiến bộ nhìn thấy được qua từng giai đoạn.', initials: 'HD', page_slug: 'index', sort: 3, status: 'published' },
    { name: 'Phụ huynh Thanh Hà', role: 'Cảm nhận phụ huynh', quote: 'Con tôi thay đổi rõ rệt về khả năng giao tiếp tiếng Anh chỉ sau một học kỳ. Điều khiến tôi yên tâm nhất là con thích đi học mỗi ngày.', initials: 'TH', page_slug: 'index', sort: 4, status: 'published' },
    { name: 'Phụ huynh Minh Tâm', role: 'Cảm nhận phụ huynh', quote: 'Đội ngũ tuyển sinh rất chuyên nghiệp và tận tâm. Từ lúc đăng ký tham quan đến lúc con nhập học, tôi luôn cảm thấy được hỗ trợ chu đáo.', initials: 'MT', page_slug: 'index', sort: 5, status: 'published' },
  ];
  for (const t of testimonials) {
    await safeCreate(() => client.request(createItem('testimonials', t)), `  ${t.name}`);
  }

  // === IMPORT CAMPUSES DATA ===
  console.log('\nImporting campuses...');
  const campuses = [
    { name: 'Trường Việt Anh Phú Nhuận', city: 'TP. Hồ Chí Minh', address: '269A Nguyễn Trọng Tuyển, Phường Phú Nhuận', phone: '0916 961 409', lat: 10.7976, lng: 106.6746, levels: ['mam-non', 'tieu-hoc', 'thcs', 'thpt'], sort: 1, status: 'published' },
    { name: 'Trường Việt Anh Bình Tân', city: 'TP. Hồ Chí Minh', address: 'Số 7, Đường 38A, Tân Tạo, Bình Tân', phone: '0916 961 409', levels: ['mam-non', 'tieu-hoc', 'thcs'], sort: 2, status: 'published' },
    { name: 'Trường Việt Anh Gò Vấp', city: 'TP. Hồ Chí Minh', address: '160/72 Phan Huy Ích, Phường An Hội Tây', phone: '0916 961 409', lat: 10.8321, lng: 106.6442, levels: ['mam-non', 'tieu-hoc', 'thcs', 'thpt'], sort: 3, status: 'published' },
    { name: 'Trường Mầm non Việt Anh Gò Vấp', city: 'TP. Hồ Chí Minh', address: '573 Đ. Lê Đức Thọ, Phường An Hội Đông', phone: '0774 588 988', levels: ['mam-non'], sort: 4, status: 'published' },
    { name: 'Trường Mầm non Nhân Lễ', city: 'Long An', address: '22 Đường D2, KDC, Cần Giuộc', levels: ['mam-non'], sort: 5, status: 'published' },
    { name: 'Trường Mầm non Thái Sơn', city: 'Long An', address: 'KDC Thái Sơn, Long Hậu', levels: ['mam-non'], sort: 6, status: 'published' },
    { name: 'Trường Tiểu học Thái Sơn', city: 'Long An', address: 'KDC Thái Sơn, Long Hậu', levels: ['tieu-hoc'], sort: 7, status: 'published' },
    { name: 'Trường MN QT Mekong Xanh', city: 'Kiên Giang', address: 'Lô E7, Khu đô thị Tây Bắc, Rạch Giá', levels: ['mam-non'], sort: 8, status: 'published' },
    { name: 'Trường TH QT Mekong Xanh', city: 'Kiên Giang', address: 'Lô E7, Khu đô thị Tây Bắc, Rạch Giá', levels: ['tieu-hoc'], sort: 9, status: 'published' },
  ];
  for (const c of campuses) {
    await safeCreate(() => client.request(createItem('campuses', c)), `  ${c.name}`);
  }

  // === IMPORT GALLERY CATEGORIES ===
  console.log('\nImporting gallery categories...');
  const galleries = [
    { title: 'Thể Thao', heading: 'Thể Thao & Vận Động', slug: 'the-thao', description: 'Học sinh rèn luyện thể chất qua bóng đá, bóng rổ, bơi lội, cầu lông.', image_count: 4, sort: 1, status: 'published' },
    { title: 'Dã Ngoại', heading: 'Dã Ngoại & Trải Nghiệm', slug: 'da-ngoai', description: 'Các chuyến dã ngoại, tham quan học tập giúp học sinh trải nghiệm thực tế.', image_count: 4, sort: 2, status: 'published' },
    { title: 'Giáo Viên & Học Sinh', heading: 'Giáo Viên & Học Sinh', slug: 'giao-vien', description: 'Khoảnh khắc ấm áp giữa giáo viên và học sinh tại Trường Việt Anh.', image_count: 4, sort: 3, status: 'published' },
    { title: 'Thuyết Trình', heading: 'Thuyết Trình & Kỹ Năng Mềm', slug: 'thuyet-trinh', description: 'Học sinh thuyết trình, tranh biện và phát triển kỹ năng mềm.', image_count: 4, sort: 4, status: 'published' },
    { title: 'Vui Nhộn', heading: 'Hoạt Động Vui Nhộn & Sự Kiện', slug: 'vui-ve', description: 'Khoảnh khắc vui nhộn trong các sự kiện văn nghệ, lễ hội.', image_count: 4, sort: 5, status: 'published' },
    { title: 'Phụ Huynh', heading: 'Phụ Huynh & Gia Đình', slug: 'phu-huynh', description: 'Sự kiện dành cho phụ huynh: họp mặt, ngày hội gia đình.', image_count: 4, sort: 6, status: 'published' },
    { title: 'Olympic', heading: 'Thành Tích & Olympic', slug: 'olympic', description: 'Học sinh đạt thành tích cao trong Olympic Toán, Khoa học, Tiếng Anh.', image_count: 4, sort: 7, status: 'published' },
    { title: 'STEM', heading: 'Dự Án STEM & Sáng Tạo', slug: 'du-an', description: 'Dự án STEM, Robotics và các cuộc thi sáng tạo khoa học.', image_count: 4, sort: 8, status: 'published' },
  ];
  for (const g of galleries) {
    await safeCreate(() => client.request(createItem('gallery_categories', g)), `  ${g.title}`);
  }

  console.log('\nDone! Check Directus admin.');
}

run().catch(console.error);
