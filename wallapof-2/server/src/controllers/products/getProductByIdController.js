// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que retorna el listado de productos. Se puede filtrar por palabra clave.
const getProductByIdController = async (req, res, next) => {
    try {
        // Obtenemos id del producto que buscamos de los path params.
        let { productId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los productos con el ID recibido.
        const [products] = await pool.query(
            `
                SELECT 
                    p.id,
                    p.name,
                    p.price,
                    p.userId,
                    u.email AS userEmail,
                    p.createdAt
                FROM products p
                INNER JOIN users u ON u.id = p.userId
                WHERE p.id = ?
            `,
            [productId],
        );

        // Si no hay productos lanzamos un error.
        if (products.length < 1) {
            generateErrorUtil('Producto no encontrado', 404);
        }

        // Buscamos las fotos del producto.
        const [photos] = await pool.query(
            `SELECT id, name FROM productPhotos WHERE productId = ?`,
            [products[0].id],
        );

        // Agregamos el array de fotos al producto.
        products[0].photos = photos;

        // Enviamos una respuesta al cliente.
        await res.send({
            status: 'ok',
            data: {
                product: products[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getProductByIdController;
