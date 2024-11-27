// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newUserController,
    activateUserController,
    loginUserController,
    getPrivateUserInfoController,
    userAvatarController,
    sendRecoverPassController,
    resetUserPassWithCodeController,
} from '../controllers/users/index.js';

// Importamos las funciones controladoras intermedias.
import { authUserController } from '../middlewares/index.js';

// Creamos el router.
const router = express.Router();

// Middleware que registra un nuevo usuario.
router.post('/users/register', newUserController);

// Middleware que valida a un usuario.
router.put('/users/validate/:registrationCode', activateUserController);

// Middleware que logea a un usuario existente.
router.post('/users/login', loginUserController);

// Middleware que retorna info privada de mi usuario.
router.get('/users', authUserController, getPrivateUserInfoController);

// Middleware que permite actualizar el avatar.
router.put('/users/avatar', authUserController, userAvatarController);

// Middleware que permite enviar un correo de recuperación de contraseña.
router.put('/users/password/recover', sendRecoverPassController);

// Middleware que permite resetear la contraseña con un código.
router.put(
    '/users/password/reset/:recoverPassCode',
    resetUserPassWithCodeController,
);

export default router;
