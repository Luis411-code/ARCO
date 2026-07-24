import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Ubicacion = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Coordenadas de Holguín (actualizar con ubicación exacta de ARCO)
  const lat = 20.8872;
  const lng = -76.2631;
  const direccion = "Calle Rastro No.117, esq. Luz Caballero, Holguín, Cuba";

  const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15140.123456789!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat}%2C${lng}!5e0!3m2!1ses!2scu!4v1700000000000`;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Ubicación</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-3">
            Encuéntranos en Holguín
          </h2>
          <p className="text-gray-600">
            Estamos ubicados en el centro de Holguín, listos para atenderte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <iframe
                src={embedUrl}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de ARCO"
                className="w-full"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-gray-600 shadow-md">
                📍 Google Maps
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span>📍</span> Nuestra Ubicación
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-secondary text-lg">📌</span>
                  <div>
                    <p className="font-medium text-gray-800">Dirección</p>
                    <p className="text-gray-600 text-sm">{direccion}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-secondary text-lg">📞</span>
                  <div>
                    <p className="font-medium text-gray-800">Teléfonos</p>
                    <p className="text-gray-600 text-sm">54330343</p>
                    <p className="text-gray-600 text-sm">53785749</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-secondary text-lg">🕐</span>
                  <div>
                    <p className="font-medium text-gray-800">Horario</p>
                    <p className="text-gray-600 text-sm">Lun - Vie: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
              >
                <span>🗺️</span>
                Ver en Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Ubicacion;