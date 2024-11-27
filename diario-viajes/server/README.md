# Diario de viajes

Se trata de una web donde los usuarios publican entradas sobre viajes. Cada entrada tiene título, descripción, lugar y hasta 3 fotos asignadas. Cada entrada puede ser votada con una puntuación entre 1 y 5.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | VARCHAR(36)  | Identificador único del usuario        |
| email      | VARCHAR(100) | Correo electrónico del usuario         |
| password   | VARCHAR(100) | Contraseña del usuario (hash)          |
| username   | VARCHAR(30)  | Nombre de usuario del usuario          |
| avatar     | VARCHAR(100) | URL del avatar del usuario             |
| role       | ENUM         | Rol del usuario ("admin" o "normal")   |
| createdAt  | DATETIME     | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME     | Fecha y hora de la última modificación |

### entries

| Campo       | Tipo         | Descripción                            |
| ----------- | ------------ | -------------------------------------- |
| id          | VARCHAR(36)  | Identificador único de la entrada      |
| title       | VARCHAR(100) | Título de la entrada                   |
| place       | VARCHAR(50)  | Lugar donde ocurrieron los sucesos     |
| description | TEXT         | Descripción de los sucesos             |
| idUser      | VARCHAR(36)  | Identificador del usuario creador      |
| createdAt   | DATETIME     | Fecha y hora de creación de la entrada |

### entryPhotos

| Campo     | Tipo         | Descripción                                            |
| --------- | ------------ | ------------------------------------------------------ |
| id        | VARCHAR(36)  | Identificador único de la foto                         |
| name      | VARCHAR(100) | Nombre de la foto                                      |
| idEntry   | VARCHAR(36)  | Identificador de la entrada a la que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto                    |

### entryVotes

| Campo     | Tipo        | Descripción                        |
| --------- | ----------- | ---------------------------------- |
| id        | VARCHAR(36) | Identificador único del voto       |
| value     | TINYINT     | Valor del voto (del 1 al 5)        |
| idEntry   | VARCHAR(36) | Identificador de la entrada votada |
| idUser    | VARCHAR(36) | Identificador del usuario que votó |
| createdAt | DATETIME    | Fecha y hora de creación del voto  |

## Endpoints del usuario

-   **POST** - [`/users/register`] - Crea un nuevo usuario pendiente de activar. ✅
-   **PUT** - [`/users/validate/:registrationCode`] - Activa a un usuario mediante un código de registro. ✅
-   **POST** - [`/users/login`] - Logea a un usuario retornando un token. ✅
-   **GET** - [`/users`] - Retorna información privada del usuario con el id del token. ✅
-   **PUT** - [`/users/avatar`] - Permite actualizar el avatar del usuario. ✅
-   **PUT** - [`/users/password/recover`] - Permite enviar un email de recuperación de contraseña. ✅
-   **PUT** - [`/users/password/reset/:recoverPassCode`] - Permite crear una nueva contraseña a partir de un código. ✅

## Endpoints del diario

-   **POST** - [`/entries`] - Crea una entrada. ✅
-   **GET** - [`/entries`] - Retorna el listado de entradas. ✅
-   **GET** - [`/entries/:entryId`] - Retorna una entrada en concreto. ✅
-   **POST** - [`/entries/:entryId/photos`] - Agregar una foto a una entrada. ✅
-   **DELETE** - [`/entries/:entryId/photos/:photoId`] - Eliminar una foto de una entrada. ✅
-   **POST** - [`/entries/:entryId/votes`] - Vota una entrada (entre 1 y 5). ✅
-   **DELETE** - [`/entries/:entryId`] - Eliminar una entrada. ✅
