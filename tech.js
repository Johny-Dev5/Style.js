document.getElementById('submissionForm').addEventListener('submit', function(event) {
  document.getElementById('imageForm').dispatchEvent(new Event('submit'));
});
document.getElementById('imageForm').addEventListener('submit', function(event) {
  event.preventDefault();   
  
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
    
    const formData = new FormData();
    formData.append('image', base64String);
    
    fetch('https://script.google.com/macros/s/AKfycbxTqaYoCt8n5NwMDj5EOtGHdsA-CoK5o4jjXqZ96PaH3DQYy6jxw8LiODkIdgU9LY1R/exec', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        document.getElementById('imageForm').reset();
      }
    })
    .catch(error => console.error('Error:', error));
  };
  
  reader.readAsDataURL(document.getElementById('image').files[0]);
});
var imageInputSubmissionForm = document.getElementById('image');
var imageInputImageForm = document.getElementById('image');
imageInputSubmissionForm.addEventListener('change', function() {
  imageInputImageForm.files = imageInputSubmissionForm.files;
});
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
  {
    id: 2,
    name: 'ហ្វូមពពុះ LAMEILA',
    images: [
      'https://shop-beauty.dior.com.kw/cdn/shop/products/Y0996347_C099600764_E01_GHC_en_INT_2_1200x1200.jpg?v=1706870986',
      'https://shop-beauty.dior.com.kw/cdn/shop/products/Y0996347_C099600764_E01_GHC_en_INT_2_1200x1200.jpg?v=1706870986',
      'https://shop-beauty.dior.com.kw/cdn/shop/products/Y0996347_C099600764_E01_GHC_en_INT_2_1200x1200.jpg?v=1706870986'
    ],
    sizes: [],
    colors: [],
    customColors: [],
    stock: true,
    description: "<p><strong>អត្ថប្រយោជន៏</strong><br>100% Cotton<br>🌟ជាប្រភេទហ្វូមពពុះ បឺតនិងបណ្ដេញជាតិពុល ជួយជម្រុញកោសិកាចាស់ៗ លាងសំអាតMake upបានយ៉ាងល្អ​ បំបាត់មុនសាច់ មុនអង្កាម មុនក្បាលខ្មៅ សម្អាតរាល់ជាតិកង្វក់លើផ្ទៃមុខ ធ្វើអោយមុខអោយស ភ្លឺថ្លា​  និងផ្តល់សំណេីម​លេីស្បែកមុខ​ ស្បែកមុខស្តេីងបែបណាក៏អាចប្រេីជាមួយនិងហ្វូមពពុះ​ LAMEILA  នេះបានដែរណាបងៗ💦y<br>Imported</p>",
    price: 5
  },
];
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const navLinks = document.querySelectorAll('.nav-links a'); // Navigation links
    const productGrid = document.getElementById('productGrid'); // Product grid container
    const cartPageContainer = document.getElementById('cartPageContainer'); // Cart page container
    const cartItemsList = document.getElementById('cartItemsList'); // Cart items list container
    const subtotalAmount = document.getElementById('subtotalAmount'); // Subtotal amount display
    const totalAmountSpan = document.getElementById('totalAmount'); // Total amount display
    const totalPriceTextarea = document.getElementById('total_price'); // Total price textarea
    const totalAmount = document.getElementById('totalAmount'); // Total amount display
    const myCartItemsList = document.getElementById('myCartItemsList');
    const cartEmptyMessage = document.getElementById('cartEmptyMessage');
    const continueShoppingLink = document.getElementById('continueShoppingLink');
    // const cartIcon = document.getElementById('cartIcon');

    
    // Product details elements
    const productDetails = document.getElementById('productDetails');
    const productName = document.getElementById('productName');
    const productPrice = document.getElementById('productPrice');
    const productImg = document.getElementById('productImg');
    const addToCartBtn = document.getElementById('addToCartBtn');
    function updateTotalPrice() {
         const totalAmountText = totalAmountSpan.textContent; // Get the total amount text
         const totalAmountValue = parseFloat(totalAmountText.replace('$', '')); // Convert to a number
        totalPriceTextarea.value = totalAmountValue.toFixed(2); // Set the value of the textarea
    }

    // Call the function initially to set the initial value
    updateTotalPrice();

    // Add an event listener to update the total price whenever the total amount changes
    totalAmountSpan.addEventListener('DOMSubtreeModified', updateTotalPrice); 
   
    let currentPage = 'Shop'; 
    let cartItems = [];
    let myCartItems = [];
    

        });//End DOMContentLoaded
// Array to store cart items
let cartItems = [];
let myCartItems = [];

// Function to generate product elements
function generateProductElements() {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = ''; // Clear existing content
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.setAttribute('data-id', product.id);
         let priceToShow = product.price; // Default to the product's base price
        if (product.sizes && product.sizes.length > 0) {
            // Get the price of the first size
            priceToShow = product.sizes[0].price;
        }
        productDiv.innerHTML = `
          <img src="${product.images[0]}" alt="${product.name}"> <!-- Ensure product.images[0] is correct -->
          <h3>${product.name}</h3>
          <p>$${priceToShow}</p>
        `;
        if (product.tag) {
            const tag = document.createElement('p');
            tag.textContent = product.tag;
            tag.className = 'tag';
            productDiv.appendChild(tag);
        }
        productDiv.addEventListener('click', () => showProductDetail(product.id));
        productsContainer.appendChild(productDiv);
    });
}
function showProductDetail(productId) {
    const product = products.find(prod => prod.id === productId);
    if (product) {
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productDescription').innerHTML = product.description; // Use innerHTML to render HTML content

        // Inside showProductDetail function
        if (product.stock) {
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.disabled = false;
            document.getElementById('quantityText').textContent = 'QUANTITY';
        } else {
            addToCartBtn.textContent = 'Sold Out';
            addToCartBtn.disabled = true;
            document.getElementById('quantityText').textContent = 'Sold Out';
        }

        // Update product images
        const thumbnailImages = document.querySelector('.thumbnail-images');
        thumbnailImages.innerHTML = '';
        product.images.forEach((imageUrl, index) => {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = product.name;
            img.onclick = () => {
                document.getElementById('largeImage').src = imageUrl;
                document.getElementById('largeImage').alt = product.name; // Update alt text as well
            };
            thumbnailImages.appendChild(img);

            // Display the first image on the large image initially
            if (index === 0) {
                document.getElementById('largeImage').src = imageUrl;
                document.getElementById('largeImage').alt = product.name;
            }
        });

        // Update product images slider
        const productImagesSlider = document.getElementById('product-images-slider');
        productImagesSlider.innerHTML = ''; 

        product.images.forEach(imageUrl => {
            const slide = document.createElement('div');
            slide.classList.add('slick-slide');
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = product.name;
            slide.appendChild(img);
            productImagesSlider.appendChild(slide);
        });

        // Initialize or update the Slick slider
        if (productImagesSlider.classList.contains('slick-initialized')) {
            // If already initialized, re-slick the slider
            $(productImagesSlider).slick('unslick');
            $(productImagesSlider).slick();
        } else {
            // Initialize the Slick slider
            $(productImagesSlider).slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
                autoplaySpeed: 2000
            });
        }

        // Update color buttons
        const colorButtonsContainer = document.getElementById('colorButtons');
        colorButtonsContainer.innerHTML = '';
        product.colors.forEach(color => {
            const button = document.createElement('button');
            button.classList.add('color-button');
            button.style.backgroundColor = color.toLowerCase();
            button.addEventListener('click', () => handleColorSelection(button, color));
            colorButtonsContainer.appendChild(button);
        });
        const firstColorButton = colorButtonsContainer.querySelector('.color-button');
        if (firstColorButton) {
            firstColorButton.click(); 
        }
             else {
            colorButtonsContainer.innerHTML = ''; 
            colorButtonsContainer.style.marginBottom = '0'; 
                }

        // Check if sizes are available
        const sizeSelector = document.getElementById('sizeSelector');
        if (product.sizes.length > 0) {
            sizeSelector.style.display = 'block';
            const sizeButtonsContainer = document.getElementById('sizeButtons');
            sizeButtonsContainer.innerHTML = ''; // Clear existing buttons
            product.sizes.forEach(size => {
                const button = document.createElement('button');
                button.classList.add('size-button');
                button.textContent = size.name;
                button.setAttribute('data-price', size.price);
                button.addEventListener('click', () => handleSizeSelection(button, size.price));
                sizeButtonsContainer.appendChild(button);
            });
            // Set initial price based on size "Small"
            const selectedSize = 'Small';
            const selectedSizeData = product.sizes.find(size => size.name === selectedSize);
            if (selectedSizeData) {
                // Update price and apply 'active' class to the initial size button
                updatePrice(selectedSizeData.price);
                document.querySelector('.size-button[data-price="' + selectedSizeData.price + '"]').classList.add('active');
            }
        } else {
            sizeSelector.style.display = 'none';
            document.getElementById('productPrice').textContent = `Price: $${product.price}`;
             sizeSelector.style.marginBottom = '0';
        }

        // Update custom text
        const customTextElement = document.getElementById('customText');
        if (product.customText) {
            customTextElement.textContent = product.customText;
        } else {
            customTextElement.textContent = ''; // Clear the text if no custom text is available
        }
        document.getElementById('quantityInput').value = 1; // Reset quantity input to 1

        // Display the product details container
        document.querySelectorAll('.container').forEach(container => {
            container.style.display = 'none';
        });
        document.getElementById('productDetail').style.display = 'block';
        document.getElementById('addToCartBtn').setAttribute('data-product-id', productId); // Add data-product-id attribute
    }
}
function updatePrice() {
      const product = getCurrentProduct();
      if (product) {
        const selectedSize = document.getElementById('sizeSelect').value;
        const selectedSizeData = product.sizes.find(size => size.name === selectedSize);
        if (selectedSizeData) {
          document.getElementById('productPrice').textContent = `Price: $${selectedSizeData.price}`;
        }
      }
    }

function getCurrentProduct() {
      const productId = document.getElementById('addToCartBtn').getAttribute('data-product-id');
      return products.find(prod => prod.id === parseInt(productId));
    }
let nextItemId = 1; // Initialize a variable to generate unique item IDs

function addToCart() {
  const productId = document.getElementById('addToCartBtn').getAttribute('data-product-id');
  const product = products.find(prod => prod.id === parseInt(productId));
  const selectedSizeButton = document.querySelector('.size-button.active');
  const selectedColorButton = document.querySelector('.color-button.active');
  let quantity = parseInt(document.getElementById('quantityInput').value);
  quantity = Math.max(1, quantity);

  if (product) {
    let selectedSize = '';
    let selectedColor = '';

    // Check if the product has size and color options
    if (selectedSizeButton) {
      selectedSize = selectedSizeButton.textContent;
    }

    if (selectedColorButton) {
      selectedColor = selectedColorButton.style.backgroundColor; // Get the color from the button style
    }

    const selectedSizeData = product.sizes.find(size => size.name === selectedSize);
    
    if (!selectedSizeData) {
      selectedSize = ''; // Reset selectedSize if no size data
    }

    const totalPrice = selectedSizeData ? selectedSizeData.price * quantity : product.price * quantity;
    const existingCartItem = cartItems.find(item =>
      item.name === product.name &&
      item.size === selectedSize &&
      item.color === capitalizeFirstLetter(selectedColor)
    );

    if (existingCartItem) {
      // Update existing cart item
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice += totalPrice;
    } else {
      // Add new cart item with a unique ID
      cartItems.push({
        id: nextItemId++,
        name: product.name,
        image: product.images[0],
        size: selectedSize,
        color: capitalizeFirstLetter(selectedColor), // Capitalize the color name if available
        quantity,
        price: selectedSizeData ? selectedSizeData.price : product.price,
        totalPrice
      });
    }
    updateCartDisplay();
   
  }
  document.getElementById('quantityInput').value = 1;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function updateCartDisplay() {
  const cartItemsList = document.getElementById('cartItemsList');
  cartItemsList.innerHTML = ''; // Clear existing cart items
  let subtotal = 0;
  let totalQuantity = 0; // Rename quantity to totalQuantity to avoid conflicts

  // Add table header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th class="caption-with-letter-spacing" colspan="2" scope="col">Product</th>
      <th class="cart-items__heading--wide small-hide caption-with-letter-spacing quantity-header" colspan="1" scope="col">Quantity</th>
      <th class="small-hide right caption-with-letter-spacing total-header" colspan="1" scope="col">Total</th>
  `;
  cartItemsList.appendChild(headerRow);

  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.classList.add('cart-item');
    listItem.style.display = 'flex'; // Set display to flex for proper alignment
    listItem.style.alignItems = 'center'; // Align items vertically in the flex container

    // Create and append the product image
    const productImage = document.createElement('img');
    productImage.src = item.image; 
    productImage.alt = item.name;
    productImage.style.width = '20px'; 
    listItem.appendChild(productImage);

    // Create and append the product details container
    const productDetailsContainer = document.createElement('div');
    productDetailsContainer.classList.add('product-details-container');
    productDetailsContainer.style.flexGrow = '1'; // Allow product details to expand
    productDetailsContainer.style.marginLeft = '10px'; // Add margin for spacing

    // Product Name
    const productName = document.createElement('div');
    productName.textContent = item.name;
    productDetailsContainer.appendChild(productName);

    // Size
    const size = document.createElement('div');
    size.textContent = ` ${item.size}`;
    productDetailsContainer.appendChild(size);

    // Color
    const color = document.createElement('div');
    color.textContent = ` ${item.color}`;
    productDetailsContainer.appendChild(color);

    // Price
    const price = document.createElement('div');
    price.textContent = ` $${item.price}`;
    productDetailsContainer.appendChild(price);

    listItem.appendChild(productDetailsContainer);

    // Create and append the quantity container
    const quantityContainer = document.createElement('div');
    quantityContainer.style.marginRight = '71px'; // Add margin for spacing

    // Quantity
    const quantityValue = document.createElement('div'); // Rename quantity to quantityValue
    quantityValue.textContent = ` ${item.quantity}`;
    quantityContainer.appendChild(quantityValue);
    listItem.appendChild(quantityContainer);

    // Total
    const totalPrice = item.price * item.quantity;
    subtotal += totalPrice;
    const total = document.createElement('div');
    total.textContent = ` $${totalPrice}`;
    listItem.appendChild(total);

    cartItemsList.appendChild(listItem);

    // Update total quantity
    totalQuantity += item.quantity;
  });

  const subtotalAmount = document.getElementById('subtotalAmount');
  const totalAmount = document.getElementById('totalAmount');
  subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
  totalAmount.textContent = `$${(subtotal + 1.5).toFixed(2)}`;

  // Update cart quantity display
  const cartQuantity = document.getElementById('cartQuantity');
  cartQuantity.textContent = totalQuantity;
  cartQuantity.style.display = totalQuantity > 0 ? 'inline-block' : 'none'; // Show if totalQuantity > 0

  // Call the updateProductTextarea() function
  updateProductTextarea();
}

function handleSizeSelection(selectedButton, price) {
      // Remove 'active' class from all size buttons
      const sizeButtons = document.querySelectorAll('.size-button');
      sizeButtons.forEach(button => {
        button.classList.remove('active');
      });

      // Add 'active' class to the selected button
      selectedButton.classList.add('active');

      // Update price display
      updatePrice(price);
    }
function handleColorSelection(selectedButton, color) {
    // Remove 'active' class from all color buttons
    const colorButtons = document.querySelectorAll('.color-button');
    colorButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the selected button
    selectedButton.classList.add('active');

    // Set the selected color as the active color name
    const selectedColor = color.toLowerCase(); // Convert color to lowercase for consistency
    selectedButton.setAttribute('data-color', selectedColor);

    // Display the selected color name
    const selectedColorDisplay = document.getElementById('selectedColorDisplay');
    selectedColorDisplay.textContent = `Color --- ${color}`;
}
function updatePrice(selectedPrice) {
      document.getElementById('productPrice').textContent = `Price: $${selectedPrice}`;
}
function increment() {
  var value = parseInt(document.getElementById('quantityInput').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('quantityInput').value = value;
}

function decrement() {
  let quantityInput = document.getElementById('quantityInput');
  let quantity = parseInt(quantityInput.value);

  if (quantity > 1) {
    quantity--;
    quantityInput.value = quantity;
  }
}

function updateTotalPrice() {
    const quantity = parseInt(document.getElementById('quantityInput').value, 10);
    const productPrice = parseInt(document.getElementById('productPrice').textContent.replace('$', ''), 10);
    const totalPrice = quantity * productPrice;
    document.getElementById('totalPrice').textContent = `$${totalPrice}`;
}
document.addEventListener('DOMContentLoaded', function() {
const input = document.getElementById('image');
  const imagePreview = document.getElementById('imagePreview');
  const previewImage = document.getElementById('previewImage');

  input.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImage.src = e.target.result;
        imagePreview.style.display = 'block'; // Show the image preview container
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.src = '#'; // Clear the image source if no file is selected
      imagePreview.style.display = 'none'; // Hide the image preview container
    }
  });
  
const checkoutButton = document.getElementById('checkoutButton');
  checkoutButton.addEventListener('click', function() {
    document.querySelectorAll('.container').forEach(container => {
      container.style.display = 'none'; // Hide all containers
    });
    document.getElementById('cart').style.display = 'block'; // Show the Cart container
  });
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
      } else if (targetId === 'mycart') {
        generateMyCartItems();
      }
        });
      });
    document.getElementById('cartIcon').addEventListener('click', function() {
    document.querySelectorAll('.container').forEach(container => {
      container.style.display = 'none';
    });
    document.getElementById('mycart').style.display = 'block';
    generateMyCartItems();
  });
  // Continue Shopping Link Event Listener
  document.getElementById('continueShoppingLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.container').forEach(container => {
      container.style.display = 'none';
    });
    document.getElementById('shop').style.display = 'block';
    generateProductElements();
  });

  // Initial display based on URL hash
  const initialTarget = window.location.hash.substring(1);
  if (initialTarget === 'shop') {
    generateProductElements();
  } else if (initialTarget === 'mycart') {
    generateMyCartItems();
  }
       generateProductElements();
    });

function updateDeliveryFee() {
            const deliveryFeeTextarea = document.getElementById('delivery_fee');
            const deliveryFee = 1.50; // Your delivery fee value here
        
            // Set the value of the textarea to the delivery fee
            deliveryFeeTextarea.value = '$' + deliveryFee.toFixed(2);
        }

        // Call the function to update the delivery fee
        updateDeliveryFee();

         // Event listener for the button to show the hidden textarea
        const showProductTextareaBtn = document.getElementById('showProductTextareaBtn');
        showProductTextareaBtn.addEventListener('click', function() {
            const productTextarea = document.getElementById('product');
            productTextarea.style.display = 'block';
});

function initializeSlider(images) {
  $('.product-images-slick').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  // Add the product images to the slider
  const slickTrack = $('.product-images-slick .slick-track');
  images.forEach(imageUrl => {
    const slide = $('<div></div>').addClass('slick-slide');
    const img = $('<img />').attr('src', imageUrl).attr('alt', 'Product Image');
    slide.append(img);
    slickTrack.append(slide);
  });
}
function generateMyCartItems() {
  const myCartItemsList = document.getElementById('myCartItemsList');
  myCartItemsList.innerHTML = ''; // Clear existing items
  let subtotal = 0;

  if (cartItems.length === 0) {
    const flexContainer = document.querySelector('.flex-container');
    flexContainer.style.display = 'none'; // Hide the flex container when cart is empty

    const cartEmptyMessage = document.getElementById('cartEmptyMessage');
    cartEmptyMessage.style.display = 'block';

    const continueShoppingLink = document.getElementById('continueShoppingLink');
    continueShoppingLink.addEventListener('click', function() {
      // Handle the continue shopping action, e.g., show the shop page
      document.getElementById('shop').style.display = 'block';
      document.getElementById('myCart').style.display = 'none';
    });
  } else {
    cartItems.forEach(item => {
      subtotal += item.price * item.quantity;
      const listItem = document.createElement('li');
      listItem.classList.add('cart-item');
      listItem.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="product-details-container">
          <div>${item.name}</div>
          <div>Size: ${item.size}</div>
          <div>Color: ${item.color}</div>
          <div>Price: $${item.price}</div>
          <div class="quantity-container">
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="deleteCartItem(${item.id})">X</button>
          </div>
        </div>
        <div>Total: $${item.price * item.quantity}</div>
      `;
      myCartItemsList.appendChild(listItem);
    });

    const flexContainer = document.querySelector('.flex-container');
    flexContainer.style.display = 'flex'; // Display the flex container when cart has items
    const cartEmptyMessage = document.getElementById('cartEmptyMessage');
    cartEmptyMessage.style.display = 'none';
  }
  const mySubtotalAmount = document.getElementById('mySubtotalAmount');
  const myTotalAmount = document.getElementById('myTotalAmount');
  mySubtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
  myTotalAmount.textContent = `$${(subtotal + 1.5).toFixed(2)}`; // Assuming a flat fee of $1.5 for shipping/handling
}
function increaseQuantity(itemId) {
  const item = cartItems.find(item => item.id === itemId);
  if (item) {
    item.quantity++;
    updateCartDisplays(); 
  }
}
function decreaseQuantity(itemId) {
  const item = cartItems.find(item => item.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCartDisplays(); 
  }
}
function deleteCartItem(itemId) {
  const index = cartItems.findIndex(item => item.id === itemId);
  if (index !== -1) {
    cartItems.splice(index, 1);
    updateCartDisplays();
    updateProductTextarea();
  } else {
    console.error('Item not found in cart:', itemId);
  }
}
function updateCartDisplays() {
  generateMyCartItems();
  updateCartDisplay();
}
function updateDeliveryFee() {
            const deliveryFeeTextarea = document.getElementById('delivery_fee');
            const deliveryFee = 1.50; // Your delivery fee value here
        
            // Set the value of the textarea to the delivery fee
            deliveryFeeTextarea.value = '$' + deliveryFee.toFixed(2);
}
updateDeliveryFee();
function showConfirmationMessage() {
    // Hide other sections except the form
    document.querySelectorAll('.container').forEach(container => {
        if (container.id !== 'submissionForm') {
            container.style.display = 'none';
        }
    });
    // Show the thank you message after a delay
    setTimeout(() => {
        document.getElementById('thankyou').style.display = 'block';

        // Populate order details
        populateOrderDetails();

        resetMyCart();
        generateMyCartItems();
        resetCart();
        resetMyCartItems();
    }, 1000); // 2000 milliseconds = 2 seconds
}
function getCartSubtotal() {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
function populateOrderDetails() {
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('orderDate').textContent = currentDate;

    // Populate customer details
    const customerName = document.getElementById('name').value;
    const customerPhone = document.getElementById('phone').value;
    const customerAddress = document.getElementById('address').value;
    const paidBy = document.querySelector('input[name="entry.1281750962"]:checked').value;
    const customerNote = document.getElementById('note').value;

    document.getElementById('customerName').textContent = customerName;
    document.getElementById('customerPhone').textContent = customerPhone;
    document.getElementById('customerAddress').textContent = customerAddress;
    document.getElementById('paidBy').textContent = paidBy;
    document.getElementById('customerNote').textContent = customerNote;

    // Populate cart items list and total amount on thank you page
    const thankYouCartItemsList = document.getElementById('thankYouCartItemsList');
    thankYouCartItemsList.innerHTML = ''; // Clear existing content

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('order-item');
        // Item details
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        itemDetails.textContent = `${item.quantity} x ${item.name}`;

        // Size (if available)
        if (item.size) {
            const sizeInfo = document.createElement('div');
            sizeInfo.textContent = `Size: ${item.size}`;
            itemDetails.appendChild(sizeInfo);
        }

        // Color (if available)
        if (item.color) {
            const colorInfo = document.createElement('div');
            colorInfo.textContent = `Color: ${item.color}`;
            itemDetails.appendChild(colorInfo);
        }

        listItem.appendChild(itemDetails);

        // Total price
        const totalPrice = document.createElement('div');
        totalPrice.classList.add('total-price');
        totalPrice.textContent = `$${item.totalPrice.toFixed(2)}`;
        listItem.appendChild(totalPrice);

        thankYouCartItemsList.appendChild(listItem);
    });

    // Populate total amounts (assuming these elements already exist)
    const thankYouSubtotalAmount = document.getElementById('thankYouSubtotalAmount');
    const thankYouTotalAmount = document.getElementById('thankYouTotalAmount');
    thankYouSubtotalAmount.textContent = `$${getCartSubtotal().toFixed(2)}`;
    thankYouTotalAmount.textContent = `$${(getCartSubtotal() + 1.5).toFixed(2)}`; // Assuming a flat shipping fee of $1.50
}


function resetCart() {
    // Clear cart items list
    const cartItemsList = document.getElementById('cartItemsList');
    cartItemsList.innerHTML = '';

    // Reset subtotal and total amounts
    const subtotalAmount = document.getElementById('subtotalAmount');
    const totalAmount = document.getElementById('totalAmount');
    subtotalAmount.textContent = '$0';
    totalAmount.textContent = '$0';

    // Reset cart quantity display
    const cartQuantity = document.getElementById('cartQuantity');
    cartQuantity.textContent = '0';
    cartQuantity.style.display = 'none';

    // Reset form fields
    const form = document.querySelector('form');
    form.reset(); 
    
     // Clear myCartItems and regenerate cart display
    myCartItems = [];
    generateMyCartItems();
    
}
function resetMyCart() {
  // Clear the cart items array
  myCartItems = [];

  // Clear the cart items from the HTML display
  const cartItemsList = document.getElementById('myCartItemsList');
  cartItemsList.innerHTML = ''; // This line clears all child elements inside cartItemsList

  // Reset the subtotal, shipping fee, and total amounts
  document.getElementById('mySubtotalAmount').textContent = '$0';
  document.getElementById('shippingFeeAmount').textContent = '$1.50';
  document.getElementById('myTotalAmount').textContent = '$0';
}
function resetMyCartItems() {
    // Clear my cart items list
    const myCartItemsList = document.getElementById('myCartItemsList');
    myCartItemsList.innerHTML = '';

    // Reset subtotal and total amounts
    const mySubtotalAmount = document.getElementById('mySubtotalAmount');
    const myTotalAmount = document.getElementById('myTotalAmount');
    mySubtotalAmount.textContent = '$0';
    myTotalAmount.textContent = '$0';

    // Reset cart quantity display
    const cartQuantity = document.getElementById('cartQuantity');
    cartQuantity.textContent = '0';

    // Hide the flex container when cart is empty
    const flexContainer = document.querySelector('.flex-container');
    flexContainer.style.display = 'none';

    // Show the cart empty message
    const cartEmptyMessage = document.getElementById('cartEmptyMessage');
    cartEmptyMessage.style.display = 'block';

    // Clear cartItems array
    cartItems = [];
}
function previewImage(event) {
      const fileInput = event.target;
      const file = fileInput.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
          const previewImg = document.getElementById('previewImage');
          previewImg.src = e.target.result;
          document.getElementById('imagePreview').style.display = 'block';
        };

        reader.readAsDataURL(file);
      } else {
        document.getElementById('imagePreview').style.display = 'none';
      }
    } document.getElementById('image').addEventListener('change', previewImage);
function updateProductTextarea() {
  const cartItemsList = document.getElementById('cartItemsList');
  const productTextarea = document.getElementById('product');
  let productText = '';

  cartItems.forEach(item => {
    let listItemText = `${item.name} - x ${item.quantity} - Total: $${(item.price * item.quantity).toFixed(2)}`;

    // Check if the item has size and/or color properties
    if (item.size) {
      listItemText += `\nSize: ${item.size}`;
    }
    if (item.color) {
      listItemText += `\nColor: ${item.color}`;
    }

    productText += listItemText + '\n\n';
  });

  productTextarea.value = productText;
}
