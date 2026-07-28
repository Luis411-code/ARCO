// src/pages/dashboard/ServiciosDestacadosManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const ServiciosDestacadosManager = () => {
  const { serviciosDestacados, actualizarServiciosDestacados, loadFromSupabase } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState(serviciosDestacados);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    icono: '📋',
    titulo: '',
    descripcion: '',
    link: '/servicios'
  });

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleDelete = (index) => {
    if (confirm('¿Estás seguro de eliminar este servicio destacado?')) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  // ===== AGREGAR NUEVO =====
  const handleAdd = () => {
    setEditIndex(null);
    setFormData({ icono: '📋', titulo: '', descripcion: '', link: '/servicios' });
    setShowModal(true);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({ ...items[index] });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveItem = () => {
    if (!formData.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }

    if (editIndex !== null) {
      // Editar
      const newItems = [...items];
      newItems[editIndex] = { ...formData };
      setItems(newItems);
    } else {
      // Agregar nuevo
      const newItem = {
        ...formData,
        id: Date.now().toString()
      };
      setItems([...items, newItem]);
    }

    setShowModal(false);
    setFormData({ icono: '📋', titulo: '', descripcion: '', link: '/servicios' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actualizarServiciosDestacados(items);
    if (result.success) {
      await loadFromSupabase();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">🎯 Servicios Destacados (Home)</h2>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          + Agregar Servicio
        </button>
      </div>

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
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No hay servicios destacados. ¡Agrega uno!</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={item.id || index} className="p-4 border border-gray-200 rounded-lg relative group">
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>

                <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <span className="text-2xl">{item.icono || '📋'}</span>
                  {item.titulo || 'Sin título'}
                </h4>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                  <input
                    type="text"
                    value={item.link}
                    onChange={(e) => handleChange(index, 'link', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>
            ))
          )}

          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Guardar Cambios
          </button>
        </form>
      </div>

      {/* ===== MODAL PARA AGREGAR/EDITAR ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              {editIndex !== null ? '✏️ Editar' : '➕ Agregar'} Servicio Destacado
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icono (emoji)</label>
                <input
                  type="text"
                  name="icono"
                  value={formData.icono}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Ej: 💡"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Nombre del servicio"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleFormChange}
                  rows="2"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Breve descripción"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="/servicios"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveItem}
                className="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {editIndex !== null ? 'Actualizar' : 'Agregar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiciosDestacadosManager;