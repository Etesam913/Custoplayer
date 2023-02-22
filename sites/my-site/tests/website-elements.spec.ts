import { test, expect } from '@playwright/test';

test('Has Title', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('website-header')).toContainText('Custoplayer Tests')
});