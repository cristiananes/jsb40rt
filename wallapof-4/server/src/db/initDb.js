// Agregamos al proceso actual las variables de entorno personalizadas del fichero ".env".
import 'dotenv/config';

// Importamos la función que retorna la conexión.
import getPool from './getPool.js';

// Función que genera las tablas.
const main = async () => {
    try {
        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        console.log('Borrando tablas...');

        // Borramos las tablas.
        await pool.query(
            `DROP TABLE IF EXISTS reservations, productPhotos, products, users`,
        );

        console.log('Creando tablas...');

        // Tabla de usuarios.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                registrationCode CHAR(30),
                active BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de productos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY(userId) REFERENCES users(id),
                name VARCHAR(100) NOT NULL,
                price DECIMAL(9,2) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de fotos.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS productPhotos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                productId INT UNSIGNED NOT NULL,
                FOREIGN KEY(productId) REFERENCES products(id),
                name VARCHAR(100) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de reservas.
        await pool.query(`
            CREATE TABLE IF NOT EXISTS reservations (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY(userId) REFERENCES users(id),
                productId INT UNSIGNED NOT NULL,
                FOREIGN KEY(productId) REFERENCES products(id),
                status ENUM("pending", "rejected", "completed") DEFAULT "pending", 
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Tablas creadas');

        // Cerramos el proceso con código 0.
        process.exit(0);
    } catch (err) {
        console.error(err);

        // Cerramos el proceso con código 0.
        process.exit(1);
    }
};

// Llamamos a la función anterior.
main();
