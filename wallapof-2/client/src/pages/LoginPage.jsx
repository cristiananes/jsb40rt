// Importamos los hooks.
import { useState } from 'react';

// Importamos la función toast.
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const LoginPage = () => {
    // Importamos la función navigate.
    const navigate = useNavigate();

    // Creamos una variable en el State por cada input.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Función que maneja el envío del formulario.
    const handleLogin = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto del formulario.
            e.preventDefault();

            // Obtenemos la respuesta del servidor.
            const res = await fetch(`${VITE_API_URL}/api/users/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
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
            toast.success(body.data.token, {
                id: 'login',
            });

            // Redirigimos a la página principal.
            navigate('/');
        } catch (err) {
            toast.error(err.message, {
                id: 'login',
            });
        }
    };

    return (
        <main>
            <h2>Página de login</h2>

            <form onSubmit={handleLogin}>
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

                <button>Login</button>
            </form>
        </main>
    );
};

export default LoginPage;
