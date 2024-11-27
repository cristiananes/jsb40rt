// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que genera un contexto y los hooks.
import { createContext, useState } from 'react';

// Importamos el nombre del token.
const { VITE_AUTH_TOKEN } = import.meta.env;

// Creamos el contexto.
export const AuthContext = createContext(null);

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    // Declaramos una variable en el State para almacenar el token.
    const [authToken, setAuthToken] = useState(
        localStorage.getItem(VITE_AUTH_TOKEN) || null
    );

    // Función que almacena el token.
    const authLogin = (token) => {
        // Guardamos el token en el State.
        setAuthToken(token);

        // Guardamos el token en el localStorage.
        localStorage.setItem(VITE_AUTH_TOKEN, token);
    };

    // Función que elimina el token.
    const authLogout = () => {
        // Eliminamos el token del State.
        setAuthToken(null);

        // Eliminamos el token del localStorage.
        localStorage.removeItem(VITE_AUTH_TOKEN);
    };

    return (
        <AuthContext.Provider value={{ authToken, authLogin, authLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validamos las props.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
