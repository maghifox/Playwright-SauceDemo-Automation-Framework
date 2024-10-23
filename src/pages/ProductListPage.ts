import { Page, expect } from "@playwright/test";

export default class ProductListPage {

   private readonly titleSelector = ".title";

   constructor(private page: Page) {

   }

   async expectTitleToBeVisible() {
      await expect(this.page.locator(this.titleSelector)).toBeVisible({ timeout: 15000 });
   }
}