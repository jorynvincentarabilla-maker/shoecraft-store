import View from './View.js';

class AccountView extends View {
  _parentElement = document.querySelector('.order-history-container');
  _errorMessage = 'No past orders found.';
  
  _generateMarkup() {
    if (!this._data || this._data.length === 0) return this.renderError();

    return this._data.map(order => `
      <div class="order-card" style="border-bottom: 1px solid var(--border-color); padding-bottom: 0.8rem; margin-bottom: 0.8rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--ocean-blue);">
          <strong>${order.id}</strong>
          <span>${order.date}</span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin: 0.2rem 0;">
          Customer: ${order.customer.fullName}
        </p>
        <p style="font-size: 0.85rem; font-weight: bold; color: var(--orange-accent);">
          Total: ₱${order.total.toLocaleString()} (${order.items.length} item/s)
        </p>
      </div>
    `).join('');
  }
}

export default new AccountView();