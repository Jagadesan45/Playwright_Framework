/**
 * Cart Page Locators
 * Centralized repository of all cart page selectors
 */

export const CartLocators = {
  // Cart header
  cartList: '.cart_list',
  cartItem: '.cart_item',
  cartQuantity: '.cart_quantity',
  
  // Item details
  inventoryItemName: '.inventory_item_name',
  inventoryItemDesc: '.inventory_item_desc',
  inventoryItemPrice: '.inventory_item_price',
  
  // Buttons
  continueShoppingButton: '[data-test="continue-shopping"]',
  checkoutButton: '[data-test="checkout"]',
  removeButton: '[data-test^="remove"]',
  
  // Cart badge
  shoppingCartBadge: '.shopping_cart_badge',
} as const;

export default CartLocators;
