const addCartShow = {
    update(el, binding, vnode) {
        if (binding.value) {
        } else {
            el.style.transform = `translateY(100%)`
        }
    }
}
export default addCartShow