import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import viteSvgIcons from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuejsx(),
    viteSvgIcons({
      iconDirs: [resolve(__dirname, 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    }),
    Components({
      extensions: ['vue', 'md', 'svg'],
      resolvers: [AntDesignVueResolver({
        importStyle: 'less'
      })],
      dts: true,
      directoryAsNamespace: true,
      globalNamespaces: ['global']
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#D23931'
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
