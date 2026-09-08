import path from 'path';
import { defineConfig } from 'vite';

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

export default defineConfig({
  build: {
    // This target must match the oldest version we support
    target: 'node18',
    lib: {
      entry: path.resolve(__dirname, 'src/easypost.ts'),
      fileName: 'easypost',
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
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  mode,

  optimizeDeps: {
    exclude: [],
  },
});
