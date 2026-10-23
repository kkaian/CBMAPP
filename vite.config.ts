import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  root: 'app',
  envDir: '..',
  build: { outDir: '../dist', emptyOutDir: true, chunkSizeWarningLimit: 1000 },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'push-sw.js'],
      manifest: {
        name: 'CBMAPP — CBM/AL 2026',
        short_name: 'CBMAPP',
        description: 'Estudos para o CBM/AL 2026',
        lang: 'pt-BR',
        theme_color: '#161920',
        background_color: '#161920',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // o conteúdo (questões e resumos) fica no cache para funcionar offline
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,json}'],
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        importScripts: ['push-sw.js'], // lembretes (Web Push)
      },
    }),
  ],
})
