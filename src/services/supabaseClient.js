// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vjgmoyfbpvwdfyefifyf.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ri_xlI-lE51RHV8vZlRBHA_O9bK9qa0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

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

export const BUCKETS = {
  IMAGENES: 'arco-imagenes'
};

export function getPublicUrl(bucket, path) {
  if (!path) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}