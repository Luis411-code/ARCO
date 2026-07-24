import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root');

// Si el preloader ya está oculto, asegurar que root sea visible
const preloader = document.getElementById('preloader');
if (preloader && preloader.classList.contains('hidden')) {
  root.classList.add('visible');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);