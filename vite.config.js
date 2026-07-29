import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'MON-PORTFOLIO',
  plugins: [react()],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
