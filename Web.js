const endpointUrl = 'https://script.google.com/macros/s/AKfycbw6Fb1_54XrPWaqMN-WAS9tO0uhoElzY-NJnkOlrpEAmLEwn2nGgBYSTEbEQTwg9xMU_w/exec'; // Replace with your actual URL

fetch(endpointUrl)
  .then(response => response.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid data format');
    }

    const [headers, ...rows] = data;
    const products = rows.map(row => {
      const product = {};
      headers.forEach((header, index) => {
        product[header] = row[index];
      });
      return product;
    });

    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
      productElement.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Description: ${product.description}</p>
      `;
      productsContainer.appendChild(productElement);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
