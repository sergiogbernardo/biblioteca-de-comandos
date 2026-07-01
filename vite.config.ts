import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the project under /biblioteca-de-comandos/. Keep the base in sync with
// the repository name so asset URLs resolve correctly in production.
export default defineConfig({
  base: '/biblioteca-de-comandos/',
  plugins: [react()],
});
