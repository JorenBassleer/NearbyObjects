import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import eslint from '@rollup/plugin-eslint';
import { templateCompilerOptions } from '@tresjs/core';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@axios': path.resolve(__dirname, './src/services/axios'),
    },
  },
  plugins: [
    eslint({
      include: 'src/**/*.+(vue|js)',
    }),
    vue({ ...templateCompilerOptions }),
  ],
});
