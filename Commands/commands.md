# Command              What It Actually Runs             What It Does

npm run test:headed    playwright test --headed          Run All Tests (Headed Mode)
npm test               playwright test                   Runs all tests (headless)
npm run test:ui        playwright test --ui              Opens UI mode
npm run test:debug                                       Runs slower
npm run test:login     playwright test tests/login       Runs only login tests
npm run test:checkout  playwright test tests/checkout    Runs only checkout tests
npm run report         playwright show-report            Opens HTML report

# Config settings to run tests
Setting     	       Value	      Result

workers: 4	           4 parallel	  4 browsers open
workers: 1	           Sequential	  1 browser at a time
fullyParallel: true	   All parallel	  Fast but chaotic
fullyParallel: false   Sequential	  Slow but watchable
projects: 6	           All browsers	  6x more windows
projects: 1	           Chrome only	  Just Chrome


# Generate Allure report
npm run allure:generate

# Open it
npm run allure:open

# Run API
npx playwright test src/tests/api/api.spec.ts --headed

# Run all API tests
npx playwright test src/tests/api

# Run specific file
npx playwright test src/tests/api/api.spec.ts

# Run with UI mode
npx playwright test src/tests/api --ui

#  Ignores anything in api folder and runs
npx playwright test --headed --ignore=**/api/**

# config to run Only UI tests (login + checkout) run with browser visible
# "test:ui-only": "playwright test src/tests/login src/tests/checkout --headed",
npm run test:ui-only
