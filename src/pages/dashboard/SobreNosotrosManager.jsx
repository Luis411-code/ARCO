// src/pages/dashboard/SobreNosotrosManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const SobreNosotrosManager = () => {
  const { sobreNosotros, actualizarSobreNosotros } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(sobreNosotros);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleValorChange = (index, field, value) => {
    const newValores = [...formData.valores];
    newValores[index][field] = value;
    setFormData({ ...formData, valores: newValores });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actualizarSobreNosotros(formData);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">ℹ️ Sobre Nosotros</h2>

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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Misión</label>
            <textarea
              name="mision"
              value={formData.mision}
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Historia</label>
            <textarea
              name="historia"
              value={formData.historia}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>

          <h4 className="font-semibold text-primary mt-4">Valores</h4>
          {formData.valores.map((valor, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icono</label>
                  <input
                    type="text"
                    value={valor.icono}
                    onChange={(e) => handleValorChange(index, 'icono', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={valor.titulo}
                    onChange={(e) => handleValorChange(index, 'titulo', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <input
                    type="text"
                    value={valor.descripcion}
                    onChange={(e) => handleValorChange(index, 'descripcion', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
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

export default SobreNosotrosManager;