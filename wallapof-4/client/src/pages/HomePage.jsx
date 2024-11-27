// Importamos los hooks.
import useProducts from '../hooks/useProducts';

// Importamos los componentes.
import { NavLink } from 'react-router-dom';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const HomePage = () => {
    // Obtenemos los productos.
    const { products } = useProducts();

    return (
        <main>
            <h2>Listado de productos</h2>

            <ul>
                {products.map((product) => {
                    return (
                        <li key={product.id}>
                            <NavLink to={`/products/${product.id}`}>
                                <div>
                                    <img
                                        src={`${VITE_API_URL}/${product.photos[0].name}`}
                                        alt='Foto del producto'
                                    />
                                </div>
                                <div>
                                    {product.name}: {product.price}€
                                </div>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default HomePage;
