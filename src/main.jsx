import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './context/AppContext';

const root = document.getElementById('root');

const preloader = document.getElementById('preloader');
if (preloader && preloader.classList.contains('hidden')) {
  root.classList.add('visible');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);