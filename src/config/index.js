
const env=import.meta.env.MODE||'prod';

const EnvConfig={
    development:{
        baseApi:"/api",
        mockApi:"https://mock.apifox.cn/m1/4068509-0-default/api"
    },
    test:{
        baseApi:"//test.future.com/api",
        mockApi:"https://mock.apifox.cn/m1/4068509-0-default/api",
    },
    prod:{
        baseApi:"//future.com/api",
        mockApi:"https://mock.apifox.cn/m1/4068509-0-default/api",
    },
};

export default{
    env,//默认是development
    ...EnvConfig[env],//...解构
    //mock
    mock:true,
}