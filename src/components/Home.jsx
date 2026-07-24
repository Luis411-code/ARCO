import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeroVisualLite from './HeroVisualLite';

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [estadisticas, setEstadisticas] = useState({
    proyectos: 0,
    clientes: 0,
    garantia: 0
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setEstadisticas({
          proyectos: 150,
          clientes: 80,
          garantia: 1
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <div className="overflow-hidden">
      {/* ===== HERO - PANTALLA COMPLETA ===== */}
      <HeroVisualLite />

      {/* ===== SECCIÓN "SOBRE NOSOTROS" ===== */}
      <section className="py-20 bg-white" ref={ref}>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Sobre nosotros</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
              Expertos en Comunicación Visual
            </h2>
            <p className="text-gray-600 leading-relaxed">
              En ARCO transformamos ideas en soluciones gráficas de alto impacto. 
              Con años de experiencia en el sector, ofrecemos productos de calidad 
              con garantía de un año.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Diseño Creativo",
                desc: "Convertimos tus ideas en diseños únicos que capturan la esencia de tu marca."
              },
              {
                icon: "🔧",
                title: "Calidad Garantizada",
                desc: "Materiales de primera calidad: PVC, acrílico y vinilo autoadhesivo. Garantía de 1 año."
              },
              {
                icon: "📦",
                title: "Soluciones Integrales",
                desc: "Desde el diseño hasta la instalación, ofrecemos un servicio completo y personalizado."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={scaleUp}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Estadísticas */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-secondary">{estadisticas.proyectos}+</div>
              <div className="text-sm text-gray-500">Proyectos Realizados</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-secondary">{estadisticas.clientes}+</div>
              <div className="text-sm text-gray-500">Clientes Satisfechos</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 text-center col-span-2 md:col-span-1">
              <div className="text-4xl font-bold text-secondary">{estadisticas.garantia} Año</div>
              <div className="text-sm text-gray-500">Garantía en Productos</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECCIÓN DE SERVICIOS DESTACADOS ===== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Especialidades</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
              Nuestros Servicios Destacados
            </h2>
            <p className="text-gray-600">
              Ofrecemos una amplia gama de productos y servicios en artes gráficas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🪧",
                title: "Cartelería",
                desc: "Carteles lumínicos y no lumínicos, identificativos y señalética."
              },
              {
                icon: "🖨️",
                title: "Impresión",
                desc: "Gigantografías, pendones, doyles, posavasos y cartas menú."
              },
              {
                icon: "🎯",
                title: "Diseño Gráfico",
                desc: "Tarjetas de presentación, invitaciones, estafetas y credenciales."
              },
              {
                icon: "🏗️",
                title: "Montaje",
                desc: "Instalación, mantenimiento y ambientación de interiores y exteriores."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleUp}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-primary to-blue-700 w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white">{service.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                <Link to="/servicios" className="text-secondary font-semibold text-sm inline-flex items-center gap-1 mt-3 hover:gap-2 transition-all">
                  Saber más →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Listo para dar vida a tus ideas?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Contáctanos y descubre cómo podemos transformar tus proyectos en 
              realidades visuales de alto impacto.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contacto" 
                className="bg-secondary text-primary px-10 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
              >
                Solicitar Presupuesto
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                to="/servicios" 
                className="bg-white/10 backdrop-blur-sm text-white px-10 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/20 transition-all"
              >
                Ver Servicios
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;