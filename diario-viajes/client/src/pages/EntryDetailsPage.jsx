// Importamos los hooks.
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useEntry from '../hooks/useEntry';

// Importamos el contexto.
import { AuthContext } from '../contexts/AuthContext';

// Importamos moment para manipular fechar.
import moment from 'moment';

// Importamos los componentes.
import EntryPhotos from '../components/EntryPhotos';
import DeleteEntryButton from '../components/DeleteEntryButton';

// Importamos los formularios.
import AddPhotoForm from '../forms/AddPhotoForm';
import AddVoteForm from '../forms/AddVoteForm';

// Inicializamos el componente.
const EntryDetailsPage = () => {
    // Obtenemos los datos del usuario.
    const { authUser } = useContext(AuthContext);

    // Obtenemos el ID de la entrada.
    const { entryId } = useParams();

    // Importamos los datos de la entrada.
    const { entry, updateEntryVotes, updateEntryPhotos, deleteEntryPhotos } =
        useEntry(entryId);

    // Declaramos una variable para indicar cuando estamos haciendo fetch al servidor y poder
    // deshabilitar así los botones durante ese proceso.
    const [loading, setLoading] = useState(false);

    return (
        entry && (
            <main>
                <h2>Título: {entry.title}</h2>

                {/* Establecemos las fotos. */}
                <EntryPhotos
                    authUser={authUser}
                    entry={entry}
                    deleteEntryPhotos={deleteEntryPhotos}
                    loading={loading}
                    setLoading={setLoading}
                />

                {
                    // Formulario de agregar foto. Solo será visible si hay menos de 3 fotos y si además
                    // somos los dueños de la entrada. Dado que tanto usuarios logueados como no logeados
                    // pueden acceder a los detalles de la página, podría suceder que "user" sea un valor
                    // null (si no estamos logueados). Por tanto para evitar que JavaScript lance un error
                    // si "user" es null utilizamos la interrogación.
                    entry.photos.length < 3 &&
                        entry.userId === authUser?.id && (
                            <AddPhotoForm
                                entryId={entryId}
                                updateEntryPhotos={updateEntryPhotos}
                                loading={loading}
                                setLoading={setLoading}
                            />
                        )
                }

                <ul>
                    <li>Lugar: {entry.place}</li>
                    <li>Descripción: {entry.description}</li>
                    <li>Media de votos: {entry.votes}</li>
                    <li>Autor: {entry.author}</li>
                    <li>
                        Creado el{' '}
                        {moment(entry.createdAt).format(
                            'DD/MM/YYYY [a las] HH:mm'
                        )}
                    </li>
                </ul>

                {/* Formulario de votar. */}
                <AddVoteForm
                    entryId={entryId}
                    updateEntryVotes={updateEntryVotes}
                    loading={loading}
                    setLoading={setLoading}
                />

                {
                    // Si estamos logueados y somos los dueños podemos borrar la entrada.
                    authUser && authUser.id === entry.userId && (
                        <DeleteEntryButton
                            entryId={entryId}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    )
                }
            </main>
        )
    );
};

export default EntryDetailsPage;
