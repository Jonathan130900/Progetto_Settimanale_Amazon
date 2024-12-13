const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5ZDU0Yjk3ZTI5ZjAwMTVjMmU2OWEiLCJpYXQiOjE3MzQwNzcwMzAsImV4cCI6MTczNTI4NjYzMH0.w5ZetpDgeqzdUsn9fgN9pOdmE07cW1cU6Nne3qcbObw";
const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";

const getProducts = async () => {
  try {
    let response = await fetch(URL_PRODUCT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response error: ${response.status}`);
    }

    const products = await response.json();
    console.log("Products available:", products);

    const main = document.getElementById("main");
    main.innerHTML = "";

    products.forEach((product) => {
      main.innerHTML += `
        <div class="card m-3" style="width: 18rem; max-width: 18rem; overflow: hidden;">
          <img src="${product.imageUrl}" class="card-img-top my-2 px-2" style="width: 100%; object-fit: cover;" alt="${product.brand} ${product.name}">
          <div class="card-body d-flex flex-column align-items-center">
            <h5 class="card-title text-center">${product.brand} - ${product.name}</h5>
            <h4 class="card-text text-center">€${product.price}</h4>
            <p class="card-text text-center">${product.description}</p>
            <div class="d-flex justify-content-between w-100">
              <a href="details.html?id=${product._id}" class="btn btn-primary">Details</a>
              <button class="btn btn-danger delete-btn" data-id="${product._id}">Delete</button>
            </div>
          </div>
        </div>`;
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async (e) => {
        const productId = e.target.getAttribute("data-id");
        try {
          let deleteResponse = await fetch(`${URL_PRODUCT}${productId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
          });

          if (!deleteResponse.ok) {
            throw new Error(`Error deleting product: ${deleteResponse.status}`);
          }

          e.target.closest(".card").remove();

          console.log("Product deleted successfully.");
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching the products:", error);
  }
};

getProducts();
