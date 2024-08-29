// Importamos las dependencias.
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

// Importamos la función que genera un error.
import generateErrorUtil from './generateErrorUtil.js';

// Función que guarda una imagen en la carpeta de subida de archivos. Esta
// función recibe como parámetros una imagen y un ancho en píxeles.
const savePhotoUtil = async (img, width) => {
    try {
        // Ruta absoluta al directorio de subida de archivos.
        const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

        try {
            // Intentamos acceder a la carpeta de subida de archivos.
            await fs.access(uploadsPath);
        } catch {
            // Si "access" lanza un error quiere decir que la carpeta no existe. La creamos.
            await fs.mkdir(uploadsPath);
        }

        // Convertimos la imagen en un objeto Sharp.
        const sharpImg = sharp(img.data);

        // Redimensionamos la imagen a un ancho en píxeles dado.
        sharpImg.resize(width);

        // Generamos un nombre aleatorio para la imagen.
        const imgName = `${crypto.randomUUID()}.jpg`;

        // Ruta absoluta a la imagen.
        const imgPath = path.join(uploadsPath, imgName);

        // Guardamos la imagen.
        await sharpImg.toFile(imgPath);

        // Retornamos el nombre de la imagen para guardarlo en la base de datos.
        return imgName;
    } catch (err) {
        console.error(err);

        generateErrorUtil('Error al guardar el archivo en disco', 500);
    }
};

export default savePhotoUtil;
