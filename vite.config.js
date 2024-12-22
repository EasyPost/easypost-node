import { defineConfig } from 'vite';
import path from 'path';
import { viteExternalsPlugin } from 'vite-plugin-externals';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/easypost.js'),
        name: 'easypost',
        fileName: 'easypost',
        formats: ['cjs'],
      },
      outDir: 'dist',
      sourcemap: isDev,
    },
    plugins: [
      viteExternalsPlugin({
        type: 'commonjs',
        externals: ['node'],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
