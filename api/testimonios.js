import { getCollection } from '../lib/mongodb';

const TESTIMONIOS_POR_DEFECTO = [
  {
    nombre: "María Rodríguez",
    empresa: "Tech Solutions Cuba",
    foto: "https://ui-avatars.com/api/?name=Maria+Rodriguez&background=0a3d6b&color=fff&size=100",
    reseña: "Excelente servicio. Transformaron nuestra infraestructura tecnológica con resultados increíbles.",
    calificacion: 5,
    activo: true,
    fecha: new Date('2025-05-15')
  },
  {
    nombre: "Carlos Martínez",
    empresa: "InnovaSoft",
    foto: "https://ui-avatars.com/api/?name=Carlos+Martinez&background=0a3d6b&color=fff&size=100",
    reseña: "El equipo de desarrollo es excepcional. Entregaron nuestro proyecto antes de lo esperado.",
    calificacion: 5,
    activo: true,
    fecha: new Date('2025-04-03')
  },
  {
    nombre: "Ana García",
    empresa: "Digital World",
    foto: "https://ui-avatars.com/api/?name=Ana+Garcia&background=0a3d6b&color=fff&size=100",
    reseña: "La automatización implementada aumentó nuestra productividad un 40%. Increíble trabajo.",
    calificacion: 5,
    activo: true,
    fecha: new Date('2025-03-20')
  }
];

export async function getTestimonios() {
  try {
    const collection = await getCollection('testimonios');
    let testimonios = await collection.find({ activo: true }).toArray();
    
    if (testimonios.length === 0) {
      await collection.insertMany(TESTIMONIOS_POR_DEFECTO);
      testimonios = await collection.find({ activo: true }).toArray();
    }
    
    return { success: true, data: testimonios };
  } catch (error) {
    console.error('❌ Error al obtener testimonios:', error);
    return { success: false, error: error.message };
  }
}