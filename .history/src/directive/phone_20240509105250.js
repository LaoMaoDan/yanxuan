let div = document.createElement('div')
div.style.position = 'absolute'
div.style.lineHeight = '25px'
div.style.left = '100px'
div.style.bottom = '-25px'
div.style.fontSize = '12px'
div.style.height = '24px'
div.innerText = '手机号格式有误'
div.style.display = 'none'
div.style.color = 'red'
const jiaoyan = {
    bind(el, binding) {
        let [, input] = el.children
        el.style.position = 'relative'
        el.appendChild(div)
        input.setAttribute('placeholder', binding.value.text)
    },
    update(el, binding, vnode) {
        // 为了看看传过来的参数是不是新的参数 如果是就对新数据进行处理
        // 如果不加这个判断更新同一个组件内的数据即使传递的参数不同 同组件的自定义指令的 update 也会触发
        if (binding.value.phone != binding.oldValue.phone) {
            let [, input] = el.children
            let str = binding.value.phone
            // 开头不是1
            if (str.charAt(0) != 1) {
                div.style.display = 'block'
                input.className = 'ipt'
                vnode.context.getcheck(false)
                return
            }
            if (str.length > 1 && str.substr(1, 1) < 3) {
                div.style.display = 'block'
                input.className = 'ipt'
                vnode.context.getcheck(false)
                return
            }
            if (isNaN(Number.parseInt(str))) {
                div.style.display = 'block'
                input.className = 'ipt'
                vnode.context.getcheck(false)
                return
            } else {
                div.style.display = 'none'
                input.className = ''
            }

            input.addEventListener('blur', () => {
                if (str && str.length != 11) {
                    div.style.display = 'block'
                    input.className = 'ipt'
                    vnode.context.getcheck(false)

                    return
                } else {
                    div.style.display = 'none'
                    input.className = ''
                    vnode.context.getcheck(true)
                }
            })
            input.addEventListener('focus', () => {
                div.style.display = 'none'
                input.className = ''
            })
        }
    }
}
export default jiaoyan