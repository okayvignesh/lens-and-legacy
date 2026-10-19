import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        // Rolldown expects a function, not an object map.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('/three/') ||
            id.includes('@react-three') ||
            id.includes('three-stdlib') ||
            id.includes('/maath/') ||
            id.includes('camera-controls') ||
            id.includes('troika')
          ) {
            return 'three'
          }
          if (
            id.includes('/motion/') ||
            id.includes('framer-motion') ||
            id.includes('motion-dom') ||
            id.includes('motion-utils')
          ) {
            return 'motion'
          }
          if (id.includes('/gsap/')) return 'gsap'
          if (id.includes('@phosphor-icons')) return 'icons'
        },
      },
    },
  },
})
