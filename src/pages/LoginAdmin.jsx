// src/pages/LoginAdmin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.email === 'admin@arco.cu' && credentials.password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true');
      navigate('/dashboard');
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-blue-800 to-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto overflow-hidden rounded-full shadow-xl shadow-secondary/20 border-2 border-secondary/30">
            <img src="/logo.png" alt="ARCO" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-primary mt-4">Panel de Administración</h1>
          <p className="text-gray-500 text-sm">Accede para gestionar tu sitio web</p>
        </div>

        {error && <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-4 text-sm">❌ {error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              placeholder="admin@arco.cu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-blue-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-[1.02]"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">Credenciales: admin@arco.cu / admin123</p>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;