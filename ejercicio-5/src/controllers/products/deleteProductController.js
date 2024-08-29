// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que elimina una foto en la carpeta de subida de archivos.
import removePhotoUtil from '../../utils/removePhotoUtil.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que elimina un producto.
const deleteProductController = async (req, res, next) => {
    try {
        // Obtenemos el ID del producto que queremos eliminar.
        const { productId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el producto en cuestión.
        const [products] = await pool.query(
            `SELECT photo, userId FROM products WHERE id = ?`,
            [productId],
        );

        // Si no existe el producto lanzamos un error.
        if (products.length < 1) {
            generateErrorUtil('Producto no encontrado', 404);
        }

        // Si no somos los dueños lanzamos un error.
        if (req.user.id !== products[0].userId) {
            generateErrorUtil('No tienes suficientes permisos', 403);
        }

        // Eliminamos la foto del producto de la carpeta de subida de archivos.
        await removePhotoUtil(products[0].photo);

        // Eliminamos el producto de la base de datos.
        await pool.query(`DELETE FROM products WHERE id = ?`, [productId]);

        res.send({
            status: 'ok',
            message: 'Producto eliminado',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteProductController;
