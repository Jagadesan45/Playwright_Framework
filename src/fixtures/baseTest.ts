import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { UserService } from '../services/userService';
import { Logger } from '../utils/logger';

/**
 * Extended test fixtures
 * Provides pre-initialized page objects and services to all tests
 */
type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  userService: UserService;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<MyFixtures>({
  /**
   * Login Page fixture
   */
  loginPage: async ({ page }, use) => {
    Logger.info('Initializing LoginPage fixture');
    const loginPage = new LoginPage(page);
    await use(loginPage);
    Logger.info('LoginPage fixture cleanup');
  },

  /**
   * Home Page fixture
   */
  homePage: async ({ page }, use) => {
    Logger.info('Initializing HomePage fixture');
    const homePage = new HomePage(page);
    await use(homePage);
    Logger.info('HomePage fixture cleanup');
  },

  /**
   * Cart Page fixture
   */
  cartPage: async ({ page }, use) => {
    Logger.info('Initializing CartPage fixture');
    const cartPage = new CartPage(page);
    await use(cartPage);
    Logger.info('CartPage fixture cleanup');
  },

  /**
   * Checkout Page fixture
   */
  checkoutPage: async ({ page }, use) => {
    Logger.info('Initializing CheckoutPage fixture');
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
    Logger.info('CheckoutPage fixture cleanup');
  },

  /**
   * User Service fixture
   */
  userService: async ({}, use) => {
    Logger.info('Initializing UserService fixture');
    const userService = new UserService();
    await use(userService);
    Logger.info('UserService fixture cleanup');
  },
});

/**
 * Export expect from @playwright/test
 */
export { expect } from '@playwright/test';
