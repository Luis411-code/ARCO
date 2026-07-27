import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import About from './components/About';
import Ubicacion from './components/Ubicacion';
import Presupuesto from './components/Presupuesto';
import ScrollToTop from './components/ScrollToTop';
import Dashboard from './Dashboard/Dashboard';
import LoginAdmin from './pages/LoginAdmin';
import TestimonioForm from './components/TestimonioForm';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rutas del Dashboard Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* Ruta pública para dejar testimonio */}
        <Route path="/testimonio" element={
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow pt-20">
              <TestimonioForm />
            </main>
            <Footer />
          </div>
        } />

        {/* Rutas públicas */}
        <Route path="/*" element={
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
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;