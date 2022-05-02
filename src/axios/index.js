import axios from 'axios';
// 引入 nprogress 包美化发送请求时样式
import Nprogress from "nprogress";
import 'nprogress/nprogress.css';

// 初始化配置 axios
const request = axios.create({
    // 配置根路径方便请求
    baseURL: 'http://10.50.72.2:8081/',
    // 设置请求最大时限
    // timeout: 5000
})

// 请求拦截器，如果通过post方式请求只需要在挂载的axios请求后 .post
// 在请求头中添加token可以通过拦截器的headers中的Authorization字段，也可在post第三个参数进行传递
// this.$request.post('admin/saveOrUp', { 数据 }, {
//     headers: {
//         Authorization: "token值"
//     }
// })
request.interceptors.request.use(config => {
    Nprogress.start()
    config.headers.Authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODExMTExMTExMSIsImlhdCI6MTY1MTQ4MzUyOSwiZXhwIjoxNjUyMDg4MzI5fQ.mgGOoufCvs-2PBGdeABAC9C9vJCqgFNbpoCBOd-kRFTk_04AbfypAD7INAALA4EqdsZ5u2ywcW6fzLDSAP1w1g"
    return config
})

// 响应拦截器
request.interceptors.response.use(responed => {
    Nprogress.done()
    return responed
})
export default request