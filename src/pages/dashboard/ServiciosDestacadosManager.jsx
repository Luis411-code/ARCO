// src/pages/dashboard/ServiciosDestacadosManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const ServiciosDestacadosManager = () => {
  const { serviciosDestacados, actualizarServiciosDestacados, loadFromSupabase, servicios } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState(serviciosDestacados);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedServicioId, setSelectedServicioId] = useState('');

  // ===== ELIMINAR DESTACADO =====
  const handleDelete = (index) => {
    if (confirm('¿Estás seguro de eliminar este servicio destacado?')) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  // ===== ABRIR MODAL PARA AGREGAR =====
  const handleAdd = () => {
    setEditIndex(null);
    setSelectedServicioId('');
    setShowModal(true);
  };

  // ===== ABRIR MODAL PARA EDITAR =====
  const handleEdit = (index) => {
    setEditIndex(index);
    setSelectedServicioId(items[index].servicioId || '');
    setShowModal(true);
  };

  // ===== GUARDAR DESTACADO =====
  const handleSave = () => {
    if (!selectedServicioId) {
      alert('Por favor, selecciona un servicio');
      return;
    }

    const servicio = servicios.find(s => s.id === selectedServicioId);
    if (!servicio) {
      alert('Servicio no encontrado');
      return;
    }

    const newItem = {
      servicioId: servicio.id,     // 👈 Para el frontend
      servicio_id: servicio.id,    // 👈 Para la base de datos
      titulo: servicio.titulo,
      descripcion: servicio.descripcion || ''
    };

    if (editIndex !== null) {
      const newItems = [...items];
      newItems[editIndex] = newItem;
      setItems(newItems);
    } else {
      setItems([...items, newItem]);
    }

    setShowModal(false);
    setSelectedServicioId('');
  };

  // ===== GUARDAR CAMBIOS =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await actualizarServiciosDestacados(items);
    if (result.success) {
      await loadFromSupabase();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  // ===== OBTENER SERVICIOS NO DESTACADOS =====
  const serviciosNoDestacados = servicios.filter(
    s => !items.some(item => item.servicioId === s.id)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">🎯 Servicios Destacados (Home)</h2>
        <button
          onClick={handleAdd}
          disabled={serviciosNoDestacados.length === 0}
          className={`bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 ${
            serviciosNoDestacados.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          + Agregar Destacado
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item, index) => {
                const servicio = servicios.find(s => s.id === item.servicioId);
                return (
                  <div key={item.servicioId || index} className="p-4 border border-gray-200 rounded-lg relative group">
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

                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary">{item.titulo || 'Sin título'}</h4>
                        <p className="text-sm text-gray-500 mt-1">{item.descripcion || 'Sin descripción'}</p>
                        {servicio && (
                          <span className="text-xs text-gray-400 mt-2 inline-block bg-gray-100 px-2 py-1 rounded">
                            ID: {servicio.id}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona un servicio *</label>
                <select
                  value={selectedServicioId}
                  onChange={(e) => setSelectedServicioId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                >
                  <option value="">-- Selecciona --</option>
                  {(editIndex !== null ? servicios : serviciosNoDestacados).map((servicio) => (
                    <option key={servicio.id} value={servicio.id}>
                      {servicio.titulo}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  {editIndex !== null 
                    ? 'Puedes cambiar el servicio destacado' 
                    : 'Solo aparecen servicios no destacados'}
                </p>
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
                onClick={handleSave}
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