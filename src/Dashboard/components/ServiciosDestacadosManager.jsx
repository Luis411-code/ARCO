import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const ServiciosDestacadosManager = () => {
  const { serviciosDestacados, updateServiciosDestacados } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState(serviciosDestacados);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateServiciosDestacados(items);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">🎯 Servicios Destacados (Home)</h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200"
        >
          ✅ Cambios guardados exitosamente
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {items.map((item, index) => (
            <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-primary mb-3">Servicio Destacado #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icono (emoji)</label>
                  <input
                    type="text"
                    value={item.icono}
                    onChange={(e) => handleChange(index, 'icono', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={item.titulo}
                    onChange={(e) => handleChange(index, 'titulo', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={item.descripcion}
                  onChange={(e) => handleChange(index, 'descripcion', e.target.value)}
                  rows="2"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiciosDestacadosManager;