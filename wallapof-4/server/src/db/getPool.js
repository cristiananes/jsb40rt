// Importamos las dependencias.
import mysql from 'mysql2/promise';

// Importamos las variables de entorno necesarias.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// Variable que alamacenará un grupo de conexiones.
let pool;

// Función que retorna un grupo de conexiones.
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

            // Creamos la base de datos si no existe.
            await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            // Creamos el pool definitivo incluyendo la base de datos anterior.
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
