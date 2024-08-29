// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newProductController,
    listProductsController,
    getProductByIdController,
    deleteProductController,
    updateProductController,
} from '../controllers/products/index.js';

// Importamos las funciones controladoras intermedias.
import authUserController from '../middlewares/authUserController.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un producto.
router.post('/products', authUserController, newProductController);

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
//Middleware que actualiza el precio Y/o el nombre de un producto
router.put(`/products/:productId`, authUserController, updateProductController);

export default router;
