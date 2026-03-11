import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomeLocators } from '../locators/homeLocators';
import { Logger } from '../utils/logger';
import { URLS } from '../constants/urls';

/**
 * Home/Inventory Page Object
 * Handles all inventory/products page interactions
 */
export class HomePage extends BasePage {
  // Locators
  private appLogo!: Locator;
  private shoppingCartLink!: Locator;
  private shoppingCartBadge!: Locator;
  private menuButton!: Locator;
  private logoutLink!: Locator;
  private inventoryContainer!: Locator;
  private inventoryItems!: Locator;
  private productSort!: Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  /**
   * Initialize all locators
   */
  private initializeLocators(): void {
    this.appLogo = this.page.locator(HomeLocators.appLogo);
    this.shoppingCartLink = this.page.locator(HomeLocators.shoppingCartLink);
    this.shoppingCartBadge = this.page.locator(HomeLocators.shoppingCartBadge);
    this.menuButton = this.page.locator(HomeLocators.menuButton);
    this.logoutLink = this.page.locator(HomeLocators.logoutLink);
    this.inventoryContainer = this.page.locator(HomeLocators.inventoryContainer);
    this.inventoryItems = this.page.locator(HomeLocators.inventoryItem);
    this.productSort = this.page.locator(HomeLocators.productSort);
  }

  /**
   * Navigate to inventory page
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to inventory page');
    await this.navigateTo(URLS.INVENTORY);
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    Logger.step('Verifying inventory page is loaded');
    return await this.isVisible(this.inventoryContainer);
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    Logger.step('Getting product count');
    return await this.inventoryItems.count();
  }

  /**
   * Add product to cart by name
   */
  async addProductToCart(productName: string): Promise<void> {
    Logger.step(`Adding product to cart: ${productName}`);
    const addButton = this.page.locator(`[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await addButton.click();
  }

  /**
   * Remove product from cart by name
   */
  async removeProductFromCart(productName: string): Promise<void> {
    Logger.step(`Removing product from cart: ${productName}`);
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  /**
   * Click on product by name
   */
  async clickProduct(productName: string): Promise<void> {
    Logger.step(`Clicking on product: ${productName}`);
    await this.page.locator(HomeLocators.inventoryItemName, { hasText: productName }).click();
  }

  /**
   * Get cart badge count
   */
  async getCartBadgeCount(): Promise<string> {
    Logger.step('Getting cart badge count');
    if (await this.isVisible(this.shoppingCartBadge)) {
      return await this.getText(this.shoppingCartBadge);
    }
    return '0';
  }

  /**
   * Click shopping cart
   */
  async clickShoppingCart(): Promise<void> {
    Logger.step('Clicking shopping cart');
    await this.shoppingCartLink.click();
  }

  /**
   * Open menu
   */
  async openMenu(): Promise<void> {
    Logger.step('Opening menu');
    await this.menuButton.click();
    await this.waitHelper.waitForElementVisible(this.logoutLink);
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    Logger.step('Logging out');
    await this.openMenu();
    await this.logoutLink.click();
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    Logger.step(`Sorting products by: ${sortOption}`);
    await this.productSort.selectOption(sortOption);
  }

  /**
   * Get all product names
   */
  async getAllProductNames(): Promise<string[]> {
    Logger.step('Getting all product names');
    const names = await this.page.locator(HomeLocators.inventoryItemName).allTextContents();
    return names;
  }

  /**
   * Get all product prices
   */
  async getAllProductPrices(): Promise<string[]> {
    Logger.step('Getting all product prices');
    const prices = await this.page.locator(HomeLocators.inventoryItemPrice).allTextContents();
    return prices;
  }

  /**
   * Get product price by name
   */
  async getProductPrice(productName: string): Promise<string> {
    Logger.step(`Getting price for product: ${productName}`);
    const productItem = this.page.locator(HomeLocators.inventoryItem)
      .filter({ has: this.page.locator(HomeLocators.inventoryItemName, { hasText: productName }) });
    const price = await productItem.locator(HomeLocators.inventoryItemPrice).textContent();
    return price || '';
  }

  /**
   * Verify product is displayed
   */
  async isProductDisplayed(productName: string): Promise<boolean> {
    Logger.step(`Checking if product is displayed: ${productName}`);
    const product = this.page.locator(HomeLocators.inventoryItemName, { hasText: productName });
    return await product.isVisible();
  }

  /**
   * Add multiple products to cart
   */
  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    Logger.step(`Adding ${productNames.length} products to cart`);
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  /**
   * Get first product name
   */
  async getFirstProductName(): Promise<string> {
    Logger.step('Getting first product name');
    return await this.inventoryItems.first().locator(HomeLocators.inventoryItemName).textContent() || '';
  }
}

export default HomePage;
