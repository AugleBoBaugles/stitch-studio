import { test, expect } from '@playwright/test';

test('draw, label color, generate pattern, post, verify on Posts page', async ({ page }) => {
  await page.goto('/');

  // Select the yellow color swatch (4th swatch, index 3)
  const swatches = page.locator('.swatch-circle');
  await swatches.nth(3).click();

  // Change its label to "sunshine"
  const labels = page.locator('.swatch-label');
  await labels.nth(3).fill('sunshine');

  // Click 5 cells near the center of the grid
  const cells = page.locator('.grid-cell');
  const count = await cells.count();
  const mid = Math.floor(count / 2);
  for (let i = 0; i < 5; i++) {
    await cells.nth(mid + i).click();
  }

  // Generate the pattern
  await page.getByRole('button', { name: 'Generate Pattern' }).click();

  // Pattern panel should contain the color label
  await expect(page.locator('.pattern-text')).toContainText('sunshine');

  // Open publish modal and fill in details
  await page.getByRole('button', { name: 'Post pattern' }).click();
  await page.getByLabel('Pattern name').fill('My Test Post');
  await page.getByLabel('Description').fill('A test description');
  await page.getByLabel('Artist name').fill('Test Artist');
  await page.getByRole('button', { name: 'Post pattern' }).last().click();

  // Should auto-navigate to Posts page
  await expect(page.locator('.posts-page')).toBeVisible();

  // Post card should show the entered details
  await expect(page.locator('.post-card-name', { hasText: 'My Test Post' })).toBeVisible();
  await expect(page.locator('.post-card-artist', { hasText: 'Test Artist' })).toBeVisible();
  await expect(page.locator('.post-card-description', { hasText: 'A test description' })).toBeVisible();
});
