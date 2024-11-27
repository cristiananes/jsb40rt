// Importamos los hooks.
import { useContext } from 'react';

// Importamos los componentes.
import { NavLink } from 'react-router-dom';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos una variable de entorno.
const { VITE_TITLE, VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const Header = () => {
    // Importamos los datos del usuario y la función de logout.
    const { authUser, authLogoutState } = useContext(AuthContext);

    return (
        <header>
            <h1>
                <NavLink to='/'>{VITE_TITLE}</NavLink>
            </h1>

            <div>
                {
                    // Si existe el avatar del usuario lo mostramos. Dado que "authUser" puede ser
                    // undefined, para evitar que salte un error, indicamos mediante el símbolo de
                    // interrogación (antes de la propiedad) que "authUser" puede ser un valor falso.
                    authUser?.avatar ? (
                        <img
                            src={`${VITE_API_URL}/${authUser.avatar}`}
                            alt={`Foto de perfil de ${authUser.email}`}
                        />
                    ) : (
                        <p>El usuario no tiene avatar.</p>
                    )
                }
            </div>

            <nav>
                <ul>
                    {
                        /* Si existe usuario (si estamos logueados) mostramos una serie de opciones de 
                           navegación. Si no lo estamos, mostramos otras. */
                        authUser ? (
                            <>
                                <li>
                                    <NavLink to='/products/new'>
                                        Crear producto
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/users/profile'>
                                        Perfil
                                    </NavLink>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            authLogoutState();
                                        }}>
                                        Logout
                                    </button>
                                </li>
                            </>
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
