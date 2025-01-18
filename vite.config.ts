// eslint-disable-next-line import/no-unresolved
import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import graphqlLoader from 'vite-plugin-graphql-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

import { fileURLToPath } from 'url';

export default defineConfig({
  build: {
    assetsDir: '',
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths(), graphqlLoader()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./app', import.meta.url)),
      },
    ],
  },
  ssr: {
    noExternal: ['primereact'],
  },
});
