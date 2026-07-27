import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Servicios = () => {
  const { servicios, configuracion } = useAppContext();

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
            <span className="font-bold text-secondary">{servicios.length}</span> productos y servicios en artes gráficas para cubrir todas 
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
              key={servicio.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Imagen de muestra - SOPORTE PARA BASE64 */}
              <div className="relative h-40 overflow-hidden bg-gray-100">
                {servicio.imagenes && servicio.imagenes.length > 0 ? (
                  <img
                    src={servicio.imagenes[0]}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-20 bg-gradient-to-br from-gray-100 to-gray-200">
                    {servicio.icono || '📋'}
                  </div>
                )}
                {/* Badge de categoría */}
                <div className="absolute top-2 left-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                  {servicio.categoria || 'General'}
                </div>
                {/* Badge de precio */}
                <div className="absolute bottom-2 right-2 bg-secondary/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {servicio.precio || 'Consultar'}
                </div>
                {/* Miniaturas adicionales */}
                {servicio.imagenes && servicio.imagenes.length > 1 && (
                  <div className="absolute bottom-2 left-2 flex gap-1">
                    {servicio.imagenes.slice(1, 3).map((img, idx) => (
                      <div key={idx} className="w-6 h-6 rounded border border-white/50 overflow-hidden">
                        <img
                          src={img}
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
                  <span className="text-2xl">{servicio.icono || '📋'}</span>
                  <h3 className="text-base font-bold text-primary leading-tight">{servicio.titulo}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{servicio.desc}</p>
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