  <script>
    const products = [
      {
        id: 1,
        name: 'Product 1',
        images: [
          'https://shop-beauty.dior.com.kw/cdn/shop/products/Y0996347_C099600764_E01_GHC_en_INT_2_1200x1200.jpg?v=1706870986',
          'https://www.jeanpaulgaultier.com/medias/sys_master/images/h84/h90/9530414661662/9530414596126/9530414596126.png',
          'https://www.jeanpaulgaultier.com/medias/sys_master/images/h4b/h42/9530310590494/9530310524958/9530310524958.png'
        ],
        sizes: [
          { name: 'Small', price: 10 },
          { name: 'Medium', price: 15 },
          { name: 'Large', price: 20 }
        ],
        colors: ['Red', 'Blue', 'Green']
      },
      // Add more products as needed
    ];

    let cartItems = []; // Array to store cart items

    // Function to generate product elements
    function generateProductElements() {
      const productsContainer = document.querySelector('.products');
      productsContainer.innerHTML = ''; // Clear existing content

      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-id', product.id);
        productDiv.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}">
          <h3>${product.name}</h3>
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

        // Create size options
        const sizeSelect = document.getElementById('sizeSelect');
        sizeSelect.innerHTML = '';
        product.sizes.forEach(size => {
          const option = document.createElement('option');
          option.value = size.name;
          option.setAttribute('data-price', size.price); // Set data-price attribute for each option
          option.textContent = size.name;
          sizeSelect.appendChild(option);
        });

        // Create color options
        const colorSelect = document.getElementById('colorSelect');
        colorSelect.innerHTML = '';
        product.colors.forEach(color => {
          const option = document.createElement('option');
          option.value = color;
          option.textContent = color;
          colorSelect.appendChild(option);
        });

        // Update product image
        const thumbnailImages = document.querySelector('.thumbnail-images');
        thumbnailImages.innerHTML = '';
        product.images.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = product.name;
          img.onclick = () => document.getElementById('largeImage').src = imageUrl;
          thumbnailImages.appendChild(img);
        });

        // Update price display
        updatePrice();

        document.querySelectorAll('.container').forEach(container => {
          container.style.display = 'none';
        });
        document.getElementById('productDetail').style.display = 'block';
        document.getElementById('addToCartBtn').setAttribute('data-product-id', productId); // Add data-product-id attribute
      }
    }

    function updatePrice() {
      const sizeSelect = document.getElementById('sizeSelect');
      const selectedOption = sizeSelect.options[sizeSelect.selectedIndex];
      const selectedPrice = selectedOption.getAttribute('data-price');
      document.getElementById('productPrice').textContent = `Price: $${selectedPrice}`;
    }

    function addToCart() {
      const productId = document.getElementById('addToCartBtn').getAttribute('data-product-id');
      const product = products.find(prod => prod.id === parseInt(productId));
      const selectedSize = document.getElementById('sizeSelect').value;
      const selectedColor = document.getElementById('colorSelect').value;
      const quantity = parseInt(document.getElementById('quantityInput').value);

      if (product) {
        const selectedSizeData = product.sizes.find(size => size.name === selectedSize);
        if (selectedSizeData) {
          const totalPrice = selectedSizeData.price * quantity;
          cartItems.push({
            id: product.id,
            name: product.name,
            size: selectedSize,
            color: selectedColor,
            quantity,
            price: selectedSizeData.price,
            totalPrice
          });
          updateCartDisplay();
        }
      }
    }

    function updateCartDisplay() {
      const cartItemsList = document.getElementById('cartItemsList');
      cartItemsList.innerHTML = '';
      let subtotal = 0;

      cartItems.forEach(item => {
        subtotal += item.totalPrice;
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Size: ${item.size}, Color: ${item.color}, Quantity: ${item.quantity} - Total: $${item.totalPrice}`;
        cartItemsList.appendChild(listItem);
      });

      const subtotalAmount = document.getElementById('subtotalAmount');
      const totalAmount = document.getElementById('totalAmount');
      subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
      totalAmount.textContent = `$${(subtotal + 1.5).toFixed(2)}`;
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
    });
  </script>
