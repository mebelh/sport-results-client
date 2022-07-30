// eslint-disable-next-line import/no-extraneous-dependencies
import { VitePWA } from 'vite-plugin-pwa';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import vitePath from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Sport Results',
        short_name: 'SR',
        description: 'You can watching a sport results ',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'vite.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
    react(),
    vitePath({}),
  ],
  resolve: {
    alias: {
      src: path.resolve('./src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
