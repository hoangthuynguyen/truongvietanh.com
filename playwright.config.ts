import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config — E2E tests for /v2/demo + smoke tests.
 * Runs against local build OR staging URL (set BASE_URL env).
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'dot' : 'list',

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 20_000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile',   use: { ...devices['iPhone 13'] } },
  ],

  // Auto-start a static server when running locally without BASE_URL
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npx serve -l 3000 dist',
        port: 3000,
        timeout: 30_000,
        reuseExistingServer: !process.env.CI,
      },
});
