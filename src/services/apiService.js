// src/services/apiService.js
const API_URL = '/api/contacto';
const UPLOAD_URL = '/api/upload';

export const apiService = {
  // ===== OBTENER DATOS =====
  async get(collection) {
    try {
      const response = await fetch(`${API_URL}?collection=${collection}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`❌ Error al obtener ${collection}:`, error);
      return { success: false, error: error.message };
    }
  },

  // ===== GUARDAR DATOS =====
  async post(collection, data) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, data })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`❌ Error al guardar en ${collection}:`, error);
      return { success: false, error: error.message };
    }
  },

  // ===== ACTUALIZAR DATOS =====
  async put(collection, id, data) {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, id, data })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`❌ Error al actualizar en ${collection}:`, error);
      return { success: false, error: error.message };
    }
  },

  // ===== ELIMINAR DATOS =====
  async delete(collection, id) {
    try {
      const response = await fetch(`${API_URL}?collection=${collection}&id=${id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(`❌ Error al eliminar de ${collection}:`, error);
      return { success: false, error: error.message };
    }
  },

  // ===== SINCRONIZAR TODOS LOS DATOS =====
  async syncAll(data) {
    const collections = ['servicios', 'testimonios', 'testimoniosPendientes', 'mensajes', 'configuracion', 'hero', 'sobreNosotros', 'serviciosDestacados'];
    const results = {};

    for (const collection of collections) {
      if (data[collection]) {
        const result = await this.post(collection, data[collection]);
        results[collection] = result;
      }
    }

    return results;
  },

  // ===== CARGAR TODOS LOS DATOS (FUNCIÓN QUE FALTABA) =====
  async loadAll() {
    const collections = ['servicios', 'testimonios', 'testimoniosPendientes', 'mensajes', 'configuracion', 'hero', 'sobreNosotros', 'serviciosDestacados'];
    const results = {};

    for (const collection of collections) {
      const result = await this.get(collection);
      if (result.success && result.data) {
        results[collection] = result.data;
      }
    }

    return results;
  },

  // ===== SUBIR IMAGEN A LA NUBE =====
  async uploadImage(image, folder = 'arco') {
    try {
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image, folder })
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ Error al subir imagen:', error);
      return { success: false, error: error.message };
    }
  },

  // ===== ELIMINAR IMAGEN DE LA NUBE =====
  async deleteImage(public_id) {
    try {
      const response = await fetch(`/api/delete-image?public_id=${public_id}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('❌ Error al eliminar imagen:', error);
      return { success: false, error: error.message };
    }
  }
};