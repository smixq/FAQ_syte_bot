import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // разрешает подключение из Docker
    port: 5173,
    hmr: {
      host: 'faq4admin.ru',
      protocol: 'wss',
      clientPort: 443, // Обязательно, если сайт работает по HTTPS
    },
    allowedHosts: ['faq4admin.ru'],
  },
})







