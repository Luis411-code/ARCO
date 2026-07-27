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
    throw new Error('❌ MONGODB_URI no está definida');
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
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB || 'arco-bd');

    // ============================================================
    //  GET - Obtener datos
    // ============================================================
    if (req.method === 'GET') {
      const { collection } = req.query;

      if (!collection) {
        return res.status(400).json({ error: 'Falta el parámetro collection' });
      }

      const col = db.collection(collection);
      const data = await col.find({}).toArray();

      return res.status(200).json({
        success: true,
        data,
        count: data.length
      });
    }

    // ============================================================
    //  POST - Guardar datos
    // ============================================================
    if (req.method === 'POST') {
      const { collection, data } = req.body;

      if (!collection || !data) {
        return res.status(400).json({ error: 'Faltan campos: collection y data' });
      }

      const col = db.collection(collection);
      
      if (Array.isArray(data)) {
        const resultado = await col.insertMany(data);
        return res.status(200).json({
          success: true,
          insertedCount: resultado.insertedCount,
          ids: Object.values(resultado.insertedIds)
        });
      }

      const resultado = await col.insertOne({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return res.status(200).json({
        success: true,
        id: resultado.insertedId,
        mensaje: '✅ Datos guardados correctamente'
      });
    }

    // ============================================================
    //  PUT - Actualizar datos
    // ============================================================
    if (req.method === 'PUT') {
      const { collection, id, data } = req.body;

      if (!collection || !id || !data) {
        return res.status(400).json({ error: 'Faltan campos: collection, id y data' });
      }

      const col = db.collection(collection);
      const resultado = await col.updateOne(
        { _id: new MongoClient.ObjectId(id) },
        { $set: { ...data, updatedAt: new Date() } }
      );

      return res.status(200).json({
        success: true,
        matchedCount: resultado.matchedCount,
        modifiedCount: resultado.modifiedCount
      });
    }

    // ============================================================
    //  DELETE - Eliminar datos
    // ============================================================
    if (req.method === 'DELETE') {
      const { collection, id } = req.query;

      if (!collection || !id) {
        return res.status(400).json({ error: 'Faltan campos: collection y id' });
      }

      const col = db.collection(collection);
      const resultado = await col.deleteOne({ _id: new MongoClient.ObjectId(id) });

      return res.status(200).json({
        success: true,
        deletedCount: resultado.deletedCount
      });
    }

    return res.status(405).json({ error: 'Método no permitido' });

  } catch (error) {
    console.error('❌ Error en API:', error);
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message
    });
  }
}