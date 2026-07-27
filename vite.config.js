import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Si usas GitHub Pages, esto sería '/ARCO/', pero para Vercel no hace falta
  // base: '/',
  server: {
    hmr: {
      overlay: false
    }
  }
})