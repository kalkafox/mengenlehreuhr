import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

if (process.env.GH_REPO) {
  console.log('GitHub repo detected!')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.GH_REPO ?? '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
