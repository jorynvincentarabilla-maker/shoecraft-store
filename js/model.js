export const state = {
  products: [
    { id: '1', name: 'Nike Total 90', category: 'nike', price: 3148, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
    { id: '2', name: 'Adidas Samba OG', category: 'adidas', price: 4337, image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=500' },
    { id: '3', name: 'New Balance 550', category: 'newbalance', price: 5890, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500' },
    { id: '4', name: 'Puma Velocity Nitro 3', category: 'puma', price: 4290, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500' },
    { id: '5', name: 'Skechers Slip-ins Ultra Flex', category: 'skechers', price: 3995, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500' },
    { id: '6', name: 'Converse Chuck 70 Vintage High', category: 'converse', price: 3990, image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500' },
    { id: '7', name: 'Asics GEL-Kayano 14', category: 'asics', price: 7490, image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500' },
    { id: '8', name: 'Reebok Club C 85', category: 'reebok', price: 3795, image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500' },
    { id: '9', name: 'Crocs Classic Clog', category: 'crocs', price: 2995, image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=500' },
    { id: '10', name: 'World Balance Invictus', category: 'worldbalance', price: 2299, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500' }
  ],
  searchQuery: '',
  selectedCategory: 'all',
  cart: [],
  account: {
    fullName: '',
    email: '',
    address: ''
  },
  orders: []
};

export const setProductsFilter = function(query = '', category = 'all') {
  state.searchQuery = query.toLowerCase();
  state.selectedCategory = category;
};

export const getFilteredProducts = function() {
  return state.products.filter(product => {
    const matchesQuery = product.name.toLowerCase().includes(state.searchQuery) ||
                         product.category.toLowerCase().includes(state.searchQuery);
    const matchesCategory = state.selectedCategory === 'all' || product.category === state.selectedCategory;
    return matchesQuery && matchesCategory;
  });
};

export const addToCart = function(productId) {
  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity++;
  } else {
    const product = state.products.find(p => p.id === productId);
    if (product) state.cart.push({ ...product, quantity: 1 });
  }
  persistData();
};

export const updateCartQuantity = function(productId, newQty) {
  if (newQty <= 0) {
    state.cart = state.cart.filter(item => item.id !== productId);
  } else {
    const item = state.cart.find(item => item.id === productId);
    if (item) item.quantity = newQty;
  }
  persistData();
};

export const getCartTotals = function() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal > 0 ? 150 : 0;
  const grandTotal = subtotal + shippingFee; 
  return { subtotal, shippingFee, grandTotal };
};

export const createOrder = function(customerData) {
  state.account = customerData;
  const totals = getCartTotals();
  const order = {
    id: 'SHOECRAFT-' + Date.now().toString().slice(-6),
    date: new Date().toLocaleDateString(),
    items: [...state.cart],
    total: totals.grandTotal,
    customer: customerData
  };
  state.orders.unshift(order);
  state.cart = [];
  persistData();
  return order;
};

const persistData = function() {
  localStorage.setItem('shoecraft_cart', JSON.stringify(state.cart));
  localStorage.setItem('shoecraft_account', JSON.stringify(state.account));
  localStorage.setItem('shoecraft_orders', JSON.stringify(state.orders));
};

export const loadPersistedData = function() {
  const cart = localStorage.getItem('shoecraft_cart');
  const account = localStorage.getItem('shoecraft_account');
  const orders = localStorage.getItem('shoecraft_orders');

  if (cart) state.cart = JSON.parse(cart);
  if (account) state.account = JSON.parse(account);
  if (orders) state.orders = JSON.parse(orders);
  
};