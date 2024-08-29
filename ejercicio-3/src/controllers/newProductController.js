// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Función controladora que permite registrar un producto.
const newProductController = async (req, res, next) => {
    try {
        // Obtenemos los datos del body.
        const { name, price, userId } = req.body;

        // Si faltan campos lanzamos un error.
        if (!name || !price || !userId) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión.
        const pool = await getPool();

        // Obtenemos al usuario con el ID recibido.
        const [users] = await pool.query(`SELECT id FROM users WHERE id = ?`, [
            userId,
        ]);

        // Si no existe el usuario lanzamos un error.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        // Insertamos el producto.
        await pool.query(
            `INSERT INTO products(name, price, userId) VALUES(?, ?, ?)`,
            [name, price, userId],
        );

        // Establecemos el código 201 (elemento creado) y enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Producto creado',
        });
    } catch (err) {
        next(err);
    }
};

export default newProductController;
