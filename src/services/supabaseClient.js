// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Faltan las variables de entorno de Supabase');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones helper para manejo de tablas
export const TABLAS = {
  CONFIGURACION: 'configuracion',
  HERO: 'hero',
  SOBRE_NOSOTROS: 'sobre_nosotros',
  VALORES: 'valores',
  SERVICIOS_DESTACADOS: 'servicios_destacados',
  SERVICIOS: 'servicios',
  TESTIMONIOS: 'testimonios',
  TESTIMONIOS_PENDIENTES: 'testimonios_pendientes',
  MENSAJES: 'mensajes'
};

// Helper para obtener la URL pública de una imagen de Storage
export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}