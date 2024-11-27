// Importamos los hooks.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const NewEntryPage = () => {
    // Obtenemos los datos del usuario y el token.
    const { authUser, authToken } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Declaramos una variable en el State para cada input.
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);

    // Variable que indica cuando termina el fetch de crear una nueva entrada.
    const [loading, setLoading] = useState(false);

    // Función que maneja el envío del formulario.
    const handleAddEntry = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Para enviar archivos debemos crear un objeto de tipo FormData.
            const formData = new FormData();

            // Ahora agregamos las propiedades y valores al objeto anterior.
            formData.append('title', title);
            formData.append('place', place);
            formData.append('description', description);

            // Las propiedades de las fotos las crearemos solo si existe la foto.
            photo1 && formData.append('photo1', photo1);
            photo2 && formData.append('photo2', photo2);
            photo3 && formData.append('photo3', photo3);

            // Indicamos que va a dar comienzo el fetch para deshabilitar el botón.
            setLoading(true);

            // Obtenemos la respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/entries`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hubo algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Redirigimos a la página principal.
            navigate('/');

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'newEntry',
            });
        } catch (err) {
            toast(err.message, {
                id: 'newEntry',
            });
        } finally {
            // Indicamos que ha finalizado el fetch para habilitar el botón.
            setLoading(false);
        }
    };

    // Si NO estamos logueados redirigimos a la página de login.
    if (!authUser) return <Navigate to='/login' />;

    return (
        <main>
            <h2>Página de nueva entrada</h2>

            <form onSubmit={handleAddEntry}>
                <label htmlFor='title'>Título:</label>
                <input
                    type='text'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor='place'>Lugar:</label>
                <input
                    type='text'
                    id='place'
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    required
                />

                <label htmlFor='description'>Descripción:</label>
                <textarea
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required></textarea>

                <label htmlFor='photo1'>Foto 1:</label>
                <input
                    type='file'
                    id='photo1'
                    onChange={(e) => setPhoto1(e.target.files[0])}
                    accept='image/jpeg, image/png'
                    required
                />

                <label htmlFor='photo2'>Foto 2:</label>
                <input
                    type='file'
                    id='photo2'
                    accept='image/jpeg, image/png'
                    onChange={(e) => setPhoto2(e.target.files[0])}
                />

                <label htmlFor='photo3'>Foto 3:</label>
                <input
                    type='file'
                    id='photo3'
                    accept='image/jpeg, image/png'
                    onChange={(e) => setPhoto3(e.target.files[0])}
                />

                {/* Habilitamos o deshabilitamos el botón en función de si estamos haciendo un fetch o no. */}
                <button disabled={loading}>Crear entrada</button>
            </form>
        </main>
    );
};

export default NewEntryPage;
