import View from './View.js';

class CheckoutView extends View {
  _parentElement = document.querySelector('.checkout-form-container');

  addHandlerSubmit(handler) {
    const form = document.querySelector('#checkout-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      if (!data.fullName || !data.email || !data.address) {
        alert('Please fill out all delivery information fields.');
        return;
      }
      handler(data);
    });
  }

  _generateMarkup() {
    return `
      <div class="order-success-card">
        <h2 style="color: var(--ocean-blue); margin-bottom: 0.5rem;">Order Confirmed!</h2>
        <p style="margin-bottom: 0.5rem;">Order Ref: <strong>${this._data.id}</strong></p>
        <p style="font-size: 0.9rem; color: var(--text-muted);">Thank you, ${this._data.customer.fullName}. Your footwear order is registered for shipment to ${this._data.customer.address}.</p>
        <h3 style="margin-top: 1rem; color: var(--orange-accent);">Total Paid: ₱${this._data.total.toLocaleString()}</h3>
      </div>
    `;
  }
}

export default new CheckoutView();