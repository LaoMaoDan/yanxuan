const pullup = {
    inserted(el, binding, vnode) {
        const jieliu = (fn, delay) => {
            let vaild = true
            return function () {
                if (!vaild) {
                    false
                }
                vaild = false
                setTimeout(() => {
                    fn()
                    vaild = true
                }, delay);
            }
        }


        let fn = binding.value
        function getdata() {
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.body.scrollHeight
            if (clientHeight + scrollTop >= scrollHeight - 10) {
                jieliu(fn, 500)
            }
        }
        document.addEventListener('scroll', e => {

        })
    }
}
export default pullup