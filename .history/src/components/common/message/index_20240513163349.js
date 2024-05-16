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
                    render(h) {
                        return h('elMessage', { props })
                    }
                })
                message = new Message()
                this.vm = message.$mount()
                document.body.appendChild(this.vm.$el)
                setTimeout(close(this.$e), 2000);
            }
        }
        function close() {

        }
    }
}