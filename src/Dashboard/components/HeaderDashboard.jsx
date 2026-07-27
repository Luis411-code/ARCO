import { useState } from 'react';
import { Link } from 'react-router-dom';

const HeaderDashboard = ({ 
  setIsSidebarOpen, 
  isSidebarOpen, 
  onLogout, 
  onRefresh,
  refreshing 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-primary">Panel de Administración</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* ===== BOTÓN DE ACTUALIZACIÓN CON INDICADOR ===== */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`p-2 rounded-lg transition-all duration-300 relative ${
            refreshing 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-105'
          }`}
          title="Actualizar datos del panel"
        >
          <svg 
            className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </svg>
          {/* Punto indicador de actualización */}
          {refreshing && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </button>

        {/* Fecha y hora */}
        <span className="text-sm text-gray-500 hidden sm:block">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
          })}
        </span>

        {/* Perfil */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="hidden sm:block">Admin</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
              <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                Ver sitio web
              </Link>
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;