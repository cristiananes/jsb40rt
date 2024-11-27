import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Importamos los componentes.
import App from './App.jsx';

// Este es el componente que activa las rutas.
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
