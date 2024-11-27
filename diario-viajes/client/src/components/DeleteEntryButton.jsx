// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos los hooks.
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const DeleteEntryButton = ({ entryId, loading, setLoading }) => {
    // Obtenemos el token.
    const { authToken } = useContext(AuthContext);

    // Obtenemos la función navigate.
    const navigate = useNavigate();

    // Función que elimina una entrada.
    const handleDeleteEntry = async () => {
        try {
            // Si el usuario confirma eliminamos la entrada.
            if (confirm('¿Estás seguro de que deseas eliminar la entrada?')) {
                // Indicamos que va a dar comienzo el fetch.
                setLoading(true);

                // Obtenemos la respuesta del servidor.
                const res = await fetch(
                    `${VITE_API_URL}/api/entries/${entryId}`,
                    {
                        method: 'delete',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );

                // Obtenemos el body.
                const body = await res.json();

                // Si hay algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Redirigimos a la página principal.
                navigate('/');

                // Indicamos al usuario que todo ha ido bien.
                toast.success(body.message, {
                    id: 'entryDetails',
                });
            }
        } catch (err) {
            toast.error(err.message, {
                id: 'entryDetails',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };

    // Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no.
    return (
        <button onClick={() => handleDeleteEntry()} disabled={loading}>
            Borrar entrada
        </button>
    );
};

// Validamos las props.
DeleteEntryButton.propTypes = {
    entryId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default DeleteEntryButton;