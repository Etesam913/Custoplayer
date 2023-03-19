import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import istanbul from "vite-plugin-istanbul";


export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  server: {
    host: true,
    port: 3000,
    // Uncomment this out when using ngrok
    // hmr: {
    //   clientPort: 443,
    // },
  },

  resolve: {
    alias: [{ find: '@root', replacement: '/src' }],
  },


  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'MyLib',
      formats: ['es', 'umd'],
      fileName: (format) => `custoplayer.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },
});
