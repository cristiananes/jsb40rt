// Importamos las dependencias necesarias.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que logea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios del body.
        const { email, password } = req.body;

        // Si falta algún campo lanzamos un error.
        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos la conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el listado de usuarios con el email recibido.
        const [users] = await pool.query(
            `SELECT id, password, role, active FROM users WHERE email = ?`,
            email,
        );

        // Comprobamos si las contraseñas coinciden. Nos aseguramos de ejecutar la comparación
        // únicamente si existe un usuario con el email proporcionado.
        const validPass =
            users.length > 0 &&
            (await bcrypt.compare(password, users[0].password));

        // Si el usuario NO existe o si las contraseñas no coinciden lanzamos un error. No sería
        // necesario hacer la comprobación de "users.length < 1" dado que si "validPass" contiene
        // un valor falso ya damos por hecho que o bien el usuario no existe o bien la contraseña
        // es incorrecta.
        if (!validPass) {
            generateErrorUtil('Credenciales inválidas', 401);
        }

        // Si el usuario no está activo lanzamos un error.
        if (!users[0].active) {
            generateErrorUtil(
                'Usuario pendiente de activar. Por favor, activa tu usuario accediento al email de verificación que has recibido en tu correo',
                403,
            );
        }

        // Objeto con la info que queremos almacenar en el token.
        const tokenInfo = {
            id: users[0].id,
            role: users[0].role,
        };

        // Creamos el token.
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
