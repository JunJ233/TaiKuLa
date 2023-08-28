/* eslint-disable comma-dangle */
// eslint-disable-next-line semi
import { defineConfig } from 'vite';
// eslint-disable-next-line semi
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    hmr: {
      // eslint-disable-next-line comma-dangle
      clientPort: 443,
    },
  // eslint-disable-next-line comma-dangle
  },
// eslint-disable-next-line semi
});
