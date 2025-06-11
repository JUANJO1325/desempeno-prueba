// src/main.jsx (actualizado)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext'; // Importar
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Envolver la app */}
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);