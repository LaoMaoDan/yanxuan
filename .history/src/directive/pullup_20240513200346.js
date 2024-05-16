const pullup = {
    inserted(el, binding, vnode) {
        const jieliu = (fn, delay) => {
            let vaild = true
            return function()
        }


        let fn = binding.value
        document.addEventListener('scroll', e => {
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.body.scrollHeight
            if (clientHeight + scrollTop >= scrollHeight - 10) {
                jieliu(fn, 500)()
            }
        })
    }
}
export default pullup