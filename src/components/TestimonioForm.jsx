import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const TestimonioForm = () => {
  const { addTestimonioPendiente } = useAppContext();
  const navigate = useNavigate();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    reseña: '',
    calificacion: 5
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(true);

    // Generar foto con UI Avatars
    const foto = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nombre)}&background=0a3d6b&color=fff&size=100`;

    addTestimonioPendiente({
      nombre: formData.nombre,
      empresa: formData.empresa || 'Cliente',
      reseña: formData.reseña,
      calificacion: parseInt(formData.calificacion),
      foto: foto
    });

    setCargando(false);
    setEnviado(true);
    setFormData({ nombre: '', empresa: '', reseña: '', calificacion: 5 });

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            ✍️ Deja tu Testimonio
          </h1>
          <p className="text-gray-600">
            Tu opinión nos ayuda a mejorar y a otros clientes a conocernos mejor.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Tu testimonio será revisado antes de publicarse.
          </p>
        </motion.div>

        {enviado ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
          >
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">¡Testimonio Enviado!</h2>
            <p className="text-green-600">
              Gracias por tu opinión. Tu testimonio será revisado y publicado pronto.
            </p>
            <p className="text-sm text-gray-400 mt-4">Redirigiendo al inicio...</p>
          </motion.div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Empresa / Negocio
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calificación *
                </label>
                <select
                  name="calificacion"
                  value={formData.calificacion}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                >
                  <option value="5">⭐⭐⭐⭐⭐ - Excelente</option>
                  <option value="4">⭐⭐⭐⭐ - Muy bueno</option>
                  <option value="3">⭐⭐⭐ - Bueno</option>
                  <option value="2">⭐⭐ - Regular</option>
                  <option value="1">⭐ - Malo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tu testimonio *
                </label>
                <textarea
                  name="reseña"
                  value={formData.reseña}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                  placeholder="Cuéntanos tu experiencia con ARCO..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={cargando}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] ${
                    cargando 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-primary to-blue-700 text-white hover:shadow-lg'
                  }`}
                >
                  {cargando ? 'Enviando...' : 'Enviar Testimonio ✨'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonioForm;