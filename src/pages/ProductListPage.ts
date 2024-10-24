import { Page, expect } from "@playwright/test";

export default class ProductListPage {

  private readonly titleSelector = ".title";
  private readonly productImgSelector = ".inventory_item_img";
  private readonly shoppingCartIcon = ".shopping_cart_link";
  private readonly shoppingCartBadge = ".shopping_cart_badge";
  private readonly productNameSelector = ".inventory_item_name";

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectTitleToBeVisible() {
    await expect(this.page.locator(this.titleSelector).and(this.page.getByText("Products"))).toBeVisible();
  }

  async addProductToShoppingCart(num: number) {
    for (let i = 0; i < num; i++) {
      await this.page.getByRole("button", { name: "Add to cart" }).nth(i).click();
    }
  }

  async expectTheShoppingCartBadgeToBeNotVisible() {
    await expect(this.page.locator(this.shoppingCartBadge)).not.toBeVisible();
  }

  async expectTheNumberInShoppingCartBadgeIncreased(num: string) {
    await expect(this.page.locator(this.shoppingCartBadge)).toHaveText(num);
  }

  async removeProductFromShoppingCart(num: number) {
    for (let i = num - 1; i >= 0; i--) {
      await this.page.getByRole("button", { name: "Remove" }).nth(i).click();
    }
  }

  async expectTheNumberInShoppingCartBadgeDecreased() {
    await expect(this.page.locator(this.shoppingCartBadge)).toHaveText("0");
  }

  async clickProductImg() {
    await this.page.locator(this.productImgSelector).first().click();
  }

  async clickShoppingCartIcon() {
    await this.page.locator(this.shoppingCartIcon).click();
  }

  async productName() {
    return await this.page.locator(this.productNameSelector).textContent();
  }
}
