// Importamos los hooks.
import { useContext, useState } from 'react';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const UserProfilePage = () => {
    // Importamos el token.
    const { authToken, authUser, authUpdateAvatarState, authUserLoading } =
        useContext(AuthContext);

    // Creamos una variable en el State por cada input.
    const [avatar, setAvatar] = useState('');

    // Función que maneja el envío del formulario.
    const handleUpdateAvatar = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Creamos un objeto FormData.
            const formData = new FormData();

            // Agregamos los valores y propiedades.
            formData.append('avatar', avatar);

            // Obtenemos una respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/users/avatar`, {
                method: 'put',
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

            // Actualizamos la info del avatar en el State del usuario.
            authUpdateAvatarState(body.data.avatar);

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'userProfile',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'userProfile',
            });
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
            <h2>Página de perfil</h2>

            <div>
                {authUser.avatar ? (
                    <img
                        src={`${VITE_API_URL}/${authUser.avatar}`}
                        alt={`Foto de perfil de ${authUser.email}`}
                    />
                ) : (
                    <p>El usuario no tiene avatar.</p>
                )}

                <p>Email: {authUser.email}</p>
            </div>

            <form onSubmit={handleUpdateAvatar}>
                <label htmlFor='avatar'>Actualizar avatar:</label>
                <input
                    type='file'
                    id='avatar'
                    onChange={(e) => setAvatar(e.target.files[0])}
                    accept='image/jpeg, image/png'
                    required
                />

                <button>Actualizar avatar</button>
            </form>
        </main>
    );
};

export default UserProfilePage;
