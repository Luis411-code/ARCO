// src/App.jsx
import { BrowserRouter, Routes, Route, useEffect } from 'react-router-dom';
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

// ===== LAYOUT PÚBLICO =====
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow pt-20">
      {children}
    </main>
    <Footer />
  </div>
);

function App() {
  const { loadFromSupabase, setServicios } = useAppContext();

  useEffect(() => {
    const cargarDatos = async () => {
      console.log('📥 Cargando datos desde Supabase...');
      const result = await loadFromSupabase();
      
      if (result.success) {
        console.log('✅ Datos cargados desde Supabase');
      } else {
        console.warn('⚠️ No se pudieron cargar datos desde Supabase, usando localStorage');
        const savedServicios = localStorage.getItem('arco_servicios');
        if (savedServicios) {
          setServicios(JSON.parse(savedServicios));
        }
      }
    };

    cargarDatos();
  }, [loadFromSupabase, setServicios]);

  return (
    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  );
}

export default App;