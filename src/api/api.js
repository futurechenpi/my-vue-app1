/*
 * @Author: futurechenpi 2625765150@qq.com
 * @Date: 2025-06-28 12:35:09
 * @LastEditors: futurechenpi 2625765150@qq.com
 * @LastEditTime: 2025-07-24 15:10:15
 * @FilePath: \my-vue-app1\src\api\api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 整个项目api的统一管理

import request from "./request";

//请求首页左侧的表格数据

export default{
    getTableData(){
        return request({
            url:"/home/getTableData",
            method:"get",//也可不写，因为在request.js里面默认是get
            mock:false,
        });
    },
    getCountData(){
        return request({
            url:"/home/getCountData",
            method:"get",//也可不写，因为在request.js里面默认是get
            mock:false,
        });
    },
    getChartData(){
        return request({
            url:"/home/getChartData",
            method:"get",//也可不写，因为在request.js里面默认是get
            mock:false,
        });
    },
    getUserData(data){
        return request({
            url:"/user/getUserData",
            method:"get",//也可不写，因为在request.js里面默认是get
            mock:false,
            data,
        });
    },
    deleteUser(data){
        return request({
            url:"/user/deleteUser",
            method:"get",
            mock:false,
            data,
        });
    },
    addUser(data){
        return request({
            url:"/user/addUser",
            method:"post",
            mock:false,
            data,
        });
    },
    editUser(data){
        return request({
            url:"/user/editUser",
            method:"post",
            mock:false,
            data,
        });
    },
    getMenu(params) {
        return request({
            url: '/permission/getMenu',
            method: 'post',
            mock:false,
            data: params
        })
    }
}