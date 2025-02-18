import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

if (process.env.GH_REPO) {
  console.log('GitHub repo detected!')
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: `mengenlehreuhr`,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
