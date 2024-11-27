// Importamos las prop-types.
import PropTypes from 'prop-types';

// Importamos los hooks.
import { useContext, useState } from 'react';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const AddPhotoForm = ({ entryId, updateEntryPhotos, loading, setLoading }) => {
    // Obtenemos el token.
    const { authToken } = useContext(AuthContext);

    // Declaramos una variable en el estado para almacenar el valor de la imagen.
    const [photo, setPhoto] = useState(null);

    // Función que permite agregar una foto a una entrada.
    const handleAddPhoto = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Creamos un objeto FormData.
            const formData = new FormData();

            // Agregamos la foto.
            formData.append('photo', photo);

            // Indicamos que va a dar comienzo el fetch.
            setLoading(true);

            // Obtenemos una respuesta del servidor.
            const res = await fetch(
                `${VITE_API_URL}/api/entries/${entryId}/photos`,
                {
                    method: 'post',
                    headers: {
                        Authorization: authToken,
                    },
                    body: formData,
                }
            );

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Agregamos la foto en el State.
            updateEntryPhotos(body.data.photo);

            // Indicamos al usuario que todo ha ido bien.
            toast.success(body.message, {
                id: 'entryDetails',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'entryDetails',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleAddPhoto}>
            <label htmlFor='photo'>Agregar foto:</label>
            <input
                type='file'
                id='photo'
                accept='image/jpeg, image/png'
                onChange={(e) => setPhoto(e.target.files[0])}
                required
            />
            {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
            <button disabled={loading}>Agregar foto</button>
        </form>
    );
};

// Validamos las props.
AddPhotoForm.propTypes = {
    entryId: PropTypes.string.isRequired,
    updateEntryPhotos: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
};

export default AddPhotoForm;
