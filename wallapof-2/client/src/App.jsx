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
import NotFoundPage from './pages/NotFoundPage';

// Aplicamos los estilos.
import './index.css';

// Inicializamos el componente principal.
const App = () => {
    return (
        <>
            <Header />

            {/* Componente que se encarga de mostrar los mensajes lanzados con la función toast. */}
            <Toaster
                position='top-center'
                toastOptions={{
                    duration: 5000,
                }}
            />

            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route
                    path='/users/activate/:registrationCode'
                    element={<ActivateUserPage />}
                />
                <Route path='/login' element={<LoginPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
