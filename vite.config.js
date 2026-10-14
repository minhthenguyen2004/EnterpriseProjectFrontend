import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom') || id.includes('react-redux') || id.includes('@reduxjs/toolkit')) {
              return 'vendor-react';
            }
            if (id.includes('recharts')) {
              return 'vendor-recharts';
            }
            if (id.includes('apexcharts') || id.includes('react-apexcharts')) {
              return 'vendor-apexcharts';
            }
            if (id.includes('lucide-react') || id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('axios')) {
              return 'vendor-utils';
            }
            return 'vendor-other';
          }
        },
      },
    },
  },
})

