// Importamos una variable de entorno.
const { VITE_TITLE } = import.meta.env;

// Inicializamos el componente.
const Header = () => {
    return (
        <header>
            <h1>{VITE_TITLE}</h1>
        </header>
    );
};

export default Header;
