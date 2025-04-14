import { defineConfig } from 'vite';
import path from 'path';

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

export default defineConfig({
  build: {
    // node 12 is currently the oldest version of node we support. If we want to
    // drop node 12 support in the future, change this to the next min version
    target: 'node12',
    lib: {
      entry: path.resolve(__dirname, 'src/easypost.js'),
      fileName: 'easypost',
      formats: ['cjs', 'es'],
    },
    sourcemap: isDev,
    rollupOptions: {
      external: [/^node:.*/, /^@?[a-zA-Z\-_]+\/?[a-zA-Z\-_]*$/],
      output: [
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          dir: 'dist',
        },
        {
          format: 'esm',
          entryFileNames: '[name].mjs',
          dir: 'dist',
        },
      ],
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
