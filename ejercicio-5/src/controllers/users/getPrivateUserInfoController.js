// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función que retorna info privada del usuario.
const getPrivateUserInfoController = async (req, res, next) => {
    try {
        // Obtenemos el ID del usuario del token.
        const userId = req.user.id;

        // Obtenemos la conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los datos del usuario.
        const [users] = await pool.query(
            `SELECT id, email, avatar FROM users WHERE id = ?`,
            [userId],
        );

        // Si no existe ningún usuario lanzamos un error.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        res.send({
            status: 'ok',
            data: {
                user: users[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPrivateUserInfoController;
