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

-   **POST** - [`/users/register`] - Crea un nuevo usuario pendiente de activar.
-   **PUT** - [`/users/activate/:registrationCode`] - Activa un usuario con un código de registro.
-   **POST** - [`/users/login`] - Logea a un usuario activo.
-   **GET** - [`/users`] - Obtener info privada del usuario (token necesario).
-   **PUT** - [`/users/avatar`] - Actualizar el avatar del usuario (token necesario).

## Endpoints del diario

-   **POST** - [`/products`] - Crea un producto. Podrá incluír hasta 3 fotos (token necesario).
-   **GET** - [`/products`] - Retorna el listado de productos. Permite filtrar por nombre.
-   **GET** - [`/products/:productId`] - Retorna una entrada en concreto.
-   **PUT** - [`/products/:productId`] - Permite editar el nombre y/o el precio de un producto (token necesario).
-   **DELETE** - [`/products/:productId`] - Elimina una entrada en concreto (token necesario). Solo si somos los dueños.

1. Modifica el middleware de crear producto para que pueda incluír hasta 3 fotos. Para tal fin modifica la base de datos creando una tabla extra para las fotos de los productos y elimina la columna `photo` de la tabla de productos. Posteriormente haz los cambios necesarios en la función controladora `newProductController.js`.

2. Modifica los middlewares que retornan información de los productos para incluír el array de fotos: `listProductController.js`, `getProductByIdController.js`.

3. Crea un middleware que permita a un usuario contactar a otro usuario vía email. En nuestra aplicación, si un usuario está interesado en el producto de otro usuario, se pondrán en contacto por mail para llegar a un acuerdo (no habrá chat interno dentro de la propia app). Crea una tabla de reservas donde un usuario A pueda reservar un producto de un usuario B. Al crearse la reserva se le enviará un email al dueño del artículo indicando que el usuario A está interesado y se le proporcionará el email del usuario A para que pueda contactarle por su cuenta. La tabla de reservas ha de contener el ID del interesado, el ID del producto por el cuál muestra interés, y un estado que indique si la reserva está pendiente, rechazada o aceptada.

4. Crea un middleware que permita al usuario comprador cambiar el estado de la reserva a aceptada o rechazada. Se supone que el comprador gestionará por su cuenta la venta del producto con otro usuario fuera de la platadorma y finalmente deberá indicar si hubo trato o no.
