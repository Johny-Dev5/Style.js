const productUrl = "https://script.google.com/macros/s/AKfycbw6Fb1_54XrPWaqMN-WAS9tO0uhoElzY-NJnkOlrpEAmLEwn2nGgBYSTEbEQTwg9xMU_w/exec";

async function fetchProducts() {
  try {
    const response = await fetch(productUrl);
    const products = await response.json();
    console.log(products); // ✅ Products will appear here
    return products;
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    return [];
  }
}

export { fetchProducts };
