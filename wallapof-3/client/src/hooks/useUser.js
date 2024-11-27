// Importamos los hooks.
import { useContext, useEffect, useState } from 'react';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useUser = () => {
    // Importamos el token.
    const { authToken } = useContext(AuthContext);

    // Declaramos una variable en el State para almacenar los datos del usuario.
    const [user, setUser] = useState(null);

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
                setUser(body.data.user);
            } catch (err) {
                toast.error(err.message);
            }
        };

        // Llamamos a la función anterior si existe un token.
        if (authToken) {
            fetchUser();
        }
    }, [authToken]);

    // Retornamos las variables y funciones necesarias.
    return { user, setUser };
};

export default useUser;
