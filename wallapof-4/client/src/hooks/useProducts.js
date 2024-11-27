// Importamos los hooks.
import { useEffect, useState } from 'react';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useProducts = () => {
    // Declaramos en el State un array de productos vacío.
    const [products, setProducts] = useState([]);

    // Con la ayuda de "useEffect" hacemos un fetch al servidor para buscar los productos
    // cuando se monta el componente.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Obtenemos la respuesta.
                const res = await fetch(`${VITE_API_URL}/api/products`);

                // Obtenemos el body.
                const body = await res.json();

                // Establecemos los productos en el State.
                setProducts(body.data.products);
            } catch (err) {
                alert(err.message);
            }
        };

        // Llamamos a la función anterior.
        fetchProducts();
    }, []);

    // Retornamos las variables y funciones que nos interesan.
    return { products };
};

export default useProducts;
