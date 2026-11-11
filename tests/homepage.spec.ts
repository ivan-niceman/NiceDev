import { test, expect } from '@playwright/test';

test('homepage loads and has correct title', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await expect(page).toHaveTitle(/NiceDev/);
});

test('has meta description', async ({ page }) => {
  await page.goto('http://localhost:4321');
  const description = await page.getAttribute('meta[name="description"]', 'content');
  expect(description).toContain('NiceDev');
});