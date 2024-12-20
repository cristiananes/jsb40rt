// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función controladora que retorna el listado de entradas.
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos los query params necesarios.
        let { place, author } = req.query;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos el listado de entradas.
        const [entries] = await pool.query(
            `
            SELECT  
                e.id,
                e.title,
                e.place,
                e.description,
                e.userId,
                u.username AS author,
                IFNULL(AVG(v.value), "Sin votos") AS votes,
                e.createdAt
            FROM entries e
            INNER JOIN users u ON u.id = e.userId
            LEFT JOIN entryVotes v ON v.entryId = e.id
            WHERE e.place LIKE ? AND u.username LIKE ?
            GROUP BY e.id
        `,
            // Si "place" o "author" es undefined establecemos un string vacío. De lo contrario no
            // figurará ninguna entrada como resultado.
            [`%${place || ''}%`, `%${author || ''}%`],
        );

        // Si hay entradas buscamos las fotos de cada entrada.
        for (const entry of entries) {
            // Buscamos las fotos de la entrada actual.
            const [photos] = await pool.query(
                `SELECT id, name FROM entryPhotos WHERE entryId = ?`,
                [entry.id],
            );

            // Agregamos el array de fotos a la entrada actual.
            entry.photos = photos;
        }

        // Enviamos una respuesta al cliente.
        res.send({
            status: 'ok',
            data: {
                entries,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listEntriesController;
