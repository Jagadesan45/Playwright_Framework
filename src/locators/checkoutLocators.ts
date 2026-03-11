/**
 * Checkout Page Locators
 * Centralized repository of all checkout page selectors
 */

export const CheckoutLocators = {
  // Checkout Step One - Information
  firstName: '[data-test="firstName"]',
  lastName: '[data-test="lastName"]',
  postalCode: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  cancelButton: '[data-test="cancel"]',
  errorContainer: '[data-test="error"]',
  
  // Checkout Step Two - Overview
  cartList: '.cart_list',
  cartItem: '.cart_item',
  itemTotal: '.summary_subtotal_label',
  tax: '.summary_tax_label',
  total: '.summary_total_label',
  finishButton: '[data-test="finish"]',
  
  // Checkout Complete
  completeHeader: '.complete-header',
  completeText: '.complete-text',
  backHomeButton: '[data-test="back-to-products"]',
  ponyExpress: '.pony_express',
} as const;

export default CheckoutLocators;
