// Importamos los hooks y el componente Navigate.
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import useSingleProduct from '../hooks/useSingleProduct';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos la función toast.
import toast from 'react-hot-toast';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const ProductDetails = () => {
    // Importamos el token.
    const { authToken, authUser, authUserLoading } = useContext(AuthContext);

    // Importamos la función navigate.
    const navigate = useNavigate();

    // Obtenemos los path params necesarios.
    const { productId } = useParams();

    // Obtenemos el producto.
    const { product, updateProductState } = useSingleProduct(productId);

    // Declaramos una variable en el State para almacenar el valor de cada input.
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    // Variable que indicará si estamos editando el formulario.
    const [isEditing, setIsEditing] = useState(false);

    // Variable que indicará si el fetch está en curso o ha terminado.
    const [loading, setLoading] = useState(false);

    // Mediante este useEffect modificamos el nombre y el precio del producto cuando
    // haya terminado el fetch al servidor y tengamos la info del producto.
    useEffect(() => {
        // Si existe el producto, modificamos los datos del State.
        if (product) {
            setProductName(product.name);
            setProductPrice(product.price);
        }
    }, [product]);

    // Función que maneja el envío del formulario.
    const handleUpdateProduct = async (e) => {
        try {
            // Prevenimos el comportamiento por defecto.
            e.preventDefault();

            // Indicamos que vamos a empezar el fetch.
            setLoading(true);

            // Obtenemos una respuesta del servidor.
            const res = await fetch(
                `${VITE_API_URL}/api/products/${productId}`,
                {
                    method: 'put',
                    headers: {
                        Authorization: authToken,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: productName,
                        price: productPrice,
                    }),
                }
            );

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Obtenemos el nombre y el precio asignados por destructuring.
            const { name, price } = body.data.product;

            // Actualizamos la info del producto en el State.
            updateProductState(name, price);

            // Indicamos que la edición ha terminado.
            setIsEditing(false);

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'productDetails',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'productDetails',
            });
        } finally {
            // Indicamos que ha finalizado el fetch.
            setLoading(false);
        }
    };

    // Función que maneja el evento de click del botón de borrar producto.
    const handleDeleteProduct = async () => {
        try {
            // Si el usuario NO confirma que desea eliminar finalizamos la función.
            if (!confirm('¿Estás seguro de que deseas eliminar el producto?')) {
                return;
            }

            // Obtenemos la respuesta del servidor.
            const res = await fetch(
                `${VITE_API_URL}/api/products/${productId}`,
                {
                    method: 'delete',
                    headers: {
                        Authorization: authToken,
                    },
                }
            );

            // Obtenemos el body.
            const body = await res.json();

            // Si hay algún error lo lanzamos.
            if (body.status === 'error') {
                throw new Error(body.message);
            }

            // Redirigimos a la página pricipal.
            navigate('/');

            // Mostramos un mensaje satisfactorio al usuario.
            toast.success(body.message, {
                id: 'productDetails',
            });
        } catch (err) {
            toast.error(err.message, {
                id: 'productDetails',
            });
        }
    };

    // Si aún no se han cargado los datos del usuario no retornamos nada.
    if (authUserLoading) {
        return <></>;
    }

    // Ahora que el fetch de usuarios ya ha terminado, si NO estamos logueados
    // redirigimos a la página de login.
    if (!authUser) {
        return <Navigate to='/login' />;
    }

    return (
        product && (
            <main>
                <h2>Página del producto</h2>

                {
                    // Fotos del producto.
                    product.photos.map((photo) => {
                        return (
                            <img
                                src={`${VITE_API_URL}/${photo.name}`}
                                key={photo.id}
                                alt='Foto del producto'
                            />
                        );
                    })
                }

                <p>Autor: {authUser.email}</p>

                <form onSubmit={handleUpdateProduct}>
                    <label htmlFor='name'>Nombre:</label>
                    <input
                        type='text'
                        id='name'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        readOnly={!isEditing}
                        required
                    />

                    <label htmlFor='price'>Precio:</label>
                    <input
                        type='number'
                        id='price'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        min='0'
                        max='9999999'
                        readOnly={!isEditing}
                        required
                    />

                    {/* Si estamos haciendo un fetch o NO estamos editando deshabilitamos el botón. */}
                    <button disabled={loading || !isEditing}>
                        Actualizar producto
                    </button>
                </form>

                {/* Botón para habilitar o deshabilitar el modo edición. */}
                <button onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancelar edición' : 'Editar producto'}
                </button>

                {
                    // Botón para eliminar el producto. */
                    authUser?.id === product.userId && (
                        <button onClick={() => handleDeleteProduct()}>
                            Eliminar producto
                        </button>
                    )
                }
            </main>
        )
    );
};

export default ProductDetails;
