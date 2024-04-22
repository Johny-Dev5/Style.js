  const products = [
  {
    id: 1,
    name: 'Product 1 NAME Name',
    images: [
      'https://shop-beauty.dior.com.kw/cdn/shop/products/Y0996347_C099600764_E01_GHC_en_INT_2_1200x1200.jpg?v=1706870986',
      'https://perfame.com/cdn/shop/products/Perfame_Elixir_17_Main.jpg?v=1678554466',
      'https://hips.hearstapps.com/hmg-prod/images/1-baccarat-perfume-dupes-64931c3128681.jpg?crop=0.405xw:0.811xh;0.293xw,0.109xh&resize=640:*'
    ],
    sizes: [
      { name: 'Small', price: 10 },
      { name: 'Medium', price: 15 },
      { name: 'Large', price: 20 }
    ],
    colors: ['Red', 'Blue', 'Green'],
    customColors: ['#fffff', '#0000ff', '#00ff00'],
    tag: '',
    stock: true,
    description: "<p><strong>Content + Care</strong><br>100% Cotton<br>Machine wash inside out<br>Lay flat to dry<br>Imported</p>",
  },
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
          cartItems.push({ ...product, quantity });
        }
        updateCartDisplay();
        saveCartToLocalStorage();
      }
    }

    function updateCartDisplay() {
      const cartItemsList = document.getElementById('cartItemsList');
      cartItemsList.innerHTML = '';
      let subtotal = 0;

      cartItems.forEach(item => {
        const listItem = document.createElement('li');
        const totalPrice = item.price * item.quantity;
        subtotal += totalPrice;
        listItem.textContent = `${item.name} - Quantity: ${item.quantity} - Total: $${totalPrice}`;
        cartItemsList.appendChild(listItem);
      });

      const totalAmount = document.getElementById('totalAmount');
      totalAmount.textContent = `$${(subtotal).toFixed(2)}`;
    }

    function saveCartToLocalStorage() {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    }

    function loadCartFromLocalStorage() {
      const cartData = localStorage.getItem(cartKey);
      if (cartData) {
        cartItems = JSON.parse(cartData);
        updateCartDisplay();
      }
    }

    document.addEventListener('DOMContentLoaded', function() {
      document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          document.querySelectorAll('.container').forEach(container => {
            container.style.display = 'none';
          });
          document.getElementById(targetId).style.display = 'block';
          if (targetId === 'shop') {
            generateProductElements();
          }
        });
      });

      loadCartFromLocalStorage(); // Load cart items when the page loads

      function generateProductElements() {
        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = '';

        products.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          productDiv.setAttribute('data-id', product.id);
          productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
          `;
          productDiv.addEventListener('click', () => showProductDetail(product.id));
          productsContainer.appendChild(productDiv);
        });
      }

      function showProductDetail(productId) {
        const product = products.find(prod => prod.id === productId);
        if (product) {
          document.getElementById('productName').textContent = product.name;
          document.getElementById('productDescription').textContent = `Description of ${product.name}`;
          document.getElementById('productPrice').textContent = `Price: $${product.price}`;

          const largeImage = document.getElementById('largeImage');
          largeImage.src = product.images[0];

          const thumbnailContainer = document.querySelector('.thumbnail-images');
          thumbnailContainer.innerHTML = '';

          product.images.forEach((imageUrl, index) => {
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = imageUrl;
            thumbnailImg.alt = `Thumbnail ${index + 1}`;
            thumbnailImg.classList.add('thumbnail');
            thumbnailImg.addEventListener('click', () => changeLargeImage(imageUrl));
            thumbnailContainer.appendChild(thumbnailImg);
          });

          document.querySelectorAll('.container').forEach(container => {
            container.style.display = 'none';
          });
          document.getElementById('productDetail').style.display = 'block';
          document.getElementById('addToCartBtn').setAttribute('data-product-id', productId);
        }
      }

      function changeLargeImage(imageUrl) {
        const largeImage = document.getElementById('largeImage');
        largeImage.src = imageUrl;
      }
    });
