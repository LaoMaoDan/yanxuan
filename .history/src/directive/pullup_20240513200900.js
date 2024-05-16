const pullup = {
    inserted(el, binding, vnode) {
        const jieliu = (fn, delay) => {
            let vaild = true
            return function () {
                if (!vaild) {
                    return false
                }
                vaild = false
                setTimeout(() => {
                    fn()
                    vaild = true
                }, delay);
            }
        }

        let fn = binding.value
        function getdata(e) {
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.body.scrollHeight
            if (clientHeight + scrollTop >= scrollHeight - 10) {
                fn()
            }
        }
        document.addEventListener('scroll', jieliu(getdata, 500)
        )
    }
}
export default pullup