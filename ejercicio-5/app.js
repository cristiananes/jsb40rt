// Agregamos al proceso actual las variables de entorno personalizadas del fichero ".env".
import 'dotenv/config';

// Importamos las dependencias.
import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import cors from 'cors';

// Importamos las rutas.
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';

// Importamos las variables de entorno necesarias.
const { PORT } = process.env;

// Creamos el servidor.
const app = express();

// Middleware que evita problemas de conexión entre cliente y servidor.
app.use(cors());

// Middleware que muestra por consola info de la petición entrante.
app.use(morgan('dev'));

// Middleware que permite leer un body en formato JSON.
app.use(express.json());

// Middleware que permite leer un body en formato form-data (para leer archivos).
app.use(fileUpload());

// Middleware que indica a Express dónde están las rutas.
app.use('/api', userRoutes);
app.use('/api', productRoutes);

// Middleware de manejo de errores.
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Indicamos al servidor que escuche peticiones en un puerto dado.
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
