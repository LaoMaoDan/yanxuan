const pullup = {
    inserted(el, binding, vnode) {
        const fangdou = (fn, delay) => {
            let timer = null
            return function () {
                timer = setTimeout(fn, delay);



            }
        }


        let fn = binding.value
        document.addEventListener('scroll', e => {
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.body.scrollHeight
            if (clientHeight + scrollTop >= scrollHeight - 10) {
                fn()
            }
        })
    }
}
export default pullup