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
      throw new Error("Response error: " + response.status);
    }

    const products = await response.json();
    console.log("Products fetched successfully:", products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU5ZDU0Yjk3ZTI5ZjAwMTVjMmU2OWEiLCJpYXQiOjE3MzQwNzcwMzAsImV4cCI6MTczNTI4NjYzMH0.w5ZetpDgeqzdUsn9fgN9pOdmE07cW1cU6Nne3qcbObw";
const URL_PRODUCT = "https://striveschool-api.herokuapp.com/api/product/";

const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productBrand = document.getElementById("brandName");
const imageURL = document.getElementById("imageUrl");
const productPrice = document.getElementById("priceProduct");
const productDescription = document.getElementById("descriptionProduct");
const addItemBtn = document.getElementById("addItemBtn");

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

const descriptionInput = document.getElementById("descriptionProduct");
const maxChars = 500;

descriptionInput.addEventListener("input", () => {
  if (descriptionInput.value.length > maxChars) {
    descriptionInput.value = descriptionInput.value.slice(0, maxChars);
    alert("Description cannot exceed 500 characters.");
  }
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
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (!response.ok) {
      throw new Error("Response error: " + response.status);
    }

    const data = await response.json();
    console.log("Product added successfully!", data);

    productForm.reset();

    window.location.href = "index.html";
  } catch (error) {
    console.error("Error adding new product:", error);
  }
};
getProducts();
