// Importamos los hooks.
import { useEffect, useState } from 'react';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el hook.
const useSingleProduct = (productId) => {
    // Declaramos en el State la variable que almacenará el producto.
    const [product, setProduct] = useState(null);

    // Con la ayuda de "useEffect" hacemos un fetch al servidor para buscar el producto.
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Obtenemos la respuesta.
                const res = await fetch(
                    `${VITE_API_URL}/api/products/${productId}`
                );

                // Obtenemos el body.
                const body = await res.json();

                // Establecemos los productos en el State.
                setProduct(body.data.product);
            } catch (err) {
                alert(err.message);
            }
        };

        // Llamamos a la función anterior.
        fetchProduct();
    }, [productId]);

    // Función que actualiza el nombre y precio del producto en el State.
    const updateProductState = (name, price) => {
        setProduct({
            ...product,
            name: name || product.name,
            price: price || product.price,
        });
    };

    // Retornamos las variables y funciones que nos interesan.
    return { product, updateProductState };
};

export default useSingleProduct;
