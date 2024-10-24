import { Page, expect } from "@playwright/test";

export default class CheckOutPage {

  private readonly titleSelector = ".title";

  constructor(private page: Page) {

  }

  async expectTitleToBeVisible() {
    await expect(this.page.locator(this.titleSelector).and(this.page.getByText("Checkout: Your Information"))).toBeVisible();
  }
}