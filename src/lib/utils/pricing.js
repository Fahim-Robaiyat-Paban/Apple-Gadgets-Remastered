export const getDiscount = (product) =>
  product.regularPrice ? product.regularPrice - product.price : 0;

export const getCartCount = (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const getCartTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);
