import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Presupuesto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const servicioId = searchParams.get('servicio');
  const { servicios } = useAppContext();

  const [paso, setPaso] = useState(1);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({});

  // ===== NÚMERO DE WHATSAPP =====
  const WHATSAPP_NUMBER = '5359342808';

  // ===== PRESELECCIONAR SERVICIO DESDE URL =====
  useEffect(() => {
    if (servicioId) {
      const servicio = servicios.find(s => s.id === servicioId);
      if (servicio) {
        setServicioSeleccionado(servicio);
        setPaso(2);
      }
    }
  }, [servicioId, servicios]);

  // ===== MANEJADORES =====
  const handleSeleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    setPaso(2);
  };

  const handleVolver = () => {
    navigate('/servicios');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ===== VALIDACIÓN DE TELÉFONO =====
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9+ ]/g, '');
    setFormData({
      ...formData,
      telefono: value
    });
  };

  // ===== ENVÍO A WHATSAPP =====
  const handleSubmit = (e) => {
    e.preventDefault();

    const servicio = servicioSeleccionado;
    const campos = servicio.camposFormulario || [];

    let mensaje = `Hola ARCO, vengo de su página web y quiero solicitar un presupuesto:%0A%0A` +
      `📌 *Solicitud de Presupuesto*%0A` +
      `%0A` +
      `🛠️ *Servicio:* ${servicio.titulo}%0A` +
      `%0A`;

    // 👇 RECORRER CAMPOS DINÁMICOS DEL FORMULARIO
    campos.forEach(campo => {
      const valor = formData[campo.id] || 'No especificado';
      mensaje += `📌 *${campo.label}:* ${valor}%0A`;
    });

    mensaje += `%0A` +
      `👤 *Nombre:* ${formData.nombre_completo || 'No especificado'}%0A` +
      `📧 *Email:* ${formData.email || 'No especificado'}%0A` +
      `📱 *Teléfono:* ${formData.telefono || 'No especificado'}%0A` +
      `📝 *Comentarios adicionales:* ${formData.comentarios || 'Ninguno'}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');

    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      navigate('/servicios');
    }, 2500);
  };

  // ===== RENDER FORMULARIO =====
  const renderFormulario = () => {
    if (!servicioSeleccionado) return null;

    const campos = servicioSeleccionado.camposFormulario || [];

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Galería de ejemplos */}
        {servicioSeleccionado.imagenes && servicioSeleccionado.imagenes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">📸 Ejemplos de trabajos realizados</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {servicioSeleccionado.imagenes.slice(0, 3).map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 hover:border-secondary transition-all group">
                  <img
                    src={img}
                    alt={`Ejemplo ${idx + 1}`}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">⬆ Estos son algunos de nuestros trabajos. Tu pedido puede ser similar.</p>
          </div>
        )}

        {/* ===== CAMPOS DINÁMICOS DEL FORMULARIO ===== */}
        {campos.length > 0 ? (
          campos.map((campo) => (
            <div key={campo.id}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {campo.label} {campo.required && <span className="text-red-500">*</span>}
              </label>
              {campo.tipo === 'select' ? (
                <select
                  name={campo.id}
                  onChange={handleInputChange}
                  required={campo.required}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                >
                  <option value="">Selecciona una opción</option>
                  {campo.opciones && campo.opciones.map((opcion) => (
                    <option key={opcion} value={opcion}>{opcion}</option>
                  ))}
                </select>
              ) : campo.tipo === 'textarea' ? (
                <textarea
                  name={campo.id}
                  placeholder={campo.placeholder || ''}
                  onChange={handleInputChange}
                  required={campo.required}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              ) : campo.tipo === 'file' ? (
                <input
                  type="file"
                  name={campo.id}
                  accept=".jpg,.png,.pdf,.ai,.psd,.svg"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
                />
              ) : (
                <input
                  type={campo.tipo === 'number' ? 'number' : 'text'}
                  name={campo.id}
                  placeholder={campo.placeholder || ''}
                  onChange={handleInputChange}
                  required={campo.required}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
              )}
            </div>
          ))
        ) : (
          // Si no hay campos configurados, mostrar un mensaje
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700 text-sm">
            ⚠️ Este servicio no tiene campos configurados. Por favor, contacta directamente por WhatsApp.
          </div>
        )}

        {/* Datos de contacto (siempre presentes) */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-lg font-bold text-primary mb-4">📋 Datos de contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
              <input
                type="text"
                name="nombre_completo"
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                onChange={handlePhoneChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                placeholder="+53 5XXXXXXXX"
                pattern="[0-9+ ]+"
                title="Solo números y el signo +"
              />
              <p className="text-xs text-gray-400 mt-1">Solo números y el signo +</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Comentarios adicionales</label>
              <input
                type="text"
                name="comentarios"
                onChange={handleInputChange}
                placeholder="Detalles extra..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleVolver}
            className="px-6 py-2.5 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
          >
            ← Volver a Servicios
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-blue-700 text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
          >
            Enviar Solicitud ✨
          </button>
        </div>
      </form>
    );
  };

  // ===== RENDER LISTADO =====
  const renderListado = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {servicios.map((servicio) => (
        <motion.div
          key={servicio.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleSeleccionarServicio(servicio)}
          className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-secondary/50 group"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform">{servicio.icono || '📋'}</div>
            <div className="flex-1">
              <h3 className="font-bold text-primary group-hover:text-secondary transition-colors">
                {servicio.titulo}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{servicio.desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-secondary">{servicio.precio || 'Consultar'}</span>
                <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Solicitar →
                </span>
              </div>
              {servicio.imagenes && servicio.imagenes.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {servicio.imagenes.slice(0, 2).map((img, idx) => (
                    <div key={idx} className="w-6 h-6 rounded overflow-hidden border border-gray-200">
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                  {servicio.imagenes.length > 2 && (
                    <span className="text-[10px] text-gray-400 flex items-center">+{servicio.imagenes.length - 2}</span>
                  )}
                </div>
              )}
              {/* Mostrar cuántos campos tiene el formulario */}
              <div className="mt-2">
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {servicio.camposFormulario?.length || 0} campos en el formulario
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Presupuesto</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            {paso === 1 ? 'Selecciona un servicio' : servicioSeleccionado?.titulo}
          </h1>
          <p className="text-gray-600 text-lg">
            {paso === 1
              ? 'Elige el servicio que necesitas y completa el formulario específico.'
              : 'Completa los detalles de tu proyecto para recibir un presupuesto personalizado.'}
          </p>
          {paso === 2 && (
            <button
              onClick={handleVolver}
              className="mt-2 text-sm text-secondary hover:text-secondary/70 transition-colors"
            >
              ← Volver a Servicios
            </button>
          )}
        </motion.div>

        {enviado ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center max-w-2xl mx-auto"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">¡Solicitud Enviada!</h2>
            <p className="text-green-600">
              Hemos recibido tu solicitud para <strong>{servicioSeleccionado?.titulo}</strong>.
              En breve nos pondremos en contacto contigo para brindarte un presupuesto personalizado.
            </p>
            <p className="text-sm text-gray-400 mt-2">Redirigiendo a Servicios...</p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            {paso === 1 ? renderListado() : renderFormulario()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Presupuesto;