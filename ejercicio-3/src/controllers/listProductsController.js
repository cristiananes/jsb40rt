// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../db/getPool.js';

// Función controladora que retorna el listado de productos. Se puede filtrar por palabra clave.
const listProductsController = async (req, res, next) => {
    try {
        // Obtenemos el query param que nos permitirá filtrar por palabra clave.
        let { keyword } = req.query;

        // Si "keyword" contiene un valor considerado falso por JS, asignamos un string vacío.
        keyword = keyword || '';

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los productos.
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
                WHERE name LIKE ?
            `,
            [`%${keyword}%`],
        );

        // Enviamos una respuesta al cliente.
        await res.send({
            status: 'ok',
            data: {
                products,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listProductsController;
