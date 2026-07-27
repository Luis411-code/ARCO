// src/components/Contacto.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contacto = () => {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    const formData = new FormData(e.target);
    const datos = {
      nombre: formData.get('nombre'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      mensaje: formData.get('mensaje')
    };

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const resultado = await response.json();
      
      if (resultado.success) {
        setEnviado(true);
        e.target.reset();
        setTimeout(() => setEnviado(false), 5000);
      } else {
        setError(resultado.error || 'Error al enviar el mensaje');
      }
    } catch (err) {
      console.error('Error de conexión:', err);
      setError('Error de conexión. Intenta de nuevo.');
    }
    
    setCargando(false);
  };

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contacto</span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mt-2 mb-4">
            Contáctanos
          </h1>
          <p className="text-gray-600 text-lg">
            Estamos listos para ayudarte a dar vida a tus ideas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
              <h3 className="text-xl font-bold text-primary mb-6">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-secondary text-2xl">📞</span>
                  <div>
                    <p className="font-medium text-gray-800">Teléfonos</p>
                    <p className="text-gray-600">54330343</p>
                    <p className="text-gray-600">53785749</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-secondary text-2xl">👤</span>
                  <div>
                    <p className="font-medium text-gray-800">Contactos</p>
                    <p className="text-gray-600">TCP Héctor Alexander Pérez Coello</p>
                    <p className="text-gray-600">TCP Jose Carlos Vega Almaguer</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-secondary text-2xl">📍</span>
                  <div>
                    <p className="font-medium text-gray-800">Dirección</p>
                    <p className="text-gray-600">Calle Rastro No.117</p>
                    <p className="text-gray-600">esq. Luz Caballero, Holguín</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-secondary text-2xl">🕐</span>
                  <div>
                    <p className="font-medium text-gray-800">Horario</p>
                    <p className="text-gray-600">Lun - Vie: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-6">Envíanos un Mensaje</h3>
              
              {enviado ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="font-semibold">¡Mensaje enviado con éxito!</p>
                  <p className="text-sm mt-2">Nos pondremos en contacto contigo pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                      ❌ {error}
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input 
                      type="text" 
                      name="nombre"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="tel" 
                      name="telefono"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                    <textarea 
                      name="mensaje"
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={cargando}
                    className={`w-full bg-primary text-white py-3 rounded-lg font-semibold shadow-md transition-all ${
                      cargando 
                        ? 'opacity-70 cursor-not-allowed' 
                        : 'hover:bg-blue-800 hover:scale-[1.02]'
                    }`}
                  >
                    {cargando ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;