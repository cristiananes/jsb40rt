// Importamos los hooks.
import { useContext } from 'react';
import useUser from '../hooks/useUser';

// Importamos los componentes.
import { NavLink } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos una variable de entorno.
const { VITE_TITLE } = import.meta.env;

// Inicializamos el componente.
const Header = () => {
    // Importamos la función de logout.
    const { authLogout } = useContext(AuthContext);

    // Importamos los datos del usuario.
    const { user, setUser } = useUser();

    return (
        <header>
            <h1>
                <NavLink to='/'>{VITE_TITLE}</NavLink>
            </h1>

            <nav>
                <ul>
                    {
                        /* Si existe usuario (si estamos logueados) mostramos una serie de opciones de 
                           navegación. Si no lo estamos, mostramos otras. */
                        user ? (
                            <li>
                                <button
                                    onClick={() => {
                                        authLogout();
                                        setUser(null);
                                    }}>
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink to='/login'>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/register'>Registro</NavLink>
                                </li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
