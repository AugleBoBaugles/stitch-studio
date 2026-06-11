import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173/stitch-studio/',
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/stitch-studio/',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
