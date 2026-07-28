// src/services/supabaseService.js
import { supabase, TABLAS, getPublicUrl } from './supabaseClient';

// ============================================================
//  CONFIGURACIÓN
// ============================================================

export async function getConfiguracion() {
  const { data, error } = await supabase
    .from(TABLAS.CONFIGURACION)
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateConfiguracion(config) {
  const { data, error } = await supabase
    .from(TABLAS.CONFIGURACION)
    .update(config)
    .eq('id', 1)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================================
//  HERO
// ============================================================

export async function getHero() {
  const { data, error } = await supabase
    .from(TABLAS.HERO)
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateHero(heroData) {
  const { data, error } = await supabase
    .from(TABLAS.HERO)
    .update(heroData)
    .eq('id', 1)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

// ============================================================
//  SOBRE NOSOTROS Y VALORES
// ============================================================

export async function getSobreNosotros() {
  const { data, error } = await supabase
    .from(TABLAS.SOBRE_NOSOTROS)
    .select('*, valores(*)')
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateSobreNosotros(data) {
  const { error } = await supabase
    .from(TABLAS.SOBRE_NOSOTROS)
    .update(data)
    .eq('id', 1);
  
  if (error) throw error;
  return { success: true };
}

export async function updateValores(valores) {
  // Eliminar valores existentes
  await supabase
    .from(TABLAS.VALORES)
    .delete()
    .eq('sobre_nosotros_id', 1);
  
  // Insertar nuevos
  const nuevosValores = valores.map(v => ({
    ...v,
    sobre_nosotros_id: 1
  }));
  
  const { error } = await supabase
    .from(TABLAS.VALORES)
    .insert(nuevosValores);
  
  if (error) throw error;
  return { success: true };
}

// ============================================================
//  SERVICIOS
// ============================================================

export async function getServicios() {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function getServicioById(id) {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function createServicio(servicio) {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .insert(servicio)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateServicio(id, servicio) {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .update(servicio)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteServicio(id) {
  const { error } = await supabase
    .from(TABLAS.SERVICIOS)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
}

// ============================================================
//  SERVICIOS DESTACADOS
// ============================================================

export async function getServiciosDestacados() {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS_DESTACADOS)
    .select('*')
    .order('created_at');
  
  if (error) throw error;
  return data;
}

export async function updateServiciosDestacados(destacados) {
  // Eliminar existentes
  await supabase
    .from(TABLAS.SERVICIOS_DESTACADOS)
    .delete()
    .neq('id', 0);
  
  // Insertar nuevos
  const { error } = await supabase
    .from(TABLAS.SERVICIOS_DESTACADOS)
    .insert(destacados);
  
  if (error) throw error;
  return { success: true };
}

// ============================================================
//  TESTIMONIOS
// ============================================================

export async function getTestimonios(aprobados = true) {
  let query = supabase
    .from(TABLAS.TESTIMONIOS)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (aprobados) {
    query = query.eq('aprobado', true);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getTestimoniosPendientes() {
  const { data, error } = await supabase
    .from(TABLAS.TESTIMONIOS_PENDIENTES)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function createTestimonioPendiente(testimonio) {
  const { data, error } = await supabase
    .from(TABLAS.TESTIMONIOS_PENDIENTES)
    .insert(testimonio)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function aprobarTestimonio(id) {
  // Obtener pendiente
  const { data: pendiente, error: getError } = await supabase
    .from(TABLAS.TESTIMONIOS_PENDIENTES)
    .select('*')
    .eq('id', id)
    .single();
  
  if (getError) throw getError;
  
  // Insertar en aprobados
  const { error: insertError } = await supabase
    .from(TABLAS.TESTIMONIOS)
    .insert({
      ...pendiente,
      aprobado: true
    });
  
  if (insertError) throw insertError;
  
  // Eliminar de pendientes
  const { error: deleteError } = await supabase
    .from(TABLAS.TESTIMONIOS_PENDIENTES)
    .delete()
    .eq('id', id);
  
  if (deleteError) throw deleteError;
  
  return { success: true };
}

export async function rechazarTestimonio(id) {
  const { error } = await supabase
    .from(TABLAS.TESTIMONIOS_PENDIENTES)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
}

export async function deleteTestimonio(id) {
  const { error } = await supabase
    .from(TABLAS.TESTIMONIOS)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
}

// ============================================================
//  MENSAJES
// ============================================================

export async function getMensajes(leido = null) {
  let query = supabase
    .from(TABLAS.MENSAJES)
    .select('*')
    .order('fecha', { ascending: false });
  
  if (leido !== null) {
    query = query.eq('leido', leido);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createMensaje(mensaje) {
  const { data, error } = await supabase
    .from(TABLAS.MENSAJES)
    .insert(mensaje)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function marcarLeido(id) {
  const { error } = await supabase
    .from(TABLAS.MENSAJES)
    .update({ leido: true })
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
}

export async function marcarRespondido(id) {
  const { error } = await supabase
    .from(TABLAS.MENSAJES)
    .update({ respondido: true })
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
}

export async function deleteMensaje(id) {
  const { error } = await supabase
    .from(TABLAS.MENSAJES)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
}

// ============================================================
//  STORAGE - IMÁGENES
// ============================================================

export async function uploadImage(file, folder = 'servicios') {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;
  
  const { error } = await supabase.storage
    .from('arco-imagenes')
    .upload(filePath, file);
  
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from('arco-imagenes')
    .getPublicUrl(filePath);
  
  return {
    path: filePath,
    url: urlData.publicUrl
  };
}

export async function deleteImage(path) {
  const { error } = await supabase.storage
    .from('arco-imagenes')
    .remove([path]);
  
  if (error) throw error;
  return { success: true };
}

// ============================================================
//  CARGA Y SINCRONIZACIÓN COMPLETA
// ============================================================

export async function loadAllData() {
  try {
    const [configuracion, hero, sobreNosotros, serviciosDestacados, servicios, testimonios] = await Promise.all([
      getConfiguracion(),
      getHero(),
      getSobreNosotros(),
      getServiciosDestacados(),
      getServicios(),
      getTestimonios(true)
    ]);

    return {
      configuracion,
      hero,
      sobreNosotros,
      serviciosDestacados,
      servicios,
      testimonios,
      testimoniosPendientes: [],
      mensajes: []
    };
  } catch (error) {
    console.error('Error cargando datos:', error);
    throw error;
  }
}

export async function syncAllData(data) {
  try {
    // Actualizar configuracion
    await updateConfiguracion(data.configuracion);
    
    // Actualizar hero
    await updateHero(data.hero);
    
    // Actualizar sobre nosotros y valores
    await updateSobreNosotros(data.sobreNosotros);
    if (data.sobreNosotros.valores) {
      await updateValores(data.sobreNosotros.valores);
    }
    
    // Actualizar servicios destacados
    await updateServiciosDestacados(data.serviciosDestacados);
    
    // Sincronizar servicios (eliminar y recrear)
    await supabase.from('servicios').delete().neq('id', '');
    for (const servicio of data.servicios) {
      await createServicio(servicio);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error sincronizando datos:', error);
    throw error;
  }
}