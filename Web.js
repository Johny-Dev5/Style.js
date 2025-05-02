const endpointUrl = 'https://script.google.com/macros/s/AKfycbw6Fb1_54XrPWaqMN-WAS9tO0uhoElzY-NJnkOlrpEAmLEwn2nGgBYSTEbEQTwg9xMU_w/exec';

fetch(endpointUrl)
  .then(response => response.json())
  .then(data => {
    // Now 'data' is a JavaScript array of product objects
    console.log(data); // This is your array

    // Use it globally or assign to a variable
    window.products = data;
    generateProductElements(); // Call your function here
  })
  .catch(error => console.error('Error fetching data:', error));
