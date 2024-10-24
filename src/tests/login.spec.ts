import { test } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

test.beforeEach(async ({ page }) => {
   await page.goto('/');
});

test("Verify login is successful using valid credentials", async ({ page }) => {

   const loginPage = new LoginPage(page);

   await loginPage.fillUsername(process.env.userid!);
   await loginPage.fillPassword(process.env.password!);
   await loginPage.clickLoginButton();

   const productListPage = await loginPage.validateLoginSuccess();
   await productListPage.expectTitleToBeVisible();

});

test("Verify login failure using a locked account", async ({ page }) => {

   const loginPage = new LoginPage(page);

   await loginPage.fillUsername(process.env.useridlocked!);
   await loginPage.fillPassword(process.env.password!);
   await loginPage.clickLoginButton();

   await loginPage.expectErrorAccountLocked();
});

test("Verify login failure using invalid credentials", async ({ page }) => {

   const loginPage = new LoginPage(page);

   await loginPage.fillUsername(process.env.userid!);
   await loginPage.fillPassword("password");
   await loginPage.clickLoginButton();

   await loginPage.expectErrorInvalidCredentials();
});

test("Verify login failure using no username", async ({ page }) => {

   const loginPage = new LoginPage(page);

   await loginPage.fillUsername("");
   await loginPage.fillPassword(process.env.password!);
   await loginPage.clickLoginButton();

   await loginPage.expectErrorNoUsername();
});

test("Verify login failure using no password", async ({ page }) => {

   const loginPage = new LoginPage(page);

   await loginPage.fillUsername(process.env.userid!);
   await loginPage.fillPassword("");
   await loginPage.clickLoginButton();

   await loginPage.expectErrorNoPassword();
});

