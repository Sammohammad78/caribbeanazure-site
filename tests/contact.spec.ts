import { test, expect } from '@playwright/test';

// Happy path test for contact form
test('contact form submits and redirects to thank‑you page', async ({ page }) => {
  await page.goto('/');
  // Scroll to contact section
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="company"]', 'Acme Co');
  await page.selectOption('select[name="budget"]', { label: '€500–1,500' });
  await page.fill('textarea[name="message"]', 'This is a test message.');
  await Promise.all([
    page.waitForNavigation(),
    page.click('button[type="submit"]'),
  ]);
  await expect(page).toHaveURL(/thank-you/);
});