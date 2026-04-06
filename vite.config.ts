import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // ЗАМЕНИ НА ИМЯ СВОЕГО РЕПОЗИТОРИЯ
  base: '/stickermind-ai/', 
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
