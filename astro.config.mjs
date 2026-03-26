import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://truongvietanh.com',
  output: 'static',
  image: {
    domains: ['truongvietanh.com', 'images.unsplash.com'],
  },
});
