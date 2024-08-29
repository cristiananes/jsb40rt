// Importamos las dependencias.
import bcrypt from 'bcrypt';

// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Función controladora que permite registrar un usuario.
const newUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos del body.
        const { email, password } = req.body;

        // Si faltan campos lanzamos un error.
        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Creamos la conexión.
        const pool = await getPool();

        // Obtenemos el listado de usuarios que tenga asignado el email recibido en el body.
        const [users] = await pool.query(
            `SELECT id FROM users WHERE email = ?`,
            [email],
        );

        // Si existe algún usuario con ese email lanzamos un error.
        if (users.length > 0) {
            generateErrorUtil('Email no disponible', 403);
        }

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await pool.query(`INSERT INTO users(email, password) VALUES(? , ?)`, [
            email,
            hashedPass,
        ]);

        // Establecemos el código 201 (elemento creado) y enviamos una respuesta al cliente.
        res.status(201).send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};

export default newUserController;
