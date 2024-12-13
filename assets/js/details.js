const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5ZDU0Yjk3ZTI5ZjAwMTVjMmU2OWEiLCJpYXQiOjE3MzQwNzcwMzAsImV4cCI6MTczNTI4NjYzMH0.w5ZetpDgeqzdUsn9fgN9pOdmE07cW1cU6Nne3qcbObw";
const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";

const productId = new URLSearchParams(window.location.search).get("id");

const getProductDetails = async () => {
  try {
    if (!productId) {
      throw new Error("Product ID is missing in the URL.");
    }

    const response = await fetch(URL_PRODUCT + productId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response error: ${response.status}`);
    }

    const product = await response.json();
    console.log("Product fetched successfully:", product);

    const main = document.querySelector("main");
    main.innerHTML = `
      <div class="d-flex flex-column flex-lg-row align-items-center justify-content-center">
        <img src="${product.imageUrl}" class="img-fluid me-4 mb-4 mb-lg-0" style="max-width: 300px; width: 100%; height: auto;" alt="${product.name}">
        <div class="text-center text-lg-start">
          <h3 class="mb-2">${product.brand} ${product.name}</h3>
          <p class="mb-2 fs-4"><strong>Price:</strong> €${product.price}</p>
          <p class="mb-4 fs-6"><strong>Description:</strong> ${product.description}</p>
          <a href="index.html" class="btn btn-primary">Back to Home</a>
        </div>
      </div>`;
  } catch (error) {
    console.error("Error fetching product details:", error);

    const main = document.querySelector("main");
    main.innerHTML = `
      <div class="alert alert-danger">
        ${error.message}. Please go back and select a valid product.
        <a href="index.html" class="btn btn-primary mt-3">Back to Home</a>
      </div>`;
  }
};

getProductDetails();
