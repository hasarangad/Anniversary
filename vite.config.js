import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set this to your GitHub repository name.
  // For example, if your repository URL is https://github.com/username/anniversary
  // the base should be '/anniversary/'
  base: '/Anniversary/',
})