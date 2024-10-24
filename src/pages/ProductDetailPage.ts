import { Page, expect } from "@playwright/test";

export default class ProductDetailPage {

  private readonly page: Page;
  private readonly productNameLocator = ".inventory_details_name.large_size"

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToShoppingCart() {
    await this.page.getByRole("button", { name: "Add to cart" }).click();
  }

  async removeProductFromShoppingCart() {
    await this.page.getByRole("button", { name: "Remove" }).click();
  }

  async productName() {
    return await this.page.locator(this.productNameLocator).textContent();
  }

}
