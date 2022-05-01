import axios from 'axios';
// 引入 nprogress 包美化发送请求时样式
import Nprogress from "nprogress";
import 'nprogress/nprogress.css';

// 初始化配置 axios
const request = axios.create({
    // 配置根路径方便请求
    baseURL: 'http://10.50.72.2:8081/',
    // 设置请求最大时限
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
    Nprogress.start()
    return config
})

// 响应拦截器
request.interceptors.response.use(responed => {
    Nprogress.done()
    return responed
})
export default request