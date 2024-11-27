// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos la función que genera un contexto y los hooks.
import { createContext, useEffect, useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos el nombre del token.
const { VITE_AUTH_TOKEN, VITE_API_URL } = import.meta.env;

// Creamos el contexto.
export const AuthContext = createContext(null);

// Creamos el componente provider.
export const AuthProvider = ({ children }) => {
    // Declaramos una variable en el State para almacenar el token.
    const [authToken, setAuthToken] = useState(
        localStorage.getItem(VITE_AUTH_TOKEN) || null
    );

    // Declaramos una variable en el State para almacenar los datos del usuario.
    const [authUser, setAuthUser] = useState(null);

    // Declaramos una variable que indica que el fetch a los datos del usuario no ha terminado.
    const [authUserLoading, setAuthUserLoading] = useState(true);

    // Obtenemos los datos del usuario si existe un token.
    useEffect(() => {
        // Función que solicita los datos del usuario.
        const fetchUser = async () => {
            try {
                // Obtenemos la respuesta del servidor.
                const res = await fetch(`${VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Actualizamos los datos del usuario en el State.
                setAuthUser(body.data.user);
            } catch (err) {
                // Si surge cualquier error eliminamos el token del State y del localStorage.
                authLogoutState();

                toast.error(err.message);
            } finally {
                // Indicamos que el fetch a los datos del usuario ha terminado.
                setAuthUserLoading(false);
            }
        };

        // Llamamos a la función anterior si existe un token.
        if (authToken) {
            fetchUser();
        } else {
            setAuthUser(null);
        }
    }, [authToken]);

    // Función que almacena el token.
    const authLoginState = (token) => {
        // Guardamos el token en el State.
        setAuthToken(token);

        // Guardamos el token en el localStorage.
        localStorage.setItem(VITE_AUTH_TOKEN, token);
    };

    // Función que elimina el token.
    const authLogoutState = () => {
        // Eliminamos el token del State.
        setAuthToken(null);

        // Eliminamos el token del localStorage.
        localStorage.removeItem(VITE_AUTH_TOKEN);
    };

    // Función que actualiza el avatar del usuario.
    const authUpdateAvatarState = (avatar) => {
        setAuthUser({
            ...authUser,
            avatar,
        });
    };

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authUser,
                authUserLoading,
                authLoginState,
                authLogoutState,
                authUpdateAvatarState,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

// Validamos las props.
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
