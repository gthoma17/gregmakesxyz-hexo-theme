import {expect, test} from '@playwright/test';

const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('resume category', ()=>{

    test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000/categories/projects/'));

    test('<head> concatenates title from config with Category name in Title Case', async ({ page }) => {
        await expect(page).toHaveTitle("Projects | " + config.title);
    });

    test('displays all 6 projects with their images', async ({ page }) => {
        const lastestProjectTitle = "Newest Project";
        const lastestProjectSrc = "/images/newest-project.gif";
        const oldestProjectTitle = "Oldest Project";
        const oldestProjectSrc = "/images/oldest-project.jpeg";

        // check the first and last closely
        await expect(page.locator(`:text("${lastestProjectTitle}")`)).toBeVisible()
        await expect(page.locator(`img[src="${lastestProjectSrc}"]`).first()).toBeVisible()
        await expect(page.locator(`:text("${oldestProjectTitle}")`)).toBeVisible()
        await expect(page.locator(`img[src="${oldestProjectSrc}"]`).first()).toBeVisible()

        // check theres the correct total
        await expect(page.locator(".gallery-excerpt")).toHaveCount(6)
    });


    test('displays all 6 projects in a 3 column grid reverse sorted by date', async ({ page }) => {
        let x0y0Title = `:text("Newest Project")`;
        let x1y0Title = `:text("Project 2")`;
        let x2y0Title = `:text("Project 3")`;
        let x0y1Title = `:text("Project 4")`;
        let x1y1Title = `:text("Project 5")`;
        let x2y1Title = `:text("Oldest Project")`;

        // 0,0
        await expect(page.locator(`${x0y0Title}:left-of(${x1y0Title})`)).toBeVisible()
        await expect(page.locator(`${x0y0Title}:above(${x0y1Title})`)).toBeVisible()

        // 1,0
        await expect(page.locator(`${x2y0Title}:right-of(${x1y0Title})`)).toBeVisible()
        await expect(   page.locator(`${x1y1Title}:below(${x1y0Title})`)).toBeVisible()

        await expect(page.locator(`${x2y0Title}:above(${x1y1Title})`)).toBeVisible() // 2,0
        await expect(page.locator(`${x0y0Title}:left-of(${x1y1Title})`)).toBeVisible() // 0,1
        await expect(page.locator(`${x1y0Title}:left-of(${x2y1Title})`)).toBeVisible() // 1,1 & 2,1
    });


})
