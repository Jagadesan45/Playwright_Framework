# Playwright Enterprise Framework - Complete Setup Guide

## 📋 Overview

This guide will walk you through setting up and running the Playwright Enterprise Test Automation Framework step by step.

## Step 1: System Prerequisites

Before starting, ensure you have:

### Required Software
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Visual Studio Code** (recommended) - [Download](https://code.visualstudio.com/)

### Verify Installation
```bash
node --version  # Should show v16.x.x or higher
npm --version   # Should show 8.x.x or higher
git --version   # Should show git version
```

## Step 2: Project Setup

### 2.1 Extract the Framework
Extract the `playwright-enterprise-framework` folder to your desired location.

### 2.2 Open in IDE
```bash
cd playwright-enterprise-framework
code .  # Opens in VS Code
```

### 2.3 Install Dependencies
```bash
npm install
```

This will install:
- @playwright/test
- TypeScript
- Winston (logging)
- Dotenv (environment management)
- Allure reporter

### 2.4 Install Playwright Browsers
```bash
npx playwright install
```

This downloads Chromium, Firefox, and WebKit browsers.

## Step 3: Environment Configuration

### 3.1 Create .env File
```bash
cp .env.example .env
```

### 3.2 Edit .env File (Optional)
Open `.env` and modify if needed:
```env
BASE_URL=https://www.saucedemo.com
HEADLESS=false
BROWSER=chromium
WORKERS=4
```

## Step 4: Verify Installation

### 4.1 Run a Sample Test
```bash
npm test -- src/tests/login/login.spec.ts
```

You should see tests running in browser windows.

### 4.2 Check Test Results
```bash
npm run report
```

This opens the HTML report in your browser.

## Step 5: Understanding the Framework

### Directory Structure

```
src/
├── pages/          - Page Object Models (interaction logic)
├── locators/       - Element selectors (centralized)
├── tests/          - Test specifications
├── fixtures/       - Custom test fixtures
├── utils/          - Helper utilities
├── config/         - Configuration files
├── test-data/      - Test data (JSON files)
├── constants/      - Constants (URLs, etc.)
└── services/       - Business logic services
```

### Key Components

#### 1. Page Objects (src/pages/)
- **BasePage.ts**: Common methods for all pages
- **LoginPage.ts**: Login page interactions
- **HomePage.ts**: Home/Inventory page interactions
- **CartPage.ts**: Shopping cart interactions
- **CheckoutPage.ts**: Checkout process interactions

#### 2. Locators (src/locators/)
- Centralized element selectors
- Easy to maintain and update

#### 3. Fixtures (src/fixtures/baseTest.ts)
- Pre-initialized page objects
- Automatic setup and teardown

#### 4. Utilities (src/utils/)
- **logger.ts**: Logging utility
- **waitHelper.ts**: Wait/synchronization helpers
- **randomHelper.ts**: Random data generation
- **apiHelper.ts**: API testing support

## Step 6: Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run with debugging
npm run test:debug

# Run with UI mode
npm run test:ui
```

### Run Specific Tests

```bash
# Run only login tests
npm run test:login

# Run only checkout tests
npm run test:checkout

# Run specific browser
npm run test:chrome
npm run test:firefox
```

### Parallel Execution

```bash
# Run with 4 parallel workers
npm run test:parallel
```

## Step 7: Viewing Reports

### HTML Report
```bash
npm run report
```

### Allure Report (Advanced)
```bash
# Install Allure (one time)
npm install -g allure-commandline

# Generate report
npm run allure:generate

# Open report
npm run allure:open
```

## Step 8: Writing Your First Test

### Create a New Test File

1. Create file: `src/tests/products/products.spec.ts`

```typescript
import { test, expect } from '../../fixtures/baseTest';
import { Logger } from '../../utils/logger';

test.describe('Product Tests', () => {
  
  test.beforeEach(async ({ loginPage, userService }) => {
    const user = userService.getStandardUser();
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
  });

  test('should display all products', async ({ homePage }) => {
    Logger.step('Verifying products are displayed');
    
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    
    const products = await homePage.getAllProductNames();
    expect(products.length).toBe(productCount);
  });
});
```

### Run Your Test
```bash
npx playwright test src/tests/products/products.spec.ts
```

## Step 9: Common Tasks

### Add a New Page Object

1. Create locators file: `src/locators/newPageLocators.ts`
```typescript
export const NewPageLocators = {
  button: '[data-test="button"]',
  input: '[data-test="input"]',
} as const;
```

2. Create page object: `src/pages/NewPage.ts`
```typescript
import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { NewPageLocators } from '../locators/newPageLocators';

export class NewPage extends BasePage {
  private button: Locator;
  
  constructor(page: Page) {
    super(page);
    this.button = this.page.locator(NewPageLocators.button);
  }
  
  async clickButton(): Promise<void> {
    await this.button.click();
  }
}
```

3. Add to fixtures: `src/fixtures/baseTest.ts`
```typescript
import { NewPage } from '../pages/NewPage';

type MyFixtures = {
  // ... existing fixtures
  newPage: NewPage;
};

export const test = base.extend<MyFixtures>({
  // ... existing fixtures
  newPage: async ({ page }, use) => {
    const newPage = new NewPage(page);
    await use(newPage);
  },
});
```

### Use Logger in Tests

```typescript
import { Logger } from '../../utils/logger';

test('my test', async ({ }) => {
  Logger.info('Starting test');
  Logger.step('Performing action');
  Logger.error('Something went wrong', error);
});
```

### Generate Random Test Data

```typescript
import { RandomHelper } from '../../utils/randomHelper';

const email = RandomHelper.randomEmail();
const firstName = RandomHelper.randomFirstName();
const lastName = RandomHelper.randomLastName();
const postalCode = RandomHelper.randomPostalCode();
```

## Step 10: Best Practices

### 1. Test Structure (AAA Pattern)
```typescript
test('descriptive test name', async ({ }) => {
  // Arrange - Setup test data and preconditions
  const user = userService.getStandardUser();
  
  // Act - Perform the action
  await loginPage.login(user.username, user.password);
  
  // Assert - Verify the result
  expect(await homePage.verifyPageLoaded()).toBeTruthy();
});
```

### 2. Use Descriptive Names
```typescript
// Good
test('should add product to cart successfully', async ({}) => {});

// Bad
test('test1', async ({}) => {});
```

### 3. Independent Tests
Each test should be independent and able to run in any order.

### 4. Use Fixtures
Leverage fixtures for common setup instead of duplicating code.

### 5. Add Logging
Use Logger utility for better debugging and traceability.

## Step 11: Troubleshooting

### Tests Fail to Run
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reinstall browsers
npx playwright install
```

### TypeScript Errors
```bash
# Compile TypeScript
npx tsc --noEmit
```

### Port Already in Use
```bash
# Kill process on port
# On Windows
netstat -ano | findstr :9323
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:9323 | xargs kill -9
```

### Browser Not Found
```bash
# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

## Step 12: CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

## Step 13: Next Steps

### Enhance the Framework
1. Add more page objects for different pages
2. Create reusable test components
3. Integrate with CI/CD pipeline
4. Add visual regression testing
5. Implement API testing
6. Add database validation
7. Create custom reporters

### Learn More
- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📞 Need Help?

- Check the README.md file
- Review Playwright documentation
- Check test examples in src/tests/

---

**You're all set! Happy Testing! 🎉**
