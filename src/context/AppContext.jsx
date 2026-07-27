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
    historia: 'ARCO nace en Holguín con la misión de ofrecer soluciones integrales en artes gráficas y comunicación visual. Con un equipo de profesionales apasionados por el diseño y la publicidad, hemos logrado posicionarnos como una empresa de confianza en la región.'
  },

  serviciosDestacados: [
    { id: 'destacado-1', icono: '💡', titulo: 'Cartelería Lumínica', descripcion: 'Carteles con iluminación LED de bajo consumo, larga durabilidad y alta visibilidad.', link: '/servicios' },
    { id: 'destacado-2', icono: '🪧', titulo: 'Cartelería No Lumínica', descripcion: 'Carteles identificativos, señalética y rótulos para interiores y exteriores con materiales de alta resistencia.', link: '/servicios' },
    { id: 'destacado-3', icono: '🖨️', titulo: 'Impresión y Serigrafía', descripcion: 'Gigantografías, pendones, doyles, posavasos, cartas menú y serigrafía sobre textiles.', link: '/servicios' },
    { id: 'destacado-4', icono: '🔧', titulo: 'Levantamiento y Montaje', descripcion: 'Levantamiento, diseño, instalación, mantenimiento y ambientación de interiores y exteriores.', link: '/servicios' }
  ],

  servicios: [
    // ===== CARTELERÍA (4) =====
    {
      id: 'carteles-luminicos',
      titulo: 'Carteles Lumínicos',
      desc: 'Carteles con iluminación LED de bajo consumo, larga durabilidad y alta visibilidad. Ideales para exteriores.',
      icono: '💡',
      precio: 'Desde $100',
      imagenes: [],
      categoria: 'Cartelería',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 120 x 80 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 2', required: true },
        { id: 'iluminacion', label: 'Tipo de iluminación', tipo: 'select', opciones: ['LED Blanco', 'LED Color', 'Neón'], required: true },
        { id: 'contenido', label: 'Texto del cartel', tipo: 'text', placeholder: 'Ej: "Holguín - La ciudad que queremos"', required: true }
      ]
    },
    {
      id: 'carteles-no-luminicos',
      titulo: 'Carteles No Lumínicos',
      desc: 'Carteles de alta calidad para interiores y exteriores. Materiales resistentes y duraderos.',
      icono: '🪧',
      precio: 'Desde $50',
      imagenes: [],
      categoria: 'Cartelería',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 80 x 60 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 5', required: true },
        { id: 'material', label: 'Material', tipo: 'select', opciones: ['PVC', 'Acrílico', 'Cartón', 'Vinilo'], required: true }
      ]
    },
    {
      id: 'senaletica',
      titulo: 'Señalética',
      desc: 'Sistemas de señalización para espacios comerciales, corporativos y de tránsito.',
      icono: '📍',
      precio: 'Desde $30',
      imagenes: [],
      categoria: 'Cartelería',
      camposFormulario: [
        { id: 'tipo', label: 'Tipo de señalética', tipo: 'select', opciones: ['Señal de Tránsito', 'Señal de Localización', 'Señal de Seguridad', 'Identificación de Empresa'], required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 10', required: true },
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 30 x 20 cm', required: true },
        { id: 'contenido', label: 'Contenido del texto', tipo: 'text', placeholder: 'Ej: "ENAS - Empresa Nacional de Análisis del Agua"', required: true }
      ]
    },
    {
      id: 'carteles-identificativos',
      titulo: 'Carteles Identificativos',
      desc: 'Identificación y rotulación para negocios, oficinas y espacios corporativos.',
      icono: '🏷️',
      precio: 'Desde $40',
      imagenes: [],
      categoria: 'Cartelería',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 40 x 30 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 3', required: true },
        { id: 'contenido', label: 'Texto del cartel', tipo: 'text', placeholder: 'Ej: "Nombre de la empresa"', required: true }
      ]
    },

    // ===== IMPRESIÓN (5) =====
    {
      id: 'impresion-plastificado',
      titulo: 'Impresión y Plastificado',
      desc: 'Impresión de alta calidad con acabado plastificado para mayor durabilidad.',
      icono: '🖨️',
      precio: 'Desde $20',
      imagenes: [],
      categoria: 'Impresión',
      camposFormulario: [
        { id: 'tipo_impresion', label: 'Tipo de impresión', tipo: 'select', opciones: ['Digital', 'Offset', 'Serigrafía'], required: true },
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 30 x 40 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 100', required: true },
        { id: 'plastificado', label: '¿Plastificado?', tipo: 'select', opciones: ['Sí', 'No'], required: true }
      ]
    },
    {
      id: 'gigantografias',
      titulo: 'Gigantografías y Pendones',
      desc: 'Impresión de gran formato para publicidad exterior, eventos y ferias.',
      icono: '📏',
      precio: 'Desde $60',
      imagenes: [],
      categoria: 'Impresión',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 200 x 150 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 3', required: true },
        { id: 'material', label: 'Material', tipo: 'select', opciones: ['Lona', 'Vinilo', 'Tela', 'PVC'], required: true }
      ]
    },
    {
      id: 'cartas-menu',
      titulo: 'Cartas Menú y Cartas Bar',
      desc: 'Diseño e impresión de cartas para restaurantes, bares y cafeterías.',
      icono: '📜',
      precio: 'Desde $25',
      imagenes: [],
      categoria: 'Impresión',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño', tipo: 'select', opciones: ['A4', 'A5', 'Personalizado'], required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'tipo', label: 'Tipo de carta', tipo: 'select', opciones: ['Menú', 'Carta Bar', 'Ambos'], required: true }
      ]
    },
    {
      id: 'serigrafia-textiles',
      titulo: 'Serigrafía sobre Textiles',
      desc: 'Estampado serigráfico en prendas y textiles con diseños personalizados.',
      icono: '👕',
      precio: 'Desde $18',
      imagenes: [],
      categoria: 'Impresión',
      camposFormulario: [
        { id: 'tipo_prendas', label: 'Tipo de prenda', tipo: 'text', placeholder: 'Ej: Camisetas, Gorras, etc.', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'colores', label: 'Número de colores', tipo: 'number', placeholder: 'Ej: 2', required: true }
      ]
    },
    {
      id: 'doyles-posavasos',
      titulo: 'Doyles y Posavasos',
      desc: 'Accesorios promocionales personalizados para bares, restaurantes y eventos.',
      icono: '🍺',
      precio: 'Desde $10',
      imagenes: [],
      categoria: 'Impresión',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'tipo', label: 'Tipo de producto', tipo: 'select', opciones: ['Doyles', 'Posavasos', 'Ambos'], required: true },
        { id: 'diseno', label: 'Diseño o texto', tipo: 'text', placeholder: 'Ej: "Logo de mi empresa"', required: true }
      ]
    },

    // ===== DISEÑO (5) =====
    {
      id: 'disenos-incluidos',
      titulo: 'Diseños Incluidos',
      desc: 'Servicio de diseño gráfico profesional incluido en todos nuestros productos.',
      icono: '🎨',
      precio: 'Incluido',
      imagenes: [],
      categoria: 'Diseño',
      camposFormulario: [
        { id: 'tipo_diseno', label: 'Tipo de diseño', tipo: 'select', opciones: ['Logo', 'Cartel', 'Identidad Corporativa'], required: true },
        { id: 'descripcion', label: 'Descripción del diseño', tipo: 'textarea', placeholder: 'Describe lo que necesitas...', required: true }
      ]
    },
    {
      id: 'tarjetas-presentacion',
      titulo: 'Tarjetas de Presentación',
      desc: 'Diseño e impresión de tarjetas de presentación profesionales.',
      icono: '💳',
      precio: 'Desde $15',
      imagenes: [],
      categoria: 'Diseño',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 100', required: true },
        { id: 'tamano', label: 'Tamaño', tipo: 'select', opciones: ['Estándar 9x5 cm', 'Cuadrada 7x7 cm', 'Personalizado'], required: true },
        { id: 'acabado', label: 'Acabado', tipo: 'select', opciones: ['Mate', 'Brillante', 'Texturizado'], required: true }
      ]
    },
    {
      id: 'invitaciones',
      titulo: 'Invitaciones',
      desc: 'Diseño e impresión de invitaciones para eventos, bodas y celebraciones.',
      icono: '💌',
      precio: 'Desde $20',
      imagenes: [],
      categoria: 'Diseño',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'tipo_evento', label: 'Tipo de evento', tipo: 'text', placeholder: 'Ej: Boda, Graduación, etc.', required: true }
      ]
    },
    {
      id: 'estafetas-credenciales',
      titulo: 'Estafetas y Credenciales',
      desc: 'Identificación profesional para empresas, eventos y personal.',
      icono: '🪪',
      precio: 'Desde $12',
      imagenes: [],
      categoria: 'Diseño',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 20', required: true },
        { id: 'tipo', label: 'Tipo', tipo: 'select', opciones: ['Credencial Horizontal', 'Credencial Vertical', 'Estafeta'], required: true }
      ]
    },
    {
      id: 'tabilleros-tabillas',
      titulo: 'Tabilleros y Tabillas',
      desc: 'Tableros y tabillas para información y comunicación visual en oficinas.',
      icono: '📋',
      precio: 'Desde $15',
      imagenes: [],
      categoria: 'Diseño',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 40 x 30 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 5', required: true },
        { id: 'contenido', label: 'Contenido del texto', tipo: 'text', placeholder: 'Ej: "Bienvenidos a nuestra empresa"', required: true }
      ]
    },

    // ===== ROTULACIÓN (3) =====
    {
      id: 'rotulos-cristaleria',
      titulo: 'Rótulos para Cristalería',
      desc: 'Rotulación profesional para fachadas, escaparates y cristales.',
      icono: '🪟',
      precio: 'Desde $45',
      imagenes: [],
      categoria: 'Rotulación',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 100 x 50 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 2', required: true },
        { id: 'texto', label: 'Texto a rotular', tipo: 'text', placeholder: 'Ej: "ARCO - Publicidad"', required: true }
      ]
    },
    {
      id: 'rotulos-carros',
      titulo: 'Rótulos para Carros',
      desc: 'Rotulación y adhesivos para vehículos comerciales y personales.',
      icono: '🚗',
      precio: 'Desde $55',
      imagenes: [],
      categoria: 'Rotulación',
      camposFormulario: [
        { id: 'tipo', label: 'Tipo de rotulación', tipo: 'select', opciones: ['Parcial', 'Completa', 'Adhesivo Simple'], required: true },
        { id: 'cantidad', label: 'Cantidad de vehículos', tipo: 'number', placeholder: 'Ej: 3', required: true },
        { id: 'texto', label: 'Texto o diseño', tipo: 'text', placeholder: 'Ej: "UNITY - Transporte"', required: true }
      ]
    },
    {
      id: 'calcomanias',
      titulo: 'Calcomanías',
      desc: 'Calcomanías adhesivas para todo tipo de superficies.',
      icono: '📎',
      precio: 'Desde $5',
      imagenes: [],
      categoria: 'Rotulación',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 50', required: true },
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 10 x 5 cm', required: true },
        { id: 'texto', label: 'Texto o diseño', tipo: 'text', placeholder: 'Ej: "www.maritalcar.com"', required: true }
      ]
    },

    // ===== EXHIBICIÓN (2) =====
    {
      id: 'displays-acrilico',
      titulo: 'Displays de Acrílico',
      desc: 'Exhibidores y displays de acrílico para puntos de venta y ferias.',
      icono: '🖼️',
      precio: 'Desde $35',
      imagenes: [],
      categoria: 'Exhibición',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño (ancho x alto en cm)', tipo: 'text', placeholder: 'Ej: 60 x 40 cm', required: true },
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 5', required: true },
        { id: 'tipo', label: 'Tipo de display', tipo: 'select', opciones: ['Mostrador', 'Piso', 'Pared'], required: true }
      ]
    },
    {
      id: 'stands-ferias',
      titulo: 'Stand para Ferias',
      desc: 'Diseño y montaje de stands para ferias, exposiciones y eventos.',
      icono: '🏛️',
      precio: 'Desde $200',
      imagenes: [],
      categoria: 'Exhibición',
      camposFormulario: [
        { id: 'tamano', label: 'Tamaño del stand (ancho x alto en metros)', tipo: 'text', placeholder: 'Ej: 3 x 3 m', required: true },
        { id: 'tipo', label: 'Tipo de stand', tipo: 'select', opciones: ['Stand Simple', 'Stand con Pantalla', 'Stand Interactivo'], required: true },
        { id: 'estructura', label: 'Estructura', tipo: 'select', opciones: ['Aluminio', 'Madera', 'Acrílico'], required: true },
        { id: 'iluminacion', label: '¿Necesita iluminación?', tipo: 'select', opciones: ['Sí', 'No'], required: true }
      ]
    },

    // ===== PROMOCIONALES (2) =====
    {
      id: 'trofeos',
      titulo: 'Trofeos',
      desc: 'Trofeos personalizados para reconocimientos, eventos y competiciones.',
      icono: '🏆',
      precio: 'Desde $20',
      imagenes: [],
      categoria: 'Promocionales',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 10', required: true },
        { id: 'tamano', label: 'Tamaño (alto en cm)', tipo: 'text', placeholder: 'Ej: 30 cm', required: true },
        { id: 'texto', label: 'Texto a grabar', tipo: 'text', placeholder: 'Ej: "Campeón 2024"', required: true }
      ]
    },
    {
      id: 'solapines-llaveros',
      titulo: 'Solapines y Llaveros',
      desc: 'Accesorios promocionales personalizados con tu marca o diseño.',
      icono: '🔑',
      precio: 'Desde $8',
      imagenes: [],
      categoria: 'Promocionales',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 100', required: true },
        { id: 'tipo', label: 'Tipo de producto', tipo: 'select', opciones: ['Solapines', 'Llaveros', 'Ambos'], required: true },
        { id: 'diseno', label: 'Diseño o texto', tipo: 'text', placeholder: 'Ej: "Logo de mi empresa"', required: true }
      ]
    },

    // ===== DECORACIÓN (1) =====
    {
      id: 'lampares-apliques',
      titulo: 'Lámparas y Apliques',
      desc: 'Iluminación decorativa personalizada para interiores y exteriores.',
      icono: '💡',
      precio: 'Desde $30',
      imagenes: [],
      categoria: 'Decoración',
      camposFormulario: [
        { id: 'cantidad', label: 'Cantidad', tipo: 'number', placeholder: 'Ej: 4', required: true },
        { id: 'tipo', label: 'Tipo', tipo: 'select', opciones: ['Lámpara de Pared', 'Lámpara de Techo', 'Aplique Exterior'], required: true },
        { id: 'color', label: 'Color', tipo: 'text', placeholder: 'Ej: Dorado, Negro', required: true }
      ]
    },

    // ===== MONTAJE (5) =====
    {
      id: 'levantamiento-montaje',
      titulo: 'Levantamiento y Montaje',
      desc: 'Levantamiento, diseño e instalación de todos nuestros productos.',
      icono: '🔧',
      precio: 'Desde $30',
      imagenes: [],
      categoria: 'Montaje',
      camposFormulario: [
        { id: 'tipo', label: 'Tipo de montaje', tipo: 'select', opciones: ['Interior', 'Exterior', 'Ambos'], required: true },
        { id: 'direccion', label: 'Dirección del montaje', tipo: 'text', placeholder: 'Ej: Calle Rastro No.117', required: true }
      ]
    },
    {
      id: 'mantenimientos-constructivos',
      titulo: 'Mantenimientos Constructivos',
      desc: 'Servicio de mantenimiento y reparación de estructuras y equipos.',
      icono: '🔨',
      precio: 'Desde $30',
      imagenes: [],
      categoria: 'Montaje',
      camposFormulario: [
        { id: 'tipo', label: 'Tipo de mantenimiento', tipo: 'select', opciones: ['Preventivo', 'Correctivo', 'Ambos'], required: true },
        { id: 'descripcion', label: 'Descripción del trabajo', tipo: 'textarea', placeholder: 'Describe lo que necesitas reparar...', required: true }
      ]
    },
    {
      id: 'ambientacion-interiores',
      titulo: 'Ambientación de Interiores',
      desc: 'Diseño y decoración de espacios interiores para negocios y oficinas.',
      icono: '🏠',
      precio: 'Desde $80',
      imagenes: [],
      categoria: 'Montaje',
      camposFormulario: [
        { id: 'espacio', label: 'Espacio a ambientar', tipo: 'text', placeholder: 'Ej: Oficina principal', required: true },
        { id: 'estilo', label: 'Estilo deseado', tipo: 'select', opciones: ['Moderno', 'Clásico', 'Minimalista', 'Industrial'], required: true }
      ]
    },
    {
      id: 'decoraciones-exteriores',
      titulo: 'Decoraciones Exteriores',
      desc: 'Decoración y ambientación de espacios exteriores y fachadas.',
      icono: '🌳',
      precio: 'Desde $90',
      imagenes: [],
      categoria: 'Montaje',
      camposFormulario: [
        { id: 'espacio', label: 'Espacio a decorar', tipo: 'text', placeholder: 'Ej: Fachada principal', required: true },
        { id: 'tipo', label: 'Tipo de decoración', tipo: 'select', opciones: ['Fachada', 'Jardín', 'Terraza', 'Entrada'], required: true }
      ]
    },
    {
      id: 'climatizacion',
      titulo: 'Climatización',
      desc: 'Soluciones de climatización para espacios comerciales y oficinas.',
      icono: '❄️',
      precio: 'Desde $150',
      imagenes: [],
      categoria: 'Montaje',
      camposFormulario: [
        { id: 'espacio', label: 'Espacio a climatizar', tipo: 'text', placeholder: 'Ej: Sala de reuniones', required: true },
        { id: 'tipo', label: 'Tipo de sistema', tipo: 'select', opciones: ['Aire Acondicionado', 'Ventilación', 'Calefacción'], required: true }
      ]
    }
  ],

  testimonios: [
    {
      id: 1,
      nombre: 'María Rodríguez',
      empresa: 'Tech Solutions Cuba',
      foto: 'https://ui-avatars.com/api/?name=Maria+Rodriguez&background=0a3d6b&color=fff&size=100',
      reseña: 'Excelente servicio. Transformaron nuestra infraestructura tecnológica con resultados increíbles.',
      calificacion: 5,
      aprobado: true
    },
    {
      id: 2,
      nombre: 'Carlos Martínez',
      empresa: 'InnovaSoft',
      foto: 'https://ui-avatars.com/api/?name=Carlos+Martinez&background=0a3d6b&color=fff&size=100',
      reseña: 'El equipo de desarrollo es excepcional. Entregaron nuestro proyecto antes de lo esperado.',
      calificacion: 5,
      aprobado: true
    }
  ],

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
  //  🗄️ FUNCIONES PARA MONGODB
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

      console.log('✅ Datos cargados desde MongoDB correctamente');
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

    // ===== 🗄️ FUNCIONES MONGODB =====
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