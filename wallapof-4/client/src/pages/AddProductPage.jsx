// Importamos los hooks y el componente Navigate.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const AddProductPage = () => {
    // Importamos el token.
    const { authToken, authUser, authUserLoading } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Creamos una variable en el State por cada input.
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [photos, setPhotos] = useState([]);

    // Función que maneja el envío del formulario.
    const handleAddProduct = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Creamos un objeto FormData.
            const formData = new FormData();

            // Agregamos los valores y propiedades.
            formData.append('name', name);
            formData.append('price', price);

            // Recorremos el array de fotos y las vamos agregando.
            for (let i = 0; i < photos.length; i++) {
                formData.append(`photo${i + 1}`, photos[i]);
            }

            // Obtenemos una respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/products`, {
                method: 'post',
                headers: {
                    Authorization: authToken,
                },
                body: formData,
            });

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'newProduct',
            });

            // Redirigimos a la página principal.
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'newProduct',
            });
        }
    };

    // Función que maneja el evento "onChange" del input file.
    const handleFiles = (e) => {
        // Creamos un array con las fotos seleccionadas.
        const files = Array.from(e.target.files);

        // Si la longitud del array es menor que 4 (solo podemos subir 3 fotos) las establecemos
        // con setPhotos.
        if (files.length < 4) {
            setPhotos(files);
        } else {
            // Mostramos un error al usuario.
            toast.error('Solo puedes seleccionar un máximo de tres fotos');

            // Limpiamos la selección de archivos.
            e.target.value = null;
        }
    };

    // Si aún no se han cargado los datos del usuario no retornamos nada.
    if (authUserLoading) {
        return <></>;
    }

    // Ahora que el fetch de usuarios ya ha terminado, si NO estamos logueados
    // redirigimos a la página de login.
    if (!authUser) {
        return <Navigate to='/login' />;
    }

    return (
        <main>
            <h2>Página de creación de productos</h2>

            <form onSubmit={handleAddProduct}>
                <label htmlFor='name'>Nombre:</label>
                <input
                    type='text'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor='price'>Price:</label>
                <input
                    type='number'
                    min='0'
                    max='9999999'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />

                <label htmlFor='photos'>Fotos:</label>
                <input
                    type='file'
                    id='photos'
                    onChange={handleFiles}
                    accept='image/jpeg, image/png'
                    multiple
                    required
                />

                <button>Crear producto</button>
            </form>
        </main>
    );
};

export default AddProductPage;
