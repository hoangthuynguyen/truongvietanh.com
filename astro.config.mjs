import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const isBuildCommand = process.argv.includes('build');

export default defineConfig({
  site: 'https://truongvietanh.com',
  output: 'server',
  adapter: isBuildCommand ? cloudflare() : undefined,
});
