// Importamos las dependencias.
import path from 'path';
import fs from 'fs/promises';

// Importamos la función que genera un error.
import generateErrorUtil from './generateErrorUtil.js';

// Función que elimina una foto de la carpeta de subida de archivos.
const removePhotoUtil = async (imgName) => {
    try {
        // Ruta absoluta a la imagen que queremos eliminar.
        const imgPath = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            imgName,
        );

        try {
            // Intentamos acceder a la imagen.
            await fs.access(imgPath);

            // Si el método anterior no generó error eliminamos la imagen.
            await fs.unlink(imgPath);
        } catch {
            // Si "access" lanza un error quiere decir que la imagen no existe. Finalizamos
            // la función.
            return;
        }
    } catch (err) {
        console.error(err);

        generateErrorUtil('Error al eliminar archivo del disco', 500);
    }
};

export default removePhotoUtil;
