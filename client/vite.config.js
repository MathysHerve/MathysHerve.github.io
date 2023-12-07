import { defineConfig } from 'vite'
import Sass from 'vite-plugin-sass'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Sass()],
})
