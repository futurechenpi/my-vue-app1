<script setup>
import{getCurrentInstance, onMounted, ref,reactive} from 'vue'
import * as echarts from 'echarts'

const {proxy}=getCurrentInstance()
const getImageUrl=(user)=>{
  return new URL(`../assets/images/${user}.jpg`,import.meta.url).href
}
const tableData = ref([
   
])
const countData = ref([
   
])
const observer=ref(null)
const chartData=ref([])
const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})

//这个是折线图和柱状图 两个图表共用的公共配置
//echarts 官网可查看
const xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      legend: {},
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
      series: [],
})

const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
})

const getTableData=async()=>{
  const data=await proxy.$api.getTableData()//这个getTableData()是api.js的
  //console.log(data)
  tableData.value=data.tableData
  
}
const getCountData=async()=>{
  const data=await proxy.$api.getCountData()
  countData.value=data
}
const getChartData=async()=>{
  const {orderData,userData,videoData}=await proxy.$api.getChartData()
  //对第一个图标进行x轴和series赋值--折线图
  xOptions.xAxis.data=orderData.date;
  xOptions.series=Object.keys(orderData.data[0]).map(val=>{//假设有一个对象 const obj = {name: 'John', age: 30};，使用 Object.keys(obj) 会返回 ['name', 'age']
    return{
      name:val,
      data:orderData.data.map(item => item[val]),
      type:'line',
    }
  })
  const oneEchart=echarts.init(proxy.$refs['echart'])
  oneEchart.setOption(xOptions);

  //对第二个表格进行渲染--柱状图

  xOptions.xAxis.data=userData.map(item=>item.date)//遍历，=>后面是要输出的东西
  xOptions.series=[
    {
      name:'新增用户',
      data:userData.map(item=>item.new),
      type:'bar',
    },
    {
      name:'活跃用户',
      data:userData.map(item=>item.active),
      type:'bar',
    },
  ];
  const twoEchart=echarts.init(proxy.$refs['userEchart'])
  twoEchart.setOption(xOptions);

  //对第三个表格进行渲染--饼状图
  pieOptions.series=[
    {
      data:videoData,
      type:'pie'
    }
  ]
  const threeEchart=echarts.init(proxy.$refs['videoEchart'])
  threeEchart.setOption(pieOptions);

  //监听页面的变化
      //如果监听的容器大小发生变化 改变了以后会执行回调函数
  observer.value=new ResizeObserver(()=>{
    oneEchart.resize()
    twoEchart.resize()
    threeEchart.resize()
  })

  //容器存在
  if(proxy.$refs['echart']){
    observer.value.observe(proxy.$refs['echart'])
  }
}
onMounted(()=>{
  getTableData()
  getCountData()
  getChartData()
})
</script>

<template>
  <el-row class="h-full overflow-hidden" :gutter="20"><!-- :gutter="20" 表示设置行内元素之间的间距为 20 像素 -->
    <el-col :span="8" style="margin-top:20px"><!-- “:span="8"” 表示该列在 24 栅格系统中占据 8 个单位宽度 -->
      <el-card>
        <div class="flex items-center border-b border-gray-300 mb-5">
          <img :src="getImageUrl('user')" class="w-[150px] h-[150px] rounded-full mr-10"/>
          <div>
            <p class="text-[30px] leading-10">Admin</p>
            <p class="text-gray-400 leading-10">超级管理员</p>
          </div>
        </div>
        <div>
          <p class="leading-[30px] text-sm text-gray-400">
            上次登录时间:
            <span class="text-gray-500 ml-[60px]">
              2025-06-26
            </span>
          </p>
          <p class="leading-[30px] text-sm text-gray-400">
            上次登录地点:
            <span class="text-gray-500 ml-[60px]">
              杭州
            </span>
          </p>
        </div>
      </el-card>

      <el-card class="mt-5">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val,key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ><!-- “val” 代表每次循环获取到的数组元素值或对象属性值，“key” 在循环数组时是元素的索引，在循环对象时是对象的属性名。 -->
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="flex flex-wrap justify-between">
        <el-card
        class="w-[32%] mb-5"
        :body-style="{display:'flex',padding:0}"
        v-for="item in countData"
        :key="item.name"
        >
          <component :is="item.icon" class="w-[60px] h-[60px] text-xs text-center leading-[80px] text-white" :style="{background:item.color}"></component>
          <div class="ml-[15px] flex flex-col justify-center">
            <p class="text-[25px]">￥{{item.value}}</p>
            <p class="text-[15px] text-center text-gray-400">￥{{item.name}}</p>
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped lang="less">
  .home{
    height: 100%;
    overflow: hidden;
    .user{
      display: flex;
      align-items: center;
      border-bottom:1px solid #ccc;
      margin-bottom: 20px;
      img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 40px;
      }
      .user-info{
        p{
          line-height: 40px;
        }
        .user-info-p{
          color: #999;
        }
        .user-info-admin{
          font-size: 30px;
        }
      }
    }
    .login-info{
      p{
        line-height: 30px;
        font-size: 14px;
        color: #999;
        span{
          color: #666;
          margin-left: 60px;
        }
      }
    }
    .user-table{
      margin-top: 20px;
    }
    .num{
      display: flex;
      flex-wrap: wrap;//自动换行
      justify-content: space-between;
      .el-card{
        width: 32%;
        margin-bottom: 20px;
      }
      .icons{
        width: 60px;
        height: 60px;
        font-size: 10px;
        text-align: center;
        line-height: 80px;
        color: #fff;
      }
      .detail{
        margin-left:15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .num{
          font-size: 30px;
          margin-bottom: 10px;
        }
        .txt{
          font-size: 15px;
          text-align: center;
          color:#999;
        }
      }
    }
    .graph{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card{
        width: 48%;
      }
    }
  }
  
</style>
