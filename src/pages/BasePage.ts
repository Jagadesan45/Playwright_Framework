import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { WaitHelper } from '../utils/waitHelper';

/**
 * Base Page Object
 * Contains common methods used across all pages
 */
export class BasePage {
  protected page: Page;
  protected waitHelper: WaitHelper;

  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page);
  }

  /**
   * Navigate to URL
   */
  async navigateTo(url: string): Promise<void> {
    Logger.info(`Navigating to: ${url}`);
    await this.page.goto(url);
    await this.waitHelper.waitForPageLoad();
  }
//  Public getter for page
  public getPage(): Page {
    return this.page;
  }
  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    const title = await this.page.title();
    Logger.info(`Page title: ${title}`);
    return title;
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    Logger.info(`Current URL: ${url}`);
    return url;
  }

  /**
   * Click element
   */
  async click(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info('Clicking element');
    await element.click();
  }

  /**
   * Type text into input
   */
  async type(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Typing text: ${text}`);
    await element.fill(text);
  }

  /**
   * Clear and type
   */
  async clearAndType(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Clearing and typing text: ${text}`);
    await element.clear();
    await element.fill(text);
  }

  /**
   * Get text from element
   */
  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const text = await element.textContent() || '';
    Logger.info(`Retrieved text: ${text}`);
    return text.trim();
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const visible = await element.isVisible();
    Logger.info(`Element visible: ${visible}`);
    return visible;
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const enabled = await element.isEnabled();
    Logger.info(`Element enabled: ${enabled}`);
    return enabled;
  }

  /**
   * Wait for element
   */
  async waitForElement(locator: Locator | string, timeout: number = 30000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await this.waitHelper.waitForElementVisible(element, timeout);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    Logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    Logger.info('Reloading page');
    await this.page.reload();
    await this.waitHelper.waitForPageLoad();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    Logger.info('Navigating back');
    await this.page.goBack();
    await this.waitHelper.waitForPageLoad();
  }

  /**
   * Select dropdown by value
   */
  async selectDropdown(locator: Locator | string, value: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info(`Selecting dropdown value: ${value}`);
    await element.selectOption(value);
  }

  /**
   * Get attribute value
   */
  async getAttribute(locator: Locator | string, attribute: string): Promise<string | null> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const value = await element.getAttribute(attribute);
    Logger.info(`Attribute ${attribute}: ${value}`);
    return value;
  }

  /**
   * Get all matching elements
   */
  async getAllElements(selector: string): Promise<Locator[]> {
    const elements = await this.page.locator(selector).all();
    Logger.info(`Found ${elements.length} elements`);
    return elements;
  }

  /**
   * Count elements
   */
  async countElements(selector: string): Promise<number> {
    const count = await this.page.locator(selector).count();
    Logger.info(`Element count: ${count}`);
    return count;
  }

  /**
   * Hover over element
   */
  async hover(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    Logger.info('Hovering over element');
    await element.hover();
  }

  /**
   * Press key
   */
  async pressKey(key: string): Promise<void> {
    Logger.info(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  /**
   * Execute JavaScript
   */
  async executeScript(script: string): Promise<any> {
    Logger.info('Executing JavaScript');
    return await this.page.evaluate(script);
  }
}

export default BasePage;
