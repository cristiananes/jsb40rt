// Importamos una variable de entorno.
const { VITE_TITLE } = import.meta.env;

// Inicializamos el componente.
const Footer = () => {
    return (
        <footer>
            <p>&copy; {VITE_TITLE} 2024</p>
        </footer>
    );
};

export default Footer;
