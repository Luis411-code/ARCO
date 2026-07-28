// src/components/Layout/Footer.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ===== LOGO CON FONDO BLANCO ===== */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-1.5 shadow-lg shadow-primary/20 border border-white/30">
                <img src="/logo.png" alt="ARCO" className="h-10 w-auto object-cover" />
              </div>
              <h3 className="text-xl font-bold text-secondary">ARCO</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Publicidad y Comunicación Gráfica. Transformamos ideas en 
              soluciones visuales de alto impacto.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h4 className="font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-secondary transition-colors">Inicio</Link></li>
              <li><Link to="/servicios" className="hover:text-secondary transition-colors">Servicios</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition-colors">Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-secondary transition-colors">Contacto</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h4 className="font-semibold text-white mb-4">Nuestros Servicios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/servicios" className="hover:text-secondary transition-colors">Cartelería</Link></li>
              <li><Link to="/servicios" className="hover:text-secondary transition-colors">Señalética</Link></li>
              <li><Link to="/servicios" className="hover:text-secondary transition-colors">Impresión</Link></li>
              <li><Link to="/servicios" className="hover:text-secondary transition-colors">Diseño Gráfico</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h4 className="font-semibold text-white mb-4">Contáctanos</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-secondary">📍</span>
                <div>
                  <p className="text-white/70 text-xs">Dirección</p>
                  <p className="hover:text-secondary transition-colors">Calle Rastro No.117</p>
                  <p className="hover:text-secondary transition-colors">esq. Luz Caballero, Holguín</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary">🕐</span>
                <div>
                  <p className="text-white/70 text-xs">Horario</p>
                  <p className="hover:text-secondary transition-colors">Lun - Vie: 8:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary">📞</span>
                <div>
                  <p className="text-white/70 text-xs">Teléfonos</p>
                  <p className="hover:text-secondary transition-colors">54330343</p>
                  <p className="hover:text-secondary transition-colors">53785749</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} ARCO - Publicidad y Comunicación Gráfica. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;