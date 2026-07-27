// src/components/Layout/Footer.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Empresa */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="overflow-hidden rounded-full shadow-lg shadow-secondary/20 border-2 border-secondary/30">
                <img src="/logo.png" alt="ARCO" className="h-10 w-auto object-cover" />
              </div>
              <h3 className="text-xl font-bold text-secondary">ARCO</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Publicidad y Comunicación Gráfica. Transformamos ideas en 
              soluciones visuales de alto impacto.
            </p>
            
            <div className="flex space-x-4 mt-4">
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#E4405F] transition-colors hover:scale-110 transform duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#1877F2] transition-colors hover:scale-110 transform duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a 
                href="#" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#0088CC] transition-colors hover:scale-110 transform duration-300"
                aria-label="Telegram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
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

          {/* Servicios */}
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

          {/* Contacto */}
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