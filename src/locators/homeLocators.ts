/**
 * Home/Inventory Page Locators
 * Centralized repository of all inventory page selectors
 */

export const HomeLocators = {
  // Header
  appLogo: '.app_logo',
  shoppingCartLink: '.shopping_cart_link',
  shoppingCartBadge: '.shopping_cart_badge',
  
  // Menu
  menuButton: '#react-burger-menu-btn',
  menuCrossButton: '#react-burger-cross-btn',
  logoutLink: '#logout_sidebar_link',
  allItemsLink: '#inventory_sidebar_link',
  aboutLink: '#about_sidebar_link',
  resetAppLink: '#reset_sidebar_link',
  
  // Inventory
  inventoryContainer: '.inventory_container',
  inventoryList: '.inventory_list',
  inventoryItem: '.inventory_item',
  inventoryItemName: '.inventory_item_name',
  inventoryItemDesc: '.inventory_item_desc',
  inventoryItemPrice: '.inventory_item_price',
  
  // Product sorting
  productSort: '.product_sort_container',
  
  // Buttons
  addToCartButton: '[data-test^="add-to-cart"]',
  removeButton: '[data-test^="remove"]',
  
  // Footer
  footer: '.footer',
  footerCopy: '.footer_copy',
  socialTwitter: '[data-test="social-twitter"]',
  socialFacebook: '[data-test="social-facebook"]',
  socialLinkedin: '[data-test="social-linkedin"]',
} as const;

export default HomeLocators;
