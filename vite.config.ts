import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),tailwindcss()],
  resolve:{
    alias:{
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@core': path.resolve(__dirname, 'src/Core'),
    }
  }
})
