# Wallapof 3

Agrega un contexto para almacenar los datos del token y un hook que, con el token almacenado en el contexto, obtenga los datos del usuario:

-   El token ha de almacenarse en el State del contexto y en el localStorage.

-   El contexto debe exportar el token, una función que se encargue de almacenar el token (`authLogin`) y otra que se encargue de eliminarlo (`authLogout`).

-   Crea un hook personalizado que obtenga los datos del usuario. Debe retornar al usuario y `setUser`.

-   Restringe la navegación en el `Header` en función de si existe o no existe usuario (oculta o muestra los botones de navegación correspondientes si el usuario está logeado).

-   Agrega al `Header` un botón de `Logout` para eliminar el token y borrar los datos del usuario.
