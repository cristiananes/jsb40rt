// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newUserController,
    activateUserController,
    loginUserController,
    getPrivateUserInfoController,
    userAvatarController,
} from '../controllers/users/index.js';

// Importamos las funciones controladoras intermedias.
import authUserController from '../middlewares/authUserController.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite registrar un usuario.
router.post('/users/register', newUserController);

// Middleware que permite activar un usuario.
router.put('/users/activate/:registrationCode', activateUserController);

// Middleware que permite loguear un usuario.
router.post('/users/login', loginUserController);

// Middleware que retorna info privada de un usuario.
router.get('/users', authUserController, getPrivateUserInfoController);

// Middleware que actualiza el avatar de un usuario.
router.put('/users/avatar', authUserController, userAvatarController);

export default router;
