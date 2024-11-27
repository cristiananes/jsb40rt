// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite editar el nombre y/o el precio de un producto.
const updateProductController = async (req, res, next) => {
    try {
        // Obtenemos el ID del producto a editar.
        const { productId } = req.params;

        // Obtenemos los datos del body.
        const { name, price } = req.body;

        // Si faltan los dos campos lanzamos un error. Esto es porque si el usuario solo quiere editar
        // uno de ellos quiero permitírselo sin necesidad de que me envíe ambos valores.
        if (!name && !price) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Tratamos de obtener la información del producto que queremos editar para ver
        // si somos los dueños.
        const [products] = await pool.query(
            `SELECT userId FROM products WHERE id = ?`,
            [productId],
        );

        // Si el producto no existe lanzamos un error.
        if (products.length < 1) {
            generateErrorUtil('Producto no encontrado', 404);
        }

        // Si no somos los propietarios lanzamos un error.
        if (req.user.id !== products[0].userId) {
            generateErrorUtil('No tienes suficientes permisos', 403);
        }

        // Si el usuario ha enviado un nombre lo actualizamos.
        if (name) {
            await pool.query(`UPDATE products SET name = ? WHERE id = ?`, [
                name,
                productId,
            ]);
        }

        // Si el usuario ha enviado un precio lo actualizamos.
        if (price) {
            await pool.query(`UPDATE products SET price = ? WHERE id = ?`, [
                price,
                productId,
            ]);
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            message: 'Producto actualizado',
            data: {
                product: {
                    name,
                    price,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default updateProductController;
