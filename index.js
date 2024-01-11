import Product from "./classes/product.js";
import ProductManager from "./src/productManager.js";

const productManager = new ProductManager();

const producto1 = new Product(
  "Xbox S", 
  "Consola", 
  500, 
  "", 
  "XB001", 
  250, 
  []
);
const producto2 = new Product(
  "Consola",
  "PS4",
  350,
  "",
  "PS001",
  20,
  []
);
const producto3 = new Product(
  "Consola",
  "Nintendo Switch",
  300,
  "",
  "NS001",
  30,
  []
);
const producto4 = new Product(
  "Consola",
  "Playstation 5",
  500,
  "",
  "PS001",
  100,
  []
);

(async () => {
  await productManager.initialize();

  // addProduct
  await productManager.addProduct(producto1);
  await productManager.addProduct(producto2);
  await productManager.addProduct(producto3);
  await productManager.addProduct(producto4);

  // Delete
  await productManager.deleteProd(2);

  // Get all products (corregido)
  const allProducts = await productManager.getAllProducts();
  console.log("All Products:", allProducts);

  // Update
  await productManager.updateProd(3, {
    title: "Consola",
    description: "Xbox Series X",
    price: 500,
    thumbnail: "Consolas",
    code: "XX01",
    stock: 30,
  });

  setTimeout(async () => {
    // Get all products after 5 seconds
    const updatedProducts = await productManager.getAllProducts();
    console.log("Updated Products:", updatedProducts);
  }, 5000);

  // Get product by ID
  const productById2 = await productManager.getProductById(2);
  console.log("Product by ID 2:", productById2);

  const productById3 = await productManager.getProductById(3);
  console.log("Product by ID 3:", productById3);
})();
