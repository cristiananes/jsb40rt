// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que guarda una foto.
import savePhotoUtil from '../../utils/savePhotoUtil.js';

// Importamos la función que elimina una foto.
import removePhotoUtil from '../../utils/removePhotoUtil.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite actualizar el avatar del usuario.
const userAvatarController = async (req, res, next) => {
    try {
        // Obtenemos los datos necesarios. Mediante la interrogación le indicamos a JavaScript que
        // "files" podría ser undefined. De esta forma evitamos que salte un error.
        const avatar = req.files?.avatar;

        // Si falta algún campo lanzamos un error.
        if (!avatar) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos el id del usuario del token.
        const userId = req.user.id;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Comprobamos si el usuario ya tiene avatar previo.
        const [users] = await pool.query(
            `SELECT avatar FROM users WHERE id = ?`,
            [userId],
        );

        // Si no existe ningún usuario lanzamos un error.
        if (users.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        // Si el usuario tiene un avatar previo lo eliminamos.
        if (users[0].avatar) {
            await removePhotoUtil(users[0].avatar);
        }

        // Guardamos el avatar en la carpeta de subida de archivos y obtenemos su nombre.
        const avatarName = await savePhotoUtil(avatar, 100);

        // Actualizamos los datos del usuario.
        await pool.query(`UPDATE users SET avatar = ? WHERE id = ?`, [
            avatarName,
            userId,
        ]);

        res.status(201).send({
            status: 'ok',
            message: 'Avatar actualizado',
        });
    } catch (err) {
        next(err);
    }
};

export default userAvatarController;
