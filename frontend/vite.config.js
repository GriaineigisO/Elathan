import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["ckeditor5"]
  },
  build: {
    rollupOptions: {
      external: ["ckeditor5"]
    }
  }
});
