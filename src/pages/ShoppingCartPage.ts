import { Page, expect } from "@playwright/test";

export default class ShoppingCartPage {

  private readonly page: Page;
  private readonly titleSelector = ".title";
  private readonly productNameSelector = ".inventory_item_name";

  constructor(page: Page) {
    this.page = page;
  }

  async expectTitleToBeVisible() {
    await expect(this.page.locator(this.titleSelector).and(this.page.getByText("Your Cart"))).toBeVisible();
  }

  async productName() {
    return await this.page.locator(this.productNameSelector).textContent();
  }

  async removeProductFromShoppingCart(num: number) {
    for (let i = num - 1; i >= 0; i--) {
      await this.page.getByRole("button", { name: "Remove" }).nth(i).click();
    }
  }

  async expectProductIsGone() {
    await expect(this.page.locator(this.productNameSelector)).not.toBeVisible();
  }

  async clickContinueButton() {
    await this.page.getByRole("button", { name: "Continue Shopping" }).click();
  }

  async clickCheckOutButton() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }

  async clickProduct() {
    await this.page.locator(this.productNameSelector).click()
  }

}
