// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newEntryController,
    listEntriesController,
    getEntryByIdController,
    addPhotoController,
    deletePhotoController,
    voteEntryController,
    deleteEntryController,
} from '../controllers/entries/index.js';

// Importamos las funciones controladoras intermedias.
import {
    authUserController,
    entryExistsController,
    canEditEntryController,
} from '../middlewares/index.js';

// Creamos el router.
const router = express.Router();

// Middleware que registra una nueva entrada.
router.post('/entries', authUserController, newEntryController);

// Middleware que retorna el listado de entradas.
router.get('/entries', listEntriesController);

// Middleware que retorna una entrada concreta por ID.
router.get('/entries/:entryId', entryExistsController, getEntryByIdController);

// Middleware que agrega una foto a una entrada existente.
router.post(
    '/entries/:entryId/photos',
    authUserController,
    entryExistsController,
    canEditEntryController,
    addPhotoController,
);

// Middleware que elimina una foto de una entrada concreta.
router.delete(
    '/entries/:entryId/photos/:photoId',
    authUserController,
    entryExistsController,
    canEditEntryController,
    deletePhotoController,
);

// Middleware que vota una entrada concreta.
router.post(
    '/entries/:entryId/votes',
    authUserController,
    entryExistsController,
    voteEntryController,
);

// Middleware que elimina una entrada concreta.
router.delete(
    '/entries/:entryId',
    authUserController,
    entryExistsController,
    canEditEntryController,
    deleteEntryController,
);

export default router;
