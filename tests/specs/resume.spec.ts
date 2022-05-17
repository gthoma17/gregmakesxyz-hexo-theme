import {expect, test} from '@playwright/test';

const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('resume category', ()=>{

    test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000/categories/resume/'));


    test('<head> concatentates title from config with Category name in Title Case', async ({ page }) => {
        await expect(page).toHaveTitle("Resume | " + config.title);
    });

    test('displays the latest post but not any older ones', async ({ page }) => {
        let lastestPostText = "This is my new resume";
        let oldPostText = "This is my old resume";

        await expect(page.locator(`:text("${lastestPostText}")`)).toBeVisible()
        await expect(page.locator(`:text("${oldPostText}")`)).not.toBeVisible()
    });

})
