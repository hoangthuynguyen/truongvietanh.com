/**
 * E2E smoke test for /v2/demo — verifies CMS-driven rendering pipeline
 * works end-to-end in a real browser (DOM + JS + form behavior).
 *
 * Runs against:
 *   - Local build: `npm run build && npx serve dist` → BASE_URL=http://localhost:3000
 *   - Staging: BASE_URL=https://truongvietanh.com
 *
 * Why this test matters: unit tests verify pure logic (lead-scoring.test.ts),
 * but only a real browser can catch:
 *   - Hydration mismatches
 *   - CSS not loading
 *   - Form JS not binding
 *   - Missing /scripts/*.js assets
 *   - GTM dataLayer events firing correctly
 */
import { test, expect } from '@playwright/test';

const BASE = process.env.BASE_URL || 'http://localhost:3000';

test.describe('/v2/demo — proof of concept page', () => {
  // Disable reduced-motion gate so scroll-reveal CSS doesn't hide below-fold blocks
  test.use({ reducedMotion: 'reduce' });

  test('renders all 7 expected blocks', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);

    // Hero squeeze — above fold, should be visible
    await expect(page.locator('.b-hero-squeeze')).toBeVisible();
    await expect(page.locator('.b-hero-squeeze .b-h1')).toContainText(/ebook|checklist|mầm non/i);

    // Trust bar with 3 stats
    const trustItems = page.locator('.b-trust-bar .b-trust-item');
    await expect(trustItems).toHaveCount(3);

    // Below-fold blocks — check DOM attachment (avoid viewport-dependent visibility)
    await expect(page.locator('.b-cards')).toBeAttached();
    const cards = page.locator('.b-cards .b-card');
    await expect(cards).toHaveCount(3);

    await expect(page.locator('.b-testimonial-grid')).toBeAttached();
    // Multiple .b-cta-form exist (hero nests one + standalone block) — just check count
    expect(await page.locator('.b-cta-form').count()).toBeGreaterThanOrEqual(1);
    expect(await page.locator('.df-form').count()).toBeGreaterThanOrEqual(1);

    const faqItems = page.locator('.b-faq-item');
    expect(await faqItems.count()).toBeGreaterThanOrEqual(3);
  });

  test('first FAQ item is open by default', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);
    const firstFaq = page.locator('.b-faq-item').first();
    await expect(firstFaq).toHaveAttribute('open', '');
  });

  test('form validation: empty email shows error', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);

    // Submit button on step 1 is a "next-step" button, not submit —
    // clicking it with empty email should show validation error
    const form = page.locator('.b-hero-squeeze .df-form').first();
    const emailInput = form.locator('input[type="email"]');
    const nextBtn = form.locator('[data-action="next-step"]').first();

    await nextBtn.click();

    // Error class should appear
    await expect(emailInput).toHaveClass(/df-error/);
  });

  test('form validation: invalid email shows error', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);
    const form = page.locator('.b-hero-squeeze .df-form').first();
    const emailInput = form.locator('input[type="email"]');

    await emailInput.fill('not-an-email');
    await form.locator('[data-action="next-step"]').first().click();

    await expect(emailInput).toHaveClass(/df-error/);
    await expect(form.locator('.df-error-msg')).toContainText(/không hợp lệ|invalid/i);
  });

  test('form step transition: valid email advances to step 2', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);
    const form = page.locator('.b-hero-squeeze .df-form').first();
    const emailInput = form.locator('input[type="email"]');

    // Intercept /api/lead to avoid hitting real worker during test
    await page.route('**/api/lead', (route) => route.fulfill({ status: 200, body: '{"ok":true}' }));

    await emailInput.fill('test@example.com');
    await form.locator('[data-action="next-step"]').first().click();

    // Step 2 should be visible, step 1 hidden
    const step1 = form.locator('.df-step[data-step="1"]');
    const step2 = form.locator('.df-step[data-step="2"]');
    await expect(step1).toBeHidden();
    await expect(step2).toBeVisible();

    // Name + phone fields should be in step 2
    await expect(step2.locator('input[name="full_name"]')).toBeVisible();
    await expect(step2.locator('input[name="phone"]')).toBeVisible();
  });

  test('GTM dataLayer receives lead_step_complete on step 1', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);
    await page.route('**/api/lead', (route) => route.fulfill({ status: 200, body: '{"ok":true}' }));

    const form = page.locator('.b-hero-squeeze .df-form').first();
    await form.locator('input[type="email"]').fill('gtm-test@example.com');
    await form.locator('[data-action="next-step"]').first().click();

    // Give dataLayer a moment to flush
    await page.waitForTimeout(100);

    const events = await page.evaluate(() => (window as any).dataLayer || []);
    const stepEvent = events.find((e: any) => e.event === 'lead_step_complete');
    expect(stepEvent).toBeDefined();
    expect(stepEvent.step).toBe(1);
  });

  test('partial capture POSTs to /api/lead on step 1 advance', async ({ page }) => {
    await page.goto(`${BASE}/v2/demo`);

    let captureRequest: { body: string } | null = null;
    await page.route('**/api/lead', async (route) => {
      const postData = route.request().postData() || '';
      if (postData.includes('partial_capture')) captureRequest = { body: postData };
      await route.fulfill({ status: 200, body: '{"ok":true}' });
    });

    const form = page.locator('.b-hero-squeeze .df-form').first();
    await form.locator('input[type="email"]').fill('partial@example.com');
    await form.locator('[data-action="next-step"]').first().click();

    await page.waitForTimeout(200);
    expect(captureRequest).not.toBeNull();
    expect(captureRequest!.body).toContain('partial_capture');
    expect(captureRequest!.body).toContain('partial@example.com');
  });

  test('scripts/dynamic-form.js loads (not 404)', async ({ page }) => {
    const failed: string[] = [];
    page.on('response', (res) => {
      if (res.url().includes('/scripts/') && res.status() >= 400) failed.push(res.url());
    });
    await page.goto(`${BASE}/v2/demo`);
    await page.waitForLoadState('networkidle');
    expect(failed).toEqual([]);
  });
});
