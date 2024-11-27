// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../db/getPool.js';

// Importamos la función que genera un error.
import generateErrorUtil from '../utils/generateErrorUtil.js';

// Función controladora intermedia que comprueba si la entrada existe.
const entryExistsController = async (req, res, next) => {
    try {
        // Obtenemos el ID de la entrada.
        const { entryId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos la entrada.
        const [entries] = await pool.query(
            `SELECT id FROM entries WHERE id = ?`,
            [entryId],
        );

        // Si la entrada no existe lanzamos un error.
        if (entries.length < 1) {
            generateErrorUtil('Entrada no encontrada', 404);
        }

        // Avanzamos a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

export default entryExistsController;
