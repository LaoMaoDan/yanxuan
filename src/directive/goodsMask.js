const addMaskShow = {
    update(el, binding, vnode) {
        if (binding.value) {
            el.style.background = `rgba(0,0,0,.3)`
        } else {
            el.style.background = `rgba(0,0,0,0)`
        }
    }
}
export default addMaskShow