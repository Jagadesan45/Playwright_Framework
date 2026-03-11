# 🎯 QUICK REFERENCE: Framework Hierarchy Chart

## 📊 CLASS INHERITANCE (Visual)

```
                    ┌──────────────────────────┐
                    │      Playwright          │
                    │      (External)          │
                    └───────────┬──────────────┘
                                │ provides
                                ▼
                    ┌──────────────────────────┐
                    │      Page Object         │
                    └───────────┬──────────────┘
                                │ passed to
                                ▼
        ┌───────────────────────────────────────────────┐
        │             BasePage (Parent)                 │
        │  📁 src/pages/BasePage.ts                    │
        │  ┌──────────────────────────────────────┐   │
        │  │ Properties:                          │   │
        │  │  • page: Page                        │   │
        │  │  • waitHelper: WaitHelper            │   │
        │  ├──────────────────────────────────────┤   │
        │  │ Methods:                             │   │
        │  │  • navigateTo(url)                   │   │
        │  │  • click(locator)                    │   │
        │  │  • type(locator, text)               │   │
        │  │  • getText(locator)                  │   │
        │  │  • isVisible(locator)                │   │
        │  │  • + 15 more...                      │   │
        │  └──────────────────────────────────────┘   │
        └───────────┬────────┬────────┬────────┬───────┘
                    │        │        │        │
              extends  extends  extends  extends
                    │        │        │        │
        ┌───────────┴─┐  ┌──┴───┐  ┌─┴─────┐ ┌┴──────────┐
        │  LoginPage  │  │ Home │  │ Cart  │ │ Checkout  │
        │             │  │ Page │  │ Page  │ │   Page    │
        └─────────────┘  └──────┘  └───────┘ └───────────┘
             │                │         │          │
             │ uses           │ uses    │ uses     │ uses
             ▼                ▼         ▼          ▼
        ┌─────────┐      ┌─────────┐ ┌─────────┐ ┌─────────┐
        │ Login   │      │  Home   │ │  Cart   │ │Checkout │
        │Locators │      │Locators │ │Locators │ │Locators │
        └─────────┘      └─────────┘ └─────────┘ └─────────┘
```

Framework Root
                      │
        ┌─────────────┼─────────────┐
        │             │             │
   Configuration   Utilities    Page Objects
        │             │             │
    ┌───┴───┐     ┌───┴───┐    ┌────┴────┐
   env  global   Logger Wait   Base   Pages
                              (Parent) (Children)
                                  │
                        ┌─────────┼─────────┐
                      Login    Home    Cart Checkout
                        │         │      │      │
                    Locators  Locators Locators Locators
---

## 🔄 DATA FLOW (Simplified)

```
┌─────────┐
│  .env   │ (User edits)
└────┬────┘
     │
     ▼
┌──────────────┐
│ config/env.ts│ (Reads .env)
└────┬─────────┘
     │
     ├─────────────────────┐
     │                     │
     ▼                     ▼
┌─────────────┐    ┌──────────────┐
│globalConfig │    │constants/urls│
└─────┬───────┘    └──────┬───────┘
      │                   │
      ▼                   ▼
┌───────────┐      ┌────────────┐
│apiHelper  │      │Page Objects│
└───────────┘      └────────────┘
```

---

## 🧪 TEST EXECUTION PATH

```
npm test
    ↓
playwright.config.ts (reads config)
    ↓
Finds: src/tests/**/*.spec.ts
    ↓
Imports: fixtures/baseTest.ts
    ↓
Creates:
  ├─ loginPage = new LoginPage(page)
  │     └─> extends BasePage
  │           └─> creates WaitHelper
  ├─ homePage = new HomePage(page)
  ├─ cartPage = new CartPage(page)
  ├─ checkoutPage = new CheckoutPage(page)
  └─ userService = new UserService()
         └─> reads test-data/users.json
    ↓
Injects fixtures into test
    ↓
test('...', async ({ loginPage, userService }) => {
  const user = userService.getStandardUser()
  await loginPage.login(user.username, user.password)
})
    ↓
Browser executes
    ↓
Reports generated
```

---

## 📦 DEPENDENCY TREE

```
login.spec.ts
├── baseTest.ts
│   ├── LoginPage
│   │   ├── BasePage
│   │   │   ├── WaitHelper
│   │   │   └── Logger
│   │   ├── LoginLocators
│   │   ├── URLS
│   │   │   └── ENV
│   │   └── Logger
│   ├── HomePage
│   │   └── (same as LoginPage)
│   ├── CartPage
│   │   └── (same as LoginPage)
│   ├── CheckoutPage
│   │   └── (same as LoginPage)
│   └── UserService
│       └── users.json
└── @playwright/test
```

---

## 🎯 KEY VALUE SOURCES

| What      | Where Defined | Where Used    |         How          |
|-----------|---------------|---------------|----------------------|
| BASE_URL  | .env          | env.ts        | process.env.BASE_URL |
| Locators  | locators/*.ts | Page Objects  | import               |
| User Data | users.json    | UserService   | fs.readFileSync      |
| Page      | Playwright    | BasePage      | constructor          |
| Methods   | BasePage      | Child Pages   | inheritance          |


## 🏗️ LAYERS (Bottom to Top)

```
LAYER 6: Tests          (src/tests/*.spec.ts)
         ↑
LAYER 5: Fixtures       (src/fixtures/baseTest.ts)
         ↑
LAYER 4: Page Objects   (src/pages/*.ts)
         ↑
LAYER 3: Utilities      (src/utils/*.ts)
         ↑
LAYER 2: Configuration  (src/config/*.ts)
         ↑
LAYER 1: Data Sources   (.env, users.json)
```

---

## 💡 QUICK EXAMPLE

**Question**: How does `loginPage.login()` work?

**Answer**:
```
1. Test calls: loginPage.login(username, password)
                      ↓
2. LoginPage method: this.type(this.usernameInput, username)
                      ↓
3. Uses locator from: LoginLocators.usernameInput
   Value: '[data-test="username"]'
                      ↓
4. Calls BasePage: this.type() (inherited method)
                      ↓
5. BasePage calls: this.page.locator(locator).fill(text)
                      ↓
6. Playwright executes in browser
```

---

## 🎓 FOR INTERVIEWS

**"How is your framework structured?"**

**Answer Template**:

"My framework uses a layered architecture:

1. **Configuration Layer**: .env → env.ts → globalConfig → used everywhere
2. **Data Layer**: users.json → UserService → tests
3. **Locator Layer**: Centralized selectors in separate files
4. **Page Layer**: BasePage parent with common methods, child pages inherit and add specifics
5. **Test Layer**: Custom fixtures inject page objects automatically
6. **Utility Layer**: Logger, WaitHelper, ApiHelper for cross-cutting concerns

The key pattern is inheritance - all pages extend BasePage, getting 20+ methods automatically while only implementing page-specific logic."

---
Component	   Count  	Examples

Layers	        6	    Data → Config → Utils → Pages → Fixtures → Tests
Page Objects	5	    BasePage + 4 children
Utilities	    4	    Logger, WaitHelper, RandomHelper, ApiHelper
Services	    1	    UserService
Config Files	2	    env.ts, globalConfig.ts
Locator Files	4	    Login, Home, Cart, Checkout
Test Suites   	3	    Login, Checkout, API
Total Tests	    37	    22 UI + 15 API

**This is your complete framework map!** 🗺️
