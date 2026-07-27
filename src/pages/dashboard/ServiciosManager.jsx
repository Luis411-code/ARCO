import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const ServiciosManager = () => {
  const { servicios, addServicio, deleteServicio, updateServicio } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imagenesPreview, setImagenesPreview] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    desc: '',
    icono: '📋',
    precio: '',
    categoria: 'Cartelería',
    imagenes: [],
    camposFormulario: []
  });

  // ===== CAMPOS DEL FORMULARIO =====
  const [mostrarCampos, setMostrarCampos] = useState(false);
  const [nuevoCampo, setNuevoCampo] = useState({
    id: '',
    label: '',
    tipo: 'text',
    placeholder: '',
    required: true,
    opciones: []
  });
  const [opcionesInput, setOpcionesInput] = useState('');
  const [mensajeCampos, setMensajeCampos] = useState('');
  
  // ===== EDITAR CAMPO =====
  const [editandoCampoIndex, setEditandoCampoIndex] = useState(null);
  const [campoEditando, setCampoEditando] = useState(null);
  const [showEditFieldModal, setShowEditFieldModal] = useState(false);

  // ===== CONVERTIR IMAGEN A BASE64 =====
  const convertirABase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImagenesChange = async (e) => {
    const files = Array.from(e.target.files);
    const imagenesBase64 = await Promise.all(files.map(file => convertirABase64(file)));
    setImagenesPreview(imagenesBase64);
    setFormData({
      ...formData,
      imagenes: imagenesBase64
    });
  };

  const eliminarImagen = (index) => {
    const nuevasImagenes = formData.imagenes.filter((_, i) => i !== index);
    const nuevasPreviews = imagenesPreview.filter((_, i) => i !== index);
    setFormData({ ...formData, imagenes: nuevasImagenes });
    setImagenesPreview(nuevasPreviews);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const camposValidos = formData.camposFormulario.every(c => c.id && c.label);
    if (!camposValidos) {
      setMensajeCampos('⚠️ Todos los campos deben tener ID y etiqueta');
      return;
    }

    if (editingId) {
      updateServicio(editingId, formData);
    } else {
      addServicio(formData);
    }
    setShowModal(false);
    setEditingId(null);
    setFormData({ titulo: '', desc: '', icono: '📋', precio: '', categoria: 'Cartelería', imagenes: [], camposFormulario: [] });
    setImagenesPreview([]);
    setMensajeCampos('');
  };

  const handleEdit = (servicio) => {
    setEditingId(servicio.id);
    setFormData({
      titulo: servicio.titulo || '',
      desc: servicio.desc || '',
      icono: servicio.icono || '📋',
      precio: servicio.precio || '',
      categoria: servicio.categoria || 'Cartelería',
      imagenes: servicio.imagenes || [],
      camposFormulario: servicio.camposFormulario || []
    });
    
    if (servicio.imagenes && servicio.imagenes.length > 0) {
      setImagenesPreview(servicio.imagenes);
    } else {
      setImagenesPreview([]);
    }
    setShowModal(true);
    setMensajeCampos('');
  };

  const handleDelete = (id) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      deleteServicio(id);
    }
  };

  // ===== FUNCIONES PARA CAMPOS =====
  const agregarCampo = () => {
    if (!nuevoCampo.id || !nuevoCampo.label) {
      setMensajeCampos('⚠️ El ID y la etiqueta son obligatorios');
      return;
    }

    if (formData.camposFormulario.some(c => c.id === nuevoCampo.id)) {
      setMensajeCampos('⚠️ Ya existe un campo con ese ID');
      return;
    }

    const campo = { ...nuevoCampo };
    if (campo.tipo === 'select' && opcionesInput) {
      campo.opciones = opcionesInput.split(',').map(o => o.trim()).filter(o => o);
    }

    setFormData({
      ...formData,
      camposFormulario: [...formData.camposFormulario, campo]
    });

    setNuevoCampo({ id: '', label: '', tipo: 'text', placeholder: '', required: true, opciones: [] });
    setOpcionesInput('');
    setMensajeCampos('✅ Campo agregado correctamente');
    setTimeout(() => setMensajeCampos(''), 2000);
  };

  const eliminarCampo = (index) => {
    if (confirm('¿Eliminar este campo?')) {
      const nuevosCampos = formData.camposFormulario.filter((_, i) => i !== index);
      setFormData({ ...formData, camposFormulario: nuevosCampos });
      setMensajeCampos('✅ Campo eliminado');
      setTimeout(() => setMensajeCampos(''), 1500);
    }
  };

  // ===== EDITAR CAMPO =====
  const abrirEditarCampo = (index) => {
    const campo = formData.camposFormulario[index];
    setEditandoCampoIndex(index);
    setCampoEditando({ ...campo });
    setShowEditFieldModal(true);
  };

  const guardarEdicionCampo = () => {
    if (!campoEditando.id || !campoEditando.label) {
      setMensajeCampos('⚠️ El ID y la etiqueta son obligatorios');
      return;
    }

    // Verificar que el ID no esté duplicado (excepto con el mismo campo)
    const duplicado = formData.camposFormulario.some(
      (c, idx) => c.id === campoEditando.id && idx !== editandoCampoIndex
    );
    if (duplicado) {
      setMensajeCampos('⚠️ Ya existe otro campo con ese ID');
      return;
    }

    const nuevosCampos = [...formData.camposFormulario];
    nuevosCampos[editandoCampoIndex] = { ...campoEditando };
    setFormData({ ...formData, camposFormulario: nuevosCampos });
    setShowEditFieldModal(false);
    setEditandoCampoIndex(null);
    setCampoEditando(null);
    setMensajeCampos('✅ Campo actualizado correctamente');
    setTimeout(() => setMensajeCampos(''), 2000);
  };

  const handleNuevoCampoChange = (e) => {
    setNuevoCampo({
      ...nuevoCampo,
      [e.target.name]: e.target.value
    });
  };

  const handleCampoEditandoChange = (e) => {
    setCampoEditando({
      ...campoEditando,
      [e.target.name]: e.target.value
    });
  };

  const handleOpcionesEditandoChange = (e) => {
    setCampoEditando({
      ...campoEditando,
      opciones: e.target.value.split(',').map(o => o.trim()).filter(o => o)
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">📋 Gestión de Servicios ({servicios.length})</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ titulo: '', desc: '', icono: '📋', precio: '', categoria: 'Cartelería', imagenes: [], camposFormulario: [] });
            setImagenesPreview([]);
            setMensajeCampos('');
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
        >
          + Agregar Servicio
        </button>
      </div>

      {/* LISTA DE SERVICIOS */}
      {servicios.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-500">No hay servicios agregados todavía.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {servicios.map((servicio, index) => (
                  <motion.tr
                    key={servicio.id || index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-2xl">{servicio.icono || '📋'}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{servicio.titulo}</td>
                    <td className="px-6 py-4 text-gray-600">{servicio.categoria}</td>
                    <td className="px-6 py-4 text-gray-600">{servicio.precio}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {servicio.camposFormulario?.length || 0} campos
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(servicio)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(servicio.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
            Total: {servicios.length} servicios
          </div>
        </div>
      )}

      {/* ===== MODAL PRINCIPAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              {editingId ? '✏️ Editar Servicio' : '➕ Agregar Servicio'}
            </h3>

            {mensajeCampos && (
              <div className={`p-3 rounded-lg mb-4 text-sm ${
                mensajeCampos.includes('✅') 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : mensajeCampos.includes('⚠️')
                  ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                {mensajeCampos}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* DATOS BÁSICOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icono (emoji)</label>
                  <input
                    type="text"
                    name="icono"
                    value={formData.icono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input
                    type="text"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  >
                    <option value="Cartelería">Cartelería</option>
                    <option value="Impresión">Impresión</option>
                    <option value="Diseño">Diseño</option>
                    <option value="Rotulación">Rotulación</option>
                    <option value="Promocionales">Promocionales</option>
                    <option value="Exhibición">Exhibición</option>
                    <option value="Papelería">Papelería</option>
                    <option value="Decoración">Decoración</option>
                    <option value="Montaje">Montaje</option>
                  </select>
                </div>
              </div>

              {/* IMÁGENES */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imágenes</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImagenesChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                />
              </div>

              {imagenesPreview.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {imagenesPreview.map((preview, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => eliminarImagen(idx)}
                        className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ===== CAMPOS DEL FORMULARIO ===== */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={() => setMostrarCampos(!mostrarCampos)}
                  className="text-secondary font-semibold hover:text-secondary/70 transition-colors"
                >
                  {mostrarCampos ? '⬆ Ocultar campos del formulario' : '⬇ Configurar campos del formulario'}
                </button>

                {mostrarCampos && (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-500">
                      Personaliza los campos que se mostrarán cuando el cliente solicite este servicio.
                    </p>

                    {/* ===== CAMPOS ACTUALES CON BOTÓN EDITAR ===== */}
                    {formData.camposFormulario.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-700">Campos actuales:</h4>
                        {formData.camposFormulario.map((campo, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-gray-800">{campo.label}</span>
                              <span className="text-xs text-gray-400">({campo.tipo})</span>
                              {campo.required && <span className="text-red-500 text-xs font-bold">*</span>}
                              {campo.tipo === 'select' && campo.opciones && (
                                <span className="text-xs text-gray-400">
                                  Opciones: {campo.opciones.join(', ')}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => abrirEditarCampo(idx)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                              >
                                ✏️ Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => eliminarCampo(idx)}
                                className="text-red-500 hover:text-red-700 text-sm font-semibold"
                              >
                                ✕ Eliminar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ===== AGREGAR NUEVO CAMPO ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">ID del campo *</label>
                        <input
                          type="text"
                          name="id"
                          value={nuevoCampo.id}
                          onChange={handleNuevoCampoChange}
                          placeholder="ej: tamano"
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Etiqueta *</label>
                        <input
                          type="text"
                          name="label"
                          value={nuevoCampo.label}
                          onChange={handleNuevoCampoChange}
                          placeholder="ej: Tamaño"
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Tipo</label>
                        <select
                          name="tipo"
                          value={nuevoCampo.tipo}
                          onChange={handleNuevoCampoChange}
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        >
                          <option value="text">Texto</option>
                          <option value="number">Número</option>
                          <option value="select">Select (Desplegable)</option>
                          <option value="textarea">Área de texto</option>
                          <option value="file">Archivo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Placeholder</label>
                        <input
                          type="text"
                          name="placeholder"
                          value={nuevoCampo.placeholder}
                          onChange={handleNuevoCampoChange}
                          placeholder="ej: 120 x 80 cm"
                          className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            checked={nuevoCampo.required}
                            onChange={(e) => setNuevoCampo({ ...nuevoCampo, required: e.target.checked })}
                            className="w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
                          />
                          Obligatorio
                        </label>
                      </div>
                      {nuevoCampo.tipo === 'select' && (
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Opciones (separadas por comas)</label>
                          <input
                            type="text"
                            value={opcionesInput}
                            onChange={(e) => setOpcionesInput(e.target.value)}
                            placeholder="ej: Opción 1, Opción 2, Opción 3"
                            className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                          />
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <button
                          type="button"
                          onClick={agregarCampo}
                          className="w-full bg-secondary text-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-yellow-400 transition-colors"
                        >
                          + Agregar Campo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* BOTONES */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingId(null);
                    setImagenesPreview([]);
                    setMensajeCampos('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  {editingId ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* ===== MODAL PARA EDITAR CAMPO ===== */}
      {showEditFieldModal && campoEditando && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-primary mb-4">✏️ Editar Campo</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID del campo *</label>
                <input
                  type="text"
                  name="id"
                  value={campoEditando.id || ''}
                  onChange={handleCampoEditandoChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Etiqueta *</label>
                <input
                  type="text"
                  name="label"
                  value={campoEditando.label || ''}
                  onChange={handleCampoEditandoChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  name="tipo"
                  value={campoEditando.tipo || 'text'}
                  onChange={handleCampoEditandoChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                >
                  <option value="text">Texto</option>
                  <option value="number">Número</option>
                  <option value="select">Select (Desplegable)</option>
                  <option value="textarea">Área de texto</option>
                  <option value="file">Archivo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                <input
                  type="text"
                  name="placeholder"
                  value={campoEditando.placeholder || ''}
                  onChange={handleCampoEditandoChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={campoEditando.required || false}
                    onChange={(e) => setCampoEditando({ ...campoEditando, required: e.target.checked })}
                    className="w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
                  />
                  Obligatorio
                </label>
              </div>
              {campoEditando.tipo === 'select' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Opciones (separadas por comas)</label>
                  <input
                    type="text"
                    value={campoEditando.opciones?.join(', ') || ''}
                    onChange={handleOpcionesEditandoChange}
                    placeholder="ej: Opción 1, Opción 2, Opción 3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowEditFieldModal(false);
                  setEditandoCampoIndex(null);
                  setCampoEditando(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={guardarEdicionCampo}
                className="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ServiciosManager;