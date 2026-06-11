import { test, expect } from '@playwright/test';

test('Export PDF from Create page triggers a download', async ({ page }) => {
  await page.goto('/');

  // Select a color and draw some cells
  await page.locator('.swatch-circle').nth(1).click();
  const cells = page.locator('.grid-cell');
  await cells.nth(0).click();
  await cells.nth(1).click();
  await cells.nth(2).click();

  // Generate the pattern
  await page.getByRole('button', { name: 'Generate Pattern' }).click();

  // Wait for and capture the download
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export PDF' }).click(),
  ]);

  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
});
