/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  publicDir: 'src/assets',
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
  },
  plugins: [
    analog({
      vite: {
        inlineStylesExtension: 'scss',
      },
      prerender: {
        routes: [
          '/',
          '/blog',
          '/tips',
          '/about',
          '/angular-cli-explorer',
          '/blog/angular-router-events',
          '/blog/array-from',
          '/blog/closures',
          '/blog/everysome',
          '/blog/how-to-add-scully',
          '/blog/markdown-test',
          '/blog/object-entries',
          '/blog/standalone-migration',
          '/tips/attribute-binding',
          '/tips/bootstrap-app',
          '/tips/cdkcontextmenutrigger',
          '/tips/clipboard',
          '/tips/enable-tracing',
          '/tips/exportas',
          '/tips/key-value-pipe',
          '/tips/keyboard-events',
          '/tips/ng-for-of',
          '/tips/ng-native-validate',
          '/tips/ng-plural',
          '/tips/ng-update',
          '/tips/router-link-active',
          '/tips/slice-pipe',
          '/tips/svg',
          '/tips/template-variables',
          '/tips/cdktextareaautosize',
          '/tips/title-case-pipe',
          '/tips/value-vs-ng-value',
          '/tips/wildcard-routes',
          '/tips/keycodes',
          '/tips/cdktrapfocus',
          '/tips/testing-inputs',
          '/tips/for-block-repeaters',
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
  },
  define: {
    'import.meta.vitest': mode !== 'production',
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
}));
