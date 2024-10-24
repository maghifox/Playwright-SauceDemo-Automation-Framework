import { Page, expect } from "@playwright/test";
import ProductListPage from "./ProductListPage";

export default class LoginPage {
  private readonly usernameInputSelector = "#user-name";
  private readonly passwordInputSelector = "#password";
  private readonly loginButtonSelector = "#login-button";
  private readonly MessageLocator = "[data-test=error]";

  constructor(private page: Page) {

  }

  async fillUsername(username: string) {
    await this.page.locator(this.usernameInputSelector).fill(username);
  }

  async fillPassword(password: string) {
    await this.page.locator(this.passwordInputSelector).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(this.loginButtonSelector).click()
  }

  async validateLoginSuccess() {
    const productListPage = new ProductListPage(this.page);
    return productListPage;
  }

  async expectErrorAccountLocked() {
    await expect(this.page.locator(this.MessageLocator)).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  }

  async expectErrorInvalidCredentials() {
    await expect(this.page.locator(this.MessageLocator)).toHaveText('Epic sadface: Username and password do not match any user in this service');
  }

  async expectErrorNoUsername() {
    await expect(this.page.locator(this.MessageLocator)).toHaveText('Epic sadface: Username is required');
  }

  async expectErrorNoPassword() {
    await expect(this.page.locator(this.MessageLocator)).toHaveText('Epic sadface: Password is required');
  }

}