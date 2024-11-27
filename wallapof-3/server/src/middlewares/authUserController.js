// Importamos las dependencias.
import jwt from 'jsonwebtoken';

// Función controladora intermedia que desencripta el token creando la propiedad "user"
import generateErrorUtil from '../utils/generateErrorUtil.js';

// en el objeto "req".
const authUserController = async (req, res, next) => {
    try {
        // Obtenemos el token.
        const { authorization } = req.headers;

        // Si falta el token lanzamos un error.
        if (!authorization) {
            generateErrorUtil('Falta la cabecera de autenticación', 401);
        }

        try {
            // Desencriptamos el token.
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);

            // Creamos una propiedad inventada por nosotros en el objeto "req" que contenga los
            // datos del usuario tras desencriptar el token.
            req.user = tokenInfo;

            // Pasamos el control a la siguiente función controladora.
            next();
        } catch (err) {
            console.error(err);

            generateErrorUtil('Token inválido', 401);
        }
    } catch (err) {
        next(err);
    }
};

export default authUserController;
