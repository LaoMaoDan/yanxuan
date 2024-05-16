import elMessage from "./el-message.vue";
export default {
    install(Vue) {
        let message = null
        Vue.component(elMessage.name, elMessage)
        Vue.prototype.$message = {
            show
        }
        function show(props) {
            if (!message) {
                // console.log(123)
                    render(h) {
                        return h('elMessage', { props })
                    }
                })
                message = new Message()
                this.vm = message.$mount()
                document.body.appendChild(this.vm.$el)
                setTimeout(close(this.vm.$el), 2000);
            }
        }
        function close(el) {
            return function () {
                message.$destroy()
                message = null
                setTimeout(() => {
                    document.body.removeChild(el)
                }, 300);
            }
        }
    }
}