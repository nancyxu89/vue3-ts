import { defineConfig } from 'vite'
import vitePluginImp from "vite-plugin-imp"
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: "ant-design-vue",
          // style: (name) => `ant-design-vue/es/${name}/style/css`, // 加载css
          style: (name) => `ant-design-vue/es/${name}/style`, // 加载less
        },
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 自定义定制主题
        // modifyVars: { "primary-color": "#1188ff" },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: 'web.test.com',
    port: 6100,
    open: true,
    hot: true
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'src': path.join(__dirname, 'src'),
      'pages': path.join(__dirname, 'src/pages')
    }
  }
})
