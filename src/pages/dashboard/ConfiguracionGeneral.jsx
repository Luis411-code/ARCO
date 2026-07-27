import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

const ConfiguracionGeneral = () => {
  const { configuracion, updateConfiguracion } = useAppContext();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      nombreEmpresa: formData.get('nombreEmpresa'),
      slogan: formData.get('slogan'),
      telefono1: formData.get('telefono1'),
      telefono2: formData.get('telefono2'),
      whatsapp: formData.get('whatsapp'),
      direccion: formData.get('direccion'),
      email: formData.get('email'),
      horario: formData.get('horario'),
      adminEmail: formData.get('adminEmail'),
      adminPassword: formData.get('adminPassword')
    };
    updateConfiguracion(data);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">⚙️ Configuración General</h2>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200"
        >
          ✅ Configuración guardada exitosamente
        </motion.div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-semibold text-primary">Datos de la Empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
              <input
                type="text"
                name="nombreEmpresa"
                defaultValue={configuracion.nombreEmpresa}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slogan</label>
              <input
                type="text"
                name="slogan"
                defaultValue={configuracion.slogan}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono 1</label>
              <input
                type="text"
                name="telefono1"
                defaultValue={configuracion.telefono1}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono 2</label>
              <input
                type="text"
                name="telefono2"
                defaultValue={configuracion.telefono2}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                defaultValue={configuracion.whatsapp}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={configuracion.email}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              name="direccion"
              defaultValue={configuracion.direccion}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
            <input
              type="text"
              name="horario"
              defaultValue={configuracion.horario}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
            />
          </div>

          <hr className="my-4" />
          <h3 className="font-semibold text-primary">🔐 Credenciales del Administrador</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Admin</label>
              <input
                type="email"
                name="adminEmail"
                defaultValue={configuracion.adminEmail}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Admin</label>
              <div className="flex gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="adminPassword"
                  defaultValue={configuracion.adminPassword}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Cambia esta contraseña para mayor seguridad</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-primary to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Guardar Configuración
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfiguracionGeneral;