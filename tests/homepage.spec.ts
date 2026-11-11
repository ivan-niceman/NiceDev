import { test, expect } from '@playwright/test';

test.describe('Homepage SEO and Metadata', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/NiceDev/);
  });

  test('has meta description', async ({ page }) => {
    await page.goto('/');
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /NiceDev/);
  });
});