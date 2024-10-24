import { test, expect } from "@playwright/test";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import exp from "constants";
import CheckOutPage from "../pages/CheckoutPage";

test.beforeEach(async ({ page }) => {
   await page.goto("/inventory.html");
});

test("Verify the functionality of adding a product to shopping cart on product list page", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.expectTheShoppingCartBadgeToBeNotVisible();
   await productListPage.addProductToShoppingCart(1);
   await productListPage.expectTheNumberInShoppingCartBadgeIncreased("1");
});

test("Verify the functionality of adding multiple products to shopping cart", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.expectTheShoppingCartBadgeToBeNotVisible();
   await productListPage.addProductToShoppingCart(3);
   await productListPage.expectTheNumberInShoppingCartBadgeIncreased("3");
});


test("Verify the functionality of removing a product from shopping cart on product list page", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.addProductToShoppingCart(1);
   await productListPage.expectTheNumberInShoppingCartBadgeIncreased("1");
   await productListPage.removeProductFromShoppingCart(1);
   await productListPage.expectTheShoppingCartBadgeToBeNotVisible();
});

test("Verify the functionality of removing multiple products from shopping cart", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.addProductToShoppingCart(3);
   await productListPage.expectTheNumberInShoppingCartBadgeIncreased("3");
   await productListPage.removeProductFromShoppingCart(3);
   await productListPage.expectTheShoppingCartBadgeToBeNotVisible();
});


test("Verify the functionality of adding a product to shopping cart on product detail page", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.clickProductImg();

   const productDetailPage = new ProductDetailPage(page);

   await productDetailPage.addProductToShoppingCart();
   await productListPage.expectTheNumberInShoppingCartBadgeIncreased("1");

});

test("Verify the functionality of removing a product to shopping cart on product detail page", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.clickProductImg();

   const productDetailPage = new ProductDetailPage(page);

   await productDetailPage.addProductToShoppingCart();
   await productListPage.expectTheNumberInShoppingCartBadgeIncreased("1");
   await productDetailPage.removeProductFromShoppingCart();
   await productListPage.expectTheShoppingCartBadgeToBeNotVisible();

});

test("Verify the navigation to shopping cart page after clicking the shopping cart icon", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.clickShoppingCartIcon();
   const shoppingCartPage = new ShoppingCartPage(page);
   await shoppingCartPage.expectTitleToBeVisible();

});

test("Verify the added product matches on shopping cart page", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.addProductToShoppingCart(1);
   await productListPage.clickShoppingCartIcon();
   const productName1 = await productListPage.productName();

   const shoppingCartPage = new ShoppingCartPage(page);

   const productName2 = await shoppingCartPage.productName();

   expect(productName1).toEqual(productName2);
});

test("Verify the functionality of remove product button on shopping cart page ", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.addProductToShoppingCart(1);
   await productListPage.clickShoppingCartIcon();

   const shoppingCartPage = new ShoppingCartPage(page);

   await shoppingCartPage.removeProductFromShoppingCart(1);
   await shoppingCartPage.expectProductIsGone();

});

test("Verify the functionality of continue shopping button on shopping cart page ", async ({ page }) => {

   const productListPage = new ProductListPage(page);

   await productListPage.clickShoppingCartIcon();
   const shoppingCartPage = new ShoppingCartPage(page);

   await shoppingCartPage.clickContinueButton();
   await productListPage.expectTitleToBeVisible();

});

test("Verify the functionality of checkout button on shopping cart page ", async ({ page }) => {

   const productListPage = new ProductListPage(page);
   const shoppingCartPage = new ShoppingCartPage(page);
   const checkoutPage = new CheckOutPage(page);

   await productListPage.addProductToShoppingCart(1);
   await productListPage.clickShoppingCartIcon();

   await shoppingCartPage.clickCheckOutButton();

   await checkoutPage.expectTitleToBeVisible();

});

test("Verify user can navigate to the product detail by clicking the product on shopping cart page ", async ({ page }) => {

   const productListPage = new ProductListPage(page);
   const shoppingCartPage = new ShoppingCartPage(page);
   const productDetailPage = new ProductDetailPage(page);

   await productListPage.addProductToShoppingCart(1);
   await productListPage.clickShoppingCartIcon();

   const productName1 = await shoppingCartPage.productName();
   await shoppingCartPage.clickProduct();

   const productName2 = await productDetailPage.productName();

   expect(productName1).toEqual(productName2);
});








