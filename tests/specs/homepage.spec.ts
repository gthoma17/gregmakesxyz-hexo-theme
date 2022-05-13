import { test, expect } from '@playwright/test';
const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('index.html', ()=>{

  test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000'));

  test.describe('<head>', ()=>{

    test('has <title> from config', async ({ page }) => {
      await expect(page).toHaveTitle(config.title);
    });

    test('displays _only_ the latest post', async ({ page }) => {
      await expect(page.locator("text=This is the latest post")).toBeVisible()
      await expect(page.locator("text=This is an older post")).not.toBeVisible()
    });

  })
})
