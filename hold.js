const products = [
  {
    id: 1,
    name: 'Product 1 NAME Name',
    price: 10,
  },
  // Add more product data as needed
];

const cartKey = 'cart_items';
let cartItems = [];

function addToCart() {
  const productId = document.getElementById('addToCartBtn').getAttribute('data-product-id');
  const product = products.find(prod => prod.id === parseInt(productId));
  const quantity = parseInt(document.getElementById('quantityInput').value);

  if (product) {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({ id: product.id, quantity });
    }
    updateCartDisplay();
    saveCartToCookie();
  }
}

function updateCartDisplay() {
  const cartItemsList = document.getElementById('cartItemsList');
  cartItemsList.innerHTML = '';
  let subtotal = 0;

  cartItems.forEach(item => {
    const product = products.find(prod => prod.id === item.id);
    if (product) {
      const listItem = document.createElement('li');
      const totalPrice = product.price * item.quantity;
      subtotal += totalPrice;
      listItem.textContent = `${product.name} - Quantity: ${item.quantity} - Total: $${totalPrice}`;
      cartItemsList.appendChild(listItem);
    }
  });

  const totalAmount = document.getElementById('totalAmount');
  totalAmount.textContent = `$${(subtotal).toFixed(2)}`;
}

function saveCartToCookie() {
  const cartItemsString = JSON.stringify(cartItems);
  document.cookie = `${cartKey}=${cartItemsString}; expires=Thu, 18 Dec 2025 12:00:00 UTC; path=/`;
}

function loadCartFromCookie() {
  const cookies = document.cookie.split("; ");
  const cartCookie = cookies.find(cookie => cookie.startsWith(cartKey));
  if (cartCookie) {
    const cartItemsString = cartCookie.split("=")[1];
    cartItems = JSON.parse(cartItemsString);
    updateCartDisplay();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadCartFromCookie(); // Load cart items when the page loads

  // Your other code remains unchanged...
});
