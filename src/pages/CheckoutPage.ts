import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CheckoutLocators } from '../locators/checkoutLocators';
import { Logger } from '../utils/logger';
import { URLS } from '../constants/urls';

/**
 * Checkout Page Object
 * Handles all checkout process interactions
 */
export class CheckoutPage extends BasePage {
  // Step One Locators
  private firstNameInput!: Locator;
  private lastNameInput!: Locator;
  private postalCodeInput!: Locator;
  private continueButton!: Locator;
  private cancelButton!: Locator;
  private errorContainer!: Locator;

  // Step Two Locators
  private cartItems!: Locator;
  private itemTotal!: Locator;
  private tax!: Locator;
  private total!: Locator;
  private finishButton!: Locator;

  // Complete Locators
  private completeHeader!: Locator;
  private completeText!: Locator;
  private backHomeButton!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  /**
   * Initialize all locators
   */
  private initializeLocators(): void {
    // Step One
    this.firstNameInput = this.page.locator(CheckoutLocators.firstName);
    this.lastNameInput = this.page.locator(CheckoutLocators.lastName);
    this.postalCodeInput = this.page.locator(CheckoutLocators.postalCode);
    this.continueButton = this.page.locator(CheckoutLocators.continueButton);
    this.cancelButton = this.page.locator(CheckoutLocators.cancelButton);
    this.errorContainer = this.page.locator(CheckoutLocators.errorContainer);

    // Step Two
    this.cartItems = this.page.locator(CheckoutLocators.cartItem);
    this.itemTotal = this.page.locator(CheckoutLocators.itemTotal);
    this.tax = this.page.locator(CheckoutLocators.tax);
    this.total = this.page.locator(CheckoutLocators.total);
    this.finishButton = this.page.locator(CheckoutLocators.finishButton);

    // Complete
    this.completeHeader = this.page.locator(CheckoutLocators.completeHeader);
    this.completeText = this.page.locator(CheckoutLocators.completeText);
    this.backHomeButton = this.page.locator(CheckoutLocators.backHomeButton);
  }

  /**
   * Navigate to checkout step one
   */
  async gotoStepOne(): Promise<void> {
    Logger.step('Navigating to checkout step one');
    await this.navigateTo(URLS.CHECKOUT_STEP_ONE);
  }

  /**
   * Navigate to checkout step two
   */
  async gotoStepTwo(): Promise<void> {
    Logger.step('Navigating to checkout step two');
    await this.navigateTo(URLS.CHECKOUT_STEP_TWO);
  }

  /**
   * Enter first name
   */
  async enterFirstName(firstName: string): Promise<void> {
    Logger.step(`Entering first name: ${firstName}`);
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Enter last name
   */
  async enterLastName(lastName: string): Promise<void> {
    Logger.step(`Entering last name: ${lastName}`);
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Enter postal code
   */
  async enterPostalCode(postalCode: string): Promise<void> {
    Logger.step(`Entering postal code: ${postalCode}`);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Fill checkout information
   */
  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    Logger.step('Filling checkout information');
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterPostalCode(postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    Logger.step('Clicking continue button');
    await this.continueButton.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    Logger.step('Clicking cancel button');
    await this.cancelButton.click();
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
    return await this.isVisible(this.errorContainer);
  }

  /**
   * Get item total
   */
  async getItemTotal(): Promise<string> {
    Logger.step('Getting item total');
    const text = await this.getText(this.itemTotal);
    return text.replace('Item total: ', '');
  }

  /**
   * Get tax
   */
  async getTax(): Promise<string> {
    Logger.step('Getting tax');
    const text = await this.getText(this.tax);
    return text.replace('Tax: ', '');
  }

  /**
   * Get total amount
   */
  async getTotal(): Promise<string> {
    Logger.step('Getting total amount');
    const text = await this.getText(this.total);
    return text.replace('Total: ', '');
  }

  /**
   * Get cart items count
   */
  async getCartItemsCount(): Promise<number> {
    Logger.step('Getting cart items count in checkout');
    return await this.cartItems.count();
  }

  /**
   * Click finish button
   */
  async clickFinish(): Promise<void> {
    Logger.step('Clicking finish button');
    await this.finishButton.click();
  }

  /**
   * Get completion header
   */
  async getCompletionHeader(): Promise<string> {
    Logger.step('Getting completion header');
    await this.waitForElement(this.completeHeader);
    return await this.getText(this.completeHeader);
  }

  /**
   * Get completion text
   */
  async getCompletionText(): Promise<string> {
    Logger.step('Getting completion text');
    return await this.getText(this.completeText);
  }

  /**
   * Verify order is complete
   */
  async verifyOrderComplete(): Promise<boolean> {
    Logger.step('Verifying order is complete');
    const header = await this.getCompletionHeader();
    return header.includes('Thank you for your order') || header.includes('THANK YOU FOR YOUR ORDER');
  }

  /**
   * Click back home button
   */
  async clickBackHome(): Promise<void> {
    Logger.step('Clicking back home button');
    await this.backHomeButton.click();
  }

  /**
   * Complete checkout process
   */
  async completeCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    Logger.step('Completing full checkout process');
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinue();
    await this.clickFinish();
  }

  /**
   * Verify checkout step one is loaded
   */
  async verifyStepOneLoaded(): Promise<boolean> {
    Logger.step('Verifying checkout step one is loaded');
    return await this.isVisible(this.firstNameInput);
  }

  /**
   * Verify checkout step two is loaded
   */
  async verifyStepTwoLoaded(): Promise<boolean> {
    Logger.step('Verifying checkout step two is loaded');
    return await this.isVisible(this.finishButton);
  }
}

export default CheckoutPage;
