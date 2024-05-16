import elMessage from "./el-message.vue";
export default {
    install(Vue) {
        Vue.component(elMessage.name, elMessage)
        Vue.prototype.$message = {
            
        }
    }
}