document.getElementById('product-images').addEventListener('input', function() {
    const container = document.getElementById('image-preview');
    const urls = this.value.split(',').map(url => url.trim());

    container.innerHTML = ''; // Clear the container

    urls.forEach(url => {
        if (url) {
            const img = document.createElement('img');
            img.src = url;
            container.appendChild(img);
        }
    });
}); 
function showToast(message, type) {
  Toastify({
    text: message,
    duration: 3000, // Duration in milliseconds
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    backgroundColor: type === "success" ? "green" : "red",
    stopOnFocus: true // Prevents dismissing of toast on hover
  }).showToast();
}    
    // Function to toggle the console output visibility
function toggleConsoleOutput() {
    const consoleOutput = document.getElementById('console-output');
    const showConsoleButton = document.getElementById('show-console');

    // Check the current display style of the console output
    if (consoleOutput.style.display === 'none' || consoleOutput.style.display === '') {
        // Show the console output
        consoleOutput.style.display = 'block';
        showConsoleButton.textContent = 'Hide Console Output'; // Update button text
    } else {
        // Hide the console output
        consoleOutput.style.display = 'none';
        showConsoleButton.textContent = 'Show Console Output'; // Update button text
    }
}

// Event listener for the Show Console Output button
document.getElementById('show-console').addEventListener('click', toggleConsoleOutput);


        const openFormButton = document.getElementById('openFormButton');
    const closeFormButton = document.getElementById('closeFormButton');
    const floatingFormOverlay = document.getElementById('floatingFormOverlay');

    openFormButton.addEventListener('click', () => {
        floatingFormOverlay.style.display = 'flex';
    });

    closeFormButton.addEventListener('click', () => {
        floatingFormOverlay.style.display = 'none';
    });

    // Close the form when clicking outside the form container
    floatingFormOverlay.addEventListener('click', (event) => {
        if (event.target === floatingFormOverlay) {
            floatingFormOverlay.style.display = 'none';
        }
    });
    
        document.addEventListener('DOMContentLoaded', () => {
            const productForm = document.getElementById('product-form');
            const colorsContainer = document.getElementById('colors-container');
            const colorList = document.getElementById('color-list');
            const addColorButton = document.getElementById('add-color');
            const productList = document.getElementById('product-list');
            const consoleButton = document.getElementById('show-console');
            const consoleOutput = document.getElementById('console-output');
            const hasColorsCheckbox = document.getElementById('has-colors');
            const resetIdsButton = document.getElementById('reset-ids');
            
            const removeBlankSpacingButton = document.getElementById('remove-blank-spacing');
            const copyConsoleTextButton = document.getElementById('copy-console-text');

            let colorCount = 0;
            let editingProductId = null;
            
            
            Sortable.create(productList, {
                onEnd: function (evt) {
                    // Reorder the IDs when dragging ends
                    reorderProductIds();
                    // setTimeout(reorderProductIds, 2000);

                }
            });

            function reorderProductIds() {
                let products = JSON.parse(localStorage.getItem('products') || '[]');
                products = products.sort((a, b) => a.id - b.id); // Ensure products are sorted by original ID
                const updatedProducts = [];

                productList.querySelectorAll('.product-row').forEach((row, index) => {
                    const productId = parseInt(row.dataset.id);
                    const product = products.find(p => p.id === productId);
                    if (product) {
                        product.id = index + 1; // Reassign IDs sequentially
                        updatedProducts.push(product);
                    }
                });

                localStorage.setItem('products', JSON.stringify(updatedProducts));
                displayProducts(); // Refresh the product list
            }
            function getLastId() {
                return parseInt(localStorage.getItem('lastId')) || 0;
            }

            function setLastId(id) {
                localStorage.setItem('lastId', id);
            }
              function resetIds() {
        // Retrieve products from localStorage
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        if (products.length === 0) return;

        // Reassign IDs sequentially
        products = products.map((product, index) => {
            product.id = index + 1;  // Set ID to index + 1
            return product;
        });

        // Save updated products back to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Update last ID in localStorage
        setLastId(products.length);

        // Refresh product display
        displayProducts();
    }

    // Event listener for Reset IDs button
    document.getElementById('reset-ids').addEventListener('click', () => {
        if (confirm('Are you sure you want to reset IDs?')) {
            resetIds();
             showToast('IDs have been reset successfully!', 'success');
        }
    });
    function formatConsoleOutput(text) {
        // Remove extra blank lines
        return text.replace(/^\s*[\r\n]/gm, '').trim();
    }

    // Event listener for Remove Blank Spacing button
    removeBlankSpacingButton.addEventListener('click', () => {
        // Get the current content of the console output
        let currentOutput = consoleOutput.textContent;
        // Format the output to remove blank spaces
        let formattedOutput = formatConsoleOutput(currentOutput);
        // Update the console output
        consoleOutput.textContent = formattedOutput;
    });
    function copyToClipboard(text) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        showToast('Console text copied to clipboard!', 'success');
    }

    // Event listener for Copy Console Text button
    copyConsoleTextButton.addEventListener('click', () => {
        // Get the current content of the console output
        let currentOutput = consoleOutput.textContent;
        // Format the output to remove blank spaces
        let formattedOutput = formatConsoleOutput(currentOutput);
        // Copy the formatted output to clipboard
        copyToClipboard(formattedOutput);
    });
    

function createColorField(index, color = {}) {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color-field'); 
    colorDiv.innerHTML = `
        <h4>Color ${index + 1}</h4>
        
        <label for="color-stock-${index}">In Stock:</label>
        <input type="checkbox" id="color-stock-${index}" name="colors[${index}][stock]" ${color.stock ? 'checked' : ''}>
        
        <label for="color-preorder-${index}">Pre-Order (optional):</label>
        <input type="checkbox" id="color-preorder-${index}" name="colors[${index}][preOrder]" ${color.preOrder ? 'checked' : ''}>

        <div class="color-field-row">
            <label for="color-name-${index}">Color Name:</label>
            <input type="text" id="color-name-${index}" name="colors[${index}][name]" value="${color.name || ''}" required>

            <label for="color-price-${index}">Price:</label>
            <input type="number" id="color-price-${index}" name="colors[${index}][price]" value="${color.price || ''}" step="1.00" required>
        </div>

        <label for="color-image-${index}">Image URL:</label>
            <input type="text" id="color-image-${index}" name="colors[${index}][image]" value="${color.image || ''}" required>
            
            <div id="image-preview-${index}" class="image-preview"></div>
            

            
        <div class="color-field-row">
            <label for="color-compare-${index}">Compare Price (optional):</label>
            <input type="number" id="color-compare-${index}" name="colors[${index}][compare]" value="${color.compare || ''}" step="1.00">

            <label for="color-discount-${index}">Discount (0 to 1, optional):</label>
            <input type="number" id="color-discount-${index}" name="colors[${index}][discount]" value="${color.discount || ''}" step="1.00" min="0" max="1">
        </div>

        <button type="button" class="remove-color" data-index="${index}">Remove Color</button>
    `;
    
    colorList.appendChild(colorDiv);
    
    const imageInput = colorDiv.querySelector(`#color-image-${index}`);
    const imagePreview = colorDiv.querySelector(`#image-preview-${index}`);

    function updateImagePreview() {
        const url = imageInput.value.trim();
        imagePreview.innerHTML = ''; 

        if (url) {
            const img = document.createElement('img');
            img.src = url;
            imagePreview.appendChild(img);
        }
    }

    // Set up event listener for the image input field
    imageInput.addEventListener('input', updateImagePreview);

    // Initial update if there's already a value
    updateImagePreview();


    colorDiv.querySelector('.remove-color').addEventListener('click', (e) => {
        const indexToRemove = parseInt(e.target.getAttribute('data-index'));
        // Find and remove the parent color field container
        const colorFieldToRemove = e.target.closest('.color-field');
        if (colorFieldToRemove) {
            colorFieldToRemove.remove();
            colorCount--; // Decrease colorCount if necessary
        }
    });
}

            addColorButton.addEventListener('click', () => {
                createColorField(colorCount);
                colorCount++;
            });

            hasColorsCheckbox.addEventListener('change', function() {
                colorsContainer.style.display = this.checked ? 'block' : 'none';
                document.getElementById('product-price').classList.toggle('hide', this.checked);
                document.getElementById('product-compare').classList.toggle('hide', this.checked);
                document.getElementById('product-discount').classList.toggle('hide', this.checked);
            });

            function formatDescription(description) {
                return `<p>${description.replace(/\n/g, '<br>')}</p>`;
            }
function displayProducts() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const selectedCategory = document.getElementById('category-filter').value;
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products
    .filter(product => {
                    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
                    // const matchesCategory = !selectedCategory || product.category === selectedCategory;
                    const matchesCategory = selectedCategory === 'all' || !selectedCategory || product.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                })
    .forEach(product => {
        const colorDetailsHtml = product.colors.length > 0 ? `
            <div class="color-details">
                ${product.colors.map(color => `
                    <div style="padding: 5px;">
                        <p><strong>Color:</strong> ${color.name}</p>
                        <p><strong>Price:</strong> $${color.price}</p>
                        <p><strong>Stock:</strong> ${color.stock ? 'In Stock' : 'Out of Stock'}</p>
                        ${color.compare !== undefined ? `<p><strong>Compare Price:</strong> $${color.compare}</p>` : ''}
                        ${color.discount !== undefined ? `<p><strong>Discount:</strong> ${color.discount * 100}%</p>` : ''}
                        <img src="${color.image}" alt="${color.name}" style="width: 100px; height: 100px;">
                    </div>
                `).join('')}
            </div>
        ` : '';

        const productRow = document.createElement('tr');
        productRow.classList.add('product-row');
        productRow.dataset.id = product.id;

        productRow.innerHTML = `
                  <td>${product.id}</td>
            <td>${product.images.length > 0 ? `<img src="${product.images[0]}" alt="${product.name}" class="product-image">` : 'No Image'}</td>
            <td>${product.name}</td>
            <td>${formatDescription(product.description)}</td>
            <td>${product.category}</td>
            <td>${product.stock ? 'Available' : 'Out of Stock'}</td>
            <td>${product.price !== undefined ? `$${product.price}` : 'No Price'}</td>
             <td>${product.compare !== undefined ? `$${product.compare}` : ''}</td>
            <td>${product.discount !== undefined ? `${product.discount * 100}%` : ''}</td>
            <td>${product.preOrder !== undefined ? (product.preOrder ? 'Yes' : 'No') : ''}</td>
            <td>${product.tiktokVideoId ? stripHTMLTags(product.tiktokVideoId) : 'N/A'}</td>
            <td>${product.reloadInterval !== undefined ? `${product.reloadInterval} ms` : 'N/A'}</td>
            <td>${product.tag || ''}</td>
            <td>${product.customText || ''}</td>
            <td>${product.colors.length > 0 ? `${product.colors.length} ${product.colors.length > 1 ? 'Colors' : 'Color'}` : 'No Colors'}</td>
            <td>
                <button data-id="${product.id}" class="edit-product">Edit</button>
                <button data-id="${product.id}" class="delete-product">Delete</button>
            </td> <!-- Actions Column -->
            ${colorDetailsHtml}
        `;
        productList.appendChild(productRow);
    });
    document.querySelectorAll('.product-row').forEach(row => {
        row.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            showProductDetails(productId);
        });
    });

    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            editProduct(parseInt(e.target.dataset.id));
        });
    });

    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(e.target.dataset.id);
            deleteProduct(productId);
        });
    });
}

function populateCategoryFilter() {
            const products = JSON.parse(localStorage.getItem('products') || '[]');
            const categoryFilter = document.getElementById('category-filter');
            const categories = [...new Set(products.map(product => product.category))];

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        }

        document.getElementById('search-bar').addEventListener('input', displayProducts);
        document.getElementById('category-filter').addEventListener('change', displayProducts);

        document.addEventListener('DOMContentLoaded', () => {
            // Initialize localStorage with sample data if it's empty
            if (!localStorage.getItem('products')) {
                localStorage.setItem('products', JSON.stringify(sampleProducts));
            }
            populateCategoryFilter();
            displayProducts();
        });
function showProductDetails(productId) {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const productDetails = document.getElementById('product-details');
        productDetails.innerHTML = `
            ${product.colors.length > 0 ? `
            <div class="product-colors">
                ${product.colors.map(color => `
                     <div style="padding: 5px; margin-top: 5px;">
                        <p><strong>Color:</strong> ${color.name}</p>
                        <p><strong>Price:</strong> $${color.price}</p>
                        <p><strong>Stock:</strong> ${color.stock ? 'In Stock' : 'Out of Stock'}</p>
                        ${color.compare !== undefined ? `<p><strong>Compare Price:</strong> $${color.compare}</p>` : ''}
                        ${color.discount !== undefined ? `<p><strong>Discount:</strong> ${color.discount * 100}%</p>` : ''}
                        <img src="${color.image}" alt="${color.name}" style="width: 200px; height: 200px;">
                    </div>
                `).join('')}
            </div>` : ''}
        `;
        document.getElementById('product-modal').style.display = 'flex';
    }
}

// Close modal functionality
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('product-modal').style.display = 'none';
});
    document.getElementById('refresh-products').addEventListener('click', () => {
        displayProducts();
        showToast('Products refreshed successfully!', 'success');
    });

    displayProducts();

function stripHTMLTags(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.body.textContent || "";
}
            function editProduct(productId) {
                const products = JSON.parse(localStorage.getItem('products') || '[]');
                const product = products.find(p => p.id === productId);

                if (product) {
                    document.getElementById('product-name').value = product.name;
                    // document.getElementById('product-description').value = product.description; 
                            document.getElementById('product-description').value = stripHTMLTags(product.description);

                    document.getElementById('product-category').value = product.category;
                    document.getElementById('product-stock').checked = product.stock;
                    
                    const hasColors = product.colors.length > 0;
                    document.getElementById('has-colors').checked = hasColors;
                    document.getElementById('product-price').value = hasColors ? '' : product.price || '';
                    
                    // document.getElementById('product-price').value = product.price;
                    // document.getElementById('product-compare').value = product.compare || '';
                    // document.getElementById('product-discount').value = product.discount || '';
                    // document.getElementById('product-preorder').checked = product.preOrder;
                    
                    document.getElementById('product-compare').value = hasColors ? '' : product.compare || '';
                    document.getElementById('product-discount').value = hasColors ? '' : product.discount || '';
                    document.getElementById('product-preorder').checked = hasColors ? false : product.preOrder || false;
                    document.getElementById('product-tag').value = product.tag || '';
                    document.getElementById('product-custom-text').value = product.customText || '';
                    document.getElementById('product-images').value = product.images.join(', ');
                    
                    document.getElementById('tiktokVideoId').value = product.tiktokVideoId || '';
                    document.getElementById('reloadInterval').value = product.reloadInterval || '';

                    colorList.innerHTML = '';
                    product.colors.forEach((color, index) => {
                        createColorField(index, color);
                    });

                    colorsContainer.style.display = product.colors.length ? 'block' : 'none';
                    editingProductId = productId;
                    
                    floatingFormOverlay.style.display = 'flex';
                }
            }
            
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    floatingFormOverlay.style.display = 'none';
});

            function deleteProduct(productId) {
                let products = JSON.parse(localStorage.getItem('products') || '[]');
                products = products.filter(p => p.id !== productId);
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
            }

    productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('product-name').value;
    const description = formatDescription(document.getElementById('product-description').value);
    const category = document.getElementById('product-category').value;
    const stock = document.getElementById('product-stock').checked;
const price = document.getElementById('product-price').value.trim() ? parseFloat(document.getElementById('product-price').value) : undefined;
        const compare = document.getElementById('product-compare').value.trim() ? parseFloat(document.getElementById('product-compare').value) : undefined;
        const discount = document.getElementById('product-discount').value.trim() ? parseFloat(document.getElementById('product-discount').value) : undefined;
    const preOrder = document.getElementById('product-preorder').checked ? true : undefined; // Only include if checked
    const tag = document.getElementById('product-tag').value || undefined; // Only include if provided
    const customText = document.getElementById('product-custom-text').value || undefined; // Only include if provided
    const images = document.getElementById('product-images').value.split(',').map(url => url.trim());
     const tiktokVideoId = document.getElementById('tiktokVideoId').value.trim() || undefined;
    const reloadInterval = document.getElementById('reloadInterval').value.trim() ? parseInt(document.getElementById('reloadInterval').value) : undefined;
    const colors = Array.from(document.querySelectorAll('#color-list > div')).map((div, index) => ({
        name: document.getElementById(`color-name-${index}`).value,
        price: parseFloat(document.getElementById(`color-price-${index}`).value) || undefined, // Only include if defined
        image: document.getElementById(`color-image-${index}`).value,
        stock: document.getElementById(`color-stock-${index}`).checked,
        compare: parseFloat(document.getElementById(`color-compare-${index}`).value) || undefined, // Only include if defined
        discount: parseFloat(document.getElementById(`color-discount-${index}`).value) || undefined, // Only include if defined
        preOrder: document.getElementById(`color-preorder-${index}`).checked ? true : undefined // Only include if checked
    }));

    const product = {
        id: editingProductId || getLastId() + 1,
        name,
        description,
        category,
        stock,
         price: colors.length ? undefined : price,
            compare: colors.length ? undefined : compare,
            discount: colors.length ? undefined : discount,
            preOrder: colors.length ? undefined : preOrder,
        tag,
        customText,
        images,
        colors,
        tiktokVideoId,
        reloadInterval
    };

    let products = JSON.parse(localStorage.getItem('products') || '[]');
    if (editingProductId) {
        products = products.map(p => p.id === editingProductId ? product : p);
    } else {
        products.push(product);
    }
    localStorage.setItem('products', JSON.stringify(products));
    setLastId(product.id);
    displayProducts();
    productForm.reset();
    colorList.innerHTML = '';
    colorsContainer.style.display = 'none';
    editingProductId = null;

    alert('Product saved successfully!');
});


    consoleButton.addEventListener('click', () => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const formattedProducts = products.map(product => {
        const formattedColors = product.colors && product.colors.length ? 
            product.colors.map(color => 
                `{
                    name: '${color.name || ''}', 
                     ${color.price !== undefined ? `price: ${color.price},` : ''}
                    image: '${color.image || ''}', 
                    stock: ${color.stock || 'false'},
                    ${color.compare !== undefined ? `compare: ${color.compare},` : ''}
                    ${color.discount !== undefined ? `discount: ${color.discount},` : ''}
                    ${color.preOrder !== undefined ? `preOrder: ${color.preOrder},` : ''}
                }`
            ).join(',\n') : '';
        
        return `{
            id: ${product.id || 'null'},
            name: '${product.name || ''}',
            images: [${product.images ? product.images.map(url => `'${url}'`).join(', ') : '[]'}],
            ${formattedColors ? `colors: [${formattedColors}],` : ''}
            ${product.tag ? `tag: '${product.tag}',` : ''}
            ${product.customText ? `customText: '${product.customText}',` : ''}
            ${product.preOrder !== undefined ? `preOrder: ${product.preOrder},` : ''}
            ${product.compare !== undefined ? `compare: ${product.compare},` : ''}
            ${product.discount !== undefined ? `discount: ${product.discount},` : ''}
            stock: ${product.stock || 'false'},
            category: '${product.category || ''}',
            description: '${product.description || ''}',
             ${product.price !== undefined ? `price: ${product.price}` : ''}
             
             ${product.tiktokVideoId ? `tiktokVideoId: '${product.tiktokVideoId}',` : ''}
            ${product.reloadInterval !== undefined ? `reloadInterval: ${product.reloadInterval},` : ''}
        }`;
    }).join(',\n');

    consoleOutput.textContent = `const products = [\n${formattedProducts}\n];`;
});
            displayProducts();
        });
        
document.getElementById('openFloatFormButton').addEventListener('click', () => {
    document.getElementById('floatingTextFormOverlay').style.display = 'flex';
});

document.getElementById('cancelJsonButton').addEventListener('click', () => {
    document.getElementById('floatingTextFormOverlay').style.display = 'none';
});

document.getElementById('submitJsonButton').addEventListener('click', () => {
    const jsonInput = document.getElementById('jsonInput').value;
    try {
        const newProduct = JSON.parse(jsonInput); // Parse JSON input
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        
        // Ensure newProduct is an array or convert it to an array
        if (!Array.isArray(newProduct)) {
            newProduct.id = getLastId() + 1; // Assign a new ID
            products.push(newProduct);
        } else {
            newProduct.forEach(product => {
                product.id = getLastId() + 1; // Assign new IDs to each product
                products.push(product);
            });
        }

        localStorage.setItem('products', JSON.stringify(products)); // Save updated products
        document.getElementById('floatingTextFormOverlay').style.display = 'none';
        showToast('Product(s) added successfully!', 'success');
        displayProducts(); // Refresh the product list display

    } catch (error) {
        showToast('Invalid JSON input!', 'error');
    }
});

// Helper function to get the last ID used
function getLastId() {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    if (products.length === 0) return 0;
    return Math.max(...products.map(product => product.id));
}
