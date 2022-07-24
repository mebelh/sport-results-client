import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePath from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePath({})],
  resolve: {
    alias: {
      src: path.resolve('./src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});
