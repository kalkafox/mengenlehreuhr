import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

if (process.env.GH_REPO) {
  console.log('GitHub repo detected!')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.GH_REPO ?? '/',
})
