import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importamos los componentes.
import App from './App.jsx';

// Este es el componente que activa las rutas.
import { BrowserRouter } from 'react-router-dom';

// Importamos el provider del contexto donde almacenamos el token.
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
);
