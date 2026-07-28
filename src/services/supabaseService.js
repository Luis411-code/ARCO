// src/services/supabaseService.js - CORREGIR FUNCIÓN createServicio

export async function createServicio(servicio) {
  try {
    // 👇 Asegurar que el id no se envía, Supabase lo generará automáticamente
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
  } catch (error) {
    console.error('❌ Error creando servicio:', error);
    throw error;
  }
}

export async function updateServicio(id, servicio) {
  try {
    const { id: _, ...servicioSinId } = servicio;
    
    const { data, error } = await supabase
      .from(TABLAS.SERVICIOS)
      .update(servicioSinId)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('❌ Error actualizando servicio:', error);
    throw error;
  }
}