# 🏗️ Playwright Enterprise Framework - Complete Hierarchy & Architecture

## 📊 TABLE OF CONTENTS
1. [Project Structure Overview](#project-structure-overview)
2. [Class Inheritance Hierarchy](#class-inheritance-hierarchy)
3. [Data Flow Diagram](#data-flow-diagram)
4. [Configuration Hierarchy](#configuration-hierarchy)
5. [Test Execution Flow](#test-execution-flow)
6. [Dependency Map](#dependency-map)

---

## 📁 PROJECT STRUCTURE OVERVIEW

```
playwright-enterprise-framework/
│
├── 📄 playwright.config.ts          ← Main Configuration (Entry Point)
├── 📄 package.json                  ← Dependencies & Scripts
├── 📄 tsconfig.json                 ← TypeScript Configuration
├── 📄 .env                          ← Environment Variables (Runtime)
├── 📄 .env.example                  ← Environment Template
│
├── 📁 src/                          ← Source Code Root
│   │
│   ├── 📁 config/                   ← Configuration Layer
│   │   ├── env.ts                   ← Environment Config (reads .env)
│   │   └── globalConfig.ts          ← Global Settings (uses env.ts)
│   │
│   ├── 📁 constants/                ← Static Values
│   │   └── urls.ts                  ← URL Constants (uses env.ts)
│   │
│   ├── 📁 test-data/                ← Test Data
│   │   └── users.json               ← User Test Data
│   │
│   ├── 📁 services/                 ← Business Logic Layer
│   │   └── userService.ts           ← User Data Service (reads users.json)
│   │
│   ├── 📁 utils/                    ← Utility Layer
│   │   ├── logger.ts                ← Logging Utility (Winston)
│   │   ├── waitHelper.ts            ← Wait/Sync Helper (uses Page)
│   │   ├── randomHelper.ts          ← Random Data Generator
│   │   └── apiHelper.ts             ← API Testing Helper (uses globalConfig)
│   │
│   ├── 📁 locators/                 ← Locator Layer (Selectors)
│   │   ├── loginLocators.ts         ← Login Page Selectors
│   │   ├── homeLocators.ts          ← Home Page Selectors
│   │   ├── cartLocators.ts          ← Cart Page Selectors
│   │   └── checkoutLocators.ts      ← Checkout Page Selectors
│   │
│   ├── 📁 pages/                    ← Page Object Layer
│   │   ├── BasePage.ts              ← Base Page (Parent Class)
│   │   ├── LoginPage.ts             ← Login Page (extends BasePage)
│   │   ├── HomePage.ts              ← Home Page (extends BasePage)
│   │   ├── CartPage.ts              ← Cart Page (extends BasePage)
│   │   └── CheckoutPage.ts          ← Checkout Page (extends BasePage)
│   │
│   ├── 📁 fixtures/                 ← Test Fixtures
│   │   └── baseTest.ts              ← Custom Test Fixture (provides Page Objects)
│   │
│   └── 📁 tests/                    ← Test Layer
│       ├── login/
│       │   └── login.spec.ts        ← Login Tests (uses baseTest)
│       ├── checkout/
│       │   └── checkout.spec.ts     ← Checkout Tests (uses baseTest)
│       └── api/
│           ├── api.spec.ts          ← API Tests (uses ApiHelper)
│           └── advanced-api.spec.ts ← Advanced API Tests
│
└── 📁 reports/                      ← Generated Reports (Output)
```

---

## 🏛️ CLASS INHERITANCE HIERARCHY

### **Page Object Hierarchy:**

```
┌─────────────────────────────────────────────────────────────┐
│                         BasePage                             │
│  Location: src/pages/BasePage.ts                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Properties:                                           │  │
│  │  - page: Page (Playwright Page object)               │  │
│  │  - waitHelper: WaitHelper                            │  │
│  │                                                       │  │
│  │ Methods:                                              │  │
│  │  - navigateTo(url)                                    │  │
│  │  - click(locator)                                     │  │
│  │  - type(locator, text)                                │  │
│  │  - getText(locator)                                   │  │
│  │  - isVisible(locator)                                 │  │
│  │  - waitForElement(locator)                            │  │
│  │  - takeScreenshot(name)                               │  │
│  │  - and 15+ more common methods...                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │ EXTENDS
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            │                 │                 │
    ┌───────┴───────┐ ┌──────┴──────┐ ┌───────┴────────┐
    │  LoginPage    │ │  HomePage   │ │   CartPage     │
    └───────────────┘ └─────────────┘ └────────────────┘
            │                 │                 │
            │                 │                 │
    ┌───────────────────────────────────────────────────┐
    │           CheckoutPage                            │
    └───────────────────────────────────────────────────┘
```

### **Detailed Inheritance:**

#### **1. BasePage (Parent Class)**
```typescript
// Location: src/pages/BasePage.ts

export class BasePage {
  protected page: Page;              // ← FROM: Playwright
  protected waitHelper: WaitHelper;  // ← FROM: src/utils/waitHelper.ts
  
  constructor(page: Page) {
    this.page = page;                // RECEIVES: Page from Playwright
    this.waitHelper = new WaitHelper(page);  // CREATES: WaitHelper instance
  }
  
  // Common methods inherited by all child pages
  async navigateTo(url: string) { ... }
  async click(locator: Locator | string) { ... }
  async type(locator: Locator | string, text: string) { ... }
  // ... 20+ more methods
}
```

#### **2. LoginPage (Child Class)**
```typescript
// Location: src/pages/LoginPage.ts

import { BasePage } from './BasePage';              // ← EXTENDS BasePage
import { LoginLocators } from '../locators/loginLocators';  // ← USES Locators
import { Logger } from '../utils/logger';           // ← USES Logger
import { URLS } from '../constants/urls';           // ← USES URL Constants

export class LoginPage extends BasePage {  // ← INHERITS from BasePage
  
  // Private properties (locators)
  private usernameInput: Locator;  // ← FROM: LoginLocators
  private passwordInput: Locator;  // ← FROM: LoginLocators
  private loginButton: Locator;    // ← FROM: LoginLocators
  
  constructor(page: Page) {
    super(page);  // ← CALLS BasePage constructor
    this.initializeLocators();  // Sets up locators
  }
  
  private initializeLocators() {
    // GETS values FROM: src/locators/loginLocators.ts
    this.usernameInput = this.page.locator(LoginLocators.usernameInput);
    this.passwordInput = this.page.locator(LoginLocators.passwordInput);
    this.loginButton = this.page.locator(LoginLocators.loginButton);
  }
  
  async login(username: string, password: string) {
    // USES inherited methods from BasePage
    await this.type(this.usernameInput, username);  // ← BasePage.type()
    await this.type(this.passwordInput, password);  // ← BasePage.type()
    await this.click(this.loginButton);             // ← BasePage.click()
  }
}
```

#### **3. HomePage, CartPage, CheckoutPage (Similar Structure)**
All extend BasePage and follow the same pattern!

---

## 🔄 DATA FLOW DIAGRAM

### **Configuration Flow:**

```
┌────────────────┐
│   .env file    │  ← USER EDITS (environment variables)
└────────┬───────┘
         │ READ BY
         ▼
┌─────────────────────┐
│  src/config/env.ts  │  ← READS .env using dotenv
│                     │
│  Exports:           │
│  - BASE_URL         │
│  - BROWSER          │
│  - HEADLESS         │
│  - WORKERS          │
│  - TIMEOUTS         │
└─────────┬───────────┘
          │ USED BY
          ├──────────────────────────────┐
          │                              │
          ▼                              ▼
┌─────────────────────────┐    ┌──────────────────────┐
│ src/config/globalConfig │    │  src/constants/urls  │
│                         │    │                      │
│ Uses ENV values to      │    │  Uses ENV.BASE_URL   │
│ create global settings  │    │  to build URLs       │
└─────────┬───────────────┘    └──────────┬───────────┘
          │                               │
          │ USED BY                       │ USED BY
          ▼                               ▼
┌──────────────────┐           ┌────────────────┐
│  src/utils/      │           │  src/pages/    │
│  apiHelper.ts    │           │  All Pages     │
└──────────────────┘           └────────────────┘
```

### **Test Data Flow:**

```
┌─────────────────────────┐
│ src/test-data/users.json│  ← STATIC DATA (JSON file)
└──────────┬──────────────┘
           │ READ BY
           ▼
┌──────────────────────────────┐
│ src/services/userService.ts  │  ← SERVICE LAYER
│                              │
│  Methods:                    │
│  - getStandardUser()         │  ← RETURNS User object
│  - getLockedUser()           │  ← RETURNS User object
│  - getInvalidUser()          │  ← RETURNS User object
│  - getRandomCustomer()       │  ← RETURNS Customer object
└──────────┬───────────────────┘
           │ USED BY
           ▼
┌─────────────────────────┐
│  src/fixtures/baseTest  │  ← PROVIDES to tests as fixture
└──────────┬──────────────┘
           │ INJECTED INTO
           ▼
┌──────────────────────────┐
│  src/tests/*.spec.ts     │  ← TESTS USE via parameter
│                          │
│  test('...', async ({    │
│    userService           │  ← GETS UserService instance
│  }) => {                 │
│    const user =          │
│      userService         │
│        .getStandardUser()│  ← CALLS method
│  });                     │
└──────────────────────────┘
```

### **Page Object Flow:**

```
┌──────────────────────────┐
│ src/locators/*.ts        │  ← LOCATOR DEFINITIONS
│                          │
│ export const             │
│ LoginLocators = {        │
│   usernameInput:         │
│     '[data-test="..."]'  │  ← CSS SELECTORS
│ }                        │
└──────────┬───────────────┘
           │ IMPORTED BY
           ▼
┌──────────────────────────┐
│ src/pages/LoginPage.ts   │  ← PAGE OBJECT
│                          │
│ class LoginPage extends  │
│   BasePage {             │
│                          │
│   private usernameInput  │  ← USES locators
│   = this.page.locator(  │
│     LoginLocators        │
│       .usernameInput     │  ← GETS value from locators
│   );                     │
│ }                        │
└──────────┬───────────────┘
           │ PROVIDED BY
           ▼
┌──────────────────────────┐
│ src/fixtures/baseTest    │  ← FIXTURE CREATES INSTANCE
│                          │
│ loginPage: async ({      │
│   page                   │  ← GETS Page from Playwright
│ }, use) => {             │
│   const loginPage =      │
│     new LoginPage(page)  │  ← CREATES LoginPage instance
│   await use(loginPage)   │  ← PROVIDES to test
│ }                        │
└──────────┬───────────────┘
           │ INJECTED INTO
           ▼
┌──────────────────────────┐
│ src/tests/login.spec.ts  │  ← TEST FILE
│                          │
│ test('...', async ({     │
│   loginPage              │  ← GETS LoginPage instance
│ }) => {                  │
│   await loginPage         │
│     .login(user, pass)   │  ← CALLS page methods
│ });                      │
└──────────────────────────┘
```

---

## 🎯 CONFIGURATION HIERARCHY

### **Configuration Layers (Top to Bottom):**

```
LAYER 1: Root Configuration Files
├── playwright.config.ts          ← Master config
├── tsconfig.json                 ← TypeScript config
└── package.json                  ← Dependencies & scripts
    │
    ▼
LAYER 2: Environment Files
├── .env                          ← Runtime variables (NOT in Git)
└── .env.example                  ← Template (IN Git)
    │
    ▼
LAYER 3: Application Config
├── src/config/env.ts             ← Reads .env, exports ENV object
└── src/config/globalConfig.ts    ← Uses ENV, creates GlobalConfig
    │
    ▼
LAYER 4: Domain-Specific Config
└── src/constants/urls.ts         ← Uses ENV.BASE_URL
    │
    ▼
LAYER 5: Runtime Usage
├── src/pages/*.ts                ← Use URLS constants
├── src/utils/apiHelper.ts        ← Uses GlobalConfig.api
└── src/tests/*.spec.ts           ← Use all above layers
```

### **Value Resolution Example:**

**Question:** Where does `BASE_URL` come from?

```
1. USER sets in .env file:
   BASE_URL=https://www.saucedemo.com

2. src/config/env.ts READS:
   export const ENV = {
     BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com'
   }

3. src/constants/urls.ts USES:
   export const URLS = {
     BASE: ENV.BASE_URL,  // ← GETS from env.ts
     LOGIN: '/',
   }

4. playwright.config.ts USES:
   use: {
     baseURL: process.env.BASE_URL || 'https://www.saucedemo.com'
   }

5. src/pages/LoginPage.ts USES:
   await this.navigateTo(URLS.LOGIN);  // ← USES constant from urls.ts

6. TEST EXECUTES with final URL:
   https://www.saucedemo.com/
```

---

## 🔄 TEST EXECUTION FLOW

### **Complete Test Execution Path:**

```
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: User runs command                                  │
│  $ npm run test:headed                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: package.json executes script                       │
│  "test:headed": "playwright test --headed"                  │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Playwright reads playwright.config.ts              │
│  - testDir: './src/tests'                                   │
│  - workers: 4                                               │
│  - baseURL: from ENV                                        │
│  - timeout: 60000                                           │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Playwright discovers test files                    │
│  - src/tests/login/login.spec.ts                            │
│  - src/tests/checkout/checkout.spec.ts                      │
│  - src/tests/api/api.spec.ts                                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: Test file imports baseTest fixture                 │
│  import { test, expect } from '../../fixtures/baseTest'     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 6: baseTest.ts initializes fixtures                   │
│  - Creates LoginPage(page)                                  │
│  - Creates HomePage(page)                                   │
│  - Creates CartPage(page)                                   │
│  - Creates CheckoutPage(page)                               │
│  - Creates UserService()                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 7: Each Page Object initializes                       │
│  LoginPage:                                                 │
│    1. Calls super(page) → BasePage constructor              │
│    2. BasePage creates WaitHelper(page)                     │
│    3. LoginPage initializes locators from LoginLocators     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 8: Test executes with injected fixtures               │
│  test('should login', async ({                              │
│    loginPage,        // ← Injected by fixture               │
│    userService       // ← Injected by fixture               │
│  }) => {                                                    │
│    const user = userService.getStandardUser();              │
│    await loginPage.login(user.username, user.password);     │
│  });                                                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 9: Page methods execute                               │
│  loginPage.login() calls:                                   │
│    1. this.type() → BasePage.type() → page.locator().fill() │
│    2. this.click() → BasePage.click() → page.locator().click()│
│    3. Logger.step() → Winston logs to console & file        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 10: Playwright executes browser actions               │
│  - Opens browser (Chromium/Firefox/WebKit)                  │
│  - Navigates to URL                                         │
│  - Fills username input                                     │
│  - Fills password input                                     │
│  - Clicks login button                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 11: Test assertions execute                           │
│  expect(await homePage.verifyPageLoaded()).toBeTruthy();    │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 12: Playwright generates reports                      │
│  - HTML report → reports/html-report/                       │
│  - JSON report → reports/json-report/                       │
│  - JUnit report → reports/junit-report/                     │
│  - Allure report → allure-results/                          │
│  - Logs → logs/combined.log                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗺️ DEPENDENCY MAP

### **Who Depends on Whom:**

```
tests/login.spec.ts
│
├── DEPENDS ON → fixtures/baseTest.ts
│   │
│   ├── DEPENDS ON → pages/LoginPage.ts
│   │   │
│   │   ├── DEPENDS ON → pages/BasePage.ts
│   │   │   │
│   │   │   ├── DEPENDS ON → utils/waitHelper.ts
│   │   │   └── DEPENDS ON → utils/logger.ts
│   │   │
│   │   ├── DEPENDS ON → locators/loginLocators.ts
│   │   ├── DEPENDS ON → constants/urls.ts
│   │   │   └── DEPENDS ON → config/env.ts
│   │   └── DEPENDS ON → utils/logger.ts
│   │
│   ├── DEPENDS ON → pages/HomePage.ts
│   │   └── (same structure as LoginPage)
│   │
│   └── DEPENDS ON → services/userService.ts
│       └── DEPENDS ON → test-data/users.json
│
└── DEPENDS ON → @playwright/test (external)
```

### **Reverse Dependencies (What Uses This):**

**BasePage.ts is USED BY:**
- ✅ LoginPage.ts
- ✅ HomePage.ts
- ✅ CartPage.ts
- ✅ CheckoutPage.ts

**Logger.ts is USED BY:**
- ✅ BasePage.ts
- ✅ LoginPage.ts
- ✅ HomePage.ts
- ✅ CartPage.ts
- ✅ CheckoutPage.ts
- ✅ ApiHelper.ts
- ✅ UserService.ts
- ✅ All test files

**env.ts is USED BY:**
- ✅ globalConfig.ts
- ✅ urls.ts
- ✅ playwright.config.ts

---

## 📊 KEY-VALUE RESOLUTION TABLE

| Value | Defined In | Used In | How It Gets There |
|-------|-----------|---------|-------------------|
| `BASE_URL` | `.env` | `env.ts` | `process.env.BASE_URL` |
| `ENV.BASE_URL` | `env.ts` | `urls.ts` | `import { ENV }` |
| `URLS.BASE` | `urls.ts` | `LoginPage.ts` | `import { URLS }` |
| `LoginLocators.usernameInput` | `loginLocators.ts` | `LoginPage.ts` | `import { LoginLocators }` |
| `page` | Playwright | `BasePage.ts` | Constructor parameter |
| `waitHelper` | `BasePage.ts` | Child pages | Inherited property |
| User data | `users.json` | `UserService` | `fs.readFileSync()` |
| Standard user | `UserService` | Tests | Fixture injection |

---

## 🎯 COMPLETE EXAMPLE: Login Test Flow

**From Start to Finish:**

```
1. USER RUNS: npm run test:login

2. PACKAGE.JSON executes: 
   "test:login": "playwright test tests/login"

3. PLAYWRIGHT.CONFIG.TS loads:
   - testDir: './src/tests'
   - baseURL: process.env.BASE_URL (from .env)

4. FINDS: src/tests/login/login.spec.ts

5. TEST FILE imports:
   import { test, expect } from '../../fixtures/baseTest'

6. BASETEST.TS creates fixtures:
   loginPage: new LoginPage(page)
     └─> LoginPage extends BasePage
           └─> BasePage constructor(page)
                 └─> this.waitHelper = new WaitHelper(page)

7. LOGINPAGE initializes locators:
   this.usernameInput = page.locator(LoginLocators.usernameInput)
     └─> LoginLocators.usernameInput = '[data-test="username"]'

8. USERSERVICE loads data:
   fs.readFileSync('src/test-data/users.json')
     └─> Returns: { "validUsers": [...] }

9. TEST EXECUTES:
   test('should login', async ({ loginPage, userService }) => {
     const user = userService.getStandardUser()
       └─> Returns: { username: "standard_user", password: "secret_sauce" }
     
     await loginPage.goto()
       └─> Calls: this.navigateTo(URLS.LOGIN)
             └─> URLS.LOGIN = '/'
             └─> Final URL: https://www.saucedemo.com/
     
     await loginPage.login(user.username, user.password)
       └─> Calls: this.type(this.usernameInput, username)
             └─> Calls: BasePage.type()
                   └─> Calls: page.locator('[data-test="username"]').fill('standard_user')
   });

10. BROWSER EXECUTES actions

11. PLAYWRIGHT GENERATES reports
```

---

## 🎓 INTERVIEW EXPLANATION

**"Explaination on framework architecture":**

> "My framework follows a layered architecture with clear separation of concerns:
>
> **Configuration Layer**: Environment variables flow from .env → env.ts → globalConfig.ts → used throughout the application
>
> **Data Layer**: Test data stored in JSON files, accessed through service classes
>
> **Locator Layer**: All selectors centralized in separate files for easy maintenance
>
> **Page Object Layer**: Hierarchical structure with BasePage as parent, providing common functionality to all child page objects (LoginPage, HomePage, etc.)
>
> **Test Layer**: Tests use custom fixtures that inject pre-initialized page objects and services
>
> **Utility Layer**: Reusable helpers for logging, waiting, API calls, and random data
>
> The key design pattern is inheritance - all page objects extend BasePage, inheriting 20+ common methods while adding page-specific functionality. Configuration flows top-down through multiple layers, allowing environment-specific customization without code changes."

---

**This document provides complete visibility into your framework's architecture!** 🎉