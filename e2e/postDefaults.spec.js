import { test, expect } from '@playwright/test';

test('posting without filling form uses default values', async ({ page }) => {
  await page.goto('/');

  // Select any color and draw a cell
  await page.locator('.swatch-circle').first().click();
  await page.locator('.grid-cell').nth(0).click();

  // Generate pattern
  await page.getByRole('button', { name: 'Generate Pattern' }).click();

  // Open publish modal and confirm immediately without changing fields
  await page.getByRole('button', { name: 'Post pattern' }).click();
  await page.getByRole('button', { name: 'Post pattern' }).last().click();

  // Navigate to Posts page
  await expect(page.locator('.posts-page')).toBeVisible();

  // Default values should appear on the card
  await expect(page.locator('.post-card-name', { hasText: 'Untitled' })).toBeVisible();
  await expect(page.locator('.post-card-artist', { hasText: 'Anonymous' })).toBeVisible();
});
