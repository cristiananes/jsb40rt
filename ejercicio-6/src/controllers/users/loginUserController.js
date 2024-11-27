// Importamos las dependencias.
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que loguea a un usuario retornando un token.
const loginUserController = async (req, res, next) => {
    try {
        // Obtenemos los campos necesarios.
        const { email, password } = req.body;

        // Si falta algún campo lanzamos un error.
        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Buscamos en la tabla de usuarios al usuario con el email dado.
        const [users] = await pool.query(
            `SELECT id, password, active FROM users WHERE email = ?`,
            [email],
        );

        // Comprobamos si la contraseña recibida por body coincide con la que figura en la base
        // de datos.
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
                'Usuario pendiente de activar. Por favor, accede al email de verificación que has recibido en tu correo electrónico para activar tu usuario',
                403,
            );
        }

        // Información que queremos almacenar en el token.
        const tokenInfo = {
            id: users[0].id,
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
