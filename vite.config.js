import { defineConfig } from 'vite';
import path from 'path';

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/easypost.js'),
      fileName: 'easypost',
      formats: ['cjs'],
    },
    sourcemap: isDev,
    rollupOptions: {
      external: [/^node:.*/, /^@?[a-zA-Z\-_]+\/?[a-zA-Z\-_]*$/],
      output: {
        dir: 'dist',
      },
    },
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  mode,

  optimizeDeps: {
    exclude: [],
  },
});
