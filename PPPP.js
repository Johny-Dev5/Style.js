// Product.js
export async function fetchProducts() {
  const response = await fetch('https://script.google.com/macros/s/AKfycbw6Fb1_54XrPWaqMN-WAS9tO0uhoElzY-NJnkOlrpEAmLEwn2nGgBYSTEbEQTwg9xMU_w/exec');
  const data = await response.json();
  return data;
}
