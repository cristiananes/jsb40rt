// Importamos las dependencias.
import mysql from 'mysql2/promise';

// Obtenemos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que almacenará un grupo de conexiones con la base de datos.
let pool;

// Función que retorna el grupo de conexiones.
const getPool = async () => {
    try {
        // Si no existe un grupo de conexiones lo creamos.
        if (!pool) {
            // Creamos un pool temporal.
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                timezone: 'Z',
            });

            // Con la conexión anterior creamos la base de datos si no existe.
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Creamos el pool definitivo.
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }

        return await pool;
    } catch (err) {
        console.error(err);
    }
};

export default getPool;
