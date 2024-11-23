import axios from "axios";

// 创建 axios 实例
const Request = axios.create({
    // 服务端请求路径
    baseURL: "http://localhost:3000/api",
    // 超时时间 单位 ms
    timeout: 5000
});

// 请求参数 filter
Request.interceptors.request.use(
    config => {
        if (config.method != "get" || !config.params){
            return config;
        }
        // 针对存在路径参数的 get 请求特殊处理
        let url = config.url + "?";
        for (let key of Object.keys(config.params)){
            // 无 value 则不拼接
            if (!config.params[key]){
                continue;
            }
            // 拼接参数，去转移
            url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
        
        // 去掉最后一个 & 并更新回到 config 中
        config.url = url.substring(0,url.length-1);
        config.params = {};
        return config;
    },
    err =>{
        Promise.reject(err);
    }
);

// 响应参数 filter
Request.interceptors.response.use(
    res => {
        return res.data;
    }, 
    err=>{
        return Promise.reject(err);
    }
);

export default Request;