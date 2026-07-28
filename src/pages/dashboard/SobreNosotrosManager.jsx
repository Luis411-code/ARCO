// src/pages/dashboard/SobreNosotrosManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const SobreNosotrosManager = () => {
  const { sobreNosotros, actualizarSobreNosotros, loadFromSupabase } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(sobreNosotros);
  const [showValorModal, setShowValorModal] = useState(false);
  const [editValorIndex, setEditValorIndex] = useState(null);
  const [valorForm, setValorForm] = useState({
    icono: '🎯',
    titulo: '',
    descripcion: ''
  });

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

  // ===== AGREGAR VALOR =====
  const handleAddValor = () => {
    setEditValorIndex(null);
    setValorForm({ icono: '🎯', titulo: '', descripcion: '' });
    setShowValorModal(true);
  };

  const handleEditValor = (index) => {
    setEditValorIndex(index);
    setValorForm({ ...formData.valores[index] });
    setShowValorModal(true);
  };

  const handleDeleteValor = (index) => {
    if (confirm('¿Estás seguro de eliminar este valor?')) {
      const newValores = formData.valores.filter((_, i) => i !== index);
      setFormData({ ...formData, valores: newValores });
    }
  };

  const handleValorFormChange = (e) => {
    setValorForm({
      ...valorForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveValor = () => {
    if (!valorForm.titulo.trim()) {
      alert('El título del valor es obligatorio');
      return;
    }

    if (editValorIndex !== null) {
      // Editar
      const newValores = [...formData.valores];
      newValores[editValorIndex] = { ...valorForm };
      setFormData({ ...formData, valores: newValores });
    } else {
      // Agregar nuevo
      setFormData({
        ...formData,
        valores: [...formData.valores, { ...valorForm }]
      });
    }

    setShowValorModal(false);
    setValorForm({ icono: '🎯', titulo: '', descripcion: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actualizarSobreNosotros(formData);
    if (result.success) {
      await loadFromSupabase();
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
          {/* Datos principales */}
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

          {/* ===== VALORES ===== */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-primary">Valores</h4>
              <button
                type="button"
                onClick={handleAddValor}
                className="text-sm bg-secondary text-primary px-3 py-1.5 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                + Agregar Valor
              </button>
            </div>

            {formData.valores.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No hay valores agregados</p>
            ) : (
              <div className="space-y-3">
                {formData.valores.map((valor, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg relative group">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditValor(index)}
                        className="text-blue-500 hover:text-blue-700 transition-colors text-sm"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteValor(index)}
                        className="text-red-500 hover:text-red-700 transition-colors text-sm"
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">Icono</label>
                        <input
                          type="text"
                          value={valor.icono}
                          onChange={(e) => handleValorChange(index, 'icono', e.target.value)}
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">Título</label>
                        <input
                          type="text"
                          value={valor.titulo}
                          onChange={(e) => handleValorChange(index, 'titulo', e.target.value)}
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">Descripción</label>
                        <input
                          type="text"
                          value={valor.descripcion}
                          onChange={(e) => handleValorChange(index, 'descripcion', e.target.value)}
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Guardar Cambios
          </button>
        </form>
      </div>

      {/* ===== MODAL PARA AGREGAR/EDITAR VALOR ===== */}
      {showValorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              {editValorIndex !== null ? '✏️ Editar' : '➕ Agregar'} Valor
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icono (emoji)</label>
                <input
                  type="text"
                  name="icono"
                  value={valorForm.icono}
                  onChange={handleValorFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="🎯"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={valorForm.titulo}
                  onChange={handleValorFormChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Ej: Calidad Garantizada"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={valorForm.descripcion}
                  onChange={handleValorFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Breve descripción del valor"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowValorModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveValor}
                className="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {editValorIndex !== null ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SobreNosotrosManager;