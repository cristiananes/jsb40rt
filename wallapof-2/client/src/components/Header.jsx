import { NavLink } from 'react-router-dom';

// Importamos una variable de entorno.
const { VITE_TITLE } = import.meta.env;

// Inicializamos el componente.
const Header = () => {
    return (
        <header>
            <h1>{VITE_TITLE}</h1>

            <nav>
                <ul>
                    <li>
                        <NavLink to='/'>Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to='/register'>Registro</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
