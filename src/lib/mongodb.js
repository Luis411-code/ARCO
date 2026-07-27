import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('❌ MONGODB_URI no está definida en las variables de entorno');
}

if (process.env.NODE_ENV === 'development') {
  // En desarrollo, usa una variable global para mantener la conexión
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción (Vercel), crea una nueva conexión
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Función helper para obtener la base de datos
export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || 'arco-bd');
}

// Función helper para obtener una colección
export async function getCollection(collectionName) {
  const db = await getDb();
  return db.collection(collectionName);
}