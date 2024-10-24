import { test, expect } from "@playwright/test";
import ProductListPage from "../pages/ProductListPage";

let productListPage: ProductListPage;

test.beforeEach(async ({ page }) => {
  await page.goto("/inventory.html");
  productListPage = new ProductListPage(page);

});

test("Verify the functionality of sort products by name a-z", async ({ page }) => {
  const prod1 = await productListPage.getAllProductName();
  prod1.sort();

  await productListPage.selectFilter("az");
  const prod2 = await productListPage.getAllProductName();

  await productListPage.expectProductNameSorted(prod1, prod2);
});

test("Verify the functionality of sort products by name z-a", async ({ page }) => {
  const prod1 = await productListPage.getAllProductName();
  prod1.sort((a, b) => b.localeCompare(a));
  await productListPage.selectFilter("za");
  const prod2 = await productListPage.getAllProductName();
  await productListPage.expectProductNameSorted(prod1, prod2);
});

test("Verify the functionality of sort products by prize low to high", async ({ page }) => {
  const prod1 = await productListPage.getAllProductPrice();
  prod1.sort(function (a, b) {
    return a - b;
  });
  await productListPage.selectFilter("lohi");
  const prod2 = await productListPage.getAllProductPrice();
  await productListPage.expectProductPriceSorted(prod1, prod2);
});

test("Verify the functionality of sort products by prize high to low", async ({ page }) => {
  const prod1 = await productListPage.getAllProductPrice();
  prod1.sort(function (a, b) {
    return b - a;
  });

  await productListPage.selectFilter("hilo");

  const prod2 = await productListPage.getAllProductPrice();
  await productListPage.expectProductPriceSorted(prod1, prod2);
});
