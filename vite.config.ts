import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Explicitly set appType to 'spa'. This is often the default if you have an index.html
  // at the root, but being explicit can sometimes help ensure the dev server
  // correctly falls back to index.html for all client-side routes.
  appType: 'spa',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Vite's dev server handles SPA fallbacks by default when appType is 'spa'.
    // No explicit historyApiFallback is usually needed here as Vite has its own mechanism.
  }
});
