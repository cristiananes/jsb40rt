// Importamos los hooks.
import useEntries from '../hooks/useEntries';

// Importamos los componentes.
import { NavLink } from 'react-router-dom';

// Importamos moment para manipular fechar.
import moment from 'moment';

// Importamos la URL del servidor.
const { VITE_API_URL } = import.meta.env;

// Inicializamos el componente.
const HomePage = () => {
    // Importamos las entradas.
    const { entries, author, place, setAuthor, setPlace } = useEntries();

    return (
        <main>
            <h2>Página de Home</h2>

            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='author'>Autor:</label>
                <input
                    type='search'
                    id='author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <label htmlFor='place'>Lugar:</label>
                <input
                    type='search'
                    id='place'
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
            </form>

            <ul>
                {entries.map((entry) => {
                    return (
                        <li key={entry.id}>
                            <NavLink to={`/entries/${entry.id}`}>
                                <header>
                                    <h3>{entry.title}</h3>
                                    <img
                                        src={`${VITE_API_URL}/${entry.photos[0].name}`}
                                        alt={`Foto de la entrada de ${entry.author}`}
                                    />
                                </header>
                                <div>
                                    <ul>
                                        <li>Lugar: {entry.place}</li>
                                        <li>Media de votos: {entry.votes}</li>
                                    </ul>
                                </div>
                                <footer>
                                    <ul>
                                        <li>Autor: {entry.author}</li>
                                        <li>
                                            Creado el{' '}
                                            {moment(entry.createdAt).format(
                                                'DD/MM/YYYY [a las] HH:mm'
                                            )}
                                        </li>
                                    </ul>
                                </footer>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
};

export default HomePage;
