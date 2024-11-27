-- Creamos la base de datos.
CREATE DATABASE IF NOT EXISTS scoutApp;

-- Seleccionamos la base de datos.
USE scoutApp;

-- Borramos las tablas si existen.
DROP TABLE IF EXISTS hiringRequests, videos, players, users;

-- Creamos la tabla de usuarios.
CREATE TABLE IF NOT EXISTS users (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    role ENUM("family", "scout") NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla de jugadores.
CREATE TABLE IF NOT EXISTS players (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id),
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    birthDate DATE NOT NULL,
    position VARCHAR(50) NOT NULL, 
    skills VARCHAR(500), 
    team VARCHAR(100),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla de videos.
CREATE TABLE IF NOT EXISTS videos (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    playerId INT UNSIGNED NOT NULL,
    FOREIGN KEY(playerId) REFERENCES players(id),
    title VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Creamos la tabla de contrataciones.
CREATE TABLE IF NOT EXISTS hiringRequests (
	id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id),
    playerId INT UNSIGNED NOT NULL,
    FOREIGN KEY(playerId) REFERENCES players(id),
    status ENUM("pendiente", "aceptada", "rechazada") DEFAULT "pendiente",
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);