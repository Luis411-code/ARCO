// api/upload.js
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: 'qw07qanu',
  api_key: '139477785297537',
  api_secret: '5qewnBJLEkSdVUUqjXdBp6lTdgI',
  secure: true
});

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { image, folder = 'arco' } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: folder,
      use_filename: true,
      unique_filename: true,
      resource_type: 'image',
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 800, crop: 'limit' }
      ]
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height
    });

  } catch (error) {
    console.error('❌ Error al subir imagen:', error);
    return res.status(500).json({
      error: 'Error al subir la imagen',
      details: error.message
    });
  }
}