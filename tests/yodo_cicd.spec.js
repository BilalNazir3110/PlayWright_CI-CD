//npm init -y
//npm install @playwright/test
//npx playwright install

import { test, expect } from '@playwright/test'

        test('Ecommerce products selection Checkout Test Case', async ({ page }) => {

        page.on('framenavigated', async frame => {
        if (frame === page.mainFrame()) {
        const url = frame.url();
        console.log(`Navigated to: ${url}`)
        const resp = await page.request.get(url)     //
        console.log(resp.status())
        expect(resp.status(), `Navigation failed for ${url}`).toBe(200)
        }
      })
         
         await page.goto("https://www.saucedemo.com/v1/")
         const title = await page.title()
         await expect(title).toBe("Swag Labs")
         await page.locator("//input[@id='user-name']").fill("standard_user")
         await page.locator("//input[@id='password']").fill("secret_sauce")
         await page.locator("//input[@id='login-button']").click()
         await page.waitForTimeout(2000)
         let products = await page.$$(".inventory_item")
         let product
         let click=0
         let targets = [
                    "Sauce Labs Bike Light",
                    "Sauce Labs Onesie",
                    "Test.allTheThings() T-Shirt (Red)"
                ];
         for(let i=0 ; i<products.length ; i++)
         {
                product = await products[i]
                let producttext = await products[i].textContent()
                if(targets.some(t => producttext.includes(t)))
                {
                        click++
                        await page.waitForTimeout(2000)
                        let cb = await product.$("//button[text()='ADD TO CART']")
                        await cb.click()
                }
                if (click === targets.length) {
                    console.log("All target products added, breaking loop.");
                    break;
                }   
         }
           await page.locator(".shopping_cart_container").click()
           await page.waitForTimeout(2000)
           await page.locator(".checkout_button").click()
           await page.locator("//input[@id='first-name']").fill("Yodo")
           await page.locator("//input[@id='last-name']").fill("Designs")
           await page.locator("//input[@id='postal-code']").fill("54000")
           await page.waitForTimeout(2000)
           const con_btn = await page.locator(".cart_button")
           con_btn.click()
           await page.waitForTimeout(3000)
           const finish_btn = await page.locator("//a[normalize-space()='FINISH']")
           finish_btn.click()
           let ty_text = await page.locator(".complete-header").textContent()
           await expect(ty_text).toBe("THANK YOU FOR YOUR ORDER")
        })