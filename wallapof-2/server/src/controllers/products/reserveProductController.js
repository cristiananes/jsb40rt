// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que envía un email.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// Función controladora que crea una nueva reserva.
const reserveProductController = async (req, res, next) => {
    try {
        // Obtenemos el ID del producto a reservar.
        const { productId } = req.params;

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Tratamos de obtener el producto.
        const [products] = await pool.query(
            `SELECT name, price, userId FROM products WHERE id = ?`,
            [productId],
        );

        // Si no existe el producto lanzamos un error.
        if (products.length < 1) {
            generateErrorUtil('Producto no encontrado', 404);
        }

        // Si somos los dueños del producto lanzamos un error.
        if (products[0].userId === req.user.id) {
            generateErrorUtil('No puedes reservar tus propios productos', 403);
        }

        // Comprobamos si ya hay una reserva sobre este producto cuyo estado sea "completed".
        let [reservations] = await pool.query(
            `SELECT id FROM reservations WHERE status = "completed" AND productId = ?`,
            [productId],
        );

        // Si el producto ya ha sido vendido lanzamos un error.
        if (reservations.length > 0) {
            generateErrorUtil('El producto ya se ha vendido', 403);
        }

        // Obtenemos el ID del interesado y del vendedor.
        const buyerId = req.user.id;
        const sellerId = products[0].userId;

        // Comprobamos si ya hice una reserva sobre el producto.
        [reservations] = await pool.query(
            `SELECT id FROM reservations WHERE userId = ? AND productId = ?`,
            [buyerId, productId],
        );

        // Si ya existe una reserva creada por el mismo usuario lanzamos un error.
        if (reservations.length > 0) {
            generateErrorUtil(
                'No puedes reservar dos veces el mismo producto',
                409,
            );
        }

        // Creamos la reserva.
        await pool.query(
            `INSERT INTO reservations(userId, productId) VALUES(?, ?)`,
            [buyerId, productId],
        );

        // Tratamos de obtener al usuario interesado.
        const [buyerUsers] = await pool.query(
            `SELECT email FROM users WHERE id = ?`,
            [buyerId],
        );

        // Tratamos de obtener al usuario vendedor.
        const [sellerUsers] = await pool.query(
            `SELECT email FROM users WHERE id = ?`,
            [sellerId],
        );

        // Si falta algún usuario lanzamos un error.
        if (buyerUsers.length < 1 || sellerUsers.length < 1) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        // Obtenemos los emails de ambos usuarios.
        const buyerEmail = buyerUsers[0].email;
        const sellerEmail = sellerUsers[0].email;

        // Asunto del email de verificación.
        const emailSubject =
            'Un usuario está interesado en tu producto - Wallapof :)';

        // Cuerpo del email de verificación.
        const emailBody = `
            El usuario con email ${buyerEmail} está interesado en tu artículo ${products[0].name}. 
            
            Ponte en contacto con él para continuar negociando.
        `;

        // Enviamos el email.
        await sendMailUtil(sellerEmail, emailSubject, emailBody);

        // Enviamos una respuesta al cliente.
        await res.status(201).send({
            status: 'ok',
            message: 'Reserva creada',
        });
    } catch (err) {
        next(err);
    }
};

export default reserveProductController;
