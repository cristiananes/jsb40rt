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

        // Obtenemos el array de fotos. Por si nos llegan más de tres fotos, recortamos el array como
        // precaución para evitar problemas.
        const photosArr = Object.values(req.files).slice(0, 3);

        // Si faltan campos lanzamos un error. Como mínimo es obligatoria una foto, así que si el array
        // de fotos tiene una longitud de 0 consideramos que faltan campos.
        if (!name || !price || photosArr.length < 1) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos el ID del usuario del token.
        const userId = req.user.id;

        // Obtenemos una conexión con la base de datos.
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
        const [newProduct] = await pool.query(
            `INSERT INTO products(name, price, userId) VALUES(?, ?, ?)`,
            [name, price, userId],
        );

        // Obtenemos el ID que la base de datos le ha dado al nuevo producto.
        const productId = newProduct.insertId;

        // Recorremos el array de fotos.
        for (const photo of photosArr) {
            // Guardamos la foto y obtenemos el nombre.
            const photoName = await savePhotoUtil(photo, 1000);

            // Guardamos la foto en la base de datos.
            await pool.query(
                `INSERT INTO productPhotos(name, productId) VALUES(?, ?)`,
                [photoName, productId],
            );
        }

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
