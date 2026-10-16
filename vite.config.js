import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' 로 두면 GitHub Pages(서브경로)에서도 그대로 동작
export default defineConfig({
  base: './',
  plugins: [react()],
})
