// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import About from './components/About';
import Ubicacion from './components/Ubicacion';
import Presupuesto from './components/Presupuesto';
import TestimonioForm from './components/TestimonioForm';
import ScrollToTop from './components/ScrollToTop';

// Lazy load para el dashboard
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LoginAdmin = lazy(() => import('./pages/LoginAdmin'));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={
              <>
                <Home />
                <Ubicacion />
              </>
            } />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/about" element={<About />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/testimonio" element={<TestimonioForm />} />
            
            {/* Rutas de admin con lazy loading */}
            <Route path="/admin/login" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
                <LoginAdmin />
              </Suspense>
            } />
            <Route path="/dashboard" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="/dashboard/*" element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
                <Dashboard />
              </Suspense>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;