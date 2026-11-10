import * as model from './model.js';
import catalogView from './views/CatalogView.js';
import cartView from './views/CartView.js';
import checkoutView from './views/CheckoutView.js';
import accountView from './views/AccountView.js'; 
const controlCatalog = function(query, category) {
  model.setProductsFilter(query, category);
  catalogView.render(model.getFilteredProducts());
};
const controlAddToCart = function(productId) {
  model.addToCart(productId);
  renderCart();
};


const controlUpdateCart = function(productId, action) {
  const item = model.state.cart.find(i => i.id === productId);
  if (!item) return;

  const newQty = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
  model.updateCartQuantity(productId, newQty);
  renderCart();
};

const controlCheckout = function(customerData) {
  if (model.state.cart.length === 0) {
    alert('Your shopping cart is currently empty!');
    return;
  }
  const order = model.createOrder(customerData);
  checkoutView.render(order);
  renderCart();
  accountView.render(model.state.orders); 
};
const renderCart = function() {
  cartView.render({
    items: model.state.cart,
    totals: model.getCartTotals()
  });
};

const init = function() {
  model.loadPersistedData();

  catalogView.render(model.getFilteredProducts());
  renderCart();
  accountView.render(model.state.orders); // <-- 3. Restore Order History after page refresh!

  catalogView.addHandlerSearch(controlCatalog);
  catalogView.addHandlerAddToCart(controlAddToCart);
  cartView.addHandlerQuantityChange(controlUpdateCart);
  checkoutView.addHandlerSubmit(controlCheckout);
};

init();