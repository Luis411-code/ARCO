// src/services/supabaseService.js
import { supabase, TABLAS, BUCKETS } from './supabaseClient';

// ============================================================
// CONFIGURACIÓN
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
// HERO
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
// SOBRE NOSOTROS Y VALORES (CORREGIDO)
// ============================================================
export async function getSobreNosotros() {
  // Obtener sobre_nosotros
  const { data: sobre, error: error1 } = await supabase
    .from(TABLAS.SOBRE_NOSOTROS)
    .select('*')
    .single();
  if (error1) throw error1;

  // Obtener valores por separado
  const { data: valores, error: error2 } = await supabase
    .from(TABLAS.VALORES)
    .select('*')
    .eq('sobre_nosotros_id', 1);
  if (error2) throw error2;

  // Combinar en un solo objeto
  return { ...sobre, valores: valores || [] };
}

export async function updateSobreNosotros(data) {
  // Extraer valores del objeto data
  const { valores, ...sobreData } = data;
  
  // 1. Actualizar sobre_nosotros
  const { error: error1 } = await supabase
    .from(TABLAS.SOBRE_NOSOTROS)
    .update(sobreData)
    .eq('id', 1);
  if (error1) throw error1;

  // 2. Si hay valores, actualizarlos
  if (valores && Array.isArray(valores) && valores.length > 0) {
    // Eliminar valores existentes
    const { error: deleteError } = await supabase
      .from(TABLAS.VALORES)
      .delete()
      .eq('sobre_nosotros_id', 1);
    if (deleteError) throw deleteError;
    
    // Insertar nuevos valores
    const nuevosValores = valores.map(v => ({
      sobre_nosotros_id: 1,
      icono: v.icono || '🎯',
      titulo: v.titulo || 'Valor',
      descripcion: v.descripcion || 'Descripción del valor'
    }));
    
    const { error: insertError } = await supabase
      .from(TABLAS.VALORES)
      .insert(nuevosValores);
    if (insertError) throw insertError;
  }

  return { success: true };
}

// ============================================================
// SERVICIOS
// ============================================================
export async function getServicios() {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createServicio(servicio) {
  const { id, ...servicioSinId } = servicio;
  
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .insert({
      titulo: servicioSinId.titulo,
      descripcion: servicioSinId.descripcion || '',
      icono: servicioSinId.icono || '📋',
      precio: servicioSinId.precio || '',
      categoria: servicioSinId.categoria || 'General',
      imagenes: servicioSinId.imagenes || [],
      campos_formulario: servicioSinId.campos_formulario || []
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateServicio(id, servicio) {
  const { id: _, ...servicioSinId } = servicio;
  
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS)
    .update(servicioSinId)
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
// SERVICIOS DESTACADOS
// ============================================================
export async function updateServiciosDestacados(destacados) {
  // Eliminar existentes
  await supabase
    .from(TABLAS.SERVICIOS_DESTACADOS)
    .delete()
    .neq('id', 0);
  
  // Insertar nuevos con la estructura correcta
  const nuevosDestacados = destacados.map(item => ({
    servicio_id: item.servicioId || item.servicio_id, // 👈 Asegurar el nombre correcto
    titulo: item.titulo || '',
    descripcion: item.descripcion || ''
  }));
  
  const { error } = await supabase
    .from(TABLAS.SERVICIOS_DESTACADOS)
    .insert(nuevosDestacados);
  
  if (error) throw error;
  return { success: true };
}

export async function getServiciosDestacados() {
  const { data, error } = await supabase
    .from(TABLAS.SERVICIOS_DESTACADOS)
    .select('*')
    .order('created_at');
  
  if (error) throw error;
  
  // Transformar servicio_id a servicioId para el frontend
  const transformedData = data.map(item => ({
    ...item,
    servicioId: item.servicio_id
  }));
  
  return transformedData;
}

// ============================================================
// TESTIMONIOS
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
  const { data: pendiente, error: getError } = await supabase
    .from(TABLAS.TESTIMONIOS_PENDIENTES)
    .select('*')
    .eq('id', id)
    .single();
  if (getError) throw getError;
  
  const { error: insertError } = await supabase
    .from(TABLAS.TESTIMONIOS)
    .insert({
      ...pendiente,
      aprobado: true
    });
  if (insertError) throw insertError;
  
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
// MENSAJES
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
// STORAGE - IMÁGENES
// ============================================================
export async function uploadImage(file, folder = 'servicios') {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = folder ? `${folder}/${fileName}` : fileName;
    
    const { error } = await supabase.storage
      .from(BUCKETS.IMAGENES)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from(BUCKETS.IMAGENES)
      .getPublicUrl(filePath);
    
    return {
      path: filePath,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error('❌ Error al subir imagen:', error);
    throw error;
  }
}

export async function deleteImage(path) {
  try {
    const { error } = await supabase.storage
      .from(BUCKETS.IMAGENES)
      .remove([path]);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('❌ Error al eliminar imagen:', error);
    throw error;
  }
}

// ============================================================
// CARGA Y SINCRONIZACIÓN COMPLETA
// ============================================================
export async function loadAllData() {
  try {
    const configuracion = await getConfiguracion();
    const hero = await getHero();
    const sobreNosotros = await getSobreNosotros();
    const serviciosDestacados = await getServiciosDestacados();
    const servicios = await getServicios();
    const testimonios = await getTestimonios(true);

    return {
      configuracion,
      hero,
      sobreNosotros,
      serviciosDestacados,
      servicios,
      testimonios
    };
  } catch (error) {
    console.error('❌ Error cargando datos:', error);
    throw error;
  }
}

export async function syncAllData(data) {
  try {
    await updateConfiguracion(data.configuracion);
    await updateHero(data.hero);
    await updateSobreNosotros(data.sobreNosotros);
    await updateServiciosDestacados(data.serviciosDestacados);
    
    // Sincronizar servicios
    await supabase.from(TABLAS.SERVICIOS).delete().neq('id', '');
    for (const servicio of data.servicios) {
      await createServicio(servicio);
    }
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error sincronizando datos:', error);
    throw error;
  }
}