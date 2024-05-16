const otherCheck = {
    bind(el, binding) {
        let [, input] = el.children
        input.setAttribute('placeholder', binding.value.text)
    },
    update(el, binding, vnode) {
        // 为了看看传过来的参数是不是新的参数 如果是就对新数据进行处理
        if (binding.value.num != binding.oldValue.num) {
            let [, input] = el.children
            let str = binding.value.num
            if (str == '' || str == ' ') {
                input.className = 'ipt'
                vnode.context.getcheckOther({ check: false })
            } else {
                input.className = ''
                vnode.context.getcheckOther({ check: false })
                vnode.context.getcheckOther(true)
            }
        }
    }
}
export default otherCheck