import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartLocators } from '../locators/cartLocators';
import { Logger } from '../utils/logger';
import { URLS } from '../constants/urls';

/**
 * Cart Page Object
 * Handles all shopping cart page interactions
 */
export class CartPage extends BasePage {
  // Locators
  private cartList! : Locator;
  private cartItems! : Locator;
  private continueShoppingButton! : Locator;
  private checkoutButton! : Locator;
  private shoppingCartBadge! : Locator;

  constructor(page: Page) {
    super(page);
    this.initializeLocators();
  }

  /**
   * Initialize all locators
   */
  private initializeLocators(): void {
    this.cartList = this.page.locator(CartLocators.cartList);
    this.cartItems = this.page.locator(CartLocators.cartItem);
    this.continueShoppingButton = this.page.locator(CartLocators.continueShoppingButton);
    this.checkoutButton = this.page.locator(CartLocators.checkoutButton);
    this.shoppingCartBadge = this.page.locator(CartLocators.shoppingCartBadge);
  }

  /**
   * Navigate to cart page
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to cart page');
    await this.navigateTo(URLS.CART);
  }

  /**
   * Verify page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    Logger.step('Verifying cart page is loaded');
    return await this.isVisible(this.cartList);
  }

  /**
   * Get cart items count
   */
  async getCartItemsCount(): Promise<number> {
    Logger.step('Getting cart items count');
    return await this.cartItems.count();
  }

  /**
   * Get cart item names
   */
  async getCartItemNames(): Promise<string[]> {
    Logger.step('Getting cart item names');
    const names = await this.page.locator(CartLocators.inventoryItemName).allTextContents();
    return names.map(name => name.trim());
  }

  /**
   * Get cart item prices
   */
  async getCartItemPrices(): Promise<string[]> {
    Logger.step('Getting cart item prices');
    const prices = await this.page.locator(CartLocators.inventoryItemPrice).allTextContents();
    return prices.map(price => price.trim());
  }

  /**
   * Remove item from cart by name
   */
  async removeItem(productName: string): Promise<void> {
    Logger.step(`Removing item from cart: ${productName}`);
    const removeButton = this.page.locator(`[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`);
    await removeButton.click();
  }

  /**
   * Click continue shopping
   */
  async clickContinueShopping(): Promise<void> {
    Logger.step('Clicking continue shopping button');
    await this.continueShoppingButton.click();
  }

  /**
   * Click checkout
   */
  async clickCheckout(): Promise<void> {
    Logger.step('Clicking checkout button');
    await this.checkoutButton.click();
  }

  /**
   * Verify item is in cart
   */
  async isItemInCart(productName: string): Promise<boolean> {
    Logger.step(`Checking if item is in cart: ${productName}`);
    const itemNames = await this.getCartItemNames();
    return itemNames.includes(productName);
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
   * Clear cart
   */
  async clearCart(): Promise<void> {
    Logger.step('Clearing cart');
    const count = await this.getCartItemsCount();
    for (let i = 0; i < count; i++) {
      const removeButtons = this.page.locator(CartLocators.removeButton);
      await removeButtons.first().click();
    }
  }

  /**
   * Get item quantity
   */
  async getItemQuantity(productName: string): Promise<string> {
    Logger.step(`Getting quantity for item: ${productName}`);
    const item = this.page.locator(CartLocators.cartItem)
      .filter({ has: this.page.locator(CartLocators.inventoryItemName, { hasText: productName }) });
    const quantity = await item.locator(CartLocators.cartQuantity).textContent();
    return quantity || '0';
  }

  /**
   * Verify cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    Logger.step('Checking if cart is empty');
    const count = await this.getCartItemsCount();
    return count === 0;
  }

  /**
   * Get total cart value
   */
  async getTotalCartValue(): Promise<number> {
    Logger.step('Calculating total cart value');
    const prices = await this.getCartItemPrices();
    let total = 0;
    for (const price of prices) {
      const numericPrice = parseFloat(price.replace('$', ''));
      total += numericPrice;
    }
    return total;
  }
}

export default CartPage;
