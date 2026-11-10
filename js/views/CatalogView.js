import View from './View.js';

class CatalogView extends View {
  _parentElement = document.querySelector('.product-grid');
  _searchElement = document.querySelector('.search-input');
  _categoryElement = document.querySelector('.category-select');
  _errorMessage = 'No shoes found matching your query.';

  addHandlerSearch(handler) {
    if (!this._searchElement || !this._categoryElement) return;

    const onFilterChange = () => {
      const query = this._searchElement.value;
      const category = this._categoryElement.value;
      handler(query, category);
    };
    this._searchElement.addEventListener('input', onFilterChange);
    this._categoryElement.addEventListener('change', onFilterChange);
  }
  
  addHandlerAddToCart(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn-add-cart');
      if (!btn) return;
      const id = btn.dataset.id;
      handler(id);
    });
  }

  _generateMarkup() {
    return this._data.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        <div class="product-info">
          <span class="product-cat">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">₱${product.price.toLocaleString()}</p>
          <button class="btn btn-add-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `).join('');
  }
}


export default new CatalogView();