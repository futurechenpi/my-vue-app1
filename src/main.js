import { createApp } from 'vue';
import App from './App.vue';
//import "@/assets/less/index.less";
import router from"./router/index.js";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import{createPinia}from 'pinia'
import "@/api/mock.js"//一旦使用mock，数据就会被替换成mock中引用的
import api from '@/api/api'
import {useAllDataStore} from "@/stores"
function isRoute(to){//如果路径不存在，返回false
  return router.getRoutes().filter(item=>item.path=== to.path).length>0;
}
router.beforeEach((to,from)=>{//to到哪里去，from从哪里来
    
  if(to.path!=="/login" && !store.state.token){
    
     return {name:"/login"};
  }
  if(!isRoute(to)){
  
    return {name:'404'}
  }
});
const pinia=createPinia();
const app =createApp(App);
app.use(ElementPlus);
app.use(pinia);
const store =useAllDataStore();
store.addMenu(router,"refresh")
app.use(router);
app.config.globalProperties.$api=api;//将全局属性中的 $api 这个属性赋值为 api。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {//icons
  app.component(key, component)
}
app.mount('#app');
