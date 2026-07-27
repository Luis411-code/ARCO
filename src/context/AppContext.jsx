// src/context/AppContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/apiService';

// ===== DATOS INICIALES =====
const initialData = {
  configuracion: {
    nombreEmpresa: 'ARCO',
    slogan: 'Publicidad y Comunicación Gráfica',
    telefono1: '54330343',
    telefono2: '53785749',
    whatsapp: '5359342808',
    direccion: 'Calle Rastro No.117 esq. Luz Caballero, Holguín',
    email: 'info@arco.cu',
    horario: 'Lun - Vie: 8:00 AM - 6:00 PM',
    adminEmail: 'admin@arco.cu',
    adminPassword: 'admin123'
  },

  hero: {
    titulo: 'Transformamos tus',
    subtitulo: 'ideas en impacto visual',
    descripcion: 'Soluciones integrales en artes gráficas: cartelería, señalética, impresión y diseño. Calidad y garantía en cada proyecto.',
    botonTexto: 'Ver Servicios',
    botonLink: '/servicios',
    etiqueta: '🎯 Publicidad y Comunicación Gráfica'
  },

  sobreNosotros: {
    titulo: 'Expertos en Comunicación Visual',
    descripcion: 'En ARCO transformamos ideas en soluciones gráficas de alto impacto. Con años de experiencia en el sector, ofrecemos productos de calidad con garantía de un año.',
    valores: [
      { icono: '🎨', titulo: 'Diseño Creativo', descripcion: 'Convertimos tus ideas en diseños únicos que capturan la esencia de tu marca.' },
      { icono: '🔧', titulo: 'Calidad Garantizada', descripcion: 'Materiales de primera calidad: PVC, acrílico y vinilo autoadhesivo. Garantía de 1 año.' },
      { icono: '📦', titulo: 'Soluciones Integrales', descripcion: 'Desde el diseño hasta la instalación, ofrecemos un servicio completo y personalizado.' }
    ],
    mision: 'Transformar las ideas de nuestros clientes en soluciones visuales de alto impacto, combinando creatividad, calidad y tecnología para superar sus expectativas.',
    historia: 'ARCO nace en Holguín con la misión de ofrecer soluciones integrales en artes gráficas y comunicación visual.'
  },

  serviciosDestacados: [
    { id: 'destacado-1', icono: '💡', titulo: 'Cartelería Lumínica', descripcion: 'Carteles con iluminación LED de bajo consumo.', link: '/servicios' },
    { id: 'destacado-2', icono: '🪧', titulo: 'Cartelería No Lumínica', descripcion: 'Carteles identificativos y señalética.', link: '/servicios' },
    { id: 'destacado-3', icono: '🖨️', titulo: 'Impresión y Serigrafía', descripcion: 'Gigantografías, pendones y serigrafía.', link: '/servicios' },
    { id: 'destacado-4', icono: '🔧', titulo: 'Levantamiento y Montaje', descripcion: 'Instalación y mantenimiento.', link: '/servicios' }
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

  // ===== FUNCIONES PARA CONFIGURACIÓN =====
  const updateConfiguracion = (data) => {
    setConfiguracion({ ...configuracion, ...data });
  };

  const updateHero = (data) => {
    setHero({ ...hero, ...data });
  };

  const updateSobreNosotros = (data) => {
    setSobreNosotros({ ...sobreNosotros, ...data });
  };

  const updateServiciosDestacados = (data) => {
    setServiciosDestacados(data);
  };

  // ===== FUNCIONES PARA SERVICIOS =====
  const addServicio = (servicio) => {
    const newId = Date.now().toString();
    setServicios([...servicios, { ...servicio, id: newId }]);
  };

  const updateServicio = (id, updatedData) => {
    setServicios(servicios.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  const deleteServicio = (id) => {
    setServicios(servicios.filter(s => s.id !== id));
  };

  // ===== FUNCIONES PARA TESTIMONIOS =====
  const deleteTestimonio = (id) => {
    if (confirm('¿Estás seguro de eliminar este testimonio?')) {
      setTestimonios(testimonios.filter(t => t.id !== id));
    }
  };

  const addTestimonioPendiente = (testimonio) => {
    const newTestimonio = {
      id: Date.now(),
      ...testimonio,
      fecha: new Date().toISOString(),
      aprobado: false
    };
    setTestimoniosPendientes([newTestimonio, ...testimoniosPendientes]);
    return newTestimonio;
  };

  const aprobarTestimonio = (id) => {
    const testimonio = testimoniosPendientes.find(t => t.id === id);
    if (testimonio) {
      setTestimoniosPendientes(testimoniosPendientes.filter(t => t.id !== id));
      setTestimonios([{ ...testimonio, aprobado: true }, ...testimonios]);
    }
  };

  const rechazarTestimonio = (id) => {
    if (confirm('¿Estás seguro de rechazar este testimonio?')) {
      setTestimoniosPendientes(testimoniosPendientes.filter(t => t.id !== id));
    }
  };

  // ===== FUNCIONES PARA MENSAJES =====
  const addMensaje = (mensaje) => {
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

  const marcarLeido = (id) => {
    setMensajes(mensajes.map(m => m.id === id ? { ...m, leido: true } : m));
  };

  const marcarRespondido = (id) => {
    setMensajes(mensajes.map(m => m.id === id ? { ...m, respondido: true } : m));
  };

  const deleteMensaje = (id) => {
    if (confirm('¿Eliminar este mensaje?')) {
      setMensajes(mensajes.filter(m => m.id !== id));
    }
  };

  // ============================================================
  //  🗄️ NUEVAS FUNCIONES PARA MONGODB
  // ============================================================

  // ===== SINCRONIZAR CON MONGODB =====
  const syncToMongoDB = async () => {
    try {
      const data = {
        servicios,
        testimonios,
        testimoniosPendientes,
        mensajes,
        configuracion: [configuracion],
        hero: [hero],
        sobreNosotros: [sobreNosotros],
        serviciosDestacados
      };

      const result = await apiService.syncAll(data);
      console.log('✅ Datos sincronizados con MongoDB:', result);
      return { success: true, result };
    } catch (error) {
      console.error('❌ Error al sincronizar con MongoDB:', error);
      return { success: false, error: error.message };
    }
  };

  // ===== CARGAR DATOS DESDE MONGODB =====
  const loadFromMongoDB = async () => {
    try {
      const results = await apiService.loadAll();
      
      if (results.servicios && results.servicios.length > 0) setServicios(results.servicios);
      if (results.testimonios && results.testimonios.length > 0) setTestimonios(results.testimonios);
      if (results.testimoniosPendientes && results.testimoniosPendientes.length > 0) setTestimoniosPendientes(results.testimoniosPendientes);
      if (results.mensajes && results.mensajes.length > 0) setMensajes(results.mensajes);
      if (results.configuracion && results.configuracion.length > 0) setConfiguracion(results.configuracion[0]);
      if (results.hero && results.hero.length > 0) setHero(results.hero[0]);
      if (results.sobreNosotros && results.sobreNosotros.length > 0) setSobreNosotros(results.sobreNosotros[0]);
      if (results.serviciosDestacados && results.serviciosDestacados.length > 0) setServiciosDestacados(results.serviciosDestacados);

      return { success: true, results };
    } catch (error) {
      console.error('❌ Error al cargar desde MongoDB:', error);
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

    // ===== SETTERS =====
    setServicios,
    setTestimonios,
    setTestimoniosPendientes,
    setMensajes,
    setConfiguracion,
    setHero,
    setSobreNosotros,
    setServiciosDestacados,

    // ===== FUNCIONES EXISTENTES =====
    updateConfiguracion,
    updateHero,
    updateSobreNosotros,
    updateServiciosDestacados,
    addServicio,
    updateServicio,
    deleteServicio,
    deleteTestimonio,
    addTestimonioPendiente,
    aprobarTestimonio,
    rechazarTestimonio,
    addMensaje,
    marcarLeido,
    marcarRespondido,
    deleteMensaje,

    // ===== 🗄️ NUEVAS FUNCIONES MONGODB =====
    syncToMongoDB,
    loadFromMongoDB
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;