import { resolve } from 'node:path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  main: {
    plugins: [
      copy({
        targets: [
          {
            src: 'resources/**/*',
            dest: 'out/main/resources'
          }
        ],
        hook: 'writeBundle'
      })
    ]
  },
  preload: {},
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      tailwindcss(),
      react()
    ]
  }
})
