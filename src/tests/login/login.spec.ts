import { test, expect } from '../../fixtures/baseTest';
import { Logger } from '../../utils/logger';

/**
 * Login Test Suite
 * Tests all login functionality including positive and negative scenarios
 */
test.describe('Login Tests', () => {
  //checking
  /**
   * Before each test - navigate to login page
   */
  test.beforeEach(async ({ loginPage }) => {
    Logger.testStart('Login Test');
    await loginPage.goto();
  });

  /**
   * After each test - log test end
   */
  test.afterEach(async ({ }, testInfo) => {
    const status = testInfo.status === 'passed' ? 'PASSED' : 'FAILED';
    Logger.testEnd(testInfo.title, status);
  });

  /**
   * Test: Successful login with valid credentials
   */
  test('should login successfully with valid credentials', async ({ 
    loginPage, 
    homePage, 
    userService 
  }) => {
    // Arrange
    const user = userService.getStandardUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert
    await expect(homePage.getPage()).toHaveURL(/.*inventory.html/);
    const isHomePageLoaded = await homePage.verifyPageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
  });

  /**
   * Test: Login fails with locked out user
   */
  test('should show error for locked out user', async ({ 
    loginPage, 
    userService 
  }) => {
    // Arrange
    const user = userService.getLockedUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out');
  });

  /**
   * Test: Login fails with invalid credentials
   */
  test('should show error for invalid credentials', async ({ 
    loginPage, 
    userService 
  }) => {
    // Arrange
    const user = userService.getInvalidUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match');
  });

  /**
   * Test: Login fails with empty username
   */
  test('should show error when username is empty', async ({ loginPage }) => {
    // Act
    await loginPage.enterPassword('secret_sauce');
    await loginPage.clickLoginButton();
    
    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username is required');
  });

  /**
   * Test: Login fails with empty password
   */
  test('should show error when password is empty', async ({ loginPage }) => {
    // Act
    await loginPage.enterUsername('standard_user');
    await loginPage.clickLoginButton();
    
    // Assert
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Password is required');
  });

  /**
   * Test: Login page elements are visible
   */
  test('should display all login page elements', async ({ loginPage }) => {
    // Assert
    const isPageLoaded = await loginPage.verifyPageLoaded();
    expect(isPageLoaded).toBeTruthy();
    
    const isLogoDisplayed = await loginPage.isLogoDisplayed();
    expect(isLogoDisplayed).toBeTruthy();
    
    const isLoginButtonEnabled = await loginPage.isLoginButtonEnabled();
    expect(isLoginButtonEnabled).toBeTruthy();
  });

  /**
   * Test: Error message can be closed
   */
  test('should be able to close error message', async ({ 
    loginPage, 
    userService 
  }) => {
    // Arrange
    const user = userService.getInvalidUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    let isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    
    await loginPage.closeErrorMessage();
    
    // Assert
    isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeFalsy();
  });

  /**
   * Test: Login with problem user
   */
  test('should login with problem user', async ({ 
    loginPage, 
    homePage, 
    userService 
  }) => {
    // Arrange
    const user = userService.getProblemUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert
    await expect(homePage.getPage()).toHaveURL(/.*inventory.html/);
    const isHomePageLoaded = await homePage.verifyPageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
  });

  /**
   * Test: Login with performance glitch user
   */
  test('should login with performance glitch user', async ({ 
    loginPage, 
    homePage, 
    userService 
  }) => {
    // Arrange
    const user = userService.getPerformanceUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert - might take longer
    await expect(homePage.getPage()).toHaveURL(/.*inventory.html/, { timeout: 10000 });
    const isHomePageLoaded = await homePage.verifyPageLoaded();
    expect(isHomePageLoaded).toBeTruthy();
  });

  /* 
  15-03-2026 new scenario (login with external user but same password)
  */

   test("Verify login with external user",async ({
   loginPage,
   userService})=>{
   //Arrange
   const user=userService.getStandardUser();

   //Act
   await loginPage.login('Jagadish_User',user.password);

   //Assert
   const isErrorDisplayed =await loginPage.isErrorDisplayed();
   expect(isErrorDisplayed).toBeTruthy();

   const ErrorMessage:String= await loginPage.getErrorMessage();
   expect(ErrorMessage).toMatch(/Username and password do not match any user in this service/);
   
  }); 

});
