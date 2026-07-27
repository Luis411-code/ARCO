import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const TestimoniosManager = () => {
  const { 
    testimonios, 
    deleteTestimonio,
    testimoniosPendientes,
    aprobarTestimonio,
    rechazarTestimonio
  } = useAppContext();

  const [activeTab, setActiveTab] = useState('pendientes');

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">💬 Gestión de Testimonios</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('pendientes')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'pendientes'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          ⏳ Pendientes ({testimoniosPendientes.length})
        </button>
        <button
          onClick={() => setActiveTab('aprobados')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            activeTab === 'aprobados'
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          ✅ Aprobados ({testimonios.length})
        </button>
      </div>

      {activeTab === 'pendientes' && (
        <>
          {testimoniosPendientes.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-700">No hay testimonios pendientes</h3>
              <p className="text-gray-400">Los testimonios de clientes aparecerán aquí para su aprobación.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimoniosPendientes.map((testimonio) => (
                <motion.div
                  key={testimonio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md border-l-4 border-l-yellow-500 p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={testimonio.foto} 
                          alt={testimonio.nombre} 
                          className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-primary">{testimonio.nombre}</h4>
                          <p className="text-sm text-gray-500">{testimonio.empresa}</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full ml-2">
                          ⏳ Pendiente
                        </span>
                      </div>
                      <div className="text-yellow-400 text-sm mb-2">
                        {"⭐".repeat(testimonio.calificacion)}
                      </div>
                      <p className="text-gray-700 text-sm">"{testimonio.reseña}"</p>
                      <p className="text-xs text-gray-400 mt-2">📅 {formatearFecha(testimonio.fecha)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => aprobarTestimonio(testimonio.id)}
                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      >
                        ✅ Aprobar
                      </button>
                      <button
                        onClick={() => rechazarTestimonio(testimonio.id)}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      >
                        ❌ Rechazar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'aprobados' && (
        <>
          {testimonios.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-700">No hay testimonios aprobados</h3>
              <p className="text-gray-400">Aprueba testimonios pendientes para que aparezcan aquí.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonios.map((testimonio) => (
                <motion.div
                  key={testimonio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={testimonio.foto} 
                      alt={testimonio.nombre} 
                      className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-primary">{testimonio.nombre}</h4>
                      <p className="text-sm text-gray-500">{testimonio.empresa}</p>
                    </div>
                  </div>
                  <div className="text-yellow-400 text-sm mb-2">
                    {"⭐".repeat(testimonio.calificacion)}
                  </div>
                  <p className="text-gray-700 text-sm">"{testimonio.reseña}"</p>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => deleteTestimonio(testimonio.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestimoniosManager;