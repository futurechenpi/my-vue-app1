<!--
 * @Author: futurechenpi 2625765150@qq.com
 * @Date: 2025-06-30 12:37:39
 * @LastEditors: futurechenpi 2625765150@qq.com
 * @LastEditTime: 2025-07-25 15:46:00
 * @FilePath: \my-vue-app1\src\views\Login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup>
import { getCurrentInstance, reactive } from 'vue';
import {useAllDataStore}from '@/stores'
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
const loginForm=reactive({
  username:'',
  password:''
})
const {proxy}=getCurrentInstance()
const store =useAllDataStore()
const router =useRouter()
const handleLogin=async()=>{
  const res = await proxy.$api.getMenu(loginForm)
  //拿到菜单后 在哪显示
  store.updateMenuList(res.menuList)//将拿到的数据传给状态管理库，用于addMenu函数的判断
  store.state.token=res.token//将令牌赋值给状态管理库中的数据
  store.addMenu(router)//通过路由添加菜单，router参数用于移除上次的路由和添加路由
  store.state.date=dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  router.push("/home")
}
</script>

<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item>
        <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.body-login{
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/background.png");
  background-size:100% ;
  overflow: hidden;
}
.login-container{
  width: 400px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;//第一个 0 表示水平方向的偏移量为 0；第二个 0 表示垂直方向的偏移量为 0；25px 表示阴影的模糊半径为 25 像素，模糊半径越大，阴影越模糊扩散。
  margin:250px auto;
  h1{
    text-align: center;
    margin-bottom: 20px;
    color:#505450;
  }
  
  :deep(.el-form-item__content){
    justify-content: center;
  }
  
}

</style>
