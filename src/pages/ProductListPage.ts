import { Page, expect } from "@playwright/test";

export default class ProductListPage {

   private readonly titleLocator = ".title";

   constructor(private page: Page) {

   }

   async expectTitleToBeVisible() {
      await expect(this.page.locator(this.titleLocator)).toBeVisible({ timeout: 15000 });
   }
}