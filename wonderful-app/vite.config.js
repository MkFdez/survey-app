import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      external: ["react-refresh"],
      output:
      {
          format: 'es',
          strict: false,
          entryFileNames: "[name].js",
          dir: 'dist/'
      }
   }
  },
  
  server:{
    proxy:{
      'api/survey' : 'http://localhost:5000'
    }
  },  
});
