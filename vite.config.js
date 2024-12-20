import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { join } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式
      symbolId: 'icon-[name]'
    })
  ],
  // 软链接
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  },
  // 代理配置
  server: {
    proxy: {
      // 代理所有 /api 开头的请求
      '/api': {
        // 目标服务器地址
        target: 'http://localhost:3001/',
        // 跨域
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写规则，去掉请求路径中的 '/api' 前缀
      }
    }
  }
})
