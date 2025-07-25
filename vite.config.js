/*
 * @Author: futurechenpi 2625765150@qq.com
 * @Date: 2025-06-26 21:58:19
 * @LastEditors: futurechenpi 2625765150@qq.com
 * @LastEditTime: 2025-07-25 13:47:01
 * @FilePath: \my-vue-app1\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import ElementPlus from 'unplugin-element-plus/vite'
// https://vite.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  plugins: [vue(),//,ElementPlus()
    tailwindcss(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve:{//是添加的别名
    alias:[
      {
        find:"@",
        replacement:"/src",
      },
    ],
  },
  
});
