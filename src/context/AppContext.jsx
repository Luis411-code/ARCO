// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { 
  loadAllData, 
  syncAllData,
  createMensaje,
  createTestimonioPendiente,
  aprobarTestimonio,
  rechazarTestimonio,
  deleteTestimonio,
  deleteMensaje,
  marcarLeido,
  marcarRespondido,
  getTestimoniosPendientes,
  getTestimonios,
  getServicios,
  createServicio,
  updateServicio,
  deleteServicio as deleteServicioDB,
  updateConfiguracion,
  updateHero,
  updateSobreNosotros as updateSobreNosotrosDB,
  updateValores,
  updateServiciosDestacados,
  getConfiguracion,
  getHero,
  getSobreNosotros,
  getServiciosDestacados
} from '../services/supabaseService';

// ===== DATOS INICIALES =====
const initialData = {
  configuracion: {
    nombre_empresa: 'ARCO',
    slogan: 'Publicidad y Comunicación Gráfica',
    telefono1: '54330343',
    telefono2: '53785749',
    whatsapp: '5359342808',
    direccion: 'Calle Rastro No.117 esq. Luz Caballero, Holguín',
    email: 'info@arco.cu',
    horario: 'Lun - Vie: 8:00 AM - 6:00 PM',
    admin_email: 'admin@arco.cu',
    admin_password: 'admin123'
  },
  hero: {
    titulo: 'Transformamos tus',
    subtitulo: 'ideas en impacto visual',
    descripcion: 'Soluciones integrales en artes gráficas: cartelería, señalética, impresión y diseño. Calidad y garantía en cada proyecto.',
    boton_texto: 'Ver Servicios',
    boton_link: '/servicios',
    etiqueta: '🎯 Publicidad y Comunicación Gráfica'
  },
  sobreNosotros: {
    titulo: 'Expertos en Comunicación Visual',
    descripcion: 'En ARCO transformamos ideas en soluciones gráficas de alto impacto.',
    mision: 'Transformar las ideas de nuestros clientes en soluciones visuales de alto impacto.',
    historia: 'ARCO nace en Holguín con la misión de ofrecer soluciones integrales en artes gráficas.',
    valores: [
      { icono: '🎨', titulo: 'Diseño Creativo', descripcion: 'Convertimos tus ideas en diseños únicos.' },
      { icono: '🔧', titulo: 'Calidad Garantizada', descripcion: 'Materiales de primera calidad. Garantía de 1 año.' },
      { icono: '📦', titulo: 'Soluciones Integrales', descripcion: 'Desde el diseño hasta la instalación.' }
    ]
  },
  serviciosDestacados: [
    { icono: '💡', titulo: 'Cartelería Lumínica', descripcion: 'Carteles con iluminación LED.', link: '/servicios' },
    { icono: '🪧', titulo: 'Cartelería No Lumínica', descripcion: 'Carteles identificativos y señalética.', link: '/servicios' },
    { icono: '🖨️', titulo: 'Impresión y Serigrafía', descripcion: 'Gigantografías y serigrafía.', link: '/servicios' },
    { icono: '🔧', titulo: 'Levantamiento y Montaje', descripcion: 'Instalación y mantenimiento.', link: '/servicios' }
  ],
  servicios: [],
  testimonios: [],
  testimoniosPendientes: [],
  mensajes: []
};

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // ===== ESTADOS =====
  const [configuracion, setConfiguracion] = useState(() => {
    const saved = localStorage.getItem('arco_configuracion');
    return saved ? JSON.parse(saved) : initialData.configuracion;
  });

  const [hero, setHero] = useState(() => {
    const saved = localStorage.getItem('arco_hero');
    return saved ? JSON.parse(saved) : initialData.hero;
  });

  const [sobreNosotros, setSobreNosotros] = useState(() => {
    const saved = localStorage.getItem('arco_sobre_nosotros');
    return saved ? JSON.parse(saved) : initialData.sobreNosotros;
  });

  const [serviciosDestacados, setServiciosDestacados] = useState(() => {
    const saved = localStorage.getItem('arco_servicios_destacados');
    return saved ? JSON.parse(saved) : initialData.serviciosDestacados;
  });

  const [servicios, setServicios] = useState(() => {
    const saved = localStorage.getItem('arco_servicios');
    return saved ? JSON.parse(saved) : initialData.servicios;
  });

  const [testimonios, setTestimonios] = useState(() => {
    const saved = localStorage.getItem('arco_testimonios');
    return saved ? JSON.parse(saved) : initialData.testimonios;
  });

  const [testimoniosPendientes, setTestimoniosPendientes] = useState(() => {
    const saved = localStorage.getItem('arco_testimonios_pendientes');
    return saved ? JSON.parse(saved) : initialData.testimoniosPendientes;
  });

  const [mensajes, setMensajes] = useState(() => {
    const saved = localStorage.getItem('arco_mensajes');
    return saved ? JSON.parse(saved) : initialData.mensajes;
  });

  const [cargando, setCargando] = useState(false);

  // ===== GUARDAR EN LOCALSTORAGE =====
  useEffect(() => {
    localStorage.setItem('arco_configuracion', JSON.stringify(configuracion));
  }, [configuracion]);

  useEffect(() => {
    localStorage.setItem('arco_hero', JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem('arco_sobre_nosotros', JSON.stringify(sobreNosotros));
  }, [sobreNosotros]);

  useEffect(() => {
    localStorage.setItem('arco_servicios_destacados', JSON.stringify(serviciosDestacados));
  }, [serviciosDestacados]);

  useEffect(() => {
    localStorage.setItem('arco_servicios', JSON.stringify(servicios));
  }, [servicios]);

  useEffect(() => {
    localStorage.setItem('arco_testimonios', JSON.stringify(testimonios));
  }, [testimonios]);

  useEffect(() => {
    localStorage.setItem('arco_testimonios_pendientes', JSON.stringify(testimoniosPendientes));
  }, [testimoniosPendientes]);

  useEffect(() => {
    localStorage.setItem('arco_mensajes', JSON.stringify(mensajes));
  }, [mensajes]);

  // ===== FUNCIONES LOCALES =====
  const updateConfiguracionLocal = (data) => {
    setConfiguracion({ ...configuracion, ...data });
  };

  const updateHeroLocal = (data) => {
    setHero({ ...hero, ...data });
  };

  const updateSobreNosotrosLocal = (data) => {
    setSobreNosotros({ ...sobreNosotros, ...data });
  };

  const updateServiciosDestacadosLocal = (data) => {
    setServiciosDestacados(data);
  };

  const addServicio = (servicio) => {
    const newId = Date.now().toString();
    setServicios([...servicios, { ...servicio, id: newId }]);
  };

  const updateServicioLocal = (id, updatedData) => {
    setServicios(servicios.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteServicioLocal = (id) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  const deleteTestimonioLocal = (id) => {
    setTestimonios(testimonios.filter(t => t.id !== id));
  };

  const addTestimonioPendienteLocal = (testimonio) => {
    const newTestimonio = {
      id: Date.now(),
      ...testimonio,
      fecha: new Date().toISOString(),
      aprobado: false
    };
    setTestimoniosPendientes([newTestimonio, ...testimoniosPendientes]);
    return newTestimonio;
  };

  const aprobarTestimonioLocal = (id) => {
    const testimonio = testimoniosPendientes.find(t => t.id === id);
    if (testimonio) {
      setTestimoniosPendientes(testimoniosPendientes.filter(t => t.id !== id));
      setTestimonios([{ ...testimonio, aprobado: true }, ...testimonios]);
    }
  };

  const rechazarTestimonioLocal = (id) => {
    setTestimoniosPendientes(testimoniosPendientes.filter(t => t.id !== id));
  };

  const addMensajeLocal = (mensaje) => {
    const newMensaje = {
      id: Date.now(),
      ...mensaje,
      fecha: new Date().toISOString(),
      leido: false,
      respondido: false
    };
    setMensajes([newMensaje, ...mensajes]);
    return newMensaje;
  };

  const marcarLeidoLocal = (id) => {
    setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: true } : m));
  };

  const marcarRespondidoLocal = (id) => {
    setMensajes(mensajes.map(m => m.id === id ? { ...m, respondido: true } : m));
  };

  const deleteMensajeLocal = (id) => {
    setMensajes(mensajes.filter(m => m.id !== id));
  };

  // ============================================================
  //  🗄️ FUNCIONES PARA SUPABASE (CON SINCRONIZACIÓN)
  // ============================================================

  // ===== CARGAR DATOS DESDE SUPABASE =====
  const loadFromSupabase = async () => {
    try {
      setCargando(true);
      const data = await loadAllData();
      
      if (data.configuracion) setConfiguracion(data.configuracion);
      if (data.hero) setHero(data.hero);
      if (data.sobreNosotros) setSobreNosotros(data.sobreNosotros);
      if (data.serviciosDestacados) setServiciosDestacados(data.serviciosDestacados);
      if (data.servicios) setServicios(data.servicios);
      if (data.testimonios) setTestimonios(data.testimonios);
      
      // Cargar testimonios pendientes
      const pendientes = await getTestimoniosPendientes();
      setTestimoniosPendientes(pendientes);
      
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error cargando desde Supabase:', error);
      return { success: false, error: error.message };
    } finally {
      setCargando(false);
    }
  };

  // ===== SINCRONIZAR DATOS A SUPABASE =====
  const syncToSupabase = async () => {
    try {
      setCargando(true);
      
      // Preparar datos
      const data = {
        configuracion,
        hero,
        sobreNosotros,
        serviciosDestacados,
        servicios,
        testimonios
      };
      
      const result = await syncAllData(data);
      return { success: true, result };
    } catch (error) {
      console.error('❌ Error sincronizando a Supabase:', error);
      return { success: false, error: error.message };
    } finally {
      setCargando(false);
    }
  };

  // ===== FUNCIONES CON SUPABASE (CRUD) =====
  
  const guardarMensaje = async (mensaje) => {
    try {
      const nuevo = await createMensaje(mensaje);
      setMensajes([nuevo, ...mensajes]);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error('❌ Error guardando mensaje:', error);
      return { success: false, error: error.message };
    }
  };

  const guardarTestimonioPendiente = async (testimonio) => {
    try {
      const nuevo = await createTestimonioPendiente(testimonio);
      setTestimoniosPendientes([nuevo, ...testimoniosPendientes]);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error('❌ Error guardando testimonio:', error);
      return { success: false, error: error.message };
    }
  };

  const aprobarTestimonioConSupabase = async (id) => {
    try {
      await aprobarTestimonio(id);
      // Recargar listas
      const [aprobados, pendientes] = await Promise.all([
        getTestimonios(true),
        getTestimoniosPendientes()
      ]);
      setTestimonios(aprobados);
      setTestimoniosPendientes(pendientes);
      return { success: true };
    } catch (error) {
      console.error('❌ Error aprobando testimonio:', error);
      return { success: false, error: error.message };
    }
  };

  const rechazarTestimonioConSupabase = async (id) => {
    try {
      await rechazarTestimonio(id);
      const pendientes = await getTestimoniosPendientes();
      setTestimoniosPendientes(pendientes);
      return { success: true };
    } catch (error) {
      console.error('❌ Error rechazando testimonio:', error);
      return { success: false, error: error.message };
    }
  };

  const eliminarTestimonioConSupabase = async (id) => {
    try {
      await deleteTestimonio(id);
      const aprobados = await getTestimonios(true);
      setTestimonios(aprobados);
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando testimonio:', error);
      return { success: false, error: error.message };
    }
  };

  const marcarMensajeLeido = async (id) => {
    try {
      await marcarLeido(id);
      setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: true } : m));
      return { success: true };
    } catch (error) {
      console.error('❌ Error marcando mensaje como leído:', error);
      return { success: false, error: error.message };
    }
  };

  const marcarMensajeRespondido = async (id) => {
    try {
      await marcarRespondido(id);
      setMensajes(mensajes.map(m => m.id === id ? { ...m, respondido: true } : m));
      return { success: true };
    } catch (error) {
      console.error('❌ Error marcando mensaje como respondido:', error);
      return { success: false, error: error.message };
    }
  };

  const eliminarMensajeConSupabase = async (id) => {
    try {
      await deleteMensaje(id);
      setMensajes(mensajes.filter(m => m.id !== id));
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando mensaje:', error);
      return { success: false, error: error.message };
    }
  };

  // ===== FUNCIONES PARA SERVICIOS CON SUPABASE =====
  const agregarServicio = async (servicio) => {
    try {
      const nuevo = await createServicio(servicio);
      setServicios([nuevo, ...servicios]);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error('❌ Error agregando servicio:', error);
      return { success: false, error: error.message };
    }
  };

  const actualizarServicio = async (id, data) => {
    try {
      const actualizado = await updateServicio(id, data);
      setServicios(servicios.map(s => s.id === id ? actualizado : s));
      return { success: true, data: actualizado };
    } catch (error) {
      console.error('❌ Error actualizando servicio:', error);
      return { success: false, error: error.message };
    }
  };

  const eliminarServicio = async (id) => {
    try {
      await deleteServicioDB(id);
      setServicios(servicios.filter(s => s.id !== id));
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando servicio:', error);
      return { success: false, error: error.message };
    }
  };

  // ===== FUNCIONES DE CONFIGURACIÓN CON SUPABASE =====
  const actualizarConfiguracion = async (data) => {
    try {
      const actualizado = await updateConfiguracion(data);
      setConfiguracion(actualizado);
      return { success: true, data: actualizado };
    } catch (error) {
      console.error('❌ Error actualizando configuración:', error);
      return { success: false, error: error.message };
    }
  };

  const actualizarHero = async (data) => {
    try {
      const actualizado = await updateHero(data);
      setHero(actualizado);
      return { success: true, data: actualizado };
    } catch (error) {
      console.error('❌ Error actualizando hero:', error);
      return { success: false, error: error.message };
    }
  };

  const actualizarSobreNosotros = async (data) => {
    try {
      await updateSobreNosotrosDB(data);
      if (data.valores) {
        await updateValores(data.valores);
      }
      setSobreNosotros(data);
      return { success: true };
    } catch (error) {
      console.error('❌ Error actualizando sobre nosotros:', error);
      return { success: false, error: error.message };
    }
  };

  const actualizarServiciosDestacados = async (data) => {
    try {
      await updateServiciosDestacados(data);
      setServiciosDestacados(data);
      return { success: true };
    } catch (error) {
      console.error('❌ Error actualizando servicios destacados:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    // ===== DATOS =====
    configuracion,
    hero,
    sobreNosotros,
    serviciosDestacados,
    servicios,
    testimonios,
    testimoniosPendientes,
    mensajes,
    cargando,

    // ===== SETTERS (para uso local) =====
    setServicios,
    setTestimonios,
    setTestimoniosPendientes,
    setMensajes,

    // ===== FUNCIONES LOCALES (para el dashboard) =====
    updateConfiguracion: updateConfiguracionLocal,
    updateHero: updateHeroLocal,
    updateSobreNosotros: updateSobreNosotrosLocal,
    updateServiciosDestacados: updateServiciosDestacadosLocal,
    addServicio,
    updateServicio: updateServicioLocal,
    deleteServicio: deleteServicioLocal,
    deleteTestimonio: deleteTestimonioLocal,
    addTestimonioPendiente: addTestimonioPendienteLocal,
    aprobarTestimonio: aprobarTestimonioLocal,
    rechazarTestimonio: rechazarTestimonioLocal,
    addMensaje: addMensajeLocal,
    marcarLeido: marcarLeidoLocal,
    marcarRespondido: marcarRespondidoLocal,
    deleteMensaje: deleteMensajeLocal,

    // ===== FUNCIONES CON SUPABASE =====
    loadFromSupabase,
    syncToSupabase,
    guardarMensaje,
    guardarTestimonioPendiente,
    aprobarTestimonioConSupabase,
    rechazarTestimonioConSupabase,
    eliminarTestimonioConSupabase,
    marcarMensajeLeido,
    marcarMensajeRespondido,
    eliminarMensajeConSupabase,
    agregarServicio,
    actualizarServicio,
    eliminarServicio,
    actualizarConfiguracion,
    actualizarHero,
    actualizarSobreNosotros,
    actualizarServiciosDestacados
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;