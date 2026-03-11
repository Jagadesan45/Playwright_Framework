import { Page, Locator } from '@playwright/test';
import { Logger } from './logger';

export class WaitHelper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Wait for element to be visible
   */
  async waitForElementVisible(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    try {
      Logger.debug(`Waiting for element to be visible with timeout: ${timeout}ms`);
      await locator.waitFor({ state: 'visible', timeout });
      Logger.debug('Element is now visible');
    } catch (error) {
      Logger.error('Element not visible within timeout', error);
      throw error;
    }
  }

  /**
   * Wait for element to be hidden
   */
  async waitForElementHidden(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    try {
      Logger.debug(`Waiting for element to be hidden with timeout: ${timeout}ms`);
      await locator.waitFor({ state: 'hidden', timeout });
      Logger.debug('Element is now hidden');
    } catch (error) {
      Logger.error('Element not hidden within timeout', error);
      throw error;
    }
  }

  /**
   * Wait for element to be attached to DOM
   */
  async waitForElementAttached(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    try {
      Logger.debug(`Waiting for element to be attached with timeout: ${timeout}ms`);
      await locator.waitFor({ state: 'attached', timeout });
      Logger.debug('Element is now attached');
    } catch (error) {
      Logger.error('Element not attached within timeout', error);
      throw error;
    }
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    try {
      Logger.debug('Waiting for page to load');
      await this.page.waitForLoadState('load', { timeout });
      Logger.debug('Page loaded successfully');
    } catch (error) {
      Logger.error('Page load timeout', error);
      throw error;
    }
  }

  /**
   * Wait for network to be idle
   */
  async waitForNetworkIdle(timeout: number = 30000): Promise<void> {
    try {
      Logger.debug('Waiting for network to be idle');
      await this.page.waitForLoadState('networkidle', { timeout });
      Logger.debug('Network is now idle');
    } catch (error) {
      Logger.error('Network idle timeout', error);
      throw error;
    }
  }

  /**
   * Wait for specific URL
   */
  async waitForURL(url: string | RegExp, timeout: number = 30000): Promise<void> {
    try {
      Logger.debug(`Waiting for URL: ${url}`);
      await this.page.waitForURL(url, { timeout });
      Logger.debug('URL matched successfully');
    } catch (error) {
      Logger.error('URL wait timeout', error);
      throw error;
    }
  }

  /**
   * Wait for custom timeout
   */
  async wait(milliseconds: number): Promise<void> {
    Logger.debug(`Waiting for ${milliseconds}ms`);
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Wait for element to be clickable (visible and enabled)
   */
  async waitForElementClickable(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    try {
      Logger.debug('Waiting for element to be clickable');
      await locator.waitFor({ state: 'visible', timeout });
      await locator.waitFor({ state: 'attached', timeout });
      const isEnabled = await locator.isEnabled();
      if (!isEnabled) {
        throw new Error('Element is not enabled');
      }
      Logger.debug('Element is now clickable');
    } catch (error) {
      Logger.error('Element not clickable within timeout', error);
      throw error;
    }
  }

  /**
   * Wait for text to be present in element
   */
  async waitForText(
    locator: Locator,
    text: string,
    timeout: number = 30000
  ): Promise<void> {
    try {
      Logger.debug(`Waiting for text: "${text}"`);
      await locator.filter({ hasText: text }).waitFor({ timeout });
      Logger.debug('Text found in element');
    } catch (error) {
      Logger.error(`Text "${text}" not found within timeout`, error);
      throw error;
    }
  }
}

export default WaitHelper;
