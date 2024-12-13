const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5ZDU0Yjk3ZTI5ZjAwMTVjMmU2OWEiLCJpYXQiOjE3MzQwNzcwMzAsImV4cCI6MTczNTI4NjYzMH0.w5ZetpDgeqzdUsn9fgN9pOdmE07cW1cU6Nne3qcbObw";
const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";

const getProducts = async () => {
  try {
    let response = await fetch(URL_PRODUCT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`, // Aggiungi il Bearer Token
        "Content-Type": "application/json", // Specifica che ci aspettiamo una risposta in JSON
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nella risposta: ${response.status}`);
    }

    const products = await response.json();
    console.log("Prodotti ottenuti:", products);

    products.forEach((product) => {
      const main = document.getElementById("main");
      main.innerHTML = `<div class="card" style="width: 18rem;">
                              <img src="${product.imageUrl}" class="card-img-top" alt="${product.brand} ${product.name}">
                              <div class="card-body">
                                  <h5 class="card-title">${product.brand} ${product.name}</h5>
                                  <p class="card-text">${product.price}</p>
                                  <p class="card-text">${product.description}</p>
                                  <a href="details.html" class="btn btn-primary">Details</a>
                              </div>
                          </div>`;
    });
  } catch (error) {
    console.error("Errore durante il recupero dei prodotti:", error);
  }
};

getProducts();
