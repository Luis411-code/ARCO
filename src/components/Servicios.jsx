import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Servicios = () => {
  const servicios = [
    {
      id: 'carteles-luminicos',
      titulo: 'Carteles Lumínicos',
      desc: 'Carteles con iluminación LED de bajo consumo y larga durabilidad.',
      icono: '💡',
      precio: '$100',
      imagenes: ['IMG-20260723-WA0066.jpg', 'IMG-20260723-WA0065.jpg'],
      categoria: 'Lumínicos'
    },
    {
      id: 'carteles-no-luminicos',
      titulo: 'Carteles No Lumínicos',
      desc: 'Carteles de alta calidad para interiores y exteriores.',
      icono: '🪧',
      precio: '$50',
      imagenes: ['IMG-20260723-WA0063.jpg', 'IMG-20260723-WA0062.jpg'],
      categoria: 'No Lumínicos'
    },
    {
      id: 'senaletica',
      titulo: 'Señalética',
      desc: 'Sistemas de señalización para espacios comerciales y corporativos.',
      icono: '📍',
      precio: '$30',
      imagenes: ['IMG-20260723-WA0064.jpg', 'IMG-20260723-WA0061.jpg'],
      categoria: 'Señalética'
    },
    {
      id: 'carteles-identificativos',
      titulo: 'Carteles Identificativos',
      desc: 'Identificación y rotulación para negocios y oficinas.',
      icono: '🏷️',
      precio: '$40',
      imagenes: ['IMG-20260723-WA0064.jpg', 'IMG-20260723-WA0061.jpg'],
      categoria: 'Identificación'
    },
    {
      id: 'impresion',
      titulo: 'Impresión y Plastificado',
      desc: 'Servicios de impresión de alta calidad con acabado plastificado.',
      icono: '🖨️',
      precio: '$20',
      imagenes: ['IMG-20260723-WA0054.jpg', 'IMG-20260723-WA0051.jpg'],
      categoria: 'Impresión'
    },
    {
      id: 'rotulos-carros',
      titulo: 'Rótulos para Carros',
      desc: 'Rotulación y adhesivos para vehículos comerciales.',
      icono: '🚗',
      precio: '$55',
      imagenes: ['IMG-20260723-WA0055.jpg', 'IMG-20260723-WA0056.jpg', 'IMG-20260723-WA0057.jpg'],
      categoria: 'Rótulos'
    },
    {
      id: 'gigantografias',
      titulo: 'Gigantografías y Pendones',
      desc: 'Impresión de gran formato para publicidad exterior.',
      icono: '📏',
      precio: '$60',
      imagenes: ['IMG-20260723-WA0072.jpg', 'IMG-20260723-WA0071.jpg'],
      categoria: 'Gran Formato'
    },
    {
      id: 'tarjetas-presentacion',
      titulo: 'Tarjetas de Presentación',
      desc: 'Diseño e impresión de tarjetas de presentación.',
      icono: '💳',
      precio: '$15',
      imagenes: ['IMG-20260723-WA0054.jpg', 'IMG-20260723-WA0051.jpg'],
      categoria: 'Papelería'
    },
    {
      id: 'calcomanias',
      titulo: 'Calcomanías',
      desc: 'Calcomanías adhesivas para todo tipo de superficies.',
      icono: '📎',
      precio: '$5',
      imagenes: ['IMG-20260723-WA0052.jpg'],
      categoria: 'Adhesivos'
    },
    {
      id: 'tabilleros',
      titulo: 'Tabilleros y Tabillas',
      desc: 'Tableros y tabillas para información y comunicación visual.',
      icono: '📋',
      precio: '$15',
      imagenes: ['IMG-20260723-WA0054.jpg'],
      categoria: 'Papelería'
    },
    {
      id: 'doyles',
      titulo: 'Doyles y Posavasos',
      desc: 'Accesorios promocionales personalizados para tu marca.',
      icono: '🍺',
      precio: '$10',
      imagenes: ['IMG-20260723-WA0063.jpg'],
      categoria: 'Promocionales'
    },
    {
      id: 'displays-acrilico',
      titulo: 'Displays de Acrílico',
      desc: 'Exhibidores y displays de acrílico para puntos de venta.',
      icono: '🖼️',
      precio: '$35',
      imagenes: ['IMG-20260723-WA0062.jpg'],
      categoria: 'Exhibición'
    }
  ];

  // Servicios adicionales sin imágenes específicas
  const serviciosExtra = [
    { id: 'cartas-menu', titulo: 'Cartas Menú y Cartas Bar', icono: '📜', precio: '$25' },
    { id: 'trofeos', titulo: 'Trofeos', icono: '🏆', precio: '$20' },
    { id: 'rotulos-cristaleria', titulo: 'Rótulos para Cristalería', icono: '🪟', precio: '$45' },
    { id: 'solapines', titulo: 'Solapines y Llaveros', icono: '🔑', precio: '$8' },
    { id: 'estafetas', titulo: 'Estafetas y Credenciales', icono: '🪪', precio: '$12' },
    { id: 'invitaciones', titulo: 'Invitaciones', icono: '💌', precio: '$20' },
    { id: 'stands', titulo: 'Stand para Ferias', icono: '🏛️', precio: '$200' },
    { id: 'serigrafia', titulo: 'Serigrafía sobre Textiles', icono: '👕', precio: '$18' },
    { id: 'lampares', titulo: 'Lámparas y Apliques', icono: '💡', precio: '$30' },
    { id: 'mantenimientos', titulo: 'Mantenimientos Constructivos', icono: '🔧', precio: '$30' },
    { id: 'ambientacion', titulo: 'Ambientación de Interiores', icono: '🏠', precio: '$80' },
    { id: 'decoraciones', titulo: 'Decoraciones Exteriores', icono: '🌳', precio: '$90' },
    { id: 'climatizacion', titulo: 'Climatización', icono: '❄️', precio: '$150' },
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Servicios</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-gray-600 text-lg">
            Más de 25 productos y servicios en artes gráficas para cubrir todas 
            tus necesidades de comunicación visual.
          </p>
          <div className="mt-4 inline-block bg-secondary/10 px-6 py-2 rounded-full">
            <span className="text-secondary font-semibold">✅ Garantía de 1 año en todos los productos</span>
          </div>
        </motion.div>

        {/* Servicios con imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((servicio, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Imagen de muestra */}
              <div className="relative h-40 overflow-hidden bg-gray-100">
                {servicio.imagenes && servicio.imagenes.length > 0 ? (
                  <img
                    src={`/imagenes/${servicio.imagenes[0]}`}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
                    {servicio.icono}
                  </div>
                )}
                {/* Badge de categoría */}
                <div className="absolute top-2 left-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  {servicio.categoria}
                </div>
                {/* Badge de precio */}
                <div className="absolute bottom-2 right-2 bg-secondary/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {servicio.precio}
                </div>
                {/* Miniaturas adicionales */}
                {servicio.imagenes && servicio.imagenes.length > 1 && (
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {servicio.imagenes.slice(1, 3).map((img, idx) => (
                      <div key={idx} className="w-6 h-6 rounded border border-white/50 overflow-hidden">
                        <img
                          src={`/imagenes/${img}`}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                    {servicio.imagenes.length > 3 && (
                      <span className="text-[10px] text-white bg-black/30 px-1 rounded flex items-center">
                        +{servicio.imagenes.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{servicio.icono}</span>
                  <h3 className="text-base font-bold text-primary">{servicio.titulo}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{servicio.desc}</p>
                
                {/* Botón SOLICITAR SERVICIO - Enlace corregido */}
                <Link
                  to={`/presupuesto?servicio=${servicio.id}`}
                  className="mt-3 inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-md group/btn"
                >
                  <span>Solicitar Servicio</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Servicios adicionales (sin imágenes) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            También ofrecemos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {serviciosExtra.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 text-center group hover:border-secondary/30"
              >
                <div className="text-3xl group-hover:scale-110 transition-transform">{servicio.icono}</div>
                <p className="text-xs font-medium text-gray-700 mt-1">{servicio.titulo}</p>
                <p className="text-[10px] text-secondary font-semibold mt-0.5">{servicio.precio}</p>
                <Link
                  to={`/presupuesto?servicio=${servicio.id}`}
                  className="mt-2 text-[10px] text-primary/70 hover:text-primary transition-colors inline-block"
                >
                  Solicitar →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Materiales y garantía */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-primary rounded-2xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Materiales</h3>
              <ul className="space-y-2 text-blue-100">
                <li>✅ PVC de alta resistencia</li>
                <li>✅ Acrílico de primera calidad</li>
                <li>✅ Vinilo autoadhesivo</li>
                <li>✅ Materiales resistentes al intemperismo</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Garantía</h3>
              <ul className="space-y-2 text-blue-100">
                <li>✅ 1 año de garantía en todos los productos</li>
                <li>✅ Servicio de mantenimiento y postventa</li>
                <li>✅ Luminarias LED de larga durabilidad</li>
                <li>✅ Levantamiento, diseño y montaje incluido</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/presupuesto"
            className="inline-block bg-gradient-to-r from-primary to-blue-700 text-white px-10 py-4 rounded-full font-bold hover:shadow-lg transition-all transform hover:scale-105"
          >
            Solicitar Presupuesto →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Servicios;