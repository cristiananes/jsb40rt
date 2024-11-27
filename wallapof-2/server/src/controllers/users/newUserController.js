// Importamos las dependencias.
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Importamos la función que retorna una conexión con la base de datos.
import getPool from '../../db/getPool.js';

// Importamos la función que envía un email.
import sendMailUtil from '../../utils/sendMailUtil.js';

// Función que genera un error.
import generateErrorUtil from '../../utils/generateErrorUtil.js';

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

        // Generamos un código de registro de 30 dígitos.
        const registrationCode = crypto.randomBytes(15).toString('hex');

        // Encriptamos la contraseña.
        const hashedPass = await bcrypt.hash(password, 10);

        // Insertamos el usuario.
        await pool.query(
            `INSERT INTO users(email, password, registrationCode) VALUES(?, ?, ?)`,
            [email, hashedPass, registrationCode],
        );

        // Asunto del email de verificación.
        const emailSubject = 'Activa tu usuario en Wallapof :)';

        // Cuerpo del email de verificación.
        const emailBody = `
            ¡Bienvenid@ ${email.split('@')[0]}! 

            Gracias por registrarte en Wallapof. Para activar tu cuenta, haz click en el siguiente enlace:

            <a href="${process.env.CLIENT_URL}/users/validate/${registrationCode}">¡Activa tu usuario!</a>
        `;

        // Enviamos el email.
        await sendMailUtil(email, emailSubject, emailBody);

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
