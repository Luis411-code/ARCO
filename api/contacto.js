// api/contacto.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 1,
  minPoolSize: 1,
};

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  if (!uri) {
    throw new Error('❌ MONGODB_URI no está definida en las variables de entorno');
  }

  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log('✅ Conectado a MongoDB Atlas');
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, mensaje } = req.body;

    // Validación
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ 
        error: 'Faltan campos obligatorios: nombre, email y mensaje son requeridos' 
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email no válido' });
    }

    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB || 'arco-bd');
    const collection = db.collection('contactos');

    const resultado = await collection.insertOne({
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono ? telefono.trim() : '',
      mensaje: mensaje.trim(),
      fecha: new Date(),
      leido: false,
      createdAt: new Date()
    });

    return res.status(200).json({
      success: true,
      id: resultado.insertedId,
      mensaje: '✅ Mensaje guardado correctamente'
    });

  } catch (error) {
    console.error('❌ Error en API contacto:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}