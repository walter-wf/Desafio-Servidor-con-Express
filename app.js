import express from 'express';
import ProductManager from './classes/productManager.js';

const app = express();
const port = 3000;

const productManager = new ProductManager();

// Middleware para inicializar ProductManager antes de manejar las rutas
app.use(async (req, res, next) => {
  await productManager.initialize();
  next();
});

// Endpoint para obtener todos los productos en formato JSON
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getAllProducts(limit);
    res.json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint para obtener un producto por ID en formato JSON
app.get('/products/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      console.log('Requested Product ID (parsed):', productId);
      const product = await productManager.getProductById(productId);
      if (product) {
        res.json({ product });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Endpoint para mostrar el mensaje de bienvenida 
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            text-align: center;
          }
          h1 {
            color: #333;
          }
          #ingresar-btn {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
            display: inline-block;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>¡Bienvenido al E-commerce de Coder (Se llamará Electro-Land) - Un tributo al icónico local en Miami en los 90s!</h1>
        <a href="/products" id="ingresar-btn">Ingresar</a>
      </body>
    </html>
  `);
});

// Endpoint para mostrar todos los productos 
app.get('/products', async (req, res) => {
  try {
    const allProducts = await productManager.getAllProducts();
    res.send(`<html><body><pre>${JSON.stringify({ products: allProducts }, null, 2)}</pre></body></html>`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
