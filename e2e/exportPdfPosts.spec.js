import { test, expect } from '@playwright/test';

test('Export PDF from an expanded post card triggers a download', async ({ page }) => {
  await page.goto('/');

  // Go to Posts page
  await page.getByRole('button', { name: 'Posts' }).click();
  await expect(page.locator('.posts-page')).toBeVisible();

  // Expand the first post
  await page.locator('.post-card').first().click();
  await expect(page.locator('.expanded-box')).toBeVisible();

  // Wait for and capture the download from the expanded card
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.expanded-footer').getByRole('button', { name: 'Export PDF' }).click(),
  ]);

  expect(download.suggestedFilename()).toMatch(/\.pdf$/);
});
