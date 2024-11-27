// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos las páginas.
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ActivateUserPage from './pages/ActivateUserPage';
import LoginPage from './pages/LoginPage';
import NewEntryPage from './pages/NewEntryPage';
import EntryDetailsPage from './pages/EntryDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Aplicamos los estilos.
import './index.css';

// Inicializamos el componente principal.
const App = () => {
    return (
        <>
            <Header />

            {/* Este componente se encargará de renderizar los mensajes que queramos mostrar
                con react-hot-toast. */}
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 5000,
                }}
            />

            {/* Todas las rutas han de definirse dentro del compontente <Routes>. */}
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                    path='/users/validate/:registrationCode'
                    element={<ActivateUserPage />}
                />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/entries/create' element={<NewEntryPage />} />
                <Route
                    path='/entries/:entryId'
                    element={<EntryDetailsPage />}
                />
                <Route path='/users/profile' element={<UserProfilePage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
