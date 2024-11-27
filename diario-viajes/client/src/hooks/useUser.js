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
    const { authToken, authLogout } = useContext(AuthContext);

    // Declaramos una variable en el State para almacenar los datos del usuario.
    const [user, setUser] = useState(null);

    // Declaramos una variable en el State que indicará si estamos haciendo un fetch al servidor.
    const [userLoading, setUserLoading] = useState(true);

    // Solicitamos los datos del usuario si existe un token.
    useEffect(() => {
        // Función que obtiene los datos del usuario.
        const fetchUser = async () => {
            try {
                // Obtenemos una respuesta del servidor.
                const res = await fetch(`${VITE_API_URL}/api/users`, {
                    headers: {
                        Authorization: authToken,
                    },
                });

                // Obtenemos el body.
                const body = await res.json();

                // Si hubo algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Establecemos los datos del usuario.
                setUser(body.data.user);
            } catch (err) {
                // Si el token no es correcto lo eliminamos.
                if (err.message === 'Token inválido') {
                    authLogout();
                }

                // Si un error eliminamos el usuario.
                setUser(null);

                toast.error(err.message, {
                    id: 'userInfo',
                });
            } finally {
                // Finalmente, tanto si la cosa ha ido bien como si ha ido mal establecemos
                // "loading" a false para indicar que ha finalizado el fetch.
                setUserLoading(false);
            }
        };

        // Si existe un token, buscamos los datos del usuario.
        if (authToken) {
            fetchUser();
        } else {
            // Vaciamos los datos del usuario.
            setUser(null);

            // Establecemos "loading" a false porque no ha tenido lugar el fetch.
            setUserLoading(false);
        }
    }, [authToken, authLogout]);

    //actualizamos el avatar
    const updateAvatar = (updatedUserAvatar) => {


        //actualizamos los datos
        setUser({
            ...user,
            avatar: updatedUserAvatar.avatar,
        });
    }


    //Creamos la funcion para actualizar el avatar
    const deleteAvatar = async () => {

        setUser({
            ...user,
            avatar: null,
        });

    }

    // Retornamos los variables y funciones necesarias.
    return { user, setUser, userLoading, deleteAvatar, updateAvatar };
};

export default useUser;
