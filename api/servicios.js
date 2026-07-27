import { getCollection } from '../lib/mongodb';

const SERVICIOS_POR_DEFECTO = [
  { 
    titulo: 'Carteles Lumínicos', 
    desc: 'Carteles con iluminación LED de bajo consumo y larga durabilidad.',
    icon: '💡',
    activo: true
  },
  { 
    titulo: 'Carteles No Lumínicos', 
    desc: 'Carteles de alta calidad para interiores y exteriores.',
    icon: '🪧',
    activo: true
  },
  { 
    titulo: 'Señalética', 
    desc: 'Sistemas de señalización para espacios comerciales y corporativos.',
    icon: '📍',
    activo: true
  },
  { 
    titulo: 'Impresión y Plastificado', 
    desc: 'Servicios de impresión de alta calidad con acabado plastificado.',
    icon: '🖨️',
    activo: true
  },
  { 
    titulo: 'Gigantografías y Pendones', 
    desc: 'Impresión de gran formato para publicidad exterior.',
    icon: '📏',
    activo: true
  },
  { 
    titulo: 'Tarjetas de Presentación', 
    desc: 'Diseño e impresión de tarjetas de presentación.',
    icon: '💳',
    activo: true
  }
];

export async function getServicios() {
  try {
    const collection = await getCollection('servicios');
    let servicios = await collection.find({ activo: true }).toArray();
    
    // Si no hay servicios, insertar los de ejemplo
    if (servicios.length === 0) {
      await collection.insertMany(SERVICIOS_POR_DEFECTO);
      servicios = await collection.find({ activo: true }).toArray();
    }
    
    return { success: true, data: servicios };
  } catch (error) {
    console.error('❌ Error al obtener servicios:', error);
    return { success: false, error: error.message };
  }
}