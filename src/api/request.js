import axios from 'axios'
import { ElMessage } from 'element-plus';
import config from '@/config';
const service=axios.create({
    baseURL:config.baseApi,
});
const NETWORK_ERROR="网络错误";
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use((res)=>{
    const{code,data,msg}=res.data
    if(code===200){
        return data
    }else{
        const NETWORK_ERROR="网络错误";
        ElMessage.error(msg||NETWORK_ERROR);//如果有msg就报msg,没有就报NETWORK_ERROR
        return Promise.reject(msg||NETWORK_ERROR);
    }
});

function request(options){
    options.methods =options.methods||'get';
    //关于get请求参数的调整
    
    if(options.methods.toLowerCase()==='get'){
        options.params=options.data;
    }
    //对mock的开关做一个处理
    let isMock=config.mock;//如果api那边的mock没有值，那么就用config里面的mock来做一个默认值
    if(typeof options.mock!=='undefined'){
        isMock=options.mock;//api控制
    }
    console.group(isMock)
    //针对环境做一个处理
    if(config.env==='prod'){
        //不能用mock
        service.defaults.baseURL=config.baseApi;
    }else{
        service.defaults.baseURL=isMock?config.mockApi:config.baseApi;//默认的url后面还会加上api的url
    }
    return service(options);
}
export default request;