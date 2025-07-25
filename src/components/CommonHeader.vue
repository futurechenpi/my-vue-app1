<!--
 * @Author: futurechenpi 2625765150@qq.com
 * @Date: 2025-06-27 14:43:13
 * @LastEditors: futurechenpi 2625765150@qq.com
 * @LastEditTime: 2025-07-25 15:38:08
 * @FilePath: \my-vue-app1\src\components\CommonHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div class="header">
        <div class="l-container">
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="menu"></component>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-if="current" :to="current.path">{{current.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-container">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" class="user"/>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleMenu('personal','个人中心','/personal')">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import{useAllDataStore}from '@/stores'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const getImageUrl=(user)=>{
    return new URL(`../assets/images/${user}.jpg`,import.meta.url).href
}
const store=useAllDataStore()
const handleCollapse=()=>{
    store.state.isCollapse=!store.state.isCollapse
}
const router=useRouter()
const handleLoginOut=()=>{
    store.clean()
    router.push('/login')
}
const current=computed(()=>store.state.currentMenu)
const handlePersonal=()=>{
    router.push('/personal')
}
const handleMenu=(name,label,path)=>{
    const item={name,label,path}
    router.push(path)
    store.addTag(item)
}
</script>
<style lang="less" scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    // background-color: #0088ff;
}
.icons{
    width: 20px;
    height: 20px;

}
.l-container{
    display: flex;
    align-items: center;
    .el-button{
        margin-right:20px ;
    }

}
.r-container{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}
:deep(.bread span){
    color: #fff !important;
    cursor: pointer !important;
}
</style>