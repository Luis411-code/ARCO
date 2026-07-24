import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // 👈 IMPORTANTE

const About = () => {
  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Nosotros</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Sobre ARCO
          </h1>
          <p className="text-gray-600 text-lg">
            Publicidad y Comunicación Gráfica con años de experiencia en el sector.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-md"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Nuestra Historia</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ARCO nace en Holguín con la misión de ofrecer soluciones integrales 
              en artes gráficas y comunicación visual. Con un equipo de profesionales 
              apasionados por el diseño y la publicidad, hemos logrado posicionarnos 
              como una empresa de confianza en la región.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nos especializamos en la creación de cartelería, señalética, impresión 
              y diseño gráfico, utilizando materiales de alta calidad como PVC, 
              acrílico y vinilo autoadhesivo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-primary text-white rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-secondary mb-4">Nuestra Misión</h2>
            <p className="text-blue-100 leading-relaxed">
              Transformar las ideas de nuestros clientes en soluciones visuales de 
              alto impacto, combinando creatividad, calidad y tecnología para 
              superar sus expectativas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-md"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-bold text-primary">Calidad</h3>
                <p className="text-sm text-gray-600">Materiales de primera y garantía de 1 año.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🤝</div>
                <h3 className="font-bold text-primary">Confianza</h3>
                <p className="text-sm text-gray-600">Compromiso y transparencia con nuestros clientes.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💡</div>
                <h3 className="font-bold text-primary">Creatividad</h3>
                <p className="text-sm text-gray-600">Soluciones innovadoras y personalizadas.</p>
              </div>
            </div>
          </motion.div>

          {/* ===== CTA CORREGIDO: Link de React Router ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-gradient-to-r from-primary to-blue-700 text-white rounded-2xl p-8 md:p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-secondary mb-4">¿Tienes un proyecto en mente?</h2>
            <p className="text-blue-100 mb-6">
              Contáctanos y hagamos realidad tus ideas.
            </p>
            <Link
              to="/contacto"
              className="inline-block bg-secondary text-primary px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg"
            >
              Contáctanos
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;