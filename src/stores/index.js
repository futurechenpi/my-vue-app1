import {defineStore} from'pinia'
import { ref,watch } from 'vue'

function initState(){
    return{
        isCollapse:false,
        tags:[
          {
            path:'/home',
            name:'home',
            label:'首页',
            icon:'home'
          }
        ],
        currentMenu:null,
        menuList:[],
        token:"",
        routerList:[]
    };
    
}

export const useAllDataStore = defineStore('allData', () => {
//   const count = ref(0)//state属性
//   const doubleCount = computed(() => count.value * 2)//getters
//   function increment() {//action
//     count.value++
//   }
  const state=ref(initState())
  
  watch(state,(newObj)=>{//持久化--保存数据到本地
    if(!newObj.token) return;
    localStorage.setItem("store",JSON.stringify(newObj))//对象转换为 JSON 字符串后存储到浏览器的本地存储中，键名为store。
  },{deep:true})//表示进行深度监听，即对象内部属性的变化也会被监听到。

  function selectMenu(val){//标签的添加
    if(val.name==='home'){
      state.value.currentMenu='home';
    }else{
      state.value.currentMenu=val;
      let index=state.value.tags.findIndex(item=>item.name===val.name)
      index===-1? state.value.tags.push(val):""
    }
  }
  function undateTags(tag){//删除标签
    let index=state.value.tags.findIndex(item=>item.name ===tag.name)
    state.value.tags.splice(index,1)//从index的位置开始删除一个元素
  }
  function updateMenuList(val){//选择更新两个菜单还是四个
    state.value.menuList=val
  }
  function addMenu(router,type){//添加路由
    if(type==='refresh'){
      if(JSON.parse(localStorage.getItem('store'))){
        state.value=JSON.parse(localStorage.getItem('store'))
        //
        state.value.routerList=[];
      }else{
        return;
      }
    }
    const menu=state.value.menuList;
    const module =import.meta.glob('../views/**/*.vue');
    const routeArr=[]
    menu.forEach(item=>{//给menuList加上component
      if(item.children){
        item.children.forEach(val=>{
          let url =`../views/${val.url}.vue`;
          val.component=module[url];
          routeArr.push(...item.children)
        })
      }else{
        let url=`../views/${item.url}.vue`
        item.component=module[url];
        routeArr.push(item)
        
      }
    })
    let routers=router.getRoutes()
    routers.forEach(item=>{//移除上次登录的路由
      if(item.name=='main'|| item.name=='login'|| item.name=='404'){
        return
      }else{
        router.removeRoute(item.name)
      }
    })
    routeArr.forEach(item=>{//插入路由
      state.value.routerList.push(router.addRoute("main",item))
      
    })
    
  }
  function clean(){
    state.value.routerList.forEach(item=>{
      console.log(item)
      if(item) item();//因为这个里面是一个叫removeRoute的函数
    });
    state.value =initState();
    //删除我们本地缓存
    localStorage.removeItem("store")
  }
  return { 
    state,
    selectMenu,
    undateTags,
    updateMenuList,
    addMenu,
    clean
   }
})