import axios from 'axios'
import Vue from 'vue';
const vm = new Vue()

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
    let { code, msg } = response.data
    if (code == 200) {
        vm.$message.show({ title: msg, type: 'success' })
    }
    if (code == 201) {
        vm.$message.show({ title: msg, type: 'success' })
    }
    if (code == 204) {
        vm.$message.show({ title: msg, type: 'success' })
    }
    if (code == 400) {
        vm.$message.show({ title: msg, type: 'error' })
    }
    if (code == 401) {
        vm.$message.show({ title: msg, type: 'error' })
    }
    if (code == 403) {
        vm.$message.show({ title: msg, type: 'error' })
    }

    if (code == 404) {
        vm.$message.show({ title: msg, type: 'error' })
    }
    if (code == 422) {
        vm.$message.show({ title: msg, type: 'error' })
    }
    if (code == 500) {
        vm.$message.show({ title: msg, type: 'error' })
    }



    return response.data
})
export default service