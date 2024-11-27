// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que permite aceptar o rechazar una reserva.
const endReservationController = async (req, res, next) => {
    try {
        // Obtenemos el ID del producto.
        const { productId, reservationId } = req.params;

        // Obtenemos los datos necesarios.
        const { status } = req.body;

        // Si falta algún campo lanzamos un error.
        if (!status) {
            generateErrorUtil('Faltan campos', 400);
        }

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Tratamos de obtener el producto.
        const [products] = await pool.query(
            `SELECT userId FROM products WHERE id = ?`,
            [productId],
        );

        // Si no existe el producto lanzamos un error.
        if (products.length < 1) {
            generateErrorUtil('Producto no encontrado', 404);
        }

        // Si NO somos los dueños del producto lanzamos un error.
        if (products[0].userId !== req.user.id) {
            generateErrorUtil('No tienes suficientes permisos', 403);
        }

        // Tratamos de obtener la reserva.
        const [reservations] = await pool.query(
            `SELECT id FROM reservations WHERE id = ? AND productId = ?`,
            [reservationId, productId],
        );

        // Si no existe la reserva lanzamos un error.
        if (reservations.length < 1) {
            generateErrorUtil('Reserva no encontrada', 404);
        }

        // Modificamos el estado de la reserva.
        await pool.query(`UPDATE reservations SET status = ? WHERE id = ?`, [
            status,
            reservationId,
        ]);

        // Enviamos una respuesta al cliente.
        await res.send({
            status: 'ok',
            message: 'Reserva actualizada',
        });
    } catch (err) {
        next(err);
    }
};

export default endReservationController;
