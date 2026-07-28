// src/pages/dashboard/CategoriasManager.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const CategoriasManager = () => {
  const { configuracion, actualizarConfiguracion, loadFromSupabase } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [categorias, setCategorias] = useState(configuracion?.categorias || [
    'Cartelería',
    'Impresión',
    'Diseño',
    'Rotulación',
    'Promocionales',
    'Exhibición',
    'Papelería',
    'Decoración',
    'Montaje',
    'Otros'
  ]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [editandoValor, setEditandoValor] = useState('');
  const [guardando, setGuardando] = useState(false);

  const handleAgregar = () => {
    if (!nuevaCategoria.trim()) {
      alert('Escribe una categoría');
      return;
    }
    if (categorias.includes(nuevaCategoria.trim())) {
      alert('Esta categoría ya existe');
      return;
    }
    setCategorias([...categorias, nuevaCategoria.trim()]);
    setNuevaCategoria('');
  };

  const handleEliminar = (index) => {
    if (confirm('¿Eliminar esta categoría?')) {
      const nuevas = categorias.filter((_, i) => i !== index);
      setCategorias(nuevas);
    }
  };

  const handleEditar = (index) => {
    setEditandoIndex(index);
    setEditandoValor(categorias[index]);
  };

  const handleGuardarEdicion = () => {
    if (!editandoValor.trim()) {
      alert('La categoría no puede estar vacía');
      return;
    }
    if (categorias.some((c, i) => c === editandoValor.trim() && i !== editandoIndex)) {
      alert('Esta categoría ya existe');
      return;
    }
    const nuevas = [...categorias];
    nuevas[editandoIndex] = editandoValor.trim();
    setCategorias(nuevas);
    setEditandoIndex(null);
    setEditandoValor('');
  };

  const handleGuardar = async () => {
    try {
      setGuardando(true);
      // Guardar categorías en la configuración
      const result = await actualizarConfiguracion({ 
        ...configuracion, 
        categorias: categorias 
      });
      
      if (result.success) {
        await loadFromSupabase();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('❌ Error al guardar: ' + (result.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error guardando categorías:', error);
      alert('❌ Error al guardar categorías');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">🏷️ Gestión de Categorías</h2>
        <button
          onClick={handleGuardar}
          disabled={guardando}
          className={`bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105 ${
            guardando ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {guardando ? '⏳ Guardando...' : '💾 Guardar Cambios'}
        </button>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200"
        >
          ✅ Categorías guardadas exitosamente
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            placeholder="Nueva categoría..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleAgregar()}
          />
          <button
            onClick={handleAgregar}
            className="bg-secondary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-all"
          >
            + Agregar
          </button>
        </div>

        {categorias.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No hay categorías</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categorias.map((categoria, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:border-secondary/50 transition-colors"
              >
                {editandoIndex === index ? (
                  <input
                    type="text"
                    value={editandoValor}
                    onChange={(e) => setEditandoValor(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm rounded border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handleGuardarEdicion()}
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-700">{categoria}</span>
                )}
                <div className="flex gap-1">
                  {editandoIndex === index ? (
                    <button
                      onClick={handleGuardarEdicion}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      ✅
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditar(index)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      ✏️
                    </button>
                  )}
                  <button
                    onClick={() => handleEliminar(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriasManager;