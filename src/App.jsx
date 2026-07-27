// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
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

// Lazy load para el dashboard
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LoginAdmin = lazy(() => import('./pages/LoginAdmin'));

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

// ===== LAYOUT DE ADMIN =====
const AdminLayout = ({ children }) => (
  <div className="min-h-screen">
    {children}
  </div>
);

function AppContent() {
  const { loadFromMongoDB, setServicios, setConfiguracion } = useAppContext();

  // ===== CARGAR DATOS DESDE MONGODB AL INICIAR LA APP =====
  useEffect(() => {
    const cargarDatos = async () => {
      console.log('📥 Cargando datos desde MongoDB...');
      const result = await loadFromMongoDB();
      
      if (result.success && result.results) {
        console.log('✅ Datos cargados desde MongoDB:', result.results);
        if (result.results.servicios && result.results.servicios.length > 0) {
          setServicios(result.results.servicios);
        }
      } else {
        console.warn('⚠️ No se pudieron cargar datos desde MongoDB, usando localStorage');
        const savedServicios = localStorage.getItem('arco_servicios');
        if (savedServicios) {
          setServicios(JSON.parse(savedServicios));
        }
      }
    };

    cargarDatos();
  }, []);

  return (
    <Routes>
      {/* ===== RUTAS PÚBLICAS ===== */}
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

      {/* ===== RUTAS DE ADMIN ===== */}
      <Route path="/admin/login" element={
        <AdminLayout>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-primary">
              <div className="text-white text-xl">Cargando...</div>
            </div>
          }>
            <LoginAdmin />
          </Suspense>
        </AdminLayout>
      } />
      
      <Route path="/dashboard/*" element={
        <AdminLayout>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-primary text-xl">Cargando panel...</div>
            </div>
          }>
            <Dashboard />
          </Suspense>
        </AdminLayout>
      } />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;