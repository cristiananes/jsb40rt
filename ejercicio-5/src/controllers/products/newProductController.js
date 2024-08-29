// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto.
import savePhotoUtil from '../../utils/savePhotoUtil.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite registrar un producto.
const newProductController = async (req, res, next) => {
    try {
        // Obtenemos los datos del body.
        const { name, price } = req.body;

        // Obtenemos la foto.
        const photo = req.files?.photo;

        // Si faltan campos lanzamos un error.
        if (!name || !price || !photo) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos el ID del usuario del token.
        const userId = req.user.id;

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

        // Guardamos la foto y obtenemos el nombre.
        const photoName = await savePhotoUtil(photo, 1000);

        // Insertamos el producto.
        await pool.query(
            `INSERT INTO products(name, price, photo, userId) VALUES(?, ?, ?, ?)`,
            [name, price, photoName, userId],
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
