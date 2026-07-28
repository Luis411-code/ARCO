// src/pages/dashboard/Sidebar.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'estadisticas', icon: '📊', label: 'Estadísticas' },
    { id: 'hero', icon: '🏠', label: 'Sección Hero' },
    { id: 'servicios-destacados', icon: '🎯', label: 'Servicios Destacados' },
    { id: 'servicios', icon: '📋', label: 'Servicios' },
    { id: 'testimonios', icon: '💬', label: 'Testimonios' },
    { id: 'nosotros', icon: 'ℹ️', label: 'Sobre Nosotros' },
    { id: 'mensajes', icon: '✉️', label: 'Mensajes' },
    { id: 'categorias', icon: '🏷️', label: 'Categorías' },
    { id: 'configuracion', icon: '⚙️', label: 'Configuración' },
  ];

  return (
    <motion.aside 
      initial={{ width: isOpen ? 280 : 80 }}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen flex-shrink-0 overflow-hidden shadow-lg z-20"
      style={{
        background: 'rgba(10, 22, 40, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="flex items-center justify-center h-20 border-b border-white/10 px-3">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="bg-white/95 rounded-xl p-1 shadow-lg shadow-primary/20 border border-white/30 flex-shrink-0">
            <img src="/logo.png" alt="ARCO" className="h-10 w-auto object-contain" />
          </div>
          {isOpen && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-white font-bold text-xl"
            >
              Admin
            </motion.span>
          )}
        </Link>
      </div>

      <nav className="mt-6 px-3">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            onClick={() => setActiveTab(item.id)}
            data-tab={item.id}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${activeTab === item.id 
                ? 'bg-secondary/20 text-secondary' 
                : 'text-white/60 hover:text-white hover:bg-white/5'
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item.label}
              </motion.span>
            )}
          </motion.button>
        ))}
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </motion.aside>
  );
};

export default Sidebar;