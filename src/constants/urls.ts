import { ENV } from '../config/env';

export const URLS = {
  // Base URLs
  BASE: ENV.BASE_URL,
  
  // Authentication
  LOGIN: '/',
  
  // Main Pages
  INVENTORY: '/inventory.html',
  CART: '/cart.html',
  CHECKOUT_STEP_ONE: '/checkout-step-one.html',
  CHECKOUT_STEP_TWO: '/checkout-step-two.html',
  CHECKOUT_COMPLETE: '/checkout-complete.html',
  
  // Product Details
  PRODUCT_DETAILS: '/inventory-item.html',
  
  // API Endpoints (if applicable)
  API: {
    LOGIN: '/api/v1/auth/login',
    PRODUCTS: '/api/v1/products',
    CART: '/api/v1/cart',
    CHECKOUT: '/api/v1/checkout',
  },
};

export const getFullUrl = (path: string): string => {
  return `${URLS.BASE}${path}`;
};

export default URLS;
