import View from './View.js';

class CartView extends View {
  _parentElement = document.querySelector('.cart-container');
  _errorMessage = 'Your shopping cart is empty.';

  addHandlerQuantityChange(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn-qty');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      handler(id, action);
    });
  }

  _generateMarkup() {
    const { items, totals } = this._data;

    const itemsMarkup = items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <h4>${item.name}</h4>
          <p>₱${item.price.toLocaleString()} x ${item.quantity}</p>
        </div>
        <div class="item-actions">
          <button class="btn-qty" data-id="${item.id}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="btn-qty" data-id="${item.id}" data-action="increase">+</button>
        </div>
      </div>
    `).join('');

    return `
      <div class="cart-items-list">
        ${itemsMarkup}
      </div>
      <div class="cart-summary">
        <p><span>Subtotal:</span> <span>₱${totals.subtotal.toLocaleString()}</span></p>
        <p><span>Shipping:</span> <span>₱${totals.shippingFee.toLocaleString()}</span></p>
        <h3><span>Total:</span> <span>₱${totals.grandTotal.toLocaleString()}</span></h3>
      </div>
    `;
  }
}
export default new CartView();