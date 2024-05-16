const addCartShow = {
    update(el, binding, vnode) {
        if (binding.value) {
            el.style.transform = `translateY(0)`
        } else {
            el.style.transform = `translateY(100%)`
        }
    }
}
export default addCartShow