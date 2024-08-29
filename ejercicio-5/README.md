# App de productos de segunda mano

Se trata de una web donde los usuarios venden a otros usuarios productos que ya no utilizan.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initdb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo     | Tipo         | Descripción                          |
| --------- | ------------ | ------------------------------------ |
| id        | VARCHAR(36)  | Identificador único del usuario      |
| email     | VARCHAR(100) | Correo electrónico del usuario       |
| avatar    | VARCHAR(100) | Avatar del usuario                   |
| password  | VARCHAR(100) | Contraseña del usuario (hash)        |
| createdAt | DATETIME     | Fecha y hora de creación del usuario |

### products

| Campo     | Tipo         | Descripción                            |
| --------- | ------------ | -------------------------------------- |
| id        | VARCHAR(36)  | Identificador único de la entrada      |
| name      | VARCHAR(100) | Nombre del producto                    |
| price     | DECIMAL(9,2) | Precio del producto                    |
| idUser    | VARCHAR(36)  | Identificador del usuario creador      |
| createdAt | DATETIME     | Fecha y hora de creación de la entrada |

## Endpoints del usuario

-   **POST** - [`/users/register`] - Crea un nuevo usuario pendiente de activar. (MODIFICAR `newUserController.js`)
-   **PUT** - [`/users/activate/:registrationCode`] - Activa un usuario con un código de registro. (CREAR `activateUserController.js`)
-   **POST** - [`/users/login`] - Logea a un usuario activo. (MODIFICAR `loginUserController.js`)
-   **GET** - [`/users`] - Obtener info privada del usuario (token necesario).
-   **PUT** - [`/users/avatar`] - Actualizar el avatar del usuario (token necesario).

## Endpoints del diario

-   **POST** - [`/products`] - Crea un producto. Debe incluír obligatoriamente una foto (token necesario).
-   **GET** - [`/products`] - Retorna el listado de productos. Permite filtrar por nombre.
-   **GET** - [`/products/:productId`] - Retorna una entrada en concreto.
-   **PUT** - [`/products/:productId`] - Permite editar el nombre y/o el precio de un producto (token necesario). (CREAR `updateEntryController.js`) ¡BONUS!
-   **DELETE** - [`/products/:productId`] - Elimina una entrada en concreto (token necesario). Solo si somos los dueños.
