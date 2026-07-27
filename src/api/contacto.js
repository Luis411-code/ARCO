import { getCollection } from '../lib/mongodb';

export async function guardarMensaje(datos) {
  try {
    const collection = await getCollection('contactos');
    
    const resultado = await collection.insertOne({
      ...datos,
      fecha: new Date(),
      leido: false,
      createdAt: new Date()
    });

    return { success: true, id: resultado.insertedId };
  } catch (error) {
    console.error('❌ Error al guardar mensaje:', error);
    return { success: false, error: error.message };
  }
}

export async function obtenerMensajes() {
  try {
    const collection = await getCollection('contactos');
    const mensajes = await collection
      .find({})
      .sort({ fecha: -1 })
      .toArray();
    
    return { success: true, data: mensajes };
  } catch (error) {
    console.error('❌ Error al obtener mensajes:', error);
    return { success: false, error: error.message };
  }
}