import { test, expect } from '@playwright/test';
const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('index.html', ()=>{

  test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000'));

  test.describe('<head>', ()=>{

    test('has <title> from config', async ({ page }) => {
      await expect(page).toHaveTitle(config.title);
    });

  })
})

