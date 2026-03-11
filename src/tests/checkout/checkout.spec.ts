import { test, expect } from '../../fixtures/baseTest';
import { Logger } from '../../utils/logger';

/**
 * Checkout Test Suite
 * Tests complete checkout flow including cart and purchase
 */
test.describe('Checkout Tests', () => {
  
  /**
   * Before each test - login and navigate to products
   */
  test.beforeEach(async ({ loginPage, homePage, userService }) => {
    Logger.testStart('Checkout Test');
    const user = userService.getStandardUser();
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await homePage.verifyPageLoaded();
  });

  /**
   * After each test - log test end
   */
  test.afterEach(async ({ }, testInfo) => {
    const status = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
    Logger.testEnd(testInfo.title, status);
  });

  /**
   * Test: Add product to cart
   */
  test('should add product to cart successfully', async ({ homePage, cartPage }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    
    // Act
    await homePage.addProductToCart(productName);
    const cartBadgeCount = await homePage.getCartBadgeCount();
    
    // Assert
    expect(cartBadgeCount).toBe('1');
    
    // Verify in cart
    await homePage.clickShoppingCart();
    const isInCart = await cartPage.isItemInCart(productName);
    expect(isInCart).toBeTruthy();
  });

  /**
   * Test: Add multiple products to cart
   */
  test('should add multiple products to cart', async ({ homePage, cartPage }) => {
    // Arrange
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt'
    ];
    
    // Act
    await homePage.addMultipleProductsToCart(products);
    
    // Assert
    const cartBadgeCount = await homePage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('3');
    
    // Verify all items in cart
    await homePage.clickShoppingCart();
    const cartItemsCount = await cartPage.getCartItemsCount();
    expect(cartItemsCount).toBe(3);
  });

  /**
   * Test: Remove product from cart
   */
  test('should remove product from cart', async ({ homePage, cartPage }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    await homePage.addProductToCart(productName);
    await homePage.clickShoppingCart();
    
    // Act
    await cartPage.removeItem(productName);
    
    // Assert
    const isCartEmpty = await cartPage.isCartEmpty();
    expect(isCartEmpty).toBeTruthy();
  });

  /**
   * Test: Complete checkout with single product
   */
  test('should complete checkout with single product', async ({ 
    homePage, 
    cartPage, 
    checkoutPage,
    userService 
  }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    const customer = userService.getRandomCustomer();
    
    // Act
    await homePage.addProductToCart(productName);
    await homePage.clickShoppingCart();
    await cartPage.clickCheckout();
    
    await checkoutPage.fillCheckoutInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    
    // Assert
    const isComplete = await checkoutPage.verifyOrderComplete();
    expect(isComplete).toBeTruthy();
    
    const completionHeader = await checkoutPage.getCompletionHeader();
    expect(completionHeader).toMatch(/thank you for your order/i);
  });

  /**
   * Test: Complete checkout with multiple products
   */
  test('should complete checkout with multiple products', async ({ 
    homePage, 
    cartPage, 
    checkoutPage,
    userService 
  }) => {
    // Arrange
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Fleece Jacket'
    ];
    const customer = userService.getRandomCustomer();
    
    // Act
    await homePage.addMultipleProductsToCart(products);
    await homePage.clickShoppingCart();
    
    const cartCount = await cartPage.getCartItemsCount();
    expect(cartCount).toBe(3);
    
    await cartPage.clickCheckout();
    await checkoutPage.completeCheckout(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    
    // Assert
    const isComplete = await checkoutPage.verifyOrderComplete();
    expect(isComplete).toBeTruthy();
  });

  /**
   * Test: Checkout validation - empty first name
   */
  test('should show error for empty first name in checkout', async ({ 
    homePage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Arrange
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.clickShoppingCart();
    await cartPage.clickCheckout();
    
    // Act
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinue();
    
    // Assert
    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Error: First Name is required');
  });

  /**
   * Test: Checkout validation - empty last name
   */
  test('should show error for empty last name in checkout', async ({ 
    homePage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Arrange
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.clickShoppingCart();
    await cartPage.clickCheckout();
    
    // Act
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterPostalCode('12345');
    await checkoutPage.clickContinue();
    
    // Assert
    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Error: Last Name is required');
  });

  /**
   * Test: Checkout validation - empty postal code
   */
  test('should show error for empty postal code in checkout', async ({ 
    homePage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Arrange
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.clickShoppingCart();
    await cartPage.clickCheckout();
    
    // Act
    await checkoutPage.enterFirstName('John');
    await checkoutPage.enterLastName('Doe');
    await checkoutPage.clickContinue();
    
    // Assert
    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage).toContain('Error: Postal Code is required');
  });

  /**
   * Test: Cancel checkout and return to cart
   */
  test('should cancel checkout and return to cart', async ({ 
    homePage, 
    cartPage, 
    checkoutPage 
  }) => {
    // Arrange
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.clickShoppingCart();
    await cartPage.clickCheckout();
    
    // Act
    await checkoutPage.clickCancel();
    
    // Assert
    await expect(cartPage.getPage()).toHaveURL(/.*cart.html/);
    const isCartPageLoaded = await cartPage.verifyPageLoaded();
    expect(isCartPageLoaded).toBeTruthy();
  });

  /**
   * Test: Continue shopping from cart
   */
  test('should continue shopping from cart', async ({ homePage, cartPage }) => {
    // Arrange
    await homePage.addProductToCart('Sauce Labs Backpack');
    await homePage.clickShoppingCart();
    
    // Act
    await cartPage.clickContinueShopping();
    
    // Assert
    await expect(homePage.getPage()).toHaveURL(/.*inventory.html/);
    const isHomePageLoaded = await homePage.verifyPageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
  });

  /**
   * Test: Verify checkout overview displays correct information
   */
  test('should display correct information in checkout overview', async ({ 
    homePage, 
    cartPage, 
    checkoutPage,
    userService 
  }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    const customer = userService.getRandomCustomer();
    
    // Act
    await homePage.addProductToCart(productName);
    await homePage.clickShoppingCart();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInformation(
      customer.firstName,
      customer.lastName,
      customer.postalCode
    );
    await checkoutPage.clickContinue();
    
    // Assert
    const itemsCount = await checkoutPage.getCartItemsCount();
    expect(itemsCount).toBe(1);
    
    const itemTotal = await checkoutPage.getItemTotal();
    expect(itemTotal).toBeTruthy();
    
    const tax = await checkoutPage.getTax();
    expect(tax).toBeTruthy();
    
    const total = await checkoutPage.getTotal();
    expect(total).toBeTruthy();
  });
});
