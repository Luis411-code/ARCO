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
      <Routes>
        {/* ============================================================
            RUTAS PÚBLICAS - CON HEADER Y FOOTER
            ============================================================ */}
        <Route path="/" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <Home />
              <Ubicacion />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/servicios" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <Servicios />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/contacto" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <Contacto />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/about" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <About />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/presupuesto" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <Presupuesto />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/testimonio" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <TestimonioForm />
            </main>
            <Footer />
          </div>
        } />

        {/* ============================================================
            RUTAS DE ADMIN - SIN HEADER Y SIN FOOTER
            ============================================================ */}
        <Route path="/admin/login" element={
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-primary">
              <div className="text-white text-xl">Cargando...</div>
            </div>
          }>
            <LoginAdmin />
          </Suspense>
        } />
        
        <Route path="/dashboard/*" element={
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-primary text-xl">Cargando panel...</div>
            </div>
          }>
            <Dashboard />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;