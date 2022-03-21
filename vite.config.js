import vue from '@vitejs/plugin-vue'
import path from 'path'

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    // port: 3010,
    proxy: 'https://10.255.249.99/xmail'
  }
}