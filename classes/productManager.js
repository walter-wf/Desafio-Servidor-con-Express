import { promises as fs, constants } from "node:fs";

const PATH = "./productos.json";

async function ensureFileExists() {
  try {
    await fs.access(PATH, constants.F_OK);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(PATH, '[]');
    } else {
      throw error;
    }
  }
}

async function readProducts() {
  try {
    const fileContent = await fs.readFile(PATH, "utf-8");
    return JSON.parse(fileContent.trim() || '[]');
  } catch (error) {
    throw error;
  }
}

async function writeProducts(products) {
  await fs.writeFile(PATH, JSON.stringify(products, null, 2));
}

export default class ProductManager {
  constructor() {
    this.products = [];
  }

  async initialize() {
    await ensureFileExists();
    this.products = await readProducts();
  }

  async addProduct(product) {
    try {
      const prodById = this.products.find((prod) => prod.id === product.id);

      if (prodById) {
        console.log(`El producto ya existe ${prodById.title}`);
        // sumar la cantidad
        prodById.stock += product.stock;
      } else {
        this.products.push(product);
        console.log(`Producto agregado exitosamente: ${product.title}`);
      }

      await writeProducts(this.products);

      if (prodById) {
        console.log(
          `Cantidad actualizada para ${prodById.title}. Nuevo stock: ${prodById.stock}`
        );
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  async deleteProd(id) {
    const prodById = this.products.find((prod) => prod.id === id);

    if (prodById) {
      await writeProducts(this.products.filter((prod) => prod.id !== id));

      console.log(
        `El producto ${prodById.title} con el id ${id} fue eliminado correctamente`
      );
    } else {
      console.log("Producto no encontrado");
    }
  }

  async updateProd(id, product) {
    const index = this.products.findIndex((prod) => prod.id === id);

    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };

      await writeProducts(this.products);
      console.log(`Producto actualizado correctamente`);
    } else {
      console.log("Producto no encontrado");
    }
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    console.log('Requested Product ID:', id);
    console.log('Products:', this.products);
    const prodById = this.products.find((prod) => prod.id === id);
    console.log('Product by ID:', prodById);
    if (prodById) {
      return prodById;
    } else {
      console.log("Producto no encontrado");
      return null; // Devolver null si el producto no se encuentra
    }
  }
}
