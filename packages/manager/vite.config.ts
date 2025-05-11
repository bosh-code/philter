/* eslint-disable node/no-unpublished-import */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// Import @philter/common using a relative path. This is a hack, btw.
// File extension is required to make this work in Node.js v12 AND v14.
import { RELAY_DIR, RELAY_HTML_FILE } from '../common/build/src/index.js';

/** Directory to emit bundle */
const OUT_DIR = `../../release/relay${RELAY_DIR}`;

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: OUT_DIR,
    rollupOptions: {
      input: `./${RELAY_HTML_FILE}`,
      output: {
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'assets/philter-manager.[name].js',
        entryFileNames: 'assets/[name].js'
      }
    },
    sourcemap: true
  },
  plugins: [react()],
  server: {
    open: '/philter-manager.index.html',
    proxy: {
      // Typical port for KoLmafia's relay browser
      '^/(relay_|images)': 'http://localhost:60080'
    }
  }
});
