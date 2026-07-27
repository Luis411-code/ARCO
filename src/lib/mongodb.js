// src/lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGODB_URI || process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  console.warn('⚠️ MONGODB_URI no está definida');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function getDb() {
  try {
    const client = await clientPromise;
    return client.db(import.meta.env.VITE_MONGODB_DB || process.env.MONGODB_DB || 'arco-bd');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    return null;
  }
}

export async function getCollection(collectionName) {
  const db = await getDb();
  if (!db) return null;
  return db.collection(collectionName);
}