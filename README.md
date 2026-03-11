# Playwright Enterprise Test Automation Framework

A robust, scalable, and enterprise-level test automation framework built with Playwright and TypeScript.

## 🚀 Features

- **Page Object Model (POM)**: Maintainable and reusable page objects
- **TypeScript**: Type-safe code with better IDE support
- **Centralized Locators**: Easy maintenance of element selectors
- **Custom Fixtures**: Reusable test fixtures for faster test development
- **Utility Helpers**: Logger, Wait helpers, Random data generators, API helpers
- **Multiple Browsers**: Chrome, Firefox, Safari, Edge support
- **Parallel Execution**: Fast test execution with configurable workers
- **Rich Reporting**: HTML, JSON, JUnit, and Allure reports
- **Screenshot/Video**: Automatic capture on test failures
- **Environment Management**: Easy configuration via .env files
- **Service Layer**: Business logic abstraction for test data management

## 📁 Project Structure

```
playwright-enterprise-framework/
│
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   └── CartPage.ts
│   │
│   ├── locators/           # Centralized locators
│   │   ├── loginLocators.ts
│   │   ├── homeLocators.ts
│   │   ├── cartLocators.ts
│   │   └── checkoutLocators.ts
│   │
│   ├── tests/              # Test specifications
│   │   ├── login/
│   │   │   └── login.spec.ts
│   │   └── checkout/
│   │       └── checkout.spec.ts
│   │
│   ├── fixtures/           # Custom test fixtures
│   │   └── baseTest.ts
│   │
│   ├── utils/              # Utility helpers
│   │   ├── logger.ts
│   │   ├── waitHelper.ts
│   │   ├── randomHelper.ts
│   │   └── apiHelper.ts
│   │
│   ├── config/             # Configuration files
│   │   ├── env.ts
│   │   └── globalConfig.ts
│   │
│   ├── test-data/          # Test data
│   │   └── users.json
│   │
│   ├── constants/          # Constants
│   │   └── urls.ts
│   │
│   └── services/           # Business logic services
│       └── userService.ts
│
├── reports/                # Test reports
├── playwright.config.ts    # Playwright configuration
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd playwright-enterprise-framework
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Setup environment variables**
```bash
cp .env.example .env
# Edit .env file with your configuration
```

## 🎯 Usage

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui

# Run specific browser tests
npm run test:chrome
npm run test:firefox
npm run test:webkit

# Run specific test suite
npm run test:login
npm run test:checkout

# Run tests in parallel
npm run test:parallel
```

### Viewing Reports

```bash
# Open HTML report
npm run report

# Generate Allure report
npm run allure:generate

# Open Allure report
npm run allure:open
```

### Clean Test Artifacts

```bash
npm run clean
```

## 📝 Writing Tests

### Example Test

```typescript
import { test, expect } from '../../fixtures/baseTest';

test.describe('My Test Suite', () => {
  
  test.beforeEach(async ({ loginPage, userService }) => {
    const user = userService.getStandardUser();
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
  });

  test('should perform action successfully', async ({ homePage }) => {
    // Arrange
    const productName = 'Sauce Labs Backpack';
    
    // Act
    await homePage.addProductToCart(productName);
    
    // Assert
    const cartBadgeCount = await homePage.getCartBadgeCount();
    expect(cartBadgeCount).toBe('1');
  });
});
```

## 🏗️ Framework Architecture

### Page Object Model

Each page has its own class that extends `BasePage`:

```typescript
export class LoginPage extends BasePage {
  // Locators
  private usernameInput: Locator;
  
  // Methods
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
```

### Centralized Locators

Locators are stored in separate files:

```typescript
export const LoginLocators = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
} as const;
```

### Custom Fixtures

Fixtures provide pre-initialized page objects:

```typescript
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});
```

## ⚙️ Configuration

### Environment Variables

Configure via `.env` file:

```env
BASE_URL=https://www.saucedemo.com
HEADLESS=false
BROWSER=chromium
WORKERS=4
```

### Playwright Config

Main configuration in `playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './src/tests',
  timeout: 60 * 1000,
  retries: 2,
  workers: 4,
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

## 📊 Reporting

The framework supports multiple report formats:

- **HTML Report**: Interactive browser-based report
- **JSON Report**: Machine-readable test results
- **JUnit Report**: For CI/CD integration
- **Allure Report**: Advanced reporting with historical trends

## 🔧 Utilities

### Logger

```typescript
import { Logger } from '../utils/logger';

Logger.info('Information message');
Logger.error('Error message', error);
Logger.step('Test step description');
```

### Wait Helper

```typescript
await waitHelper.waitForElementVisible(locator);
await waitHelper.waitForPageLoad();
await waitHelper.waitForNetworkIdle();
```

### Random Helper

```typescript
const email = RandomHelper.randomEmail();
const name = RandomHelper.randomFullName();
const phone = RandomHelper.randomPhoneNumber();
```

### API Helper

```typescript
const apiHelper = new ApiHelper();
await apiHelper.init();
const response = await apiHelper.get('/endpoint');
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 Best Practices

1. **Use Page Objects**: Keep test logic separate from page interactions
2. **Centralize Locators**: Store all selectors in locator files
3. **Use Fixtures**: Leverage custom fixtures for reusable setup
4. **Add Logging**: Use Logger utility for better debugging
5. **Handle Waits**: Use WaitHelper for explicit waits
6. **Test Data**: Use UserService for test data management
7. **Assertions**: Use Playwright's expect for assertions
8. **Clean Tests**: Follow AAA pattern (Arrange-Act-Assert)

## 🐛 Debugging

```bash
# Debug mode
npm run test:debug

# UI mode
npm run test:ui

# Headed mode
npm run test:headed
```

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check Playwright documentation: https://playwright.dev

## 📜 License

ISC

## 👥 Authors

Jagadish - Initial work

---

**Happy Testing! 🎉**
