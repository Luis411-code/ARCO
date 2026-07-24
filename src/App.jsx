import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home';
import Servicios from './components/Servicios';
import Contacto from './components/Contacto';
import About from './components/About';
import Ubicacion from './components/Ubicacion';
import Presupuesto from './components/Presupuesto';
import ScrollToTop from './components/ScrollToTop'; // 👈 IMPORTAR

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* 👈 AQUÍ - Siempre presente */}
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
    </BrowserRouter>
  );
}

export default App;