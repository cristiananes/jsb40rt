// Importamos los hooks.
import useProducts from '../hooks/useProducts';

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
                            {product.name}: {product.price}€
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default HomePage;
