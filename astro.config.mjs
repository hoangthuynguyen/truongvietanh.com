import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://truongvietanh.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/mau-template/') &&
        !page.includes('/mau/') &&
        !page.includes('/samples/') &&
        !page.includes('/homepage1') &&
        !page.includes('/homepage2') &&
        !page.includes('/gioi-thieu2') &&
        !page.includes('/mau-cms-') &&
        !page.includes('/cam-on/'),
    }),
  ],
  image: {
    domains: ['truongvietanh.com', 'media.truongvietanh.com', 'images.unsplash.com'],
  },
});
