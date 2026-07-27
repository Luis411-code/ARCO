import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const MensajesManager = () => {
  const { mensajes, marcarLeido, marcarRespondido, deleteMensaje } = useAppContext();
  const [filter, setFilter] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [mensajeSeleccionado, setMensajeSeleccionado] = useState(null);
  const [tipoRespuesta, setTipoRespuesta] = useState('email'); // 'email' o 'whatsapp'
  const [respuesta, setRespuesta] = useState('');

  // ===== FUNCIÓN PARA FORMATEAR FECHA =====
  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diff = ahora - fecha;
    
    if (diff < 60000) return 'Hace un momento';
    if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} minutos`;
    if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
    if (diff < 172800000) return 'Ayer';
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ===== FILTRAR MENSAJES =====
  const mensajesFiltrados = mensajes.filter(m => {
    if (filter === 'no-leidos') return !m.leido;
    if (filter === 'respondidos') return m.respondido;
    return true;
  });

  // ===== CONTADORES =====
  const totalNoLeidos = mensajes.filter(m => !m.leido).length;
  const totalRespondidos = mensajes.filter(m => m.respondido).length;

  // ===== ABRIR MODAL DE RESPUESTA =====
  const abrirModalRespuesta = (mensaje, tipo) => {
    setMensajeSeleccionado(mensaje);
    setTipoRespuesta(tipo);
    setRespuesta('');
    setShowModal(true);
  };

  // ===== ENVIAR RESPUESTA =====
  const enviarRespuesta = () => {
    if (!respuesta.trim()) {
      alert('Por favor, escribe una respuesta antes de enviar.');
      return;
    }

    const mensaje = mensajeSeleccionado;

    if (tipoRespuesta === 'email') {
      // Abrir email con la respuesta del admin
      const asunto = encodeURIComponent(`ARCO - Respuesta a tu mensaje`);
      const cuerpo = encodeURIComponent(
        `Hola ${mensaje.nombre},\n\n${respuesta}\n\n---\nTu mensaje original:\n"${mensaje.mensaje}"\n\nSaludos cordiales,\nARCO - Publicidad y Comunicación Gráfica`
      );
      window.open(`mailto:${mensaje.email}?subject=${asunto}&body=${cuerpo}`, '_blank');
    } else {
      // Abrir WhatsApp con la respuesta del admin
      const telefonoLimpio = mensaje.telefono.replace(/[^0-9]/g, '');
      const mensajeWhatsApp = encodeURIComponent(
        `Hola ${mensaje.nombre}, soy de ARCO.\n\n${respuesta}`
      );
      window.open(`https://wa.me/${telefonoLimpio}?text=${mensajeWhatsApp}`, '_blank');
    }

    // Marcar como respondido
    marcarRespondido(mensaje.id);
    setShowModal(false);
    setMensajeSeleccionado(null);
    setRespuesta('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">✉️ Mensajes</h2>
          <p className="text-sm text-gray-500">
            {totalNoLeidos > 0 
              ? `📌 ${totalNoLeidos} mensajes sin leer` 
              : '✅ Todos los mensajes han sido leídos'}
          </p>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('todos')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'todos' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todos ({mensajes.length})
          </button>
          <button
            onClick={() => setFilter('no-leidos')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'no-leidos' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            No leídos ({totalNoLeidos})
          </button>
          <button
            onClick={() => setFilter('respondidos')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === 'respondidos' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Respondidos ({totalRespondidos})
          </button>
        </div>
      </div>

      {mensajesFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700">No hay mensajes</h3>
          <p className="text-gray-400">Cuando los clientes te contacten, aparecerán aquí.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mensajesFiltrados.map((mensaje) => (
            <motion.div
              key={mensaje.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl shadow-md border-l-4 p-6 transition-all ${
                !mensaje.leido 
                  ? 'border-l-red-500 bg-red-50/30' 
                  : mensaje.respondido 
                  ? 'border-l-green-500' 
                  : 'border-l-gray-300'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Info del cliente */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-primary text-lg">{mensaje.nombre}</h4>
                    {!mensaje.leido && (
                      <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                        NUEVO
                      </span>
                    )}
                    {mensaje.respondido && (
                      <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                        ✓ Respondido
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">📧 {mensaje.email}</span>
                    <span className="flex items-center gap-1">📱 {mensaje.telefono}</span>
                    <span className="flex items-center gap-1">🕐 {formatearFecha(mensaje.fecha)}</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => abrirModalRespuesta(mensaje, 'email')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                    title="Responder por Email"
                  >
                    📧 Responder Email
                  </button>
                  
                  {mensaje.telefono && mensaje.telefono !== 'No especificado' && (
                    <button
                      onClick={() => abrirModalRespuesta(mensaje, 'whatsapp')}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                      title="Responder por WhatsApp"
                    >
                      💬 WhatsApp
                    </button>
                  )}
                  
                  <button
                    onClick={() => marcarLeido(mensaje.id)}
                    className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                    title="Marcar como leído"
                  >
                    👁️
                  </button>
                  
                  <button
                    onClick={() => deleteMensaje(mensaje.id)}
                    className="flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Mensaje */}
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {mensaje.mensaje}
                </p>
              </div>

              {mensaje.respondido && (
                <div className="mt-2 text-xs text-green-600">
                  ✅ Mensaje marcado como respondido
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* ===== MODAL PARA ESCRIBIR RESPUESTA ===== */}
      {showModal && mensajeSeleccionado && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-primary mb-2">
              {tipoRespuesta === 'email' ? '📧 Responder por Email' : '💬 Responder por WhatsApp'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Respondiendo a <strong>{mensajeSeleccionado.nombre}</strong>
            </p>

            <div className="space-y-4">
              {/* Mensaje original */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-400 mb-1">Mensaje original:</p>
                <p className="text-sm text-gray-700">{mensajeSeleccionado.mensaje}</p>
              </div>

              {/* Campo para escribir la respuesta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu respuesta *
                </label>
                <textarea
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder={`Escribe tu respuesta para ${mensajeSeleccionado.nombre}...`}
                />
                <p className="text-xs text-gray-400 mt-1">
                  {tipoRespuesta === 'email' 
                    ? 'La respuesta se enviará por correo electrónico' 
                    : 'La respuesta se enviará por WhatsApp'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setMensajeSeleccionado(null);
                  setRespuesta('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={enviarRespuesta}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all hover:shadow-lg ${
                  tipoRespuesta === 'email' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {tipoRespuesta === 'email' ? '📧 Enviar Email' : '💬 Enviar WhatsApp'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MensajesManager;