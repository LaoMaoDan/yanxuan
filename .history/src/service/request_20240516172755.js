import axios from 'axios'
import Vue from 'vue';
console.log(Vue);
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
    // switch (code) {
    //     case 200:
    //         message.show({ title: msg, type: 'success' })
    //         break;
    //     case 201:
    //         message.show({ title: msg, type: 'success' })
    //         break;
    //     case 204:
    //         message.show({ title: msg, type: 'success' })
    //         break;
    //     case 400:
    //         message.show({ title: msg, type: 'error' })

    //         break;
    //     case 401:
    //         message.show({ title: msg, type: 'error' })

    //         break;
    //     case 403:
    //         message.show({ title: msg, type: 'error' })

    //         break;
    //     case 404:
    //         message.show({ title: msg, type: 'error' })

    //         break;
    //     case 422:
    //         message.show({ title: msg, type: 'error' })

    //         break;
    //     case 500:
    //         message.show({ title: msg, type: 'error' })

    //         break;
    // }


    return response.data
})
export default service