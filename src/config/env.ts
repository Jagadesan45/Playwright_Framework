import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  // Base URLs
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  API_BASE_URL: process.env.API_BASE_URL || 'https://api.saucedemo.com',
  
  // Environment
  ENVIRONMENT: process.env.ENVIRONMENT || 'test',
  
  // Timeouts
  DEFAULT_TIMEOUT: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
  NAVIGATION_TIMEOUT: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
  ACTION_TIMEOUT: parseInt(process.env.ACTION_TIMEOUT || '15000'),
  
  // Browser settings
  HEADLESS: process.env.HEADLESS === 'true',
  BROWSER: process.env.BROWSER || 'chromium',
  
  // Test settings
  RETRY_COUNT: parseInt(process.env.RETRY_COUNT || '0'),
  WORKERS: parseInt(process.env.WORKERS || '4'),
  
  // Reporting
  SCREENSHOT_ON_FAILURE: process.env.SCREENSHOT_ON_FAILURE !== 'false',
  VIDEO_ON_FAILURE: process.env.VIDEO_ON_FAILURE !== 'false',
  TRACE_ON_FAILURE: process.env.TRACE_ON_FAILURE !== 'false',
  
  // Credentials (for demo purposes - in real scenarios use secure vaults)
  STANDARD_USER: process.env.STANDARD_USER || 'standard_user',
  STANDARD_PASSWORD: process.env.STANDARD_PASSWORD || 'secret_sauce',
  
  // API Configuration
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '30000'),
};

export default ENV;
