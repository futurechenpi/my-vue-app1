<template>
    <el-aside
      :width="width"
      class="h-full"
    >
        <el-menu
        class="border-r-0"
        text-color="#000"
        :collapse="isCollapse"
        :collapse-transition="false"
        :default-active="activeMenu"
      >
        <h3 
          v-show="!isCollapse"
          class="text-center text-2xl font-bold mt-1"
        >通用后台管理</h3>
        <h3 
          v-show="isCollapse"
          class="text-center text-2xl font-bold mt-1"
        >后台</h3>
        <el-menu-item 
            v-for="item in noChildren"
            :index="item.path"
            :key="item.path"
            @click="handleMenu(item)"
        >
          <component class="w-[18px] h-[18px] mr-[5px]" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </el-menu-item>

        <el-sub-menu 
            v-for="item in hasChildren"
            :index="item.path"
            :key="item.path"
        >
          <template #title>
            <component class="w-[18px] h-[18px] mr-[5px]" :is="item.icon"></component>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item 
                v-for="(subItem,subIndex) in item.children"
                :index="subItem.path"
                :key="subItem.path"
                @click="handleMenu(subItem)"
            >
                <component class="w-[18px] h-[18px] mr-[5px]" :is="subItem.icon"></component>
                <span>{{ subItem.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
          
        </el-sub-menu>

      </el-menu>
    </el-aside>
</template>

<script setup>
import{ref,computed} from 'vue'
import{useAllDataStore}from '@/stores/index.js'
import { useRoute, useRouter } from 'vue-router'
// const list =ref([
//       	{
//             path: '/home',
//             name: 'home',
//             label: '首页',
//             icon: 'house',
//             url: 'Home'
//       	},
//         {
//             path: '/mall',
//             name: 'mall',
//             label: '商品管理',
//             icon: 'video-play',
//             url: 'Mall'
//         },
//         {
//             path: '/user',
//             name: 'user',
//             label: '用户管理',
//             icon: 'user',
//             url: 'User'
//         },
//         {
//             path: 'other',
//             label: '其他',
//             icon: 'location',
//             children: [
//                 {
//                     path: '/page1',
//                     name: 'page1',
//                     label: '页面1',
//                     icon: 'setting',
//                     url: 'Page1'
//                 },
//                 {
//                     path: '/page2',
//                     name: 'page2',
//                     label: '页面2',
//                     icon: 'setting',
//                     url: 'Page2'
//                 }
//             ]
//         }
// ])
const list=computed(()=>store.state.menuList)//由pinia管理左侧菜单栏数据
const noChildren= computed(()=>list.value.filter(item=>!item.children))
const hasChildren= computed(()=>list.value.filter(item=>item.children))
const store=useAllDataStore()
const isCollapse=computed(()=>store.state.isCollapse)
//width
const width =computed(()=>store.state.isCollapse?"64px":"180px")
const router=useRouter()
const route=useRoute()
const activeMenu=computed(()=>route.path)
const handleMenu=(item)=>{
    router.push(item.path)
    store.addTag(item)
}
</script>
<style scoped>

</style>
<!-- <style lang="less" scoped>
.icons{
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
.el-menu{
    border-right:none ;
    h3{
        line-height: 48px;
        color: #000;
        text-align: center;
    }
    
}
.el-aside{
    height: 100%;
    border: #000;
}
</style> -->