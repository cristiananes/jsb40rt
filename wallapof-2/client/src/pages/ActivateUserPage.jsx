// Importamos los hooks.
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const ActivateUserPage = () => {
    // Importamos la función navigate.
    const navigate = useNavigate();

    // Obtenemos el código de registro de los path params.
    const { registrationCode } = useParams();

    // Validamos al usuario cuando se monta el componente.
    useEffect(() => {
        // Función que valida a un usuario en la base de datos.
        const fetchValidateUser = async () => {
            try {
                // Obtenemos una respuesta del servidor.
                const res = await fetch(
                    `${VITE_API_URL}/api/users/activate/${registrationCode}`,
                    {
                        method: 'put',
                    }
                );

                // Traducimos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Mostramos un mensaje satisfactorio al usuario.
                toast.success(body.message, {
                    id: 'validate',
                });
            } catch (err) {
                toast(err.message, {
                    id: 'validate',
                });
            } finally {
                // Redirigimos a login pase lo que pase.
                navigate('/login');
            }
        };

        // Llamamos a la función anterior.
        fetchValidateUser();
    }, [registrationCode, navigate]);

    return (
        <main>
            <h2>Página de activación de usuario</h2>
        </main>
    );
};

export default ActivateUserPage;
