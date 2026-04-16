import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'src/**/*.test.js'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
  },
});
