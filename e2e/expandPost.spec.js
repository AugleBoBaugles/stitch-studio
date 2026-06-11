import { test, expect } from '@playwright/test';

test('clicking a post card expands it to show the full pattern', async ({ page }) => {
  await page.goto('/');

  // Navigate to Posts page (sample posts are always visible)
  await page.getByRole('button', { name: 'Posts' }).click();
  await expect(page.locator('.posts-page')).toBeVisible();

  // Click the first post card to expand it
  await page.locator('.post-card').first().click();

  // Expanded view should appear
  await expect(page.locator('.expanded-box')).toBeVisible();

  // Pattern text should contain "sc"
  await expect(page.locator('.pattern-text')).toContainText('sc');

  // Close button should dismiss the expanded view
  await page.locator('.expanded-close').click();
  await expect(page.locator('.expanded-box')).not.toBeVisible();
});
