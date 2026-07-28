// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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
import { useAppContext } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import LoginAdmin from './pages/LoginAdmin';

const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-20">
      {children}
    </main>
    <Footer />
  </div>
);

function AppRoutes() {
  const { loadFromSupabase, setServicios } = useAppContext();
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;

    const cargarDatos = async () => {
      console.log('📥 Cargando datos desde Supabase...');
      const result = await loadFromSupabase();
      if (result.success) {
        console.log('✅ Datos cargados desde Supabase');
      } else {
        console.warn('⚠️ Usando localStorage');
        const saved = localStorage.getItem('arco_servicios');
        if (saved) setServicios(JSON.parse(saved));
      }
    };
    cargarDatos();
  }, [loadFromSupabase, setServicios]);

  return (
    <Routes>
      <Route path="/" element={
        <PublicLayout>
          <Home />
          <Ubicacion />
        </PublicLayout>
      } />
      <Route path="/servicios" element={
        <PublicLayout>
          <Servicios />
        </PublicLayout>
      } />
      <Route path="/contacto" element={
        <PublicLayout>
          <Contacto />
        </PublicLayout>
      } />
      <Route path="/about" element={
        <PublicLayout>
          <About />
        </PublicLayout>
      } />
      <Route path="/presupuesto" element={
        <PublicLayout>
          <Presupuesto />
        </PublicLayout>
      } />
      <Route path="/testimonio" element={
        <PublicLayout>
          <TestimonioForm />
        </PublicLayout>
      } />
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;