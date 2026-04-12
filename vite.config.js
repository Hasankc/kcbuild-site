import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: set base to '/your-repo-name/'
// For custom domain or Vercel/Netlify: set base to '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
