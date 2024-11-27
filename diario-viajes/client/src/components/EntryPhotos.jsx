// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos los hooks.
import { useContext } from 'react';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const EntryPhotos = ({
    authUser,
    entry,
    deleteEntryPhotos,
    loading,
    setLoading,
}) => {
    // Obtenemos el token.
    const { authToken } = useContext(AuthContext);

    // Función que elimina una foto.
    const handleDeletePhoto = async (photoId) => {
        try {
            // Antes de eliminar la foto consultamos con el usuario.
            if (confirm('¿Estás seguro que deseas eliminar la foto?')) {
                // Indicamos que va a dar comienzo el fetch.
                setLoading(true);

                // Obtenemos una respuesta del servidor.
                const res = await fetch(
                    `${VITE_API_URL}/api/entries/${entry.id}/photos/${photoId}`,
                    {
                        method: 'delete',
                        headers: {
                            Authorization: authToken,
                        },
                    }
                );

                // Obtenemos el body.
                const body = await res.json();

                // Si hubo algún error lo lanzamos.
                if (body.status === 'error') {
                    throw new Error(body.message);
                }

                // Eliminamos la foto del State.
                deleteEntryPhotos(photoId);

                // Mostramos un mensaje satisfactorio al usuario.
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

    return entry.photos.map((photo) => {
        return (
            <div className='entry-photo' key={photo.id}>
                <img
                    src={`${VITE_API_URL}/${photo.name}`}
                    alt={`Foto de la entrada de ${entry.author}`}
                />
                {
                    // Si estamos logueados, somos los dueños, y hay más de una foto podemos borrar la foto.
                    authUser &&
                        authUser.id === entry.userId &&
                        entry.photos.length > 1 && (
                            // Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no.
                            <button
                                onClick={() => handleDeletePhoto(photo.id)}
                                disabled={loading}>
                                Borrar foto
                            </button>
                        )
                }
            </div>
        );
    });
};

// Validamos las props.
EntryPhotos.propTypes = {
    authUser: PropTypes.object.isRequired,
    entry: PropTypes.object.isRequired,
    deleteEntryPhotos: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default EntryPhotos;
