import Mock from "mockjs";
import homeApi from './mockData/home'
import userApi from './mockData/user'
import menuApi from './mockData/permission'
// 1拦截的路径 2 方法 3 制造出的假数据
Mock.mock(/api\/home\/getTableData/,'get',homeApi.getTableData);//如果匹配不上这些路径，就拦截不到了
Mock.mock(/api\/home\/getCountData/,'get',homeApi.getCountData);
Mock.mock(/api\/home\/getChartData/,'get',homeApi.getChartData);
Mock.mock(/api\/user\/getUserData/,'get',userApi.getUserList);
Mock.mock(/api\/user\/deleteUser/,'get',userApi.deleteUser);
Mock.mock(/api\/user\/addUser/,'post',userApi.createUser);
Mock.mock(/api\/user\/editUser/,'post',userApi.updateUser);
Mock.mock(/api\/permission\/getMenu/,'post',menuApi.getMenu);
//mock匹配的是api.js里面return的url