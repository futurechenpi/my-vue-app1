/*
 * @Author: futurechenpi 2625765150@qq.com
 * @Date: 2025-06-26 23:00:40
 * @LastEditors: futurechenpi 2625765150@qq.com
 * @LastEditTime: 2025-07-25 15:25:13
 * @FilePath: \my-vue-app1\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import{createRouter,createWebHashHistory}from 'vue-router';



//制定路由规则
const routes = [
    
    {
        path:"/",
        name:"main",
        component: () => import('@/views/Main.vue'),
        redirect:"/home",
        children:[
            {
            path:"home",
            name:"home",
            component: () => import('@/views/Home.vue'),
            },
            {
            path:"user",
            name:"user",
            component: () => import('@/views/User.vue'),
            },
            {
            path:"mall",
            name:"mall",
            component: () => import('@/views/Mall.vue'),
            },
            {
            path:"personal",
            name:"personal",
            component: () => import('@/views/Personal.vue'),
            },
        ]
    },
    {
        path:"/login",
        name:"login",
        component: () => import('@/views/Login.vue'),
    },
    {
        path:"/404",
        name:"404",
        component:() => import('@/views/404.vue')
    }
];

const router=createRouter({
    //设置路由模式
    history:createWebHashHistory(),
    routes,
});

export default router;