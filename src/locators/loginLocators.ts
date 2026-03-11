/**
 * Login Page Locators
 * Centralized repository of all login page selectors
 */

export const LoginLocators = {
  // Input fields
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  
  // Buttons
  loginButton: '[data-test="login-button"]',
  
  // Error messages
  errorContainer: '[data-test="error"]',
  errorButton: '.error-button',
  
  // Logo and branding
  logo: '.login_logo',
  botImage: '.bot_column',
  
  // Form container
  loginContainer: '.login_container',
  loginCredentials: '#login_credentials',
  loginPassword: '.login_password',
} as const;

export default LoginLocators;
