// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// ===== CREDENCIALES DE SUPABASE =====
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Verificar que las variables existen
if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL no está definida');
}

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY no está definida');
}

// ===== CREAR CLIENTE =====
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// ===== NOMBRES DE TABLAS =====
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

// ===== HELPER PARA URL DE ARCHIVOS =====
export function getPublicUrl(bucket, path) {
  if (!path) return null;
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}