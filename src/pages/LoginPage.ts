import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/loginLocators';
import { Logger } from '../utils/logger';
import { URLS } from '../constants/urls';

/**
 * Login Page Object
 * Handles all login page interactions
 */
export class LoginPage extends BasePage {
  // Locators
  private usernameInput!: Locator;
  private passwordInput!: Locator;
  private loginButton!: Locator;
  private errorContainer!: Locator;
  private errorButton!: Locator;
  private logo!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  /**
   * Initialize all locators
   */
  private initializeLocators(): void {
    this.usernameInput = this.page.locator(LoginLocators.usernameInput);
    this.passwordInput = this.page.locator(LoginLocators.passwordInput);
    this.loginButton = this.page.locator(LoginLocators.loginButton);
    this.errorContainer = this.page.locator(LoginLocators.errorContainer);
    this.errorButton = this.page.locator(LoginLocators.errorButton);
    this.logo = this.page.locator(LoginLocators.logo);
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to login page');
    await this.navigateTo(URLS.LOGIN);
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    Logger.step(`Entering username: ${username}`);
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    Logger.step('Entering password');
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    Logger.step('Clicking login button');
    await this.loginButton.click();
  }

  /**
   * Perform login action
   */
  async login(username: string, password: string): Promise<void> {
    Logger.step(`Logging in with username: ${username}`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    Logger.step('Getting error message');
    await this.waitForElement(this.errorContainer);
    return await this.getText(this.errorContainer);
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    Logger.step('Checking if error is displayed');
    return await this.isVisible(this.errorContainer);
  }

  /**
   * Close error message
   */
  async closeErrorMessage(): Promise<void> {
    Logger.step('Closing error message');
    await this.errorButton.click();
  }

  /**
   * Check if login button is enabled
   */
  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.isEnabled(this.loginButton);
  }

  /**
   * Check if logo is displayed
   */
  async isLogoDisplayed(): Promise<boolean> {
    return await this.isVisible(this.logo);
  }

  /**
   * Clear login form
   */
  async clearLoginForm(): Promise<void> {
    Logger.step('Clearing login form');
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Get username input value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Verify login page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    Logger.step('Verifying login page is loaded');
    const isUsernameVisible = await this.isVisible(this.usernameInput);
    const isPasswordVisible = await this.isVisible(this.passwordInput);
    const isLoginButtonVisible = await this.isVisible(this.loginButton);
    return isUsernameVisible && isPasswordVisible && isLoginButtonVisible;
  }
}

export default LoginPage;
