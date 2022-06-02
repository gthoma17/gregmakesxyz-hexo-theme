import {expect, test} from '@playwright/test';

const config = require('../fixtures/hexo_site_config_as_json.json');

test.describe('project category', ()=>{
    const oldestProjectTitle = "Oldest Project";
    const oldestProjectSrc = "/images/oldest-project.jpeg";
    const lastestProjectTitle = "Newest Project";
    const lastestProjectSrc = "/images/newest-project.gif";
    const latestProjectExcerpt = "This is the latest project excerpt"
    const latestProjectUrl = "/2022/01/05/projects/newestProject/"

    test.beforeEach(async ({ page }) => await page.goto('http://localhost:4000/categories/projects/'));

    test('<head> concatenates title from config with Category name in Title Case', async ({ page }) => {
        await expect(page).toHaveTitle("Projects | " + config.title);
    });

    test('displays the projects with their images', async ({ page }) => {
        // check the first and last closely
        await expect(page.locator(text(lastestProjectTitle))).toBeVisible()
        await expect(page.locator(imgSrc(lastestProjectSrc))).toBeVisible()
        await expect(page.locator(text(oldestProjectTitle))).toBeVisible()
        await expect(page.locator(imgSrc(oldestProjectSrc))).toBeVisible()

        // check theres the correct total
        await expect(page.locator(".gallery-excerpt")).toHaveCount(6)
    });


    test('displays all 6 projects in a 3 column grid reverse sorted by date', async ({ page }) => {
        let x0y0Title = "Newest Project";
        let x1y0Title = "Project 2";
        let x2y0Title = "Project 3";
        let x0y1Title = "Project 4";
        let x1y1Title = "Project 5";
        let x2y1Title = "Oldest Project";

        // 0,0
        await expect(page.locator(text(x0y0Title)+leftOf(text(x1y0Title)))).toBeVisible()
        await expect(page.locator(text(x0y0Title)+leftOf(text(x1y0Title)))).toBeVisible()
        await expect(page.locator(text(x0y0Title)+above(text(x0y1Title)))).toBeVisible()

        // 1,0
        await expect(page.locator(text(x2y0Title)+rightOf(text(x1y0Title)))).toBeVisible()
        await expect(page.locator(text(x1y1Title)+below(text(x1y0Title)))).toBeVisible()

        await expect(page.locator(text(x2y0Title)+above(text(x1y1Title)))).toBeVisible() // 2,0
        await expect(page.locator(text(x0y0Title)+leftOf(text(x1y1Title)))).toBeVisible() // 0,1
        await expect(page.locator(text(x1y0Title)+leftOf(text(x2y1Title)))).toBeVisible() // 1,1 & 2,1
    });

    test('the excerpt has image, title, and excerpt', async ({ page }) => {
        await expect(page.locator(imgSrc(lastestProjectSrc))).toBeVisible()
        await expect(page.locator(text(lastestProjectTitle)+above(text(latestProjectExcerpt)))).toBeVisible()
    })

    test('clicking a title opens the details page', async ({ page }) => {
        page.click(text(lastestProjectTitle))
        await expect(page).toHaveURL(new RegExp("^.*"+latestProjectUrl+"$"))
    })


})

const text = (inner: string): string => `:text("${inner}")`
const imgSrc = (inner: string): string => `img[src="${inner}"]`
const leftOf = (inner: string): string => `:left-of(${inner})`
const rightOf = (inner: string): string => `:right-of(${inner})`
const above = (inner: string): string => `:above(${inner})`
const below = (inner: string): string => `:below(${inner})`
