// src/pages/dashboard/Statistics.jsx
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const Statistics = () => {
  const { servicios, testimonios, mensajes } = useAppContext();

  const totalServicios = servicios.length;
  const totalTestimonios = testimonios.length;
  const totalMensajes = mensajes.length;

  const cards = [
    { 
      id: 'servicios', 
      title: 'Servicios', 
      value: totalServicios, 
      icon: '📋', 
      color: 'from-blue-500 to-blue-700',
      description: 'Servicios disponibles en el catálogo'
    },
    { 
      id: 'testimonios', 
      title: 'Testimonios', 
      value: totalTestimonios, 
      icon: '💬', 
      color: 'from-purple-500 to-purple-700',
      description: 'Opiniones de clientes'
    },
    { 
      id: 'mensajes', 
      title: 'Mensajes', 
      value: totalMensajes, 
      icon: '✉️', 
      color: 'from-orange-500 to-orange-700',
      description: 'Mensajes recibidos'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">📊 Panel de Control</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center text-2xl`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-primary">{card.value}</p>
                <p className="text-xs text-gray-400 mt-1">{card.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-primary mb-4">⚡ Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => document.querySelector('[data-tab="servicios"]')?.click()}
            className="bg-primary/10 hover:bg-primary/20 text-primary p-4 rounded-xl text-left transition-all"
          >
            <span className="text-2xl block">➕</span>
            <span className="font-semibold">Agregar nuevo servicio</span>
            <p className="text-sm text-gray-500">Añade un nuevo servicio al catálogo</p>
          </button>
          <button 
            onClick={() => document.querySelector('[data-tab="testimonios"]')?.click()}
            className="bg-secondary/10 hover:bg-secondary/20 text-secondary p-4 rounded-xl text-left transition-all"
          >
            <span className="text-2xl block">💬</span>
            <span className="font-semibold">Revisar testimonio</span>
            <p className="text-sm text-gray-500">Comprueba las opiniones de nuestros clientes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;