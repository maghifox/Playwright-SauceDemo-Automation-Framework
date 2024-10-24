import { Page, expect } from "@playwright/test";
import exp from "constants";

export default class ProductListPage {

  private readonly titleSelector = ".title";
  private readonly productImgSelector = ".inventory_item_img";
  private readonly shoppingCartIcon = ".shopping_cart_link";
  private readonly shoppingCartBadge = ".shopping_cart_badge";
  private readonly productNameSelector = ".inventory_item_name";
  private readonly filterLocator = ".product_sort_container";
  private readonly productPriceSelector = ".inventory_item_price";

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

  async getAllProductName() {
    const allProductNameClass = await this.page.locator(this.productNameSelector).all();
    const productNameArray: string[] = [];
    for (let i = 0; i < (allProductNameClass).length; i++)
      productNameArray[i] = (await allProductNameClass[i].textContent())!;

    return productNameArray;
  }

  async selectFilter(sort: string) {
    await this.page.locator(this.filterLocator).selectOption({ value: sort });
  }

  async expectProductNameSorted(pro1: string[], pro2: string[]) {
    expect(pro1).toEqual(pro2);
  }

  async getAllProductPrice() {
    const allProductPriceClass = await this.page.locator(this.productPriceSelector).all();
    const productPriceArray: number[] = [];
    for (let i = 0; i < (allProductPriceClass).length; i++) {
      let num = (await allProductPriceClass[i].textContent())!;
      productPriceArray[i] = Number(num.replace(/[^0-9]/, ""));
    }

    return productPriceArray;
  }

  async expectProductPriceSorted(pro1: number[], pro2: number[]) {
    expect(pro1).toEqual(pro2);
  }

}
