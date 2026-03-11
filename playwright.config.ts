import { defineConfig, devices } from '@playwright/test';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  
  /* Maximum time one test can run for */
  timeout: 60 * 1000,
  
  /* Run tests in files in parallel */
  // fullyParallel: false,
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  // workers: process.env.CI ? 1 : 4,    
  workers: 1,  // Run one test at a time
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/json-report/test-results.json' }],
    ['junit', { outputFile: 'reports/junit-report/results.xml' }],
    ['list'],
    ['allure-playwright', { 
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: true 
    }]
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
    
    /* Navigation timeout */
    navigationTimeout: 30 * 1000,
    
    /* Action timeout */
    actionTimeout: 15 * 1000,
    
    /* Viewport size */
    viewport: { width: 1920, height: 1080 },
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,

    /* Add Slow Motion */
        launchOptions: {
      slowMo: 1000,  // 1 second delay
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },   // Executes on multiple browsers

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // /* Test against branded browsers */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // }, 
  ],

  /* Output folder for test artifacts */
  outputDir: 'test-results/',
  
  /* Global setup/teardown */
  // globalSetup: require.resolve('./src/config/globalSetup.ts'),
  // globalTeardown: require.resolve('./src/config/globalTeardown.ts'),
});
