// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Función controladora intermedia que comprueba si el usuario tiene permisos para
// editar la entrada.
const canEditEntryController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada.
        const { entryId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos la entrada.
        const [entries] = await pool.query(
            `SELECT userId FROM entries WHERE id = ?`,
            [entryId],
        );

        // Si no tenemos permisos lanzamos un error.
        if (req.user.id !== entries[0].userId) {
            generateErrorUtil('No tienes suficientes permisos', 403);
        }

        // Avanzamos a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default canEditEntryController;
