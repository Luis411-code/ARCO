import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const Presupuesto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const servicioId = searchParams.get('servicio');

  const [paso, setPaso] = useState(1);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [enviado, setEnviado] = useState(false);

  // ===== SERVICIOS CON IMÁGENES DE EJEMPLO =====
  const servicios = [
    {
      id: 'carteles-luminicos',
      nombre: 'Carteles Lumínicos',
      icono: '💡',
      descripcion: 'Carteles con iluminación LED de bajo consumo y larga durabilidad.',
      precioBase: '$100',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0066.jpg', alt: 'Holguín renovada - Cartel lumínico' },
        { src: '/imagenes/IMG-20260723-WA0065.jpg', alt: 'San Isidoro de Holguín - Cartel lumínico' }
      ],
      campos: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 120 x 80 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 2', required: true },
        { id: 'iluminacion', label: 'Tipo de iluminación', tipo: 'select', opciones: ['LED Blanco', 'LED Color', 'Neón'], required: true },
        { id: 'color_fondo', label: 'Color de fondo', tipo: 'text', placeholder: 'Ej: Azul marino', required: false },
        { id: 'color_texto', label: 'Color del texto', tipo: 'text', placeholder: 'Ej: Blanco', required: false },
        { id: 'contenido', label: 'Texto del cartel', tipo: 'text', placeholder: 'Ej: "Holguín - La ciudad que queremos"', required: true }
      ]
    },
    {
      id: 'carteles-no-luminicos',
      nombre: 'Carteles No Lumínicos',
      icono: '🪧',
      descripcion: 'Carteles de alta calidad para interiores y exteriores.',
      precioBase: '$50',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0063.jpg', alt: 'Bodeguita - Cartel no lumínico' },
        { src: '/imagenes/IMG-20260723-WA0062.jpg', alt: 'Restaurante Hollanda - Cartel no lumínico' }
      ],
      campos: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 80 x 60 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 5', required: true },
        { id: 'material', label: 'Material', tipo: 'select', opciones: ['PVC', 'Acrílico', 'Cartón', 'Vinilo'], required: true },
        { id: 'color_principal', label: 'Color principal', tipo: 'text', placeholder: 'Ej: Rojo', required: false }
      ]
    },
    {
      id: 'senaletica',
      nombre: 'Señalética / Carteles Identificativos',
      icono: '📍',
      descripcion: 'Señalización e identificación para empresas y espacios.',
      precioBase: '$30',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0064.jpg', alt: 'ENAS Holguín - Señalética' },
        { src: '/imagenes/IMG-20260723-WA0061.jpg', alt: 'Conservas Turquín - Cartel identificativo' }
      ],
      campos: [
        { id: 'tipo', label: 'Tipo de señalética', tipo: 'select', opciones: ['Señal de Tránsito', 'Señal de Localización', 'Señal de Seguridad', 'Identificación de Empresa'], required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 10', required: true },
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 30 x 20 cm', required: true },
        { id: 'contenido', label: 'Contenido del texto', tipo: 'text', placeholder: 'Ej: "ENAS - Empresa Nacional de Análisis del Agua"', required: true }
      ]
    },
    {
      id: 'rotulos-carros',
      nombre: 'Rótulos para Carros',
      icono: '🚗',
      descripcion: 'Rotulación y adhesivos para vehículos comerciales.',
      precioBase: '$55',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0055.jpg', alt: 'UNITY - Rótulo para carro' },
        { src: '/imagenes/IMG-20260723-WA0056.jpg', alt: 'ELC BAYER - Rótulo para carro' },
        { src: '/imagenes/IMG-20260723-WA0057.jpg', alt: 'MANCHESTER UNITED - Rótulo para carro' }
      ],
      campos: [
        { id: 'tipo', label: 'Tipo de rotulación', tipo: 'select', opciones: ['Parcial', 'Completa', 'Adhesivo Simple'], required: true },
        { id: 'cantidad', label: 'Cantidad de vehículos', tipo: 'number', placeholder: 'Ej: 3', required: true },
        { id: 'texto', label: 'Texto o diseño', tipo: 'text', placeholder: 'Ej: "UNITY - Transporte"', required: true }
      ]
    },
    {
      id: 'gigantografias',
      nombre: 'Gigantografías y Pendones',
      icono: '📏',
      descripcion: 'Impresión de gran formato para publicidad exterior.',
      precioBase: '$60',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0072.jpg', alt: 'Cuba Territorial - Gigantografía' },
        { src: '/imagenes/IMG-20260723-WA0071.jpg', alt: 'Holguín Deporte - Pendón' }
      ],
      campos: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 200 x 150 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 3', required: true },
        { id: 'material', label: 'Material', tipo: 'select', opciones: ['Lona', 'Vinilo', 'Tela', 'PVC'], required: true }
      ]
    },
    {
      id: 'tarjetas-presentacion',
      nombre: 'Tarjetas de Presentación',
      icono: '💳',
      descripcion: 'Diseño e impresión de tarjetas de presentación.',
      precioBase: '$15',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0054.jpg', alt: 'Tarjetas de presentación' },
        { src: '/imagenes/IMG-20260723-WA0051.jpg', alt: 'TIGER - Tarjetas de presentación' }
      ],
      campos: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 100', required: true },
        { id: 'tamano', label: 'Tamaño', tipo: 'select', opciones: ['Estándar 9x5 cm', 'Cuadrada 7x7 cm', 'Personalizado'], required: true },
        { id: 'material', label: 'Material', tipo: 'select', opciones: ['Papel Bond', 'Papel Couche', 'Cartulina'], required: true },
        { id: 'acabado', label: 'Acabado', tipo: 'select', opciones: ['Mate', 'Brillante', 'Texturizado'], required: true }
      ]
    },
    {
      id: 'calcomanias',
      nombre: 'Calcomanías',
      icono: '📎',
      descripcion: 'Calcomanías adhesivas para todo tipo de superficies.',
      precioBase: '$5',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0052.jpg', alt: 'maritalcar.com - Calcomanía' }
      ],
      campos: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 10 x 5 cm', required: true },
        { id: 'texto', label: 'Texto o diseño', tipo: 'text', placeholder: 'Ej: "www.maritalcar.com"', required: true }
      ]
    },
    {
      id: 'tabilleros',
      nombre: 'Tabilleros y Tabillas',
      icono: '📋',
      descripcion: 'Tableros y tabillas para información y comunicación visual.',
      precioBase: '$15',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0054.jpg', alt: 'Tabilleros - Ejemplo' }
      ],
      campos: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 40 x 30 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 5', required: true },
        { id: 'material', label: 'Material', tipo: 'select', opciones: ['PVC', 'Acrílico', 'Cartón'], required: true },
        { id: 'contenido', label: 'Contenido del texto', tipo: 'text', placeholder: 'Ej: "Bienvenidos a nuestra empresa"', required: true }
      ]
    },
    {
      id: 'doyles',
      nombre: 'Doyles y Posavasos',
      icono: '🍺',
      descripcion: 'Accesorios promocionales personalizados para tu marca.',
      precioBase: '$10',
      ejemplos: [
        { src: '/imagenes/IMG-20260723-WA0063.jpg', alt: 'Doyles - Ejemplo' }
      ],
      campos: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'tipo', label: 'Tipo de producto', tipo: 'select', opciones: ['Doyles', 'Posavasos', 'Ambos'], required: true },
        { id: 'diseno', label: 'Diseño o texto', tipo: 'text', placeholder: 'Ej: "Logo de mi empresa"', required: true }
      ]
    },
    {
      id: 'stands',
      nombre: 'Stand para Ferias',
      icono: '🏛️',
      descripcion: 'Diseño y montaje de stands para ferias y exposiciones.',
      precioBase: '$200',
      ejemplos: [],
      campos: [
        { id: 'tamano', label: 'Tamaño del stand (ancho x alto en metros)', tipo: 'text', placeholder: 'Ej: 3 x 3 m', required: true },
        { id: 'tipo', label: 'Tipo de stand', tipo: 'select', opciones: ['Stand Simple', 'Stand con Pantalla', 'Stand Interactivo'], required: true },
        { id: 'estructura', label: 'Estructura', tipo: 'select', opciones: ['Aluminio', 'Madera', 'Acrílico'], required: true },
        { id: 'iluminacion', label: '¿Necesita iluminación?', tipo: 'select', opciones: ['Sí', 'No'], required: true }
      ]
    }
  ];

  // ===== PRESELECCIONAR SERVICIO DESDE URL =====
  useEffect(() => {
    if (servicioId) {
      const servicio = servicios.find(s => s.id === servicioId);
      if (servicio) {
        setServicioSeleccionado(servicio);
        setPaso(2);
      }
    }
  }, [servicioId]);

  // ===== MANEJADORES =====
  const handleSeleccionarServicio = (servicio) => {
    setServicioSeleccionado(servicio);
    setPaso(2);
  };

  const handleVolver = () => {
    navigate('/servicios'); // 👈 REDIRIGE A SERVICIOS
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setPaso(1);
      setServicioSeleccionado(null);
    }, 4000);
  };

  // ===== RENDER FORMULARIO =====
  const renderFormulario = () => {
    if (!servicioSeleccionado) return null;

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Galería de ejemplos */}
        {servicioSeleccionado.ejemplos && servicioSeleccionado.ejemplos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">📸 Ejemplos de trabajos realizados</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {servicioSeleccionado.ejemplos.map((img, idx) => (
                <div key={idx} className="relative rounded-lg overflow-hidden border border-gray-200 hover:border-secondary transition-all group">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-28 object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-1 text-center truncate">
                    {img.alt}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">⬆ Estos son algunos de nuestros trabajos. Tu pedido puede ser similar.</p>
          </div>
        )}

        {/* Campos del formulario */}
        {servicioSeleccionado.campos.map((campo) => (
          <div key={campo.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {campo.label} {campo.required && <span className="text-red-500">*</span>}
            </label>
            {campo.tipo === 'select' ? (
              <select
                required={campo.required}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              >
                <option value="">Selecciona una opción</option>
                {campo.opciones.map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            ) : campo.tipo === 'file' ? (
              <input
                type="file"
                accept=".jpg,.png,.pdf,.ai,.psd,.svg"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20"
              />
            ) : campo.tipo === 'number' ? (
              <input
                type="number"
                required={campo.required}
                placeholder={campo.placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            ) : (
              <input
                type="text"
                required={campo.required}
                placeholder={campo.placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            )}
          </div>
        ))}

        {/* Datos de contacto */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h3 className="text-lg font-bold text-primary mb-4">📋 Datos de contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
              <input type="text" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
              <input type="tel" required className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje adicional</label>
              <input type="text" placeholder="Comentarios adicionales..." className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" />
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
            <div className="text-4xl group-hover:scale-110 transition-transform">{servicio.icono}</div>
            <div className="flex-1">
              <h3 className="font-bold text-primary group-hover:text-secondary transition-colors">
                {servicio.nombre}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{servicio.descripcion}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-semibold text-secondary">{servicio.precioBase}</span>
                <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Solicitar →
                </span>
              </div>
              {servicio.ejemplos && servicio.ejemplos.length > 0 && (
                <div className="flex gap-1 mt-2">
                  {servicio.ejemplos.slice(0, 2).map((img, idx) => (
                    <div key={idx} className="w-6 h-6 rounded overflow-hidden border border-gray-200">
                      <img src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                  {servicio.ejemplos.length > 2 && (
                    <span className="text-[10px] text-gray-400 flex items-center">+{servicio.ejemplos.length - 2}</span>
                  )}
                </div>
              )}
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
            {paso === 1 ? 'Selecciona un servicio' : servicioSeleccionado?.nombre}
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
              Hemos recibido tu solicitud para <strong>{servicioSeleccionado?.nombre}</strong>.
              En breve nos pondremos en contacto contigo para brindarte un presupuesto personalizado.
            </p>
            <button
              onClick={() => {
                setEnviado(false);
                setPaso(1);
                setServicioSeleccionado(null);
              }}
              className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-all"
            >
              Solicitar otro servicio
            </button>
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