// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Sidebar from './dashboard/Sidebar';
import HeaderDashboard from './dashboard/HeaderDashboard';
import Statistics from './dashboard/Statistics';
import ServiciosManager from './dashboard/ServiciosManager';
import TestimoniosManager from './dashboard/TestimoniosManager';
import ConfiguracionGeneral from './dashboard/ConfiguracionGeneral';
import MensajesManager from './dashboard/MensajesManager';
import HeroManager from './dashboard/HeroManager';
import SobreNosotrosManager from './dashboard/SobreNosotrosManager';
import ServiciosDestacadosManager from './dashboard/ServiciosDestacadosManager';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('estadisticas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const { 
    setServicios,
    setTestimonios,
    setTestimoniosPendientes,
    setMensajes,
    setConfiguracion,
    setHero,
    setSobreNosotros,
    setServiciosDestacados,
    syncToMongoDB,
    loadFromMongoDB
  } = useAppContext();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  // ===== REFRESCAR DATOS LOCAL =====
  const handleRefresh = () => {
    setRefreshing(true);

    try {
      const savedServicios = localStorage.getItem('arco_servicios');
      const savedTestimonios = localStorage.getItem('arco_testimonios');
      const savedTestimoniosPendientes = localStorage.getItem('arco_testimonios_pendientes');
      const savedMensajes = localStorage.getItem('arco_mensajes');
      const savedConfiguracion = localStorage.getItem('arco_configuracion');
      const savedHero = localStorage.getItem('arco_hero');
      const savedSobreNosotros = localStorage.getItem('arco_sobre_nosotros');
      const savedServiciosDestacados = localStorage.getItem('arco_servicios_destacados');

      if (savedServicios) setServicios(JSON.parse(savedServicios));
      if (savedTestimonios) setTestimonios(JSON.parse(savedTestimonios));
      if (savedTestimoniosPendientes) setTestimoniosPendientes(JSON.parse(savedTestimoniosPendientes));
      if (savedMensajes) setMensajes(JSON.parse(savedMensajes));
      if (savedConfiguracion) setConfiguracion(JSON.parse(savedConfiguracion));
      if (savedHero) setHero(JSON.parse(savedHero));
      if (savedSobreNosotros) setSobreNosotros(JSON.parse(savedSobreNosotros));
      if (savedServiciosDestacados) setServiciosDestacados(JSON.parse(savedServiciosDestacados));

      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('Error al recargar datos:', error);
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 600);
  };

  // ===== SINCRONIZAR A MONGODB =====
  const handleSyncToCloud = async () => {
    setSyncing(true);
    const result = await syncToMongoDB();
    if (result.success) {
      alert('✅ Datos sincronizados con MongoDB correctamente');
    } else {
      alert('❌ Error al sincronizar: ' + result.error);
    }
    setSyncing(false);
  };

  // ===== CARGAR DESDE MONGODB =====
  const handleLoadFromCloud = async () => {
    setSyncing(true);
    const result = await loadFromMongoDB();
    if (result.success) {
      alert('✅ Datos cargados desde MongoDB correctamente');
      setRefreshKey(prev => prev + 1);
    } else {
      alert('❌ Error al cargar: ' + result.error);
    }
    setSyncing(false);
  };

  const renderContent = () => {
    const key = `${activeTab}-${refreshKey}`;
    
    switch (activeTab) {
      case 'estadisticas':
        return <Statistics key={key} />;
      case 'hero':
        return <HeroManager key={key} />;
      case 'servicios-destacados':
        return <ServiciosDestacadosManager key={key} />;
      case 'servicios':
        return <ServiciosManager key={key} />;
      case 'testimonios':
        return <TestimoniosManager key={key} />;
      case 'nosotros':
        return <SobreNosotrosManager key={key} />;
      case 'configuracion':
        return <ConfiguracionGeneral key={key} />;
      case 'mensajes':
        return <MensajesManager key={key} />;
      default:
        return <Statistics key={key} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderDashboard 
          setIsSidebarOpen={setIsSidebarOpen} 
          isSidebarOpen={isSidebarOpen}
          onLogout={handleLogout}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onSyncToCloud={handleSyncToCloud}
          onLoadFromCloud={handleLoadFromCloud}
          syncing={syncing}
        />
        <motion.main 
          key={activeTab + refreshKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-6"
        >
          {renderContent()}
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;