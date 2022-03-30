import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from '@rollup/plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { getDirectories } from './plugins/helpers/directory';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'"
  },
  plugins: [
    { ...eslint({ include: 'src/**/*.+(js|jsx)' }), enforce: 'pre' },

    reactRefresh()
  ],
  resolve: {
    alias: {
      /**
       * Contrairement à webpack où il suffit de préciser un dossier dans lequel résoudre les alias,
       * rollup nécessite qu'on lui précise une liste de répertoires à considérer comme alias.
       * la fonction `getDirectories` se charge de lister les répertoires présents dans `src/` et les ajoute comme alias
       * pour que rollup puisse résoudre les routes telles que `component/monComponent` comme `src/component/monComponent`
       */
      ...getDirectories(resolve(__dirname, 'src/')).reduce(
        (aliases, folder) => ({
          ...aliases,
          [folder]: resolve(__dirname, `src/${folder}`)
        }),
        {}
      )
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/config/variables.module";'
      }
    }
  }
});
