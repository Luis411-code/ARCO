// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect, useCallback } from 'react';
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
    descripcion: 'En ARCO transformamos ideas en soluciones gráficas de alto impacto. Con años de experiencia en el sector, ofrecemos productos de calidad con garantía de un año.',
    mision: 'Transformar las ideas de nuestros clientes en soluciones visuales de alto impacto, combinando creatividad, calidad y tecnología para superar sus expectativas.',
    historia: 'ARCO nace en Holguín con la misión de ofrecer soluciones integrales en artes gráficas y comunicación visual.',
    valores: [
      { icono: '🎨', titulo: 'Diseño Creativo', descripcion: 'Convertimos tus ideas en diseños únicos que capturan la esencia de tu marca.' },
      { icono: '🔧', titulo: 'Calidad Garantizada', descripcion: 'Materiales de primera calidad: PVC, acrílico y vinilo autoadhesivo. Garantía de 1 año.' },
      { icono: '📦', titulo: 'Soluciones Integrales', descripcion: 'Desde el diseño hasta la instalación, ofrecemos un servicio completo y personalizado.' }
    ]
  },
  serviciosDestacados: [
    { icono: '💡', titulo: 'Cartelería Lumínica', descripcion: 'Carteles con iluminación LED de bajo consumo, larga durabilidad y alta visibilidad.', link: '/servicios' },
    { icono: '🪧', titulo: 'Cartelería No Lumínica', descripcion: 'Carteles identificativos, señalética y rótulos para interiores y exteriores con materiales de alta resistencia.', link: '/servicios' },
    { icono: '🖨️', titulo: 'Impresión y Serigrafía', descripcion: 'Gigantografías, pendones, doyles, posavasos, cartas menú y serigrafía sobre textiles.', link: '/servicios' },
    { icono: '🔧', titulo: 'Levantamiento y Montaje', descripcion: 'Levantamiento, diseño, instalación, mantenimiento y ambientación de interiores y exteriores.', link: '/servicios' }
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

  const addServicioLocal = (servicio) => {
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

  const loadFromSupabase = useCallback(async () => {
    try {
      setCargando(true);
      const data = await loadAllData();
      
      if (data.configuracion) setConfiguracion(data.configuracion);
      if (data.hero) setHero(data.hero);
      if (data.sobreNosotros) setSobreNosotros(data.sobreNosotros);
      if (data.serviciosDestacados) setServiciosDestacados(data.serviciosDestacados);
      if (data.servicios) setServicios(data.servicios);
      if (data.testimonios) setTestimonios(data.testimonios);
      
      const pendientes = await getTestimoniosPendientes();
      setTestimoniosPendientes(pendientes);
      
      console.log('✅ Datos cargados desde Supabase correctamente');
      return { success: true, data };
    } catch (error) {
      console.error('❌ Error cargando desde Supabase:', error);
      return { success: false, error: error.message };
    } finally {
      setCargando(false);
    }
  }, []);

  const syncToSupabase = useCallback(async () => {
    try {
      setCargando(true);
      
      const data = {
        configuracion,
        hero,
        sobreNosotros,
        serviciosDestacados,
        servicios,
        testimonios
      };
      
      const result = await syncAllData(data);
      console.log('✅ Datos sincronizados a Supabase correctamente');
      return { success: true, result };
    } catch (error) {
      console.error('❌ Error sincronizando a Supabase:', error);
      return { success: false, error: error.message };
    } finally {
      setCargando(false);
    }
  }, [configuracion, hero, sobreNosotros, serviciosDestacados, servicios, testimonios]);

  const guardarMensaje = useCallback(async (mensaje) => {
    try {
      const nuevo = await createMensaje(mensaje);
      setMensajes(prev => [nuevo, ...prev]);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error('❌ Error guardando mensaje:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const guardarTestimonioPendiente = useCallback(async (testimonio) => {
    try {
      const nuevo = await createTestimonioPendiente(testimonio);
      setTestimoniosPendientes(prev => [nuevo, ...prev]);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error('❌ Error guardando testimonio:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const aprobarTestimonioConSupabase = useCallback(async (id) => {
    try {
      await aprobarTestimonio(id);
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
  }, []);

  const rechazarTestimonioConSupabase = useCallback(async (id) => {
    try {
      await rechazarTestimonio(id);
      const pendientes = await getTestimoniosPendientes();
      setTestimoniosPendientes(pendientes);
      return { success: true };
    } catch (error) {
      console.error('❌ Error rechazando testimonio:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const eliminarTestimonioConSupabase = useCallback(async (id) => {
    try {
      await deleteTestimonio(id);
      const aprobados = await getTestimonios(true);
      setTestimonios(aprobados);
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando testimonio:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const marcarMensajeLeido = useCallback(async (id) => {
    try {
      await marcarLeido(id);
      setMensajes(prev => prev.map(m => m.id === id ? { ...m, leido: true } : m));
      return { success: true };
    } catch (error) {
      console.error('❌ Error marcando mensaje como leído:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const marcarMensajeRespondido = useCallback(async (id) => {
    try {
      await marcarRespondido(id);
      setMensajes(prev => prev.map(m => m.id === id ? { ...m, respondido: true } : m));
      return { success: true };
    } catch (error) {
      console.error('❌ Error marcando mensaje como respondido:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const eliminarMensajeConSupabase = useCallback(async (id) => {
    try {
      await deleteMensaje(id);
      setMensajes(prev => prev.filter(m => m.id !== id));
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando mensaje:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const agregarServicio = useCallback(async (servicio) => {
    try {
      const nuevo = await createServicio(servicio);
      setServicios(prev => [nuevo, ...prev]);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error('❌ Error agregando servicio:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const actualizarServicio = useCallback(async (id, data) => {
    try {
      const actualizado = await updateServicio(id, data);
      setServicios(prev => prev.map(s => s.id === id ? actualizado : s));
      return { success: true, data: actualizado };
    } catch (error) {
      console.error('❌ Error actualizando servicio:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const eliminarServicio = useCallback(async (id) => {
    try {
      await deleteServicioDB(id);
      setServicios(prev => prev.filter(s => s.id !== id));
      return { success: true };
    } catch (error) {
      console.error('❌ Error eliminando servicio:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const actualizarConfiguracion = useCallback(async (data) => {
    try {
      const actualizado = await updateConfiguracion(data);
      setConfiguracion(actualizado);
      return { success: true, data: actualizado };
    } catch (error) {
      console.error('❌ Error actualizando configuración:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const actualizarHero = useCallback(async (data) => {
    try {
      const actualizado = await updateHero(data);
      setHero(actualizado);
      return { success: true, data: actualizado };
    } catch (error) {
      console.error('❌ Error actualizando hero:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const actualizarSobreNosotros = useCallback(async (data) => {
    try {
      const result = await updateSobreNosotrosDB(data);
      setSobreNosotros(data);
      return { success: true };
    } catch (error) {
      console.error('❌ Error actualizando sobre nosotros:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const actualizarServiciosDestacados = useCallback(async (data) => {
    try {
      await updateServiciosDestacados(data);
      setServiciosDestacados(data);
      return { success: true };
    } catch (error) {
      console.error('❌ Error actualizando servicios destacados:', error);
      return { success: false, error: error.message };
    }
  }, []);

  const value = {
    configuracion,
    hero,
    sobreNosotros,
    serviciosDestacados,
    servicios,
    testimonios,
    testimoniosPendientes,
    mensajes,
    cargando,

    setServicios,
    setTestimonios,
    setTestimoniosPendientes,
    setMensajes,

    updateConfiguracion: updateConfiguracionLocal,
    updateHero: updateHeroLocal,
    updateSobreNosotros: updateSobreNosotrosLocal,
    updateServiciosDestacados: updateServiciosDestacadosLocal,
    addServicio: addServicioLocal,
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