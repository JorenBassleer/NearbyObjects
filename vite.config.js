import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import eslint from '@rollup/plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    eslint({
      include: 'src/**/*.+(vue|js)',
    }),
    vue()
  ],
})
