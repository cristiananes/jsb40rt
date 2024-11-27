// Importamos los hooks y el componente Navigate.
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Importamos los contextos.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const RegisterPage = () => {
    // Importamos los datos del usuario.
    const { authUser } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Creamos una variable en el State por cada input.
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');

    // Función que maneja el envío del formulario.
    const handleRegister = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Si las contraseñas no coinciden lanzamos un error.
            if (password !== repeatedPass) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Obtenemos la respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/users/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            // Traducimos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'register',
            });

            // Redirigimos a login.
            navigate('/login');
        } catch (err) {
            toast.error(err.message, {
                id: 'register',
            });
        }
    };

    // Si estamos logueados restringiremos el acceso a esta página redirigiendo a Home.
    if (authUser) {
        return <Navigate to='/' />;
    }

    return (
        <main>
            <h2>Página de registro</h2>

            <form onSubmit={handleRegister}>
                <label htmlFor='username'>Usuario:</label>
                <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor='email'>Email:</label>
                <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor='pass'>Contraseña:</label>
                <input
                    type='password'
                    id='pass'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label htmlFor='repeatedPass'>Repetir contraseña:</label>
                <input
                    type='password'
                    id='repeatedPass'
                    value={repeatedPass}
                    onChange={(e) => setRepeatedPass(e.target.value)}
                    required
                />

                <button>Registro</button>
            </form>
        </main>
    );
};

export default RegisterPage;
