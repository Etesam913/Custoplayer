import { test, expect } from '@playwright/test';

test('Play Button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('website-header')).toContainText('Custoplayer Tests')
});