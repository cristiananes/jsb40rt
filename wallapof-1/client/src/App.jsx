// Importamos los componentes.
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importamos las páginas.
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Aplicamos los estilos.
import './index.css';

// Inicializamos el componente principal.
const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
