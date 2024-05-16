const pullup = {
    inserted(el, binding, vnode) {
        document.addEventListener('scroll', e => {
            let scrollTop = document.documentElement.scrollTop
            let clientHeight = document.documentElement.clientHeight
            let scrollHeight = document.body.scrollHeight
            if (clientHeight + scrollTop >= scrollHeight - 10) {
                binding.value
            }
        })
    }
}
export default pullup