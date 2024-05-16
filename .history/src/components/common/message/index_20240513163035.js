import elMessage from "./el-message.vue";
export default {
    install(Vue) {
        let message = null
        Vue.component(elMessage.name, elMessage)
        Vue.prototype.$message = {
            show
        }
        function show(props) {
            if (!props) {
                const Message = Vue.extend({
                    render(h){
                        return h('m')
                    }
                })
            }
        }
    }
}