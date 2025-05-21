/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import autoprefixer from 'autoprefixer'

export default defineConfig(() => {
  return {
    base: './',
    build: {
      outDir: 'build',
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({}), // add options if needed
        ],
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      force: true,
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: 'src/',
          replacement: `${path.resolve(__dirname, 'src')}/`,
        },
        {
          find: 'assets/',
          replacement: `${path.resolve(__dirname, 'src/assets')}/`,
        },
        {
          find: 'components/',
          replacement: `${path.resolve(__dirname, 'src/components')}/`,
        },
        {
          find: 'containers/',
          replacement: `${path.resolve(__dirname, 'src/containers')}/`,
        },
        {
          find: 'application/',
          replacement: `${path.resolve(__dirname, 'src/application')}/`,
        },
        {
          find: 'hooks/',
          replacement: `${path.resolve(__dirname, 'src/hooks')}/`,
        },
        {
          find: 'views/',
          replacement: `${path.resolve(__dirname, 'src/views')}/`,
        },
        {
          find: 'layout/',
          replacement: `${path.resolve(__dirname, 'src/layout')}/`,
        },
        {
          find: 'config/',
          replacement: `${path.resolve(__dirname, 'src/config')}/`,
        },
        {
          find: 'domain/',
          replacement: `${path.resolve(__dirname, 'src/domain')}/`,
        },
        {
          find: 'infrastructure/',
          replacement: `${path.resolve(__dirname, 'src/infrastructure')}/`,
        },
        {
          find: 'util/',
          replacement: `${path.resolve(__dirname, 'src/util')}/`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss'],
    },
    server: {
      port: 3000,
      proxy: {
        // https://vitejs.dev/config/server-options.html
      },
    },
  }
})
