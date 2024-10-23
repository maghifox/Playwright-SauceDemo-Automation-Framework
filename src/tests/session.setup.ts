import { test as setup } from "@playwright/test";
import LoginPage from "../pages/LoginPage";

setup("Authenticate", async ({ page }) => {

   const AUTH_FILE = "./src/config/auth.json"

   const loginPage = new LoginPage(page);

   await loginPage.navigateToLoginPage();
   await loginPage.fillUsername(process.env.userid!);
   await loginPage.fillPassword(process.env.password!);
   await loginPage.clickLoginButton();

   const homePage = await loginPage.validateLoginSuccess();
   await homePage.expectTitleToBeVisible();

   await page.context().storageState({ path: AUTH_FILE })

});