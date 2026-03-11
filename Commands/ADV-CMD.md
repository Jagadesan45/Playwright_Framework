# 🚀 Playwright Framework - Essential Terminal Commands

**Complete Command Reference Guide**

---

## 📚 TABLE OF CONTENTS

1. [Installation & Setup](#installation--setup)
2. [Running Tests](#running-tests)
3. [Reports & Results](#reports--results)
4. [Debugging](#debugging)
5. [Code Quality](#code-quality)
6. [CI/CD & Automation](#cicd--automation)
7. [Maintenance & Cleanup](#maintenance--cleanup)
8. [Advanced Commands](#advanced-commands)

---

## 🔧 INSTALLATION & SETUP

### 1. Install Dependencies
```bash
npm install
```
**What it does:** Installs all packages from package.json  
**When to use:** First time setup, after pulling new code  
**Output:** Creates node_modules folder

---

### 2. Install Playwright Browsers
```bash
npx playwright install
```
**What it does:** Downloads Chromium, Firefox, WebKit browsers  
**When to use:** First time setup, after Playwright version upgrade  
**Output:** Browsers installed in system cache

---

### 3. Install Specific Browser
```bash
npx playwright install chromium
```
**What it does:** Installs only Chrome/Chromium browser  
**When to use:** Need only one browser for testing  
**Alternatives:** `firefox`, `webkit`, `msedge`

---

### 4. Update Dependencies
```bash
npm update
```
**What it does:** Updates all packages to latest versions  
**When to use:** Quarterly maintenance, security updates  
**Caution:** Test thoroughly after update

---

### 5. Install Specific Dependency
```bash
npm install <package-name>
npm install winston --save
```
**What it does:** Adds new package to project  
**When to use:** Adding new utility or library  
**Note:** `--save` adds to package.json

---

## ▶️ RUNNING TESTS

### 6. Run All Tests
```bash
npm test
# OR
npx playwright test
```
**What it does:** Runs all test files in src/tests/  
**Browsers:** All configured browsers (6 by default)  
**Mode:** Headless  
**Output:** Console results + HTML report

---

### 7. Run Tests in Headed Mode
```bash
npm run test:headed
# OR
npx playwright test --headed
```
**What it does:** Opens browser windows while running  
**When to use:** Visual debugging, demos  
**Note:** Slower than headless

---

### 8. Run Tests in UI Mode (Interactive)
```bash
npm run test:ui
# OR
npx playwright test --ui
```
**What it does:** Opens interactive Playwright UI  
**Features:** Watch mode, time travel debugging, step-through  
**Best for:** Development and debugging

---

### 9. Run Specific Test File
```bash
npx playwright test src/tests/login/login.spec.ts
```
**What it does:** Runs only specified test file  
**When to use:** Testing specific feature  
**Tip:** Use tab completion for path

---

### 10. Run Specific Test by Name
```bash
npx playwright test --grep "should login successfully"
# OR with regex
npx playwright test --grep /login.*successfully/
```
**What it does:** Runs tests matching the pattern  
**When to use:** Run specific test case  
**Note:** Case-sensitive

---

### 11. Run Tests with Tag
```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
```
**What it does:** Runs tests with specific tag  
**When to use:** Smoke tests, regression suites  
**Setup:** Add tags in test names

---

### 12. Run on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```
**What it does:** Runs tests on specified browser only  
**When to use:** Browser-specific testing  
**Available:** chromium, firefox, webkit, Mobile Chrome, Mobile Safari

---

### 13. Run Tests in Parallel
```bash
npx playwright test --workers=4
```
**What it does:** Sets number of parallel workers  
**Default:** CPU cores - 1  
**When to use:** Optimize execution time  
**Note:** More workers = more memory

---

### 14. Run Tests Sequentially (One at a time)
```bash
npx playwright test --workers=1
```
**What it does:** Disables parallel execution  
**When to use:** Debugging, shared resources  
**Note:** Slower but easier to debug

---

### 15. Run Login Tests Only
```bash
npm run test:login
# OR
npx playwright test src/tests/login/
```
**What it does:** Runs all tests in login folder  
**Custom script:** Defined in package.json  
**When to use:** Feature-specific testing

---

### 16. Run API Tests Only
```bash
npm run test:api
# OR
npx playwright test src/tests/api/
```
**What it does:** Runs only API test suite  
**When to use:** API regression testing  
**Output:** API test results

---

## 📊 REPORTS & RESULTS

### 17. Open Last HTML Report
```bash
npm run report
# OR
npx playwright show-report
```
**What it does:** Opens last test execution report in browser  
**Location:** playwright-report/ or reports/html-report/  
**Contains:** Screenshots, videos, trace files

---

### 18. Generate Allure Report
```bash
npm run allure:generate
```
**What it does:** Generates Allure report from test results  
**Location:** allure-report/  
**Requires:** Test execution completed

---

### 19. Open Allure Report
```bash
npm run allure:open
```
**What it does:** Generates and opens Allure report  
**When to use:** After test execution  
**Note:** Starts local server

---

### 20. View Specific Report Format
```bash
# JSON Report
cat reports/json-report/test-results.json

# JUnit Report
cat reports/junit-report/results.xml
```
**What it does:** Views raw report data  
**When to use:** Custom processing, CI/CD integration  
**Tip:** Use VS Code to view formatted JSON

---

## 🐛 DEBUGGING

### 21. Debug Mode (Step-through)
```bash
npx playwright test --debug
```
**What it does:** Opens Playwright Inspector for step-through debugging  
**Features:** Pause, step over, inspect elements  
**When to use:** Investigating test failures  
**Shortcuts:** F10 (step over), F11 (step into)

---

### 22. Run with Trace
```bash
npx playwright test --trace on
```
**What it does:** Records detailed trace for each test  
**Output:** trace.zip in test-results/  
**When to use:** Post-mortem debugging  
**View with:** `npx playwright show-trace trace.zip`

---

### 23. Open Trace Viewer
```bash
npx playwright show-trace test-results/example-test/trace.zip
```
**What it does:** Opens interactive trace viewer  
**Features:** Timeline, network, console, snapshots  
**Best for:** Understanding test failures

---

### 24. Run Single Test in Debug
```bash
npx playwright test login.spec.ts --debug --grep "should login"
```
**What it does:** Debugs specific test  
**When to use:** Isolated test debugging  
**Tip:** Combine --debug with --grep

---

### 25. Verbose Logging
```bash
DEBUG=pw:api npx playwright test
```
**What it does:** Shows detailed Playwright API calls  
**When to use:** Low-level debugging  
**Alternatives:** `pw:browser`, `pw:protocol`

---

### 26. Run with Screenshots on Failure
```bash
npx playwright test --screenshot=only-on-failure
```
**What it does:** Takes screenshot only when test fails  
**Default:** Usually enabled  
**Alternatives:** `on`, `off`, `only-on-failure`

---

### 27. Record Video
```bash
npx playwright test --video=on
```
**What it does:** Records video of test execution  
**Output:** videos/ folder  
**When to use:** Visual debugging, documentation  
**Note:** Increases execution time

---

## 🧪 CODE QUALITY

### 28. Run TypeScript Compiler Check
```bash
npx tsc --noEmit
```
**What it does:** Checks for TypeScript errors without compiling  
**When to use:** Before commit, in CI/CD  
**Output:** Lists type errors

---

### 29. Format Code with Prettier (if installed)
```bash
npx prettier --write "src/**/*.ts"
```
**What it does:** Auto-formats TypeScript files  
**When to use:** Before commit  
**Setup:** Requires prettier in package.json

---

### 30. Run ESLint (if configured)
```bash
npx eslint src/
```
**What it does:** Checks code for linting errors  
**When to use:** Code quality checks  
**Setup:** Requires .eslintrc configuration

---

## 🔄 CI/CD & AUTOMATION

### 31. Run in CI Mode
```bash
CI=true npx playwright test
```
**What it does:** Runs tests in CI-optimized mode  
**Changes:** Reduced workers, no videos by default  
**When to use:** In CI/CD pipelines

---

### 32. Run with Shard (Distributed Testing)
```bash
# Machine 1
npx playwright test --shard=1/3

# Machine 2
npx playwright test --shard=2/3

# Machine 3
npx playwright test --shard=3/3
```
**What it does:** Splits tests across multiple machines  
**When to use:** Large test suites in CI/CD  
**Benefit:** Faster parallel execution

---

### 33. Run Tests and Exit with Code
```bash
npx playwright test || echo "Tests failed"
```
**What it does:** Captures exit code for CI/CD  
**Exit codes:** 0 (success), 1 (failure)  
**When to use:** CI/CD scripts

---

### 34. Generate Test with Codegen
```bash
npx playwright codegen https://www.saucedemo.com
```
**What it does:** Opens browser and records actions as test code  
**Output:** Auto-generated test code  
**When to use:** Quickly create new tests  
**Tip:** Copy code to your test files

---

## 🧹 MAINTENANCE & CLEANUP

### 35. Clean Test Results
```bash
npm run clean
# OR
rm -rf test-results/ playwright-report/ allure-results/ allure-report/
```
**What it does:** Deletes all test artifacts  
**When to use:** Before fresh test run, disk space cleanup  
**Note:** Permanent deletion

---

### 36. Clean Node Modules (Nuclear Option)
```bash
rm -rf node_modules package-lock.json
npm install
```
**What it does:** Fresh reinstall of all dependencies  
**When to use:** Dependency conflicts, corruption  
**Time:** 2-5 minutes

---

### 37. Clear Playwright Cache
```bash
npx playwright install --force
```
**What it does:** Re-downloads browsers  
**When to use:** Browser corruption issues  
**Size:** ~500MB download

---

### 38. Check Installed Browsers
```bash
npx playwright install --dry-run
```
**What it does:** Lists browsers that would be installed  
**When to use:** Verify browser versions  
**Output:** Browser list with versions

---

## 🚀 ADVANCED COMMANDS

### 39. Run Tests with Custom Config
```bash
npx playwright test --config=playwright.config.ci.ts
```
**What it does:** Uses alternative configuration file  
**When to use:** Different environments (dev, staging, prod)  
**Setup:** Create multiple config files

---

### 40. Set Base URL at Runtime
```bash
BASE_URL=https://staging.example.com npx playwright test
```
**What it does:** Overrides BASE_URL environment variable  
**When to use:** Testing different environments  
**Note:** Temporary override

---

### 41. Run Tests with Retry
```bash
npx playwright test --retries=2
```
**What it does:** Retries failed tests up to 2 times  
**When to use:** Flaky tests, network issues  
**Default:** Usually 0 or 1

---

### 42. Run Tests with Custom Timeout
```bash
npx playwright test --timeout=60000
```
**What it does:** Sets global test timeout (60 seconds)  
**When to use:** Slow tests, slow network  
**Default:** 30000ms (30 seconds)

---

### 43. List All Tests Without Running
```bash
npx playwright test --list
```
**What it does:** Shows all discovered tests  
**When to use:** Verify test discovery  
**Output:** Test file and test name list

---

### 44. Run Specific Test Line
```bash
npx playwright test login.spec.ts:42
```
**What it does:** Runs test at specific line number  
**When to use:** Run single test quickly  
**Tip:** Get line number from VS Code

---

### 45. Update Snapshots (Visual Testing)
```bash
npx playwright test --update-snapshots
```
**What it does:** Updates baseline screenshots  
**When to use:** Intentional UI changes  
**Caution:** Review changes before updating

---

### 46. Generate Test Report in JSON
```bash
npx playwright test --reporter=json > results.json
```
**What it does:** Outputs results to JSON file  
**When to use:** Custom processing  
**Alternatives:** junit, html, list

---

### 47. Run Tests and Open Report
```bash
npx playwright test ; npx playwright show-report
```
**What it does:** Runs tests then immediately opens report  
**When to use:** Quick test-and-review cycle  
**Note:** Semicolon chains commands

---

### 48. Check Playwright Version
```bash
npx playwright --version
```
**What it does:** Shows installed Playwright version  
**When to use:** Verify installation, debugging  
**Output:** Version number

---

### 49. Run Tests in Specific Viewport
```bash
npx playwright test --config=playwright.config.ts
```
**What it does:** Uses viewport from config  
**Alternative:** Set in config file or test  
**When to use:** Responsive testing

---

### 50. Monitor Test Execution
```bash
npx playwright test --reporter=line
```
**What it does:** Shows compact one-line progress  
**When to use:** CI/CD, quick feedback  
**Output:** Minimal console output

---

## 📝 QUICK REFERENCE CHEATSHEET

### Most Used Commands:
```bash
# Development
npm install                          # Install dependencies
npm test                             # Run all tests
npm run test:ui                      # Interactive mode
npx playwright test --headed         # Visual mode

# Debugging
npx playwright test --debug          # Debug mode
npx playwright show-report           # View report
npx playwright show-trace <file>     # View trace

# Specific Tests
npx playwright test login.spec.ts    # Single file
npx playwright test --grep "login"   # By name
npx playwright test --project=chromium # Single browser

# Reports
npm run report                       # HTML report
npm run allure:open                  # Allure report

# Cleanup
npm run clean                        # Clean results
rm -rf node_modules && npm install   # Fresh install

# CI/CD
CI=true npx playwright test          # CI mode
npx playwright test --shard=1/3      # Distributed
```

---

## 🎯 COMMAND COMBINATIONS

### Perfect for Daily Development:
```bash
# Clean, run, and view report
npm run clean && npm test && npm run report
```

### Perfect for CI/CD:
```bash
# Run with retries and generate multiple reports
CI=true npx playwright test --retries=1 --reporter=html,json,junit
```

### Perfect for Debugging:
```bash
# Run single test in debug with trace
npx playwright test login.spec.ts --debug --trace on --grep "should login"
```

### Perfect for Demo:
```bash
# Headed, slow motion, single worker
npx playwright test --headed --workers=1
```

---

## 💡 PRO TIPS

### Tip 1: Create Aliases (Bash/Zsh)
```bash
# Add to ~/.bashrc or ~/.zshrc
alias pw='npx playwright test'
alias pwr='npx playwright show-report'
alias pwd='npx playwright test --debug'
alias pwu='npx playwright test --ui'

# Usage: pw login.spec.ts
```

### Tip 2: Windows PowerShell Aliases
```powershell
# Add to PowerShell profile
Set-Alias pw 'npx playwright test'
Set-Alias pwr 'npx playwright show-report'

# Usage: pw
```

### Tip 3: Use npm Scripts (Already in package.json)
```bash
npm run test:login       # Run login tests
npm run test:api         # Run API tests
npm run test:headed      # Headed mode
npm run test:ui          # UI mode
npm run report           # View report
npm run allure:generate  # Generate Allure
npm run allure:open      # Open Allure
npm run clean            # Clean results
```

---

## 🎓 LEARNING PATH

### Beginner (Week 1):
```bash
npm install
npx playwright install
npm test
npm run report
```

### Intermediate (Week 2-3):
```bash
npx playwright test --headed
npx playwright test --grep
npx playwright test --debug
npx playwright test --ui
```

### Advanced (Month 1+):
```bash
npx playwright test --trace on
npx playwright test --shard=1/3
CI=true npx playwright test
npx playwright test --update-snapshots
```

---

## 🚨 TROUBLESHOOTING COMMANDS

### Issue: Tests not found
```bash
npx playwright test --list
# Shows discovered tests
```

### Issue: Browser not installed
```bash
npx playwright install
npx playwright install --force
```

### Issue: Dependency conflicts
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
```bash
npx tsc --noEmit
# Shows type errors
```

### Issue: Port already in use (Allure)
```bash
# Kill process on port
# Windows
netstat -ano | findstr :PORT
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:PORT | xargs kill -9
```

---

## 📖 ADDITIONAL RESOURCES

### Official Documentation:
- Playwright Docs: https://playwright.dev
- Playwright CLI: https://playwright.dev/docs/test-cli

### Framework Documentation:
- README.md - Setup and overview
- API_TESTING_GUIDE.md - API testing details
- FRAMEWORK_HIERARCHY_DOCUMENTATION.md - Architecture

---

## 📊 COMMAND USAGE FREQUENCY

**Daily:**
- `npm test`
- `npm run test:ui`
- `npm run report`
- `npx playwright test <file>`

**Weekly:**
- `npm run clean`
- `npx playwright test --debug`
- `npm run allure:open`

**Monthly:**
- `npm update`
- `npx playwright install`

**As Needed:**
- `npx playwright codegen`
- `npx playwright test --update-snapshots`
- `CI=true npx playwright test`

---

## ✅ COMMAND CHECKLIST FOR NEW TEAM MEMBERS

Setup (Day 1):
- [ ] `npm install`
- [ ] `npx playwright install`
- [ ] Copy `.env.example` to `.env`
- [ ] `npm test` (verify setup)

Daily Workflow:
- [ ] `git pull` (get latest code)
- [ ] `npm install` (if package.json changed)
- [ ] `npm run test:ui` (develop tests)
- [ ] `npm test` (final verification)
- [ ] `npm run report` (review results)
- [ ] `git commit` and `git push`

Before PR:
- [ ] `npm run clean`
- [ ] `npm test`
- [ ] Review reports
- [ ] Fix failures

---

**You now have a complete command reference for your framework!** 🎉

**Total Commands: 50+**
**Categories: 8**
**Skill Levels: All**

**Bookmark this file and use it as your daily reference!** 📚✨