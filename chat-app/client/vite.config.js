import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://chat-app-server-production-c721.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
