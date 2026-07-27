// src/services/apiService.js
const API_URL = '/api/contacto';
const UPLOAD_URL = '/api/upload';

export const apiService = {
  // ... get, post, put, delete, syncAll, loadAll ...

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