import {expect, test} from '@playwright/test';

const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('index.html', ()=>{

  test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000'));


  test('<head> has <title> from config', async ({ page }) => {
    await expect(page).toHaveTitle(config.title);
  });

  test('displays the homepage as a merged category', async ({ page }) => {
    let homepageTopText = `:text("This is the top of the homepage")`;
    let homepageMiddleText = `:text("This is also on the homepage but weighted lower")`;
    let homepageBottomText = `:text("This is at the bottom of the homepage")`;

    await expect(page.locator(`${homepageTopText}:above(${homepageMiddleText})`)).toBeVisible()
    await expect(page.locator(`${homepageMiddleText}:above(${homepageBottomText})`)).toBeVisible()
    await expect(page.locator(`${homepageBottomText}:below(${homepageMiddleText})`)).toBeVisible()
  });

})
