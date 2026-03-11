import { ENV } from './env';

export const GlobalConfig = {
  // Browser Configuration
  browser: {
    headless: ENV.HEADLESS,
    defaultBrowser: ENV.BROWSER,
    slowMo: 0, // Slow down by ms for debugging
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ],
  },

  // Timeout Configuration
  timeouts: {
    default: ENV.DEFAULT_TIMEOUT,
    navigation: ENV.NAVIGATION_TIMEOUT,
    action: ENV.ACTION_TIMEOUT,
    api: ENV.API_TIMEOUT,
  },

  // Retry Configuration
  retry: {
    maxRetries: ENV.RETRY_COUNT,
    retryDelay: 1000, // ms between retries
  },

  // Screenshot Configuration
  screenshot: {
    enabled: ENV.SCREENSHOT_ON_FAILURE,
    path: 'screenshots',
    fullPage: true,
  },

  // Video Configuration
  video: {
    enabled: ENV.VIDEO_ON_FAILURE,
    path: 'videos',
  },

  // Logging Configuration
  logging: {
    level: 'info', // 'error' | 'warn' | 'info' | 'debug'
    console: true,
    file: true,
  },

  // Test Data Configuration
  testData: {
    usersFile: 'src/test-data/users.json',
  },

  // API Configuration
  api: {
    baseURL: ENV.API_BASE_URL,
    timeout: ENV.API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
};

export default GlobalConfig;
