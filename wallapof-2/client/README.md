# Wallapof 2

Agrega las siguientes páginas al proyecto:

-   Una página de registro de usuario `/register`. Deberá registrar un usuario y redirigir a la página de login.

-   Una página de activación de usuario `/users/activate/:registrationCode`. Deberá recibir por path params un código de registro y activar un usuario. Al finalizar la validación, tanto si ha ido bien como si ha ido mal, se redirigirá a la página de login.

-   Una página de logn `/login`. Al finalizar el login se redirigirá a la página principal.

-   Crea los botones de navegación a las páginas de inicio, login y registro en el componente `Header`.

Recuerda que para la paginación deberás instalar `react-router-dom`, activarlo en `main.jsx` y crear las rutas en `App.jsx`. Para mostrar los mensajes de éxito y error puedes ayudarte de la dependencia `react-hot-toast`. Una vez instalada deberás configurar el componente `Toaster` en `App.jsx` e importar la función `toast` en el componente donde quieras mostrar el mensaje.
