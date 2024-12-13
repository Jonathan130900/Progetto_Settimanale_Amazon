const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5ZDU0Yjk3ZTI5ZjAwMTVjMmU2OWEiLCJpYXQiOjE3MzQwNzcwMzAsImV4cCI6MTczNTI4NjYzMH0.w5ZetpDgeqzdUsn9fgN9pOdmE07cW1cU6Nne3qcbObw";

const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productBrand = document.getElementById("brandName");
const imageURL = document.getElementById("imageUrl");
const productPrice = document.getElementById("priceProduct");
const productDescription = document.getElementById("descriptionProduct");
const addItemBtn = document.getElementById("addItemBtn");
const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";

class Product {
  constructor(_name, _brand, _imageUrl, _price, _description) {
    this.name = _name;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
    this.description = _description;
  }
}

addItemBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addProduct();
});

const addProduct = async () => {
  let newProduct = new Product(
    productName.value,
    productBrand.value,
    imageURL.value,
    productPrice.value,
    productDescription.value
  );
  try {
    let response = await fetch(URL_PRODUCT, {
      method: "POST",
      headers: {
        Authorization: `bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      throw new Error("Errore nella risposta: " + response.status);
    }

    const data = await response.json();
    console.log("Prodotto aggiunto:", data);
  } catch (error) {
    console.log("Errore durante l'invio del prodotto:", error);
  }

  productForm.reset();
};
