import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false // Desactiva el overlay de errores (opcional)
    }
  },
  publicDir: 'public', // Asegura que Vite sirva los archivos de public/
})