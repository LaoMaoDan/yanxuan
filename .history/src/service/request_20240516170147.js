import axios from 'axios'
import Vue from 'vue';
let message = Vue.prototype.$message
const url = process.env.VUE_APP_SERVE
const service = axios.create({
    baseURL: url,
    timeout: 10 * 1000,
    withCredentials: false
})
// 请求拦截器
// 添加请求拦截器
service.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    config.headers = {
        Authorization: localStorage.getItem('token') || ''
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 响应拦截器
service.interceptors.response.use(response => {

    if (response.data.code == 400) {
        message.show({ title: '请求的地址不存在或包含不支持的参数', type: 'error' })
    }
    if (response.data.code == 400) {
        message.show({ title: '请求的地址不存在或包含不支持的参数', type: 'error' })
    }
    return response.data
})
export default service