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

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        setEnviado(true);
        form.reset();
        setTimeout(() => setEnviado(false), 5000);
      } else {
        setError('Error al enviar el mensaje. Intenta de nuevo.');
      }
    } catch (err) {
      setError('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
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
                    <a href="tel:54330343" className="text-gray-600 hover:text-secondary transition-colors">54330343</a>
                    <br />
                    <a href="tel:53785749" className="text-gray-600 hover:text-secondary transition-colors">53785749</a>
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

              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="https://wa.me/5354330343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shadow-md"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
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
              ) : error ? (
                <div className="bg-red-50 text-red-700 p-6 rounded-xl text-center">
                  <div className="text-4xl mb-3">❌</div>
                  <p className="font-semibold">{error}</p>
                  <p className="text-sm mt-2">Por favor, intenta de nuevo.</p>
                </div>
              ) : (
                <form 
                  name="contacto" 
                  method="POST" 
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* ===== CAMPO OCULTO PARA NETLIFY ===== */}
                  <input type="hidden" name="form-name" value="contacto" />
                  <input type="hidden" name="bot-field" />

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
                    className={`w-full py-3 rounded-lg font-semibold transition-all transform hover:scale-[1.02] shadow-md ${
                      cargando 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary to-blue-700 text-white hover:shadow-lg'
                    }`}
                  >
                    {cargando ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      'Enviar Mensaje'
                    )}
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