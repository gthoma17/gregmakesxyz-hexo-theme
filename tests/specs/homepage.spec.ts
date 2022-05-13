import { test, expect } from '@playwright/test';
const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('index.html', ()=>{

  test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000'));


  test('<head> has <title> from config', async ({ page }) => {
    await expect(page).toHaveTitle(config.title);
  });

  test('displays the homepage post content but not title', async ({ page }) => {
    await expect(page.locator("text=This is the landing page")).toBeVisible()
    await expect(page.locator("text=homepage")).not.toBeVisible()
  });

})
