// Agregamos al proceso actual las variables de entorno personalizadas del fichero ".env".
import 'dotenv/config';

// Importamos las dependencias.
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Importamos las rutas.
import routes from './src/routes/index.js';

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

// Middleware que indica a Express dónde están las rutas.
app.use(routes);

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
