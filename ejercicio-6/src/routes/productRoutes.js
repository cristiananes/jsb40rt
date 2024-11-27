// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newProductController,
    updateProductController,
    listProductsController,
    getProductByIdController,
    deleteProductController,
} from '../controllers/products/index.js';

// Importamos las funciones controladoras intermedias.
import authUserController from '../middlewares/authUserController.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un producto.
router.post('/products', authUserController, newProductController);

// Middleware que permite editar el nombre y/o precio de un producto.
router.put('/products/:productId', authUserController, updateProductController);

// Middleware que retorna el listado de productos.
router.get('/products', listProductsController);

// Middleware que retorna un producto concreto por ID.
router.get('/products/:productId', getProductByIdController);

// Middleware que elimina un producto concreto por ID.
router.delete(
    '/products/:productId',
    authUserController,
    deleteProductController,
);

export default router;
